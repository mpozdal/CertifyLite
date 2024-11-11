import React from 'react';

function SearchBar({ query, setQuery }) {
	return (
		<div className="relative flex items-center w-full lg:w-[300px] ">
			<input
				type="text"
				placeholder="Search files..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="w-full -z-100 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
			/>
			<i className="fa-solid fa-magnifying-glass absolute right-3 text-gray-400"></i>
		</div>
	);
}

export default SearchBar;
