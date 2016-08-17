/*
 * ********************************************************************************
 * Script: AL_DisposalRequest.js
 * Description: 荷処分確認依頼画面
 * Author: shuji.nasu@globlway.co.jp
 * History:
 * Ver, Date
 * 0.1, 2016/06/03
 * ********************************************************************************
 */
function DisposalRequest(request, response){
	
	var MainForm = nlapiCreateForm("荷処分確認依頼");

	MainForm.addSubmitButton("確認依頼");
	MainForm.addResetButton("依頼取消");
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
	DisposalList.addField("date4", "date", "確認日");
	
	DisposalList.setLineItemValue("text1", 1, "1 顧客太郎");
	DisposalList.setLineItemValue("text5", 1, "未確認");
	DisposalList.setLineItemValue("text2", 1, "契約番号001");
	DisposalList.setLineItemValue("date1", 1, "2013年5月31日");
	DisposalList.setLineItemValue("date2", 1, "2016年5月31日");
	DisposalList.setLineItemValue("text3", 1, "物件A");
	DisposalList.setLineItemValue("text4", 1, "商品A");
	DisposalList.setLineItemValue("text6", 1, "申請太郎");
	DisposalList.setLineItemValue("text7", 1, "");
	DisposalList.setLineItemValue("date3", 1, "");
	DisposalList.setLineItemValue("date4", 1, "");

	DisposalList.setLineItemValue("text1", 2, "2 顧客二郎");
	DisposalList.setLineItemValue("text5", 2, "未確認");
	DisposalList.setLineItemValue("text2", 2, "契約番号567");
	DisposalList.setLineItemValue("date1", 2, "2010年2月28日");
	DisposalList.setLineItemValue("date2", 2, "2012年3月31日");
	DisposalList.setLineItemValue("text3", 2, "物件B");
	DisposalList.setLineItemValue("text4", 2, "商品C");
	DisposalList.setLineItemValue("text6", 2, "申請太郎");
	DisposalList.setLineItemValue("text7", 2, "");
	DisposalList.setLineItemValue("date3", 2, "");
	DisposalList.setLineItemValue("date4", 2, "");
	
	DisposalList.setLineItemValue("text1", 3, "3 顧客三郎");
	DisposalList.setLineItemValue("text5", 3, "未確認");
	DisposalList.setLineItemValue("text2", 3, "契約番号234");
	DisposalList.setLineItemValue("date1", 3, "2000年5月31日");
	DisposalList.setLineItemValue("date2", 3, "2016年4月30日");
	DisposalList.setLineItemValue("text3", 3, "物件C");
	DisposalList.setLineItemValue("text4", 3, "商品C");
	DisposalList.setLineItemValue("text6", 3, "申請太郎");
	DisposalList.setLineItemValue("text7", 3, "");
	DisposalList.setLineItemValue("date3", 3, "");
	DisposalList.setLineItemValue("date4", 3, "");

	DisposalList.setLineItemValue("text1", 4, "4 顧客四郎");
	DisposalList.setLineItemValue("text5", 4, "差戻");
	DisposalList.setLineItemValue("text2", 4, "契約番号765");
	DisposalList.setLineItemValue("date1", 4, "2000年2月1日");
	DisposalList.setLineItemValue("date2", 4, "2016年8月30日");
	DisposalList.setLineItemValue("text3", 4, "物件D");
	DisposalList.setLineItemValue("text4", 4, "商品D");
	DisposalList.setLineItemValue("text6", 4, "申請太郎");
	DisposalList.setLineItemValue("text7", 4, "確認太郎");
	DisposalList.setLineItemValue("date3", 4, "2016年5月31日");
	DisposalList.setLineItemValue("date4", 4, "");

	DisposalList.setLineItemValue("text1", 5, "5 顧客五郎");
	DisposalList.setLineItemValue("text5", 5, "取消");
	DisposalList.setLineItemValue("text2", 5, "契約番号100");
	DisposalList.setLineItemValue("date1", 5, "2010年6月1日");
	DisposalList.setLineItemValue("date2", 5, "2016年6月30日");
	DisposalList.setLineItemValue("text3", 5, "物件E");
	DisposalList.setLineItemValue("text4", 5, "商品E");
	DisposalList.setLineItemValue("text6", 5, "申請太郎");
	DisposalList.setLineItemValue("text7", 5, "確認太郎");
	DisposalList.setLineItemValue("date3", 5, "2016年5月31日");
	DisposalList.setLineItemValue("date4", 5, "");

	DisposalList.setLineItemValue("text1", 6, "6 顧客六郎");
	DisposalList.setLineItemValue("text5", 6, "申請中");
	DisposalList.setLineItemValue("text2", 6, "契約番号333");
	DisposalList.setLineItemValue("date1", 6, "2011年1月1日");
	DisposalList.setLineItemValue("date2", 6, "2016年4月30日");
	DisposalList.setLineItemValue("text3", 6, "物件E");
	DisposalList.setLineItemValue("text4", 6, "商品E");
	DisposalList.setLineItemValue("text6", 6, "申請太郎");
	DisposalList.setLineItemValue("text7", 6, "確認太郎");
	DisposalList.setLineItemValue("date3", 6, "2016年5月31日");
	DisposalList.setLineItemValue("date4", 6, "");
	
	response.writePage(MainForm);
}
