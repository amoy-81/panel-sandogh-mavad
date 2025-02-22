import { GoX } from "react-icons/go";

function WarrantyDocsUpload() {
  const isLoading = false;
  return (
    <div className=" ">
      <h2 className="p-6 text-2xl font-bold">
        بارگذاری مدارک درخواست ضمانت نامه
      </h2>
      <div className=" mx-16 bg-white rounded-3xl pb-6">
        <div className=" w-full flex gap-4 p-6">
          <select
            className=" w-1/2 border border-p-7 p-2 rounded-xl text-g-5 outline-none"
            name=""
            id="">
            <option value="">تعیین نوع ضمانت</option>
            <option value="">تعیین نوع ضمانت2</option>
          </select>
          <select
            className=" w-1/2 border border-p-7 p-2 rounded-xl text-g-5 outline-none"
            name=""
            id="">
            <option value="">تعیین نوع ضمانت</option>
            <option value="">تعیین نوع ضمانت2</option>
          </select>
        </div>

        <h2 className=" p-6 pt-0  text-xl font-bold">بارگذاری مدارک</h2>
        <hr className="w-full border-2 border-dashed border-g-2" />
        <div className=" text-g-6 m-6">
          <p className=" font-bold text-sm text-g-6">
            <span className=" text-p-7">توضیحات : </span>
            لطفا فایل های موردنظر را در قسمت خواسته شده بارگذاری کنید .
          </p>
          <p className=" text-sm">فرمت های مجاز: doc , png , jpg</p>
        </div>
        <hr className="w-full border-2 border-dashed border-g-2" />
        <div className=" w-full flex gap-4 p-6">
          {/* box */}
          <div className=" w-1/2 border border-g-4 p-2 rounded-xl text-g-5 ">
            <div className=" w-full flex justify-between p-2">
              <p className=" text-xs text-backColor">نامه درخواست ضمانتنامه</p>
              <GoX />
            </div>
            {/* prosses bar */}
            <div className=" p-2">
              <div className="w-full bg-g-2 rounded-full h-2.5">
                <div
                  className=" bg-secondary h-2.5 rounded-full"
                  style={{ width: "45%" }}></div>
              </div>
            </div>
          </div>
          {/* box */}
          <div className=" w-1/2 border border-g-4 p-2 rounded-xl text-g-5 ">
            <div className=" w-full flex justify-between p-2">
              <p className=" text-xs text-backColor">نامه حد اعتباری</p>
              <GoX />
            </div>
            {/* prosses bar */}
            <div className=" p-2">
              <div className="w-full bg-g-2 rounded-full h-2.5">
                <div
                  className=" bg-secondary h-2.5 rounded-full"
                  style={{ width: "45%" }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full flex justify-center">
          <button
            disabled={isLoading}
            className={
              isLoading
                ? " text-white py-4 bg-g-6 hover:bg-g-7 rounded-lg w-2/3"
                : " text-white py-4 bg-secondary hover:bg-secondary rounded-lg w-2/3"
            }>
            ورود
          </button>
        </div>
      </div>
    </div>
  );
}

export default WarrantyDocsUpload;
