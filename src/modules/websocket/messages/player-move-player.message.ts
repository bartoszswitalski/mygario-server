import { Coords } from 'src/types/coords.type';

export type MovePlayerMessage = {
    userName: string;
    position: Coords;
};
