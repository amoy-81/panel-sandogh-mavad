import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../../core/http-service";
import { useState } from "react";
import Loader from "../../../../components/loader/Loader";

import WboxRUp from "./components/WboxRUp";
import WboxLUp from "./components/WboxLUp";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateWarrantyDocs = () => {
  const reqId = useParams();
  const navigate = useNavigate();

  const [up, setUp] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errore, setErrore] = useState(false);

  const [document, setDocment] = useState({
    // request_id: 6,
  });
  console.log(document);
  const [reqData, setReqData] = useState([]);
  const [reqDataL, setReqDataL] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    Axios.get(`/v1/request/${reqId.id}`)
      .then(async (res) => {
        console.log(res.data);
        const response = {
          warranty: [
            {
              bills: res.data.warranty[0].bills,
              registration_doc: res.data.warranty[0].registration_doc,
              signatory: res.data.warranty[0].signatory,

              statement: res.data.warranty[0].statement,
              balance: res.data.warranty[0].balance,
              insurance: res.data.warranty[0].insurance,
              knowledge: res.data.warranty[0].knowledge,
              resume: res.data.warranty[0].resume,
              loans: res.data.warranty[0].loans,
              proforma: res.data.warranty[0].proforma,

              license: res.data.warranty[0].license,
              catalog: res.data.warranty[0].catalog,
            },
          ],
        };
        setReqDataL(response);
        setReqData(res.data);
        setIsLoading(false);
        setDocment({});
        if (up > 0) {
          toast.success("تغییرات با موفقیت ثبت شد");
        }
      })
      .catch((err) => {
        setErrore(true);
        navigate(`/user/dashboard`);
      });
  }, [up]);

  const sendHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const isLoggedIn = token ? true : false;

    axios
      .post(`/v1/request/${reqId.id}`, document, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(isLoggedIn && {
            Authorization: `Bearer ${JSON.parse(token)}`,
          }),
          "X-HTTP-Method-Override": "PUT",
        },
      })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setUp((prev) => prev + 1);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.data);
        toast("عملیات با خطا مواجه شد");
      });
  };
  if (isLoading) return <Loader />;
  return (
    <form className="bg-white rounded-3xl mt-3 p-3">
      <div className="flex justify-between items-center">
        <p className=" font-bold p-4 py-6">مشاهده و تغییر مدارک</p>
        <p
          onClick={() => navigate(-1)}
          className="cursor-pointer hover:bg-secondary transition-all hover:text-white p-2 rounded-lg"
        >
          بازگشت
        </p>
      </div>
      <hr className="border-dashed" />

      <div className="px-5">
        <div className="flex items-center">
          <button
            onClick={sendHandler}
            className="w-1/5 h-1/2  rounded-lg bg-secondary  text-white p-3 font-bold text-xs"
          >
            ذخیره{" "}
          </button>
          {Boolean(reqData.warranty[0]) && (
            <p className="text-ms font-bold p-4 py-4">
              عنوان درخواست :{" "}
              <span className="text-gray-500 font-normal mr-1">
                {reqData.warranty[0].title}
              </span>
            </p>
          )}
          <p className="text-ms font-bold p-4 py-4">
            نوع درخواست :
            {Boolean(reqData.warranty[0]) && (
              <span className="text-gray-500 font-normal mr-2">
                {reqData.warranty[0].type_w === "job"
                  ? "حسن انجام کار"
                  : reqData.warranty[0].type_w === "commitments"
                  ? "حسن انجام تعهدات"
                  : reqData.warranty[0].type_w === "deduction"
                  ? "کسور وجه الضمان"
                  : reqData.warranty[0].type_w === "prepayment"
                  ? "پیش پرداخت"
                  : reqData.warranty[0].type_w === "commitment_pay"
                  ? "تعهد پرداخت"
                  : reqData.warranty[0].type_w === "tender_offer"
                  ? "شرکت در مناقصه"
                  : reqData.warranty[0].type_w === "credit"
                  ? "حد اعتباری"
                  : ""}
              </span>
            )}
          </p>
        </div>
        <div className="flex">
          <div className="w-1/2 px-2">
            {reqData.warranty &&
              reqData.warranty.map((item, index) => {
                return (
                  <WboxRUp
                    key={index}
                    path1={item.path1}
                    path2={item.path2}
                    path3={item.path3}
                    path4={item.path4}
                    path5={item.path5}
                    path6={item.path6}
                    fn1={item.file_name1}
                    fn2={item.file_name2}
                    fn3={item.file_name3}
                    fn4={item.file_name4}
                    fn5={item.file_name5}
                    fn6={item.file_name6}
                    document={document}
                    setDocment={setDocment}
                  />
                );
              })}
          </div>
          <div className="w-1/2 px-2">
            {reqData.warranty && (
              <WboxLUp
                document={document}
                setDocment={setDocment}
                reqData={reqDataL}
              />
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default UpdateWarrantyDocs;
