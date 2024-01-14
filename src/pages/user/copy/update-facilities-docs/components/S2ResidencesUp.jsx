import React, { useEffect, useState } from 'react'
import { Axios } from '../../../../../core/http-service';
import Loader from '../../../../../components/loader/Loader';

export default function S2ResidencesUp({close , data , id , toast }) {
    console.log(data);

    const [isLoading , setIsLoading] = useState(false)
    const [err , setErr] = useState(false)
    const [stepTwo , setStepTwo] = useState({
      residences: [
            ...data
        ],
    })

    useEffect(() => {
      setErr(false)
      let count = 0
      Object.keys(stepTwo).map((item) => {
        stepTwo[item].map(j => {
          Object.keys(j).map((k) => {
            if (j[k] === "") {
              count += 1
            }
          })
        })
      })
      if (count > 0) {
        setErr(true)
      }
    } , [stepTwo])
    const changeHandler = (e) => {
      setStepTwo(prevState => {
          const updated = prevState.residences.map((item, index) => {
            if (index === parseInt(e.target.id)) {
              return {
                ...item,
                [e.target.name]: e.target.value
              };
            }
            return item;
          });
          return {
            ...prevState,
            residences: updated
          };
        });
        console.log(stepTwo.residences[e.target.id]);
  }
    // console.log(sendObject);
    const addHandler = (e) => {
      e.preventDefault()
      setStepTwo(prev => (
        {
          ...prev ,
          residences : [
            ...prev.residences,
            {
              name:"",
              position:"",
              address:""
            },
          ]
        }
    ));
    }
    const sendHandler = (e) => {
        e.preventDefault()
        setIsLoading(false)
        Axios.put(`/v1/shareholder/${id}`, stepTwo)
        .then((res) => {
          console.log(res.data)
          setIsLoading(true)
          toast("تغییرات باموفقیت ثبت شد")
          close(null)

        })
        .catch((err) => {
          console.log(err)
          setIsLoading(false)
          toast("ثبت تغییرات با خطا مواجه شد")
        })
    }

    if (isLoading) return <Loader />
    return (
    <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex flex-col items-center justify-center">
        <div className=" py-6 mt-4">
        <p className="text-lg text-white font-extrabold">
          آدرس محل سكونت اعضای هیئت مدیره فعلي شرکت :{" "}
        </p>
      </div>

      <div className=" ">
        <table className="w-full rounded-xl overflow-hidden text-center">
          <thead>
            <tr className=" sticky top-0 text-sm border-b ">
              <th className="bg-white p-3 ">رديف </th>
              <th className="bg-white p-3 ">نام و نام خانوادگي</th>
              <th className="bg-white p-3 ">سمت </th>
              <th className="bg-white p-3 ">نشاني محل سکونت</th>
            </tr>
          </thead>
          <tbody>
            {stepTwo.residences.length > 0 &&
              stepTwo.residences.map((item, index) => (
                <tr key={index} className="bg-white  border-b">
                  <td className="p-4 text-xs text-gray-800 font-bold">
                    {index}
                  </td>

                  <td className="p-4 text-xs text-gray-600 font-bold">
                    <div className='flex flex-col items-center'>
                      <input
                          type="text"
                          className={"border border-gray-300 rounded-xl w-32"}
                          onChange={changeHandler}
                          value={stepTwo.residences[index].name}
                          name="name"
                          id={index}
                          
                      />
                    </div>
                  </td>

                  <td className="p-4 text-xs text-gray-600 font-bold">
                    <div className='flex flex-col items-center'>
                      <input
                          type="text"
                          className={"border border-gray-300 rounded-xl w-32"}
                          onChange={changeHandler}
                          value={stepTwo.residences[index].position}
                          name="position"
                          id={index}
                          
                      />
                    </div>
                  </td>
                  <td className="p-4 text-xs text-gray-600 font-bold">
                    <div className="flex flex-col items-center">
                      <textarea
                        type="text"
                        className={"border border-gray-300 rounded-xl w-full"}
                        onChange={changeHandler}
                        value={stepTwo.residences[index].address}
                        name="address"
                        id={index}
                        
                      />
                    </div>
                  </td>
                </tr>
              ))}
            <tr className="">
              <td className="bg-white text-right" colSpan="4">
                <button
                  className=" w-28 p-2 px-4 text-sm font-bold bg-green-200 rounded-xl m-2"
                  onClick={addHandler}
                >
                  {" "}
                  افزودن ردیف{" "}
                </button>
                {err && <span className='text-red-500 text-center'>*همه فیلد ها باید پر شوند</span>}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
            <button className='bg-red-500 p-3 mt-2 ml-2 rounded-xl text-white shadow-md transition hover:bg-red-600' onClick={() => close(null)}>بستن</button>
            <button className='bg-green-500 p-3 mt-2 mr-2 rounded-xl text-white shadow-md transition hover:bg-green-600' onClick={sendHandler}>ثبت اطلاعات</button>
        </div>
    </div>
  )
}
