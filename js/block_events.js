////////////////////EVENTS/////////////////////////

	///////////////////EVENTS Blocks///////////////////    
    blocksCanvas.addEventListener('mousemove', function(e) {
		if(block_actions==1){
			e.target.style.cursor = 'not-allowed';
			return;
		} 
		
		//e.target.style.cursor = 'pointer'
		//e.target.style.cursor="url(http://www.google.com/intl/en_ALL/mapfiles/openhand.cur)";		
		
		var clickedX = e.pageX - this.offsetLeft;
		var clickedY = e.pageY - this.offsetTop;
		var message = clickedX + ',' + clickedY;
		
		if (clickedX > 620 && clickedX < 720 && clickedY > 320 && clickedY < 370) {
			return;
		}
		
		var selected = -1;
		for (var i = 0; i < cubes.length; i++) {
			if (clickedX < cubes[i].right && clickedX > cubes[i].left && clickedY > cubes[i].top && clickedY < cubes[i].bottom) {
				selected = i;
			}
		}
		
		var selected_task = -1;
		for (var i = 0; i < blocks_per_floor; i++) {
			if (clickedX >= x_floor+i*b_size-b_size/2 && clickedX < x_floor+b_size+i*b_size) {
				selected_task = i;
			}
		}				
		
		current_task = loadTask(blocksCanvas,current_task,selected_task);
		loadBlocks(blocksCanvas,current_blocks,selected,clickedX,clickedY);
		//writeMessage(blocksCanvas, message);
		writeMessage(blocksCanvas, numberAttempts-currentAttempts+' attempts left.');
		if(isShowButton('submit')==0 && tasks[0].conf[level].after!=current_task)
			drawX(blocksCanvas,250,300);
    }, false);
	
	blocksCanvas.addEventListener('mouseout', function(e) {
		if(block_actions==1) return;
		
		e.target.style.cursor = 'move'
		
		//writeMessage(blocksCanvas, '');		
		loadBlocks(blocksCanvas,current_blocks);
		current_task = loadTask(blocksCanvas,current_task);
	}, false);
	
	blocksCanvas.addEventListener('mouseenter', function(e) {
		if(block_actions==1) return;
		
		blocksCanvas.setAttribute("style", "cursor: move; cursor: grab; cursor:-moz-grab; cursor:-webkit-grab;");
	}, false);
	
	
	blocksCanvas.addEventListener('mousedown', function (e) {
		if(block_actions==1) return;		
		
		blocksCanvas.setAttribute("style", "cursor: move; cursor: grabbing; cursor:-moz-grabbing; cursor:-webkit-grabbing;");
		
		var clickedX = e.pageX - this.offsetLeft;
		var clickedY = e.pageY - this.offsetTop;
    		   
		//Select a block and hold it
		if(click_block==-1){
			for (var i = 0; i < cubes.length; i++) {
				if (clickedX < cubes[i].right && clickedX > cubes[i].left && clickedY > cubes[i].top && clickedY < cubes[i].bottom) {
					click_block = i;
					loadBlocks(blocksCanvas,current_blocks,-1,clickedX,clickedY);
					current_task = loadTask(blocksCanvas,current_task);		
				}
			}			
		}	

		var selected_column = -1;
		for (var i = 0; i < blocks_per_floor; i++) {
			if (clickedX >= x_floor+i*b_size-b_size/2 && clickedX < x_floor+b_size+i*b_size) {
				selected_column = i;
			}
		}
		//Place a block in the task		
		if (click_block==-1 && selected_column!=-1) {//Remove a block in the task				
			var row = current_task.split("_");
			var removed = 0;
			for (var i = row.length-1 ; i >= 0 ; i--) {						
				for(var j=0; j<row[i].length;j++){
					if(removed==0 && selected_column==j && row[i].charAt(j)!='0'){
						current_blocks+=row[i].charAt(j);
						row[i] = setCharAt(row[i],j,"0");
						removed=1;
					}				
				}							
			}
			top_row = '';
			for(var i=0;i<blocks_per_floor;i++){
				top_row+='0';
			}
			current_task = '';
			for (var i = 0; i < row.length ; i++) {
				if(i==0 || row[i]!=top_row){
					if(current_task!='') current_task+='_';
					current_task+= row[i];
				}
			}			
			click_block = cubes.length;								
			current_task = loadTask(blocksCanvas,current_task);				
			loadBlocks(blocksCanvas,current_blocks,-1,clickedX,clickedY);				
		}		
				
	});
	
	blocksCanvas.addEventListener('mouseup', function (e) {		
		if(block_actions==1) return;				
		
		blocksCanvas.setAttribute("style", "cursor: move; cursor: grab; cursor:-moz-grab; cursor:-webkit-grab;");
		
		var clickedX = e.pageX - this.offsetLeft;
		var clickedY = e.pageY - this.offsetTop;
    		   
		var selected_column = -1;
		for (var i = 0; i < blocks_per_floor; i++) {
			if (clickedX >= x_floor+i*b_size-b_size/2 && clickedX < x_floor+b_size+i*b_size) {
				selected_column = i;				
			}
		}
		if(selected_column==-1){			
			if(click_block!=-1){
				showButton('submit',1);				
			}
			click_block = -1;
			loadBlocks(blocksCanvas,current_blocks,-1,clickedX,clickedY);
			current_task = loadTask(blocksCanvas,current_task);							
		}		
		//Place a block in the task		
		if (click_block!=-1 && selected_column!=-1) {
			showButton('submit',1);
			cur_blocks = '';
			for (var j = 0; j < current_blocks.length; j++) {					
				if(j!=click_block){
					cur_blocks += current_blocks.charAt(j);				
				}else{//100,	111_101_101
					var row = current_task.split("_");
					var placed = 0;
					for (var k = 0; k < row.length ; k++) {
						for(var n=0; n<row[k].length;n++){
							if(placed==0 && selected_column==n && row[k].charAt(n)=='0'){
								row[k] = setCharAt(row[k],n,current_blocks.charAt(j));
								placed = 1;		
							}	
							
						}							
					}
					current_task = '';
					for (var k = 0; k < row.length ; k++) {
						if(current_task!='') current_task+='_';
						current_task+= row[k];
					}
					if(placed==0){
						new_floor = '_'
						for (var k = 0; k < row[0].length ; k++) {
							if(selected_column==k){
								new_floor += current_blocks.charAt(j);
							}else{
								new_floor += '0';
							}
						}
						current_task+=new_floor;
					}
					
				}											
			}
			current_blocks = cur_blocks;			
			click_block=-1;
			loadBlocks(blocksCanvas,current_blocks,click_block,clickedX,clickedY);							
			current_task = loadTask(blocksCanvas,current_task);			
		}	
		setVariables();				
	});