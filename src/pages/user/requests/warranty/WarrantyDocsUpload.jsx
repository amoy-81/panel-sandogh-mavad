import { useEffect, useState } from "react";
import FileInput from "./components/FileInput";
import useAuth from "../../../../auth/useAuth";
import useRequests from "../../../../hooks/useRequests";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function WarrantyDocsUpload() {
  // tools
  const { userData } = useAuth();

  const navigate = useNavigate()

  const [errorButton, setErrorButton] = useState(false);

  const {
    response: subResponse,
    error: subError,
    loading: subLoading,
    postRequest: subPostRequest,
    percentProgress: subPercent,
  } = useRequests({
    url: "/v1/request",
    header: { "Content-Type": "multipart/form-data" },
  });

  const [reqPayloadData, setReqPayloadData] = useState({
    user_id: userData.id,
    type: "bond",
    title: `${userData.name} ${userData.family}`,
    type_b: "job",
    offered_bail: "property",
    letter: null,
    credit: null,
  });

  const onSubmit = () => {
    if (reqPayloadData.letter && reqPayloadData.credit) {
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
      toast.success("درخواست ثبت شد", { autoClose: 1000 });
      navigate(`/user/current-requests`);
    }
  }, [subResponse]);

  return (
    <div className=" ">
      <h2 className="p-6 text-2xl font-bold">
        بارگذاری مدارک درخواست ضمانت نامه
      </h2>
      <div className=" mx-16 max-lg:mx-auto bg-white rounded-3xl pb-6">
        <div className=" w-full flex max-lg:flex-col gap-4 p-6">
          <select
            className=" w-1/2 max-lg:w-full border border-p-7 p-2 rounded-xl text-g-5 outline-none"
            onChange={(e) =>
              setReqPayloadData((prev) => ({ ...prev, type_b: e.target.value }))
            }
            name=""
            id=""
          >
            <option value="" disabled selected>
              {" "}
              نوع ضمانت نامه را انتخاب کنید
            </option>
            <option value="job">حسن انجام کار </option>
            <option value="commitments">حسن انجام تعهدات</option>
            <option value="deduction">کسور وجه الضمان</option>
            <option value="prepayment">پیش پرداخت</option>
            <option value="commitment_pay">تعهد پرداخت</option>
            <option value="tender_offer">شرکت در مناقصه</option>
            <option value="credit">حد اعتباری</option>
          </select>
          <select
            className=" w-1/2 max-lg:w-full border border-p-7 p-2 rounded-xl text-g-5 outline-none"
            onChange={(e) =>
              setReqPayloadData((prev) => ({
                ...prev,
                offered_bail: e.target.value,
              }))
            }
            name=""
            id=""
          >
            <option value="" disabled selected>
              {" "}
              نوع وثیقه را انتخاب کنید
            </option>
            <option value="property">وثیقه ملکی</option>
            <option value="cheque">چک</option>
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
        <div className=" w-full flex max-lg:flex-col gap-4 p-6">
          {/* box */}
          <FileInput
            currentValue={reqPayloadData.letter}
            setCurrentValue={setReqPayloadData}
            prossesPercent={subPercent}
            loading={subLoading}
            name={"letter"}
            title={"نامه درخواست ضمانت"}
          />
          {/* box */}
          <FileInput
            currentValue={reqPayloadData.credit}
            setCurrentValue={setReqPayloadData}
            prossesPercent={subPercent}
            loading={subLoading}
            name={"credit"}
            title={"نامه حد اعتباری"}
          />
        </div>
        <div className=" w-full flex justify-center">
          <button
            onClick={onSubmit}
            disabled={subLoading}
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

export default WarrantyDocsUpload;
