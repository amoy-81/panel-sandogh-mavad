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
  const [errorResponse, setErrorResponse] = useState(null);
  const [loading, setLoading] = useState(null);
  const [percentProgress, setPercentProgress] = useState(0);

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
        onUploadProgress: (pe) => {
          setPercentProgress((pe.loaded / pe.total) * 100);
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
          setErrorResponse(err.response?.data ? err.response?.data : null);
        }
      });
  };

  const postRequest = (data) => {
    setLoading(true);
    setPercentProgress(0);
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
        onUploadProgress: (pe) => {
          setPercentProgress((pe.loaded / pe.total) * 100);
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
          toast.error(err.response.data?.message || "خطا در انجام درخواست", {
            autoClose: 2000,
          });
          setError(err.response.data?.message || "خطا در ارتباط");
          setErrorResponse(err.response?.data ? err.response?.data : null);
        }
      });
  };

  const deleteRequest = () => {
    setLoading(true);
    httpService
      .delete(url, {
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
        onUploadProgress: (pe) => {
          setPercentProgress((pe.loaded / pe.total) * 100);
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
          setErrorResponse(err.response?.data ? err.response?.data : null);
        }
      });
  };

  return {
    response,
    error,
    loading,
    percentProgress,
    errorResponse,
    getRequest,
    postRequest,
    deleteRequest,
  };
}

export default useRequests;
