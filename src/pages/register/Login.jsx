import React, { useState } from "react";
import LogoIcon from "@assets/svg/logo1.svg";
import LoginFormInput from "../../components/Input/LoginFormInput";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { httpService } from "../../core/http-service";
import { useDispatch } from "react-redux";
import { userLoginSuccess } from "../../redux/register/loginAction";
import Loader from "../../components/loader/Loader";

function Login() {
  // tools
  const dispatch = useDispatch();
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
    const reqPayload = {
      username: data.username,
      password: data.password,
    };
    httpService
      .post("/v1/login", reqPayload, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.authorisation.token)
        );
        dispatch(userLoginSuccess(response.data.user));
        setIsLoading(false);
        navigate(
          `/${
            response.data.user.type === "genuine" ||
            response.data.user.type === "legal"
              ? "user"
              : response.data.user.type === "expert"
              ? "expert"
              : response.data.user.type === "admin"
              ? "admin"
              : ""
          }/dashboard`
        );
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
          <h1 className=" font-bold my-6 text-center text-backColor">ورود</h1>
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
            }}
            error={errors.username}
            name={"username"}
            label={"نام کاربری (کدملی یا شناسه ملی شرکت)"}
            placeholder={"نام کاربری"}
          />
          {/* password */}
          <LoginFormInput
            type={"password"}
            register={register}
            validation={{
              required: "این فیلد الزامیست",
              minLength: 6,
            }}
            error={errors.password}
            name={"password"}
            label={"گذرواژه (حداقل 8 کاراکتر)"}
            placeholder={"******"}
          />
          <div className=" flex justify-between items-center">
            <div className=" flex items-center gap-2 text-g-6">
              <input
                type="checkbox"
                id="remember"
                className="appearance-none w-5 h-5 border-2 border-s-400 rounded bg-[#E8F0F84D] mt-1 checked:bg-s-4 checked:border-none "
              />
              <label htmlFor="remember">به خاطر بسپار !</label>
            </div>
            <Link to={"/auth/forgetpassword"} className=" text-secondary">
              فراموشی رمز عبور
            </Link>
          </div>
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

export default Login;
