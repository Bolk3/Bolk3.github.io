import {Outlet, Link, useLocation} from "react-router-dom";
import "../stylesheet/Header.css"
import {useState} from "react";
import hmb from '../assets/icons8-menu-50.png'

export default function Header(){
    const current = useLocation().pathname;

    const [isHome, setIsHome] = useState(current === "/");
    const [isAbout, setIsAbout] = useState(current === "/about");
    const [isPort, setIsPort] = useState(current === "/portfolio");
    const [isCon, setIsCon] = useState(current === "/contact");
    const [isMenu, setIsMenu] = useState(false);

    const updateHome = () =>{
        setIsHome(true);
        setIsAbout(false);
        setIsPort(false);
        setIsCon(false);
    }

    const updateAbout = () =>{
        setIsHome(false);
        setIsAbout(true);
        setIsPort(false);
        setIsCon(false);
    }

    const updatePort = () =>{
        setIsHome(false);
        setIsAbout(false);
        setIsPort(true);
        setIsCon(false);
    }

    const updateCon = () =>{
        setIsHome(false);
        setIsAbout(false);
        setIsPort(false);
        setIsCon(true);
    }

    const updateMenu = () =>{
        setIsMenu(!isMenu);
    }

    return(
        <>
            <nav className={"navbar"}>
                <h1 className={"logo"}>Bolk3</h1>
                <div className={`nav-link${isMenu ? ' mobile-menu' : ''}`}>
                    <ul>
                        <li className={isHome ? `active` : ""}>
                            <Link to={"/"} onClick={updateHome}>Home</Link>
                        </li>
                        <li className={isAbout ? `active` : ""}>
                            <Link to={"/about"} onClick={updateAbout}>About me</Link>
                        </li>
                        <li className={isPort ? `active` : ""}>
                            <Link to={"/portfolio"} onClick={updatePort}>Portfolio</Link>
                        </li>
                        <li className={isCon ? `active` : ""}>
                            <Link to={"/contact"} onClick={updateCon}>Contact</Link>
                        </li>
                    </ul>
                </div>
                <a className={"menuHmb"} onClick={updateMenu}><img src={hmb}/></a>
            </nav>
            <Outlet/>
        </>
    )
}