// ============================
// GET STATES
// ============================
const userdata = JSON.parse(localStorage.getItem("userdata"))
const userToken = JSON.parse(localStorage.getItem("userToken"))

// ============================
// REFERENCE
// ============================
const loginNotif = document.getElementById("login-notif")
const inputUsername = document.getElementById("username")
const inputPassword = document.getElementById("password")

//display elements
let id = document.getElementById("id")
let username = document.getElementById("username")
let firstname = document.getElementById("firstname")
let lastname = document.getElementById("lastname")
let age = document.getElementById("age")
let email = document.getElementById("email")

//input elements
let editId = document.getElementById("editId")
let editFirstName = document.getElementById("editFirstName")
let editLastName = document.getElementById("editLastName")
let editAge = document.getElementById("editAge")
let editEmail = document.getElementById("editEmail")

//button elements
let saveEditButton = document.querySelector(".saveEditButton")
let saveCancelButton = document.querySelector(".saveCancelButton")
let editProfileButton = document.querySelector(".editProfileButton")

// ============================
// HANDLER (BUTTON)
// ============================
const handlerLogin = async () => {
  try {
    const result = await axios.post("http://localhost:3028/signin", {
      username: inputUsername.value,
      password: inputPassword.value,
    })

    if (result.status === 200) {
      const data = result.data
      console.log(data)
      // console.log("userdata", userdata)
      console.log(data.token)
      window.location.href = "./dashboard.html"

      //       console.log(result)
      //
      //       console.log("result request", result.request)
      //       console.log("result response", result.response)
      localStorage.setItem("userToken", JSON.stringify(data.token)) //set Token on localStorage
      localStorage.setItem("username", JSON.stringify(data.username)) //set username on localStorage
    } else {
      window.location.href("./login.html")
      loginNotif.innerHTML = "Something wrong!"
      localStorage.removeItem("userToken")
      localStorage.removeItem("username")
      localStorage.clear()
    }

    // localStorage.setItem("userdata", JSON.stringify(userdata))
  } catch (error) {
    const errCode = error.response.status
    if (errCode) {
      loginNotif.style.display = "block"
      loginNotif.innerHTML = error.response.data.error

      setTimeout(() => {
        loginNotif.innerHTML = ""
        loginNotif.style.display = "none"
      }, 5000)
    }
  }
}

const fetchData = async () => {
  try {
    const lsUsername = JSON.parse(localStorage.getItem(`username`))
    const token = JSON.parse(localStorage.getItem(`userToken`))

    if (!lsUsername || !token || token === null || lsUsername === null) {
      alert("Please Login to your Account!")
      localStorage.clear()

      return (window.location.href = "login.html")
    }

    try {
      const response = await axios.post(
        "http://localhost:3028/dashboard",
        { username: lsUsername },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.status === 200) {
        console.log(response)

        document.getElementById("token").innerHTML = userToken
        document.getElementById("id").innerHTML = response.data.id
        document.getElementById("username").innerHTML = response.data.username
        document.getElementById("firstname").innerHTML = response.data.firstname
        document.getElementById("lastname").innerHTML = response.data.lastname
        document.getElementById("age").innerHTML = response.data.age
        document.getElementById("email").innerHTML = response.data.email
        document.getElementById("dashboard").style.display = "block"

        editId.value = response.data.id
        editFirstName.value = response.data.firstname
        editLastName.value = response.data.lastname
        editAge.value = response.data.age
        editEmail.value = response.data.email
      } else {
        // console.log(error.response.data.error);
        return (window.location.href = "login.html")
      }
    } catch (error) {
      // console.log(error.response.data.error);
      alert("Something Wrong! Please Re-login")
      localStorage.clear()

      return (window.location.href = "login.html")
    }
  } catch (error) {
    alert("Forbidden Action! Please Relogin")
    localStorage.clear()
    window.location.href = "./login.html"

    console.log(error)

    // window.location.href="login.html"
  }
}

const handlerLogout = () => {
  localStorage.clear()
  window.location.href = "./login.html"
}

const handlerSaveEdit = async () => {
  const username = JSON.parse(localStorage.getItem(`username`))
  const newID = editId.value
  const newFirstName = editFirstName.value
  const newLastName = editLastName.value
  const newAge = editAge.value
  const newEmail = editEmail.value
  console.log(username, newID, newFirstName, newLastName, newAge, newEmail)

  try {
    await axios.patch(`http://localhost:3028/users/edituser/${username}`, {
      username: username,
      id: newID,
      firstname: newFirstName,
      lastname: newLastName,
      age: newAge,
      email: newEmail,
      token: JSON.parse(localStorage.getItem(`userToken`)),
    })
  } catch (error) {
    localStorage.clear()
    alert("Please Relogin!", error)
    window.location.href = "login.html"
  }
}

const handlerEditProfile = () => {
  id.innerHTML = ""
  firstname.innerHTML = ""
  lastname.innerHTML = ""
  age.innerHTML = ""
  email.innerHTML = ""

  editId.style.display = "block"
  editFirstName.style.display = "block"
  editLastName.style.display = "block"
  editAge.style.display = "block"
  editEmail.style.display = "block"
  editEmail.disabled = "true"

  saveEditButton.style.display = "block"
  saveCancelButton.style.display = "block"
  editProfileButton.style.display = "none"
}

function validateUser() {
  axios.get("/user").then((result) => console.log(result.data))
}

// console.log(userdata)
// console.log(userToken)

// ============================
// EVEN / EVENLISTENER
// ============================
// window.addEventListener(`DOMContentLoaded`, fetchData)
