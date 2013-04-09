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

function tokenizeByArray(str, regexArr, tokenTypes){
	var result = [],
		regex = regexUnion(regexArr,"g"),
		tmp;
	while(tmp = regex.exec(str)){
		result = result.concat([[translateFirst(tmp.slice(1),tokenTypes), tmp[0]]]);
	}
	return result;
}