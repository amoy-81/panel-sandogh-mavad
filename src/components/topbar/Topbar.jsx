import React, { useEffect, useState } from "react";
import NotifIcon from "@assets/svg/topbar/notif.svg";
import UserIcon from "@assets/svg/topbar/user.svg";
import DownIcon from "@assets/svg/topbar/down.svg";
import Vector5 from "@assets/svg/topbar/Vector4.png";
import useAuth from "../../auth/useAuth";
import useRequests from "../../hooks/useRequests";
import Modal from "../modal/Modal";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { menuState } from "../../redux/menu/menuActions";

export function Topbar() {
  const { userData, logout } = useAuth();
  console.log(userData)
  const { isOpen } = useSelector((state) => state.menuState);
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const {
    response: showUserResponse,
    error: showUserError,
    loading: showUserLoading,
    getRequest: showUserGetRequest,
  } = useRequests({
    url: `v1/show_user/${userData?.id}`,
  });

  const {
    response: unreadNotifRes,
    error: unreadNotifErr,
    loading: unreadNotifLoading,
    getRequest: getUnreadNotif,
  } = useRequests({ url: `/v1/get_unread_notification` });

  useEffect(() => {
    showUserGetRequest();
    getUnreadNotif();
  }, []);

  return (
    <>
      <header className=" flex justify-between bg-white w-full rounded-3xl p-7">
        <div
          onClick={() => dispatch(menuState(!isOpen))}
          className=" lg:hidden flex flex-col gap-2 cursor-pointer rounded-full p-3"
        >
          <div
            className={`w-10 h-1 bg-[#0D294E] transition ${
              isOpen ? ` -rotate-45 translate-y-3` : `rotate-0`
            } rounded-full`}
          ></div>
          <div
            className={`w-10 h-1 bg-[#0D294E] transition ${
              isOpen ? ` rotate-45` : `rotate-0`
            } rounded-full`}
          ></div>
          <div
            className={`w-10 h-1 bg-[#0D294E] transition ${
              isOpen ? ` opacity-0` : ` opacity-100`
            } rounded-full`}
          ></div>
        </div>
        <h1 className=" text-[#0D294E] max-lg:hidden font-extrabold flex items-center">
          {userData?.name} {userData?.family} گرامی
        </h1>
        <div className=" flex gap-10">
          <button onClick={() => setShowNotif(true)} className=" flex items-center max-lg:hidden ">
            <img
              className=" pl-2"
              src={
                unreadNotifRes && unreadNotifRes.length === 0
                  ? Vector5
                  : NotifIcon
              }
              alt="notif"
            />
            <h2 className=" font-normal text-sm text-[#0D294E]">اعلانات</h2>
          </button>
          <button
            className=" flex items-center "
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <img
              className=" ml-2 w-10 h-10 max-lg:w-12 max-lg:h-12 bg-s-1 p-1 rounded-full"
              src={
                showUserResponse?.profilegenuine?.image
                  ? `${import.meta.env.VITE_IMAGES_URL}/${
                      showUserResponse.profilegenuine.image
                    }`
                  : UserIcon
              }
              alt="notif"
            />
            <img className=" " src={DownIcon} alt="notif" />
          </button>
        </div>
      </header>

      {/* menu */}
      <Modal isOpen={showMenu} close={setShowMenu}>
        <div className="text-center bg-c-2 rounded-lg py-3">
          <img
            src={
              showUserResponse?.profilegenuine?.image
                ? `${import.meta.env.VITE_IMAGES_URL}/${
                    showUserResponse.profilegenuine.image
                  }`
                : UserIcon
            }
            alt=""
            className="w-20 h-20 rounded-full mx-auto border-2 border-primary"
          />
          <h2 className="font-bold my-3 mb-1">
            {userData?.name} {userData?.family}
          </h2>
          <a className="text-xs text-p-6 font-semibold">
            {userData?.email && userData?.email !== ""
              ? userData?.email
              : "فاقد پست الکترونیکی"}
          </a>
        </div>
        <div className=" flex w-full gap-4 text-center mb-5 max-md:flex-col" onClick={() => setShowMenu(false)}>
          <Link to={`/${userData?.type === 'genuine' || userData?.type === 'legal' ? 'user' : userData?.type}/notifications`} className=" cursor-pointer w-1/3 max-md:w-full py-2 px-4 bg-p-5 hover:bg-primary transition text-white rounded-2xl">
            اعلانات
          </Link>
          <h2 className=" cursor-pointer w-1/3 max-md:w-full py-2 px-4 bg-p-5 hover:bg-primary transition text-white rounded-2xl">
            اطلاعات کاربری
          </h2>
          <h2
            onClick={logout}
            className=" cursor-pointer w-1/3 max-md:w-full py-2 px-4 bg-p-5 hover:bg-primary transition text-white rounded-2xl"
          >
            خروج
          </h2>
        </div>
      </Modal>

      {/* Notif */}
      <Modal isOpen={showNotif} close={setShowNotif} title={"اعلان ها"}>
        <div className=" w-full p-5">
          <table className=" w-full text-right p-5">
            <thead className="">
              <tr className=" w-full">
                <th className=" w-1/3">فرستنده</th>
                <th className=" w-2/3">پیغام</th>
              </tr>
            </thead>
          </table>
            <hr className="w-full my-2 border border-dashed border-g-2" />
          <table className=" w-full text-right p-5">
            <tbody>
              {unreadNotifRes && unreadNotifRes.map((notif, index) => (
                <tr key={index} className=" text-s-6">
                  <th className=" w-1/3 py-2">{notif.data.sender}</th>
                  <th className=" w-2/3 py-2">{notif.data.message}</th>
                </tr>
              ))}
            </tbody>
          </table>
          {
            unreadNotifRes?.length === 0 && <p className=" text-g-5 text-center py-4">اعلان جدیدی وجود ندارد</p>
          }
        </div>
      </Modal>
    </>
  );
}
