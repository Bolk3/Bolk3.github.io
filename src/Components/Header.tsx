import {Outlet, Link, useLocation} from "react-router-dom";
import "../stylesheet/Header.css"
import {useState, useEffect} from "react";
import hmb from '../../public/assets/icons8-menu-50.png'

export default function Header(){
    const location = useLocation();
    const [current, setCurrent] = useState(location.pathname);
    const [isMenu, setIsMenu] = useState(false);

    useEffect(() => {
        setCurrent(location.pathname);
    }, [location]);

    const updateMenu = () =>{
        setIsMenu(!isMenu);
    }

    return(
        <>
            <nav className={"navbar"}>
                <h1 className={"logo"}>Bolk3</h1>
                <div className={`nav-link${isMenu ? ' mobile-menu' : ''}`}>
                    <ul>
                        <li className={current === "/" ? `active` : ""}>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li className={current.includes("/about") ? `active` : ""}>
                            <Link to={"/about"}>About me</Link>
                        </li>
                        <li className={current.includes("/portfolio") ? `active` : ""}>
                            <Link to={"/portfolio"}>Portfolio</Link>
                        </li>
                        <li className={current.includes("/contact") ? `active` : ""}>
                            <Link to={"/contact"}>Contact</Link>
                        </li>
                    </ul>
                </div>
                <a className={"menuHmb"} onClick={updateMenu}><img src={hmb}/></a>
            </nav>
            <Outlet/>
        </>
    )
}