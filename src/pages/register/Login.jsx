import React from "react";
import LogoIcon from "@assets/svg/logo1.svg";
import LoginFormInput from "../../components/Input/LoginFormInput";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
function Login() {
  // useForm for save values
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const formOnSubmit = (data) => {
    // print form valus
    console.log(data)
  };

  return (
    <div className=" flex flex-col items-center">
      <img className=" w-28 h-28" src={LogoIcon} alt="Logo" />
      <h1 className=" font-bold my-6 text-center text-backColor">ورود</h1>

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
        <button className=" text-white py-4 bg-secondary hover:bg-secondary rounded-lg w-full">
          ورود
        </button>
      </form>
      <p className=" text-g-6 font-semibold mt-6 flex gap-2">
        حساب کاربری ندارید؟
        <Link to={"/auth/register"} className=" text-secondary">
          ثبت نام کنید.
        </Link>
      </p>
    </div>
  );
}

export default Login;
