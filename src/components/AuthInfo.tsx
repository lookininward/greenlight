import { FC } from 'react';

const AuthInfo: FC = () => {
    return (
        <div className="mx-4 md:w-1/2 flex flex-col items-center bg-gray-700 p-4 py-10 rounded-lg shadow-xl text-center ">
            <p className="text-white text-lg mb-2">Click 'authorize' to enable access to your Google Drive.</p>
            <p className="text-gray-400 text-sm">
                In this demo, the app will retrieve and display contents from the 'greenlight' folder at the root of your drive.
            </p>
        </div>
    );
};

export default AuthInfo;