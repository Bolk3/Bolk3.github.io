import Header from "./Components/Header.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Portfolio from "./pages/Portfolio.tsx";
import Contact from "./pages/Contact.tsx";
import About from "./pages/About.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Header/>}>
            <Route index element={<Home/>}/>
            <Route path={"portfolio"} element={<Portfolio/>}/>
            <Route path={"contact"} element={<Contact/>}/>
            <Route path={"about"} element={<About/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
