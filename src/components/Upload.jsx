import React from 'react';
import { FileInput, Label } from 'flowbite-react';
function Upload({ selectedFile, handleFileChange }) {
	return (
		<Label
			htmlFor="dropzone-file"
			className="flex h-40 w-full lg:w-[50%] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-500  hover:bg-gray-100 "
		>
			<div className="flex flex-col items-center justify-center pb-6 pt-5">
				<svg
					className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 16"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
					/>
				</svg>
				{selectedFile ? (
					<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
						<span className="font-semibold">Selected file:</span>{' '}
						{selectedFile.name}
					</p>
				) : (
					<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
						<span className="font-semibold">Click to upload</span>{' '}
						or drag and drop
					</p>
				)}
			</div>
			<FileInput
				id="dropzone-file"
				className="hidden"
				onChange={handleFileChange}
			/>
		</Label>
	);
}

export default Upload;
