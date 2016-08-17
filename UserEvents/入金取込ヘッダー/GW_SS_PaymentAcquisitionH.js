/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       12 Jul 2016     todate
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit,
 *                      approve, cancel, reject (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF only)
 *                      dropship, specialorder, orderitems (PO only) 
 *                      paybills (vendor payments)
 * @returns {Void}
 */
function userEventAfterSubmitGW(type){
	var checkCreated=nlapiGetFieldValue('custrecord_gw_payacqhead_decision');
	if(type=='edit' && checkCreated=='T'){
		var recH=nlapiLoadRecord('customrecord_gw_paymentacquisitionh', nlapiGetRecordId());
		recH.setFieldValue('custrecord_gw_payacqhead_decisiondate', getNowDateJP());
		nlapiSubmitRecord(recH);
		nlapiScheduleScript('customscript_gw_ss_paymentdsche', 'customdeploy_gw_ss_paymentdsche');

//		var recH=nlapiLoadRecord('customrecord_gw_paymentacquisitionh', nlapiGetRecordId());
//		var itemCount=recH.getLineItemCount('recmachcustrecord_gw_payacqdate_payacqhead');
//		for ( var i = 1; i < itemCount+1; i++) {
//			var customerId=recH.getLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_customer', i);
//			var amount=recH.getLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_paymentamount', i);
//			var paymentDate=recH.getLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_payacqdate_paymentdate', i);
//			if(customerId!=''){
//				var recPayment=	nlapiCreateRecord('customerpayment');
//				recPayment.setFieldValue('customer', customerId);				
//				recPayment.setFieldValue('payment', amount);				
//				recPayment.setFieldValue('trandate', paymentDate);
//				var recId=nlapiSubmitRecord(recPayment);
//				var recPayment=nlapiLoadRecord('customerpayment', recId);
//				var payment=recPayment.getFieldValue('payment');
//				var itemPaymentCount=recPayment.getLineItemCount('apply');
//				for ( var j = 1; j < itemPaymentCount+1; j++) {
//					var lineAmount=recPayment.getLineItemValue('apply', 'total', j);
//					if(payment==lineAmount){
//						recPayment.setLineItemValue('apply', 'apply', 2, 'T');	
//						recPayment.setFieldValue('account', 3);
//						nlapiSubmitRecord(recPayment);
//						break;
//					}	
//				}
//				
//				
//				recH.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_salesacqdeta_paymentrec', i, recId);
//				recH.setLineItemValue('recmachcustrecord_gw_payacqdate_payacqhead', 'custrecord_gw_salesacqdeta_created', i, 'T');				
//				
//			}
//		}	
//		recH.setFieldValue('custrecord_gw_payacqhead_decisiondate', getNowDateJP());
//		nlapiSubmitRecord(recH);		
	}
	
}


/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord 
 *   
 * @param {String} type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm} form Current form
 * @param {nlobjRequest} request Request object
 * @returns {Void}
 */
function userEventBeforeLoadGW(type, form, request){
//	var ctx = nlapiGetContext();
//	ctx.setSessionObject(nlapiGetRecordId(),true);
	if(type=='view'){
		var recId=nlapiGetRecordId();
    	var urlRecord = nlapiResolveURL('RECORD', 'customrecord_gw_paymentacquisitionh',recId);
    	form.addButton('custpage_upbtn', 'Ä“Çž', 'document.location=' + "'" + urlRecord + "'");
	}
}

