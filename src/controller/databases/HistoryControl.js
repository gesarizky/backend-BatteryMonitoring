import Talis5History from "../../model/databases/Histories.js";

export const storeDataHistory = async (data) => {
  try {
    await Talis5History.create(data);
  } catch (error) {
    console.log("~ File history/historyControl.js storeDataHistory: ", error);
  }
};
