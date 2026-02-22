
import React, { useState } from 'react';
import { useGroupChat } from '../hooks/useGroupChat';
import { useModal } from '../Componentes/ModalSystem';
import { Virtuoso } from 'react-virtuoso';
import { ChatHeader } from '../Componentes/ComponentesDeChats/ChatHeader';
import { ChatInput } from '../Componentes/ComponentesDeChats/ChatInput';
import { MessageItem } from '../Componentes/ComponentesDeChats/MessageItem';
import { ChatMenuModal } from '../Componentes/ComponentesDeChats/ChatMenuModal';
import { ModalGradeDeAcoes } from '../Componentes/ComponentesDeChats/ModalGradeDeAcoes';

export const GroupChat: React.FC = () => {
  const {
    loading, group, channelName, messages, isBlocked, virtuosoRef, isSelectionMode, selectedIds, currentUserEmail,
    handleSendMessage, handleToggleSelection, handleStartSelection, deleteSelectedMessages, setIsSelectionMode, setSelectedIds, navigate
  } = useGroupChat();

  const { showOptions } = useModal();
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const handleDeleteRequest = async () => {
    if (selectedIds.length === 0) return;
    const target = await showOptions("Excluir Mensagem", [
        { label: 'Excluir para mim', value: 'me', icon: 'fa-solid fa-user' },
        // No futuro, podemos adicionar lógica para permitir "Excluir para todos" apenas para admins do grupo
        // { label: 'Excluir para todos', value: 'all', icon: 'fa-solid fa-users', isDestructive: true }
    ]);
    if (target) {
        deleteSelectedMessages(target as 'me' | 'all');
    }
  };

  // TODOs para futuras implementações
  const handleEdit = () => console.log('Editar', selectedIds);
  const handlePin = () => console.log('Fixar', selectedIds);
  const handleCopy = () => console.log('Copiar', selectedIds);
  const handleForward = () => console.log('Encaminhar', selectedIds);
  const handleReply = () => console.log('Responder', selectedIds);
  const [zoomedMedia, setZoomedMedia] = useState<{ url: string, type: 'image' | 'video' } | null>(null);

  if (loading) {
      return (
          <div className="flex flex-col items-center justify-center h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white">
              <i className="fa-solid fa-circle-notch fa-spin text-2xl text-[#00c2ff] mb-2"></i>
              <p className="text-xs uppercase font-bold tracking-widest">Carregando canal...</p>
          </div>
      );
  }

  return (
    <div className="messages-page h-[100dvh] flex flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white">
      <ChatHeader
        title={group?.name || 'Comunidade'}
        subtitle={`# ${channelName}`}
        avatar={group?.avatarUrl}
        onBack={() => navigate(`/groups/${group?.id}`)}
        onInfoClick={() => navigate(`/groups/info/${group?.id}`)}
        isSelectionMode={isSelectionMode}
        selectedCount={selectedIds.length}
        onCancelSelection={() => { setIsSelectionMode(false); setSelectedIds([]); }}
        onDeleteSelection={handleDeleteRequest}
        isSearchOpen={false} // TODO: Implementar busca
        onToggleSearch={() => {}}
        searchTerm={null}
        onSearchChange={() => {}}
        onMenuClick={() => setIsMenuModalOpen(true)}
      />

      <main className="flex-grow w-full flex flex-col pt-[60px]">
          <ModalGradeDeAcoes 
            visible={isSelectionMode} 
            onEdit={handleEdit}
            onPin={handlePin}
            onCopy={handleCopy}
            onForward={handleForward}
            onReply={handleReply}
          />
          <Virtuoso
              ref={virtuosoRef}
              className="h-full pb-[80px] no-scrollbar"
              data={messages}
              initialTopMostItemIndex={messages.length - 1}
              followOutput="smooth"
              itemContent={(index, msg) => (
                  <MessageItem
                      key={msg.id}
                      msg={msg}
                      isMe={msg.senderEmail?.toLowerCase() === currentUserEmail}
                      isGroup={true} // Indica que é um chat de grupo para mostrar nome/avatar do remetente
                      isSelectionMode={isSelectionMode}
                      isSelected={selectedIds.includes(msg.id)}
                      onSelect={handleToggleSelection}
                      onStartSelection={handleStartSelection}
                      onMediaClick={(url, type) => setZoomedMedia({ url, type })}
                      onProductClick={(pid) => navigate(`/marketplace/product/${pid}`)}
                  />
              )}
          />
      </main>

      {!isSelectionMode && (
        <ChatInput
            onSendMessage={handleSendMessage}
            onSendAudio={() => {}} // TODO: Implementar áudio
            onFileSelect={() => {}} // TODO: Implementar envio de arquivo
            isBlocked={isBlocked}
            isUploading={false} // TODO: Implementar estado de upload
        />
      )}

      <ChatMenuModal 
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        isBlocked={isBlocked}
        onSearch={() => {}} // TODO
        onSelect={() => setIsSelectionMode(true)}
        onBlock={() => {}} // TODO: Lógica de bloquear/mutar grupo?
        onClear={() => {}} // TODO: Lógica de limpar chat
      />

      {zoomedMedia && (
          <div className="fixed inset-0 z-[60] bg-black bg-opacity-95 flex items-center justify-center p-2" onClick={() => setZoomedMedia(null)}>
              <img src={zoomedMedia.url} className="max-w-full max-h-full object-contain" />
          </div>
      )}
    </div>
  );
};
