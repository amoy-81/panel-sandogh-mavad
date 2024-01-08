import React, { useEffect } from "react";
import useRequests from "../../../../hooks/useRequests";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../components/loader/Loader";
import { toast } from "react-toastify";

function RecordAssessment() {
  const { requestId } = useParams();
  const navigate = useNavigate();

  const {
    response: checkDocumentsRes,
    error: checkDocumentsErr,
    loading: checkDocumentsLoading,
    postRequest: postCheckDocuments,
  } = useRequests({ url: `/admin/start_assessment` });

  const onSubmit = () => {
    const payload = {
      request_id: requestId,
      is_accepted: true,
    };
    postCheckDocuments(payload);
  };

  useEffect(() => {
    if (checkDocumentsRes) {
      toast.success(`تغییرات ثبت شد`);
      navigate(`/expert/check-request/report/${requestId}`);
    }
  }, [checkDocumentsRes]);

  useEffect(() => {
    if (checkDocumentsErr) {
      toast("خطادر برقراری ارتباط");
    }
  }, [checkDocumentsErr]);

  return (
    <div className=" relative w-full flex justify-center">
      {checkDocumentsLoading && <Loader />}
      <div className=" w-2/3 p-4 bg-white rounded-xl">
        <h1 className=" p-2 font-extrabold">مرحله ۲ - شروع ارزیابی</h1>
        <p className=" p-2 text-g-6 text-sm">
          آیا مایل به تایید این مرحله هستید؟
        </p>
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
  );
}

export default RecordAssessment;
