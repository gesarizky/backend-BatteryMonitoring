import {
  createTalis,
  deleteTalis,
  getAllCountTalis,
  getSpecificTalis,
} from "../../controller/databases/SettingControl.js";

export default (app) => {
  app.post("/api/setting/createTalis", async (req, res) => {
    try {
      const data = req.body;
      const respon = await createTalis(data);
      res.status(201).json({
        status: "Created",
        message: respon,
      });
    } catch (error) {
      res.status(error.code).json({
        status: error.status,
        errors: error.message,
      });
    }
  });

  app.delete("/api/setting/deleteTalis", async (req, res) => {
    try {
      const data = req.body;
      const respon = await deleteTalis(data);
      res.status(200).json({
        status: "Ok",
        message: respon,
      });
    } catch (error) {
      res.status(error.code).json({
        status: error.status,
        errors: error.message,
      });
    }
  });

  app.get("/api/setting/Talis", async (req, res) => {
    try {
      const { talis_id, page = 1, perpage = 10 } = req.query;
      if (!talis_id) {
        try {
          const currentPage = (page - 1) * perpage;
          const query = {
            offset: currentPage,
            limit: perpage,
            attributes: ["talis_id", "port", "device_ip", "slaves", "type"],
          };
          const posts = await getAllCountTalis(query);
          const pagination = {
            current_page: page,
            last_visible_page: Math.ceil(posts.count / perpage),
            items: {
              total: posts.count,
              per_page: perpage,
            },
          };
          return res
            .status(200)
            .json({ status: "Ok", data: posts.rows, pagination });
        } catch (error) {
          return res.status(500).json({
            status: "Internal Server Error",
            errors: "Error fetching all data",
          });
        }
      }
      if (talis_id) {
        try {
          const query = {
            where: { talis_id },
            attributes: ["talis_id", "port", "device_ip", "slaves", "type"],
          };
          const post = await getSpecificTalis(query);
          if (!post) {
            return res.status(404).json({
              code: 404,
              status: "Not Found",
              errors: `Data Talis not found`,
            });
          }
          return res.status(200).json({ status: "Ok", data: post });
        } catch (error) {
          return res.status(500).json({
            code: 500,
            status: "Internal Server Error",
            errors: "Error fetching specific data",
          });
        }
      }
    } catch (error) {
      return res.status(400).json({
        status: "Bad Request",
        errors: "Invalid request",
      });
    }
  });
};
