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
In ```data```

### Single components

Alternatively you can use each single form-field component as a standalone 
