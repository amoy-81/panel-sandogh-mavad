import React, { useEffect } from "react";
import Modal from "../../../../../components/modal/Modal";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useRequests from "../../../../../hooks/useRequests";
import { toast } from "react-toastify";

function DefectreportStep2Modal({ show, setShow }) {
  const { requestId } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const {
    response: defctReportRes,
    error: defctReportErr,
    loading: defctReportLoading,
    postRequest: postDefctReport,
  } = useRequests({ url: `/admin/check_document` });

  useEffect(() => {
    if (defctReportRes) {
      toast.success(`تغییرات ثبت شد`);
      setShow(false);
    }
  }, [defctReportRes]);

  console.log(errors)
  useEffect(() => {
    if (defctReportErr) {
      toast.error("خطادر برقراری ارتباط");
    }
  }, [defctReportErr]);

  const onSubmit = (data) => {
    const payload = {
      request_id: requestId,
      is_accepted: false,
      is_failed: true,
      ...data,
    };
    postDefctReport(payload);
  };
  return (
    <Modal
      title={"گزارش ناقصی در بررسی مدارک"}
      body={"متن گزارش خود را وارد نمایید"}
      isOpen={show}
      close={setShow}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className={
            errors.message
              ? " border-2 border-[#B9393A] w-full  outline-none p-2 focus:border-[#B9393A] rounded-lg"
              : " border-2 w-full outline-none p-2 focus:border-secondary rounded-lg"
          }
          name="message"
          id=""
          cols="30"
          rows="10"
          {...register("message", {
             required: "این فیلد الزامیست" ,
          })}
        ></textarea>
        <div className="flex max-lg:flex-col gap-2 p-2">
          <button
            onClick={() => setShow(false)}
            className=" w-full p-2 font-semibold text-white bg-[#B9393A] hover:bg-[#a53232] rounded-lg transition"
          >
            انصراف
          </button>
          <button
            disabled={defctReportLoading}
            type="submit"
            className={
              defctReportLoading
                ? " w-full p-2 font-semibold text-white bg-g-5 rounded-lg transition"
                : " w-full p-2 font-semibold text-white bg-secondary hover:bg-s-6 rounded-lg transition"
            }
          >
            {defctReportLoading ? 'در حال ارسال...' : 'ثبت گزارش'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default DefectreportStep2Modal;
