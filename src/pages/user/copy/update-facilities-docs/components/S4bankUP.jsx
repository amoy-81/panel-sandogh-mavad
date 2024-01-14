import React, { useEffect, useState } from 'react'
import { Axios } from '../../../../../core/http-service';
import Loader from '../../../../../components/loader/Loader';

export default function S4bankUP({ close, data, id, toast }) {
    const [isLoading, setIsLoading] = useState(false)
    const [err, setErr] = useState(false);
    const [ stepFour, setStepFour ] = useState({
        banks: [
            ...data
        ],
    })


    /////validation
    useEffect(() => {
        setErr(false)
        let count = 0
        Object.keys(stepFour).map((item) => {
            stepFour[item].map(j => {
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
    }, [stepFour])
    /////

    const changeHandler = (e) => {
        setStepFour(prevState => {
            const updatedPlaces = prevState.banks.map((item, index) => {
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
                banks: updatedPlaces
            };
        });
        console.log(stepFour.banks[e.target.id]);
    }

    //add row
    const addHandler = (e) => {
        e.preventDefault()
        setStepFour(prev => (
            {
                ...prev,
                banks: [
                    ...prev.banks,
                    {
                        name: "",
                        branch: "",
                        account_number: ""
                    },
                ]
            }
        ));
    }

    const sendHandler = (e) => {
        e.preventDefault()
        setIsLoading(false)
        Axios.put(`/v1/bank/${id}`, stepFour)
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
                <p className="text-lg font-extrabold">
                    بانکها / نهادهای مالی اصلی شرکت / فرد:{" "}
                </p>
            </div>

            <div className=" ">
                <table className="w-full rounded-xl overflow-hidden">
                    <thead>
                        <tr className=" sticky top-0 text-xs border-b ">
                            <th className="bg-white p-3  ">رديف </th>
                            <th className="bg-white p-3  ">بانک/ نهاد مالی </th>
                            <th className="bg-white p-3  ">شعبه </th>
                            <th className="bg-white p-3  ">شماره حساب </th>
                        </tr>
                    </thead>
                    <tbody>
                        {stepFour.banks.length > 0 &&
                            stepFour.banks.map((item, index) => {
                                return (
                                    <tr key={index} className="bg-white  border-b">
                                        <td className="p-4 text-xs text-gray-800 font-bold">
                                            {index + 1}
                                        </td>
                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className="border border-gray-300 rounded-xl w-full"
                                                onChange={changeHandler}
                                                value={stepFour.banks[index].name}
                                                name="name"
                                                id={index}
                                            // onFocus={(e) => focusHandler(e, index)}
                                            />
                                        </td>
                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className="border border-gray-300 rounded-xl w-full"
                                                onChange={changeHandler}
                                                value={stepFour.banks[index].branch}
                                                name="branch"
                                                id={index}
                                            // onFocus={(e) => focusHandler(e, index)}

                                            />
                                        </td>
                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className="border border-gray-300 rounded-xl w-full"
                                                onChange={changeHandler}
                                                value={stepFour.banks[index].account_number}
                                                name="account_number"
                                                id={index}
                                            // onFocus={(e) => focusHandler(e, index)}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                        <tr className="">
                            <td className="bg-white" colSpan="12">
                                <button
                                    className=" w-28 p-2 px-4 text-sm font-bold bg-green-200 rounded-xl m-2"
                                    onClick={addHandler

                                    }
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





