/*
 * ********************************************************************************
 * Script: AL_GMOSettlement.js
 * Description: 月次決済結果/洗替え結果(GMO)画面
 * Author: shuji.nasu@globlway.co.jp
 * History:
 * Ver, Date
 * 0.1, 2016/06/04
 * ********************************************************************************
 */
function GMOSettlement(request, response)
{

    var gmo = nlapiCreateForm(" 月次決済結果/洗替え結果(GMO)");
　 var gmofield = gmo.addField("file_field", "file", "GMOクレジット決済結果取込み");

    gmo.addSubmitButton("アップロード");
    response.writePage(gmo);
}
