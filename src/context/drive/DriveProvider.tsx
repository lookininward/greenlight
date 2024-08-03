import { ReactNode, useReducer, createContext, useCallback } from 'react';
import { DriveActionTypes, DriveItem, DriveState, DriveType } from '../../types';
import { driveReducer } from './driveReducer';

const initialDriveState: DriveState = {
    content: [],
    history: [],
    currentFolder: undefined,
    searchResults: [],
};

export const DriveStateContext = createContext<DriveState>(initialDriveState);
export const DriveDispatchContext = createContext<{
    getFolder: (folderId?: string, folderName?: string) => void;
    goBack: () => void;
    onSearch: (fileName: string) => void;
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

    const setSearchResults = useCallback((files: DriveItem[]) => {
        const content = files && files.length > 0 ? files : [];
        dispatch({
            type: DriveActionTypes.SET_SEARCH_RESULTS,
            payload: content,
        });
    }, []);

    const onSearch = useCallback(async (fileName: string) => {
        try {
            const folderId = import.meta.env.VITE_GREENLIGHT_FOLDER_ID;
            const response = await window.gapi.client.drive.files.list({
                q: `name contains '${fileName}' and '${folderId}' in parents`,
                pageSize: 10,
                fields: 'files(id, name, mimeType, parents, webViewLink)',
            });
            const files: DriveItem[] = response.result.files;
            setSearchResults(files);
        } catch (err) {
            console.error('Error searching for folder:', err);
            return;
        }
    }, [setSearchResults]);

    return (
        <DriveStateContext.Provider value={driveState}>
            <DriveDispatchContext.Provider value={{ getFolder, goBack, onSearch }}>
                {children}
            </DriveDispatchContext.Provider>
        </DriveStateContext.Provider>
    );
};

export { DriveProvider };