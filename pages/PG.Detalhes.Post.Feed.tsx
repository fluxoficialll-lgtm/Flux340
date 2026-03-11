
import { ContainerFeedPadrao } from "../Componentes/ComponentesDeFeed/Container.Feed.Padrao";
import CabecalhoNavegacao from "../Componentes/cabeçalhos/Cabecalho.Navegacao";
import { usePostDetails } from "../hooks/usePostDetails";
import { ComentarioItem } from "../Componentes/ComponenteDeInterfaceDeUsuario/comments/Card.Comentario.Feed";

// Estrutura do comentário adaptada para o componente ComentarioItem
const mockComments = [
    { 
        id: 'c1',
        userId: 'user1',
        username: 'Mariana',
        avatar: 'https://i.pravatar.cc/150?u=mariana',
        text: 'Ótima análise!',
        timestamp: Date.now() - 100000,
        likes: 5,
        likedByMe: false
    },
    {
        id: 'c2',
        userId: 'user2',
        username: 'João',
        avatar: 'https://i.pravatar.cc/150?u=joao',
        text: 'Concordo plenamente.',
        timestamp: Date.now() - 200000,
        likes: 10,
        likedByMe: true
    },
];

export const PG_Detalhes_Post_Feed = () => {
    const { post, loading, error } = usePostDetails();

    if (loading) {
        return <div className="flex justify-center items-center h-screen bg-black text-white">Carregando post...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center mt-10">{error}</div>;
    }

    if (!post) {
        return <div className="text-center mt-10 text-white">Post não encontrado.</div>;
    }

    return (
        <div className="bg-black min-h-screen text-white pt-[65px]">
            <CabecalhoNavegacao titulo="Post" />
            <div className="p-4">
                <ContainerFeedPadrao post={post} />
                
                <div className="mt-8 pt-6 border-t border-gray-800">
                    <h2 className="text-xl font-bold text-white mb-5">Comentários</h2>
                    <div className="space-y-4">
                        {mockComments.map(comment => (
                            <ComentarioItem 
                                key={comment.id}
                                comment={comment as any} // Usando 'as any' para evitar problemas de tipagem com o mock
                                onReplyClick={() => {}}
                                onLike={() => {}}
                                onDelete={() => {}}
                                onUserClick={() => {}}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
