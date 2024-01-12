import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillFolder } from "react-icons/ai";
import Modal from "../../../components/modal/Modal";
import useRequests from "../../../hooks/useRequests";
import Loader from "../../../components/loader/Loader";
import { onlyDateConversion } from "../../../helper/dateConversion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ExpertNewTicket() {
  // tools
  const authState = useSelector((state) => state.authState.userData);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //   currentRequests Api
  const {
    response: currentRequestsRes,
    error: currentRequestsErr,
    loading: currentRequestsLoading,
    getRequest: getCurrentRequests,
  } = useRequests({ url: `/admin/get_current_requests/${authState.id}` });

  // new Ticket Api
  const {
    response: newTicketRes,
    error: newTicketErr,
    loading: newTicketLoading,
    postRequest: sendNewTicket,
  } = useRequests({
    url: "/admin/ticket_expert",
    header: { "Content-Type": "multipart/form-data" },
  });

  //   state
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("facilities");
  const [selectedReq, setSelectedReq] = useState(null);

  const [showCurrentRequests, setShowCurrentRequests] = useState(false);

  // use Effects
  useEffect(() => {
    if (showCurrentRequests) {
      getCurrentRequests();
    }
  }, [showCurrentRequests]);

  // after new ticket res
  useEffect(() => {
    if (newTicketRes) {
      toast.success("تیکت ثبت شد", { autoClose: 2000 });
      setTimeout(() => {
        navigate(
          `/${
            authState.type === "genuine" || authState.type === "legal"
              ? "user"
              : authState.type
          }/view-tikets`
        );
      }, 1000);
    }
  }, [newTicketRes]);

  //   handler functions
  const onSubmit = (values) => {
    const ticketValues = {
      ...values,
      file,
      category,
      priority: "normal",
      request_id: selectedReq ? selectedReq.id : null,
    };
    sendNewTicket(ticketValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {newTicketLoading && <Loader />}
      <div className=" py-6">
        <p className="text-xl font-extrabold text-titlesColor">ثبت تیکت </p>
      </div>
      <div className=" flex gap-2">
        <button
          onClick={() => setShowCurrentRequests(true)}
          className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {selectedReq ? "تغییر درخواست" : "انتخاب درخواست"}
        </button>
        {selectedReq && (
          <button
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-gray-300 hover:bg-gray-50"
          >
            شناسه درخواست : {selectedReq.shenaseh}
          </button>
        )}
      </div>
      <input
        {...register("title", { required: "این فیلد الزامیست" })}
        type="text"
        className={
          errors.title
            ? "w-full mt-5 p-4 bg-transparent rounded-2xl border border-b border-red-500  outline-none "
            : "w-full mt-5 p-4 bg-transparent rounded-2xl border-0 border-b border-gray-400  outline-none "
        }
        placeholder="عنوان پیام"
      />
      <div className="flex flex-row  justify-normal w-full items-center m-3 text-center">
        <div className="flex 	items-center m-3 text-center">
          <p className="font-bold text-titlesColor ">*خدمات:</p>
          {/* warranty */}
          <input
            type="radio"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            value="warranty"
            className="relative overflow-hidden mx-2 w-5 border rounded-full h-full"
          />
          <p className="font-bold ">ضمانت نامه</p>
          {/* facilities */}
          <input
            type="radio"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            value="facilities"
            className="relative overflow-hidden mx-2 w-5 rounded h-full"
          />
          <p className="font-bold ">تسهیلات</p>
          {/* other */}
          <input
            type="radio"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            value="other"
            className="relative overflow-hidden mx-2 w-5 rounded h-full"
          />
          <p className="font-bold ">عمومی</p>
        </div>
      </div>
      <div className="relative">
        <textarea
          {...register("body", { required: "این فیلد الزامیست" })}
          placeholder="متن پیام "
          cols="30"
          rows="10"
          className={
            errors.body
              ? "w-full p-4 bg-transparent rounded-2xl border border-red-500  outline-none  "
              : "w-full p-4 bg-transparent rounded-2xl border border-gray-400  outline-none  "
          }
        ></textarea>
      </div>
      <div className="p-6 mt-3  bg-white rounded-xl">
        <div className="flex flex-col bg-p-2 justify-center items-center rounded-xl relative border-[3px] border-gray-300 border-dashed">
          <AiFillFolder className="text-3xl mt-2 text-primary" />
          {!file && (
            <p className="text-sm my-2">
              فایل پر شده را بکشید و اینجا رها کنید
            </p>
          )}
          {file && (
            <p className="text-sm my-2">
              فایل : <span className=" text-g-6">{file.name}</span>
            </p>
          )}
          <div className="flex w-40 justify-center items-center">
            <hr className="w-full border-gray-400" />
            <p className="px-1">یا</p>
            <hr className="w-full border-gray-400" />
          </div>
          <p className="p-3 px-12 my-3 rounded-xl text-white bg-primary">
            {file ? "تغییر فایل" : "انتخاب فایل"}
          </p>
          <input
            type="file"
            name="file"
            id=""
            onChange={(e) => setFile(e.target.files[0])}
            onDrop={(e) => setFile(e.target.files[0])}
            className="opacity-0 w-full h-full absolute top-0"
          />
        </div>
      </div>
      <button
        disabled={newTicketLoading}
        className={
          newTicketLoading
            ? "p-3 w-full bg-g-6 rounded-xl text-white my-3"
            : "p-3 w-full bg-primary rounded-xl text-white my-3"
        }
      >
        {newTicketLoading ? "درحال ارسال تیکت..." : "ارسال تیکت"}
      </button>

      {/* Modal */}
      <Modal
        isOpen={showCurrentRequests}
        close={setShowCurrentRequests}
        title={"درخواست های جاری"}
        body={"یک درخواست را انتخاب نمایید"}
      >
        {currentRequestsLoading && <Loader />}
        <table className=" w-full">
          <thead className="">
            <tr className="bg-[#f9f9f9] text-g-6 font-semibold">
              <th className=" p-2">شناسه درخواست</th>
              <th>نوع درخواست</th>
              <th>تاریخ ثبت درخواست</th>
            </tr>
          </thead>
          <tbody>
            {currentRequestsRes &&
              currentRequestsRes.map((requestItem, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    setSelectedReq(requestItem);
                    setShowCurrentRequests(false);
                  }}
                  className=" border-dashed border-b-[2px] border-[#E8E8EA] hover:bg-p-1 cursor-pointer text-center"
                >
                  <td className=" py-2 font-extralight">
                    {requestItem.shenaseh}
                  </td>
                  <td className=" font-extralight">
                    {requestItem.type === "warranty"
                      ? "ضمانتنامه"
                      : requestItem.type === "facilities"
                      ? "تسهیلات"
                      : "حد اعتباری"}
                  </td>
                  <td className=" font-extralight text-g-6">
                    {onlyDateConversion(requestItem.created_at)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Modal>
    </form>
  );
}

export default ExpertNewTicket;
