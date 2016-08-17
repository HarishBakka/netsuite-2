/*
 * ********************************************************************************
 * Script: AL_PaymentImport.js
 * Description: 入金取込画面
 * Author: daisuke.otaka@globlway.co.jp
 * History:
 * Ver, Date
 * 0.1, 2016/06/01
 * ********************************************************************************
 */
function main(request, response)
{
    var HEIGHT = "1";
    var WIDTH = "500";
    
    var paymentImportForm = nlapiCreateForm("入金取込");

    var uploadSubmitButton  = paymentImportForm.addSubmitButton("アップロード");

    var paymentTypeField  = paymentImportForm.addField("payment_type_field", "select", "ファイル種別");
    paymentTypeField.addSelectOption("00","ファイル種別を選択");
    paymentTypeField.addSelectOption("01","三菱東京UFJ銀行");
    paymentTypeField.addSelectOption("02","三菱UFJファクター（口座引落）");
    paymentTypeField.addSelectOption("03","JACCS");
    paymentTypeField.addSelectOption("04","アプラス");
    paymentTypeField.addSelectOption("05","セディナ");
    paymentTypeField.addSelectOption("06","全保連");
    paymentTypeField.addSelectOption("07","三菱UFJファクター（コンビニ）");
    paymentTypeField.addSelectOption("08","GMO（クレジット）");

    var fileField  = paymentImportForm.addField("file_field", "file", "入金データ");
    fileField.setDisplaySize(WIDTH, HEIGHT);

    response.writePage(paymentImportForm);
}
