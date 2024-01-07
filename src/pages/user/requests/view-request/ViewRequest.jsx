import React from "react";
import { useParams } from "react-router-dom";
import StatusBar from "./components/StatusBar";
import Loader from "../../../../components/loader/Loader";
import useRequests from "../../../../hooks/useRequests";
import ExpertDetails from "./components/ExpertDetails";
import DownloadBox from "./components/DownloadBox";
import NullFile from "./components/NullFile";

function ViewRequest() {
  const { requestId } = useParams();
  const {
    response: viewRequestResponse,
    error: viewRequestError,
    loading: viewRequestLoading,
    getRequest: getviewRequest,
  } = useRequests({
    url: `/v1/get_all_status/${requestId}`,
  });

  return (
    <div className="px-5">
      {/* loading */}
      {viewRequestLoading && <Loader />}
      <div className=" py-6">
        <p className="text-xl font-extrabold">بررسی درخواست </p>
      </div>
      <StatusBar requestId={requestId} />
      <div className="flex w-full mt-5">
        <div className="w-2/3 p-2 ">
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
        {/* <ExpertDetails expert={viewRequestResponse.expert_assignment.expert}/> */}
        <ExpertDetails />
      </div>
    </div>
  );
}

export default ViewRequest;
