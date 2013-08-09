require=(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
module.exports = function(el) {
  var $el, $toggler, app, e, node, nodeid, toc, toggler, togglers, view, _i, _len, _ref;
  $el = $(el);
  app = window.app;
  toc = app.getToc();
  if (!toc) {
    console.log('No table of contents found');
    return;
  }
  togglers = $el.find('a[data-toggle-node]');
  _ref = togglers.toArray();
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    toggler = _ref[_i];
    $toggler = $(toggler);
    nodeid = $toggler.data('toggle-node');
    try {
      view = toc.getChildViewById(nodeid);
      node = view.model;
      $toggler.attr('data-visible', !!node.get('visible'));
      $toggler.data('tocItem', view);
    } catch (_error) {
      e = _error;
      $toggler.attr('data-not-found', 'true');
    }
  }
  return togglers.on('click', function(e) {
    e.preventDefault();
    $el = $(e.target);
    view = $el.data('tocItem');
    if (view) {
      view.toggleVisibility(e);
      return $el.attr('data-visible', !!view.model.get('visible'));
    } else {
      return alert("Layer not found in the current Table of Contents. \nExpected nodeid " + ($el.data('toggle-node')));
    }
  });
};


},{}],"B0+LVn":[function(require,module,exports){
var ReportTab, enableLayerTogglers, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

enableLayerTogglers = require('./enableLayerTogglers.coffee');

ReportTab = (function(_super) {
  __extends(ReportTab, _super);

  function ReportTab() {
    this.remove = __bind(this.remove, this);
    _ref = ReportTab.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ReportTab.prototype.name = 'Information';

  ReportTab.prototype.dependencies = [];

  ReportTab.prototype.initialize = function(model, options) {
    this.model = model;
    this.options = options;
    this.app = window.app;
    return _.extend(this, this.options);
  };

  ReportTab.prototype.render = function() {
    throw 'render method must be overidden';
  };

  ReportTab.prototype.show = function() {
    this.$el.show();
    return this.visible = true;
  };

  ReportTab.prototype.hide = function() {
    this.$el.hide();
    return this.visible = false;
  };

  ReportTab.prototype.remove = function() {
    return ReportTab.__super__.remove.call(this);
  };

  ReportTab.prototype.onLoading = function() {};

  ReportTab.prototype.getResult = function(id) {
    var result, results;
    results = this.getResults();
    result = _.find(results, function(r) {
      return r.paramName === id;
    });
    if (result == null) {
      throw new Error('No result with id ' + id);
    }
    return result.value;
  };

  ReportTab.prototype.getFirstResult = function(param, id) {
    var e, result;
    result = this.getResult(param);
    try {
      return result[0].features[0].attributes[id];
    } catch (_error) {
      e = _error;
      throw "Error finding " + param + ":" + id + " in gp results";
    }
  };

  ReportTab.prototype.getResults = function() {
    var results, _ref1, _ref2;
    if (!(results = (_ref1 = this.results) != null ? (_ref2 = _ref1.get('data')) != null ? _ref2.results : void 0 : void 0)) {
      throw new Error('No gp results');
    }
    return _.filter(results, function(result) {
      var _ref3;
      return (_ref3 = result.paramName) !== 'ResultCode' && _ref3 !== 'ResultMsg';
    });
  };

  ReportTab.prototype.enableLayerTogglers = enableLayerTogglers;

  return ReportTab;

})(Backbone.View);

module.exports = ReportTab;


},{"./enableLayerTogglers.coffee":1}],"reportTab":[function(require,module,exports){
module.exports=require('B0+LVn');
},{}],4:[function(require,module,exports){
var Tab;

Tab = require('./tab.coffee');

window.app.registerReport(function(report) {
  report.tabs([Tab]);
  return report.stylesheets(['./report.css']);
});


},{"./tab.coffee":5}],5:[function(require,module,exports){
var DemoTab, ReportTab, d3, templates, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ReportTab = require('reportTab');

templates = require('../templates/templates.js');

d3 = window.d3;

DemoTab = (function(_super) {
  __extends(DemoTab, _super);

  function DemoTab() {
    _ref = DemoTab.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  DemoTab.prototype.name = 'Examples';

  DemoTab.prototype.className = 'demo';

  DemoTab.prototype.template = templates.demo;

  DemoTab.prototype.render = function() {
    var context, data;
    data = [];
    _.times(100, function() {
      return data.push(Math.round(Math.random() * 100));
    });
    context = {
      sketch: this.model.forTemplate(),
      sketchClass: this.sketchClass.forTemplate(),
      attributes: this.model.getAttributes(),
      admin: this.project.isAdmin(window.user),
      chartData: _.map(data, function(d, i) {
        return {
          index: i,
          value: d
        };
      })
    };
    this.$el.html(this.template.render(context, templates));
    this.$('#tabs2 a').click(function(e) {
      console.log('tab click');
      e.preventDefault();
      return $(this).tab('show');
    });
    return this.drawChart(data);
  };

  DemoTab.prototype.drawChart = function(data) {
    var color, height, margin, p, svg, width, x, xAxis, y, yAxis;
    console.log('draw chart');
    p = this.$('#chart p');
    console.log('p', p.length, this.el);
    margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    };
    width = 430 - margin.left - margin.right;
    height = 300 - margin.top - margin.bottom;
    x = d3.scale.linear().range([0, width]);
    y = d3.scale.linear().range([height, 0]);
    color = d3.scale.category10();
    xAxis = d3.svg.axis().scale(x).orient("bottom");
    yAxis = d3.svg.axis().scale(y).orient("left");
    svg = d3.select(this.$("#chart")[0]).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    x.domain([0, data.length]).nice();
    y.domain(d3.extent(data, function(d) {
      return d;
    })).nice();
    svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis).append("text").attr("class", "label").attr("x", width).attr("y", -6);
    svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("class", "label").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em");
    svg.selectAll(".dot").data(data).enter().append("circle").attr("class", "dot").attr("r", 3.5).attr("cx", function(d, i) {
      return x(i);
    }).attr("cy", function(d, i) {
      return y(d);
    }).style("fill", function(d) {
      return color(d);
    });
    p.detach();
    return this.$('#chart').append(p);
  };

  return DemoTab;

})(ReportTab);

module.exports = DemoTab;


},{"../templates/templates.js":6,"reportTab":"B0+LVn"}],6:[function(require,module,exports){
this["Templates"] = this["Templates"] || {};

this["Templates"]["demo"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<div class=\"reportSection\">");_.b("\n" + i);_.b("  <h4>Report Sections</h4>");_.b("\n" + i);_.b("  <p>Use report sections to group information into meaningful categories</p>");_.b("\n" + i);_.b("</div>");_.b("\n" + i);_.b("\n" + i);_.b("<div class=\"reportSection\">");_.b("\n" + i);_.b("  <h4>D3 Visualizations</h4>");_.b("\n" + i);_.b("  <ul class=\"nav nav-pills\" id=\"tabs2\">");_.b("\n" + i);_.b("    <li class=\"active\"><a href=\"#chart\">Chart</a></li>");_.b("\n" + i);_.b("    <li><a href=\"#dataTable\">Table</a></li>");_.b("\n" + i);_.b("  </ul>");_.b("\n" + i);_.b("  <div class=\"tab-content\">");_.b("\n" + i);_.b("    <div class=\"tab-pane active\" id=\"chart\">");_.b("\n" + i);_.b("      <!--[if IE 8]>");_.b("\n" + i);_.b("      <p class=\"unsupported\">");_.b("\n" + i);_.b("      This visualization is not compatible with Internet Explorer 8. ");_.b("\n" + i);_.b("      Please upgrade your browser, or view results in the table tab.");_.b("\n" + i);_.b("      </p>      ");_.b("\n" + i);_.b("      <![endif]-->");_.b("\n" + i);_.b("      <p>");_.b("\n" + i);_.b("        See <code>src/scripts/demo.coffee</code> for an example of how to ");_.b("\n" + i);_.b("        use d3.js to render visualizations. Provide a table-based view");_.b("\n" + i);_.b("        and use conditional comments to provide a fallback for IE8 users.");_.b("\n" + i);_.b("        <br>");_.b("\n" + i);_.b("        <a href=\"http://twitter.github.io/bootstrap/2.3.2/\">Bootstrap 2.x</a>");_.b("\n" + i);_.b("        is loaded within SeaSketch so you can use it to create tabs and other ");_.b("\n" + i);_.b("        interface components. jQuery and underscore are also available.");_.b("\n" + i);_.b("      </p>");_.b("\n" + i);_.b("    </div>");_.b("\n" + i);_.b("    <div class=\"tab-pane\" id=\"dataTable\">");_.b("\n" + i);_.b("      <table>");_.b("\n" + i);_.b("        <thead>");_.b("\n" + i);_.b("          <tr>");_.b("\n" + i);_.b("            <th>index</th>");_.b("\n" + i);_.b("            <th>value</th>");_.b("\n" + i);_.b("          </tr>");_.b("\n" + i);_.b("        </thead>");_.b("\n" + i);_.b("        <tbody>");_.b("\n" + i);if(_.s(_.f("chartData",c,p,1),c,p,0,1351,1418,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("          <tr><td>");_.b(_.v(_.f("index",c,p,0)));_.b("</td><td>");_.b(_.v(_.f("value",c,p,0)));_.b("</td></tr>");_.b("\n");});c.pop();}_.b("        </tbody>");_.b("\n" + i);_.b("      </table>");_.b("\n" + i);_.b("    </div>");_.b("\n" + i);_.b("  </div>");_.b("\n" + i);_.b("</div>");_.b("\n" + i);_.b("\n" + i);_.b("<div class=\"reportSection emphasis\">");_.b("\n" + i);_.b("  <h4>Emphasis</h4>");_.b("\n" + i);_.b("  <p>Give report sections an <code>emphasis</code> class to highlight important information.</p>");_.b("\n" + i);_.b("</div>");_.b("\n" + i);_.b("\n" + i);_.b("<div class=\"reportSection warning\">");_.b("\n" + i);_.b("  <h4>Warning</h4>");_.b("\n" + i);_.b("  <p>Or <code>warn</code> of potential problems.</p>");_.b("\n" + i);_.b("</div>");_.b("\n" + i);_.b("\n" + i);_.b("<div class=\"reportSection danger\">");_.b("\n" + i);_.b("  <h4>Danger</h4>");_.b("\n" + i);_.b("  <p><code>danger</code> can also be used... sparingly.</p>");_.b("\n" + i);_.b("</div>");return _.fl();;});

