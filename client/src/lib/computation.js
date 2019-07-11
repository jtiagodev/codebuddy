import { speak } from "./speechSyntesis";

export const solutionComputation = (solutionArray, arrayTopCodes, boardConfiguration) => {
	// contains direction, x, y
	let currentState = _.findIndex(arrayTopCodes, code => { return code.code === 91 });
	let failed = false;
	let finished = false;
	// builds the finalResultToExecute, which includes sequential feedback
	_.forEach(solutionArray, solutionStepToRun => {
		if (!finished) {
			finalResultToExecute.push(solutionStepToRun.code);
			failed = validateSolutionStep(solutionStepToRun, currentState, arrayTopCodes);
			if (failed) {
				finalResultToExecute.push(211); //failure
				finished = true;
			} else {
				finalResultToExecute.push(205); //success
			}
		}
	});
	return finalResultToExecute;
}

const validateSolutionStep = (solutionStepToRun, currentState, arrayTopCodes) => {

	return // true (FAILED) or false (SUCCESS)
}


const angleToAction = (code) => {
	switch (direction) {
		case 'north': moveNorth();
		break;
		case 'south1': moveSouth();
		break;
		case 'south2': moveSouth();
		break;
		case 'west': moveWest();
		break;
		case 'east': moveEast();
		default: moveNorth();
		break; 
	}
}

const codeToAction = (code) => {
	switch (code) {
		case 100: moved();
		// break;
		// case 115: swim();
		// break;
		// case 117: open();
		// break;
		// case 155: repeat();
		// break;
		// case 157: stop();
		// break;
		// case 171: ifAction();
		// break;
		// case 173: thenAction();
		// break;
		// case 179: elseAction();
		// break;
		case 121: turnLeft(); break;
		case 143: turnRight(); break;
		case 151: turnBack(); break;
		default: break;
	}
}

}


speak("Computation complete!");
