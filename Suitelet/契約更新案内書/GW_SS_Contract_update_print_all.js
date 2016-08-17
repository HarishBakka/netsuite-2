/**
 * Module Description
 *
 * Version    Date            Author           Remarks
 * 1.00       06 Jul 2016     todate
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function residentcardPrintGW(request, response){
	var listid = request.getParameter("listid");
	var lengthlist = listid.length;
	var countlist = 0;
	var arrayid = [];
	var start =0;
	for(var i=0;i < lengthlist; i++){
		if(listid[i]==','){
			arrayid[countlist] = listid.substring(start, i);
			start = i+1;
			countlist++;
		}
	}
	arrayid[countlist] = listid.substring(start);
	countlist++;
	var xml="<?xml version=\"1.0\"?><!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\r\n"+
	  "<pdf>\r\n"+
	  "  <head>\r\n" +
	  "<macrolist>" +
	  	"<macro id=\"nlfooter\">" +
	  		"<table align=\"right\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:90%;\" table-height=\"30px\"><tr>" +
	  				"<td><img src=\"https://debugger.sandbox.netsuite.com/core/media/media.nl?id=697&amp;c=4141596&amp;h=f5f5d46dcae65f75d1b2&amp;whence=\" style=\"float: right; width: 50px; height: 50px; margin: 5px;\" /></td>" +
	  				"<td align=\"right\"><p align=\"right\">エリアリング会社<br />東京2-4-1<br />ダウィンチ小川町2F<br />TEL:03-5577-9220<br />FAX:03-5577-9221<br />http://www.hello-storage.com</p></td>" +
	  				"</tr></table>" +
	  	"</macro>" +
	  " </macrolist>"+  
	  "    <style type=\"text/css\">table {\r\n"+
	  "      font-family: heiseimin, sans-serif;\r\n"+
	  "      font-size: 9pt;\r\n"+
	  "      table-layout: fixed;\r\n"+
	  "      }\r\n"+
	  "      td {\r\n"+
	  "      padding: 4px 6px;\r\n"+
	  "      vertical-align: middle;\r\n"+
	  "      }\r\n"+
	  "      table.header td {\r\n"+
	  "      padding: 0;\r\n"+
	  "      font-size: 10pt;\r\n"+
	  "      }\r\n"+
	  "      table.footer td {\r\n"+
	  "      padding: 0;\r\n"+
	  "      font-size: 8pt;\r\n"+
	  "      }\r\n"+
	  "      table.itemtable th {\r\n"+
	  "      padding-bottom: 10px;\r\n"+
	  "      padding-top: 10px;\r\n"+
	  "      }\r\n"+
	  "      table.body td {\r\n"+
	  "      padding-top: 2px;\r\n"+
	  "      }\r\n"+
	  "      td.fixborder {\r\n"+
	  "      border-left: 0.5;\r\n"+
	  "      border-right: 0.5;\r\n"+
	  "      border-bottom: 0.5;\r\n"+
	  "      }\r\n"+
	  "      td.leftrightborder {\r\n"+
	  "      border-left: 0.5;\r\n"+
	  "      border-right: 0.5;\r\n"+
	  "      }\r\n"+
	  "      td.kana {\r\n"+
	  "      font-size: 6pt;\r\n"+
	  "      height: 7pt;\r\n"+
	  "      vertical-align: bottom;\r\n"+
	  "      padding: 2px 6px;\r\n"+
	  "      }\r\n"+
	  "      td.fixborderleft {\r\n"+
	  "      border-left: 0.5;\r\n"+
	  "      border-bottom: 0.5;\r\n"+
	  "      }\r\n"+
	  "      span.title {\r\n"+
	  "        font-size: 20pt;\r\n"+
	  "      }\r\n"+
	  "      .margin {\r\n"+
	  "        margin-top: 2cm;\r\n"+
	  "      }\r\n"+
	  "    </style>\r\n"+
	  "  </head>\r\n"
	 +"<body header=\"nlheader\" header-height=\"0%\" footer=\"nlfooter\" footer-height=\"50pt\" padding=\"0.5in 0.5in 0.3in 1in\" size=\"A4\">";
	for(var i=0; i< countlist ;i++){
			var rec= nlapiLoadRecord('customrecord_gw_contracth',arrayid[i]);
			var recCustomer = nlapiLoadRecord('customer',rec.getFieldValue('custrecord_gw_customer'));
			xml += createFormat(rec, recCustomer);
	}
	xml+= "</body>"+
	 "</pdf>";
	var xml_file = nlapiCreateFile('contract_xml_pdf.txt','PLAINTEXT',xml);
	xml_file.setFolder(1362);
	nlapiSubmitFile(xml_file);
    var file = nlapiXMLToPDF(xml);
    response.setContentType('PDF', 'aaaaaa.pdf', 'inline');
    response.write(file.getValue()); 
}
function createFormat(rec, recCustomer){
	var column = {};
	column['date'] = rec.getFieldValue('custrecord_gw_contract_end_date');
	column['cusname'] = recCustomer.getFieldValue('phoneticname');
	column['postalcode'] = recCustomer.getFieldValue('custentity_gw_postal_code');
	column['cusaddress'] = recCustomer.getFieldValue('defaultaddress');
	column['propertyname'] = rec.getFieldValue('custrecord_gw_property_name');
	column['tourokubango'] = rec.getFieldValue('name');
	column['goodsname'] = rec.getFieldValue('custrecord_gw_goods_name');
	
	var day = new Date(column['date']);
	var contractEndMonth = day.getMonth()+1;
	var contractUpdateMonth = day.getMonth()+2;
	
	 var xml = 
	 "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width: 90%;\"><tr>" +
	  "<td align=\"right\">発効日平成 "+dateFormat(getNowDateJP())+"</td>" +
	  		"</tr>" +
	  		"<tr>" +
	  		"<td>〒 "+column['postalcode']+"</td>" +
	  		"</tr>" +
	  		"<tr>" +
	  		"<td>"+column['cusaddress']+"</td>" +
	  		"</tr></table>" +
	  		"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;\"><tr>" +
	  				"<td>&nbsp;</td>" +
	  		"</tr></table>" +
	  		"<table border=\"0\" cellpadding=\"0\" cellspacing=\"50\" style=\"width: 100%;\"><tr>" +
	  				"<td><table border=\"0\" cellpadding=\"3\" style=\"width:100%;\"> "+
	  					"<tr>"+
	  						"<td style=\"text-align: right;\">"+column['cusname']+"&nbsp;御中</td>"+
	  					"</tr>"+
	  					"<tr>"+
	  						"<td><barcode codetype=\"code128\" showtext=\"false\" value=\"null\"/></td>"+
	  					"</tr>"+
	  		
	  				"</table>" +
	  				"</td >" + 
	  				"<td rowspan=\"2\">" +
	  					"<table border=\"0\" cellpadding=\"3\">"+
	  						"<tr>"+
	  							"<td border-bottom=\"0.5\">"+column['propertyname']+"</td>"+
	  						"</tr>" +
	  						"<tr>"+
	  							"<td border-bottom=\"0.5\">コンテナタイプ</td>"+
	  						"</tr>"+
	  						"<tr>"+
	  							"<td border-bottom=\"0.5\">"+column['goodsname']+"</td>"+
	  						"</tr>"+
	  				"</table></td>" +
	  				"</tr>" +
	  				"<tr>"+
	  					"<td><p align=\"right\" padding-right=\"20px\">登録番号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+column['tourokubango']+"</p>"+
	  						
	  					"</td>"+
	  				"</tr>"+
	  				"</table>" +
	 "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;\"><tr>"+
		"<td>&nbsp;</td>"+
		"</tr></table>" +
		"<table border=\"0\" cellpadding=\"5\" cellspacing=\"0\" style=\"width: 100%;\"><tr>" +
		"<td align=\"center\"><span style=\"font-size:14px;\"><b>契約更新案内書</b></span></td>" +
		"</tr></table>"+
		"<table align=\"center\" style=\"width: 80%;\"><tr>" +
		"<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; へいは格別のご高配を賜り、厚く御礼申し上げます。<br />さた、ご利用頂いておりますレンタルサービスが平成"+contractUpdateMonth+"月 1日もって契約更新となります。<br />つぎますては、"+contractEndMonth+"月のお支払い。("+contractUpdateMonth+"月分）以下の通りとなりますので、ご案内申し上げます。<br />ご査収のほど宜しくお願い申し上げます。<br /></td>" +
		"</tr></table>" +
		"<table align=\"center\" cellpadding=\"0\" style=\"width:35%;\"><tr>" +
		"<td align=\"left\" border-bottom=\"0.5\"><span>語受け金額　５７，９６０円 </span></td>" +
		"</tr></table>" +
		"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"height:4px;width:100%;\"><tr>" +
		"<td>&nbsp;</td>" +
	    "</tr></table>" +
		"<table align=\"center\" border=\"0.5\" style=\"width: 60%;\">" +
				"<thead>" +
				"<tr>" +
				"<th align=\"center\" border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\" scope=\"col\" style=\"background-color: rgb(204, 204, 204);\">請求内容</th>" +
						"<th align=\"center\" border-bottom=\"0.5\" colspan=\"3\" scope=\"col\" style=\"background-color: rgb(204, 204, 204);\">金額</th>" +
								"</tr>" +
								"</thead><tr>" +
								"<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\">使用料(コンテナ）　０１月分</td>" +
										"<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\">３７，２００円</td>" +
												"</tr>"+
										"<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\" style=\"background-color: rgb(204, 204, 204);\">使用料(コンテナ）　０１月分</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\" style=\"background-color: rgb(204, 204, 204);\">２，１００円</td>"+
										"	</tr>"+
										"	<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\">使用料(コンテナ）</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\">１８，６００円</td>"+
										"	</tr>"+
										"<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\" style=\"background-color: rgb(204, 204, 204);\">&nbsp;</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\" style=\"background-color: rgb(204, 204, 204);\">&nbsp;</td>"+
										"	</tr>"+
										"	<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\">&nbsp;</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\">&nbsp;</td>"+
										"	</tr>"+
										"<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\" style=\"background-color: rgb(204, 204, 204);\">&nbsp;</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\" style=\"background-color: rgb(204, 204, 204);\">&nbsp;</td>"+
										"	</tr>"+
										"	<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\">&nbsp;</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\">&nbsp;</td>"+
										"	</tr>"+
										"<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\" style=\"background-color: rgb(204, 204, 204);\">&nbsp;</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\" style=\"background-color: rgb(204, 204, 204);\">&nbsp;</td>"+
										"	</tr>"+
										"	<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\">&nbsp;</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\">&nbsp;</td>"+
										"	</tr>"+
										"<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\" style=\"background-color: rgb(204, 204, 204);\">&nbsp;</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\" style=\"background-color: rgb(204, 204, 204);\">&nbsp;</td>"+
										"	</tr>"+
										"	<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\">&nbsp;</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\">&nbsp;</td>"+
										"	</tr>"+
										"<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\" style=\"background-color: rgb(204, 204, 204);\">&nbsp;</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\" style=\"background-color: rgb(204, 204, 204);\">&nbsp;</td>"+
										"	</tr>"+
										"	<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\">&nbsp;</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\">&nbsp;</td>"+
										"	</tr>"+
										"<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\" style=\"background-color: rgb(204, 204, 204);\">&nbsp;</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\" style=\"background-color: rgb(204, 204, 204);\">&nbsp;</td>"+
										"	</tr>"+
										"	<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\">&nbsp;</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\">&nbsp;</td>"+
										"	</tr>"+
										"<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\" style=\"background-color: rgb(204, 204, 204);\">&nbsp;</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\" style=\"background-color: rgb(204, 204, 204);\">&nbsp;</td>"+
										"	</tr>"+
										"	<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\">&nbsp;</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\">&nbsp;</td>"+
										"	</tr>"+
										"<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\" style=\"background-color: rgb(204, 204, 204);\">&nbsp;</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\" style=\"background-color: rgb(204, 204, 204);\">&nbsp;</td>"+
										"	</tr>"+
										"	<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\">&nbsp;</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\">&nbsp;</td>"+
										"	</tr>"+
										"<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\" style=\"background-color: rgb(204, 204, 204);\">&nbsp;</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\" style=\"background-color: rgb(204, 204, 204);\">&nbsp;</td>"+
										"	</tr>"+
										"	<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\">&nbsp;</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\">&nbsp;</td>"+
										"	</tr>"+
										"<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\" style=\"background-color: rgb(204, 204, 204);\">&nbsp;</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\" style=\"background-color: rgb(204, 204, 204);\">&nbsp;</td>"+
										"	</tr>"+
										"	<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\">&nbsp;</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\">&nbsp;</td>"+
										"	</tr>"+
										"<tr>"+
										"	<td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"7\" style=\"background-color: rgb(204, 204, 204);\">&nbsp;</td>"+
										"	<td align=\"right\" border-bottom=\"0.5\" colspan=\"3\" style=\"background-color: rgb(204, 204, 204);\">&nbsp;</td>"+
										"	</tr>"+
										"	<tr>"+
										"	<td border-right=\"0.5\" colspan=\"7\">&nbsp;</td>"+
										"	<td align=\"right\" colspan=\"3\">&nbsp;</td>"+
										"	</tr>"+
										"</table>"+
										"<table align=\"right\" width=\"80%\"><tr>" +
								 		"<td><br />※2015年4月25日より。。。<br />※示される帳票レイアウトで出力する。<br />※番号と枠がある情報については、システムから</td>" +
								 		"</tr></table>"+
										"<table><tr>"+
										"	<td>なお請求内容請求内請求内容、<br />ご査収のほど宜しくお願い申し上げます。<br />&nbsp;</td>"+
										"	</tr></table>";
	return xml;
}


