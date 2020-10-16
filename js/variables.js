//Other variables
var b_size = 30;
var pattern_separation = 270;//Separate patters last attempt, before and after when all of them in screen
var startTime;
var experiment = 0;
var level = 0;
var currentLevel = 0;
var done = 0;
var showInstructions = 'block';
var showAbout = 'block';
var block_actions = 0;
var currentAttempts = 0;
var currentTaskAttempts = '';
var cubes = [];//Save the possible blocks to place (Left panel)
var task_cubes = [];//Save the blocks place in the task (right  bottom panel)
var click_block = -1;//Save the last cube clicked (Left panel)
var x_floor = 220;//coorditanes where the task space start
var y_floor = 210;//coorditanes where the task space start
var blocks_per_floor = 1;//Number of blocks that can be placed horitonzally
var current_blocks = '';//Participant solving and using blocks 
var current_task = '';//Participant solving task panel bottom right
var creatingInstruction = [];//Creates the instruction for the next participant
var answers = [];//Store time, attempts and result for each task as a JSON
var survey = [];//Store time, attempts and result for each task as a JSON
var randomTaskNumber = [];

var tokens = "";
var words = [];
var full_data = "";

//Colors to use for blocks
var block_colors=[
{"color":"empty","unselect":"","select":""},
{"color":"blue","unselect":"#0080ff","select":"#004d99"},
{"color":"orange","unselect":"#ff8000","select":"#994d00"},
{"color":"green","unselect":"#009926","select":"#004d13"},
{"color":"pink","unselect":"#ff66ff","select":"#ff1aff"},
{"color":"purple","unselect":"#5900b3","select":"#26004d"},
{"color":"brown","unselect":"#4d2600","select":"#1a0d00"}
]