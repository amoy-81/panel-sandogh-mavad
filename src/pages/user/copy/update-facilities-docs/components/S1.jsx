import React, { useState } from 'react'
import { Axios } from '../../../../../core/http-service';
import Loader from '../../../../../components/loader/Loader';

export default function S1({close , data , id , toast }) {
    console.log(data);

    const [confirmationDate, setConfirmationDate] = useState({ year: "2022", month: "02", day: "02" })
    const [expirationDate, setExpirationDate] = useState({ year: "2022", month: "02", day: "02" })
    const [isLoading , setIsLoading] = useState(false)
    const [stepOne , setStepOne] = useState({
      ...data[0]
    })

    
    // console.log(sendObject);
    const changeHandler = (e) => {
      if (e.target.type === "radio") {
        if (e.target.value === "true") {
          setStepOne(prevState => {
            return ({
              ...prevState,
              [e.target.name]: !!e.target.value
            })
          })
        } else {
          setStepOne(prevState => {
            return ({
              ...prevState,
              [e.target.name]: !e.target.value
            })
          })
        }
      } else if (e.target.name === "history" || e.target.name === "activity" || e.target.name === "title" || e.target.name === "type_f" || e.target.name === "area") {
        setStepOne(prevState => {
          return ({
            ...prevState,
            [e.target.name]: e.target.value
          })
        })
      } else if (e.target.type === "textarea" || e.target.type === "number" || e.target.type === "select-one") {
        setStepOne(prevState => {
          const updatedPlaces = prevState.places.map((place, index) => {
            if (index === parseInt(e.target.id)) {
              return {
                ...place,
                [e.target.name]: e.target.value
              };
            }
            return place;
          });
          return {
            ...prevState,
            places: updatedPlaces
          };
        });
      }
      console.log(stepOne);
    }
    // date ...
    const dateChangeHandler = (e) => {
      if (e.target.name === "confirmation") {
        setConfirmationDate(prev => {
          return ({
            ...prev,
            [e.target.id]: e.target.value
          })
        })
      } else if (e.target.name === "expiration") {
        setExpirationDate(prev => {
          return ({
            ...prev,
            [e.target.id]: e.target.value
          })
        })
      }
    }
    const sendHandler = (e) => {
        e.preventDefault()
        setIsLoading(false)
        Axios.put(`/v1/request/${id}`, stepOne)
        .then((res) => {
          console.log(res.data)
          setIsLoading(true)
          toast("تغییرات باموفقیت ثبت شد")
          close(null)

        })
        .catch((err) => {
          console.log(err)
          setIsLoading(false)
          toast("ثبت تغییرات با خطا مواجه شد")
        })
    }

    if (isLoading) return <Loader />
    return (
    <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex flex-col items-center justify-center">
        <div className="max-h-[70vh] overscroll-auto overflow-scroll	 text-center mt-4 ">
          <table className="w-[1000px] rounded-xl overflow-hidden">
            <thead>
              <tr className=" sticky top-0   ">
                <th className="bg-white p-3  ">تاریخچه و معرفی اجمالی شرکت </th>
              </tr>
            </thead>
            <tbody >
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
                  شرح مختصر فعالیتها و فرآیند تولید/خدمات اصلی شرکت و همچنین نحوه
                  تأمین مواد اولیه/ قطعات مصرفی{" "}
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
              <tr className=" sticky top-0  bg-white ">
                <th className=" p-3  ">وضعیت و حوزه دانش بنیان</th>
              </tr>
                    <div className="flex  items-center bg-white p-3 rounded-xl m-3">
                      <p className="font-bold bg-white text-sm">
                        آیا شرکت در فهرست شرکتهای دانش بنیان معاونت علمی ریاست
                        جمهوری قرار دارد؟
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
            </thead>
            {stepOne.is_knowledge && 
              <tbody>
                <tr className="bg-white ">
                  <td className=" text-xs text-gray-600 font-bold">
                  </td>
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
                  <td style={{ display: "flex", flexDirection: "column", alignItems: "center" }} className="p-4 text-xs text-gray-600 font-bold">
                    <select
                      name="area"
                      onChange={changeHandler}
                      id=""
                      className="border-gray-300 rounded-xl  text-xs"
                    >
                      <option value="fanavari-zisti">
                        فناوری زیستی (پزشكی، کشاورزی، صنعتی و محیط زیست)
                      </option>
                      <option value="fanavari-nano"> فناوری نانو (محصوالت و مواد )</option>
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
                        الكترونیک و کنترل (میكروالكترونیک، قطعات، مدارها، سختافزار
                        کامپیوتر و سامانه ها){" "}
                      </option>
                      <option value="tajhizat-azmayeshgahi">
                        {" "}
                        تجهیزات پیشرفته ساخت، تولید و آزمایشگاهی
                      </option>
                      <option value="daroo-mohandesi-pezeshki"> داروهای پیشرفته و مهندسی پزشكی</option>
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
            }
          </table>
        </div>
      <div>
          <button className='bg-red-500 p-3 mt-2 ml-2 rounded-xl text-white shadow-md transition hover:bg-red-600' onClick={() => close(null)}>بستن</button>
          <button className='bg-green-500 p-3 mt-2 mr-2 rounded-xl text-white shadow-md transition hover:bg-green-600' onClick={sendHandler}>ثبت اطلاعات</button>
      </div>
    </div>
  )
}
