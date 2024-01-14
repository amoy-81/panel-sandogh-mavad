import React from 'react'
import DownloadBoxRUp from '../../../../../components/copy/viewDoc/DownloadBoxRUp'

export default function WboxRUp({ document , setDocment , path1 , path2 , path3 , path4 , path5 , path6 , fn1 , fn2 , fn3 , fn4 , fn5 , fn6 }) {
  return (
    <div className=" bg-p-2 rounded-xl p-5 mt-3">
        <div className=" pb-4">
            <p className=" font-bold"> مدارک اصلی </p>
        </div>
        <hr className="border-dashed border-gray-300" />
        {path1 && fn1 && <DownloadBoxRUp document={document} setDocment={setDocment} file_name={"file1"} path={path1} fn={fn1} title={"اجازه نامه تکمیل شده استعلام رفتار اعتباری اشخاص حقوقی به نام شرکت"} />}
        {path2 && fn2 && <DownloadBoxRUp document={document} setDocment={setDocment} file_name={"file2"} path={path2} fn={fn2} title={"اجازه نامه تکمیل شده استعلام رفتار اعتباری اشخاص حقوقی به نام شرکت"} />}
        {path3 && fn3 && <DownloadBoxRUp document={document} setDocment={setDocment} file_name={"file3"} path={path3} fn={fn3} title={"فرم مشخصات مشتریان"} />}
        {path4 && fn4 && <DownloadBoxRUp document={document} setDocment={setDocment} file_name={"file4"} path={path4} fn={fn4} title={"تکمیل فرم 1 - حقوقی"} />}
        {path5 && fn5 && <DownloadBoxRUp document={document} setDocment={setDocment} file_name={"file5"} path={path5} fn={fn5} title={"شناسنامه ضمانت نامه"} />}
        {path6 && fn6 && <DownloadBoxRUp document={document} setDocment={setDocment} file_name={"file6"} path={path6} fn={fn6} title={"عکس فیش واریزی"} />}
    </div>
  )
}
