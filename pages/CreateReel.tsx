
import React, { useRef } from 'react';
import { useCreateReel } from '../hooks/useCreateReel';

export const CreateReel: React.FC = () => {
  const {
    description, setDescription,
    videoPreview,
    isCreating,
    uploadProgress,
    userGroups,
    selectedGroupId, setSelectedGroupId,
    handleFileChange,
    handleSubmit,
    navigate
  } = useCreateReel();

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-screen bg-[#0c0f14] text-white font-['Inter'] flex flex-col">
      <header className="flex items-center justify-between p-4 bg-[#0c0f14] fixed w-full top-0 z-50 border-b border-white/10 h-[65px]">
        <button onClick={() => navigate(-1)} className="text-[#00c2ff] text-xl p-2 hover:bg-white/5 rounded-full transition-all">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <span className="text-xs font-black uppercase tracking-[2px]">Novo Reel</span>
        <button 
          onClick={handleSubmit} 
          disabled={!videoPreview || isCreating}
          className="text-sm font-bold text-[#00c2ff] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreating ? 'Publicando...' : 'Publicar'}
        </button>
      </header>

      <main className="pt-[75px] pb-5 w-full max-w-[500px] mx-auto flex-grow px-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
          <div 
            className="w-full aspect-[9/16] bg-black/30 border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center cursor-pointer relative overflow-hidden"
            onClick={() => fileInputRef.current?.click()}
          >
            {videoPreview ? (
              <video src={videoPreview} className="w-full h-full object-cover" controls={false} autoPlay loop muted />
            ) : (
              <div className="text-center opacity-50">
                <i className="fa-solid fa-video text-4xl mb-2"></i>
                <p className="font-semibold">Toque para selecionar um vídeo</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="video/*" 
              className="hidden" 
            />
          </div>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Escreva uma legenda..."
            maxLength={500}
            className="bg-transparent border border-white/20 rounded-lg p-3 w-full h-28 resize-none outline-none focus:border-[#00c2ff] transition-all"
          />

          <select 
            value={selectedGroupId}
            onChange={(e) => setSelectedGroupId(e.target.value)}
            className="bg-black/20 border border-white/20 rounded-lg p-3 w-full outline-none focus:border-[#00c2ff] appearance-none"
          >
            <option value="none">Publicar no Feed Principal</option>
            {userGroups.map(group => (
              <option key={group.id} value={group.id}>
                Publicar no grupo: {group.name}
              </option>
            ))}
          </select>

          {isCreating && (
            <div className="w-full bg-black/50 rounded-full h-2.5 mt-2">
              <div 
                className="bg-[#00c2ff] h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
              <p className="text-center text-xs mt-1">{Math.round(uploadProgress)}%</p>
            </div>
          )}
        </form>
      </main>
    </div>
  );
};
