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
export interface DriveItem {
    id: string;
    name: string;
    mimeType: string;
    parents?: string[];
    webViewLink?: string;
    webContentLink?: string;
}

export enum DriveType {
    FILE = 'text/plain',
    FOLDER = 'application/vnd.google-apps.folder',
    DOCUMENT = 'application/vnd.google-apps.document',
    SHEET = 'application/vnd.google-apps.spreadsheet',
}

export interface DriveState {
    content: DriveItem[];
    history: { content: DriveItem[], folder?: DriveItem }[];
    currentFolder?: DriveItem;
}

export enum DriveActionTypes {
    PUSH_CONTENT = 'PUSH_CONTENT',
    POP_CONTENT = 'POP_CONTENT',
}

export interface PushContentPayload {
    content: DriveItem[];
    folder: { id: string; name: string; mimeType: string };
}

export type DriveAction =
    | { type: DriveActionTypes.PUSH_CONTENT; payload: PushContentPayload }
    | { type: DriveActionTypes.POP_CONTENT }