import React, { useState } from 'react'
import { Axios } from '../../../../../core/http-service';
import Loader from '../../../../../components/loader/Loader';
import LinesBenefitsUp from './childs/LinesBenefitsUp';

export default function S4BillsUp({close , data , id , toast }) {
    console.log(data);

    const [isLoading , setIsLoading] = useState(false)
    const [stepFour , setStepFour] = useState({
      benefits: [
            ...data
        ],
    })

    
    // console.log(sendObject);
    
    const sendHandler = (e) => {
        e.preventDefault()
        setIsLoading(false)
        Axios.put(`/v1/bank/${id}`, stepFour)
        .then((res) => {
          console.log(res.data)
          setIsLoading(true)
          toast("تغییرات باموفقیت ثبت شد")
          close(null)

        })
        .catch((err) => {
          console.log(err)
          setIsLoading(false)
          toast("ثبت تغییرات با خطا مواجه شد")
        })
    }

    if (isLoading) return <Loader />
    return (
      <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex flex-col items-center justify-center">
        <div className=" py-6 mt-4">
          <p className="text-lg text-white font-extrabold">
              صورت حساب سود و زیان (ارقام به میلیون ریال)
          </p>
      </div>

      <div className=" max-h-[70vh] overflow-scroll	">
          <table className="w-full rounded-xl overflow-hidden">
              <thead>
                  <tr className=" sticky top-0 text-xs border-b ">
                      <th className="bg-white p-3  " rowSpan={2}>
                          شرح حساب{" "}
                      </th>

                      <th className="bg-white p-3  " rowSpan={2}>
                          منتهی به تاریخ{" "}
                      </th>
                      <th className="bg-white p-3  ">آخرین تراز آزمایشی سال 1402</th>
                      <th className="bg-white p-3  ">سال 1401 </th>
                      <th className="bg-white p-3  "> سال 1400 </th>
                      <th className="bg-white p-3  "> سال 1399 </th>

                  </tr>
                  <tr className=" sticky top-0 text-xs border-b ">
                      <th className="bg-white p-3  ">مقدار قید شود </th>
                      <th className="bg-white p-3  ">مقدار قید شود </th>
                      <th className="bg-white p-3  ">مقدار قید شود </th>
                      <th className="bg-white p-3  ">مقدار قید شود </th>
                  </tr>
              </thead>
              <tbody className='max-h-[200px]'>
                  {stepFour.benefits &&
                      stepFour.benefits.map((item, index) => {
                          return (
                              <LinesBenefitsUp stepFour={stepFour} setStepFour={setStepFour} title={item.account} mapIndex={index} />
                          )
                      })
                  }
              </tbody>
          </table>
      </div>
      <div>
          <button className='bg-red-500 p-3 mt-2 ml-2 rounded-xl text-white shadow-md transition hover:bg-red-600' onClick={() => close(null)}>بستن</button>
          <button className='bg-green-500 p-3 mt-2 mr-2 rounded-xl text-white shadow-md transition hover:bg-green-600' onClick={sendHandler}>ثبت اطلاعات</button>
      </div>
    </div>
  )
}
