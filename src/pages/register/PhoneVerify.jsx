import React, { useEffect, useState } from "react";
import LogoIcon from "@assets/svg/logo1.svg";
import Loader from "../../components/loader/Loader";
import LoginFormInput from "../../components/Input/LoginFormInput";
import { useForm } from "react-hook-form";
import { httpService } from "../../core/http-service";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

function PhoneVerify() {
  const { search } = useLocation();
  const querys = queryString.parse(search)

  // useForm for save values
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [reqError, setReqError] = useState(null);

  // call verify code for phone number
  useEffect(() => {
    httpService
      .post("/v1/verify", {
        phone: querys.n,
      })
      .then((response) => {})
      .catch((error) => {});
  }, []);

  const formOnSubmit = async (data) => {
    console.log(data);
  };

  return (
    <>
      <div className=" relative flex flex-col items-center max-w-lg max-h-screen overflow-auto py-10 sc-h">
        {/* Loader */}
        {isLoading && <Loader />}
        <img className=" w-28 h-28" src={LogoIcon} alt="Logo" />

        {/* title and error */}
        {reqError ? (
          <p className=" text-red-500 my-6 text-center">{reqError}</p>
        ) : (
          <h1 className=" font-bold my-6 text-center text-backColor">
            تایید شماره تلفن
          </h1>
        )}

        <form onSubmit={handleSubmit(formOnSubmit)}>
          <LoginFormInput
            type={"text"}
            register={register}
            validation={{
              required: "این فیلد الزامیست",
            }}
            error={errors.company_name}
            name={"company_name"}
            label={"نام شرکت"}
          />
        </form>
      </div>
    </>
  );
}

export default PhoneVerify;
