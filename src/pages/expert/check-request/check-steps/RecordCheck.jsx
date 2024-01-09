import React, { useEffect, useState } from "react";
import useRequests from "../../../../hooks/useRequests";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../components/loader/Loader";
import { toast } from "react-toastify";
import DefectreportModal from "./modal/DefectreportModal";

function RecordCheck() {
  const { requestId } = useParams();
  const navigate = useNavigate();

  const [showDefectreport, setShowDefectreport] = useState(false);

  const {
    response: allStatusResponse,
    error: allStatusError,
    loading: allStatusLoading,
    getRequest: getallStatus,
  } = useRequests({
    url: `/v1/get_all_status/${requestId}`,
  });

  const {
    response: checkDocumentsRes,
    error: checkDocumentsErr,
    loading: checkDocumentsLoading,
    postRequest: postCheckDocuments,
  } = useRequests({ url: `/admin/check_document` });

  const onSubmit = () => {
    const payload = {
      request_id: requestId,
      is_accepted: true,
      is_failed: false,
      // if is_accepted is false or is_failed is true, it should send the message
      // message: "documents are incomplete",
    };
    postCheckDocuments(payload);
  };

  useEffect(() => {
    getallStatus();
  }, []);

  useEffect(() => {
    if (checkDocumentsRes) {
      toast.success(`تغییرات ثبت شد`);
      navigate(
        allStatusResponse?.type
          ? `/expert/check-request/wage/${requestId}`
          : `/expert/check-request/assessment/${requestId}`
      );
    }
  }, [checkDocumentsRes]);

  useEffect(() => {
    if (checkDocumentsErr) {
      toast("خطادر برقراری ارتباط");
    }
  }, [checkDocumentsErr]);

  if (allStatusLoading) return <Loader />;

  return (
    <>
      <DefectreportModal
        show={showDefectreport}
        setShow={setShowDefectreport}
      />
      <div className=" relative w-full flex justify-center">
        {checkDocumentsLoading && <Loader />}
        <div className=" w-2/3 p-4 bg-white rounded-xl">
          <h1 className=" p-2 font-extrabold">مرحله ۱ - بررسی مدارک</h1>
          <p className=" p-2 text-g-6 text-sm">
            آیا مایل به تایید این مرحله هستید؟
          </p>
          <div className=" w-full flex gap-2">
            <button
              onClick={() => setShowDefectreport(true)}
              className=" w-full p-2 font-semibold text-white bg-[#B9393A] hover:bg-[#a53232] rounded-lg transition"
            >
              گزارش ناقصی
            </button>
            <button
              onClick={onSubmit}
              className={
                checkDocumentsLoading
                  ? " w-full p-2 font-semibold text-white bg-g-5 rounded-lg transition"
                  : " w-full p-2 font-semibold text-white bg-secondary hover:bg-s-6 rounded-lg transition"
              }
            >
              {checkDocumentsLoading ? "درحال ارسال..." : "تایید مرحله"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecordCheck;
