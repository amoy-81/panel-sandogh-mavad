import React from "react";
import { useParams } from "react-router-dom";
import StatusBar from "./components/StatusBar";
import ExpertDetails from "./components/ExpertDetails";
import NullFile from "./components/NullFile";

function ViewRequest() {
  const { requestId } = useParams();

  return (
    <div className="px-5">
      {/* loading */}

      <div className=" w-full flex justify-center">
        <div className=" w-2/3 p-4 bg-white">
          <h1 className=" p-2 font-extrabold">فایل گزارش نهایی ارزیابی</h1>
          <p className=" p-2 text-g-6">
            این مرحله درصورت آپلود در این قسمت قرار میگیرد
          </p>
          {/* null */}
          <NullFile />
          {/* download box */}
          {/* <DownloadBox downloadLink={'aaa'} /> */}
        </div>
      </div>
    </div>
  );
}

export default ViewRequest;
