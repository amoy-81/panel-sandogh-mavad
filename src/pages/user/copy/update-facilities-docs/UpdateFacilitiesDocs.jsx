import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../../core/http-service.js";
import { useState } from "react";
import Loader from "../../../../components/loader/Loader.jsx";
import { dateConversion } from "../../../../helper/dateConversion.js";
import { itemTitle } from "../../../../helper/itemTitle.js";
import { toast } from "react-toastify";

import S1PlacesUp from "./components/S1PlacesUp";
import S2ResidencesUp from "./components/S2ResidencesUp";
import S2ShareholdersUp from "./components/S2ShareholdersUp";
import S2ManpowersUp from "./components/S2ManpowersUp";
import S2BoardsUp from "./components/S2BoardsUp";
import S3UP from "./components/S3UP";
import S2EducationalUP from "./components/S2EducationalUP";
import S4BillsUp from "./components/S4BillsUp";
import S4AssetsTUp from "./components/S4AssetsTUp.js";
import S4ActivewarrantyUp from "./components/S4ActivewarrantyUp";
import S4ActivefacilitiesUp from "./components/S4ActivefacilitiesUp";
import S5ApprovalsUp from "./components/S5ApprovalsUp";
import S5contractsUp from "./components/S5contractsUp";
import S5estatesUp from "./components/S5estatesUp";
import S4bankUP from "./components/S4bankUP";
import S5pledgesUP from "./components/S5pledgesUP";
import S1 from "./components/S1";
import S6Up from "./S6Up.jsx";
import FinishStep from "./components/FinishStep";

