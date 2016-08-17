/**
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       12 Jul 2016     todate
 *
 */

/**
 * [dateFormat yyyy年mm月dd日]
 * @param  {[type]} date [yyyy/mm/dd]
 * @return {[type]}      [description]
 */
function dateFormat(strDate){
  if (strDate == null) return '';
  var arrData = strDate.split('/');
  if (arrData.length == 3){
    return arrData[0] + '年' + arrData[1] + '月' + arrData[2] + '日'
  }
  return date;
}
function stringToDate(strDate){
	  if (strDate == null) return null;
	  var arrData = strDate.split('/');
	  if (arrData.length == 3){
	    return new Date(arrData[0], arrData[1]-1, arrData[2]);
	  }
	  return null;
}
function getDiffMonth(strDate1, strDate2) {
	var d1 = stringToDate(strDate1);
	var d2 = stringToDate(strDate2);
	if(d1 !== null && d2 !== null){
		var months;
	    months = (d2.getFullYear() - d1.getFullYear()) * 12;
	    months -= d1.getMonth() + 1;
	    months += d2.getMonth();
	    if(d2.getDate() >= d1.getDate())
	    	months += 1;
	    return months <= 0 ? 0 : months;
	}
    return null;
}
function convertBigKana(kanaVal){
	 var smallKana = Array('ァ','ィ','ゥ','ェ','ォ','ャ','ュ','ョ','ッ','‐','-','－','―','ビ','・','ズ');
	 var bigKana = Array('ア','イ','ウ','エ','オ','ヤ','ユ','ヨ','ツ','ー','ー','ー','ー','ヴィ','','ヅ');
   var ckanaVal = '';
   for (var i = 0; i < kanaVal.length; i++){
       var index = smallKana.indexOf(kanaVal.charAt(i)); //indexOf and stri[i] don't work on ie
       //var index = jQuery.inArray(kanaVal.charAt(i), smallKana);
       if (index !== -1) {
           ckanaVal+= bigKana[index];
       }
       else
       {
           ckanaVal+= kanaVal.charAt(i);
       }
   }
   return ckanaVal;
}
function getDiffMonthWithDate(d1, d2) {

	var months;
	months = (d2.getFullYear() - d1.getFullYear()) * 12;
	months -= d1.getMonth() + 1;
	months += d2.getMonth();
	if(d2.getDate() >= d1.getDate())
		months += 1;
	return months <= 0 ? 0 : months;


}

/**
 * [DateNow return today yyyy年mm月dd日 date]
 */
function DateNow(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    today = yyyy+'年'+mm+'月'+dd+'日'; // change the format depending on the date format preferences set on your account
    return today;
}

function getNowDateJP(){
	var stNow = new Date();
 	stNow.setMilliseconds((3600000*9));
 	var stYear =stNow.getUTCFullYear();
 	var stMonth =stNow.getUTCMonth();
 	var stDate =stNow.getUTCDate();
 	stNow=new Date(stYear,stMonth,stDate);
 	var stNowDate=nlapiDateToString(stNow,'date');
	return stNowDate;
}

/**
 * [translateToDate convert to japan data format]
 * @param  {[string]} stringDate [2016.6.12 format]
 * @return {[type]}            [description]
 */
function translateToDate(stringDate){
  if (stringDate.length < 8 ) return '';

  var arrDateData = stringDate.split('.');
  return arrDateData[0] + '年' + arrDateData[1] + '月' + arrDateData[2] + '日';
}

/**
 * [stringToXMLTag return a string with new line \r\n with html tag <br />]
 * @param  {[string]} stringInput [string have \r\n as new line]
 * @return {[type]}             [description]
 */
function stringToXMLTag(stringInput){
  var arrData = stringInput.replace(new RegExp('\r?\n','g'), '<br />');
  return arrData;
}

function getDammycustomer(){
	var filters = [new nlobjSearchFilter('custentity_gw_dammy_customer_flg', null, 'is', 'T')];
	var results = nlapiSearchRecord('customer', null, filters);
	if(results!=null){
		return results[0].getId();
	}
	return '';
}


