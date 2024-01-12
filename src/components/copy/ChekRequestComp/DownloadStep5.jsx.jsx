import React , { useEffect, useState } from 'react'
import Loader from '../../loader/Loader';
import { Axios } from '../../../core/http-service';

export default function DownloadStep5({ reqStatus , reqId }) {

    const [rendering, setRendering] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const [fileStorage, setFileStorage ] = useState({
        file : null,
        link : null
    })

    useEffect(() => {
        setRendering(true)
        // get step 3
        Axios.get(`/v1/get_credit/${reqId}`).then(async (res) => {
            console.log(res);
            setFileStorage({
                file : res.data.file_name ,
                link : res.data.path
            })
            setRendering(false)
        }) .catch(async (err) => {
            console.log(err.response.data);
            setRendering(false)
            setFileStorage({
                file : null,
                link : null
            })
        })
    } , [ ])
    
      if (rendering) {
        return (
            <div className=" m-3 bg-white rounded-xl p-5">
                <div className=" pb-4">
                    <p className=" font-bold"> دانلود فایل گزارش نهایی ارزیابی </p>
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
       if (reqStatus?.credit === false) {
        return (
            <div className=" m-3 bg-white rounded-xl p-5">
                <div className=" pb-4">
                    <p className=" font-bold"> دانلود فایل گزارش نهایی ارزیابی </p>
                </div>
                <hr className="border-dashed border-gray-300" />

                <hr className="border-dashed border-gray-300" />
                <div className="rounded-lg p-2 border text-red-700 text-xs mt-4">
                    <p className="">
                        درخواست هنوز به این مرحله نرسیده
                    </p>
                </div>
            </div>
        )
      } else if (reqStatus?.commite === true && fileStorage.file === null) {
        return (
            <div className="m-3 bg-white rounded-xl p-5">
                {isLoading && <Loader />}
                <div className=" pb-4">
                    <p className=" font-bold"> دانلود فایل گزارش نهایی ارزیابی </p>
                </div>
                <hr className="border-dashed border-gray-300" />
        
                <hr className="border-dashed border-gray-300" />
                <div className="rounded-lg p-2 border text-green-700 text-xs mt-4">
                    <p className="text-yellow-500">
                        هنوز از سمت کارشناس کامل نشده
                    </p>
                </div>
                
            </div>
        )
      } else if (reqStatus?.credit === true && reqStatus?.commite === true && fileStorage.file !== null) {
        return (
            <div className="m-3 bg-white rounded-xl p-5">
                <div className=" pb-4">
                  <p className=" font-bold"> دانلود فایل گزارش نهایی ارزیابی </p>
                </div>
                <hr className="border-dashed border-gray-300" />

                <hr className="border-dashed border-gray-300" />
                <div className="rounded-lg p-2 border text-green-700 text-xs mt-4">
                    {
                        fileStorage.link !== null ?
                        <a href={`${import.meta.env.VITE_IMAGES_URL}/${fileStorage.link}`} target='_blank'>
                            <p className="text-blue-500">
                                برای دانلود فایل کلیک کنید
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
