/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       05 Jul 2016     todate
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */
function clientPageInitGW(type){
   
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @returns {Boolean} True to continue save, false to abort save
 */
function clientSaveRecordGW(){

    return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @param {Number} linenum Optional line item number, starts from 1
 * @returns {Boolean} True to continue changing field value, false to abort value change
 */
function clientValidateFieldGW(type, name, linenum){
   
    return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @param {Number} linenum Optional line item number, starts from 1
 * @returns {Void}
 */
function clientFieldChangedGW(type, name, linenum){
	if (name == 'custrecord_gw_residentcard_app_customer') {
		var stCustomer = nlapiGetFieldValue('custrecord_gw_residentcard_app_customer');
		if(stCustomer!=''){
			var customerRec=nlapiLoadRecord('customer', stCustomer);
			nlapiSetFieldValue('custrecord_gw_residentcard_app_cust_name',customerRec.getFieldValue('lastname') + ' ' + customerRec.getFieldValue('firstname'));
			var addressCount=customerRec.getLineItemCount('addressbook');
			var address='';
			for ( var i = 1; i < addressCount+1; i++) {
	    		var billFlag=customerRec.getLineItemValue('addressbook', 'defaultbilling', i);
	    		if(billFlag=='T'){
	    			address='§'+ customerRec.getLineItemValue('addressbook', 'zip', i) + '\n' +
	    			customerRec.getLineItemValue('addressbook', 'state', i) + ' ' +
	    			customerRec.getLineItemValue('addressbook', 'city', i) + ' ' +
	    			customerRec.getLineItemValue('addressbook', 'addr1', i) + ' ' +
	    			customerRec.getLineItemValue('addressbook', 'addr2', i)
	    			break;
	    		}
	    	}
			nlapiSetFieldValue('custrecord_gw_residentcard_app_cust_add',address);	
		}else{
			nlapiSetFieldValue('custrecord_gw_residentcard_app_cust_name','');
			nlapiSetFieldValue('custrecord_gw_residentcard_app_cust_add','');			
		}	
	}
}
