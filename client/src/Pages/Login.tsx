import { Fragment, useState, useEffect } from "react"
import axios from "axios"
import fetchUser from "../function/FetchUser"

const Login = () => {
  const [usernameValue, setUsernameValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [loginNotif, setLoginNotif] = useState("")

  useEffect(() => {
    fetchUser()
    console.log("fetched from useEffect")
  }, [])

  const loginhandler = async () => {
    await axios
      .post("http://127.0.0.1:3028/signin", { username: usernameValue, password: passwordValue }, { withCredentials: true })
      .then(() => {
        // console.log(res)

        window.location.href = "./dashboard"
      })

      .catch((err) => {
        setLoginNotif(err.response.data.error)
        console.log(loginNotif)
      })
  }

  return (
    <Fragment>
      <div className="login-container">
        <p className="right-corner">{/* <a href="/dashboard"> Back to Home</a> */}</p>
        <br />
        <div className="login-wrapper">
          <h2>Log In To your Account</h2>
          <br />

          <hr />

          {loginNotif && (
            <p id="login-notif" style={{ display: "block" }}>
              {loginNotif}
            </p>
          )}

          <br />
          <label htmlFor="username">Username:</label>
          <br />
          <input
            type="text"
            id="username"
            placeholder="Input Username"
            autoComplete="on"
            onChange={(e) => {
              setUsernameValue(e.target.value)
              console.log(e.target.value)
            }}
          />
          <br />
          <br />

          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            placeholder="Input Password"
            autoComplete="off"
            onChange={(e) => {
              setPasswordValue(e.target.value)
              console.log(e.target.value)
            }}
          />
          <br />
          <br />
          <hr />

          <br />
          <button onClick={loginhandler}>Log In</button>
          <br />
          <br />

          <p>Forget Your Password? Click Here</p>

          <br />
          <br />
        </div>
      </div>
    </Fragment>
  )
}

export default Login
