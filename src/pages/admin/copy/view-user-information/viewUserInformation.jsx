import React, { useEffect, useState } from "react";
import { Axios } from "../../../../core/http-service";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../components/loader/Loader";
import { viewTitle } from "../../../../helper/itemTitle";
import { inputTitle } from "../../../../helper/inputTitles";

const ViewUserInformation = () => {
  const [details, setDetails] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const reqId = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get(`/admin/users/${reqId.id}`)
      .then(async (res) => {
        setDetails(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  if (IsLoading) return <Loader />;
  return (
    <div>
      <div className="flex items-center justify-between p-6">
        <p className="text-xl font-bold p-4 py-6">اطلاعات کاربر</p>
        <p
          onClick={() => navigate(-1)}
          className="cursor-pointer hover:bg-blue-700 transition-all hover:text-white p-2 rounded-lg"
        >
          بازگشت
        </p>
      </div>
      <hr className="border-dashed" />

      <div className="flex flex-wrap">
        {details && (
          <div className="mt-3 w-96 border rounded-2xl mx-3 p-2 overflow-hidden">
            <p className="font-bold text-sm">نام و نام خانوادگی</p>
            <p className="text-gray-500">
              {details.name} {details.family}
            </p>
          </div>
        )}
        {details && (
          <div className="mt-3 w-96 border rounded-2xl mx-3 p-2 overflow-hidden">
            <p className="font-bold text-sm">تلفن</p>
            <p className="text-gray-500">{details.phone}</p>
          </div>
        )}

        {details.profilegenuine &&
          Object.keys(details.profilegenuine).map((item) => {
            return [
              "education",
              "father_name",
              "job",
              "nationality",
              "number_certificate",
              "place_issue",
              "series_certificate",
              "study",
            ].includes(item) ? (
              <div className="mt-3 w-96 border rounded-2xl mx-3 p-2 overflow-hidden">
                <p className="font-bold text-sm">{viewTitle(item)}</p>
                <p className="text-gray-500">{details.profilegenuine[item]}</p>
              </div>
            ) : ["gender", "residential", "marital"].includes(item) ? (
              <div className="mt-3 w-96 border rounded-2xl mx-3 p-2 overflow-hidden">
                <p className="font-bold text-sm">{viewTitle(item)}</p>
                <p className="text-gray-500">
                  {viewTitle(details.profilegenuine[item])}
                </p>
              </div>
            ) : (
              ""
            );
          })}
        {details.profilelagal &&
          Object.keys(details.profilelagal).map((item) => {
            return [
              "email",
              "establishment",
              "fund",
              "initial_investment",
              "landline_phone",
              "name_representative",
              "place_registration",
              "signed_right",
              "site",
              "subject_activity",
              "type_legal",
            ].includes(item) ? (
              <div className="mt-3 w-96 border rounded-2xl mx-3 p-2 overflow-hidden">
                <p className="font-bold text-sm">{inputTitle(item)}</p>
                <p className="text-gray-500">{details.profilelagal[item]}</p>
              </div>
            ) : (
              ""
            );
          })}
      </div>
    </div>
  );
};

export default ViewUserInformation;
