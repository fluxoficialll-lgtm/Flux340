
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMessages } from '../hooks/useMessages';
import { MessagesMenuModal } from '../Componentes/ComponentesDeChats/MessagesMenuModal';
import { MainHeader } from '../Componentes/layout/MainHeader';
import { MessageListItem } from '../Componentes/ComponentesDeChats/MessageListItem';
import { MessagesEmptyState } from '../Componentes/ComponentesDeChats/MessagesEmptyState';
import { MessagesFooter } from '../Componentes/ComponentesDeChats/MessagesFooter';

export const Messages: React.FC = () => {
  const navigate = useNavigate();
  const {
    contacts,
    isMenuModalOpen,
    setIsMenuModalOpen,
    isSelectionMode,
    setIsSelectionMode,
    selectedIds,
    setSelectedIds,
    unreadNotifs,
    unreadMsgs,
    handleMarkAllRead,
    handleContactClick,
    handleProfileNavigate,
    handleClearSelected,
    closeMenuAndEnterSelection
  } = useMessages();

  return (
    <div className="h-[100dvh] bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-hidden">
        <MainHeader 
            leftContent={isSelectionMode ? (
                <button onClick={() => { setIsSelectionMode(false); setSelectedIds([]); }} className="text-[#00c2ff] text-lg"><i className="fa-solid fa-xmark"></i></button>
            ) : (
                <button onClick={() => setIsMenuModalOpen(true)} className="text-[#00c2ff] text-lg"><i className="fa-solid fa-sliders"></i></button>
            )}
            rightContent={isSelectionMode ? (
                <button 
                  onClick={handleClearSelected} 
                  disabled={selectedIds.length === 0} 
                  className="text-[#ff4d4d] text-lg disabled:opacity-30"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
            ) : (
                <button onClick={() => navigate('/groups')} className="text-[#00c2ff] text-lg"><i className="fa-solid fa-users"></i></button>
            )}
        />

        <main className="flex-grow pt-[80px] pb-[100px] overflow-y-auto no-scrollbar">
            {isSelectionMode && (
              <div className="w-full text-center py-2 bg-[#0f2b38] font-bold text-xs sticky top-0 z-10">
                {selectedIds.length} selecionada(s)
              </div>
            )}
            
            <div className="w-full">
                {contacts.length > 0 ? contacts.map(contact => (
                    <MessageListItem 
                      key={contact.id}
                      contact={contact}
                      isSelected={selectedIds.includes(contact.id)}
                      isSelectionMode={isSelectionMode}
                      onClick={() => handleContactClick(contact)}
                      onAvatarClick={(e) => handleProfileNavigate(e, contact.handle)}
                    />
                )) : (
                    <MessagesEmptyState />
                )}
            </div>
        </main>

        <MessagesFooter 
          uiVisible={true} // Simplified, can be managed by hook if needed
          unreadMsgs={unreadMsgs}
          unreadNotifs={unreadNotifs}
        />

        <MessagesMenuModal 
            isOpen={isMenuModalOpen}
            onClose={() => setIsMenuModalOpen(false)}
            onSelectMode={closeMenuAndEnterSelection}
            onMarkAllRead={handleMarkAllRead}
            onViewBlocked={() => navigate('/blocked-users')}
        />
    </div>
  );
};
