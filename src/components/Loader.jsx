import React, { useEffect } from 'react';
import { ThreeDot } from 'react-loading-indicators';
import Upload from '../components/Upload';
import UploadPage from '../pages/UploadPage';

function Loader({
	response,
	setIsLoading,
	selectedFile,
	handleFileChange,
	uploadNewVersion,
	handleVerifyFile,
}) {
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => (document.body.style.overflow = 'unset');
	}, []);

	return (
		<div className="w-full h-full  bg-black/50 flex justify-center items-center z-10 fixed top-0 left-0">
			<div className="w-[400px] h-[300px] bg-white rounded-xl p-10 flex justify-center items-center relative">
				<button
					onClick={() => setIsLoading(false)}
					className="absolute top-3 right-3 text-xl text-red-500 hover:text-red-600 cursor-pointer"
				>
					<i className="fa-solid fa-x"></i>
				</button>

				<Response
					response={response}
					selectedFile={selectedFile}
					handleFileChange={handleFileChange}
					uploadNewVersion={uploadNewVersion}
					handleVerifyFile={handleVerifyFile}
				/>
			</div>
		</div>
	);
}

function Response({
	response,
	selectedFile,
	handleFileChange,
	uploadNewVersion,
	handleVerifyFile,
}) {
	if (response === 'uploading') {
		return (
			<div className="h-full flex flex-col justify-center items-center text-center gap-5">
				<ThreeDot
					variant="pulsate"
					color="#2196F3"
					size="medium"
					text=""
					textColor=""
				/>
				<div className="text-2xl font-bold text-black text-center">
					Uploading
				</div>
			</div>
		);
	}
	if (response === 'upload') {
		return (
			<div className="h-full w-full flex flex-col justify-center items-center text-center gap-5">
				<UploadPage />
			</div>
		);
	}
	if (response === 'upload/verify') {
		return (
			<div className="h-full w-full flex flex-col justify-between items-center text-center gap-5">
				<Upload
					selectedFile={selectedFile}
					handleFileChange={handleFileChange}
				/>
				<div className=" flex ">
					<button
						onClick={uploadNewVersion}
						disabled={selectedFile === null}
						className="mt-3 cursor-pointer bg-green-500 text-white px-1 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm hover:bg-green-600"
					>
						Upload new version
					</button>
					<button
						onClick={handleVerifyFile}
						disabled={selectedFile === null}
						className="mt-3 cursor-pointer bg-blue-500 text-white px-1 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm hover:bg-blue-600"
					>
						Check authenticity
					</button>
				</div>
			</div>
		);
	}
	if (response === 'loading') {
		return (
			<div className="h-full flex flex-col justify-center items-center text-center gap-5">
				<ThreeDot
					variant="pulsate"
					color="#2196F3"
					size="medium"
					text=""
					textColor=""
				/>
				<div className="text-2xl font-bold text-black text-center">
					Opening the latest version
				</div>
			</div>
		);
	}
	if (response === 'loading2') {
		return (
			<div className="h-full flex flex-col justify-center items-center text-center gap-5">
				<ThreeDot
					variant="pulsate"
					color="#2196F3"
					size="medium"
					text=""
					textColor=""
				/>
				<div className="text-2xl font-bold text-black text-center">
					Loading
				</div>
			</div>
		);
	}
	if (response === 'logging') {
		return (
			<div className="h-full flex flex-col justify-center items-center text-center gap-5">
				<ThreeDot
					variant="pulsate"
					color="#2196F3"
					size="medium"
					text=""
					textColor=""
				/>
				<div className="text-2xl font-bold text-black text-center">
					Logging
				</div>
			</div>
		);
	}
	if (response === '') {
		return (
			<div className="h-full flex flex-col justify-center items-center text-center gap-5">
				<ThreeDot
					variant="pulsate"
					color="#2196F3"
					size="medium"
					text=""
					textColor=""
				/>
				<div className="text-2xl font-bold text-black text-center">
					Authentication in progress
				</div>
			</div>
		);
	}
	if (response) {
		return (
			<div className="h-full flex flex-col justify-center items-center text-center gap-5">
				<i className="fa-solid fa-circle-check text-green-500 text-5xl"></i>
				<div className="text-2xl font-bold text-green-500 text-center">
					Authentic
				</div>
			</div>
		);
	}
	return (
		<div className="h-full flex flex-col justify-center items-center text-center gap-5">
			<i className="fa-solid fa-circle-xmark text-red-500 text-5xl"></i>
			<div className="text-2xl font-bold text-red-500 text-center">
				Not authentic
			</div>
		</div>
	);
}

export default Loader;
