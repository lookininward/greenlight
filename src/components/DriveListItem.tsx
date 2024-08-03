import { FC } from 'react';
import { DriveItem, DriveType } from '../types';

interface DriveListItemProps {
    item: DriveItem;
    onClickItem: (item: DriveItem) => void;
}

const DriveListItem: FC<DriveListItemProps> = ({ item, onClickItem }) => {
    return (
        <div
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
    );
};

export default DriveListItem;