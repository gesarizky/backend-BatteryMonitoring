import { getSpecificDataRealtimes } from "../databases/RealtimeControl.js";
import { cellsColor } from "./getColor.js";

const specificRack = async (talisid) => {
  try {
    if (Object.keys(talisid).length === 0 ) {
      throw {
        message: "Talis id must be provided",
        code: 400,
        status: "Bad Request",
      };
    }
    const { talis_id } = talisid;
    const query = {
      where: { talis_id: talis_id },
      attributes: ["pcb_barcode", "sn_code","soc", "slave_id"],
      order: [["slave_id", "ASC"]],
    };
    const datas = await getSpecificDataRealtimes(query);
    if (!datas) {
       throw {
        message: `${talis_id} not found`,
        code: 400,
        status: "Bad Request",
      };
    }
    const rack_data = datas.map((item) => ({
      pcb_barcode: item.dataValues.pcb_barcode,
      sn_code: item.dataValues.sn_code,
      slave: item.dataValues.slave_id,
      soc: item.dataValues.soc,
      color: cellsColor(item.dataValues.soc),
    }));
    const result = { data: { talis_id, rack_data } };
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
export default specificRack;
