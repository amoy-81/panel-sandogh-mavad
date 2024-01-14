import React, { useState } from 'react'
import { Axios } from '../../../../../core/http-service';
import Loader from '../../../../../components/loader/Loader';
export default function S1PlacesUp({close , data , id , toast }) {
    console.log(data);

    const [isLoading , setIsLoading] = useState(false)
    const [sendObject , setSendObject] = useState({
        places: [
            ...data
        ],
    })

    
    // console.log(sendObject);
    const changeHandler = (e) => {
        setSendObject((prev) => {
            const update = prev.places.map((place , index) => {
                if (index === parseInt(e.target.id)) {
                    return ({
                        ...place,
                        [e.target.name] : e.target.value
                    })
                }
                return place
            })
            return ({
                ...prev,
                places : update
            })
        })
    }
    const sendHandler = (e) => {
        e.preventDefault()
        setIsLoading(false)
        Axios.put(`/v1/request/${id}`, sendObject)
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
            <p className="text-lg text-white font-extrabold">مکان فعالیت شرکت </p>
            </div>
            <table className="rounded-xl overflow-hidden">
            <thead>
                <tr className=" sticky top-0   ">
                <th className="bg-white p-3  ">کاربری </th>
                <th className="bg-white p-3 ">نشانی </th>
                <th className="bg-white p-3 "> متراژ (مترمربع)</th>
                <th className="bg-white p-3 ">مالک/ استیجاری </th>
                <th className="bg-white p-3 ">تعداد کارکنان </th>
                </tr>
            </thead>
            <tbody>
                {
                    sendObject.places.map((item , index) => {
                        return (
                            <tr key={index} className="bg-white border-b">
                                <td className="p-4 text-xs text-gray-800 font-bold">
                                    دفتر مرکزی
                                </td>
                                <td className="p-4 text-xs text-gray-600 font-bold">
                                    <textarea
                                    className=" text-xs h-12 border border-gray-300 rounded-xl"
                                    cols="30"
                                    rows="10"
                                    id={index}
                                    value={sendObject.places[index].address}
                                    onChange={changeHandler}
                                    name="address"
                    
                                    ></textarea>
                                </td>
                                <td className="p-4 text-xs text-gray-600 font-bold">
                                    <input
                                    type="number"
                                    className="border border-gray-300 rounded-xl w-21"
                                    onChange={changeHandler}
                                    name="meterage"
                                    value={sendObject.places[index].meterage}
                                    id={index}
                                    />
                                </td>
                                <td className="p-4 text-xs text-gray-600 font-bold">
                                    <select
                                    name="ownership"
                                    onChange={changeHandler}
                                    id={index}
                                    className="border-gray-300 rounded-xl w-24 text-xs"
                                    >
                                    <option value="owner">مالک</option>
                                    <option value="rental">استیجاری</option>
                                    </select>
                                </td>
                                <td className="p-4 text-xs text-gray-600 font-bold">
                                    <div className="flex">
                                    <input
                                        type="number"
                                        className="border border-gray-300 rounded-xl w-20"
                                        onChange={changeHandler}
                                        name="count"
                                        value={sendObject.places[index].count}
                                        id={index}
                                    />
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
                
            </tbody>
        </table>
        <div>
            <button className='bg-red-500 p-3 mt-2 ml-2 rounded-xl text-white shadow-md transition hover:bg-red-600' onClick={() => close(null)}>بستن</button>
            <button className='bg-green-500 p-3 mt-2 mr-2 rounded-xl text-white shadow-md transition hover:bg-green-600' onClick={sendHandler}>ثبت اطلاعات</button>
        </div>
    </div>
  )
}
