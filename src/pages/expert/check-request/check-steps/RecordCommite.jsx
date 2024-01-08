import React, { useEffect, useState } from "react";
import FileInput from "../../../user/requests/warranty/components/FileInput";
import { useParams } from "react-router-dom";
import useRequests from "../../../../hooks/useRequests";
import Loader from "../../../../components/loader/Loader";
import { toast } from "react-toastify";
import { AiOutlineDownload } from "react-icons/ai";

function RecordCommite() {
  const { requestId } = useParams();

  const [reqPayloadData, setReqPayloadData] = useState({
    request_id: requestId,
    file1: null,
    file2: null,
    file3: null,
  });

  const {
    response: reportRes,
    error: reportErr,
    loading: reportLoading,
    percentProgress: subPercent,
    postRequest: postReport,
  } = useRequests({
    url: `/admin/committee`,
    header: { "Content-Type": "multipart/form-data" },
  });

  const {
    response: reportFileRes,
    error: reportFileErr,
    loading: reportFileLoading,
    getRequest: getReportFile,
  } = useRequests({ url: `/admin/get_committee_for_admin/${requestId}` });

  // update
  const {
    response: updateReportRes,
    error: updateReportErr,
    loading: updateReportLoading,
    percentProgress: updateSubPercent,
    postRequest: postUpdateReport,
  } = useRequests({
    url: `/admin/committee/${requestId}`,
    header: {
      "Content-Type": "multipart/form-data",
      "X-HTTP-Method-Override": "PUT",
    },
  });

  useEffect(() => {
    getReportFile();
  }, [reportRes, updateReportRes]);

  useEffect(() => {
    if (reportRes || updateReportRes) {
      toast("ثبت شد");
    }
  }, [reportRes, updateReportRes]);

  useEffect(() => {
    if (reportErr || updateReportErr) {
      toast("خطادر برقراری ارتباط");
    }
  }, [reportErr, updateReportErr]);

  const onSubmit = () => {
    if (reqPayloadData.file1 && reqPayloadData.file2 && reqPayloadData.file3) {
      postReport(reqPayloadData);
    }
  };

  const onUpdate = () => {
    if (reqPayloadData.file1 && reqPayloadData.file2 && reqPayloadData.file3) {
      postUpdateReport(reqPayloadData);
    }
  };

  return (
    <div className=" relative w-full flex justify-center">
      {reportFileLoading && <Loader />}
      <div className=" w-2/3 p-4 bg-white rounded-xl">
        <h1 className=" p-2 font-extrabold">مرحله ۴ - کمیته</h1>
        {/* upload mode */}
        {!reportFileRes && (
          <>
            <p className=" p-2 text-g-6 text-sm">
              برای تایید این مرحله باید فایل ها را ضمیمه کنید.
              <span className=" font-light text-g-5">
                (فرمت فایل ها pdf , doc , docx)
              </span>
            </p>
            <div className=" w-full flex flex-col gap-2">
              <FileInput
                currentValue={reqPayloadData.file1}
                setCurrentValue={setReqPayloadData}
                prossesPercent={subPercent}
                loading={reportLoading}
                name={"file1"}
                accept={".pdf,.doc,.docx,"}
                title={"گزارش کمیته"}
              />
              <FileInput
                currentValue={reqPayloadData.file2}
                setCurrentValue={setReqPayloadData}
                prossesPercent={subPercent}
                loading={reportLoading}
                name={"file2"}
                accept={".pdf,.doc,.docx,"}
                title={"گزارش کمیته"}
              />
              <FileInput
                currentValue={reqPayloadData.file3}
                setCurrentValue={setReqPayloadData}
                prossesPercent={subPercent}
                loading={reportLoading}
                name={"file3"}
                accept={".pdf,.doc,.docx,"}
                title={"گزارش کمیته"}
              />
            </div>
            <button
              onClick={onSubmit}
              disabled={
                (!reqPayloadData.file1 &&
                  !reqPayloadData.file2 &&
                  !reqPayloadData.file3) ||
                reportLoading
              }
              className={
                reportLoading
                  ? " w-full p-2 mt-2  font-semibold text-white bg-g-5 rounded-lg transition"
                  : reqPayloadData.file1 &&
                    reqPayloadData.file2 &&
                    reqPayloadData.file3
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
              فایل آپلود شده و{" "}
              <span className=" text-primary">در انتظار تایید مدیر</span> می
              باشد
            </p>

            {/* download */}
            <div className=" w-full  flex justify-around max-lg:flex-col p-2">
              <p className=" font-semibold">
                نام فایل ۱ :{" "}
                <span className=" text-g-6">
                  {reportFileRes?.file_name1?.slice(0, 25)}
                </span>
              </p>
              {reportFileRes?.path1 && (
                <a
                  href={`${import.meta.env.VITE_IMAGES_URL}/${
                    reportFileRes?.path1
                  }`}
                  className="flex flex-row-reverse items-center gap-2 text-secondary"
                  target="_blank"
                >
                  <AiOutlineDownload className=" w-5 h-5 " />
                  <p className=" text-sm font-semibold">دانلود فایل</p>
                </a>
              )}
            </div>
            <div className=" w-full  flex justify-around max-lg:flex-col p-2">
              <p className=" font-semibold">
                نام فایل ۲ :{" "}
                <span className=" text-g-6">
                  {reportFileRes?.file_name2?.slice(0, 25)}
                </span>
              </p>
              {reportFileRes?.path2 && (
                <a
                  href={`${import.meta.env.VITE_IMAGES_URL}/${
                    reportFileRes?.path2
                  }`}
                  className="flex flex-row-reverse items-center gap-2 text-secondary"
                  target="_blank"
                >
                  <AiOutlineDownload className=" w-5 h-5 " />
                  <p className=" text-sm font-semibold">دانلود فایل</p>
                </a>
              )}
            </div>
            <div className=" w-full  flex justify-around max-lg:flex-col p-2">
              <p className=" font-semibold">
                نام فایل ۳ :{" "}
                <span className=" text-g-6">
                  {reportFileRes?.file_name3?.slice(0, 25)}
                </span>
              </p>
              {reportFileRes?.path3 && (
                <a
                  href={`${import.meta.env.VITE_IMAGES_URL}/${
                    reportFileRes?.path3
                  }`}
                  className="flex flex-row-reverse items-center gap-2 text-secondary"
                  target="_blank"
                >
                  <AiOutlineDownload className=" w-5 h-5 " />
                  <p className=" text-sm font-semibold">دانلود فایل</p>
                </a>
              )}
            </div>
            <div className=" w-full flex flex-col gap-2">
              <FileInput
                currentValue={reqPayloadData.file1}
                setCurrentValue={setReqPayloadData}
                prossesPercent={updateSubPercent}
                loading={updateReportLoading}
                name={"file1"}
                accept={".pdf,.doc,.docx,"}
                title={"تغییر گزارش کمیته"}
              />
              <FileInput
                currentValue={reqPayloadData.file2}
                setCurrentValue={setReqPayloadData}
                prossesPercent={updateSubPercent}
                loading={updateReportLoading}
                name={"file2"}
                accept={".pdf,.doc,.docx,"}
                title={"تغییر گزارش کمیته"}
              />
              <FileInput
                currentValue={reqPayloadData.file3}
                setCurrentValue={setReqPayloadData}
                prossesPercent={updateSubPercent}
                loading={updateReportLoading}
                name={"file3"}
                accept={".pdf,.doc,.docx,"}
                title={"تغییر گزارش کمیته"}
              />
            </div>

            <button
              onClick={onUpdate}
              disabled={
                (!reqPayloadData.file1 &&
                  !reqPayloadData.file2 &&
                  !reqPayloadData.file3) ||
                updateReportLoading
              }
              className={
                updateReportLoading
                  ? " w-full p-2 mt-2  font-semibold text-white bg-g-5 rounded-lg transition"
                  : reqPayloadData.file1 &&
                    reqPayloadData.file2 &&
                    reqPayloadData.file3
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

export default RecordCommite;
