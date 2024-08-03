import { useEffect, useMemo } from 'react';
import { useAuthDispatch, useAuthState } from '../context/auth/authHooks';
import { useDriveDispatch, useDriveState } from '../context/drive/driveHooks';
import { DriveItem, DriveType } from '../types';
import AuthInfo from './AuthInfo';
import FolderNav from './FolderNav';
import DriveListItem from './DriveListItem';
import Search from './Search';

const DriveContainer = () => {
    const { isAuthenticated } = useAuthState();
    const { currentFolder, content, history, searchResults } = useDriveState();
    const { onAuthorize } = useAuthDispatch();
    const { getFolder, goBack, onSearch } = useDriveDispatch();

    const parentFolder = useMemo(() => {
        return history.length > 0 ? history[history.length - 1].folder : undefined;
    }, [history]);

    const showContent = useMemo(() => {
        return !searchResults.length && content && content.length > 0;
    }, [content, searchResults]);

    const showSearchResults = useMemo(() => {
        return searchResults && searchResults.length > 0;
    }, [searchResults]);

    const onClickItem = (item: DriveItem) => {
        if (item.mimeType === DriveType.FOLDER) {
            getFolder(item.id, item.name);
            return;
        }

        if (!item.webViewLink) return;
        window.open(item.webViewLink, '_blank');
    }

    useEffect(() => {
        if (!isAuthenticated) return;
        getFolder();
    }, [isAuthenticated, getFolder]);

    return (
        <div className='bg-slate-800 w-full h-full px-5 py-4 md:p-10 text-white flex flex-col items-center overflow-y-auto'>
            <h1 className='my-10 text-3xl'>Greenlight Drive</h1>

            {!isAuthenticated &&
                <button
                    id="authorize_button"
                    className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-10'
                    onClick={onAuthorize}
                >
                    Authorize
                </button>
            }

            {isAuthenticated ? (
                <div className='w-full max-w-3xl flex flex-col gap-y-3'>
                    <Search onSearch={onSearch} />

                    {!showSearchResults &&
                        <FolderNav
                            parentFolder={parentFolder}
                            currentFolder={currentFolder}
                            goBack={goBack}
                        />
                    }

                    {showContent && (
                        <div className='flex flex-col gap-y-4'>
                            {content.map(item =>
                                <DriveListItem
                                    key={item.id}
                                    item={item}
                                    onClickItem={(item: DriveItem) => onClickItem(item)}
                                />
                            )}
                            {content.length === 0 && <p>No files found.</p>}
                        </div>
                    )}

                    {showSearchResults && (
                        <div className='flex flex-col gap-y-4 mt-4'>
                            {searchResults.map(item =>
                                <DriveListItem
                                    key={item.id}
                                    item={item}
                                    onClickItem={(item: DriveItem) => onClickItem(item)}
                                />
                            )}
                        </div>
                    )}
                </div>
            ) : <AuthInfo />}
        </div>
    );
};

export default DriveContainer;