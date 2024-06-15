import "./App.css"
import Header from "./Components/Header"
import Body from "./Components/Body"
import Footer from "./Components/Footer"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Fragment } from "react"

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <Body />
        {/* <Footer /> */}
      </BrowserRouter>
    </Fragment>
  )
}

export default App
