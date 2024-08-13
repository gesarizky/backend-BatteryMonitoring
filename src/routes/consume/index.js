import specificframe from "../../controller/api/specificFrame.js";
import specificRack from "../../controller/api/specificRack.js";
import summaryRack from "../../controller/api/summaryRack.js";

export default (app) => {
  app.get("/api/dashboard", async (req, res) => {
    try {
      const data = req.query;
      const result = await summaryRack(data);
      res.status(200).json(result);
    } catch (error) {
      res.status(error.code).json({
        code: error.code,
        status: error.status,
        errors: error.message,
      });
    }
  });

  app.get("/api/specificRack", async (req, res) => {
    try {
      const data = req.query;
      const result = await specificRack(data);
      res.status(200).json(result);
    } catch (error) {
      res.status(error.code).json({
        code: error.code,
        status: error.status,
        errors: error.message,
      });
    }
  });

  app.get("/api/specificFrame", async (req, res) => {
    try {
      const data = req.query;
      const result = await specificframe(data);
      res.status(200).json(result);
    } catch (error) {
      res.status(error.code).json({
        code: error.code,
        status: error.status,
        errors: error.message,
      });
    }
  });
};
