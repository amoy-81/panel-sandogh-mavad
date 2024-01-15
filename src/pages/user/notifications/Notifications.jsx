import React, { useEffect } from "react";
import useRequests from "../../../hooks/useRequests";
import { onlyDateConversion } from "../../../helper/dateConversion";
import Loader from "../../../components/loader/Loader";
import { Link } from "react-router-dom";
import useNavigateTypeLinkCreator from "../../../hooks/useNavigateTypeLinkCreator";
import useAuth from "../../../auth/useAuth";

function Notifications() {
  const userType = useNavigateTypeLinkCreator();
  const { userData } = useAuth();
  // all notif api
  const {
    response: allNotifRes,
    error: allNotifErr,
    loading: allNotifLoading,
    getRequest: getAllNotif,
  } = useRequests({ url: `/v1/get_all_notification` });

  const {
    response: unreadNotifRes,
    error: unreadNotifErr,
    loading: unreadNotifLoading,
    getRequest: getUnreadNotif,
  } = useRequests({ url: `/v1/get_unread_notification` });

  //   call get notifs
  useEffect(() => {
    getAllNotif();
    getUnreadNotif();
  }, []);

  const commonElements =
    allNotifRes && unreadNotifRes
      ? unreadNotifRes.filter((item1) =>
          allNotifRes.some((item2) => item1.id === item2.id)
        )
      : [];
  const filteredArray2 =
    allNotifRes && unreadNotifRes
      ? allNotifRes.filter(
          (item2) => !commonElements.some((item1) => item1.id === item2.id)
        )
      : [];

  return (
    <div>
      {(allNotifLoading || unreadNotifLoading) && <Loader />}
      <div className="flex justify-between py-6">
        <p className="text-xl font-extrabold">مشاهده اعلانات</p>
      </div>
      <div className="h-[60vh] overflow-y-auto sc">
        <table className="w-full ">
          <thead>
            <tr className=" top-0   ">
              <th className="bg-white p-3 rounded-r-xl ">فرستنده </th>
              <th className="bg-white p-3 ">توضیحات </th>
              <th className="bg-white p-3 ">درخواست</th>
              <th className="bg-white p-3 ">تاریخ ارسال</th>
            </tr>
          </thead>
          <tbody>
            {unreadNotifRes &&
              unreadNotifRes.map((notif) => {
                return (
                  <tr
                    key={notif.id}
                    id={notif.id}
                    className=" border-dashed border-b-[2px] border-[#E8E8EA] hover:bg-p-2 text-center"
                  >
                    <td className="p-4 text-xs text-secondary font-bold">
                      {notif.data.sender}
                    </td>
                    <td className="p-4 text-xs text-secondary font-bold">
                      {notif.data.message}
                    </td>
                    <td className="p-4  text-xs text-gray-400 font-bold">
                      <Link
                        to={`/redirect-request/${notif.data.request_id}`}
                        className=" text-white bg-secondary rounded p-2"
                      >
                        مشاهده
                      </Link>
                    </td>
                    <td className="p-4 text-xs text-secondary font-bold">
                      {onlyDateConversion(notif.created_at)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
          <tbody>
            {filteredArray2 &&
              filteredArray2.map((notif) => {
                return (
                  <tr
                    key={notif.id}
                    id={notif.id}
                    className=" border-dashed border-b-[2px] border-[#E8E8EA] hover:bg-white text-center"
                  >
                    <td className="p-4 text-xs text-gray-400 font-bold">
                      {notif.data.sender}
                    </td>
                    <td className="p-4 text-xs text-gray-400 font-bold">
                      {notif.data.message}
                    </td>
                    <td className="p-4  text-xs text-gray-400 font-bold">
                      <Link
                        to={`/redirect-request/${notif.data.request_id}`}
                        className=" text-white bg-secondary rounded p-2"
                      >
                        مشاهده
                      </Link>
                    </td>
                    <td className="p-4 text-xs text-gray-400 font-bold">
                      {onlyDateConversion(notif.created_at)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {/* null values */}
        {!allNotifRes && !unreadNotifRes && (
          <div className="w-full flex justify-center">
            <p className="p-5">اعلانی وجود ندارد</p>
          </div>
        )}
      </div>
      <hr />
      <div className="flex justify-between py-4 text-gray-600 items-center">
        <div className="">نمایش 21-31 از 80 مورد</div>
        <div className="">
          <button className="text-gray-800 text-2xl font-bold mx-2">
            {"<"}
          </button>
          <button className="text-gray-800 text-lg font-bold mx-2">6</button>
          <button className="text-gray-800 text-lg font-bold mx-2">5</button>
          <button className="text-gray-800 text-lg font-bold mx-2">4</button>
          <button className="text-gray-800 text-lg font-bold mx-2">3</button>
          <button className="text-gray-800 text-lg font-bold mx-2">2</button>
          <button className="text-gray-800 text-lg font-bold mx-2">1</button>
          <button className="text-gray-800 text-2xl font-bold mx-2">
            {" "}
            {">"}{" "}
          </button>
        </div>
        <div className="flex">
          <select
            dir="ltr"
            name=""
            id=""
            className="rounded outline-none w-20 text-gray-800 border ml-4"
          >
            <option value="10">10</option>
            <option value="10">15</option>
            <option value="10">20</option>
          </select>
          <p>تعداد کاربر در هر صفحه</p>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
