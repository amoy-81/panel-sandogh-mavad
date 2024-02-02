import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRequests from "../../../../hooks/useRequests";
import { AiOutlineDownload } from "react-icons/ai";
import FileInput from "../warranty/components/FileInput";

function UpdateBondDocs() {
  const { id } = useParams();

  const {
    response: subResponse,
    error: subError,
    loading: subLoading,
    postRequest: subPostRequest,
    percentProgress: subPercent,
  } = useRequests({
    url: `/v1/request/${id}`,
    header: { "Content-Type": "multipart/form-data" , "X-HTTP-Method-Override": "PUT", },
  });

  const [reqPayloadData, setReqPayloadData] = useState({});

  const {
    response: getRequestsRes,
    error: getRequestsErr,
    loading: getRequestsLoading,
    getRequest: getRequests,
  } = useRequests({ url: `/v1/request/${id}` });

  useEffect(() => {
    getRequests();
  }, []);

  const onSubmit = () => {
    if (true) {
      subPostRequest(reqPayloadData);
    }
  };

  return (
    <div className=" ">
      <h2 className="p-6 text-2xl font-bold">
        مشاهده مدارک درخواست ضمانت نامه
      </h2>
      <div className=" mx-16 max-lg:mx-auto bg-white rounded-3xl pb-6">
        <div className=" w-full flex max-lg:flex-col gap-4 p-6">
          <p className=" w-1/2 max-lg:w-full border  p-2 rounded-xl text-g-5 outline-none">
            <span className=" font-semibold text-black">
              {"نوع ضمانت نامه"} :{" "}
            </span>
            {getRequestsRes?.bond[0].type_b === "job"
              ? "حسن انجام کار"
              : getRequestsRes?.bond[0].type_b === "commitments"
              ? "حسن انجام تعهدات"
              : getRequestsRes?.bond[0].type_b === "deduction"
              ? "کسور وجه الضمان"
              : getRequestsRes?.bond[0].type_b === "prepayment"
              ? "پیش پرداخت"
              : getRequestsRes?.bond[0].type_b === "commitment_pay"
              ? "تعهد پرداخت"
              : getRequestsRes?.bond[0].type_b === "tender_offer"
              ? "شرکت در مناقصه"
              : getRequestsRes?.bond[0].type_b === "credit"
              ? "حد اعتباری"
              : ""}
          </p>
          <p className=" w-1/2 max-lg:w-full border  p-2 rounded-xl text-g-5 outline-none">
            <span className=" font-semibold text-black">{"نوع وثیقه"} : </span>
            {getRequestsRes?.bond[0].offered_bail === "property"
              ? "وثیقه ملکی"
              : "چک"}
          </p>
        </div>

        <h2 className=" p-6 pt-0  text-xl font-bold">به روزرسانی مدارک</h2>
        <hr className="w-full border-2 border-dashed border-g-2" />
        <div className=" w-full flex max-lg:flex-col gap-4 p-6">
          <div className=" w-full  flex items-center gap-4 flex-col p-2">
            {getRequestsRes?.bond[0].letter_path && (
              <a
                href={`${import.meta.env.VITE_IMAGES_URL}/${
                  getRequestsRes?.bond[0].letter_path
                }`}
                className="flex flex-row-reverse items-center gap-2 text-secondary"
                target="_blank"
              >
                <AiOutlineDownload className=" w-5 h-5 " />
                <p className=" text-sm font-semibold">نامه درخواست ضمانت</p>
              </a>
            )}
            {/* <FileInput
              currentValue={reqPayloadData.letter}
              setCurrentValue={setReqPayloadData}
              prossesPercent={subPercent}
              loading={subLoading}
              name={"letter"}
              title={"تغییر نامه درخواست ضمانت"}
            /> */}
          </div>
          <div className=" w-full  flex items-center gap-4 flex-col p-2">
            {getRequestsRes?.bond[0].credit_path && (
              <a
                href={`${import.meta.env.VITE_IMAGES_URL}/${
                  getRequestsRes?.bond[0].credit_path
                }`}
                className="flex flex-row-reverse items-center gap-2 text-secondary"
                target="_blank"
              >
                <AiOutlineDownload className=" w-5 h-5 " />
                <p className=" text-sm font-semibold">نامه حد اعتباری</p>
              </a>
            )}
            {/* <FileInput
              currentValue={reqPayloadData.credit}
              setCurrentValue={setReqPayloadData}
              prossesPercent={subPercent}
              loading={subLoading}
              name={"credit"}
              title={"تغییر نامه حد اعتباری"}
            /> */}
          </div>
        </div>
          {/* <div className=" w-full flex justify-center">
            <button
              onClick={onSubmit}
              disabled={subLoading}
              className={
                subLoading
                  ? " transition text-white py-4 bg-g-6 hover:bg-g-7 rounded-lg w-2/3"
                  : " transition text-white py-4 bg-secondary hover:bg-secondary rounded-lg w-2/3"
              }
            >
              {subLoading ? "در حال ارسال..." : "ثبت درخواست"}
            </button>
          </div> */}
      </div>
    </div>
  );
}

export default UpdateBondDocs;
