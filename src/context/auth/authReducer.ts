import { Reducer } from 'react';
import { AuthAction, AuthActionTypes, AuthState } from '../../types';

export const authReducer: Reducer<AuthState, AuthAction> = (state, action) => {
    switch (action.type) {
        case AuthActionTypes.SET_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.payload,
            };
        case AuthActionTypes.SET_TOKEN_CLIENT:
            return {
                ...state,
                tokenClient: action.payload,
            };
        default:
            return state;
    }
};
