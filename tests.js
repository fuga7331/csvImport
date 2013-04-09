function initTests(log){
	function test_regexUnion(){
		log(regexUnion([/1/, /2/g, /(3)/],"gi").toString() === "/(1)|(2)|((3))/gi");
	}

	function test_which1True(){
		log(which1True([null,false,undefined,""]) === 3 &&
					which1True([null,false,undefined,0]) === 3 &&
					which1True([null,false,undefined,2]) === 3 &&
					which1True([null,false,undefined]) === false);
	}
	function test_translateFirst(){
		log(translateFirst([null,0,undefined],["int", "char", "just a string"]) === "char" &&
					translateFirst([null,undefined,undefined,1],["int", "char", "just a string"]) === undefined &&
					translateFirst([1,0,undefined],["int", "char", "just a string"]) === "int" &&
					translateFirst([null,false,1,"sddasd",undefined],["int", "char", "just a string"]) === "just a string");
	}

	function test_parseCsv(){
		var a=',a,b,c\ncontentbg (1).gif,aa,"bb,",cc\ncontentbg (6).gif,11,""",""",33\nnp,eserj,"""",\n';
		//log(JSON.stringify(parseCsv(a)).replace(/\s/g, ""));
		log(JSON.stringify(parseCsv(a)).replace(/\s/g, "") ===
			(	'['+
				'["",                 "a",      "b",   "c"],'+
			'["contentbg (1).gif", "aa",    "bb,", "cc"],'+
			'["contentbg (6).gif", "11",    "\\",\\"", "33"],'+
			'["np",                "eserj", "\\"",    ""]'+
			']').replace(/\s/g,"")
		
		);

	}
	return {
		test_regexUnion: test_regexUnion,
		test_which1True: test_which1True,
		test_translateFirst: test_translateFirst,
		test_parseCsv: test_parseCsv
	};
}
/*
csvStr=',a,b,c\ncontentbg (1).gif,aa,"bb,",cc\ncontentbg (6).gif,11,""",""",33\nnp,eserj,"""",\n';
plain = /[^,"\n]+/;
quoted = /"(?:[^"]|"")*"/;
dataDelimiter = /,/;
rowDelimiter = /\n/;
tokens = tokenizeByArray(csvStr, [plain, quoted, dataDelimiter, rowDelimiter], ["plain","quoted","dataDelim","rowDelim"]);
*/
/*
function testAll(){
	log("testing which1True ...\n");
	test_which1True();
	log("testing translateFirst ...\n");
	test_translateFirst();
}
*/