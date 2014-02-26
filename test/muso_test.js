'use strict';

var muso = require('../lib/muso.js');
var _ = require('underscore');

exports.notes = {
  setUp: function(done) {
    // setup here
    done();
  },
  'correctly matches array of notes': function(test) {
    test.expect(1);
    // tests here
    var allNotes=new Array("C","C#","D","D#","E","F","F#","G","G#","A","A#","B");
    test.deepEqual(muso.notes(), allNotes,'notes are incorrect');
    test.done();
  }
};

exports.keys = {
  setUp: function(done) {
    // setup here
    done();
  },
  'correctly gives all keys': function(test) {
    test.expect(1);
    // tests here
    var allKeys=new Array("C", "G", "D", "A", "E", "B", "F#", "C#","G#", "D#", "A#", "F");
    test.deepEqual(muso.keys(), allKeys,'keys are incorrect');
    test.done();
  }
};
exports.enharmonic = {
  setUp: function(done) {
    // setup here
    done();
  },
  'correctly gives enharmonic equivalents': function(test) {
    test.expect(1);

    // tests here
    var expectedNotes=new Array("C#","D#","F#","G#","A#","Db","Eb","Gb","Ab","Bb","A","C");

    var notesToTest=new Array("Db","Eb","Gb","Ab","Bb","C#","D#","F#","G#","A#","A","C");

    var actualNotes = _.map(notesToTest, function(note){ return muso.enharmonic(note); });
    test.deepEqual(actualNotes, expectedNotes,'enharmonic notes are incorrect');
    test.done();
  }
};
exports.scale = {
  setUp: function(done) {
    // setup here
    done();
  },
  'correctly gives major scale notes': function(test) {
    test.expect(2);

    // tests here

    // G MAJOR
    var gExpectedNotes=new Array("G","A","B","C","D","E","F#");
	var gKey = "G";

    var gScale = muso.major(gKey);
    test.deepEqual(gScale, gExpectedNotes,'G Major scale is incorrect');
	
    // C MAJOR
    var cExpectedNotes=new Array("C","D","E","F","G","A","B");
	var cKey = "C";

    var cScale = muso.major(cKey);
    test.deepEqual(cScale, cExpectedNotes,'C Major scale is incorrect');


    test.done();
  },
  'correctly gives minor scale notes': function(test) {
    test.expect(2);

    // a minor 
    var aExpectedNotes=new Array("A","B","C","D","E","F","G");
	var aKey = "A";

    var aScale = muso.minor(aKey);
    test.deepEqual(aScale,aExpectedNotes,'A Minor scale is incorrect');

    // c minor 
    var cExpectedNotes=new Array("C","D","Eb","F","G","Ab","Bb");
	var cKey = "C";

    var cScale = muso.minor(cKey);
    test.deepEqual(cScale,cExpectedNotes,'C Minor scale is incorrect');

    test.done();
  },
};
exports.chords = {
  setUp: function(done) {
    // setup here
    done();
  },
  'correctly gives chords for key': function(test) {
    test.expect(2);

	// c Major 
    var cExpectedChords=new Array("Cmaj","Dmin","Emin","Fmaj","Gmaj","Amin","Bdim");
	var cKey = "Cmaj";

    var cChords = muso.chords(cKey);
    test.deepEqual(cChords,cExpectedChords,'C Major chords are incorrect');

	// e minor 
    var eExpectedChords=new Array("Emin","F#dim","Gmaj","Amin","Bmin","Cmaj","Dmaj");
	var eKey = "Emin";

    var eChords = muso.chords(eKey);
    test.deepEqual(eChords,eExpectedChords,'E minor chords are incorrect');
    test.done();
  }
};
exports.sequence = {
  setUp: function(done) {
    // setup here
    done();
  },
  'gives a sequence of defined length': function(test) {
    test.expect(1);

	var expectedLength = 8;
	var aKey = "Cmaj";
	var seq = muso.sequence(aKey,expectedLength);
	test.strictEqual(seq.length, expectedLength, "Sequence is incorrect");
    test.done();
  }
};


