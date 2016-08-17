/*
 * ********************************************************************************
 * Script: AL_PaymentList.js
 * Description: 入金残一覧画面
 * Author: daisuke.otaka@globlway.co.jp
 * History:
 * Ver, Date
 * 0.1, 2016/06/02
 * ********************************************************************************
 */
function main(request, response)
{
    var paymentListForm = nlapiCreateForm("入金残一覧");

    var matchingCandidateButton  = paymentListForm.addSubmitButton("マッチング候補");
    var searchButton  = paymentListForm.addButton("searchButton", "検索");
    var resetButton  = paymentListForm.addButton("resetButton", "リセット");
    
    var paymentTypeField  = paymentListForm.addField("payment_type_field", "select", "入金種別", "customlist26");
    var paymentDateField  = paymentListForm.addField("payment_date_field", "date", "入金日");
    var paymentNameField  = paymentListForm.addField("payment_name_field", "text", "入金者名");
    var bankNameField  = paymentListForm.addField("bank_name_field", "text", "銀行名");
    var bankBranchNameField  = paymentListForm.addField("bank_branch_name_field", "text", "支店名");
    var applyStatusField  = paymentListForm.addField("apply_status_field", "select", "消込ステータス");
    applyStatusField.addSelectOption("01","未消込");
    applyStatusField.addSelectOption("02","一部消込");
    applyStatusField.addSelectOption("03","消込済");
    
    var paymentSubList  = paymentListForm.addSubList("payment_sub_list", "staticlist", "入金一覧");
    paymentSubList.addField("sub_list_check", "checkbox", "選択");
    paymentSubList.addField("sub_list_id", "url", "ID");
    paymentSubList.addField("sub_list_payment_type", "text", "入金種別");
    paymentSubList.addField("sub_list_payment_date", "date", "入金日");
    paymentSubList.addField("sub_list_payment_name", "text", "入金者名");
    paymentSubList.addField("sub_list_payment_amount", "text", "入金額");
    paymentSubList.addField("sub_list_bank_name", "text", "銀行名");
    paymentSubList.addField("sub_list_bank_branch_name", "text", "支店名");
    paymentSubList.addField("sub_list_apply_status", "text", "消込ステータス");
    paymentSubList.addField("sub_list_abstract", "text", "摘要");
    
    paymentSubList.setLineItemValue("sub_list_id",               1, "/1");
    paymentSubList.setLineItemValue("sub_list_payment_type",     1, "三菱UFJファクター株式会社");
    paymentSubList.setLineItemValue("sub_list_payment_date",     1, "2016年5月31日");
    paymentSubList.setLineItemValue("sub_list_payment_name",     1, "ｺｷｬｸ ﾀﾛｳ");
    paymentSubList.setLineItemValue("sub_list_payment_amount",   1, "10000");
    paymentSubList.setLineItemValue("sub_list_bank_name",        1, "三菱東京ＵＦＪ");
    paymentSubList.setLineItemValue("sub_list_bank_branch_name", 1, "津田沼");
    paymentSubList.setLineItemValue("sub_list_apply_status",     1, "未消込");
    paymentSubList.setLineItemValue("sub_list_abstract",         1, "264");
    
    paymentSubList.setLineItemValue("sub_list_id",               2, "/2");
    paymentSubList.setLineItemValue("sub_list_payment_type",     2, "三菱UFJファクター株式会社");
    paymentSubList.setLineItemValue("sub_list_payment_date",     2, "2016年5月31日");
    paymentSubList.setLineItemValue("sub_list_payment_name",     2, "ｺｷｬｸ ﾀﾛｳ");
    paymentSubList.setLineItemValue("sub_list_payment_amount",   2, "20000");
    paymentSubList.setLineItemValue("sub_list_bank_name",        2, "三菱東京ＵＦＪ");
    paymentSubList.setLineItemValue("sub_list_bank_branch_name", 2, "津田沼");
    paymentSubList.setLineItemValue("sub_list_apply_status",     2, "未消込");
    paymentSubList.setLineItemValue("sub_list_abstract",         2, "264");
    
    paymentSubList.setLineItemValue("sub_list_id",               3, "/3");
    paymentSubList.setLineItemValue("sub_list_payment_type",     3, "三菱UFJファクター株式会社");
    paymentSubList.setLineItemValue("sub_list_payment_date",     3, "2016年5月31日");
    paymentSubList.setLineItemValue("sub_list_payment_name",     3, "ｺｷｬｸ ﾀﾛｳ");
    paymentSubList.setLineItemValue("sub_list_payment_amount",   3, "30000");
    paymentSubList.setLineItemValue("sub_list_bank_name",        3, "三菱東京ＵＦＪ");
    paymentSubList.setLineItemValue("sub_list_bank_branch_name", 3, "津田沼");
    paymentSubList.setLineItemValue("sub_list_apply_status",     3, "未消込");
    paymentSubList.setLineItemValue("sub_list_abstract",         3, "264");
    
    
    response.writePage(paymentListForm);
}
