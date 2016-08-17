/**
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       05 July 2016     Principal
 *
 */
var dammy_Customer=null;

function paymentImportGW(request, response){  
	try{
		// GET
		if (request.getMethod() == 'GET'){

	        // フォーム定義
	        var form = nlapiCreateForm('入金取込');
	        form.setScript('customscript_gw_cs_paymentimport');
	        form.addSubmitButton('アップロード');

	        // ファイル種別
	        var fileType = form.addField('file_type', 'select', 'ファイル種別');
	        fileType.setMandatory(true);
	        fileType.addSelectOption('','');
	        
	        var col = new Array();
	        col[0] = new nlobjSearchColumn('custrecord_gw_payment_bank_type_checkcd');
	        col[1] = new nlobjSearchColumn('name');   
	        var result = nlapiSearchRecord('customrecord_gw_payment_bank_type',null,null,col);
	        
	        if(result!==null){
	        	for (var i = 0; i < result.length; i++) {
	        		fileType.addSelectOption(result[i].getId(), result[i].getValue('name'));
	              }
	        }
	        
	        // CSV選択
	        var csvFile = form.addField('csv_file_path', 'file', '入金データ');
	        csvFile.setLayoutType('outsidebelow', 'startrow');
	        csvFile.setMandatory(true);

	        response.writePage(form);
	    }// POST
	    else if (request.getMethod() == 'POST') {	     
	    	var ctx = nlapiGetContext();
	        var fileType = request.getParameter('file_type');
	        var stInputFile = request.getFile('csv_file_path');
	        var orginalfilename=stInputFile.name;
	        var tempfilename='';
	        var stNow = new Date();
	      
	        tempfilename=stNow.getFullYear().toString() + stNow.getMonth().toString() + stNow.getDate().toString() + stNow.getHours().toString() + stNow.getMinutes().toString() + stNow.getSeconds().toString() + '.txt';
	        stInputFile.setName(tempfilename);
	        stInputFile.setFolder(248);
	        var fileId=nlapiSubmitFile(stInputFile);
	        stInputFile=nlapiLoadFile(fileId);
//	        dammy_Customer=getDammycustomer();
	        var headParam = {};
	        headParam['filename'] = orginalfilename;
	        headParam['date'] = getNowDateJP();
	        headParam['user'] = ctx.getUser();	        
	        if(stInputFile != ''){
	        	stInputFile.setEncoding('SHIFT_JIS');
	        	var recId=null;
	        	var checkcd;
	        	var resultSearch = nlapiLoadRecord('customrecord_gw_payment_bank_type', fileType);
        		if(resultSearch!==null){
        			checkcd = resultSearch.getFieldValue("custrecord_gw_payment_bank_type_checkcd");
        		}        		
	        	//GMOペイメントサービス
	  	  		if(fileType == '6'){
	      	  		var arrData = CSVToArray(stInputFile.getValue(),',');
	      	  		
	      	  		if (arrData[0][0]!== checkcd)
	      	  			throw createFormMessage(arrData[0][0]);
	      	        recId = createCustomRecordHeadCSV(headParam, arrData, fileType);
	  	  		}
	  	  		//Biz
	  	  		else if(fileType == '11'){
	      	  		var arrData = CSVToArray(stInputFile.getValue(),',');
	      	  		var stringAToH = '';
	      	  		for(var i = 0; i < 8; i++){
	      	  			stringAToH = stringAToH + arrData[0][i];
	      	  		}
	      	  		if (stringAToH!== checkcd)
	      	  			throw createFormMessage(stringAToH);
	      	        recId = createCustomRecordHeadBiz(headParam, arrData, fileType);
	  	  		}
	  	  		//1:株式会社セディナ
		  	  	//2:株式会社ジャックス
	  	  		//3:株式会社アプラス
	  	  		//4:三菱UFJファクター株式会社
	  	  		//5:全保連
	  	  		else if(fileType == '1' || fileType == '2' || fileType == '3' || fileType == '4' || fileType == '5'){  	  			
	      	  		var datavalue=stInputFile.getValue();
	      	  		var arrData=datavalue.split('\n');
	      	  		if(arrData[0].substr(0,54).trim()!== checkcd)
	      	  			throw createFormMessage(checkcd);
	      	  		recId = createCustomRecordHeadTXT(headParam, arrData, fileType);
	  	  		}
	  	  		nlapiDeleteFile(fileId);
	  	  		
	  	  		nlapiSetRedirectURL('RECORD', 'customrecord_gw_paymentacquisitionh', recId);
	  	        var next = false;       
	        }    
	        nlapiLogExecution('DEBUG','units',nlapiGetContext().getRemainingUsage());
	    }
  }
  catch(exception){
	     nlapiCreateError(exception,'エラーが発生しました。システム管理者に問い合わせてください。');
  }
}
/////////////////////////////
// private function
// /////////////////////////
function createFormMessage(message){
	var formPost = nlapiCreateForm('入金取込エラー');
	formPost.addField('custpage_message', 'label','ファイル種別に対する入金データの内容が正しくありません。');
    formPost.addButton('custpage_back', '戻る',"var theLink = nlapiResolveURL('SUITELET', 'customscript_gw_ss_paymentimport', 'customdeploy_gw_ss_paymentimport');document.location.href = theLink;");  
    response.writePage(formPost);
}


