import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import StatusBar from "./components/StatusBar";
import ExpertDetails from "./components/ExpertDetails";
import NullFile from "./components/NullFile";
import DownloadStep3 from "../../../../components/copy/ChekRequestComp/DownloadStep3";
import DownloadSecStepFile from "../../../../components/copy/ChekRequestComp/DownloadSecStepFile";
import DownloadStep5 from "../../../../components/copy/ChekRequestComp/DownloadStep5.jsx";
import useRequests from "../../../../hooks/useRequests.jsx";

function ViewRequest() {
  const { requestId } = useParams();
  const {
    response: allStatusResponse,
    error: allStatusError,
    loading: allStatusLoading,
    getRequest: getallStatus,
  } = useRequests({
    url: `/v1/get_all_status/${requestId}`,
  });

  useEffect(() => {
    getallStatus();
  }, []);

  return (
    <div className="px-5">
      <div className=" w-full flex justify-center">
        <div className=" w-2/3 flex flex-col gap-2 p-4">
          <h1 className=" p-2 font-extrabold">فایل گزارش</h1>
          <p className=" p-2 text-g-6 text-sm text-center">
            فایل های مراحله درخواست در این قسمت بارگذاری می شود
          </p>
          {/* null */}
          {/* download box */}
          {/* <DownloadBox downloadLink={'aaa'} /> */}
          <div className=" flex flex-col gap-2">
            <DownloadStep5 reqStatus={allStatusResponse} reqId={requestId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewRequest;
