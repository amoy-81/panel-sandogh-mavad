import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";

function DoesNotExist() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  return (
    <div className=" flex flex-col items-center justify-center h-screen gap-5">
      <h1 className=" font-semibold text-titlesColor">
        درخواسته مورد نظر وجود ندارد
      </h1>
      <button
        onClick={() =>
          navigate(
            `/${
              userData.type === "genuine" || userData.type === "legal"
                ? `user`
                : userData.type
            }/notifications`
          )
        }
        className=" p-2 bg-secondary rounded-md text-white"
      >
        بازگشت
      </button>
    </div>
  );
}

export default DoesNotExist;
