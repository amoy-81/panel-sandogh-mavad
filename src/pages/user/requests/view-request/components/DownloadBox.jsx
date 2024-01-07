import React from "react";
import { AiOutlineDownload } from "react-icons/ai";

function DownloadBox({downloadLink}) {
  return (
    <a href={downloadLink} className=" w-full p-14">
      <div className=" w-full flex justify-center">
        <AiOutlineDownload className=" w-12 h-12 text-green-500" />
      </div>
      <p className=" text-green-500 font-bold text-center p-2">بارگیری فایل</p>
    </a>
  );
}

export default DownloadBox;
