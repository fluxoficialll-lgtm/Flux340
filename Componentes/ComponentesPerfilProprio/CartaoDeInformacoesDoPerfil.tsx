import React from 'react';
import './CartaoDeInformacoesDoPerfil.css';
import { UserAvatar } from '../ComponenteDeInterfaceDeUsuario/user/UserAvatar';
import { UserName } from '../ComponenteDeInterfaceDeUsuario/user/UserName';
import { Stat } from './Stat';

export const CartaoDeInformacoesDoPerfil = () => {
    return (
        <div className="profile-info-card">

            <div className="avatar-container">
                <UserAvatar size={"xl"} />
            </div>

            <div className="user-details">
                <UserName username="Usuário" isVerified={true} />
                <p className="handle">@user</p>
                <p className="bio">Sem biografia definida.</p>
            </div>

            <div className="stats-container">
                <Stat value={10} label="Posts" />
                <Stat value={100} label="Seguidores" />
                <Stat value={50} label="Seguindo" />
            </div>

            <div className="profile-actions">
                <button className="btn-edit">Editar Perfil</button>
                <button className="btn-share">Compartilhar Perfil</button>
            </div>

        </div>
    );
};