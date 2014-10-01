var currentChord =[];
var currentScale = [];
var notesArray  = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
var fretboard = new Fretboard();
var notes = new Notes();
var buttons = new Buttons();
var timeline = new Timeline();

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
var extensions=[];

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
	};

	//Tuning Strings
	this.addTuningNotes = function(){
		for(var i=0;i<12;i++){
			 $('.fretboard ul select').append('<option value="'+ notesArray[i] + '">' + notesArray[i] + '</option>');
		}
	};	
	$('#fretboard input').change(function(){
		var este = $(this);
		var string = este.attr('id').split('-')[0];
		var key = este.val().toUpperCase();

		fretboard.populateFrets(string, key);

		if(currentChord.length===2){
			fretboard.showChord(currentChord[0],currentChord[1]);
		}	
	});


	this.showChord=function(key, scale){
		$('#chordName').empty();
		currentChord=[key, scale];
		notes.getChord(notes.getScale(key, scale));
		this.colorFrets();	
		$('#chordName').append(key + ' ' + scale);

	};

	//Show Chords on Fretboard
	this.colorFrets=function(){
   
		var frets = $('#fretboard li');
		this.removeIntervals();	
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
			if(currentScale.indexOf(fret)< 0){
				currentFret.setAttribute('class','faded');
			}
		}
		this.retainExtensions();
		this.showIntervals();
	};

	this.checkExtensions = function(evt){
		if(evt.prop('checked')===true){
			$('.'+evt.attr('id')).addClass(evt.attr('id')+'-colored');
			extensions.push(evt.attr('id'));
		}

		if(evt.prop('checked')===false){
			$('.'+evt.attr('id')).removeClass(evt.attr('id')+'-colored');

			if (extensions.indexOf(evt.attr('id')) > -1) {
			    extensions.splice(extensions.indexOf(evt.attr('id')), 1);
			}
		}	
	};

	this.retainExtensions = function(){
		if(extensions.length!=0){
			for(var i=0;i<extensions.length;i++){
				$('.'+extensions[i]).addClass(extensions[i]+'-colored');
			}
		}
	};

	this.showIntervals=function(){
		$('.first').prepend('<span>I</span>');
		$('.second').prepend('<span>II</span>');
		$('.third').prepend('<span>III</span>');
		$('.fourth').prepend('<span>IV</span>');
		$('.fifth').prepend('<span>V</span>');
		$('.sixth').prepend('<span>VI</span>');
		$('.seventh').prepend('<span>VII</span>');

	};
	this.removeIntervals=function(){
		$('#fretboard span').remove();	
	}
}


function Buttons(){
var key, scale;
	this.showButtons = function(){
		for(var i=0;i<notesArray.length;i++){
			$('#major').append('<button class="btn major btn-default ui-widget-content" id="'+notesArray[i]+' major">'+notesArray[i]+'</button>');
		} 
		for(var i=0;i<notesArray.length;i++){
			$('#minor').append('<button class="btn minor btn-default ui-widget-content" id="'+notesArray[i]+' minor">'+notesArray[i]+'m</button>');
		} 
	};
	this.showButtons();


	$('.checkbox input').change(function(){
		fretboard.checkExtensions($(this));
	});

	$('#buttons .btn-default').click(function(){

		$('.to-timeline').prop('disabled',false);
		key = $(this).attr('id').split(' ')[0];
		scale = $(this).attr('id').split(' ')[1];
		fretboard.showChord(key, scale)
		fretboard.retainExtensions();
		$('.to-timeline').prop('disabled', false);

	});

	$('.to-timeline').click(function(){
		timeline.newChord(key, scale);
		$(this).prop('disabled',true);
	});

	$('.glyphicon-minus').click(function(){
		$('.checkbox, .to-timeline,#major,#minor').hide(200);
		setTimeout(function(){		
			$('.buttons').css({'margin-bottom':'5px','height':'0px'});
		},200);

		$('.glyphicon-minus').hide();
		$('.glyphicon-plus').show(200);

	});
	$('.glyphicon-plus').click(function(){
		$('.checkbox, .to-timeline,#major,#minor').show(200);
		$('.buttons').css({'margin-bottom':'5px','height':'240px'});
		$('.glyphicon-plus').hide();
		$('.glyphicon-minus').show(200);
	});

}

function Timeline(){
	var timeline=[];
	var shortenedScale;

	$('.glyphicon-play').on('click', function(){
		$(this).hide();
		$('.glyphicon-pause').show();
	});
	$('.glyphicon-pause').on('click', function(){
		$(this).hide();
		$('.glyphicon-play').show();
	});


	this.newChord=function(key, scale){
		if(scale=='minor'){shortenedScale='m'};
		if(scale=='major'){shortenedScale=''};
		$('.timeline').append('<div class="chords" id="'+key+''+scale+'">'+key+''+shortenedScale+'</div>');
		timeline.push(key+' '+scale);
	}
}












