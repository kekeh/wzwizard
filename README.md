# wzwizard v. 0.0.6

**Wizard - AngularJS reusable UI component**

## Description
Simple AngularJS directive which implements the wizard. Depends on only the AngularJS.

## Usage

* include the **wzwizard-0.0.6.min.js** and the **wzwizard-0.0.6.min.css** files into your project. See the **Build project** and the **Installation** chapters below.
```html
<script src="wzwizard-0.0.6.min.js"></script>
<link href="wzwizard-0.0.6.min.css" rel="stylesheet" type="text/css">
```
* inject the **wzwizard** module into your application module.
```js
angular.module('sampleapp', ['wzwizard']);
```
* add **wzwizard** HTML tag into your HTML file. See the **HTML example** chapter below.
* add needed Javascript code. See the **Javascript example** chapter below.

### HTML example
```html
<div ng-app="sampleapp" ng-controller="sampleappctrl">

    <wzwizard options="opt">
        <wzpage title="Page 1">
            <div>page 1 content here</div>
        </wzpage>
        <wzpage title="Page 2">
            <div>page 2 content here</div>
        </wzpage>
    </wzwizard>
    
</div>
```

### Tags
| Tag  | Description | Mandatory | 
| :------------ |:---------------|:---------------:|
| wzwizard | wzwizard tag | yes | 


### Attributes
| Attribute | Description | Mandatory | 
| :------------ |:---------------|:---------------:|
| options | wzwizard configuration object. See below. | yes |


### Options data (an options attribute in the wzwizard directive)

| Attribute | Description | Values | Mandatory |
| :------------ |:---------------|:---------------|:---------------|
| **backBtnText** | Back button text. | text | yes |
| **nextBtnText** | Next button text. | text | yes |
| **acceptBtn** | Object which contain sub properties. | See below. | yes |
| acceptBtn.**showAcceptBtn** | Is accept button shown or not. | true or false | no |
| acceptBtn.**acceptBtnText** | Accept button text. | text | if the **showAcceptBtn** is true |
| acceptBtn.**acceptBtnCb** | Accept button click callback function. See below. | function | if the **showAcceptBtn** is true |
| **showPageNumber** | Is page number shown before title text or not. | true or false | no |
| **isPageDataValidCb** | Next button click callback function. See below. | function | no |
| **pageChangedCb** | Page change callback function. See below. | function | no |


### Javascript example
```js
var sampleapp = angular.module('sampleapp', ['wzwizard']);
sampleapp.controller('sampleappctrl', function ($scope) {

    function onIsPageDataValidFn(pageIdx) {
        if(pageIdx === pageValid) {
            return {result: true};
        }
        else {
            return {result: false, message: 'Optional error message!'};
        }
    }

    function onPageChangedFn(oldPageIdx, newPageIdx) {
        console.log('oldPageIdx: ', oldPageIdx, ' - newPageIdx: ', newPageIdx);
    }

    function onAcceptBtnFn() {
        // Return OK message
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
```

#### acceptBtnCb

Example of the function. See description of the parameters below the example.

```js
    function onAcceptBtnFn() {
        // Return OK message
        return {result: true, message: 'Thanks, well done.'};
    }
```

| Function | Parameters | Description | 
| :------------ |:---------------|:---------------|
| onAcceptBtnFn | none | Called when the user selects the accept button from the last page of wizard. |

##### Return value
* Returns javascript object which have two properties.
```js
{
    result: true, 
    message: 'Thanks, well done.'
}
```
* result: result of the operation: true or false
* message: Optional message
  * If result is **true** - OK message
  * If result is **false** - error message


#### isPageDataValidCb

Example of the function. See description of the parameters below the example.

```js
    function onIsPageDataValidFn(pageIdx) {
        if(pageIdx === pageValid) {
            return {result: true};
        }
        else {
            return {result: false, message: 'Optional error message!'};
        }
    }
```

| Function | Parameters | Description | 
| :------------ |:---------------|:---------------|
| onIsPageDataValidFn | pageIdx | Called when the user selects the next button from the wizard. |

##### Parameters
* pageIdx: index of the page in wizard (index is starting from zero)

##### Return value
* Returns javascript object which have two properties.
```js
{
    result: false, 
    message: 'Name is mandatory!'
}
```
* result: result of the operation: true or false
* message: Optional message
  * If result is **true** - OK message
  * If result is **false** - error message


#### pageChangedCb

Example of the function. See description of the parameters below the example.

```js
    function onPageChangedFn(oldPageIdx, newPageIdx) {
        console.log('oldPageIdx: ', oldPageIdx, ' - newPageIdx: ', newPageIdx);
    }
```

| Function | Parameters | Description | 
| :------------ |:---------------|:---------------|
| onIsPageDataValidFn | oldPageIdx, newPageIdx | Called when the user selects the next or the back button from the wizard. |

##### Parameters
* oldPageIdx: index of the old page in wizard (index is starting from zero)
* newPageIdx: index of the new page in wizard (index is starting from zero)


## Demo
In the **examples** folder of this project has the sample application and the online demo is [here](http://kekeh.github.io/wzwizard)

## Dependencies
Depends on AngularJS. Implemented using the AngularJS version 1.3.17.

## Build project
* Build can be done by executing the **grunt** command. It creates the **dist/debug** and the **dist/min** folders and put files to these folders.
```js
grunt
```

## Installation
* Installation can be done using the **bower**. It installs files from the **dist/debug** and the **dist/min** folders. Needed CSS and javascript files are located in these folders.
```js
bower install wzwizard
```

## Compatibility (tested with)
* IE 9+
* Firefox 36
* Google Chrome 41
* Opera 28.0
* Mobile Safari 8

## License
* License: MIT

## Author
* Author: kekeh