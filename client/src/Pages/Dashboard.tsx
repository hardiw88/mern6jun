import { Fragment, useEffect } from "react"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const [welcomefirstName, setWelcomeFirstName] = useState("")
  const [welcomeLastName, setWelcomeLastName] = useState("")

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState("")
  const [email, setEmail] = useState("")
  const [uid, setUID] = useState("")
  const [dashboard, setDashboard] = useState(false)
  const [tokenExpMins, setTokenExpMins] = useState(0)
  const [tokenExpSecs, setTokenExpSecs] = useState(0)
  // const [firstNameInput, setFirstNameInput] = useState(false)
  // const [lastNameInput, setLastNameInput] = useState(false)
  const [editInput, setEditInput] = useState(false)

  const navigate = useNavigate()

  const fetchUser = async () => {
    await axios
      .get("http://127.0.0.1:3028/dashboard", { withCredentials: true })
      .then((result) => {
        console.log(result)
        setWelcomeFirstName(result.data.dashboardProfile.firstName)
        setWelcomeLastName(result.data.dashboardProfile.lastName)
        setFirstName(result.data.dashboardProfile.firstName)
        setLastName(result.data.dashboardProfile.lastName)
        setAge(result.data.dashboardProfile.age)
        setEmail(result.data.dashboardProfile.email)
        setUID(result.data.dashboardProfile.userUID)
        setDashboard(true)
        const expTime = result.data.dashboardProfile.exp

        setInterval(() => {
          let nowTimeinMiliSeconds = new Date().getTime()
          let nowTimeinSeconds = nowTimeinMiliSeconds / 1000
          let timeLeftinSeconds = expTime - nowTimeinSeconds
          let timeLeftinMinutes = Math.floor(timeLeftinSeconds / 60)

          let secsLeftafterModulowithMins = Math.floor(timeLeftinSeconds % 60)

          if (secsLeftafterModulowithMins <= 0) {
            secsLeftafterModulowithMins = 0
          }

          if (timeLeftinMinutes <= 0) {
            timeLeftinMinutes = 0
          }

          setTokenExpMins(timeLeftinMinutes)
          setTokenExpSecs(secsLeftafterModulowithMins)
        }, 1000)

        // console.log("nowTimeinMiliSeconds", nowTimeinMiliSeconds)
        // console.log("nowTimeinSeconds", nowTimeinSeconds)
        // console.log("tokenExp", tokenExp)
        // console.log("timeLeftinMinutes", timeLeftinMinutes)
      })
      .catch(async (err) => {
        await axios.post("http://127.0.0.1:3028/logout", {}, { withCredentials: true })
        console.log(err.response.data.error)
        alert("Session Not Valid! - Please Re-login to your Account!")
        //
        window.location.href = "./login"
      })
  }

  const handleLogout = async () => {
    if (confirm("Are You Sure want To Logout?")) {
      try {
        await axios.post("http://127.0.0.1:3028/logout", {}, { withCredentials: true })

        alert("Logout Successfully!")
        window.location.href = "./login"
      } catch (error) {
        console.log(error)
      }

      //
      //       .then((result) => console.log(result))
      //       .then(() => {
      //         // alert("Successfully Logout!")
      //         window.location.href = "./login"
      //       })
      //
      //       .catch((err) => {
      //         alert(err.response.data.error)
      //       })
    } else {
      // alert("Logout Canceled!")
    }
  }

  const editProfile = () => {
    setEditInput(true)
  }

  const cancelEdit = () => {
    navigate(0)
  }

  const editSave = async () => {
    console.log(firstName)
    console.log(lastName)
    console.log(age)

    await axios
      .patch(`http://127.0.0.1:3028/users/edituser/${uid}`, { firstname: firstName, lastname: lastName, age: age }, { withCredentials: true })
      // .then(() => alert("Data Successfully Changed!"))
      .then(() => {
        alert("Data Successfully Changed!")
        window.location.reload()
      })
      .catch((err) => console.log("err", err))
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <Fragment>
      <div className="login-container" id="dashboard" style={{ display: dashboard ? "block" : "none" }}>
        <div className="login-info">
          {firstName && (
            <b id="username">
              Welcome, {welcomefirstName} {welcomeLastName}
            </b>
          )}
          <span className="right-corner">
            <button id="logoutButton" onClick={handleLogout}>
              Logout
            </button>
          </span>
        </div>

        <div className="login-wrapper">
          <br />
          <hr />
          <ul>
            <br />

            <li className="fullname">
              <b>Full Name:</b>

              {!editInput ? (
                <>
                  <span id="firstname"> {firstName}</span>
                  <span id="lastname"> {lastName}</span>
                </>
              ) : (
                <div className="firstandlastName">
                  {editInput && <input className="inputForEdit" id="editFirstName" style={{ display: `block` }} value={firstName} onChange={(e) => setFirstName(e.target.value)} />}
                  {editInput && <input className="inputForEdit" id="editLastName" style={{ display: `block` }} value={lastName} onChange={(e) => setLastName(e.target.value)} />}
                </div>
              )}
            </li>

            <li>
              <b>Age: </b>
              {!editInput && <span id="age"> {age}</span>}
              {editInput && <input className="inputForEdit" id="editAge" style={{ display: `block` }} value={age} onChange={(e) => setAge(e.target.value)} type="number" />}
            </li>
            <li>
              <b>Your email: </b>

              {!editInput ? <span id="email"> {email}</span> : <input className="inputForEdit" id="editEmail" style={{ display: "block" }} disabled value={email} />}
            </li>
            <li>
              <b>Your Unique ID: </b>
              {uid && <span id="id"> {uid}</span>}
              {/* <!-- <input className="inputForEdit" id="editId" value="" /> --> */}
            </li>
            <li>
              <b>Token expired in: </b>
              {tokenExpMins !== null && tokenExpSecs !== null && (
                <span id="token">
                  {tokenExpMins} minutes {tokenExpSecs} seconds
                </span>
              )}
            </li>
          </ul>
          <br />

          {!editInput ? (
            <button className="editProfileButton" onClick={editProfile}>
              Edit Profile
            </button>
          ) : (
            <div className="saveAndCancelButton">
              <button className="saveEditButton" onClick={() => editSave()}>
                Save
              </button>{" "}
              <button
                className="saveCancelButton"
                onClick={() => {
                  cancelEdit()
                  // window.location.reload()
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default Dashboard
