import React from 'react'

export default function DownloadBoxR({path , title , fn}) {
  return (
    <div className="flex flex-col rounded-lg p-2 border text-gray-400 text-xs mt-4">
        <p className="">
            {title}
        </p>
        <span className="">
            نام فایل : {fn}
        </span>

        <a href={`${import.meta.env.VITE_IMAGES_URL}/${path}`} target='_blank' className="text-blue-400 text-xs">
        برای بارگیری کلیک کنید
        </a>
    </div>
  )
}
