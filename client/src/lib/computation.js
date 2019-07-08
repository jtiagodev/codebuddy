let currentState = {
	facing: up,
	position: (0,0)
}

let solutionWithFeedback = {
		
}

let solutionWithOutput = [];


export const solutionComputation = (solutionArray, boardConfiguration) => {
	calculateFacing(boardConfiguration);
	
	_.forEach(solutionArray, code => {
		codeToAction(code)
	}	
}


const codeToAction = (code) => {
	switch (code) {
		case 100: moveForward()
		case
	}
}



const calculateFacing = (boardConfiguration) => {
	const flatBoardConfiguration = _.flattenDepth(boardConfiguration, 1);
	
	_.zipWith(flatBoardConfiguration, element => {
		
	});
	_.findIndex(flatBoardConfiguration, entry => { return entry === "R" });

}