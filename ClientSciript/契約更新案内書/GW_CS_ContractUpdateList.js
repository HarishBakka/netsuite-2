/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       21 Jul 2016     duc
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */
function clientPageInit(type){
   
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @returns {Boolean} True to continue save, false to abort save
 */
function clientSaveRecord(){

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
function clientValidateField(type, name, linenum){
   
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
function clientFieldChanged(type, name, linenum){
 
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 * 
 * @param {String} type Sublist internal id
 * @param {String} name Field internal id
 * @returns {Void}
 */
function clientPostSourcing(type, name) {
   
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @returns {Void}
 */
function clientLineInit(type) {
     
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @returns {Boolean} True to save line item, false to abort save
 */
function clientValidateLine(type){
 
    return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @returns {Void}
 */
function clientRecalc(type){
 
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @returns {Boolean} True to continue line item insert, false to abort insert
 */
function clientValidateInsert(type){
  
    return true;
}

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType
 *   
 * @param {String} type Sublist internal id
 * @returns {Boolean} True to continue line item delete, false to abort delete
 */
function clientValidateDelete(type){
   
    return true;
}

function btnSearchButton() {
	var contract_date_from = nlapiGetFieldValue('date_from_field');
	var contract_date_to = nlapiGetFieldValue('date_to_field');
	
	if(contract_date_from=="")
		{
		alert('å_ñÒì˙FromÇ…ãLì¸Ç≠ÇæÇ≥Ç¢ÅB');
		return false;
		}
	if(contract_date_to=="")
		{
		alert('å_ñÒì˙ToÇ…ãLì¸Ç≠ÇæÇ≥Ç¢ÅB');
		return false;
		}
	var theLink = nlapiResolveURL('SUITELET', 'customscript_gw_ss_contractupdatelist', 'customdeploy_gw_ss_contractupdatelist');
	theLink = theLink + '&contract_date_from=' + contract_date_from + '&contract_date_to=' + contract_date_to;
	document.location.href = theLink;
	return;
}

function btnPrintButton() {
	var sublistid= new Array();
	var j=0;
	var itemCount=nlapiGetLineItemCount('billing_sub_list');
	var theLink = nlapiResolveURL('SUITELET', 'customscript_gw_contractupdateprintall', 'customdeploy_gw_contractupdateprintall');
	for ( var i = 1; i <= itemCount; i++) {
  	  if(nlapiGetLineItemValue('billing_sub_list','sub_list_check',i) == 'T'){  
  	  	sublistid[j] = nlapiGetLineItemValue('billing_sub_list','sub_list_id',i);
  	  	j++;
  	  }
    }
	if(j==0)
	{
		alert('çiÇËçûÇ›èåèÇ1Ç¬à»è„ê›íËÇµÇƒÇ≠ÇæÇ≥Ç¢ÅB');
		return false;
	}
	url = theLink + '&listid='+sublistid;
	  open(url);
    return;
}