import React from "react";

function CreditLimit() {
  return (
    <div className="px-5">
      <div className=" py-6">
        <p className="text-xl font-extrabold">بارگیری و بارگذاری مدارک</p>
      </div>
      <div className=" flex gap-4 w-full px-2">
        <div className=" bg-white rounded-xl p-5 w-1/2">
          <div className=" pb-4">
            <p className=" font-bold"> مدارک اولیه </p>
          </div>
          <hr className="border-dashed border-gray-300" />
          <p className="text-xs py-3">
            <span className="text-p-7"> توضیحات :</span> فایل را از حالت فشرده
            خارج کنید و هر فرم را پر کنید سپس در جای مناسب بارگذاری کنید
          </p>
          <p className="text-xs py-3">
            فرمت های مجاز doc, docx, pdf, zip, png, jpg
          </p>
          <a href="https://backend.nanotf.ir/storage/docs/1_6271033281.zip">
            <button className="w-full border rounded-lg border-p-7 text-p-7 p-2 hover:bg-p-7 hover:text-white transition font-bold text-sm">
              بارگیری فایل مدارک اصلی
            </button>
          </a>
          <br />
          <br />
          <hr className="border-dashed border-gray-300" />

          {/* FILE 1 */}
          <div className="rounded-lg p-2 border text-gray-400 text-xs mt-4">
            <p className="">تصویر مجوز ها و گواهی نامه های اخذ شده توسط شرکت</p>
            <label
              htmlFor="file1"
              className=" text-secondary text-xs w-full justify-center">
              برای بارگذاری کلیک کنید
            </label>
            <input
              style={{ display: "none" }}
              id="file1"
              className=" text-secondary text-xs "
              accept="application/pdf"
              type="file"
              name="file1"
            />
          </div>
          {/* FILE 1 */}
          <div className="rounded-lg p-2 border text-gray-400 text-xs mt-4">
            <p className="">تصویر مجوز ها و گواهی نامه های اخذ شده توسط شرکت</p>
            <label
              htmlFor="file1"
              className=" text-secondary text-xs w-full justify-center">
              برای بارگذاری کلیک کنید
            </label>
            <input
              style={{ display: "none" }}
              id="file1"
              className=" text-secondary text-xs "
              accept="application/pdf"
              type="file"
              name="file1"
            />
          </div>
          {/* FILE 1 */}
          <div className="rounded-lg p-2 border text-gray-400 text-xs mt-4">
            <p className="">تصویر مجوز ها و گواهی نامه های اخذ شده توسط شرکت</p>
            <label
              htmlFor="file1"
              className=" text-secondary text-xs w-full justify-center">
              برای بارگذاری کلیک کنید
            </label>
            <input
              style={{ display: "none" }}
              id="file1"
              className=" text-secondary text-xs "
              accept="application/pdf"
              type="file"
              name="file1"
            />
          </div>
          {/* FILE 1 */}
          <div className="rounded-lg p-2 border text-gray-400 text-xs mt-4">
            <p className="">تصویر مجوز ها و گواهی نامه های اخذ شده توسط شرکت</p>
            <label
              htmlFor="file1"
              className=" text-secondary text-xs w-full justify-center">
              برای بارگذاری کلیک کنید
            </label>
            <input
              style={{ display: "none" }}
              id="file1"
              className=" text-secondary text-xs "
              accept="application/pdf"
              type="file"
              name="file1"
            />
          </div>
        </div>
        <div className=" w-1/2 p-5 bg-white rounded-xl ">
          <div className=" pb-4">
            <p className=" font-bold">اسناد</p>
          </div>
          <hr className="border-dashed border-gray-300" />
          <div className="rounded-lg flex flex-col justify-center bg-white p-2 border text-gray-400 text-xs mt-4">
            <p className="">تصویر مجوز ها و گواهی نامه های اخذ شده توسط شرکت</p>
            <label className="text-blue-400 text-xs w-full justify-center">
              برای بارگذاری کلیک کنید
            </label>
            <input
              style={{ display: "none" }}
              className="text-blue-400 text-xs "
              accept="application/pdf"
              type="file"
              multiple
            />
          </div>
          <div className="rounded-lg flex flex-col justify-center bg-white p-2 border text-gray-400 text-xs mt-4">
            <p className="">تصویر مجوز ها و گواهی نامه های اخذ شده توسط شرکت</p>
            <label className="text-blue-400 text-xs w-full justify-center">
              برای بارگذاری کلیک کنید
            </label>
            <input
              style={{ display: "none" }}
              className="text-blue-400 text-xs "
              accept="application/pdf"
              type="file"
              multiple
            />
          </div>
          <div className="rounded-lg flex flex-col justify-center bg-white p-2 border text-gray-400 text-xs mt-4">
            <p className="">تصویر مجوز ها و گواهی نامه های اخذ شده توسط شرکت</p>
            <label className="text-blue-400 text-xs w-full justify-center">
              برای بارگذاری کلیک کنید
            </label>
            <input
              style={{ display: "none" }}
              className="text-blue-400 text-xs "
              accept="application/pdf"
              type="file"
              multiple
            />
          </div>
          <div className="rounded-lg flex flex-col justify-center bg-white p-2 border text-gray-400 text-xs mt-4">
            <p className="">تصویر مجوز ها و گواهی نامه های اخذ شده توسط شرکت</p>
            <label className="text-blue-400 text-xs w-full justify-center">
              برای بارگذاری کلیک کنید
            </label>
            <input
              style={{ display: "none" }}
              className="text-blue-400 text-xs "
              accept="application/pdf"
              type="file"
              multiple
            />
          </div>
          <div className="rounded-lg flex flex-col justify-center bg-white p-2 border text-gray-400 text-xs mt-4">
            <p className="">تصویر مجوز ها و گواهی نامه های اخذ شده توسط شرکت</p>
            <label className="text-blue-400 text-xs w-full justify-center">
              برای بارگذاری کلیک کنید
            </label>
            <input
              style={{ display: "none" }}
              className="text-blue-400 text-xs "
              accept="application/pdf"
              type="file"
              multiple
            />
          </div>
          <div className="rounded-lg flex flex-col justify-center bg-white p-2 border text-gray-400 text-xs mt-4">
            <p className="">تصویر مجوز ها و گواهی نامه های اخذ شده توسط شرکت</p>
            <label className="text-blue-400 text-xs w-full justify-center">
              برای بارگذاری کلیک کنید
            </label>
            <input
              style={{ display: "none" }}
              className="text-blue-400 text-xs "
              accept="application/pdf"
              type="file"
              multiple
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreditLimit;
