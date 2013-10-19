$(function() {
	function reset() {
		function getRandomWord() {
			var wordsInDictionary=4030;
			var p=Math.floor(Math.random()*wordsInDictionary);
			var counter=0;
			for (var i in words) {
				if (counter==p) {
					break;
				}
				++counter;
			}
			return i;
		}
		function isChainValid() {
			return step(startWord, 0);
		}
		function step(word, stepnumber) {
			if (!words[word]) {
				return false;
			}
			if (stepnumber==wordlength-1) {
				var diff=0;
				for (i=0;i<wordlength;++i) {
					if (word[i]!=endWord[i]) {
						++diff;
					}
				}
				if (diff>1) {
					return false;
				}
				return true;
			}
			for (var i=0; i<wordlength; ++i) {
				var alphabet='abcdefghijklmnopqrstuvwxyz';
				for (j in alphabet.split('')) {
					var letter=alphabet[j];
					var newWord='';
					for (var k=0; k<wordlength; ++k) {
						if (k==i) {
							newWord+=letter;
						}
						else  {
							newWord+=word[k];
						}
					}
					if (step(newWord, stepnumber+1)) {
						console.log(newWord);
						return true;
					}
				}
			}
			return false;
		}
		// { settings
		var wordlength=4;
		do {
			var startWord=getRandomWord();
			var endWord=getRandomWord();
		} while(!isChainValid());
		// }
		// { set up table
		var table='<thead><tr>';
		var letters=startWord.split('');
		for (var i=0;i<wordlength;++i) {
			table+='<th><input value="'+letters[i]+'" disabled/></th>';
		}
		table+='</tr></thead><tbody>';
		for (var row=0;row<wordlength-1;++row) {
			table+='<tr>';
			for (var col=0;col<wordlength;++col) {
				table+='<td><input placeholder="'+letters[col]+'"/></td>';
			}
			table+='</tr>';
		}
		table+='</tbody><tfoot><tr>';
		var letters=endWord.split('');
		for (var i=0;i<wordlength;++i) {
			table+='<th><input value="'+letters[i]+'" disabled/></th>';
		}
		table+='</tr></tfoot>';
		$('#chain').html(table);
		// }
		// { add events
		$('tbody input').keyup(processChange);
		// }
		function processChange() {
			var letter=$(this).val();
			if (letter.length>1) {
				var letters=letter.split('');
				letter=letters[letter.length-1];
			}
			$(this).closest('tr').find('input').val('');
			$(this).val(letter);
			rebuildPlaceholders();
		}
		function rebuildPlaceholders() {
			var currentPlaceholder=startWord.split('');
			$('tbody tr').each(function() {
				var currentCol=0;
				$('input', this).each(function() {
					$(this).prop('placeholder', currentPlaceholder[currentCol]);
					var letter=$(this).val();
					if (letter!='') {
						currentPlaceholder[currentCol]=letter;
					}
					++currentCol;
				});
			});
		}
	}
	reset();
	$('#reset').click(reset);
});
