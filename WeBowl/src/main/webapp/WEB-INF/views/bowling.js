function Frame() {
	
	var firstRoll = null;
	var secondRoll = null;
	var extraRoll = null;
	
	this.getFirstRoll = function() {
		return firstRoll;
	};
	
	this.setFirstRoll = function(pins) {
		var pinsKnocked = parseInt(pins, 10);
		if (isNaN(pinsKnocked)) {
			alert("You have to provide the number of pins that are knocked down.");
		} else if (pinsKnocked < 0 || pinsKnocked > 10) {
			alert("Valid number of pins is between 0 and 10");
		} else {
			firstRoll = pinsKnocked;
		}
	};
	
	this.getSecondRoll = function() {
		return secondRoll;
	};
	
	this.setSecondRoll = function(pins) {
		var pinsKnocked = parseInt(pins, 10);
		if (isNaN(pinsKnocked)) {
			alert("You have to provide the number of pins that are knocked down.");
		} else if (pinsKnocked < 0) {
			alert("Pins can not be negative number");
		} else if (!(this.isTenthFrame() && this.isStrike()) && firstRoll + pinsKnocked > 10) {
			alert("You can not knock more than 10 pins in regular frame");
		} else {
			secondRoll = pinsKnocked;
		}
	};
	
	this.getExtraRoll = function() {
		return extraRoll;
	};
	
	this.setExtraRoll = function(pins) {
		var pinsKnocked = parseInt(pins, 10);
		if (isNaN(pinsKnocked)) {
			alert("You have to provide the number of pins that are knocked down.");
		} else if (pinsKnocked < 0 || pinsKnocked > 10) {
			alert("Valid number of pins is between 0 and 10");
		} else {
			extraRoll = pinsKnocked;
		}
	};
	
	var score = 0;
	this.getScore = function() {
		return score;
	};
	
	this.setScore = function(value) {
		var totalFrameScore = parseInt(value, 10);
		
		if (isNaN(totalFrameScore)) {
			alert("You have to provide the valid score for this frame.");
		} else if (this.isStrike()) {
			if(totalFrameScore > 30) {
				alert("With bowled strike maximum frame score is 30.");
			} else {
				score = totalFrameScore;
			}
		} else if (this.isSpare()) {
			if (totalFrameScore > 20) {
				alert("With bowled spare maximum frame score is 20.");
			} else {
				score = totalFrameScore;
			}
		} else {
			if(totalFrameScore > 9) {
				alert("Without bowled strike or spare maximum frame score is 9.");
			} else {
				score = totalFrameScore;
			}
		}
	};
	
	var runningScore = 0;
	this.getRunningScore = function() {
		return runningScore;
	};
	
	this.setRunningScore = function(value) {
		var totalRunningScore = parseInt(value, 10);
		
		if (isNaN(totalRunningScore)) {
			alert("You have to provide the valid score for this game.");
		} else {
			runningScore = totalRunningScore;
		}
	};
	
	var complete = 0;
	
	this.getComplete = function() {
		return complete;
	};
	
	this.setComplete = function() {
		complete = 1;
	};
	
	var frameNumber = 0;
	
	this.getFrameNumber = function() {
		return frameNumber;
	};
	
	this.setFrameNumber = function(i) {
		var fn = parseInt(i, 10);
		if (isNaN(fn)) {
			alert("You have to pass the valid frame number");
		} else if (fn < 1 || fn > 10) {
			alert("Valid frame number is between 1 and 10");
		} else {
				frameNumber = fn;
		}
	};
	
	this.isTenthFrame = function() {
		if (frameNumber == 10) {
			return 1;
		} 
		
		return 0;
	};
	
	this.isStrike = function() {
		if (firstRoll && firstRoll == 10) {
			return 1;
		}
		
		return 0;
	};
	
	this.isSpare = function() {
		if (!this.isStrike() && secondRoll && firstRoll + secondRoll === 10) {
			return 1;
		}
		
		return 0;
	};
	
	this.allowExtraRoll = function() {
		if (this.isTenthFrame()) {
			if (this.isStrike() || this.isSpare()) {
				if(!extraRoll) {
					return 1;
				} else {
					return 0;
				}
			}
		}
		
		return 0;
	};
	
	this.equals = function(that) {
		if (!(that instanceof Frame)) {
			return 0;
		} 
		
		if (frameNumber != that.getFrameNumber()) {
			return 0;
		}
			
		if (!firstRoll) {
			if (that.getFirstRoll()) {
				return 0;
			} else {
				return 1;
			}
		}
		if (firstRoll != that.getFirstRoll()) {
			return 0;
		}
		
		if (!secondRoll) {
			if (that.getSecondRoll()) {
				return 0;
			} else {
				return 1;
			}
		}
		if (secondRoll != that.getSecondRoll()) {
			return 0;
		}
		
		if (score != that.getScore()) {
			return 0;
		}
		
		if (runningScore != that.getRunningScore()) {
			return 0;
		}
		
		if (!extraRoll) {
			if (that.getExtraRoll()) {
				return 0;
			} else {
				return 1;
			}
		}
		
		return 1;
	} ;
	
	this.asHtml = function() {
		var gameId = "game";
		if(arguments.length == 1) {
			gameId += arguments[0]; 
		}
		
		var game = document.getElementById(gameId);
		if (!game) {
			game = createElement("div");
			game.id = gameId;
			game.className = "game";
			
			document.body.appendChild(game);
		}
		var frameId = "frame" + frameNumber;
		if(arguments.length == 1) {
			frameId += "-";
			frameId += arguments[0];
		}		
		var frame = document.getElementById(frameId);
		if (!frame) {
			frame = createElement("div");
			frame.id = frameId;
			frame.className = "frame";
			
			game.appendChild(frame);
		}
		
		var html = '';
		if (this.isTenthFrame()) {
			html += '<div class="frameNumberTenth">';
			html += frameNumber;
			html += '</div>';	
			
			html += '<div class="firstRoll">';
			if (firstRoll == 10) {
				html += "X";
			} else {
				html += firstRoll;
			}
			html += '</div>';
			
			html += '<div class="secondRoll">';
			if (secondRoll == null) {
				html += "&nbsp;";
				html += '</div>';
				
				html += '<div class="thirdRoll">&nbsp;</div>';
			} else {
				if (secondRoll == 10) {
					html += "X";
				} else {
					html += secondRoll;
				}
				html += '</div>';
				
				html += '<div class="thirdRoll">';
				if (this.isStrike() || this.isSpare()) {
					if (extraRoll == null) {
						html += "&nbsp;";
					} else if (extraRoll == 10) {
						html += "X";
					} else {
						html += extraRoll;
					}
				} else {
					html += "-";
				}
				html += '</div>';
			}
			html += '<div class="runningScoreTenth">';
			html += runningScore;
			html += '</div>';
		} else {
			html += '<div class="frameNumber">';
			html += frameNumber;
			html += '</div>';	
			
			if (this.isStrike()) {
				html += '<div class="firstRoll">';
				html += "&nbsp;";
				html += '</div>';
					
				html += '<div class="secondRoll">';
				html += "X";
				html += '</div>';
			} else if (this.isSpare()){
				html += '<div class="firstRoll">';
				html += firstRoll;
				html += '</div>';
					
				html += '<div class="secondRoll">';
				html += "/";
				html += '</div>';
			} else {
				html += '<div class="firstRoll">';
				html += firstRoll;
				html += '</div>';
					
				html += '<div class="secondRoll">';
				if(secondRoll == null) {
					html += "&nbsp;";
				} else {
					html += secondRoll;
				}
				html += '</div>';
			}
		
			html += '<div class="runningScore">';
			html += runningScore;
			html += '</div>';
		}
		
		frame.innerHTML = html;
	};
	
	if (arguments.length == 6) {
		frameNumber = arguments[0];
		firstRoll = arguments[1];
		secondRoll = arguments[2];
		extraRoll = arguments[3];
		score = arguments[4];
		runningScore = arguments[5];
		
		if(this.isTenthFrame() && this.allowExtraRoll()) {
			if (extraRoll) {
				complete = 1;
			}
		}
		else if (this.isStrike()) {
			complete = 1;
		} else if (secondRoll){
			complete = 1;
		}
	}
}

