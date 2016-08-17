function testpdf(request, response) {

var strName = "<table rules=\"all\">";

strName += "<tr>";
strName += "<td>";
strName += "AL_BarcodePDF";
strName += "</td>";
strName += "</tr>";

strName += "<tr>";

   strName += "<td height=\"50\">";
   strName += "<barcode codetype=\"CODE128\" bar-width=\"0.6\" bar-height=\"0\" showtext=\"true\" value=\"" ;
   strName += "(91)908169-5011600000000004040320150726-1-111905-2";
   strName += "\"/>";
   strName += "</td>";

strName += "</tr>";

strName += "</table>";

var xml = "<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n";
xml += "<pdf>\n<body font-size=\"12\">\n<h3>Barcode PDF Example ver1.0</h3><br />\n";
xml += "<p></p>";
xml += strName;
xml += "</body>\n</pdf>";	

var file = nlapiXMLToPDF(xml);

response.setContentType('PDF', 'Print.pdf ', 'inline');
response.write(file.getValue());

}