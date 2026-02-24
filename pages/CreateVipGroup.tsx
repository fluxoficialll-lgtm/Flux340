
import React from 'react';
import { useCreateVipGroup } from '../hooks/useCreateVipGroup';
import { PixelSettingsModal } from '../Componentes/groups/PixelSettingsModal';
import { AccessTypeModal } from '../Componentes/groups/AccessTypeModal';
import { CurrencySelectorModal } from '../Componentes/groups/CurrencySelectorModal';
import { ProviderSelectorModal } from '../Componentes/groups/ProviderSelectorModal';
import { ImageCropModal } from '../Componentes/ComponenteDeInterfaceDeUsuario/ImageCropModal';
import { UploadProgressCard } from '../Componentes/ComponentesDeGroups/Componentes/ComponentesModoHub/UploadProgressCard';

export const CreateVipGroup: React.FC = () => {
  const {
    groupName, setGroupName,
    description, setDescription,
    coverImage,
    vipMediaItems,
    vipDoorText, setVipDoorText,
    vipButtonText, setVipButtonText,
    price,
    currency,
    accessType,
    accessConfig,
    selectedProviderId,
    pixelId,
    isProviderModalOpen, setIsProviderModalOpen,
    isPixelModalOpen, setIsPixelModalOpen,
    isAccessModalOpen, setIsAccessModalOpen,
    isCurrencyModalOpen, setIsCurrencyModalOpen,
    isCropOpen, setIsCropOpen,
    rawImage,
    isCreating,
    hasProvider,
    isUploading,
    uploadProgress,
    uploadCurrent,
    uploadTotal,
    allowedCurrencies,
    handleProviderSelect,
    handleCoverChange,
    handleCroppedImage,
    handleVipMediaChange,
    moveVipMediaItem,
    removeMediaItem,
    handlePriceChange,
    handleSavePixel,
    handleBack,
    handleSubmit,
    setAccessType,
    setAccessConfig,
    setCurrency,
    navigate
  } = useCreateVipGroup();

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      default: return 'R$';
    }
  };

  const getAccessTypeLabel = () => {
      if (accessType === 'lifetime') return 'Vitalício';
      if (accessType === 'temporary' && accessConfig) return `Renova a cada ${accessConfig.interval} dias (Máx 2x)`;
      if (accessType === 'one_time' && accessConfig) return `Expira em ${accessConfig.days}d ${accessConfig.hours}h`;
      return 'Escolher';
  };

  const getProviderLabel = () => {
      if (!selectedProviderId) return 'Escolher';
      if (selectedProviderId === 'syncpay') return 'SyncPay (Pix)';
      if (selectedProviderId === 'stripe') return 'Stripe';
      if (selectedProviderId === 'paypal') return 'PayPal';
      return selectedProviderId.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-x-hidden">
        <style>{`
        * { margin:0; padding:0; box-sizing:border-box; font-family:'Inter',sans-serif; }
        header {
            display:flex; align-items:center; justify-content:space-between; padding:16px 32px;
            background: #0c0f14; position:fixed; width:100%; z-index:10; border-bottom:1px solid rgba(255,255,255,0.1);
            top: 0; left:0; height: 80px;
        }
        header button { background:none; border:none; color:#00c2ff; font-size:18px; cursor:pointer; transition:0.3s; }
        header button:hover { color:#fff; }
        main { flex-grow:1; display:flex; flex-direction:column; align-items:center; justify-content:flex-start; width:100%; padding-top: 100px; padding-bottom: 150px; }
        #groupCreationForm { width:100%; max-width:500px; padding:0 20px; display: flex; flex-direction: column; gap: 20px; }
        h1 { font-size: 24px; text-align: center; margin-bottom: 20px; background: -webkit-linear-gradient(145deg, #FFD700, #B8860B); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 700; }
        .cover-upload-container { display: flex; flex-direction: column; align-items: center; margin-bottom: 10px; }
        .cover-preview { width: 120px; height: 120px; border-radius: 50%; border: 3px solid #FFD700; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 0 20px rgba(255, 215, 0, 0.2); }
        .cover-preview:hover { border-color: #fff; box-shadow: 0 0 25px rgba(255, 215, 0, 0.4); }
        .cover-preview img { width: 100%; height: 100%; object-fit: cover; }
        .cover-icon { font-size: 40px; color: rgba(255,255,255,0.3); }
        .cover-label { margin-top: 10px; font-size: 14px; color: #FFD700; cursor: pointer; font-weight: 600; }
        .form-group { display: flex; flex-direction: column; }
        .form-group label { font-size: 13px; color: #FFD700; margin-bottom: 8px; font-weight: 600; }
        .form-group input, .form-group textarea { background: #1e2531; border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 8px; color: #fff; padding: 12px; font-size: 16px; transition: border-color 0.3s; }
        .form-group input:focus, .form-group textarea:focus { border-color: #FFD700; outline: none; box-shadow: 0 0 5px rgba(255, 215, 0, 0.5); }
        .form-group textarea { resize: vertical; min-height: 100px; }
        .vip-door-section { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; margin-top: 10px; }
        .section-title { font-size: 16px; color: #FFD700; font-weight: 700; margin-bottom: 15px; display: flex; align-items: center; gap: 8px; }
        
        .media-preview-item { width: 80px; height: 100px; flex-shrink: 0; border-radius: 12px; overflow: hidden; position: relative; border: 1px solid rgba(255, 215, 0, 0.2); background: #000; }
        .media-preview-item img, .media-preview-item video { width: 100%; height: 100%; object-fit: cover; }
        
        /* Controls Overlay */
        .media-controls-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.6); display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 6px; opacity: 0; transition: 0.2s; }
        .media-preview-item:hover .media-controls-overlay { opacity: 1; }
        
        .reorder-btn { width: 22px; height: 22px; border-radius: 6px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 9px; }
        .reorder-btn:hover { background: #00c2ff; color: #000; border-color: #00c2ff; }
        .reorder-btn:disabled { opacity: 0.2; cursor: not-allowed; }
        
        .remove-media-btn-new { width: 22px; height: 22px; border-radius: 6px; background: rgba(255, 77, 77, 0.2); border: 1px solid rgba(255, 77, 77, 0.4); color: #ff4d4d; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 9px; }
        .remove-media-btn-new:hover { background: #ff4d4d; color: #fff; }

        .add-media-btn { width: 80px; height: 100px; flex-shrink: 0; border-radius: 12px; border: 1px dashed #FFD700; background: rgba(255, 215, 0, 0.05); display: flex; flex-direction: column; align-items: center; justify-content: center; color: #FFD700; cursor: pointer; gap: 5px; }
        .add-media-btn:hover { background: rgba(255, 215, 0, 0.1); }
        .add-media-btn span { font-size: 10px; font-weight: 600; text-align: center; }
        .common-button { background: #FFD700; border: none; border-radius: 8px; color: #000; padding: 16px 20px; font-size: 18px; font-weight: 700; cursor: pointer; transition: background 0.3s, transform 0.1s; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 8px rgba(255, 215, 0, 0.3); margin-top: 20px; }
        .common-button:hover { background: #e6c200; }
        .common-button:active { transform: scale(0.99); }
        .common-button:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .price-group { display: flex; flex-direction: column; gap: 10px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); }
        .price-group label { font-size: 16px; color: #FFD700; font-weight: 700; }
        .price-input-container { display: flex; align-items: center; background: #1e2531; border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 8px; overflow: hidden; margin-bottom: 5px; }
        .price-input-container span { padding: 12px; background: #28303f; color: #aaa; font-size: 16px; font-weight: 700; min-width: 50px; text-align: center; }
        .price-input-container input { flex-grow: 1; border: none; background: none; padding: 12px; text-align: right; color: #fff; font-weight: 700; }
        
        .selector-trigger {
            width: 100%;
            background: #1e2531;
            border: 1px solid rgba(255, 215, 0, 0.3);
            border-radius: 12px;
            padding: 14px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            transition: 0.3s;
            margin-bottom: 5px;
        }
        .selector-trigger:hover {
            border-color: #FFD700;
            background: rgba(255, 215, 0, 0.05);
        }
        .selector-trigger .label { font-size: 13px; color: #888; font-weight: 500; }
        .selector-trigger .value { font-size: 14px; color: #fff; font-weight: 700; display: flex; align-items: center; gap: 10px; text-align: right; }
        .selector-trigger .value span.curr-sym { width: 32px; text-align: center; color: #FFD700; font-weight: 900; }

        .add-pixel-btn { width: 100%; padding: 14px; background: rgba(255, 255, 255, 0.05); border: 1px dashed #FFD700; border-radius: 12px; color: #FFD700; font-weight: 700; font-size: 14px; cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .add-pixel-btn:hover { background: rgba(255, 215, 0, 0.1); }
      `}</style>

      <header>
        <button onClick={handleBack}><i className="fa-solid fa-arrow-left"></i></button>
        <div className="absolute left-1/2 -translate-x-1/2 w-[60px] h-[60px] bg-white/5 rounded-2xl flex justify-center items-center z-20 cursor-pointer shadow-[0_0_20px_rgba(0,194,255,0.3),inset_0_0_20px_rgba(0,194,255,0.08)]" onClick={() => navigate('/feed')}>
             <div className="absolute w-[40px] h-[22px] rounded-[50%] border-[3px] border-[#00c2ff] rotate-[25deg]"></div>
             <div className="absolute w-[40px] h-[22px] rounded-[50%] border-[3px] border-[#00c2ff] -rotate-[25deg]"></div>
        </div>
      </header>

      <main>
        <form id="groupCreationForm" onSubmit={handleSubmit}>
            <h1>Novo Grupo VIP</h1>
            
            {!hasProvider && (
                <div style={{ background: 'rgba(234, 179, 8, 0.1)', border: '1px solid #eab308', borderRadius: '8px', padding: '12px', marginBottom: '20px', fontSize: '13px', color: '#fef08a' }}>
                    <i className="fa-solid fa-triangle-exclamation" style={{marginRight:'8px'}}></i>
                    Nenhum provedor conectado. <button type="button" onClick={() => navigate('/financial/providers')} style={{textDecoration:'underline', fontWeight:'bold', background:'none', border:'none', color:'inherit', cursor:'pointer'}}>Conectar agora</button>
                </div>
            )}

            <div className="cover-upload-container">
                <label htmlFor="coverImageInput" className="cover-preview">
                    {coverImage ? <img src={coverImage} alt="Cover" /> : <i className="fa-solid fa-crown cover-icon"></i>}
                </label>
                <label htmlFor="coverImageInput" className="cover-label">Capa Principal</label>
                <input type="file" id="coverImageInput" accept="image/*" style={{display: 'none'}} onChange={handleCoverChange} />
            </div>

            <div className="form-group">
                <label htmlFor="groupName">Nome do Grupo</label>
                <input type="text" id="groupName" value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Ex: Comunidade Flux Pro" required />
            </div>
            
            <div className="form-group">
                <label htmlFor="groupDescription">Descrição</label>
                <textarea id="groupDescription" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Sobre o que é este grupo?"></textarea>
            </div>

            <div className="vip-door-section">
                <div className="section-title"><i className="fa-solid fa-door-open"></i> Galeria da Porta VIP</div>
                <div className="flex flex-wrap gap-2.5 mb-4">
                    {vipMediaItems.map((item, idx) => (
                        <div key={idx} className="media-preview-item animate-fade-in">
                            {item.type === 'video' ? <video src={item.url} /> : <img src={item.url} alt={`Preview ${idx}`} />}
                            
                            <div className="media-controls-overlay">
                                <div className="flex gap-1">
                                    <button 
                                        type="button"
                                        onClick={() => moveVipMediaItem(idx, 'left')}
                                        disabled={idx === 0}
                                        className="reorder-btn"
                                    >
                                        <i className="fa-solid fa-chevron-left"></i>
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => moveVipMediaItem(idx, 'right')}
                                        disabled={idx === vipMediaItems.length - 1}
                                        className="reorder-btn"
                                    >
                                        <i className="fa-solid fa-chevron-right"></i>
                                    </button>
                                </div>
                                <button type="button" className="remove-media-btn-new" onClick={() => removeMediaItem(idx)}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>

                            <div className="absolute bottom-1 left-1 bg-black/60 text-[7px] font-black text-white px-1 py-0.5 rounded border border-white/5">
                                #{idx + 1}
                            </div>
                        </div>
                    ))}
                    {vipMediaItems.length < 10 && (
                        <label htmlFor="vipMediaInput" className="add-media-btn">
                            <i className="fa-solid fa-plus"></i>
                            <span>Adicionar</span>
                        </label>
                    )}
                    <input type="file" id="vipMediaInput" accept="image/*,video/*" multiple style={{display:'none'}} onChange={handleVipMediaChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="vipCopyright">Texto de Venda</label>
                    <textarea id="vipCopyright" value={vipDoorText} onChange={(e) => setVipDoorText(e.target.value)} placeholder="Copy persuasiva..."></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="vipButtonText">Texto do Botão (Opcional)</label>
                    <input type="text" id="vipButtonText" value={vipButtonText} onChange={(e) => setVipButtonText(e.target.value)} placeholder="Ex: Assinar (Padrão: COMPRAR AGORA)" maxLength={20} />
                </div>
            </div>
            
            <div className="price-group">
                <label>Venda e Acesso</label>

                <div className="selector-trigger" onClick={() => setIsProviderModalOpen(true)}>
                    <div className="flex flex-col text-left">
                        <span className="label">Escolher provedor:</span>
                        <span className="value">
                            <i className="fa-solid fa-wallet"></i>
                            {getProviderLabel()}
                        </span>
                    </div>
                    <i className="fa-solid fa-chevron-right text-[#FFD700]"></i>
                </div>
                
                <div className="selector-trigger" onClick={() => setIsAccessModalOpen(true)}>
                    <div className="flex flex-col text-left">
                        <span className="label">Tipo de acesso:</span>
                        <span className="value">
                            <i className={`fa-solid ${accessType === 'lifetime' ? 'fa-infinity' : accessType === 'temporary' ? 'fa-calendar-days' : 'fa-ticket'}`}></i>
                            {getAccessTypeLabel()}
                        </span>
                    </div>
                    <i className="fa-solid fa-chevron-right text-[#FFD700]"></i>
                </div>

                <div className="selector-trigger" onClick={() => setIsCurrencyModalOpen(true)}>
                    <div className="flex flex-col text-left">
                        <span className="label">Moeda para cobrança:</span>
                        <span className="value">
                            <span className="curr-sym">{getCurrencySymbol()}</span>
                            {currency}
                        </span>
                    </div>
                    <i className="fa-solid fa-chevron-right text-[#FFD700]"></i>
                </div>

                <div className="price-input-container">
                    <span>{getCurrencySymbol()}</span>
                    <input type="text" value={price} onChange={handlePriceChange} placeholder="0,00" required />
                </div>
            </div>

            <div className="vip-door-section">
                <div className="section-title"><i className="fa-solid fa-rocket"></i> Marketing Avançado</div>
                <button type="button" className="add-pixel-btn" onClick={() => setIsPixelModalOpen(true)}>
                    <i className="fa-solid fa-plus-circle"></i>
                    {pixelId ? 'PIXEL CONFIGURADO' : 'ADICIONAR PIXEL'}
                </button>
                {pixelId && <p className="text-[10px] text-[#00ff82] text-center mt-2 font-bold uppercase tracking-widest"><i className="fa-solid fa-check"></i> Meta Pixel Ativo</p>}
            </div>

            <button type="submit" className="common-button" disabled={isCreating || isUploading}>
                {isCreating || isUploading ? <i className="fa-solid fa-circle-notch fa-spin mr-2"></i> : "Criar Grupo"}
            </button>
        </form>

        <UploadProgressCard 
            progress={uploadProgress}
            current={uploadCurrent}
            total={uploadTotal}
            isVisible={isUploading}
        />
      </main>

      <ProviderSelectorModal 
        isOpen={isProviderModalOpen}
        onClose={() => setIsProviderModalOpen(false)}
        selectedProviderId={selectedProviderId}
        onSelect={handleProviderSelect}
      />

      <PixelSettingsModal 
        isOpen={isPixelModalOpen}
        onClose={() => setIsPixelModalOpen(false)}
        initialData={{ metaId: pixelId, metaToken: pixelId }}
        onSave={(platform, data) => handleSavePixel(data)}
      />

      <AccessTypeModal 
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
        currentType={accessType}
        onSelect={(type, config) => {
            setAccessType(type);
            setAccessConfig(config);
        }}
      />

      <CurrencySelectorModal 
        isOpen={isCurrencyModalOpen}
        onClose={() => setIsCurrencyModalOpen(false)}
        currentCurrency={currency}
        onSelect={(curr) => setCurrency(curr)}
        allowedCurrencies={allowedCurrencies}
      />

      <ImageCropModal 
        isOpen={isCropOpen}
        imageSrc={rawImage}
        onClose={() => setIsCropOpen(false)}
        onSave={handleCroppedImage}
      />
    </div>
  );
};
