import React, { useEffect, useState } from "react";
import FileInput from "../../../user/requests/warranty/components/FileInput";
import { useParams } from "react-router-dom";
import useRequests from "../../../../hooks/useRequests";
import Loader from "../../../../components/loader/Loader";
import { toast } from "react-toastify";
import { AiOutlineDownload } from "react-icons/ai";
import DownloadBox from "../../../user/requests/view-request/components/DownloadBox";

function RecordCredit() {
  const { requestId } = useParams();

  const [reqPayloadData, setReqPayloadData] = useState({
    request_id: requestId,
    file: null,
  });

  const {
    response: reportRes,
    error: reportErr,
    loading: reportLoading,
    percentProgress: subPercent,
    postRequest: postReport,
  } = useRequests({
    url: `/admin/credit`,
    header: { "Content-Type": "multipart/form-data" },
  });

  const {
    response: reportFileRes,
    error: reportFileErr,
    loading: reportFileLoading,
    getRequest: getReportFile,
  } = useRequests({ url: `/v1/get_credit/${requestId}` });

  useEffect(() => {
    getReportFile();
  }, [reportRes]);

  useEffect(() => {
    if (reportRes) {
      toast("ثبت شد");
    }
  }, [reportRes]);

  useEffect(() => {
    if (reportErr) {
      toast("خطادر برقراری ارتباط");
    }
  }, [reportErr]);

  const onSubmit = () => {
    if (reqPayloadData.file) {
      postReport(reqPayloadData);
    }
  };

  return (
    <div className=" relative w-full flex justify-center">
      {reportFileLoading && <Loader />}
      <div className=" w-2/3 p-4 bg-white rounded-xl">
        <h1 className=" p-2 font-extrabold">
          مرحله ۵ - گزارش اعلام حد اعتباری
        </h1>
        {/* upload mode */}
        {!reportFileRes && (
          <>
            <p className=" p-2 text-g-6 text-sm">
              برای تایید این مرحله باید فایلی را ضمیمه کنید.
              <span className=" font-light text-g-5">
                (فرمت فایل ها pdf , doc , docx)
              </span>
            </p>
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
              disabled={!reqPayloadData.file || reportLoading}
              className={
                reportLoading
                  ? " w-full p-2 mt-2  font-semibold text-white bg-g-5 rounded-lg transition"
                  : reqPayloadData.file
                  ? " w-full p-2 mt-2 outline-none  font-semibold text-white bg-secondary hover:bg-s-6 rounded-lg transition"
                  : " w-full p-2  mt-2 font-semibold text-white bg-g-5 rounded-lg transition"
              }
            >
              {reportLoading ? "درحال ارسال..." : "تایید مرحله"}
            </button>
          </>
        )}

        {/* Expectation mode */}
        {reportFileRes && (
          <>
            <p className=" p-2 text-g-6 text-sm">
              مراحل تایید درخواست به پایان رسید و <span className=" text-secondary">فایل گزارش حد اعتباری</span> در دسترس
              می باشد
            </p>

            {/* download */}
            <div className=" w-full  flex justify-around max-lg:flex-col p-2">
              <p className=" font-semibold">
                نام فایل :{" "}
                <span className=" text-g-6">
                  {reportFileRes?.file_name.slice(0, 25)}
                </span>
              </p>
            </div>
            {reportFileRes?.path && (
              <DownloadBox
                downloadLink={`${import.meta.env.VITE_IMAGES_URL}/${
                  reportFileRes?.path
                }`}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default RecordCredit;
