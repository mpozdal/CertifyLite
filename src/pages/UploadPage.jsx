import React, { useEffect, useState } from 'react';
import { FileInput, Label } from 'flowbite-react';
import FileDetails from '../components/FileDetails';
function UploadPage() {
	const [selectedFile, setSelectedFile] = useState(null);
	const onSelectFile = () => {
		const file = document.querySelector('#dropzone-file').files;
		setSelectedFile(file[0]);
	};
	const removeSelectedFile = () => {
		if (selectedFile !== null) {
			setSelectedFile(null);
		}
	};

	return (
		<div className="flex justify-center items-center  flex-col">
			<Label
				htmlFor="dropzone-file"
				className="flex h-64 w-full lg:w-[50%] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-500  hover:bg-gray-100 "
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
					<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
						<span className="font-semibold">Click to upload</span>{' '}
						or drag and drop
					</p>
				</div>
				<FileInput
					id="dropzone-file"
					className="hidden"
					onChange={onSelectFile}
				/>
			</Label>
			<FileDetails
				data={selectedFile}
				removeSelectedFile={removeSelectedFile}
			/>
			<button
				className={
					'bg-blue-500 w-full lg:w-[50%] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full'
				}
				disabled={selectedFile === null}
				onClick={() => alert('uploaded')}
			>
				Upload
			</button>
		</div>
	);
}

export default UploadPage;
