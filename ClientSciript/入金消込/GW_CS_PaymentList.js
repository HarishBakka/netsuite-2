/**
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       20 Jul 2016     duc
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

function redirectToSearch(){
  // ************************************************************
  // Redirect to ifseft with parameters
  // ************************************************************

  var payment_type_field = nlapiGetFieldValue('payment_type_field');
  var payment_date_field = nlapiGetFieldValue('payment_date_field');
  var payment_name_field = nlapiGetFieldValue('payment_name_field');
  var bank_name_field = nlapiGetFieldValue('bank_name_field');
  var bank_branch_name_field = nlapiGetFieldValue('bank_branch_name_field');
  var apply_status_field = nlapiGetFieldValue('apply_status_field');

  var i = 0;
  if(payment_type_field !== null && payment_type_field !== ''){
    i++;
  }

  if(payment_date_field !== null && payment_date_field !== ''){
    i++;
  }

  if(payment_name_field !== null && payment_name_field !== ''){
    i++;
  }

  if(bank_name_field !== null && bank_name_field !== ''){
    i++;
  }

  if(bank_branch_name_field !== null && bank_branch_name_field !== ''){
    i++;
  }

  if(apply_status_field !== null && apply_status_field !== ''){
    i++;
  }

  if (i==0){
    alert('çiÇËçûÇ›èåèÇ1Ç¬à»è„ê›íËÇµÇƒÇ≠ÇæÇ≥Ç¢ÅB');
    return;
  }

  var theLink = nlapiResolveURL('SUITELET', 'customscript_gw_ss_paymentlist', 'customdeploy_gw_ss_paymentlist');

  theLink = theLink + '&payment_type_field=' + payment_type_field + '&payment_date_field=' + payment_date_field
    + '&payment_name_field=' + payment_name_field + '&bank_name_field=' + bank_name_field + '&bank_branch_name_field=' + bank_branch_name_field + '&apply_status_field=' + apply_status_field;

  document.location.href = theLink;
  return;
}
