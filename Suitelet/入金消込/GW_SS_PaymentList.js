/**
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       20 July 2016     Principal
 *
 */

function paymentListGW(request, response)
{
  try{
    if (request.getMethod() == 'GET'){

      var paymentListForm = nlapiCreateForm("�����c�ꗗ");

      var matchingCandidateButton  = paymentListForm.addSubmitButton("�}�b�`���O���");
      var searchButton  = paymentListForm.addButton("searchButton", "����", 'redirectToSearch();');
      var resetButton  = paymentListForm.addResetButton("���Z�b�g");

      paymentListForm.setScript('customscript_gw_cs_paymentlist');
      var paymentFormFieldGroup = paymentListForm.addFieldGroup("payment_form_field_group","FormField");
      paymentFormFieldGroup.setShowBorder(false);
      var param = {};
      // �������
      var paymentTypeField  = paymentListForm.addField("payment_type_field", "select", "�������", "customrecord_gw_payment_bank_type","payment_form_field_group");
      param['payment_type_field'] = request.getParameter('payment_type_field');
      paymentTypeField.setDefaultValue(param['payment_type_field']);

      // ������
      var paymentDateField  = paymentListForm.addField("payment_date_field", "date", "������",null,"payment_form_field_group");
      param['payment_date_field'] = request.getParameter('payment_date_field');
      paymentDateField.setDefaultValue(param['payment_date_field']);

      // �����Җ�
      var paymentNameField  = paymentListForm.addField("payment_name_field", "text", "�����Җ�",null,"payment_form_field_group");
      var paymentNameFieldDecode = request.getParameter('payment_name_field');
      if(paymentNameFieldDecode !== null) paymentNameFieldDecode = unescape(paymentNameFieldDecode);
      param['payment_name_field'] = paymentNameFieldDecode;
      paymentNameField.setDefaultValue(paymentNameFieldDecode);

      // ��s��
      var bankNameField  = paymentListForm.addField("bank_name_field", "text", "��s��",null,"payment_form_field_group");
      var bankNameFieldDecode = request.getParameter('bank_name_field');
      if(bankNameFieldDecode !== null) bankNameFieldDecode = unescape(bankNameFieldDecode);
      param['bank_name_field'] = bankNameFieldDecode;
      bankNameField.setDefaultValue(bankNameFieldDecode);

      // �x�X��
      var bankBranchNameField  = paymentListForm.addField("bank_branch_name_field", "text", "�x�X��",null,"payment_form_field_group");
      var bankBranchNameFieldDecode = request.getParameter('bank_branch_name_field');
      if(bankBranchNameFieldDecode !== null) bankBranchNameFieldDecode = unescape(bankBranchNameFieldDecode);
      param['bank_branch_name_field'] = bankBranchNameFieldDecode;
      bankBranchNameField.setDefaultValue(bankBranchNameFieldDecode);

      // �����X�e�[�^�X
      var applyStatusField  = paymentListForm.addField("apply_status_field", "select", "�����捞�X�e�[�^�X", "customlist_gw_payment_status","payment_form_field_group");
      param['apply_status_field'] = request.getParameter('apply_status_field');
      applyStatusField.setDefaultValue(param['apply_status_field']);

      var paymentSubList  = paymentListForm.addSubList("payment_sub_list", "list", "�����ꗗ");
      paymentSubList.addField("sub_list_check", "checkbox", "�I��");
      paymentSubList.addField("sub_list_no", "text", "No.");
      paymentSubList.addField("sub_list_internalid", "text", "internalid").setDisplayType("hidden");
      paymentSubList.addField("sub_list_payment_paymentdata", "select","�W�������[","customerpayment").setDisplayType('disabled');
      paymentSubList.addField("sub_list_payment_customer", "text", "�ڋq");
      paymentSubList.addField("sub_list_payment_type", "text", "�������");
      paymentSubList.addField("sub_list_payment_date", "date", "������");
      paymentSubList.addField("sub_list_payment_name", "text", "�����Җ�");
      paymentSubList.addField("sub_list_payment_amount", "currency", "�����z");
      paymentSubList.addField("sub_list_bank_name", "text", "��s��");
      paymentSubList.addField("sub_list_bank_branch_name", "text", "�x�X��");
      paymentSubList.addField("sub_list_apply_status", "text", "�����捞�X�e�[�^�X");
//      paymentSubList.addField("sub_list_abstract", "text", "�E�v");

      var searchResult = getList(param);
      var searchResultFieldGroup = paymentListForm.addFieldGroup("search_result_field_group", "�i�荞�݌���");
	  var searchResultCountField = paymentListForm.addField("search_result_count_field", "text", "�i�荞�݌��ʌ���", null,"search_result_field_group");
	  searchResultCountField.setDisplayType("inline");
      if(searchResult!==null)
    	  searchResultCountField.setDefaultValue(searchResult.length+"��");
      else
    	  searchResultCountField.setDefaultValue("0��");

      if(searchResult !== null && searchResult.length < 100){

        for (var i = 0; i < searchResult.length; i++) {
          var id = i+1;
//          var url = '/' + id.toString();
          paymentSubList.setLineItemValue("sub_list_no",       i+1, (i+1).toString());
          paymentSubList.setLineItemValue("sub_list_internalid",       i+1, searchResult[i].getId());
          paymentSubList.setLineItemValue("sub_list_payment_paymentdata",       i+1, searchResult[i].getValue('custrecord_gw_salesacqdeta_paymentrec'));
          paymentSubList.setLineItemValue("sub_list_payment_type",     i+1, searchResult[i].getText('custrecord_gw_payacqdate_payclass'));
          paymentSubList.setLineItemValue("sub_list_payment_date",     i+1, searchResult[i].getValue('custrecord_gw_payacqdate_paymentdate'));
          paymentSubList.setLineItemValue("sub_list_payment_name",     i+1, searchResult[i].getValue('custrecord_gw_payacqdate_paymentname'));
          paymentSubList.setLineItemValue("sub_list_payment_amount",   i+1, searchResult[i].getValue('custrecord_gw_payacqdate_paymentamount'));
          paymentSubList.setLineItemValue("sub_list_bank_name",        i+1, searchResult[i].getValue('custrecord_gw_payacqdate_bankname'));
          paymentSubList.setLineItemValue("sub_list_bank_branch_name", i+1, searchResult[i].getValue('custrecord_gw_payacqdate_branchname'));
          paymentSubList.setLineItemValue("sub_list_apply_status",     i+1, searchResult[i].getText('custrecord_gw_salesacqdeta_status'));
//          paymentSubList.setLineItemValue("sub_list_abstract",         i+1, "264");
          paymentSubList.setLineItemValue("sub_list_payment_customer",     i+1, searchResult[i].getText('custrecord_gw_payacqdate_customer'));
        }

      }


      response.writePage(paymentListForm);
    }
    // post
    else if (request.getMethod() == 'POST') {
    	var count = request.getLineItemCount('payment_sub_list');
    	var param = new Array();
    	for(i =1; i<= count; i++){
    		if(request.getLineItemValue('payment_sub_list','sub_list_check',i)=='T'){
    			param['strID'] = request.getLineItemValue('payment_sub_list','sub_list_internalid',i);
    			break;
    		}
    	}
    	nlapiSetRedirectURL('SUITELET', 'customscript_gw_ss_paymentapply', 'customdeploy_gw_ss_paymentapply', null, param);

    }
  }
  catch(e){
    nlapiLogExecution('ERROR','paymentListGW',e);
  }
}

