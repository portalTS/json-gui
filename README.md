# Json-gui

Json-gui is an angular front-end module that dynamically generates a full-featured form-based web interface, including validation and constraints.
Starting from a formal JSON configuration describing a list of inputs (that can be a select, a text or integer input or other types), this module is able to build a form frame interface, with standard type - but also personalized - **validation**, also giving the possibility to define **any constraint** between inputs. 

# Installation

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
<integer parameters="param" dependencies="dep"></integer>
<float parameters="param" dependencies="dep"></float>
<datetime parameters="param" dependencies="dep"></datetime>
<select-parameter parameters="param" dependencies="dep"></select-parameter>
<text-parameter parameters="param" dependencies="dep"></text-parameter>
<domains parameters="param" dependencies="dep"></domains>
<fileupload parameters="param" dependencies="dep"></fileupload>
```

# Dependencies
