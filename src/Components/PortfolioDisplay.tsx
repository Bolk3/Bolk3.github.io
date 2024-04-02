import BlogPosts from "../scripts/BlogData.ts";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Card from "./Card.tsx";
import "../stylesheet/PortfolioDisplay.css"


interface Video {
    id: string | null;
    title: string | null;
    thumbnail: string | null;
    date: string | null;
}

interface YoutubeResponseItem {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        thumbnails: {
            high: {
                url: string;
            };
        };
        publishedAt: string;
    };
    status: {
        privacyStatus: string;
    };
}

export default function PortfolioDisplay(props: { direction: string; }) {
    const sortedBlogPosts = [...BlogPosts].sort((a, b) => b.id - a.id);
    const [items, setItems] = useState<(BlogPost | Video)[]>([]);
    const [length, setLength] = useState(6);

    const fetchData = async () => {
        const API_KEY = import.meta.env.REACT_APP_API_KEY;
        const CHANNEL_ID = 'UCx2Y_-wRMs_RZAeaJMvQgTA';
        const MAX_RESULTS = 10;

        const cachedData = localStorage.getItem('youtubeData');
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`;

        const response = await fetch(url);
        const data = await response.json();
        const videoIds = data.items.map((item: { id: { videoId: string; }; }) => item.id.videoId);

        const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds.join(',')}&part=snippet,status`;
        const detailsResponse = await fetch(detailsUrl);
        const detailsData = await detailsResponse.json();

        const videos = detailsData.items
            .filter((item: YoutubeResponseItem) => item.status.privacyStatus === 'public')
            .map((item: YoutubeResponseItem) => ({
                id: item.id.videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.high.url,
                date: item.snippet.publishedAt
            }));

        localStorage.setItem('youtubeData', JSON.stringify(videos));

        return videos;
    }

    useEffect(() => {
        if (props.direction === "yt") {
            fetchData().then(videos => setItems(videos));
        } else if (props.direction === "blog") {
            setItems(sortedBlogPosts);
        }
    }, [props.direction]);

    const update = () => {
        if (length < items.length) {
            setLength(length + 6);
        }
    }

    const renderItems = () => {
        const renderedItems = items.slice(0, length).map((value: BlogPost | Video, index) => {
            const link = props.direction === "yt" ? `https://www.youtube.com/watch?v=${value.id}` : `/portfolio/${value.id}`;
            const Component = props.direction === "yt" ? "a" : Link;
            return (
                <Component to={link} href={link} key={index} target="_blank" rel="noopener noreferrer">
                    <Card bg_url={value.thumbnail} title={value.title} date={value.date}/>
                </Component>
            );
        });

        // Ajoute des cartes invisibles si le nombre de cartes n'est pas un multiple de 3
        while (renderedItems.length % 3 !== 0) {
            renderedItems.push(
                <div style={{maxWidth: '300px', width: '300px', aspectRatio: 16/9}} key={renderedItems.length} />
            );
        }

        return renderedItems;
    }

    return (
        <div className={"workDisplay"}>
            {props.direction ==="blog"?<p id={"title"}>_all my projects</p>:<p id={"title"}>_all my video</p>}
            <div className={"container"}>
                {renderItems()}
            </div>
            <div className={"button"}>
                <button onClick={update}>More</button>
            </div>
        </div>
    )
}