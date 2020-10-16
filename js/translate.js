function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function randomTokensForWords(){
	var posible_tokens=[];
	if(tokens.indexOf(",")!= -1){
		tokens = tokens.split(",");
	}
	for(var i=0;i<tokens.length;i++){
		posible_tokens.push(i.toString());
	}
	
	for(var i=1;i<words.length;i++){		
		new_tokens = "";
		
		num_tokens = words[i].token.split(',').length;
		for(var j=0;j<num_tokens;j++){
			if(new_tokens!="")new_tokens+=",";
			index = randomIntFromInterval(1,posible_tokens.length-1);		
			new_tokens += posible_tokens[index];
			posible_tokens.splice(index, 1);			
		}	

		words[i].token = new_tokens;
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