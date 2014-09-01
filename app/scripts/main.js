var notes = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];
var currentChord = [];
var currentScale = [];
var currentTriad = [];

function getScale(key, voice){
	var major = [0,2,4,5,7,9,11];
	var minor = [0,2,3,5,7,8,10];
	var scale=[];
	var orderedNotes=[];


	var key = notes.indexOf(key);

	for(var i=key; i<notes.length;i++){
		orderedNotes.push(notes[i]);
	}

	for (var i=0;i<key;i++){
		orderedNotes.push(notes[i]);
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
}


function getChord(key,color){
	var triad=[1,3,5];
	var chord=[];
	for(var i=0;i<triad.length;i++){
		chord.push(key[triad[i]-1]);
	}

	switch(color){
		case '7th':	
		chord.push(key[6]);
		break;

		case '4th':
		chord.push(key[3]);
		break;

		case '9th':
		chord.push(key[1]);
		break;

		default:
		console.log('default');
		return chord;

	}

	return chord;
}



(function init(){

	var standard = ['e','B','G','D','A','E'];

	for(var i=0;i<6;i++){
		if(standard[i]=='e'){
			populateFrets(standard[i],'E');
		}else{
		populateFrets(standard[i],standard[i]);
		}
	}
	addTuningNotes();
	showButtons();
})();

function populateFrets(string,key){
	
	orderedNotes=[];
	this.key = key;
	var frets = getScale(key);
	var string = string;
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
		window.alert('asshole');
	}

	currentString.empty();

	for(var i=0;i<frets.length;i++){
		currentString.append('<li>'+frets[i]+'</li>');
	}
	addTuningNotes();
}


//Tuning Strings
function addTuningNotes(){
	var option='';
	for(var i=0;i<12;i++){
		 $('.fretboard ul select').append('<option value="'+ notes[i] + '">' + notes[i] + '</option>');
	}
}

//Retuning
$('#fretboard input').change(function(event){

	var este = $(this);
	var string = este.attr('id').split('-')[0];
	var key = este.val();

	if(notes.indexOf(este.val())<0){
		console.log('you stupid');
	}

	populateFrets(string, key);
	if(currentChord.length==2){
		showChord(currentChord[0],currentChord[1]);
	}
	
});


//Buttons Panel
function showButtons(){
	//major chords
	for(var i=0;i<notes.length;i++){
		$('#major').append('<button class="btn major btn-default" id="'+notes[i]+' major">'+notes[i]+'</button>');
	} 
	for(var i=0;i<notes.length;i++){
		$('#minor').append('<button class="btn minor btn-default" id="'+notes[i]+' minor">'+notes[i]+'m</button>');
	} 
}

var key, scale;
$('#buttons button').click(function(){
	key = $(this).attr('id').split(' ')[0];
	scale = $(this).attr('id').split(' ')[1];

	showChord(key, scale);



});

function showChord(key, scale){
	var extra; 
	currentChord=[key, scale];
	getChord(getScale(key, scale));
	chord = getChord(getScale(key, scale));

	colorFrets(chord, extra);	
}

//Show Chords on Fretboard
function colorFrets(chord, extra){
	currentTriad = chord;
	var frets = $('#fretboard li');
	var extra;

	for(var i=0;i<frets.length;i++){


		var currentFret = frets[i];
		currentFret.removeAttribute('class');

		var fret = frets[i].innerHTML;
		var interval;
		if(fret==chord[0]){
			currentFret.setAttribute('class','first');
		}
		if(fret==chord[1]){
			currentFret.setAttribute('class','third');
		}
		if(fret==chord[2]){
			currentFret.setAttribute('class','fifth');
		}
	}
	//$('.checkbox').show(200);
}

// var checkbox;
// $('#buttons input').change(function(){
	
// 	if($(this).prop('checked')){
// 		switch($(this).attr('id')){
// 		case 'seventh':
// 		colorFrets(currentTriad, $(this).attr('id'));
// 		break;
// 		case 'ninth':
// 		colorFrets(currentTriad, $(this).attr('id'));
// 		console.log(currentTriad, $(this).attr('id'))
// 		break;
// 		}
// 	}
// });





