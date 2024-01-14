import React, { useEffect, useState } from 'react'
import { Axios } from '../../../../../core/http-service';
import Loader from '../../../../../components/loader/Loader';
import { DatePicker } from 'zaman';

export default function S2BoardsUp({close , data , id , toast }) {
    const [isLoading , setIsLoading] = useState(false)
    const [err , setErr] = useState(false)
    const [ stepTwo, setStepTwo ] = useState({
      boards: [
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
    const datechangeHandler = (e, InIndex , keyName) => {
      const day = e.value.getDate()
      const mouth = e.value.getMonth()
      const year = e.value.getFullYear()
      setStepTwo(prevState => {
        const updated = prevState.boards.map((item, index) => {
          if (index === parseInt(InIndex)) {
            if (keyName === "start") {
              return {
                ...item,
                start: `${year}-${mouth + 1}-${day}`
              };
            } else if (keyName === "birth_date") {
              return {
                ...item,
                birth_date: `${year}-${mouth + 1}-${day}`
              };
            }
          }
          return item;
        });
        return {
          ...prevState,
          boards: updated
        };
      });
      console.log(stepTwo);
    }
    const changeHandler = (e) => {
      setStepTwo(prevState => {
          const updated = prevState.boards.map((item, index) => {
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
            boards: updated
          };
        });
        console.log(stepTwo.boards[e.target.id]);
  }
    // console.log(sendObject);
    
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
              ترکیب اعضای هیئت مدیره
            </p>
        </div>

        <div className=" ">
            <table className="max-w-[1000px] rounded-xl overflow-hidden">
            <thead>
                <tr className=" sticky top-0 text-sm border-b ">
                <th className="bg-white p-3  ">رديف </th>
                <th className="bg-white p-3  ">نام و نام خانوادگی </th>
                <th className="bg-white p-3  ">نوع شخصیت </th>
                <th className="bg-white p-3  ">سمت </th>
                <th className="bg-white p-3  ">شماره ملی </th>
                <th className="bg-white p-3  ">تاریخ تولد </th>
                <th className="bg-white p-3  ">سطح تحصیلات </th>
                <th className="bg-white p-3  ">رشته تحصیلی </th>
                </tr>
            </thead>
            <tbody>
                {stepTwo.boards.length > 0 &&
                stepTwo.boards.map((item, index) => (
                    <>
                    <tr className="bg-white  border-b">
                        <td className="p-4 text-xs text-gray-800 font-bold">
                        {index}
                        </td>

                        <td className="p-4 text-xs text-gray-600 font-bold">
                        <input
                            type="text"
                            className={"border border-gray-300 rounded-xl w-full"}
                            onChange={changeHandler}
                            value={stepTwo.boards[index].name}
                            name="name"
                            id={index}
                        />
                        </td>
                        <td className="p-4 text-xs text-gray-600 font-bold">
                            <select
                                onChange={changeHandler}
                                name="type"
                                id={index}
                                className="border-gray-300 rounded-xl w-28 text-xs"
                            >
                            <option value="genuine">حقیقی</option>
                            <option value="legal">حقوقی</option>
                            </select>
                        </td>
                        <td className="p-4 text-xs text-gray-600 font-bold">
                        <input
                            type="text"
                            className={"border border-gray-300 rounded-xl w-full"}
                            onChange={changeHandler}
                            value={stepTwo.boards[index].position}
                            name="position"
                            id={index}
                        />
                        </td>
                        <td className="p-4 text-xs text-gray-600 font-bold">
                        <input
                            type="number"
                            className={"border border-gray-300 rounded-xl w-20"}
                            onChange={changeHandler}
                            value={stepTwo.boards[index].n_national}
                            name="n_national"
                            id={index}
                        />
                        </td>




                        <td className="p-4 text-xs text-gray-600 font-bold">
                        <DatePicker
                            onChange={(e) => datechangeHandler(e, index , "birth_date")}
                            locale="fa"
                            placeholder="تاریخ را انتخاب کنید"
                            format="jYYYY/jMM/jDD"
                            className={"border border-gray-300 rounded-xl w-20"}
                        />
                        </td>
                        <td className="p-4 text-xs text-gray-600 font-bold">
                        <input
                            type="text"
                            className={"border border-gray-300 rounded-xl w-full"}
                            onChange={changeHandler}
                            value={stepTwo.boards[index].education}
                            name="education"
                            id={index}
                        />
                        </td>
                        <td className="p-4 text-xs text-gray-600 font-bold">
                        <input
                            type="text"
                            className={"border border-gray-300 rounded-xl w-full"}
                            onChange={changeHandler}
                            value={stepTwo.boards[index].study}
                            name="study"
                            id={index}
                        />
                        </td>
                    </tr>
                    </>
                ))}

                <tr className="">
                <td className="bg-white" colSpan="9">
                    <button
                      className=" w-28 p-2 px-4 text-sm font-bold bg-green-200 rounded-xl m-2"
                      onClick={(e) => {
                          e.preventDefault()
                          setStepTwo(prev => (
                            {
                              ...prev ,
                              boards : [
                                  ...prev.boards,
                                  { 
                                    name:"", 
                                    type:"genuine", 
                                    position:"", 
                                    n_national:"", 
                                    birth_date:"", 
                                    education:"", 
                                    study:"" 
                                  }
                              ]
                            }
                          ));
                      }}
                    >
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
