import React from 'react';
import { ContainerFeed } from '../ComponentesDeFeed/Container.Feed';

// O tipo 'Post' aqui deve ser o mesmo esperado pelo ContainerFeed
// Por enquanto, usaremos 'any' para flexibilidade com os dados mock
interface PostFeedProps {
    posts: any[];
}

// Este componente agora renderiza uma lista de posts completos, como um feed.
export const GradeDePostagens: React.FC<PostFeedProps> = ({ posts }) => {
    if (!posts || posts.length === 0) {
        return <div className="no-content">Sem postagens.</div>;
    }

    // Funções de placeholder para as ações do post
    // Elas não fazem nada, mas são necessárias para o ContainerFeed renderizar.
    const handlePlaceholder = (action: string) => () => {
        console.log(`${action} clicado, mas não implementado nesta tela.`);
    };

    return (
        <div className="flex flex-col gap-4 px-3">
            {posts.map(post => (
                <ContainerFeed 
                    key={post.id} 
                    post={post} 
                    // Passando as funções de placeholder
                    onLike={handlePlaceholder('Like')}
                    onDelete={handlePlaceholder('Delete')}
                    onUserClick={handlePlaceholder('User Click')}
                    onCommentClick={handlePlaceholder('Comment')}
                    onShare={handlePlaceholder('Share')}
                    onVote={handlePlaceholder('Vote')}
                    onCtaClick={handlePlaceholder('CTA Click')}
                />
            ))}
        </div>
    );
};
