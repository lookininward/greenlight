import { Reducer } from 'react';
import { DriveState, DriveAction, DriveActionTypes } from "../../types";

export const driveReducer: Reducer<DriveState, DriveAction> = (state, action) => {
    switch (action.type) {
        case DriveActionTypes.PUSH_CONTENT:
            return {
                ...state,
                history: [...state.history, { content: state.content, folder: state.currentFolder }],
                content: action.payload.content,
                currentFolder: action.payload.folder,
            };
        case DriveActionTypes.POP_CONTENT: {
            const last = state.history[state.history.length - 1] || { content: [], folder: undefined };
            return {
                ...state,
                content: last.content,
                currentFolder: last.folder,
                history: state.history.slice(0, -1),
            };
        }
        default:
            return state;
    }
};