function Bowling() {
	var frames = [];
	
	this.getFrames = function() {
		return frames;
	};

	this.setFrames = function(arr) {
		
		frames = arr;
	};
	
	this.getFramesPlayed = function() {
		return frames.length;
	};

	this.getFrame = function(i) {
		if (isNaN(parseInt(i, 10))) {
			return null;
		}
		
		if (i < 1) {
			return null;
		}
		
		if (i > frames.length) {
			return null;
		}
		
		return frames[i - 1];
	};
	
	this.isGameFinished = function() {
		if (frames.length < 10) {
			return 0;
		}
		
		var frame = frames[frames.length - 1];
		
		return frame.getComplete();
	};
	
	this.getPlayableFrame = function() {
		if (this.isGameFinished()) {
			return null;
		}
		
		if (frames.length > 0) {
			var frame = frames[frames.length - 1];
			if (!frame.getComplete()) {
				return frame;
			}
		}
		
		var frame = new Frame();
		frame.setFrameNumber(frames.length + 1);
		if (frames.length) {
			frame.setRunningScore(frames[frames.length - 1].getRunningScore());
		}
		frames.push(frame);
			
		return frame;
	};
	
	this.updateRunningScore = function(frame) {
		if (frame.getFrameNumber() == 1) {
			frame.setRunningScore(frame.getScore());
		} else {
			var prevFrame = this.getFrame(frame.getFrameNumber() - 1);
			frame.setRunningScore(prevFrame.getRunningScore() + frame.getScore());
		}
	};
	
	this.updateTwoScoresBefore = function(frame, prevFrame) {
		if (frame.getFrameNumber() == 2 && prevFrame.getFrameNumber() == 1) {
			return;
		}
		
		var prevPrevFrame = this.getFrame(prevFrame.getFrameNumber() - 1);
		if (prevPrevFrame.isStrike() && prevFrame.isStrike() && frame.getSecondRoll() == null) {
			prevPrevFrame.setScore(prevPrevFrame.getScore() + frame.getFirstRoll());
			prevPrevFrame.setRunningScore(prevPrevFrame.getRunningScore() + frame.getFirstRoll());
			prevFrame.setRunningScore(prevPrevFrame.getRunningScore() + prevFrame.getScore());
			
			frames[prevPrevFrame.getFrameNumber() - 1] = prevPrevFrame;
		}
	};
	
	this.updateOneScoreBefore = function(frame) {
		if (frame.getFrameNumber() == 1) {
			return;
		}
		
		var prevFrame = this.getFrame(frame.getFrameNumber() - 1);
		if (prevFrame.isStrike()) {
			if (frame.getSecondRoll() != null) {
				prevFrame.setScore(prevFrame.getScore() + frame.getSecondRoll());
				prevFrame.setRunningScore(prevFrame.getRunningScore() + frame.getSecondRoll());
			} else if(frame.getFirstRoll() != null) {
				this.updateTwoScoresBefore(frame, prevFrame);
				prevFrame.setScore(prevFrame.getScore() + frame.getFirstRoll());
				prevFrame.setRunningScore(prevFrame.getRunningScore() + frame.getFirstRoll());
			}
		} else if (prevFrame.isSpare()) {
			if (frame.getSecondRoll() == null) {
				prevFrame.setScore(prevFrame.getScore() + frame.getFirstRoll());
				prevFrame.setRunningScore(prevFrame.getRunningScore() + frame.getFirstRoll());
			}
		}
		frames[prevFrame.getFrameNumber() - 1] = prevFrame;
	};
	
	this.roll = function() {
		
		if (this.isGameFinished()) {
			return 0;
		}
		
		var frame = this.getPlayableFrame();
		if (!frame) {
			return 0;
		}
		
		if (frame.getFirstRoll() == null) {
			var pinsKnocked = Math.floor(Math.random() * 11);
			if (arguments.length == 1) {
				if (!isNaN(parseInt(arguments[0], 10))) {
					pinsKnocked = parseInt(arguments[0], 10);
				}
			}
			frame.setFirstRoll(pinsKnocked);
			if (frame.isStrike() && !frame.isTenthFrame()) {
				frame.setComplete(1);
			}
			frame.setScore(pinsKnocked);
			this.updateOneScoreBefore(frame);
			this.updateRunningScore(frame);
		} else if (frame.getSecondRoll() == null) {
			var scale = 11 - frame.getScore();
			if (frame.allowExtraRoll()) {
				scale = 11;
			}
			var pinsKnocked = Math.floor(Math.random() * scale);
			if (arguments.length == 1) {
				if (!isNaN(parseInt(arguments[0], 10))) {
					pinsKnocked = parseInt(arguments[0], 10);
				}
			}
			frame.setSecondRoll(pinsKnocked);
			if (!frame.allowExtraRoll()) {
				frame.setComplete(1);
			}
			frame.setScore(frame.getScore() + pinsKnocked);
			this.updateOneScoreBefore(frame);
			this.updateRunningScore(frame);
		} else if (frame.allowExtraRoll()) {
			var pinsKnocked = Math.floor(Math.random() * 11);
			if (arguments.length == 1) {
				if (!isNaN(parseInt(arguments[0], 10))) {
					pinsKnocked = parseInt(arguments[0], 10);
				}
			}
			frame.setExtraRoll(pinsKnocked);
			frame.setScore(frame.getScore() + pinsKnocked);
			this.updateRunningScore(frame);
			frame.setComplete(1);
		}
		frames[frame.getFrameNumber() - 1] = frame;
		
		return 1;
	};
	
	if (arguments.length == 1 && Array.isArray(arguments[0])) {
		for (var i = 0; i < arguments[0].length; i++) {
			this.roll(arguments[0][i]);
		}
	} else if (arguments.length == 2 || arguments.length == 3) {
		if (arguments[0] <= 1) {
			return null;
		}
		if (arguments[0] > 10) {
			return null;
		}
		
		var score = arguments[1];
		if (arguments.length == 2) {
			arguments.push(0); 
		}	
		score += arguments[2];
		if (score > 10) {
			return null;
		}
		
		var framesPlayed = this.getFramesPlayed();
		if (framesPlayed < arguments[0]) {
			var i = arguments[0];
			while (i > framesPlayed + 1 && this.getFrame(framesPlayed).getCompleted()) {
				this.roll(0);
				framesPlayed = this.getFramesPlayed();
			}
			
			frames.roll(arguments[1]);
			if (!this.getFrame(arguments[0]).isStrike()) {
				this.roll(arguments[2]);
			}
		} else {
			var newBowling = new Bowling();
			if (arguments[0] > 1) {
				newBowling.setFrames(frames.slice(0, arguments[0]));
			}
			
			newBowling.roll(arguments[1]);
			if (!this.getFrame(arguments[0]).getComplete()) {
				newBowling.roll(arguments[2]);
			}
			
			for (var i =  newBowling.getFramesPlayed() + 1; i < this.getFramesPlayed(); i++) {
				var frameToCopy = this.getFrame(i);
				newBowling.roll(frameToCopy.getFirstRoll());
				if (!newBowling.getCompleted()) {
					newBowling.roll(frameToCopy.getSecondRoll());
				}
				if (!newBowling.getCompleted()) {
					newBowling.roll(frameToCopy.getExtraRoll());
				}
			}
		}
	}
}

//'Overload' function for different browsers
function createElement(){}
(function() {
	try {
		var el = document.createElement('<div name="testbrowser">');
		if( 'DIV'!= el.tagName ||'foo'!= el.name ){
			throw 'Create Element Error';
		}
		createElement = function(tag) {
  			// IE
  			return document.createElement('<' + tag + '></' + tag + '>');
		};
	} catch(e) {
		createElement = function(tag) {
			// EOMB
			var el = document.createElement(tag);
			
			return el;
		};
	}
}
)();
/*
var frames = [{first: 9, second: 2}];
var bowling = new Bowling();

var frame1 = new Frame();
alert(frame1.getFirstRoll(frame1.setFirstRoll(10)));

var frame2 = new Frame();
alert(frame1.equals(frame2));

bowling.roll(10);
bowling.roll(5);
bowling.roll(5);
bowling.roll(5);
bowling.roll(0);
bowling.roll(0);
bowling.roll(0);
bowling.roll(0);
bowling.roll(0);
bowling.roll(0);
bowling.roll(0);
bowling.roll(0);
bowling.roll(0);
alert(bowling.getFramesPlayed());

var bowlingWith2ndContructor = new Bowling([10,10,10]);
alert(bowlingWith2ndContructor.getFramesPlayed());


*/