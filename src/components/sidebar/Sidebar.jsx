import React from "react";
import LogoIcon from "@assets/svg/logo1.svg";
import Line from "@assets/svg/sidebar/Line 1.svg";
import ListItem from "./ListItem";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";

// svg
import ExpertsIcon from "@assets/svg/sidebar/expertsLogo.svg";
import ShowUsersIcon from "@assets/svg/sidebar/showUsersIcon.svg";
import RequestsIcon from "@assets/svg/sidebar/requestsIcon.svg";
import SupportIcon from "@assets/svg/sidebar/supportIcon.svg";
import UserIcon from "@assets/svg/sidebar/userIcon.svg";
import useAuth from "../../auth/useAuth";
import { useSelector } from "react-redux";

export function Sidebar({ userRule }) {
  const { userData } = useAuth();
  const { isOpen } = useSelector((state) => state.menuState);

  const adminSidebar = [
    {
      title: "خانه",
      drop: [" خانه"],
      links: ["/admin/dashboard"],
    },
    {
      title: "کارشناسان",
      drop: ["لیست کارشناسان", "اضافه کردن کارشناس"],
      links: ["/admin/view-experts", "/admin/add-expert"],
    },
    {
      title: "کاربران",
      drop: ["لیست کاربران"],
      links: ["/admin/view-users"],
    },
    {
      title: "درخواست ها",
      drop: ["لیست درخواست ها", "درخواست های رد شده", "درخواست های حذف"],
      links: [
        "/admin/requests",
        "/admin/failed-requests",
        "/admin/deleted-requests",
      ],
    },
    {
      title: "پشتیبانی",
      drop: ["مشاهده تیکت ها"],
      links: ["/admin/view-tikets"],
    },
    {
      title: "اطلاعات کاربری",
      drop: [" ویرایش اطلاعات"],
      links: ["/admin/profile"],
    },
  ];

  const expertSidebar = [
    {
      title: "خانه",
      links: ["/expert/dashboard"],
      icon: ExpertsIcon,
    },
    {
      title: "درخواست ها",
      drop: ["درخواست های جاری", "درخواست های رد شده"],
      links: ["/expert/current-requests", "/expert/failed-requests"],
      icon: SupportIcon,
    },
    {
      title: "پشتیبانی",
      drop: ["مشاهده تیکت ها", "ثبت تیکت ها"],
      links: ["/expert/dashboard", "/expert/dashboard"],
      icon: SupportIcon,
    },
    {
      title: "اطلاعات کاربری",
      drop: [" ویرایش اطلاعات"],
      links: ["/expert/dashboard"],
      icon: UserIcon,
    },
  ];

  const userSidebar = [
    {
      title: "خانه",
      links: ["/user/dashboard"],
      icon: ExpertsIcon,
    },
    {
      title: "خدمات",
      drop: [
        "درخواست ضمانتنامه",
        "درخواست حد اعتباری",
        "درخواست تسهیلات",
        "درخواست های جاری",
      ],
      links: [
        "/user/warranty-docs-upload",
        "/user/credit-limit",
        "/user/tashilat/1",
        "/user/current-requests",
      ],
      icon: SupportIcon,
    },
    {
      title: "پشتیبانی",
      drop: ["مشاهده تیکت ها", "ثبت تیکت", "اعلانات"],
      links: ["/user/view-tickets", "/user/new-tiket", "/user/notifications"],
      icon: SupportIcon,
    },
    {
      title: "راهنمای سایت",
      links: ["/user/guide"],
      icon: UserIcon,
    },
    {
      title: "اطلاعات کاربری",
      links: [
        `/user/${
          userData?.type === "genuine"
            ? "update_genuine_profile"
            : "update_legal_profile"
        }`,
      ],
      icon: UserIcon,
    },
  ];
  return (
    <section
      className={` flex flex-col items-center bg-white rounded-3xl w-full h-[95vh] sc overflow-y-auto ${
        isOpen ? ` max-lg:translate-x-0` : `max-lg:translate-x-[100%]`
      } transition max-lg:fixed max-lg:h-screen max-lg:top-0 max-lg:right-0 max-lg:w-2/3 max-lg:z-50`}
    >
      <img className=" m-4" src={LogoIcon} alt="Logo" />
      <img src={Line} alt="" />
      <Link
        to={`/${
          userData?.type === "genuine" || userData?.type === "legal"
            ? "user"
            : userData?.type
        }/dashboard`}
        className=" my-8 font-bold text-[#0D294E]"
      >
        داشبورد
      </Link>
      <nav className=" w-full px-4">
        <ul className=" text-[#0D294E] mb-2">
          {(userData?.type === "genuine" || userData?.type === "legal") &&
            userSidebar.map((item, index) => {
              if (item.links.length === 1)
                return <ListItem key={index} {...item} />;
              if (item.links.length > 1)
                return <Dropdown key={index} {...item} />;
            })}
          {userData?.type === "expert" &&
            expertSidebar.map((item, index) => {
              if (item.links.length === 1)
                return <ListItem key={index} {...item} />;
              if (item.links.length > 1)
                return <Dropdown key={index} {...item} />;
            })}
          {userData?.type === "admin" &&
            adminSidebar.map((item, index) => {
              if (item.links.length === 1)
                return <ListItem key={index} {...item} />;
              if (item.links.length > 1)
                return <Dropdown key={index} {...item} />;
            })}
        </ul>
      </nav>
    </section>
  );
}
