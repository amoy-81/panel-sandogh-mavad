import React, { useEffect, useState } from "react";
import FileInput from "../../../user/requests/warranty/components/FileInput";
import { useNavigate, useParams } from "react-router-dom";
import useRequests from "../../../../hooks/useRequests";
import Loader from "../../../../components/loader/Loader";
import { toast } from "react-toastify";

function RecordWage() {
  const { requestId } = useParams();
  const navigate = useNavigate();

  const [reqPayloadData, setReqPayloadData] = useState({
    request_id: requestId,
    message: "",
    file: null,
  });

  const {
    response: reportRes,
    error: reportErr,
    loading: reportLoading,
    percentProgress: subPercent,
    postRequest: postReport,
  } = useRequests({
    url: `/admin/wage`,
    header: { "Content-Type": "multipart/form-data" },
  });

  useEffect(() => {
    if (reportRes) {
      toast("ثبت شد");
      navigate(`/expert/check-request/evidence/${requestId}`);
    }
  }, [reportRes]);

  useEffect(() => {
    if (reportErr) {
      toast("خطادر برقراری ارتباط");
    }
  }, [reportErr]);

  const onSubmit = () => {
    console.log("Hii");
    if (reqPayloadData.file || reqPayloadData.message.length > 0) {
      postReport(reqPayloadData);
    }
  };

  return (
    <div className=" relative w-full flex justify-center">
      {reportLoading && <Loader />}
      <div className=" w-2/3 p-4 bg-white rounded-xl">
        <h1 className=" p-2 font-extrabold">
          مرحله ۲ - گزارش کارمز وجه و وثیقه
        </h1>
        {/* upload mode */}

        <>
          <p className=" p-2 text-g-6 text-sm">
            برای تایید این مرحله باید فایلی را ضمیمه کنید.
            <span className=" font-light text-g-5">
              (فرمت فایل ها pdf , doc , docx)
            </span>
          </p>
          <textarea
            className=" border-2 w-full outline-none p-2 focus:border-secondary rounded-lg"
            name="message"
            id=""
            cols="30"
            rows="5"
            value={reqPayloadData.message}
            onChange={(e) =>
              setReqPayloadData((prev) => ({
                ...prev,
                message: e.target.value,
              }))
            }
          ></textarea>
          <FileInput
            currentValue={reqPayloadData.file}
            setCurrentValue={setReqPayloadData}
            prossesPercent={subPercent}
            loading={reportLoading}
            name={"file"}
            accept={".pdf,.doc,.docx,"}
            title={"فایل گزارش ارزیابی"}
          />
          <button
            onClick={onSubmit}
            disabled={
              (!reqPayloadData.file && reqPayloadData.message.length === 0) ||
              reportLoading
                ? true
                : false
            }
            className={
              reportLoading
                ? " w-full p-2 mt-2  font-semibold text-white bg-g-5 rounded-lg transition"
                : reqPayloadData.file || reqPayloadData.message.length > 0
                ? " w-full p-2 mt-2 outline-none  font-semibold text-white bg-secondary hover:bg-s-6 rounded-lg transition"
                : " w-full p-2  mt-2 font-semibold text-white bg-g-5 rounded-lg transition"
            }
          >
            {reportLoading ? "درحال ارسال..." : "تایید مرحله"}
          </button>
        </>
      </div>
    </div>
  );
}

export default RecordWage;
