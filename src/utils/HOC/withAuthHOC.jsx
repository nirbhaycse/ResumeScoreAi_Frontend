import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const WithAuthHOC = (WrappedComponent) => {
  const ProtectedComponent = (props) => {
    const navigate = useNavigate();
    const { isLogin, setLogin } = useContext(AuthContext);

    useEffect(() => {
      const storedLogin = localStorage.getItem("isLogin") === "true";
      if (!isLogin || !storedLogin) {
        setLogin(false);
        navigate("/", { replace: true });
      }
    }, [isLogin, navigate, setLogin]);

    if (!isLogin || localStorage.getItem("isLogin") !== "true") {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  ProtectedComponent.displayName = `WithAuthHOC(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return ProtectedComponent;
};

export default WithAuthHOC;
