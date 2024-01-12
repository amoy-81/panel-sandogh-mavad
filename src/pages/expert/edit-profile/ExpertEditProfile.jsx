import React, { useContext, useEffect, useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import user from "../../../assets/imges/user.png";
import { Axios } from "../../../core/http-service";
import { toast } from "react-toastify";
import { inputTitle } from "../../../helper/inputTitles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../../components/loader/Loader";
import useAuth from "../../../auth/useAuth";

import UIInput from "../../../components/copy/Input/UIInput";
import UIInputNumber from "../../../components/copy/Input/UIInputNumber";
import UIInputDate from "../../../components/Input/UIInputDate";
import UISelectInput from "../../../components/copy/Input/UISelectInput";

export default function ExpertEditProfile() {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [profilePic, setProfilePic] = useState(null);
  const [putId, setPutId] = useState("");

  const [sendDatas, setSendDatas] = useState({
    // national_codename : "",
    // familyphone : "",
    email: "",
    // password : "",
    // password_confirmation : "",

    // image : null,
    // number_certificate : "",
    father_name: "",
    birth_day: "",
    place_issue: "",
    // series_certificatenationality : "",
    gendermarital: "female",
    residential: "resident",
    studyeducation: "",
    job: "",

    addresspostal_code: "",
    phonenamabar: "",
    work_address: "",
    work_postal_code: "",
    work_phonework_namabar: "",
  });
  console.log(sendDatas);
  useEffect(() => {
    Axios.get(`/admin/expert/${userData.id}`)
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setPutId(res.data.id);
        const newObj = res.data;
        Object.keys(sendDatas).map((item) => {
          Object.keys(newObj).map((pi) => {
            if (pi === "profilegenuine") {
              Object.keys(newObj.profilegenuine).map((i) => {
                if (i === "address") {
                  Object.keys(newObj.profilegenuine.address).map((j) => {
                    if (item === j) {
                      setSendDatas((prev) => ({
                        ...prev,
                        [item]: newObj.profilegenuine.address[item],
                      }));
                    }
                  });
                } else {
                  if (item === i) {
                    setSendDatas((prev) => ({
                      ...prev,
                      [item]: newObj.profilegenuine[item],
                    }));
                  }
                }
              });
            } else {
              if (item === pi) {
                setSendDatas((prev) => ({
                  ...prev,
                  [item]: newObj[item],
                }));
              }
            }
          });
        });
        if (newObj.profilegenuine.image !== null) {
          setProfilePic(
            `${import.meta.env.VITE_IMAGES_URL}/${newObj.profilegenuine.image}`
          );
        }
      })
      .catch((err) => {
        console.log(err);
        navigate(`/auth/login`)
      });
  }, []);
  const imageHandler = (e) => {
    setSendDatas((prev) => {
      return {
        ...prev,
        image: e.target.files[0],
      };
    });
    setProfilePic(URL.createObjectURL(e.target.files[0]));
  };
  const sendHandler = () => {
    setIsLoading(true);
    // const docc = new FormData()
    // Object.keys(sendDatas).map(item => {
    //     docc.append(`${item}` , sendDatas[item])
    // })
    const token = localStorage.getItem("token");
    const isLoggedIn = token ? true : false;
    axios
      .post(`/admin/expert/${userData.id}`, sendDatas, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(isLoggedIn && {
            Authorization: `Bearer ${JSON.parse(token)}`,
          }),
          "X-HTTP-Method-Override": "PUT",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          toast("اطلاعات با موفقیت ثبت شد");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.response.data.message);
        if (typeof err.response.data.message === "string") {
          toast(err.response.data.message);
        } else {
          Object.keys(err.response.data.message).map((item) => {
            toast(err.response.data.message[item][0]);
          });
        }
      });
  };

  if (isLoading) return <Loader />;
  return (
    <div className="bg-white rounded-2xl mt-6 p-6">
      <div className=" p-6">
        <p className="text-xl font-extrabold">اطلاعات کاربر کارشناس </p>
      </div>
      <hr />
      <div className="flex mt-6 items-center">
        {profilePic !== null ? (
          <img
            src={profilePic}
            alt=""
            style={{ borderRadius: "50%" }}
            className=" w-16 h-16"
          />
        ) : (
          <img src={user} alt="" className="w-16" />
        )}
        <div className=" pr-4">
          <p className="font-bold">{`${userData.name} ${userData.family}`}</p>
          <label htmlFor="aks" className="text-yellow-500 text-xs">
            تغییر عکس پروفایل
          </label>
          <input
            onChange={imageHandler}
            style={{ display: "none" }}
            id="aks"
            type="file"
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        {Object.keys(sendDatas).map((item, index) => {
          if (item === "birth_day") {
            return (
              <div
                key={index}
                className="relative mt-3 ml-2 w-80 border rounded-2xl p-2 overflow-hidden  h-17 "
              >
                <p className="font-bold text-xs">{inputTitle(item)}</p>
                <UIInputDate
                  value={sendDatas[item]}
                  setSendDatas={setSendDatas}
                  name={item}
                  ph={inputTitle(item)}
                />
                <div className="absolute top-7 left-5">
                  <RiPencilFill />
                </div>
              </div>
            );
          }
          if (
            ["gender", "marital", "gendermarital", "residential"].includes(item)
          ) {
            return (
              <div
                key={index}
                className="relative mt-3 ml-2 w-80 border rounded-2xl p-2 overflow-hidden  h-17 "
              >
                <p className="font-bold text-xs">{inputTitle(item)}</p>
                <UISelectInput
                  value={sendDatas[item]}
                  setSendDatas={setSendDatas}
                  name={item}
                  ph={inputTitle(item)}
                />
                <div className="absolute top-7 left-5">
                  <RiPencilFill />
                </div>
              </div>
            );
          } else if (
            [
              "number_certificate",
              "series_certificate",
              "postal_code",
              "phone",
              "work_phone",
              "work_postal_code",
              "work_namabar",
            ].includes(item)
          ) {
            return (
              <div
                key={index}
                className="relative mt-3 ml-2 w-80 border rounded-2xl p-2 overflow-hidden  h-17 "
              >
                <p className="font-bold text-xs">{inputTitle(item)}</p>
                <UIInputNumber
                  value={sendDatas[item]}
                  setSendDatas={setSendDatas}
                  name={item}
                  ph={inputTitle(item)}
                />
                <div className="absolute top-7 left-5">
                  <RiPencilFill />
                </div>
              </div>
            );
          } else if (item !== "image") {
            return (
              <div
                key={index}
                className="relative mt-3 ml-2 w-80 border rounded-2xl p-2 overflow-hidden  h-17 "
              >
                <p className="font-bold text-xs">{inputTitle(item)}</p>
                <UIInput
                  value={sendDatas[item]}
                  setSendDatas={setSendDatas}
                  name={item}
                  ph={inputTitle(item)}
                />
                <div className="absolute top-7 left-5">
                  <RiPencilFill />
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="py-3 ">
        <button
          onClick={sendHandler}
          className=" p-3 px-10 border bg-green-500 text-white rounded-xl mr-3"
        >
          ذخیره
        </button>
      </div>
    </div>
  );
}
