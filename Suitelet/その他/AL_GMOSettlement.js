/*
 * ********************************************************************************
 * Script: AL_GMOSettlement.js
 * Description: �������ό���/���ւ�����(GMO)���
 * Author: shuji.nasu@globlway.co.jp
 * History:
 * Ver, Date
 * 0.1, 2016/06/04
 * ********************************************************************************
 */
function GMOSettlement(request, response)
{

    var gmo = nlapiCreateForm(" �������ό���/���ւ�����(GMO)");
�@ var gmofield = gmo.addField("file_field", "file", "GMO�N���W�b�g���ό��ʎ捞��");

    gmo.addSubmitButton("�A�b�v���[�h");
    response.writePage(gmo);
}
