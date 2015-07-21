/**
 * @ngdoc object
 * @name sampleapp
 * @description sampleapp is module of sampleapp. It injects wzwizard.
 */
var sampleapp = angular.module('sampleapp', ['wzwizard']);

/**
 * @ngdoc object
 * @name samplectrl
 * @description samplectrl is controller of sampleapp.
 */
sampleapp.controller('samplectrl', function ($scope) {

    $scope.values = {
        firstname: '',
        lastname: '',
        gender: '',
        streetaddress: '',
        zip: '',
        city: '',
        email: '',
        phone: ''
    };


    function onIsPageDataValidFn(pageIdx) {
        console.log('onIsPageDataValidFn(): ', pageIdx);
        if (pageIdx === 0) {
            if ($scope.values.firstname === '') {
                return {result: false, message: 'First name: value required!'};
            }
            else if ($scope.values.lastname === '') {
                return {result: false, message: 'Last name: value required!'};
            }
            else if ($scope.values.gender === '') {
                return {result: false, message: 'Gender: value required!'};
            }
            else {
                return {result: true};
            }
        }
        else if (pageIdx === 1) {
            if ($scope.values.streetaddress === '') {
                return {result: false, message: 'Street address: value required!'};
            }
            else if ($scope.values.zip === '') {
                return {result: false, message: 'Zip: value required!'};
            }
            else if ($scope.values.city === '') {
                return {result: false, message: 'City: value required!'};
            }
            else {
                return {result: true};
            }
        }
        else if (pageIdx === 2) {
            if ($scope.values.email === '') {
                return {result: false, message: 'Email: value required!'};
            }
            else if ($scope.values.phone === '') {
                return {result: false, message: 'Phone: value required!'};
            }
            else {
                return {result: true};
            }
        }
    }

    function onPageChangedFn(oldPageIdx, newPageIdx) {
        console.log('oldPageIdx: ', oldPageIdx, ' - newPageIdx: ', newPageIdx);
    }

    function onAcceptBtnFn() {
        console.log('onAcceptBtnFn() called!');
        return {result: true, message: 'Thanks, well done.'};
    }

    // Configuration of the wzwizard
    $scope.opt = {
        backBtnText: 'Back',
        nextBtnText: 'Next',
        acceptBtn: {
            showAcceptBtn: true,
            acceptBtnText: 'Save',
            acceptBtnCb: onAcceptBtnFn
        },
        showPageNumber: true,
        isPageDataValidCb: onIsPageDataValidFn,
        pageChangedCb: onPageChangedFn
    };

});
