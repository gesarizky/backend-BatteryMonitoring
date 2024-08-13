import { getSpecificDataRealtimes } from "../databases/RealtimeControl.js";
import { tempColor, voltColor } from "./getColor.js";

const specificframe = async (frameid) => {
  try {
    if (Object.keys(frameid).length === 0) {
      throw {
        message: "pcb_barcode must be provided",
        code: 400,
        status: "Bad Request",
      };
    }
    const frame_data = [];
    const temp_data = [];
    const { pcb_barcode } = frameid;
    const query = {
      where: { pcb_barcode: pcb_barcode },
      attributes: [
        "pcb_barcode",
        "sn_code",
        "cell_voltage_1",
        "cell_voltage_2",
        "cell_voltage_3",
        "cell_voltage_4",
        "cell_voltage_5",
        "cell_voltage_6",
        "cell_voltage_7",
        "cell_voltage_8",
        "cell_voltage_9",
        "cell_voltage_10",
        "cell_voltage_11",
        "cell_voltage_12",
        "cell_voltage_13",
        "cell_voltage_14",
        "cell_voltage_15",
        "cell_voltage_16",
        "cell_temperature_1",
        "cell_temperature_2",
        "cell_temperature_3",
        "cell_temperature_4",
      ],
    };
    const dataOlahs = await getSpecificDataRealtimes(query);
    if (!dataOlahs) {
      throw {
        message: `${pcb_barcode} not found`,
        code: 400,
        status: "Bad Request",
      };
    }
    const dataOlah = dataOlahs[0].dataValues;
    const sn_code = dataOlahs[0].sn_code;
    for (let i = 1; i <= 16; i++) {
      const key = `cell_voltage_${i}`;
      frame_data.push({
        cell: i,
        cell_voltage: dataOlah[key],
        color: voltColor(dataOlah[key]),
      });
    }
    for (let i = 1; i <= 4; i++) {
      const key = `cell_temperature_${i}`;
      temp_data.push({
        censor: i,
        censor_temp: dataOlah[key],
        color: tempColor(dataOlah[key]),
      });
    }
    const result = { data: { pcb_barcode, sn_code, frame_data, temp_data } };
    return result;
  } catch (error) {
    // Handle any database-related errors here
    const errorCode = error.code !== undefined ? error.code : 500;
    const errorStatus =
      errorCode === 500 ? "Internal Server Error" : error.status;
    // Rethrow the error with the appropriate code and status
    throw {
      code: errorCode,
      status: errorStatus,
      message: error.message,
    };
  }
};
export default specificframe;
