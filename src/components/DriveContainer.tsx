import { useAuthDispatch, useAuthState } from '../context/auth/authHooks';
import AuthInfo from './AuthInfo';

const DriveContainer = () => {
    const { isAuthenticated } = useAuthState();
    const { onAuthorize } = useAuthDispatch();
    return (
        <div className='bg-slate-800 w-full h-full px-5 py-4 md:p-10 text-white flex flex-col items-center overflow-y-auto'>
            <h1 className='my-10 text-3xl'>Greenlight Drive</h1>
            <button
                id="authorize_button"
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-10'
                onClick={onAuthorize}
            >
                Authorize
            </button>

            {!isAuthenticated && <AuthInfo />}
        </div>
    );
};

export default DriveContainer;