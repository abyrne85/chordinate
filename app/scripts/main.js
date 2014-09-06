
'use strict';

var notesArray = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
var notes = new Notes();
var buttons = new Buttons();

var fretboard;
var currentChord =[];
var currentTriad=[];
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


	fretboard = new Fretboard(currentChord);
	fretboard.addTuningNotes();
	return this;
}




function Fretboard(currentChord){


	this.populateFrets = function(string,key){
		
		this.currentChord = currentChord;
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
}





function Buttons(){
var extra;

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


	this.showChord=function(key, scale){
		
		currentChord=[key, scale];
		notes.getChord(notes.getScale(key, scale));
		var chord = notes.getChord(notes.getScale(key, scale));
		this.colorFrets(chord, extra);	
	};

	//Show Chords on Fretboard
	this.colorFrets=function(chord, extra){

		if(extra==='seventh'){
			extra=['seventh',currentScale[6]];
		}
		if(extra==='ninth'){
			extra=['ninth',currentScale[1]];
		}

		console.log(extra);

		var frets = $('#fretboard li');
		
		for(var i=0;i<frets.length;i++){

			var currentFret = frets[i];
			currentFret.removeAttribute('class');

			var fret = frets[i].innerHTML;

			if(fret===chord[0]){
				currentFret.setAttribute('class','first');
			}
			if(fret===chord[1]){
				currentFret.setAttribute('class','third');
			}
			if(fret===chord[2]){
				currentFret.setAttribute('class','fifth');
			}
			if(extra!==undefined){
				if(extra[0]==='seventh' && fret===extra[1]){
					currentFret.setAttribute('class','seventh');
					console.log('seventh');

				}
				if(extra[0]==='ninth' && fret===extra[1]){
					currentFret.setAttribute('class','second');
					console.log('ninth');
				}
			}
		}

		$('.checkbox').show(200);
		currentTriad = [chord[0],chord[1],chord[2]];
	};

}
//EVENTS
$('#buttons button').click(function(){
	var key = $(this).attr('id').split(' ')[0];
	var scale = $(this).attr('id').split(' ')[1];
	buttons.showChord(key, scale);
});


$('#buttons input').change(function(){	
	if($(this).prop('checked')){
		switch($(this).attr('id')){
		case 'seventh':
		buttons.colorFrets(currentTriad, $(this).attr('id'));
		break;
		case 'ninth':
		buttons.colorFrets(currentTriad, $(this).attr('id'));
		break;
		}
	}
	if(!$(this).prop('checked')){
		buttons.colorFrets(currentTriad);
	}
});


$('#fretboard input').change(function(){

	var este = $(this);
	var string = este.attr('id').split('-')[0];
	var key = este.val().toUpperCase();


	if(notesArray.indexOf(este.val())<0){
		console.log('you stupid');
	}

	fretboard.populateFrets(string, key);

	if(currentChord.length===2){
		buttons.showChord(currentChord[0],currentChord[1]);
	}	

});





