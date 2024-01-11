import React , { useEffect, useState } from 'react'
import Loader from '../../loader/Loader';
import { Axios } from '../../../core/http-service';

export default function DownloadSecStepFile({ reqStatus , reqId }) {

    const [rendering, setRendering] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const [fileStorage, setFileStorage ] = useState({
        file : null,
        link1 : null,
        link2 : null,
        link3 : null,
    })

    useEffect(() => {
        setRendering(true)
        // get step 3
        Axios.get(`/admin/get_committee_for_admin/${reqId}`).then(async (res) => {
            console.log(res);
            setFileStorage({
                file : res.data.file_name ,
                link1 : res.data.path1,
                link2 : res.data.path2,
                link3 : res.data.path3,
            })
            setRendering(false)
        }) .catch(async (err) => {
            console.log(err.response.data);
            setRendering(false)
            setFileStorage({
                file : null,
                link1 : null,
                link2 : null,
                link3 : null,
            })
        })
    } , [ ])
    
      if (rendering) {
        return (
            <div className=" m-3 bg-white rounded-xl p-5">
                <div className=" pb-4">
                    <p className=" font-bold"> دانلود فایل گزارش ارزیابی </p>
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
      if (reqStatus.commite === true) {
        return (
            <div className=" m-3 bg-white rounded-xl p-5">
                <div className=" pb-4">
                    <p className=" font-bold"> دانلود فایل گزارش کمیته </p>
                </div>
                <hr className="border-dashed border-gray-300" />

                <hr className="border-dashed border-gray-300" />
                <div className="rounded-lg p-2 border text-green-700 text-xs mt-4">
                    {
                        fileStorage.link1 !== null ?
                        <a href={`${import.meta.env.VITE_IMAGES_URL}/${fileStorage.link1}`} target='_blank'>
                            <p className="text-blue-500">
                                برای دانلود فایل اول کلیک کنید
                            </p>
                        </a>
                        :
                        <p className="text-yellow-500">
                            در حال دریافت فایل...
                        </p>
                    }
                </div>
                <div className="rounded-lg p-2 border text-green-700 text-xs mt-4">
                    {
                        fileStorage.link2 !== null ?
                        <a href={`${import.meta.env.VITE_IMAGES_URL}/${fileStorage.link2}`} target='_blank'>
                            <p className="text-blue-500">
                                برای دانلود فایل دوم کلیک کنید
                            </p>
                        </a>
                        :
                        <p className="text-yellow-500">
                            در حال دریافت فایل...
                        </p>
                    }
                </div>
                <div className="rounded-lg p-2 border text-green-700 text-xs mt-4">
                    {
                        fileStorage.link3 !== null ?
                        <a href={`${import.meta.env.VITE_IMAGES_URL}/${fileStorage.link3}`} target='_blank'>
                            <p className="text-blue-500">
                                برای دانلود فایل سوم کلیک کنید
                            </p>
                        </a>
                        :
                        <p className="text-yellow-500">
                            در حال دریافت فایل...
                        </p>
                    }
                </div>
                    <p className="text-green-500 p-3">
                        کامل شده
                    </p>
            </div>
        )
      } else if (reqStatus.report === false) {
        return (
            <div className=" m-3 bg-white rounded-xl p-5">
                <div className=" pb-4">
                    <p className=" font-bold"> دانلود فایل گزارش ارزیابی </p>
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
      } else if (reqStatus.report === true && reqStatus.commite === false && fileStorage.file === null) {
        return (
            <div className="m-3 bg-white rounded-xl p-5">
                {isLoading && <Loader />}
                <div className=" pb-4">
                    <p className=" font-bold"> دانلود فایل گزارش ارزیابی </p>
                </div>
                <hr className="border-dashed border-gray-300" />
        
                <hr className="border-dashed border-gray-300" />
                <div className="rounded-lg p-2 border text-green-700 text-xs mt-4">
                    <p className="text-yellow-500">
                        هنوز از سمت کارشناس کامل نشده
                    </p>
                </div>
                <div className="rounded-lg p-2 border text-green-700 text-xs mt-4">
                    <p className="text-yellow-500">
                        هنوز از سمت کارشناس کامل نشده
                    </p>
                </div>
                <div className="rounded-lg p-2 border text-green-700 text-xs mt-4">
                    <p className="text-yellow-500">
                        هنوز از سمت کارشناس کامل نشده
                    </p>
                </div>
                
            </div>
        )
      } else if (reqStatus.report === true && reqStatus.commite === false && fileStorage.file !== null) {
        return (
            <div className="m-3 bg-white rounded-xl p-5">
                <div className=" pb-4">
                  <p className=" font-bold"> دانلود فایل گزارش ارزیابی </p>
                </div>
                <hr className="border-dashed border-gray-300" />

                <hr className="border-dashed border-gray-300" />
                <div className="rounded-lg p-2 border text-green-700 text-xs mt-4">
                    {
                        fileStorage.link1 !== null ?
                        <a href={`${import.meta.env.VITE_IMAGES_URL}/${fileStorage.link1}`} target='_blank'>
                            <p className="text-blue-500">
                                برای دانلود فایل اول کلیک کنید
                            </p>
                        </a>
                        :
                        <p className="text-yellow-500">
                            در حال دریافت فایل...
                        </p>
                    }
                </div>
                <div className="rounded-lg p-2 border text-green-700 text-xs mt-4">
                    {
                        fileStorage.link2 !== null ?
                        <a href={`${import.meta.env.VITE_IMAGES_URL}/${fileStorage.link2}`} target='_blank'>
                            <p className="text-blue-500">
                                برای دانلود فایل دوم کلیک کنید
                            </p>
                        </a>
                        :
                        <p className="text-yellow-500">
                            در حال دریافت فایل...
                        </p>
                    }
                </div>
                <div className="rounded-lg p-2 border text-green-700 text-xs mt-4">
                    {
                        fileStorage.link3 !== null ?
                        <a href={`${import.meta.env.VITE_IMAGES_URL}/${fileStorage.link3}`} target='_blank'>
                            <p className="text-blue-500">
                                برای دانلود فایل سوم کلیک کنید
                            </p>
                        </a>
                        :
                        <p className="text-yellow-500">
                            در حال دریافت فایل...
                        </p>
                    }
                </div>
            </div>
        )
      }

}
