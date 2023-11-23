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

export function Sidebar({ userRule }) {
  const userSidebar = [
    {
      title: "خدمات",
      links: ["/panel/experts"],
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
        "/user/warranty",
        "/user/credit-limit",
        "/user/facilities",
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
      links: ["/user/profile"],
      icon: UserIcon,
    },
  ];
  return (
    <section className=" flex flex-col items-center bg-white rounded-3xl w-full h-[95vh] sc overflow-y-auto ">
      <img className=" m-4" src={LogoIcon} alt="Logo" />
      <img src={Line} alt="" />
      <Link
        to={`/${userRule}/dashboard`}
        className=" my-8 font-bold text-[#0D294E]"
      >
        داشبورد
      </Link>
      <nav className=" w-full px-4">
        <ul className=" text-[#0D294E] mb-2">
          {userSidebar.map((item, index) => {
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
