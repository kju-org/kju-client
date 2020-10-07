var KJU = require('./index.js');

var kju = new KJU();

//kju.logsEnabled = false;

kju.redeemResponse({
    msgId: "5f7da93df0681aa7fd292e51",
    respId: "Yes",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtc2dJZCI6IjVmN2RhOTNkZjA2ODFhYTdmZDI5MmU1MSIsIm1lc3NhZ2VUYWciOiI0UmpCS3lveVUiLCJwcml2IjoicmVkZWVtIiwiaWF0IjoxNjAyMDcwODQ1fQ.5fOiMSd2SzEO8S9kdq_Ah2rJCxpSjV84pKUpgesvosQ"
}, function(data) {
    console.log(data)

})