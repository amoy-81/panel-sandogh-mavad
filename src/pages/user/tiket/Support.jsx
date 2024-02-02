import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRequests from "../../../hooks/useRequests";
import Message from "./components/Message";
import SupportMessage from "./components/SupportMessage";
import useAuth from "../../../auth/useAuth";
import Loader from "../../../components/loader/Loader";
import MessageGenerator from "./components/MessageGenerator";
import { toast } from "react-toastify";

function Support() {
  const { userData } = useAuth();
  const { tiketId } = useParams();
  const navigate = useNavigate()

  const {
    response: tiketResponse,
    error: tiketError,
    loading: tiketLoading,
    getRequest: getTiket,
  } = useRequests({
    url: `/v1/ticket/${tiketId}`,
  });

  const {
    response: generateMessageResponse,
    error: generateMessageError,
    loading: generateMessageLoading,
    putRequest: generateMessage,
  } = useRequests({
    url: `/v1/ticket/${tiketId}`,
    header: { "Content-Type": "multipart/form-data" },
  });

  useEffect(() => {
    getTiket();
  }, [generateMessageResponse]);

  useEffect(() => {
    if (generateMessageError) {
      if (typeof(generateMessageError) === 'object') {
        Object.keys(generateMessageError).map(filde => toast.error(generateMessageError[filde][0]))
      }
    }
  } , [generateMessageError])
  return (
    <div className=" relative h-full flex flex-col justify-between p-4">
      {(tiketLoading || generateMessageLoading) && <Loader />}
      <div className=" flex justify-between bg-white rounded-t-2xl font-bold p-6 shadow-xl z-30 ">
        پشتیبانی - تیکت شماره {`${tiketId}`}
        <button className=" p-2 bg-secondary text-white font-semibold">بازگشت</button>
      </div>
      {/* messages */}
      <div className=" sc h-[55vh] bg-white flex flex-col-reverse rounded-b-2xl overflow-auto p-4 max-lg:px-0">
        {tiketResponse?.message
          .reverse()
          .map((msg, index) =>
            msg.user_id === userData.id ? (
              <Message key={index} {...msg} />
            ) : (
              <SupportMessage key={index} {...msg} />
            )
          )}
      </div>
      <MessageGenerator send={generateMessage} />
    </div>
  );
}

export default Support;
