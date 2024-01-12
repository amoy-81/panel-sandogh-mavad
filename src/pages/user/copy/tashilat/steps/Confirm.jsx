import React, { useState, useRef, useContext } from "react";
import SignatureCanvas from "react-signature-canvas";
import axios from "axios";
import { useEffect } from "react";
import { TashilatContext } from "../../../../../contexts/Tashilat.Provider";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import Loader from "../../../../../components/loader/Loader";
import { toast } from "react-toastify";
import { Vconfirm } from "../../../../../helper/validation/VS2shareholders";
import FinishModal from "../../../../../components/copy/modal/FinishModal";
import { Axios } from "../../../../../core/http-service";

export default function Confirm() {
  const navigate = useNavigate();
  const location = useLocation();
  const values = queryString.parse(location.search);

  const { confirm, setConfirm } = useContext(TashilatContext);
  const signatureRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const [showFinish, setShowFinish] = useState(false);

  const [err, setErr] = useState({});

  useEffect(() => {
    setErr(Vconfirm(confirm));
  }, [confirm]);

  useEffect(() => {
    setConfirm((prev) => {
      return {
        ...prev,
        facilities_id: parseInt(values.last_id),
      };
    });
  }, []);

  const handleSave = () => {
    const dataUrl = signatureRef.current.toDataURL();
    console.log(dataUrl);
    const byteString = atob(dataUrl.split(",")[1]);
    const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    console.log(blob);
    setConfirm((prev) => {
      return {
        ...prev,
        signature: blob,
      };
    });
  };

  const clearHandler = () => {
    setConfirm((prev) => ({ ...prev, signature: null }));
    signatureRef.current.clear();
  };
  const changeHandler = (e) => {
    setConfirm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    console.log(confirm);
  };
  const sendHandler = () => {
    setIsLoading(true);
    setShowFinish(false);
    const formData = new FormData();
    formData.append("facilities_id", confirm.facilities_id);
    formData.append("name", confirm.name);
    formData.append("amount", confirm.amount);
    formData.append("title", confirm.title);
    formData.append("supply", confirm.supply);
    formData.append("signature", confirm.signature);
    
    const token = localStorage.getItem("token");
    const isLoggedIn = token ? true : false;

    axios
      .post("/v1/finish", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(isLoggedIn && {
            Authorization: `Bearer ${JSON.parse(token)}`,
          }),
        },
      })
      .then(async (res) => {
        setIsLoading(false);
        navigate("/user/current-requests");
      })
      .catch((error) => {
        setIsLoading(false);
        toast(
          "مشکلی در ارسال اطلاعات پیش آمده لطفا تمام فیلد هارا کامل نمایید"
        );
      });
  };

  if (isLoading) return <Loader />;
  return (
    <>
      <div className="tashilat-submit-form flex flex-col w-1/3 items-center mx-auto my-6 bg-white rounded-xl p-6">
        {showFinish && (
          <FinishModal
            confirm={confirm}
            sendHandler={sendHandler}
            close={setShowFinish}
          />
        )}
        <span className="font-semibold text-sm text-gray-600    ">
          نام و نام خانوادگی مدیر عامل
        </span>

        <input
          onChange={changeHandler}
          value={confirm.name}
          name="name"
          type="text"
          className="rounded-2xl bg-transparent  border-b border-gray-600 my-2 shadow-lg "
        />
        <span className="font-semibold text-sm text-gray-600    ">
          مبلغ درخواستی{" "}
        </span>
        <input
          onChange={changeHandler}
          value={confirm.amount}
          name="amount"
          type="text"
          className="rounded-2xl bg-transparent border-b border-gray-600 my-2 shadow-lg"
        />
        <span className="font-semibold text-sm text-gray-600    ">
          عنوان تسهیلات
        </span>
        <input
          onChange={changeHandler}
          value={confirm.title}
          name="title"
          type="text"
          className="rounded-2xl bg-transparent border-b border-gray-600 my-2 shadow-lg   "
        />
        <span className="font-semibold text-sm text-gray-600    ">
          منظور از درخواست
        </span>
        <input
          onChange={changeHandler}
          value={confirm.supply}
          name="supply"
          type="text"
          className="rounded-2xl bg-transparent  border-b border-gray-600 my-2 shadow-lg   "
        />
        <div className="flex flex-col items-center mt-2">
          <span className="font-semibold text-sm text-gray-600 ">امضا</span>
          <div className="border mb-3">
            <SignatureCanvas ref={signatureRef} />
          </div>
          {confirm.signature !== null && (
            <p className="text-green-300">امضا ثبت شد</p>
          )}
          <div className="flex w-full justify-around">
            <button
              onClick={handleSave}
              className="text-center p-2 bg-green-400 rounded text-white"
            >
              ذخیره امضا
            </button>
            <button
              onClick={clearHandler}
              className="text-center p-2 bg-yellow-300 rounded text-white"
            >
              پاک کردن
            </button>
          </div>
        </div>

        <button
          className="rounded-2xl bg-secondary text-white p-2 text-center mt-8 shadow-lg  w-40 cursor-pointer  "
          onClick={() =>
            Object.keys(err).length === 0
              ? setShowFinish(true)
              : toast("لطفا همه فیلد هارا با دقت کامل کنید")
          }
        >
          ثبت اطلاعات
        </button>
      </div>
    </>
  );
}
