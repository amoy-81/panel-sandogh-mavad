import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import user from "../../../assets/imges/user.png";
// import MoreLine from "./components/MoreLine";
import Loader from "../../../components/loader/Loader";
import { onlyDateConversion } from "../../../helper/dateConversion";
import ExpertReqs from "../../../components/copy/modal/ExpertReqs";
import DeleteExpert from "../../../components/copy/modal/DeleteExpert";
import useRequests from "../../../hooks/useRequests";
import MoreLine from "../../../components/copy/expert/MoreLine";

export default function ViewExperts() {
  const [showReqsModal, setShowReqsModal] = useState(null);
  const [showDelete, setShowDelete] = useState(null);
  const [showMore, setShowMore] = useState(null);
  // const [up, setUp] = useState(0);

  const {
    response: allExpert,
    loading: allExpertLoading,
    getRequest: getExpert,
  } = useRequests({ url: `/admin/expert` });

  useEffect(() => {
    getExpert();
  }, [showDelete]);


  if (allExpertLoading) return <Loader />;
    return (
      <div>
        {showReqsModal !== null && (
          <ExpertReqs close={setShowReqsModal} details={showReqsModal} />
        )}
        <div className=" py-6 flex justify-between	">
          <div>
            <p className="text-xl font-extrabold">لیست کارشناسان</p>

            <div className="flex items-center pt-2">
              <AiOutlineInfoCircle className="text-s-4" />
              <p className="text-xs  text-gray-600 px-2">
                برای مشاهده درخواست های جاری هر کارشناس روی کارشناس مربوطه کلیک
                کنید
              </p>
            </div>
          </div>
          <div>
            <a href={`${import.meta.env.VITE_IMAGES_URL}/api/expertExcel`}>
              <button className="rounded-lg bg-green-700 mt-2   text-white p-3 font-bold text-xs">
                خروجی اکسل
              </button>
            </a>
          </div>
        </div>
        <div className="max-h-[60vh] sc overflow-y-scroll scrollable-content-chat">
          <table className="w-full ">
            <thead>
              <tr className="top-0">
                <th className="bg-white p-3 rounded-r-xl ">نمایه </th>
                <th className="bg-white p-3 ">نام </th>
                <th className="bg-white p-3 ">نام خانوادگی</th>
                <th className="bg-white p-3 ">تاریخ ثبت نام کارشناس </th>
                <th className="bg-white p-3 ">تعداد پروژه </th>
                <th className="bg-white p-3 rounded-l-xl">اعمال </th>
              </tr>
            </thead>
            {showDelete !== null && (
              <DeleteExpert close={setShowDelete} expertData={showDelete} />
            )}
            <tbody className=" text-center">
              {showMore && (
                <MoreLine
                  setShowDelete={setShowDelete}
                  expert={showMore}
                  close={setShowMore}
                />
              )}
              {allExpert &&
                allExpert.map((expert) => {
                  return (
                    <tr key={expert.id} id={expert.id} className={""}>
                      <td className=" flex justify-center items-center">
                        {" "}
                        {expert.profilegenuine &&
                          expert.profilegenuine.image !== null && (
                            <img
                              className="w-10 h-10 "
                              style={{ borderRadius: "50%" }}
                              src={`${import.meta.env.VITE_IMAGES_URL}/${expert.profilegenuine.image}`}
                              alt=""
                            />
                          )}
                        {expert.profilegenuine &&
                          expert.profilegenuine.image !== null &&
                          console.log(expert.profilegenuine.image)}
                        {(expert.profilegenuine === null ||
                          expert.profilegenuine.image === null) && (
                          <img className="w-10" src={user} alt="" />
                        )}
                      </td>
                      <td
                        onClick={() => setShowReqsModal(expert)}
                        className="cursor-pointer p-4 text-xs text-gray-400 font-bold"
                      >
                        {expert.name}
                      </td>
                      <td
                        onClick={() => setShowReqsModal(expert)}
                        className="cursor-pointer p-4 text-xs text-gray-400 font-bold"
                      >
                        {expert.family}
                      </td>
                      <td className="p-4 text-xs text-gray-400 font-bold">
                        {onlyDateConversion(expert.created_at)}
                      </td>
                      <td className="p-4 text-xs text-gray-400 font-bold">
                        {expert.project_count}
                      </td>
                      <td className="p-4 text-xs text-gray-400 font-bold">
                        <button
                          onClick={() => setShowMore(expert)}
                          className=" text-redColor border-2 border-redColor rounded-2xl p-2 ml-2"
                        >
                          بیشتر
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <hr />
      </div>
    );
}