function createCustomRecordHeadTXT(headParam, arrData, fileType){
	var rec = nlapiCreateRecord('customrecord_gw_paymentacquisitionh');
	var importCount = 0;
	var amountAll = 0;
	rec.setFieldValue('custrecord_gw_payacqhead_acqfilename', headParam['filename']);
	rec.setFieldValue('custrecord_gw_payacqhead_acqdate', headParam['date']);
	rec.setFieldValue('custrecord_gw_payacqhead_managementstaff', headParam['user']);
	var paymentdate=headParam['date'].substr(0,4) + '/' + arrData[0].substr(54,2) + '/' + arrData[0].substr(56,2);
	for (var i = 1; i < arrData.length - 1; i++) {
		var lineData=arrData[i];
		var datatype = lineData.substr(0,1);
		if(datatype=='2'){
			var paymentname = lineData.substr(50,30);
			var amount = lineData.substr(80,10);
			var bankname = lineData.substr(5,15);
			var branchname = lineData.substr(23,15);
			var resultCode = lineData.substr(111,1);
			var customer=Number(lineData.substr(100,8)).toString();
		    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_payclass', i, fileType);
		    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_paymentdate', i, paymentdate);
		    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_paymentname', i, paymentname);
		    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_paymentamount', i, amount);
		    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_bankname', i, bankname);
		    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_branchname', i, branchname);
		    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_ifcustomer_id', i, customer);
		    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_salesacqdeta_resultcode', i, Number(resultCode)+1);
		    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_salesacqdeta_status', i, 1);
		    amountAll=amountAll+Number(amount);
		    importCount++;
		}			
	}
	rec.setFieldValue('custrecord_gw_payacqhead_import_count', importCount);
	rec.setFieldValue('custrecord_gw_payacqhead_amount_all', amountAll);
	return nlapiSubmitRecord(rec);
}

