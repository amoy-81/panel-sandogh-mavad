import React, { useEffect, useState } from "react";
import useAuth from "../../../../auth/useAuth";
import useRequests from "../../../../hooks/useRequests";
import FilesInput from "./components/FilesInput";
import { toast } from "react-toastify";
import SingleFileInput from "./components/SingleFileInput";
import { titleChanger } from "../../../../helper/titleChanger";
import { useNavigate } from "react-router-dom";

function CreditLimit() {
  const { userData } = useAuth();
  const navigate = useNavigate();

  const [errorsState, setErrorsState] = useState({});

  const [details, setDetails] = useState({
    user_id: userData.id,
    type: "Warranty",
    title: `${userData.name} ${userData.family}`,
    type_w: "job",
  });

  const [mainDocs, setMainDocs] = useState({
    file1: null,
    file2: null,
    file3: null,
    file4: null,
    file5: null,
    file6: null,
  });

  const [document, setDocment] = useState({
    licenses: null,
    register_doc: null,
    signatory: null,
    knowledge: null,
    resume: null,
    loans: null,
    statements: null,
    balances: null,
    catalogs: null,
    insurances: null,
    bills: null,
    invoices: null,
  });

  // api
  const {
    response: subResponse,
    error: subError,
    loading: subLoading,
    postRequest: subPostRequest,
    percentProgress: subPercent,
    errorResponse: subErrorResponse,
  } = useRequests({
    url: "/v1/request",
    header: { "Content-Type": "multipart/form-data" },
  });

  // delete req
  const { deleteRequest: deleteReqRequest } = useRequests({
    url: `/v1/request/${subErrorResponse?.id}`,
  });

  // req success
  useEffect(() => {
    if (subResponse) {
      toast.success("درخواست با موفقیت ثبت شد");
      navigate(`/user/current-requests`);
    }
  }, [subResponse]);

  useEffect(() => {
    if (subErrorResponse) {
      deleteReqRequest();
    }
  }, [subErrorResponse]);

  // submit form
  const onSubmit = () => {
    setErrorsState({});
    let errorCounter = 0;
    Object.keys(document).map((filed) => {
      if (document[filed] === null) {
        setErrorsState((prev) => ({ ...prev, [filed]: "این فیلد الزامیست" }));
        errorCounter++;
      }
    });
    Object.keys(mainDocs).map((filed) => {
      if (mainDocs[filed] === null) {
        setErrorsState((prev) => ({ ...prev, [filed]: "این فیلد الزامیست" }));
        errorCounter++;
      }
    });

    if (errorCounter === 0) {
      subPostRequest({ ...mainDocs, ...document, ...details });
    } else {
      toast.error("لطفا تمام موارد را با دقت تکمیل نمایید");
    }
  };
  return (
    <div className="px-5">
      <div className=" py-6">
        <p className="text-xl font-extrabold">بارگیری و بارگذاری مدارک</p>
      </div>
      <div className=" w-full flex justify-around max-lg:flex-col max-lg:gap-4 p-4">
        <select
          className=" w-2/3 max-lg:w-full border border-p-7 p-2 rounded-xl text-g-5 outline-none"
          onChange={(e) =>
            setDetails((prev) => ({ ...prev, type_b: e.target.value }))
          }
          name=""
          id=""
        >
          <option value="" disabled selected>
            {" "}
            نوع ضمانت نامه را انتخاب کنید
          </option>
          <option value="job">حسن انجام کار </option>
          <option value="commitments">حسن انجام تعهدات</option>
          <option value="deduction">کسور وجه الضمان</option>
          <option value="prepayment">پیش پرداخت</option>
          <option value="commitment_pay">تعهد پرداخت</option>
          <option value="tender_offer">شرکت در مناقصه</option>
          <option value="credit">حد اعتباری</option>
        </select>

        <button
          onClick={onSubmit}
          disabled={subLoading}
          className={
            subLoading
              ? " transition text-white py-2 max-lg:w-full bg-g-6 hover:bg-g-7 rounded-lg w-1/4"
              : " transition text-white py-2 max-lg:w-full bg-secondary hover:bg-secondary rounded-lg w-1/4"
          }
        >
          {subLoading ? "در حال ارسال..." : "ثبت درخواست"}
        </button>
      </div>
      <div className=" flex gap-4 w-full px-2 max-lg:flex-col">
        <div className=" bg-white rounded-xl p-5 w-1/2 max-lg:w-full">
          <div className=" pb-4">
            <p className=" font-bold"> مدارک اولیه </p>
          </div>
          <hr className="border-dashed border-gray-300" />
          <p className="text-xs py-3">
            <span className="text-p-7"> توضیحات :</span> فایل را از حالت فشرده
            خارج کنید و هر فرم را پر کنید سپس در جای مناسب بارگذاری کنید
          </p>
          <p className="text-xs py-3">
            فرمت های مجاز doc, docx, pdf, zip, png, jpg
          </p>
          <a href={`${import.meta.env.VITE_IMAGES_URL}/storage/docs/1_6271033281.zip`}>
            <button className="w-full border rounded-lg border-p-7 text-p-7 p-2 hover:bg-p-7 hover:text-white transition font-bold text-sm">
              بارگیری فایل مدارک اصلی
            </button>
          </a>
          <br />
          <br />
          <hr className="border-dashed border-gray-300" />

          {Object.keys(mainDocs).map((filde) => (
            <div className=" flex mt-5 flex-col w-full gap-2">
              <SingleFileInput
                currentValue={mainDocs[filde]}
                setCurrentValue={setMainDocs}
                error={errorsState[filde]}
                name={filde}
                title={titleChanger(filde)}
                loading={subLoading}
                prossesPercent={subPercent}
              />
            </div>
          ))}
        </div>
        <div className=" w-1/2 p-5 bg-white rounded-xl max-lg:w-full ">
          <div className=" pb-4">
            <p className=" font-bold">اسناد</p>
          </div>
          <hr className="border-dashed border-gray-300" />
          <div className=" flex mt-5 flex-col w-full gap-2">
            {Object.keys(document).map((filde) => (
              <FilesInput
                mainObject={document}
                error={errorsState[filde]}
                currentValue={document[filde]}
                setCurrentValue={setDocment}
                name={filde}
                title={titleChanger(filde)}
                loading={subLoading}
                prossesPercent={subPercent}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreditLimit;
