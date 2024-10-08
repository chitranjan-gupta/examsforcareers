import React, { useState } from "react";
import "../componentscss/Signin.css";
import man from "../images/person.svg";
import sign_in from "../images/sign_in.svg";
import { NavLink, useHistory } from "react-router-dom";

function Signin() {
  if (typeof window !== "undefined") {
    document.title = "Sign In";
  }
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        window.alert("Email Or Pasword Field Is Empty");
        return;
      }
      const res = await fetch("/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      if (res.status === 400 || !data) {
        if (typeof window !== "undefined") {
          window.alert(data.error);
        }
      } else {
        console.log(data.message);
        if (typeof window !== "undefined") {
          window.alert(data.message);
        }
        history.push("/user");
      }
    } catch (err) {}
  };
  return (
    <div className="mainBody">
      <section className="mainSBox">
        <div className="picBox">
          <img alt="" src={sign_in} />
        </div>
        <div className="inputBox">
          <h1>Sign In</h1>
          <form method="POST">
            <div>
              <img alt="men" src={man} />
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                autoComplete="off"
                required
              />
            </div>
            <div>
              <svg
                width="64"
                height="64"
                viewBox="0 0 320 384"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M264 224h56v-240h-320v240h56v72c0 57 47 104 104 104s104 -47 104 -104v-72zM72 296v-72h176v72c0 49 -39 88 -88 88s-88 -39 -88 -88zM304 0v208h-288v-208h288zM160 160c18 0 32 -14 32 -32c0 -15 -10 -27 -24 -31v-33h-16v33c-14 4 -24 16 -24 31c0 18 14 32 32 32z M160 112c9 0 16 7 16 16s-7 16 -16 16s-16 -7 -16 -16s7 -16 16 -16z"
                  transform="matrix(1,0,0,-1,0,384)"
                />
              </svg>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="off"
                required
              />
            </div>
            <div className="submitbox">
              <input
                type="submit"
                className="submitbutton"
                value="Login In"
                onClick={loginUser}
              />
            </div>
          </form>
          <div className="already">
            <NavLink exact to="/signup">
              Create An Account to get started
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signin;
