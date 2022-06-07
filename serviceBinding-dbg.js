function initModel() {
	var sUrl = "/sap/opu/odata/sap/ZGWGLHR_TAB_LOG_EC_INTERFACES_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}