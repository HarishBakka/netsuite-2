/*
 * ********************************************************************************
 * Script: AL_PaymentApply.js
 * Description: ���������}�b�`���O�����
 * Author: daisuke.otaka@globlway.co.jp
 * History:
 * Ver, Date
 * 0.1, 2016/06/02
 * ********************************************************************************
 */
function paymentApplyGW(request, response)
{
    try{
      var applyListForm = nlapiCreateForm("���������}�b�`���O���");

      applyListForm.setScript('customscript_gw_cs_paymentapply');
      var param = {};
      var strID = request.getParameter('strID');

      var applyButton  = applyListForm.addSubmitButton("�������s");
      var searchButton  = applyListForm.addButton("searchButton", "�i�荞��");
      var clearButton  = applyListForm.addButton("clearButton", "�N���A");
      var returnButton  = applyListForm.addButton("returnButton", "�߂�",'window.history.back();');

      // �i�荞�ݏ���
      var conditionFieldGroup = applyListForm.addFieldGroup("apply_condition_field_group", "�i�荞�ݏ���");
      var applyCondition01 = applyListForm.addField("apply_condition_field_01", "checkbox", "�ڋq���J�i�Ɠ����҃J�i����v����", null, "apply_condition_field_group");
      applyCondition01.setBreakType("startcol");
      var applyCondition02 = applyListForm.addField("apply_condition_field_02", "checkbox", "�������z���v���������z�Ɠ��z", null, "apply_condition_field_group");
      var applyCondition03 = applyListForm.addField("apply_condition_field_03", "checkbox", "�ڋq��(��)�����v����", null, "apply_condition_field_group");
      var applyCondition04 = applyListForm.addField("apply_condition_field_04", "checkbox", "�ڋq��(��)�����v����", null, "apply_condition_field_group");
      var applyCondition05 = applyListForm.addField("apply_condition_field_05", "checkbox", "�����̐U����s+�x�X���A�Y�������f�[�^�̉ߋ��̐U����s+�x�X�Ɖߋ�1�N�Ԃɓ������̂�����", null, "apply_condition_field_group");
      var applyCondition06 = applyListForm.addField("apply_condition_field_06", "checkbox", "�Y������_��̉ߋ��̓��������f�[�^�̓������`�l���ڋq���̓��������p�t���K�i�Ɉ�v����", null, "apply_condition_field_group");
      var applyCondition07 = applyListForm.addField("apply_condition_field_07", "checkbox", "�ڋq���J�i�Ɉȉ����܂�", null, "apply_condition_field_group");

      /*var applyCondition01 = applyListForm.addField("apply_condition_field", "radio", "�ڋq���J�i�Ɠ����҃J�i����v����", "condition01", "apply_condition_field_group");
      applyCondition01.setBreakType("startcol");
      applyCondition01.setDefaultValue("condition01");
      var applyCondition02 = applyListForm.addField("apply_condition_field", "radio", "�������z���v���������z�Ɠ��z", "condition02", "apply_condition_field_group");
      var applyCondition03 = applyListForm.addField("apply_condition_field", "radio", "�ڋq��(��)�����v����", "condition03", "apply_condition_field_group");
      var applyCondition04 = applyListForm.addField("apply_condition_field", "radio", "�ڋq��(��)�����v����", "condition04", "apply_condition_field_group");
      var applyCondition05 = applyListForm.addField("apply_condition_field", "radio", "�����̐U����s+�x�X���A�Y�������f�[�^�̉ߋ��̐U����s+�x�X�Ɖߋ�1�N�Ԃɓ������̂�����", "condition05", "apply_condition_field_group");
      var applyCondition06 = applyListForm.addField("apply_condition_field", "radio", "�Y������_��̉ߋ��̓��������f�[�^�̓������`�l���ڋq���̓��������p�t���K�i�Ɉ�v����", "condition06", "apply_condition_field_group");
      var applyCondition07 = applyListForm.addField("apply_condition_field", "radio", "�ڋq���J�i�Ɉȉ����܂�", "condition07", "apply_condition_field_group");*/
     
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

      // billingSubList.setLineItemValue("sub_list_id",                 1, "BI0001");
      // billingSubList.setLineItemValue("sub_list_billing_date",       1, "2016/5/10");
      // billingSubList.setLineItemValue("sub_list_customer_id",        1, "90001");
      // billingSubList.setLineItemValue("sub_list_customer_name_sei",  1, "�ڋq");
      // billingSubList.setLineItemValue("sub_list_customer_name_mei",  1, "���Y");
      // billingSubList.setLineItemValue("sub_list_customer_name_kana", 1, "�R�L���N �^���E");
      // billingSubList.setLineItemValue("sub_list_total_amount",       1, "10000");
      // billingSubList.setLineItemValue("sub_list_billing_status",     1, "�I�[�v��");
      // billingSubList.setLineItemValue("sub_list_apply_amount",       1, "0");

      // billingSubList.setLineItemValue("sub_list_id",                 2, "BI0002");
      // billingSubList.setLineItemValue("sub_list_billing_date",       2, "2016/5/10");
      // billingSubList.setLineItemValue("sub_list_customer_id",        2, "90001");
      // billingSubList.setLineItemValue("sub_list_customer_name_sei",  2, "�ڋq");
      // billingSubList.setLineItemValue("sub_list_customer_name_mei",  2, "���Y");
      // billingSubList.setLineItemValue("sub_list_customer_name_kana", 2, "�R�L���N �^���E");
      // billingSubList.setLineItemValue("sub_list_total_amount",       2, "20000");
      // billingSubList.setLineItemValue("sub_list_billing_status",     2, "�I�[�v��");
      // billingSubList.setLineItemValue("sub_list_apply_amount",       2, "0");

      // billingSubList.setLineItemValue("sub_list_id",                 3, "BI0003");
      // billingSubList.setLineItemValue("sub_list_billing_date",       3, "2016/5/10");
      // billingSubList.setLineItemValue("sub_list_customer_id",        3, "90001");
      // billingSubList.setLineItemValue("sub_list_customer_name_sei",  3, "�ڋq");
      // billingSubList.setLineItemValue("sub_list_customer_name_mei",  3, "���Y");
      // billingSubList.setLineItemValue("sub_list_customer_name_kana", 3, "�R�L���N �^���E");
      // billingSubList.setLineItemValue("sub_list_total_amount",       3, "30000");
      // billingSubList.setLineItemValue("sub_list_billing_status",     3, "�I�[�v��");
      // billingSubList.setLineItemValue("sub_list_apply_amount",       3, "0");

      response.writePage(applyListForm);
  }
  catch(e){
    nlapiLogExecution('ERROR','paymentApplyGW',e);
  }
}
