/* *****************************************************************************
 * Script: AL_RoutePatrolImport.js
 * Description: AL_���񃋁[�g�ꊇ�捞�݉��
 * Author: shuji.nasu@globlway.co.jp
 * History:
 * Ver, Date
 * 0.1, 2016/06/06
 * ************************************************************************** */

function RoutePatrolImport(request, response){

	if(request.getMethod() == "GET"){

		var RoutePI = nlapiCreateForm("���񃋁[�g�ꊇ�捞��");
		var routefield = RoutePI.addField("file_field", "file", "���񃋁[�gCSV�t�@�C��");

		RoutePI.addSubmitButton("�A�b�v���[�h");
	
		response.writePage(RoutePI);

     }


	if(request.getMethod() == "POST"){
eeeeeeeeeee
		var RoutePI = nlapiCreateForm("���񃋁[�g�ꊇ�捞��");
		RoutePI.addSubmitButton("�A�b�v���[�h");
	
		response.writePage(RoutePI);



 }
}