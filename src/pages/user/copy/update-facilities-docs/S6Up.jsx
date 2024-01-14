import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../../../components/loader/Loader";
import S6boxR from "./components/S6boxR";
import S6boxL from "./components/S6boxL";
import axios from "axios";
import { toast } from "react-toastify";

const S6Up = ({reqData , reqId , close}) => {
  const navigate = useNavigate()
  const [up , setUp] = useState(0)
  const [isLoading , setIsLoading] = useState(false)
  const [errore , setErrore] = useState(false)
  console.log(reqData);
  const [document, setDocment] = useState({
    // request_id: 6,
    facilities_id : reqId
  })
  const sendHandler = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const token = localStorage.getItem('token');
    const isLoggedIn = token ? true : false;

    axios.post(`/v1/fileFacilities/${reqId}`, document ,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(isLoggedIn && {
              Authorization: `Bearer ${JSON.parse(token)}`
          }),
          "X-HTTP-Method-Override": "PUT",
        }
      })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false)
        close(null)
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err.data);
        toast("عملیات با خطا مواجه شد")
      })

  }
  return (
    <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex items-center justify-center">
      <form className="bg-white z-10 max-h-[80vh] overflow-y-auto w-[85%] rounded-3xl mt-3 p-3">
        {isLoading && <Loader />}
        <div className="flex justify-between items-center">
          <p className=" font-bold p-4 py-6">مشاهده و تغییر مدارک</p>
          <p onClick={() => close(null)} className="cursor-pointer hover:bg-blue-700 transition-all hover:text-white p-2 rounded-lg">بازگشت</p>
        </div>
        <hr className="border-dashed" />
        
        <div className="px-5">
          <div className="flex mt-2 items-center">
            <button onClick={sendHandler} className="w-1/5 h-1/2  rounded-lg bg-blue-700  text-white p-3 font-bold text-xs">
              ذخیره{" "}
            </button>
          </div>
          <div className="flex">
            <div className="w-1/2 px-2">
              {reqData && Object.keys(reqData).map((item , index) => {
                  if (item === "part7") {
                    return(
                      <S6boxR
                        key={index}
                        path1={reqData[item].path1}
                        path2={reqData[item].path2}
                        path3={reqData[item].path3}
                        fn1={reqData[item].file_name1}
                        fn2={reqData[item].file_name2}
                        fn3={reqData[item].file_name3}
                        document={document} setDocment={setDocment}
                      />
                    )
                  }
                })
              }
            </div>
            <div className="w-1/2 px-2">
              {
                reqData && <S6boxL document={document} setDocment={setDocment}  reqData={reqData} />
              }
            </div>
          </div>
      </div>
      </form>
    </div>
  );
};

export default S6Up;
