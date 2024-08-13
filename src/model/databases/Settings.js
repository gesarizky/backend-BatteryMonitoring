import { DataTypes } from "sequelize";
import DB from "../../config/database.js";

/**
 * @description tabel database
 */

const Talis5 = DB.define("setting_talis5", {
  talis_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  port: DataTypes.STRING,
  device_ip: DataTypes.STRING,
  slaves: DataTypes.JSON,
  type: DataTypes.STRING,
});

export default Talis5;

(async () => {
  // await DB.sync({ alter: true });
  await DB.sync();
})();
