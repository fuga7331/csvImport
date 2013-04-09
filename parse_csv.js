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