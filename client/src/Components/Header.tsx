import "../index.css"
import { Fragment } from "react"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <Fragment>
      <div className="nav" style={{ backgroundColor: "white" }}>
        <div className="myLogo"></div>
        <div className="menu">
          <ul className="menu-list">
            <li>
              <Link to={"/"}>Home</Link>{" "}
            </li>

            <li>
              <Link to={"/dashboard"}>Dashboard</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </ul>
        </div>
        <div className="author"> </div>
      </div>
    </Fragment>
  )
}

export default Header
