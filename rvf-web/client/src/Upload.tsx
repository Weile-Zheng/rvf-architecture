import { UploadDropzone } from "@bytescale/upload-widget-react";
import { useState } from "react";

/***********************************************************
 * Left Component: File Drop Zone
 * Style: app.css
 *
 * Get API key: https://www.bytescale.com/get-started
 ***********************************************************/
const options = {
	apiKey: "free",
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

interface UploadProps {
	setResponseData: (value: string) => void;
}

const Upload = ({ setResponseData }: UploadProps) => {
	const [statekey, setKey] = useState(0);

	/**
	 * Callback function upon user complete
	 * @param files file path address at x.firlURL
	 * Expecting return body to contain gradcam and prediction result.
	 */
	const handleComplete = async (files: File[]) => {
		const fileUrls = files.map((x: File) => x.fileUrl);
		console.log(fileUrls);
		try {
			const response = await fetch("http://localhost:4000/process", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ fileUrls }),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			// update it in parent context for other componet to use.
			const data = JSON.stringify(await response.json());
			setResponseData(data);
			console.log(data);
		} catch (error) {
			console.error("Error uploading files: ", error);
		}

		setKey(statekey + 1); // Change state to force re-render
	};

	return (
		<UploadDropzone
			key={statekey} // Add key prop here
			options={options}
			//onUpdate={({ uploadedFiles }) => console.log(uploadedFiles.map((x) => x.fileUrl).join("\n"))}
			onComplete={handleComplete}
			width="600px"
			height="375px"
		/>
	);
};

export default Upload;
