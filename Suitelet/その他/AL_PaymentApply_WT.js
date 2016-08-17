/*
 * ********************************************************************************
 * Script: AL_PaymentApply.js
 * Description: ���������}�b�`���O�����
 * Author: shuji.nasu
 * History:
 * Ver, Date
 * 0.1, 2016/06/09
 * ********************************************************************************
 */
function main(request, response)
{
    var applyListForm = nlapiCreateForm("���������}�b�`���O���");

    var applyButton  = applyListForm.addSubmitButton("�������s");
    var searchButton  = applyListForm.addButton("searchButton", "�i�荞��");
    var clearButton  = applyListForm.addButton("clearButton", "�N���A");
    var returnButton  = applyListForm.addButton("returnButton", "�߂�");
    
    // �i�荞�ݏ���
    var conditionFieldGroup = applyListForm.addFieldGroup("apply_condition_field_group", "�i�荞�ݏ���");
    
    var applyCondition01 = applyListForm.addField("apply_condition_field", "radio", "�ڋq���J�i�Ɠ����҃J�i����v����", "condition01", "apply_condition_field_group");
    applyCondition01.setBreakType("startcol");
    applyCondition01.setDefaultValue("condition01");
    var applyCondition02 = applyListForm.addField("apply_condition_field", "radio", "�������z���v���������z�Ɠ��z", "condition02", "apply_condition_field_group");
    var applyCondition03 = applyListForm.addField("apply_condition_field", "radio", "�ڋq��(��)�����v����", "condition03", "apply_condition_field_group");
    var applyCondition04 = applyListForm.addField("apply_condition_field", "radio", "�ڋq��(��)�����v����", "condition04", "apply_condition_field_group");
    var applyCondition05 = applyListForm.addField("apply_condition_field", "radio", "�����̐U����s+�x�X���A�Y�������f�[�^�̉ߋ��̐U����s+�x�X�Ɖߋ�1�N�Ԃɓ������̂�����", "condition05", "apply_condition_field_group");
    var applyCondition06 = applyListForm.addField("apply_condition_field", "radio", "�Y������_��̉ߋ��̓��������f�[�^�̓������`�l���ڋq���̓��������p�t���K�i�Ɉ�v����", "condition06", "apply_condition_field_group");
    var applyCondition07 = applyListForm.addField("apply_condition_field", "radio", "�ڋq���J�i�Ɉȉ����܂�", "condition07", "apply_condition_field_group");
    var applyConditionCustomerName  = applyListForm.addField("apply_condition_customer_name_field", "text", "�ڋq���J�i", null, "apply_condition_field_group");
    
    // �������
    var paymentFieldGroup = applyListForm.addFieldGroup("payment_field_group", "�������");
    
    var paymentTypeField  = applyListForm.addField("payment_type_field", "text", "�������", null, "payment_field_group");
    paymentTypeField.setDefaultValue("�O�HUFJ�t�@�N�^�[�������");
    paymentTypeField.setDisplayType("disabled");
    var paymentDateField  = applyListForm.addField("payment_date_field", "text", "������", null, "payment_field_group");
    paymentDateField.setDefaultValue("2016�N5��31��");
    paymentDateField.setDisplayType("disabled");
    var paymentNameField  = applyListForm.addField("payment_name_field", "text", "�����Җ�", null, "payment_field_group");
    paymentNameField.setDefaultValue("���� �۳");
    paymentNameField.setDisplayType("disabled");
    var paymentAmountField  = applyListForm.addField("payment_amount_field", "text", "�����z", null, "payment_field_group");
    paymentAmountField.setDefaultValue("10000");
    paymentAmountField.setDisplayType("disabled");
    var bankNameField  = applyListForm.addField("bank_name_field", "text", "��s��", null, "payment_field_group");
    bankNameField.setDefaultValue("�O�H�����t�e�i");
    bankNameField.setDisplayType("disabled");
    var bankBranchNameField  = applyListForm.addField("bank_branch_name_field", "text", "�x�X��", null, "payment_field_group");
    bankBranchNameField.setDefaultValue("�Óc��");
    bankBranchNameField.setDisplayType("disabled");
    var applyStatusField  = applyListForm.addField("apply_status_field", "text", "�����X�e�[�^�X", null, "payment_field_group");
    applyStatusField.setDefaultValue("������");
    applyStatusField.setDisplayType("disabled");
    var paymentAbstructField  = applyListForm.addField("payment_abstract_field", "text", "�E�v", null, "payment_field_group");
    paymentAbstructField.setDefaultValue("264");
    paymentAbstructField.setDisplayType("disabled");
    
    // �����Ώ� �����ꗗ
    var billingSubList  = applyListForm.addSubList("billing_sub_list", "staticlist", "�����Ώ� �����ꗗ");
    billingSubList.addField("sub_list_check",          "checkbox", "�I��");
    billingSubList.addField("sub_list_id",                 "text", "�����ԍ�");
    billingSubList.addField("sub_list_billing_date",       "date", "������");
    billingSubList.addField("sub_list_customer_id",        "text", "�ڋq�ԍ�");
    billingSubList.addField("sub_list_customer_name_sei",  "text", "�ڋq��(��)");
    billingSubList.addField("sub_list_customer_name_mei",  "text", "�ڋq��(��)");
    billingSubList.addField("sub_list_customer_name_kana", "text", "�ڋq���J�i");
    billingSubList.addField("sub_list_total_amount",       "text", "�������z���v");
    billingSubList.addField("sub_list_billing_status",     "text", "�x���X�e�[�^�X");
    billingSubList.addField("sub_list_apply_amount",       "text", "�������z");
    
    billingSubList.setLineItemValue("sub_list_id",                 1, "33");
    billingSubList.setLineItemValue("sub_list_billing_date",       1, "2016�N9��27��");
    billingSubList.setLineItemValue("sub_list_customer_id",        1, "1");
    billingSubList.setLineItemValue("sub_list_customer_name_sei",  1, "�ڋq");
    billingSubList.setLineItemValue("sub_list_customer_name_mei",  1, "���Y");
    billingSubList.setLineItemValue("sub_list_customer_name_kana", 1, "�R�L���N �^���E");
    billingSubList.setLineItemValue("sub_list_total_amount",       1, "7200");
    billingSubList.setLineItemValue("sub_list_billing_status",     1, "�I�[�v��");
    billingSubList.setLineItemValue("sub_list_apply_amount",       1, "0");

    billingSubList.setLineItemValue("sub_list_id",                 2, "37");
    billingSubList.setLineItemValue("sub_list_billing_date",       2, "2016�N7��1��");
    billingSubList.setLineItemValue("sub_list_customer_id",        2, "1");
    billingSubList.setLineItemValue("sub_list_customer_name_sei",  2, "�ڋq");
    billingSubList.setLineItemValue("sub_list_customer_name_mei",  2, "�ܘY");
    billingSubList.setLineItemValue("sub_list_customer_name_kana", 2, "�R�L���N �S���E");
    billingSubList.setLineItemValue("sub_list_total_amount",       2, "7092");
    billingSubList.setLineItemValue("sub_list_billing_status",     1, "�I�[�v��");
    billingSubList.setLineItemValue("sub_list_apply_amount",       2, "0");
    
    response.writePage(applyListForm);
}