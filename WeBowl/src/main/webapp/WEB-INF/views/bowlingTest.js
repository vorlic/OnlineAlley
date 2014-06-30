var assert = chai.assert;

describe('Test my bowling scoring engine', function(){
	it('Test that you have initialized the scoring array (ie frames).', function(){
		var bowling = new Bowling();
		assert(Array.isArray(bowling.getFrames()), 'Frame array initialized');
	});
  
	it('Test that you report current bowling frame.', function(){
		var bowling = new Bowling();
		assert.isTrue(bowling.getFramesPlayed() == 0, 'Game not started.');
		
		bowling.roll(5);
		assert.isTrue(bowling.getFramesPlayed() == 1, 'Bowling first frame.');
		
		bowling.roll(3);
		assert.isTrue(bowling.getFramesPlayed() == 1, 'Still bowling first frame.');
		
	});
	
	it('Test frame equals method', function(){
		var bowling = new Bowling([5, 3, 10, 5, 5]);
		
		var firstFrame = new Frame(1, 5, 3, null, 8, 8);
		var areTheyEqual = bowling.getFrame(1).equals(firstFrame);
		
		assert.isTrue(areTheyEqual == 1, 'The first frame should be the same');
		
		var secondFrame = new Frame(2, 10, null, null, 20, 28);
		assert.isTrue(bowling.getFrame(2).equals(secondFrame) == 1, 'The second frame should be the same');
		
		var thirdFrame = new Frame(3, 5, 5, null, 10, 38);
		assert.isTrue(bowling.getFrame(3).equals(thirdFrame) == 1, 'The third frame should be the same');
		
		var thirdFrameWrong = new Frame(3, 5, 5, null, 10, 28);
		assert.isTrue(bowling.getFrame(3).equals(thirdFrameWrong) == 0, 'The third frame should be different');
	});
	
	it('20 gutters', function(){
		var bowling = new Bowling([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
		assert.isTrue(bowling.getFrame(10).getRunningScore() == 0, 'Game with all gutter roles is 0');
	});
	
	it('20 1 pin', function(){
		var bowling = new Bowling([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
		assert.isTrue(bowling.getFrame(10).getRunningScore() == 20, 'Game with 20 1 pin roles is 20');
	});
	
	it('18 gutters, 3 strikes', function(){
		var bowling = new Bowling([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10]);
		assert.isTrue(bowling.getFrame(10).getRunningScore() == 30, 'Game with all gutter roles but in the last frame with 3 strikes is 30');
	});
	
	it('18 gutters, 1 strike, 5 and 2', function(){
		var bowling = new Bowling([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 5, 2]);
		assert.isTrue(bowling.getFrame(10).getRunningScore() == 17, 'Game with 18 gutters, 1 strike, 5 and 2 is 17');
	});
	
	it('18 gutters, 1 spare and 2', function(){
		var bowling = new Bowling([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 4, 2]);
		assert.isTrue(bowling.getFrame(10).getRunningScore() == 12, 'Game with 18 gutters, 1 spare and 2 is ');
	});
	
	it('Test that 2nd frame is properly scored', function(){
		var bowling = new Bowling([0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10]);
		var secondFrame = new Frame(2, 5, 5, null, 10, 10);
		assert.isTrue(bowling.getFrame(2).equals(secondFrame) == 1, 'The second frame is properly scored');
	});
	
	it('Perfect score', function(){
		var bowling = new Bowling([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
		assert.isTrue(bowling.getFrame(10).getRunningScore() == 300, 'Game with perfect score should 300');
	});
	
});
