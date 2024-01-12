import React , { useState , useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { TashilatContext } from "../../../../../contexts/Tashilat.Provider";
import { Axios } from "../../../../../core/http-service";
import Loader from "../../../../../components/loader/Loader";
import { toast } from "react-toastify";

import S5Approvals from "../../../../../components/copy/requestSteps/S5Approvals";
import S5contracts from "../../../../../components/copy/requestSteps/S5contracts"; 
import S5pledges from "../../../../../components/copy/requestSteps/S5pledges";
import S5estates from "../../../../../components/copy/requestSteps/S5estates"; 

export default function Five() {
  const navigate = useNavigate();
  const location = useLocation();
  const values = queryString.parse(location.search);

  const {stepFive, setStepFive} = useContext(TashilatContext)

  const [isLoading, setIsLoading] = useState(false)
  const [showAllErr , setShowAllErr] = useState(false)
  const [sendAccept , setSendAccept] = useState({
    approvals : [{name : ""}] ,
    contracts : [{name : ""}] ,
    pledges : [{name : ""}] ,
    estates : [{name : ""}] ,
  })

  const [ok , setOk] = useState(false)

  useEffect(() => {
    let yesNumber = 0
    Object.keys(sendAccept).map(i => {
      sendAccept[i].map(j => {
        if (Object.keys(j).length > 0) {
          setOk(false)
          yesNumber += 1
        }
      })
    })
    if (yesNumber === 0) {
      setOk(true)
    }
  } , [sendAccept])

  useEffect(() => {
    setStepFive((prev) => {
      return ({
        ...prev,
        facilities_id : parseInt(values.last_id),
      })
    })
  } , [])

  const sendHandler = () => {
    setIsLoading(true)
    Axios.post("/v1/approvals", stepFive)
    .then((res) => {
      console.log(res.data)
      navigate(`/user/tashilat/6?last_id=${parseInt(values.last_id)}`)
      setIsLoading(false)
    })
    .catch((err) => {
      console.log(err)
      setIsLoading(false)
      toast("مشکلی در ارسال اطلاعات پیش آمده لطفا تمام فیلد هارا کامل نمایید")
    })
  }

  if (isLoading) return <Loader />
  return (
    <>
      <S5Approvals setSendAccept={setSendAccept} showAllErr={showAllErr}/>
      <S5contracts setSendAccept={setSendAccept} showAllErr={showAllErr}/>
      <S5pledges setSendAccept={setSendAccept} showAllErr={showAllErr}/>
      <S5estates setSendAccept={setSendAccept} showAllErr={showAllErr}/>
      <div className=" text-left mt-2">
        {
          ok ? 
          <button onClick={sendHandler} className=" bg-secondary  text-white rounded-xl p-4 font-bold text-sm">
            مرحله بعد
          </button> :
          <button onClick={() => setShowAllErr(true)}  className="bg-gray-500  text-white rounded-xl p-4 font-bold text-sm">
            مرحله بعد
          </button>
            
        }
        </div>
    </>
  );
}