const UpdateFacilitiesDocs = () => {
  const reqId = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [errore, setErrore] = useState(false);
  const [showDoc, setShowDoc] = useState(null);

  const [reqData, setReqData] = useState([]);
  useEffect(() => {
    Axios.get(`/v1/request/${reqId.id}`)
      .then(async (res) => {
        console.log(res.data);
        setReqData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrore(true);
        navigate(`/user/dashboard`);
      });
  }, [showDoc]);

  if (isLoading) return <Loader />;
  return (
    <form className="bg-white rounded-3xl mt-3 p-3">
      <div className="flex justify-between items-center">
        <p className=" font-bold p-4 py-6">مشاهده و تغییر مدارک</p>
        <p
          onClick={() => navigate(-1)}
          className="cursor-pointer h-fit hover:bg-blue-700 transition-all hover:text-white p-2 rounded-lg"
        >
          بازگشت
        </p>
      </div>
      <hr className="border-dashed" />

      <div className="px-5">
        <div className="flex">
          {Boolean(reqData.facilities[0]) && (
            <p className="text-ms font-bold p-4 py-4">
              عنوان درخواست :{" "}
              <span className="text-gray-500 font-normal mr-1">
                {reqData.facilities[0].title}
              </span>
            </p>
          )}
          <p className="text-ms font-bold p-4 py-4">
            نوع درخواست :
            {Boolean(reqData.facilities[0]) && (
              <span className="text-gray-500 font-normal mr-2">
                {/* باید عوض شه */}
                {reqData.facilities[0].type_f === "saturation"
                  ? "اشباع"
                  : reqData.facilities[0].type_f === "fund"
                  ? "سرمایه در گردش"
                  : reqData.facilities[0].type_f === "prototyping"
                  ? "نمونه سازی"
                  : reqData.facilities[0].type_f === "industrial"
                  ? "تولید صنعتی"
                  : reqData.facilities[0].type_f === "pre_industrial"
                  ? "قبل از تولید صنعتی"
                  : reqData.facilities[0].type_f === "leasing"
                  ? "لیزینگ"
                  : ""}
              </span>
            )}
          </p>
        </div>
        {showDoc !== null && showDoc.select === "place" ? (
          <S1PlacesUp
            close={setShowDoc}
            data={showDoc.data}
            id={reqData.facilities[0].request_id}
            toast={toast}
          />
        ) : (
          ""
        )}
        {showDoc !== null && showDoc.select === "residence" ? (
          <S2ResidencesUp
            close={setShowDoc}
            data={showDoc.data}
            id={reqData.facilities[0].request_id}
            toast={toast}
          />
        ) : (
          ""
        )}
        {showDoc !== null && showDoc.select === "shareholder" ? (
          <S2ShareholdersUp
            close={setShowDoc}
            data={showDoc.data}
            id={reqData.facilities[0].request_id}
            toast={toast}
          />
        ) : (
          ""
        )}
        {showDoc !== null && showDoc.select === "manpower" ? (
          <S2ManpowersUp
            close={setShowDoc}
            data={showDoc.data}
            id={reqData.facilities[0].request_id}
            toast={toast}
          />
        ) : (
          ""
        )}
        {showDoc !== null && showDoc.select === "board" ? (
          <S2BoardsUp
            close={setShowDoc}
            data={showDoc.data}
            id={reqData.facilities[0].request_id}
            toast={toast}
          />
        ) : (
          ""
        )}
        {/* این بورد رو باید توی ویو برا مدیرم بزاریم نزاشته بود */}
        {showDoc !== null && showDoc.select === "benefit" ? (
          <S4BillsUp
            close={setShowDoc}
            data={showDoc.data}
            id={reqData.facilities[0].request_id}
            toast={toast}
          />
        ) : (
          ""
        )}
        {showDoc !== null && showDoc.select === "asset" ? (
          <S4AssetsTUp
            close={setShowDoc}
            data={showDoc.data}
            id={reqData.facilities[0].request_id}
            toast={toast}
          />
        ) : (
          ""
        )}
        {showDoc !== null && showDoc.select === "active_w" ? (
          <S4ActivewarrantyUp
            close={setShowDoc}
            data={showDoc.data}
            id={reqData.facilities[0].request_id}
            toast={toast}
          />
        ) : (
          ""
        )}
        {showDoc !== null && showDoc.select === "active_f" ? (
          <S4ActivefacilitiesUp
            close={setShowDoc}
            data={showDoc.data}
            id={reqData.facilities[0].request_id}
            toast={toast}
          />
        ) : (
          ""
        )}
        {showDoc !== null && showDoc.select === "approvals" ? (
          <S5ApprovalsUp
            close={setShowDoc}
            data={showDoc.data}
            id={reqData.facilities[0].request_id}
            toast={toast}
          />
        ) : (
          ""
        )}
        {showDoc !== null && showDoc.select === "contract" ? (
          <S5contractsUp
            close={setShowDoc}
            data={showDoc.data}
            id={reqData.facilities[0].request_id}
            toast={toast}
          />
        ) : (
          ""
        )}
        {showDoc !== null && showDoc.select === "estate" ? (
          <S5estatesUp
            close={setShowDoc}
            data={showDoc.data}
            id={reqData.facilities[0].request_id}
            toast={toast}
          />
        ) : (
          ""
        )}

        {showDoc !== null && showDoc.select === "introduction" ? (
          <S1
            close={setShowDoc}
            data={showDoc.data}
            id={reqData.facilities[0].request_id}
            toast={toast}
          />
        ) : (
          ""
        )}
        {showDoc !== null && showDoc.select === "product" ? (
          <S3UP
            close={setShowDoc}
            data={showDoc.data}
            id={reqData.facilities[0].request_id}
            toast={toast}
          />
        ) : (
          ""
        )}
        {showDoc !== null && showDoc.select === "educational" ? (
          <S2EducationalUP
            close={setShowDoc}
            data={showDoc.data}
            id={reqData.facilities[0].request_id}
            toast={toast}
          />
        ) : (
          ""
        )}
        {showDoc !== null && showDoc.select === "bank" ? (
          <S4bankUP
            close={setShowDoc}
            data={showDoc.data}
            id={reqData.facilities[0].request_id}
            toast={toast}
          />
        ) : (
          ""
        )}
        {showDoc !== null && showDoc.select === "pledge" ? (
          <S5pledgesUP
            close={setShowDoc}
            data={showDoc.data}
            id={reqData.facilities[0].request_id}
            toast={toast}
          />
        ) : (
          ""
        )}
        {showDoc !== null && showDoc.select === "step6" ? (
          <S6Up
            close={setShowDoc}
            reqData={showDoc.data.facilities[0]}
            reqId={reqData.facilities[0].request_id}
            toast={toast}
          />
        ) : (
          ""
        )}
        {showDoc !== null && showDoc.select === "finish" ? (
          <FinishStep
            close={setShowDoc}
            data={showDoc.data[0]}
            id={reqData.facilities[0].request_id}
            toast={toast}
          />
        ) : (
          ""
        )}

        <div className="">
          <ul role="list" className="divide-y divide-gray-100">
            {reqData.facilities && reqData.facilities[0]?.path1 && (
              <li
                onClick={() => setShowDoc({ select: "step6", data: reqData })}
                className="flex justify-between gap-x-6 rounded-2xl py-5 p-2 hover:bg-gray-200"
              >
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      مدارک بارگداری شده
                    </p>
                    {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">تعداد اسناد : {obj[keyss].length} عدد</p> */}
                  </div>
                </div>
                <div className=" sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    بارگذاری شده در :{" "}
                    {dateConversion(reqData.facilities[0].created_at)}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    آخرین تغییرات :{" "}
                    {dateConversion(reqData.facilities[0].updated_at)}
                  </p>
                </div>
              </li>
            )}
            {reqData.facilities &&
              reqData.facilities.map((obj) => {
                return Object.keys(obj).map((keyss, index) => {
                  // console.log(keyss);
                  if (
                    [
                      "board",
                      "approvals",
                      "asset",
                      "bank",
                      "benefit",
                      "contract",
                      "educational",
                      "estate",
                      "finish",
                      "introduction",
                      "manpower",
                      "place",
                      "pledge",
                      "product",
                      "residence",
                      "shareholder",
                      "active_f",
                      "active_w",
                    ].includes(keyss) &&
                    obj[keyss] &&
                    obj[keyss].length > 0
                  ) {
                    if (obj[keyss])
                      return (
                        <li
                          key={index}
                          onClick={() =>
                            setShowDoc({ select: keyss, data: obj[keyss] })
                          }
                          className="flex justify-between gap-x-6 rounded-2xl py-5 p-2 hover:bg-gray-200"
                        >
                          <div className="flex gap-x-4">
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {itemTitle(keyss)}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                تعداد اسناد : {obj[keyss].length} عدد
                              </p>
                            </div>
                          </div>
                          <div className=" sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                              بارگذاری شده در :{" "}
                              {dateConversion(obj[keyss][0].created_at)}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-gray-500">
                              آخرین تغییرات :{" "}
                              {dateConversion(obj[keyss][0].updated_at)}
                            </p>
                          </div>
                        </li>
                      );
                  }
                });
              })}
          </ul>
        </div>
      </div>
    </form>
  );
};

export default UpdateFacilitiesDocs;
