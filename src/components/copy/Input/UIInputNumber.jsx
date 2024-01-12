import React from 'react'

export default function UIInputNumber({name , value , ph , setSendDatas}) {

    const changeHandler = (e) => {
        setSendDatas(prev => {
            return({
                ...prev , 
                [e.target.name] : e.target.value
            })
        })
    }
  return (
    <input
        type="text"
        value={value}
        name={name}
        onChange={changeHandler}
        placeholder={ph}
        className="outline-none placeholder:text-xs border-0 w-full"
    />
  )
}
