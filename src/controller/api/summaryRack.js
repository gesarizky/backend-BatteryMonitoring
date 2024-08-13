import { getAllDataRealtimes } from "../databases/RealtimeControl.js";
import { cellsColor } from "./getColor.js";

const summaryRack = async (params) => {
  try {
    const { page = 1, perpage = 12 } = params;
    const datas = await getAllDataRealtimes();
    let dataOlah = [];
    for (const data of datas) {
      dataOlah.push({
        talis_id: data.talis_id,
        pcb_barcode: data.pcb_barcode,
        soc: data.soc,
        color: cellsColor(data.soc),
      });
    }
    const groupedData = dataOlah.reduce((acc, curr) => {
      if (!acc[curr.talis_id]) {
        acc[curr.talis_id] = {
          talis_id: curr.talis_id,
          min_soc: curr.soc,
          color: cellsColor(curr.soc),
        };
      } else {
        acc[curr.talis_id].min_soc = Math.min(
          acc[curr.talis_id].min_soc,
          curr.soc
        );
        acc[curr.talis_id].color = cellsColor(acc[curr.talis_id].min_soc);
      }
      return acc;
    }, {});

    let allData = Object.values(groupedData);
    // Sort the data based on talis_id
    allData.sort((a, b) => a.talis_id.localeCompare(b.talis_id));
    const totalItems = allData.length;
    const totalPages = Math.ceil(totalItems / perpage);
    const startIndex = (page - 1) * perpage;
    const paginatedData = allData.slice(startIndex, startIndex + perpage);

    const result = {
      data: paginatedData,
      pagination: {
        current_page: page,
        last_visible_page: totalPages,
        items: {
          total: totalItems,
          per_page: perpage,
        },
      },
    };

    return result;
  } catch (error) {
    console.log("~ File summaryRack.js :", error);
  }
};

export default summaryRack;
