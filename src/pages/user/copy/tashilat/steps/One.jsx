import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from "../../../../../core/http-service";
import { TashilatContext } from "../../../../../contexts/Tashilat.Provider";
import Loader from "../../../../../components/loader/Loader";
import useAuth from "../../../../../auth/useAuth";
// import { ValidationRequest } from "../../../helper/validationRequest";

export default function One() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { stepOne, setStepOne } = useContext(TashilatContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showErr, setShowErr] = useState(false);

  const [confirmationDate, setConfirmationDate] = useState({
    year: "1400",
    month: "02",
    day: "02",
  });
  const [expirationDate, setExpirationDate] = useState({
    year: "1400",
    month: "02",
    day: "02",
  });

  useEffect(() => {
    userData &&
      setStepOne((prev) => {
        return {
          ...prev,
          user_id: userData.id,
        };
      });
    if (stepOne.is_knowledge) {
      setStepOne((prev) => {
        return {
          ...prev,
          confirmation: `${confirmationDate.year}-${confirmationDate.month}-${confirmationDate.day}`,
        };
      });
      setStepOne((prev) => {
        return {
          ...prev,
          expiration: `${expirationDate.year}-${expirationDate.month}-${expirationDate.day}`,
        };
      });
    }
  }, [userData, confirmationDate, expirationDate]);

  // changeHandler ...
  const changeHandler = (e) => {
    if (e.target.type === "radio") {
      if (e.target.value === "true") {
        setStepOne((prevState) => {
          return {
            ...prevState,
            [e.target.name]: !!e.target.value,
          };
        });
      } else {
        setStepOne((prevState) => {
          return {
            ...prevState,
            [e.target.name]: !e.target.value,
          };
        });
      }
    } else if (
      e.target.name === "history" ||
      e.target.name === "activity" ||
      e.target.name === "title" ||
      e.target.name === "type_f" ||
      e.target.name === "area"
    ) {
      setStepOne((prevState) => {
        return {
          ...prevState,
          [e.target.name]: e.target.value,
        };
      });
    } else if (
      e.target.type === "textarea" ||
      e.target.type === "number" ||
      e.target.type === "select-one"
    ) {
      setStepOne((prevState) => {
        const updatedPlaces = prevState.places.map((place, index) => {
          if (index === parseInt(e.target.id)) {
            return {
              ...place,
              [e.target.name]: e.target.value,
            };
          }
          return place;
        });
        return {
          ...prevState,
          places: updatedPlaces,
        };
      });
    }
    console.log(stepOne);
  };
  // date ...
  const dateChangeHandler = (e) => {
    if (e.target.name === "confirmation") {
      setConfirmationDate((prev) => {
        return {
          ...prev,
          [e.target.id]: e.target.value,
        };
      });
    } else if (e.target.name === "expiration") {
      setExpirationDate((prev) => {
        return {
          ...prev,
          [e.target.id]: e.target.value,
        };
      });
    }
  };
  const subHandler = () => {
    setShowErr(false);
    let errorsA = {};
    Object.keys(stepOne).map((item) => {
      if (item !== "places") {
        if (stepOne[item] === "") {
          errorsA[item] = "این فیلد نباید خالی باشد";
        }
      } else if (item === "places") {
        stepOne.places.map((item, index) => {
          Object.keys(stepOne.places[index]).map((item2) => {
            if (stepOne.places[index][item2] === "") {
              errorsA[`${item2}_${index}`] = "این فیلد نباید خالی باشد";
            }
          });
        });
      }
    });
    if (!Object.keys(errorsA).length) {
      setIsLoading(true);

      Axios.post("/v1/request", stepOne)
        .then((res) => {
          console.log(res.data);
          navigate(`/user/tashilat/2?last_id=${res.data.last_id}`);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      setShowErr(errorsA);
    }
  };

  if (isLoading) return <Loader />;
  return (
    <>
      <>
        <div className=" ">
          <div className=" py-6 mt-4">
            <p className="text-lg font-extrabold">اطلاعات درخواست</p>
          </div>
          <table className="w-full rounded-xl overflow-hidden">
            <thead>
              <tr className=" sticky top-0   ">
                <th className="bg-white p-3 "> نام شرکت متقاضی </th>
                <th className="bg-white p-3 ">نوع درخواست </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <td className="p-4 text-xs text-gray-600 font-bold">
                  <input
                    type="text"
                    id="title"
                    // placeholder="متن عنوان..."
                    className="block w-1/2 rounded-md ml-4 border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    onChange={changeHandler}
                    value={stepOne.title}
                    name="title"
                  />
                </td>
                <td className="p-4 text-xs text-gray-600 font-bold">
                  <select
                    name="type_f"
                    onChange={changeHandler}
                    id=""
                    className="border-gray-300 rounded-md  text-xs w-[200px]"
                  >
                    <option value="leasing">لیزینگ</option>
                    <option value="saturation">اشباع</option>
                    <option value="fund">سرمایه در گردش</option>
                    <option value="prototyping">نمونه سازی</option>
                    <option value="industrial">تولید صنعتی</option>
                    <option value="pre_industrial">قبل از تولید صنعتی</option>
                  </select>
                  {showErr.type_f && (
                    <span className="text-sm text-c-9">*{showErr.type_f}</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className=" py-6 mt-4">
            <p className="text-lg font-extrabold">مکان فعالیت شرکت </p>
          </div>
          <table className="w-full rounded-xl overflow-hidden">
            <thead>
              <tr className=" sticky top-0   ">
                <th className="bg-white p-3  ">کاربری </th>
                <th className="bg-white p-3 ">نشانی </th>
                <th className="bg-white p-3 "> متراژ (مترمربع)</th>
                <th className="bg-white p-3 ">مالک/ استیجاری </th>
                <th className="bg-white p-3 ">تعداد کارکنان </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <td className="p-4 text-xs text-gray-800 font-bold">
                  دفتر مرکزی
                </td>
                <td className="p-4 text-xs text-gray-600 font-bold">
                  <textarea
                    className=" text-xs h-12 border border-gray-300 rounded-xl"
                    cols="30"
                    rows="10"
                    id="0"
                    value={stepOne.places[0].address}
                    onChange={changeHandler}
                    name="address"
                  ></textarea>
                </td>
                <td className="p-4 text-xs text-gray-600 font-bold">
                  <input
                    type="number"
                    className="border border-gray-300 rounded-xl w-21"
                    onChange={changeHandler}
                    name="meterage"
                    value={stepOne.places[0].meterage}
                    id="0"
                  />
                </td>
                <td className="p-4 text-xs text-gray-600 font-bold">
                  <select
                    name="ownership"
                    onChange={changeHandler}
                    id="0"
                    className="border-gray-300 rounded-xl w-24 text-xs"
                  >
                    <option value="owner">مالک</option>
                    <option value="rental">استیجاری</option>
                  </select>
                </td>
                <td className="p-4 text-xs text-gray-600 font-bold">
                  <div className="flex">
                    <input
                      type="number"
                      className="border border-gray-300 rounded-xl w-20"
                      onChange={changeHandler}
                      name="count"
                      value={stepOne.places[0].count}
                      id="0"
                    />
                  </div>
                </td>
              </tr>
              {/* box 2 */}
              <tr className="bg-white border-b">
                <td className="p-4 text-xs text-gray-800 font-bold">
                  کارگاه یا کارخانه
                </td>
                <td className="p-4 text-xs text-gray-600 font-bold">
                  <textarea
                    className=" text-xs h-12 border border-gray-300 rounded-xl"
                    cols="30"
                    rows="10"
                    id="1"
                    value={stepOne.places[1].address}
                    onChange={changeHandler}
                    name="address"
                  ></textarea>
                </td>
                <td className="p-4 text-xs text-gray-600 font-bold">
                  <input
                    type="number"
                    className="border border-gray-300 rounded-xl w-21"
                    onChange={changeHandler}
                    name="meterage"
                    value={stepOne.places[1].meterage}
                    id="1"
                  />
                </td>
                <td className="p-4 text-xs text-gray-600 font-bold">
                  <select
                    name="ownership"
                    onChange={changeHandler}
                    id="1"
                    className="border-gray-300 rounded-xl w-24 text-xs"
                  >
                    <option value="owner">مالک</option>
                    <option value="tenant">استیجاری</option>
                  </select>
                </td>
                <td className="p-4 text-xs text-gray-600 font-bold">
                  <div className="flex">
                    <input
                      type="number"
                      className="border border-gray-300 rounded-xl w-20"
                      onChange={changeHandler}
                      name="count"
                      value={stepOne.places[1].count}
                      id="1"
                    />
                  </div>
                </td>
              </tr>
              {/* BOX 3 */}
              <tr className="bg-white ">
                <td className="p-4 text-xs text-gray-800 font-bold">انبار</td>
                <td className="p-4 text-xs text-gray-600 font-bold">
                  <textarea
                    className=" text-xs h-12 border border-gray-300 rounded-xl"
                    id="2"
                    value={stepOne.places[2].address}
                    onChange={changeHandler}
                    name="address"
                    cols="30"
                    rows="10"
                  ></textarea>
                </td>
                <td className="p-4 text-xs text-gray-600 font-bold">
                  <input
                    type="number"
                    className="border border-gray-300 rounded-xl w-21"
                    onChange={changeHandler}
                    name="meterage"
                    value={stepOne.places[2].meterage}
                    id="2"
                  />
                </td>
                <td className="p-4 text-xs text-gray-600 font-bold">
                  <select
                    name="ownership"
                    onChange={changeHandler}
                    id="2"
                    className="border-gray-300 rounded-xl w-24 text-xs"
                  >
                    <option value="owner">مالک</option>
                    <option value="rental">استیجاری</option>
                  </select>
                </td>
                <td className="p-4 text-xs text-gray-600 font-bold">
                  <div className="flex">
                    <input
                      type="number"
                      className="border border-gray-300 rounded-xl w-20"
                      onChange={changeHandler}
                      name="count"
                      value={stepOne.places[2].count}
                      id="2"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-center mt-4 ">
          <table className="w-full rounded-xl overflow-hidden">
            <thead>
              <tr className=" sticky top-0   ">
                <th className="bg-white p-3  ">تاریخچه و معرفی اجمالی شرکت </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white ">
                <td className="p-4 text-xs text-gray-600 font-bold">
                  <textarea
                    className=" text-xs h-20 w-full border border-gray-300 rounded-xl"
                    onChange={changeHandler}
                    value={stepOne.history}
                    name="history"
                    id=""
                    cols="30"
                    rows="10"
                  ></textarea>
                </td>
              </tr>
            </tbody>
            <thead>
              <tr className=" sticky top-0   ">
                <th className="bg-white p-3  ">
                  شرح مختصر فعالیتها و فرآیند تولید/خدمات اصلی شرکت و همچنین
                  نحوه تأمین مواد اولیه/ قطعات مصرفی{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white ">
                <td className="p-4 text-xs text-gray-600 font-bold">
                  <textarea
                    className=" text-xs h-20 w-full border border-gray-300 rounded-xl"
                    onChange={changeHandler}
                    value={stepOne.activity}
                    name="activity"
                    id=""
                    cols="30"
                    rows="10"
                  ></textarea>
                </td>
              </tr>
            </tbody>
            <thead>
              <tr className=" sticky top-0   ">
                <th className="bg-white p-3  ">وضعیت و حوزه دانش بنیان</th>
              </tr>
            </thead>
            <div className="flex  items-center m-3">
              <p className="font-bold text-sm">
                آیا شرکت در فهرست شرکتهای دانش بنیان معاونت علمی ریاست جمهوری
                قرار دارد؟
              </p>
              <input
                type="radio"
                name="is_knowledge"
                onChange={changeHandler}
                value={true}
                id=""
                className="relative overflow-hidden mx-2 w-5 border rounded-full h-full"
              />
              <p className="font-bold text-sm">بله</p>
              <input
                type="radio"
                name="is_knowledge"
                onChange={changeHandler}
                value={false}
                id=""
                className="relative overflow-hidden mx-2 w-5 rounded h-full"
              />
              <p className="font-bold text-sm">خیر</p>
            </div>
            {stepOne.is_knowledge && (
              <tbody>
                <tr className="bg-white ">
                  <td className=" text-xs text-gray-600 font-bold"></td>
                </tr>
                <tr className="bg-white ">
                  <td className="p-4 text-xs text-gray-600 font-bold flex">
                    <div className="flex  items-center m-3 w-1/2">
                      <p className="font-bold text-sm">
                        تاریخ تأییدیه دانش بنیان توسط معاونت علمی ریاست جمهور:{" "}
                      </p>

                      <select
                        name="confirmation"
                        onChange={dateChangeHandler}
                        id="day"
                        className="border-gray-300 rounded-xl  text-xs mx-1 "
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                      </select>
                      <select
                        name="confirmation"
                        onChange={dateChangeHandler}
                        id="month"
                        className="border-gray-300 rounded-xl  text-xs mx-1"
                      >
                        <option value="1">فروردین</option>
                        <option value="2">اردیبهشت</option>
                        <option value="3">خرداد</option>
                        <option value="4">تیر</option>
                        <option value="5">مرداد</option>
                        <option value="6">شهریور</option>
                        <option value="7">مهر</option>
                        <option value="8">آبان</option>
                        <option value="9">آذر</option>
                        <option value="10">دی</option>
                        <option value="11">بهمن</option>
                        <option value="12">اسفند</option>
                      </select>
                      <input
                        type="number"
                        className="text-sm border rounded-xl border-gray-400 m-1 h-8"
                        name="confirmation"
                        onChange={dateChangeHandler}
                        id="year"
                        value={confirmationDate.year}
                        min="1300"
                        max="1402"
                        placeholder="1400"
                      />
                    </div>
                    <div className="flex  items-center m-3 w-1/2">
                      <p className="font-bold text-sm">
                        تاریخ انقضاء تأییدیه دانشبنیان:{" "}
                      </p>

                      <select
                        name="expiration"
                        onChange={dateChangeHandler}
                        id="day"
                        className="border-gray-300 rounded-xl  text-xs mx-1 "
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                      </select>
                      <select
                        name="expiration"
                        onChange={dateChangeHandler}
                        id="month"
                        className="border-gray-300 rounded-xl  text-xs mx-1"
                      >
                        <option value="1">فروردین</option>
                        <option value="2">اردیبهشت</option>
                        <option value="3">خرداد</option>
                        <option value="4">تیر</option>
                        <option value="5">مرداد</option>
                        <option value="6">شهریور</option>
                        <option value="7">مهر</option>
                        <option value="8">آبان</option>
                        <option value="9">آذر</option>
                        <option value="10">دی</option>
                        <option value="11">بهمن</option>
                        <option value="12">اسفند</option>
                      </select>
                      <input
                        type="number"
                        className="text-sm border rounded-xl border-gray-400 m-1 h-8"
                        name="expiration"
                        value={expirationDate.year}
                        onChange={dateChangeHandler}
                        id="year"
                        min="1300"
                        max="1402"
                        placeholder="1400"
                      />
                    </div>
                  </td>
                </tr>
                <tr className="bg-white ">
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    className="p-4 text-xs text-gray-600 font-bold"
                  >
                    <select
                      name="area"
                      onChange={changeHandler}
                      id=""
                      className="border-gray-300 rounded-xl  text-xs"
                    >
                      <option value="fanavari-zisti">
                        فناوری زیستی (پزشكی، کشاورزی، صنعتی و محیط زیست)
                      </option>
                      <option value="fanavari-nano">
                        {" "}
                        فناوری نانو (محصوالت و مواد )
                      </option>
                      <option value="optic-photonic">
                        {" "}
                        اپتیک و فوتونیک (مواد، قطعات و سامانه ها)
                      </option>
                      <option value="mavad-pishrafteh-shimiai-ghershimiai-felezat">
                        {" "}
                        مواد پیشرفته شیمیایی و غیر شیمیایی (فلزات، کامپوزیتها،)
                      </option>
                      <option value="mavad-pishrafteh-shimiai-ghershimiai-polimer">
                        مواد پیشرفته شیمیایی و غیر شیمیایی (فلزات، کامپوزیتها،
                        سرامیکها، پلیمرها){" "}
                      </option>
                      <option value="electronic-controle">
                        الكترونیک و کنترل (میكروالكترونیک، قطعات، مدارها،
                        سختافزار کامپیوتر و سامانه ها){" "}
                      </option>
                      <option value="tajhizat-azmayeshgahi">
                        {" "}
                        تجهیزات پیشرفته ساخت، تولید و آزمایشگاهی
                      </option>
                      <option value="daroo-mohandesi-pezeshki">
                        {" "}
                        داروهای پیشرفته و مهندسی پزشكی
                      </option>
                      <option value="havafaza">
                        {" "}
                        هوافضا (پرنده ها، ماهواره ها، موشکها)
                      </option>
                      <option value="energi">
                        {" "}
                        انرژی (هسته ای، نفت و گاز و تجدید پذیر)
                      </option>
                      <option value="other">
                        {" "}
                        محصوالت پیشرفته سایر بخش ها (رباتیک و ...)
                      </option>
                      <option value="daryaei"> صنایع دریایی</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
          {showErr && (
            <p className="border-gray-300 rounded-xl font-bold text-c-9  p-5 w-full text-center m-0 text-sm">
              *برای رفتن به مرحله بعد نیاز است همه ی فیلد ها پر شوند
            </p>
          )}
        </div>
      </>

      <div className=" text-left mt-2">
        <button
          onClick={subHandler}
          className="bg-blue-700  text-white rounded-xl p-4 font-bold text-sm"
        >
          مرحله بعد
        </button>
      </div>
    </>
  );
}
