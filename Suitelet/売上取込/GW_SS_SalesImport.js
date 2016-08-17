/**
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       15 July 2016     Principal
 *
 */
 function salesImportGW(request, response){
   try{
     // GET
     if (request.getMethod() == 'GET'){

         // フォーム定義
         var form = nlapiCreateForm('売上取込');
         form.setScript('customscript_gw_cs_salesimport');
         form.addSubmitButton('アップロード');

         // ファイル種別
         var fileType = form.addField('file_type', 'select', 'ファイル種別', 'customlist_gw_salesclass');
         fileType.setMandatory(true);
         fileType.setDefaultValue(1);
         // CSV選択
         var csvFile = form.addField('csv_file_path', 'file', '売上データ');
         csvFile.setLayoutType('outsidebelow', 'startrow');
         csvFile.setMandatory(true);

         response.writePage(form);
     }
     // POST
     else if (request.getMethod() == 'POST') {

        var ctx = nlapiGetContext();
         var fileType = request.getParameter('file_type');
         var stCSVFile = request.getFile('csv_file_path');

         var headParam = {};
         headParam['filename'] = stCSVFile.name;
         headParam['date'] = getNowDateJP();
         headParam['user'] = ctx.getUser();

         var stFiletype = stCSVFile.getType();
         if(stCSVFile != '' && stFiletype == 'CSV'){
            var recId = null;
            stCSVFile.setEncoding('SHIFT_JIS');
            var arrData = CSVToArray(stCSVFile.getValue(),',');
            recId = createCustomRecordHead(headParam, arrData, fileType);

          // redirect to created costome recode
            // var urlRecord = nlapiResolveURL('RECORD', 'customrecord_gw_paymentacquisitionh', recId);
            nlapiSetRedirectURL('RECORD', 'customrecord_gw_salesacquisitionh', recId);


            var next = false;
         }
       }
   }
   catch(exception){
       nlapiLogExecution('ERROR','salesImportGW',exception);
   }
 }


 function createCustomRecordHead(headParam, arrData, fileType){
   var rec = nlapiCreateRecord('customrecord_gw_salesacquisitionh');
   rec.setFieldValue('name', 'H0004');
   rec.setFieldValue('custrecord_gw_salesacqhead_acqfilename', headParam['filename']);
   rec.setFieldValue('custrecord_gw_salesacqhead_acqdate', headParam['date']);
   rec.setFieldValue('custrecord_gw_salesacqhead_managestaff', headParam['user']);

   recHeadId = nlapiSubmitRecord(rec);

    // detail
    var recDetail = nlapiCreateRecord('customrecord_gw_salesacquisitiond');
    recDetail.setFieldValue('name', 'SID90004');
    recDetail.setFieldValue('custrecord_gw_salesacqdeta_salesacqhead', recHeadId);
    recDetailId = nlapiSubmitRecord(recDetail);


   // for (var i = 1; i < arrData.length - 1; i++) {

   //   rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_payclass', i, fileType);
   //   rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_abstract', i, arrData[i][3]);
   //   rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_paymentdate', i, translateToDate(arrData[i][1]));
   //   rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_paymentname', i, arrData[i][4]);
   //   rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_paymentamount', i, arrData[i][9]);
   //   rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_bankname', i, arrData[i][5]);
   //   rec.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_branchname', i, arrData[i][6]);
   // }
   // return nlapiSubmitRecord(rec);
   return recHeadId;
 }
