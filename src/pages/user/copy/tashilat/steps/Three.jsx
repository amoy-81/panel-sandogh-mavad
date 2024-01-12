import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { TashilatContext } from "../../../../../contexts/Tashilat.Provider";
import { Axios } from "../../../../../core/http-service";
import Loader from "../../../../../components/loader/Loader";
import { VS2shareholders } from "../../../../../helper/validation/VS2shareholders";

export default function Three() {
  const navigate = useNavigate();
  const location = useLocation();
  const values = queryString.parse(location.search);

  const { stepThree, setStepThree } = useContext(TashilatContext)

  const [isLoading, setIsLoading] = useState(false)
  const [showAllErr , setShowAllErr] = useState(false)
  // for Validation
  const [err , setErr] = useState([{name : "پر کنید"}])
  const [showErr , setShowErr] = useState([])
  const [sendAccept , setSendAccept] = useState({
    products : [{name : ""}] ,
  })
     // for Validation
     console.log(err);

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
    console.log(yesNumber);
    if (yesNumber === 0) {
      setOk(true)
    }
  } , [err , stepThree])
  useEffect(() => {
    
    
    if (showAllErr) {
        showErr.map((i , index)=> {
            const arr = showErr
            const newObj = {
              name:true,
              customer:true,
              specifications:true,
              competitor:true,
              sales_amount:true,
            }
            arr[index] = newObj
            // console.log(arr);
            setShowErr(arr)
          })
        }
        // console.log("hhhhhhhh");
        console.log(showErr);
        
        setErr(VS2shareholders(stepThree.products))
        setSendAccept(prev => ({...prev , products : VS2shareholders(stepThree.products)}))
  } , [showAllErr , stepThree])

  // for Validation
  const focusHandler = (e , index) => {
    if (showErr[index]) {
        const arr = showErr
        arr[index] = {...arr[index] , [e.target.name] : true}
        setShowErr(arr)
        
    } else if (showErr[index] === undefined) {
        const arr = showErr
        arr[arr.length] = {[e.target.name] : true}
        setShowErr(arr)
    }
    setErr(VS2shareholders(stepThree.products))
    setSendAccept(prev => ({...prev , products : VS2shareholders(stepThree.products)}))
  }

  useState(() => {
    setStepThree((prev) => {
      return ({
        ...prev,
        facilities_id : parseInt(values.last_id),
      })
    })
  } , [])

  const changeHandler = (e) => {
    setStepThree(prevState => {
      const updatedPlaces = prevState.products.map((item, index) => {
        if (index === parseInt(e.target.id)) {
          if (e.target.type === "checkbox") {
            return {
              ...item,
              [e.target.name]: e.target.checked
            };
          } else {
            return {
              ...item,
              [e.target.name]: e.target.value
            };
          }
        }
        return item;
      });
      return {
        ...prevState,
        products: updatedPlaces
      };
    });
    console.log(stepThree);
  }
  
  const sendHandler = () => {
    setIsLoading(true)
    Axios.post("/v1/product", stepThree)
    .then((res) => {
      console.log(res.data)
      navigate(`/user/tashilat/4?last_id=${parseInt(values.last_id)}`)
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
      <div className=" py-6 mt-4">
        <p className="text-lg font-extrabold">
          مشخصات محصولات/ خدمات اصلی شرکت{" "}
        </p>
      </div>

      <div className=" ">
        <table className="w-full rounded-xl overflow-hidden">
          <thead>
            <tr className=" sticky top-0 text-sm border-b ">
              <th className="bg-white p-3  ">رديف </th>
              <th className="bg-white p-3  ">نام محصول/خدمت </th>
              <th className="bg-white p-3  ">مشتریان اصلی </th>
              <th className="bg-white p-3  ">مشخصات و کاربرد محصول/خدمت </th>
              <th className="bg-white p-3  ">رقبای اصلی در رابطه با محصول </th>
              <th className="bg-white p-3  ">
                میزان فروش یک سال گذشت (میلیون ریال){" "}
              </th>
              <th className="bg-white p-3  ">تأییدیه دانش بنیان؟ </th>
            </tr>
          </thead>
          <tbody>
            {stepThree.products.length > 0 &&
              stepThree.products.map((item, index) => {
                return (
                  <tr key={index} className="bg-white  border-b">
                    <td className="p-4 text-xs text-gray-800 font-bold">
                      {index}
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold">
                      <input
                        type="text"
                        className={err[index] && err[index].name && showErr[index] && showErr[index].name ? "border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                        onChange={changeHandler}
                        value={stepThree.products[index].name}
                        name="name"
                        id={index}
                        onFocus={(e) => focusHandler(e , index)}
                      />
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold">
                      <input
                        type="text"
                        className={err[index] && err[index].customer && showErr[index] && showErr[index].customer ? "border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                        onChange={changeHandler}
                        value={stepThree.products[index].customer}
                        name="customer"
                        id={index}
                        onFocus={(e) => focusHandler(e , index)}
                      />
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold">
                      <input
                        type="text"
                        className={err[index] && err[index].specifications && showErr[index] && showErr[index].specifications ? "border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                        onChange={changeHandler}
                        value={stepThree.products[index].specifications}
                        name="specifications"
                        id={index}
                        onFocus={(e) => focusHandler(e , index)}
                      />
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold">
                      <input
                        type="text"
                        className={err[index] && err[index].competitor && showErr[index] && showErr[index].competitor ? "border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                        onChange={changeHandler}
                        value={stepThree.products[index].competitor}
                        name="competitor"
                        id={index}
                        onFocus={(e) => focusHandler(e , index)}
                      />
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold">
                      <input
                        type="number"
                        className={err[index] && err[index].sales_amount && showErr[index] && showErr[index].sales_amount ? "border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                        onChange={changeHandler}
                        value={stepThree.products[index].sales_amount}
                        name="sales_amount"
                        id={index}
                        onFocus={(e) => focusHandler(e , index)}
                      />
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                      <input
                        type="checkbox"
                        className="border border-gray-300 rounded-xl "
                        onChange={changeHandler}
                        value={true}
                        name="is_confirmation"
                        id={index}
                      />
                    </td>
                  </tr>
                )
              })
            }

            <tr className="">
              <td className="bg-white" colSpan="9">
                <button
                  className=" w-28 p-2 px-4 text-sm font-bold bg-green-200 rounded-xl m-2"
                  onClick={() => {
                    setStepThree(prev => (
                        {
                            ...prev ,
                            products : [
                                ...prev.products,
                                {
                                    name:"",
                                    customer:"",
                                    specifications:"",
                                    competitor:"",
                                    sales_amount:"",
                                    is_confirmation : false
                                },
                            ]
                        }
                    ));
                }}
                >
                  {" "}
                  افزودن ردیف{" "}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
        <div className=" text-left mt-2">
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