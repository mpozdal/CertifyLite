import React from 'react';

function UploadPage() {
	return (
		<div className="flex justify-center items-center flex-col">
			<form
				
				onSubmit={''}
				className="text-center border-dashed border-2 border-sky-500 "
			>
				<input
					type="file"
					//onChange={(e) => setFile(e.target.files[0])}
				/>
			</form>
		</div>
	);
}

export default UploadPage;
