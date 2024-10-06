import React from 'react';

function FileDetails({ data, removeSelectedFile }) {
	return (
		<div className="relative h-[3rem]  my-3 w-full lg:w-[50%] p-3 leading-5 border-blue-500 bg-blue-100 rounded-full border-2 ">
			{data !== null && (
				<button
					className="absolute top-[-2px] p-3 w-[3rem] h-[3rem] right-0  text-red-500 hover:text-red-300  transition"
					onClick={removeSelectedFile}
				>
					{' '}
					<i class="fa-solid fa-x"></i>
				</button>
			)}

			{data === null ? 'Choose a file...' : data?.name}
		</div>
	);
}

export default FileDetails;
