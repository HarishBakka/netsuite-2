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
	var tranid = request.getParameter('tranid');
    var rec = nlapiLoadRecord('customrecord_gw_residentcard_application', tranid);
    var recCustomer = nlapiLoadRecord('customer', rec.getFieldValue('custrecord_gw_residentcard_app_customer'));
    var recOther = nlapiLoadRecord('customrecord_gw_report_words', 1);

    var xml = createFormat(rec, recCustomer, recOther);

    var file = nlapiXMLToPDF( xml );
    response.setContentType('PDF', tranid + '.pdf', 'inline');
//    response.setContentType('PDF', 'aaaaaa.pdf', 'inline');
//    response.setEncoding('SHIFT_JIS');
//    var printCount=rec.getFieldValue('custrecord_gw_residentcard_app_pricount');
//    printCount++;
//    nlapiLogExecution('DEBUG','request',request.getMethod());
//    rec.setFieldValue('custrecord_gw_residentcard_app_pricount',printCount);
//    nlapiSubmitRecord(rec);
    response.write(file.getValue());
}

function createFormat(rec, recCustomer, recOther) {
		var url_image ="https://debugger.sandbox.netsuite.com/core/media/media.nl?id=697&amp;c=4141596&amp;h=f5f5d46dcae65f75d1b2&amp;whence=";

		var sheikyuriyu = "&nbsp;&nbsp;&nbsp;&nbsp;信務者と連絡不能、現住所確認のため<br />"+
			"&nbsp;&nbsp;&nbsp;&nbsp;信務不能行、未支払いのため<br />"+
			"※この請求で取得した住民票(または除票)の写しを請求目的以外で使用しないことを警約します。"

		var columns = {};
		columns['name'] = recCustomer.getFieldValue('lastname') + ' ' + recCustomer.getFieldValue('firstname');
		columns['kana'] = recCustomer.getFieldValue('phoneticname');
		columns['seinen'] = "西暦&nbsp;&nbsp;&nbsp;&nbsp;"+ dateFormat(recCustomer.getFieldValue('custentity_gw_dateofbirth'))+"生の世帯の一部";
		columns['yusho'] = rec.getFieldValue('custrecord_gw_residentcard_app_employee');
		columns['jusho'] = rec.getFieldValue('custrecord_gw_residentcard_app_emp_add');
		columns['jusho1']	= rec.getFieldValue('custrecord_gw_residentcard_app_cust_add');

		columns['jushohojin'] = getMaster(1,'J1');
		columns['shimeihojin'] = getMaster(1,'J2');
		columns['hitsuyonamono'] = getMaster(1,'J3');
		columns['honjinkakunin'] = getMaster(1,'J4');
		columns['sheikyuriyu'] = getMaster(1,'J7');
		columns['footercontent'] = getMaster(1,'J5');
		columns['denwabango'] = getMaster(1,'J6');
		columns['hojinname'] = getMaster(1,'J8');

	 	var xml = "<?xml version=\"1.0\"?><!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\r\n"+
	  "<pdf>\r\n"+
	  "  <head>\r\n"+
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
	  "  </head>\r\n"+
	  "  <body header=\"nlheader\" header-height=\"10%\" footer=\"nlfooter\" footer-height=\"20pt\" padding=\"0.5in 0.5in 0.5in 0.5in\" size=\"A4\">\r\n"+
	  "    <table style=\"width: 100%;\"><tr><td align=\"center\"><span class=\"title\"><b>住民票写し等交付請求書</b></span></td></tr></table>\r\n"+
	  "    <br />\r\n"+
	  "    <table style=\"width: 100%;\"><tr><td align=\"right\">"+dateFormat(getNowDateJP())+"</td></tr></table>\r\n"+
	  "\r\n"+
	  "    <table class=\"itemtable\" height=\"350\" width=\"100%\">\r\n"+
	  "      <tr>\r\n"+
	  "        <td class=\"fixborderleft\" border-top=\"0.5\" colspan=\"2\">必要な方の情報</td>\r\n"+
	  "        <td border-left=\"0.5\" border-bottom=\"0.5\" colspan=\"8\">&nbsp;</td>\r\n"+
	  "      </tr>\r\n"+
	  "      <tr>\r\n"+
	  "        <td class=\"fixborderleft\" colspan=\"2\">住所</td>\r\n"+
	  "        <td class=\"fixborder\" colspan=\"8\">"+ stringToXMLTag(columns['jusho1'])+ "</td>\r\n"+
	  "      </tr>\r\n"+
	  "      <tr>\r\n"+
	  "        <td class=\"fixborderleft\" rowspan=\"2\" colspan=\"2\">氏名</td>\r\n"+
	  "        <td class=\"leftrightborder kana\" colspan=\"8\">"+ columns['kana'] +"</td>\r\n"+
	  "      </tr>\r\n"+
	  "      <tr>\r\n"+
	  "        <td class=\"fixborder\" colspan=\"8\">"+ columns['name'] +"</td>\r\n"+
	  "      </tr>\r\n"+
	  "      <tr>\r\n"+
	  "        <td class=\"fixborderleft\" colspan=\"2\">生年月日</td>\r\n"+
	  "        <td class=\"fixborder\" colspan=\"8\" align=\"left\" >" + columns['seinen'] + "</td>\r\n"+
	  "      </tr>\r\n"+
	  "      <tr>\r\n"+
	  "        <td class=\"fixborderleft\" colspan=\"2\">必要なもの</td>\r\n"+
	  "        <td class=\"fixborder\" colspan=\"8\">"+ columns['hitsuyonamono'] +"</td>\r\n"+
	  "      </tr>\r\n"+
	  "      <tr>\r\n"+
	  "        <td class=\"fixborderleft\" colspan=\"2\">&nbsp;</td>\r\n"+
	  "        <td class=\"fixborder\" colspan=\"8\">&nbsp;</td>\r\n"+
	  "      </tr>\r\n"+
	  "      <tr>\r\n"+
	  "        <td class=\"fixborderleft\" colspan=\"2\">請求する者（法人）</td>\r\n"+
	  "        <td class=\"fixborder\" colspan=\"8\">&nbsp;</td>\r\n"+
	  "      </tr>\r\n"+
	  "      <tr>\r\n"+
	  "        <td class=\"fixborderleft\" colspan=\"2\">住所</td>\r\n"+
	  "        <td class=\"fixborder\" colspan=\"8\">"+stringToXMLTag(columns['jushohojin'])+"</td>\r\n"+
	  "      </tr>\r\n"+
	  "      <tr>\r\n"+
	  "        <td class=\"fixborderleft\" colspan=\"2\" rowspan=\"2\">氏名（法人）</td>\r\n"+
	  "        <td border-left=\"0.5\" colspan=\"6\">"+stringToXMLTag(columns['shimeihojin'])+"</td>\r\n"+
	  "        <td border-right=\"0.5\" colspan=\"2\"></td>\r\n"+
	  "      </tr>\r\n"+
	  "      <tr>\r\n"+
	  "        <td class=\"fixborderleft\" colspan=\"6\">"+columns['hojinname']+"</td>\r\n"+
	  "        <td border-right=\"0.5\" border-bottom=\"0.5\" colspan=\"2\">印</td>\r\n"+
	  "      </tr>\r\n"+
	  "      <tr>\r\n"+
	  "        <td class=\"fixborderleft\" colspan=\"2\">電話番号</td>\r\n"+
	  "        <td class=\"fixborder\" colspan=\"8\">"+ columns['denwabango'] +"</td>\r\n"+
	  "      </tr>\r\n"+
	  "      <tr>\r\n"+
	  "        <td class=\"fixborderleft\" colspan=\"2\">請求理由</td>\r\n"+
	  "        <td class=\"fixborder\" colspan=\"8\">"+stringToXMLTag(columns['sheikyuriyu'])+"</td>\r\n"+
	  "      </tr>\r\n"+
	  "      <tr>\r\n"+
	  "        <td class=\"fixborderleft\" colspan=\"2\">郵送請求担当者</td>\r\n"+
	  "        <td class=\"fixborderleft\" colspan=\"6\">"+columns['yusho']+"</td>\r\n"+
	  "        <td border-bottom=\"0.5\" border-right=\"0.5\" colspan=\"2\">印</td>\r\n"+
	  "      </tr>\r\n"+
	  "      <tr>\r\n"+
	  "        <td class=\"fixborderleft\" colspan=\"2\">住所</td>\r\n"+
	  "        <td class=\"fixborder\" colspan=\"8\">"+stringToXMLTag(columns['jusho'])+"</td>\r\n"+
	  "      </tr>\r\n"+
	  "      <tr>\r\n"+
	  "        <td class=\"fixborderleft\" colspan=\"2\">本人確認</td>\r\n"+
	  "        <td class=\"fixborder\" colspan=\"8\">"+columns['honjinkakunin']+"</td>\r\n"+
	  "      </tr></table>\r\n"+
	  "			 <div class=\"margin\">  </div>\r\n"+
	  "      <table style=\"width: 100%;\"><tr><td><span>"+stringToXMLTag(columns['footercontent'])+"</span></td></tr></table>\r\n"+
	  "      <br/>\r\n"+
	  "    </body>\r\n"+
	  "  </pdf>"
	  return xml;
	}

function getMaster(recordId, fieldId){
	var filter = new Array();
	filter[0] = new nlobjSearchFilter('custrecord_gw_report_words_type', null, 'is', recordId);
	filter[1] = new nlobjSearchFilter('custrecord_gw_report_words_field_id', null, 'is', fieldId);

	var col = new Array();
	col[0] = new nlobjSearchColumn('custrecord_gw_report_words_field_value');

	var result = nlapiSearchRecord('customrecord_gw_report_words', null, filter, col);
	if (result != null){
		return result[0].getValue('custrecord_gw_report_words_field_value');
	}
	return '';
}
