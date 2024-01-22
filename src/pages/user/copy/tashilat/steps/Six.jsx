import React, { useEffect, useState } from "react";
import UpDoc from "../../../../../components/copy/UploadDocs/UpDoc";
import UploadDocs_f from "../../../../../components/copy/UploadDocs/UploadDocs_f";
import axios from "axios";
import Loader from "../../../../../components/loader/Loader";
import { Validation } from "../../../../../helper/validation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { Axios } from "../../../../../core/http-service";
import useRequests from "../../../../../hooks/useRequests";
import {
  lengthFilesCheck,
  sumfilesSize,
} from "../../../../../helper/sumfilesSize";

export default function Six() {
  const values = queryString.parse(location.search);

  const [isLoading, setIsLoading] = useState(false);
  const [showNavigate, setShowNavigate] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [showErr, setShowErr] = useState({});

  const {
    response: subResponse,
    error: subError,
    loading: subLoading,
    postRequest: subPostRequest,
    percentProgress: subPercent,
    errorResponse: subErrorResponse,
  } = useRequests({
    url: "/v1/fileFacilities",
    header: { "Content-Type": "multipart/form-data" },
  });

  const [document, setDocment] = useState({
    facilities_id: parseInt(values.last_id),
    file1: null,
    file2: null,
    file3: null,
    licenses: null, // inja
    // user_id : userDatas.user.id,
    register_doc: null,
    signatory: null,
    knowledge: null,
    resume: null,
    loans: null, // ta inja felan mish
    statements: null,
    balances: null,
    catalogs: null,
    insurances: null,
    invoices: null,
    bills: null,
  });
  const { file1, file2, file3, facilities_id, ...arrayDocx } = document;

  useEffect(() => {
    if (subResponse) {
      setIsLoading(false);
      toast.success("اطلاعات ثبت شد");
      setShowNavigate(true);
      navigate(`/user/tashilat/confirm?last_id=${parseInt(values.last_id)}`);
    }
  }, [subResponse]);

  useEffect(() => {
    if (subError || subErrorResponse) {
      toast("خطا در ارسال درخواست");
      setIsLoading(false);

      if (typeof subError?.message === "string") {
        toast(subError?.message);
      }
      if (
        subErrorResponse?.errors &&
        typeof subErrorResponse?.errors === "object"
      ) {
        Object.keys(subErrorResponse.errors).map((item) => {
          toast(subErrorResponse.errors[item][0]);
        });
      }
    }
  }, [subError, subErrorResponse]);

  useEffect(() => {
    setErrors(Validation(document, "upDoc"));
  }, [document]);

  const oploaddoc = () => {
    const showE = {};

    // size limit check
    if (
      sumfilesSize(arrayDocx, { file1, file2, file3 }).unit === "مگابایت" &&
      sumfilesSize(arrayDocx, { file1, file2, file3 }).size >= 12
    ) {
      return toast.error("مجموع سایز فایل ها باید کم تر از ۱۲ مگابایت باشد");
    }

    // length files check
    if (!lengthFilesCheck(arrayDocx)) {
      return toast.error("حداکثر تعداد فایل برای هر فیلد ۳ فایل می باشد");
    }

    Object.keys(document).map((item) => {
      if (document[item] === null) {
        showE[item] = true;
      }
    });
    setShowErr(showE);

    if (!Object.keys(errors).length) {
      setIsLoading(true);
      subPostRequest(document);
    } else {
      toast.error("لطفا تمام فیلد هارا با دقت تکمیل نمایید");
    }
  };

  const changeHandler = (ev) => {
    if (ev.target.type === "radio") {
      setDocment({
        ...document,
        [ev.target.name]: ev.target.value,
      });
    } else if (ev.target.type === "text") {
      setDocment({
        ...document,
        [ev.target.name]: ev.target.value,
      });
    } else if (ev.target.type === "file") {
      setDocment({
        ...document,
        [ev.target.name]: ev.target.files[0],
      });
    }
  };

  const docChangeFile = (e) => {
    const filesEvent = e.target.files;
    const filesList = [];
    for (let i = 0; i < filesEvent.length; i++) {
      filesList.push({ file: filesEvent[i] });
    }
    setDocment({
      ...document,
      [e.target.name]: filesList,
    });
    // setDocment({
    //   ...document , [e.target.name] : e.target.files[0]
    // });
  };

  const removeHandler = (e) => {
    let arryasli = [];
    if (document[e.name] !== null) {
      arryasli = document[e.name];
    }
    arryasli.splice(e.index, 1);
    if (arryasli.length > 0) {
      setDocment({
        ...document,
        [e.name]: arryasli,
      });
    } else {
      setDocment({
        ...document,
        [e.name]: null,
      });
    }
  };

  return (
    <div className="px-5">
      <div className=" py-6">
        {showNavigate ? (
          <p className="text-xl text-secondary font-extrabold">
            درحال انتقال به صفحه تایید...
          </p>
        ) : (
          <div className="flex justify-between items-center px-2">
            <p className="text-xl font-extrabold">
              لطفا پس از پر کردن تمام فیلد ها روی ذخیره کلیک کنید
            </p>
            <button
              onClick={oploaddoc}
              className="w-1/5 h-1/2  rounded-lg bg-secondary  text-white p-3 font-medium text-xs"
            >
              ذخیره{" "}
            </button>
          </div>
        )}
      </div>
      <p className=" px-2 pb-4">
        مجموع سایز فایل ها باید کم تر از ۱۲ مگابایت باشد{" "}
        <span
          className={
            sumfilesSize(arrayDocx, { file1, file2, file3 }).unit ===
              "مگابایت" &&
            sumfilesSize(arrayDocx, { file1, file2, file3 }).size >= 12
              ? " text-redColor"
              : " text-green-600"
          }
        >
          (سایز فعلی : {sumfilesSize(arrayDocx, { file1, file2, file3 }).size}{" "}
          {sumfilesSize(arrayDocx, { file1, file2, file3 }).unit})
        </span>
      </p>
      <div className="flex">
        <UploadDocs_f
          document={document}
          changeHandler={changeHandler}
          errors={errors}
          showErr={showErr}
        />
        <UpDoc
          document={document}
          changeHandler={docChangeFile}
          errors={errors}
          showErr={showErr}
          removeItem={removeHandler}
        />
        {isLoading && <Loader />}
      </div>
    </div>
  );
}
