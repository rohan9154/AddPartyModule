define(['ojs/ojcore', 'jquery', 'knockout', 'ojs/ojmodel'], function (oj, $, ko ) {

    var PartyFactory = {

        createPartyModel: function (partyId, partyname, url) {
            var resourceUrl = url + "/fsgbu/party/match" ;
            console.log(partyId);
            console.log(partyname);
            console.log(resourceUrl);            
            var Party = oj.Model.extend({urlRoot: resourceUrl ,idAttribute: partyname});
            return new Party();
            

        },
        fetchUrl : function () {
            var id = null;
            var uri = "http://129.146.1.229:31490/fsgbu/10.0.0.71:2394/default/party-service";
            var serviceUrl = oj.Model.extend({urlRoot: uri, idAttribute: id});
            return new serviceUrl();
            
       
       }
    }
    return PartyFactory;
});