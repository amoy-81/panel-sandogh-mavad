import React from 'react'

export default function UISelectInput({name , value , ph , setSendDatas}) {

    const changeHandler = (e) => {
        setSendDatas(prev => {
            return({
                ...prev , 
                [e.target.name] : e.target.value
            })
        })
    }
    if (name === "gender" || name === "gendermarital") {
        return(
            <select style={{border : 0}} name={name} id="" onChange={changeHandler}>
                <option value="female">زن</option>
                <option value="male">مرد</option>
            </select>
        )
    } else if (name === "marital") {
        return(
            <select style={{border : 0}} name={name} id="" onChange={changeHandler}>
                <option value="single">مجرد</option>
                <option value="married">متاهل</option>
            </select>
        )
    } else if (name === "residential") {
        return(
            <select style={{border : 0}} name={name} id="" onChange={changeHandler}>
                <option value="resident">مقیم</option>
                <option value="non_resident">اتباع خارجی</option>
            </select>
        )
    }
}
