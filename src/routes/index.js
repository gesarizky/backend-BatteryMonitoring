import mainModbus from "../controller/modbus/mainModbus.js";
import consume from "./consume/index.js";
import setting from "./setting/index.js";

export default (app) => {
  app.get("/", async (req, res) => {
    res.json({ status: 200, message: "Our node.js app works" });
  });

  app.post("/api/run", async (req, res) => {
    try {
      await mainModbus();
      res.status(200).json({
        status: `Program work!`,
      });
    } catch (error) {
      res.status(error.code).json({
        code: error.code,
        status: error.status,
        errors: error.message,
      });
    }
  });
  consume(app);
  setting(app);
};
