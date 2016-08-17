/*
 * ********************************************************************************
 * Script: AL_DisposalRequest.js
 * Description: �׏����m�F�˗����
 * Author: shuji.nasu@globlway.co.jp
 * History:
 * Ver, Date
 * 0.1, 2016/06/03
 * ********************************************************************************
 */
function DisposalRequest(request, response){
	
	var MainForm = nlapiCreateForm("�׏����m�F�˗�");

	MainForm.addSubmitButton("�m�F�˗�");
	MainForm.addResetButton("�˗����");
	MainForm.addButton("resetButton", "���Z�b�g");

 �@   MainForm.addField("payment_name_field1", "text", "�X�e�[�^�X");
  �@  MainForm.addField("payment_date_field", "date", "�\����");
   �@ MainForm.addField("payment_name_field2", "text", "�\����");
  �@  MainForm.addField("bank_name_field", "text", "�m�F��");
    �@MainForm.addButton("searchButton", "����");

	var DisposalList = MainForm.addSubList("payment_sub_list", "staticlist", "�׏����Ώۈꗗ");
	
	DisposalList.addField("cbox1", "checkbox", "�I��");
	DisposalList.addField("text5", "text", "�X�e�[�^�X");
	DisposalList.addField("text1", "text", "�ڋq��");
	DisposalList.addField("text2", "text", "�_��ԍ�");
	DisposalList.addField("date1", "date", "�_���");
	DisposalList.addField("date2", "date", "����");
	DisposalList.addField("text3", "text", "������");
	DisposalList.addField("text4", "text", "���i��");
	DisposalList.addField("text6", "text", "�\����");
	DisposalList.addField("text7", "text", "�m�F��");
	DisposalList.addField("date3", "date", "�\����");
	DisposalList.addField("date4", "date", "�m�F��");
	
	DisposalList.setLineItemValue("text1", 1, "1 �ڋq���Y");
	DisposalList.setLineItemValue("text5", 1, "���m�F");
	DisposalList.setLineItemValue("text2", 1, "�_��ԍ�001");
	DisposalList.setLineItemValue("date1", 1, "2013�N5��31��");
	DisposalList.setLineItemValue("date2", 1, "2016�N5��31��");
	DisposalList.setLineItemValue("text3", 1, "����A");
	DisposalList.setLineItemValue("text4", 1, "���iA");
	DisposalList.setLineItemValue("text6", 1, "�\�����Y");
	DisposalList.setLineItemValue("text7", 1, "");
	DisposalList.setLineItemValue("date3", 1, "");
	DisposalList.setLineItemValue("date4", 1, "");

	DisposalList.setLineItemValue("text1", 2, "2 �ڋq��Y");
	DisposalList.setLineItemValue("text5", 2, "���m�F");
	DisposalList.setLineItemValue("text2", 2, "�_��ԍ�567");
	DisposalList.setLineItemValue("date1", 2, "2010�N2��28��");
	DisposalList.setLineItemValue("date2", 2, "2012�N3��31��");
	DisposalList.setLineItemValue("text3", 2, "����B");
	DisposalList.setLineItemValue("text4", 2, "���iC");
	DisposalList.setLineItemValue("text6", 2, "�\�����Y");
	DisposalList.setLineItemValue("text7", 2, "");
	DisposalList.setLineItemValue("date3", 2, "");
	DisposalList.setLineItemValue("date4", 2, "");
	
	DisposalList.setLineItemValue("text1", 3, "3 �ڋq�O�Y");
	DisposalList.setLineItemValue("text5", 3, "���m�F");
	DisposalList.setLineItemValue("text2", 3, "�_��ԍ�234");
	DisposalList.setLineItemValue("date1", 3, "2000�N5��31��");
	DisposalList.setLineItemValue("date2", 3, "2016�N4��30��");
	DisposalList.setLineItemValue("text3", 3, "����C");
	DisposalList.setLineItemValue("text4", 3, "���iC");
	DisposalList.setLineItemValue("text6", 3, "�\�����Y");
	DisposalList.setLineItemValue("text7", 3, "");
	DisposalList.setLineItemValue("date3", 3, "");
	DisposalList.setLineItemValue("date4", 3, "");

	DisposalList.setLineItemValue("text1", 4, "4 �ڋq�l�Y");
	DisposalList.setLineItemValue("text5", 4, "����");
	DisposalList.setLineItemValue("text2", 4, "�_��ԍ�765");
	DisposalList.setLineItemValue("date1", 4, "2000�N2��1��");
	DisposalList.setLineItemValue("date2", 4, "2016�N8��30��");
	DisposalList.setLineItemValue("text3", 4, "����D");
	DisposalList.setLineItemValue("text4", 4, "���iD");
	DisposalList.setLineItemValue("text6", 4, "�\�����Y");
	DisposalList.setLineItemValue("text7", 4, "�m�F���Y");
	DisposalList.setLineItemValue("date3", 4, "2016�N5��31��");
	DisposalList.setLineItemValue("date4", 4, "");

	DisposalList.setLineItemValue("text1", 5, "5 �ڋq�ܘY");
	DisposalList.setLineItemValue("text5", 5, "���");
	DisposalList.setLineItemValue("text2", 5, "�_��ԍ�100");
	DisposalList.setLineItemValue("date1", 5, "2010�N6��1��");
	DisposalList.setLineItemValue("date2", 5, "2016�N6��30��");
	DisposalList.setLineItemValue("text3", 5, "����E");
	DisposalList.setLineItemValue("text4", 5, "���iE");
	DisposalList.setLineItemValue("text6", 5, "�\�����Y");
	DisposalList.setLineItemValue("text7", 5, "�m�F���Y");
	DisposalList.setLineItemValue("date3", 5, "2016�N5��31��");
	DisposalList.setLineItemValue("date4", 5, "");

	DisposalList.setLineItemValue("text1", 6, "6 �ڋq�Z�Y");
	DisposalList.setLineItemValue("text5", 6, "�\����");
	DisposalList.setLineItemValue("text2", 6, "�_��ԍ�333");
	DisposalList.setLineItemValue("date1", 6, "2011�N1��1��");
	DisposalList.setLineItemValue("date2", 6, "2016�N4��30��");
	DisposalList.setLineItemValue("text3", 6, "����E");
	DisposalList.setLineItemValue("text4", 6, "���iE");
	DisposalList.setLineItemValue("text6", 6, "�\�����Y");
	DisposalList.setLineItemValue("text7", 6, "�m�F���Y");
	DisposalList.setLineItemValue("date3", 6, "2016�N5��31��");
	DisposalList.setLineItemValue("date4", 6, "");
	
	response.writePage(MainForm);
}