function CSVToArray( strData, strDelimiter ){
// Check to see if the delimiter is defined. If not,
// then default to comma.
strDelimiter = (strDelimiter || ",");

// Create a regular expression to parse the CSV values.
var objPattern = new RegExp(
  (
      // Delimiters.
      "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

      // Quoted fields.
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

      // Standard fields.
      "([^\"\\" + strDelimiter + "\\r\\n]*))"
  ),
  "gi"
  );


// Create an array to hold our data. Give the array
// a default empty first row.
var arrData = [[]];

// Create an array to hold our individual pattern
// matching groups.
var arrMatches = null;


// Keep looping over the regular expression matches
// until we can no longer find a match.
while (arrMatches = objPattern.exec( strData )){

  // Get the delimiter that was found.
  var strMatchedDelimiter = arrMatches[ 1 ];

  // Check to see if the given delimiter has a length
  // (is not the start of string) and if it matches
  // field delimiter. If id does not, then we know
  // that this delimiter is a row delimiter.
  if (
      strMatchedDelimiter.length &&
      strMatchedDelimiter !== strDelimiter
      ){

      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrData.push( [] );

  }

  var strMatchedValue;

  // Now that we have our delimiter out of the way,
  // let's check to see which kind of value we
  // captured (quoted or unquoted).
  if (arrMatches[ 2 ]){

      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      strMatchedValue = arrMatches[ 2 ].replace(
          new RegExp( "\"\"", "g" ),
          "\""
          );

  } else {

      // We found a non-quoted value.
      strMatchedValue = arrMatches[ 3 ];

  }


  // Now that we have our value string, let's add
  // it to the data array.
  arrData[ arrData.length - 1 ].push( strMatchedValue );
}

// Return the parsed data.
return( arrData );
}


/////
function checkSymmetry(str){
	   var strSym1 = str.slice(0,str.length/2);
	   var strSym2 = str.slice(str.length/2,str.length);
	   if (strSym1==strSym2) {
	    return true;
	   } else {
	    return false;
	   }
	  }

function getHaft(str){
	var strHaft = str.slice(0,str.length/2);
	return strHaft;
}

function create2DimensionalArray(row){
	var arr = [];
	for (var i = 0; i < row; i++) {
		arr[i] = new Array();
	}
	return arr;
}

function sliceDataToArray(arrData){
	var st1 = " ";
	var temp = 0;
	var data = create2DimensionalArray(arrData.length-2);
	for (var i = 1; i < arrData.length-1; i++) {
		var lineData = arrData[i];
		var temp2 = 0;
		for (var j = 0; j < lineData.length;j++) {
			if(isNaN(lineData[j]) == false && lineData[j]!=st1){ //if lineData[j] is number
				if (j==0) {
					var start = 0;
				}else{
					if (isNaN(lineData[j-1]) == true || lineData[j-1] == st1) {
						start = j;
					}
				}
				if (isNaN(lineData[j+1]) == true || lineData[j+1] == st1) {
					end = j;
					str = lineData.slice(start,end+1);
					if (checkSymmetry(str)) { //
						data[temp][temp2] = getHaft(str);
						data[temp][temp2+1] = "";
						temp2+=2;
					}else{
						data[temp][temp2] = str;
						temp2+=1;
					}
				}

			}else{
				if(isNaN(lineData[j]) == true){ //if lineData[j] is word not space
					if (j==0) {
						var start = 0;
					} else {
						if(isNaN(lineData[j-1]) == false && isNaN(lineData[j-2]) == false){
							start = j;
						}
					}
					if (isNaN(lineData[j+1]) == false && isNaN(lineData[j+2]) == false) {
						end = j;
						data[temp][temp2] = lineData.slice(start,end+1);
						temp2+=1;
					}
				}
			}
		}
		temp+=1;
	}
	return data;
}

function getNowDateJPForName(stringDate){
  stringDate.setMilliseconds((3600000*9));
  var stYear =changeStringForName(stringDate.getUTCFullYear());
  var stMonth =changeStringForName(stringDate.getUTCMonth()+1);
  var stDate =changeStringForName(stringDate.getUTCDate());
  var stHour = changeStringForName(stringDate.getUTCHours());
  var stMinute = changeStringForName(stringDate.getUTCMinutes());
  var stSecond = changeStringForName(stringDate.getUTCSeconds());
  return date = stYear+stMonth+stDate+stHour+stMinute+stSecond;
}

function changeStringForName(number){
  if(number < 10){
    return "0"+number;
  }
  else return number.toString();
}
