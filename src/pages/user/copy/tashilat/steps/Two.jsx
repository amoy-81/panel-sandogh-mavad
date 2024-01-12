import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TashilatContext } from "../../../../../contexts/Tashilat.Provider";
import S2Residences from "../../../../../components/copy/requestSteps/S2Residences";
import S2Manpowers from "../../../../../components/copy/requestSteps/S2Manpowers";
import S2Educational from "../../../../../components/copy/requestSteps/S2Educational";
import S2Shareholders from "../../../../../components/copy/requestSteps/S2Shareholders";
import queryString from "query-string";
import { Axios } from "../../../../../core/http-service";
import Loader from "../../../../../components/loader/Loader";
import S2Boards from "../../../../../components/copy/requestSteps/S2Boards";

export default function Two() {  
  // url
  const navigate = useNavigate()
  const location = useLocation();
  const values = queryString.parse(location.search);

  // context
  const {stepTwo, setStepTwo} = useContext(TashilatContext)
  // is loading
  const [isLoading, setIsLoading] = useState(false)
  const [showAllErr , setShowAllErr] = useState(false)
  const [sendAccept , setSendAccept] = useState({
    shareholders : [{name : ""}] ,
    boards : [{name : ""}] ,
    residences : [{name : ""}] ,
    manpowers : [{name : ""}] ,
    educational : [{name : ""}] ,
  })

  const [ok , setOk] = useState(false)

  const dateYear = new Date().getFullYear()
  const dateMouth = new Date().getMonth()
  const dateDay = new Date().getDate()

  useEffect(() => {
    setStepTwo((prev) => {
      return ({
        ...prev,
        facilities_id : parseInt(values.last_id),
        date : `${dateYear}-${dateMouth > 0 ? dateMouth : 1}-${dateDay}`
      })
    })
  } , [showAllErr])

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
  
  const sendHandler = () => {
    setIsLoading(true)
    if (Object.keys(sendAccept) )
    Axios.post("/v1/shareholder", stepTwo)
        .then((res) => {
          console.log(res.data)
          navigate(`/user/tashilat/3?last_id=${parseInt(values.last_id)}`)
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setIsLoading(false)
        })
  }
  if (isLoading) return <Loader />
  return (
    <>
      <S2Shareholders showAllErr={showAllErr} setSendAccept={setSendAccept} />
      {/* ای پی آی نداشت باید اضافه شه */}
      {/* <S2TarkibHeyatmodire /> */}
      <S2Residences showAllErr={showAllErr} setSendAccept={setSendAccept} />
      <S2Manpowers showAllErr={showAllErr} setSendAccept={setSendAccept} />
      <S2Boards showAllErr={showAllErr} setSendAccept={setSendAccept} />
      <S2Educational showAllErr={showAllErr} setSendAccept={setSendAccept} />

        <div className=" text-left mt-2">
          {/* {console.log(sendAccept)} */}
          {
            ok ? 
            <button onClick={sendHandler}  className="bg-blue-700  text-white rounded-xl p-4 font-bold text-sm">
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