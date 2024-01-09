import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function RecordEvidence() {
  const { requestId } = useParams();
  const navigate = useNavigate();

  return (
    <div className=" relative w-full flex justify-center">
      <div className=" w-2/3 p-4 bg-white rounded-xl">
        <h1 className=" p-2 font-extrabold">
          مرحله ۳ - آپلود مدارک توسط کاربر
        </h1>
        {/* upload mode */}

        <p className=" p-2 text-g-6 text-sm">
          این مرحله باید توسط کاربر تکمیل گردد.
          <span className=" font-light text-g-5">
            پس از تکمیل به مرحله بعد منتقل می شوید
          </span>
        </p>
      </div>
    </div>
  );
}

export default RecordEvidence;
