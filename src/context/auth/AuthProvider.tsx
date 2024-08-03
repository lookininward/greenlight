import { useReducer, createContext, useEffect } from 'react';
import { AuthActionTypes, AuthState, TokenClient } from '../../types';
import { loadGapiClient, loadGIS } from './authHelpers';
import { authReducer } from './authReducer';

const initialAuthState: AuthState = {
    isAuthenticated: false,
    tokenClient: undefined,
};

export const AuthStateContext = createContext<AuthState>(initialAuthState);
export const AuthDispatchContext = createContext<{ onAuthorize: () => void } | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authState, dispatch] = useReducer(authReducer, initialAuthState);

    useEffect(() => {
        const onGisInit = (tokenClient: TokenClient) => dispatch({ type: AuthActionTypes.SET_TOKEN_CLIENT, payload: tokenClient });
        loadGapiClient();
        loadGIS(onGisInit);
    }, []);

    const onAuthorize = () => {
        const { tokenClient } = authState;
        if (!tokenClient) return;
        tokenClient.callback = () => dispatch({ type: AuthActionTypes.SET_AUTHENTICATED, payload: true });
        tokenClient.requestAccessToken();
    };

    return (
        <AuthStateContext.Provider value={authState}>
            <AuthDispatchContext.Provider value={{ onAuthorize }}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
};

export { AuthProvider };