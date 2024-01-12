import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../../core/http-service";
import Loader from "../../../../components/loader/Loader";
import { dateConversion } from "../../../../helper/dateConversion";
import { itemTitle } from "../../../../helper/itemTitle";
import S2ViewShareholder from "../../../../components/copy/modal/ViewDocFModals/S2ViewShareholder";
import S1Places from "../../../../components/copy/modal/ViewDocFModals/S1Places";
import S2Part2View from "../../../../components/copy/modal/ViewDocFModals/S2Part2View";
import S2residenceView from "../../../../components/copy/modal/ViewDocFModals/S2residenceView";
import S2manpowerView from "../../../../components/copy/modal/ViewDocFModals/S2manpowerView";
import S2educationalView from "../../../../components/copy/modal/ViewDocFModals/S2educationalView";
import S3productView from "../../../../components/copy/modal/ViewDocFModals/S3productView";
import S4bankView from "../../../../components/copy/modal/ViewDocFModals/S4bankView";
import S4active_fView from "../../../../components/copy/modal/ViewDocFModals/S4active_fView";
import S4active_wView from "../../../../components/copy/modal/ViewDocFModals/S4active_wView";
import S4benefitView from "../../../../components/copy/modal/ViewDocFModals/S4benefitView";
import S4AssetView from "../../../../components/copy/modal/ViewDocFModals/S4AssetView";
import S5approvalsV from "../../../../components/copy/modal/ViewDocFModals/S5approvalsV";
import S5contractV from "../../../../components/copy/modal/ViewDocFModals/S5contractV";
import S5pledgeV from "../../../../components/copy/modal/ViewDocFModals/S5pledgeV";
import S5estateV from "../../../../components/copy/modal/ViewDocFModals/S5estateV";
import S1introductionV from "../../../../components/copy/modal/ViewDocFModals/S1introductionV";
import S6LeftBox from "../../../../components/copy/modal/ViewDocFModals/S6LeftBox";
import ShowFinalStep from "../../../../components/copy/modal/ViewDocFModals/ShowFinalStep";

