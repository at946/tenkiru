import { atom } from 'jotai';
import type { Socket } from 'socket.io-client';
import type { IFClientToServerEvents, IFServerToClientEvents } from '@/interfaces/socket';

type SocketType = Socket<IFServerToClientEvents, IFClientToServerEvents> | null;

export const socketAtom = atom<SocketType>(null);
