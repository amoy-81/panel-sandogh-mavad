import { useState } from "react";
import { httpService } from "../core/http-service";
import { isJson } from "../helper/isJson";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function useRequests({ url, header }) {
  // tools
  const navigate = useNavigate();
  const authState = useSelector((state) => state.authState.userData);

  // states
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const token = localStorage.getItem("token");

  const getRequest = () => {
    setLoading(true);
    httpService
      .get(url, {
        headers: {
          authorization: `bearer ${
            authState && authState.token
              ? authState.token
              : isJson(token)
              ? JSON.parse(token)
              : token
          }`,
          ...header,
        },
      })
      .then((res) => {
        setLoading(false);
        setResponse(res.data);
      })
      .catch((err) => {
        setLoading(false);
        if (
          err.response &&
          (err.response.status === 403 || err.response.status === 401)
        ) {
          //   token expare
          setError("توکن منقضی شده است");
          toast.error("زمان شما به پایان رسید , درحال انتقال به صفحه ورود...", {
            autoClose: 2000,
          });

          //   redirect to login after 2s
          setTimeout(() => {
            navigate("/auth/login");
          }, 2000);
        } else {
          setError(err.response.data.message || "خطا در ارتباط");
        }
      });
  };

  const postRequest = (data) => {
    setLoading(true);
    httpService
      .post(url, data, {
        headers: {
          authorization: `bearer ${
            authState && authState.token
              ? authState.token
              : isJson(token)
              ? JSON.parse(token)
              : token
          }`,
          ...header,
        },
      })
      .then((res) => {
        setLoading(false);
        setResponse(res.data);
      })
      .catch((err) => {
        setLoading(false);
        if (
          err.response &&
          (err.response.status === 403 || err.response.status === 401)
        ) {
          //   token expare
          setError("توکن منقضی شده است");
          toast.error("زمان شما به پایان رسید , درحال انتقال به صفحه ورود...", {
            autoClose: 2000,
          });

          //   redirect to login after 2s
          setTimeout(() => {
            navigate("/auth/login");
          }, 2000);
        } else {
          toast.error(err.response.data.message || "خطا در انجام درخواست", {
            autoClose: 2000,
          });
          setError(err.response.data.message || "خطا در ارتباط");
        }
      });
  };

  return { response, error, loading, getRequest, postRequest };
}

export default useRequests;
