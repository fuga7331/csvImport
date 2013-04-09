function allInArray(arr,pred) {
	var i = 0;
	for(i=0;i < arr.length  && pred(arr[i]) ; i++);
	return i === arr.length;
};


function objectFromKeyValue(key, value){
	var result = {};
	result[key] = value;
	return result;
}

function trueValue(val){
	return val !== undefined &&
		   val !== null &&
		   val !== false;

}
function which1True(arr){
	var i=0;
	for(i=0; i<arr.length; i+=1){
		if(trueValue(arr[i])){
			return i;
		}
	}
	return false;
}

function translateFirst(parenthesizedSubMatches, tokenTypes){
	var tokenTypeIndex	= which1True(parenthesizedSubMatches);
	return trueValue(tokenTypeIndex) ? tokenTypes[tokenTypeIndex] : false;
}

function matchExact(str,r,regexType) {
   var match = str.match(new RegExp(r,regexType));
   return match != null && str == match[0];
}

function regexUnion(regexArr, regexOptions){
	return new RegExp($(regexArr).
						map(function () {return "(" + this.toString().substring(1).replace(/\/\w*$/,"") + ")";}).
						toArray().
						join("|"),
					  regexOptions);
}

//TODO
function tokenizeByArray(str, regexArr, tokenTypes){
	var result = [],
		regex = regexUnion(regexArr,"g"),
		tmp;
	while(tmp = regex.exec(str)){
		result = result.concat([[translateFirst(tmp.slice(1),tokenTypes), tmp[0]]]);
	}
	return result;
}

function parseCsv(csvStr){
	var plain = /[^,"\n]+/,
		quoted = /"(?:[^"]|"")*"/,
		dataDelimiter = /,/,
		rowDelimiter = /\n/,
		tokens = tokenizeByArray(csvStr, [plain, quoted, dataDelimiter, rowDelimiter], ["plain","quoted","dataDelim","rowDelim"]),
		rows = [],
		curRow = [],
		curData = "";
	allInArray(tokens, function (e) {
		var tokenType = e[0],
			token = e[1];
		switch(tokenType){
			case "plain":
				curData = curData.concat(token);
				return true;
			case "quoted":
				curData = curData.concat(token.substring(1,token.length - 1).replace(new RegExp('""','g'),'"'));
				//console.log(token.substring(1,token.length - 1).replace(new RegExp('""','g'),'"'));
				return true;
			case "dataDelim":
				curRow = curRow.concat(curData);
				curData = "";
				return true;
			case "rowDelim":
				curRow = curRow.concat(curData);
				rows = rows.concat([curRow]);
				curRow = [];
				curData = "";
				return true;
			case "default":
				return false;
		}
	});
	return rows;
}




















function test_regexUnion(){
	console.log(regexUnion([/1/, /2/g, /(3)/]).toString() === "(1)|(2)|((3))");
}

function test_which1True(){
	console.log(which1True([null,false,undefined,""]) === 3 &&
				which1True([null,false,undefined,0]) === 3 &&
				which1True([null,false,undefined,2]) === 3 &&
				which1True([null,false,undefined]) === false);
}
function test_translateFirst(){
	console.log(translateFirst([null,0,undefined],["int", "char", "just a string"]) === "char" &&
				translateFirst([null,undefined,undefined,1],["int", "char", "just a string"]) === undefined &&
				translateFirst([1,0,undefined],["int", "char", "just a string"]) === "int" &&
				translateFirst([null,false,1,"sddasd",undefined],["int", "char", "just a string"]) === "just a string");
}

function test_parseCsv(){
	var a=',a,b,c\ncontentbg (1).gif,aa,"bb,",cc\ncontentbg (6).gif,11,""",""",33\nnp,eserj,"""",\n';
	console.log(JSON.stringify(parseCsv(a)).replace(/\s/g, ""));
	console.log(JSON.stringify(parseCsv(a)).replace(/\s/g, "") ===
		(	'['+
			'["",                 "a",      "b",   "c"],'+
		'["contentbg (1).gif", "aa",    "bb,", "cc"],'+
		'["contentbg (6).gif", "11",    "\\",\\"", "33"],'+
		'["np",                "eserj", "\\"",    ""]'+
		']').replace(/\s/g,"")
	
	);

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
	console.log("testing which1True ...\n");
	test_which1True();
	console.log("testing translateFirst ...\n");
	test_translateFirst();
}
*/