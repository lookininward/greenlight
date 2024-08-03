interface Window {
    gapi: {
        load: (api: string, callback: () => void) => void;
        client: {
            init: (config: { apiKey: string; discoveryDocs: string[] }) => Promise<void>;
            setToken: (token: { access_token: string }) => void;
            getToken: () => { access_token: string } | null;
            drive: {
                files: {
                    list: (config: { 
                        q: string;
                        pageSize: number; 
                        fields: string
                    }) => Promise<{ result: { files: DriveItem[] } }>;
                };
            };
        };
    };
    google: {
        accounts: {
            oauth2: {
                initTokenClient: (config: { client_id: string; scope: string; callback: (any) => void }) => TokenClient;
                revoke: (token: string) => void;
            };
        };
    };
}