import React from 'react'

export default function DownloadBoxRUp({document , setDocment , file_name , path , title , fn}) {
  const changeHandler = (e) => {
    setDocment((prev) => ({
      ...prev ,
      [e.target.name] : e.target.files[0]
    }))
  }
  return (
    <div className="flex flex-col rounded-lg p-2 border text-gray-400 text-xs mt-4">
        <p className="">
            {title}
        </p>
        <span className="">
            نام فایل : {fn}
        </span>

        <a href={`https://backend.nanotf.ir/${path}`} target='_blank' className="text-blue-400 text-xs">
        برای بارگیری کلیک کنید
        </a>
        <div className='mt-2'>
          {
            document[file_name] === undefined ?
              <label htmlFor={file_name} className="text-yellow-400 text-xs w-full justify-center">
                برای بروزرسانی کلیک کنید
              </label> :
              <div>
                {
                  document[file_name] && 
                    <p className="text-blue-400 text-xs w-full m-1 justify-center">
                    {
                      `نام فایل جدید : ${document[file_name].name}`
                    }
                    </p>
                }
                <label htmlFor={file_name} className="text-yellow-400 m-1 text-xs w-full justify-center">
                  برای تغییر کلیک کنید
                </label>
              </div>

          }
          {file_name === "file6" ? <input style={{ display: "none" }} id={file_name} className="text-blue-400 text-xs " type="file" onChange={changeHandler} name={file_name} /> : 
            <input style={{ display: "none" }} id={file_name} className="text-blue-400 text-xs " accept="application/pdf" type="file" onChange={changeHandler} name={file_name} />

          } 
          <br />
        </div>
    </div>
  )
}