function getList(param){
  var filters = new Array();
  var i = 0;

  if(param['payment_type_field'] !== '' && param['payment_type_field'] !== null){
    filters[i] = new nlobjSearchFilter( 'custrecord_gw_payacqdate_payclass', null, 'is', param['payment_type_field'] );
    i++;
  }

  if(param['payment_date_field'] !== '' && param['payment_date_field'] !== null){
    filters[i] = new nlobjSearchFilter( 'custrecord_gw_payacqdate_paymentdate', null, 'on', param['payment_date_field'] );
    i++;
  }

  if(param['payment_name_field'] !== '' && param['payment_name_field'] !== null && param['payment_name_field'].length > 0){
    filters[i] = new nlobjSearchFilter( 'custrecord_gw_payacqdate_paymentname', null, 'contains', param['payment_name_field'] );
    i++;
  }

  if(param['bank_branch_name_field'] !== '' && param['bank_branch_name_field'] !== null && param['bank_branch_name_field'].length > 0){
    filters[i] = new nlobjSearchFilter( 'custrecord_gw_payacqdate_branchname', null, 'contains', param['bank_branch_name_field'] );
    i++;
  }

  if(param['bank_name_field'] !== '' && param['bank_name_field'] !== null && param['bank_name_field'].length > 0){
    filters[i] = new nlobjSearchFilter( 'custrecord_gw_payacqdate_bankname', null, 'contains', param['bank_name_field'] );
    i++;
  }

  if(param['apply_status_field'] !== '' && param['apply_status_field'] !== null){
    filters[i] = new nlobjSearchFilter( 'custrecord_gw_salesacqdeta_status', null, 'is', param['apply_status_field'] );
    i++;
  }

  var col = new Array();
  col[0] = new nlobjSearchColumn('custrecord_gw_payacqdate_payclass');
  col[1] = new nlobjSearchColumn('custrecord_gw_payacqdate_paymentdate');
  col[2] = new nlobjSearchColumn('custrecord_gw_payacqdate_paymentname');
  col[3] = new nlobjSearchColumn('custrecord_gw_payacqdate_branchname');
  col[4] = new nlobjSearchColumn('custrecord_gw_payacqdate_bankname');
  col[5] = new nlobjSearchColumn('custrecord_gw_salesacqdeta_status');
  col[6] = new nlobjSearchColumn('custrecord_gw_payacqdate_paymentamount');
  col[7] = new nlobjSearchColumn('custrecord_gw_payacqdate_customer');
  

  if (i == 0) return null;

  var result =   nlapiSearchRecord(null, 'customsearch_gw_payment_list', filters, col);

  if(result == undefined) result = null;
  return result;
}
