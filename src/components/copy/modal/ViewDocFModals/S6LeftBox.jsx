import React from 'react'

export default function S6LeftBox({object_f , close}) {
    console.log(object_f);
  return (
    <div  className="flex flex-col bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 items-center justify-center">
        <div className="flex flex-col rounded-lg p-6 border text-gray-400 text-xs mt-4 bg-white ">
            <p className="mb-2 text-gray-500">
                {
                    object_f.select === "f_license" ? "اجازه نامه تکمیل شده استعلام رفتار اعتباری اشخاص حقیقی به تعداد اعضای هیئت مدیره" :
                    object_f.select === "f_registration_doc" ? "مدارک ثبتی شرکت شامل اساسنامه/لیست سهامداران/روزنامه رسمی آخرین تغییرات ثبتی شرکت" :
                    object_f.select === "f_signatory" ? "تصویر مدارک هویتی اعضای هیئت مدیره  شرکت که صاحب امضا می باشند (تصویر کارت ملی و شناسنامه)" :
                    object_f.select === "f_knowledge" ? "گواهی دانش بنیان شرکت" :
                    object_f.select === "f_resume" ? "رزومه شرکت به همراه مستندات قرارداد های مشابه" :
                    object_f.select === "f_loans" ? "لیست تسهیلات و وامهای اخذ شده شرکت" :
                    object_f.select === "f_statement" ? "اظهارنامه مالیاتی سال 1398 ، 1399 و 1400 (در صورتی که فروش شرکت بیش از 8 میلیارد تومان بوده گزارش حسابرسی نیز باید ارسال شود)" :
                    object_f.select === "f_balance" ? " تراز آزمایشی منتهی به تاریخ 30/11/1400 به همراه معین کلیه حسابها" :
                    object_f.select === "f_catalog" ? "مشخصات فنی و کاتالوگ محصول / خدمات" :
                    object_f.select === "f_insurance" ? "آخرین لیست بیمه شرکت به همراه فیش بیمه پرداختی در وجه تامین اجتماعی" :
                    object_f.select === "f_proforma" ? "پیش فاکتور مواد اولیه و قطعات مورد نیاز جهت تولید محصول طرح" :
                    object_f.select === "f_bills" ? "قبوض اب و برق و قرداد اجاره محل اجرای طرح(در صورت استیجاری بودن)" : ""
                }
            </p>
            {
                object_f.data.map((item , index) => {
                    return (
                        <div key={index} className='mt-3'>
                            <span className="ml-2">نام فایل : {item.file_name}</span>
                            <a href={`${import.meta.env.VITE_IMAGES_URL}/${item.path}`} className="text-white text-xs p-1 rounded-md bg-blue-500" target='_blank'>
                            دانلود
                            </a>
                        </div>
                    )
                })
            }
        </div>
        <button onClick={() => close(null)}  className="m-1 rounded-lg bg-white mt-2 p-3 font-bold text-xs hover:text-red-500" >بستن</button>
    </div> 
  )
}
