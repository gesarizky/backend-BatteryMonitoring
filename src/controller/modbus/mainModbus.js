import * as cron from "node-cron";
import { storeDataRealtimes } from "../databases/RealtimeControl.js";
import processData from "./processData.js";
import saveDataChanged from "./saveDataChanged.js";
import { connectModbus } from "./connectModbus.js";
import { getAllTalis } from "../databases/SettingControl.js";

const mainModbus = async () => {
  try {
    const options = await getAllTalis();
    if (options) {
      for (const option of options) {
        const { type } = option;
        if (type === "tcp") {
          const { slaves } = option;
          cron.schedule(`*/5 * * * * *`, async () => {
            for (const slave of slaves) {
              const data = await processData(slave, option);
              if (data) {
                await storeDataRealtimes(data);
                await saveDataChanged(data);
              }
            }
          });
        }
        if (type === "serial") {
          const { slaves, type, port } = option;

          // Setting the connection options
          const connectionOptions = { type, port };

          // Connect to Modbus
          const client = await connectModbus(connectionOptions);
          if (client.isOpen) {
            cron.schedule(`*/5 * * * * *`, async () => {
              for (const slave of slaves) {
                const data = await processData(slave, option, client);
                if (data) {
                  await storeDataRealtimes(data);
                  await saveDataChanged(data);
                }
              }
            });
          }
        }
      }
    }
  } catch (error) {
    console.log("~ File mainModbus.js", error);
  }
};
export default mainModbus;
