import { ReactNode, useReducer, createContext } from 'react';
import { DriveState } from '../../types';
import { driveReducer } from './driveReducer';

const initialDriveState: DriveState = {};

export const DriveStateContext = createContext<DriveState>(initialDriveState);
export const DriveDispatchContext = createContext({});

const DriveProvider = ({ children }: { children: ReactNode }) => {
    const [driveState] = useReducer(driveReducer, initialDriveState);
    return (
        <DriveStateContext.Provider value={driveState}>
            <DriveDispatchContext.Provider value={{}}>
                {children}
            </DriveDispatchContext.Provider>
        </DriveStateContext.Provider>
    );
};

export { DriveProvider };