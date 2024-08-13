import Talis5 from "../../model/databases/Settings.js";

export const createTalis = async (data) => {
  try {
    const { talis_id, port, device_ip, slaves, type } = data;
    const errors = {};

    //validate input
    if (talis_id === "" || talis_id === null) {
      errors.talis_id = ["must not be null"];
    }
    if (port === "" || port === null) {
      errors.port = ["must not be null"];
    }
    if (type === "tcp" && (device_ip === "" || device_ip === null)) {
      errors.device_ip = ["must not be null"];
    }
    if (
      typeof slaves !== "object" ||
      slaves === null ||
      Object.keys(slaves).length === 0
    ) {
      errors.slaves = ["must not be null"];
    }
    if (type === "" || type === null) {
      errors.type = ["must not be null"];
    }

    // penampung error handling inputan
    if (Object.keys(errors).length > 0) {
      throw {
        code: 400,
        status: "Bad Request",
        message: errors,
      };
    }

    await Talis5.upsert(data);
    return `Talis ${talis_id} is Created`;
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

export const deleteTalis = async (data) => {
  try {
    const { talis_id } = data;
    const respon = await Talis5.destroy({
      where: {
        talis_id,
      },
    });
    if (respon > 0) {
      return `${talis_id} is deleted `;
    } else {
      throw {
        code: 404,
        status: "Not Found",
        message: `No data found for: ${talis_id}`,
      };
    }
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

export const getAllTalis = async () => {
  try {
    const result = await Talis5.findAll();
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

export const getAllCountTalis = async (query) => {
  try {
    const result = await Talis5.findAndCountAll(query);
    return result;
  } catch (error) {
    console.log("error : ~ File getAllCountTalis/SettingControl.js :".error);
    throw {
      message: error.message,
    };
  }
};

export const getSpecificTalis = async (query) => {
  try {
    const result = await Talis5.findOne(query);
    return result;
  } catch (error) {
    console.log("error : ~ File getSpecificTalis/SettingControl.js :".error);
    throw {
      message: error.message,
    };
  }
};
