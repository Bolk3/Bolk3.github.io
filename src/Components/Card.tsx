import React from 'react';
import '../stylesheet/Card.css';

interface CardProps {
    bg_url: string | null;
    title: string | null;
    date: string | null;
}

const Card: React.FC<CardProps> = ({ bg_url, title, date }) => {
    const backgroundStyle: React.CSSProperties = {
        backgroundImage: `url(${bg_url})`,
    };

    const truncateTitle = (title: string | null, limit: number): string | null => {
        if (title && title.length > limit) {
            return `${title.substring(0, limit).toLowerCase()}...`;
        }
        return title ? title.toLowerCase() : title;
    };

    const formatDate = (date: string | null): string | null => {
        if (date) {
            const options: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
            return new Date(date).toLocaleDateString(undefined, options);
        }
        return date;
    };

    return (
        <div className="card">
            <div className="bg" style={backgroundStyle}></div>
            <div className="content">
                <h1>{truncateTitle(title, 20)}</h1>
                <p>{formatDate(date)}</p>
            </div>
        </div>
    );
};

export default Card;