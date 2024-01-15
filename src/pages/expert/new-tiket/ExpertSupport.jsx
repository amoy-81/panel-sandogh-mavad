import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useRequests from "../../../hooks/useRequests";
import Message from "../../user/tiket/components/Message";
import SupportMessage from "../../user/tiket/components/SupportMessage";
import useAuth from "../../../auth/useAuth";
import Loader from "../../../components/loader/Loader";
import MessageGenerator from "../../user/tiket/components/MessageGenerator";
import { toast } from "react-toastify";

function ExpertSupport() {
  const { userData } = useAuth();
  const { tiketId } = useParams();

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
    postRequest: generateMessage,
  } = useRequests({
    url: `/admin/reply_ticket/${tiketId}`,
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
      <MessageGenerator send={generateMessage}  res={generateMessageResponse} />
    </div>
  );
}

export default ExpertSupport;
