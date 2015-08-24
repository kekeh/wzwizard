/* 
*  Name: wzwizard 
*  Description: Wizard - AngularJS reusable UI component 
*  Version: 0.0.6 
*  Author: kekeh 
*  Homepage: http://kekeh.github.io/wzwizard 
*  License: MIT 
*  Date: 2015-08-24 
*/ 
angular.module('template-wzwizard-0.0.6.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("templates/wzpage.html",
    "<div ng-show=visible ng-transclude></div>");
  $templateCache.put("templates/wzwizard.html",
    "<div class=wzwizard><div class=wzpages><div class=wzpage ng-repeat=\"p in wzpages\" ng-style=\"{'width': 100/wzpages.length + '%'}\" ng-class={wzactive:p.visible}><span class=wztitletext ng-if=opt.showPageNumber style=margin-right:4px>{{$index+1}}{{config.PAGE_NUMBER_SEPARATOR}}</span> <span class=wztitletext>{{p.title}}</span></div></div><div class=wzcontent ng-transclude></div><div class=wzfooter><div ng-style=\"{'height': response.message===undefined||response.message===''?'30px':'0'}\"></div><div ng-class=\"{'wzok':response.result,'wzerror':!response.result}\" ng-if=\"response.message!==undefined && response.message!==''\"><span>{{response.message}}</span> <span class=\"icon icon-cross\" ng-keydown=\"$event.which===13?response.message='':null\" ng-click=\"response.message=''\" tabindex=0></span></div><button class=wzfooterbtn ng-click=backBtnClicked() ng-if=\"visiblePageIdx>0\">{{opt.backBtnText}}</button> <button class=wzfooterbtn style=margin-left:4px ng-click=nextBtnClicked() ng-if=\"visiblePageIdx<wzpages.length-1\">{{opt.nextBtnText}}</button> <button class=wzfooterbtn style=margin-left:4px ng-click=acceptBtnClicked() ng-if=\"opt.acceptBtn.showAcceptBtn&&visiblePageIdx===wzpages.length-1\">{{opt.acceptBtn.acceptBtnText}}</button></div></div>");
}]);

/**
 * @ngdoc object
 * @name wzwizard
 * @description wzwizard is module of wzwizard.
 */
angular.module('wzwizard', ["template-wzwizard-0.0.6.html"])

/**
 * @ngdoc object
 * @name wzwizardConfig
 * @description wzwizardConfig constants of the date picker.
 */
    .constant('wzwizardConfig', {
        PAGE_NUMBER_SEPARATOR: '.'
    })

/**
 * @ngdoc object
 * @name wzwizard
 * @description wzwizard is main directive of the component and it implements the wizard.
 */
    .directive('wzwizard', function () {
        return {
            restrict: 'EA',
            templateUrl: 'templates/wzwizard.html',
            transclude: true,
            scope: {
                opt: '=options'
            },
            controller: ['$scope', 'wzwizardConfig', function ($scope, wzwizardConfig) {
                $scope.config = wzwizardConfig;
                $scope.wzpages = [];
                $scope.visiblePageIdx = 0;
                $scope.response = {result: true, message: ''};

                // Add pages to the array
                this.addPage = function (page) {
                    page.visible = $scope.wzpages.length === 0 ? true : false;
                    $scope.wzpages.push(page);
                };
            }],
            link: function (scope, element, attrs) {
                scope.backBtnClicked = function () {
                    resetError();
                    back();
                    pageChanged(scope.visiblePageIdx + 1, scope.visiblePageIdx);
                };

                scope.nextBtnClicked = function () {
                    scope.response = isPageDataValid();
                    if (scope.response.result) {
                        next();
                        pageChanged(scope.visiblePageIdx - 1, scope.visiblePageIdx);
                    }
                };

                scope.acceptBtnClicked = function () {
                    if (scope.opt.acceptBtn.acceptBtnCb) {
                        var resp = scope.opt.acceptBtn.acceptBtnCb();
                        if (angular.isObject(resp)) {
                            scope.response = resp;
                        }
                    }
                };

                function back() {
                    scope.wzpages[scope.visiblePageIdx--].visible = false;
                    scope.wzpages[scope.visiblePageIdx].visible = true;
                }

                function next() {
                    scope.wzpages[scope.visiblePageIdx++].visible = false;
                    scope.wzpages[scope.visiblePageIdx].visible = true;
                }

                function isPageDataValid() {
                    if (scope.opt.isPageDataValidCb) {
                        return scope.opt.isPageDataValidCb(scope.visiblePageIdx);
                    }
                    return true;
                }

                function pageChanged(oldPageIdx, newPageIdx) {
                    if (scope.opt.pageChangedCb) {
                        scope.opt.pageChangedCb(oldPageIdx, newPageIdx);
                    }
                }

                function resetError() {
                    scope.response = {valid: true, message: ''};
                }
            }
        };
    })
/**
 * @ngdoc object
 * @name wzpage
 * @description wzpage directive implements one page of wizard.
 */
    .directive('wzpage', function () {
        return {
            require: '^wzwizard',
            restrict: 'E',
            transclude: true,
            scope: {},
            link: function (scope, element, attrs, ctrl) {
                scope.title = attrs.title !== undefined ? attrs.title : '';
                ctrl.addPage(scope);
            },
            templateUrl: 'templates/wzpage.html'
        };
    });



