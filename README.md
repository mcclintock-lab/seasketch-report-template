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

Open a new terminal, and run `grunt connect`. Then in another terminal, run `grunt watch`. This will start a local server at `http://localhost:8080/` which makes accessible every file under `dist/`. `grunt watch` will watch all source files and recompile them for hosting under `dist/`. All grunt-related commands are configured via `Gruntfile.coffee`. See [the Grunt docs](http://gruntjs.com/) for more info on how to use this file. Just think of it as a webapp-focused Makefile. If you need to manually compile the javascript and stylesheet files within dist, simple run `grunt` without any arguments.

### Configuring Seasketch

Now that you are hosting this demo module locally you can configure SeaSketch to use it. Each SketchClass supports a the addition of client reporting module urls. For debugging purposes, you can load a reporting module url for any SketchClass as part of your temporary browser session. This means you can just go to the relevant SeaSketch project on the production site, and load and view development code hosted on your local machine.

To do so first open the attributes/report for your SketchClass of interest, click on the gear icon, and choose _load report client code_.

![](https://s3.amazonaws.com/SeaSketch/load_client_report.png)

Instruct SeaSketch to load `http://localhost:8080/report.js`. Load the report again, and you should see the demo report tab, and the gear icon should turn red indicating you have a custom report loaded. Via the same context menu you can choose _clear report client code_ to reset to the default, or choose load again to reload this file without refreshing your browser.

## Customizing your report

Report implementations are simply Javascript, HTML, and CSS code, and the code framework is quite minimal and in flux. The best way to get up to speed is to just dive into the demo and other reporting modules hosted under the mcclintock-lab github organization. Keep the following in mind while developing new reports:

### Registering tabs

`scripts/reports.coffee` contains an example that loads a single tab and single stylesheet. Stylesheets are loaded "globally", so it's up to the author to make sure all selectors are scoped to the appropriate tabs. The `report.tabs` method can register multiple tabs that should be associated with a SketchClass.

### Tab implementations

`scripts/tab.coffee` contains an example tab. It subclasses `lib/reportTab` (as should all reports) and as a simple demo has no geoprocessing dependencies.

### Defining geoprocessing service dependencies

Most report tabs will require the results of one or more geoprocessing service runs. To specify needed data, add key properties to the reportTab implementation like so:
```coffeescript
class OverviewTab extends ReportTab
  name: 'Overview'
  dependencies: ['SizeStats']
  timeout: 15000
```
In this case the OverviewTab requires a geoprocessing service named SizeStats to be run, and will throw a timeout error after 15 seconds (the default is 10s). SizeStats refers to an "AnalyticalService" added to the SketchClass configuration via the admin interface. A named id is used rather than the url of the service so that geoprocessing services can be re-deployed to other locations without requiring code changes. Example of how a service can be configured in SeaSketch:

![](https://s3.amazonaws.com/SeaSketch/sizestats.png)

#### LiveReload

When running `grunt watch` it can act as a [LiveReload](http://livereload.com/) server for stylesheets. With the LiveReload browser extension installed, changes to report css will update in the browser without requiring browser reloads.

#### D3 Visualizations

[D3](http://d3js.org/) is a fantastic way to make interactive visualizations, and the only such library included in SeaSketch by default. Unfortunately it is not compatible with IE8. Develop visualizations for modern browsers and provide a table-based fallback for all others. The demo tab under `script/tab.coffee` and `templates/demo.mustache` has an example of how to use conditional statements in your html and test for the presence of d3 to alert the user when visualizations aren't available for their browser.

