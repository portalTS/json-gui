# Json-gui

Json-gui is an angular front-end module that dynamically generates a full-featured form-based web interface, including validation and constraints.
Starting from a formal JSON configuration describing a list of inputs (that can be a select, a text or integer input or other types), this module is able to build a form frame interface, with standard type - but also personalized - **validation**, also giving the possibility to define **any constraint** between inputs. 

# Quick start
## TODO
bower install or download the folder
include dist/json-gui.js and dist/json-gui.css

# Usage

Two different usages are possible:
- using the whole json-gui component
- using single components for declaring single input fields.

### json-gui component

In order to use this component, you only have to add the corresponding tag to your HTML file:

```
<json-gui data="data"></json-gui>
```
The ```data``` object contains the entire object needed (see Wiki section), with the metadata and a list of parameters, from which the form will be built.

### Single components

Alternatively you can use each single form-field component as a standalone component in order to build single input fields.

In the very same way as with the json-gui component, you can add each tag to your HTML file:

```
<integer parameter="param" dependencies="dep"></integer>
<float parameter="param" dependencies="dep"></float>
<datetime parameter="param" dependencies="dep"></datetime>
<select-parameter parameter="param" dependencies="dep"></select-parameter>
<text-parameter parameter="param" dependencies="dep"></text-parameter>
<domains parameter="param" dependencies="dep"></domains>
<fileupload parameters="param" dependencies="dep"></fileupload>
```
The ```parameter``` attribute specifies the parameter object linked to that field, while the ```dependencies``` attribute expects an array containing the dependencies (among the other form fields) used for the validation of that field.

# Dependencies
This module need some dependencies:
- angular
- jquery
- bootstrap (both js and css files)

Moreover some components need some other library dependencies:
-  ```fileupload``` component needs [```ng-file-upload```](https://github.com/danialfarid/ng-file-upload) dependencie.
-  ```datetime``` component needs ```moment.js``` dependencie.
-  ```domains``` component need ```Google Map Drawing Api```

You can install the first dependencies with bower:

```
bower install ng-file-upload --save
bower install moment --save
```
while to include the Google Map drawing Api, you only have to load them in your HTML file:

```
<script type="text/javascript"
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=drawing">
</script>
```
replacing ```YOUR_API_KEY``` with an API_KEY, that you can retrieve from [here](https://developers.google.com/maps/documentation/javascript/get-api-key)

