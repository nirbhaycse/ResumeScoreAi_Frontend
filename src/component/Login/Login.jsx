import { useContext, useState } from "react";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../utils/firebase";
import { AuthContext } from "../../utils/AuthContext";
import styles from "./Login.module.css";

const Login = () => {
  const { setLogin, setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const credential = await signInWithPopup(auth, provider);
      const user = credential.user;
      const userInfo = {
        uid: user.uid,
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
      };

      localStorage.setItem("isLogin", "true");
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setLogin(true);
      setUserInfo(userInfo);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Google sign-in failed:", err);
      setError(
        err?.code === "auth/popup-closed-by-user"
          ? "Sign-in was cancelled. Please try again."
          : "Unable to sign in. Check Firebase Google sign-in settings and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.Login}>
      <div className={styles.loginCard}>
        <div className={styles.loginCardTitle}>
          <h1>Login</h1>
          <VpnKeyIcon />
        </div>

        <button
          type="button"
          className={styles.googleBtn}
          onClick={handleLogin}
          disabled={loading}
          aria-busy={loading}
        >
          <GoogleIcon sx={{ fontSize: 20, color: "red" }} />
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>

        {error && (
          <p role="alert" aria-live="polite">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
