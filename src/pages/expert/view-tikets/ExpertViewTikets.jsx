import { useEffect } from "react";
import useRequests from "../../../hooks/useRequests";
import Loader from "../../../components/loader/Loader";
import { dateConversion } from "../../../helper/dateConversion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ExpertViewTikets() {
  const authState = useSelector((state) => state.authState.userData);

  const {
    response: tiketsRes,
    error: tiketsErr,
    loading: tiketsLoading,
    getRequest: getTikets,
  } = useRequests({
    url: "/admin/ticket_expert",
  });

  useEffect(() => {
    getTikets();
  }, []);

  return (
    <div className=" relative">
      {tiketsLoading && <Loader />}
      <div className=" py-6">
        <p className="text-xl text-titlesColor font-extrabold">
          مشاهده تیکت ها
        </p>
      </div>
      <div className="max-h-[60vh] overflow-y-scroll sc">
        <table className="w-full ">
          <thead>
            <tr className=" sticky top-0 text-titlesColor  ">
              <th className="bg-white p-3 rounded-r-xl ">شناسه </th>
              <th className="bg-white p-3 ">عنوان تیکت </th>
              <th className="bg-white p-3 ">وضعیت</th>
              <th className="bg-white p-3 ">بازشده در تاریخ </th>
              <th className="bg-white p-3 rounded-l-xl">اعمال </th>
            </tr>
          </thead>
          <tbody>
            {tiketsRes &&
              tiketsRes.map((item) => {
                return (
                  <tr key={item.id} id={item.id} className=" text-center">
                    <td className="p-4 text-xs text-gray-400 font-bold">
                      {item.id}
                    </td>
                    <td className="p-4 text-xs text-gray-400 font-bold">
                      {item.title}
                    </td>
                    <td className="p-4 text-xs text-gray-400 font-bold">
                      <button
                        className={
                          item.status === "open"
                            ? "text-green-600 border border-green-600 rounded-xl p-2 px-3"
                            : item.status === "waiting"
                            ? "text-yellow-400 border border-yellow-400 rounded-xl p-2 px-3"
                            : item.status === "closed"
                            ? "text-red-400 border border-green-400 rounded-xl p-2 px-3"
                            : item.status === "resolved"
                            ? "text-green-600 border border-green-600 rounded-xl p-2 px-3"
                            : ""
                        }
                      >
                        {item.status === "open"
                          ? "باز"
                          : item.status === "waiting"
                          ? "در انتظار پاسخ"
                          : item.status === "closed"
                          ? "بسته"
                          : item.status === "resolved"
                          ? "پاسخ داده شد"
                          : ""}
                      </button>
                    </td>
                    <td className="p-4 text-xs text-gray-400 font-bold">
                      {dateConversion(item.updated_at)}
                    </td>
                    <td className="p-4 text-xs text-gray-400 flex justify-center items-center font-bold">
                      <Link
                        to={`/${
                          authState.type === "genuine" ||
                          authState.type === "legal"
                            ? "user"
                            : authState.type
                        }/support/${item.id}`}
                        className=" text-secondary border border-secondary rounded-xl p-2 px-3"
                      >
                        مشاهده
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <hr />
      <div className="flex justify-between py-4 text-gray-600 items-center">
        <div className="">نمایش 1-100 از 0 مورد</div>
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
          <button className=" text-secondary p-2 font-bold text-sm">
            <span className="text-3xl">+</span> اضافه کردن
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpertViewTikets;
