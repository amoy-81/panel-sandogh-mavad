import React, { useState } from "react";
import LogoIcon from "@assets/svg/logo1.svg";
import LoginFormInput from "../../components/Input/LoginFormInput";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { httpService } from "../../core/http-service";
import { useDispatch } from "react-redux";
import { userLoginSuccess } from "../../redux/register/loginAction";
import Loader from "../../components/loader/Loader";

function Register() {
  // tools
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [is_confirmed, setIs_confirmed] = useState(false);
  const [reqError, setReqError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // useForm for save values
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const formOnSubmit = async (data) => {
    setReqError(null);
    const reqPayload = {
      name: data.name,
      family: data.family,

      phone : data.phone
    };

    if (is_confirmed) {
      setIsLoading(true);
      console.log(data)
      // httpService
      //   .post("/v1/login", reqPayload, {
      //     headers: { "Content-Type": "application/json" },
      //   })
      //   .then((response) => {
      //     localStorage.setItem(
      //       "token",
      //       JSON.stringify(response.data.authorisation.token)
      //     );
      //     dispatch(userLoginSuccess(response.data.user));
      //     setIsLoading(false);
      //     navigate(
      //       `/${
      //         response.data.user.type === "genuine" ||
      //         response.data.user.type === "legal"
      //           ? "user"
      //           : response.data.user.type === "expert"
      //           ? "expert"
      //           : response.data.user.type === "admin"
      //           ? "admin"
      //           : ""
      //       }/dashboard`
      //     );
      //   })
      //   .catch((error) => {
      //     setReqError(error.response.data.message || "خطا در برقراری ارتباط");
      //     setIsLoading(false);
      //   });
    } else {
      setReqError("با قوانین و مقررات سامانه موافقت کنید");
    }
  };

  return (
    <>
      <div className=" relative flex flex-col items-center max-w-lg">
        {/* Loader */}
        {isLoading && <Loader />}
        <img className=" w-28 h-28" src={LogoIcon} alt="Logo" />

        {/* title and error */}
        {reqError ? (
          <p className=" text-red-500 my-6 text-center">{reqError}</p>
        ) : (
          <h1 className=" font-bold my-6 text-center text-backColor">
            ثبت نام
          </h1>
        )}

        {/* login form */}
        <form
          onSubmit={handleSubmit(formOnSubmit)}
          className=" flex flex-col gap-4"
        >
          <div className=" w-full flex max-sm:flex-col gap-4">
            <div className=" w-1/2 max-sm:w-full flex flex-col gap-2">
              {/* firstname */}
              <LoginFormInput
                type={"text"}
                register={register}
                validation={{
                  required: "این فیلد الزامیست",
                }}
                error={errors.name}
                name={"name"}
                label={"نام "}
              />
              <LoginFormInput
                type={"text"}
                register={register}
                validation={{
                  required: "این فیلد الزامیست",
                }}
                error={errors.national_code}
                name={"national_code"}
                label={"کدملی "}
              />
              {/* Repeat password */}
              <LoginFormInput
                type={"password"}
                register={register}
                validation={{
                  required: "این فیلد الزامیست",
                  minLength: 6,
                }}
                error={errors.password}
                name={"password"}
                label={"گذرواژه"}
                placeholder={"******"}
              />
            </div>
            <div className=" w-1/2 max-sm:w-full flex flex-col gap-2">
              {/* lastname */}
              <LoginFormInput
                type={"text"}
                register={register}
                validation={{
                  required: "این فیلد الزامیست",
                }}
                error={errors.family}
                name={"family"}
                label={" نام خانوادگی"}
              />
              {/* phone */}
              <LoginFormInput
                type={"text"}
                register={register}
                validation={{
                  required: "این فیلد الزامیست",
                }}
                error={errors.phone}
                name={"phone"}
                label={" شماره تماس "}
              />
              <LoginFormInput
                type={"password"}
                register={register}
                validation={{
                  required: "این فیلد الزامیست",
                  validate: (value) => {
                    if (value !== watch("password")) {
                      return "مطابقت ندارد";
                    }
                  },
                }}
                error={errors.password_confirmation}
                name={"password_confirmation"}
                label={"تکرار گذرواژه"}
                placeholder={"******"}
              />
            </div>
          </div>
          <div className=" flex justify-between items-center">
            <div className=" flex items-center gap-2 text-g-6">
              <input
                type="checkbox"
                id="is_confirmed"
                onChange={(e) => setIs_confirmed(e.target.checked)}
                className="appearance-none w-5 h-5 border-2 border-s-400 rounded bg-[#E8F0F84D] mt-1 checked:bg-s-4 checked:border-none "
              />
              <label className={reqError === "با قوانین و مقررات سامانه موافقت کنید" ? "text-red-500" : "text-g-6"} htmlFor="is_confirmed">
                با قوانین و مقررات سامانه موافقم.
              </label>
            </div>
          </div>
          <button
            disabled={isLoading}
            className={
              isLoading
                ? " text-white py-4 bg-g-6 hover:bg-g-7 rounded-lg w-full"
                : " text-white py-4 bg-secondary hover:bg-secondary rounded-lg w-full"
            }
          >
            {isLoading ? "درحال ارسال..." : "ثبت نام"}
          </button>
        </form>
        <p className=" text-g-6 font-semibold mt-6 flex gap-2">
          قبلا ثبت نام کرده اید؟
          <Link to={"/auth/login"} className=" text-secondary">
            ورود
          </Link>
        </p>
      </div>
    </>
  );
}

export default Register;
