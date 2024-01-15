import React, { useEffect, useState } from "react";
import { onlyDateConversion } from "../../../../helper/dateConversion";
import VectorAZ from "../../../../assets/imges/ViewRequests/VectorAZ.png";
import x from "../../../../assets/imges/ViewRequests/x.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Axios } from "../../../../core/http-service";
import Loader from "../../../../components/loader/Loader";
import DeleteReqAdmin from "../../../../components/copy/modal/DeleteReqAdmin";

import ExpertList from "../../../../components/copy/modal/ExpertList";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const [showExpertList, setShowExpertList] = useState(null);
  const [showDeleteReq, setShowDeleteReq] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [updatePage, setUpdatePage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("ALL");

  const [ExFilter, setExFilter] = useState("warrantyExcel");

  useEffect(() => {
    setIsLoading(true);
    Axios.get("/admin/view_all_request").then(async (res) => {
      const newData = res.data.reverse();
      setRequests(newData);
      
      setIsLoading(false);
    });
  }, [updatePage]);

  const detailsHandler = (ev) => {
    if (showDetails === null) {
      setShowDetails(ev);
    } else {
      setShowDetails(null);
    }
  };

  const downloadHandler = () => {
    let url = "";
    if (ExFilter === "warrantyExcel") {
      url = `${import.meta.env.VITE_IMAGES_URL}/api/warrantyExcel`;
    } else if (ExFilter === "facilityExcel") {
      url = `${import.meta.env.VITE_IMAGES_URL}/api/facilityExcel`;
    }

    Axios.get(url)
      .then((res) => {
        console.log(res);
        toast("بارگیری به زودی شروع می شود");
      })
      .catch((err) => toast("بارگیری به زودی شروع می شود"));

    // const link = document.createElement('a');
    // link.href = url;
    // link.download = 'users.xlsx';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };
  const reqsList =
    requests &&
    requests.filter((item) => {
      if (item.shenaseh) {
        return item.shenaseh.toString().includes(searchText);
      }
    });
  const newReqsList =
    filterType === "ALL"
      ? reqsList
      : filterType === "FINISHED"
      ? reqsList.filter((i) => i.is_finished === 1)
      : filterType === "NOT_FINISHED"
      ? reqsList.filter((i) => i.is_finished === 0)
      : "";

  if (isLoading) return <Loader />;
  return (
    <>
      <div className="pr-6 py-6 pb-2 flex justify-between items-center w-c-13">
        <h2 className="text-2xl font-bold">مشاهده درخواست‌ها</h2>
        <div className="flex gap-6">
          <select
            className="mr-10 rounded-lg border-gray-300 text-xs"
            onClick={(e) => setFilterType(e.target.value)}
          >
            <option value="ALL">همه</option>
            <option value="FINISHED">کامل شده</option>
            <option value="NOT_FINISHED">کامل نشده</option>
          </select>
          <input
            type="text"
            name="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="جست و جو شناسه ..."
            className="border border-gray-300 p-2 rounded-xl"
          />
        </div>
      </div>
      <p className="p-2 pr-7">تعداد کل درخواست ها : {newReqsList.length}</p>
      {showExpertList !== null ? (
        <ExpertList
          setUpdatePage={setUpdatePage}
          close={setShowExpertList}
          reqId={showExpertList.id}
          type={showExpertList.type}
        />
      ) : (
        ""
      )}
      <ul className="w-c-14 flex flex-col gap-c-14 whitespace-nowrap border-b border-c-11 relative max-h-[60vh] overflow-y-scroll">
        <li className="text-sm flex gap-3.5 rounded-2xl bg-c-2 py-3.5">
          <p className="w-1/6 text-center">شناسه</p>
          <p className="w-1/6 text-center">متقاضی</p>
          <p className="w-1/6 text-center pr-8">نوع درخواست</p>
          <p className="w-1/6 text-center pr-8">تاریخ ثبت درخواست</p>
          <p className="w-1/6 text-center pr-5">تاریخ اختصاص به کارشناس</p>

          <p className="w-1/6 text-center pr-8">اعمال</p>
        </li>
        {newReqsList &&
          newReqsList.map((item) => {
            if (item.id === showDetails) {
              return (
                <li
                  key={item.id}
                  className="flex justify-between gap-3.5 p-3.5 bg-white rounded-xl text-c-3 font-bold text-xs"
                >
                  <div className="flex flex-col gap-7">
                    <div>
                      شناسه درخواست: <a href="">{item.shenaseh}</a>
                    </div>
                    <div>
                      نوع درخواست:{" "}
                      <a href="">
                        {item.type === "facilities" ? "تسهیلات" : item.type === "bond" ? 'حد اعتباری' : "ضمانت نامه"}
                      </a>
                    </div>
                    <div>
                      نام کارشناس:{" "}
                      <a href="">
                        {item.expert_assignment !== null
                          ? `${item.expert_assignment.expert.name} ${item.expert_assignment.expert.family}`
                          : "فاقد کارشناس"}{" "}
                      </a>
                    </div>
                    <div>
                      درخواست‌دهنده:{" "}
                      <a href="">{`${item.user.name} ${item.user.family}`}</a>
                    </div>
                  </div>
                  <div className="flex flex-col gap-7">
                    <div>
                      تاریخ ثبت درخواست:{" "}
                      <a href="">{onlyDateConversion(item.created_at)}</a>
                    </div>
                    <div>
                      تاریخ ثبت کارشناس:{" "}
                      <a href="">
                        {item.expert_assignment !== null
                          ? `${onlyDateConversion(
                              item.expert_assignment.created_at
                            )}`
                          : "فاقد کارشناس"}
                      </a>
                    </div>
                    <div>
                      شماره همراه کارشناس:{" "}
                      <a href="">
                        {item.expert_assignment !== null
                          ? `${item.expert_assignment.expert.phone}`
                          : "فاقد کارشناس"}{" "}
                      </a>
                    </div>
                    {showDeleteReq && (
                      <DeleteReqAdmin
                        setUp={setUpdatePage}
                        close={setShowDeleteReq}
                        id={item.id}
                        toast={toast}
                      />
                    )}
                    <div className="flex ">
                      <button
                        className="p-2 m-1 rounded-xl border border-c-7 text-c-9 hover:text-white hover:bg-redColor transition"
                        onClick={() =>
                          setShowExpertList({ id: item.id, type: "change" })
                        }
                      >
                        تغییر کارشناس
                      </button>
                      <button
                        href=""
                        className="p-2 m-1 rounded-xl border border-c-7 text-c-9 hover:text-white hover:bg-redColor transition"
                        onClick={() => setShowDeleteReq(true)}
                      >
                        حذف درخواست
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => detailsHandler(null)}
                    className="flex justify-center items-center gap-2 p-2 border border-c-7 rounded-xl bg-c h-c-15"
                  >
                    <div className="text-c-5">کوچک کن</div>
                    <div>
                      <img
                        className="w-1.5 h-c-12 rotate-180"
                        src={VectorAZ}
                        alt=""
                      />
                    </div>
                  </button>
                </li>
              );
            } else {
              return (
                <li
                  key={item.id}
                  className="flex items-center gap-3.5 py-3.5 text-c-10 text-xs"
                >
                  <Link
                    title="برای دیدن جزئیات کلیک کنید"
                    to={`/admin/admin-check-request/${item.id}`}
                    className="w-1/6 text-center"
                    href=""
                  >
                    {item.shenaseh}
                  </Link>
                  <Link
                    title="برای دیدن جزئیات کلیک کنید"
                    to={`/admin/admin-check-request/${item.id}`}
                    className="w-1/6 text-center"
                    href=""
                  >
                    {item.facilities.length > 0
                      ? item.facilities[0].title
                      : item.warranty.length > 0
                      ? item.warranty[0].title
                      : ""}
                  </Link>
                  <Link
                    title="برای دیدن جزئیات کلیک کنید"
                    to={`/admin/admin-check-request/${item.id}`}
                    className="w-1/6 text-center"
                    href=""
                  >
                    {item.type === "facilities" ? "تسهیلات" : item.type === "bond" ? 'حد اعتباری' : "ضمانت نامه"}
                  </Link>
                  <p className="w-1/6 text-center" href="">
                    {onlyDateConversion(item.created_at)}
                  </p>
                  {/* اینجا باید تاریخ اختصاص درخواست به کارشناس باشه */}
                  <p className="w-1/6 text-center text-sm text-c-3" href="">
                    {item.expert_assignment !== null
                      ? `${onlyDateConversion(
                          item.expert_assignment.created_at
                        )}`
                      : "فاقد کارشناس"}
                  </p>
                  {item.expert_assignment !== null ? (
                    <button
                      onClick={() => detailsHandler(item.id)}
                      className=" text-center border border-c-7 rounded-xl flex gap-2 p-2"
                    >
                      <div className="flex justify-center items-center gap-2 rounded-xl ">
                        <div className="text-c-5">مدیریت</div>
                        <div>
                          <img className="w-1.5 h-c-12" src={VectorAZ} alt="" />
                        </div>
                      </div>
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setShowExpertList({ id: item.id, type: "assign" })
                      }
                      className=" text-center border border-c-9 rounded-xl flex gap-2 p-2"
                    >
                      <div className="flex justify-center items-center gap-2 rounded-xl">
                        <div className="border-c-7 text-c-9">مدیریت</div>
                        <div>
                          <img className="w-1.5 h-c-0" src={x} alt="" />
                        </div>
                      </div>
                    </button>
                  )}
                </li>
              );
            }
          })}
      </ul>
      <div className="w-1/2 flex items-center p-2">
        <button
          className="rounded-lg bg-green-700  text-white p-2 font-bold text-xs"
          onClick={downloadHandler}
        >
          خروجی اکسل
        </button>
        <div>
          <select
            className="mr-10 rounded-lg border-gray-300 text-xs"
            onClick={(e) => setExFilter(e.target.value)}
          >
            <option value="warrantyExcel">درخواست های ضمانت</option>
            <option value="facilityExcel">درخواست های تسهیلات</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Requests;
