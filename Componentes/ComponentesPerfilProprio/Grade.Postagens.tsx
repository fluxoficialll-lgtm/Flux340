import React from 'react';
import { ContainerFeedPadrao } from '../ComponentesDeFeed/Container.Feed.Padrao';

interface PostFeedProps {
    posts: any[];
}

export const GradeDePostagens: React.FC<PostFeedProps> = ({ posts }) => {
    if (!posts || posts.length === 0) {
        return <div className="text-center text-gray-400 py-10">Sem postagens para exibir.</div>;
    }

    return (
        <div className="flex flex-col gap-4 px-3">
            {posts.map(post => (
                <ContainerFeedPadrao 
                    key={post.id} 
                    post={post} 
                />
            ))}
        </div>
    );
};
