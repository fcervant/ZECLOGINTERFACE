sap.ui.define(["sap/ui/test/Opa5"],function(t){"use strict";return t.extend("ec.log.integrations.ECLogIntegrations.test.integration.arrangements.Startup",{iStartMyApp:function(t){var n=t||{};n.delay=n.delay||50;this.iStartMyUIComponent({componentConfig:{name:"ec.log.integrations.ECLogIntegrations",async:true},hash:n.hash,autoWait:n.autoWait})}})});