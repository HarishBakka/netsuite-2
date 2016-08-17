/*
 * ********************************************************************************
 * Script: AL_DisposalConfirmation.js
 * Description: 荷処分確認画面
 * Author: shuji.nasu@globlway.co.jp
 * History:
 * Ver, Date
 * 0.1, 2016/06/03
 * ********************************************************************************
 */
function DisposalConfirmation(request, response){
	
	var MainForm = nlapiCreateForm("荷処分申請確認");

	MainForm.addSubmitButton("申請確認");
	MainForm.addResetButton("申請差戻");

	MainForm.addButton("rrbutton", "確認済み取消");
	MainForm.addButton("resetButton", "リセット");

 　   MainForm.addField("payment_name_field1", "text", "ステータス");
  　  MainForm.addField("payment_date_field", "date", "申請日");
   　 MainForm.addField("payment_name_field2", "text", "申請者");
  　  MainForm.addField("bank_name_field", "text", "確認者");
    　MainForm.addButton("searchButton", "検索");

	var DisposalList = MainForm.addSubList("payment_sub_list", "staticlist", "荷処分対象一覧");
	
	DisposalList.addField("cbox1", "checkbox", "選択");
	DisposalList.addField("text5", "text", "ステータス");
	DisposalList.addField("text1", "text", "顧客名");
	DisposalList.addField("text2", "text", "契約番号");
	DisposalList.addField("date1", "date", "契約日");
	DisposalList.addField("date2", "date", "解約日");
	DisposalList.addField("text3", "text", "物件名");
	DisposalList.addField("text4", "text", "商品名");
	DisposalList.addField("text6", "text", "申請者");
	DisposalList.addField("text7", "text", "確認者");
	DisposalList.addField("date3", "date", "申請日");
	
	DisposalList.setLineItemValue("text1", 1, "1 顧客太郎");
	DisposalList.setLineItemValue("text5", 1, "申請中");
	DisposalList.setLineItemValue("text2", 1, "契約番号001");
	DisposalList.setLineItemValue("date1", 1, "2013年5月31日");
	DisposalList.setLineItemValue("date2", 1, "2016年5月31日");
	DisposalList.setLineItemValue("text3", 1, "物件A");
	DisposalList.setLineItemValue("text4", 1, "商品A");
	DisposalList.setLineItemValue("text6", 1, "申請太郎");
	DisposalList.setLineItemValue("text7", 1, "確認太郎");
	DisposalList.setLineItemValue("date3", 1, "2016年7月31日");
	
	DisposalList.setLineItemValue("text1", 2, "2 顧客二郎");
	DisposalList.setLineItemValue("text5", 2, "申請中");
	DisposalList.setLineItemValue("text2", 2, "契約番号567");
	DisposalList.setLineItemValue("date1", 2, "2010年2月28日");
	DisposalList.setLineItemValue("date2", 2, "2012年3月31日");
	DisposalList.setLineItemValue("text3", 2, "物件B");
	DisposalList.setLineItemValue("text4", 2, "商品C");
	DisposalList.setLineItemValue("text6", 2, "申請二郎");
	DisposalList.setLineItemValue("text7", 2, "確認二郎");
	DisposalList.setLineItemValue("date3", 2, "2016年8月31日");
	
	DisposalList.setLineItemValue("text1", 3, "3 顧客三郎");
	DisposalList.setLineItemValue("text5", 3, "確認済み");
	DisposalList.setLineItemValue("text2", 3, "契約番号234");
	DisposalList.setLineItemValue("date1", 3, "2000年5月31日");
	DisposalList.setLineItemValue("date2", 3, "2016年4月30日");
	DisposalList.setLineItemValue("text3", 3, "物件C");
	DisposalList.setLineItemValue("text4", 3, "商品C");
	DisposalList.setLineItemValue("text6", 3, "申請二郎");
	DisposalList.setLineItemValue("text7", 3, "確認三郎");
	DisposalList.setLineItemValue("date3", 3, "2016年10月31日");

	DisposalList.setLineItemValue("text1", 4, "3 顧客四郎");
	DisposalList.setLineItemValue("text5", 4, "確認済み取消");
	DisposalList.setLineItemValue("text2", 4, "契約番号222");
	DisposalList.setLineItemValue("date1", 4, "2010年1月31日");
	DisposalList.setLineItemValue("date2", 4, "2015年4月30日");
	DisposalList.setLineItemValue("text3", 4, "物件D");
	DisposalList.setLineItemValue("text4", 4, "商品E");
	DisposalList.setLineItemValue("text6", 4, "申請四郎");
	DisposalList.setLineItemValue("text7", 4, "確認五郎");
	DisposalList.setLineItemValue("date3", 4, "2016年10月31日");
	
	response.writePage(MainForm);
}