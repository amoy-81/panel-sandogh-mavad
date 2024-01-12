import React from 'react'
import { DatePicker } from 'zaman';
import { onlyDateConversion } from '../../helper/dateConversion.cjs';

export default function UIInputDate({name , value , ph , setSendDatas}) {

    const datechangeHandler = (e, InIndex) => {
        const day = e.value.getDate()
        const mouth = e.value.getMonth()
        const year = e.value.getFullYear()
        setSendDatas(prev => {
            return({
                ...prev,
                [name] : `${year}-${mouth + 1}-${day}`
            })
        })
    }
  return (
    <div className='flex'>
        {value && <p>{onlyDateConversion(value)}</p>}
        <div style={{opacity : 0, cursor : "pointer"}}>
            <DatePicker
                onChange={(e) => datechangeHandler(e)}
                locale="fa"
                placeholder="تاریخ را انتخاب کنید"
                format="jYYYY/jMM/jDD"
                id="1"
            />
        </div>
    </div>
  )
}
