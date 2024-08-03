import { FC } from 'react';
import { DriveItem } from '../types';

interface FolderNavProps {
    parentFolder?: DriveItem;
    currentFolder?: DriveItem;
    goBack: () => void;
}

const FolderNav: FC<FolderNavProps> = ({ parentFolder, currentFolder, goBack }) => {
    return (
        <div className="w-full flex py-4 gap-x-1 text-xl">
            {parentFolder && currentFolder?.name !== 'Root' && (
                <h2 className="cursor-pointer hover:underline" onClick={goBack}>
                    {parentFolder?.name} {' > '}
                </h2>
            )}
            <h2 className="font-semibold">{currentFolder?.name}</h2>
        </div>
    );
};

export default FolderNav;