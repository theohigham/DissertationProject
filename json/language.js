var tasks = [{
	"id":"1",
	"conf":[	
		{"blocks":"1","before":"0","after":["1"],"instruction":"add blue"},
		{"blocks":"2","before":"00","after":["02","20"],"instruction":"add orange"},
		{"blocks":"12","before":"000","after":["012","021","102","120","201","210"],"instruction":"add orange blue"},
		{"blocks":"1122","before":"000","after":["221","212","122"],"instruction":"add orange orange blue"},
		
		{"blocks":"","before":"2","after":["0"],"instruction":"remove orange"},
		{"blocks":"2","before":"12","after":["02","20"],"instruction":"remove blue"},
		{"blocks":"2","before":"123","after":["003","030","300"],"instruction":"remove orange blue"},
		{"blocks":"1","before":"122","after":["002","020","200"],"instruction":"remove orange blue"},
		{"blocks":"2","before":"100","after":["200","020","002"],"instruction":"remove blue add orange"},
		
		{"blocks":"111","before":"000","after":["111"],"instruction":"add all blue"},
		{"blocks":"22","before":"000","after":["022","202","220"],"instruction":"add all orange"},
		{"blocks":"1122","before":"0000","after":["1122","1212","1221","2211","2121","2112"],"instruction":"add all blue orange"},
		{"blocks":"1122","before":"0000","after":["1220","1202","1022","2012","2021","2102","2120","2201","2210","0122","0212","0221"],"instruction":"add blue add all orange"},
		{"blocks":"1122","before":"120","after":["111"],"instruction":"remove orange add all blue"},
		
		{"blocks":"","before":"1112","after":["0002","0020","0200","2000"],"instruction":"remove all blue"},
		{"blocks":"","before":"12210","after":["00000"],"instruction":"remove all blue orange"},
		{"blocks":"","before":"1122","after":["0002","0020","0200","2000"],"instruction":"remove orange remove all blue"},
		{"blocks":"1","before":"2200","after":["0001","0010","0100","1000"],"instruction":"remove all orange add blue"},
	
		{"blocks":"1","before":"2","after":["2_1"],"instruction":"add blue on orange"},
		{"blocks":"12","before":"10","after":["10_20","01_02"],"instruction":"add orange on blue"},
		{"blocks":"12","before":"212","after":["212_100","212_001","122_010","122_001","221_100","221_010"],"instruction":"add blue on orange"},
		
		{"blocks":"","before":"1234_1256_1000","after":["0234_0156"],"instruction":"remove all blue remove orange add blue on orange"},
		{"blocks":"","before":"3456_2300_0100","after":["0000"],"instruction":"remove all"},
		{"blocks":"456","before":"000","after":["456","465","546","564","645","654"],"instruction":"add all"}
	]
}]

//First position is used to denote an space with " " or a word "a" or nothing "". (No spaces at the beginig or end of sentences).
var tokens=" ,wa,wi,wu,we,wo,ka,ku,ke,ko,ta,ti,te,to,tu,ba,bi,bu,bo,na,ni";

//All posible words to use for the game, consider always space.
var words=[
	{"word":" ","token":"0"},
	{"word":"add","token":"2,10"},
	{"word":"remove","token":"15,8"},
	{"word":"on","token":"19,17"},
	{"word":"all","token":"12,20"},
	{"word":"blue","token":"5,18"},
	{"word":"orange","token":"9,10"}
]