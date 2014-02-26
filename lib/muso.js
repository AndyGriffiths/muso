/*
 * muso
 * https://github.com/AndyGriff/muso
 *
 * Copyright (c) 2013 Andy Griffiths
 * Licensed under the MIT license.
 */

'use strict';
var _ = require('underscore');

exports.notes = function() {
  var allNotes=new Array("C","C#","D","D#","E","F","F#","G","G#","A","A#","B");
  return allNotes;
};
exports.enharmonic = function(note) {
	
  // pretty agricultural here, work out if it's a sharp or a flat
  var sharps=new Array("C#","D#","F#","G#","A#");
  var flats=new Array("Db","Eb","Gb","Ab","Bb");
  var returnNote = note;
  
  if (_.some(sharps,function(sharpNote){ return sharpNote == note; }))
  {
	//shurely some way to make this better
    // this is a sharp, so look it up in the flats array
    var index = _.indexOf(sharps, note);
	returnNote = flats[index];
  }
  else if (_.some(flats,function(flatNote){ return flatNote == note; }))
  {
    // this is a flat, so look it up in the flats array
    var index = _.indexOf(flats, note);
	returnNote = sharps[index];
  }
  return returnNote;
};
exports.keys = function() {
  //start with an ordered array of ints representing the chromatic scale
  var chromaticScale=new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);

  //multiply each element in the array by 7
  var transformed = _.map(chromaticScale, function(num){ return num * 7; });

  // apply a modulo 12 reduction
  var chromaticKeys = _.map(transformed, function(num){ return num % 12; });
  
  // get the chromatic notes
  var notes = this.notes();
  var allKeys = _.map(chromaticKeys, function(num){ return notes[num]; });

  return allKeys;
};
exports.scale = function(type,key) {
 
  //start with an ordered array of ints representing the major scale sequence (WWHWWWH)
  var scaleFormula;

  //defaults to major
  if (type == "min")
  {
	scaleFormula=new Array(0, 2, 3, 5, 7, 8, 10);
  }
  else
  {
	scaleFormula=new Array(0, 2, 4, 5, 7, 9, 11);
  } 


  // get the chromatic notes
  var notes = this.notes();

  // What note do we start on?
  var startIndex = _.indexOf(notes,key)

  // Is this a valid key?
  if (startIndex == -1)
     return undefined;

  // otherwise, just use this index to offset our scale sequence
  var allNotes = _.map(scaleFormula, function(num){ var idx = (num + startIndex) % 12; return notes[idx]; });

  // now we need to satisfy the one note per scale rule 
  var checkNotes = new Array();
  var rationalisedNotes = new Array();
  for (var i=0;i<allNotes.length;i++)
  {
 	var note = allNotes[i];
   	// get rid of any sharps / flats etc
	var noteValue = note.substr(0,1)

	// does this note already exist
	var exists = _.indexOf(checkNotes, noteValue);
	if (exists == -1)
	{
		// if not, then add it
		checkNotes.push(noteValue);
		rationalisedNotes.push(note);
	}
	else
	{
		// otherwise, get the enharmonic equiv and add that
		var newNote = this.enharmonic(note);
		var newNoteValue = newNote.substr(0,1)
		checkNotes.push(newNoteValue);
		rationalisedNotes.push(newNote);
	}
  }


  return rationalisedNotes;
};
exports.major = function(key) {

  var allNotes = this.scale("Maj",key);
  return allNotes;
};
exports.minor = function(key) {

  var allNotes = this.scale("min",key);
  return allNotes;
};
exports.chords = function(key) {

  // separate the key type and scale
  var keyName = key.substr(0,1);
  var keyType = key.substr(1,key.length - 1);

  var chordTypes;

  //defaults to major
  if (keyType == "min")
  {
	chordTypes=new Array("min","dim","maj","min","min","maj","maj");
  }
  else
  {
	chordTypes=new Array("maj","min","min","maj","maj","min","dim");
  }

  // get the notes in the scale
  var allNotes = this.scale(keyType,keyName);

  var allChords = new Array();
  for (var i=0;i<allNotes.length;i++)
  {
	var note = allNotes[i];
	var chordType = chordTypes[i];
	var chord = note + chordType;
	allChords.push(chord);
  }
  return allChords;
};
exports.sequence = function(key,length) {
	// create a sequence based on the chords in the given key, with a length
	
	// apply a pattern to this
	var pattern = new Array(0,1,2,3,0,1,2,3);
	
	// and a progression of the correct length for this pattern
	var progression = new Array(1,5,6,4);
	
	// get the chords for the key
	var chords = this.chords(key);
	
	// map this against the pattern to get progression chords
	var progressionChords = _.map(progression, function(num){ return chords[num]; });
	
	// use this with the pattern to get the final chords
	var finalChords = _.map(pattern, function(num){ return progressionChords[num]; });
	
	return finalChords;
};
// var seq = this.sequence(process.argv[2],8);
// console.log(seq);