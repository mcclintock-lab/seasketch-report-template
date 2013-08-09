;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
var DemoTab, ReportTab, d3, templates, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ReportTab = require('./reportTab.coffee');

templates = require('../templates/templates.js');

d3 = require('../../node_modules/d3/index-browserify.js');

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
    $('#myTab a').click(function(e) {
      e.preventDefault();
      return $(this).tab('show');
    });
    $('#tabs2 a').click(function(e) {
      e.preventDefault();
      return $(this).tab('show');
    });
    return this.drawChart(data);
  };

  DemoTab.prototype.drawChart = function(data) {
    var color, height, margin, p, svg, width, x, xAxis, y, yAxis;
    p = this.$('#chart p');
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
    svg = d3.select("#chart").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
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


},{"../../node_modules/d3/index-browserify.js":6,"../templates/templates.js":4,"./reportTab.coffee":3}],2:[function(require,module,exports){
var GenericAttributesTab, ReportTab, templates, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ReportTab = require('./reportTab.coffee');

templates = require('../templates/templates.js');

GenericAttributesTab = (function(_super) {
  __extends(GenericAttributesTab, _super);

  function GenericAttributesTab() {
    _ref = GenericAttributesTab.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  GenericAttributesTab.prototype.name = 'Attributes';

  GenericAttributesTab.prototype.className = 'genericAttributes';

  GenericAttributesTab.prototype.template = templates.genericAttributes;

  GenericAttributesTab.prototype.render = function() {
    var context;
    context = {
      sketch: this.model.forTemplate(),
      sketchClass: this.sketchClass.forTemplate(),
      attributes: this.model.getAttributes(),
      admin: this.project.isAdmin(window.user)
    };
    return this.$el.html(this.template.render(context, templates));
  };

  return GenericAttributesTab;

})(ReportTab);

module.exports = GenericAttributesTab;


},{"../templates/templates.js":4,"./reportTab.coffee":3}],3:[function(require,module,exports){
var ReportTab, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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

  return ReportTab;

})(Backbone.View);

module.exports = ReportTab;


},{}],4:[function(require,module,exports){
this["Templates"] = this["Templates"] || {};

this["Templates"]["attributes/attributeItem"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<tr data-attribute-id=\"");_.b(_.v(_.f("id",c,p,0)));_.b("\" data-attribute-exportid=\"");_.b(_.v(_.f("exportid",c,p,0)));_.b("\" data-attribute-type=\"");_.b(_.v(_.f("type",c,p,0)));_.b("\">");_.b("\n" + i);_.b("  <td class=\"name\">");_.b(_.v(_.f("name",c,p,0)));_.b("</td>");_.b("\n" + i);_.b("  <td class=\"value\">");_.b(_.v(_.f("formattedValue",c,p,0)));_.b("</td>");_.b("\n" + i);_.b("</tr>");return _.fl();;});

this["Templates"]["attributes/attributesTable"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<table class=\"attributes\">");_.b("\n" + i);if(_.s(_.f("attributes",c,p,1),c,p,0,44,81,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(_.rp("attributes/attributeItem",c,p,"    "));});c.pop();}_.b("</table>");_.b("\n");return _.fl();;});

this["Templates"]["demo"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<div class=\"reportSection\">");_.b("\n" + i);_.b("  <h4>Report Sections</h4>");_.b("\n" + i);_.b("  <p>Use report sections to group information into meaningful categories</p>");_.b("\n" + i);_.b("</div>");_.b("\n" + i);_.b("\n" + i);_.b("<div class=\"reportSection\">");_.b("\n" + i);_.b("  <h4>D3 Visualizations</h4>");_.b("\n" + i);_.b("  <ul class=\"nav nav-pills\" id=\"tabs2\">");_.b("\n" + i);_.b("    <li class=\"active\"><a href=\"#chart\">Chart</a></li>");_.b("\n" + i);_.b("    <li><a href=\"#dataTable\">Table</a></li>");_.b("\n" + i);_.b("  </ul>");_.b("\n" + i);_.b("  <div class=\"tab-content\">");_.b("\n" + i);_.b("    <div class=\"tab-pane active\" id=\"chart\">");_.b("\n" + i);_.b("      <!--[if IE 8]>");_.b("\n" + i);_.b("      <p class=\"unsupported\">");_.b("\n" + i);_.b("      This visualization is not compatible with Internet Explorer 8. ");_.b("\n" + i);_.b("      Please upgrade your browser, or view results in the table tab.");_.b("\n" + i);_.b("      </p>      ");_.b("\n" + i);_.b("      <![endif]-->");_.b("\n" + i);_.b("      <p>");_.b("\n" + i);_.b("        See <code>src/scripts/demo.coffee</code> for an example of how to ");_.b("\n" + i);_.b("        use d3.js to render visualizations. Provide a table-based view");_.b("\n" + i);_.b("        and use conditional comments to provide a fallback for IE8 users.");_.b("\n" + i);_.b("        <br>");_.b("\n" + i);_.b("        <a href=\"http://twitter.github.io/bootstrap/2.3.2/\">Bootstrap 2.x</a>");_.b("\n" + i);_.b("        is loaded within SeaSketch so you can use it to create tabs and other ");_.b("\n" + i);_.b("        interface components. jQuery and underscore are also available.");_.b("\n" + i);_.b("      </p>");_.b("\n" + i);_.b("    </div>");_.b("\n" + i);_.b("    <div class=\"tab-pane\" id=\"dataTable\">");_.b("\n" + i);_.b("      <table>");_.b("\n" + i);_.b("        <thead>");_.b("\n" + i);_.b("          <tr>");_.b("\n" + i);_.b("            <th>index</th>");_.b("\n" + i);_.b("            <th>value</th>");_.b("\n" + i);_.b("          </tr>");_.b("\n" + i);_.b("        </thead>");_.b("\n" + i);_.b("        <tbody>");_.b("\n" + i);if(_.s(_.f("chartData",c,p,1),c,p,0,1351,1418,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("          <tr><td>");_.b(_.v(_.f("index",c,p,0)));_.b("</td><td>");_.b(_.v(_.f("value",c,p,0)));_.b("</td></tr>");_.b("\n");});c.pop();}_.b("        </tbody>");_.b("\n" + i);_.b("      </table>");_.b("\n" + i);_.b("    </div>");_.b("\n" + i);_.b("  </div>");_.b("\n" + i);_.b("</div>");_.b("\n" + i);_.b("\n" + i);_.b("<div class=\"reportSection emphasis\">");_.b("\n" + i);_.b("  <h4>Emphasis</h4>");_.b("\n" + i);_.b("  <p>Give report sections an <code>emphasis</code> class to highlight important information.</p>");_.b("\n" + i);_.b("</div>");_.b("\n" + i);_.b("\n" + i);_.b("<div class=\"reportSection warning\">");_.b("\n" + i);_.b("  <h4>Warning</h4>");_.b("\n" + i);_.b("  <p>Or <code>warn</code> of potential problems.</p>");_.b("\n" + i);_.b("</div>");_.b("\n" + i);_.b("\n" + i);_.b("<div class=\"reportSection danger\">");_.b("\n" + i);_.b("  <h4>Danger</h4>");_.b("\n" + i);_.b("  <p><code>danger</code> can also be used... sparingly.</p>");_.b("\n" + i);_.b("</div>");_.b("\n");return _.fl();;});

this["Templates"]["genericAttributes"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");if(_.s(_.d("sketchClass.deleted",c,p,1),c,p,0,24,270,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<div class=\"alert alert-warn\" style=\"margin-bottom:10px;\">");_.b("\n" + i);_.b("  This sketch was created using the \"");_.b(_.v(_.d("sketchClass.name",c,p,0)));_.b("\" template, which is");_.b("\n" + i);_.b("  no longer available. You will not be able to copy this sketch or make new");_.b("\n" + i);_.b("  sketches of this type.");_.b("\n" + i);_.b("</div>");_.b("\n");});c.pop();}_.b("<div class=\"reportSection\">");_.b("\n" + i);_.b("  <h4>");_.b(_.v(_.d("sketchClass.name",c,p,0)));_.b(" Attributes</h4>");_.b("\n" + i);_.b(_.rp("attributes/attributesTable",c,p,"    "));_.b("  </table>");_.b("\n" + i);_.b("</div>");_.b("\n");return _.fl();;});

module.exports = this["Templates"];
},{}],5:[function(require,module,exports){
d3 = function() {
  var d3 = {
    version: "3.2.7"
  };
  if (!Date.now) Date.now = function() {
    return +new Date();
  };
  var d3_document = document, d3_documentElement = d3_document.documentElement, d3_window = window;
  try {
    d3_document.createElement("div").style.setProperty("opacity", 0, "");
  } catch (error) {
    var d3_element_prototype = d3_window.Element.prototype, d3_element_setAttribute = d3_element_prototype.setAttribute, d3_element_setAttributeNS = d3_element_prototype.setAttributeNS, d3_style_prototype = d3_window.CSSStyleDeclaration.prototype, d3_style_setProperty = d3_style_prototype.setProperty;
    d3_element_prototype.setAttribute = function(name, value) {
      d3_element_setAttribute.call(this, name, value + "");
    };
    d3_element_prototype.setAttributeNS = function(space, local, value) {
      d3_element_setAttributeNS.call(this, space, local, value + "");
    };
    d3_style_prototype.setProperty = function(name, value, priority) {
      d3_style_setProperty.call(this, name, value + "", priority);
    };
  }
  d3.ascending = function(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  };
  d3.descending = function(a, b) {
    return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
  };
  d3.min = function(array, f) {
    var i = -1, n = array.length, a, b;
    if (arguments.length === 1) {
      while (++i < n && !((a = array[i]) != null && a <= a)) a = undefined;
      while (++i < n) if ((b = array[i]) != null && a > b) a = b;
    } else {
      while (++i < n && !((a = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
      while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
    }
    return a;
  };
  d3.max = function(array, f) {
    var i = -1, n = array.length, a, b;
    if (arguments.length === 1) {
      while (++i < n && !((a = array[i]) != null && a <= a)) a = undefined;
      while (++i < n) if ((b = array[i]) != null && b > a) a = b;
    } else {
      while (++i < n && !((a = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
      while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) a = b;
    }
    return a;
  };
  d3.extent = function(array, f) {
    var i = -1, n = array.length, a, b, c;
    if (arguments.length === 1) {
      while (++i < n && !((a = c = array[i]) != null && a <= a)) a = c = undefined;
      while (++i < n) if ((b = array[i]) != null) {
        if (a > b) a = b;
        if (c < b) c = b;
      }
    } else {
      while (++i < n && !((a = c = f.call(array, array[i], i)) != null && a <= a)) a = undefined;
      while (++i < n) if ((b = f.call(array, array[i], i)) != null) {
        if (a > b) a = b;
        if (c < b) c = b;
      }
    }
    return [ a, c ];
  };
  d3.sum = function(array, f) {
    var s = 0, n = array.length, a, i = -1;
    if (arguments.length === 1) {
      while (++i < n) if (!isNaN(a = +array[i])) s += a;
    } else {
      while (++i < n) if (!isNaN(a = +f.call(array, array[i], i))) s += a;
    }
    return s;
  };
  function d3_number(x) {
    return x != null && !isNaN(x);
  }
  d3.mean = function(array, f) {
    var n = array.length, a, m = 0, i = -1, j = 0;
    if (arguments.length === 1) {
      while (++i < n) if (d3_number(a = array[i])) m += (a - m) / ++j;
    } else {
      while (++i < n) if (d3_number(a = f.call(array, array[i], i))) m += (a - m) / ++j;
    }
    return j ? m : undefined;
  };
  d3.quantile = function(values, p) {
    var H = (values.length - 1) * p + 1, h = Math.floor(H), v = +values[h - 1], e = H - h;
    return e ? v + e * (values[h] - v) : v;
  };
  d3.median = function(array, f) {
    if (arguments.length > 1) array = array.map(f);
    array = array.filter(d3_number);
    return array.length ? d3.quantile(array.sort(d3.ascending), .5) : undefined;
  };
  d3.bisector = function(f) {
    return {
      left: function(a, x, lo, hi) {
        if (arguments.length < 3) lo = 0;
        if (arguments.length < 4) hi = a.length;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (f.call(a, a[mid], mid) < x) lo = mid + 1; else hi = mid;
        }
        return lo;
      },
      right: function(a, x, lo, hi) {
        if (arguments.length < 3) lo = 0;
        if (arguments.length < 4) hi = a.length;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (x < f.call(a, a[mid], mid)) hi = mid; else lo = mid + 1;
        }
        return lo;
      }
    };
  };
  var d3_bisector = d3.bisector(function(d) {
    return d;
  });
  d3.bisectLeft = d3_bisector.left;
  d3.bisect = d3.bisectRight = d3_bisector.right;
  d3.shuffle = function(array) {
    var m = array.length, t, i;
    while (m) {
      i = Math.random() * m-- | 0;
      t = array[m], array[m] = array[i], array[i] = t;
    }
    return array;
  };
  d3.permute = function(array, indexes) {
    var permutes = [], i = -1, n = indexes.length;
    while (++i < n) permutes[i] = array[indexes[i]];
    return permutes;
  };
  d3.zip = function() {
    if (!(n = arguments.length)) return [];
    for (var i = -1, m = d3.min(arguments, d3_zipLength), zips = new Array(m); ++i < m; ) {
      for (var j = -1, n, zip = zips[i] = new Array(n); ++j < n; ) {
        zip[j] = arguments[j][i];
      }
    }
    return zips;
  };
  function d3_zipLength(d) {
    return d.length;
  }
  d3.transpose = function(matrix) {
    return d3.zip.apply(d3, matrix);
  };
  d3.keys = function(map) {
    var keys = [];
    for (var key in map) keys.push(key);
    return keys;
  };
  d3.values = function(map) {
    var values = [];
    for (var key in map) values.push(map[key]);
    return values;
  };
  d3.entries = function(map) {
    var entries = [];
    for (var key in map) entries.push({
      key: key,
      value: map[key]
    });
    return entries;
  };
  d3.merge = function(arrays) {
    return Array.prototype.concat.apply([], arrays);
  };
  d3.range = function(start, stop, step) {
    if (arguments.length < 3) {
      step = 1;
      if (arguments.length < 2) {
        stop = start;
        start = 0;
      }
    }
    if ((stop - start) / step === Infinity) throw new Error("infinite range");
    var range = [], k = d3_range_integerScale(Math.abs(step)), i = -1, j;
    start *= k, stop *= k, step *= k;
    if (step < 0) while ((j = start + step * ++i) > stop) range.push(j / k); else while ((j = start + step * ++i) < stop) range.push(j / k);
    return range;
  };
  function d3_range_integerScale(x) {
    var k = 1;
    while (x * k % 1) k *= 10;
    return k;
  }
  function d3_class(ctor, properties) {
    try {
      for (var key in properties) {
        Object.defineProperty(ctor.prototype, key, {
          value: properties[key],
          enumerable: false
        });
      }
    } catch (e) {
      ctor.prototype = properties;
    }
  }
  d3.map = function(object) {
    var map = new d3_Map();
    for (var key in object) map.set(key, object[key]);
    return map;
  };
  function d3_Map() {}
  d3_class(d3_Map, {
    has: function(key) {
      return d3_map_prefix + key in this;
    },
    get: function(key) {
      return this[d3_map_prefix + key];
    },
    set: function(key, value) {
      return this[d3_map_prefix + key] = value;
    },
    remove: function(key) {
      key = d3_map_prefix + key;
      return key in this && delete this[key];
    },
    keys: function() {
      var keys = [];
      this.forEach(function(key) {
        keys.push(key);
      });
      return keys;
    },
    values: function() {
      var values = [];
      this.forEach(function(key, value) {
        values.push(value);
      });
      return values;
    },
    entries: function() {
      var entries = [];
      this.forEach(function(key, value) {
        entries.push({
          key: key,
          value: value
        });
      });
      return entries;
    },
    forEach: function(f) {
      for (var key in this) {
        if (key.charCodeAt(0) === d3_map_prefixCode) {
          f.call(this, key.substring(1), this[key]);
        }
      }
    }
  });
  var d3_map_prefix = "\0", d3_map_prefixCode = d3_map_prefix.charCodeAt(0);
  d3.nest = function() {
    var nest = {}, keys = [], sortKeys = [], sortValues, rollup;
    function map(mapType, array, depth) {
      if (depth >= keys.length) return rollup ? rollup.call(nest, array) : sortValues ? array.sort(sortValues) : array;
      var i = -1, n = array.length, key = keys[depth++], keyValue, object, setter, valuesByKey = new d3_Map(), values;
      while (++i < n) {
        if (values = valuesByKey.get(keyValue = key(object = array[i]))) {
          values.push(object);
        } else {
          valuesByKey.set(keyValue, [ object ]);
        }
      }
      if (mapType) {
        object = mapType();
        setter = function(keyValue, values) {
          object.set(keyValue, map(mapType, values, depth));
        };
      } else {
        object = {};
        setter = function(keyValue, values) {
          object[keyValue] = map(mapType, values, depth);
        };
      }
      valuesByKey.forEach(setter);
      return object;
    }
    function entries(map, depth) {
      if (depth >= keys.length) return map;
      var array = [], sortKey = sortKeys[depth++];
      map.forEach(function(key, keyMap) {
        array.push({
          key: key,
          values: entries(keyMap, depth)
        });
      });
      return sortKey ? array.sort(function(a, b) {
        return sortKey(a.key, b.key);
      }) : array;
    }
    nest.map = function(array, mapType) {
      return map(mapType, array, 0);
    };
    nest.entries = function(array) {
      return entries(map(d3.map, array, 0), 0);
    };
    nest.key = function(d) {
      keys.push(d);
      return nest;
    };
    nest.sortKeys = function(order) {
      sortKeys[keys.length - 1] = order;
      return nest;
    };
    nest.sortValues = function(order) {
      sortValues = order;
      return nest;
    };
    nest.rollup = function(f) {
      rollup = f;
      return nest;
    };
    return nest;
  };
  d3.set = function(array) {
    var set = new d3_Set();
    if (array) for (var i = 0; i < array.length; i++) set.add(array[i]);
    return set;
  };
  function d3_Set() {}
  d3_class(d3_Set, {
    has: function(value) {
      return d3_map_prefix + value in this;
    },
    add: function(value) {
      this[d3_map_prefix + value] = true;
      return value;
    },
    remove: function(value) {
      value = d3_map_prefix + value;
      return value in this && delete this[value];
    },
    values: function() {
      var values = [];
      this.forEach(function(value) {
        values.push(value);
      });
      return values;
    },
    forEach: function(f) {
      for (var value in this) {
        if (value.charCodeAt(0) === d3_map_prefixCode) {
          f.call(this, value.substring(1));
        }
      }
    }
  });
  d3.behavior = {};
  d3.rebind = function(target, source) {
    var i = 1, n = arguments.length, method;
    while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
    return target;
  };
  function d3_rebind(target, source, method) {
    return function() {
      var value = method.apply(source, arguments);
      return value === source ? target : value;
    };
  }
  function d3_vendorSymbol(object, name) {
    if (name in object) return name;
    name = name.charAt(0).toUpperCase() + name.substring(1);
    for (var i = 0, n = d3_vendorPrefixes.length; i < n; ++i) {
      var prefixName = d3_vendorPrefixes[i] + name;
      if (prefixName in object) return prefixName;
    }
  }
  var d3_vendorPrefixes = [ "webkit", "ms", "moz", "Moz", "o", "O" ];
  var d3_array = d3_arraySlice;
  function d3_arrayCopy(pseudoarray) {
    var i = -1, n = pseudoarray.length, array = [];
    while (++i < n) array.push(pseudoarray[i]);
    return array;
  }
  function d3_arraySlice(pseudoarray) {
    return Array.prototype.slice.call(pseudoarray);
  }
  try {
    d3_array(d3_documentElement.childNodes)[0].nodeType;
  } catch (e) {
    d3_array = d3_arrayCopy;
  }
  function d3_noop() {}
  d3.dispatch = function() {
    var dispatch = new d3_dispatch(), i = -1, n = arguments.length;
    while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
    return dispatch;
  };
  function d3_dispatch() {}
  d3_dispatch.prototype.on = function(type, listener) {
    var i = type.indexOf("."), name = "";
    if (i >= 0) {
      name = type.substring(i + 1);
      type = type.substring(0, i);
    }
    if (type) return arguments.length < 2 ? this[type].on(name) : this[type].on(name, listener);
    if (arguments.length === 2) {
      if (listener == null) for (type in this) {
        if (this.hasOwnProperty(type)) this[type].on(name, null);
      }
      return this;
    }
  };
  function d3_dispatch_event(dispatch) {
    var listeners = [], listenerByName = new d3_Map();
    function event() {
      var z = listeners, i = -1, n = z.length, l;
      while (++i < n) if (l = z[i].on) l.apply(this, arguments);
      return dispatch;
    }
    event.on = function(name, listener) {
      var l = listenerByName.get(name), i;
      if (arguments.length < 2) return l && l.on;
      if (l) {
        l.on = null;
        listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
        listenerByName.remove(name);
      }
      if (listener) listeners.push(listenerByName.set(name, {
        on: listener
      }));
      return dispatch;
    };
    return event;
  }
  d3.event = null;
  function d3_eventPreventDefault() {
    d3.event.preventDefault();
  }
  function d3_eventSource() {
    var e = d3.event, s;
    while (s = e.sourceEvent) e = s;
    return e;
  }
  function d3_eventDispatch(target) {
    var dispatch = new d3_dispatch(), i = 0, n = arguments.length;
    while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
    dispatch.of = function(thiz, argumentz) {
      return function(e1) {
        try {
          var e0 = e1.sourceEvent = d3.event;
          e1.target = target;
          d3.event = e1;
          dispatch[e1.type].apply(thiz, argumentz);
        } finally {
          d3.event = e0;
        }
      };
    };
    return dispatch;
  }
  d3.requote = function(s) {
    return s.replace(d3_requote_re, "\\$&");
  };
  var d3_requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
  var d3_subclass = {}.__proto__ ? function(object, prototype) {
    object.__proto__ = prototype;
  } : function(object, prototype) {
    for (var property in prototype) object[property] = prototype[property];
  };
  function d3_selection(groups) {
    d3_subclass(groups, d3_selectionPrototype);
    return groups;
  }
  var d3_select = function(s, n) {
    return n.querySelector(s);
  }, d3_selectAll = function(s, n) {
    return n.querySelectorAll(s);
  }, d3_selectMatcher = d3_documentElement[d3_vendorSymbol(d3_documentElement, "matchesSelector")], d3_selectMatches = function(n, s) {
    return d3_selectMatcher.call(n, s);
  };
  if (typeof Sizzle === "function") {
    d3_select = function(s, n) {
      return Sizzle(s, n)[0] || null;
    };
    d3_selectAll = function(s, n) {
      return Sizzle.uniqueSort(Sizzle(s, n));
    };
    d3_selectMatches = Sizzle.matchesSelector;
  }
  d3.selection = function() {
    return d3_selectionRoot;
  };
  var d3_selectionPrototype = d3.selection.prototype = [];
  d3_selectionPrototype.select = function(selector) {
    var subgroups = [], subgroup, subnode, group, node;
    selector = d3_selection_selector(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      subgroups.push(subgroup = []);
      subgroup.parentNode = (group = this[j]).parentNode;
      for (var i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          subgroup.push(subnode = selector.call(node, node.__data__, i, j));
          if (subnode && "__data__" in node) subnode.__data__ = node.__data__;
        } else {
          subgroup.push(null);
        }
      }
    }
    return d3_selection(subgroups);
  };
  function d3_selection_selector(selector) {
    return typeof selector === "function" ? selector : function() {
      return d3_select(selector, this);
    };
  }
  d3_selectionPrototype.selectAll = function(selector) {
    var subgroups = [], subgroup, node;
    selector = d3_selection_selectorAll(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          subgroups.push(subgroup = d3_array(selector.call(node, node.__data__, i, j)));
          subgroup.parentNode = node;
        }
      }
    }
    return d3_selection(subgroups);
  };
  function d3_selection_selectorAll(selector) {
    return typeof selector === "function" ? selector : function() {
      return d3_selectAll(selector, this);
    };
  }
  var d3_nsPrefix = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };
  d3.ns = {
    prefix: d3_nsPrefix,
    qualify: function(name) {
      var i = name.indexOf(":"), prefix = name;
      if (i >= 0) {
        prefix = name.substring(0, i);
        name = name.substring(i + 1);
      }
      return d3_nsPrefix.hasOwnProperty(prefix) ? {
        space: d3_nsPrefix[prefix],
        local: name
      } : name;
    }
  };
  d3_selectionPrototype.attr = function(name, value) {
    if (arguments.length < 2) {
      if (typeof name === "string") {
        var node = this.node();
        name = d3.ns.qualify(name);
        return name.local ? node.getAttributeNS(name.space, name.local) : node.getAttribute(name);
      }
      for (value in name) this.each(d3_selection_attr(value, name[value]));
      return this;
    }
    return this.each(d3_selection_attr(name, value));
  };
  function d3_selection_attr(name, value) {
    name = d3.ns.qualify(name);
    function attrNull() {
      this.removeAttribute(name);
    }
    function attrNullNS() {
      this.removeAttributeNS(name.space, name.local);
    }
    function attrConstant() {
      this.setAttribute(name, value);
    }
    function attrConstantNS() {
      this.setAttributeNS(name.space, name.local, value);
    }
    function attrFunction() {
      var x = value.apply(this, arguments);
      if (x == null) this.removeAttribute(name); else this.setAttribute(name, x);
    }
    function attrFunctionNS() {
      var x = value.apply(this, arguments);
      if (x == null) this.removeAttributeNS(name.space, name.local); else this.setAttributeNS(name.space, name.local, x);
    }
    return value == null ? name.local ? attrNullNS : attrNull : typeof value === "function" ? name.local ? attrFunctionNS : attrFunction : name.local ? attrConstantNS : attrConstant;
  }
  function d3_collapse(s) {
    return s.trim().replace(/\s+/g, " ");
  }
  d3_selectionPrototype.classed = function(name, value) {
    if (arguments.length < 2) {
      if (typeof name === "string") {
        var node = this.node(), n = (name = name.trim().split(/^|\s+/g)).length, i = -1;
        if (value = node.classList) {
          while (++i < n) if (!value.contains(name[i])) return false;
        } else {
          value = node.getAttribute("class");
          while (++i < n) if (!d3_selection_classedRe(name[i]).test(value)) return false;
        }
        return true;
      }
      for (value in name) this.each(d3_selection_classed(value, name[value]));
      return this;
    }
    return this.each(d3_selection_classed(name, value));
  };
  function d3_selection_classedRe(name) {
    return new RegExp("(?:^|\\s+)" + d3.requote(name) + "(?:\\s+|$)", "g");
  }
  function d3_selection_classed(name, value) {
    name = name.trim().split(/\s+/).map(d3_selection_classedName);
    var n = name.length;
    function classedConstant() {
      var i = -1;
      while (++i < n) name[i](this, value);
    }
    function classedFunction() {
      var i = -1, x = value.apply(this, arguments);
      while (++i < n) name[i](this, x);
    }
    return typeof value === "function" ? classedFunction : classedConstant;
  }
  function d3_selection_classedName(name) {
    var re = d3_selection_classedRe(name);
    return function(node, value) {
      if (c = node.classList) return value ? c.add(name) : c.remove(name);
      var c = node.getAttribute("class") || "";
      if (value) {
        re.lastIndex = 0;
        if (!re.test(c)) node.setAttribute("class", d3_collapse(c + " " + name));
      } else {
        node.setAttribute("class", d3_collapse(c.replace(re, " ")));
      }
    };
  }
  d3_selectionPrototype.style = function(name, value, priority) {
    var n = arguments.length;
    if (n < 3) {
      if (typeof name !== "string") {
        if (n < 2) value = "";
        for (priority in name) this.each(d3_selection_style(priority, name[priority], value));
        return this;
      }
      if (n < 2) return d3_window.getComputedStyle(this.node(), null).getPropertyValue(name);
      priority = "";
    }
    return this.each(d3_selection_style(name, value, priority));
  };
  function d3_selection_style(name, value, priority) {
    function styleNull() {
      this.style.removeProperty(name);
    }
    function styleConstant() {
      this.style.setProperty(name, value, priority);
    }
    function styleFunction() {
      var x = value.apply(this, arguments);
      if (x == null) this.style.removeProperty(name); else this.style.setProperty(name, x, priority);
    }
    return value == null ? styleNull : typeof value === "function" ? styleFunction : styleConstant;
  }
  d3_selectionPrototype.property = function(name, value) {
    if (arguments.length < 2) {
      if (typeof name === "string") return this.node()[name];
      for (value in name) this.each(d3_selection_property(value, name[value]));
      return this;
    }
    return this.each(d3_selection_property(name, value));
  };
  function d3_selection_property(name, value) {
    function propertyNull() {
      delete this[name];
    }
    function propertyConstant() {
      this[name] = value;
    }
    function propertyFunction() {
      var x = value.apply(this, arguments);
      if (x == null) delete this[name]; else this[name] = x;
    }
    return value == null ? propertyNull : typeof value === "function" ? propertyFunction : propertyConstant;
  }
  d3_selectionPrototype.text = function(value) {
    return arguments.length ? this.each(typeof value === "function" ? function() {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    } : value == null ? function() {
      this.textContent = "";
    } : function() {
      this.textContent = value;
    }) : this.node().textContent;
  };
  d3_selectionPrototype.html = function(value) {
    return arguments.length ? this.each(typeof value === "function" ? function() {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    } : value == null ? function() {
      this.innerHTML = "";
    } : function() {
      this.innerHTML = value;
    }) : this.node().innerHTML;
  };
  d3_selectionPrototype.append = function(name) {
    name = d3_selection_creator(name);
    return this.select(function() {
      return this.appendChild(name.apply(this, arguments));
    });
  };
  function d3_selection_creator(name) {
    return typeof name === "function" ? name : (name = d3.ns.qualify(name)).local ? function() {
      return d3_document.createElementNS(name.space, name.local);
    } : function() {
      return d3_document.createElementNS(this.namespaceURI, name);
    };
  }
  d3_selectionPrototype.insert = function(name, before) {
    name = d3_selection_creator(name);
    before = d3_selection_selector(before);
    return this.select(function() {
      return this.insertBefore(name.apply(this, arguments), before.apply(this, arguments));
    });
  };
  d3_selectionPrototype.remove = function() {
    return this.each(function() {
      var parent = this.parentNode;
      if (parent) parent.removeChild(this);
    });
  };
  d3_selectionPrototype.data = function(value, key) {
    var i = -1, n = this.length, group, node;
    if (!arguments.length) {
      value = new Array(n = (group = this[0]).length);
      while (++i < n) {
        if (node = group[i]) {
          value[i] = node.__data__;
        }
      }
      return value;
    }
    function bind(group, groupData) {
      var i, n = group.length, m = groupData.length, n0 = Math.min(n, m), updateNodes = new Array(m), enterNodes = new Array(m), exitNodes = new Array(n), node, nodeData;
      if (key) {
        var nodeByKeyValue = new d3_Map(), dataByKeyValue = new d3_Map(), keyValues = [], keyValue;
        for (i = -1; ++i < n; ) {
          keyValue = key.call(node = group[i], node.__data__, i);
          if (nodeByKeyValue.has(keyValue)) {
            exitNodes[i] = node;
          } else {
            nodeByKeyValue.set(keyValue, node);
          }
          keyValues.push(keyValue);
        }
        for (i = -1; ++i < m; ) {
          keyValue = key.call(groupData, nodeData = groupData[i], i);
          if (node = nodeByKeyValue.get(keyValue)) {
            updateNodes[i] = node;
            node.__data__ = nodeData;
          } else if (!dataByKeyValue.has(keyValue)) {
            enterNodes[i] = d3_selection_dataNode(nodeData);
          }
          dataByKeyValue.set(keyValue, nodeData);
          nodeByKeyValue.remove(keyValue);
        }
        for (i = -1; ++i < n; ) {
          if (nodeByKeyValue.has(keyValues[i])) {
            exitNodes[i] = group[i];
          }
        }
      } else {
        for (i = -1; ++i < n0; ) {
          node = group[i];
          nodeData = groupData[i];
          if (node) {
            node.__data__ = nodeData;
            updateNodes[i] = node;
          } else {
            enterNodes[i] = d3_selection_dataNode(nodeData);
          }
        }
        for (;i < m; ++i) {
          enterNodes[i] = d3_selection_dataNode(groupData[i]);
        }
        for (;i < n; ++i) {
          exitNodes[i] = group[i];
        }
      }
      enterNodes.update = updateNodes;
      enterNodes.parentNode = updateNodes.parentNode = exitNodes.parentNode = group.parentNode;
      enter.push(enterNodes);
      update.push(updateNodes);
      exit.push(exitNodes);
    }
    var enter = d3_selection_enter([]), update = d3_selection([]), exit = d3_selection([]);
    if (typeof value === "function") {
      while (++i < n) {
        bind(group = this[i], value.call(group, group.parentNode.__data__, i));
      }
    } else {
      while (++i < n) {
        bind(group = this[i], value);
      }
    }
    update.enter = function() {
      return enter;
    };
    update.exit = function() {
      return exit;
    };
    return update;
  };
  function d3_selection_dataNode(data) {
    return {
      __data__: data
    };
  }
  d3_selectionPrototype.datum = function(value) {
    return arguments.length ? this.property("__data__", value) : this.property("__data__");
  };
  d3_selectionPrototype.filter = function(filter) {
    var subgroups = [], subgroup, group, node;
    if (typeof filter !== "function") filter = d3_selection_filter(filter);
    for (var j = 0, m = this.length; j < m; j++) {
      subgroups.push(subgroup = []);
      subgroup.parentNode = (group = this[j]).parentNode;
      for (var i = 0, n = group.length; i < n; i++) {
        if ((node = group[i]) && filter.call(node, node.__data__, i)) {
          subgroup.push(node);
        }
      }
    }
    return d3_selection(subgroups);
  };
  function d3_selection_filter(selector) {
    return function() {
      return d3_selectMatches(this, selector);
    };
  }
  d3_selectionPrototype.order = function() {
    for (var j = -1, m = this.length; ++j < m; ) {
      for (var group = this[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
        if (node = group[i]) {
          if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }
    return this;
  };
  d3_selectionPrototype.sort = function(comparator) {
    comparator = d3_selection_sortComparator.apply(this, arguments);
    for (var j = -1, m = this.length; ++j < m; ) this[j].sort(comparator);
    return this.order();
  };
  function d3_selection_sortComparator(comparator) {
    if (!arguments.length) comparator = d3.ascending;
    return function(a, b) {
      return !a - !b || comparator(a.__data__, b.__data__);
    };
  }
  d3_selectionPrototype.each = function(callback) {
    return d3_selection_each(this, function(node, i, j) {
      callback.call(node, node.__data__, i, j);
    });
  };
  function d3_selection_each(groups, callback) {
    for (var j = 0, m = groups.length; j < m; j++) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; i++) {
        if (node = group[i]) callback(node, i, j);
      }
    }
    return groups;
  }
  d3_selectionPrototype.call = function(callback) {
    var args = d3_array(arguments);
    callback.apply(args[0] = this, args);
    return this;
  };
  d3_selectionPrototype.empty = function() {
    return !this.node();
  };
  d3_selectionPrototype.node = function() {
    for (var j = 0, m = this.length; j < m; j++) {
      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
        var node = group[i];
        if (node) return node;
      }
    }
    return null;
  };
  d3_selectionPrototype.size = function() {
    var n = 0;
    this.each(function() {
      ++n;
    });
    return n;
  };
  function d3_selection_enter(selection) {
    d3_subclass(selection, d3_selection_enterPrototype);
    return selection;
  }
  var d3_selection_enterPrototype = [];
  d3.selection.enter = d3_selection_enter;
  d3.selection.enter.prototype = d3_selection_enterPrototype;
  d3_selection_enterPrototype.append = d3_selectionPrototype.append;
  d3_selection_enterPrototype.empty = d3_selectionPrototype.empty;
  d3_selection_enterPrototype.node = d3_selectionPrototype.node;
  d3_selection_enterPrototype.call = d3_selectionPrototype.call;
  d3_selection_enterPrototype.size = d3_selectionPrototype.size;
  d3_selection_enterPrototype.select = function(selector) {
    var subgroups = [], subgroup, subnode, upgroup, group, node;
    for (var j = -1, m = this.length; ++j < m; ) {
      upgroup = (group = this[j]).update;
      subgroups.push(subgroup = []);
      subgroup.parentNode = group.parentNode;
      for (var i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i, j));
          subnode.__data__ = node.__data__;
        } else {
          subgroup.push(null);
        }
      }
    }
    return d3_selection(subgroups);
  };
  d3_selection_enterPrototype.insert = function(name, before) {
    if (arguments.length < 2) before = d3_selection_enterInsertBefore(this);
    return d3_selectionPrototype.insert.call(this, name, before);
  };
  function d3_selection_enterInsertBefore(enter) {
    var i0, j0;
    return function(d, i, j) {
      var group = enter[j].update, n = group.length, node;
      if (j != j0) j0 = j, i0 = 0;
      if (i >= i0) i0 = i + 1;
      while (!(node = group[i0]) && ++i0 < n) ;
      return node;
    };
  }
  d3_selectionPrototype.transition = function() {
    var id = d3_transitionInheritId || ++d3_transitionId, subgroups = [], subgroup, node, transition = d3_transitionInherit || {
      time: Date.now(),
      ease: d3_ease_cubicInOut,
      delay: 0,
      duration: 250
    };
    for (var j = -1, m = this.length; ++j < m; ) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) d3_transitionNode(node, i, id, transition);
        subgroup.push(node);
      }
    }
    return d3_transition(subgroups, id);
  };
  d3.select = function(node) {
    var group = [ typeof node === "string" ? d3_select(node, d3_document) : node ];
    group.parentNode = d3_documentElement;
    return d3_selection([ group ]);
  };
  d3.selectAll = function(nodes) {
    var group = d3_array(typeof nodes === "string" ? d3_selectAll(nodes, d3_document) : nodes);
    group.parentNode = d3_documentElement;
    return d3_selection([ group ]);
  };
  var d3_selectionRoot = d3.select(d3_documentElement);
  d3_selectionPrototype.on = function(type, listener, capture) {
    var n = arguments.length;
    if (n < 3) {
      if (typeof type !== "string") {
        if (n < 2) listener = false;
        for (capture in type) this.each(d3_selection_on(capture, type[capture], listener));
        return this;
      }
      if (n < 2) return (n = this.node()["__on" + type]) && n._;
      capture = false;
    }
    return this.each(d3_selection_on(type, listener, capture));
  };
  function d3_selection_on(type, listener, capture) {
    var name = "__on" + type, i = type.indexOf("."), wrap = d3_selection_onListener;
    if (i > 0) type = type.substring(0, i);
    var filter = d3_selection_onFilters.get(type);
    if (filter) type = filter, wrap = d3_selection_onFilter;
    function onRemove() {
      var l = this[name];
      if (l) {
        this.removeEventListener(type, l, l.$);
        delete this[name];
      }
    }
    function onAdd() {
      var l = wrap(listener, d3_array(arguments));
      onRemove.call(this);
      this.addEventListener(type, this[name] = l, l.$ = capture);
      l._ = listener;
    }
    function removeAll() {
      var re = new RegExp("^__on([^.]+)" + d3.requote(type) + "$"), match;
      for (var name in this) {
        if (match = name.match(re)) {
          var l = this[name];
          this.removeEventListener(match[1], l, l.$);
          delete this[name];
        }
      }
    }
    return i ? listener ? onAdd : onRemove : listener ? d3_noop : removeAll;
  }
  var d3_selection_onFilters = d3.map({
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  });
  d3_selection_onFilters.forEach(function(k) {
    if ("on" + k in d3_document) d3_selection_onFilters.remove(k);
  });
  function d3_selection_onListener(listener, argumentz) {
    return function(e) {
      var o = d3.event;
      d3.event = e;
      argumentz[0] = this.__data__;
      try {
        listener.apply(this, argumentz);
      } finally {
        d3.event = o;
      }
    };
  }
  function d3_selection_onFilter(listener, argumentz) {
    var l = d3_selection_onListener(listener, argumentz);
    return function(e) {
      var target = this, related = e.relatedTarget;
      if (!related || related !== target && !(related.compareDocumentPosition(target) & 8)) {
        l.call(target, e);
      }
    };
  }
  var d3_event_dragSelect = d3_vendorSymbol(d3_documentElement.style, "userSelect"), d3_event_dragId = 0;
  function d3_event_dragSuppress() {
    var name = ".dragsuppress-" + ++d3_event_dragId, touchmove = "touchmove" + name, selectstart = "selectstart" + name, dragstart = "dragstart" + name, click = "click" + name, w = d3.select(d3_window).on(touchmove, d3_eventPreventDefault).on(selectstart, d3_eventPreventDefault).on(dragstart, d3_eventPreventDefault), style = d3_documentElement.style, select = style[d3_event_dragSelect];
    style[d3_event_dragSelect] = "none";
    return function(suppressClick) {
      w.on(name, null);
      style[d3_event_dragSelect] = select;
      if (suppressClick) {
        function off() {
          w.on(click, null);
        }
        w.on(click, function() {
          d3_eventPreventDefault();
          off();
        }, true);
        setTimeout(off, 0);
      }
    };
  }
  d3.mouse = function(container) {
    return d3_mousePoint(container, d3_eventSource());
  };
  var d3_mouse_bug44083 = /WebKit/.test(d3_window.navigator.userAgent) ? -1 : 0;
  function d3_mousePoint(container, e) {
    var svg = container.ownerSVGElement || container;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      if (d3_mouse_bug44083 < 0 && (d3_window.scrollX || d3_window.scrollY)) {
        svg = d3.select("body").append("svg").style({
          position: "absolute",
          top: 0,
          left: 0,
          margin: 0,
          padding: 0,
          border: "none"
        }, "important");
        var ctm = svg[0][0].getScreenCTM();
        d3_mouse_bug44083 = !(ctm.f || ctm.e);
        svg.remove();
      }
      if (d3_mouse_bug44083) {
        point.x = e.pageX;
        point.y = e.pageY;
      } else {
        point.x = e.clientX;
        point.y = e.clientY;
      }
      point = point.matrixTransform(container.getScreenCTM().inverse());
      return [ point.x, point.y ];
    }
    var rect = container.getBoundingClientRect();
    return [ e.clientX - rect.left - container.clientLeft, e.clientY - rect.top - container.clientTop ];
  }
  d3.touches = function(container, touches) {
    if (arguments.length < 2) touches = d3_eventSource().touches;
    return touches ? d3_array(touches).map(function(touch) {
      var point = d3_mousePoint(container, touch);
      point.identifier = touch.identifier;
      return point;
    }) : [];
  };
  d3.behavior.drag = function() {
    var event = d3_eventDispatch(drag, "drag", "dragstart", "dragend"), origin = null, mousedown = dragstart(d3_noop, d3.mouse, "mousemove", "mouseup"), touchstart = dragstart(touchid, touchposition, "touchmove", "touchend");
    function drag() {
      this.on("mousedown.drag", mousedown).on("touchstart.drag", touchstart);
    }
    function touchid() {
      return d3.event.changedTouches[0].identifier;
    }
    function touchposition(parent, id) {
      return d3.touches(parent).filter(function(p) {
        return p.identifier === id;
      })[0];
    }
    function dragstart(id, position, move, end) {
      return function() {
        var target = this, parent = target.parentNode, event_ = event.of(target, arguments), eventTarget = d3.event.target, eventId = id(), drag = eventId == null ? "drag" : "drag-" + eventId, origin_ = position(parent, eventId), dragged = 0, offset, w = d3.select(d3_window).on(move + "." + drag, moved).on(end + "." + drag, ended), dragRestore = d3_event_dragSuppress();
        if (origin) {
          offset = origin.apply(target, arguments);
          offset = [ offset.x - origin_[0], offset.y - origin_[1] ];
        } else {
          offset = [ 0, 0 ];
        }
        event_({
          type: "dragstart"
        });
        function moved() {
          if (!parent) return ended();
          var p = position(parent, eventId), dx = p[0] - origin_[0], dy = p[1] - origin_[1];
          dragged |= dx | dy;
          origin_ = p;
          event_({
            type: "drag",
            x: p[0] + offset[0],
            y: p[1] + offset[1],
            dx: dx,
            dy: dy
          });
        }
        function ended() {
          w.on(move + "." + drag, null).on(end + "." + drag, null);
          dragRestore(dragged && d3.event.target === eventTarget);
          event_({
            type: "dragend"
          });
        }
      };
    }
    drag.origin = function(x) {
      if (!arguments.length) return origin;
      origin = x;
      return drag;
    };
    return d3.rebind(drag, event, "on");
  };
  d3.behavior.zoom = function() {
    var translate = [ 0, 0 ], translate0, scale = 1, scaleExtent = d3_behavior_zoomInfinity, mousedown = "mousedown.zoom", mousemove = "mousemove.zoom", mouseup = "mouseup.zoom", event = d3_eventDispatch(zoom, "zoom"), x0, x1, y0, y1, touchtime;
    function zoom() {
      this.on(mousedown, mousedowned).on(d3_behavior_zoomWheel + ".zoom", mousewheeled).on(mousemove, mousewheelreset).on("dblclick.zoom", dblclicked).on("touchstart.zoom", touchstarted);
    }
    zoom.translate = function(x) {
      if (!arguments.length) return translate;
      translate = x.map(Number);
      rescale();
      return zoom;
    };
    zoom.scale = function(x) {
      if (!arguments.length) return scale;
      scale = +x;
      rescale();
      return zoom;
    };
    zoom.scaleExtent = function(x) {
      if (!arguments.length) return scaleExtent;
      scaleExtent = x == null ? d3_behavior_zoomInfinity : x.map(Number);
      return zoom;
    };
    zoom.x = function(z) {
      if (!arguments.length) return x1;
      x1 = z;
      x0 = z.copy();
      translate = [ 0, 0 ];
      scale = 1;
      return zoom;
    };
    zoom.y = function(z) {
      if (!arguments.length) return y1;
      y1 = z;
      y0 = z.copy();
      translate = [ 0, 0 ];
      scale = 1;
      return zoom;
    };
    function location(p) {
      return [ (p[0] - translate[0]) / scale, (p[1] - translate[1]) / scale ];
    }
    function point(l) {
      return [ l[0] * scale + translate[0], l[1] * scale + translate[1] ];
    }
    function scaleTo(s) {
      scale = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s));
    }
    function translateTo(p, l) {
      l = point(l);
      translate[0] += p[0] - l[0];
      translate[1] += p[1] - l[1];
    }
    function rescale() {
      if (x1) x1.domain(x0.range().map(function(x) {
        return (x - translate[0]) / scale;
      }).map(x0.invert));
      if (y1) y1.domain(y0.range().map(function(y) {
        return (y - translate[1]) / scale;
      }).map(y0.invert));
    }
    function dispatch(event) {
      rescale();
      event({
        type: "zoom",
        scale: scale,
        translate: translate
      });
    }
    function mousedowned() {
      var target = this, event_ = event.of(target, arguments), eventTarget = d3.event.target, dragged = 0, w = d3.select(d3_window).on(mousemove, moved).on(mouseup, ended), l = location(d3.mouse(target)), dragRestore = d3_event_dragSuppress();
      function moved() {
        dragged = 1;
        translateTo(d3.mouse(target), l);
        dispatch(event_);
      }
      function ended() {
        w.on(mousemove, d3_window === target ? mousewheelreset : null).on(mouseup, null);
        dragRestore(dragged && d3.event.target === eventTarget);
      }
    }
    function touchstarted() {
      var target = this, event_ = event.of(target, arguments), touches = d3.touches(target), locations = {}, distance0 = 0, scale0 = scale, now = Date.now(), name = "zoom-" + d3.event.changedTouches[0].identifier, touchmove = "touchmove." + name, touchend = "touchend." + name, w = d3.select(d3_window).on(touchmove, moved).on(touchend, ended), t = d3.select(target).on(mousedown, null), dragRestore = d3_event_dragSuppress();
      touches.forEach(function(t) {
        locations[t.identifier] = location(t);
      });
      if (touches.length === 1) {
        if (now - touchtime < 500) {
          var p = touches[0], l = location(touches[0]);
          scaleTo(scale * 2);
          translateTo(p, l);
          d3_eventPreventDefault();
          dispatch(event_);
        }
        touchtime = now;
      } else if (touches.length > 1) {
        var p = touches[0], q = touches[1], dx = p[0] - q[0], dy = p[1] - q[1];
        distance0 = dx * dx + dy * dy;
      }
      function moved() {
        var touches = d3.touches(target), p0 = touches[0], l0 = locations[p0.identifier];
        if (p1 = touches[1]) {
          var p1, l1 = locations[p1.identifier], scale1 = d3.event.scale;
          if (scale1 == null) {
            var distance1 = (distance1 = p1[0] - p0[0]) * distance1 + (distance1 = p1[1] - p0[1]) * distance1;
            scale1 = distance0 && Math.sqrt(distance1 / distance0);
          }
          p0 = [ (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2 ];
          l0 = [ (l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2 ];
          scaleTo(scale1 * scale0);
        }
        touchtime = null;
        translateTo(p0, l0);
        dispatch(event_);
      }
      function ended() {
        w.on(touchmove, null).on(touchend, null);
        t.on(mousedown, mousedowned);
        dragRestore();
      }
    }
    function mousewheeled() {
      d3_eventPreventDefault();
      if (!translate0) translate0 = location(d3.mouse(this));
      scaleTo(Math.pow(2, d3_behavior_zoomDelta() * .002) * scale);
      translateTo(d3.mouse(this), translate0);
      dispatch(event.of(this, arguments));
    }
    function mousewheelreset() {
      translate0 = null;
    }
    function dblclicked() {
      var p = d3.mouse(this), l = location(p), k = Math.log(scale) / Math.LN2;
      scaleTo(Math.pow(2, d3.event.shiftKey ? Math.ceil(k) - 1 : Math.floor(k) + 1));
      translateTo(p, l);
      dispatch(event.of(this, arguments));
    }
    return d3.rebind(zoom, event, "on");
  };
  var d3_behavior_zoomInfinity = [ 0, Infinity ];
  var d3_behavior_zoomDelta, d3_behavior_zoomWheel = "onwheel" in d3_document ? (d3_behavior_zoomDelta = function() {
    return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1);
  }, "wheel") : "onmousewheel" in d3_document ? (d3_behavior_zoomDelta = function() {
    return d3.event.wheelDelta;
  }, "mousewheel") : (d3_behavior_zoomDelta = function() {
    return -d3.event.detail;
  }, "MozMousePixelScroll");
  function d3_Color() {}
  d3_Color.prototype.toString = function() {
    return this.rgb() + "";
  };
  d3.hsl = function(h, s, l) {
    return arguments.length === 1 ? h instanceof d3_Hsl ? d3_hsl(h.h, h.s, h.l) : d3_rgb_parse("" + h, d3_rgb_hsl, d3_hsl) : d3_hsl(+h, +s, +l);
  };
  function d3_hsl(h, s, l) {
    return new d3_Hsl(h, s, l);
  }
  function d3_Hsl(h, s, l) {
    this.h = h;
    this.s = s;
    this.l = l;
  }
  var d3_hslPrototype = d3_Hsl.prototype = new d3_Color();
  d3_hslPrototype.brighter = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    return d3_hsl(this.h, this.s, this.l / k);
  };
  d3_hslPrototype.darker = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    return d3_hsl(this.h, this.s, k * this.l);
  };
  d3_hslPrototype.rgb = function() {
    return d3_hsl_rgb(this.h, this.s, this.l);
  };
  function d3_hsl_rgb(h, s, l) {
    var m1, m2;
    h = isNaN(h) ? 0 : (h %= 360) < 0 ? h + 360 : h;
    s = isNaN(s) ? 0 : s < 0 ? 0 : s > 1 ? 1 : s;
    l = l < 0 ? 0 : l > 1 ? 1 : l;
    m2 = l <= .5 ? l * (1 + s) : l + s - l * s;
    m1 = 2 * l - m2;
    function v(h) {
      if (h > 360) h -= 360; else if (h < 0) h += 360;
      if (h < 60) return m1 + (m2 - m1) * h / 60;
      if (h < 180) return m2;
      if (h < 240) return m1 + (m2 - m1) * (240 - h) / 60;
      return m1;
    }
    function vv(h) {
      return Math.round(v(h) * 255);
    }
    return d3_rgb(vv(h + 120), vv(h), vv(h - 120));
  }
  var π = Math.PI, ε = 1e-6, ε2 = ε * ε, d3_radians = π / 180, d3_degrees = 180 / π;
  function d3_sgn(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
  }
  function d3_acos(x) {
    return x > 1 ? 0 : x < -1 ? π : Math.acos(x);
  }
  function d3_asin(x) {
    return x > 1 ? π / 2 : x < -1 ? -π / 2 : Math.asin(x);
  }
  function d3_sinh(x) {
    return (Math.exp(x) - Math.exp(-x)) / 2;
  }
  function d3_cosh(x) {
    return (Math.exp(x) + Math.exp(-x)) / 2;
  }
  function d3_haversin(x) {
    return (x = Math.sin(x / 2)) * x;
  }
  d3.hcl = function(h, c, l) {
    return arguments.length === 1 ? h instanceof d3_Hcl ? d3_hcl(h.h, h.c, h.l) : h instanceof d3_Lab ? d3_lab_hcl(h.l, h.a, h.b) : d3_lab_hcl((h = d3_rgb_lab((h = d3.rgb(h)).r, h.g, h.b)).l, h.a, h.b) : d3_hcl(+h, +c, +l);
  };
  function d3_hcl(h, c, l) {
    return new d3_Hcl(h, c, l);
  }
  function d3_Hcl(h, c, l) {
    this.h = h;
    this.c = c;
    this.l = l;
  }
  var d3_hclPrototype = d3_Hcl.prototype = new d3_Color();
  d3_hclPrototype.brighter = function(k) {
    return d3_hcl(this.h, this.c, Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)));
  };
  d3_hclPrototype.darker = function(k) {
    return d3_hcl(this.h, this.c, Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)));
  };
  d3_hclPrototype.rgb = function() {
    return d3_hcl_lab(this.h, this.c, this.l).rgb();
  };
  function d3_hcl_lab(h, c, l) {
    if (isNaN(h)) h = 0;
    if (isNaN(c)) c = 0;
    return d3_lab(l, Math.cos(h *= d3_radians) * c, Math.sin(h) * c);
  }
  d3.lab = function(l, a, b) {
    return arguments.length === 1 ? l instanceof d3_Lab ? d3_lab(l.l, l.a, l.b) : l instanceof d3_Hcl ? d3_hcl_lab(l.l, l.c, l.h) : d3_rgb_lab((l = d3.rgb(l)).r, l.g, l.b) : d3_lab(+l, +a, +b);
  };
  function d3_lab(l, a, b) {
    return new d3_Lab(l, a, b);
  }
  function d3_Lab(l, a, b) {
    this.l = l;
    this.a = a;
    this.b = b;
  }
  var d3_lab_K = 18;
  var d3_lab_X = .95047, d3_lab_Y = 1, d3_lab_Z = 1.08883;
  var d3_labPrototype = d3_Lab.prototype = new d3_Color();
  d3_labPrototype.brighter = function(k) {
    return d3_lab(Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
  };
  d3_labPrototype.darker = function(k) {
    return d3_lab(Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
  };
  d3_labPrototype.rgb = function() {
    return d3_lab_rgb(this.l, this.a, this.b);
  };
  function d3_lab_rgb(l, a, b) {
    var y = (l + 16) / 116, x = y + a / 500, z = y - b / 200;
    x = d3_lab_xyz(x) * d3_lab_X;
    y = d3_lab_xyz(y) * d3_lab_Y;
    z = d3_lab_xyz(z) * d3_lab_Z;
    return d3_rgb(d3_xyz_rgb(3.2404542 * x - 1.5371385 * y - .4985314 * z), d3_xyz_rgb(-.969266 * x + 1.8760108 * y + .041556 * z), d3_xyz_rgb(.0556434 * x - .2040259 * y + 1.0572252 * z));
  }
  function d3_lab_hcl(l, a, b) {
    return l > 0 ? d3_hcl(Math.atan2(b, a) * d3_degrees, Math.sqrt(a * a + b * b), l) : d3_hcl(NaN, NaN, l);
  }
  function d3_lab_xyz(x) {
    return x > .206893034 ? x * x * x : (x - 4 / 29) / 7.787037;
  }
  function d3_xyz_lab(x) {
    return x > .008856 ? Math.pow(x, 1 / 3) : 7.787037 * x + 4 / 29;
  }
  function d3_xyz_rgb(r) {
    return Math.round(255 * (r <= .00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - .055));
  }
  d3.rgb = function(r, g, b) {
    return arguments.length === 1 ? r instanceof d3_Rgb ? d3_rgb(r.r, r.g, r.b) : d3_rgb_parse("" + r, d3_rgb, d3_hsl_rgb) : d3_rgb(~~r, ~~g, ~~b);
  };
  function d3_rgbNumber(value) {
    return d3_rgb(value >> 16, value >> 8 & 255, value & 255);
  }
  function d3_rgbString(value) {
    return d3_rgbNumber(value) + "";
  }
  function d3_rgb(r, g, b) {
    return new d3_Rgb(r, g, b);
  }
  function d3_Rgb(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  var d3_rgbPrototype = d3_Rgb.prototype = new d3_Color();
  d3_rgbPrototype.brighter = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    var r = this.r, g = this.g, b = this.b, i = 30;
    if (!r && !g && !b) return d3_rgb(i, i, i);
    if (r && r < i) r = i;
    if (g && g < i) g = i;
    if (b && b < i) b = i;
    return d3_rgb(Math.min(255, ~~(r / k)), Math.min(255, ~~(g / k)), Math.min(255, ~~(b / k)));
  };
  d3_rgbPrototype.darker = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    return d3_rgb(~~(k * this.r), ~~(k * this.g), ~~(k * this.b));
  };
  d3_rgbPrototype.hsl = function() {
    return d3_rgb_hsl(this.r, this.g, this.b);
  };
  d3_rgbPrototype.toString = function() {
    return "#" + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b);
  };
  function d3_rgb_hex(v) {
    return v < 16 ? "0" + Math.max(0, v).toString(16) : Math.min(255, v).toString(16);
  }
  function d3_rgb_parse(format, rgb, hsl) {
    var r = 0, g = 0, b = 0, m1, m2, name;
    m1 = /([a-z]+)\((.*)\)/i.exec(format);
    if (m1) {
      m2 = m1[2].split(",");
      switch (m1[1]) {
       case "hsl":
        {
          return hsl(parseFloat(m2[0]), parseFloat(m2[1]) / 100, parseFloat(m2[2]) / 100);
        }

       case "rgb":
        {
          return rgb(d3_rgb_parseNumber(m2[0]), d3_rgb_parseNumber(m2[1]), d3_rgb_parseNumber(m2[2]));
        }
      }
    }
    if (name = d3_rgb_names.get(format)) return rgb(name.r, name.g, name.b);
    if (format != null && format.charAt(0) === "#") {
      if (format.length === 4) {
        r = format.charAt(1);
        r += r;
        g = format.charAt(2);
        g += g;
        b = format.charAt(3);
        b += b;
      } else if (format.length === 7) {
        r = format.substring(1, 3);
        g = format.substring(3, 5);
        b = format.substring(5, 7);
      }
      r = parseInt(r, 16);
      g = parseInt(g, 16);
      b = parseInt(b, 16);
    }
    return rgb(r, g, b);
  }
  function d3_rgb_hsl(r, g, b) {
    var min = Math.min(r /= 255, g /= 255, b /= 255), max = Math.max(r, g, b), d = max - min, h, s, l = (max + min) / 2;
    if (d) {
      s = l < .5 ? d / (max + min) : d / (2 - max - min);
      if (r == max) h = (g - b) / d + (g < b ? 6 : 0); else if (g == max) h = (b - r) / d + 2; else h = (r - g) / d + 4;
      h *= 60;
    } else {
      h = NaN;
      s = l > 0 && l < 1 ? 0 : h;
    }
    return d3_hsl(h, s, l);
  }
  function d3_rgb_lab(r, g, b) {
    r = d3_rgb_xyz(r);
    g = d3_rgb_xyz(g);
    b = d3_rgb_xyz(b);
    var x = d3_xyz_lab((.4124564 * r + .3575761 * g + .1804375 * b) / d3_lab_X), y = d3_xyz_lab((.2126729 * r + .7151522 * g + .072175 * b) / d3_lab_Y), z = d3_xyz_lab((.0193339 * r + .119192 * g + .9503041 * b) / d3_lab_Z);
    return d3_lab(116 * y - 16, 500 * (x - y), 200 * (y - z));
  }
  function d3_rgb_xyz(r) {
    return (r /= 255) <= .04045 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4);
  }
  function d3_rgb_parseNumber(c) {
    var f = parseFloat(c);
    return c.charAt(c.length - 1) === "%" ? Math.round(f * 2.55) : f;
  }
  var d3_rgb_names = d3.map({
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  });
  d3_rgb_names.forEach(function(key, value) {
    d3_rgb_names.set(key, d3_rgbNumber(value));
  });
  function d3_functor(v) {
    return typeof v === "function" ? v : function() {
      return v;
    };
  }
  d3.functor = d3_functor;
  function d3_identity(d) {
    return d;
  }
  d3.xhr = d3_xhrType(d3_identity);
  function d3_xhrType(response) {
    return function(url, mimeType, callback) {
      if (arguments.length === 2 && typeof mimeType === "function") callback = mimeType, 
      mimeType = null;
      return d3_xhr(url, mimeType, response, callback);
    };
  }
  function d3_xhr(url, mimeType, response, callback) {
    var xhr = {}, dispatch = d3.dispatch("progress", "load", "error"), headers = {}, request = new XMLHttpRequest(), responseType = null;
    if (d3_window.XDomainRequest && !("withCredentials" in request) && /^(http(s)?:)?\/\//.test(url)) request = new XDomainRequest();
    "onload" in request ? request.onload = request.onerror = respond : request.onreadystatechange = function() {
      request.readyState > 3 && respond();
    };
    function respond() {
      var status = request.status, result;
      if (!status && request.responseText || status >= 200 && status < 300 || status === 304) {
        try {
          result = response.call(xhr, request);
        } catch (e) {
          dispatch.error.call(xhr, e);
          return;
        }
        dispatch.load.call(xhr, result);
      } else {
        dispatch.error.call(xhr, request);
      }
    }
    request.onprogress = function(event) {
      var o = d3.event;
      d3.event = event;
      try {
        dispatch.progress.call(xhr, request);
      } finally {
        d3.event = o;
      }
    };
    xhr.header = function(name, value) {
      name = (name + "").toLowerCase();
      if (arguments.length < 2) return headers[name];
      if (value == null) delete headers[name]; else headers[name] = value + "";
      return xhr;
    };
    xhr.mimeType = function(value) {
      if (!arguments.length) return mimeType;
      mimeType = value == null ? null : value + "";
      return xhr;
    };
    xhr.responseType = function(value) {
      if (!arguments.length) return responseType;
      responseType = value;
      return xhr;
    };
    xhr.response = function(value) {
      response = value;
      return xhr;
    };
    [ "get", "post" ].forEach(function(method) {
      xhr[method] = function() {
        return xhr.send.apply(xhr, [ method ].concat(d3_array(arguments)));
      };
    });
    xhr.send = function(method, data, callback) {
      if (arguments.length === 2 && typeof data === "function") callback = data, data = null;
      request.open(method, url, true);
      if (mimeType != null && !("accept" in headers)) headers["accept"] = mimeType + ",*/*";
      if (request.setRequestHeader) for (var name in headers) request.setRequestHeader(name, headers[name]);
      if (mimeType != null && request.overrideMimeType) request.overrideMimeType(mimeType);
      if (responseType != null) request.responseType = responseType;
      if (callback != null) xhr.on("error", callback).on("load", function(request) {
        callback(null, request);
      });
      request.send(data == null ? null : data);
      return xhr;
    };
    xhr.abort = function() {
      request.abort();
      return xhr;
    };
    d3.rebind(xhr, dispatch, "on");
    return callback == null ? xhr : xhr.get(d3_xhr_fixCallback(callback));
  }
  function d3_xhr_fixCallback(callback) {
    return callback.length === 1 ? function(error, request) {
      callback(error == null ? request : null);
    } : callback;
  }
  d3.dsv = function(delimiter, mimeType) {
    var reFormat = new RegExp('["' + delimiter + "\n]"), delimiterCode = delimiter.charCodeAt(0);
    function dsv(url, row, callback) {
      if (arguments.length < 3) callback = row, row = null;
      var xhr = d3.xhr(url, mimeType, callback);
      xhr.row = function(_) {
        return arguments.length ? xhr.response((row = _) == null ? response : typedResponse(_)) : row;
      };
      return xhr.row(row);
    }
    function response(request) {
      return dsv.parse(request.responseText);
    }
    function typedResponse(f) {
      return function(request) {
        return dsv.parse(request.responseText, f);
      };
    }
    dsv.parse = function(text, f) {
      var o;
      return dsv.parseRows(text, function(row, i) {
        if (o) return o(row, i - 1);
        var a = new Function("d", "return {" + row.map(function(name, i) {
          return JSON.stringify(name) + ": d[" + i + "]";
        }).join(",") + "}");
        o = f ? function(row, i) {
          return f(a(row), i);
        } : a;
      });
    };
    dsv.parseRows = function(text, f) {
      var EOL = {}, EOF = {}, rows = [], N = text.length, I = 0, n = 0, t, eol;
      function token() {
        if (I >= N) return EOF;
        if (eol) return eol = false, EOL;
        var j = I;
        if (text.charCodeAt(j) === 34) {
          var i = j;
          while (i++ < N) {
            if (text.charCodeAt(i) === 34) {
              if (text.charCodeAt(i + 1) !== 34) break;
              ++i;
            }
          }
          I = i + 2;
          var c = text.charCodeAt(i + 1);
          if (c === 13) {
            eol = true;
            if (text.charCodeAt(i + 2) === 10) ++I;
          } else if (c === 10) {
            eol = true;
          }
          return text.substring(j + 1, i).replace(/""/g, '"');
        }
        while (I < N) {
          var c = text.charCodeAt(I++), k = 1;
          if (c === 10) eol = true; else if (c === 13) {
            eol = true;
            if (text.charCodeAt(I) === 10) ++I, ++k;
          } else if (c !== delimiterCode) continue;
          return text.substring(j, I - k);
        }
        return text.substring(j);
      }
      while ((t = token()) !== EOF) {
        var a = [];
        while (t !== EOL && t !== EOF) {
          a.push(t);
          t = token();
        }
        if (f && !(a = f(a, n++))) continue;
        rows.push(a);
      }
      return rows;
    };
    dsv.format = function(rows) {
      if (Array.isArray(rows[0])) return dsv.formatRows(rows);
      var fieldSet = new d3_Set(), fields = [];
      rows.forEach(function(row) {
        for (var field in row) {
          if (!fieldSet.has(field)) {
            fields.push(fieldSet.add(field));
          }
        }
      });
      return [ fields.map(formatValue).join(delimiter) ].concat(rows.map(function(row) {
        return fields.map(function(field) {
          return formatValue(row[field]);
        }).join(delimiter);
      })).join("\n");
    };
    dsv.formatRows = function(rows) {
      return rows.map(formatRow).join("\n");
    };
    function formatRow(row) {
      return row.map(formatValue).join(delimiter);
    }
    function formatValue(text) {
      return reFormat.test(text) ? '"' + text.replace(/\"/g, '""') + '"' : text;
    }
    return dsv;
  };
  d3.csv = d3.dsv(",", "text/csv");
  d3.tsv = d3.dsv("	", "text/tab-separated-values");
  var d3_timer_queueHead, d3_timer_queueTail, d3_timer_interval, d3_timer_timeout, d3_timer_active, d3_timer_frame = d3_window[d3_vendorSymbol(d3_window, "requestAnimationFrame")] || function(callback) {
    setTimeout(callback, 17);
  };
  d3.timer = function(callback, delay, then) {
    var n = arguments.length;
    if (n < 2) delay = 0;
    if (n < 3) then = Date.now();
    var time = then + delay, timer = {
      callback: callback,
      time: time,
      next: null
    };
    if (d3_timer_queueTail) d3_timer_queueTail.next = timer; else d3_timer_queueHead = timer;
    d3_timer_queueTail = timer;
    if (!d3_timer_interval) {
      d3_timer_timeout = clearTimeout(d3_timer_timeout);
      d3_timer_interval = 1;
      d3_timer_frame(d3_timer_step);
    }
  };
  function d3_timer_step() {
    var now = d3_timer_mark(), delay = d3_timer_sweep() - now;
    if (delay > 24) {
      if (isFinite(delay)) {
        clearTimeout(d3_timer_timeout);
        d3_timer_timeout = setTimeout(d3_timer_step, delay);
      }
      d3_timer_interval = 0;
    } else {
      d3_timer_interval = 1;
      d3_timer_frame(d3_timer_step);
    }
  }
  d3.timer.flush = function() {
    d3_timer_mark();
    d3_timer_sweep();
  };
  function d3_timer_replace(callback, delay, then) {
    var n = arguments.length;
    if (n < 2) delay = 0;
    if (n < 3) then = Date.now();
    d3_timer_active.callback = callback;
    d3_timer_active.time = then + delay;
  }
  function d3_timer_mark() {
    var now = Date.now();
    d3_timer_active = d3_timer_queueHead;
    while (d3_timer_active) {
      if (now >= d3_timer_active.time) d3_timer_active.flush = d3_timer_active.callback(now - d3_timer_active.time);
      d3_timer_active = d3_timer_active.next;
    }
    return now;
  }
  function d3_timer_sweep() {
    var t0, t1 = d3_timer_queueHead, time = Infinity;
    while (t1) {
      if (t1.flush) {
        t1 = t0 ? t0.next = t1.next : d3_timer_queueHead = t1.next;
      } else {
        if (t1.time < time) time = t1.time;
        t1 = (t0 = t1).next;
      }
    }
    d3_timer_queueTail = t0;
    return time;
  }
  var d3_format_decimalPoint = ".", d3_format_thousandsSeparator = ",", d3_format_grouping = [ 3, 3 ], d3_format_currencySymbol = "$";
  var d3_formatPrefixes = [ "y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y" ].map(d3_formatPrefix);
  d3.formatPrefix = function(value, precision) {
    var i = 0;
    if (value) {
      if (value < 0) value *= -1;
      if (precision) value = d3.round(value, d3_format_precision(value, precision));
      i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10);
      i = Math.max(-24, Math.min(24, Math.floor((i <= 0 ? i + 1 : i - 1) / 3) * 3));
    }
    return d3_formatPrefixes[8 + i / 3];
  };
  function d3_formatPrefix(d, i) {
    var k = Math.pow(10, Math.abs(8 - i) * 3);
    return {
      scale: i > 8 ? function(d) {
        return d / k;
      } : function(d) {
        return d * k;
      },
      symbol: d
    };
  }
  d3.round = function(x, n) {
    return n ? Math.round(x * (n = Math.pow(10, n))) / n : Math.round(x);
  };
  d3.format = function(specifier) {
    var match = d3_format_re.exec(specifier), fill = match[1] || " ", align = match[2] || ">", sign = match[3] || "", symbol = match[4] || "", zfill = match[5], width = +match[6], comma = match[7], precision = match[8], type = match[9], scale = 1, suffix = "", integer = false;
    if (precision) precision = +precision.substring(1);
    if (zfill || fill === "0" && align === "=") {
      zfill = fill = "0";
      align = "=";
      if (comma) width -= Math.floor((width - 1) / 4);
    }
    switch (type) {
     case "n":
      comma = true;
      type = "g";
      break;

     case "%":
      scale = 100;
      suffix = "%";
      type = "f";
      break;

     case "p":
      scale = 100;
      suffix = "%";
      type = "r";
      break;

     case "b":
     case "o":
     case "x":
     case "X":
      if (symbol === "#") symbol = "0" + type.toLowerCase();

     case "c":
     case "d":
      integer = true;
      precision = 0;
      break;

     case "s":
      scale = -1;
      type = "r";
      break;
    }
    if (symbol === "#") symbol = ""; else if (symbol === "$") symbol = d3_format_currencySymbol;
    if (type == "r" && !precision) type = "g";
    if (precision != null) {
      if (type == "g") precision = Math.max(1, Math.min(21, precision)); else if (type == "e" || type == "f") precision = Math.max(0, Math.min(20, precision));
    }
    type = d3_format_types.get(type) || d3_format_typeDefault;
    var zcomma = zfill && comma;
    return function(value) {
      if (integer && value % 1) return "";
      var negative = value < 0 || value === 0 && 1 / value < 0 ? (value = -value, "-") : sign;
      if (scale < 0) {
        var prefix = d3.formatPrefix(value, precision);
        value = prefix.scale(value);
        suffix = prefix.symbol;
      } else {
        value *= scale;
      }
      value = type(value, precision);
      var i = value.lastIndexOf("."), before = i < 0 ? value : value.substring(0, i), after = i < 0 ? "" : d3_format_decimalPoint + value.substring(i + 1);
      if (!zfill && comma) before = d3_format_group(before);
      var length = symbol.length + before.length + after.length + (zcomma ? 0 : negative.length), padding = length < width ? new Array(length = width - length + 1).join(fill) : "";
      if (zcomma) before = d3_format_group(padding + before);
      negative += symbol;
      value = before + after;
      return (align === "<" ? negative + value + padding : align === ">" ? padding + negative + value : align === "^" ? padding.substring(0, length >>= 1) + negative + value + padding.substring(length) : negative + (zcomma ? value : padding + value)) + suffix;
    };
  };
  var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i;
  var d3_format_types = d3.map({
    b: function(x) {
      return x.toString(2);
    },
    c: function(x) {
      return String.fromCharCode(x);
    },
    o: function(x) {
      return x.toString(8);
    },
    x: function(x) {
      return x.toString(16);
    },
    X: function(x) {
      return x.toString(16).toUpperCase();
    },
    g: function(x, p) {
      return x.toPrecision(p);
    },
    e: function(x, p) {
      return x.toExponential(p);
    },
    f: function(x, p) {
      return x.toFixed(p);
    },
    r: function(x, p) {
      return (x = d3.round(x, d3_format_precision(x, p))).toFixed(Math.max(0, Math.min(20, d3_format_precision(x * (1 + 1e-15), p))));
    }
  });
  function d3_format_precision(x, p) {
    return p - (x ? Math.ceil(Math.log(x) / Math.LN10) : 1);
  }
  function d3_format_typeDefault(x) {
    return x + "";
  }
  var d3_format_group = d3_identity;
  if (d3_format_grouping) {
    var d3_format_groupingLength = d3_format_grouping.length;
    d3_format_group = function(value) {
      var i = value.length, t = [], j = 0, g = d3_format_grouping[0];
      while (i > 0 && g > 0) {
        t.push(value.substring(i -= g, i + g));
        g = d3_format_grouping[j = (j + 1) % d3_format_groupingLength];
      }
      return t.reverse().join(d3_format_thousandsSeparator);
    };
  }
  d3.geo = {};
  function d3_adder() {}
  d3_adder.prototype = {
    s: 0,
    t: 0,
    add: function(y) {
      d3_adderSum(y, this.t, d3_adderTemp);
      d3_adderSum(d3_adderTemp.s, this.s, this);
      if (this.s) this.t += d3_adderTemp.t; else this.s = d3_adderTemp.t;
    },
    reset: function() {
      this.s = this.t = 0;
    },
    valueOf: function() {
      return this.s;
    }
  };
  var d3_adderTemp = new d3_adder();
  function d3_adderSum(a, b, o) {
    var x = o.s = a + b, bv = x - a, av = x - bv;
    o.t = a - av + (b - bv);
  }
  d3.geo.stream = function(object, listener) {
    if (object && d3_geo_streamObjectType.hasOwnProperty(object.type)) {
      d3_geo_streamObjectType[object.type](object, listener);
    } else {
      d3_geo_streamGeometry(object, listener);
    }
  };
  function d3_geo_streamGeometry(geometry, listener) {
    if (geometry && d3_geo_streamGeometryType.hasOwnProperty(geometry.type)) {
      d3_geo_streamGeometryType[geometry.type](geometry, listener);
    }
  }
  var d3_geo_streamObjectType = {
    Feature: function(feature, listener) {
      d3_geo_streamGeometry(feature.geometry, listener);
    },
    FeatureCollection: function(object, listener) {
      var features = object.features, i = -1, n = features.length;
      while (++i < n) d3_geo_streamGeometry(features[i].geometry, listener);
    }
  };
  var d3_geo_streamGeometryType = {
    Sphere: function(object, listener) {
      listener.sphere();
    },
    Point: function(object, listener) {
      var coordinate = object.coordinates;
      listener.point(coordinate[0], coordinate[1]);
    },
    MultiPoint: function(object, listener) {
      var coordinates = object.coordinates, i = -1, n = coordinates.length, coordinate;
      while (++i < n) coordinate = coordinates[i], listener.point(coordinate[0], coordinate[1]);
    },
    LineString: function(object, listener) {
      d3_geo_streamLine(object.coordinates, listener, 0);
    },
    MultiLineString: function(object, listener) {
      var coordinates = object.coordinates, i = -1, n = coordinates.length;
      while (++i < n) d3_geo_streamLine(coordinates[i], listener, 0);
    },
    Polygon: function(object, listener) {
      d3_geo_streamPolygon(object.coordinates, listener);
    },
    MultiPolygon: function(object, listener) {
      var coordinates = object.coordinates, i = -1, n = coordinates.length;
      while (++i < n) d3_geo_streamPolygon(coordinates[i], listener);
    },
    GeometryCollection: function(object, listener) {
      var geometries = object.geometries, i = -1, n = geometries.length;
      while (++i < n) d3_geo_streamGeometry(geometries[i], listener);
    }
  };
  function d3_geo_streamLine(coordinates, listener, closed) {
    var i = -1, n = coordinates.length - closed, coordinate;
    listener.lineStart();
    while (++i < n) coordinate = coordinates[i], listener.point(coordinate[0], coordinate[1]);
    listener.lineEnd();
  }
  function d3_geo_streamPolygon(coordinates, listener) {
    var i = -1, n = coordinates.length;
    listener.polygonStart();
    while (++i < n) d3_geo_streamLine(coordinates[i], listener, 1);
    listener.polygonEnd();
  }
  d3.geo.area = function(object) {
    d3_geo_areaSum = 0;
    d3.geo.stream(object, d3_geo_area);
    return d3_geo_areaSum;
  };
  var d3_geo_areaSum, d3_geo_areaRingSum = new d3_adder();
  var d3_geo_area = {
    sphere: function() {
      d3_geo_areaSum += 4 * π;
    },
    point: d3_noop,
    lineStart: d3_noop,
    lineEnd: d3_noop,
    polygonStart: function() {
      d3_geo_areaRingSum.reset();
      d3_geo_area.lineStart = d3_geo_areaRingStart;
    },
    polygonEnd: function() {
      var area = 2 * d3_geo_areaRingSum;
      d3_geo_areaSum += area < 0 ? 4 * π + area : area;
      d3_geo_area.lineStart = d3_geo_area.lineEnd = d3_geo_area.point = d3_noop;
    }
  };
  function d3_geo_areaRingStart() {
    var λ00, φ00, λ0, cosφ0, sinφ0;
    d3_geo_area.point = function(λ, φ) {
      d3_geo_area.point = nextPoint;
      λ0 = (λ00 = λ) * d3_radians, cosφ0 = Math.cos(φ = (φ00 = φ) * d3_radians / 2 + π / 4), 
      sinφ0 = Math.sin(φ);
    };
    function nextPoint(λ, φ) {
      λ *= d3_radians;
      φ = φ * d3_radians / 2 + π / 4;
      var dλ = λ - λ0, cosφ = Math.cos(φ), sinφ = Math.sin(φ), k = sinφ0 * sinφ, u = cosφ0 * cosφ + k * Math.cos(dλ), v = k * Math.sin(dλ);
      d3_geo_areaRingSum.add(Math.atan2(v, u));
      λ0 = λ, cosφ0 = cosφ, sinφ0 = sinφ;
    }
    d3_geo_area.lineEnd = function() {
      nextPoint(λ00, φ00);
    };
  }
  function d3_geo_cartesian(spherical) {
    var λ = spherical[0], φ = spherical[1], cosφ = Math.cos(φ);
    return [ cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ) ];
  }
  function d3_geo_cartesianDot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  function d3_geo_cartesianCross(a, b) {
    return [ a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0] ];
  }
  function d3_geo_cartesianAdd(a, b) {
    a[0] += b[0];
    a[1] += b[1];
    a[2] += b[2];
  }
  function d3_geo_cartesianScale(vector, k) {
    return [ vector[0] * k, vector[1] * k, vector[2] * k ];
  }
  function d3_geo_cartesianNormalize(d) {
    var l = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
    d[0] /= l;
    d[1] /= l;
    d[2] /= l;
  }
  function d3_geo_spherical(cartesian) {
    return [ Math.atan2(cartesian[1], cartesian[0]), d3_asin(cartesian[2]) ];
  }
  function d3_geo_sphericalEqual(a, b) {
    return Math.abs(a[0] - b[0]) < ε && Math.abs(a[1] - b[1]) < ε;
  }
  d3.geo.bounds = function() {
    var λ0, φ0, λ1, φ1, λ_, λ__, φ__, p0, dλSum, ranges, range;
    var bound = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        bound.point = ringPoint;
        bound.lineStart = ringStart;
        bound.lineEnd = ringEnd;
        dλSum = 0;
        d3_geo_area.polygonStart();
      },
      polygonEnd: function() {
        d3_geo_area.polygonEnd();
        bound.point = point;
        bound.lineStart = lineStart;
        bound.lineEnd = lineEnd;
        if (d3_geo_areaRingSum < 0) λ0 = -(λ1 = 180), φ0 = -(φ1 = 90); else if (dλSum > ε) φ1 = 90; else if (dλSum < -ε) φ0 = -90;
        range[0] = λ0, range[1] = λ1;
      }
    };
    function point(λ, φ) {
      ranges.push(range = [ λ0 = λ, λ1 = λ ]);
      if (φ < φ0) φ0 = φ;
      if (φ > φ1) φ1 = φ;
    }
    function linePoint(λ, φ) {
      var p = d3_geo_cartesian([ λ * d3_radians, φ * d3_radians ]);
      if (p0) {
        var normal = d3_geo_cartesianCross(p0, p), equatorial = [ normal[1], -normal[0], 0 ], inflection = d3_geo_cartesianCross(equatorial, normal);
        d3_geo_cartesianNormalize(inflection);
        inflection = d3_geo_spherical(inflection);
        var dλ = λ - λ_, s = dλ > 0 ? 1 : -1, λi = inflection[0] * d3_degrees * s, antimeridian = Math.abs(dλ) > 180;
        if (antimeridian ^ (s * λ_ < λi && λi < s * λ)) {
          var φi = inflection[1] * d3_degrees;
          if (φi > φ1) φ1 = φi;
        } else if (λi = (λi + 360) % 360 - 180, antimeridian ^ (s * λ_ < λi && λi < s * λ)) {
          var φi = -inflection[1] * d3_degrees;
          if (φi < φ0) φ0 = φi;
        } else {
          if (φ < φ0) φ0 = φ;
          if (φ > φ1) φ1 = φ;
        }
        if (antimeridian) {
          if (λ < λ_) {
            if (angle(λ0, λ) > angle(λ0, λ1)) λ1 = λ;
          } else {
            if (angle(λ, λ1) > angle(λ0, λ1)) λ0 = λ;
          }
        } else {
          if (λ1 >= λ0) {
            if (λ < λ0) λ0 = λ;
            if (λ > λ1) λ1 = λ;
          } else {
            if (λ > λ_) {
              if (angle(λ0, λ) > angle(λ0, λ1)) λ1 = λ;
            } else {
              if (angle(λ, λ1) > angle(λ0, λ1)) λ0 = λ;
            }
          }
        }
      } else {
        point(λ, φ);
      }
      p0 = p, λ_ = λ;
    }
    function lineStart() {
      bound.point = linePoint;
    }
    function lineEnd() {
      range[0] = λ0, range[1] = λ1;
      bound.point = point;
      p0 = null;
    }
    function ringPoint(λ, φ) {
      if (p0) {
        var dλ = λ - λ_;
        dλSum += Math.abs(dλ) > 180 ? dλ + (dλ > 0 ? 360 : -360) : dλ;
      } else λ__ = λ, φ__ = φ;
      d3_geo_area.point(λ, φ);
      linePoint(λ, φ);
    }
    function ringStart() {
      d3_geo_area.lineStart();
    }
    function ringEnd() {
      ringPoint(λ__, φ__);
      d3_geo_area.lineEnd();
      if (Math.abs(dλSum) > ε) λ0 = -(λ1 = 180);
      range[0] = λ0, range[1] = λ1;
      p0 = null;
    }
    function angle(λ0, λ1) {
      return (λ1 -= λ0) < 0 ? λ1 + 360 : λ1;
    }
    function compareRanges(a, b) {
      return a[0] - b[0];
    }
    function withinRange(x, range) {
      return range[0] <= range[1] ? range[0] <= x && x <= range[1] : x < range[0] || range[1] < x;
    }
    return function(feature) {
      φ1 = λ1 = -(λ0 = φ0 = Infinity);
      ranges = [];
      d3.geo.stream(feature, bound);
      var n = ranges.length;
      if (n) {
        ranges.sort(compareRanges);
        for (var i = 1, a = ranges[0], b, merged = [ a ]; i < n; ++i) {
          b = ranges[i];
          if (withinRange(b[0], a) || withinRange(b[1], a)) {
            if (angle(a[0], b[1]) > angle(a[0], a[1])) a[1] = b[1];
            if (angle(b[0], a[1]) > angle(a[0], a[1])) a[0] = b[0];
          } else {
            merged.push(a = b);
          }
        }
        var best = -Infinity, dλ;
        for (var n = merged.length - 1, i = 0, a = merged[n], b; i <= n; a = b, ++i) {
          b = merged[i];
          if ((dλ = angle(a[1], b[0])) > best) best = dλ, λ0 = b[0], λ1 = a[1];
        }
      }
      ranges = range = null;
      return λ0 === Infinity || φ0 === Infinity ? [ [ NaN, NaN ], [ NaN, NaN ] ] : [ [ λ0, φ0 ], [ λ1, φ1 ] ];
    };
  }();
  d3.geo.centroid = function(object) {
    d3_geo_centroidW0 = d3_geo_centroidW1 = d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
    d3.geo.stream(object, d3_geo_centroid);
    var x = d3_geo_centroidX2, y = d3_geo_centroidY2, z = d3_geo_centroidZ2, m = x * x + y * y + z * z;
    if (m < ε2) {
      x = d3_geo_centroidX1, y = d3_geo_centroidY1, z = d3_geo_centroidZ1;
      if (d3_geo_centroidW1 < ε) x = d3_geo_centroidX0, y = d3_geo_centroidY0, z = d3_geo_centroidZ0;
      m = x * x + y * y + z * z;
      if (m < ε2) return [ NaN, NaN ];
    }
    return [ Math.atan2(y, x) * d3_degrees, d3_asin(z / Math.sqrt(m)) * d3_degrees ];
  };
  var d3_geo_centroidW0, d3_geo_centroidW1, d3_geo_centroidX0, d3_geo_centroidY0, d3_geo_centroidZ0, d3_geo_centroidX1, d3_geo_centroidY1, d3_geo_centroidZ1, d3_geo_centroidX2, d3_geo_centroidY2, d3_geo_centroidZ2;
  var d3_geo_centroid = {
    sphere: d3_noop,
    point: d3_geo_centroidPoint,
    lineStart: d3_geo_centroidLineStart,
    lineEnd: d3_geo_centroidLineEnd,
    polygonStart: function() {
      d3_geo_centroid.lineStart = d3_geo_centroidRingStart;
    },
    polygonEnd: function() {
      d3_geo_centroid.lineStart = d3_geo_centroidLineStart;
    }
  };
  function d3_geo_centroidPoint(λ, φ) {
    λ *= d3_radians;
    var cosφ = Math.cos(φ *= d3_radians);
    d3_geo_centroidPointXYZ(cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ));
  }
  function d3_geo_centroidPointXYZ(x, y, z) {
    ++d3_geo_centroidW0;
    d3_geo_centroidX0 += (x - d3_geo_centroidX0) / d3_geo_centroidW0;
    d3_geo_centroidY0 += (y - d3_geo_centroidY0) / d3_geo_centroidW0;
    d3_geo_centroidZ0 += (z - d3_geo_centroidZ0) / d3_geo_centroidW0;
  }
  function d3_geo_centroidLineStart() {
    var x0, y0, z0;
    d3_geo_centroid.point = function(λ, φ) {
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians);
      x0 = cosφ * Math.cos(λ);
      y0 = cosφ * Math.sin(λ);
      z0 = Math.sin(φ);
      d3_geo_centroid.point = nextPoint;
      d3_geo_centroidPointXYZ(x0, y0, z0);
    };
    function nextPoint(λ, φ) {
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians), x = cosφ * Math.cos(λ), y = cosφ * Math.sin(λ), z = Math.sin(φ), w = Math.atan2(Math.sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
      d3_geo_centroidW1 += w;
      d3_geo_centroidX1 += w * (x0 + (x0 = x));
      d3_geo_centroidY1 += w * (y0 + (y0 = y));
      d3_geo_centroidZ1 += w * (z0 + (z0 = z));
      d3_geo_centroidPointXYZ(x0, y0, z0);
    }
  }
  function d3_geo_centroidLineEnd() {
    d3_geo_centroid.point = d3_geo_centroidPoint;
  }
  function d3_geo_centroidRingStart() {
    var λ00, φ00, x0, y0, z0;
    d3_geo_centroid.point = function(λ, φ) {
      λ00 = λ, φ00 = φ;
      d3_geo_centroid.point = nextPoint;
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians);
      x0 = cosφ * Math.cos(λ);
      y0 = cosφ * Math.sin(λ);
      z0 = Math.sin(φ);
      d3_geo_centroidPointXYZ(x0, y0, z0);
    };
    d3_geo_centroid.lineEnd = function() {
      nextPoint(λ00, φ00);
      d3_geo_centroid.lineEnd = d3_geo_centroidLineEnd;
      d3_geo_centroid.point = d3_geo_centroidPoint;
    };
    function nextPoint(λ, φ) {
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians), x = cosφ * Math.cos(λ), y = cosφ * Math.sin(λ), z = Math.sin(φ), cx = y0 * z - z0 * y, cy = z0 * x - x0 * z, cz = x0 * y - y0 * x, m = Math.sqrt(cx * cx + cy * cy + cz * cz), u = x0 * x + y0 * y + z0 * z, v = m && -d3_acos(u) / m, w = Math.atan2(m, u);
      d3_geo_centroidX2 += v * cx;
      d3_geo_centroidY2 += v * cy;
      d3_geo_centroidZ2 += v * cz;
      d3_geo_centroidW1 += w;
      d3_geo_centroidX1 += w * (x0 + (x0 = x));
      d3_geo_centroidY1 += w * (y0 + (y0 = y));
      d3_geo_centroidZ1 += w * (z0 + (z0 = z));
      d3_geo_centroidPointXYZ(x0, y0, z0);
    }
  }
  function d3_true() {
    return true;
  }
  function d3_geo_clipPolygon(segments, compare, inside, interpolate, listener) {
    var subject = [], clip = [];
    segments.forEach(function(segment) {
      if ((n = segment.length - 1) <= 0) return;
      var n, p0 = segment[0], p1 = segment[n];
      if (d3_geo_sphericalEqual(p0, p1)) {
        listener.lineStart();
        for (var i = 0; i < n; ++i) listener.point((p0 = segment[i])[0], p0[1]);
        listener.lineEnd();
        return;
      }
      var a = {
        point: p0,
        points: segment,
        other: null,
        visited: false,
        entry: true,
        subject: true
      }, b = {
        point: p0,
        points: [ p0 ],
        other: a,
        visited: false,
        entry: false,
        subject: false
      };
      a.other = b;
      subject.push(a);
      clip.push(b);
      a = {
        point: p1,
        points: [ p1 ],
        other: null,
        visited: false,
        entry: false,
        subject: true
      };
      b = {
        point: p1,
        points: [ p1 ],
        other: a,
        visited: false,
        entry: true,
        subject: false
      };
      a.other = b;
      subject.push(a);
      clip.push(b);
    });
    clip.sort(compare);
    d3_geo_clipPolygonLinkCircular(subject);
    d3_geo_clipPolygonLinkCircular(clip);
    if (!subject.length) return;
    if (inside) for (var i = 1, e = !inside(clip[0].point), n = clip.length; i < n; ++i) {
      clip[i].entry = e = !e;
    }
    var start = subject[0], current, points, point;
    while (1) {
      current = start;
      while (current.visited) if ((current = current.next) === start) return;
      points = current.points;
      listener.lineStart();
      do {
        current.visited = current.other.visited = true;
        if (current.entry) {
          if (current.subject) {
            for (var i = 0; i < points.length; i++) listener.point((point = points[i])[0], point[1]);
          } else {
            interpolate(current.point, current.next.point, 1, listener);
          }
          current = current.next;
        } else {
          if (current.subject) {
            points = current.prev.points;
            for (var i = points.length; --i >= 0; ) listener.point((point = points[i])[0], point[1]);
          } else {
            interpolate(current.point, current.prev.point, -1, listener);
          }
          current = current.prev;
        }
        current = current.other;
        points = current.points;
      } while (!current.visited);
      listener.lineEnd();
    }
  }
  function d3_geo_clipPolygonLinkCircular(array) {
    if (!(n = array.length)) return;
    var n, i = 0, a = array[0], b;
    while (++i < n) {
      a.next = b = array[i];
      b.prev = a;
      a = b;
    }
    a.next = b = array[0];
    b.prev = a;
  }
  function d3_geo_clip(pointVisible, clipLine, interpolate, polygonContains) {
    return function(listener) {
      var line = clipLine(listener);
      var clip = {
        point: point,
        lineStart: lineStart,
        lineEnd: lineEnd,
        polygonStart: function() {
          clip.point = pointRing;
          clip.lineStart = ringStart;
          clip.lineEnd = ringEnd;
          segments = [];
          polygon = [];
          listener.polygonStart();
        },
        polygonEnd: function() {
          clip.point = point;
          clip.lineStart = lineStart;
          clip.lineEnd = lineEnd;
          segments = d3.merge(segments);
          if (segments.length) {
            d3_geo_clipPolygon(segments, d3_geo_clipSort, null, interpolate, listener);
          } else if (polygonContains(polygon)) {
            listener.lineStart();
            interpolate(null, null, 1, listener);
            listener.lineEnd();
          }
          listener.polygonEnd();
          segments = polygon = null;
        },
        sphere: function() {
          listener.polygonStart();
          listener.lineStart();
          interpolate(null, null, 1, listener);
          listener.lineEnd();
          listener.polygonEnd();
        }
      };
      function point(λ, φ) {
        if (pointVisible(λ, φ)) listener.point(λ, φ);
      }
      function pointLine(λ, φ) {
        line.point(λ, φ);
      }
      function lineStart() {
        clip.point = pointLine;
        line.lineStart();
      }
      function lineEnd() {
        clip.point = point;
        line.lineEnd();
      }
      var segments;
      var buffer = d3_geo_clipBufferListener(), ringListener = clipLine(buffer), polygon, ring;
      function pointRing(λ, φ) {
        ringListener.point(λ, φ);
        ring.push([ λ, φ ]);
      }
      function ringStart() {
        ringListener.lineStart();
        ring = [];
      }
      function ringEnd() {
        pointRing(ring[0][0], ring[0][1]);
        ringListener.lineEnd();
        var clean = ringListener.clean(), ringSegments = buffer.buffer(), segment, n = ringSegments.length;
        ring.pop();
        polygon.push(ring);
        ring = null;
        if (!n) return;
        if (clean & 1) {
          segment = ringSegments[0];
          var n = segment.length - 1, i = -1, point;
          listener.lineStart();
          while (++i < n) listener.point((point = segment[i])[0], point[1]);
          listener.lineEnd();
          return;
        }
        if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
        segments.push(ringSegments.filter(d3_geo_clipSegmentLength1));
      }
      return clip;
    };
  }
  function d3_geo_clipSegmentLength1(segment) {
    return segment.length > 1;
  }
  function d3_geo_clipBufferListener() {
    var lines = [], line;
    return {
      lineStart: function() {
        lines.push(line = []);
      },
      point: function(λ, φ) {
        line.push([ λ, φ ]);
      },
      lineEnd: d3_noop,
      buffer: function() {
        var buffer = lines;
        lines = [];
        line = null;
        return buffer;
      },
      rejoin: function() {
        if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
      }
    };
  }
  function d3_geo_clipSort(a, b) {
    return ((a = a.point)[0] < 0 ? a[1] - π / 2 - ε : π / 2 - a[1]) - ((b = b.point)[0] < 0 ? b[1] - π / 2 - ε : π / 2 - b[1]);
  }
  function d3_geo_pointInPolygon(point, polygon) {
    var meridian = point[0], parallel = point[1], meridianNormal = [ Math.sin(meridian), -Math.cos(meridian), 0 ], polarAngle = 0, polar = false, southPole = false, winding = 0;
    d3_geo_areaRingSum.reset();
    for (var i = 0, n = polygon.length; i < n; ++i) {
      var ring = polygon[i], m = ring.length;
      if (!m) continue;
      var point0 = ring[0], λ0 = point0[0], φ0 = point0[1] / 2 + π / 4, sinφ0 = Math.sin(φ0), cosφ0 = Math.cos(φ0), j = 1;
      while (true) {
        if (j === m) j = 0;
        point = ring[j];
        var λ = point[0], φ = point[1] / 2 + π / 4, sinφ = Math.sin(φ), cosφ = Math.cos(φ), dλ = λ - λ0, antimeridian = Math.abs(dλ) > π, k = sinφ0 * sinφ;
        d3_geo_areaRingSum.add(Math.atan2(k * Math.sin(dλ), cosφ0 * cosφ + k * Math.cos(dλ)));
        if (Math.abs(φ) < ε) southPole = true;
        polarAngle += antimeridian ? dλ + (dλ >= 0 ? 2 : -2) * π : dλ;
        if (antimeridian ^ λ0 >= meridian ^ λ >= meridian) {
          var arc = d3_geo_cartesianCross(d3_geo_cartesian(point0), d3_geo_cartesian(point));
          d3_geo_cartesianNormalize(arc);
          var intersection = d3_geo_cartesianCross(meridianNormal, arc);
          d3_geo_cartesianNormalize(intersection);
          var φarc = (antimeridian ^ dλ >= 0 ? -1 : 1) * d3_asin(intersection[2]);
          if (parallel > φarc) {
            winding += antimeridian ^ dλ >= 0 ? 1 : -1;
          }
        }
        if (!j++) break;
        λ0 = λ, sinφ0 = sinφ, cosφ0 = cosφ, point0 = point;
      }
      if (Math.abs(polarAngle) > ε) polar = true;
    }
    return (!southPole && !polar && d3_geo_areaRingSum < 0 || polarAngle < -ε) ^ winding & 1;
  }
  var d3_geo_clipAntimeridian = d3_geo_clip(d3_true, d3_geo_clipAntimeridianLine, d3_geo_clipAntimeridianInterpolate, d3_geo_clipAntimeridianPolygonContains);
  function d3_geo_clipAntimeridianLine(listener) {
    var λ0 = NaN, φ0 = NaN, sλ0 = NaN, clean;
    return {
      lineStart: function() {
        listener.lineStart();
        clean = 1;
      },
      point: function(λ1, φ1) {
        var sλ1 = λ1 > 0 ? π : -π, dλ = Math.abs(λ1 - λ0);
        if (Math.abs(dλ - π) < ε) {
          listener.point(λ0, φ0 = (φ0 + φ1) / 2 > 0 ? π / 2 : -π / 2);
          listener.point(sλ0, φ0);
          listener.lineEnd();
          listener.lineStart();
          listener.point(sλ1, φ0);
          listener.point(λ1, φ0);
          clean = 0;
        } else if (sλ0 !== sλ1 && dλ >= π) {
          if (Math.abs(λ0 - sλ0) < ε) λ0 -= sλ0 * ε;
          if (Math.abs(λ1 - sλ1) < ε) λ1 -= sλ1 * ε;
          φ0 = d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1);
          listener.point(sλ0, φ0);
          listener.lineEnd();
          listener.lineStart();
          listener.point(sλ1, φ0);
          clean = 0;
        }
        listener.point(λ0 = λ1, φ0 = φ1);
        sλ0 = sλ1;
      },
      lineEnd: function() {
        listener.lineEnd();
        λ0 = φ0 = NaN;
      },
      clean: function() {
        return 2 - clean;
      }
    };
  }
  function d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1) {
    var cosφ0, cosφ1, sinλ0_λ1 = Math.sin(λ0 - λ1);
    return Math.abs(sinλ0_λ1) > ε ? Math.atan((Math.sin(φ0) * (cosφ1 = Math.cos(φ1)) * Math.sin(λ1) - Math.sin(φ1) * (cosφ0 = Math.cos(φ0)) * Math.sin(λ0)) / (cosφ0 * cosφ1 * sinλ0_λ1)) : (φ0 + φ1) / 2;
  }
  function d3_geo_clipAntimeridianInterpolate(from, to, direction, listener) {
    var φ;
    if (from == null) {
      φ = direction * π / 2;
      listener.point(-π, φ);
      listener.point(0, φ);
      listener.point(π, φ);
      listener.point(π, 0);
      listener.point(π, -φ);
      listener.point(0, -φ);
      listener.point(-π, -φ);
      listener.point(-π, 0);
      listener.point(-π, φ);
    } else if (Math.abs(from[0] - to[0]) > ε) {
      var s = (from[0] < to[0] ? 1 : -1) * π;
      φ = direction * s / 2;
      listener.point(-s, φ);
      listener.point(0, φ);
      listener.point(s, φ);
    } else {
      listener.point(to[0], to[1]);
    }
  }
  var d3_geo_clipAntimeridianPoint = [ -π, 0 ];
  function d3_geo_clipAntimeridianPolygonContains(polygon) {
    return d3_geo_pointInPolygon(d3_geo_clipAntimeridianPoint, polygon);
  }
  function d3_geo_clipCircle(radius) {
    var cr = Math.cos(radius), smallRadius = cr > 0, point = [ radius, 0 ], notHemisphere = Math.abs(cr) > ε, interpolate = d3_geo_circleInterpolate(radius, 6 * d3_radians);
    return d3_geo_clip(visible, clipLine, interpolate, polygonContains);
    function visible(λ, φ) {
      return Math.cos(λ) * Math.cos(φ) > cr;
    }
    function clipLine(listener) {
      var point0, c0, v0, v00, clean;
      return {
        lineStart: function() {
          v00 = v0 = false;
          clean = 1;
        },
        point: function(λ, φ) {
          var point1 = [ λ, φ ], point2, v = visible(λ, φ), c = smallRadius ? v ? 0 : code(λ, φ) : v ? code(λ + (λ < 0 ? π : -π), φ) : 0;
          if (!point0 && (v00 = v0 = v)) listener.lineStart();
          if (v !== v0) {
            point2 = intersect(point0, point1);
            if (d3_geo_sphericalEqual(point0, point2) || d3_geo_sphericalEqual(point1, point2)) {
              point1[0] += ε;
              point1[1] += ε;
              v = visible(point1[0], point1[1]);
            }
          }
          if (v !== v0) {
            clean = 0;
            if (v) {
              listener.lineStart();
              point2 = intersect(point1, point0);
              listener.point(point2[0], point2[1]);
            } else {
              point2 = intersect(point0, point1);
              listener.point(point2[0], point2[1]);
              listener.lineEnd();
            }
            point0 = point2;
          } else if (notHemisphere && point0 && smallRadius ^ v) {
            var t;
            if (!(c & c0) && (t = intersect(point1, point0, true))) {
              clean = 0;
              if (smallRadius) {
                listener.lineStart();
                listener.point(t[0][0], t[0][1]);
                listener.point(t[1][0], t[1][1]);
                listener.lineEnd();
              } else {
                listener.point(t[1][0], t[1][1]);
                listener.lineEnd();
                listener.lineStart();
                listener.point(t[0][0], t[0][1]);
              }
            }
          }
          if (v && (!point0 || !d3_geo_sphericalEqual(point0, point1))) {
            listener.point(point1[0], point1[1]);
          }
          point0 = point1, v0 = v, c0 = c;
        },
        lineEnd: function() {
          if (v0) listener.lineEnd();
          point0 = null;
        },
        clean: function() {
          return clean | (v00 && v0) << 1;
        }
      };
    }
    function intersect(a, b, two) {
      var pa = d3_geo_cartesian(a), pb = d3_geo_cartesian(b);
      var n1 = [ 1, 0, 0 ], n2 = d3_geo_cartesianCross(pa, pb), n2n2 = d3_geo_cartesianDot(n2, n2), n1n2 = n2[0], determinant = n2n2 - n1n2 * n1n2;
      if (!determinant) return !two && a;
      var c1 = cr * n2n2 / determinant, c2 = -cr * n1n2 / determinant, n1xn2 = d3_geo_cartesianCross(n1, n2), A = d3_geo_cartesianScale(n1, c1), B = d3_geo_cartesianScale(n2, c2);
      d3_geo_cartesianAdd(A, B);
      var u = n1xn2, w = d3_geo_cartesianDot(A, u), uu = d3_geo_cartesianDot(u, u), t2 = w * w - uu * (d3_geo_cartesianDot(A, A) - 1);
      if (t2 < 0) return;
      var t = Math.sqrt(t2), q = d3_geo_cartesianScale(u, (-w - t) / uu);
      d3_geo_cartesianAdd(q, A);
      q = d3_geo_spherical(q);
      if (!two) return q;
      var λ0 = a[0], λ1 = b[0], φ0 = a[1], φ1 = b[1], z;
      if (λ1 < λ0) z = λ0, λ0 = λ1, λ1 = z;
      var δλ = λ1 - λ0, polar = Math.abs(δλ - π) < ε, meridian = polar || δλ < ε;
      if (!polar && φ1 < φ0) z = φ0, φ0 = φ1, φ1 = z;
      if (meridian ? polar ? φ0 + φ1 > 0 ^ q[1] < (Math.abs(q[0] - λ0) < ε ? φ0 : φ1) : φ0 <= q[1] && q[1] <= φ1 : δλ > π ^ (λ0 <= q[0] && q[0] <= λ1)) {
        var q1 = d3_geo_cartesianScale(u, (-w + t) / uu);
        d3_geo_cartesianAdd(q1, A);
        return [ q, d3_geo_spherical(q1) ];
      }
    }
    function code(λ, φ) {
      var r = smallRadius ? radius : π - radius, code = 0;
      if (λ < -r) code |= 1; else if (λ > r) code |= 2;
      if (φ < -r) code |= 4; else if (φ > r) code |= 8;
      return code;
    }
    function polygonContains(polygon) {
      return d3_geo_pointInPolygon(point, polygon);
    }
  }
  var d3_geo_clipViewMAX = 1e9;
  function d3_geo_clipView(x0, y0, x1, y1) {
    return function(listener) {
      var listener_ = listener, bufferListener = d3_geo_clipBufferListener(), segments, polygon, ring;
      var clip = {
        point: point,
        lineStart: lineStart,
        lineEnd: lineEnd,
        polygonStart: function() {
          listener = bufferListener;
          segments = [];
          polygon = [];
        },
        polygonEnd: function() {
          listener = listener_;
          if ((segments = d3.merge(segments)).length) {
            listener.polygonStart();
            d3_geo_clipPolygon(segments, compare, inside, interpolate, listener);
            listener.polygonEnd();
          } else if (insidePolygon([ x0, y0 ])) {
            listener.polygonStart(), listener.lineStart();
            interpolate(null, null, 1, listener);
            listener.lineEnd(), listener.polygonEnd();
          }
          segments = polygon = ring = null;
        }
      };
      function inside(point) {
        var a = corner(point, -1), i = insidePolygon([ a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0 ]);
        return i;
      }
      function insidePolygon(p) {
        var wn = 0, n = polygon.length, y = p[1];
        for (var i = 0; i < n; ++i) {
          for (var j = 1, v = polygon[i], m = v.length, a = v[0], b; j < m; ++j) {
            b = v[j];
            if (a[1] <= y) {
              if (b[1] > y && isLeft(a, b, p) > 0) ++wn;
            } else {
              if (b[1] <= y && isLeft(a, b, p) < 0) --wn;
            }
            a = b;
          }
        }
        return wn !== 0;
      }
      function isLeft(a, b, c) {
        return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
      }
      function interpolate(from, to, direction, listener) {
        var a = 0, a1 = 0;
        if (from == null || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoints(from, to) < 0 ^ direction > 0) {
          do {
            listener.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
          } while ((a = (a + direction + 4) % 4) !== a1);
        } else {
          listener.point(to[0], to[1]);
        }
      }
      function visible(x, y) {
        return x0 <= x && x <= x1 && y0 <= y && y <= y1;
      }
      function point(x, y) {
        if (visible(x, y)) listener.point(x, y);
      }
      var x__, y__, v__, x_, y_, v_, first;
      function lineStart() {
        clip.point = linePoint;
        if (polygon) polygon.push(ring = []);
        first = true;
        v_ = false;
        x_ = y_ = NaN;
      }
      function lineEnd() {
        if (segments) {
          linePoint(x__, y__);
          if (v__ && v_) bufferListener.rejoin();
          segments.push(bufferListener.buffer());
        }
        clip.point = point;
        if (v_) listener.lineEnd();
      }
      function linePoint(x, y) {
        x = Math.max(-d3_geo_clipViewMAX, Math.min(d3_geo_clipViewMAX, x));
        y = Math.max(-d3_geo_clipViewMAX, Math.min(d3_geo_clipViewMAX, y));
        var v = visible(x, y);
        if (polygon) ring.push([ x, y ]);
        if (first) {
          x__ = x, y__ = y, v__ = v;
          first = false;
          if (v) {
            listener.lineStart();
            listener.point(x, y);
          }
        } else {
          if (v && v_) listener.point(x, y); else {
            var a = [ x_, y_ ], b = [ x, y ];
            if (clipLine(a, b)) {
              if (!v_) {
                listener.lineStart();
                listener.point(a[0], a[1]);
              }
              listener.point(b[0], b[1]);
              if (!v) listener.lineEnd();
            } else if (v) {
              listener.lineStart();
              listener.point(x, y);
            }
          }
        }
        x_ = x, y_ = y, v_ = v;
      }
      return clip;
    };
    function corner(p, direction) {
      return Math.abs(p[0] - x0) < ε ? direction > 0 ? 0 : 3 : Math.abs(p[0] - x1) < ε ? direction > 0 ? 2 : 1 : Math.abs(p[1] - y0) < ε ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2;
    }
    function compare(a, b) {
      return comparePoints(a.point, b.point);
    }
    function comparePoints(a, b) {
      var ca = corner(a, 1), cb = corner(b, 1);
      return ca !== cb ? ca - cb : ca === 0 ? b[1] - a[1] : ca === 1 ? a[0] - b[0] : ca === 2 ? a[1] - b[1] : b[0] - a[0];
    }
    function clipLine(a, b) {
      var dx = b[0] - a[0], dy = b[1] - a[1], t = [ 0, 1 ];
      if (Math.abs(dx) < ε && Math.abs(dy) < ε) return x0 <= a[0] && a[0] <= x1 && y0 <= a[1] && a[1] <= y1;
      if (d3_geo_clipViewT(x0 - a[0], dx, t) && d3_geo_clipViewT(a[0] - x1, -dx, t) && d3_geo_clipViewT(y0 - a[1], dy, t) && d3_geo_clipViewT(a[1] - y1, -dy, t)) {
        if (t[1] < 1) {
          b[0] = a[0] + t[1] * dx;
          b[1] = a[1] + t[1] * dy;
        }
        if (t[0] > 0) {
          a[0] += t[0] * dx;
          a[1] += t[0] * dy;
        }
        return true;
      }
      return false;
    }
  }
  function d3_geo_clipViewT(num, denominator, t) {
    if (Math.abs(denominator) < ε) return num <= 0;
    var u = num / denominator;
    if (denominator > 0) {
      if (u > t[1]) return false;
      if (u > t[0]) t[0] = u;
    } else {
      if (u < t[0]) return false;
      if (u < t[1]) t[1] = u;
    }
    return true;
  }
  function d3_geo_compose(a, b) {
    function compose(x, y) {
      return x = a(x, y), b(x[0], x[1]);
    }
    if (a.invert && b.invert) compose.invert = function(x, y) {
      return x = b.invert(x, y), x && a.invert(x[0], x[1]);
    };
    return compose;
  }
  function d3_geo_conic(projectAt) {
    var φ0 = 0, φ1 = π / 3, m = d3_geo_projectionMutator(projectAt), p = m(φ0, φ1);
    p.parallels = function(_) {
      if (!arguments.length) return [ φ0 / π * 180, φ1 / π * 180 ];
      return m(φ0 = _[0] * π / 180, φ1 = _[1] * π / 180);
    };
    return p;
  }
  function d3_geo_conicEqualArea(φ0, φ1) {
    var sinφ0 = Math.sin(φ0), n = (sinφ0 + Math.sin(φ1)) / 2, C = 1 + sinφ0 * (2 * n - sinφ0), ρ0 = Math.sqrt(C) / n;
    function forward(λ, φ) {
      var ρ = Math.sqrt(C - 2 * n * Math.sin(φ)) / n;
      return [ ρ * Math.sin(λ *= n), ρ0 - ρ * Math.cos(λ) ];
    }
    forward.invert = function(x, y) {
      var ρ0_y = ρ0 - y;
      return [ Math.atan2(x, ρ0_y) / n, d3_asin((C - (x * x + ρ0_y * ρ0_y) * n * n) / (2 * n)) ];
    };
    return forward;
  }
  (d3.geo.conicEqualArea = function() {
    return d3_geo_conic(d3_geo_conicEqualArea);
  }).raw = d3_geo_conicEqualArea;
  d3.geo.albers = function() {
    return d3.geo.conicEqualArea().rotate([ 96, 0 ]).center([ -.6, 38.7 ]).parallels([ 29.5, 45.5 ]).scale(1070);
  };
  d3.geo.albersUsa = function() {
    var lower48 = d3.geo.albers();
    var alaska = d3.geo.conicEqualArea().rotate([ 154, 0 ]).center([ -2, 58.5 ]).parallels([ 55, 65 ]);
    var hawaii = d3.geo.conicEqualArea().rotate([ 157, 0 ]).center([ -3, 19.9 ]).parallels([ 8, 18 ]);
    var point, pointStream = {
      point: function(x, y) {
        point = [ x, y ];
      }
    }, lower48Point, alaskaPoint, hawaiiPoint;
    function albersUsa(coordinates) {
      var x = coordinates[0], y = coordinates[1];
      point = null;
      (lower48Point(x, y), point) || (alaskaPoint(x, y), point) || hawaiiPoint(x, y);
      return point;
    }
    albersUsa.invert = function(coordinates) {
      var k = lower48.scale(), t = lower48.translate(), x = (coordinates[0] - t[0]) / k, y = (coordinates[1] - t[1]) / k;
      return (y >= .12 && y < .234 && x >= -.425 && x < -.214 ? alaska : y >= .166 && y < .234 && x >= -.214 && x < -.115 ? hawaii : lower48).invert(coordinates);
    };
    albersUsa.stream = function(stream) {
      var lower48Stream = lower48.stream(stream), alaskaStream = alaska.stream(stream), hawaiiStream = hawaii.stream(stream);
      return {
        point: function(x, y) {
          lower48Stream.point(x, y);
          alaskaStream.point(x, y);
          hawaiiStream.point(x, y);
        },
        sphere: function() {
          lower48Stream.sphere();
          alaskaStream.sphere();
          hawaiiStream.sphere();
        },
        lineStart: function() {
          lower48Stream.lineStart();
          alaskaStream.lineStart();
          hawaiiStream.lineStart();
        },
        lineEnd: function() {
          lower48Stream.lineEnd();
          alaskaStream.lineEnd();
          hawaiiStream.lineEnd();
        },
        polygonStart: function() {
          lower48Stream.polygonStart();
          alaskaStream.polygonStart();
          hawaiiStream.polygonStart();
        },
        polygonEnd: function() {
          lower48Stream.polygonEnd();
          alaskaStream.polygonEnd();
          hawaiiStream.polygonEnd();
        }
      };
    };
    albersUsa.precision = function(_) {
      if (!arguments.length) return lower48.precision();
      lower48.precision(_);
      alaska.precision(_);
      hawaii.precision(_);
      return albersUsa;
    };
    albersUsa.scale = function(_) {
      if (!arguments.length) return lower48.scale();
      lower48.scale(_);
      alaska.scale(_ * .35);
      hawaii.scale(_);
      return albersUsa.translate(lower48.translate());
    };
    albersUsa.translate = function(_) {
      if (!arguments.length) return lower48.translate();
      var k = lower48.scale(), x = +_[0], y = +_[1];
      lower48Point = lower48.translate(_).clipExtent([ [ x - .455 * k, y - .238 * k ], [ x + .455 * k, y + .238 * k ] ]).stream(pointStream).point;
      alaskaPoint = alaska.translate([ x - .307 * k, y + .201 * k ]).clipExtent([ [ x - .425 * k + ε, y + .12 * k + ε ], [ x - .214 * k - ε, y + .234 * k - ε ] ]).stream(pointStream).point;
      hawaiiPoint = hawaii.translate([ x - .205 * k, y + .212 * k ]).clipExtent([ [ x - .214 * k + ε, y + .166 * k + ε ], [ x - .115 * k - ε, y + .234 * k - ε ] ]).stream(pointStream).point;
      return albersUsa;
    };
    return albersUsa.scale(1070);
  };
  var d3_geo_pathAreaSum, d3_geo_pathAreaPolygon, d3_geo_pathArea = {
    point: d3_noop,
    lineStart: d3_noop,
    lineEnd: d3_noop,
    polygonStart: function() {
      d3_geo_pathAreaPolygon = 0;
      d3_geo_pathArea.lineStart = d3_geo_pathAreaRingStart;
    },
    polygonEnd: function() {
      d3_geo_pathArea.lineStart = d3_geo_pathArea.lineEnd = d3_geo_pathArea.point = d3_noop;
      d3_geo_pathAreaSum += Math.abs(d3_geo_pathAreaPolygon / 2);
    }
  };
  function d3_geo_pathAreaRingStart() {
    var x00, y00, x0, y0;
    d3_geo_pathArea.point = function(x, y) {
      d3_geo_pathArea.point = nextPoint;
      x00 = x0 = x, y00 = y0 = y;
    };
    function nextPoint(x, y) {
      d3_geo_pathAreaPolygon += y0 * x - x0 * y;
      x0 = x, y0 = y;
    }
    d3_geo_pathArea.lineEnd = function() {
      nextPoint(x00, y00);
    };
  }
  var d3_geo_pathBoundsX0, d3_geo_pathBoundsY0, d3_geo_pathBoundsX1, d3_geo_pathBoundsY1;
  var d3_geo_pathBounds = {
    point: d3_geo_pathBoundsPoint,
    lineStart: d3_noop,
    lineEnd: d3_noop,
    polygonStart: d3_noop,
    polygonEnd: d3_noop
  };
  function d3_geo_pathBoundsPoint(x, y) {
    if (x < d3_geo_pathBoundsX0) d3_geo_pathBoundsX0 = x;
    if (x > d3_geo_pathBoundsX1) d3_geo_pathBoundsX1 = x;
    if (y < d3_geo_pathBoundsY0) d3_geo_pathBoundsY0 = y;
    if (y > d3_geo_pathBoundsY1) d3_geo_pathBoundsY1 = y;
  }
  function d3_geo_pathBuffer() {
    var pointCircle = d3_geo_pathBufferCircle(4.5), buffer = [];
    var stream = {
      point: point,
      lineStart: function() {
        stream.point = pointLineStart;
      },
      lineEnd: lineEnd,
      polygonStart: function() {
        stream.lineEnd = lineEndPolygon;
      },
      polygonEnd: function() {
        stream.lineEnd = lineEnd;
        stream.point = point;
      },
      pointRadius: function(_) {
        pointCircle = d3_geo_pathBufferCircle(_);
        return stream;
      },
      result: function() {
        if (buffer.length) {
          var result = buffer.join("");
          buffer = [];
          return result;
        }
      }
    };
    function point(x, y) {
      buffer.push("M", x, ",", y, pointCircle);
    }
    function pointLineStart(x, y) {
      buffer.push("M", x, ",", y);
      stream.point = pointLine;
    }
    function pointLine(x, y) {
      buffer.push("L", x, ",", y);
    }
    function lineEnd() {
      stream.point = point;
    }
    function lineEndPolygon() {
      buffer.push("Z");
    }
    return stream;
  }
  function d3_geo_pathBufferCircle(radius) {
    return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius + "z";
  }
  var d3_geo_pathCentroid = {
    point: d3_geo_pathCentroidPoint,
    lineStart: d3_geo_pathCentroidLineStart,
    lineEnd: d3_geo_pathCentroidLineEnd,
    polygonStart: function() {
      d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidRingStart;
    },
    polygonEnd: function() {
      d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
      d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidLineStart;
      d3_geo_pathCentroid.lineEnd = d3_geo_pathCentroidLineEnd;
    }
  };
  function d3_geo_pathCentroidPoint(x, y) {
    d3_geo_centroidX0 += x;
    d3_geo_centroidY0 += y;
    ++d3_geo_centroidZ0;
  }
  function d3_geo_pathCentroidLineStart() {
    var x0, y0;
    d3_geo_pathCentroid.point = function(x, y) {
      d3_geo_pathCentroid.point = nextPoint;
      d3_geo_pathCentroidPoint(x0 = x, y0 = y);
    };
    function nextPoint(x, y) {
      var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
      d3_geo_centroidX1 += z * (x0 + x) / 2;
      d3_geo_centroidY1 += z * (y0 + y) / 2;
      d3_geo_centroidZ1 += z;
      d3_geo_pathCentroidPoint(x0 = x, y0 = y);
    }
  }
  function d3_geo_pathCentroidLineEnd() {
    d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
  }
  function d3_geo_pathCentroidRingStart() {
    var x00, y00, x0, y0;
    d3_geo_pathCentroid.point = function(x, y) {
      d3_geo_pathCentroid.point = nextPoint;
      d3_geo_pathCentroidPoint(x00 = x0 = x, y00 = y0 = y);
    };
    function nextPoint(x, y) {
      var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
      d3_geo_centroidX1 += z * (x0 + x) / 2;
      d3_geo_centroidY1 += z * (y0 + y) / 2;
      d3_geo_centroidZ1 += z;
      z = y0 * x - x0 * y;
      d3_geo_centroidX2 += z * (x0 + x);
      d3_geo_centroidY2 += z * (y0 + y);
      d3_geo_centroidZ2 += z * 3;
      d3_geo_pathCentroidPoint(x0 = x, y0 = y);
    }
    d3_geo_pathCentroid.lineEnd = function() {
      nextPoint(x00, y00);
    };
  }
  function d3_geo_pathContext(context) {
    var pointRadius = 4.5;
    var stream = {
      point: point,
      lineStart: function() {
        stream.point = pointLineStart;
      },
      lineEnd: lineEnd,
      polygonStart: function() {
        stream.lineEnd = lineEndPolygon;
      },
      polygonEnd: function() {
        stream.lineEnd = lineEnd;
        stream.point = point;
      },
      pointRadius: function(_) {
        pointRadius = _;
        return stream;
      },
      result: d3_noop
    };
    function point(x, y) {
      context.moveTo(x, y);
      context.arc(x, y, pointRadius, 0, 2 * π);
    }
    function pointLineStart(x, y) {
      context.moveTo(x, y);
      stream.point = pointLine;
    }
    function pointLine(x, y) {
      context.lineTo(x, y);
    }
    function lineEnd() {
      stream.point = point;
    }
    function lineEndPolygon() {
      context.closePath();
    }
    return stream;
  }
  function d3_geo_resample(project) {
    var δ2 = .5, cosMinDistance = Math.cos(30 * d3_radians), maxDepth = 16;
    function resample(stream) {
      var λ00, φ00, x00, y00, a00, b00, c00, λ0, x0, y0, a0, b0, c0;
      var resample = {
        point: point,
        lineStart: lineStart,
        lineEnd: lineEnd,
        polygonStart: function() {
          stream.polygonStart();
          resample.lineStart = ringStart;
        },
        polygonEnd: function() {
          stream.polygonEnd();
          resample.lineStart = lineStart;
        }
      };
      function point(x, y) {
        x = project(x, y);
        stream.point(x[0], x[1]);
      }
      function lineStart() {
        x0 = NaN;
        resample.point = linePoint;
        stream.lineStart();
      }
      function linePoint(λ, φ) {
        var c = d3_geo_cartesian([ λ, φ ]), p = project(λ, φ);
        resampleLineTo(x0, y0, λ0, a0, b0, c0, x0 = p[0], y0 = p[1], λ0 = λ, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
        stream.point(x0, y0);
      }
      function lineEnd() {
        resample.point = point;
        stream.lineEnd();
      }
      function ringStart() {
        lineStart();
        resample.point = ringPoint;
        resample.lineEnd = ringEnd;
      }
      function ringPoint(λ, φ) {
        linePoint(λ00 = λ, φ00 = φ), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
        resample.point = linePoint;
      }
      function ringEnd() {
        resampleLineTo(x0, y0, λ0, a0, b0, c0, x00, y00, λ00, a00, b00, c00, maxDepth, stream);
        resample.lineEnd = lineEnd;
        lineEnd();
      }
      return resample;
    }
    function resampleLineTo(x0, y0, λ0, a0, b0, c0, x1, y1, λ1, a1, b1, c1, depth, stream) {
      var dx = x1 - x0, dy = y1 - y0, d2 = dx * dx + dy * dy;
      if (d2 > 4 * δ2 && depth--) {
        var a = a0 + a1, b = b0 + b1, c = c0 + c1, m = Math.sqrt(a * a + b * b + c * c), φ2 = Math.asin(c /= m), λ2 = Math.abs(Math.abs(c) - 1) < ε ? (λ0 + λ1) / 2 : Math.atan2(b, a), p = project(λ2, φ2), x2 = p[0], y2 = p[1], dx2 = x2 - x0, dy2 = y2 - y0, dz = dy * dx2 - dx * dy2;
        if (dz * dz / d2 > δ2 || Math.abs((dx * dx2 + dy * dy2) / d2 - .5) > .3 || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
          resampleLineTo(x0, y0, λ0, a0, b0, c0, x2, y2, λ2, a /= m, b /= m, c, depth, stream);
          stream.point(x2, y2);
          resampleLineTo(x2, y2, λ2, a, b, c, x1, y1, λ1, a1, b1, c1, depth, stream);
        }
      }
    }
    resample.precision = function(_) {
      if (!arguments.length) return Math.sqrt(δ2);
      maxDepth = (δ2 = _ * _) > 0 && 16;
      return resample;
    };
    return resample;
  }
  d3.geo.path = function() {
    var pointRadius = 4.5, projection, context, projectStream, contextStream, cacheStream;
    function path(object) {
      if (object) {
        if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
        if (!cacheStream || !cacheStream.valid) cacheStream = projectStream(contextStream);
        d3.geo.stream(object, cacheStream);
      }
      return contextStream.result();
    }
    path.area = function(object) {
      d3_geo_pathAreaSum = 0;
      d3.geo.stream(object, projectStream(d3_geo_pathArea));
      return d3_geo_pathAreaSum;
    };
    path.centroid = function(object) {
      d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
      d3.geo.stream(object, projectStream(d3_geo_pathCentroid));
      return d3_geo_centroidZ2 ? [ d3_geo_centroidX2 / d3_geo_centroidZ2, d3_geo_centroidY2 / d3_geo_centroidZ2 ] : d3_geo_centroidZ1 ? [ d3_geo_centroidX1 / d3_geo_centroidZ1, d3_geo_centroidY1 / d3_geo_centroidZ1 ] : d3_geo_centroidZ0 ? [ d3_geo_centroidX0 / d3_geo_centroidZ0, d3_geo_centroidY0 / d3_geo_centroidZ0 ] : [ NaN, NaN ];
    };
    path.bounds = function(object) {
      d3_geo_pathBoundsX1 = d3_geo_pathBoundsY1 = -(d3_geo_pathBoundsX0 = d3_geo_pathBoundsY0 = Infinity);
      d3.geo.stream(object, projectStream(d3_geo_pathBounds));
      return [ [ d3_geo_pathBoundsX0, d3_geo_pathBoundsY0 ], [ d3_geo_pathBoundsX1, d3_geo_pathBoundsY1 ] ];
    };
    path.projection = function(_) {
      if (!arguments.length) return projection;
      projectStream = (projection = _) ? _.stream || d3_geo_pathProjectStream(_) : d3_identity;
      return reset();
    };
    path.context = function(_) {
      if (!arguments.length) return context;
      contextStream = (context = _) == null ? new d3_geo_pathBuffer() : new d3_geo_pathContext(_);
      if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
      return reset();
    };
    path.pointRadius = function(_) {
      if (!arguments.length) return pointRadius;
      pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
      return path;
    };
    function reset() {
      cacheStream = null;
      return path;
    }
    return path.projection(d3.geo.albersUsa()).context(null);
  };
  function d3_geo_pathProjectStream(project) {
    var resample = d3_geo_resample(function(λ, φ) {
      return project([ λ * d3_degrees, φ * d3_degrees ]);
    });
    return function(stream) {
      stream = resample(stream);
      return {
        point: function(λ, φ) {
          stream.point(λ * d3_radians, φ * d3_radians);
        },
        sphere: function() {
          stream.sphere();
        },
        lineStart: function() {
          stream.lineStart();
        },
        lineEnd: function() {
          stream.lineEnd();
        },
        polygonStart: function() {
          stream.polygonStart();
        },
        polygonEnd: function() {
          stream.polygonEnd();
        }
      };
    };
  }
  d3.geo.projection = d3_geo_projection;
  d3.geo.projectionMutator = d3_geo_projectionMutator;
  function d3_geo_projection(project) {
    return d3_geo_projectionMutator(function() {
      return project;
    })();
  }
  function d3_geo_projectionMutator(projectAt) {
    var project, rotate, projectRotate, projectResample = d3_geo_resample(function(x, y) {
      x = project(x, y);
      return [ x[0] * k + δx, δy - x[1] * k ];
    }), k = 150, x = 480, y = 250, λ = 0, φ = 0, δλ = 0, δφ = 0, δγ = 0, δx, δy, preclip = d3_geo_clipAntimeridian, postclip = d3_identity, clipAngle = null, clipExtent = null, stream;
    function projection(point) {
      point = projectRotate(point[0] * d3_radians, point[1] * d3_radians);
      return [ point[0] * k + δx, δy - point[1] * k ];
    }
    function invert(point) {
      point = projectRotate.invert((point[0] - δx) / k, (δy - point[1]) / k);
      return point && [ point[0] * d3_degrees, point[1] * d3_degrees ];
    }
    projection.stream = function(output) {
      if (stream) stream.valid = false;
      stream = d3_geo_projectionRadiansRotate(rotate, preclip(projectResample(postclip(output))));
      stream.valid = true;
      return stream;
    };
    projection.clipAngle = function(_) {
      if (!arguments.length) return clipAngle;
      preclip = _ == null ? (clipAngle = _, d3_geo_clipAntimeridian) : d3_geo_clipCircle((clipAngle = +_) * d3_radians);
      return invalidate();
    };
    projection.clipExtent = function(_) {
      if (!arguments.length) return clipExtent;
      clipExtent = _;
      postclip = _ == null ? d3_identity : d3_geo_clipView(_[0][0], _[0][1], _[1][0], _[1][1]);
      return invalidate();
    };
    projection.scale = function(_) {
      if (!arguments.length) return k;
      k = +_;
      return reset();
    };
    projection.translate = function(_) {
      if (!arguments.length) return [ x, y ];
      x = +_[0];
      y = +_[1];
      return reset();
    };
    projection.center = function(_) {
      if (!arguments.length) return [ λ * d3_degrees, φ * d3_degrees ];
      λ = _[0] % 360 * d3_radians;
      φ = _[1] % 360 * d3_radians;
      return reset();
    };
    projection.rotate = function(_) {
      if (!arguments.length) return [ δλ * d3_degrees, δφ * d3_degrees, δγ * d3_degrees ];
      δλ = _[0] % 360 * d3_radians;
      δφ = _[1] % 360 * d3_radians;
      δγ = _.length > 2 ? _[2] % 360 * d3_radians : 0;
      return reset();
    };
    d3.rebind(projection, projectResample, "precision");
    function reset() {
      projectRotate = d3_geo_compose(rotate = d3_geo_rotation(δλ, δφ, δγ), project);
      var center = project(λ, φ);
      δx = x - center[0] * k;
      δy = y + center[1] * k;
      return invalidate();
    }
    function invalidate() {
      if (stream) {
        stream.valid = false;
        stream = null;
      }
      return projection;
    }
    return function() {
      project = projectAt.apply(this, arguments);
      projection.invert = project.invert && invert;
      return reset();
    };
  }
  function d3_geo_projectionRadiansRotate(rotate, stream) {
    return {
      point: function(x, y) {
        y = rotate(x * d3_radians, y * d3_radians), x = y[0];
        stream.point(x > π ? x - 2 * π : x < -π ? x + 2 * π : x, y[1]);
      },
      sphere: function() {
        stream.sphere();
      },
      lineStart: function() {
        stream.lineStart();
      },
      lineEnd: function() {
        stream.lineEnd();
      },
      polygonStart: function() {
        stream.polygonStart();
      },
      polygonEnd: function() {
        stream.polygonEnd();
      }
    };
  }
  function d3_geo_equirectangular(λ, φ) {
    return [ λ, φ ];
  }
  (d3.geo.equirectangular = function() {
    return d3_geo_projection(d3_geo_equirectangular);
  }).raw = d3_geo_equirectangular.invert = d3_geo_equirectangular;
  d3.geo.rotation = function(rotate) {
    rotate = d3_geo_rotation(rotate[0] % 360 * d3_radians, rotate[1] * d3_radians, rotate.length > 2 ? rotate[2] * d3_radians : 0);
    function forward(coordinates) {
      coordinates = rotate(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
      return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates;
    }
    forward.invert = function(coordinates) {
      coordinates = rotate.invert(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
      return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates;
    };
    return forward;
  };
  function d3_geo_rotation(δλ, δφ, δγ) {
    return δλ ? δφ || δγ ? d3_geo_compose(d3_geo_rotationλ(δλ), d3_geo_rotationφγ(δφ, δγ)) : d3_geo_rotationλ(δλ) : δφ || δγ ? d3_geo_rotationφγ(δφ, δγ) : d3_geo_equirectangular;
  }
  function d3_geo_forwardRotationλ(δλ) {
    return function(λ, φ) {
      return λ += δλ, [ λ > π ? λ - 2 * π : λ < -π ? λ + 2 * π : λ, φ ];
    };
  }
  function d3_geo_rotationλ(δλ) {
    var rotation = d3_geo_forwardRotationλ(δλ);
    rotation.invert = d3_geo_forwardRotationλ(-δλ);
    return rotation;
  }
  function d3_geo_rotationφγ(δφ, δγ) {
    var cosδφ = Math.cos(δφ), sinδφ = Math.sin(δφ), cosδγ = Math.cos(δγ), sinδγ = Math.sin(δγ);
    function rotation(λ, φ) {
      var cosφ = Math.cos(φ), x = Math.cos(λ) * cosφ, y = Math.sin(λ) * cosφ, z = Math.sin(φ), k = z * cosδφ + x * sinδφ;
      return [ Math.atan2(y * cosδγ - k * sinδγ, x * cosδφ - z * sinδφ), d3_asin(k * cosδγ + y * sinδγ) ];
    }
    rotation.invert = function(λ, φ) {
      var cosφ = Math.cos(φ), x = Math.cos(λ) * cosφ, y = Math.sin(λ) * cosφ, z = Math.sin(φ), k = z * cosδγ - y * sinδγ;
      return [ Math.atan2(y * cosδγ + z * sinδγ, x * cosδφ + k * sinδφ), d3_asin(k * cosδφ - x * sinδφ) ];
    };
    return rotation;
  }
  d3.geo.circle = function() {
    var origin = [ 0, 0 ], angle, precision = 6, interpolate;
    function circle() {
      var center = typeof origin === "function" ? origin.apply(this, arguments) : origin, rotate = d3_geo_rotation(-center[0] * d3_radians, -center[1] * d3_radians, 0).invert, ring = [];
      interpolate(null, null, 1, {
        point: function(x, y) {
          ring.push(x = rotate(x, y));
          x[0] *= d3_degrees, x[1] *= d3_degrees;
        }
      });
      return {
        type: "Polygon",
        coordinates: [ ring ]
      };
    }
    circle.origin = function(x) {
      if (!arguments.length) return origin;
      origin = x;
      return circle;
    };
    circle.angle = function(x) {
      if (!arguments.length) return angle;
      interpolate = d3_geo_circleInterpolate((angle = +x) * d3_radians, precision * d3_radians);
      return circle;
    };
    circle.precision = function(_) {
      if (!arguments.length) return precision;
      interpolate = d3_geo_circleInterpolate(angle * d3_radians, (precision = +_) * d3_radians);
      return circle;
    };
    return circle.angle(90);
  };
  function d3_geo_circleInterpolate(radius, precision) {
    var cr = Math.cos(radius), sr = Math.sin(radius);
    return function(from, to, direction, listener) {
      if (from != null) {
        from = d3_geo_circleAngle(cr, from);
        to = d3_geo_circleAngle(cr, to);
        if (direction > 0 ? from < to : from > to) from += direction * 2 * π;
      } else {
        from = radius + direction * 2 * π;
        to = radius;
      }
      var point;
      for (var step = direction * precision, t = from; direction > 0 ? t > to : t < to; t -= step) {
        listener.point((point = d3_geo_spherical([ cr, -sr * Math.cos(t), -sr * Math.sin(t) ]))[0], point[1]);
      }
    };
  }
  function d3_geo_circleAngle(cr, point) {
    var a = d3_geo_cartesian(point);
    a[0] -= cr;
    d3_geo_cartesianNormalize(a);
    var angle = d3_acos(-a[1]);
    return ((-a[2] < 0 ? -angle : angle) + 2 * Math.PI - ε) % (2 * Math.PI);
  }
  d3.geo.distance = function(a, b) {
    var Δλ = (b[0] - a[0]) * d3_radians, φ0 = a[1] * d3_radians, φ1 = b[1] * d3_radians, sinΔλ = Math.sin(Δλ), cosΔλ = Math.cos(Δλ), sinφ0 = Math.sin(φ0), cosφ0 = Math.cos(φ0), sinφ1 = Math.sin(φ1), cosφ1 = Math.cos(φ1), t;
    return Math.atan2(Math.sqrt((t = cosφ1 * sinΔλ) * t + (t = cosφ0 * sinφ1 - sinφ0 * cosφ1 * cosΔλ) * t), sinφ0 * sinφ1 + cosφ0 * cosφ1 * cosΔλ);
  };
  d3.geo.graticule = function() {
    var x1, x0, X1, X0, y1, y0, Y1, Y0, dx = 10, dy = dx, DX = 90, DY = 360, x, y, X, Y, precision = 2.5;
    function graticule() {
      return {
        type: "MultiLineString",
        coordinates: lines()
      };
    }
    function lines() {
      return d3.range(Math.ceil(X0 / DX) * DX, X1, DX).map(X).concat(d3.range(Math.ceil(Y0 / DY) * DY, Y1, DY).map(Y)).concat(d3.range(Math.ceil(x0 / dx) * dx, x1, dx).filter(function(x) {
        return Math.abs(x % DX) > ε;
      }).map(x)).concat(d3.range(Math.ceil(y0 / dy) * dy, y1, dy).filter(function(y) {
        return Math.abs(y % DY) > ε;
      }).map(y));
    }
    graticule.lines = function() {
      return lines().map(function(coordinates) {
        return {
          type: "LineString",
          coordinates: coordinates
        };
      });
    };
    graticule.outline = function() {
      return {
        type: "Polygon",
        coordinates: [ X(X0).concat(Y(Y1).slice(1), X(X1).reverse().slice(1), Y(Y0).reverse().slice(1)) ]
      };
    };
    graticule.extent = function(_) {
      if (!arguments.length) return graticule.minorExtent();
      return graticule.majorExtent(_).minorExtent(_);
    };
    graticule.majorExtent = function(_) {
      if (!arguments.length) return [ [ X0, Y0 ], [ X1, Y1 ] ];
      X0 = +_[0][0], X1 = +_[1][0];
      Y0 = +_[0][1], Y1 = +_[1][1];
      if (X0 > X1) _ = X0, X0 = X1, X1 = _;
      if (Y0 > Y1) _ = Y0, Y0 = Y1, Y1 = _;
      return graticule.precision(precision);
    };
    graticule.minorExtent = function(_) {
      if (!arguments.length) return [ [ x0, y0 ], [ x1, y1 ] ];
      x0 = +_[0][0], x1 = +_[1][0];
      y0 = +_[0][1], y1 = +_[1][1];
      if (x0 > x1) _ = x0, x0 = x1, x1 = _;
      if (y0 > y1) _ = y0, y0 = y1, y1 = _;
      return graticule.precision(precision);
    };
    graticule.step = function(_) {
      if (!arguments.length) return graticule.minorStep();
      return graticule.majorStep(_).minorStep(_);
    };
    graticule.majorStep = function(_) {
      if (!arguments.length) return [ DX, DY ];
      DX = +_[0], DY = +_[1];
      return graticule;
    };
    graticule.minorStep = function(_) {
      if (!arguments.length) return [ dx, dy ];
      dx = +_[0], dy = +_[1];
      return graticule;
    };
    graticule.precision = function(_) {
      if (!arguments.length) return precision;
      precision = +_;
      x = d3_geo_graticuleX(y0, y1, 90);
      y = d3_geo_graticuleY(x0, x1, precision);
      X = d3_geo_graticuleX(Y0, Y1, 90);
      Y = d3_geo_graticuleY(X0, X1, precision);
      return graticule;
    };
    return graticule.majorExtent([ [ -180, -90 + ε ], [ 180, 90 - ε ] ]).minorExtent([ [ -180, -80 - ε ], [ 180, 80 + ε ] ]);
  };
  function d3_geo_graticuleX(y0, y1, dy) {
    var y = d3.range(y0, y1 - ε, dy).concat(y1);
    return function(x) {
      return y.map(function(y) {
        return [ x, y ];
      });
    };
  }
  function d3_geo_graticuleY(x0, x1, dx) {
    var x = d3.range(x0, x1 - ε, dx).concat(x1);
    return function(y) {
      return x.map(function(x) {
        return [ x, y ];
      });
    };
  }
  function d3_source(d) {
    return d.source;
  }
  function d3_target(d) {
    return d.target;
  }
  d3.geo.greatArc = function() {
    var source = d3_source, source_, target = d3_target, target_;
    function greatArc() {
      return {
        type: "LineString",
        coordinates: [ source_ || source.apply(this, arguments), target_ || target.apply(this, arguments) ]
      };
    }
    greatArc.distance = function() {
      return d3.geo.distance(source_ || source.apply(this, arguments), target_ || target.apply(this, arguments));
    };
    greatArc.source = function(_) {
      if (!arguments.length) return source;
      source = _, source_ = typeof _ === "function" ? null : _;
      return greatArc;
    };
    greatArc.target = function(_) {
      if (!arguments.length) return target;
      target = _, target_ = typeof _ === "function" ? null : _;
      return greatArc;
    };
    greatArc.precision = function() {
      return arguments.length ? greatArc : 0;
    };
    return greatArc;
  };
  d3.geo.interpolate = function(source, target) {
    return d3_geo_interpolate(source[0] * d3_radians, source[1] * d3_radians, target[0] * d3_radians, target[1] * d3_radians);
  };
  function d3_geo_interpolate(x0, y0, x1, y1) {
    var cy0 = Math.cos(y0), sy0 = Math.sin(y0), cy1 = Math.cos(y1), sy1 = Math.sin(y1), kx0 = cy0 * Math.cos(x0), ky0 = cy0 * Math.sin(x0), kx1 = cy1 * Math.cos(x1), ky1 = cy1 * Math.sin(x1), d = 2 * Math.asin(Math.sqrt(d3_haversin(y1 - y0) + cy0 * cy1 * d3_haversin(x1 - x0))), k = 1 / Math.sin(d);
    var interpolate = d ? function(t) {
      var B = Math.sin(t *= d) * k, A = Math.sin(d - t) * k, x = A * kx0 + B * kx1, y = A * ky0 + B * ky1, z = A * sy0 + B * sy1;
      return [ Math.atan2(y, x) * d3_degrees, Math.atan2(z, Math.sqrt(x * x + y * y)) * d3_degrees ];
    } : function() {
      return [ x0 * d3_degrees, y0 * d3_degrees ];
    };
    interpolate.distance = d;
    return interpolate;
  }
  d3.geo.length = function(object) {
    d3_geo_lengthSum = 0;
    d3.geo.stream(object, d3_geo_length);
    return d3_geo_lengthSum;
  };
  var d3_geo_lengthSum;
  var d3_geo_length = {
    sphere: d3_noop,
    point: d3_noop,
    lineStart: d3_geo_lengthLineStart,
    lineEnd: d3_noop,
    polygonStart: d3_noop,
    polygonEnd: d3_noop
  };
  function d3_geo_lengthLineStart() {
    var λ0, sinφ0, cosφ0;
    d3_geo_length.point = function(λ, φ) {
      λ0 = λ * d3_radians, sinφ0 = Math.sin(φ *= d3_radians), cosφ0 = Math.cos(φ);
      d3_geo_length.point = nextPoint;
    };
    d3_geo_length.lineEnd = function() {
      d3_geo_length.point = d3_geo_length.lineEnd = d3_noop;
    };
    function nextPoint(λ, φ) {
      var sinφ = Math.sin(φ *= d3_radians), cosφ = Math.cos(φ), t = Math.abs((λ *= d3_radians) - λ0), cosΔλ = Math.cos(t);
      d3_geo_lengthSum += Math.atan2(Math.sqrt((t = cosφ * Math.sin(t)) * t + (t = cosφ0 * sinφ - sinφ0 * cosφ * cosΔλ) * t), sinφ0 * sinφ + cosφ0 * cosφ * cosΔλ);
      λ0 = λ, sinφ0 = sinφ, cosφ0 = cosφ;
    }
  }
  function d3_geo_azimuthal(scale, angle) {
    function azimuthal(λ, φ) {
      var cosλ = Math.cos(λ), cosφ = Math.cos(φ), k = scale(cosλ * cosφ);
      return [ k * cosφ * Math.sin(λ), k * Math.sin(φ) ];
    }
    azimuthal.invert = function(x, y) {
      var ρ = Math.sqrt(x * x + y * y), c = angle(ρ), sinc = Math.sin(c), cosc = Math.cos(c);
      return [ Math.atan2(x * sinc, ρ * cosc), Math.asin(ρ && y * sinc / ρ) ];
    };
    return azimuthal;
  }
  var d3_geo_azimuthalEqualArea = d3_geo_azimuthal(function(cosλcosφ) {
    return Math.sqrt(2 / (1 + cosλcosφ));
  }, function(ρ) {
    return 2 * Math.asin(ρ / 2);
  });
  (d3.geo.azimuthalEqualArea = function() {
    return d3_geo_projection(d3_geo_azimuthalEqualArea);
  }).raw = d3_geo_azimuthalEqualArea;
  var d3_geo_azimuthalEquidistant = d3_geo_azimuthal(function(cosλcosφ) {
    var c = Math.acos(cosλcosφ);
    return c && c / Math.sin(c);
  }, d3_identity);
  (d3.geo.azimuthalEquidistant = function() {
    return d3_geo_projection(d3_geo_azimuthalEquidistant);
  }).raw = d3_geo_azimuthalEquidistant;
  function d3_geo_conicConformal(φ0, φ1) {
    var cosφ0 = Math.cos(φ0), t = function(φ) {
      return Math.tan(π / 4 + φ / 2);
    }, n = φ0 === φ1 ? Math.sin(φ0) : Math.log(cosφ0 / Math.cos(φ1)) / Math.log(t(φ1) / t(φ0)), F = cosφ0 * Math.pow(t(φ0), n) / n;
    if (!n) return d3_geo_mercator;
    function forward(λ, φ) {
      var ρ = Math.abs(Math.abs(φ) - π / 2) < ε ? 0 : F / Math.pow(t(φ), n);
      return [ ρ * Math.sin(n * λ), F - ρ * Math.cos(n * λ) ];
    }
    forward.invert = function(x, y) {
      var ρ0_y = F - y, ρ = d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y);
      return [ Math.atan2(x, ρ0_y) / n, 2 * Math.atan(Math.pow(F / ρ, 1 / n)) - π / 2 ];
    };
    return forward;
  }
  (d3.geo.conicConformal = function() {
    return d3_geo_conic(d3_geo_conicConformal);
  }).raw = d3_geo_conicConformal;
  function d3_geo_conicEquidistant(φ0, φ1) {
    var cosφ0 = Math.cos(φ0), n = φ0 === φ1 ? Math.sin(φ0) : (cosφ0 - Math.cos(φ1)) / (φ1 - φ0), G = cosφ0 / n + φ0;
    if (Math.abs(n) < ε) return d3_geo_equirectangular;
    function forward(λ, φ) {
      var ρ = G - φ;
      return [ ρ * Math.sin(n * λ), G - ρ * Math.cos(n * λ) ];
    }
    forward.invert = function(x, y) {
      var ρ0_y = G - y;
      return [ Math.atan2(x, ρ0_y) / n, G - d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y) ];
    };
    return forward;
  }
  (d3.geo.conicEquidistant = function() {
    return d3_geo_conic(d3_geo_conicEquidistant);
  }).raw = d3_geo_conicEquidistant;
  var d3_geo_gnomonic = d3_geo_azimuthal(function(cosλcosφ) {
    return 1 / cosλcosφ;
  }, Math.atan);
  (d3.geo.gnomonic = function() {
    return d3_geo_projection(d3_geo_gnomonic);
  }).raw = d3_geo_gnomonic;
  function d3_geo_mercator(λ, φ) {
    return [ λ, Math.log(Math.tan(π / 4 + φ / 2)) ];
  }
  d3_geo_mercator.invert = function(x, y) {
    return [ x, 2 * Math.atan(Math.exp(y)) - π / 2 ];
  };
  function d3_geo_mercatorProjection(project) {
    var m = d3_geo_projection(project), scale = m.scale, translate = m.translate, clipExtent = m.clipExtent, clipAuto;
    m.scale = function() {
      var v = scale.apply(m, arguments);
      return v === m ? clipAuto ? m.clipExtent(null) : m : v;
    };
    m.translate = function() {
      var v = translate.apply(m, arguments);
      return v === m ? clipAuto ? m.clipExtent(null) : m : v;
    };
    m.clipExtent = function(_) {
      var v = clipExtent.apply(m, arguments);
      if (v === m) {
        if (clipAuto = _ == null) {
          var k = π * scale(), t = translate();
          clipExtent([ [ t[0] - k, t[1] - k ], [ t[0] + k, t[1] + k ] ]);
        }
      } else if (clipAuto) {
        v = null;
      }
      return v;
    };
    return m.clipExtent(null);
  }
  (d3.geo.mercator = function() {
    return d3_geo_mercatorProjection(d3_geo_mercator);
  }).raw = d3_geo_mercator;
  var d3_geo_orthographic = d3_geo_azimuthal(function() {
    return 1;
  }, Math.asin);
  (d3.geo.orthographic = function() {
    return d3_geo_projection(d3_geo_orthographic);
  }).raw = d3_geo_orthographic;
  var d3_geo_stereographic = d3_geo_azimuthal(function(cosλcosφ) {
    return 1 / (1 + cosλcosφ);
  }, function(ρ) {
    return 2 * Math.atan(ρ);
  });
  (d3.geo.stereographic = function() {
    return d3_geo_projection(d3_geo_stereographic);
  }).raw = d3_geo_stereographic;
  function d3_geo_transverseMercator(λ, φ) {
    var B = Math.cos(φ) * Math.sin(λ);
    return [ Math.log((1 + B) / (1 - B)) / 2, Math.atan2(Math.tan(φ), Math.cos(λ)) ];
  }
  d3_geo_transverseMercator.invert = function(x, y) {
    return [ Math.atan2(d3_sinh(x), Math.cos(y)), d3_asin(Math.sin(y) / d3_cosh(x)) ];
  };
  (d3.geo.transverseMercator = function() {
    return d3_geo_mercatorProjection(d3_geo_transverseMercator);
  }).raw = d3_geo_transverseMercator;
  d3.geom = {};
  d3.svg = {};
  function d3_svg_line(projection) {
    var x = d3_svg_lineX, y = d3_svg_lineY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, tension = .7;
    function line(data) {
      var segments = [], points = [], i = -1, n = data.length, d, fx = d3_functor(x), fy = d3_functor(y);
      function segment() {
        segments.push("M", interpolate(projection(points), tension));
      }
      while (++i < n) {
        if (defined.call(this, d = data[i], i)) {
          points.push([ +fx.call(this, d, i), +fy.call(this, d, i) ]);
        } else if (points.length) {
          segment();
          points = [];
        }
      }
      if (points.length) segment();
      return segments.length ? segments.join("") : null;
    }
    line.x = function(_) {
      if (!arguments.length) return x;
      x = _;
      return line;
    };
    line.y = function(_) {
      if (!arguments.length) return y;
      y = _;
      return line;
    };
    line.defined = function(_) {
      if (!arguments.length) return defined;
      defined = _;
      return line;
    };
    line.interpolate = function(_) {
      if (!arguments.length) return interpolateKey;
      if (typeof _ === "function") interpolateKey = interpolate = _; else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
      return line;
    };
    line.tension = function(_) {
      if (!arguments.length) return tension;
      tension = _;
      return line;
    };
    return line;
  }
  d3.svg.line = function() {
    return d3_svg_line(d3_identity);
  };
  function d3_svg_lineX(d) {
    return d[0];
  }
  function d3_svg_lineY(d) {
    return d[1];
  }
  var d3_svg_lineInterpolators = d3.map({
    linear: d3_svg_lineLinear,
    "linear-closed": d3_svg_lineLinearClosed,
    step: d3_svg_lineStep,
    "step-before": d3_svg_lineStepBefore,
    "step-after": d3_svg_lineStepAfter,
    basis: d3_svg_lineBasis,
    "basis-open": d3_svg_lineBasisOpen,
    "basis-closed": d3_svg_lineBasisClosed,
    bundle: d3_svg_lineBundle,
    cardinal: d3_svg_lineCardinal,
    "cardinal-open": d3_svg_lineCardinalOpen,
    "cardinal-closed": d3_svg_lineCardinalClosed,
    monotone: d3_svg_lineMonotone
  });
  d3_svg_lineInterpolators.forEach(function(key, value) {
    value.key = key;
    value.closed = /-closed$/.test(key);
  });
  function d3_svg_lineLinear(points) {
    return points.join("L");
  }
  function d3_svg_lineLinearClosed(points) {
    return d3_svg_lineLinear(points) + "Z";
  }
  function d3_svg_lineStep(points) {
    var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
    while (++i < n) path.push("H", (p[0] + (p = points[i])[0]) / 2, "V", p[1]);
    if (n > 1) path.push("H", p[0]);
    return path.join("");
  }
  function d3_svg_lineStepBefore(points) {
    var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
    while (++i < n) path.push("V", (p = points[i])[1], "H", p[0]);
    return path.join("");
  }
  function d3_svg_lineStepAfter(points) {
    var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
    while (++i < n) path.push("H", (p = points[i])[0], "V", p[1]);
    return path.join("");
  }
  function d3_svg_lineCardinalOpen(points, tension) {
    return points.length < 4 ? d3_svg_lineLinear(points) : points[1] + d3_svg_lineHermite(points.slice(1, points.length - 1), d3_svg_lineCardinalTangents(points, tension));
  }
  function d3_svg_lineCardinalClosed(points, tension) {
    return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite((points.push(points[0]), 
    points), d3_svg_lineCardinalTangents([ points[points.length - 2] ].concat(points, [ points[1] ]), tension));
  }
  function d3_svg_lineCardinal(points, tension) {
    return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineCardinalTangents(points, tension));
  }
  function d3_svg_lineHermite(points, tangents) {
    if (tangents.length < 1 || points.length != tangents.length && points.length != tangents.length + 2) {
      return d3_svg_lineLinear(points);
    }
    var quad = points.length != tangents.length, path = "", p0 = points[0], p = points[1], t0 = tangents[0], t = t0, pi = 1;
    if (quad) {
      path += "Q" + (p[0] - t0[0] * 2 / 3) + "," + (p[1] - t0[1] * 2 / 3) + "," + p[0] + "," + p[1];
      p0 = points[1];
      pi = 2;
    }
    if (tangents.length > 1) {
      t = tangents[1];
      p = points[pi];
      pi++;
      path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1]) + "," + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
      for (var i = 2; i < tangents.length; i++, pi++) {
        p = points[pi];
        t = tangents[i];
        path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
      }
    }
    if (quad) {
      var lp = points[pi];
      path += "Q" + (p[0] + t[0] * 2 / 3) + "," + (p[1] + t[1] * 2 / 3) + "," + lp[0] + "," + lp[1];
    }
    return path;
  }
  function d3_svg_lineCardinalTangents(points, tension) {
    var tangents = [], a = (1 - tension) / 2, p0, p1 = points[0], p2 = points[1], i = 1, n = points.length;
    while (++i < n) {
      p0 = p1;
      p1 = p2;
      p2 = points[i];
      tangents.push([ a * (p2[0] - p0[0]), a * (p2[1] - p0[1]) ]);
    }
    return tangents;
  }
  function d3_svg_lineBasis(points) {
    if (points.length < 3) return d3_svg_lineLinear(points);
    var i = 1, n = points.length, pi = points[0], x0 = pi[0], y0 = pi[1], px = [ x0, x0, x0, (pi = points[1])[0] ], py = [ y0, y0, y0, pi[1] ], path = [ x0, ",", y0, "L", d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py) ];
    points.push(points[n - 1]);
    while (++i <= n) {
      pi = points[i];
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }
    points.pop();
    path.push("L", pi);
    return path.join("");
  }
  function d3_svg_lineBasisOpen(points) {
    if (points.length < 4) return d3_svg_lineLinear(points);
    var path = [], i = -1, n = points.length, pi, px = [ 0 ], py = [ 0 ];
    while (++i < 3) {
      pi = points[i];
      px.push(pi[0]);
      py.push(pi[1]);
    }
    path.push(d3_svg_lineDot4(d3_svg_lineBasisBezier3, px) + "," + d3_svg_lineDot4(d3_svg_lineBasisBezier3, py));
    --i;
    while (++i < n) {
      pi = points[i];
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }
    return path.join("");
  }
  function d3_svg_lineBasisClosed(points) {
    var path, i = -1, n = points.length, m = n + 4, pi, px = [], py = [];
    while (++i < 4) {
      pi = points[i % n];
      px.push(pi[0]);
      py.push(pi[1]);
    }
    path = [ d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py) ];
    --i;
    while (++i < m) {
      pi = points[i % n];
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }
    return path.join("");
  }
  function d3_svg_lineBundle(points, tension) {
    var n = points.length - 1;
    if (n) {
      var x0 = points[0][0], y0 = points[0][1], dx = points[n][0] - x0, dy = points[n][1] - y0, i = -1, p, t;
      while (++i <= n) {
        p = points[i];
        t = i / n;
        p[0] = tension * p[0] + (1 - tension) * (x0 + t * dx);
        p[1] = tension * p[1] + (1 - tension) * (y0 + t * dy);
      }
    }
    return d3_svg_lineBasis(points);
  }
  function d3_svg_lineDot4(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  }
  var d3_svg_lineBasisBezier1 = [ 0, 2 / 3, 1 / 3, 0 ], d3_svg_lineBasisBezier2 = [ 0, 1 / 3, 2 / 3, 0 ], d3_svg_lineBasisBezier3 = [ 0, 1 / 6, 2 / 3, 1 / 6 ];
  function d3_svg_lineBasisBezier(path, x, y) {
    path.push("C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y));
  }
  function d3_svg_lineSlope(p0, p1) {
    return (p1[1] - p0[1]) / (p1[0] - p0[0]);
  }
  function d3_svg_lineFiniteDifferences(points) {
    var i = 0, j = points.length - 1, m = [], p0 = points[0], p1 = points[1], d = m[0] = d3_svg_lineSlope(p0, p1);
    while (++i < j) {
      m[i] = (d + (d = d3_svg_lineSlope(p0 = p1, p1 = points[i + 1]))) / 2;
    }
    m[i] = d;
    return m;
  }
  function d3_svg_lineMonotoneTangents(points) {
    var tangents = [], d, a, b, s, m = d3_svg_lineFiniteDifferences(points), i = -1, j = points.length - 1;
    while (++i < j) {
      d = d3_svg_lineSlope(points[i], points[i + 1]);
      if (Math.abs(d) < 1e-6) {
        m[i] = m[i + 1] = 0;
      } else {
        a = m[i] / d;
        b = m[i + 1] / d;
        s = a * a + b * b;
        if (s > 9) {
          s = d * 3 / Math.sqrt(s);
          m[i] = s * a;
          m[i + 1] = s * b;
        }
      }
    }
    i = -1;
    while (++i <= j) {
      s = (points[Math.min(j, i + 1)][0] - points[Math.max(0, i - 1)][0]) / (6 * (1 + m[i] * m[i]));
      tangents.push([ s || 0, m[i] * s || 0 ]);
    }
    return tangents;
  }
  function d3_svg_lineMonotone(points) {
    return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineMonotoneTangents(points));
  }
  d3.geom.hull = function(vertices) {
    var x = d3_svg_lineX, y = d3_svg_lineY;
    if (arguments.length) return hull(vertices);
    function hull(data) {
      if (data.length < 3) return [];
      var fx = d3_functor(x), fy = d3_functor(y), n = data.length, vertices, plen = n - 1, points = [], stack = [], d, i, j, h = 0, x1, y1, x2, y2, u, v, a, sp;
      if (fx === d3_svg_lineX && y === d3_svg_lineY) vertices = data; else for (i = 0, 
      vertices = []; i < n; ++i) {
        vertices.push([ +fx.call(this, d = data[i], i), +fy.call(this, d, i) ]);
      }
      for (i = 1; i < n; ++i) {
        if (vertices[i][1] < vertices[h][1] || vertices[i][1] == vertices[h][1] && vertices[i][0] < vertices[h][0]) h = i;
      }
      for (i = 0; i < n; ++i) {
        if (i === h) continue;
        y1 = vertices[i][1] - vertices[h][1];
        x1 = vertices[i][0] - vertices[h][0];
        points.push({
          angle: Math.atan2(y1, x1),
          index: i
        });
      }
      points.sort(function(a, b) {
        return a.angle - b.angle;
      });
      a = points[0].angle;
      v = points[0].index;
      u = 0;
      for (i = 1; i < plen; ++i) {
        j = points[i].index;
        if (a == points[i].angle) {
          x1 = vertices[v][0] - vertices[h][0];
          y1 = vertices[v][1] - vertices[h][1];
          x2 = vertices[j][0] - vertices[h][0];
          y2 = vertices[j][1] - vertices[h][1];
          if (x1 * x1 + y1 * y1 >= x2 * x2 + y2 * y2) {
            points[i].index = -1;
            continue;
          } else {
            points[u].index = -1;
          }
        }
        a = points[i].angle;
        u = i;
        v = j;
      }
      stack.push(h);
      for (i = 0, j = 0; i < 2; ++j) {
        if (points[j].index > -1) {
          stack.push(points[j].index);
          i++;
        }
      }
      sp = stack.length;
      for (;j < plen; ++j) {
        if (points[j].index < 0) continue;
        while (!d3_geom_hullCCW(stack[sp - 2], stack[sp - 1], points[j].index, vertices)) {
          --sp;
        }
        stack[sp++] = points[j].index;
      }
      var poly = [];
      for (i = sp - 1; i >= 0; --i) poly.push(data[stack[i]]);
      return poly;
    }
    hull.x = function(_) {
      return arguments.length ? (x = _, hull) : x;
    };
    hull.y = function(_) {
      return arguments.length ? (y = _, hull) : y;
    };
    return hull;
  };
  function d3_geom_hullCCW(i1, i2, i3, v) {
    var t, a, b, c, d, e, f;
    t = v[i1];
    a = t[0];
    b = t[1];
    t = v[i2];
    c = t[0];
    d = t[1];
    t = v[i3];
    e = t[0];
    f = t[1];
    return (f - b) * (c - a) - (d - b) * (e - a) > 0;
  }
  d3.geom.polygon = function(coordinates) {
    d3_subclass(coordinates, d3_geom_polygonPrototype);
    return coordinates;
  };
  var d3_geom_polygonPrototype = d3.geom.polygon.prototype = [];
  d3_geom_polygonPrototype.area = function() {
    var i = -1, n = this.length, a, b = this[n - 1], area = 0;
    while (++i < n) {
      a = b;
      b = this[i];
      area += a[1] * b[0] - a[0] * b[1];
    }
    return area * .5;
  };
  d3_geom_polygonPrototype.centroid = function(k) {
    var i = -1, n = this.length, x = 0, y = 0, a, b = this[n - 1], c;
    if (!arguments.length) k = -1 / (6 * this.area());
    while (++i < n) {
      a = b;
      b = this[i];
      c = a[0] * b[1] - b[0] * a[1];
      x += (a[0] + b[0]) * c;
      y += (a[1] + b[1]) * c;
    }
    return [ x * k, y * k ];
  };
  d3_geom_polygonPrototype.clip = function(subject) {
    var input, closed = d3_geom_polygonClosed(subject), i = -1, n = this.length - d3_geom_polygonClosed(this), j, m, a = this[n - 1], b, c, d;
    while (++i < n) {
      input = subject.slice();
      subject.length = 0;
      b = this[i];
      c = input[(m = input.length - closed) - 1];
      j = -1;
      while (++j < m) {
        d = input[j];
        if (d3_geom_polygonInside(d, a, b)) {
          if (!d3_geom_polygonInside(c, a, b)) {
            subject.push(d3_geom_polygonIntersect(c, d, a, b));
          }
          subject.push(d);
        } else if (d3_geom_polygonInside(c, a, b)) {
          subject.push(d3_geom_polygonIntersect(c, d, a, b));
        }
        c = d;
      }
      if (closed) subject.push(subject[0]);
      a = b;
    }
    return subject;
  };
  function d3_geom_polygonInside(p, a, b) {
    return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0]);
  }
  function d3_geom_polygonIntersect(c, d, a, b) {
    var x1 = c[0], x3 = a[0], x21 = d[0] - x1, x43 = b[0] - x3, y1 = c[1], y3 = a[1], y21 = d[1] - y1, y43 = b[1] - y3, ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
    return [ x1 + ua * x21, y1 + ua * y21 ];
  }
  function d3_geom_polygonClosed(coordinates) {
    var a = coordinates[0], b = coordinates[coordinates.length - 1];
    return !(a[0] - b[0] || a[1] - b[1]);
  }
  d3.geom.delaunay = function(vertices) {
    var edges = vertices.map(function() {
      return [];
    }), triangles = [];
    d3_geom_voronoiTessellate(vertices, function(e) {
      edges[e.region.l.index].push(vertices[e.region.r.index]);
    });
    edges.forEach(function(edge, i) {
      var v = vertices[i], cx = v[0], cy = v[1];
      edge.forEach(function(v) {
        v.angle = Math.atan2(v[0] - cx, v[1] - cy);
      });
      edge.sort(function(a, b) {
        return a.angle - b.angle;
      });
      for (var j = 0, m = edge.length - 1; j < m; j++) {
        triangles.push([ v, edge[j], edge[j + 1] ]);
      }
    });
    return triangles;
  };
  d3.geom.voronoi = function(points) {
    var x = d3_svg_lineX, y = d3_svg_lineY, clipPolygon = null;
    if (arguments.length) return voronoi(points);
    function voronoi(data) {
      var points, polygons = data.map(function() {
        return [];
      }), fx = d3_functor(x), fy = d3_functor(y), d, i, n = data.length, Z = 1e6;
      if (fx === d3_svg_lineX && fy === d3_svg_lineY) points = data; else for (points = new Array(n), 
      i = 0; i < n; ++i) {
        points[i] = [ +fx.call(this, d = data[i], i), +fy.call(this, d, i) ];
      }
      d3_geom_voronoiTessellate(points, function(e) {
        var s1, s2, x1, x2, y1, y2;
        if (e.a === 1 && e.b >= 0) {
          s1 = e.ep.r;
          s2 = e.ep.l;
        } else {
          s1 = e.ep.l;
          s2 = e.ep.r;
        }
        if (e.a === 1) {
          y1 = s1 ? s1.y : -Z;
          x1 = e.c - e.b * y1;
          y2 = s2 ? s2.y : Z;
          x2 = e.c - e.b * y2;
        } else {
          x1 = s1 ? s1.x : -Z;
          y1 = e.c - e.a * x1;
          x2 = s2 ? s2.x : Z;
          y2 = e.c - e.a * x2;
        }
        var v1 = [ x1, y1 ], v2 = [ x2, y2 ];
        polygons[e.region.l.index].push(v1, v2);
        polygons[e.region.r.index].push(v1, v2);
      });
      polygons = polygons.map(function(polygon, i) {
        var cx = points[i][0], cy = points[i][1], angle = polygon.map(function(v) {
          return Math.atan2(v[0] - cx, v[1] - cy);
        }), order = d3.range(polygon.length).sort(function(a, b) {
          return angle[a] - angle[b];
        });
        return order.filter(function(d, i) {
          return !i || angle[d] - angle[order[i - 1]] > ε;
        }).map(function(d) {
          return polygon[d];
        });
      });
      polygons.forEach(function(polygon, i) {
        var n = polygon.length;
        if (!n) return polygon.push([ -Z, -Z ], [ -Z, Z ], [ Z, Z ], [ Z, -Z ]);
        if (n > 2) return;
        var p0 = points[i], p1 = polygon[0], p2 = polygon[1], x0 = p0[0], y0 = p0[1], x1 = p1[0], y1 = p1[1], x2 = p2[0], y2 = p2[1], dx = Math.abs(x2 - x1), dy = y2 - y1;
        if (Math.abs(dy) < ε) {
          var y = y0 < y1 ? -Z : Z;
          polygon.push([ -Z, y ], [ Z, y ]);
        } else if (dx < ε) {
          var x = x0 < x1 ? -Z : Z;
          polygon.push([ x, -Z ], [ x, Z ]);
        } else {
          var y = (x2 - x1) * (y1 - y0) < (x1 - x0) * (y2 - y1) ? Z : -Z, z = Math.abs(dy) - dx;
          if (Math.abs(z) < ε) {
            polygon.push([ dy < 0 ? y : -y, y ]);
          } else {
            if (z > 0) y *= -1;
            polygon.push([ -Z, y ], [ Z, y ]);
          }
        }
      });
      if (clipPolygon) for (i = 0; i < n; ++i) clipPolygon.clip(polygons[i]);
      for (i = 0; i < n; ++i) polygons[i].point = data[i];
      return polygons;
    }
    voronoi.x = function(_) {
      return arguments.length ? (x = _, voronoi) : x;
    };
    voronoi.y = function(_) {
      return arguments.length ? (y = _, voronoi) : y;
    };
    voronoi.clipExtent = function(_) {
      if (!arguments.length) return clipPolygon && [ clipPolygon[0], clipPolygon[2] ];
      if (_ == null) clipPolygon = null; else {
        var x1 = +_[0][0], y1 = +_[0][1], x2 = +_[1][0], y2 = +_[1][1];
        clipPolygon = d3.geom.polygon([ [ x1, y1 ], [ x1, y2 ], [ x2, y2 ], [ x2, y1 ] ]);
      }
      return voronoi;
    };
    voronoi.size = function(_) {
      if (!arguments.length) return clipPolygon && clipPolygon[2];
      return voronoi.clipExtent(_ && [ [ 0, 0 ], _ ]);
    };
    voronoi.links = function(data) {
      var points, graph = data.map(function() {
        return [];
      }), links = [], fx = d3_functor(x), fy = d3_functor(y), d, i, n = data.length;
      if (fx === d3_svg_lineX && fy === d3_svg_lineY) points = data; else for (points = new Array(n), 
      i = 0; i < n; ++i) {
        points[i] = [ +fx.call(this, d = data[i], i), +fy.call(this, d, i) ];
      }
      d3_geom_voronoiTessellate(points, function(e) {
        var l = e.region.l.index, r = e.region.r.index;
        if (graph[l][r]) return;
        graph[l][r] = graph[r][l] = true;
        links.push({
          source: data[l],
          target: data[r]
        });
      });
      return links;
    };
    voronoi.triangles = function(data) {
      if (x === d3_svg_lineX && y === d3_svg_lineY) return d3.geom.delaunay(data);
      var points = new Array(n), fx = d3_functor(x), fy = d3_functor(y), d, i = -1, n = data.length;
      while (++i < n) {
        (points[i] = [ +fx.call(this, d = data[i], i), +fy.call(this, d, i) ]).data = d;
      }
      return d3.geom.delaunay(points).map(function(triangle) {
        return triangle.map(function(point) {
          return point.data;
        });
      });
    };
    return voronoi;
  };
  var d3_geom_voronoiOpposite = {
    l: "r",
    r: "l"
  };
  function d3_geom_voronoiTessellate(points, callback) {
    var Sites = {
      list: points.map(function(v, i) {
        return {
          index: i,
          x: v[0],
          y: v[1]
        };
      }).sort(function(a, b) {
        return a.y < b.y ? -1 : a.y > b.y ? 1 : a.x < b.x ? -1 : a.x > b.x ? 1 : 0;
      }),
      bottomSite: null
    };
    var EdgeList = {
      list: [],
      leftEnd: null,
      rightEnd: null,
      init: function() {
        EdgeList.leftEnd = EdgeList.createHalfEdge(null, "l");
        EdgeList.rightEnd = EdgeList.createHalfEdge(null, "l");
        EdgeList.leftEnd.r = EdgeList.rightEnd;
        EdgeList.rightEnd.l = EdgeList.leftEnd;
        EdgeList.list.unshift(EdgeList.leftEnd, EdgeList.rightEnd);
      },
      createHalfEdge: function(edge, side) {
        return {
          edge: edge,
          side: side,
          vertex: null,
          l: null,
          r: null
        };
      },
      insert: function(lb, he) {
        he.l = lb;
        he.r = lb.r;
        lb.r.l = he;
        lb.r = he;
      },
      leftBound: function(p) {
        var he = EdgeList.leftEnd;
        do {
          he = he.r;
        } while (he != EdgeList.rightEnd && Geom.rightOf(he, p));
        he = he.l;
        return he;
      },
      del: function(he) {
        he.l.r = he.r;
        he.r.l = he.l;
        he.edge = null;
      },
      right: function(he) {
        return he.r;
      },
      left: function(he) {
        return he.l;
      },
      leftRegion: function(he) {
        return he.edge == null ? Sites.bottomSite : he.edge.region[he.side];
      },
      rightRegion: function(he) {
        return he.edge == null ? Sites.bottomSite : he.edge.region[d3_geom_voronoiOpposite[he.side]];
      }
    };
    var Geom = {
      bisect: function(s1, s2) {
        var newEdge = {
          region: {
            l: s1,
            r: s2
          },
          ep: {
            l: null,
            r: null
          }
        };
        var dx = s2.x - s1.x, dy = s2.y - s1.y, adx = dx > 0 ? dx : -dx, ady = dy > 0 ? dy : -dy;
        newEdge.c = s1.x * dx + s1.y * dy + (dx * dx + dy * dy) * .5;
        if (adx > ady) {
          newEdge.a = 1;
          newEdge.b = dy / dx;
          newEdge.c /= dx;
        } else {
          newEdge.b = 1;
          newEdge.a = dx / dy;
          newEdge.c /= dy;
        }
        return newEdge;
      },
      intersect: function(el1, el2) {
        var e1 = el1.edge, e2 = el2.edge;
        if (!e1 || !e2 || e1.region.r == e2.region.r) {
          return null;
        }
        var d = e1.a * e2.b - e1.b * e2.a;
        if (Math.abs(d) < 1e-10) {
          return null;
        }
        var xint = (e1.c * e2.b - e2.c * e1.b) / d, yint = (e2.c * e1.a - e1.c * e2.a) / d, e1r = e1.region.r, e2r = e2.region.r, el, e;
        if (e1r.y < e2r.y || e1r.y == e2r.y && e1r.x < e2r.x) {
          el = el1;
          e = e1;
        } else {
          el = el2;
          e = e2;
        }
        var rightOfSite = xint >= e.region.r.x;
        if (rightOfSite && el.side === "l" || !rightOfSite && el.side === "r") {
          return null;
        }
        return {
          x: xint,
          y: yint
        };
      },
      rightOf: function(he, p) {
        var e = he.edge, topsite = e.region.r, rightOfSite = p.x > topsite.x;
        if (rightOfSite && he.side === "l") {
          return 1;
        }
        if (!rightOfSite && he.side === "r") {
          return 0;
        }
        if (e.a === 1) {
          var dyp = p.y - topsite.y, dxp = p.x - topsite.x, fast = 0, above = 0;
          if (!rightOfSite && e.b < 0 || rightOfSite && e.b >= 0) {
            above = fast = dyp >= e.b * dxp;
          } else {
            above = p.x + p.y * e.b > e.c;
            if (e.b < 0) {
              above = !above;
            }
            if (!above) {
              fast = 1;
            }
          }
          if (!fast) {
            var dxs = topsite.x - e.region.l.x;
            above = e.b * (dxp * dxp - dyp * dyp) < dxs * dyp * (1 + 2 * dxp / dxs + e.b * e.b);
            if (e.b < 0) {
              above = !above;
            }
          }
        } else {
          var yl = e.c - e.a * p.x, t1 = p.y - yl, t2 = p.x - topsite.x, t3 = yl - topsite.y;
          above = t1 * t1 > t2 * t2 + t3 * t3;
        }
        return he.side === "l" ? above : !above;
      },
      endPoint: function(edge, side, site) {
        edge.ep[side] = site;
        if (!edge.ep[d3_geom_voronoiOpposite[side]]) return;
        callback(edge);
      },
      distance: function(s, t) {
        var dx = s.x - t.x, dy = s.y - t.y;
        return Math.sqrt(dx * dx + dy * dy);
      }
    };
    var EventQueue = {
      list: [],
      insert: function(he, site, offset) {
        he.vertex = site;
        he.ystar = site.y + offset;
        for (var i = 0, list = EventQueue.list, l = list.length; i < l; i++) {
          var next = list[i];
          if (he.ystar > next.ystar || he.ystar == next.ystar && site.x > next.vertex.x) {
            continue;
          } else {
            break;
          }
        }
        list.splice(i, 0, he);
      },
      del: function(he) {
        for (var i = 0, ls = EventQueue.list, l = ls.length; i < l && ls[i] != he; ++i) {}
        ls.splice(i, 1);
      },
      empty: function() {
        return EventQueue.list.length === 0;
      },
      nextEvent: function(he) {
        for (var i = 0, ls = EventQueue.list, l = ls.length; i < l; ++i) {
          if (ls[i] == he) return ls[i + 1];
        }
        return null;
      },
      min: function() {
        var elem = EventQueue.list[0];
        return {
          x: elem.vertex.x,
          y: elem.ystar
        };
      },
      extractMin: function() {
        return EventQueue.list.shift();
      }
    };
    EdgeList.init();
    Sites.bottomSite = Sites.list.shift();
    var newSite = Sites.list.shift(), newIntStar;
    var lbnd, rbnd, llbnd, rrbnd, bisector;
    var bot, top, temp, p, v;
    var e, pm;
    while (true) {
      if (!EventQueue.empty()) {
        newIntStar = EventQueue.min();
      }
      if (newSite && (EventQueue.empty() || newSite.y < newIntStar.y || newSite.y == newIntStar.y && newSite.x < newIntStar.x)) {
        lbnd = EdgeList.leftBound(newSite);
        rbnd = EdgeList.right(lbnd);
        bot = EdgeList.rightRegion(lbnd);
        e = Geom.bisect(bot, newSite);
        bisector = EdgeList.createHalfEdge(e, "l");
        EdgeList.insert(lbnd, bisector);
        p = Geom.intersect(lbnd, bisector);
        if (p) {
          EventQueue.del(lbnd);
          EventQueue.insert(lbnd, p, Geom.distance(p, newSite));
        }
        lbnd = bisector;
        bisector = EdgeList.createHalfEdge(e, "r");
        EdgeList.insert(lbnd, bisector);
        p = Geom.intersect(bisector, rbnd);
        if (p) {
          EventQueue.insert(bisector, p, Geom.distance(p, newSite));
        }
        newSite = Sites.list.shift();
      } else if (!EventQueue.empty()) {
        lbnd = EventQueue.extractMin();
        llbnd = EdgeList.left(lbnd);
        rbnd = EdgeList.right(lbnd);
        rrbnd = EdgeList.right(rbnd);
        bot = EdgeList.leftRegion(lbnd);
        top = EdgeList.rightRegion(rbnd);
        v = lbnd.vertex;
        Geom.endPoint(lbnd.edge, lbnd.side, v);
        Geom.endPoint(rbnd.edge, rbnd.side, v);
        EdgeList.del(lbnd);
        EventQueue.del(rbnd);
        EdgeList.del(rbnd);
        pm = "l";
        if (bot.y > top.y) {
          temp = bot;
          bot = top;
          top = temp;
          pm = "r";
        }
        e = Geom.bisect(bot, top);
        bisector = EdgeList.createHalfEdge(e, pm);
        EdgeList.insert(llbnd, bisector);
        Geom.endPoint(e, d3_geom_voronoiOpposite[pm], v);
        p = Geom.intersect(llbnd, bisector);
        if (p) {
          EventQueue.del(llbnd);
          EventQueue.insert(llbnd, p, Geom.distance(p, bot));
        }
        p = Geom.intersect(bisector, rrbnd);
        if (p) {
          EventQueue.insert(bisector, p, Geom.distance(p, bot));
        }
      } else {
        break;
      }
    }
    for (lbnd = EdgeList.right(EdgeList.leftEnd); lbnd != EdgeList.rightEnd; lbnd = EdgeList.right(lbnd)) {
      callback(lbnd.edge);
    }
  }
  d3.geom.quadtree = function(points, x1, y1, x2, y2) {
    var x = d3_svg_lineX, y = d3_svg_lineY, compat;
    if (compat = arguments.length) {
      x = d3_geom_quadtreeCompatX;
      y = d3_geom_quadtreeCompatY;
      if (compat === 3) {
        y2 = y1;
        x2 = x1;
        y1 = x1 = 0;
      }
      return quadtree(points);
    }
    function quadtree(data) {
      var d, fx = d3_functor(x), fy = d3_functor(y), xs, ys, i, n, x1_, y1_, x2_, y2_;
      if (x1 != null) {
        x1_ = x1, y1_ = y1, x2_ = x2, y2_ = y2;
      } else {
        x2_ = y2_ = -(x1_ = y1_ = Infinity);
        xs = [], ys = [];
        n = data.length;
        if (compat) for (i = 0; i < n; ++i) {
          d = data[i];
          if (d.x < x1_) x1_ = d.x;
          if (d.y < y1_) y1_ = d.y;
          if (d.x > x2_) x2_ = d.x;
          if (d.y > y2_) y2_ = d.y;
          xs.push(d.x);
          ys.push(d.y);
        } else for (i = 0; i < n; ++i) {
          var x_ = +fx(d = data[i], i), y_ = +fy(d, i);
          if (x_ < x1_) x1_ = x_;
          if (y_ < y1_) y1_ = y_;
          if (x_ > x2_) x2_ = x_;
          if (y_ > y2_) y2_ = y_;
          xs.push(x_);
          ys.push(y_);
        }
      }
      var dx = x2_ - x1_, dy = y2_ - y1_;
      if (dx > dy) y2_ = y1_ + dx; else x2_ = x1_ + dy;
      function insert(n, d, x, y, x1, y1, x2, y2) {
        if (isNaN(x) || isNaN(y)) return;
        if (n.leaf) {
          var nx = n.x, ny = n.y;
          if (nx != null) {
            if (Math.abs(nx - x) + Math.abs(ny - y) < .01) {
              insertChild(n, d, x, y, x1, y1, x2, y2);
            } else {
              var nPoint = n.point;
              n.x = n.y = n.point = null;
              insertChild(n, nPoint, nx, ny, x1, y1, x2, y2);
              insertChild(n, d, x, y, x1, y1, x2, y2);
            }
          } else {
            n.x = x, n.y = y, n.point = d;
          }
        } else {
          insertChild(n, d, x, y, x1, y1, x2, y2);
        }
      }
      function insertChild(n, d, x, y, x1, y1, x2, y2) {
        var sx = (x1 + x2) * .5, sy = (y1 + y2) * .5, right = x >= sx, bottom = y >= sy, i = (bottom << 1) + right;
        n.leaf = false;
        n = n.nodes[i] || (n.nodes[i] = d3_geom_quadtreeNode());
        if (right) x1 = sx; else x2 = sx;
        if (bottom) y1 = sy; else y2 = sy;
        insert(n, d, x, y, x1, y1, x2, y2);
      }
      var root = d3_geom_quadtreeNode();
      root.add = function(d) {
        insert(root, d, +fx(d, ++i), +fy(d, i), x1_, y1_, x2_, y2_);
      };
      root.visit = function(f) {
        d3_geom_quadtreeVisit(f, root, x1_, y1_, x2_, y2_);
      };
      i = -1;
      if (x1 == null) {
        while (++i < n) {
          insert(root, data[i], xs[i], ys[i], x1_, y1_, x2_, y2_);
        }
        --i;
      } else data.forEach(root.add);
      xs = ys = data = d = null;
      return root;
    }
    quadtree.x = function(_) {
      return arguments.length ? (x = _, quadtree) : x;
    };
    quadtree.y = function(_) {
      return arguments.length ? (y = _, quadtree) : y;
    };
    quadtree.extent = function(_) {
      if (!arguments.length) return x1 == null ? null : [ [ x1, y1 ], [ x2, y2 ] ];
      if (_ == null) x1 = y1 = x2 = y2 = null; else x1 = +_[0][0], y1 = +_[0][1], x2 = +_[1][0], 
      y2 = +_[1][1];
      return quadtree;
    };
    quadtree.size = function(_) {
      if (!arguments.length) return x1 == null ? null : [ x2 - x1, y2 - y1 ];
      if (_ == null) x1 = y1 = x2 = y2 = null; else x1 = y1 = 0, x2 = +_[0], y2 = +_[1];
      return quadtree;
    };
    return quadtree;
  };
  function d3_geom_quadtreeCompatX(d) {
    return d.x;
  }
  function d3_geom_quadtreeCompatY(d) {
    return d.y;
  }
  function d3_geom_quadtreeNode() {
    return {
      leaf: true,
      nodes: [],
      point: null,
      x: null,
      y: null
    };
  }
  function d3_geom_quadtreeVisit(f, node, x1, y1, x2, y2) {
    if (!f(node, x1, y1, x2, y2)) {
      var sx = (x1 + x2) * .5, sy = (y1 + y2) * .5, children = node.nodes;
      if (children[0]) d3_geom_quadtreeVisit(f, children[0], x1, y1, sx, sy);
      if (children[1]) d3_geom_quadtreeVisit(f, children[1], sx, y1, x2, sy);
      if (children[2]) d3_geom_quadtreeVisit(f, children[2], x1, sy, sx, y2);
      if (children[3]) d3_geom_quadtreeVisit(f, children[3], sx, sy, x2, y2);
    }
  }
  d3.interpolateRgb = d3_interpolateRgb;
  function d3_interpolateRgb(a, b) {
    a = d3.rgb(a);
    b = d3.rgb(b);
    var ar = a.r, ag = a.g, ab = a.b, br = b.r - ar, bg = b.g - ag, bb = b.b - ab;
    return function(t) {
      return "#" + d3_rgb_hex(Math.round(ar + br * t)) + d3_rgb_hex(Math.round(ag + bg * t)) + d3_rgb_hex(Math.round(ab + bb * t));
    };
  }
  d3.interpolateObject = d3_interpolateObject;
  function d3_interpolateObject(a, b) {
    var i = {}, c = {}, k;
    for (k in a) {
      if (k in b) {
        i[k] = d3_interpolate(a[k], b[k]);
      } else {
        c[k] = a[k];
      }
    }
    for (k in b) {
      if (!(k in a)) {
        c[k] = b[k];
      }
    }
    return function(t) {
      for (k in i) c[k] = i[k](t);
      return c;
    };
  }
  d3.interpolateNumber = d3_interpolateNumber;
  function d3_interpolateNumber(a, b) {
    b -= a = +a;
    return function(t) {
      return a + b * t;
    };
  }
  d3.interpolateString = d3_interpolateString;
  function d3_interpolateString(a, b) {
    var m, i, j, s0 = 0, s1 = 0, s = [], q = [], n, o;
    a = a + "", b = b + "";
    d3_interpolate_number.lastIndex = 0;
    for (i = 0; m = d3_interpolate_number.exec(b); ++i) {
      if (m.index) s.push(b.substring(s0, s1 = m.index));
      q.push({
        i: s.length,
        x: m[0]
      });
      s.push(null);
      s0 = d3_interpolate_number.lastIndex;
    }
    if (s0 < b.length) s.push(b.substring(s0));
    for (i = 0, n = q.length; (m = d3_interpolate_number.exec(a)) && i < n; ++i) {
      o = q[i];
      if (o.x == m[0]) {
        if (o.i) {
          if (s[o.i + 1] == null) {
            s[o.i - 1] += o.x;
            s.splice(o.i, 1);
            for (j = i + 1; j < n; ++j) q[j].i--;
          } else {
            s[o.i - 1] += o.x + s[o.i + 1];
            s.splice(o.i, 2);
            for (j = i + 1; j < n; ++j) q[j].i -= 2;
          }
        } else {
          if (s[o.i + 1] == null) {
            s[o.i] = o.x;
          } else {
            s[o.i] = o.x + s[o.i + 1];
            s.splice(o.i + 1, 1);
            for (j = i + 1; j < n; ++j) q[j].i--;
          }
        }
        q.splice(i, 1);
        n--;
        i--;
      } else {
        o.x = d3_interpolateNumber(parseFloat(m[0]), parseFloat(o.x));
      }
    }
    while (i < n) {
      o = q.pop();
      if (s[o.i + 1] == null) {
        s[o.i] = o.x;
      } else {
        s[o.i] = o.x + s[o.i + 1];
        s.splice(o.i + 1, 1);
      }
      n--;
    }
    if (s.length === 1) {
      return s[0] == null ? (o = q[0].x, function(t) {
        return o(t) + "";
      }) : function() {
        return b;
      };
    }
    return function(t) {
      for (i = 0; i < n; ++i) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  }
  var d3_interpolate_number = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
  d3.interpolate = d3_interpolate;
  function d3_interpolate(a, b) {
    var i = d3.interpolators.length, f;
    while (--i >= 0 && !(f = d3.interpolators[i](a, b))) ;
    return f;
  }
  d3.interpolators = [ function(a, b) {
    var t = typeof b;
    return (t === "string" ? d3_rgb_names.has(b) || /^(#|rgb\(|hsl\()/.test(b) ? d3_interpolateRgb : d3_interpolateString : b instanceof d3_Color ? d3_interpolateRgb : t === "object" ? Array.isArray(b) ? d3_interpolateArray : d3_interpolateObject : d3_interpolateNumber)(a, b);
  } ];
  d3.interpolateArray = d3_interpolateArray;
  function d3_interpolateArray(a, b) {
    var x = [], c = [], na = a.length, nb = b.length, n0 = Math.min(a.length, b.length), i;
    for (i = 0; i < n0; ++i) x.push(d3_interpolate(a[i], b[i]));
    for (;i < na; ++i) c[i] = a[i];
    for (;i < nb; ++i) c[i] = b[i];
    return function(t) {
      for (i = 0; i < n0; ++i) c[i] = x[i](t);
      return c;
    };
  }
  var d3_ease_default = function() {
    return d3_identity;
  };
  var d3_ease = d3.map({
    linear: d3_ease_default,
    poly: d3_ease_poly,
    quad: function() {
      return d3_ease_quad;
    },
    cubic: function() {
      return d3_ease_cubic;
    },
    sin: function() {
      return d3_ease_sin;
    },
    exp: function() {
      return d3_ease_exp;
    },
    circle: function() {
      return d3_ease_circle;
    },
    elastic: d3_ease_elastic,
    back: d3_ease_back,
    bounce: function() {
      return d3_ease_bounce;
    }
  });
  var d3_ease_mode = d3.map({
    "in": d3_identity,
    out: d3_ease_reverse,
    "in-out": d3_ease_reflect,
    "out-in": function(f) {
      return d3_ease_reflect(d3_ease_reverse(f));
    }
  });
  d3.ease = function(name) {
    var i = name.indexOf("-"), t = i >= 0 ? name.substring(0, i) : name, m = i >= 0 ? name.substring(i + 1) : "in";
    t = d3_ease.get(t) || d3_ease_default;
    m = d3_ease_mode.get(m) || d3_identity;
    return d3_ease_clamp(m(t.apply(null, Array.prototype.slice.call(arguments, 1))));
  };
  function d3_ease_clamp(f) {
    return function(t) {
      return t <= 0 ? 0 : t >= 1 ? 1 : f(t);
    };
  }
  function d3_ease_reverse(f) {
    return function(t) {
      return 1 - f(1 - t);
    };
  }
  function d3_ease_reflect(f) {
    return function(t) {
      return .5 * (t < .5 ? f(2 * t) : 2 - f(2 - 2 * t));
    };
  }
  function d3_ease_quad(t) {
    return t * t;
  }
  function d3_ease_cubic(t) {
    return t * t * t;
  }
  function d3_ease_cubicInOut(t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    var t2 = t * t, t3 = t2 * t;
    return 4 * (t < .5 ? t3 : 3 * (t - t2) + t3 - .75);
  }
  function d3_ease_poly(e) {
    return function(t) {
      return Math.pow(t, e);
    };
  }
  function d3_ease_sin(t) {
    return 1 - Math.cos(t * π / 2);
  }
  function d3_ease_exp(t) {
    return Math.pow(2, 10 * (t - 1));
  }
  function d3_ease_circle(t) {
    return 1 - Math.sqrt(1 - t * t);
  }
  function d3_ease_elastic(a, p) {
    var s;
    if (arguments.length < 2) p = .45;
    if (arguments.length) s = p / (2 * π) * Math.asin(1 / a); else a = 1, s = p / 4;
    return function(t) {
      return 1 + a * Math.pow(2, 10 * -t) * Math.sin((t - s) * 2 * π / p);
    };
  }
  function d3_ease_back(s) {
    if (!s) s = 1.70158;
    return function(t) {
      return t * t * ((s + 1) * t - s);
    };
  }
  function d3_ease_bounce(t) {
    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
  }
  d3.interpolateHcl = d3_interpolateHcl;
  function d3_interpolateHcl(a, b) {
    a = d3.hcl(a);
    b = d3.hcl(b);
    var ah = a.h, ac = a.c, al = a.l, bh = b.h - ah, bc = b.c - ac, bl = b.l - al;
    if (isNaN(bc)) bc = 0, ac = isNaN(ac) ? b.c : ac;
    if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah; else if (bh > 180) bh -= 360; else if (bh < -180) bh += 360;
    return function(t) {
      return d3_hcl_lab(ah + bh * t, ac + bc * t, al + bl * t) + "";
    };
  }
  d3.interpolateHsl = d3_interpolateHsl;
  function d3_interpolateHsl(a, b) {
    a = d3.hsl(a);
    b = d3.hsl(b);
    var ah = a.h, as = a.s, al = a.l, bh = b.h - ah, bs = b.s - as, bl = b.l - al;
    if (isNaN(bs)) bs = 0, as = isNaN(as) ? b.s : as;
    if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah; else if (bh > 180) bh -= 360; else if (bh < -180) bh += 360;
    return function(t) {
      return d3_hsl_rgb(ah + bh * t, as + bs * t, al + bl * t) + "";
    };
  }
  d3.interpolateLab = d3_interpolateLab;
  function d3_interpolateLab(a, b) {
    a = d3.lab(a);
    b = d3.lab(b);
    var al = a.l, aa = a.a, ab = a.b, bl = b.l - al, ba = b.a - aa, bb = b.b - ab;
    return function(t) {
      return d3_lab_rgb(al + bl * t, aa + ba * t, ab + bb * t) + "";
    };
  }
  d3.interpolateRound = d3_interpolateRound;
  function d3_interpolateRound(a, b) {
    b -= a;
    return function(t) {
      return Math.round(a + b * t);
    };
  }
  d3.transform = function(string) {
    var g = d3_document.createElementNS(d3.ns.prefix.svg, "g");
    return (d3.transform = function(string) {
      if (string != null) {
        g.setAttribute("transform", string);
        var t = g.transform.baseVal.consolidate();
      }
      return new d3_transform(t ? t.matrix : d3_transformIdentity);
    })(string);
  };
  function d3_transform(m) {
    var r0 = [ m.a, m.b ], r1 = [ m.c, m.d ], kx = d3_transformNormalize(r0), kz = d3_transformDot(r0, r1), ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
    if (r0[0] * r1[1] < r1[0] * r0[1]) {
      r0[0] *= -1;
      r0[1] *= -1;
      kx *= -1;
      kz *= -1;
    }
    this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_degrees;
    this.translate = [ m.e, m.f ];
    this.scale = [ kx, ky ];
    this.skew = ky ? Math.atan2(kz, ky) * d3_degrees : 0;
  }
  d3_transform.prototype.toString = function() {
    return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")";
  };
  function d3_transformDot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  }
  function d3_transformNormalize(a) {
    var k = Math.sqrt(d3_transformDot(a, a));
    if (k) {
      a[0] /= k;
      a[1] /= k;
    }
    return k;
  }
  function d3_transformCombine(a, b, k) {
    a[0] += k * b[0];
    a[1] += k * b[1];
    return a;
  }
  var d3_transformIdentity = {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0
  };
  d3.interpolateTransform = d3_interpolateTransform;
  function d3_interpolateTransform(a, b) {
    var s = [], q = [], n, A = d3.transform(a), B = d3.transform(b), ta = A.translate, tb = B.translate, ra = A.rotate, rb = B.rotate, wa = A.skew, wb = B.skew, ka = A.scale, kb = B.scale;
    if (ta[0] != tb[0] || ta[1] != tb[1]) {
      s.push("translate(", null, ",", null, ")");
      q.push({
        i: 1,
        x: d3_interpolateNumber(ta[0], tb[0])
      }, {
        i: 3,
        x: d3_interpolateNumber(ta[1], tb[1])
      });
    } else if (tb[0] || tb[1]) {
      s.push("translate(" + tb + ")");
    } else {
      s.push("");
    }
    if (ra != rb) {
      if (ra - rb > 180) rb += 360; else if (rb - ra > 180) ra += 360;
      q.push({
        i: s.push(s.pop() + "rotate(", null, ")") - 2,
        x: d3_interpolateNumber(ra, rb)
      });
    } else if (rb) {
      s.push(s.pop() + "rotate(" + rb + ")");
    }
    if (wa != wb) {
      q.push({
        i: s.push(s.pop() + "skewX(", null, ")") - 2,
        x: d3_interpolateNumber(wa, wb)
      });
    } else if (wb) {
      s.push(s.pop() + "skewX(" + wb + ")");
    }
    if (ka[0] != kb[0] || ka[1] != kb[1]) {
      n = s.push(s.pop() + "scale(", null, ",", null, ")");
      q.push({
        i: n - 4,
        x: d3_interpolateNumber(ka[0], kb[0])
      }, {
        i: n - 2,
        x: d3_interpolateNumber(ka[1], kb[1])
      });
    } else if (kb[0] != 1 || kb[1] != 1) {
      s.push(s.pop() + "scale(" + kb + ")");
    }
    n = q.length;
    return function(t) {
      var i = -1, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  }
  function d3_uninterpolateNumber(a, b) {
    b = b - (a = +a) ? 1 / (b - a) : 0;
    return function(x) {
      return (x - a) * b;
    };
  }
  function d3_uninterpolateClamp(a, b) {
    b = b - (a = +a) ? 1 / (b - a) : 0;
    return function(x) {
      return Math.max(0, Math.min(1, (x - a) * b));
    };
  }
  d3.layout = {};
  d3.layout.bundle = function() {
    return function(links) {
      var paths = [], i = -1, n = links.length;
      while (++i < n) paths.push(d3_layout_bundlePath(links[i]));
      return paths;
    };
  };
  function d3_layout_bundlePath(link) {
    var start = link.source, end = link.target, lca = d3_layout_bundleLeastCommonAncestor(start, end), points = [ start ];
    while (start !== lca) {
      start = start.parent;
      points.push(start);
    }
    var k = points.length;
    while (end !== lca) {
      points.splice(k, 0, end);
      end = end.parent;
    }
    return points;
  }
  function d3_layout_bundleAncestors(node) {
    var ancestors = [], parent = node.parent;
    while (parent != null) {
      ancestors.push(node);
      node = parent;
      parent = parent.parent;
    }
    ancestors.push(node);
    return ancestors;
  }
  function d3_layout_bundleLeastCommonAncestor(a, b) {
    if (a === b) return a;
    var aNodes = d3_layout_bundleAncestors(a), bNodes = d3_layout_bundleAncestors(b), aNode = aNodes.pop(), bNode = bNodes.pop(), sharedNode = null;
    while (aNode === bNode) {
      sharedNode = aNode;
      aNode = aNodes.pop();
      bNode = bNodes.pop();
    }
    return sharedNode;
  }
  d3.layout.chord = function() {
    var chord = {}, chords, groups, matrix, n, padding = 0, sortGroups, sortSubgroups, sortChords;
    function relayout() {
      var subgroups = {}, groupSums = [], groupIndex = d3.range(n), subgroupIndex = [], k, x, x0, i, j;
      chords = [];
      groups = [];
      k = 0, i = -1;
      while (++i < n) {
        x = 0, j = -1;
        while (++j < n) {
          x += matrix[i][j];
        }
        groupSums.push(x);
        subgroupIndex.push(d3.range(n));
        k += x;
      }
      if (sortGroups) {
        groupIndex.sort(function(a, b) {
          return sortGroups(groupSums[a], groupSums[b]);
        });
      }
      if (sortSubgroups) {
        subgroupIndex.forEach(function(d, i) {
          d.sort(function(a, b) {
            return sortSubgroups(matrix[i][a], matrix[i][b]);
          });
        });
      }
      k = (2 * π - padding * n) / k;
      x = 0, i = -1;
      while (++i < n) {
        x0 = x, j = -1;
        while (++j < n) {
          var di = groupIndex[i], dj = subgroupIndex[di][j], v = matrix[di][dj], a0 = x, a1 = x += v * k;
          subgroups[di + "-" + dj] = {
            index: di,
            subindex: dj,
            startAngle: a0,
            endAngle: a1,
            value: v
          };
        }
        groups[di] = {
          index: di,
          startAngle: x0,
          endAngle: x,
          value: (x - x0) / k
        };
        x += padding;
      }
      i = -1;
      while (++i < n) {
        j = i - 1;
        while (++j < n) {
          var source = subgroups[i + "-" + j], target = subgroups[j + "-" + i];
          if (source.value || target.value) {
            chords.push(source.value < target.value ? {
              source: target,
              target: source
            } : {
              source: source,
              target: target
            });
          }
        }
      }
      if (sortChords) resort();
    }
    function resort() {
      chords.sort(function(a, b) {
        return sortChords((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2);
      });
    }
    chord.matrix = function(x) {
      if (!arguments.length) return matrix;
      n = (matrix = x) && matrix.length;
      chords = groups = null;
      return chord;
    };
    chord.padding = function(x) {
      if (!arguments.length) return padding;
      padding = x;
      chords = groups = null;
      return chord;
    };
    chord.sortGroups = function(x) {
      if (!arguments.length) return sortGroups;
      sortGroups = x;
      chords = groups = null;
      return chord;
    };
    chord.sortSubgroups = function(x) {
      if (!arguments.length) return sortSubgroups;
      sortSubgroups = x;
      chords = null;
      return chord;
    };
    chord.sortChords = function(x) {
      if (!arguments.length) return sortChords;
      sortChords = x;
      if (chords) resort();
      return chord;
    };
    chord.chords = function() {
      if (!chords) relayout();
      return chords;
    };
    chord.groups = function() {
      if (!groups) relayout();
      return groups;
    };
    return chord;
  };
  d3.layout.force = function() {
    var force = {}, event = d3.dispatch("start", "tick", "end"), size = [ 1, 1 ], drag, alpha, friction = .9, linkDistance = d3_layout_forceLinkDistance, linkStrength = d3_layout_forceLinkStrength, charge = -30, gravity = .1, theta = .8, nodes = [], links = [], distances, strengths, charges;
    function repulse(node) {
      return function(quad, x1, _, x2) {
        if (quad.point !== node) {
          var dx = quad.cx - node.x, dy = quad.cy - node.y, dn = 1 / Math.sqrt(dx * dx + dy * dy);
          if ((x2 - x1) * dn < theta) {
            var k = quad.charge * dn * dn;
            node.px -= dx * k;
            node.py -= dy * k;
            return true;
          }
          if (quad.point && isFinite(dn)) {
            var k = quad.pointCharge * dn * dn;
            node.px -= dx * k;
            node.py -= dy * k;
          }
        }
        return !quad.charge;
      };
    }
    force.tick = function() {
      if ((alpha *= .99) < .005) {
        event.end({
          type: "end",
          alpha: alpha = 0
        });
        return true;
      }
      var n = nodes.length, m = links.length, q, i, o, s, t, l, k, x, y;
      for (i = 0; i < m; ++i) {
        o = links[i];
        s = o.source;
        t = o.target;
        x = t.x - s.x;
        y = t.y - s.y;
        if (l = x * x + y * y) {
          l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
          x *= l;
          y *= l;
          t.x -= x * (k = s.weight / (t.weight + s.weight));
          t.y -= y * k;
          s.x += x * (k = 1 - k);
          s.y += y * k;
        }
      }
      if (k = alpha * gravity) {
        x = size[0] / 2;
        y = size[1] / 2;
        i = -1;
        if (k) while (++i < n) {
          o = nodes[i];
          o.x += (x - o.x) * k;
          o.y += (y - o.y) * k;
        }
      }
      if (charge) {
        d3_layout_forceAccumulate(q = d3.geom.quadtree(nodes), alpha, charges);
        i = -1;
        while (++i < n) {
          if (!(o = nodes[i]).fixed) {
            q.visit(repulse(o));
          }
        }
      }
      i = -1;
      while (++i < n) {
        o = nodes[i];
        if (o.fixed) {
          o.x = o.px;
          o.y = o.py;
        } else {
          o.x -= (o.px - (o.px = o.x)) * friction;
          o.y -= (o.py - (o.py = o.y)) * friction;
        }
      }
      event.tick({
        type: "tick",
        alpha: alpha
      });
    };
    force.nodes = function(x) {
      if (!arguments.length) return nodes;
      nodes = x;
      return force;
    };
    force.links = function(x) {
      if (!arguments.length) return links;
      links = x;
      return force;
    };
    force.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return force;
    };
    force.linkDistance = function(x) {
      if (!arguments.length) return linkDistance;
      linkDistance = typeof x === "function" ? x : +x;
      return force;
    };
    force.distance = force.linkDistance;
    force.linkStrength = function(x) {
      if (!arguments.length) return linkStrength;
      linkStrength = typeof x === "function" ? x : +x;
      return force;
    };
    force.friction = function(x) {
      if (!arguments.length) return friction;
      friction = +x;
      return force;
    };
    force.charge = function(x) {
      if (!arguments.length) return charge;
      charge = typeof x === "function" ? x : +x;
      return force;
    };
    force.gravity = function(x) {
      if (!arguments.length) return gravity;
      gravity = +x;
      return force;
    };
    force.theta = function(x) {
      if (!arguments.length) return theta;
      theta = +x;
      return force;
    };
    force.alpha = function(x) {
      if (!arguments.length) return alpha;
      x = +x;
      if (alpha) {
        if (x > 0) alpha = x; else alpha = 0;
      } else if (x > 0) {
        event.start({
          type: "start",
          alpha: alpha = x
        });
        d3.timer(force.tick);
      }
      return force;
    };
    force.start = function() {
      var i, j, n = nodes.length, m = links.length, w = size[0], h = size[1], neighbors, o;
      for (i = 0; i < n; ++i) {
        (o = nodes[i]).index = i;
        o.weight = 0;
      }
      for (i = 0; i < m; ++i) {
        o = links[i];
        if (typeof o.source == "number") o.source = nodes[o.source];
        if (typeof o.target == "number") o.target = nodes[o.target];
        ++o.source.weight;
        ++o.target.weight;
      }
      for (i = 0; i < n; ++i) {
        o = nodes[i];
        if (isNaN(o.x)) o.x = position("x", w);
        if (isNaN(o.y)) o.y = position("y", h);
        if (isNaN(o.px)) o.px = o.x;
        if (isNaN(o.py)) o.py = o.y;
      }
      distances = [];
      if (typeof linkDistance === "function") for (i = 0; i < m; ++i) distances[i] = +linkDistance.call(this, links[i], i); else for (i = 0; i < m; ++i) distances[i] = linkDistance;
      strengths = [];
      if (typeof linkStrength === "function") for (i = 0; i < m; ++i) strengths[i] = +linkStrength.call(this, links[i], i); else for (i = 0; i < m; ++i) strengths[i] = linkStrength;
      charges = [];
      if (typeof charge === "function") for (i = 0; i < n; ++i) charges[i] = +charge.call(this, nodes[i], i); else for (i = 0; i < n; ++i) charges[i] = charge;
      function position(dimension, size) {
        var neighbors = neighbor(i), j = -1, m = neighbors.length, x;
        while (++j < m) if (!isNaN(x = neighbors[j][dimension])) return x;
        return Math.random() * size;
      }
      function neighbor() {
        if (!neighbors) {
          neighbors = [];
          for (j = 0; j < n; ++j) {
            neighbors[j] = [];
          }
          for (j = 0; j < m; ++j) {
            var o = links[j];
            neighbors[o.source.index].push(o.target);
            neighbors[o.target.index].push(o.source);
          }
        }
        return neighbors[i];
      }
      return force.resume();
    };
    force.resume = function() {
      return force.alpha(.1);
    };
    force.stop = function() {
      return force.alpha(0);
    };
    force.drag = function() {
      if (!drag) drag = d3.behavior.drag().origin(d3_identity).on("dragstart.force", d3_layout_forceDragstart).on("drag.force", dragmove).on("dragend.force", d3_layout_forceDragend);
      if (!arguments.length) return drag;
      this.on("mouseover.force", d3_layout_forceMouseover).on("mouseout.force", d3_layout_forceMouseout).call(drag);
    };
    function dragmove(d) {
      d.px = d3.event.x, d.py = d3.event.y;
      force.resume();
    }
    return d3.rebind(force, event, "on");
  };
  function d3_layout_forceDragstart(d) {
    d.fixed |= 2;
  }
  function d3_layout_forceDragend(d) {
    d.fixed &= ~6;
  }
  function d3_layout_forceMouseover(d) {
    d.fixed |= 4;
    d.px = d.x, d.py = d.y;
  }
  function d3_layout_forceMouseout(d) {
    d.fixed &= ~4;
  }
  function d3_layout_forceAccumulate(quad, alpha, charges) {
    var cx = 0, cy = 0;
    quad.charge = 0;
    if (!quad.leaf) {
      var nodes = quad.nodes, n = nodes.length, i = -1, c;
      while (++i < n) {
        c = nodes[i];
        if (c == null) continue;
        d3_layout_forceAccumulate(c, alpha, charges);
        quad.charge += c.charge;
        cx += c.charge * c.cx;
        cy += c.charge * c.cy;
      }
    }
    if (quad.point) {
      if (!quad.leaf) {
        quad.point.x += Math.random() - .5;
        quad.point.y += Math.random() - .5;
      }
      var k = alpha * charges[quad.point.index];
      quad.charge += quad.pointCharge = k;
      cx += k * quad.point.x;
      cy += k * quad.point.y;
    }
    quad.cx = cx / quad.charge;
    quad.cy = cy / quad.charge;
  }
  var d3_layout_forceLinkDistance = 20, d3_layout_forceLinkStrength = 1;
  d3.layout.hierarchy = function() {
    var sort = d3_layout_hierarchySort, children = d3_layout_hierarchyChildren, value = d3_layout_hierarchyValue;
    function recurse(node, depth, nodes) {
      var childs = children.call(hierarchy, node, depth);
      node.depth = depth;
      nodes.push(node);
      if (childs && (n = childs.length)) {
        var i = -1, n, c = node.children = [], v = 0, j = depth + 1, d;
        while (++i < n) {
          d = recurse(childs[i], j, nodes);
          d.parent = node;
          c.push(d);
          v += d.value;
        }
        if (sort) c.sort(sort);
        if (value) node.value = v;
      } else if (value) {
        node.value = +value.call(hierarchy, node, depth) || 0;
      }
      return node;
    }
    function revalue(node, depth) {
      var children = node.children, v = 0;
      if (children && (n = children.length)) {
        var i = -1, n, j = depth + 1;
        while (++i < n) v += revalue(children[i], j);
      } else if (value) {
        v = +value.call(hierarchy, node, depth) || 0;
      }
      if (value) node.value = v;
      return v;
    }
    function hierarchy(d) {
      var nodes = [];
      recurse(d, 0, nodes);
      return nodes;
    }
    hierarchy.sort = function(x) {
      if (!arguments.length) return sort;
      sort = x;
      return hierarchy;
    };
    hierarchy.children = function(x) {
      if (!arguments.length) return children;
      children = x;
      return hierarchy;
    };
    hierarchy.value = function(x) {
      if (!arguments.length) return value;
      value = x;
      return hierarchy;
    };
    hierarchy.revalue = function(root) {
      revalue(root, 0);
      return root;
    };
    return hierarchy;
  };
  function d3_layout_hierarchyRebind(object, hierarchy) {
    d3.rebind(object, hierarchy, "sort", "children", "value");
    object.nodes = object;
    object.links = d3_layout_hierarchyLinks;
    return object;
  }
  function d3_layout_hierarchyChildren(d) {
    return d.children;
  }
  function d3_layout_hierarchyValue(d) {
    return d.value;
  }
  function d3_layout_hierarchySort(a, b) {
    return b.value - a.value;
  }
  function d3_layout_hierarchyLinks(nodes) {
    return d3.merge(nodes.map(function(parent) {
      return (parent.children || []).map(function(child) {
        return {
          source: parent,
          target: child
        };
      });
    }));
  }
  d3.layout.partition = function() {
    var hierarchy = d3.layout.hierarchy(), size = [ 1, 1 ];
    function position(node, x, dx, dy) {
      var children = node.children;
      node.x = x;
      node.y = node.depth * dy;
      node.dx = dx;
      node.dy = dy;
      if (children && (n = children.length)) {
        var i = -1, n, c, d;
        dx = node.value ? dx / node.value : 0;
        while (++i < n) {
          position(c = children[i], x, d = c.value * dx, dy);
          x += d;
        }
      }
    }
    function depth(node) {
      var children = node.children, d = 0;
      if (children && (n = children.length)) {
        var i = -1, n;
        while (++i < n) d = Math.max(d, depth(children[i]));
      }
      return 1 + d;
    }
    function partition(d, i) {
      var nodes = hierarchy.call(this, d, i);
      position(nodes[0], 0, size[0], size[1] / depth(nodes[0]));
      return nodes;
    }
    partition.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return partition;
    };
    return d3_layout_hierarchyRebind(partition, hierarchy);
  };
  d3.layout.pie = function() {
    var value = Number, sort = d3_layout_pieSortByValue, startAngle = 0, endAngle = 2 * π;
    function pie(data) {
      var values = data.map(function(d, i) {
        return +value.call(pie, d, i);
      });
      var a = +(typeof startAngle === "function" ? startAngle.apply(this, arguments) : startAngle);
      var k = ((typeof endAngle === "function" ? endAngle.apply(this, arguments) : endAngle) - a) / d3.sum(values);
      var index = d3.range(data.length);
      if (sort != null) index.sort(sort === d3_layout_pieSortByValue ? function(i, j) {
        return values[j] - values[i];
      } : function(i, j) {
        return sort(data[i], data[j]);
      });
      var arcs = [];
      index.forEach(function(i) {
        var d;
        arcs[i] = {
          data: data[i],
          value: d = values[i],
          startAngle: a,
          endAngle: a += d * k
        };
      });
      return arcs;
    }
    pie.value = function(x) {
      if (!arguments.length) return value;
      value = x;
      return pie;
    };
    pie.sort = function(x) {
      if (!arguments.length) return sort;
      sort = x;
      return pie;
    };
    pie.startAngle = function(x) {
      if (!arguments.length) return startAngle;
      startAngle = x;
      return pie;
    };
    pie.endAngle = function(x) {
      if (!arguments.length) return endAngle;
      endAngle = x;
      return pie;
    };
    return pie;
  };
  var d3_layout_pieSortByValue = {};
  d3.layout.stack = function() {
    var values = d3_identity, order = d3_layout_stackOrderDefault, offset = d3_layout_stackOffsetZero, out = d3_layout_stackOut, x = d3_layout_stackX, y = d3_layout_stackY;
    function stack(data, index) {
      var series = data.map(function(d, i) {
        return values.call(stack, d, i);
      });
      var points = series.map(function(d) {
        return d.map(function(v, i) {
          return [ x.call(stack, v, i), y.call(stack, v, i) ];
        });
      });
      var orders = order.call(stack, points, index);
      series = d3.permute(series, orders);
      points = d3.permute(points, orders);
      var offsets = offset.call(stack, points, index);
      var n = series.length, m = series[0].length, i, j, o;
      for (j = 0; j < m; ++j) {
        out.call(stack, series[0][j], o = offsets[j], points[0][j][1]);
        for (i = 1; i < n; ++i) {
          out.call(stack, series[i][j], o += points[i - 1][j][1], points[i][j][1]);
        }
      }
      return data;
    }
    stack.values = function(x) {
      if (!arguments.length) return values;
      values = x;
      return stack;
    };
    stack.order = function(x) {
      if (!arguments.length) return order;
      order = typeof x === "function" ? x : d3_layout_stackOrders.get(x) || d3_layout_stackOrderDefault;
      return stack;
    };
    stack.offset = function(x) {
      if (!arguments.length) return offset;
      offset = typeof x === "function" ? x : d3_layout_stackOffsets.get(x) || d3_layout_stackOffsetZero;
      return stack;
    };
    stack.x = function(z) {
      if (!arguments.length) return x;
      x = z;
      return stack;
    };
    stack.y = function(z) {
      if (!arguments.length) return y;
      y = z;
      return stack;
    };
    stack.out = function(z) {
      if (!arguments.length) return out;
      out = z;
      return stack;
    };
    return stack;
  };
  function d3_layout_stackX(d) {
    return d.x;
  }
  function d3_layout_stackY(d) {
    return d.y;
  }
  function d3_layout_stackOut(d, y0, y) {
    d.y0 = y0;
    d.y = y;
  }
  var d3_layout_stackOrders = d3.map({
    "inside-out": function(data) {
      var n = data.length, i, j, max = data.map(d3_layout_stackMaxIndex), sums = data.map(d3_layout_stackReduceSum), index = d3.range(n).sort(function(a, b) {
        return max[a] - max[b];
      }), top = 0, bottom = 0, tops = [], bottoms = [];
      for (i = 0; i < n; ++i) {
        j = index[i];
        if (top < bottom) {
          top += sums[j];
          tops.push(j);
        } else {
          bottom += sums[j];
          bottoms.push(j);
        }
      }
      return bottoms.reverse().concat(tops);
    },
    reverse: function(data) {
      return d3.range(data.length).reverse();
    },
    "default": d3_layout_stackOrderDefault
  });
  var d3_layout_stackOffsets = d3.map({
    silhouette: function(data) {
      var n = data.length, m = data[0].length, sums = [], max = 0, i, j, o, y0 = [];
      for (j = 0; j < m; ++j) {
        for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
        if (o > max) max = o;
        sums.push(o);
      }
      for (j = 0; j < m; ++j) {
        y0[j] = (max - sums[j]) / 2;
      }
      return y0;
    },
    wiggle: function(data) {
      var n = data.length, x = data[0], m = x.length, i, j, k, s1, s2, s3, dx, o, o0, y0 = [];
      y0[0] = o = o0 = 0;
      for (j = 1; j < m; ++j) {
        for (i = 0, s1 = 0; i < n; ++i) s1 += data[i][j][1];
        for (i = 0, s2 = 0, dx = x[j][0] - x[j - 1][0]; i < n; ++i) {
          for (k = 0, s3 = (data[i][j][1] - data[i][j - 1][1]) / (2 * dx); k < i; ++k) {
            s3 += (data[k][j][1] - data[k][j - 1][1]) / dx;
          }
          s2 += s3 * data[i][j][1];
        }
        y0[j] = o -= s1 ? s2 / s1 * dx : 0;
        if (o < o0) o0 = o;
      }
      for (j = 0; j < m; ++j) y0[j] -= o0;
      return y0;
    },
    expand: function(data) {
      var n = data.length, m = data[0].length, k = 1 / n, i, j, o, y0 = [];
      for (j = 0; j < m; ++j) {
        for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
        if (o) for (i = 0; i < n; i++) data[i][j][1] /= o; else for (i = 0; i < n; i++) data[i][j][1] = k;
      }
      for (j = 0; j < m; ++j) y0[j] = 0;
      return y0;
    },
    zero: d3_layout_stackOffsetZero
  });
  function d3_layout_stackOrderDefault(data) {
    return d3.range(data.length);
  }
  function d3_layout_stackOffsetZero(data) {
    var j = -1, m = data[0].length, y0 = [];
    while (++j < m) y0[j] = 0;
    return y0;
  }
  function d3_layout_stackMaxIndex(array) {
    var i = 1, j = 0, v = array[0][1], k, n = array.length;
    for (;i < n; ++i) {
      if ((k = array[i][1]) > v) {
        j = i;
        v = k;
      }
    }
    return j;
  }
  function d3_layout_stackReduceSum(d) {
    return d.reduce(d3_layout_stackSum, 0);
  }
  function d3_layout_stackSum(p, d) {
    return p + d[1];
  }
  d3.layout.histogram = function() {
    var frequency = true, valuer = Number, ranger = d3_layout_histogramRange, binner = d3_layout_histogramBinSturges;
    function histogram(data, i) {
      var bins = [], values = data.map(valuer, this), range = ranger.call(this, values, i), thresholds = binner.call(this, range, values, i), bin, i = -1, n = values.length, m = thresholds.length - 1, k = frequency ? 1 : 1 / n, x;
      while (++i < m) {
        bin = bins[i] = [];
        bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]);
        bin.y = 0;
      }
      if (m > 0) {
        i = -1;
        while (++i < n) {
          x = values[i];
          if (x >= range[0] && x <= range[1]) {
            bin = bins[d3.bisect(thresholds, x, 1, m) - 1];
            bin.y += k;
            bin.push(data[i]);
          }
        }
      }
      return bins;
    }
    histogram.value = function(x) {
      if (!arguments.length) return valuer;
      valuer = x;
      return histogram;
    };
    histogram.range = function(x) {
      if (!arguments.length) return ranger;
      ranger = d3_functor(x);
      return histogram;
    };
    histogram.bins = function(x) {
      if (!arguments.length) return binner;
      binner = typeof x === "number" ? function(range) {
        return d3_layout_histogramBinFixed(range, x);
      } : d3_functor(x);
      return histogram;
    };
    histogram.frequency = function(x) {
      if (!arguments.length) return frequency;
      frequency = !!x;
      return histogram;
    };
    return histogram;
  };
  function d3_layout_histogramBinSturges(range, values) {
    return d3_layout_histogramBinFixed(range, Math.ceil(Math.log(values.length) / Math.LN2 + 1));
  }
  function d3_layout_histogramBinFixed(range, n) {
    var x = -1, b = +range[0], m = (range[1] - b) / n, f = [];
    while (++x <= n) f[x] = m * x + b;
    return f;
  }
  function d3_layout_histogramRange(values) {
    return [ d3.min(values), d3.max(values) ];
  }
  d3.layout.tree = function() {
    var hierarchy = d3.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [ 1, 1 ], nodeSize = false;
    function tree(d, i) {
      var nodes = hierarchy.call(this, d, i), root = nodes[0];
      function firstWalk(node, previousSibling) {
        var children = node.children, layout = node._tree;
        if (children && (n = children.length)) {
          var n, firstChild = children[0], previousChild, ancestor = firstChild, child, i = -1;
          while (++i < n) {
            child = children[i];
            firstWalk(child, previousChild);
            ancestor = apportion(child, previousChild, ancestor);
            previousChild = child;
          }
          d3_layout_treeShift(node);
          var midpoint = .5 * (firstChild._tree.prelim + child._tree.prelim);
          if (previousSibling) {
            layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
            layout.mod = layout.prelim - midpoint;
          } else {
            layout.prelim = midpoint;
          }
        } else {
          if (previousSibling) {
            layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
          }
        }
      }
      function secondWalk(node, x) {
        node.x = node._tree.prelim + x;
        var children = node.children;
        if (children && (n = children.length)) {
          var i = -1, n;
          x += node._tree.mod;
          while (++i < n) {
            secondWalk(children[i], x);
          }
        }
      }
      function apportion(node, previousSibling, ancestor) {
        if (previousSibling) {
          var vip = node, vop = node, vim = previousSibling, vom = node.parent.children[0], sip = vip._tree.mod, sop = vop._tree.mod, sim = vim._tree.mod, som = vom._tree.mod, shift;
          while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
            vom = d3_layout_treeLeft(vom);
            vop = d3_layout_treeRight(vop);
            vop._tree.ancestor = node;
            shift = vim._tree.prelim + sim - vip._tree.prelim - sip + separation(vim, vip);
            if (shift > 0) {
              d3_layout_treeMove(d3_layout_treeAncestor(vim, node, ancestor), node, shift);
              sip += shift;
              sop += shift;
            }
            sim += vim._tree.mod;
            sip += vip._tree.mod;
            som += vom._tree.mod;
            sop += vop._tree.mod;
          }
          if (vim && !d3_layout_treeRight(vop)) {
            vop._tree.thread = vim;
            vop._tree.mod += sim - sop;
          }
          if (vip && !d3_layout_treeLeft(vom)) {
            vom._tree.thread = vip;
            vom._tree.mod += sip - som;
            ancestor = node;
          }
        }
        return ancestor;
      }
      d3_layout_treeVisitAfter(root, function(node, previousSibling) {
        node._tree = {
          ancestor: node,
          prelim: 0,
          mod: 0,
          change: 0,
          shift: 0,
          number: previousSibling ? previousSibling._tree.number + 1 : 0
        };
      });
      firstWalk(root);
      secondWalk(root, -root._tree.prelim);
      var left = d3_layout_treeSearch(root, d3_layout_treeLeftmost), right = d3_layout_treeSearch(root, d3_layout_treeRightmost), deep = d3_layout_treeSearch(root, d3_layout_treeDeepest), x0 = left.x - separation(left, right) / 2, x1 = right.x + separation(right, left) / 2, y1 = deep.depth || 1;
      d3_layout_treeVisitAfter(root, nodeSize ? function(node) {
        node.x *= size[0];
        node.y = node.depth * size[1];
        delete node._tree;
      } : function(node) {
        node.x = (node.x - x0) / (x1 - x0) * size[0];
        node.y = node.depth / y1 * size[1];
        delete node._tree;
      });
      return nodes;
    }
    tree.separation = function(x) {
      if (!arguments.length) return separation;
      separation = x;
      return tree;
    };
    tree.size = function(x) {
      if (!arguments.length) return nodeSize ? null : size;
      nodeSize = (size = x) == null;
      return tree;
    };
    tree.nodeSize = function(x) {
      if (!arguments.length) return nodeSize ? size : null;
      nodeSize = (size = x) != null;
      return tree;
    };
    return d3_layout_hierarchyRebind(tree, hierarchy);
  };
  function d3_layout_treeSeparation(a, b) {
    return a.parent == b.parent ? 1 : 2;
  }
  function d3_layout_treeLeft(node) {
    var children = node.children;
    return children && children.length ? children[0] : node._tree.thread;
  }
  function d3_layout_treeRight(node) {
    var children = node.children, n;
    return children && (n = children.length) ? children[n - 1] : node._tree.thread;
  }
  function d3_layout_treeSearch(node, compare) {
    var children = node.children;
    if (children && (n = children.length)) {
      var child, n, i = -1;
      while (++i < n) {
        if (compare(child = d3_layout_treeSearch(children[i], compare), node) > 0) {
          node = child;
        }
      }
    }
    return node;
  }
  function d3_layout_treeRightmost(a, b) {
    return a.x - b.x;
  }
  function d3_layout_treeLeftmost(a, b) {
    return b.x - a.x;
  }
  function d3_layout_treeDeepest(a, b) {
    return a.depth - b.depth;
  }
  function d3_layout_treeVisitAfter(node, callback) {
    function visit(node, previousSibling) {
      var children = node.children;
      if (children && (n = children.length)) {
        var child, previousChild = null, i = -1, n;
        while (++i < n) {
          child = children[i];
          visit(child, previousChild);
          previousChild = child;
        }
      }
      callback(node, previousSibling);
    }
    visit(node, null);
  }
  function d3_layout_treeShift(node) {
    var shift = 0, change = 0, children = node.children, i = children.length, child;
    while (--i >= 0) {
      child = children[i]._tree;
      child.prelim += shift;
      child.mod += shift;
      shift += child.shift + (change += child.change);
    }
  }
  function d3_layout_treeMove(ancestor, node, shift) {
    ancestor = ancestor._tree;
    node = node._tree;
    var change = shift / (node.number - ancestor.number);
    ancestor.change += change;
    node.change -= change;
    node.shift += shift;
    node.prelim += shift;
    node.mod += shift;
  }
  function d3_layout_treeAncestor(vim, node, ancestor) {
    return vim._tree.ancestor.parent == node.parent ? vim._tree.ancestor : ancestor;
  }
  d3.layout.pack = function() {
    var hierarchy = d3.layout.hierarchy().sort(d3_layout_packSort), padding = 0, size = [ 1, 1 ], radius;
    function pack(d, i) {
      var nodes = hierarchy.call(this, d, i), root = nodes[0], w = size[0], h = size[1], r = radius == null ? Math.sqrt : typeof radius === "function" ? radius : function() {
        return radius;
      };
      root.x = root.y = 0;
      d3_layout_treeVisitAfter(root, function(d) {
        d.r = +r(d.value);
      });
      d3_layout_treeVisitAfter(root, d3_layout_packSiblings);
      if (padding) {
        var dr = padding * (radius ? 1 : Math.max(2 * root.r / w, 2 * root.r / h)) / 2;
        d3_layout_treeVisitAfter(root, function(d) {
          d.r += dr;
        });
        d3_layout_treeVisitAfter(root, d3_layout_packSiblings);
        d3_layout_treeVisitAfter(root, function(d) {
          d.r -= dr;
        });
      }
      d3_layout_packTransform(root, w / 2, h / 2, radius ? 1 : 1 / Math.max(2 * root.r / w, 2 * root.r / h));
      return nodes;
    }
    pack.size = function(_) {
      if (!arguments.length) return size;
      size = _;
      return pack;
    };
    pack.radius = function(_) {
      if (!arguments.length) return radius;
      radius = _ == null || typeof _ === "function" ? _ : +_;
      return pack;
    };
    pack.padding = function(_) {
      if (!arguments.length) return padding;
      padding = +_;
      return pack;
    };
    return d3_layout_hierarchyRebind(pack, hierarchy);
  };
  function d3_layout_packSort(a, b) {
    return a.value - b.value;
  }
  function d3_layout_packInsert(a, b) {
    var c = a._pack_next;
    a._pack_next = b;
    b._pack_prev = a;
    b._pack_next = c;
    c._pack_prev = b;
  }
  function d3_layout_packSplice(a, b) {
    a._pack_next = b;
    b._pack_prev = a;
  }
  function d3_layout_packIntersects(a, b) {
    var dx = b.x - a.x, dy = b.y - a.y, dr = a.r + b.r;
    return .999 * dr * dr > dx * dx + dy * dy;
  }
  function d3_layout_packSiblings(node) {
    if (!(nodes = node.children) || !(n = nodes.length)) return;
    var nodes, xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity, a, b, c, i, j, k, n;
    function bound(node) {
      xMin = Math.min(node.x - node.r, xMin);
      xMax = Math.max(node.x + node.r, xMax);
      yMin = Math.min(node.y - node.r, yMin);
      yMax = Math.max(node.y + node.r, yMax);
    }
    nodes.forEach(d3_layout_packLink);
    a = nodes[0];
    a.x = -a.r;
    a.y = 0;
    bound(a);
    if (n > 1) {
      b = nodes[1];
      b.x = b.r;
      b.y = 0;
      bound(b);
      if (n > 2) {
        c = nodes[2];
        d3_layout_packPlace(a, b, c);
        bound(c);
        d3_layout_packInsert(a, c);
        a._pack_prev = c;
        d3_layout_packInsert(c, b);
        b = a._pack_next;
        for (i = 3; i < n; i++) {
          d3_layout_packPlace(a, b, c = nodes[i]);
          var isect = 0, s1 = 1, s2 = 1;
          for (j = b._pack_next; j !== b; j = j._pack_next, s1++) {
            if (d3_layout_packIntersects(j, c)) {
              isect = 1;
              break;
            }
          }
          if (isect == 1) {
            for (k = a._pack_prev; k !== j._pack_prev; k = k._pack_prev, s2++) {
              if (d3_layout_packIntersects(k, c)) {
                break;
              }
            }
          }
          if (isect) {
            if (s1 < s2 || s1 == s2 && b.r < a.r) d3_layout_packSplice(a, b = j); else d3_layout_packSplice(a = k, b);
            i--;
          } else {
            d3_layout_packInsert(a, c);
            b = c;
            bound(c);
          }
        }
      }
    }
    var cx = (xMin + xMax) / 2, cy = (yMin + yMax) / 2, cr = 0;
    for (i = 0; i < n; i++) {
      c = nodes[i];
      c.x -= cx;
      c.y -= cy;
      cr = Math.max(cr, c.r + Math.sqrt(c.x * c.x + c.y * c.y));
    }
    node.r = cr;
    nodes.forEach(d3_layout_packUnlink);
  }
  function d3_layout_packLink(node) {
    node._pack_next = node._pack_prev = node;
  }
  function d3_layout_packUnlink(node) {
    delete node._pack_next;
    delete node._pack_prev;
  }
  function d3_layout_packTransform(node, x, y, k) {
    var children = node.children;
    node.x = x += k * node.x;
    node.y = y += k * node.y;
    node.r *= k;
    if (children) {
      var i = -1, n = children.length;
      while (++i < n) d3_layout_packTransform(children[i], x, y, k);
    }
  }
  function d3_layout_packPlace(a, b, c) {
    var db = a.r + c.r, dx = b.x - a.x, dy = b.y - a.y;
    if (db && (dx || dy)) {
      var da = b.r + c.r, dc = dx * dx + dy * dy;
      da *= da;
      db *= db;
      var x = .5 + (db - da) / (2 * dc), y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
      c.x = a.x + x * dx + y * dy;
      c.y = a.y + x * dy - y * dx;
    } else {
      c.x = a.x + db;
      c.y = a.y;
    }
  }
  d3.layout.cluster = function() {
    var hierarchy = d3.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [ 1, 1 ], nodeSize = false;
    function cluster(d, i) {
      var nodes = hierarchy.call(this, d, i), root = nodes[0], previousNode, x = 0;
      d3_layout_treeVisitAfter(root, function(node) {
        var children = node.children;
        if (children && children.length) {
          node.x = d3_layout_clusterX(children);
          node.y = d3_layout_clusterY(children);
        } else {
          node.x = previousNode ? x += separation(node, previousNode) : 0;
          node.y = 0;
          previousNode = node;
        }
      });
      var left = d3_layout_clusterLeft(root), right = d3_layout_clusterRight(root), x0 = left.x - separation(left, right) / 2, x1 = right.x + separation(right, left) / 2;
      d3_layout_treeVisitAfter(root, nodeSize ? function(node) {
        node.x = (node.x - root.x) * size[0];
        node.y = (root.y - node.y) * size[1];
      } : function(node) {
        node.x = (node.x - x0) / (x1 - x0) * size[0];
        node.y = (1 - (root.y ? node.y / root.y : 1)) * size[1];
      });
      return nodes;
    }
    cluster.separation = function(x) {
      if (!arguments.length) return separation;
      separation = x;
      return cluster;
    };
    cluster.size = function(x) {
      if (!arguments.length) return nodeSize ? null : size;
      nodeSize = (size = x) == null;
      return cluster;
    };
    cluster.nodeSize = function(x) {
      if (!arguments.length) return nodeSize ? size : null;
      nodeSize = (size = x) != null;
      return cluster;
    };
    return d3_layout_hierarchyRebind(cluster, hierarchy);
  };
  function d3_layout_clusterY(children) {
    return 1 + d3.max(children, function(child) {
      return child.y;
    });
  }
  function d3_layout_clusterX(children) {
    return children.reduce(function(x, child) {
      return x + child.x;
    }, 0) / children.length;
  }
  function d3_layout_clusterLeft(node) {
    var children = node.children;
    return children && children.length ? d3_layout_clusterLeft(children[0]) : node;
  }
  function d3_layout_clusterRight(node) {
    var children = node.children, n;
    return children && (n = children.length) ? d3_layout_clusterRight(children[n - 1]) : node;
  }
  d3.layout.treemap = function() {
    var hierarchy = d3.layout.hierarchy(), round = Math.round, size = [ 1, 1 ], padding = null, pad = d3_layout_treemapPadNull, sticky = false, stickies, mode = "squarify", ratio = .5 * (1 + Math.sqrt(5));
    function scale(children, k) {
      var i = -1, n = children.length, child, area;
      while (++i < n) {
        area = (child = children[i]).value * (k < 0 ? 0 : k);
        child.area = isNaN(area) || area <= 0 ? 0 : area;
      }
    }
    function squarify(node) {
      var children = node.children;
      if (children && children.length) {
        var rect = pad(node), row = [], remaining = children.slice(), child, best = Infinity, score, u = mode === "slice" ? rect.dx : mode === "dice" ? rect.dy : mode === "slice-dice" ? node.depth & 1 ? rect.dy : rect.dx : Math.min(rect.dx, rect.dy), n;
        scale(remaining, rect.dx * rect.dy / node.value);
        row.area = 0;
        while ((n = remaining.length) > 0) {
          row.push(child = remaining[n - 1]);
          row.area += child.area;
          if (mode !== "squarify" || (score = worst(row, u)) <= best) {
            remaining.pop();
            best = score;
          } else {
            row.area -= row.pop().area;
            position(row, u, rect, false);
            u = Math.min(rect.dx, rect.dy);
            row.length = row.area = 0;
            best = Infinity;
          }
        }
        if (row.length) {
          position(row, u, rect, true);
          row.length = row.area = 0;
        }
        children.forEach(squarify);
      }
    }
    function stickify(node) {
      var children = node.children;
      if (children && children.length) {
        var rect = pad(node), remaining = children.slice(), child, row = [];
        scale(remaining, rect.dx * rect.dy / node.value);
        row.area = 0;
        while (child = remaining.pop()) {
          row.push(child);
          row.area += child.area;
          if (child.z != null) {
            position(row, child.z ? rect.dx : rect.dy, rect, !remaining.length);
            row.length = row.area = 0;
          }
        }
        children.forEach(stickify);
      }
    }
    function worst(row, u) {
      var s = row.area, r, rmax = 0, rmin = Infinity, i = -1, n = row.length;
      while (++i < n) {
        if (!(r = row[i].area)) continue;
        if (r < rmin) rmin = r;
        if (r > rmax) rmax = r;
      }
      s *= s;
      u *= u;
      return s ? Math.max(u * rmax * ratio / s, s / (u * rmin * ratio)) : Infinity;
    }
    function position(row, u, rect, flush) {
      var i = -1, n = row.length, x = rect.x, y = rect.y, v = u ? round(row.area / u) : 0, o;
      if (u == rect.dx) {
        if (flush || v > rect.dy) v = rect.dy;
        while (++i < n) {
          o = row[i];
          o.x = x;
          o.y = y;
          o.dy = v;
          x += o.dx = Math.min(rect.x + rect.dx - x, v ? round(o.area / v) : 0);
        }
        o.z = true;
        o.dx += rect.x + rect.dx - x;
        rect.y += v;
        rect.dy -= v;
      } else {
        if (flush || v > rect.dx) v = rect.dx;
        while (++i < n) {
          o = row[i];
          o.x = x;
          o.y = y;
          o.dx = v;
          y += o.dy = Math.min(rect.y + rect.dy - y, v ? round(o.area / v) : 0);
        }
        o.z = false;
        o.dy += rect.y + rect.dy - y;
        rect.x += v;
        rect.dx -= v;
      }
    }
    function treemap(d) {
      var nodes = stickies || hierarchy(d), root = nodes[0];
      root.x = 0;
      root.y = 0;
      root.dx = size[0];
      root.dy = size[1];
      if (stickies) hierarchy.revalue(root);
      scale([ root ], root.dx * root.dy / root.value);
      (stickies ? stickify : squarify)(root);
      if (sticky) stickies = nodes;
      return nodes;
    }
    treemap.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return treemap;
    };
    treemap.padding = function(x) {
      if (!arguments.length) return padding;
      function padFunction(node) {
        var p = x.call(treemap, node, node.depth);
        return p == null ? d3_layout_treemapPadNull(node) : d3_layout_treemapPad(node, typeof p === "number" ? [ p, p, p, p ] : p);
      }
      function padConstant(node) {
        return d3_layout_treemapPad(node, x);
      }
      var type;
      pad = (padding = x) == null ? d3_layout_treemapPadNull : (type = typeof x) === "function" ? padFunction : type === "number" ? (x = [ x, x, x, x ], 
      padConstant) : padConstant;
      return treemap;
    };
    treemap.round = function(x) {
      if (!arguments.length) return round != Number;
      round = x ? Math.round : Number;
      return treemap;
    };
    treemap.sticky = function(x) {
      if (!arguments.length) return sticky;
      sticky = x;
      stickies = null;
      return treemap;
    };
    treemap.ratio = function(x) {
      if (!arguments.length) return ratio;
      ratio = x;
      return treemap;
    };
    treemap.mode = function(x) {
      if (!arguments.length) return mode;
      mode = x + "";
      return treemap;
    };
    return d3_layout_hierarchyRebind(treemap, hierarchy);
  };
  function d3_layout_treemapPadNull(node) {
    return {
      x: node.x,
      y: node.y,
      dx: node.dx,
      dy: node.dy
    };
  }
  function d3_layout_treemapPad(node, padding) {
    var x = node.x + padding[3], y = node.y + padding[0], dx = node.dx - padding[1] - padding[3], dy = node.dy - padding[0] - padding[2];
    if (dx < 0) {
      x += dx / 2;
      dx = 0;
    }
    if (dy < 0) {
      y += dy / 2;
      dy = 0;
    }
    return {
      x: x,
      y: y,
      dx: dx,
      dy: dy
    };
  }
  d3.random = {
    normal: function(µ, σ) {
      var n = arguments.length;
      if (n < 2) σ = 1;
      if (n < 1) µ = 0;
      return function() {
        var x, y, r;
        do {
          x = Math.random() * 2 - 1;
          y = Math.random() * 2 - 1;
          r = x * x + y * y;
        } while (!r || r > 1);
        return µ + σ * x * Math.sqrt(-2 * Math.log(r) / r);
      };
    },
    logNormal: function() {
      var random = d3.random.normal.apply(d3, arguments);
      return function() {
        return Math.exp(random());
      };
    },
    irwinHall: function(m) {
      return function() {
        for (var s = 0, j = 0; j < m; j++) s += Math.random();
        return s / m;
      };
    }
  };
  d3.scale = {};
  function d3_scaleExtent(domain) {
    var start = domain[0], stop = domain[domain.length - 1];
    return start < stop ? [ start, stop ] : [ stop, start ];
  }
  function d3_scaleRange(scale) {
    return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
  }
  function d3_scale_bilinear(domain, range, uninterpolate, interpolate) {
    var u = uninterpolate(domain[0], domain[1]), i = interpolate(range[0], range[1]);
    return function(x) {
      return i(u(x));
    };
  }
  function d3_scale_nice(domain, nice) {
    var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], dx;
    if (x1 < x0) {
      dx = i0, i0 = i1, i1 = dx;
      dx = x0, x0 = x1, x1 = dx;
    }
    domain[i0] = nice.floor(x0);
    domain[i1] = nice.ceil(x1);
    return domain;
  }
  function d3_scale_niceStep(step) {
    return step ? {
      floor: function(x) {
        return Math.floor(x / step) * step;
      },
      ceil: function(x) {
        return Math.ceil(x / step) * step;
      }
    } : d3_scale_niceIdentity;
  }
  var d3_scale_niceIdentity = {
    floor: d3_identity,
    ceil: d3_identity
  };
  function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
    var u = [], i = [], j = 0, k = Math.min(domain.length, range.length) - 1;
    if (domain[k] < domain[0]) {
      domain = domain.slice().reverse();
      range = range.slice().reverse();
    }
    while (++j <= k) {
      u.push(uninterpolate(domain[j - 1], domain[j]));
      i.push(interpolate(range[j - 1], range[j]));
    }
    return function(x) {
      var j = d3.bisect(domain, x, 1, k) - 1;
      return i[j](u[j](x));
    };
  }
  d3.scale.linear = function() {
    return d3_scale_linear([ 0, 1 ], [ 0, 1 ], d3_interpolate, false);
  };
  function d3_scale_linear(domain, range, interpolate, clamp) {
    var output, input;
    function rescale() {
      var linear = Math.min(domain.length, range.length) > 2 ? d3_scale_polylinear : d3_scale_bilinear, uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
      output = linear(domain, range, uninterpolate, interpolate);
      input = linear(range, domain, uninterpolate, d3_interpolate);
      return scale;
    }
    function scale(x) {
      return output(x);
    }
    scale.invert = function(y) {
      return input(y);
    };
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      domain = x.map(Number);
      return rescale();
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      return rescale();
    };
    scale.rangeRound = function(x) {
      return scale.range(x).interpolate(d3_interpolateRound);
    };
    scale.clamp = function(x) {
      if (!arguments.length) return clamp;
      clamp = x;
      return rescale();
    };
    scale.interpolate = function(x) {
      if (!arguments.length) return interpolate;
      interpolate = x;
      return rescale();
    };
    scale.ticks = function(m) {
      return d3_scale_linearTicks(domain, m);
    };
    scale.tickFormat = function(m, format) {
      return d3_scale_linearTickFormat(domain, m, format);
    };
    scale.nice = function(m) {
      d3_scale_linearNice(domain, m);
      return rescale();
    };
    scale.copy = function() {
      return d3_scale_linear(domain, range, interpolate, clamp);
    };
    return rescale();
  }
  function d3_scale_linearRebind(scale, linear) {
    return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
  }
  function d3_scale_linearNice(domain, m) {
    return d3_scale_nice(domain, d3_scale_niceStep(m ? d3_scale_linearTickRange(domain, m)[2] : d3_scale_linearNiceStep(domain)));
  }
  function d3_scale_linearNiceStep(domain) {
    var extent = d3_scaleExtent(domain), span = extent[1] - extent[0];
    return Math.pow(10, Math.round(Math.log(span) / Math.LN10) - 1);
  }
  function d3_scale_linearTickRange(domain, m) {
    var extent = d3_scaleExtent(domain), span = extent[1] - extent[0], step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)), err = m / span * step;
    if (err <= .15) step *= 10; else if (err <= .35) step *= 5; else if (err <= .75) step *= 2;
    extent[0] = Math.ceil(extent[0] / step) * step;
    extent[1] = Math.floor(extent[1] / step) * step + step * .5;
    extent[2] = step;
    return extent;
  }
  function d3_scale_linearTicks(domain, m) {
    return d3.range.apply(d3, d3_scale_linearTickRange(domain, m));
  }
  function d3_scale_linearTickFormat(domain, m, format) {
    var precision = -Math.floor(Math.log(d3_scale_linearTickRange(domain, m)[2]) / Math.LN10 + .01);
    return d3.format(format ? format.replace(d3_format_re, function(a, b, c, d, e, f, g, h, i, j) {
      return [ b, c, d, e, f, g, h, i || "." + (precision - (j === "%") * 2), j ].join("");
    }) : ",." + precision + "f");
  }
  d3.scale.log = function() {
    return d3_scale_log(d3.scale.linear().domain([ 0, 1 ]), 10, true, [ 1, 10 ]);
  };
  function d3_scale_log(linear, base, positive, domain) {
    function log(x) {
      return (positive ? Math.log(x < 0 ? 0 : x) : -Math.log(x > 0 ? 0 : -x)) / Math.log(base);
    }
    function pow(x) {
      return positive ? Math.pow(base, x) : -Math.pow(base, -x);
    }
    function scale(x) {
      return linear(log(x));
    }
    scale.invert = function(x) {
      return pow(linear.invert(x));
    };
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      positive = x[0] >= 0;
      linear.domain((domain = x.map(Number)).map(log));
      return scale;
    };
    scale.base = function(_) {
      if (!arguments.length) return base;
      base = +_;
      linear.domain(domain.map(log));
      return scale;
    };
    scale.nice = function() {
      var niced = d3_scale_nice(domain.map(log), positive ? Math : d3_scale_logNiceNegative);
      linear.domain(niced);
      domain = niced.map(pow);
      return scale;
    };
    scale.ticks = function() {
      var extent = d3_scaleExtent(domain), ticks = [];
      if (extent.every(isFinite)) {
        var u = extent[0], v = extent[1], i = Math.floor(log(u)), j = Math.ceil(log(v)), n = base % 1 ? 2 : base;
        if (positive) {
          for (;i < j; i++) for (var k = 1; k < n; k++) ticks.push(pow(i) * k);
          ticks.push(pow(i));
        } else {
          ticks.push(pow(i));
          for (;i++ < j; ) for (var k = n - 1; k > 0; k--) ticks.push(pow(i) * k);
        }
        for (i = 0; ticks[i] < u; i++) {}
        for (j = ticks.length; ticks[j - 1] > v; j--) {}
        ticks = ticks.slice(i, j);
      }
      return ticks;
    };
    scale.tickFormat = function(n, format) {
      if (!arguments.length) return d3_scale_logFormat;
      if (arguments.length < 2) format = d3_scale_logFormat; else if (typeof format !== "function") format = d3.format(format);
      var k = Math.max(.1, n / scale.ticks().length), f = positive ? (e = 1e-12, Math.ceil) : (e = -1e-12, 
      Math.floor), e;
      return function(d) {
        return d / pow(f(log(d) + e)) <= k ? format(d) : "";
      };
    };
    scale.copy = function() {
      return d3_scale_log(linear.copy(), base, positive, domain);
    };
    return d3_scale_linearRebind(scale, linear);
  }
  var d3_scale_logFormat = d3.format(".0e"), d3_scale_logNiceNegative = {
    floor: function(x) {
      return -Math.ceil(-x);
    },
    ceil: function(x) {
      return -Math.floor(-x);
    }
  };
  d3.scale.pow = function() {
    return d3_scale_pow(d3.scale.linear(), 1, [ 0, 1 ]);
  };
  function d3_scale_pow(linear, exponent, domain) {
    var powp = d3_scale_powPow(exponent), powb = d3_scale_powPow(1 / exponent);
    function scale(x) {
      return linear(powp(x));
    }
    scale.invert = function(x) {
      return powb(linear.invert(x));
    };
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      linear.domain((domain = x.map(Number)).map(powp));
      return scale;
    };
    scale.ticks = function(m) {
      return d3_scale_linearTicks(domain, m);
    };
    scale.tickFormat = function(m, format) {
      return d3_scale_linearTickFormat(domain, m, format);
    };
    scale.nice = function(m) {
      return scale.domain(d3_scale_linearNice(domain, m));
    };
    scale.exponent = function(x) {
      if (!arguments.length) return exponent;
      powp = d3_scale_powPow(exponent = x);
      powb = d3_scale_powPow(1 / exponent);
      linear.domain(domain.map(powp));
      return scale;
    };
    scale.copy = function() {
      return d3_scale_pow(linear.copy(), exponent, domain);
    };
    return d3_scale_linearRebind(scale, linear);
  }
  function d3_scale_powPow(e) {
    return function(x) {
      return x < 0 ? -Math.pow(-x, e) : Math.pow(x, e);
    };
  }
  d3.scale.sqrt = function() {
    return d3.scale.pow().exponent(.5);
  };
  d3.scale.ordinal = function() {
    return d3_scale_ordinal([], {
      t: "range",
      a: [ [] ]
    });
  };
  function d3_scale_ordinal(domain, ranger) {
    var index, range, rangeBand;
    function scale(x) {
      return range[((index.get(x) || index.set(x, domain.push(x))) - 1) % range.length];
    }
    function steps(start, step) {
      return d3.range(domain.length).map(function(i) {
        return start + step * i;
      });
    }
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      domain = [];
      index = new d3_Map();
      var i = -1, n = x.length, xi;
      while (++i < n) if (!index.has(xi = x[i])) index.set(xi, domain.push(xi));
      return scale[ranger.t].apply(scale, ranger.a);
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      rangeBand = 0;
      ranger = {
        t: "range",
        a: arguments
      };
      return scale;
    };
    scale.rangePoints = function(x, padding) {
      if (arguments.length < 2) padding = 0;
      var start = x[0], stop = x[1], step = (stop - start) / (Math.max(1, domain.length - 1) + padding);
      range = steps(domain.length < 2 ? (start + stop) / 2 : start + step * padding / 2, step);
      rangeBand = 0;
      ranger = {
        t: "rangePoints",
        a: arguments
      };
      return scale;
    };
    scale.rangeBands = function(x, padding, outerPadding) {
      if (arguments.length < 2) padding = 0;
      if (arguments.length < 3) outerPadding = padding;
      var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = (stop - start) / (domain.length - padding + 2 * outerPadding);
      range = steps(start + step * outerPadding, step);
      if (reverse) range.reverse();
      rangeBand = step * (1 - padding);
      ranger = {
        t: "rangeBands",
        a: arguments
      };
      return scale;
    };
    scale.rangeRoundBands = function(x, padding, outerPadding) {
      if (arguments.length < 2) padding = 0;
      if (arguments.length < 3) outerPadding = padding;
      var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = Math.floor((stop - start) / (domain.length - padding + 2 * outerPadding)), error = stop - start - (domain.length - padding) * step;
      range = steps(start + Math.round(error / 2), step);
      if (reverse) range.reverse();
      rangeBand = Math.round(step * (1 - padding));
      ranger = {
        t: "rangeRoundBands",
        a: arguments
      };
      return scale;
    };
    scale.rangeBand = function() {
      return rangeBand;
    };
    scale.rangeExtent = function() {
      return d3_scaleExtent(ranger.a[0]);
    };
    scale.copy = function() {
      return d3_scale_ordinal(domain, ranger);
    };
    return scale.domain(domain);
  }
  d3.scale.category10 = function() {
    return d3.scale.ordinal().range(d3_category10);
  };
  d3.scale.category20 = function() {
    return d3.scale.ordinal().range(d3_category20);
  };
  d3.scale.category20b = function() {
    return d3.scale.ordinal().range(d3_category20b);
  };
  d3.scale.category20c = function() {
    return d3.scale.ordinal().range(d3_category20c);
  };
  var d3_category10 = [ 2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175 ].map(d3_rgbString);
  var d3_category20 = [ 2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725 ].map(d3_rgbString);
  var d3_category20b = [ 3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654 ].map(d3_rgbString);
  var d3_category20c = [ 3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081 ].map(d3_rgbString);
  d3.scale.quantile = function() {
    return d3_scale_quantile([], []);
  };
  function d3_scale_quantile(domain, range) {
    var thresholds;
    function rescale() {
      var k = 0, q = range.length;
      thresholds = [];
      while (++k < q) thresholds[k - 1] = d3.quantile(domain, k / q);
      return scale;
    }
    function scale(x) {
      if (!isNaN(x = +x)) return range[d3.bisect(thresholds, x)];
    }
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      domain = x.filter(function(d) {
        return !isNaN(d);
      }).sort(d3.ascending);
      return rescale();
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      return rescale();
    };
    scale.quantiles = function() {
      return thresholds;
    };
    scale.invertExtent = function(y) {
      y = range.indexOf(y);
      return y < 0 ? [ NaN, NaN ] : [ y > 0 ? thresholds[y - 1] : domain[0], y < thresholds.length ? thresholds[y] : domain[domain.length - 1] ];
    };
    scale.copy = function() {
      return d3_scale_quantile(domain, range);
    };
    return rescale();
  }
  d3.scale.quantize = function() {
    return d3_scale_quantize(0, 1, [ 0, 1 ]);
  };
  function d3_scale_quantize(x0, x1, range) {
    var kx, i;
    function scale(x) {
      return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
    }
    function rescale() {
      kx = range.length / (x1 - x0);
      i = range.length - 1;
      return scale;
    }
    scale.domain = function(x) {
      if (!arguments.length) return [ x0, x1 ];
      x0 = +x[0];
      x1 = +x[x.length - 1];
      return rescale();
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      return rescale();
    };
    scale.invertExtent = function(y) {
      y = range.indexOf(y);
      y = y < 0 ? NaN : y / kx + x0;
      return [ y, y + 1 / kx ];
    };
    scale.copy = function() {
      return d3_scale_quantize(x0, x1, range);
    };
    return rescale();
  }
  d3.scale.threshold = function() {
    return d3_scale_threshold([ .5 ], [ 0, 1 ]);
  };
  function d3_scale_threshold(domain, range) {
    function scale(x) {
      if (x <= x) return range[d3.bisect(domain, x)];
    }
    scale.domain = function(_) {
      if (!arguments.length) return domain;
      domain = _;
      return scale;
    };
    scale.range = function(_) {
      if (!arguments.length) return range;
      range = _;
      return scale;
    };
    scale.invertExtent = function(y) {
      y = range.indexOf(y);
      return [ domain[y - 1], domain[y] ];
    };
    scale.copy = function() {
      return d3_scale_threshold(domain, range);
    };
    return scale;
  }
  d3.scale.identity = function() {
    return d3_scale_identity([ 0, 1 ]);
  };
  function d3_scale_identity(domain) {
    function identity(x) {
      return +x;
    }
    identity.invert = identity;
    identity.domain = identity.range = function(x) {
      if (!arguments.length) return domain;
      domain = x.map(identity);
      return identity;
    };
    identity.ticks = function(m) {
      return d3_scale_linearTicks(domain, m);
    };
    identity.tickFormat = function(m, format) {
      return d3_scale_linearTickFormat(domain, m, format);
    };
    identity.copy = function() {
      return d3_scale_identity(domain);
    };
    return identity;
  }
  d3.svg.arc = function() {
    var innerRadius = d3_svg_arcInnerRadius, outerRadius = d3_svg_arcOuterRadius, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle;
    function arc() {
      var r0 = innerRadius.apply(this, arguments), r1 = outerRadius.apply(this, arguments), a0 = startAngle.apply(this, arguments) + d3_svg_arcOffset, a1 = endAngle.apply(this, arguments) + d3_svg_arcOffset, da = (a1 < a0 && (da = a0, 
      a0 = a1, a1 = da), a1 - a0), df = da < π ? "0" : "1", c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
      return da >= d3_svg_arcMax ? r0 ? "M0," + r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + -r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + r1 + "M0," + r0 + "A" + r0 + "," + r0 + " 0 1,0 0," + -r0 + "A" + r0 + "," + r0 + " 0 1,0 0," + r0 + "Z" : "M0," + r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + -r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + r1 + "Z" : r0 ? "M" + r1 * c0 + "," + r1 * s0 + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1 + "L" + r0 * c1 + "," + r0 * s1 + "A" + r0 + "," + r0 + " 0 " + df + ",0 " + r0 * c0 + "," + r0 * s0 + "Z" : "M" + r1 * c0 + "," + r1 * s0 + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1 + "L0,0" + "Z";
    }
    arc.innerRadius = function(v) {
      if (!arguments.length) return innerRadius;
      innerRadius = d3_functor(v);
      return arc;
    };
    arc.outerRadius = function(v) {
      if (!arguments.length) return outerRadius;
      outerRadius = d3_functor(v);
      return arc;
    };
    arc.startAngle = function(v) {
      if (!arguments.length) return startAngle;
      startAngle = d3_functor(v);
      return arc;
    };
    arc.endAngle = function(v) {
      if (!arguments.length) return endAngle;
      endAngle = d3_functor(v);
      return arc;
    };
    arc.centroid = function() {
      var r = (innerRadius.apply(this, arguments) + outerRadius.apply(this, arguments)) / 2, a = (startAngle.apply(this, arguments) + endAngle.apply(this, arguments)) / 2 + d3_svg_arcOffset;
      return [ Math.cos(a) * r, Math.sin(a) * r ];
    };
    return arc;
  };
  var d3_svg_arcOffset = -π / 2, d3_svg_arcMax = 2 * π - 1e-6;
  function d3_svg_arcInnerRadius(d) {
    return d.innerRadius;
  }
  function d3_svg_arcOuterRadius(d) {
    return d.outerRadius;
  }
  function d3_svg_arcStartAngle(d) {
    return d.startAngle;
  }
  function d3_svg_arcEndAngle(d) {
    return d.endAngle;
  }
  d3.svg.line.radial = function() {
    var line = d3_svg_line(d3_svg_lineRadial);
    line.radius = line.x, delete line.x;
    line.angle = line.y, delete line.y;
    return line;
  };
  function d3_svg_lineRadial(points) {
    var point, i = -1, n = points.length, r, a;
    while (++i < n) {
      point = points[i];
      r = point[0];
      a = point[1] + d3_svg_arcOffset;
      point[0] = r * Math.cos(a);
      point[1] = r * Math.sin(a);
    }
    return points;
  }
  function d3_svg_area(projection) {
    var x0 = d3_svg_lineX, x1 = d3_svg_lineX, y0 = 0, y1 = d3_svg_lineY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, interpolateReverse = interpolate, L = "L", tension = .7;
    function area(data) {
      var segments = [], points0 = [], points1 = [], i = -1, n = data.length, d, fx0 = d3_functor(x0), fy0 = d3_functor(y0), fx1 = x0 === x1 ? function() {
        return x;
      } : d3_functor(x1), fy1 = y0 === y1 ? function() {
        return y;
      } : d3_functor(y1), x, y;
      function segment() {
        segments.push("M", interpolate(projection(points1), tension), L, interpolateReverse(projection(points0.reverse()), tension), "Z");
      }
      while (++i < n) {
        if (defined.call(this, d = data[i], i)) {
          points0.push([ x = +fx0.call(this, d, i), y = +fy0.call(this, d, i) ]);
          points1.push([ +fx1.call(this, d, i), +fy1.call(this, d, i) ]);
        } else if (points0.length) {
          segment();
          points0 = [];
          points1 = [];
        }
      }
      if (points0.length) segment();
      return segments.length ? segments.join("") : null;
    }
    area.x = function(_) {
      if (!arguments.length) return x1;
      x0 = x1 = _;
      return area;
    };
    area.x0 = function(_) {
      if (!arguments.length) return x0;
      x0 = _;
      return area;
    };
    area.x1 = function(_) {
      if (!arguments.length) return x1;
      x1 = _;
      return area;
    };
    area.y = function(_) {
      if (!arguments.length) return y1;
      y0 = y1 = _;
      return area;
    };
    area.y0 = function(_) {
      if (!arguments.length) return y0;
      y0 = _;
      return area;
    };
    area.y1 = function(_) {
      if (!arguments.length) return y1;
      y1 = _;
      return area;
    };
    area.defined = function(_) {
      if (!arguments.length) return defined;
      defined = _;
      return area;
    };
    area.interpolate = function(_) {
      if (!arguments.length) return interpolateKey;
      if (typeof _ === "function") interpolateKey = interpolate = _; else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
      interpolateReverse = interpolate.reverse || interpolate;
      L = interpolate.closed ? "M" : "L";
      return area;
    };
    area.tension = function(_) {
      if (!arguments.length) return tension;
      tension = _;
      return area;
    };
    return area;
  }
  d3_svg_lineStepBefore.reverse = d3_svg_lineStepAfter;
  d3_svg_lineStepAfter.reverse = d3_svg_lineStepBefore;
  d3.svg.area = function() {
    return d3_svg_area(d3_identity);
  };
  d3.svg.area.radial = function() {
    var area = d3_svg_area(d3_svg_lineRadial);
    area.radius = area.x, delete area.x;
    area.innerRadius = area.x0, delete area.x0;
    area.outerRadius = area.x1, delete area.x1;
    area.angle = area.y, delete area.y;
    area.startAngle = area.y0, delete area.y0;
    area.endAngle = area.y1, delete area.y1;
    return area;
  };
  d3.svg.chord = function() {
    var source = d3_source, target = d3_target, radius = d3_svg_chordRadius, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle;
    function chord(d, i) {
      var s = subgroup(this, source, d, i), t = subgroup(this, target, d, i);
      return "M" + s.p0 + arc(s.r, s.p1, s.a1 - s.a0) + (equals(s, t) ? curve(s.r, s.p1, s.r, s.p0) : curve(s.r, s.p1, t.r, t.p0) + arc(t.r, t.p1, t.a1 - t.a0) + curve(t.r, t.p1, s.r, s.p0)) + "Z";
    }
    function subgroup(self, f, d, i) {
      var subgroup = f.call(self, d, i), r = radius.call(self, subgroup, i), a0 = startAngle.call(self, subgroup, i) + d3_svg_arcOffset, a1 = endAngle.call(self, subgroup, i) + d3_svg_arcOffset;
      return {
        r: r,
        a0: a0,
        a1: a1,
        p0: [ r * Math.cos(a0), r * Math.sin(a0) ],
        p1: [ r * Math.cos(a1), r * Math.sin(a1) ]
      };
    }
    function equals(a, b) {
      return a.a0 == b.a0 && a.a1 == b.a1;
    }
    function arc(r, p, a) {
      return "A" + r + "," + r + " 0 " + +(a > π) + ",1 " + p;
    }
    function curve(r0, p0, r1, p1) {
      return "Q 0,0 " + p1;
    }
    chord.radius = function(v) {
      if (!arguments.length) return radius;
      radius = d3_functor(v);
      return chord;
    };
    chord.source = function(v) {
      if (!arguments.length) return source;
      source = d3_functor(v);
      return chord;
    };
    chord.target = function(v) {
      if (!arguments.length) return target;
      target = d3_functor(v);
      return chord;
    };
    chord.startAngle = function(v) {
      if (!arguments.length) return startAngle;
      startAngle = d3_functor(v);
      return chord;
    };
    chord.endAngle = function(v) {
      if (!arguments.length) return endAngle;
      endAngle = d3_functor(v);
      return chord;
    };
    return chord;
  };
  function d3_svg_chordRadius(d) {
    return d.radius;
  }
  d3.svg.diagonal = function() {
    var source = d3_source, target = d3_target, projection = d3_svg_diagonalProjection;
    function diagonal(d, i) {
      var p0 = source.call(this, d, i), p3 = target.call(this, d, i), m = (p0.y + p3.y) / 2, p = [ p0, {
        x: p0.x,
        y: m
      }, {
        x: p3.x,
        y: m
      }, p3 ];
      p = p.map(projection);
      return "M" + p[0] + "C" + p[1] + " " + p[2] + " " + p[3];
    }
    diagonal.source = function(x) {
      if (!arguments.length) return source;
      source = d3_functor(x);
      return diagonal;
    };
    diagonal.target = function(x) {
      if (!arguments.length) return target;
      target = d3_functor(x);
      return diagonal;
    };
    diagonal.projection = function(x) {
      if (!arguments.length) return projection;
      projection = x;
      return diagonal;
    };
    return diagonal;
  };
  function d3_svg_diagonalProjection(d) {
    return [ d.x, d.y ];
  }
  d3.svg.diagonal.radial = function() {
    var diagonal = d3.svg.diagonal(), projection = d3_svg_diagonalProjection, projection_ = diagonal.projection;
    diagonal.projection = function(x) {
      return arguments.length ? projection_(d3_svg_diagonalRadialProjection(projection = x)) : projection;
    };
    return diagonal;
  };
  function d3_svg_diagonalRadialProjection(projection) {
    return function() {
      var d = projection.apply(this, arguments), r = d[0], a = d[1] + d3_svg_arcOffset;
      return [ r * Math.cos(a), r * Math.sin(a) ];
    };
  }
  d3.svg.symbol = function() {
    var type = d3_svg_symbolType, size = d3_svg_symbolSize;
    function symbol(d, i) {
      return (d3_svg_symbols.get(type.call(this, d, i)) || d3_svg_symbolCircle)(size.call(this, d, i));
    }
    symbol.type = function(x) {
      if (!arguments.length) return type;
      type = d3_functor(x);
      return symbol;
    };
    symbol.size = function(x) {
      if (!arguments.length) return size;
      size = d3_functor(x);
      return symbol;
    };
    return symbol;
  };
  function d3_svg_symbolSize() {
    return 64;
  }
  function d3_svg_symbolType() {
    return "circle";
  }
  function d3_svg_symbolCircle(size) {
    var r = Math.sqrt(size / π);
    return "M0," + r + "A" + r + "," + r + " 0 1,1 0," + -r + "A" + r + "," + r + " 0 1,1 0," + r + "Z";
  }
  var d3_svg_symbols = d3.map({
    circle: d3_svg_symbolCircle,
    cross: function(size) {
      var r = Math.sqrt(size / 5) / 2;
      return "M" + -3 * r + "," + -r + "H" + -r + "V" + -3 * r + "H" + r + "V" + -r + "H" + 3 * r + "V" + r + "H" + r + "V" + 3 * r + "H" + -r + "V" + r + "H" + -3 * r + "Z";
    },
    diamond: function(size) {
      var ry = Math.sqrt(size / (2 * d3_svg_symbolTan30)), rx = ry * d3_svg_symbolTan30;
      return "M0," + -ry + "L" + rx + ",0" + " 0," + ry + " " + -rx + ",0" + "Z";
    },
    square: function(size) {
      var r = Math.sqrt(size) / 2;
      return "M" + -r + "," + -r + "L" + r + "," + -r + " " + r + "," + r + " " + -r + "," + r + "Z";
    },
    "triangle-down": function(size) {
      var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
      return "M0," + ry + "L" + rx + "," + -ry + " " + -rx + "," + -ry + "Z";
    },
    "triangle-up": function(size) {
      var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
      return "M0," + -ry + "L" + rx + "," + ry + " " + -rx + "," + ry + "Z";
    }
  });
  d3.svg.symbolTypes = d3_svg_symbols.keys();
  var d3_svg_symbolSqrt3 = Math.sqrt(3), d3_svg_symbolTan30 = Math.tan(30 * d3_radians);
  function d3_transition(groups, id) {
    d3_subclass(groups, d3_transitionPrototype);
    groups.id = id;
    return groups;
  }
  var d3_transitionPrototype = [], d3_transitionId = 0, d3_transitionInheritId, d3_transitionInherit;
  d3_transitionPrototype.call = d3_selectionPrototype.call;
  d3_transitionPrototype.empty = d3_selectionPrototype.empty;
  d3_transitionPrototype.node = d3_selectionPrototype.node;
  d3_transitionPrototype.size = d3_selectionPrototype.size;
  d3.transition = function(selection) {
    return arguments.length ? d3_transitionInheritId ? selection.transition() : selection : d3_selectionRoot.transition();
  };
  d3.transition.prototype = d3_transitionPrototype;
  d3_transitionPrototype.select = function(selector) {
    var id = this.id, subgroups = [], subgroup, subnode, node;
    selector = d3_selection_selector(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if ((node = group[i]) && (subnode = selector.call(node, node.__data__, i, j))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          d3_transitionNode(subnode, i, id, node.__transition__[id]);
          subgroup.push(subnode);
        } else {
          subgroup.push(null);
        }
      }
    }
    return d3_transition(subgroups, id);
  };
  d3_transitionPrototype.selectAll = function(selector) {
    var id = this.id, subgroups = [], subgroup, subnodes, node, subnode, transition;
    selector = d3_selection_selectorAll(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          transition = node.__transition__[id];
          subnodes = selector.call(node, node.__data__, i, j);
          subgroups.push(subgroup = []);
          for (var k = -1, o = subnodes.length; ++k < o; ) {
            if (subnode = subnodes[k]) d3_transitionNode(subnode, k, id, transition);
            subgroup.push(subnode);
          }
        }
      }
    }
    return d3_transition(subgroups, id);
  };
  d3_transitionPrototype.filter = function(filter) {
    var subgroups = [], subgroup, group, node;
    if (typeof filter !== "function") filter = d3_selection_filter(filter);
    for (var j = 0, m = this.length; j < m; j++) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
        if ((node = group[i]) && filter.call(node, node.__data__, i)) {
          subgroup.push(node);
        }
      }
    }
    return d3_transition(subgroups, this.id);
  };
  d3_transitionPrototype.tween = function(name, tween) {
    var id = this.id;
    if (arguments.length < 2) return this.node().__transition__[id].tween.get(name);
    return d3_selection_each(this, tween == null ? function(node) {
      node.__transition__[id].tween.remove(name);
    } : function(node) {
      node.__transition__[id].tween.set(name, tween);
    });
  };
  function d3_transition_tween(groups, name, value, tween) {
    var id = groups.id;
    return d3_selection_each(groups, typeof value === "function" ? function(node, i, j) {
      node.__transition__[id].tween.set(name, tween(value.call(node, node.__data__, i, j)));
    } : (value = tween(value), function(node) {
      node.__transition__[id].tween.set(name, value);
    }));
  }
  d3_transitionPrototype.attr = function(nameNS, value) {
    if (arguments.length < 2) {
      for (value in nameNS) this.attr(value, nameNS[value]);
      return this;
    }
    var interpolate = nameNS == "transform" ? d3_interpolateTransform : d3_interpolate, name = d3.ns.qualify(nameNS);
    function attrNull() {
      this.removeAttribute(name);
    }
    function attrNullNS() {
      this.removeAttributeNS(name.space, name.local);
    }
    function attrTween(b) {
      return b == null ? attrNull : (b += "", function() {
        var a = this.getAttribute(name), i;
        return a !== b && (i = interpolate(a, b), function(t) {
          this.setAttribute(name, i(t));
        });
      });
    }
    function attrTweenNS(b) {
      return b == null ? attrNullNS : (b += "", function() {
        var a = this.getAttributeNS(name.space, name.local), i;
        return a !== b && (i = interpolate(a, b), function(t) {
          this.setAttributeNS(name.space, name.local, i(t));
        });
      });
    }
    return d3_transition_tween(this, "attr." + nameNS, value, name.local ? attrTweenNS : attrTween);
  };
  d3_transitionPrototype.attrTween = function(nameNS, tween) {
    var name = d3.ns.qualify(nameNS);
    function attrTween(d, i) {
      var f = tween.call(this, d, i, this.getAttribute(name));
      return f && function(t) {
        this.setAttribute(name, f(t));
      };
    }
    function attrTweenNS(d, i) {
      var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
      return f && function(t) {
        this.setAttributeNS(name.space, name.local, f(t));
      };
    }
    return this.tween("attr." + nameNS, name.local ? attrTweenNS : attrTween);
  };
  d3_transitionPrototype.style = function(name, value, priority) {
    var n = arguments.length;
    if (n < 3) {
      if (typeof name !== "string") {
        if (n < 2) value = "";
        for (priority in name) this.style(priority, name[priority], value);
        return this;
      }
      priority = "";
    }
    function styleNull() {
      this.style.removeProperty(name);
    }
    function styleString(b) {
      return b == null ? styleNull : (b += "", function() {
        var a = d3_window.getComputedStyle(this, null).getPropertyValue(name), i;
        return a !== b && (i = d3_interpolate(a, b), function(t) {
          this.style.setProperty(name, i(t), priority);
        });
      });
    }
    return d3_transition_tween(this, "style." + name, value, styleString);
  };
  d3_transitionPrototype.styleTween = function(name, tween, priority) {
    if (arguments.length < 3) priority = "";
    function styleTween(d, i) {
      var f = tween.call(this, d, i, d3_window.getComputedStyle(this, null).getPropertyValue(name));
      return f && function(t) {
        this.style.setProperty(name, f(t), priority);
      };
    }
    return this.tween("style." + name, styleTween);
  };
  d3_transitionPrototype.text = function(value) {
    return d3_transition_tween(this, "text", value, d3_transition_text);
  };
  function d3_transition_text(b) {
    if (b == null) b = "";
    return function() {
      this.textContent = b;
    };
  }
  d3_transitionPrototype.remove = function() {
    return this.each("end.transition", function() {
      var p;
      if (!this.__transition__ && (p = this.parentNode)) p.removeChild(this);
    });
  };
  d3_transitionPrototype.ease = function(value) {
    var id = this.id;
    if (arguments.length < 1) return this.node().__transition__[id].ease;
    if (typeof value !== "function") value = d3.ease.apply(d3, arguments);
    return d3_selection_each(this, function(node) {
      node.__transition__[id].ease = value;
    });
  };
  d3_transitionPrototype.delay = function(value) {
    var id = this.id;
    return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
      node.__transition__[id].delay = value.call(node, node.__data__, i, j) | 0;
    } : (value |= 0, function(node) {
      node.__transition__[id].delay = value;
    }));
  };
  d3_transitionPrototype.duration = function(value) {
    var id = this.id;
    return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
      node.__transition__[id].duration = Math.max(1, value.call(node, node.__data__, i, j) | 0);
    } : (value = Math.max(1, value | 0), function(node) {
      node.__transition__[id].duration = value;
    }));
  };
  d3_transitionPrototype.each = function(type, listener) {
    var id = this.id;
    if (arguments.length < 2) {
      var inherit = d3_transitionInherit, inheritId = d3_transitionInheritId;
      d3_transitionInheritId = id;
      d3_selection_each(this, function(node, i, j) {
        d3_transitionInherit = node.__transition__[id];
        type.call(node, node.__data__, i, j);
      });
      d3_transitionInherit = inherit;
      d3_transitionInheritId = inheritId;
    } else {
      d3_selection_each(this, function(node) {
        var transition = node.__transition__[id];
        (transition.event || (transition.event = d3.dispatch("start", "end"))).on(type, listener);
      });
    }
    return this;
  };
  d3_transitionPrototype.transition = function() {
    var id0 = this.id, id1 = ++d3_transitionId, subgroups = [], subgroup, group, node, transition;
    for (var j = 0, m = this.length; j < m; j++) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
        if (node = group[i]) {
          transition = Object.create(node.__transition__[id0]);
          transition.delay += transition.duration;
          d3_transitionNode(node, i, id1, transition);
        }
        subgroup.push(node);
      }
    }
    return d3_transition(subgroups, id1);
  };
  function d3_transitionNode(node, i, id, inherit) {
    var lock = node.__transition__ || (node.__transition__ = {
      active: 0,
      count: 0
    }), transition = lock[id];
    if (!transition) {
      var time = inherit.time;
      transition = lock[id] = {
        tween: new d3_Map(),
        time: time,
        ease: inherit.ease,
        delay: inherit.delay,
        duration: inherit.duration
      };
      ++lock.count;
      d3.timer(function(elapsed) {
        var d = node.__data__, ease = transition.ease, delay = transition.delay, duration = transition.duration, tweened = [];
        if (delay <= elapsed) return start(elapsed);
        d3_timer_replace(start, delay, time);
        function start(elapsed) {
          if (lock.active > id) return stop();
          lock.active = id;
          transition.event && transition.event.start.call(node, d, i);
          transition.tween.forEach(function(key, value) {
            if (value = value.call(node, d, i)) {
              tweened.push(value);
            }
          });
          if (tick(elapsed)) return 1;
          d3_timer_replace(tick, 0, time);
        }
        function tick(elapsed) {
          if (lock.active !== id) return stop();
          var t = (elapsed - delay) / duration, e = ease(t), n = tweened.length;
          while (n > 0) {
            tweened[--n].call(node, e);
          }
          if (t >= 1) {
            stop();
            transition.event && transition.event.end.call(node, d, i);
            return 1;
          }
        }
        function stop() {
          if (--lock.count) delete lock[id]; else delete node.__transition__;
          return 1;
        }
      }, 0, time);
    }
  }
  d3.svg.axis = function() {
    var scale = d3.scale.linear(), orient = d3_svg_axisDefaultOrient, tickMajorSize = 6, tickMinorSize = 6, tickEndSize = 6, tickPadding = 3, tickArguments_ = [ 10 ], tickValues = null, tickFormat_, tickSubdivide = 0;
    function axis(g) {
      g.each(function() {
        var g = d3.select(this);
        var ticks = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments_) : scale.domain() : tickValues, tickFormat = tickFormat_ == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments_) : String : tickFormat_;
        var subticks = d3_svg_axisSubdivide(scale, ticks, tickSubdivide), subtick = g.selectAll(".tick.minor").data(subticks, String), subtickEnter = subtick.enter().insert("line", ".tick").attr("class", "tick minor").style("opacity", 1e-6), subtickExit = d3.transition(subtick.exit()).style("opacity", 1e-6).remove(), subtickUpdate = d3.transition(subtick).style("opacity", 1);
        var tick = g.selectAll(".tick.major").data(ticks, String), tickEnter = tick.enter().insert("g", ".domain").attr("class", "tick major").style("opacity", 1e-6), tickExit = d3.transition(tick.exit()).style("opacity", 1e-6).remove(), tickUpdate = d3.transition(tick).style("opacity", 1), tickTransform;
        var range = d3_scaleRange(scale), path = g.selectAll(".domain").data([ 0 ]), pathUpdate = (path.enter().append("path").attr("class", "domain"), 
        d3.transition(path));
        var scale1 = scale.copy(), scale0 = this.__chart__ || scale1;
        this.__chart__ = scale1;
        tickEnter.append("line");
        tickEnter.append("text");
        var lineEnter = tickEnter.select("line"), lineUpdate = tickUpdate.select("line"), text = tick.select("text").text(tickFormat), textEnter = tickEnter.select("text"), textUpdate = tickUpdate.select("text");
        switch (orient) {
         case "bottom":
          {
            tickTransform = d3_svg_axisX;
            subtickEnter.attr("y2", tickMinorSize);
            subtickUpdate.attr("x2", 0).attr("y2", tickMinorSize);
            lineEnter.attr("y2", tickMajorSize);
            textEnter.attr("y", Math.max(tickMajorSize, 0) + tickPadding);
            lineUpdate.attr("x2", 0).attr("y2", tickMajorSize);
            textUpdate.attr("x", 0).attr("y", Math.max(tickMajorSize, 0) + tickPadding);
            text.attr("dy", ".71em").style("text-anchor", "middle");
            pathUpdate.attr("d", "M" + range[0] + "," + tickEndSize + "V0H" + range[1] + "V" + tickEndSize);
            break;
          }

         case "top":
          {
            tickTransform = d3_svg_axisX;
            subtickEnter.attr("y2", -tickMinorSize);
            subtickUpdate.attr("x2", 0).attr("y2", -tickMinorSize);
            lineEnter.attr("y2", -tickMajorSize);
            textEnter.attr("y", -(Math.max(tickMajorSize, 0) + tickPadding));
            lineUpdate.attr("x2", 0).attr("y2", -tickMajorSize);
            textUpdate.attr("x", 0).attr("y", -(Math.max(tickMajorSize, 0) + tickPadding));
            text.attr("dy", "0em").style("text-anchor", "middle");
            pathUpdate.attr("d", "M" + range[0] + "," + -tickEndSize + "V0H" + range[1] + "V" + -tickEndSize);
            break;
          }

         case "left":
          {
            tickTransform = d3_svg_axisY;
            subtickEnter.attr("x2", -tickMinorSize);
            subtickUpdate.attr("x2", -tickMinorSize).attr("y2", 0);
            lineEnter.attr("x2", -tickMajorSize);
            textEnter.attr("x", -(Math.max(tickMajorSize, 0) + tickPadding));
            lineUpdate.attr("x2", -tickMajorSize).attr("y2", 0);
            textUpdate.attr("x", -(Math.max(tickMajorSize, 0) + tickPadding)).attr("y", 0);
            text.attr("dy", ".32em").style("text-anchor", "end");
            pathUpdate.attr("d", "M" + -tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + -tickEndSize);
            break;
          }

         case "right":
          {
            tickTransform = d3_svg_axisY;
            subtickEnter.attr("x2", tickMinorSize);
            subtickUpdate.attr("x2", tickMinorSize).attr("y2", 0);
            lineEnter.attr("x2", tickMajorSize);
            textEnter.attr("x", Math.max(tickMajorSize, 0) + tickPadding);
            lineUpdate.attr("x2", tickMajorSize).attr("y2", 0);
            textUpdate.attr("x", Math.max(tickMajorSize, 0) + tickPadding).attr("y", 0);
            text.attr("dy", ".32em").style("text-anchor", "start");
            pathUpdate.attr("d", "M" + tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + tickEndSize);
            break;
          }
        }
        if (scale.rangeBand) {
          var dx = scale1.rangeBand() / 2, x = function(d) {
            return scale1(d) + dx;
          };
          tickEnter.call(tickTransform, x);
          tickUpdate.call(tickTransform, x);
        } else {
          tickEnter.call(tickTransform, scale0);
          tickUpdate.call(tickTransform, scale1);
          tickExit.call(tickTransform, scale1);
          subtickEnter.call(tickTransform, scale0);
          subtickUpdate.call(tickTransform, scale1);
          subtickExit.call(tickTransform, scale1);
        }
      });
    }
    axis.scale = function(x) {
      if (!arguments.length) return scale;
      scale = x;
      return axis;
    };
    axis.orient = function(x) {
      if (!arguments.length) return orient;
      orient = x in d3_svg_axisOrients ? x + "" : d3_svg_axisDefaultOrient;
      return axis;
    };
    axis.ticks = function() {
      if (!arguments.length) return tickArguments_;
      tickArguments_ = arguments;
      return axis;
    };
    axis.tickValues = function(x) {
      if (!arguments.length) return tickValues;
      tickValues = x;
      return axis;
    };
    axis.tickFormat = function(x) {
      if (!arguments.length) return tickFormat_;
      tickFormat_ = x;
      return axis;
    };
    axis.tickSize = function(x, y) {
      if (!arguments.length) return tickMajorSize;
      var n = arguments.length - 1;
      tickMajorSize = +x;
      tickMinorSize = n > 1 ? +y : tickMajorSize;
      tickEndSize = n > 0 ? +arguments[n] : tickMajorSize;
      return axis;
    };
    axis.tickPadding = function(x) {
      if (!arguments.length) return tickPadding;
      tickPadding = +x;
      return axis;
    };
    axis.tickSubdivide = function(x) {
      if (!arguments.length) return tickSubdivide;
      tickSubdivide = +x;
      return axis;
    };
    return axis;
  };
  var d3_svg_axisDefaultOrient = "bottom", d3_svg_axisOrients = {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  };
  function d3_svg_axisX(selection, x) {
    selection.attr("transform", function(d) {
      return "translate(" + x(d) + ",0)";
    });
  }
  function d3_svg_axisY(selection, y) {
    selection.attr("transform", function(d) {
      return "translate(0," + y(d) + ")";
    });
  }
  function d3_svg_axisSubdivide(scale, ticks, m) {
    subticks = [];
    if (m && ticks.length > 1) {
      var extent = d3_scaleExtent(scale.domain()), subticks, i = -1, n = ticks.length, d = (ticks[1] - ticks[0]) / ++m, j, v;
      while (++i < n) {
        for (j = m; --j > 0; ) {
          if ((v = +ticks[i] - j * d) >= extent[0]) {
            subticks.push(v);
          }
        }
      }
      for (--i, j = 0; ++j < m && (v = +ticks[i] + j * d) < extent[1]; ) {
        subticks.push(v);
      }
    }
    return subticks;
  }
  d3.svg.brush = function() {
    var event = d3_eventDispatch(brush, "brushstart", "brush", "brushend"), x = null, y = null, resizes = d3_svg_brushResizes[0], extent = [ [ 0, 0 ], [ 0, 0 ] ], clamp = [ true, true ], extentDomain;
    function brush(g) {
      g.each(function() {
        var g = d3.select(this), bg = g.selectAll(".background").data([ 0 ]), fg = g.selectAll(".extent").data([ 0 ]), tz = g.selectAll(".resize").data(resizes, String), e;
        g.style("pointer-events", "all").on("mousedown.brush", brushstart).on("touchstart.brush", brushstart);
        bg.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair");
        fg.enter().append("rect").attr("class", "extent").style("cursor", "move");
        tz.enter().append("g").attr("class", function(d) {
          return "resize " + d;
        }).style("cursor", function(d) {
          return d3_svg_brushCursor[d];
        }).append("rect").attr("x", function(d) {
          return /[ew]$/.test(d) ? -3 : null;
        }).attr("y", function(d) {
          return /^[ns]/.test(d) ? -3 : null;
        }).attr("width", 6).attr("height", 6).style("visibility", "hidden");
        tz.style("display", brush.empty() ? "none" : null);
        tz.exit().remove();
        if (x) {
          e = d3_scaleRange(x);
          bg.attr("x", e[0]).attr("width", e[1] - e[0]);
          redrawX(g);
        }
        if (y) {
          e = d3_scaleRange(y);
          bg.attr("y", e[0]).attr("height", e[1] - e[0]);
          redrawY(g);
        }
        redraw(g);
      });
    }
    function redraw(g) {
      g.selectAll(".resize").attr("transform", function(d) {
        return "translate(" + extent[+/e$/.test(d)][0] + "," + extent[+/^s/.test(d)][1] + ")";
      });
    }
    function redrawX(g) {
      g.select(".extent").attr("x", extent[0][0]);
      g.selectAll(".extent,.n>rect,.s>rect").attr("width", extent[1][0] - extent[0][0]);
    }
    function redrawY(g) {
      g.select(".extent").attr("y", extent[0][1]);
      g.selectAll(".extent,.e>rect,.w>rect").attr("height", extent[1][1] - extent[0][1]);
    }
    function brushstart() {
      var target = this, eventTarget = d3.select(d3.event.target), event_ = event.of(target, arguments), g = d3.select(target), resizing = eventTarget.datum(), resizingX = !/^(n|s)$/.test(resizing) && x, resizingY = !/^(e|w)$/.test(resizing) && y, dragging = eventTarget.classed("extent"), dragRestore = d3_event_dragSuppress(), center, origin = mouse(), offset;
      var w = d3.select(d3_window).on("keydown.brush", keydown).on("keyup.brush", keyup);
      if (d3.event.changedTouches) {
        w.on("touchmove.brush", brushmove).on("touchend.brush", brushend);
      } else {
        w.on("mousemove.brush", brushmove).on("mouseup.brush", brushend);
      }
      if (dragging) {
        origin[0] = extent[0][0] - origin[0];
        origin[1] = extent[0][1] - origin[1];
      } else if (resizing) {
        var ex = +/w$/.test(resizing), ey = +/^n/.test(resizing);
        offset = [ extent[1 - ex][0] - origin[0], extent[1 - ey][1] - origin[1] ];
        origin[0] = extent[ex][0];
        origin[1] = extent[ey][1];
      } else if (d3.event.altKey) center = origin.slice();
      g.style("pointer-events", "none").selectAll(".resize").style("display", null);
      d3.select("body").style("cursor", eventTarget.style("cursor"));
      event_({
        type: "brushstart"
      });
      brushmove();
      function mouse() {
        var touches = d3.event.changedTouches;
        return touches ? d3.touches(target, touches)[0] : d3.mouse(target);
      }
      function keydown() {
        if (d3.event.keyCode == 32) {
          if (!dragging) {
            center = null;
            origin[0] -= extent[1][0];
            origin[1] -= extent[1][1];
            dragging = 2;
          }
          d3_eventPreventDefault();
        }
      }
      function keyup() {
        if (d3.event.keyCode == 32 && dragging == 2) {
          origin[0] += extent[1][0];
          origin[1] += extent[1][1];
          dragging = 0;
          d3_eventPreventDefault();
        }
      }
      function brushmove() {
        var point = mouse(), moved = false;
        if (offset) {
          point[0] += offset[0];
          point[1] += offset[1];
        }
        if (!dragging) {
          if (d3.event.altKey) {
            if (!center) center = [ (extent[0][0] + extent[1][0]) / 2, (extent[0][1] + extent[1][1]) / 2 ];
            origin[0] = extent[+(point[0] < center[0])][0];
            origin[1] = extent[+(point[1] < center[1])][1];
          } else center = null;
        }
        if (resizingX && move1(point, x, 0)) {
          redrawX(g);
          moved = true;
        }
        if (resizingY && move1(point, y, 1)) {
          redrawY(g);
          moved = true;
        }
        if (moved) {
          redraw(g);
          event_({
            type: "brush",
            mode: dragging ? "move" : "resize"
          });
        }
      }
      function move1(point, scale, i) {
        var range = d3_scaleRange(scale), r0 = range[0], r1 = range[1], position = origin[i], size = extent[1][i] - extent[0][i], min, max;
        if (dragging) {
          r0 -= position;
          r1 -= size + position;
        }
        min = clamp[i] ? Math.max(r0, Math.min(r1, point[i])) : point[i];
        if (dragging) {
          max = (min += position) + size;
        } else {
          if (center) position = Math.max(r0, Math.min(r1, 2 * center[i] - min));
          if (position < min) {
            max = min;
            min = position;
          } else {
            max = position;
          }
        }
        if (extent[0][i] !== min || extent[1][i] !== max) {
          extentDomain = null;
          extent[0][i] = min;
          extent[1][i] = max;
          return true;
        }
      }
      function brushend() {
        brushmove();
        g.style("pointer-events", "all").selectAll(".resize").style("display", brush.empty() ? "none" : null);
        d3.select("body").style("cursor", null);
        w.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null);
        dragRestore();
        event_({
          type: "brushend"
        });
      }
    }
    brush.x = function(z) {
      if (!arguments.length) return x;
      x = z;
      resizes = d3_svg_brushResizes[!x << 1 | !y];
      return brush;
    };
    brush.y = function(z) {
      if (!arguments.length) return y;
      y = z;
      resizes = d3_svg_brushResizes[!x << 1 | !y];
      return brush;
    };
    brush.clamp = function(z) {
      if (!arguments.length) return x && y ? clamp : x || y ? clamp[+!x] : null;
      if (x && y) clamp = [ !!z[0], !!z[1] ]; else if (x || y) clamp[+!x] = !!z;
      return brush;
    };
    brush.extent = function(z) {
      var x0, x1, y0, y1, t;
      if (!arguments.length) {
        z = extentDomain || extent;
        if (x) {
          x0 = z[0][0], x1 = z[1][0];
          if (!extentDomain) {
            x0 = extent[0][0], x1 = extent[1][0];
            if (x.invert) x0 = x.invert(x0), x1 = x.invert(x1);
            if (x1 < x0) t = x0, x0 = x1, x1 = t;
          }
        }
        if (y) {
          y0 = z[0][1], y1 = z[1][1];
          if (!extentDomain) {
            y0 = extent[0][1], y1 = extent[1][1];
            if (y.invert) y0 = y.invert(y0), y1 = y.invert(y1);
            if (y1 < y0) t = y0, y0 = y1, y1 = t;
          }
        }
        return x && y ? [ [ x0, y0 ], [ x1, y1 ] ] : x ? [ x0, x1 ] : y && [ y0, y1 ];
      }
      extentDomain = [ [ 0, 0 ], [ 0, 0 ] ];
      if (x) {
        x0 = z[0], x1 = z[1];
        if (y) x0 = x0[0], x1 = x1[0];
        extentDomain[0][0] = x0, extentDomain[1][0] = x1;
        if (x.invert) x0 = x(x0), x1 = x(x1);
        if (x1 < x0) t = x0, x0 = x1, x1 = t;
        extent[0][0] = x0 | 0, extent[1][0] = x1 | 0;
      }
      if (y) {
        y0 = z[0], y1 = z[1];
        if (x) y0 = y0[1], y1 = y1[1];
        extentDomain[0][1] = y0, extentDomain[1][1] = y1;
        if (y.invert) y0 = y(y0), y1 = y(y1);
        if (y1 < y0) t = y0, y0 = y1, y1 = t;
        extent[0][1] = y0 | 0, extent[1][1] = y1 | 0;
      }
      return brush;
    };
    brush.clear = function() {
      extentDomain = null;
      extent[0][0] = extent[0][1] = extent[1][0] = extent[1][1] = 0;
      return brush;
    };
    brush.empty = function() {
      return x && extent[0][0] === extent[1][0] || y && extent[0][1] === extent[1][1];
    };
    return d3.rebind(brush, event, "on");
  };
  var d3_svg_brushCursor = {
    n: "ns-resize",
    e: "ew-resize",
    s: "ns-resize",
    w: "ew-resize",
    nw: "nwse-resize",
    ne: "nesw-resize",
    se: "nwse-resize",
    sw: "nesw-resize"
  };
  var d3_svg_brushResizes = [ [ "n", "e", "s", "w", "nw", "ne", "se", "sw" ], [ "e", "w" ], [ "n", "s" ], [] ];
  d3.time = {};
  var d3_time = Date, d3_time_daySymbols = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
  function d3_time_utc() {
    this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0]);
  }
  d3_time_utc.prototype = {
    getDate: function() {
      return this._.getUTCDate();
    },
    getDay: function() {
      return this._.getUTCDay();
    },
    getFullYear: function() {
      return this._.getUTCFullYear();
    },
    getHours: function() {
      return this._.getUTCHours();
    },
    getMilliseconds: function() {
      return this._.getUTCMilliseconds();
    },
    getMinutes: function() {
      return this._.getUTCMinutes();
    },
    getMonth: function() {
      return this._.getUTCMonth();
    },
    getSeconds: function() {
      return this._.getUTCSeconds();
    },
    getTime: function() {
      return this._.getTime();
    },
    getTimezoneOffset: function() {
      return 0;
    },
    valueOf: function() {
      return this._.valueOf();
    },
    setDate: function() {
      d3_time_prototype.setUTCDate.apply(this._, arguments);
    },
    setDay: function() {
      d3_time_prototype.setUTCDay.apply(this._, arguments);
    },
    setFullYear: function() {
      d3_time_prototype.setUTCFullYear.apply(this._, arguments);
    },
    setHours: function() {
      d3_time_prototype.setUTCHours.apply(this._, arguments);
    },
    setMilliseconds: function() {
      d3_time_prototype.setUTCMilliseconds.apply(this._, arguments);
    },
    setMinutes: function() {
      d3_time_prototype.setUTCMinutes.apply(this._, arguments);
    },
    setMonth: function() {
      d3_time_prototype.setUTCMonth.apply(this._, arguments);
    },
    setSeconds: function() {
      d3_time_prototype.setUTCSeconds.apply(this._, arguments);
    },
    setTime: function() {
      d3_time_prototype.setTime.apply(this._, arguments);
    }
  };
  var d3_time_prototype = Date.prototype;
  var d3_time_formatDateTime = "%a %b %e %X %Y", d3_time_formatDate = "%m/%d/%Y", d3_time_formatTime = "%H:%M:%S";
  var d3_time_days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ], d3_time_dayAbbreviations = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ], d3_time_months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ], d3_time_monthAbbreviations = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  function d3_time_interval(local, step, number) {
    function round(date) {
      var d0 = local(date), d1 = offset(d0, 1);
      return date - d0 < d1 - date ? d0 : d1;
    }
    function ceil(date) {
      step(date = local(new d3_time(date - 1)), 1);
      return date;
    }
    function offset(date, k) {
      step(date = new d3_time(+date), k);
      return date;
    }
    function range(t0, t1, dt) {
      var time = ceil(t0), times = [];
      if (dt > 1) {
        while (time < t1) {
          if (!(number(time) % dt)) times.push(new Date(+time));
          step(time, 1);
        }
      } else {
        while (time < t1) times.push(new Date(+time)), step(time, 1);
      }
      return times;
    }
    function range_utc(t0, t1, dt) {
      try {
        d3_time = d3_time_utc;
        var utc = new d3_time_utc();
        utc._ = t0;
        return range(utc, t1, dt);
      } finally {
        d3_time = Date;
      }
    }
    local.floor = local;
    local.round = round;
    local.ceil = ceil;
    local.offset = offset;
    local.range = range;
    var utc = local.utc = d3_time_interval_utc(local);
    utc.floor = utc;
    utc.round = d3_time_interval_utc(round);
    utc.ceil = d3_time_interval_utc(ceil);
    utc.offset = d3_time_interval_utc(offset);
    utc.range = range_utc;
    return local;
  }
  function d3_time_interval_utc(method) {
    return function(date, k) {
      try {
        d3_time = d3_time_utc;
        var utc = new d3_time_utc();
        utc._ = date;
        return method(utc, k)._;
      } finally {
        d3_time = Date;
      }
    };
  }
  d3.time.year = d3_time_interval(function(date) {
    date = d3.time.day(date);
    date.setMonth(0, 1);
    return date;
  }, function(date, offset) {
    date.setFullYear(date.getFullYear() + offset);
  }, function(date) {
    return date.getFullYear();
  });
  d3.time.years = d3.time.year.range;
  d3.time.years.utc = d3.time.year.utc.range;
  d3.time.day = d3_time_interval(function(date) {
    var day = new d3_time(2e3, 0);
    day.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    return day;
  }, function(date, offset) {
    date.setDate(date.getDate() + offset);
  }, function(date) {
    return date.getDate() - 1;
  });
  d3.time.days = d3.time.day.range;
  d3.time.days.utc = d3.time.day.utc.range;
  d3.time.dayOfYear = function(date) {
    var year = d3.time.year(date);
    return Math.floor((date - year - (date.getTimezoneOffset() - year.getTimezoneOffset()) * 6e4) / 864e5);
  };
  d3_time_daySymbols.forEach(function(day, i) {
    day = day.toLowerCase();
    i = 7 - i;
    var interval = d3.time[day] = d3_time_interval(function(date) {
      (date = d3.time.day(date)).setDate(date.getDate() - (date.getDay() + i) % 7);
      return date;
    }, function(date, offset) {
      date.setDate(date.getDate() + Math.floor(offset) * 7);
    }, function(date) {
      var day = d3.time.year(date).getDay();
      return Math.floor((d3.time.dayOfYear(date) + (day + i) % 7) / 7) - (day !== i);
    });
    d3.time[day + "s"] = interval.range;
    d3.time[day + "s"].utc = interval.utc.range;
    d3.time[day + "OfYear"] = function(date) {
      var day = d3.time.year(date).getDay();
      return Math.floor((d3.time.dayOfYear(date) + (day + i) % 7) / 7);
    };
  });
  d3.time.week = d3.time.sunday;
  d3.time.weeks = d3.time.sunday.range;
  d3.time.weeks.utc = d3.time.sunday.utc.range;
  d3.time.weekOfYear = d3.time.sundayOfYear;
  d3.time.format = function(template) {
    var n = template.length;
    function format(date) {
      var string = [], i = -1, j = 0, c, p, f;
      while (++i < n) {
        if (template.charCodeAt(i) === 37) {
          string.push(template.substring(j, i));
          if ((p = d3_time_formatPads[c = template.charAt(++i)]) != null) c = template.charAt(++i);
          if (f = d3_time_formats[c]) c = f(date, p == null ? c === "e" ? " " : "0" : p);
          string.push(c);
          j = i + 1;
        }
      }
      string.push(template.substring(j, i));
      return string.join("");
    }
    format.parse = function(string) {
      var d = {
        y: 1900,
        m: 0,
        d: 1,
        H: 0,
        M: 0,
        S: 0,
        L: 0
      }, i = d3_time_parse(d, template, string, 0);
      if (i != string.length) return null;
      if ("p" in d) d.H = d.H % 12 + d.p * 12;
      var date = new d3_time();
      if ("j" in d) date.setFullYear(d.y, 0, d.j); else if ("w" in d && ("W" in d || "U" in d)) {
        date.setFullYear(d.y, 0, 1);
        date.setFullYear(d.y, 0, "W" in d ? (d.w + 6) % 7 + d.W * 7 - (date.getDay() + 5) % 7 : d.w + d.U * 7 - (date.getDay() + 6) % 7);
      } else date.setFullYear(d.y, d.m, d.d);
      date.setHours(d.H, d.M, d.S, d.L);
      return date;
    };
    format.toString = function() {
      return template;
    };
    return format;
  };
  function d3_time_parse(date, template, string, j) {
    var c, p, i = 0, n = template.length, m = string.length;
    while (i < n) {
      if (j >= m) return -1;
      c = template.charCodeAt(i++);
      if (c === 37) {
        p = d3_time_parsers[template.charAt(i++)];
        if (!p || (j = p(date, string, j)) < 0) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }
    return j;
  }
  function d3_time_formatRe(names) {
    return new RegExp("^(?:" + names.map(d3.requote).join("|") + ")", "i");
  }
  function d3_time_formatLookup(names) {
    var map = new d3_Map(), i = -1, n = names.length;
    while (++i < n) map.set(names[i].toLowerCase(), i);
    return map;
  }
  function d3_time_formatPad(value, fill, width) {
    var sign = value < 0 ? "-" : "", string = (sign ? -value : value) + "", length = string.length;
    return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
  }
  var d3_time_dayRe = d3_time_formatRe(d3_time_days), d3_time_dayLookup = d3_time_formatLookup(d3_time_days), d3_time_dayAbbrevRe = d3_time_formatRe(d3_time_dayAbbreviations), d3_time_dayAbbrevLookup = d3_time_formatLookup(d3_time_dayAbbreviations), d3_time_monthRe = d3_time_formatRe(d3_time_months), d3_time_monthLookup = d3_time_formatLookup(d3_time_months), d3_time_monthAbbrevRe = d3_time_formatRe(d3_time_monthAbbreviations), d3_time_monthAbbrevLookup = d3_time_formatLookup(d3_time_monthAbbreviations), d3_time_percentRe = /^%/;
  var d3_time_formatPads = {
    "-": "",
    _: " ",
    "0": "0"
  };
  var d3_time_formats = {
    a: function(d) {
      return d3_time_dayAbbreviations[d.getDay()];
    },
    A: function(d) {
      return d3_time_days[d.getDay()];
    },
    b: function(d) {
      return d3_time_monthAbbreviations[d.getMonth()];
    },
    B: function(d) {
      return d3_time_months[d.getMonth()];
    },
    c: d3.time.format(d3_time_formatDateTime),
    d: function(d, p) {
      return d3_time_formatPad(d.getDate(), p, 2);
    },
    e: function(d, p) {
      return d3_time_formatPad(d.getDate(), p, 2);
    },
    H: function(d, p) {
      return d3_time_formatPad(d.getHours(), p, 2);
    },
    I: function(d, p) {
      return d3_time_formatPad(d.getHours() % 12 || 12, p, 2);
    },
    j: function(d, p) {
      return d3_time_formatPad(1 + d3.time.dayOfYear(d), p, 3);
    },
    L: function(d, p) {
      return d3_time_formatPad(d.getMilliseconds(), p, 3);
    },
    m: function(d, p) {
      return d3_time_formatPad(d.getMonth() + 1, p, 2);
    },
    M: function(d, p) {
      return d3_time_formatPad(d.getMinutes(), p, 2);
    },
    p: function(d) {
      return d.getHours() >= 12 ? "PM" : "AM";
    },
    S: function(d, p) {
      return d3_time_formatPad(d.getSeconds(), p, 2);
    },
    U: function(d, p) {
      return d3_time_formatPad(d3.time.sundayOfYear(d), p, 2);
    },
    w: function(d) {
      return d.getDay();
    },
    W: function(d, p) {
      return d3_time_formatPad(d3.time.mondayOfYear(d), p, 2);
    },
    x: d3.time.format(d3_time_formatDate),
    X: d3.time.format(d3_time_formatTime),
    y: function(d, p) {
      return d3_time_formatPad(d.getFullYear() % 100, p, 2);
    },
    Y: function(d, p) {
      return d3_time_formatPad(d.getFullYear() % 1e4, p, 4);
    },
    Z: d3_time_zone,
    "%": function() {
      return "%";
    }
  };
  var d3_time_parsers = {
    a: d3_time_parseWeekdayAbbrev,
    A: d3_time_parseWeekday,
    b: d3_time_parseMonthAbbrev,
    B: d3_time_parseMonth,
    c: d3_time_parseLocaleFull,
    d: d3_time_parseDay,
    e: d3_time_parseDay,
    H: d3_time_parseHour24,
    I: d3_time_parseHour24,
    j: d3_time_parseDayOfYear,
    L: d3_time_parseMilliseconds,
    m: d3_time_parseMonthNumber,
    M: d3_time_parseMinutes,
    p: d3_time_parseAmPm,
    S: d3_time_parseSeconds,
    U: d3_time_parseWeekNumberSunday,
    w: d3_time_parseWeekdayNumber,
    W: d3_time_parseWeekNumberMonday,
    x: d3_time_parseLocaleDate,
    X: d3_time_parseLocaleTime,
    y: d3_time_parseYear,
    Y: d3_time_parseFullYear,
    "%": d3_time_parseLiteralPercent
  };
  function d3_time_parseWeekdayAbbrev(date, string, i) {
    d3_time_dayAbbrevRe.lastIndex = 0;
    var n = d3_time_dayAbbrevRe.exec(string.substring(i));
    return n ? (date.w = d3_time_dayAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function d3_time_parseWeekday(date, string, i) {
    d3_time_dayRe.lastIndex = 0;
    var n = d3_time_dayRe.exec(string.substring(i));
    return n ? (date.w = d3_time_dayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function d3_time_parseWeekdayNumber(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 1));
    return n ? (date.w = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseWeekNumberSunday(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i));
    return n ? (date.U = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseWeekNumberMonday(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i));
    return n ? (date.W = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseMonthAbbrev(date, string, i) {
    d3_time_monthAbbrevRe.lastIndex = 0;
    var n = d3_time_monthAbbrevRe.exec(string.substring(i));
    return n ? (date.m = d3_time_monthAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function d3_time_parseMonth(date, string, i) {
    d3_time_monthRe.lastIndex = 0;
    var n = d3_time_monthRe.exec(string.substring(i));
    return n ? (date.m = d3_time_monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }
  function d3_time_parseLocaleFull(date, string, i) {
    return d3_time_parse(date, d3_time_formats.c.toString(), string, i);
  }
  function d3_time_parseLocaleDate(date, string, i) {
    return d3_time_parse(date, d3_time_formats.x.toString(), string, i);
  }
  function d3_time_parseLocaleTime(date, string, i) {
    return d3_time_parse(date, d3_time_formats.X.toString(), string, i);
  }
  function d3_time_parseFullYear(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 4));
    return n ? (date.y = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseYear(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.y = d3_time_expandYear(+n[0]), i + n[0].length) : -1;
  }
  function d3_time_expandYear(d) {
    return d + (d > 68 ? 1900 : 2e3);
  }
  function d3_time_parseMonthNumber(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.m = n[0] - 1, i + n[0].length) : -1;
  }
  function d3_time_parseDay(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.d = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseDayOfYear(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 3));
    return n ? (date.j = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseHour24(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.H = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseMinutes(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.M = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseSeconds(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.S = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseMilliseconds(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 3));
    return n ? (date.L = +n[0], i + n[0].length) : -1;
  }
  var d3_time_numberRe = /^\s*\d+/;
  function d3_time_parseAmPm(date, string, i) {
    var n = d3_time_amPmLookup.get(string.substring(i, i += 2).toLowerCase());
    return n == null ? -1 : (date.p = n, i);
  }
  var d3_time_amPmLookup = d3.map({
    am: 0,
    pm: 1
  });
  function d3_time_zone(d) {
    var z = d.getTimezoneOffset(), zs = z > 0 ? "-" : "+", zh = ~~(Math.abs(z) / 60), zm = Math.abs(z) % 60;
    return zs + d3_time_formatPad(zh, "0", 2) + d3_time_formatPad(zm, "0", 2);
  }
  function d3_time_parseLiteralPercent(date, string, i) {
    d3_time_percentRe.lastIndex = 0;
    var n = d3_time_percentRe.exec(string.substring(i, i + 1));
    return n ? i + n[0].length : -1;
  }
  d3.time.format.utc = function(template) {
    var local = d3.time.format(template);
    function format(date) {
      try {
        d3_time = d3_time_utc;
        var utc = new d3_time();
        utc._ = date;
        return local(utc);
      } finally {
        d3_time = Date;
      }
    }
    format.parse = function(string) {
      try {
        d3_time = d3_time_utc;
        var date = local.parse(string);
        return date && date._;
      } finally {
        d3_time = Date;
      }
    };
    format.toString = local.toString;
    return format;
  };
  var d3_time_formatIso = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");
  d3.time.format.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? d3_time_formatIsoNative : d3_time_formatIso;
  function d3_time_formatIsoNative(date) {
    return date.toISOString();
  }
  d3_time_formatIsoNative.parse = function(string) {
    var date = new Date(string);
    return isNaN(date) ? null : date;
  };
  d3_time_formatIsoNative.toString = d3_time_formatIso.toString;
  d3.time.second = d3_time_interval(function(date) {
    return new d3_time(Math.floor(date / 1e3) * 1e3);
  }, function(date, offset) {
    date.setTime(date.getTime() + Math.floor(offset) * 1e3);
  }, function(date) {
    return date.getSeconds();
  });
  d3.time.seconds = d3.time.second.range;
  d3.time.seconds.utc = d3.time.second.utc.range;
  d3.time.minute = d3_time_interval(function(date) {
    return new d3_time(Math.floor(date / 6e4) * 6e4);
  }, function(date, offset) {
    date.setTime(date.getTime() + Math.floor(offset) * 6e4);
  }, function(date) {
    return date.getMinutes();
  });
  d3.time.minutes = d3.time.minute.range;
  d3.time.minutes.utc = d3.time.minute.utc.range;
  d3.time.hour = d3_time_interval(function(date) {
    var timezone = date.getTimezoneOffset() / 60;
    return new d3_time((Math.floor(date / 36e5 - timezone) + timezone) * 36e5);
  }, function(date, offset) {
    date.setTime(date.getTime() + Math.floor(offset) * 36e5);
  }, function(date) {
    return date.getHours();
  });
  d3.time.hours = d3.time.hour.range;
  d3.time.hours.utc = d3.time.hour.utc.range;
  d3.time.month = d3_time_interval(function(date) {
    date = d3.time.day(date);
    date.setDate(1);
    return date;
  }, function(date, offset) {
    date.setMonth(date.getMonth() + offset);
  }, function(date) {
    return date.getMonth();
  });
  d3.time.months = d3.time.month.range;
  d3.time.months.utc = d3.time.month.utc.range;
  function d3_time_scale(linear, methods, format) {
    function scale(x) {
      return linear(x);
    }
    scale.invert = function(x) {
      return d3_time_scaleDate(linear.invert(x));
    };
    scale.domain = function(x) {
      if (!arguments.length) return linear.domain().map(d3_time_scaleDate);
      linear.domain(x);
      return scale;
    };
    scale.nice = function(m) {
      return scale.domain(d3_scale_nice(scale.domain(), m));
    };
    scale.ticks = function(m, k) {
      var extent = d3_scaleExtent(scale.domain());
      if (typeof m !== "function") {
        var span = extent[1] - extent[0], target = span / m, i = d3.bisect(d3_time_scaleSteps, target);
        if (i == d3_time_scaleSteps.length) return methods.year(extent, m);
        if (!i) return linear.ticks(m).map(d3_time_scaleDate);
        if (target / d3_time_scaleSteps[i - 1] < d3_time_scaleSteps[i] / target) --i;
        m = methods[i];
        k = m[1];
        m = m[0].range;
      }
      return m(extent[0], new Date(+extent[1] + 1), k);
    };
    scale.tickFormat = function() {
      return format;
    };
    scale.copy = function() {
      return d3_time_scale(linear.copy(), methods, format);
    };
    return d3_scale_linearRebind(scale, linear);
  }
  function d3_time_scaleDate(t) {
    return new Date(t);
  }
  function d3_time_scaleFormat(formats) {
    return function(date) {
      var i = formats.length - 1, f = formats[i];
      while (!f[1](date)) f = formats[--i];
      return f[0](date);
    };
  }
  function d3_time_scaleSetYear(y) {
    var d = new Date(y, 0, 1);
    d.setFullYear(y);
    return d;
  }
  function d3_time_scaleGetYear(d) {
    var y = d.getFullYear(), d0 = d3_time_scaleSetYear(y), d1 = d3_time_scaleSetYear(y + 1);
    return y + (d - d0) / (d1 - d0);
  }
  var d3_time_scaleSteps = [ 1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6 ];
  var d3_time_scaleLocalMethods = [ [ d3.time.second, 1 ], [ d3.time.second, 5 ], [ d3.time.second, 15 ], [ d3.time.second, 30 ], [ d3.time.minute, 1 ], [ d3.time.minute, 5 ], [ d3.time.minute, 15 ], [ d3.time.minute, 30 ], [ d3.time.hour, 1 ], [ d3.time.hour, 3 ], [ d3.time.hour, 6 ], [ d3.time.hour, 12 ], [ d3.time.day, 1 ], [ d3.time.day, 2 ], [ d3.time.week, 1 ], [ d3.time.month, 1 ], [ d3.time.month, 3 ], [ d3.time.year, 1 ] ];
  var d3_time_scaleLocalFormats = [ [ d3.time.format("%Y"), d3_true ], [ d3.time.format("%B"), function(d) {
    return d.getMonth();
  } ], [ d3.time.format("%b %d"), function(d) {
    return d.getDate() != 1;
  } ], [ d3.time.format("%a %d"), function(d) {
    return d.getDay() && d.getDate() != 1;
  } ], [ d3.time.format("%I %p"), function(d) {
    return d.getHours();
  } ], [ d3.time.format("%I:%M"), function(d) {
    return d.getMinutes();
  } ], [ d3.time.format(":%S"), function(d) {
    return d.getSeconds();
  } ], [ d3.time.format(".%L"), function(d) {
    return d.getMilliseconds();
  } ] ];
  var d3_time_scaleLinear = d3.scale.linear(), d3_time_scaleLocalFormat = d3_time_scaleFormat(d3_time_scaleLocalFormats);
  d3_time_scaleLocalMethods.year = function(extent, m) {
    return d3_time_scaleLinear.domain(extent.map(d3_time_scaleGetYear)).ticks(m).map(d3_time_scaleSetYear);
  };
  d3.time.scale = function() {
    return d3_time_scale(d3.scale.linear(), d3_time_scaleLocalMethods, d3_time_scaleLocalFormat);
  };
  var d3_time_scaleUTCMethods = d3_time_scaleLocalMethods.map(function(m) {
    return [ m[0].utc, m[1] ];
  });
  var d3_time_scaleUTCFormats = [ [ d3.time.format.utc("%Y"), d3_true ], [ d3.time.format.utc("%B"), function(d) {
    return d.getUTCMonth();
  } ], [ d3.time.format.utc("%b %d"), function(d) {
    return d.getUTCDate() != 1;
  } ], [ d3.time.format.utc("%a %d"), function(d) {
    return d.getUTCDay() && d.getUTCDate() != 1;
  } ], [ d3.time.format.utc("%I %p"), function(d) {
    return d.getUTCHours();
  } ], [ d3.time.format.utc("%I:%M"), function(d) {
    return d.getUTCMinutes();
  } ], [ d3.time.format.utc(":%S"), function(d) {
    return d.getUTCSeconds();
  } ], [ d3.time.format.utc(".%L"), function(d) {
    return d.getUTCMilliseconds();
  } ] ];
  var d3_time_scaleUTCFormat = d3_time_scaleFormat(d3_time_scaleUTCFormats);
  function d3_time_scaleUTCSetYear(y) {
    var d = new Date(Date.UTC(y, 0, 1));
    d.setUTCFullYear(y);
    return d;
  }
  function d3_time_scaleUTCGetYear(d) {
    var y = d.getUTCFullYear(), d0 = d3_time_scaleUTCSetYear(y), d1 = d3_time_scaleUTCSetYear(y + 1);
    return y + (d - d0) / (d1 - d0);
  }
  d3_time_scaleUTCMethods.year = function(extent, m) {
    return d3_time_scaleLinear.domain(extent.map(d3_time_scaleUTCGetYear)).ticks(m).map(d3_time_scaleUTCSetYear);
  };
  d3.time.scale.utc = function() {
    return d3_time_scale(d3.scale.linear(), d3_time_scaleUTCMethods, d3_time_scaleUTCFormat);
  };
  d3.text = d3_xhrType(function(request) {
    return request.responseText;
  });
  d3.json = function(url, callback) {
    return d3_xhr(url, "application/json", d3_json, callback);
  };
  function d3_json(request) {
    return JSON.parse(request.responseText);
  }
  d3.html = function(url, callback) {
    return d3_xhr(url, "text/html", d3_html, callback);
  };
  function d3_html(request) {
    var range = d3_document.createRange();
    range.selectNode(d3_document.body);
    return range.createContextualFragment(request.responseText);
  }
  d3.xml = d3_xhrType(function(request) {
    return request.responseXML;
  });
  return d3;
}();
},{}],6:[function(require,module,exports){
(function(){require("./d3");
module.exports = d3;
(function () { delete this.d3; })(); // unset global

})()
},{"./d3":5}],7:[function(require,module,exports){
var DemoTab, GenericAttributesTab;

GenericAttributesTab = require('../../lib/scripts/genericAttributesTab.coffee');

DemoTab = require('../../lib/scripts/demoTab.coffee');

window.app.registerReport(function(report) {
  report.tabs([GenericAttributesTab, DemoTab]);
  return report.stylesheets(['./demo.css']);
});


},{"../../lib/scripts/demoTab.coffee":1,"../../lib/scripts/genericAttributesTab.coffee":2}]},{},[7])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvY2J1cnQvV29ya2luZy9yZXBvcnQtdGVtcGxhdGUvbGliL3NjcmlwdHMvZGVtb1RhYi5jb2ZmZWUiLCIvVXNlcnMvY2J1cnQvV29ya2luZy9yZXBvcnQtdGVtcGxhdGUvbGliL3NjcmlwdHMvZ2VuZXJpY0F0dHJpYnV0ZXNUYWIuY29mZmVlIiwiL1VzZXJzL2NidXJ0L1dvcmtpbmcvcmVwb3J0LXRlbXBsYXRlL2xpYi9zY3JpcHRzL3JlcG9ydFRhYi5jb2ZmZWUiLCIvVXNlcnMvY2J1cnQvV29ya2luZy9yZXBvcnQtdGVtcGxhdGUvbGliL3RlbXBsYXRlcy90ZW1wbGF0ZXMuanMiLCIvVXNlcnMvY2J1cnQvV29ya2luZy9yZXBvcnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2QzL2QzLmpzIiwiL1VzZXJzL2NidXJ0L1dvcmtpbmcvcmVwb3J0LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9kMy9pbmRleC1icm93c2VyaWZ5LmpzIiwiL1VzZXJzL2NidXJ0L1dvcmtpbmcvcmVwb3J0LXRlbXBsYXRlL3NyYy9zY3JpcHRzL2RlbW8uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBLG1DQUFBO0dBQUE7a1NBQUE7O0FBQUEsQ0FBQSxFQUFZLElBQUEsRUFBWixXQUFZOztBQUNaLENBREEsRUFDWSxJQUFBLEVBQVosa0JBQVk7O0FBQ1osQ0FGQSxDQUVBLENBQUssSUFBQSxvQ0FBQTs7QUFFQyxDQUpOO0NBS0U7Ozs7O0NBQUE7O0NBQUEsRUFBTSxDQUFOLE1BQUE7O0NBQUEsRUFDVyxHQURYLEdBQ0E7O0NBREEsRUFFVSxDQUZWLElBRUEsQ0FBbUI7O0NBRm5CLEVBSVEsR0FBUixHQUFRO0NBRU4sT0FBQSxLQUFBO0NBQUEsQ0FBQSxDQUFPLENBQVA7Q0FBQSxDQUNhLENBQWIsQ0FBQSxDQUFBLElBQWE7Q0FBVyxFQUFnQyxDQUFqQyxDQUFNLENBQVcsT0FBckI7Q0FBbkIsSUFBYTtDQURiLEVBS0UsQ0FERixHQUFBO0NBQ0UsQ0FBUSxFQUFDLENBQUssQ0FBZCxLQUFRO0NBQVIsQ0FDYSxFQUFDLEVBQWQsS0FBQTtDQURBLENBRVksRUFBQyxDQUFLLENBQWxCLElBQUEsR0FBWTtDQUZaLENBR08sRUFBQyxDQUFSLENBQUEsQ0FBZTtDQUhmLENBSVcsQ0FBQSxDQUFBLEVBQVgsR0FBQTtlQUFpQztDQUFBLENBQVEsR0FBUCxLQUFBO0NBQUQsQ0FBa0IsR0FBUCxLQUFBO0NBQXJCO0NBQVosTUFBWTtDQVR6QixLQUFBO0NBQUEsQ0FVb0MsQ0FBaEMsQ0FBSixFQUFVLENBQUEsQ0FBUyxDQUFUO0NBVlYsRUFhb0IsQ0FBcEIsQ0FBQSxJQUFxQixDQUFyQjtDQUNFLEtBQUEsUUFBQTtDQUNBLEVBQUEsQ0FBQSxFQUFBLE9BQUE7Q0FGRixJQUFvQjtDQWJwQixFQWdCb0IsQ0FBcEIsQ0FBQSxJQUFxQixDQUFyQjtDQUNFLEtBQUEsUUFBQTtDQUNBLEVBQUEsQ0FBQSxFQUFBLE9BQUE7Q0FGRixJQUFvQjtDQUtuQixHQUFBLEtBQUQsRUFBQTtDQTNCRixFQUlROztDQUpSLEVBNkJXLENBQUEsS0FBWDtDQUNFLE9BQUEsZ0RBQUE7Q0FBQSxFQUFJLENBQUosTUFBSTtDQUFKLEVBRUUsQ0FERixFQUFBO0NBQ0UsQ0FBSyxDQUFMLEdBQUE7Q0FBQSxDQUNPLEdBQVAsQ0FBQTtDQURBLENBRVEsSUFBUjtDQUZBLENBR00sRUFBTixFQUFBO0NBTEYsS0FBQTtDQUFBLEVBT1EsQ0FBUixDQUFBLENBQW9CO0NBUHBCLEVBUVMsQ0FBVCxFQUFBO0NBUkEsQ0FVTSxDQUFGLENBQUosQ0FBWSxDQUFSO0NBVkosQ0FhTSxDQUFGLENBQUosQ0FBWSxDQUFSO0NBYkosQ0FnQlUsQ0FBRixDQUFSLENBQUEsS0FBUTtDQWhCUixDQWtCVSxDQUFGLENBQVIsQ0FBQSxDQUFRLEVBQUE7Q0FsQlIsQ0FzQlUsQ0FBRixDQUFSLENBQUEsQ0FBUTtDQXRCUixDQTBCUSxDQUFSLENBQUEsQ0FBTSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBS0M7Q0EvQlAsQ0FpQ2EsRUFBYixFQUFBO0NBakNBLENBa0NXLENBQWMsQ0FBekIsRUFBQSxHQUEwQjtDQUFELFlBQU87Q0FBdkIsR0FBVCxDQUF5QjtBQVNULENBM0NoQixDQXFDbUIsQ0FEaEIsQ0FBSCxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsR0FFd0I7Q0F0Q3hCLENBOENtQixDQURoQixDQUFILENBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxFQUFBO0NBN0NBLENBeURtQixDQUhoQixDQUFILENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtDQUswQixZQUFBO0NBTDFCLENBTWdCLENBQUEsQ0FOaEIsQ0FLZ0IsSUFDQztDQUFTLFlBQUE7Q0FOMUIsQ0FPbUIsQ0FBQSxFQURILENBTmhCLEdBT29CO0NBQVksSUFBTixRQUFBO0NBUDFCLElBT21CO0NBN0RuQixHQStEQSxFQUFBO0NBQ0MsR0FBQSxFQUFELEVBQUEsR0FBQTtDQTlGRixFQTZCVzs7Q0E3Qlg7O0NBRG9COztBQWlHdEIsQ0FyR0EsRUFxR2lCLEdBQVgsQ0FBTjs7OztBQ3JHQSxJQUFBLDRDQUFBO0dBQUE7a1NBQUE7O0FBQUEsQ0FBQSxFQUFZLElBQUEsRUFBWixXQUFZOztBQUNaLENBREEsRUFDWSxJQUFBLEVBQVosa0JBQVk7O0FBRU4sQ0FITjtDQUlFOzs7OztDQUFBOztDQUFBLEVBQU0sQ0FBTixRQUFBOztDQUFBLEVBQ1csTUFBWCxVQURBOztDQUFBLEVBRVUsS0FBVixDQUFtQixRQUZuQjs7Q0FBQSxFQUlRLEdBQVIsR0FBUTtDQUNOLE1BQUEsQ0FBQTtDQUFBLEVBQ0UsQ0FERixHQUFBO0NBQ0UsQ0FBUSxFQUFDLENBQUssQ0FBZCxLQUFRO0NBQVIsQ0FDYSxFQUFDLEVBQWQsS0FBQTtDQURBLENBRVksRUFBQyxDQUFLLENBQWxCLElBQUEsR0FBWTtDQUZaLENBR08sRUFBQyxDQUFSLENBQUEsQ0FBZTtDQUpqQixLQUFBO0NBS0MsQ0FBbUMsQ0FBaEMsQ0FBSCxFQUFTLENBQUEsQ0FBUyxDQUFULEVBQVY7Q0FWRixFQUlROztDQUpSOztDQURpQzs7QUFjbkMsQ0FqQkEsRUFpQmlCLEdBQVgsQ0FBTixhQWpCQTs7OztBQ0FBLElBQUEsV0FBQTtHQUFBOztrU0FBQTs7QUFBTSxDQUFOO0NBQ0U7Ozs7OztDQUFBOztDQUFBLEVBQU0sQ0FBTixTQUFBOztDQUFBLENBQUEsQ0FDYyxTQUFkOztDQURBLENBR3NCLENBQVYsRUFBQSxFQUFBLEVBQUUsQ0FBZDtDQU1FLEVBTlksQ0FBRCxDQU1YO0NBQUEsRUFOb0IsQ0FBRCxHQU1uQjtDQUFBLEVBQUEsQ0FBQSxFQUFhO0NBQ1osQ0FBVyxFQUFaLEVBQUEsQ0FBQSxJQUFBO0NBVkYsRUFHWTs7Q0FIWixFQVlRLEdBQVIsR0FBUTtDQUNOLFNBQU0sdUJBQU47Q0FiRixFQVlROztDQVpSLEVBZU0sQ0FBTixLQUFNO0NBQ0osRUFBSSxDQUFKO0NBQ0MsRUFBVSxDQUFWLEdBQUQsSUFBQTtDQWpCRixFQWVNOztDQWZOLEVBbUJNLENBQU4sS0FBTTtDQUNKLEVBQUksQ0FBSjtDQUNDLEVBQVUsQ0FBVixHQUFELElBQUE7Q0FyQkYsRUFtQk07O0NBbkJOLEVBdUJRLEdBQVIsR0FBUTtDQUFBLFVBQ04seUJBQUE7Q0F4QkYsRUF1QlE7O0NBdkJSLEVBMEJXLE1BQVg7O0NBMUJBLENBNEJXLENBQUEsTUFBWDtDQUNFLE9BQUEsT0FBQTtDQUFBLEVBQVUsQ0FBVixHQUFBLEdBQVU7Q0FBVixDQUN5QixDQUFoQixDQUFULEVBQUEsQ0FBUyxFQUFpQjtDQUFPLElBQWMsSUFBZixJQUFBO0NBQXZCLElBQWdCO0NBQ3pCLEdBQUEsVUFBQTtDQUNFLENBQVUsQ0FBNkIsQ0FBN0IsQ0FBQSxPQUFBLFFBQU07TUFIbEI7Q0FJTyxLQUFELEtBQU47Q0FqQ0YsRUE0Qlc7O0NBNUJYLENBbUN3QixDQUFSLEVBQUEsSUFBQyxLQUFqQjtDQUNFLE9BQUEsQ0FBQTtDQUFBLEVBQVMsQ0FBVCxDQUFTLENBQVQsR0FBUztDQUNUO0NBQ0UsQ0FBd0MsSUFBMUIsRUFBWSxFQUFjLEdBQWpDO01BRFQ7Q0FHRSxLQURJO0NBQ0osQ0FBTyxDQUFlLEVBQWYsT0FBQSxJQUFBO01BTEs7Q0FuQ2hCLEVBbUNnQjs7Q0FuQ2hCLEVBMENZLE1BQUEsQ0FBWjtDQUNFLE9BQUEsYUFBQTtBQUFPLENBQVAsR0FBQSxDQUFzQyxDQUEvQixDQUFBO0NBQ0wsR0FBVSxDQUFBLE9BQUEsR0FBQTtNQURaO0NBRUMsQ0FBaUIsQ0FBQSxHQUFsQixDQUFBLEVBQW1CLEVBQW5CO0NBQ0UsSUFBQSxLQUFBO0NBQU8sRUFBUCxDQUFBLENBQXlCLENBQW5CLE1BQU47Q0FERixJQUFrQjtDQTdDcEIsRUEwQ1k7O0NBMUNaOztDQURzQixPQUFROztBQWlEaEMsQ0FqREEsRUFpRGlCLEdBQVgsQ0FBTixFQWpEQTs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxbFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkEsSUFBQSx5QkFBQTs7QUFBQSxDQUFBLEVBQXVCLElBQUEsYUFBdkIsMkJBQXVCOztBQUN2QixDQURBLEVBQ1UsSUFBViwyQkFBVTs7QUFFVixDQUhBLEVBR1UsR0FBSixHQUFxQixLQUEzQjtDQUNFLENBQUEsRUFBQSxFQUFNLENBQU0sYUFBQTtDQUVMLEtBQUQsR0FBTixFQUFBLENBQW1CO0NBSEsiLCJzb3VyY2VzQ29udGVudCI6WyJSZXBvcnRUYWIgPSByZXF1aXJlICcuL3JlcG9ydFRhYi5jb2ZmZWUnXG50ZW1wbGF0ZXMgPSByZXF1aXJlICcuLi90ZW1wbGF0ZXMvdGVtcGxhdGVzLmpzJ1xuZDMgPSByZXF1aXJlICcuLi8uLi9ub2RlX21vZHVsZXMvZDMvaW5kZXgtYnJvd3NlcmlmeS5qcydcblxuY2xhc3MgRGVtb1RhYiBleHRlbmRzIFJlcG9ydFRhYlxuICBuYW1lOiAnRXhhbXBsZXMnXG4gIGNsYXNzTmFtZTogJ2RlbW8nXG4gIHRlbXBsYXRlOiB0ZW1wbGF0ZXMuZGVtb1xuXG4gIHJlbmRlcjogKCkgLT5cbiAgICAjIGNyZWF0ZSByYW5kb20gZGF0YSBmb3IgdmlzdWFsaXphdGlvblxuICAgIGRhdGEgPSBbXVxuICAgIF8udGltZXMgMTAwLCAoKSAtPiBkYXRhLnB1c2ggTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMTAwKVxuXG4gICAgIyBzZXR1cCBjb250ZXh0IG9iamVjdCB3aXRoIGRhdGEgYW5kIHJlbmRlciB0aGUgdGVtcGxhdGUgZnJvbSBpdFxuICAgIGNvbnRleHQgPVxuICAgICAgc2tldGNoOiBAbW9kZWwuZm9yVGVtcGxhdGUoKVxuICAgICAgc2tldGNoQ2xhc3M6IEBza2V0Y2hDbGFzcy5mb3JUZW1wbGF0ZSgpXG4gICAgICBhdHRyaWJ1dGVzOiBAbW9kZWwuZ2V0QXR0cmlidXRlcygpXG4gICAgICBhZG1pbjogQHByb2plY3QuaXNBZG1pbiB3aW5kb3cudXNlclxuICAgICAgY2hhcnREYXRhOiBfLm1hcCBkYXRhLCAoZCwgaSkgLT4ge2luZGV4OiBpLCB2YWx1ZTogZH1cbiAgICBAJGVsLmh0bWwgQHRlbXBsYXRlLnJlbmRlcihjb250ZXh0LCB0ZW1wbGF0ZXMpXG5cbiAgICAjIFNldHVwIGJvb3RzdHJhcCB0YWJzXG4gICAgJCgnI215VGFiIGEnKS5jbGljayAoZSkgLT5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgJCh0aGlzKS50YWIoJ3Nob3cnKVxuICAgICQoJyN0YWJzMiBhJykuY2xpY2sgKGUpIC0+XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICQodGhpcykudGFiKCdzaG93JylcblxuICAgICMgZHJhdyBkMyB2aXN1YWxpemF0aW9uXG4gICAgQGRyYXdDaGFydChkYXRhKVxuXG4gIGRyYXdDaGFydDogKGRhdGEpIC0+XG4gICAgcCA9IEAkKCcjY2hhcnQgcCcpXG4gICAgbWFyZ2luID0gXG4gICAgICB0b3A6IDIwXG4gICAgICByaWdodDogMjBcbiAgICAgIGJvdHRvbTogMzBcbiAgICAgIGxlZnQ6IDQwXG5cbiAgICB3aWR0aCA9IDQzMCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0XG4gICAgaGVpZ2h0ID0gMzAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b21cblxuICAgIHggPSBkMy5zY2FsZS5saW5lYXIoKVxuICAgICAgLnJhbmdlIFswLCB3aWR0aF1cblxuICAgIHkgPSBkMy5zY2FsZS5saW5lYXIoKVxuICAgICAgLnJhbmdlIFtoZWlnaHQsIDBdXG5cbiAgICBjb2xvciA9IGQzLnNjYWxlLmNhdGVnb3J5MTAoKVxuXG4gICAgeEF4aXMgPSBkMy5zdmcuYXhpcygpXG4gICAgICAuc2NhbGUoeClcbiAgICAgIC5vcmllbnQgXCJib3R0b21cIlxuXG4gICAgeUF4aXMgPSBkMy5zdmcuYXhpcygpXG4gICAgICAuc2NhbGUoeSlcbiAgICAgIC5vcmllbnQgXCJsZWZ0XCJcblxuICAgIHN2ZyA9IGQzLnNlbGVjdChcIiNjaGFydFwiKS5hcHBlbmQoXCJzdmdcIilcbiAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGggKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCArIG1hcmdpbi50b3AgKyBtYXJnaW4uYm90dG9tKVxuICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXG4gICAgICAgICAgXCJ0cmFuc2xhdGUoI3ttYXJnaW4ubGVmdH0sI3ttYXJnaW4udG9wfSlcIilcblxuICAgIHguZG9tYWluKFswLCBkYXRhLmxlbmd0aF0pLm5pY2UoKVxuICAgIHkuZG9tYWluKGQzLmV4dGVudChkYXRhLCAoZCkgLT4gZCkpLm5pY2UoKVxuXG4gICAgc3ZnLmFwcGVuZChcImdcIilcbiAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInggYXhpc1wiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgwLCN7aGVpZ2h0fSlcIilcbiAgICAgICAgLmNhbGwoeEF4aXMpXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwibGFiZWxcIilcbiAgICAgICAgLmF0dHIoXCJ4XCIsIHdpZHRoKVxuICAgICAgICAuYXR0cihcInlcIiwgLTYpXG5cbiAgICBzdmcuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwieSBheGlzXCIpXG4gICAgICAgIC5jYWxsKHlBeGlzKVxuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImxhYmVsXCIpXG4gICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwicm90YXRlKC05MClcIilcbiAgICAgICAgLmF0dHIoXCJ5XCIsIDYpXG4gICAgICAgIC5hdHRyKFwiZHlcIiwgXCIuNzFlbVwiKVxuXG4gICAgc3ZnLnNlbGVjdEFsbChcIi5kb3RcIilcbiAgICAgICAgLmRhdGEoZGF0YSlcbiAgICAgIC5lbnRlcigpLmFwcGVuZChcImNpcmNsZVwiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiZG90XCIpXG4gICAgICAgIC5hdHRyKFwiclwiLCAzLjUpXG4gICAgICAgIC5hdHRyKFwiY3hcIiwgKGQsIGkpIC0+IHgoaSkpXG4gICAgICAgIC5hdHRyKFwiY3lcIiwgKGQsIGkpIC0+IHkoZCkpXG4gICAgICAgIC5zdHlsZShcImZpbGxcIiwgKGQpIC0+IGNvbG9yKGQpKVxuXG4gICAgcC5kZXRhY2goKVxuICAgIEAkKCcjY2hhcnQnKS5hcHBlbmQgcFxuXG5tb2R1bGUuZXhwb3J0cyA9IERlbW9UYWIiLCJSZXBvcnRUYWIgPSByZXF1aXJlICcuL3JlcG9ydFRhYi5jb2ZmZWUnXG50ZW1wbGF0ZXMgPSByZXF1aXJlICcuLi90ZW1wbGF0ZXMvdGVtcGxhdGVzLmpzJ1xuXG5jbGFzcyBHZW5lcmljQXR0cmlidXRlc1RhYiBleHRlbmRzIFJlcG9ydFRhYlxuICBuYW1lOiAnQXR0cmlidXRlcydcbiAgY2xhc3NOYW1lOiAnZ2VuZXJpY0F0dHJpYnV0ZXMnXG4gIHRlbXBsYXRlOiB0ZW1wbGF0ZXMuZ2VuZXJpY0F0dHJpYnV0ZXNcblxuICByZW5kZXI6ICgpIC0+XG4gICAgY29udGV4dCA9XG4gICAgICBza2V0Y2g6IEBtb2RlbC5mb3JUZW1wbGF0ZSgpXG4gICAgICBza2V0Y2hDbGFzczogQHNrZXRjaENsYXNzLmZvclRlbXBsYXRlKClcbiAgICAgIGF0dHJpYnV0ZXM6IEBtb2RlbC5nZXRBdHRyaWJ1dGVzKClcbiAgICAgIGFkbWluOiBAcHJvamVjdC5pc0FkbWluIHdpbmRvdy51c2VyXG4gICAgQCRlbC5odG1sIEB0ZW1wbGF0ZS5yZW5kZXIoY29udGV4dCwgdGVtcGxhdGVzKVxuXG5cbm1vZHVsZS5leHBvcnRzID0gR2VuZXJpY0F0dHJpYnV0ZXNUYWIiLCJjbGFzcyBSZXBvcnRUYWIgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3XG4gIG5hbWU6ICdJbmZvcm1hdGlvbidcbiAgZGVwZW5kZW5jaWVzOiBbXVxuXG4gIGluaXRpYWxpemU6IChAbW9kZWwsIEBvcHRpb25zKSAtPlxuICAgICMgV2lsbCBiZSBpbml0aWFsaXplZCBieSBTZWFTa2V0Y2ggd2l0aCB0aGUgZm9sbG93aW5nIGFyZ3VtZW50czpcbiAgICAjICAgKiBtb2RlbCAtIFRoZSBza2V0Y2ggYmVpbmcgcmVwb3J0ZWQgb25cbiAgICAjICAgKiBvcHRpb25zXG4gICAgIyAgICAgLSAucGFyZW50IC0gdGhlIHBhcmVudCByZXBvcnQgdmlldyBcbiAgICAjICAgICAgICBjYWxsIEBvcHRpb25zLnBhcmVudC5kZXN0cm95KCkgdG8gY2xvc2UgdGhlIHdob2xlIHJlcG9ydCB3aW5kb3dcbiAgICBAYXBwID0gd2luZG93LmFwcFxuICAgIF8uZXh0ZW5kIEAsIEBvcHRpb25zXG5cbiAgcmVuZGVyOiAoKSAtPlxuICAgIHRocm93ICdyZW5kZXIgbWV0aG9kIG11c3QgYmUgb3ZlcmlkZGVuJ1xuXG4gIHNob3c6ICgpIC0+XG4gICAgQCRlbC5zaG93KClcbiAgICBAdmlzaWJsZSA9IHRydWVcblxuICBoaWRlOiAoKSAtPlxuICAgIEAkZWwuaGlkZSgpXG4gICAgQHZpc2libGUgPSBmYWxzZVxuXG4gIHJlbW92ZTogKCkgPT5cbiAgICBzdXBlcigpXG4gIFxuICBvbkxvYWRpbmc6ICgpIC0+ICMgZXh0ZW5zaW9uIHBvaW50IGZvciBzdWJjbGFzc2VzXG5cbiAgZ2V0UmVzdWx0OiAoaWQpIC0+XG4gICAgcmVzdWx0cyA9IEBnZXRSZXN1bHRzKClcbiAgICByZXN1bHQgPSBfLmZpbmQgcmVzdWx0cywgKHIpIC0+IHIucGFyYW1OYW1lIGlzIGlkXG4gICAgdW5sZXNzIHJlc3VsdD9cbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gcmVzdWx0IHdpdGggaWQgJyArIGlkKVxuICAgIHJlc3VsdC52YWx1ZVxuXG4gIGdldEZpcnN0UmVzdWx0OiAocGFyYW0sIGlkKSAtPlxuICAgIHJlc3VsdCA9IEBnZXRSZXN1bHQocGFyYW0pXG4gICAgdHJ5XG4gICAgICByZXR1cm4gcmVzdWx0WzBdLmZlYXR1cmVzWzBdLmF0dHJpYnV0ZXNbaWRdXG4gICAgY2F0Y2ggZVxuICAgICAgdGhyb3cgXCJFcnJvciBmaW5kaW5nICN7cGFyYW19OiN7aWR9IGluIGdwIHJlc3VsdHNcIlxuXG4gIGdldFJlc3VsdHM6ICgpIC0+XG4gICAgdW5sZXNzIHJlc3VsdHMgPSBAcmVzdWx0cz8uZ2V0KCdkYXRhJyk/LnJlc3VsdHNcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gZ3AgcmVzdWx0cycpXG4gICAgXy5maWx0ZXIgcmVzdWx0cywgKHJlc3VsdCkgLT5cbiAgICAgIHJlc3VsdC5wYXJhbU5hbWUgbm90IGluIFsnUmVzdWx0Q29kZScsICdSZXN1bHRNc2cnXVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlcG9ydFRhYiIsInRoaXNbXCJUZW1wbGF0ZXNcIl0gPSB0aGlzW1wiVGVtcGxhdGVzXCJdIHx8IHt9O1xuXG50aGlzW1wiVGVtcGxhdGVzXCJdW1wiYXR0cmlidXRlcy9hdHRyaWJ1dGVJdGVtXCJdID0gbmV3IEhvZ2FuLlRlbXBsYXRlKGZ1bmN0aW9uKGMscCxpKXt2YXIgXz10aGlzO18uYihpPWl8fFwiXCIpO18uYihcIjx0ciBkYXRhLWF0dHJpYnV0ZS1pZD1cXFwiXCIpO18uYihfLnYoXy5mKFwiaWRcIixjLHAsMCkpKTtfLmIoXCJcXFwiIGRhdGEtYXR0cmlidXRlLWV4cG9ydGlkPVxcXCJcIik7Xy5iKF8udihfLmYoXCJleHBvcnRpZFwiLGMscCwwKSkpO18uYihcIlxcXCIgZGF0YS1hdHRyaWJ1dGUtdHlwZT1cXFwiXCIpO18uYihfLnYoXy5mKFwidHlwZVwiLGMscCwwKSkpO18uYihcIlxcXCI+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICA8dGQgY2xhc3M9XFxcIm5hbWVcXFwiPlwiKTtfLmIoXy52KF8uZihcIm5hbWVcIixjLHAsMCkpKTtfLmIoXCI8L3RkPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgPHRkIGNsYXNzPVxcXCJ2YWx1ZVxcXCI+XCIpO18uYihfLnYoXy5mKFwiZm9ybWF0dGVkVmFsdWVcIixjLHAsMCkpKTtfLmIoXCI8L3RkPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIjwvdHI+XCIpO3JldHVybiBfLmZsKCk7O30pO1xuXG50aGlzW1wiVGVtcGxhdGVzXCJdW1wiYXR0cmlidXRlcy9hdHRyaWJ1dGVzVGFibGVcIl0gPSBuZXcgSG9nYW4uVGVtcGxhdGUoZnVuY3Rpb24oYyxwLGkpe3ZhciBfPXRoaXM7Xy5iKGk9aXx8XCJcIik7Xy5iKFwiPHRhYmxlIGNsYXNzPVxcXCJhdHRyaWJ1dGVzXFxcIj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtpZihfLnMoXy5mKFwiYXR0cmlidXRlc1wiLGMscCwxKSxjLHAsMCw0NCw4MSxcInt7IH19XCIpKXtfLnJzKGMscCxmdW5jdGlvbihjLHAsXyl7Xy5iKF8ucnAoXCJhdHRyaWJ1dGVzL2F0dHJpYnV0ZUl0ZW1cIixjLHAsXCIgICAgXCIpKTt9KTtjLnBvcCgpO31fLmIoXCI8L3RhYmxlPlwiKTtfLmIoXCJcXG5cIik7cmV0dXJuIF8uZmwoKTs7fSk7XG5cbnRoaXNbXCJUZW1wbGF0ZXNcIl1bXCJkZW1vXCJdID0gbmV3IEhvZ2FuLlRlbXBsYXRlKGZ1bmN0aW9uKGMscCxpKXt2YXIgXz10aGlzO18uYihpPWl8fFwiXCIpO18uYihcIjxkaXYgY2xhc3M9XFxcInJlcG9ydFNlY3Rpb25cXFwiPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgPGg0PlJlcG9ydCBTZWN0aW9uczwvaDQ+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICA8cD5Vc2UgcmVwb3J0IHNlY3Rpb25zIHRvIGdyb3VwIGluZm9ybWF0aW9uIGludG8gbWVhbmluZ2Z1bCBjYXRlZ29yaWVzPC9wPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIjwvZGl2PlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiPGRpdiBjbGFzcz1cXFwicmVwb3J0U2VjdGlvblxcXCI+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICA8aDQ+RDMgVmlzdWFsaXphdGlvbnM8L2g0PlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgPHVsIGNsYXNzPVxcXCJuYXYgbmF2LXBpbGxzXFxcIiBpZD1cXFwidGFiczJcXFwiPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICA8bGkgY2xhc3M9XFxcImFjdGl2ZVxcXCI+PGEgaHJlZj1cXFwiI2NoYXJ0XFxcIj5DaGFydDwvYT48L2xpPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICA8bGk+PGEgaHJlZj1cXFwiI2RhdGFUYWJsZVxcXCI+VGFibGU8L2E+PC9saT5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgIDwvdWw+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICA8ZGl2IGNsYXNzPVxcXCJ0YWItY29udGVudFxcXCI+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgIDxkaXYgY2xhc3M9XFxcInRhYi1wYW5lIGFjdGl2ZVxcXCIgaWQ9XFxcImNoYXJ0XFxcIj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgICA8IS0tW2lmIElFIDhdPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgIDxwIGNsYXNzPVxcXCJ1bnN1cHBvcnRlZFxcXCI+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgVGhpcyB2aXN1YWxpemF0aW9uIGlzIG5vdCBjb21wYXRpYmxlIHdpdGggSW50ZXJuZXQgRXhwbG9yZXIgOC4gXCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgUGxlYXNlIHVwZ3JhZGUgeW91ciBicm93c2VyLCBvciB2aWV3IHJlc3VsdHMgaW4gdGhlIHRhYmxlIHRhYi5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgICA8L3A+ICAgICAgXCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgPCFbZW5kaWZdLS0+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgPHA+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgICBTZWUgPGNvZGU+c3JjL3NjcmlwdHMvZGVtby5jb2ZmZWU8L2NvZGU+IGZvciBhbiBleGFtcGxlIG9mIGhvdyB0byBcIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgICAgIHVzZSBkMy5qcyB0byByZW5kZXIgdmlzdWFsaXphdGlvbnMuIFByb3ZpZGUgYSB0YWJsZS1iYXNlZCB2aWV3XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgICBhbmQgdXNlIGNvbmRpdGlvbmFsIGNvbW1lbnRzIHRvIHByb3ZpZGUgYSBmYWxsYmFjayBmb3IgSUU4IHVzZXJzLlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgICAgPGJyPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgICAgPGEgaHJlZj1cXFwiaHR0cDovL3R3aXR0ZXIuZ2l0aHViLmlvL2Jvb3RzdHJhcC8yLjMuMi9cXFwiPkJvb3RzdHJhcCAyLng8L2E+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgICBpcyBsb2FkZWQgd2l0aGluIFNlYVNrZXRjaCBzbyB5b3UgY2FuIHVzZSBpdCB0byBjcmVhdGUgdGFicyBhbmQgb3RoZXIgXCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgICBpbnRlcmZhY2UgY29tcG9uZW50cy4galF1ZXJ5IGFuZCB1bmRlcnNjb3JlIGFyZSBhbHNvIGF2YWlsYWJsZS5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgICA8L3A+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgIDwvZGl2PlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICA8ZGl2IGNsYXNzPVxcXCJ0YWItcGFuZVxcXCIgaWQ9XFxcImRhdGFUYWJsZVxcXCI+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgPHRhYmxlPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgICAgPHRoZWFkPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgICAgICA8dHI+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgICAgICAgPHRoPmluZGV4PC90aD5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgICAgICAgICA8dGg+dmFsdWU8L3RoPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgICAgICA8L3RyPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgICAgPC90aGVhZD5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgICAgIDx0Ym9keT5cIik7Xy5iKFwiXFxuXCIgKyBpKTtpZihfLnMoXy5mKFwiY2hhcnREYXRhXCIsYyxwLDEpLGMscCwwLDEzNTEsMTQxOCxcInt7IH19XCIpKXtfLnJzKGMscCxmdW5jdGlvbihjLHAsXyl7Xy5iKFwiICAgICAgICAgIDx0cj48dGQ+XCIpO18uYihfLnYoXy5mKFwiaW5kZXhcIixjLHAsMCkpKTtfLmIoXCI8L3RkPjx0ZD5cIik7Xy5iKF8udihfLmYoXCJ2YWx1ZVwiLGMscCwwKSkpO18uYihcIjwvdGQ+PC90cj5cIik7Xy5iKFwiXFxuXCIpO30pO2MucG9wKCk7fV8uYihcIiAgICAgICAgPC90Ym9keT5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgICA8L3RhYmxlPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICA8L2Rpdj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgIDwvZGl2PlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIjwvZGl2PlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiPGRpdiBjbGFzcz1cXFwicmVwb3J0U2VjdGlvbiBlbXBoYXNpc1xcXCI+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICA8aDQ+RW1waGFzaXM8L2g0PlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgPHA+R2l2ZSByZXBvcnQgc2VjdGlvbnMgYW4gPGNvZGU+ZW1waGFzaXM8L2NvZGU+IGNsYXNzIHRvIGhpZ2hsaWdodCBpbXBvcnRhbnQgaW5mb3JtYXRpb24uPC9wPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIjwvZGl2PlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiPGRpdiBjbGFzcz1cXFwicmVwb3J0U2VjdGlvbiB3YXJuaW5nXFxcIj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgIDxoND5XYXJuaW5nPC9oND5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgIDxwPk9yIDxjb2RlPndhcm48L2NvZGU+IG9mIHBvdGVudGlhbCBwcm9ibGVtcy48L3A+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiPC9kaXY+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCI8ZGl2IGNsYXNzPVxcXCJyZXBvcnRTZWN0aW9uIGRhbmdlclxcXCI+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICA8aDQ+RGFuZ2VyPC9oND5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgIDxwPjxjb2RlPmRhbmdlcjwvY29kZT4gY2FuIGFsc28gYmUgdXNlZC4uLiBzcGFyaW5nbHkuPC9wPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIjwvZGl2PlwiKTtfLmIoXCJcXG5cIik7cmV0dXJuIF8uZmwoKTs7fSk7XG5cbnRoaXNbXCJUZW1wbGF0ZXNcIl1bXCJnZW5lcmljQXR0cmlidXRlc1wiXSA9IG5ldyBIb2dhbi5UZW1wbGF0ZShmdW5jdGlvbihjLHAsaSl7dmFyIF89dGhpcztfLmIoaT1pfHxcIlwiKTtpZihfLnMoXy5kKFwic2tldGNoQ2xhc3MuZGVsZXRlZFwiLGMscCwxKSxjLHAsMCwyNCwyNzAsXCJ7eyB9fVwiKSl7Xy5ycyhjLHAsZnVuY3Rpb24oYyxwLF8pe18uYihcIjxkaXYgY2xhc3M9XFxcImFsZXJ0IGFsZXJ0LXdhcm5cXFwiIHN0eWxlPVxcXCJtYXJnaW4tYm90dG9tOjEwcHg7XFxcIj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgIFRoaXMgc2tldGNoIHdhcyBjcmVhdGVkIHVzaW5nIHRoZSBcXFwiXCIpO18uYihfLnYoXy5kKFwic2tldGNoQ2xhc3MubmFtZVwiLGMscCwwKSkpO18uYihcIlxcXCIgdGVtcGxhdGUsIHdoaWNoIGlzXCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICBubyBsb25nZXIgYXZhaWxhYmxlLiBZb3Ugd2lsbCBub3QgYmUgYWJsZSB0byBjb3B5IHRoaXMgc2tldGNoIG9yIG1ha2UgbmV3XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICBza2V0Y2hlcyBvZiB0aGlzIHR5cGUuXCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiPC9kaXY+XCIpO18uYihcIlxcblwiKTt9KTtjLnBvcCgpO31fLmIoXCI8ZGl2IGNsYXNzPVxcXCJyZXBvcnRTZWN0aW9uXFxcIj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgIDxoND5cIik7Xy5iKF8udihfLmQoXCJza2V0Y2hDbGFzcy5uYW1lXCIsYyxwLDApKSk7Xy5iKFwiIEF0dHJpYnV0ZXM8L2g0PlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihfLnJwKFwiYXR0cmlidXRlcy9hdHRyaWJ1dGVzVGFibGVcIixjLHAsXCIgICAgXCIpKTtfLmIoXCIgIDwvdGFibGU+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiPC9kaXY+XCIpO18uYihcIlxcblwiKTtyZXR1cm4gXy5mbCgpOzt9KTtcblxubW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiVGVtcGxhdGVzXCJdOyIsImQzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBkMyA9IHtcbiAgICB2ZXJzaW9uOiBcIjMuMi43XCJcbiAgfTtcbiAgaWYgKCFEYXRlLm5vdykgRGF0ZS5ub3cgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gK25ldyBEYXRlKCk7XG4gIH07XG4gIHZhciBkM19kb2N1bWVudCA9IGRvY3VtZW50LCBkM19kb2N1bWVudEVsZW1lbnQgPSBkM19kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGQzX3dpbmRvdyA9IHdpbmRvdztcbiAgdHJ5IHtcbiAgICBkM19kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLnN0eWxlLnNldFByb3BlcnR5KFwib3BhY2l0eVwiLCAwLCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB2YXIgZDNfZWxlbWVudF9wcm90b3R5cGUgPSBkM193aW5kb3cuRWxlbWVudC5wcm90b3R5cGUsIGQzX2VsZW1lbnRfc2V0QXR0cmlidXRlID0gZDNfZWxlbWVudF9wcm90b3R5cGUuc2V0QXR0cmlidXRlLCBkM19lbGVtZW50X3NldEF0dHJpYnV0ZU5TID0gZDNfZWxlbWVudF9wcm90b3R5cGUuc2V0QXR0cmlidXRlTlMsIGQzX3N0eWxlX3Byb3RvdHlwZSA9IGQzX3dpbmRvdy5DU1NTdHlsZURlY2xhcmF0aW9uLnByb3RvdHlwZSwgZDNfc3R5bGVfc2V0UHJvcGVydHkgPSBkM19zdHlsZV9wcm90b3R5cGUuc2V0UHJvcGVydHk7XG4gICAgZDNfZWxlbWVudF9wcm90b3R5cGUuc2V0QXR0cmlidXRlID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIGQzX2VsZW1lbnRfc2V0QXR0cmlidXRlLmNhbGwodGhpcywgbmFtZSwgdmFsdWUgKyBcIlwiKTtcbiAgICB9O1xuICAgIGQzX2VsZW1lbnRfcHJvdG90eXBlLnNldEF0dHJpYnV0ZU5TID0gZnVuY3Rpb24oc3BhY2UsIGxvY2FsLCB2YWx1ZSkge1xuICAgICAgZDNfZWxlbWVudF9zZXRBdHRyaWJ1dGVOUy5jYWxsKHRoaXMsIHNwYWNlLCBsb2NhbCwgdmFsdWUgKyBcIlwiKTtcbiAgICB9O1xuICAgIGQzX3N0eWxlX3Byb3RvdHlwZS5zZXRQcm9wZXJ0eSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICAgICAgZDNfc3R5bGVfc2V0UHJvcGVydHkuY2FsbCh0aGlzLCBuYW1lLCB2YWx1ZSArIFwiXCIsIHByaW9yaXR5KTtcbiAgICB9O1xuICB9XG4gIGQzLmFzY2VuZGluZyA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IGEgPj0gYiA/IDAgOiBOYU47XG4gIH07XG4gIGQzLmRlc2NlbmRpbmcgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGIgPCBhID8gLTEgOiBiID4gYSA/IDEgOiBiID49IGEgPyAwIDogTmFOO1xuICB9O1xuICBkMy5taW4gPSBmdW5jdGlvbihhcnJheSwgZikge1xuICAgIHZhciBpID0gLTEsIG4gPSBhcnJheS5sZW5ndGgsIGEsIGI7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHdoaWxlICgrK2kgPCBuICYmICEoKGEgPSBhcnJheVtpXSkgIT0gbnVsbCAmJiBhIDw9IGEpKSBhID0gdW5kZWZpbmVkO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIGlmICgoYiA9IGFycmF5W2ldKSAhPSBudWxsICYmIGEgPiBiKSBhID0gYjtcbiAgICB9IGVsc2Uge1xuICAgICAgd2hpbGUgKCsraSA8IG4gJiYgISgoYSA9IGYuY2FsbChhcnJheSwgYXJyYXlbaV0sIGkpKSAhPSBudWxsICYmIGEgPD0gYSkpIGEgPSB1bmRlZmluZWQ7XG4gICAgICB3aGlsZSAoKytpIDwgbikgaWYgKChiID0gZi5jYWxsKGFycmF5LCBhcnJheVtpXSwgaSkpICE9IG51bGwgJiYgYSA+IGIpIGEgPSBiO1xuICAgIH1cbiAgICByZXR1cm4gYTtcbiAgfTtcbiAgZDMubWF4ID0gZnVuY3Rpb24oYXJyYXksIGYpIHtcbiAgICB2YXIgaSA9IC0xLCBuID0gYXJyYXkubGVuZ3RoLCBhLCBiO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICB3aGlsZSAoKytpIDwgbiAmJiAhKChhID0gYXJyYXlbaV0pICE9IG51bGwgJiYgYSA8PSBhKSkgYSA9IHVuZGVmaW5lZDtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoKGIgPSBhcnJheVtpXSkgIT0gbnVsbCAmJiBiID4gYSkgYSA9IGI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdoaWxlICgrK2kgPCBuICYmICEoKGEgPSBmLmNhbGwoYXJyYXksIGFycmF5W2ldLCBpKSkgIT0gbnVsbCAmJiBhIDw9IGEpKSBhID0gdW5kZWZpbmVkO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIGlmICgoYiA9IGYuY2FsbChhcnJheSwgYXJyYXlbaV0sIGkpKSAhPSBudWxsICYmIGIgPiBhKSBhID0gYjtcbiAgICB9XG4gICAgcmV0dXJuIGE7XG4gIH07XG4gIGQzLmV4dGVudCA9IGZ1bmN0aW9uKGFycmF5LCBmKSB7XG4gICAgdmFyIGkgPSAtMSwgbiA9IGFycmF5Lmxlbmd0aCwgYSwgYiwgYztcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgd2hpbGUgKCsraSA8IG4gJiYgISgoYSA9IGMgPSBhcnJheVtpXSkgIT0gbnVsbCAmJiBhIDw9IGEpKSBhID0gYyA9IHVuZGVmaW5lZDtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoKGIgPSBhcnJheVtpXSkgIT0gbnVsbCkge1xuICAgICAgICBpZiAoYSA+IGIpIGEgPSBiO1xuICAgICAgICBpZiAoYyA8IGIpIGMgPSBiO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB3aGlsZSAoKytpIDwgbiAmJiAhKChhID0gYyA9IGYuY2FsbChhcnJheSwgYXJyYXlbaV0sIGkpKSAhPSBudWxsICYmIGEgPD0gYSkpIGEgPSB1bmRlZmluZWQ7XG4gICAgICB3aGlsZSAoKytpIDwgbikgaWYgKChiID0gZi5jYWxsKGFycmF5LCBhcnJheVtpXSwgaSkpICE9IG51bGwpIHtcbiAgICAgICAgaWYgKGEgPiBiKSBhID0gYjtcbiAgICAgICAgaWYgKGMgPCBiKSBjID0gYjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFsgYSwgYyBdO1xuICB9O1xuICBkMy5zdW0gPSBmdW5jdGlvbihhcnJheSwgZikge1xuICAgIHZhciBzID0gMCwgbiA9IGFycmF5Lmxlbmd0aCwgYSwgaSA9IC0xO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICB3aGlsZSAoKytpIDwgbikgaWYgKCFpc05hTihhID0gK2FycmF5W2ldKSkgcyArPSBhO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aGlsZSAoKytpIDwgbikgaWYgKCFpc05hTihhID0gK2YuY2FsbChhcnJheSwgYXJyYXlbaV0sIGkpKSkgcyArPSBhO1xuICAgIH1cbiAgICByZXR1cm4gcztcbiAgfTtcbiAgZnVuY3Rpb24gZDNfbnVtYmVyKHgpIHtcbiAgICByZXR1cm4geCAhPSBudWxsICYmICFpc05hTih4KTtcbiAgfVxuICBkMy5tZWFuID0gZnVuY3Rpb24oYXJyYXksIGYpIHtcbiAgICB2YXIgbiA9IGFycmF5Lmxlbmd0aCwgYSwgbSA9IDAsIGkgPSAtMSwgaiA9IDA7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoZDNfbnVtYmVyKGEgPSBhcnJheVtpXSkpIG0gKz0gKGEgLSBtKSAvICsrajtcbiAgICB9IGVsc2Uge1xuICAgICAgd2hpbGUgKCsraSA8IG4pIGlmIChkM19udW1iZXIoYSA9IGYuY2FsbChhcnJheSwgYXJyYXlbaV0sIGkpKSkgbSArPSAoYSAtIG0pIC8gKytqO1xuICAgIH1cbiAgICByZXR1cm4gaiA/IG0gOiB1bmRlZmluZWQ7XG4gIH07XG4gIGQzLnF1YW50aWxlID0gZnVuY3Rpb24odmFsdWVzLCBwKSB7XG4gICAgdmFyIEggPSAodmFsdWVzLmxlbmd0aCAtIDEpICogcCArIDEsIGggPSBNYXRoLmZsb29yKEgpLCB2ID0gK3ZhbHVlc1toIC0gMV0sIGUgPSBIIC0gaDtcbiAgICByZXR1cm4gZSA/IHYgKyBlICogKHZhbHVlc1toXSAtIHYpIDogdjtcbiAgfTtcbiAgZDMubWVkaWFuID0gZnVuY3Rpb24oYXJyYXksIGYpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIGFycmF5ID0gYXJyYXkubWFwKGYpO1xuICAgIGFycmF5ID0gYXJyYXkuZmlsdGVyKGQzX251bWJlcik7XG4gICAgcmV0dXJuIGFycmF5Lmxlbmd0aCA/IGQzLnF1YW50aWxlKGFycmF5LnNvcnQoZDMuYXNjZW5kaW5nKSwgLjUpIDogdW5kZWZpbmVkO1xuICB9O1xuICBkMy5iaXNlY3RvciA9IGZ1bmN0aW9uKGYpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGVmdDogZnVuY3Rpb24oYSwgeCwgbG8sIGhpKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykgbG8gPSAwO1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDQpIGhpID0gYS5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChsbyA8IGhpKSB7XG4gICAgICAgICAgdmFyIG1pZCA9IGxvICsgaGkgPj4+IDE7XG4gICAgICAgICAgaWYgKGYuY2FsbChhLCBhW21pZF0sIG1pZCkgPCB4KSBsbyA9IG1pZCArIDE7IGVsc2UgaGkgPSBtaWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxvO1xuICAgICAgfSxcbiAgICAgIHJpZ2h0OiBmdW5jdGlvbihhLCB4LCBsbywgaGkpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSBsbyA9IDA7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgNCkgaGkgPSBhLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGxvIDwgaGkpIHtcbiAgICAgICAgICB2YXIgbWlkID0gbG8gKyBoaSA+Pj4gMTtcbiAgICAgICAgICBpZiAoeCA8IGYuY2FsbChhLCBhW21pZF0sIG1pZCkpIGhpID0gbWlkOyBlbHNlIGxvID0gbWlkICsgMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbG87XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbiAgdmFyIGQzX2Jpc2VjdG9yID0gZDMuYmlzZWN0b3IoZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBkO1xuICB9KTtcbiAgZDMuYmlzZWN0TGVmdCA9IGQzX2Jpc2VjdG9yLmxlZnQ7XG4gIGQzLmJpc2VjdCA9IGQzLmJpc2VjdFJpZ2h0ID0gZDNfYmlzZWN0b3IucmlnaHQ7XG4gIGQzLnNodWZmbGUgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIHZhciBtID0gYXJyYXkubGVuZ3RoLCB0LCBpO1xuICAgIHdoaWxlIChtKSB7XG4gICAgICBpID0gTWF0aC5yYW5kb20oKSAqIG0tLSB8IDA7XG4gICAgICB0ID0gYXJyYXlbbV0sIGFycmF5W21dID0gYXJyYXlbaV0sIGFycmF5W2ldID0gdDtcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5O1xuICB9O1xuICBkMy5wZXJtdXRlID0gZnVuY3Rpb24oYXJyYXksIGluZGV4ZXMpIHtcbiAgICB2YXIgcGVybXV0ZXMgPSBbXSwgaSA9IC0xLCBuID0gaW5kZXhlcy5sZW5ndGg7XG4gICAgd2hpbGUgKCsraSA8IG4pIHBlcm11dGVzW2ldID0gYXJyYXlbaW5kZXhlc1tpXV07XG4gICAgcmV0dXJuIHBlcm11dGVzO1xuICB9O1xuICBkMy56aXAgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIShuID0gYXJndW1lbnRzLmxlbmd0aCkpIHJldHVybiBbXTtcbiAgICBmb3IgKHZhciBpID0gLTEsIG0gPSBkMy5taW4oYXJndW1lbnRzLCBkM196aXBMZW5ndGgpLCB6aXBzID0gbmV3IEFycmF5KG0pOyArK2kgPCBtOyApIHtcbiAgICAgIGZvciAodmFyIGogPSAtMSwgbiwgemlwID0gemlwc1tpXSA9IG5ldyBBcnJheShuKTsgKytqIDwgbjsgKSB7XG4gICAgICAgIHppcFtqXSA9IGFyZ3VtZW50c1tqXVtpXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHppcHM7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3ppcExlbmd0aChkKSB7XG4gICAgcmV0dXJuIGQubGVuZ3RoO1xuICB9XG4gIGQzLnRyYW5zcG9zZSA9IGZ1bmN0aW9uKG1hdHJpeCkge1xuICAgIHJldHVybiBkMy56aXAuYXBwbHkoZDMsIG1hdHJpeCk7XG4gIH07XG4gIGQzLmtleXMgPSBmdW5jdGlvbihtYXApIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBtYXApIGtleXMucHVzaChrZXkpO1xuICAgIHJldHVybiBrZXlzO1xuICB9O1xuICBkMy52YWx1ZXMgPSBmdW5jdGlvbihtYXApIHtcbiAgICB2YXIgdmFsdWVzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG1hcCkgdmFsdWVzLnB1c2gobWFwW2tleV0pO1xuICAgIHJldHVybiB2YWx1ZXM7XG4gIH07XG4gIGQzLmVudHJpZXMgPSBmdW5jdGlvbihtYXApIHtcbiAgICB2YXIgZW50cmllcyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBtYXApIGVudHJpZXMucHVzaCh7XG4gICAgICBrZXk6IGtleSxcbiAgICAgIHZhbHVlOiBtYXBba2V5XVxuICAgIH0pO1xuICAgIHJldHVybiBlbnRyaWVzO1xuICB9O1xuICBkMy5tZXJnZSA9IGZ1bmN0aW9uKGFycmF5cykge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtdLCBhcnJheXMpO1xuICB9O1xuICBkMy5yYW5nZSA9IGZ1bmN0aW9uKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG4gICAgICBzdGVwID0gMTtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgICBzdG9wID0gc3RhcnQ7XG4gICAgICAgIHN0YXJ0ID0gMDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKChzdG9wIC0gc3RhcnQpIC8gc3RlcCA9PT0gSW5maW5pdHkpIHRocm93IG5ldyBFcnJvcihcImluZmluaXRlIHJhbmdlXCIpO1xuICAgIHZhciByYW5nZSA9IFtdLCBrID0gZDNfcmFuZ2VfaW50ZWdlclNjYWxlKE1hdGguYWJzKHN0ZXApKSwgaSA9IC0xLCBqO1xuICAgIHN0YXJ0ICo9IGssIHN0b3AgKj0gaywgc3RlcCAqPSBrO1xuICAgIGlmIChzdGVwIDwgMCkgd2hpbGUgKChqID0gc3RhcnQgKyBzdGVwICogKytpKSA+IHN0b3ApIHJhbmdlLnB1c2goaiAvIGspOyBlbHNlIHdoaWxlICgoaiA9IHN0YXJ0ICsgc3RlcCAqICsraSkgPCBzdG9wKSByYW5nZS5wdXNoKGogLyBrKTtcbiAgICByZXR1cm4gcmFuZ2U7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3JhbmdlX2ludGVnZXJTY2FsZSh4KSB7XG4gICAgdmFyIGsgPSAxO1xuICAgIHdoaWxlICh4ICogayAlIDEpIGsgKj0gMTA7XG4gICAgcmV0dXJuIGs7XG4gIH1cbiAgZnVuY3Rpb24gZDNfY2xhc3MoY3RvciwgcHJvcGVydGllcykge1xuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gcHJvcGVydGllcykge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3Rvci5wcm90b3R5cGUsIGtleSwge1xuICAgICAgICAgIHZhbHVlOiBwcm9wZXJ0aWVzW2tleV0sXG4gICAgICAgICAgZW51bWVyYWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY3Rvci5wcm90b3R5cGUgPSBwcm9wZXJ0aWVzO1xuICAgIH1cbiAgfVxuICBkMy5tYXAgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIgbWFwID0gbmV3IGQzX01hcCgpO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIG1hcC5zZXQoa2V5LCBvYmplY3Rba2V5XSk7XG4gICAgcmV0dXJuIG1hcDtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfTWFwKCkge31cbiAgZDNfY2xhc3MoZDNfTWFwLCB7XG4gICAgaGFzOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBkM19tYXBfcHJlZml4ICsga2V5IGluIHRoaXM7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIHRoaXNbZDNfbWFwX3ByZWZpeCArIGtleV07XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzW2QzX21hcF9wcmVmaXggKyBrZXldID0gdmFsdWU7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uKGtleSkge1xuICAgICAga2V5ID0gZDNfbWFwX3ByZWZpeCArIGtleTtcbiAgICAgIHJldHVybiBrZXkgaW4gdGhpcyAmJiBkZWxldGUgdGhpc1trZXldO1xuICAgIH0sXG4gICAga2V5czogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGtleXM7XG4gICAgfSxcbiAgICB2YWx1ZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgdmFsdWVzLnB1c2godmFsdWUpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH0sXG4gICAgZW50cmllczogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZW50cmllcyA9IFtdO1xuICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgZW50cmllcy5wdXNoKHtcbiAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBlbnRyaWVzO1xuICAgIH0sXG4gICAgZm9yRWFjaDogZnVuY3Rpb24oZikge1xuICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcbiAgICAgICAgaWYgKGtleS5jaGFyQ29kZUF0KDApID09PSBkM19tYXBfcHJlZml4Q29kZSkge1xuICAgICAgICAgIGYuY2FsbCh0aGlzLCBrZXkuc3Vic3RyaW5nKDEpLCB0aGlzW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgdmFyIGQzX21hcF9wcmVmaXggPSBcIlxcMFwiLCBkM19tYXBfcHJlZml4Q29kZSA9IGQzX21hcF9wcmVmaXguY2hhckNvZGVBdCgwKTtcbiAgZDMubmVzdCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBuZXN0ID0ge30sIGtleXMgPSBbXSwgc29ydEtleXMgPSBbXSwgc29ydFZhbHVlcywgcm9sbHVwO1xuICAgIGZ1bmN0aW9uIG1hcChtYXBUeXBlLCBhcnJheSwgZGVwdGgpIHtcbiAgICAgIGlmIChkZXB0aCA+PSBrZXlzLmxlbmd0aCkgcmV0dXJuIHJvbGx1cCA/IHJvbGx1cC5jYWxsKG5lc3QsIGFycmF5KSA6IHNvcnRWYWx1ZXMgPyBhcnJheS5zb3J0KHNvcnRWYWx1ZXMpIDogYXJyYXk7XG4gICAgICB2YXIgaSA9IC0xLCBuID0gYXJyYXkubGVuZ3RoLCBrZXkgPSBrZXlzW2RlcHRoKytdLCBrZXlWYWx1ZSwgb2JqZWN0LCBzZXR0ZXIsIHZhbHVlc0J5S2V5ID0gbmV3IGQzX01hcCgpLCB2YWx1ZXM7XG4gICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICBpZiAodmFsdWVzID0gdmFsdWVzQnlLZXkuZ2V0KGtleVZhbHVlID0ga2V5KG9iamVjdCA9IGFycmF5W2ldKSkpIHtcbiAgICAgICAgICB2YWx1ZXMucHVzaChvYmplY3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlc0J5S2V5LnNldChrZXlWYWx1ZSwgWyBvYmplY3QgXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtYXBUeXBlKSB7XG4gICAgICAgIG9iamVjdCA9IG1hcFR5cGUoKTtcbiAgICAgICAgc2V0dGVyID0gZnVuY3Rpb24oa2V5VmFsdWUsIHZhbHVlcykge1xuICAgICAgICAgIG9iamVjdC5zZXQoa2V5VmFsdWUsIG1hcChtYXBUeXBlLCB2YWx1ZXMsIGRlcHRoKSk7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYmplY3QgPSB7fTtcbiAgICAgICAgc2V0dGVyID0gZnVuY3Rpb24oa2V5VmFsdWUsIHZhbHVlcykge1xuICAgICAgICAgIG9iamVjdFtrZXlWYWx1ZV0gPSBtYXAobWFwVHlwZSwgdmFsdWVzLCBkZXB0aCk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICB2YWx1ZXNCeUtleS5mb3JFYWNoKHNldHRlcik7XG4gICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBlbnRyaWVzKG1hcCwgZGVwdGgpIHtcbiAgICAgIGlmIChkZXB0aCA+PSBrZXlzLmxlbmd0aCkgcmV0dXJuIG1hcDtcbiAgICAgIHZhciBhcnJheSA9IFtdLCBzb3J0S2V5ID0gc29ydEtleXNbZGVwdGgrK107XG4gICAgICBtYXAuZm9yRWFjaChmdW5jdGlvbihrZXksIGtleU1hcCkge1xuICAgICAgICBhcnJheS5wdXNoKHtcbiAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICB2YWx1ZXM6IGVudHJpZXMoa2V5TWFwLCBkZXB0aClcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBzb3J0S2V5ID8gYXJyYXkuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHJldHVybiBzb3J0S2V5KGEua2V5LCBiLmtleSk7XG4gICAgICB9KSA6IGFycmF5O1xuICAgIH1cbiAgICBuZXN0Lm1hcCA9IGZ1bmN0aW9uKGFycmF5LCBtYXBUeXBlKSB7XG4gICAgICByZXR1cm4gbWFwKG1hcFR5cGUsIGFycmF5LCAwKTtcbiAgICB9O1xuICAgIG5lc3QuZW50cmllcyA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgICByZXR1cm4gZW50cmllcyhtYXAoZDMubWFwLCBhcnJheSwgMCksIDApO1xuICAgIH07XG4gICAgbmVzdC5rZXkgPSBmdW5jdGlvbihkKSB7XG4gICAgICBrZXlzLnB1c2goZCk7XG4gICAgICByZXR1cm4gbmVzdDtcbiAgICB9O1xuICAgIG5lc3Quc29ydEtleXMgPSBmdW5jdGlvbihvcmRlcikge1xuICAgICAgc29ydEtleXNba2V5cy5sZW5ndGggLSAxXSA9IG9yZGVyO1xuICAgICAgcmV0dXJuIG5lc3Q7XG4gICAgfTtcbiAgICBuZXN0LnNvcnRWYWx1ZXMgPSBmdW5jdGlvbihvcmRlcikge1xuICAgICAgc29ydFZhbHVlcyA9IG9yZGVyO1xuICAgICAgcmV0dXJuIG5lc3Q7XG4gICAgfTtcbiAgICBuZXN0LnJvbGx1cCA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgIHJvbGx1cCA9IGY7XG4gICAgICByZXR1cm4gbmVzdDtcbiAgICB9O1xuICAgIHJldHVybiBuZXN0O1xuICB9O1xuICBkMy5zZXQgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIHZhciBzZXQgPSBuZXcgZDNfU2V0KCk7XG4gICAgaWYgKGFycmF5KSBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSBzZXQuYWRkKGFycmF5W2ldKTtcbiAgICByZXR1cm4gc2V0O1xuICB9O1xuICBmdW5jdGlvbiBkM19TZXQoKSB7fVxuICBkM19jbGFzcyhkM19TZXQsIHtcbiAgICBoYXM6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZDNfbWFwX3ByZWZpeCArIHZhbHVlIGluIHRoaXM7XG4gICAgfSxcbiAgICBhZGQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB0aGlzW2QzX21hcF9wcmVmaXggKyB2YWx1ZV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFsdWUgPSBkM19tYXBfcHJlZml4ICsgdmFsdWU7XG4gICAgICByZXR1cm4gdmFsdWUgaW4gdGhpcyAmJiBkZWxldGUgdGhpc1t2YWx1ZV07XG4gICAgfSxcbiAgICB2YWx1ZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9LFxuICAgIGZvckVhY2g6IGZ1bmN0aW9uKGYpIHtcbiAgICAgIGZvciAodmFyIHZhbHVlIGluIHRoaXMpIHtcbiAgICAgICAgaWYgKHZhbHVlLmNoYXJDb2RlQXQoMCkgPT09IGQzX21hcF9wcmVmaXhDb2RlKSB7XG4gICAgICAgICAgZi5jYWxsKHRoaXMsIHZhbHVlLnN1YnN0cmluZygxKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBkMy5iZWhhdmlvciA9IHt9O1xuICBkMy5yZWJpbmQgPSBmdW5jdGlvbih0YXJnZXQsIHNvdXJjZSkge1xuICAgIHZhciBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGgsIG1ldGhvZDtcbiAgICB3aGlsZSAoKytpIDwgbikgdGFyZ2V0W21ldGhvZCA9IGFyZ3VtZW50c1tpXV0gPSBkM19yZWJpbmQodGFyZ2V0LCBzb3VyY2UsIHNvdXJjZVttZXRob2RdKTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuICBmdW5jdGlvbiBkM19yZWJpbmQodGFyZ2V0LCBzb3VyY2UsIG1ldGhvZCkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB2YWx1ZSA9IG1ldGhvZC5hcHBseShzb3VyY2UsIGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gdmFsdWUgPT09IHNvdXJjZSA/IHRhcmdldCA6IHZhbHVlO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gZDNfdmVuZG9yU3ltYm9sKG9iamVjdCwgbmFtZSkge1xuICAgIGlmIChuYW1lIGluIG9iamVjdCkgcmV0dXJuIG5hbWU7XG4gICAgbmFtZSA9IG5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnN1YnN0cmluZygxKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbiA9IGQzX3ZlbmRvclByZWZpeGVzLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgdmFyIHByZWZpeE5hbWUgPSBkM192ZW5kb3JQcmVmaXhlc1tpXSArIG5hbWU7XG4gICAgICBpZiAocHJlZml4TmFtZSBpbiBvYmplY3QpIHJldHVybiBwcmVmaXhOYW1lO1xuICAgIH1cbiAgfVxuICB2YXIgZDNfdmVuZG9yUHJlZml4ZXMgPSBbIFwid2Via2l0XCIsIFwibXNcIiwgXCJtb3pcIiwgXCJNb3pcIiwgXCJvXCIsIFwiT1wiIF07XG4gIHZhciBkM19hcnJheSA9IGQzX2FycmF5U2xpY2U7XG4gIGZ1bmN0aW9uIGQzX2FycmF5Q29weShwc2V1ZG9hcnJheSkge1xuICAgIHZhciBpID0gLTEsIG4gPSBwc2V1ZG9hcnJheS5sZW5ndGgsIGFycmF5ID0gW107XG4gICAgd2hpbGUgKCsraSA8IG4pIGFycmF5LnB1c2gocHNldWRvYXJyYXlbaV0pO1xuICAgIHJldHVybiBhcnJheTtcbiAgfVxuICBmdW5jdGlvbiBkM19hcnJheVNsaWNlKHBzZXVkb2FycmF5KSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHBzZXVkb2FycmF5KTtcbiAgfVxuICB0cnkge1xuICAgIGQzX2FycmF5KGQzX2RvY3VtZW50RWxlbWVudC5jaGlsZE5vZGVzKVswXS5ub2RlVHlwZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGQzX2FycmF5ID0gZDNfYXJyYXlDb3B5O1xuICB9XG4gIGZ1bmN0aW9uIGQzX25vb3AoKSB7fVxuICBkMy5kaXNwYXRjaCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkaXNwYXRjaCA9IG5ldyBkM19kaXNwYXRjaCgpLCBpID0gLTEsIG4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHdoaWxlICgrK2kgPCBuKSBkaXNwYXRjaFthcmd1bWVudHNbaV1dID0gZDNfZGlzcGF0Y2hfZXZlbnQoZGlzcGF0Y2gpO1xuICAgIHJldHVybiBkaXNwYXRjaDtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfZGlzcGF0Y2goKSB7fVxuICBkM19kaXNwYXRjaC5wcm90b3R5cGUub24gPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICAgIHZhciBpID0gdHlwZS5pbmRleE9mKFwiLlwiKSwgbmFtZSA9IFwiXCI7XG4gICAgaWYgKGkgPj0gMCkge1xuICAgICAgbmFtZSA9IHR5cGUuc3Vic3RyaW5nKGkgKyAxKTtcbiAgICAgIHR5cGUgPSB0eXBlLnN1YnN0cmluZygwLCBpKTtcbiAgICB9XG4gICAgaWYgKHR5cGUpIHJldHVybiBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IHRoaXNbdHlwZV0ub24obmFtZSkgOiB0aGlzW3R5cGVdLm9uKG5hbWUsIGxpc3RlbmVyKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgaWYgKGxpc3RlbmVyID09IG51bGwpIGZvciAodHlwZSBpbiB0aGlzKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KHR5cGUpKSB0aGlzW3R5cGVdLm9uKG5hbWUsIG51bGwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9O1xuICBmdW5jdGlvbiBkM19kaXNwYXRjaF9ldmVudChkaXNwYXRjaCkge1xuICAgIHZhciBsaXN0ZW5lcnMgPSBbXSwgbGlzdGVuZXJCeU5hbWUgPSBuZXcgZDNfTWFwKCk7XG4gICAgZnVuY3Rpb24gZXZlbnQoKSB7XG4gICAgICB2YXIgeiA9IGxpc3RlbmVycywgaSA9IC0xLCBuID0gei5sZW5ndGgsIGw7XG4gICAgICB3aGlsZSAoKytpIDwgbikgaWYgKGwgPSB6W2ldLm9uKSBsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gZGlzcGF0Y2g7XG4gICAgfVxuICAgIGV2ZW50Lm9uID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsID0gbGlzdGVuZXJCeU5hbWUuZ2V0KG5hbWUpLCBpO1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gbCAmJiBsLm9uO1xuICAgICAgaWYgKGwpIHtcbiAgICAgICAgbC5vbiA9IG51bGw7XG4gICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5zbGljZSgwLCBpID0gbGlzdGVuZXJzLmluZGV4T2YobCkpLmNvbmNhdChsaXN0ZW5lcnMuc2xpY2UoaSArIDEpKTtcbiAgICAgICAgbGlzdGVuZXJCeU5hbWUucmVtb3ZlKG5hbWUpO1xuICAgICAgfVxuICAgICAgaWYgKGxpc3RlbmVyKSBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lckJ5TmFtZS5zZXQobmFtZSwge1xuICAgICAgICBvbjogbGlzdGVuZXJcbiAgICAgIH0pKTtcbiAgICAgIHJldHVybiBkaXNwYXRjaDtcbiAgICB9O1xuICAgIHJldHVybiBldmVudDtcbiAgfVxuICBkMy5ldmVudCA9IG51bGw7XG4gIGZ1bmN0aW9uIGQzX2V2ZW50UHJldmVudERlZmF1bHQoKSB7XG4gICAgZDMuZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICBmdW5jdGlvbiBkM19ldmVudFNvdXJjZSgpIHtcbiAgICB2YXIgZSA9IGQzLmV2ZW50LCBzO1xuICAgIHdoaWxlIChzID0gZS5zb3VyY2VFdmVudCkgZSA9IHM7XG4gICAgcmV0dXJuIGU7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZXZlbnREaXNwYXRjaCh0YXJnZXQpIHtcbiAgICB2YXIgZGlzcGF0Y2ggPSBuZXcgZDNfZGlzcGF0Y2goKSwgaSA9IDAsIG4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHdoaWxlICgrK2kgPCBuKSBkaXNwYXRjaFthcmd1bWVudHNbaV1dID0gZDNfZGlzcGF0Y2hfZXZlbnQoZGlzcGF0Y2gpO1xuICAgIGRpc3BhdGNoLm9mID0gZnVuY3Rpb24odGhpeiwgYXJndW1lbnR6KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oZTEpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YXIgZTAgPSBlMS5zb3VyY2VFdmVudCA9IGQzLmV2ZW50O1xuICAgICAgICAgIGUxLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICBkMy5ldmVudCA9IGUxO1xuICAgICAgICAgIGRpc3BhdGNoW2UxLnR5cGVdLmFwcGx5KHRoaXosIGFyZ3VtZW50eik7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgZDMuZXZlbnQgPSBlMDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBkaXNwYXRjaDtcbiAgfVxuICBkMy5yZXF1b3RlID0gZnVuY3Rpb24ocykge1xuICAgIHJldHVybiBzLnJlcGxhY2UoZDNfcmVxdW90ZV9yZSwgXCJcXFxcJCZcIik7XG4gIH07XG4gIHZhciBkM19yZXF1b3RlX3JlID0gL1tcXFxcXFxeXFwkXFwqXFwrXFw/XFx8XFxbXFxdXFwoXFwpXFwuXFx7XFx9XS9nO1xuICB2YXIgZDNfc3ViY2xhc3MgPSB7fS5fX3Byb3RvX18gPyBmdW5jdGlvbihvYmplY3QsIHByb3RvdHlwZSkge1xuICAgIG9iamVjdC5fX3Byb3RvX18gPSBwcm90b3R5cGU7XG4gIH0gOiBmdW5jdGlvbihvYmplY3QsIHByb3RvdHlwZSkge1xuICAgIGZvciAodmFyIHByb3BlcnR5IGluIHByb3RvdHlwZSkgb2JqZWN0W3Byb3BlcnR5XSA9IHByb3RvdHlwZVtwcm9wZXJ0eV07XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3NlbGVjdGlvbihncm91cHMpIHtcbiAgICBkM19zdWJjbGFzcyhncm91cHMsIGQzX3NlbGVjdGlvblByb3RvdHlwZSk7XG4gICAgcmV0dXJuIGdyb3VwcztcbiAgfVxuICB2YXIgZDNfc2VsZWN0ID0gZnVuY3Rpb24ocywgbikge1xuICAgIHJldHVybiBuLnF1ZXJ5U2VsZWN0b3Iocyk7XG4gIH0sIGQzX3NlbGVjdEFsbCA9IGZ1bmN0aW9uKHMsIG4pIHtcbiAgICByZXR1cm4gbi5xdWVyeVNlbGVjdG9yQWxsKHMpO1xuICB9LCBkM19zZWxlY3RNYXRjaGVyID0gZDNfZG9jdW1lbnRFbGVtZW50W2QzX3ZlbmRvclN5bWJvbChkM19kb2N1bWVudEVsZW1lbnQsIFwibWF0Y2hlc1NlbGVjdG9yXCIpXSwgZDNfc2VsZWN0TWF0Y2hlcyA9IGZ1bmN0aW9uKG4sIHMpIHtcbiAgICByZXR1cm4gZDNfc2VsZWN0TWF0Y2hlci5jYWxsKG4sIHMpO1xuICB9O1xuICBpZiAodHlwZW9mIFNpenpsZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZDNfc2VsZWN0ID0gZnVuY3Rpb24ocywgbikge1xuICAgICAgcmV0dXJuIFNpenpsZShzLCBuKVswXSB8fCBudWxsO1xuICAgIH07XG4gICAgZDNfc2VsZWN0QWxsID0gZnVuY3Rpb24ocywgbikge1xuICAgICAgcmV0dXJuIFNpenpsZS51bmlxdWVTb3J0KFNpenpsZShzLCBuKSk7XG4gICAgfTtcbiAgICBkM19zZWxlY3RNYXRjaGVzID0gU2l6emxlLm1hdGNoZXNTZWxlY3RvcjtcbiAgfVxuICBkMy5zZWxlY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfc2VsZWN0aW9uUm9vdDtcbiAgfTtcbiAgdmFyIGQzX3NlbGVjdGlvblByb3RvdHlwZSA9IGQzLnNlbGVjdGlvbi5wcm90b3R5cGUgPSBbXTtcbiAgZDNfc2VsZWN0aW9uUHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gICAgdmFyIHN1Ymdyb3VwcyA9IFtdLCBzdWJncm91cCwgc3Vibm9kZSwgZ3JvdXAsIG5vZGU7XG4gICAgc2VsZWN0b3IgPSBkM19zZWxlY3Rpb25fc2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIGZvciAodmFyIGogPSAtMSwgbSA9IHRoaXMubGVuZ3RoOyArK2ogPCBtOyApIHtcbiAgICAgIHN1Ymdyb3Vwcy5wdXNoKHN1Ymdyb3VwID0gW10pO1xuICAgICAgc3ViZ3JvdXAucGFyZW50Tm9kZSA9IChncm91cCA9IHRoaXNbal0pLnBhcmVudE5vZGU7XG4gICAgICBmb3IgKHZhciBpID0gLTEsIG4gPSBncm91cC5sZW5ndGg7ICsraSA8IG47ICkge1xuICAgICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgICAgc3ViZ3JvdXAucHVzaChzdWJub2RlID0gc2VsZWN0b3IuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBqKSk7XG4gICAgICAgICAgaWYgKHN1Ym5vZGUgJiYgXCJfX2RhdGFfX1wiIGluIG5vZGUpIHN1Ym5vZGUuX19kYXRhX18gPSBub2RlLl9fZGF0YV9fO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1Ymdyb3VwLnB1c2gobnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGQzX3NlbGVjdGlvbihzdWJncm91cHMpO1xuICB9O1xuICBmdW5jdGlvbiBkM19zZWxlY3Rpb25fc2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gdHlwZW9mIHNlbGVjdG9yID09PSBcImZ1bmN0aW9uXCIgPyBzZWxlY3RvciA6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGQzX3NlbGVjdChzZWxlY3RvciwgdGhpcyk7XG4gICAgfTtcbiAgfVxuICBkM19zZWxlY3Rpb25Qcm90b3R5cGUuc2VsZWN0QWxsID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgICB2YXIgc3ViZ3JvdXBzID0gW10sIHN1Ymdyb3VwLCBub2RlO1xuICAgIHNlbGVjdG9yID0gZDNfc2VsZWN0aW9uX3NlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICBmb3IgKHZhciBqID0gLTEsIG0gPSB0aGlzLmxlbmd0aDsgKytqIDwgbTsgKSB7XG4gICAgICBmb3IgKHZhciBncm91cCA9IHRoaXNbal0sIGkgPSAtMSwgbiA9IGdyb3VwLmxlbmd0aDsgKytpIDwgbjsgKSB7XG4gICAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgICBzdWJncm91cHMucHVzaChzdWJncm91cCA9IGQzX2FycmF5KHNlbGVjdG9yLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgaikpKTtcbiAgICAgICAgICBzdWJncm91cC5wYXJlbnROb2RlID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZDNfc2VsZWN0aW9uKHN1Ymdyb3Vwcyk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3NlbGVjdGlvbl9zZWxlY3RvckFsbChzZWxlY3Rvcikge1xuICAgIHJldHVybiB0eXBlb2Ygc2VsZWN0b3IgPT09IFwiZnVuY3Rpb25cIiA/IHNlbGVjdG9yIDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZDNfc2VsZWN0QWxsKHNlbGVjdG9yLCB0aGlzKTtcbiAgICB9O1xuICB9XG4gIHZhciBkM19uc1ByZWZpeCA9IHtcbiAgICBzdmc6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICB4aHRtbDogXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCIsXG4gICAgeGxpbms6IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiLFxuICAgIHhtbDogXCJodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2VcIixcbiAgICB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3htbG5zL1wiXG4gIH07XG4gIGQzLm5zID0ge1xuICAgIHByZWZpeDogZDNfbnNQcmVmaXgsXG4gICAgcXVhbGlmeTogZnVuY3Rpb24obmFtZSkge1xuICAgICAgdmFyIGkgPSBuYW1lLmluZGV4T2YoXCI6XCIpLCBwcmVmaXggPSBuYW1lO1xuICAgICAgaWYgKGkgPj0gMCkge1xuICAgICAgICBwcmVmaXggPSBuYW1lLnN1YnN0cmluZygwLCBpKTtcbiAgICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyaW5nKGkgKyAxKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkM19uc1ByZWZpeC5oYXNPd25Qcm9wZXJ0eShwcmVmaXgpID8ge1xuICAgICAgICBzcGFjZTogZDNfbnNQcmVmaXhbcHJlZml4XSxcbiAgICAgICAgbG9jYWw6IG5hbWVcbiAgICAgIH0gOiBuYW1lO1xuICAgIH1cbiAgfTtcbiAgZDNfc2VsZWN0aW9uUHJvdG90eXBlLmF0dHIgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlKCk7XG4gICAgICAgIG5hbWUgPSBkMy5ucy5xdWFsaWZ5KG5hbWUpO1xuICAgICAgICByZXR1cm4gbmFtZS5sb2NhbCA/IG5vZGUuZ2V0QXR0cmlidXRlTlMobmFtZS5zcGFjZSwgbmFtZS5sb2NhbCkgOiBub2RlLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFsdWUgaW4gbmFtZSkgdGhpcy5lYWNoKGQzX3NlbGVjdGlvbl9hdHRyKHZhbHVlLCBuYW1lW3ZhbHVlXSkpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVhY2goZDNfc2VsZWN0aW9uX2F0dHIobmFtZSwgdmFsdWUpKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfc2VsZWN0aW9uX2F0dHIobmFtZSwgdmFsdWUpIHtcbiAgICBuYW1lID0gZDMubnMucXVhbGlmeShuYW1lKTtcbiAgICBmdW5jdGlvbiBhdHRyTnVsbCgpIHtcbiAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhdHRyTnVsbE5TKCkge1xuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGVOUyhuYW1lLnNwYWNlLCBuYW1lLmxvY2FsKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYXR0ckNvbnN0YW50KCkge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhdHRyQ29uc3RhbnROUygpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlTlMobmFtZS5zcGFjZSwgbmFtZS5sb2NhbCwgdmFsdWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhdHRyRnVuY3Rpb24oKSB7XG4gICAgICB2YXIgeCA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICBpZiAoeCA9PSBudWxsKSB0aGlzLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTsgZWxzZSB0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCB4KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYXR0ckZ1bmN0aW9uTlMoKSB7XG4gICAgICB2YXIgeCA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICBpZiAoeCA9PSBudWxsKSB0aGlzLnJlbW92ZUF0dHJpYnV0ZU5TKG5hbWUuc3BhY2UsIG5hbWUubG9jYWwpOyBlbHNlIHRoaXMuc2V0QXR0cmlidXRlTlMobmFtZS5zcGFjZSwgbmFtZS5sb2NhbCwgeCk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZSA9PSBudWxsID8gbmFtZS5sb2NhbCA/IGF0dHJOdWxsTlMgOiBhdHRyTnVsbCA6IHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gbmFtZS5sb2NhbCA/IGF0dHJGdW5jdGlvbk5TIDogYXR0ckZ1bmN0aW9uIDogbmFtZS5sb2NhbCA/IGF0dHJDb25zdGFudE5TIDogYXR0ckNvbnN0YW50O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2NvbGxhcHNlKHMpIHtcbiAgICByZXR1cm4gcy50cmltKCkucmVwbGFjZSgvXFxzKy9nLCBcIiBcIik7XG4gIH1cbiAgZDNfc2VsZWN0aW9uUHJvdG90eXBlLmNsYXNzZWQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlKCksIG4gPSAobmFtZSA9IG5hbWUudHJpbSgpLnNwbGl0KC9efFxccysvZykpLmxlbmd0aCwgaSA9IC0xO1xuICAgICAgICBpZiAodmFsdWUgPSBub2RlLmNsYXNzTGlzdCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoIXZhbHVlLmNvbnRhaW5zKG5hbWVbaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsdWUgPSBub2RlLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoIWQzX3NlbGVjdGlvbl9jbGFzc2VkUmUobmFtZVtpXSkudGVzdCh2YWx1ZSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFsdWUgaW4gbmFtZSkgdGhpcy5lYWNoKGQzX3NlbGVjdGlvbl9jbGFzc2VkKHZhbHVlLCBuYW1lW3ZhbHVlXSkpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVhY2goZDNfc2VsZWN0aW9uX2NsYXNzZWQobmFtZSwgdmFsdWUpKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfc2VsZWN0aW9uX2NsYXNzZWRSZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoXCIoPzpefFxcXFxzKylcIiArIGQzLnJlcXVvdGUobmFtZSkgKyBcIig/OlxcXFxzK3wkKVwiLCBcImdcIik7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc2VsZWN0aW9uX2NsYXNzZWQobmFtZSwgdmFsdWUpIHtcbiAgICBuYW1lID0gbmFtZS50cmltKCkuc3BsaXQoL1xccysvKS5tYXAoZDNfc2VsZWN0aW9uX2NsYXNzZWROYW1lKTtcbiAgICB2YXIgbiA9IG5hbWUubGVuZ3RoO1xuICAgIGZ1bmN0aW9uIGNsYXNzZWRDb25zdGFudCgpIHtcbiAgICAgIHZhciBpID0gLTE7XG4gICAgICB3aGlsZSAoKytpIDwgbikgbmFtZVtpXSh0aGlzLCB2YWx1ZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNsYXNzZWRGdW5jdGlvbigpIHtcbiAgICAgIHZhciBpID0gLTEsIHggPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIG5hbWVbaV0odGhpcywgeCk7XG4gICAgfVxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiA/IGNsYXNzZWRGdW5jdGlvbiA6IGNsYXNzZWRDb25zdGFudDtcbiAgfVxuICBmdW5jdGlvbiBkM19zZWxlY3Rpb25fY2xhc3NlZE5hbWUobmFtZSkge1xuICAgIHZhciByZSA9IGQzX3NlbGVjdGlvbl9jbGFzc2VkUmUobmFtZSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG5vZGUsIHZhbHVlKSB7XG4gICAgICBpZiAoYyA9IG5vZGUuY2xhc3NMaXN0KSByZXR1cm4gdmFsdWUgPyBjLmFkZChuYW1lKSA6IGMucmVtb3ZlKG5hbWUpO1xuICAgICAgdmFyIGMgPSBub2RlLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpIHx8IFwiXCI7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgcmUubGFzdEluZGV4ID0gMDtcbiAgICAgICAgaWYgKCFyZS50ZXN0KGMpKSBub2RlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGQzX2NvbGxhcHNlKGMgKyBcIiBcIiArIG5hbWUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgZDNfY29sbGFwc2UoYy5yZXBsYWNlKHJlLCBcIiBcIikpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGQzX3NlbGVjdGlvblByb3RvdHlwZS5zdHlsZSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICAgIHZhciBuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBpZiAobiA8IDMpIHtcbiAgICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAobiA8IDIpIHZhbHVlID0gXCJcIjtcbiAgICAgICAgZm9yIChwcmlvcml0eSBpbiBuYW1lKSB0aGlzLmVhY2goZDNfc2VsZWN0aW9uX3N0eWxlKHByaW9yaXR5LCBuYW1lW3ByaW9yaXR5XSwgdmFsdWUpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICBpZiAobiA8IDIpIHJldHVybiBkM193aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLm5vZGUoKSwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShuYW1lKTtcbiAgICAgIHByaW9yaXR5ID0gXCJcIjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWFjaChkM19zZWxlY3Rpb25fc3R5bGUobmFtZSwgdmFsdWUsIHByaW9yaXR5KSk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3NlbGVjdGlvbl9zdHlsZShuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpIHtcbiAgICBmdW5jdGlvbiBzdHlsZU51bGwoKSB7XG4gICAgICB0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzdHlsZUNvbnN0YW50KCkge1xuICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzdHlsZUZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHggPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgaWYgKHggPT0gbnVsbCkgdGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShuYW1lKTsgZWxzZSB0aGlzLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIHgsIHByaW9yaXR5KTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyBzdHlsZU51bGwgOiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiA/IHN0eWxlRnVuY3Rpb24gOiBzdHlsZUNvbnN0YW50O1xuICB9XG4gIGQzX3NlbGVjdGlvblByb3RvdHlwZS5wcm9wZXJ0eSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3RyaW5nXCIpIHJldHVybiB0aGlzLm5vZGUoKVtuYW1lXTtcbiAgICAgIGZvciAodmFsdWUgaW4gbmFtZSkgdGhpcy5lYWNoKGQzX3NlbGVjdGlvbl9wcm9wZXJ0eSh2YWx1ZSwgbmFtZVt2YWx1ZV0pKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lYWNoKGQzX3NlbGVjdGlvbl9wcm9wZXJ0eShuYW1lLCB2YWx1ZSkpO1xuICB9O1xuICBmdW5jdGlvbiBkM19zZWxlY3Rpb25fcHJvcGVydHkobmFtZSwgdmFsdWUpIHtcbiAgICBmdW5jdGlvbiBwcm9wZXJ0eU51bGwoKSB7XG4gICAgICBkZWxldGUgdGhpc1tuYW1lXTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcHJvcGVydHlDb25zdGFudCgpIHtcbiAgICAgIHRoaXNbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcHJvcGVydHlGdW5jdGlvbigpIHtcbiAgICAgIHZhciB4ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIGlmICh4ID09IG51bGwpIGRlbGV0ZSB0aGlzW25hbWVdOyBlbHNlIHRoaXNbbmFtZV0gPSB4O1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/IHByb3BlcnR5TnVsbCA6IHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gcHJvcGVydHlGdW5jdGlvbiA6IHByb3BlcnR5Q29uc3RhbnQ7XG4gIH1cbiAgZDNfc2VsZWN0aW9uUHJvdG90eXBlLnRleHQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gdGhpcy5lYWNoKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB0aGlzLnRleHRDb250ZW50ID0gdiA9PSBudWxsID8gXCJcIiA6IHY7XG4gICAgfSA6IHZhbHVlID09IG51bGwgPyBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIH0gOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgICB9KSA6IHRoaXMubm9kZSgpLnRleHRDb250ZW50O1xuICB9O1xuICBkM19zZWxlY3Rpb25Qcm90b3R5cGUuaHRtbCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyB0aGlzLmVhY2godHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgPyBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHRoaXMuaW5uZXJIVE1MID0gdiA9PSBudWxsID8gXCJcIiA6IHY7XG4gICAgfSA6IHZhbHVlID09IG51bGwgPyBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB9IDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmlubmVySFRNTCA9IHZhbHVlO1xuICAgIH0pIDogdGhpcy5ub2RlKCkuaW5uZXJIVE1MO1xuICB9O1xuICBkM19zZWxlY3Rpb25Qcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24obmFtZSkge1xuICAgIG5hbWUgPSBkM19zZWxlY3Rpb25fY3JlYXRvcihuYW1lKTtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3QoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5hcHBlbmRDaGlsZChuYW1lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIH0pO1xuICB9O1xuICBmdW5jdGlvbiBkM19zZWxlY3Rpb25fY3JlYXRvcihuYW1lKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBuYW1lID09PSBcImZ1bmN0aW9uXCIgPyBuYW1lIDogKG5hbWUgPSBkMy5ucy5xdWFsaWZ5KG5hbWUpKS5sb2NhbCA/IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGQzX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lLnNwYWNlLCBuYW1lLmxvY2FsKTtcbiAgICB9IDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZDNfZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHRoaXMubmFtZXNwYWNlVVJJLCBuYW1lKTtcbiAgICB9O1xuICB9XG4gIGQzX3NlbGVjdGlvblByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbihuYW1lLCBiZWZvcmUpIHtcbiAgICBuYW1lID0gZDNfc2VsZWN0aW9uX2NyZWF0b3IobmFtZSk7XG4gICAgYmVmb3JlID0gZDNfc2VsZWN0aW9uX3NlbGVjdG9yKGJlZm9yZSk7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5zZXJ0QmVmb3JlKG5hbWUuYXBwbHkodGhpcywgYXJndW1lbnRzKSwgYmVmb3JlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIH0pO1xuICB9O1xuICBkM19zZWxlY3Rpb25Qcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG4gICAgICBpZiAocGFyZW50KSBwYXJlbnQucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgfSk7XG4gIH07XG4gIGQzX3NlbGVjdGlvblByb3RvdHlwZS5kYXRhID0gZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgIHZhciBpID0gLTEsIG4gPSB0aGlzLmxlbmd0aCwgZ3JvdXAsIG5vZGU7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICB2YWx1ZSA9IG5ldyBBcnJheShuID0gKGdyb3VwID0gdGhpc1swXSkubGVuZ3RoKTtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgICB2YWx1ZVtpXSA9IG5vZGUuX19kYXRhX187XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYmluZChncm91cCwgZ3JvdXBEYXRhKSB7XG4gICAgICB2YXIgaSwgbiA9IGdyb3VwLmxlbmd0aCwgbSA9IGdyb3VwRGF0YS5sZW5ndGgsIG4wID0gTWF0aC5taW4obiwgbSksIHVwZGF0ZU5vZGVzID0gbmV3IEFycmF5KG0pLCBlbnRlck5vZGVzID0gbmV3IEFycmF5KG0pLCBleGl0Tm9kZXMgPSBuZXcgQXJyYXkobiksIG5vZGUsIG5vZGVEYXRhO1xuICAgICAgaWYgKGtleSkge1xuICAgICAgICB2YXIgbm9kZUJ5S2V5VmFsdWUgPSBuZXcgZDNfTWFwKCksIGRhdGFCeUtleVZhbHVlID0gbmV3IGQzX01hcCgpLCBrZXlWYWx1ZXMgPSBbXSwga2V5VmFsdWU7XG4gICAgICAgIGZvciAoaSA9IC0xOyArK2kgPCBuOyApIHtcbiAgICAgICAgICBrZXlWYWx1ZSA9IGtleS5jYWxsKG5vZGUgPSBncm91cFtpXSwgbm9kZS5fX2RhdGFfXywgaSk7XG4gICAgICAgICAgaWYgKG5vZGVCeUtleVZhbHVlLmhhcyhrZXlWYWx1ZSkpIHtcbiAgICAgICAgICAgIGV4aXROb2Rlc1tpXSA9IG5vZGU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGVCeUtleVZhbHVlLnNldChrZXlWYWx1ZSwgbm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGtleVZhbHVlcy5wdXNoKGtleVZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAtMTsgKytpIDwgbTsgKSB7XG4gICAgICAgICAga2V5VmFsdWUgPSBrZXkuY2FsbChncm91cERhdGEsIG5vZGVEYXRhID0gZ3JvdXBEYXRhW2ldLCBpKTtcbiAgICAgICAgICBpZiAobm9kZSA9IG5vZGVCeUtleVZhbHVlLmdldChrZXlWYWx1ZSkpIHtcbiAgICAgICAgICAgIHVwZGF0ZU5vZGVzW2ldID0gbm9kZTtcbiAgICAgICAgICAgIG5vZGUuX19kYXRhX18gPSBub2RlRGF0YTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCFkYXRhQnlLZXlWYWx1ZS5oYXMoa2V5VmFsdWUpKSB7XG4gICAgICAgICAgICBlbnRlck5vZGVzW2ldID0gZDNfc2VsZWN0aW9uX2RhdGFOb2RlKG5vZGVEYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YUJ5S2V5VmFsdWUuc2V0KGtleVZhbHVlLCBub2RlRGF0YSk7XG4gICAgICAgICAgbm9kZUJ5S2V5VmFsdWUucmVtb3ZlKGtleVZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAtMTsgKytpIDwgbjsgKSB7XG4gICAgICAgICAgaWYgKG5vZGVCeUtleVZhbHVlLmhhcyhrZXlWYWx1ZXNbaV0pKSB7XG4gICAgICAgICAgICBleGl0Tm9kZXNbaV0gPSBncm91cFtpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoaSA9IC0xOyArK2kgPCBuMDsgKSB7XG4gICAgICAgICAgbm9kZSA9IGdyb3VwW2ldO1xuICAgICAgICAgIG5vZGVEYXRhID0gZ3JvdXBEYXRhW2ldO1xuICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICBub2RlLl9fZGF0YV9fID0gbm9kZURhdGE7XG4gICAgICAgICAgICB1cGRhdGVOb2Rlc1tpXSA9IG5vZGU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVudGVyTm9kZXNbaV0gPSBkM19zZWxlY3Rpb25fZGF0YU5vZGUobm9kZURhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKDtpIDwgbTsgKytpKSB7XG4gICAgICAgICAgZW50ZXJOb2Rlc1tpXSA9IGQzX3NlbGVjdGlvbl9kYXRhTm9kZShncm91cERhdGFbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoO2kgPCBuOyArK2kpIHtcbiAgICAgICAgICBleGl0Tm9kZXNbaV0gPSBncm91cFtpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZW50ZXJOb2Rlcy51cGRhdGUgPSB1cGRhdGVOb2RlcztcbiAgICAgIGVudGVyTm9kZXMucGFyZW50Tm9kZSA9IHVwZGF0ZU5vZGVzLnBhcmVudE5vZGUgPSBleGl0Tm9kZXMucGFyZW50Tm9kZSA9IGdyb3VwLnBhcmVudE5vZGU7XG4gICAgICBlbnRlci5wdXNoKGVudGVyTm9kZXMpO1xuICAgICAgdXBkYXRlLnB1c2godXBkYXRlTm9kZXMpO1xuICAgICAgZXhpdC5wdXNoKGV4aXROb2Rlcyk7XG4gICAgfVxuICAgIHZhciBlbnRlciA9IGQzX3NlbGVjdGlvbl9lbnRlcihbXSksIHVwZGF0ZSA9IGQzX3NlbGVjdGlvbihbXSksIGV4aXQgPSBkM19zZWxlY3Rpb24oW10pO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgYmluZChncm91cCA9IHRoaXNbaV0sIHZhbHVlLmNhbGwoZ3JvdXAsIGdyb3VwLnBhcmVudE5vZGUuX19kYXRhX18sIGkpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgYmluZChncm91cCA9IHRoaXNbaV0sIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlLmVudGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZW50ZXI7XG4gICAgfTtcbiAgICB1cGRhdGUuZXhpdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGV4aXQ7XG4gICAgfTtcbiAgICByZXR1cm4gdXBkYXRlO1xuICB9O1xuICBmdW5jdGlvbiBkM19zZWxlY3Rpb25fZGF0YU5vZGUoZGF0YSkge1xuICAgIHJldHVybiB7XG4gICAgICBfX2RhdGFfXzogZGF0YVxuICAgIH07XG4gIH1cbiAgZDNfc2VsZWN0aW9uUHJvdG90eXBlLmRhdHVtID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IHRoaXMucHJvcGVydHkoXCJfX2RhdGFfX1wiLCB2YWx1ZSkgOiB0aGlzLnByb3BlcnR5KFwiX19kYXRhX19cIik7XG4gIH07XG4gIGQzX3NlbGVjdGlvblByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbihmaWx0ZXIpIHtcbiAgICB2YXIgc3ViZ3JvdXBzID0gW10sIHN1Ymdyb3VwLCBncm91cCwgbm9kZTtcbiAgICBpZiAodHlwZW9mIGZpbHRlciAhPT0gXCJmdW5jdGlvblwiKSBmaWx0ZXIgPSBkM19zZWxlY3Rpb25fZmlsdGVyKGZpbHRlcik7XG4gICAgZm9yICh2YXIgaiA9IDAsIG0gPSB0aGlzLmxlbmd0aDsgaiA8IG07IGorKykge1xuICAgICAgc3ViZ3JvdXBzLnB1c2goc3ViZ3JvdXAgPSBbXSk7XG4gICAgICBzdWJncm91cC5wYXJlbnROb2RlID0gKGdyb3VwID0gdGhpc1tqXSkucGFyZW50Tm9kZTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gZ3JvdXAubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiBmaWx0ZXIuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpKSkge1xuICAgICAgICAgIHN1Ymdyb3VwLnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGQzX3NlbGVjdGlvbihzdWJncm91cHMpO1xuICB9O1xuICBmdW5jdGlvbiBkM19zZWxlY3Rpb25fZmlsdGVyKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGQzX3NlbGVjdE1hdGNoZXModGhpcywgc2VsZWN0b3IpO1xuICAgIH07XG4gIH1cbiAgZDNfc2VsZWN0aW9uUHJvdG90eXBlLm9yZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgaiA9IC0xLCBtID0gdGhpcy5sZW5ndGg7ICsraiA8IG07ICkge1xuICAgICAgZm9yICh2YXIgZ3JvdXAgPSB0aGlzW2pdLCBpID0gZ3JvdXAubGVuZ3RoIC0gMSwgbmV4dCA9IGdyb3VwW2ldLCBub2RlOyAtLWkgPj0gMDsgKSB7XG4gICAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgICBpZiAobmV4dCAmJiBuZXh0ICE9PSBub2RlLm5leHRTaWJsaW5nKSBuZXh0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIG5leHQpO1xuICAgICAgICAgIG5leHQgPSBub2RlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBkM19zZWxlY3Rpb25Qcm90b3R5cGUuc29ydCA9IGZ1bmN0aW9uKGNvbXBhcmF0b3IpIHtcbiAgICBjb21wYXJhdG9yID0gZDNfc2VsZWN0aW9uX3NvcnRDb21wYXJhdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgZm9yICh2YXIgaiA9IC0xLCBtID0gdGhpcy5sZW5ndGg7ICsraiA8IG07ICkgdGhpc1tqXS5zb3J0KGNvbXBhcmF0b3IpO1xuICAgIHJldHVybiB0aGlzLm9yZGVyKCk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3NlbGVjdGlvbl9zb3J0Q29tcGFyYXRvcihjb21wYXJhdG9yKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSBjb21wYXJhdG9yID0gZDMuYXNjZW5kaW5nO1xuICAgIHJldHVybiBmdW5jdGlvbihhLCBiKSB7XG4gICAgICByZXR1cm4gIWEgLSAhYiB8fCBjb21wYXJhdG9yKGEuX19kYXRhX18sIGIuX19kYXRhX18pO1xuICAgIH07XG4gIH1cbiAgZDNfc2VsZWN0aW9uUHJvdG90eXBlLmVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIHJldHVybiBkM19zZWxlY3Rpb25fZWFjaCh0aGlzLCBmdW5jdGlvbihub2RlLCBpLCBqKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGopO1xuICAgIH0pO1xuICB9O1xuICBmdW5jdGlvbiBkM19zZWxlY3Rpb25fZWFjaChncm91cHMsIGNhbGxiYWNrKSB7XG4gICAgZm9yICh2YXIgaiA9IDAsIG0gPSBncm91cHMubGVuZ3RoOyBqIDwgbTsgaisrKSB7XG4gICAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgaSA9IDAsIG4gPSBncm91cC5sZW5ndGgsIG5vZGU7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkgY2FsbGJhY2sobm9kZSwgaSwgaik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBncm91cHM7XG4gIH1cbiAgZDNfc2VsZWN0aW9uUHJvdG90eXBlLmNhbGwgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIHZhciBhcmdzID0gZDNfYXJyYXkoYXJndW1lbnRzKTtcbiAgICBjYWxsYmFjay5hcHBseShhcmdzWzBdID0gdGhpcywgYXJncyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGQzX3NlbGVjdGlvblByb3RvdHlwZS5lbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAhdGhpcy5ub2RlKCk7XG4gIH07XG4gIGQzX3NlbGVjdGlvblByb3RvdHlwZS5ub2RlID0gZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgaiA9IDAsIG0gPSB0aGlzLmxlbmd0aDsgaiA8IG07IGorKykge1xuICAgICAgZm9yICh2YXIgZ3JvdXAgPSB0aGlzW2pdLCBpID0gMCwgbiA9IGdyb3VwLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICB2YXIgbm9kZSA9IGdyb3VwW2ldO1xuICAgICAgICBpZiAobm9kZSkgcmV0dXJuIG5vZGU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9O1xuICBkM19zZWxlY3Rpb25Qcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBuID0gMDtcbiAgICB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICArK247XG4gICAgfSk7XG4gICAgcmV0dXJuIG47XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3NlbGVjdGlvbl9lbnRlcihzZWxlY3Rpb24pIHtcbiAgICBkM19zdWJjbGFzcyhzZWxlY3Rpb24sIGQzX3NlbGVjdGlvbl9lbnRlclByb3RvdHlwZSk7XG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcbiAgfVxuICB2YXIgZDNfc2VsZWN0aW9uX2VudGVyUHJvdG90eXBlID0gW107XG4gIGQzLnNlbGVjdGlvbi5lbnRlciA9IGQzX3NlbGVjdGlvbl9lbnRlcjtcbiAgZDMuc2VsZWN0aW9uLmVudGVyLnByb3RvdHlwZSA9IGQzX3NlbGVjdGlvbl9lbnRlclByb3RvdHlwZTtcbiAgZDNfc2VsZWN0aW9uX2VudGVyUHJvdG90eXBlLmFwcGVuZCA9IGQzX3NlbGVjdGlvblByb3RvdHlwZS5hcHBlbmQ7XG4gIGQzX3NlbGVjdGlvbl9lbnRlclByb3RvdHlwZS5lbXB0eSA9IGQzX3NlbGVjdGlvblByb3RvdHlwZS5lbXB0eTtcbiAgZDNfc2VsZWN0aW9uX2VudGVyUHJvdG90eXBlLm5vZGUgPSBkM19zZWxlY3Rpb25Qcm90b3R5cGUubm9kZTtcbiAgZDNfc2VsZWN0aW9uX2VudGVyUHJvdG90eXBlLmNhbGwgPSBkM19zZWxlY3Rpb25Qcm90b3R5cGUuY2FsbDtcbiAgZDNfc2VsZWN0aW9uX2VudGVyUHJvdG90eXBlLnNpemUgPSBkM19zZWxlY3Rpb25Qcm90b3R5cGUuc2l6ZTtcbiAgZDNfc2VsZWN0aW9uX2VudGVyUHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gICAgdmFyIHN1Ymdyb3VwcyA9IFtdLCBzdWJncm91cCwgc3Vibm9kZSwgdXBncm91cCwgZ3JvdXAsIG5vZGU7XG4gICAgZm9yICh2YXIgaiA9IC0xLCBtID0gdGhpcy5sZW5ndGg7ICsraiA8IG07ICkge1xuICAgICAgdXBncm91cCA9IChncm91cCA9IHRoaXNbal0pLnVwZGF0ZTtcbiAgICAgIHN1Ymdyb3Vwcy5wdXNoKHN1Ymdyb3VwID0gW10pO1xuICAgICAgc3ViZ3JvdXAucGFyZW50Tm9kZSA9IGdyb3VwLnBhcmVudE5vZGU7XG4gICAgICBmb3IgKHZhciBpID0gLTEsIG4gPSBncm91cC5sZW5ndGg7ICsraSA8IG47ICkge1xuICAgICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgICAgc3ViZ3JvdXAucHVzaCh1cGdyb3VwW2ldID0gc3Vibm9kZSA9IHNlbGVjdG9yLmNhbGwoZ3JvdXAucGFyZW50Tm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgaikpO1xuICAgICAgICAgIHN1Ym5vZGUuX19kYXRhX18gPSBub2RlLl9fZGF0YV9fO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1Ymdyb3VwLnB1c2gobnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGQzX3NlbGVjdGlvbihzdWJncm91cHMpO1xuICB9O1xuICBkM19zZWxlY3Rpb25fZW50ZXJQcm90b3R5cGUuaW5zZXJ0ID0gZnVuY3Rpb24obmFtZSwgYmVmb3JlKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSBiZWZvcmUgPSBkM19zZWxlY3Rpb25fZW50ZXJJbnNlcnRCZWZvcmUodGhpcyk7XG4gICAgcmV0dXJuIGQzX3NlbGVjdGlvblByb3RvdHlwZS5pbnNlcnQuY2FsbCh0aGlzLCBuYW1lLCBiZWZvcmUpO1xuICB9O1xuICBmdW5jdGlvbiBkM19zZWxlY3Rpb25fZW50ZXJJbnNlcnRCZWZvcmUoZW50ZXIpIHtcbiAgICB2YXIgaTAsIGowO1xuICAgIHJldHVybiBmdW5jdGlvbihkLCBpLCBqKSB7XG4gICAgICB2YXIgZ3JvdXAgPSBlbnRlcltqXS51cGRhdGUsIG4gPSBncm91cC5sZW5ndGgsIG5vZGU7XG4gICAgICBpZiAoaiAhPSBqMCkgajAgPSBqLCBpMCA9IDA7XG4gICAgICBpZiAoaSA+PSBpMCkgaTAgPSBpICsgMTtcbiAgICAgIHdoaWxlICghKG5vZGUgPSBncm91cFtpMF0pICYmICsraTAgPCBuKSA7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9O1xuICB9XG4gIGQzX3NlbGVjdGlvblByb3RvdHlwZS50cmFuc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGlkID0gZDNfdHJhbnNpdGlvbkluaGVyaXRJZCB8fCArK2QzX3RyYW5zaXRpb25JZCwgc3ViZ3JvdXBzID0gW10sIHN1Ymdyb3VwLCBub2RlLCB0cmFuc2l0aW9uID0gZDNfdHJhbnNpdGlvbkluaGVyaXQgfHwge1xuICAgICAgdGltZTogRGF0ZS5ub3coKSxcbiAgICAgIGVhc2U6IGQzX2Vhc2VfY3ViaWNJbk91dCxcbiAgICAgIGRlbGF5OiAwLFxuICAgICAgZHVyYXRpb246IDI1MFxuICAgIH07XG4gICAgZm9yICh2YXIgaiA9IC0xLCBtID0gdGhpcy5sZW5ndGg7ICsraiA8IG07ICkge1xuICAgICAgc3ViZ3JvdXBzLnB1c2goc3ViZ3JvdXAgPSBbXSk7XG4gICAgICBmb3IgKHZhciBncm91cCA9IHRoaXNbal0sIGkgPSAtMSwgbiA9IGdyb3VwLmxlbmd0aDsgKytpIDwgbjsgKSB7XG4gICAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIGQzX3RyYW5zaXRpb25Ob2RlKG5vZGUsIGksIGlkLCB0cmFuc2l0aW9uKTtcbiAgICAgICAgc3ViZ3JvdXAucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGQzX3RyYW5zaXRpb24oc3ViZ3JvdXBzLCBpZCk7XG4gIH07XG4gIGQzLnNlbGVjdCA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICB2YXIgZ3JvdXAgPSBbIHR5cGVvZiBub2RlID09PSBcInN0cmluZ1wiID8gZDNfc2VsZWN0KG5vZGUsIGQzX2RvY3VtZW50KSA6IG5vZGUgXTtcbiAgICBncm91cC5wYXJlbnROb2RlID0gZDNfZG9jdW1lbnRFbGVtZW50O1xuICAgIHJldHVybiBkM19zZWxlY3Rpb24oWyBncm91cCBdKTtcbiAgfTtcbiAgZDMuc2VsZWN0QWxsID0gZnVuY3Rpb24obm9kZXMpIHtcbiAgICB2YXIgZ3JvdXAgPSBkM19hcnJheSh0eXBlb2Ygbm9kZXMgPT09IFwic3RyaW5nXCIgPyBkM19zZWxlY3RBbGwobm9kZXMsIGQzX2RvY3VtZW50KSA6IG5vZGVzKTtcbiAgICBncm91cC5wYXJlbnROb2RlID0gZDNfZG9jdW1lbnRFbGVtZW50O1xuICAgIHJldHVybiBkM19zZWxlY3Rpb24oWyBncm91cCBdKTtcbiAgfTtcbiAgdmFyIGQzX3NlbGVjdGlvblJvb3QgPSBkMy5zZWxlY3QoZDNfZG9jdW1lbnRFbGVtZW50KTtcbiAgZDNfc2VsZWN0aW9uUHJvdG90eXBlLm9uID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIGNhcHR1cmUpIHtcbiAgICB2YXIgbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKG4gPCAzKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKG4gPCAyKSBsaXN0ZW5lciA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNhcHR1cmUgaW4gdHlwZSkgdGhpcy5lYWNoKGQzX3NlbGVjdGlvbl9vbihjYXB0dXJlLCB0eXBlW2NhcHR1cmVdLCBsaXN0ZW5lcikpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIGlmIChuIDwgMikgcmV0dXJuIChuID0gdGhpcy5ub2RlKClbXCJfX29uXCIgKyB0eXBlXSkgJiYgbi5fO1xuICAgICAgY2FwdHVyZSA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lYWNoKGQzX3NlbGVjdGlvbl9vbih0eXBlLCBsaXN0ZW5lciwgY2FwdHVyZSkpO1xuICB9O1xuICBmdW5jdGlvbiBkM19zZWxlY3Rpb25fb24odHlwZSwgbGlzdGVuZXIsIGNhcHR1cmUpIHtcbiAgICB2YXIgbmFtZSA9IFwiX19vblwiICsgdHlwZSwgaSA9IHR5cGUuaW5kZXhPZihcIi5cIiksIHdyYXAgPSBkM19zZWxlY3Rpb25fb25MaXN0ZW5lcjtcbiAgICBpZiAoaSA+IDApIHR5cGUgPSB0eXBlLnN1YnN0cmluZygwLCBpKTtcbiAgICB2YXIgZmlsdGVyID0gZDNfc2VsZWN0aW9uX29uRmlsdGVycy5nZXQodHlwZSk7XG4gICAgaWYgKGZpbHRlcikgdHlwZSA9IGZpbHRlciwgd3JhcCA9IGQzX3NlbGVjdGlvbl9vbkZpbHRlcjtcbiAgICBmdW5jdGlvbiBvblJlbW92ZSgpIHtcbiAgICAgIHZhciBsID0gdGhpc1tuYW1lXTtcbiAgICAgIGlmIChsKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsLCBsLiQpO1xuICAgICAgICBkZWxldGUgdGhpc1tuYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25BZGQoKSB7XG4gICAgICB2YXIgbCA9IHdyYXAobGlzdGVuZXIsIGQzX2FycmF5KGFyZ3VtZW50cykpO1xuICAgICAgb25SZW1vdmUuY2FsbCh0aGlzKTtcbiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCB0aGlzW25hbWVdID0gbCwgbC4kID0gY2FwdHVyZSk7XG4gICAgICBsLl8gPSBsaXN0ZW5lcjtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsKCkge1xuICAgICAgdmFyIHJlID0gbmV3IFJlZ0V4cChcIl5fX29uKFteLl0rKVwiICsgZDMucmVxdW90ZSh0eXBlKSArIFwiJFwiKSwgbWF0Y2g7XG4gICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgaWYgKG1hdGNoID0gbmFtZS5tYXRjaChyZSkpIHtcbiAgICAgICAgICB2YXIgbCA9IHRoaXNbbmFtZV07XG4gICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKG1hdGNoWzFdLCBsLCBsLiQpO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpID8gbGlzdGVuZXIgPyBvbkFkZCA6IG9uUmVtb3ZlIDogbGlzdGVuZXIgPyBkM19ub29wIDogcmVtb3ZlQWxsO1xuICB9XG4gIHZhciBkM19zZWxlY3Rpb25fb25GaWx0ZXJzID0gZDMubWFwKHtcbiAgICBtb3VzZWVudGVyOiBcIm1vdXNlb3ZlclwiLFxuICAgIG1vdXNlbGVhdmU6IFwibW91c2VvdXRcIlxuICB9KTtcbiAgZDNfc2VsZWN0aW9uX29uRmlsdGVycy5mb3JFYWNoKGZ1bmN0aW9uKGspIHtcbiAgICBpZiAoXCJvblwiICsgayBpbiBkM19kb2N1bWVudCkgZDNfc2VsZWN0aW9uX29uRmlsdGVycy5yZW1vdmUoayk7XG4gIH0pO1xuICBmdW5jdGlvbiBkM19zZWxlY3Rpb25fb25MaXN0ZW5lcihsaXN0ZW5lciwgYXJndW1lbnR6KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBvID0gZDMuZXZlbnQ7XG4gICAgICBkMy5ldmVudCA9IGU7XG4gICAgICBhcmd1bWVudHpbMF0gPSB0aGlzLl9fZGF0YV9fO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnR6KTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGQzLmV2ZW50ID0gbztcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGQzX3NlbGVjdGlvbl9vbkZpbHRlcihsaXN0ZW5lciwgYXJndW1lbnR6KSB7XG4gICAgdmFyIGwgPSBkM19zZWxlY3Rpb25fb25MaXN0ZW5lcihsaXN0ZW5lciwgYXJndW1lbnR6KTtcbiAgICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgICAgdmFyIHRhcmdldCA9IHRoaXMsIHJlbGF0ZWQgPSBlLnJlbGF0ZWRUYXJnZXQ7XG4gICAgICBpZiAoIXJlbGF0ZWQgfHwgcmVsYXRlZCAhPT0gdGFyZ2V0ICYmICEocmVsYXRlZC5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbih0YXJnZXQpICYgOCkpIHtcbiAgICAgICAgbC5jYWxsKHRhcmdldCwgZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICB2YXIgZDNfZXZlbnRfZHJhZ1NlbGVjdCA9IGQzX3ZlbmRvclN5bWJvbChkM19kb2N1bWVudEVsZW1lbnQuc3R5bGUsIFwidXNlclNlbGVjdFwiKSwgZDNfZXZlbnRfZHJhZ0lkID0gMDtcbiAgZnVuY3Rpb24gZDNfZXZlbnRfZHJhZ1N1cHByZXNzKCkge1xuICAgIHZhciBuYW1lID0gXCIuZHJhZ3N1cHByZXNzLVwiICsgKytkM19ldmVudF9kcmFnSWQsIHRvdWNobW92ZSA9IFwidG91Y2htb3ZlXCIgKyBuYW1lLCBzZWxlY3RzdGFydCA9IFwic2VsZWN0c3RhcnRcIiArIG5hbWUsIGRyYWdzdGFydCA9IFwiZHJhZ3N0YXJ0XCIgKyBuYW1lLCBjbGljayA9IFwiY2xpY2tcIiArIG5hbWUsIHcgPSBkMy5zZWxlY3QoZDNfd2luZG93KS5vbih0b3VjaG1vdmUsIGQzX2V2ZW50UHJldmVudERlZmF1bHQpLm9uKHNlbGVjdHN0YXJ0LCBkM19ldmVudFByZXZlbnREZWZhdWx0KS5vbihkcmFnc3RhcnQsIGQzX2V2ZW50UHJldmVudERlZmF1bHQpLCBzdHlsZSA9IGQzX2RvY3VtZW50RWxlbWVudC5zdHlsZSwgc2VsZWN0ID0gc3R5bGVbZDNfZXZlbnRfZHJhZ1NlbGVjdF07XG4gICAgc3R5bGVbZDNfZXZlbnRfZHJhZ1NlbGVjdF0gPSBcIm5vbmVcIjtcbiAgICByZXR1cm4gZnVuY3Rpb24oc3VwcHJlc3NDbGljaykge1xuICAgICAgdy5vbihuYW1lLCBudWxsKTtcbiAgICAgIHN0eWxlW2QzX2V2ZW50X2RyYWdTZWxlY3RdID0gc2VsZWN0O1xuICAgICAgaWYgKHN1cHByZXNzQ2xpY2spIHtcbiAgICAgICAgZnVuY3Rpb24gb2ZmKCkge1xuICAgICAgICAgIHcub24oY2xpY2ssIG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHcub24oY2xpY2ssIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGQzX2V2ZW50UHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBvZmYoKTtcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIHNldFRpbWVvdXQob2ZmLCAwKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGQzLm1vdXNlID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIGQzX21vdXNlUG9pbnQoY29udGFpbmVyLCBkM19ldmVudFNvdXJjZSgpKTtcbiAgfTtcbiAgdmFyIGQzX21vdXNlX2J1ZzQ0MDgzID0gL1dlYktpdC8udGVzdChkM193aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkgPyAtMSA6IDA7XG4gIGZ1bmN0aW9uIGQzX21vdXNlUG9pbnQoY29udGFpbmVyLCBlKSB7XG4gICAgdmFyIHN2ZyA9IGNvbnRhaW5lci5vd25lclNWR0VsZW1lbnQgfHwgY29udGFpbmVyO1xuICAgIGlmIChzdmcuY3JlYXRlU1ZHUG9pbnQpIHtcbiAgICAgIHZhciBwb2ludCA9IHN2Zy5jcmVhdGVTVkdQb2ludCgpO1xuICAgICAgaWYgKGQzX21vdXNlX2J1ZzQ0MDgzIDwgMCAmJiAoZDNfd2luZG93LnNjcm9sbFggfHwgZDNfd2luZG93LnNjcm9sbFkpKSB7XG4gICAgICAgIHN2ZyA9IGQzLnNlbGVjdChcImJvZHlcIikuYXBwZW5kKFwic3ZnXCIpLnN0eWxlKHtcbiAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgIG1hcmdpbjogMCxcbiAgICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICAgIGJvcmRlcjogXCJub25lXCJcbiAgICAgICAgfSwgXCJpbXBvcnRhbnRcIik7XG4gICAgICAgIHZhciBjdG0gPSBzdmdbMF1bMF0uZ2V0U2NyZWVuQ1RNKCk7XG4gICAgICAgIGQzX21vdXNlX2J1ZzQ0MDgzID0gIShjdG0uZiB8fCBjdG0uZSk7XG4gICAgICAgIHN2Zy5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICAgIGlmIChkM19tb3VzZV9idWc0NDA4Mykge1xuICAgICAgICBwb2ludC54ID0gZS5wYWdlWDtcbiAgICAgICAgcG9pbnQueSA9IGUucGFnZVk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwb2ludC54ID0gZS5jbGllbnRYO1xuICAgICAgICBwb2ludC55ID0gZS5jbGllbnRZO1xuICAgICAgfVxuICAgICAgcG9pbnQgPSBwb2ludC5tYXRyaXhUcmFuc2Zvcm0oY29udGFpbmVyLmdldFNjcmVlbkNUTSgpLmludmVyc2UoKSk7XG4gICAgICByZXR1cm4gWyBwb2ludC54LCBwb2ludC55IF07XG4gICAgfVxuICAgIHZhciByZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiBbIGUuY2xpZW50WCAtIHJlY3QubGVmdCAtIGNvbnRhaW5lci5jbGllbnRMZWZ0LCBlLmNsaWVudFkgLSByZWN0LnRvcCAtIGNvbnRhaW5lci5jbGllbnRUb3AgXTtcbiAgfVxuICBkMy50b3VjaGVzID0gZnVuY3Rpb24oY29udGFpbmVyLCB0b3VjaGVzKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB0b3VjaGVzID0gZDNfZXZlbnRTb3VyY2UoKS50b3VjaGVzO1xuICAgIHJldHVybiB0b3VjaGVzID8gZDNfYXJyYXkodG91Y2hlcykubWFwKGZ1bmN0aW9uKHRvdWNoKSB7XG4gICAgICB2YXIgcG9pbnQgPSBkM19tb3VzZVBvaW50KGNvbnRhaW5lciwgdG91Y2gpO1xuICAgICAgcG9pbnQuaWRlbnRpZmllciA9IHRvdWNoLmlkZW50aWZpZXI7XG4gICAgICByZXR1cm4gcG9pbnQ7XG4gICAgfSkgOiBbXTtcbiAgfTtcbiAgZDMuYmVoYXZpb3IuZHJhZyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBldmVudCA9IGQzX2V2ZW50RGlzcGF0Y2goZHJhZywgXCJkcmFnXCIsIFwiZHJhZ3N0YXJ0XCIsIFwiZHJhZ2VuZFwiKSwgb3JpZ2luID0gbnVsbCwgbW91c2Vkb3duID0gZHJhZ3N0YXJ0KGQzX25vb3AsIGQzLm1vdXNlLCBcIm1vdXNlbW92ZVwiLCBcIm1vdXNldXBcIiksIHRvdWNoc3RhcnQgPSBkcmFnc3RhcnQodG91Y2hpZCwgdG91Y2hwb3NpdGlvbiwgXCJ0b3VjaG1vdmVcIiwgXCJ0b3VjaGVuZFwiKTtcbiAgICBmdW5jdGlvbiBkcmFnKCkge1xuICAgICAgdGhpcy5vbihcIm1vdXNlZG93bi5kcmFnXCIsIG1vdXNlZG93bikub24oXCJ0b3VjaHN0YXJ0LmRyYWdcIiwgdG91Y2hzdGFydCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRvdWNoaWQoKSB7XG4gICAgICByZXR1cm4gZDMuZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uaWRlbnRpZmllcjtcbiAgICB9XG4gICAgZnVuY3Rpb24gdG91Y2hwb3NpdGlvbihwYXJlbnQsIGlkKSB7XG4gICAgICByZXR1cm4gZDMudG91Y2hlcyhwYXJlbnQpLmZpbHRlcihmdW5jdGlvbihwKSB7XG4gICAgICAgIHJldHVybiBwLmlkZW50aWZpZXIgPT09IGlkO1xuICAgICAgfSlbMF07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRyYWdzdGFydChpZCwgcG9zaXRpb24sIG1vdmUsIGVuZCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcywgcGFyZW50ID0gdGFyZ2V0LnBhcmVudE5vZGUsIGV2ZW50XyA9IGV2ZW50Lm9mKHRhcmdldCwgYXJndW1lbnRzKSwgZXZlbnRUYXJnZXQgPSBkMy5ldmVudC50YXJnZXQsIGV2ZW50SWQgPSBpZCgpLCBkcmFnID0gZXZlbnRJZCA9PSBudWxsID8gXCJkcmFnXCIgOiBcImRyYWctXCIgKyBldmVudElkLCBvcmlnaW5fID0gcG9zaXRpb24ocGFyZW50LCBldmVudElkKSwgZHJhZ2dlZCA9IDAsIG9mZnNldCwgdyA9IGQzLnNlbGVjdChkM193aW5kb3cpLm9uKG1vdmUgKyBcIi5cIiArIGRyYWcsIG1vdmVkKS5vbihlbmQgKyBcIi5cIiArIGRyYWcsIGVuZGVkKSwgZHJhZ1Jlc3RvcmUgPSBkM19ldmVudF9kcmFnU3VwcHJlc3MoKTtcbiAgICAgICAgaWYgKG9yaWdpbikge1xuICAgICAgICAgIG9mZnNldCA9IG9yaWdpbi5hcHBseSh0YXJnZXQsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgb2Zmc2V0ID0gWyBvZmZzZXQueCAtIG9yaWdpbl9bMF0sIG9mZnNldC55IC0gb3JpZ2luX1sxXSBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9mZnNldCA9IFsgMCwgMCBdO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50Xyh7XG4gICAgICAgICAgdHlwZTogXCJkcmFnc3RhcnRcIlxuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gbW92ZWQoKSB7XG4gICAgICAgICAgaWYgKCFwYXJlbnQpIHJldHVybiBlbmRlZCgpO1xuICAgICAgICAgIHZhciBwID0gcG9zaXRpb24ocGFyZW50LCBldmVudElkKSwgZHggPSBwWzBdIC0gb3JpZ2luX1swXSwgZHkgPSBwWzFdIC0gb3JpZ2luX1sxXTtcbiAgICAgICAgICBkcmFnZ2VkIHw9IGR4IHwgZHk7XG4gICAgICAgICAgb3JpZ2luXyA9IHA7XG4gICAgICAgICAgZXZlbnRfKHtcbiAgICAgICAgICAgIHR5cGU6IFwiZHJhZ1wiLFxuICAgICAgICAgICAgeDogcFswXSArIG9mZnNldFswXSxcbiAgICAgICAgICAgIHk6IHBbMV0gKyBvZmZzZXRbMV0sXG4gICAgICAgICAgICBkeDogZHgsXG4gICAgICAgICAgICBkeTogZHlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBlbmRlZCgpIHtcbiAgICAgICAgICB3Lm9uKG1vdmUgKyBcIi5cIiArIGRyYWcsIG51bGwpLm9uKGVuZCArIFwiLlwiICsgZHJhZywgbnVsbCk7XG4gICAgICAgICAgZHJhZ1Jlc3RvcmUoZHJhZ2dlZCAmJiBkMy5ldmVudC50YXJnZXQgPT09IGV2ZW50VGFyZ2V0KTtcbiAgICAgICAgICBldmVudF8oe1xuICAgICAgICAgICAgdHlwZTogXCJkcmFnZW5kXCJcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gICAgZHJhZy5vcmlnaW4gPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvcmlnaW47XG4gICAgICBvcmlnaW4gPSB4O1xuICAgICAgcmV0dXJuIGRyYWc7XG4gICAgfTtcbiAgICByZXR1cm4gZDMucmViaW5kKGRyYWcsIGV2ZW50LCBcIm9uXCIpO1xuICB9O1xuICBkMy5iZWhhdmlvci56b29tID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRyYW5zbGF0ZSA9IFsgMCwgMCBdLCB0cmFuc2xhdGUwLCBzY2FsZSA9IDEsIHNjYWxlRXh0ZW50ID0gZDNfYmVoYXZpb3Jfem9vbUluZmluaXR5LCBtb3VzZWRvd24gPSBcIm1vdXNlZG93bi56b29tXCIsIG1vdXNlbW92ZSA9IFwibW91c2Vtb3ZlLnpvb21cIiwgbW91c2V1cCA9IFwibW91c2V1cC56b29tXCIsIGV2ZW50ID0gZDNfZXZlbnREaXNwYXRjaCh6b29tLCBcInpvb21cIiksIHgwLCB4MSwgeTAsIHkxLCB0b3VjaHRpbWU7XG4gICAgZnVuY3Rpb24gem9vbSgpIHtcbiAgICAgIHRoaXMub24obW91c2Vkb3duLCBtb3VzZWRvd25lZCkub24oZDNfYmVoYXZpb3Jfem9vbVdoZWVsICsgXCIuem9vbVwiLCBtb3VzZXdoZWVsZWQpLm9uKG1vdXNlbW92ZSwgbW91c2V3aGVlbHJlc2V0KS5vbihcImRibGNsaWNrLnpvb21cIiwgZGJsY2xpY2tlZCkub24oXCJ0b3VjaHN0YXJ0Lnpvb21cIiwgdG91Y2hzdGFydGVkKTtcbiAgICB9XG4gICAgem9vbS50cmFuc2xhdGUgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0cmFuc2xhdGU7XG4gICAgICB0cmFuc2xhdGUgPSB4Lm1hcChOdW1iZXIpO1xuICAgICAgcmVzY2FsZSgpO1xuICAgICAgcmV0dXJuIHpvb207XG4gICAgfTtcbiAgICB6b29tLnNjYWxlID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2NhbGU7XG4gICAgICBzY2FsZSA9ICt4O1xuICAgICAgcmVzY2FsZSgpO1xuICAgICAgcmV0dXJuIHpvb207XG4gICAgfTtcbiAgICB6b29tLnNjYWxlRXh0ZW50ID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2NhbGVFeHRlbnQ7XG4gICAgICBzY2FsZUV4dGVudCA9IHggPT0gbnVsbCA/IGQzX2JlaGF2aW9yX3pvb21JbmZpbml0eSA6IHgubWFwKE51bWJlcik7XG4gICAgICByZXR1cm4gem9vbTtcbiAgICB9O1xuICAgIHpvb20ueCA9IGZ1bmN0aW9uKHopIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHgxO1xuICAgICAgeDEgPSB6O1xuICAgICAgeDAgPSB6LmNvcHkoKTtcbiAgICAgIHRyYW5zbGF0ZSA9IFsgMCwgMCBdO1xuICAgICAgc2NhbGUgPSAxO1xuICAgICAgcmV0dXJuIHpvb207XG4gICAgfTtcbiAgICB6b29tLnkgPSBmdW5jdGlvbih6KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB5MTtcbiAgICAgIHkxID0gejtcbiAgICAgIHkwID0gei5jb3B5KCk7XG4gICAgICB0cmFuc2xhdGUgPSBbIDAsIDAgXTtcbiAgICAgIHNjYWxlID0gMTtcbiAgICAgIHJldHVybiB6b29tO1xuICAgIH07XG4gICAgZnVuY3Rpb24gbG9jYXRpb24ocCkge1xuICAgICAgcmV0dXJuIFsgKHBbMF0gLSB0cmFuc2xhdGVbMF0pIC8gc2NhbGUsIChwWzFdIC0gdHJhbnNsYXRlWzFdKSAvIHNjYWxlIF07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBvaW50KGwpIHtcbiAgICAgIHJldHVybiBbIGxbMF0gKiBzY2FsZSArIHRyYW5zbGF0ZVswXSwgbFsxXSAqIHNjYWxlICsgdHJhbnNsYXRlWzFdIF07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNjYWxlVG8ocykge1xuICAgICAgc2NhbGUgPSBNYXRoLm1heChzY2FsZUV4dGVudFswXSwgTWF0aC5taW4oc2NhbGVFeHRlbnRbMV0sIHMpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlVG8ocCwgbCkge1xuICAgICAgbCA9IHBvaW50KGwpO1xuICAgICAgdHJhbnNsYXRlWzBdICs9IHBbMF0gLSBsWzBdO1xuICAgICAgdHJhbnNsYXRlWzFdICs9IHBbMV0gLSBsWzFdO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXNjYWxlKCkge1xuICAgICAgaWYgKHgxKSB4MS5kb21haW4oeDAucmFuZ2UoKS5tYXAoZnVuY3Rpb24oeCkge1xuICAgICAgICByZXR1cm4gKHggLSB0cmFuc2xhdGVbMF0pIC8gc2NhbGU7XG4gICAgICB9KS5tYXAoeDAuaW52ZXJ0KSk7XG4gICAgICBpZiAoeTEpIHkxLmRvbWFpbih5MC5yYW5nZSgpLm1hcChmdW5jdGlvbih5KSB7XG4gICAgICAgIHJldHVybiAoeSAtIHRyYW5zbGF0ZVsxXSkgLyBzY2FsZTtcbiAgICAgIH0pLm1hcCh5MC5pbnZlcnQpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZGlzcGF0Y2goZXZlbnQpIHtcbiAgICAgIHJlc2NhbGUoKTtcbiAgICAgIGV2ZW50KHtcbiAgICAgICAgdHlwZTogXCJ6b29tXCIsXG4gICAgICAgIHNjYWxlOiBzY2FsZSxcbiAgICAgICAgdHJhbnNsYXRlOiB0cmFuc2xhdGVcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtb3VzZWRvd25lZCgpIHtcbiAgICAgIHZhciB0YXJnZXQgPSB0aGlzLCBldmVudF8gPSBldmVudC5vZih0YXJnZXQsIGFyZ3VtZW50cyksIGV2ZW50VGFyZ2V0ID0gZDMuZXZlbnQudGFyZ2V0LCBkcmFnZ2VkID0gMCwgdyA9IGQzLnNlbGVjdChkM193aW5kb3cpLm9uKG1vdXNlbW92ZSwgbW92ZWQpLm9uKG1vdXNldXAsIGVuZGVkKSwgbCA9IGxvY2F0aW9uKGQzLm1vdXNlKHRhcmdldCkpLCBkcmFnUmVzdG9yZSA9IGQzX2V2ZW50X2RyYWdTdXBwcmVzcygpO1xuICAgICAgZnVuY3Rpb24gbW92ZWQoKSB7XG4gICAgICAgIGRyYWdnZWQgPSAxO1xuICAgICAgICB0cmFuc2xhdGVUbyhkMy5tb3VzZSh0YXJnZXQpLCBsKTtcbiAgICAgICAgZGlzcGF0Y2goZXZlbnRfKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGVuZGVkKCkge1xuICAgICAgICB3Lm9uKG1vdXNlbW92ZSwgZDNfd2luZG93ID09PSB0YXJnZXQgPyBtb3VzZXdoZWVscmVzZXQgOiBudWxsKS5vbihtb3VzZXVwLCBudWxsKTtcbiAgICAgICAgZHJhZ1Jlc3RvcmUoZHJhZ2dlZCAmJiBkMy5ldmVudC50YXJnZXQgPT09IGV2ZW50VGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdG91Y2hzdGFydGVkKCkge1xuICAgICAgdmFyIHRhcmdldCA9IHRoaXMsIGV2ZW50XyA9IGV2ZW50Lm9mKHRhcmdldCwgYXJndW1lbnRzKSwgdG91Y2hlcyA9IGQzLnRvdWNoZXModGFyZ2V0KSwgbG9jYXRpb25zID0ge30sIGRpc3RhbmNlMCA9IDAsIHNjYWxlMCA9IHNjYWxlLCBub3cgPSBEYXRlLm5vdygpLCBuYW1lID0gXCJ6b29tLVwiICsgZDMuZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uaWRlbnRpZmllciwgdG91Y2htb3ZlID0gXCJ0b3VjaG1vdmUuXCIgKyBuYW1lLCB0b3VjaGVuZCA9IFwidG91Y2hlbmQuXCIgKyBuYW1lLCB3ID0gZDMuc2VsZWN0KGQzX3dpbmRvdykub24odG91Y2htb3ZlLCBtb3ZlZCkub24odG91Y2hlbmQsIGVuZGVkKSwgdCA9IGQzLnNlbGVjdCh0YXJnZXQpLm9uKG1vdXNlZG93biwgbnVsbCksIGRyYWdSZXN0b3JlID0gZDNfZXZlbnRfZHJhZ1N1cHByZXNzKCk7XG4gICAgICB0b3VjaGVzLmZvckVhY2goZnVuY3Rpb24odCkge1xuICAgICAgICBsb2NhdGlvbnNbdC5pZGVudGlmaWVyXSA9IGxvY2F0aW9uKHQpO1xuICAgICAgfSk7XG4gICAgICBpZiAodG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgaWYgKG5vdyAtIHRvdWNodGltZSA8IDUwMCkge1xuICAgICAgICAgIHZhciBwID0gdG91Y2hlc1swXSwgbCA9IGxvY2F0aW9uKHRvdWNoZXNbMF0pO1xuICAgICAgICAgIHNjYWxlVG8oc2NhbGUgKiAyKTtcbiAgICAgICAgICB0cmFuc2xhdGVUbyhwLCBsKTtcbiAgICAgICAgICBkM19ldmVudFByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZGlzcGF0Y2goZXZlbnRfKTtcbiAgICAgICAgfVxuICAgICAgICB0b3VjaHRpbWUgPSBub3c7XG4gICAgICB9IGVsc2UgaWYgKHRvdWNoZXMubGVuZ3RoID4gMSkge1xuICAgICAgICB2YXIgcCA9IHRvdWNoZXNbMF0sIHEgPSB0b3VjaGVzWzFdLCBkeCA9IHBbMF0gLSBxWzBdLCBkeSA9IHBbMV0gLSBxWzFdO1xuICAgICAgICBkaXN0YW5jZTAgPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIG1vdmVkKCkge1xuICAgICAgICB2YXIgdG91Y2hlcyA9IGQzLnRvdWNoZXModGFyZ2V0KSwgcDAgPSB0b3VjaGVzWzBdLCBsMCA9IGxvY2F0aW9uc1twMC5pZGVudGlmaWVyXTtcbiAgICAgICAgaWYgKHAxID0gdG91Y2hlc1sxXSkge1xuICAgICAgICAgIHZhciBwMSwgbDEgPSBsb2NhdGlvbnNbcDEuaWRlbnRpZmllcl0sIHNjYWxlMSA9IGQzLmV2ZW50LnNjYWxlO1xuICAgICAgICAgIGlmIChzY2FsZTEgPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGRpc3RhbmNlMSA9IChkaXN0YW5jZTEgPSBwMVswXSAtIHAwWzBdKSAqIGRpc3RhbmNlMSArIChkaXN0YW5jZTEgPSBwMVsxXSAtIHAwWzFdKSAqIGRpc3RhbmNlMTtcbiAgICAgICAgICAgIHNjYWxlMSA9IGRpc3RhbmNlMCAmJiBNYXRoLnNxcnQoZGlzdGFuY2UxIC8gZGlzdGFuY2UwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcDAgPSBbIChwMFswXSArIHAxWzBdKSAvIDIsIChwMFsxXSArIHAxWzFdKSAvIDIgXTtcbiAgICAgICAgICBsMCA9IFsgKGwwWzBdICsgbDFbMF0pIC8gMiwgKGwwWzFdICsgbDFbMV0pIC8gMiBdO1xuICAgICAgICAgIHNjYWxlVG8oc2NhbGUxICogc2NhbGUwKTtcbiAgICAgICAgfVxuICAgICAgICB0b3VjaHRpbWUgPSBudWxsO1xuICAgICAgICB0cmFuc2xhdGVUbyhwMCwgbDApO1xuICAgICAgICBkaXNwYXRjaChldmVudF8pO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gZW5kZWQoKSB7XG4gICAgICAgIHcub24odG91Y2htb3ZlLCBudWxsKS5vbih0b3VjaGVuZCwgbnVsbCk7XG4gICAgICAgIHQub24obW91c2Vkb3duLCBtb3VzZWRvd25lZCk7XG4gICAgICAgIGRyYWdSZXN0b3JlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1vdXNld2hlZWxlZCgpIHtcbiAgICAgIGQzX2V2ZW50UHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmICghdHJhbnNsYXRlMCkgdHJhbnNsYXRlMCA9IGxvY2F0aW9uKGQzLm1vdXNlKHRoaXMpKTtcbiAgICAgIHNjYWxlVG8oTWF0aC5wb3coMiwgZDNfYmVoYXZpb3Jfem9vbURlbHRhKCkgKiAuMDAyKSAqIHNjYWxlKTtcbiAgICAgIHRyYW5zbGF0ZVRvKGQzLm1vdXNlKHRoaXMpLCB0cmFuc2xhdGUwKTtcbiAgICAgIGRpc3BhdGNoKGV2ZW50Lm9mKHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtb3VzZXdoZWVscmVzZXQoKSB7XG4gICAgICB0cmFuc2xhdGUwID0gbnVsbDtcbiAgICB9XG4gICAgZnVuY3Rpb24gZGJsY2xpY2tlZCgpIHtcbiAgICAgIHZhciBwID0gZDMubW91c2UodGhpcyksIGwgPSBsb2NhdGlvbihwKSwgayA9IE1hdGgubG9nKHNjYWxlKSAvIE1hdGguTE4yO1xuICAgICAgc2NhbGVUbyhNYXRoLnBvdygyLCBkMy5ldmVudC5zaGlmdEtleSA/IE1hdGguY2VpbChrKSAtIDEgOiBNYXRoLmZsb29yKGspICsgMSkpO1xuICAgICAgdHJhbnNsYXRlVG8ocCwgbCk7XG4gICAgICBkaXNwYXRjaChldmVudC5vZih0aGlzLCBhcmd1bWVudHMpKTtcbiAgICB9XG4gICAgcmV0dXJuIGQzLnJlYmluZCh6b29tLCBldmVudCwgXCJvblwiKTtcbiAgfTtcbiAgdmFyIGQzX2JlaGF2aW9yX3pvb21JbmZpbml0eSA9IFsgMCwgSW5maW5pdHkgXTtcbiAgdmFyIGQzX2JlaGF2aW9yX3pvb21EZWx0YSwgZDNfYmVoYXZpb3Jfem9vbVdoZWVsID0gXCJvbndoZWVsXCIgaW4gZDNfZG9jdW1lbnQgPyAoZDNfYmVoYXZpb3Jfem9vbURlbHRhID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIC1kMy5ldmVudC5kZWx0YVkgKiAoZDMuZXZlbnQuZGVsdGFNb2RlID8gMTIwIDogMSk7XG4gIH0sIFwid2hlZWxcIikgOiBcIm9ubW91c2V3aGVlbFwiIGluIGQzX2RvY3VtZW50ID8gKGQzX2JlaGF2aW9yX3pvb21EZWx0YSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkMy5ldmVudC53aGVlbERlbHRhO1xuICB9LCBcIm1vdXNld2hlZWxcIikgOiAoZDNfYmVoYXZpb3Jfem9vbURlbHRhID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIC1kMy5ldmVudC5kZXRhaWw7XG4gIH0sIFwiTW96TW91c2VQaXhlbFNjcm9sbFwiKTtcbiAgZnVuY3Rpb24gZDNfQ29sb3IoKSB7fVxuICBkM19Db2xvci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5yZ2IoKSArIFwiXCI7XG4gIH07XG4gIGQzLmhzbCA9IGZ1bmN0aW9uKGgsIHMsIGwpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IGggaW5zdGFuY2VvZiBkM19Ic2wgPyBkM19oc2woaC5oLCBoLnMsIGgubCkgOiBkM19yZ2JfcGFyc2UoXCJcIiArIGgsIGQzX3JnYl9oc2wsIGQzX2hzbCkgOiBkM19oc2woK2gsICtzLCArbCk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2hzbChoLCBzLCBsKSB7XG4gICAgcmV0dXJuIG5ldyBkM19Ic2woaCwgcywgbCk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfSHNsKGgsIHMsIGwpIHtcbiAgICB0aGlzLmggPSBoO1xuICAgIHRoaXMucyA9IHM7XG4gICAgdGhpcy5sID0gbDtcbiAgfVxuICB2YXIgZDNfaHNsUHJvdG90eXBlID0gZDNfSHNsLnByb3RvdHlwZSA9IG5ldyBkM19Db2xvcigpO1xuICBkM19oc2xQcm90b3R5cGUuYnJpZ2h0ZXIgPSBmdW5jdGlvbihrKSB7XG4gICAgayA9IE1hdGgucG93KC43LCBhcmd1bWVudHMubGVuZ3RoID8gayA6IDEpO1xuICAgIHJldHVybiBkM19oc2wodGhpcy5oLCB0aGlzLnMsIHRoaXMubCAvIGspO1xuICB9O1xuICBkM19oc2xQcm90b3R5cGUuZGFya2VyID0gZnVuY3Rpb24oaykge1xuICAgIGsgPSBNYXRoLnBvdyguNywgYXJndW1lbnRzLmxlbmd0aCA/IGsgOiAxKTtcbiAgICByZXR1cm4gZDNfaHNsKHRoaXMuaCwgdGhpcy5zLCBrICogdGhpcy5sKTtcbiAgfTtcbiAgZDNfaHNsUHJvdG90eXBlLnJnYiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkM19oc2xfcmdiKHRoaXMuaCwgdGhpcy5zLCB0aGlzLmwpO1xuICB9O1xuICBmdW5jdGlvbiBkM19oc2xfcmdiKGgsIHMsIGwpIHtcbiAgICB2YXIgbTEsIG0yO1xuICAgIGggPSBpc05hTihoKSA/IDAgOiAoaCAlPSAzNjApIDwgMCA/IGggKyAzNjAgOiBoO1xuICAgIHMgPSBpc05hTihzKSA/IDAgOiBzIDwgMCA/IDAgOiBzID4gMSA/IDEgOiBzO1xuICAgIGwgPSBsIDwgMCA/IDAgOiBsID4gMSA/IDEgOiBsO1xuICAgIG0yID0gbCA8PSAuNSA/IGwgKiAoMSArIHMpIDogbCArIHMgLSBsICogcztcbiAgICBtMSA9IDIgKiBsIC0gbTI7XG4gICAgZnVuY3Rpb24gdihoKSB7XG4gICAgICBpZiAoaCA+IDM2MCkgaCAtPSAzNjA7IGVsc2UgaWYgKGggPCAwKSBoICs9IDM2MDtcbiAgICAgIGlmIChoIDwgNjApIHJldHVybiBtMSArIChtMiAtIG0xKSAqIGggLyA2MDtcbiAgICAgIGlmIChoIDwgMTgwKSByZXR1cm4gbTI7XG4gICAgICBpZiAoaCA8IDI0MCkgcmV0dXJuIG0xICsgKG0yIC0gbTEpICogKDI0MCAtIGgpIC8gNjA7XG4gICAgICByZXR1cm4gbTE7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHZ2KGgpIHtcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKHYoaCkgKiAyNTUpO1xuICAgIH1cbiAgICByZXR1cm4gZDNfcmdiKHZ2KGggKyAxMjApLCB2dihoKSwgdnYoaCAtIDEyMCkpO1xuICB9XG4gIHZhciDPgCA9IE1hdGguUEksIM61ID0gMWUtNiwgzrUyID0gzrUgKiDOtSwgZDNfcmFkaWFucyA9IM+AIC8gMTgwLCBkM19kZWdyZWVzID0gMTgwIC8gz4A7XG4gIGZ1bmN0aW9uIGQzX3Nnbih4KSB7XG4gICAgcmV0dXJuIHggPiAwID8gMSA6IHggPCAwID8gLTEgOiAwO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2Fjb3MoeCkge1xuICAgIHJldHVybiB4ID4gMSA/IDAgOiB4IDwgLTEgPyDPgCA6IE1hdGguYWNvcyh4KTtcbiAgfVxuICBmdW5jdGlvbiBkM19hc2luKHgpIHtcbiAgICByZXR1cm4geCA+IDEgPyDPgCAvIDIgOiB4IDwgLTEgPyAtz4AgLyAyIDogTWF0aC5hc2luKHgpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3NpbmgoeCkge1xuICAgIHJldHVybiAoTWF0aC5leHAoeCkgLSBNYXRoLmV4cCgteCkpIC8gMjtcbiAgfVxuICBmdW5jdGlvbiBkM19jb3NoKHgpIHtcbiAgICByZXR1cm4gKE1hdGguZXhwKHgpICsgTWF0aC5leHAoLXgpKSAvIDI7XG4gIH1cbiAgZnVuY3Rpb24gZDNfaGF2ZXJzaW4oeCkge1xuICAgIHJldHVybiAoeCA9IE1hdGguc2luKHggLyAyKSkgKiB4O1xuICB9XG4gIGQzLmhjbCA9IGZ1bmN0aW9uKGgsIGMsIGwpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IGggaW5zdGFuY2VvZiBkM19IY2wgPyBkM19oY2woaC5oLCBoLmMsIGgubCkgOiBoIGluc3RhbmNlb2YgZDNfTGFiID8gZDNfbGFiX2hjbChoLmwsIGguYSwgaC5iKSA6IGQzX2xhYl9oY2woKGggPSBkM19yZ2JfbGFiKChoID0gZDMucmdiKGgpKS5yLCBoLmcsIGguYikpLmwsIGguYSwgaC5iKSA6IGQzX2hjbCgraCwgK2MsICtsKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfaGNsKGgsIGMsIGwpIHtcbiAgICByZXR1cm4gbmV3IGQzX0hjbChoLCBjLCBsKTtcbiAgfVxuICBmdW5jdGlvbiBkM19IY2woaCwgYywgbCkge1xuICAgIHRoaXMuaCA9IGg7XG4gICAgdGhpcy5jID0gYztcbiAgICB0aGlzLmwgPSBsO1xuICB9XG4gIHZhciBkM19oY2xQcm90b3R5cGUgPSBkM19IY2wucHJvdG90eXBlID0gbmV3IGQzX0NvbG9yKCk7XG4gIGQzX2hjbFByb3RvdHlwZS5icmlnaHRlciA9IGZ1bmN0aW9uKGspIHtcbiAgICByZXR1cm4gZDNfaGNsKHRoaXMuaCwgdGhpcy5jLCBNYXRoLm1pbigxMDAsIHRoaXMubCArIGQzX2xhYl9LICogKGFyZ3VtZW50cy5sZW5ndGggPyBrIDogMSkpKTtcbiAgfTtcbiAgZDNfaGNsUHJvdG90eXBlLmRhcmtlciA9IGZ1bmN0aW9uKGspIHtcbiAgICByZXR1cm4gZDNfaGNsKHRoaXMuaCwgdGhpcy5jLCBNYXRoLm1heCgwLCB0aGlzLmwgLSBkM19sYWJfSyAqIChhcmd1bWVudHMubGVuZ3RoID8gayA6IDEpKSk7XG4gIH07XG4gIGQzX2hjbFByb3RvdHlwZS5yZ2IgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfaGNsX2xhYih0aGlzLmgsIHRoaXMuYywgdGhpcy5sKS5yZ2IoKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfaGNsX2xhYihoLCBjLCBsKSB7XG4gICAgaWYgKGlzTmFOKGgpKSBoID0gMDtcbiAgICBpZiAoaXNOYU4oYykpIGMgPSAwO1xuICAgIHJldHVybiBkM19sYWIobCwgTWF0aC5jb3MoaCAqPSBkM19yYWRpYW5zKSAqIGMsIE1hdGguc2luKGgpICogYyk7XG4gIH1cbiAgZDMubGFiID0gZnVuY3Rpb24obCwgYSwgYikge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gbCBpbnN0YW5jZW9mIGQzX0xhYiA/IGQzX2xhYihsLmwsIGwuYSwgbC5iKSA6IGwgaW5zdGFuY2VvZiBkM19IY2wgPyBkM19oY2xfbGFiKGwubCwgbC5jLCBsLmgpIDogZDNfcmdiX2xhYigobCA9IGQzLnJnYihsKSkuciwgbC5nLCBsLmIpIDogZDNfbGFiKCtsLCArYSwgK2IpO1xuICB9O1xuICBmdW5jdGlvbiBkM19sYWIobCwgYSwgYikge1xuICAgIHJldHVybiBuZXcgZDNfTGFiKGwsIGEsIGIpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX0xhYihsLCBhLCBiKSB7XG4gICAgdGhpcy5sID0gbDtcbiAgICB0aGlzLmEgPSBhO1xuICAgIHRoaXMuYiA9IGI7XG4gIH1cbiAgdmFyIGQzX2xhYl9LID0gMTg7XG4gIHZhciBkM19sYWJfWCA9IC45NTA0NywgZDNfbGFiX1kgPSAxLCBkM19sYWJfWiA9IDEuMDg4ODM7XG4gIHZhciBkM19sYWJQcm90b3R5cGUgPSBkM19MYWIucHJvdG90eXBlID0gbmV3IGQzX0NvbG9yKCk7XG4gIGQzX2xhYlByb3RvdHlwZS5icmlnaHRlciA9IGZ1bmN0aW9uKGspIHtcbiAgICByZXR1cm4gZDNfbGFiKE1hdGgubWluKDEwMCwgdGhpcy5sICsgZDNfbGFiX0sgKiAoYXJndW1lbnRzLmxlbmd0aCA/IGsgOiAxKSksIHRoaXMuYSwgdGhpcy5iKTtcbiAgfTtcbiAgZDNfbGFiUHJvdG90eXBlLmRhcmtlciA9IGZ1bmN0aW9uKGspIHtcbiAgICByZXR1cm4gZDNfbGFiKE1hdGgubWF4KDAsIHRoaXMubCAtIGQzX2xhYl9LICogKGFyZ3VtZW50cy5sZW5ndGggPyBrIDogMSkpLCB0aGlzLmEsIHRoaXMuYik7XG4gIH07XG4gIGQzX2xhYlByb3RvdHlwZS5yZ2IgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfbGFiX3JnYih0aGlzLmwsIHRoaXMuYSwgdGhpcy5iKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfbGFiX3JnYihsLCBhLCBiKSB7XG4gICAgdmFyIHkgPSAobCArIDE2KSAvIDExNiwgeCA9IHkgKyBhIC8gNTAwLCB6ID0geSAtIGIgLyAyMDA7XG4gICAgeCA9IGQzX2xhYl94eXooeCkgKiBkM19sYWJfWDtcbiAgICB5ID0gZDNfbGFiX3h5eih5KSAqIGQzX2xhYl9ZO1xuICAgIHogPSBkM19sYWJfeHl6KHopICogZDNfbGFiX1o7XG4gICAgcmV0dXJuIGQzX3JnYihkM194eXpfcmdiKDMuMjQwNDU0MiAqIHggLSAxLjUzNzEzODUgKiB5IC0gLjQ5ODUzMTQgKiB6KSwgZDNfeHl6X3JnYigtLjk2OTI2NiAqIHggKyAxLjg3NjAxMDggKiB5ICsgLjA0MTU1NiAqIHopLCBkM194eXpfcmdiKC4wNTU2NDM0ICogeCAtIC4yMDQwMjU5ICogeSArIDEuMDU3MjI1MiAqIHopKTtcbiAgfVxuICBmdW5jdGlvbiBkM19sYWJfaGNsKGwsIGEsIGIpIHtcbiAgICByZXR1cm4gbCA+IDAgPyBkM19oY2woTWF0aC5hdGFuMihiLCBhKSAqIGQzX2RlZ3JlZXMsIE1hdGguc3FydChhICogYSArIGIgKiBiKSwgbCkgOiBkM19oY2woTmFOLCBOYU4sIGwpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xhYl94eXooeCkge1xuICAgIHJldHVybiB4ID4gLjIwNjg5MzAzNCA/IHggKiB4ICogeCA6ICh4IC0gNCAvIDI5KSAvIDcuNzg3MDM3O1xuICB9XG4gIGZ1bmN0aW9uIGQzX3h5el9sYWIoeCkge1xuICAgIHJldHVybiB4ID4gLjAwODg1NiA/IE1hdGgucG93KHgsIDEgLyAzKSA6IDcuNzg3MDM3ICogeCArIDQgLyAyOTtcbiAgfVxuICBmdW5jdGlvbiBkM194eXpfcmdiKHIpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgyNTUgKiAociA8PSAuMDAzMDQgPyAxMi45MiAqIHIgOiAxLjA1NSAqIE1hdGgucG93KHIsIDEgLyAyLjQpIC0gLjA1NSkpO1xuICB9XG4gIGQzLnJnYiA9IGZ1bmN0aW9uKHIsIGcsIGIpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IHIgaW5zdGFuY2VvZiBkM19SZ2IgPyBkM19yZ2Ioci5yLCByLmcsIHIuYikgOiBkM19yZ2JfcGFyc2UoXCJcIiArIHIsIGQzX3JnYiwgZDNfaHNsX3JnYikgOiBkM19yZ2Iofn5yLCB+fmcsIH5+Yik7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3JnYk51bWJlcih2YWx1ZSkge1xuICAgIHJldHVybiBkM19yZ2IodmFsdWUgPj4gMTYsIHZhbHVlID4+IDggJiAyNTUsIHZhbHVlICYgMjU1KTtcbiAgfVxuICBmdW5jdGlvbiBkM19yZ2JTdHJpbmcodmFsdWUpIHtcbiAgICByZXR1cm4gZDNfcmdiTnVtYmVyKHZhbHVlKSArIFwiXCI7XG4gIH1cbiAgZnVuY3Rpb24gZDNfcmdiKHIsIGcsIGIpIHtcbiAgICByZXR1cm4gbmV3IGQzX1JnYihyLCBnLCBiKTtcbiAgfVxuICBmdW5jdGlvbiBkM19SZ2IociwgZywgYikge1xuICAgIHRoaXMuciA9IHI7XG4gICAgdGhpcy5nID0gZztcbiAgICB0aGlzLmIgPSBiO1xuICB9XG4gIHZhciBkM19yZ2JQcm90b3R5cGUgPSBkM19SZ2IucHJvdG90eXBlID0gbmV3IGQzX0NvbG9yKCk7XG4gIGQzX3JnYlByb3RvdHlwZS5icmlnaHRlciA9IGZ1bmN0aW9uKGspIHtcbiAgICBrID0gTWF0aC5wb3coLjcsIGFyZ3VtZW50cy5sZW5ndGggPyBrIDogMSk7XG4gICAgdmFyIHIgPSB0aGlzLnIsIGcgPSB0aGlzLmcsIGIgPSB0aGlzLmIsIGkgPSAzMDtcbiAgICBpZiAoIXIgJiYgIWcgJiYgIWIpIHJldHVybiBkM19yZ2IoaSwgaSwgaSk7XG4gICAgaWYgKHIgJiYgciA8IGkpIHIgPSBpO1xuICAgIGlmIChnICYmIGcgPCBpKSBnID0gaTtcbiAgICBpZiAoYiAmJiBiIDwgaSkgYiA9IGk7XG4gICAgcmV0dXJuIGQzX3JnYihNYXRoLm1pbigyNTUsIH5+KHIgLyBrKSksIE1hdGgubWluKDI1NSwgfn4oZyAvIGspKSwgTWF0aC5taW4oMjU1LCB+fihiIC8gaykpKTtcbiAgfTtcbiAgZDNfcmdiUHJvdG90eXBlLmRhcmtlciA9IGZ1bmN0aW9uKGspIHtcbiAgICBrID0gTWF0aC5wb3coLjcsIGFyZ3VtZW50cy5sZW5ndGggPyBrIDogMSk7XG4gICAgcmV0dXJuIGQzX3JnYih+fihrICogdGhpcy5yKSwgfn4oayAqIHRoaXMuZyksIH5+KGsgKiB0aGlzLmIpKTtcbiAgfTtcbiAgZDNfcmdiUHJvdG90eXBlLmhzbCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkM19yZ2JfaHNsKHRoaXMuciwgdGhpcy5nLCB0aGlzLmIpO1xuICB9O1xuICBkM19yZ2JQcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCIjXCIgKyBkM19yZ2JfaGV4KHRoaXMucikgKyBkM19yZ2JfaGV4KHRoaXMuZykgKyBkM19yZ2JfaGV4KHRoaXMuYik7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3JnYl9oZXgodikge1xuICAgIHJldHVybiB2IDwgMTYgPyBcIjBcIiArIE1hdGgubWF4KDAsIHYpLnRvU3RyaW5nKDE2KSA6IE1hdGgubWluKDI1NSwgdikudG9TdHJpbmcoMTYpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3JnYl9wYXJzZShmb3JtYXQsIHJnYiwgaHNsKSB7XG4gICAgdmFyIHIgPSAwLCBnID0gMCwgYiA9IDAsIG0xLCBtMiwgbmFtZTtcbiAgICBtMSA9IC8oW2Etel0rKVxcKCguKilcXCkvaS5leGVjKGZvcm1hdCk7XG4gICAgaWYgKG0xKSB7XG4gICAgICBtMiA9IG0xWzJdLnNwbGl0KFwiLFwiKTtcbiAgICAgIHN3aXRjaCAobTFbMV0pIHtcbiAgICAgICBjYXNlIFwiaHNsXCI6XG4gICAgICAgIHtcbiAgICAgICAgICByZXR1cm4gaHNsKHBhcnNlRmxvYXQobTJbMF0pLCBwYXJzZUZsb2F0KG0yWzFdKSAvIDEwMCwgcGFyc2VGbG9hdChtMlsyXSkgLyAxMDApO1xuICAgICAgICB9XG5cbiAgICAgICBjYXNlIFwicmdiXCI6XG4gICAgICAgIHtcbiAgICAgICAgICByZXR1cm4gcmdiKGQzX3JnYl9wYXJzZU51bWJlcihtMlswXSksIGQzX3JnYl9wYXJzZU51bWJlcihtMlsxXSksIGQzX3JnYl9wYXJzZU51bWJlcihtMlsyXSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChuYW1lID0gZDNfcmdiX25hbWVzLmdldChmb3JtYXQpKSByZXR1cm4gcmdiKG5hbWUuciwgbmFtZS5nLCBuYW1lLmIpO1xuICAgIGlmIChmb3JtYXQgIT0gbnVsbCAmJiBmb3JtYXQuY2hhckF0KDApID09PSBcIiNcIikge1xuICAgICAgaWYgKGZvcm1hdC5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgciA9IGZvcm1hdC5jaGFyQXQoMSk7XG4gICAgICAgIHIgKz0gcjtcbiAgICAgICAgZyA9IGZvcm1hdC5jaGFyQXQoMik7XG4gICAgICAgIGcgKz0gZztcbiAgICAgICAgYiA9IGZvcm1hdC5jaGFyQXQoMyk7XG4gICAgICAgIGIgKz0gYjtcbiAgICAgIH0gZWxzZSBpZiAoZm9ybWF0Lmxlbmd0aCA9PT0gNykge1xuICAgICAgICByID0gZm9ybWF0LnN1YnN0cmluZygxLCAzKTtcbiAgICAgICAgZyA9IGZvcm1hdC5zdWJzdHJpbmcoMywgNSk7XG4gICAgICAgIGIgPSBmb3JtYXQuc3Vic3RyaW5nKDUsIDcpO1xuICAgICAgfVxuICAgICAgciA9IHBhcnNlSW50KHIsIDE2KTtcbiAgICAgIGcgPSBwYXJzZUludChnLCAxNik7XG4gICAgICBiID0gcGFyc2VJbnQoYiwgMTYpO1xuICAgIH1cbiAgICByZXR1cm4gcmdiKHIsIGcsIGIpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3JnYl9oc2wociwgZywgYikge1xuICAgIHZhciBtaW4gPSBNYXRoLm1pbihyIC89IDI1NSwgZyAvPSAyNTUsIGIgLz0gMjU1KSwgbWF4ID0gTWF0aC5tYXgociwgZywgYiksIGQgPSBtYXggLSBtaW4sIGgsIHMsIGwgPSAobWF4ICsgbWluKSAvIDI7XG4gICAgaWYgKGQpIHtcbiAgICAgIHMgPSBsIDwgLjUgPyBkIC8gKG1heCArIG1pbikgOiBkIC8gKDIgLSBtYXggLSBtaW4pO1xuICAgICAgaWYgKHIgPT0gbWF4KSBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7IGVsc2UgaWYgKGcgPT0gbWF4KSBoID0gKGIgLSByKSAvIGQgKyAyOyBlbHNlIGggPSAociAtIGcpIC8gZCArIDQ7XG4gICAgICBoICo9IDYwO1xuICAgIH0gZWxzZSB7XG4gICAgICBoID0gTmFOO1xuICAgICAgcyA9IGwgPiAwICYmIGwgPCAxID8gMCA6IGg7XG4gICAgfVxuICAgIHJldHVybiBkM19oc2woaCwgcywgbCk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfcmdiX2xhYihyLCBnLCBiKSB7XG4gICAgciA9IGQzX3JnYl94eXoocik7XG4gICAgZyA9IGQzX3JnYl94eXooZyk7XG4gICAgYiA9IGQzX3JnYl94eXooYik7XG4gICAgdmFyIHggPSBkM194eXpfbGFiKCguNDEyNDU2NCAqIHIgKyAuMzU3NTc2MSAqIGcgKyAuMTgwNDM3NSAqIGIpIC8gZDNfbGFiX1gpLCB5ID0gZDNfeHl6X2xhYigoLjIxMjY3MjkgKiByICsgLjcxNTE1MjIgKiBnICsgLjA3MjE3NSAqIGIpIC8gZDNfbGFiX1kpLCB6ID0gZDNfeHl6X2xhYigoLjAxOTMzMzkgKiByICsgLjExOTE5MiAqIGcgKyAuOTUwMzA0MSAqIGIpIC8gZDNfbGFiX1opO1xuICAgIHJldHVybiBkM19sYWIoMTE2ICogeSAtIDE2LCA1MDAgKiAoeCAtIHkpLCAyMDAgKiAoeSAtIHopKTtcbiAgfVxuICBmdW5jdGlvbiBkM19yZ2JfeHl6KHIpIHtcbiAgICByZXR1cm4gKHIgLz0gMjU1KSA8PSAuMDQwNDUgPyByIC8gMTIuOTIgOiBNYXRoLnBvdygociArIC4wNTUpIC8gMS4wNTUsIDIuNCk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfcmdiX3BhcnNlTnVtYmVyKGMpIHtcbiAgICB2YXIgZiA9IHBhcnNlRmxvYXQoYyk7XG4gICAgcmV0dXJuIGMuY2hhckF0KGMubGVuZ3RoIC0gMSkgPT09IFwiJVwiID8gTWF0aC5yb3VuZChmICogMi41NSkgOiBmO1xuICB9XG4gIHZhciBkM19yZ2JfbmFtZXMgPSBkMy5tYXAoe1xuICAgIGFsaWNlYmx1ZTogMTU3OTIzODMsXG4gICAgYW50aXF1ZXdoaXRlOiAxNjQ0NDM3NSxcbiAgICBhcXVhOiA2NTUzNSxcbiAgICBhcXVhbWFyaW5lOiA4Mzg4NTY0LFxuICAgIGF6dXJlOiAxNTc5NDE3NSxcbiAgICBiZWlnZTogMTYxMTkyNjAsXG4gICAgYmlzcXVlOiAxNjc3MDI0NCxcbiAgICBibGFjazogMCxcbiAgICBibGFuY2hlZGFsbW9uZDogMTY3NzIwNDUsXG4gICAgYmx1ZTogMjU1LFxuICAgIGJsdWV2aW9sZXQ6IDkwNTUyMDIsXG4gICAgYnJvd246IDEwODI0MjM0LFxuICAgIGJ1cmx5d29vZDogMTQ1OTYyMzEsXG4gICAgY2FkZXRibHVlOiA2MjY2NTI4LFxuICAgIGNoYXJ0cmV1c2U6IDgzODgzNTIsXG4gICAgY2hvY29sYXRlOiAxMzc4OTQ3MCxcbiAgICBjb3JhbDogMTY3NDQyNzIsXG4gICAgY29ybmZsb3dlcmJsdWU6IDY1OTE5ODEsXG4gICAgY29ybnNpbGs6IDE2Nzc1Mzg4LFxuICAgIGNyaW1zb246IDE0NDIzMTAwLFxuICAgIGN5YW46IDY1NTM1LFxuICAgIGRhcmtibHVlOiAxMzksXG4gICAgZGFya2N5YW46IDM1NzIzLFxuICAgIGRhcmtnb2xkZW5yb2Q6IDEyMDkyOTM5LFxuICAgIGRhcmtncmF5OiAxMTExOTAxNyxcbiAgICBkYXJrZ3JlZW46IDI1NjAwLFxuICAgIGRhcmtncmV5OiAxMTExOTAxNyxcbiAgICBkYXJra2hha2k6IDEyNDMzMjU5LFxuICAgIGRhcmttYWdlbnRhOiA5MTA5NjQzLFxuICAgIGRhcmtvbGl2ZWdyZWVuOiA1NTk3OTk5LFxuICAgIGRhcmtvcmFuZ2U6IDE2NzQ3NTIwLFxuICAgIGRhcmtvcmNoaWQ6IDEwMDQwMDEyLFxuICAgIGRhcmtyZWQ6IDkxMDk1MDQsXG4gICAgZGFya3NhbG1vbjogMTUzMDg0MTAsXG4gICAgZGFya3NlYWdyZWVuOiA5NDE5OTE5LFxuICAgIGRhcmtzbGF0ZWJsdWU6IDQ3MzQzNDcsXG4gICAgZGFya3NsYXRlZ3JheTogMzEwMDQ5NSxcbiAgICBkYXJrc2xhdGVncmV5OiAzMTAwNDk1LFxuICAgIGRhcmt0dXJxdW9pc2U6IDUyOTQ1LFxuICAgIGRhcmt2aW9sZXQ6IDk2OTk1MzksXG4gICAgZGVlcHBpbms6IDE2NzE2OTQ3LFxuICAgIGRlZXBza3libHVlOiA0OTE1MSxcbiAgICBkaW1ncmF5OiA2OTA4MjY1LFxuICAgIGRpbWdyZXk6IDY5MDgyNjUsXG4gICAgZG9kZ2VyYmx1ZTogMjAwMzE5OSxcbiAgICBmaXJlYnJpY2s6IDExNjc0MTQ2LFxuICAgIGZsb3JhbHdoaXRlOiAxNjc3NTkyMCxcbiAgICBmb3Jlc3RncmVlbjogMjI2Mzg0MixcbiAgICBmdWNoc2lhOiAxNjcxMTkzNSxcbiAgICBnYWluc2Jvcm86IDE0NDc0NDYwLFxuICAgIGdob3N0d2hpdGU6IDE2MzE2NjcxLFxuICAgIGdvbGQ6IDE2NzY2NzIwLFxuICAgIGdvbGRlbnJvZDogMTQzMjkxMjAsXG4gICAgZ3JheTogODQyMTUwNCxcbiAgICBncmVlbjogMzI3NjgsXG4gICAgZ3JlZW55ZWxsb3c6IDExNDAzMDU1LFxuICAgIGdyZXk6IDg0MjE1MDQsXG4gICAgaG9uZXlkZXc6IDE1Nzk0MTYwLFxuICAgIGhvdHBpbms6IDE2NzM4NzQwLFxuICAgIGluZGlhbnJlZDogMTM0NTg1MjQsXG4gICAgaW5kaWdvOiA0OTE1MzMwLFxuICAgIGl2b3J5OiAxNjc3NzIwMCxcbiAgICBraGFraTogMTU3ODc2NjAsXG4gICAgbGF2ZW5kZXI6IDE1MTMyNDEwLFxuICAgIGxhdmVuZGVyYmx1c2g6IDE2NzczMzY1LFxuICAgIGxhd25ncmVlbjogODE5MDk3NixcbiAgICBsZW1vbmNoaWZmb246IDE2Nzc1ODg1LFxuICAgIGxpZ2h0Ymx1ZTogMTEzOTMyNTQsXG4gICAgbGlnaHRjb3JhbDogMTU3NjE1MzYsXG4gICAgbGlnaHRjeWFuOiAxNDc0NTU5OSxcbiAgICBsaWdodGdvbGRlbnJvZHllbGxvdzogMTY0NDgyMTAsXG4gICAgbGlnaHRncmF5OiAxMzg4MjMyMyxcbiAgICBsaWdodGdyZWVuOiA5NDk4MjU2LFxuICAgIGxpZ2h0Z3JleTogMTM4ODIzMjMsXG4gICAgbGlnaHRwaW5rOiAxNjc1ODQ2NSxcbiAgICBsaWdodHNhbG1vbjogMTY3NTI3NjIsXG4gICAgbGlnaHRzZWFncmVlbjogMjE0Mjg5MCxcbiAgICBsaWdodHNreWJsdWU6IDg5MDAzNDYsXG4gICAgbGlnaHRzbGF0ZWdyYXk6IDc4MzM3NTMsXG4gICAgbGlnaHRzbGF0ZWdyZXk6IDc4MzM3NTMsXG4gICAgbGlnaHRzdGVlbGJsdWU6IDExNTg0NzM0LFxuICAgIGxpZ2h0eWVsbG93OiAxNjc3NzE4NCxcbiAgICBsaW1lOiA2NTI4MCxcbiAgICBsaW1lZ3JlZW46IDMzMjkzMzAsXG4gICAgbGluZW46IDE2NDQ1NjcwLFxuICAgIG1hZ2VudGE6IDE2NzExOTM1LFxuICAgIG1hcm9vbjogODM4ODYwOCxcbiAgICBtZWRpdW1hcXVhbWFyaW5lOiA2NzM3MzIyLFxuICAgIG1lZGl1bWJsdWU6IDIwNSxcbiAgICBtZWRpdW1vcmNoaWQ6IDEyMjExNjY3LFxuICAgIG1lZGl1bXB1cnBsZTogOTY2MjY4MyxcbiAgICBtZWRpdW1zZWFncmVlbjogMzk3ODA5NyxcbiAgICBtZWRpdW1zbGF0ZWJsdWU6IDgwODc3OTAsXG4gICAgbWVkaXVtc3ByaW5nZ3JlZW46IDY0MTU0LFxuICAgIG1lZGl1bXR1cnF1b2lzZTogNDc3MjMwMCxcbiAgICBtZWRpdW12aW9sZXRyZWQ6IDEzMDQ3MTczLFxuICAgIG1pZG5pZ2h0Ymx1ZTogMTY0NDkxMixcbiAgICBtaW50Y3JlYW06IDE2MTIxODUwLFxuICAgIG1pc3R5cm9zZTogMTY3NzAyNzMsXG4gICAgbW9jY2FzaW46IDE2NzcwMjI5LFxuICAgIG5hdmFqb3doaXRlOiAxNjc2ODY4NSxcbiAgICBuYXZ5OiAxMjgsXG4gICAgb2xkbGFjZTogMTY2NDM1NTgsXG4gICAgb2xpdmU6IDg0MjEzNzYsXG4gICAgb2xpdmVkcmFiOiA3MDQ4NzM5LFxuICAgIG9yYW5nZTogMTY3NTM5MjAsXG4gICAgb3JhbmdlcmVkOiAxNjcyOTM0NCxcbiAgICBvcmNoaWQ6IDE0MzE1NzM0LFxuICAgIHBhbGVnb2xkZW5yb2Q6IDE1NjU3MTMwLFxuICAgIHBhbGVncmVlbjogMTAwMjU4ODAsXG4gICAgcGFsZXR1cnF1b2lzZTogMTE1Mjk5NjYsXG4gICAgcGFsZXZpb2xldHJlZDogMTQzODEyMDMsXG4gICAgcGFwYXlhd2hpcDogMTY3NzMwNzcsXG4gICAgcGVhY2hwdWZmOiAxNjc2NzY3MyxcbiAgICBwZXJ1OiAxMzQ2ODk5MSxcbiAgICBwaW5rOiAxNjc2MTAzNSxcbiAgICBwbHVtOiAxNDUyNDYzNyxcbiAgICBwb3dkZXJibHVlOiAxMTU5MTkxMCxcbiAgICBwdXJwbGU6IDgzODg3MzYsXG4gICAgcmVkOiAxNjcxMTY4MCxcbiAgICByb3N5YnJvd246IDEyMzU3NTE5LFxuICAgIHJveWFsYmx1ZTogNDI4Njk0NSxcbiAgICBzYWRkbGVicm93bjogOTEyNzE4NyxcbiAgICBzYWxtb246IDE2NDE2ODgyLFxuICAgIHNhbmR5YnJvd246IDE2MDMyODY0LFxuICAgIHNlYWdyZWVuOiAzMDUwMzI3LFxuICAgIHNlYXNoZWxsOiAxNjc3NDYzOCxcbiAgICBzaWVubmE6IDEwNTA2Nzk3LFxuICAgIHNpbHZlcjogMTI2MzIyNTYsXG4gICAgc2t5Ymx1ZTogODkwMDMzMSxcbiAgICBzbGF0ZWJsdWU6IDY5NzAwNjEsXG4gICAgc2xhdGVncmF5OiA3MzcyOTQ0LFxuICAgIHNsYXRlZ3JleTogNzM3Mjk0NCxcbiAgICBzbm93OiAxNjc3NTkzMCxcbiAgICBzcHJpbmdncmVlbjogNjU0MDcsXG4gICAgc3RlZWxibHVlOiA0NjIwOTgwLFxuICAgIHRhbjogMTM4MDg3ODAsXG4gICAgdGVhbDogMzI4OTYsXG4gICAgdGhpc3RsZTogMTQyMDQ4ODgsXG4gICAgdG9tYXRvOiAxNjczNzA5NSxcbiAgICB0dXJxdW9pc2U6IDQyNTE4NTYsXG4gICAgdmlvbGV0OiAxNTYzMTA4NixcbiAgICB3aGVhdDogMTYxMTMzMzEsXG4gICAgd2hpdGU6IDE2Nzc3MjE1LFxuICAgIHdoaXRlc21va2U6IDE2MTE5Mjg1LFxuICAgIHllbGxvdzogMTY3NzY5NjAsXG4gICAgeWVsbG93Z3JlZW46IDEwMTQ1MDc0XG4gIH0pO1xuICBkM19yZ2JfbmFtZXMuZm9yRWFjaChmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgZDNfcmdiX25hbWVzLnNldChrZXksIGQzX3JnYk51bWJlcih2YWx1ZSkpO1xuICB9KTtcbiAgZnVuY3Rpb24gZDNfZnVuY3Rvcih2KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2ID09PSBcImZ1bmN0aW9uXCIgPyB2IDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdjtcbiAgICB9O1xuICB9XG4gIGQzLmZ1bmN0b3IgPSBkM19mdW5jdG9yO1xuICBmdW5jdGlvbiBkM19pZGVudGl0eShkKSB7XG4gICAgcmV0dXJuIGQ7XG4gIH1cbiAgZDMueGhyID0gZDNfeGhyVHlwZShkM19pZGVudGl0eSk7XG4gIGZ1bmN0aW9uIGQzX3hoclR5cGUocmVzcG9uc2UpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24odXJsLCBtaW1lVHlwZSwgY2FsbGJhY2spIHtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIHR5cGVvZiBtaW1lVHlwZSA9PT0gXCJmdW5jdGlvblwiKSBjYWxsYmFjayA9IG1pbWVUeXBlLCBcbiAgICAgIG1pbWVUeXBlID0gbnVsbDtcbiAgICAgIHJldHVybiBkM194aHIodXJsLCBtaW1lVHlwZSwgcmVzcG9uc2UsIGNhbGxiYWNrKTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGQzX3hocih1cmwsIG1pbWVUeXBlLCByZXNwb25zZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgeGhyID0ge30sIGRpc3BhdGNoID0gZDMuZGlzcGF0Y2goXCJwcm9ncmVzc1wiLCBcImxvYWRcIiwgXCJlcnJvclwiKSwgaGVhZGVycyA9IHt9LCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCksIHJlc3BvbnNlVHlwZSA9IG51bGw7XG4gICAgaWYgKGQzX3dpbmRvdy5YRG9tYWluUmVxdWVzdCAmJiAhKFwid2l0aENyZWRlbnRpYWxzXCIgaW4gcmVxdWVzdCkgJiYgL14oaHR0cChzKT86KT9cXC9cXC8vLnRlc3QodXJsKSkgcmVxdWVzdCA9IG5ldyBYRG9tYWluUmVxdWVzdCgpO1xuICAgIFwib25sb2FkXCIgaW4gcmVxdWVzdCA/IHJlcXVlc3Qub25sb2FkID0gcmVxdWVzdC5vbmVycm9yID0gcmVzcG9uZCA6IHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXF1ZXN0LnJlYWR5U3RhdGUgPiAzICYmIHJlc3BvbmQoKTtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJlc3BvbmQoKSB7XG4gICAgICB2YXIgc3RhdHVzID0gcmVxdWVzdC5zdGF0dXMsIHJlc3VsdDtcbiAgICAgIGlmICghc3RhdHVzICYmIHJlcXVlc3QucmVzcG9uc2VUZXh0IHx8IHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwIHx8IHN0YXR1cyA9PT0gMzA0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVzdWx0ID0gcmVzcG9uc2UuY2FsbCh4aHIsIHJlcXVlc3QpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgZGlzcGF0Y2guZXJyb3IuY2FsbCh4aHIsIGUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkaXNwYXRjaC5sb2FkLmNhbGwoeGhyLCByZXN1bHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGF0Y2guZXJyb3IuY2FsbCh4aHIsIHJlcXVlc3QpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXF1ZXN0Lm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgdmFyIG8gPSBkMy5ldmVudDtcbiAgICAgIGQzLmV2ZW50ID0gZXZlbnQ7XG4gICAgICB0cnkge1xuICAgICAgICBkaXNwYXRjaC5wcm9ncmVzcy5jYWxsKHhociwgcmVxdWVzdCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBkMy5ldmVudCA9IG87XG4gICAgICB9XG4gICAgfTtcbiAgICB4aHIuaGVhZGVyID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIG5hbWUgPSAobmFtZSArIFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHJldHVybiBoZWFkZXJzW25hbWVdO1xuICAgICAgaWYgKHZhbHVlID09IG51bGwpIGRlbGV0ZSBoZWFkZXJzW25hbWVdOyBlbHNlIGhlYWRlcnNbbmFtZV0gPSB2YWx1ZSArIFwiXCI7XG4gICAgICByZXR1cm4geGhyO1xuICAgIH07XG4gICAgeGhyLm1pbWVUeXBlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG1pbWVUeXBlO1xuICAgICAgbWltZVR5cGUgPSB2YWx1ZSA9PSBudWxsID8gbnVsbCA6IHZhbHVlICsgXCJcIjtcbiAgICAgIHJldHVybiB4aHI7XG4gICAgfTtcbiAgICB4aHIucmVzcG9uc2VUeXBlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHJlc3BvbnNlVHlwZTtcbiAgICAgIHJlc3BvbnNlVHlwZSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHhocjtcbiAgICB9O1xuICAgIHhoci5yZXNwb25zZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXNwb25zZSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHhocjtcbiAgICB9O1xuICAgIFsgXCJnZXRcIiwgXCJwb3N0XCIgXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgeGhyW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHhoci5zZW5kLmFwcGx5KHhociwgWyBtZXRob2QgXS5jb25jYXQoZDNfYXJyYXkoYXJndW1lbnRzKSkpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgICB4aHIuc2VuZCA9IGZ1bmN0aW9uKG1ldGhvZCwgZGF0YSwgY2FsbGJhY2spIHtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIHR5cGVvZiBkYXRhID09PSBcImZ1bmN0aW9uXCIpIGNhbGxiYWNrID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gICAgICByZXF1ZXN0Lm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuICAgICAgaWYgKG1pbWVUeXBlICE9IG51bGwgJiYgIShcImFjY2VwdFwiIGluIGhlYWRlcnMpKSBoZWFkZXJzW1wiYWNjZXB0XCJdID0gbWltZVR5cGUgKyBcIiwqLypcIjtcbiAgICAgIGlmIChyZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIpIGZvciAodmFyIG5hbWUgaW4gaGVhZGVycykgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIGhlYWRlcnNbbmFtZV0pO1xuICAgICAgaWYgKG1pbWVUeXBlICE9IG51bGwgJiYgcmVxdWVzdC5vdmVycmlkZU1pbWVUeXBlKSByZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUobWltZVR5cGUpO1xuICAgICAgaWYgKHJlc3BvbnNlVHlwZSAhPSBudWxsKSByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZTtcbiAgICAgIGlmIChjYWxsYmFjayAhPSBudWxsKSB4aHIub24oXCJlcnJvclwiLCBjYWxsYmFjaykub24oXCJsb2FkXCIsIGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVxdWVzdCk7XG4gICAgICB9KTtcbiAgICAgIHJlcXVlc3Quc2VuZChkYXRhID09IG51bGwgPyBudWxsIDogZGF0YSk7XG4gICAgICByZXR1cm4geGhyO1xuICAgIH07XG4gICAgeGhyLmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICByZXR1cm4geGhyO1xuICAgIH07XG4gICAgZDMucmViaW5kKHhociwgZGlzcGF0Y2gsIFwib25cIik7XG4gICAgcmV0dXJuIGNhbGxiYWNrID09IG51bGwgPyB4aHIgOiB4aHIuZ2V0KGQzX3hocl9maXhDYWxsYmFjayhjYWxsYmFjaykpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3hocl9maXhDYWxsYmFjayhjYWxsYmFjaykge1xuICAgIHJldHVybiBjYWxsYmFjay5sZW5ndGggPT09IDEgPyBmdW5jdGlvbihlcnJvciwgcmVxdWVzdCkge1xuICAgICAgY2FsbGJhY2soZXJyb3IgPT0gbnVsbCA/IHJlcXVlc3QgOiBudWxsKTtcbiAgICB9IDogY2FsbGJhY2s7XG4gIH1cbiAgZDMuZHN2ID0gZnVuY3Rpb24oZGVsaW1pdGVyLCBtaW1lVHlwZSkge1xuICAgIHZhciByZUZvcm1hdCA9IG5ldyBSZWdFeHAoJ1tcIicgKyBkZWxpbWl0ZXIgKyBcIlxcbl1cIiksIGRlbGltaXRlckNvZGUgPSBkZWxpbWl0ZXIuY2hhckNvZGVBdCgwKTtcbiAgICBmdW5jdGlvbiBkc3YodXJsLCByb3csIGNhbGxiYWNrKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIGNhbGxiYWNrID0gcm93LCByb3cgPSBudWxsO1xuICAgICAgdmFyIHhociA9IGQzLnhocih1cmwsIG1pbWVUeXBlLCBjYWxsYmFjayk7XG4gICAgICB4aHIucm93ID0gZnVuY3Rpb24oXykge1xuICAgICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IHhoci5yZXNwb25zZSgocm93ID0gXykgPT0gbnVsbCA/IHJlc3BvbnNlIDogdHlwZWRSZXNwb25zZShfKSkgOiByb3c7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHhoci5yb3cocm93KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVzcG9uc2UocmVxdWVzdCkge1xuICAgICAgcmV0dXJuIGRzdi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHR5cGVkUmVzcG9uc2UoZikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuIGRzdi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCwgZik7XG4gICAgICB9O1xuICAgIH1cbiAgICBkc3YucGFyc2UgPSBmdW5jdGlvbih0ZXh0LCBmKSB7XG4gICAgICB2YXIgbztcbiAgICAgIHJldHVybiBkc3YucGFyc2VSb3dzKHRleHQsIGZ1bmN0aW9uKHJvdywgaSkge1xuICAgICAgICBpZiAobykgcmV0dXJuIG8ocm93LCBpIC0gMSk7XG4gICAgICAgIHZhciBhID0gbmV3IEZ1bmN0aW9uKFwiZFwiLCBcInJldHVybiB7XCIgKyByb3cubWFwKGZ1bmN0aW9uKG5hbWUsIGkpIHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobmFtZSkgKyBcIjogZFtcIiArIGkgKyBcIl1cIjtcbiAgICAgICAgfSkuam9pbihcIixcIikgKyBcIn1cIik7XG4gICAgICAgIG8gPSBmID8gZnVuY3Rpb24ocm93LCBpKSB7XG4gICAgICAgICAgcmV0dXJuIGYoYShyb3cpLCBpKTtcbiAgICAgICAgfSA6IGE7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGRzdi5wYXJzZVJvd3MgPSBmdW5jdGlvbih0ZXh0LCBmKSB7XG4gICAgICB2YXIgRU9MID0ge30sIEVPRiA9IHt9LCByb3dzID0gW10sIE4gPSB0ZXh0Lmxlbmd0aCwgSSA9IDAsIG4gPSAwLCB0LCBlb2w7XG4gICAgICBmdW5jdGlvbiB0b2tlbigpIHtcbiAgICAgICAgaWYgKEkgPj0gTikgcmV0dXJuIEVPRjtcbiAgICAgICAgaWYgKGVvbCkgcmV0dXJuIGVvbCA9IGZhbHNlLCBFT0w7XG4gICAgICAgIHZhciBqID0gSTtcbiAgICAgICAgaWYgKHRleHQuY2hhckNvZGVBdChqKSA9PT0gMzQpIHtcbiAgICAgICAgICB2YXIgaSA9IGo7XG4gICAgICAgICAgd2hpbGUgKGkrKyA8IE4pIHtcbiAgICAgICAgICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQoaSkgPT09IDM0KSB7XG4gICAgICAgICAgICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQoaSArIDEpICE9PSAzNCkgYnJlYWs7XG4gICAgICAgICAgICAgICsraTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgSSA9IGkgKyAyO1xuICAgICAgICAgIHZhciBjID0gdGV4dC5jaGFyQ29kZUF0KGkgKyAxKTtcbiAgICAgICAgICBpZiAoYyA9PT0gMTMpIHtcbiAgICAgICAgICAgIGVvbCA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGV4dC5jaGFyQ29kZUF0KGkgKyAyKSA9PT0gMTApICsrSTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09IDEwKSB7XG4gICAgICAgICAgICBlb2wgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGV4dC5zdWJzdHJpbmcoaiArIDEsIGkpLnJlcGxhY2UoL1wiXCIvZywgJ1wiJyk7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKEkgPCBOKSB7XG4gICAgICAgICAgdmFyIGMgPSB0ZXh0LmNoYXJDb2RlQXQoSSsrKSwgayA9IDE7XG4gICAgICAgICAgaWYgKGMgPT09IDEwKSBlb2wgPSB0cnVlOyBlbHNlIGlmIChjID09PSAxMykge1xuICAgICAgICAgICAgZW9sID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQoSSkgPT09IDEwKSArK0ksICsraztcbiAgICAgICAgICB9IGVsc2UgaWYgKGMgIT09IGRlbGltaXRlckNvZGUpIGNvbnRpbnVlO1xuICAgICAgICAgIHJldHVybiB0ZXh0LnN1YnN0cmluZyhqLCBJIC0gayk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRleHQuc3Vic3RyaW5nKGopO1xuICAgICAgfVxuICAgICAgd2hpbGUgKCh0ID0gdG9rZW4oKSkgIT09IEVPRikge1xuICAgICAgICB2YXIgYSA9IFtdO1xuICAgICAgICB3aGlsZSAodCAhPT0gRU9MICYmIHQgIT09IEVPRikge1xuICAgICAgICAgIGEucHVzaCh0KTtcbiAgICAgICAgICB0ID0gdG9rZW4oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZiAmJiAhKGEgPSBmKGEsIG4rKykpKSBjb250aW51ZTtcbiAgICAgICAgcm93cy5wdXNoKGEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJvd3M7XG4gICAgfTtcbiAgICBkc3YuZm9ybWF0ID0gZnVuY3Rpb24ocm93cykge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocm93c1swXSkpIHJldHVybiBkc3YuZm9ybWF0Um93cyhyb3dzKTtcbiAgICAgIHZhciBmaWVsZFNldCA9IG5ldyBkM19TZXQoKSwgZmllbGRzID0gW107XG4gICAgICByb3dzLmZvckVhY2goZnVuY3Rpb24ocm93KSB7XG4gICAgICAgIGZvciAodmFyIGZpZWxkIGluIHJvdykge1xuICAgICAgICAgIGlmICghZmllbGRTZXQuaGFzKGZpZWxkKSkge1xuICAgICAgICAgICAgZmllbGRzLnB1c2goZmllbGRTZXQuYWRkKGZpZWxkKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBbIGZpZWxkcy5tYXAoZm9ybWF0VmFsdWUpLmpvaW4oZGVsaW1pdGVyKSBdLmNvbmNhdChyb3dzLm1hcChmdW5jdGlvbihyb3cpIHtcbiAgICAgICAgcmV0dXJuIGZpZWxkcy5tYXAoZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgICByZXR1cm4gZm9ybWF0VmFsdWUocm93W2ZpZWxkXSk7XG4gICAgICAgIH0pLmpvaW4oZGVsaW1pdGVyKTtcbiAgICAgIH0pKS5qb2luKFwiXFxuXCIpO1xuICAgIH07XG4gICAgZHN2LmZvcm1hdFJvd3MgPSBmdW5jdGlvbihyb3dzKSB7XG4gICAgICByZXR1cm4gcm93cy5tYXAoZm9ybWF0Um93KS5qb2luKFwiXFxuXCIpO1xuICAgIH07XG4gICAgZnVuY3Rpb24gZm9ybWF0Um93KHJvdykge1xuICAgICAgcmV0dXJuIHJvdy5tYXAoZm9ybWF0VmFsdWUpLmpvaW4oZGVsaW1pdGVyKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZm9ybWF0VmFsdWUodGV4dCkge1xuICAgICAgcmV0dXJuIHJlRm9ybWF0LnRlc3QodGV4dCkgPyAnXCInICsgdGV4dC5yZXBsYWNlKC9cXFwiL2csICdcIlwiJykgKyAnXCInIDogdGV4dDtcbiAgICB9XG4gICAgcmV0dXJuIGRzdjtcbiAgfTtcbiAgZDMuY3N2ID0gZDMuZHN2KFwiLFwiLCBcInRleHQvY3N2XCIpO1xuICBkMy50c3YgPSBkMy5kc3YoXCJcdFwiLCBcInRleHQvdGFiLXNlcGFyYXRlZC12YWx1ZXNcIik7XG4gIHZhciBkM190aW1lcl9xdWV1ZUhlYWQsIGQzX3RpbWVyX3F1ZXVlVGFpbCwgZDNfdGltZXJfaW50ZXJ2YWwsIGQzX3RpbWVyX3RpbWVvdXQsIGQzX3RpbWVyX2FjdGl2ZSwgZDNfdGltZXJfZnJhbWUgPSBkM193aW5kb3dbZDNfdmVuZG9yU3ltYm9sKGQzX3dpbmRvdywgXCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIildIHx8IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgc2V0VGltZW91dChjYWxsYmFjaywgMTcpO1xuICB9O1xuICBkMy50aW1lciA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBkZWxheSwgdGhlbikge1xuICAgIHZhciBuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBpZiAobiA8IDIpIGRlbGF5ID0gMDtcbiAgICBpZiAobiA8IDMpIHRoZW4gPSBEYXRlLm5vdygpO1xuICAgIHZhciB0aW1lID0gdGhlbiArIGRlbGF5LCB0aW1lciA9IHtcbiAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgIHRpbWU6IHRpbWUsXG4gICAgICBuZXh0OiBudWxsXG4gICAgfTtcbiAgICBpZiAoZDNfdGltZXJfcXVldWVUYWlsKSBkM190aW1lcl9xdWV1ZVRhaWwubmV4dCA9IHRpbWVyOyBlbHNlIGQzX3RpbWVyX3F1ZXVlSGVhZCA9IHRpbWVyO1xuICAgIGQzX3RpbWVyX3F1ZXVlVGFpbCA9IHRpbWVyO1xuICAgIGlmICghZDNfdGltZXJfaW50ZXJ2YWwpIHtcbiAgICAgIGQzX3RpbWVyX3RpbWVvdXQgPSBjbGVhclRpbWVvdXQoZDNfdGltZXJfdGltZW91dCk7XG4gICAgICBkM190aW1lcl9pbnRlcnZhbCA9IDE7XG4gICAgICBkM190aW1lcl9mcmFtZShkM190aW1lcl9zdGVwKTtcbiAgICB9XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3RpbWVyX3N0ZXAoKSB7XG4gICAgdmFyIG5vdyA9IGQzX3RpbWVyX21hcmsoKSwgZGVsYXkgPSBkM190aW1lcl9zd2VlcCgpIC0gbm93O1xuICAgIGlmIChkZWxheSA+IDI0KSB7XG4gICAgICBpZiAoaXNGaW5pdGUoZGVsYXkpKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChkM190aW1lcl90aW1lb3V0KTtcbiAgICAgICAgZDNfdGltZXJfdGltZW91dCA9IHNldFRpbWVvdXQoZDNfdGltZXJfc3RlcCwgZGVsYXkpO1xuICAgICAgfVxuICAgICAgZDNfdGltZXJfaW50ZXJ2YWwgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBkM190aW1lcl9pbnRlcnZhbCA9IDE7XG4gICAgICBkM190aW1lcl9mcmFtZShkM190aW1lcl9zdGVwKTtcbiAgICB9XG4gIH1cbiAgZDMudGltZXIuZmx1c2ggPSBmdW5jdGlvbigpIHtcbiAgICBkM190aW1lcl9tYXJrKCk7XG4gICAgZDNfdGltZXJfc3dlZXAoKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfdGltZXJfcmVwbGFjZShjYWxsYmFjaywgZGVsYXksIHRoZW4pIHtcbiAgICB2YXIgbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKG4gPCAyKSBkZWxheSA9IDA7XG4gICAgaWYgKG4gPCAzKSB0aGVuID0gRGF0ZS5ub3coKTtcbiAgICBkM190aW1lcl9hY3RpdmUuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICBkM190aW1lcl9hY3RpdmUudGltZSA9IHRoZW4gKyBkZWxheTtcbiAgfVxuICBmdW5jdGlvbiBkM190aW1lcl9tYXJrKCkge1xuICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgIGQzX3RpbWVyX2FjdGl2ZSA9IGQzX3RpbWVyX3F1ZXVlSGVhZDtcbiAgICB3aGlsZSAoZDNfdGltZXJfYWN0aXZlKSB7XG4gICAgICBpZiAobm93ID49IGQzX3RpbWVyX2FjdGl2ZS50aW1lKSBkM190aW1lcl9hY3RpdmUuZmx1c2ggPSBkM190aW1lcl9hY3RpdmUuY2FsbGJhY2sobm93IC0gZDNfdGltZXJfYWN0aXZlLnRpbWUpO1xuICAgICAgZDNfdGltZXJfYWN0aXZlID0gZDNfdGltZXJfYWN0aXZlLm5leHQ7XG4gICAgfVxuICAgIHJldHVybiBub3c7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZXJfc3dlZXAoKSB7XG4gICAgdmFyIHQwLCB0MSA9IGQzX3RpbWVyX3F1ZXVlSGVhZCwgdGltZSA9IEluZmluaXR5O1xuICAgIHdoaWxlICh0MSkge1xuICAgICAgaWYgKHQxLmZsdXNoKSB7XG4gICAgICAgIHQxID0gdDAgPyB0MC5uZXh0ID0gdDEubmV4dCA6IGQzX3RpbWVyX3F1ZXVlSGVhZCA9IHQxLm5leHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodDEudGltZSA8IHRpbWUpIHRpbWUgPSB0MS50aW1lO1xuICAgICAgICB0MSA9ICh0MCA9IHQxKS5uZXh0O1xuICAgICAgfVxuICAgIH1cbiAgICBkM190aW1lcl9xdWV1ZVRhaWwgPSB0MDtcbiAgICByZXR1cm4gdGltZTtcbiAgfVxuICB2YXIgZDNfZm9ybWF0X2RlY2ltYWxQb2ludCA9IFwiLlwiLCBkM19mb3JtYXRfdGhvdXNhbmRzU2VwYXJhdG9yID0gXCIsXCIsIGQzX2Zvcm1hdF9ncm91cGluZyA9IFsgMywgMyBdLCBkM19mb3JtYXRfY3VycmVuY3lTeW1ib2wgPSBcIiRcIjtcbiAgdmFyIGQzX2Zvcm1hdFByZWZpeGVzID0gWyBcInlcIiwgXCJ6XCIsIFwiYVwiLCBcImZcIiwgXCJwXCIsIFwiblwiLCBcIsK1XCIsIFwibVwiLCBcIlwiLCBcImtcIiwgXCJNXCIsIFwiR1wiLCBcIlRcIiwgXCJQXCIsIFwiRVwiLCBcIlpcIiwgXCJZXCIgXS5tYXAoZDNfZm9ybWF0UHJlZml4KTtcbiAgZDMuZm9ybWF0UHJlZml4ID0gZnVuY3Rpb24odmFsdWUsIHByZWNpc2lvbikge1xuICAgIHZhciBpID0gMDtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSA8IDApIHZhbHVlICo9IC0xO1xuICAgICAgaWYgKHByZWNpc2lvbikgdmFsdWUgPSBkMy5yb3VuZCh2YWx1ZSwgZDNfZm9ybWF0X3ByZWNpc2lvbih2YWx1ZSwgcHJlY2lzaW9uKSk7XG4gICAgICBpID0gMSArIE1hdGguZmxvb3IoMWUtMTIgKyBNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMTApO1xuICAgICAgaSA9IE1hdGgubWF4KC0yNCwgTWF0aC5taW4oMjQsIE1hdGguZmxvb3IoKGkgPD0gMCA/IGkgKyAxIDogaSAtIDEpIC8gMykgKiAzKSk7XG4gICAgfVxuICAgIHJldHVybiBkM19mb3JtYXRQcmVmaXhlc1s4ICsgaSAvIDNdO1xuICB9O1xuICBmdW5jdGlvbiBkM19mb3JtYXRQcmVmaXgoZCwgaSkge1xuICAgIHZhciBrID0gTWF0aC5wb3coMTAsIE1hdGguYWJzKDggLSBpKSAqIDMpO1xuICAgIHJldHVybiB7XG4gICAgICBzY2FsZTogaSA+IDggPyBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkIC8gaztcbiAgICAgIH0gOiBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkICogaztcbiAgICAgIH0sXG4gICAgICBzeW1ib2w6IGRcbiAgICB9O1xuICB9XG4gIGQzLnJvdW5kID0gZnVuY3Rpb24oeCwgbikge1xuICAgIHJldHVybiBuID8gTWF0aC5yb3VuZCh4ICogKG4gPSBNYXRoLnBvdygxMCwgbikpKSAvIG4gOiBNYXRoLnJvdW5kKHgpO1xuICB9O1xuICBkMy5mb3JtYXQgPSBmdW5jdGlvbihzcGVjaWZpZXIpIHtcbiAgICB2YXIgbWF0Y2ggPSBkM19mb3JtYXRfcmUuZXhlYyhzcGVjaWZpZXIpLCBmaWxsID0gbWF0Y2hbMV0gfHwgXCIgXCIsIGFsaWduID0gbWF0Y2hbMl0gfHwgXCI+XCIsIHNpZ24gPSBtYXRjaFszXSB8fCBcIlwiLCBzeW1ib2wgPSBtYXRjaFs0XSB8fCBcIlwiLCB6ZmlsbCA9IG1hdGNoWzVdLCB3aWR0aCA9ICttYXRjaFs2XSwgY29tbWEgPSBtYXRjaFs3XSwgcHJlY2lzaW9uID0gbWF0Y2hbOF0sIHR5cGUgPSBtYXRjaFs5XSwgc2NhbGUgPSAxLCBzdWZmaXggPSBcIlwiLCBpbnRlZ2VyID0gZmFsc2U7XG4gICAgaWYgKHByZWNpc2lvbikgcHJlY2lzaW9uID0gK3ByZWNpc2lvbi5zdWJzdHJpbmcoMSk7XG4gICAgaWYgKHpmaWxsIHx8IGZpbGwgPT09IFwiMFwiICYmIGFsaWduID09PSBcIj1cIikge1xuICAgICAgemZpbGwgPSBmaWxsID0gXCIwXCI7XG4gICAgICBhbGlnbiA9IFwiPVwiO1xuICAgICAgaWYgKGNvbW1hKSB3aWR0aCAtPSBNYXRoLmZsb29yKCh3aWR0aCAtIDEpIC8gNCk7XG4gICAgfVxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICBjYXNlIFwiblwiOlxuICAgICAgY29tbWEgPSB0cnVlO1xuICAgICAgdHlwZSA9IFwiZ1wiO1xuICAgICAgYnJlYWs7XG5cbiAgICAgY2FzZSBcIiVcIjpcbiAgICAgIHNjYWxlID0gMTAwO1xuICAgICAgc3VmZml4ID0gXCIlXCI7XG4gICAgICB0eXBlID0gXCJmXCI7XG4gICAgICBicmVhaztcblxuICAgICBjYXNlIFwicFwiOlxuICAgICAgc2NhbGUgPSAxMDA7XG4gICAgICBzdWZmaXggPSBcIiVcIjtcbiAgICAgIHR5cGUgPSBcInJcIjtcbiAgICAgIGJyZWFrO1xuXG4gICAgIGNhc2UgXCJiXCI6XG4gICAgIGNhc2UgXCJvXCI6XG4gICAgIGNhc2UgXCJ4XCI6XG4gICAgIGNhc2UgXCJYXCI6XG4gICAgICBpZiAoc3ltYm9sID09PSBcIiNcIikgc3ltYm9sID0gXCIwXCIgKyB0eXBlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgY2FzZSBcImNcIjpcbiAgICAgY2FzZSBcImRcIjpcbiAgICAgIGludGVnZXIgPSB0cnVlO1xuICAgICAgcHJlY2lzaW9uID0gMDtcbiAgICAgIGJyZWFrO1xuXG4gICAgIGNhc2UgXCJzXCI6XG4gICAgICBzY2FsZSA9IC0xO1xuICAgICAgdHlwZSA9IFwiclwiO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChzeW1ib2wgPT09IFwiI1wiKSBzeW1ib2wgPSBcIlwiOyBlbHNlIGlmIChzeW1ib2wgPT09IFwiJFwiKSBzeW1ib2wgPSBkM19mb3JtYXRfY3VycmVuY3lTeW1ib2w7XG4gICAgaWYgKHR5cGUgPT0gXCJyXCIgJiYgIXByZWNpc2lvbikgdHlwZSA9IFwiZ1wiO1xuICAgIGlmIChwcmVjaXNpb24gIT0gbnVsbCkge1xuICAgICAgaWYgKHR5cGUgPT0gXCJnXCIpIHByZWNpc2lvbiA9IE1hdGgubWF4KDEsIE1hdGgubWluKDIxLCBwcmVjaXNpb24pKTsgZWxzZSBpZiAodHlwZSA9PSBcImVcIiB8fCB0eXBlID09IFwiZlwiKSBwcmVjaXNpb24gPSBNYXRoLm1heCgwLCBNYXRoLm1pbigyMCwgcHJlY2lzaW9uKSk7XG4gICAgfVxuICAgIHR5cGUgPSBkM19mb3JtYXRfdHlwZXMuZ2V0KHR5cGUpIHx8IGQzX2Zvcm1hdF90eXBlRGVmYXVsdDtcbiAgICB2YXIgemNvbW1hID0gemZpbGwgJiYgY29tbWE7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBpZiAoaW50ZWdlciAmJiB2YWx1ZSAlIDEpIHJldHVybiBcIlwiO1xuICAgICAgdmFyIG5lZ2F0aXZlID0gdmFsdWUgPCAwIHx8IHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDAgPyAodmFsdWUgPSAtdmFsdWUsIFwiLVwiKSA6IHNpZ247XG4gICAgICBpZiAoc2NhbGUgPCAwKSB7XG4gICAgICAgIHZhciBwcmVmaXggPSBkMy5mb3JtYXRQcmVmaXgodmFsdWUsIHByZWNpc2lvbik7XG4gICAgICAgIHZhbHVlID0gcHJlZml4LnNjYWxlKHZhbHVlKTtcbiAgICAgICAgc3VmZml4ID0gcHJlZml4LnN5bWJvbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlICo9IHNjYWxlO1xuICAgICAgfVxuICAgICAgdmFsdWUgPSB0eXBlKHZhbHVlLCBwcmVjaXNpb24pO1xuICAgICAgdmFyIGkgPSB2YWx1ZS5sYXN0SW5kZXhPZihcIi5cIiksIGJlZm9yZSA9IGkgPCAwID8gdmFsdWUgOiB2YWx1ZS5zdWJzdHJpbmcoMCwgaSksIGFmdGVyID0gaSA8IDAgPyBcIlwiIDogZDNfZm9ybWF0X2RlY2ltYWxQb2ludCArIHZhbHVlLnN1YnN0cmluZyhpICsgMSk7XG4gICAgICBpZiAoIXpmaWxsICYmIGNvbW1hKSBiZWZvcmUgPSBkM19mb3JtYXRfZ3JvdXAoYmVmb3JlKTtcbiAgICAgIHZhciBsZW5ndGggPSBzeW1ib2wubGVuZ3RoICsgYmVmb3JlLmxlbmd0aCArIGFmdGVyLmxlbmd0aCArICh6Y29tbWEgPyAwIDogbmVnYXRpdmUubGVuZ3RoKSwgcGFkZGluZyA9IGxlbmd0aCA8IHdpZHRoID8gbmV3IEFycmF5KGxlbmd0aCA9IHdpZHRoIC0gbGVuZ3RoICsgMSkuam9pbihmaWxsKSA6IFwiXCI7XG4gICAgICBpZiAoemNvbW1hKSBiZWZvcmUgPSBkM19mb3JtYXRfZ3JvdXAocGFkZGluZyArIGJlZm9yZSk7XG4gICAgICBuZWdhdGl2ZSArPSBzeW1ib2w7XG4gICAgICB2YWx1ZSA9IGJlZm9yZSArIGFmdGVyO1xuICAgICAgcmV0dXJuIChhbGlnbiA9PT0gXCI8XCIgPyBuZWdhdGl2ZSArIHZhbHVlICsgcGFkZGluZyA6IGFsaWduID09PSBcIj5cIiA/IHBhZGRpbmcgKyBuZWdhdGl2ZSArIHZhbHVlIDogYWxpZ24gPT09IFwiXlwiID8gcGFkZGluZy5zdWJzdHJpbmcoMCwgbGVuZ3RoID4+PSAxKSArIG5lZ2F0aXZlICsgdmFsdWUgKyBwYWRkaW5nLnN1YnN0cmluZyhsZW5ndGgpIDogbmVnYXRpdmUgKyAoemNvbW1hID8gdmFsdWUgOiBwYWRkaW5nICsgdmFsdWUpKSArIHN1ZmZpeDtcbiAgICB9O1xuICB9O1xuICB2YXIgZDNfZm9ybWF0X3JlID0gLyg/OihbXntdKT8oWzw+PV5dKSk/KFsrXFwtIF0pPyhbJCNdKT8oMCk/KFxcZCspPygsKT8oXFwuLT9cXGQrKT8oW2EteiVdKT8vaTtcbiAgdmFyIGQzX2Zvcm1hdF90eXBlcyA9IGQzLm1hcCh7XG4gICAgYjogZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHgudG9TdHJpbmcoMik7XG4gICAgfSxcbiAgICBjOiBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSh4KTtcbiAgICB9LFxuICAgIG86IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB4LnRvU3RyaW5nKDgpO1xuICAgIH0sXG4gICAgeDogZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHgudG9TdHJpbmcoMTYpO1xuICAgIH0sXG4gICAgWDogZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHgudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG4gICAgfSxcbiAgICBnOiBmdW5jdGlvbih4LCBwKSB7XG4gICAgICByZXR1cm4geC50b1ByZWNpc2lvbihwKTtcbiAgICB9LFxuICAgIGU6IGZ1bmN0aW9uKHgsIHApIHtcbiAgICAgIHJldHVybiB4LnRvRXhwb25lbnRpYWwocCk7XG4gICAgfSxcbiAgICBmOiBmdW5jdGlvbih4LCBwKSB7XG4gICAgICByZXR1cm4geC50b0ZpeGVkKHApO1xuICAgIH0sXG4gICAgcjogZnVuY3Rpb24oeCwgcCkge1xuICAgICAgcmV0dXJuICh4ID0gZDMucm91bmQoeCwgZDNfZm9ybWF0X3ByZWNpc2lvbih4LCBwKSkpLnRvRml4ZWQoTWF0aC5tYXgoMCwgTWF0aC5taW4oMjAsIGQzX2Zvcm1hdF9wcmVjaXNpb24oeCAqICgxICsgMWUtMTUpLCBwKSkpKTtcbiAgICB9XG4gIH0pO1xuICBmdW5jdGlvbiBkM19mb3JtYXRfcHJlY2lzaW9uKHgsIHApIHtcbiAgICByZXR1cm4gcCAtICh4ID8gTWF0aC5jZWlsKE1hdGgubG9nKHgpIC8gTWF0aC5MTjEwKSA6IDEpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2Zvcm1hdF90eXBlRGVmYXVsdCh4KSB7XG4gICAgcmV0dXJuIHggKyBcIlwiO1xuICB9XG4gIHZhciBkM19mb3JtYXRfZ3JvdXAgPSBkM19pZGVudGl0eTtcbiAgaWYgKGQzX2Zvcm1hdF9ncm91cGluZykge1xuICAgIHZhciBkM19mb3JtYXRfZ3JvdXBpbmdMZW5ndGggPSBkM19mb3JtYXRfZ3JvdXBpbmcubGVuZ3RoO1xuICAgIGQzX2Zvcm1hdF9ncm91cCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgaSA9IHZhbHVlLmxlbmd0aCwgdCA9IFtdLCBqID0gMCwgZyA9IGQzX2Zvcm1hdF9ncm91cGluZ1swXTtcbiAgICAgIHdoaWxlIChpID4gMCAmJiBnID4gMCkge1xuICAgICAgICB0LnB1c2godmFsdWUuc3Vic3RyaW5nKGkgLT0gZywgaSArIGcpKTtcbiAgICAgICAgZyA9IGQzX2Zvcm1hdF9ncm91cGluZ1tqID0gKGogKyAxKSAlIGQzX2Zvcm1hdF9ncm91cGluZ0xlbmd0aF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdC5yZXZlcnNlKCkuam9pbihkM19mb3JtYXRfdGhvdXNhbmRzU2VwYXJhdG9yKTtcbiAgICB9O1xuICB9XG4gIGQzLmdlbyA9IHt9O1xuICBmdW5jdGlvbiBkM19hZGRlcigpIHt9XG4gIGQzX2FkZGVyLnByb3RvdHlwZSA9IHtcbiAgICBzOiAwLFxuICAgIHQ6IDAsXG4gICAgYWRkOiBmdW5jdGlvbih5KSB7XG4gICAgICBkM19hZGRlclN1bSh5LCB0aGlzLnQsIGQzX2FkZGVyVGVtcCk7XG4gICAgICBkM19hZGRlclN1bShkM19hZGRlclRlbXAucywgdGhpcy5zLCB0aGlzKTtcbiAgICAgIGlmICh0aGlzLnMpIHRoaXMudCArPSBkM19hZGRlclRlbXAudDsgZWxzZSB0aGlzLnMgPSBkM19hZGRlclRlbXAudDtcbiAgICB9LFxuICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMucyA9IHRoaXMudCA9IDA7XG4gICAgfSxcbiAgICB2YWx1ZU9mOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnM7XG4gICAgfVxuICB9O1xuICB2YXIgZDNfYWRkZXJUZW1wID0gbmV3IGQzX2FkZGVyKCk7XG4gIGZ1bmN0aW9uIGQzX2FkZGVyU3VtKGEsIGIsIG8pIHtcbiAgICB2YXIgeCA9IG8ucyA9IGEgKyBiLCBidiA9IHggLSBhLCBhdiA9IHggLSBidjtcbiAgICBvLnQgPSBhIC0gYXYgKyAoYiAtIGJ2KTtcbiAgfVxuICBkMy5nZW8uc3RyZWFtID0gZnVuY3Rpb24ob2JqZWN0LCBsaXN0ZW5lcikge1xuICAgIGlmIChvYmplY3QgJiYgZDNfZ2VvX3N0cmVhbU9iamVjdFR5cGUuaGFzT3duUHJvcGVydHkob2JqZWN0LnR5cGUpKSB7XG4gICAgICBkM19nZW9fc3RyZWFtT2JqZWN0VHlwZVtvYmplY3QudHlwZV0ob2JqZWN0LCBsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGQzX2dlb19zdHJlYW1HZW9tZXRyeShvYmplY3QsIGxpc3RlbmVyKTtcbiAgICB9XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2dlb19zdHJlYW1HZW9tZXRyeShnZW9tZXRyeSwgbGlzdGVuZXIpIHtcbiAgICBpZiAoZ2VvbWV0cnkgJiYgZDNfZ2VvX3N0cmVhbUdlb21ldHJ5VHlwZS5oYXNPd25Qcm9wZXJ0eShnZW9tZXRyeS50eXBlKSkge1xuICAgICAgZDNfZ2VvX3N0cmVhbUdlb21ldHJ5VHlwZVtnZW9tZXRyeS50eXBlXShnZW9tZXRyeSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgfVxuICB2YXIgZDNfZ2VvX3N0cmVhbU9iamVjdFR5cGUgPSB7XG4gICAgRmVhdHVyZTogZnVuY3Rpb24oZmVhdHVyZSwgbGlzdGVuZXIpIHtcbiAgICAgIGQzX2dlb19zdHJlYW1HZW9tZXRyeShmZWF0dXJlLmdlb21ldHJ5LCBsaXN0ZW5lcik7XG4gICAgfSxcbiAgICBGZWF0dXJlQ29sbGVjdGlvbjogZnVuY3Rpb24ob2JqZWN0LCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGZlYXR1cmVzID0gb2JqZWN0LmZlYXR1cmVzLCBpID0gLTEsIG4gPSBmZWF0dXJlcy5sZW5ndGg7XG4gICAgICB3aGlsZSAoKytpIDwgbikgZDNfZ2VvX3N0cmVhbUdlb21ldHJ5KGZlYXR1cmVzW2ldLmdlb21ldHJ5LCBsaXN0ZW5lcik7XG4gICAgfVxuICB9O1xuICB2YXIgZDNfZ2VvX3N0cmVhbUdlb21ldHJ5VHlwZSA9IHtcbiAgICBTcGhlcmU6IGZ1bmN0aW9uKG9iamVjdCwgbGlzdGVuZXIpIHtcbiAgICAgIGxpc3RlbmVyLnNwaGVyZSgpO1xuICAgIH0sXG4gICAgUG9pbnQ6IGZ1bmN0aW9uKG9iamVjdCwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBjb29yZGluYXRlID0gb2JqZWN0LmNvb3JkaW5hdGVzO1xuICAgICAgbGlzdGVuZXIucG9pbnQoY29vcmRpbmF0ZVswXSwgY29vcmRpbmF0ZVsxXSk7XG4gICAgfSxcbiAgICBNdWx0aVBvaW50OiBmdW5jdGlvbihvYmplY3QsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgY29vcmRpbmF0ZXMgPSBvYmplY3QuY29vcmRpbmF0ZXMsIGkgPSAtMSwgbiA9IGNvb3JkaW5hdGVzLmxlbmd0aCwgY29vcmRpbmF0ZTtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBjb29yZGluYXRlID0gY29vcmRpbmF0ZXNbaV0sIGxpc3RlbmVyLnBvaW50KGNvb3JkaW5hdGVbMF0sIGNvb3JkaW5hdGVbMV0pO1xuICAgIH0sXG4gICAgTGluZVN0cmluZzogZnVuY3Rpb24ob2JqZWN0LCBsaXN0ZW5lcikge1xuICAgICAgZDNfZ2VvX3N0cmVhbUxpbmUob2JqZWN0LmNvb3JkaW5hdGVzLCBsaXN0ZW5lciwgMCk7XG4gICAgfSxcbiAgICBNdWx0aUxpbmVTdHJpbmc6IGZ1bmN0aW9uKG9iamVjdCwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBjb29yZGluYXRlcyA9IG9iamVjdC5jb29yZGluYXRlcywgaSA9IC0xLCBuID0gY29vcmRpbmF0ZXMubGVuZ3RoO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIGQzX2dlb19zdHJlYW1MaW5lKGNvb3JkaW5hdGVzW2ldLCBsaXN0ZW5lciwgMCk7XG4gICAgfSxcbiAgICBQb2x5Z29uOiBmdW5jdGlvbihvYmplY3QsIGxpc3RlbmVyKSB7XG4gICAgICBkM19nZW9fc3RyZWFtUG9seWdvbihvYmplY3QuY29vcmRpbmF0ZXMsIGxpc3RlbmVyKTtcbiAgICB9LFxuICAgIE11bHRpUG9seWdvbjogZnVuY3Rpb24ob2JqZWN0LCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGNvb3JkaW5hdGVzID0gb2JqZWN0LmNvb3JkaW5hdGVzLCBpID0gLTEsIG4gPSBjb29yZGluYXRlcy5sZW5ndGg7XG4gICAgICB3aGlsZSAoKytpIDwgbikgZDNfZ2VvX3N0cmVhbVBvbHlnb24oY29vcmRpbmF0ZXNbaV0sIGxpc3RlbmVyKTtcbiAgICB9LFxuICAgIEdlb21ldHJ5Q29sbGVjdGlvbjogZnVuY3Rpb24ob2JqZWN0LCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGdlb21ldHJpZXMgPSBvYmplY3QuZ2VvbWV0cmllcywgaSA9IC0xLCBuID0gZ2VvbWV0cmllcy5sZW5ndGg7XG4gICAgICB3aGlsZSAoKytpIDwgbikgZDNfZ2VvX3N0cmVhbUdlb21ldHJ5KGdlb21ldHJpZXNbaV0sIGxpc3RlbmVyKTtcbiAgICB9XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2dlb19zdHJlYW1MaW5lKGNvb3JkaW5hdGVzLCBsaXN0ZW5lciwgY2xvc2VkKSB7XG4gICAgdmFyIGkgPSAtMSwgbiA9IGNvb3JkaW5hdGVzLmxlbmd0aCAtIGNsb3NlZCwgY29vcmRpbmF0ZTtcbiAgICBsaXN0ZW5lci5saW5lU3RhcnQoKTtcbiAgICB3aGlsZSAoKytpIDwgbikgY29vcmRpbmF0ZSA9IGNvb3JkaW5hdGVzW2ldLCBsaXN0ZW5lci5wb2ludChjb29yZGluYXRlWzBdLCBjb29yZGluYXRlWzFdKTtcbiAgICBsaXN0ZW5lci5saW5lRW5kKCk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX3N0cmVhbVBvbHlnb24oY29vcmRpbmF0ZXMsIGxpc3RlbmVyKSB7XG4gICAgdmFyIGkgPSAtMSwgbiA9IGNvb3JkaW5hdGVzLmxlbmd0aDtcbiAgICBsaXN0ZW5lci5wb2x5Z29uU3RhcnQoKTtcbiAgICB3aGlsZSAoKytpIDwgbikgZDNfZ2VvX3N0cmVhbUxpbmUoY29vcmRpbmF0ZXNbaV0sIGxpc3RlbmVyLCAxKTtcbiAgICBsaXN0ZW5lci5wb2x5Z29uRW5kKCk7XG4gIH1cbiAgZDMuZ2VvLmFyZWEgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICBkM19nZW9fYXJlYVN1bSA9IDA7XG4gICAgZDMuZ2VvLnN0cmVhbShvYmplY3QsIGQzX2dlb19hcmVhKTtcbiAgICByZXR1cm4gZDNfZ2VvX2FyZWFTdW07XG4gIH07XG4gIHZhciBkM19nZW9fYXJlYVN1bSwgZDNfZ2VvX2FyZWFSaW5nU3VtID0gbmV3IGQzX2FkZGVyKCk7XG4gIHZhciBkM19nZW9fYXJlYSA9IHtcbiAgICBzcGhlcmU6IGZ1bmN0aW9uKCkge1xuICAgICAgZDNfZ2VvX2FyZWFTdW0gKz0gNCAqIM+AO1xuICAgIH0sXG4gICAgcG9pbnQ6IGQzX25vb3AsXG4gICAgbGluZVN0YXJ0OiBkM19ub29wLFxuICAgIGxpbmVFbmQ6IGQzX25vb3AsXG4gICAgcG9seWdvblN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgIGQzX2dlb19hcmVhUmluZ1N1bS5yZXNldCgpO1xuICAgICAgZDNfZ2VvX2FyZWEubGluZVN0YXJ0ID0gZDNfZ2VvX2FyZWFSaW5nU3RhcnQ7XG4gICAgfSxcbiAgICBwb2x5Z29uRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmVhID0gMiAqIGQzX2dlb19hcmVhUmluZ1N1bTtcbiAgICAgIGQzX2dlb19hcmVhU3VtICs9IGFyZWEgPCAwID8gNCAqIM+AICsgYXJlYSA6IGFyZWE7XG4gICAgICBkM19nZW9fYXJlYS5saW5lU3RhcnQgPSBkM19nZW9fYXJlYS5saW5lRW5kID0gZDNfZ2VvX2FyZWEucG9pbnQgPSBkM19ub29wO1xuICAgIH1cbiAgfTtcbiAgZnVuY3Rpb24gZDNfZ2VvX2FyZWFSaW5nU3RhcnQoKSB7XG4gICAgdmFyIM67MDAsIM+GMDAsIM67MCwgY29zz4YwLCBzaW7PhjA7XG4gICAgZDNfZ2VvX2FyZWEucG9pbnQgPSBmdW5jdGlvbijOuywgz4YpIHtcbiAgICAgIGQzX2dlb19hcmVhLnBvaW50ID0gbmV4dFBvaW50O1xuICAgICAgzrswID0gKM67MDAgPSDOuykgKiBkM19yYWRpYW5zLCBjb3PPhjAgPSBNYXRoLmNvcyjPhiA9ICjPhjAwID0gz4YpICogZDNfcmFkaWFucyAvIDIgKyDPgCAvIDQpLCBcbiAgICAgIHNpbs+GMCA9IE1hdGguc2luKM+GKTtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIG5leHRQb2ludCjOuywgz4YpIHtcbiAgICAgIM67ICo9IGQzX3JhZGlhbnM7XG4gICAgICDPhiA9IM+GICogZDNfcmFkaWFucyAvIDIgKyDPgCAvIDQ7XG4gICAgICB2YXIgZM67ID0gzrsgLSDOuzAsIGNvc8+GID0gTWF0aC5jb3Moz4YpLCBzaW7PhiA9IE1hdGguc2luKM+GKSwgayA9IHNpbs+GMCAqIHNpbs+GLCB1ID0gY29zz4YwICogY29zz4YgKyBrICogTWF0aC5jb3MoZM67KSwgdiA9IGsgKiBNYXRoLnNpbihkzrspO1xuICAgICAgZDNfZ2VvX2FyZWFSaW5nU3VtLmFkZChNYXRoLmF0YW4yKHYsIHUpKTtcbiAgICAgIM67MCA9IM67LCBjb3PPhjAgPSBjb3PPhiwgc2luz4YwID0gc2luz4Y7XG4gICAgfVxuICAgIGQzX2dlb19hcmVhLmxpbmVFbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIG5leHRQb2ludCjOuzAwLCDPhjAwKTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19jYXJ0ZXNpYW4oc3BoZXJpY2FsKSB7XG4gICAgdmFyIM67ID0gc3BoZXJpY2FsWzBdLCDPhiA9IHNwaGVyaWNhbFsxXSwgY29zz4YgPSBNYXRoLmNvcyjPhik7XG4gICAgcmV0dXJuIFsgY29zz4YgKiBNYXRoLmNvcyjOuyksIGNvc8+GICogTWF0aC5zaW4ozrspLCBNYXRoLnNpbijPhikgXTtcbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fY2FydGVzaWFuRG90KGEsIGIpIHtcbiAgICByZXR1cm4gYVswXSAqIGJbMF0gKyBhWzFdICogYlsxXSArIGFbMl0gKiBiWzJdO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19jYXJ0ZXNpYW5Dcm9zcyhhLCBiKSB7XG4gICAgcmV0dXJuIFsgYVsxXSAqIGJbMl0gLSBhWzJdICogYlsxXSwgYVsyXSAqIGJbMF0gLSBhWzBdICogYlsyXSwgYVswXSAqIGJbMV0gLSBhWzFdICogYlswXSBdO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19jYXJ0ZXNpYW5BZGQoYSwgYikge1xuICAgIGFbMF0gKz0gYlswXTtcbiAgICBhWzFdICs9IGJbMV07XG4gICAgYVsyXSArPSBiWzJdO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19jYXJ0ZXNpYW5TY2FsZSh2ZWN0b3IsIGspIHtcbiAgICByZXR1cm4gWyB2ZWN0b3JbMF0gKiBrLCB2ZWN0b3JbMV0gKiBrLCB2ZWN0b3JbMl0gKiBrIF07XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX2NhcnRlc2lhbk5vcm1hbGl6ZShkKSB7XG4gICAgdmFyIGwgPSBNYXRoLnNxcnQoZFswXSAqIGRbMF0gKyBkWzFdICogZFsxXSArIGRbMl0gKiBkWzJdKTtcbiAgICBkWzBdIC89IGw7XG4gICAgZFsxXSAvPSBsO1xuICAgIGRbMl0gLz0gbDtcbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fc3BoZXJpY2FsKGNhcnRlc2lhbikge1xuICAgIHJldHVybiBbIE1hdGguYXRhbjIoY2FydGVzaWFuWzFdLCBjYXJ0ZXNpYW5bMF0pLCBkM19hc2luKGNhcnRlc2lhblsyXSkgXTtcbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fc3BoZXJpY2FsRXF1YWwoYSwgYikge1xuICAgIHJldHVybiBNYXRoLmFicyhhWzBdIC0gYlswXSkgPCDOtSAmJiBNYXRoLmFicyhhWzFdIC0gYlsxXSkgPCDOtTtcbiAgfVxuICBkMy5nZW8uYm91bmRzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIM67MCwgz4YwLCDOuzEsIM+GMSwgzrtfLCDOu19fLCDPhl9fLCBwMCwgZM67U3VtLCByYW5nZXMsIHJhbmdlO1xuICAgIHZhciBib3VuZCA9IHtcbiAgICAgIHBvaW50OiBwb2ludCxcbiAgICAgIGxpbmVTdGFydDogbGluZVN0YXJ0LFxuICAgICAgbGluZUVuZDogbGluZUVuZCxcbiAgICAgIHBvbHlnb25TdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGJvdW5kLnBvaW50ID0gcmluZ1BvaW50O1xuICAgICAgICBib3VuZC5saW5lU3RhcnQgPSByaW5nU3RhcnQ7XG4gICAgICAgIGJvdW5kLmxpbmVFbmQgPSByaW5nRW5kO1xuICAgICAgICBkzrtTdW0gPSAwO1xuICAgICAgICBkM19nZW9fYXJlYS5wb2x5Z29uU3RhcnQoKTtcbiAgICAgIH0sXG4gICAgICBwb2x5Z29uRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgZDNfZ2VvX2FyZWEucG9seWdvbkVuZCgpO1xuICAgICAgICBib3VuZC5wb2ludCA9IHBvaW50O1xuICAgICAgICBib3VuZC5saW5lU3RhcnQgPSBsaW5lU3RhcnQ7XG4gICAgICAgIGJvdW5kLmxpbmVFbmQgPSBsaW5lRW5kO1xuICAgICAgICBpZiAoZDNfZ2VvX2FyZWFSaW5nU3VtIDwgMCkgzrswID0gLSjOuzEgPSAxODApLCDPhjAgPSAtKM+GMSA9IDkwKTsgZWxzZSBpZiAoZM67U3VtID4gzrUpIM+GMSA9IDkwOyBlbHNlIGlmIChkzrtTdW0gPCAtzrUpIM+GMCA9IC05MDtcbiAgICAgICAgcmFuZ2VbMF0gPSDOuzAsIHJhbmdlWzFdID0gzrsxO1xuICAgICAgfVxuICAgIH07XG4gICAgZnVuY3Rpb24gcG9pbnQozrssIM+GKSB7XG4gICAgICByYW5nZXMucHVzaChyYW5nZSA9IFsgzrswID0gzrssIM67MSA9IM67IF0pO1xuICAgICAgaWYgKM+GIDwgz4YwKSDPhjAgPSDPhjtcbiAgICAgIGlmICjPhiA+IM+GMSkgz4YxID0gz4Y7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxpbmVQb2ludCjOuywgz4YpIHtcbiAgICAgIHZhciBwID0gZDNfZ2VvX2NhcnRlc2lhbihbIM67ICogZDNfcmFkaWFucywgz4YgKiBkM19yYWRpYW5zIF0pO1xuICAgICAgaWYgKHAwKSB7XG4gICAgICAgIHZhciBub3JtYWwgPSBkM19nZW9fY2FydGVzaWFuQ3Jvc3MocDAsIHApLCBlcXVhdG9yaWFsID0gWyBub3JtYWxbMV0sIC1ub3JtYWxbMF0sIDAgXSwgaW5mbGVjdGlvbiA9IGQzX2dlb19jYXJ0ZXNpYW5Dcm9zcyhlcXVhdG9yaWFsLCBub3JtYWwpO1xuICAgICAgICBkM19nZW9fY2FydGVzaWFuTm9ybWFsaXplKGluZmxlY3Rpb24pO1xuICAgICAgICBpbmZsZWN0aW9uID0gZDNfZ2VvX3NwaGVyaWNhbChpbmZsZWN0aW9uKTtcbiAgICAgICAgdmFyIGTOuyA9IM67IC0gzrtfLCBzID0gZM67ID4gMCA/IDEgOiAtMSwgzrtpID0gaW5mbGVjdGlvblswXSAqIGQzX2RlZ3JlZXMgKiBzLCBhbnRpbWVyaWRpYW4gPSBNYXRoLmFicyhkzrspID4gMTgwO1xuICAgICAgICBpZiAoYW50aW1lcmlkaWFuIF4gKHMgKiDOu18gPCDOu2kgJiYgzrtpIDwgcyAqIM67KSkge1xuICAgICAgICAgIHZhciDPhmkgPSBpbmZsZWN0aW9uWzFdICogZDNfZGVncmVlcztcbiAgICAgICAgICBpZiAoz4ZpID4gz4YxKSDPhjEgPSDPhmk7XG4gICAgICAgIH0gZWxzZSBpZiAozrtpID0gKM67aSArIDM2MCkgJSAzNjAgLSAxODAsIGFudGltZXJpZGlhbiBeIChzICogzrtfIDwgzrtpICYmIM67aSA8IHMgKiDOuykpIHtcbiAgICAgICAgICB2YXIgz4ZpID0gLWluZmxlY3Rpb25bMV0gKiBkM19kZWdyZWVzO1xuICAgICAgICAgIGlmICjPhmkgPCDPhjApIM+GMCA9IM+GaTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoz4YgPCDPhjApIM+GMCA9IM+GO1xuICAgICAgICAgIGlmICjPhiA+IM+GMSkgz4YxID0gz4Y7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFudGltZXJpZGlhbikge1xuICAgICAgICAgIGlmICjOuyA8IM67Xykge1xuICAgICAgICAgICAgaWYgKGFuZ2xlKM67MCwgzrspID4gYW5nbGUozrswLCDOuzEpKSDOuzEgPSDOuztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGFuZ2xlKM67LCDOuzEpID4gYW5nbGUozrswLCDOuzEpKSDOuzAgPSDOuztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKM67MSA+PSDOuzApIHtcbiAgICAgICAgICAgIGlmICjOuyA8IM67MCkgzrswID0gzrs7XG4gICAgICAgICAgICBpZiAozrsgPiDOuzEpIM67MSA9IM67O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAozrsgPiDOu18pIHtcbiAgICAgICAgICAgICAgaWYgKGFuZ2xlKM67MCwgzrspID4gYW5nbGUozrswLCDOuzEpKSDOuzEgPSDOuztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChhbmdsZSjOuywgzrsxKSA+IGFuZ2xlKM67MCwgzrsxKSkgzrswID0gzrs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwb2ludCjOuywgz4YpO1xuICAgICAgfVxuICAgICAgcDAgPSBwLCDOu18gPSDOuztcbiAgICB9XG4gICAgZnVuY3Rpb24gbGluZVN0YXJ0KCkge1xuICAgICAgYm91bmQucG9pbnQgPSBsaW5lUG9pbnQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxpbmVFbmQoKSB7XG4gICAgICByYW5nZVswXSA9IM67MCwgcmFuZ2VbMV0gPSDOuzE7XG4gICAgICBib3VuZC5wb2ludCA9IHBvaW50O1xuICAgICAgcDAgPSBudWxsO1xuICAgIH1cbiAgICBmdW5jdGlvbiByaW5nUG9pbnQozrssIM+GKSB7XG4gICAgICBpZiAocDApIHtcbiAgICAgICAgdmFyIGTOuyA9IM67IC0gzrtfO1xuICAgICAgICBkzrtTdW0gKz0gTWF0aC5hYnMoZM67KSA+IDE4MCA/IGTOuyArIChkzrsgPiAwID8gMzYwIDogLTM2MCkgOiBkzrs7XG4gICAgICB9IGVsc2UgzrtfXyA9IM67LCDPhl9fID0gz4Y7XG4gICAgICBkM19nZW9fYXJlYS5wb2ludCjOuywgz4YpO1xuICAgICAgbGluZVBvaW50KM67LCDPhik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJpbmdTdGFydCgpIHtcbiAgICAgIGQzX2dlb19hcmVhLmxpbmVTdGFydCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByaW5nRW5kKCkge1xuICAgICAgcmluZ1BvaW50KM67X18sIM+GX18pO1xuICAgICAgZDNfZ2VvX2FyZWEubGluZUVuZCgpO1xuICAgICAgaWYgKE1hdGguYWJzKGTOu1N1bSkgPiDOtSkgzrswID0gLSjOuzEgPSAxODApO1xuICAgICAgcmFuZ2VbMF0gPSDOuzAsIHJhbmdlWzFdID0gzrsxO1xuICAgICAgcDAgPSBudWxsO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhbmdsZSjOuzAsIM67MSkge1xuICAgICAgcmV0dXJuICjOuzEgLT0gzrswKSA8IDAgPyDOuzEgKyAzNjAgOiDOuzE7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbXBhcmVSYW5nZXMoYSwgYikge1xuICAgICAgcmV0dXJuIGFbMF0gLSBiWzBdO1xuICAgIH1cbiAgICBmdW5jdGlvbiB3aXRoaW5SYW5nZSh4LCByYW5nZSkge1xuICAgICAgcmV0dXJuIHJhbmdlWzBdIDw9IHJhbmdlWzFdID8gcmFuZ2VbMF0gPD0geCAmJiB4IDw9IHJhbmdlWzFdIDogeCA8IHJhbmdlWzBdIHx8IHJhbmdlWzFdIDwgeDtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGZlYXR1cmUpIHtcbiAgICAgIM+GMSA9IM67MSA9IC0ozrswID0gz4YwID0gSW5maW5pdHkpO1xuICAgICAgcmFuZ2VzID0gW107XG4gICAgICBkMy5nZW8uc3RyZWFtKGZlYXR1cmUsIGJvdW5kKTtcbiAgICAgIHZhciBuID0gcmFuZ2VzLmxlbmd0aDtcbiAgICAgIGlmIChuKSB7XG4gICAgICAgIHJhbmdlcy5zb3J0KGNvbXBhcmVSYW5nZXMpO1xuICAgICAgICBmb3IgKHZhciBpID0gMSwgYSA9IHJhbmdlc1swXSwgYiwgbWVyZ2VkID0gWyBhIF07IGkgPCBuOyArK2kpIHtcbiAgICAgICAgICBiID0gcmFuZ2VzW2ldO1xuICAgICAgICAgIGlmICh3aXRoaW5SYW5nZShiWzBdLCBhKSB8fCB3aXRoaW5SYW5nZShiWzFdLCBhKSkge1xuICAgICAgICAgICAgaWYgKGFuZ2xlKGFbMF0sIGJbMV0pID4gYW5nbGUoYVswXSwgYVsxXSkpIGFbMV0gPSBiWzFdO1xuICAgICAgICAgICAgaWYgKGFuZ2xlKGJbMF0sIGFbMV0pID4gYW5nbGUoYVswXSwgYVsxXSkpIGFbMF0gPSBiWzBdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZXJnZWQucHVzaChhID0gYik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBiZXN0ID0gLUluZmluaXR5LCBkzrs7XG4gICAgICAgIGZvciAodmFyIG4gPSBtZXJnZWQubGVuZ3RoIC0gMSwgaSA9IDAsIGEgPSBtZXJnZWRbbl0sIGI7IGkgPD0gbjsgYSA9IGIsICsraSkge1xuICAgICAgICAgIGIgPSBtZXJnZWRbaV07XG4gICAgICAgICAgaWYgKChkzrsgPSBhbmdsZShhWzFdLCBiWzBdKSkgPiBiZXN0KSBiZXN0ID0gZM67LCDOuzAgPSBiWzBdLCDOuzEgPSBhWzFdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByYW5nZXMgPSByYW5nZSA9IG51bGw7XG4gICAgICByZXR1cm4gzrswID09PSBJbmZpbml0eSB8fCDPhjAgPT09IEluZmluaXR5ID8gWyBbIE5hTiwgTmFOIF0sIFsgTmFOLCBOYU4gXSBdIDogWyBbIM67MCwgz4YwIF0sIFsgzrsxLCDPhjEgXSBdO1xuICAgIH07XG4gIH0oKTtcbiAgZDMuZ2VvLmNlbnRyb2lkID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgZDNfZ2VvX2NlbnRyb2lkVzAgPSBkM19nZW9fY2VudHJvaWRXMSA9IGQzX2dlb19jZW50cm9pZFgwID0gZDNfZ2VvX2NlbnRyb2lkWTAgPSBkM19nZW9fY2VudHJvaWRaMCA9IGQzX2dlb19jZW50cm9pZFgxID0gZDNfZ2VvX2NlbnRyb2lkWTEgPSBkM19nZW9fY2VudHJvaWRaMSA9IGQzX2dlb19jZW50cm9pZFgyID0gZDNfZ2VvX2NlbnRyb2lkWTIgPSBkM19nZW9fY2VudHJvaWRaMiA9IDA7XG4gICAgZDMuZ2VvLnN0cmVhbShvYmplY3QsIGQzX2dlb19jZW50cm9pZCk7XG4gICAgdmFyIHggPSBkM19nZW9fY2VudHJvaWRYMiwgeSA9IGQzX2dlb19jZW50cm9pZFkyLCB6ID0gZDNfZ2VvX2NlbnRyb2lkWjIsIG0gPSB4ICogeCArIHkgKiB5ICsgeiAqIHo7XG4gICAgaWYgKG0gPCDOtTIpIHtcbiAgICAgIHggPSBkM19nZW9fY2VudHJvaWRYMSwgeSA9IGQzX2dlb19jZW50cm9pZFkxLCB6ID0gZDNfZ2VvX2NlbnRyb2lkWjE7XG4gICAgICBpZiAoZDNfZ2VvX2NlbnRyb2lkVzEgPCDOtSkgeCA9IGQzX2dlb19jZW50cm9pZFgwLCB5ID0gZDNfZ2VvX2NlbnRyb2lkWTAsIHogPSBkM19nZW9fY2VudHJvaWRaMDtcbiAgICAgIG0gPSB4ICogeCArIHkgKiB5ICsgeiAqIHo7XG4gICAgICBpZiAobSA8IM61MikgcmV0dXJuIFsgTmFOLCBOYU4gXTtcbiAgICB9XG4gICAgcmV0dXJuIFsgTWF0aC5hdGFuMih5LCB4KSAqIGQzX2RlZ3JlZXMsIGQzX2FzaW4oeiAvIE1hdGguc3FydChtKSkgKiBkM19kZWdyZWVzIF07XG4gIH07XG4gIHZhciBkM19nZW9fY2VudHJvaWRXMCwgZDNfZ2VvX2NlbnRyb2lkVzEsIGQzX2dlb19jZW50cm9pZFgwLCBkM19nZW9fY2VudHJvaWRZMCwgZDNfZ2VvX2NlbnRyb2lkWjAsIGQzX2dlb19jZW50cm9pZFgxLCBkM19nZW9fY2VudHJvaWRZMSwgZDNfZ2VvX2NlbnRyb2lkWjEsIGQzX2dlb19jZW50cm9pZFgyLCBkM19nZW9fY2VudHJvaWRZMiwgZDNfZ2VvX2NlbnRyb2lkWjI7XG4gIHZhciBkM19nZW9fY2VudHJvaWQgPSB7XG4gICAgc3BoZXJlOiBkM19ub29wLFxuICAgIHBvaW50OiBkM19nZW9fY2VudHJvaWRQb2ludCxcbiAgICBsaW5lU3RhcnQ6IGQzX2dlb19jZW50cm9pZExpbmVTdGFydCxcbiAgICBsaW5lRW5kOiBkM19nZW9fY2VudHJvaWRMaW5lRW5kLFxuICAgIHBvbHlnb25TdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICBkM19nZW9fY2VudHJvaWQubGluZVN0YXJ0ID0gZDNfZ2VvX2NlbnRyb2lkUmluZ1N0YXJ0O1xuICAgIH0sXG4gICAgcG9seWdvbkVuZDogZnVuY3Rpb24oKSB7XG4gICAgICBkM19nZW9fY2VudHJvaWQubGluZVN0YXJ0ID0gZDNfZ2VvX2NlbnRyb2lkTGluZVN0YXJ0O1xuICAgIH1cbiAgfTtcbiAgZnVuY3Rpb24gZDNfZ2VvX2NlbnRyb2lkUG9pbnQozrssIM+GKSB7XG4gICAgzrsgKj0gZDNfcmFkaWFucztcbiAgICB2YXIgY29zz4YgPSBNYXRoLmNvcyjPhiAqPSBkM19yYWRpYW5zKTtcbiAgICBkM19nZW9fY2VudHJvaWRQb2ludFhZWihjb3PPhiAqIE1hdGguY29zKM67KSwgY29zz4YgKiBNYXRoLnNpbijOuyksIE1hdGguc2luKM+GKSk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX2NlbnRyb2lkUG9pbnRYWVooeCwgeSwgeikge1xuICAgICsrZDNfZ2VvX2NlbnRyb2lkVzA7XG4gICAgZDNfZ2VvX2NlbnRyb2lkWDAgKz0gKHggLSBkM19nZW9fY2VudHJvaWRYMCkgLyBkM19nZW9fY2VudHJvaWRXMDtcbiAgICBkM19nZW9fY2VudHJvaWRZMCArPSAoeSAtIGQzX2dlb19jZW50cm9pZFkwKSAvIGQzX2dlb19jZW50cm9pZFcwO1xuICAgIGQzX2dlb19jZW50cm9pZFowICs9ICh6IC0gZDNfZ2VvX2NlbnRyb2lkWjApIC8gZDNfZ2VvX2NlbnRyb2lkVzA7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX2NlbnRyb2lkTGluZVN0YXJ0KCkge1xuICAgIHZhciB4MCwgeTAsIHowO1xuICAgIGQzX2dlb19jZW50cm9pZC5wb2ludCA9IGZ1bmN0aW9uKM67LCDPhikge1xuICAgICAgzrsgKj0gZDNfcmFkaWFucztcbiAgICAgIHZhciBjb3PPhiA9IE1hdGguY29zKM+GICo9IGQzX3JhZGlhbnMpO1xuICAgICAgeDAgPSBjb3PPhiAqIE1hdGguY29zKM67KTtcbiAgICAgIHkwID0gY29zz4YgKiBNYXRoLnNpbijOuyk7XG4gICAgICB6MCA9IE1hdGguc2luKM+GKTtcbiAgICAgIGQzX2dlb19jZW50cm9pZC5wb2ludCA9IG5leHRQb2ludDtcbiAgICAgIGQzX2dlb19jZW50cm9pZFBvaW50WFlaKHgwLCB5MCwgejApO1xuICAgIH07XG4gICAgZnVuY3Rpb24gbmV4dFBvaW50KM67LCDPhikge1xuICAgICAgzrsgKj0gZDNfcmFkaWFucztcbiAgICAgIHZhciBjb3PPhiA9IE1hdGguY29zKM+GICo9IGQzX3JhZGlhbnMpLCB4ID0gY29zz4YgKiBNYXRoLmNvcyjOuyksIHkgPSBjb3PPhiAqIE1hdGguc2luKM67KSwgeiA9IE1hdGguc2luKM+GKSwgdyA9IE1hdGguYXRhbjIoTWF0aC5zcXJ0KCh3ID0geTAgKiB6IC0gejAgKiB5KSAqIHcgKyAodyA9IHowICogeCAtIHgwICogeikgKiB3ICsgKHcgPSB4MCAqIHkgLSB5MCAqIHgpICogdyksIHgwICogeCArIHkwICogeSArIHowICogeik7XG4gICAgICBkM19nZW9fY2VudHJvaWRXMSArPSB3O1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkWDEgKz0gdyAqICh4MCArICh4MCA9IHgpKTtcbiAgICAgIGQzX2dlb19jZW50cm9pZFkxICs9IHcgKiAoeTAgKyAoeTAgPSB5KSk7XG4gICAgICBkM19nZW9fY2VudHJvaWRaMSArPSB3ICogKHowICsgKHowID0geikpO1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkUG9pbnRYWVooeDAsIHkwLCB6MCk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19jZW50cm9pZExpbmVFbmQoKSB7XG4gICAgZDNfZ2VvX2NlbnRyb2lkLnBvaW50ID0gZDNfZ2VvX2NlbnRyb2lkUG9pbnQ7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX2NlbnRyb2lkUmluZ1N0YXJ0KCkge1xuICAgIHZhciDOuzAwLCDPhjAwLCB4MCwgeTAsIHowO1xuICAgIGQzX2dlb19jZW50cm9pZC5wb2ludCA9IGZ1bmN0aW9uKM67LCDPhikge1xuICAgICAgzrswMCA9IM67LCDPhjAwID0gz4Y7XG4gICAgICBkM19nZW9fY2VudHJvaWQucG9pbnQgPSBuZXh0UG9pbnQ7XG4gICAgICDOuyAqPSBkM19yYWRpYW5zO1xuICAgICAgdmFyIGNvc8+GID0gTWF0aC5jb3Moz4YgKj0gZDNfcmFkaWFucyk7XG4gICAgICB4MCA9IGNvc8+GICogTWF0aC5jb3MozrspO1xuICAgICAgeTAgPSBjb3PPhiAqIE1hdGguc2luKM67KTtcbiAgICAgIHowID0gTWF0aC5zaW4oz4YpO1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkUG9pbnRYWVooeDAsIHkwLCB6MCk7XG4gICAgfTtcbiAgICBkM19nZW9fY2VudHJvaWQubGluZUVuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgbmV4dFBvaW50KM67MDAsIM+GMDApO1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkLmxpbmVFbmQgPSBkM19nZW9fY2VudHJvaWRMaW5lRW5kO1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkLnBvaW50ID0gZDNfZ2VvX2NlbnRyb2lkUG9pbnQ7XG4gICAgfTtcbiAgICBmdW5jdGlvbiBuZXh0UG9pbnQozrssIM+GKSB7XG4gICAgICDOuyAqPSBkM19yYWRpYW5zO1xuICAgICAgdmFyIGNvc8+GID0gTWF0aC5jb3Moz4YgKj0gZDNfcmFkaWFucyksIHggPSBjb3PPhiAqIE1hdGguY29zKM67KSwgeSA9IGNvc8+GICogTWF0aC5zaW4ozrspLCB6ID0gTWF0aC5zaW4oz4YpLCBjeCA9IHkwICogeiAtIHowICogeSwgY3kgPSB6MCAqIHggLSB4MCAqIHosIGN6ID0geDAgKiB5IC0geTAgKiB4LCBtID0gTWF0aC5zcXJ0KGN4ICogY3ggKyBjeSAqIGN5ICsgY3ogKiBjeiksIHUgPSB4MCAqIHggKyB5MCAqIHkgKyB6MCAqIHosIHYgPSBtICYmIC1kM19hY29zKHUpIC8gbSwgdyA9IE1hdGguYXRhbjIobSwgdSk7XG4gICAgICBkM19nZW9fY2VudHJvaWRYMiArPSB2ICogY3g7XG4gICAgICBkM19nZW9fY2VudHJvaWRZMiArPSB2ICogY3k7XG4gICAgICBkM19nZW9fY2VudHJvaWRaMiArPSB2ICogY3o7XG4gICAgICBkM19nZW9fY2VudHJvaWRXMSArPSB3O1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkWDEgKz0gdyAqICh4MCArICh4MCA9IHgpKTtcbiAgICAgIGQzX2dlb19jZW50cm9pZFkxICs9IHcgKiAoeTAgKyAoeTAgPSB5KSk7XG4gICAgICBkM19nZW9fY2VudHJvaWRaMSArPSB3ICogKHowICsgKHowID0geikpO1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkUG9pbnRYWVooeDAsIHkwLCB6MCk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGQzX3RydWUoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX2NsaXBQb2x5Z29uKHNlZ21lbnRzLCBjb21wYXJlLCBpbnNpZGUsIGludGVycG9sYXRlLCBsaXN0ZW5lcikge1xuICAgIHZhciBzdWJqZWN0ID0gW10sIGNsaXAgPSBbXTtcbiAgICBzZWdtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKHNlZ21lbnQpIHtcbiAgICAgIGlmICgobiA9IHNlZ21lbnQubGVuZ3RoIC0gMSkgPD0gMCkgcmV0dXJuO1xuICAgICAgdmFyIG4sIHAwID0gc2VnbWVudFswXSwgcDEgPSBzZWdtZW50W25dO1xuICAgICAgaWYgKGQzX2dlb19zcGhlcmljYWxFcXVhbChwMCwgcDEpKSB7XG4gICAgICAgIGxpc3RlbmVyLmxpbmVTdGFydCgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSkgbGlzdGVuZXIucG9pbnQoKHAwID0gc2VnbWVudFtpXSlbMF0sIHAwWzFdKTtcbiAgICAgICAgbGlzdGVuZXIubGluZUVuZCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgYSA9IHtcbiAgICAgICAgcG9pbnQ6IHAwLFxuICAgICAgICBwb2ludHM6IHNlZ21lbnQsXG4gICAgICAgIG90aGVyOiBudWxsLFxuICAgICAgICB2aXNpdGVkOiBmYWxzZSxcbiAgICAgICAgZW50cnk6IHRydWUsXG4gICAgICAgIHN1YmplY3Q6IHRydWVcbiAgICAgIH0sIGIgPSB7XG4gICAgICAgIHBvaW50OiBwMCxcbiAgICAgICAgcG9pbnRzOiBbIHAwIF0sXG4gICAgICAgIG90aGVyOiBhLFxuICAgICAgICB2aXNpdGVkOiBmYWxzZSxcbiAgICAgICAgZW50cnk6IGZhbHNlLFxuICAgICAgICBzdWJqZWN0OiBmYWxzZVxuICAgICAgfTtcbiAgICAgIGEub3RoZXIgPSBiO1xuICAgICAgc3ViamVjdC5wdXNoKGEpO1xuICAgICAgY2xpcC5wdXNoKGIpO1xuICAgICAgYSA9IHtcbiAgICAgICAgcG9pbnQ6IHAxLFxuICAgICAgICBwb2ludHM6IFsgcDEgXSxcbiAgICAgICAgb3RoZXI6IG51bGwsXG4gICAgICAgIHZpc2l0ZWQ6IGZhbHNlLFxuICAgICAgICBlbnRyeTogZmFsc2UsXG4gICAgICAgIHN1YmplY3Q6IHRydWVcbiAgICAgIH07XG4gICAgICBiID0ge1xuICAgICAgICBwb2ludDogcDEsXG4gICAgICAgIHBvaW50czogWyBwMSBdLFxuICAgICAgICBvdGhlcjogYSxcbiAgICAgICAgdmlzaXRlZDogZmFsc2UsXG4gICAgICAgIGVudHJ5OiB0cnVlLFxuICAgICAgICBzdWJqZWN0OiBmYWxzZVxuICAgICAgfTtcbiAgICAgIGEub3RoZXIgPSBiO1xuICAgICAgc3ViamVjdC5wdXNoKGEpO1xuICAgICAgY2xpcC5wdXNoKGIpO1xuICAgIH0pO1xuICAgIGNsaXAuc29ydChjb21wYXJlKTtcbiAgICBkM19nZW9fY2xpcFBvbHlnb25MaW5rQ2lyY3VsYXIoc3ViamVjdCk7XG4gICAgZDNfZ2VvX2NsaXBQb2x5Z29uTGlua0NpcmN1bGFyKGNsaXApO1xuICAgIGlmICghc3ViamVjdC5sZW5ndGgpIHJldHVybjtcbiAgICBpZiAoaW5zaWRlKSBmb3IgKHZhciBpID0gMSwgZSA9ICFpbnNpZGUoY2xpcFswXS5wb2ludCksIG4gPSBjbGlwLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgY2xpcFtpXS5lbnRyeSA9IGUgPSAhZTtcbiAgICB9XG4gICAgdmFyIHN0YXJ0ID0gc3ViamVjdFswXSwgY3VycmVudCwgcG9pbnRzLCBwb2ludDtcbiAgICB3aGlsZSAoMSkge1xuICAgICAgY3VycmVudCA9IHN0YXJ0O1xuICAgICAgd2hpbGUgKGN1cnJlbnQudmlzaXRlZCkgaWYgKChjdXJyZW50ID0gY3VycmVudC5uZXh0KSA9PT0gc3RhcnQpIHJldHVybjtcbiAgICAgIHBvaW50cyA9IGN1cnJlbnQucG9pbnRzO1xuICAgICAgbGlzdGVuZXIubGluZVN0YXJ0KCk7XG4gICAgICBkbyB7XG4gICAgICAgIGN1cnJlbnQudmlzaXRlZCA9IGN1cnJlbnQub3RoZXIudmlzaXRlZCA9IHRydWU7XG4gICAgICAgIGlmIChjdXJyZW50LmVudHJ5KSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnQuc3ViamVjdCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIGxpc3RlbmVyLnBvaW50KChwb2ludCA9IHBvaW50c1tpXSlbMF0sIHBvaW50WzFdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW50ZXJwb2xhdGUoY3VycmVudC5wb2ludCwgY3VycmVudC5uZXh0LnBvaW50LCAxLCBsaXN0ZW5lcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnQuc3ViamVjdCkge1xuICAgICAgICAgICAgcG9pbnRzID0gY3VycmVudC5wcmV2LnBvaW50cztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBwb2ludHMubGVuZ3RoOyAtLWkgPj0gMDsgKSBsaXN0ZW5lci5wb2ludCgocG9pbnQgPSBwb2ludHNbaV0pWzBdLCBwb2ludFsxXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGludGVycG9sYXRlKGN1cnJlbnQucG9pbnQsIGN1cnJlbnQucHJldi5wb2ludCwgLTEsIGxpc3RlbmVyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucHJldjtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50ID0gY3VycmVudC5vdGhlcjtcbiAgICAgICAgcG9pbnRzID0gY3VycmVudC5wb2ludHM7XG4gICAgICB9IHdoaWxlICghY3VycmVudC52aXNpdGVkKTtcbiAgICAgIGxpc3RlbmVyLmxpbmVFbmQoKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX2NsaXBQb2x5Z29uTGlua0NpcmN1bGFyKGFycmF5KSB7XG4gICAgaWYgKCEobiA9IGFycmF5Lmxlbmd0aCkpIHJldHVybjtcbiAgICB2YXIgbiwgaSA9IDAsIGEgPSBhcnJheVswXSwgYjtcbiAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgYS5uZXh0ID0gYiA9IGFycmF5W2ldO1xuICAgICAgYi5wcmV2ID0gYTtcbiAgICAgIGEgPSBiO1xuICAgIH1cbiAgICBhLm5leHQgPSBiID0gYXJyYXlbMF07XG4gICAgYi5wcmV2ID0gYTtcbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fY2xpcChwb2ludFZpc2libGUsIGNsaXBMaW5lLCBpbnRlcnBvbGF0ZSwgcG9seWdvbkNvbnRhaW5zKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGluZSA9IGNsaXBMaW5lKGxpc3RlbmVyKTtcbiAgICAgIHZhciBjbGlwID0ge1xuICAgICAgICBwb2ludDogcG9pbnQsXG4gICAgICAgIGxpbmVTdGFydDogbGluZVN0YXJ0LFxuICAgICAgICBsaW5lRW5kOiBsaW5lRW5kLFxuICAgICAgICBwb2x5Z29uU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNsaXAucG9pbnQgPSBwb2ludFJpbmc7XG4gICAgICAgICAgY2xpcC5saW5lU3RhcnQgPSByaW5nU3RhcnQ7XG4gICAgICAgICAgY2xpcC5saW5lRW5kID0gcmluZ0VuZDtcbiAgICAgICAgICBzZWdtZW50cyA9IFtdO1xuICAgICAgICAgIHBvbHlnb24gPSBbXTtcbiAgICAgICAgICBsaXN0ZW5lci5wb2x5Z29uU3RhcnQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgcG9seWdvbkVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2xpcC5wb2ludCA9IHBvaW50O1xuICAgICAgICAgIGNsaXAubGluZVN0YXJ0ID0gbGluZVN0YXJ0O1xuICAgICAgICAgIGNsaXAubGluZUVuZCA9IGxpbmVFbmQ7XG4gICAgICAgICAgc2VnbWVudHMgPSBkMy5tZXJnZShzZWdtZW50cyk7XG4gICAgICAgICAgaWYgKHNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgZDNfZ2VvX2NsaXBQb2x5Z29uKHNlZ21lbnRzLCBkM19nZW9fY2xpcFNvcnQsIG51bGwsIGludGVycG9sYXRlLCBsaXN0ZW5lcik7XG4gICAgICAgICAgfSBlbHNlIGlmIChwb2x5Z29uQ29udGFpbnMocG9seWdvbikpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyLmxpbmVTdGFydCgpO1xuICAgICAgICAgICAgaW50ZXJwb2xhdGUobnVsbCwgbnVsbCwgMSwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgbGlzdGVuZXIubGluZUVuZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsaXN0ZW5lci5wb2x5Z29uRW5kKCk7XG4gICAgICAgICAgc2VnbWVudHMgPSBwb2x5Z29uID0gbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgc3BoZXJlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBsaXN0ZW5lci5wb2x5Z29uU3RhcnQoKTtcbiAgICAgICAgICBsaXN0ZW5lci5saW5lU3RhcnQoKTtcbiAgICAgICAgICBpbnRlcnBvbGF0ZShudWxsLCBudWxsLCAxLCBsaXN0ZW5lcik7XG4gICAgICAgICAgbGlzdGVuZXIubGluZUVuZCgpO1xuICAgICAgICAgIGxpc3RlbmVyLnBvbHlnb25FbmQoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGZ1bmN0aW9uIHBvaW50KM67LCDPhikge1xuICAgICAgICBpZiAocG9pbnRWaXNpYmxlKM67LCDPhikpIGxpc3RlbmVyLnBvaW50KM67LCDPhik7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBwb2ludExpbmUozrssIM+GKSB7XG4gICAgICAgIGxpbmUucG9pbnQozrssIM+GKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGxpbmVTdGFydCgpIHtcbiAgICAgICAgY2xpcC5wb2ludCA9IHBvaW50TGluZTtcbiAgICAgICAgbGluZS5saW5lU3RhcnQoKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGxpbmVFbmQoKSB7XG4gICAgICAgIGNsaXAucG9pbnQgPSBwb2ludDtcbiAgICAgICAgbGluZS5saW5lRW5kKCk7XG4gICAgICB9XG4gICAgICB2YXIgc2VnbWVudHM7XG4gICAgICB2YXIgYnVmZmVyID0gZDNfZ2VvX2NsaXBCdWZmZXJMaXN0ZW5lcigpLCByaW5nTGlzdGVuZXIgPSBjbGlwTGluZShidWZmZXIpLCBwb2x5Z29uLCByaW5nO1xuICAgICAgZnVuY3Rpb24gcG9pbnRSaW5nKM67LCDPhikge1xuICAgICAgICByaW5nTGlzdGVuZXIucG9pbnQozrssIM+GKTtcbiAgICAgICAgcmluZy5wdXNoKFsgzrssIM+GIF0pO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gcmluZ1N0YXJ0KCkge1xuICAgICAgICByaW5nTGlzdGVuZXIubGluZVN0YXJ0KCk7XG4gICAgICAgIHJpbmcgPSBbXTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHJpbmdFbmQoKSB7XG4gICAgICAgIHBvaW50UmluZyhyaW5nWzBdWzBdLCByaW5nWzBdWzFdKTtcbiAgICAgICAgcmluZ0xpc3RlbmVyLmxpbmVFbmQoKTtcbiAgICAgICAgdmFyIGNsZWFuID0gcmluZ0xpc3RlbmVyLmNsZWFuKCksIHJpbmdTZWdtZW50cyA9IGJ1ZmZlci5idWZmZXIoKSwgc2VnbWVudCwgbiA9IHJpbmdTZWdtZW50cy5sZW5ndGg7XG4gICAgICAgIHJpbmcucG9wKCk7XG4gICAgICAgIHBvbHlnb24ucHVzaChyaW5nKTtcbiAgICAgICAgcmluZyA9IG51bGw7XG4gICAgICAgIGlmICghbikgcmV0dXJuO1xuICAgICAgICBpZiAoY2xlYW4gJiAxKSB7XG4gICAgICAgICAgc2VnbWVudCA9IHJpbmdTZWdtZW50c1swXTtcbiAgICAgICAgICB2YXIgbiA9IHNlZ21lbnQubGVuZ3RoIC0gMSwgaSA9IC0xLCBwb2ludDtcbiAgICAgICAgICBsaXN0ZW5lci5saW5lU3RhcnQoKTtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgbikgbGlzdGVuZXIucG9pbnQoKHBvaW50ID0gc2VnbWVudFtpXSlbMF0sIHBvaW50WzFdKTtcbiAgICAgICAgICBsaXN0ZW5lci5saW5lRW5kKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuID4gMSAmJiBjbGVhbiAmIDIpIHJpbmdTZWdtZW50cy5wdXNoKHJpbmdTZWdtZW50cy5wb3AoKS5jb25jYXQocmluZ1NlZ21lbnRzLnNoaWZ0KCkpKTtcbiAgICAgICAgc2VnbWVudHMucHVzaChyaW5nU2VnbWVudHMuZmlsdGVyKGQzX2dlb19jbGlwU2VnbWVudExlbmd0aDEpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjbGlwO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX2NsaXBTZWdtZW50TGVuZ3RoMShzZWdtZW50KSB7XG4gICAgcmV0dXJuIHNlZ21lbnQubGVuZ3RoID4gMTtcbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fY2xpcEJ1ZmZlckxpc3RlbmVyKCkge1xuICAgIHZhciBsaW5lcyA9IFtdLCBsaW5lO1xuICAgIHJldHVybiB7XG4gICAgICBsaW5lU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsaW5lcy5wdXNoKGxpbmUgPSBbXSk7XG4gICAgICB9LFxuICAgICAgcG9pbnQ6IGZ1bmN0aW9uKM67LCDPhikge1xuICAgICAgICBsaW5lLnB1c2goWyDOuywgz4YgXSk7XG4gICAgICB9LFxuICAgICAgbGluZUVuZDogZDNfbm9vcCxcbiAgICAgIGJ1ZmZlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBidWZmZXIgPSBsaW5lcztcbiAgICAgICAgbGluZXMgPSBbXTtcbiAgICAgICAgbGluZSA9IG51bGw7XG4gICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgICB9LFxuICAgICAgcmVqb2luOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGxpbmVzLmxlbmd0aCA+IDEpIGxpbmVzLnB1c2gobGluZXMucG9wKCkuY29uY2F0KGxpbmVzLnNoaWZ0KCkpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19jbGlwU29ydChhLCBiKSB7XG4gICAgcmV0dXJuICgoYSA9IGEucG9pbnQpWzBdIDwgMCA/IGFbMV0gLSDPgCAvIDIgLSDOtSA6IM+AIC8gMiAtIGFbMV0pIC0gKChiID0gYi5wb2ludClbMF0gPCAwID8gYlsxXSAtIM+AIC8gMiAtIM61IDogz4AgLyAyIC0gYlsxXSk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX3BvaW50SW5Qb2x5Z29uKHBvaW50LCBwb2x5Z29uKSB7XG4gICAgdmFyIG1lcmlkaWFuID0gcG9pbnRbMF0sIHBhcmFsbGVsID0gcG9pbnRbMV0sIG1lcmlkaWFuTm9ybWFsID0gWyBNYXRoLnNpbihtZXJpZGlhbiksIC1NYXRoLmNvcyhtZXJpZGlhbiksIDAgXSwgcG9sYXJBbmdsZSA9IDAsIHBvbGFyID0gZmFsc2UsIHNvdXRoUG9sZSA9IGZhbHNlLCB3aW5kaW5nID0gMDtcbiAgICBkM19nZW9fYXJlYVJpbmdTdW0ucmVzZXQoKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbiA9IHBvbHlnb24ubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICB2YXIgcmluZyA9IHBvbHlnb25baV0sIG0gPSByaW5nLmxlbmd0aDtcbiAgICAgIGlmICghbSkgY29udGludWU7XG4gICAgICB2YXIgcG9pbnQwID0gcmluZ1swXSwgzrswID0gcG9pbnQwWzBdLCDPhjAgPSBwb2ludDBbMV0gLyAyICsgz4AgLyA0LCBzaW7PhjAgPSBNYXRoLnNpbijPhjApLCBjb3PPhjAgPSBNYXRoLmNvcyjPhjApLCBqID0gMTtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGlmIChqID09PSBtKSBqID0gMDtcbiAgICAgICAgcG9pbnQgPSByaW5nW2pdO1xuICAgICAgICB2YXIgzrsgPSBwb2ludFswXSwgz4YgPSBwb2ludFsxXSAvIDIgKyDPgCAvIDQsIHNpbs+GID0gTWF0aC5zaW4oz4YpLCBjb3PPhiA9IE1hdGguY29zKM+GKSwgZM67ID0gzrsgLSDOuzAsIGFudGltZXJpZGlhbiA9IE1hdGguYWJzKGTOuykgPiDPgCwgayA9IHNpbs+GMCAqIHNpbs+GO1xuICAgICAgICBkM19nZW9fYXJlYVJpbmdTdW0uYWRkKE1hdGguYXRhbjIoayAqIE1hdGguc2luKGTOuyksIGNvc8+GMCAqIGNvc8+GICsgayAqIE1hdGguY29zKGTOuykpKTtcbiAgICAgICAgaWYgKE1hdGguYWJzKM+GKSA8IM61KSBzb3V0aFBvbGUgPSB0cnVlO1xuICAgICAgICBwb2xhckFuZ2xlICs9IGFudGltZXJpZGlhbiA/IGTOuyArIChkzrsgPj0gMCA/IDIgOiAtMikgKiDPgCA6IGTOuztcbiAgICAgICAgaWYgKGFudGltZXJpZGlhbiBeIM67MCA+PSBtZXJpZGlhbiBeIM67ID49IG1lcmlkaWFuKSB7XG4gICAgICAgICAgdmFyIGFyYyA9IGQzX2dlb19jYXJ0ZXNpYW5Dcm9zcyhkM19nZW9fY2FydGVzaWFuKHBvaW50MCksIGQzX2dlb19jYXJ0ZXNpYW4ocG9pbnQpKTtcbiAgICAgICAgICBkM19nZW9fY2FydGVzaWFuTm9ybWFsaXplKGFyYyk7XG4gICAgICAgICAgdmFyIGludGVyc2VjdGlvbiA9IGQzX2dlb19jYXJ0ZXNpYW5Dcm9zcyhtZXJpZGlhbk5vcm1hbCwgYXJjKTtcbiAgICAgICAgICBkM19nZW9fY2FydGVzaWFuTm9ybWFsaXplKGludGVyc2VjdGlvbik7XG4gICAgICAgICAgdmFyIM+GYXJjID0gKGFudGltZXJpZGlhbiBeIGTOuyA+PSAwID8gLTEgOiAxKSAqIGQzX2FzaW4oaW50ZXJzZWN0aW9uWzJdKTtcbiAgICAgICAgICBpZiAocGFyYWxsZWwgPiDPhmFyYykge1xuICAgICAgICAgICAgd2luZGluZyArPSBhbnRpbWVyaWRpYW4gXiBkzrsgPj0gMCA/IDEgOiAtMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFqKyspIGJyZWFrO1xuICAgICAgICDOuzAgPSDOuywgc2luz4YwID0gc2luz4YsIGNvc8+GMCA9IGNvc8+GLCBwb2ludDAgPSBwb2ludDtcbiAgICAgIH1cbiAgICAgIGlmIChNYXRoLmFicyhwb2xhckFuZ2xlKSA+IM61KSBwb2xhciA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiAoIXNvdXRoUG9sZSAmJiAhcG9sYXIgJiYgZDNfZ2VvX2FyZWFSaW5nU3VtIDwgMCB8fCBwb2xhckFuZ2xlIDwgLc61KSBeIHdpbmRpbmcgJiAxO1xuICB9XG4gIHZhciBkM19nZW9fY2xpcEFudGltZXJpZGlhbiA9IGQzX2dlb19jbGlwKGQzX3RydWUsIGQzX2dlb19jbGlwQW50aW1lcmlkaWFuTGluZSwgZDNfZ2VvX2NsaXBBbnRpbWVyaWRpYW5JbnRlcnBvbGF0ZSwgZDNfZ2VvX2NsaXBBbnRpbWVyaWRpYW5Qb2x5Z29uQ29udGFpbnMpO1xuICBmdW5jdGlvbiBkM19nZW9fY2xpcEFudGltZXJpZGlhbkxpbmUobGlzdGVuZXIpIHtcbiAgICB2YXIgzrswID0gTmFOLCDPhjAgPSBOYU4sIHPOuzAgPSBOYU4sIGNsZWFuO1xuICAgIHJldHVybiB7XG4gICAgICBsaW5lU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsaXN0ZW5lci5saW5lU3RhcnQoKTtcbiAgICAgICAgY2xlYW4gPSAxO1xuICAgICAgfSxcbiAgICAgIHBvaW50OiBmdW5jdGlvbijOuzEsIM+GMSkge1xuICAgICAgICB2YXIgc867MSA9IM67MSA+IDAgPyDPgCA6IC3PgCwgZM67ID0gTWF0aC5hYnMozrsxIC0gzrswKTtcbiAgICAgICAgaWYgKE1hdGguYWJzKGTOuyAtIM+AKSA8IM61KSB7XG4gICAgICAgICAgbGlzdGVuZXIucG9pbnQozrswLCDPhjAgPSAoz4YwICsgz4YxKSAvIDIgPiAwID8gz4AgLyAyIDogLc+AIC8gMik7XG4gICAgICAgICAgbGlzdGVuZXIucG9pbnQoc867MCwgz4YwKTtcbiAgICAgICAgICBsaXN0ZW5lci5saW5lRW5kKCk7XG4gICAgICAgICAgbGlzdGVuZXIubGluZVN0YXJ0KCk7XG4gICAgICAgICAgbGlzdGVuZXIucG9pbnQoc867MSwgz4YwKTtcbiAgICAgICAgICBsaXN0ZW5lci5wb2ludCjOuzEsIM+GMCk7XG4gICAgICAgICAgY2xlYW4gPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHPOuzAgIT09IHPOuzEgJiYgZM67ID49IM+AKSB7XG4gICAgICAgICAgaWYgKE1hdGguYWJzKM67MCAtIHPOuzApIDwgzrUpIM67MCAtPSBzzrswICogzrU7XG4gICAgICAgICAgaWYgKE1hdGguYWJzKM67MSAtIHPOuzEpIDwgzrUpIM67MSAtPSBzzrsxICogzrU7XG4gICAgICAgICAgz4YwID0gZDNfZ2VvX2NsaXBBbnRpbWVyaWRpYW5JbnRlcnNlY3QozrswLCDPhjAsIM67MSwgz4YxKTtcbiAgICAgICAgICBsaXN0ZW5lci5wb2ludChzzrswLCDPhjApO1xuICAgICAgICAgIGxpc3RlbmVyLmxpbmVFbmQoKTtcbiAgICAgICAgICBsaXN0ZW5lci5saW5lU3RhcnQoKTtcbiAgICAgICAgICBsaXN0ZW5lci5wb2ludChzzrsxLCDPhjApO1xuICAgICAgICAgIGNsZWFuID0gMDtcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lci5wb2ludCjOuzAgPSDOuzEsIM+GMCA9IM+GMSk7XG4gICAgICAgIHPOuzAgPSBzzrsxO1xuICAgICAgfSxcbiAgICAgIGxpbmVFbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsaXN0ZW5lci5saW5lRW5kKCk7XG4gICAgICAgIM67MCA9IM+GMCA9IE5hTjtcbiAgICAgIH0sXG4gICAgICBjbGVhbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAyIC0gY2xlYW47XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fY2xpcEFudGltZXJpZGlhbkludGVyc2VjdCjOuzAsIM+GMCwgzrsxLCDPhjEpIHtcbiAgICB2YXIgY29zz4YwLCBjb3PPhjEsIHNpbs67MF/OuzEgPSBNYXRoLnNpbijOuzAgLSDOuzEpO1xuICAgIHJldHVybiBNYXRoLmFicyhzaW7OuzBfzrsxKSA+IM61ID8gTWF0aC5hdGFuKChNYXRoLnNpbijPhjApICogKGNvc8+GMSA9IE1hdGguY29zKM+GMSkpICogTWF0aC5zaW4ozrsxKSAtIE1hdGguc2luKM+GMSkgKiAoY29zz4YwID0gTWF0aC5jb3Moz4YwKSkgKiBNYXRoLnNpbijOuzApKSAvIChjb3PPhjAgKiBjb3PPhjEgKiBzaW7OuzBfzrsxKSkgOiAoz4YwICsgz4YxKSAvIDI7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX2NsaXBBbnRpbWVyaWRpYW5JbnRlcnBvbGF0ZShmcm9tLCB0bywgZGlyZWN0aW9uLCBsaXN0ZW5lcikge1xuICAgIHZhciDPhjtcbiAgICBpZiAoZnJvbSA9PSBudWxsKSB7XG4gICAgICDPhiA9IGRpcmVjdGlvbiAqIM+AIC8gMjtcbiAgICAgIGxpc3RlbmVyLnBvaW50KC3PgCwgz4YpO1xuICAgICAgbGlzdGVuZXIucG9pbnQoMCwgz4YpO1xuICAgICAgbGlzdGVuZXIucG9pbnQoz4AsIM+GKTtcbiAgICAgIGxpc3RlbmVyLnBvaW50KM+ALCAwKTtcbiAgICAgIGxpc3RlbmVyLnBvaW50KM+ALCAtz4YpO1xuICAgICAgbGlzdGVuZXIucG9pbnQoMCwgLc+GKTtcbiAgICAgIGxpc3RlbmVyLnBvaW50KC3PgCwgLc+GKTtcbiAgICAgIGxpc3RlbmVyLnBvaW50KC3PgCwgMCk7XG4gICAgICBsaXN0ZW5lci5wb2ludCgtz4AsIM+GKTtcbiAgICB9IGVsc2UgaWYgKE1hdGguYWJzKGZyb21bMF0gLSB0b1swXSkgPiDOtSkge1xuICAgICAgdmFyIHMgPSAoZnJvbVswXSA8IHRvWzBdID8gMSA6IC0xKSAqIM+AO1xuICAgICAgz4YgPSBkaXJlY3Rpb24gKiBzIC8gMjtcbiAgICAgIGxpc3RlbmVyLnBvaW50KC1zLCDPhik7XG4gICAgICBsaXN0ZW5lci5wb2ludCgwLCDPhik7XG4gICAgICBsaXN0ZW5lci5wb2ludChzLCDPhik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3RlbmVyLnBvaW50KHRvWzBdLCB0b1sxXSk7XG4gICAgfVxuICB9XG4gIHZhciBkM19nZW9fY2xpcEFudGltZXJpZGlhblBvaW50ID0gWyAtz4AsIDAgXTtcbiAgZnVuY3Rpb24gZDNfZ2VvX2NsaXBBbnRpbWVyaWRpYW5Qb2x5Z29uQ29udGFpbnMocG9seWdvbikge1xuICAgIHJldHVybiBkM19nZW9fcG9pbnRJblBvbHlnb24oZDNfZ2VvX2NsaXBBbnRpbWVyaWRpYW5Qb2ludCwgcG9seWdvbik7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX2NsaXBDaXJjbGUocmFkaXVzKSB7XG4gICAgdmFyIGNyID0gTWF0aC5jb3MocmFkaXVzKSwgc21hbGxSYWRpdXMgPSBjciA+IDAsIHBvaW50ID0gWyByYWRpdXMsIDAgXSwgbm90SGVtaXNwaGVyZSA9IE1hdGguYWJzKGNyKSA+IM61LCBpbnRlcnBvbGF0ZSA9IGQzX2dlb19jaXJjbGVJbnRlcnBvbGF0ZShyYWRpdXMsIDYgKiBkM19yYWRpYW5zKTtcbiAgICByZXR1cm4gZDNfZ2VvX2NsaXAodmlzaWJsZSwgY2xpcExpbmUsIGludGVycG9sYXRlLCBwb2x5Z29uQ29udGFpbnMpO1xuICAgIGZ1bmN0aW9uIHZpc2libGUozrssIM+GKSB7XG4gICAgICByZXR1cm4gTWF0aC5jb3MozrspICogTWF0aC5jb3Moz4YpID4gY3I7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNsaXBMaW5lKGxpc3RlbmVyKSB7XG4gICAgICB2YXIgcG9pbnQwLCBjMCwgdjAsIHYwMCwgY2xlYW47XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsaW5lU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHYwMCA9IHYwID0gZmFsc2U7XG4gICAgICAgICAgY2xlYW4gPSAxO1xuICAgICAgICB9LFxuICAgICAgICBwb2ludDogZnVuY3Rpb24ozrssIM+GKSB7XG4gICAgICAgICAgdmFyIHBvaW50MSA9IFsgzrssIM+GIF0sIHBvaW50MiwgdiA9IHZpc2libGUozrssIM+GKSwgYyA9IHNtYWxsUmFkaXVzID8gdiA/IDAgOiBjb2RlKM67LCDPhikgOiB2ID8gY29kZSjOuyArICjOuyA8IDAgPyDPgCA6IC3PgCksIM+GKSA6IDA7XG4gICAgICAgICAgaWYgKCFwb2ludDAgJiYgKHYwMCA9IHYwID0gdikpIGxpc3RlbmVyLmxpbmVTdGFydCgpO1xuICAgICAgICAgIGlmICh2ICE9PSB2MCkge1xuICAgICAgICAgICAgcG9pbnQyID0gaW50ZXJzZWN0KHBvaW50MCwgcG9pbnQxKTtcbiAgICAgICAgICAgIGlmIChkM19nZW9fc3BoZXJpY2FsRXF1YWwocG9pbnQwLCBwb2ludDIpIHx8IGQzX2dlb19zcGhlcmljYWxFcXVhbChwb2ludDEsIHBvaW50MikpIHtcbiAgICAgICAgICAgICAgcG9pbnQxWzBdICs9IM61O1xuICAgICAgICAgICAgICBwb2ludDFbMV0gKz0gzrU7XG4gICAgICAgICAgICAgIHYgPSB2aXNpYmxlKHBvaW50MVswXSwgcG9pbnQxWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHYgIT09IHYwKSB7XG4gICAgICAgICAgICBjbGVhbiA9IDA7XG4gICAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saW5lU3RhcnQoKTtcbiAgICAgICAgICAgICAgcG9pbnQyID0gaW50ZXJzZWN0KHBvaW50MSwgcG9pbnQwKTtcbiAgICAgICAgICAgICAgbGlzdGVuZXIucG9pbnQocG9pbnQyWzBdLCBwb2ludDJbMV0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcG9pbnQyID0gaW50ZXJzZWN0KHBvaW50MCwgcG9pbnQxKTtcbiAgICAgICAgICAgICAgbGlzdGVuZXIucG9pbnQocG9pbnQyWzBdLCBwb2ludDJbMV0pO1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saW5lRW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwb2ludDAgPSBwb2ludDI7XG4gICAgICAgICAgfSBlbHNlIGlmIChub3RIZW1pc3BoZXJlICYmIHBvaW50MCAmJiBzbWFsbFJhZGl1cyBeIHYpIHtcbiAgICAgICAgICAgIHZhciB0O1xuICAgICAgICAgICAgaWYgKCEoYyAmIGMwKSAmJiAodCA9IGludGVyc2VjdChwb2ludDEsIHBvaW50MCwgdHJ1ZSkpKSB7XG4gICAgICAgICAgICAgIGNsZWFuID0gMDtcbiAgICAgICAgICAgICAgaWYgKHNtYWxsUmFkaXVzKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIubGluZVN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIucG9pbnQodFswXVswXSwgdFswXVsxXSk7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIucG9pbnQodFsxXVswXSwgdFsxXVsxXSk7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIubGluZUVuZCgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLnBvaW50KHRbMV1bMF0sIHRbMV1bMV0pO1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpbmVFbmQoKTtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5saW5lU3RhcnQoKTtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5wb2ludCh0WzBdWzBdLCB0WzBdWzFdKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodiAmJiAoIXBvaW50MCB8fCAhZDNfZ2VvX3NwaGVyaWNhbEVxdWFsKHBvaW50MCwgcG9pbnQxKSkpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyLnBvaW50KHBvaW50MVswXSwgcG9pbnQxWzFdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcG9pbnQwID0gcG9pbnQxLCB2MCA9IHYsIGMwID0gYztcbiAgICAgICAgfSxcbiAgICAgICAgbGluZUVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHYwKSBsaXN0ZW5lci5saW5lRW5kKCk7XG4gICAgICAgICAgcG9pbnQwID0gbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBjbGVhbiB8ICh2MDAgJiYgdjApIDw8IDE7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGludGVyc2VjdChhLCBiLCB0d28pIHtcbiAgICAgIHZhciBwYSA9IGQzX2dlb19jYXJ0ZXNpYW4oYSksIHBiID0gZDNfZ2VvX2NhcnRlc2lhbihiKTtcbiAgICAgIHZhciBuMSA9IFsgMSwgMCwgMCBdLCBuMiA9IGQzX2dlb19jYXJ0ZXNpYW5Dcm9zcyhwYSwgcGIpLCBuMm4yID0gZDNfZ2VvX2NhcnRlc2lhbkRvdChuMiwgbjIpLCBuMW4yID0gbjJbMF0sIGRldGVybWluYW50ID0gbjJuMiAtIG4xbjIgKiBuMW4yO1xuICAgICAgaWYgKCFkZXRlcm1pbmFudCkgcmV0dXJuICF0d28gJiYgYTtcbiAgICAgIHZhciBjMSA9IGNyICogbjJuMiAvIGRldGVybWluYW50LCBjMiA9IC1jciAqIG4xbjIgLyBkZXRlcm1pbmFudCwgbjF4bjIgPSBkM19nZW9fY2FydGVzaWFuQ3Jvc3MobjEsIG4yKSwgQSA9IGQzX2dlb19jYXJ0ZXNpYW5TY2FsZShuMSwgYzEpLCBCID0gZDNfZ2VvX2NhcnRlc2lhblNjYWxlKG4yLCBjMik7XG4gICAgICBkM19nZW9fY2FydGVzaWFuQWRkKEEsIEIpO1xuICAgICAgdmFyIHUgPSBuMXhuMiwgdyA9IGQzX2dlb19jYXJ0ZXNpYW5Eb3QoQSwgdSksIHV1ID0gZDNfZ2VvX2NhcnRlc2lhbkRvdCh1LCB1KSwgdDIgPSB3ICogdyAtIHV1ICogKGQzX2dlb19jYXJ0ZXNpYW5Eb3QoQSwgQSkgLSAxKTtcbiAgICAgIGlmICh0MiA8IDApIHJldHVybjtcbiAgICAgIHZhciB0ID0gTWF0aC5zcXJ0KHQyKSwgcSA9IGQzX2dlb19jYXJ0ZXNpYW5TY2FsZSh1LCAoLXcgLSB0KSAvIHV1KTtcbiAgICAgIGQzX2dlb19jYXJ0ZXNpYW5BZGQocSwgQSk7XG4gICAgICBxID0gZDNfZ2VvX3NwaGVyaWNhbChxKTtcbiAgICAgIGlmICghdHdvKSByZXR1cm4gcTtcbiAgICAgIHZhciDOuzAgPSBhWzBdLCDOuzEgPSBiWzBdLCDPhjAgPSBhWzFdLCDPhjEgPSBiWzFdLCB6O1xuICAgICAgaWYgKM67MSA8IM67MCkgeiA9IM67MCwgzrswID0gzrsxLCDOuzEgPSB6O1xuICAgICAgdmFyIM60zrsgPSDOuzEgLSDOuzAsIHBvbGFyID0gTWF0aC5hYnMozrTOuyAtIM+AKSA8IM61LCBtZXJpZGlhbiA9IHBvbGFyIHx8IM60zrsgPCDOtTtcbiAgICAgIGlmICghcG9sYXIgJiYgz4YxIDwgz4YwKSB6ID0gz4YwLCDPhjAgPSDPhjEsIM+GMSA9IHo7XG4gICAgICBpZiAobWVyaWRpYW4gPyBwb2xhciA/IM+GMCArIM+GMSA+IDAgXiBxWzFdIDwgKE1hdGguYWJzKHFbMF0gLSDOuzApIDwgzrUgPyDPhjAgOiDPhjEpIDogz4YwIDw9IHFbMV0gJiYgcVsxXSA8PSDPhjEgOiDOtM67ID4gz4AgXiAozrswIDw9IHFbMF0gJiYgcVswXSA8PSDOuzEpKSB7XG4gICAgICAgIHZhciBxMSA9IGQzX2dlb19jYXJ0ZXNpYW5TY2FsZSh1LCAoLXcgKyB0KSAvIHV1KTtcbiAgICAgICAgZDNfZ2VvX2NhcnRlc2lhbkFkZChxMSwgQSk7XG4gICAgICAgIHJldHVybiBbIHEsIGQzX2dlb19zcGhlcmljYWwocTEpIF07XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvZGUozrssIM+GKSB7XG4gICAgICB2YXIgciA9IHNtYWxsUmFkaXVzID8gcmFkaXVzIDogz4AgLSByYWRpdXMsIGNvZGUgPSAwO1xuICAgICAgaWYgKM67IDwgLXIpIGNvZGUgfD0gMTsgZWxzZSBpZiAozrsgPiByKSBjb2RlIHw9IDI7XG4gICAgICBpZiAoz4YgPCAtcikgY29kZSB8PSA0OyBlbHNlIGlmICjPhiA+IHIpIGNvZGUgfD0gODtcbiAgICAgIHJldHVybiBjb2RlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwb2x5Z29uQ29udGFpbnMocG9seWdvbikge1xuICAgICAgcmV0dXJuIGQzX2dlb19wb2ludEluUG9seWdvbihwb2ludCwgcG9seWdvbik7XG4gICAgfVxuICB9XG4gIHZhciBkM19nZW9fY2xpcFZpZXdNQVggPSAxZTk7XG4gIGZ1bmN0aW9uIGQzX2dlb19jbGlwVmlldyh4MCwgeTAsIHgxLCB5MSkge1xuICAgIHJldHVybiBmdW5jdGlvbihsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3RlbmVyXyA9IGxpc3RlbmVyLCBidWZmZXJMaXN0ZW5lciA9IGQzX2dlb19jbGlwQnVmZmVyTGlzdGVuZXIoKSwgc2VnbWVudHMsIHBvbHlnb24sIHJpbmc7XG4gICAgICB2YXIgY2xpcCA9IHtcbiAgICAgICAgcG9pbnQ6IHBvaW50LFxuICAgICAgICBsaW5lU3RhcnQ6IGxpbmVTdGFydCxcbiAgICAgICAgbGluZUVuZDogbGluZUVuZCxcbiAgICAgICAgcG9seWdvblN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBsaXN0ZW5lciA9IGJ1ZmZlckxpc3RlbmVyO1xuICAgICAgICAgIHNlZ21lbnRzID0gW107XG4gICAgICAgICAgcG9seWdvbiA9IFtdO1xuICAgICAgICB9LFxuICAgICAgICBwb2x5Z29uRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBsaXN0ZW5lciA9IGxpc3RlbmVyXztcbiAgICAgICAgICBpZiAoKHNlZ21lbnRzID0gZDMubWVyZ2Uoc2VnbWVudHMpKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyLnBvbHlnb25TdGFydCgpO1xuICAgICAgICAgICAgZDNfZ2VvX2NsaXBQb2x5Z29uKHNlZ21lbnRzLCBjb21wYXJlLCBpbnNpZGUsIGludGVycG9sYXRlLCBsaXN0ZW5lcik7XG4gICAgICAgICAgICBsaXN0ZW5lci5wb2x5Z29uRW5kKCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpbnNpZGVQb2x5Z29uKFsgeDAsIHkwIF0pKSB7XG4gICAgICAgICAgICBsaXN0ZW5lci5wb2x5Z29uU3RhcnQoKSwgbGlzdGVuZXIubGluZVN0YXJ0KCk7XG4gICAgICAgICAgICBpbnRlcnBvbGF0ZShudWxsLCBudWxsLCAxLCBsaXN0ZW5lcik7XG4gICAgICAgICAgICBsaXN0ZW5lci5saW5lRW5kKCksIGxpc3RlbmVyLnBvbHlnb25FbmQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2VnbWVudHMgPSBwb2x5Z29uID0gcmluZyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBmdW5jdGlvbiBpbnNpZGUocG9pbnQpIHtcbiAgICAgICAgdmFyIGEgPSBjb3JuZXIocG9pbnQsIC0xKSwgaSA9IGluc2lkZVBvbHlnb24oWyBhID09PSAwIHx8IGEgPT09IDMgPyB4MCA6IHgxLCBhID4gMSA/IHkxIDogeTAgXSk7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gaW5zaWRlUG9seWdvbihwKSB7XG4gICAgICAgIHZhciB3biA9IDAsIG4gPSBwb2x5Z29uLmxlbmd0aCwgeSA9IHBbMV07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDEsIHYgPSBwb2x5Z29uW2ldLCBtID0gdi5sZW5ndGgsIGEgPSB2WzBdLCBiOyBqIDwgbTsgKytqKSB7XG4gICAgICAgICAgICBiID0gdltqXTtcbiAgICAgICAgICAgIGlmIChhWzFdIDw9IHkpIHtcbiAgICAgICAgICAgICAgaWYgKGJbMV0gPiB5ICYmIGlzTGVmdChhLCBiLCBwKSA+IDApICsrd247XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoYlsxXSA8PSB5ICYmIGlzTGVmdChhLCBiLCBwKSA8IDApIC0td247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhID0gYjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHduICE9PSAwO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gaXNMZWZ0KGEsIGIsIGMpIHtcbiAgICAgICAgcmV0dXJuIChiWzBdIC0gYVswXSkgKiAoY1sxXSAtIGFbMV0pIC0gKGNbMF0gLSBhWzBdKSAqIChiWzFdIC0gYVsxXSk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBpbnRlcnBvbGF0ZShmcm9tLCB0bywgZGlyZWN0aW9uLCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIgYSA9IDAsIGExID0gMDtcbiAgICAgICAgaWYgKGZyb20gPT0gbnVsbCB8fCAoYSA9IGNvcm5lcihmcm9tLCBkaXJlY3Rpb24pKSAhPT0gKGExID0gY29ybmVyKHRvLCBkaXJlY3Rpb24pKSB8fCBjb21wYXJlUG9pbnRzKGZyb20sIHRvKSA8IDAgXiBkaXJlY3Rpb24gPiAwKSB7XG4gICAgICAgICAgZG8ge1xuICAgICAgICAgICAgbGlzdGVuZXIucG9pbnQoYSA9PT0gMCB8fCBhID09PSAzID8geDAgOiB4MSwgYSA+IDEgPyB5MSA6IHkwKTtcbiAgICAgICAgICB9IHdoaWxlICgoYSA9IChhICsgZGlyZWN0aW9uICsgNCkgJSA0KSAhPT0gYTEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxpc3RlbmVyLnBvaW50KHRvWzBdLCB0b1sxXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHZpc2libGUoeCwgeSkge1xuICAgICAgICByZXR1cm4geDAgPD0geCAmJiB4IDw9IHgxICYmIHkwIDw9IHkgJiYgeSA8PSB5MTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHBvaW50KHgsIHkpIHtcbiAgICAgICAgaWYgKHZpc2libGUoeCwgeSkpIGxpc3RlbmVyLnBvaW50KHgsIHkpO1xuICAgICAgfVxuICAgICAgdmFyIHhfXywgeV9fLCB2X18sIHhfLCB5Xywgdl8sIGZpcnN0O1xuICAgICAgZnVuY3Rpb24gbGluZVN0YXJ0KCkge1xuICAgICAgICBjbGlwLnBvaW50ID0gbGluZVBvaW50O1xuICAgICAgICBpZiAocG9seWdvbikgcG9seWdvbi5wdXNoKHJpbmcgPSBbXSk7XG4gICAgICAgIGZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgdl8gPSBmYWxzZTtcbiAgICAgICAgeF8gPSB5XyA9IE5hTjtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGxpbmVFbmQoKSB7XG4gICAgICAgIGlmIChzZWdtZW50cykge1xuICAgICAgICAgIGxpbmVQb2ludCh4X18sIHlfXyk7XG4gICAgICAgICAgaWYgKHZfXyAmJiB2XykgYnVmZmVyTGlzdGVuZXIucmVqb2luKCk7XG4gICAgICAgICAgc2VnbWVudHMucHVzaChidWZmZXJMaXN0ZW5lci5idWZmZXIoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2xpcC5wb2ludCA9IHBvaW50O1xuICAgICAgICBpZiAodl8pIGxpc3RlbmVyLmxpbmVFbmQoKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGxpbmVQb2ludCh4LCB5KSB7XG4gICAgICAgIHggPSBNYXRoLm1heCgtZDNfZ2VvX2NsaXBWaWV3TUFYLCBNYXRoLm1pbihkM19nZW9fY2xpcFZpZXdNQVgsIHgpKTtcbiAgICAgICAgeSA9IE1hdGgubWF4KC1kM19nZW9fY2xpcFZpZXdNQVgsIE1hdGgubWluKGQzX2dlb19jbGlwVmlld01BWCwgeSkpO1xuICAgICAgICB2YXIgdiA9IHZpc2libGUoeCwgeSk7XG4gICAgICAgIGlmIChwb2x5Z29uKSByaW5nLnB1c2goWyB4LCB5IF0pO1xuICAgICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgICB4X18gPSB4LCB5X18gPSB5LCB2X18gPSB2O1xuICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyLmxpbmVTdGFydCgpO1xuICAgICAgICAgICAgbGlzdGVuZXIucG9pbnQoeCwgeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh2ICYmIHZfKSBsaXN0ZW5lci5wb2ludCh4LCB5KTsgZWxzZSB7XG4gICAgICAgICAgICB2YXIgYSA9IFsgeF8sIHlfIF0sIGIgPSBbIHgsIHkgXTtcbiAgICAgICAgICAgIGlmIChjbGlwTGluZShhLCBiKSkge1xuICAgICAgICAgICAgICBpZiAoIXZfKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIubGluZVN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIucG9pbnQoYVswXSwgYVsxXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbGlzdGVuZXIucG9pbnQoYlswXSwgYlsxXSk7XG4gICAgICAgICAgICAgIGlmICghdikgbGlzdGVuZXIubGluZUVuZCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2KSB7XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpbmVTdGFydCgpO1xuICAgICAgICAgICAgICBsaXN0ZW5lci5wb2ludCh4LCB5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeF8gPSB4LCB5XyA9IHksIHZfID0gdjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjbGlwO1xuICAgIH07XG4gICAgZnVuY3Rpb24gY29ybmVyKHAsIGRpcmVjdGlvbikge1xuICAgICAgcmV0dXJuIE1hdGguYWJzKHBbMF0gLSB4MCkgPCDOtSA/IGRpcmVjdGlvbiA+IDAgPyAwIDogMyA6IE1hdGguYWJzKHBbMF0gLSB4MSkgPCDOtSA/IGRpcmVjdGlvbiA+IDAgPyAyIDogMSA6IE1hdGguYWJzKHBbMV0gLSB5MCkgPCDOtSA/IGRpcmVjdGlvbiA+IDAgPyAxIDogMCA6IGRpcmVjdGlvbiA+IDAgPyAzIDogMjtcbiAgICB9XG4gICAgZnVuY3Rpb24gY29tcGFyZShhLCBiKSB7XG4gICAgICByZXR1cm4gY29tcGFyZVBvaW50cyhhLnBvaW50LCBiLnBvaW50KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY29tcGFyZVBvaW50cyhhLCBiKSB7XG4gICAgICB2YXIgY2EgPSBjb3JuZXIoYSwgMSksIGNiID0gY29ybmVyKGIsIDEpO1xuICAgICAgcmV0dXJuIGNhICE9PSBjYiA/IGNhIC0gY2IgOiBjYSA9PT0gMCA/IGJbMV0gLSBhWzFdIDogY2EgPT09IDEgPyBhWzBdIC0gYlswXSA6IGNhID09PSAyID8gYVsxXSAtIGJbMV0gOiBiWzBdIC0gYVswXTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2xpcExpbmUoYSwgYikge1xuICAgICAgdmFyIGR4ID0gYlswXSAtIGFbMF0sIGR5ID0gYlsxXSAtIGFbMV0sIHQgPSBbIDAsIDEgXTtcbiAgICAgIGlmIChNYXRoLmFicyhkeCkgPCDOtSAmJiBNYXRoLmFicyhkeSkgPCDOtSkgcmV0dXJuIHgwIDw9IGFbMF0gJiYgYVswXSA8PSB4MSAmJiB5MCA8PSBhWzFdICYmIGFbMV0gPD0geTE7XG4gICAgICBpZiAoZDNfZ2VvX2NsaXBWaWV3VCh4MCAtIGFbMF0sIGR4LCB0KSAmJiBkM19nZW9fY2xpcFZpZXdUKGFbMF0gLSB4MSwgLWR4LCB0KSAmJiBkM19nZW9fY2xpcFZpZXdUKHkwIC0gYVsxXSwgZHksIHQpICYmIGQzX2dlb19jbGlwVmlld1QoYVsxXSAtIHkxLCAtZHksIHQpKSB7XG4gICAgICAgIGlmICh0WzFdIDwgMSkge1xuICAgICAgICAgIGJbMF0gPSBhWzBdICsgdFsxXSAqIGR4O1xuICAgICAgICAgIGJbMV0gPSBhWzFdICsgdFsxXSAqIGR5O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0WzBdID4gMCkge1xuICAgICAgICAgIGFbMF0gKz0gdFswXSAqIGR4O1xuICAgICAgICAgIGFbMV0gKz0gdFswXSAqIGR5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fY2xpcFZpZXdUKG51bSwgZGVub21pbmF0b3IsIHQpIHtcbiAgICBpZiAoTWF0aC5hYnMoZGVub21pbmF0b3IpIDwgzrUpIHJldHVybiBudW0gPD0gMDtcbiAgICB2YXIgdSA9IG51bSAvIGRlbm9taW5hdG9yO1xuICAgIGlmIChkZW5vbWluYXRvciA+IDApIHtcbiAgICAgIGlmICh1ID4gdFsxXSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKHUgPiB0WzBdKSB0WzBdID0gdTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHUgPCB0WzBdKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAodSA8IHRbMV0pIHRbMV0gPSB1O1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fY29tcG9zZShhLCBiKSB7XG4gICAgZnVuY3Rpb24gY29tcG9zZSh4LCB5KSB7XG4gICAgICByZXR1cm4geCA9IGEoeCwgeSksIGIoeFswXSwgeFsxXSk7XG4gICAgfVxuICAgIGlmIChhLmludmVydCAmJiBiLmludmVydCkgY29tcG9zZS5pbnZlcnQgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgICByZXR1cm4geCA9IGIuaW52ZXJ0KHgsIHkpLCB4ICYmIGEuaW52ZXJ0KHhbMF0sIHhbMV0pO1xuICAgIH07XG4gICAgcmV0dXJuIGNvbXBvc2U7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX2NvbmljKHByb2plY3RBdCkge1xuICAgIHZhciDPhjAgPSAwLCDPhjEgPSDPgCAvIDMsIG0gPSBkM19nZW9fcHJvamVjdGlvbk11dGF0b3IocHJvamVjdEF0KSwgcCA9IG0oz4YwLCDPhjEpO1xuICAgIHAucGFyYWxsZWxzID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gWyDPhjAgLyDPgCAqIDE4MCwgz4YxIC8gz4AgKiAxODAgXTtcbiAgICAgIHJldHVybiBtKM+GMCA9IF9bMF0gKiDPgCAvIDE4MCwgz4YxID0gX1sxXSAqIM+AIC8gMTgwKTtcbiAgICB9O1xuICAgIHJldHVybiBwO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19jb25pY0VxdWFsQXJlYSjPhjAsIM+GMSkge1xuICAgIHZhciBzaW7PhjAgPSBNYXRoLnNpbijPhjApLCBuID0gKHNpbs+GMCArIE1hdGguc2luKM+GMSkpIC8gMiwgQyA9IDEgKyBzaW7PhjAgKiAoMiAqIG4gLSBzaW7PhjApLCDPgTAgPSBNYXRoLnNxcnQoQykgLyBuO1xuICAgIGZ1bmN0aW9uIGZvcndhcmQozrssIM+GKSB7XG4gICAgICB2YXIgz4EgPSBNYXRoLnNxcnQoQyAtIDIgKiBuICogTWF0aC5zaW4oz4YpKSAvIG47XG4gICAgICByZXR1cm4gWyDPgSAqIE1hdGguc2luKM67ICo9IG4pLCDPgTAgLSDPgSAqIE1hdGguY29zKM67KSBdO1xuICAgIH1cbiAgICBmb3J3YXJkLmludmVydCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgIHZhciDPgTBfeSA9IM+BMCAtIHk7XG4gICAgICByZXR1cm4gWyBNYXRoLmF0YW4yKHgsIM+BMF95KSAvIG4sIGQzX2FzaW4oKEMgLSAoeCAqIHggKyDPgTBfeSAqIM+BMF95KSAqIG4gKiBuKSAvICgyICogbikpIF07XG4gICAgfTtcbiAgICByZXR1cm4gZm9yd2FyZDtcbiAgfVxuICAoZDMuZ2VvLmNvbmljRXF1YWxBcmVhID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGQzX2dlb19jb25pYyhkM19nZW9fY29uaWNFcXVhbEFyZWEpO1xuICB9KS5yYXcgPSBkM19nZW9fY29uaWNFcXVhbEFyZWE7XG4gIGQzLmdlby5hbGJlcnMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDMuZ2VvLmNvbmljRXF1YWxBcmVhKCkucm90YXRlKFsgOTYsIDAgXSkuY2VudGVyKFsgLS42LCAzOC43IF0pLnBhcmFsbGVscyhbIDI5LjUsIDQ1LjUgXSkuc2NhbGUoMTA3MCk7XG4gIH07XG4gIGQzLmdlby5hbGJlcnNVc2EgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbG93ZXI0OCA9IGQzLmdlby5hbGJlcnMoKTtcbiAgICB2YXIgYWxhc2thID0gZDMuZ2VvLmNvbmljRXF1YWxBcmVhKCkucm90YXRlKFsgMTU0LCAwIF0pLmNlbnRlcihbIC0yLCA1OC41IF0pLnBhcmFsbGVscyhbIDU1LCA2NSBdKTtcbiAgICB2YXIgaGF3YWlpID0gZDMuZ2VvLmNvbmljRXF1YWxBcmVhKCkucm90YXRlKFsgMTU3LCAwIF0pLmNlbnRlcihbIC0zLCAxOS45IF0pLnBhcmFsbGVscyhbIDgsIDE4IF0pO1xuICAgIHZhciBwb2ludCwgcG9pbnRTdHJlYW0gPSB7XG4gICAgICBwb2ludDogZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICBwb2ludCA9IFsgeCwgeSBdO1xuICAgICAgfVxuICAgIH0sIGxvd2VyNDhQb2ludCwgYWxhc2thUG9pbnQsIGhhd2FpaVBvaW50O1xuICAgIGZ1bmN0aW9uIGFsYmVyc1VzYShjb29yZGluYXRlcykge1xuICAgICAgdmFyIHggPSBjb29yZGluYXRlc1swXSwgeSA9IGNvb3JkaW5hdGVzWzFdO1xuICAgICAgcG9pbnQgPSBudWxsO1xuICAgICAgKGxvd2VyNDhQb2ludCh4LCB5KSwgcG9pbnQpIHx8IChhbGFza2FQb2ludCh4LCB5KSwgcG9pbnQpIHx8IGhhd2FpaVBvaW50KHgsIHkpO1xuICAgICAgcmV0dXJuIHBvaW50O1xuICAgIH1cbiAgICBhbGJlcnNVc2EuaW52ZXJ0ID0gZnVuY3Rpb24oY29vcmRpbmF0ZXMpIHtcbiAgICAgIHZhciBrID0gbG93ZXI0OC5zY2FsZSgpLCB0ID0gbG93ZXI0OC50cmFuc2xhdGUoKSwgeCA9IChjb29yZGluYXRlc1swXSAtIHRbMF0pIC8gaywgeSA9IChjb29yZGluYXRlc1sxXSAtIHRbMV0pIC8gaztcbiAgICAgIHJldHVybiAoeSA+PSAuMTIgJiYgeSA8IC4yMzQgJiYgeCA+PSAtLjQyNSAmJiB4IDwgLS4yMTQgPyBhbGFza2EgOiB5ID49IC4xNjYgJiYgeSA8IC4yMzQgJiYgeCA+PSAtLjIxNCAmJiB4IDwgLS4xMTUgPyBoYXdhaWkgOiBsb3dlcjQ4KS5pbnZlcnQoY29vcmRpbmF0ZXMpO1xuICAgIH07XG4gICAgYWxiZXJzVXNhLnN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgdmFyIGxvd2VyNDhTdHJlYW0gPSBsb3dlcjQ4LnN0cmVhbShzdHJlYW0pLCBhbGFza2FTdHJlYW0gPSBhbGFza2Euc3RyZWFtKHN0cmVhbSksIGhhd2FpaVN0cmVhbSA9IGhhd2FpaS5zdHJlYW0oc3RyZWFtKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBvaW50OiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgICAgbG93ZXI0OFN0cmVhbS5wb2ludCh4LCB5KTtcbiAgICAgICAgICBhbGFza2FTdHJlYW0ucG9pbnQoeCwgeSk7XG4gICAgICAgICAgaGF3YWlpU3RyZWFtLnBvaW50KHgsIHkpO1xuICAgICAgICB9LFxuICAgICAgICBzcGhlcmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGxvd2VyNDhTdHJlYW0uc3BoZXJlKCk7XG4gICAgICAgICAgYWxhc2thU3RyZWFtLnNwaGVyZSgpO1xuICAgICAgICAgIGhhd2FpaVN0cmVhbS5zcGhlcmUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgbGluZVN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBsb3dlcjQ4U3RyZWFtLmxpbmVTdGFydCgpO1xuICAgICAgICAgIGFsYXNrYVN0cmVhbS5saW5lU3RhcnQoKTtcbiAgICAgICAgICBoYXdhaWlTdHJlYW0ubGluZVN0YXJ0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGxpbmVFbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGxvd2VyNDhTdHJlYW0ubGluZUVuZCgpO1xuICAgICAgICAgIGFsYXNrYVN0cmVhbS5saW5lRW5kKCk7XG4gICAgICAgICAgaGF3YWlpU3RyZWFtLmxpbmVFbmQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgcG9seWdvblN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBsb3dlcjQ4U3RyZWFtLnBvbHlnb25TdGFydCgpO1xuICAgICAgICAgIGFsYXNrYVN0cmVhbS5wb2x5Z29uU3RhcnQoKTtcbiAgICAgICAgICBoYXdhaWlTdHJlYW0ucG9seWdvblN0YXJ0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIHBvbHlnb25FbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGxvd2VyNDhTdHJlYW0ucG9seWdvbkVuZCgpO1xuICAgICAgICAgIGFsYXNrYVN0cmVhbS5wb2x5Z29uRW5kKCk7XG4gICAgICAgICAgaGF3YWlpU3RyZWFtLnBvbHlnb25FbmQoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICAgIGFsYmVyc1VzYS5wcmVjaXNpb24gPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsb3dlcjQ4LnByZWNpc2lvbigpO1xuICAgICAgbG93ZXI0OC5wcmVjaXNpb24oXyk7XG4gICAgICBhbGFza2EucHJlY2lzaW9uKF8pO1xuICAgICAgaGF3YWlpLnByZWNpc2lvbihfKTtcbiAgICAgIHJldHVybiBhbGJlcnNVc2E7XG4gICAgfTtcbiAgICBhbGJlcnNVc2Euc2NhbGUgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsb3dlcjQ4LnNjYWxlKCk7XG4gICAgICBsb3dlcjQ4LnNjYWxlKF8pO1xuICAgICAgYWxhc2thLnNjYWxlKF8gKiAuMzUpO1xuICAgICAgaGF3YWlpLnNjYWxlKF8pO1xuICAgICAgcmV0dXJuIGFsYmVyc1VzYS50cmFuc2xhdGUobG93ZXI0OC50cmFuc2xhdGUoKSk7XG4gICAgfTtcbiAgICBhbGJlcnNVc2EudHJhbnNsYXRlID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbG93ZXI0OC50cmFuc2xhdGUoKTtcbiAgICAgIHZhciBrID0gbG93ZXI0OC5zY2FsZSgpLCB4ID0gK19bMF0sIHkgPSArX1sxXTtcbiAgICAgIGxvd2VyNDhQb2ludCA9IGxvd2VyNDgudHJhbnNsYXRlKF8pLmNsaXBFeHRlbnQoWyBbIHggLSAuNDU1ICogaywgeSAtIC4yMzggKiBrIF0sIFsgeCArIC40NTUgKiBrLCB5ICsgLjIzOCAqIGsgXSBdKS5zdHJlYW0ocG9pbnRTdHJlYW0pLnBvaW50O1xuICAgICAgYWxhc2thUG9pbnQgPSBhbGFza2EudHJhbnNsYXRlKFsgeCAtIC4zMDcgKiBrLCB5ICsgLjIwMSAqIGsgXSkuY2xpcEV4dGVudChbIFsgeCAtIC40MjUgKiBrICsgzrUsIHkgKyAuMTIgKiBrICsgzrUgXSwgWyB4IC0gLjIxNCAqIGsgLSDOtSwgeSArIC4yMzQgKiBrIC0gzrUgXSBdKS5zdHJlYW0ocG9pbnRTdHJlYW0pLnBvaW50O1xuICAgICAgaGF3YWlpUG9pbnQgPSBoYXdhaWkudHJhbnNsYXRlKFsgeCAtIC4yMDUgKiBrLCB5ICsgLjIxMiAqIGsgXSkuY2xpcEV4dGVudChbIFsgeCAtIC4yMTQgKiBrICsgzrUsIHkgKyAuMTY2ICogayArIM61IF0sIFsgeCAtIC4xMTUgKiBrIC0gzrUsIHkgKyAuMjM0ICogayAtIM61IF0gXSkuc3RyZWFtKHBvaW50U3RyZWFtKS5wb2ludDtcbiAgICAgIHJldHVybiBhbGJlcnNVc2E7XG4gICAgfTtcbiAgICByZXR1cm4gYWxiZXJzVXNhLnNjYWxlKDEwNzApO1xuICB9O1xuICB2YXIgZDNfZ2VvX3BhdGhBcmVhU3VtLCBkM19nZW9fcGF0aEFyZWFQb2x5Z29uLCBkM19nZW9fcGF0aEFyZWEgPSB7XG4gICAgcG9pbnQ6IGQzX25vb3AsXG4gICAgbGluZVN0YXJ0OiBkM19ub29wLFxuICAgIGxpbmVFbmQ6IGQzX25vb3AsXG4gICAgcG9seWdvblN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgIGQzX2dlb19wYXRoQXJlYVBvbHlnb24gPSAwO1xuICAgICAgZDNfZ2VvX3BhdGhBcmVhLmxpbmVTdGFydCA9IGQzX2dlb19wYXRoQXJlYVJpbmdTdGFydDtcbiAgICB9LFxuICAgIHBvbHlnb25FbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgZDNfZ2VvX3BhdGhBcmVhLmxpbmVTdGFydCA9IGQzX2dlb19wYXRoQXJlYS5saW5lRW5kID0gZDNfZ2VvX3BhdGhBcmVhLnBvaW50ID0gZDNfbm9vcDtcbiAgICAgIGQzX2dlb19wYXRoQXJlYVN1bSArPSBNYXRoLmFicyhkM19nZW9fcGF0aEFyZWFQb2x5Z29uIC8gMik7XG4gICAgfVxuICB9O1xuICBmdW5jdGlvbiBkM19nZW9fcGF0aEFyZWFSaW5nU3RhcnQoKSB7XG4gICAgdmFyIHgwMCwgeTAwLCB4MCwgeTA7XG4gICAgZDNfZ2VvX3BhdGhBcmVhLnBvaW50ID0gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgZDNfZ2VvX3BhdGhBcmVhLnBvaW50ID0gbmV4dFBvaW50O1xuICAgICAgeDAwID0geDAgPSB4LCB5MDAgPSB5MCA9IHk7XG4gICAgfTtcbiAgICBmdW5jdGlvbiBuZXh0UG9pbnQoeCwgeSkge1xuICAgICAgZDNfZ2VvX3BhdGhBcmVhUG9seWdvbiArPSB5MCAqIHggLSB4MCAqIHk7XG4gICAgICB4MCA9IHgsIHkwID0geTtcbiAgICB9XG4gICAgZDNfZ2VvX3BhdGhBcmVhLmxpbmVFbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIG5leHRQb2ludCh4MDAsIHkwMCk7XG4gICAgfTtcbiAgfVxuICB2YXIgZDNfZ2VvX3BhdGhCb3VuZHNYMCwgZDNfZ2VvX3BhdGhCb3VuZHNZMCwgZDNfZ2VvX3BhdGhCb3VuZHNYMSwgZDNfZ2VvX3BhdGhCb3VuZHNZMTtcbiAgdmFyIGQzX2dlb19wYXRoQm91bmRzID0ge1xuICAgIHBvaW50OiBkM19nZW9fcGF0aEJvdW5kc1BvaW50LFxuICAgIGxpbmVTdGFydDogZDNfbm9vcCxcbiAgICBsaW5lRW5kOiBkM19ub29wLFxuICAgIHBvbHlnb25TdGFydDogZDNfbm9vcCxcbiAgICBwb2x5Z29uRW5kOiBkM19ub29wXG4gIH07XG4gIGZ1bmN0aW9uIGQzX2dlb19wYXRoQm91bmRzUG9pbnQoeCwgeSkge1xuICAgIGlmICh4IDwgZDNfZ2VvX3BhdGhCb3VuZHNYMCkgZDNfZ2VvX3BhdGhCb3VuZHNYMCA9IHg7XG4gICAgaWYgKHggPiBkM19nZW9fcGF0aEJvdW5kc1gxKSBkM19nZW9fcGF0aEJvdW5kc1gxID0geDtcbiAgICBpZiAoeSA8IGQzX2dlb19wYXRoQm91bmRzWTApIGQzX2dlb19wYXRoQm91bmRzWTAgPSB5O1xuICAgIGlmICh5ID4gZDNfZ2VvX3BhdGhCb3VuZHNZMSkgZDNfZ2VvX3BhdGhCb3VuZHNZMSA9IHk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX3BhdGhCdWZmZXIoKSB7XG4gICAgdmFyIHBvaW50Q2lyY2xlID0gZDNfZ2VvX3BhdGhCdWZmZXJDaXJjbGUoNC41KSwgYnVmZmVyID0gW107XG4gICAgdmFyIHN0cmVhbSA9IHtcbiAgICAgIHBvaW50OiBwb2ludCxcbiAgICAgIGxpbmVTdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHN0cmVhbS5wb2ludCA9IHBvaW50TGluZVN0YXJ0O1xuICAgICAgfSxcbiAgICAgIGxpbmVFbmQ6IGxpbmVFbmQsXG4gICAgICBwb2x5Z29uU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBzdHJlYW0ubGluZUVuZCA9IGxpbmVFbmRQb2x5Z29uO1xuICAgICAgfSxcbiAgICAgIHBvbHlnb25FbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBzdHJlYW0ubGluZUVuZCA9IGxpbmVFbmQ7XG4gICAgICAgIHN0cmVhbS5wb2ludCA9IHBvaW50O1xuICAgICAgfSxcbiAgICAgIHBvaW50UmFkaXVzOiBmdW5jdGlvbihfKSB7XG4gICAgICAgIHBvaW50Q2lyY2xlID0gZDNfZ2VvX3BhdGhCdWZmZXJDaXJjbGUoXyk7XG4gICAgICAgIHJldHVybiBzdHJlYW07XG4gICAgICB9LFxuICAgICAgcmVzdWx0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gYnVmZmVyLmpvaW4oXCJcIik7XG4gICAgICAgICAgYnVmZmVyID0gW107XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgZnVuY3Rpb24gcG9pbnQoeCwgeSkge1xuICAgICAgYnVmZmVyLnB1c2goXCJNXCIsIHgsIFwiLFwiLCB5LCBwb2ludENpcmNsZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBvaW50TGluZVN0YXJ0KHgsIHkpIHtcbiAgICAgIGJ1ZmZlci5wdXNoKFwiTVwiLCB4LCBcIixcIiwgeSk7XG4gICAgICBzdHJlYW0ucG9pbnQgPSBwb2ludExpbmU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBvaW50TGluZSh4LCB5KSB7XG4gICAgICBidWZmZXIucHVzaChcIkxcIiwgeCwgXCIsXCIsIHkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBsaW5lRW5kKCkge1xuICAgICAgc3RyZWFtLnBvaW50ID0gcG9pbnQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxpbmVFbmRQb2x5Z29uKCkge1xuICAgICAgYnVmZmVyLnB1c2goXCJaXCIpO1xuICAgIH1cbiAgICByZXR1cm4gc3RyZWFtO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19wYXRoQnVmZmVyQ2lyY2xlKHJhZGl1cykge1xuICAgIHJldHVybiBcIm0wLFwiICsgcmFkaXVzICsgXCJhXCIgKyByYWRpdXMgKyBcIixcIiArIHJhZGl1cyArIFwiIDAgMSwxIDAsXCIgKyAtMiAqIHJhZGl1cyArIFwiYVwiICsgcmFkaXVzICsgXCIsXCIgKyByYWRpdXMgKyBcIiAwIDEsMSAwLFwiICsgMiAqIHJhZGl1cyArIFwielwiO1xuICB9XG4gIHZhciBkM19nZW9fcGF0aENlbnRyb2lkID0ge1xuICAgIHBvaW50OiBkM19nZW9fcGF0aENlbnRyb2lkUG9pbnQsXG4gICAgbGluZVN0YXJ0OiBkM19nZW9fcGF0aENlbnRyb2lkTGluZVN0YXJ0LFxuICAgIGxpbmVFbmQ6IGQzX2dlb19wYXRoQ2VudHJvaWRMaW5lRW5kLFxuICAgIHBvbHlnb25TdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICBkM19nZW9fcGF0aENlbnRyb2lkLmxpbmVTdGFydCA9IGQzX2dlb19wYXRoQ2VudHJvaWRSaW5nU3RhcnQ7XG4gICAgfSxcbiAgICBwb2x5Z29uRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgIGQzX2dlb19wYXRoQ2VudHJvaWQucG9pbnQgPSBkM19nZW9fcGF0aENlbnRyb2lkUG9pbnQ7XG4gICAgICBkM19nZW9fcGF0aENlbnRyb2lkLmxpbmVTdGFydCA9IGQzX2dlb19wYXRoQ2VudHJvaWRMaW5lU3RhcnQ7XG4gICAgICBkM19nZW9fcGF0aENlbnRyb2lkLmxpbmVFbmQgPSBkM19nZW9fcGF0aENlbnRyb2lkTGluZUVuZDtcbiAgICB9XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2dlb19wYXRoQ2VudHJvaWRQb2ludCh4LCB5KSB7XG4gICAgZDNfZ2VvX2NlbnRyb2lkWDAgKz0geDtcbiAgICBkM19nZW9fY2VudHJvaWRZMCArPSB5O1xuICAgICsrZDNfZ2VvX2NlbnRyb2lkWjA7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX3BhdGhDZW50cm9pZExpbmVTdGFydCgpIHtcbiAgICB2YXIgeDAsIHkwO1xuICAgIGQzX2dlb19wYXRoQ2VudHJvaWQucG9pbnQgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgICBkM19nZW9fcGF0aENlbnRyb2lkLnBvaW50ID0gbmV4dFBvaW50O1xuICAgICAgZDNfZ2VvX3BhdGhDZW50cm9pZFBvaW50KHgwID0geCwgeTAgPSB5KTtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIG5leHRQb2ludCh4LCB5KSB7XG4gICAgICB2YXIgZHggPSB4IC0geDAsIGR5ID0geSAtIHkwLCB6ID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgIGQzX2dlb19jZW50cm9pZFgxICs9IHogKiAoeDAgKyB4KSAvIDI7XG4gICAgICBkM19nZW9fY2VudHJvaWRZMSArPSB6ICogKHkwICsgeSkgLyAyO1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkWjEgKz0gejtcbiAgICAgIGQzX2dlb19wYXRoQ2VudHJvaWRQb2ludCh4MCA9IHgsIHkwID0geSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19wYXRoQ2VudHJvaWRMaW5lRW5kKCkge1xuICAgIGQzX2dlb19wYXRoQ2VudHJvaWQucG9pbnQgPSBkM19nZW9fcGF0aENlbnRyb2lkUG9pbnQ7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX3BhdGhDZW50cm9pZFJpbmdTdGFydCgpIHtcbiAgICB2YXIgeDAwLCB5MDAsIHgwLCB5MDtcbiAgICBkM19nZW9fcGF0aENlbnRyb2lkLnBvaW50ID0gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgZDNfZ2VvX3BhdGhDZW50cm9pZC5wb2ludCA9IG5leHRQb2ludDtcbiAgICAgIGQzX2dlb19wYXRoQ2VudHJvaWRQb2ludCh4MDAgPSB4MCA9IHgsIHkwMCA9IHkwID0geSk7XG4gICAgfTtcbiAgICBmdW5jdGlvbiBuZXh0UG9pbnQoeCwgeSkge1xuICAgICAgdmFyIGR4ID0geCAtIHgwLCBkeSA9IHkgLSB5MCwgeiA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICBkM19nZW9fY2VudHJvaWRYMSArPSB6ICogKHgwICsgeCkgLyAyO1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkWTEgKz0geiAqICh5MCArIHkpIC8gMjtcbiAgICAgIGQzX2dlb19jZW50cm9pZFoxICs9IHo7XG4gICAgICB6ID0geTAgKiB4IC0geDAgKiB5O1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkWDIgKz0geiAqICh4MCArIHgpO1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkWTIgKz0geiAqICh5MCArIHkpO1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkWjIgKz0geiAqIDM7XG4gICAgICBkM19nZW9fcGF0aENlbnRyb2lkUG9pbnQoeDAgPSB4LCB5MCA9IHkpO1xuICAgIH1cbiAgICBkM19nZW9fcGF0aENlbnRyb2lkLmxpbmVFbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIG5leHRQb2ludCh4MDAsIHkwMCk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fcGF0aENvbnRleHQoY29udGV4dCkge1xuICAgIHZhciBwb2ludFJhZGl1cyA9IDQuNTtcbiAgICB2YXIgc3RyZWFtID0ge1xuICAgICAgcG9pbnQ6IHBvaW50LFxuICAgICAgbGluZVN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgc3RyZWFtLnBvaW50ID0gcG9pbnRMaW5lU3RhcnQ7XG4gICAgICB9LFxuICAgICAgbGluZUVuZDogbGluZUVuZCxcbiAgICAgIHBvbHlnb25TdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHN0cmVhbS5saW5lRW5kID0gbGluZUVuZFBvbHlnb247XG4gICAgICB9LFxuICAgICAgcG9seWdvbkVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHN0cmVhbS5saW5lRW5kID0gbGluZUVuZDtcbiAgICAgICAgc3RyZWFtLnBvaW50ID0gcG9pbnQ7XG4gICAgICB9LFxuICAgICAgcG9pbnRSYWRpdXM6IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgcG9pbnRSYWRpdXMgPSBfO1xuICAgICAgICByZXR1cm4gc3RyZWFtO1xuICAgICAgfSxcbiAgICAgIHJlc3VsdDogZDNfbm9vcFxuICAgIH07XG4gICAgZnVuY3Rpb24gcG9pbnQoeCwgeSkge1xuICAgICAgY29udGV4dC5tb3ZlVG8oeCwgeSk7XG4gICAgICBjb250ZXh0LmFyYyh4LCB5LCBwb2ludFJhZGl1cywgMCwgMiAqIM+AKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcG9pbnRMaW5lU3RhcnQoeCwgeSkge1xuICAgICAgY29udGV4dC5tb3ZlVG8oeCwgeSk7XG4gICAgICBzdHJlYW0ucG9pbnQgPSBwb2ludExpbmU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBvaW50TGluZSh4LCB5KSB7XG4gICAgICBjb250ZXh0LmxpbmVUbyh4LCB5KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbGluZUVuZCgpIHtcbiAgICAgIHN0cmVhbS5wb2ludCA9IHBvaW50O1xuICAgIH1cbiAgICBmdW5jdGlvbiBsaW5lRW5kUG9seWdvbigpIHtcbiAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgfVxuICAgIHJldHVybiBzdHJlYW07XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX3Jlc2FtcGxlKHByb2plY3QpIHtcbiAgICB2YXIgzrQyID0gLjUsIGNvc01pbkRpc3RhbmNlID0gTWF0aC5jb3MoMzAgKiBkM19yYWRpYW5zKSwgbWF4RGVwdGggPSAxNjtcbiAgICBmdW5jdGlvbiByZXNhbXBsZShzdHJlYW0pIHtcbiAgICAgIHZhciDOuzAwLCDPhjAwLCB4MDAsIHkwMCwgYTAwLCBiMDAsIGMwMCwgzrswLCB4MCwgeTAsIGEwLCBiMCwgYzA7XG4gICAgICB2YXIgcmVzYW1wbGUgPSB7XG4gICAgICAgIHBvaW50OiBwb2ludCxcbiAgICAgICAgbGluZVN0YXJ0OiBsaW5lU3RhcnQsXG4gICAgICAgIGxpbmVFbmQ6IGxpbmVFbmQsXG4gICAgICAgIHBvbHlnb25TdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc3RyZWFtLnBvbHlnb25TdGFydCgpO1xuICAgICAgICAgIHJlc2FtcGxlLmxpbmVTdGFydCA9IHJpbmdTdGFydDtcbiAgICAgICAgfSxcbiAgICAgICAgcG9seWdvbkVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc3RyZWFtLnBvbHlnb25FbmQoKTtcbiAgICAgICAgICByZXNhbXBsZS5saW5lU3RhcnQgPSBsaW5lU3RhcnQ7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBmdW5jdGlvbiBwb2ludCh4LCB5KSB7XG4gICAgICAgIHggPSBwcm9qZWN0KHgsIHkpO1xuICAgICAgICBzdHJlYW0ucG9pbnQoeFswXSwgeFsxXSk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBsaW5lU3RhcnQoKSB7XG4gICAgICAgIHgwID0gTmFOO1xuICAgICAgICByZXNhbXBsZS5wb2ludCA9IGxpbmVQb2ludDtcbiAgICAgICAgc3RyZWFtLmxpbmVTdGFydCgpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gbGluZVBvaW50KM67LCDPhikge1xuICAgICAgICB2YXIgYyA9IGQzX2dlb19jYXJ0ZXNpYW4oWyDOuywgz4YgXSksIHAgPSBwcm9qZWN0KM67LCDPhik7XG4gICAgICAgIHJlc2FtcGxlTGluZVRvKHgwLCB5MCwgzrswLCBhMCwgYjAsIGMwLCB4MCA9IHBbMF0sIHkwID0gcFsxXSwgzrswID0gzrssIGEwID0gY1swXSwgYjAgPSBjWzFdLCBjMCA9IGNbMl0sIG1heERlcHRoLCBzdHJlYW0pO1xuICAgICAgICBzdHJlYW0ucG9pbnQoeDAsIHkwKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGxpbmVFbmQoKSB7XG4gICAgICAgIHJlc2FtcGxlLnBvaW50ID0gcG9pbnQ7XG4gICAgICAgIHN0cmVhbS5saW5lRW5kKCk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiByaW5nU3RhcnQoKSB7XG4gICAgICAgIGxpbmVTdGFydCgpO1xuICAgICAgICByZXNhbXBsZS5wb2ludCA9IHJpbmdQb2ludDtcbiAgICAgICAgcmVzYW1wbGUubGluZUVuZCA9IHJpbmdFbmQ7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiByaW5nUG9pbnQozrssIM+GKSB7XG4gICAgICAgIGxpbmVQb2ludCjOuzAwID0gzrssIM+GMDAgPSDPhiksIHgwMCA9IHgwLCB5MDAgPSB5MCwgYTAwID0gYTAsIGIwMCA9IGIwLCBjMDAgPSBjMDtcbiAgICAgICAgcmVzYW1wbGUucG9pbnQgPSBsaW5lUG9pbnQ7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiByaW5nRW5kKCkge1xuICAgICAgICByZXNhbXBsZUxpbmVUbyh4MCwgeTAsIM67MCwgYTAsIGIwLCBjMCwgeDAwLCB5MDAsIM67MDAsIGEwMCwgYjAwLCBjMDAsIG1heERlcHRoLCBzdHJlYW0pO1xuICAgICAgICByZXNhbXBsZS5saW5lRW5kID0gbGluZUVuZDtcbiAgICAgICAgbGluZUVuZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc2FtcGxlO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXNhbXBsZUxpbmVUbyh4MCwgeTAsIM67MCwgYTAsIGIwLCBjMCwgeDEsIHkxLCDOuzEsIGExLCBiMSwgYzEsIGRlcHRoLCBzdHJlYW0pIHtcbiAgICAgIHZhciBkeCA9IHgxIC0geDAsIGR5ID0geTEgLSB5MCwgZDIgPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICAgIGlmIChkMiA+IDQgKiDOtDIgJiYgZGVwdGgtLSkge1xuICAgICAgICB2YXIgYSA9IGEwICsgYTEsIGIgPSBiMCArIGIxLCBjID0gYzAgKyBjMSwgbSA9IE1hdGguc3FydChhICogYSArIGIgKiBiICsgYyAqIGMpLCDPhjIgPSBNYXRoLmFzaW4oYyAvPSBtKSwgzrsyID0gTWF0aC5hYnMoTWF0aC5hYnMoYykgLSAxKSA8IM61ID8gKM67MCArIM67MSkgLyAyIDogTWF0aC5hdGFuMihiLCBhKSwgcCA9IHByb2plY3QozrsyLCDPhjIpLCB4MiA9IHBbMF0sIHkyID0gcFsxXSwgZHgyID0geDIgLSB4MCwgZHkyID0geTIgLSB5MCwgZHogPSBkeSAqIGR4MiAtIGR4ICogZHkyO1xuICAgICAgICBpZiAoZHogKiBkeiAvIGQyID4gzrQyIHx8IE1hdGguYWJzKChkeCAqIGR4MiArIGR5ICogZHkyKSAvIGQyIC0gLjUpID4gLjMgfHwgYTAgKiBhMSArIGIwICogYjEgKyBjMCAqIGMxIDwgY29zTWluRGlzdGFuY2UpIHtcbiAgICAgICAgICByZXNhbXBsZUxpbmVUbyh4MCwgeTAsIM67MCwgYTAsIGIwLCBjMCwgeDIsIHkyLCDOuzIsIGEgLz0gbSwgYiAvPSBtLCBjLCBkZXB0aCwgc3RyZWFtKTtcbiAgICAgICAgICBzdHJlYW0ucG9pbnQoeDIsIHkyKTtcbiAgICAgICAgICByZXNhbXBsZUxpbmVUbyh4MiwgeTIsIM67MiwgYSwgYiwgYywgeDEsIHkxLCDOuzEsIGExLCBiMSwgYzEsIGRlcHRoLCBzdHJlYW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJlc2FtcGxlLnByZWNpc2lvbiA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIE1hdGguc3FydCjOtDIpO1xuICAgICAgbWF4RGVwdGggPSAozrQyID0gXyAqIF8pID4gMCAmJiAxNjtcbiAgICAgIHJldHVybiByZXNhbXBsZTtcbiAgICB9O1xuICAgIHJldHVybiByZXNhbXBsZTtcbiAgfVxuICBkMy5nZW8ucGF0aCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwb2ludFJhZGl1cyA9IDQuNSwgcHJvamVjdGlvbiwgY29udGV4dCwgcHJvamVjdFN0cmVhbSwgY29udGV4dFN0cmVhbSwgY2FjaGVTdHJlYW07XG4gICAgZnVuY3Rpb24gcGF0aChvYmplY3QpIHtcbiAgICAgIGlmIChvYmplY3QpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwb2ludFJhZGl1cyA9PT0gXCJmdW5jdGlvblwiKSBjb250ZXh0U3RyZWFtLnBvaW50UmFkaXVzKCtwb2ludFJhZGl1cy5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICAgICAgaWYgKCFjYWNoZVN0cmVhbSB8fCAhY2FjaGVTdHJlYW0udmFsaWQpIGNhY2hlU3RyZWFtID0gcHJvamVjdFN0cmVhbShjb250ZXh0U3RyZWFtKTtcbiAgICAgICAgZDMuZ2VvLnN0cmVhbShvYmplY3QsIGNhY2hlU3RyZWFtKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZXh0U3RyZWFtLnJlc3VsdCgpO1xuICAgIH1cbiAgICBwYXRoLmFyZWEgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgIGQzX2dlb19wYXRoQXJlYVN1bSA9IDA7XG4gICAgICBkMy5nZW8uc3RyZWFtKG9iamVjdCwgcHJvamVjdFN0cmVhbShkM19nZW9fcGF0aEFyZWEpKTtcbiAgICAgIHJldHVybiBkM19nZW9fcGF0aEFyZWFTdW07XG4gICAgfTtcbiAgICBwYXRoLmNlbnRyb2lkID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICBkM19nZW9fY2VudHJvaWRYMCA9IGQzX2dlb19jZW50cm9pZFkwID0gZDNfZ2VvX2NlbnRyb2lkWjAgPSBkM19nZW9fY2VudHJvaWRYMSA9IGQzX2dlb19jZW50cm9pZFkxID0gZDNfZ2VvX2NlbnRyb2lkWjEgPSBkM19nZW9fY2VudHJvaWRYMiA9IGQzX2dlb19jZW50cm9pZFkyID0gZDNfZ2VvX2NlbnRyb2lkWjIgPSAwO1xuICAgICAgZDMuZ2VvLnN0cmVhbShvYmplY3QsIHByb2plY3RTdHJlYW0oZDNfZ2VvX3BhdGhDZW50cm9pZCkpO1xuICAgICAgcmV0dXJuIGQzX2dlb19jZW50cm9pZFoyID8gWyBkM19nZW9fY2VudHJvaWRYMiAvIGQzX2dlb19jZW50cm9pZFoyLCBkM19nZW9fY2VudHJvaWRZMiAvIGQzX2dlb19jZW50cm9pZFoyIF0gOiBkM19nZW9fY2VudHJvaWRaMSA/IFsgZDNfZ2VvX2NlbnRyb2lkWDEgLyBkM19nZW9fY2VudHJvaWRaMSwgZDNfZ2VvX2NlbnRyb2lkWTEgLyBkM19nZW9fY2VudHJvaWRaMSBdIDogZDNfZ2VvX2NlbnRyb2lkWjAgPyBbIGQzX2dlb19jZW50cm9pZFgwIC8gZDNfZ2VvX2NlbnRyb2lkWjAsIGQzX2dlb19jZW50cm9pZFkwIC8gZDNfZ2VvX2NlbnRyb2lkWjAgXSA6IFsgTmFOLCBOYU4gXTtcbiAgICB9O1xuICAgIHBhdGguYm91bmRzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICBkM19nZW9fcGF0aEJvdW5kc1gxID0gZDNfZ2VvX3BhdGhCb3VuZHNZMSA9IC0oZDNfZ2VvX3BhdGhCb3VuZHNYMCA9IGQzX2dlb19wYXRoQm91bmRzWTAgPSBJbmZpbml0eSk7XG4gICAgICBkMy5nZW8uc3RyZWFtKG9iamVjdCwgcHJvamVjdFN0cmVhbShkM19nZW9fcGF0aEJvdW5kcykpO1xuICAgICAgcmV0dXJuIFsgWyBkM19nZW9fcGF0aEJvdW5kc1gwLCBkM19nZW9fcGF0aEJvdW5kc1kwIF0sIFsgZDNfZ2VvX3BhdGhCb3VuZHNYMSwgZDNfZ2VvX3BhdGhCb3VuZHNZMSBdIF07XG4gICAgfTtcbiAgICBwYXRoLnByb2plY3Rpb24gPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBwcm9qZWN0aW9uO1xuICAgICAgcHJvamVjdFN0cmVhbSA9IChwcm9qZWN0aW9uID0gXykgPyBfLnN0cmVhbSB8fCBkM19nZW9fcGF0aFByb2plY3RTdHJlYW0oXykgOiBkM19pZGVudGl0eTtcbiAgICAgIHJldHVybiByZXNldCgpO1xuICAgIH07XG4gICAgcGF0aC5jb250ZXh0ID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGV4dDtcbiAgICAgIGNvbnRleHRTdHJlYW0gPSAoY29udGV4dCA9IF8pID09IG51bGwgPyBuZXcgZDNfZ2VvX3BhdGhCdWZmZXIoKSA6IG5ldyBkM19nZW9fcGF0aENvbnRleHQoXyk7XG4gICAgICBpZiAodHlwZW9mIHBvaW50UmFkaXVzICE9PSBcImZ1bmN0aW9uXCIpIGNvbnRleHRTdHJlYW0ucG9pbnRSYWRpdXMocG9pbnRSYWRpdXMpO1xuICAgICAgcmV0dXJuIHJlc2V0KCk7XG4gICAgfTtcbiAgICBwYXRoLnBvaW50UmFkaXVzID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gcG9pbnRSYWRpdXM7XG4gICAgICBwb2ludFJhZGl1cyA9IHR5cGVvZiBfID09PSBcImZ1bmN0aW9uXCIgPyBfIDogKGNvbnRleHRTdHJlYW0ucG9pbnRSYWRpdXMoK18pLCArXyk7XG4gICAgICByZXR1cm4gcGF0aDtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgY2FjaGVTdHJlYW0gPSBudWxsO1xuICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuICAgIHJldHVybiBwYXRoLnByb2plY3Rpb24oZDMuZ2VvLmFsYmVyc1VzYSgpKS5jb250ZXh0KG51bGwpO1xuICB9O1xuICBmdW5jdGlvbiBkM19nZW9fcGF0aFByb2plY3RTdHJlYW0ocHJvamVjdCkge1xuICAgIHZhciByZXNhbXBsZSA9IGQzX2dlb19yZXNhbXBsZShmdW5jdGlvbijOuywgz4YpIHtcbiAgICAgIHJldHVybiBwcm9qZWN0KFsgzrsgKiBkM19kZWdyZWVzLCDPhiAqIGQzX2RlZ3JlZXMgXSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgc3RyZWFtID0gcmVzYW1wbGUoc3RyZWFtKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBvaW50OiBmdW5jdGlvbijOuywgz4YpIHtcbiAgICAgICAgICBzdHJlYW0ucG9pbnQozrsgKiBkM19yYWRpYW5zLCDPhiAqIGQzX3JhZGlhbnMpO1xuICAgICAgICB9LFxuICAgICAgICBzcGhlcmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHN0cmVhbS5zcGhlcmUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgbGluZVN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzdHJlYW0ubGluZVN0YXJ0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGxpbmVFbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHN0cmVhbS5saW5lRW5kKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHBvbHlnb25TdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc3RyZWFtLnBvbHlnb25TdGFydCgpO1xuICAgICAgICB9LFxuICAgICAgICBwb2x5Z29uRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzdHJlYW0ucG9seWdvbkVuZCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gIH1cbiAgZDMuZ2VvLnByb2plY3Rpb24gPSBkM19nZW9fcHJvamVjdGlvbjtcbiAgZDMuZ2VvLnByb2plY3Rpb25NdXRhdG9yID0gZDNfZ2VvX3Byb2plY3Rpb25NdXRhdG9yO1xuICBmdW5jdGlvbiBkM19nZW9fcHJvamVjdGlvbihwcm9qZWN0KSB7XG4gICAgcmV0dXJuIGQzX2dlb19wcm9qZWN0aW9uTXV0YXRvcihmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBwcm9qZWN0O1xuICAgIH0pKCk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX3Byb2plY3Rpb25NdXRhdG9yKHByb2plY3RBdCkge1xuICAgIHZhciBwcm9qZWN0LCByb3RhdGUsIHByb2plY3RSb3RhdGUsIHByb2plY3RSZXNhbXBsZSA9IGQzX2dlb19yZXNhbXBsZShmdW5jdGlvbih4LCB5KSB7XG4gICAgICB4ID0gcHJvamVjdCh4LCB5KTtcbiAgICAgIHJldHVybiBbIHhbMF0gKiBrICsgzrR4LCDOtHkgLSB4WzFdICogayBdO1xuICAgIH0pLCBrID0gMTUwLCB4ID0gNDgwLCB5ID0gMjUwLCDOuyA9IDAsIM+GID0gMCwgzrTOuyA9IDAsIM60z4YgPSAwLCDOtM6zID0gMCwgzrR4LCDOtHksIHByZWNsaXAgPSBkM19nZW9fY2xpcEFudGltZXJpZGlhbiwgcG9zdGNsaXAgPSBkM19pZGVudGl0eSwgY2xpcEFuZ2xlID0gbnVsbCwgY2xpcEV4dGVudCA9IG51bGwsIHN0cmVhbTtcbiAgICBmdW5jdGlvbiBwcm9qZWN0aW9uKHBvaW50KSB7XG4gICAgICBwb2ludCA9IHByb2plY3RSb3RhdGUocG9pbnRbMF0gKiBkM19yYWRpYW5zLCBwb2ludFsxXSAqIGQzX3JhZGlhbnMpO1xuICAgICAgcmV0dXJuIFsgcG9pbnRbMF0gKiBrICsgzrR4LCDOtHkgLSBwb2ludFsxXSAqIGsgXTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW52ZXJ0KHBvaW50KSB7XG4gICAgICBwb2ludCA9IHByb2plY3RSb3RhdGUuaW52ZXJ0KChwb2ludFswXSAtIM60eCkgLyBrLCAozrR5IC0gcG9pbnRbMV0pIC8gayk7XG4gICAgICByZXR1cm4gcG9pbnQgJiYgWyBwb2ludFswXSAqIGQzX2RlZ3JlZXMsIHBvaW50WzFdICogZDNfZGVncmVlcyBdO1xuICAgIH1cbiAgICBwcm9qZWN0aW9uLnN0cmVhbSA9IGZ1bmN0aW9uKG91dHB1dCkge1xuICAgICAgaWYgKHN0cmVhbSkgc3RyZWFtLnZhbGlkID0gZmFsc2U7XG4gICAgICBzdHJlYW0gPSBkM19nZW9fcHJvamVjdGlvblJhZGlhbnNSb3RhdGUocm90YXRlLCBwcmVjbGlwKHByb2plY3RSZXNhbXBsZShwb3N0Y2xpcChvdXRwdXQpKSkpO1xuICAgICAgc3RyZWFtLnZhbGlkID0gdHJ1ZTtcbiAgICAgIHJldHVybiBzdHJlYW07XG4gICAgfTtcbiAgICBwcm9qZWN0aW9uLmNsaXBBbmdsZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNsaXBBbmdsZTtcbiAgICAgIHByZWNsaXAgPSBfID09IG51bGwgPyAoY2xpcEFuZ2xlID0gXywgZDNfZ2VvX2NsaXBBbnRpbWVyaWRpYW4pIDogZDNfZ2VvX2NsaXBDaXJjbGUoKGNsaXBBbmdsZSA9ICtfKSAqIGQzX3JhZGlhbnMpO1xuICAgICAgcmV0dXJuIGludmFsaWRhdGUoKTtcbiAgICB9O1xuICAgIHByb2plY3Rpb24uY2xpcEV4dGVudCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNsaXBFeHRlbnQ7XG4gICAgICBjbGlwRXh0ZW50ID0gXztcbiAgICAgIHBvc3RjbGlwID0gXyA9PSBudWxsID8gZDNfaWRlbnRpdHkgOiBkM19nZW9fY2xpcFZpZXcoX1swXVswXSwgX1swXVsxXSwgX1sxXVswXSwgX1sxXVsxXSk7XG4gICAgICByZXR1cm4gaW52YWxpZGF0ZSgpO1xuICAgIH07XG4gICAgcHJvamVjdGlvbi5zY2FsZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGs7XG4gICAgICBrID0gK187XG4gICAgICByZXR1cm4gcmVzZXQoKTtcbiAgICB9O1xuICAgIHByb2plY3Rpb24udHJhbnNsYXRlID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gWyB4LCB5IF07XG4gICAgICB4ID0gK19bMF07XG4gICAgICB5ID0gK19bMV07XG4gICAgICByZXR1cm4gcmVzZXQoKTtcbiAgICB9O1xuICAgIHByb2plY3Rpb24uY2VudGVyID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gWyDOuyAqIGQzX2RlZ3JlZXMsIM+GICogZDNfZGVncmVlcyBdO1xuICAgICAgzrsgPSBfWzBdICUgMzYwICogZDNfcmFkaWFucztcbiAgICAgIM+GID0gX1sxXSAlIDM2MCAqIGQzX3JhZGlhbnM7XG4gICAgICByZXR1cm4gcmVzZXQoKTtcbiAgICB9O1xuICAgIHByb2plY3Rpb24ucm90YXRlID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gWyDOtM67ICogZDNfZGVncmVlcywgzrTPhiAqIGQzX2RlZ3JlZXMsIM60zrMgKiBkM19kZWdyZWVzIF07XG4gICAgICDOtM67ID0gX1swXSAlIDM2MCAqIGQzX3JhZGlhbnM7XG4gICAgICDOtM+GID0gX1sxXSAlIDM2MCAqIGQzX3JhZGlhbnM7XG4gICAgICDOtM6zID0gXy5sZW5ndGggPiAyID8gX1syXSAlIDM2MCAqIGQzX3JhZGlhbnMgOiAwO1xuICAgICAgcmV0dXJuIHJlc2V0KCk7XG4gICAgfTtcbiAgICBkMy5yZWJpbmQocHJvamVjdGlvbiwgcHJvamVjdFJlc2FtcGxlLCBcInByZWNpc2lvblwiKTtcbiAgICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgIHByb2plY3RSb3RhdGUgPSBkM19nZW9fY29tcG9zZShyb3RhdGUgPSBkM19nZW9fcm90YXRpb24ozrTOuywgzrTPhiwgzrTOsyksIHByb2plY3QpO1xuICAgICAgdmFyIGNlbnRlciA9IHByb2plY3QozrssIM+GKTtcbiAgICAgIM60eCA9IHggLSBjZW50ZXJbMF0gKiBrO1xuICAgICAgzrR5ID0geSArIGNlbnRlclsxXSAqIGs7XG4gICAgICByZXR1cm4gaW52YWxpZGF0ZSgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbnZhbGlkYXRlKCkge1xuICAgICAgaWYgKHN0cmVhbSkge1xuICAgICAgICBzdHJlYW0udmFsaWQgPSBmYWxzZTtcbiAgICAgICAgc3RyZWFtID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwcm9qZWN0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBwcm9qZWN0ID0gcHJvamVjdEF0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICBwcm9qZWN0aW9uLmludmVydCA9IHByb2plY3QuaW52ZXJ0ICYmIGludmVydDtcbiAgICAgIHJldHVybiByZXNldCgpO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX3Byb2plY3Rpb25SYWRpYW5zUm90YXRlKHJvdGF0ZSwgc3RyZWFtKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBvaW50OiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIHkgPSByb3RhdGUoeCAqIGQzX3JhZGlhbnMsIHkgKiBkM19yYWRpYW5zKSwgeCA9IHlbMF07XG4gICAgICAgIHN0cmVhbS5wb2ludCh4ID4gz4AgPyB4IC0gMiAqIM+AIDogeCA8IC3PgCA/IHggKyAyICogz4AgOiB4LCB5WzFdKTtcbiAgICAgIH0sXG4gICAgICBzcGhlcmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBzdHJlYW0uc3BoZXJlKCk7XG4gICAgICB9LFxuICAgICAgbGluZVN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgc3RyZWFtLmxpbmVTdGFydCgpO1xuICAgICAgfSxcbiAgICAgIGxpbmVFbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBzdHJlYW0ubGluZUVuZCgpO1xuICAgICAgfSxcbiAgICAgIHBvbHlnb25TdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHN0cmVhbS5wb2x5Z29uU3RhcnQoKTtcbiAgICAgIH0sXG4gICAgICBwb2x5Z29uRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgc3RyZWFtLnBvbHlnb25FbmQoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19lcXVpcmVjdGFuZ3VsYXIozrssIM+GKSB7XG4gICAgcmV0dXJuIFsgzrssIM+GIF07XG4gIH1cbiAgKGQzLmdlby5lcXVpcmVjdGFuZ3VsYXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfZ2VvX3Byb2plY3Rpb24oZDNfZ2VvX2VxdWlyZWN0YW5ndWxhcik7XG4gIH0pLnJhdyA9IGQzX2dlb19lcXVpcmVjdGFuZ3VsYXIuaW52ZXJ0ID0gZDNfZ2VvX2VxdWlyZWN0YW5ndWxhcjtcbiAgZDMuZ2VvLnJvdGF0aW9uID0gZnVuY3Rpb24ocm90YXRlKSB7XG4gICAgcm90YXRlID0gZDNfZ2VvX3JvdGF0aW9uKHJvdGF0ZVswXSAlIDM2MCAqIGQzX3JhZGlhbnMsIHJvdGF0ZVsxXSAqIGQzX3JhZGlhbnMsIHJvdGF0ZS5sZW5ndGggPiAyID8gcm90YXRlWzJdICogZDNfcmFkaWFucyA6IDApO1xuICAgIGZ1bmN0aW9uIGZvcndhcmQoY29vcmRpbmF0ZXMpIHtcbiAgICAgIGNvb3JkaW5hdGVzID0gcm90YXRlKGNvb3JkaW5hdGVzWzBdICogZDNfcmFkaWFucywgY29vcmRpbmF0ZXNbMV0gKiBkM19yYWRpYW5zKTtcbiAgICAgIHJldHVybiBjb29yZGluYXRlc1swXSAqPSBkM19kZWdyZWVzLCBjb29yZGluYXRlc1sxXSAqPSBkM19kZWdyZWVzLCBjb29yZGluYXRlcztcbiAgICB9XG4gICAgZm9yd2FyZC5pbnZlcnQgPSBmdW5jdGlvbihjb29yZGluYXRlcykge1xuICAgICAgY29vcmRpbmF0ZXMgPSByb3RhdGUuaW52ZXJ0KGNvb3JkaW5hdGVzWzBdICogZDNfcmFkaWFucywgY29vcmRpbmF0ZXNbMV0gKiBkM19yYWRpYW5zKTtcbiAgICAgIHJldHVybiBjb29yZGluYXRlc1swXSAqPSBkM19kZWdyZWVzLCBjb29yZGluYXRlc1sxXSAqPSBkM19kZWdyZWVzLCBjb29yZGluYXRlcztcbiAgICB9O1xuICAgIHJldHVybiBmb3J3YXJkO1xuICB9O1xuICBmdW5jdGlvbiBkM19nZW9fcm90YXRpb24ozrTOuywgzrTPhiwgzrTOsykge1xuICAgIHJldHVybiDOtM67ID8gzrTPhiB8fCDOtM6zID8gZDNfZ2VvX2NvbXBvc2UoZDNfZ2VvX3JvdGF0aW9uzrsozrTOuyksIGQzX2dlb19yb3RhdGlvbs+GzrMozrTPhiwgzrTOsykpIDogZDNfZ2VvX3JvdGF0aW9uzrsozrTOuykgOiDOtM+GIHx8IM60zrMgPyBkM19nZW9fcm90YXRpb27Phs6zKM60z4YsIM60zrMpIDogZDNfZ2VvX2VxdWlyZWN0YW5ndWxhcjtcbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fZm9yd2FyZFJvdGF0aW9uzrsozrTOuykge1xuICAgIHJldHVybiBmdW5jdGlvbijOuywgz4YpIHtcbiAgICAgIHJldHVybiDOuyArPSDOtM67LCBbIM67ID4gz4AgPyDOuyAtIDIgKiDPgCA6IM67IDwgLc+AID8gzrsgKyAyICogz4AgOiDOuywgz4YgXTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19yb3RhdGlvbs67KM60zrspIHtcbiAgICB2YXIgcm90YXRpb24gPSBkM19nZW9fZm9yd2FyZFJvdGF0aW9uzrsozrTOuyk7XG4gICAgcm90YXRpb24uaW52ZXJ0ID0gZDNfZ2VvX2ZvcndhcmRSb3RhdGlvbs67KC3OtM67KTtcbiAgICByZXR1cm4gcm90YXRpb247XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX3JvdGF0aW9uz4bOsyjOtM+GLCDOtM6zKSB7XG4gICAgdmFyIGNvc860z4YgPSBNYXRoLmNvcyjOtM+GKSwgc2luzrTPhiA9IE1hdGguc2luKM60z4YpLCBjb3POtM6zID0gTWF0aC5jb3MozrTOsyksIHNpbs60zrMgPSBNYXRoLnNpbijOtM6zKTtcbiAgICBmdW5jdGlvbiByb3RhdGlvbijOuywgz4YpIHtcbiAgICAgIHZhciBjb3PPhiA9IE1hdGguY29zKM+GKSwgeCA9IE1hdGguY29zKM67KSAqIGNvc8+GLCB5ID0gTWF0aC5zaW4ozrspICogY29zz4YsIHogPSBNYXRoLnNpbijPhiksIGsgPSB6ICogY29zzrTPhiArIHggKiBzaW7OtM+GO1xuICAgICAgcmV0dXJuIFsgTWF0aC5hdGFuMih5ICogY29zzrTOsyAtIGsgKiBzaW7OtM6zLCB4ICogY29zzrTPhiAtIHogKiBzaW7OtM+GKSwgZDNfYXNpbihrICogY29zzrTOsyArIHkgKiBzaW7OtM6zKSBdO1xuICAgIH1cbiAgICByb3RhdGlvbi5pbnZlcnQgPSBmdW5jdGlvbijOuywgz4YpIHtcbiAgICAgIHZhciBjb3PPhiA9IE1hdGguY29zKM+GKSwgeCA9IE1hdGguY29zKM67KSAqIGNvc8+GLCB5ID0gTWF0aC5zaW4ozrspICogY29zz4YsIHogPSBNYXRoLnNpbijPhiksIGsgPSB6ICogY29zzrTOsyAtIHkgKiBzaW7OtM6zO1xuICAgICAgcmV0dXJuIFsgTWF0aC5hdGFuMih5ICogY29zzrTOsyArIHogKiBzaW7OtM6zLCB4ICogY29zzrTPhiArIGsgKiBzaW7OtM+GKSwgZDNfYXNpbihrICogY29zzrTPhiAtIHggKiBzaW7OtM+GKSBdO1xuICAgIH07XG4gICAgcmV0dXJuIHJvdGF0aW9uO1xuICB9XG4gIGQzLmdlby5jaXJjbGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3JpZ2luID0gWyAwLCAwIF0sIGFuZ2xlLCBwcmVjaXNpb24gPSA2LCBpbnRlcnBvbGF0ZTtcbiAgICBmdW5jdGlvbiBjaXJjbGUoKSB7XG4gICAgICB2YXIgY2VudGVyID0gdHlwZW9mIG9yaWdpbiA9PT0gXCJmdW5jdGlvblwiID8gb3JpZ2luLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiBvcmlnaW4sIHJvdGF0ZSA9IGQzX2dlb19yb3RhdGlvbigtY2VudGVyWzBdICogZDNfcmFkaWFucywgLWNlbnRlclsxXSAqIGQzX3JhZGlhbnMsIDApLmludmVydCwgcmluZyA9IFtdO1xuICAgICAgaW50ZXJwb2xhdGUobnVsbCwgbnVsbCwgMSwge1xuICAgICAgICBwb2ludDogZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICAgIHJpbmcucHVzaCh4ID0gcm90YXRlKHgsIHkpKTtcbiAgICAgICAgICB4WzBdICo9IGQzX2RlZ3JlZXMsIHhbMV0gKj0gZDNfZGVncmVlcztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIlBvbHlnb25cIixcbiAgICAgICAgY29vcmRpbmF0ZXM6IFsgcmluZyBdXG4gICAgICB9O1xuICAgIH1cbiAgICBjaXJjbGUub3JpZ2luID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3JpZ2luO1xuICAgICAgb3JpZ2luID0geDtcbiAgICAgIHJldHVybiBjaXJjbGU7XG4gICAgfTtcbiAgICBjaXJjbGUuYW5nbGUgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBhbmdsZTtcbiAgICAgIGludGVycG9sYXRlID0gZDNfZ2VvX2NpcmNsZUludGVycG9sYXRlKChhbmdsZSA9ICt4KSAqIGQzX3JhZGlhbnMsIHByZWNpc2lvbiAqIGQzX3JhZGlhbnMpO1xuICAgICAgcmV0dXJuIGNpcmNsZTtcbiAgICB9O1xuICAgIGNpcmNsZS5wcmVjaXNpb24gPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBwcmVjaXNpb247XG4gICAgICBpbnRlcnBvbGF0ZSA9IGQzX2dlb19jaXJjbGVJbnRlcnBvbGF0ZShhbmdsZSAqIGQzX3JhZGlhbnMsIChwcmVjaXNpb24gPSArXykgKiBkM19yYWRpYW5zKTtcbiAgICAgIHJldHVybiBjaXJjbGU7XG4gICAgfTtcbiAgICByZXR1cm4gY2lyY2xlLmFuZ2xlKDkwKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfZ2VvX2NpcmNsZUludGVycG9sYXRlKHJhZGl1cywgcHJlY2lzaW9uKSB7XG4gICAgdmFyIGNyID0gTWF0aC5jb3MocmFkaXVzKSwgc3IgPSBNYXRoLnNpbihyYWRpdXMpO1xuICAgIHJldHVybiBmdW5jdGlvbihmcm9tLCB0bywgZGlyZWN0aW9uLCBsaXN0ZW5lcikge1xuICAgICAgaWYgKGZyb20gIT0gbnVsbCkge1xuICAgICAgICBmcm9tID0gZDNfZ2VvX2NpcmNsZUFuZ2xlKGNyLCBmcm9tKTtcbiAgICAgICAgdG8gPSBkM19nZW9fY2lyY2xlQW5nbGUoY3IsIHRvKTtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA+IDAgPyBmcm9tIDwgdG8gOiBmcm9tID4gdG8pIGZyb20gKz0gZGlyZWN0aW9uICogMiAqIM+AO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnJvbSA9IHJhZGl1cyArIGRpcmVjdGlvbiAqIDIgKiDPgDtcbiAgICAgICAgdG8gPSByYWRpdXM7XG4gICAgICB9XG4gICAgICB2YXIgcG9pbnQ7XG4gICAgICBmb3IgKHZhciBzdGVwID0gZGlyZWN0aW9uICogcHJlY2lzaW9uLCB0ID0gZnJvbTsgZGlyZWN0aW9uID4gMCA/IHQgPiB0byA6IHQgPCB0bzsgdCAtPSBzdGVwKSB7XG4gICAgICAgIGxpc3RlbmVyLnBvaW50KChwb2ludCA9IGQzX2dlb19zcGhlcmljYWwoWyBjciwgLXNyICogTWF0aC5jb3ModCksIC1zciAqIE1hdGguc2luKHQpIF0pKVswXSwgcG9pbnRbMV0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX2NpcmNsZUFuZ2xlKGNyLCBwb2ludCkge1xuICAgIHZhciBhID0gZDNfZ2VvX2NhcnRlc2lhbihwb2ludCk7XG4gICAgYVswXSAtPSBjcjtcbiAgICBkM19nZW9fY2FydGVzaWFuTm9ybWFsaXplKGEpO1xuICAgIHZhciBhbmdsZSA9IGQzX2Fjb3MoLWFbMV0pO1xuICAgIHJldHVybiAoKC1hWzJdIDwgMCA/IC1hbmdsZSA6IGFuZ2xlKSArIDIgKiBNYXRoLlBJIC0gzrUpICUgKDIgKiBNYXRoLlBJKTtcbiAgfVxuICBkMy5nZW8uZGlzdGFuY2UgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIM6UzrsgPSAoYlswXSAtIGFbMF0pICogZDNfcmFkaWFucywgz4YwID0gYVsxXSAqIGQzX3JhZGlhbnMsIM+GMSA9IGJbMV0gKiBkM19yYWRpYW5zLCBzaW7OlM67ID0gTWF0aC5zaW4ozpTOuyksIGNvc86UzrsgPSBNYXRoLmNvcyjOlM67KSwgc2luz4YwID0gTWF0aC5zaW4oz4YwKSwgY29zz4YwID0gTWF0aC5jb3Moz4YwKSwgc2luz4YxID0gTWF0aC5zaW4oz4YxKSwgY29zz4YxID0gTWF0aC5jb3Moz4YxKSwgdDtcbiAgICByZXR1cm4gTWF0aC5hdGFuMihNYXRoLnNxcnQoKHQgPSBjb3PPhjEgKiBzaW7OlM67KSAqIHQgKyAodCA9IGNvc8+GMCAqIHNpbs+GMSAtIHNpbs+GMCAqIGNvc8+GMSAqIGNvc86UzrspICogdCksIHNpbs+GMCAqIHNpbs+GMSArIGNvc8+GMCAqIGNvc8+GMSAqIGNvc86UzrspO1xuICB9O1xuICBkMy5nZW8uZ3JhdGljdWxlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHgxLCB4MCwgWDEsIFgwLCB5MSwgeTAsIFkxLCBZMCwgZHggPSAxMCwgZHkgPSBkeCwgRFggPSA5MCwgRFkgPSAzNjAsIHgsIHksIFgsIFksIHByZWNpc2lvbiA9IDIuNTtcbiAgICBmdW5jdGlvbiBncmF0aWN1bGUoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIk11bHRpTGluZVN0cmluZ1wiLFxuICAgICAgICBjb29yZGluYXRlczogbGluZXMoKVxuICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbGluZXMoKSB7XG4gICAgICByZXR1cm4gZDMucmFuZ2UoTWF0aC5jZWlsKFgwIC8gRFgpICogRFgsIFgxLCBEWCkubWFwKFgpLmNvbmNhdChkMy5yYW5nZShNYXRoLmNlaWwoWTAgLyBEWSkgKiBEWSwgWTEsIERZKS5tYXAoWSkpLmNvbmNhdChkMy5yYW5nZShNYXRoLmNlaWwoeDAgLyBkeCkgKiBkeCwgeDEsIGR4KS5maWx0ZXIoZnVuY3Rpb24oeCkge1xuICAgICAgICByZXR1cm4gTWF0aC5hYnMoeCAlIERYKSA+IM61O1xuICAgICAgfSkubWFwKHgpKS5jb25jYXQoZDMucmFuZ2UoTWF0aC5jZWlsKHkwIC8gZHkpICogZHksIHkxLCBkeSkuZmlsdGVyKGZ1bmN0aW9uKHkpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKHkgJSBEWSkgPiDOtTtcbiAgICAgIH0pLm1hcCh5KSk7XG4gICAgfVxuICAgIGdyYXRpY3VsZS5saW5lcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGxpbmVzKCkubWFwKGZ1bmN0aW9uKGNvb3JkaW5hdGVzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHlwZTogXCJMaW5lU3RyaW5nXCIsXG4gICAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3JkaW5hdGVzXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGdyYXRpY3VsZS5vdXRsaW5lID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIlBvbHlnb25cIixcbiAgICAgICAgY29vcmRpbmF0ZXM6IFsgWChYMCkuY29uY2F0KFkoWTEpLnNsaWNlKDEpLCBYKFgxKS5yZXZlcnNlKCkuc2xpY2UoMSksIFkoWTApLnJldmVyc2UoKS5zbGljZSgxKSkgXVxuICAgICAgfTtcbiAgICB9O1xuICAgIGdyYXRpY3VsZS5leHRlbnQgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBncmF0aWN1bGUubWlub3JFeHRlbnQoKTtcbiAgICAgIHJldHVybiBncmF0aWN1bGUubWFqb3JFeHRlbnQoXykubWlub3JFeHRlbnQoXyk7XG4gICAgfTtcbiAgICBncmF0aWN1bGUubWFqb3JFeHRlbnQgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBbIFsgWDAsIFkwIF0sIFsgWDEsIFkxIF0gXTtcbiAgICAgIFgwID0gK19bMF1bMF0sIFgxID0gK19bMV1bMF07XG4gICAgICBZMCA9ICtfWzBdWzFdLCBZMSA9ICtfWzFdWzFdO1xuICAgICAgaWYgKFgwID4gWDEpIF8gPSBYMCwgWDAgPSBYMSwgWDEgPSBfO1xuICAgICAgaWYgKFkwID4gWTEpIF8gPSBZMCwgWTAgPSBZMSwgWTEgPSBfO1xuICAgICAgcmV0dXJuIGdyYXRpY3VsZS5wcmVjaXNpb24ocHJlY2lzaW9uKTtcbiAgICB9O1xuICAgIGdyYXRpY3VsZS5taW5vckV4dGVudCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIFsgWyB4MCwgeTAgXSwgWyB4MSwgeTEgXSBdO1xuICAgICAgeDAgPSArX1swXVswXSwgeDEgPSArX1sxXVswXTtcbiAgICAgIHkwID0gK19bMF1bMV0sIHkxID0gK19bMV1bMV07XG4gICAgICBpZiAoeDAgPiB4MSkgXyA9IHgwLCB4MCA9IHgxLCB4MSA9IF87XG4gICAgICBpZiAoeTAgPiB5MSkgXyA9IHkwLCB5MCA9IHkxLCB5MSA9IF87XG4gICAgICByZXR1cm4gZ3JhdGljdWxlLnByZWNpc2lvbihwcmVjaXNpb24pO1xuICAgIH07XG4gICAgZ3JhdGljdWxlLnN0ZXAgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBncmF0aWN1bGUubWlub3JTdGVwKCk7XG4gICAgICByZXR1cm4gZ3JhdGljdWxlLm1ham9yU3RlcChfKS5taW5vclN0ZXAoXyk7XG4gICAgfTtcbiAgICBncmF0aWN1bGUubWFqb3JTdGVwID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gWyBEWCwgRFkgXTtcbiAgICAgIERYID0gK19bMF0sIERZID0gK19bMV07XG4gICAgICByZXR1cm4gZ3JhdGljdWxlO1xuICAgIH07XG4gICAgZ3JhdGljdWxlLm1pbm9yU3RlcCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIFsgZHgsIGR5IF07XG4gICAgICBkeCA9ICtfWzBdLCBkeSA9ICtfWzFdO1xuICAgICAgcmV0dXJuIGdyYXRpY3VsZTtcbiAgICB9O1xuICAgIGdyYXRpY3VsZS5wcmVjaXNpb24gPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBwcmVjaXNpb247XG4gICAgICBwcmVjaXNpb24gPSArXztcbiAgICAgIHggPSBkM19nZW9fZ3JhdGljdWxlWCh5MCwgeTEsIDkwKTtcbiAgICAgIHkgPSBkM19nZW9fZ3JhdGljdWxlWSh4MCwgeDEsIHByZWNpc2lvbik7XG4gICAgICBYID0gZDNfZ2VvX2dyYXRpY3VsZVgoWTAsIFkxLCA5MCk7XG4gICAgICBZID0gZDNfZ2VvX2dyYXRpY3VsZVkoWDAsIFgxLCBwcmVjaXNpb24pO1xuICAgICAgcmV0dXJuIGdyYXRpY3VsZTtcbiAgICB9O1xuICAgIHJldHVybiBncmF0aWN1bGUubWFqb3JFeHRlbnQoWyBbIC0xODAsIC05MCArIM61IF0sIFsgMTgwLCA5MCAtIM61IF0gXSkubWlub3JFeHRlbnQoWyBbIC0xODAsIC04MCAtIM61IF0sIFsgMTgwLCA4MCArIM61IF0gXSk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2dlb19ncmF0aWN1bGVYKHkwLCB5MSwgZHkpIHtcbiAgICB2YXIgeSA9IGQzLnJhbmdlKHkwLCB5MSAtIM61LCBkeSkuY29uY2F0KHkxKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHkubWFwKGZ1bmN0aW9uKHkpIHtcbiAgICAgICAgcmV0dXJuIFsgeCwgeSBdO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fZ3JhdGljdWxlWSh4MCwgeDEsIGR4KSB7XG4gICAgdmFyIHggPSBkMy5yYW5nZSh4MCwgeDEgLSDOtSwgZHgpLmNvbmNhdCh4MSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHkpIHtcbiAgICAgIHJldHVybiB4Lm1hcChmdW5jdGlvbih4KSB7XG4gICAgICAgIHJldHVybiBbIHgsIHkgXTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gZDNfc291cmNlKGQpIHtcbiAgICByZXR1cm4gZC5zb3VyY2U7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGFyZ2V0KGQpIHtcbiAgICByZXR1cm4gZC50YXJnZXQ7XG4gIH1cbiAgZDMuZ2VvLmdyZWF0QXJjID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNvdXJjZSA9IGQzX3NvdXJjZSwgc291cmNlXywgdGFyZ2V0ID0gZDNfdGFyZ2V0LCB0YXJnZXRfO1xuICAgIGZ1bmN0aW9uIGdyZWF0QXJjKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJMaW5lU3RyaW5nXCIsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBbIHNvdXJjZV8gfHwgc291cmNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksIHRhcmdldF8gfHwgdGFyZ2V0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgXVxuICAgICAgfTtcbiAgICB9XG4gICAgZ3JlYXRBcmMuZGlzdGFuY2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkMy5nZW8uZGlzdGFuY2Uoc291cmNlXyB8fCBzb3VyY2UuYXBwbHkodGhpcywgYXJndW1lbnRzKSwgdGFyZ2V0XyB8fCB0YXJnZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgICBncmVhdEFyYy5zb3VyY2UgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzb3VyY2U7XG4gICAgICBzb3VyY2UgPSBfLCBzb3VyY2VfID0gdHlwZW9mIF8gPT09IFwiZnVuY3Rpb25cIiA/IG51bGwgOiBfO1xuICAgICAgcmV0dXJuIGdyZWF0QXJjO1xuICAgIH07XG4gICAgZ3JlYXRBcmMudGFyZ2V0ID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGFyZ2V0O1xuICAgICAgdGFyZ2V0ID0gXywgdGFyZ2V0XyA9IHR5cGVvZiBfID09PSBcImZ1bmN0aW9uXCIgPyBudWxsIDogXztcbiAgICAgIHJldHVybiBncmVhdEFyYztcbiAgICB9O1xuICAgIGdyZWF0QXJjLnByZWNpc2lvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyBncmVhdEFyYyA6IDA7XG4gICAgfTtcbiAgICByZXR1cm4gZ3JlYXRBcmM7XG4gIH07XG4gIGQzLmdlby5pbnRlcnBvbGF0ZSA9IGZ1bmN0aW9uKHNvdXJjZSwgdGFyZ2V0KSB7XG4gICAgcmV0dXJuIGQzX2dlb19pbnRlcnBvbGF0ZShzb3VyY2VbMF0gKiBkM19yYWRpYW5zLCBzb3VyY2VbMV0gKiBkM19yYWRpYW5zLCB0YXJnZXRbMF0gKiBkM19yYWRpYW5zLCB0YXJnZXRbMV0gKiBkM19yYWRpYW5zKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfZ2VvX2ludGVycG9sYXRlKHgwLCB5MCwgeDEsIHkxKSB7XG4gICAgdmFyIGN5MCA9IE1hdGguY29zKHkwKSwgc3kwID0gTWF0aC5zaW4oeTApLCBjeTEgPSBNYXRoLmNvcyh5MSksIHN5MSA9IE1hdGguc2luKHkxKSwga3gwID0gY3kwICogTWF0aC5jb3MoeDApLCBreTAgPSBjeTAgKiBNYXRoLnNpbih4MCksIGt4MSA9IGN5MSAqIE1hdGguY29zKHgxKSwga3kxID0gY3kxICogTWF0aC5zaW4oeDEpLCBkID0gMiAqIE1hdGguYXNpbihNYXRoLnNxcnQoZDNfaGF2ZXJzaW4oeTEgLSB5MCkgKyBjeTAgKiBjeTEgKiBkM19oYXZlcnNpbih4MSAtIHgwKSkpLCBrID0gMSAvIE1hdGguc2luKGQpO1xuICAgIHZhciBpbnRlcnBvbGF0ZSA9IGQgPyBmdW5jdGlvbih0KSB7XG4gICAgICB2YXIgQiA9IE1hdGguc2luKHQgKj0gZCkgKiBrLCBBID0gTWF0aC5zaW4oZCAtIHQpICogaywgeCA9IEEgKiBreDAgKyBCICoga3gxLCB5ID0gQSAqIGt5MCArIEIgKiBreTEsIHogPSBBICogc3kwICsgQiAqIHN5MTtcbiAgICAgIHJldHVybiBbIE1hdGguYXRhbjIoeSwgeCkgKiBkM19kZWdyZWVzLCBNYXRoLmF0YW4yKHosIE1hdGguc3FydCh4ICogeCArIHkgKiB5KSkgKiBkM19kZWdyZWVzIF07XG4gICAgfSA6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFsgeDAgKiBkM19kZWdyZWVzLCB5MCAqIGQzX2RlZ3JlZXMgXTtcbiAgICB9O1xuICAgIGludGVycG9sYXRlLmRpc3RhbmNlID0gZDtcbiAgICByZXR1cm4gaW50ZXJwb2xhdGU7XG4gIH1cbiAgZDMuZ2VvLmxlbmd0aCA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIGQzX2dlb19sZW5ndGhTdW0gPSAwO1xuICAgIGQzLmdlby5zdHJlYW0ob2JqZWN0LCBkM19nZW9fbGVuZ3RoKTtcbiAgICByZXR1cm4gZDNfZ2VvX2xlbmd0aFN1bTtcbiAgfTtcbiAgdmFyIGQzX2dlb19sZW5ndGhTdW07XG4gIHZhciBkM19nZW9fbGVuZ3RoID0ge1xuICAgIHNwaGVyZTogZDNfbm9vcCxcbiAgICBwb2ludDogZDNfbm9vcCxcbiAgICBsaW5lU3RhcnQ6IGQzX2dlb19sZW5ndGhMaW5lU3RhcnQsXG4gICAgbGluZUVuZDogZDNfbm9vcCxcbiAgICBwb2x5Z29uU3RhcnQ6IGQzX25vb3AsXG4gICAgcG9seWdvbkVuZDogZDNfbm9vcFxuICB9O1xuICBmdW5jdGlvbiBkM19nZW9fbGVuZ3RoTGluZVN0YXJ0KCkge1xuICAgIHZhciDOuzAsIHNpbs+GMCwgY29zz4YwO1xuICAgIGQzX2dlb19sZW5ndGgucG9pbnQgPSBmdW5jdGlvbijOuywgz4YpIHtcbiAgICAgIM67MCA9IM67ICogZDNfcmFkaWFucywgc2luz4YwID0gTWF0aC5zaW4oz4YgKj0gZDNfcmFkaWFucyksIGNvc8+GMCA9IE1hdGguY29zKM+GKTtcbiAgICAgIGQzX2dlb19sZW5ndGgucG9pbnQgPSBuZXh0UG9pbnQ7XG4gICAgfTtcbiAgICBkM19nZW9fbGVuZ3RoLmxpbmVFbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGQzX2dlb19sZW5ndGgucG9pbnQgPSBkM19nZW9fbGVuZ3RoLmxpbmVFbmQgPSBkM19ub29wO1xuICAgIH07XG4gICAgZnVuY3Rpb24gbmV4dFBvaW50KM67LCDPhikge1xuICAgICAgdmFyIHNpbs+GID0gTWF0aC5zaW4oz4YgKj0gZDNfcmFkaWFucyksIGNvc8+GID0gTWF0aC5jb3Moz4YpLCB0ID0gTWF0aC5hYnMoKM67ICo9IGQzX3JhZGlhbnMpIC0gzrswKSwgY29zzpTOuyA9IE1hdGguY29zKHQpO1xuICAgICAgZDNfZ2VvX2xlbmd0aFN1bSArPSBNYXRoLmF0YW4yKE1hdGguc3FydCgodCA9IGNvc8+GICogTWF0aC5zaW4odCkpICogdCArICh0ID0gY29zz4YwICogc2luz4YgLSBzaW7PhjAgKiBjb3PPhiAqIGNvc86UzrspICogdCksIHNpbs+GMCAqIHNpbs+GICsgY29zz4YwICogY29zz4YgKiBjb3POlM67KTtcbiAgICAgIM67MCA9IM67LCBzaW7PhjAgPSBzaW7PhiwgY29zz4YwID0gY29zz4Y7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19hemltdXRoYWwoc2NhbGUsIGFuZ2xlKSB7XG4gICAgZnVuY3Rpb24gYXppbXV0aGFsKM67LCDPhikge1xuICAgICAgdmFyIGNvc867ID0gTWF0aC5jb3MozrspLCBjb3PPhiA9IE1hdGguY29zKM+GKSwgayA9IHNjYWxlKGNvc867ICogY29zz4YpO1xuICAgICAgcmV0dXJuIFsgayAqIGNvc8+GICogTWF0aC5zaW4ozrspLCBrICogTWF0aC5zaW4oz4YpIF07XG4gICAgfVxuICAgIGF6aW11dGhhbC5pbnZlcnQgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgICB2YXIgz4EgPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSksIGMgPSBhbmdsZSjPgSksIHNpbmMgPSBNYXRoLnNpbihjKSwgY29zYyA9IE1hdGguY29zKGMpO1xuICAgICAgcmV0dXJuIFsgTWF0aC5hdGFuMih4ICogc2luYywgz4EgKiBjb3NjKSwgTWF0aC5hc2luKM+BICYmIHkgKiBzaW5jIC8gz4EpIF07XG4gICAgfTtcbiAgICByZXR1cm4gYXppbXV0aGFsO1xuICB9XG4gIHZhciBkM19nZW9fYXppbXV0aGFsRXF1YWxBcmVhID0gZDNfZ2VvX2F6aW11dGhhbChmdW5jdGlvbihjb3POu2Nvc8+GKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCgyIC8gKDEgKyBjb3POu2Nvc8+GKSk7XG4gIH0sIGZ1bmN0aW9uKM+BKSB7XG4gICAgcmV0dXJuIDIgKiBNYXRoLmFzaW4oz4EgLyAyKTtcbiAgfSk7XG4gIChkMy5nZW8uYXppbXV0aGFsRXF1YWxBcmVhID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGQzX2dlb19wcm9qZWN0aW9uKGQzX2dlb19hemltdXRoYWxFcXVhbEFyZWEpO1xuICB9KS5yYXcgPSBkM19nZW9fYXppbXV0aGFsRXF1YWxBcmVhO1xuICB2YXIgZDNfZ2VvX2F6aW11dGhhbEVxdWlkaXN0YW50ID0gZDNfZ2VvX2F6aW11dGhhbChmdW5jdGlvbihjb3POu2Nvc8+GKSB7XG4gICAgdmFyIGMgPSBNYXRoLmFjb3MoY29zzrtjb3PPhik7XG4gICAgcmV0dXJuIGMgJiYgYyAvIE1hdGguc2luKGMpO1xuICB9LCBkM19pZGVudGl0eSk7XG4gIChkMy5nZW8uYXppbXV0aGFsRXF1aWRpc3RhbnQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfZ2VvX3Byb2plY3Rpb24oZDNfZ2VvX2F6aW11dGhhbEVxdWlkaXN0YW50KTtcbiAgfSkucmF3ID0gZDNfZ2VvX2F6aW11dGhhbEVxdWlkaXN0YW50O1xuICBmdW5jdGlvbiBkM19nZW9fY29uaWNDb25mb3JtYWwoz4YwLCDPhjEpIHtcbiAgICB2YXIgY29zz4YwID0gTWF0aC5jb3Moz4YwKSwgdCA9IGZ1bmN0aW9uKM+GKSB7XG4gICAgICByZXR1cm4gTWF0aC50YW4oz4AgLyA0ICsgz4YgLyAyKTtcbiAgICB9LCBuID0gz4YwID09PSDPhjEgPyBNYXRoLnNpbijPhjApIDogTWF0aC5sb2coY29zz4YwIC8gTWF0aC5jb3Moz4YxKSkgLyBNYXRoLmxvZyh0KM+GMSkgLyB0KM+GMCkpLCBGID0gY29zz4YwICogTWF0aC5wb3codCjPhjApLCBuKSAvIG47XG4gICAgaWYgKCFuKSByZXR1cm4gZDNfZ2VvX21lcmNhdG9yO1xuICAgIGZ1bmN0aW9uIGZvcndhcmQozrssIM+GKSB7XG4gICAgICB2YXIgz4EgPSBNYXRoLmFicyhNYXRoLmFicyjPhikgLSDPgCAvIDIpIDwgzrUgPyAwIDogRiAvIE1hdGgucG93KHQoz4YpLCBuKTtcbiAgICAgIHJldHVybiBbIM+BICogTWF0aC5zaW4obiAqIM67KSwgRiAtIM+BICogTWF0aC5jb3MobiAqIM67KSBdO1xuICAgIH1cbiAgICBmb3J3YXJkLmludmVydCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgIHZhciDPgTBfeSA9IEYgLSB5LCDPgSA9IGQzX3NnbihuKSAqIE1hdGguc3FydCh4ICogeCArIM+BMF95ICogz4EwX3kpO1xuICAgICAgcmV0dXJuIFsgTWF0aC5hdGFuMih4LCDPgTBfeSkgLyBuLCAyICogTWF0aC5hdGFuKE1hdGgucG93KEYgLyDPgSwgMSAvIG4pKSAtIM+AIC8gMiBdO1xuICAgIH07XG4gICAgcmV0dXJuIGZvcndhcmQ7XG4gIH1cbiAgKGQzLmdlby5jb25pY0NvbmZvcm1hbCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkM19nZW9fY29uaWMoZDNfZ2VvX2NvbmljQ29uZm9ybWFsKTtcbiAgfSkucmF3ID0gZDNfZ2VvX2NvbmljQ29uZm9ybWFsO1xuICBmdW5jdGlvbiBkM19nZW9fY29uaWNFcXVpZGlzdGFudCjPhjAsIM+GMSkge1xuICAgIHZhciBjb3PPhjAgPSBNYXRoLmNvcyjPhjApLCBuID0gz4YwID09PSDPhjEgPyBNYXRoLnNpbijPhjApIDogKGNvc8+GMCAtIE1hdGguY29zKM+GMSkpIC8gKM+GMSAtIM+GMCksIEcgPSBjb3PPhjAgLyBuICsgz4YwO1xuICAgIGlmIChNYXRoLmFicyhuKSA8IM61KSByZXR1cm4gZDNfZ2VvX2VxdWlyZWN0YW5ndWxhcjtcbiAgICBmdW5jdGlvbiBmb3J3YXJkKM67LCDPhikge1xuICAgICAgdmFyIM+BID0gRyAtIM+GO1xuICAgICAgcmV0dXJuIFsgz4EgKiBNYXRoLnNpbihuICogzrspLCBHIC0gz4EgKiBNYXRoLmNvcyhuICogzrspIF07XG4gICAgfVxuICAgIGZvcndhcmQuaW52ZXJ0ID0gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgdmFyIM+BMF95ID0gRyAtIHk7XG4gICAgICByZXR1cm4gWyBNYXRoLmF0YW4yKHgsIM+BMF95KSAvIG4sIEcgLSBkM19zZ24obikgKiBNYXRoLnNxcnQoeCAqIHggKyDPgTBfeSAqIM+BMF95KSBdO1xuICAgIH07XG4gICAgcmV0dXJuIGZvcndhcmQ7XG4gIH1cbiAgKGQzLmdlby5jb25pY0VxdWlkaXN0YW50ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGQzX2dlb19jb25pYyhkM19nZW9fY29uaWNFcXVpZGlzdGFudCk7XG4gIH0pLnJhdyA9IGQzX2dlb19jb25pY0VxdWlkaXN0YW50O1xuICB2YXIgZDNfZ2VvX2dub21vbmljID0gZDNfZ2VvX2F6aW11dGhhbChmdW5jdGlvbihjb3POu2Nvc8+GKSB7XG4gICAgcmV0dXJuIDEgLyBjb3POu2Nvc8+GO1xuICB9LCBNYXRoLmF0YW4pO1xuICAoZDMuZ2VvLmdub21vbmljID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGQzX2dlb19wcm9qZWN0aW9uKGQzX2dlb19nbm9tb25pYyk7XG4gIH0pLnJhdyA9IGQzX2dlb19nbm9tb25pYztcbiAgZnVuY3Rpb24gZDNfZ2VvX21lcmNhdG9yKM67LCDPhikge1xuICAgIHJldHVybiBbIM67LCBNYXRoLmxvZyhNYXRoLnRhbijPgCAvIDQgKyDPhiAvIDIpKSBdO1xuICB9XG4gIGQzX2dlb19tZXJjYXRvci5pbnZlcnQgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgcmV0dXJuIFsgeCwgMiAqIE1hdGguYXRhbihNYXRoLmV4cCh5KSkgLSDPgCAvIDIgXTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfZ2VvX21lcmNhdG9yUHJvamVjdGlvbihwcm9qZWN0KSB7XG4gICAgdmFyIG0gPSBkM19nZW9fcHJvamVjdGlvbihwcm9qZWN0KSwgc2NhbGUgPSBtLnNjYWxlLCB0cmFuc2xhdGUgPSBtLnRyYW5zbGF0ZSwgY2xpcEV4dGVudCA9IG0uY2xpcEV4dGVudCwgY2xpcEF1dG87XG4gICAgbS5zY2FsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHYgPSBzY2FsZS5hcHBseShtLCBhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHYgPT09IG0gPyBjbGlwQXV0byA/IG0uY2xpcEV4dGVudChudWxsKSA6IG0gOiB2O1xuICAgIH07XG4gICAgbS50cmFuc2xhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB2ID0gdHJhbnNsYXRlLmFwcGx5KG0sIGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gdiA9PT0gbSA/IGNsaXBBdXRvID8gbS5jbGlwRXh0ZW50KG51bGwpIDogbSA6IHY7XG4gICAgfTtcbiAgICBtLmNsaXBFeHRlbnQgPSBmdW5jdGlvbihfKSB7XG4gICAgICB2YXIgdiA9IGNsaXBFeHRlbnQuYXBwbHkobSwgYXJndW1lbnRzKTtcbiAgICAgIGlmICh2ID09PSBtKSB7XG4gICAgICAgIGlmIChjbGlwQXV0byA9IF8gPT0gbnVsbCkge1xuICAgICAgICAgIHZhciBrID0gz4AgKiBzY2FsZSgpLCB0ID0gdHJhbnNsYXRlKCk7XG4gICAgICAgICAgY2xpcEV4dGVudChbIFsgdFswXSAtIGssIHRbMV0gLSBrIF0sIFsgdFswXSArIGssIHRbMV0gKyBrIF0gXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY2xpcEF1dG8pIHtcbiAgICAgICAgdiA9IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gdjtcbiAgICB9O1xuICAgIHJldHVybiBtLmNsaXBFeHRlbnQobnVsbCk7XG4gIH1cbiAgKGQzLmdlby5tZXJjYXRvciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkM19nZW9fbWVyY2F0b3JQcm9qZWN0aW9uKGQzX2dlb19tZXJjYXRvcik7XG4gIH0pLnJhdyA9IGQzX2dlb19tZXJjYXRvcjtcbiAgdmFyIGQzX2dlb19vcnRob2dyYXBoaWMgPSBkM19nZW9fYXppbXV0aGFsKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAxO1xuICB9LCBNYXRoLmFzaW4pO1xuICAoZDMuZ2VvLm9ydGhvZ3JhcGhpYyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkM19nZW9fcHJvamVjdGlvbihkM19nZW9fb3J0aG9ncmFwaGljKTtcbiAgfSkucmF3ID0gZDNfZ2VvX29ydGhvZ3JhcGhpYztcbiAgdmFyIGQzX2dlb19zdGVyZW9ncmFwaGljID0gZDNfZ2VvX2F6aW11dGhhbChmdW5jdGlvbihjb3POu2Nvc8+GKSB7XG4gICAgcmV0dXJuIDEgLyAoMSArIGNvc867Y29zz4YpO1xuICB9LCBmdW5jdGlvbijPgSkge1xuICAgIHJldHVybiAyICogTWF0aC5hdGFuKM+BKTtcbiAgfSk7XG4gIChkMy5nZW8uc3RlcmVvZ3JhcGhpYyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkM19nZW9fcHJvamVjdGlvbihkM19nZW9fc3RlcmVvZ3JhcGhpYyk7XG4gIH0pLnJhdyA9IGQzX2dlb19zdGVyZW9ncmFwaGljO1xuICBmdW5jdGlvbiBkM19nZW9fdHJhbnN2ZXJzZU1lcmNhdG9yKM67LCDPhikge1xuICAgIHZhciBCID0gTWF0aC5jb3Moz4YpICogTWF0aC5zaW4ozrspO1xuICAgIHJldHVybiBbIE1hdGgubG9nKCgxICsgQikgLyAoMSAtIEIpKSAvIDIsIE1hdGguYXRhbjIoTWF0aC50YW4oz4YpLCBNYXRoLmNvcyjOuykpIF07XG4gIH1cbiAgZDNfZ2VvX3RyYW5zdmVyc2VNZXJjYXRvci5pbnZlcnQgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgcmV0dXJuIFsgTWF0aC5hdGFuMihkM19zaW5oKHgpLCBNYXRoLmNvcyh5KSksIGQzX2FzaW4oTWF0aC5zaW4oeSkgLyBkM19jb3NoKHgpKSBdO1xuICB9O1xuICAoZDMuZ2VvLnRyYW5zdmVyc2VNZXJjYXRvciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkM19nZW9fbWVyY2F0b3JQcm9qZWN0aW9uKGQzX2dlb190cmFuc3ZlcnNlTWVyY2F0b3IpO1xuICB9KS5yYXcgPSBkM19nZW9fdHJhbnN2ZXJzZU1lcmNhdG9yO1xuICBkMy5nZW9tID0ge307XG4gIGQzLnN2ZyA9IHt9O1xuICBmdW5jdGlvbiBkM19zdmdfbGluZShwcm9qZWN0aW9uKSB7XG4gICAgdmFyIHggPSBkM19zdmdfbGluZVgsIHkgPSBkM19zdmdfbGluZVksIGRlZmluZWQgPSBkM190cnVlLCBpbnRlcnBvbGF0ZSA9IGQzX3N2Z19saW5lTGluZWFyLCBpbnRlcnBvbGF0ZUtleSA9IGludGVycG9sYXRlLmtleSwgdGVuc2lvbiA9IC43O1xuICAgIGZ1bmN0aW9uIGxpbmUoZGF0YSkge1xuICAgICAgdmFyIHNlZ21lbnRzID0gW10sIHBvaW50cyA9IFtdLCBpID0gLTEsIG4gPSBkYXRhLmxlbmd0aCwgZCwgZnggPSBkM19mdW5jdG9yKHgpLCBmeSA9IGQzX2Z1bmN0b3IoeSk7XG4gICAgICBmdW5jdGlvbiBzZWdtZW50KCkge1xuICAgICAgICBzZWdtZW50cy5wdXNoKFwiTVwiLCBpbnRlcnBvbGF0ZShwcm9qZWN0aW9uKHBvaW50cyksIHRlbnNpb24pKTtcbiAgICAgIH1cbiAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgIGlmIChkZWZpbmVkLmNhbGwodGhpcywgZCA9IGRhdGFbaV0sIGkpKSB7XG4gICAgICAgICAgcG9pbnRzLnB1c2goWyArZnguY2FsbCh0aGlzLCBkLCBpKSwgK2Z5LmNhbGwodGhpcywgZCwgaSkgXSk7XG4gICAgICAgIH0gZWxzZSBpZiAocG9pbnRzLmxlbmd0aCkge1xuICAgICAgICAgIHNlZ21lbnQoKTtcbiAgICAgICAgICBwb2ludHMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHBvaW50cy5sZW5ndGgpIHNlZ21lbnQoKTtcbiAgICAgIHJldHVybiBzZWdtZW50cy5sZW5ndGggPyBzZWdtZW50cy5qb2luKFwiXCIpIDogbnVsbDtcbiAgICB9XG4gICAgbGluZS54ID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4geDtcbiAgICAgIHggPSBfO1xuICAgICAgcmV0dXJuIGxpbmU7XG4gICAgfTtcbiAgICBsaW5lLnkgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB5O1xuICAgICAgeSA9IF87XG4gICAgICByZXR1cm4gbGluZTtcbiAgICB9O1xuICAgIGxpbmUuZGVmaW5lZCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRlZmluZWQ7XG4gICAgICBkZWZpbmVkID0gXztcbiAgICAgIHJldHVybiBsaW5lO1xuICAgIH07XG4gICAgbGluZS5pbnRlcnBvbGF0ZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGludGVycG9sYXRlS2V5O1xuICAgICAgaWYgKHR5cGVvZiBfID09PSBcImZ1bmN0aW9uXCIpIGludGVycG9sYXRlS2V5ID0gaW50ZXJwb2xhdGUgPSBfOyBlbHNlIGludGVycG9sYXRlS2V5ID0gKGludGVycG9sYXRlID0gZDNfc3ZnX2xpbmVJbnRlcnBvbGF0b3JzLmdldChfKSB8fCBkM19zdmdfbGluZUxpbmVhcikua2V5O1xuICAgICAgcmV0dXJuIGxpbmU7XG4gICAgfTtcbiAgICBsaW5lLnRlbnNpb24gPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0ZW5zaW9uO1xuICAgICAgdGVuc2lvbiA9IF87XG4gICAgICByZXR1cm4gbGluZTtcbiAgICB9O1xuICAgIHJldHVybiBsaW5lO1xuICB9XG4gIGQzLnN2Zy5saW5lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGQzX3N2Z19saW5lKGQzX2lkZW50aXR5KTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfc3ZnX2xpbmVYKGQpIHtcbiAgICByZXR1cm4gZFswXTtcbiAgfVxuICBmdW5jdGlvbiBkM19zdmdfbGluZVkoZCkge1xuICAgIHJldHVybiBkWzFdO1xuICB9XG4gIHZhciBkM19zdmdfbGluZUludGVycG9sYXRvcnMgPSBkMy5tYXAoe1xuICAgIGxpbmVhcjogZDNfc3ZnX2xpbmVMaW5lYXIsXG4gICAgXCJsaW5lYXItY2xvc2VkXCI6IGQzX3N2Z19saW5lTGluZWFyQ2xvc2VkLFxuICAgIHN0ZXA6IGQzX3N2Z19saW5lU3RlcCxcbiAgICBcInN0ZXAtYmVmb3JlXCI6IGQzX3N2Z19saW5lU3RlcEJlZm9yZSxcbiAgICBcInN0ZXAtYWZ0ZXJcIjogZDNfc3ZnX2xpbmVTdGVwQWZ0ZXIsXG4gICAgYmFzaXM6IGQzX3N2Z19saW5lQmFzaXMsXG4gICAgXCJiYXNpcy1vcGVuXCI6IGQzX3N2Z19saW5lQmFzaXNPcGVuLFxuICAgIFwiYmFzaXMtY2xvc2VkXCI6IGQzX3N2Z19saW5lQmFzaXNDbG9zZWQsXG4gICAgYnVuZGxlOiBkM19zdmdfbGluZUJ1bmRsZSxcbiAgICBjYXJkaW5hbDogZDNfc3ZnX2xpbmVDYXJkaW5hbCxcbiAgICBcImNhcmRpbmFsLW9wZW5cIjogZDNfc3ZnX2xpbmVDYXJkaW5hbE9wZW4sXG4gICAgXCJjYXJkaW5hbC1jbG9zZWRcIjogZDNfc3ZnX2xpbmVDYXJkaW5hbENsb3NlZCxcbiAgICBtb25vdG9uZTogZDNfc3ZnX2xpbmVNb25vdG9uZVxuICB9KTtcbiAgZDNfc3ZnX2xpbmVJbnRlcnBvbGF0b3JzLmZvckVhY2goZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIHZhbHVlLmtleSA9IGtleTtcbiAgICB2YWx1ZS5jbG9zZWQgPSAvLWNsb3NlZCQvLnRlc3Qoa2V5KTtcbiAgfSk7XG4gIGZ1bmN0aW9uIGQzX3N2Z19saW5lTGluZWFyKHBvaW50cykge1xuICAgIHJldHVybiBwb2ludHMuam9pbihcIkxcIik7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2xpbmVMaW5lYXJDbG9zZWQocG9pbnRzKSB7XG4gICAgcmV0dXJuIGQzX3N2Z19saW5lTGluZWFyKHBvaW50cykgKyBcIlpcIjtcbiAgfVxuICBmdW5jdGlvbiBkM19zdmdfbGluZVN0ZXAocG9pbnRzKSB7XG4gICAgdmFyIGkgPSAwLCBuID0gcG9pbnRzLmxlbmd0aCwgcCA9IHBvaW50c1swXSwgcGF0aCA9IFsgcFswXSwgXCIsXCIsIHBbMV0gXTtcbiAgICB3aGlsZSAoKytpIDwgbikgcGF0aC5wdXNoKFwiSFwiLCAocFswXSArIChwID0gcG9pbnRzW2ldKVswXSkgLyAyLCBcIlZcIiwgcFsxXSk7XG4gICAgaWYgKG4gPiAxKSBwYXRoLnB1c2goXCJIXCIsIHBbMF0pO1xuICAgIHJldHVybiBwYXRoLmpvaW4oXCJcIik7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2xpbmVTdGVwQmVmb3JlKHBvaW50cykge1xuICAgIHZhciBpID0gMCwgbiA9IHBvaW50cy5sZW5ndGgsIHAgPSBwb2ludHNbMF0sIHBhdGggPSBbIHBbMF0sIFwiLFwiLCBwWzFdIF07XG4gICAgd2hpbGUgKCsraSA8IG4pIHBhdGgucHVzaChcIlZcIiwgKHAgPSBwb2ludHNbaV0pWzFdLCBcIkhcIiwgcFswXSk7XG4gICAgcmV0dXJuIHBhdGguam9pbihcIlwiKTtcbiAgfVxuICBmdW5jdGlvbiBkM19zdmdfbGluZVN0ZXBBZnRlcihwb2ludHMpIHtcbiAgICB2YXIgaSA9IDAsIG4gPSBwb2ludHMubGVuZ3RoLCBwID0gcG9pbnRzWzBdLCBwYXRoID0gWyBwWzBdLCBcIixcIiwgcFsxXSBdO1xuICAgIHdoaWxlICgrK2kgPCBuKSBwYXRoLnB1c2goXCJIXCIsIChwID0gcG9pbnRzW2ldKVswXSwgXCJWXCIsIHBbMV0pO1xuICAgIHJldHVybiBwYXRoLmpvaW4oXCJcIik7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2xpbmVDYXJkaW5hbE9wZW4ocG9pbnRzLCB0ZW5zaW9uKSB7XG4gICAgcmV0dXJuIHBvaW50cy5sZW5ndGggPCA0ID8gZDNfc3ZnX2xpbmVMaW5lYXIocG9pbnRzKSA6IHBvaW50c1sxXSArIGQzX3N2Z19saW5lSGVybWl0ZShwb2ludHMuc2xpY2UoMSwgcG9pbnRzLmxlbmd0aCAtIDEpLCBkM19zdmdfbGluZUNhcmRpbmFsVGFuZ2VudHMocG9pbnRzLCB0ZW5zaW9uKSk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2xpbmVDYXJkaW5hbENsb3NlZChwb2ludHMsIHRlbnNpb24pIHtcbiAgICByZXR1cm4gcG9pbnRzLmxlbmd0aCA8IDMgPyBkM19zdmdfbGluZUxpbmVhcihwb2ludHMpIDogcG9pbnRzWzBdICsgZDNfc3ZnX2xpbmVIZXJtaXRlKChwb2ludHMucHVzaChwb2ludHNbMF0pLCBcbiAgICBwb2ludHMpLCBkM19zdmdfbGluZUNhcmRpbmFsVGFuZ2VudHMoWyBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDJdIF0uY29uY2F0KHBvaW50cywgWyBwb2ludHNbMV0gXSksIHRlbnNpb24pKTtcbiAgfVxuICBmdW5jdGlvbiBkM19zdmdfbGluZUNhcmRpbmFsKHBvaW50cywgdGVuc2lvbikge1xuICAgIHJldHVybiBwb2ludHMubGVuZ3RoIDwgMyA/IGQzX3N2Z19saW5lTGluZWFyKHBvaW50cykgOiBwb2ludHNbMF0gKyBkM19zdmdfbGluZUhlcm1pdGUocG9pbnRzLCBkM19zdmdfbGluZUNhcmRpbmFsVGFuZ2VudHMocG9pbnRzLCB0ZW5zaW9uKSk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2xpbmVIZXJtaXRlKHBvaW50cywgdGFuZ2VudHMpIHtcbiAgICBpZiAodGFuZ2VudHMubGVuZ3RoIDwgMSB8fCBwb2ludHMubGVuZ3RoICE9IHRhbmdlbnRzLmxlbmd0aCAmJiBwb2ludHMubGVuZ3RoICE9IHRhbmdlbnRzLmxlbmd0aCArIDIpIHtcbiAgICAgIHJldHVybiBkM19zdmdfbGluZUxpbmVhcihwb2ludHMpO1xuICAgIH1cbiAgICB2YXIgcXVhZCA9IHBvaW50cy5sZW5ndGggIT0gdGFuZ2VudHMubGVuZ3RoLCBwYXRoID0gXCJcIiwgcDAgPSBwb2ludHNbMF0sIHAgPSBwb2ludHNbMV0sIHQwID0gdGFuZ2VudHNbMF0sIHQgPSB0MCwgcGkgPSAxO1xuICAgIGlmIChxdWFkKSB7XG4gICAgICBwYXRoICs9IFwiUVwiICsgKHBbMF0gLSB0MFswXSAqIDIgLyAzKSArIFwiLFwiICsgKHBbMV0gLSB0MFsxXSAqIDIgLyAzKSArIFwiLFwiICsgcFswXSArIFwiLFwiICsgcFsxXTtcbiAgICAgIHAwID0gcG9pbnRzWzFdO1xuICAgICAgcGkgPSAyO1xuICAgIH1cbiAgICBpZiAodGFuZ2VudHMubGVuZ3RoID4gMSkge1xuICAgICAgdCA9IHRhbmdlbnRzWzFdO1xuICAgICAgcCA9IHBvaW50c1twaV07XG4gICAgICBwaSsrO1xuICAgICAgcGF0aCArPSBcIkNcIiArIChwMFswXSArIHQwWzBdKSArIFwiLFwiICsgKHAwWzFdICsgdDBbMV0pICsgXCIsXCIgKyAocFswXSAtIHRbMF0pICsgXCIsXCIgKyAocFsxXSAtIHRbMV0pICsgXCIsXCIgKyBwWzBdICsgXCIsXCIgKyBwWzFdO1xuICAgICAgZm9yICh2YXIgaSA9IDI7IGkgPCB0YW5nZW50cy5sZW5ndGg7IGkrKywgcGkrKykge1xuICAgICAgICBwID0gcG9pbnRzW3BpXTtcbiAgICAgICAgdCA9IHRhbmdlbnRzW2ldO1xuICAgICAgICBwYXRoICs9IFwiU1wiICsgKHBbMF0gLSB0WzBdKSArIFwiLFwiICsgKHBbMV0gLSB0WzFdKSArIFwiLFwiICsgcFswXSArIFwiLFwiICsgcFsxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHF1YWQpIHtcbiAgICAgIHZhciBscCA9IHBvaW50c1twaV07XG4gICAgICBwYXRoICs9IFwiUVwiICsgKHBbMF0gKyB0WzBdICogMiAvIDMpICsgXCIsXCIgKyAocFsxXSArIHRbMV0gKiAyIC8gMykgKyBcIixcIiArIGxwWzBdICsgXCIsXCIgKyBscFsxXTtcbiAgICB9XG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2xpbmVDYXJkaW5hbFRhbmdlbnRzKHBvaW50cywgdGVuc2lvbikge1xuICAgIHZhciB0YW5nZW50cyA9IFtdLCBhID0gKDEgLSB0ZW5zaW9uKSAvIDIsIHAwLCBwMSA9IHBvaW50c1swXSwgcDIgPSBwb2ludHNbMV0sIGkgPSAxLCBuID0gcG9pbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgcDAgPSBwMTtcbiAgICAgIHAxID0gcDI7XG4gICAgICBwMiA9IHBvaW50c1tpXTtcbiAgICAgIHRhbmdlbnRzLnB1c2goWyBhICogKHAyWzBdIC0gcDBbMF0pLCBhICogKHAyWzFdIC0gcDBbMV0pIF0pO1xuICAgIH1cbiAgICByZXR1cm4gdGFuZ2VudHM7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2xpbmVCYXNpcyhwb2ludHMpIHtcbiAgICBpZiAocG9pbnRzLmxlbmd0aCA8IDMpIHJldHVybiBkM19zdmdfbGluZUxpbmVhcihwb2ludHMpO1xuICAgIHZhciBpID0gMSwgbiA9IHBvaW50cy5sZW5ndGgsIHBpID0gcG9pbnRzWzBdLCB4MCA9IHBpWzBdLCB5MCA9IHBpWzFdLCBweCA9IFsgeDAsIHgwLCB4MCwgKHBpID0gcG9pbnRzWzFdKVswXSBdLCBweSA9IFsgeTAsIHkwLCB5MCwgcGlbMV0gXSwgcGF0aCA9IFsgeDAsIFwiLFwiLCB5MCwgXCJMXCIsIGQzX3N2Z19saW5lRG90NChkM19zdmdfbGluZUJhc2lzQmV6aWVyMywgcHgpLCBcIixcIiwgZDNfc3ZnX2xpbmVEb3Q0KGQzX3N2Z19saW5lQmFzaXNCZXppZXIzLCBweSkgXTtcbiAgICBwb2ludHMucHVzaChwb2ludHNbbiAtIDFdKTtcbiAgICB3aGlsZSAoKytpIDw9IG4pIHtcbiAgICAgIHBpID0gcG9pbnRzW2ldO1xuICAgICAgcHguc2hpZnQoKTtcbiAgICAgIHB4LnB1c2gocGlbMF0pO1xuICAgICAgcHkuc2hpZnQoKTtcbiAgICAgIHB5LnB1c2gocGlbMV0pO1xuICAgICAgZDNfc3ZnX2xpbmVCYXNpc0JlemllcihwYXRoLCBweCwgcHkpO1xuICAgIH1cbiAgICBwb2ludHMucG9wKCk7XG4gICAgcGF0aC5wdXNoKFwiTFwiLCBwaSk7XG4gICAgcmV0dXJuIHBhdGguam9pbihcIlwiKTtcbiAgfVxuICBmdW5jdGlvbiBkM19zdmdfbGluZUJhc2lzT3Blbihwb2ludHMpIHtcbiAgICBpZiAocG9pbnRzLmxlbmd0aCA8IDQpIHJldHVybiBkM19zdmdfbGluZUxpbmVhcihwb2ludHMpO1xuICAgIHZhciBwYXRoID0gW10sIGkgPSAtMSwgbiA9IHBvaW50cy5sZW5ndGgsIHBpLCBweCA9IFsgMCBdLCBweSA9IFsgMCBdO1xuICAgIHdoaWxlICgrK2kgPCAzKSB7XG4gICAgICBwaSA9IHBvaW50c1tpXTtcbiAgICAgIHB4LnB1c2gocGlbMF0pO1xuICAgICAgcHkucHVzaChwaVsxXSk7XG4gICAgfVxuICAgIHBhdGgucHVzaChkM19zdmdfbGluZURvdDQoZDNfc3ZnX2xpbmVCYXNpc0JlemllcjMsIHB4KSArIFwiLFwiICsgZDNfc3ZnX2xpbmVEb3Q0KGQzX3N2Z19saW5lQmFzaXNCZXppZXIzLCBweSkpO1xuICAgIC0taTtcbiAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgcGkgPSBwb2ludHNbaV07XG4gICAgICBweC5zaGlmdCgpO1xuICAgICAgcHgucHVzaChwaVswXSk7XG4gICAgICBweS5zaGlmdCgpO1xuICAgICAgcHkucHVzaChwaVsxXSk7XG4gICAgICBkM19zdmdfbGluZUJhc2lzQmV6aWVyKHBhdGgsIHB4LCBweSk7XG4gICAgfVxuICAgIHJldHVybiBwYXRoLmpvaW4oXCJcIik7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2xpbmVCYXNpc0Nsb3NlZChwb2ludHMpIHtcbiAgICB2YXIgcGF0aCwgaSA9IC0xLCBuID0gcG9pbnRzLmxlbmd0aCwgbSA9IG4gKyA0LCBwaSwgcHggPSBbXSwgcHkgPSBbXTtcbiAgICB3aGlsZSAoKytpIDwgNCkge1xuICAgICAgcGkgPSBwb2ludHNbaSAlIG5dO1xuICAgICAgcHgucHVzaChwaVswXSk7XG4gICAgICBweS5wdXNoKHBpWzFdKTtcbiAgICB9XG4gICAgcGF0aCA9IFsgZDNfc3ZnX2xpbmVEb3Q0KGQzX3N2Z19saW5lQmFzaXNCZXppZXIzLCBweCksIFwiLFwiLCBkM19zdmdfbGluZURvdDQoZDNfc3ZnX2xpbmVCYXNpc0JlemllcjMsIHB5KSBdO1xuICAgIC0taTtcbiAgICB3aGlsZSAoKytpIDwgbSkge1xuICAgICAgcGkgPSBwb2ludHNbaSAlIG5dO1xuICAgICAgcHguc2hpZnQoKTtcbiAgICAgIHB4LnB1c2gocGlbMF0pO1xuICAgICAgcHkuc2hpZnQoKTtcbiAgICAgIHB5LnB1c2gocGlbMV0pO1xuICAgICAgZDNfc3ZnX2xpbmVCYXNpc0JlemllcihwYXRoLCBweCwgcHkpO1xuICAgIH1cbiAgICByZXR1cm4gcGF0aC5qb2luKFwiXCIpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3N2Z19saW5lQnVuZGxlKHBvaW50cywgdGVuc2lvbikge1xuICAgIHZhciBuID0gcG9pbnRzLmxlbmd0aCAtIDE7XG4gICAgaWYgKG4pIHtcbiAgICAgIHZhciB4MCA9IHBvaW50c1swXVswXSwgeTAgPSBwb2ludHNbMF1bMV0sIGR4ID0gcG9pbnRzW25dWzBdIC0geDAsIGR5ID0gcG9pbnRzW25dWzFdIC0geTAsIGkgPSAtMSwgcCwgdDtcbiAgICAgIHdoaWxlICgrK2kgPD0gbikge1xuICAgICAgICBwID0gcG9pbnRzW2ldO1xuICAgICAgICB0ID0gaSAvIG47XG4gICAgICAgIHBbMF0gPSB0ZW5zaW9uICogcFswXSArICgxIC0gdGVuc2lvbikgKiAoeDAgKyB0ICogZHgpO1xuICAgICAgICBwWzFdID0gdGVuc2lvbiAqIHBbMV0gKyAoMSAtIHRlbnNpb24pICogKHkwICsgdCAqIGR5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGQzX3N2Z19saW5lQmFzaXMocG9pbnRzKTtcbiAgfVxuICBmdW5jdGlvbiBkM19zdmdfbGluZURvdDQoYSwgYikge1xuICAgIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdICsgYVsyXSAqIGJbMl0gKyBhWzNdICogYlszXTtcbiAgfVxuICB2YXIgZDNfc3ZnX2xpbmVCYXNpc0JlemllcjEgPSBbIDAsIDIgLyAzLCAxIC8gMywgMCBdLCBkM19zdmdfbGluZUJhc2lzQmV6aWVyMiA9IFsgMCwgMSAvIDMsIDIgLyAzLCAwIF0sIGQzX3N2Z19saW5lQmFzaXNCZXppZXIzID0gWyAwLCAxIC8gNiwgMiAvIDMsIDEgLyA2IF07XG4gIGZ1bmN0aW9uIGQzX3N2Z19saW5lQmFzaXNCZXppZXIocGF0aCwgeCwgeSkge1xuICAgIHBhdGgucHVzaChcIkNcIiwgZDNfc3ZnX2xpbmVEb3Q0KGQzX3N2Z19saW5lQmFzaXNCZXppZXIxLCB4KSwgXCIsXCIsIGQzX3N2Z19saW5lRG90NChkM19zdmdfbGluZUJhc2lzQmV6aWVyMSwgeSksIFwiLFwiLCBkM19zdmdfbGluZURvdDQoZDNfc3ZnX2xpbmVCYXNpc0JlemllcjIsIHgpLCBcIixcIiwgZDNfc3ZnX2xpbmVEb3Q0KGQzX3N2Z19saW5lQmFzaXNCZXppZXIyLCB5KSwgXCIsXCIsIGQzX3N2Z19saW5lRG90NChkM19zdmdfbGluZUJhc2lzQmV6aWVyMywgeCksIFwiLFwiLCBkM19zdmdfbGluZURvdDQoZDNfc3ZnX2xpbmVCYXNpc0JlemllcjMsIHkpKTtcbiAgfVxuICBmdW5jdGlvbiBkM19zdmdfbGluZVNsb3BlKHAwLCBwMSkge1xuICAgIHJldHVybiAocDFbMV0gLSBwMFsxXSkgLyAocDFbMF0gLSBwMFswXSk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2xpbmVGaW5pdGVEaWZmZXJlbmNlcyhwb2ludHMpIHtcbiAgICB2YXIgaSA9IDAsIGogPSBwb2ludHMubGVuZ3RoIC0gMSwgbSA9IFtdLCBwMCA9IHBvaW50c1swXSwgcDEgPSBwb2ludHNbMV0sIGQgPSBtWzBdID0gZDNfc3ZnX2xpbmVTbG9wZShwMCwgcDEpO1xuICAgIHdoaWxlICgrK2kgPCBqKSB7XG4gICAgICBtW2ldID0gKGQgKyAoZCA9IGQzX3N2Z19saW5lU2xvcGUocDAgPSBwMSwgcDEgPSBwb2ludHNbaSArIDFdKSkpIC8gMjtcbiAgICB9XG4gICAgbVtpXSA9IGQ7XG4gICAgcmV0dXJuIG07XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2xpbmVNb25vdG9uZVRhbmdlbnRzKHBvaW50cykge1xuICAgIHZhciB0YW5nZW50cyA9IFtdLCBkLCBhLCBiLCBzLCBtID0gZDNfc3ZnX2xpbmVGaW5pdGVEaWZmZXJlbmNlcyhwb2ludHMpLCBpID0gLTEsIGogPSBwb2ludHMubGVuZ3RoIC0gMTtcbiAgICB3aGlsZSAoKytpIDwgaikge1xuICAgICAgZCA9IGQzX3N2Z19saW5lU2xvcGUocG9pbnRzW2ldLCBwb2ludHNbaSArIDFdKTtcbiAgICAgIGlmIChNYXRoLmFicyhkKSA8IDFlLTYpIHtcbiAgICAgICAgbVtpXSA9IG1baSArIDFdID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGEgPSBtW2ldIC8gZDtcbiAgICAgICAgYiA9IG1baSArIDFdIC8gZDtcbiAgICAgICAgcyA9IGEgKiBhICsgYiAqIGI7XG4gICAgICAgIGlmIChzID4gOSkge1xuICAgICAgICAgIHMgPSBkICogMyAvIE1hdGguc3FydChzKTtcbiAgICAgICAgICBtW2ldID0gcyAqIGE7XG4gICAgICAgICAgbVtpICsgMV0gPSBzICogYjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpID0gLTE7XG4gICAgd2hpbGUgKCsraSA8PSBqKSB7XG4gICAgICBzID0gKHBvaW50c1tNYXRoLm1pbihqLCBpICsgMSldWzBdIC0gcG9pbnRzW01hdGgubWF4KDAsIGkgLSAxKV1bMF0pIC8gKDYgKiAoMSArIG1baV0gKiBtW2ldKSk7XG4gICAgICB0YW5nZW50cy5wdXNoKFsgcyB8fCAwLCBtW2ldICogcyB8fCAwIF0pO1xuICAgIH1cbiAgICByZXR1cm4gdGFuZ2VudHM7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2xpbmVNb25vdG9uZShwb2ludHMpIHtcbiAgICByZXR1cm4gcG9pbnRzLmxlbmd0aCA8IDMgPyBkM19zdmdfbGluZUxpbmVhcihwb2ludHMpIDogcG9pbnRzWzBdICsgZDNfc3ZnX2xpbmVIZXJtaXRlKHBvaW50cywgZDNfc3ZnX2xpbmVNb25vdG9uZVRhbmdlbnRzKHBvaW50cykpO1xuICB9XG4gIGQzLmdlb20uaHVsbCA9IGZ1bmN0aW9uKHZlcnRpY2VzKSB7XG4gICAgdmFyIHggPSBkM19zdmdfbGluZVgsIHkgPSBkM19zdmdfbGluZVk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBodWxsKHZlcnRpY2VzKTtcbiAgICBmdW5jdGlvbiBodWxsKGRhdGEpIHtcbiAgICAgIGlmIChkYXRhLmxlbmd0aCA8IDMpIHJldHVybiBbXTtcbiAgICAgIHZhciBmeCA9IGQzX2Z1bmN0b3IoeCksIGZ5ID0gZDNfZnVuY3Rvcih5KSwgbiA9IGRhdGEubGVuZ3RoLCB2ZXJ0aWNlcywgcGxlbiA9IG4gLSAxLCBwb2ludHMgPSBbXSwgc3RhY2sgPSBbXSwgZCwgaSwgaiwgaCA9IDAsIHgxLCB5MSwgeDIsIHkyLCB1LCB2LCBhLCBzcDtcbiAgICAgIGlmIChmeCA9PT0gZDNfc3ZnX2xpbmVYICYmIHkgPT09IGQzX3N2Z19saW5lWSkgdmVydGljZXMgPSBkYXRhOyBlbHNlIGZvciAoaSA9IDAsIFxuICAgICAgdmVydGljZXMgPSBbXTsgaSA8IG47ICsraSkge1xuICAgICAgICB2ZXJ0aWNlcy5wdXNoKFsgK2Z4LmNhbGwodGhpcywgZCA9IGRhdGFbaV0sIGkpLCArZnkuY2FsbCh0aGlzLCBkLCBpKSBdKTtcbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IDE7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgaWYgKHZlcnRpY2VzW2ldWzFdIDwgdmVydGljZXNbaF1bMV0gfHwgdmVydGljZXNbaV1bMV0gPT0gdmVydGljZXNbaF1bMV0gJiYgdmVydGljZXNbaV1bMF0gPCB2ZXJ0aWNlc1toXVswXSkgaCA9IGk7XG4gICAgICB9XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIGlmIChpID09PSBoKSBjb250aW51ZTtcbiAgICAgICAgeTEgPSB2ZXJ0aWNlc1tpXVsxXSAtIHZlcnRpY2VzW2hdWzFdO1xuICAgICAgICB4MSA9IHZlcnRpY2VzW2ldWzBdIC0gdmVydGljZXNbaF1bMF07XG4gICAgICAgIHBvaW50cy5wdXNoKHtcbiAgICAgICAgICBhbmdsZTogTWF0aC5hdGFuMih5MSwgeDEpLFxuICAgICAgICAgIGluZGV4OiBpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcG9pbnRzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gYS5hbmdsZSAtIGIuYW5nbGU7XG4gICAgICB9KTtcbiAgICAgIGEgPSBwb2ludHNbMF0uYW5nbGU7XG4gICAgICB2ID0gcG9pbnRzWzBdLmluZGV4O1xuICAgICAgdSA9IDA7XG4gICAgICBmb3IgKGkgPSAxOyBpIDwgcGxlbjsgKytpKSB7XG4gICAgICAgIGogPSBwb2ludHNbaV0uaW5kZXg7XG4gICAgICAgIGlmIChhID09IHBvaW50c1tpXS5hbmdsZSkge1xuICAgICAgICAgIHgxID0gdmVydGljZXNbdl1bMF0gLSB2ZXJ0aWNlc1toXVswXTtcbiAgICAgICAgICB5MSA9IHZlcnRpY2VzW3ZdWzFdIC0gdmVydGljZXNbaF1bMV07XG4gICAgICAgICAgeDIgPSB2ZXJ0aWNlc1tqXVswXSAtIHZlcnRpY2VzW2hdWzBdO1xuICAgICAgICAgIHkyID0gdmVydGljZXNbal1bMV0gLSB2ZXJ0aWNlc1toXVsxXTtcbiAgICAgICAgICBpZiAoeDEgKiB4MSArIHkxICogeTEgPj0geDIgKiB4MiArIHkyICogeTIpIHtcbiAgICAgICAgICAgIHBvaW50c1tpXS5pbmRleCA9IC0xO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBvaW50c1t1XS5pbmRleCA9IC0xO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhID0gcG9pbnRzW2ldLmFuZ2xlO1xuICAgICAgICB1ID0gaTtcbiAgICAgICAgdiA9IGo7XG4gICAgICB9XG4gICAgICBzdGFjay5wdXNoKGgpO1xuICAgICAgZm9yIChpID0gMCwgaiA9IDA7IGkgPCAyOyArK2opIHtcbiAgICAgICAgaWYgKHBvaW50c1tqXS5pbmRleCA+IC0xKSB7XG4gICAgICAgICAgc3RhY2sucHVzaChwb2ludHNbal0uaW5kZXgpO1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc3AgPSBzdGFjay5sZW5ndGg7XG4gICAgICBmb3IgKDtqIDwgcGxlbjsgKytqKSB7XG4gICAgICAgIGlmIChwb2ludHNbal0uaW5kZXggPCAwKSBjb250aW51ZTtcbiAgICAgICAgd2hpbGUgKCFkM19nZW9tX2h1bGxDQ1coc3RhY2tbc3AgLSAyXSwgc3RhY2tbc3AgLSAxXSwgcG9pbnRzW2pdLmluZGV4LCB2ZXJ0aWNlcykpIHtcbiAgICAgICAgICAtLXNwO1xuICAgICAgICB9XG4gICAgICAgIHN0YWNrW3NwKytdID0gcG9pbnRzW2pdLmluZGV4O1xuICAgICAgfVxuICAgICAgdmFyIHBvbHkgPSBbXTtcbiAgICAgIGZvciAoaSA9IHNwIC0gMTsgaSA+PSAwOyAtLWkpIHBvbHkucHVzaChkYXRhW3N0YWNrW2ldXSk7XG4gICAgICByZXR1cm4gcG9seTtcbiAgICB9XG4gICAgaHVsbC54ID0gZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoeCA9IF8sIGh1bGwpIDogeDtcbiAgICB9O1xuICAgIGh1bGwueSA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHkgPSBfLCBodWxsKSA6IHk7XG4gICAgfTtcbiAgICByZXR1cm4gaHVsbDtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfZ2VvbV9odWxsQ0NXKGkxLCBpMiwgaTMsIHYpIHtcbiAgICB2YXIgdCwgYSwgYiwgYywgZCwgZSwgZjtcbiAgICB0ID0gdltpMV07XG4gICAgYSA9IHRbMF07XG4gICAgYiA9IHRbMV07XG4gICAgdCA9IHZbaTJdO1xuICAgIGMgPSB0WzBdO1xuICAgIGQgPSB0WzFdO1xuICAgIHQgPSB2W2kzXTtcbiAgICBlID0gdFswXTtcbiAgICBmID0gdFsxXTtcbiAgICByZXR1cm4gKGYgLSBiKSAqIChjIC0gYSkgLSAoZCAtIGIpICogKGUgLSBhKSA+IDA7XG4gIH1cbiAgZDMuZ2VvbS5wb2x5Z29uID0gZnVuY3Rpb24oY29vcmRpbmF0ZXMpIHtcbiAgICBkM19zdWJjbGFzcyhjb29yZGluYXRlcywgZDNfZ2VvbV9wb2x5Z29uUHJvdG90eXBlKTtcbiAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gIH07XG4gIHZhciBkM19nZW9tX3BvbHlnb25Qcm90b3R5cGUgPSBkMy5nZW9tLnBvbHlnb24ucHJvdG90eXBlID0gW107XG4gIGQzX2dlb21fcG9seWdvblByb3RvdHlwZS5hcmVhID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGkgPSAtMSwgbiA9IHRoaXMubGVuZ3RoLCBhLCBiID0gdGhpc1tuIC0gMV0sIGFyZWEgPSAwO1xuICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICBhID0gYjtcbiAgICAgIGIgPSB0aGlzW2ldO1xuICAgICAgYXJlYSArPSBhWzFdICogYlswXSAtIGFbMF0gKiBiWzFdO1xuICAgIH1cbiAgICByZXR1cm4gYXJlYSAqIC41O1xuICB9O1xuICBkM19nZW9tX3BvbHlnb25Qcm90b3R5cGUuY2VudHJvaWQgPSBmdW5jdGlvbihrKSB7XG4gICAgdmFyIGkgPSAtMSwgbiA9IHRoaXMubGVuZ3RoLCB4ID0gMCwgeSA9IDAsIGEsIGIgPSB0aGlzW24gLSAxXSwgYztcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIGsgPSAtMSAvICg2ICogdGhpcy5hcmVhKCkpO1xuICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICBhID0gYjtcbiAgICAgIGIgPSB0aGlzW2ldO1xuICAgICAgYyA9IGFbMF0gKiBiWzFdIC0gYlswXSAqIGFbMV07XG4gICAgICB4ICs9IChhWzBdICsgYlswXSkgKiBjO1xuICAgICAgeSArPSAoYVsxXSArIGJbMV0pICogYztcbiAgICB9XG4gICAgcmV0dXJuIFsgeCAqIGssIHkgKiBrIF07XG4gIH07XG4gIGQzX2dlb21fcG9seWdvblByb3RvdHlwZS5jbGlwID0gZnVuY3Rpb24oc3ViamVjdCkge1xuICAgIHZhciBpbnB1dCwgY2xvc2VkID0gZDNfZ2VvbV9wb2x5Z29uQ2xvc2VkKHN1YmplY3QpLCBpID0gLTEsIG4gPSB0aGlzLmxlbmd0aCAtIGQzX2dlb21fcG9seWdvbkNsb3NlZCh0aGlzKSwgaiwgbSwgYSA9IHRoaXNbbiAtIDFdLCBiLCBjLCBkO1xuICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICBpbnB1dCA9IHN1YmplY3Quc2xpY2UoKTtcbiAgICAgIHN1YmplY3QubGVuZ3RoID0gMDtcbiAgICAgIGIgPSB0aGlzW2ldO1xuICAgICAgYyA9IGlucHV0WyhtID0gaW5wdXQubGVuZ3RoIC0gY2xvc2VkKSAtIDFdO1xuICAgICAgaiA9IC0xO1xuICAgICAgd2hpbGUgKCsraiA8IG0pIHtcbiAgICAgICAgZCA9IGlucHV0W2pdO1xuICAgICAgICBpZiAoZDNfZ2VvbV9wb2x5Z29uSW5zaWRlKGQsIGEsIGIpKSB7XG4gICAgICAgICAgaWYgKCFkM19nZW9tX3BvbHlnb25JbnNpZGUoYywgYSwgYikpIHtcbiAgICAgICAgICAgIHN1YmplY3QucHVzaChkM19nZW9tX3BvbHlnb25JbnRlcnNlY3QoYywgZCwgYSwgYikpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdWJqZWN0LnB1c2goZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZDNfZ2VvbV9wb2x5Z29uSW5zaWRlKGMsIGEsIGIpKSB7XG4gICAgICAgICAgc3ViamVjdC5wdXNoKGQzX2dlb21fcG9seWdvbkludGVyc2VjdChjLCBkLCBhLCBiKSk7XG4gICAgICAgIH1cbiAgICAgICAgYyA9IGQ7XG4gICAgICB9XG4gICAgICBpZiAoY2xvc2VkKSBzdWJqZWN0LnB1c2goc3ViamVjdFswXSk7XG4gICAgICBhID0gYjtcbiAgICB9XG4gICAgcmV0dXJuIHN1YmplY3Q7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2dlb21fcG9seWdvbkluc2lkZShwLCBhLCBiKSB7XG4gICAgcmV0dXJuIChiWzBdIC0gYVswXSkgKiAocFsxXSAtIGFbMV0pIDwgKGJbMV0gLSBhWzFdKSAqIChwWzBdIC0gYVswXSk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvbV9wb2x5Z29uSW50ZXJzZWN0KGMsIGQsIGEsIGIpIHtcbiAgICB2YXIgeDEgPSBjWzBdLCB4MyA9IGFbMF0sIHgyMSA9IGRbMF0gLSB4MSwgeDQzID0gYlswXSAtIHgzLCB5MSA9IGNbMV0sIHkzID0gYVsxXSwgeTIxID0gZFsxXSAtIHkxLCB5NDMgPSBiWzFdIC0geTMsIHVhID0gKHg0MyAqICh5MSAtIHkzKSAtIHk0MyAqICh4MSAtIHgzKSkgLyAoeTQzICogeDIxIC0geDQzICogeTIxKTtcbiAgICByZXR1cm4gWyB4MSArIHVhICogeDIxLCB5MSArIHVhICogeTIxIF07XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvbV9wb2x5Z29uQ2xvc2VkKGNvb3JkaW5hdGVzKSB7XG4gICAgdmFyIGEgPSBjb29yZGluYXRlc1swXSwgYiA9IGNvb3JkaW5hdGVzW2Nvb3JkaW5hdGVzLmxlbmd0aCAtIDFdO1xuICAgIHJldHVybiAhKGFbMF0gLSBiWzBdIHx8IGFbMV0gLSBiWzFdKTtcbiAgfVxuICBkMy5nZW9tLmRlbGF1bmF5ID0gZnVuY3Rpb24odmVydGljZXMpIHtcbiAgICB2YXIgZWRnZXMgPSB2ZXJ0aWNlcy5tYXAoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfSksIHRyaWFuZ2xlcyA9IFtdO1xuICAgIGQzX2dlb21fdm9yb25vaVRlc3NlbGxhdGUodmVydGljZXMsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGVkZ2VzW2UucmVnaW9uLmwuaW5kZXhdLnB1c2godmVydGljZXNbZS5yZWdpb24uci5pbmRleF0pO1xuICAgIH0pO1xuICAgIGVkZ2VzLmZvckVhY2goZnVuY3Rpb24oZWRnZSwgaSkge1xuICAgICAgdmFyIHYgPSB2ZXJ0aWNlc1tpXSwgY3ggPSB2WzBdLCBjeSA9IHZbMV07XG4gICAgICBlZGdlLmZvckVhY2goZnVuY3Rpb24odikge1xuICAgICAgICB2LmFuZ2xlID0gTWF0aC5hdGFuMih2WzBdIC0gY3gsIHZbMV0gLSBjeSk7XG4gICAgICB9KTtcbiAgICAgIGVkZ2Uuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLmFuZ2xlIC0gYi5hbmdsZTtcbiAgICAgIH0pO1xuICAgICAgZm9yICh2YXIgaiA9IDAsIG0gPSBlZGdlLmxlbmd0aCAtIDE7IGogPCBtOyBqKyspIHtcbiAgICAgICAgdHJpYW5nbGVzLnB1c2goWyB2LCBlZGdlW2pdLCBlZGdlW2ogKyAxXSBdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdHJpYW5nbGVzO1xuICB9O1xuICBkMy5nZW9tLnZvcm9ub2kgPSBmdW5jdGlvbihwb2ludHMpIHtcbiAgICB2YXIgeCA9IGQzX3N2Z19saW5lWCwgeSA9IGQzX3N2Z19saW5lWSwgY2xpcFBvbHlnb24gPSBudWxsO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdm9yb25vaShwb2ludHMpO1xuICAgIGZ1bmN0aW9uIHZvcm9ub2koZGF0YSkge1xuICAgICAgdmFyIHBvaW50cywgcG9seWdvbnMgPSBkYXRhLm1hcChmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfSksIGZ4ID0gZDNfZnVuY3Rvcih4KSwgZnkgPSBkM19mdW5jdG9yKHkpLCBkLCBpLCBuID0gZGF0YS5sZW5ndGgsIFogPSAxZTY7XG4gICAgICBpZiAoZnggPT09IGQzX3N2Z19saW5lWCAmJiBmeSA9PT0gZDNfc3ZnX2xpbmVZKSBwb2ludHMgPSBkYXRhOyBlbHNlIGZvciAocG9pbnRzID0gbmV3IEFycmF5KG4pLCBcbiAgICAgIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIHBvaW50c1tpXSA9IFsgK2Z4LmNhbGwodGhpcywgZCA9IGRhdGFbaV0sIGkpLCArZnkuY2FsbCh0aGlzLCBkLCBpKSBdO1xuICAgICAgfVxuICAgICAgZDNfZ2VvbV92b3Jvbm9pVGVzc2VsbGF0ZShwb2ludHMsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIHMxLCBzMiwgeDEsIHgyLCB5MSwgeTI7XG4gICAgICAgIGlmIChlLmEgPT09IDEgJiYgZS5iID49IDApIHtcbiAgICAgICAgICBzMSA9IGUuZXAucjtcbiAgICAgICAgICBzMiA9IGUuZXAubDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzMSA9IGUuZXAubDtcbiAgICAgICAgICBzMiA9IGUuZXAucjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZS5hID09PSAxKSB7XG4gICAgICAgICAgeTEgPSBzMSA/IHMxLnkgOiAtWjtcbiAgICAgICAgICB4MSA9IGUuYyAtIGUuYiAqIHkxO1xuICAgICAgICAgIHkyID0gczIgPyBzMi55IDogWjtcbiAgICAgICAgICB4MiA9IGUuYyAtIGUuYiAqIHkyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHgxID0gczEgPyBzMS54IDogLVo7XG4gICAgICAgICAgeTEgPSBlLmMgLSBlLmEgKiB4MTtcbiAgICAgICAgICB4MiA9IHMyID8gczIueCA6IFo7XG4gICAgICAgICAgeTIgPSBlLmMgLSBlLmEgKiB4MjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdjEgPSBbIHgxLCB5MSBdLCB2MiA9IFsgeDIsIHkyIF07XG4gICAgICAgIHBvbHlnb25zW2UucmVnaW9uLmwuaW5kZXhdLnB1c2godjEsIHYyKTtcbiAgICAgICAgcG9seWdvbnNbZS5yZWdpb24uci5pbmRleF0ucHVzaCh2MSwgdjIpO1xuICAgICAgfSk7XG4gICAgICBwb2x5Z29ucyA9IHBvbHlnb25zLm1hcChmdW5jdGlvbihwb2x5Z29uLCBpKSB7XG4gICAgICAgIHZhciBjeCA9IHBvaW50c1tpXVswXSwgY3kgPSBwb2ludHNbaV1bMV0sIGFuZ2xlID0gcG9seWdvbi5tYXAoZnVuY3Rpb24odikge1xuICAgICAgICAgIHJldHVybiBNYXRoLmF0YW4yKHZbMF0gLSBjeCwgdlsxXSAtIGN5KTtcbiAgICAgICAgfSksIG9yZGVyID0gZDMucmFuZ2UocG9seWdvbi5sZW5ndGgpLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgIHJldHVybiBhbmdsZVthXSAtIGFuZ2xlW2JdO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG9yZGVyLmZpbHRlcihmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgcmV0dXJuICFpIHx8IGFuZ2xlW2RdIC0gYW5nbGVbb3JkZXJbaSAtIDFdXSA+IM61O1xuICAgICAgICB9KS5tYXAoZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBwb2x5Z29uW2RdO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcG9seWdvbnMuZm9yRWFjaChmdW5jdGlvbihwb2x5Z29uLCBpKSB7XG4gICAgICAgIHZhciBuID0gcG9seWdvbi5sZW5ndGg7XG4gICAgICAgIGlmICghbikgcmV0dXJuIHBvbHlnb24ucHVzaChbIC1aLCAtWiBdLCBbIC1aLCBaIF0sIFsgWiwgWiBdLCBbIFosIC1aIF0pO1xuICAgICAgICBpZiAobiA+IDIpIHJldHVybjtcbiAgICAgICAgdmFyIHAwID0gcG9pbnRzW2ldLCBwMSA9IHBvbHlnb25bMF0sIHAyID0gcG9seWdvblsxXSwgeDAgPSBwMFswXSwgeTAgPSBwMFsxXSwgeDEgPSBwMVswXSwgeTEgPSBwMVsxXSwgeDIgPSBwMlswXSwgeTIgPSBwMlsxXSwgZHggPSBNYXRoLmFicyh4MiAtIHgxKSwgZHkgPSB5MiAtIHkxO1xuICAgICAgICBpZiAoTWF0aC5hYnMoZHkpIDwgzrUpIHtcbiAgICAgICAgICB2YXIgeSA9IHkwIDwgeTEgPyAtWiA6IFo7XG4gICAgICAgICAgcG9seWdvbi5wdXNoKFsgLVosIHkgXSwgWyBaLCB5IF0pO1xuICAgICAgICB9IGVsc2UgaWYgKGR4IDwgzrUpIHtcbiAgICAgICAgICB2YXIgeCA9IHgwIDwgeDEgPyAtWiA6IFo7XG4gICAgICAgICAgcG9seWdvbi5wdXNoKFsgeCwgLVogXSwgWyB4LCBaIF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciB5ID0gKHgyIC0geDEpICogKHkxIC0geTApIDwgKHgxIC0geDApICogKHkyIC0geTEpID8gWiA6IC1aLCB6ID0gTWF0aC5hYnMoZHkpIC0gZHg7XG4gICAgICAgICAgaWYgKE1hdGguYWJzKHopIDwgzrUpIHtcbiAgICAgICAgICAgIHBvbHlnb24ucHVzaChbIGR5IDwgMCA/IHkgOiAteSwgeSBdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHogPiAwKSB5ICo9IC0xO1xuICAgICAgICAgICAgcG9seWdvbi5wdXNoKFsgLVosIHkgXSwgWyBaLCB5IF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoY2xpcFBvbHlnb24pIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIGNsaXBQb2x5Z29uLmNsaXAocG9seWdvbnNbaV0pO1xuICAgICAgZm9yIChpID0gMDsgaSA8IG47ICsraSkgcG9seWdvbnNbaV0ucG9pbnQgPSBkYXRhW2ldO1xuICAgICAgcmV0dXJuIHBvbHlnb25zO1xuICAgIH1cbiAgICB2b3Jvbm9pLnggPSBmdW5jdGlvbihfKSB7XG4gICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh4ID0gXywgdm9yb25vaSkgOiB4O1xuICAgIH07XG4gICAgdm9yb25vaS55ID0gZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoeSA9IF8sIHZvcm9ub2kpIDogeTtcbiAgICB9O1xuICAgIHZvcm9ub2kuY2xpcEV4dGVudCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNsaXBQb2x5Z29uICYmIFsgY2xpcFBvbHlnb25bMF0sIGNsaXBQb2x5Z29uWzJdIF07XG4gICAgICBpZiAoXyA9PSBudWxsKSBjbGlwUG9seWdvbiA9IG51bGw7IGVsc2Uge1xuICAgICAgICB2YXIgeDEgPSArX1swXVswXSwgeTEgPSArX1swXVsxXSwgeDIgPSArX1sxXVswXSwgeTIgPSArX1sxXVsxXTtcbiAgICAgICAgY2xpcFBvbHlnb24gPSBkMy5nZW9tLnBvbHlnb24oWyBbIHgxLCB5MSBdLCBbIHgxLCB5MiBdLCBbIHgyLCB5MiBdLCBbIHgyLCB5MSBdIF0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZvcm9ub2k7XG4gICAgfTtcbiAgICB2b3Jvbm9pLnNpemUgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjbGlwUG9seWdvbiAmJiBjbGlwUG9seWdvblsyXTtcbiAgICAgIHJldHVybiB2b3Jvbm9pLmNsaXBFeHRlbnQoXyAmJiBbIFsgMCwgMCBdLCBfIF0pO1xuICAgIH07XG4gICAgdm9yb25vaS5saW5rcyA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHZhciBwb2ludHMsIGdyYXBoID0gZGF0YS5tYXAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0pLCBsaW5rcyA9IFtdLCBmeCA9IGQzX2Z1bmN0b3IoeCksIGZ5ID0gZDNfZnVuY3Rvcih5KSwgZCwgaSwgbiA9IGRhdGEubGVuZ3RoO1xuICAgICAgaWYgKGZ4ID09PSBkM19zdmdfbGluZVggJiYgZnkgPT09IGQzX3N2Z19saW5lWSkgcG9pbnRzID0gZGF0YTsgZWxzZSBmb3IgKHBvaW50cyA9IG5ldyBBcnJheShuKSwgXG4gICAgICBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgICBwb2ludHNbaV0gPSBbICtmeC5jYWxsKHRoaXMsIGQgPSBkYXRhW2ldLCBpKSwgK2Z5LmNhbGwodGhpcywgZCwgaSkgXTtcbiAgICAgIH1cbiAgICAgIGQzX2dlb21fdm9yb25vaVRlc3NlbGxhdGUocG9pbnRzLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBsID0gZS5yZWdpb24ubC5pbmRleCwgciA9IGUucmVnaW9uLnIuaW5kZXg7XG4gICAgICAgIGlmIChncmFwaFtsXVtyXSkgcmV0dXJuO1xuICAgICAgICBncmFwaFtsXVtyXSA9IGdyYXBoW3JdW2xdID0gdHJ1ZTtcbiAgICAgICAgbGlua3MucHVzaCh7XG4gICAgICAgICAgc291cmNlOiBkYXRhW2xdLFxuICAgICAgICAgIHRhcmdldDogZGF0YVtyXVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGxpbmtzO1xuICAgIH07XG4gICAgdm9yb25vaS50cmlhbmdsZXMgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICBpZiAoeCA9PT0gZDNfc3ZnX2xpbmVYICYmIHkgPT09IGQzX3N2Z19saW5lWSkgcmV0dXJuIGQzLmdlb20uZGVsYXVuYXkoZGF0YSk7XG4gICAgICB2YXIgcG9pbnRzID0gbmV3IEFycmF5KG4pLCBmeCA9IGQzX2Z1bmN0b3IoeCksIGZ5ID0gZDNfZnVuY3Rvcih5KSwgZCwgaSA9IC0xLCBuID0gZGF0YS5sZW5ndGg7XG4gICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICAocG9pbnRzW2ldID0gWyArZnguY2FsbCh0aGlzLCBkID0gZGF0YVtpXSwgaSksICtmeS5jYWxsKHRoaXMsIGQsIGkpIF0pLmRhdGEgPSBkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGQzLmdlb20uZGVsYXVuYXkocG9pbnRzKS5tYXAoZnVuY3Rpb24odHJpYW5nbGUpIHtcbiAgICAgICAgcmV0dXJuIHRyaWFuZ2xlLm1hcChmdW5jdGlvbihwb2ludCkge1xuICAgICAgICAgIHJldHVybiBwb2ludC5kYXRhO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIHZvcm9ub2k7XG4gIH07XG4gIHZhciBkM19nZW9tX3Zvcm9ub2lPcHBvc2l0ZSA9IHtcbiAgICBsOiBcInJcIixcbiAgICByOiBcImxcIlxuICB9O1xuICBmdW5jdGlvbiBkM19nZW9tX3Zvcm9ub2lUZXNzZWxsYXRlKHBvaW50cywgY2FsbGJhY2spIHtcbiAgICB2YXIgU2l0ZXMgPSB7XG4gICAgICBsaXN0OiBwb2ludHMubWFwKGZ1bmN0aW9uKHYsIGkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpbmRleDogaSxcbiAgICAgICAgICB4OiB2WzBdLFxuICAgICAgICAgIHk6IHZbMV1cbiAgICAgICAgfTtcbiAgICAgIH0pLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gYS55IDwgYi55ID8gLTEgOiBhLnkgPiBiLnkgPyAxIDogYS54IDwgYi54ID8gLTEgOiBhLnggPiBiLnggPyAxIDogMDtcbiAgICAgIH0pLFxuICAgICAgYm90dG9tU2l0ZTogbnVsbFxuICAgIH07XG4gICAgdmFyIEVkZ2VMaXN0ID0ge1xuICAgICAgbGlzdDogW10sXG4gICAgICBsZWZ0RW5kOiBudWxsLFxuICAgICAgcmlnaHRFbmQ6IG51bGwsXG4gICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgRWRnZUxpc3QubGVmdEVuZCA9IEVkZ2VMaXN0LmNyZWF0ZUhhbGZFZGdlKG51bGwsIFwibFwiKTtcbiAgICAgICAgRWRnZUxpc3QucmlnaHRFbmQgPSBFZGdlTGlzdC5jcmVhdGVIYWxmRWRnZShudWxsLCBcImxcIik7XG4gICAgICAgIEVkZ2VMaXN0LmxlZnRFbmQuciA9IEVkZ2VMaXN0LnJpZ2h0RW5kO1xuICAgICAgICBFZGdlTGlzdC5yaWdodEVuZC5sID0gRWRnZUxpc3QubGVmdEVuZDtcbiAgICAgICAgRWRnZUxpc3QubGlzdC51bnNoaWZ0KEVkZ2VMaXN0LmxlZnRFbmQsIEVkZ2VMaXN0LnJpZ2h0RW5kKTtcbiAgICAgIH0sXG4gICAgICBjcmVhdGVIYWxmRWRnZTogZnVuY3Rpb24oZWRnZSwgc2lkZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGVkZ2U6IGVkZ2UsXG4gICAgICAgICAgc2lkZTogc2lkZSxcbiAgICAgICAgICB2ZXJ0ZXg6IG51bGwsXG4gICAgICAgICAgbDogbnVsbCxcbiAgICAgICAgICByOiBudWxsXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgaW5zZXJ0OiBmdW5jdGlvbihsYiwgaGUpIHtcbiAgICAgICAgaGUubCA9IGxiO1xuICAgICAgICBoZS5yID0gbGIucjtcbiAgICAgICAgbGIuci5sID0gaGU7XG4gICAgICAgIGxiLnIgPSBoZTtcbiAgICAgIH0sXG4gICAgICBsZWZ0Qm91bmQ6IGZ1bmN0aW9uKHApIHtcbiAgICAgICAgdmFyIGhlID0gRWRnZUxpc3QubGVmdEVuZDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIGhlID0gaGUucjtcbiAgICAgICAgfSB3aGlsZSAoaGUgIT0gRWRnZUxpc3QucmlnaHRFbmQgJiYgR2VvbS5yaWdodE9mKGhlLCBwKSk7XG4gICAgICAgIGhlID0gaGUubDtcbiAgICAgICAgcmV0dXJuIGhlO1xuICAgICAgfSxcbiAgICAgIGRlbDogZnVuY3Rpb24oaGUpIHtcbiAgICAgICAgaGUubC5yID0gaGUucjtcbiAgICAgICAgaGUuci5sID0gaGUubDtcbiAgICAgICAgaGUuZWRnZSA9IG51bGw7XG4gICAgICB9LFxuICAgICAgcmlnaHQ6IGZ1bmN0aW9uKGhlKSB7XG4gICAgICAgIHJldHVybiBoZS5yO1xuICAgICAgfSxcbiAgICAgIGxlZnQ6IGZ1bmN0aW9uKGhlKSB7XG4gICAgICAgIHJldHVybiBoZS5sO1xuICAgICAgfSxcbiAgICAgIGxlZnRSZWdpb246IGZ1bmN0aW9uKGhlKSB7XG4gICAgICAgIHJldHVybiBoZS5lZGdlID09IG51bGwgPyBTaXRlcy5ib3R0b21TaXRlIDogaGUuZWRnZS5yZWdpb25baGUuc2lkZV07XG4gICAgICB9LFxuICAgICAgcmlnaHRSZWdpb246IGZ1bmN0aW9uKGhlKSB7XG4gICAgICAgIHJldHVybiBoZS5lZGdlID09IG51bGwgPyBTaXRlcy5ib3R0b21TaXRlIDogaGUuZWRnZS5yZWdpb25bZDNfZ2VvbV92b3Jvbm9pT3Bwb3NpdGVbaGUuc2lkZV1dO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIEdlb20gPSB7XG4gICAgICBiaXNlY3Q6IGZ1bmN0aW9uKHMxLCBzMikge1xuICAgICAgICB2YXIgbmV3RWRnZSA9IHtcbiAgICAgICAgICByZWdpb246IHtcbiAgICAgICAgICAgIGw6IHMxLFxuICAgICAgICAgICAgcjogczJcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVwOiB7XG4gICAgICAgICAgICBsOiBudWxsLFxuICAgICAgICAgICAgcjogbnVsbFxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGR4ID0gczIueCAtIHMxLngsIGR5ID0gczIueSAtIHMxLnksIGFkeCA9IGR4ID4gMCA/IGR4IDogLWR4LCBhZHkgPSBkeSA+IDAgPyBkeSA6IC1keTtcbiAgICAgICAgbmV3RWRnZS5jID0gczEueCAqIGR4ICsgczEueSAqIGR5ICsgKGR4ICogZHggKyBkeSAqIGR5KSAqIC41O1xuICAgICAgICBpZiAoYWR4ID4gYWR5KSB7XG4gICAgICAgICAgbmV3RWRnZS5hID0gMTtcbiAgICAgICAgICBuZXdFZGdlLmIgPSBkeSAvIGR4O1xuICAgICAgICAgIG5ld0VkZ2UuYyAvPSBkeDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdFZGdlLmIgPSAxO1xuICAgICAgICAgIG5ld0VkZ2UuYSA9IGR4IC8gZHk7XG4gICAgICAgICAgbmV3RWRnZS5jIC89IGR5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdFZGdlO1xuICAgICAgfSxcbiAgICAgIGludGVyc2VjdDogZnVuY3Rpb24oZWwxLCBlbDIpIHtcbiAgICAgICAgdmFyIGUxID0gZWwxLmVkZ2UsIGUyID0gZWwyLmVkZ2U7XG4gICAgICAgIGlmICghZTEgfHwgIWUyIHx8IGUxLnJlZ2lvbi5yID09IGUyLnJlZ2lvbi5yKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGQgPSBlMS5hICogZTIuYiAtIGUxLmIgKiBlMi5hO1xuICAgICAgICBpZiAoTWF0aC5hYnMoZCkgPCAxZS0xMCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciB4aW50ID0gKGUxLmMgKiBlMi5iIC0gZTIuYyAqIGUxLmIpIC8gZCwgeWludCA9IChlMi5jICogZTEuYSAtIGUxLmMgKiBlMi5hKSAvIGQsIGUxciA9IGUxLnJlZ2lvbi5yLCBlMnIgPSBlMi5yZWdpb24uciwgZWwsIGU7XG4gICAgICAgIGlmIChlMXIueSA8IGUyci55IHx8IGUxci55ID09IGUyci55ICYmIGUxci54IDwgZTJyLngpIHtcbiAgICAgICAgICBlbCA9IGVsMTtcbiAgICAgICAgICBlID0gZTE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWwgPSBlbDI7XG4gICAgICAgICAgZSA9IGUyO1xuICAgICAgICB9XG4gICAgICAgIHZhciByaWdodE9mU2l0ZSA9IHhpbnQgPj0gZS5yZWdpb24uci54O1xuICAgICAgICBpZiAocmlnaHRPZlNpdGUgJiYgZWwuc2lkZSA9PT0gXCJsXCIgfHwgIXJpZ2h0T2ZTaXRlICYmIGVsLnNpZGUgPT09IFwiclwiKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiB4aW50LFxuICAgICAgICAgIHk6IHlpbnRcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICByaWdodE9mOiBmdW5jdGlvbihoZSwgcCkge1xuICAgICAgICB2YXIgZSA9IGhlLmVkZ2UsIHRvcHNpdGUgPSBlLnJlZ2lvbi5yLCByaWdodE9mU2l0ZSA9IHAueCA+IHRvcHNpdGUueDtcbiAgICAgICAgaWYgKHJpZ2h0T2ZTaXRlICYmIGhlLnNpZGUgPT09IFwibFwiKSB7XG4gICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyaWdodE9mU2l0ZSAmJiBoZS5zaWRlID09PSBcInJcIikge1xuICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlLmEgPT09IDEpIHtcbiAgICAgICAgICB2YXIgZHlwID0gcC55IC0gdG9wc2l0ZS55LCBkeHAgPSBwLnggLSB0b3BzaXRlLngsIGZhc3QgPSAwLCBhYm92ZSA9IDA7XG4gICAgICAgICAgaWYgKCFyaWdodE9mU2l0ZSAmJiBlLmIgPCAwIHx8IHJpZ2h0T2ZTaXRlICYmIGUuYiA+PSAwKSB7XG4gICAgICAgICAgICBhYm92ZSA9IGZhc3QgPSBkeXAgPj0gZS5iICogZHhwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhYm92ZSA9IHAueCArIHAueSAqIGUuYiA+IGUuYztcbiAgICAgICAgICAgIGlmIChlLmIgPCAwKSB7XG4gICAgICAgICAgICAgIGFib3ZlID0gIWFib3ZlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFhYm92ZSkge1xuICAgICAgICAgICAgICBmYXN0ID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFmYXN0KSB7XG4gICAgICAgICAgICB2YXIgZHhzID0gdG9wc2l0ZS54IC0gZS5yZWdpb24ubC54O1xuICAgICAgICAgICAgYWJvdmUgPSBlLmIgKiAoZHhwICogZHhwIC0gZHlwICogZHlwKSA8IGR4cyAqIGR5cCAqICgxICsgMiAqIGR4cCAvIGR4cyArIGUuYiAqIGUuYik7XG4gICAgICAgICAgICBpZiAoZS5iIDwgMCkge1xuICAgICAgICAgICAgICBhYm92ZSA9ICFhYm92ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHlsID0gZS5jIC0gZS5hICogcC54LCB0MSA9IHAueSAtIHlsLCB0MiA9IHAueCAtIHRvcHNpdGUueCwgdDMgPSB5bCAtIHRvcHNpdGUueTtcbiAgICAgICAgICBhYm92ZSA9IHQxICogdDEgPiB0MiAqIHQyICsgdDMgKiB0MztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGUuc2lkZSA9PT0gXCJsXCIgPyBhYm92ZSA6ICFhYm92ZTtcbiAgICAgIH0sXG4gICAgICBlbmRQb2ludDogZnVuY3Rpb24oZWRnZSwgc2lkZSwgc2l0ZSkge1xuICAgICAgICBlZGdlLmVwW3NpZGVdID0gc2l0ZTtcbiAgICAgICAgaWYgKCFlZGdlLmVwW2QzX2dlb21fdm9yb25vaU9wcG9zaXRlW3NpZGVdXSkgcmV0dXJuO1xuICAgICAgICBjYWxsYmFjayhlZGdlKTtcbiAgICAgIH0sXG4gICAgICBkaXN0YW5jZTogZnVuY3Rpb24ocywgdCkge1xuICAgICAgICB2YXIgZHggPSBzLnggLSB0LngsIGR5ID0gcy55IC0gdC55O1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBFdmVudFF1ZXVlID0ge1xuICAgICAgbGlzdDogW10sXG4gICAgICBpbnNlcnQ6IGZ1bmN0aW9uKGhlLCBzaXRlLCBvZmZzZXQpIHtcbiAgICAgICAgaGUudmVydGV4ID0gc2l0ZTtcbiAgICAgICAgaGUueXN0YXIgPSBzaXRlLnkgKyBvZmZzZXQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsaXN0ID0gRXZlbnRRdWV1ZS5saXN0LCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICB2YXIgbmV4dCA9IGxpc3RbaV07XG4gICAgICAgICAgaWYgKGhlLnlzdGFyID4gbmV4dC55c3RhciB8fCBoZS55c3RhciA9PSBuZXh0LnlzdGFyICYmIHNpdGUueCA+IG5leHQudmVydGV4LngpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGlzdC5zcGxpY2UoaSwgMCwgaGUpO1xuICAgICAgfSxcbiAgICAgIGRlbDogZnVuY3Rpb24oaGUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxzID0gRXZlbnRRdWV1ZS5saXN0LCBsID0gbHMubGVuZ3RoOyBpIDwgbCAmJiBsc1tpXSAhPSBoZTsgKytpKSB7fVxuICAgICAgICBscy5zcGxpY2UoaSwgMSk7XG4gICAgICB9LFxuICAgICAgZW1wdHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gRXZlbnRRdWV1ZS5saXN0Lmxlbmd0aCA9PT0gMDtcbiAgICAgIH0sXG4gICAgICBuZXh0RXZlbnQ6IGZ1bmN0aW9uKGhlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBscyA9IEV2ZW50UXVldWUubGlzdCwgbCA9IGxzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICAgIGlmIChsc1tpXSA9PSBoZSkgcmV0dXJuIGxzW2kgKyAxXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0sXG4gICAgICBtaW46IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbSA9IEV2ZW50UXVldWUubGlzdFswXTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiBlbGVtLnZlcnRleC54LFxuICAgICAgICAgIHk6IGVsZW0ueXN0YXJcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBleHRyYWN0TWluOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEV2ZW50UXVldWUubGlzdC5zaGlmdCgpO1xuICAgICAgfVxuICAgIH07XG4gICAgRWRnZUxpc3QuaW5pdCgpO1xuICAgIFNpdGVzLmJvdHRvbVNpdGUgPSBTaXRlcy5saXN0LnNoaWZ0KCk7XG4gICAgdmFyIG5ld1NpdGUgPSBTaXRlcy5saXN0LnNoaWZ0KCksIG5ld0ludFN0YXI7XG4gICAgdmFyIGxibmQsIHJibmQsIGxsYm5kLCBycmJuZCwgYmlzZWN0b3I7XG4gICAgdmFyIGJvdCwgdG9wLCB0ZW1wLCBwLCB2O1xuICAgIHZhciBlLCBwbTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgaWYgKCFFdmVudFF1ZXVlLmVtcHR5KCkpIHtcbiAgICAgICAgbmV3SW50U3RhciA9IEV2ZW50UXVldWUubWluKCk7XG4gICAgICB9XG4gICAgICBpZiAobmV3U2l0ZSAmJiAoRXZlbnRRdWV1ZS5lbXB0eSgpIHx8IG5ld1NpdGUueSA8IG5ld0ludFN0YXIueSB8fCBuZXdTaXRlLnkgPT0gbmV3SW50U3Rhci55ICYmIG5ld1NpdGUueCA8IG5ld0ludFN0YXIueCkpIHtcbiAgICAgICAgbGJuZCA9IEVkZ2VMaXN0LmxlZnRCb3VuZChuZXdTaXRlKTtcbiAgICAgICAgcmJuZCA9IEVkZ2VMaXN0LnJpZ2h0KGxibmQpO1xuICAgICAgICBib3QgPSBFZGdlTGlzdC5yaWdodFJlZ2lvbihsYm5kKTtcbiAgICAgICAgZSA9IEdlb20uYmlzZWN0KGJvdCwgbmV3U2l0ZSk7XG4gICAgICAgIGJpc2VjdG9yID0gRWRnZUxpc3QuY3JlYXRlSGFsZkVkZ2UoZSwgXCJsXCIpO1xuICAgICAgICBFZGdlTGlzdC5pbnNlcnQobGJuZCwgYmlzZWN0b3IpO1xuICAgICAgICBwID0gR2VvbS5pbnRlcnNlY3QobGJuZCwgYmlzZWN0b3IpO1xuICAgICAgICBpZiAocCkge1xuICAgICAgICAgIEV2ZW50UXVldWUuZGVsKGxibmQpO1xuICAgICAgICAgIEV2ZW50UXVldWUuaW5zZXJ0KGxibmQsIHAsIEdlb20uZGlzdGFuY2UocCwgbmV3U2l0ZSkpO1xuICAgICAgICB9XG4gICAgICAgIGxibmQgPSBiaXNlY3RvcjtcbiAgICAgICAgYmlzZWN0b3IgPSBFZGdlTGlzdC5jcmVhdGVIYWxmRWRnZShlLCBcInJcIik7XG4gICAgICAgIEVkZ2VMaXN0Lmluc2VydChsYm5kLCBiaXNlY3Rvcik7XG4gICAgICAgIHAgPSBHZW9tLmludGVyc2VjdChiaXNlY3RvciwgcmJuZCk7XG4gICAgICAgIGlmIChwKSB7XG4gICAgICAgICAgRXZlbnRRdWV1ZS5pbnNlcnQoYmlzZWN0b3IsIHAsIEdlb20uZGlzdGFuY2UocCwgbmV3U2l0ZSkpO1xuICAgICAgICB9XG4gICAgICAgIG5ld1NpdGUgPSBTaXRlcy5saXN0LnNoaWZ0KCk7XG4gICAgICB9IGVsc2UgaWYgKCFFdmVudFF1ZXVlLmVtcHR5KCkpIHtcbiAgICAgICAgbGJuZCA9IEV2ZW50UXVldWUuZXh0cmFjdE1pbigpO1xuICAgICAgICBsbGJuZCA9IEVkZ2VMaXN0LmxlZnQobGJuZCk7XG4gICAgICAgIHJibmQgPSBFZGdlTGlzdC5yaWdodChsYm5kKTtcbiAgICAgICAgcnJibmQgPSBFZGdlTGlzdC5yaWdodChyYm5kKTtcbiAgICAgICAgYm90ID0gRWRnZUxpc3QubGVmdFJlZ2lvbihsYm5kKTtcbiAgICAgICAgdG9wID0gRWRnZUxpc3QucmlnaHRSZWdpb24ocmJuZCk7XG4gICAgICAgIHYgPSBsYm5kLnZlcnRleDtcbiAgICAgICAgR2VvbS5lbmRQb2ludChsYm5kLmVkZ2UsIGxibmQuc2lkZSwgdik7XG4gICAgICAgIEdlb20uZW5kUG9pbnQocmJuZC5lZGdlLCByYm5kLnNpZGUsIHYpO1xuICAgICAgICBFZGdlTGlzdC5kZWwobGJuZCk7XG4gICAgICAgIEV2ZW50UXVldWUuZGVsKHJibmQpO1xuICAgICAgICBFZGdlTGlzdC5kZWwocmJuZCk7XG4gICAgICAgIHBtID0gXCJsXCI7XG4gICAgICAgIGlmIChib3QueSA+IHRvcC55KSB7XG4gICAgICAgICAgdGVtcCA9IGJvdDtcbiAgICAgICAgICBib3QgPSB0b3A7XG4gICAgICAgICAgdG9wID0gdGVtcDtcbiAgICAgICAgICBwbSA9IFwiclwiO1xuICAgICAgICB9XG4gICAgICAgIGUgPSBHZW9tLmJpc2VjdChib3QsIHRvcCk7XG4gICAgICAgIGJpc2VjdG9yID0gRWRnZUxpc3QuY3JlYXRlSGFsZkVkZ2UoZSwgcG0pO1xuICAgICAgICBFZGdlTGlzdC5pbnNlcnQobGxibmQsIGJpc2VjdG9yKTtcbiAgICAgICAgR2VvbS5lbmRQb2ludChlLCBkM19nZW9tX3Zvcm9ub2lPcHBvc2l0ZVtwbV0sIHYpO1xuICAgICAgICBwID0gR2VvbS5pbnRlcnNlY3QobGxibmQsIGJpc2VjdG9yKTtcbiAgICAgICAgaWYgKHApIHtcbiAgICAgICAgICBFdmVudFF1ZXVlLmRlbChsbGJuZCk7XG4gICAgICAgICAgRXZlbnRRdWV1ZS5pbnNlcnQobGxibmQsIHAsIEdlb20uZGlzdGFuY2UocCwgYm90KSk7XG4gICAgICAgIH1cbiAgICAgICAgcCA9IEdlb20uaW50ZXJzZWN0KGJpc2VjdG9yLCBycmJuZCk7XG4gICAgICAgIGlmIChwKSB7XG4gICAgICAgICAgRXZlbnRRdWV1ZS5pbnNlcnQoYmlzZWN0b3IsIHAsIEdlb20uZGlzdGFuY2UocCwgYm90KSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxibmQgPSBFZGdlTGlzdC5yaWdodChFZGdlTGlzdC5sZWZ0RW5kKTsgbGJuZCAhPSBFZGdlTGlzdC5yaWdodEVuZDsgbGJuZCA9IEVkZ2VMaXN0LnJpZ2h0KGxibmQpKSB7XG4gICAgICBjYWxsYmFjayhsYm5kLmVkZ2UpO1xuICAgIH1cbiAgfVxuICBkMy5nZW9tLnF1YWR0cmVlID0gZnVuY3Rpb24ocG9pbnRzLCB4MSwgeTEsIHgyLCB5Mikge1xuICAgIHZhciB4ID0gZDNfc3ZnX2xpbmVYLCB5ID0gZDNfc3ZnX2xpbmVZLCBjb21wYXQ7XG4gICAgaWYgKGNvbXBhdCA9IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHggPSBkM19nZW9tX3F1YWR0cmVlQ29tcGF0WDtcbiAgICAgIHkgPSBkM19nZW9tX3F1YWR0cmVlQ29tcGF0WTtcbiAgICAgIGlmIChjb21wYXQgPT09IDMpIHtcbiAgICAgICAgeTIgPSB5MTtcbiAgICAgICAgeDIgPSB4MTtcbiAgICAgICAgeTEgPSB4MSA9IDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gcXVhZHRyZWUocG9pbnRzKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcXVhZHRyZWUoZGF0YSkge1xuICAgICAgdmFyIGQsIGZ4ID0gZDNfZnVuY3Rvcih4KSwgZnkgPSBkM19mdW5jdG9yKHkpLCB4cywgeXMsIGksIG4sIHgxXywgeTFfLCB4Ml8sIHkyXztcbiAgICAgIGlmICh4MSAhPSBudWxsKSB7XG4gICAgICAgIHgxXyA9IHgxLCB5MV8gPSB5MSwgeDJfID0geDIsIHkyXyA9IHkyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeDJfID0geTJfID0gLSh4MV8gPSB5MV8gPSBJbmZpbml0eSk7XG4gICAgICAgIHhzID0gW10sIHlzID0gW107XG4gICAgICAgIG4gPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgaWYgKGNvbXBhdCkgZm9yIChpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgICAgIGQgPSBkYXRhW2ldO1xuICAgICAgICAgIGlmIChkLnggPCB4MV8pIHgxXyA9IGQueDtcbiAgICAgICAgICBpZiAoZC55IDwgeTFfKSB5MV8gPSBkLnk7XG4gICAgICAgICAgaWYgKGQueCA+IHgyXykgeDJfID0gZC54O1xuICAgICAgICAgIGlmIChkLnkgPiB5Ml8pIHkyXyA9IGQueTtcbiAgICAgICAgICB4cy5wdXNoKGQueCk7XG4gICAgICAgICAgeXMucHVzaChkLnkpO1xuICAgICAgICB9IGVsc2UgZm9yIChpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgICAgIHZhciB4XyA9ICtmeChkID0gZGF0YVtpXSwgaSksIHlfID0gK2Z5KGQsIGkpO1xuICAgICAgICAgIGlmICh4XyA8IHgxXykgeDFfID0geF87XG4gICAgICAgICAgaWYgKHlfIDwgeTFfKSB5MV8gPSB5XztcbiAgICAgICAgICBpZiAoeF8gPiB4Ml8pIHgyXyA9IHhfO1xuICAgICAgICAgIGlmICh5XyA+IHkyXykgeTJfID0geV87XG4gICAgICAgICAgeHMucHVzaCh4Xyk7XG4gICAgICAgICAgeXMucHVzaCh5Xyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBkeCA9IHgyXyAtIHgxXywgZHkgPSB5Ml8gLSB5MV87XG4gICAgICBpZiAoZHggPiBkeSkgeTJfID0geTFfICsgZHg7IGVsc2UgeDJfID0geDFfICsgZHk7XG4gICAgICBmdW5jdGlvbiBpbnNlcnQobiwgZCwgeCwgeSwgeDEsIHkxLCB4MiwgeTIpIHtcbiAgICAgICAgaWYgKGlzTmFOKHgpIHx8IGlzTmFOKHkpKSByZXR1cm47XG4gICAgICAgIGlmIChuLmxlYWYpIHtcbiAgICAgICAgICB2YXIgbnggPSBuLngsIG55ID0gbi55O1xuICAgICAgICAgIGlmIChueCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMobnggLSB4KSArIE1hdGguYWJzKG55IC0geSkgPCAuMDEpIHtcbiAgICAgICAgICAgICAgaW5zZXJ0Q2hpbGQobiwgZCwgeCwgeSwgeDEsIHkxLCB4MiwgeTIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdmFyIG5Qb2ludCA9IG4ucG9pbnQ7XG4gICAgICAgICAgICAgIG4ueCA9IG4ueSA9IG4ucG9pbnQgPSBudWxsO1xuICAgICAgICAgICAgICBpbnNlcnRDaGlsZChuLCBuUG9pbnQsIG54LCBueSwgeDEsIHkxLCB4MiwgeTIpO1xuICAgICAgICAgICAgICBpbnNlcnRDaGlsZChuLCBkLCB4LCB5LCB4MSwgeTEsIHgyLCB5Mik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG4ueCA9IHgsIG4ueSA9IHksIG4ucG9pbnQgPSBkO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbnNlcnRDaGlsZChuLCBkLCB4LCB5LCB4MSwgeTEsIHgyLCB5Mik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGluc2VydENoaWxkKG4sIGQsIHgsIHksIHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgICAgIHZhciBzeCA9ICh4MSArIHgyKSAqIC41LCBzeSA9ICh5MSArIHkyKSAqIC41LCByaWdodCA9IHggPj0gc3gsIGJvdHRvbSA9IHkgPj0gc3ksIGkgPSAoYm90dG9tIDw8IDEpICsgcmlnaHQ7XG4gICAgICAgIG4ubGVhZiA9IGZhbHNlO1xuICAgICAgICBuID0gbi5ub2Rlc1tpXSB8fCAobi5ub2Rlc1tpXSA9IGQzX2dlb21fcXVhZHRyZWVOb2RlKCkpO1xuICAgICAgICBpZiAocmlnaHQpIHgxID0gc3g7IGVsc2UgeDIgPSBzeDtcbiAgICAgICAgaWYgKGJvdHRvbSkgeTEgPSBzeTsgZWxzZSB5MiA9IHN5O1xuICAgICAgICBpbnNlcnQobiwgZCwgeCwgeSwgeDEsIHkxLCB4MiwgeTIpO1xuICAgICAgfVxuICAgICAgdmFyIHJvb3QgPSBkM19nZW9tX3F1YWR0cmVlTm9kZSgpO1xuICAgICAgcm9vdC5hZGQgPSBmdW5jdGlvbihkKSB7XG4gICAgICAgIGluc2VydChyb290LCBkLCArZngoZCwgKytpKSwgK2Z5KGQsIGkpLCB4MV8sIHkxXywgeDJfLCB5Ml8pO1xuICAgICAgfTtcbiAgICAgIHJvb3QudmlzaXQgPSBmdW5jdGlvbihmKSB7XG4gICAgICAgIGQzX2dlb21fcXVhZHRyZWVWaXNpdChmLCByb290LCB4MV8sIHkxXywgeDJfLCB5Ml8pO1xuICAgICAgfTtcbiAgICAgIGkgPSAtMTtcbiAgICAgIGlmICh4MSA9PSBudWxsKSB7XG4gICAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgICAgaW5zZXJ0KHJvb3QsIGRhdGFbaV0sIHhzW2ldLCB5c1tpXSwgeDFfLCB5MV8sIHgyXywgeTJfKTtcbiAgICAgICAgfVxuICAgICAgICAtLWk7XG4gICAgICB9IGVsc2UgZGF0YS5mb3JFYWNoKHJvb3QuYWRkKTtcbiAgICAgIHhzID0geXMgPSBkYXRhID0gZCA9IG51bGw7XG4gICAgICByZXR1cm4gcm9vdDtcbiAgICB9XG4gICAgcXVhZHRyZWUueCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHggPSBfLCBxdWFkdHJlZSkgOiB4O1xuICAgIH07XG4gICAgcXVhZHRyZWUueSA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHkgPSBfLCBxdWFkdHJlZSkgOiB5O1xuICAgIH07XG4gICAgcXVhZHRyZWUuZXh0ZW50ID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4geDEgPT0gbnVsbCA/IG51bGwgOiBbIFsgeDEsIHkxIF0sIFsgeDIsIHkyIF0gXTtcbiAgICAgIGlmIChfID09IG51bGwpIHgxID0geTEgPSB4MiA9IHkyID0gbnVsbDsgZWxzZSB4MSA9ICtfWzBdWzBdLCB5MSA9ICtfWzBdWzFdLCB4MiA9ICtfWzFdWzBdLCBcbiAgICAgIHkyID0gK19bMV1bMV07XG4gICAgICByZXR1cm4gcXVhZHRyZWU7XG4gICAgfTtcbiAgICBxdWFkdHJlZS5zaXplID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4geDEgPT0gbnVsbCA/IG51bGwgOiBbIHgyIC0geDEsIHkyIC0geTEgXTtcbiAgICAgIGlmIChfID09IG51bGwpIHgxID0geTEgPSB4MiA9IHkyID0gbnVsbDsgZWxzZSB4MSA9IHkxID0gMCwgeDIgPSArX1swXSwgeTIgPSArX1sxXTtcbiAgICAgIHJldHVybiBxdWFkdHJlZTtcbiAgICB9O1xuICAgIHJldHVybiBxdWFkdHJlZTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfZ2VvbV9xdWFkdHJlZUNvbXBhdFgoZCkge1xuICAgIHJldHVybiBkLng7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvbV9xdWFkdHJlZUNvbXBhdFkoZCkge1xuICAgIHJldHVybiBkLnk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvbV9xdWFkdHJlZU5vZGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxlYWY6IHRydWUsXG4gICAgICBub2RlczogW10sXG4gICAgICBwb2ludDogbnVsbCxcbiAgICAgIHg6IG51bGwsXG4gICAgICB5OiBudWxsXG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkM19nZW9tX3F1YWR0cmVlVmlzaXQoZiwgbm9kZSwgeDEsIHkxLCB4MiwgeTIpIHtcbiAgICBpZiAoIWYobm9kZSwgeDEsIHkxLCB4MiwgeTIpKSB7XG4gICAgICB2YXIgc3ggPSAoeDEgKyB4MikgKiAuNSwgc3kgPSAoeTEgKyB5MikgKiAuNSwgY2hpbGRyZW4gPSBub2RlLm5vZGVzO1xuICAgICAgaWYgKGNoaWxkcmVuWzBdKSBkM19nZW9tX3F1YWR0cmVlVmlzaXQoZiwgY2hpbGRyZW5bMF0sIHgxLCB5MSwgc3gsIHN5KTtcbiAgICAgIGlmIChjaGlsZHJlblsxXSkgZDNfZ2VvbV9xdWFkdHJlZVZpc2l0KGYsIGNoaWxkcmVuWzFdLCBzeCwgeTEsIHgyLCBzeSk7XG4gICAgICBpZiAoY2hpbGRyZW5bMl0pIGQzX2dlb21fcXVhZHRyZWVWaXNpdChmLCBjaGlsZHJlblsyXSwgeDEsIHN5LCBzeCwgeTIpO1xuICAgICAgaWYgKGNoaWxkcmVuWzNdKSBkM19nZW9tX3F1YWR0cmVlVmlzaXQoZiwgY2hpbGRyZW5bM10sIHN4LCBzeSwgeDIsIHkyKTtcbiAgICB9XG4gIH1cbiAgZDMuaW50ZXJwb2xhdGVSZ2IgPSBkM19pbnRlcnBvbGF0ZVJnYjtcbiAgZnVuY3Rpb24gZDNfaW50ZXJwb2xhdGVSZ2IoYSwgYikge1xuICAgIGEgPSBkMy5yZ2IoYSk7XG4gICAgYiA9IGQzLnJnYihiKTtcbiAgICB2YXIgYXIgPSBhLnIsIGFnID0gYS5nLCBhYiA9IGEuYiwgYnIgPSBiLnIgLSBhciwgYmcgPSBiLmcgLSBhZywgYmIgPSBiLmIgLSBhYjtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgcmV0dXJuIFwiI1wiICsgZDNfcmdiX2hleChNYXRoLnJvdW5kKGFyICsgYnIgKiB0KSkgKyBkM19yZ2JfaGV4KE1hdGgucm91bmQoYWcgKyBiZyAqIHQpKSArIGQzX3JnYl9oZXgoTWF0aC5yb3VuZChhYiArIGJiICogdCkpO1xuICAgIH07XG4gIH1cbiAgZDMuaW50ZXJwb2xhdGVPYmplY3QgPSBkM19pbnRlcnBvbGF0ZU9iamVjdDtcbiAgZnVuY3Rpb24gZDNfaW50ZXJwb2xhdGVPYmplY3QoYSwgYikge1xuICAgIHZhciBpID0ge30sIGMgPSB7fSwgaztcbiAgICBmb3IgKGsgaW4gYSkge1xuICAgICAgaWYgKGsgaW4gYikge1xuICAgICAgICBpW2tdID0gZDNfaW50ZXJwb2xhdGUoYVtrXSwgYltrXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjW2tdID0gYVtrXTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChrIGluIGIpIHtcbiAgICAgIGlmICghKGsgaW4gYSkpIHtcbiAgICAgICAgY1trXSA9IGJba107XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICBmb3IgKGsgaW4gaSkgY1trXSA9IGlba10odCk7XG4gICAgICByZXR1cm4gYztcbiAgICB9O1xuICB9XG4gIGQzLmludGVycG9sYXRlTnVtYmVyID0gZDNfaW50ZXJwb2xhdGVOdW1iZXI7XG4gIGZ1bmN0aW9uIGQzX2ludGVycG9sYXRlTnVtYmVyKGEsIGIpIHtcbiAgICBiIC09IGEgPSArYTtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgcmV0dXJuIGEgKyBiICogdDtcbiAgICB9O1xuICB9XG4gIGQzLmludGVycG9sYXRlU3RyaW5nID0gZDNfaW50ZXJwb2xhdGVTdHJpbmc7XG4gIGZ1bmN0aW9uIGQzX2ludGVycG9sYXRlU3RyaW5nKGEsIGIpIHtcbiAgICB2YXIgbSwgaSwgaiwgczAgPSAwLCBzMSA9IDAsIHMgPSBbXSwgcSA9IFtdLCBuLCBvO1xuICAgIGEgPSBhICsgXCJcIiwgYiA9IGIgKyBcIlwiO1xuICAgIGQzX2ludGVycG9sYXRlX251bWJlci5sYXN0SW5kZXggPSAwO1xuICAgIGZvciAoaSA9IDA7IG0gPSBkM19pbnRlcnBvbGF0ZV9udW1iZXIuZXhlYyhiKTsgKytpKSB7XG4gICAgICBpZiAobS5pbmRleCkgcy5wdXNoKGIuc3Vic3RyaW5nKHMwLCBzMSA9IG0uaW5kZXgpKTtcbiAgICAgIHEucHVzaCh7XG4gICAgICAgIGk6IHMubGVuZ3RoLFxuICAgICAgICB4OiBtWzBdXG4gICAgICB9KTtcbiAgICAgIHMucHVzaChudWxsKTtcbiAgICAgIHMwID0gZDNfaW50ZXJwb2xhdGVfbnVtYmVyLmxhc3RJbmRleDtcbiAgICB9XG4gICAgaWYgKHMwIDwgYi5sZW5ndGgpIHMucHVzaChiLnN1YnN0cmluZyhzMCkpO1xuICAgIGZvciAoaSA9IDAsIG4gPSBxLmxlbmd0aDsgKG0gPSBkM19pbnRlcnBvbGF0ZV9udW1iZXIuZXhlYyhhKSkgJiYgaSA8IG47ICsraSkge1xuICAgICAgbyA9IHFbaV07XG4gICAgICBpZiAoby54ID09IG1bMF0pIHtcbiAgICAgICAgaWYgKG8uaSkge1xuICAgICAgICAgIGlmIChzW28uaSArIDFdID09IG51bGwpIHtcbiAgICAgICAgICAgIHNbby5pIC0gMV0gKz0gby54O1xuICAgICAgICAgICAgcy5zcGxpY2Uoby5pLCAxKTtcbiAgICAgICAgICAgIGZvciAoaiA9IGkgKyAxOyBqIDwgbjsgKytqKSBxW2pdLmktLTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc1tvLmkgLSAxXSArPSBvLnggKyBzW28uaSArIDFdO1xuICAgICAgICAgICAgcy5zcGxpY2Uoby5pLCAyKTtcbiAgICAgICAgICAgIGZvciAoaiA9IGkgKyAxOyBqIDwgbjsgKytqKSBxW2pdLmkgLT0gMjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNbby5pICsgMV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgc1tvLmldID0gby54O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzW28uaV0gPSBvLnggKyBzW28uaSArIDFdO1xuICAgICAgICAgICAgcy5zcGxpY2Uoby5pICsgMSwgMSk7XG4gICAgICAgICAgICBmb3IgKGogPSBpICsgMTsgaiA8IG47ICsraikgcVtqXS5pLS07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHEuc3BsaWNlKGksIDEpO1xuICAgICAgICBuLS07XG4gICAgICAgIGktLTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG8ueCA9IGQzX2ludGVycG9sYXRlTnVtYmVyKHBhcnNlRmxvYXQobVswXSksIHBhcnNlRmxvYXQoby54KSk7XG4gICAgICB9XG4gICAgfVxuICAgIHdoaWxlIChpIDwgbikge1xuICAgICAgbyA9IHEucG9wKCk7XG4gICAgICBpZiAoc1tvLmkgKyAxXSA9PSBudWxsKSB7XG4gICAgICAgIHNbby5pXSA9IG8ueDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNbby5pXSA9IG8ueCArIHNbby5pICsgMV07XG4gICAgICAgIHMuc3BsaWNlKG8uaSArIDEsIDEpO1xuICAgICAgfVxuICAgICAgbi0tO1xuICAgIH1cbiAgICBpZiAocy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBzWzBdID09IG51bGwgPyAobyA9IHFbMF0ueCwgZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gbyh0KSArIFwiXCI7XG4gICAgICB9KSA6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gYjtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSBzWyhvID0gcVtpXSkuaV0gPSBvLngodCk7XG4gICAgICByZXR1cm4gcy5qb2luKFwiXCIpO1xuICAgIH07XG4gIH1cbiAgdmFyIGQzX2ludGVycG9sYXRlX251bWJlciA9IC9bLStdPyg/OlxcZCtcXC4/XFxkKnxcXC4/XFxkKykoPzpbZUVdWy0rXT9cXGQrKT8vZztcbiAgZDMuaW50ZXJwb2xhdGUgPSBkM19pbnRlcnBvbGF0ZTtcbiAgZnVuY3Rpb24gZDNfaW50ZXJwb2xhdGUoYSwgYikge1xuICAgIHZhciBpID0gZDMuaW50ZXJwb2xhdG9ycy5sZW5ndGgsIGY7XG4gICAgd2hpbGUgKC0taSA+PSAwICYmICEoZiA9IGQzLmludGVycG9sYXRvcnNbaV0oYSwgYikpKSA7XG4gICAgcmV0dXJuIGY7XG4gIH1cbiAgZDMuaW50ZXJwb2xhdG9ycyA9IFsgZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciB0ID0gdHlwZW9mIGI7XG4gICAgcmV0dXJuICh0ID09PSBcInN0cmluZ1wiID8gZDNfcmdiX25hbWVzLmhhcyhiKSB8fCAvXigjfHJnYlxcKHxoc2xcXCgpLy50ZXN0KGIpID8gZDNfaW50ZXJwb2xhdGVSZ2IgOiBkM19pbnRlcnBvbGF0ZVN0cmluZyA6IGIgaW5zdGFuY2VvZiBkM19Db2xvciA/IGQzX2ludGVycG9sYXRlUmdiIDogdCA9PT0gXCJvYmplY3RcIiA/IEFycmF5LmlzQXJyYXkoYikgPyBkM19pbnRlcnBvbGF0ZUFycmF5IDogZDNfaW50ZXJwb2xhdGVPYmplY3QgOiBkM19pbnRlcnBvbGF0ZU51bWJlcikoYSwgYik7XG4gIH0gXTtcbiAgZDMuaW50ZXJwb2xhdGVBcnJheSA9IGQzX2ludGVycG9sYXRlQXJyYXk7XG4gIGZ1bmN0aW9uIGQzX2ludGVycG9sYXRlQXJyYXkoYSwgYikge1xuICAgIHZhciB4ID0gW10sIGMgPSBbXSwgbmEgPSBhLmxlbmd0aCwgbmIgPSBiLmxlbmd0aCwgbjAgPSBNYXRoLm1pbihhLmxlbmd0aCwgYi5sZW5ndGgpLCBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBuMDsgKytpKSB4LnB1c2goZDNfaW50ZXJwb2xhdGUoYVtpXSwgYltpXSkpO1xuICAgIGZvciAoO2kgPCBuYTsgKytpKSBjW2ldID0gYVtpXTtcbiAgICBmb3IgKDtpIDwgbmI7ICsraSkgY1tpXSA9IGJbaV07XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBuMDsgKytpKSBjW2ldID0geFtpXSh0KTtcbiAgICAgIHJldHVybiBjO1xuICAgIH07XG4gIH1cbiAgdmFyIGQzX2Vhc2VfZGVmYXVsdCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkM19pZGVudGl0eTtcbiAgfTtcbiAgdmFyIGQzX2Vhc2UgPSBkMy5tYXAoe1xuICAgIGxpbmVhcjogZDNfZWFzZV9kZWZhdWx0LFxuICAgIHBvbHk6IGQzX2Vhc2VfcG9seSxcbiAgICBxdWFkOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkM19lYXNlX3F1YWQ7XG4gICAgfSxcbiAgICBjdWJpYzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZDNfZWFzZV9jdWJpYztcbiAgICB9LFxuICAgIHNpbjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZDNfZWFzZV9zaW47XG4gICAgfSxcbiAgICBleHA6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGQzX2Vhc2VfZXhwO1xuICAgIH0sXG4gICAgY2lyY2xlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkM19lYXNlX2NpcmNsZTtcbiAgICB9LFxuICAgIGVsYXN0aWM6IGQzX2Vhc2VfZWxhc3RpYyxcbiAgICBiYWNrOiBkM19lYXNlX2JhY2ssXG4gICAgYm91bmNlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkM19lYXNlX2JvdW5jZTtcbiAgICB9XG4gIH0pO1xuICB2YXIgZDNfZWFzZV9tb2RlID0gZDMubWFwKHtcbiAgICBcImluXCI6IGQzX2lkZW50aXR5LFxuICAgIG91dDogZDNfZWFzZV9yZXZlcnNlLFxuICAgIFwiaW4tb3V0XCI6IGQzX2Vhc2VfcmVmbGVjdCxcbiAgICBcIm91dC1pblwiOiBmdW5jdGlvbihmKSB7XG4gICAgICByZXR1cm4gZDNfZWFzZV9yZWZsZWN0KGQzX2Vhc2VfcmV2ZXJzZShmKSk7XG4gICAgfVxuICB9KTtcbiAgZDMuZWFzZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgaSA9IG5hbWUuaW5kZXhPZihcIi1cIiksIHQgPSBpID49IDAgPyBuYW1lLnN1YnN0cmluZygwLCBpKSA6IG5hbWUsIG0gPSBpID49IDAgPyBuYW1lLnN1YnN0cmluZyhpICsgMSkgOiBcImluXCI7XG4gICAgdCA9IGQzX2Vhc2UuZ2V0KHQpIHx8IGQzX2Vhc2VfZGVmYXVsdDtcbiAgICBtID0gZDNfZWFzZV9tb2RlLmdldChtKSB8fCBkM19pZGVudGl0eTtcbiAgICByZXR1cm4gZDNfZWFzZV9jbGFtcChtKHQuYXBwbHkobnVsbCwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSkpKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfZWFzZV9jbGFtcChmKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiB0IDw9IDAgPyAwIDogdCA+PSAxID8gMSA6IGYodCk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkM19lYXNlX3JldmVyc2UoZikge1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gMSAtIGYoMSAtIHQpO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gZDNfZWFzZV9yZWZsZWN0KGYpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgcmV0dXJuIC41ICogKHQgPCAuNSA/IGYoMiAqIHQpIDogMiAtIGYoMiAtIDIgKiB0KSk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkM19lYXNlX3F1YWQodCkge1xuICAgIHJldHVybiB0ICogdDtcbiAgfVxuICBmdW5jdGlvbiBkM19lYXNlX2N1YmljKHQpIHtcbiAgICByZXR1cm4gdCAqIHQgKiB0O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2Vhc2VfY3ViaWNJbk91dCh0KSB7XG4gICAgaWYgKHQgPD0gMCkgcmV0dXJuIDA7XG4gICAgaWYgKHQgPj0gMSkgcmV0dXJuIDE7XG4gICAgdmFyIHQyID0gdCAqIHQsIHQzID0gdDIgKiB0O1xuICAgIHJldHVybiA0ICogKHQgPCAuNSA/IHQzIDogMyAqICh0IC0gdDIpICsgdDMgLSAuNzUpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2Vhc2VfcG9seShlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiBNYXRoLnBvdyh0LCBlKTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2Vhc2Vfc2luKHQpIHtcbiAgICByZXR1cm4gMSAtIE1hdGguY29zKHQgKiDPgCAvIDIpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2Vhc2VfZXhwKHQpIHtcbiAgICByZXR1cm4gTWF0aC5wb3coMiwgMTAgKiAodCAtIDEpKTtcbiAgfVxuICBmdW5jdGlvbiBkM19lYXNlX2NpcmNsZSh0KSB7XG4gICAgcmV0dXJuIDEgLSBNYXRoLnNxcnQoMSAtIHQgKiB0KTtcbiAgfVxuICBmdW5jdGlvbiBkM19lYXNlX2VsYXN0aWMoYSwgcCkge1xuICAgIHZhciBzO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgcCA9IC40NTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkgcyA9IHAgLyAoMiAqIM+AKSAqIE1hdGguYXNpbigxIC8gYSk7IGVsc2UgYSA9IDEsIHMgPSBwIC8gNDtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgcmV0dXJuIDEgKyBhICogTWF0aC5wb3coMiwgMTAgKiAtdCkgKiBNYXRoLnNpbigodCAtIHMpICogMiAqIM+AIC8gcCk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkM19lYXNlX2JhY2socykge1xuICAgIGlmICghcykgcyA9IDEuNzAxNTg7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiB0ICogdCAqICgocyArIDEpICogdCAtIHMpO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gZDNfZWFzZV9ib3VuY2UodCkge1xuICAgIHJldHVybiB0IDwgMSAvIDIuNzUgPyA3LjU2MjUgKiB0ICogdCA6IHQgPCAyIC8gMi43NSA/IDcuNTYyNSAqICh0IC09IDEuNSAvIDIuNzUpICogdCArIC43NSA6IHQgPCAyLjUgLyAyLjc1ID8gNy41NjI1ICogKHQgLT0gMi4yNSAvIDIuNzUpICogdCArIC45Mzc1IDogNy41NjI1ICogKHQgLT0gMi42MjUgLyAyLjc1KSAqIHQgKyAuOTg0Mzc1O1xuICB9XG4gIGQzLmludGVycG9sYXRlSGNsID0gZDNfaW50ZXJwb2xhdGVIY2w7XG4gIGZ1bmN0aW9uIGQzX2ludGVycG9sYXRlSGNsKGEsIGIpIHtcbiAgICBhID0gZDMuaGNsKGEpO1xuICAgIGIgPSBkMy5oY2woYik7XG4gICAgdmFyIGFoID0gYS5oLCBhYyA9IGEuYywgYWwgPSBhLmwsIGJoID0gYi5oIC0gYWgsIGJjID0gYi5jIC0gYWMsIGJsID0gYi5sIC0gYWw7XG4gICAgaWYgKGlzTmFOKGJjKSkgYmMgPSAwLCBhYyA9IGlzTmFOKGFjKSA/IGIuYyA6IGFjO1xuICAgIGlmIChpc05hTihiaCkpIGJoID0gMCwgYWggPSBpc05hTihhaCkgPyBiLmggOiBhaDsgZWxzZSBpZiAoYmggPiAxODApIGJoIC09IDM2MDsgZWxzZSBpZiAoYmggPCAtMTgwKSBiaCArPSAzNjA7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiBkM19oY2xfbGFiKGFoICsgYmggKiB0LCBhYyArIGJjICogdCwgYWwgKyBibCAqIHQpICsgXCJcIjtcbiAgICB9O1xuICB9XG4gIGQzLmludGVycG9sYXRlSHNsID0gZDNfaW50ZXJwb2xhdGVIc2w7XG4gIGZ1bmN0aW9uIGQzX2ludGVycG9sYXRlSHNsKGEsIGIpIHtcbiAgICBhID0gZDMuaHNsKGEpO1xuICAgIGIgPSBkMy5oc2woYik7XG4gICAgdmFyIGFoID0gYS5oLCBhcyA9IGEucywgYWwgPSBhLmwsIGJoID0gYi5oIC0gYWgsIGJzID0gYi5zIC0gYXMsIGJsID0gYi5sIC0gYWw7XG4gICAgaWYgKGlzTmFOKGJzKSkgYnMgPSAwLCBhcyA9IGlzTmFOKGFzKSA/IGIucyA6IGFzO1xuICAgIGlmIChpc05hTihiaCkpIGJoID0gMCwgYWggPSBpc05hTihhaCkgPyBiLmggOiBhaDsgZWxzZSBpZiAoYmggPiAxODApIGJoIC09IDM2MDsgZWxzZSBpZiAoYmggPCAtMTgwKSBiaCArPSAzNjA7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiBkM19oc2xfcmdiKGFoICsgYmggKiB0LCBhcyArIGJzICogdCwgYWwgKyBibCAqIHQpICsgXCJcIjtcbiAgICB9O1xuICB9XG4gIGQzLmludGVycG9sYXRlTGFiID0gZDNfaW50ZXJwb2xhdGVMYWI7XG4gIGZ1bmN0aW9uIGQzX2ludGVycG9sYXRlTGFiKGEsIGIpIHtcbiAgICBhID0gZDMubGFiKGEpO1xuICAgIGIgPSBkMy5sYWIoYik7XG4gICAgdmFyIGFsID0gYS5sLCBhYSA9IGEuYSwgYWIgPSBhLmIsIGJsID0gYi5sIC0gYWwsIGJhID0gYi5hIC0gYWEsIGJiID0gYi5iIC0gYWI7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiBkM19sYWJfcmdiKGFsICsgYmwgKiB0LCBhYSArIGJhICogdCwgYWIgKyBiYiAqIHQpICsgXCJcIjtcbiAgICB9O1xuICB9XG4gIGQzLmludGVycG9sYXRlUm91bmQgPSBkM19pbnRlcnBvbGF0ZVJvdW5kO1xuICBmdW5jdGlvbiBkM19pbnRlcnBvbGF0ZVJvdW5kKGEsIGIpIHtcbiAgICBiIC09IGE7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKGEgKyBiICogdCk7XG4gICAgfTtcbiAgfVxuICBkMy50cmFuc2Zvcm0gPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICB2YXIgZyA9IGQzX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhkMy5ucy5wcmVmaXguc3ZnLCBcImdcIik7XG4gICAgcmV0dXJuIChkMy50cmFuc2Zvcm0gPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICAgIGlmIChzdHJpbmcgIT0gbnVsbCkge1xuICAgICAgICBnLnNldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiLCBzdHJpbmcpO1xuICAgICAgICB2YXIgdCA9IGcudHJhbnNmb3JtLmJhc2VWYWwuY29uc29saWRhdGUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgZDNfdHJhbnNmb3JtKHQgPyB0Lm1hdHJpeCA6IGQzX3RyYW5zZm9ybUlkZW50aXR5KTtcbiAgICB9KShzdHJpbmcpO1xuICB9O1xuICBmdW5jdGlvbiBkM190cmFuc2Zvcm0obSkge1xuICAgIHZhciByMCA9IFsgbS5hLCBtLmIgXSwgcjEgPSBbIG0uYywgbS5kIF0sIGt4ID0gZDNfdHJhbnNmb3JtTm9ybWFsaXplKHIwKSwga3ogPSBkM190cmFuc2Zvcm1Eb3QocjAsIHIxKSwga3kgPSBkM190cmFuc2Zvcm1Ob3JtYWxpemUoZDNfdHJhbnNmb3JtQ29tYmluZShyMSwgcjAsIC1reikpIHx8IDA7XG4gICAgaWYgKHIwWzBdICogcjFbMV0gPCByMVswXSAqIHIwWzFdKSB7XG4gICAgICByMFswXSAqPSAtMTtcbiAgICAgIHIwWzFdICo9IC0xO1xuICAgICAga3ggKj0gLTE7XG4gICAgICBreiAqPSAtMTtcbiAgICB9XG4gICAgdGhpcy5yb3RhdGUgPSAoa3ggPyBNYXRoLmF0YW4yKHIwWzFdLCByMFswXSkgOiBNYXRoLmF0YW4yKC1yMVswXSwgcjFbMV0pKSAqIGQzX2RlZ3JlZXM7XG4gICAgdGhpcy50cmFuc2xhdGUgPSBbIG0uZSwgbS5mIF07XG4gICAgdGhpcy5zY2FsZSA9IFsga3gsIGt5IF07XG4gICAgdGhpcy5za2V3ID0ga3kgPyBNYXRoLmF0YW4yKGt6LCBreSkgKiBkM19kZWdyZWVzIDogMDtcbiAgfVxuICBkM190cmFuc2Zvcm0ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgdGhpcy50cmFuc2xhdGUgKyBcIilyb3RhdGUoXCIgKyB0aGlzLnJvdGF0ZSArIFwiKXNrZXdYKFwiICsgdGhpcy5za2V3ICsgXCIpc2NhbGUoXCIgKyB0aGlzLnNjYWxlICsgXCIpXCI7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3RyYW5zZm9ybURvdChhLCBiKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV07XG4gIH1cbiAgZnVuY3Rpb24gZDNfdHJhbnNmb3JtTm9ybWFsaXplKGEpIHtcbiAgICB2YXIgayA9IE1hdGguc3FydChkM190cmFuc2Zvcm1Eb3QoYSwgYSkpO1xuICAgIGlmIChrKSB7XG4gICAgICBhWzBdIC89IGs7XG4gICAgICBhWzFdIC89IGs7XG4gICAgfVxuICAgIHJldHVybiBrO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3RyYW5zZm9ybUNvbWJpbmUoYSwgYiwgaykge1xuICAgIGFbMF0gKz0gayAqIGJbMF07XG4gICAgYVsxXSArPSBrICogYlsxXTtcbiAgICByZXR1cm4gYTtcbiAgfVxuICB2YXIgZDNfdHJhbnNmb3JtSWRlbnRpdHkgPSB7XG4gICAgYTogMSxcbiAgICBiOiAwLFxuICAgIGM6IDAsXG4gICAgZDogMSxcbiAgICBlOiAwLFxuICAgIGY6IDBcbiAgfTtcbiAgZDMuaW50ZXJwb2xhdGVUcmFuc2Zvcm0gPSBkM19pbnRlcnBvbGF0ZVRyYW5zZm9ybTtcbiAgZnVuY3Rpb24gZDNfaW50ZXJwb2xhdGVUcmFuc2Zvcm0oYSwgYikge1xuICAgIHZhciBzID0gW10sIHEgPSBbXSwgbiwgQSA9IGQzLnRyYW5zZm9ybShhKSwgQiA9IGQzLnRyYW5zZm9ybShiKSwgdGEgPSBBLnRyYW5zbGF0ZSwgdGIgPSBCLnRyYW5zbGF0ZSwgcmEgPSBBLnJvdGF0ZSwgcmIgPSBCLnJvdGF0ZSwgd2EgPSBBLnNrZXcsIHdiID0gQi5za2V3LCBrYSA9IEEuc2NhbGUsIGtiID0gQi5zY2FsZTtcbiAgICBpZiAodGFbMF0gIT0gdGJbMF0gfHwgdGFbMV0gIT0gdGJbMV0pIHtcbiAgICAgIHMucHVzaChcInRyYW5zbGF0ZShcIiwgbnVsbCwgXCIsXCIsIG51bGwsIFwiKVwiKTtcbiAgICAgIHEucHVzaCh7XG4gICAgICAgIGk6IDEsXG4gICAgICAgIHg6IGQzX2ludGVycG9sYXRlTnVtYmVyKHRhWzBdLCB0YlswXSlcbiAgICAgIH0sIHtcbiAgICAgICAgaTogMyxcbiAgICAgICAgeDogZDNfaW50ZXJwb2xhdGVOdW1iZXIodGFbMV0sIHRiWzFdKVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0YlswXSB8fCB0YlsxXSkge1xuICAgICAgcy5wdXNoKFwidHJhbnNsYXRlKFwiICsgdGIgKyBcIilcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHMucHVzaChcIlwiKTtcbiAgICB9XG4gICAgaWYgKHJhICE9IHJiKSB7XG4gICAgICBpZiAocmEgLSByYiA+IDE4MCkgcmIgKz0gMzYwOyBlbHNlIGlmIChyYiAtIHJhID4gMTgwKSByYSArPSAzNjA7XG4gICAgICBxLnB1c2goe1xuICAgICAgICBpOiBzLnB1c2gocy5wb3AoKSArIFwicm90YXRlKFwiLCBudWxsLCBcIilcIikgLSAyLFxuICAgICAgICB4OiBkM19pbnRlcnBvbGF0ZU51bWJlcihyYSwgcmIpXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHJiKSB7XG4gICAgICBzLnB1c2gocy5wb3AoKSArIFwicm90YXRlKFwiICsgcmIgKyBcIilcIik7XG4gICAgfVxuICAgIGlmICh3YSAhPSB3Yikge1xuICAgICAgcS5wdXNoKHtcbiAgICAgICAgaTogcy5wdXNoKHMucG9wKCkgKyBcInNrZXdYKFwiLCBudWxsLCBcIilcIikgLSAyLFxuICAgICAgICB4OiBkM19pbnRlcnBvbGF0ZU51bWJlcih3YSwgd2IpXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHdiKSB7XG4gICAgICBzLnB1c2gocy5wb3AoKSArIFwic2tld1goXCIgKyB3YiArIFwiKVwiKTtcbiAgICB9XG4gICAgaWYgKGthWzBdICE9IGtiWzBdIHx8IGthWzFdICE9IGtiWzFdKSB7XG4gICAgICBuID0gcy5wdXNoKHMucG9wKCkgKyBcInNjYWxlKFwiLCBudWxsLCBcIixcIiwgbnVsbCwgXCIpXCIpO1xuICAgICAgcS5wdXNoKHtcbiAgICAgICAgaTogbiAtIDQsXG4gICAgICAgIHg6IGQzX2ludGVycG9sYXRlTnVtYmVyKGthWzBdLCBrYlswXSlcbiAgICAgIH0sIHtcbiAgICAgICAgaTogbiAtIDIsXG4gICAgICAgIHg6IGQzX2ludGVycG9sYXRlTnVtYmVyKGthWzFdLCBrYlsxXSlcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoa2JbMF0gIT0gMSB8fCBrYlsxXSAhPSAxKSB7XG4gICAgICBzLnB1c2gocy5wb3AoKSArIFwic2NhbGUoXCIgKyBrYiArIFwiKVwiKTtcbiAgICB9XG4gICAgbiA9IHEubGVuZ3RoO1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICB2YXIgaSA9IC0xLCBvO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIHNbKG8gPSBxW2ldKS5pXSA9IG8ueCh0KTtcbiAgICAgIHJldHVybiBzLmpvaW4oXCJcIik7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkM191bmludGVycG9sYXRlTnVtYmVyKGEsIGIpIHtcbiAgICBiID0gYiAtIChhID0gK2EpID8gMSAvIChiIC0gYSkgOiAwO1xuICAgIHJldHVybiBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gKHggLSBhKSAqIGI7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkM191bmludGVycG9sYXRlQ2xhbXAoYSwgYikge1xuICAgIGIgPSBiIC0gKGEgPSArYSkgPyAxIC8gKGIgLSBhKSA6IDA7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCAoeCAtIGEpICogYikpO1xuICAgIH07XG4gIH1cbiAgZDMubGF5b3V0ID0ge307XG4gIGQzLmxheW91dC5idW5kbGUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24obGlua3MpIHtcbiAgICAgIHZhciBwYXRocyA9IFtdLCBpID0gLTEsIG4gPSBsaW5rcy5sZW5ndGg7XG4gICAgICB3aGlsZSAoKytpIDwgbikgcGF0aHMucHVzaChkM19sYXlvdXRfYnVuZGxlUGF0aChsaW5rc1tpXSkpO1xuICAgICAgcmV0dXJuIHBhdGhzO1xuICAgIH07XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9idW5kbGVQYXRoKGxpbmspIHtcbiAgICB2YXIgc3RhcnQgPSBsaW5rLnNvdXJjZSwgZW5kID0gbGluay50YXJnZXQsIGxjYSA9IGQzX2xheW91dF9idW5kbGVMZWFzdENvbW1vbkFuY2VzdG9yKHN0YXJ0LCBlbmQpLCBwb2ludHMgPSBbIHN0YXJ0IF07XG4gICAgd2hpbGUgKHN0YXJ0ICE9PSBsY2EpIHtcbiAgICAgIHN0YXJ0ID0gc3RhcnQucGFyZW50O1xuICAgICAgcG9pbnRzLnB1c2goc3RhcnQpO1xuICAgIH1cbiAgICB2YXIgayA9IHBvaW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKGVuZCAhPT0gbGNhKSB7XG4gICAgICBwb2ludHMuc3BsaWNlKGssIDAsIGVuZCk7XG4gICAgICBlbmQgPSBlbmQucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gcG9pbnRzO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9idW5kbGVBbmNlc3RvcnMobm9kZSkge1xuICAgIHZhciBhbmNlc3RvcnMgPSBbXSwgcGFyZW50ID0gbm9kZS5wYXJlbnQ7XG4gICAgd2hpbGUgKHBhcmVudCAhPSBudWxsKSB7XG4gICAgICBhbmNlc3RvcnMucHVzaChub2RlKTtcbiAgICAgIG5vZGUgPSBwYXJlbnQ7XG4gICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgIH1cbiAgICBhbmNlc3RvcnMucHVzaChub2RlKTtcbiAgICByZXR1cm4gYW5jZXN0b3JzO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9idW5kbGVMZWFzdENvbW1vbkFuY2VzdG9yKGEsIGIpIHtcbiAgICBpZiAoYSA9PT0gYikgcmV0dXJuIGE7XG4gICAgdmFyIGFOb2RlcyA9IGQzX2xheW91dF9idW5kbGVBbmNlc3RvcnMoYSksIGJOb2RlcyA9IGQzX2xheW91dF9idW5kbGVBbmNlc3RvcnMoYiksIGFOb2RlID0gYU5vZGVzLnBvcCgpLCBiTm9kZSA9IGJOb2Rlcy5wb3AoKSwgc2hhcmVkTm9kZSA9IG51bGw7XG4gICAgd2hpbGUgKGFOb2RlID09PSBiTm9kZSkge1xuICAgICAgc2hhcmVkTm9kZSA9IGFOb2RlO1xuICAgICAgYU5vZGUgPSBhTm9kZXMucG9wKCk7XG4gICAgICBiTm9kZSA9IGJOb2Rlcy5wb3AoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNoYXJlZE5vZGU7XG4gIH1cbiAgZDMubGF5b3V0LmNob3JkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNob3JkID0ge30sIGNob3JkcywgZ3JvdXBzLCBtYXRyaXgsIG4sIHBhZGRpbmcgPSAwLCBzb3J0R3JvdXBzLCBzb3J0U3ViZ3JvdXBzLCBzb3J0Q2hvcmRzO1xuICAgIGZ1bmN0aW9uIHJlbGF5b3V0KCkge1xuICAgICAgdmFyIHN1Ymdyb3VwcyA9IHt9LCBncm91cFN1bXMgPSBbXSwgZ3JvdXBJbmRleCA9IGQzLnJhbmdlKG4pLCBzdWJncm91cEluZGV4ID0gW10sIGssIHgsIHgwLCBpLCBqO1xuICAgICAgY2hvcmRzID0gW107XG4gICAgICBncm91cHMgPSBbXTtcbiAgICAgIGsgPSAwLCBpID0gLTE7XG4gICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICB4ID0gMCwgaiA9IC0xO1xuICAgICAgICB3aGlsZSAoKytqIDwgbikge1xuICAgICAgICAgIHggKz0gbWF0cml4W2ldW2pdO1xuICAgICAgICB9XG4gICAgICAgIGdyb3VwU3Vtcy5wdXNoKHgpO1xuICAgICAgICBzdWJncm91cEluZGV4LnB1c2goZDMucmFuZ2UobikpO1xuICAgICAgICBrICs9IHg7XG4gICAgICB9XG4gICAgICBpZiAoc29ydEdyb3Vwcykge1xuICAgICAgICBncm91cEluZGV4LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgIHJldHVybiBzb3J0R3JvdXBzKGdyb3VwU3Vtc1thXSwgZ3JvdXBTdW1zW2JdKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoc29ydFN1Ymdyb3Vwcykge1xuICAgICAgICBzdWJncm91cEluZGV4LmZvckVhY2goZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgIGQuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gc29ydFN1Ymdyb3VwcyhtYXRyaXhbaV1bYV0sIG1hdHJpeFtpXVtiXSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgayA9ICgyICogz4AgLSBwYWRkaW5nICogbikgLyBrO1xuICAgICAgeCA9IDAsIGkgPSAtMTtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgIHgwID0geCwgaiA9IC0xO1xuICAgICAgICB3aGlsZSAoKytqIDwgbikge1xuICAgICAgICAgIHZhciBkaSA9IGdyb3VwSW5kZXhbaV0sIGRqID0gc3ViZ3JvdXBJbmRleFtkaV1bal0sIHYgPSBtYXRyaXhbZGldW2RqXSwgYTAgPSB4LCBhMSA9IHggKz0gdiAqIGs7XG4gICAgICAgICAgc3ViZ3JvdXBzW2RpICsgXCItXCIgKyBkal0gPSB7XG4gICAgICAgICAgICBpbmRleDogZGksXG4gICAgICAgICAgICBzdWJpbmRleDogZGosXG4gICAgICAgICAgICBzdGFydEFuZ2xlOiBhMCxcbiAgICAgICAgICAgIGVuZEFuZ2xlOiBhMSxcbiAgICAgICAgICAgIHZhbHVlOiB2XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBncm91cHNbZGldID0ge1xuICAgICAgICAgIGluZGV4OiBkaSxcbiAgICAgICAgICBzdGFydEFuZ2xlOiB4MCxcbiAgICAgICAgICBlbmRBbmdsZTogeCxcbiAgICAgICAgICB2YWx1ZTogKHggLSB4MCkgLyBrXG4gICAgICAgIH07XG4gICAgICAgIHggKz0gcGFkZGluZztcbiAgICAgIH1cbiAgICAgIGkgPSAtMTtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgIGogPSBpIC0gMTtcbiAgICAgICAgd2hpbGUgKCsraiA8IG4pIHtcbiAgICAgICAgICB2YXIgc291cmNlID0gc3ViZ3JvdXBzW2kgKyBcIi1cIiArIGpdLCB0YXJnZXQgPSBzdWJncm91cHNbaiArIFwiLVwiICsgaV07XG4gICAgICAgICAgaWYgKHNvdXJjZS52YWx1ZSB8fCB0YXJnZXQudmFsdWUpIHtcbiAgICAgICAgICAgIGNob3Jkcy5wdXNoKHNvdXJjZS52YWx1ZSA8IHRhcmdldC52YWx1ZSA/IHtcbiAgICAgICAgICAgICAgc291cmNlOiB0YXJnZXQsXG4gICAgICAgICAgICAgIHRhcmdldDogc291cmNlXG4gICAgICAgICAgICB9IDoge1xuICAgICAgICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNvcnRDaG9yZHMpIHJlc29ydCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXNvcnQoKSB7XG4gICAgICBjaG9yZHMuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHJldHVybiBzb3J0Q2hvcmRzKChhLnNvdXJjZS52YWx1ZSArIGEudGFyZ2V0LnZhbHVlKSAvIDIsIChiLnNvdXJjZS52YWx1ZSArIGIudGFyZ2V0LnZhbHVlKSAvIDIpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGNob3JkLm1hdHJpeCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG1hdHJpeDtcbiAgICAgIG4gPSAobWF0cml4ID0geCkgJiYgbWF0cml4Lmxlbmd0aDtcbiAgICAgIGNob3JkcyA9IGdyb3VwcyA9IG51bGw7XG4gICAgICByZXR1cm4gY2hvcmQ7XG4gICAgfTtcbiAgICBjaG9yZC5wYWRkaW5nID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gcGFkZGluZztcbiAgICAgIHBhZGRpbmcgPSB4O1xuICAgICAgY2hvcmRzID0gZ3JvdXBzID0gbnVsbDtcbiAgICAgIHJldHVybiBjaG9yZDtcbiAgICB9O1xuICAgIGNob3JkLnNvcnRHcm91cHMgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzb3J0R3JvdXBzO1xuICAgICAgc29ydEdyb3VwcyA9IHg7XG4gICAgICBjaG9yZHMgPSBncm91cHMgPSBudWxsO1xuICAgICAgcmV0dXJuIGNob3JkO1xuICAgIH07XG4gICAgY2hvcmQuc29ydFN1Ymdyb3VwcyA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHNvcnRTdWJncm91cHM7XG4gICAgICBzb3J0U3ViZ3JvdXBzID0geDtcbiAgICAgIGNob3JkcyA9IG51bGw7XG4gICAgICByZXR1cm4gY2hvcmQ7XG4gICAgfTtcbiAgICBjaG9yZC5zb3J0Q2hvcmRzID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc29ydENob3JkcztcbiAgICAgIHNvcnRDaG9yZHMgPSB4O1xuICAgICAgaWYgKGNob3JkcykgcmVzb3J0KCk7XG4gICAgICByZXR1cm4gY2hvcmQ7XG4gICAgfTtcbiAgICBjaG9yZC5jaG9yZHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghY2hvcmRzKSByZWxheW91dCgpO1xuICAgICAgcmV0dXJuIGNob3JkcztcbiAgICB9O1xuICAgIGNob3JkLmdyb3VwcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCFncm91cHMpIHJlbGF5b3V0KCk7XG4gICAgICByZXR1cm4gZ3JvdXBzO1xuICAgIH07XG4gICAgcmV0dXJuIGNob3JkO1xuICB9O1xuICBkMy5sYXlvdXQuZm9yY2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZm9yY2UgPSB7fSwgZXZlbnQgPSBkMy5kaXNwYXRjaChcInN0YXJ0XCIsIFwidGlja1wiLCBcImVuZFwiKSwgc2l6ZSA9IFsgMSwgMSBdLCBkcmFnLCBhbHBoYSwgZnJpY3Rpb24gPSAuOSwgbGlua0Rpc3RhbmNlID0gZDNfbGF5b3V0X2ZvcmNlTGlua0Rpc3RhbmNlLCBsaW5rU3RyZW5ndGggPSBkM19sYXlvdXRfZm9yY2VMaW5rU3RyZW5ndGgsIGNoYXJnZSA9IC0zMCwgZ3Jhdml0eSA9IC4xLCB0aGV0YSA9IC44LCBub2RlcyA9IFtdLCBsaW5rcyA9IFtdLCBkaXN0YW5jZXMsIHN0cmVuZ3RocywgY2hhcmdlcztcbiAgICBmdW5jdGlvbiByZXB1bHNlKG5vZGUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihxdWFkLCB4MSwgXywgeDIpIHtcbiAgICAgICAgaWYgKHF1YWQucG9pbnQgIT09IG5vZGUpIHtcbiAgICAgICAgICB2YXIgZHggPSBxdWFkLmN4IC0gbm9kZS54LCBkeSA9IHF1YWQuY3kgLSBub2RlLnksIGRuID0gMSAvIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgaWYgKCh4MiAtIHgxKSAqIGRuIDwgdGhldGEpIHtcbiAgICAgICAgICAgIHZhciBrID0gcXVhZC5jaGFyZ2UgKiBkbiAqIGRuO1xuICAgICAgICAgICAgbm9kZS5weCAtPSBkeCAqIGs7XG4gICAgICAgICAgICBub2RlLnB5IC09IGR5ICogaztcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocXVhZC5wb2ludCAmJiBpc0Zpbml0ZShkbikpIHtcbiAgICAgICAgICAgIHZhciBrID0gcXVhZC5wb2ludENoYXJnZSAqIGRuICogZG47XG4gICAgICAgICAgICBub2RlLnB4IC09IGR4ICogaztcbiAgICAgICAgICAgIG5vZGUucHkgLT0gZHkgKiBrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gIXF1YWQuY2hhcmdlO1xuICAgICAgfTtcbiAgICB9XG4gICAgZm9yY2UudGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKChhbHBoYSAqPSAuOTkpIDwgLjAwNSkge1xuICAgICAgICBldmVudC5lbmQoe1xuICAgICAgICAgIHR5cGU6IFwiZW5kXCIsXG4gICAgICAgICAgYWxwaGE6IGFscGhhID0gMFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICB2YXIgbiA9IG5vZGVzLmxlbmd0aCwgbSA9IGxpbmtzLmxlbmd0aCwgcSwgaSwgbywgcywgdCwgbCwgaywgeCwgeTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBtOyArK2kpIHtcbiAgICAgICAgbyA9IGxpbmtzW2ldO1xuICAgICAgICBzID0gby5zb3VyY2U7XG4gICAgICAgIHQgPSBvLnRhcmdldDtcbiAgICAgICAgeCA9IHQueCAtIHMueDtcbiAgICAgICAgeSA9IHQueSAtIHMueTtcbiAgICAgICAgaWYgKGwgPSB4ICogeCArIHkgKiB5KSB7XG4gICAgICAgICAgbCA9IGFscGhhICogc3RyZW5ndGhzW2ldICogKChsID0gTWF0aC5zcXJ0KGwpKSAtIGRpc3RhbmNlc1tpXSkgLyBsO1xuICAgICAgICAgIHggKj0gbDtcbiAgICAgICAgICB5ICo9IGw7XG4gICAgICAgICAgdC54IC09IHggKiAoayA9IHMud2VpZ2h0IC8gKHQud2VpZ2h0ICsgcy53ZWlnaHQpKTtcbiAgICAgICAgICB0LnkgLT0geSAqIGs7XG4gICAgICAgICAgcy54ICs9IHggKiAoayA9IDEgLSBrKTtcbiAgICAgICAgICBzLnkgKz0geSAqIGs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChrID0gYWxwaGEgKiBncmF2aXR5KSB7XG4gICAgICAgIHggPSBzaXplWzBdIC8gMjtcbiAgICAgICAgeSA9IHNpemVbMV0gLyAyO1xuICAgICAgICBpID0gLTE7XG4gICAgICAgIGlmIChrKSB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICAgIG8gPSBub2Rlc1tpXTtcbiAgICAgICAgICBvLnggKz0gKHggLSBvLngpICogaztcbiAgICAgICAgICBvLnkgKz0gKHkgLSBvLnkpICogaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNoYXJnZSkge1xuICAgICAgICBkM19sYXlvdXRfZm9yY2VBY2N1bXVsYXRlKHEgPSBkMy5nZW9tLnF1YWR0cmVlKG5vZGVzKSwgYWxwaGEsIGNoYXJnZXMpO1xuICAgICAgICBpID0gLTE7XG4gICAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgICAgaWYgKCEobyA9IG5vZGVzW2ldKS5maXhlZCkge1xuICAgICAgICAgICAgcS52aXNpdChyZXB1bHNlKG8pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGkgPSAtMTtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgIG8gPSBub2Rlc1tpXTtcbiAgICAgICAgaWYgKG8uZml4ZWQpIHtcbiAgICAgICAgICBvLnggPSBvLnB4O1xuICAgICAgICAgIG8ueSA9IG8ucHk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgby54IC09IChvLnB4IC0gKG8ucHggPSBvLngpKSAqIGZyaWN0aW9uO1xuICAgICAgICAgIG8ueSAtPSAoby5weSAtIChvLnB5ID0gby55KSkgKiBmcmljdGlvbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZXZlbnQudGljayh7XG4gICAgICAgIHR5cGU6IFwidGlja1wiLFxuICAgICAgICBhbHBoYTogYWxwaGFcbiAgICAgIH0pO1xuICAgIH07XG4gICAgZm9yY2Uubm9kZXMgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBub2RlcztcbiAgICAgIG5vZGVzID0geDtcbiAgICAgIHJldHVybiBmb3JjZTtcbiAgICB9O1xuICAgIGZvcmNlLmxpbmtzID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbGlua3M7XG4gICAgICBsaW5rcyA9IHg7XG4gICAgICByZXR1cm4gZm9yY2U7XG4gICAgfTtcbiAgICBmb3JjZS5zaXplID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2l6ZTtcbiAgICAgIHNpemUgPSB4O1xuICAgICAgcmV0dXJuIGZvcmNlO1xuICAgIH07XG4gICAgZm9yY2UubGlua0Rpc3RhbmNlID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbGlua0Rpc3RhbmNlO1xuICAgICAgbGlua0Rpc3RhbmNlID0gdHlwZW9mIHggPT09IFwiZnVuY3Rpb25cIiA/IHggOiAreDtcbiAgICAgIHJldHVybiBmb3JjZTtcbiAgICB9O1xuICAgIGZvcmNlLmRpc3RhbmNlID0gZm9yY2UubGlua0Rpc3RhbmNlO1xuICAgIGZvcmNlLmxpbmtTdHJlbmd0aCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGxpbmtTdHJlbmd0aDtcbiAgICAgIGxpbmtTdHJlbmd0aCA9IHR5cGVvZiB4ID09PSBcImZ1bmN0aW9uXCIgPyB4IDogK3g7XG4gICAgICByZXR1cm4gZm9yY2U7XG4gICAgfTtcbiAgICBmb3JjZS5mcmljdGlvbiA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGZyaWN0aW9uO1xuICAgICAgZnJpY3Rpb24gPSAreDtcbiAgICAgIHJldHVybiBmb3JjZTtcbiAgICB9O1xuICAgIGZvcmNlLmNoYXJnZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNoYXJnZTtcbiAgICAgIGNoYXJnZSA9IHR5cGVvZiB4ID09PSBcImZ1bmN0aW9uXCIgPyB4IDogK3g7XG4gICAgICByZXR1cm4gZm9yY2U7XG4gICAgfTtcbiAgICBmb3JjZS5ncmF2aXR5ID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZ3Jhdml0eTtcbiAgICAgIGdyYXZpdHkgPSAreDtcbiAgICAgIHJldHVybiBmb3JjZTtcbiAgICB9O1xuICAgIGZvcmNlLnRoZXRhID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhldGE7XG4gICAgICB0aGV0YSA9ICt4O1xuICAgICAgcmV0dXJuIGZvcmNlO1xuICAgIH07XG4gICAgZm9yY2UuYWxwaGEgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBhbHBoYTtcbiAgICAgIHggPSAreDtcbiAgICAgIGlmIChhbHBoYSkge1xuICAgICAgICBpZiAoeCA+IDApIGFscGhhID0geDsgZWxzZSBhbHBoYSA9IDA7XG4gICAgICB9IGVsc2UgaWYgKHggPiAwKSB7XG4gICAgICAgIGV2ZW50LnN0YXJ0KHtcbiAgICAgICAgICB0eXBlOiBcInN0YXJ0XCIsXG4gICAgICAgICAgYWxwaGE6IGFscGhhID0geFxuICAgICAgICB9KTtcbiAgICAgICAgZDMudGltZXIoZm9yY2UudGljayk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZm9yY2U7XG4gICAgfTtcbiAgICBmb3JjZS5zdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGosIG4gPSBub2Rlcy5sZW5ndGgsIG0gPSBsaW5rcy5sZW5ndGgsIHcgPSBzaXplWzBdLCBoID0gc2l6ZVsxXSwgbmVpZ2hib3JzLCBvO1xuICAgICAgZm9yIChpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgICAobyA9IG5vZGVzW2ldKS5pbmRleCA9IGk7XG4gICAgICAgIG8ud2VpZ2h0ID0gMDtcbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBtOyArK2kpIHtcbiAgICAgICAgbyA9IGxpbmtzW2ldO1xuICAgICAgICBpZiAodHlwZW9mIG8uc291cmNlID09IFwibnVtYmVyXCIpIG8uc291cmNlID0gbm9kZXNbby5zb3VyY2VdO1xuICAgICAgICBpZiAodHlwZW9mIG8udGFyZ2V0ID09IFwibnVtYmVyXCIpIG8udGFyZ2V0ID0gbm9kZXNbby50YXJnZXRdO1xuICAgICAgICArK28uc291cmNlLndlaWdodDtcbiAgICAgICAgKytvLnRhcmdldC53ZWlnaHQ7XG4gICAgICB9XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIG8gPSBub2Rlc1tpXTtcbiAgICAgICAgaWYgKGlzTmFOKG8ueCkpIG8ueCA9IHBvc2l0aW9uKFwieFwiLCB3KTtcbiAgICAgICAgaWYgKGlzTmFOKG8ueSkpIG8ueSA9IHBvc2l0aW9uKFwieVwiLCBoKTtcbiAgICAgICAgaWYgKGlzTmFOKG8ucHgpKSBvLnB4ID0gby54O1xuICAgICAgICBpZiAoaXNOYU4oby5weSkpIG8ucHkgPSBvLnk7XG4gICAgICB9XG4gICAgICBkaXN0YW5jZXMgPSBbXTtcbiAgICAgIGlmICh0eXBlb2YgbGlua0Rpc3RhbmNlID09PSBcImZ1bmN0aW9uXCIpIGZvciAoaSA9IDA7IGkgPCBtOyArK2kpIGRpc3RhbmNlc1tpXSA9ICtsaW5rRGlzdGFuY2UuY2FsbCh0aGlzLCBsaW5rc1tpXSwgaSk7IGVsc2UgZm9yIChpID0gMDsgaSA8IG07ICsraSkgZGlzdGFuY2VzW2ldID0gbGlua0Rpc3RhbmNlO1xuICAgICAgc3RyZW5ndGhzID0gW107XG4gICAgICBpZiAodHlwZW9mIGxpbmtTdHJlbmd0aCA9PT0gXCJmdW5jdGlvblwiKSBmb3IgKGkgPSAwOyBpIDwgbTsgKytpKSBzdHJlbmd0aHNbaV0gPSArbGlua1N0cmVuZ3RoLmNhbGwodGhpcywgbGlua3NbaV0sIGkpOyBlbHNlIGZvciAoaSA9IDA7IGkgPCBtOyArK2kpIHN0cmVuZ3Roc1tpXSA9IGxpbmtTdHJlbmd0aDtcbiAgICAgIGNoYXJnZXMgPSBbXTtcbiAgICAgIGlmICh0eXBlb2YgY2hhcmdlID09PSBcImZ1bmN0aW9uXCIpIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIGNoYXJnZXNbaV0gPSArY2hhcmdlLmNhbGwodGhpcywgbm9kZXNbaV0sIGkpOyBlbHNlIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIGNoYXJnZXNbaV0gPSBjaGFyZ2U7XG4gICAgICBmdW5jdGlvbiBwb3NpdGlvbihkaW1lbnNpb24sIHNpemUpIHtcbiAgICAgICAgdmFyIG5laWdoYm9ycyA9IG5laWdoYm9yKGkpLCBqID0gLTEsIG0gPSBuZWlnaGJvcnMubGVuZ3RoLCB4O1xuICAgICAgICB3aGlsZSAoKytqIDwgbSkgaWYgKCFpc05hTih4ID0gbmVpZ2hib3JzW2pdW2RpbWVuc2lvbl0pKSByZXR1cm4geDtcbiAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiBzaXplO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gbmVpZ2hib3IoKSB7XG4gICAgICAgIGlmICghbmVpZ2hib3JzKSB7XG4gICAgICAgICAgbmVpZ2hib3JzID0gW107XG4gICAgICAgICAgZm9yIChqID0gMDsgaiA8IG47ICsraikge1xuICAgICAgICAgICAgbmVpZ2hib3JzW2pdID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICAgICAgICAgIHZhciBvID0gbGlua3Nbal07XG4gICAgICAgICAgICBuZWlnaGJvcnNbby5zb3VyY2UuaW5kZXhdLnB1c2goby50YXJnZXQpO1xuICAgICAgICAgICAgbmVpZ2hib3JzW28udGFyZ2V0LmluZGV4XS5wdXNoKG8uc291cmNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5laWdoYm9yc1tpXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmb3JjZS5yZXN1bWUoKTtcbiAgICB9O1xuICAgIGZvcmNlLnJlc3VtZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZvcmNlLmFscGhhKC4xKTtcbiAgICB9O1xuICAgIGZvcmNlLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmb3JjZS5hbHBoYSgwKTtcbiAgICB9O1xuICAgIGZvcmNlLmRyYWcgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghZHJhZykgZHJhZyA9IGQzLmJlaGF2aW9yLmRyYWcoKS5vcmlnaW4oZDNfaWRlbnRpdHkpLm9uKFwiZHJhZ3N0YXJ0LmZvcmNlXCIsIGQzX2xheW91dF9mb3JjZURyYWdzdGFydCkub24oXCJkcmFnLmZvcmNlXCIsIGRyYWdtb3ZlKS5vbihcImRyYWdlbmQuZm9yY2VcIiwgZDNfbGF5b3V0X2ZvcmNlRHJhZ2VuZCk7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkcmFnO1xuICAgICAgdGhpcy5vbihcIm1vdXNlb3Zlci5mb3JjZVwiLCBkM19sYXlvdXRfZm9yY2VNb3VzZW92ZXIpLm9uKFwibW91c2VvdXQuZm9yY2VcIiwgZDNfbGF5b3V0X2ZvcmNlTW91c2VvdXQpLmNhbGwoZHJhZyk7XG4gICAgfTtcbiAgICBmdW5jdGlvbiBkcmFnbW92ZShkKSB7XG4gICAgICBkLnB4ID0gZDMuZXZlbnQueCwgZC5weSA9IGQzLmV2ZW50Lnk7XG4gICAgICBmb3JjZS5yZXN1bWUoKTtcbiAgICB9XG4gICAgcmV0dXJuIGQzLnJlYmluZChmb3JjZSwgZXZlbnQsIFwib25cIik7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9mb3JjZURyYWdzdGFydChkKSB7XG4gICAgZC5maXhlZCB8PSAyO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9mb3JjZURyYWdlbmQoZCkge1xuICAgIGQuZml4ZWQgJj0gfjY7XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X2ZvcmNlTW91c2VvdmVyKGQpIHtcbiAgICBkLmZpeGVkIHw9IDQ7XG4gICAgZC5weCA9IGQueCwgZC5weSA9IGQueTtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfZm9yY2VNb3VzZW91dChkKSB7XG4gICAgZC5maXhlZCAmPSB+NDtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfZm9yY2VBY2N1bXVsYXRlKHF1YWQsIGFscGhhLCBjaGFyZ2VzKSB7XG4gICAgdmFyIGN4ID0gMCwgY3kgPSAwO1xuICAgIHF1YWQuY2hhcmdlID0gMDtcbiAgICBpZiAoIXF1YWQubGVhZikge1xuICAgICAgdmFyIG5vZGVzID0gcXVhZC5ub2RlcywgbiA9IG5vZGVzLmxlbmd0aCwgaSA9IC0xLCBjO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgYyA9IG5vZGVzW2ldO1xuICAgICAgICBpZiAoYyA9PSBudWxsKSBjb250aW51ZTtcbiAgICAgICAgZDNfbGF5b3V0X2ZvcmNlQWNjdW11bGF0ZShjLCBhbHBoYSwgY2hhcmdlcyk7XG4gICAgICAgIHF1YWQuY2hhcmdlICs9IGMuY2hhcmdlO1xuICAgICAgICBjeCArPSBjLmNoYXJnZSAqIGMuY3g7XG4gICAgICAgIGN5ICs9IGMuY2hhcmdlICogYy5jeTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHF1YWQucG9pbnQpIHtcbiAgICAgIGlmICghcXVhZC5sZWFmKSB7XG4gICAgICAgIHF1YWQucG9pbnQueCArPSBNYXRoLnJhbmRvbSgpIC0gLjU7XG4gICAgICAgIHF1YWQucG9pbnQueSArPSBNYXRoLnJhbmRvbSgpIC0gLjU7XG4gICAgICB9XG4gICAgICB2YXIgayA9IGFscGhhICogY2hhcmdlc1txdWFkLnBvaW50LmluZGV4XTtcbiAgICAgIHF1YWQuY2hhcmdlICs9IHF1YWQucG9pbnRDaGFyZ2UgPSBrO1xuICAgICAgY3ggKz0gayAqIHF1YWQucG9pbnQueDtcbiAgICAgIGN5ICs9IGsgKiBxdWFkLnBvaW50Lnk7XG4gICAgfVxuICAgIHF1YWQuY3ggPSBjeCAvIHF1YWQuY2hhcmdlO1xuICAgIHF1YWQuY3kgPSBjeSAvIHF1YWQuY2hhcmdlO1xuICB9XG4gIHZhciBkM19sYXlvdXRfZm9yY2VMaW5rRGlzdGFuY2UgPSAyMCwgZDNfbGF5b3V0X2ZvcmNlTGlua1N0cmVuZ3RoID0gMTtcbiAgZDMubGF5b3V0LmhpZXJhcmNoeSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzb3J0ID0gZDNfbGF5b3V0X2hpZXJhcmNoeVNvcnQsIGNoaWxkcmVuID0gZDNfbGF5b3V0X2hpZXJhcmNoeUNoaWxkcmVuLCB2YWx1ZSA9IGQzX2xheW91dF9oaWVyYXJjaHlWYWx1ZTtcbiAgICBmdW5jdGlvbiByZWN1cnNlKG5vZGUsIGRlcHRoLCBub2Rlcykge1xuICAgICAgdmFyIGNoaWxkcyA9IGNoaWxkcmVuLmNhbGwoaGllcmFyY2h5LCBub2RlLCBkZXB0aCk7XG4gICAgICBub2RlLmRlcHRoID0gZGVwdGg7XG4gICAgICBub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgaWYgKGNoaWxkcyAmJiAobiA9IGNoaWxkcy5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG4sIGMgPSBub2RlLmNoaWxkcmVuID0gW10sIHYgPSAwLCBqID0gZGVwdGggKyAxLCBkO1xuICAgICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICAgIGQgPSByZWN1cnNlKGNoaWxkc1tpXSwgaiwgbm9kZXMpO1xuICAgICAgICAgIGQucGFyZW50ID0gbm9kZTtcbiAgICAgICAgICBjLnB1c2goZCk7XG4gICAgICAgICAgdiArPSBkLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzb3J0KSBjLnNvcnQoc29ydCk7XG4gICAgICAgIGlmICh2YWx1ZSkgbm9kZS52YWx1ZSA9IHY7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlKSB7XG4gICAgICAgIG5vZGUudmFsdWUgPSArdmFsdWUuY2FsbChoaWVyYXJjaHksIG5vZGUsIGRlcHRoKSB8fCAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJldmFsdWUobm9kZSwgZGVwdGgpIHtcbiAgICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW4sIHYgPSAwO1xuICAgICAgaWYgKGNoaWxkcmVuICYmIChuID0gY2hpbGRyZW4ubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuLCBqID0gZGVwdGggKyAxO1xuICAgICAgICB3aGlsZSAoKytpIDwgbikgdiArPSByZXZhbHVlKGNoaWxkcmVuW2ldLCBqKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgICAgdiA9ICt2YWx1ZS5jYWxsKGhpZXJhcmNoeSwgbm9kZSwgZGVwdGgpIHx8IDA7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUpIG5vZGUudmFsdWUgPSB2O1xuICAgICAgcmV0dXJuIHY7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhpZXJhcmNoeShkKSB7XG4gICAgICB2YXIgbm9kZXMgPSBbXTtcbiAgICAgIHJlY3Vyc2UoZCwgMCwgbm9kZXMpO1xuICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH1cbiAgICBoaWVyYXJjaHkuc29ydCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHNvcnQ7XG4gICAgICBzb3J0ID0geDtcbiAgICAgIHJldHVybiBoaWVyYXJjaHk7XG4gICAgfTtcbiAgICBoaWVyYXJjaHkuY2hpbGRyZW4gPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjaGlsZHJlbjtcbiAgICAgIGNoaWxkcmVuID0geDtcbiAgICAgIHJldHVybiBoaWVyYXJjaHk7XG4gICAgfTtcbiAgICBoaWVyYXJjaHkudmFsdWUgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB2YWx1ZTtcbiAgICAgIHZhbHVlID0geDtcbiAgICAgIHJldHVybiBoaWVyYXJjaHk7XG4gICAgfTtcbiAgICBoaWVyYXJjaHkucmV2YWx1ZSA9IGZ1bmN0aW9uKHJvb3QpIHtcbiAgICAgIHJldmFsdWUocm9vdCwgMCk7XG4gICAgICByZXR1cm4gcm9vdDtcbiAgICB9O1xuICAgIHJldHVybiBoaWVyYXJjaHk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9oaWVyYXJjaHlSZWJpbmQob2JqZWN0LCBoaWVyYXJjaHkpIHtcbiAgICBkMy5yZWJpbmQob2JqZWN0LCBoaWVyYXJjaHksIFwic29ydFwiLCBcImNoaWxkcmVuXCIsIFwidmFsdWVcIik7XG4gICAgb2JqZWN0Lm5vZGVzID0gb2JqZWN0O1xuICAgIG9iamVjdC5saW5rcyA9IGQzX2xheW91dF9oaWVyYXJjaHlMaW5rcztcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9oaWVyYXJjaHlDaGlsZHJlbihkKSB7XG4gICAgcmV0dXJuIGQuY2hpbGRyZW47XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X2hpZXJhcmNoeVZhbHVlKGQpIHtcbiAgICByZXR1cm4gZC52YWx1ZTtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfaGllcmFyY2h5U29ydChhLCBiKSB7XG4gICAgcmV0dXJuIGIudmFsdWUgLSBhLnZhbHVlO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9oaWVyYXJjaHlMaW5rcyhub2Rlcykge1xuICAgIHJldHVybiBkMy5tZXJnZShub2Rlcy5tYXAoZnVuY3Rpb24ocGFyZW50KSB7XG4gICAgICByZXR1cm4gKHBhcmVudC5jaGlsZHJlbiB8fCBbXSkubWFwKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc291cmNlOiBwYXJlbnQsXG4gICAgICAgICAgdGFyZ2V0OiBjaGlsZFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSkpO1xuICB9XG4gIGQzLmxheW91dC5wYXJ0aXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaGllcmFyY2h5ID0gZDMubGF5b3V0LmhpZXJhcmNoeSgpLCBzaXplID0gWyAxLCAxIF07XG4gICAgZnVuY3Rpb24gcG9zaXRpb24obm9kZSwgeCwgZHgsIGR5KSB7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xuICAgICAgbm9kZS54ID0geDtcbiAgICAgIG5vZGUueSA9IG5vZGUuZGVwdGggKiBkeTtcbiAgICAgIG5vZGUuZHggPSBkeDtcbiAgICAgIG5vZGUuZHkgPSBkeTtcbiAgICAgIGlmIChjaGlsZHJlbiAmJiAobiA9IGNoaWxkcmVuLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbiwgYywgZDtcbiAgICAgICAgZHggPSBub2RlLnZhbHVlID8gZHggLyBub2RlLnZhbHVlIDogMDtcbiAgICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgICBwb3NpdGlvbihjID0gY2hpbGRyZW5baV0sIHgsIGQgPSBjLnZhbHVlICogZHgsIGR5KTtcbiAgICAgICAgICB4ICs9IGQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZGVwdGgobm9kZSkge1xuICAgICAgdmFyIGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbiwgZCA9IDA7XG4gICAgICBpZiAoY2hpbGRyZW4gJiYgKG4gPSBjaGlsZHJlbi5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG47XG4gICAgICAgIHdoaWxlICgrK2kgPCBuKSBkID0gTWF0aC5tYXgoZCwgZGVwdGgoY2hpbGRyZW5baV0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAxICsgZDtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGFydGl0aW9uKGQsIGkpIHtcbiAgICAgIHZhciBub2RlcyA9IGhpZXJhcmNoeS5jYWxsKHRoaXMsIGQsIGkpO1xuICAgICAgcG9zaXRpb24obm9kZXNbMF0sIDAsIHNpemVbMF0sIHNpemVbMV0gLyBkZXB0aChub2Rlc1swXSkpO1xuICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH1cbiAgICBwYXJ0aXRpb24uc2l6ZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHNpemU7XG4gICAgICBzaXplID0geDtcbiAgICAgIHJldHVybiBwYXJ0aXRpb247XG4gICAgfTtcbiAgICByZXR1cm4gZDNfbGF5b3V0X2hpZXJhcmNoeVJlYmluZChwYXJ0aXRpb24sIGhpZXJhcmNoeSk7XG4gIH07XG4gIGQzLmxheW91dC5waWUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdmFsdWUgPSBOdW1iZXIsIHNvcnQgPSBkM19sYXlvdXRfcGllU29ydEJ5VmFsdWUsIHN0YXJ0QW5nbGUgPSAwLCBlbmRBbmdsZSA9IDIgKiDPgDtcbiAgICBmdW5jdGlvbiBwaWUoZGF0YSkge1xuICAgICAgdmFyIHZhbHVlcyA9IGRhdGEubWFwKGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgcmV0dXJuICt2YWx1ZS5jYWxsKHBpZSwgZCwgaSk7XG4gICAgICB9KTtcbiAgICAgIHZhciBhID0gKyh0eXBlb2Ygc3RhcnRBbmdsZSA9PT0gXCJmdW5jdGlvblwiID8gc3RhcnRBbmdsZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDogc3RhcnRBbmdsZSk7XG4gICAgICB2YXIgayA9ICgodHlwZW9mIGVuZEFuZ2xlID09PSBcImZ1bmN0aW9uXCIgPyBlbmRBbmdsZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDogZW5kQW5nbGUpIC0gYSkgLyBkMy5zdW0odmFsdWVzKTtcbiAgICAgIHZhciBpbmRleCA9IGQzLnJhbmdlKGRhdGEubGVuZ3RoKTtcbiAgICAgIGlmIChzb3J0ICE9IG51bGwpIGluZGV4LnNvcnQoc29ydCA9PT0gZDNfbGF5b3V0X3BpZVNvcnRCeVZhbHVlID8gZnVuY3Rpb24oaSwgaikge1xuICAgICAgICByZXR1cm4gdmFsdWVzW2pdIC0gdmFsdWVzW2ldO1xuICAgICAgfSA6IGZ1bmN0aW9uKGksIGopIHtcbiAgICAgICAgcmV0dXJuIHNvcnQoZGF0YVtpXSwgZGF0YVtqXSk7XG4gICAgICB9KTtcbiAgICAgIHZhciBhcmNzID0gW107XG4gICAgICBpbmRleC5mb3JFYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgdmFyIGQ7XG4gICAgICAgIGFyY3NbaV0gPSB7XG4gICAgICAgICAgZGF0YTogZGF0YVtpXSxcbiAgICAgICAgICB2YWx1ZTogZCA9IHZhbHVlc1tpXSxcbiAgICAgICAgICBzdGFydEFuZ2xlOiBhLFxuICAgICAgICAgIGVuZEFuZ2xlOiBhICs9IGQgKiBrXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBhcmNzO1xuICAgIH1cbiAgICBwaWUudmFsdWUgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB2YWx1ZTtcbiAgICAgIHZhbHVlID0geDtcbiAgICAgIHJldHVybiBwaWU7XG4gICAgfTtcbiAgICBwaWUuc29ydCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHNvcnQ7XG4gICAgICBzb3J0ID0geDtcbiAgICAgIHJldHVybiBwaWU7XG4gICAgfTtcbiAgICBwaWUuc3RhcnRBbmdsZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHN0YXJ0QW5nbGU7XG4gICAgICBzdGFydEFuZ2xlID0geDtcbiAgICAgIHJldHVybiBwaWU7XG4gICAgfTtcbiAgICBwaWUuZW5kQW5nbGUgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBlbmRBbmdsZTtcbiAgICAgIGVuZEFuZ2xlID0geDtcbiAgICAgIHJldHVybiBwaWU7XG4gICAgfTtcbiAgICByZXR1cm4gcGllO1xuICB9O1xuICB2YXIgZDNfbGF5b3V0X3BpZVNvcnRCeVZhbHVlID0ge307XG4gIGQzLmxheW91dC5zdGFjayA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB2YWx1ZXMgPSBkM19pZGVudGl0eSwgb3JkZXIgPSBkM19sYXlvdXRfc3RhY2tPcmRlckRlZmF1bHQsIG9mZnNldCA9IGQzX2xheW91dF9zdGFja09mZnNldFplcm8sIG91dCA9IGQzX2xheW91dF9zdGFja091dCwgeCA9IGQzX2xheW91dF9zdGFja1gsIHkgPSBkM19sYXlvdXRfc3RhY2tZO1xuICAgIGZ1bmN0aW9uIHN0YWNrKGRhdGEsIGluZGV4KSB7XG4gICAgICB2YXIgc2VyaWVzID0gZGF0YS5tYXAoZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4gdmFsdWVzLmNhbGwoc3RhY2ssIGQsIGkpO1xuICAgICAgfSk7XG4gICAgICB2YXIgcG9pbnRzID0gc2VyaWVzLm1hcChmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkLm1hcChmdW5jdGlvbih2LCBpKSB7XG4gICAgICAgICAgcmV0dXJuIFsgeC5jYWxsKHN0YWNrLCB2LCBpKSwgeS5jYWxsKHN0YWNrLCB2LCBpKSBdO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgdmFyIG9yZGVycyA9IG9yZGVyLmNhbGwoc3RhY2ssIHBvaW50cywgaW5kZXgpO1xuICAgICAgc2VyaWVzID0gZDMucGVybXV0ZShzZXJpZXMsIG9yZGVycyk7XG4gICAgICBwb2ludHMgPSBkMy5wZXJtdXRlKHBvaW50cywgb3JkZXJzKTtcbiAgICAgIHZhciBvZmZzZXRzID0gb2Zmc2V0LmNhbGwoc3RhY2ssIHBvaW50cywgaW5kZXgpO1xuICAgICAgdmFyIG4gPSBzZXJpZXMubGVuZ3RoLCBtID0gc2VyaWVzWzBdLmxlbmd0aCwgaSwgaiwgbztcbiAgICAgIGZvciAoaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICAgICAgb3V0LmNhbGwoc3RhY2ssIHNlcmllc1swXVtqXSwgbyA9IG9mZnNldHNbal0sIHBvaW50c1swXVtqXVsxXSk7XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgICBvdXQuY2FsbChzdGFjaywgc2VyaWVzW2ldW2pdLCBvICs9IHBvaW50c1tpIC0gMV1bal1bMV0sIHBvaW50c1tpXVtqXVsxXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBzdGFjay52YWx1ZXMgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB2YWx1ZXM7XG4gICAgICB2YWx1ZXMgPSB4O1xuICAgICAgcmV0dXJuIHN0YWNrO1xuICAgIH07XG4gICAgc3RhY2sub3JkZXIgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvcmRlcjtcbiAgICAgIG9yZGVyID0gdHlwZW9mIHggPT09IFwiZnVuY3Rpb25cIiA/IHggOiBkM19sYXlvdXRfc3RhY2tPcmRlcnMuZ2V0KHgpIHx8IGQzX2xheW91dF9zdGFja09yZGVyRGVmYXVsdDtcbiAgICAgIHJldHVybiBzdGFjaztcbiAgICB9O1xuICAgIHN0YWNrLm9mZnNldCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG9mZnNldDtcbiAgICAgIG9mZnNldCA9IHR5cGVvZiB4ID09PSBcImZ1bmN0aW9uXCIgPyB4IDogZDNfbGF5b3V0X3N0YWNrT2Zmc2V0cy5nZXQoeCkgfHwgZDNfbGF5b3V0X3N0YWNrT2Zmc2V0WmVybztcbiAgICAgIHJldHVybiBzdGFjaztcbiAgICB9O1xuICAgIHN0YWNrLnggPSBmdW5jdGlvbih6KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB4O1xuICAgICAgeCA9IHo7XG4gICAgICByZXR1cm4gc3RhY2s7XG4gICAgfTtcbiAgICBzdGFjay55ID0gZnVuY3Rpb24oeikge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4geTtcbiAgICAgIHkgPSB6O1xuICAgICAgcmV0dXJuIHN0YWNrO1xuICAgIH07XG4gICAgc3RhY2sub3V0ID0gZnVuY3Rpb24oeikge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3V0O1xuICAgICAgb3V0ID0gejtcbiAgICAgIHJldHVybiBzdGFjaztcbiAgICB9O1xuICAgIHJldHVybiBzdGFjaztcbiAgfTtcbiAgZnVuY3Rpb24gZDNfbGF5b3V0X3N0YWNrWChkKSB7XG4gICAgcmV0dXJuIGQueDtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfc3RhY2tZKGQpIHtcbiAgICByZXR1cm4gZC55O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9zdGFja091dChkLCB5MCwgeSkge1xuICAgIGQueTAgPSB5MDtcbiAgICBkLnkgPSB5O1xuICB9XG4gIHZhciBkM19sYXlvdXRfc3RhY2tPcmRlcnMgPSBkMy5tYXAoe1xuICAgIFwiaW5zaWRlLW91dFwiOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICB2YXIgbiA9IGRhdGEubGVuZ3RoLCBpLCBqLCBtYXggPSBkYXRhLm1hcChkM19sYXlvdXRfc3RhY2tNYXhJbmRleCksIHN1bXMgPSBkYXRhLm1hcChkM19sYXlvdXRfc3RhY2tSZWR1Y2VTdW0pLCBpbmRleCA9IGQzLnJhbmdlKG4pLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gbWF4W2FdIC0gbWF4W2JdO1xuICAgICAgfSksIHRvcCA9IDAsIGJvdHRvbSA9IDAsIHRvcHMgPSBbXSwgYm90dG9tcyA9IFtdO1xuICAgICAgZm9yIChpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgICBqID0gaW5kZXhbaV07XG4gICAgICAgIGlmICh0b3AgPCBib3R0b20pIHtcbiAgICAgICAgICB0b3AgKz0gc3Vtc1tqXTtcbiAgICAgICAgICB0b3BzLnB1c2goaik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYm90dG9tICs9IHN1bXNbal07XG4gICAgICAgICAgYm90dG9tcy5wdXNoKGopO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gYm90dG9tcy5yZXZlcnNlKCkuY29uY2F0KHRvcHMpO1xuICAgIH0sXG4gICAgcmV2ZXJzZTogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgcmV0dXJuIGQzLnJhbmdlKGRhdGEubGVuZ3RoKS5yZXZlcnNlKCk7XG4gICAgfSxcbiAgICBcImRlZmF1bHRcIjogZDNfbGF5b3V0X3N0YWNrT3JkZXJEZWZhdWx0XG4gIH0pO1xuICB2YXIgZDNfbGF5b3V0X3N0YWNrT2Zmc2V0cyA9IGQzLm1hcCh7XG4gICAgc2lsaG91ZXR0ZTogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgdmFyIG4gPSBkYXRhLmxlbmd0aCwgbSA9IGRhdGFbMF0ubGVuZ3RoLCBzdW1zID0gW10sIG1heCA9IDAsIGksIGosIG8sIHkwID0gW107XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgICAgIGZvciAoaSA9IDAsIG8gPSAwOyBpIDwgbjsgaSsrKSBvICs9IGRhdGFbaV1bal1bMV07XG4gICAgICAgIGlmIChvID4gbWF4KSBtYXggPSBvO1xuICAgICAgICBzdW1zLnB1c2gobyk7XG4gICAgICB9XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgICAgIHkwW2pdID0gKG1heCAtIHN1bXNbal0pIC8gMjtcbiAgICAgIH1cbiAgICAgIHJldHVybiB5MDtcbiAgICB9LFxuICAgIHdpZ2dsZTogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgdmFyIG4gPSBkYXRhLmxlbmd0aCwgeCA9IGRhdGFbMF0sIG0gPSB4Lmxlbmd0aCwgaSwgaiwgaywgczEsIHMyLCBzMywgZHgsIG8sIG8wLCB5MCA9IFtdO1xuICAgICAgeTBbMF0gPSBvID0gbzAgPSAwO1xuICAgICAgZm9yIChqID0gMTsgaiA8IG07ICsraikge1xuICAgICAgICBmb3IgKGkgPSAwLCBzMSA9IDA7IGkgPCBuOyArK2kpIHMxICs9IGRhdGFbaV1bal1bMV07XG4gICAgICAgIGZvciAoaSA9IDAsIHMyID0gMCwgZHggPSB4W2pdWzBdIC0geFtqIC0gMV1bMF07IGkgPCBuOyArK2kpIHtcbiAgICAgICAgICBmb3IgKGsgPSAwLCBzMyA9IChkYXRhW2ldW2pdWzFdIC0gZGF0YVtpXVtqIC0gMV1bMV0pIC8gKDIgKiBkeCk7IGsgPCBpOyArK2spIHtcbiAgICAgICAgICAgIHMzICs9IChkYXRhW2tdW2pdWzFdIC0gZGF0YVtrXVtqIC0gMV1bMV0pIC8gZHg7XG4gICAgICAgICAgfVxuICAgICAgICAgIHMyICs9IHMzICogZGF0YVtpXVtqXVsxXTtcbiAgICAgICAgfVxuICAgICAgICB5MFtqXSA9IG8gLT0gczEgPyBzMiAvIHMxICogZHggOiAwO1xuICAgICAgICBpZiAobyA8IG8wKSBvMCA9IG87XG4gICAgICB9XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbTsgKytqKSB5MFtqXSAtPSBvMDtcbiAgICAgIHJldHVybiB5MDtcbiAgICB9LFxuICAgIGV4cGFuZDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgdmFyIG4gPSBkYXRhLmxlbmd0aCwgbSA9IGRhdGFbMF0ubGVuZ3RoLCBrID0gMSAvIG4sIGksIGosIG8sIHkwID0gW107XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgICAgIGZvciAoaSA9IDAsIG8gPSAwOyBpIDwgbjsgaSsrKSBvICs9IGRhdGFbaV1bal1bMV07XG4gICAgICAgIGlmIChvKSBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSBkYXRhW2ldW2pdWzFdIC89IG87IGVsc2UgZm9yIChpID0gMDsgaSA8IG47IGkrKykgZGF0YVtpXVtqXVsxXSA9IGs7XG4gICAgICB9XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbTsgKytqKSB5MFtqXSA9IDA7XG4gICAgICByZXR1cm4geTA7XG4gICAgfSxcbiAgICB6ZXJvOiBkM19sYXlvdXRfc3RhY2tPZmZzZXRaZXJvXG4gIH0pO1xuICBmdW5jdGlvbiBkM19sYXlvdXRfc3RhY2tPcmRlckRlZmF1bHQoZGF0YSkge1xuICAgIHJldHVybiBkMy5yYW5nZShkYXRhLmxlbmd0aCk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X3N0YWNrT2Zmc2V0WmVybyhkYXRhKSB7XG4gICAgdmFyIGogPSAtMSwgbSA9IGRhdGFbMF0ubGVuZ3RoLCB5MCA9IFtdO1xuICAgIHdoaWxlICgrK2ogPCBtKSB5MFtqXSA9IDA7XG4gICAgcmV0dXJuIHkwO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9zdGFja01heEluZGV4KGFycmF5KSB7XG4gICAgdmFyIGkgPSAxLCBqID0gMCwgdiA9IGFycmF5WzBdWzFdLCBrLCBuID0gYXJyYXkubGVuZ3RoO1xuICAgIGZvciAoO2kgPCBuOyArK2kpIHtcbiAgICAgIGlmICgoayA9IGFycmF5W2ldWzFdKSA+IHYpIHtcbiAgICAgICAgaiA9IGk7XG4gICAgICAgIHYgPSBrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gajtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfc3RhY2tSZWR1Y2VTdW0oZCkge1xuICAgIHJldHVybiBkLnJlZHVjZShkM19sYXlvdXRfc3RhY2tTdW0sIDApO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9zdGFja1N1bShwLCBkKSB7XG4gICAgcmV0dXJuIHAgKyBkWzFdO1xuICB9XG4gIGQzLmxheW91dC5oaXN0b2dyYW0gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZnJlcXVlbmN5ID0gdHJ1ZSwgdmFsdWVyID0gTnVtYmVyLCByYW5nZXIgPSBkM19sYXlvdXRfaGlzdG9ncmFtUmFuZ2UsIGJpbm5lciA9IGQzX2xheW91dF9oaXN0b2dyYW1CaW5TdHVyZ2VzO1xuICAgIGZ1bmN0aW9uIGhpc3RvZ3JhbShkYXRhLCBpKSB7XG4gICAgICB2YXIgYmlucyA9IFtdLCB2YWx1ZXMgPSBkYXRhLm1hcCh2YWx1ZXIsIHRoaXMpLCByYW5nZSA9IHJhbmdlci5jYWxsKHRoaXMsIHZhbHVlcywgaSksIHRocmVzaG9sZHMgPSBiaW5uZXIuY2FsbCh0aGlzLCByYW5nZSwgdmFsdWVzLCBpKSwgYmluLCBpID0gLTEsIG4gPSB2YWx1ZXMubGVuZ3RoLCBtID0gdGhyZXNob2xkcy5sZW5ndGggLSAxLCBrID0gZnJlcXVlbmN5ID8gMSA6IDEgLyBuLCB4O1xuICAgICAgd2hpbGUgKCsraSA8IG0pIHtcbiAgICAgICAgYmluID0gYmluc1tpXSA9IFtdO1xuICAgICAgICBiaW4uZHggPSB0aHJlc2hvbGRzW2kgKyAxXSAtIChiaW4ueCA9IHRocmVzaG9sZHNbaV0pO1xuICAgICAgICBiaW4ueSA9IDA7XG4gICAgICB9XG4gICAgICBpZiAobSA+IDApIHtcbiAgICAgICAgaSA9IC0xO1xuICAgICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICAgIHggPSB2YWx1ZXNbaV07XG4gICAgICAgICAgaWYgKHggPj0gcmFuZ2VbMF0gJiYgeCA8PSByYW5nZVsxXSkge1xuICAgICAgICAgICAgYmluID0gYmluc1tkMy5iaXNlY3QodGhyZXNob2xkcywgeCwgMSwgbSkgLSAxXTtcbiAgICAgICAgICAgIGJpbi55ICs9IGs7XG4gICAgICAgICAgICBiaW4ucHVzaChkYXRhW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBiaW5zO1xuICAgIH1cbiAgICBoaXN0b2dyYW0udmFsdWUgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB2YWx1ZXI7XG4gICAgICB2YWx1ZXIgPSB4O1xuICAgICAgcmV0dXJuIGhpc3RvZ3JhbTtcbiAgICB9O1xuICAgIGhpc3RvZ3JhbS5yYW5nZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHJhbmdlcjtcbiAgICAgIHJhbmdlciA9IGQzX2Z1bmN0b3IoeCk7XG4gICAgICByZXR1cm4gaGlzdG9ncmFtO1xuICAgIH07XG4gICAgaGlzdG9ncmFtLmJpbnMgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBiaW5uZXI7XG4gICAgICBiaW5uZXIgPSB0eXBlb2YgeCA9PT0gXCJudW1iZXJcIiA/IGZ1bmN0aW9uKHJhbmdlKSB7XG4gICAgICAgIHJldHVybiBkM19sYXlvdXRfaGlzdG9ncmFtQmluRml4ZWQocmFuZ2UsIHgpO1xuICAgICAgfSA6IGQzX2Z1bmN0b3IoeCk7XG4gICAgICByZXR1cm4gaGlzdG9ncmFtO1xuICAgIH07XG4gICAgaGlzdG9ncmFtLmZyZXF1ZW5jeSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGZyZXF1ZW5jeTtcbiAgICAgIGZyZXF1ZW5jeSA9ICEheDtcbiAgICAgIHJldHVybiBoaXN0b2dyYW07XG4gICAgfTtcbiAgICByZXR1cm4gaGlzdG9ncmFtO1xuICB9O1xuICBmdW5jdGlvbiBkM19sYXlvdXRfaGlzdG9ncmFtQmluU3R1cmdlcyhyYW5nZSwgdmFsdWVzKSB7XG4gICAgcmV0dXJuIGQzX2xheW91dF9oaXN0b2dyYW1CaW5GaXhlZChyYW5nZSwgTWF0aC5jZWlsKE1hdGgubG9nKHZhbHVlcy5sZW5ndGgpIC8gTWF0aC5MTjIgKyAxKSk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X2hpc3RvZ3JhbUJpbkZpeGVkKHJhbmdlLCBuKSB7XG4gICAgdmFyIHggPSAtMSwgYiA9ICtyYW5nZVswXSwgbSA9IChyYW5nZVsxXSAtIGIpIC8gbiwgZiA9IFtdO1xuICAgIHdoaWxlICgrK3ggPD0gbikgZlt4XSA9IG0gKiB4ICsgYjtcbiAgICByZXR1cm4gZjtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfaGlzdG9ncmFtUmFuZ2UodmFsdWVzKSB7XG4gICAgcmV0dXJuIFsgZDMubWluKHZhbHVlcyksIGQzLm1heCh2YWx1ZXMpIF07XG4gIH1cbiAgZDMubGF5b3V0LnRyZWUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaGllcmFyY2h5ID0gZDMubGF5b3V0LmhpZXJhcmNoeSgpLnNvcnQobnVsbCkudmFsdWUobnVsbCksIHNlcGFyYXRpb24gPSBkM19sYXlvdXRfdHJlZVNlcGFyYXRpb24sIHNpemUgPSBbIDEsIDEgXSwgbm9kZVNpemUgPSBmYWxzZTtcbiAgICBmdW5jdGlvbiB0cmVlKGQsIGkpIHtcbiAgICAgIHZhciBub2RlcyA9IGhpZXJhcmNoeS5jYWxsKHRoaXMsIGQsIGkpLCByb290ID0gbm9kZXNbMF07XG4gICAgICBmdW5jdGlvbiBmaXJzdFdhbGsobm9kZSwgcHJldmlvdXNTaWJsaW5nKSB7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW4sIGxheW91dCA9IG5vZGUuX3RyZWU7XG4gICAgICAgIGlmIChjaGlsZHJlbiAmJiAobiA9IGNoaWxkcmVuLmxlbmd0aCkpIHtcbiAgICAgICAgICB2YXIgbiwgZmlyc3RDaGlsZCA9IGNoaWxkcmVuWzBdLCBwcmV2aW91c0NoaWxkLCBhbmNlc3RvciA9IGZpcnN0Q2hpbGQsIGNoaWxkLCBpID0gLTE7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgICAgIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICAgICAgICBmaXJzdFdhbGsoY2hpbGQsIHByZXZpb3VzQ2hpbGQpO1xuICAgICAgICAgICAgYW5jZXN0b3IgPSBhcHBvcnRpb24oY2hpbGQsIHByZXZpb3VzQ2hpbGQsIGFuY2VzdG9yKTtcbiAgICAgICAgICAgIHByZXZpb3VzQ2hpbGQgPSBjaGlsZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgZDNfbGF5b3V0X3RyZWVTaGlmdChub2RlKTtcbiAgICAgICAgICB2YXIgbWlkcG9pbnQgPSAuNSAqIChmaXJzdENoaWxkLl90cmVlLnByZWxpbSArIGNoaWxkLl90cmVlLnByZWxpbSk7XG4gICAgICAgICAgaWYgKHByZXZpb3VzU2libGluZykge1xuICAgICAgICAgICAgbGF5b3V0LnByZWxpbSA9IHByZXZpb3VzU2libGluZy5fdHJlZS5wcmVsaW0gKyBzZXBhcmF0aW9uKG5vZGUsIHByZXZpb3VzU2libGluZyk7XG4gICAgICAgICAgICBsYXlvdXQubW9kID0gbGF5b3V0LnByZWxpbSAtIG1pZHBvaW50O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsYXlvdXQucHJlbGltID0gbWlkcG9pbnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChwcmV2aW91c1NpYmxpbmcpIHtcbiAgICAgICAgICAgIGxheW91dC5wcmVsaW0gPSBwcmV2aW91c1NpYmxpbmcuX3RyZWUucHJlbGltICsgc2VwYXJhdGlvbihub2RlLCBwcmV2aW91c1NpYmxpbmcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZnVuY3Rpb24gc2Vjb25kV2Fsayhub2RlLCB4KSB7XG4gICAgICAgIG5vZGUueCA9IG5vZGUuX3RyZWUucHJlbGltICsgeDtcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbjtcbiAgICAgICAgaWYgKGNoaWxkcmVuICYmIChuID0gY2hpbGRyZW4ubGVuZ3RoKSkge1xuICAgICAgICAgIHZhciBpID0gLTEsIG47XG4gICAgICAgICAgeCArPSBub2RlLl90cmVlLm1vZDtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICAgICAgc2Vjb25kV2FsayhjaGlsZHJlbltpXSwgeCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBhcHBvcnRpb24obm9kZSwgcHJldmlvdXNTaWJsaW5nLCBhbmNlc3Rvcikge1xuICAgICAgICBpZiAocHJldmlvdXNTaWJsaW5nKSB7XG4gICAgICAgICAgdmFyIHZpcCA9IG5vZGUsIHZvcCA9IG5vZGUsIHZpbSA9IHByZXZpb3VzU2libGluZywgdm9tID0gbm9kZS5wYXJlbnQuY2hpbGRyZW5bMF0sIHNpcCA9IHZpcC5fdHJlZS5tb2QsIHNvcCA9IHZvcC5fdHJlZS5tb2QsIHNpbSA9IHZpbS5fdHJlZS5tb2QsIHNvbSA9IHZvbS5fdHJlZS5tb2QsIHNoaWZ0O1xuICAgICAgICAgIHdoaWxlICh2aW0gPSBkM19sYXlvdXRfdHJlZVJpZ2h0KHZpbSksIHZpcCA9IGQzX2xheW91dF90cmVlTGVmdCh2aXApLCB2aW0gJiYgdmlwKSB7XG4gICAgICAgICAgICB2b20gPSBkM19sYXlvdXRfdHJlZUxlZnQodm9tKTtcbiAgICAgICAgICAgIHZvcCA9IGQzX2xheW91dF90cmVlUmlnaHQodm9wKTtcbiAgICAgICAgICAgIHZvcC5fdHJlZS5hbmNlc3RvciA9IG5vZGU7XG4gICAgICAgICAgICBzaGlmdCA9IHZpbS5fdHJlZS5wcmVsaW0gKyBzaW0gLSB2aXAuX3RyZWUucHJlbGltIC0gc2lwICsgc2VwYXJhdGlvbih2aW0sIHZpcCk7XG4gICAgICAgICAgICBpZiAoc2hpZnQgPiAwKSB7XG4gICAgICAgICAgICAgIGQzX2xheW91dF90cmVlTW92ZShkM19sYXlvdXRfdHJlZUFuY2VzdG9yKHZpbSwgbm9kZSwgYW5jZXN0b3IpLCBub2RlLCBzaGlmdCk7XG4gICAgICAgICAgICAgIHNpcCArPSBzaGlmdDtcbiAgICAgICAgICAgICAgc29wICs9IHNoaWZ0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2ltICs9IHZpbS5fdHJlZS5tb2Q7XG4gICAgICAgICAgICBzaXAgKz0gdmlwLl90cmVlLm1vZDtcbiAgICAgICAgICAgIHNvbSArPSB2b20uX3RyZWUubW9kO1xuICAgICAgICAgICAgc29wICs9IHZvcC5fdHJlZS5tb2Q7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2aW0gJiYgIWQzX2xheW91dF90cmVlUmlnaHQodm9wKSkge1xuICAgICAgICAgICAgdm9wLl90cmVlLnRocmVhZCA9IHZpbTtcbiAgICAgICAgICAgIHZvcC5fdHJlZS5tb2QgKz0gc2ltIC0gc29wO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodmlwICYmICFkM19sYXlvdXRfdHJlZUxlZnQodm9tKSkge1xuICAgICAgICAgICAgdm9tLl90cmVlLnRocmVhZCA9IHZpcDtcbiAgICAgICAgICAgIHZvbS5fdHJlZS5tb2QgKz0gc2lwIC0gc29tO1xuICAgICAgICAgICAgYW5jZXN0b3IgPSBub2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYW5jZXN0b3I7XG4gICAgICB9XG4gICAgICBkM19sYXlvdXRfdHJlZVZpc2l0QWZ0ZXIocm9vdCwgZnVuY3Rpb24obm9kZSwgcHJldmlvdXNTaWJsaW5nKSB7XG4gICAgICAgIG5vZGUuX3RyZWUgPSB7XG4gICAgICAgICAgYW5jZXN0b3I6IG5vZGUsXG4gICAgICAgICAgcHJlbGltOiAwLFxuICAgICAgICAgIG1vZDogMCxcbiAgICAgICAgICBjaGFuZ2U6IDAsXG4gICAgICAgICAgc2hpZnQ6IDAsXG4gICAgICAgICAgbnVtYmVyOiBwcmV2aW91c1NpYmxpbmcgPyBwcmV2aW91c1NpYmxpbmcuX3RyZWUubnVtYmVyICsgMSA6IDBcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgICAgZmlyc3RXYWxrKHJvb3QpO1xuICAgICAgc2Vjb25kV2Fsayhyb290LCAtcm9vdC5fdHJlZS5wcmVsaW0pO1xuICAgICAgdmFyIGxlZnQgPSBkM19sYXlvdXRfdHJlZVNlYXJjaChyb290LCBkM19sYXlvdXRfdHJlZUxlZnRtb3N0KSwgcmlnaHQgPSBkM19sYXlvdXRfdHJlZVNlYXJjaChyb290LCBkM19sYXlvdXRfdHJlZVJpZ2h0bW9zdCksIGRlZXAgPSBkM19sYXlvdXRfdHJlZVNlYXJjaChyb290LCBkM19sYXlvdXRfdHJlZURlZXBlc3QpLCB4MCA9IGxlZnQueCAtIHNlcGFyYXRpb24obGVmdCwgcmlnaHQpIC8gMiwgeDEgPSByaWdodC54ICsgc2VwYXJhdGlvbihyaWdodCwgbGVmdCkgLyAyLCB5MSA9IGRlZXAuZGVwdGggfHwgMTtcbiAgICAgIGQzX2xheW91dF90cmVlVmlzaXRBZnRlcihyb290LCBub2RlU2l6ZSA/IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgbm9kZS54ICo9IHNpemVbMF07XG4gICAgICAgIG5vZGUueSA9IG5vZGUuZGVwdGggKiBzaXplWzFdO1xuICAgICAgICBkZWxldGUgbm9kZS5fdHJlZTtcbiAgICAgIH0gOiBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIG5vZGUueCA9IChub2RlLnggLSB4MCkgLyAoeDEgLSB4MCkgKiBzaXplWzBdO1xuICAgICAgICBub2RlLnkgPSBub2RlLmRlcHRoIC8geTEgKiBzaXplWzFdO1xuICAgICAgICBkZWxldGUgbm9kZS5fdHJlZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH1cbiAgICB0cmVlLnNlcGFyYXRpb24gPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzZXBhcmF0aW9uO1xuICAgICAgc2VwYXJhdGlvbiA9IHg7XG4gICAgICByZXR1cm4gdHJlZTtcbiAgICB9O1xuICAgIHRyZWUuc2l6ZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG5vZGVTaXplID8gbnVsbCA6IHNpemU7XG4gICAgICBub2RlU2l6ZSA9IChzaXplID0geCkgPT0gbnVsbDtcbiAgICAgIHJldHVybiB0cmVlO1xuICAgIH07XG4gICAgdHJlZS5ub2RlU2l6ZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG5vZGVTaXplID8gc2l6ZSA6IG51bGw7XG4gICAgICBub2RlU2l6ZSA9IChzaXplID0geCkgIT0gbnVsbDtcbiAgICAgIHJldHVybiB0cmVlO1xuICAgIH07XG4gICAgcmV0dXJuIGQzX2xheW91dF9oaWVyYXJjaHlSZWJpbmQodHJlZSwgaGllcmFyY2h5KTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfbGF5b3V0X3RyZWVTZXBhcmF0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYS5wYXJlbnQgPT0gYi5wYXJlbnQgPyAxIDogMjtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfdHJlZUxlZnQobm9kZSkge1xuICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XG4gICAgcmV0dXJuIGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCA/IGNoaWxkcmVuWzBdIDogbm9kZS5fdHJlZS50aHJlYWQ7XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X3RyZWVSaWdodChub2RlKSB7XG4gICAgdmFyIGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbiwgbjtcbiAgICByZXR1cm4gY2hpbGRyZW4gJiYgKG4gPSBjaGlsZHJlbi5sZW5ndGgpID8gY2hpbGRyZW5bbiAtIDFdIDogbm9kZS5fdHJlZS50aHJlYWQ7XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X3RyZWVTZWFyY2gobm9kZSwgY29tcGFyZSkge1xuICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XG4gICAgaWYgKGNoaWxkcmVuICYmIChuID0gY2hpbGRyZW4ubGVuZ3RoKSkge1xuICAgICAgdmFyIGNoaWxkLCBuLCBpID0gLTE7XG4gICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICBpZiAoY29tcGFyZShjaGlsZCA9IGQzX2xheW91dF90cmVlU2VhcmNoKGNoaWxkcmVuW2ldLCBjb21wYXJlKSwgbm9kZSkgPiAwKSB7XG4gICAgICAgICAgbm9kZSA9IGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF90cmVlUmlnaHRtb3N0KGEsIGIpIHtcbiAgICByZXR1cm4gYS54IC0gYi54O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF90cmVlTGVmdG1vc3QoYSwgYikge1xuICAgIHJldHVybiBiLnggLSBhLng7XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X3RyZWVEZWVwZXN0KGEsIGIpIHtcbiAgICByZXR1cm4gYS5kZXB0aCAtIGIuZGVwdGg7XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X3RyZWVWaXNpdEFmdGVyKG5vZGUsIGNhbGxiYWNrKSB7XG4gICAgZnVuY3Rpb24gdmlzaXQobm9kZSwgcHJldmlvdXNTaWJsaW5nKSB7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xuICAgICAgaWYgKGNoaWxkcmVuICYmIChuID0gY2hpbGRyZW4ubGVuZ3RoKSkge1xuICAgICAgICB2YXIgY2hpbGQsIHByZXZpb3VzQ2hpbGQgPSBudWxsLCBpID0gLTEsIG47XG4gICAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgICAgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICB2aXNpdChjaGlsZCwgcHJldmlvdXNDaGlsZCk7XG4gICAgICAgICAgcHJldmlvdXNDaGlsZCA9IGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjYWxsYmFjayhub2RlLCBwcmV2aW91c1NpYmxpbmcpO1xuICAgIH1cbiAgICB2aXNpdChub2RlLCBudWxsKTtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfdHJlZVNoaWZ0KG5vZGUpIHtcbiAgICB2YXIgc2hpZnQgPSAwLCBjaGFuZ2UgPSAwLCBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW4sIGkgPSBjaGlsZHJlbi5sZW5ndGgsIGNoaWxkO1xuICAgIHdoaWxlICgtLWkgPj0gMCkge1xuICAgICAgY2hpbGQgPSBjaGlsZHJlbltpXS5fdHJlZTtcbiAgICAgIGNoaWxkLnByZWxpbSArPSBzaGlmdDtcbiAgICAgIGNoaWxkLm1vZCArPSBzaGlmdDtcbiAgICAgIHNoaWZ0ICs9IGNoaWxkLnNoaWZ0ICsgKGNoYW5nZSArPSBjaGlsZC5jaGFuZ2UpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfdHJlZU1vdmUoYW5jZXN0b3IsIG5vZGUsIHNoaWZ0KSB7XG4gICAgYW5jZXN0b3IgPSBhbmNlc3Rvci5fdHJlZTtcbiAgICBub2RlID0gbm9kZS5fdHJlZTtcbiAgICB2YXIgY2hhbmdlID0gc2hpZnQgLyAobm9kZS5udW1iZXIgLSBhbmNlc3Rvci5udW1iZXIpO1xuICAgIGFuY2VzdG9yLmNoYW5nZSArPSBjaGFuZ2U7XG4gICAgbm9kZS5jaGFuZ2UgLT0gY2hhbmdlO1xuICAgIG5vZGUuc2hpZnQgKz0gc2hpZnQ7XG4gICAgbm9kZS5wcmVsaW0gKz0gc2hpZnQ7XG4gICAgbm9kZS5tb2QgKz0gc2hpZnQ7XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X3RyZWVBbmNlc3Rvcih2aW0sIG5vZGUsIGFuY2VzdG9yKSB7XG4gICAgcmV0dXJuIHZpbS5fdHJlZS5hbmNlc3Rvci5wYXJlbnQgPT0gbm9kZS5wYXJlbnQgPyB2aW0uX3RyZWUuYW5jZXN0b3IgOiBhbmNlc3RvcjtcbiAgfVxuICBkMy5sYXlvdXQucGFjayA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBoaWVyYXJjaHkgPSBkMy5sYXlvdXQuaGllcmFyY2h5KCkuc29ydChkM19sYXlvdXRfcGFja1NvcnQpLCBwYWRkaW5nID0gMCwgc2l6ZSA9IFsgMSwgMSBdLCByYWRpdXM7XG4gICAgZnVuY3Rpb24gcGFjayhkLCBpKSB7XG4gICAgICB2YXIgbm9kZXMgPSBoaWVyYXJjaHkuY2FsbCh0aGlzLCBkLCBpKSwgcm9vdCA9IG5vZGVzWzBdLCB3ID0gc2l6ZVswXSwgaCA9IHNpemVbMV0sIHIgPSByYWRpdXMgPT0gbnVsbCA/IE1hdGguc3FydCA6IHR5cGVvZiByYWRpdXMgPT09IFwiZnVuY3Rpb25cIiA/IHJhZGl1cyA6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcmFkaXVzO1xuICAgICAgfTtcbiAgICAgIHJvb3QueCA9IHJvb3QueSA9IDA7XG4gICAgICBkM19sYXlvdXRfdHJlZVZpc2l0QWZ0ZXIocm9vdCwgZnVuY3Rpb24oZCkge1xuICAgICAgICBkLnIgPSArcihkLnZhbHVlKTtcbiAgICAgIH0pO1xuICAgICAgZDNfbGF5b3V0X3RyZWVWaXNpdEFmdGVyKHJvb3QsIGQzX2xheW91dF9wYWNrU2libGluZ3MpO1xuICAgICAgaWYgKHBhZGRpbmcpIHtcbiAgICAgICAgdmFyIGRyID0gcGFkZGluZyAqIChyYWRpdXMgPyAxIDogTWF0aC5tYXgoMiAqIHJvb3QuciAvIHcsIDIgKiByb290LnIgLyBoKSkgLyAyO1xuICAgICAgICBkM19sYXlvdXRfdHJlZVZpc2l0QWZ0ZXIocm9vdCwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIGQuciArPSBkcjtcbiAgICAgICAgfSk7XG4gICAgICAgIGQzX2xheW91dF90cmVlVmlzaXRBZnRlcihyb290LCBkM19sYXlvdXRfcGFja1NpYmxpbmdzKTtcbiAgICAgICAgZDNfbGF5b3V0X3RyZWVWaXNpdEFmdGVyKHJvb3QsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICBkLnIgLT0gZHI7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZDNfbGF5b3V0X3BhY2tUcmFuc2Zvcm0ocm9vdCwgdyAvIDIsIGggLyAyLCByYWRpdXMgPyAxIDogMSAvIE1hdGgubWF4KDIgKiByb290LnIgLyB3LCAyICogcm9vdC5yIC8gaCkpO1xuICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH1cbiAgICBwYWNrLnNpemUgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzaXplO1xuICAgICAgc2l6ZSA9IF87XG4gICAgICByZXR1cm4gcGFjaztcbiAgICB9O1xuICAgIHBhY2sucmFkaXVzID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gcmFkaXVzO1xuICAgICAgcmFkaXVzID0gXyA9PSBudWxsIHx8IHR5cGVvZiBfID09PSBcImZ1bmN0aW9uXCIgPyBfIDogK187XG4gICAgICByZXR1cm4gcGFjaztcbiAgICB9O1xuICAgIHBhY2sucGFkZGluZyA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHBhZGRpbmc7XG4gICAgICBwYWRkaW5nID0gK187XG4gICAgICByZXR1cm4gcGFjaztcbiAgICB9O1xuICAgIHJldHVybiBkM19sYXlvdXRfaGllcmFyY2h5UmViaW5kKHBhY2ssIGhpZXJhcmNoeSk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9wYWNrU29ydChhLCBiKSB7XG4gICAgcmV0dXJuIGEudmFsdWUgLSBiLnZhbHVlO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9wYWNrSW5zZXJ0KGEsIGIpIHtcbiAgICB2YXIgYyA9IGEuX3BhY2tfbmV4dDtcbiAgICBhLl9wYWNrX25leHQgPSBiO1xuICAgIGIuX3BhY2tfcHJldiA9IGE7XG4gICAgYi5fcGFja19uZXh0ID0gYztcbiAgICBjLl9wYWNrX3ByZXYgPSBiO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9wYWNrU3BsaWNlKGEsIGIpIHtcbiAgICBhLl9wYWNrX25leHQgPSBiO1xuICAgIGIuX3BhY2tfcHJldiA9IGE7XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X3BhY2tJbnRlcnNlY3RzKGEsIGIpIHtcbiAgICB2YXIgZHggPSBiLnggLSBhLngsIGR5ID0gYi55IC0gYS55LCBkciA9IGEuciArIGIucjtcbiAgICByZXR1cm4gLjk5OSAqIGRyICogZHIgPiBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfcGFja1NpYmxpbmdzKG5vZGUpIHtcbiAgICBpZiAoIShub2RlcyA9IG5vZGUuY2hpbGRyZW4pIHx8ICEobiA9IG5vZGVzLmxlbmd0aCkpIHJldHVybjtcbiAgICB2YXIgbm9kZXMsIHhNaW4gPSBJbmZpbml0eSwgeE1heCA9IC1JbmZpbml0eSwgeU1pbiA9IEluZmluaXR5LCB5TWF4ID0gLUluZmluaXR5LCBhLCBiLCBjLCBpLCBqLCBrLCBuO1xuICAgIGZ1bmN0aW9uIGJvdW5kKG5vZGUpIHtcbiAgICAgIHhNaW4gPSBNYXRoLm1pbihub2RlLnggLSBub2RlLnIsIHhNaW4pO1xuICAgICAgeE1heCA9IE1hdGgubWF4KG5vZGUueCArIG5vZGUuciwgeE1heCk7XG4gICAgICB5TWluID0gTWF0aC5taW4obm9kZS55IC0gbm9kZS5yLCB5TWluKTtcbiAgICAgIHlNYXggPSBNYXRoLm1heChub2RlLnkgKyBub2RlLnIsIHlNYXgpO1xuICAgIH1cbiAgICBub2Rlcy5mb3JFYWNoKGQzX2xheW91dF9wYWNrTGluayk7XG4gICAgYSA9IG5vZGVzWzBdO1xuICAgIGEueCA9IC1hLnI7XG4gICAgYS55ID0gMDtcbiAgICBib3VuZChhKTtcbiAgICBpZiAobiA+IDEpIHtcbiAgICAgIGIgPSBub2Rlc1sxXTtcbiAgICAgIGIueCA9IGIucjtcbiAgICAgIGIueSA9IDA7XG4gICAgICBib3VuZChiKTtcbiAgICAgIGlmIChuID4gMikge1xuICAgICAgICBjID0gbm9kZXNbMl07XG4gICAgICAgIGQzX2xheW91dF9wYWNrUGxhY2UoYSwgYiwgYyk7XG4gICAgICAgIGJvdW5kKGMpO1xuICAgICAgICBkM19sYXlvdXRfcGFja0luc2VydChhLCBjKTtcbiAgICAgICAgYS5fcGFja19wcmV2ID0gYztcbiAgICAgICAgZDNfbGF5b3V0X3BhY2tJbnNlcnQoYywgYik7XG4gICAgICAgIGIgPSBhLl9wYWNrX25leHQ7XG4gICAgICAgIGZvciAoaSA9IDM7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBkM19sYXlvdXRfcGFja1BsYWNlKGEsIGIsIGMgPSBub2Rlc1tpXSk7XG4gICAgICAgICAgdmFyIGlzZWN0ID0gMCwgczEgPSAxLCBzMiA9IDE7XG4gICAgICAgICAgZm9yIChqID0gYi5fcGFja19uZXh0OyBqICE9PSBiOyBqID0gai5fcGFja19uZXh0LCBzMSsrKSB7XG4gICAgICAgICAgICBpZiAoZDNfbGF5b3V0X3BhY2tJbnRlcnNlY3RzKGosIGMpKSB7XG4gICAgICAgICAgICAgIGlzZWN0ID0gMTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpc2VjdCA9PSAxKSB7XG4gICAgICAgICAgICBmb3IgKGsgPSBhLl9wYWNrX3ByZXY7IGsgIT09IGouX3BhY2tfcHJldjsgayA9IGsuX3BhY2tfcHJldiwgczIrKykge1xuICAgICAgICAgICAgICBpZiAoZDNfbGF5b3V0X3BhY2tJbnRlcnNlY3RzKGssIGMpKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGlzZWN0KSB7XG4gICAgICAgICAgICBpZiAoczEgPCBzMiB8fCBzMSA9PSBzMiAmJiBiLnIgPCBhLnIpIGQzX2xheW91dF9wYWNrU3BsaWNlKGEsIGIgPSBqKTsgZWxzZSBkM19sYXlvdXRfcGFja1NwbGljZShhID0gaywgYik7XG4gICAgICAgICAgICBpLS07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGQzX2xheW91dF9wYWNrSW5zZXJ0KGEsIGMpO1xuICAgICAgICAgICAgYiA9IGM7XG4gICAgICAgICAgICBib3VuZChjKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIGN4ID0gKHhNaW4gKyB4TWF4KSAvIDIsIGN5ID0gKHlNaW4gKyB5TWF4KSAvIDIsIGNyID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICBjID0gbm9kZXNbaV07XG4gICAgICBjLnggLT0gY3g7XG4gICAgICBjLnkgLT0gY3k7XG4gICAgICBjciA9IE1hdGgubWF4KGNyLCBjLnIgKyBNYXRoLnNxcnQoYy54ICogYy54ICsgYy55ICogYy55KSk7XG4gICAgfVxuICAgIG5vZGUuciA9IGNyO1xuICAgIG5vZGVzLmZvckVhY2goZDNfbGF5b3V0X3BhY2tVbmxpbmspO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9wYWNrTGluayhub2RlKSB7XG4gICAgbm9kZS5fcGFja19uZXh0ID0gbm9kZS5fcGFja19wcmV2ID0gbm9kZTtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfcGFja1VubGluayhub2RlKSB7XG4gICAgZGVsZXRlIG5vZGUuX3BhY2tfbmV4dDtcbiAgICBkZWxldGUgbm9kZS5fcGFja19wcmV2O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9wYWNrVHJhbnNmb3JtKG5vZGUsIHgsIHksIGspIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xuICAgIG5vZGUueCA9IHggKz0gayAqIG5vZGUueDtcbiAgICBub2RlLnkgPSB5ICs9IGsgKiBub2RlLnk7XG4gICAgbm9kZS5yICo9IGs7XG4gICAgaWYgKGNoaWxkcmVuKSB7XG4gICAgICB2YXIgaSA9IC0xLCBuID0gY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIGQzX2xheW91dF9wYWNrVHJhbnNmb3JtKGNoaWxkcmVuW2ldLCB4LCB5LCBrKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X3BhY2tQbGFjZShhLCBiLCBjKSB7XG4gICAgdmFyIGRiID0gYS5yICsgYy5yLCBkeCA9IGIueCAtIGEueCwgZHkgPSBiLnkgLSBhLnk7XG4gICAgaWYgKGRiICYmIChkeCB8fCBkeSkpIHtcbiAgICAgIHZhciBkYSA9IGIuciArIGMuciwgZGMgPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICAgIGRhICo9IGRhO1xuICAgICAgZGIgKj0gZGI7XG4gICAgICB2YXIgeCA9IC41ICsgKGRiIC0gZGEpIC8gKDIgKiBkYyksIHkgPSBNYXRoLnNxcnQoTWF0aC5tYXgoMCwgMiAqIGRhICogKGRiICsgZGMpIC0gKGRiIC09IGRjKSAqIGRiIC0gZGEgKiBkYSkpIC8gKDIgKiBkYyk7XG4gICAgICBjLnggPSBhLnggKyB4ICogZHggKyB5ICogZHk7XG4gICAgICBjLnkgPSBhLnkgKyB4ICogZHkgLSB5ICogZHg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGMueCA9IGEueCArIGRiO1xuICAgICAgYy55ID0gYS55O1xuICAgIH1cbiAgfVxuICBkMy5sYXlvdXQuY2x1c3RlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBoaWVyYXJjaHkgPSBkMy5sYXlvdXQuaGllcmFyY2h5KCkuc29ydChudWxsKS52YWx1ZShudWxsKSwgc2VwYXJhdGlvbiA9IGQzX2xheW91dF90cmVlU2VwYXJhdGlvbiwgc2l6ZSA9IFsgMSwgMSBdLCBub2RlU2l6ZSA9IGZhbHNlO1xuICAgIGZ1bmN0aW9uIGNsdXN0ZXIoZCwgaSkge1xuICAgICAgdmFyIG5vZGVzID0gaGllcmFyY2h5LmNhbGwodGhpcywgZCwgaSksIHJvb3QgPSBub2Rlc1swXSwgcHJldmlvdXNOb2RlLCB4ID0gMDtcbiAgICAgIGQzX2xheW91dF90cmVlVmlzaXRBZnRlcihyb290LCBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XG4gICAgICAgIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICBub2RlLnggPSBkM19sYXlvdXRfY2x1c3RlclgoY2hpbGRyZW4pO1xuICAgICAgICAgIG5vZGUueSA9IGQzX2xheW91dF9jbHVzdGVyWShjaGlsZHJlbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbm9kZS54ID0gcHJldmlvdXNOb2RlID8geCArPSBzZXBhcmF0aW9uKG5vZGUsIHByZXZpb3VzTm9kZSkgOiAwO1xuICAgICAgICAgIG5vZGUueSA9IDA7XG4gICAgICAgICAgcHJldmlvdXNOb2RlID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB2YXIgbGVmdCA9IGQzX2xheW91dF9jbHVzdGVyTGVmdChyb290KSwgcmlnaHQgPSBkM19sYXlvdXRfY2x1c3RlclJpZ2h0KHJvb3QpLCB4MCA9IGxlZnQueCAtIHNlcGFyYXRpb24obGVmdCwgcmlnaHQpIC8gMiwgeDEgPSByaWdodC54ICsgc2VwYXJhdGlvbihyaWdodCwgbGVmdCkgLyAyO1xuICAgICAgZDNfbGF5b3V0X3RyZWVWaXNpdEFmdGVyKHJvb3QsIG5vZGVTaXplID8gZnVuY3Rpb24obm9kZSkge1xuICAgICAgICBub2RlLnggPSAobm9kZS54IC0gcm9vdC54KSAqIHNpemVbMF07XG4gICAgICAgIG5vZGUueSA9IChyb290LnkgLSBub2RlLnkpICogc2l6ZVsxXTtcbiAgICAgIH0gOiBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIG5vZGUueCA9IChub2RlLnggLSB4MCkgLyAoeDEgLSB4MCkgKiBzaXplWzBdO1xuICAgICAgICBub2RlLnkgPSAoMSAtIChyb290LnkgPyBub2RlLnkgLyByb290LnkgOiAxKSkgKiBzaXplWzFdO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbm9kZXM7XG4gICAgfVxuICAgIGNsdXN0ZXIuc2VwYXJhdGlvbiA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHNlcGFyYXRpb247XG4gICAgICBzZXBhcmF0aW9uID0geDtcbiAgICAgIHJldHVybiBjbHVzdGVyO1xuICAgIH07XG4gICAgY2x1c3Rlci5zaXplID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbm9kZVNpemUgPyBudWxsIDogc2l6ZTtcbiAgICAgIG5vZGVTaXplID0gKHNpemUgPSB4KSA9PSBudWxsO1xuICAgICAgcmV0dXJuIGNsdXN0ZXI7XG4gICAgfTtcbiAgICBjbHVzdGVyLm5vZGVTaXplID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbm9kZVNpemUgPyBzaXplIDogbnVsbDtcbiAgICAgIG5vZGVTaXplID0gKHNpemUgPSB4KSAhPSBudWxsO1xuICAgICAgcmV0dXJuIGNsdXN0ZXI7XG4gICAgfTtcbiAgICByZXR1cm4gZDNfbGF5b3V0X2hpZXJhcmNoeVJlYmluZChjbHVzdGVyLCBoaWVyYXJjaHkpO1xuICB9O1xuICBmdW5jdGlvbiBkM19sYXlvdXRfY2x1c3RlclkoY2hpbGRyZW4pIHtcbiAgICByZXR1cm4gMSArIGQzLm1heChjaGlsZHJlbiwgZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgIHJldHVybiBjaGlsZC55O1xuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9jbHVzdGVyWChjaGlsZHJlbikge1xuICAgIHJldHVybiBjaGlsZHJlbi5yZWR1Y2UoZnVuY3Rpb24oeCwgY2hpbGQpIHtcbiAgICAgIHJldHVybiB4ICsgY2hpbGQueDtcbiAgICB9LCAwKSAvIGNoaWxkcmVuLmxlbmd0aDtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfY2x1c3RlckxlZnQobm9kZSkge1xuICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XG4gICAgcmV0dXJuIGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCA/IGQzX2xheW91dF9jbHVzdGVyTGVmdChjaGlsZHJlblswXSkgOiBub2RlO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9jbHVzdGVyUmlnaHQobm9kZSkge1xuICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW4sIG47XG4gICAgcmV0dXJuIGNoaWxkcmVuICYmIChuID0gY2hpbGRyZW4ubGVuZ3RoKSA/IGQzX2xheW91dF9jbHVzdGVyUmlnaHQoY2hpbGRyZW5bbiAtIDFdKSA6IG5vZGU7XG4gIH1cbiAgZDMubGF5b3V0LnRyZWVtYXAgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaGllcmFyY2h5ID0gZDMubGF5b3V0LmhpZXJhcmNoeSgpLCByb3VuZCA9IE1hdGgucm91bmQsIHNpemUgPSBbIDEsIDEgXSwgcGFkZGluZyA9IG51bGwsIHBhZCA9IGQzX2xheW91dF90cmVlbWFwUGFkTnVsbCwgc3RpY2t5ID0gZmFsc2UsIHN0aWNraWVzLCBtb2RlID0gXCJzcXVhcmlmeVwiLCByYXRpbyA9IC41ICogKDEgKyBNYXRoLnNxcnQoNSkpO1xuICAgIGZ1bmN0aW9uIHNjYWxlKGNoaWxkcmVuLCBrKSB7XG4gICAgICB2YXIgaSA9IC0xLCBuID0gY2hpbGRyZW4ubGVuZ3RoLCBjaGlsZCwgYXJlYTtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgIGFyZWEgPSAoY2hpbGQgPSBjaGlsZHJlbltpXSkudmFsdWUgKiAoayA8IDAgPyAwIDogayk7XG4gICAgICAgIGNoaWxkLmFyZWEgPSBpc05hTihhcmVhKSB8fCBhcmVhIDw9IDAgPyAwIDogYXJlYTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc3F1YXJpZnkobm9kZSkge1xuICAgICAgdmFyIGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbjtcbiAgICAgIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgdmFyIHJlY3QgPSBwYWQobm9kZSksIHJvdyA9IFtdLCByZW1haW5pbmcgPSBjaGlsZHJlbi5zbGljZSgpLCBjaGlsZCwgYmVzdCA9IEluZmluaXR5LCBzY29yZSwgdSA9IG1vZGUgPT09IFwic2xpY2VcIiA/IHJlY3QuZHggOiBtb2RlID09PSBcImRpY2VcIiA/IHJlY3QuZHkgOiBtb2RlID09PSBcInNsaWNlLWRpY2VcIiA/IG5vZGUuZGVwdGggJiAxID8gcmVjdC5keSA6IHJlY3QuZHggOiBNYXRoLm1pbihyZWN0LmR4LCByZWN0LmR5KSwgbjtcbiAgICAgICAgc2NhbGUocmVtYWluaW5nLCByZWN0LmR4ICogcmVjdC5keSAvIG5vZGUudmFsdWUpO1xuICAgICAgICByb3cuYXJlYSA9IDA7XG4gICAgICAgIHdoaWxlICgobiA9IHJlbWFpbmluZy5sZW5ndGgpID4gMCkge1xuICAgICAgICAgIHJvdy5wdXNoKGNoaWxkID0gcmVtYWluaW5nW24gLSAxXSk7XG4gICAgICAgICAgcm93LmFyZWEgKz0gY2hpbGQuYXJlYTtcbiAgICAgICAgICBpZiAobW9kZSAhPT0gXCJzcXVhcmlmeVwiIHx8IChzY29yZSA9IHdvcnN0KHJvdywgdSkpIDw9IGJlc3QpIHtcbiAgICAgICAgICAgIHJlbWFpbmluZy5wb3AoKTtcbiAgICAgICAgICAgIGJlc3QgPSBzY29yZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcm93LmFyZWEgLT0gcm93LnBvcCgpLmFyZWE7XG4gICAgICAgICAgICBwb3NpdGlvbihyb3csIHUsIHJlY3QsIGZhbHNlKTtcbiAgICAgICAgICAgIHUgPSBNYXRoLm1pbihyZWN0LmR4LCByZWN0LmR5KTtcbiAgICAgICAgICAgIHJvdy5sZW5ndGggPSByb3cuYXJlYSA9IDA7XG4gICAgICAgICAgICBiZXN0ID0gSW5maW5pdHk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyb3cubGVuZ3RoKSB7XG4gICAgICAgICAgcG9zaXRpb24ocm93LCB1LCByZWN0LCB0cnVlKTtcbiAgICAgICAgICByb3cubGVuZ3RoID0gcm93LmFyZWEgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goc3F1YXJpZnkpO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBzdGlja2lmeShub2RlKSB7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xuICAgICAgaWYgKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICB2YXIgcmVjdCA9IHBhZChub2RlKSwgcmVtYWluaW5nID0gY2hpbGRyZW4uc2xpY2UoKSwgY2hpbGQsIHJvdyA9IFtdO1xuICAgICAgICBzY2FsZShyZW1haW5pbmcsIHJlY3QuZHggKiByZWN0LmR5IC8gbm9kZS52YWx1ZSk7XG4gICAgICAgIHJvdy5hcmVhID0gMDtcbiAgICAgICAgd2hpbGUgKGNoaWxkID0gcmVtYWluaW5nLnBvcCgpKSB7XG4gICAgICAgICAgcm93LnB1c2goY2hpbGQpO1xuICAgICAgICAgIHJvdy5hcmVhICs9IGNoaWxkLmFyZWE7XG4gICAgICAgICAgaWYgKGNoaWxkLnogIT0gbnVsbCkge1xuICAgICAgICAgICAgcG9zaXRpb24ocm93LCBjaGlsZC56ID8gcmVjdC5keCA6IHJlY3QuZHksIHJlY3QsICFyZW1haW5pbmcubGVuZ3RoKTtcbiAgICAgICAgICAgIHJvdy5sZW5ndGggPSByb3cuYXJlYSA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goc3RpY2tpZnkpO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB3b3JzdChyb3csIHUpIHtcbiAgICAgIHZhciBzID0gcm93LmFyZWEsIHIsIHJtYXggPSAwLCBybWluID0gSW5maW5pdHksIGkgPSAtMSwgbiA9IHJvdy5sZW5ndGg7XG4gICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICBpZiAoIShyID0gcm93W2ldLmFyZWEpKSBjb250aW51ZTtcbiAgICAgICAgaWYgKHIgPCBybWluKSBybWluID0gcjtcbiAgICAgICAgaWYgKHIgPiBybWF4KSBybWF4ID0gcjtcbiAgICAgIH1cbiAgICAgIHMgKj0gcztcbiAgICAgIHUgKj0gdTtcbiAgICAgIHJldHVybiBzID8gTWF0aC5tYXgodSAqIHJtYXggKiByYXRpbyAvIHMsIHMgLyAodSAqIHJtaW4gKiByYXRpbykpIDogSW5maW5pdHk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBvc2l0aW9uKHJvdywgdSwgcmVjdCwgZmx1c2gpIHtcbiAgICAgIHZhciBpID0gLTEsIG4gPSByb3cubGVuZ3RoLCB4ID0gcmVjdC54LCB5ID0gcmVjdC55LCB2ID0gdSA/IHJvdW5kKHJvdy5hcmVhIC8gdSkgOiAwLCBvO1xuICAgICAgaWYgKHUgPT0gcmVjdC5keCkge1xuICAgICAgICBpZiAoZmx1c2ggfHwgdiA+IHJlY3QuZHkpIHYgPSByZWN0LmR5O1xuICAgICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICAgIG8gPSByb3dbaV07XG4gICAgICAgICAgby54ID0geDtcbiAgICAgICAgICBvLnkgPSB5O1xuICAgICAgICAgIG8uZHkgPSB2O1xuICAgICAgICAgIHggKz0gby5keCA9IE1hdGgubWluKHJlY3QueCArIHJlY3QuZHggLSB4LCB2ID8gcm91bmQoby5hcmVhIC8gdikgOiAwKTtcbiAgICAgICAgfVxuICAgICAgICBvLnogPSB0cnVlO1xuICAgICAgICBvLmR4ICs9IHJlY3QueCArIHJlY3QuZHggLSB4O1xuICAgICAgICByZWN0LnkgKz0gdjtcbiAgICAgICAgcmVjdC5keSAtPSB2O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZsdXNoIHx8IHYgPiByZWN0LmR4KSB2ID0gcmVjdC5keDtcbiAgICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgICBvID0gcm93W2ldO1xuICAgICAgICAgIG8ueCA9IHg7XG4gICAgICAgICAgby55ID0geTtcbiAgICAgICAgICBvLmR4ID0gdjtcbiAgICAgICAgICB5ICs9IG8uZHkgPSBNYXRoLm1pbihyZWN0LnkgKyByZWN0LmR5IC0geSwgdiA/IHJvdW5kKG8uYXJlYSAvIHYpIDogMCk7XG4gICAgICAgIH1cbiAgICAgICAgby56ID0gZmFsc2U7XG4gICAgICAgIG8uZHkgKz0gcmVjdC55ICsgcmVjdC5keSAtIHk7XG4gICAgICAgIHJlY3QueCArPSB2O1xuICAgICAgICByZWN0LmR4IC09IHY7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRyZWVtYXAoZCkge1xuICAgICAgdmFyIG5vZGVzID0gc3RpY2tpZXMgfHwgaGllcmFyY2h5KGQpLCByb290ID0gbm9kZXNbMF07XG4gICAgICByb290LnggPSAwO1xuICAgICAgcm9vdC55ID0gMDtcbiAgICAgIHJvb3QuZHggPSBzaXplWzBdO1xuICAgICAgcm9vdC5keSA9IHNpemVbMV07XG4gICAgICBpZiAoc3RpY2tpZXMpIGhpZXJhcmNoeS5yZXZhbHVlKHJvb3QpO1xuICAgICAgc2NhbGUoWyByb290IF0sIHJvb3QuZHggKiByb290LmR5IC8gcm9vdC52YWx1ZSk7XG4gICAgICAoc3RpY2tpZXMgPyBzdGlja2lmeSA6IHNxdWFyaWZ5KShyb290KTtcbiAgICAgIGlmIChzdGlja3kpIHN0aWNraWVzID0gbm9kZXM7XG4gICAgICByZXR1cm4gbm9kZXM7XG4gICAgfVxuICAgIHRyZWVtYXAuc2l6ZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHNpemU7XG4gICAgICBzaXplID0geDtcbiAgICAgIHJldHVybiB0cmVlbWFwO1xuICAgIH07XG4gICAgdHJlZW1hcC5wYWRkaW5nID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gcGFkZGluZztcbiAgICAgIGZ1bmN0aW9uIHBhZEZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgdmFyIHAgPSB4LmNhbGwodHJlZW1hcCwgbm9kZSwgbm9kZS5kZXB0aCk7XG4gICAgICAgIHJldHVybiBwID09IG51bGwgPyBkM19sYXlvdXRfdHJlZW1hcFBhZE51bGwobm9kZSkgOiBkM19sYXlvdXRfdHJlZW1hcFBhZChub2RlLCB0eXBlb2YgcCA9PT0gXCJudW1iZXJcIiA/IFsgcCwgcCwgcCwgcCBdIDogcCk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBwYWRDb25zdGFudChub2RlKSB7XG4gICAgICAgIHJldHVybiBkM19sYXlvdXRfdHJlZW1hcFBhZChub2RlLCB4KTtcbiAgICAgIH1cbiAgICAgIHZhciB0eXBlO1xuICAgICAgcGFkID0gKHBhZGRpbmcgPSB4KSA9PSBudWxsID8gZDNfbGF5b3V0X3RyZWVtYXBQYWROdWxsIDogKHR5cGUgPSB0eXBlb2YgeCkgPT09IFwiZnVuY3Rpb25cIiA/IHBhZEZ1bmN0aW9uIDogdHlwZSA9PT0gXCJudW1iZXJcIiA/ICh4ID0gWyB4LCB4LCB4LCB4IF0sIFxuICAgICAgcGFkQ29uc3RhbnQpIDogcGFkQ29uc3RhbnQ7XG4gICAgICByZXR1cm4gdHJlZW1hcDtcbiAgICB9O1xuICAgIHRyZWVtYXAucm91bmQgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiByb3VuZCAhPSBOdW1iZXI7XG4gICAgICByb3VuZCA9IHggPyBNYXRoLnJvdW5kIDogTnVtYmVyO1xuICAgICAgcmV0dXJuIHRyZWVtYXA7XG4gICAgfTtcbiAgICB0cmVlbWFwLnN0aWNreSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHN0aWNreTtcbiAgICAgIHN0aWNreSA9IHg7XG4gICAgICBzdGlja2llcyA9IG51bGw7XG4gICAgICByZXR1cm4gdHJlZW1hcDtcbiAgICB9O1xuICAgIHRyZWVtYXAucmF0aW8gPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiByYXRpbztcbiAgICAgIHJhdGlvID0geDtcbiAgICAgIHJldHVybiB0cmVlbWFwO1xuICAgIH07XG4gICAgdHJlZW1hcC5tb2RlID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbW9kZTtcbiAgICAgIG1vZGUgPSB4ICsgXCJcIjtcbiAgICAgIHJldHVybiB0cmVlbWFwO1xuICAgIH07XG4gICAgcmV0dXJuIGQzX2xheW91dF9oaWVyYXJjaHlSZWJpbmQodHJlZW1hcCwgaGllcmFyY2h5KTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfbGF5b3V0X3RyZWVtYXBQYWROdWxsKG5vZGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogbm9kZS54LFxuICAgICAgeTogbm9kZS55LFxuICAgICAgZHg6IG5vZGUuZHgsXG4gICAgICBkeTogbm9kZS5keVxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X3RyZWVtYXBQYWQobm9kZSwgcGFkZGluZykge1xuICAgIHZhciB4ID0gbm9kZS54ICsgcGFkZGluZ1szXSwgeSA9IG5vZGUueSArIHBhZGRpbmdbMF0sIGR4ID0gbm9kZS5keCAtIHBhZGRpbmdbMV0gLSBwYWRkaW5nWzNdLCBkeSA9IG5vZGUuZHkgLSBwYWRkaW5nWzBdIC0gcGFkZGluZ1syXTtcbiAgICBpZiAoZHggPCAwKSB7XG4gICAgICB4ICs9IGR4IC8gMjtcbiAgICAgIGR4ID0gMDtcbiAgICB9XG4gICAgaWYgKGR5IDwgMCkge1xuICAgICAgeSArPSBkeSAvIDI7XG4gICAgICBkeSA9IDA7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB4OiB4LFxuICAgICAgeTogeSxcbiAgICAgIGR4OiBkeCxcbiAgICAgIGR5OiBkeVxuICAgIH07XG4gIH1cbiAgZDMucmFuZG9tID0ge1xuICAgIG5vcm1hbDogZnVuY3Rpb24owrUsIM+DKSB7XG4gICAgICB2YXIgbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICBpZiAobiA8IDIpIM+DID0gMTtcbiAgICAgIGlmIChuIDwgMSkgwrUgPSAwO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeCwgeSwgcjtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIHggPSBNYXRoLnJhbmRvbSgpICogMiAtIDE7XG4gICAgICAgICAgeSA9IE1hdGgucmFuZG9tKCkgKiAyIC0gMTtcbiAgICAgICAgICByID0geCAqIHggKyB5ICogeTtcbiAgICAgICAgfSB3aGlsZSAoIXIgfHwgciA+IDEpO1xuICAgICAgICByZXR1cm4gwrUgKyDPgyAqIHggKiBNYXRoLnNxcnQoLTIgKiBNYXRoLmxvZyhyKSAvIHIpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGxvZ05vcm1hbDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmFuZG9tID0gZDMucmFuZG9tLm5vcm1hbC5hcHBseShkMywgYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZXhwKHJhbmRvbSgpKTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBpcndpbkhhbGw6IGZ1bmN0aW9uKG0pIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yICh2YXIgcyA9IDAsIGogPSAwOyBqIDwgbTsgaisrKSBzICs9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIHJldHVybiBzIC8gbTtcbiAgICAgIH07XG4gICAgfVxuICB9O1xuICBkMy5zY2FsZSA9IHt9O1xuICBmdW5jdGlvbiBkM19zY2FsZUV4dGVudChkb21haW4pIHtcbiAgICB2YXIgc3RhcnQgPSBkb21haW5bMF0sIHN0b3AgPSBkb21haW5bZG9tYWluLmxlbmd0aCAtIDFdO1xuICAgIHJldHVybiBzdGFydCA8IHN0b3AgPyBbIHN0YXJ0LCBzdG9wIF0gOiBbIHN0b3AsIHN0YXJ0IF07XG4gIH1cbiAgZnVuY3Rpb24gZDNfc2NhbGVSYW5nZShzY2FsZSkge1xuICAgIHJldHVybiBzY2FsZS5yYW5nZUV4dGVudCA/IHNjYWxlLnJhbmdlRXh0ZW50KCkgOiBkM19zY2FsZUV4dGVudChzY2FsZS5yYW5nZSgpKTtcbiAgfVxuICBmdW5jdGlvbiBkM19zY2FsZV9iaWxpbmVhcihkb21haW4sIHJhbmdlLCB1bmludGVycG9sYXRlLCBpbnRlcnBvbGF0ZSkge1xuICAgIHZhciB1ID0gdW5pbnRlcnBvbGF0ZShkb21haW5bMF0sIGRvbWFpblsxXSksIGkgPSBpbnRlcnBvbGF0ZShyYW5nZVswXSwgcmFuZ2VbMV0pO1xuICAgIHJldHVybiBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gaSh1KHgpKTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGQzX3NjYWxlX25pY2UoZG9tYWluLCBuaWNlKSB7XG4gICAgdmFyIGkwID0gMCwgaTEgPSBkb21haW4ubGVuZ3RoIC0gMSwgeDAgPSBkb21haW5baTBdLCB4MSA9IGRvbWFpbltpMV0sIGR4O1xuICAgIGlmICh4MSA8IHgwKSB7XG4gICAgICBkeCA9IGkwLCBpMCA9IGkxLCBpMSA9IGR4O1xuICAgICAgZHggPSB4MCwgeDAgPSB4MSwgeDEgPSBkeDtcbiAgICB9XG4gICAgZG9tYWluW2kwXSA9IG5pY2UuZmxvb3IoeDApO1xuICAgIGRvbWFpbltpMV0gPSBuaWNlLmNlaWwoeDEpO1xuICAgIHJldHVybiBkb21haW47XG4gIH1cbiAgZnVuY3Rpb24gZDNfc2NhbGVfbmljZVN0ZXAoc3RlcCkge1xuICAgIHJldHVybiBzdGVwID8ge1xuICAgICAgZmxvb3I6IGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoeCAvIHN0ZXApICogc3RlcDtcbiAgICAgIH0sXG4gICAgICBjZWlsOiBmdW5jdGlvbih4KSB7XG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoeCAvIHN0ZXApICogc3RlcDtcbiAgICAgIH1cbiAgICB9IDogZDNfc2NhbGVfbmljZUlkZW50aXR5O1xuICB9XG4gIHZhciBkM19zY2FsZV9uaWNlSWRlbnRpdHkgPSB7XG4gICAgZmxvb3I6IGQzX2lkZW50aXR5LFxuICAgIGNlaWw6IGQzX2lkZW50aXR5XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3NjYWxlX3BvbHlsaW5lYXIoZG9tYWluLCByYW5nZSwgdW5pbnRlcnBvbGF0ZSwgaW50ZXJwb2xhdGUpIHtcbiAgICB2YXIgdSA9IFtdLCBpID0gW10sIGogPSAwLCBrID0gTWF0aC5taW4oZG9tYWluLmxlbmd0aCwgcmFuZ2UubGVuZ3RoKSAtIDE7XG4gICAgaWYgKGRvbWFpbltrXSA8IGRvbWFpblswXSkge1xuICAgICAgZG9tYWluID0gZG9tYWluLnNsaWNlKCkucmV2ZXJzZSgpO1xuICAgICAgcmFuZ2UgPSByYW5nZS5zbGljZSgpLnJldmVyc2UoKTtcbiAgICB9XG4gICAgd2hpbGUgKCsraiA8PSBrKSB7XG4gICAgICB1LnB1c2godW5pbnRlcnBvbGF0ZShkb21haW5baiAtIDFdLCBkb21haW5bal0pKTtcbiAgICAgIGkucHVzaChpbnRlcnBvbGF0ZShyYW5nZVtqIC0gMV0sIHJhbmdlW2pdKSk7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbih4KSB7XG4gICAgICB2YXIgaiA9IGQzLmJpc2VjdChkb21haW4sIHgsIDEsIGspIC0gMTtcbiAgICAgIHJldHVybiBpW2pdKHVbal0oeCkpO1xuICAgIH07XG4gIH1cbiAgZDMuc2NhbGUubGluZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGQzX3NjYWxlX2xpbmVhcihbIDAsIDEgXSwgWyAwLCAxIF0sIGQzX2ludGVycG9sYXRlLCBmYWxzZSk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3NjYWxlX2xpbmVhcihkb21haW4sIHJhbmdlLCBpbnRlcnBvbGF0ZSwgY2xhbXApIHtcbiAgICB2YXIgb3V0cHV0LCBpbnB1dDtcbiAgICBmdW5jdGlvbiByZXNjYWxlKCkge1xuICAgICAgdmFyIGxpbmVhciA9IE1hdGgubWluKGRvbWFpbi5sZW5ndGgsIHJhbmdlLmxlbmd0aCkgPiAyID8gZDNfc2NhbGVfcG9seWxpbmVhciA6IGQzX3NjYWxlX2JpbGluZWFyLCB1bmludGVycG9sYXRlID0gY2xhbXAgPyBkM191bmludGVycG9sYXRlQ2xhbXAgOiBkM191bmludGVycG9sYXRlTnVtYmVyO1xuICAgICAgb3V0cHV0ID0gbGluZWFyKGRvbWFpbiwgcmFuZ2UsIHVuaW50ZXJwb2xhdGUsIGludGVycG9sYXRlKTtcbiAgICAgIGlucHV0ID0gbGluZWFyKHJhbmdlLCBkb21haW4sIHVuaW50ZXJwb2xhdGUsIGQzX2ludGVycG9sYXRlKTtcbiAgICAgIHJldHVybiBzY2FsZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2NhbGUoeCkge1xuICAgICAgcmV0dXJuIG91dHB1dCh4KTtcbiAgICB9XG4gICAgc2NhbGUuaW52ZXJ0ID0gZnVuY3Rpb24oeSkge1xuICAgICAgcmV0dXJuIGlucHV0KHkpO1xuICAgIH07XG4gICAgc2NhbGUuZG9tYWluID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZG9tYWluO1xuICAgICAgZG9tYWluID0geC5tYXAoTnVtYmVyKTtcbiAgICAgIHJldHVybiByZXNjYWxlKCk7XG4gICAgfTtcbiAgICBzY2FsZS5yYW5nZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHJhbmdlO1xuICAgICAgcmFuZ2UgPSB4O1xuICAgICAgcmV0dXJuIHJlc2NhbGUoKTtcbiAgICB9O1xuICAgIHNjYWxlLnJhbmdlUm91bmQgPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gc2NhbGUucmFuZ2UoeCkuaW50ZXJwb2xhdGUoZDNfaW50ZXJwb2xhdGVSb3VuZCk7XG4gICAgfTtcbiAgICBzY2FsZS5jbGFtcCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNsYW1wO1xuICAgICAgY2xhbXAgPSB4O1xuICAgICAgcmV0dXJuIHJlc2NhbGUoKTtcbiAgICB9O1xuICAgIHNjYWxlLmludGVycG9sYXRlID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gaW50ZXJwb2xhdGU7XG4gICAgICBpbnRlcnBvbGF0ZSA9IHg7XG4gICAgICByZXR1cm4gcmVzY2FsZSgpO1xuICAgIH07XG4gICAgc2NhbGUudGlja3MgPSBmdW5jdGlvbihtKSB7XG4gICAgICByZXR1cm4gZDNfc2NhbGVfbGluZWFyVGlja3MoZG9tYWluLCBtKTtcbiAgICB9O1xuICAgIHNjYWxlLnRpY2tGb3JtYXQgPSBmdW5jdGlvbihtLCBmb3JtYXQpIHtcbiAgICAgIHJldHVybiBkM19zY2FsZV9saW5lYXJUaWNrRm9ybWF0KGRvbWFpbiwgbSwgZm9ybWF0KTtcbiAgICB9O1xuICAgIHNjYWxlLm5pY2UgPSBmdW5jdGlvbihtKSB7XG4gICAgICBkM19zY2FsZV9saW5lYXJOaWNlKGRvbWFpbiwgbSk7XG4gICAgICByZXR1cm4gcmVzY2FsZSgpO1xuICAgIH07XG4gICAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGQzX3NjYWxlX2xpbmVhcihkb21haW4sIHJhbmdlLCBpbnRlcnBvbGF0ZSwgY2xhbXApO1xuICAgIH07XG4gICAgcmV0dXJuIHJlc2NhbGUoKTtcbiAgfVxuICBmdW5jdGlvbiBkM19zY2FsZV9saW5lYXJSZWJpbmQoc2NhbGUsIGxpbmVhcikge1xuICAgIHJldHVybiBkMy5yZWJpbmQoc2NhbGUsIGxpbmVhciwgXCJyYW5nZVwiLCBcInJhbmdlUm91bmRcIiwgXCJpbnRlcnBvbGF0ZVwiLCBcImNsYW1wXCIpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3NjYWxlX2xpbmVhck5pY2UoZG9tYWluLCBtKSB7XG4gICAgcmV0dXJuIGQzX3NjYWxlX25pY2UoZG9tYWluLCBkM19zY2FsZV9uaWNlU3RlcChtID8gZDNfc2NhbGVfbGluZWFyVGlja1JhbmdlKGRvbWFpbiwgbSlbMl0gOiBkM19zY2FsZV9saW5lYXJOaWNlU3RlcChkb21haW4pKSk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc2NhbGVfbGluZWFyTmljZVN0ZXAoZG9tYWluKSB7XG4gICAgdmFyIGV4dGVudCA9IGQzX3NjYWxlRXh0ZW50KGRvbWFpbiksIHNwYW4gPSBleHRlbnRbMV0gLSBleHRlbnRbMF07XG4gICAgcmV0dXJuIE1hdGgucG93KDEwLCBNYXRoLnJvdW5kKE1hdGgubG9nKHNwYW4pIC8gTWF0aC5MTjEwKSAtIDEpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3NjYWxlX2xpbmVhclRpY2tSYW5nZShkb21haW4sIG0pIHtcbiAgICB2YXIgZXh0ZW50ID0gZDNfc2NhbGVFeHRlbnQoZG9tYWluKSwgc3BhbiA9IGV4dGVudFsxXSAtIGV4dGVudFswXSwgc3RlcCA9IE1hdGgucG93KDEwLCBNYXRoLmZsb29yKE1hdGgubG9nKHNwYW4gLyBtKSAvIE1hdGguTE4xMCkpLCBlcnIgPSBtIC8gc3BhbiAqIHN0ZXA7XG4gICAgaWYgKGVyciA8PSAuMTUpIHN0ZXAgKj0gMTA7IGVsc2UgaWYgKGVyciA8PSAuMzUpIHN0ZXAgKj0gNTsgZWxzZSBpZiAoZXJyIDw9IC43NSkgc3RlcCAqPSAyO1xuICAgIGV4dGVudFswXSA9IE1hdGguY2VpbChleHRlbnRbMF0gLyBzdGVwKSAqIHN0ZXA7XG4gICAgZXh0ZW50WzFdID0gTWF0aC5mbG9vcihleHRlbnRbMV0gLyBzdGVwKSAqIHN0ZXAgKyBzdGVwICogLjU7XG4gICAgZXh0ZW50WzJdID0gc3RlcDtcbiAgICByZXR1cm4gZXh0ZW50O1xuICB9XG4gIGZ1bmN0aW9uIGQzX3NjYWxlX2xpbmVhclRpY2tzKGRvbWFpbiwgbSkge1xuICAgIHJldHVybiBkMy5yYW5nZS5hcHBseShkMywgZDNfc2NhbGVfbGluZWFyVGlja1JhbmdlKGRvbWFpbiwgbSkpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3NjYWxlX2xpbmVhclRpY2tGb3JtYXQoZG9tYWluLCBtLCBmb3JtYXQpIHtcbiAgICB2YXIgcHJlY2lzaW9uID0gLU1hdGguZmxvb3IoTWF0aC5sb2coZDNfc2NhbGVfbGluZWFyVGlja1JhbmdlKGRvbWFpbiwgbSlbMl0pIC8gTWF0aC5MTjEwICsgLjAxKTtcbiAgICByZXR1cm4gZDMuZm9ybWF0KGZvcm1hdCA/IGZvcm1hdC5yZXBsYWNlKGQzX2Zvcm1hdF9yZSwgZnVuY3Rpb24oYSwgYiwgYywgZCwgZSwgZiwgZywgaCwgaSwgaikge1xuICAgICAgcmV0dXJuIFsgYiwgYywgZCwgZSwgZiwgZywgaCwgaSB8fCBcIi5cIiArIChwcmVjaXNpb24gLSAoaiA9PT0gXCIlXCIpICogMiksIGogXS5qb2luKFwiXCIpO1xuICAgIH0pIDogXCIsLlwiICsgcHJlY2lzaW9uICsgXCJmXCIpO1xuICB9XG4gIGQzLnNjYWxlLmxvZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkM19zY2FsZV9sb2coZDMuc2NhbGUubGluZWFyKCkuZG9tYWluKFsgMCwgMSBdKSwgMTAsIHRydWUsIFsgMSwgMTAgXSk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3NjYWxlX2xvZyhsaW5lYXIsIGJhc2UsIHBvc2l0aXZlLCBkb21haW4pIHtcbiAgICBmdW5jdGlvbiBsb2coeCkge1xuICAgICAgcmV0dXJuIChwb3NpdGl2ZSA/IE1hdGgubG9nKHggPCAwID8gMCA6IHgpIDogLU1hdGgubG9nKHggPiAwID8gMCA6IC14KSkgLyBNYXRoLmxvZyhiYXNlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcG93KHgpIHtcbiAgICAgIHJldHVybiBwb3NpdGl2ZSA/IE1hdGgucG93KGJhc2UsIHgpIDogLU1hdGgucG93KGJhc2UsIC14KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2NhbGUoeCkge1xuICAgICAgcmV0dXJuIGxpbmVhcihsb2coeCkpO1xuICAgIH1cbiAgICBzY2FsZS5pbnZlcnQgPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gcG93KGxpbmVhci5pbnZlcnQoeCkpO1xuICAgIH07XG4gICAgc2NhbGUuZG9tYWluID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZG9tYWluO1xuICAgICAgcG9zaXRpdmUgPSB4WzBdID49IDA7XG4gICAgICBsaW5lYXIuZG9tYWluKChkb21haW4gPSB4Lm1hcChOdW1iZXIpKS5tYXAobG9nKSk7XG4gICAgICByZXR1cm4gc2NhbGU7XG4gICAgfTtcbiAgICBzY2FsZS5iYXNlID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gYmFzZTtcbiAgICAgIGJhc2UgPSArXztcbiAgICAgIGxpbmVhci5kb21haW4oZG9tYWluLm1hcChsb2cpKTtcbiAgICAgIHJldHVybiBzY2FsZTtcbiAgICB9O1xuICAgIHNjYWxlLm5pY2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBuaWNlZCA9IGQzX3NjYWxlX25pY2UoZG9tYWluLm1hcChsb2cpLCBwb3NpdGl2ZSA/IE1hdGggOiBkM19zY2FsZV9sb2dOaWNlTmVnYXRpdmUpO1xuICAgICAgbGluZWFyLmRvbWFpbihuaWNlZCk7XG4gICAgICBkb21haW4gPSBuaWNlZC5tYXAocG93KTtcbiAgICAgIHJldHVybiBzY2FsZTtcbiAgICB9O1xuICAgIHNjYWxlLnRpY2tzID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZXh0ZW50ID0gZDNfc2NhbGVFeHRlbnQoZG9tYWluKSwgdGlja3MgPSBbXTtcbiAgICAgIGlmIChleHRlbnQuZXZlcnkoaXNGaW5pdGUpKSB7XG4gICAgICAgIHZhciB1ID0gZXh0ZW50WzBdLCB2ID0gZXh0ZW50WzFdLCBpID0gTWF0aC5mbG9vcihsb2codSkpLCBqID0gTWF0aC5jZWlsKGxvZyh2KSksIG4gPSBiYXNlICUgMSA/IDIgOiBiYXNlO1xuICAgICAgICBpZiAocG9zaXRpdmUpIHtcbiAgICAgICAgICBmb3IgKDtpIDwgajsgaSsrKSBmb3IgKHZhciBrID0gMTsgayA8IG47IGsrKykgdGlja3MucHVzaChwb3coaSkgKiBrKTtcbiAgICAgICAgICB0aWNrcy5wdXNoKHBvdyhpKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGlja3MucHVzaChwb3coaSkpO1xuICAgICAgICAgIGZvciAoO2krKyA8IGo7ICkgZm9yICh2YXIgayA9IG4gLSAxOyBrID4gMDsgay0tKSB0aWNrcy5wdXNoKHBvdyhpKSAqIGspO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IHRpY2tzW2ldIDwgdTsgaSsrKSB7fVxuICAgICAgICBmb3IgKGogPSB0aWNrcy5sZW5ndGg7IHRpY2tzW2ogLSAxXSA+IHY7IGotLSkge31cbiAgICAgICAgdGlja3MgPSB0aWNrcy5zbGljZShpLCBqKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aWNrcztcbiAgICB9O1xuICAgIHNjYWxlLnRpY2tGb3JtYXQgPSBmdW5jdGlvbihuLCBmb3JtYXQpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGQzX3NjYWxlX2xvZ0Zvcm1hdDtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgZm9ybWF0ID0gZDNfc2NhbGVfbG9nRm9ybWF0OyBlbHNlIGlmICh0eXBlb2YgZm9ybWF0ICE9PSBcImZ1bmN0aW9uXCIpIGZvcm1hdCA9IGQzLmZvcm1hdChmb3JtYXQpO1xuICAgICAgdmFyIGsgPSBNYXRoLm1heCguMSwgbiAvIHNjYWxlLnRpY2tzKCkubGVuZ3RoKSwgZiA9IHBvc2l0aXZlID8gKGUgPSAxZS0xMiwgTWF0aC5jZWlsKSA6IChlID0gLTFlLTEyLCBcbiAgICAgIE1hdGguZmxvb3IpLCBlO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGQgLyBwb3coZihsb2coZCkgKyBlKSkgPD0gayA/IGZvcm1hdChkKSA6IFwiXCI7XG4gICAgICB9O1xuICAgIH07XG4gICAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGQzX3NjYWxlX2xvZyhsaW5lYXIuY29weSgpLCBiYXNlLCBwb3NpdGl2ZSwgZG9tYWluKTtcbiAgICB9O1xuICAgIHJldHVybiBkM19zY2FsZV9saW5lYXJSZWJpbmQoc2NhbGUsIGxpbmVhcik7XG4gIH1cbiAgdmFyIGQzX3NjYWxlX2xvZ0Zvcm1hdCA9IGQzLmZvcm1hdChcIi4wZVwiKSwgZDNfc2NhbGVfbG9nTmljZU5lZ2F0aXZlID0ge1xuICAgIGZsb29yOiBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gLU1hdGguY2VpbCgteCk7XG4gICAgfSxcbiAgICBjZWlsOiBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gLU1hdGguZmxvb3IoLXgpO1xuICAgIH1cbiAgfTtcbiAgZDMuc2NhbGUucG93ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGQzX3NjYWxlX3BvdyhkMy5zY2FsZS5saW5lYXIoKSwgMSwgWyAwLCAxIF0pO1xuICB9O1xuICBmdW5jdGlvbiBkM19zY2FsZV9wb3cobGluZWFyLCBleHBvbmVudCwgZG9tYWluKSB7XG4gICAgdmFyIHBvd3AgPSBkM19zY2FsZV9wb3dQb3coZXhwb25lbnQpLCBwb3diID0gZDNfc2NhbGVfcG93UG93KDEgLyBleHBvbmVudCk7XG4gICAgZnVuY3Rpb24gc2NhbGUoeCkge1xuICAgICAgcmV0dXJuIGxpbmVhcihwb3dwKHgpKTtcbiAgICB9XG4gICAgc2NhbGUuaW52ZXJ0ID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHBvd2IobGluZWFyLmludmVydCh4KSk7XG4gICAgfTtcbiAgICBzY2FsZS5kb21haW4gPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkb21haW47XG4gICAgICBsaW5lYXIuZG9tYWluKChkb21haW4gPSB4Lm1hcChOdW1iZXIpKS5tYXAocG93cCkpO1xuICAgICAgcmV0dXJuIHNjYWxlO1xuICAgIH07XG4gICAgc2NhbGUudGlja3MgPSBmdW5jdGlvbihtKSB7XG4gICAgICByZXR1cm4gZDNfc2NhbGVfbGluZWFyVGlja3MoZG9tYWluLCBtKTtcbiAgICB9O1xuICAgIHNjYWxlLnRpY2tGb3JtYXQgPSBmdW5jdGlvbihtLCBmb3JtYXQpIHtcbiAgICAgIHJldHVybiBkM19zY2FsZV9saW5lYXJUaWNrRm9ybWF0KGRvbWFpbiwgbSwgZm9ybWF0KTtcbiAgICB9O1xuICAgIHNjYWxlLm5pY2UgPSBmdW5jdGlvbihtKSB7XG4gICAgICByZXR1cm4gc2NhbGUuZG9tYWluKGQzX3NjYWxlX2xpbmVhck5pY2UoZG9tYWluLCBtKSk7XG4gICAgfTtcbiAgICBzY2FsZS5leHBvbmVudCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGV4cG9uZW50O1xuICAgICAgcG93cCA9IGQzX3NjYWxlX3Bvd1BvdyhleHBvbmVudCA9IHgpO1xuICAgICAgcG93YiA9IGQzX3NjYWxlX3Bvd1BvdygxIC8gZXhwb25lbnQpO1xuICAgICAgbGluZWFyLmRvbWFpbihkb21haW4ubWFwKHBvd3ApKTtcbiAgICAgIHJldHVybiBzY2FsZTtcbiAgICB9O1xuICAgIHNjYWxlLmNvcHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkM19zY2FsZV9wb3cobGluZWFyLmNvcHkoKSwgZXhwb25lbnQsIGRvbWFpbik7XG4gICAgfTtcbiAgICByZXR1cm4gZDNfc2NhbGVfbGluZWFyUmViaW5kKHNjYWxlLCBsaW5lYXIpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3NjYWxlX3Bvd1BvdyhlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB4IDwgMCA/IC1NYXRoLnBvdygteCwgZSkgOiBNYXRoLnBvdyh4LCBlKTtcbiAgICB9O1xuICB9XG4gIGQzLnNjYWxlLnNxcnQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDMuc2NhbGUucG93KCkuZXhwb25lbnQoLjUpO1xuICB9O1xuICBkMy5zY2FsZS5vcmRpbmFsID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGQzX3NjYWxlX29yZGluYWwoW10sIHtcbiAgICAgIHQ6IFwicmFuZ2VcIixcbiAgICAgIGE6IFsgW10gXVxuICAgIH0pO1xuICB9O1xuICBmdW5jdGlvbiBkM19zY2FsZV9vcmRpbmFsKGRvbWFpbiwgcmFuZ2VyKSB7XG4gICAgdmFyIGluZGV4LCByYW5nZSwgcmFuZ2VCYW5kO1xuICAgIGZ1bmN0aW9uIHNjYWxlKHgpIHtcbiAgICAgIHJldHVybiByYW5nZVsoKGluZGV4LmdldCh4KSB8fCBpbmRleC5zZXQoeCwgZG9tYWluLnB1c2goeCkpKSAtIDEpICUgcmFuZ2UubGVuZ3RoXTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3RlcHMoc3RhcnQsIHN0ZXApIHtcbiAgICAgIHJldHVybiBkMy5yYW5nZShkb21haW4ubGVuZ3RoKS5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgICByZXR1cm4gc3RhcnQgKyBzdGVwICogaTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBzY2FsZS5kb21haW4gPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkb21haW47XG4gICAgICBkb21haW4gPSBbXTtcbiAgICAgIGluZGV4ID0gbmV3IGQzX01hcCgpO1xuICAgICAgdmFyIGkgPSAtMSwgbiA9IHgubGVuZ3RoLCB4aTtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoIWluZGV4Lmhhcyh4aSA9IHhbaV0pKSBpbmRleC5zZXQoeGksIGRvbWFpbi5wdXNoKHhpKSk7XG4gICAgICByZXR1cm4gc2NhbGVbcmFuZ2VyLnRdLmFwcGx5KHNjYWxlLCByYW5nZXIuYSk7XG4gICAgfTtcbiAgICBzY2FsZS5yYW5nZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHJhbmdlO1xuICAgICAgcmFuZ2UgPSB4O1xuICAgICAgcmFuZ2VCYW5kID0gMDtcbiAgICAgIHJhbmdlciA9IHtcbiAgICAgICAgdDogXCJyYW5nZVwiLFxuICAgICAgICBhOiBhcmd1bWVudHNcbiAgICAgIH07XG4gICAgICByZXR1cm4gc2NhbGU7XG4gICAgfTtcbiAgICBzY2FsZS5yYW5nZVBvaW50cyA9IGZ1bmN0aW9uKHgsIHBhZGRpbmcpIHtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgcGFkZGluZyA9IDA7XG4gICAgICB2YXIgc3RhcnQgPSB4WzBdLCBzdG9wID0geFsxXSwgc3RlcCA9IChzdG9wIC0gc3RhcnQpIC8gKE1hdGgubWF4KDEsIGRvbWFpbi5sZW5ndGggLSAxKSArIHBhZGRpbmcpO1xuICAgICAgcmFuZ2UgPSBzdGVwcyhkb21haW4ubGVuZ3RoIDwgMiA/IChzdGFydCArIHN0b3ApIC8gMiA6IHN0YXJ0ICsgc3RlcCAqIHBhZGRpbmcgLyAyLCBzdGVwKTtcbiAgICAgIHJhbmdlQmFuZCA9IDA7XG4gICAgICByYW5nZXIgPSB7XG4gICAgICAgIHQ6IFwicmFuZ2VQb2ludHNcIixcbiAgICAgICAgYTogYXJndW1lbnRzXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHNjYWxlO1xuICAgIH07XG4gICAgc2NhbGUucmFuZ2VCYW5kcyA9IGZ1bmN0aW9uKHgsIHBhZGRpbmcsIG91dGVyUGFkZGluZykge1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSBwYWRkaW5nID0gMDtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykgb3V0ZXJQYWRkaW5nID0gcGFkZGluZztcbiAgICAgIHZhciByZXZlcnNlID0geFsxXSA8IHhbMF0sIHN0YXJ0ID0geFtyZXZlcnNlIC0gMF0sIHN0b3AgPSB4WzEgLSByZXZlcnNlXSwgc3RlcCA9IChzdG9wIC0gc3RhcnQpIC8gKGRvbWFpbi5sZW5ndGggLSBwYWRkaW5nICsgMiAqIG91dGVyUGFkZGluZyk7XG4gICAgICByYW5nZSA9IHN0ZXBzKHN0YXJ0ICsgc3RlcCAqIG91dGVyUGFkZGluZywgc3RlcCk7XG4gICAgICBpZiAocmV2ZXJzZSkgcmFuZ2UucmV2ZXJzZSgpO1xuICAgICAgcmFuZ2VCYW5kID0gc3RlcCAqICgxIC0gcGFkZGluZyk7XG4gICAgICByYW5nZXIgPSB7XG4gICAgICAgIHQ6IFwicmFuZ2VCYW5kc1wiLFxuICAgICAgICBhOiBhcmd1bWVudHNcbiAgICAgIH07XG4gICAgICByZXR1cm4gc2NhbGU7XG4gICAgfTtcbiAgICBzY2FsZS5yYW5nZVJvdW5kQmFuZHMgPSBmdW5jdGlvbih4LCBwYWRkaW5nLCBvdXRlclBhZGRpbmcpIHtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgcGFkZGluZyA9IDA7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIG91dGVyUGFkZGluZyA9IHBhZGRpbmc7XG4gICAgICB2YXIgcmV2ZXJzZSA9IHhbMV0gPCB4WzBdLCBzdGFydCA9IHhbcmV2ZXJzZSAtIDBdLCBzdG9wID0geFsxIC0gcmV2ZXJzZV0sIHN0ZXAgPSBNYXRoLmZsb29yKChzdG9wIC0gc3RhcnQpIC8gKGRvbWFpbi5sZW5ndGggLSBwYWRkaW5nICsgMiAqIG91dGVyUGFkZGluZykpLCBlcnJvciA9IHN0b3AgLSBzdGFydCAtIChkb21haW4ubGVuZ3RoIC0gcGFkZGluZykgKiBzdGVwO1xuICAgICAgcmFuZ2UgPSBzdGVwcyhzdGFydCArIE1hdGgucm91bmQoZXJyb3IgLyAyKSwgc3RlcCk7XG4gICAgICBpZiAocmV2ZXJzZSkgcmFuZ2UucmV2ZXJzZSgpO1xuICAgICAgcmFuZ2VCYW5kID0gTWF0aC5yb3VuZChzdGVwICogKDEgLSBwYWRkaW5nKSk7XG4gICAgICByYW5nZXIgPSB7XG4gICAgICAgIHQ6IFwicmFuZ2VSb3VuZEJhbmRzXCIsXG4gICAgICAgIGE6IGFyZ3VtZW50c1xuICAgICAgfTtcbiAgICAgIHJldHVybiBzY2FsZTtcbiAgICB9O1xuICAgIHNjYWxlLnJhbmdlQmFuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHJhbmdlQmFuZDtcbiAgICB9O1xuICAgIHNjYWxlLnJhbmdlRXh0ZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZDNfc2NhbGVFeHRlbnQocmFuZ2VyLmFbMF0pO1xuICAgIH07XG4gICAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGQzX3NjYWxlX29yZGluYWwoZG9tYWluLCByYW5nZXIpO1xuICAgIH07XG4gICAgcmV0dXJuIHNjYWxlLmRvbWFpbihkb21haW4pO1xuICB9XG4gIGQzLnNjYWxlLmNhdGVnb3J5MTAgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDMuc2NhbGUub3JkaW5hbCgpLnJhbmdlKGQzX2NhdGVnb3J5MTApO1xuICB9O1xuICBkMy5zY2FsZS5jYXRlZ29yeTIwID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGQzLnNjYWxlLm9yZGluYWwoKS5yYW5nZShkM19jYXRlZ29yeTIwKTtcbiAgfTtcbiAgZDMuc2NhbGUuY2F0ZWdvcnkyMGIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDMuc2NhbGUub3JkaW5hbCgpLnJhbmdlKGQzX2NhdGVnb3J5MjBiKTtcbiAgfTtcbiAgZDMuc2NhbGUuY2F0ZWdvcnkyMGMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDMuc2NhbGUub3JkaW5hbCgpLnJhbmdlKGQzX2NhdGVnb3J5MjBjKTtcbiAgfTtcbiAgdmFyIGQzX2NhdGVnb3J5MTAgPSBbIDIwNjIyNjAsIDE2NzQ0MjA2LCAyOTI0NTg4LCAxNDAzNDcyOCwgOTcyNTg4NSwgOTE5NzEzMSwgMTQ5MDczMzAsIDgzNTU3MTEsIDEyMzY5MTg2LCAxNTU2MTc1IF0ubWFwKGQzX3JnYlN0cmluZyk7XG4gIHZhciBkM19jYXRlZ29yeTIwID0gWyAyMDYyMjYwLCAxMTQ1NDQ0MCwgMTY3NDQyMDYsIDE2NzU5NjcyLCAyOTI0NTg4LCAxMDAxODY5OCwgMTQwMzQ3MjgsIDE2NzUwNzQyLCA5NzI1ODg1LCAxMjk1NTg2MSwgOTE5NzEzMSwgMTI4ODUxNDAsIDE0OTA3MzMwLCAxNjIzNDE5NCwgODM1NTcxMSwgMTMwOTI4MDcsIDEyMzY5MTg2LCAxNDQwODU4OSwgMTU1NjE3NSwgMTA0MTA3MjUgXS5tYXAoZDNfcmdiU3RyaW5nKTtcbiAgdmFyIGQzX2NhdGVnb3J5MjBiID0gWyAzNzUwNzc3LCA1Mzk1NjE5LCA3MDQwNzE5LCAxMDI2NDI4NiwgNjUxOTA5NywgOTIxNjU5NCwgMTE5MTUxMTUsIDEzNTU2NjM2LCA5MjAyOTkzLCAxMjQyNjgwOSwgMTUxODY1MTQsIDE1MTkwOTMyLCA4NjY2MTY5LCAxMTM1NjQ5MCwgMTQwNDk2NDMsIDE1MTc3MzcyLCA4MDc3NjgzLCAxMDgzNDMyNCwgMTM1Mjg1MDksIDE0NTg5NjU0IF0ubWFwKGQzX3JnYlN0cmluZyk7XG4gIHZhciBkM19jYXRlZ29yeTIwYyA9IFsgMzI0NDczMywgNzA1NzExMCwgMTA0MDY2MjUsIDEzMDMyNDMxLCAxNTA5NTA1MywgMTY2MTY3NjQsIDE2NjI1MjU5LCAxNjYzNDAxOCwgMzI1MzA3NiwgNzY1MjQ3MCwgMTA2MDcwMDMsIDEzMTAxNTA0LCA3Njk1MjgxLCAxMDM5NDMxMiwgMTIzNjkzNzIsIDE0MzQyODkxLCA2NTEzNTA3LCA5ODY4OTUwLCAxMjQzNDg3NywgMTQyNzcwODEgXS5tYXAoZDNfcmdiU3RyaW5nKTtcbiAgZDMuc2NhbGUucXVhbnRpbGUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfc2NhbGVfcXVhbnRpbGUoW10sIFtdKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfc2NhbGVfcXVhbnRpbGUoZG9tYWluLCByYW5nZSkge1xuICAgIHZhciB0aHJlc2hvbGRzO1xuICAgIGZ1bmN0aW9uIHJlc2NhbGUoKSB7XG4gICAgICB2YXIgayA9IDAsIHEgPSByYW5nZS5sZW5ndGg7XG4gICAgICB0aHJlc2hvbGRzID0gW107XG4gICAgICB3aGlsZSAoKytrIDwgcSkgdGhyZXNob2xkc1trIC0gMV0gPSBkMy5xdWFudGlsZShkb21haW4sIGsgLyBxKTtcbiAgICAgIHJldHVybiBzY2FsZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2NhbGUoeCkge1xuICAgICAgaWYgKCFpc05hTih4ID0gK3gpKSByZXR1cm4gcmFuZ2VbZDMuYmlzZWN0KHRocmVzaG9sZHMsIHgpXTtcbiAgICB9XG4gICAgc2NhbGUuZG9tYWluID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZG9tYWluO1xuICAgICAgZG9tYWluID0geC5maWx0ZXIoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gIWlzTmFOKGQpO1xuICAgICAgfSkuc29ydChkMy5hc2NlbmRpbmcpO1xuICAgICAgcmV0dXJuIHJlc2NhbGUoKTtcbiAgICB9O1xuICAgIHNjYWxlLnJhbmdlID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gcmFuZ2U7XG4gICAgICByYW5nZSA9IHg7XG4gICAgICByZXR1cm4gcmVzY2FsZSgpO1xuICAgIH07XG4gICAgc2NhbGUucXVhbnRpbGVzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhyZXNob2xkcztcbiAgICB9O1xuICAgIHNjYWxlLmludmVydEV4dGVudCA9IGZ1bmN0aW9uKHkpIHtcbiAgICAgIHkgPSByYW5nZS5pbmRleE9mKHkpO1xuICAgICAgcmV0dXJuIHkgPCAwID8gWyBOYU4sIE5hTiBdIDogWyB5ID4gMCA/IHRocmVzaG9sZHNbeSAtIDFdIDogZG9tYWluWzBdLCB5IDwgdGhyZXNob2xkcy5sZW5ndGggPyB0aHJlc2hvbGRzW3ldIDogZG9tYWluW2RvbWFpbi5sZW5ndGggLSAxXSBdO1xuICAgIH07XG4gICAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGQzX3NjYWxlX3F1YW50aWxlKGRvbWFpbiwgcmFuZ2UpO1xuICAgIH07XG4gICAgcmV0dXJuIHJlc2NhbGUoKTtcbiAgfVxuICBkMy5zY2FsZS5xdWFudGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkM19zY2FsZV9xdWFudGl6ZSgwLCAxLCBbIDAsIDEgXSk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3NjYWxlX3F1YW50aXplKHgwLCB4MSwgcmFuZ2UpIHtcbiAgICB2YXIga3gsIGk7XG4gICAgZnVuY3Rpb24gc2NhbGUoeCkge1xuICAgICAgcmV0dXJuIHJhbmdlW01hdGgubWF4KDAsIE1hdGgubWluKGksIE1hdGguZmxvb3Ioa3ggKiAoeCAtIHgwKSkpKV07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlc2NhbGUoKSB7XG4gICAgICBreCA9IHJhbmdlLmxlbmd0aCAvICh4MSAtIHgwKTtcbiAgICAgIGkgPSByYW5nZS5sZW5ndGggLSAxO1xuICAgICAgcmV0dXJuIHNjYWxlO1xuICAgIH1cbiAgICBzY2FsZS5kb21haW4gPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBbIHgwLCB4MSBdO1xuICAgICAgeDAgPSAreFswXTtcbiAgICAgIHgxID0gK3hbeC5sZW5ndGggLSAxXTtcbiAgICAgIHJldHVybiByZXNjYWxlKCk7XG4gICAgfTtcbiAgICBzY2FsZS5yYW5nZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHJhbmdlO1xuICAgICAgcmFuZ2UgPSB4O1xuICAgICAgcmV0dXJuIHJlc2NhbGUoKTtcbiAgICB9O1xuICAgIHNjYWxlLmludmVydEV4dGVudCA9IGZ1bmN0aW9uKHkpIHtcbiAgICAgIHkgPSByYW5nZS5pbmRleE9mKHkpO1xuICAgICAgeSA9IHkgPCAwID8gTmFOIDogeSAvIGt4ICsgeDA7XG4gICAgICByZXR1cm4gWyB5LCB5ICsgMSAvIGt4IF07XG4gICAgfTtcbiAgICBzY2FsZS5jb3B5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZDNfc2NhbGVfcXVhbnRpemUoeDAsIHgxLCByYW5nZSk7XG4gICAgfTtcbiAgICByZXR1cm4gcmVzY2FsZSgpO1xuICB9XG4gIGQzLnNjYWxlLnRocmVzaG9sZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkM19zY2FsZV90aHJlc2hvbGQoWyAuNSBdLCBbIDAsIDEgXSk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3NjYWxlX3RocmVzaG9sZChkb21haW4sIHJhbmdlKSB7XG4gICAgZnVuY3Rpb24gc2NhbGUoeCkge1xuICAgICAgaWYgKHggPD0geCkgcmV0dXJuIHJhbmdlW2QzLmJpc2VjdChkb21haW4sIHgpXTtcbiAgICB9XG4gICAgc2NhbGUuZG9tYWluID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZG9tYWluO1xuICAgICAgZG9tYWluID0gXztcbiAgICAgIHJldHVybiBzY2FsZTtcbiAgICB9O1xuICAgIHNjYWxlLnJhbmdlID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gcmFuZ2U7XG4gICAgICByYW5nZSA9IF87XG4gICAgICByZXR1cm4gc2NhbGU7XG4gICAgfTtcbiAgICBzY2FsZS5pbnZlcnRFeHRlbnQgPSBmdW5jdGlvbih5KSB7XG4gICAgICB5ID0gcmFuZ2UuaW5kZXhPZih5KTtcbiAgICAgIHJldHVybiBbIGRvbWFpblt5IC0gMV0sIGRvbWFpblt5XSBdO1xuICAgIH07XG4gICAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGQzX3NjYWxlX3RocmVzaG9sZChkb21haW4sIHJhbmdlKTtcbiAgICB9O1xuICAgIHJldHVybiBzY2FsZTtcbiAgfVxuICBkMy5zY2FsZS5pZGVudGl0eSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkM19zY2FsZV9pZGVudGl0eShbIDAsIDEgXSk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3NjYWxlX2lkZW50aXR5KGRvbWFpbikge1xuICAgIGZ1bmN0aW9uIGlkZW50aXR5KHgpIHtcbiAgICAgIHJldHVybiAreDtcbiAgICB9XG4gICAgaWRlbnRpdHkuaW52ZXJ0ID0gaWRlbnRpdHk7XG4gICAgaWRlbnRpdHkuZG9tYWluID0gaWRlbnRpdHkucmFuZ2UgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkb21haW47XG4gICAgICBkb21haW4gPSB4Lm1hcChpZGVudGl0eSk7XG4gICAgICByZXR1cm4gaWRlbnRpdHk7XG4gICAgfTtcbiAgICBpZGVudGl0eS50aWNrcyA9IGZ1bmN0aW9uKG0pIHtcbiAgICAgIHJldHVybiBkM19zY2FsZV9saW5lYXJUaWNrcyhkb21haW4sIG0pO1xuICAgIH07XG4gICAgaWRlbnRpdHkudGlja0Zvcm1hdCA9IGZ1bmN0aW9uKG0sIGZvcm1hdCkge1xuICAgICAgcmV0dXJuIGQzX3NjYWxlX2xpbmVhclRpY2tGb3JtYXQoZG9tYWluLCBtLCBmb3JtYXQpO1xuICAgIH07XG4gICAgaWRlbnRpdHkuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGQzX3NjYWxlX2lkZW50aXR5KGRvbWFpbik7XG4gICAgfTtcbiAgICByZXR1cm4gaWRlbnRpdHk7XG4gIH1cbiAgZDMuc3ZnLmFyYyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpbm5lclJhZGl1cyA9IGQzX3N2Z19hcmNJbm5lclJhZGl1cywgb3V0ZXJSYWRpdXMgPSBkM19zdmdfYXJjT3V0ZXJSYWRpdXMsIHN0YXJ0QW5nbGUgPSBkM19zdmdfYXJjU3RhcnRBbmdsZSwgZW5kQW5nbGUgPSBkM19zdmdfYXJjRW5kQW5nbGU7XG4gICAgZnVuY3Rpb24gYXJjKCkge1xuICAgICAgdmFyIHIwID0gaW5uZXJSYWRpdXMuYXBwbHkodGhpcywgYXJndW1lbnRzKSwgcjEgPSBvdXRlclJhZGl1cy5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCBhMCA9IHN0YXJ0QW5nbGUuYXBwbHkodGhpcywgYXJndW1lbnRzKSArIGQzX3N2Z19hcmNPZmZzZXQsIGExID0gZW5kQW5nbGUuYXBwbHkodGhpcywgYXJndW1lbnRzKSArIGQzX3N2Z19hcmNPZmZzZXQsIGRhID0gKGExIDwgYTAgJiYgKGRhID0gYTAsIFxuICAgICAgYTAgPSBhMSwgYTEgPSBkYSksIGExIC0gYTApLCBkZiA9IGRhIDwgz4AgPyBcIjBcIiA6IFwiMVwiLCBjMCA9IE1hdGguY29zKGEwKSwgczAgPSBNYXRoLnNpbihhMCksIGMxID0gTWF0aC5jb3MoYTEpLCBzMSA9IE1hdGguc2luKGExKTtcbiAgICAgIHJldHVybiBkYSA+PSBkM19zdmdfYXJjTWF4ID8gcjAgPyBcIk0wLFwiICsgcjEgKyBcIkFcIiArIHIxICsgXCIsXCIgKyByMSArIFwiIDAgMSwxIDAsXCIgKyAtcjEgKyBcIkFcIiArIHIxICsgXCIsXCIgKyByMSArIFwiIDAgMSwxIDAsXCIgKyByMSArIFwiTTAsXCIgKyByMCArIFwiQVwiICsgcjAgKyBcIixcIiArIHIwICsgXCIgMCAxLDAgMCxcIiArIC1yMCArIFwiQVwiICsgcjAgKyBcIixcIiArIHIwICsgXCIgMCAxLDAgMCxcIiArIHIwICsgXCJaXCIgOiBcIk0wLFwiICsgcjEgKyBcIkFcIiArIHIxICsgXCIsXCIgKyByMSArIFwiIDAgMSwxIDAsXCIgKyAtcjEgKyBcIkFcIiArIHIxICsgXCIsXCIgKyByMSArIFwiIDAgMSwxIDAsXCIgKyByMSArIFwiWlwiIDogcjAgPyBcIk1cIiArIHIxICogYzAgKyBcIixcIiArIHIxICogczAgKyBcIkFcIiArIHIxICsgXCIsXCIgKyByMSArIFwiIDAgXCIgKyBkZiArIFwiLDEgXCIgKyByMSAqIGMxICsgXCIsXCIgKyByMSAqIHMxICsgXCJMXCIgKyByMCAqIGMxICsgXCIsXCIgKyByMCAqIHMxICsgXCJBXCIgKyByMCArIFwiLFwiICsgcjAgKyBcIiAwIFwiICsgZGYgKyBcIiwwIFwiICsgcjAgKiBjMCArIFwiLFwiICsgcjAgKiBzMCArIFwiWlwiIDogXCJNXCIgKyByMSAqIGMwICsgXCIsXCIgKyByMSAqIHMwICsgXCJBXCIgKyByMSArIFwiLFwiICsgcjEgKyBcIiAwIFwiICsgZGYgKyBcIiwxIFwiICsgcjEgKiBjMSArIFwiLFwiICsgcjEgKiBzMSArIFwiTDAsMFwiICsgXCJaXCI7XG4gICAgfVxuICAgIGFyYy5pbm5lclJhZGl1cyA9IGZ1bmN0aW9uKHYpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGlubmVyUmFkaXVzO1xuICAgICAgaW5uZXJSYWRpdXMgPSBkM19mdW5jdG9yKHYpO1xuICAgICAgcmV0dXJuIGFyYztcbiAgICB9O1xuICAgIGFyYy5vdXRlclJhZGl1cyA9IGZ1bmN0aW9uKHYpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG91dGVyUmFkaXVzO1xuICAgICAgb3V0ZXJSYWRpdXMgPSBkM19mdW5jdG9yKHYpO1xuICAgICAgcmV0dXJuIGFyYztcbiAgICB9O1xuICAgIGFyYy5zdGFydEFuZ2xlID0gZnVuY3Rpb24odikge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc3RhcnRBbmdsZTtcbiAgICAgIHN0YXJ0QW5nbGUgPSBkM19mdW5jdG9yKHYpO1xuICAgICAgcmV0dXJuIGFyYztcbiAgICB9O1xuICAgIGFyYy5lbmRBbmdsZSA9IGZ1bmN0aW9uKHYpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGVuZEFuZ2xlO1xuICAgICAgZW5kQW5nbGUgPSBkM19mdW5jdG9yKHYpO1xuICAgICAgcmV0dXJuIGFyYztcbiAgICB9O1xuICAgIGFyYy5jZW50cm9pZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHIgPSAoaW5uZXJSYWRpdXMuYXBwbHkodGhpcywgYXJndW1lbnRzKSArIG91dGVyUmFkaXVzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpIC8gMiwgYSA9IChzdGFydEFuZ2xlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgKyBlbmRBbmdsZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKSAvIDIgKyBkM19zdmdfYXJjT2Zmc2V0O1xuICAgICAgcmV0dXJuIFsgTWF0aC5jb3MoYSkgKiByLCBNYXRoLnNpbihhKSAqIHIgXTtcbiAgICB9O1xuICAgIHJldHVybiBhcmM7XG4gIH07XG4gIHZhciBkM19zdmdfYXJjT2Zmc2V0ID0gLc+AIC8gMiwgZDNfc3ZnX2FyY01heCA9IDIgKiDPgCAtIDFlLTY7XG4gIGZ1bmN0aW9uIGQzX3N2Z19hcmNJbm5lclJhZGl1cyhkKSB7XG4gICAgcmV0dXJuIGQuaW5uZXJSYWRpdXM7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2FyY091dGVyUmFkaXVzKGQpIHtcbiAgICByZXR1cm4gZC5vdXRlclJhZGl1cztcbiAgfVxuICBmdW5jdGlvbiBkM19zdmdfYXJjU3RhcnRBbmdsZShkKSB7XG4gICAgcmV0dXJuIGQuc3RhcnRBbmdsZTtcbiAgfVxuICBmdW5jdGlvbiBkM19zdmdfYXJjRW5kQW5nbGUoZCkge1xuICAgIHJldHVybiBkLmVuZEFuZ2xlO1xuICB9XG4gIGQzLnN2Zy5saW5lLnJhZGlhbCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBsaW5lID0gZDNfc3ZnX2xpbmUoZDNfc3ZnX2xpbmVSYWRpYWwpO1xuICAgIGxpbmUucmFkaXVzID0gbGluZS54LCBkZWxldGUgbGluZS54O1xuICAgIGxpbmUuYW5nbGUgPSBsaW5lLnksIGRlbGV0ZSBsaW5lLnk7XG4gICAgcmV0dXJuIGxpbmU7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3N2Z19saW5lUmFkaWFsKHBvaW50cykge1xuICAgIHZhciBwb2ludCwgaSA9IC0xLCBuID0gcG9pbnRzLmxlbmd0aCwgciwgYTtcbiAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgcG9pbnQgPSBwb2ludHNbaV07XG4gICAgICByID0gcG9pbnRbMF07XG4gICAgICBhID0gcG9pbnRbMV0gKyBkM19zdmdfYXJjT2Zmc2V0O1xuICAgICAgcG9pbnRbMF0gPSByICogTWF0aC5jb3MoYSk7XG4gICAgICBwb2ludFsxXSA9IHIgKiBNYXRoLnNpbihhKTtcbiAgICB9XG4gICAgcmV0dXJuIHBvaW50cztcbiAgfVxuICBmdW5jdGlvbiBkM19zdmdfYXJlYShwcm9qZWN0aW9uKSB7XG4gICAgdmFyIHgwID0gZDNfc3ZnX2xpbmVYLCB4MSA9IGQzX3N2Z19saW5lWCwgeTAgPSAwLCB5MSA9IGQzX3N2Z19saW5lWSwgZGVmaW5lZCA9IGQzX3RydWUsIGludGVycG9sYXRlID0gZDNfc3ZnX2xpbmVMaW5lYXIsIGludGVycG9sYXRlS2V5ID0gaW50ZXJwb2xhdGUua2V5LCBpbnRlcnBvbGF0ZVJldmVyc2UgPSBpbnRlcnBvbGF0ZSwgTCA9IFwiTFwiLCB0ZW5zaW9uID0gLjc7XG4gICAgZnVuY3Rpb24gYXJlYShkYXRhKSB7XG4gICAgICB2YXIgc2VnbWVudHMgPSBbXSwgcG9pbnRzMCA9IFtdLCBwb2ludHMxID0gW10sIGkgPSAtMSwgbiA9IGRhdGEubGVuZ3RoLCBkLCBmeDAgPSBkM19mdW5jdG9yKHgwKSwgZnkwID0gZDNfZnVuY3Rvcih5MCksIGZ4MSA9IHgwID09PSB4MSA/IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4geDtcbiAgICAgIH0gOiBkM19mdW5jdG9yKHgxKSwgZnkxID0geTAgPT09IHkxID8gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB5O1xuICAgICAgfSA6IGQzX2Z1bmN0b3IoeTEpLCB4LCB5O1xuICAgICAgZnVuY3Rpb24gc2VnbWVudCgpIHtcbiAgICAgICAgc2VnbWVudHMucHVzaChcIk1cIiwgaW50ZXJwb2xhdGUocHJvamVjdGlvbihwb2ludHMxKSwgdGVuc2lvbiksIEwsIGludGVycG9sYXRlUmV2ZXJzZShwcm9qZWN0aW9uKHBvaW50czAucmV2ZXJzZSgpKSwgdGVuc2lvbiksIFwiWlwiKTtcbiAgICAgIH1cbiAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgIGlmIChkZWZpbmVkLmNhbGwodGhpcywgZCA9IGRhdGFbaV0sIGkpKSB7XG4gICAgICAgICAgcG9pbnRzMC5wdXNoKFsgeCA9ICtmeDAuY2FsbCh0aGlzLCBkLCBpKSwgeSA9ICtmeTAuY2FsbCh0aGlzLCBkLCBpKSBdKTtcbiAgICAgICAgICBwb2ludHMxLnB1c2goWyArZngxLmNhbGwodGhpcywgZCwgaSksICtmeTEuY2FsbCh0aGlzLCBkLCBpKSBdKTtcbiAgICAgICAgfSBlbHNlIGlmIChwb2ludHMwLmxlbmd0aCkge1xuICAgICAgICAgIHNlZ21lbnQoKTtcbiAgICAgICAgICBwb2ludHMwID0gW107XG4gICAgICAgICAgcG9pbnRzMSA9IFtdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocG9pbnRzMC5sZW5ndGgpIHNlZ21lbnQoKTtcbiAgICAgIHJldHVybiBzZWdtZW50cy5sZW5ndGggPyBzZWdtZW50cy5qb2luKFwiXCIpIDogbnVsbDtcbiAgICB9XG4gICAgYXJlYS54ID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4geDE7XG4gICAgICB4MCA9IHgxID0gXztcbiAgICAgIHJldHVybiBhcmVhO1xuICAgIH07XG4gICAgYXJlYS54MCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHgwO1xuICAgICAgeDAgPSBfO1xuICAgICAgcmV0dXJuIGFyZWE7XG4gICAgfTtcbiAgICBhcmVhLngxID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4geDE7XG4gICAgICB4MSA9IF87XG4gICAgICByZXR1cm4gYXJlYTtcbiAgICB9O1xuICAgIGFyZWEueSA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHkxO1xuICAgICAgeTAgPSB5MSA9IF87XG4gICAgICByZXR1cm4gYXJlYTtcbiAgICB9O1xuICAgIGFyZWEueTAgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB5MDtcbiAgICAgIHkwID0gXztcbiAgICAgIHJldHVybiBhcmVhO1xuICAgIH07XG4gICAgYXJlYS55MSA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHkxO1xuICAgICAgeTEgPSBfO1xuICAgICAgcmV0dXJuIGFyZWE7XG4gICAgfTtcbiAgICBhcmVhLmRlZmluZWQgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkZWZpbmVkO1xuICAgICAgZGVmaW5lZCA9IF87XG4gICAgICByZXR1cm4gYXJlYTtcbiAgICB9O1xuICAgIGFyZWEuaW50ZXJwb2xhdGUgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBpbnRlcnBvbGF0ZUtleTtcbiAgICAgIGlmICh0eXBlb2YgXyA9PT0gXCJmdW5jdGlvblwiKSBpbnRlcnBvbGF0ZUtleSA9IGludGVycG9sYXRlID0gXzsgZWxzZSBpbnRlcnBvbGF0ZUtleSA9IChpbnRlcnBvbGF0ZSA9IGQzX3N2Z19saW5lSW50ZXJwb2xhdG9ycy5nZXQoXykgfHwgZDNfc3ZnX2xpbmVMaW5lYXIpLmtleTtcbiAgICAgIGludGVycG9sYXRlUmV2ZXJzZSA9IGludGVycG9sYXRlLnJldmVyc2UgfHwgaW50ZXJwb2xhdGU7XG4gICAgICBMID0gaW50ZXJwb2xhdGUuY2xvc2VkID8gXCJNXCIgOiBcIkxcIjtcbiAgICAgIHJldHVybiBhcmVhO1xuICAgIH07XG4gICAgYXJlYS50ZW5zaW9uID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGVuc2lvbjtcbiAgICAgIHRlbnNpb24gPSBfO1xuICAgICAgcmV0dXJuIGFyZWE7XG4gICAgfTtcbiAgICByZXR1cm4gYXJlYTtcbiAgfVxuICBkM19zdmdfbGluZVN0ZXBCZWZvcmUucmV2ZXJzZSA9IGQzX3N2Z19saW5lU3RlcEFmdGVyO1xuICBkM19zdmdfbGluZVN0ZXBBZnRlci5yZXZlcnNlID0gZDNfc3ZnX2xpbmVTdGVwQmVmb3JlO1xuICBkMy5zdmcuYXJlYSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkM19zdmdfYXJlYShkM19pZGVudGl0eSk7XG4gIH07XG4gIGQzLnN2Zy5hcmVhLnJhZGlhbCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmVhID0gZDNfc3ZnX2FyZWEoZDNfc3ZnX2xpbmVSYWRpYWwpO1xuICAgIGFyZWEucmFkaXVzID0gYXJlYS54LCBkZWxldGUgYXJlYS54O1xuICAgIGFyZWEuaW5uZXJSYWRpdXMgPSBhcmVhLngwLCBkZWxldGUgYXJlYS54MDtcbiAgICBhcmVhLm91dGVyUmFkaXVzID0gYXJlYS54MSwgZGVsZXRlIGFyZWEueDE7XG4gICAgYXJlYS5hbmdsZSA9IGFyZWEueSwgZGVsZXRlIGFyZWEueTtcbiAgICBhcmVhLnN0YXJ0QW5nbGUgPSBhcmVhLnkwLCBkZWxldGUgYXJlYS55MDtcbiAgICBhcmVhLmVuZEFuZ2xlID0gYXJlYS55MSwgZGVsZXRlIGFyZWEueTE7XG4gICAgcmV0dXJuIGFyZWE7XG4gIH07XG4gIGQzLnN2Zy5jaG9yZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzb3VyY2UgPSBkM19zb3VyY2UsIHRhcmdldCA9IGQzX3RhcmdldCwgcmFkaXVzID0gZDNfc3ZnX2Nob3JkUmFkaXVzLCBzdGFydEFuZ2xlID0gZDNfc3ZnX2FyY1N0YXJ0QW5nbGUsIGVuZEFuZ2xlID0gZDNfc3ZnX2FyY0VuZEFuZ2xlO1xuICAgIGZ1bmN0aW9uIGNob3JkKGQsIGkpIHtcbiAgICAgIHZhciBzID0gc3ViZ3JvdXAodGhpcywgc291cmNlLCBkLCBpKSwgdCA9IHN1Ymdyb3VwKHRoaXMsIHRhcmdldCwgZCwgaSk7XG4gICAgICByZXR1cm4gXCJNXCIgKyBzLnAwICsgYXJjKHMuciwgcy5wMSwgcy5hMSAtIHMuYTApICsgKGVxdWFscyhzLCB0KSA/IGN1cnZlKHMuciwgcy5wMSwgcy5yLCBzLnAwKSA6IGN1cnZlKHMuciwgcy5wMSwgdC5yLCB0LnAwKSArIGFyYyh0LnIsIHQucDEsIHQuYTEgLSB0LmEwKSArIGN1cnZlKHQuciwgdC5wMSwgcy5yLCBzLnAwKSkgKyBcIlpcIjtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3ViZ3JvdXAoc2VsZiwgZiwgZCwgaSkge1xuICAgICAgdmFyIHN1Ymdyb3VwID0gZi5jYWxsKHNlbGYsIGQsIGkpLCByID0gcmFkaXVzLmNhbGwoc2VsZiwgc3ViZ3JvdXAsIGkpLCBhMCA9IHN0YXJ0QW5nbGUuY2FsbChzZWxmLCBzdWJncm91cCwgaSkgKyBkM19zdmdfYXJjT2Zmc2V0LCBhMSA9IGVuZEFuZ2xlLmNhbGwoc2VsZiwgc3ViZ3JvdXAsIGkpICsgZDNfc3ZnX2FyY09mZnNldDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHI6IHIsXG4gICAgICAgIGEwOiBhMCxcbiAgICAgICAgYTE6IGExLFxuICAgICAgICBwMDogWyByICogTWF0aC5jb3MoYTApLCByICogTWF0aC5zaW4oYTApIF0sXG4gICAgICAgIHAxOiBbIHIgKiBNYXRoLmNvcyhhMSksIHIgKiBNYXRoLnNpbihhMSkgXVxuICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZXF1YWxzKGEsIGIpIHtcbiAgICAgIHJldHVybiBhLmEwID09IGIuYTAgJiYgYS5hMSA9PSBiLmExO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhcmMociwgcCwgYSkge1xuICAgICAgcmV0dXJuIFwiQVwiICsgciArIFwiLFwiICsgciArIFwiIDAgXCIgKyArKGEgPiDPgCkgKyBcIiwxIFwiICsgcDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3VydmUocjAsIHAwLCByMSwgcDEpIHtcbiAgICAgIHJldHVybiBcIlEgMCwwIFwiICsgcDE7XG4gICAgfVxuICAgIGNob3JkLnJhZGl1cyA9IGZ1bmN0aW9uKHYpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHJhZGl1cztcbiAgICAgIHJhZGl1cyA9IGQzX2Z1bmN0b3Iodik7XG4gICAgICByZXR1cm4gY2hvcmQ7XG4gICAgfTtcbiAgICBjaG9yZC5zb3VyY2UgPSBmdW5jdGlvbih2KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzb3VyY2U7XG4gICAgICBzb3VyY2UgPSBkM19mdW5jdG9yKHYpO1xuICAgICAgcmV0dXJuIGNob3JkO1xuICAgIH07XG4gICAgY2hvcmQudGFyZ2V0ID0gZnVuY3Rpb24odikge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGFyZ2V0O1xuICAgICAgdGFyZ2V0ID0gZDNfZnVuY3Rvcih2KTtcbiAgICAgIHJldHVybiBjaG9yZDtcbiAgICB9O1xuICAgIGNob3JkLnN0YXJ0QW5nbGUgPSBmdW5jdGlvbih2KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzdGFydEFuZ2xlO1xuICAgICAgc3RhcnRBbmdsZSA9IGQzX2Z1bmN0b3Iodik7XG4gICAgICByZXR1cm4gY2hvcmQ7XG4gICAgfTtcbiAgICBjaG9yZC5lbmRBbmdsZSA9IGZ1bmN0aW9uKHYpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGVuZEFuZ2xlO1xuICAgICAgZW5kQW5nbGUgPSBkM19mdW5jdG9yKHYpO1xuICAgICAgcmV0dXJuIGNob3JkO1xuICAgIH07XG4gICAgcmV0dXJuIGNob3JkO1xuICB9O1xuICBmdW5jdGlvbiBkM19zdmdfY2hvcmRSYWRpdXMoZCkge1xuICAgIHJldHVybiBkLnJhZGl1cztcbiAgfVxuICBkMy5zdmcuZGlhZ29uYWwgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc291cmNlID0gZDNfc291cmNlLCB0YXJnZXQgPSBkM190YXJnZXQsIHByb2plY3Rpb24gPSBkM19zdmdfZGlhZ29uYWxQcm9qZWN0aW9uO1xuICAgIGZ1bmN0aW9uIGRpYWdvbmFsKGQsIGkpIHtcbiAgICAgIHZhciBwMCA9IHNvdXJjZS5jYWxsKHRoaXMsIGQsIGkpLCBwMyA9IHRhcmdldC5jYWxsKHRoaXMsIGQsIGkpLCBtID0gKHAwLnkgKyBwMy55KSAvIDIsIHAgPSBbIHAwLCB7XG4gICAgICAgIHg6IHAwLngsXG4gICAgICAgIHk6IG1cbiAgICAgIH0sIHtcbiAgICAgICAgeDogcDMueCxcbiAgICAgICAgeTogbVxuICAgICAgfSwgcDMgXTtcbiAgICAgIHAgPSBwLm1hcChwcm9qZWN0aW9uKTtcbiAgICAgIHJldHVybiBcIk1cIiArIHBbMF0gKyBcIkNcIiArIHBbMV0gKyBcIiBcIiArIHBbMl0gKyBcIiBcIiArIHBbM107XG4gICAgfVxuICAgIGRpYWdvbmFsLnNvdXJjZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHNvdXJjZTtcbiAgICAgIHNvdXJjZSA9IGQzX2Z1bmN0b3IoeCk7XG4gICAgICByZXR1cm4gZGlhZ29uYWw7XG4gICAgfTtcbiAgICBkaWFnb25hbC50YXJnZXQgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0YXJnZXQ7XG4gICAgICB0YXJnZXQgPSBkM19mdW5jdG9yKHgpO1xuICAgICAgcmV0dXJuIGRpYWdvbmFsO1xuICAgIH07XG4gICAgZGlhZ29uYWwucHJvamVjdGlvbiA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHByb2plY3Rpb247XG4gICAgICBwcm9qZWN0aW9uID0geDtcbiAgICAgIHJldHVybiBkaWFnb25hbDtcbiAgICB9O1xuICAgIHJldHVybiBkaWFnb25hbDtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfc3ZnX2RpYWdvbmFsUHJvamVjdGlvbihkKSB7XG4gICAgcmV0dXJuIFsgZC54LCBkLnkgXTtcbiAgfVxuICBkMy5zdmcuZGlhZ29uYWwucmFkaWFsID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRpYWdvbmFsID0gZDMuc3ZnLmRpYWdvbmFsKCksIHByb2plY3Rpb24gPSBkM19zdmdfZGlhZ29uYWxQcm9qZWN0aW9uLCBwcm9qZWN0aW9uXyA9IGRpYWdvbmFsLnByb2plY3Rpb247XG4gICAgZGlhZ29uYWwucHJvamVjdGlvbiA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gcHJvamVjdGlvbl8oZDNfc3ZnX2RpYWdvbmFsUmFkaWFsUHJvamVjdGlvbihwcm9qZWN0aW9uID0geCkpIDogcHJvamVjdGlvbjtcbiAgICB9O1xuICAgIHJldHVybiBkaWFnb25hbDtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfc3ZnX2RpYWdvbmFsUmFkaWFsUHJvamVjdGlvbihwcm9qZWN0aW9uKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGQgPSBwcm9qZWN0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksIHIgPSBkWzBdLCBhID0gZFsxXSArIGQzX3N2Z19hcmNPZmZzZXQ7XG4gICAgICByZXR1cm4gWyByICogTWF0aC5jb3MoYSksIHIgKiBNYXRoLnNpbihhKSBdO1xuICAgIH07XG4gIH1cbiAgZDMuc3ZnLnN5bWJvbCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0eXBlID0gZDNfc3ZnX3N5bWJvbFR5cGUsIHNpemUgPSBkM19zdmdfc3ltYm9sU2l6ZTtcbiAgICBmdW5jdGlvbiBzeW1ib2woZCwgaSkge1xuICAgICAgcmV0dXJuIChkM19zdmdfc3ltYm9scy5nZXQodHlwZS5jYWxsKHRoaXMsIGQsIGkpKSB8fCBkM19zdmdfc3ltYm9sQ2lyY2xlKShzaXplLmNhbGwodGhpcywgZCwgaSkpO1xuICAgIH1cbiAgICBzeW1ib2wudHlwZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHR5cGU7XG4gICAgICB0eXBlID0gZDNfZnVuY3Rvcih4KTtcbiAgICAgIHJldHVybiBzeW1ib2w7XG4gICAgfTtcbiAgICBzeW1ib2wuc2l6ZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHNpemU7XG4gICAgICBzaXplID0gZDNfZnVuY3Rvcih4KTtcbiAgICAgIHJldHVybiBzeW1ib2w7XG4gICAgfTtcbiAgICByZXR1cm4gc3ltYm9sO1xuICB9O1xuICBmdW5jdGlvbiBkM19zdmdfc3ltYm9sU2l6ZSgpIHtcbiAgICByZXR1cm4gNjQ7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX3N5bWJvbFR5cGUoKSB7XG4gICAgcmV0dXJuIFwiY2lyY2xlXCI7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX3N5bWJvbENpcmNsZShzaXplKSB7XG4gICAgdmFyIHIgPSBNYXRoLnNxcnQoc2l6ZSAvIM+AKTtcbiAgICByZXR1cm4gXCJNMCxcIiArIHIgKyBcIkFcIiArIHIgKyBcIixcIiArIHIgKyBcIiAwIDEsMSAwLFwiICsgLXIgKyBcIkFcIiArIHIgKyBcIixcIiArIHIgKyBcIiAwIDEsMSAwLFwiICsgciArIFwiWlwiO1xuICB9XG4gIHZhciBkM19zdmdfc3ltYm9scyA9IGQzLm1hcCh7XG4gICAgY2lyY2xlOiBkM19zdmdfc3ltYm9sQ2lyY2xlLFxuICAgIGNyb3NzOiBmdW5jdGlvbihzaXplKSB7XG4gICAgICB2YXIgciA9IE1hdGguc3FydChzaXplIC8gNSkgLyAyO1xuICAgICAgcmV0dXJuIFwiTVwiICsgLTMgKiByICsgXCIsXCIgKyAtciArIFwiSFwiICsgLXIgKyBcIlZcIiArIC0zICogciArIFwiSFwiICsgciArIFwiVlwiICsgLXIgKyBcIkhcIiArIDMgKiByICsgXCJWXCIgKyByICsgXCJIXCIgKyByICsgXCJWXCIgKyAzICogciArIFwiSFwiICsgLXIgKyBcIlZcIiArIHIgKyBcIkhcIiArIC0zICogciArIFwiWlwiO1xuICAgIH0sXG4gICAgZGlhbW9uZDogZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgdmFyIHJ5ID0gTWF0aC5zcXJ0KHNpemUgLyAoMiAqIGQzX3N2Z19zeW1ib2xUYW4zMCkpLCByeCA9IHJ5ICogZDNfc3ZnX3N5bWJvbFRhbjMwO1xuICAgICAgcmV0dXJuIFwiTTAsXCIgKyAtcnkgKyBcIkxcIiArIHJ4ICsgXCIsMFwiICsgXCIgMCxcIiArIHJ5ICsgXCIgXCIgKyAtcnggKyBcIiwwXCIgKyBcIlpcIjtcbiAgICB9LFxuICAgIHNxdWFyZTogZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgdmFyIHIgPSBNYXRoLnNxcnQoc2l6ZSkgLyAyO1xuICAgICAgcmV0dXJuIFwiTVwiICsgLXIgKyBcIixcIiArIC1yICsgXCJMXCIgKyByICsgXCIsXCIgKyAtciArIFwiIFwiICsgciArIFwiLFwiICsgciArIFwiIFwiICsgLXIgKyBcIixcIiArIHIgKyBcIlpcIjtcbiAgICB9LFxuICAgIFwidHJpYW5nbGUtZG93blwiOiBmdW5jdGlvbihzaXplKSB7XG4gICAgICB2YXIgcnggPSBNYXRoLnNxcnQoc2l6ZSAvIGQzX3N2Z19zeW1ib2xTcXJ0MyksIHJ5ID0gcnggKiBkM19zdmdfc3ltYm9sU3FydDMgLyAyO1xuICAgICAgcmV0dXJuIFwiTTAsXCIgKyByeSArIFwiTFwiICsgcnggKyBcIixcIiArIC1yeSArIFwiIFwiICsgLXJ4ICsgXCIsXCIgKyAtcnkgKyBcIlpcIjtcbiAgICB9LFxuICAgIFwidHJpYW5nbGUtdXBcIjogZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgdmFyIHJ4ID0gTWF0aC5zcXJ0KHNpemUgLyBkM19zdmdfc3ltYm9sU3FydDMpLCByeSA9IHJ4ICogZDNfc3ZnX3N5bWJvbFNxcnQzIC8gMjtcbiAgICAgIHJldHVybiBcIk0wLFwiICsgLXJ5ICsgXCJMXCIgKyByeCArIFwiLFwiICsgcnkgKyBcIiBcIiArIC1yeCArIFwiLFwiICsgcnkgKyBcIlpcIjtcbiAgICB9XG4gIH0pO1xuICBkMy5zdmcuc3ltYm9sVHlwZXMgPSBkM19zdmdfc3ltYm9scy5rZXlzKCk7XG4gIHZhciBkM19zdmdfc3ltYm9sU3FydDMgPSBNYXRoLnNxcnQoMyksIGQzX3N2Z19zeW1ib2xUYW4zMCA9IE1hdGgudGFuKDMwICogZDNfcmFkaWFucyk7XG4gIGZ1bmN0aW9uIGQzX3RyYW5zaXRpb24oZ3JvdXBzLCBpZCkge1xuICAgIGQzX3N1YmNsYXNzKGdyb3VwcywgZDNfdHJhbnNpdGlvblByb3RvdHlwZSk7XG4gICAgZ3JvdXBzLmlkID0gaWQ7XG4gICAgcmV0dXJuIGdyb3VwcztcbiAgfVxuICB2YXIgZDNfdHJhbnNpdGlvblByb3RvdHlwZSA9IFtdLCBkM190cmFuc2l0aW9uSWQgPSAwLCBkM190cmFuc2l0aW9uSW5oZXJpdElkLCBkM190cmFuc2l0aW9uSW5oZXJpdDtcbiAgZDNfdHJhbnNpdGlvblByb3RvdHlwZS5jYWxsID0gZDNfc2VsZWN0aW9uUHJvdG90eXBlLmNhbGw7XG4gIGQzX3RyYW5zaXRpb25Qcm90b3R5cGUuZW1wdHkgPSBkM19zZWxlY3Rpb25Qcm90b3R5cGUuZW1wdHk7XG4gIGQzX3RyYW5zaXRpb25Qcm90b3R5cGUubm9kZSA9IGQzX3NlbGVjdGlvblByb3RvdHlwZS5ub2RlO1xuICBkM190cmFuc2l0aW9uUHJvdG90eXBlLnNpemUgPSBkM19zZWxlY3Rpb25Qcm90b3R5cGUuc2l6ZTtcbiAgZDMudHJhbnNpdGlvbiA9IGZ1bmN0aW9uKHNlbGVjdGlvbikge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gZDNfdHJhbnNpdGlvbkluaGVyaXRJZCA/IHNlbGVjdGlvbi50cmFuc2l0aW9uKCkgOiBzZWxlY3Rpb24gOiBkM19zZWxlY3Rpb25Sb290LnRyYW5zaXRpb24oKTtcbiAgfTtcbiAgZDMudHJhbnNpdGlvbi5wcm90b3R5cGUgPSBkM190cmFuc2l0aW9uUHJvdG90eXBlO1xuICBkM190cmFuc2l0aW9uUHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gICAgdmFyIGlkID0gdGhpcy5pZCwgc3ViZ3JvdXBzID0gW10sIHN1Ymdyb3VwLCBzdWJub2RlLCBub2RlO1xuICAgIHNlbGVjdG9yID0gZDNfc2VsZWN0aW9uX3NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICBmb3IgKHZhciBqID0gLTEsIG0gPSB0aGlzLmxlbmd0aDsgKytqIDwgbTsgKSB7XG4gICAgICBzdWJncm91cHMucHVzaChzdWJncm91cCA9IFtdKTtcbiAgICAgIGZvciAodmFyIGdyb3VwID0gdGhpc1tqXSwgaSA9IC0xLCBuID0gZ3JvdXAubGVuZ3RoOyArK2kgPCBuOyApIHtcbiAgICAgICAgaWYgKChub2RlID0gZ3JvdXBbaV0pICYmIChzdWJub2RlID0gc2VsZWN0b3IuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBqKSkpIHtcbiAgICAgICAgICBpZiAoXCJfX2RhdGFfX1wiIGluIG5vZGUpIHN1Ym5vZGUuX19kYXRhX18gPSBub2RlLl9fZGF0YV9fO1xuICAgICAgICAgIGQzX3RyYW5zaXRpb25Ob2RlKHN1Ym5vZGUsIGksIGlkLCBub2RlLl9fdHJhbnNpdGlvbl9fW2lkXSk7XG4gICAgICAgICAgc3ViZ3JvdXAucHVzaChzdWJub2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdWJncm91cC5wdXNoKG51bGwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkM190cmFuc2l0aW9uKHN1Ymdyb3VwcywgaWQpO1xuICB9O1xuICBkM190cmFuc2l0aW9uUHJvdG90eXBlLnNlbGVjdEFsbCA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gICAgdmFyIGlkID0gdGhpcy5pZCwgc3ViZ3JvdXBzID0gW10sIHN1Ymdyb3VwLCBzdWJub2Rlcywgbm9kZSwgc3Vibm9kZSwgdHJhbnNpdGlvbjtcbiAgICBzZWxlY3RvciA9IGQzX3NlbGVjdGlvbl9zZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgZm9yICh2YXIgaiA9IC0xLCBtID0gdGhpcy5sZW5ndGg7ICsraiA8IG07ICkge1xuICAgICAgZm9yICh2YXIgZ3JvdXAgPSB0aGlzW2pdLCBpID0gLTEsIG4gPSBncm91cC5sZW5ndGg7ICsraSA8IG47ICkge1xuICAgICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgICAgdHJhbnNpdGlvbiA9IG5vZGUuX190cmFuc2l0aW9uX19baWRdO1xuICAgICAgICAgIHN1Ym5vZGVzID0gc2VsZWN0b3IuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBqKTtcbiAgICAgICAgICBzdWJncm91cHMucHVzaChzdWJncm91cCA9IFtdKTtcbiAgICAgICAgICBmb3IgKHZhciBrID0gLTEsIG8gPSBzdWJub2Rlcy5sZW5ndGg7ICsrayA8IG87ICkge1xuICAgICAgICAgICAgaWYgKHN1Ym5vZGUgPSBzdWJub2Rlc1trXSkgZDNfdHJhbnNpdGlvbk5vZGUoc3Vibm9kZSwgaywgaWQsIHRyYW5zaXRpb24pO1xuICAgICAgICAgICAgc3ViZ3JvdXAucHVzaChzdWJub2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGQzX3RyYW5zaXRpb24oc3ViZ3JvdXBzLCBpZCk7XG4gIH07XG4gIGQzX3RyYW5zaXRpb25Qcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24oZmlsdGVyKSB7XG4gICAgdmFyIHN1Ymdyb3VwcyA9IFtdLCBzdWJncm91cCwgZ3JvdXAsIG5vZGU7XG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgIT09IFwiZnVuY3Rpb25cIikgZmlsdGVyID0gZDNfc2VsZWN0aW9uX2ZpbHRlcihmaWx0ZXIpO1xuICAgIGZvciAodmFyIGogPSAwLCBtID0gdGhpcy5sZW5ndGg7IGogPCBtOyBqKyspIHtcbiAgICAgIHN1Ymdyb3Vwcy5wdXNoKHN1Ymdyb3VwID0gW10pO1xuICAgICAgZm9yICh2YXIgZ3JvdXAgPSB0aGlzW2pdLCBpID0gMCwgbiA9IGdyb3VwLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICBpZiAoKG5vZGUgPSBncm91cFtpXSkgJiYgZmlsdGVyLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSkpIHtcbiAgICAgICAgICBzdWJncm91cC5wdXNoKG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkM190cmFuc2l0aW9uKHN1Ymdyb3VwcywgdGhpcy5pZCk7XG4gIH07XG4gIGQzX3RyYW5zaXRpb25Qcm90b3R5cGUudHdlZW4gPSBmdW5jdGlvbihuYW1lLCB0d2Vlbikge1xuICAgIHZhciBpZCA9IHRoaXMuaWQ7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gdGhpcy5ub2RlKCkuX190cmFuc2l0aW9uX19baWRdLnR3ZWVuLmdldChuYW1lKTtcbiAgICByZXR1cm4gZDNfc2VsZWN0aW9uX2VhY2godGhpcywgdHdlZW4gPT0gbnVsbCA/IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIG5vZGUuX190cmFuc2l0aW9uX19baWRdLnR3ZWVuLnJlbW92ZShuYW1lKTtcbiAgICB9IDogZnVuY3Rpb24obm9kZSkge1xuICAgICAgbm9kZS5fX3RyYW5zaXRpb25fX1tpZF0udHdlZW4uc2V0KG5hbWUsIHR3ZWVuKTtcbiAgICB9KTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfdHJhbnNpdGlvbl90d2Vlbihncm91cHMsIG5hbWUsIHZhbHVlLCB0d2Vlbikge1xuICAgIHZhciBpZCA9IGdyb3Vwcy5pZDtcbiAgICByZXR1cm4gZDNfc2VsZWN0aW9uX2VhY2goZ3JvdXBzLCB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiA/IGZ1bmN0aW9uKG5vZGUsIGksIGopIHtcbiAgICAgIG5vZGUuX190cmFuc2l0aW9uX19baWRdLnR3ZWVuLnNldChuYW1lLCB0d2Vlbih2YWx1ZS5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGopKSk7XG4gICAgfSA6ICh2YWx1ZSA9IHR3ZWVuKHZhbHVlKSwgZnVuY3Rpb24obm9kZSkge1xuICAgICAgbm9kZS5fX3RyYW5zaXRpb25fX1tpZF0udHdlZW4uc2V0KG5hbWUsIHZhbHVlKTtcbiAgICB9KSk7XG4gIH1cbiAgZDNfdHJhbnNpdGlvblByb3RvdHlwZS5hdHRyID0gZnVuY3Rpb24obmFtZU5TLCB2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgZm9yICh2YWx1ZSBpbiBuYW1lTlMpIHRoaXMuYXR0cih2YWx1ZSwgbmFtZU5TW3ZhbHVlXSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdmFyIGludGVycG9sYXRlID0gbmFtZU5TID09IFwidHJhbnNmb3JtXCIgPyBkM19pbnRlcnBvbGF0ZVRyYW5zZm9ybSA6IGQzX2ludGVycG9sYXRlLCBuYW1lID0gZDMubnMucXVhbGlmeShuYW1lTlMpO1xuICAgIGZ1bmN0aW9uIGF0dHJOdWxsKCkge1xuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGF0dHJOdWxsTlMoKSB7XG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZU5TKG5hbWUuc3BhY2UsIG5hbWUubG9jYWwpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhdHRyVHdlZW4oYikge1xuICAgICAgcmV0dXJuIGIgPT0gbnVsbCA/IGF0dHJOdWxsIDogKGIgKz0gXCJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhID0gdGhpcy5nZXRBdHRyaWJ1dGUobmFtZSksIGk7XG4gICAgICAgIHJldHVybiBhICE9PSBiICYmIChpID0gaW50ZXJwb2xhdGUoYSwgYiksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCBpKHQpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYXR0clR3ZWVuTlMoYikge1xuICAgICAgcmV0dXJuIGIgPT0gbnVsbCA/IGF0dHJOdWxsTlMgOiAoYiArPSBcIlwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGEgPSB0aGlzLmdldEF0dHJpYnV0ZU5TKG5hbWUuc3BhY2UsIG5hbWUubG9jYWwpLCBpO1xuICAgICAgICByZXR1cm4gYSAhPT0gYiAmJiAoaSA9IGludGVycG9sYXRlKGEsIGIpLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGVOUyhuYW1lLnNwYWNlLCBuYW1lLmxvY2FsLCBpKHQpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGQzX3RyYW5zaXRpb25fdHdlZW4odGhpcywgXCJhdHRyLlwiICsgbmFtZU5TLCB2YWx1ZSwgbmFtZS5sb2NhbCA/IGF0dHJUd2Vlbk5TIDogYXR0clR3ZWVuKTtcbiAgfTtcbiAgZDNfdHJhbnNpdGlvblByb3RvdHlwZS5hdHRyVHdlZW4gPSBmdW5jdGlvbihuYW1lTlMsIHR3ZWVuKSB7XG4gICAgdmFyIG5hbWUgPSBkMy5ucy5xdWFsaWZ5KG5hbWVOUyk7XG4gICAgZnVuY3Rpb24gYXR0clR3ZWVuKGQsIGkpIHtcbiAgICAgIHZhciBmID0gdHdlZW4uY2FsbCh0aGlzLCBkLCBpLCB0aGlzLmdldEF0dHJpYnV0ZShuYW1lKSk7XG4gICAgICByZXR1cm4gZiAmJiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKG5hbWUsIGYodCkpO1xuICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYXR0clR3ZWVuTlMoZCwgaSkge1xuICAgICAgdmFyIGYgPSB0d2Vlbi5jYWxsKHRoaXMsIGQsIGksIHRoaXMuZ2V0QXR0cmlidXRlTlMobmFtZS5zcGFjZSwgbmFtZS5sb2NhbCkpO1xuICAgICAgcmV0dXJuIGYgJiYgZnVuY3Rpb24odCkge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZU5TKG5hbWUuc3BhY2UsIG5hbWUubG9jYWwsIGYodCkpO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudHdlZW4oXCJhdHRyLlwiICsgbmFtZU5TLCBuYW1lLmxvY2FsID8gYXR0clR3ZWVuTlMgOiBhdHRyVHdlZW4pO1xuICB9O1xuICBkM190cmFuc2l0aW9uUHJvdG90eXBlLnN0eWxlID0gZnVuY3Rpb24obmFtZSwgdmFsdWUsIHByaW9yaXR5KSB7XG4gICAgdmFyIG4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGlmIChuIDwgMykge1xuICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmIChuIDwgMikgdmFsdWUgPSBcIlwiO1xuICAgICAgICBmb3IgKHByaW9yaXR5IGluIG5hbWUpIHRoaXMuc3R5bGUocHJpb3JpdHksIG5hbWVbcHJpb3JpdHldLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgcHJpb3JpdHkgPSBcIlwiO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzdHlsZU51bGwoKSB7XG4gICAgICB0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzdHlsZVN0cmluZyhiKSB7XG4gICAgICByZXR1cm4gYiA9PSBudWxsID8gc3R5bGVOdWxsIDogKGIgKz0gXCJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhID0gZDNfd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcywgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShuYW1lKSwgaTtcbiAgICAgICAgcmV0dXJuIGEgIT09IGIgJiYgKGkgPSBkM19pbnRlcnBvbGF0ZShhLCBiKSwgZnVuY3Rpb24odCkge1xuICAgICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkobmFtZSwgaSh0KSwgcHJpb3JpdHkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZDNfdHJhbnNpdGlvbl90d2Vlbih0aGlzLCBcInN0eWxlLlwiICsgbmFtZSwgdmFsdWUsIHN0eWxlU3RyaW5nKTtcbiAgfTtcbiAgZDNfdHJhbnNpdGlvblByb3RvdHlwZS5zdHlsZVR3ZWVuID0gZnVuY3Rpb24obmFtZSwgdHdlZW4sIHByaW9yaXR5KSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSBwcmlvcml0eSA9IFwiXCI7XG4gICAgZnVuY3Rpb24gc3R5bGVUd2VlbihkLCBpKSB7XG4gICAgICB2YXIgZiA9IHR3ZWVuLmNhbGwodGhpcywgZCwgaSwgZDNfd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcywgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShuYW1lKSk7XG4gICAgICByZXR1cm4gZiAmJiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkobmFtZSwgZih0KSwgcHJpb3JpdHkpO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudHdlZW4oXCJzdHlsZS5cIiArIG5hbWUsIHN0eWxlVHdlZW4pO1xuICB9O1xuICBkM190cmFuc2l0aW9uUHJvdG90eXBlLnRleHQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBkM190cmFuc2l0aW9uX3R3ZWVuKHRoaXMsIFwidGV4dFwiLCB2YWx1ZSwgZDNfdHJhbnNpdGlvbl90ZXh0KTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfdHJhbnNpdGlvbl90ZXh0KGIpIHtcbiAgICBpZiAoYiA9PSBudWxsKSBiID0gXCJcIjtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnRleHRDb250ZW50ID0gYjtcbiAgICB9O1xuICB9XG4gIGQzX3RyYW5zaXRpb25Qcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChcImVuZC50cmFuc2l0aW9uXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHA7XG4gICAgICBpZiAoIXRoaXMuX190cmFuc2l0aW9uX18gJiYgKHAgPSB0aGlzLnBhcmVudE5vZGUpKSBwLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgIH0pO1xuICB9O1xuICBkM190cmFuc2l0aW9uUHJvdG90eXBlLmVhc2UgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciBpZCA9IHRoaXMuaWQ7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAxKSByZXR1cm4gdGhpcy5ub2RlKCkuX190cmFuc2l0aW9uX19baWRdLmVhc2U7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB2YWx1ZSA9IGQzLmVhc2UuYXBwbHkoZDMsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIGQzX3NlbGVjdGlvbl9lYWNoKHRoaXMsIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIG5vZGUuX190cmFuc2l0aW9uX19baWRdLmVhc2UgPSB2YWx1ZTtcbiAgICB9KTtcbiAgfTtcbiAgZDNfdHJhbnNpdGlvblByb3RvdHlwZS5kZWxheSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIGlkID0gdGhpcy5pZDtcbiAgICByZXR1cm4gZDNfc2VsZWN0aW9uX2VhY2godGhpcywgdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgPyBmdW5jdGlvbihub2RlLCBpLCBqKSB7XG4gICAgICBub2RlLl9fdHJhbnNpdGlvbl9fW2lkXS5kZWxheSA9IHZhbHVlLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgaikgfCAwO1xuICAgIH0gOiAodmFsdWUgfD0gMCwgZnVuY3Rpb24obm9kZSkge1xuICAgICAgbm9kZS5fX3RyYW5zaXRpb25fX1tpZF0uZGVsYXkgPSB2YWx1ZTtcbiAgICB9KSk7XG4gIH07XG4gIGQzX3RyYW5zaXRpb25Qcm90b3R5cGUuZHVyYXRpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciBpZCA9IHRoaXMuaWQ7XG4gICAgcmV0dXJuIGQzX3NlbGVjdGlvbl9lYWNoKHRoaXMsIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gZnVuY3Rpb24obm9kZSwgaSwgaikge1xuICAgICAgbm9kZS5fX3RyYW5zaXRpb25fX1tpZF0uZHVyYXRpb24gPSBNYXRoLm1heCgxLCB2YWx1ZS5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGopIHwgMCk7XG4gICAgfSA6ICh2YWx1ZSA9IE1hdGgubWF4KDEsIHZhbHVlIHwgMCksIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIG5vZGUuX190cmFuc2l0aW9uX19baWRdLmR1cmF0aW9uID0gdmFsdWU7XG4gICAgfSkpO1xuICB9O1xuICBkM190cmFuc2l0aW9uUHJvdG90eXBlLmVhY2ggPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICAgIHZhciBpZCA9IHRoaXMuaWQ7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICB2YXIgaW5oZXJpdCA9IGQzX3RyYW5zaXRpb25Jbmhlcml0LCBpbmhlcml0SWQgPSBkM190cmFuc2l0aW9uSW5oZXJpdElkO1xuICAgICAgZDNfdHJhbnNpdGlvbkluaGVyaXRJZCA9IGlkO1xuICAgICAgZDNfc2VsZWN0aW9uX2VhY2godGhpcywgZnVuY3Rpb24obm9kZSwgaSwgaikge1xuICAgICAgICBkM190cmFuc2l0aW9uSW5oZXJpdCA9IG5vZGUuX190cmFuc2l0aW9uX19baWRdO1xuICAgICAgICB0eXBlLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgaik7XG4gICAgICB9KTtcbiAgICAgIGQzX3RyYW5zaXRpb25Jbmhlcml0ID0gaW5oZXJpdDtcbiAgICAgIGQzX3RyYW5zaXRpb25Jbmhlcml0SWQgPSBpbmhlcml0SWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGQzX3NlbGVjdGlvbl9lYWNoKHRoaXMsIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgdmFyIHRyYW5zaXRpb24gPSBub2RlLl9fdHJhbnNpdGlvbl9fW2lkXTtcbiAgICAgICAgKHRyYW5zaXRpb24uZXZlbnQgfHwgKHRyYW5zaXRpb24uZXZlbnQgPSBkMy5kaXNwYXRjaChcInN0YXJ0XCIsIFwiZW5kXCIpKSkub24odHlwZSwgbGlzdGVuZXIpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBkM190cmFuc2l0aW9uUHJvdG90eXBlLnRyYW5zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaWQwID0gdGhpcy5pZCwgaWQxID0gKytkM190cmFuc2l0aW9uSWQsIHN1Ymdyb3VwcyA9IFtdLCBzdWJncm91cCwgZ3JvdXAsIG5vZGUsIHRyYW5zaXRpb247XG4gICAgZm9yICh2YXIgaiA9IDAsIG0gPSB0aGlzLmxlbmd0aDsgaiA8IG07IGorKykge1xuICAgICAgc3ViZ3JvdXBzLnB1c2goc3ViZ3JvdXAgPSBbXSk7XG4gICAgICBmb3IgKHZhciBncm91cCA9IHRoaXNbal0sIGkgPSAwLCBuID0gZ3JvdXAubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgICB0cmFuc2l0aW9uID0gT2JqZWN0LmNyZWF0ZShub2RlLl9fdHJhbnNpdGlvbl9fW2lkMF0pO1xuICAgICAgICAgIHRyYW5zaXRpb24uZGVsYXkgKz0gdHJhbnNpdGlvbi5kdXJhdGlvbjtcbiAgICAgICAgICBkM190cmFuc2l0aW9uTm9kZShub2RlLCBpLCBpZDEsIHRyYW5zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHN1Ymdyb3VwLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkM190cmFuc2l0aW9uKHN1Ymdyb3VwcywgaWQxKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfdHJhbnNpdGlvbk5vZGUobm9kZSwgaSwgaWQsIGluaGVyaXQpIHtcbiAgICB2YXIgbG9jayA9IG5vZGUuX190cmFuc2l0aW9uX18gfHwgKG5vZGUuX190cmFuc2l0aW9uX18gPSB7XG4gICAgICBhY3RpdmU6IDAsXG4gICAgICBjb3VudDogMFxuICAgIH0pLCB0cmFuc2l0aW9uID0gbG9ja1tpZF07XG4gICAgaWYgKCF0cmFuc2l0aW9uKSB7XG4gICAgICB2YXIgdGltZSA9IGluaGVyaXQudGltZTtcbiAgICAgIHRyYW5zaXRpb24gPSBsb2NrW2lkXSA9IHtcbiAgICAgICAgdHdlZW46IG5ldyBkM19NYXAoKSxcbiAgICAgICAgdGltZTogdGltZSxcbiAgICAgICAgZWFzZTogaW5oZXJpdC5lYXNlLFxuICAgICAgICBkZWxheTogaW5oZXJpdC5kZWxheSxcbiAgICAgICAgZHVyYXRpb246IGluaGVyaXQuZHVyYXRpb25cbiAgICAgIH07XG4gICAgICArK2xvY2suY291bnQ7XG4gICAgICBkMy50aW1lcihmdW5jdGlvbihlbGFwc2VkKSB7XG4gICAgICAgIHZhciBkID0gbm9kZS5fX2RhdGFfXywgZWFzZSA9IHRyYW5zaXRpb24uZWFzZSwgZGVsYXkgPSB0cmFuc2l0aW9uLmRlbGF5LCBkdXJhdGlvbiA9IHRyYW5zaXRpb24uZHVyYXRpb24sIHR3ZWVuZWQgPSBbXTtcbiAgICAgICAgaWYgKGRlbGF5IDw9IGVsYXBzZWQpIHJldHVybiBzdGFydChlbGFwc2VkKTtcbiAgICAgICAgZDNfdGltZXJfcmVwbGFjZShzdGFydCwgZGVsYXksIHRpbWUpO1xuICAgICAgICBmdW5jdGlvbiBzdGFydChlbGFwc2VkKSB7XG4gICAgICAgICAgaWYgKGxvY2suYWN0aXZlID4gaWQpIHJldHVybiBzdG9wKCk7XG4gICAgICAgICAgbG9jay5hY3RpdmUgPSBpZDtcbiAgICAgICAgICB0cmFuc2l0aW9uLmV2ZW50ICYmIHRyYW5zaXRpb24uZXZlbnQuc3RhcnQuY2FsbChub2RlLCBkLCBpKTtcbiAgICAgICAgICB0cmFuc2l0aW9uLnR3ZWVuLmZvckVhY2goZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlID0gdmFsdWUuY2FsbChub2RlLCBkLCBpKSkge1xuICAgICAgICAgICAgICB0d2VlbmVkLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmICh0aWNrKGVsYXBzZWQpKSByZXR1cm4gMTtcbiAgICAgICAgICBkM190aW1lcl9yZXBsYWNlKHRpY2ssIDAsIHRpbWUpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHRpY2soZWxhcHNlZCkge1xuICAgICAgICAgIGlmIChsb2NrLmFjdGl2ZSAhPT0gaWQpIHJldHVybiBzdG9wKCk7XG4gICAgICAgICAgdmFyIHQgPSAoZWxhcHNlZCAtIGRlbGF5KSAvIGR1cmF0aW9uLCBlID0gZWFzZSh0KSwgbiA9IHR3ZWVuZWQubGVuZ3RoO1xuICAgICAgICAgIHdoaWxlIChuID4gMCkge1xuICAgICAgICAgICAgdHdlZW5lZFstLW5dLmNhbGwobm9kZSwgZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0ID49IDEpIHtcbiAgICAgICAgICAgIHN0b3AoKTtcbiAgICAgICAgICAgIHRyYW5zaXRpb24uZXZlbnQgJiYgdHJhbnNpdGlvbi5ldmVudC5lbmQuY2FsbChub2RlLCBkLCBpKTtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICAgIGlmICgtLWxvY2suY291bnQpIGRlbGV0ZSBsb2NrW2lkXTsgZWxzZSBkZWxldGUgbm9kZS5fX3RyYW5zaXRpb25fXztcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgfSwgMCwgdGltZSk7XG4gICAgfVxuICB9XG4gIGQzLnN2Zy5heGlzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjYWxlID0gZDMuc2NhbGUubGluZWFyKCksIG9yaWVudCA9IGQzX3N2Z19heGlzRGVmYXVsdE9yaWVudCwgdGlja01ham9yU2l6ZSA9IDYsIHRpY2tNaW5vclNpemUgPSA2LCB0aWNrRW5kU2l6ZSA9IDYsIHRpY2tQYWRkaW5nID0gMywgdGlja0FyZ3VtZW50c18gPSBbIDEwIF0sIHRpY2tWYWx1ZXMgPSBudWxsLCB0aWNrRm9ybWF0XywgdGlja1N1YmRpdmlkZSA9IDA7XG4gICAgZnVuY3Rpb24gYXhpcyhnKSB7XG4gICAgICBnLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBnID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICB2YXIgdGlja3MgPSB0aWNrVmFsdWVzID09IG51bGwgPyBzY2FsZS50aWNrcyA/IHNjYWxlLnRpY2tzLmFwcGx5KHNjYWxlLCB0aWNrQXJndW1lbnRzXykgOiBzY2FsZS5kb21haW4oKSA6IHRpY2tWYWx1ZXMsIHRpY2tGb3JtYXQgPSB0aWNrRm9ybWF0XyA9PSBudWxsID8gc2NhbGUudGlja0Zvcm1hdCA/IHNjYWxlLnRpY2tGb3JtYXQuYXBwbHkoc2NhbGUsIHRpY2tBcmd1bWVudHNfKSA6IFN0cmluZyA6IHRpY2tGb3JtYXRfO1xuICAgICAgICB2YXIgc3VidGlja3MgPSBkM19zdmdfYXhpc1N1YmRpdmlkZShzY2FsZSwgdGlja3MsIHRpY2tTdWJkaXZpZGUpLCBzdWJ0aWNrID0gZy5zZWxlY3RBbGwoXCIudGljay5taW5vclwiKS5kYXRhKHN1YnRpY2tzLCBTdHJpbmcpLCBzdWJ0aWNrRW50ZXIgPSBzdWJ0aWNrLmVudGVyKCkuaW5zZXJ0KFwibGluZVwiLCBcIi50aWNrXCIpLmF0dHIoXCJjbGFzc1wiLCBcInRpY2sgbWlub3JcIikuc3R5bGUoXCJvcGFjaXR5XCIsIDFlLTYpLCBzdWJ0aWNrRXhpdCA9IGQzLnRyYW5zaXRpb24oc3VidGljay5leGl0KCkpLnN0eWxlKFwib3BhY2l0eVwiLCAxZS02KS5yZW1vdmUoKSwgc3VidGlja1VwZGF0ZSA9IGQzLnRyYW5zaXRpb24oc3VidGljaykuc3R5bGUoXCJvcGFjaXR5XCIsIDEpO1xuICAgICAgICB2YXIgdGljayA9IGcuc2VsZWN0QWxsKFwiLnRpY2subWFqb3JcIikuZGF0YSh0aWNrcywgU3RyaW5nKSwgdGlja0VudGVyID0gdGljay5lbnRlcigpLmluc2VydChcImdcIiwgXCIuZG9tYWluXCIpLmF0dHIoXCJjbGFzc1wiLCBcInRpY2sgbWFqb3JcIikuc3R5bGUoXCJvcGFjaXR5XCIsIDFlLTYpLCB0aWNrRXhpdCA9IGQzLnRyYW5zaXRpb24odGljay5leGl0KCkpLnN0eWxlKFwib3BhY2l0eVwiLCAxZS02KS5yZW1vdmUoKSwgdGlja1VwZGF0ZSA9IGQzLnRyYW5zaXRpb24odGljaykuc3R5bGUoXCJvcGFjaXR5XCIsIDEpLCB0aWNrVHJhbnNmb3JtO1xuICAgICAgICB2YXIgcmFuZ2UgPSBkM19zY2FsZVJhbmdlKHNjYWxlKSwgcGF0aCA9IGcuc2VsZWN0QWxsKFwiLmRvbWFpblwiKS5kYXRhKFsgMCBdKSwgcGF0aFVwZGF0ZSA9IChwYXRoLmVudGVyKCkuYXBwZW5kKFwicGF0aFwiKS5hdHRyKFwiY2xhc3NcIiwgXCJkb21haW5cIiksIFxuICAgICAgICBkMy50cmFuc2l0aW9uKHBhdGgpKTtcbiAgICAgICAgdmFyIHNjYWxlMSA9IHNjYWxlLmNvcHkoKSwgc2NhbGUwID0gdGhpcy5fX2NoYXJ0X18gfHwgc2NhbGUxO1xuICAgICAgICB0aGlzLl9fY2hhcnRfXyA9IHNjYWxlMTtcbiAgICAgICAgdGlja0VudGVyLmFwcGVuZChcImxpbmVcIik7XG4gICAgICAgIHRpY2tFbnRlci5hcHBlbmQoXCJ0ZXh0XCIpO1xuICAgICAgICB2YXIgbGluZUVudGVyID0gdGlja0VudGVyLnNlbGVjdChcImxpbmVcIiksIGxpbmVVcGRhdGUgPSB0aWNrVXBkYXRlLnNlbGVjdChcImxpbmVcIiksIHRleHQgPSB0aWNrLnNlbGVjdChcInRleHRcIikudGV4dCh0aWNrRm9ybWF0KSwgdGV4dEVudGVyID0gdGlja0VudGVyLnNlbGVjdChcInRleHRcIiksIHRleHRVcGRhdGUgPSB0aWNrVXBkYXRlLnNlbGVjdChcInRleHRcIik7XG4gICAgICAgIHN3aXRjaCAob3JpZW50KSB7XG4gICAgICAgICBjYXNlIFwiYm90dG9tXCI6XG4gICAgICAgICAge1xuICAgICAgICAgICAgdGlja1RyYW5zZm9ybSA9IGQzX3N2Z19heGlzWDtcbiAgICAgICAgICAgIHN1YnRpY2tFbnRlci5hdHRyKFwieTJcIiwgdGlja01pbm9yU2l6ZSk7XG4gICAgICAgICAgICBzdWJ0aWNrVXBkYXRlLmF0dHIoXCJ4MlwiLCAwKS5hdHRyKFwieTJcIiwgdGlja01pbm9yU2l6ZSk7XG4gICAgICAgICAgICBsaW5lRW50ZXIuYXR0cihcInkyXCIsIHRpY2tNYWpvclNpemUpO1xuICAgICAgICAgICAgdGV4dEVudGVyLmF0dHIoXCJ5XCIsIE1hdGgubWF4KHRpY2tNYWpvclNpemUsIDApICsgdGlja1BhZGRpbmcpO1xuICAgICAgICAgICAgbGluZVVwZGF0ZS5hdHRyKFwieDJcIiwgMCkuYXR0cihcInkyXCIsIHRpY2tNYWpvclNpemUpO1xuICAgICAgICAgICAgdGV4dFVwZGF0ZS5hdHRyKFwieFwiLCAwKS5hdHRyKFwieVwiLCBNYXRoLm1heCh0aWNrTWFqb3JTaXplLCAwKSArIHRpY2tQYWRkaW5nKTtcbiAgICAgICAgICAgIHRleHQuYXR0cihcImR5XCIsIFwiLjcxZW1cIikuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKTtcbiAgICAgICAgICAgIHBhdGhVcGRhdGUuYXR0cihcImRcIiwgXCJNXCIgKyByYW5nZVswXSArIFwiLFwiICsgdGlja0VuZFNpemUgKyBcIlYwSFwiICsgcmFuZ2VbMV0gKyBcIlZcIiArIHRpY2tFbmRTaXplKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgY2FzZSBcInRvcFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRpY2tUcmFuc2Zvcm0gPSBkM19zdmdfYXhpc1g7XG4gICAgICAgICAgICBzdWJ0aWNrRW50ZXIuYXR0cihcInkyXCIsIC10aWNrTWlub3JTaXplKTtcbiAgICAgICAgICAgIHN1YnRpY2tVcGRhdGUuYXR0cihcIngyXCIsIDApLmF0dHIoXCJ5MlwiLCAtdGlja01pbm9yU2l6ZSk7XG4gICAgICAgICAgICBsaW5lRW50ZXIuYXR0cihcInkyXCIsIC10aWNrTWFqb3JTaXplKTtcbiAgICAgICAgICAgIHRleHRFbnRlci5hdHRyKFwieVwiLCAtKE1hdGgubWF4KHRpY2tNYWpvclNpemUsIDApICsgdGlja1BhZGRpbmcpKTtcbiAgICAgICAgICAgIGxpbmVVcGRhdGUuYXR0cihcIngyXCIsIDApLmF0dHIoXCJ5MlwiLCAtdGlja01ham9yU2l6ZSk7XG4gICAgICAgICAgICB0ZXh0VXBkYXRlLmF0dHIoXCJ4XCIsIDApLmF0dHIoXCJ5XCIsIC0oTWF0aC5tYXgodGlja01ham9yU2l6ZSwgMCkgKyB0aWNrUGFkZGluZykpO1xuICAgICAgICAgICAgdGV4dC5hdHRyKFwiZHlcIiwgXCIwZW1cIikuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKTtcbiAgICAgICAgICAgIHBhdGhVcGRhdGUuYXR0cihcImRcIiwgXCJNXCIgKyByYW5nZVswXSArIFwiLFwiICsgLXRpY2tFbmRTaXplICsgXCJWMEhcIiArIHJhbmdlWzFdICsgXCJWXCIgKyAtdGlja0VuZFNpemUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRpY2tUcmFuc2Zvcm0gPSBkM19zdmdfYXhpc1k7XG4gICAgICAgICAgICBzdWJ0aWNrRW50ZXIuYXR0cihcIngyXCIsIC10aWNrTWlub3JTaXplKTtcbiAgICAgICAgICAgIHN1YnRpY2tVcGRhdGUuYXR0cihcIngyXCIsIC10aWNrTWlub3JTaXplKS5hdHRyKFwieTJcIiwgMCk7XG4gICAgICAgICAgICBsaW5lRW50ZXIuYXR0cihcIngyXCIsIC10aWNrTWFqb3JTaXplKTtcbiAgICAgICAgICAgIHRleHRFbnRlci5hdHRyKFwieFwiLCAtKE1hdGgubWF4KHRpY2tNYWpvclNpemUsIDApICsgdGlja1BhZGRpbmcpKTtcbiAgICAgICAgICAgIGxpbmVVcGRhdGUuYXR0cihcIngyXCIsIC10aWNrTWFqb3JTaXplKS5hdHRyKFwieTJcIiwgMCk7XG4gICAgICAgICAgICB0ZXh0VXBkYXRlLmF0dHIoXCJ4XCIsIC0oTWF0aC5tYXgodGlja01ham9yU2l6ZSwgMCkgKyB0aWNrUGFkZGluZykpLmF0dHIoXCJ5XCIsIDApO1xuICAgICAgICAgICAgdGV4dC5hdHRyKFwiZHlcIiwgXCIuMzJlbVwiKS5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwiZW5kXCIpO1xuICAgICAgICAgICAgcGF0aFVwZGF0ZS5hdHRyKFwiZFwiLCBcIk1cIiArIC10aWNrRW5kU2l6ZSArIFwiLFwiICsgcmFuZ2VbMF0gKyBcIkgwVlwiICsgcmFuZ2VbMV0gKyBcIkhcIiArIC10aWNrRW5kU2l6ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRpY2tUcmFuc2Zvcm0gPSBkM19zdmdfYXhpc1k7XG4gICAgICAgICAgICBzdWJ0aWNrRW50ZXIuYXR0cihcIngyXCIsIHRpY2tNaW5vclNpemUpO1xuICAgICAgICAgICAgc3VidGlja1VwZGF0ZS5hdHRyKFwieDJcIiwgdGlja01pbm9yU2l6ZSkuYXR0cihcInkyXCIsIDApO1xuICAgICAgICAgICAgbGluZUVudGVyLmF0dHIoXCJ4MlwiLCB0aWNrTWFqb3JTaXplKTtcbiAgICAgICAgICAgIHRleHRFbnRlci5hdHRyKFwieFwiLCBNYXRoLm1heCh0aWNrTWFqb3JTaXplLCAwKSArIHRpY2tQYWRkaW5nKTtcbiAgICAgICAgICAgIGxpbmVVcGRhdGUuYXR0cihcIngyXCIsIHRpY2tNYWpvclNpemUpLmF0dHIoXCJ5MlwiLCAwKTtcbiAgICAgICAgICAgIHRleHRVcGRhdGUuYXR0cihcInhcIiwgTWF0aC5tYXgodGlja01ham9yU2l6ZSwgMCkgKyB0aWNrUGFkZGluZykuYXR0cihcInlcIiwgMCk7XG4gICAgICAgICAgICB0ZXh0LmF0dHIoXCJkeVwiLCBcIi4zMmVtXCIpLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJzdGFydFwiKTtcbiAgICAgICAgICAgIHBhdGhVcGRhdGUuYXR0cihcImRcIiwgXCJNXCIgKyB0aWNrRW5kU2l6ZSArIFwiLFwiICsgcmFuZ2VbMF0gKyBcIkgwVlwiICsgcmFuZ2VbMV0gKyBcIkhcIiArIHRpY2tFbmRTaXplKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NhbGUucmFuZ2VCYW5kKSB7XG4gICAgICAgICAgdmFyIGR4ID0gc2NhbGUxLnJhbmdlQmFuZCgpIC8gMiwgeCA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2FsZTEoZCkgKyBkeDtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRpY2tFbnRlci5jYWxsKHRpY2tUcmFuc2Zvcm0sIHgpO1xuICAgICAgICAgIHRpY2tVcGRhdGUuY2FsbCh0aWNrVHJhbnNmb3JtLCB4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aWNrRW50ZXIuY2FsbCh0aWNrVHJhbnNmb3JtLCBzY2FsZTApO1xuICAgICAgICAgIHRpY2tVcGRhdGUuY2FsbCh0aWNrVHJhbnNmb3JtLCBzY2FsZTEpO1xuICAgICAgICAgIHRpY2tFeGl0LmNhbGwodGlja1RyYW5zZm9ybSwgc2NhbGUxKTtcbiAgICAgICAgICBzdWJ0aWNrRW50ZXIuY2FsbCh0aWNrVHJhbnNmb3JtLCBzY2FsZTApO1xuICAgICAgICAgIHN1YnRpY2tVcGRhdGUuY2FsbCh0aWNrVHJhbnNmb3JtLCBzY2FsZTEpO1xuICAgICAgICAgIHN1YnRpY2tFeGl0LmNhbGwodGlja1RyYW5zZm9ybSwgc2NhbGUxKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGF4aXMuc2NhbGUgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzY2FsZTtcbiAgICAgIHNjYWxlID0geDtcbiAgICAgIHJldHVybiBheGlzO1xuICAgIH07XG4gICAgYXhpcy5vcmllbnQgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvcmllbnQ7XG4gICAgICBvcmllbnQgPSB4IGluIGQzX3N2Z19heGlzT3JpZW50cyA/IHggKyBcIlwiIDogZDNfc3ZnX2F4aXNEZWZhdWx0T3JpZW50O1xuICAgICAgcmV0dXJuIGF4aXM7XG4gICAgfTtcbiAgICBheGlzLnRpY2tzID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aWNrQXJndW1lbnRzXztcbiAgICAgIHRpY2tBcmd1bWVudHNfID0gYXJndW1lbnRzO1xuICAgICAgcmV0dXJuIGF4aXM7XG4gICAgfTtcbiAgICBheGlzLnRpY2tWYWx1ZXMgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aWNrVmFsdWVzO1xuICAgICAgdGlja1ZhbHVlcyA9IHg7XG4gICAgICByZXR1cm4gYXhpcztcbiAgICB9O1xuICAgIGF4aXMudGlja0Zvcm1hdCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRpY2tGb3JtYXRfO1xuICAgICAgdGlja0Zvcm1hdF8gPSB4O1xuICAgICAgcmV0dXJuIGF4aXM7XG4gICAgfTtcbiAgICBheGlzLnRpY2tTaXplID0gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGlja01ham9yU2l6ZTtcbiAgICAgIHZhciBuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gICAgICB0aWNrTWFqb3JTaXplID0gK3g7XG4gICAgICB0aWNrTWlub3JTaXplID0gbiA+IDEgPyAreSA6IHRpY2tNYWpvclNpemU7XG4gICAgICB0aWNrRW5kU2l6ZSA9IG4gPiAwID8gK2FyZ3VtZW50c1tuXSA6IHRpY2tNYWpvclNpemU7XG4gICAgICByZXR1cm4gYXhpcztcbiAgICB9O1xuICAgIGF4aXMudGlja1BhZGRpbmcgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aWNrUGFkZGluZztcbiAgICAgIHRpY2tQYWRkaW5nID0gK3g7XG4gICAgICByZXR1cm4gYXhpcztcbiAgICB9O1xuICAgIGF4aXMudGlja1N1YmRpdmlkZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRpY2tTdWJkaXZpZGU7XG4gICAgICB0aWNrU3ViZGl2aWRlID0gK3g7XG4gICAgICByZXR1cm4gYXhpcztcbiAgICB9O1xuICAgIHJldHVybiBheGlzO1xuICB9O1xuICB2YXIgZDNfc3ZnX2F4aXNEZWZhdWx0T3JpZW50ID0gXCJib3R0b21cIiwgZDNfc3ZnX2F4aXNPcmllbnRzID0ge1xuICAgIHRvcDogMSxcbiAgICByaWdodDogMSxcbiAgICBib3R0b206IDEsXG4gICAgbGVmdDogMVxuICB9O1xuICBmdW5jdGlvbiBkM19zdmdfYXhpc1goc2VsZWN0aW9uLCB4KSB7XG4gICAgc2VsZWN0aW9uLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgeChkKSArIFwiLDApXCI7XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2F4aXNZKHNlbGVjdGlvbiwgeSkge1xuICAgIHNlbGVjdGlvbi5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBcInRyYW5zbGF0ZSgwLFwiICsgeShkKSArIFwiKVwiO1xuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3N2Z19heGlzU3ViZGl2aWRlKHNjYWxlLCB0aWNrcywgbSkge1xuICAgIHN1YnRpY2tzID0gW107XG4gICAgaWYgKG0gJiYgdGlja3MubGVuZ3RoID4gMSkge1xuICAgICAgdmFyIGV4dGVudCA9IGQzX3NjYWxlRXh0ZW50KHNjYWxlLmRvbWFpbigpKSwgc3VidGlja3MsIGkgPSAtMSwgbiA9IHRpY2tzLmxlbmd0aCwgZCA9ICh0aWNrc1sxXSAtIHRpY2tzWzBdKSAvICsrbSwgaiwgdjtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgIGZvciAoaiA9IG07IC0taiA+IDA7ICkge1xuICAgICAgICAgIGlmICgodiA9ICt0aWNrc1tpXSAtIGogKiBkKSA+PSBleHRlbnRbMF0pIHtcbiAgICAgICAgICAgIHN1YnRpY2tzLnB1c2godik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKC0taSwgaiA9IDA7ICsraiA8IG0gJiYgKHYgPSArdGlja3NbaV0gKyBqICogZCkgPCBleHRlbnRbMV07ICkge1xuICAgICAgICBzdWJ0aWNrcy5wdXNoKHYpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3VidGlja3M7XG4gIH1cbiAgZDMuc3ZnLmJydXNoID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGV2ZW50ID0gZDNfZXZlbnREaXNwYXRjaChicnVzaCwgXCJicnVzaHN0YXJ0XCIsIFwiYnJ1c2hcIiwgXCJicnVzaGVuZFwiKSwgeCA9IG51bGwsIHkgPSBudWxsLCByZXNpemVzID0gZDNfc3ZnX2JydXNoUmVzaXplc1swXSwgZXh0ZW50ID0gWyBbIDAsIDAgXSwgWyAwLCAwIF0gXSwgY2xhbXAgPSBbIHRydWUsIHRydWUgXSwgZXh0ZW50RG9tYWluO1xuICAgIGZ1bmN0aW9uIGJydXNoKGcpIHtcbiAgICAgIGcuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGcgPSBkMy5zZWxlY3QodGhpcyksIGJnID0gZy5zZWxlY3RBbGwoXCIuYmFja2dyb3VuZFwiKS5kYXRhKFsgMCBdKSwgZmcgPSBnLnNlbGVjdEFsbChcIi5leHRlbnRcIikuZGF0YShbIDAgXSksIHR6ID0gZy5zZWxlY3RBbGwoXCIucmVzaXplXCIpLmRhdGEocmVzaXplcywgU3RyaW5nKSwgZTtcbiAgICAgICAgZy5zdHlsZShcInBvaW50ZXItZXZlbnRzXCIsIFwiYWxsXCIpLm9uKFwibW91c2Vkb3duLmJydXNoXCIsIGJydXNoc3RhcnQpLm9uKFwidG91Y2hzdGFydC5icnVzaFwiLCBicnVzaHN0YXJ0KTtcbiAgICAgICAgYmcuZW50ZXIoKS5hcHBlbmQoXCJyZWN0XCIpLmF0dHIoXCJjbGFzc1wiLCBcImJhY2tncm91bmRcIikuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpLnN0eWxlKFwiY3Vyc29yXCIsIFwiY3Jvc3NoYWlyXCIpO1xuICAgICAgICBmZy5lbnRlcigpLmFwcGVuZChcInJlY3RcIikuYXR0cihcImNsYXNzXCIsIFwiZXh0ZW50XCIpLnN0eWxlKFwiY3Vyc29yXCIsIFwibW92ZVwiKTtcbiAgICAgICAgdHouZW50ZXIoKS5hcHBlbmQoXCJnXCIpLmF0dHIoXCJjbGFzc1wiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIFwicmVzaXplIFwiICsgZDtcbiAgICAgICAgfSkuc3R5bGUoXCJjdXJzb3JcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBkM19zdmdfYnJ1c2hDdXJzb3JbZF07XG4gICAgICAgIH0pLmFwcGVuZChcInJlY3RcIikuYXR0cihcInhcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiAvW2V3XSQvLnRlc3QoZCkgPyAtMyA6IG51bGw7XG4gICAgICAgIH0pLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4gL15bbnNdLy50ZXN0KGQpID8gLTMgOiBudWxsO1xuICAgICAgICB9KS5hdHRyKFwid2lkdGhcIiwgNikuYXR0cihcImhlaWdodFwiLCA2KS5zdHlsZShcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIik7XG4gICAgICAgIHR6LnN0eWxlKFwiZGlzcGxheVwiLCBicnVzaC5lbXB0eSgpID8gXCJub25lXCIgOiBudWxsKTtcbiAgICAgICAgdHouZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICBpZiAoeCkge1xuICAgICAgICAgIGUgPSBkM19zY2FsZVJhbmdlKHgpO1xuICAgICAgICAgIGJnLmF0dHIoXCJ4XCIsIGVbMF0pLmF0dHIoXCJ3aWR0aFwiLCBlWzFdIC0gZVswXSk7XG4gICAgICAgICAgcmVkcmF3WChnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeSkge1xuICAgICAgICAgIGUgPSBkM19zY2FsZVJhbmdlKHkpO1xuICAgICAgICAgIGJnLmF0dHIoXCJ5XCIsIGVbMF0pLmF0dHIoXCJoZWlnaHRcIiwgZVsxXSAtIGVbMF0pO1xuICAgICAgICAgIHJlZHJhd1koZyk7XG4gICAgICAgIH1cbiAgICAgICAgcmVkcmF3KGcpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlZHJhdyhnKSB7XG4gICAgICBnLnNlbGVjdEFsbChcIi5yZXNpemVcIikuYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBcInRyYW5zbGF0ZShcIiArIGV4dGVudFsrL2UkLy50ZXN0KGQpXVswXSArIFwiLFwiICsgZXh0ZW50WysvXnMvLnRlc3QoZCldWzFdICsgXCIpXCI7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVkcmF3WChnKSB7XG4gICAgICBnLnNlbGVjdChcIi5leHRlbnRcIikuYXR0cihcInhcIiwgZXh0ZW50WzBdWzBdKTtcbiAgICAgIGcuc2VsZWN0QWxsKFwiLmV4dGVudCwubj5yZWN0LC5zPnJlY3RcIikuYXR0cihcIndpZHRoXCIsIGV4dGVudFsxXVswXSAtIGV4dGVudFswXVswXSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlZHJhd1koZykge1xuICAgICAgZy5zZWxlY3QoXCIuZXh0ZW50XCIpLmF0dHIoXCJ5XCIsIGV4dGVudFswXVsxXSk7XG4gICAgICBnLnNlbGVjdEFsbChcIi5leHRlbnQsLmU+cmVjdCwudz5yZWN0XCIpLmF0dHIoXCJoZWlnaHRcIiwgZXh0ZW50WzFdWzFdIC0gZXh0ZW50WzBdWzFdKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYnJ1c2hzdGFydCgpIHtcbiAgICAgIHZhciB0YXJnZXQgPSB0aGlzLCBldmVudFRhcmdldCA9IGQzLnNlbGVjdChkMy5ldmVudC50YXJnZXQpLCBldmVudF8gPSBldmVudC5vZih0YXJnZXQsIGFyZ3VtZW50cyksIGcgPSBkMy5zZWxlY3QodGFyZ2V0KSwgcmVzaXppbmcgPSBldmVudFRhcmdldC5kYXR1bSgpLCByZXNpemluZ1ggPSAhL14obnxzKSQvLnRlc3QocmVzaXppbmcpICYmIHgsIHJlc2l6aW5nWSA9ICEvXihlfHcpJC8udGVzdChyZXNpemluZykgJiYgeSwgZHJhZ2dpbmcgPSBldmVudFRhcmdldC5jbGFzc2VkKFwiZXh0ZW50XCIpLCBkcmFnUmVzdG9yZSA9IGQzX2V2ZW50X2RyYWdTdXBwcmVzcygpLCBjZW50ZXIsIG9yaWdpbiA9IG1vdXNlKCksIG9mZnNldDtcbiAgICAgIHZhciB3ID0gZDMuc2VsZWN0KGQzX3dpbmRvdykub24oXCJrZXlkb3duLmJydXNoXCIsIGtleWRvd24pLm9uKFwia2V5dXAuYnJ1c2hcIiwga2V5dXApO1xuICAgICAgaWYgKGQzLmV2ZW50LmNoYW5nZWRUb3VjaGVzKSB7XG4gICAgICAgIHcub24oXCJ0b3VjaG1vdmUuYnJ1c2hcIiwgYnJ1c2htb3ZlKS5vbihcInRvdWNoZW5kLmJydXNoXCIsIGJydXNoZW5kKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHcub24oXCJtb3VzZW1vdmUuYnJ1c2hcIiwgYnJ1c2htb3ZlKS5vbihcIm1vdXNldXAuYnJ1c2hcIiwgYnJ1c2hlbmQpO1xuICAgICAgfVxuICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgIG9yaWdpblswXSA9IGV4dGVudFswXVswXSAtIG9yaWdpblswXTtcbiAgICAgICAgb3JpZ2luWzFdID0gZXh0ZW50WzBdWzFdIC0gb3JpZ2luWzFdO1xuICAgICAgfSBlbHNlIGlmIChyZXNpemluZykge1xuICAgICAgICB2YXIgZXggPSArL3ckLy50ZXN0KHJlc2l6aW5nKSwgZXkgPSArL15uLy50ZXN0KHJlc2l6aW5nKTtcbiAgICAgICAgb2Zmc2V0ID0gWyBleHRlbnRbMSAtIGV4XVswXSAtIG9yaWdpblswXSwgZXh0ZW50WzEgLSBleV1bMV0gLSBvcmlnaW5bMV0gXTtcbiAgICAgICAgb3JpZ2luWzBdID0gZXh0ZW50W2V4XVswXTtcbiAgICAgICAgb3JpZ2luWzFdID0gZXh0ZW50W2V5XVsxXTtcbiAgICAgIH0gZWxzZSBpZiAoZDMuZXZlbnQuYWx0S2V5KSBjZW50ZXIgPSBvcmlnaW4uc2xpY2UoKTtcbiAgICAgIGcuc3R5bGUoXCJwb2ludGVyLWV2ZW50c1wiLCBcIm5vbmVcIikuc2VsZWN0QWxsKFwiLnJlc2l6ZVwiKS5zdHlsZShcImRpc3BsYXlcIiwgbnVsbCk7XG4gICAgICBkMy5zZWxlY3QoXCJib2R5XCIpLnN0eWxlKFwiY3Vyc29yXCIsIGV2ZW50VGFyZ2V0LnN0eWxlKFwiY3Vyc29yXCIpKTtcbiAgICAgIGV2ZW50Xyh7XG4gICAgICAgIHR5cGU6IFwiYnJ1c2hzdGFydFwiXG4gICAgICB9KTtcbiAgICAgIGJydXNobW92ZSgpO1xuICAgICAgZnVuY3Rpb24gbW91c2UoKSB7XG4gICAgICAgIHZhciB0b3VjaGVzID0gZDMuZXZlbnQuY2hhbmdlZFRvdWNoZXM7XG4gICAgICAgIHJldHVybiB0b3VjaGVzID8gZDMudG91Y2hlcyh0YXJnZXQsIHRvdWNoZXMpWzBdIDogZDMubW91c2UodGFyZ2V0KTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGtleWRvd24oKSB7XG4gICAgICAgIGlmIChkMy5ldmVudC5rZXlDb2RlID09IDMyKSB7XG4gICAgICAgICAgaWYgKCFkcmFnZ2luZykge1xuICAgICAgICAgICAgY2VudGVyID0gbnVsbDtcbiAgICAgICAgICAgIG9yaWdpblswXSAtPSBleHRlbnRbMV1bMF07XG4gICAgICAgICAgICBvcmlnaW5bMV0gLT0gZXh0ZW50WzFdWzFdO1xuICAgICAgICAgICAgZHJhZ2dpbmcgPSAyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkM19ldmVudFByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGtleXVwKCkge1xuICAgICAgICBpZiAoZDMuZXZlbnQua2V5Q29kZSA9PSAzMiAmJiBkcmFnZ2luZyA9PSAyKSB7XG4gICAgICAgICAgb3JpZ2luWzBdICs9IGV4dGVudFsxXVswXTtcbiAgICAgICAgICBvcmlnaW5bMV0gKz0gZXh0ZW50WzFdWzFdO1xuICAgICAgICAgIGRyYWdnaW5nID0gMDtcbiAgICAgICAgICBkM19ldmVudFByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGJydXNobW92ZSgpIHtcbiAgICAgICAgdmFyIHBvaW50ID0gbW91c2UoKSwgbW92ZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKG9mZnNldCkge1xuICAgICAgICAgIHBvaW50WzBdICs9IG9mZnNldFswXTtcbiAgICAgICAgICBwb2ludFsxXSArPSBvZmZzZXRbMV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkcmFnZ2luZykge1xuICAgICAgICAgIGlmIChkMy5ldmVudC5hbHRLZXkpIHtcbiAgICAgICAgICAgIGlmICghY2VudGVyKSBjZW50ZXIgPSBbIChleHRlbnRbMF1bMF0gKyBleHRlbnRbMV1bMF0pIC8gMiwgKGV4dGVudFswXVsxXSArIGV4dGVudFsxXVsxXSkgLyAyIF07XG4gICAgICAgICAgICBvcmlnaW5bMF0gPSBleHRlbnRbKyhwb2ludFswXSA8IGNlbnRlclswXSldWzBdO1xuICAgICAgICAgICAgb3JpZ2luWzFdID0gZXh0ZW50WysocG9pbnRbMV0gPCBjZW50ZXJbMV0pXVsxXTtcbiAgICAgICAgICB9IGVsc2UgY2VudGVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzaXppbmdYICYmIG1vdmUxKHBvaW50LCB4LCAwKSkge1xuICAgICAgICAgIHJlZHJhd1goZyk7XG4gICAgICAgICAgbW92ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXNpemluZ1kgJiYgbW92ZTEocG9pbnQsIHksIDEpKSB7XG4gICAgICAgICAgcmVkcmF3WShnKTtcbiAgICAgICAgICBtb3ZlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1vdmVkKSB7XG4gICAgICAgICAgcmVkcmF3KGcpO1xuICAgICAgICAgIGV2ZW50Xyh7XG4gICAgICAgICAgICB0eXBlOiBcImJydXNoXCIsXG4gICAgICAgICAgICBtb2RlOiBkcmFnZ2luZyA/IFwibW92ZVwiIDogXCJyZXNpemVcIlxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBtb3ZlMShwb2ludCwgc2NhbGUsIGkpIHtcbiAgICAgICAgdmFyIHJhbmdlID0gZDNfc2NhbGVSYW5nZShzY2FsZSksIHIwID0gcmFuZ2VbMF0sIHIxID0gcmFuZ2VbMV0sIHBvc2l0aW9uID0gb3JpZ2luW2ldLCBzaXplID0gZXh0ZW50WzFdW2ldIC0gZXh0ZW50WzBdW2ldLCBtaW4sIG1heDtcbiAgICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgICAgcjAgLT0gcG9zaXRpb247XG4gICAgICAgICAgcjEgLT0gc2l6ZSArIHBvc2l0aW9uO1xuICAgICAgICB9XG4gICAgICAgIG1pbiA9IGNsYW1wW2ldID8gTWF0aC5tYXgocjAsIE1hdGgubWluKHIxLCBwb2ludFtpXSkpIDogcG9pbnRbaV07XG4gICAgICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgICAgIG1heCA9IChtaW4gKz0gcG9zaXRpb24pICsgc2l6ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoY2VudGVyKSBwb3NpdGlvbiA9IE1hdGgubWF4KHIwLCBNYXRoLm1pbihyMSwgMiAqIGNlbnRlcltpXSAtIG1pbikpO1xuICAgICAgICAgIGlmIChwb3NpdGlvbiA8IG1pbikge1xuICAgICAgICAgICAgbWF4ID0gbWluO1xuICAgICAgICAgICAgbWluID0gcG9zaXRpb247XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1heCA9IHBvc2l0aW9uO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXh0ZW50WzBdW2ldICE9PSBtaW4gfHwgZXh0ZW50WzFdW2ldICE9PSBtYXgpIHtcbiAgICAgICAgICBleHRlbnREb21haW4gPSBudWxsO1xuICAgICAgICAgIGV4dGVudFswXVtpXSA9IG1pbjtcbiAgICAgICAgICBleHRlbnRbMV1baV0gPSBtYXg7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGJydXNoZW5kKCkge1xuICAgICAgICBicnVzaG1vdmUoKTtcbiAgICAgICAgZy5zdHlsZShcInBvaW50ZXItZXZlbnRzXCIsIFwiYWxsXCIpLnNlbGVjdEFsbChcIi5yZXNpemVcIikuc3R5bGUoXCJkaXNwbGF5XCIsIGJydXNoLmVtcHR5KCkgPyBcIm5vbmVcIiA6IG51bGwpO1xuICAgICAgICBkMy5zZWxlY3QoXCJib2R5XCIpLnN0eWxlKFwiY3Vyc29yXCIsIG51bGwpO1xuICAgICAgICB3Lm9uKFwibW91c2Vtb3ZlLmJydXNoXCIsIG51bGwpLm9uKFwibW91c2V1cC5icnVzaFwiLCBudWxsKS5vbihcInRvdWNobW92ZS5icnVzaFwiLCBudWxsKS5vbihcInRvdWNoZW5kLmJydXNoXCIsIG51bGwpLm9uKFwia2V5ZG93bi5icnVzaFwiLCBudWxsKS5vbihcImtleXVwLmJydXNoXCIsIG51bGwpO1xuICAgICAgICBkcmFnUmVzdG9yZSgpO1xuICAgICAgICBldmVudF8oe1xuICAgICAgICAgIHR5cGU6IFwiYnJ1c2hlbmRcIlxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgYnJ1c2gueCA9IGZ1bmN0aW9uKHopIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHg7XG4gICAgICB4ID0gejtcbiAgICAgIHJlc2l6ZXMgPSBkM19zdmdfYnJ1c2hSZXNpemVzWyF4IDw8IDEgfCAheV07XG4gICAgICByZXR1cm4gYnJ1c2g7XG4gICAgfTtcbiAgICBicnVzaC55ID0gZnVuY3Rpb24oeikge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4geTtcbiAgICAgIHkgPSB6O1xuICAgICAgcmVzaXplcyA9IGQzX3N2Z19icnVzaFJlc2l6ZXNbIXggPDwgMSB8ICF5XTtcbiAgICAgIHJldHVybiBicnVzaDtcbiAgICB9O1xuICAgIGJydXNoLmNsYW1wID0gZnVuY3Rpb24oeikge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4geCAmJiB5ID8gY2xhbXAgOiB4IHx8IHkgPyBjbGFtcFsrIXhdIDogbnVsbDtcbiAgICAgIGlmICh4ICYmIHkpIGNsYW1wID0gWyAhIXpbMF0sICEhelsxXSBdOyBlbHNlIGlmICh4IHx8IHkpIGNsYW1wWysheF0gPSAhIXo7XG4gICAgICByZXR1cm4gYnJ1c2g7XG4gICAgfTtcbiAgICBicnVzaC5leHRlbnQgPSBmdW5jdGlvbih6KSB7XG4gICAgICB2YXIgeDAsIHgxLCB5MCwgeTEsIHQ7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgeiA9IGV4dGVudERvbWFpbiB8fCBleHRlbnQ7XG4gICAgICAgIGlmICh4KSB7XG4gICAgICAgICAgeDAgPSB6WzBdWzBdLCB4MSA9IHpbMV1bMF07XG4gICAgICAgICAgaWYgKCFleHRlbnREb21haW4pIHtcbiAgICAgICAgICAgIHgwID0gZXh0ZW50WzBdWzBdLCB4MSA9IGV4dGVudFsxXVswXTtcbiAgICAgICAgICAgIGlmICh4LmludmVydCkgeDAgPSB4LmludmVydCh4MCksIHgxID0geC5pbnZlcnQoeDEpO1xuICAgICAgICAgICAgaWYgKHgxIDwgeDApIHQgPSB4MCwgeDAgPSB4MSwgeDEgPSB0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoeSkge1xuICAgICAgICAgIHkwID0gelswXVsxXSwgeTEgPSB6WzFdWzFdO1xuICAgICAgICAgIGlmICghZXh0ZW50RG9tYWluKSB7XG4gICAgICAgICAgICB5MCA9IGV4dGVudFswXVsxXSwgeTEgPSBleHRlbnRbMV1bMV07XG4gICAgICAgICAgICBpZiAoeS5pbnZlcnQpIHkwID0geS5pbnZlcnQoeTApLCB5MSA9IHkuaW52ZXJ0KHkxKTtcbiAgICAgICAgICAgIGlmICh5MSA8IHkwKSB0ID0geTAsIHkwID0geTEsIHkxID0gdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHggJiYgeSA/IFsgWyB4MCwgeTAgXSwgWyB4MSwgeTEgXSBdIDogeCA/IFsgeDAsIHgxIF0gOiB5ICYmIFsgeTAsIHkxIF07XG4gICAgICB9XG4gICAgICBleHRlbnREb21haW4gPSBbIFsgMCwgMCBdLCBbIDAsIDAgXSBdO1xuICAgICAgaWYgKHgpIHtcbiAgICAgICAgeDAgPSB6WzBdLCB4MSA9IHpbMV07XG4gICAgICAgIGlmICh5KSB4MCA9IHgwWzBdLCB4MSA9IHgxWzBdO1xuICAgICAgICBleHRlbnREb21haW5bMF1bMF0gPSB4MCwgZXh0ZW50RG9tYWluWzFdWzBdID0geDE7XG4gICAgICAgIGlmICh4LmludmVydCkgeDAgPSB4KHgwKSwgeDEgPSB4KHgxKTtcbiAgICAgICAgaWYgKHgxIDwgeDApIHQgPSB4MCwgeDAgPSB4MSwgeDEgPSB0O1xuICAgICAgICBleHRlbnRbMF1bMF0gPSB4MCB8IDAsIGV4dGVudFsxXVswXSA9IHgxIHwgMDtcbiAgICAgIH1cbiAgICAgIGlmICh5KSB7XG4gICAgICAgIHkwID0gelswXSwgeTEgPSB6WzFdO1xuICAgICAgICBpZiAoeCkgeTAgPSB5MFsxXSwgeTEgPSB5MVsxXTtcbiAgICAgICAgZXh0ZW50RG9tYWluWzBdWzFdID0geTAsIGV4dGVudERvbWFpblsxXVsxXSA9IHkxO1xuICAgICAgICBpZiAoeS5pbnZlcnQpIHkwID0geSh5MCksIHkxID0geSh5MSk7XG4gICAgICAgIGlmICh5MSA8IHkwKSB0ID0geTAsIHkwID0geTEsIHkxID0gdDtcbiAgICAgICAgZXh0ZW50WzBdWzFdID0geTAgfCAwLCBleHRlbnRbMV1bMV0gPSB5MSB8IDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gYnJ1c2g7XG4gICAgfTtcbiAgICBicnVzaC5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgICAgZXh0ZW50RG9tYWluID0gbnVsbDtcbiAgICAgIGV4dGVudFswXVswXSA9IGV4dGVudFswXVsxXSA9IGV4dGVudFsxXVswXSA9IGV4dGVudFsxXVsxXSA9IDA7XG4gICAgICByZXR1cm4gYnJ1c2g7XG4gICAgfTtcbiAgICBicnVzaC5lbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHggJiYgZXh0ZW50WzBdWzBdID09PSBleHRlbnRbMV1bMF0gfHwgeSAmJiBleHRlbnRbMF1bMV0gPT09IGV4dGVudFsxXVsxXTtcbiAgICB9O1xuICAgIHJldHVybiBkMy5yZWJpbmQoYnJ1c2gsIGV2ZW50LCBcIm9uXCIpO1xuICB9O1xuICB2YXIgZDNfc3ZnX2JydXNoQ3Vyc29yID0ge1xuICAgIG46IFwibnMtcmVzaXplXCIsXG4gICAgZTogXCJldy1yZXNpemVcIixcbiAgICBzOiBcIm5zLXJlc2l6ZVwiLFxuICAgIHc6IFwiZXctcmVzaXplXCIsXG4gICAgbnc6IFwibndzZS1yZXNpemVcIixcbiAgICBuZTogXCJuZXN3LXJlc2l6ZVwiLFxuICAgIHNlOiBcIm53c2UtcmVzaXplXCIsXG4gICAgc3c6IFwibmVzdy1yZXNpemVcIlxuICB9O1xuICB2YXIgZDNfc3ZnX2JydXNoUmVzaXplcyA9IFsgWyBcIm5cIiwgXCJlXCIsIFwic1wiLCBcIndcIiwgXCJud1wiLCBcIm5lXCIsIFwic2VcIiwgXCJzd1wiIF0sIFsgXCJlXCIsIFwid1wiIF0sIFsgXCJuXCIsIFwic1wiIF0sIFtdIF07XG4gIGQzLnRpbWUgPSB7fTtcbiAgdmFyIGQzX3RpbWUgPSBEYXRlLCBkM190aW1lX2RheVN5bWJvbHMgPSBbIFwiU3VuZGF5XCIsIFwiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsIFwiRnJpZGF5XCIsIFwiU2F0dXJkYXlcIiBdO1xuICBmdW5jdGlvbiBkM190aW1lX3V0YygpIHtcbiAgICB0aGlzLl8gPSBuZXcgRGF0ZShhcmd1bWVudHMubGVuZ3RoID4gMSA/IERhdGUuVVRDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiBhcmd1bWVudHNbMF0pO1xuICB9XG4gIGQzX3RpbWVfdXRjLnByb3RvdHlwZSA9IHtcbiAgICBnZXREYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl8uZ2V0VVRDRGF0ZSgpO1xuICAgIH0sXG4gICAgZ2V0RGF5OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl8uZ2V0VVRDRGF5KCk7XG4gICAgfSxcbiAgICBnZXRGdWxsWWVhcjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fLmdldFVUQ0Z1bGxZZWFyKCk7XG4gICAgfSxcbiAgICBnZXRIb3VyczogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fLmdldFVUQ0hvdXJzKCk7XG4gICAgfSxcbiAgICBnZXRNaWxsaXNlY29uZHM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuXy5nZXRVVENNaWxsaXNlY29uZHMoKTtcbiAgICB9LFxuICAgIGdldE1pbnV0ZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuXy5nZXRVVENNaW51dGVzKCk7XG4gICAgfSxcbiAgICBnZXRNb250aDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fLmdldFVUQ01vbnRoKCk7XG4gICAgfSxcbiAgICBnZXRTZWNvbmRzOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl8uZ2V0VVRDU2Vjb25kcygpO1xuICAgIH0sXG4gICAgZ2V0VGltZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fLmdldFRpbWUoKTtcbiAgICB9LFxuICAgIGdldFRpbWV6b25lT2Zmc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0sXG4gICAgdmFsdWVPZjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fLnZhbHVlT2YoKTtcbiAgICB9LFxuICAgIHNldERhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgZDNfdGltZV9wcm90b3R5cGUuc2V0VVRDRGF0ZS5hcHBseSh0aGlzLl8sIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICBzZXREYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgZDNfdGltZV9wcm90b3R5cGUuc2V0VVRDRGF5LmFwcGx5KHRoaXMuXywgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIHNldEZ1bGxZZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgIGQzX3RpbWVfcHJvdG90eXBlLnNldFVUQ0Z1bGxZZWFyLmFwcGx5KHRoaXMuXywgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIHNldEhvdXJzOiBmdW5jdGlvbigpIHtcbiAgICAgIGQzX3RpbWVfcHJvdG90eXBlLnNldFVUQ0hvdXJzLmFwcGx5KHRoaXMuXywgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIHNldE1pbGxpc2Vjb25kczogZnVuY3Rpb24oKSB7XG4gICAgICBkM190aW1lX3Byb3RvdHlwZS5zZXRVVENNaWxsaXNlY29uZHMuYXBwbHkodGhpcy5fLCBhcmd1bWVudHMpO1xuICAgIH0sXG4gICAgc2V0TWludXRlczogZnVuY3Rpb24oKSB7XG4gICAgICBkM190aW1lX3Byb3RvdHlwZS5zZXRVVENNaW51dGVzLmFwcGx5KHRoaXMuXywgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIHNldE1vbnRoOiBmdW5jdGlvbigpIHtcbiAgICAgIGQzX3RpbWVfcHJvdG90eXBlLnNldFVUQ01vbnRoLmFwcGx5KHRoaXMuXywgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIHNldFNlY29uZHM6IGZ1bmN0aW9uKCkge1xuICAgICAgZDNfdGltZV9wcm90b3R5cGUuc2V0VVRDU2Vjb25kcy5hcHBseSh0aGlzLl8sIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICBzZXRUaW1lOiBmdW5jdGlvbigpIHtcbiAgICAgIGQzX3RpbWVfcHJvdG90eXBlLnNldFRpbWUuYXBwbHkodGhpcy5fLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfTtcbiAgdmFyIGQzX3RpbWVfcHJvdG90eXBlID0gRGF0ZS5wcm90b3R5cGU7XG4gIHZhciBkM190aW1lX2Zvcm1hdERhdGVUaW1lID0gXCIlYSAlYiAlZSAlWCAlWVwiLCBkM190aW1lX2Zvcm1hdERhdGUgPSBcIiVtLyVkLyVZXCIsIGQzX3RpbWVfZm9ybWF0VGltZSA9IFwiJUg6JU06JVNcIjtcbiAgdmFyIGQzX3RpbWVfZGF5cyA9IFsgXCJTdW5kYXlcIiwgXCJNb25kYXlcIiwgXCJUdWVzZGF5XCIsIFwiV2VkbmVzZGF5XCIsIFwiVGh1cnNkYXlcIiwgXCJGcmlkYXlcIiwgXCJTYXR1cmRheVwiIF0sIGQzX3RpbWVfZGF5QWJicmV2aWF0aW9ucyA9IFsgXCJTdW5cIiwgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIiBdLCBkM190aW1lX21vbnRocyA9IFsgXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiIF0sIGQzX3RpbWVfbW9udGhBYmJyZXZpYXRpb25zID0gWyBcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiIF07XG4gIGZ1bmN0aW9uIGQzX3RpbWVfaW50ZXJ2YWwobG9jYWwsIHN0ZXAsIG51bWJlcikge1xuICAgIGZ1bmN0aW9uIHJvdW5kKGRhdGUpIHtcbiAgICAgIHZhciBkMCA9IGxvY2FsKGRhdGUpLCBkMSA9IG9mZnNldChkMCwgMSk7XG4gICAgICByZXR1cm4gZGF0ZSAtIGQwIDwgZDEgLSBkYXRlID8gZDAgOiBkMTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2VpbChkYXRlKSB7XG4gICAgICBzdGVwKGRhdGUgPSBsb2NhbChuZXcgZDNfdGltZShkYXRlIC0gMSkpLCAxKTtcbiAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvZmZzZXQoZGF0ZSwgaykge1xuICAgICAgc3RlcChkYXRlID0gbmV3IGQzX3RpbWUoK2RhdGUpLCBrKTtcbiAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbiAgICBmdW5jdGlvbiByYW5nZSh0MCwgdDEsIGR0KSB7XG4gICAgICB2YXIgdGltZSA9IGNlaWwodDApLCB0aW1lcyA9IFtdO1xuICAgICAgaWYgKGR0ID4gMSkge1xuICAgICAgICB3aGlsZSAodGltZSA8IHQxKSB7XG4gICAgICAgICAgaWYgKCEobnVtYmVyKHRpbWUpICUgZHQpKSB0aW1lcy5wdXNoKG5ldyBEYXRlKCt0aW1lKSk7XG4gICAgICAgICAgc3RlcCh0aW1lLCAxKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2hpbGUgKHRpbWUgPCB0MSkgdGltZXMucHVzaChuZXcgRGF0ZSgrdGltZSkpLCBzdGVwKHRpbWUsIDEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRpbWVzO1xuICAgIH1cbiAgICBmdW5jdGlvbiByYW5nZV91dGModDAsIHQxLCBkdCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZDNfdGltZSA9IGQzX3RpbWVfdXRjO1xuICAgICAgICB2YXIgdXRjID0gbmV3IGQzX3RpbWVfdXRjKCk7XG4gICAgICAgIHV0Yy5fID0gdDA7XG4gICAgICAgIHJldHVybiByYW5nZSh1dGMsIHQxLCBkdCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBkM190aW1lID0gRGF0ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgbG9jYWwuZmxvb3IgPSBsb2NhbDtcbiAgICBsb2NhbC5yb3VuZCA9IHJvdW5kO1xuICAgIGxvY2FsLmNlaWwgPSBjZWlsO1xuICAgIGxvY2FsLm9mZnNldCA9IG9mZnNldDtcbiAgICBsb2NhbC5yYW5nZSA9IHJhbmdlO1xuICAgIHZhciB1dGMgPSBsb2NhbC51dGMgPSBkM190aW1lX2ludGVydmFsX3V0Yyhsb2NhbCk7XG4gICAgdXRjLmZsb29yID0gdXRjO1xuICAgIHV0Yy5yb3VuZCA9IGQzX3RpbWVfaW50ZXJ2YWxfdXRjKHJvdW5kKTtcbiAgICB1dGMuY2VpbCA9IGQzX3RpbWVfaW50ZXJ2YWxfdXRjKGNlaWwpO1xuICAgIHV0Yy5vZmZzZXQgPSBkM190aW1lX2ludGVydmFsX3V0YyhvZmZzZXQpO1xuICAgIHV0Yy5yYW5nZSA9IHJhbmdlX3V0YztcbiAgICByZXR1cm4gbG9jYWw7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZV9pbnRlcnZhbF91dGMobWV0aG9kKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGRhdGUsIGspIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGQzX3RpbWUgPSBkM190aW1lX3V0YztcbiAgICAgICAgdmFyIHV0YyA9IG5ldyBkM190aW1lX3V0YygpO1xuICAgICAgICB1dGMuXyA9IGRhdGU7XG4gICAgICAgIHJldHVybiBtZXRob2QodXRjLCBrKS5fO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgZDNfdGltZSA9IERhdGU7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBkMy50aW1lLnllYXIgPSBkM190aW1lX2ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlID0gZDMudGltZS5kYXkoZGF0ZSk7XG4gICAgZGF0ZS5zZXRNb250aCgwLCAxKTtcbiAgICByZXR1cm4gZGF0ZTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgb2Zmc2V0KSB7XG4gICAgZGF0ZS5zZXRGdWxsWWVhcihkYXRlLmdldEZ1bGxZZWFyKCkgKyBvZmZzZXQpO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgfSk7XG4gIGQzLnRpbWUueWVhcnMgPSBkMy50aW1lLnllYXIucmFuZ2U7XG4gIGQzLnRpbWUueWVhcnMudXRjID0gZDMudGltZS55ZWFyLnV0Yy5yYW5nZTtcbiAgZDMudGltZS5kYXkgPSBkM190aW1lX2ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICB2YXIgZGF5ID0gbmV3IGQzX3RpbWUoMmUzLCAwKTtcbiAgICBkYXkuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcbiAgICByZXR1cm4gZGF5O1xuICB9LCBmdW5jdGlvbihkYXRlLCBvZmZzZXQpIHtcbiAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyBvZmZzZXQpO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0RGF0ZSgpIC0gMTtcbiAgfSk7XG4gIGQzLnRpbWUuZGF5cyA9IGQzLnRpbWUuZGF5LnJhbmdlO1xuICBkMy50aW1lLmRheXMudXRjID0gZDMudGltZS5kYXkudXRjLnJhbmdlO1xuICBkMy50aW1lLmRheU9mWWVhciA9IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICB2YXIgeWVhciA9IGQzLnRpbWUueWVhcihkYXRlKTtcbiAgICByZXR1cm4gTWF0aC5mbG9vcigoZGF0ZSAtIHllYXIgLSAoZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpIC0geWVhci5nZXRUaW1lem9uZU9mZnNldCgpKSAqIDZlNCkgLyA4NjRlNSk7XG4gIH07XG4gIGQzX3RpbWVfZGF5U3ltYm9scy5mb3JFYWNoKGZ1bmN0aW9uKGRheSwgaSkge1xuICAgIGRheSA9IGRheS50b0xvd2VyQ2FzZSgpO1xuICAgIGkgPSA3IC0gaTtcbiAgICB2YXIgaW50ZXJ2YWwgPSBkMy50aW1lW2RheV0gPSBkM190aW1lX2ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIChkYXRlID0gZDMudGltZS5kYXkoZGF0ZSkpLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgLSAoZGF0ZS5nZXREYXkoKSArIGkpICUgNyk7XG4gICAgICByZXR1cm4gZGF0ZTtcbiAgICB9LCBmdW5jdGlvbihkYXRlLCBvZmZzZXQpIHtcbiAgICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIE1hdGguZmxvb3Iob2Zmc2V0KSAqIDcpO1xuICAgIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIHZhciBkYXkgPSBkMy50aW1lLnllYXIoZGF0ZSkuZ2V0RGF5KCk7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcigoZDMudGltZS5kYXlPZlllYXIoZGF0ZSkgKyAoZGF5ICsgaSkgJSA3KSAvIDcpIC0gKGRheSAhPT0gaSk7XG4gICAgfSk7XG4gICAgZDMudGltZVtkYXkgKyBcInNcIl0gPSBpbnRlcnZhbC5yYW5nZTtcbiAgICBkMy50aW1lW2RheSArIFwic1wiXS51dGMgPSBpbnRlcnZhbC51dGMucmFuZ2U7XG4gICAgZDMudGltZVtkYXkgKyBcIk9mWWVhclwiXSA9IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIHZhciBkYXkgPSBkMy50aW1lLnllYXIoZGF0ZSkuZ2V0RGF5KCk7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcigoZDMudGltZS5kYXlPZlllYXIoZGF0ZSkgKyAoZGF5ICsgaSkgJSA3KSAvIDcpO1xuICAgIH07XG4gIH0pO1xuICBkMy50aW1lLndlZWsgPSBkMy50aW1lLnN1bmRheTtcbiAgZDMudGltZS53ZWVrcyA9IGQzLnRpbWUuc3VuZGF5LnJhbmdlO1xuICBkMy50aW1lLndlZWtzLnV0YyA9IGQzLnRpbWUuc3VuZGF5LnV0Yy5yYW5nZTtcbiAgZDMudGltZS53ZWVrT2ZZZWFyID0gZDMudGltZS5zdW5kYXlPZlllYXI7XG4gIGQzLnRpbWUuZm9ybWF0ID0gZnVuY3Rpb24odGVtcGxhdGUpIHtcbiAgICB2YXIgbiA9IHRlbXBsYXRlLmxlbmd0aDtcbiAgICBmdW5jdGlvbiBmb3JtYXQoZGF0ZSkge1xuICAgICAgdmFyIHN0cmluZyA9IFtdLCBpID0gLTEsIGogPSAwLCBjLCBwLCBmO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgaWYgKHRlbXBsYXRlLmNoYXJDb2RlQXQoaSkgPT09IDM3KSB7XG4gICAgICAgICAgc3RyaW5nLnB1c2godGVtcGxhdGUuc3Vic3RyaW5nKGosIGkpKTtcbiAgICAgICAgICBpZiAoKHAgPSBkM190aW1lX2Zvcm1hdFBhZHNbYyA9IHRlbXBsYXRlLmNoYXJBdCgrK2kpXSkgIT0gbnVsbCkgYyA9IHRlbXBsYXRlLmNoYXJBdCgrK2kpO1xuICAgICAgICAgIGlmIChmID0gZDNfdGltZV9mb3JtYXRzW2NdKSBjID0gZihkYXRlLCBwID09IG51bGwgPyBjID09PSBcImVcIiA/IFwiIFwiIDogXCIwXCIgOiBwKTtcbiAgICAgICAgICBzdHJpbmcucHVzaChjKTtcbiAgICAgICAgICBqID0gaSArIDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHN0cmluZy5wdXNoKHRlbXBsYXRlLnN1YnN0cmluZyhqLCBpKSk7XG4gICAgICByZXR1cm4gc3RyaW5nLmpvaW4oXCJcIik7XG4gICAgfVxuICAgIGZvcm1hdC5wYXJzZSA9IGZ1bmN0aW9uKHN0cmluZykge1xuICAgICAgdmFyIGQgPSB7XG4gICAgICAgIHk6IDE5MDAsXG4gICAgICAgIG06IDAsXG4gICAgICAgIGQ6IDEsXG4gICAgICAgIEg6IDAsXG4gICAgICAgIE06IDAsXG4gICAgICAgIFM6IDAsXG4gICAgICAgIEw6IDBcbiAgICAgIH0sIGkgPSBkM190aW1lX3BhcnNlKGQsIHRlbXBsYXRlLCBzdHJpbmcsIDApO1xuICAgICAgaWYgKGkgIT0gc3RyaW5nLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgICBpZiAoXCJwXCIgaW4gZCkgZC5IID0gZC5IICUgMTIgKyBkLnAgKiAxMjtcbiAgICAgIHZhciBkYXRlID0gbmV3IGQzX3RpbWUoKTtcbiAgICAgIGlmIChcImpcIiBpbiBkKSBkYXRlLnNldEZ1bGxZZWFyKGQueSwgMCwgZC5qKTsgZWxzZSBpZiAoXCJ3XCIgaW4gZCAmJiAoXCJXXCIgaW4gZCB8fCBcIlVcIiBpbiBkKSkge1xuICAgICAgICBkYXRlLnNldEZ1bGxZZWFyKGQueSwgMCwgMSk7XG4gICAgICAgIGRhdGUuc2V0RnVsbFllYXIoZC55LCAwLCBcIldcIiBpbiBkID8gKGQudyArIDYpICUgNyArIGQuVyAqIDcgLSAoZGF0ZS5nZXREYXkoKSArIDUpICUgNyA6IGQudyArIGQuVSAqIDcgLSAoZGF0ZS5nZXREYXkoKSArIDYpICUgNyk7XG4gICAgICB9IGVsc2UgZGF0ZS5zZXRGdWxsWWVhcihkLnksIGQubSwgZC5kKTtcbiAgICAgIGRhdGUuc2V0SG91cnMoZC5ILCBkLk0sIGQuUywgZC5MKTtcbiAgICAgIHJldHVybiBkYXRlO1xuICAgIH07XG4gICAgZm9ybWF0LnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfTtcbiAgICByZXR1cm4gZm9ybWF0O1xuICB9O1xuICBmdW5jdGlvbiBkM190aW1lX3BhcnNlKGRhdGUsIHRlbXBsYXRlLCBzdHJpbmcsIGopIHtcbiAgICB2YXIgYywgcCwgaSA9IDAsIG4gPSB0ZW1wbGF0ZS5sZW5ndGgsIG0gPSBzdHJpbmcubGVuZ3RoO1xuICAgIHdoaWxlIChpIDwgbikge1xuICAgICAgaWYgKGogPj0gbSkgcmV0dXJuIC0xO1xuICAgICAgYyA9IHRlbXBsYXRlLmNoYXJDb2RlQXQoaSsrKTtcbiAgICAgIGlmIChjID09PSAzNykge1xuICAgICAgICBwID0gZDNfdGltZV9wYXJzZXJzW3RlbXBsYXRlLmNoYXJBdChpKyspXTtcbiAgICAgICAgaWYgKCFwIHx8IChqID0gcChkYXRlLCBzdHJpbmcsIGopKSA8IDApIHJldHVybiAtMTtcbiAgICAgIH0gZWxzZSBpZiAoYyAhPSBzdHJpbmcuY2hhckNvZGVBdChqKyspKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGo7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZV9mb3JtYXRSZShuYW1lcykge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKFwiXig/OlwiICsgbmFtZXMubWFwKGQzLnJlcXVvdGUpLmpvaW4oXCJ8XCIpICsgXCIpXCIsIFwiaVwiKTtcbiAgfVxuICBmdW5jdGlvbiBkM190aW1lX2Zvcm1hdExvb2t1cChuYW1lcykge1xuICAgIHZhciBtYXAgPSBuZXcgZDNfTWFwKCksIGkgPSAtMSwgbiA9IG5hbWVzLmxlbmd0aDtcbiAgICB3aGlsZSAoKytpIDwgbikgbWFwLnNldChuYW1lc1tpXS50b0xvd2VyQ2FzZSgpLCBpKTtcbiAgICByZXR1cm4gbWFwO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3RpbWVfZm9ybWF0UGFkKHZhbHVlLCBmaWxsLCB3aWR0aCkge1xuICAgIHZhciBzaWduID0gdmFsdWUgPCAwID8gXCItXCIgOiBcIlwiLCBzdHJpbmcgPSAoc2lnbiA/IC12YWx1ZSA6IHZhbHVlKSArIFwiXCIsIGxlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG4gICAgcmV0dXJuIHNpZ24gKyAobGVuZ3RoIDwgd2lkdGggPyBuZXcgQXJyYXkod2lkdGggLSBsZW5ndGggKyAxKS5qb2luKGZpbGwpICsgc3RyaW5nIDogc3RyaW5nKTtcbiAgfVxuICB2YXIgZDNfdGltZV9kYXlSZSA9IGQzX3RpbWVfZm9ybWF0UmUoZDNfdGltZV9kYXlzKSwgZDNfdGltZV9kYXlMb29rdXAgPSBkM190aW1lX2Zvcm1hdExvb2t1cChkM190aW1lX2RheXMpLCBkM190aW1lX2RheUFiYnJldlJlID0gZDNfdGltZV9mb3JtYXRSZShkM190aW1lX2RheUFiYnJldmlhdGlvbnMpLCBkM190aW1lX2RheUFiYnJldkxvb2t1cCA9IGQzX3RpbWVfZm9ybWF0TG9va3VwKGQzX3RpbWVfZGF5QWJicmV2aWF0aW9ucyksIGQzX3RpbWVfbW9udGhSZSA9IGQzX3RpbWVfZm9ybWF0UmUoZDNfdGltZV9tb250aHMpLCBkM190aW1lX21vbnRoTG9va3VwID0gZDNfdGltZV9mb3JtYXRMb29rdXAoZDNfdGltZV9tb250aHMpLCBkM190aW1lX21vbnRoQWJicmV2UmUgPSBkM190aW1lX2Zvcm1hdFJlKGQzX3RpbWVfbW9udGhBYmJyZXZpYXRpb25zKSwgZDNfdGltZV9tb250aEFiYnJldkxvb2t1cCA9IGQzX3RpbWVfZm9ybWF0TG9va3VwKGQzX3RpbWVfbW9udGhBYmJyZXZpYXRpb25zKSwgZDNfdGltZV9wZXJjZW50UmUgPSAvXiUvO1xuICB2YXIgZDNfdGltZV9mb3JtYXRQYWRzID0ge1xuICAgIFwiLVwiOiBcIlwiLFxuICAgIF86IFwiIFwiLFxuICAgIFwiMFwiOiBcIjBcIlxuICB9O1xuICB2YXIgZDNfdGltZV9mb3JtYXRzID0ge1xuICAgIGE6IGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBkM190aW1lX2RheUFiYnJldmlhdGlvbnNbZC5nZXREYXkoKV07XG4gICAgfSxcbiAgICBBOiBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gZDNfdGltZV9kYXlzW2QuZ2V0RGF5KCldO1xuICAgIH0sXG4gICAgYjogZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIGQzX3RpbWVfbW9udGhBYmJyZXZpYXRpb25zW2QuZ2V0TW9udGgoKV07XG4gICAgfSxcbiAgICBCOiBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gZDNfdGltZV9tb250aHNbZC5nZXRNb250aCgpXTtcbiAgICB9LFxuICAgIGM6IGQzLnRpbWUuZm9ybWF0KGQzX3RpbWVfZm9ybWF0RGF0ZVRpbWUpLFxuICAgIGQ6IGZ1bmN0aW9uKGQsIHApIHtcbiAgICAgIHJldHVybiBkM190aW1lX2Zvcm1hdFBhZChkLmdldERhdGUoKSwgcCwgMik7XG4gICAgfSxcbiAgICBlOiBmdW5jdGlvbihkLCBwKSB7XG4gICAgICByZXR1cm4gZDNfdGltZV9mb3JtYXRQYWQoZC5nZXREYXRlKCksIHAsIDIpO1xuICAgIH0sXG4gICAgSDogZnVuY3Rpb24oZCwgcCkge1xuICAgICAgcmV0dXJuIGQzX3RpbWVfZm9ybWF0UGFkKGQuZ2V0SG91cnMoKSwgcCwgMik7XG4gICAgfSxcbiAgICBJOiBmdW5jdGlvbihkLCBwKSB7XG4gICAgICByZXR1cm4gZDNfdGltZV9mb3JtYXRQYWQoZC5nZXRIb3VycygpICUgMTIgfHwgMTIsIHAsIDIpO1xuICAgIH0sXG4gICAgajogZnVuY3Rpb24oZCwgcCkge1xuICAgICAgcmV0dXJuIGQzX3RpbWVfZm9ybWF0UGFkKDEgKyBkMy50aW1lLmRheU9mWWVhcihkKSwgcCwgMyk7XG4gICAgfSxcbiAgICBMOiBmdW5jdGlvbihkLCBwKSB7XG4gICAgICByZXR1cm4gZDNfdGltZV9mb3JtYXRQYWQoZC5nZXRNaWxsaXNlY29uZHMoKSwgcCwgMyk7XG4gICAgfSxcbiAgICBtOiBmdW5jdGlvbihkLCBwKSB7XG4gICAgICByZXR1cm4gZDNfdGltZV9mb3JtYXRQYWQoZC5nZXRNb250aCgpICsgMSwgcCwgMik7XG4gICAgfSxcbiAgICBNOiBmdW5jdGlvbihkLCBwKSB7XG4gICAgICByZXR1cm4gZDNfdGltZV9mb3JtYXRQYWQoZC5nZXRNaW51dGVzKCksIHAsIDIpO1xuICAgIH0sXG4gICAgcDogZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIGQuZ2V0SG91cnMoKSA+PSAxMiA/IFwiUE1cIiA6IFwiQU1cIjtcbiAgICB9LFxuICAgIFM6IGZ1bmN0aW9uKGQsIHApIHtcbiAgICAgIHJldHVybiBkM190aW1lX2Zvcm1hdFBhZChkLmdldFNlY29uZHMoKSwgcCwgMik7XG4gICAgfSxcbiAgICBVOiBmdW5jdGlvbihkLCBwKSB7XG4gICAgICByZXR1cm4gZDNfdGltZV9mb3JtYXRQYWQoZDMudGltZS5zdW5kYXlPZlllYXIoZCksIHAsIDIpO1xuICAgIH0sXG4gICAgdzogZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIGQuZ2V0RGF5KCk7XG4gICAgfSxcbiAgICBXOiBmdW5jdGlvbihkLCBwKSB7XG4gICAgICByZXR1cm4gZDNfdGltZV9mb3JtYXRQYWQoZDMudGltZS5tb25kYXlPZlllYXIoZCksIHAsIDIpO1xuICAgIH0sXG4gICAgeDogZDMudGltZS5mb3JtYXQoZDNfdGltZV9mb3JtYXREYXRlKSxcbiAgICBYOiBkMy50aW1lLmZvcm1hdChkM190aW1lX2Zvcm1hdFRpbWUpLFxuICAgIHk6IGZ1bmN0aW9uKGQsIHApIHtcbiAgICAgIHJldHVybiBkM190aW1lX2Zvcm1hdFBhZChkLmdldEZ1bGxZZWFyKCkgJSAxMDAsIHAsIDIpO1xuICAgIH0sXG4gICAgWTogZnVuY3Rpb24oZCwgcCkge1xuICAgICAgcmV0dXJuIGQzX3RpbWVfZm9ybWF0UGFkKGQuZ2V0RnVsbFllYXIoKSAlIDFlNCwgcCwgNCk7XG4gICAgfSxcbiAgICBaOiBkM190aW1lX3pvbmUsXG4gICAgXCIlXCI6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFwiJVwiO1xuICAgIH1cbiAgfTtcbiAgdmFyIGQzX3RpbWVfcGFyc2VycyA9IHtcbiAgICBhOiBkM190aW1lX3BhcnNlV2Vla2RheUFiYnJldixcbiAgICBBOiBkM190aW1lX3BhcnNlV2Vla2RheSxcbiAgICBiOiBkM190aW1lX3BhcnNlTW9udGhBYmJyZXYsXG4gICAgQjogZDNfdGltZV9wYXJzZU1vbnRoLFxuICAgIGM6IGQzX3RpbWVfcGFyc2VMb2NhbGVGdWxsLFxuICAgIGQ6IGQzX3RpbWVfcGFyc2VEYXksXG4gICAgZTogZDNfdGltZV9wYXJzZURheSxcbiAgICBIOiBkM190aW1lX3BhcnNlSG91cjI0LFxuICAgIEk6IGQzX3RpbWVfcGFyc2VIb3VyMjQsXG4gICAgajogZDNfdGltZV9wYXJzZURheU9mWWVhcixcbiAgICBMOiBkM190aW1lX3BhcnNlTWlsbGlzZWNvbmRzLFxuICAgIG06IGQzX3RpbWVfcGFyc2VNb250aE51bWJlcixcbiAgICBNOiBkM190aW1lX3BhcnNlTWludXRlcyxcbiAgICBwOiBkM190aW1lX3BhcnNlQW1QbSxcbiAgICBTOiBkM190aW1lX3BhcnNlU2Vjb25kcyxcbiAgICBVOiBkM190aW1lX3BhcnNlV2Vla051bWJlclN1bmRheSxcbiAgICB3OiBkM190aW1lX3BhcnNlV2Vla2RheU51bWJlcixcbiAgICBXOiBkM190aW1lX3BhcnNlV2Vla051bWJlck1vbmRheSxcbiAgICB4OiBkM190aW1lX3BhcnNlTG9jYWxlRGF0ZSxcbiAgICBYOiBkM190aW1lX3BhcnNlTG9jYWxlVGltZSxcbiAgICB5OiBkM190aW1lX3BhcnNlWWVhcixcbiAgICBZOiBkM190aW1lX3BhcnNlRnVsbFllYXIsXG4gICAgXCIlXCI6IGQzX3RpbWVfcGFyc2VMaXRlcmFsUGVyY2VudFxuICB9O1xuICBmdW5jdGlvbiBkM190aW1lX3BhcnNlV2Vla2RheUFiYnJldihkYXRlLCBzdHJpbmcsIGkpIHtcbiAgICBkM190aW1lX2RheUFiYnJldlJlLmxhc3RJbmRleCA9IDA7XG4gICAgdmFyIG4gPSBkM190aW1lX2RheUFiYnJldlJlLmV4ZWMoc3RyaW5nLnN1YnN0cmluZyhpKSk7XG4gICAgcmV0dXJuIG4gPyAoZGF0ZS53ID0gZDNfdGltZV9kYXlBYmJyZXZMb29rdXAuZ2V0KG5bMF0udG9Mb3dlckNhc2UoKSksIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuICBmdW5jdGlvbiBkM190aW1lX3BhcnNlV2Vla2RheShkYXRlLCBzdHJpbmcsIGkpIHtcbiAgICBkM190aW1lX2RheVJlLmxhc3RJbmRleCA9IDA7XG4gICAgdmFyIG4gPSBkM190aW1lX2RheVJlLmV4ZWMoc3RyaW5nLnN1YnN0cmluZyhpKSk7XG4gICAgcmV0dXJuIG4gPyAoZGF0ZS53ID0gZDNfdGltZV9kYXlMb29rdXAuZ2V0KG5bMF0udG9Mb3dlckNhc2UoKSksIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuICBmdW5jdGlvbiBkM190aW1lX3BhcnNlV2Vla2RheU51bWJlcihkYXRlLCBzdHJpbmcsIGkpIHtcbiAgICBkM190aW1lX251bWJlclJlLmxhc3RJbmRleCA9IDA7XG4gICAgdmFyIG4gPSBkM190aW1lX251bWJlclJlLmV4ZWMoc3RyaW5nLnN1YnN0cmluZyhpLCBpICsgMSkpO1xuICAgIHJldHVybiBuID8gKGRhdGUudyA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZV9wYXJzZVdlZWtOdW1iZXJTdW5kYXkoZGF0ZSwgc3RyaW5nLCBpKSB7XG4gICAgZDNfdGltZV9udW1iZXJSZS5sYXN0SW5kZXggPSAwO1xuICAgIHZhciBuID0gZDNfdGltZV9udW1iZXJSZS5leGVjKHN0cmluZy5zdWJzdHJpbmcoaSkpO1xuICAgIHJldHVybiBuID8gKGRhdGUuVSA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZV9wYXJzZVdlZWtOdW1iZXJNb25kYXkoZGF0ZSwgc3RyaW5nLCBpKSB7XG4gICAgZDNfdGltZV9udW1iZXJSZS5sYXN0SW5kZXggPSAwO1xuICAgIHZhciBuID0gZDNfdGltZV9udW1iZXJSZS5leGVjKHN0cmluZy5zdWJzdHJpbmcoaSkpO1xuICAgIHJldHVybiBuID8gKGRhdGUuVyA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZV9wYXJzZU1vbnRoQWJicmV2KGRhdGUsIHN0cmluZywgaSkge1xuICAgIGQzX3RpbWVfbW9udGhBYmJyZXZSZS5sYXN0SW5kZXggPSAwO1xuICAgIHZhciBuID0gZDNfdGltZV9tb250aEFiYnJldlJlLmV4ZWMoc3RyaW5nLnN1YnN0cmluZyhpKSk7XG4gICAgcmV0dXJuIG4gPyAoZGF0ZS5tID0gZDNfdGltZV9tb250aEFiYnJldkxvb2t1cC5nZXQoblswXS50b0xvd2VyQ2FzZSgpKSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3RpbWVfcGFyc2VNb250aChkYXRlLCBzdHJpbmcsIGkpIHtcbiAgICBkM190aW1lX21vbnRoUmUubGFzdEluZGV4ID0gMDtcbiAgICB2YXIgbiA9IGQzX3RpbWVfbW9udGhSZS5leGVjKHN0cmluZy5zdWJzdHJpbmcoaSkpO1xuICAgIHJldHVybiBuID8gKGRhdGUubSA9IGQzX3RpbWVfbW9udGhMb29rdXAuZ2V0KG5bMF0udG9Mb3dlckNhc2UoKSksIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuICBmdW5jdGlvbiBkM190aW1lX3BhcnNlTG9jYWxlRnVsbChkYXRlLCBzdHJpbmcsIGkpIHtcbiAgICByZXR1cm4gZDNfdGltZV9wYXJzZShkYXRlLCBkM190aW1lX2Zvcm1hdHMuYy50b1N0cmluZygpLCBzdHJpbmcsIGkpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3RpbWVfcGFyc2VMb2NhbGVEYXRlKGRhdGUsIHN0cmluZywgaSkge1xuICAgIHJldHVybiBkM190aW1lX3BhcnNlKGRhdGUsIGQzX3RpbWVfZm9ybWF0cy54LnRvU3RyaW5nKCksIHN0cmluZywgaSk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZV9wYXJzZUxvY2FsZVRpbWUoZGF0ZSwgc3RyaW5nLCBpKSB7XG4gICAgcmV0dXJuIGQzX3RpbWVfcGFyc2UoZGF0ZSwgZDNfdGltZV9mb3JtYXRzLlgudG9TdHJpbmcoKSwgc3RyaW5nLCBpKTtcbiAgfVxuICBmdW5jdGlvbiBkM190aW1lX3BhcnNlRnVsbFllYXIoZGF0ZSwgc3RyaW5nLCBpKSB7XG4gICAgZDNfdGltZV9udW1iZXJSZS5sYXN0SW5kZXggPSAwO1xuICAgIHZhciBuID0gZDNfdGltZV9udW1iZXJSZS5leGVjKHN0cmluZy5zdWJzdHJpbmcoaSwgaSArIDQpKTtcbiAgICByZXR1cm4gbiA/IChkYXRlLnkgPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3RpbWVfcGFyc2VZZWFyKGRhdGUsIHN0cmluZywgaSkge1xuICAgIGQzX3RpbWVfbnVtYmVyUmUubGFzdEluZGV4ID0gMDtcbiAgICB2YXIgbiA9IGQzX3RpbWVfbnVtYmVyUmUuZXhlYyhzdHJpbmcuc3Vic3RyaW5nKGksIGkgKyAyKSk7XG4gICAgcmV0dXJuIG4gPyAoZGF0ZS55ID0gZDNfdGltZV9leHBhbmRZZWFyKCtuWzBdKSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3RpbWVfZXhwYW5kWWVhcihkKSB7XG4gICAgcmV0dXJuIGQgKyAoZCA+IDY4ID8gMTkwMCA6IDJlMyk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZV9wYXJzZU1vbnRoTnVtYmVyKGRhdGUsIHN0cmluZywgaSkge1xuICAgIGQzX3RpbWVfbnVtYmVyUmUubGFzdEluZGV4ID0gMDtcbiAgICB2YXIgbiA9IGQzX3RpbWVfbnVtYmVyUmUuZXhlYyhzdHJpbmcuc3Vic3RyaW5nKGksIGkgKyAyKSk7XG4gICAgcmV0dXJuIG4gPyAoZGF0ZS5tID0gblswXSAtIDEsIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuICBmdW5jdGlvbiBkM190aW1lX3BhcnNlRGF5KGRhdGUsIHN0cmluZywgaSkge1xuICAgIGQzX3RpbWVfbnVtYmVyUmUubGFzdEluZGV4ID0gMDtcbiAgICB2YXIgbiA9IGQzX3RpbWVfbnVtYmVyUmUuZXhlYyhzdHJpbmcuc3Vic3RyaW5nKGksIGkgKyAyKSk7XG4gICAgcmV0dXJuIG4gPyAoZGF0ZS5kID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuICBmdW5jdGlvbiBkM190aW1lX3BhcnNlRGF5T2ZZZWFyKGRhdGUsIHN0cmluZywgaSkge1xuICAgIGQzX3RpbWVfbnVtYmVyUmUubGFzdEluZGV4ID0gMDtcbiAgICB2YXIgbiA9IGQzX3RpbWVfbnVtYmVyUmUuZXhlYyhzdHJpbmcuc3Vic3RyaW5nKGksIGkgKyAzKSk7XG4gICAgcmV0dXJuIG4gPyAoZGF0ZS5qID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuICBmdW5jdGlvbiBkM190aW1lX3BhcnNlSG91cjI0KGRhdGUsIHN0cmluZywgaSkge1xuICAgIGQzX3RpbWVfbnVtYmVyUmUubGFzdEluZGV4ID0gMDtcbiAgICB2YXIgbiA9IGQzX3RpbWVfbnVtYmVyUmUuZXhlYyhzdHJpbmcuc3Vic3RyaW5nKGksIGkgKyAyKSk7XG4gICAgcmV0dXJuIG4gPyAoZGF0ZS5IID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuICBmdW5jdGlvbiBkM190aW1lX3BhcnNlTWludXRlcyhkYXRlLCBzdHJpbmcsIGkpIHtcbiAgICBkM190aW1lX251bWJlclJlLmxhc3RJbmRleCA9IDA7XG4gICAgdmFyIG4gPSBkM190aW1lX251bWJlclJlLmV4ZWMoc3RyaW5nLnN1YnN0cmluZyhpLCBpICsgMikpO1xuICAgIHJldHVybiBuID8gKGRhdGUuTSA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZV9wYXJzZVNlY29uZHMoZGF0ZSwgc3RyaW5nLCBpKSB7XG4gICAgZDNfdGltZV9udW1iZXJSZS5sYXN0SW5kZXggPSAwO1xuICAgIHZhciBuID0gZDNfdGltZV9udW1iZXJSZS5leGVjKHN0cmluZy5zdWJzdHJpbmcoaSwgaSArIDIpKTtcbiAgICByZXR1cm4gbiA/IChkYXRlLlMgPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3RpbWVfcGFyc2VNaWxsaXNlY29uZHMoZGF0ZSwgc3RyaW5nLCBpKSB7XG4gICAgZDNfdGltZV9udW1iZXJSZS5sYXN0SW5kZXggPSAwO1xuICAgIHZhciBuID0gZDNfdGltZV9udW1iZXJSZS5leGVjKHN0cmluZy5zdWJzdHJpbmcoaSwgaSArIDMpKTtcbiAgICByZXR1cm4gbiA/IChkYXRlLkwgPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG4gIHZhciBkM190aW1lX251bWJlclJlID0gL15cXHMqXFxkKy87XG4gIGZ1bmN0aW9uIGQzX3RpbWVfcGFyc2VBbVBtKGRhdGUsIHN0cmluZywgaSkge1xuICAgIHZhciBuID0gZDNfdGltZV9hbVBtTG9va3VwLmdldChzdHJpbmcuc3Vic3RyaW5nKGksIGkgKz0gMikudG9Mb3dlckNhc2UoKSk7XG4gICAgcmV0dXJuIG4gPT0gbnVsbCA/IC0xIDogKGRhdGUucCA9IG4sIGkpO1xuICB9XG4gIHZhciBkM190aW1lX2FtUG1Mb29rdXAgPSBkMy5tYXAoe1xuICAgIGFtOiAwLFxuICAgIHBtOiAxXG4gIH0pO1xuICBmdW5jdGlvbiBkM190aW1lX3pvbmUoZCkge1xuICAgIHZhciB6ID0gZC5nZXRUaW1lem9uZU9mZnNldCgpLCB6cyA9IHogPiAwID8gXCItXCIgOiBcIitcIiwgemggPSB+fihNYXRoLmFicyh6KSAvIDYwKSwgem0gPSBNYXRoLmFicyh6KSAlIDYwO1xuICAgIHJldHVybiB6cyArIGQzX3RpbWVfZm9ybWF0UGFkKHpoLCBcIjBcIiwgMikgKyBkM190aW1lX2Zvcm1hdFBhZCh6bSwgXCIwXCIsIDIpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3RpbWVfcGFyc2VMaXRlcmFsUGVyY2VudChkYXRlLCBzdHJpbmcsIGkpIHtcbiAgICBkM190aW1lX3BlcmNlbnRSZS5sYXN0SW5kZXggPSAwO1xuICAgIHZhciBuID0gZDNfdGltZV9wZXJjZW50UmUuZXhlYyhzdHJpbmcuc3Vic3RyaW5nKGksIGkgKyAxKSk7XG4gICAgcmV0dXJuIG4gPyBpICsgblswXS5sZW5ndGggOiAtMTtcbiAgfVxuICBkMy50aW1lLmZvcm1hdC51dGMgPSBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgIHZhciBsb2NhbCA9IGQzLnRpbWUuZm9ybWF0KHRlbXBsYXRlKTtcbiAgICBmdW5jdGlvbiBmb3JtYXQoZGF0ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZDNfdGltZSA9IGQzX3RpbWVfdXRjO1xuICAgICAgICB2YXIgdXRjID0gbmV3IGQzX3RpbWUoKTtcbiAgICAgICAgdXRjLl8gPSBkYXRlO1xuICAgICAgICByZXR1cm4gbG9jYWwodXRjKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGQzX3RpbWUgPSBEYXRlO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3JtYXQucGFyc2UgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGQzX3RpbWUgPSBkM190aW1lX3V0YztcbiAgICAgICAgdmFyIGRhdGUgPSBsb2NhbC5wYXJzZShzdHJpbmcpO1xuICAgICAgICByZXR1cm4gZGF0ZSAmJiBkYXRlLl87XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBkM190aW1lID0gRGF0ZTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGZvcm1hdC50b1N0cmluZyA9IGxvY2FsLnRvU3RyaW5nO1xuICAgIHJldHVybiBmb3JtYXQ7XG4gIH07XG4gIHZhciBkM190aW1lX2Zvcm1hdElzbyA9IGQzLnRpbWUuZm9ybWF0LnV0YyhcIiVZLSVtLSVkVCVIOiVNOiVTLiVMWlwiKTtcbiAgZDMudGltZS5mb3JtYXQuaXNvID0gRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmcgJiYgK25ldyBEYXRlKFwiMjAwMC0wMS0wMVQwMDowMDowMC4wMDBaXCIpID8gZDNfdGltZV9mb3JtYXRJc29OYXRpdmUgOiBkM190aW1lX2Zvcm1hdElzbztcbiAgZnVuY3Rpb24gZDNfdGltZV9mb3JtYXRJc29OYXRpdmUoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLnRvSVNPU3RyaW5nKCk7XG4gIH1cbiAgZDNfdGltZV9mb3JtYXRJc29OYXRpdmUucGFyc2UgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHN0cmluZyk7XG4gICAgcmV0dXJuIGlzTmFOKGRhdGUpID8gbnVsbCA6IGRhdGU7XG4gIH07XG4gIGQzX3RpbWVfZm9ybWF0SXNvTmF0aXZlLnRvU3RyaW5nID0gZDNfdGltZV9mb3JtYXRJc28udG9TdHJpbmc7XG4gIGQzLnRpbWUuc2Vjb25kID0gZDNfdGltZV9pbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIG5ldyBkM190aW1lKE1hdGguZmxvb3IoZGF0ZSAvIDFlMykgKiAxZTMpO1xuICB9LCBmdW5jdGlvbihkYXRlLCBvZmZzZXQpIHtcbiAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyBNYXRoLmZsb29yKG9mZnNldCkgKiAxZTMpO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0U2Vjb25kcygpO1xuICB9KTtcbiAgZDMudGltZS5zZWNvbmRzID0gZDMudGltZS5zZWNvbmQucmFuZ2U7XG4gIGQzLnRpbWUuc2Vjb25kcy51dGMgPSBkMy50aW1lLnNlY29uZC51dGMucmFuZ2U7XG4gIGQzLnRpbWUubWludXRlID0gZDNfdGltZV9pbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIG5ldyBkM190aW1lKE1hdGguZmxvb3IoZGF0ZSAvIDZlNCkgKiA2ZTQpO1xuICB9LCBmdW5jdGlvbihkYXRlLCBvZmZzZXQpIHtcbiAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyBNYXRoLmZsb29yKG9mZnNldCkgKiA2ZTQpO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0TWludXRlcygpO1xuICB9KTtcbiAgZDMudGltZS5taW51dGVzID0gZDMudGltZS5taW51dGUucmFuZ2U7XG4gIGQzLnRpbWUubWludXRlcy51dGMgPSBkMy50aW1lLm1pbnV0ZS51dGMucmFuZ2U7XG4gIGQzLnRpbWUuaG91ciA9IGQzX3RpbWVfaW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIHZhciB0aW1lem9uZSA9IGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSAvIDYwO1xuICAgIHJldHVybiBuZXcgZDNfdGltZSgoTWF0aC5mbG9vcihkYXRlIC8gMzZlNSAtIHRpbWV6b25lKSArIHRpbWV6b25lKSAqIDM2ZTUpO1xuICB9LCBmdW5jdGlvbihkYXRlLCBvZmZzZXQpIHtcbiAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyBNYXRoLmZsb29yKG9mZnNldCkgKiAzNmU1KTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCk7XG4gIH0pO1xuICBkMy50aW1lLmhvdXJzID0gZDMudGltZS5ob3VyLnJhbmdlO1xuICBkMy50aW1lLmhvdXJzLnV0YyA9IGQzLnRpbWUuaG91ci51dGMucmFuZ2U7XG4gIGQzLnRpbWUubW9udGggPSBkM190aW1lX2ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICBkYXRlID0gZDMudGltZS5kYXkoZGF0ZSk7XG4gICAgZGF0ZS5zZXREYXRlKDEpO1xuICAgIHJldHVybiBkYXRlO1xuICB9LCBmdW5jdGlvbihkYXRlLCBvZmZzZXQpIHtcbiAgICBkYXRlLnNldE1vbnRoKGRhdGUuZ2V0TW9udGgoKSArIG9mZnNldCk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRNb250aCgpO1xuICB9KTtcbiAgZDMudGltZS5tb250aHMgPSBkMy50aW1lLm1vbnRoLnJhbmdlO1xuICBkMy50aW1lLm1vbnRocy51dGMgPSBkMy50aW1lLm1vbnRoLnV0Yy5yYW5nZTtcbiAgZnVuY3Rpb24gZDNfdGltZV9zY2FsZShsaW5lYXIsIG1ldGhvZHMsIGZvcm1hdCkge1xuICAgIGZ1bmN0aW9uIHNjYWxlKHgpIHtcbiAgICAgIHJldHVybiBsaW5lYXIoeCk7XG4gICAgfVxuICAgIHNjYWxlLmludmVydCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiBkM190aW1lX3NjYWxlRGF0ZShsaW5lYXIuaW52ZXJ0KHgpKTtcbiAgICB9O1xuICAgIHNjYWxlLmRvbWFpbiA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGxpbmVhci5kb21haW4oKS5tYXAoZDNfdGltZV9zY2FsZURhdGUpO1xuICAgICAgbGluZWFyLmRvbWFpbih4KTtcbiAgICAgIHJldHVybiBzY2FsZTtcbiAgICB9O1xuICAgIHNjYWxlLm5pY2UgPSBmdW5jdGlvbihtKSB7XG4gICAgICByZXR1cm4gc2NhbGUuZG9tYWluKGQzX3NjYWxlX25pY2Uoc2NhbGUuZG9tYWluKCksIG0pKTtcbiAgICB9O1xuICAgIHNjYWxlLnRpY2tzID0gZnVuY3Rpb24obSwgaykge1xuICAgICAgdmFyIGV4dGVudCA9IGQzX3NjYWxlRXh0ZW50KHNjYWxlLmRvbWFpbigpKTtcbiAgICAgIGlmICh0eXBlb2YgbSAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHZhciBzcGFuID0gZXh0ZW50WzFdIC0gZXh0ZW50WzBdLCB0YXJnZXQgPSBzcGFuIC8gbSwgaSA9IGQzLmJpc2VjdChkM190aW1lX3NjYWxlU3RlcHMsIHRhcmdldCk7XG4gICAgICAgIGlmIChpID09IGQzX3RpbWVfc2NhbGVTdGVwcy5sZW5ndGgpIHJldHVybiBtZXRob2RzLnllYXIoZXh0ZW50LCBtKTtcbiAgICAgICAgaWYgKCFpKSByZXR1cm4gbGluZWFyLnRpY2tzKG0pLm1hcChkM190aW1lX3NjYWxlRGF0ZSk7XG4gICAgICAgIGlmICh0YXJnZXQgLyBkM190aW1lX3NjYWxlU3RlcHNbaSAtIDFdIDwgZDNfdGltZV9zY2FsZVN0ZXBzW2ldIC8gdGFyZ2V0KSAtLWk7XG4gICAgICAgIG0gPSBtZXRob2RzW2ldO1xuICAgICAgICBrID0gbVsxXTtcbiAgICAgICAgbSA9IG1bMF0ucmFuZ2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gbShleHRlbnRbMF0sIG5ldyBEYXRlKCtleHRlbnRbMV0gKyAxKSwgayk7XG4gICAgfTtcbiAgICBzY2FsZS50aWNrRm9ybWF0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZm9ybWF0O1xuICAgIH07XG4gICAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGQzX3RpbWVfc2NhbGUobGluZWFyLmNvcHkoKSwgbWV0aG9kcywgZm9ybWF0KTtcbiAgICB9O1xuICAgIHJldHVybiBkM19zY2FsZV9saW5lYXJSZWJpbmQoc2NhbGUsIGxpbmVhcik7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZV9zY2FsZURhdGUodCkge1xuICAgIHJldHVybiBuZXcgRGF0ZSh0KTtcbiAgfVxuICBmdW5jdGlvbiBkM190aW1lX3NjYWxlRm9ybWF0KGZvcm1hdHMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgdmFyIGkgPSBmb3JtYXRzLmxlbmd0aCAtIDEsIGYgPSBmb3JtYXRzW2ldO1xuICAgICAgd2hpbGUgKCFmWzFdKGRhdGUpKSBmID0gZm9ybWF0c1stLWldO1xuICAgICAgcmV0dXJuIGZbMF0oZGF0ZSk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkM190aW1lX3NjYWxlU2V0WWVhcih5KSB7XG4gICAgdmFyIGQgPSBuZXcgRGF0ZSh5LCAwLCAxKTtcbiAgICBkLnNldEZ1bGxZZWFyKHkpO1xuICAgIHJldHVybiBkO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3RpbWVfc2NhbGVHZXRZZWFyKGQpIHtcbiAgICB2YXIgeSA9IGQuZ2V0RnVsbFllYXIoKSwgZDAgPSBkM190aW1lX3NjYWxlU2V0WWVhcih5KSwgZDEgPSBkM190aW1lX3NjYWxlU2V0WWVhcih5ICsgMSk7XG4gICAgcmV0dXJuIHkgKyAoZCAtIGQwKSAvIChkMSAtIGQwKTtcbiAgfVxuICB2YXIgZDNfdGltZV9zY2FsZVN0ZXBzID0gWyAxZTMsIDVlMywgMTVlMywgM2U0LCA2ZTQsIDNlNSwgOWU1LCAxOGU1LCAzNmU1LCAxMDhlNSwgMjE2ZTUsIDQzMmU1LCA4NjRlNSwgMTcyOGU1LCA2MDQ4ZTUsIDI1OTJlNiwgNzc3NmU2LCAzMTUzNmU2IF07XG4gIHZhciBkM190aW1lX3NjYWxlTG9jYWxNZXRob2RzID0gWyBbIGQzLnRpbWUuc2Vjb25kLCAxIF0sIFsgZDMudGltZS5zZWNvbmQsIDUgXSwgWyBkMy50aW1lLnNlY29uZCwgMTUgXSwgWyBkMy50aW1lLnNlY29uZCwgMzAgXSwgWyBkMy50aW1lLm1pbnV0ZSwgMSBdLCBbIGQzLnRpbWUubWludXRlLCA1IF0sIFsgZDMudGltZS5taW51dGUsIDE1IF0sIFsgZDMudGltZS5taW51dGUsIDMwIF0sIFsgZDMudGltZS5ob3VyLCAxIF0sIFsgZDMudGltZS5ob3VyLCAzIF0sIFsgZDMudGltZS5ob3VyLCA2IF0sIFsgZDMudGltZS5ob3VyLCAxMiBdLCBbIGQzLnRpbWUuZGF5LCAxIF0sIFsgZDMudGltZS5kYXksIDIgXSwgWyBkMy50aW1lLndlZWssIDEgXSwgWyBkMy50aW1lLm1vbnRoLCAxIF0sIFsgZDMudGltZS5tb250aCwgMyBdLCBbIGQzLnRpbWUueWVhciwgMSBdIF07XG4gIHZhciBkM190aW1lX3NjYWxlTG9jYWxGb3JtYXRzID0gWyBbIGQzLnRpbWUuZm9ybWF0KFwiJVlcIiksIGQzX3RydWUgXSwgWyBkMy50aW1lLmZvcm1hdChcIiVCXCIpLCBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIGQuZ2V0TW9udGgoKTtcbiAgfSBdLCBbIGQzLnRpbWUuZm9ybWF0KFwiJWIgJWRcIiksIGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gZC5nZXREYXRlKCkgIT0gMTtcbiAgfSBdLCBbIGQzLnRpbWUuZm9ybWF0KFwiJWEgJWRcIiksIGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gZC5nZXREYXkoKSAmJiBkLmdldERhdGUoKSAhPSAxO1xuICB9IF0sIFsgZDMudGltZS5mb3JtYXQoXCIlSSAlcFwiKSwgZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBkLmdldEhvdXJzKCk7XG4gIH0gXSwgWyBkMy50aW1lLmZvcm1hdChcIiVJOiVNXCIpLCBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIGQuZ2V0TWludXRlcygpO1xuICB9IF0sIFsgZDMudGltZS5mb3JtYXQoXCI6JVNcIiksIGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gZC5nZXRTZWNvbmRzKCk7XG4gIH0gXSwgWyBkMy50aW1lLmZvcm1hdChcIi4lTFwiKSwgZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBkLmdldE1pbGxpc2Vjb25kcygpO1xuICB9IF0gXTtcbiAgdmFyIGQzX3RpbWVfc2NhbGVMaW5lYXIgPSBkMy5zY2FsZS5saW5lYXIoKSwgZDNfdGltZV9zY2FsZUxvY2FsRm9ybWF0ID0gZDNfdGltZV9zY2FsZUZvcm1hdChkM190aW1lX3NjYWxlTG9jYWxGb3JtYXRzKTtcbiAgZDNfdGltZV9zY2FsZUxvY2FsTWV0aG9kcy55ZWFyID0gZnVuY3Rpb24oZXh0ZW50LCBtKSB7XG4gICAgcmV0dXJuIGQzX3RpbWVfc2NhbGVMaW5lYXIuZG9tYWluKGV4dGVudC5tYXAoZDNfdGltZV9zY2FsZUdldFllYXIpKS50aWNrcyhtKS5tYXAoZDNfdGltZV9zY2FsZVNldFllYXIpO1xuICB9O1xuICBkMy50aW1lLnNjYWxlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGQzX3RpbWVfc2NhbGUoZDMuc2NhbGUubGluZWFyKCksIGQzX3RpbWVfc2NhbGVMb2NhbE1ldGhvZHMsIGQzX3RpbWVfc2NhbGVMb2NhbEZvcm1hdCk7XG4gIH07XG4gIHZhciBkM190aW1lX3NjYWxlVVRDTWV0aG9kcyA9IGQzX3RpbWVfc2NhbGVMb2NhbE1ldGhvZHMubWFwKGZ1bmN0aW9uKG0pIHtcbiAgICByZXR1cm4gWyBtWzBdLnV0YywgbVsxXSBdO1xuICB9KTtcbiAgdmFyIGQzX3RpbWVfc2NhbGVVVENGb3JtYXRzID0gWyBbIGQzLnRpbWUuZm9ybWF0LnV0YyhcIiVZXCIpLCBkM190cnVlIF0sIFsgZDMudGltZS5mb3JtYXQudXRjKFwiJUJcIiksIGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gZC5nZXRVVENNb250aCgpO1xuICB9IF0sIFsgZDMudGltZS5mb3JtYXQudXRjKFwiJWIgJWRcIiksIGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gZC5nZXRVVENEYXRlKCkgIT0gMTtcbiAgfSBdLCBbIGQzLnRpbWUuZm9ybWF0LnV0YyhcIiVhICVkXCIpLCBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIGQuZ2V0VVRDRGF5KCkgJiYgZC5nZXRVVENEYXRlKCkgIT0gMTtcbiAgfSBdLCBbIGQzLnRpbWUuZm9ybWF0LnV0YyhcIiVJICVwXCIpLCBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIGQuZ2V0VVRDSG91cnMoKTtcbiAgfSBdLCBbIGQzLnRpbWUuZm9ybWF0LnV0YyhcIiVJOiVNXCIpLCBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIGQuZ2V0VVRDTWludXRlcygpO1xuICB9IF0sIFsgZDMudGltZS5mb3JtYXQudXRjKFwiOiVTXCIpLCBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIGQuZ2V0VVRDU2Vjb25kcygpO1xuICB9IF0sIFsgZDMudGltZS5mb3JtYXQudXRjKFwiLiVMXCIpLCBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIGQuZ2V0VVRDTWlsbGlzZWNvbmRzKCk7XG4gIH0gXSBdO1xuICB2YXIgZDNfdGltZV9zY2FsZVVUQ0Zvcm1hdCA9IGQzX3RpbWVfc2NhbGVGb3JtYXQoZDNfdGltZV9zY2FsZVVUQ0Zvcm1hdHMpO1xuICBmdW5jdGlvbiBkM190aW1lX3NjYWxlVVRDU2V0WWVhcih5KSB7XG4gICAgdmFyIGQgPSBuZXcgRGF0ZShEYXRlLlVUQyh5LCAwLCAxKSk7XG4gICAgZC5zZXRVVENGdWxsWWVhcih5KTtcbiAgICByZXR1cm4gZDtcbiAgfVxuICBmdW5jdGlvbiBkM190aW1lX3NjYWxlVVRDR2V0WWVhcihkKSB7XG4gICAgdmFyIHkgPSBkLmdldFVUQ0Z1bGxZZWFyKCksIGQwID0gZDNfdGltZV9zY2FsZVVUQ1NldFllYXIoeSksIGQxID0gZDNfdGltZV9zY2FsZVVUQ1NldFllYXIoeSArIDEpO1xuICAgIHJldHVybiB5ICsgKGQgLSBkMCkgLyAoZDEgLSBkMCk7XG4gIH1cbiAgZDNfdGltZV9zY2FsZVVUQ01ldGhvZHMueWVhciA9IGZ1bmN0aW9uKGV4dGVudCwgbSkge1xuICAgIHJldHVybiBkM190aW1lX3NjYWxlTGluZWFyLmRvbWFpbihleHRlbnQubWFwKGQzX3RpbWVfc2NhbGVVVENHZXRZZWFyKSkudGlja3MobSkubWFwKGQzX3RpbWVfc2NhbGVVVENTZXRZZWFyKTtcbiAgfTtcbiAgZDMudGltZS5zY2FsZS51dGMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfdGltZV9zY2FsZShkMy5zY2FsZS5saW5lYXIoKSwgZDNfdGltZV9zY2FsZVVUQ01ldGhvZHMsIGQzX3RpbWVfc2NhbGVVVENGb3JtYXQpO1xuICB9O1xuICBkMy50ZXh0ID0gZDNfeGhyVHlwZShmdW5jdGlvbihyZXF1ZXN0KSB7XG4gICAgcmV0dXJuIHJlcXVlc3QucmVzcG9uc2VUZXh0O1xuICB9KTtcbiAgZDMuanNvbiA9IGZ1bmN0aW9uKHVybCwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gZDNfeGhyKHVybCwgXCJhcHBsaWNhdGlvbi9qc29uXCIsIGQzX2pzb24sIGNhbGxiYWNrKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfanNvbihyZXF1ZXN0KSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICB9XG4gIGQzLmh0bWwgPSBmdW5jdGlvbih1cmwsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGQzX3hocih1cmwsIFwidGV4dC9odG1sXCIsIGQzX2h0bWwsIGNhbGxiYWNrKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfaHRtbChyZXF1ZXN0KSB7XG4gICAgdmFyIHJhbmdlID0gZDNfZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICByYW5nZS5zZWxlY3ROb2RlKGQzX2RvY3VtZW50LmJvZHkpO1xuICAgIHJldHVybiByYW5nZS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICB9XG4gIGQzLnhtbCA9IGQzX3hoclR5cGUoZnVuY3Rpb24ocmVxdWVzdCkge1xuICAgIHJldHVybiByZXF1ZXN0LnJlc3BvbnNlWE1MO1xuICB9KTtcbiAgcmV0dXJuIGQzO1xufSgpOyIsIihmdW5jdGlvbigpe3JlcXVpcmUoXCIuL2QzXCIpO1xubW9kdWxlLmV4cG9ydHMgPSBkMztcbihmdW5jdGlvbiAoKSB7IGRlbGV0ZSB0aGlzLmQzOyB9KSgpOyAvLyB1bnNldCBnbG9iYWxcblxufSkoKSIsIkdlbmVyaWNBdHRyaWJ1dGVzVGFiID0gcmVxdWlyZSAnLi4vLi4vbGliL3NjcmlwdHMvZ2VuZXJpY0F0dHJpYnV0ZXNUYWIuY29mZmVlJ1xuRGVtb1RhYiA9IHJlcXVpcmUgJy4uLy4uL2xpYi9zY3JpcHRzL2RlbW9UYWIuY29mZmVlJ1xuXG53aW5kb3cuYXBwLnJlZ2lzdGVyUmVwb3J0IChyZXBvcnQpIC0+XG4gIHJlcG9ydC50YWJzIFtHZW5lcmljQXR0cmlidXRlc1RhYiwgRGVtb1RhYl1cbiAgIyBwYXRoIG11c3QgYmUgcmVsYXRpdmUgdG8gZGlzdC9cbiAgcmVwb3J0LnN0eWxlc2hlZXRzIFsnLi9kZW1vLmNzcyddXG4iXX0=
;