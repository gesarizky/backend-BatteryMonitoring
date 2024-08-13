import ModbusModel from "../../model/access/ModbusModel.js";
import { connectAndRead, readModbus } from "./connectModbus.js";

const processData = async (slave, option, client) => {
  try {
    const { type, device_ip, port, talis_id } = option;
    let optionData;
    let optionPcb;
    let optionSn;
    if (type === "tcp") {
      optionData = {
        type: type,
        host: device_ip,
        port: 502,
        slaveId: slave,
        startAddress: 0x1000,
        numberOfRegisters: 41,
      };
      optionPcb = {
        type: type,
        host: device_ip,
        port: 502,
        slaveId: slave,
        startAddress: 0x103c,
        numberOfRegisters: 14,
      };
      optionSn = {
        type: type,
        host: device_ip,
        port: 502,
        slaveId: slave,
        startAddress: 0x104b,
        numberOfRegisters: 15,
      };
      let datas;
      datas = await connectAndRead(optionData);
      const pcb = await connectAndRead(optionPcb);
      const sn = await connectAndRead(optionSn);
      if (datas && pcb) {
        datas.pcb_barcode = pcb;
        datas.slave_id = slave;
        datas.talis_id = talis_id;
        datas.sn_code = sn;
        const result = new ModbusModel(datas);
        return result;
      }
    }
    if (type === "serial") {
      optionData = {
        type: type,
        port: port,
        serialOptions: {
          baudRate: 9600,
          parity: "none",
          dataBits: 8,
          stopBits: 1,
        },
        slaveId: slave,
        startAddress: 0x1000,
        numberOfRegisters: 41,
      };
      optionPcb = {
        type: type,
        port: port,
        serialOptions: {
          baudRate: 9600,
          parity: "none",
          dataBits: 8,
          stopBits: 1,
        },
        slaveId: slave,
        startAddress: 0x103c,
        numberOfRegisters: 14,
      };
      optionSn = {
        type: type,
        port: port,
        serialOptions: {
          baudRate: 9600,
          parity: "none",
          dataBits: 8,
          stopBits: 1,
        },
        slaveId: slave,
        startAddress: 0x104b,
        numberOfRegisters: 15,
      };
      let datas = await readModbus(client, optionData);
      const pcb = await readModbus(client, optionPcb);
      const sn = await readModbus(client, optionSn);
      if (datas && pcb) {
        datas.pcb_barcode = pcb;
        datas.slave_id = slave;
        datas.talis_id = talis_id;
        datas.sn_code = sn;
        const result = new ModbusModel(datas);
        return result;
      }
    }
  } catch (error) {
    console.error("~ File modbus/processData.js:", error);
  }
};
export default processData;
