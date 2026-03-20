
const mockNotifications = [
  {
    id: 'notif-1',
    read: false,
    created_at: new Date().toISOString(),
    type: 'new_follower',
    actor: {
      name: 'João Seguidor',
      handle: 'joaosegue',
      avatar: 'https://i.pravatar.cc/150?u=joao',
    },
    entity: null,
  },
  {
    id: 'notif-2',
    read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    type: 'group_invite',
    actor: {
      name: 'Admin do Grupo',
      handle: 'admingrupo',
      avatar: 'https://i.pravatar.cc/150?u=admin',
    },
    entity: {
        text: 'Grupo de Testes'
    },
  },
  {
    id: 'notif-3',
    read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    type: 'comment',
    actor: {
      name: 'Maria Comentadora',
      handle: 'mariacoment',
      avatar: 'https://i.pravatar.cc/150?u=maria',
    },
    entity: {
      text: 'Bela foto! Adorei a paisagem.',
    },
  },
    {
    id: 'notif-4',
    read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    type: 'like',
    actor: {
      name: 'Carlos Curtidor',
      handle: 'carloscurte',
      avatar: 'https://i.pravatar.cc/150?u=carlos',
    },
    entity: {
      text: 'sua foto',
    },
  },
];

export const notificationsHandlers = {};

export { mockNotifications };
