export enum ClientToServerMessage {
    NewPlayerToServer = 'newPlayerToServer',
    MovePlayerToServer = 'movePlayerToServer',
}

export enum ServerToClientMessage {
    NewPlayerToClient = 'newPlayerToClient',
    MovePlayerToClient = 'movePlayerToClient',
    GrowPlayerToClient = 'growPlayerToClient',
    RemovePlayerToClient = 'removePlayerToClient',
}
