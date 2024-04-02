import { useEffect, useState } from "react";
import "../stylesheet/HomeHero.css"

interface Time {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function HomeHero(){
    const [time, setTime] = useState<Time>({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const birthDate = new Date(2003, 6, 3, 16, 0, 0); // Votre date de naissance
        const intervalId = setInterval(() => {
            const now = new Date();
            const delta = now.getTime() - birthDate.getTime();

            const deltaSeconds = Math.floor(delta / 1000);
            const deltaMinutes = Math.floor(deltaSeconds / 60);
            const deltaHours = Math.floor(deltaMinutes / 60);
            const deltaDays = Math.floor(deltaHours / 24);

            setTime({
                years: Math.floor(deltaDays / 365),
                months: Math.floor((deltaDays % 365) / 30),
                days: deltaDays % 30,
                hours: deltaHours % 24,
                minutes: deltaMinutes % 60,
                seconds: deltaSeconds % 60
            });
        }, 1000);

        return () => clearInterval(intervalId); // Nettoyer sur le démontage
    }, []);

    return(
        <div className={"hero"}>
            <div className={"container"}>
                <div className={"clock"}>
                    <span id={"yea"}>{time.years}</span>
                    <span id={"mth"}>{time.months}</span>
                    <span id={"day"}>{time.days}</span>
                    <span id={"hrs"}>{time.hours}</span>
                    <span id={"min"}>{time.minutes}</span>
                    <span id={"sec"}>{time.seconds}</span>
                </div>
            </div>
        </div>
    )
}