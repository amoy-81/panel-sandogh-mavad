import React from 'react'
import DownloadBoxR from './DownloadBoxR';

export default function WboxR({ path1 , path2 , path3 , path4 , path5 , path6 , fn1 , fn2 , fn3 , fn4 , fn5 , fn6 }) {
  return (
    <div className=" bg-p-2 rounded-xl p-5 mt-3">
        <div className=" pb-4">
            <p className=" font-bold"> مدارک اصلی </p>
        </div>
        <hr className="border-dashed border-gray-300" />
        {path1 && fn1 && <DownloadBoxR path={path1} fn={fn1} title={"اجازه نامه تکمیل شده استعلام رفتار اعتباری اشخاص حقوقی به نام شرکت"} />}
        {path2 && fn2 && <DownloadBoxR path={path2} fn={fn2} title={"اجازه نامه تکمیل شده استعلام رفتار اعتباری اشخاص حقوقی به نام شرکت"} />}
        {path3 && fn3 && <DownloadBoxR path={path3} fn={fn3} title={"فرم مشخصات مشتریان"} />}
        {path4 && fn4 && <DownloadBoxR path={path4} fn={fn4} title={"تکمیل فرم 1 - حقوقی"} />}
        {path5 && fn5 && <DownloadBoxR path={path5} fn={fn5} title={"شناسنامه ضمانت نامه"} />}
        {path6 && fn6 && <DownloadBoxR path={path6} fn={fn6} title={"عکس فیش واریزی"} />}
    </div>
  )
}
