import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FileInput from "./components/FileInput";
import useRequests from "../../../../hooks/useRequests";
import { toast } from "react-toastify";
import Loader from "../../../../components/loader/Loader";

function WarrantyComplet() {
  const { bondId } = useParams();

  const navigate = useNavigate();

  const [errorButton, setErrorButton] = useState(false);

  const {
    response: subResponse,
    error: subError,
    loading: subLoading,
    postRequest: subPostRequest,
    percentProgress: subPercent,
  } = useRequests({
    url: "/v1/evidence",
    header: { "Content-Type": "multipart/form-data" },
  });

  const {
    response: getWageResponse,
    error: getWageError,
    loading: getWageLoading,
    getRequest: getWageRequest,
  } = useRequests({
    url: `/get_wage/${bondId}`,
  });

  const [reqPayloadData, setReqPayloadData] = useState({
    bond_id: bondId,
    file1: null,
    file2: null,
    file3: null,
  });

  const onSubmit = () => {
    if (reqPayloadData.file1 && reqPayloadData.file2 && reqPayloadData.file3) {
      subPostRequest(reqPayloadData);
    } else {
      toast.error("لطفا هردو فیلد مربوط به فایل را کامل کنید", {
        autoClose: 2000,
      });
      setErrorButton(true);
      setTimeout(() => {
        setErrorButton(false);
      }, 2000);
    }
  };

  // request to success
  useEffect(() => {
    if (subResponse) {
      toast.success("درخواست با موفقیت ثبت شد", { autoClose: 2000 });
      navigate(`/user/current-requests`);
    }
  }, [subResponse]);

  if (getWageLoading) return <Loader />;

  return (
    <div className=" ">
      <h2 className="p-6 text-2xl font-bold">بارگذاری تصویر مدارک</h2>
      <div className=" mx-16 max-lg:mx-auto bg-white rounded-3xl pb-6">
        <h2 className=" p-6   text-xl font-bold">محل تصویر مدارک </h2>

        <hr className="w-full border-2 border-dashed border-g-2" />
        <div className=" w-full flex max-lg:flex-col gap-4 p-6">
          {/* box */}
          <FileInput
            currentValue={reqPayloadData.file1}
            setCurrentValue={setReqPayloadData}
            prossesPercent={subPercent}
            loading={subLoading}
            name={"file1"}
            title={"تصویر فیش واریز کارمزد"}
          />
          {/* box */}
          <FileInput
            currentValue={reqPayloadData.file2}
            setCurrentValue={setReqPayloadData}
            prossesPercent={subPercent}
            loading={subLoading}
            name={"file2"}
            title={"تصویر فیش واریز سپرده"}
          />
          {/* box */}
          <FileInput
            currentValue={reqPayloadData.file3}
            setCurrentValue={setReqPayloadData}
            prossesPercent={subPercent}
            loading={subLoading}
            name={"file3"}
            title={"تصویر چک وثیقه"}
          />
        </div>
        <div className=" w-full flex justify-center">
          <button
            disabled={subLoading}
            onClick={onSubmit}
            className={
              errorButton
                ? " transition text-white py-4 bg-red-600 rounded-lg w-2/3"
                : subLoading
                ? " transition text-white py-4 bg-g-6 hover:bg-g-7 rounded-lg w-2/3"
                : " transition text-white py-4 bg-secondary hover:bg-secondary rounded-lg w-2/3"
            }
          >
            {errorButton
              ? "خطا در تکمیل اطلاعات"
              : subLoading
              ? "در حال ارسال..."
              : "ثبت درخواست"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default WarrantyComplet;
