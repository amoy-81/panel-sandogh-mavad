import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import Loader from "../../../../../components/loader/Loader";
import { useEffect } from "react";
import { Vconfirm } from "../../../../../helper/validation/VS2shareholders";

function FinishStep({ close, data, id, toast }) {
  const navigate = useNavigate();
  const location = useLocation();
  const values = queryString.parse(location.search);

  const [confirm, setConfirm] = useState({
    name: data.name,
    amount: data.amount,
    title: data.title,
    supply: data.supply,
    signature: null,
  });
  const signatureRef = useRef(null);
  const [signatureImage, setSignatureImage] = useState(data.signature);

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

  const handleSave = (e) => {
    e.preventDefault();
    const dataUrl = signatureRef.current.toDataURL();
    const byteString = atob(dataUrl.split(",")[1]);
    const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: "image/png" });
    setConfirm((prev) => {
      return {
        ...prev,
        signature: blob,
      };
    });
  };

  const clearHandler = (e) => {
    e.preventDefault();
    setSignatureImage(null)
    setConfirm((prev) => ({ ...prev, signature: null }));
    signatureRef.current.clear();
  };
  const changeHandler = () => {
    setConfirm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const sendHandler = () => {
    setIsLoading(true);
    setShowFinish(false);
    const formData = new FormData();
    formData.append("name", confirm.name);
    formData.append("amount", confirm.amount);
    formData.append("title", confirm.title);
    formData.append("supply", confirm.supply);
    formData.append("signature", confirm.signature);

    const token = localStorage.getItem("token");
    const isLoggedIn = token ? true : false;

    axios
      .post(`/v1/finish/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-HTTP-Method-Override": "PUT",
          ...(isLoggedIn && {
            Authorization: `Bearer ${JSON.parse(token)}`,
          }),
        },
      })
      .then((res) => {
        setIsLoading(false);
        toast("تغییرات باموفقیت ثبت شد");
        close(null);
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
    <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex flex-col items-center justify-center">
      <div className="">
        <div className="tashilat-submit-form flex flex-col items-center mx-auto my-6 bg-white rounded-xl p-6  max-h-[95vh] overflow-y-auto">
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
            {signatureImage !== null ? (
              <img
                src={`${import.meta.env.VITE_IMAGES_URL}/${signatureImage}`}
                alt="امضا"
              />
            ) : (
              <div className="border mb-3">
                <SignatureCanvas ref={signatureRef} />
              </div>
            )}
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
          <div className=" flex gap-2 w-full">
            <button
              className="rounded-2xl bg-blue-700 text-white p-2 text-center mt-8 shadow-lg  w-1/2 cursor-pointer  "
              onClick={(e) => {
                e.preventDefault();
                if (Object.keys(err).length === 0) {
                  sendHandler();
                } else {
                  toast("لطفا همه فیلد هارا با دقت کامل کنید");
                }
              }}
            >
              ثبت اطلاعات
            </button>
            <button
              className="rounded-2xl bg-red-700 text-white p-2 text-center mt-8 shadow-lg  w-1/2 cursor-pointer  "
              onClick={() => close(null)}
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinishStep;
