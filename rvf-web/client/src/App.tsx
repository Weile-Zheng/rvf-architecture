import "./App.css";
import { useState } from "react";
import Upload from "./Upload"; // Removed .tsx extension
import Result from "./Result";
import Detail from "./Detail";
function App() {
	// uploading image and call to backend is done by upload.
	// the resultng response will be updated and passed to result
	// and detail component for further rendering
	const [responseData, setResponseData] = useState("");

	return (
		<>
			<h1>Real or Fake Face Detector</h1>
			<Upload setResponseData={setResponseData} />
			<img src="../asset/icon.png" className="icon" />
			<Result result={responseData}/>
			<Detail />
		</>
	);
}

export default App;
