import Talis5History from "../../model/databases/Histories.js";

const saveDataChanged = async (newData) => {
  try {
    const { pcb_barcode, slave_id } = newData;

    // Ambil data terakhir dari tabel history
    const lastData = await Talis5History.findOne({
      where: { pcb_barcode: pcb_barcode, slave_id: slave_id },
      order: [["createdAt", "DESC"]],
      attributes: [
        "pcb_barcode",
        "slave_id",
        "voltage",
        "current",
        "average_cell_temperature",
        "soc",
        "soh",
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
        "talis_id",
        "sn_code",
      ],
    });

    let isChanged = false;

    if (lastData) {
      const lastDataValues = lastData.dataValues;
      for (const key in newData) {
        if (
          typeof newData[key] === "number" &&
          typeof lastDataValues[key] === "number"
        ) {
          // console.log("compare data :", newData[key], lastDataValues[key]);
          // Periksa perubahan lebih dari berapa %
          const difference = Math.abs(newData[key] - lastDataValues[key]);
          const percentageChange = (difference / lastDataValues[key]) * 100;
          // console.log("diff %:",percentageChange);
          if (percentageChange > 10) {
            // console.log("data berubah");
            isChanged = true;
            break;
          }
        } 
      }
    } else {
      isChanged = true; // Jika tidak ada data sebelumnya, data baru pasti berbeda
    }

    if (isChanged) {
      await Talis5History.create(newData); // Simpan data baru ke tabel history
      // console.log("Data berubah dan disimpan ke history:");
    }
  } catch (error) {
    console.error("Error saving data to history:", error);
  }
};
export default saveDataChanged;
