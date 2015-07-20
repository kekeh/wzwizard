describe('wzwizard', function () {
    var elm, scope;

    beforeEach(module('wzwizard'));

    beforeEach(inject(function ($rootScope, $compile) {

        scope = $rootScope;

        function onIsPageDataValidFn(pageIdx) {
            console.log('onIsPageDataValidFn(): ', pageIdx);
            return {result: true};
        }

        function onPageChangedFn(oldPageIdx, newPageIdx) {
            console.log('oldPageIdx: ', oldPageIdx, ' - newPageIdx: ', newPageIdx);
        }

        function onAcceptBtnFn() {
            console.log('onAcceptBtnFn() called!');
            return {result: true, message: 'Thanks, well done.'};
        }

        // Configuration of the wzwizard
        scope.opt = {
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

        elm = angular.element('<wzwizard options="opt"><wzpage title="page 1"><div id="p1">page 1 content</div></wzpage><wzpage title="page 2"><div id="p2">page 2 content</div></wzpage></wzwizard>');

        $compile(elm)(scope);
        scope.$digest();

    }));

    it('is wzwizard', function () {
        expect(elm[0].querySelectorAll('.wzwizard').length).toBe(1);
    });

    it('is wzpages', function () {
        expect(elm[0].querySelectorAll('.wzpages').length).toBe(1);
    });

    it('is wzpage', function () {
        expect(elm[0].querySelectorAll('.wzpage').length).toBe(2);
    });

    it('is wzcontent', function () {
        expect(elm[0].querySelectorAll('.wzcontent').length).toBe(1);
    });

    it('is p1', function () {
        expect(elm[0].querySelectorAll('#p1').length).toBe(1);
    });

    it('p1 content', function () {
        var tElem = elm[0].querySelectorAll('#p1');
        expect(angular.element(tElem).text()).toEqual('page 1 content');
    });

    it('is p2', function () {
        expect(elm[0].querySelectorAll('#p2').length).toBe(1);
    });

    it('p2 content', function () {
        var tElem = elm[0].querySelectorAll('#p2');
        expect(angular.element(tElem).text()).toEqual('page 2 content');
    });

    it('is wzfooter', function () {
        expect(elm[0].querySelectorAll('.wzfooter').length).toBe(1);
    });

    it('is wzfooterbtn', function () {
        expect(elm[0].querySelectorAll('.wzfooterbtn').length).toBe(1);
    });

    it('wzfooterbtn content', function () {
        var tElem = elm[0].querySelectorAll('.wzfooterbtn');
        expect(angular.element(tElem).text().trim()).toEqual(scope.opt.nextBtnText);
    });

});