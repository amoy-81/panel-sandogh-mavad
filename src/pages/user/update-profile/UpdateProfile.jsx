import React, { useState } from 'react'
import {RiPencilFill} from 'react-icons/ri'
import { inputTitle } from '../../../helper/inputTitles'
import UIInputDate from '../../../components/Input/UIInputDate'
import UISelectInput from '../../../components/Input/UISelectInput'
import UIInputNumber from '../../../components/Input/UIInputNumber'
import UIInput from '../../../components/Input/UIInput'

function UpdateProfile() {
    const [sendDatas , setSendDatas] = useState({
        father_name:"",
        number_certificate:"",
        birth_day:"",
        study : "",
        place_issue:"",
        series_certificate:"",
        nationality:"",
        gender:"female",
        marital:"single",
        residential:"resident",
        education:"",
        job:"",
        address:"",
        postal_code:"",
        phone:"",
        namabar:"",
        work_address:"",
        work_postal_code:"",
        work_phone:"",
        work_home:"",
        home_number : "",
        work_namabar:"",
        image : null
    })

    const sendHandler = () => {

    }

  return (
    <div className="bg-white rounded-2xl mt-6 p-6">
      <div className=" p-6">
        <p className="text-xl font-extrabold">اطلاعات کاربر حقیقی </p>
      </div>
      <hr />
      {/* <div className="flex mt-6 items-center">
        {profilePic !== null ? <img src={profilePic} alt="" style={{borderRadius : "50%"}} className=" w-16 h-16" /> : <img src={user} alt="" className="w-16" />}
        <div className=" pr-4">
        <p className="font-bold">{`${userDatas.user.name} ${userDatas.user.family}`}</p>
          <label htmlFor="aks" className="text-yellow-500 text-xs">تغییر عکس پروفایل</label>
          <input onChange={imageHandler} style={{display:"none"}} id="aks" type="file"  />
        </div>
      </div> */}
      <div className="w-2/3 flex flex-wrap">
        {
            Object.keys(sendDatas).map((item , index) => {
                if (item === "birth_day") {
                    return(
                        <div key={index} className="relative mt-3 ml-2 w-80 border rounded-2xl p-2 overflow-hidden  h-17 ">
                            <p className="font-bold text-xs">{inputTitle(item)}</p>
                                <UIInputDate value={sendDatas[item]} setSendDatas={setSendDatas} name={item} ph={inputTitle(item)} />
                            <div className="absolute top-7 left-5">
                                <RiPencilFill />
                            </div>
                        </div>
                    )
                } if (["gender" , "marital" , "residential"].includes(item)) {
                    return(
                        <div key={index} className="relative mt-3 ml-2 w-80 border rounded-2xl p-2 overflow-hidden  h-17 ">
                            <p className="font-bold text-xs">{inputTitle(item)}</p>
                                <UISelectInput value={sendDatas[item]} setSendDatas={setSendDatas} name={item} ph={inputTitle(item)} />
                            <div className="absolute top-7 left-5">
                                <RiPencilFill />
                            </div>
                        </div>
                    )
                } else if (["number_certificate" , "series_certificate" , "postal_code" , "phone" , "work_phone" , "work_postal_code" , "work_namabar"].includes(item)) {
                    return(
                        <div key={index} className="relative mt-3 ml-2 w-80 border rounded-2xl p-2 overflow-hidden  h-17 ">
                            <p className="font-bold text-xs">{inputTitle(item)}</p>
                                <UIInputNumber value={sendDatas[item]} setSendDatas={setSendDatas} name={item} ph={inputTitle(item)} />
                            <div className="absolute top-7 left-5">
                                <RiPencilFill />
                            </div>
                        </div>
                    )
                } else if (item !== "image") {
                    return(
                        <div key={index} className="relative mt-3 ml-2 w-80 border rounded-2xl p-2 overflow-hidden  h-17 ">
                            <p className="font-bold text-xs">{inputTitle(item)}</p>
                                <UIInput value={sendDatas[item]} setSendDatas={setSendDatas} name={item} ph={inputTitle(item)} />
                            <div className="absolute top-7 left-5">
                                <RiPencilFill />
                            </div>
                        </div>
                    )
                }
            })
        }
      </div>
        <div className="py-3 ">
          <button onClick={sendHandler} className=" p-3 px-10 border bg-secondary text-white rounded-xl mr-3">
            ذخیره
          </button>
        </div>
    </div>
  )
}

export default UpdateProfile