export const getStringDate = (date) => {
  const dateString = date.toString().split(" ");
  const dateCal =
    date.getUTCFullYear() +
    "/" +
    date.getUTCMonth() +
    "(" +
    dateString[1] +
    ")" +
    "/" +
    date.getUTCDate() +
    "(" +
    dateString[0] +
    ")";
    
  return dateCal;
};

export const getStringTime = (date) => {
  const dateString = date.toString().split(" ");
  const dateTim = dateString[4];
  return dateTim;
};

export const getNumericStringDate = (date) => {
  const dateCal =
    date.getUTCFullYear() + "/" + date.getUTCMonth() + "/" + date.getUTCDate();
  return dateCal;
};
