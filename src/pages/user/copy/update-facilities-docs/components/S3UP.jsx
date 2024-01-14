import React, { useState } from 'react'
import { Axios } from '../../../../../core/http-service';
import Loader from '../../../../../components/loader/Loader';
import { useEffect } from 'react';

export default function S3({ close, data, id, toast }) {
    console.log(data);

    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [stepThree, setStepThree ] = useState({
        products: [
            ...data
        ],
    })

    /////
    useEffect(() => {
        setErr(false)
        let count = 0
        Object.keys(stepThree).map((item) => {
            stepThree[item].map(j => {
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
    }, [stepThree])
    /////

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
    ////
    const addHandler = (e) => {
        e.preventDefault()
        setStepThree(prev => (
            {
                ...prev,
                products: [
                    ...prev.products,
                    {
                        name: "",
                        customer: "",
                        specifications: "",
                        competitor: "",
                        sales_amount: "",
                        is_confirmation: false
                    },
                ]
            }
        ));
      }
/////
    const sendHandler = (e) => {
        e.preventDefault()
        setIsLoading(false)
        Axios.put(`/v1/product/${id}`, stepThree)
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
                    مشخصات محصولات/ خدمات اصلی شرکت{" "}
                </p>
            </div>

            <div className=" ">
                <table className="max-w-[1000px] rounded-xl overflow-hidden">
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
                                                className="border border-gray-300 rounded-xl w-full"
                                                onChange={changeHandler}
                                                value={stepThree.products[index].name}
                                                name="name"
                                                id={index}
                                                onFocus={(e) => focusHandler(e, index)}
                                            />
                                        </td>
                                        <td className="p-4 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className="border border-gray-300 rounded-xl w-full"
                                                onChange={changeHandler}
                                                value={stepThree.products[index].customer}
                                                name="customer"
                                                id={index}
                                                onFocus={(e) => focusHandler(e, index)}
                                            />
                                        </td>
                                        <td className="p-4 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className="border border-gray-300 rounded-xl w-full"
                                                onChange={changeHandler}
                                                value={stepThree.products[index].specifications}
                                                name="specifications"
                                                id={index}
                                                onFocus={(e) => focusHandler(e, index)}
                                            />
                                        </td>
                                        <td className="p-4 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className="border border-gray-300 rounded-xl w-full"
                                                onChange={changeHandler}
                                                value={stepThree.products[index].competitor}
                                                name="competitor"
                                                id={index}
                                                onFocus={(e) => focusHandler(e, index)}
                                            />
                                        </td>
                                        <td className="p-4 text-xs text-gray-600 font-bold">
                                            <input
                                                type="number"
                                                className="border border-gray-300 rounded-xl w-full"
                                                onChange={changeHandler}
                                                value={stepThree.products[index].sales_amount}
                                                name="sales_amount"
                                                id={index}
                                                onFocus={(e) => focusHandler(e, index)}
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
