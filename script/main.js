(function () {
    'use strict';
    angular.module('app', ['ui.router', 'ngMaterial', 'ngStorage'])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/login');
            $stateProvider
                .state('index', {
                    url: "/index/:id",
                    templateUrl: 'view/index.html',
                    controller: 'IndexCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        mem_index: function ($stateParams, $sessionStorage, request) {
                            var id = $stateParams.id || $sessionStorage.memberId;
                            if ($stateParams.id!='') {
                                if($stateParams.id) {
                                    $sessionStorage.memberId = $stateParams.id;
                                    
                                }
                                return request('GET', 'GetFamilyUnionByMember?id=' + id);
                            }else{
                                delete($sessionStorage.memberId);
                            }
//                            return false;
                        }
                    }
                })
                .state('second', {
                    url: "/second/:id",
                    templateUrl: 'view/second.html',
                    controller: 'SecondCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        mem_second: function ($stateParams, $sessionStorage, request) {
                            var id = $stateParams.id || parseInt($sessionStorage.memberId);
                            if (id) {
                                return request('GET', 'GetImmobileData?id=' + id);
                            } 
//                            else {
//                                $state.go('second')
//                            }
                        }
                    }
                })
                .state('third', {
                    url: "/third/:id",
                    templateUrl: 'view/third.html',
                    controller: 'ThirdCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        mem_third: function ($stateParams, $sessionStorage, request, $state) {
                            var id = $stateParams.id || parseInt($sessionStorage.memberId);
                            if (id) {
                                return request('GET', 'GetKredit?id=' + id);
                            } 
//                            else {
//                                $state.go('third')
//                            }
                        }
                    }
                })
                .state('fourth', {
                    url: "/fourth/:id",
                    templateUrl: 'view/fourth.html',
                    controller: 'FourthCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        mem_fourth: function ($stateParams, $sessionStorage, request, $state) {
                            var id = $stateParams.id || parseInt($sessionStorage.memberId);
                            if (id) {
                                return request('GET', 'GetKredit?id=' + id);
                            }
                        }
                    }
                })
                .state('login', {
                    url: "/login",
                    templateUrl: 'view/login.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'vm'
                })
                .state('register', {
                    url: "/register",
                    templateUrl: 'view/registration.html',
                    controller: 'RegisterCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        users: function ($stateParams, $sessionStorage, request) {
                            // return request('GET', 'AccountManage/ListUser');
                            return []
                        }
                    }
                })
                .state('dashboard', {
                    url: "/dashboard",
                    templateUrl: 'view/dashboard.html',
                    controller: 'DashboardCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        users_data: function () {
                            return $.ajax({
                                type: "GET",
                                traditional: true,
                                url: 'http://itls-hh.eu/Rest/GetAllMembers'
                            });
                        }
                    }
                })

        }])
        .controller('IndexCtrl', IndexCtrl)
        .controller('SecondCtrl', SecondCtrl)
        .controller('ThirdCtrl', ThirdCtrl)
        .controller('FourthCtrl', FourthCtrl)
        .controller('LoginCtrl', LoginCtrl)
        .controller('RegisterCtrl', RegisterCtrl)
        .controller('DashboardCtrl', DashboardCtrl)

        .factory('request', request)
        .factory('usersSearch', usersSearch)

        // directive
        .directive('modalDialog', function () {
            return {
                restrict: 'E',
                scope: {
                    show: '='
                },
                replace: true, // Replace with the template below
                transclude: true, // we want to insert custom content inside the directive
                link: function (scope, element, attrs) {
                    scope.dialogStyle = {};
                    if (attrs.width)
                        scope.dialogStyle.width = attrs.width;
                    if (attrs.height)
                        scope.dialogStyle.height = attrs.height;
                    scope.hideModal = function () {
                        scope.show = false;
                    };
                },
                templateUrl: 'view/searchWindow.html' // See below
            };
        })
        .directive('convertToNumber', function () {
            return {
                require: 'ngModel',
                link: function (scope, element, attrs, ngModel) {
                    ngModel.$parsers.push(function (val) {
                        return parseInt(val, 10);
                    });
                    ngModel.$formatters.push(function (val) {
                        return '' + val;
                    });
                }
            };
        });

    // end directive


    request.inject = ['$http', '$q'];
    function request($http, $q) {

        var urlServer = 'http://itls-hh.eu/Rest/';

        return request;

        function request(methodHttp, urlPath, data) {
            var defer = $q.defer();
            $http({
                method: methodHttp,
                url: urlServer + urlPath,
                data: data,
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/javascript'
                }
            }).then(function (data) {
                console.log(data);
                defer.resolve(data);
            }, function (dataError) {
                console.log(dataError);
                defer.reject(dataError);
            });
            return defer.promise;
        }
    }

    usersSearch.inject = [];
    function usersSearch() {
        return {
            user: [
                {
                    id: 54268,
                    nameW: 'Sylvia Nolting',
                    nameH: 'Danny Rebenstorf',
                    addres: '123 Smith Street, Brunswick, 3056',
                    manager: 'Thorsten Friedrich',
                    editor: 'Thorsten Friedrich',
                    event: '06.07.2016'
                },
                {
                    id: 24563,
                    nameW: 'Maik Tangermann',
                    nameH: 'Rebekka Kampik-Tangermann',
                    addres: 'Alexanderplatz 123a, 01678 Berlin',
                    manager: 'Thorsten Friedrich',
                    editor: 'Thorsten Friedrich',
                    event: '04.08.2017'
                },
                {
                    id: 63254,
                    nameW: 'Maik Tangermann',
                    nameH: 'Rebekka Kampik-Tangermann',
                    addres: 'Del Puente 2782, Miraflores Bajo',
                    manager: 'Thorsten Friedrich',
                    editor: 'Thorsten Friedrich',
                    event: '24.11.2015'
                },
                {
                    id: 36547,
                    nameW: 'katrin denev',
                    nameH: 'Katrin  Klieefoth',
                    addres: 'Route de lHôpital, 1700 Fribourg',
                    manager: 'Thorsten Friedrich',
                    editor: 'Thorsten Friedrich',
                    event: '31.12.2016'
                },
                {
                    id: 12547,
                    nameW: '',
                    nameH: 'Peter Hayden Dinklage',
                    addres: 'Nieuwstraat 123, 1000 Brussel',
                    manager: 'Thorsten Friedrich Ultima GmbH',
                    editor: 'Thorsten Friedrich Ultima GmbH',
                    event: '30.05.2017'
                }
            ]
        }
    }

    // end factory

    // Ctrl
    IndexCtrl.$inject = ['$scope', '$http', '$stateParams', 'usersSearch', 'mem_index', '$state'];
    function IndexCtrl($scope, $http, $stateParams, usersSearch, mem_index, $state) {
        var vm = this;

        vm.params_id = $stateParams.id;

        vm.menu = [
            {
                name: 'Bank- und Sparguthaben',
                max: 1,
                current: 0,
                id: 'BankSparguthaben',
                items: []
            },
            {
                name: 'Wertpapiere / Aktien',
                max: 1,
                current: 0,
                id: 'WertpapiereAktien',
                items: []
            },
            {
                name: 'Bausparvertrag',
                max: 3,
                current: 0,
                id: 'Bausparvertrag',
                items: []
            },
            {
                name: 'Lebens-/ Rentenversicherung',
                max: 3,
                current: 0,
                id: 'LebensRentenversicherung',
                items: []
            },
            {
                name: 'Sparpläne',
                max: 1,
                current: 0,
                id: 'Sparplane',
                items: []
            },
            {
                name: 'Sonstiges Vermögen',
                max: 1,
                current: 0,
                id: 'SonstigesVermogen',
                items: []
            },
            {
                name: 'Einkünfte aus Nebentätigkeit',
                max: 3,
                current: 0,
                id: 'EinkunfteNebentatigkeit',
                items: []
            },
            {
                name: 'Unbefristete Zusatzrente',
                max: 1,
                current: 0,
                id: 'UnbefristeteZusatzrente',
                items: []
            },
            {
                name: 'Ehegattenunterhalt',
                max: 1,
                current: 0,
                id: 'Ehegattenunterhalt',
                items: []
            },
            {
                name: 'Variable Einkünfte',
                max: 1,
                current: 0,
                id: 'VariableEinkunfte',
                items: []
            },
            {
                name: 'Sonstige Einnahmen',
                max: 1,
                current: 0,
                id: 'SonstigeEinnahmen',
                items: []
            }
        ];
        vm.menu2 = [
            {
                name: 'Mietausgaben',
                max: 1,
                current: 0,
                id: 'Mietausgaben',
                items: []
            },
            {
                name: 'Unterhaltsverpflichtungen',
                max: 3,
                current: 0,
                id: 'Unterhaltsverpflichtungen',
                items: []
            },
            {
                name: 'Private Krankenversicherung',
                max: 1,
                current: 0,
                id: 'PrivateKrankenversicherung',
                items: []
            },
            {
                name: 'Sonstige Ausgaben',
                max: 1,
                current: 0,
                id: 'SonstigeAusgaben',
                items: []
            },
            {
                name: 'Sonstige Versicherungsausgaben',
                max: 1,
                current: 0,
                id: 'SonstigeVersicherungsausgaben',
                items: []
            },
            {
                name: 'Ratenkredit / Leasing',
                max: 3,
                current: 0,
                id: 'RatenkreditLeasing',
                items: []
            },
            {
                name: 'Privates Darlehen',
                max: 3,
                current: 0,
                id: 'PrivatesDarlehen',
                items: []
            },
            {
                name: 'Sonstige Verbindlichkeiten',
                max: 1,
                current: 0,
                id: 'SonstigeVerbindlichkeiten',
                items: []
            }

        ];


        vm.menuBankIdList = [];
        vm.menuBankIdList2 = [];

        vm.menu2.forEach(function (item) {
            vm.menuBankIdList2.push(item.id);
        });

        vm.menu.forEach(function (item) {
            vm.menuBankIdList.push(item.id);
        });

        vm.kinder = [
            {}
        ];

        vm.sortedItems = [];

        if (mem_index && mem_index.data) {
            if (mem_index.data.menuBank) {
                var tableName = 'FamilyFinancialSituation';
                var key;
                var bankName;
                var bankData;
                var bankIndex;
                mem_index.data.menuOneBank = [];
                mem_index.data.menuTwoBank = [];

                for (key in mem_index.data.menuBank) {
                    if (mem_index.data.menuBank.hasOwnProperty(key)) {
                        bankData = {};
                        bankName = key.replace(tableName, '');
                        console.log(eval(mem_index.data.menuBank[key]), bankName);
                        bankData[bankName] = eval(mem_index.data.menuBank[key]);
                        if ((bankIndex = vm.menuBankIdList2.indexOf(bankName)) >= 0) {
                            mem_index.data.menuTwoBank.push(bankData);
                            // console.log(bankData)
                            if (bankData[bankName].length) {
                                bankData[bankName].forEach(function (item) {
                                    vm.menu2[bankIndex].items.push(item)
                                });
                            }

                        } else if ((bankIndex = vm.menuBankIdList.indexOf(bankName)) >= 0) {
                            mem_index.data.menuOneBank.push(bankData);
                            if (bankData[bankName].length) {
                                bankData[bankName].forEach(function (item) {
                                    vm.menu[bankIndex].items.push(item)
                                });
                            }
                        }
                    }
                }
            }
            delete mem_index.data.menuBank;
            if (mem_index.data.childrens) {
                var childTableName = 'FamilyChildren';
                vm.kinder = mem_index.data.childrens.map(function (item) {
                    var result = {};
                    var newKey = '';
                    for (var k in item) {
                        newKey = k.replace(childTableName, '').toLowerCase();
                        if (k === 'FamilyChildrenKindergeId')
                        result[k] = item[k];
                        result[newKey] = item[k]
                    }
                    console.log(result);
                    return result;
                })
            }
        }


        vm.addItem = addItem;
        vm.addKinder = addKinder;
        vm.itemIsFilled = itemIsFilled;
        vm.removeItem = removeItem;
        vm.submit = submit;
        vm.refresh = refresh;
        vm.removeKinder = removeKinder;
        vm.kinderStatus = kinderStatus;
        vm.usersSearch = usersSearch;
        vm.users = usersSearch.user;
        vm.addBank = addBank;
        vm.deleteBank = deleteBank;
        vm.customAddress = customAddress;

            if(typeof mem_index !=='undefined'){
                vm.data = mem_index.data;
                vm.data.bankverbindung = vm.data.bankverbindung.map(function(value) {
                    return {
                        bankverbindungId: value.BankverbindungId,
                        bic: value.Bic,
                        blz: value.Blz,
                        cred_inst: value.Cred_inst,
                        familyUnion: value.FamilyUnion,
                        iban: value.Iban,
                        kont: value.Kont,
                        num: value.Num,
                    }
                });
                console.log(vm.data.bankverbindung)
            }else{
             vm.data =   {
                antragsteller1: {},
                antragsteller2: {
                    show_address: false
                },
                menuOneBank: [],
                menuTwoBank: [],
                childrens: [],
                bankverbindung: [{
                    bankverbindungId: '',
                    bic: '',
                    blz: '',
                    cred_inst: '',
                    familyUnion: '',
                    iban: '',
                    kont: '',
                    num: '',
                }]
            }; 
        }

        function customAddress() {
            vm.data.antragsteller2.show_address = true;
        }

        setTimeout(function () {
            $scope.$digest();
        });

        $scope.modalShown = false;
        $scope.toggleModal = function () {
            $scope.modalShown = !$scope.modalShown;
        };

        function addBank() {
            vm.data.bankverbindung.push({
                kont: '',
                iban: '',
                bic: '',
                blz: '',
                cred_inst: '',
                num: '',
            });
            console.log(vm.data);
        }

        function deleteBank(index) {
            vm.data.bankverbindung.splice(index, 1)
        }

        function addKinder() {
            vm.kinder.push({
                name: '',
                geburtsdatum: '',
                FamilyChildrenKindergeId: 2,
                unterhaltseinnahmen: 2
            })
        }

        function addItem(data, index) {
            if (!itemIsFilled(data)) {
                vm.sortedItems.push({ item: data.items.legth+1, index });
                data.items.push({});
            }
        }

        function itemIsFilled(data) {
            return data.items.length == data.max;
        }

        function removeItem(data, item) {
            data.items.splice(data.items.indexOf(item), 1);
        }

        function removeKinder(index) {
            vm.kinder.splice(index, 1)
        }

        function kinderStatus(bool) {
            if (bool === true) {
                vm.data.childrens.push('Keine Kinder vorhanden');
            }
        }

        function submit() {
            function _defineProperty(obj, key, value) {
                if (key in obj) {
                    Object.defineProperty(obj, key, {
                        value: value,
                        enumerable: true,
                        configurable: true,
                        writable: true
                    });
                } else {
                    obj[key] = value;
                }
                return obj;
            }

            angular
                .extend(vm.data.menuOneBank,
                    vm.menu
                    // .filter(function(item) {
                    //     return item.items.length;
                    // })
                        .map(function (item) {
                            return _defineProperty({}, item.id, item.items);
                        })
                );
            angular
                .extend(vm.data.menuTwoBank,
                    vm.menu2
                    // .filter(function(item) {
                    //     return item.items.length;
                    // })
                        .map(function (item) {
                            return _defineProperty({}, item.id, item.items);
                        })
                );

            vm.data.childrens = [];
            angular
                .extend(vm.data.childrens,
                    vm.kinder
                    // .filter(function(item) {
                    //     return item.items.length;
                    // })
                        .map(function (item) {
                            return item;
                        })
                );

            // $http({
            //     type: "POST",
            //     traditional: true,
            //     url: 'http://itls-hh.eu/backend/WebApplication1/Rest/Antragsteller',
            //     data: {'data': vm.data}
            // }).then(function successCallback(response) {
            //
            // }, function errorCallback(response) {
            //
            // });

            var data;
            if (typeof parseInt($stateParams.id) == 'number' && $stateParams.id >= 1) {
                vm.data.id = $stateParams.id;
                console.log(vm.data)
                data = JSON.stringify(vm.data);

                $.ajax({
                    type: "POST",
                    traditional: true,
                    url: 'http://itls-hh.eu/Rest/AntragstellerUpdate',
                    data: {'data': data}
                })
            } else {
                data = JSON.stringify(vm.data);
                $.ajax({
                    type: "POST",
                    traditional: true,
                    url: 'http://itls-hh.eu/Rest/Antragsteller',
                    data: {'data': data}
                }).then(function (res) {
                    $state.go('index', {id: res});
                    console.log(res);
                })
            }

        }

        function refresh() {
            vm.data = {
                antragsteller1: {},
                antragsteller2: {},
                menuOneBank: [],
                menuTwoBank: [],
                childrens: []
            };
            vm.kinder = [
                {
                    name: '',
                    geburtsdatum: '',
                    FamilyChildrenKindergeId: 2,
                    unterhaltseinnahmen: 2
                }
            ]
        }


    }

    SecondCtrl.$inject = ['$scope', 'usersSearch', '$sessionStorage', '$state', 'mem_second', '$stateParams'];
    function SecondCtrl($scope, usersSearch, $sessionStorage, $state, mem_second, $stateParams) {
        var vm = this;
        var post_url = '';

        vm.params_id = $stateParams.id;
        vm.submit = submit;
        vm.refresh = refresh;
        vm.addStellplatze = addStellplatze;
        vm.add = add;
        vm.addItem = addItem;
        vm.itemIsFilled = itemIsFilled;
        vm.removeItem = removeItem;
        vm.usersSearch = usersSearch;
        vm.users = usersSearch.user;
        vm.addGrundbuchdaten = addGrundbuchdaten;
        vm.GrundbuchdatenAdded = {
            state: false,
            grunduch: '',
            blatt: ''
        };
        vm.addRechte = addRechte;
        vm.RechteAdded = {
            state: false,
            betrag: '',
            beschreibung: '',
            anmerkungen: '',
        };
        vm.Flurstuck = [{
            flur: '',
            flurstuck: '',
            anteil: '',
            anteil2: '',
            desFlurs: '',
        }];
        vm.addFlurstuck = addFlurstuck;
        vm.deleteFlurstuck = deleteFlurstuck;

        $scope.modalShown = false;
        $scope.toggleModal = function () {
            $scope.modalShown = !$scope.modalShown;
        };

        function addItem(data) {
            if (!itemIsFilled(data)) {
                data.items.push({});
            }
        }

        function addFlurstuck() {
            vm.Flurstuck.push({});
        }

        function deleteFlurstuck(index) {
            vm.Flurstuck.splice(index, 1);
        }

        function addGrundbuchdaten() {
            vm.GrundbuchdatenAdded.state = true;
        }
        function addRechte() {
            vm.RechteAdded.state = true;
        }

        function itemIsFilled(data) {
            return data.items.length == data.max;
        }

        function removeItem(data, item) {
            console.log(data);
            console.log(item);
            data.items.splice(data.items.indexOf(item), 1);
        }

        vm.menu = [
            {
                name: 'Stellplatz',
                current: 0,
                id: 'Stellplatz',
                max: 100,
                items: []
            },
            {
                name: 'Carport',
                current: 0,
                id: 'Carport',
                max: 100,
                items: []
            },
            {
                name: 'Garage',
                current: 0,
                id: 'Garage',
                max: 100,
                items: []
            },
            {
                name: 'Doppelgarage',
                current: 0,
                id: 'Doppelgarage',
                max: 100,
                items: []
            },
            {
                name: 'Kellergarage',
                current: 0,
                id: 'Kellergarage',
                max: 100,
                items: []
            },
            {
                name: 'Tiefgaragenstellplatz',
                current: 0,
                id: 'Tiefgaragenstellplatz',
                max: 100,
                items: []
            }
        ];

        if( mem_second && mem_second.data) {
            var i = 0;
            var temp = mem_second.data.stellplatze;
            mem_second.data.stellplatze = [];
            for(var key in temp) {
                var obj = {};
                obj[key] = eval(temp[key]);
                delete  temp[key];
                if (i < 6) {
                    vm.menu[i++].items = obj[key];
                }
            }
        }

        vm.pushedItems = [];
        if(typeof mem_second !='undefined'){
           vm.bank = mem_second.data; 
        } else {
            vm.bank = {
                basisangaben: {
                    bankverbindung: '',
                    strabe: '',
                    nr: '',
                    plz: '',
                    ort: '',
                    art: '',
                    einliegerwohnung: 2,
                    vollgeschosse: '',
                    fertighaus: 2,
                    dachgeschoss: '',
                    grundstucksgrobe: '',
                    baujahr: '',
                    bauweise: {
                        massiv: 2,
                        andere: 2
                    },
                    keller: ''
                },
                nutzung: {
                    gesamtewohnflache: '',
                    wohnflache: {
                        eigengenutzt: 2,
                        vermietet: 2,
                        beides: 2
                    },
                    gewerbeflache: 2

                },
                zusatzliche: {
                    erbbaurecht: 2,
                    objekt: 2
                },
                stellplatze: []
            }
        }


        if(vm.bank.stellplatze == null) {
            vm.bank.stellplatze = [];
        }
        function addStellplatze(item) {
            vm.pushedItems.push({
                name: item.name,
                vermietet: 2
            })
        }

        function add(data) {
            vm.pushedItems.push(data);
            data.items.push(data);
        }

        function submit() {
            function _defineProperty(obj, key, value) {
                if (key in obj) {
                    Object.defineProperty(obj, key, {
                        value: value,
                        enumerable: true,
                        configurable: true,
                        writable: true
                    });
                } else {
                    obj[key] = value;
                }
                return obj;
            }

            angular.extend(vm.bank.stellplatze,
                vm.menu
                    .map(function (item) {
                        return _defineProperty({}, item.id, item.items);
                    })
            );

            var id = parseInt($sessionStorage.memberId);
            vm.bank.id = $stateParams.id || id;
            // vm.bank.GrundbuchdatenAdded = vm.GrundbuchdatenAdded;
            // vm.bank.RechteAdded = vm.RechteAdded;
            // vm.bank.Flurstuck = vm.Flurstuck;

            mem_second.data.status ?
                post_url = 'http://itls-hh.eu/Rest/ImmobileUpdate' :
                post_url = 'http://itls-hh.eu/Rest/Immobile';

            console.log(vm.bank);
            $.ajax({
                type: "POST",
                traditional: true,
                url: post_url,
                data: {'data': JSON.stringify(vm.bank)}
            });
        }


        function refresh() {
            vm.bank = {
                basisangaben: {
                    bankverbindung: '',
                    strabe: '',
                    nr: '',
                    plz: '',
                    ort: '',
                    art: '',
                    einliegerwohnung: false,
                    vollgeschosse: '',
                    fertighaus: false,
                    dachgeschoss: '',
                    grundstucksgrobe: '',
                    baujahr: '',
                    bauweise: {
                        massiv: false,
                        andere: false
                    },
                    keller: ''
                },
                nutzung: {
                    gesamtewohnflache: '',
                    wohnflache: {
                        eigengenutzt: false,
                        vermietet: false,
                        beides: false
                    },
                    gewerbeflache: false

                },
                zusatzliche: {
                    erbbaurecht: false,
                    objekt: false
                },
                stellplatze: []
            };
            vm.pushedItems = [];
        }
    }

    ThirdCtrl.$inject = ['$scope', 'usersSearch', '$sessionStorage', 'mem_third', '$stateParams'];
    function ThirdCtrl($scope, usersSearch, $sessionStorage, mem_third, $stateParams) {
        var vm = this;

        
        vm.params_id = $stateParams.id;
        vm.addA = addA;
        vm.addB = addB;
        vm.submit = submit;
        vm.removeItem = removeItem;
        vm.addKfw = addKfw;
        vm.addPrivatdarlehen = addPrivatdarlehen;
        vm.addForwarddarlehen = addForwarddarlehen;
        vm.addItem = addItem
        vm.myFunction = myFunction;
        vm.usersSearch = usersSearch;
        vm.users = usersSearch.user;
        vm.removeOneItem = removeOneItem;
        vm.addAnnuitatendarlehen = addAnnuitatendarlehen;
        vm.addZinsabsicherung = addZinsabsicherung;
        vm.addVariablesDarlehen = addVariablesDarlehen;
        vm.getLabel = getLabel;
        vm.toggleAnfrage = toggleAnfrage;
        vm.anfrageIsOpened = true;

        function toggleAnfrage(item) {
            console.log(item)
            item.anfrageIsOpened = !item.anfrageIsOpened;
            vm.anfrageIsOpened = !vm.anfrageIsOpened;
        }

        $scope.modalShown = false;
        $scope.toggleModal = function () {
            $scope.modalShown = !$scope.modalShown;
        };

        function addItem(data, text, heh) {
            console.log(data);
            if (!data.items)
                data.items = [];
            switch(text) {
                case 'addAnnuitatendarlehen':
                    data.items.push({
                        name: 'Annuitatendarlehen',
                        darlehensbetrag: '',
                        zinsbindung: '',
                        tilgungswunschName: '',
                        tilgungswunschValue: '',
                        sondertilgung: '',
                        bereit: '',
                    });
                break;
                case 'addPrivatdarlehen':
                    data.items.push({
                        name: 'addPrivatdarlehen',
                        darlehensbetrag: '',
                        laufzeit: '',
                        bank: '',
                        kreditbetrag: '',
                        restchuldversicherung: {
                            eur: '',
                            au: '',
                        }
                    });
                break;
                case 'addVariablesDarlehen':
                    data.items.push({
                        name: 'addVariablesDarlehen',
                        darlehensbetrag: '',
                        zinsbindung: '',
                        tilgungswunsch: '',
                        sondertilgung: '',
                        auszahlungszeitpunkt: ''
                    });
                break;
                case 'addForwarddarlehen':
                    data.items.push({
                        name: 'addForwarddarlehen',
                        darlehensbetrag: '',
                        zinsbindung: '',
                        tilgungswunsch: '',
                        sondertilgung: '',
                        auszahlungszeitpunkt: ''
                    });
                break;
                case 'addZinsabsicherung':
                    data.items.push({
                        name: 'addZinsabsicherung',
                        tarif: '',
                        group1: null,
                        group2: null,
                        group3: null,
                        group4: null,
                        freiBesparen: '',
                        abtreten: '',
                        sondertilgung: '',
                        auszahlungszeitpunkt: '',
                        bausparwunschAnpassen: '',
                        abschlussgebuhr: '',
                        verrechnung: '',
                        darlehensbetrag: '',
                        vertragspartner: '',
                    });
                break;
                case '':
                    data.items.push(heh);
                break;
                default:
                    return null;

            }
        }

        function addA() {
            vm.anfArrA.push({
                bearbeiter: '',
                erstelltam: '',
                gedruckt: '',
                status: '',
                zweck: '',
                abgelehnt: false,
                abgerechnet: false,
                field: '',
                anfragen: '',
                storno: false,
            });
        }

        vm.anfArrA = [];
        vm.anfArrB = [];

        if (typeof mem_third!='undefined') {
            if (mem_third.data.Anfarra) {
                vm.anfArrA = mem_third.data.Anfarra;
            }

            if (mem_third.data.Anfarrb) {
                vm.anfArrB = mem_third.data.Anfarrb;
            }
        }

        function addB() {
            vm.anfArrB.push({
                auftragseingang: vm.tmpArr.auftragseingang,
                anfrageabgelehnt: vm.tmpArr.datum,
                reason: '',
                fieldOne: '',
                fieldTwo: '',
                fieldThree: '',
                fieldFour: '',
                wiedervorlage: '',
                betrag: vm.tmpArr.wunsch,
            });
            vm.tmpArr.auftragseingang = '';
            vm.tmpArr.wunsch = '';
            vm.tmpArr.datum = '';
        }

        vm.tmpArr = {
            auftragseingang: '',
            wunsch: '',
            datum: ''
        };

        //delete items
        function removeItem(data, item) {
            data.items.splice(item, 1);
        }

        function removeOneItem(data, index) {
            data.splice(index, 1);
        }

        function submit() {
            vm.data = {
                Anfarra: vm.anfArrA,
                Anfarrb: vm.anfArrB,
                id: $sessionStorage.memberId,
                annuitatendarlehen: vm.annuitatendarlehen,
                kfw: vm.kfw,
                forwarddarlehen: vm.forwarddarlehen,
                privatdarlehen: vm.privatdarlehen,
                variablesDarlehen: vm.variablesDarlehen,
                Zinsabsicherung: vm.Zinsabsicherung
            };

            var post_url = '';
            if(mem_third && mem_third.data && mem_third.data.status) {
                post_url = 'http://itls-hh.eu/Rest/KreditUpdate';
            } else {
                post_url = 'http://itls-hh.eu/Rest/Kredit';
            }

            console.log(vm.data);

            $.ajax({
                type: "POST",
                traditional: true,
                data: {data: JSON.stringify(vm.data)},
                url: post_url
            })
        }

        function addKfw() {
            console.log(vm.kfw);
            angular.extend(vm.kfwPushed,
                vm.kfw
                    .map(function (item) {
                        return item;
                    }));
        }

        vm.kfwPushed = [];
        //  mem_third && mem_third.data ? mem_third.data.kfw : 
        vm.kfw = [
            {
                name: 'KfW Wohneigentumsprogramm',
                linkName: 'Selbstgenutztes Eigentum (124)',
                darlehensbetrag: '',
                laufzeit: '',
                curent: 0,
                max: 1,
                items: []
            },
            {
                name: 'KfW Energieeffizient Sanieren',
                linkName: 'Kauf order Komplettsanierung (151)',
                darlehensbetrag: '',
                laufzeit: '',
                curent: 0,
                max: 1,
                items: []
            },
            {
                name: 'KfW Energieeffizient Sanieren',
                linkName: 'Einzelmaßnahmen (152)',
                darlehensbetrag: '',
                laufzeit: '',
                curent: 0,
                max: 1,
                items: []
            },
            {
                name: 'KfW Energieeffizient Sanieren',
                linkName: 'Heizungsanlagen Eeneuerbare Energien (167)',
                darlehensbetrag: '',
                laufzeit: '',
                curent: 0,
                max: 1,
                items: []
            },
            {
                name: 'KfW Energieeffizient Bauen',
                linkName: 'Effizienzhaus 40 Plus (153)',
                darlehensbetrag: '',
                laufzeit: '',
                curent: 0,
                max: 1,
                items: []
            },
            {
                name: 'KfW Energieeffizient Bauen',
                linkName: 'Effizienzhaus 40 (153)',
                darlehensbetrag: '',
                laufzeit: '',
                curent: 0,
                max: 1,
                items: []
            },
            {
                name: 'KfW Energieeffizient Bauen',
                linkName: 'Effizienzhaus 55 (153)',
                darlehensbetrag: '',
                laufzeit: '',
                curent: 0,
                max: 1,
                items: []
            },
            {
                name: 'KfW Wohnraum Modernisieren',
                linkName: 'Altersgerecht Umbauen(159)',
                darlehensbetrag: '',
                laufzeit: '',
                curent: 0,
                max: 1,
                items: []
            }
        ];


        //Privatdarlehen
        function addPrivatdarlehen() {
            vm.privatdarlehen.push({
                darlehensbetrag: '',
                laufzeit: '',
                bank: '',
                kreditbetrag: '',
                restchuldversicherung: {
                    eur: '',
                    au: '',
                },
                vermittlungscourtage: '',
                vermittlungscourtage_eur: '',
                antragssumme: '',
                kreditgebuhren: '',
                zinsbelastung: '',
                gesamtkreditbetrag: '',
                laufzeitInMonaten: '',
                ersteRate_eur: '',
                ersteRate_datum: '',
                monatlicheRate: '',
                letzteRate: '',
                letzteRateDatum: '',
                effektiver: '',
                vertragsnummer: '',
                packing_pc: '',
                packing_eur: '',
                provisionBank: '',
                provisionRestschuldversicherung_pc: '',
                provisionRestschuldversicherung_eur: '',
                gesamtprovision_eur: '',
                provisionBerater_eur: '',
                barauszahlung: '',
                bemerkungen: '',
            });
        }

        vm.privatdarlehen = [];

        //Forwarddarlehen
        function addForwarddarlehen() {
            vm.forwarddarlehen.push({
                darlehensbetrag: '',
                zinsbindung: '',
                tilgungswunsch: '',
                sondertilgung: '',
                auszahlungszeitpunkt: ''
            })
        }

        vm.forwarddarlehen = [];

        //variablesDarlehen
        function addVariablesDarlehen() {
            vm.variablesDarlehen.push({
                darlehensbetrag: '',
                zinsbindung: '',
                tilgungswunsch: '',
                sondertilgung: '',
                auszahlungszeitpunkt: ''
            })
        }

        vm.variablesDarlehen = [];

        //Zinsabsicherung
        function addZinsabsicherung() {
            vm.Zinsabsicherung.push({
                tarif: '',
                group1: null,
                group2: null,
                group3: null,
                group4: null,
                freiBesparen: '',
                abtreten: '',
                sondertilgung: '',
                auszahlungszeitpunkt: '',
                bausparwunschAnpassen: '',
                abschlussgebuhr: '',
                verrechnung: '',
                darlehensbetrag: '',
                vertragspartner: '',
            })
        }

        function checkForNulls(data) {
            var counter = 0;
            var index = null;
            for (var item in data) {
                if (data[item] !== null) {
                    counter++;
                    index = item;
                }
            }
            return {
                counter,
                index,
            }
        }

        function getLabel(tg) {
            console.log(tg);
            var nuls = checkForNulls(tg);
            if (nuls.counter === 0) {
                return 'Automatish';
            } else if (nuls.counter === 1) {
                return tg[nuls.index];
            }
            return 'mehre';
        }

        vm.Zinsabsicherung = [];

        //Annuitatendarlehen
        function addAnnuitatendarlehen() {
            vm.annuitatendarlehen.push({
                darlehensbetrag: '',
                zinsbindung: '',
                tilgungswunschName: '',
                tilgungswunschValue: '',
                sondertilgung: '',
                bereit: '',
            })
        }

        vm.annuitatendarlehen = []
        // function addAusgesetzt(data) {
        //     if (data.dopArr.length < 1) {
        //         data.dopArr.push({
        //             tarif: '',
        //             bausparwunsch: '',
        //             abschlussgebuhr: '',
        //             einmalzahlung: '',
        //             vertragspartner: ''
        //         })
        //     }
        // }

        if (mem_third && mem_third.data) {
            vm.fetchedData = mem_third.data;
            console.log(vm.fetchedData.kfw);
            vm.annuitatendarlehen = vm.fetchedData.annuitatendarlehen;
            // vm.kfw = vm.fetchedData.kfw;
            vm.forwarddarlehen = vm.fetchedData.forwarddarlehen;
            vm.privatdarlehen = vm.fetchedData.privatdarlehen;
            vm.variablesDarlehen = vm.fetchedData.variablesDarlehen;
            vm.Zinsabsicherung = vm.fetchedData.Zinsabsicherung;
            vm.anfArrA = vm.fetchedData.Anfarra;
            vm.anfArrB = vm.fetchedData.Anfarrb;
        }

        function sendFinanzierungswunsch() {
            var flightObject
        }

        function myFunction() {
            document.getElementById("myDropdown").classList.toggle("show");
        }

        function toggleTarifDropdown() {
            document.getElementById('tarifDropdown').classList.toggle("show");
        }

        window.onclick = function (event) {
            if (!event.target.matches('.dropbtn')) {

                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }

        vm.hard = [
            'CTB Bank von Essen GmbH & Co',

            'CTB Braunschweig',


            'KB Segeberg',

            'WKG Neumünster e.G.',

            'Oyak Anker Bank',

            'DSK Allkredit',

            'Allgemeine Deutsche Direkt Bank',

            'VVK (Alt)',

            'Service Bank',

            'WKV Bank',

            'Aachener',

            'WKV Bank (alt)',

            'Solitär',

            'Service Bank Kiel',

            'Service Bank Rostock',

            'Badenia',

            'Norisbank AG',

            '-Internet- von Essen KG',

            '-Internet- Service Bank',

            '-Internet- Schweizer',
        ]

    }

    FourthCtrl.$inject = ['$scope', '$sessionStorage', 'mem_fourth', 'usersSearch', '$stateParams'];
    function FourthCtrl($scope, $sessionStorage, mem_fourth, usersSearch, $stateParams) {
        var vm = this;
        vm.usersSearch = usersSearch;
        vm.users = usersSearch.user;
        $scope.toggleModal = function () {
            $scope.modalShown = !$scope.modalShown;
        };
    }

    LoginCtrl.$inject = ['$scope', '$http'];
    function LoginCtrl($scope, $http) {

        var vm = this;

        vm.login = login

        vm.user = {
            email: '',
            password: ''
        };

        function login() {
            console.log(vm.user);
        }
    }

    RegisterCtrl.$inject = ['$scope', '$http', 'users'];
    function RegisterCtrl($scope, $http, users) {

        var vm = this;
        vm.users = users || [];
        vm.newUser = {
            PrimaryRole: 1
        }

        vm.user = {
            email: '',
            password: ''
        };

        vm.register = register;
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;

        function register() {
            $.ajax({
                type: "POST",
                traditional: true,
                data: {data: JSON.stringify(vm.newUser)},
                url: 'http://itls-hh.eu/AccountManage/AddUser'
            });
        }
        function deleteUser(BenutzerId) {
            $.ajax({
                type: "DELETE",
                traditional: true,
                data: {data: JSON.stringify({BenutzerId})},
                url: 'http://itls-hh.eu/AccountManage/DeleteUser'
            });
        }
        function updateUser(BenutzerId, NewPassword) {
            $.ajax({
                type: "PUT",
                traditional: true,
                data: {data: JSON.stringify({BenutzerId: BenutzerId, NewPassword: NewPassword})},
                url: 'http://itls-hh.eu/AccountManage/UpdateUser'
            });
        }
    }

    DashboardCtrl.$inject = ['$scope', '$http', 'users_data'];
    function DashboardCtrl($scope, $http, users_data) {

        var vm = this;
        vm.partnergeschaft = 0;
        vm.data = {

        };

        $scope.modalShown = false;
        $scope.toggleModal = function () {
            $scope.modalShown = !$scope.modalShown;
        };
        var filtered = users_data.map(function(value) {
            value.FamilyMemDate = new Date(value.FamilyMemDate);
            return value;
        })
        console.log(filtered);
        vm.users = filtered;

    }
})
();