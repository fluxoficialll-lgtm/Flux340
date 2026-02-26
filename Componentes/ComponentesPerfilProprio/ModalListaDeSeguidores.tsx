import React from 'react';

interface FollowListModalProps {
    isOpen: boolean;
    onClose: () => void;
    users: any[];
    title: string;
}

export const ModalListaDeSeguidores: React.FC<FollowListModalProps> = ({ isOpen, onClose, users, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg shadow-xl max-w-sm w-full mx-4">
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <button onClick={onClose} className="text-white">&times;</button>
                </div>
                <div className="p-4 max-h-80 overflow-y-auto">
                    {users.map(user => (
                        <div key={user.id} className="flex items-center mb-4">
                            <img src={user.avatar} alt={user.nickname} className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <p className="font-bold">{user.nickname}</p>
                                <p className="text-gray-400">{user.username}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
