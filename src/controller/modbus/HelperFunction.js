import registerDescriptions from "../../model/access/RegisterDesc.js";

export const convertToSigned = (value) => (value > 32767 ? value - 65536 : value);
export const convertToASCII = (values) => {
  const nonZeroData = values.filter((number) => number !== 0);
  const hexData = nonZeroData.map((number) =>
    number.toString(16).padStart(2, "0")
  );
  return hexData
    .map((hex) => Buffer.from(hex, "hex").toString().replace(/\s+/g, ""))
    .join("");
};

export const groupValuesByDescription = (values, startAddress) => {
  return values.reduce((acc, value, index) => {
    const address = startAddress + index;
    const description = registerDescriptions[address] || `Register ${address}`;
    acc[description] = value;
    return acc;
  }, {});
};