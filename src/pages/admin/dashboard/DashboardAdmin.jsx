import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../auth/useAuth";
import User from "../../../components/copy/User/User";
import { onlyDateConversion } from "../../../helper/dateConversion";
import Ellipse2 from "../../../assets/imges/Ellipse 2.png";
import Ellipse1 from "../../../assets/imges/Ellipse 1.png";
import Ellipse4 from "../../../assets/imges/Ellipse 4.png";
import Ellipse3 from "../../../assets/imges/Ellipse 3.png";
import Ellipse6 from "../../../assets/imges/Ellipse 6.png";
import Ellipse5 from "../../../assets/imges/Ellipse 5.png";
import Vectora from "../../../assets/imges/ViewRequests/Vectora.png";
import Vectorx from "../../../assets/imges/ViewRequests/Vectorx.png";
import Counter from "../../../components/copy/Counter/Counter";
import Loader from "../../../components/loader/Loader";
import useRequests from "../../../hooks/useRequests";

const DashboardAdmin = () => {
  const { userData } = useAuth();

  const {
    response: allExpert,
    error: allExpertErr,
    loading: allExpertLoading,
    getRequest: getAllExpert,
  } = useRequests({ url: `/admin/count_experts` });

  const {
    response: allRequest,
    error: allRequestErr,
    loading: allRequestLoading,
    getRequest: getAllRequest,
  } = useRequests({ url: `/admin/count_requests` });

  const {
    response: allUser,
    error: allUserErr,
    loading: allUserLoading,
    getRequest: getAllUser,
  } = useRequests({ url: `/admin/count_users` });

  const {
    response: Expert,
    error: ExpertErr,
    loading: ExpertLoading,
    getRequest: getExpert,
  } = useRequests({ url: `/admin/expert` });

  useEffect(() => {
    getAllUser();
    getAllExpert();
    getAllRequest();
    getExpert();
  }, []);

  return (
    <>
      <div className="p-6 flex flex-col gap-6">
        <h2 className="text-2xl font-bold">دسترسی سریع</h2>
        <div className="flex gap-6 text-white">
          <div className="w-1/3 h-24 flex justify-between items-center rounded-2xl  bg-secondary relative overflow-hidden pr-11">
            <Link to="/admin/requests">مشاهده درخواست ها</Link>
            <div>
              <img
                className="absolute left-0 inset-y-0"
                src={Ellipse2}
                alt=""
              />
              <img
                className="absolute left-0 inset-y-0"
                src={Ellipse1}
                alt=""
              />
            </div>
          </div>
          <div className="w-1/3 h-24 flex justify-between items-center rounded-2xl  bg-secondary relative overflow-hidden pr-11">
            <Link to="/panel/viewExpert">مشاهده کارشناسان</Link>
            <div>
              <img
                className="absolute left-1 inset-y-0"
                src={Ellipse4}
                alt=""
              />
              <img
                className="absolute left-0 inset-y-0"
                src={Ellipse3}
                alt=""
              />
            </div>
          </div>
          <div className="w-1/3 h-24 flex justify-between items-center rounded-2xl  bg-secondary relative overflow-hidden pr-11">
            <Link to="/panel/viewUsers">مشاهده کاربران</Link>
            <div>
              <img
                className="absolute left-1 inset-y-0"
                src={Ellipse6}
                alt=""
              />
              <img
                className="absolute left-0 inset-y-0"
                src={Ellipse5}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-6 px-6">
        <div className="  relative shadow-c rounded-2xl w-1/2 bg-white p-3.5 flex flex-col gap-7 z-10">
          <div className="p-2 flex justify-between items-center">
            <div className="text-lg font-bold">وضعیت کارشناسان</div>
            <img className="w-c-4 h-c-4" src={Vectorx} alt="" />
          </div>
          {Expert ? (
            Expert.map((i) => {
              return (
                <User
                  avatar={
                    i.profilegenuine && i.profilegenuine.image !== null
                      ? `${import.meta.env.VITE_IMAGES_URL}/${
                          i.profilegenuine.image
                        }`
                      : "22"
                  }
                  date={onlyDateConversion(i.profilegenuine?.created_at)}
                  name={`${i.name} ${i.family}`}
                />
              );
            })
          ) : (
            <Loader />
          )}
        </div>
        <div className="w-1/2 flex flex-col gap-6">
          <Counter
            logo={Vectora}
            number={allRequest ? allRequest : ""}
            title="تعداد درخواست"
          />
          <Counter
            logo={Vectora}
            number={allExpert ? allExpert : ""}
            title="تعداد کارشناس"
          />
          <Counter
            logo={Vectora}
            number={allUser ? allUser : ""}
            title="تعداد کاربر"
          />
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
