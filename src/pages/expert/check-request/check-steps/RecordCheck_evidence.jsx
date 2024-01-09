import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRequests from "../../../../hooks/useRequests";
import Loader from "../../../../components/loader/Loader";
import { toast } from "react-toastify";
import Modal from "../../../../components/modal/Modal";
import { AiOutlineDownload } from "react-icons/ai";

function RecordCheck_evidence() {
  const { requestId } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [reqPayloadData, setReqPayloadData] = useState({
    request_id: requestId,
    message: "",
  });

  const {
    response: viewRequestResponse,
    error: viewRequestError,
    loading: viewRequestLoading,
    getRequest: getviewRequest,
  } = useRequests({
    url: `/admin/get_evidence/${requestId}`,
  });

  const {
    response: reportRes,
    error: reportErr,
    loading: reportLoading,
    percentProgress: subPercent,
    postRequest: postReport,
  } = useRequests({
    url: `/admin/check_evidence`,
  });

  useEffect(() => {
    getviewRequest();
  }, []);

  useEffect(() => {
    if (reportRes) {
      toast("ثبت شد");
      if (show) {
        navigate(`/expert/current-requests`);
      } else {
        navigate(`/expert/check-request/agreement/${requestId}`);
      }
    }
  }, [reportRes]);

  useEffect(() => {
    if (reportErr) {
      toast("خطادر برقراری ارتباط");
    }
  }, [reportErr]);

  const onSubmit = (is_accepted_payload) => {
    const paylod = is_accepted_payload
      ? { request_id: requestId, is_accepted: true }
      : { is_accepted: false, ...reqPayloadData };
    postReport(paylod);
  };

  return (
    <>
      <div className=" relative w-full flex flex-col items-center gap-4">
        {reportLoading && <Loader />}
        <div className=" w-2/3 p-4 bg-white rounded-xl">
          <h1 className=" p-2 font-extrabold">مرحله ۴ - گزارش تایید مدارک</h1>
          {/* upload mode */}

          <>
            <p className=" p-2 text-g-6 text-sm">
              آیا مایل به تایید این مرحله می باشید ؟
              <span className=" font-light text-g-5">
                در صورت رد درخواست باید دلیل خود را د قالب پیامی ذکر کنید
              </span>
            </p>
            <div>
              <button
                onClick={() => onSubmit(true)}
                className=" w-full p-2 mt-2 outline-none  font-semibold text-white bg-secondary hover:bg-s-6 rounded-lg transition"
              >
                تایید مرحله
              </button>
              <button
                onClick={() => setShow(true)}
                className=" w-full p-2 mt-2 outline-none  font-semibold text-white bg-[#B9393A] hover:bg-[#a53232] rounded-lg transition"
              >
                گزارش ناقصی
              </button>
            </div>
          </>
        </div>

        {viewRequestResponse && (
          <div className=" w-2/3 p-4 bg-white rounded-xl">
            <h1 className=" p-2 font-extrabold">مشاهده مدارک</h1>
            <div className=" w-full  flex justify-around max-lg:flex-col p-2">
              
              {viewRequestResponse?.path1 && (
                <a
                  href={`${import.meta.env.VITE_IMAGES_URL}/${
                    viewRequestResponse?.path1
                  }`}
                  className="flex flex-row-reverse items-center gap-2 text-secondary"
                  target="_blank"
                >
                  <AiOutlineDownload className=" w-5 h-5 " />
                  <p className=" text-sm font-semibold">تصویر فیش واریز کارمزد</p>
                </a>
              )}
            </div>
            <div className=" w-full  flex justify-around max-lg:flex-col p-2">
              
              {viewRequestResponse?.path2 && (
                <a
                  href={`${import.meta.env.VITE_IMAGES_URL}/${
                    viewRequestResponse?.path2
                  }`}
                  className="flex flex-row-reverse items-center gap-2 text-secondary"
                  target="_blank"
                >
                  <AiOutlineDownload className=" w-5 h-5 " />
                  <p className=" text-sm font-semibold">تصویر فیش واریز سپرده</p>
                </a>
              )}
            </div>
            <div className=" w-full  flex justify-around max-lg:flex-col p-2">
              
              {viewRequestResponse?.path3 && (
                <a
                  href={`${import.meta.env.VITE_IMAGES_URL}/${
                    viewRequestResponse?.path3
                  }`}
                  className="flex flex-row-reverse items-center gap-2 text-secondary"
                  target="_blank"
                >
                  <AiOutlineDownload className=" w-5 h-5 " />
                  <p className=" text-sm font-semibold">تصویر چک وثیقه</p>
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      <Modal
        title={"گزارش ناقصی در بررسی مدارک"}
        body={"متن گزارش خود را وارد نمایید"}
        isOpen={show}
        close={setShow}
      >
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
        <button
          onClick={() => onSubmit(false)}
          disabled={
            reqPayloadData.message.length === 0 || reportLoading ? true : false
          }
          className={
            reportLoading
              ? " w-full p-2 mt-2  font-semibold text-white bg-g-5 rounded-lg transition"
              : reqPayloadData.message.length > 0
              ? " w-full p-2 mt-2 outline-none  font-semibold text-white bg-secondary hover:bg-s-6 rounded-lg transition"
              : " w-full p-2  mt-2 font-semibold text-white bg-g-5 rounded-lg transition"
          }
        >
          {reportLoading ? "درحال ارسال..." : "تایید مرحله"}
        </button>
      </Modal>
    </>
  );
}

export default RecordCheck_evidence;
