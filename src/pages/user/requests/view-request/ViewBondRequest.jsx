import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useRequests from "../../../../hooks/useRequests";
import { AiOutlineDownload } from "react-icons/ai";
import Loader from "../../../../components/loader/Loader";

function ViewBondRequest() {
  const { requestId } = useParams();

  //   apis
  const {
    response: getWageResponse,
    error: getWageError,
    loading: getWageLoading,
    getRequest: getWage,
  } = useRequests({
    url: `/v1/get_wage/${requestId}`,
  });

  const {
    response: getAgreementResponse,
    error: getAgreementError,
    loading: getAgreementLoading,
    getRequest: getAgreement,
  } = useRequests({
    url: `/v1/get_agreement/${requestId}`,
  });

  useEffect(() => {
    getAgreement();
    getWage();
  }, []);

  if (getAgreementLoading || getWageLoading) return <Loader />

  return (
    <>
      <div className=" relative w-full flex justify-center">
        <div className=" w-2/3 p-4 bg-white rounded-xl">
          <h1 className=" p-2 font-extrabold">گزارش کارمز وجه و وثیقه</h1>
          <div className=" flex justify-center">
            <hr className="w-full border-[1px] border-dashed border-g-2" />
          </div>

          <h1 className=" p-2 font-extrabold text-sm">متن گزارش :</h1>
          <p className=" p-2 text-g-6 text-sm">{getWageResponse?.message}</p>

          <div className=" w-full  flex justify-around max-lg:flex-col p-2">
            {getWageResponse?.path && (
              <a
                href={`${import.meta.env.VITE_IMAGES_URL}/${
                  getWageResponse?.path
                }`}
                className="flex flex-row-reverse items-center gap-2 text-secondary"
                target="_blank"
              >
                <AiOutlineDownload className=" w-5 h-5 " />
                <p className=" text-sm font-semibold">بارگیری فایل</p>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className=" relative w-full flex justify-center">
        <div className=" w-2/3 p-4 bg-white rounded-xl">
          <h1 className=" p-2 font-extrabold">گزارش امضای قرارداد</h1>
          <div className=" flex justify-center">
            <hr className="w-full border-[1px] border-dashed border-g-2" />
          </div>

          <h1 className=" p-2 font-extrabold text-sm">متن گزارش :</h1>
          <p className=" p-2 text-g-6 text-sm">{getAgreementResponse?.text}</p>
        </div>
      </div>
    </>
  );
}

export default ViewBondRequest;
