// ============================
// GET STATES
// ============================
// const userdata = JSON.parse(localStorage.getItem("userdata"))
// const userToken = JSON.parse(localStorage.getItem("userToken"))

// ============================
// REFERENCE
// ============================
const loginNotif = document.getElementById("login-notif")
const inputUsername = document.getElementById("username")
const inputPassword = document.getElementById("password")
const dashboard = document.getElementById("dashboard")

//display elements
let id = document.getElementById("id")
let username = document.getElementById("username")
let firstname = document.getElementById("firstname")
let lastname = document.getElementById("lastname")
let age = document.getElementById("age")
let email = document.getElementById("email")
let token = document.getElementById("token")

//input elements
let editId = document.getElementById("editId")
let editFirstName = document.getElementById("editFirstName")
let editLastName = document.getElementById("editLastName")
let editAge = document.getElementById("editAge")
let editEmail = document.getElementById("editEmail")

//button elements
let saveEditButton = document.querySelector(".saveEditButton")
let logoutButton = document.getElementById("logoutButton")
let saveCancelButton = document.querySelector(".saveCancelButton")
let editProfileButton = document.querySelector(".editProfileButton")

// ============================
// HANDLER (BUTTON)
// ============================
const handlerLogin = async () => {
  try {
    const result = await axios.post(
      "http://127.0.0.1:3028/signin",
      {
        username: inputUsername.value,
        password: inputPassword.value,
      },
      {
        withCredentials: true,
      }
    )

    // console.log(result, "resultresultresult")

    if (result.status === 200) {
      console.log("login success", result.data)
      console.log(result.headers["uid"])
      return (window.location.href = "./dashboard.html")
    } else {
      window.location.href("./login.html")
      loginNotif.innerHTML = "Something wrong!"
      localStorage.removeItem("userToken")
      localStorage.removeItem("username")
      localStorage.clear()
      console.log(error)
    }

    // localStorage.setItem("userdata", JSON.stringify(userdata))
  } catch (error) {
    // console.log(error.response.data.error)

    if (error.response.data.error) {
      console.log(error)
      const errCode = error.response.data.error
      loginNotif.style.display = "block"
      loginNotif.innerHTML = errCode
    }

    setTimeout(() => {
      loginNotif.innerHTML = ""
      loginNotif.style.display = "none"
    }, 5000)
  }
}

//fetchData based on LocalStorage(Not Active)
// const fetchData = async (err) => {
//   try {
//     const lsUsername = JSON.parse(localStorage.getItem(`username`))
//     const token = JSON.parse(localStorage.getItem(`userToken`))
//
//     if (!lsUsername || !token || token === null || lsUsername === null) {
//       console.log(err)
//
//       alert("Please Login to your Account!")
//       localStorage.clear()
//
//       return (window.location.href = "login.html")
//     }
//
//     try {
//       const response = await axios.post(
//         "http://localhost:3028/dashboard",
//         { username: lsUsername },
//         {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         }
//       )
//
//       if (response.status === 200) {
//         console.log(response)
//
//         document.getElementById("token").innerHTML = userToken
//         document.getElementById("id").innerHTML = response.data.id
//         document.getElementById("username").innerHTML = response.data.username
//         document.getElementById("firstname").innerHTML = response.data.firstname
//         document.getElementById("lastname").innerHTML = response.data.lastname
//         document.getElementById("age").innerHTML = response.data.age
//         document.getElementById("email").innerHTML = response.data.email
//         document.getElementById("dashboard").style.display = "block"
//
//         editId.value = response.data.id
//         editFirstName.value = response.data.firstname
//         editLastName.value = response.data.lastname
//         editAge.value = response.data.age
//         editEmail.value = response.data.email
//       } else {
//         console.log(error.response.data.error)
//         return (window.location.href = "login.html")
//       }
//     } catch (error) {
//       console.log(error.response.data.error)
//       alert("Something Wrong! Please Re-login")
//       localStorage.clear()
//
//       return (window.location.href = "login.html")
//     }
//   } catch (error) {
//     alert("Forbidden Action! Please Relogin")
//     localStorage.clear()
//     window.location.href = "./login.html"
//
//     console.log(error)
//
//     // window.location.href="login.html"
//   }
// }

