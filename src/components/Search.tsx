import { FC, ChangeEvent, useState, useCallback, useEffect } from "react";

const Search: FC<{ onSearch: (fileName: string) => void }> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedSearch = useCallback(
        (value: string) => {
            const handler = setTimeout(() => {
                onSearch(value);
            }, 300);

            return () => {
                clearTimeout(handler);
            };
        },
        [onSearch]
    );

    useEffect(() => {
        if (searchTerm.length < 3) return;

        const handler = debouncedSearch(searchTerm);
        return () => {
            handler();
        };
    }, [searchTerm, debouncedSearch]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value);

    return (
        <input
            className='bg-slate-900 text-white px-4 py-2 rounded w-full max-w-md'
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search..."
        />
    );
};

export default Search;