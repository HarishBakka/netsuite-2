/*
 * ********************************************************************************
 * Script: AL_PaymentList.js
 * Description: �����c�ꗗ���
 * Author: shuji.nasu
 * History:
 * Ver, Date
 * 0.1, 2016/06/09
 * ********************************************************************************
 */
function main(request, response)
{
    var paymentListForm = nlapiCreateForm("�����c�ꗗ");

    var matchingCandidateButton  = paymentListForm.addSubmitButton("�}�b�`���O���");
    var searchButton  = paymentListForm.addButton("searchButton", "����");
    var resetButton  = paymentListForm.addButton("resetButton", "���Z�b�g");
    
    var paymentTypeField  = paymentListForm.addField("payment_type_field", "select", "�������", "customlist26");
    var paymentDateField  = paymentListForm.addField("payment_date_field", "date", "������");
    var paymentNameField  = paymentListForm.addField("payment_name_field", "text", "�����Җ��J�i�@�������܂������i*�j");
    var bankNameField  = paymentListForm.addField("bank_name_field", "text", "��s��");
    var bankBranchNameField  = paymentListForm.addField("bank_branch_name_field", "text", "�x�X��");
    var applyStatusField  = paymentListForm.addField("apply_status_field", "select", "�����X�e�[�^�X");

    applyStatusField.addSelectOption("01","������");
    applyStatusField.addSelectOption("02","�ꕔ����");
    applyStatusField.addSelectOption("03","������");
    
    var paymentSubList  = paymentListForm.addSubList("payment_sub_list", "staticlist", "�����ꗗ");
    paymentSubList.addField("sub_list_check", "checkbox", "�I��");
    paymentSubList.addField("sub_list_id", "url", "ID");
    paymentSubList.addField("sub_list_payment_type", "text", "�������");
    paymentSubList.addField("sub_list_payment_date", "date", "������");
    paymentSubList.addField("sub_list_payment_name", "text", "�����Җ�");
    paymentSubList.addField("sub_list_payment_amount", "text", "�����z");
    paymentSubList.addField("sub_list_bank_name", "text", "��s��");
    paymentSubList.addField("sub_list_bank_branch_name", "text", "�x�X��");
    paymentSubList.addField("sub_list_apply_status", "text", "�����X�e�[�^�X");
    paymentSubList.addField("sub_list_abstract", "text", "�E�v");
    
    paymentSubList.setLineItemValue("sub_list_id",               1, "/26");
    paymentSubList.setLineItemValue("sub_list_payment_type",     1, "�O�HUFJ�t�@�N�^�[�������");
    paymentSubList.setLineItemValue("sub_list_payment_date",     1, "2016�N7��27��");
    paymentSubList.setLineItemValue("sub_list_payment_name",     1, "���� �۳");
    paymentSubList.setLineItemValue("sub_list_payment_amount",   1, "7200");
    paymentSubList.setLineItemValue("sub_list_bank_name",        1, "�O�H�����t�e�i");
    paymentSubList.setLineItemValue("sub_list_bank_branch_name", 1, "�Óc��");
    paymentSubList.setLineItemValue("sub_list_apply_status",     1, "������");
    paymentSubList.setLineItemValue("sub_list_abstract",         1, "264");
    
    paymentSubList.setLineItemValue("sub_list_id",               2, "/27");
    paymentSubList.setLineItemValue("sub_list_payment_type",     2, "�����U��");
    paymentSubList.setLineItemValue("sub_list_payment_date",     2, "2016�N7��1��");
    paymentSubList.setLineItemValue("sub_list_payment_name",     2, "");
    paymentSubList.setLineItemValue("sub_list_payment_amount",   2, "8092");
    paymentSubList.setLineItemValue("sub_list_bank_name",        2, "");
    paymentSubList.setLineItemValue("sub_list_bank_branch_name", 2, "");
    paymentSubList.setLineItemValue("sub_list_apply_status",     2, "������");
    paymentSubList.setLineItemValue("sub_list_abstract",         2, "203");
    
    response.writePage(paymentListForm);
}