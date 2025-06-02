import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation} from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";
import classes from "./Signup.module.css";
import { ClipLoader } from "react-spinners";

const Type = {
  SET_USER: "SET_USER",
};

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  // console.log(navStateData);

  const mapFirebaseError = (msg) => {
    if (msg.includes("auth/user-not-found"))
      return "No user found with this email.";
    if (msg.includes("auth/wrong-password")) return "Incorrect password.";
    if (msg.includes("auth/email-already-in-use"))
      return "Email is already registered.";
    return msg;
  };

  const authHandler = async (action) => {
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (action === "signin") {
      setLoading((prev) => ({ ...prev, signIn: true }));
      try {
        const userInfo = await signInWithEmailAndPassword(auth, email, password);
        dispatch({ 
          type: Type.SET_USER, 
          user: userInfo.user,
        });
        setLoading({ ...loading, signIn: false });
        navigate(navStateData?.state?.redirect || "/"); // Redirect to homepage
      } catch (err) {
        console.error("Sign in error:", err);
        setError(mapFirebaseError(err.message));
      } finally {
        setLoading((prev) => ({ ...prev, signIn: false }));
      }
    } else if (action === "signup") {
      setLoading((prev) => ({ ...prev, signUp: true }));
      try {
        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user
        });
        setLoading({ ...loading, signUp: false });
        navigate(navStateData?.state?.redirect || "/");
      } catch (err) {
        console.error("Signup error:", err);
        setError(mapFirebaseError(err.message));
      } finally {
        setLoading((prev) => ({ ...prev, signUp: false }));
      }
    }
  };

  return (
    <section className={classes.login}>
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png?20250504041148"
          alt="Amazon Logo"
        />
      </Link>

      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{ 
              paddingTop: "5px", 
              color: "red", 
              textAlign: "center",
              fontWeight: "bold"
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            authHandler("signin");
          }}
        >
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading.signIn}
            className={classes.login_SignInButton}
          >
            {loading.signIn ?(
            <ClipLoader color="#000" size={15}></ClipLoader>
            ):(
              "Sign In"
            )
          }
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE PROJECT Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button
          type="button"
          onClick={() => authHandler("signup")}
          disabled={loading.signUp}
          className={classes.login_registerButton}
        >
          {loading.signUp ? "Creating Account..." : "Create your Amazon Account"}
        </button>

        {error && (
          <small
            style={{ paddingTop: "5px", color: "red" }}
            aria-live="assertive"
          >
            {error}
          </small>
        )}
      </div>
    </section>
  );
}

export default Auth;
