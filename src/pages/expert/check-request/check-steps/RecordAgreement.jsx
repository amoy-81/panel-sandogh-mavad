import React, { useEffect, useState } from "react";
import FileInput from "../../../user/requests/warranty/components/FileInput";
import { useNavigate, useParams } from "react-router-dom";
import useRequests from "../../../../hooks/useRequests";
import Loader from "../../../../components/loader/Loader";
import { toast } from "react-toastify";

function RecordAgreement() {
  const { requestId } = useParams();
  const navigate = useNavigate();

  const [reqPayloadData, setReqPayloadData] = useState({
    request_id: requestId,
    text: "",
  });

  const {
    response: viewRequestResponse,
    error: viewRequestError,
    loading: viewRequestLoading,
    getRequest: getviewRequest,
  } = useRequests({
    url: `/v1/get_agreement/${requestId}`,
  });

  const {
    response: reportRes,
    error: reportErr,
    loading: reportLoading,
    percentProgress: subPercent,
    postRequest: postReport,
  } = useRequests({
    url: `/admin/agreement`,
  });

  useEffect(() => {
    getviewRequest()
  } , [])

  useEffect(() => {
    if (reportRes) {
      toast("ثبت شد");
      navigate(`/expert/current-requests`);
    }
  }, [reportRes]);

  useEffect(() => {
    if (reportErr) {
      toast("خطادر برقراری ارتباط");
    }
  }, [reportErr]);

  const onSubmit = () => {
    if (reqPayloadData.text.length > 0) {
      postReport(reqPayloadData);
    }
  };

  if (viewRequestLoading) return <Loader />

  return (
    <div className=" relative w-full flex justify-center">
      {reportLoading && <Loader />}
      <div className=" w-2/3 p-4 bg-white rounded-xl">
        <h1 className=" p-2 font-extrabold">مرحله ۵ - گزارش امضای قرارداد</h1>
        {/* upload mode */}

        {!viewRequestResponse && (
          <>
            <p className=" p-2 text-g-6 text-sm">
              در صورت کامل بودن مدارک ، زمان امضای قرارداد را برای کاربر اعلام
              کنید.
              <span className=" font-light text-g-5"></span>
            </p>
            <textarea
              className=" border-2 w-full outline-none p-2 focus:border-secondary rounded-lg"
              name="text"
              id=""
              cols="30"
              rows="5"
              value={reqPayloadData.text}
              onChange={(e) =>
                setReqPayloadData((prev) => ({
                  ...prev,
                  text: e.target.value,
                }))
              }
            ></textarea>
            <button
              onClick={onSubmit}
              disabled={
                reqPayloadData.text.length === 0 || reportLoading ? true : false
              }
              className={
                reportLoading
                  ? " w-full p-2 mt-2  font-semibold text-white bg-g-5 rounded-lg transition"
                  : reqPayloadData.text.length > 0
                  ? " w-full p-2 mt-2 outline-none  font-semibold text-white bg-secondary hover:bg-s-6 rounded-lg transition"
                  : " w-full p-2  mt-2 font-semibold text-white bg-g-5 rounded-lg transition"
              }
            >
              {reportLoading ? "درحال ارسال..." : "تایید مرحله"}
            </button>
          </>
        )}
        {console.log(viewRequestResponse === "agreement")}
        {viewRequestResponse && (
          <>
            <p className=" p-2 text-g-6 text-sm">
              مراحل کارشناسی درخواست
              {' '}
              <span className=" font-light text-secondary ">کامل شده است.</span>
              
            </p>
            <h2 className=" p-2 font-extrabold">متن گزارش :</h2>
            <p className=" p-2 text-g-6 text-sm">{viewRequestResponse.text}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default RecordAgreement;
