import React, { useEffect } from "react";
import useAuth from "../../auth/useAuth";
import useRequests from "../../hooks/useRequests";
import { useForm } from "react-hook-form";
import LoginFormInput from "../../components/Input/LoginFormInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ChangePassword() {
  const { userData } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const {
    response: changePassRes,
    error: changePassErr,
    loading: changePassLoading,
    postRequest: ChangePass,
  } = useRequests({
    url: "/v1/change_pass",
    header: { "Content-Type": "multipart/form-data" },
  });

  useEffect(() => {
    if (changePassRes) {
      toast.success("گذرواژه با موفقیت تغییر کرد");
      navigate(
        `/${
          userData.type === "genuine" || userData.type === "legal"
            ? "user"
            : userData.type
        }/dashboard`
      );
    }
  }, [changePassRes]);

  const onSubmit = (data) => {
    ChangePass(data);
  };

  return (
    <>
      <div className=" py-6">
        <p className="text-xl font-extrabold text-titlesColor">تغییر گذرواژه</p>
      </div>

      <div className=" flex justify-center">
        <form
          className=" w-2/4 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <LoginFormInput
            type={"text"}
            register={register}
            validation={{
              required: "این فیلد الزامیست",
            }}
            error={errors.old_password}
            name={"old_password"}
            label={"گذرواژه قبلی"}
            placeholder={"نام کاربری"}
          />
          <LoginFormInput
            type={"password"}
            register={register}
            validation={{
              required: "این فیلد الزامیست",
              minLength: 6,
            }}
            error={errors.password}
            name={"password"}
            label={"گذرواژه جدید"}
            placeholder={"******"}
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
            label={"تکرار گذرواژه جدید"}
            placeholder={"******"}
          />
          <button
            disabled={changePassLoading}
            className={
              changePassLoading
                ? " text-white py-4 bg-g-6 hover:bg-g-7 rounded-lg w-full"
                : " text-white py-4 bg-secondary hover:bg-secondary rounded-lg w-full"
            }
          >
            {changePassLoading ? "درحال ارسال..." : "ثبت"}
          </button>
        </form>
      </div>
    </>
  );
}

export default ChangePassword;
