/*
 * ********************************************************************************
 * Script: AL_PaymentApply.js
 * Description: 入金消込マッチング候補画面
 * Author: shuji.nasu
 * History:
 * Ver, Date
 * 0.1, 2016/06/09
 * ********************************************************************************
 */
function main(request, response)
{
    var applyListForm = nlapiCreateForm("入金消込マッチング候補");

    var applyButton  = applyListForm.addSubmitButton("消込実行");
    var searchButton  = applyListForm.addButton("searchButton", "絞り込み");
    var clearButton  = applyListForm.addButton("clearButton", "クリア");
    var returnButton  = applyListForm.addButton("returnButton", "戻る");
    
    // 絞り込み条件
    var conditionFieldGroup = applyListForm.addFieldGroup("apply_condition_field_group", "絞り込み条件");
    
    var applyCondition01 = applyListForm.addField("apply_condition_field", "radio", "顧客名カナと入金者カナが一致する", "condition01", "apply_condition_field_group");
    applyCondition01.setBreakType("startcol");
    applyCondition01.setDefaultValue("condition01");
    var applyCondition02 = applyListForm.addField("apply_condition_field", "radio", "請求金額合計が入金金額と同額", "condition02", "apply_condition_field_group");
    var applyCondition03 = applyListForm.addField("apply_condition_field", "radio", "顧客名(姓)が合致する", "condition03", "apply_condition_field_group");
    var applyCondition04 = applyListForm.addField("apply_condition_field", "radio", "顧客名(名)が合致する", "condition04", "apply_condition_field_group");
    var applyCondition05 = applyListForm.addField("apply_condition_field", "radio", "入金の振込銀行+支店が、該当請求データの過去の振込銀行+支店と過去1年間に同じものがある", "condition05", "apply_condition_field_group");
    var applyCondition06 = applyListForm.addField("apply_condition_field", "radio", "該当する契約の過去の入金消込データの入金名義人が顧客情報の入金検索用フリガナに一致する", "condition06", "apply_condition_field_group");
    var applyCondition07 = applyListForm.addField("apply_condition_field", "radio", "顧客名カナに以下を含む", "condition07", "apply_condition_field_group");
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
    
    billingSubList.setLineItemValue("sub_list_id",                 1, "33");
    billingSubList.setLineItemValue("sub_list_billing_date",       1, "2016年9月27日");
    billingSubList.setLineItemValue("sub_list_customer_id",        1, "1");
    billingSubList.setLineItemValue("sub_list_customer_name_sei",  1, "顧客");
    billingSubList.setLineItemValue("sub_list_customer_name_mei",  1, "太郎");
    billingSubList.setLineItemValue("sub_list_customer_name_kana", 1, "コキャク タロウ");
    billingSubList.setLineItemValue("sub_list_total_amount",       1, "7200");
    billingSubList.setLineItemValue("sub_list_billing_status",     1, "オープン");
    billingSubList.setLineItemValue("sub_list_apply_amount",       1, "0");

    billingSubList.setLineItemValue("sub_list_id",                 2, "37");
    billingSubList.setLineItemValue("sub_list_billing_date",       2, "2016年7月1日");
    billingSubList.setLineItemValue("sub_list_customer_id",        2, "1");
    billingSubList.setLineItemValue("sub_list_customer_name_sei",  2, "顧客");
    billingSubList.setLineItemValue("sub_list_customer_name_mei",  2, "五郎");
    billingSubList.setLineItemValue("sub_list_customer_name_kana", 2, "コキャク ゴロウ");
    billingSubList.setLineItemValue("sub_list_total_amount",       2, "7092");
    billingSubList.setLineItemValue("sub_list_billing_status",     1, "オープン");
    billingSubList.setLineItemValue("sub_list_apply_amount",       2, "0");
    
    response.writePage(applyListForm);
}