import "../stylesheet/Card.css"
function Card(props:{bg_url: string, title: string, date: string}){

    const background = {
        backgroundImage: `url(${props.bg_url})`,
    }

    return(
        <div className={"card"}>
            <div className={"bg"} style={background}></div>
            <div className={"content"}>
                <h1>{props.title}</h1>
                <p>{props.date}</p>
            </div>
        </div>
    )
}

export default Card;