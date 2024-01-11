import React , { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader';
import Axios from '../../../axiosinstancs';
import SendFileFirstModule from './module/SendFileFirstModule';

export default function SendFileFirst({ reqStatus , reqId , setUpdatePage }) {

    const [rendering, setRendering] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [err, setErr] = useState(false)
    const [fileErr, setFileErr] = useState(false)
    const [stepSendReq, setStepSendReq] = useState(false)
    const [up, setUp] = useState(0)
    const [updateModule, setUpdateModule] = useState(false)


    const [fileStorage, setFileStorage ] = useState({
        file : null,
    })
    const [fileData, setFileData] = useState({
        request_id: reqId,
        file: null,
    })

    useEffect(() => {
        setRendering(true)
        // get step 3
        Axios.get(`/api/admin/get_report_for_admin/${reqId}`).then(async (res) => {
            console.log(res);
            setFileStorage({
                file : res.data.file_name
            })
            setRendering(false)
        }) .catch(async (err) => {
            console.log(err.response.data);
            setRendering(false)
            setFileStorage({
                file : null
            })
        })
    } , [ up ])
    
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
            formData.append("request_id", fileData.request_id)
            formData.append("file", fileData.file)
            const token = localStorage.getItem('token');
            const isLoggedIn = token ? true : false;
            setErr(false)
            setIsLoading(true)
            setStepSendReq(true)
            axios.post("/api/admin/evaluation_report", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                ...(isLoggedIn && {
                    Authorization: `Bearer ${JSON.parse(token)}`
                })
              }
            })
              .then(async (res) => {
                console.log(res);
                setUpdatePage(prev => prev + 1)
                setUp((prev) => prev + 1)
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

      if (rendering) {
        return (
            <div className=" m-3 bg-white rounded-xl p-5">
                <div className=" pb-4">
                    <p className=" font-bold"> آپلود فایل گزارش ارزیابی </p>
                </div>
                <hr className="border-dashed border-gray-300" />

                <hr className="border-dashed border-gray-300" />
                <div className="rounded-lg p-2 border text-green-700 text-xs mt-4">
                    <p className="text-yellow-500">
                        در حال بارگذاری...
                    </p>
                </div>
            </div>
        )
      }
      if (reqStatus.report === true) {
        return (
            <div className=" m-3 bg-white rounded-xl p-5">
                <div className=" pb-4">
                    <p className=" font-bold"> آپلود فایل گزارش ارزیابی </p>
                </div>
                <hr className="border-dashed border-gray-300" />

                <hr className="border-dashed border-gray-300" />
                <div className="rounded-lg p-2 border text-green-700 text-xs mt-4">
                    <p className="text-green-500">
                        کامل شده
                    </p>
                </div>
            </div>
        )
      } else if (reqStatus.assessment === false) {
        return (
            <div className=" m-3 bg-white rounded-xl p-5">
                <div className=" pb-4">
                    <p className=" font-bold"> آپلود فایل گزارش ارزیابی </p>
                </div>
                <hr className="border-dashed border-gray-300" />

                <hr className="border-dashed border-gray-300" />
                <div className="rounded-lg p-2 border text-red-700 text-xs mt-4">
                    <p className="">
                        این بخش هنوز فعال نیست
                    </p>
                </div>
            </div>
        )
      } else if (reqStatus.assessment === true && reqStatus.report === false && fileStorage.file === null) {
        return (
            <div className="m-3 bg-white rounded-xl p-5">
                {isLoading && <Loader />}
                <div className=" pb-4">
                    <p className=" font-bold"> آپلود فایل گزارش ارزیابی </p>
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
        )
      } else if (reqStatus.assessment === true && reqStatus.report === false && fileStorage.file !== null) {
        return (
            <div className="m-3 bg-white rounded-xl p-5">
                {updateModule && <SendFileFirstModule close={setUpdateModule} reqId={reqId} setUpdatePage={setUpdatePage} />}
                <div className=" pb-4">
                  <p className=" font-bold"> آپلود فایل گزارش ارزیابی </p>
                </div>
                <hr className="border-dashed border-gray-300" />

                <hr className="border-dashed border-gray-300" />
                <div className="rounded-lg p-2 border text-green-700 text-xs mt-4">

                  <p className="text-gray-400">
                    نام فایل : {fileStorage.file}
                  </p>
                  <p className="text-yellow-500">
                    درحال بررسی توسط مدیر
                  </p>
                  <p onClick={() => setUpdateModule(true)} className='text-blue-400 pt-2 cursor-pointer hover:text-blue-500'>تغییر و بارگذاری دوباره فایل</p>
                </div>
            </div>
        )
      }

}
