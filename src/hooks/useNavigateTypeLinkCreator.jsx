import { useSelector } from "react-redux";

function useNavigateTypeLinkCreator() {
  const authState = useSelector((state) => state.authState.userData);
  return `/${
    authState.type === "genuine" || authState.type === "legal"
      ? "user"
      : authState.type
  }`;
}

export default useNavigateTypeLinkCreator;
