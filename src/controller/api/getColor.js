const Color = {
  BAD: "danger",
  GOOD: "success",
  WARNING: "warning",
};
const batasJSON = {
  badBawah: 2600,
  warningBawah: 3000,
  good: 3400,
  warningAtas: 3550,
  badAtas: 3600,
};
export const cellsColor = (value) => {
  let resultColor = Color.BAD;
  if (value >= 80) {
    resultColor = Color.GOOD;
  } else if (value >= 50) {
    resultColor = Color.WARNING;
  } else {
    resultColor = Color.BAD;
  }
  return resultColor;
};

export const voltColor = (value) => {
  if (value < batasJSON.badBawah || value > batasJSON.badAtas) {
    return "danger";
  } else if (value < batasJSON.warningBawah || value > batasJSON.warningAtas) {
    return "warning";
  } else {
    return "success";
  }
};

export const tempColor = (value) => {
  let color = Color.BAD;
  if (value > 45) {
  } else if (value > 35) {
    color = Color.WARNING;
  } else {
    color = Color.GOOD;
  }

  return color;
};