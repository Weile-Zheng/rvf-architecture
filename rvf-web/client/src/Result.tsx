interface ResultProps {
	result: string;
}

const Result = ({ result }: ResultProps) => {
	return (
		<>
			<div id="outlined-box">Result
			<p>{result}</p>
			</div>
		</>
	);
};

export default Result;
