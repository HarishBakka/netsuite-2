/*
 * ********************************************************************************
 * Script: AL_RoutePatrolImportList.js
 * Description: ���񃋁[�g�ꊇ�捞�ψꗗ���
 * Author: shuji.nasu@globlway.co.jp
 * History:
 * Ver, Date
 * 0.1, 2016/06/20
 * ********************************************************************************
 */
function RoutePatrolImportList(request, response){

    var paymentListForm = nlapiCreateForm("���񃋁[�g�ꊇ�捞�ݗ���");

    paymentListForm.addSubmitButton("�߂�");

    var paymentSubList  = paymentListForm.addSubList("payment_sub_list", "staticlist", "���񃋁[�g�ꊇ�捞�ψꗗ");
    paymentSubList.addField("sub_list_importdate", "date", "�捞��");
    paymentSubList.addField("sub_list_user", "text", "�S����");
    paymentSubList.addField("sub_list_file", "text", "�t�@�C����");
    paymentSubList.addField("sub_list_status", "text", "�X�e�[�^�X");
    
    paymentSubList.setLineItemValue("sub_list_importdate", 1, "2016�N5��31��");
    paymentSubList.setLineItemValue("sub_list_user", 1, "�捞���Y");
    paymentSubList.setLineItemValue("sub_list_file", 1, "AL_RoutePatrolImportList_20160531");
    paymentSubList.setLineItemValue("sub_list_status", 1, "�捞��");
    
    paymentSubList.setLineItemValue("sub_list_importdate", 2, "2016�N6��1��");
    paymentSubList.setLineItemValue("sub_list_user", 2, "�捞��Y");
    paymentSubList.setLineItemValue("sub_list_file", 2, "AL_RoutePatrolImportList_20160601");
    paymentSubList.setLineItemValue("sub_list_status", 2, "�捞��");
    
    paymentSubList.setLineItemValue("sub_list_importdate", 3, "2016�N6��3��");
    paymentSubList.setLineItemValue("sub_list_user", 3, "�捞�O�Y");
    paymentSubList.setLineItemValue("sub_list_file", 3, "AL_RoutePatrolImportList_20160603");
    paymentSubList.setLineItemValue("sub_list_status", 3, "�捞��");
    
    paymentSubList.setLineItemValue("sub_list_importdate", 4, "2016�N6��10��");
    paymentSubList.setLineItemValue("sub_list_user", 4, "�捞�l�Y");
    paymentSubList.setLineItemValue("sub_list_file", 4, "AL_RoutePatrolImportList_20160610");
    paymentSubList.setLineItemValue("sub_list_status", 4, "�捞��");
    
    paymentSubList.setLineItemValue("sub_list_importdate", 5, "2016�N6��11��");
    paymentSubList.setLineItemValue("sub_list_user", 5, "�捞�ܘY");
    paymentSubList.setLineItemValue("sub_list_file", 5, "AL_RoutePatrolImportList_20160611");
    paymentSubList.setLineItemValue("sub_list_status", 5, "�捞�G���[");
    
        
    response.writePage(paymentListForm);
}
