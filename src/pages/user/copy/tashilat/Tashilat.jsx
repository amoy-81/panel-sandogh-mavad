import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../../core/http-service";
import Loader from "../../../../components/loader/Loader";
import useAuth from "../../../../auth/useAuth";

export default function Tashilat() {
  let { pathname: pass } = useLocation();
  const [stepLevel, setStepLevel] = useState(pass.split("/")[3]);

  const { userData } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setStepLevel(pass.split("/")[3]);
    if (pass === "/user/tashilat" || pass === "/user/tashilat/") {
      navigate("/user/tashilat/1");
    }
  }, [pass]);
  useEffect(() => {
    Axios.get("/v1/is_profile_genuine")
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        if (!res.data && userData.type === "genuine") {
          navigate(`/user/record_genuine_profile`);
        }
      })
      .catch((err) => {
        console.log(err);
        // navigate(`/user/404`);
      });
    Axios.get("/v1/is_profile_legal")
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        if (!res.data && userData.type === "legal") {
          navigate(`/user/record_legal_profile`);
        }
      })
      .catch((err) => {
        console.log(err);
        // navigate(`/user/404`);
      });
  }, []);
  if (isLoading) return <Loader />;
  return (
    <div className="px-5">
      <div className=" py-6">
        <p className="text-xl font-extrabold">بارگیری و بارگذاری مدارک </p>
        <p className="text-red-400	"> کاربر گرامی، شما موظف به تکمیل تمامی صفحات برای نهایی کردن درخواست خود می باشید، در غیر این صورت درخواست شما بررسی نخواهد شد. </p>

        {/* <p className=" text-yellow-400">
          کاربر عزیز، شما موظف به تکمیل تمامی صفحات برای نهایی کردن درخواست خود
          می باشید، در غیر این صورت درخواست شما بررسی نخواهد شد.
        </p> */}
      </div>
      <div className=" flex  items-center w-full justify-center">
        <div className="flex items-center">
          <p className="bg-blue-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 ">
            1
          </p>
        </div>
        <div className="w-10 px-2">
          <div
            className={
              stepLevel > 1 || stepLevel === "confirm"
                ? "border-t border-2 border-blue-800 h-full rounded"
                : "border-t border-2 border-slate-300 h-full rounded"
            }
          ></div>
        </div>
        <div className="flex items-center">
          <p
            className={
              stepLevel >= 2 || stepLevel === "confirm"
                ? "bg-blue-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 "
                : "bg-slate-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 "
            }
          >
            2
          </p>
        </div>
        <div className="w-10 px-2">
          <div
            className={
              stepLevel > 2 || stepLevel === "confirm"
                ? "border-t border-2 border-blue-800 h-full rounded"
                : "border-t border-2 border-slate-300 h-full rounded"
            }
          ></div>
        </div>
        <div className="flex items-center">
          <p
            className={
              stepLevel >= 3 || stepLevel === "confirm"
                ? "bg-blue-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 "
                : "bg-slate-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 "
            }
          >
            3
          </p>
        </div>
        <div className="w-10 px-2">
          <div
            className={
              stepLevel > 3 || stepLevel === "confirm"
                ? "border-t border-2 border-blue-800 h-full rounded"
                : "border-t border-2 border-slate-300 h-full rounded"
            }
          ></div>
        </div>
        <div className="flex items-center">
          <p
            className={
              stepLevel >= 4 || stepLevel === "confirm"
                ? "bg-blue-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 "
                : "bg-slate-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 "
            }
          >
            4
          </p>
        </div>
        <div className="w-10 px-2">
          <div
            className={
              stepLevel > 4 || stepLevel === "confirm"
                ? "border-t border-2 border-blue-800 h-full rounded"
                : "border-t border-2 border-slate-300 h-full rounded"
            }
          ></div>
        </div>
        <div className="flex items-center">
          <p
            className={
              stepLevel >= 5 || stepLevel === "confirm"
                ? "bg-blue-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 "
                : "bg-slate-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 "
            }
          >
            5
          </p>
        </div>
        <div className="w-10 px-2">
          <div
            className={
              stepLevel > 5 || stepLevel === "confirm"
                ? "border-t border-2 border-blue-800 h-full rounded"
                : "border-t border-2 border-slate-300 h-full rounded"
            }
          ></div>
        </div>
        <div className="flex items-center">
          <p
            className={
              stepLevel >= 6 || stepLevel === "confirm"
                ? "bg-blue-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 "
                : "bg-slate-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 "
            }
          >
            6
          </p>
        </div>
        <div className="w-10 px-2">
          <div
            className={
              stepLevel === "confirm"
                ? "border-t border-2 border-blue-800 h-full rounded"
                : "border-t border-2 border-slate-300 h-full rounded"
            }
          ></div>
        </div>
        <div className="flex items-center">
          <p
            className={
              stepLevel === "confirm"
                ? "bg-blue-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 "
                : "bg-slate-200 p-0.5 pt-1 px-3 rounded-xl text-blue-800 "
            }
          >
            تایید
          </p>
        </div>

      </div>

      <Outlet />
    </div>
  );
}
