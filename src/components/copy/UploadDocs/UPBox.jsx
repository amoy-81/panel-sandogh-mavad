import React from 'react'

export default function UPBox({SelectDocument , changeHandler , InputName , titleText , errors , showErr , removeItem }) {
  return (
    <div className="rounded-lg flex flex-col justify-center bg-white p-2 border text-gray-400 text-xs mt-4">
        <p className="">
            {titleText}
        </p>
        {
            SelectDocument === null ?
                <label htmlFor={InputName} className="text-blue-400 text-xs w-full justify-center">
                برای بارگذاری کلیک کنید
                </label> :
                <div className='flex flex-col'>
                    {
                        SelectDocument && SelectDocument.map((item , keyNum)=> {
                            return (
                                <p key={keyNum} className="flex text-blue-400 text-xs w-full m-1 items-center">
                                    <span title='حذف' onClick={() => removeItem({index : keyNum , name : InputName})} className='flex w-5 h-5 text-center items-center justify-center cursor-pointer hover:bg-red-500 transition text-white bg-red-700 p-1 ml-1 rounded-[50%] '>×</span>
                                {
                                    `نام فایل : ${item.file.name}`
                                }
                                </p>
                            )
                        })
                    }
                
                    <label htmlFor={InputName} className="text-white w-fit cursor-pointer hover:bg-yellow-300 transition p-1 rounded-md mt-2 bg-yellow-400 m-1 text-xs justify-center">
                        انتخاب دوباره
                    </label>
                </div>

}
        <input style={{ display: "none" }} id={InputName} className="text-blue-400 text-xs " onChange={(e) => changeHandler(e)} accept="application/pdf" type="file" name={InputName} multiple />
        {errors && showErr && <span className="text-red-500 text-xs ">*{errors}</span>}
    </div>
  )
}
