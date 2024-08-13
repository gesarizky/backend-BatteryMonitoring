import ModbusRTU from "modbus-serial";
import {
  convertToASCII,
  convertToSigned,
  groupValuesByDescription,
} from "./HelperFunction.js";

export const connectAndRead = async (option) => {
  const { type, host, port, slaveId, startAddress, numberOfRegisters } = option;
  const client = new ModbusRTU();
  let timeout = false;

  const connectToClient = () => {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        timeout = true;
        reject(new Error("Koneksi timeout"));
      }, 5000);

      if (type === "tcp") {
        client
          .connectTCP(host, { port })
          .then(() => {
            clearTimeout(timer);
            resolve();
          })
          .catch((error) => {
            clearTimeout(timer);
            reject(error);
          });
      }
    });
  };

  try {
    await connectToClient();
    // console.log(`connected to ${host}`);

    client.setID(slaveId);

    const data = await client.readInputRegisters(
      startAddress,
      numberOfRegisters
    );
    const values = data.data.map(convertToSigned);

    if (startAddress === 4156 || startAddress === 4171) {
      return convertToASCII(values);
    } else {
      return groupValuesByDescription(values, startAddress);
    }
  } catch (error) {
    console.error("Error Connect and Read :", error);
    // if (!timeout) {
    //   return startAddress === 4156
    //     ? "".padStart(numberOfRegisters * 2, "0")
    //     : {};
    // }
  } finally {
    client.close();
  }
};

export const connectModbus = async (options) => {
  const { type, port } = options;

  const client = new ModbusRTU();

  try {
    if (type === "serial") {
      console.log(`Connecting to serial port ${port}...`); // Tambahkan log untuk debug
      await client.connectRTUBuffered(port, {
        baudRate: 9600,
        parity: "none",
        dataBits: 8,
        stopBits: 1,
      });
      console.log(`Connected to serial port`); // Tambahkan log untuk debug
    }
  } catch (error) {
    console.error(`~File connectModbus Connection error: ${error.message}`);
  } finally {
    return client;
  }
};

export const readModbus = async (client, options) => {
  try {
  
    const { slaveId, startAddress, numberOfRegisters } = options;

    client.setID(slaveId);
    const data = await client.readInputRegisters(
      startAddress,
      numberOfRegisters
    );
    const values = data.data.map(convertToSigned);

    if (startAddress === 4096) {
      return groupValuesByDescription(values, startAddress);
    } else {
      return convertToASCII(values);
    }
  } catch (error) {
    console.log("error  readModbus :", error);
  }
};

export const closeModbus = (client) => {
  client.close();
};
