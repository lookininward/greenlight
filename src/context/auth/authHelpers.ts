import { TokenClient } from "../../types";

const initializeGapiClient = async () => {
    const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
    const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
    await window.gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
};

const gapiLoaded = () => {
    window.gapi.load('client', () => initializeGapiClient());
};

export const loadGapiClient = () => {
    const gapiScript = document.createElement('script');
    gapiScript.src = 'https://apis.google.com/js/api.js';
    gapiScript.onload = () => gapiLoaded();
    document.body.appendChild(gapiScript);
};

const gisLoaded = (onGisInit: (tokenClient: TokenClient) => void) => {
    const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
    const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: () => {},
    });

    onGisInit(tokenClient);
};

export const loadGIS = (onGisInit: (tokenClient: TokenClient) => void) => {
    const gisScript = document.createElement('script');
    gisScript.src = 'https://accounts.google.com/gsi/client';
    gisScript.onload = () => gisLoaded(onGisInit);
    document.body.appendChild(gisScript);
};