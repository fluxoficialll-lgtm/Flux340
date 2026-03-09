
import React, { useState } from 'react';
import { useGroupChat } from '../hooks/useGroupChat';
import { useModal } from '../Componentes/ComponenteDeInterfaceDeUsuario/ModalSystem';
import { Virtuoso } from 'react-virtuoso';
import { ChatHeader } from '../Componentes/ComponentesDeChats/ChatHeader';
import { ChatInput } from '../Componentes/ComponentesDeChats/ChatInput';
import { MessageItem } from '../Componentes/ComponentesDeChats/MessageItem';
import { ChatMenuModal } from '../Componentes/ComponentesDeChats/ChatMenuModal';
import { ModalGradeDeAcoes } from '../Componentes/ComponentesDeChats/ModalGradeDeAcoes';

export const GroupChat: React.FC = () => {
  const {
    loading, group, messages, isBlocked, virtuosoRef, isSelectionMode, selectedIds, currentUserEmail,
    handleSendMessage, handleToggleSelection, handleStartSelection, deleteSelectedMessages, setIsSelectionMode, setSelectedIds, navigate
  } = useGroupChat();

  const { showOptions } = useModal();
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const handleDeleteRequest = async () => {
    if (selectedIds.length === 0) return;
    const target = await showOptions("Excluir Mensagem", [
        { label: 'Excluir para mim', value: 'me', icon: 'fa-solid fa-user' },
    ]);
    if (target) {
        deleteSelectedMessages(target as 'me' | 'all');
    }
  };

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
              <p className="text-xs uppercase font-bold tracking-widest">Carregando chat...</p>
          </div>
      );
  }

  return (
    <div className="messages-page h-[100dvh] flex flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white">
      <ChatHeader
        title={group?.name || 'Comunidade'}
        subtitle={group?.memberIds ? `${group.memberIds.length} membros` : ''}
        avatar={group?.avatarUrl}
        onBack={() => navigate(`/groups`)}
        onInfoClick={() => navigate(`/group-settings/${group?.id}`)}
        isSelectionMode={isSelectionMode}
        selectedCount={selectedIds.length}
        onCancelSelection={() => { setIsSelectionMode(false); setSelectedIds([]); }}
        onDeleteSelection={handleDeleteRequest}
        isSearchOpen={false}
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
                      isGroup={true}
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
        onSearch={() => {}}
        onSelect={() => setIsSelectionMode(true)}
        onBlock={() => {}}
        onClear={() => {}}
      />

      {zoomedMedia && (
          <div className="fixed inset-0 z-[60] bg-black bg-opacity-95 flex items-center justify-center p-2" onClick={() => setZoomedMedia(null)}>
              <img src={zoomedMedia.url} className="max-w-full max-h-full object-contain" />
          </div>
      )}
    </div>
  );
};
