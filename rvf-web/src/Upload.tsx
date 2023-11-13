import { UploadDropzone } from "@bytescale/upload-widget-react";
import { useState } from "react";

const options = {
	apiKey: "free", // Get API key: https://www.bytescale.com/get-started
	maxFileCount: 1,
	showFinishButton: true, // Note: You must use 'onUpdate' if you set 'showFinishButton: false' (default).
	styles: {
		colors: {
			primary: "#000000", // Changed to dark gray color
		},
	},
};

interface File {
	fileUrl: string;
}

const Upload = () => {
	const [key, setKey] = useState(0);

	const handleComplete = async (files: File[]) => {
		const fileUrls = files.map((x: File) => x.fileUrl);
		try {
			const response = await fetch("https://api.example.com/upload", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ fileUrls }),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error("Error uploading files: ", error);
		}

		setKey((prevKey) => prevKey + 1); // Change state to force re-render
	};

	return (
		<UploadDropzone
			key={key} // Add key prop here
			options={options}
			onUpdate={({ uploadedFiles }) =>
				console.log(uploadedFiles.map((x) => x.fileUrl).join("\n"))
			}
			onComplete={handleComplete}
			width="600px"
			height="375px"
		/>
	);
};

export default Upload;
