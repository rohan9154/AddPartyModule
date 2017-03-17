/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(['ojs/ojcore', 'knockout', 'utils', 'data/data', 'mapping','ojs/ojrouter', 'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojpagingcontrol', 'ojs/ojpagingcontrol-model', 'ojs/ojbutton'],
        function (oj, ko, utils, data, mapping)
        {
            function PartyAddViewModel() {
                var self = this;
                self.recordAdded = ko.observable(false);
                
                 var jsonData = {
                        "partyid": "",
                        "accountnumber": "",
                        "accounttype": "",
                        "addressline1": "",
                        "addressline2": "",
                        "addressline3": "",
                        "addressline4": "",
                        "annualincome": "",
                        "applicationid": "",
                        "bureau": "",
                        "countrycode": "",
                        "countryofissue": "",
                        "creditscore": "",
                        "emailid": "",
                        "firstname": "",
                        "gender": "",
                        "hometelephone": "",
                        "idnumber": "",
                        "idtype": "",
                        "issuingauthority": "",
                        "lastname": "",
                        "mobilenumber": "",
                        "nationality": "",
                        "numberofdependents": "",
                        "occupationcode": "",
                        "partytype": "",
                        "placeofissue": "",
                        "privacyindicator": "",
                        "residencyindicatorunits": "",
                        "residencyindicatorvale": "",
                        "routingnumber": "",
                        "servingarmymember": "",
                        "ssnnumber": "",
                        "state": "",
                        "suffix": "",
                        "title": "",
                        "warveteran": "",
                        "workphone": "",
                        "zipcode": ""
                };
               self.Items= mapping.fromJS(jsonData);
               
                //ko.mapping.fromJS(jsonData, {}, self.Items);
                console.log(self.Items);
                //console.log(self.Items[1]);
                //self.Items[0].push(self.partyid);
                console.log(self.Items.partyid());
                
                

                
                



                self.buttonClick = function () {
                    
                    console.log(mapping);
                    self.Items = mapping.toJS(self.Items);
                    console.log(self.Items);
                    self.Items = mapping.toJSON(self.Items);
                    console.log(self.Items);
                   
//                    var jsonData = {
//                        "partyid": "CITI0009",
//                        "accountnumber": "4000000",
//                        "accounttype": "Saving",
//                        "addressline1": "80 Pittsford ",
//                        "addressline2": "Victor Rd #9",
//                        "addressline3": "Cleveland",
//                        "addressline4": "Cleveland",
//                        "annualincome": 150000,
//                        "applicationid": "15410",
//                        "bureau": "Y",
//                        "countrycode": "IN",
//                        "countryofissue": "IN",
//                        "creditscore": 800,
//                        "emailid": "adelina_nabours@gmail.com",
//                        "firstname": "Adelina",
//                        "gender": "M",
//                        "hometelephone": "258974562",
//                        "idnumber": "25987",
//                        "idtype": "Passport",
//                        "issuingauthority": "Passport Offcie",
//                        "lastname": "Nabours",
//                        "mobilenumber": "990250032",
//                        "nationality": "IN",
//                        "numberofdependents": 2,
//                        "occupationcode": "ABC",
//                        "partytype": "LEAD",
//                        "placeofissue": "Bangalore",
//                        "privacyindicator": null,
//                        "residencyindicatorunits": "4",
//                        "residencyindicatorvale": "4",
//                        "routingnumber": "1234567",
//                        "servingarmymember": "12345555",
//                        "ssnnumber": "98750250",
//                        "state": "KA",
//                        "suffix": "M",
//                        "title": "Mr",
//                        "warveteran": "1234",
//                        "workphone": "908066593532",
//                        "zipcode": "560017"
//        
//    };
//                    JSON.stringify(jsonData);
//                    console.log(jsonData);
//                    data.postData('http://129.146.22.78:31681/fsgbu/party/addparty', self.Items).then(function (data) {
//                        console.log(data);
//                    });
                    $.ajax({
                        url: "http://129.146.22.78:31681/fsgbu/party/addparty",
                        method: "POST",
                        data: self.Items,
                        dataType: 'json',
                        contentType: "application/json; charset=utf-8",
                        success: function(result,status,jqXHR ){
                        console.log(result);
                        console.log(status);
                        console.log(jqXHR);
                        self.recordAdded(true);
                    },
                        error(jqXHR, textStatus, errorThrown){
                        //Do something
                    }
                 }); 



                }



            }

            return PartyAddViewModel;
        });


