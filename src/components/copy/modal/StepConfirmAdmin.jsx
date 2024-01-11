import React, { useState , useEffect } from 'react'
import { Axios } from '../../../core/http-service'
import Loader from '../../loader/Loader'

export default function StepConfirmAdmin({action , requestId , close , setUpdatePage}) {
  const [isLoading , setIsLoading] = useState(false)
  const [isLoadingHidden , setIsLoadingHidden] = useState(false)
  const [id_for_post, setId_for_post] = useState(null)
  const [id_for_post4, setId_for_post4] = useState(null)
  const [err, setErr] = useState(false)

  useEffect(() => {
    // get step 3
    setIsLoadingHidden(true)
    Axios.get(`/admin/get_report_for_admin/${requestId}`).then(async (res) => {
        console.log(res);
        setId_for_post(res.data.id)
        setIsLoadingHidden(false)
    }) .catch(async (err) => {
        console.log(err.response.data);
        setId_for_post(null)
        setIsLoadingHidden(false)
    })
    // get stepp 4
    Axios.get(`/admin/get_committee_for_admin/${requestId}`).then(async (res) => {
        console.log(res);
        setId_for_post4(res.data.id)
        setIsLoadingHidden(false)
    }) .catch(async (err) => {
          console.log(err.response.data);
          setId_for_post4(null)
          setIsLoadingHidden(false)
        })
  } , [])

  const confirmHandler = () => {
    setIsLoading(true)
    setErr(false)
    if (action.step === 3 && action.prevTest === true && id_for_post !== null) {
      Axios.post(`/admin/confirm_report_admin/${id_for_post}` , {
        // request_id : requestId,
        is_accepted:true
      }).then(async(res) => {
        console.log(res);
        setIsLoading(false)
        setUpdatePage(prev => prev + 1)
        close(null)
        setErr(false)
      })
      .catch(() => {
        setErr(true)
        setIsLoading(false)
      })
    } else if (action.step === 4 && action.prevTest === true && id_for_post4 !== null) {
      Axios.post(`/admin/confirm_committee_admin/${id_for_post4}` , {
        // request_id : requestId,
        is_accepted:true
      }).then(async(res) => {
        console.log(res);
        setIsLoading(false)
        setUpdatePage(prev => prev + 1)
        close(null)
        setErr(false)
      })
      .catch(() => {
        setErr(true)
        setIsLoading(false)
      })
    } else {
      setErr(true)
      setIsLoading(false)
    }
  }

    if (action.currentStep === true) {
      return (
        <div  className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex items-center justify-center">
          <div className="w-96 bg-white z-10 rounded-lg p-4 shadow-lg flex flex-col gap-4">
              <p className="text-center font-bold my-3 mb-1">این مرحله قبلا تایید شده است</p>
              <div className='flex'>
                <button onClick={() => close(null)}  className="w-full m-1 rounded-lg border border-red-700 mt-2 text-red-700 p-3 font-bold text-xs" >بستن</button>
              </div>
          </div>
      </div>  
      )
  
    } else if (action.prevTest === false) {
      return (
        <div  className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex items-center justify-center">
          <div className="w-96 bg-white z-10 rounded-lg p-4 shadow-lg flex flex-col gap-4">
              <p className="text-center font-bold my-3 mb-1">مراحل قبل هنوز تکمیل نشده</p>
              <div className='flex'>
                <button onClick={() => close(null)}  className="w-full m-1 rounded-lg border border-red-700 mt-2 text-red-700 p-3 font-bold text-xs" >بستن</button>
              </div>
          </div>
      </div>  
      )
  
    } else if (action.step === 1 || action.step === 2 || action.step === 5) {
      return (
        <div  className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex items-center justify-center">
          <div className="w-96 bg-white z-10 rounded-lg p-4 shadow-lg flex flex-col gap-4">
              <p className="text-center font-bold my-3 mb-1">این بخش توسط کارشناس تکمیل میگردد</p>
              <div className='flex'>
                <button onClick={() => close(null)}  className="w-full m-1 rounded-lg border border-red-700 mt-2 text-red-700 p-3 font-bold text-xs" >بستن</button>
              </div>
          </div>
      </div>  
      )
  
    } else if (action.step === 3 || action.step === 4) {
      return (
        <div  className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex items-center justify-center">
          <div className="w-96 bg-white z-10 rounded-lg p-4 shadow-lg flex flex-col gap-4">
              <p className="text-center font-bold my-3 mb-1">آیا مایل به تایید  مرحله {action.step} هستید؟</p>
              {
                (action.step === 3 && id_for_post !== null) || (action.step === 4 && id_for_post4 !== null) ?
                <p className="text-center my-3 mb-1">
                  {
                    action.step === 1 ? " بررسی مدارک تکمیل شد" :
                    action.step === 2 ? "ارزیابی " :
                    action.step === 3 ? "گزارش ارزیابی" :
                    action.step === 4 ? "کمیته" :
                    action.step === 5 ? "اعلام حد اعتباری" : ""
                  }
                </p> : isLoadingHidden === false ?
                <p style={{textAlign : "center"}} className="text-yellow-400 text-xs w-full m-1 justify-center">این مرحله هنوز از سمت کارشناس کامل نشده</p>
                : 
                <p style={{textAlign : "center"}} className="text-yellow-400 text-xs w-full m-1 justify-center">درحال دریافت اطلاعات</p>
              }
            {err && <p style={{textAlign : "center"}} className="text-red-400 text-xs w-full m-1 justify-center">خطا در ارسال اطلاعات !</p>}
              {isLoading && <Loader />}
              <div className='flex'>
                <button onClick={() => close(null)}  className="w-full m-1 rounded-lg border border-red-700 mt-2 text-red-700 p-3 font-bold text-xs" >بستن</button>
                {
                  (action.step === 3 && id_for_post !== null) || (action.step === 4 && id_for_post4 !== null) ?
                  <button onClick={confirmHandler} className="w-full m-1 rounded-lg bg-blue-700 mt-2  text-white p-3 font-bold text-xs" >تایید</button>
                  : ""
                }
              </div>
          </div>
        </div>  
      )
  
    }
}
