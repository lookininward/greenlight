import { Reducer } from 'react';
import { DriveState, DriveAction } from "../../types";

export const driveReducer: Reducer<DriveState, DriveAction> = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};