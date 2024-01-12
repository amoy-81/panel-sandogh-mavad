import React, { useEffect , useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../../core/http-service";
import Loader from "../../../../components/loader/Loader";

import WboxR from "../../../../components/copy/viewDoc/WboxR";
import WboxL from "../../../../components/copy/viewDoc/WboxL";

const ViewWarrantyDocuments = () => {
  const reqId = useParams()
  const navigate = useNavigate()
  
  const [isLoading , setIsLoading] = useState(true)
  const [errore , setErrore] = useState(false)

  const [reqData , setReqData] = useState([])
  const [reqDataL , setReqDataL] = useState([])
  useEffect(() => {
    Axios.get(`/v1/request/${reqId.id}`)
    .then(async (res) => {
      const response = {
        warranty : [{
          bills : res.data.warranty[0].bills,
          registration_doc : res.data.warranty[0].registration_doc,
          signatory : res.data.warranty[0].signatory,
          
          statement : res.data.warranty[0].statement,
          balance : res.data.warranty[0].balance,
          insurance : res.data.warranty[0].insurance,
          knowledge : res.data.warranty[0].knowledge,
          resume : res.data.warranty[0].resume,
          loans : res.data.warranty[0].loans,
          proforma : res.data.warranty[0].proforma,

          license : res.data.warranty[0].license,
          catalog : res.data.warranty[0].catalog,
        }]
      }
      setReqDataL(response)
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
         <p onClick={() => navigate(-1)} className="cursor-pointer hover:bg-s-6 transition-all hover:text-white p-2 rounded-lg">بازگشت</p>
      </div>
      <hr className="border-dashed" />
      
      <div className="px-5">
        <div className="flex">
          {Boolean(reqData.warranty[0]) && <p className="text-ms font-bold p-4 py-4">عنوان درخواست : <span className="text-gray-500 font-normal mr-1">{reqData.warranty[0].title}</span></p>}
          <p className="text-ms font-bold p-4 py-4">
            نوع درخواست : 
            {Boolean(reqData.warranty[0]) && <span className="text-gray-500 font-normal mr-2">
              {
                reqData.warranty[0].type_w === "job" ? "حسن انجام کار" :
                reqData.warranty[0].type_w === "commitments" ? "حسن انجام تعهدات" :
                reqData.warranty[0].type_w === "deduction" ? "کسور وجه الضمان" :
                reqData.warranty[0].type_w === "prepayment" ? "پیش پرداخت" :
                reqData.warranty[0].type_w === "commitment_pay" ? "تعهد پرداخت" :
                reqData.warranty[0].type_w === "tender_offer" ? "شرکت در مناقصه" :
                reqData.warranty[0].type_w === "credit" ? "حد اعتباری" : ""
              }
            </span>
            }
          </p>
        </div>
        <div className="flex">
          <div className="w-1/2 px-2">
            {reqData.warranty && reqData.warranty.map((item , index) => {
              return(
                <WboxR 
                  key={index}
                  path1={item.path1}
                  path2={item.path2}
                  path3={item.path3}
                  path4={item.path4}
                  path5={item.path5}
                  path6={item.path6}

                  fn1={item.file_name1}
                  fn2={item.file_name2}
                  fn3={item.file_name3}
                  fn4={item.file_name4}
                  fn5={item.file_name5}
                  fn6={item.file_name6}
                />
              )
            })
            }
          </div>
          <div className="w-1/2 px-2">
            {reqData.warranty && <WboxL reqData={reqDataL} />}
          </div>
        </div>
    </div>
    </form>
  );
};

export default ViewWarrantyDocuments;
