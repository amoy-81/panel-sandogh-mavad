import React, { useState , useEffect } from "react";
import queryString from "query-string";
import { toast } from "react-toastify";
import { Axios } from "../../../../core/http-service";
import Loader from "../../../../components/loader/Loader";
import DeleteUser from "../../../../components/copy/modal/DeleteUser";
import ActionButton from "../../../../components/copy/ActionButton/ActionButton";
import UserLine from "../../../../components/copy/User/UserLine";


export default function ViewUsers() {
  const [isPerson, setIsPerson] = useState(true);
  const [allGenuineUser, setAllGenuineUser] = useState(null);
  const [allLegalUser, setAllLegalUser] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(null);
  const [showMore, setShowMore] = useState(null);

  useEffect(() => {
    getUserGenuine();
    getUserLegal();
  }, [showDelete]);

  const getUserGenuine = () => {
    Axios.get("/admin/get_genuine")
      .then(async (res) => {
        // console.log(res.data)
        setAllGenuineUser(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const getUserLegal = () => {
    Axios.get("/admin/get_legal")
      .then(async (res) => {
        // console.log(res.data);
        setAllLegalUser(res.data);
        // setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const downloadHandler = () => {
    const params = {
      type: isPerson ? "genuine" : "legal",
    };
    const queryString2 = queryString.stringify(params);
    const url = `${import.meta.env.VITE_IMAGES_URL}/api/usersExcel`;
    const link = document.createElement("a");
    link.href = url;
    link.download = "users.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast("بارگیری به زودی شروع می شود");
  };

  if (IsLoading) return <Loader />;

  return (
    <div>
      <div className="flex justify-between py-6">
        <p className="text-xl font-extrabold">مشاهده کاربران</p>
        <div className="flex bg-white rounded-xl">
          <button
            className={`${
              !isPerson && " bg-secondary text-white "
            } p-3 ml-4 rounded-xl`}
            onClick={() => {
              setIsPerson(false);
            }}
          >
            حقوقی
          </button>
          <button
            className={`${
              isPerson && " bg-secondary text-white "
            } rounded-xl p-3 `}
            onClick={() => {
              setIsPerson(true);
            }}
          >
            حقیقی
          </button>
        </div>
      </div>
      {showDelete !== null && (
        <DeleteUser
          setShowMore={setShowMore}
          close={setShowDelete}
          userDataaa={showDelete}
        />
      )}
      <div className="max-h-[60vh] overflow-y-scroll">
        {isPerson ? (
          <table className="w-full text-center ">
            <tr className=" sticky top-0   ">
              <th className="bg-white p-3 rounded-r-xl ">نمایه </th>
              <th className="bg-white p-3 ">نام </th>
              <th className="bg-white p-3 ">نام خانوادگی</th>
              <th className="bg-white p-3 ">تاریخ ثبت نام کاربر </th>
              <th className="bg-white p-3 rounded-l-xl">اعمال </th>
            </tr>
            {allGenuineUser &&
              allGenuineUser.map((GenuineUser) => {
                return (
                  <>
                    {showMore && (
                      <ActionButton
                        close={setShowMore}
                        GenuineUser={showMore}
                        setShowDelete={setShowDelete}
                      />
                    )}
                    <UserLine
                      GenuineUser={GenuineUser}
                      setShowMore={setShowMore}
                    />
                  </>
                );
              })}
          </table>
        ) : (
          <table className="w-full ">
            <tr className=" sticky top-0   ">
              <th className="bg-white p-3 rounded-r-xl ">نام شرکت </th>
              <th className="bg-white p-3 ">نام ونام خانوادگی نماینده </th>
              <th className="bg-white p-3 ">شناسه مالی شرکت</th>
              <th className="bg-white p-3 ">تاریخ ثبت نام کاربر </th>
              <th className="bg-white p-3 rounded-l-xl">اعمال </th>
            </tr>
            {allLegalUser &&
              allLegalUser.map((LegalUser) => {
                return (
                  <>
                    {showMore && (
                      <ActionButton
                        close={setShowMore}
                        GenuineUser={showMore}
                        setShowDelete={setShowDelete}
                      />
                    )}
                    <UserLine
                      GenuineUser={LegalUser}
                      setShowMore={setShowMore}
                    />
                  </>
                );
              })}
          </table>
        )}
      </div>
      <hr />
      <button
        className="rounded-lg bg-green-700 mt-2 text-white p-3 font-bold text-xs "
        onClick={downloadHandler}
      >
        خروجی اکسل
      </button>
    </div>
  );
}
