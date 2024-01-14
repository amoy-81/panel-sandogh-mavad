import React from 'react'
import DownloadBoxRUp from '../../../../../components/copy/viewDoc/DownloadBoxRUp'

export default function S6boxR({ document , setDocment , path1 , path2 , path3 , fn1 , fn2 , fn3 }) {
  return (
    <div className=" bg-c-4 rounded-xl p-5 mt-3">
        <div className=" pb-4">
            <p className=" font-bold"> مدارک اصلی </p>
        </div>
        <hr className="border-dashed border-gray-300" />
        {path1 && fn1 && <DownloadBoxRUp document={document} setDocment={setDocment} file_name={"file1"} path={path1} fn={fn1} title={"تصویر مجوز ها و گواهی نامه های اخذ شده توسط شرکت"} />}
        {path2 && fn2 && <DownloadBoxRUp document={document} setDocment={setDocment} file_name={"file2"} path={path2} fn={fn2} title={"تصویر مجوز ها و گواهی نامه های اخذ شده توسط شرکت"} />}
        {path3 && fn3 && <DownloadBoxRUp document={document} setDocment={setDocment} file_name={"file3"} path={path3} fn={fn3} title={"تصویر مجوز ها و گواهی نامه های اخذ شده توسط شرکت"} />}
    </div>
  )
}
