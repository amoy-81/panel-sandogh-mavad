export const inputTitle = (name) => {
    if (name === "father_name") {
        return "نام پدر"
    }  else if (name === "number_certificate") {
        return "شماره شناسنامه"
    }  else if (name === "birth_day") {
        return "تاریخ تولد"
    }  else if (name === "study") {
        return "تحصیلات"
    }  else if (name === "place_issue") {
        return "محل صدور"
    }  else if (name === "series_certificate") {
        return "شماره سریال شناسنامه"
    }  else if (name === "nationality") {
        return "ملیت"
    }  else if (name === "gender") {
        return "جنسیت"
    }  else if (name === "marital" || name === "gendermarital") {
        return "وضعیت تاهل"
    }  else if (name === "residential") {
        return "وضعیت اقامت"
    }  else if (name === "education") {
        return "رشته تحصیلی"
    }  else if (name === "job") {
        return "شغل"
    }  else if (name === "address") {
        return "آدرس"
    }  else if (name === "postal_code" || name === "addresspostal_code") {
        return "کدپستی"
    }  else if (name === "phone") {
        return "شماره موبایل"
    }  else if (name === "namabar" || name === "phonenamabar") {
        return "نمابر"
    }  else if (name === "work_address") {
        return "آدرس محل کار"
    }  else if (name === "work_postal_code") {
        return "کدپستی محل کار"
    }  else if (name === "work_phone") {
        return "شماره محل کار"
    }  else if (name === "work_home") {
        return "محل کار"
    }  else if (name === "home_number") {
        return "تلفن ثابت"
    }  else if (name === "work_namabar") {
        return "نمابر محل کار"

    }  else if (name === "type_legal") {
        return "نوع شخصیت حقوقی"
    }  else if (name === "place_registration") {
        return "محل ثبت"
    }  else if (name === "establishment") {
        return "تاریخ تاسیس"
    }  else if (name === "signed_right") {
        return "دارندگان حق امضا"
    }  else if (name === "initial_investment") {
        return "سرمایه اولیه (میلیون ریال)"
    }  else if (name === "fund") {
        return "سرمایه فعلی (میلیون ریال)"
    }  else if (name === "subject_activity") {
        return "موضوع فعالیت (مطابق اساس نامه)"
    }  else if (name === "name_representative") {
        return "نام و نام خانوادگی نماینده شرکت"
    }  else if (name === "landline_phone") {
        return "تلفن ثابت"
    }  else if (name === "email") {
        return "پست الکترونیکی"
    }  else if (name === "site") {
        return "آدرس سایت"
    }  else if (name === "work_phonework_namabar") {
        return "نمابر محل کار"
    }  else if (name === "studyeducation") {
        return "تحصیلات"
    }  else {
        return name
    }
}