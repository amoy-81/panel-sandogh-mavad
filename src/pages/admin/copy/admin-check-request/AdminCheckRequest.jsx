import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../../core/http-service.js";
import Loader from "../../../../components/loader/Loader.jsx";

import StepConfirmAdmin from "../../../../components/copy/modal/StepConfirmAdmin.jsx";
import RejectAdmin from "../../../../components/copy/modal/RejectAdmin.jsx";

import DownloadStep3 from "../../../../components/copy/ChekRequestComp/DownloadStep3.jsx";
import DownloadSecStepFile from "../../../../components/copy/ChekRequestComp/DownloadSecStepFile.jsx";
import DownloadStep5 from "../../../../components/copy/ChekRequestComp/DownloadStep5.jsx.jsx";

import queryString from "query-string";
import { toast } from "react-toastify";

export default function AdminCheckRequest() {
  const reqId = useParams();
  const navigate = useNavigate();
  const [reqType, setReqType] = useState("");

  const [ExUrl, setExUrl] = useState(null);

  const [reqStatus, setReqStatus] = useState({
    // check: false,
    // assessment: false,
    // report: true,
    // commite: false,
    // credit: false,
    // fileName : null,
    // file_name1 : null,
    // file_name2 : null,
    // file_name3 : null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [updatePage, setUpdatePage] = useState(0);
  const [showStepConfirm, setShowStepConfirm] = useState(null);
  const [showCheckRep, setShowCheckRep] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    Axios.get(`/v1/get_all_status/${reqId.id}`)
      .then(async (res) => {
        console.log(res);
        setReqStatus({
          check: res.data.check,
          assessment: res.data.assessment,
          report: res.data.report,
          // report: true,
          commite: res.data.commite,
          // commite: true,
          credit: res.data.credit,
        });
        setReqType(res.data.type);
        console.log(updatePage);
        if (res.data.type === "bond") {
          navigate(`/admin/admin-bond-request/${reqId.id}`);
        }
      })
      .catch((err) => {
        // navigate(`/panel/404`);
      });

    Axios.get(`/v1/request/${reqId.id}`).then(async (res) => {
      console.log(res);
      if (res.data.facilities[0] || res.data.warranty[0]) {
        const params = {
          title:
            res.data.type === "facilities"
              ? res.data.facilities[0].title
              : res.data.warranty[0].title,
        };
        const queryString2 = queryString.stringify(params);
        const url =
          res.data.type === "facilities"
            ? `${
                import.meta.env.VITE_IMAGES_URL
              }/api/allFacilityExcel?facility_id=${reqId.id}`
            : `${
                import.meta.env.VITE_IMAGES_URL
              }/api/warrantyExcel?${queryString2}`;
        setExUrl(url);
        console.log(url);
      }
      setIsLoading(false);
    });
  }, [updatePage]);

  if (isLoading) return <Loader />;
  return (
    <div className="px-5">
      {showStepConfirm !== null && (
        <StepConfirmAdmin
          action={showStepConfirm}
          requestId={reqId.id}
          close={setShowStepConfirm}
          setUpdatePage={setUpdatePage}
        />
      )}
      {/* ********************* */}
      {showCheckRep !== null && (
        <RejectAdmin
          reqStatus={reqStatus}
          close={setShowCheckRep}
          requestId={reqId.id}
          setUpdatePage={setUpdatePage}
        />
      )}
      {!isLoading && (
        <div className="flex justify-center items-center  mt-4">
          <div className="flex items-center">
            <p
              onClick={() =>
                setShowStepConfirm({
                  step: 1,
                  prevTest: true,
                  currentStep: reqStatus.check,
                })
              }
              className={
                reqStatus.check
                  ? "bg-blue-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 "
                  : "bg-gray-300 p-0.5 pt-1 px-3 rounded-xl text-gray-400 "
              }
            >
              1
            </p>
            <p
              className={
                reqStatus.check
                  ? "text-blue-800 font-bold mx-2 text-sm"
                  : "text-gray-300 font-bold mx-2 text-sm"
              }
            >
              بررسی مدارک
            </p>
          </div>
          <div className="w-10 px-2">
            <div
              className={
                reqStatus.assessment
                  ? "border-t border-2 border-blue-800 h-full rounded"
                  : "border-t border-2 border-gray-300 h-full rounded"
              }
            ></div>
          </div>
          <div className="flex items-center">
            <p
              onClick={() =>
                setShowStepConfirm({
                  step: 2,
                  prevTest: reqStatus.check,
                  currentStep: reqStatus.assessment,
                })
              }
              className={
                reqStatus.assessment
                  ? "bg-blue-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 "
                  : "bg-gray-300 p-0.5 pt-1 px-3 rounded-xl text-gray-400 "
              }
            >
              2
            </p>
            <p
              className={
                reqStatus.assessment
                  ? "text-blue-800 font-bold mx-2 text-sm"
                  : "text-gray-300 font-bold mx-2 text-sm"
              }
            >
              {" "}
              ارزیابی
            </p>
          </div>
          <div className="w-10 px-2">
            <div
              className={
                reqStatus.report
                  ? "border-t border-2 border-blue-800 h-full rounded"
                  : "border-t border-2 border-gray-300 h-full rounded"
              }
            ></div>
          </div>
          <div className="flex items-center">
            <p
              onClick={() =>
                setShowStepConfirm({
                  step: 3,
                  prevTest: reqStatus.assessment,
                  currentStep: reqStatus.report,
                })
              }
              className={
                reqStatus.report
                  ? "bg-blue-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 "
                  : "bg-gray-300 p-0.5 pt-1 px-3 rounded-xl text-gray-400 "
              }
            >
              3
            </p>
            <p
              className={
                reqStatus.report
                  ? "text-blue-800 font-bold mx-2 text-sm"
                  : "text-gray-300 font-bold mx-2 text-sm"
              }
            >
              گزارش ارزیابی
            </p>
          </div>
          <div className="w-10 px-2">
            <div
              className={
                reqStatus.commite
                  ? "border-t border-2 border-blue-800 h-full rounded"
                  : "border-t border-2 border-gray-300 h-full rounded"
              }
            ></div>
          </div>
          <div className="flex items-center">
            <p
              onClick={() =>
                setShowStepConfirm({
                  step: 4,
                  prevTest: reqStatus.report,
                  currentStep: reqStatus.commite,
                })
              }
              className={
                reqStatus.commite
                  ? "bg-blue-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 "
                  : "bg-gray-300 p-0.5 pt-1 px-3 rounded-xl text-gray-400 "
              }
            >
              4
            </p>
            <p
              className={
                reqStatus.commite
                  ? "text-blue-800 font-bold mx-2 text-sm"
                  : "text-gray-300 font-bold mx-2 text-sm"
              }
            >
              کمیته
            </p>
          </div>
          <div className="w-10 px-2">
            <div
              className={
                reqStatus.credit
                  ? "border-t border-2 border-blue-800 h-full rounded"
                  : "border-t border-2 border-gray-300 h-full rounded"
              }
            ></div>
          </div>
          <div className="flex items-center">
            <p
              onClick={() =>
                setShowStepConfirm({
                  step: 5,
                  prevTest: reqStatus.commite,
                  currentStep: reqStatus.credit,
                })
              }
              className={
                reqStatus.credit
                  ? "bg-blue-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 "
                  : "bg-gray-300 p-0.5 pt-1 px-3 rounded-xl text-gray-400 "
              }
            >
              5
            </p>
            <p
              className={
                reqStatus.credit
                  ? "text-blue-800 font-bold mx-2 text-sm"
                  : "text-gray-300 font-bold mx-2 text-sm"
              }
            >
              اعلام حد اعتباری
            </p>
          </div>
        </div>
      )}

      {/* ------------------------------------------   آپلود فایل مرحله 4 و 3  ------------------------------------------------------ */}
      <div className="flex py-6">
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className="w-1/2 px-2"
        >
          <DownloadStep3 reqStatus={reqStatus} reqId={reqId.id} />
          <DownloadSecStepFile reqStatus={reqStatus} reqId={reqId.id} />
        </div>
        {/* ------------------------------------------   آپلود فایل مرحله 4 و 3  ------------------------------------------------------ */}

        <div className="w-1/2 px-2">
          {/* <SendEvaluationReportFile reqStatus={reqStatus} reqId={reqId.id} setUpdatePage={setUpdatePage} /> */}
          <DownloadStep5 reqStatus={reqStatus} reqId={reqId.id} />

          <div className="pt-4 px-2">
            <div className="w-full flex gap-2 justify-between">
              {reqStatus.assessment === true && reqStatus.credit === false ? (
                <button
                  onClick={() => setShowCheckRep(true)}
                  className="w-full  rounded-lg border border-red-700 mt-2 text-red-700 p-3 font-bold text-xs hover:text-white hover:bg-red-700 transition"
                >
                  گزارش ناقصی در مدارک{" "}
                </button>
              ) : (
                ""
              )}
              {reqType && (
                <Link
                  to={`/admin/view-${reqType}-documents/${reqId.id}`}
                  style={{ textAlign: "center" }}
                  className={
                    reqStatus.assessment === true && reqStatus.credit === false
                      ? "w-full rounded-lg border border-secondary mt-2 text-secondary p-3 font-bold text-xs hover:text-white hover:bg-secondary transition"
                      : "w-full rounded-lg border border-secondary mt-2 text-secondary p-3 font-bold text-xs"
                  }
                >
                  مشاهده مدارک{" "}
                </Link>
              )}
            </div>
            <div className="w-full flex gap-2">
              {ExUrl !== null && (
                <a
                  className="w-full rounded-lg bg-green-700 mt-2 text-center text-white p-3 font-bold text-xs"
                  href={ExUrl}
                >
                  <button onClick={() => toast("بارگیری به زودی انجام میشود")}>
                    خروجی اکسل
                  </button>
                </a>
              )}
              <button
                onClick={() => navigate(-1)}
                className={
                  "w-full  rounded-lg bg-secondary mt-2   text-white p-3 font-bold text-xs"
                }
              >
                بازگشت
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
