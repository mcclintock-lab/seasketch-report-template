# SeaSketch Reporting Template


SeaSketch reports are built upon two major components. The first are geoprocessing services built currently 
on arcgis server. These services accept a "Sketch" or "SketchCollection" and output the results of spatial
analysis on those feature(s). The second component is that used to visualize the output of these services.
These "Client Reporting Modules" can depend on the output of zero, one, or many geoprocessing services and
present user-friendly representations of the output. This repository is a template from which all client 
reporting modules should be based on.

## Creating a new Client Reporting Module

First clone this template repository. Just run the following commands to clone
this repo locally, and install all it's dependencies.

```
git clone git@github.com:mcclintock-lab/seasketch-report-template.git
cd seasketch-report-template
npm install
```

Included in the dependencies is [the SeaSketch reporting api library](https://github.com/mcclintock-lab/seasketch-reporting-api). This libary 
contains the base `ReportTab` class from which all report code is based.

## Loading your locally-hosted module

### Running a local server and compiling the module

You'll want to test your reporting module code within SeaSketch as you work. To do so, let startup a local server to host this module and startup a daemon that will compile changes to source files as they are modified.

Open a new terminal, and run `grunt connect`. Then in another terminal, run `grunt watch`. This will start a local server at `http://localhost:8080/` which makes accessible every file under `dist/`. `grunt watch` will watch all source files and recompile them for hosting under `dist/`. All grunt-related commands are configured via `Gruntfile.coffee`. If you need to manually compile the javascript and stylesheet files within dist, simple run `grunt` without any arguments.

### Configuring Seasketch

Now that you are hosting this demo module locally you can configure SeaSketch to use it. Each SketchClass supports a the addition of client reporting module urls. For debugging purposes, you can load a reporting module url for any SketchClass as part of your temporary browser session. This means you can just go to the relevant SeaSketch project on the production site, and load and view development code hosted on your local machine.

To do so first open the attributes/report for your SketchClass of interest, click on the gear icon, and choose _load report client code_.

![](//Screen%20Shot%202013-08-09%20at%202.34.13%20PM.png)