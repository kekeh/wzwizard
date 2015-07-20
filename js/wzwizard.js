/**
 * @ngdoc object
 * @name wzwizard
 * @description wzwizard is module of wzwizard.
 */
angular.module('wzwizard', [])

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
                    scope.isValid = {valid: true, message: ''};
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



