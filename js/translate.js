function randomIntFromInterval(min,max){  // Returns a random integer from the given range
    return Math.floor(Math.random()*(max-min+1)+min);  
}

function randomTokensForWords(){
	var posible_tokens=[];
	//var englishWords = ["to","wake","woke","kana","take","toke","tote","tutu","tuba","tuna","bake","bate","bani","bike","bite","bubo","banana","bonito","katakana"];
	
	//(tokens variable comes from the file tokens.txt)
	if(tokens.indexOf(",")!= -1){ // If tokens contains a ','
		tokens = tokens.split(","); // tokens is now  an array
	}
	
	//choose 5 tokens at random to make up the language
	
	var index1 = randomIntFromInterval(1,20);
	var index2 = randomIntFromInterval(1,20);
	var index3 = randomIntFromInterval(1,20);
	
		//CHANGE THIS TO PULL FROM ONLY 5 TOKENS!!!  VVV 
		//Instead of the for loop, randomly choose 5 numbers < tokens.length
	
		posible_tokens.push(index1.toString()); // Put the token's index i into posible_tokens
		posible_tokens.push(index2.toString());
		posible_tokens.push(index3.toString());
	
	//words variable comes from the file words.json
	// words[0] is always " " (space)
	for(var i=1;i<words.length;i++){ // For every word from words.json (after space)	
		new_tokens = ""; //new_tokens is a string
		
		num_tokens = words[i].token.split(',').length; // The number of tokens to create this word
		for(var j=0;j<num_tokens;j++){ // For every token in the word
			if(new_tokens!="")new_tokens+=","; //Adds a , between every token
			index = randomIntFromInterval(1,posible_tokens.length-1); // Chooses an index from posible_tokens at random	 	
			new_tokens += posible_tokens[index];
			posible_tokens.splice(index, 1); //Removes the allocated token from the pool of posible_tokens			
		}	
		
		//var englishWord = false;
		
		//for ( var i=0; i < englishWords.length; i++) {
		
		//if ( new_tokens == englishWords[i] ){
		
		//englishWord = true;	
			
		//}
		//}	
			
		
		//if ( englishWord = false ){
		
		words[i].token = new_tokens;
			
		//} else {
		
		//randomTokensForWords();	
			
		//}
		
	}
		
}

function loadTranslations(){		
	space = getTranslation(" ");
	for(var i=0;i<tasks[0].conf.length;i++){
		translation = "";
		translate_sentence = tasks[0].conf[i].instruction;	

		var words = translate_sentence.split(" ");		
		for(var j=0;j<words.length;j++){			
			word = getTranslation(words[j]);
			translation+=word;
			if(j<words.length-1)
				translation+=space;
		}
		if(translation.trim()=="") translation = translate_sentence;
		tasks[0].conf[i].instruction=translation;
		tasks[0].conf[i].old_instruction=translation;
	}	
	
	for(var i=0;i<tasks[0].extra_conf.length;i++){
		translation = "";
		translate_sentence = tasks[0].extra_conf[i].instruction;		
		var words = translate_sentence.split(" ");		
		for(var j=0;j<words.length;j++){			
			word = getTranslation(words[j]);
			translation+=word;
			if(j<words.length-1)
				translation+=space;
		}
		if(translation.trim()=="") translation = translate_sentence;
		tasks[0].extra_conf[i].instruction=translation;
		tasks[0].extra_conf[i].old_instruction=translation;
	}
}
	
function getTranslation(word){	
	new_word = "";
	for(var i=0;i<words.length;i++){		
		if(words[i].word==word){			
			tokens_pos=words[i].token;
			token_pos=tokens_pos.split(",");
			for(var j=0;j<token_pos.length;j++){
				new_word+=tokens[parseInt(token_pos[j])];
			}
			break;
		}			
	}	
	return new_word;		
}