module.exports = this["Templates"];
},{}]},{},[4])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvY2J1cnQvV29ya2luZy9zZWFza2V0Y2gtcmVwb3J0LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9zZWFza2V0Y2gtcmVwb3J0aW5nLWFwaS9zY3JpcHRzL2VuYWJsZUxheWVyVG9nZ2xlcnMuY29mZmVlIiwiL1VzZXJzL2NidXJ0L1dvcmtpbmcvc2Vhc2tldGNoLXJlcG9ydC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvc2Vhc2tldGNoLXJlcG9ydGluZy1hcGkvc2NyaXB0cy9yZXBvcnRUYWIuY29mZmVlIiwiL1VzZXJzL2NidXJ0L1dvcmtpbmcvc2Vhc2tldGNoLXJlcG9ydC10ZW1wbGF0ZS9zY3JpcHRzL3JlcG9ydC5jb2ZmZWUiLCIvVXNlcnMvY2J1cnQvV29ya2luZy9zZWFza2V0Y2gtcmVwb3J0LXRlbXBsYXRlL3NjcmlwdHMvdGFiLmNvZmZlZSIsIi9Vc2Vycy9jYnVydC9Xb3JraW5nL3NlYXNrZXRjaC1yZXBvcnQtdGVtcGxhdGUvdGVtcGxhdGVzL3RlbXBsYXRlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsQ0FBTyxDQUFVLENBQUEsR0FBWCxDQUFOLEVBQWtCO0NBQ2hCLEtBQUEsMkVBQUE7Q0FBQSxDQUFBLENBQUE7Q0FBQSxDQUNBLENBQUEsR0FBWTtDQURaLENBRUEsQ0FBQSxHQUFNO0FBQ0MsQ0FBUCxDQUFBLENBQUEsQ0FBQTtDQUNFLEVBQUEsQ0FBQSxHQUFPLHFCQUFQO0NBQ0EsU0FBQTtJQUxGO0NBQUEsQ0FNQSxDQUFXLENBQUEsSUFBWCxhQUFXO0NBRVg7Q0FBQSxNQUFBLG9DQUFBO3dCQUFBO0NBQ0UsRUFBVyxDQUFYLEdBQVcsQ0FBWDtDQUFBLEVBQ1MsQ0FBVCxFQUFBLEVBQWlCLEtBQVI7Q0FDVDtDQUNFLEVBQU8sQ0FBUCxFQUFBLFVBQU87Q0FBUCxFQUNPLENBQVAsQ0FEQSxDQUNBO0FBQytCLENBRi9CLENBRThCLENBQUUsQ0FBaEMsRUFBQSxFQUFRLENBQXdC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Q0FBQSxDQUFvQjtDQVRwQixFQVVTLENBQVQsRUFBQTtDQVZBLENBWU0sQ0FBRixDQUFKLENBQVksQ0FBUjtDQVpKLENBZU0sQ0FBRixDQUFKLENBQVksQ0FBUjtDQWZKLENBa0JVLENBQUYsQ0FBUixDQUFBLEtBQVE7Q0FsQlIsQ0FvQlUsQ0FBRixDQUFSLENBQUEsQ0FBUSxFQUFBO0NBcEJSLENBd0JVLENBQUYsQ0FBUixDQUFBLENBQVE7Q0F4QlIsQ0E0QlEsQ0FBUixDQUFBLENBQU0sQ0FBQSxDQUFBLENBQVUsR0FBVixDQUtDO0NBakNQLENBbUNhLEVBQWIsRUFBQTtDQW5DQSxDQW9DVyxDQUFjLENBQXpCLEVBQUEsR0FBMEI7Q0FBRCxZQUFPO0NBQXZCLEdBQVQsQ0FBeUI7QUFTVCxDQTdDaEIsQ0F1Q21CLENBRGhCLENBQUgsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLEdBRXdCO0NBeEN4QixDQWdEbUIsQ0FEaEIsQ0FBSCxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsRUFBQTtDQS9DQSxDQTJEbUIsQ0FIaEIsQ0FBSCxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7Q0FLMEIsWUFBQTtDQUwxQixDQU1nQixDQUFBLENBTmhCLENBS2dCLElBQ0M7Q0FBUyxZQUFBO0NBTjFCLENBT21CLENBQUEsRUFESCxDQU5oQixHQU9vQjtDQUFZLElBQU4sUUFBQTtDQVAxQixJQU9tQjtDQS9EbkIsR0FpRUEsRUFBQTtDQUNDLEdBQUEsRUFBRCxFQUFBLEdBQUE7Q0EvRkYsRUE0Qlc7O0NBNUJYOztDQURvQjs7QUFrR3RCLENBdEdBLEVBc0dpQixHQUFYLENBQU47Ozs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gKGVsKSAtPlxuICAkZWwgPSAkIGVsXG4gIGFwcCA9IHdpbmRvdy5hcHBcbiAgdG9jID0gYXBwLmdldFRvYygpXG4gIHVubGVzcyB0b2NcbiAgICBjb25zb2xlLmxvZyAnTm8gdGFibGUgb2YgY29udGVudHMgZm91bmQnXG4gICAgcmV0dXJuXG4gIHRvZ2dsZXJzID0gJGVsLmZpbmQoJ2FbZGF0YS10b2dnbGUtbm9kZV0nKVxuICAjIFNldCBpbml0aWFsIHN0YXRlXG4gIGZvciB0b2dnbGVyIGluIHRvZ2dsZXJzLnRvQXJyYXkoKVxuICAgICR0b2dnbGVyID0gJCh0b2dnbGVyKVxuICAgIG5vZGVpZCA9ICR0b2dnbGVyLmRhdGEoJ3RvZ2dsZS1ub2RlJylcbiAgICB0cnlcbiAgICAgIHZpZXcgPSB0b2MuZ2V0Q2hpbGRWaWV3QnlJZCBub2RlaWRcbiAgICAgIG5vZGUgPSB2aWV3Lm1vZGVsXG4gICAgICAkdG9nZ2xlci5hdHRyICdkYXRhLXZpc2libGUnLCAhIW5vZGUuZ2V0KCd2aXNpYmxlJylcbiAgICAgICR0b2dnbGVyLmRhdGEgJ3RvY0l0ZW0nLCB2aWV3XG4gICAgY2F0Y2ggZVxuICAgICAgJHRvZ2dsZXIuYXR0ciAnZGF0YS1ub3QtZm91bmQnLCAndHJ1ZSdcblxuICB0b2dnbGVycy5vbiAnY2xpY2snLCAoZSkgLT5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAkZWwgPSAkKGUudGFyZ2V0KVxuICAgIHZpZXcgPSAkZWwuZGF0YSgndG9jSXRlbScpXG4gICAgaWYgdmlld1xuICAgICAgdmlldy50b2dnbGVWaXNpYmlsaXR5KGUpXG4gICAgICAkZWwuYXR0ciAnZGF0YS12aXNpYmxlJywgISF2aWV3Lm1vZGVsLmdldCgndmlzaWJsZScpXG4gICAgZWxzZVxuICAgICAgYWxlcnQgXCJMYXllciBub3QgZm91bmQgaW4gdGhlIGN1cnJlbnQgVGFibGUgb2YgQ29udGVudHMuIFxcbkV4cGVjdGVkIG5vZGVpZCAjeyRlbC5kYXRhKCd0b2dnbGUtbm9kZScpfVwiXG4iLCJlbmFibGVMYXllclRvZ2dsZXJzID0gcmVxdWlyZSAnLi9lbmFibGVMYXllclRvZ2dsZXJzLmNvZmZlZSdcblxuY2xhc3MgUmVwb3J0VGFiIGV4dGVuZHMgQmFja2JvbmUuVmlld1xuICBuYW1lOiAnSW5mb3JtYXRpb24nXG4gIGRlcGVuZGVuY2llczogW11cblxuICBpbml0aWFsaXplOiAoQG1vZGVsLCBAb3B0aW9ucykgLT5cbiAgICAjIFdpbGwgYmUgaW5pdGlhbGl6ZWQgYnkgU2VhU2tldGNoIHdpdGggdGhlIGZvbGxvd2luZyBhcmd1bWVudHM6XG4gICAgIyAgICogbW9kZWwgLSBUaGUgc2tldGNoIGJlaW5nIHJlcG9ydGVkIG9uXG4gICAgIyAgICogb3B0aW9uc1xuICAgICMgICAgIC0gLnBhcmVudCAtIHRoZSBwYXJlbnQgcmVwb3J0IHZpZXcgXG4gICAgIyAgICAgICAgY2FsbCBAb3B0aW9ucy5wYXJlbnQuZGVzdHJveSgpIHRvIGNsb3NlIHRoZSB3aG9sZSByZXBvcnQgd2luZG93XG4gICAgQGFwcCA9IHdpbmRvdy5hcHBcbiAgICBfLmV4dGVuZCBALCBAb3B0aW9uc1xuXG4gIHJlbmRlcjogKCkgLT5cbiAgICB0aHJvdyAncmVuZGVyIG1ldGhvZCBtdXN0IGJlIG92ZXJpZGRlbidcblxuICBzaG93OiAoKSAtPlxuICAgIEAkZWwuc2hvdygpXG4gICAgQHZpc2libGUgPSB0cnVlXG5cbiAgaGlkZTogKCkgLT5cbiAgICBAJGVsLmhpZGUoKVxuICAgIEB2aXNpYmxlID0gZmFsc2VcblxuICByZW1vdmU6ICgpID0+XG4gICAgc3VwZXIoKVxuICBcbiAgb25Mb2FkaW5nOiAoKSAtPiAjIGV4dGVuc2lvbiBwb2ludCBmb3Igc3ViY2xhc3Nlc1xuXG4gIGdldFJlc3VsdDogKGlkKSAtPlxuICAgIHJlc3VsdHMgPSBAZ2V0UmVzdWx0cygpXG4gICAgcmVzdWx0ID0gXy5maW5kIHJlc3VsdHMsIChyKSAtPiByLnBhcmFtTmFtZSBpcyBpZFxuICAgIHVubGVzcyByZXN1bHQ/XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHJlc3VsdCB3aXRoIGlkICcgKyBpZClcbiAgICByZXN1bHQudmFsdWVcblxuICBnZXRGaXJzdFJlc3VsdDogKHBhcmFtLCBpZCkgLT5cbiAgICByZXN1bHQgPSBAZ2V0UmVzdWx0KHBhcmFtKVxuICAgIHRyeVxuICAgICAgcmV0dXJuIHJlc3VsdFswXS5mZWF0dXJlc1swXS5hdHRyaWJ1dGVzW2lkXVxuICAgIGNhdGNoIGVcbiAgICAgIHRocm93IFwiRXJyb3IgZmluZGluZyAje3BhcmFtfToje2lkfSBpbiBncCByZXN1bHRzXCJcblxuICBnZXRSZXN1bHRzOiAoKSAtPlxuICAgIHVubGVzcyByZXN1bHRzID0gQHJlc3VsdHM/LmdldCgnZGF0YScpPy5yZXN1bHRzXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGdwIHJlc3VsdHMnKVxuICAgIF8uZmlsdGVyIHJlc3VsdHMsIChyZXN1bHQpIC0+XG4gICAgICByZXN1bHQucGFyYW1OYW1lIG5vdCBpbiBbJ1Jlc3VsdENvZGUnLCAnUmVzdWx0TXNnJ11cblxuICBlbmFibGVMYXllclRvZ2dsZXJzOiBlbmFibGVMYXllclRvZ2dsZXJzXG5cbm1vZHVsZS5leHBvcnRzID0gUmVwb3J0VGFiIiwiVGFiID0gcmVxdWlyZSAnLi90YWIuY29mZmVlJ1xuXG53aW5kb3cuYXBwLnJlZ2lzdGVyUmVwb3J0IChyZXBvcnQpIC0+XG4gIHJlcG9ydC50YWJzIFtUYWJdXG4gICMgcGF0aCBtdXN0IGJlIHJlbGF0aXZlIHRvIGRpc3QvXG4gIHJlcG9ydC5zdHlsZXNoZWV0cyBbJy4vcmVwb3J0LmNzcyddXG4iLCJSZXBvcnRUYWIgPSByZXF1aXJlICdyZXBvcnRUYWInXG50ZW1wbGF0ZXMgPSByZXF1aXJlICcuLi90ZW1wbGF0ZXMvdGVtcGxhdGVzLmpzJ1xuZDMgPSB3aW5kb3cuZDNcblxuY2xhc3MgRGVtb1RhYiBleHRlbmRzIFJlcG9ydFRhYlxuICBuYW1lOiAnRXhhbXBsZXMnXG4gIGNsYXNzTmFtZTogJ2RlbW8nXG4gIHRlbXBsYXRlOiB0ZW1wbGF0ZXMuZGVtb1xuXG4gIHJlbmRlcjogKCkgLT5cbiAgICAjIGNyZWF0ZSByYW5kb20gZGF0YSBmb3IgdmlzdWFsaXphdGlvblxuICAgIGRhdGEgPSBbXVxuICAgIF8udGltZXMgMTAwLCAoKSAtPiBkYXRhLnB1c2ggTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMTAwKVxuXG4gICAgIyBzZXR1cCBjb250ZXh0IG9iamVjdCB3aXRoIGRhdGEgYW5kIHJlbmRlciB0aGUgdGVtcGxhdGUgZnJvbSBpdFxuICAgIGNvbnRleHQgPVxuICAgICAgc2tldGNoOiBAbW9kZWwuZm9yVGVtcGxhdGUoKVxuICAgICAgc2tldGNoQ2xhc3M6IEBza2V0Y2hDbGFzcy5mb3JUZW1wbGF0ZSgpXG4gICAgICBhdHRyaWJ1dGVzOiBAbW9kZWwuZ2V0QXR0cmlidXRlcygpXG4gICAgICBhZG1pbjogQHByb2plY3QuaXNBZG1pbiB3aW5kb3cudXNlclxuICAgICAgY2hhcnREYXRhOiBfLm1hcCBkYXRhLCAoZCwgaSkgLT4ge2luZGV4OiBpLCB2YWx1ZTogZH1cbiAgICBcbiAgICBAJGVsLmh0bWwgQHRlbXBsYXRlLnJlbmRlcihjb250ZXh0LCB0ZW1wbGF0ZXMpXG5cbiAgICAjIFNldHVwIGJvb3RzdHJhcCB0YWJzXG4gICAgQCQoJyN0YWJzMiBhJykuY2xpY2sgKGUpIC0+XG4gICAgICBjb25zb2xlLmxvZyAndGFiIGNsaWNrJ1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAkKHRoaXMpLnRhYignc2hvdycpXG5cbiAgICAjIGRyYXcgZDMgdmlzdWFsaXphdGlvblxuICAgIEBkcmF3Q2hhcnQoZGF0YSlcblxuICBkcmF3Q2hhcnQ6IChkYXRhKSAtPlxuICAgIGNvbnNvbGUubG9nICdkcmF3IGNoYXJ0J1xuICAgIHAgPSBAJCgnI2NoYXJ0IHAnKVxuICAgIGNvbnNvbGUubG9nICdwJywgcC5sZW5ndGgsIEBlbFxuICAgIG1hcmdpbiA9IFxuICAgICAgdG9wOiAyMFxuICAgICAgcmlnaHQ6IDIwXG4gICAgICBib3R0b206IDMwXG4gICAgICBsZWZ0OiA0MFxuXG4gICAgd2lkdGggPSA0MzAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodFxuICAgIGhlaWdodCA9IDMwMCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tXG5cbiAgICB4ID0gZDMuc2NhbGUubGluZWFyKClcbiAgICAgIC5yYW5nZSBbMCwgd2lkdGhdXG5cbiAgICB5ID0gZDMuc2NhbGUubGluZWFyKClcbiAgICAgIC5yYW5nZSBbaGVpZ2h0LCAwXVxuXG4gICAgY29sb3IgPSBkMy5zY2FsZS5jYXRlZ29yeTEwKClcblxuICAgIHhBeGlzID0gZDMuc3ZnLmF4aXMoKVxuICAgICAgLnNjYWxlKHgpXG4gICAgICAub3JpZW50IFwiYm90dG9tXCJcblxuICAgIHlBeGlzID0gZDMuc3ZnLmF4aXMoKVxuICAgICAgLnNjYWxlKHkpXG4gICAgICAub3JpZW50IFwibGVmdFwiXG5cbiAgICBzdmcgPSBkMy5zZWxlY3QoQCQoXCIjY2hhcnRcIilbMF0pLmFwcGVuZChcInN2Z1wiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcbiAgICAgICAgICBcInRyYW5zbGF0ZSgje21hcmdpbi5sZWZ0fSwje21hcmdpbi50b3B9KVwiKVxuXG4gICAgeC5kb21haW4oWzAsIGRhdGEubGVuZ3RoXSkubmljZSgpXG4gICAgeS5kb21haW4oZDMuZXh0ZW50KGRhdGEsIChkKSAtPiBkKSkubmljZSgpXG5cbiAgICBzdmcuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwieCBheGlzXCIpXG4gICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsI3toZWlnaHR9KVwiKVxuICAgICAgICAuY2FsbCh4QXhpcylcbiAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJsYWJlbFwiKVxuICAgICAgICAuYXR0cihcInhcIiwgd2lkdGgpXG4gICAgICAgIC5hdHRyKFwieVwiLCAtNilcblxuICAgIHN2Zy5hcHBlbmQoXCJnXCIpXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ5IGF4aXNcIilcbiAgICAgICAgLmNhbGwoeUF4aXMpXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwibGFiZWxcIilcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoLTkwKVwiKVxuICAgICAgICAuYXR0cihcInlcIiwgNilcbiAgICAgICAgLmF0dHIoXCJkeVwiLCBcIi43MWVtXCIpXG5cbiAgICBzdmcuc2VsZWN0QWxsKFwiLmRvdFwiKVxuICAgICAgICAuZGF0YShkYXRhKVxuICAgICAgLmVudGVyKCkuYXBwZW5kKFwiY2lyY2xlXCIpXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJkb3RcIilcbiAgICAgICAgLmF0dHIoXCJyXCIsIDMuNSlcbiAgICAgICAgLmF0dHIoXCJjeFwiLCAoZCwgaSkgLT4geChpKSlcbiAgICAgICAgLmF0dHIoXCJjeVwiLCAoZCwgaSkgLT4geShkKSlcbiAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCAoZCkgLT4gY29sb3IoZCkpXG5cbiAgICBwLmRldGFjaCgpXG4gICAgQCQoJyNjaGFydCcpLmFwcGVuZCBwXG5cbm1vZHVsZS5leHBvcnRzID0gRGVtb1RhYiIsInRoaXNbXCJUZW1wbGF0ZXNcIl0gPSB0aGlzW1wiVGVtcGxhdGVzXCJdIHx8IHt9O1xuXG50aGlzW1wiVGVtcGxhdGVzXCJdW1wiZGVtb1wiXSA9IG5ldyBIb2dhbi5UZW1wbGF0ZShmdW5jdGlvbihjLHAsaSl7dmFyIF89dGhpcztfLmIoaT1pfHxcIlwiKTtfLmIoXCI8ZGl2IGNsYXNzPVxcXCJyZXBvcnRTZWN0aW9uXFxcIj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgIDxoND5SZXBvcnQgU2VjdGlvbnM8L2g0PlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgPHA+VXNlIHJlcG9ydCBzZWN0aW9ucyB0byBncm91cCBpbmZvcm1hdGlvbiBpbnRvIG1lYW5pbmdmdWwgY2F0ZWdvcmllczwvcD5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCI8L2Rpdj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIjxkaXYgY2xhc3M9XFxcInJlcG9ydFNlY3Rpb25cXFwiPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgPGg0PkQzIFZpc3VhbGl6YXRpb25zPC9oND5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgIDx1bCBjbGFzcz1cXFwibmF2IG5hdi1waWxsc1xcXCIgaWQ9XFxcInRhYnMyXFxcIj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgPGxpIGNsYXNzPVxcXCJhY3RpdmVcXFwiPjxhIGhyZWY9XFxcIiNjaGFydFxcXCI+Q2hhcnQ8L2E+PC9saT5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgPGxpPjxhIGhyZWY9XFxcIiNkYXRhVGFibGVcXFwiPlRhYmxlPC9hPjwvbGk+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICA8L3VsPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgPGRpdiBjbGFzcz1cXFwidGFiLWNvbnRlbnRcXFwiPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICA8ZGl2IGNsYXNzPVxcXCJ0YWItcGFuZSBhY3RpdmVcXFwiIGlkPVxcXCJjaGFydFxcXCI+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgPCEtLVtpZiBJRSA4XT5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgICA8cCBjbGFzcz1cXFwidW5zdXBwb3J0ZWRcXFwiPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgIFRoaXMgdmlzdWFsaXphdGlvbiBpcyBub3QgY29tcGF0aWJsZSB3aXRoIEludGVybmV0IEV4cGxvcmVyIDguIFwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgIFBsZWFzZSB1cGdyYWRlIHlvdXIgYnJvd3Nlciwgb3IgdmlldyByZXN1bHRzIGluIHRoZSB0YWJsZSB0YWIuXCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgPC9wPiAgICAgIFwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgIDwhW2VuZGlmXS0tPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgIDxwPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgICAgU2VlIDxjb2RlPnNyYy9zY3JpcHRzL2RlbW8uY29mZmVlPC9jb2RlPiBmb3IgYW4gZXhhbXBsZSBvZiBob3cgdG8gXCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgICB1c2UgZDMuanMgdG8gcmVuZGVyIHZpc3VhbGl6YXRpb25zLiBQcm92aWRlIGEgdGFibGUtYmFzZWQgdmlld1wiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgICAgYW5kIHVzZSBjb25kaXRpb25hbCBjb21tZW50cyB0byBwcm92aWRlIGEgZmFsbGJhY2sgZm9yIElFOCB1c2Vycy5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgICAgIDxicj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgICAgIDxhIGhyZWY9XFxcImh0dHA6Ly90d2l0dGVyLmdpdGh1Yi5pby9ib290c3RyYXAvMi4zLjIvXFxcIj5Cb290c3RyYXAgMi54PC9hPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgICAgaXMgbG9hZGVkIHdpdGhpbiBTZWFTa2V0Y2ggc28geW91IGNhbiB1c2UgaXQgdG8gY3JlYXRlIHRhYnMgYW5kIG90aGVyIFwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgICAgaW50ZXJmYWNlIGNvbXBvbmVudHMuIGpRdWVyeSBhbmQgdW5kZXJzY29yZSBhcmUgYWxzbyBhdmFpbGFibGUuXCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgPC9wPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICA8L2Rpdj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgPGRpdiBjbGFzcz1cXFwidGFiLXBhbmVcXFwiIGlkPVxcXCJkYXRhVGFibGVcXFwiPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgIDx0YWJsZT5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgICAgIDx0aGVhZD5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgICAgICAgPHRyPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgICAgICAgIDx0aD5pbmRleDwvdGg+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgICAgICAgPHRoPnZhbHVlPC90aD5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgICAgICAgPC90cj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgICAgIDwvdGhlYWQ+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgICA8dGJvZHk+XCIpO18uYihcIlxcblwiICsgaSk7aWYoXy5zKF8uZihcImNoYXJ0RGF0YVwiLGMscCwxKSxjLHAsMCwxMzUxLDE0MTgsXCJ7eyB9fVwiKSl7Xy5ycyhjLHAsZnVuY3Rpb24oYyxwLF8pe18uYihcIiAgICAgICAgICA8dHI+PHRkPlwiKTtfLmIoXy52KF8uZihcImluZGV4XCIsYyxwLDApKSk7Xy5iKFwiPC90ZD48dGQ+XCIpO18uYihfLnYoXy5mKFwidmFsdWVcIixjLHAsMCkpKTtfLmIoXCI8L3RkPjwvdHI+XCIpO18uYihcIlxcblwiKTt9KTtjLnBvcCgpO31fLmIoXCIgICAgICAgIDwvdGJvZHk+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgPC90YWJsZT5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgPC9kaXY+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICA8L2Rpdj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCI8L2Rpdj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIjxkaXYgY2xhc3M9XFxcInJlcG9ydFNlY3Rpb24gZW1waGFzaXNcXFwiPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgPGg0PkVtcGhhc2lzPC9oND5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgIDxwPkdpdmUgcmVwb3J0IHNlY3Rpb25zIGFuIDxjb2RlPmVtcGhhc2lzPC9jb2RlPiBjbGFzcyB0byBoaWdobGlnaHQgaW1wb3J0YW50IGluZm9ybWF0aW9uLjwvcD5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCI8L2Rpdj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIjxkaXYgY2xhc3M9XFxcInJlcG9ydFNlY3Rpb24gd2FybmluZ1xcXCI+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICA8aDQ+V2FybmluZzwvaDQ+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICA8cD5PciA8Y29kZT53YXJuPC9jb2RlPiBvZiBwb3RlbnRpYWwgcHJvYmxlbXMuPC9wPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIjwvZGl2PlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiPGRpdiBjbGFzcz1cXFwicmVwb3J0U2VjdGlvbiBkYW5nZXJcXFwiPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgPGg0PkRhbmdlcjwvaDQ+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICA8cD48Y29kZT5kYW5nZXI8L2NvZGU+IGNhbiBhbHNvIGJlIHVzZWQuLi4gc3BhcmluZ2x5LjwvcD5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCI8L2Rpdj5cIik7cmV0dXJuIF8uZmwoKTs7fSk7XG5cbm1vZHVsZS5leHBvcnRzID0gdGhpc1tcIlRlbXBsYXRlc1wiXTsiXX0=
;