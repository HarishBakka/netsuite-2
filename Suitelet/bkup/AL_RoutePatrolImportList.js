/*
 * ********************************************************************************
 * Script: AL_RoutePatrolImportList.js
 * Description: 巡回ルート一括取込済一覧画面
 * Author: shuji.nasu@globlway.co.jp
 * History:
 * Ver, Date
 * 0.1, 2016/06/20
 * ********************************************************************************
 */
function RoutePatrolImportList(request, response){

    var paymentListForm = nlapiCreateForm("巡回ルート一括取込み履歴");

    paymentListForm.addSubmitButton("戻る");

    var paymentSubList  = paymentListForm.addSubList("payment_sub_list", "staticlist", "巡回ルート一括取込済一覧");
    paymentSubList.addField("sub_list_importdate", "date", "取込日");
    paymentSubList.addField("sub_list_user", "text", "担当名");
    paymentSubList.addField("sub_list_file", "text", "ファイル名");
    paymentSubList.addField("sub_list_status", "text", "ステータス");
    
    paymentSubList.setLineItemValue("sub_list_importdate", 1, "2016年5月31日");
    paymentSubList.setLineItemValue("sub_list_user", 1, "取込太郎");
    paymentSubList.setLineItemValue("sub_list_file", 1, "AL_RoutePatrolImportList_20160531");
    paymentSubList.setLineItemValue("sub_list_status", 1, "取込済");
    
    paymentSubList.setLineItemValue("sub_list_importdate", 2, "2016年6月1日");
    paymentSubList.setLineItemValue("sub_list_user", 2, "取込二郎");
    paymentSubList.setLineItemValue("sub_list_file", 2, "AL_RoutePatrolImportList_20160601");
    paymentSubList.setLineItemValue("sub_list_status", 2, "取込済");
    
    paymentSubList.setLineItemValue("sub_list_importdate", 3, "2016年6月3日");
    paymentSubList.setLineItemValue("sub_list_user", 3, "取込三郎");
    paymentSubList.setLineItemValue("sub_list_file", 3, "AL_RoutePatrolImportList_20160603");
    paymentSubList.setLineItemValue("sub_list_status", 3, "取込済");
    
    paymentSubList.setLineItemValue("sub_list_importdate", 4, "2016年6月10日");
    paymentSubList.setLineItemValue("sub_list_user", 4, "取込四郎");
    paymentSubList.setLineItemValue("sub_list_file", 4, "AL_RoutePatrolImportList_20160610");
    paymentSubList.setLineItemValue("sub_list_status", 4, "取込済");
    
    paymentSubList.setLineItemValue("sub_list_importdate", 5, "2016年6月11日");
    paymentSubList.setLineItemValue("sub_list_user", 5, "取込五郎");
    paymentSubList.setLineItemValue("sub_list_file", 5, "AL_RoutePatrolImportList_20160611");
    paymentSubList.setLineItemValue("sub_list_status", 5, "取込エラー");
    
        
    response.writePage(paymentListForm);
}
