import HomeHero from "../Components/HomeHero.tsx";
import PortfolioDisplay from "../Components/PortfolioDisplay.tsx";
import {Link} from "react-router-dom";
export default function Home(){

    return(
        <>
            <HomeHero/>
            <Link to={"/contact"}>contact me</Link>
            <PortfolioDisplay direction={"blog"}/>
            <PortfolioDisplay direction={"yt"}/>
        </>
    )
}