interface ResultProps {
	result: string;
	/**
	JSON STRING: 
	{
		result: prediction
		gradCamPath: path to grad cam image file
	}
	*/
}

const Result = ({ result }: ResultProps) => {
	const finalObject = result ? JSON.parse(result) : {};
	return (
		<>
			<div id="outlined-box">
				Model Result
				{Object.keys(finalObject).length !== 0 && <p>Image Processing Complete</p>}
				<p>{finalObject.result}</p>
				<p>GradCam</p>
				<img src={finalObject.gradCamPath} height="250" width="250" />
			</div>
		</>
	);
};

export default Result;
