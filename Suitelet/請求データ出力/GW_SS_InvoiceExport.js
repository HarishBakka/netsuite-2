/**
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       10 Aug 2016     tohai
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function invoiceExport(request, response){
	 try{
	      // GET
	      if (request.getMethod() == 'GET'){
	        var invoiceExportForm = nlapiCreateForm("請求データ出力");
	        invoiceExportForm.setScript('customscript_gw_cs_invoiceexport');
	        invoiceExportForm.addSubmitButton("データ出力");
	        var invoiceExportSelect = invoiceExportForm.addField('contactname_record_field','select', '依頼先');
	        invoiceExportSelect.addSelectOption('','');
	        var col = new Array();
//	        col[0] = new nlobjSearchColumn('custrecord_gw_payment_bank_type_checkcd');
	        col[0] = new nlobjSearchColumn('name');
	        var result = nlapiSearchRecord('customlist_gw_contactname',null,null,col);
	        if(result!==null){
	         invoiceExportSelect.addSelectOption(0, '0:パルマ');

	          for (var i = 0; i < result.length; i++) {
	            invoiceExportSelect.addSelectOption(result[i].getId(), result[i].getValue('name'));
	              }
	        }
// test git 2
	        response.writePage(invoiceExportForm);
	      }
      // post
      else if (request.getMethod() == 'POST') {
    	var invoiceExportForm = nlapiCreateForm("請求データ出力");
        var date = new Date();
        var url;
        time = getNowDateJPForName(date);
        var param = {};
        param['contactname_record_field'] = request.getParameter("contactname_record_field");
        var results;
        results = getList(param);
        if(results !== null || results !==''){
        	/*var content_file = print_txt(results);
        	var name = time + '_請求データ.dat';
        	var name_folder = time + '_請求データ';
        	var txt_file = nlapiCreateFile(name, 'PLAINTEXT', content_file);
        	var folder = nlapiCreateRecord('folder');
        	if (folder) {
        		folder.setFieldValue('parent', 1364); // create root level folder
        		folder.setFieldValue('name', name_folder);
        		var folderId = nlapiSubmitRecord(folder);
        	}
        txt_file.setFolder(folderId);
        var txtFileId = nlapiSubmitFile(txt_file);*/

        //url = "https://system.sandbox.netsuite.com/core/media/media.nl?id="+txtFileId+"&c=4141596&h=1ab83ed5a9a761230347&_xd=T&_xt=.txt";
        //nlapiSetRedirectURL('mediaitem', txtFileId, 'view');
        //nlapiSetRedirectURL("EXTERNAL", file_url);

        //

        /*var file = nlapiLoadFile(txtFileId);
        //var url = request.getHeader("Host");
        url = file.getURL();
        url = url.substring(0,url.length-9);
        url +="&_xd=T&_xt=.txt";*/
        } else{ }
        /*var textField = invoiceExportForm.addField("test", "text", "url");
        textField.setDefaultValue(request.getParameter("contactname_record_field"));*/
        /*var downloadButton = invoiceExportForm.addButton("download_button", "ダウンロード ", 'document.location=' + "'" + url + "'");*/
        response.writePage(invoiceExportForm);
      }
    }
    catch(e){
      nlapiLogExecution('ERROR','invoiceExport',e);
    }
}

function print_txt(results){
  var tab = "\t";
  var content = "ID"+tab+"tranid"+tab+"name"+tab+"entity"+tab+"type"+tab+
      "account"+tab+"postingperiod"+tab+"taxperiod"+tab+"amount"+tab+"trandate"+"\r\n";
  for ( var i = 0; i < Math.min(50, results.length); i++){
    record = results[i];
    trandate = record.getValue('trandate');
    postingperiod = record.getText('postingperiod');
    taxperiod = record.getText('taxperiod');
    type = record.getText('type');
    tranid = record.getValue('tranid');
    entity= record.getText('entity');
    name = record.getText('name');
    account = record.getText('account');
    amount= record.getValue('amount');
    if(trandate == null || trandate == '') trandate = "nill";
    if(postingperiod == null || postingperiod == '') postingperiod = "nill";
    if(taxperiod == null || taxperiod == '') taxperiod = "nill";
    if(type == null || type == '') type = "nill";
    if(tranid == null || tranid == '') tranid = "nill";
    if(entity == null || entity == '') entity = "nill";
    if(name == null || name == '') name = "nill";
    if(account == null || account == '') account = "nill";
    if(amount == null || amount == '') amount = "nill";
    content = content + record.getId() +tab+tranid+tab+name+tab+entity+tab+type+tab+
      account+tab+postingperiod+tab+taxperiod+tab+amount+tab+trandate+"\r\n";
  }
  return content;
}
function getList(param){
	var filters = new Array();
	var i = 0;
	var col = new Array();
	  	col[0] = new nlobjSearchColumn('trandate');
	if(param['contactname_record_field'] !== '' && param['payment_type_field'] !== null){
	  		filters[i] = new nlobjSearchFilter('custentity_gw_payeename', 'entity', 'is', param['contactname_record_field'] );
	  		i++;
	  	}

	  if (i == 0) return null;

	  var result =   nlapiSearchRecord('transaction', 'customsearch_gw_payment_list', filters,col);

	  if(result == undefined) result = null;
	  return result;
	}
