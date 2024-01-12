import React, { useContext, useEffect, useState } from 'react'
import { TashilatContext } from "../../../contexts/Tashilat.Provider";
import { VS2shareholders } from "../../../helper/validation/VS2shareholders";

export default function S2Manpowers({ showAllErr, setSendAccept }) {
    const { stepTwo, setStepTwo } = useContext(TashilatContext)

    // for Validation
    const [err, setErr] = useState([{ name: "پر کنید" }])
    const [showErr, setShowErr] = useState([])
    // for Validation
    console.log(err);
    useEffect(() => {
        if (showAllErr) {
            showErr.map((i, index) => {
                const arr = showErr
                const newObj = {
                    name: true,
                    position: true,
                    level_education: true,
                    study: true,
                    work_experience: true,
                    important: true
                }
                arr[index] = newObj
                // console.log(arr);
                setShowErr(arr)
            })
        }
        // console.log("hhhhhhhh");
        console.log(showErr);

        setErr(VS2shareholders(stepTwo.manpowers))
        setSendAccept(prev => ({ ...prev, manpowers: VS2shareholders(stepTwo.manpowers) }))
    }, [showAllErr, stepTwo])

    // for Validation
    const focusHandler = (e, index) => {
        if (showErr[index]) {
            const arr = showErr
            arr[index] = { ...arr[index], [e.target.name]: true }
            setShowErr(arr)

        } else if (showErr[index] === undefined) {
            const arr = showErr
            arr[arr.length] = { [e.target.name]: true }
            setShowErr(arr)
        }
        setErr(VS2shareholders(stepTwo.manpowers))
        setSendAccept(prev => ({ ...prev, manpowers: VS2shareholders(stepTwo.manpowers) }))
    }
    const changeHandler = (e) => {
        setStepTwo(prevState => {
            const updated = prevState.manpowers.map((item, index) => {
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
                manpowers: updated
            };
        });
        console.log(stepTwo.manpowers[e.target.id]);
    }
    return (
        <>
            <div className=" py-6 mt-4">
                <p className="text-lg font-extrabold">مشخصات نیروی انساني شرکت </p>
                <p className="text-sm font-bold mt-2 text-gray-600">
                    خالصه رزومه افراد کلیدی شرکت به شرح زیر است:{" "}
                </p>
            </div>
            <div className=" ">
                <table className="w-full rounded-xl overflow-hidden">
                    <thead>
                        <tr className=" sticky top-0 text-sm border-b ">
                            <th className="bg-white p-3  ">رديف </th>
                            <th className="bg-white p-3  ">نام و نام خانوادگي</th>
                            <th className="bg-white p-3  ">سمت</th>
                            <th className="bg-white p-3  "> تحصیلات</th>
                            <th className="bg-white p-3  ">رشته تحصيلي</th>
                            <th className="bg-white p-3  ">نوع قرارداد </th>
                            <th className="bg-white p-3  ">سابقه کار مرتبط (سال)</th>
                            <th className="bg-white p-3  ">سوابق کاري</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stepTwo.manpowers.length > 0 &&
                            stepTwo.manpowers.map((item, index) => (
                                <tr className="bg-white  border-b">
                                    <td
                                        key={index}
                                        className="p-4 text-xs text-gray-800 font-bold"
                                    >
                                        {index}
                                    </td>

                                    <td className="flex flex-col p-4 text-xs text-gray-600 font-bold">
                                        <input
                                            type="text"
                                            className={err[index] && err[index].name && showErr[index] && showErr[index].name ? "border border-red-300 rounded-xl w-20" : "border border-gray-300 rounded-xl w-20"}
                                            onChange={changeHandler}
                                            value={stepTwo.manpowers[index].name}
                                            name="name"
                                            id={index}
                                            onFocus={(e) => focusHandler(e, index)}
                                        />
                                    </td>

                                    <td className="p-4 text-xs text-gray-600 font-bold">
                                        <div className="flex flex-col items-center">
                                            <input
                                                type="text"
                                                className={err[index] && err[index].position && showErr[index] && showErr[index].position ? "border border-red-300 rounded-xl w-20" : "border border-gray-300 rounded-xl w-20"}
                                                onChange={changeHandler}
                                                value={stepTwo.manpowers[index].position}
                                                name="position"
                                                id={index}
                                                onFocus={(e) => focusHandler(e, index)}
                                            />
                                        </div>
                                    </td>
                                    <td className="p-4 text-xs text-gray-600 font-bold">
                                        <div className="flex flex-col items-center">
                                            <input
                                                type="text"
                                                className={err[index] && err[index].level_education && showErr[index] && showErr[index].level_education ? "border border-red-300 rounded-xl w-20" : "border border-gray-300 rounded-xl w-20"}
                                                onChange={changeHandler}
                                                value={stepTwo.manpowers[index].level_education}
                                                name="level_education"
                                                id={index}
                                                onFocus={(e) => focusHandler(e, index)}
                                            />
                                        </div>
                                    </td>
                                    <td className="p-4 text-xs text-gray-600 font-bold">
                                        <div className="flex flex-col items-center">
                                            <input
                                                type="text"
                                                className={err[index] && err[index].study && showErr[index] && showErr[index].study ? "border border-red-300 rounded-xl w-20" : "border border-gray-300 rounded-xl w-20"}
                                                onChange={changeHandler}
                                                value={stepTwo.manpowers[index].study}
                                                name="study"
                                                id={index}
                                                onFocus={(e) => focusHandler(e, index)}
                                            />
                                        </div>
                                    </td>
                                    <td className="p-4 text-xs text-gray-600 font-bold">
                                        <select
                                            onChange={changeHandler}
                                            name="type_contract"
                                            id={index}
                                            className="border-gray-300 rounded-xl w-32 text-xs"
                                        >
                                            <option value="full">تمام وقت </option>
                                            <option value="part">پاره وقت</option>
                                        </select>
                                    </td>
                                    <td className="p-4 text-xs text-gray-600 font-bold">
                                        <div className="flex flex-col items-center">
                                            <input
                                                type="number"
                                                className={err[index] && err[index].work_experience && showErr[index] && showErr[index].work_experience ? "border border-red-300 rounded-xl w-20" : "border border-gray-300 rounded-xl w-20"}
                                                onChange={changeHandler}
                                                value={stepTwo.manpowers[index].work_experience}
                                                name="work_experience"
                                                id={index}
                                                onFocus={(e) => focusHandler(e, index)}
                                            />
                                        </div>
                                    </td>

                                    <td className="p-4 text-xs text-gray-600 font-bold">
                                        <div className="flex flex-col items-center">
                                            <input
                                                type="text"
                                                className={err[index] && err[index].important && showErr[index] && showErr[index].important ? "border border-red-300 rounded-xl w-20" : "border border-gray-300 rounded-xl w-20"}
                                                onChange={changeHandler}
                                                value={stepTwo.manpowers[index].important}
                                                name="important"
                                                id={index}
                                                onFocus={(e) => focusHandler(e, index)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        <tr className="">
                            <td className="bg-white" colSpan="8">
                                <button
                                    className=" w-28 p-2 px-4 text-sm font-bold bg-green-200 rounded-xl m-2"
                                    onClick={() => {
                                        setStepTwo(prev => (
                                            {
                                                ...prev,
                                                manpowers: [
                                                    ...prev.manpowers,
                                                    {
                                                        name: "",
                                                        position: "",
                                                        level_education: "",
                                                        study: "",
                                                        type_contract: "full",
                                                        work_experience: "",
                                                        important: ""
                                                    }
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
        </>
    )
}
