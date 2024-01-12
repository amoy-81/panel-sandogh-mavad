import React from 'react'

export default function FinishModal({confirm , sendHandler , close}) {
  return (
    <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex items-center justify-center">
        <div
            dir="rtl"
            className="  mx-auto w-1/2  first-letter: p-4 bg-gray-700 rounded-2xl text-white"
        >
            <h1 className="text-3xl text-yellow-300 font-medium">
            درخواست تسهیلات{" "}
            </h1>
            <p className="my-5 text-justify	">
            اینجانب {confirm.name} مدیرعامل شرکت ضمن اعلام موافقت و قبول
            شرایط آن صندوق، درخواست مبلغ {confirm.amount}
            ریال به عنوان تسهیلات {confirm.title} به منظور تأمین
            {confirm.supply} را دارم و کلیه برگه های تكمیل شده و اسناد
            تعهدآور ارائه شده را مورد تائید قرار داده و اعلام می دارم که
            اطلاعات تكمیلی بر اساس آخرین تغییرات ثبتی مندرج در روزنامه رسمی
            ارائه شده و با امضاء این برگه مسئولیت هرگونه مغایرت یا خطا و یا
            کشف سوءاستفاده احتمالی را به عهده می گیرم. همچنین صندوق توسعه
            فناوری نانو اختیار دارد نسبت به پرداخت یا عدم پرداخت تسهیلات
            مذکور تصمیم گیری نماید.{" "}
            </p>
            <button
                onClick={() => {
                    sendHandler()
                }}
                className="bg-purple-400 p-2 rounded ml-2"
            >
            امضاء
            </button>
            <button onClick={() => close(false)} className=" bg-[#6272A4] p-2 rounded">
            انصراف
            </button>
        </div>
    </div>
  )
}
