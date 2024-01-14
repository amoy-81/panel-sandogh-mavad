import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ProfileInput from "../../../components/Input/ProfileInput";
import { inputTitle } from "../../../helper/inputTitles";
import EnumResource from "./components/EnumResource";
import UIInputDate from "../../../components/Input/UIInputDate";
import userImagePng from "../../../assets/png/user.png";
import useRequests from "../../../hooks/useRequests";
import Loader from "../../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../auth/useAuth";

function GenuineProfile() {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
  } = useForm();

  // api
  const {
    response: subResponse,
    error: subError,
    loading: subLoading,
    postRequest: subPostRequest,
  } = useRequests({
    url: "/v1/profile_genuine",
    header: { "Content-Type": "multipart/form-data" },
  });

  const [birth_day, setBirth_day] = useState("2000-01-01");
  const [profileImage, setProfileImage] = useState(null);

  const [enumResourceState, setEnumResourceState] = useState({
    gender: "female", //male
    marital: "single", //married
    residential: "resident", //non_resident
  });

  const personalInformation = {
    father_name: "",
    number_certificate: "",
    place_issue: "",
    series_certificate: "",
    nationality: "",
    study: "",
    job: "",
    education: "",
  };

  const address = {
    address: "",
    postal_code: "",
    home_number: "", //size:11
    namabar: "",
    work_address: "",
    work_postal_code: "",
    work_phone: "", //size:11
    work_namabar: "",
  };

  useEffect(() => {
    if (userData.type === "legal") {
      navigate("/user/record_legal_profile");
    }
  }, []);

  useEffect(() => {
    if (subResponse) {
      toast.success("اطلاعات ثبت شد در حال انتقال ...", { autoClose: 2000 });
      setTimeout(() => {
        navigate("/user/dashboard");
      }, 2000);
    }
  }, [subResponse]);

  useEffect(() => {
    if (subError) {
      Object.keys(subError).map((errFilde) =>
        toast.error(subError[errFilde][0])
      );
    }
  }, [subError]);

  //   form submit handler
  const onSubmit = (data) => {
    const payload = {
      ...data,
      ...enumResourceState,
      birth_day: birth_day,
      image: profileImage ? profileImage : "",
    };
    subPostRequest(payload);
  };

  const inputTypeCreate = (lable) => {
    if (
      [
        "number_certificate",
        "series_certificate",
        "postal_code",
        "work_phone",
        "work_postal_code",
        "work_namabar",
      ].includes(lable)
    ) {
      return "number";
    } else {
      return "text";
    }
  };
  return (
    <div className=" relative bg-white rounded-2xl mt-6 p-6">
      {subLoading && <Loader />}
      <div className=" p-6">
        <p className="text-xl font-extrabold">اطلاعات کاربر حقیقی </p>
      </div>

      <hr className="w-full border border-dashed border-g-2" />

      <div className=" flex gap-4 mt-5">
        <label htmlFor="image">
          <img
            src={
              profileImage ? URL.createObjectURL(profileImage) : userImagePng
            }
            className=" w-16 h-16 rounded-full"
            alt="user"
          />
        </label>
        <div className=" flex flex-col justify-center">
          <h1 className=" font-bold">
            {userData.name} {userData.family}
          </h1>
          <p className=" text-g-6">عکس پروفایل</p>
        </div>
        <input
          type="file"
          name="image"
          className=" hidden"
          id="image"
          accept=".jpg,.jpeg,.png,"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-2/3 max-lg:w-full flex flex-wrap">
          {/* personalInformation */}
          {Object.keys(personalInformation).map((lableName, index) => (
            <ProfileInput
              key={index}
              type={inputTypeCreate(lableName)}
              register={register}
              validation={
                ["work_phone", "home_number"].includes(lableName)
                  ? {
                      required: "این فیلد  rالزامیست",
                      minLength: 11,
                      maxLength: 11,
                    }
                  : { required: "این فیلد الزامیست" }
              }
              error={errors[lableName]}
              name={lableName}
              label={inputTitle(lableName)}
            />
          ))}
          <div className="relative mt-3 ml-2 w-80 max-lg:w-full border rounded-2xl p-2 overflow-hidden  h-17 ">
            <p className="font-bold text-xs">{inputTitle("birth_day")}</p>
            <UIInputDate
              value={birth_day}
              setSendDatas={setBirth_day}
              name="birth_day"
              ph={inputTitle("birth_day")}
            />
          </div>
        </div>

        {/* select resource */}
        <EnumResource
          values={enumResourceState}
          setValues={setEnumResourceState}
        />

        <div className=" p-6">
          <p className="text-xl font-extrabold">محل سکونت</p>
        </div>
        <hr className="w-full border border-dashed border-g-2" />
        {/* address */}
        <div className="w-2/3 max-lg:w-full flex flex-wrap">
          {Object.keys(address).map((lableName, index) => (
            <ProfileInput
              key={index}
              type={inputTypeCreate(lableName)}
              register={register}
              validation={
                ["work_phone", "home_number"].includes(lableName)
                  ? {
                      required: "این فیلد الزامیست",
                      minLength: 11,
                      maxLength: 11,
                    }
                  : { required: "این فیلد الزامیست" }
              }
              error={errors[lableName]}
              name={lableName}
              label={inputTitle(lableName)}
            />
          ))}
        </div>
        <button
          className=" max-lg:w-full text-white py-4 px-6 mt-5 bg-secondary transition hover:bg-s-6 rounded-2xl"
        >
          ثبت اطلاعات
        </button>
      </form>
    </div>
  );
}

export default GenuineProfile;
