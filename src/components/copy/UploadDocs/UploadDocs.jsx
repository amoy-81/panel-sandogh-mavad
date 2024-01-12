import React from 'react'

export default function UploadDocs({ document, changeHandler, errors, showErr }) {
  const handelChang = (e) => {
    changeHandler(e)
  }
  return (
    <div className="w-full px-2">
      <div className=" bg-white rounded-xl p-5">
        <div className=" pb-4">
          <p className=" font-bold"> مدارک اولیه </p>
        </div>
        <hr className="border-dashed border-gray-300" />
        <p className="text-xs py-3">
          <span className="text-green-400"> توضیحات :</span> فایل را از حالت
          فشرده خارج کنید و هر فرم را پر کنید سپس در جای مناسب بارگذاری کنید
        </p>
        <p className="text-xs py-3">فرمت های مجاز doc, docx, pdf, zip, png, jpg</p>
        <a href="https://backend.nanotf.ir/storage/docs/1_6271033281.zip">
          <button
            className="w-full border rounded-lg border-green-400 text-green-400 p-2 hover:bg-green-400 hover:text-white transition font-bold text-sm">
            بارگیری فایل مدارک اصلی
          </button>
        </a>
        <br />
        <br />
        <hr className="border-dashed border-gray-300" />

        {/* FILE 1 */}
        <div className="rounded-lg p-2 border text-gray-400 text-xs mt-4">
          <p className="">
            اجازه نامه تکمیل شده استعلام رفتار اعتباری اشخاص حقیقی به تعداد اعضای هیئت مدیره
          </p>
          {
            document.file1 === null ?
              <label htmlFor='file1' className="text-blue-400 text-xs w-full justify-center">
                برای بارگذاری کلیک کنید
              </label> :
              <div>
                <p className="text-blue-400 text-xs w-full m-1 justify-center">
                  {
                    `نام فایل : ${document.file1.name}`
                  }
                </p>
                <label htmlFor='file1' className="text-yellow-400 m-1 text-xs w-full justify-center">
                  برای تغییر کلیک کنید
                </label>
              </div>

          }
          <input style={{ display: "none" }} id='file1' className="text-blue-400 text-xs " accept="application/pdf" type="file" onChange={handelChang} name="file1" />
          <br />
          {errors.file1 && showErr.file1 && <span className="text-red-500 text-xs ">*{errors.file1}</span>}
        </div>
        {/* FILE 2 */}
        <div className="rounded-lg p-2 border text-gray-400 text-xs mt-4">
          <p className="">
            اجازه نامه تکمیل شده استعلام رفتار اعتباری اشخاص حقوقی به نام شرکت
          </p>
          {
            document.file2 === null ?
              <label htmlFor='file2' className="text-blue-400 text-xs w-full justify-center">
                برای بارگذاری کلیک کنید
              </label> :
              <div>
                <p className="text-blue-400 text-xs w-full m-1 justify-center">
                  {
                    `نام فایل : ${document.file2.name}`
                  }
                </p>
                <label htmlFor='file2' className="text-yellow-400 m-1 text-xs w-full justify-center">
                  برای تغییر کلیک کنید
                </label>
              </div>

          }
          <input style={{ display: "none" }} id='file2' className="text-blue-400 text-xs " accept="application/pdf" type="file" onChange={handelChang} name="file2" />
          <br />
          {errors.file2 && showErr.file2 && <span className="text-red-500 text-xs ">*{errors.file2}</span>}
        </div>
        {/* FILE 3 */}
        <div className="rounded-lg p-2 border text-gray-400 text-xs mt-4">
          <p className="">
            فرم مشخصات مشتریان
          </p>
          {
            document.file3 === null ?
              <label htmlFor='file3' className="text-blue-400 text-xs w-full justify-center">
                برای بارگذاری کلیک کنید
              </label> :
              <div>
                <p className="text-blue-400 text-xs w-full m-1 justify-center">
                  {
                    `نام فایل : ${document.file3.name}`
                  }
                </p>
                <label htmlFor='file3' className="text-yellow-400 m-1 text-xs w-full justify-center">
                  برای تغییر کلیک کنید
                </label>
              </div>

          }
          <input style={{ display: "none" }} id='file3' className="text-blue-400 text-xs " accept="application/pdf" type="file" onChange={handelChang} name="file3" />
          <br />
          {errors.file3 && showErr.file3 && <span className="text-red-500 text-xs ">*{errors.file3}</span>}
        </div>
        {/* FILE 4 */}
        <div className="rounded-lg p-2 border text-gray-400 text-xs mt-4">
          <p className="">
            تکمیل فرم 1 - حقوقی
          </p>
          {
            document.file4 === null ?
              <label htmlFor='file4' className="text-blue-400 text-xs w-full justify-center">
                برای بارگذاری کلیک کنید
              </label> :
              <div>
                <p className="text-blue-400 text-xs w-full m-1 justify-center">
                  {
                    `نام فایل : ${document.file4.name}`
                  }
                </p>
                <label htmlFor='file4' className="text-yellow-400 m-1 text-xs w-full justify-center">
                  برای تغییر کلیک کنید
                </label>
              </div>

          }
          <input style={{ display: "none" }} id='file4' className="text-blue-400 text-xs " accept="application/pdf" type="file" onChange={handelChang} name="file4" />
          <br />
          {errors.file4 && showErr.file4 && <span className="text-red-500 text-xs ">*{errors.file4}</span>}
        </div>
        {/* FILE 5 */}
        <div className="rounded-lg p-2 border text-gray-400 text-xs mt-4">
          <p className="">
            شناسنامه ضمانت نامه          </p>
          {
            document.file5 === null ?
              <label htmlFor='file5' className="text-blue-400 text-xs w-full justify-center">
                برای بارگذاری کلیک کنید
              </label> :
              <div>
                <p className="text-blue-400 text-xs w-full m-1 justify-center">
                  {
                    `نام فایل : ${document.file5.name}`
                  }
                </p>
                <label htmlFor='file5' className="text-yellow-400 m-1 text-xs w-full justify-center">
                  برای تغییر کلیک کنید
                </label>
              </div>

          }
          <input style={{ display: "none" }} id='file5' className="text-blue-400 text-xs " accept="application/pdf" type="file" onChange={handelChang} name="file5" />
          <br />
          {errors.file5 && showErr.file5 && <span className="text-red-500 text-xs ">*{errors.file5}</span>}
        </div>
      </div>
    </div>)
}
