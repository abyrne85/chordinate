
'use strict';

var notesArray = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
var fretboard = new Fretboard();
var notes = new Notes();
var buttons = new Buttons();
var currentChord =[];
var currentScale = [];


function Notes(){
	
	$(function(){
		var standard = ['e','B','G','D','A','E'];

		for(var i=0;i<6;i++){
			if(standard[i]==='e'){
				fretboard.populateFrets(standard[i],'E');
			}else{
			fretboard.populateFrets(standard[i],standard[i]);
			}
		}
	});

	this.getScale = function (key, voice){
		var major = [0,2,4,5,7,9,11];
		var minor = [0,2,3,5,7,8,10];
		var scale=[];
		var orderedNotes=[];
		this.key = notesArray.indexOf(key);

		for(var i=this.key; i<notesArray.length;i++){
			orderedNotes.push(notesArray[i]);
		}

		for (var i=0;i<this.key;i++){
			orderedNotes.push(notesArray[i]);
		}

		switch(voice){
			case 'major':
				for(var i=0;i<major.length;i++){
					scale.push(orderedNotes[major[i]]);
				}
			break;

			case 'minor':
			for(var i=0;i<minor.length;i++){
					scale.push(orderedNotes[minor[i]]);
				}
			break;
			
			default:
			return orderedNotes;
		}
		currentScale = scale;
		return scale;
	},


	this.getChord = function (key){
		var triad=[1,3,5];
		var chord=[];
		for(var i=0;i<triad.length;i++){
			chord.push(key[triad[i]-1]);
		}

		return chord;
	};

  	fretboard.addTuningNotes();
	return this;
}




function Fretboard(){

	this.populateFrets = function(string,key){
		
		this.orderedNotes=[];
		this.key = key;
		this.frets = notes.getScale(key);
		this.string = string;
		var currentString;

		switch(string){
			case 'e':
			currentString = $('.e-string');
			break;
			case 'B':
			currentString = $('.B-string');
			break;
			case 'G':
			currentString = $('.G-string');
			break;
			case 'D':
			currentString = $('.D-string');
			break;
			case 'A':
			currentString = $('.A-string');
			break;
			case 'E':
			currentString = $('.E-string');
			break;
			default:
		}

		currentString.empty();

		for(var i=0;i<this.frets.length;i++){
			currentString.append('<li>'+this.frets[i]+'</li>');
		}
		//addTuningNotes();
	};

	//Tuning Strings
	this.addTuningNotes = function(){
		for(var i=0;i<12;i++){
			 $('.fretboard ul select').append('<option value="'+ notesArray[i] + '">' + notesArray[i] + '</option>');
		}
	};	

	this.showChord=function(key, scale){
		
		currentChord=[key, scale];
		notes.getChord(notes.getScale(key, scale));
		this.colorFrets();	
	};

	//Show Chords on Fretboard
	this.colorFrets=function(){

		var frets = $('#fretboard li');
		
		for(var i=0;i<frets.length;i++){

			var currentFret = frets[i];
			currentFret.removeAttribute('class');

			var fret = frets[i].innerHTML;
			//main triad
			if(fret===currentScale[0]){
				currentFret.setAttribute('class','first');
			}
			if(fret===currentScale[1]){
				currentFret.setAttribute('class','second');
			}
			if(fret===currentScale[2]){
				currentFret.setAttribute('class','third');
			}
			if(fret===currentScale[3]){
				currentFret.setAttribute('class','fourth');
			}
			if(fret===currentScale[4]){
				currentFret.setAttribute('class','fifth');
			}
			if(fret===currentScale[5]){
				currentFret.setAttribute('class','sixth');
			}
			if(fret===currentScale[6]){
				currentFret.setAttribute('class','seventh');
			}
		}

		$('.checkbox').show(200);
	};

	this.showExtensions = function(extension){
		$('.'+extension).css({'background-color':'red'});
	}
}


function Buttons(){

	this.showButtons = function(){
	//major chords
		for(var i=0;i<notesArray.length;i++){
			$('#major').append('<button class="btn major btn-default" id="'+notesArray[i]+' major">'+notesArray[i]+'</button>');
		} 
		for(var i=0;i<notesArray.length;i++){
			$('#minor').append('<button class="btn minor btn-default" id="'+notesArray[i]+' minor">'+notesArray[i]+'m</button>');
		} 
	};
	this.showButtons();
}


//EVENTS
$('#buttons button').click(function(){
	var key = $(this).attr('id').split(' ')[0];
	var scale = $(this).attr('id').split(' ')[1];
	fretboard.showChord(key, scale);
});


$('#fretboard input').change(function(){

	var este = $(this);
	var string = este.attr('id').split('-')[0];
	var key = este.val().toUpperCase();

	fretboard.populateFrets(string, key);

	if(currentChord.length===2){
		fretboard.showChord(currentChord[0],currentChord[1]);
	}	
});


$('.checkbox input').change(function(){

	if($(this).prop('checked')===true){
		console.log('checked');
		$('.'+$(this).attr('id')).css({'background-color':'white'});
	}

	if($(this).prop('checked')===false){
		console.log('unchecked');
		$('.'+$(this).attr('id')).css({'background-color':'inherit'});
	}
});





