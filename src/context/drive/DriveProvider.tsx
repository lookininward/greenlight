import { ReactNode, useReducer, createContext, useCallback } from 'react';
import { DriveActionTypes, DriveItem, DriveState, DriveType } from '../../types';
import { driveReducer } from './driveReducer';

const initialDriveState: DriveState = {
    content: [],
    history: [],
    currentFolder: undefined,
};

export const DriveStateContext = createContext<DriveState>(initialDriveState);
export const DriveDispatchContext = createContext<{
    getFolder: (folderId?: string, folderName?: string) => void;
    goBack: () => void;
} | undefined>(undefined);

const DriveProvider = ({ children }: { children: ReactNode }) => {
    const [driveState, dispatch] = useReducer(driveReducer, initialDriveState);

    const setFolderData = useCallback((files: DriveItem[], folderId?: string, folderName?: string) => {
        const isRoot = !folderId || !folderName;
        const folder = {
            id: folderId || '',
            name: folderName || 'Root',
            mimeType: isRoot ? '' : DriveType.FOLDER,
        };

        const content = files && files.length > 0 ? files : [];

        dispatch({
            type: DriveActionTypes.PUSH_CONTENT,
            payload: { content, folder },
        });
    }, []);

    const getFolder = useCallback(async (folderId?: string, folderName?: string) => {
        try {
            const getRoot = !folderId || !folderName;
            const response = await window.gapi.client.drive.files.list({
                q: getRoot ? `mimeType='${DriveType.FOLDER}' and name='greenlight'` : `'${folderId}' in parents`,
                pageSize: getRoot ? 1 : 100,
                fields: 'files(id, name, mimeType, parents, webViewLink)',
            });

            const files: DriveItem[] = response.result.files;
            setFolderData(files, folderId, folderName);
        } catch (err) {
            console.error('Error loading folder:', err);
            return;
        }

    }, [setFolderData]);

    const goBack = useCallback(() => {
        dispatch({ type: DriveActionTypes.POP_CONTENT });
    }, []);

    return (
        <DriveStateContext.Provider value={driveState}>
            <DriveDispatchContext.Provider value={{ getFolder, goBack }}>
                {children}
            </DriveDispatchContext.Provider>
        </DriveStateContext.Provider>
    );
};

export { DriveProvider };