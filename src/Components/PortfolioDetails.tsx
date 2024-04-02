import React from 'react';
import BlogPosts from '../scripts/BlogData.ts';
import { useParams } from 'react-router-dom';

const PortfolioDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const post = BlogPosts.find(post => post.id === Number(id));

    if (!post) {
        return <div className={"notFound"}>Post not found</div>;
    }

    return (
        <div className={"post"}>
            <img src={post.thumbnail} alt={""}/>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
};

export default PortfolioDetails;