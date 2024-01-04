import React from "react";

function EnumResource({ values, setValues }) {
  // change handler
  const changeHandler = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {/* gender */}
      <div className="w-2/3 flex flex-wrap my-7">
        <div className=" w-1/2 flex items-center gap-4">
          <p className=" font-bold">جنسیت :</p>
          <div className=" flex items-center gap-2">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              className="appearance-none w-5 h-5 border-2 border-s-400 rounded bg-[#E8F0F84D] mt-1 checked:bg-secondary checked:border-none "
              onClick={changeHandler}
            />
            <label
              htmlFor="male"
              className={values.gender === "male" ? " text-s-5" : "text-black"}
            >
              مرد
            </label>
          </div>
          <div className=" flex items-center gap-2">
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              className="appearance-none w-5 h-5 border-2 border-s-400 rounded bg-[#E8F0F84D] mt-1 checked:bg-secondary checked:border-none "
              onClick={changeHandler}
            />
            <label
              htmlFor="female"
              className={
                values.gender === "female" ? " text-s-5" : "text-black"
              }
            >
              زن
            </label>
          </div>
        </div>
        {/* resident */}
        <div className=" w-1/2 flex items-center gap-4">
          <p className=" font-bold">وضعیت تعهل :</p>
          <div className=" flex items-center gap-2">
            <input
              type="radio"
              id="single"
              name="marital"
              value="single"
              className="appearance-none w-5 h-5 border-2 border-s-400 rounded bg-[#E8F0F84D] mt-1 checked:bg-secondary checked:border-none "
              onClick={changeHandler}
            />
            <label
              htmlFor="single"
              className={
                values.marital === "single" ? " text-s-5" : "text-black"
              }
            >
              مجرد
            </label>
          </div>
          <div className=" flex items-center gap-2">
            <input
              type="radio"
              id="married"
              name="marital"
              value="married"
              className="appearance-none w-5 h-5 border-2 border-s-400 rounded bg-[#E8F0F84D] mt-1 checked:bg-secondary checked:border-none "
              onClick={changeHandler}
            />
            <label
              htmlFor="married"
              className={
                values.marital === "married" ? " text-s-5" : "text-black"
              }
            >
              متعهل
            </label>
          </div>
        </div>
        {/* resident */}
        <div className=" w-1/2 flex items-center gap-4 mt-4">
          <p className=" font-bold">وضعیت اقامت :</p>
          <div className=" flex items-center gap-2">
            <input
              type="radio"
              id="resident"
              name="residential"
              value="resident"
              className="appearance-none w-5 h-5 border-2 border-s-400 rounded bg-[#E8F0F84D] mt-1 checked:bg-secondary checked:border-none "
              onClick={changeHandler}
            />
            <label
              htmlFor="resident"
              className={
                values.residential === "resident" ? " text-s-5" : "text-black"
              }
            >
              مقیم
            </label>
          </div>
          <div className=" flex items-center gap-2">
            <input
              type="radio"
              id="non_resident"
              name="residential"
              value="non_resident"
              className="appearance-none w-5 h-5 border-2 border-s-400 rounded bg-[#E8F0F84D] mt-1 checked:bg-secondary checked:border-none "
              onClick={changeHandler}
            />
            <label
              htmlFor="non_resident"
              className={
                values.residential === "non_resident" ? " text-s-5" : "text-black"
              }
            >
              غیر مقیم
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default EnumResource;
