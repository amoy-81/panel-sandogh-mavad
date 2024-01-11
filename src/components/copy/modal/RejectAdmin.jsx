import React, { useState , useEffect } from 'react'
import Loader from '../../loader/Loader'
import { Axios } from '../../../core/http-service'

export default function RejectAdmin({reqStatus , close , requestId , setUpdatePage}) {
    const [repText , setRepText] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [err, setErr] = useState(false)
    const [isLoadingHidden , setIsLoadingHidden] = useState(false)
    const [id_for_post, setId_for_post] = useState(null)
    const [id_for_post4, setId_for_post4] = useState(null)

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
    const changeHandler = (e) => {
        setRepText(e.target.value)
    }
    
    const sendReport = () => {
        setIsLoading(true)
        setErr(false)
        const data = {
            // request_id : reqId,
            is_accepted: false ,
            message : repText ,
        }
        if (reqStatus.assessment === true && reqStatus.report === false) {
            Axios.post(`/admin/confirm_report_admin/${id_for_post}`, data)
            .then(async (res) => {
                console.log(res);
                setUpdatePage(prev => prev + 1)
                setIsLoading(false)
                close(null)
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false)
                setErr(true)
            })
        } else if (reqStatus.report === true && reqStatus.commite === false) {
            Axios.post(`/admin/confirm_committee_admin/${id_for_post4}`, data)
            .then(async (res) => {
                console.log(res);
                setUpdatePage(prev => prev + 1)
                setIsLoading(false)
                close(null)
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false)
                setErr(true)
            })
        }
    }

    return (
        <div  className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex items-center justify-center">
          <div className="w-96 bg-white z-10 rounded-lg p-4 shadow-lg flex flex-col gap-4">
              <p className="text-center font-bold my-3 mb-1">متن گزارش خود را وارد کنید</p>
              <textarea
                  className="w-full h-12 border border-gray-300 rounded-xl my -2"
                  id=""
                  cols="40"
                  rows="20"
                  type={repText} onChange={changeHandler}
                ></textarea>
              {/* <input type={repText} onChange={changeHandler} /> */}
              {isLoading && <Loader />}
                {err && <p className="text-red-400 text-xs w-full m-1 justify-center">خطا در ارسال اطلاعات !</p>}
              <div className='flex'>
                <button onClick={() => close(null)} className="w-full m-1 rounded-lg border border-red-700 mt-2 text-red-700 p-3 font-bold text-xs">بستن</button>
                <button onClick={sendReport} className="w-full m-1 rounded-lg bg-blue-700 mt-2  text-white p-3 font-bold text-xs">تایید</button>
              </div>
            </div>
        </div>  
    )
}
