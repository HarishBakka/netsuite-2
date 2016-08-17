/*
 * ********************************************************************************
 * Script: AL_PaymentApply.js
 * Description: 入金消込マッチング候補画面
 * Author: daisuke.otaka@globlway.co.jp
 * History:
 * Ver, Date
 * 0.1, 2016/06/02
 * ********************************************************************************
 */
function paymentApplyGW(request, response)
{
    try{
      var applyListForm = nlapiCreateForm("入金消込マッチング候補");

      applyListForm.setScript('customscript_gw_cs_paymentapply');
      var param = {};
      var strID = request.getParameter('strID');

      var applyButton  = applyListForm.addSubmitButton("消込実行");
      var searchButton  = applyListForm.addButton("searchButton", "絞り込み");
      var clearButton  = applyListForm.addButton("clearButton", "クリア");
      var returnButton  = applyListForm.addButton("returnButton", "戻る",'window.history.back();');

      // 絞り込み条件
      var conditionFieldGroup = applyListForm.addFieldGroup("apply_condition_field_group", "絞り込み条件");
      var applyCondition01 = applyListForm.addField("apply_condition_field_01", "checkbox", "顧客名カナと入金者カナが一致する", null, "apply_condition_field_group");
      applyCondition01.setBreakType("startcol");
      var applyCondition02 = applyListForm.addField("apply_condition_field_02", "checkbox", "請求金額合計が入金金額と同額", null, "apply_condition_field_group");
      var applyCondition03 = applyListForm.addField("apply_condition_field_03", "checkbox", "顧客名(姓)が合致する", null, "apply_condition_field_group");
      var applyCondition04 = applyListForm.addField("apply_condition_field_04", "checkbox", "顧客名(名)が合致する", null, "apply_condition_field_group");
      var applyCondition05 = applyListForm.addField("apply_condition_field_05", "checkbox", "入金の振込銀行+支店が、該当請求データの過去の振込銀行+支店と過去1年間に同じものがある", null, "apply_condition_field_group");
      var applyCondition06 = applyListForm.addField("apply_condition_field_06", "checkbox", "該当する契約の過去の入金消込データの入金名義人が顧客情報の入金検索用フリガナに一致する", null, "apply_condition_field_group");
      var applyCondition07 = applyListForm.addField("apply_condition_field_07", "checkbox", "顧客名カナに以下を含む", null, "apply_condition_field_group");

      /*var applyCondition01 = applyListForm.addField("apply_condition_field", "radio", "顧客名カナと入金者カナが一致する", "condition01", "apply_condition_field_group");
      applyCondition01.setBreakType("startcol");
      applyCondition01.setDefaultValue("condition01");
      var applyCondition02 = applyListForm.addField("apply_condition_field", "radio", "請求金額合計が入金金額と同額", "condition02", "apply_condition_field_group");
      var applyCondition03 = applyListForm.addField("apply_condition_field", "radio", "顧客名(姓)が合致する", "condition03", "apply_condition_field_group");
      var applyCondition04 = applyListForm.addField("apply_condition_field", "radio", "顧客名(名)が合致する", "condition04", "apply_condition_field_group");
      var applyCondition05 = applyListForm.addField("apply_condition_field", "radio", "入金の振込銀行+支店が、該当請求データの過去の振込銀行+支店と過去1年間に同じものがある", "condition05", "apply_condition_field_group");
      var applyCondition06 = applyListForm.addField("apply_condition_field", "radio", "該当する契約の過去の入金消込データの入金名義人が顧客情報の入金検索用フリガナに一致する", "condition06", "apply_condition_field_group");
      var applyCondition07 = applyListForm.addField("apply_condition_field", "radio", "顧客名カナに以下を含む", "condition07", "apply_condition_field_group");*/
     
      var applyConditionCustomerName  = applyListForm.addField("apply_condition_customer_name_field", "text", "顧客名カナ", null, "apply_condition_field_group");

      // 入金情報
      var paymentFieldGroup = applyListForm.addFieldGroup("payment_field_group", "入金情報");
  
      var paymentTypeField  = applyListForm.addField("payment_type_field", "text", "入金種別", null, "payment_field_group");
      paymentTypeField.setDefaultValue("三菱UFJファクター株式会社");
      paymentTypeField.setDisplayType("disabled");
      var paymentDateField  = applyListForm.addField("payment_date_field", "text", "入金日", null, "payment_field_group");
      paymentDateField.setDefaultValue("2016年5月31日");
      paymentDateField.setDisplayType("disabled");
      var paymentNameField  = applyListForm.addField("payment_name_field", "text", "入金者名", null, "payment_field_group");
      paymentNameField.setDefaultValue("ｺｷｬｸ ﾀﾛｳ");
      paymentNameField.setDisplayType("disabled");
      var paymentAmountField  = applyListForm.addField("payment_amount_field", "text", "入金額", null, "payment_field_group");
      paymentAmountField.setDefaultValue("10000");
      paymentAmountField.setDisplayType("disabled");
      var bankNameField  = applyListForm.addField("bank_name_field", "text", "銀行名", null, "payment_field_group");
      bankNameField.setDefaultValue("三菱東京ＵＦＪ");
      bankNameField.setDisplayType("disabled");
      var bankBranchNameField  = applyListForm.addField("bank_branch_name_field", "text", "支店名", null, "payment_field_group");
      bankBranchNameField.setDefaultValue("津田沼");
      bankBranchNameField.setDisplayType("disabled");
      var applyStatusField  = applyListForm.addField("apply_status_field", "text", "消込ステータス", null, "payment_field_group");
      applyStatusField.setDefaultValue("未消込");
      applyStatusField.setDisplayType("disabled");
      var paymentAbstructField  = applyListForm.addField("payment_abstract_field", "text", "摘要", null, "payment_field_group");
      paymentAbstructField.setDefaultValue("264");
      paymentAbstructField.setDisplayType("disabled");

      if(strID!==null){
    	  var searchResult = nlapiLoadRecord('customrecord_gw_paymentacquisitiond', strID);
    	  if(searchResult !== null){
        	  paymentTypeField.setDefaultValue(searchResult.getFieldText('custrecord_gw_payacqdate_payclass'));
        	  paymentDateField.setDefaultValue(searchResult.getFieldValue('custrecord_gw_payacqdate_paymentdate'));
        	  paymentNameField.setDefaultValue(searchResult.getFieldValue('custrecord_gw_payacqdate_paymentname'));
        	  paymentAmountField.setDefaultValue(searchResult.getFieldValue('custrecord_gw_payacqdate_paymentamount'));
        	  bankNameField.setDefaultValue(searchResult.getFieldValue('custrecord_gw_payacqdate_bankname'));
        	  bankBranchNameField.setDefaultValue(searchResult.getFieldValue('custrecord_gw_payacqdate_branchname'));
        	  applyStatusField.setDefaultValue(searchResult.getFieldText('custrecord_gw_salesacqdeta_status'));
        	  paymentAbstructField.setDefaultValue(searchResult.getFieldValue('custrecord_gw_payacqdate_abstract'));
        	  
          }
          
      }
      
      
      
      
      // 消込対象 請求一覧
      var billingSubList  = applyListForm.addSubList("billing_sub_list", "staticlist", "消込対象 請求一覧");
      billingSubList.addField("sub_list_check",          "checkbox", "選択");
      billingSubList.addField("sub_list_id",                 "text", "請求番号");
      billingSubList.addField("sub_list_billing_date",       "date", "請求日");
      billingSubList.addField("sub_list_customer_id",        "text", "顧客番号");
      billingSubList.addField("sub_list_customer_name_sei",  "text", "顧客名(姓)");
      billingSubList.addField("sub_list_customer_name_mei",  "text", "顧客名(名)");
      billingSubList.addField("sub_list_customer_name_kana", "text", "顧客名カナ");
      billingSubList.addField("sub_list_total_amount",       "text", "請求金額合計");
      billingSubList.addField("sub_list_billing_status",     "text", "支払ステータス");
      billingSubList.addField("sub_list_apply_amount",       "text", "消込金額");

      // billingSubList.setLineItemValue("sub_list_id",                 1, "BI0001");
      // billingSubList.setLineItemValue("sub_list_billing_date",       1, "2016/5/10");
      // billingSubList.setLineItemValue("sub_list_customer_id",        1, "90001");
      // billingSubList.setLineItemValue("sub_list_customer_name_sei",  1, "顧客");
      // billingSubList.setLineItemValue("sub_list_customer_name_mei",  1, "太郎");
      // billingSubList.setLineItemValue("sub_list_customer_name_kana", 1, "コキャク タロウ");
      // billingSubList.setLineItemValue("sub_list_total_amount",       1, "10000");
      // billingSubList.setLineItemValue("sub_list_billing_status",     1, "オープン");
      // billingSubList.setLineItemValue("sub_list_apply_amount",       1, "0");

      // billingSubList.setLineItemValue("sub_list_id",                 2, "BI0002");
      // billingSubList.setLineItemValue("sub_list_billing_date",       2, "2016/5/10");
      // billingSubList.setLineItemValue("sub_list_customer_id",        2, "90001");
      // billingSubList.setLineItemValue("sub_list_customer_name_sei",  2, "顧客");
      // billingSubList.setLineItemValue("sub_list_customer_name_mei",  2, "太郎");
      // billingSubList.setLineItemValue("sub_list_customer_name_kana", 2, "コキャク タロウ");
      // billingSubList.setLineItemValue("sub_list_total_amount",       2, "20000");
      // billingSubList.setLineItemValue("sub_list_billing_status",     2, "オープン");
      // billingSubList.setLineItemValue("sub_list_apply_amount",       2, "0");

      // billingSubList.setLineItemValue("sub_list_id",                 3, "BI0003");
      // billingSubList.setLineItemValue("sub_list_billing_date",       3, "2016/5/10");
      // billingSubList.setLineItemValue("sub_list_customer_id",        3, "90001");
      // billingSubList.setLineItemValue("sub_list_customer_name_sei",  3, "顧客");
      // billingSubList.setLineItemValue("sub_list_customer_name_mei",  3, "太郎");
      // billingSubList.setLineItemValue("sub_list_customer_name_kana", 3, "コキャク タロウ");
      // billingSubList.setLineItemValue("sub_list_total_amount",       3, "30000");
      // billingSubList.setLineItemValue("sub_list_billing_status",     3, "オープン");
      // billingSubList.setLineItemValue("sub_list_apply_amount",       3, "0");

      response.writePage(applyListForm);
  }
  catch(e){
    nlapiLogExecution('ERROR','paymentApplyGW',e);
  }
}
