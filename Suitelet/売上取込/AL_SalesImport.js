/*
 * ********************************************************************************
 * Script: AL_SalesImport.js
 * Description: 売上取込画面
 * Author: daisuke.otaka@globlway.co.jp
 * History:
 * Ver, Date
 * 0.1, 2016/06/01
 * ********************************************************************************
 */
function main(request, response)
{
    var salesImportForm = nlapiCreateForm("売上取込");

    var uploadSubmitButton  = salesImportForm.addSubmitButton("アップロード");

    var salesTypeField  = salesImportForm.addField("sales_type_field", "select", "ファイル種別");
    salesTypeField.addSelectOption("01","自動販売機");
    salesTypeField.addSelectOption("02","MA現場");

    var fileField  = salesImportForm.addField("file_field", "file", "売上データ");

    response.writePage(salesImportForm);
}
