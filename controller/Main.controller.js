sap.ui.define(["sap/ui/core/mvc/Controller", "ec/log/integrations/ECLogIntegrations/model/formatter"], function(e, t) {
    "use strict";
    return e.extend("ec.log.integrations.ECLogIntegrations.controller.Main", {
        formatter: t,
        onInit: function() {
            var e = (new Date).toISOString().slice(0, 10);
            this.getView().byId("inputDate").setValue(e);
            this.getDadosECC("buscaLogs")
        },
        buscaRegistros: function() {
            this.getDadosECC("buscaLogs")
        },
        getFilters: function() {
            var e;
            var t = this.getView().byId("inputDate").getValue();
            if (t) {
                t = t.replace(/\//g, "-");
                e = "Data ge datetime'" + t + "T00:00:00.0' and Data le datetime'" + t + "T23:59:59.9'"
            }
            var s = this.getView().byId("inputEmpresa").getValue();
            if (s) {
                if (e) {
                    e = e + " and ";
                    e = e + "CompanyCode eq '" + s + "'"
                } else e = "CompanyCode eq '" + s + "'"
            }
            var o = this.getView().byId("inputProcesso").getSelectedKey();
            if (o) {
                if (e) {
                    e = e + " and ";
                    e = e + "Processo eq '" + o + "'"
                } else e = "Processo eq '" + o + "'"
            }
            var a = this.getView().byId("inputID").getValue();
            if (a) {
                if (e) {
                    e = e + " and ";
                    e = e + "IdProcesso eq '" + a + "'"
                } else e = "IdProcesso eq '" + a + "'"
            }
            return e
        },
        getDadosECC: function(e) {
            var t = this.getOwnerComponent().getModel();
            var s;
            var o = this;
            var a;
            if (e === "buscaLogs") {
                a = this.getFilters();
                s = "/logs"
            }
            if (!a) {
                sap.m.MessageToast.show("Preencher pelo menos um campo de pesquisa");
                return
            }
            this.getView().byId("tableLogs").setBusy(true);
            t.removeData();
            t.read(s, {
                urlParameters: {
                    $orderby: "Data desc",
                    $filter: a
                },
                method: "GET",
                success: function(e) {
                    o.getView().byId("tableLogs").setBusy(false);
                    var t;
                    t = new sap.ui.model.json.JSONModel(e);
                    o.getView().setModel(t, "logs")
                },
                error: function() {
                    o.getView().byId("tableLogs").setBusy(false);
                    sap.m.MessageToast.show("Erro na conexão com o ECC")
                }
            })
        }
    })
});