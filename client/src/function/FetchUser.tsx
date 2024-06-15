import axios from "axios"

const fetchUser = async () => {
  //   const [firstName, setFirstName] = useState("")
  //   const [lastName, setLastName] = useState("")
  //   const [age, setAge] = useState("")
  //   const [email, setEmail] = useState("")
  //   const [uid, setUID] = useState("")
  //   const [dashboard, setDashboard] = useState(false)
  try {
    await axios
      .get("http://127.0.0.1:3028/dashboard", { withCredentials: true })
      .then(() => {
        window.location.href = "./dashboard"
        //
        //       setFirstName(result.data.dashboardProfile.firstName)
        //       setLastName(result.data.dashboardProfile.lastName)
        //       setAge(result.data.dashboardProfile.age)
        //       setEmail(result.data.dashboardProfile.email)
        //       setUID(result.data.dashboardProfile.userUID)
        //
        //       setDashboard(true)
      })
      .catch((err) => console.log(err))
  } catch (error) {
    return console.log(error)
  }

  //   return <></>
}
export default fetchUser
