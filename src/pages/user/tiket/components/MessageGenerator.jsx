import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineAttachment } from "react-icons/md";
import { LiaRocketchat } from "react-icons/lia";

function MessageGenerator({ send, res }) {
  const [paylod, setPayload] = useState({
    body: "",
    file: null,
  });

  const onSubmit = () => {
    if (paylod.body.length > 0) {
      send(paylod);
    }
  };

  useEffect(() => {
    setPayload({
      body: "",
      file: null,
    });
  }, [res]);
  return (
    <>
      <div className=" w-full py-2">
        {paylod.file && (
          <div className=" w-fit bg-white p-4 max-lg:px-0 flex items-center gap-4 rounded-2xl">
            <MdOutlineAttachment className=" text-3xl text-g-6 cursor-pointer" />
            <p>نام فایل : {paylod.file.name}</p>
            <AiOutlineClose
              onClick={() => setPayload((prev) => ({ ...prev, file: null }))}
              className=" hover:text-red-600 cursor-pointer"
            />
          </div>
        )}
      </div>
      <div className=" w-full flex justify-center gap-2">
        <div className=" flex gap-4 rounded-2xl border-2 bg-white border-g-5 flex-1 p-3">
          <input
            type="text"
            value={paylod.body}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, body: e.target.value }))
            }
            className="  w-full outline-none p-0"
          />
          <label htmlFor="tiketFile">
            <MdOutlineAttachment className=" text-3xl text-g-6 cursor-pointer" />
          </label>
        </div>
        <input
          type="file"
          id="tiketFile"
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, file: e.target.files[0] }))
          }
          className=" hidden"
        />
        <button
          disabled={paylod.body.length > 0 ? false : true}
          onClick={onSubmit}
          className=" lg:hidden bg-secondary py-2 px-4 rounded-2xl text-white"
        >
          <LiaRocketchat className=" text-2xl" />
        </button>
        <button
          disabled={paylod.body.length > 0 ? false : true}
          onClick={onSubmit}
          className=" max-lg:hidden bg-secondary py-2 px-5 rounded-2xl text-white"
        >
          ارسال
        </button>
      </div>
    </>
  );
}

export default MessageGenerator;
