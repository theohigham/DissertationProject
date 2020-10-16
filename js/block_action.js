	function setCharAt(str,index,chr) {
		if(index > str.length-1) return str;
		return str.substr(0,index) + chr + str.substr(index+1);
	}

	function writeMessage(canvas, message) {
        var context = canvas.getContext('2d');
        context.clearRect(5, canvas.height-25, 125, 25);
        context.font = '14pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, 5, canvas.height-10);
    }
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: Math.round(evt.clientX - rect.left),
          y: Math.round(evt.clientY - rect.top)
        };
    }
	
	function setCursorByID(id,cursorStyle) {
		var elem;
		if (document.getElementById &&
			(elem=document.getElementById(id)) ) {
			if (elem.style) elem.style.cursor=cursorStyle;
		}
	}	
	
	///////////////////LOAD/////////////////////////
	///////////////////////////////////////////////
		
	function loadInstruction() {
		//console.log("level: "+level)
		//console.log("randomTaskNumber: "+randomTaskNumber)
		//console.log("randomTaskNumber[level]: "+randomTaskNumber[level])
		document.getElementById("instruction").innerHTML = tasks[0].conf[randomTaskNumber[level]].instruction;
	}
		
		
	function loadBlocks(canvas,blocks,selected, x_mouse, y_mouse){	
		if(selected === undefined) {
			selected = -1;
		}
		if(x_mouse === undefined) {
			x_mouse = -100;
		}
		if(y_mouse === undefined) {
			y_mouse = -100;
		}
		current_blocks = blocks;
		var context = canvas.getContext('2d');
		context.clearRect(0, 0, b_size*5, canvas.height-25);
		
		
		context.beginPath();
		context.lineWidth = 1;
		context.strokeStyle = '#8c8c8c';
		context.moveTo(b_size*5,0);
		context.lineTo(b_size*5,canvas.height);
		context.stroke();
		
		context.moveTo(0,0);
		context.lineTo(canvas.width,0);
		context.stroke();
		
		context.lineWidth = 1;
		
		
		cubes = [];
		for (var i = 0; i < current_blocks.length; i++) {
			var current_block = current_blocks.charAt(i);
			block_color = block_colors[parseInt(current_block)];			
			color = (selected==i?block_color.select:block_color.unselect)			
			x = b_size + b_size*2.5*(i%2);
			y = b_size*2+b_size*i*1.2;
			tune = 10;

			cubes.push(drawCube(
				context,
				x+tune,//30
				y+tune,//60
				b_size,//30
				b_size,//30
				b_size,//30
				color,
				i
			));	
			if(click_block==i){
				drawCubeShadow(context,
				x+tune,//30
				y+tune,//60
				b_size,//30
				b_size,//30
				b_size,//30
				'#cccccc',
				i);
				
				drawCube(context,
				x_mouse,//30
				y_mouse,//60
				b_size,//30
				b_size,//30
				b_size,//30
				color,
				i);
			}			
		}			
	}

	function loadTask(canvas,lvl, selected, left){
		if(selected === undefined) {
			selected = -1;
		}
		if(left === undefined) {
			left = 0;
		}
		var context = canvas.getContext('2d');
		if(left==0)
			context.clearRect(b_size*5, 0, canvas.width, canvas.height);
		else
			context.clearRect(b_size*5+left, 0, canvas.width, 280);
		
		cur_task = lvl;
		floor_size=3;
		floor_number = 0;
		count=0;
		
		context.beginPath();
		context.lineWidth = 1;
		context.strokeStyle = '#8c8c8c';
		context.moveTo(b_size*5,0);
		context.lineTo(b_size*5,canvas.height);
		context.stroke();
		
		context.moveTo(0,0);
		context.lineTo(canvas.width,0);
		context.stroke();
		
		context.lineWidth = 1;
		
		task_cubes=[];
		blocks_per_floor = 0;
		for (var i = 0; i < cur_task.length; i++) {
			var current_block = cur_task.charAt(i)
			if(floor_number==0 && current_block!='_'){
				task_cubes.push(drawCube(context,
					x_floor+b_size*i+left,
					y_floor+b_size*i/2,
					b_size,
					b_size,
					floor_size,
					selected==count?'#ffff00':'#404040',
					count*100));
				blocks_per_floor++;
			}
			if(current_block=='_'){
				floor_number++;
				count=0;
			}else if(current_block!='0'){	
				block_color = block_colors[parseInt(current_block)];
				color = block_color.unselect;
				task_cubes.push(drawCube(context,
					x_floor+b_size*count-(floor_number>0?b_size:0)+left,
					y_floor+b_size*count/2-floor_size-(floor_number*b_size)-(floor_number>0?b_size/2:0),
					b_size,
					b_size,
					b_size,
					color,
					floor_number+count*100));
			}			
			count++;
		}
		progress(canvas,-1);
			
		return cur_task;
		
	}
	
	function progress(canvas,current){
		var extra_height = 0;
		var context = canvas.getContext('2d');
		for(var i = 0; i < tasks[0].conf.length; i++){			
			color='#404040';			
			if(answers.length>i){				
				if(answers[i].result==1)
					color='#00b300';
				else
					color='#e60000';
			}
			if(current!=-1){
				extra_height=-85;
				color='#2E64FE';	
				if(current<=i){				
					color='#404040';	
				}
			}
			drawCube(context,
					b_size*6+(i*b_size/5*4),
					canvas.height+extra_height,
					b_size/3,
					b_size/3,
					b_size/3,
					color);			
		}
		
	}
	
	//Submit//////////////////////////
	function drawX(canvas, x, y) {
		var ctx = canvas.getContext('2d');
		ctx.beginPath();
		
		ctx.strokeStyle = '#e60000';
		ctx.lineWidth = 10;
		ctx.lineCap = 'round';
		ctx.moveTo(x - 30, y - 30);
		ctx.lineTo(x + 30, y + 30);

		ctx.moveTo(x + 30, y - 30);
		ctx.lineTo(x - 30, y + 30);
		ctx.stroke();
		ctx.lineWidth = 1;
		      
		ctx.font = '14pt Calibri';
		ctx.fillStyle = 'black';
		ctx.fillText('Incorrect', x+30,y);			
	}
	
	function drawO(canvas, x, y) {
		var ctx = canvas.getContext('2d');
		ctx.beginPath();
		
		ctx.strokeStyle = '#00b300';
		ctx.lineWidth = 10;
		ctx.lineCap = 'round';
		ctx.moveTo(x - 30, y);
		ctx.lineTo(x - 15, y + 30);

		ctx.moveTo(x - 15, y +30);
		ctx.lineTo(x + 30, y - 30);
		ctx.stroke();
		ctx.lineWidth = 1;
		
		ctx.font = '14pt Calibri';
		ctx.fillStyle = 'black';
		ctx.fillText('Correct', x+40,y);		
		
	}
	
	function drawO1(canvas, x, y) {
		var ctx = canvas.getContext('2d');
		ctx.beginPath();
		
		var centerX = x;
		var centerY = y;
		var radius = 30;

		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		ctx.lineWidth = 10;
		ctx.strokeStyle = '#00b300';
		ctx.stroke();
		ctx.lineWidth = 1;
		
		ctx.font = '14pt Calibri';
		ctx.fillStyle = 'black';
		ctx.fillText('Correct', x+40,y);
		
	}

	function showButton(element,status) {
		var x = document.getElementById(element);
		if (status == 1) {
			x.style.display = 'block';
		} else {
			x.style.display = 'none';
		}
	}

	function isShowButton(element) {
		var x = document.getElementById(element);
		if (x.style.display == 'block') {
			return 1;
		}
		return 0;
	}
	
	function submitAnswer(){			
		showButton('submit',0);
		currentAttempts++;	
		if(currentTaskAttempts!='') currentTaskAttempts+=',';
		currentTaskAttempts+=current_task;
		var result = false;
		for(var i=0;i<tasks[0].conf[randomTaskNumber[level]].after.length;i++){
			if(tasks[0].conf[randomTaskNumber[level]].after[i]==current_task){
				result=true;
				break;
			}
				
		}
		if(result){				
			//writeMessage(blocksCanvas, 'Correct!');
			drawO(blocksCanvas,250,300);
			writeMessage(blocksCanvas,'');				
		}else{
			//writeMessage(blocksCanvas, 'Sorry its incorrect.');						
			drawX(blocksCanvas,250,300);
			writeMessage(blocksCanvas, numberAttempts-currentAttempts+' attempts left.');
		}
		//showVariables();
		setVariables();	
		if(currentAttempts>=numberAttempts || result){			
			blockAndNext();
		}		
	}
	
	function submitAnswer2(){			
		if(creatingInstruction.length==0 || (creatingInstruction.length==1 && creatingInstruction[0]==' ')){
			alert("You need to write an instruction in order to submit.")
			return;
		}
		
		try{
			clearInterval(animation);
		}catch(Exception){}			
							
		var string = "";
		for (var i = 0; i < creatingInstruction.length; i++) {
			string+=creatingInstruction[i];
		}
		tasks[0].conf[randomTaskNumber[level]].instruction=string.trim();
					
		level++;
		
		if(level<tasks[0].conf.length){			
			loadAllCanvas2();
			setVariables();	
			//showVariables();
		}else{
			level=tasks[0].conf.length-1;
			experiment=3;
			setVariables();	
			//window.open("experiment1.html","_self");			
			window.open("survey.html","_self");
		}	
	}
	  
	var index=0;
	var distance = 0;
	function loop(){
		if(index>=tasks[0].conf[randomTaskNumber[level]].after.length)
			index=0;
		loadTask(blocksCanvas,tasks[0].conf[randomTaskNumber[level]].after[index],-1,pattern_separation*distance);
		index++;
	
		var context = blocksCanvas.getContext('2d');        
		context.font = '14pt Calibri';
		context.fillStyle = 'black';

			
		context.fillText('All correct', pattern_separation*(distance+0.56),230);	
		context.fillText('patterns:', pattern_separation*(distance+0.56),245);	
	}
	
	function blockAndNext(){
		block_actions=1;
		done=1;
			
		saveTask();
		
		var result = false;
		for(var i=0;i<tasks[0].conf[randomTaskNumber[level]].after.length;i++){
			if(tasks[0].conf[randomTaskNumber[level]].after[i]==current_task){
				result=true;
				break;
			}
				
		}
		if(!result){
			loadTask(blocksCanvas,tasks[0].conf[randomTaskNumber[level]].before,-1,pattern_separation);
			loadBlocks(blocksCanvas,tasks[0].conf[randomTaskNumber[level]].blocks);
			// request new frame
			
			distance = 2;
			loop();
			animation = setInterval(loop,1500);				
			
			var context = blocksCanvas.getContext('2d');        
			context.font = '14pt Calibri';
			context.fillStyle = 'black';
			
			context.fillText('Your last', 160,230);			
			context.fillText('pattern:', 160,245);
			
			context.fillText('Start', 430,230);			
			context.fillText('pattern:', 430,245);		

		}//else
		progress(blocksCanvas,-1);		
		
		if(level==tasks[0].conf.length-1){
			var context = blocksCanvas.getContext('2d');        
			context.font = '18pt Calibri';
			context.fillStyle = '#002966';
			
			context.fillText('Good job!', b_size*6,blocksCanvas.height-45);			
			context.fillText('Now for part 2!', b_size*6,blocksCanvas.height-25);	
		}
		showButton('reset',0);
		showButton('submit',0);
		showButton('next',1);
		setVariables();			
	}
	
	function saveTask(){
		var timeDiff = new Date() - startTime;
		timeDiff /= 1000;
		// get seconds (Original had 'round' which incorrectly counts 0:28, 0:29, 1:30 ... 1:59, 1:0)
		var task_json = {};
		var seconds = Math.round(timeDiff % 60 *100)/100;					
		task_json.task = randomTaskNumber[level];
		task_json.time = seconds;
		
		var result = false;
		for(var i=0;i<tasks[0].conf[randomTaskNumber[level]].after.length;i++){
			if(tasks[0].conf[randomTaskNumber[level]].after[i]==current_task){
				result=true;
				break;
			}
				
		}
		if(result){
			task_json.result = 1;	
		}else{
			task_json.result = 0;
		}
		task_json.attempts = currentAttempts;
		task_json.taskAttempts = currentTaskAttempts;
		
		//alert(JSON.stringify(task_json))
		
		answers.push(task_json);
		//alert(JSON.stringify(answers))
		
	}
	
	function switchLevels(){
		for(i=0;i<tasks[0].extra_conf.length;i++){
			//Save the current level in variable
			current_level = tasks[0].conf[parseInt(tasks[0].extra_conf[i].i)];
			//replace that level for the extra conf level
			tasks[0].conf[parseInt(tasks[0].extra_conf[i].i)]=tasks[0].extra_conf[i];
			//Save the current level in extra conf.
			tasks[0].extra_conf[i]=current_level;
		}
	}
	
	function nextLevel(){
		try{
			clearInterval(animation);
		}catch(Exception){}			
		
		//saveTask();
		
		level++;
		done=0;
		currentAttempts = 0;
		currentTaskAttempts = "";
		if(level<tasks[0].conf.length){			
			setVariables();	
			loadAllCanvas();
		}else{
			level=0;
			experiment=2;
			showInstructions='block';
			showAbout='none';
			switchLevels();
			setVariables();				
			window.open("experiment2.html","_self");
		}		
	}
	
	function escapeRegExp(str) {
		return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}
	function replaceAll(str, find, replace) {
		return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	}
	
	function removeSpecialCharacters(str){		
		str = replaceAll(str,'"','´');
		str = replaceAll(str,"'","´");
		str = replaceAll(str,",",".");
		return str;
	}

	function submitSurvey(){	
		survey=[];
		survey.push("Age:"+document.getElementById("age").value);
		survey.push("School:"+document.getElementById("school").value);
		survey.push("Clear instructions:"+document.getElementById("clear").value);
		survey.push("Difficult:"+document.getElementById("difficult").value);
		survey.push("Feedback:"+removeSpecialCharacters(document.getElementById("feedback").value));
		for(var i=1;i<words.length;i++){
			survey.push(words[i].word+"("+getTranslation(words[i].word)+"):"+removeSpecialCharacters(document.getElementById("word"+i).value));
		}
						
		var game_json = {};
		game_json.chainId=tasks[0].id;
		game_json.idVersion=version;		
		game_json.answers = answers;
		game_json.tasks = tasks;
		game_json.tasks[0].id = (parseInt(tasks[0].id)+1).toString();
		game_json.words = words;
		game_json.tokens = tokens.toString();
		game_json.survey = survey;
	
		game_json.experimentId="shrdlevo";
		game_json.sessionId="010101010";
  
		//alert(JSON.stringify(game_json))						
		if(saveInServer){	
			chunker.sendChunk(game_json);			
		}
		if(downloadJSON){
			download("shrdlevo.json",JSON.stringify(game_json));
		}
		experiment=4;
		setVariables();	
		window.open("done.html","_self");
	}
	
	function download(fileNameToSaveAs, textToWrite) {
		/* Saves a text string as a blob file*/  
		var ie = navigator.userAgent.match(/MSIE\s([\d.]+)/),
			ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/),
			ieEDGE = navigator.userAgent.match(/Edge/g),
			ieVer=(ie ? ie[1] : (ie11 ? 11 : (ieEDGE ? 12 : -1)));
	
		if (ie && ieVer<10) {
			console.log("No blobs on IE ver<10");
			return;
		}
	
		var textFileAsBlob = new Blob([textToWrite], {
			type: 'text/plain'
		});
	
		if (ieVer>-1) {
			window.navigator.msSaveBlob(textFileAsBlob, fileNameToSaveAs);
	
		} else {
			var downloadLink = document.createElement("a");
			downloadLink.download = fileNameToSaveAs;
			downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
			downloadLink.onclick = function(e) { document.body.removeChild(e.target); };
			downloadLink.style.display = "none";
			document.body.appendChild(downloadLink);
			downloadLink.click();
		}
	}

	////////RUN LOAD/////////////////////////		
	function loadAllCanvas(){			
		var context = blocksCanvas.getContext('2d');
		context.clearRect(0, 0, blocksCanvas.width, blocksCanvas.height);
		
		startTime = new Date();		 		 		
		 
		block_actions=0;
		showButton('reset',1);
		showButton('submit',1);
		showButton('next',0);
		loadInstruction();
		loadBlocks(blocksCanvas,tasks[0].conf[randomTaskNumber[level]].blocks);
		current_task = loadTask(blocksCanvas,tasks[0].conf[randomTaskNumber[level]].before);		
		writeMessage(blocksCanvas, numberAttempts-currentAttempts+' attempts left.');		
	}	
	
	function loadAllCanvas2(){	
		printInstruction('',-1);
		var context = blocksCanvas.getContext('2d');
		context.clearRect(0, 0, blocksCanvas.width, blocksCanvas.height);
		
		block_actions=1;
		
		startTime = new Date();
		
		loadTask(blocksCanvas,tasks[0].conf[randomTaskNumber[level]].before);
		//loadTask(blocksCanvas,tasks[0].conf[randomTaskNumber[level]].after[0],-1,pattern_separation);
		loadBlocks(blocksCanvas,tasks[0].conf[level].blocks);
		progress(blocksCanvas,level);
		
		var context = blocksCanvas.getContext('2d');        
		context.font = '14pt Calibri';
		context.fillStyle = 'black';
		context.fillText('Before:', 160,230);			
		//context.fillText('After:', 460,230);	

		distance = 1;
		loop();
		animation = setInterval(loop,1500);				
		
	}	
	
	function printInstruction(val,op){
		var newInstruction = document.getElementById("newInstruction");
		
		if(op==1){
			if(!(creatingInstruction.length>0 && val==' ' && creatingInstruction[creatingInstruction.length-1]==' '))
				creatingInstruction.push(val);
		}else if(op==0){
			creatingInstruction.pop();
		}else{
			creatingInstruction=[];
		}		
		newInstruction.innerHTML = "";
		for (var i = 0; i < creatingInstruction.length; i++) {
			if(i==creatingInstruction.length-1 && creatingInstruction[i]==' ')
				newInstruction.innerHTML += "_";
			else
				newInstruction.innerHTML += creatingInstruction[i];
		}
	}	
	
	function createKeyboard(){
		var n = 0;
		var space = 0;
		var backspace = 0;
		var kb = document.getElementById("keyboard");
		for (var i = 0; i < tokens.length; i++) {
			var val = tokens[i];
			if(val==' '){
				space=1;
			}else{
				n++;
				kb.innerHTML += '<button id="but'+i+'" style="width:40px;cursor:pointer;" onclick="printInstruction(\''+val+'\',1);">'+val+'</button>';
				if(n>tokens.length/3){
					if(backspace==0){
						kb.innerHTML += '<button id="butD" style="width:60px;cursor:pointer;" onclick="printInstruction(\'\',0);">Delete</button>';
						backspace=1;
					}
					kb.innerHTML += '<br/>';
					n=0;
				}
			}
			
		}	
		//kb.innerHTML += '<button id="submit" onclick="submitAnswer2();">Submit</button>';
		if(space==1)
			kb.innerHTML += '<br/><button id="but0" style="width:500px;cursor:pointer;" onclick="printInstruction(\' \',1);">Space</button>';
		
	}	
	
	function showInstructionPopUp(val){		
		if(level==0){
			startTime = new Date();	
		}
		showInstructions=val;
		document.getElementById('instructions').style.display = showInstructions;				
		setVariables();
	}
	
	function showAboutPopUp(val){	
		showAbout=val;
		document.getElementById('about1').style.display = showAbout;				
		setVariables();
	}
	

	function loadFiles(url){
		var error= false;
		getFileFromServer(url+taskFile, function(text) {
			if (text === null) {
				error = true;
			}else {
				tasks = JSON.parse(text);
				for(var i=0;i<tasks[0].conf.length;i++){					
					randomTaskNumber.push(i);
				}
				if(randomTasks){
					randomTaskNumber.sort(function(a, b){return 0.5 - Math.random()});
				}
			}
		});
		getFileFromServer(url+tokensFile, function(text) {
			if (text === null) {
				error = true;
				console.log("tokens")
			}else {
				tokens = text.split(",");			
			}
		});
		getFileFromServer(url+wordsFile, function(text) {
			if (text === null) {
				error = true;
				console.log("words")
			}else {
				words = JSON.parse(text);
			}
		});	
		if(error){
			console.log('Game not loading files!')
		}			
	}		

	function getFileFromServer(url, doneCallback) {
		var xhr;
		
		xhr = new XMLHttpRequest();
		xhr.onreadystatechange = handleStateChange;
		xhr.open("GET", url, false);
		xhr.send();

		function handleStateChange() {
			if (xhr.readyState === 4) {
				doneCallback(xhr.status == 200? xhr.responseText : null);
			}
		}
	}
	
	function getDataSomata() {
		if(!dataFromSomata) return;
		//urlData
		console.log("DataSomata")
		$.get(urlData, {}, function(results){
		  alert(JSON.stringify(results)); // will show the HTML from anotherPage.html
		});

	}
	
	//COOKIES
	function agreeEthics(){
		if(document.getElementById('agree').checked) { 
			experiment=1;
			setVariables();
			window.open("experiment1.html","_self");			
		} else { 
			alert('Please indicate that you have read and agree to the consent form'); return false;
		}
	}
	
	function showVariables(){
		
		alert("VERSION: "+version
			+"\n experiment: "+experiment
			+"\n level: "+level
			+"\n randomTaskNumber: "+randomTaskNumber			
			+"\n done: "+done
			+"\n showInstructions: "+showInstructions
			+"\n showAbout: "+showAbout			
			+"\n block_actions: "+block_actions
			+"\n currentAttempts: "+currentAttempts
			+"\n currentTaskAttempts: "+currentTaskAttempts			
			+"\n cubes: "+ JSON.stringify(cubes)
			+"\n task_cubes: "+ JSON.stringify(task_cubes)
			+"\n click_block: "+click_block
			+"\n blocks_per_floor: "+blocks_per_floor
			+"\n current_blocks: "+current_blocks
			+"\n current_task: "+current_task
			+"\n creatingInstruction: "+creatingInstruction
			+"\n tasks: "+JSON.stringify(tasks)
			+"\n words: "+JSON.stringify(words)
			+"\n tokens: "+tokens
			+"\n answers: "+JSON.stringify(answers)
			+"\n survey: "+survey.toString()		
			);
			
	}
	
	function setVariables(){		
		localStorage.setItem("version", version.toString());
		localStorage.setItem("experiment", experiment.toString());
		localStorage.setItem("level", level.toString());
		localStorage.setItem("randomTaskNumber", randomTaskNumber.toString());		
		localStorage.setItem("done", done.toString());
		localStorage.setItem("showInstructions", showInstructions);	
		localStorage.setItem("showAbout", showAbout);			
		localStorage.setItem("block_actions", block_actions.toString());
		localStorage.setItem("currentAttempts", currentAttempts.toString());
		localStorage.setItem("currentTaskAttempts", currentTaskAttempts.toString());		
		localStorage.setItem("cubes", JSON.stringify(cubes));
		localStorage.setItem("task_cubes", JSON.stringify(task_cubes));
		localStorage.setItem("click_block", click_block.toString());
		localStorage.setItem("blocks_per_floor", blocks_per_floor.toString());
		localStorage.setItem("current_blocks", current_blocks);
		localStorage.setItem("current_task", current_task);
		localStorage.setItem("creatingInstruction", creatingInstruction);
		localStorage.setItem("tasks",  JSON.stringify(tasks));
		localStorage.setItem("words",  JSON.stringify(words));
		localStorage.setItem("tokens",  tokens.toString());
		localStorage.setItem("answers", JSON.stringify(answers));
		localStorage.setItem("survey", survey.toString());
		//showVariables();		
		//document.cookie = "block_actions="+block_actions+";currentAttempts="+currentAttempts+";cubes="+JSON.stringify(cubes)+";task_cubes="+JSON.stringify(task_cubes)+";click_block="+click_block+";blocks_per_floor="+blocks_per_floor+";current_blocks="+current_blocks+";current_task="+current_task+";";		
	}
	
	function resetVariables(){
		//showVariables();		
		localStorage.setItem("version", version.toString());
		localStorage.setItem("experiment", "0");				
		location.reload();		
	}
	
	function getVariables(){
		var x = document.URL

		if (localStorage.getItem("version") === null || localStorage.getItem("version")!=version.toString()){		
			resetVariables();
		}else if(localStorage.getItem("experiment")=="0" &&  x.indexOf("index")!=-1){	
			if(x.indexOf("https")!=-1){				
				loadFiles("");		
			}else{				
				loadFiles(urlLocal);
			}
			getDataSomata();
			randomTokensForWords();
			loadTranslations();//Load translation
			setVariables();//Store variables
		}				
		
		version = parseFloat(localStorage.getItem("version"));
		experiment = parseInt(localStorage.getItem("experiment"));
		level = parseInt(localStorage.getItem("level"));
		try{
			randomTaskNumber = (localStorage.getItem("randomTaskNumber")).split(",");		
		}catch(e){}
		done = parseInt(localStorage.getItem("done"));
		showInstructions = localStorage.getItem("showInstructions");		
		showAbout = localStorage.getItem("showAbout");				
		block_actions = parseInt(localStorage.getItem("block_actions"));
		currentAttempts = parseInt(localStorage.getItem("currentAttempts"));
		currentTaskAttempts = localStorage.getItem("currentTaskAttempts");
		cubes = JSON.parse(localStorage.getItem("cubes"));
		task_cubes = JSON.parse(localStorage.getItem("task_cubes"));
		click_block = parseInt(localStorage.getItem("click_block"));
		blocks_per_floor = parseInt(localStorage.getItem("blocks_per_floor"));
		current_blocks = localStorage.getItem("current_blocks");
		current_task = localStorage.getItem("current_task");
		try{
			creatingInstruction = localStorage.getItem("creatingInstruction").split(",");					
		}catch(e){}
		tasks = JSON.parse(localStorage.getItem("tasks"));
		words = JSON.parse(localStorage.getItem("words"));				
		try{
			tokens = (localStorage.getItem("tokens")).split(",");
		}catch(e){}	
		answers = JSON.parse(localStorage.getItem("answers"));
		try{
			survey = (localStorage.getItem("survey")).split(",");					
		}catch(e){}
		
		if(x.indexOf("summary")==-1){	
			if(experiment==0 && x.indexOf("index")==-1){	
				window.open("index.html","_self");
			}else if(experiment==1){
				if(x.indexOf("experiment1")==-1){
					window.open("experiment1.html","_self");
				}
				if(done==1){
					nextLevel();
				}
			}else if(experiment==2 && x.indexOf("experiment2")==-1){
				window.open("experiment2.html","_self");
			}else if(experiment==3 && x.indexOf("survey")==-1){
				window.open("survey.html","_self");
			}else if(experiment==4 && x.indexOf("done")==-1){
				window.open("done.html","_self");
			}
		}
		
		if(experiment!=0 && experiment<3){
			showInstructionPopUp(showInstructions);
			showAboutPopUp(showAbout);
		}
	}
	
	function onFileSelected(event) {
		var text;
		var selectedFile = event.target.files[0];
		var reader = new FileReader();

		reader.onload = function(event) {
			text = event.target.result;
			json = JSON.parse(text);
		
			answers = json.answers;
			tasks = json.tasks;
			survey = json.survey;
			words = json.words;
			tokens = json.tokens.split(',');
		
			setVariables();
			location.reload();	
		};

		reader.readAsText(selectedFile);
	}

	function skipLevelPart1(){
		current_task = tasks[0].conf[randomTaskNumber[level]].after[0];
		blockAndNext();
		nextLevel();
	}
	
	function skipAllLevelPart1(){
		level=tasks[0].conf.length-1;
		nextLevel();
	}
	
	function skipLevelPart2(){
		creatingInstruction = tokens[1];
		submitAnswer2();
		
	}
	
	function skipAllLevelPart2(){
		level=tasks[0].conf.length-1;
		skipLevelPart2();
	}	