const fetchData = async () => {
  await axios
    .get("http://127.0.0.1:3028/dashboard", { withCredentials: true })
    .then((respond) => {
      console.log("respond from fetchData", respond)
      firstname.innerText = respond.data.dashboardProfile.firstName
      lastname.innerText = respond.data.dashboardProfile.lastName
      id.innerText = respond.data.dashboardProfile.userUID
      age.innerText = respond.data.dashboardProfile.age
      email.innerText = respond.data.dashboardProfile.email
      username.innerText = `${respond.data.dashboardProfile.firstName}  ${respond.data.dashboardProfile.lastName}`

      editFirstName.value = respond.data.dashboardProfile.firstName
      editLastName.value = respond.data.dashboardProfile.lastName
      editAge.value = respond.data.dashboardProfile.age
      editEmail.value = respond.data.dashboardProfile.email
      dashboard.style.display = "block"

      //       setInterval(async () => {
      //         //get the minutes
      //         let timeNow = new Date().getTime() / 1000
      //         let timeLeft = respond.data.user.exp - timeNow
      //
      //         let timeLeftinMin = parseFloat(timeLeft / 60).toFixed(0)
      //         let timeLeftinSecond = parseFloat(timeLeft).toFixed(0) - timeLeftinMin * 60
      //         //
      //         //         if(timeLeftinSecond<0){
      //         //           timeLeftinSecond
      //         //         }
      //
      //         token.innerText = ` ${timeLeftinMin} minutes : ${timeLeftinSecond} seconds, \n\n\n${parseFloat(timeLeft).toFixed(0)}`
      //
      //         if (timeLeftinMin == -0) {
      //           await axios.post("/logout", { withCredentials: true }).then(alert("Session Ended! You are Logged-out"), (window.location.href = "./login.html"))
      //           // .then((window.location.href = "./login.html"))
      //         }
      //       }, 1000)

      let timeNow = new Date().getTime() / 1000

      let timeLeft = respond.data.dashboardProfile.exp - timeNow

      let timeLeftinMin = Math.floor(timeLeft / 60)
      let timeLeftinSecond = Math.floor(timeLeft % 60)
      if (timeLeftinMin < 0) timeLeftinMin = 0

      if (timeLeftinSecond < 0) {
        timeLeftinSecond = 0
      }

      token.innerText = ` ${timeLeftinMin} minutes`

      setInterval(() => {
        //get the minutes
        let timeNow = new Date().getTime() / 1000

        let timeLeft = respond.data.dashboardProfile.exp - timeNow

        let timeLeftinMin = Math.floor(timeLeft / 60)
        let timeLeftinSecond = Math.floor(timeLeft % 60)
        if (timeLeftinMin < 0) timeLeftinMin = 0

        if (timeLeftinSecond < 0) {
          timeLeftinSecond = 0
        }

        token.innerText = ` ${timeLeftinMin} minutes`

        // token.innerText = ` ${timeLeftinMin} minutes : ${timeLeftinSecond} seconds`

        if (timeLeftinMin == 0 && timeLeftinSecond == 0) {
          clearInterval()
          axios.post("/logout", { withCredentials: true }).then(alert("Session Ended! You are Logged-out"), (window.location.href = "./login.html"))
          // .then((window.location.href = "./login.html"))
        }
      }, 60000)

      // if (timeLeftinMin === 0) {
      //   alert("Session Ended!")
      // }
    })
    .catch((err) => {
      alert(`\t Please Re-login To Your Account!" \n \n` + err)
      window.location.href = "./login.html"
    })
}

// const fetchData = async () => {
//   try {
//     const respond = await axios.get("http://127.0.0.1:3028/dashboard", { withCredentials: true })
//
//     firstname.innerText = respond.data.user.firstname
//     lastname.innerText = respond.data.user.lastname
//     id.innerText = respond.data.user.userUID
//     age.innerText = respond.data.user.age
//     email.innerText = respond.data.user.email
//     username.innerText = `${respond.data.user.firstname}  ${respond.data.user.lastname}`
//
//     editFirstName.value = respond.data.user.firstname
//     editLastName.value = respond.data.user.lastname
//     editAge.value = respond.data.user.age
//     editEmail.value = respond.data.user.email
//     dashboard.style.display = "block"
//
//     console.log(respond)
//   } catch (error) {
//     alert(error)
//     // window.location.href = "./login.html"
//     console.log(error)
//   }
// }

const handlerLogout = async () => {
  try {
    await axios.post(
      "http://127.0.0.1:3028/logout",
      {},
      {
        withCredentials: true,
      }
    )
    alert("Successfully Logout!")
    window.location.href = "./login.html"
  } catch (error) {
    alert(error)
  }
}

const handlerSaveEdit = async () => {
  // const username = JSON.parse(localStorage.getItem(`username`))
  // const newID = editId.value
  const newFirstName = editFirstName.value
  const newLastName = editLastName.value
  const newAge = editAge.value
  const newEmail = editEmail.value
  const userUID = id.innerHTML
  console.log(newFirstName, newLastName, newAge, userUID)

  // const respond = await axios.get('/')

  try {
    await axios.patch(
      `http://127.0.0.1:3028/users/edituser/${userUID}`,
      {
        firstname: newFirstName,
        lastname: newLastName,
        age: newAge,
        userUID: userUID,
      },
      { withCredentials: true }
    )

    // .then((response) => (window.location.href = "./login.html"))
  } catch (error) {
    alert(error)
    // handlerLogout()
  }
}

const handlerEditProfile = () => {
  // id.innerHTML = ""
  firstname.innerHTML = ""
  lastname.innerHTML = ""
  age.innerHTML = ""
  email.innerHTML = ""

  // editId.style.display = "block"
  editFirstName.style.display = "block"
  editLastName.style.display = "block"
  editAge.style.display = "block"
  editEmail.style.display = "block"
  editEmail.disabled = "true"

  saveEditButton.style.display = "block"
  saveCancelButton.style.display = "block"
  editProfileButton.style.display = "none"
}

// function validateUser() {
//   axios.get("/user").then((result) => console.log(result.data))
// }

// console.log(userdata)
// console.log(userToken)

// ============================
// EVEN / EVENLISTENER
// ============================
// window.addEventListener(`DOMContentLoaded`, fetchData)
