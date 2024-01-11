import React, { useEffect, useState } from "react";
import { RiPencilLine } from "react-icons/ri";
import user from "../../../../assets/imges/user.png";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../components/loader/Loader";
import useAuth from "../../../../auth/useAuth";
import { Axios } from "../../../../core/http-service";

export default function AdminProfile() {
  const [details, setDetails] = useState();
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Axios.get(`/v1/profile_genuine`)
      .then((res) => {
        console.log(res.data);
        const newA = res.data;
        newA.map((item) => {
          if (item.user.id === userData.id) {
            setDetails(item);
            console.log(item);
          }
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) return <Loader />;
  return (
    <div className="bg-white rounded-2xl mt-6 p-6">
      <div className="flex items-center justify-between p-6">
        <p className="text-xl font-extrabold">اطلاعات کاربری</p>
        <p
          onClick={() => navigate(-1)}
          className="cursor-pointer hover:bg-blue-700 transition-all hover:text-white p-2 rounded-lg"
        >
          بازگشت
        </p>
      </div>
      <hr />
      <div className="">
        <div className="w-1/2 mx-auto">
          <div className="flex mt-6 items-center">
            {details && details.image && (
              <img
                style={{ borderRadius: "50%" }}
                src={`${import.meta.env.VITE_IMAGES_URL}/${details.image}`}
                alt="عکس پروفایل"
                className="w-16 h-16"
              />
            )}
            {(!details || !details.image) && (
              <img src={user} alt="" className="w-16 h-16 " />
            )}

            <div className=" pr-4">
              <p className="font-bold">عکس پروفایل</p>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex">
              <p className="font-bold text-sm">نام نام خانوادگی</p>
              <RiPencilLine className="mr-3" />
            </div>
            <p className="border-0  rounded-xl p-2 bg-purple-50 outline-none mt-2 w-full">{`${userData.name} ${userData.family}`}</p>
          </div>
          <div className="mt-6">
            <div className="flex">
              <p className="font-bold text-sm">شماره تلفن</p>
              <RiPencilLine className="mr-3" />
            </div>
            <p className="border-0  rounded-xl p-2 bg-purple-50 outline-none mt-2 w-full">
              {userData.phone}
            </p>
          </div>
          <div className="mt-6">
            <div className="flex">
              <p className="font-bold text-sm">ایمیل</p>
              <RiPencilLine className="mr-3" />
            </div>
            <p className="border-0  rounded-xl p-2 bg-purple-50 outline-none mt-2 w-full">
              {userData.email}
            </p>
          </div>
          <div className="mt-6">
            <div className="flex">
              <p className="font-bold text-sm">کد ملی</p>
              <RiPencilLine className="mr-3" />
            </div>
            <p className="border-0  rounded-xl p-2 bg-purple-50 outline-none mt-2 w-full">
              {userData.national_code}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
