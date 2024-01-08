import React, { useEffect, useState } from "react";
import FileInput from "../../../user/requests/warranty/components/FileInput";
import { useParams } from "react-router-dom";
import useRequests from "../../../../hooks/useRequests";
import Loader from "../../../../components/loader/Loader";
import { toast } from "react-toastify";
import { AiOutlineDownload } from "react-icons/ai";

function RecordReport() {
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
    url: `/admin/evaluation_report`,
    header: { "Content-Type": "multipart/form-data" },
  });

  const {
    response: reportFileRes,
    error: reportFileErr,
    loading: reportFileLoading,
    getRequest: getReportFile,
  } = useRequests({ url: `/admin/get_report_for_admin/${requestId}` });

  // update
  const {
    response: updateReportRes,
    error: updateReportErr,
    loading: updateReportLoading,
    percentProgress: updateSubPercent,
    postRequest: postUpdateReport,
  } = useRequests({
    url: `/admin/evaluation_report/${requestId}`,
    header: {
      "Content-Type": "multipart/form-data",
      "X-HTTP-Method-Override": "PUT",
    },
  });

  useEffect(() => {
    getReportFile();
  }, [reportRes , updateReportRes]);

  useEffect(() => {
    if (reportRes || updateReportRes) {
      toast("ثبت شد");
    }
  }, [reportRes , updateReportRes]);

  useEffect(() => {
    if (reportErr || updateReportErr) {
      toast("خطادر برقراری ارتباط");
    }
  }, [reportErr , updateReportErr]);

  const onSubmit = () => {
    if (reqPayloadData.file) {
      postReport(reqPayloadData);
    }
  };

  const onUpdate = () => {
    if (reqPayloadData.file) {
      postUpdateReport(reqPayloadData);
    }
  };

  return (
    <div className=" relative w-full flex justify-center">
      {reportFileLoading && <Loader />}
      <div className=" w-2/3 p-4 bg-white rounded-xl">
        <h1 className=" p-2 font-extrabold">مرحله ۳ - گزارش ارزیابی</h1>
        {/* upload mode */}
        {!reportFileRes && (
          <>
            <p className=" p-2 text-g-6 text-sm">
              برای تایید این مرحله باید فایلی را ضمیمه کنید.
              <span className=" font-light text-g-5">(فرمت فایل ها pdf , doc , docx)</span>
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
              فایل آپلود شده و <span className=" text-primary">در انتظار تایید مدیر</span> می باشد
            </p>

            {/* download */}
            <div className=" w-full  flex justify-around max-lg:flex-col p-2">
              <p className=" font-semibold">
                نام فایل :{" "}
                <span className=" text-g-6">{reportFileRes?.file_name.slice(0, 25)}</span>
              </p>
              {reportFileRes?.path && (
                <a
                  href={`${import.meta.env.VITE_IMAGES_URL}/${
                    reportFileRes?.path
                  }`}
                  className="flex flex-row-reverse items-center gap-2 text-secondary"
                  target="_blank"
                >
                  <AiOutlineDownload className=" w-5 h-5 " />
                  <p className=" text-sm font-semibold">دانلود فایل</p>
                </a>
              )}
            </div>
            <FileInput
              currentValue={reqPayloadData.file}
              setCurrentValue={setReqPayloadData}
              prossesPercent={updateSubPercent}
              loading={updateReportLoading}
              name={"file"}
              accept={".pdf,.doc,.docx,"}
              title={"تغییر فایل گزارش ارزیابی"}
            />
            <button
              onClick={onUpdate}
              disabled={!reqPayloadData.file || updateReportLoading}
              className={
                updateReportLoading
                  ? " w-full p-2 mt-2  font-semibold text-white bg-g-5 rounded-lg transition"
                  : reqPayloadData.file
                  ? " w-full p-2 mt-2 outline-none  font-semibold text-white bg-secondary hover:bg-s-6 rounded-lg transition"
                  : " w-full p-2  mt-2 font-semibold text-white bg-g-5 rounded-lg transition"
              }
            >
              {updateReportLoading ? "درحال ارسال..." : "تغییر فایل"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default RecordReport;
