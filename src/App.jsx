
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./Components/login"
import Signup from "./Components/Signup"


const App = () => {
  return (
    <div>
     <Router>
      <Routes>
        <Route exact path="/" element={<Landing />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>

      </Routes>
     </Router>
    </div>
  )
}

export default App
