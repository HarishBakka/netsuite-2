/* *****************************************************************************
 * Script: AL_RoutePatrolImport.js
 * Description: AL_巡回ルート一括取込み画面
 * Author: shuji.nasu@globlway.co.jp
 * History:
 * Ver, Date
 * 0.1, 2016/06/06
 * ************************************************************************** */

function RoutePatrolImport(request, response){

	if(request.getMethod() == "GET"){

		var RoutePI = nlapiCreateForm("巡回ルート一括取込み");
		var routefield = RoutePI.addField("file_field", "file", "巡回ルートCSVファイル");

		RoutePI.addSubmitButton("アップロード");
	
		response.writePage(RoutePI);

     }


	if(request.getMethod() == "POST"){
eeeeeeeeeee
		var RoutePI = nlapiCreateForm("巡回ルート一括取込み");
		RoutePI.addSubmitButton("アップロード");
	
		response.writePage(RoutePI);



 }
}