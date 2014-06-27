var assert = chai.assert;


describe('Test my bowling scoring engine', function(){
	//var frames = [{first: 9, second: 2}];
	
	it('test that you have initialized the scoring array', function(){
		assert(Array.isArray(frames), 'This is a valid array');
	});
  
	var frame = frames.pop();
	
	it('test that you have initialized frame object', function(){
		assert.isTrue(frame.first != null && frame.second != null, 'Properly initialized frame');
	});
	
	it('test that you have not scored more then 10 pins', function(){
		assert.isTrue(frame.first + frame.second <= 10, 'Bowled more then 10 in the frame');
	});
	
	frames = [{first: 9, second: 2}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
	
	it('test that you have not bowled more then 10 frames', function(){
		assert.isTrue(frames.length <= 10, 'Bowled more then 10 frames(' + frames.length + ').');
	});
 
});
