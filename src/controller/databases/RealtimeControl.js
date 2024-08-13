import Talis5Realtime from "../../model/databases/Realtimes.js";

export const storeDataRealtimes = async (data) => {
  try {
    await Talis5Realtime.upsert(data);
  } catch (error) {
    console.log("~ File realtime/talis5Control.js storeDataRealtimes: ", error);
  }
};

export const getAllDataRealtimes = async () => {
  try {
    const result = await Talis5Realtime.findAll();
    return result;
  } catch (error) {
    console.log(
      "~ File realtime/RealtimeControl.js getAllDataRealtimes: ",
      error
    );
  }
};

export const getCountAllDataRealtimes = async (query) => {
  try {
    const result = await Talis5Realtime.findAndCountAll(query);
    return result;
  } catch (error) {
    console.log(
      "~ File realtime/RealtimeControl.js getCountAllDataRealtimes: ",
      error
    );
  }
};
export const getSpecificDataRealtimes = async (query) => {
  try {
    const result = await Talis5Realtime.findAll(query);
    return result;
  } catch (error) {
    console.log(
      "~ File realtime/RealtimeControl.js getAllDataRealtimes: ",
      error
    );
  }
};
