import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../components/loader/Loader";
import { toast } from "react-toastify";
import queryString from "query-string";
import { Axios } from "../../../../core/http-service";

export default function ExpertChangePassword() {
  const ExId = useParams();
  const location = useLocation();
  const nameAndF = queryString.parse(location.search).name?.split("_");

  const navigate = useNavigate();
  const [sendData, setSendData] = useState({
    password: "",
    password_confirmation: "",
  });
  const [err, setErr] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const sendHandler = () => {
    setErr(false);
    if (
      sendData.password === sendData.password_confirmation &&
      sendData.password !== ""
    ) {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const isLoggedIn = token ? true : false;
      Axios.post(`/admin/expert/${ExId.id}`, sendData, {
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
          toast("اطلاعات با موفقیت ثبت شد");
          toast("در حال انتقال به لیست کارشناسان...");
          setTimeout(() => {
            navigate("/panel/viewExpert");
          }, 2000);
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
    } else {
      setErr(true);
      console.log("err");
    }
  };
  if (isLoading) return <Loader />;
  return (
    <div className="bg-white rounded-2xl mt-6 p-6">
      <div className="flex items-center justify-between p-6">
        <p className="text-xl font-extrabold">تغییر رمز عبور</p>
        <p
          onClick={() => navigate(-1)}
          className="cursor-pointer hover:bg-blue-700 transition-all hover:text-white p-2 rounded-lg"
        >
          بازگشت
        </p>
      </div>
      <hr />
      {nameAndF && (
        <p className="flex pr-6 pt-6">
          نام کاربری :{" "}
          <p className="text-blue-400 pr-2">{`${nameAndF[0]} ${nameAndF[1]}`}</p>
        </p>
      )}
      <div className="">
        <div className="w-1/2 mx-auto">
          <div className="mt-6">
            <div className="flex">
              <p className="font-bold text-sm">رمز عبور جدید :</p>
              {/* <RiPencilLine className="mr-3" /> */}
            </div>
            <input
              type="text"
              value={sendData.password}
              onChange={(e) =>
                setSendData((p) => ({ ...p, [e.target.name]: e.target.value }))
              }
              name="password"
              id=""
              className="border-0 rounded-xl bg-purple-50 outline-none mt-2 w-full"
            />
          </div>
          <div className="mt-6">
            <div className="flex">
              <p className="font-bold text-sm">تکرار رمز عبور جدید :</p>
            </div>
            <input
              type="text"
              value={sendData.password_confirmation}
              onChange={(e) =>
                setSendData((p) => ({ ...p, [e.target.name]: e.target.value }))
              }
              name="password_confirmation"
              id=""
              className="border-0 rounded-xl bg-purple-50 outline-none mt-2 w-full"
            />
          </div>
          {err && (
            <p className="text-primary p-3">
              پسورد و تایید با هم مطابقت ندارند
            </p>
          )}
          <button
            onClick={sendHandler}
            className="rounded-xl p-3 px-8 mt-6 bg-s-7 text-white text-sm "
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}