const ViewFacilitiesDocuments = () => {
  const reqId = useParams()
  const navigate = useNavigate()
  
  const [isLoading , setIsLoading] = useState(true)
  const [errore , setErrore] = useState(false)
  const [showDoc , setShowDoc] = useState(null)

  const f_boxLItems = ["f_license" , "f_registration_doc" , "f_signatory" , "f_knowledge" , "f_resume" , "f_loans" , "f_statement" , "f_balance" , "f_catalog" , "f_insurance" , "f_proforma" , "f_bills" ,"f_balance" ]

  const [reqData , setReqData] = useState([])
  useEffect(() => {
    Axios.get(`/v1/request/${reqId.id}`)
    .then(async (res) => {
      console.log(res.data);
      setReqData(res.data)
      setIsLoading(false)
    })
    .catch((err) => {
      setErrore(true)
      navigate(`/auth/login`)
    })
  } , [])

  if (isLoading) return <Loader />
  return (
    <form className="bg-white rounded-3xl mt-3 p-3">
      <div className="flex justify-between items-center">
        <p className=" font-bold p-4 py-6">مشاهده مدارک</p>
         <p onClick={() => navigate(-1)} className="cursor-pointer h-fit hover:bg-blue-700 transition-all hover:text-white p-2 rounded-lg">بازگشت</p>
      </div>
      <hr className="border-dashed" />
      
      <div className="px-5">
        <div className="flex">
          {Boolean(reqData.facilities[0]) && <p className="text-ms font-bold p-4 py-4">عنوان درخواست : <span className="text-gray-500 font-normal mr-1">{reqData.facilities[0].title}</span></p>}
          <p className="text-ms font-bold p-4 py-4">
            نوع درخواست : 
            {Boolean(reqData.facilities[0]) && <span className="text-gray-500 font-normal mr-2">
              {/* باید عوض شه */}
              {
                reqData.facilities[0].type_f === "leasing" ? "لیزینگ" :
                reqData.facilities[0].type_f === "saturation" ? "اشباع" :
                reqData.facilities[0].type_f === "fund" ? "سرمایه در گردش" :
                reqData.facilities[0].type_f === "prototyping" ? "نمونه سازی" :
                reqData.facilities[0].type_f === "industrial" ? "تولید صنعتی" :
                reqData.facilities[0].type_f === "pre_industrial" ? "قبل از تولید صنعتی" : ""
              }
            </span>
            }
          </p>
        </div>

        { showDoc !== null &&  showDoc.select === "place" ? <S1Places data={showDoc.data} close={setShowDoc} /> : "" }
        { showDoc !== null &&  showDoc.select === "shareholder" ? <S2ViewShareholder data={showDoc.data} close={setShowDoc} /> : "" }
        { showDoc !== null &&  showDoc.select === "part2" ? <S2Part2View data={showDoc.data} close={setShowDoc} /> : "" }
        { showDoc !== null &&  showDoc.select === "residence" ? <S2residenceView data={showDoc.data} close={setShowDoc} /> : "" }
        { showDoc !== null &&  showDoc.select === "manpower" ? <S2manpowerView data={showDoc.data} close={setShowDoc} /> : "" }
        { showDoc !== null &&  showDoc.select === "educational" ? <S2educationalView data={showDoc.data} close={setShowDoc} /> : "" }
        { showDoc !== null &&  showDoc.select === "product" ? <S3productView data={showDoc.data} close={setShowDoc} /> : "" }
        { showDoc !== null &&  showDoc.select === "bank" ? <S4bankView data={showDoc.data} close={setShowDoc} /> : "" }
        { showDoc !== null &&  showDoc.select === "active_f" ? <S4active_fView data={showDoc.data} close={setShowDoc} /> : "" }
        { showDoc !== null &&  showDoc.select === "active_w" ? <S4active_wView data={showDoc.data} close={setShowDoc} /> : "" }
        { showDoc !== null &&  showDoc.select === "benefit" ? <S4benefitView data={showDoc.data} close={setShowDoc} /> : "" }
        { showDoc !== null &&  showDoc.select === "asset" ? <S4AssetView data={showDoc.data} close={setShowDoc} /> : "" }
        { showDoc !== null &&  showDoc.select === "approvals" ? <S5approvalsV  data={showDoc.data} close={setShowDoc} /> : "" }
        { showDoc !== null &&  showDoc.select === "contract" ? <S5contractV  data={showDoc.data} close={setShowDoc} /> : "" }
        { showDoc !== null &&  showDoc.select === "pledge" ? <S5pledgeV  data={showDoc.data} close={setShowDoc} /> : "" }
        { showDoc !== null &&  showDoc.select === "estate" ? <S5estateV  data={showDoc.data} close={setShowDoc} /> : "" }
        { showDoc !== null &&  showDoc.select === "introduction" ? <S1introductionV  data={showDoc.data} close={setShowDoc} /> : "" }
        { showDoc !== null &&  showDoc.select === "finish" ? <ShowFinalStep  data={showDoc.data} close={setShowDoc} /> : "" }
        { showDoc !== null &&  f_boxLItems.includes(showDoc.select) ? <S6LeftBox  object_f={showDoc} close={setShowDoc} /> : "" }
        <div className="">
          <ul role="list" className="divide-y divide-gray-100">
            {
              reqData.facilities && reqData.facilities.map((obj) => {
                // console.log(obj);
                return Object.keys(obj).map((keyss , index) => {
                  if ( ["f_license" , "f_registration_doc" , "f_signatory" , "f_knowledge" , "f_resume" , "f_loans" , "f_statement" , "f_balance" , "f_catalog" , "f_insurance" , "f_proforma" , "f_bills" ,"f_balance" , "approvals" , "asset" , "bank" , "benefit" , "contract" , "educational" , "estate" , "finish" , "introduction" , "manpower" , "part2" , "place" , "pledge" , "product" , "residence" , "shareholder" , "active_f" , "active_w"].includes(keyss) && ( (obj[keyss] && obj[keyss].length > 0) || keyss === "introduction")) {
                    if (keyss !== "introduction") {
                      if (obj[keyss]) return (
                        <li key={index} onClick={() => setShowDoc({select : keyss , data : obj[keyss]})}  className="flex justify-between gap-x-6 rounded-2xl py-5 p-2 hover:bg-gray-200">
                          <div className="flex gap-x-4">
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">{itemTitle(keyss)}</p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">تعداد اسناد : {obj[keyss].length} عدد</p>
                            </div>
                          </div>
                          <div className=" sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">بارگذاری شده در : {dateConversion(obj[keyss][0].created_at)}</p>
                            <p className="mt-1 text-xs leading-5 text-gray-500">آخرین تغییرات : {dateConversion(obj[keyss][0].updated_at)}</p>
                          </div>
                        </li>
                      )
                    } else {
                      if (obj[keyss]) return (
                        <li key={index} onClick={() => setShowDoc({select : keyss , data : obj[keyss]})}  className="flex justify-between gap-x-6 rounded-2xl py-5 p-2 hover:bg-gray-200">
                          <div className="flex gap-x-4">
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">{itemTitle(keyss)}</p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">تعداد اسناد : {obj[keyss].length} عدد</p>
                            </div>
                          </div>
                          <div className=" sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">بارگذاری شده در : {dateConversion(obj[keyss].created_at)}</p>
                            <p className="mt-1 text-xs leading-5 text-gray-500">آخرین تغییرات : {dateConversion(obj[keyss].updated_at)}</p>
                          </div>
                        </li>
                      )
                    }
                  }
                })
              })
            }
          </ul>
        </div>
    </div>
    </form>
  );
};

export default ViewFacilitiesDocuments;
