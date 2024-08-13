import { DataTypes } from "sequelize";
import DB from "../../config/database.js";

/**
 * @description tabel database
 */

const Talis5History = DB.define("history_talis5", {
  pcb_barcode: DataTypes.STRING,
  sn_code: DataTypes.STRING,
  slave_id: DataTypes.INTEGER,
  voltage: DataTypes.FLOAT,
  current: DataTypes.FLOAT,
  remaining_capacity: DataTypes.FLOAT,
  average_cell_temperature: DataTypes.FLOAT,
  warning_flag: DataTypes.INTEGER,
  protection_flag: DataTypes.INTEGER,
  fault_status_flag: DataTypes.INTEGER,
  soc: DataTypes.FLOAT,
  soh: DataTypes.FLOAT,
  full_charged_cap: DataTypes.FLOAT,
  cycle_count: DataTypes.INTEGER,
  cell_voltage_1: DataTypes.FLOAT,
  cell_voltage_2: DataTypes.FLOAT,
  cell_voltage_3: DataTypes.FLOAT,
  cell_voltage_4: DataTypes.FLOAT,
  cell_voltage_5: DataTypes.FLOAT,
  cell_voltage_6: DataTypes.FLOAT,
  cell_voltage_7: DataTypes.FLOAT,
  cell_voltage_8: DataTypes.FLOAT,
  cell_voltage_9: DataTypes.FLOAT,
  cell_voltage_10: DataTypes.FLOAT,
  cell_voltage_11: DataTypes.FLOAT,
  cell_voltage_12: DataTypes.FLOAT,
  cell_voltage_13: DataTypes.FLOAT,
  cell_voltage_14: DataTypes.FLOAT,
  cell_voltage_15: DataTypes.FLOAT,
  cell_voltage_16: DataTypes.FLOAT,
  max_cell_voltage: DataTypes.FLOAT,
  min_cell_voltage: DataTypes.FLOAT,
  cell_voltage_diff: DataTypes.FLOAT,
  max_cell_temperature: DataTypes.FLOAT,
  min_cell_temperature: DataTypes.FLOAT,
  fet_temperature: DataTypes.FLOAT,
  cell_temperature_1: DataTypes.FLOAT,
  cell_temperature_2: DataTypes.FLOAT,
  cell_temperature_3: DataTypes.FLOAT,
  cell_temperature_4: DataTypes.FLOAT,
  ambient_temperature: DataTypes.FLOAT,
  remaining_charge_time: DataTypes.FLOAT,
  remaining_discharge_time: DataTypes.FLOAT,
  talis_id: DataTypes.STRING,
});

export default Talis5History;

(async () => {
  // await DB.sync({ alter: true });
  await DB.sync();
})();
