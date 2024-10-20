import { useState } from "react";
import { apiHandler } from "../../utils/apihandler";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";

function isValidEmail(email) {
  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailFormat.test(email);
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault()

    if (email === "" || password === "") {
      setErrorMessage("Please, fill all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Please, insert a valid email.");
      return;
    }

    setErrorMessage("");

    try {
      apiHandler(
        "auth",
        "POST",
        "application/json",
        {
          username: email,
          password: password,
        }
      ).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            sessionStorage.setItem("token", data.token);
            navigate("/")
          })
        } else {
          setErrorMessage("Email or password invalid")
        }
      })
    } catch (error) {
      setErrorMessage("Email or password invalid")
    }
  }

  function handleCreateAccount() {
    navigate("/signin")
  }

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
          <h3 className="text-2xl font-bold text-center">Login to your account</h3>
          <form>
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-baseline justify-between">
                <button
                  type="submit"
                  className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  onClick={(e) => handleSubmit(e)}
                >
                  Login
                </button>
                <a 
                  href="#" 
                  className="text-sm text-blue-600 hover:underline"
                  onClick={handleCreateAccount}
                >
                  Create Account
                </a>
              </div>
              {errorMessage && (
                <div className="mb-1 mt-4 text-red-500">{errorMessage}</div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
