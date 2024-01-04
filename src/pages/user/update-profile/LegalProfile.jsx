import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ProfileInput from "../../../components/Input/ProfileInput";
import { inputTitle } from "../../../helper/inputTitles";
import UIInputDate from "../../../components/Input/UIInputDate";
import useRequests from "../../../hooks/useRequests";
import Loader from "../../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LegalProfile() {
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
    url: "/v1/profile_legal",
  });

  const [establishment, setEtablishment] = useState("2000-11-11");

  const personalInformation = {
    // api resource
    type_legal: "تست",
    place_registration: "2تست",
    signed_right: "تست",
    initial_investment: "تست",
    fund: "تست",
    subject_activity: "تست",
    name_representative: "تست",
    landline_phone: "تست",
    phone: "تست",
    email: "تست",
    site: "",
  };

  useEffect(() => {
    if (userData.type === 'genuine') {
      navigate('/user/record_genuine_profile')
    }
  } , [])

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
      establishment: establishment,
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
        <p className="text-xl font-extrabold">اطلاعات کاربر حقوقی </p>
      </div>

      <hr className="w-full border border-dashed border-g-2" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-2/3 flex flex-wrap">
          {/* personalInformation */}
          {Object.keys(personalInformation).map((lableName, index) => (
            <ProfileInput
              key={index}
              type={inputTypeCreate(lableName)}
              register={register}
              validation={{ required: "این فیلد الزامیست" }}
              error={errors[lableName]}
              name={lableName}
              label={inputTitle(lableName)}
            />
          ))}
          <div className="relative mt-3 ml-2 w-80 border rounded-2xl p-2 overflow-hidden  h-17 ">
            <p className="font-bold text-xs">{inputTitle("establishment")}</p>
            <UIInputDate
              value={establishment}
              setSendDatas={setEtablishment}
              name="establishment"
              ph={inputTitle("establishment")}
            />
          </div>
        </div>
        <button
          type="submit"
          className=" text-white py-4 px-6 mt-5 bg-secondary transition hover:bg-s-6 rounded-2xl"
        >
          ثبت اطلاعات
        </button>
      </form>
    </div>
  );
}

export default LegalProfile;
