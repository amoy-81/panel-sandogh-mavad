function requestStatusConvert(status) {
  if (status === "check") {
    return "بررسی مدارک";
  } else if (status === "assessment") {
    return "ارزیابی";
  } else if (status === "report") {
    return "گزارش ارزیابی";
  } else if (status === "committee") {
    return "کمیته";
  } else if (status === "credit") {
    return "اعلام حد اعتباری";
  } else if (status === "agreement") {
    return "امضای قرارداد";
  } else if (status === "check_evidence") {
    return "تایید مدارک";
  } else if (status === "evidence") {
    return "آپلود مدارک";
  } else if (status === "wage") {
    return "کارمز وجه و وثیقه";
  } else {
    return "در انتظار بررسی";
  }
}

export default requestStatusConvert;
