import React, { useState } from "react";
import LogoIcon from "@assets/svg/logo1.svg";
import LoginFormInput from "../../components/Input/LoginFormInput";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { httpService } from "../../core/http-service";
import { useDispatch } from "react-redux";
import { userLoginSuccess } from "../../redux/register/loginAction";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";

function ForgetPassword() {
  // tools
  const navigate = useNavigate();

  const [reqError, setReqError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // useForm for save values
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const formOnSubmit = async (data) => {
    setReqError(null);
    setIsLoading(true);
    httpService
      .post("/v1/forget_pass", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setIsLoading(false);
        toast.success("گذرواژه جدید به شماره وارد شده ارسال میگردد");
        navigate(`/auth/login`);
      })
      .catch((error) => {
        setReqError(error.response?.data.message || "خطا در برقراری ارتباط");
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className=" relative flex flex-col items-center max-w-2xl">
        {/* Loader */}
        {isLoading && <Loader />}
        <img className=" w-28 h-28" src={LogoIcon} alt="Logo" />

        {/* title and error */}
        {reqError ? (
          <p className=" text-red-500 my-6 text-center">{reqError}</p>
        ) : (
          <h1 className=" font-bold my-6 text-center text-backColor">
            فراموشی گذرواژه
          </h1>
        )}

        {/* login form */}
        <form
          onSubmit={handleSubmit(formOnSubmit)}
          className=" flex flex-col gap-4"
        >
          {/* username */}
          <LoginFormInput
            type={"text"}
            register={register}
            validation={{
              required: "این فیلد الزامیست",
              minLength: 11,
              maxLength: 11,
            }}
            error={errors.phone}
            name={"phone"}
            label={"شماره تلفن"}
            placeholder={""}
          />
          <button
            disabled={isLoading}
            className={
              isLoading
                ? " text-white py-4 bg-g-6 hover:bg-g-7 rounded-lg w-full"
                : " text-white py-4 bg-secondary hover:bg-secondary rounded-lg w-full"
            }
          >
            {isLoading ? "درحال ارسال..." : "ورود"}
          </button>
        </form>
        <p className=" text-g-6 font-semibold mt-6 flex gap-2">
          حساب کاربری ندارید؟
          <Link to={"/auth/register"} className=" text-secondary">
            ثبت نام کنید.
          </Link>
        </p>
      </div>
    </>
  );
}

export default ForgetPassword;
