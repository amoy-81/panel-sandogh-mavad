import React, { useEffect, useState } from 'react'
import { Axios } from '../../../../../core/http-service';
import Loader from '../../../../../components/loader/Loader';

export default function S2EducationalUP({ close, data, id, toast }) {
    console.log(data);

    const [isLoading, setIsLoading] = useState(false)
    const [err , setErr] = useState(false)
    const [stepTwo, setStepTwo] = useState({
        educational: [
            ...data
        ],
    })
    ////
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
/////
const changeHandler = (e) => {
    setStepTwo(prevState => {
        const updated = prevState.educational.map((item, index) => {
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
          educational: updated
        };
      });
      console.log(stepTwo.educational[e.target.id]);
}
////
    const addHandler = (e) => {
        e.preventDefault()
        setStepTwo(prev => (
            {
                ...prev,
                educational: [
                    ...prev.educational,
                    {
                        name: "",
                        university: "",
                        study: "",
                        position: "",
                        records: ""
                    }
                ]
            }
        ));
      }
/////
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
                    سوابق تحصیلی، علمی، تخصصی و اجرایی مدیرعامل و اعضاء هیئت مدیره{" "}
                </p>
            </div>

            <div className=" ">
                <table className="w-full rounded-xl overflow-hidden">
                    <thead>
                        <tr className=" sticky top-0 text-sm border-b ">
                            <th className="bg-white p-3  ">رديف </th>
                            <th className="bg-white p-3  ">نام و نام خانوادگی </th>
                            <th className="bg-white p-3  ">دانشگاه </th>
                            <th className="bg-white p-3  ">رشته و مدرک تحصیلی </th>
                            <th className="bg-white p-3  ">سمت در شرکت </th>
                        </tr>
                    </thead>
                    <tbody>
                        {stepTwo.educational.length > 0 &&
                            stepTwo.educational.map((item, index) => (
                                <>
                                    <tr className="bg-white  border-b">
                                        <td className="p-4 text-xs text-gray-800 font-bold">
                                            {index}
                                        </td>

                                        <td className="p-4 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className="border border-gray-300 rounded-xl w-full"
                                                onChange={changeHandler}
                                                value={stepTwo.educational[index].name}
                                                name="name"
                                                id={index}
                                                // onFocus={(e) => focusHandler(e, index)}
                                            />
                                        </td>
                                        <td className="p-4 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className= "border border-gray-300 rounded-xl w-full"
                                                onChange={changeHandler}
                                                value={stepTwo.educational[index].university}
                                                name="university"
                                                id={index}
                                                // onFocus={(e) => focusHandler(e, index)}
                                            />
                                        </td>
                                        <td className="p-4 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className= "border border-gray-300 rounded-xl w-full"
                                                onChange={changeHandler}
                                                value={stepTwo.educational[index].study}
                                                name="study"
                                                id={index}
                                                // onFocus={(e) => focusHandler(e, index)}
                                            />
                                        </td>
                                        <td className="p-4 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className= "border border-gray-300 rounded-xl w-full"
                                                onChange={changeHandler}
                                                value={stepTwo.educational[index].position}
                                                name="position"
                                                id={index}
                                                // onFocus={(e) => focusHandler(e, index)}
                                            />
                                        </td>
                                    </tr>

                                    <tr className="bg-white  border-b">
                                        <td>سوابق:</td>
                                        <td colSpan="5" className="p-2">
                                            <textarea
                                                className="w-full h-16 border border-gray-300 rounded-xl my-2"
                                                onChange={changeHandler}
                                                value={stepTwo.educational[index].records}
                                                name="records"
                                                id={index}
                                                cols="30"
                                                rows="10"
                                                // onFocus={(e) => focusHandler(e, index)}
                                            ></textarea>
                                        </td>
                                    </tr>
                                </>
                            ))}

                        <tr className="">
                            <td className="bg-white" colSpan="9">
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
