import { Fragment } from "react"
import "../index.css"
import Login from "../Pages/Login"
import { Routes, Route } from "react-router-dom"
import Dashboard from "../Pages/Dashboard"
import Home from "./Home"
const Body = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </Fragment>
  )
}

export default Body
