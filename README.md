# Json-gui

Json-gui is an **AngularJS** front-end module that dynamically generates a full-featured form-based web interface, including validation and constraints.
Starting from a formal JSON configuration object describing a list of inputs (that can be a select, a text or integer input or other types), this module is able to build a form frame interface, with standard type - but also personalized - **validation**, also giving the possibility to define **any constraint** between inputs.

# Features
- automatic form interface builder
- many input types
- intra-parameter constraints
- type validation
- personalizable validation

# Live Demo & Wiki
A live demo is available [here](https://plnkr.co/edit/RWTAKi9kRUEdrrb3p6Kp), while a more detailed tutorial can be found [here](https://github.com/portalTS/json-gui/wiki).
# Quick start

You can download the project here from GitHub or, alternatively, you can install it with bower:

```
bower install json-gui --save
```
In both cases, you have to include two files in your HTML:

```html
<script src="dist/json-gui.js"></script>
<link rel="stylesheet" href="dist/json-gui.css"/>
```
The project also contains a basic usage example:

the ```index.html``` file includes a ```json-gui``` tag, that is getting the data from the ```json/wrf-arw.json``` file, as can be
shown in the ```js/mainController.js``` file.

# Usage

First of all, you have to add the ```json-gui``` dependencie to your angular module:

```javascript
var app = angular.module('app', ['json-gui']).config(function(){
});
app.run(function(){
...
})
...
```

Two different usages are possible:
- using the whole json-gui component
- using single components for declaring single input fields.

### json-gui component

In order to use this component, you only have to add the corresponding tag to your HTML file:

```html
<json-gui data="data" values="values"></json-gui>
```
The ```data``` object contains the entire object needed (see Wiki section), with the metadata and a list of parameters, from which the form will be built.
The ```values``` object is an optional object defining the values of the parameter that compose the interface.

In this way, ```data``` will contain the definition of the form interface, including all the parameters composing it and their default values; while ```values```, if present, will contain their current values.

### Single components

Alternatively you can use each single form-field component as a standalone component in order to build single input fields.

In the very same way as with the json-gui component, you can add each tag to your HTML file:

```html
<integer json-input parameter="param" dependencies="dep" validation="false"></integer>
<float json-input parameter="param" dependencies="dep" validation="false"></float>
<datetime json-input parameter="param" dependencies="dep" validation="false"></datetime>
<select-parameter json-input parameter="param" dependencies="dep" validation="false"></select-parameter>
<text-parameter json-input parameter="param" dependencies="dep" validation="false"></text-parameter>
<domains json-input parameter="param" dependencies="dep" validation="false"></domains>
<fileupload json-input parameters="param" dependencies="dep" validation="false"></fileupload>
```
The ```parameter``` attribute specifies the parameter object linked to that field, while the ```dependencies``` attribute expects an array containing the dependencies (among the other form fields) used for the validation of that field (see Wiki section).
Lastly, the ```validation``` boolean attribute allows the field validation for the parameter.

It is also worth noting that each element needs to have an attribute named  ```json-input ```, that is the base generic input defined by the json-gui module, and handles the generic validation for the input fields.

# Dependencies
This module need some dependencies:
- AngularJS
- jQuery
- Bootstrap (both js and css files)

Moreover some components need some other library dependencies:
-  ```fileupload``` component needs [```ng-file-upload```](https://github.com/danialfarid/ng-file-upload) dependencie.
-  ```datetime``` component needs [```moment.js```](http://momentjs.com/) dependencie.
-  ```domains``` component need [```Google Maps Drawing Api```](https://developers.google.com/maps/documentation/javascript/examples/drawing-tools) dependencie.

You can install the first two dependencies with bower:

```
bower install ng-file-upload --save
bower install moment --save
```
while to include the Google Maps Drawing Api, you only have to load them in your HTML file:

```html
<script type="text/javascript"
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=drawing">
</script>
```
replacing ```YOUR_API_KEY``` with an Api Key, that you can retrieve from [here](https://developers.google.com/maps/documentation/javascript/get-api-key).

### NOTES
If you install Json-gui with bower, it will also install all of these dependencies, except the Google Maps Drawing Api,
and you will only have to include the files in your HTML.
