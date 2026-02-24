import React, { useRef } from 'react';
import { useEditProfile } from '../hooks/useEditProfile';
import { ImageCropModal } from '../Componentes/ComponenteDeInterfaceDeUsuario/ImageCropModal';

export const EditProfile: React.FC = () => {
  const {
    formData, 
    imagePreview, 
    loading, 
    fetching, 
    usernameError,
    isCropOpen, 
    setIsCropOpen, 
    rawImage, 
    handleChange, 
    handleImageChange, 
    handleCroppedImage, 
    handleSubmit, 
    handleBack
  } = useEditProfile();

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (fetching) return <div className="min-h-screen bg-[#0c0f14] flex items-center justify-center text-white">Carregando...</div>;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-x-hidden">
      <style>{`
        header { display:flex; align-items:center; justify-content:space-between; padding:16px; background: #0c0f14; position:fixed; width:100%; top:0; z-index:10; border-bottom:1px solid rgba(255,255,255,0.1); height: 65px; }
        header .back-btn { background:none; border:none; color:#fff; font-size:24px; cursor:pointer; padding-right: 15px; }
        main { padding-top: 85px; padding-bottom: 40px; width: 100%; max-width: 600px; margin: 0 auto; padding-left: 20px; padding-right: 20px; }
        .avatar-section { display: flex; flex-direction: column; align-items: center; margin-bottom: 30px; }
        .avatar-wrapper { position: relative; width: 100px; height: 100px; border-radius: 50%; cursor: pointer; }
        .avatar-img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 3px solid #00c2ff; }
        .edit-icon { position: absolute; bottom: 0; right: 0; background: #00c2ff; color: #000; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #0c0f14; }
        .input-group { margin-bottom: 20px; }
        .input-group label { display: block; font-size: 13px; color: #aaa; margin-bottom: 8px; }
        .input-group input, .input-group textarea { width: 100%; padding: 14px 15px; background: #1a1e26; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: #fff; font-size: 16px; outline: none; }
        .save-btn { width: 100%; padding: 16px; background: #00c2ff; color: #000; border: none; border-radius: 12px; font-weight: 800; cursor: pointer; }
      `}</style>
      <header>
        <button onClick={handleBack} className="back-btn"><i className="fa-solid fa-arrow-left"></i></button>
        <h1>Editar Perfil</h1>
        <div style={{width: '24px'}}></div>
      </header>
      <main>
        <div className="avatar-section">
            <div className="avatar-wrapper" onClick={() => fileInputRef.current?.click()}>
                {imagePreview ? <img src={imagePreview} className="avatar-img" /> : <div className="avatar-img bg-gray-700 flex items-center justify-center"><i className="fa-solid fa-user text-4xl"></i></div>}
                <div className="edit-icon"><i className="fa-solid fa-camera"></i></div>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" hidden />
        </div>
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label>Apelido</label>
                <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} />
            </div>
            <div className="input-group">
                <label>Nome de Usuário (@)</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
                {usernameError && <p className="text-red-500 text-xs mt-1">{usernameError}</p>}
            </div>
            <div className="input-group">
                <label>Biografia</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="save-btn" disabled={loading}>{loading ? 'Salvando...' : 'Salvar Alterações'}</button>
        </form>
      </main>
      <ImageCropModal isOpen={isCropOpen} imageSrc={rawImage} onClose={() => setIsCropOpen(false)} onSave={handleCroppedImage} />
    </div>
  );
};
