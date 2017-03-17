/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'utils', 'data/data', 'ojs/ojrouter', 'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojpagingcontrol', 'ojs/ojpagingcontrol-model', 'ojs/ojbutton'],
        function (oj, ko, utils, data)
        {
            function PartyViewModel() {
                var self = this;

                var defaultLayout = utils.readCookie('partyLayout');
                if (defaultLayout) {
                    self.partyLayoutType = ko.observable(defaultLayout);
                } else {
                    self.partyLayoutType = ko.observable('partyCardLayout');
                }
                self.allParty = ko.observableArray([]);
                self.ready = ko.observable(false);

                /*   data.fetchData('js/data/employees.json').then(function (people) {
                 self.allPeople(people.employees);
                 }).fail(function (error) {
                 console.log('Error in getting People data: ' + error.message);
                 });*/


                // data.fetchData('http://129.146.1.229:30805/fsgbu/party-service').then(function (etcdService) {

                //data.fetchData(location.protocol+'//'+location.hostname+':'+location.port+"/fsgbu/party-service").then(function (etcdService){

                console.log(location.protocol + '//' + location.hostname + ':' + location.port + "/fsgbu/party-service");

                data.fetchData('http://129.146.1.229:30102/party/match/a').then(function (parties) {
                    self.allParty(parties);
                });
                
               
                // });

                /* self.parsePeople = function (response) {
                 return response['employees'];
                 };*/

                self.parseParty = function (response) {
                    return response['parties'];
                };

                /*self.model = oj.Model.extend({
                 idAttribute: 'empId'
                 });*/

                self.model = oj.Model.extend({
                    idAttribute: 'id'
                });

                /* self.collection = new oj.Collection(null, {
                 url: 'js/data/employees.json',
                 model: self.model
                 });*/

                self.collection = new oj.Collection(null, {
                    url: 'js/data/parties.json',
                    model: self.model
                });

                self.nameSearch = ko.observable('');

                self.filteredAllParty = ko.computed(function () {
                    var partyFilter = new Array();

                    if (self.allParty().length !== 0) {
                        if (self.nameSearch().length === 0)
                        {
                            partyFilter = self.allParty();
                        } else {
                            ko.utils.arrayFilter(self.allParty(),
                                    function (r) {
                                        var token = self.nameSearch().toLowerCase();
                                        if (r.firstName.toLowerCase().indexOf(token) === 0 || r.lastName.toLowerCase().indexOf(token) === 0) {
                                            partyFilter.push(r);
                                        }
                                    });
                        }
                    }

                    self.ready(true);
                    return partyFilter;
                });

                /*  self.listViewDataSource = ko.computed(function () {
                 return new oj.ArrayTableDataSource(self.filteredAllPeople(), {idAttribute: 'empId'});
                 });*/

                self.listViewDataSource = ko.computed(function () {
                    return new oj.ArrayTableDataSource(self.filteredAllParty(), {idAttribute: 'id'});
                });

                self.cardViewDataSource = ko.computed(function () {
                    return new oj.PagingTableDataSource(self.listViewDataSource());
                });

                self.getPhoto = function (id) {
                    var src;
                    if (id < 200) {
                        src = 'css/images/people/' + id + '.png';
                    } else {
                        src = 'css/images/people/nopic.png';
                    }
                    return src;
                };

                self.getEmail = function (party) {
                    return "mailto:" + party.companyEmail + '@oracle.com';
                };

                self.getFacetime = function (emp) {
                    return "#";
                };

                self.getChat = function (emp) {
                    return "#";
                };

                self.getOrg = function (org, event) {
                    alert('This will take you to the Party page and highlight a party');
                };



                self.cardLayoutHandler = function () {
                    utils.createCookie('partyLayout', 'partyCardLayout');
                    self.partyLayoutType('partyCardLayout');
                };

                self.listLayoutHandler = function () {
                    utils.createCookie('partyLayout', 'partyListLayout');
                    self.partyLayoutType('partyListLayout');
                };

                self.loadPersonPage = function (party) {
                    if (party.id) {

                        history.pushState(null, '', 'index.html?root=details&pty=' + party.id);
                        oj.Router.sync();
                    } else {

                        oj.Router.rootInstance.go('details');
                    }
                };

                self.onEnter = function (data, event) {
                    if (event.keyCode === 13) {
                        var party = {};
                        party.id = data.id;
                        self.loadPersonPage(party);
                    }
                    return true;
                };

                self.changeHandler = function (page, event) {
                    if (event.option === 'selection') {
                        if (event.value[0]) {
                            var party = {};
                            party.id = event.value[0];
                            self.loadPersonPage(party);
                        }
                    }
                };



                self.buttonClick = function (data, event) {
                    oj.Router.rootInstance.go('addParty');
                    return true;
                }



            }

            return PartyViewModel;
        });
