import { useContext } from 'react';
import { DriveState } from '../../types';
import { DriveStateContext, DriveDispatchContext } from './DriveProvider';

export const useDriveState = (): DriveState => {
    const context = useContext(DriveStateContext);
    if (context === undefined) {
        throw new Error('useDriveState must be used within a DriveProvider');
    }
    return context;
};

export const useDriveDispatch = () => {
    const context = useContext(DriveDispatchContext);
    if (context === undefined) {
        throw new Error('useDriveDispatch must be used within a DriveProvider');
    }
    return context;
};