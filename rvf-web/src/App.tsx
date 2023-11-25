import "./App.css";
import Upload from "./Upload"; // Removed .tsx extension
import Result from "./Result";
import Detail from "./Detail";
function App() {
	return (
		<>
			<h1>Real or Fake Face Detector</h1>
			<Upload />
			<img src="../asset/icon.png" className="icon" />
			<Result />
			<Detail />
		</>
	);
}

export default App;
