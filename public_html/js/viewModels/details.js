/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(
        ['ojs/ojcore', 'knockout', 'data/data', 'moment', 'ojs/ojknockout',
            'ojs/ojvalidation', 'ojs/ojtagcloud', 'ojs/ojchart'],
        function (oj, ko, jsonData, moment) {

            function DetailsViewModel() {
                var self = this;
                self.partyAccStatus = ko.observable();
                self.firstTime = true;
                self.data = ko.observable();
                self.colorHandler = new oj.ColorAttributeGroupHandler();
                self.personProfile = ko.observableArray([]);
                self.people = ko.observableArray([]);
                self.infoTiles = ko.observableArray();
                self.employeePhoto = ko.observable();
                self.expandedTab = ko.observable(false);
                self.selectedTab = ko.observable(1);
                self.detailsContentTemplate = ko.observable('personDetails/about');
                self.empId = ko.observable('');
                self.teamDataReady = ko.observable(false);
                self.compensations = ko.observableArray(self.personProfile().compensations);
                self.stackValue = ko.observable('off');
                self.orientationValue = ko.observable('vertical');
                self.comboSeriesValue = ko.observableArray();
                self.comboGroupsValue = ko.observableArray();
                self.barSeriesValue = ko.observableArray();
                self.barGroupsValue = ko.observableArray();
                self.pieSeriesValue = ko.observableArray();
                self.directReports = ko.observableArray([]);

                self.handleActivated = function (info) {
                    var parentRouter = info.valueAccessor().params.ojRouter.parentRouter;

                    // Retrieve the childRouter instance created in main.js
                    self.empRouter = parentRouter.currentState().value;

                    self.empRouter.configure(function (stateId) {
                        var state;
                        if (stateId) {
                            var data = stateId.toString();
                            state = new oj.RouterState(data, {
                                value: data,
                                // For each state, before entering the state,
                                // make sure the data for it is loaded.
                                canEnter: function () {
                                    // The state transition will be on hold
                                    // until loadData is resolved.
                                    return self.loadData(data);
                                }
                            });
                        }
                        return state;
                    });

                    // Returns the sync promise to handleActivated. The next
                    // phase of the ojModule lifecycle (attached) will not be
                    // executed until sync is resolved.
                    return oj.Router.sync();
                };

                function getEmpURL(id) {
                    var url;
                    if (id) {
                        //url = location.protocol+'//'+location.hostname+':'+location.port+'/poplending/party/'+id;
                        url = "http://129.146.1.229:30102/party/" + id;
                    } else {
                        url = "js/data/party205.json";
                    }

                    return url;
                }


                self.goEmp = function (empId) {
                    self.empRouter.go(empId.toString());
                    return true;
                };

                self.onEnter = function (empId, event) {
                    if (event.keyCode === 13) {
                        self.empRouter.go(empId.toString());
                        return true;
                    }
                };

                // canEnter requires a promise that resolve as true or false
                self.loadData = function (id) {
                    return new Promise(function (resolve, reject) {
                        jsonData.fetchData(getEmpURL(id)).then(
                                function (person) {
                                    self.personProfile(person);
                                    loadTeamData(person);
                                    console.log(person);
                                    self.directReports(person.reports);
                                    loadPerfandPotenialData();
                                    resolve(true);
                                }).fail(function (error) {
                            console.log('Error: ' + error.message);
                            resolve(false);
                        });
                    });
                };

                self.personClickHandler = function (data) {
                    self.selectedTab(data.sid);
                    ko.utils.arrayForEach(self.personProfile().comps, function (
                            item) {
                    });
                    var newPage = "personDetails/" + data.title.toLowerCase();
                    self.detailsContentTemplate(newPage);
                    return true;
                };

                self.getColor = function (skillValue) {
                    return self.colorHandler.getValue(skillValue);
                };

                self.getPhoto = function (id) {
                    var src;
                    // We only have images for employees below 188 for now. Use the nopic avatar for those above 18
                    if (id < 188) {
                        src = 'css/images/people/' + id + '.png';
                    } else {
                        src = 'css/images/people/nopic.png';
                    }
                    return src;
                };

                self.getEmail = function () {
                    return "mailto:" + self.personProfile().companyEmail
                            + '@oracle.com';
                };

                self.getOrg = function (data, event) {
                    alert('This will take you to the details of the selected party');
                };

                self.getHireDate = function () {
                    var hireDate = "2006-07-14T00:00:00-07:00";
                    var dateOptions = {
                        formatStyle: 'date',
                        dateFormat: 'medium'
                    };
                    var dateConverter = oj.Validation.converterFactory(
                            "datetime").createConverter(dateOptions);
                    var startDate = oj.IntlConverterUtils
                            .dateToLocalIso(moment(hireDate).toDate());
                    hireDate = dateConverter.format(startDate);
                    return hireDate;
                };

                self.formatAddress = function() {
                    var street = self.personProfile().address;
                    var city = self.personProfile().city;
                    var state = self.personProfile().state;
                    var postal = self.personProfile().zipCode;
                    var country = self.personProfile().country;
                    return street + '<br/>' + city + '<br/>' + state + ' '
                            + postal + ' ' + country;
                };

                function loadPerfandPotenialData() {
                    var ratcount = [], potcount = [], specyear = [], payyear = [], salcount = [];

                    data = " [ {   'effective' : '2010-08-14T00:00:00-07:00',   'perfId' : 41173,  'potential' : 2, 'rating' : 4  }, "
                            + "{ 'effective' : '2011-04-11T00:00:00-07:00', 'perfId' : 41174,  'potential' : 3, 'rating' : 4 }, "
                            + "{   'effective' : '2012-08-09T00:00:00-07:00',   'perfId' : 41175,'potential' : 2,  'rating' : 3  }, "
                            + "{   'effective' : '2013-09-10T00:00:00-07:00',   'perfId' : 41176, 'potential' : 3, 'rating' : 5  },"
                            + " {'effective' : '2014-11-19T00:00:00-08:00', 'perfId' : 41177, 'potential' : 2,'rating' : 2  }, "
                            + "{  'effective' : '2015-09-08T00:00:00-07:00', 'perfId' : 41178,'potential' : 3, 'rating' : 3    } ]";

                    ko.utils.arrayForEach(data, function (item) {
                        ratcount.push(item.rating);
                        potcount.push(item.potential);
                        specyear.push(new Date(item.effective).getFullYear());
                    });
                    /*ko.utils.arrayForEach(data.comps, function(item) {
                     salcount.push(item.compSalary);
                     payyear.push(new Date(item.effective).getFullYear());
                     });*/
                    self.comboSeriesValue([{
                            name: "Rating",
                            items: ratcount
                        }, {
                            name: "Potential",
                            items: potcount
                        }]);
                    self.comboGroupsValue(specyear);

                    //loadTeamData(data);
                }

                function loadTeamData(data) {

                    self.infoTiles([{
                            "sid": "1",
                            "name": "Item1",
                            "title": "About",
                            "infolable1": "",
                            "infolable1value": 'Personal',
                            "infolable2": "",
                            "infolable2value": ''
                        }, {
                            "sid": "2",
                            "name": "Item2",
                            "title": "Status",
                            "infolable1": "",
                            "infolable1value": "Financial",
                            "infolable2": "",
                            "infolable2value": ""
                        }

                    ]);
                }

                self.getTypeLabel = function () {
                    var skills = [];
                    skills.push({
                        id: self.personProfile().id,
                        label: self.personProfile().type,
                        value: '',
                        shortDesc: 'Party type'
                    });

                    return skills;
                };


//                jsonData.fetchData('js/data/party_acc_details.json').then(function (party_acc_details) {
//                    self.partyAccStatus(party_acc_details);
//                    console.log(party_acc_details);
//                    //self.partyAccStatus(true);
//                    //self.ready(true);
//                }).fail(function (error) {
//                    console.log('Error: ' + error.message);
//                });



            }

            return new DetailsViewModel();
        });
