import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import "./index.css";

export const SearchInput = ({
    handleSearch = () => { },
    fetchData = () => { },
    controlSearch = "false"
}) => {
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        if (searchKeyword === "" && controlSearch) fetchData();
    }, [searchKeyword, controlSearch, fetchData])


    return (
        <form onSubmit={(e) => handleSearch(e, searchKeyword)} className="flex items-center justify-center py-8">
            <div className="search_box">
                <input
                    type="text"
                    className="search_input"
                    placeholder="Search by product name..."
                    required
                    value={searchKeyword}
                    onChange={e => setSearchKeyword(e.target.value)}
                />
                <button type="submit" className="search_icon">
                    <AiOutlineSearch className="text-gray-700 cursor-pointer" />
                </button>

            </div>
        </form>
    )
}

