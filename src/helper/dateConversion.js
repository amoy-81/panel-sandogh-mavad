import moment from "jalali-moment";
export const dateConversion = (event) => {
  const miladi = event.split(".")[0];
  const date = moment(miladi, "YYYY-MM-DDTHH:mm:ss");
  const shamsi = date.format("jYYYY/jM/jD HH:mm");
  return shamsi;
};

export const onlyDateConversion = (event) => {
  const miladi = event.split("T")[0];
  const date = moment(miladi, "YYYY-MM-DD");
  const shamsiDate = date.format("jYYYY/jM/jD");
  return shamsiDate;
};
