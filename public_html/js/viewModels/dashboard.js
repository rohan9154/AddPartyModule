/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['knockout', 'ojs/ojcore', 'data/data', 'ojs/ojknockout', 'ojs/ojmasonrylayout', 'ojs/ojchart', 'ojs/ojgauge'],
        function (ko, oj, data)
        {
            /* 
             * Your application specific code will go here
             */

            function DashboardViewModel() {
                var self = this;
                self.loanStatus =  ko.observable();
              
                self.ready = ko.observable(false);
                self.stackValue = ko.observable('off');
                self.orientationValue = ko.observable('horizontal');
                self.barSeriesValue = ko.observableArray();
                self.barGroupsValue = ko.observableArray();
                self.avarageLoanRoiFixed = ko.observable();
                self.avarageLoanRoiFloat = ko.observable();
                var barGroups = ["2000", "2001", "2002", "2003", "2004"];
                self.barSeriesValue(
                        [{name: "Finance", items: [80, 60, 50, 30, 20]}]
                        );
                self.barGroupsValue(barGroups);
                self.pieSeriesValue = ko.observableArray(
                        [{name: "Total Loan", items: [4]},
                            {name: "Approved", items: [3]},
                            {name: "Rejected", items: [1]},
                            {name: "New Application", items: [2]},
                            {name: "New Leads", items: [2]},
                            {name: "Pending Approval", items: [1]}
                        ]);

                self.router = oj.Router.rootInstance;
                var converterFactory = oj.Validation.converterFactory('number');
                self.percentConverter = converterFactory.createConverter({style: 'decimal', maximumFractionDigits: 0});
               
                data.fetchData('js/data/loanStatus.json').then(function (status) {
                    self.loanStatus(status);
                    self.ready(true);
                    self.formatAverages();
                        }).fail(function (error) {
                    console.log('Error: ' + error.message);
                });
                
                
               
                self.onEnterLoadParty = function (data, event) {
                    if (event.keyCode === 13) {
                        self.router.go('party');
                    }
                    return true;
                };
                
                self.onEnterLoadProfile = function (data, event) {
                    if (event.keyCode === 13) {
                        history.pushState(null, '', 'index.html?root=party'); 
                        oj.Router.sync();
                    }
                    return true;
                };

                self.formatAverages = function () {
                    self.avarageLoanRoiFixed(self.loanStatus().loanRoiFixed.toPrecision(2));
                    self.avarageLoanRoiFloat(self.loanStatus().loanRoiFloating.toPrecision(2));
                };

                self.dashboardItems = ko.observableArray([
                    {"name": "Item1", "title": "Loan Highlight", "target": "party", "sizeClass": "oj-masonrylayout-tile-2x1"},
                    {"name": "Item6", "title": "Competetors", "target": "me", "sizeClass": "oj-masonrylayout-tile-1x1"},
                    {"name": "Item7", "title": "Loan ROI", "target": "me", "sizeClass": "oj-masonrylayout-tile-1x1"},
                    {"name": "Item9", "title": "Loan Summary", "target": "me", "sizeClass": "oj-masonrylayout-tile-1x1"}
                   
                ]);

                self.compratio = ko.observableArray([
                    {"faderatio": "1", "name": "ABC Bank", "value": "$150k", "rate": "100"},
                    {"faderatio": "0.8", "name": "XYZ Bank", "value": "$125k", "rate": "70"},
                    {"faderatio": "0.8", "name": "Bank Of FSGBU", "value": "$90k", "rate": "50"},
                    {"faderatio": "0.6", "name": "Red Bank", "value": "$60k", "rate": "40"},
                    {"faderatio": "0.6", "name": "Blue Bank", "value": "$50k", "rate": "30"}
                ]);

            }

            return DashboardViewModel;

        });
