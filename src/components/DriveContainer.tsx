import { useEffect, useMemo } from 'react';
import { useAuthDispatch, useAuthState } from '../context/auth/authHooks';
import { useDriveDispatch, useDriveState } from '../context/drive/driveHooks';
import { DriveItem, DriveType } from '../types';
import AuthInfo from './AuthInfo';

const DriveContainer = () => {
    const { isAuthenticated } = useAuthState();
    const { currentFolder, content, history } = useDriveState();
    const { onAuthorize } = useAuthDispatch();
    const { getFolder, goBack } = useDriveDispatch();

    const parentFolder = useMemo(() => {
        return history.length > 0 ? history[history.length - 1].folder : undefined;
    }, [history]);

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
                    <div className="w-full flex py-4 gap-x-1 text-xl">
                        {parentFolder && currentFolder?.name !== 'Root' && (
                            <h2 className="cursor-pointer hover:underline" onClick={goBack}>
                                {parentFolder?.name} {' > '}
                            </h2>
                        )}
                        <h2 className="font-semibold">{currentFolder?.name}</h2>
                    </div>
                    <div className='flex flex-col gap-y-4'>
                        {content.map(item =>
                            <div
                                key={item.id}
                                className="
                                    flex items-center border border-gray-400 p-4 hover:bg-gray-500 cursor-pointer rounded shadow-md bg-gray-700
                                    border-transparent border-l-4 hover:border-gray-500 transition-all duration-300
                                "
                                onClick={() => onClickItem(item)}
                            >
                                <div className="mr-4 pr-4 w-20 italic text-xs border-r border-gray-400">
                                    {item.mimeType === DriveType.FOLDER && 'Folder'}
                                    {item.mimeType === DriveType.FILE && 'File'}
                                    {item.mimeType === DriveType.DOCUMENT && 'Document'}
                                    {item.mimeType === DriveType.SHEET && 'Sheet'}
                                </div>
                                <h2>{item.name}</h2>
                            </div>
                        )}
                        {content.length === 0 && <p>No files found.</p>}
                    </div>
                </div>
            ) : <AuthInfo />}
        </div>
    );
};

export default DriveContainer;