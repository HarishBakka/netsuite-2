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
 * @param {String} type Operation types: create, edit, view, copy, print, email
 * @param {nlobjForm} form Current form
 * @param {nlobjRequest} request Request object
 * @returns {Void}
 */
function userEventBeforeLoadGW(type, form, request){
	var currentContext = nlapiGetContext();
    if(type == 'view' && currentContext.getExecutionContext() == 'userinterface'){
      var param = '&tranid=' + nlapiGetRecordId();
      var url = nlapiResolveURL('SUITELET', 'customscript_gw_ss_residentcardapp_print', 'customdeploy_gw_ss_residentcardapp_print') + param;
      form.addButton('custpage_printout', 'àÛç¸', "window.open('"+ url +"');");
      
//      form.addButton('custpage_printout', 'àÛç¸', "<a href='"+ url +"'>here</a>");
      
    }
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Operation types: create, edit, delete, xedit
 *                      approve, reject, cancel (SO, ER, Time Bill, PO & RMA only)
 *                      pack, ship (IF)
 *                      markcomplete (Call, Task)
 *                      reassign (Case)
 *                      editforecast (Opp, Estimate)
 * @returns {Void}
 */
function userEventBeforeSubmitGW(type){
 
}

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
  
}
