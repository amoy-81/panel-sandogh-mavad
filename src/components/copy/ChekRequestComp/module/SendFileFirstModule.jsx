import React , { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../../Loader/Loader';
export default function SendFileFirstModule({ close , reqId , setUpdatePage }) {

    const [isLoading, setIsLoading] = useState(false)
    const [err, setErr] = useState(false)
    const [fileErr, setFileErr] = useState(false)
    const [stepSendReq, setStepSendReq] = useState(false)

    const [fileData, setFileData] = useState({
        file: null,
    })

    const changeHandler = (e) => {
        setFileData({
            ...fileData, [e.target.name]: e.target.files[0]
        })
        setFileErr(false)
        console.log(fileData);
    }
    const step3Handler = () => {
        setFileErr(false)
        if (fileData.file !== null) {
            const formData = new FormData();
            // formData.append("request_id", fileData.request_id)
            formData.append("file", fileData.file)

            const token = localStorage.getItem('token');
            const isLoggedIn = token ? true : false;
            
            setErr(false)
            setIsLoading(true)
            setStepSendReq(true)
            axios.post(`/api/admin/evaluation_report/${reqId}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                ...(isLoggedIn && {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }),
                "X-HTTP-Method-Override": "PUT",
              }
            })
              .then(async (res) => {
                console.log(res);
                setUpdatePage(prev => prev + 1)
                setIsLoading(false)
                setStepSendReq(false)
              })
              .catch((error) => {
                console.log(error);
                setIsLoading(false)
                setStepSendReq(false)
                setErr(true)
              })
        } else if (fileData.file === null) {
            setFileErr(true)
        }
    }

    return (
        <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex items-center justify-center">
            <div className="m-3 bg-white rounded-xl p-5">
                {isLoading && <Loader />}
                <div className=" flex justify-between p-3 pb-4 ">
                    <p className=" font-bold"> تغییر فایل گزارش ارزیابی </p>
                    <p onClick={() => close(false)} className=" cursor-pointer">بستن</p>
                </div>
                <hr className="border-dashed border-gray-300" />
        
                <hr className="border-dashed border-gray-300" />
                <div className="rounded-lg p-2 border text-gray-400 text-xs mt-4">
                    <p className="">
                        تصویر مجوز ها و گواهی نامه های اخذ شده توسط شرکت
                    </p>
                    {
                        fileData.file === null ?
                        <label htmlFor="step3" className="text-blue-400 text-xs w-full justify-center">
                            برای بارگذاری کلیک کنید
                        </label> :
                        <div>
                            <p className="text-blue-400 text-xs w-full m-1 justify-center">
                            {
                                `نام فایل : ${fileData.file.name}`
                            }
                            </p>
                            <label htmlFor="step3" className="text-yellow-400 m-1 text-xs w-full justify-center">
                            برای تغییر کلیک کنید
                            </label>

                        </div>
                    }
                    {stepSendReq && <p className="text-green-400 text-xs w-full m-1 justify-center">در حال ارسال اطلاعات...</p>}
                    {fileErr && <p className="text-yellow-400 text-xs w-full m-1 justify-center">فایلی انتخاب کنید</p>}
                    {err && <p className="text-red-400 text-xs w-full m-1 justify-center">خطا در ارسال اطلاعات !</p>}
                    <input id="step3" style={{ display: "none" }} accept="application/pdf" type="file" onChange={changeHandler} name="file" />
                    <button onClick={step3Handler} className="w-full  rounded-lg bg-blue-700 mt-2  text-white p-3 font-bold text-xs">
                        ثبت{" "}
                    </button>
                </div>
            </div>
        </div>
    )
}