function createCustomRecordHeadCSV(headParam, arrData, fileType){	
	var rec = nlapiCreateRecord('customrecord_gw_paymentacquisitionh');
	var j=1;
	var importCount = 0;
	var amountAll = 0;
	rec.setFieldValue('custrecord_gw_payacqhead_acqfilename', headParam['filename']);
	rec.setFieldValue('custrecord_gw_payacqhead_acqdate', headParam['date']);
	rec.setFieldValue('custrecord_gw_payacqhead_managementstaff', headParam['user']);
	for (var i = 0; i < arrData.length-1; i++) {
		var paymentdate=arrData[i][4].substr(0,4) + '/' + arrData[i][4].substr(4,2) + '/' + arrData[i][4].substr(6,2);
		var gmoid=arrData[i][1];
		var customer=arrData[i][14];
		customer=Number(customer.substr(0,customer.length-3)).toString();
	    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_payclass', j, fileType);
	    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_paymentdate', j, paymentdate);
	    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_gmo_id', j, gmoid);
	    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_paymentamount', j, arrData[i][7]);
	    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_ifcustomer_id', j, customer);
	    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_salesacqdeta_resultcode', j, Number(arrData[i][3])+1);
	    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_salesacqdeta_status', j, 1);
	    amountAll=amountAll+Number(arrData[i][7]);
	    j++;
	    importCount++;
	}
	rec.setFieldValue('custrecord_gw_payacqhead_import_count', importCount);
	rec.setFieldValue('custrecord_gw_payacqhead_amount_all', amountAll);
	return nlapiSubmitRecord(rec);
}
function createCustomRecordHeadBiz(headParam, arrData, fileType){	
	var rec = nlapiCreateRecord('customrecord_gw_paymentacquisitionh');
	var j=1;
	var importCount = 0;
	var amountAll = 0;
	rec.setFieldValue('custrecord_gw_payacqhead_acqfilename', headParam['filename']);
	rec.setFieldValue('custrecord_gw_payacqhead_acqdate', headParam['date']);
	rec.setFieldValue('custrecord_gw_payacqhead_managementstaff', headParam['user']);
	for (var i = 0; i < arrData.length-1; i++) {
		if(arrData[i][0] == '2'){
			var str= arrData[i][1];
			var array = str.split(".");
			if(Number(array[1])<10) array[1] = "0" + array[1];
			if(Number(array[2])<10) array[2] = "0" + array[2];
			var paymentdate = array[0] + '/' + array[1] + '/' + array[2];
			rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_payclass', j, fileType);
		    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_paymentname', j, arrData[i][4]);
		    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_paymentdate', j, paymentdate);
		    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_bankname', j, arrData[i][5]);
		    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_branchname', j, arrData[i][6]);
		    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_paymentamount', j, arrData[i][9]);
		    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_salesacqdeta_resultcode', j, 11);
		    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_salesacqdeta_status', j, 1);
		    var customer_id = getCustomerID(arrData[i][4]);		    
		    rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_ifcustomer_id', j, customer_id);
		    amountAll=amountAll+Number(arrData[i][9]);
		    j++;
		    importCount++;
		}	
	}
	rec.setFieldValue('custrecord_gw_payacqhead_import_count', importCount);
	rec.setFieldValue('custrecord_gw_payacqhead_amount_all', amountAll);
	return nlapiSubmitRecord(rec);
}
function getCustomerID(arrData){
	var arrayNumber = Array('0','1','2','3','4','5','6','7','8','9','０','１','２','３','４','５','６','７','８','９');
	
	var startindex = arrayNumber.indexOf(arrData.charAt(0));
	var endindex = arrayNumber.indexOf(arrData.charAt(arrData.length - 1));
	var result = "";
	var result1 = "";
	if ( startindex !== -1){
	  for (var i = 0; i < arrData.length; i++){
	   var index = arrayNumber.indexOf(arrData.charAt(i));
	   if (index !== -1) {
	       result = result + arrData.charAt(i);
	   }else break;
	  }
	  return result;
	}else if (endindex !== -1){
	  result = "";
	  for (var i = arrData.length-1; i >=0; i--){
	   var index = arrayNumber.indexOf(arrData.charAt(i));
	   if (index !== -1) {
	       result = result + arrData.charAt(i);
	   }else break;
	  }
	  for (var i = result.length-1; i >=0; i--){
	   result1 = result1 + result.charAt(i);
	  }
	  return result1;
	}
	
}