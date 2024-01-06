const titleChanger = (name) => {
  if (name === "file1") {
    return "اجازه نامه تکمیل شده استعلام رفتار اعتباری اشخاص حقیقی به تعداد اعضای هیئت مدیره";
  } else if (name === "file2") {
    return "اجازه نامه تکمیل شده استعلام رفتار اعتباری اشخاص حقوقی به نام شرکت";
  } else if (name === "file3") {
    return "فرم مشخصات مشتریان";
  } else if (name === "file4") {
    return "تکمیل فرم 1 - حقوقی";
  } else if (name === "file5") {
    return "شناسنامه ضمانت نامه";
  } else if (name === "file6") {
    return "عکس فیش واریزی";
  } else if (name === "bills") {
    return "تصویر قرارداد اجاره یا سند مالکیت محل استقرار شرکت";
  } else if (name === "register_doc") {
    return " مدارک ثبتی شرکت شامل اساسنامه/لیست سهامداران/روزنامه رسمی آخرین تغییرات ثبتی شرکت/پروانه و جواز تاسیس";
  } else if (name === "signatory") {
    return "تصویر مدارک هویتی اعضای هیئت مدیره  شرکت که صاحب امضا می باشند (تصویر کارت ملی و شناسنامه)";
  } else if (name === "statements") {
    return "اظهارنامه مالیاتی سال 1399 , 1400 , 1401";
  } else if (name === "balances") {
    return " اسکن گزارش معدل تمام حساب های فعال شرکت برای حداقل یک سال گذشته";
  } else if (name === "insurances") {
    return "آخرین لیست بیمه کارکنان شرکت";
  } else if (name === "knowledge") {
    return "مستندات قرارداد ها (فروش محصول به مشتریان) و فروش فصلی سال 1401";
  } else if (name === "resume") {
    return "معدل حساب های فعال شرکت و گردش حساب خلاصه سال 1401";
  } else if (name === "loans") {
    return "لیست تسهیلات و وام های اخذ شده شرکت";
  } else if (name === "invoices") {
    return "پیش فاکتور مواد اولیه و قطعات مورد نیاز جهت تولید محصول طرح";
  } else if (name === "licenses") {
    return "تصویر آخرین مجوز ها و گواهی نامه های اخذ شده توسط شرکت";
  } else if (name === "catalogs") {
    return "مشخصات فنی و کاتالوگ محصول / خدمات";
  } else {
    return ''
  }
};

export {titleChanger}