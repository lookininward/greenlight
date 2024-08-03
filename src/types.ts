// Auth
export interface TokenClient {
    callback: () => void;
    requestAccessToken: () => void;
}

export interface AuthState {
    isAuthenticated: boolean;
    tokenClient?: TokenClient;
}

export enum AuthActionTypes {
    SET_AUTHENTICATED = 'SET_AUTHENTICATED',
    SET_TOKEN_CLIENT = 'SET_TOKEN_CLIENT',
}

export interface AuthPayload {
    isAuthenticated: boolean;
    tokenClient?: TokenClient;
}

export type AuthAction =
    | { type: AuthActionTypes.SET_AUTHENTICATED; payload: boolean }
    | { type: AuthActionTypes.SET_TOKEN_CLIENT; payload: TokenClient };


// Drive
export interface DriveState {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DriveAction = any