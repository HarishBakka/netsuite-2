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
	var applyValue = nlapiGetFieldValue('apply_amount_field');
	var unApplyValue = nlapiGetFieldValue('unapply_amount_field');
	if(applyValue == null || applyValue == ''|| applyValue == '0'){
		alert('適用金額を設定してください。');
		return false;
	}else if(parseInt(unApplyValue) < parseInt(applyValue)){
		alert('適用可能金額を超過しています。正しい金額を設定してください。');
		return false;	
	}
	
	//不明入金ユーザチェック
	var dammyCustomerInternalid = getDammycustomer();
	var mainCustomerId=nlapiGetFieldValue('main_customerinternalid_field');
	if(dammyCustomerInternalid!=mainCustomerId){
		var billingListCount = nlapiGetLineItemCount('billing_sub_list');
		for (var i = 1; i <= billingListCount; i++) {
			if(nlapiGetLineItemValue('billing_sub_list','sub_list_check',i) == 'T' ){
				var customerLineInternalId= nlapiGetLineItemValue('billing_sub_list','sub_list_cus_internalid',i);	
				if(customerLineInternalId!=mainCustomerId){
					alert('入金票の顧客と選択された請求書の顧客に相違があります。');
					return false;
				}				
			}
	    }
	}
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
	var billingListCount = nlapiGetLineItemCount('billing_sub_list');
	var totalAmount = 0;
	if (type == 'billing_sub_list' && name =='sub_list_check') {
		
		if(nlapiGetLineItemValue('billing_sub_list','sub_list_check',linenum)=='T'){
			
			for (var i = 1; i <= billingListCount; i++) {
				if(nlapiGetLineItemValue('billing_sub_list','sub_list_check',i) == 'T' ){
					var customerId1 = nlapiGetLineItemValue('billing_sub_list','sub_list_customer_id',i);
					var customerId2 = nlapiGetLineItemValue('billing_sub_list','sub_list_customer_id',linenum);
					if (customerId1 !== customerId2){
						nlapiSetLineItemValue('billing_sub_list','sub_list_check',linenum,'F');
						alert('同一顧客を選択してください。');
						return;
					}				
				}
	        }
			

			var itemAmount =  parseInt(nlapiGetLineItemValue('billing_sub_list','sub_list_total_amount',linenum));
			nlapiSetLineItemValue('billing_sub_list','sub_list_apply_amount',linenum,itemAmount);
		}else{
			nlapiSetLineItemValue('billing_sub_list','sub_list_apply_amount',linenum,'');
		}
		totalAmount = 0;
		for (var i = 1; i <= billingListCount; i++) {
			if(nlapiGetLineItemValue('billing_sub_list','sub_list_check',i) == 'T' ){
				var applyAmount = nlapiGetLineItemValue('billing_sub_list','sub_list_apply_amount',i);
				if(applyAmount !== null && applyAmount !=='')
					totalAmount = totalAmount + parseInt(applyAmount);

			}
	    }		
	    nlapiSetFieldValue('apply_amount_field', totalAmount);	
			
	}
	if (type == 'billing_sub_list' && name =='sub_list_apply_amount') {
		
		if(nlapiGetLineItemValue('billing_sub_list','sub_list_check',linenum) == 'T' ){
			var applyAmount1 = parseInt(nlapiGetLineItemValue('billing_sub_list','sub_list_apply_amount',linenum));
			var applyAmount2 = parseInt(nlapiGetLineItemValue('billing_sub_list','sub_list_total_amount',linenum));
			if(applyAmount1 > applyAmount2)
				nlapiSetLineItemValue('billing_sub_list','sub_list_apply_amount',linenum,parseInt(applyAmount2));
			
		}else{
			nlapiSetLineItemValue('billing_sub_list','sub_list_apply_amount',linenum,'');
		}
		totalAmount = 0;
		for (var i = 1; i <= billingListCount; i++) {
			if(nlapiGetLineItemValue('billing_sub_list','sub_list_check',i) == 'T' ){			
				var applyAmount = nlapiGetLineItemValue('billing_sub_list','sub_list_apply_amount',i);
				if(applyAmount !== null && applyAmount !=='')
					totalAmount = totalAmount + parseInt(applyAmount);
				
			}
	    }		
	    nlapiSetFieldValue('apply_amount_field', totalAmount);	
	
	}
	
 
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
function btnClearButton() {
	nlapiSetFieldValue("apply_condition_field_01", 'F');
	nlapiSetFieldValue("apply_condition_field_02", 'F');
	nlapiSetFieldValue("apply_condition_field_03", 'F');
	nlapiSetFieldValue("apply_condition_field_04", 'F');
	nlapiSetFieldValue("apply_condition_field_05", 'F');
	nlapiSetFieldValue("apply_condition_field_06", 'F');
	nlapiSetFieldValue("apply_condition_field_07", 'F');
	nlapiSetFieldValue("apply_condition_customer_name_field","");
		
	return;
}
function btnSearchButton() {
	var i = 0;
	var condition01 = nlapiGetFieldValue('apply_condition_field_01');
	var condition02 = nlapiGetFieldValue('apply_condition_field_02');
	var condition03 = nlapiGetFieldValue('apply_condition_field_03');
	var condition04 = nlapiGetFieldValue('apply_condition_field_04');
	var condition05 = nlapiGetFieldValue('apply_condition_field_05');
	var condition06 = nlapiGetFieldValue('apply_condition_field_06');
	var condition07 = nlapiGetFieldValue('apply_condition_field_07');
	var apply_condition_customer_name_field = nlapiGetFieldValue('apply_condition_customer_name_field');
	var strID = nlapiGetFieldValue('str_id_field');
	if(condition01 == 'T'){
		i++;
	}

	if(condition02 == 'T'){
		i++;
	}

	if(condition03 == 'T'){
		i++;
	}

	if(condition04 == 'T'){
		i++;
	}

	if(condition05 == 'T'){
		i++;
	}

	if(condition06 == 'T'){
		i++;
	}
	if(condition07 == 'T'){
		if(apply_condition_customer_name_field !== null && apply_condition_customer_name_field !== '')
			i++;
		else{
			alert('顧客名カナを入力してください。');
			return;
		}
	}

	if (i==0){
	  alert('絞り込み条件を1つ以上設定してください。');
	  return;
	}
	
	var theLink = nlapiResolveURL('SUITELET', 'customscript_gw_ss_paymentapply', 'customdeploy_gw_ss_paymentapply');
	
	theLink = theLink + '&apply_condition_field_01=' + condition01 + '&apply_condition_field_02=' + condition02 + '&apply_condition_field_03=' 
	+ condition03 + '&apply_condition_field_04=' + condition04 + '&apply_condition_field_05=' + condition05 + '&apply_condition_field_06=' + condition06 
	+ '&apply_condition_field_07=' + condition07 + '&apply_condition_customer_name_field='+ escape(apply_condition_customer_name_field);
	if(strID !== null)
		theLink = theLink + '&strID=' + strID;

	document.location.href = theLink;
	return;
}



function btnReturnButton() {
	var theLink = nlapiResolveURL('SUITELET', 'customscript_gw_ss_paymentlist', 'customdeploy_gw_ss_paymentlist');
	document.location.href = theLink;
	return;
	
}




