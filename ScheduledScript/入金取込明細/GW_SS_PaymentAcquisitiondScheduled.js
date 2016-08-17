/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       15 Jul 2016     todate
 *
 */

/**j
 * @param {String} type Context Types: scheduled, ondemand, userinterface, aborted, skipped
 * @returns {Void}
 */
function updatePaymentdGW(type) {
	var filters = [new nlobjSearchFilter('custrecord_gw_salesacqdeta_created', null, 'is', 'F')];
	var columns = [new nlobjSearchColumn('internalid').setSort()]; 
	var results = nlapiSearchRecord('customrecord_gw_paymentacquisitiond',null,filters,columns);
    if (results != null) {
    	for ( var i = 0; i < results.length; i++) {
    		var id=results[i].getId();
    		var rec=nlapiLoadRecord('customrecord_gw_paymentacquisitiond', id);
    		var customerId=rec.getFieldValue('custrecord_gw_payacqdate_ifcustomer_id');
    		var gmoId=rec.getFieldValue('custrecord_gw_payacqdate_gmo_id');
    		var customerInternalid = getDammycustomer();
    		var amount=rec.getFieldValue('custrecord_gw_payacqdate_paymentamount');
    		var paymentDate=rec.getFieldValue('custrecord_gw_payacqdate_paymentdate');
    		customerInternalid=getCustomer(gmoId,customerId,customerInternalid);
		    
		    
		    var resultCode=rec.getFieldValue('custrecord_gw_salesacqdeta_resultcode');
		    if(resultCode==1){
		    	var paymentDate=rec.getFieldValue('custrecord_gw_payacqdate_paymentdate');
			    var recPayment=	nlapiCreateRecord('customerpayment');
				recPayment.setFieldValue('customer', customerInternalid);				
				recPayment.setFieldValue('payment', amount);				
				recPayment.setFieldValue('trandate', paymentDate);
				var recPaymentId=nlapiSubmitRecord(recPayment);
				rec.setFieldValue('custrecord_gw_salesacqdeta_status', 2);
				
				var recCreatedPayment=nlapiLoadRecord('customerpayment', recPaymentId);
				var payment=recCreatedPayment.getFieldValue('payment');
				var itemPaymentCount=recCreatedPayment.getLineItemCount('apply');
				for ( var j = 1; j < itemPaymentCount+1; j++) {
					var lineAmount=recCreatedPayment.getLineItemValue('apply', 'total', j);
					if(payment==lineAmount){
						recCreatedPayment.setLineItemValue('apply', 'apply', j, 'T');	
						recCreatedPayment.setFieldValue('account', 3);
						nlapiSubmitRecord(recCreatedPayment);
						rec.setFieldValue('custrecord_gw_salesacqdeta_status', 3);
						break;
					}	
				}
				rec.setFieldValue('custrecord_gw_salesacqdeta_paymentrec', recPaymentId);
		    }else{
		    	rec.setFieldValue('custrecord_gw_salesacqdeta_status', 4);
		    }
			
		    rec.setFieldValue('custrecord_gw_payacqdate_customer', customerInternalid);
		    rec.setFieldValue('custrecord_gw_salesacqdeta_created', 'T');
    		nlapiSubmitRecord(rec);
    		var que=nlapiScheduleScript('customscript_gw_ss_paymentdsche', 'customdeploy_gw_ss_paymentdsche');
    		nlapiLogExecution('DEBUG','que',que);
    		return;
    	}
    }	 
    
}

//function getDammycustomer(){
//	var columns = [new nlobjSearchColumn('name')];
//	var results = nlapiSearchRecord('customlist_gw_dammy_customer', null, null, columns);
//	if(results!=null){
//		return results[0].getValue('name');	    		
//	}
//	return ''; 
//}

function getCustomer(gmoId,customerId,customerInternalid){
	var filters = null;
	var results = null;
	if(gmoId!=null){
    	filters = [new nlobjSearchFilter('custentity_gw_gmoid', null, 'is', gmoId)];
    	results = nlapiSearchRecord('customer', null, filters, null);
    	if(results!=null){
    		customerInternalid=results[0].getId();		    	
    	}    
    }else{
    	filters = [new nlobjSearchFilter('entityid', null, 'is', customerId)];
    	results = nlapiSearchRecord('customer', null, filters, null);
    	if(results!=null){
    		customerInternalid=results[0].getId();		    	
    	}    
    }	
	return customerInternalid; 
}


