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

window.app.addReports([GenericAttributesTab, DemoTab]);

window.app.addReportStylesheet('./demo.css');


},{"../../lib/scripts/demoTab.coffee":1,"../../lib/scripts/genericAttributesTab.coffee":2}]},{},[7])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvY2J1cnQvV29ya2luZy9yZXBvcnQtdGVtcGxhdGUvbGliL3NjcmlwdHMvZGVtb1RhYi5jb2ZmZWUiLCIvVXNlcnMvY2J1cnQvV29ya2luZy9yZXBvcnQtdGVtcGxhdGUvbGliL3NjcmlwdHMvZ2VuZXJpY0F0dHJpYnV0ZXNUYWIuY29mZmVlIiwiL1VzZXJzL2NidXJ0L1dvcmtpbmcvcmVwb3J0LXRlbXBsYXRlL2xpYi9zY3JpcHRzL3JlcG9ydFRhYi5jb2ZmZWUiLCIvVXNlcnMvY2J1cnQvV29ya2luZy9yZXBvcnQtdGVtcGxhdGUvbGliL3RlbXBsYXRlcy90ZW1wbGF0ZXMuanMiLCIvVXNlcnMvY2J1cnQvV29ya2luZy9yZXBvcnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2QzL2QzLmpzIiwiL1VzZXJzL2NidXJ0L1dvcmtpbmcvcmVwb3J0LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9kMy9pbmRleC1icm93c2VyaWZ5LmpzIiwiL1VzZXJzL2NidXJ0L1dvcmtpbmcvcmVwb3J0LXRlbXBsYXRlL3NyYy9zY3JpcHRzL2RlbW8uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBLG1DQUFBO0dBQUE7a1NBQUE7O0FBQUEsQ0FBQSxFQUFZLElBQUEsRUFBWixXQUFZOztBQUNaLENBREEsRUFDWSxJQUFBLEVBQVosa0JBQVk7O0FBQ1osQ0FGQSxDQUVBLENBQUssSUFBQSxvQ0FBQTs7QUFFQyxDQUpOO0NBS0U7Ozs7O0NBQUE7O0NBQUEsRUFBTSxDQUFOLE1BQUE7O0NBQUEsRUFDVyxHQURYLEdBQ0E7O0NBREEsRUFFVSxDQUZWLElBRUEsQ0FBbUI7O0NBRm5CLEVBSVEsR0FBUixHQUFRO0NBRU4sT0FBQSxLQUFBO0NBQUEsQ0FBQSxDQUFPLENBQVA7Q0FBQSxDQUNhLENBQWIsQ0FBQSxDQUFBLElBQWE7Q0FBVyxFQUFnQyxDQUFqQyxDQUFNLENBQVcsT0FBckI7Q0FBbkIsSUFBYTtDQURiLEVBS0UsQ0FERixHQUFBO0NBQ0UsQ0FBUSxFQUFDLENBQUssQ0FBZCxLQUFRO0NBQVIsQ0FDYSxFQUFDLEVBQWQsS0FBQTtDQURBLENBRVksRUFBQyxDQUFLLENBQWxCLElBQUEsR0FBWTtDQUZaLENBR08sRUFBQyxDQUFSLENBQUEsQ0FBZTtDQUhmLENBSVcsQ0FBQSxDQUFBLEVBQVgsR0FBQTtlQUFpQztDQUFBLENBQVEsR0FBUCxLQUFBO0NBQUQsQ0FBa0IsR0FBUCxLQUFBO0NBQXJCO0NBQVosTUFBWTtDQVR6QixLQUFBO0NBQUEsQ0FVb0MsQ0FBaEMsQ0FBSixFQUFVLENBQUEsQ0FBUyxDQUFUO0NBVlYsRUFhb0IsQ0FBcEIsQ0FBQSxJQUFxQixDQUFyQjtDQUNFLEtBQUEsUUFBQTtDQUNBLEVBQUEsQ0FBQSxFQUFBLE9BQUE7Q0FGRixJQUFvQjtDQWJwQixFQWdCb0IsQ0FBcEIsQ0FBQSxJQUFxQixDQUFyQjtDQUNFLEtBQUEsUUFBQTtDQUNBLEVBQUEsQ0FBQSxFQUFBLE9BQUE7Q0FGRixJQUFvQjtDQUtuQixHQUFBLEtBQUQsRUFBQTtDQTNCRixFQUlROztDQUpSLEVBNkJXLENBQUEsS0FBWDtDQUNFLE9BQUEsZ0RBQUE7Q0FBQSxFQUFJLENBQUosTUFBSTtDQUFKLEVBRUUsQ0FERixFQUFBO0NBQ0UsQ0FBSyxDQUFMLEdBQUE7Q0FBQSxDQUNPLEdBQVAsQ0FBQTtDQURBLENBRVEsSUFBUjtDQUZBLENBR00sRUFBTixFQUFBO0NBTEYsS0FBQTtDQUFBLEVBT1EsQ0FBUixDQUFBLENBQW9CO0NBUHBCLEVBUVMsQ0FBVCxFQUFBO0NBUkEsQ0FVTSxDQUFGLENBQUosQ0FBWSxDQUFSO0NBVkosQ0FhTSxDQUFGLENBQUosQ0FBWSxDQUFSO0NBYkosQ0FnQlUsQ0FBRixDQUFSLENBQUEsS0FBUTtDQWhCUixDQWtCVSxDQUFGLENBQVIsQ0FBQSxDQUFRLEVBQUE7Q0FsQlIsQ0FzQlUsQ0FBRixDQUFSLENBQUEsQ0FBUTtDQXRCUixDQTBCUSxDQUFSLENBQUEsQ0FBTSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBS0M7Q0EvQlAsQ0FpQ2EsRUFBYixFQUFBO0NBakNBLENBa0NXLENBQWMsQ0FBekIsRUFBQSxHQUEwQjtDQUFELFlBQU87Q0FBdkIsR0FBVCxDQUF5QjtBQVNULENBM0NoQixDQXFDbUIsQ0FEaEIsQ0FBSCxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsR0FFd0I7Q0F0Q3hCLENBOENtQixDQURoQixDQUFILENBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxFQUFBO0NBN0NBLENBeURtQixDQUhoQixDQUFILENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtDQUswQixZQUFBO0NBTDFCLENBTWdCLENBQUEsQ0FOaEIsQ0FLZ0IsSUFDQztDQUFTLFlBQUE7Q0FOMUIsQ0FPbUIsQ0FBQSxFQURILENBTmhCLEdBT29CO0NBQVksSUFBTixRQUFBO0NBUDFCLElBT21CO0NBN0RuQixHQStEQSxFQUFBO0NBQ0MsR0FBQSxFQUFELEVBQUEsR0FBQTtDQTlGRixFQTZCVzs7Q0E3Qlg7O0NBRG9COztBQWlHdEIsQ0FyR0EsRUFxR2lCLEdBQVgsQ0FBTjs7OztBQ3JHQSxJQUFBLDRDQUFBO0dBQUE7a1NBQUE7O0FBQUEsQ0FBQSxFQUFZLElBQUEsRUFBWixXQUFZOztBQUNaLENBREEsRUFDWSxJQUFBLEVBQVosa0JBQVk7O0FBRU4sQ0FITjtDQUlFOzs7OztDQUFBOztDQUFBLEVBQU0sQ0FBTixRQUFBOztDQUFBLEVBQ1csTUFBWCxVQURBOztDQUFBLEVBRVUsS0FBVixDQUFtQixRQUZuQjs7Q0FBQSxFQUlRLEdBQVIsR0FBUTtDQUNOLE1BQUEsQ0FBQTtDQUFBLEVBQ0UsQ0FERixHQUFBO0NBQ0UsQ0FBUSxFQUFDLENBQUssQ0FBZCxLQUFRO0NBQVIsQ0FDYSxFQUFDLEVBQWQsS0FBQTtDQURBLENBRVksRUFBQyxDQUFLLENBQWxCLElBQUEsR0FBWTtDQUZaLENBR08sRUFBQyxDQUFSLENBQUEsQ0FBZTtDQUpqQixLQUFBO0NBS0MsQ0FBbUMsQ0FBaEMsQ0FBSCxFQUFTLENBQUEsQ0FBUyxDQUFULEVBQVY7Q0FWRixFQUlROztDQUpSOztDQURpQzs7QUFjbkMsQ0FqQkEsRUFpQmlCLEdBQVgsQ0FBTixhQWpCQTs7OztBQ0FBLElBQUEsV0FBQTtHQUFBOztrU0FBQTs7QUFBTSxDQUFOO0NBQ0U7Ozs7OztDQUFBOztDQUFBLEVBQU0sQ0FBTixTQUFBOztDQUFBLENBQUEsQ0FDYyxTQUFkOztDQURBLENBR3NCLENBQVYsRUFBQSxFQUFBLEVBQUUsQ0FBZDtDQU1FLEVBTlksQ0FBRCxDQU1YO0NBQUEsRUFOb0IsQ0FBRCxHQU1uQjtDQUFBLEVBQUEsQ0FBQSxFQUFhO0NBQ1osQ0FBVyxFQUFaLEVBQUEsQ0FBQSxJQUFBO0NBVkYsRUFHWTs7Q0FIWixFQVlRLEdBQVIsR0FBUTtDQUNOLFNBQU0sdUJBQU47Q0FiRixFQVlROztDQVpSLEVBZU0sQ0FBTixLQUFNO0NBQ0osRUFBSSxDQUFKO0NBQ0MsRUFBVSxDQUFWLEdBQUQsSUFBQTtDQWpCRixFQWVNOztDQWZOLEVBbUJNLENBQU4sS0FBTTtDQUNKLEVBQUksQ0FBSjtDQUNDLEVBQVUsQ0FBVixHQUFELElBQUE7Q0FyQkYsRUFtQk07O0NBbkJOLEVBdUJRLEdBQVIsR0FBUTtDQUFBLFVBQ04seUJBQUE7Q0F4QkYsRUF1QlE7O0NBdkJSLEVBMEJXLE1BQVg7O0NBMUJBOztDQURzQixPQUFROztBQTZCaEMsQ0E3QkEsRUE2QmlCLEdBQVgsQ0FBTixFQTdCQTs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxbFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkEsSUFBQSx5QkFBQTs7QUFBQSxDQUFBLEVBQXVCLElBQUEsYUFBdkIsMkJBQXVCOztBQUN2QixDQURBLEVBQ1UsSUFBViwyQkFBVTs7QUFFVixDQUhBLENBRzZDLENBQW5DLEdBQUosQ0FBZ0IsR0FBdEIsVUFBc0I7O0FBRXRCLENBTEEsRUFLVSxHQUFKLE1BQU4sT0FBQSIsInNvdXJjZXNDb250ZW50IjpbIlJlcG9ydFRhYiA9IHJlcXVpcmUgJy4vcmVwb3J0VGFiLmNvZmZlZSdcbnRlbXBsYXRlcyA9IHJlcXVpcmUgJy4uL3RlbXBsYXRlcy90ZW1wbGF0ZXMuanMnXG5kMyA9IHJlcXVpcmUgJy4uLy4uL25vZGVfbW9kdWxlcy9kMy9pbmRleC1icm93c2VyaWZ5LmpzJ1xuXG5jbGFzcyBEZW1vVGFiIGV4dGVuZHMgUmVwb3J0VGFiXG4gIG5hbWU6ICdFeGFtcGxlcydcbiAgY2xhc3NOYW1lOiAnZGVtbydcbiAgdGVtcGxhdGU6IHRlbXBsYXRlcy5kZW1vXG5cbiAgcmVuZGVyOiAoKSAtPlxuICAgICMgY3JlYXRlIHJhbmRvbSBkYXRhIGZvciB2aXN1YWxpemF0aW9uXG4gICAgZGF0YSA9IFtdXG4gICAgXy50aW1lcyAxMDAsICgpIC0+IGRhdGEucHVzaCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxMDApXG5cbiAgICAjIHNldHVwIGNvbnRleHQgb2JqZWN0IHdpdGggZGF0YSBhbmQgcmVuZGVyIHRoZSB0ZW1wbGF0ZSBmcm9tIGl0XG4gICAgY29udGV4dCA9XG4gICAgICBza2V0Y2g6IEBtb2RlbC5mb3JUZW1wbGF0ZSgpXG4gICAgICBza2V0Y2hDbGFzczogQHNrZXRjaENsYXNzLmZvclRlbXBsYXRlKClcbiAgICAgIGF0dHJpYnV0ZXM6IEBtb2RlbC5nZXRBdHRyaWJ1dGVzKClcbiAgICAgIGFkbWluOiBAcHJvamVjdC5pc0FkbWluIHdpbmRvdy51c2VyXG4gICAgICBjaGFydERhdGE6IF8ubWFwIGRhdGEsIChkLCBpKSAtPiB7aW5kZXg6IGksIHZhbHVlOiBkfVxuICAgIEAkZWwuaHRtbCBAdGVtcGxhdGUucmVuZGVyKGNvbnRleHQsIHRlbXBsYXRlcylcblxuICAgICMgU2V0dXAgYm9vdHN0cmFwIHRhYnNcbiAgICAkKCcjbXlUYWIgYScpLmNsaWNrIChlKSAtPlxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAkKHRoaXMpLnRhYignc2hvdycpXG4gICAgJCgnI3RhYnMyIGEnKS5jbGljayAoZSkgLT5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgJCh0aGlzKS50YWIoJ3Nob3cnKVxuXG4gICAgIyBkcmF3IGQzIHZpc3VhbGl6YXRpb25cbiAgICBAZHJhd0NoYXJ0KGRhdGEpXG5cbiAgZHJhd0NoYXJ0OiAoZGF0YSkgLT5cbiAgICBwID0gQCQoJyNjaGFydCBwJylcbiAgICBtYXJnaW4gPSBcbiAgICAgIHRvcDogMjBcbiAgICAgIHJpZ2h0OiAyMFxuICAgICAgYm90dG9tOiAzMFxuICAgICAgbGVmdDogNDBcblxuICAgIHdpZHRoID0gNDMwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHRcbiAgICBoZWlnaHQgPSAzMDAgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbVxuXG4gICAgeCA9IGQzLnNjYWxlLmxpbmVhcigpXG4gICAgICAucmFuZ2UgWzAsIHdpZHRoXVxuXG4gICAgeSA9IGQzLnNjYWxlLmxpbmVhcigpXG4gICAgICAucmFuZ2UgW2hlaWdodCwgMF1cblxuICAgIGNvbG9yID0gZDMuc2NhbGUuY2F0ZWdvcnkxMCgpXG5cbiAgICB4QXhpcyA9IGQzLnN2Zy5heGlzKClcbiAgICAgIC5zY2FsZSh4KVxuICAgICAgLm9yaWVudCBcImJvdHRvbVwiXG5cbiAgICB5QXhpcyA9IGQzLnN2Zy5heGlzKClcbiAgICAgIC5zY2FsZSh5KVxuICAgICAgLm9yaWVudCBcImxlZnRcIlxuXG4gICAgc3ZnID0gZDMuc2VsZWN0KFwiI2NoYXJ0XCIpLmFwcGVuZChcInN2Z1wiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aCArIG1hcmdpbi5sZWZ0ICsgbWFyZ2luLnJpZ2h0KVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXG4gICAgICAuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcbiAgICAgICAgICBcInRyYW5zbGF0ZSgje21hcmdpbi5sZWZ0fSwje21hcmdpbi50b3B9KVwiKVxuXG4gICAgeC5kb21haW4oWzAsIGRhdGEubGVuZ3RoXSkubmljZSgpXG4gICAgeS5kb21haW4oZDMuZXh0ZW50KGRhdGEsIChkKSAtPiBkKSkubmljZSgpXG5cbiAgICBzdmcuYXBwZW5kKFwiZ1wiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwieCBheGlzXCIpXG4gICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsI3toZWlnaHR9KVwiKVxuICAgICAgICAuY2FsbCh4QXhpcylcbiAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJsYWJlbFwiKVxuICAgICAgICAuYXR0cihcInhcIiwgd2lkdGgpXG4gICAgICAgIC5hdHRyKFwieVwiLCAtNilcblxuICAgIHN2Zy5hcHBlbmQoXCJnXCIpXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ5IGF4aXNcIilcbiAgICAgICAgLmNhbGwoeUF4aXMpXG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwibGFiZWxcIilcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoLTkwKVwiKVxuICAgICAgICAuYXR0cihcInlcIiwgNilcbiAgICAgICAgLmF0dHIoXCJkeVwiLCBcIi43MWVtXCIpXG5cbiAgICBzdmcuc2VsZWN0QWxsKFwiLmRvdFwiKVxuICAgICAgICAuZGF0YShkYXRhKVxuICAgICAgLmVudGVyKCkuYXBwZW5kKFwiY2lyY2xlXCIpXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJkb3RcIilcbiAgICAgICAgLmF0dHIoXCJyXCIsIDMuNSlcbiAgICAgICAgLmF0dHIoXCJjeFwiLCAoZCwgaSkgLT4geChpKSlcbiAgICAgICAgLmF0dHIoXCJjeVwiLCAoZCwgaSkgLT4geShkKSlcbiAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCAoZCkgLT4gY29sb3IoZCkpXG5cbiAgICBwLmRldGFjaCgpXG4gICAgQCQoJyNjaGFydCcpLmFwcGVuZCBwXG5cbm1vZHVsZS5leHBvcnRzID0gRGVtb1RhYiIsIlJlcG9ydFRhYiA9IHJlcXVpcmUgJy4vcmVwb3J0VGFiLmNvZmZlZSdcbnRlbXBsYXRlcyA9IHJlcXVpcmUgJy4uL3RlbXBsYXRlcy90ZW1wbGF0ZXMuanMnXG5cbmNsYXNzIEdlbmVyaWNBdHRyaWJ1dGVzVGFiIGV4dGVuZHMgUmVwb3J0VGFiXG4gIG5hbWU6ICdBdHRyaWJ1dGVzJ1xuICBjbGFzc05hbWU6ICdnZW5lcmljQXR0cmlidXRlcydcbiAgdGVtcGxhdGU6IHRlbXBsYXRlcy5nZW5lcmljQXR0cmlidXRlc1xuXG4gIHJlbmRlcjogKCkgLT5cbiAgICBjb250ZXh0ID1cbiAgICAgIHNrZXRjaDogQG1vZGVsLmZvclRlbXBsYXRlKClcbiAgICAgIHNrZXRjaENsYXNzOiBAc2tldGNoQ2xhc3MuZm9yVGVtcGxhdGUoKVxuICAgICAgYXR0cmlidXRlczogQG1vZGVsLmdldEF0dHJpYnV0ZXMoKVxuICAgICAgYWRtaW46IEBwcm9qZWN0LmlzQWRtaW4gd2luZG93LnVzZXJcbiAgICBAJGVsLmh0bWwgQHRlbXBsYXRlLnJlbmRlcihjb250ZXh0LCB0ZW1wbGF0ZXMpXG5cblxubW9kdWxlLmV4cG9ydHMgPSBHZW5lcmljQXR0cmlidXRlc1RhYiIsImNsYXNzIFJlcG9ydFRhYiBleHRlbmRzIEJhY2tib25lLlZpZXdcbiAgbmFtZTogJ0luZm9ybWF0aW9uJ1xuICBkZXBlbmRlbmNpZXM6IFtdXG5cbiAgaW5pdGlhbGl6ZTogKEBtb2RlbCwgQG9wdGlvbnMpIC0+XG4gICAgIyBXaWxsIGJlIGluaXRpYWxpemVkIGJ5IFNlYVNrZXRjaCB3aXRoIHRoZSBmb2xsb3dpbmcgYXJndW1lbnRzOlxuICAgICMgICAqIG1vZGVsIC0gVGhlIHNrZXRjaCBiZWluZyByZXBvcnRlZCBvblxuICAgICMgICAqIG9wdGlvbnNcbiAgICAjICAgICAtIC5wYXJlbnQgLSB0aGUgcGFyZW50IHJlcG9ydCB2aWV3IFxuICAgICMgICAgICAgIGNhbGwgQG9wdGlvbnMucGFyZW50LmRlc3Ryb3koKSB0byBjbG9zZSB0aGUgd2hvbGUgcmVwb3J0IHdpbmRvd1xuICAgIEBhcHAgPSB3aW5kb3cuYXBwXG4gICAgXy5leHRlbmQgQCwgQG9wdGlvbnNcblxuICByZW5kZXI6ICgpIC0+XG4gICAgdGhyb3cgJ3JlbmRlciBtZXRob2QgbXVzdCBiZSBvdmVyaWRkZW4nXG5cbiAgc2hvdzogKCkgLT5cbiAgICBAJGVsLnNob3coKVxuICAgIEB2aXNpYmxlID0gdHJ1ZVxuXG4gIGhpZGU6ICgpIC0+XG4gICAgQCRlbC5oaWRlKClcbiAgICBAdmlzaWJsZSA9IGZhbHNlXG5cbiAgcmVtb3ZlOiAoKSA9PlxuICAgIHN1cGVyKClcbiAgXG4gIG9uTG9hZGluZzogKCkgLT4gIyBleHRlbnNpb24gcG9pbnQgZm9yIHN1YmNsYXNzZXNcblxubW9kdWxlLmV4cG9ydHMgPSBSZXBvcnRUYWIiLCJ0aGlzW1wiVGVtcGxhdGVzXCJdID0gdGhpc1tcIlRlbXBsYXRlc1wiXSB8fCB7fTtcblxudGhpc1tcIlRlbXBsYXRlc1wiXVtcImF0dHJpYnV0ZXMvYXR0cmlidXRlSXRlbVwiXSA9IG5ldyBIb2dhbi5UZW1wbGF0ZShmdW5jdGlvbihjLHAsaSl7dmFyIF89dGhpcztfLmIoaT1pfHxcIlwiKTtfLmIoXCI8dHIgZGF0YS1hdHRyaWJ1dGUtaWQ9XFxcIlwiKTtfLmIoXy52KF8uZihcImlkXCIsYyxwLDApKSk7Xy5iKFwiXFxcIiBkYXRhLWF0dHJpYnV0ZS1leHBvcnRpZD1cXFwiXCIpO18uYihfLnYoXy5mKFwiZXhwb3J0aWRcIixjLHAsMCkpKTtfLmIoXCJcXFwiIGRhdGEtYXR0cmlidXRlLXR5cGU9XFxcIlwiKTtfLmIoXy52KF8uZihcInR5cGVcIixjLHAsMCkpKTtfLmIoXCJcXFwiPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgPHRkIGNsYXNzPVxcXCJuYW1lXFxcIj5cIik7Xy5iKF8udihfLmYoXCJuYW1lXCIsYyxwLDApKSk7Xy5iKFwiPC90ZD5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgIDx0ZCBjbGFzcz1cXFwidmFsdWVcXFwiPlwiKTtfLmIoXy52KF8uZihcImZvcm1hdHRlZFZhbHVlXCIsYyxwLDApKSk7Xy5iKFwiPC90ZD5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCI8L3RyPlwiKTtyZXR1cm4gXy5mbCgpOzt9KTtcblxudGhpc1tcIlRlbXBsYXRlc1wiXVtcImF0dHJpYnV0ZXMvYXR0cmlidXRlc1RhYmxlXCJdID0gbmV3IEhvZ2FuLlRlbXBsYXRlKGZ1bmN0aW9uKGMscCxpKXt2YXIgXz10aGlzO18uYihpPWl8fFwiXCIpO18uYihcIjx0YWJsZSBjbGFzcz1cXFwiYXR0cmlidXRlc1xcXCI+XCIpO18uYihcIlxcblwiICsgaSk7aWYoXy5zKF8uZihcImF0dHJpYnV0ZXNcIixjLHAsMSksYyxwLDAsNDQsODEsXCJ7eyB9fVwiKSl7Xy5ycyhjLHAsZnVuY3Rpb24oYyxwLF8pe18uYihfLnJwKFwiYXR0cmlidXRlcy9hdHRyaWJ1dGVJdGVtXCIsYyxwLFwiICAgIFwiKSk7fSk7Yy5wb3AoKTt9Xy5iKFwiPC90YWJsZT5cIik7Xy5iKFwiXFxuXCIpO3JldHVybiBfLmZsKCk7O30pO1xuXG50aGlzW1wiVGVtcGxhdGVzXCJdW1wiZGVtb1wiXSA9IG5ldyBIb2dhbi5UZW1wbGF0ZShmdW5jdGlvbihjLHAsaSl7dmFyIF89dGhpcztfLmIoaT1pfHxcIlwiKTtfLmIoXCI8ZGl2IGNsYXNzPVxcXCJyZXBvcnRTZWN0aW9uXFxcIj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgIDxoND5SZXBvcnQgU2VjdGlvbnM8L2g0PlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgPHA+VXNlIHJlcG9ydCBzZWN0aW9ucyB0byBncm91cCBpbmZvcm1hdGlvbiBpbnRvIG1lYW5pbmdmdWwgY2F0ZWdvcmllczwvcD5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCI8L2Rpdj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIjxkaXYgY2xhc3M9XFxcInJlcG9ydFNlY3Rpb25cXFwiPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgPGg0PkQzIFZpc3VhbGl6YXRpb25zPC9oND5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgIDx1bCBjbGFzcz1cXFwibmF2IG5hdi1waWxsc1xcXCIgaWQ9XFxcInRhYnMyXFxcIj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgPGxpIGNsYXNzPVxcXCJhY3RpdmVcXFwiPjxhIGhyZWY9XFxcIiNjaGFydFxcXCI+Q2hhcnQ8L2E+PC9saT5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgPGxpPjxhIGhyZWY9XFxcIiNkYXRhVGFibGVcXFwiPlRhYmxlPC9hPjwvbGk+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICA8L3VsPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgPGRpdiBjbGFzcz1cXFwidGFiLWNvbnRlbnRcXFwiPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICA8ZGl2IGNsYXNzPVxcXCJ0YWItcGFuZSBhY3RpdmVcXFwiIGlkPVxcXCJjaGFydFxcXCI+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgPCEtLVtpZiBJRSA4XT5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgICA8cCBjbGFzcz1cXFwidW5zdXBwb3J0ZWRcXFwiPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgIFRoaXMgdmlzdWFsaXphdGlvbiBpcyBub3QgY29tcGF0aWJsZSB3aXRoIEludGVybmV0IEV4cGxvcmVyIDguIFwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgIFBsZWFzZSB1cGdyYWRlIHlvdXIgYnJvd3Nlciwgb3IgdmlldyByZXN1bHRzIGluIHRoZSB0YWJsZSB0YWIuXCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgPC9wPiAgICAgIFwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgIDwhW2VuZGlmXS0tPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgIDxwPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgICAgU2VlIDxjb2RlPnNyYy9zY3JpcHRzL2RlbW8uY29mZmVlPC9jb2RlPiBmb3IgYW4gZXhhbXBsZSBvZiBob3cgdG8gXCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgICB1c2UgZDMuanMgdG8gcmVuZGVyIHZpc3VhbGl6YXRpb25zLiBQcm92aWRlIGEgdGFibGUtYmFzZWQgdmlld1wiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgICAgYW5kIHVzZSBjb25kaXRpb25hbCBjb21tZW50cyB0byBwcm92aWRlIGEgZmFsbGJhY2sgZm9yIElFOCB1c2Vycy5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgICAgIDxicj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgICAgIDxhIGhyZWY9XFxcImh0dHA6Ly90d2l0dGVyLmdpdGh1Yi5pby9ib290c3RyYXAvMi4zLjIvXFxcIj5Cb290c3RyYXAgMi54PC9hPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgICAgaXMgbG9hZGVkIHdpdGhpbiBTZWFTa2V0Y2ggc28geW91IGNhbiB1c2UgaXQgdG8gY3JlYXRlIHRhYnMgYW5kIG90aGVyIFwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgICAgaW50ZXJmYWNlIGNvbXBvbmVudHMuIGpRdWVyeSBhbmQgdW5kZXJzY29yZSBhcmUgYWxzbyBhdmFpbGFibGUuXCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgPC9wPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICA8L2Rpdj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgPGRpdiBjbGFzcz1cXFwidGFiLXBhbmVcXFwiIGlkPVxcXCJkYXRhVGFibGVcXFwiPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgIDx0YWJsZT5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgICAgIDx0aGVhZD5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgICAgICAgPHRyPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgICAgICAgICAgIDx0aD5pbmRleDwvdGg+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgICAgICAgPHRoPnZhbHVlPC90aD5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgICAgICAgPC90cj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgICAgIDwvdGhlYWQ+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgICA8dGJvZHk+XCIpO18uYihcIlxcblwiICsgaSk7aWYoXy5zKF8uZihcImNoYXJ0RGF0YVwiLGMscCwxKSxjLHAsMCwxMzUxLDE0MTgsXCJ7eyB9fVwiKSl7Xy5ycyhjLHAsZnVuY3Rpb24oYyxwLF8pe18uYihcIiAgICAgICAgICA8dHI+PHRkPlwiKTtfLmIoXy52KF8uZihcImluZGV4XCIsYyxwLDApKSk7Xy5iKFwiPC90ZD48dGQ+XCIpO18uYihfLnYoXy5mKFwidmFsdWVcIixjLHAsMCkpKTtfLmIoXCI8L3RkPjwvdHI+XCIpO18uYihcIlxcblwiKTt9KTtjLnBvcCgpO31fLmIoXCIgICAgICAgIDwvdGJvZHk+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICAgICAgPC90YWJsZT5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgICAgPC9kaXY+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICA8L2Rpdj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCI8L2Rpdj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIjxkaXYgY2xhc3M9XFxcInJlcG9ydFNlY3Rpb24gZW1waGFzaXNcXFwiPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgPGg0PkVtcGhhc2lzPC9oND5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCIgIDxwPkdpdmUgcmVwb3J0IHNlY3Rpb25zIGFuIDxjb2RlPmVtcGhhc2lzPC9jb2RlPiBjbGFzcyB0byBoaWdobGlnaHQgaW1wb3J0YW50IGluZm9ybWF0aW9uLjwvcD5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCI8L2Rpdj5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIjxkaXYgY2xhc3M9XFxcInJlcG9ydFNlY3Rpb24gd2FybmluZ1xcXCI+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICA8aDQ+V2FybmluZzwvaDQ+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICA8cD5PciA8Y29kZT53YXJuPC9jb2RlPiBvZiBwb3RlbnRpYWwgcHJvYmxlbXMuPC9wPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIjwvZGl2PlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiPGRpdiBjbGFzcz1cXFwicmVwb3J0U2VjdGlvbiBkYW5nZXJcXFwiPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgPGg0PkRhbmdlcjwvaDQ+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICA8cD48Y29kZT5kYW5nZXI8L2NvZGU+IGNhbiBhbHNvIGJlIHVzZWQuLi4gc3BhcmluZ2x5LjwvcD5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXCI8L2Rpdj5cIik7Xy5iKFwiXFxuXCIpO3JldHVybiBfLmZsKCk7O30pO1xuXG50aGlzW1wiVGVtcGxhdGVzXCJdW1wiZ2VuZXJpY0F0dHJpYnV0ZXNcIl0gPSBuZXcgSG9nYW4uVGVtcGxhdGUoZnVuY3Rpb24oYyxwLGkpe3ZhciBfPXRoaXM7Xy5iKGk9aXx8XCJcIik7aWYoXy5zKF8uZChcInNrZXRjaENsYXNzLmRlbGV0ZWRcIixjLHAsMSksYyxwLDAsMjQsMjcwLFwie3sgfX1cIikpe18ucnMoYyxwLGZ1bmN0aW9uKGMscCxfKXtfLmIoXCI8ZGl2IGNsYXNzPVxcXCJhbGVydCBhbGVydC13YXJuXFxcIiBzdHlsZT1cXFwibWFyZ2luLWJvdHRvbToxMHB4O1xcXCI+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICBUaGlzIHNrZXRjaCB3YXMgY3JlYXRlZCB1c2luZyB0aGUgXFxcIlwiKTtfLmIoXy52KF8uZChcInNrZXRjaENsYXNzLm5hbWVcIixjLHAsMCkpKTtfLmIoXCJcXFwiIHRlbXBsYXRlLCB3aGljaCBpc1wiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgbm8gbG9uZ2VyIGF2YWlsYWJsZS4gWW91IHdpbGwgbm90IGJlIGFibGUgdG8gY29weSB0aGlzIHNrZXRjaCBvciBtYWtlIG5ld1wiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIiAgc2tldGNoZXMgb2YgdGhpcyB0eXBlLlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIjwvZGl2PlwiKTtfLmIoXCJcXG5cIik7fSk7Yy5wb3AoKTt9Xy5iKFwiPGRpdiBjbGFzcz1cXFwicmVwb3J0U2VjdGlvblxcXCI+XCIpO18uYihcIlxcblwiICsgaSk7Xy5iKFwiICA8aDQ+XCIpO18uYihfLnYoXy5kKFwic2tldGNoQ2xhc3MubmFtZVwiLGMscCwwKSkpO18uYihcIiBBdHRyaWJ1dGVzPC9oND5cIik7Xy5iKFwiXFxuXCIgKyBpKTtfLmIoXy5ycChcImF0dHJpYnV0ZXMvYXR0cmlidXRlc1RhYmxlXCIsYyxwLFwiICAgIFwiKSk7Xy5iKFwiICA8L3RhYmxlPlwiKTtfLmIoXCJcXG5cIiArIGkpO18uYihcIjwvZGl2PlwiKTtfLmIoXCJcXG5cIik7cmV0dXJuIF8uZmwoKTs7fSk7XG5cbm1vZHVsZS5leHBvcnRzID0gdGhpc1tcIlRlbXBsYXRlc1wiXTsiLCJkMyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZDMgPSB7XG4gICAgdmVyc2lvbjogXCIzLjIuN1wiXG4gIH07XG4gIGlmICghRGF0ZS5ub3cpIERhdGUubm93ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICtuZXcgRGF0ZSgpO1xuICB9O1xuICB2YXIgZDNfZG9jdW1lbnQgPSBkb2N1bWVudCwgZDNfZG9jdW1lbnRFbGVtZW50ID0gZDNfZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkM193aW5kb3cgPSB3aW5kb3c7XG4gIHRyeSB7XG4gICAgZDNfZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKS5zdHlsZS5zZXRQcm9wZXJ0eShcIm9wYWNpdHlcIiwgMCwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdmFyIGQzX2VsZW1lbnRfcHJvdG90eXBlID0gZDNfd2luZG93LkVsZW1lbnQucHJvdG90eXBlLCBkM19lbGVtZW50X3NldEF0dHJpYnV0ZSA9IGQzX2VsZW1lbnRfcHJvdG90eXBlLnNldEF0dHJpYnV0ZSwgZDNfZWxlbWVudF9zZXRBdHRyaWJ1dGVOUyA9IGQzX2VsZW1lbnRfcHJvdG90eXBlLnNldEF0dHJpYnV0ZU5TLCBkM19zdHlsZV9wcm90b3R5cGUgPSBkM193aW5kb3cuQ1NTU3R5bGVEZWNsYXJhdGlvbi5wcm90b3R5cGUsIGQzX3N0eWxlX3NldFByb3BlcnR5ID0gZDNfc3R5bGVfcHJvdG90eXBlLnNldFByb3BlcnR5O1xuICAgIGQzX2VsZW1lbnRfcHJvdG90eXBlLnNldEF0dHJpYnV0ZSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICBkM19lbGVtZW50X3NldEF0dHJpYnV0ZS5jYWxsKHRoaXMsIG5hbWUsIHZhbHVlICsgXCJcIik7XG4gICAgfTtcbiAgICBkM19lbGVtZW50X3Byb3RvdHlwZS5zZXRBdHRyaWJ1dGVOUyA9IGZ1bmN0aW9uKHNwYWNlLCBsb2NhbCwgdmFsdWUpIHtcbiAgICAgIGQzX2VsZW1lbnRfc2V0QXR0cmlidXRlTlMuY2FsbCh0aGlzLCBzcGFjZSwgbG9jYWwsIHZhbHVlICsgXCJcIik7XG4gICAgfTtcbiAgICBkM19zdHlsZV9wcm90b3R5cGUuc2V0UHJvcGVydHkgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpIHtcbiAgICAgIGQzX3N0eWxlX3NldFByb3BlcnR5LmNhbGwodGhpcywgbmFtZSwgdmFsdWUgKyBcIlwiLCBwcmlvcml0eSk7XG4gICAgfTtcbiAgfVxuICBkMy5hc2NlbmRpbmcgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGEgPCBiID8gLTEgOiBhID4gYiA/IDEgOiBhID49IGIgPyAwIDogTmFOO1xuICB9O1xuICBkMy5kZXNjZW5kaW5nID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBiIDwgYSA/IC0xIDogYiA+IGEgPyAxIDogYiA+PSBhID8gMCA6IE5hTjtcbiAgfTtcbiAgZDMubWluID0gZnVuY3Rpb24oYXJyYXksIGYpIHtcbiAgICB2YXIgaSA9IC0xLCBuID0gYXJyYXkubGVuZ3RoLCBhLCBiO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICB3aGlsZSAoKytpIDwgbiAmJiAhKChhID0gYXJyYXlbaV0pICE9IG51bGwgJiYgYSA8PSBhKSkgYSA9IHVuZGVmaW5lZDtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoKGIgPSBhcnJheVtpXSkgIT0gbnVsbCAmJiBhID4gYikgYSA9IGI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdoaWxlICgrK2kgPCBuICYmICEoKGEgPSBmLmNhbGwoYXJyYXksIGFycmF5W2ldLCBpKSkgIT0gbnVsbCAmJiBhIDw9IGEpKSBhID0gdW5kZWZpbmVkO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIGlmICgoYiA9IGYuY2FsbChhcnJheSwgYXJyYXlbaV0sIGkpKSAhPSBudWxsICYmIGEgPiBiKSBhID0gYjtcbiAgICB9XG4gICAgcmV0dXJuIGE7XG4gIH07XG4gIGQzLm1heCA9IGZ1bmN0aW9uKGFycmF5LCBmKSB7XG4gICAgdmFyIGkgPSAtMSwgbiA9IGFycmF5Lmxlbmd0aCwgYSwgYjtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgd2hpbGUgKCsraSA8IG4gJiYgISgoYSA9IGFycmF5W2ldKSAhPSBudWxsICYmIGEgPD0gYSkpIGEgPSB1bmRlZmluZWQ7XG4gICAgICB3aGlsZSAoKytpIDwgbikgaWYgKChiID0gYXJyYXlbaV0pICE9IG51bGwgJiYgYiA+IGEpIGEgPSBiO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aGlsZSAoKytpIDwgbiAmJiAhKChhID0gZi5jYWxsKGFycmF5LCBhcnJheVtpXSwgaSkpICE9IG51bGwgJiYgYSA8PSBhKSkgYSA9IHVuZGVmaW5lZDtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoKGIgPSBmLmNhbGwoYXJyYXksIGFycmF5W2ldLCBpKSkgIT0gbnVsbCAmJiBiID4gYSkgYSA9IGI7XG4gICAgfVxuICAgIHJldHVybiBhO1xuICB9O1xuICBkMy5leHRlbnQgPSBmdW5jdGlvbihhcnJheSwgZikge1xuICAgIHZhciBpID0gLTEsIG4gPSBhcnJheS5sZW5ndGgsIGEsIGIsIGM7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHdoaWxlICgrK2kgPCBuICYmICEoKGEgPSBjID0gYXJyYXlbaV0pICE9IG51bGwgJiYgYSA8PSBhKSkgYSA9IGMgPSB1bmRlZmluZWQ7XG4gICAgICB3aGlsZSAoKytpIDwgbikgaWYgKChiID0gYXJyYXlbaV0pICE9IG51bGwpIHtcbiAgICAgICAgaWYgKGEgPiBiKSBhID0gYjtcbiAgICAgICAgaWYgKGMgPCBiKSBjID0gYjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgd2hpbGUgKCsraSA8IG4gJiYgISgoYSA9IGMgPSBmLmNhbGwoYXJyYXksIGFycmF5W2ldLCBpKSkgIT0gbnVsbCAmJiBhIDw9IGEpKSBhID0gdW5kZWZpbmVkO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIGlmICgoYiA9IGYuY2FsbChhcnJheSwgYXJyYXlbaV0sIGkpKSAhPSBudWxsKSB7XG4gICAgICAgIGlmIChhID4gYikgYSA9IGI7XG4gICAgICAgIGlmIChjIDwgYikgYyA9IGI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbIGEsIGMgXTtcbiAgfTtcbiAgZDMuc3VtID0gZnVuY3Rpb24oYXJyYXksIGYpIHtcbiAgICB2YXIgcyA9IDAsIG4gPSBhcnJheS5sZW5ndGgsIGEsIGkgPSAtMTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgd2hpbGUgKCsraSA8IG4pIGlmICghaXNOYU4oYSA9ICthcnJheVtpXSkpIHMgKz0gYTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2hpbGUgKCsraSA8IG4pIGlmICghaXNOYU4oYSA9ICtmLmNhbGwoYXJyYXksIGFycmF5W2ldLCBpKSkpIHMgKz0gYTtcbiAgICB9XG4gICAgcmV0dXJuIHM7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX251bWJlcih4KSB7XG4gICAgcmV0dXJuIHggIT0gbnVsbCAmJiAhaXNOYU4oeCk7XG4gIH1cbiAgZDMubWVhbiA9IGZ1bmN0aW9uKGFycmF5LCBmKSB7XG4gICAgdmFyIG4gPSBhcnJheS5sZW5ndGgsIGEsIG0gPSAwLCBpID0gLTEsIGogPSAwO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICB3aGlsZSAoKytpIDwgbikgaWYgKGQzX251bWJlcihhID0gYXJyYXlbaV0pKSBtICs9IChhIC0gbSkgLyArK2o7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoZDNfbnVtYmVyKGEgPSBmLmNhbGwoYXJyYXksIGFycmF5W2ldLCBpKSkpIG0gKz0gKGEgLSBtKSAvICsrajtcbiAgICB9XG4gICAgcmV0dXJuIGogPyBtIDogdW5kZWZpbmVkO1xuICB9O1xuICBkMy5xdWFudGlsZSA9IGZ1bmN0aW9uKHZhbHVlcywgcCkge1xuICAgIHZhciBIID0gKHZhbHVlcy5sZW5ndGggLSAxKSAqIHAgKyAxLCBoID0gTWF0aC5mbG9vcihIKSwgdiA9ICt2YWx1ZXNbaCAtIDFdLCBlID0gSCAtIGg7XG4gICAgcmV0dXJuIGUgPyB2ICsgZSAqICh2YWx1ZXNbaF0gLSB2KSA6IHY7XG4gIH07XG4gIGQzLm1lZGlhbiA9IGZ1bmN0aW9uKGFycmF5LCBmKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSBhcnJheSA9IGFycmF5Lm1hcChmKTtcbiAgICBhcnJheSA9IGFycmF5LmZpbHRlcihkM19udW1iZXIpO1xuICAgIHJldHVybiBhcnJheS5sZW5ndGggPyBkMy5xdWFudGlsZShhcnJheS5zb3J0KGQzLmFzY2VuZGluZyksIC41KSA6IHVuZGVmaW5lZDtcbiAgfTtcbiAgZDMuYmlzZWN0b3IgPSBmdW5jdGlvbihmKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxlZnQ6IGZ1bmN0aW9uKGEsIHgsIGxvLCBoaSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIGxvID0gMDtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCA0KSBoaSA9IGEubGVuZ3RoO1xuICAgICAgICB3aGlsZSAobG8gPCBoaSkge1xuICAgICAgICAgIHZhciBtaWQgPSBsbyArIGhpID4+PiAxO1xuICAgICAgICAgIGlmIChmLmNhbGwoYSwgYVttaWRdLCBtaWQpIDwgeCkgbG8gPSBtaWQgKyAxOyBlbHNlIGhpID0gbWlkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsbztcbiAgICAgIH0sXG4gICAgICByaWdodDogZnVuY3Rpb24oYSwgeCwgbG8sIGhpKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykgbG8gPSAwO1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDQpIGhpID0gYS5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChsbyA8IGhpKSB7XG4gICAgICAgICAgdmFyIG1pZCA9IGxvICsgaGkgPj4+IDE7XG4gICAgICAgICAgaWYgKHggPCBmLmNhbGwoYSwgYVttaWRdLCBtaWQpKSBoaSA9IG1pZDsgZWxzZSBsbyA9IG1pZCArIDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxvO1xuICAgICAgfVxuICAgIH07XG4gIH07XG4gIHZhciBkM19iaXNlY3RvciA9IGQzLmJpc2VjdG9yKGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gZDtcbiAgfSk7XG4gIGQzLmJpc2VjdExlZnQgPSBkM19iaXNlY3Rvci5sZWZ0O1xuICBkMy5iaXNlY3QgPSBkMy5iaXNlY3RSaWdodCA9IGQzX2Jpc2VjdG9yLnJpZ2h0O1xuICBkMy5zaHVmZmxlID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICB2YXIgbSA9IGFycmF5Lmxlbmd0aCwgdCwgaTtcbiAgICB3aGlsZSAobSkge1xuICAgICAgaSA9IE1hdGgucmFuZG9tKCkgKiBtLS0gfCAwO1xuICAgICAgdCA9IGFycmF5W21dLCBhcnJheVttXSA9IGFycmF5W2ldLCBhcnJheVtpXSA9IHQ7XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbiAgfTtcbiAgZDMucGVybXV0ZSA9IGZ1bmN0aW9uKGFycmF5LCBpbmRleGVzKSB7XG4gICAgdmFyIHBlcm11dGVzID0gW10sIGkgPSAtMSwgbiA9IGluZGV4ZXMubGVuZ3RoO1xuICAgIHdoaWxlICgrK2kgPCBuKSBwZXJtdXRlc1tpXSA9IGFycmF5W2luZGV4ZXNbaV1dO1xuICAgIHJldHVybiBwZXJtdXRlcztcbiAgfTtcbiAgZDMuemlwID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCEobiA9IGFyZ3VtZW50cy5sZW5ndGgpKSByZXR1cm4gW107XG4gICAgZm9yICh2YXIgaSA9IC0xLCBtID0gZDMubWluKGFyZ3VtZW50cywgZDNfemlwTGVuZ3RoKSwgemlwcyA9IG5ldyBBcnJheShtKTsgKytpIDwgbTsgKSB7XG4gICAgICBmb3IgKHZhciBqID0gLTEsIG4sIHppcCA9IHppcHNbaV0gPSBuZXcgQXJyYXkobik7ICsraiA8IG47ICkge1xuICAgICAgICB6aXBbal0gPSBhcmd1bWVudHNbal1baV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB6aXBzO1xuICB9O1xuICBmdW5jdGlvbiBkM196aXBMZW5ndGgoZCkge1xuICAgIHJldHVybiBkLmxlbmd0aDtcbiAgfVxuICBkMy50cmFuc3Bvc2UgPSBmdW5jdGlvbihtYXRyaXgpIHtcbiAgICByZXR1cm4gZDMuemlwLmFwcGx5KGQzLCBtYXRyaXgpO1xuICB9O1xuICBkMy5rZXlzID0gZnVuY3Rpb24obWFwKSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gbWFwKSBrZXlzLnB1c2goa2V5KTtcbiAgICByZXR1cm4ga2V5cztcbiAgfTtcbiAgZDMudmFsdWVzID0gZnVuY3Rpb24obWFwKSB7XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBtYXApIHZhbHVlcy5wdXNoKG1hcFtrZXldKTtcbiAgICByZXR1cm4gdmFsdWVzO1xuICB9O1xuICBkMy5lbnRyaWVzID0gZnVuY3Rpb24obWFwKSB7XG4gICAgdmFyIGVudHJpZXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gbWFwKSBlbnRyaWVzLnB1c2goe1xuICAgICAga2V5OiBrZXksXG4gICAgICB2YWx1ZTogbWFwW2tleV1cbiAgICB9KTtcbiAgICByZXR1cm4gZW50cmllcztcbiAgfTtcbiAgZDMubWVyZ2UgPSBmdW5jdGlvbihhcnJheXMpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgYXJyYXlzKTtcbiAgfTtcbiAgZDMucmFuZ2UgPSBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xuICAgICAgc3RlcCA9IDE7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgc3RvcCA9IHN0YXJ0O1xuICAgICAgICBzdGFydCA9IDA7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICgoc3RvcCAtIHN0YXJ0KSAvIHN0ZXAgPT09IEluZmluaXR5KSB0aHJvdyBuZXcgRXJyb3IoXCJpbmZpbml0ZSByYW5nZVwiKTtcbiAgICB2YXIgcmFuZ2UgPSBbXSwgayA9IGQzX3JhbmdlX2ludGVnZXJTY2FsZShNYXRoLmFicyhzdGVwKSksIGkgPSAtMSwgajtcbiAgICBzdGFydCAqPSBrLCBzdG9wICo9IGssIHN0ZXAgKj0gaztcbiAgICBpZiAoc3RlcCA8IDApIHdoaWxlICgoaiA9IHN0YXJ0ICsgc3RlcCAqICsraSkgPiBzdG9wKSByYW5nZS5wdXNoKGogLyBrKTsgZWxzZSB3aGlsZSAoKGogPSBzdGFydCArIHN0ZXAgKiArK2kpIDwgc3RvcCkgcmFuZ2UucHVzaChqIC8gayk7XG4gICAgcmV0dXJuIHJhbmdlO1xuICB9O1xuICBmdW5jdGlvbiBkM19yYW5nZV9pbnRlZ2VyU2NhbGUoeCkge1xuICAgIHZhciBrID0gMTtcbiAgICB3aGlsZSAoeCAqIGsgJSAxKSBrICo9IDEwO1xuICAgIHJldHVybiBrO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2NsYXNzKGN0b3IsIHByb3BlcnRpZXMpIHtcbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN0b3IucHJvdG90eXBlLCBrZXksIHtcbiAgICAgICAgICB2YWx1ZTogcHJvcGVydGllc1trZXldLFxuICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGN0b3IucHJvdG90eXBlID0gcHJvcGVydGllcztcbiAgICB9XG4gIH1cbiAgZDMubWFwID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIG1hcCA9IG5ldyBkM19NYXAoKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSBtYXAuc2V0KGtleSwgb2JqZWN0W2tleV0pO1xuICAgIHJldHVybiBtYXA7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX01hcCgpIHt9XG4gIGQzX2NsYXNzKGQzX01hcCwge1xuICAgIGhhczogZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gZDNfbWFwX3ByZWZpeCArIGtleSBpbiB0aGlzO1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzW2QzX21hcF9wcmVmaXggKyBrZXldO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpc1tkM19tYXBfcHJlZml4ICsga2V5XSA9IHZhbHVlO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIGtleSA9IGQzX21hcF9wcmVmaXggKyBrZXk7XG4gICAgICByZXR1cm4ga2V5IGluIHRoaXMgJiYgZGVsZXRlIHRoaXNba2V5XTtcbiAgICB9LFxuICAgIGtleXM6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGtleXMgPSBbXTtcbiAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBrZXlzO1xuICAgIH0sXG4gICAgdmFsdWVzOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9LFxuICAgIGVudHJpZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGVudHJpZXMgPSBbXTtcbiAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgIGVudHJpZXMucHVzaCh7XG4gICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZW50cmllcztcbiAgICB9LFxuICAgIGZvckVhY2g6IGZ1bmN0aW9uKGYpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG4gICAgICAgIGlmIChrZXkuY2hhckNvZGVBdCgwKSA9PT0gZDNfbWFwX3ByZWZpeENvZGUpIHtcbiAgICAgICAgICBmLmNhbGwodGhpcywga2V5LnN1YnN0cmluZygxKSwgdGhpc1trZXldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHZhciBkM19tYXBfcHJlZml4ID0gXCJcXDBcIiwgZDNfbWFwX3ByZWZpeENvZGUgPSBkM19tYXBfcHJlZml4LmNoYXJDb2RlQXQoMCk7XG4gIGQzLm5lc3QgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbmVzdCA9IHt9LCBrZXlzID0gW10sIHNvcnRLZXlzID0gW10sIHNvcnRWYWx1ZXMsIHJvbGx1cDtcbiAgICBmdW5jdGlvbiBtYXAobWFwVHlwZSwgYXJyYXksIGRlcHRoKSB7XG4gICAgICBpZiAoZGVwdGggPj0ga2V5cy5sZW5ndGgpIHJldHVybiByb2xsdXAgPyByb2xsdXAuY2FsbChuZXN0LCBhcnJheSkgOiBzb3J0VmFsdWVzID8gYXJyYXkuc29ydChzb3J0VmFsdWVzKSA6IGFycmF5O1xuICAgICAgdmFyIGkgPSAtMSwgbiA9IGFycmF5Lmxlbmd0aCwga2V5ID0ga2V5c1tkZXB0aCsrXSwga2V5VmFsdWUsIG9iamVjdCwgc2V0dGVyLCB2YWx1ZXNCeUtleSA9IG5ldyBkM19NYXAoKSwgdmFsdWVzO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgaWYgKHZhbHVlcyA9IHZhbHVlc0J5S2V5LmdldChrZXlWYWx1ZSA9IGtleShvYmplY3QgPSBhcnJheVtpXSkpKSB7XG4gICAgICAgICAgdmFsdWVzLnB1c2gob2JqZWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZXNCeUtleS5zZXQoa2V5VmFsdWUsIFsgb2JqZWN0IF0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWFwVHlwZSkge1xuICAgICAgICBvYmplY3QgPSBtYXBUeXBlKCk7XG4gICAgICAgIHNldHRlciA9IGZ1bmN0aW9uKGtleVZhbHVlLCB2YWx1ZXMpIHtcbiAgICAgICAgICBvYmplY3Quc2V0KGtleVZhbHVlLCBtYXAobWFwVHlwZSwgdmFsdWVzLCBkZXB0aCkpO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2JqZWN0ID0ge307XG4gICAgICAgIHNldHRlciA9IGZ1bmN0aW9uKGtleVZhbHVlLCB2YWx1ZXMpIHtcbiAgICAgICAgICBvYmplY3Rba2V5VmFsdWVdID0gbWFwKG1hcFR5cGUsIHZhbHVlcywgZGVwdGgpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgdmFsdWVzQnlLZXkuZm9yRWFjaChzZXR0ZXIpO1xuICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG4gICAgZnVuY3Rpb24gZW50cmllcyhtYXAsIGRlcHRoKSB7XG4gICAgICBpZiAoZGVwdGggPj0ga2V5cy5sZW5ndGgpIHJldHVybiBtYXA7XG4gICAgICB2YXIgYXJyYXkgPSBbXSwgc29ydEtleSA9IHNvcnRLZXlzW2RlcHRoKytdO1xuICAgICAgbWFwLmZvckVhY2goZnVuY3Rpb24oa2V5LCBrZXlNYXApIHtcbiAgICAgICAgYXJyYXkucHVzaCh7XG4gICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgdmFsdWVzOiBlbnRyaWVzKGtleU1hcCwgZGVwdGgpXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gc29ydEtleSA/IGFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gc29ydEtleShhLmtleSwgYi5rZXkpO1xuICAgICAgfSkgOiBhcnJheTtcbiAgICB9XG4gICAgbmVzdC5tYXAgPSBmdW5jdGlvbihhcnJheSwgbWFwVHlwZSkge1xuICAgICAgcmV0dXJuIG1hcChtYXBUeXBlLCBhcnJheSwgMCk7XG4gICAgfTtcbiAgICBuZXN0LmVudHJpZXMgPSBmdW5jdGlvbihhcnJheSkge1xuICAgICAgcmV0dXJuIGVudHJpZXMobWFwKGQzLm1hcCwgYXJyYXksIDApLCAwKTtcbiAgICB9O1xuICAgIG5lc3Qua2V5ID0gZnVuY3Rpb24oZCkge1xuICAgICAga2V5cy5wdXNoKGQpO1xuICAgICAgcmV0dXJuIG5lc3Q7XG4gICAgfTtcbiAgICBuZXN0LnNvcnRLZXlzID0gZnVuY3Rpb24ob3JkZXIpIHtcbiAgICAgIHNvcnRLZXlzW2tleXMubGVuZ3RoIC0gMV0gPSBvcmRlcjtcbiAgICAgIHJldHVybiBuZXN0O1xuICAgIH07XG4gICAgbmVzdC5zb3J0VmFsdWVzID0gZnVuY3Rpb24ob3JkZXIpIHtcbiAgICAgIHNvcnRWYWx1ZXMgPSBvcmRlcjtcbiAgICAgIHJldHVybiBuZXN0O1xuICAgIH07XG4gICAgbmVzdC5yb2xsdXAgPSBmdW5jdGlvbihmKSB7XG4gICAgICByb2xsdXAgPSBmO1xuICAgICAgcmV0dXJuIG5lc3Q7XG4gICAgfTtcbiAgICByZXR1cm4gbmVzdDtcbiAgfTtcbiAgZDMuc2V0ID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICB2YXIgc2V0ID0gbmV3IGQzX1NldCgpO1xuICAgIGlmIChhcnJheSkgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykgc2V0LmFkZChhcnJheVtpXSk7XG4gICAgcmV0dXJuIHNldDtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfU2V0KCkge31cbiAgZDNfY2xhc3MoZDNfU2V0LCB7XG4gICAgaGFzOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIGQzX21hcF9wcmVmaXggKyB2YWx1ZSBpbiB0aGlzO1xuICAgIH0sXG4gICAgYWRkOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdGhpc1tkM19tYXBfcHJlZml4ICsgdmFsdWVdID0gdHJ1ZTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhbHVlID0gZDNfbWFwX3ByZWZpeCArIHZhbHVlO1xuICAgICAgcmV0dXJuIHZhbHVlIGluIHRoaXMgJiYgZGVsZXRlIHRoaXNbdmFsdWVdO1xuICAgIH0sXG4gICAgdmFsdWVzOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICB2YWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfSxcbiAgICBmb3JFYWNoOiBmdW5jdGlvbihmKSB7XG4gICAgICBmb3IgKHZhciB2YWx1ZSBpbiB0aGlzKSB7XG4gICAgICAgIGlmICh2YWx1ZS5jaGFyQ29kZUF0KDApID09PSBkM19tYXBfcHJlZml4Q29kZSkge1xuICAgICAgICAgIGYuY2FsbCh0aGlzLCB2YWx1ZS5zdWJzdHJpbmcoMSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgZDMuYmVoYXZpb3IgPSB7fTtcbiAgZDMucmViaW5kID0gZnVuY3Rpb24odGFyZ2V0LCBzb3VyY2UpIHtcbiAgICB2YXIgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoLCBtZXRob2Q7XG4gICAgd2hpbGUgKCsraSA8IG4pIHRhcmdldFttZXRob2QgPSBhcmd1bWVudHNbaV1dID0gZDNfcmViaW5kKHRhcmdldCwgc291cmNlLCBzb3VyY2VbbWV0aG9kXSk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfcmViaW5kKHRhcmdldCwgc291cmNlLCBtZXRob2QpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdmFsdWUgPSBtZXRob2QuYXBwbHkoc291cmNlLCBhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHZhbHVlID09PSBzb3VyY2UgPyB0YXJnZXQgOiB2YWx1ZTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGQzX3ZlbmRvclN5bWJvbChvYmplY3QsIG5hbWUpIHtcbiAgICBpZiAobmFtZSBpbiBvYmplY3QpIHJldHVybiBuYW1lO1xuICAgIG5hbWUgPSBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zdWJzdHJpbmcoMSk7XG4gICAgZm9yICh2YXIgaSA9IDAsIG4gPSBkM192ZW5kb3JQcmVmaXhlcy5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgIHZhciBwcmVmaXhOYW1lID0gZDNfdmVuZG9yUHJlZml4ZXNbaV0gKyBuYW1lO1xuICAgICAgaWYgKHByZWZpeE5hbWUgaW4gb2JqZWN0KSByZXR1cm4gcHJlZml4TmFtZTtcbiAgICB9XG4gIH1cbiAgdmFyIGQzX3ZlbmRvclByZWZpeGVzID0gWyBcIndlYmtpdFwiLCBcIm1zXCIsIFwibW96XCIsIFwiTW96XCIsIFwib1wiLCBcIk9cIiBdO1xuICB2YXIgZDNfYXJyYXkgPSBkM19hcnJheVNsaWNlO1xuICBmdW5jdGlvbiBkM19hcnJheUNvcHkocHNldWRvYXJyYXkpIHtcbiAgICB2YXIgaSA9IC0xLCBuID0gcHNldWRvYXJyYXkubGVuZ3RoLCBhcnJheSA9IFtdO1xuICAgIHdoaWxlICgrK2kgPCBuKSBhcnJheS5wdXNoKHBzZXVkb2FycmF5W2ldKTtcbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfYXJyYXlTbGljZShwc2V1ZG9hcnJheSkge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChwc2V1ZG9hcnJheSk7XG4gIH1cbiAgdHJ5IHtcbiAgICBkM19hcnJheShkM19kb2N1bWVudEVsZW1lbnQuY2hpbGROb2RlcylbMF0ubm9kZVR5cGU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBkM19hcnJheSA9IGQzX2FycmF5Q29weTtcbiAgfVxuICBmdW5jdGlvbiBkM19ub29wKCkge31cbiAgZDMuZGlzcGF0Y2ggPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGlzcGF0Y2ggPSBuZXcgZDNfZGlzcGF0Y2goKSwgaSA9IC0xLCBuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoKytpIDwgbikgZGlzcGF0Y2hbYXJndW1lbnRzW2ldXSA9IGQzX2Rpc3BhdGNoX2V2ZW50KGRpc3BhdGNoKTtcbiAgICByZXR1cm4gZGlzcGF0Y2g7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2Rpc3BhdGNoKCkge31cbiAgZDNfZGlzcGF0Y2gucHJvdG90eXBlLm9uID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgICB2YXIgaSA9IHR5cGUuaW5kZXhPZihcIi5cIiksIG5hbWUgPSBcIlwiO1xuICAgIGlmIChpID49IDApIHtcbiAgICAgIG5hbWUgPSB0eXBlLnN1YnN0cmluZyhpICsgMSk7XG4gICAgICB0eXBlID0gdHlwZS5zdWJzdHJpbmcoMCwgaSk7XG4gICAgfVxuICAgIGlmICh0eXBlKSByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA8IDIgPyB0aGlzW3R5cGVdLm9uKG5hbWUpIDogdGhpc1t0eXBlXS5vbihuYW1lLCBsaXN0ZW5lcik7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIGlmIChsaXN0ZW5lciA9PSBudWxsKSBmb3IgKHR5cGUgaW4gdGhpcykge1xuICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkgdGhpc1t0eXBlXS5vbihuYW1lLCBudWxsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfTtcbiAgZnVuY3Rpb24gZDNfZGlzcGF0Y2hfZXZlbnQoZGlzcGF0Y2gpIHtcbiAgICB2YXIgbGlzdGVuZXJzID0gW10sIGxpc3RlbmVyQnlOYW1lID0gbmV3IGQzX01hcCgpO1xuICAgIGZ1bmN0aW9uIGV2ZW50KCkge1xuICAgICAgdmFyIHogPSBsaXN0ZW5lcnMsIGkgPSAtMSwgbiA9IHoubGVuZ3RoLCBsO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIGlmIChsID0geltpXS5vbikgbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIGRpc3BhdGNoO1xuICAgIH1cbiAgICBldmVudC5vbiA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbCA9IGxpc3RlbmVyQnlOYW1lLmdldChuYW1lKSwgaTtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgcmV0dXJuIGwgJiYgbC5vbjtcbiAgICAgIGlmIChsKSB7XG4gICAgICAgIGwub24gPSBudWxsO1xuICAgICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuc2xpY2UoMCwgaSA9IGxpc3RlbmVycy5pbmRleE9mKGwpKS5jb25jYXQobGlzdGVuZXJzLnNsaWNlKGkgKyAxKSk7XG4gICAgICAgIGxpc3RlbmVyQnlOYW1lLnJlbW92ZShuYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChsaXN0ZW5lcikgbGlzdGVuZXJzLnB1c2gobGlzdGVuZXJCeU5hbWUuc2V0KG5hbWUsIHtcbiAgICAgICAgb246IGxpc3RlbmVyXG4gICAgICB9KSk7XG4gICAgICByZXR1cm4gZGlzcGF0Y2g7XG4gICAgfTtcbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cbiAgZDMuZXZlbnQgPSBudWxsO1xuICBmdW5jdGlvbiBkM19ldmVudFByZXZlbnREZWZhdWx0KCkge1xuICAgIGQzLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZXZlbnRTb3VyY2UoKSB7XG4gICAgdmFyIGUgPSBkMy5ldmVudCwgcztcbiAgICB3aGlsZSAocyA9IGUuc291cmNlRXZlbnQpIGUgPSBzO1xuICAgIHJldHVybiBlO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2V2ZW50RGlzcGF0Y2godGFyZ2V0KSB7XG4gICAgdmFyIGRpc3BhdGNoID0gbmV3IGQzX2Rpc3BhdGNoKCksIGkgPSAwLCBuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoKytpIDwgbikgZGlzcGF0Y2hbYXJndW1lbnRzW2ldXSA9IGQzX2Rpc3BhdGNoX2V2ZW50KGRpc3BhdGNoKTtcbiAgICBkaXNwYXRjaC5vZiA9IGZ1bmN0aW9uKHRoaXosIGFyZ3VtZW50eikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGUxKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIGUwID0gZTEuc291cmNlRXZlbnQgPSBkMy5ldmVudDtcbiAgICAgICAgICBlMS50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgICAgZDMuZXZlbnQgPSBlMTtcbiAgICAgICAgICBkaXNwYXRjaFtlMS50eXBlXS5hcHBseSh0aGl6LCBhcmd1bWVudHopO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGQzLmV2ZW50ID0gZTA7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gZGlzcGF0Y2g7XG4gIH1cbiAgZDMucmVxdW90ZSA9IGZ1bmN0aW9uKHMpIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKGQzX3JlcXVvdGVfcmUsIFwiXFxcXCQmXCIpO1xuICB9O1xuICB2YXIgZDNfcmVxdW90ZV9yZSA9IC9bXFxcXFxcXlxcJFxcKlxcK1xcP1xcfFxcW1xcXVxcKFxcKVxcLlxce1xcfV0vZztcbiAgdmFyIGQzX3N1YmNsYXNzID0ge30uX19wcm90b19fID8gZnVuY3Rpb24ob2JqZWN0LCBwcm90b3R5cGUpIHtcbiAgICBvYmplY3QuX19wcm90b19fID0gcHJvdG90eXBlO1xuICB9IDogZnVuY3Rpb24ob2JqZWN0LCBwcm90b3R5cGUpIHtcbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBwcm90b3R5cGUpIG9iamVjdFtwcm9wZXJ0eV0gPSBwcm90b3R5cGVbcHJvcGVydHldO1xuICB9O1xuICBmdW5jdGlvbiBkM19zZWxlY3Rpb24oZ3JvdXBzKSB7XG4gICAgZDNfc3ViY2xhc3MoZ3JvdXBzLCBkM19zZWxlY3Rpb25Qcm90b3R5cGUpO1xuICAgIHJldHVybiBncm91cHM7XG4gIH1cbiAgdmFyIGQzX3NlbGVjdCA9IGZ1bmN0aW9uKHMsIG4pIHtcbiAgICByZXR1cm4gbi5xdWVyeVNlbGVjdG9yKHMpO1xuICB9LCBkM19zZWxlY3RBbGwgPSBmdW5jdGlvbihzLCBuKSB7XG4gICAgcmV0dXJuIG4ucXVlcnlTZWxlY3RvckFsbChzKTtcbiAgfSwgZDNfc2VsZWN0TWF0Y2hlciA9IGQzX2RvY3VtZW50RWxlbWVudFtkM192ZW5kb3JTeW1ib2woZDNfZG9jdW1lbnRFbGVtZW50LCBcIm1hdGNoZXNTZWxlY3RvclwiKV0sIGQzX3NlbGVjdE1hdGNoZXMgPSBmdW5jdGlvbihuLCBzKSB7XG4gICAgcmV0dXJuIGQzX3NlbGVjdE1hdGNoZXIuY2FsbChuLCBzKTtcbiAgfTtcbiAgaWYgKHR5cGVvZiBTaXp6bGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGQzX3NlbGVjdCA9IGZ1bmN0aW9uKHMsIG4pIHtcbiAgICAgIHJldHVybiBTaXp6bGUocywgbilbMF0gfHwgbnVsbDtcbiAgICB9O1xuICAgIGQzX3NlbGVjdEFsbCA9IGZ1bmN0aW9uKHMsIG4pIHtcbiAgICAgIHJldHVybiBTaXp6bGUudW5pcXVlU29ydChTaXp6bGUocywgbikpO1xuICAgIH07XG4gICAgZDNfc2VsZWN0TWF0Y2hlcyA9IFNpenpsZS5tYXRjaGVzU2VsZWN0b3I7XG4gIH1cbiAgZDMuc2VsZWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGQzX3NlbGVjdGlvblJvb3Q7XG4gIH07XG4gIHZhciBkM19zZWxlY3Rpb25Qcm90b3R5cGUgPSBkMy5zZWxlY3Rpb24ucHJvdG90eXBlID0gW107XG4gIGQzX3NlbGVjdGlvblByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbihzZWxlY3Rvcikge1xuICAgIHZhciBzdWJncm91cHMgPSBbXSwgc3ViZ3JvdXAsIHN1Ym5vZGUsIGdyb3VwLCBub2RlO1xuICAgIHNlbGVjdG9yID0gZDNfc2VsZWN0aW9uX3NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICBmb3IgKHZhciBqID0gLTEsIG0gPSB0aGlzLmxlbmd0aDsgKytqIDwgbTsgKSB7XG4gICAgICBzdWJncm91cHMucHVzaChzdWJncm91cCA9IFtdKTtcbiAgICAgIHN1Ymdyb3VwLnBhcmVudE5vZGUgPSAoZ3JvdXAgPSB0aGlzW2pdKS5wYXJlbnROb2RlO1xuICAgICAgZm9yICh2YXIgaSA9IC0xLCBuID0gZ3JvdXAubGVuZ3RoOyArK2kgPCBuOyApIHtcbiAgICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICAgIHN1Ymdyb3VwLnB1c2goc3Vibm9kZSA9IHNlbGVjdG9yLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgaikpO1xuICAgICAgICAgIGlmIChzdWJub2RlICYmIFwiX19kYXRhX19cIiBpbiBub2RlKSBzdWJub2RlLl9fZGF0YV9fID0gbm9kZS5fX2RhdGFfXztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdWJncm91cC5wdXNoKG51bGwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkM19zZWxlY3Rpb24oc3ViZ3JvdXBzKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfc2VsZWN0aW9uX3NlbGVjdG9yKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJmdW5jdGlvblwiID8gc2VsZWN0b3IgOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkM19zZWxlY3Qoc2VsZWN0b3IsIHRoaXMpO1xuICAgIH07XG4gIH1cbiAgZDNfc2VsZWN0aW9uUHJvdG90eXBlLnNlbGVjdEFsbCA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gICAgdmFyIHN1Ymdyb3VwcyA9IFtdLCBzdWJncm91cCwgbm9kZTtcbiAgICBzZWxlY3RvciA9IGQzX3NlbGVjdGlvbl9zZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgZm9yICh2YXIgaiA9IC0xLCBtID0gdGhpcy5sZW5ndGg7ICsraiA8IG07ICkge1xuICAgICAgZm9yICh2YXIgZ3JvdXAgPSB0aGlzW2pdLCBpID0gLTEsIG4gPSBncm91cC5sZW5ndGg7ICsraSA8IG47ICkge1xuICAgICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgICAgc3ViZ3JvdXBzLnB1c2goc3ViZ3JvdXAgPSBkM19hcnJheShzZWxlY3Rvci5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGopKSk7XG4gICAgICAgICAgc3ViZ3JvdXAucGFyZW50Tm9kZSA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGQzX3NlbGVjdGlvbihzdWJncm91cHMpO1xuICB9O1xuICBmdW5jdGlvbiBkM19zZWxlY3Rpb25fc2VsZWN0b3JBbGwoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gdHlwZW9mIHNlbGVjdG9yID09PSBcImZ1bmN0aW9uXCIgPyBzZWxlY3RvciA6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGQzX3NlbGVjdEFsbChzZWxlY3RvciwgdGhpcyk7XG4gICAgfTtcbiAgfVxuICB2YXIgZDNfbnNQcmVmaXggPSB7XG4gICAgc3ZnOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG4gICAgeGh0bWw6IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiLFxuICAgIHhsaW5rOiBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIixcbiAgICB4bWw6IFwiaHR0cDovL3d3dy53My5vcmcvWE1MLzE5OTgvbmFtZXNwYWNlXCIsXG4gICAgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy9cIlxuICB9O1xuICBkMy5ucyA9IHtcbiAgICBwcmVmaXg6IGQzX25zUHJlZml4LFxuICAgIHF1YWxpZnk6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciBpID0gbmFtZS5pbmRleE9mKFwiOlwiKSwgcHJlZml4ID0gbmFtZTtcbiAgICAgIGlmIChpID49IDApIHtcbiAgICAgICAgcHJlZml4ID0gbmFtZS5zdWJzdHJpbmcoMCwgaSk7XG4gICAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cmluZyhpICsgMSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZDNfbnNQcmVmaXguaGFzT3duUHJvcGVydHkocHJlZml4KSA/IHtcbiAgICAgICAgc3BhY2U6IGQzX25zUHJlZml4W3ByZWZpeF0sXG4gICAgICAgIGxvY2FsOiBuYW1lXG4gICAgICB9IDogbmFtZTtcbiAgICB9XG4gIH07XG4gIGQzX3NlbGVjdGlvblByb3RvdHlwZS5hdHRyID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZSgpO1xuICAgICAgICBuYW1lID0gZDMubnMucXVhbGlmeShuYW1lKTtcbiAgICAgICAgcmV0dXJuIG5hbWUubG9jYWwgPyBub2RlLmdldEF0dHJpYnV0ZU5TKG5hbWUuc3BhY2UsIG5hbWUubG9jYWwpIDogbm9kZS5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhbHVlIGluIG5hbWUpIHRoaXMuZWFjaChkM19zZWxlY3Rpb25fYXR0cih2YWx1ZSwgbmFtZVt2YWx1ZV0pKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lYWNoKGQzX3NlbGVjdGlvbl9hdHRyKG5hbWUsIHZhbHVlKSk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3NlbGVjdGlvbl9hdHRyKG5hbWUsIHZhbHVlKSB7XG4gICAgbmFtZSA9IGQzLm5zLnF1YWxpZnkobmFtZSk7XG4gICAgZnVuY3Rpb24gYXR0ck51bGwoKSB7XG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYXR0ck51bGxOUygpIHtcbiAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlTlMobmFtZS5zcGFjZSwgbmFtZS5sb2NhbCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGF0dHJDb25zdGFudCgpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYXR0ckNvbnN0YW50TlMoKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZU5TKG5hbWUuc3BhY2UsIG5hbWUubG9jYWwsIHZhbHVlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYXR0ckZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHggPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgaWYgKHggPT0gbnVsbCkgdGhpcy5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7IGVsc2UgdGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgeCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGF0dHJGdW5jdGlvbk5TKCkge1xuICAgICAgdmFyIHggPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgaWYgKHggPT0gbnVsbCkgdGhpcy5yZW1vdmVBdHRyaWJ1dGVOUyhuYW1lLnNwYWNlLCBuYW1lLmxvY2FsKTsgZWxzZSB0aGlzLnNldEF0dHJpYnV0ZU5TKG5hbWUuc3BhY2UsIG5hbWUubG9jYWwsIHgpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/IG5hbWUubG9jYWwgPyBhdHRyTnVsbE5TIDogYXR0ck51bGwgOiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiA/IG5hbWUubG9jYWwgPyBhdHRyRnVuY3Rpb25OUyA6IGF0dHJGdW5jdGlvbiA6IG5hbWUubG9jYWwgPyBhdHRyQ29uc3RhbnROUyA6IGF0dHJDb25zdGFudDtcbiAgfVxuICBmdW5jdGlvbiBkM19jb2xsYXBzZShzKSB7XG4gICAgcmV0dXJuIHMudHJpbSgpLnJlcGxhY2UoL1xccysvZywgXCIgXCIpO1xuICB9XG4gIGQzX3NlbGVjdGlvblByb3RvdHlwZS5jbGFzc2VkID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZSgpLCBuID0gKG5hbWUgPSBuYW1lLnRyaW0oKS5zcGxpdCgvXnxcXHMrL2cpKS5sZW5ndGgsIGkgPSAtMTtcbiAgICAgICAgaWYgKHZhbHVlID0gbm9kZS5jbGFzc0xpc3QpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgbikgaWYgKCF2YWx1ZS5jb250YWlucyhuYW1lW2ldKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gbm9kZS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKTtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgbikgaWYgKCFkM19zZWxlY3Rpb25fY2xhc3NlZFJlKG5hbWVbaV0pLnRlc3QodmFsdWUpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBmb3IgKHZhbHVlIGluIG5hbWUpIHRoaXMuZWFjaChkM19zZWxlY3Rpb25fY2xhc3NlZCh2YWx1ZSwgbmFtZVt2YWx1ZV0pKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lYWNoKGQzX3NlbGVjdGlvbl9jbGFzc2VkKG5hbWUsIHZhbHVlKSk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3NlbGVjdGlvbl9jbGFzc2VkUmUobmFtZSkge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKFwiKD86XnxcXFxccyspXCIgKyBkMy5yZXF1b3RlKG5hbWUpICsgXCIoPzpcXFxccyt8JClcIiwgXCJnXCIpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3NlbGVjdGlvbl9jbGFzc2VkKG5hbWUsIHZhbHVlKSB7XG4gICAgbmFtZSA9IG5hbWUudHJpbSgpLnNwbGl0KC9cXHMrLykubWFwKGQzX3NlbGVjdGlvbl9jbGFzc2VkTmFtZSk7XG4gICAgdmFyIG4gPSBuYW1lLmxlbmd0aDtcbiAgICBmdW5jdGlvbiBjbGFzc2VkQ29uc3RhbnQoKSB7XG4gICAgICB2YXIgaSA9IC0xO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIG5hbWVbaV0odGhpcywgdmFsdWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjbGFzc2VkRnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSA9IC0xLCB4ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBuYW1lW2ldKHRoaXMsIHgpO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgPyBjbGFzc2VkRnVuY3Rpb24gOiBjbGFzc2VkQ29uc3RhbnQ7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc2VsZWN0aW9uX2NsYXNzZWROYW1lKG5hbWUpIHtcbiAgICB2YXIgcmUgPSBkM19zZWxlY3Rpb25fY2xhc3NlZFJlKG5hbWUpO1xuICAgIHJldHVybiBmdW5jdGlvbihub2RlLCB2YWx1ZSkge1xuICAgICAgaWYgKGMgPSBub2RlLmNsYXNzTGlzdCkgcmV0dXJuIHZhbHVlID8gYy5hZGQobmFtZSkgOiBjLnJlbW92ZShuYW1lKTtcbiAgICAgIHZhciBjID0gbm9kZS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBcIlwiO1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHJlLmxhc3RJbmRleCA9IDA7XG4gICAgICAgIGlmICghcmUudGVzdChjKSkgbm9kZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBkM19jb2xsYXBzZShjICsgXCIgXCIgKyBuYW1lKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGQzX2NvbGxhcHNlKGMucmVwbGFjZShyZSwgXCIgXCIpKSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBkM19zZWxlY3Rpb25Qcm90b3R5cGUuc3R5bGUgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpIHtcbiAgICB2YXIgbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKG4gPCAzKSB7XG4gICAgICBpZiAodHlwZW9mIG5hbWUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKG4gPCAyKSB2YWx1ZSA9IFwiXCI7XG4gICAgICAgIGZvciAocHJpb3JpdHkgaW4gbmFtZSkgdGhpcy5lYWNoKGQzX3NlbGVjdGlvbl9zdHlsZShwcmlvcml0eSwgbmFtZVtwcmlvcml0eV0sIHZhbHVlKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgaWYgKG4gPCAyKSByZXR1cm4gZDNfd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5ub2RlKCksIG51bGwpLmdldFByb3BlcnR5VmFsdWUobmFtZSk7XG4gICAgICBwcmlvcml0eSA9IFwiXCI7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVhY2goZDNfc2VsZWN0aW9uX3N0eWxlKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkpO1xuICB9O1xuICBmdW5jdGlvbiBkM19zZWxlY3Rpb25fc3R5bGUobmFtZSwgdmFsdWUsIHByaW9yaXR5KSB7XG4gICAgZnVuY3Rpb24gc3R5bGVOdWxsKCkge1xuICAgICAgdGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShuYW1lKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3R5bGVDb25zdGFudCgpIHtcbiAgICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkobmFtZSwgdmFsdWUsIHByaW9yaXR5KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3R5bGVGdW5jdGlvbigpIHtcbiAgICAgIHZhciB4ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIGlmICh4ID09IG51bGwpIHRoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkobmFtZSk7IGVsc2UgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCB4LCBwcmlvcml0eSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZSA9PSBudWxsID8gc3R5bGVOdWxsIDogdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgPyBzdHlsZUZ1bmN0aW9uIDogc3R5bGVDb25zdGFudDtcbiAgfVxuICBkM19zZWxlY3Rpb25Qcm90b3R5cGUucHJvcGVydHkgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN0cmluZ1wiKSByZXR1cm4gdGhpcy5ub2RlKClbbmFtZV07XG4gICAgICBmb3IgKHZhbHVlIGluIG5hbWUpIHRoaXMuZWFjaChkM19zZWxlY3Rpb25fcHJvcGVydHkodmFsdWUsIG5hbWVbdmFsdWVdKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWFjaChkM19zZWxlY3Rpb25fcHJvcGVydHkobmFtZSwgdmFsdWUpKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfc2VsZWN0aW9uX3Byb3BlcnR5KG5hbWUsIHZhbHVlKSB7XG4gICAgZnVuY3Rpb24gcHJvcGVydHlOdWxsKCkge1xuICAgICAgZGVsZXRlIHRoaXNbbmFtZV07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHByb3BlcnR5Q29uc3RhbnQoKSB7XG4gICAgICB0aGlzW25hbWVdID0gdmFsdWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHByb3BlcnR5RnVuY3Rpb24oKSB7XG4gICAgICB2YXIgeCA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICBpZiAoeCA9PSBudWxsKSBkZWxldGUgdGhpc1tuYW1lXTsgZWxzZSB0aGlzW25hbWVdID0geDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyBwcm9wZXJ0eU51bGwgOiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiA/IHByb3BlcnR5RnVuY3Rpb24gOiBwcm9wZXJ0eUNvbnN0YW50O1xuICB9XG4gIGQzX3NlbGVjdGlvblByb3RvdHlwZS50ZXh0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IHRoaXMuZWFjaCh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiA/IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgdGhpcy50ZXh0Q29udGVudCA9IHYgPT0gbnVsbCA/IFwiXCIgOiB2O1xuICAgIH0gOiB2YWx1ZSA9PSBudWxsID8gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICB9IDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgfSkgOiB0aGlzLm5vZGUoKS50ZXh0Q29udGVudDtcbiAgfTtcbiAgZDNfc2VsZWN0aW9uUHJvdG90eXBlLmh0bWwgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gdGhpcy5lYWNoKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB0aGlzLmlubmVySFRNTCA9IHYgPT0gbnVsbCA/IFwiXCIgOiB2O1xuICAgIH0gOiB2YWx1ZSA9PSBudWxsID8gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmlubmVySFRNTCA9IFwiXCI7XG4gICAgfSA6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICB9KSA6IHRoaXMubm9kZSgpLmlubmVySFRNTDtcbiAgfTtcbiAgZDNfc2VsZWN0aW9uUHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBuYW1lID0gZDNfc2VsZWN0aW9uX2NyZWF0b3IobmFtZSk7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0KGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuYXBwZW5kQ2hpbGQobmFtZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICB9KTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfc2VsZWN0aW9uX2NyZWF0b3IobmFtZSkge1xuICAgIHJldHVybiB0eXBlb2YgbmFtZSA9PT0gXCJmdW5jdGlvblwiID8gbmFtZSA6IChuYW1lID0gZDMubnMucXVhbGlmeShuYW1lKSkubG9jYWwgPyBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkM19kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobmFtZS5zcGFjZSwgbmFtZS5sb2NhbCk7XG4gICAgfSA6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGQzX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyh0aGlzLm5hbWVzcGFjZVVSSSwgbmFtZSk7XG4gICAgfTtcbiAgfVxuICBkM19zZWxlY3Rpb25Qcm90b3R5cGUuaW5zZXJ0ID0gZnVuY3Rpb24obmFtZSwgYmVmb3JlKSB7XG4gICAgbmFtZSA9IGQzX3NlbGVjdGlvbl9jcmVhdG9yKG5hbWUpO1xuICAgIGJlZm9yZSA9IGQzX3NlbGVjdGlvbl9zZWxlY3RvcihiZWZvcmUpO1xuICAgIHJldHVybiB0aGlzLnNlbGVjdChmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmluc2VydEJlZm9yZShuYW1lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksIGJlZm9yZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICB9KTtcbiAgfTtcbiAgZDNfc2VsZWN0aW9uUHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xuICAgICAgaWYgKHBhcmVudCkgcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgIH0pO1xuICB9O1xuICBkM19zZWxlY3Rpb25Qcm90b3R5cGUuZGF0YSA9IGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICB2YXIgaSA9IC0xLCBuID0gdGhpcy5sZW5ndGgsIGdyb3VwLCBub2RlO1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgdmFsdWUgPSBuZXcgQXJyYXkobiA9IChncm91cCA9IHRoaXNbMF0pLmxlbmd0aCk7XG4gICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgICAgdmFsdWVbaV0gPSBub2RlLl9fZGF0YV9fO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJpbmQoZ3JvdXAsIGdyb3VwRGF0YSkge1xuICAgICAgdmFyIGksIG4gPSBncm91cC5sZW5ndGgsIG0gPSBncm91cERhdGEubGVuZ3RoLCBuMCA9IE1hdGgubWluKG4sIG0pLCB1cGRhdGVOb2RlcyA9IG5ldyBBcnJheShtKSwgZW50ZXJOb2RlcyA9IG5ldyBBcnJheShtKSwgZXhpdE5vZGVzID0gbmV3IEFycmF5KG4pLCBub2RlLCBub2RlRGF0YTtcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdmFyIG5vZGVCeUtleVZhbHVlID0gbmV3IGQzX01hcCgpLCBkYXRhQnlLZXlWYWx1ZSA9IG5ldyBkM19NYXAoKSwga2V5VmFsdWVzID0gW10sIGtleVZhbHVlO1xuICAgICAgICBmb3IgKGkgPSAtMTsgKytpIDwgbjsgKSB7XG4gICAgICAgICAga2V5VmFsdWUgPSBrZXkuY2FsbChub2RlID0gZ3JvdXBbaV0sIG5vZGUuX19kYXRhX18sIGkpO1xuICAgICAgICAgIGlmIChub2RlQnlLZXlWYWx1ZS5oYXMoa2V5VmFsdWUpKSB7XG4gICAgICAgICAgICBleGl0Tm9kZXNbaV0gPSBub2RlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlQnlLZXlWYWx1ZS5zZXQoa2V5VmFsdWUsIG5vZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBrZXlWYWx1ZXMucHVzaChrZXlWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gLTE7ICsraSA8IG07ICkge1xuICAgICAgICAgIGtleVZhbHVlID0ga2V5LmNhbGwoZ3JvdXBEYXRhLCBub2RlRGF0YSA9IGdyb3VwRGF0YVtpXSwgaSk7XG4gICAgICAgICAgaWYgKG5vZGUgPSBub2RlQnlLZXlWYWx1ZS5nZXQoa2V5VmFsdWUpKSB7XG4gICAgICAgICAgICB1cGRhdGVOb2Rlc1tpXSA9IG5vZGU7XG4gICAgICAgICAgICBub2RlLl9fZGF0YV9fID0gbm9kZURhdGE7XG4gICAgICAgICAgfSBlbHNlIGlmICghZGF0YUJ5S2V5VmFsdWUuaGFzKGtleVZhbHVlKSkge1xuICAgICAgICAgICAgZW50ZXJOb2Rlc1tpXSA9IGQzX3NlbGVjdGlvbl9kYXRhTm9kZShub2RlRGF0YSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFCeUtleVZhbHVlLnNldChrZXlWYWx1ZSwgbm9kZURhdGEpO1xuICAgICAgICAgIG5vZGVCeUtleVZhbHVlLnJlbW92ZShrZXlWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gLTE7ICsraSA8IG47ICkge1xuICAgICAgICAgIGlmIChub2RlQnlLZXlWYWx1ZS5oYXMoa2V5VmFsdWVzW2ldKSkge1xuICAgICAgICAgICAgZXhpdE5vZGVzW2ldID0gZ3JvdXBbaV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGkgPSAtMTsgKytpIDwgbjA7ICkge1xuICAgICAgICAgIG5vZGUgPSBncm91cFtpXTtcbiAgICAgICAgICBub2RlRGF0YSA9IGdyb3VwRGF0YVtpXTtcbiAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgbm9kZS5fX2RhdGFfXyA9IG5vZGVEYXRhO1xuICAgICAgICAgICAgdXBkYXRlTm9kZXNbaV0gPSBub2RlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbnRlck5vZGVzW2ldID0gZDNfc2VsZWN0aW9uX2RhdGFOb2RlKG5vZGVEYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yICg7aSA8IG07ICsraSkge1xuICAgICAgICAgIGVudGVyTm9kZXNbaV0gPSBkM19zZWxlY3Rpb25fZGF0YU5vZGUoZ3JvdXBEYXRhW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKDtpIDwgbjsgKytpKSB7XG4gICAgICAgICAgZXhpdE5vZGVzW2ldID0gZ3JvdXBbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVudGVyTm9kZXMudXBkYXRlID0gdXBkYXRlTm9kZXM7XG4gICAgICBlbnRlck5vZGVzLnBhcmVudE5vZGUgPSB1cGRhdGVOb2Rlcy5wYXJlbnROb2RlID0gZXhpdE5vZGVzLnBhcmVudE5vZGUgPSBncm91cC5wYXJlbnROb2RlO1xuICAgICAgZW50ZXIucHVzaChlbnRlck5vZGVzKTtcbiAgICAgIHVwZGF0ZS5wdXNoKHVwZGF0ZU5vZGVzKTtcbiAgICAgIGV4aXQucHVzaChleGl0Tm9kZXMpO1xuICAgIH1cbiAgICB2YXIgZW50ZXIgPSBkM19zZWxlY3Rpb25fZW50ZXIoW10pLCB1cGRhdGUgPSBkM19zZWxlY3Rpb24oW10pLCBleGl0ID0gZDNfc2VsZWN0aW9uKFtdKTtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgIGJpbmQoZ3JvdXAgPSB0aGlzW2ldLCB2YWx1ZS5jYWxsKGdyb3VwLCBncm91cC5wYXJlbnROb2RlLl9fZGF0YV9fLCBpKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgIGJpbmQoZ3JvdXAgPSB0aGlzW2ldLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHVwZGF0ZS5lbnRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGVudGVyO1xuICAgIH07XG4gICAgdXBkYXRlLmV4aXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBleGl0O1xuICAgIH07XG4gICAgcmV0dXJuIHVwZGF0ZTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfc2VsZWN0aW9uX2RhdGFOb2RlKGRhdGEpIHtcbiAgICByZXR1cm4ge1xuICAgICAgX19kYXRhX186IGRhdGFcbiAgICB9O1xuICB9XG4gIGQzX3NlbGVjdGlvblByb3RvdHlwZS5kYXR1bSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyB0aGlzLnByb3BlcnR5KFwiX19kYXRhX19cIiwgdmFsdWUpIDogdGhpcy5wcm9wZXJ0eShcIl9fZGF0YV9fXCIpO1xuICB9O1xuICBkM19zZWxlY3Rpb25Qcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24oZmlsdGVyKSB7XG4gICAgdmFyIHN1Ymdyb3VwcyA9IFtdLCBzdWJncm91cCwgZ3JvdXAsIG5vZGU7XG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgIT09IFwiZnVuY3Rpb25cIikgZmlsdGVyID0gZDNfc2VsZWN0aW9uX2ZpbHRlcihmaWx0ZXIpO1xuICAgIGZvciAodmFyIGogPSAwLCBtID0gdGhpcy5sZW5ndGg7IGogPCBtOyBqKyspIHtcbiAgICAgIHN1Ymdyb3Vwcy5wdXNoKHN1Ymdyb3VwID0gW10pO1xuICAgICAgc3ViZ3JvdXAucGFyZW50Tm9kZSA9IChncm91cCA9IHRoaXNbal0pLnBhcmVudE5vZGU7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbiA9IGdyb3VwLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICBpZiAoKG5vZGUgPSBncm91cFtpXSkgJiYgZmlsdGVyLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSkpIHtcbiAgICAgICAgICBzdWJncm91cC5wdXNoKG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkM19zZWxlY3Rpb24oc3ViZ3JvdXBzKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfc2VsZWN0aW9uX2ZpbHRlcihzZWxlY3Rvcikge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkM19zZWxlY3RNYXRjaGVzKHRoaXMsIHNlbGVjdG9yKTtcbiAgICB9O1xuICB9XG4gIGQzX3NlbGVjdGlvblByb3RvdHlwZS5vcmRlciA9IGZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIGogPSAtMSwgbSA9IHRoaXMubGVuZ3RoOyArK2ogPCBtOyApIHtcbiAgICAgIGZvciAodmFyIGdyb3VwID0gdGhpc1tqXSwgaSA9IGdyb3VwLmxlbmd0aCAtIDEsIG5leHQgPSBncm91cFtpXSwgbm9kZTsgLS1pID49IDA7ICkge1xuICAgICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgICAgaWYgKG5leHQgJiYgbmV4dCAhPT0gbm9kZS5uZXh0U2libGluZykgbmV4dC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCBuZXh0KTtcbiAgICAgICAgICBuZXh0ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgZDNfc2VsZWN0aW9uUHJvdG90eXBlLnNvcnQgPSBmdW5jdGlvbihjb21wYXJhdG9yKSB7XG4gICAgY29tcGFyYXRvciA9IGQzX3NlbGVjdGlvbl9zb3J0Q29tcGFyYXRvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGZvciAodmFyIGogPSAtMSwgbSA9IHRoaXMubGVuZ3RoOyArK2ogPCBtOyApIHRoaXNbal0uc29ydChjb21wYXJhdG9yKTtcbiAgICByZXR1cm4gdGhpcy5vcmRlcigpO1xuICB9O1xuICBmdW5jdGlvbiBkM19zZWxlY3Rpb25fc29ydENvbXBhcmF0b3IoY29tcGFyYXRvcikge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgY29tcGFyYXRvciA9IGQzLmFzY2VuZGluZztcbiAgICByZXR1cm4gZnVuY3Rpb24oYSwgYikge1xuICAgICAgcmV0dXJuICFhIC0gIWIgfHwgY29tcGFyYXRvcihhLl9fZGF0YV9fLCBiLl9fZGF0YV9fKTtcbiAgICB9O1xuICB9XG4gIGQzX3NlbGVjdGlvblByb3RvdHlwZS5lYWNoID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICByZXR1cm4gZDNfc2VsZWN0aW9uX2VhY2godGhpcywgZnVuY3Rpb24obm9kZSwgaSwgaikge1xuICAgICAgY2FsbGJhY2suY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBqKTtcbiAgICB9KTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfc2VsZWN0aW9uX2VhY2goZ3JvdXBzLCBjYWxsYmFjaykge1xuICAgIGZvciAodmFyIGogPSAwLCBtID0gZ3JvdXBzLmxlbmd0aDsgaiA8IG07IGorKykge1xuICAgICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIGkgPSAwLCBuID0gZ3JvdXAubGVuZ3RoLCBub2RlOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIGNhbGxiYWNrKG5vZGUsIGksIGopO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZ3JvdXBzO1xuICB9XG4gIGQzX3NlbGVjdGlvblByb3RvdHlwZS5jYWxsID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICB2YXIgYXJncyA9IGQzX2FycmF5KGFyZ3VtZW50cyk7XG4gICAgY2FsbGJhY2suYXBwbHkoYXJnc1swXSA9IHRoaXMsIGFyZ3MpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBkM19zZWxlY3Rpb25Qcm90b3R5cGUuZW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gIXRoaXMubm9kZSgpO1xuICB9O1xuICBkM19zZWxlY3Rpb25Qcm90b3R5cGUubm9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIGogPSAwLCBtID0gdGhpcy5sZW5ndGg7IGogPCBtOyBqKyspIHtcbiAgICAgIGZvciAodmFyIGdyb3VwID0gdGhpc1tqXSwgaSA9IDAsIG4gPSBncm91cC5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgdmFyIG5vZGUgPSBncm91cFtpXTtcbiAgICAgICAgaWYgKG5vZGUpIHJldHVybiBub2RlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcbiAgZDNfc2VsZWN0aW9uUHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbiA9IDA7XG4gICAgdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgKytuO1xuICAgIH0pO1xuICAgIHJldHVybiBuO1xuICB9O1xuICBmdW5jdGlvbiBkM19zZWxlY3Rpb25fZW50ZXIoc2VsZWN0aW9uKSB7XG4gICAgZDNfc3ViY2xhc3Moc2VsZWN0aW9uLCBkM19zZWxlY3Rpb25fZW50ZXJQcm90b3R5cGUpO1xuICAgIHJldHVybiBzZWxlY3Rpb247XG4gIH1cbiAgdmFyIGQzX3NlbGVjdGlvbl9lbnRlclByb3RvdHlwZSA9IFtdO1xuICBkMy5zZWxlY3Rpb24uZW50ZXIgPSBkM19zZWxlY3Rpb25fZW50ZXI7XG4gIGQzLnNlbGVjdGlvbi5lbnRlci5wcm90b3R5cGUgPSBkM19zZWxlY3Rpb25fZW50ZXJQcm90b3R5cGU7XG4gIGQzX3NlbGVjdGlvbl9lbnRlclByb3RvdHlwZS5hcHBlbmQgPSBkM19zZWxlY3Rpb25Qcm90b3R5cGUuYXBwZW5kO1xuICBkM19zZWxlY3Rpb25fZW50ZXJQcm90b3R5cGUuZW1wdHkgPSBkM19zZWxlY3Rpb25Qcm90b3R5cGUuZW1wdHk7XG4gIGQzX3NlbGVjdGlvbl9lbnRlclByb3RvdHlwZS5ub2RlID0gZDNfc2VsZWN0aW9uUHJvdG90eXBlLm5vZGU7XG4gIGQzX3NlbGVjdGlvbl9lbnRlclByb3RvdHlwZS5jYWxsID0gZDNfc2VsZWN0aW9uUHJvdG90eXBlLmNhbGw7XG4gIGQzX3NlbGVjdGlvbl9lbnRlclByb3RvdHlwZS5zaXplID0gZDNfc2VsZWN0aW9uUHJvdG90eXBlLnNpemU7XG4gIGQzX3NlbGVjdGlvbl9lbnRlclByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbihzZWxlY3Rvcikge1xuICAgIHZhciBzdWJncm91cHMgPSBbXSwgc3ViZ3JvdXAsIHN1Ym5vZGUsIHVwZ3JvdXAsIGdyb3VwLCBub2RlO1xuICAgIGZvciAodmFyIGogPSAtMSwgbSA9IHRoaXMubGVuZ3RoOyArK2ogPCBtOyApIHtcbiAgICAgIHVwZ3JvdXAgPSAoZ3JvdXAgPSB0aGlzW2pdKS51cGRhdGU7XG4gICAgICBzdWJncm91cHMucHVzaChzdWJncm91cCA9IFtdKTtcbiAgICAgIHN1Ymdyb3VwLnBhcmVudE5vZGUgPSBncm91cC5wYXJlbnROb2RlO1xuICAgICAgZm9yICh2YXIgaSA9IC0xLCBuID0gZ3JvdXAubGVuZ3RoOyArK2kgPCBuOyApIHtcbiAgICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICAgIHN1Ymdyb3VwLnB1c2godXBncm91cFtpXSA9IHN1Ym5vZGUgPSBzZWxlY3Rvci5jYWxsKGdyb3VwLnBhcmVudE5vZGUsIG5vZGUuX19kYXRhX18sIGksIGopKTtcbiAgICAgICAgICBzdWJub2RlLl9fZGF0YV9fID0gbm9kZS5fX2RhdGFfXztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdWJncm91cC5wdXNoKG51bGwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkM19zZWxlY3Rpb24oc3ViZ3JvdXBzKTtcbiAgfTtcbiAgZDNfc2VsZWN0aW9uX2VudGVyUHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uKG5hbWUsIGJlZm9yZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgYmVmb3JlID0gZDNfc2VsZWN0aW9uX2VudGVySW5zZXJ0QmVmb3JlKHRoaXMpO1xuICAgIHJldHVybiBkM19zZWxlY3Rpb25Qcm90b3R5cGUuaW5zZXJ0LmNhbGwodGhpcywgbmFtZSwgYmVmb3JlKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfc2VsZWN0aW9uX2VudGVySW5zZXJ0QmVmb3JlKGVudGVyKSB7XG4gICAgdmFyIGkwLCBqMDtcbiAgICByZXR1cm4gZnVuY3Rpb24oZCwgaSwgaikge1xuICAgICAgdmFyIGdyb3VwID0gZW50ZXJbal0udXBkYXRlLCBuID0gZ3JvdXAubGVuZ3RoLCBub2RlO1xuICAgICAgaWYgKGogIT0gajApIGowID0gaiwgaTAgPSAwO1xuICAgICAgaWYgKGkgPj0gaTApIGkwID0gaSArIDE7XG4gICAgICB3aGlsZSAoIShub2RlID0gZ3JvdXBbaTBdKSAmJiArK2kwIDwgbikgO1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcbiAgfVxuICBkM19zZWxlY3Rpb25Qcm90b3R5cGUudHJhbnNpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpZCA9IGQzX3RyYW5zaXRpb25Jbmhlcml0SWQgfHwgKytkM190cmFuc2l0aW9uSWQsIHN1Ymdyb3VwcyA9IFtdLCBzdWJncm91cCwgbm9kZSwgdHJhbnNpdGlvbiA9IGQzX3RyYW5zaXRpb25Jbmhlcml0IHx8IHtcbiAgICAgIHRpbWU6IERhdGUubm93KCksXG4gICAgICBlYXNlOiBkM19lYXNlX2N1YmljSW5PdXQsXG4gICAgICBkZWxheTogMCxcbiAgICAgIGR1cmF0aW9uOiAyNTBcbiAgICB9O1xuICAgIGZvciAodmFyIGogPSAtMSwgbSA9IHRoaXMubGVuZ3RoOyArK2ogPCBtOyApIHtcbiAgICAgIHN1Ymdyb3Vwcy5wdXNoKHN1Ymdyb3VwID0gW10pO1xuICAgICAgZm9yICh2YXIgZ3JvdXAgPSB0aGlzW2pdLCBpID0gLTEsIG4gPSBncm91cC5sZW5ndGg7ICsraSA8IG47ICkge1xuICAgICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSBkM190cmFuc2l0aW9uTm9kZShub2RlLCBpLCBpZCwgdHJhbnNpdGlvbik7XG4gICAgICAgIHN1Ymdyb3VwLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkM190cmFuc2l0aW9uKHN1Ymdyb3VwcywgaWQpO1xuICB9O1xuICBkMy5zZWxlY3QgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgdmFyIGdyb3VwID0gWyB0eXBlb2Ygbm9kZSA9PT0gXCJzdHJpbmdcIiA/IGQzX3NlbGVjdChub2RlLCBkM19kb2N1bWVudCkgOiBub2RlIF07XG4gICAgZ3JvdXAucGFyZW50Tm9kZSA9IGQzX2RvY3VtZW50RWxlbWVudDtcbiAgICByZXR1cm4gZDNfc2VsZWN0aW9uKFsgZ3JvdXAgXSk7XG4gIH07XG4gIGQzLnNlbGVjdEFsbCA9IGZ1bmN0aW9uKG5vZGVzKSB7XG4gICAgdmFyIGdyb3VwID0gZDNfYXJyYXkodHlwZW9mIG5vZGVzID09PSBcInN0cmluZ1wiID8gZDNfc2VsZWN0QWxsKG5vZGVzLCBkM19kb2N1bWVudCkgOiBub2Rlcyk7XG4gICAgZ3JvdXAucGFyZW50Tm9kZSA9IGQzX2RvY3VtZW50RWxlbWVudDtcbiAgICByZXR1cm4gZDNfc2VsZWN0aW9uKFsgZ3JvdXAgXSk7XG4gIH07XG4gIHZhciBkM19zZWxlY3Rpb25Sb290ID0gZDMuc2VsZWN0KGQzX2RvY3VtZW50RWxlbWVudCk7XG4gIGQzX3NlbGVjdGlvblByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyLCBjYXB0dXJlKSB7XG4gICAgdmFyIG4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGlmIChuIDwgMykge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmIChuIDwgMikgbGlzdGVuZXIgPSBmYWxzZTtcbiAgICAgICAgZm9yIChjYXB0dXJlIGluIHR5cGUpIHRoaXMuZWFjaChkM19zZWxlY3Rpb25fb24oY2FwdHVyZSwgdHlwZVtjYXB0dXJlXSwgbGlzdGVuZXIpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICBpZiAobiA8IDIpIHJldHVybiAobiA9IHRoaXMubm9kZSgpW1wiX19vblwiICsgdHlwZV0pICYmIG4uXztcbiAgICAgIGNhcHR1cmUgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWFjaChkM19zZWxlY3Rpb25fb24odHlwZSwgbGlzdGVuZXIsIGNhcHR1cmUpKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfc2VsZWN0aW9uX29uKHR5cGUsIGxpc3RlbmVyLCBjYXB0dXJlKSB7XG4gICAgdmFyIG5hbWUgPSBcIl9fb25cIiArIHR5cGUsIGkgPSB0eXBlLmluZGV4T2YoXCIuXCIpLCB3cmFwID0gZDNfc2VsZWN0aW9uX29uTGlzdGVuZXI7XG4gICAgaWYgKGkgPiAwKSB0eXBlID0gdHlwZS5zdWJzdHJpbmcoMCwgaSk7XG4gICAgdmFyIGZpbHRlciA9IGQzX3NlbGVjdGlvbl9vbkZpbHRlcnMuZ2V0KHR5cGUpO1xuICAgIGlmIChmaWx0ZXIpIHR5cGUgPSBmaWx0ZXIsIHdyYXAgPSBkM19zZWxlY3Rpb25fb25GaWx0ZXI7XG4gICAgZnVuY3Rpb24gb25SZW1vdmUoKSB7XG4gICAgICB2YXIgbCA9IHRoaXNbbmFtZV07XG4gICAgICBpZiAobCkge1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbCwgbC4kKTtcbiAgICAgICAgZGVsZXRlIHRoaXNbbmFtZV07XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uQWRkKCkge1xuICAgICAgdmFyIGwgPSB3cmFwKGxpc3RlbmVyLCBkM19hcnJheShhcmd1bWVudHMpKTtcbiAgICAgIG9uUmVtb3ZlLmNhbGwodGhpcyk7XG4gICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgdGhpc1tuYW1lXSA9IGwsIGwuJCA9IGNhcHR1cmUpO1xuICAgICAgbC5fID0gbGlzdGVuZXI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbCgpIHtcbiAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAoXCJeX19vbihbXi5dKylcIiArIGQzLnJlcXVvdGUodHlwZSkgKyBcIiRcIiksIG1hdGNoO1xuICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgIGlmIChtYXRjaCA9IG5hbWUubWF0Y2gocmUpKSB7XG4gICAgICAgICAgdmFyIGwgPSB0aGlzW25hbWVdO1xuICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihtYXRjaFsxXSwgbCwgbC4kKTtcbiAgICAgICAgICBkZWxldGUgdGhpc1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaSA/IGxpc3RlbmVyID8gb25BZGQgOiBvblJlbW92ZSA6IGxpc3RlbmVyID8gZDNfbm9vcCA6IHJlbW92ZUFsbDtcbiAgfVxuICB2YXIgZDNfc2VsZWN0aW9uX29uRmlsdGVycyA9IGQzLm1hcCh7XG4gICAgbW91c2VlbnRlcjogXCJtb3VzZW92ZXJcIixcbiAgICBtb3VzZWxlYXZlOiBcIm1vdXNlb3V0XCJcbiAgfSk7XG4gIGQzX3NlbGVjdGlvbl9vbkZpbHRlcnMuZm9yRWFjaChmdW5jdGlvbihrKSB7XG4gICAgaWYgKFwib25cIiArIGsgaW4gZDNfZG9jdW1lbnQpIGQzX3NlbGVjdGlvbl9vbkZpbHRlcnMucmVtb3ZlKGspO1xuICB9KTtcbiAgZnVuY3Rpb24gZDNfc2VsZWN0aW9uX29uTGlzdGVuZXIobGlzdGVuZXIsIGFyZ3VtZW50eikge1xuICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICB2YXIgbyA9IGQzLmV2ZW50O1xuICAgICAgZDMuZXZlbnQgPSBlO1xuICAgICAgYXJndW1lbnR6WzBdID0gdGhpcy5fX2RhdGFfXztcbiAgICAgIHRyeSB7XG4gICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50eik7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBkMy5ldmVudCA9IG87XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkM19zZWxlY3Rpb25fb25GaWx0ZXIobGlzdGVuZXIsIGFyZ3VtZW50eikge1xuICAgIHZhciBsID0gZDNfc2VsZWN0aW9uX29uTGlzdGVuZXIobGlzdGVuZXIsIGFyZ3VtZW50eik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciB0YXJnZXQgPSB0aGlzLCByZWxhdGVkID0gZS5yZWxhdGVkVGFyZ2V0O1xuICAgICAgaWYgKCFyZWxhdGVkIHx8IHJlbGF0ZWQgIT09IHRhcmdldCAmJiAhKHJlbGF0ZWQuY29tcGFyZURvY3VtZW50UG9zaXRpb24odGFyZ2V0KSAmIDgpKSB7XG4gICAgICAgIGwuY2FsbCh0YXJnZXQsIGUpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbiAgdmFyIGQzX2V2ZW50X2RyYWdTZWxlY3QgPSBkM192ZW5kb3JTeW1ib2woZDNfZG9jdW1lbnRFbGVtZW50LnN0eWxlLCBcInVzZXJTZWxlY3RcIiksIGQzX2V2ZW50X2RyYWdJZCA9IDA7XG4gIGZ1bmN0aW9uIGQzX2V2ZW50X2RyYWdTdXBwcmVzcygpIHtcbiAgICB2YXIgbmFtZSA9IFwiLmRyYWdzdXBwcmVzcy1cIiArICsrZDNfZXZlbnRfZHJhZ0lkLCB0b3VjaG1vdmUgPSBcInRvdWNobW92ZVwiICsgbmFtZSwgc2VsZWN0c3RhcnQgPSBcInNlbGVjdHN0YXJ0XCIgKyBuYW1lLCBkcmFnc3RhcnQgPSBcImRyYWdzdGFydFwiICsgbmFtZSwgY2xpY2sgPSBcImNsaWNrXCIgKyBuYW1lLCB3ID0gZDMuc2VsZWN0KGQzX3dpbmRvdykub24odG91Y2htb3ZlLCBkM19ldmVudFByZXZlbnREZWZhdWx0KS5vbihzZWxlY3RzdGFydCwgZDNfZXZlbnRQcmV2ZW50RGVmYXVsdCkub24oZHJhZ3N0YXJ0LCBkM19ldmVudFByZXZlbnREZWZhdWx0KSwgc3R5bGUgPSBkM19kb2N1bWVudEVsZW1lbnQuc3R5bGUsIHNlbGVjdCA9IHN0eWxlW2QzX2V2ZW50X2RyYWdTZWxlY3RdO1xuICAgIHN0eWxlW2QzX2V2ZW50X2RyYWdTZWxlY3RdID0gXCJub25lXCI7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHN1cHByZXNzQ2xpY2spIHtcbiAgICAgIHcub24obmFtZSwgbnVsbCk7XG4gICAgICBzdHlsZVtkM19ldmVudF9kcmFnU2VsZWN0XSA9IHNlbGVjdDtcbiAgICAgIGlmIChzdXBwcmVzc0NsaWNrKSB7XG4gICAgICAgIGZ1bmN0aW9uIG9mZigpIHtcbiAgICAgICAgICB3Lm9uKGNsaWNrLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgICB3Lm9uKGNsaWNrLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBkM19ldmVudFByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgb2ZmKCk7XG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgICBzZXRUaW1lb3V0KG9mZiwgMCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBkMy5tb3VzZSA9IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgIHJldHVybiBkM19tb3VzZVBvaW50KGNvbnRhaW5lciwgZDNfZXZlbnRTb3VyY2UoKSk7XG4gIH07XG4gIHZhciBkM19tb3VzZV9idWc0NDA4MyA9IC9XZWJLaXQvLnRlc3QoZDNfd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpID8gLTEgOiAwO1xuICBmdW5jdGlvbiBkM19tb3VzZVBvaW50KGNvbnRhaW5lciwgZSkge1xuICAgIHZhciBzdmcgPSBjb250YWluZXIub3duZXJTVkdFbGVtZW50IHx8IGNvbnRhaW5lcjtcbiAgICBpZiAoc3ZnLmNyZWF0ZVNWR1BvaW50KSB7XG4gICAgICB2YXIgcG9pbnQgPSBzdmcuY3JlYXRlU1ZHUG9pbnQoKTtcbiAgICAgIGlmIChkM19tb3VzZV9idWc0NDA4MyA8IDAgJiYgKGQzX3dpbmRvdy5zY3JvbGxYIHx8IGQzX3dpbmRvdy5zY3JvbGxZKSkge1xuICAgICAgICBzdmcgPSBkMy5zZWxlY3QoXCJib2R5XCIpLmFwcGVuZChcInN2Z1wiKS5zdHlsZSh7XG4gICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICBtYXJnaW46IDAsXG4gICAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgICBib3JkZXI6IFwibm9uZVwiXG4gICAgICAgIH0sIFwiaW1wb3J0YW50XCIpO1xuICAgICAgICB2YXIgY3RtID0gc3ZnWzBdWzBdLmdldFNjcmVlbkNUTSgpO1xuICAgICAgICBkM19tb3VzZV9idWc0NDA4MyA9ICEoY3RtLmYgfHwgY3RtLmUpO1xuICAgICAgICBzdmcucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgICBpZiAoZDNfbW91c2VfYnVnNDQwODMpIHtcbiAgICAgICAgcG9pbnQueCA9IGUucGFnZVg7XG4gICAgICAgIHBvaW50LnkgPSBlLnBhZ2VZO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9pbnQueCA9IGUuY2xpZW50WDtcbiAgICAgICAgcG9pbnQueSA9IGUuY2xpZW50WTtcbiAgICAgIH1cbiAgICAgIHBvaW50ID0gcG9pbnQubWF0cml4VHJhbnNmb3JtKGNvbnRhaW5lci5nZXRTY3JlZW5DVE0oKS5pbnZlcnNlKCkpO1xuICAgICAgcmV0dXJuIFsgcG9pbnQueCwgcG9pbnQueSBdO1xuICAgIH1cbiAgICB2YXIgcmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4gWyBlLmNsaWVudFggLSByZWN0LmxlZnQgLSBjb250YWluZXIuY2xpZW50TGVmdCwgZS5jbGllbnRZIC0gcmVjdC50b3AgLSBjb250YWluZXIuY2xpZW50VG9wIF07XG4gIH1cbiAgZDMudG91Y2hlcyA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgdG91Y2hlcykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgdG91Y2hlcyA9IGQzX2V2ZW50U291cmNlKCkudG91Y2hlcztcbiAgICByZXR1cm4gdG91Y2hlcyA/IGQzX2FycmF5KHRvdWNoZXMpLm1hcChmdW5jdGlvbih0b3VjaCkge1xuICAgICAgdmFyIHBvaW50ID0gZDNfbW91c2VQb2ludChjb250YWluZXIsIHRvdWNoKTtcbiAgICAgIHBvaW50LmlkZW50aWZpZXIgPSB0b3VjaC5pZGVudGlmaWVyO1xuICAgICAgcmV0dXJuIHBvaW50O1xuICAgIH0pIDogW107XG4gIH07XG4gIGQzLmJlaGF2aW9yLmRyYWcgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZXZlbnQgPSBkM19ldmVudERpc3BhdGNoKGRyYWcsIFwiZHJhZ1wiLCBcImRyYWdzdGFydFwiLCBcImRyYWdlbmRcIiksIG9yaWdpbiA9IG51bGwsIG1vdXNlZG93biA9IGRyYWdzdGFydChkM19ub29wLCBkMy5tb3VzZSwgXCJtb3VzZW1vdmVcIiwgXCJtb3VzZXVwXCIpLCB0b3VjaHN0YXJ0ID0gZHJhZ3N0YXJ0KHRvdWNoaWQsIHRvdWNocG9zaXRpb24sIFwidG91Y2htb3ZlXCIsIFwidG91Y2hlbmRcIik7XG4gICAgZnVuY3Rpb24gZHJhZygpIHtcbiAgICAgIHRoaXMub24oXCJtb3VzZWRvd24uZHJhZ1wiLCBtb3VzZWRvd24pLm9uKFwidG91Y2hzdGFydC5kcmFnXCIsIHRvdWNoc3RhcnQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0b3VjaGlkKCkge1xuICAgICAgcmV0dXJuIGQzLmV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmlkZW50aWZpZXI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRvdWNocG9zaXRpb24ocGFyZW50LCBpZCkge1xuICAgICAgcmV0dXJuIGQzLnRvdWNoZXMocGFyZW50KS5maWx0ZXIoZnVuY3Rpb24ocCkge1xuICAgICAgICByZXR1cm4gcC5pZGVudGlmaWVyID09PSBpZDtcbiAgICAgIH0pWzBdO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkcmFnc3RhcnQoaWQsIHBvc2l0aW9uLCBtb3ZlLCBlbmQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMsIHBhcmVudCA9IHRhcmdldC5wYXJlbnROb2RlLCBldmVudF8gPSBldmVudC5vZih0YXJnZXQsIGFyZ3VtZW50cyksIGV2ZW50VGFyZ2V0ID0gZDMuZXZlbnQudGFyZ2V0LCBldmVudElkID0gaWQoKSwgZHJhZyA9IGV2ZW50SWQgPT0gbnVsbCA/IFwiZHJhZ1wiIDogXCJkcmFnLVwiICsgZXZlbnRJZCwgb3JpZ2luXyA9IHBvc2l0aW9uKHBhcmVudCwgZXZlbnRJZCksIGRyYWdnZWQgPSAwLCBvZmZzZXQsIHcgPSBkMy5zZWxlY3QoZDNfd2luZG93KS5vbihtb3ZlICsgXCIuXCIgKyBkcmFnLCBtb3ZlZCkub24oZW5kICsgXCIuXCIgKyBkcmFnLCBlbmRlZCksIGRyYWdSZXN0b3JlID0gZDNfZXZlbnRfZHJhZ1N1cHByZXNzKCk7XG4gICAgICAgIGlmIChvcmlnaW4pIHtcbiAgICAgICAgICBvZmZzZXQgPSBvcmlnaW4uYXBwbHkodGFyZ2V0LCBhcmd1bWVudHMpO1xuICAgICAgICAgIG9mZnNldCA9IFsgb2Zmc2V0LnggLSBvcmlnaW5fWzBdLCBvZmZzZXQueSAtIG9yaWdpbl9bMV0gXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvZmZzZXQgPSBbIDAsIDAgXTtcbiAgICAgICAgfVxuICAgICAgICBldmVudF8oe1xuICAgICAgICAgIHR5cGU6IFwiZHJhZ3N0YXJ0XCJcbiAgICAgICAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIG1vdmVkKCkge1xuICAgICAgICAgIGlmICghcGFyZW50KSByZXR1cm4gZW5kZWQoKTtcbiAgICAgICAgICB2YXIgcCA9IHBvc2l0aW9uKHBhcmVudCwgZXZlbnRJZCksIGR4ID0gcFswXSAtIG9yaWdpbl9bMF0sIGR5ID0gcFsxXSAtIG9yaWdpbl9bMV07XG4gICAgICAgICAgZHJhZ2dlZCB8PSBkeCB8IGR5O1xuICAgICAgICAgIG9yaWdpbl8gPSBwO1xuICAgICAgICAgIGV2ZW50Xyh7XG4gICAgICAgICAgICB0eXBlOiBcImRyYWdcIixcbiAgICAgICAgICAgIHg6IHBbMF0gKyBvZmZzZXRbMF0sXG4gICAgICAgICAgICB5OiBwWzFdICsgb2Zmc2V0WzFdLFxuICAgICAgICAgICAgZHg6IGR4LFxuICAgICAgICAgICAgZHk6IGR5XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZW5kZWQoKSB7XG4gICAgICAgICAgdy5vbihtb3ZlICsgXCIuXCIgKyBkcmFnLCBudWxsKS5vbihlbmQgKyBcIi5cIiArIGRyYWcsIG51bGwpO1xuICAgICAgICAgIGRyYWdSZXN0b3JlKGRyYWdnZWQgJiYgZDMuZXZlbnQudGFyZ2V0ID09PSBldmVudFRhcmdldCk7XG4gICAgICAgICAgZXZlbnRfKHtcbiAgICAgICAgICAgIHR5cGU6IFwiZHJhZ2VuZFwiXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIGRyYWcub3JpZ2luID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3JpZ2luO1xuICAgICAgb3JpZ2luID0geDtcbiAgICAgIHJldHVybiBkcmFnO1xuICAgIH07XG4gICAgcmV0dXJuIGQzLnJlYmluZChkcmFnLCBldmVudCwgXCJvblwiKTtcbiAgfTtcbiAgZDMuYmVoYXZpb3Iuem9vbSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0cmFuc2xhdGUgPSBbIDAsIDAgXSwgdHJhbnNsYXRlMCwgc2NhbGUgPSAxLCBzY2FsZUV4dGVudCA9IGQzX2JlaGF2aW9yX3pvb21JbmZpbml0eSwgbW91c2Vkb3duID0gXCJtb3VzZWRvd24uem9vbVwiLCBtb3VzZW1vdmUgPSBcIm1vdXNlbW92ZS56b29tXCIsIG1vdXNldXAgPSBcIm1vdXNldXAuem9vbVwiLCBldmVudCA9IGQzX2V2ZW50RGlzcGF0Y2goem9vbSwgXCJ6b29tXCIpLCB4MCwgeDEsIHkwLCB5MSwgdG91Y2h0aW1lO1xuICAgIGZ1bmN0aW9uIHpvb20oKSB7XG4gICAgICB0aGlzLm9uKG1vdXNlZG93biwgbW91c2Vkb3duZWQpLm9uKGQzX2JlaGF2aW9yX3pvb21XaGVlbCArIFwiLnpvb21cIiwgbW91c2V3aGVlbGVkKS5vbihtb3VzZW1vdmUsIG1vdXNld2hlZWxyZXNldCkub24oXCJkYmxjbGljay56b29tXCIsIGRibGNsaWNrZWQpLm9uKFwidG91Y2hzdGFydC56b29tXCIsIHRvdWNoc3RhcnRlZCk7XG4gICAgfVxuICAgIHpvb20udHJhbnNsYXRlID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdHJhbnNsYXRlO1xuICAgICAgdHJhbnNsYXRlID0geC5tYXAoTnVtYmVyKTtcbiAgICAgIHJlc2NhbGUoKTtcbiAgICAgIHJldHVybiB6b29tO1xuICAgIH07XG4gICAgem9vbS5zY2FsZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHNjYWxlO1xuICAgICAgc2NhbGUgPSAreDtcbiAgICAgIHJlc2NhbGUoKTtcbiAgICAgIHJldHVybiB6b29tO1xuICAgIH07XG4gICAgem9vbS5zY2FsZUV4dGVudCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHNjYWxlRXh0ZW50O1xuICAgICAgc2NhbGVFeHRlbnQgPSB4ID09IG51bGwgPyBkM19iZWhhdmlvcl96b29tSW5maW5pdHkgOiB4Lm1hcChOdW1iZXIpO1xuICAgICAgcmV0dXJuIHpvb207XG4gICAgfTtcbiAgICB6b29tLnggPSBmdW5jdGlvbih6KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB4MTtcbiAgICAgIHgxID0gejtcbiAgICAgIHgwID0gei5jb3B5KCk7XG4gICAgICB0cmFuc2xhdGUgPSBbIDAsIDAgXTtcbiAgICAgIHNjYWxlID0gMTtcbiAgICAgIHJldHVybiB6b29tO1xuICAgIH07XG4gICAgem9vbS55ID0gZnVuY3Rpb24oeikge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4geTE7XG4gICAgICB5MSA9IHo7XG4gICAgICB5MCA9IHouY29weSgpO1xuICAgICAgdHJhbnNsYXRlID0gWyAwLCAwIF07XG4gICAgICBzY2FsZSA9IDE7XG4gICAgICByZXR1cm4gem9vbTtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGxvY2F0aW9uKHApIHtcbiAgICAgIHJldHVybiBbIChwWzBdIC0gdHJhbnNsYXRlWzBdKSAvIHNjYWxlLCAocFsxXSAtIHRyYW5zbGF0ZVsxXSkgLyBzY2FsZSBdO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwb2ludChsKSB7XG4gICAgICByZXR1cm4gWyBsWzBdICogc2NhbGUgKyB0cmFuc2xhdGVbMF0sIGxbMV0gKiBzY2FsZSArIHRyYW5zbGF0ZVsxXSBdO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzY2FsZVRvKHMpIHtcbiAgICAgIHNjYWxlID0gTWF0aC5tYXgoc2NhbGVFeHRlbnRbMF0sIE1hdGgubWluKHNjYWxlRXh0ZW50WzFdLCBzKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZVRvKHAsIGwpIHtcbiAgICAgIGwgPSBwb2ludChsKTtcbiAgICAgIHRyYW5zbGF0ZVswXSArPSBwWzBdIC0gbFswXTtcbiAgICAgIHRyYW5zbGF0ZVsxXSArPSBwWzFdIC0gbFsxXTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVzY2FsZSgpIHtcbiAgICAgIGlmICh4MSkgeDEuZG9tYWluKHgwLnJhbmdlKCkubWFwKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgcmV0dXJuICh4IC0gdHJhbnNsYXRlWzBdKSAvIHNjYWxlO1xuICAgICAgfSkubWFwKHgwLmludmVydCkpO1xuICAgICAgaWYgKHkxKSB5MS5kb21haW4oeTAucmFuZ2UoKS5tYXAoZnVuY3Rpb24oeSkge1xuICAgICAgICByZXR1cm4gKHkgLSB0cmFuc2xhdGVbMV0pIC8gc2NhbGU7XG4gICAgICB9KS5tYXAoeTAuaW52ZXJ0KSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRpc3BhdGNoKGV2ZW50KSB7XG4gICAgICByZXNjYWxlKCk7XG4gICAgICBldmVudCh7XG4gICAgICAgIHR5cGU6IFwiem9vbVwiLFxuICAgICAgICBzY2FsZTogc2NhbGUsXG4gICAgICAgIHRyYW5zbGF0ZTogdHJhbnNsYXRlXG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbW91c2Vkb3duZWQoKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gdGhpcywgZXZlbnRfID0gZXZlbnQub2YodGFyZ2V0LCBhcmd1bWVudHMpLCBldmVudFRhcmdldCA9IGQzLmV2ZW50LnRhcmdldCwgZHJhZ2dlZCA9IDAsIHcgPSBkMy5zZWxlY3QoZDNfd2luZG93KS5vbihtb3VzZW1vdmUsIG1vdmVkKS5vbihtb3VzZXVwLCBlbmRlZCksIGwgPSBsb2NhdGlvbihkMy5tb3VzZSh0YXJnZXQpKSwgZHJhZ1Jlc3RvcmUgPSBkM19ldmVudF9kcmFnU3VwcHJlc3MoKTtcbiAgICAgIGZ1bmN0aW9uIG1vdmVkKCkge1xuICAgICAgICBkcmFnZ2VkID0gMTtcbiAgICAgICAgdHJhbnNsYXRlVG8oZDMubW91c2UodGFyZ2V0KSwgbCk7XG4gICAgICAgIGRpc3BhdGNoKGV2ZW50Xyk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBlbmRlZCgpIHtcbiAgICAgICAgdy5vbihtb3VzZW1vdmUsIGQzX3dpbmRvdyA9PT0gdGFyZ2V0ID8gbW91c2V3aGVlbHJlc2V0IDogbnVsbCkub24obW91c2V1cCwgbnVsbCk7XG4gICAgICAgIGRyYWdSZXN0b3JlKGRyYWdnZWQgJiYgZDMuZXZlbnQudGFyZ2V0ID09PSBldmVudFRhcmdldCk7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRvdWNoc3RhcnRlZCgpIHtcbiAgICAgIHZhciB0YXJnZXQgPSB0aGlzLCBldmVudF8gPSBldmVudC5vZih0YXJnZXQsIGFyZ3VtZW50cyksIHRvdWNoZXMgPSBkMy50b3VjaGVzKHRhcmdldCksIGxvY2F0aW9ucyA9IHt9LCBkaXN0YW5jZTAgPSAwLCBzY2FsZTAgPSBzY2FsZSwgbm93ID0gRGF0ZS5ub3coKSwgbmFtZSA9IFwiem9vbS1cIiArIGQzLmV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmlkZW50aWZpZXIsIHRvdWNobW92ZSA9IFwidG91Y2htb3ZlLlwiICsgbmFtZSwgdG91Y2hlbmQgPSBcInRvdWNoZW5kLlwiICsgbmFtZSwgdyA9IGQzLnNlbGVjdChkM193aW5kb3cpLm9uKHRvdWNobW92ZSwgbW92ZWQpLm9uKHRvdWNoZW5kLCBlbmRlZCksIHQgPSBkMy5zZWxlY3QodGFyZ2V0KS5vbihtb3VzZWRvd24sIG51bGwpLCBkcmFnUmVzdG9yZSA9IGQzX2V2ZW50X2RyYWdTdXBwcmVzcygpO1xuICAgICAgdG91Y2hlcy5mb3JFYWNoKGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgbG9jYXRpb25zW3QuaWRlbnRpZmllcl0gPSBsb2NhdGlvbih0KTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGlmIChub3cgLSB0b3VjaHRpbWUgPCA1MDApIHtcbiAgICAgICAgICB2YXIgcCA9IHRvdWNoZXNbMF0sIGwgPSBsb2NhdGlvbih0b3VjaGVzWzBdKTtcbiAgICAgICAgICBzY2FsZVRvKHNjYWxlICogMik7XG4gICAgICAgICAgdHJhbnNsYXRlVG8ocCwgbCk7XG4gICAgICAgICAgZDNfZXZlbnRQcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGRpc3BhdGNoKGV2ZW50Xyk7XG4gICAgICAgIH1cbiAgICAgICAgdG91Y2h0aW1lID0gbm93O1xuICAgICAgfSBlbHNlIGlmICh0b3VjaGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdmFyIHAgPSB0b3VjaGVzWzBdLCBxID0gdG91Y2hlc1sxXSwgZHggPSBwWzBdIC0gcVswXSwgZHkgPSBwWzFdIC0gcVsxXTtcbiAgICAgICAgZGlzdGFuY2UwID0gZHggKiBkeCArIGR5ICogZHk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBtb3ZlZCgpIHtcbiAgICAgICAgdmFyIHRvdWNoZXMgPSBkMy50b3VjaGVzKHRhcmdldCksIHAwID0gdG91Y2hlc1swXSwgbDAgPSBsb2NhdGlvbnNbcDAuaWRlbnRpZmllcl07XG4gICAgICAgIGlmIChwMSA9IHRvdWNoZXNbMV0pIHtcbiAgICAgICAgICB2YXIgcDEsIGwxID0gbG9jYXRpb25zW3AxLmlkZW50aWZpZXJdLCBzY2FsZTEgPSBkMy5ldmVudC5zY2FsZTtcbiAgICAgICAgICBpZiAoc2NhbGUxID09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZTEgPSAoZGlzdGFuY2UxID0gcDFbMF0gLSBwMFswXSkgKiBkaXN0YW5jZTEgKyAoZGlzdGFuY2UxID0gcDFbMV0gLSBwMFsxXSkgKiBkaXN0YW5jZTE7XG4gICAgICAgICAgICBzY2FsZTEgPSBkaXN0YW5jZTAgJiYgTWF0aC5zcXJ0KGRpc3RhbmNlMSAvIGRpc3RhbmNlMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHAwID0gWyAocDBbMF0gKyBwMVswXSkgLyAyLCAocDBbMV0gKyBwMVsxXSkgLyAyIF07XG4gICAgICAgICAgbDAgPSBbIChsMFswXSArIGwxWzBdKSAvIDIsIChsMFsxXSArIGwxWzFdKSAvIDIgXTtcbiAgICAgICAgICBzY2FsZVRvKHNjYWxlMSAqIHNjYWxlMCk7XG4gICAgICAgIH1cbiAgICAgICAgdG91Y2h0aW1lID0gbnVsbDtcbiAgICAgICAgdHJhbnNsYXRlVG8ocDAsIGwwKTtcbiAgICAgICAgZGlzcGF0Y2goZXZlbnRfKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGVuZGVkKCkge1xuICAgICAgICB3Lm9uKHRvdWNobW92ZSwgbnVsbCkub24odG91Y2hlbmQsIG51bGwpO1xuICAgICAgICB0Lm9uKG1vdXNlZG93biwgbW91c2Vkb3duZWQpO1xuICAgICAgICBkcmFnUmVzdG9yZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBtb3VzZXdoZWVsZWQoKSB7XG4gICAgICBkM19ldmVudFByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoIXRyYW5zbGF0ZTApIHRyYW5zbGF0ZTAgPSBsb2NhdGlvbihkMy5tb3VzZSh0aGlzKSk7XG4gICAgICBzY2FsZVRvKE1hdGgucG93KDIsIGQzX2JlaGF2aW9yX3pvb21EZWx0YSgpICogLjAwMikgKiBzY2FsZSk7XG4gICAgICB0cmFuc2xhdGVUbyhkMy5tb3VzZSh0aGlzKSwgdHJhbnNsYXRlMCk7XG4gICAgICBkaXNwYXRjaChldmVudC5vZih0aGlzLCBhcmd1bWVudHMpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbW91c2V3aGVlbHJlc2V0KCkge1xuICAgICAgdHJhbnNsYXRlMCA9IG51bGw7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRibGNsaWNrZWQoKSB7XG4gICAgICB2YXIgcCA9IGQzLm1vdXNlKHRoaXMpLCBsID0gbG9jYXRpb24ocCksIGsgPSBNYXRoLmxvZyhzY2FsZSkgLyBNYXRoLkxOMjtcbiAgICAgIHNjYWxlVG8oTWF0aC5wb3coMiwgZDMuZXZlbnQuc2hpZnRLZXkgPyBNYXRoLmNlaWwoaykgLSAxIDogTWF0aC5mbG9vcihrKSArIDEpKTtcbiAgICAgIHRyYW5zbGF0ZVRvKHAsIGwpO1xuICAgICAgZGlzcGF0Y2goZXZlbnQub2YodGhpcywgYXJndW1lbnRzKSk7XG4gICAgfVxuICAgIHJldHVybiBkMy5yZWJpbmQoem9vbSwgZXZlbnQsIFwib25cIik7XG4gIH07XG4gIHZhciBkM19iZWhhdmlvcl96b29tSW5maW5pdHkgPSBbIDAsIEluZmluaXR5IF07XG4gIHZhciBkM19iZWhhdmlvcl96b29tRGVsdGEsIGQzX2JlaGF2aW9yX3pvb21XaGVlbCA9IFwib253aGVlbFwiIGluIGQzX2RvY3VtZW50ID8gKGQzX2JlaGF2aW9yX3pvb21EZWx0YSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAtZDMuZXZlbnQuZGVsdGFZICogKGQzLmV2ZW50LmRlbHRhTW9kZSA/IDEyMCA6IDEpO1xuICB9LCBcIndoZWVsXCIpIDogXCJvbm1vdXNld2hlZWxcIiBpbiBkM19kb2N1bWVudCA/IChkM19iZWhhdmlvcl96b29tRGVsdGEgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDMuZXZlbnQud2hlZWxEZWx0YTtcbiAgfSwgXCJtb3VzZXdoZWVsXCIpIDogKGQzX2JlaGF2aW9yX3pvb21EZWx0YSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAtZDMuZXZlbnQuZGV0YWlsO1xuICB9LCBcIk1vek1vdXNlUGl4ZWxTY3JvbGxcIik7XG4gIGZ1bmN0aW9uIGQzX0NvbG9yKCkge31cbiAgZDNfQ29sb3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucmdiKCkgKyBcIlwiO1xuICB9O1xuICBkMy5oc2wgPSBmdW5jdGlvbihoLCBzLCBsKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyBoIGluc3RhbmNlb2YgZDNfSHNsID8gZDNfaHNsKGguaCwgaC5zLCBoLmwpIDogZDNfcmdiX3BhcnNlKFwiXCIgKyBoLCBkM19yZ2JfaHNsLCBkM19oc2wpIDogZDNfaHNsKCtoLCArcywgK2wpO1xuICB9O1xuICBmdW5jdGlvbiBkM19oc2woaCwgcywgbCkge1xuICAgIHJldHVybiBuZXcgZDNfSHNsKGgsIHMsIGwpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX0hzbChoLCBzLCBsKSB7XG4gICAgdGhpcy5oID0gaDtcbiAgICB0aGlzLnMgPSBzO1xuICAgIHRoaXMubCA9IGw7XG4gIH1cbiAgdmFyIGQzX2hzbFByb3RvdHlwZSA9IGQzX0hzbC5wcm90b3R5cGUgPSBuZXcgZDNfQ29sb3IoKTtcbiAgZDNfaHNsUHJvdG90eXBlLmJyaWdodGVyID0gZnVuY3Rpb24oaykge1xuICAgIGsgPSBNYXRoLnBvdyguNywgYXJndW1lbnRzLmxlbmd0aCA/IGsgOiAxKTtcbiAgICByZXR1cm4gZDNfaHNsKHRoaXMuaCwgdGhpcy5zLCB0aGlzLmwgLyBrKTtcbiAgfTtcbiAgZDNfaHNsUHJvdG90eXBlLmRhcmtlciA9IGZ1bmN0aW9uKGspIHtcbiAgICBrID0gTWF0aC5wb3coLjcsIGFyZ3VtZW50cy5sZW5ndGggPyBrIDogMSk7XG4gICAgcmV0dXJuIGQzX2hzbCh0aGlzLmgsIHRoaXMucywgayAqIHRoaXMubCk7XG4gIH07XG4gIGQzX2hzbFByb3RvdHlwZS5yZ2IgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfaHNsX3JnYih0aGlzLmgsIHRoaXMucywgdGhpcy5sKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfaHNsX3JnYihoLCBzLCBsKSB7XG4gICAgdmFyIG0xLCBtMjtcbiAgICBoID0gaXNOYU4oaCkgPyAwIDogKGggJT0gMzYwKSA8IDAgPyBoICsgMzYwIDogaDtcbiAgICBzID0gaXNOYU4ocykgPyAwIDogcyA8IDAgPyAwIDogcyA+IDEgPyAxIDogcztcbiAgICBsID0gbCA8IDAgPyAwIDogbCA+IDEgPyAxIDogbDtcbiAgICBtMiA9IGwgPD0gLjUgPyBsICogKDEgKyBzKSA6IGwgKyBzIC0gbCAqIHM7XG4gICAgbTEgPSAyICogbCAtIG0yO1xuICAgIGZ1bmN0aW9uIHYoaCkge1xuICAgICAgaWYgKGggPiAzNjApIGggLT0gMzYwOyBlbHNlIGlmIChoIDwgMCkgaCArPSAzNjA7XG4gICAgICBpZiAoaCA8IDYwKSByZXR1cm4gbTEgKyAobTIgLSBtMSkgKiBoIC8gNjA7XG4gICAgICBpZiAoaCA8IDE4MCkgcmV0dXJuIG0yO1xuICAgICAgaWYgKGggPCAyNDApIHJldHVybiBtMSArIChtMiAtIG0xKSAqICgyNDAgLSBoKSAvIDYwO1xuICAgICAgcmV0dXJuIG0xO1xuICAgIH1cbiAgICBmdW5jdGlvbiB2dihoKSB7XG4gICAgICByZXR1cm4gTWF0aC5yb3VuZCh2KGgpICogMjU1KTtcbiAgICB9XG4gICAgcmV0dXJuIGQzX3JnYih2dihoICsgMTIwKSwgdnYoaCksIHZ2KGggLSAxMjApKTtcbiAgfVxuICB2YXIgz4AgPSBNYXRoLlBJLCDOtSA9IDFlLTYsIM61MiA9IM61ICogzrUsIGQzX3JhZGlhbnMgPSDPgCAvIDE4MCwgZDNfZGVncmVlcyA9IDE4MCAvIM+AO1xuICBmdW5jdGlvbiBkM19zZ24oeCkge1xuICAgIHJldHVybiB4ID4gMCA/IDEgOiB4IDwgMCA/IC0xIDogMDtcbiAgfVxuICBmdW5jdGlvbiBkM19hY29zKHgpIHtcbiAgICByZXR1cm4geCA+IDEgPyAwIDogeCA8IC0xID8gz4AgOiBNYXRoLmFjb3MoeCk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfYXNpbih4KSB7XG4gICAgcmV0dXJuIHggPiAxID8gz4AgLyAyIDogeCA8IC0xID8gLc+AIC8gMiA6IE1hdGguYXNpbih4KTtcbiAgfVxuICBmdW5jdGlvbiBkM19zaW5oKHgpIHtcbiAgICByZXR1cm4gKE1hdGguZXhwKHgpIC0gTWF0aC5leHAoLXgpKSAvIDI7XG4gIH1cbiAgZnVuY3Rpb24gZDNfY29zaCh4KSB7XG4gICAgcmV0dXJuIChNYXRoLmV4cCh4KSArIE1hdGguZXhwKC14KSkgLyAyO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2hhdmVyc2luKHgpIHtcbiAgICByZXR1cm4gKHggPSBNYXRoLnNpbih4IC8gMikpICogeDtcbiAgfVxuICBkMy5oY2wgPSBmdW5jdGlvbihoLCBjLCBsKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyBoIGluc3RhbmNlb2YgZDNfSGNsID8gZDNfaGNsKGguaCwgaC5jLCBoLmwpIDogaCBpbnN0YW5jZW9mIGQzX0xhYiA/IGQzX2xhYl9oY2woaC5sLCBoLmEsIGguYikgOiBkM19sYWJfaGNsKChoID0gZDNfcmdiX2xhYigoaCA9IGQzLnJnYihoKSkuciwgaC5nLCBoLmIpKS5sLCBoLmEsIGguYikgOiBkM19oY2woK2gsICtjLCArbCk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2hjbChoLCBjLCBsKSB7XG4gICAgcmV0dXJuIG5ldyBkM19IY2woaCwgYywgbCk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfSGNsKGgsIGMsIGwpIHtcbiAgICB0aGlzLmggPSBoO1xuICAgIHRoaXMuYyA9IGM7XG4gICAgdGhpcy5sID0gbDtcbiAgfVxuICB2YXIgZDNfaGNsUHJvdG90eXBlID0gZDNfSGNsLnByb3RvdHlwZSA9IG5ldyBkM19Db2xvcigpO1xuICBkM19oY2xQcm90b3R5cGUuYnJpZ2h0ZXIgPSBmdW5jdGlvbihrKSB7XG4gICAgcmV0dXJuIGQzX2hjbCh0aGlzLmgsIHRoaXMuYywgTWF0aC5taW4oMTAwLCB0aGlzLmwgKyBkM19sYWJfSyAqIChhcmd1bWVudHMubGVuZ3RoID8gayA6IDEpKSk7XG4gIH07XG4gIGQzX2hjbFByb3RvdHlwZS5kYXJrZXIgPSBmdW5jdGlvbihrKSB7XG4gICAgcmV0dXJuIGQzX2hjbCh0aGlzLmgsIHRoaXMuYywgTWF0aC5tYXgoMCwgdGhpcy5sIC0gZDNfbGFiX0sgKiAoYXJndW1lbnRzLmxlbmd0aCA/IGsgOiAxKSkpO1xuICB9O1xuICBkM19oY2xQcm90b3R5cGUucmdiID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGQzX2hjbF9sYWIodGhpcy5oLCB0aGlzLmMsIHRoaXMubCkucmdiKCk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2hjbF9sYWIoaCwgYywgbCkge1xuICAgIGlmIChpc05hTihoKSkgaCA9IDA7XG4gICAgaWYgKGlzTmFOKGMpKSBjID0gMDtcbiAgICByZXR1cm4gZDNfbGFiKGwsIE1hdGguY29zKGggKj0gZDNfcmFkaWFucykgKiBjLCBNYXRoLnNpbihoKSAqIGMpO1xuICB9XG4gIGQzLmxhYiA9IGZ1bmN0aW9uKGwsIGEsIGIpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IGwgaW5zdGFuY2VvZiBkM19MYWIgPyBkM19sYWIobC5sLCBsLmEsIGwuYikgOiBsIGluc3RhbmNlb2YgZDNfSGNsID8gZDNfaGNsX2xhYihsLmwsIGwuYywgbC5oKSA6IGQzX3JnYl9sYWIoKGwgPSBkMy5yZ2IobCkpLnIsIGwuZywgbC5iKSA6IGQzX2xhYigrbCwgK2EsICtiKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfbGFiKGwsIGEsIGIpIHtcbiAgICByZXR1cm4gbmV3IGQzX0xhYihsLCBhLCBiKTtcbiAgfVxuICBmdW5jdGlvbiBkM19MYWIobCwgYSwgYikge1xuICAgIHRoaXMubCA9IGw7XG4gICAgdGhpcy5hID0gYTtcbiAgICB0aGlzLmIgPSBiO1xuICB9XG4gIHZhciBkM19sYWJfSyA9IDE4O1xuICB2YXIgZDNfbGFiX1ggPSAuOTUwNDcsIGQzX2xhYl9ZID0gMSwgZDNfbGFiX1ogPSAxLjA4ODgzO1xuICB2YXIgZDNfbGFiUHJvdG90eXBlID0gZDNfTGFiLnByb3RvdHlwZSA9IG5ldyBkM19Db2xvcigpO1xuICBkM19sYWJQcm90b3R5cGUuYnJpZ2h0ZXIgPSBmdW5jdGlvbihrKSB7XG4gICAgcmV0dXJuIGQzX2xhYihNYXRoLm1pbigxMDAsIHRoaXMubCArIGQzX2xhYl9LICogKGFyZ3VtZW50cy5sZW5ndGggPyBrIDogMSkpLCB0aGlzLmEsIHRoaXMuYik7XG4gIH07XG4gIGQzX2xhYlByb3RvdHlwZS5kYXJrZXIgPSBmdW5jdGlvbihrKSB7XG4gICAgcmV0dXJuIGQzX2xhYihNYXRoLm1heCgwLCB0aGlzLmwgLSBkM19sYWJfSyAqIChhcmd1bWVudHMubGVuZ3RoID8gayA6IDEpKSwgdGhpcy5hLCB0aGlzLmIpO1xuICB9O1xuICBkM19sYWJQcm90b3R5cGUucmdiID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGQzX2xhYl9yZ2IodGhpcy5sLCB0aGlzLmEsIHRoaXMuYik7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2xhYl9yZ2IobCwgYSwgYikge1xuICAgIHZhciB5ID0gKGwgKyAxNikgLyAxMTYsIHggPSB5ICsgYSAvIDUwMCwgeiA9IHkgLSBiIC8gMjAwO1xuICAgIHggPSBkM19sYWJfeHl6KHgpICogZDNfbGFiX1g7XG4gICAgeSA9IGQzX2xhYl94eXooeSkgKiBkM19sYWJfWTtcbiAgICB6ID0gZDNfbGFiX3h5eih6KSAqIGQzX2xhYl9aO1xuICAgIHJldHVybiBkM19yZ2IoZDNfeHl6X3JnYigzLjI0MDQ1NDIgKiB4IC0gMS41MzcxMzg1ICogeSAtIC40OTg1MzE0ICogeiksIGQzX3h5el9yZ2IoLS45NjkyNjYgKiB4ICsgMS44NzYwMTA4ICogeSArIC4wNDE1NTYgKiB6KSwgZDNfeHl6X3JnYiguMDU1NjQzNCAqIHggLSAuMjA0MDI1OSAqIHkgKyAxLjA1NzIyNTIgKiB6KSk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGFiX2hjbChsLCBhLCBiKSB7XG4gICAgcmV0dXJuIGwgPiAwID8gZDNfaGNsKE1hdGguYXRhbjIoYiwgYSkgKiBkM19kZWdyZWVzLCBNYXRoLnNxcnQoYSAqIGEgKyBiICogYiksIGwpIDogZDNfaGNsKE5hTiwgTmFOLCBsKTtcbiAgfVxuICBmdW5jdGlvbiBkM19sYWJfeHl6KHgpIHtcbiAgICByZXR1cm4geCA+IC4yMDY4OTMwMzQgPyB4ICogeCAqIHggOiAoeCAtIDQgLyAyOSkgLyA3Ljc4NzAzNztcbiAgfVxuICBmdW5jdGlvbiBkM194eXpfbGFiKHgpIHtcbiAgICByZXR1cm4geCA+IC4wMDg4NTYgPyBNYXRoLnBvdyh4LCAxIC8gMykgOiA3Ljc4NzAzNyAqIHggKyA0IC8gMjk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfeHl6X3JnYihyKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoMjU1ICogKHIgPD0gLjAwMzA0ID8gMTIuOTIgKiByIDogMS4wNTUgKiBNYXRoLnBvdyhyLCAxIC8gMi40KSAtIC4wNTUpKTtcbiAgfVxuICBkMy5yZ2IgPSBmdW5jdGlvbihyLCBnLCBiKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyByIGluc3RhbmNlb2YgZDNfUmdiID8gZDNfcmdiKHIuciwgci5nLCByLmIpIDogZDNfcmdiX3BhcnNlKFwiXCIgKyByLCBkM19yZ2IsIGQzX2hzbF9yZ2IpIDogZDNfcmdiKH5+ciwgfn5nLCB+fmIpO1xuICB9O1xuICBmdW5jdGlvbiBkM19yZ2JOdW1iZXIodmFsdWUpIHtcbiAgICByZXR1cm4gZDNfcmdiKHZhbHVlID4+IDE2LCB2YWx1ZSA+PiA4ICYgMjU1LCB2YWx1ZSAmIDI1NSk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfcmdiU3RyaW5nKHZhbHVlKSB7XG4gICAgcmV0dXJuIGQzX3JnYk51bWJlcih2YWx1ZSkgKyBcIlwiO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3JnYihyLCBnLCBiKSB7XG4gICAgcmV0dXJuIG5ldyBkM19SZ2IociwgZywgYik7XG4gIH1cbiAgZnVuY3Rpb24gZDNfUmdiKHIsIGcsIGIpIHtcbiAgICB0aGlzLnIgPSByO1xuICAgIHRoaXMuZyA9IGc7XG4gICAgdGhpcy5iID0gYjtcbiAgfVxuICB2YXIgZDNfcmdiUHJvdG90eXBlID0gZDNfUmdiLnByb3RvdHlwZSA9IG5ldyBkM19Db2xvcigpO1xuICBkM19yZ2JQcm90b3R5cGUuYnJpZ2h0ZXIgPSBmdW5jdGlvbihrKSB7XG4gICAgayA9IE1hdGgucG93KC43LCBhcmd1bWVudHMubGVuZ3RoID8gayA6IDEpO1xuICAgIHZhciByID0gdGhpcy5yLCBnID0gdGhpcy5nLCBiID0gdGhpcy5iLCBpID0gMzA7XG4gICAgaWYgKCFyICYmICFnICYmICFiKSByZXR1cm4gZDNfcmdiKGksIGksIGkpO1xuICAgIGlmIChyICYmIHIgPCBpKSByID0gaTtcbiAgICBpZiAoZyAmJiBnIDwgaSkgZyA9IGk7XG4gICAgaWYgKGIgJiYgYiA8IGkpIGIgPSBpO1xuICAgIHJldHVybiBkM19yZ2IoTWF0aC5taW4oMjU1LCB+fihyIC8gaykpLCBNYXRoLm1pbigyNTUsIH5+KGcgLyBrKSksIE1hdGgubWluKDI1NSwgfn4oYiAvIGspKSk7XG4gIH07XG4gIGQzX3JnYlByb3RvdHlwZS5kYXJrZXIgPSBmdW5jdGlvbihrKSB7XG4gICAgayA9IE1hdGgucG93KC43LCBhcmd1bWVudHMubGVuZ3RoID8gayA6IDEpO1xuICAgIHJldHVybiBkM19yZ2Iofn4oayAqIHRoaXMuciksIH5+KGsgKiB0aGlzLmcpLCB+fihrICogdGhpcy5iKSk7XG4gIH07XG4gIGQzX3JnYlByb3RvdHlwZS5oc2wgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfcmdiX2hzbCh0aGlzLnIsIHRoaXMuZywgdGhpcy5iKTtcbiAgfTtcbiAgZDNfcmdiUHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiI1wiICsgZDNfcmdiX2hleCh0aGlzLnIpICsgZDNfcmdiX2hleCh0aGlzLmcpICsgZDNfcmdiX2hleCh0aGlzLmIpO1xuICB9O1xuICBmdW5jdGlvbiBkM19yZ2JfaGV4KHYpIHtcbiAgICByZXR1cm4gdiA8IDE2ID8gXCIwXCIgKyBNYXRoLm1heCgwLCB2KS50b1N0cmluZygxNikgOiBNYXRoLm1pbigyNTUsIHYpLnRvU3RyaW5nKDE2KTtcbiAgfVxuICBmdW5jdGlvbiBkM19yZ2JfcGFyc2UoZm9ybWF0LCByZ2IsIGhzbCkge1xuICAgIHZhciByID0gMCwgZyA9IDAsIGIgPSAwLCBtMSwgbTIsIG5hbWU7XG4gICAgbTEgPSAvKFthLXpdKylcXCgoLiopXFwpL2kuZXhlYyhmb3JtYXQpO1xuICAgIGlmIChtMSkge1xuICAgICAgbTIgPSBtMVsyXS5zcGxpdChcIixcIik7XG4gICAgICBzd2l0Y2ggKG0xWzFdKSB7XG4gICAgICAgY2FzZSBcImhzbFwiOlxuICAgICAgICB7XG4gICAgICAgICAgcmV0dXJuIGhzbChwYXJzZUZsb2F0KG0yWzBdKSwgcGFyc2VGbG9hdChtMlsxXSkgLyAxMDAsIHBhcnNlRmxvYXQobTJbMl0pIC8gMTAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgY2FzZSBcInJnYlwiOlxuICAgICAgICB7XG4gICAgICAgICAgcmV0dXJuIHJnYihkM19yZ2JfcGFyc2VOdW1iZXIobTJbMF0pLCBkM19yZ2JfcGFyc2VOdW1iZXIobTJbMV0pLCBkM19yZ2JfcGFyc2VOdW1iZXIobTJbMl0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAobmFtZSA9IGQzX3JnYl9uYW1lcy5nZXQoZm9ybWF0KSkgcmV0dXJuIHJnYihuYW1lLnIsIG5hbWUuZywgbmFtZS5iKTtcbiAgICBpZiAoZm9ybWF0ICE9IG51bGwgJiYgZm9ybWF0LmNoYXJBdCgwKSA9PT0gXCIjXCIpIHtcbiAgICAgIGlmIChmb3JtYXQubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIHIgPSBmb3JtYXQuY2hhckF0KDEpO1xuICAgICAgICByICs9IHI7XG4gICAgICAgIGcgPSBmb3JtYXQuY2hhckF0KDIpO1xuICAgICAgICBnICs9IGc7XG4gICAgICAgIGIgPSBmb3JtYXQuY2hhckF0KDMpO1xuICAgICAgICBiICs9IGI7XG4gICAgICB9IGVsc2UgaWYgKGZvcm1hdC5sZW5ndGggPT09IDcpIHtcbiAgICAgICAgciA9IGZvcm1hdC5zdWJzdHJpbmcoMSwgMyk7XG4gICAgICAgIGcgPSBmb3JtYXQuc3Vic3RyaW5nKDMsIDUpO1xuICAgICAgICBiID0gZm9ybWF0LnN1YnN0cmluZyg1LCA3KTtcbiAgICAgIH1cbiAgICAgIHIgPSBwYXJzZUludChyLCAxNik7XG4gICAgICBnID0gcGFyc2VJbnQoZywgMTYpO1xuICAgICAgYiA9IHBhcnNlSW50KGIsIDE2KTtcbiAgICB9XG4gICAgcmV0dXJuIHJnYihyLCBnLCBiKTtcbiAgfVxuICBmdW5jdGlvbiBkM19yZ2JfaHNsKHIsIGcsIGIpIHtcbiAgICB2YXIgbWluID0gTWF0aC5taW4ociAvPSAyNTUsIGcgLz0gMjU1LCBiIC89IDI1NSksIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLCBkID0gbWF4IC0gbWluLCBoLCBzLCBsID0gKG1heCArIG1pbikgLyAyO1xuICAgIGlmIChkKSB7XG4gICAgICBzID0gbCA8IC41ID8gZCAvIChtYXggKyBtaW4pIDogZCAvICgyIC0gbWF4IC0gbWluKTtcbiAgICAgIGlmIChyID09IG1heCkgaCA9IChnIC0gYikgLyBkICsgKGcgPCBiID8gNiA6IDApOyBlbHNlIGlmIChnID09IG1heCkgaCA9IChiIC0gcikgLyBkICsgMjsgZWxzZSBoID0gKHIgLSBnKSAvIGQgKyA0O1xuICAgICAgaCAqPSA2MDtcbiAgICB9IGVsc2Uge1xuICAgICAgaCA9IE5hTjtcbiAgICAgIHMgPSBsID4gMCAmJiBsIDwgMSA/IDAgOiBoO1xuICAgIH1cbiAgICByZXR1cm4gZDNfaHNsKGgsIHMsIGwpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3JnYl9sYWIociwgZywgYikge1xuICAgIHIgPSBkM19yZ2JfeHl6KHIpO1xuICAgIGcgPSBkM19yZ2JfeHl6KGcpO1xuICAgIGIgPSBkM19yZ2JfeHl6KGIpO1xuICAgIHZhciB4ID0gZDNfeHl6X2xhYigoLjQxMjQ1NjQgKiByICsgLjM1NzU3NjEgKiBnICsgLjE4MDQzNzUgKiBiKSAvIGQzX2xhYl9YKSwgeSA9IGQzX3h5el9sYWIoKC4yMTI2NzI5ICogciArIC43MTUxNTIyICogZyArIC4wNzIxNzUgKiBiKSAvIGQzX2xhYl9ZKSwgeiA9IGQzX3h5el9sYWIoKC4wMTkzMzM5ICogciArIC4xMTkxOTIgKiBnICsgLjk1MDMwNDEgKiBiKSAvIGQzX2xhYl9aKTtcbiAgICByZXR1cm4gZDNfbGFiKDExNiAqIHkgLSAxNiwgNTAwICogKHggLSB5KSwgMjAwICogKHkgLSB6KSk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfcmdiX3h5eihyKSB7XG4gICAgcmV0dXJuIChyIC89IDI1NSkgPD0gLjA0MDQ1ID8gciAvIDEyLjkyIDogTWF0aC5wb3coKHIgKyAuMDU1KSAvIDEuMDU1LCAyLjQpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3JnYl9wYXJzZU51bWJlcihjKSB7XG4gICAgdmFyIGYgPSBwYXJzZUZsb2F0KGMpO1xuICAgIHJldHVybiBjLmNoYXJBdChjLmxlbmd0aCAtIDEpID09PSBcIiVcIiA/IE1hdGgucm91bmQoZiAqIDIuNTUpIDogZjtcbiAgfVxuICB2YXIgZDNfcmdiX25hbWVzID0gZDMubWFwKHtcbiAgICBhbGljZWJsdWU6IDE1NzkyMzgzLFxuICAgIGFudGlxdWV3aGl0ZTogMTY0NDQzNzUsXG4gICAgYXF1YTogNjU1MzUsXG4gICAgYXF1YW1hcmluZTogODM4ODU2NCxcbiAgICBhenVyZTogMTU3OTQxNzUsXG4gICAgYmVpZ2U6IDE2MTE5MjYwLFxuICAgIGJpc3F1ZTogMTY3NzAyNDQsXG4gICAgYmxhY2s6IDAsXG4gICAgYmxhbmNoZWRhbG1vbmQ6IDE2NzcyMDQ1LFxuICAgIGJsdWU6IDI1NSxcbiAgICBibHVldmlvbGV0OiA5MDU1MjAyLFxuICAgIGJyb3duOiAxMDgyNDIzNCxcbiAgICBidXJseXdvb2Q6IDE0NTk2MjMxLFxuICAgIGNhZGV0Ymx1ZTogNjI2NjUyOCxcbiAgICBjaGFydHJldXNlOiA4Mzg4MzUyLFxuICAgIGNob2NvbGF0ZTogMTM3ODk0NzAsXG4gICAgY29yYWw6IDE2NzQ0MjcyLFxuICAgIGNvcm5mbG93ZXJibHVlOiA2NTkxOTgxLFxuICAgIGNvcm5zaWxrOiAxNjc3NTM4OCxcbiAgICBjcmltc29uOiAxNDQyMzEwMCxcbiAgICBjeWFuOiA2NTUzNSxcbiAgICBkYXJrYmx1ZTogMTM5LFxuICAgIGRhcmtjeWFuOiAzNTcyMyxcbiAgICBkYXJrZ29sZGVucm9kOiAxMjA5MjkzOSxcbiAgICBkYXJrZ3JheTogMTExMTkwMTcsXG4gICAgZGFya2dyZWVuOiAyNTYwMCxcbiAgICBkYXJrZ3JleTogMTExMTkwMTcsXG4gICAgZGFya2toYWtpOiAxMjQzMzI1OSxcbiAgICBkYXJrbWFnZW50YTogOTEwOTY0MyxcbiAgICBkYXJrb2xpdmVncmVlbjogNTU5Nzk5OSxcbiAgICBkYXJrb3JhbmdlOiAxNjc0NzUyMCxcbiAgICBkYXJrb3JjaGlkOiAxMDA0MDAxMixcbiAgICBkYXJrcmVkOiA5MTA5NTA0LFxuICAgIGRhcmtzYWxtb246IDE1MzA4NDEwLFxuICAgIGRhcmtzZWFncmVlbjogOTQxOTkxOSxcbiAgICBkYXJrc2xhdGVibHVlOiA0NzM0MzQ3LFxuICAgIGRhcmtzbGF0ZWdyYXk6IDMxMDA0OTUsXG4gICAgZGFya3NsYXRlZ3JleTogMzEwMDQ5NSxcbiAgICBkYXJrdHVycXVvaXNlOiA1Mjk0NSxcbiAgICBkYXJrdmlvbGV0OiA5Njk5NTM5LFxuICAgIGRlZXBwaW5rOiAxNjcxNjk0NyxcbiAgICBkZWVwc2t5Ymx1ZTogNDkxNTEsXG4gICAgZGltZ3JheTogNjkwODI2NSxcbiAgICBkaW1ncmV5OiA2OTA4MjY1LFxuICAgIGRvZGdlcmJsdWU6IDIwMDMxOTksXG4gICAgZmlyZWJyaWNrOiAxMTY3NDE0NixcbiAgICBmbG9yYWx3aGl0ZTogMTY3NzU5MjAsXG4gICAgZm9yZXN0Z3JlZW46IDIyNjM4NDIsXG4gICAgZnVjaHNpYTogMTY3MTE5MzUsXG4gICAgZ2FpbnNib3JvOiAxNDQ3NDQ2MCxcbiAgICBnaG9zdHdoaXRlOiAxNjMxNjY3MSxcbiAgICBnb2xkOiAxNjc2NjcyMCxcbiAgICBnb2xkZW5yb2Q6IDE0MzI5MTIwLFxuICAgIGdyYXk6IDg0MjE1MDQsXG4gICAgZ3JlZW46IDMyNzY4LFxuICAgIGdyZWVueWVsbG93OiAxMTQwMzA1NSxcbiAgICBncmV5OiA4NDIxNTA0LFxuICAgIGhvbmV5ZGV3OiAxNTc5NDE2MCxcbiAgICBob3RwaW5rOiAxNjczODc0MCxcbiAgICBpbmRpYW5yZWQ6IDEzNDU4NTI0LFxuICAgIGluZGlnbzogNDkxNTMzMCxcbiAgICBpdm9yeTogMTY3NzcyMDAsXG4gICAga2hha2k6IDE1Nzg3NjYwLFxuICAgIGxhdmVuZGVyOiAxNTEzMjQxMCxcbiAgICBsYXZlbmRlcmJsdXNoOiAxNjc3MzM2NSxcbiAgICBsYXduZ3JlZW46IDgxOTA5NzYsXG4gICAgbGVtb25jaGlmZm9uOiAxNjc3NTg4NSxcbiAgICBsaWdodGJsdWU6IDExMzkzMjU0LFxuICAgIGxpZ2h0Y29yYWw6IDE1NzYxNTM2LFxuICAgIGxpZ2h0Y3lhbjogMTQ3NDU1OTksXG4gICAgbGlnaHRnb2xkZW5yb2R5ZWxsb3c6IDE2NDQ4MjEwLFxuICAgIGxpZ2h0Z3JheTogMTM4ODIzMjMsXG4gICAgbGlnaHRncmVlbjogOTQ5ODI1NixcbiAgICBsaWdodGdyZXk6IDEzODgyMzIzLFxuICAgIGxpZ2h0cGluazogMTY3NTg0NjUsXG4gICAgbGlnaHRzYWxtb246IDE2NzUyNzYyLFxuICAgIGxpZ2h0c2VhZ3JlZW46IDIxNDI4OTAsXG4gICAgbGlnaHRza3libHVlOiA4OTAwMzQ2LFxuICAgIGxpZ2h0c2xhdGVncmF5OiA3ODMzNzUzLFxuICAgIGxpZ2h0c2xhdGVncmV5OiA3ODMzNzUzLFxuICAgIGxpZ2h0c3RlZWxibHVlOiAxMTU4NDczNCxcbiAgICBsaWdodHllbGxvdzogMTY3NzcxODQsXG4gICAgbGltZTogNjUyODAsXG4gICAgbGltZWdyZWVuOiAzMzI5MzMwLFxuICAgIGxpbmVuOiAxNjQ0NTY3MCxcbiAgICBtYWdlbnRhOiAxNjcxMTkzNSxcbiAgICBtYXJvb246IDgzODg2MDgsXG4gICAgbWVkaXVtYXF1YW1hcmluZTogNjczNzMyMixcbiAgICBtZWRpdW1ibHVlOiAyMDUsXG4gICAgbWVkaXVtb3JjaGlkOiAxMjIxMTY2NyxcbiAgICBtZWRpdW1wdXJwbGU6IDk2NjI2ODMsXG4gICAgbWVkaXVtc2VhZ3JlZW46IDM5NzgwOTcsXG4gICAgbWVkaXVtc2xhdGVibHVlOiA4MDg3NzkwLFxuICAgIG1lZGl1bXNwcmluZ2dyZWVuOiA2NDE1NCxcbiAgICBtZWRpdW10dXJxdW9pc2U6IDQ3NzIzMDAsXG4gICAgbWVkaXVtdmlvbGV0cmVkOiAxMzA0NzE3MyxcbiAgICBtaWRuaWdodGJsdWU6IDE2NDQ5MTIsXG4gICAgbWludGNyZWFtOiAxNjEyMTg1MCxcbiAgICBtaXN0eXJvc2U6IDE2NzcwMjczLFxuICAgIG1vY2Nhc2luOiAxNjc3MDIyOSxcbiAgICBuYXZham93aGl0ZTogMTY3Njg2ODUsXG4gICAgbmF2eTogMTI4LFxuICAgIG9sZGxhY2U6IDE2NjQzNTU4LFxuICAgIG9saXZlOiA4NDIxMzc2LFxuICAgIG9saXZlZHJhYjogNzA0ODczOSxcbiAgICBvcmFuZ2U6IDE2NzUzOTIwLFxuICAgIG9yYW5nZXJlZDogMTY3MjkzNDQsXG4gICAgb3JjaGlkOiAxNDMxNTczNCxcbiAgICBwYWxlZ29sZGVucm9kOiAxNTY1NzEzMCxcbiAgICBwYWxlZ3JlZW46IDEwMDI1ODgwLFxuICAgIHBhbGV0dXJxdW9pc2U6IDExNTI5OTY2LFxuICAgIHBhbGV2aW9sZXRyZWQ6IDE0MzgxMjAzLFxuICAgIHBhcGF5YXdoaXA6IDE2NzczMDc3LFxuICAgIHBlYWNocHVmZjogMTY3Njc2NzMsXG4gICAgcGVydTogMTM0Njg5OTEsXG4gICAgcGluazogMTY3NjEwMzUsXG4gICAgcGx1bTogMTQ1MjQ2MzcsXG4gICAgcG93ZGVyYmx1ZTogMTE1OTE5MTAsXG4gICAgcHVycGxlOiA4Mzg4NzM2LFxuICAgIHJlZDogMTY3MTE2ODAsXG4gICAgcm9zeWJyb3duOiAxMjM1NzUxOSxcbiAgICByb3lhbGJsdWU6IDQyODY5NDUsXG4gICAgc2FkZGxlYnJvd246IDkxMjcxODcsXG4gICAgc2FsbW9uOiAxNjQxNjg4MixcbiAgICBzYW5keWJyb3duOiAxNjAzMjg2NCxcbiAgICBzZWFncmVlbjogMzA1MDMyNyxcbiAgICBzZWFzaGVsbDogMTY3NzQ2MzgsXG4gICAgc2llbm5hOiAxMDUwNjc5NyxcbiAgICBzaWx2ZXI6IDEyNjMyMjU2LFxuICAgIHNreWJsdWU6IDg5MDAzMzEsXG4gICAgc2xhdGVibHVlOiA2OTcwMDYxLFxuICAgIHNsYXRlZ3JheTogNzM3Mjk0NCxcbiAgICBzbGF0ZWdyZXk6IDczNzI5NDQsXG4gICAgc25vdzogMTY3NzU5MzAsXG4gICAgc3ByaW5nZ3JlZW46IDY1NDA3LFxuICAgIHN0ZWVsYmx1ZTogNDYyMDk4MCxcbiAgICB0YW46IDEzODA4NzgwLFxuICAgIHRlYWw6IDMyODk2LFxuICAgIHRoaXN0bGU6IDE0MjA0ODg4LFxuICAgIHRvbWF0bzogMTY3MzcwOTUsXG4gICAgdHVycXVvaXNlOiA0MjUxODU2LFxuICAgIHZpb2xldDogMTU2MzEwODYsXG4gICAgd2hlYXQ6IDE2MTEzMzMxLFxuICAgIHdoaXRlOiAxNjc3NzIxNSxcbiAgICB3aGl0ZXNtb2tlOiAxNjExOTI4NSxcbiAgICB5ZWxsb3c6IDE2Nzc2OTYwLFxuICAgIHllbGxvd2dyZWVuOiAxMDE0NTA3NFxuICB9KTtcbiAgZDNfcmdiX25hbWVzLmZvckVhY2goZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIGQzX3JnYl9uYW1lcy5zZXQoa2V5LCBkM19yZ2JOdW1iZXIodmFsdWUpKTtcbiAgfSk7XG4gIGZ1bmN0aW9uIGQzX2Z1bmN0b3Iodikge1xuICAgIHJldHVybiB0eXBlb2YgdiA9PT0gXCJmdW5jdGlvblwiID8gdiA6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHY7XG4gICAgfTtcbiAgfVxuICBkMy5mdW5jdG9yID0gZDNfZnVuY3RvcjtcbiAgZnVuY3Rpb24gZDNfaWRlbnRpdHkoZCkge1xuICAgIHJldHVybiBkO1xuICB9XG4gIGQzLnhociA9IGQzX3hoclR5cGUoZDNfaWRlbnRpdHkpO1xuICBmdW5jdGlvbiBkM194aHJUeXBlKHJlc3BvbnNlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHVybCwgbWltZVR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB0eXBlb2YgbWltZVR5cGUgPT09IFwiZnVuY3Rpb25cIikgY2FsbGJhY2sgPSBtaW1lVHlwZSwgXG4gICAgICBtaW1lVHlwZSA9IG51bGw7XG4gICAgICByZXR1cm4gZDNfeGhyKHVybCwgbWltZVR5cGUsIHJlc3BvbnNlLCBjYWxsYmFjayk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkM194aHIodXJsLCBtaW1lVHlwZSwgcmVzcG9uc2UsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHhociA9IHt9LCBkaXNwYXRjaCA9IGQzLmRpc3BhdGNoKFwicHJvZ3Jlc3NcIiwgXCJsb2FkXCIsIFwiZXJyb3JcIiksIGhlYWRlcnMgPSB7fSwgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpLCByZXNwb25zZVR5cGUgPSBudWxsO1xuICAgIGlmIChkM193aW5kb3cuWERvbWFpblJlcXVlc3QgJiYgIShcIndpdGhDcmVkZW50aWFsc1wiIGluIHJlcXVlc3QpICYmIC9eKGh0dHAocyk/Oik/XFwvXFwvLy50ZXN0KHVybCkpIHJlcXVlc3QgPSBuZXcgWERvbWFpblJlcXVlc3QoKTtcbiAgICBcIm9ubG9hZFwiIGluIHJlcXVlc3QgPyByZXF1ZXN0Lm9ubG9hZCA9IHJlcXVlc3Qub25lcnJvciA9IHJlc3BvbmQgOiByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmVxdWVzdC5yZWFkeVN0YXRlID4gMyAmJiByZXNwb25kKCk7XG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXNwb25kKCkge1xuICAgICAgdmFyIHN0YXR1cyA9IHJlcXVlc3Quc3RhdHVzLCByZXN1bHQ7XG4gICAgICBpZiAoIXN0YXR1cyAmJiByZXF1ZXN0LnJlc3BvbnNlVGV4dCB8fCBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMCB8fCBzdGF0dXMgPT09IDMwNCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlc3VsdCA9IHJlc3BvbnNlLmNhbGwoeGhyLCByZXF1ZXN0KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGRpc3BhdGNoLmVycm9yLmNhbGwoeGhyLCBlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZGlzcGF0Y2gubG9hZC5jYWxsKHhociwgcmVzdWx0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BhdGNoLmVycm9yLmNhbGwoeGhyLCByZXF1ZXN0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVxdWVzdC5vbnByb2dyZXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHZhciBvID0gZDMuZXZlbnQ7XG4gICAgICBkMy5ldmVudCA9IGV2ZW50O1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGlzcGF0Y2gucHJvZ3Jlc3MuY2FsbCh4aHIsIHJlcXVlc3QpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgZDMuZXZlbnQgPSBvO1xuICAgICAgfVxuICAgIH07XG4gICAgeGhyLmhlYWRlciA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICBuYW1lID0gKG5hbWUgKyBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gaGVhZGVyc1tuYW1lXTtcbiAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSBkZWxldGUgaGVhZGVyc1tuYW1lXTsgZWxzZSBoZWFkZXJzW25hbWVdID0gdmFsdWUgKyBcIlwiO1xuICAgICAgcmV0dXJuIHhocjtcbiAgICB9O1xuICAgIHhoci5taW1lVHlwZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBtaW1lVHlwZTtcbiAgICAgIG1pbWVUeXBlID0gdmFsdWUgPT0gbnVsbCA/IG51bGwgOiB2YWx1ZSArIFwiXCI7XG4gICAgICByZXR1cm4geGhyO1xuICAgIH07XG4gICAgeGhyLnJlc3BvbnNlVHlwZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiByZXNwb25zZVR5cGU7XG4gICAgICByZXNwb25zZVR5cGUgPSB2YWx1ZTtcbiAgICAgIHJldHVybiB4aHI7XG4gICAgfTtcbiAgICB4aHIucmVzcG9uc2UgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmVzcG9uc2UgPSB2YWx1ZTtcbiAgICAgIHJldHVybiB4aHI7XG4gICAgfTtcbiAgICBbIFwiZ2V0XCIsIFwicG9zdFwiIF0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHhoclttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB4aHIuc2VuZC5hcHBseSh4aHIsIFsgbWV0aG9kIF0uY29uY2F0KGQzX2FycmF5KGFyZ3VtZW50cykpKTtcbiAgICAgIH07XG4gICAgfSk7XG4gICAgeGhyLnNlbmQgPSBmdW5jdGlvbihtZXRob2QsIGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB0eXBlb2YgZGF0YSA9PT0gXCJmdW5jdGlvblwiKSBjYWxsYmFjayA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICAgICAgcmVxdWVzdC5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcbiAgICAgIGlmIChtaW1lVHlwZSAhPSBudWxsICYmICEoXCJhY2NlcHRcIiBpbiBoZWFkZXJzKSkgaGVhZGVyc1tcImFjY2VwdFwiXSA9IG1pbWVUeXBlICsgXCIsKi8qXCI7XG4gICAgICBpZiAocmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKSBmb3IgKHZhciBuYW1lIGluIGhlYWRlcnMpIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihuYW1lLCBoZWFkZXJzW25hbWVdKTtcbiAgICAgIGlmIChtaW1lVHlwZSAhPSBudWxsICYmIHJlcXVlc3Qub3ZlcnJpZGVNaW1lVHlwZSkgcmVxdWVzdC5vdmVycmlkZU1pbWVUeXBlKG1pbWVUeXBlKTtcbiAgICAgIGlmIChyZXNwb25zZVR5cGUgIT0gbnVsbCkgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGU7XG4gICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCkgeGhyLm9uKFwiZXJyb3JcIiwgY2FsbGJhY2spLm9uKFwibG9hZFwiLCBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHJlcXVlc3QpO1xuICAgICAgfSk7XG4gICAgICByZXF1ZXN0LnNlbmQoZGF0YSA9PSBudWxsID8gbnVsbCA6IGRhdGEpO1xuICAgICAgcmV0dXJuIHhocjtcbiAgICB9O1xuICAgIHhoci5hYm9ydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgcmV0dXJuIHhocjtcbiAgICB9O1xuICAgIGQzLnJlYmluZCh4aHIsIGRpc3BhdGNoLCBcIm9uXCIpO1xuICAgIHJldHVybiBjYWxsYmFjayA9PSBudWxsID8geGhyIDogeGhyLmdldChkM194aHJfZml4Q2FsbGJhY2soY2FsbGJhY2spKTtcbiAgfVxuICBmdW5jdGlvbiBkM194aHJfZml4Q2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICByZXR1cm4gY2FsbGJhY2subGVuZ3RoID09PSAxID8gZnVuY3Rpb24oZXJyb3IsIHJlcXVlc3QpIHtcbiAgICAgIGNhbGxiYWNrKGVycm9yID09IG51bGwgPyByZXF1ZXN0IDogbnVsbCk7XG4gICAgfSA6IGNhbGxiYWNrO1xuICB9XG4gIGQzLmRzdiA9IGZ1bmN0aW9uKGRlbGltaXRlciwgbWltZVR5cGUpIHtcbiAgICB2YXIgcmVGb3JtYXQgPSBuZXcgUmVnRXhwKCdbXCInICsgZGVsaW1pdGVyICsgXCJcXG5dXCIpLCBkZWxpbWl0ZXJDb2RlID0gZGVsaW1pdGVyLmNoYXJDb2RlQXQoMCk7XG4gICAgZnVuY3Rpb24gZHN2KHVybCwgcm93LCBjYWxsYmFjaykge1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSBjYWxsYmFjayA9IHJvdywgcm93ID0gbnVsbDtcbiAgICAgIHZhciB4aHIgPSBkMy54aHIodXJsLCBtaW1lVHlwZSwgY2FsbGJhY2spO1xuICAgICAgeGhyLnJvdyA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyB4aHIucmVzcG9uc2UoKHJvdyA9IF8pID09IG51bGwgPyByZXNwb25zZSA6IHR5cGVkUmVzcG9uc2UoXykpIDogcm93O1xuICAgICAgfTtcbiAgICAgIHJldHVybiB4aHIucm93KHJvdyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlc3BvbnNlKHJlcXVlc3QpIHtcbiAgICAgIHJldHVybiBkc3YucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0eXBlZFJlc3BvbnNlKGYpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiBkc3YucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQsIGYpO1xuICAgICAgfTtcbiAgICB9XG4gICAgZHN2LnBhcnNlID0gZnVuY3Rpb24odGV4dCwgZikge1xuICAgICAgdmFyIG87XG4gICAgICByZXR1cm4gZHN2LnBhcnNlUm93cyh0ZXh0LCBmdW5jdGlvbihyb3csIGkpIHtcbiAgICAgICAgaWYgKG8pIHJldHVybiBvKHJvdywgaSAtIDEpO1xuICAgICAgICB2YXIgYSA9IG5ldyBGdW5jdGlvbihcImRcIiwgXCJyZXR1cm4ge1wiICsgcm93Lm1hcChmdW5jdGlvbihuYW1lLCBpKSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG5hbWUpICsgXCI6IGRbXCIgKyBpICsgXCJdXCI7XG4gICAgICAgIH0pLmpvaW4oXCIsXCIpICsgXCJ9XCIpO1xuICAgICAgICBvID0gZiA/IGZ1bmN0aW9uKHJvdywgaSkge1xuICAgICAgICAgIHJldHVybiBmKGEocm93KSwgaSk7XG4gICAgICAgIH0gOiBhO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICBkc3YucGFyc2VSb3dzID0gZnVuY3Rpb24odGV4dCwgZikge1xuICAgICAgdmFyIEVPTCA9IHt9LCBFT0YgPSB7fSwgcm93cyA9IFtdLCBOID0gdGV4dC5sZW5ndGgsIEkgPSAwLCBuID0gMCwgdCwgZW9sO1xuICAgICAgZnVuY3Rpb24gdG9rZW4oKSB7XG4gICAgICAgIGlmIChJID49IE4pIHJldHVybiBFT0Y7XG4gICAgICAgIGlmIChlb2wpIHJldHVybiBlb2wgPSBmYWxzZSwgRU9MO1xuICAgICAgICB2YXIgaiA9IEk7XG4gICAgICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQoaikgPT09IDM0KSB7XG4gICAgICAgICAgdmFyIGkgPSBqO1xuICAgICAgICAgIHdoaWxlIChpKysgPCBOKSB7XG4gICAgICAgICAgICBpZiAodGV4dC5jaGFyQ29kZUF0KGkpID09PSAzNCkge1xuICAgICAgICAgICAgICBpZiAodGV4dC5jaGFyQ29kZUF0KGkgKyAxKSAhPT0gMzQpIGJyZWFrO1xuICAgICAgICAgICAgICArK2k7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIEkgPSBpICsgMjtcbiAgICAgICAgICB2YXIgYyA9IHRleHQuY2hhckNvZGVBdChpICsgMSk7XG4gICAgICAgICAgaWYgKGMgPT09IDEzKSB7XG4gICAgICAgICAgICBlb2wgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRleHQuY2hhckNvZGVBdChpICsgMikgPT09IDEwKSArK0k7XG4gICAgICAgICAgfSBlbHNlIGlmIChjID09PSAxMCkge1xuICAgICAgICAgICAgZW9sID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRleHQuc3Vic3RyaW5nKGogKyAxLCBpKS5yZXBsYWNlKC9cIlwiL2csICdcIicpO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChJIDwgTikge1xuICAgICAgICAgIHZhciBjID0gdGV4dC5jaGFyQ29kZUF0KEkrKyksIGsgPSAxO1xuICAgICAgICAgIGlmIChjID09PSAxMCkgZW9sID0gdHJ1ZTsgZWxzZSBpZiAoYyA9PT0gMTMpIHtcbiAgICAgICAgICAgIGVvbCA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGV4dC5jaGFyQ29kZUF0KEkpID09PSAxMCkgKytJLCArK2s7XG4gICAgICAgICAgfSBlbHNlIGlmIChjICE9PSBkZWxpbWl0ZXJDb2RlKSBjb250aW51ZTtcbiAgICAgICAgICByZXR1cm4gdGV4dC5zdWJzdHJpbmcoaiwgSSAtIGspO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZXh0LnN1YnN0cmluZyhqKTtcbiAgICAgIH1cbiAgICAgIHdoaWxlICgodCA9IHRva2VuKCkpICE9PSBFT0YpIHtcbiAgICAgICAgdmFyIGEgPSBbXTtcbiAgICAgICAgd2hpbGUgKHQgIT09IEVPTCAmJiB0ICE9PSBFT0YpIHtcbiAgICAgICAgICBhLnB1c2godCk7XG4gICAgICAgICAgdCA9IHRva2VuKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGYgJiYgIShhID0gZihhLCBuKyspKSkgY29udGludWU7XG4gICAgICAgIHJvd3MucHVzaChhKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByb3dzO1xuICAgIH07XG4gICAgZHN2LmZvcm1hdCA9IGZ1bmN0aW9uKHJvd3MpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHJvd3NbMF0pKSByZXR1cm4gZHN2LmZvcm1hdFJvd3Mocm93cyk7XG4gICAgICB2YXIgZmllbGRTZXQgPSBuZXcgZDNfU2V0KCksIGZpZWxkcyA9IFtdO1xuICAgICAgcm93cy5mb3JFYWNoKGZ1bmN0aW9uKHJvdykge1xuICAgICAgICBmb3IgKHZhciBmaWVsZCBpbiByb3cpIHtcbiAgICAgICAgICBpZiAoIWZpZWxkU2V0LmhhcyhmaWVsZCkpIHtcbiAgICAgICAgICAgIGZpZWxkcy5wdXNoKGZpZWxkU2V0LmFkZChmaWVsZCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gWyBmaWVsZHMubWFwKGZvcm1hdFZhbHVlKS5qb2luKGRlbGltaXRlcikgXS5jb25jYXQocm93cy5tYXAoZnVuY3Rpb24ocm93KSB7XG4gICAgICAgIHJldHVybiBmaWVsZHMubWFwKGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgICAgcmV0dXJuIGZvcm1hdFZhbHVlKHJvd1tmaWVsZF0pO1xuICAgICAgICB9KS5qb2luKGRlbGltaXRlcik7XG4gICAgICB9KSkuam9pbihcIlxcblwiKTtcbiAgICB9O1xuICAgIGRzdi5mb3JtYXRSb3dzID0gZnVuY3Rpb24ocm93cykge1xuICAgICAgcmV0dXJuIHJvd3MubWFwKGZvcm1hdFJvdykuam9pbihcIlxcblwiKTtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGZvcm1hdFJvdyhyb3cpIHtcbiAgICAgIHJldHVybiByb3cubWFwKGZvcm1hdFZhbHVlKS5qb2luKGRlbGltaXRlcik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZvcm1hdFZhbHVlKHRleHQpIHtcbiAgICAgIHJldHVybiByZUZvcm1hdC50ZXN0KHRleHQpID8gJ1wiJyArIHRleHQucmVwbGFjZSgvXFxcIi9nLCAnXCJcIicpICsgJ1wiJyA6IHRleHQ7XG4gICAgfVxuICAgIHJldHVybiBkc3Y7XG4gIH07XG4gIGQzLmNzdiA9IGQzLmRzdihcIixcIiwgXCJ0ZXh0L2NzdlwiKTtcbiAgZDMudHN2ID0gZDMuZHN2KFwiXHRcIiwgXCJ0ZXh0L3RhYi1zZXBhcmF0ZWQtdmFsdWVzXCIpO1xuICB2YXIgZDNfdGltZXJfcXVldWVIZWFkLCBkM190aW1lcl9xdWV1ZVRhaWwsIGQzX3RpbWVyX2ludGVydmFsLCBkM190aW1lcl90aW1lb3V0LCBkM190aW1lcl9hY3RpdmUsIGQzX3RpbWVyX2ZyYW1lID0gZDNfd2luZG93W2QzX3ZlbmRvclN5bWJvbChkM193aW5kb3csIFwicmVxdWVzdEFuaW1hdGlvbkZyYW1lXCIpXSB8fCBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIHNldFRpbWVvdXQoY2FsbGJhY2ssIDE3KTtcbiAgfTtcbiAgZDMudGltZXIgPSBmdW5jdGlvbihjYWxsYmFjaywgZGVsYXksIHRoZW4pIHtcbiAgICB2YXIgbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYgKG4gPCAyKSBkZWxheSA9IDA7XG4gICAgaWYgKG4gPCAzKSB0aGVuID0gRGF0ZS5ub3coKTtcbiAgICB2YXIgdGltZSA9IHRoZW4gKyBkZWxheSwgdGltZXIgPSB7XG4gICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICB0aW1lOiB0aW1lLFxuICAgICAgbmV4dDogbnVsbFxuICAgIH07XG4gICAgaWYgKGQzX3RpbWVyX3F1ZXVlVGFpbCkgZDNfdGltZXJfcXVldWVUYWlsLm5leHQgPSB0aW1lcjsgZWxzZSBkM190aW1lcl9xdWV1ZUhlYWQgPSB0aW1lcjtcbiAgICBkM190aW1lcl9xdWV1ZVRhaWwgPSB0aW1lcjtcbiAgICBpZiAoIWQzX3RpbWVyX2ludGVydmFsKSB7XG4gICAgICBkM190aW1lcl90aW1lb3V0ID0gY2xlYXJUaW1lb3V0KGQzX3RpbWVyX3RpbWVvdXQpO1xuICAgICAgZDNfdGltZXJfaW50ZXJ2YWwgPSAxO1xuICAgICAgZDNfdGltZXJfZnJhbWUoZDNfdGltZXJfc3RlcCk7XG4gICAgfVxuICB9O1xuICBmdW5jdGlvbiBkM190aW1lcl9zdGVwKCkge1xuICAgIHZhciBub3cgPSBkM190aW1lcl9tYXJrKCksIGRlbGF5ID0gZDNfdGltZXJfc3dlZXAoKSAtIG5vdztcbiAgICBpZiAoZGVsYXkgPiAyNCkge1xuICAgICAgaWYgKGlzRmluaXRlKGRlbGF5KSkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZDNfdGltZXJfdGltZW91dCk7XG4gICAgICAgIGQzX3RpbWVyX3RpbWVvdXQgPSBzZXRUaW1lb3V0KGQzX3RpbWVyX3N0ZXAsIGRlbGF5KTtcbiAgICAgIH1cbiAgICAgIGQzX3RpbWVyX2ludGVydmFsID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgZDNfdGltZXJfaW50ZXJ2YWwgPSAxO1xuICAgICAgZDNfdGltZXJfZnJhbWUoZDNfdGltZXJfc3RlcCk7XG4gICAgfVxuICB9XG4gIGQzLnRpbWVyLmZsdXNoID0gZnVuY3Rpb24oKSB7XG4gICAgZDNfdGltZXJfbWFyaygpO1xuICAgIGQzX3RpbWVyX3N3ZWVwKCk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3RpbWVyX3JlcGxhY2UoY2FsbGJhY2ssIGRlbGF5LCB0aGVuKSB7XG4gICAgdmFyIG4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGlmIChuIDwgMikgZGVsYXkgPSAwO1xuICAgIGlmIChuIDwgMykgdGhlbiA9IERhdGUubm93KCk7XG4gICAgZDNfdGltZXJfYWN0aXZlLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgZDNfdGltZXJfYWN0aXZlLnRpbWUgPSB0aGVuICsgZGVsYXk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZXJfbWFyaygpIHtcbiAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBkM190aW1lcl9hY3RpdmUgPSBkM190aW1lcl9xdWV1ZUhlYWQ7XG4gICAgd2hpbGUgKGQzX3RpbWVyX2FjdGl2ZSkge1xuICAgICAgaWYgKG5vdyA+PSBkM190aW1lcl9hY3RpdmUudGltZSkgZDNfdGltZXJfYWN0aXZlLmZsdXNoID0gZDNfdGltZXJfYWN0aXZlLmNhbGxiYWNrKG5vdyAtIGQzX3RpbWVyX2FjdGl2ZS50aW1lKTtcbiAgICAgIGQzX3RpbWVyX2FjdGl2ZSA9IGQzX3RpbWVyX2FjdGl2ZS5uZXh0O1xuICAgIH1cbiAgICByZXR1cm4gbm93O1xuICB9XG4gIGZ1bmN0aW9uIGQzX3RpbWVyX3N3ZWVwKCkge1xuICAgIHZhciB0MCwgdDEgPSBkM190aW1lcl9xdWV1ZUhlYWQsIHRpbWUgPSBJbmZpbml0eTtcbiAgICB3aGlsZSAodDEpIHtcbiAgICAgIGlmICh0MS5mbHVzaCkge1xuICAgICAgICB0MSA9IHQwID8gdDAubmV4dCA9IHQxLm5leHQgOiBkM190aW1lcl9xdWV1ZUhlYWQgPSB0MS5uZXh0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHQxLnRpbWUgPCB0aW1lKSB0aW1lID0gdDEudGltZTtcbiAgICAgICAgdDEgPSAodDAgPSB0MSkubmV4dDtcbiAgICAgIH1cbiAgICB9XG4gICAgZDNfdGltZXJfcXVldWVUYWlsID0gdDA7XG4gICAgcmV0dXJuIHRpbWU7XG4gIH1cbiAgdmFyIGQzX2Zvcm1hdF9kZWNpbWFsUG9pbnQgPSBcIi5cIiwgZDNfZm9ybWF0X3Rob3VzYW5kc1NlcGFyYXRvciA9IFwiLFwiLCBkM19mb3JtYXRfZ3JvdXBpbmcgPSBbIDMsIDMgXSwgZDNfZm9ybWF0X2N1cnJlbmN5U3ltYm9sID0gXCIkXCI7XG4gIHZhciBkM19mb3JtYXRQcmVmaXhlcyA9IFsgXCJ5XCIsIFwielwiLCBcImFcIiwgXCJmXCIsIFwicFwiLCBcIm5cIiwgXCLCtVwiLCBcIm1cIiwgXCJcIiwgXCJrXCIsIFwiTVwiLCBcIkdcIiwgXCJUXCIsIFwiUFwiLCBcIkVcIiwgXCJaXCIsIFwiWVwiIF0ubWFwKGQzX2Zvcm1hdFByZWZpeCk7XG4gIGQzLmZvcm1hdFByZWZpeCA9IGZ1bmN0aW9uKHZhbHVlLCBwcmVjaXNpb24pIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUgPCAwKSB2YWx1ZSAqPSAtMTtcbiAgICAgIGlmIChwcmVjaXNpb24pIHZhbHVlID0gZDMucm91bmQodmFsdWUsIGQzX2Zvcm1hdF9wcmVjaXNpb24odmFsdWUsIHByZWNpc2lvbikpO1xuICAgICAgaSA9IDEgKyBNYXRoLmZsb29yKDFlLTEyICsgTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjEwKTtcbiAgICAgIGkgPSBNYXRoLm1heCgtMjQsIE1hdGgubWluKDI0LCBNYXRoLmZsb29yKChpIDw9IDAgPyBpICsgMSA6IGkgLSAxKSAvIDMpICogMykpO1xuICAgIH1cbiAgICByZXR1cm4gZDNfZm9ybWF0UHJlZml4ZXNbOCArIGkgLyAzXTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfZm9ybWF0UHJlZml4KGQsIGkpIHtcbiAgICB2YXIgayA9IE1hdGgucG93KDEwLCBNYXRoLmFicyg4IC0gaSkgKiAzKTtcbiAgICByZXR1cm4ge1xuICAgICAgc2NhbGU6IGkgPiA4ID8gZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZCAvIGs7XG4gICAgICB9IDogZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZCAqIGs7XG4gICAgICB9LFxuICAgICAgc3ltYm9sOiBkXG4gICAgfTtcbiAgfVxuICBkMy5yb3VuZCA9IGZ1bmN0aW9uKHgsIG4pIHtcbiAgICByZXR1cm4gbiA/IE1hdGgucm91bmQoeCAqIChuID0gTWF0aC5wb3coMTAsIG4pKSkgLyBuIDogTWF0aC5yb3VuZCh4KTtcbiAgfTtcbiAgZDMuZm9ybWF0ID0gZnVuY3Rpb24oc3BlY2lmaWVyKSB7XG4gICAgdmFyIG1hdGNoID0gZDNfZm9ybWF0X3JlLmV4ZWMoc3BlY2lmaWVyKSwgZmlsbCA9IG1hdGNoWzFdIHx8IFwiIFwiLCBhbGlnbiA9IG1hdGNoWzJdIHx8IFwiPlwiLCBzaWduID0gbWF0Y2hbM10gfHwgXCJcIiwgc3ltYm9sID0gbWF0Y2hbNF0gfHwgXCJcIiwgemZpbGwgPSBtYXRjaFs1XSwgd2lkdGggPSArbWF0Y2hbNl0sIGNvbW1hID0gbWF0Y2hbN10sIHByZWNpc2lvbiA9IG1hdGNoWzhdLCB0eXBlID0gbWF0Y2hbOV0sIHNjYWxlID0gMSwgc3VmZml4ID0gXCJcIiwgaW50ZWdlciA9IGZhbHNlO1xuICAgIGlmIChwcmVjaXNpb24pIHByZWNpc2lvbiA9ICtwcmVjaXNpb24uc3Vic3RyaW5nKDEpO1xuICAgIGlmICh6ZmlsbCB8fCBmaWxsID09PSBcIjBcIiAmJiBhbGlnbiA9PT0gXCI9XCIpIHtcbiAgICAgIHpmaWxsID0gZmlsbCA9IFwiMFwiO1xuICAgICAgYWxpZ24gPSBcIj1cIjtcbiAgICAgIGlmIChjb21tYSkgd2lkdGggLT0gTWF0aC5mbG9vcigod2lkdGggLSAxKSAvIDQpO1xuICAgIH1cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgY2FzZSBcIm5cIjpcbiAgICAgIGNvbW1hID0gdHJ1ZTtcbiAgICAgIHR5cGUgPSBcImdcIjtcbiAgICAgIGJyZWFrO1xuXG4gICAgIGNhc2UgXCIlXCI6XG4gICAgICBzY2FsZSA9IDEwMDtcbiAgICAgIHN1ZmZpeCA9IFwiJVwiO1xuICAgICAgdHlwZSA9IFwiZlwiO1xuICAgICAgYnJlYWs7XG5cbiAgICAgY2FzZSBcInBcIjpcbiAgICAgIHNjYWxlID0gMTAwO1xuICAgICAgc3VmZml4ID0gXCIlXCI7XG4gICAgICB0eXBlID0gXCJyXCI7XG4gICAgICBicmVhaztcblxuICAgICBjYXNlIFwiYlwiOlxuICAgICBjYXNlIFwib1wiOlxuICAgICBjYXNlIFwieFwiOlxuICAgICBjYXNlIFwiWFwiOlxuICAgICAgaWYgKHN5bWJvbCA9PT0gXCIjXCIpIHN5bWJvbCA9IFwiMFwiICsgdHlwZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgIGNhc2UgXCJjXCI6XG4gICAgIGNhc2UgXCJkXCI6XG4gICAgICBpbnRlZ2VyID0gdHJ1ZTtcbiAgICAgIHByZWNpc2lvbiA9IDA7XG4gICAgICBicmVhaztcblxuICAgICBjYXNlIFwic1wiOlxuICAgICAgc2NhbGUgPSAtMTtcbiAgICAgIHR5cGUgPSBcInJcIjtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoc3ltYm9sID09PSBcIiNcIikgc3ltYm9sID0gXCJcIjsgZWxzZSBpZiAoc3ltYm9sID09PSBcIiRcIikgc3ltYm9sID0gZDNfZm9ybWF0X2N1cnJlbmN5U3ltYm9sO1xuICAgIGlmICh0eXBlID09IFwiclwiICYmICFwcmVjaXNpb24pIHR5cGUgPSBcImdcIjtcbiAgICBpZiAocHJlY2lzaW9uICE9IG51bGwpIHtcbiAgICAgIGlmICh0eXBlID09IFwiZ1wiKSBwcmVjaXNpb24gPSBNYXRoLm1heCgxLCBNYXRoLm1pbigyMSwgcHJlY2lzaW9uKSk7IGVsc2UgaWYgKHR5cGUgPT0gXCJlXCIgfHwgdHlwZSA9PSBcImZcIikgcHJlY2lzaW9uID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjAsIHByZWNpc2lvbikpO1xuICAgIH1cbiAgICB0eXBlID0gZDNfZm9ybWF0X3R5cGVzLmdldCh0eXBlKSB8fCBkM19mb3JtYXRfdHlwZURlZmF1bHQ7XG4gICAgdmFyIHpjb21tYSA9IHpmaWxsICYmIGNvbW1hO1xuICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgaWYgKGludGVnZXIgJiYgdmFsdWUgJSAxKSByZXR1cm4gXCJcIjtcbiAgICAgIHZhciBuZWdhdGl2ZSA9IHZhbHVlIDwgMCB8fCB2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwID8gKHZhbHVlID0gLXZhbHVlLCBcIi1cIikgOiBzaWduO1xuICAgICAgaWYgKHNjYWxlIDwgMCkge1xuICAgICAgICB2YXIgcHJlZml4ID0gZDMuZm9ybWF0UHJlZml4KHZhbHVlLCBwcmVjaXNpb24pO1xuICAgICAgICB2YWx1ZSA9IHByZWZpeC5zY2FsZSh2YWx1ZSk7XG4gICAgICAgIHN1ZmZpeCA9IHByZWZpeC5zeW1ib2w7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSAqPSBzY2FsZTtcbiAgICAgIH1cbiAgICAgIHZhbHVlID0gdHlwZSh2YWx1ZSwgcHJlY2lzaW9uKTtcbiAgICAgIHZhciBpID0gdmFsdWUubGFzdEluZGV4T2YoXCIuXCIpLCBiZWZvcmUgPSBpIDwgMCA/IHZhbHVlIDogdmFsdWUuc3Vic3RyaW5nKDAsIGkpLCBhZnRlciA9IGkgPCAwID8gXCJcIiA6IGQzX2Zvcm1hdF9kZWNpbWFsUG9pbnQgKyB2YWx1ZS5zdWJzdHJpbmcoaSArIDEpO1xuICAgICAgaWYgKCF6ZmlsbCAmJiBjb21tYSkgYmVmb3JlID0gZDNfZm9ybWF0X2dyb3VwKGJlZm9yZSk7XG4gICAgICB2YXIgbGVuZ3RoID0gc3ltYm9sLmxlbmd0aCArIGJlZm9yZS5sZW5ndGggKyBhZnRlci5sZW5ndGggKyAoemNvbW1hID8gMCA6IG5lZ2F0aXZlLmxlbmd0aCksIHBhZGRpbmcgPSBsZW5ndGggPCB3aWR0aCA/IG5ldyBBcnJheShsZW5ndGggPSB3aWR0aCAtIGxlbmd0aCArIDEpLmpvaW4oZmlsbCkgOiBcIlwiO1xuICAgICAgaWYgKHpjb21tYSkgYmVmb3JlID0gZDNfZm9ybWF0X2dyb3VwKHBhZGRpbmcgKyBiZWZvcmUpO1xuICAgICAgbmVnYXRpdmUgKz0gc3ltYm9sO1xuICAgICAgdmFsdWUgPSBiZWZvcmUgKyBhZnRlcjtcbiAgICAgIHJldHVybiAoYWxpZ24gPT09IFwiPFwiID8gbmVnYXRpdmUgKyB2YWx1ZSArIHBhZGRpbmcgOiBhbGlnbiA9PT0gXCI+XCIgPyBwYWRkaW5nICsgbmVnYXRpdmUgKyB2YWx1ZSA6IGFsaWduID09PSBcIl5cIiA/IHBhZGRpbmcuc3Vic3RyaW5nKDAsIGxlbmd0aCA+Pj0gMSkgKyBuZWdhdGl2ZSArIHZhbHVlICsgcGFkZGluZy5zdWJzdHJpbmcobGVuZ3RoKSA6IG5lZ2F0aXZlICsgKHpjb21tYSA/IHZhbHVlIDogcGFkZGluZyArIHZhbHVlKSkgKyBzdWZmaXg7XG4gICAgfTtcbiAgfTtcbiAgdmFyIGQzX2Zvcm1hdF9yZSA9IC8oPzooW157XSk/KFs8Pj1eXSkpPyhbK1xcLSBdKT8oWyQjXSk/KDApPyhcXGQrKT8oLCk/KFxcLi0/XFxkKyk/KFthLXolXSk/L2k7XG4gIHZhciBkM19mb3JtYXRfdHlwZXMgPSBkMy5tYXAoe1xuICAgIGI6IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB4LnRvU3RyaW5nKDIpO1xuICAgIH0sXG4gICAgYzogZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoeCk7XG4gICAgfSxcbiAgICBvOiBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4geC50b1N0cmluZyg4KTtcbiAgICB9LFxuICAgIHg6IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB4LnRvU3RyaW5nKDE2KTtcbiAgICB9LFxuICAgIFg6IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB4LnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuICAgIH0sXG4gICAgZzogZnVuY3Rpb24oeCwgcCkge1xuICAgICAgcmV0dXJuIHgudG9QcmVjaXNpb24ocCk7XG4gICAgfSxcbiAgICBlOiBmdW5jdGlvbih4LCBwKSB7XG4gICAgICByZXR1cm4geC50b0V4cG9uZW50aWFsKHApO1xuICAgIH0sXG4gICAgZjogZnVuY3Rpb24oeCwgcCkge1xuICAgICAgcmV0dXJuIHgudG9GaXhlZChwKTtcbiAgICB9LFxuICAgIHI6IGZ1bmN0aW9uKHgsIHApIHtcbiAgICAgIHJldHVybiAoeCA9IGQzLnJvdW5kKHgsIGQzX2Zvcm1hdF9wcmVjaXNpb24oeCwgcCkpKS50b0ZpeGVkKE1hdGgubWF4KDAsIE1hdGgubWluKDIwLCBkM19mb3JtYXRfcHJlY2lzaW9uKHggKiAoMSArIDFlLTE1KSwgcCkpKSk7XG4gICAgfVxuICB9KTtcbiAgZnVuY3Rpb24gZDNfZm9ybWF0X3ByZWNpc2lvbih4LCBwKSB7XG4gICAgcmV0dXJuIHAgLSAoeCA/IE1hdGguY2VpbChNYXRoLmxvZyh4KSAvIE1hdGguTE4xMCkgOiAxKTtcbiAgfVxuICBmdW5jdGlvbiBkM19mb3JtYXRfdHlwZURlZmF1bHQoeCkge1xuICAgIHJldHVybiB4ICsgXCJcIjtcbiAgfVxuICB2YXIgZDNfZm9ybWF0X2dyb3VwID0gZDNfaWRlbnRpdHk7XG4gIGlmIChkM19mb3JtYXRfZ3JvdXBpbmcpIHtcbiAgICB2YXIgZDNfZm9ybWF0X2dyb3VwaW5nTGVuZ3RoID0gZDNfZm9ybWF0X2dyb3VwaW5nLmxlbmd0aDtcbiAgICBkM19mb3JtYXRfZ3JvdXAgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIGkgPSB2YWx1ZS5sZW5ndGgsIHQgPSBbXSwgaiA9IDAsIGcgPSBkM19mb3JtYXRfZ3JvdXBpbmdbMF07XG4gICAgICB3aGlsZSAoaSA+IDAgJiYgZyA+IDApIHtcbiAgICAgICAgdC5wdXNoKHZhbHVlLnN1YnN0cmluZyhpIC09IGcsIGkgKyBnKSk7XG4gICAgICAgIGcgPSBkM19mb3JtYXRfZ3JvdXBpbmdbaiA9IChqICsgMSkgJSBkM19mb3JtYXRfZ3JvdXBpbmdMZW5ndGhdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHQucmV2ZXJzZSgpLmpvaW4oZDNfZm9ybWF0X3Rob3VzYW5kc1NlcGFyYXRvcik7XG4gICAgfTtcbiAgfVxuICBkMy5nZW8gPSB7fTtcbiAgZnVuY3Rpb24gZDNfYWRkZXIoKSB7fVxuICBkM19hZGRlci5wcm90b3R5cGUgPSB7XG4gICAgczogMCxcbiAgICB0OiAwLFxuICAgIGFkZDogZnVuY3Rpb24oeSkge1xuICAgICAgZDNfYWRkZXJTdW0oeSwgdGhpcy50LCBkM19hZGRlclRlbXApO1xuICAgICAgZDNfYWRkZXJTdW0oZDNfYWRkZXJUZW1wLnMsIHRoaXMucywgdGhpcyk7XG4gICAgICBpZiAodGhpcy5zKSB0aGlzLnQgKz0gZDNfYWRkZXJUZW1wLnQ7IGVsc2UgdGhpcy5zID0gZDNfYWRkZXJUZW1wLnQ7XG4gICAgfSxcbiAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnMgPSB0aGlzLnQgPSAwO1xuICAgIH0sXG4gICAgdmFsdWVPZjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5zO1xuICAgIH1cbiAgfTtcbiAgdmFyIGQzX2FkZGVyVGVtcCA9IG5ldyBkM19hZGRlcigpO1xuICBmdW5jdGlvbiBkM19hZGRlclN1bShhLCBiLCBvKSB7XG4gICAgdmFyIHggPSBvLnMgPSBhICsgYiwgYnYgPSB4IC0gYSwgYXYgPSB4IC0gYnY7XG4gICAgby50ID0gYSAtIGF2ICsgKGIgLSBidik7XG4gIH1cbiAgZDMuZ2VvLnN0cmVhbSA9IGZ1bmN0aW9uKG9iamVjdCwgbGlzdGVuZXIpIHtcbiAgICBpZiAob2JqZWN0ICYmIGQzX2dlb19zdHJlYW1PYmplY3RUeXBlLmhhc093blByb3BlcnR5KG9iamVjdC50eXBlKSkge1xuICAgICAgZDNfZ2VvX3N0cmVhbU9iamVjdFR5cGVbb2JqZWN0LnR5cGVdKG9iamVjdCwgbGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkM19nZW9fc3RyZWFtR2VvbWV0cnkob2JqZWN0LCBsaXN0ZW5lcik7XG4gICAgfVxuICB9O1xuICBmdW5jdGlvbiBkM19nZW9fc3RyZWFtR2VvbWV0cnkoZ2VvbWV0cnksIGxpc3RlbmVyKSB7XG4gICAgaWYgKGdlb21ldHJ5ICYmIGQzX2dlb19zdHJlYW1HZW9tZXRyeVR5cGUuaGFzT3duUHJvcGVydHkoZ2VvbWV0cnkudHlwZSkpIHtcbiAgICAgIGQzX2dlb19zdHJlYW1HZW9tZXRyeVR5cGVbZ2VvbWV0cnkudHlwZV0oZ2VvbWV0cnksIGxpc3RlbmVyKTtcbiAgICB9XG4gIH1cbiAgdmFyIGQzX2dlb19zdHJlYW1PYmplY3RUeXBlID0ge1xuICAgIEZlYXR1cmU6IGZ1bmN0aW9uKGZlYXR1cmUsIGxpc3RlbmVyKSB7XG4gICAgICBkM19nZW9fc3RyZWFtR2VvbWV0cnkoZmVhdHVyZS5nZW9tZXRyeSwgbGlzdGVuZXIpO1xuICAgIH0sXG4gICAgRmVhdHVyZUNvbGxlY3Rpb246IGZ1bmN0aW9uKG9iamVjdCwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBmZWF0dXJlcyA9IG9iamVjdC5mZWF0dXJlcywgaSA9IC0xLCBuID0gZmVhdHVyZXMubGVuZ3RoO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIGQzX2dlb19zdHJlYW1HZW9tZXRyeShmZWF0dXJlc1tpXS5nZW9tZXRyeSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgfTtcbiAgdmFyIGQzX2dlb19zdHJlYW1HZW9tZXRyeVR5cGUgPSB7XG4gICAgU3BoZXJlOiBmdW5jdGlvbihvYmplY3QsIGxpc3RlbmVyKSB7XG4gICAgICBsaXN0ZW5lci5zcGhlcmUoKTtcbiAgICB9LFxuICAgIFBvaW50OiBmdW5jdGlvbihvYmplY3QsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgY29vcmRpbmF0ZSA9IG9iamVjdC5jb29yZGluYXRlcztcbiAgICAgIGxpc3RlbmVyLnBvaW50KGNvb3JkaW5hdGVbMF0sIGNvb3JkaW5hdGVbMV0pO1xuICAgIH0sXG4gICAgTXVsdGlQb2ludDogZnVuY3Rpb24ob2JqZWN0LCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGNvb3JkaW5hdGVzID0gb2JqZWN0LmNvb3JkaW5hdGVzLCBpID0gLTEsIG4gPSBjb29yZGluYXRlcy5sZW5ndGgsIGNvb3JkaW5hdGU7XG4gICAgICB3aGlsZSAoKytpIDwgbikgY29vcmRpbmF0ZSA9IGNvb3JkaW5hdGVzW2ldLCBsaXN0ZW5lci5wb2ludChjb29yZGluYXRlWzBdLCBjb29yZGluYXRlWzFdKTtcbiAgICB9LFxuICAgIExpbmVTdHJpbmc6IGZ1bmN0aW9uKG9iamVjdCwgbGlzdGVuZXIpIHtcbiAgICAgIGQzX2dlb19zdHJlYW1MaW5lKG9iamVjdC5jb29yZGluYXRlcywgbGlzdGVuZXIsIDApO1xuICAgIH0sXG4gICAgTXVsdGlMaW5lU3RyaW5nOiBmdW5jdGlvbihvYmplY3QsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgY29vcmRpbmF0ZXMgPSBvYmplY3QuY29vcmRpbmF0ZXMsIGkgPSAtMSwgbiA9IGNvb3JkaW5hdGVzLmxlbmd0aDtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBkM19nZW9fc3RyZWFtTGluZShjb29yZGluYXRlc1tpXSwgbGlzdGVuZXIsIDApO1xuICAgIH0sXG4gICAgUG9seWdvbjogZnVuY3Rpb24ob2JqZWN0LCBsaXN0ZW5lcikge1xuICAgICAgZDNfZ2VvX3N0cmVhbVBvbHlnb24ob2JqZWN0LmNvb3JkaW5hdGVzLCBsaXN0ZW5lcik7XG4gICAgfSxcbiAgICBNdWx0aVBvbHlnb246IGZ1bmN0aW9uKG9iamVjdCwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBjb29yZGluYXRlcyA9IG9iamVjdC5jb29yZGluYXRlcywgaSA9IC0xLCBuID0gY29vcmRpbmF0ZXMubGVuZ3RoO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIGQzX2dlb19zdHJlYW1Qb2x5Z29uKGNvb3JkaW5hdGVzW2ldLCBsaXN0ZW5lcik7XG4gICAgfSxcbiAgICBHZW9tZXRyeUNvbGxlY3Rpb246IGZ1bmN0aW9uKG9iamVjdCwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBnZW9tZXRyaWVzID0gb2JqZWN0Lmdlb21ldHJpZXMsIGkgPSAtMSwgbiA9IGdlb21ldHJpZXMubGVuZ3RoO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIGQzX2dlb19zdHJlYW1HZW9tZXRyeShnZW9tZXRyaWVzW2ldLCBsaXN0ZW5lcik7XG4gICAgfVxuICB9O1xuICBmdW5jdGlvbiBkM19nZW9fc3RyZWFtTGluZShjb29yZGluYXRlcywgbGlzdGVuZXIsIGNsb3NlZCkge1xuICAgIHZhciBpID0gLTEsIG4gPSBjb29yZGluYXRlcy5sZW5ndGggLSBjbG9zZWQsIGNvb3JkaW5hdGU7XG4gICAgbGlzdGVuZXIubGluZVN0YXJ0KCk7XG4gICAgd2hpbGUgKCsraSA8IG4pIGNvb3JkaW5hdGUgPSBjb29yZGluYXRlc1tpXSwgbGlzdGVuZXIucG9pbnQoY29vcmRpbmF0ZVswXSwgY29vcmRpbmF0ZVsxXSk7XG4gICAgbGlzdGVuZXIubGluZUVuZCgpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19zdHJlYW1Qb2x5Z29uKGNvb3JkaW5hdGVzLCBsaXN0ZW5lcikge1xuICAgIHZhciBpID0gLTEsIG4gPSBjb29yZGluYXRlcy5sZW5ndGg7XG4gICAgbGlzdGVuZXIucG9seWdvblN0YXJ0KCk7XG4gICAgd2hpbGUgKCsraSA8IG4pIGQzX2dlb19zdHJlYW1MaW5lKGNvb3JkaW5hdGVzW2ldLCBsaXN0ZW5lciwgMSk7XG4gICAgbGlzdGVuZXIucG9seWdvbkVuZCgpO1xuICB9XG4gIGQzLmdlby5hcmVhID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgZDNfZ2VvX2FyZWFTdW0gPSAwO1xuICAgIGQzLmdlby5zdHJlYW0ob2JqZWN0LCBkM19nZW9fYXJlYSk7XG4gICAgcmV0dXJuIGQzX2dlb19hcmVhU3VtO1xuICB9O1xuICB2YXIgZDNfZ2VvX2FyZWFTdW0sIGQzX2dlb19hcmVhUmluZ1N1bSA9IG5ldyBkM19hZGRlcigpO1xuICB2YXIgZDNfZ2VvX2FyZWEgPSB7XG4gICAgc3BoZXJlOiBmdW5jdGlvbigpIHtcbiAgICAgIGQzX2dlb19hcmVhU3VtICs9IDQgKiDPgDtcbiAgICB9LFxuICAgIHBvaW50OiBkM19ub29wLFxuICAgIGxpbmVTdGFydDogZDNfbm9vcCxcbiAgICBsaW5lRW5kOiBkM19ub29wLFxuICAgIHBvbHlnb25TdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICBkM19nZW9fYXJlYVJpbmdTdW0ucmVzZXQoKTtcbiAgICAgIGQzX2dlb19hcmVhLmxpbmVTdGFydCA9IGQzX2dlb19hcmVhUmluZ1N0YXJ0O1xuICAgIH0sXG4gICAgcG9seWdvbkVuZDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJlYSA9IDIgKiBkM19nZW9fYXJlYVJpbmdTdW07XG4gICAgICBkM19nZW9fYXJlYVN1bSArPSBhcmVhIDwgMCA/IDQgKiDPgCArIGFyZWEgOiBhcmVhO1xuICAgICAgZDNfZ2VvX2FyZWEubGluZVN0YXJ0ID0gZDNfZ2VvX2FyZWEubGluZUVuZCA9IGQzX2dlb19hcmVhLnBvaW50ID0gZDNfbm9vcDtcbiAgICB9XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2dlb19hcmVhUmluZ1N0YXJ0KCkge1xuICAgIHZhciDOuzAwLCDPhjAwLCDOuzAsIGNvc8+GMCwgc2luz4YwO1xuICAgIGQzX2dlb19hcmVhLnBvaW50ID0gZnVuY3Rpb24ozrssIM+GKSB7XG4gICAgICBkM19nZW9fYXJlYS5wb2ludCA9IG5leHRQb2ludDtcbiAgICAgIM67MCA9ICjOuzAwID0gzrspICogZDNfcmFkaWFucywgY29zz4YwID0gTWF0aC5jb3Moz4YgPSAoz4YwMCA9IM+GKSAqIGQzX3JhZGlhbnMgLyAyICsgz4AgLyA0KSwgXG4gICAgICBzaW7PhjAgPSBNYXRoLnNpbijPhik7XG4gICAgfTtcbiAgICBmdW5jdGlvbiBuZXh0UG9pbnQozrssIM+GKSB7XG4gICAgICDOuyAqPSBkM19yYWRpYW5zO1xuICAgICAgz4YgPSDPhiAqIGQzX3JhZGlhbnMgLyAyICsgz4AgLyA0O1xuICAgICAgdmFyIGTOuyA9IM67IC0gzrswLCBjb3PPhiA9IE1hdGguY29zKM+GKSwgc2luz4YgPSBNYXRoLnNpbijPhiksIGsgPSBzaW7PhjAgKiBzaW7PhiwgdSA9IGNvc8+GMCAqIGNvc8+GICsgayAqIE1hdGguY29zKGTOuyksIHYgPSBrICogTWF0aC5zaW4oZM67KTtcbiAgICAgIGQzX2dlb19hcmVhUmluZ1N1bS5hZGQoTWF0aC5hdGFuMih2LCB1KSk7XG4gICAgICDOuzAgPSDOuywgY29zz4YwID0gY29zz4YsIHNpbs+GMCA9IHNpbs+GO1xuICAgIH1cbiAgICBkM19nZW9fYXJlYS5saW5lRW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICBuZXh0UG9pbnQozrswMCwgz4YwMCk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fY2FydGVzaWFuKHNwaGVyaWNhbCkge1xuICAgIHZhciDOuyA9IHNwaGVyaWNhbFswXSwgz4YgPSBzcGhlcmljYWxbMV0sIGNvc8+GID0gTWF0aC5jb3Moz4YpO1xuICAgIHJldHVybiBbIGNvc8+GICogTWF0aC5jb3MozrspLCBjb3PPhiAqIE1hdGguc2luKM67KSwgTWF0aC5zaW4oz4YpIF07XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX2NhcnRlc2lhbkRvdChhLCBiKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV0gKyBhWzJdICogYlsyXTtcbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fY2FydGVzaWFuQ3Jvc3MoYSwgYikge1xuICAgIHJldHVybiBbIGFbMV0gKiBiWzJdIC0gYVsyXSAqIGJbMV0sIGFbMl0gKiBiWzBdIC0gYVswXSAqIGJbMl0sIGFbMF0gKiBiWzFdIC0gYVsxXSAqIGJbMF0gXTtcbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fY2FydGVzaWFuQWRkKGEsIGIpIHtcbiAgICBhWzBdICs9IGJbMF07XG4gICAgYVsxXSArPSBiWzFdO1xuICAgIGFbMl0gKz0gYlsyXTtcbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fY2FydGVzaWFuU2NhbGUodmVjdG9yLCBrKSB7XG4gICAgcmV0dXJuIFsgdmVjdG9yWzBdICogaywgdmVjdG9yWzFdICogaywgdmVjdG9yWzJdICogayBdO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19jYXJ0ZXNpYW5Ob3JtYWxpemUoZCkge1xuICAgIHZhciBsID0gTWF0aC5zcXJ0KGRbMF0gKiBkWzBdICsgZFsxXSAqIGRbMV0gKyBkWzJdICogZFsyXSk7XG4gICAgZFswXSAvPSBsO1xuICAgIGRbMV0gLz0gbDtcbiAgICBkWzJdIC89IGw7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX3NwaGVyaWNhbChjYXJ0ZXNpYW4pIHtcbiAgICByZXR1cm4gWyBNYXRoLmF0YW4yKGNhcnRlc2lhblsxXSwgY2FydGVzaWFuWzBdKSwgZDNfYXNpbihjYXJ0ZXNpYW5bMl0pIF07XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX3NwaGVyaWNhbEVxdWFsKGEsIGIpIHtcbiAgICByZXR1cm4gTWF0aC5hYnMoYVswXSAtIGJbMF0pIDwgzrUgJiYgTWF0aC5hYnMoYVsxXSAtIGJbMV0pIDwgzrU7XG4gIH1cbiAgZDMuZ2VvLmJvdW5kcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciDOuzAsIM+GMCwgzrsxLCDPhjEsIM67XywgzrtfXywgz4ZfXywgcDAsIGTOu1N1bSwgcmFuZ2VzLCByYW5nZTtcbiAgICB2YXIgYm91bmQgPSB7XG4gICAgICBwb2ludDogcG9pbnQsXG4gICAgICBsaW5lU3RhcnQ6IGxpbmVTdGFydCxcbiAgICAgIGxpbmVFbmQ6IGxpbmVFbmQsXG4gICAgICBwb2x5Z29uU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBib3VuZC5wb2ludCA9IHJpbmdQb2ludDtcbiAgICAgICAgYm91bmQubGluZVN0YXJ0ID0gcmluZ1N0YXJ0O1xuICAgICAgICBib3VuZC5saW5lRW5kID0gcmluZ0VuZDtcbiAgICAgICAgZM67U3VtID0gMDtcbiAgICAgICAgZDNfZ2VvX2FyZWEucG9seWdvblN0YXJ0KCk7XG4gICAgICB9LFxuICAgICAgcG9seWdvbkVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGQzX2dlb19hcmVhLnBvbHlnb25FbmQoKTtcbiAgICAgICAgYm91bmQucG9pbnQgPSBwb2ludDtcbiAgICAgICAgYm91bmQubGluZVN0YXJ0ID0gbGluZVN0YXJ0O1xuICAgICAgICBib3VuZC5saW5lRW5kID0gbGluZUVuZDtcbiAgICAgICAgaWYgKGQzX2dlb19hcmVhUmluZ1N1bSA8IDApIM67MCA9IC0ozrsxID0gMTgwKSwgz4YwID0gLSjPhjEgPSA5MCk7IGVsc2UgaWYgKGTOu1N1bSA+IM61KSDPhjEgPSA5MDsgZWxzZSBpZiAoZM67U3VtIDwgLc61KSDPhjAgPSAtOTA7XG4gICAgICAgIHJhbmdlWzBdID0gzrswLCByYW5nZVsxXSA9IM67MTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGZ1bmN0aW9uIHBvaW50KM67LCDPhikge1xuICAgICAgcmFuZ2VzLnB1c2gocmFuZ2UgPSBbIM67MCA9IM67LCDOuzEgPSDOuyBdKTtcbiAgICAgIGlmICjPhiA8IM+GMCkgz4YwID0gz4Y7XG4gICAgICBpZiAoz4YgPiDPhjEpIM+GMSA9IM+GO1xuICAgIH1cbiAgICBmdW5jdGlvbiBsaW5lUG9pbnQozrssIM+GKSB7XG4gICAgICB2YXIgcCA9IGQzX2dlb19jYXJ0ZXNpYW4oWyDOuyAqIGQzX3JhZGlhbnMsIM+GICogZDNfcmFkaWFucyBdKTtcbiAgICAgIGlmIChwMCkge1xuICAgICAgICB2YXIgbm9ybWFsID0gZDNfZ2VvX2NhcnRlc2lhbkNyb3NzKHAwLCBwKSwgZXF1YXRvcmlhbCA9IFsgbm9ybWFsWzFdLCAtbm9ybWFsWzBdLCAwIF0sIGluZmxlY3Rpb24gPSBkM19nZW9fY2FydGVzaWFuQ3Jvc3MoZXF1YXRvcmlhbCwgbm9ybWFsKTtcbiAgICAgICAgZDNfZ2VvX2NhcnRlc2lhbk5vcm1hbGl6ZShpbmZsZWN0aW9uKTtcbiAgICAgICAgaW5mbGVjdGlvbiA9IGQzX2dlb19zcGhlcmljYWwoaW5mbGVjdGlvbik7XG4gICAgICAgIHZhciBkzrsgPSDOuyAtIM67XywgcyA9IGTOuyA+IDAgPyAxIDogLTEsIM67aSA9IGluZmxlY3Rpb25bMF0gKiBkM19kZWdyZWVzICogcywgYW50aW1lcmlkaWFuID0gTWF0aC5hYnMoZM67KSA+IDE4MDtcbiAgICAgICAgaWYgKGFudGltZXJpZGlhbiBeIChzICogzrtfIDwgzrtpICYmIM67aSA8IHMgKiDOuykpIHtcbiAgICAgICAgICB2YXIgz4ZpID0gaW5mbGVjdGlvblsxXSAqIGQzX2RlZ3JlZXM7XG4gICAgICAgICAgaWYgKM+GaSA+IM+GMSkgz4YxID0gz4ZpO1xuICAgICAgICB9IGVsc2UgaWYgKM67aSA9ICjOu2kgKyAzNjApICUgMzYwIC0gMTgwLCBhbnRpbWVyaWRpYW4gXiAocyAqIM67XyA8IM67aSAmJiDOu2kgPCBzICogzrspKSB7XG4gICAgICAgICAgdmFyIM+GaSA9IC1pbmZsZWN0aW9uWzFdICogZDNfZGVncmVlcztcbiAgICAgICAgICBpZiAoz4ZpIDwgz4YwKSDPhjAgPSDPhmk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKM+GIDwgz4YwKSDPhjAgPSDPhjtcbiAgICAgICAgICBpZiAoz4YgPiDPhjEpIM+GMSA9IM+GO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbnRpbWVyaWRpYW4pIHtcbiAgICAgICAgICBpZiAozrsgPCDOu18pIHtcbiAgICAgICAgICAgIGlmIChhbmdsZSjOuzAsIM67KSA+IGFuZ2xlKM67MCwgzrsxKSkgzrsxID0gzrs7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChhbmdsZSjOuywgzrsxKSA+IGFuZ2xlKM67MCwgzrsxKSkgzrswID0gzrs7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICjOuzEgPj0gzrswKSB7XG4gICAgICAgICAgICBpZiAozrsgPCDOuzApIM67MCA9IM67O1xuICAgICAgICAgICAgaWYgKM67ID4gzrsxKSDOuzEgPSDOuztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKM67ID4gzrtfKSB7XG4gICAgICAgICAgICAgIGlmIChhbmdsZSjOuzAsIM67KSA+IGFuZ2xlKM67MCwgzrsxKSkgzrsxID0gzrs7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoYW5nbGUozrssIM67MSkgPiBhbmdsZSjOuzAsIM67MSkpIM67MCA9IM67O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9pbnQozrssIM+GKTtcbiAgICAgIH1cbiAgICAgIHAwID0gcCwgzrtfID0gzrs7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxpbmVTdGFydCgpIHtcbiAgICAgIGJvdW5kLnBvaW50ID0gbGluZVBvaW50O1xuICAgIH1cbiAgICBmdW5jdGlvbiBsaW5lRW5kKCkge1xuICAgICAgcmFuZ2VbMF0gPSDOuzAsIHJhbmdlWzFdID0gzrsxO1xuICAgICAgYm91bmQucG9pbnQgPSBwb2ludDtcbiAgICAgIHAwID0gbnVsbDtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmluZ1BvaW50KM67LCDPhikge1xuICAgICAgaWYgKHAwKSB7XG4gICAgICAgIHZhciBkzrsgPSDOuyAtIM67XztcbiAgICAgICAgZM67U3VtICs9IE1hdGguYWJzKGTOuykgPiAxODAgPyBkzrsgKyAoZM67ID4gMCA/IDM2MCA6IC0zNjApIDogZM67O1xuICAgICAgfSBlbHNlIM67X18gPSDOuywgz4ZfXyA9IM+GO1xuICAgICAgZDNfZ2VvX2FyZWEucG9pbnQozrssIM+GKTtcbiAgICAgIGxpbmVQb2ludCjOuywgz4YpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByaW5nU3RhcnQoKSB7XG4gICAgICBkM19nZW9fYXJlYS5saW5lU3RhcnQoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmluZ0VuZCgpIHtcbiAgICAgIHJpbmdQb2ludCjOu19fLCDPhl9fKTtcbiAgICAgIGQzX2dlb19hcmVhLmxpbmVFbmQoKTtcbiAgICAgIGlmIChNYXRoLmFicyhkzrtTdW0pID4gzrUpIM67MCA9IC0ozrsxID0gMTgwKTtcbiAgICAgIHJhbmdlWzBdID0gzrswLCByYW5nZVsxXSA9IM67MTtcbiAgICAgIHAwID0gbnVsbDtcbiAgICB9XG4gICAgZnVuY3Rpb24gYW5nbGUozrswLCDOuzEpIHtcbiAgICAgIHJldHVybiAozrsxIC09IM67MCkgPCAwID8gzrsxICsgMzYwIDogzrsxO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjb21wYXJlUmFuZ2VzKGEsIGIpIHtcbiAgICAgIHJldHVybiBhWzBdIC0gYlswXTtcbiAgICB9XG4gICAgZnVuY3Rpb24gd2l0aGluUmFuZ2UoeCwgcmFuZ2UpIHtcbiAgICAgIHJldHVybiByYW5nZVswXSA8PSByYW5nZVsxXSA/IHJhbmdlWzBdIDw9IHggJiYgeCA8PSByYW5nZVsxXSA6IHggPCByYW5nZVswXSB8fCByYW5nZVsxXSA8IHg7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbihmZWF0dXJlKSB7XG4gICAgICDPhjEgPSDOuzEgPSAtKM67MCA9IM+GMCA9IEluZmluaXR5KTtcbiAgICAgIHJhbmdlcyA9IFtdO1xuICAgICAgZDMuZ2VvLnN0cmVhbShmZWF0dXJlLCBib3VuZCk7XG4gICAgICB2YXIgbiA9IHJhbmdlcy5sZW5ndGg7XG4gICAgICBpZiAobikge1xuICAgICAgICByYW5nZXMuc29ydChjb21wYXJlUmFuZ2VzKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDEsIGEgPSByYW5nZXNbMF0sIGIsIG1lcmdlZCA9IFsgYSBdOyBpIDwgbjsgKytpKSB7XG4gICAgICAgICAgYiA9IHJhbmdlc1tpXTtcbiAgICAgICAgICBpZiAod2l0aGluUmFuZ2UoYlswXSwgYSkgfHwgd2l0aGluUmFuZ2UoYlsxXSwgYSkpIHtcbiAgICAgICAgICAgIGlmIChhbmdsZShhWzBdLCBiWzFdKSA+IGFuZ2xlKGFbMF0sIGFbMV0pKSBhWzFdID0gYlsxXTtcbiAgICAgICAgICAgIGlmIChhbmdsZShiWzBdLCBhWzFdKSA+IGFuZ2xlKGFbMF0sIGFbMV0pKSBhWzBdID0gYlswXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWVyZ2VkLnB1c2goYSA9IGIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgYmVzdCA9IC1JbmZpbml0eSwgZM67O1xuICAgICAgICBmb3IgKHZhciBuID0gbWVyZ2VkLmxlbmd0aCAtIDEsIGkgPSAwLCBhID0gbWVyZ2VkW25dLCBiOyBpIDw9IG47IGEgPSBiLCArK2kpIHtcbiAgICAgICAgICBiID0gbWVyZ2VkW2ldO1xuICAgICAgICAgIGlmICgoZM67ID0gYW5nbGUoYVsxXSwgYlswXSkpID4gYmVzdCkgYmVzdCA9IGTOuywgzrswID0gYlswXSwgzrsxID0gYVsxXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmFuZ2VzID0gcmFuZ2UgPSBudWxsO1xuICAgICAgcmV0dXJuIM67MCA9PT0gSW5maW5pdHkgfHwgz4YwID09PSBJbmZpbml0eSA/IFsgWyBOYU4sIE5hTiBdLCBbIE5hTiwgTmFOIF0gXSA6IFsgWyDOuzAsIM+GMCBdLCBbIM67MSwgz4YxIF0gXTtcbiAgICB9O1xuICB9KCk7XG4gIGQzLmdlby5jZW50cm9pZCA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIGQzX2dlb19jZW50cm9pZFcwID0gZDNfZ2VvX2NlbnRyb2lkVzEgPSBkM19nZW9fY2VudHJvaWRYMCA9IGQzX2dlb19jZW50cm9pZFkwID0gZDNfZ2VvX2NlbnRyb2lkWjAgPSBkM19nZW9fY2VudHJvaWRYMSA9IGQzX2dlb19jZW50cm9pZFkxID0gZDNfZ2VvX2NlbnRyb2lkWjEgPSBkM19nZW9fY2VudHJvaWRYMiA9IGQzX2dlb19jZW50cm9pZFkyID0gZDNfZ2VvX2NlbnRyb2lkWjIgPSAwO1xuICAgIGQzLmdlby5zdHJlYW0ob2JqZWN0LCBkM19nZW9fY2VudHJvaWQpO1xuICAgIHZhciB4ID0gZDNfZ2VvX2NlbnRyb2lkWDIsIHkgPSBkM19nZW9fY2VudHJvaWRZMiwgeiA9IGQzX2dlb19jZW50cm9pZFoyLCBtID0geCAqIHggKyB5ICogeSArIHogKiB6O1xuICAgIGlmIChtIDwgzrUyKSB7XG4gICAgICB4ID0gZDNfZ2VvX2NlbnRyb2lkWDEsIHkgPSBkM19nZW9fY2VudHJvaWRZMSwgeiA9IGQzX2dlb19jZW50cm9pZFoxO1xuICAgICAgaWYgKGQzX2dlb19jZW50cm9pZFcxIDwgzrUpIHggPSBkM19nZW9fY2VudHJvaWRYMCwgeSA9IGQzX2dlb19jZW50cm9pZFkwLCB6ID0gZDNfZ2VvX2NlbnRyb2lkWjA7XG4gICAgICBtID0geCAqIHggKyB5ICogeSArIHogKiB6O1xuICAgICAgaWYgKG0gPCDOtTIpIHJldHVybiBbIE5hTiwgTmFOIF07XG4gICAgfVxuICAgIHJldHVybiBbIE1hdGguYXRhbjIoeSwgeCkgKiBkM19kZWdyZWVzLCBkM19hc2luKHogLyBNYXRoLnNxcnQobSkpICogZDNfZGVncmVlcyBdO1xuICB9O1xuICB2YXIgZDNfZ2VvX2NlbnRyb2lkVzAsIGQzX2dlb19jZW50cm9pZFcxLCBkM19nZW9fY2VudHJvaWRYMCwgZDNfZ2VvX2NlbnRyb2lkWTAsIGQzX2dlb19jZW50cm9pZFowLCBkM19nZW9fY2VudHJvaWRYMSwgZDNfZ2VvX2NlbnRyb2lkWTEsIGQzX2dlb19jZW50cm9pZFoxLCBkM19nZW9fY2VudHJvaWRYMiwgZDNfZ2VvX2NlbnRyb2lkWTIsIGQzX2dlb19jZW50cm9pZFoyO1xuICB2YXIgZDNfZ2VvX2NlbnRyb2lkID0ge1xuICAgIHNwaGVyZTogZDNfbm9vcCxcbiAgICBwb2ludDogZDNfZ2VvX2NlbnRyb2lkUG9pbnQsXG4gICAgbGluZVN0YXJ0OiBkM19nZW9fY2VudHJvaWRMaW5lU3RhcnQsXG4gICAgbGluZUVuZDogZDNfZ2VvX2NlbnRyb2lkTGluZUVuZCxcbiAgICBwb2x5Z29uU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkLmxpbmVTdGFydCA9IGQzX2dlb19jZW50cm9pZFJpbmdTdGFydDtcbiAgICB9LFxuICAgIHBvbHlnb25FbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkLmxpbmVTdGFydCA9IGQzX2dlb19jZW50cm9pZExpbmVTdGFydDtcbiAgICB9XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2dlb19jZW50cm9pZFBvaW50KM67LCDPhikge1xuICAgIM67ICo9IGQzX3JhZGlhbnM7XG4gICAgdmFyIGNvc8+GID0gTWF0aC5jb3Moz4YgKj0gZDNfcmFkaWFucyk7XG4gICAgZDNfZ2VvX2NlbnRyb2lkUG9pbnRYWVooY29zz4YgKiBNYXRoLmNvcyjOuyksIGNvc8+GICogTWF0aC5zaW4ozrspLCBNYXRoLnNpbijPhikpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19jZW50cm9pZFBvaW50WFlaKHgsIHksIHopIHtcbiAgICArK2QzX2dlb19jZW50cm9pZFcwO1xuICAgIGQzX2dlb19jZW50cm9pZFgwICs9ICh4IC0gZDNfZ2VvX2NlbnRyb2lkWDApIC8gZDNfZ2VvX2NlbnRyb2lkVzA7XG4gICAgZDNfZ2VvX2NlbnRyb2lkWTAgKz0gKHkgLSBkM19nZW9fY2VudHJvaWRZMCkgLyBkM19nZW9fY2VudHJvaWRXMDtcbiAgICBkM19nZW9fY2VudHJvaWRaMCArPSAoeiAtIGQzX2dlb19jZW50cm9pZFowKSAvIGQzX2dlb19jZW50cm9pZFcwO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19jZW50cm9pZExpbmVTdGFydCgpIHtcbiAgICB2YXIgeDAsIHkwLCB6MDtcbiAgICBkM19nZW9fY2VudHJvaWQucG9pbnQgPSBmdW5jdGlvbijOuywgz4YpIHtcbiAgICAgIM67ICo9IGQzX3JhZGlhbnM7XG4gICAgICB2YXIgY29zz4YgPSBNYXRoLmNvcyjPhiAqPSBkM19yYWRpYW5zKTtcbiAgICAgIHgwID0gY29zz4YgKiBNYXRoLmNvcyjOuyk7XG4gICAgICB5MCA9IGNvc8+GICogTWF0aC5zaW4ozrspO1xuICAgICAgejAgPSBNYXRoLnNpbijPhik7XG4gICAgICBkM19nZW9fY2VudHJvaWQucG9pbnQgPSBuZXh0UG9pbnQ7XG4gICAgICBkM19nZW9fY2VudHJvaWRQb2ludFhZWih4MCwgeTAsIHowKTtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIG5leHRQb2ludCjOuywgz4YpIHtcbiAgICAgIM67ICo9IGQzX3JhZGlhbnM7XG4gICAgICB2YXIgY29zz4YgPSBNYXRoLmNvcyjPhiAqPSBkM19yYWRpYW5zKSwgeCA9IGNvc8+GICogTWF0aC5jb3MozrspLCB5ID0gY29zz4YgKiBNYXRoLnNpbijOuyksIHogPSBNYXRoLnNpbijPhiksIHcgPSBNYXRoLmF0YW4yKE1hdGguc3FydCgodyA9IHkwICogeiAtIHowICogeSkgKiB3ICsgKHcgPSB6MCAqIHggLSB4MCAqIHopICogdyArICh3ID0geDAgKiB5IC0geTAgKiB4KSAqIHcpLCB4MCAqIHggKyB5MCAqIHkgKyB6MCAqIHopO1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkVzEgKz0gdztcbiAgICAgIGQzX2dlb19jZW50cm9pZFgxICs9IHcgKiAoeDAgKyAoeDAgPSB4KSk7XG4gICAgICBkM19nZW9fY2VudHJvaWRZMSArPSB3ICogKHkwICsgKHkwID0geSkpO1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkWjEgKz0gdyAqICh6MCArICh6MCA9IHopKTtcbiAgICAgIGQzX2dlb19jZW50cm9pZFBvaW50WFlaKHgwLCB5MCwgejApO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fY2VudHJvaWRMaW5lRW5kKCkge1xuICAgIGQzX2dlb19jZW50cm9pZC5wb2ludCA9IGQzX2dlb19jZW50cm9pZFBvaW50O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19jZW50cm9pZFJpbmdTdGFydCgpIHtcbiAgICB2YXIgzrswMCwgz4YwMCwgeDAsIHkwLCB6MDtcbiAgICBkM19nZW9fY2VudHJvaWQucG9pbnQgPSBmdW5jdGlvbijOuywgz4YpIHtcbiAgICAgIM67MDAgPSDOuywgz4YwMCA9IM+GO1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkLnBvaW50ID0gbmV4dFBvaW50O1xuICAgICAgzrsgKj0gZDNfcmFkaWFucztcbiAgICAgIHZhciBjb3PPhiA9IE1hdGguY29zKM+GICo9IGQzX3JhZGlhbnMpO1xuICAgICAgeDAgPSBjb3PPhiAqIE1hdGguY29zKM67KTtcbiAgICAgIHkwID0gY29zz4YgKiBNYXRoLnNpbijOuyk7XG4gICAgICB6MCA9IE1hdGguc2luKM+GKTtcbiAgICAgIGQzX2dlb19jZW50cm9pZFBvaW50WFlaKHgwLCB5MCwgejApO1xuICAgIH07XG4gICAgZDNfZ2VvX2NlbnRyb2lkLmxpbmVFbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIG5leHRQb2ludCjOuzAwLCDPhjAwKTtcbiAgICAgIGQzX2dlb19jZW50cm9pZC5saW5lRW5kID0gZDNfZ2VvX2NlbnRyb2lkTGluZUVuZDtcbiAgICAgIGQzX2dlb19jZW50cm9pZC5wb2ludCA9IGQzX2dlb19jZW50cm9pZFBvaW50O1xuICAgIH07XG4gICAgZnVuY3Rpb24gbmV4dFBvaW50KM67LCDPhikge1xuICAgICAgzrsgKj0gZDNfcmFkaWFucztcbiAgICAgIHZhciBjb3PPhiA9IE1hdGguY29zKM+GICo9IGQzX3JhZGlhbnMpLCB4ID0gY29zz4YgKiBNYXRoLmNvcyjOuyksIHkgPSBjb3PPhiAqIE1hdGguc2luKM67KSwgeiA9IE1hdGguc2luKM+GKSwgY3ggPSB5MCAqIHogLSB6MCAqIHksIGN5ID0gejAgKiB4IC0geDAgKiB6LCBjeiA9IHgwICogeSAtIHkwICogeCwgbSA9IE1hdGguc3FydChjeCAqIGN4ICsgY3kgKiBjeSArIGN6ICogY3opLCB1ID0geDAgKiB4ICsgeTAgKiB5ICsgejAgKiB6LCB2ID0gbSAmJiAtZDNfYWNvcyh1KSAvIG0sIHcgPSBNYXRoLmF0YW4yKG0sIHUpO1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkWDIgKz0gdiAqIGN4O1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkWTIgKz0gdiAqIGN5O1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkWjIgKz0gdiAqIGN6O1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkVzEgKz0gdztcbiAgICAgIGQzX2dlb19jZW50cm9pZFgxICs9IHcgKiAoeDAgKyAoeDAgPSB4KSk7XG4gICAgICBkM19nZW9fY2VudHJvaWRZMSArPSB3ICogKHkwICsgKHkwID0geSkpO1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkWjEgKz0gdyAqICh6MCArICh6MCA9IHopKTtcbiAgICAgIGQzX2dlb19jZW50cm9pZFBvaW50WFlaKHgwLCB5MCwgejApO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBkM190cnVlKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19jbGlwUG9seWdvbihzZWdtZW50cywgY29tcGFyZSwgaW5zaWRlLCBpbnRlcnBvbGF0ZSwgbGlzdGVuZXIpIHtcbiAgICB2YXIgc3ViamVjdCA9IFtdLCBjbGlwID0gW107XG4gICAgc2VnbWVudHMuZm9yRWFjaChmdW5jdGlvbihzZWdtZW50KSB7XG4gICAgICBpZiAoKG4gPSBzZWdtZW50Lmxlbmd0aCAtIDEpIDw9IDApIHJldHVybjtcbiAgICAgIHZhciBuLCBwMCA9IHNlZ21lbnRbMF0sIHAxID0gc2VnbWVudFtuXTtcbiAgICAgIGlmIChkM19nZW9fc3BoZXJpY2FsRXF1YWwocDAsIHAxKSkge1xuICAgICAgICBsaXN0ZW5lci5saW5lU3RhcnQoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpIGxpc3RlbmVyLnBvaW50KChwMCA9IHNlZ21lbnRbaV0pWzBdLCBwMFsxXSk7XG4gICAgICAgIGxpc3RlbmVyLmxpbmVFbmQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGEgPSB7XG4gICAgICAgIHBvaW50OiBwMCxcbiAgICAgICAgcG9pbnRzOiBzZWdtZW50LFxuICAgICAgICBvdGhlcjogbnVsbCxcbiAgICAgICAgdmlzaXRlZDogZmFsc2UsXG4gICAgICAgIGVudHJ5OiB0cnVlLFxuICAgICAgICBzdWJqZWN0OiB0cnVlXG4gICAgICB9LCBiID0ge1xuICAgICAgICBwb2ludDogcDAsXG4gICAgICAgIHBvaW50czogWyBwMCBdLFxuICAgICAgICBvdGhlcjogYSxcbiAgICAgICAgdmlzaXRlZDogZmFsc2UsXG4gICAgICAgIGVudHJ5OiBmYWxzZSxcbiAgICAgICAgc3ViamVjdDogZmFsc2VcbiAgICAgIH07XG4gICAgICBhLm90aGVyID0gYjtcbiAgICAgIHN1YmplY3QucHVzaChhKTtcbiAgICAgIGNsaXAucHVzaChiKTtcbiAgICAgIGEgPSB7XG4gICAgICAgIHBvaW50OiBwMSxcbiAgICAgICAgcG9pbnRzOiBbIHAxIF0sXG4gICAgICAgIG90aGVyOiBudWxsLFxuICAgICAgICB2aXNpdGVkOiBmYWxzZSxcbiAgICAgICAgZW50cnk6IGZhbHNlLFxuICAgICAgICBzdWJqZWN0OiB0cnVlXG4gICAgICB9O1xuICAgICAgYiA9IHtcbiAgICAgICAgcG9pbnQ6IHAxLFxuICAgICAgICBwb2ludHM6IFsgcDEgXSxcbiAgICAgICAgb3RoZXI6IGEsXG4gICAgICAgIHZpc2l0ZWQ6IGZhbHNlLFxuICAgICAgICBlbnRyeTogdHJ1ZSxcbiAgICAgICAgc3ViamVjdDogZmFsc2VcbiAgICAgIH07XG4gICAgICBhLm90aGVyID0gYjtcbiAgICAgIHN1YmplY3QucHVzaChhKTtcbiAgICAgIGNsaXAucHVzaChiKTtcbiAgICB9KTtcbiAgICBjbGlwLnNvcnQoY29tcGFyZSk7XG4gICAgZDNfZ2VvX2NsaXBQb2x5Z29uTGlua0NpcmN1bGFyKHN1YmplY3QpO1xuICAgIGQzX2dlb19jbGlwUG9seWdvbkxpbmtDaXJjdWxhcihjbGlwKTtcbiAgICBpZiAoIXN1YmplY3QubGVuZ3RoKSByZXR1cm47XG4gICAgaWYgKGluc2lkZSkgZm9yICh2YXIgaSA9IDEsIGUgPSAhaW5zaWRlKGNsaXBbMF0ucG9pbnQpLCBuID0gY2xpcC5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgIGNsaXBbaV0uZW50cnkgPSBlID0gIWU7XG4gICAgfVxuICAgIHZhciBzdGFydCA9IHN1YmplY3RbMF0sIGN1cnJlbnQsIHBvaW50cywgcG9pbnQ7XG4gICAgd2hpbGUgKDEpIHtcbiAgICAgIGN1cnJlbnQgPSBzdGFydDtcbiAgICAgIHdoaWxlIChjdXJyZW50LnZpc2l0ZWQpIGlmICgoY3VycmVudCA9IGN1cnJlbnQubmV4dCkgPT09IHN0YXJ0KSByZXR1cm47XG4gICAgICBwb2ludHMgPSBjdXJyZW50LnBvaW50cztcbiAgICAgIGxpc3RlbmVyLmxpbmVTdGFydCgpO1xuICAgICAgZG8ge1xuICAgICAgICBjdXJyZW50LnZpc2l0ZWQgPSBjdXJyZW50Lm90aGVyLnZpc2l0ZWQgPSB0cnVlO1xuICAgICAgICBpZiAoY3VycmVudC5lbnRyeSkge1xuICAgICAgICAgIGlmIChjdXJyZW50LnN1YmplY3QpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSBsaXN0ZW5lci5wb2ludCgocG9pbnQgPSBwb2ludHNbaV0pWzBdLCBwb2ludFsxXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGludGVycG9sYXRlKGN1cnJlbnQucG9pbnQsIGN1cnJlbnQubmV4dC5wb2ludCwgMSwgbGlzdGVuZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChjdXJyZW50LnN1YmplY3QpIHtcbiAgICAgICAgICAgIHBvaW50cyA9IGN1cnJlbnQucHJldi5wb2ludHM7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gcG9pbnRzLmxlbmd0aDsgLS1pID49IDA7ICkgbGlzdGVuZXIucG9pbnQoKHBvaW50ID0gcG9pbnRzW2ldKVswXSwgcG9pbnRbMV0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbnRlcnBvbGF0ZShjdXJyZW50LnBvaW50LCBjdXJyZW50LnByZXYucG9pbnQsIC0xLCBsaXN0ZW5lcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnByZXY7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnQub3RoZXI7XG4gICAgICAgIHBvaW50cyA9IGN1cnJlbnQucG9pbnRzO1xuICAgICAgfSB3aGlsZSAoIWN1cnJlbnQudmlzaXRlZCk7XG4gICAgICBsaXN0ZW5lci5saW5lRW5kKCk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19jbGlwUG9seWdvbkxpbmtDaXJjdWxhcihhcnJheSkge1xuICAgIGlmICghKG4gPSBhcnJheS5sZW5ndGgpKSByZXR1cm47XG4gICAgdmFyIG4sIGkgPSAwLCBhID0gYXJyYXlbMF0sIGI7XG4gICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgIGEubmV4dCA9IGIgPSBhcnJheVtpXTtcbiAgICAgIGIucHJldiA9IGE7XG4gICAgICBhID0gYjtcbiAgICB9XG4gICAgYS5uZXh0ID0gYiA9IGFycmF5WzBdO1xuICAgIGIucHJldiA9IGE7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX2NsaXAocG9pbnRWaXNpYmxlLCBjbGlwTGluZSwgaW50ZXJwb2xhdGUsIHBvbHlnb25Db250YWlucykge1xuICAgIHJldHVybiBmdW5jdGlvbihsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpbmUgPSBjbGlwTGluZShsaXN0ZW5lcik7XG4gICAgICB2YXIgY2xpcCA9IHtcbiAgICAgICAgcG9pbnQ6IHBvaW50LFxuICAgICAgICBsaW5lU3RhcnQ6IGxpbmVTdGFydCxcbiAgICAgICAgbGluZUVuZDogbGluZUVuZCxcbiAgICAgICAgcG9seWdvblN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjbGlwLnBvaW50ID0gcG9pbnRSaW5nO1xuICAgICAgICAgIGNsaXAubGluZVN0YXJ0ID0gcmluZ1N0YXJ0O1xuICAgICAgICAgIGNsaXAubGluZUVuZCA9IHJpbmdFbmQ7XG4gICAgICAgICAgc2VnbWVudHMgPSBbXTtcbiAgICAgICAgICBwb2x5Z29uID0gW107XG4gICAgICAgICAgbGlzdGVuZXIucG9seWdvblN0YXJ0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIHBvbHlnb25FbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNsaXAucG9pbnQgPSBwb2ludDtcbiAgICAgICAgICBjbGlwLmxpbmVTdGFydCA9IGxpbmVTdGFydDtcbiAgICAgICAgICBjbGlwLmxpbmVFbmQgPSBsaW5lRW5kO1xuICAgICAgICAgIHNlZ21lbnRzID0gZDMubWVyZ2Uoc2VnbWVudHMpO1xuICAgICAgICAgIGlmIChzZWdtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGQzX2dlb19jbGlwUG9seWdvbihzZWdtZW50cywgZDNfZ2VvX2NsaXBTb3J0LCBudWxsLCBpbnRlcnBvbGF0ZSwgbGlzdGVuZXIpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocG9seWdvbkNvbnRhaW5zKHBvbHlnb24pKSB7XG4gICAgICAgICAgICBsaXN0ZW5lci5saW5lU3RhcnQoKTtcbiAgICAgICAgICAgIGludGVycG9sYXRlKG51bGwsIG51bGwsIDEsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgIGxpc3RlbmVyLmxpbmVFbmQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGlzdGVuZXIucG9seWdvbkVuZCgpO1xuICAgICAgICAgIHNlZ21lbnRzID0gcG9seWdvbiA9IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIHNwaGVyZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbGlzdGVuZXIucG9seWdvblN0YXJ0KCk7XG4gICAgICAgICAgbGlzdGVuZXIubGluZVN0YXJ0KCk7XG4gICAgICAgICAgaW50ZXJwb2xhdGUobnVsbCwgbnVsbCwgMSwgbGlzdGVuZXIpO1xuICAgICAgICAgIGxpc3RlbmVyLmxpbmVFbmQoKTtcbiAgICAgICAgICBsaXN0ZW5lci5wb2x5Z29uRW5kKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBmdW5jdGlvbiBwb2ludCjOuywgz4YpIHtcbiAgICAgICAgaWYgKHBvaW50VmlzaWJsZSjOuywgz4YpKSBsaXN0ZW5lci5wb2ludCjOuywgz4YpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gcG9pbnRMaW5lKM67LCDPhikge1xuICAgICAgICBsaW5lLnBvaW50KM67LCDPhik7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBsaW5lU3RhcnQoKSB7XG4gICAgICAgIGNsaXAucG9pbnQgPSBwb2ludExpbmU7XG4gICAgICAgIGxpbmUubGluZVN0YXJ0KCk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBsaW5lRW5kKCkge1xuICAgICAgICBjbGlwLnBvaW50ID0gcG9pbnQ7XG4gICAgICAgIGxpbmUubGluZUVuZCgpO1xuICAgICAgfVxuICAgICAgdmFyIHNlZ21lbnRzO1xuICAgICAgdmFyIGJ1ZmZlciA9IGQzX2dlb19jbGlwQnVmZmVyTGlzdGVuZXIoKSwgcmluZ0xpc3RlbmVyID0gY2xpcExpbmUoYnVmZmVyKSwgcG9seWdvbiwgcmluZztcbiAgICAgIGZ1bmN0aW9uIHBvaW50UmluZyjOuywgz4YpIHtcbiAgICAgICAgcmluZ0xpc3RlbmVyLnBvaW50KM67LCDPhik7XG4gICAgICAgIHJpbmcucHVzaChbIM67LCDPhiBdKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHJpbmdTdGFydCgpIHtcbiAgICAgICAgcmluZ0xpc3RlbmVyLmxpbmVTdGFydCgpO1xuICAgICAgICByaW5nID0gW107XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiByaW5nRW5kKCkge1xuICAgICAgICBwb2ludFJpbmcocmluZ1swXVswXSwgcmluZ1swXVsxXSk7XG4gICAgICAgIHJpbmdMaXN0ZW5lci5saW5lRW5kKCk7XG4gICAgICAgIHZhciBjbGVhbiA9IHJpbmdMaXN0ZW5lci5jbGVhbigpLCByaW5nU2VnbWVudHMgPSBidWZmZXIuYnVmZmVyKCksIHNlZ21lbnQsIG4gPSByaW5nU2VnbWVudHMubGVuZ3RoO1xuICAgICAgICByaW5nLnBvcCgpO1xuICAgICAgICBwb2x5Z29uLnB1c2gocmluZyk7XG4gICAgICAgIHJpbmcgPSBudWxsO1xuICAgICAgICBpZiAoIW4pIHJldHVybjtcbiAgICAgICAgaWYgKGNsZWFuICYgMSkge1xuICAgICAgICAgIHNlZ21lbnQgPSByaW5nU2VnbWVudHNbMF07XG4gICAgICAgICAgdmFyIG4gPSBzZWdtZW50Lmxlbmd0aCAtIDEsIGkgPSAtMSwgcG9pbnQ7XG4gICAgICAgICAgbGlzdGVuZXIubGluZVN0YXJ0KCk7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IG4pIGxpc3RlbmVyLnBvaW50KChwb2ludCA9IHNlZ21lbnRbaV0pWzBdLCBwb2ludFsxXSk7XG4gICAgICAgICAgbGlzdGVuZXIubGluZUVuZCgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobiA+IDEgJiYgY2xlYW4gJiAyKSByaW5nU2VnbWVudHMucHVzaChyaW5nU2VnbWVudHMucG9wKCkuY29uY2F0KHJpbmdTZWdtZW50cy5zaGlmdCgpKSk7XG4gICAgICAgIHNlZ21lbnRzLnB1c2gocmluZ1NlZ21lbnRzLmZpbHRlcihkM19nZW9fY2xpcFNlZ21lbnRMZW5ndGgxKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY2xpcDtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19jbGlwU2VnbWVudExlbmd0aDEoc2VnbWVudCkge1xuICAgIHJldHVybiBzZWdtZW50Lmxlbmd0aCA+IDE7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX2NsaXBCdWZmZXJMaXN0ZW5lcigpIHtcbiAgICB2YXIgbGluZXMgPSBbXSwgbGluZTtcbiAgICByZXR1cm4ge1xuICAgICAgbGluZVN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGluZXMucHVzaChsaW5lID0gW10pO1xuICAgICAgfSxcbiAgICAgIHBvaW50OiBmdW5jdGlvbijOuywgz4YpIHtcbiAgICAgICAgbGluZS5wdXNoKFsgzrssIM+GIF0pO1xuICAgICAgfSxcbiAgICAgIGxpbmVFbmQ6IGQzX25vb3AsXG4gICAgICBidWZmZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYnVmZmVyID0gbGluZXM7XG4gICAgICAgIGxpbmVzID0gW107XG4gICAgICAgIGxpbmUgPSBudWxsO1xuICAgICAgICByZXR1cm4gYnVmZmVyO1xuICAgICAgfSxcbiAgICAgIHJlam9pbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChsaW5lcy5sZW5ndGggPiAxKSBsaW5lcy5wdXNoKGxpbmVzLnBvcCgpLmNvbmNhdChsaW5lcy5zaGlmdCgpKSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fY2xpcFNvcnQoYSwgYikge1xuICAgIHJldHVybiAoKGEgPSBhLnBvaW50KVswXSA8IDAgPyBhWzFdIC0gz4AgLyAyIC0gzrUgOiDPgCAvIDIgLSBhWzFdKSAtICgoYiA9IGIucG9pbnQpWzBdIDwgMCA/IGJbMV0gLSDPgCAvIDIgLSDOtSA6IM+AIC8gMiAtIGJbMV0pO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19wb2ludEluUG9seWdvbihwb2ludCwgcG9seWdvbikge1xuICAgIHZhciBtZXJpZGlhbiA9IHBvaW50WzBdLCBwYXJhbGxlbCA9IHBvaW50WzFdLCBtZXJpZGlhbk5vcm1hbCA9IFsgTWF0aC5zaW4obWVyaWRpYW4pLCAtTWF0aC5jb3MobWVyaWRpYW4pLCAwIF0sIHBvbGFyQW5nbGUgPSAwLCBwb2xhciA9IGZhbHNlLCBzb3V0aFBvbGUgPSBmYWxzZSwgd2luZGluZyA9IDA7XG4gICAgZDNfZ2VvX2FyZWFSaW5nU3VtLnJlc2V0KCk7XG4gICAgZm9yICh2YXIgaSA9IDAsIG4gPSBwb2x5Z29uLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgdmFyIHJpbmcgPSBwb2x5Z29uW2ldLCBtID0gcmluZy5sZW5ndGg7XG4gICAgICBpZiAoIW0pIGNvbnRpbnVlO1xuICAgICAgdmFyIHBvaW50MCA9IHJpbmdbMF0sIM67MCA9IHBvaW50MFswXSwgz4YwID0gcG9pbnQwWzFdIC8gMiArIM+AIC8gNCwgc2luz4YwID0gTWF0aC5zaW4oz4YwKSwgY29zz4YwID0gTWF0aC5jb3Moz4YwKSwgaiA9IDE7XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBpZiAoaiA9PT0gbSkgaiA9IDA7XG4gICAgICAgIHBvaW50ID0gcmluZ1tqXTtcbiAgICAgICAgdmFyIM67ID0gcG9pbnRbMF0sIM+GID0gcG9pbnRbMV0gLyAyICsgz4AgLyA0LCBzaW7PhiA9IE1hdGguc2luKM+GKSwgY29zz4YgPSBNYXRoLmNvcyjPhiksIGTOuyA9IM67IC0gzrswLCBhbnRpbWVyaWRpYW4gPSBNYXRoLmFicyhkzrspID4gz4AsIGsgPSBzaW7PhjAgKiBzaW7PhjtcbiAgICAgICAgZDNfZ2VvX2FyZWFSaW5nU3VtLmFkZChNYXRoLmF0YW4yKGsgKiBNYXRoLnNpbihkzrspLCBjb3PPhjAgKiBjb3PPhiArIGsgKiBNYXRoLmNvcyhkzrspKSk7XG4gICAgICAgIGlmIChNYXRoLmFicyjPhikgPCDOtSkgc291dGhQb2xlID0gdHJ1ZTtcbiAgICAgICAgcG9sYXJBbmdsZSArPSBhbnRpbWVyaWRpYW4gPyBkzrsgKyAoZM67ID49IDAgPyAyIDogLTIpICogz4AgOiBkzrs7XG4gICAgICAgIGlmIChhbnRpbWVyaWRpYW4gXiDOuzAgPj0gbWVyaWRpYW4gXiDOuyA+PSBtZXJpZGlhbikge1xuICAgICAgICAgIHZhciBhcmMgPSBkM19nZW9fY2FydGVzaWFuQ3Jvc3MoZDNfZ2VvX2NhcnRlc2lhbihwb2ludDApLCBkM19nZW9fY2FydGVzaWFuKHBvaW50KSk7XG4gICAgICAgICAgZDNfZ2VvX2NhcnRlc2lhbk5vcm1hbGl6ZShhcmMpO1xuICAgICAgICAgIHZhciBpbnRlcnNlY3Rpb24gPSBkM19nZW9fY2FydGVzaWFuQ3Jvc3MobWVyaWRpYW5Ob3JtYWwsIGFyYyk7XG4gICAgICAgICAgZDNfZ2VvX2NhcnRlc2lhbk5vcm1hbGl6ZShpbnRlcnNlY3Rpb24pO1xuICAgICAgICAgIHZhciDPhmFyYyA9IChhbnRpbWVyaWRpYW4gXiBkzrsgPj0gMCA/IC0xIDogMSkgKiBkM19hc2luKGludGVyc2VjdGlvblsyXSk7XG4gICAgICAgICAgaWYgKHBhcmFsbGVsID4gz4ZhcmMpIHtcbiAgICAgICAgICAgIHdpbmRpbmcgKz0gYW50aW1lcmlkaWFuIF4gZM67ID49IDAgPyAxIDogLTE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghaisrKSBicmVhaztcbiAgICAgICAgzrswID0gzrssIHNpbs+GMCA9IHNpbs+GLCBjb3PPhjAgPSBjb3PPhiwgcG9pbnQwID0gcG9pbnQ7XG4gICAgICB9XG4gICAgICBpZiAoTWF0aC5hYnMocG9sYXJBbmdsZSkgPiDOtSkgcG9sYXIgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gKCFzb3V0aFBvbGUgJiYgIXBvbGFyICYmIGQzX2dlb19hcmVhUmluZ1N1bSA8IDAgfHwgcG9sYXJBbmdsZSA8IC3OtSkgXiB3aW5kaW5nICYgMTtcbiAgfVxuICB2YXIgZDNfZ2VvX2NsaXBBbnRpbWVyaWRpYW4gPSBkM19nZW9fY2xpcChkM190cnVlLCBkM19nZW9fY2xpcEFudGltZXJpZGlhbkxpbmUsIGQzX2dlb19jbGlwQW50aW1lcmlkaWFuSW50ZXJwb2xhdGUsIGQzX2dlb19jbGlwQW50aW1lcmlkaWFuUG9seWdvbkNvbnRhaW5zKTtcbiAgZnVuY3Rpb24gZDNfZ2VvX2NsaXBBbnRpbWVyaWRpYW5MaW5lKGxpc3RlbmVyKSB7XG4gICAgdmFyIM67MCA9IE5hTiwgz4YwID0gTmFOLCBzzrswID0gTmFOLCBjbGVhbjtcbiAgICByZXR1cm4ge1xuICAgICAgbGluZVN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGlzdGVuZXIubGluZVN0YXJ0KCk7XG4gICAgICAgIGNsZWFuID0gMTtcbiAgICAgIH0sXG4gICAgICBwb2ludDogZnVuY3Rpb24ozrsxLCDPhjEpIHtcbiAgICAgICAgdmFyIHPOuzEgPSDOuzEgPiAwID8gz4AgOiAtz4AsIGTOuyA9IE1hdGguYWJzKM67MSAtIM67MCk7XG4gICAgICAgIGlmIChNYXRoLmFicyhkzrsgLSDPgCkgPCDOtSkge1xuICAgICAgICAgIGxpc3RlbmVyLnBvaW50KM67MCwgz4YwID0gKM+GMCArIM+GMSkgLyAyID4gMCA/IM+AIC8gMiA6IC3PgCAvIDIpO1xuICAgICAgICAgIGxpc3RlbmVyLnBvaW50KHPOuzAsIM+GMCk7XG4gICAgICAgICAgbGlzdGVuZXIubGluZUVuZCgpO1xuICAgICAgICAgIGxpc3RlbmVyLmxpbmVTdGFydCgpO1xuICAgICAgICAgIGxpc3RlbmVyLnBvaW50KHPOuzEsIM+GMCk7XG4gICAgICAgICAgbGlzdGVuZXIucG9pbnQozrsxLCDPhjApO1xuICAgICAgICAgIGNsZWFuID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChzzrswICE9PSBzzrsxICYmIGTOuyA+PSDPgCkge1xuICAgICAgICAgIGlmIChNYXRoLmFicyjOuzAgLSBzzrswKSA8IM61KSDOuzAgLT0gc867MCAqIM61O1xuICAgICAgICAgIGlmIChNYXRoLmFicyjOuzEgLSBzzrsxKSA8IM61KSDOuzEgLT0gc867MSAqIM61O1xuICAgICAgICAgIM+GMCA9IGQzX2dlb19jbGlwQW50aW1lcmlkaWFuSW50ZXJzZWN0KM67MCwgz4YwLCDOuzEsIM+GMSk7XG4gICAgICAgICAgbGlzdGVuZXIucG9pbnQoc867MCwgz4YwKTtcbiAgICAgICAgICBsaXN0ZW5lci5saW5lRW5kKCk7XG4gICAgICAgICAgbGlzdGVuZXIubGluZVN0YXJ0KCk7XG4gICAgICAgICAgbGlzdGVuZXIucG9pbnQoc867MSwgz4YwKTtcbiAgICAgICAgICBjbGVhbiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXIucG9pbnQozrswID0gzrsxLCDPhjAgPSDPhjEpO1xuICAgICAgICBzzrswID0gc867MTtcbiAgICAgIH0sXG4gICAgICBsaW5lRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGlzdGVuZXIubGluZUVuZCgpO1xuICAgICAgICDOuzAgPSDPhjAgPSBOYU47XG4gICAgICB9LFxuICAgICAgY2xlYW46IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gMiAtIGNsZWFuO1xuICAgICAgfVxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX2NsaXBBbnRpbWVyaWRpYW5JbnRlcnNlY3QozrswLCDPhjAsIM67MSwgz4YxKSB7XG4gICAgdmFyIGNvc8+GMCwgY29zz4YxLCBzaW7OuzBfzrsxID0gTWF0aC5zaW4ozrswIC0gzrsxKTtcbiAgICByZXR1cm4gTWF0aC5hYnMoc2luzrswX867MSkgPiDOtSA/IE1hdGguYXRhbigoTWF0aC5zaW4oz4YwKSAqIChjb3PPhjEgPSBNYXRoLmNvcyjPhjEpKSAqIE1hdGguc2luKM67MSkgLSBNYXRoLnNpbijPhjEpICogKGNvc8+GMCA9IE1hdGguY29zKM+GMCkpICogTWF0aC5zaW4ozrswKSkgLyAoY29zz4YwICogY29zz4YxICogc2luzrswX867MSkpIDogKM+GMCArIM+GMSkgLyAyO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19jbGlwQW50aW1lcmlkaWFuSW50ZXJwb2xhdGUoZnJvbSwgdG8sIGRpcmVjdGlvbiwgbGlzdGVuZXIpIHtcbiAgICB2YXIgz4Y7XG4gICAgaWYgKGZyb20gPT0gbnVsbCkge1xuICAgICAgz4YgPSBkaXJlY3Rpb24gKiDPgCAvIDI7XG4gICAgICBsaXN0ZW5lci5wb2ludCgtz4AsIM+GKTtcbiAgICAgIGxpc3RlbmVyLnBvaW50KDAsIM+GKTtcbiAgICAgIGxpc3RlbmVyLnBvaW50KM+ALCDPhik7XG4gICAgICBsaXN0ZW5lci5wb2ludCjPgCwgMCk7XG4gICAgICBsaXN0ZW5lci5wb2ludCjPgCwgLc+GKTtcbiAgICAgIGxpc3RlbmVyLnBvaW50KDAsIC3Phik7XG4gICAgICBsaXN0ZW5lci5wb2ludCgtz4AsIC3Phik7XG4gICAgICBsaXN0ZW5lci5wb2ludCgtz4AsIDApO1xuICAgICAgbGlzdGVuZXIucG9pbnQoLc+ALCDPhik7XG4gICAgfSBlbHNlIGlmIChNYXRoLmFicyhmcm9tWzBdIC0gdG9bMF0pID4gzrUpIHtcbiAgICAgIHZhciBzID0gKGZyb21bMF0gPCB0b1swXSA/IDEgOiAtMSkgKiDPgDtcbiAgICAgIM+GID0gZGlyZWN0aW9uICogcyAvIDI7XG4gICAgICBsaXN0ZW5lci5wb2ludCgtcywgz4YpO1xuICAgICAgbGlzdGVuZXIucG9pbnQoMCwgz4YpO1xuICAgICAgbGlzdGVuZXIucG9pbnQocywgz4YpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0ZW5lci5wb2ludCh0b1swXSwgdG9bMV0pO1xuICAgIH1cbiAgfVxuICB2YXIgZDNfZ2VvX2NsaXBBbnRpbWVyaWRpYW5Qb2ludCA9IFsgLc+ALCAwIF07XG4gIGZ1bmN0aW9uIGQzX2dlb19jbGlwQW50aW1lcmlkaWFuUG9seWdvbkNvbnRhaW5zKHBvbHlnb24pIHtcbiAgICByZXR1cm4gZDNfZ2VvX3BvaW50SW5Qb2x5Z29uKGQzX2dlb19jbGlwQW50aW1lcmlkaWFuUG9pbnQsIHBvbHlnb24pO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19jbGlwQ2lyY2xlKHJhZGl1cykge1xuICAgIHZhciBjciA9IE1hdGguY29zKHJhZGl1cyksIHNtYWxsUmFkaXVzID0gY3IgPiAwLCBwb2ludCA9IFsgcmFkaXVzLCAwIF0sIG5vdEhlbWlzcGhlcmUgPSBNYXRoLmFicyhjcikgPiDOtSwgaW50ZXJwb2xhdGUgPSBkM19nZW9fY2lyY2xlSW50ZXJwb2xhdGUocmFkaXVzLCA2ICogZDNfcmFkaWFucyk7XG4gICAgcmV0dXJuIGQzX2dlb19jbGlwKHZpc2libGUsIGNsaXBMaW5lLCBpbnRlcnBvbGF0ZSwgcG9seWdvbkNvbnRhaW5zKTtcbiAgICBmdW5jdGlvbiB2aXNpYmxlKM67LCDPhikge1xuICAgICAgcmV0dXJuIE1hdGguY29zKM67KSAqIE1hdGguY29zKM+GKSA+IGNyO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjbGlwTGluZShsaXN0ZW5lcikge1xuICAgICAgdmFyIHBvaW50MCwgYzAsIHYwLCB2MDAsIGNsZWFuO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGluZVN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2MDAgPSB2MCA9IGZhbHNlO1xuICAgICAgICAgIGNsZWFuID0gMTtcbiAgICAgICAgfSxcbiAgICAgICAgcG9pbnQ6IGZ1bmN0aW9uKM67LCDPhikge1xuICAgICAgICAgIHZhciBwb2ludDEgPSBbIM67LCDPhiBdLCBwb2ludDIsIHYgPSB2aXNpYmxlKM67LCDPhiksIGMgPSBzbWFsbFJhZGl1cyA/IHYgPyAwIDogY29kZSjOuywgz4YpIDogdiA/IGNvZGUozrsgKyAozrsgPCAwID8gz4AgOiAtz4ApLCDPhikgOiAwO1xuICAgICAgICAgIGlmICghcG9pbnQwICYmICh2MDAgPSB2MCA9IHYpKSBsaXN0ZW5lci5saW5lU3RhcnQoKTtcbiAgICAgICAgICBpZiAodiAhPT0gdjApIHtcbiAgICAgICAgICAgIHBvaW50MiA9IGludGVyc2VjdChwb2ludDAsIHBvaW50MSk7XG4gICAgICAgICAgICBpZiAoZDNfZ2VvX3NwaGVyaWNhbEVxdWFsKHBvaW50MCwgcG9pbnQyKSB8fCBkM19nZW9fc3BoZXJpY2FsRXF1YWwocG9pbnQxLCBwb2ludDIpKSB7XG4gICAgICAgICAgICAgIHBvaW50MVswXSArPSDOtTtcbiAgICAgICAgICAgICAgcG9pbnQxWzFdICs9IM61O1xuICAgICAgICAgICAgICB2ID0gdmlzaWJsZShwb2ludDFbMF0sIHBvaW50MVsxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2ICE9PSB2MCkge1xuICAgICAgICAgICAgY2xlYW4gPSAwO1xuICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgbGlzdGVuZXIubGluZVN0YXJ0KCk7XG4gICAgICAgICAgICAgIHBvaW50MiA9IGludGVyc2VjdChwb2ludDEsIHBvaW50MCk7XG4gICAgICAgICAgICAgIGxpc3RlbmVyLnBvaW50KHBvaW50MlswXSwgcG9pbnQyWzFdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBvaW50MiA9IGludGVyc2VjdChwb2ludDAsIHBvaW50MSk7XG4gICAgICAgICAgICAgIGxpc3RlbmVyLnBvaW50KHBvaW50MlswXSwgcG9pbnQyWzFdKTtcbiAgICAgICAgICAgICAgbGlzdGVuZXIubGluZUVuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcG9pbnQwID0gcG9pbnQyO1xuICAgICAgICAgIH0gZWxzZSBpZiAobm90SGVtaXNwaGVyZSAmJiBwb2ludDAgJiYgc21hbGxSYWRpdXMgXiB2KSB7XG4gICAgICAgICAgICB2YXIgdDtcbiAgICAgICAgICAgIGlmICghKGMgJiBjMCkgJiYgKHQgPSBpbnRlcnNlY3QocG9pbnQxLCBwb2ludDAsIHRydWUpKSkge1xuICAgICAgICAgICAgICBjbGVhbiA9IDA7XG4gICAgICAgICAgICAgIGlmIChzbWFsbFJhZGl1cykge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpbmVTdGFydCgpO1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLnBvaW50KHRbMF1bMF0sIHRbMF1bMV0pO1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLnBvaW50KHRbMV1bMF0sIHRbMV1bMV0pO1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpbmVFbmQoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5wb2ludCh0WzFdWzBdLCB0WzFdWzFdKTtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5saW5lRW5kKCk7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIubGluZVN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIucG9pbnQodFswXVswXSwgdFswXVsxXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHYgJiYgKCFwb2ludDAgfHwgIWQzX2dlb19zcGhlcmljYWxFcXVhbChwb2ludDAsIHBvaW50MSkpKSB7XG4gICAgICAgICAgICBsaXN0ZW5lci5wb2ludChwb2ludDFbMF0sIHBvaW50MVsxXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBvaW50MCA9IHBvaW50MSwgdjAgPSB2LCBjMCA9IGM7XG4gICAgICAgIH0sXG4gICAgICAgIGxpbmVFbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICh2MCkgbGlzdGVuZXIubGluZUVuZCgpO1xuICAgICAgICAgIHBvaW50MCA9IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gY2xlYW4gfCAodjAwICYmIHYwKSA8PCAxO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbnRlcnNlY3QoYSwgYiwgdHdvKSB7XG4gICAgICB2YXIgcGEgPSBkM19nZW9fY2FydGVzaWFuKGEpLCBwYiA9IGQzX2dlb19jYXJ0ZXNpYW4oYik7XG4gICAgICB2YXIgbjEgPSBbIDEsIDAsIDAgXSwgbjIgPSBkM19nZW9fY2FydGVzaWFuQ3Jvc3MocGEsIHBiKSwgbjJuMiA9IGQzX2dlb19jYXJ0ZXNpYW5Eb3QobjIsIG4yKSwgbjFuMiA9IG4yWzBdLCBkZXRlcm1pbmFudCA9IG4ybjIgLSBuMW4yICogbjFuMjtcbiAgICAgIGlmICghZGV0ZXJtaW5hbnQpIHJldHVybiAhdHdvICYmIGE7XG4gICAgICB2YXIgYzEgPSBjciAqIG4ybjIgLyBkZXRlcm1pbmFudCwgYzIgPSAtY3IgKiBuMW4yIC8gZGV0ZXJtaW5hbnQsIG4xeG4yID0gZDNfZ2VvX2NhcnRlc2lhbkNyb3NzKG4xLCBuMiksIEEgPSBkM19nZW9fY2FydGVzaWFuU2NhbGUobjEsIGMxKSwgQiA9IGQzX2dlb19jYXJ0ZXNpYW5TY2FsZShuMiwgYzIpO1xuICAgICAgZDNfZ2VvX2NhcnRlc2lhbkFkZChBLCBCKTtcbiAgICAgIHZhciB1ID0gbjF4bjIsIHcgPSBkM19nZW9fY2FydGVzaWFuRG90KEEsIHUpLCB1dSA9IGQzX2dlb19jYXJ0ZXNpYW5Eb3QodSwgdSksIHQyID0gdyAqIHcgLSB1dSAqIChkM19nZW9fY2FydGVzaWFuRG90KEEsIEEpIC0gMSk7XG4gICAgICBpZiAodDIgPCAwKSByZXR1cm47XG4gICAgICB2YXIgdCA9IE1hdGguc3FydCh0MiksIHEgPSBkM19nZW9fY2FydGVzaWFuU2NhbGUodSwgKC13IC0gdCkgLyB1dSk7XG4gICAgICBkM19nZW9fY2FydGVzaWFuQWRkKHEsIEEpO1xuICAgICAgcSA9IGQzX2dlb19zcGhlcmljYWwocSk7XG4gICAgICBpZiAoIXR3bykgcmV0dXJuIHE7XG4gICAgICB2YXIgzrswID0gYVswXSwgzrsxID0gYlswXSwgz4YwID0gYVsxXSwgz4YxID0gYlsxXSwgejtcbiAgICAgIGlmICjOuzEgPCDOuzApIHogPSDOuzAsIM67MCA9IM67MSwgzrsxID0gejtcbiAgICAgIHZhciDOtM67ID0gzrsxIC0gzrswLCBwb2xhciA9IE1hdGguYWJzKM60zrsgLSDPgCkgPCDOtSwgbWVyaWRpYW4gPSBwb2xhciB8fCDOtM67IDwgzrU7XG4gICAgICBpZiAoIXBvbGFyICYmIM+GMSA8IM+GMCkgeiA9IM+GMCwgz4YwID0gz4YxLCDPhjEgPSB6O1xuICAgICAgaWYgKG1lcmlkaWFuID8gcG9sYXIgPyDPhjAgKyDPhjEgPiAwIF4gcVsxXSA8IChNYXRoLmFicyhxWzBdIC0gzrswKSA8IM61ID8gz4YwIDogz4YxKSA6IM+GMCA8PSBxWzFdICYmIHFbMV0gPD0gz4YxIDogzrTOuyA+IM+AIF4gKM67MCA8PSBxWzBdICYmIHFbMF0gPD0gzrsxKSkge1xuICAgICAgICB2YXIgcTEgPSBkM19nZW9fY2FydGVzaWFuU2NhbGUodSwgKC13ICsgdCkgLyB1dSk7XG4gICAgICAgIGQzX2dlb19jYXJ0ZXNpYW5BZGQocTEsIEEpO1xuICAgICAgICByZXR1cm4gWyBxLCBkM19nZW9fc3BoZXJpY2FsKHExKSBdO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBjb2RlKM67LCDPhikge1xuICAgICAgdmFyIHIgPSBzbWFsbFJhZGl1cyA/IHJhZGl1cyA6IM+AIC0gcmFkaXVzLCBjb2RlID0gMDtcbiAgICAgIGlmICjOuyA8IC1yKSBjb2RlIHw9IDE7IGVsc2UgaWYgKM67ID4gcikgY29kZSB8PSAyO1xuICAgICAgaWYgKM+GIDwgLXIpIGNvZGUgfD0gNDsgZWxzZSBpZiAoz4YgPiByKSBjb2RlIHw9IDg7XG4gICAgICByZXR1cm4gY29kZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcG9seWdvbkNvbnRhaW5zKHBvbHlnb24pIHtcbiAgICAgIHJldHVybiBkM19nZW9fcG9pbnRJblBvbHlnb24ocG9pbnQsIHBvbHlnb24pO1xuICAgIH1cbiAgfVxuICB2YXIgZDNfZ2VvX2NsaXBWaWV3TUFYID0gMWU5O1xuICBmdW5jdGlvbiBkM19nZW9fY2xpcFZpZXcoeDAsIHkwLCB4MSwgeTEpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24obGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0ZW5lcl8gPSBsaXN0ZW5lciwgYnVmZmVyTGlzdGVuZXIgPSBkM19nZW9fY2xpcEJ1ZmZlckxpc3RlbmVyKCksIHNlZ21lbnRzLCBwb2x5Z29uLCByaW5nO1xuICAgICAgdmFyIGNsaXAgPSB7XG4gICAgICAgIHBvaW50OiBwb2ludCxcbiAgICAgICAgbGluZVN0YXJ0OiBsaW5lU3RhcnQsXG4gICAgICAgIGxpbmVFbmQ6IGxpbmVFbmQsXG4gICAgICAgIHBvbHlnb25TdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbGlzdGVuZXIgPSBidWZmZXJMaXN0ZW5lcjtcbiAgICAgICAgICBzZWdtZW50cyA9IFtdO1xuICAgICAgICAgIHBvbHlnb24gPSBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgcG9seWdvbkVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbGlzdGVuZXIgPSBsaXN0ZW5lcl87XG4gICAgICAgICAgaWYgKChzZWdtZW50cyA9IGQzLm1lcmdlKHNlZ21lbnRzKSkubGVuZ3RoKSB7XG4gICAgICAgICAgICBsaXN0ZW5lci5wb2x5Z29uU3RhcnQoKTtcbiAgICAgICAgICAgIGQzX2dlb19jbGlwUG9seWdvbihzZWdtZW50cywgY29tcGFyZSwgaW5zaWRlLCBpbnRlcnBvbGF0ZSwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgbGlzdGVuZXIucG9seWdvbkVuZCgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaW5zaWRlUG9seWdvbihbIHgwLCB5MCBdKSkge1xuICAgICAgICAgICAgbGlzdGVuZXIucG9seWdvblN0YXJ0KCksIGxpc3RlbmVyLmxpbmVTdGFydCgpO1xuICAgICAgICAgICAgaW50ZXJwb2xhdGUobnVsbCwgbnVsbCwgMSwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgbGlzdGVuZXIubGluZUVuZCgpLCBsaXN0ZW5lci5wb2x5Z29uRW5kKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNlZ21lbnRzID0gcG9seWdvbiA9IHJpbmcgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgZnVuY3Rpb24gaW5zaWRlKHBvaW50KSB7XG4gICAgICAgIHZhciBhID0gY29ybmVyKHBvaW50LCAtMSksIGkgPSBpbnNpZGVQb2x5Z29uKFsgYSA9PT0gMCB8fCBhID09PSAzID8geDAgOiB4MSwgYSA+IDEgPyB5MSA6IHkwIF0pO1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGluc2lkZVBvbHlnb24ocCkge1xuICAgICAgICB2YXIgd24gPSAwLCBuID0gcG9seWdvbi5sZW5ndGgsIHkgPSBwWzFdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgICAgIGZvciAodmFyIGogPSAxLCB2ID0gcG9seWdvbltpXSwgbSA9IHYubGVuZ3RoLCBhID0gdlswXSwgYjsgaiA8IG07ICsraikge1xuICAgICAgICAgICAgYiA9IHZbal07XG4gICAgICAgICAgICBpZiAoYVsxXSA8PSB5KSB7XG4gICAgICAgICAgICAgIGlmIChiWzFdID4geSAmJiBpc0xlZnQoYSwgYiwgcCkgPiAwKSArK3duO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGJbMV0gPD0geSAmJiBpc0xlZnQoYSwgYiwgcCkgPCAwKSAtLXduO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYSA9IGI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3biAhPT0gMDtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGlzTGVmdChhLCBiLCBjKSB7XG4gICAgICAgIHJldHVybiAoYlswXSAtIGFbMF0pICogKGNbMV0gLSBhWzFdKSAtIChjWzBdIC0gYVswXSkgKiAoYlsxXSAtIGFbMV0pO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gaW50ZXJwb2xhdGUoZnJvbSwgdG8sIGRpcmVjdGlvbiwgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGEgPSAwLCBhMSA9IDA7XG4gICAgICAgIGlmIChmcm9tID09IG51bGwgfHwgKGEgPSBjb3JuZXIoZnJvbSwgZGlyZWN0aW9uKSkgIT09IChhMSA9IGNvcm5lcih0bywgZGlyZWN0aW9uKSkgfHwgY29tcGFyZVBvaW50cyhmcm9tLCB0bykgPCAwIF4gZGlyZWN0aW9uID4gMCkge1xuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgIGxpc3RlbmVyLnBvaW50KGEgPT09IDAgfHwgYSA9PT0gMyA/IHgwIDogeDEsIGEgPiAxID8geTEgOiB5MCk7XG4gICAgICAgICAgfSB3aGlsZSAoKGEgPSAoYSArIGRpcmVjdGlvbiArIDQpICUgNCkgIT09IGExKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaXN0ZW5lci5wb2ludCh0b1swXSwgdG9bMV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiB2aXNpYmxlKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIHgwIDw9IHggJiYgeCA8PSB4MSAmJiB5MCA8PSB5ICYmIHkgPD0geTE7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBwb2ludCh4LCB5KSB7XG4gICAgICAgIGlmICh2aXNpYmxlKHgsIHkpKSBsaXN0ZW5lci5wb2ludCh4LCB5KTtcbiAgICAgIH1cbiAgICAgIHZhciB4X18sIHlfXywgdl9fLCB4XywgeV8sIHZfLCBmaXJzdDtcbiAgICAgIGZ1bmN0aW9uIGxpbmVTdGFydCgpIHtcbiAgICAgICAgY2xpcC5wb2ludCA9IGxpbmVQb2ludDtcbiAgICAgICAgaWYgKHBvbHlnb24pIHBvbHlnb24ucHVzaChyaW5nID0gW10pO1xuICAgICAgICBmaXJzdCA9IHRydWU7XG4gICAgICAgIHZfID0gZmFsc2U7XG4gICAgICAgIHhfID0geV8gPSBOYU47XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBsaW5lRW5kKCkge1xuICAgICAgICBpZiAoc2VnbWVudHMpIHtcbiAgICAgICAgICBsaW5lUG9pbnQoeF9fLCB5X18pO1xuICAgICAgICAgIGlmICh2X18gJiYgdl8pIGJ1ZmZlckxpc3RlbmVyLnJlam9pbigpO1xuICAgICAgICAgIHNlZ21lbnRzLnB1c2goYnVmZmVyTGlzdGVuZXIuYnVmZmVyKCkpO1xuICAgICAgICB9XG4gICAgICAgIGNsaXAucG9pbnQgPSBwb2ludDtcbiAgICAgICAgaWYgKHZfKSBsaXN0ZW5lci5saW5lRW5kKCk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBsaW5lUG9pbnQoeCwgeSkge1xuICAgICAgICB4ID0gTWF0aC5tYXgoLWQzX2dlb19jbGlwVmlld01BWCwgTWF0aC5taW4oZDNfZ2VvX2NsaXBWaWV3TUFYLCB4KSk7XG4gICAgICAgIHkgPSBNYXRoLm1heCgtZDNfZ2VvX2NsaXBWaWV3TUFYLCBNYXRoLm1pbihkM19nZW9fY2xpcFZpZXdNQVgsIHkpKTtcbiAgICAgICAgdmFyIHYgPSB2aXNpYmxlKHgsIHkpO1xuICAgICAgICBpZiAocG9seWdvbikgcmluZy5wdXNoKFsgeCwgeSBdKTtcbiAgICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgeF9fID0geCwgeV9fID0geSwgdl9fID0gdjtcbiAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICBsaXN0ZW5lci5saW5lU3RhcnQoKTtcbiAgICAgICAgICAgIGxpc3RlbmVyLnBvaW50KHgsIHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodiAmJiB2XykgbGlzdGVuZXIucG9pbnQoeCwgeSk7IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGEgPSBbIHhfLCB5XyBdLCBiID0gWyB4LCB5IF07XG4gICAgICAgICAgICBpZiAoY2xpcExpbmUoYSwgYikpIHtcbiAgICAgICAgICAgICAgaWYgKCF2Xykge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpbmVTdGFydCgpO1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLnBvaW50KGFbMF0sIGFbMV0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGxpc3RlbmVyLnBvaW50KGJbMF0sIGJbMV0pO1xuICAgICAgICAgICAgICBpZiAoIXYpIGxpc3RlbmVyLmxpbmVFbmQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodikge1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saW5lU3RhcnQoKTtcbiAgICAgICAgICAgICAgbGlzdGVuZXIucG9pbnQoeCwgeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHhfID0geCwgeV8gPSB5LCB2XyA9IHY7XG4gICAgICB9XG4gICAgICByZXR1cm4gY2xpcDtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGNvcm5lcihwLCBkaXJlY3Rpb24pIHtcbiAgICAgIHJldHVybiBNYXRoLmFicyhwWzBdIC0geDApIDwgzrUgPyBkaXJlY3Rpb24gPiAwID8gMCA6IDMgOiBNYXRoLmFicyhwWzBdIC0geDEpIDwgzrUgPyBkaXJlY3Rpb24gPiAwID8gMiA6IDEgOiBNYXRoLmFicyhwWzFdIC0geTApIDwgzrUgPyBkaXJlY3Rpb24gPiAwID8gMSA6IDAgOiBkaXJlY3Rpb24gPiAwID8gMyA6IDI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbXBhcmUoYSwgYikge1xuICAgICAgcmV0dXJuIGNvbXBhcmVQb2ludHMoYS5wb2ludCwgYi5wb2ludCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbXBhcmVQb2ludHMoYSwgYikge1xuICAgICAgdmFyIGNhID0gY29ybmVyKGEsIDEpLCBjYiA9IGNvcm5lcihiLCAxKTtcbiAgICAgIHJldHVybiBjYSAhPT0gY2IgPyBjYSAtIGNiIDogY2EgPT09IDAgPyBiWzFdIC0gYVsxXSA6IGNhID09PSAxID8gYVswXSAtIGJbMF0gOiBjYSA9PT0gMiA/IGFbMV0gLSBiWzFdIDogYlswXSAtIGFbMF07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNsaXBMaW5lKGEsIGIpIHtcbiAgICAgIHZhciBkeCA9IGJbMF0gLSBhWzBdLCBkeSA9IGJbMV0gLSBhWzFdLCB0ID0gWyAwLCAxIF07XG4gICAgICBpZiAoTWF0aC5hYnMoZHgpIDwgzrUgJiYgTWF0aC5hYnMoZHkpIDwgzrUpIHJldHVybiB4MCA8PSBhWzBdICYmIGFbMF0gPD0geDEgJiYgeTAgPD0gYVsxXSAmJiBhWzFdIDw9IHkxO1xuICAgICAgaWYgKGQzX2dlb19jbGlwVmlld1QoeDAgLSBhWzBdLCBkeCwgdCkgJiYgZDNfZ2VvX2NsaXBWaWV3VChhWzBdIC0geDEsIC1keCwgdCkgJiYgZDNfZ2VvX2NsaXBWaWV3VCh5MCAtIGFbMV0sIGR5LCB0KSAmJiBkM19nZW9fY2xpcFZpZXdUKGFbMV0gLSB5MSwgLWR5LCB0KSkge1xuICAgICAgICBpZiAodFsxXSA8IDEpIHtcbiAgICAgICAgICBiWzBdID0gYVswXSArIHRbMV0gKiBkeDtcbiAgICAgICAgICBiWzFdID0gYVsxXSArIHRbMV0gKiBkeTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodFswXSA+IDApIHtcbiAgICAgICAgICBhWzBdICs9IHRbMF0gKiBkeDtcbiAgICAgICAgICBhWzFdICs9IHRbMF0gKiBkeTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX2NsaXBWaWV3VChudW0sIGRlbm9taW5hdG9yLCB0KSB7XG4gICAgaWYgKE1hdGguYWJzKGRlbm9taW5hdG9yKSA8IM61KSByZXR1cm4gbnVtIDw9IDA7XG4gICAgdmFyIHUgPSBudW0gLyBkZW5vbWluYXRvcjtcbiAgICBpZiAoZGVub21pbmF0b3IgPiAwKSB7XG4gICAgICBpZiAodSA+IHRbMV0pIHJldHVybiBmYWxzZTtcbiAgICAgIGlmICh1ID4gdFswXSkgdFswXSA9IHU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh1IDwgdFswXSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKHUgPCB0WzFdKSB0WzFdID0gdTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX2NvbXBvc2UoYSwgYikge1xuICAgIGZ1bmN0aW9uIGNvbXBvc2UoeCwgeSkge1xuICAgICAgcmV0dXJuIHggPSBhKHgsIHkpLCBiKHhbMF0sIHhbMV0pO1xuICAgIH1cbiAgICBpZiAoYS5pbnZlcnQgJiYgYi5pbnZlcnQpIGNvbXBvc2UuaW52ZXJ0ID0gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgcmV0dXJuIHggPSBiLmludmVydCh4LCB5KSwgeCAmJiBhLmludmVydCh4WzBdLCB4WzFdKTtcbiAgICB9O1xuICAgIHJldHVybiBjb21wb3NlO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19jb25pYyhwcm9qZWN0QXQpIHtcbiAgICB2YXIgz4YwID0gMCwgz4YxID0gz4AgLyAzLCBtID0gZDNfZ2VvX3Byb2plY3Rpb25NdXRhdG9yKHByb2plY3RBdCksIHAgPSBtKM+GMCwgz4YxKTtcbiAgICBwLnBhcmFsbGVscyA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIFsgz4YwIC8gz4AgKiAxODAsIM+GMSAvIM+AICogMTgwIF07XG4gICAgICByZXR1cm4gbSjPhjAgPSBfWzBdICogz4AgLyAxODAsIM+GMSA9IF9bMV0gKiDPgCAvIDE4MCk7XG4gICAgfTtcbiAgICByZXR1cm4gcDtcbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fY29uaWNFcXVhbEFyZWEoz4YwLCDPhjEpIHtcbiAgICB2YXIgc2luz4YwID0gTWF0aC5zaW4oz4YwKSwgbiA9IChzaW7PhjAgKyBNYXRoLnNpbijPhjEpKSAvIDIsIEMgPSAxICsgc2luz4YwICogKDIgKiBuIC0gc2luz4YwKSwgz4EwID0gTWF0aC5zcXJ0KEMpIC8gbjtcbiAgICBmdW5jdGlvbiBmb3J3YXJkKM67LCDPhikge1xuICAgICAgdmFyIM+BID0gTWF0aC5zcXJ0KEMgLSAyICogbiAqIE1hdGguc2luKM+GKSkgLyBuO1xuICAgICAgcmV0dXJuIFsgz4EgKiBNYXRoLnNpbijOuyAqPSBuKSwgz4EwIC0gz4EgKiBNYXRoLmNvcyjOuykgXTtcbiAgICB9XG4gICAgZm9yd2FyZC5pbnZlcnQgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgICB2YXIgz4EwX3kgPSDPgTAgLSB5O1xuICAgICAgcmV0dXJuIFsgTWF0aC5hdGFuMih4LCDPgTBfeSkgLyBuLCBkM19hc2luKChDIC0gKHggKiB4ICsgz4EwX3kgKiDPgTBfeSkgKiBuICogbikgLyAoMiAqIG4pKSBdO1xuICAgIH07XG4gICAgcmV0dXJuIGZvcndhcmQ7XG4gIH1cbiAgKGQzLmdlby5jb25pY0VxdWFsQXJlYSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkM19nZW9fY29uaWMoZDNfZ2VvX2NvbmljRXF1YWxBcmVhKTtcbiAgfSkucmF3ID0gZDNfZ2VvX2NvbmljRXF1YWxBcmVhO1xuICBkMy5nZW8uYWxiZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGQzLmdlby5jb25pY0VxdWFsQXJlYSgpLnJvdGF0ZShbIDk2LCAwIF0pLmNlbnRlcihbIC0uNiwgMzguNyBdKS5wYXJhbGxlbHMoWyAyOS41LCA0NS41IF0pLnNjYWxlKDEwNzApO1xuICB9O1xuICBkMy5nZW8uYWxiZXJzVXNhID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxvd2VyNDggPSBkMy5nZW8uYWxiZXJzKCk7XG4gICAgdmFyIGFsYXNrYSA9IGQzLmdlby5jb25pY0VxdWFsQXJlYSgpLnJvdGF0ZShbIDE1NCwgMCBdKS5jZW50ZXIoWyAtMiwgNTguNSBdKS5wYXJhbGxlbHMoWyA1NSwgNjUgXSk7XG4gICAgdmFyIGhhd2FpaSA9IGQzLmdlby5jb25pY0VxdWFsQXJlYSgpLnJvdGF0ZShbIDE1NywgMCBdKS5jZW50ZXIoWyAtMywgMTkuOSBdKS5wYXJhbGxlbHMoWyA4LCAxOCBdKTtcbiAgICB2YXIgcG9pbnQsIHBvaW50U3RyZWFtID0ge1xuICAgICAgcG9pbnQ6IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgcG9pbnQgPSBbIHgsIHkgXTtcbiAgICAgIH1cbiAgICB9LCBsb3dlcjQ4UG9pbnQsIGFsYXNrYVBvaW50LCBoYXdhaWlQb2ludDtcbiAgICBmdW5jdGlvbiBhbGJlcnNVc2EoY29vcmRpbmF0ZXMpIHtcbiAgICAgIHZhciB4ID0gY29vcmRpbmF0ZXNbMF0sIHkgPSBjb29yZGluYXRlc1sxXTtcbiAgICAgIHBvaW50ID0gbnVsbDtcbiAgICAgIChsb3dlcjQ4UG9pbnQoeCwgeSksIHBvaW50KSB8fCAoYWxhc2thUG9pbnQoeCwgeSksIHBvaW50KSB8fCBoYXdhaWlQb2ludCh4LCB5KTtcbiAgICAgIHJldHVybiBwb2ludDtcbiAgICB9XG4gICAgYWxiZXJzVXNhLmludmVydCA9IGZ1bmN0aW9uKGNvb3JkaW5hdGVzKSB7XG4gICAgICB2YXIgayA9IGxvd2VyNDguc2NhbGUoKSwgdCA9IGxvd2VyNDgudHJhbnNsYXRlKCksIHggPSAoY29vcmRpbmF0ZXNbMF0gLSB0WzBdKSAvIGssIHkgPSAoY29vcmRpbmF0ZXNbMV0gLSB0WzFdKSAvIGs7XG4gICAgICByZXR1cm4gKHkgPj0gLjEyICYmIHkgPCAuMjM0ICYmIHggPj0gLS40MjUgJiYgeCA8IC0uMjE0ID8gYWxhc2thIDogeSA+PSAuMTY2ICYmIHkgPCAuMjM0ICYmIHggPj0gLS4yMTQgJiYgeCA8IC0uMTE1ID8gaGF3YWlpIDogbG93ZXI0OCkuaW52ZXJ0KGNvb3JkaW5hdGVzKTtcbiAgICB9O1xuICAgIGFsYmVyc1VzYS5zdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHZhciBsb3dlcjQ4U3RyZWFtID0gbG93ZXI0OC5zdHJlYW0oc3RyZWFtKSwgYWxhc2thU3RyZWFtID0gYWxhc2thLnN0cmVhbShzdHJlYW0pLCBoYXdhaWlTdHJlYW0gPSBoYXdhaWkuc3RyZWFtKHN0cmVhbSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwb2ludDogZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICAgIGxvd2VyNDhTdHJlYW0ucG9pbnQoeCwgeSk7XG4gICAgICAgICAgYWxhc2thU3RyZWFtLnBvaW50KHgsIHkpO1xuICAgICAgICAgIGhhd2FpaVN0cmVhbS5wb2ludCh4LCB5KTtcbiAgICAgICAgfSxcbiAgICAgICAgc3BoZXJlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBsb3dlcjQ4U3RyZWFtLnNwaGVyZSgpO1xuICAgICAgICAgIGFsYXNrYVN0cmVhbS5zcGhlcmUoKTtcbiAgICAgICAgICBoYXdhaWlTdHJlYW0uc3BoZXJlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGxpbmVTdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbG93ZXI0OFN0cmVhbS5saW5lU3RhcnQoKTtcbiAgICAgICAgICBhbGFza2FTdHJlYW0ubGluZVN0YXJ0KCk7XG4gICAgICAgICAgaGF3YWlpU3RyZWFtLmxpbmVTdGFydCgpO1xuICAgICAgICB9LFxuICAgICAgICBsaW5lRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBsb3dlcjQ4U3RyZWFtLmxpbmVFbmQoKTtcbiAgICAgICAgICBhbGFza2FTdHJlYW0ubGluZUVuZCgpO1xuICAgICAgICAgIGhhd2FpaVN0cmVhbS5saW5lRW5kKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHBvbHlnb25TdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbG93ZXI0OFN0cmVhbS5wb2x5Z29uU3RhcnQoKTtcbiAgICAgICAgICBhbGFza2FTdHJlYW0ucG9seWdvblN0YXJ0KCk7XG4gICAgICAgICAgaGF3YWlpU3RyZWFtLnBvbHlnb25TdGFydCgpO1xuICAgICAgICB9LFxuICAgICAgICBwb2x5Z29uRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBsb3dlcjQ4U3RyZWFtLnBvbHlnb25FbmQoKTtcbiAgICAgICAgICBhbGFza2FTdHJlYW0ucG9seWdvbkVuZCgpO1xuICAgICAgICAgIGhhd2FpaVN0cmVhbS5wb2x5Z29uRW5kKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgICBhbGJlcnNVc2EucHJlY2lzaW9uID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbG93ZXI0OC5wcmVjaXNpb24oKTtcbiAgICAgIGxvd2VyNDgucHJlY2lzaW9uKF8pO1xuICAgICAgYWxhc2thLnByZWNpc2lvbihfKTtcbiAgICAgIGhhd2FpaS5wcmVjaXNpb24oXyk7XG4gICAgICByZXR1cm4gYWxiZXJzVXNhO1xuICAgIH07XG4gICAgYWxiZXJzVXNhLnNjYWxlID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbG93ZXI0OC5zY2FsZSgpO1xuICAgICAgbG93ZXI0OC5zY2FsZShfKTtcbiAgICAgIGFsYXNrYS5zY2FsZShfICogLjM1KTtcbiAgICAgIGhhd2FpaS5zY2FsZShfKTtcbiAgICAgIHJldHVybiBhbGJlcnNVc2EudHJhbnNsYXRlKGxvd2VyNDgudHJhbnNsYXRlKCkpO1xuICAgIH07XG4gICAgYWxiZXJzVXNhLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGxvd2VyNDgudHJhbnNsYXRlKCk7XG4gICAgICB2YXIgayA9IGxvd2VyNDguc2NhbGUoKSwgeCA9ICtfWzBdLCB5ID0gK19bMV07XG4gICAgICBsb3dlcjQ4UG9pbnQgPSBsb3dlcjQ4LnRyYW5zbGF0ZShfKS5jbGlwRXh0ZW50KFsgWyB4IC0gLjQ1NSAqIGssIHkgLSAuMjM4ICogayBdLCBbIHggKyAuNDU1ICogaywgeSArIC4yMzggKiBrIF0gXSkuc3RyZWFtKHBvaW50U3RyZWFtKS5wb2ludDtcbiAgICAgIGFsYXNrYVBvaW50ID0gYWxhc2thLnRyYW5zbGF0ZShbIHggLSAuMzA3ICogaywgeSArIC4yMDEgKiBrIF0pLmNsaXBFeHRlbnQoWyBbIHggLSAuNDI1ICogayArIM61LCB5ICsgLjEyICogayArIM61IF0sIFsgeCAtIC4yMTQgKiBrIC0gzrUsIHkgKyAuMjM0ICogayAtIM61IF0gXSkuc3RyZWFtKHBvaW50U3RyZWFtKS5wb2ludDtcbiAgICAgIGhhd2FpaVBvaW50ID0gaGF3YWlpLnRyYW5zbGF0ZShbIHggLSAuMjA1ICogaywgeSArIC4yMTIgKiBrIF0pLmNsaXBFeHRlbnQoWyBbIHggLSAuMjE0ICogayArIM61LCB5ICsgLjE2NiAqIGsgKyDOtSBdLCBbIHggLSAuMTE1ICogayAtIM61LCB5ICsgLjIzNCAqIGsgLSDOtSBdIF0pLnN0cmVhbShwb2ludFN0cmVhbSkucG9pbnQ7XG4gICAgICByZXR1cm4gYWxiZXJzVXNhO1xuICAgIH07XG4gICAgcmV0dXJuIGFsYmVyc1VzYS5zY2FsZSgxMDcwKTtcbiAgfTtcbiAgdmFyIGQzX2dlb19wYXRoQXJlYVN1bSwgZDNfZ2VvX3BhdGhBcmVhUG9seWdvbiwgZDNfZ2VvX3BhdGhBcmVhID0ge1xuICAgIHBvaW50OiBkM19ub29wLFxuICAgIGxpbmVTdGFydDogZDNfbm9vcCxcbiAgICBsaW5lRW5kOiBkM19ub29wLFxuICAgIHBvbHlnb25TdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICBkM19nZW9fcGF0aEFyZWFQb2x5Z29uID0gMDtcbiAgICAgIGQzX2dlb19wYXRoQXJlYS5saW5lU3RhcnQgPSBkM19nZW9fcGF0aEFyZWFSaW5nU3RhcnQ7XG4gICAgfSxcbiAgICBwb2x5Z29uRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgIGQzX2dlb19wYXRoQXJlYS5saW5lU3RhcnQgPSBkM19nZW9fcGF0aEFyZWEubGluZUVuZCA9IGQzX2dlb19wYXRoQXJlYS5wb2ludCA9IGQzX25vb3A7XG4gICAgICBkM19nZW9fcGF0aEFyZWFTdW0gKz0gTWF0aC5hYnMoZDNfZ2VvX3BhdGhBcmVhUG9seWdvbiAvIDIpO1xuICAgIH1cbiAgfTtcbiAgZnVuY3Rpb24gZDNfZ2VvX3BhdGhBcmVhUmluZ1N0YXJ0KCkge1xuICAgIHZhciB4MDAsIHkwMCwgeDAsIHkwO1xuICAgIGQzX2dlb19wYXRoQXJlYS5wb2ludCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgIGQzX2dlb19wYXRoQXJlYS5wb2ludCA9IG5leHRQb2ludDtcbiAgICAgIHgwMCA9IHgwID0geCwgeTAwID0geTAgPSB5O1xuICAgIH07XG4gICAgZnVuY3Rpb24gbmV4dFBvaW50KHgsIHkpIHtcbiAgICAgIGQzX2dlb19wYXRoQXJlYVBvbHlnb24gKz0geTAgKiB4IC0geDAgKiB5O1xuICAgICAgeDAgPSB4LCB5MCA9IHk7XG4gICAgfVxuICAgIGQzX2dlb19wYXRoQXJlYS5saW5lRW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICBuZXh0UG9pbnQoeDAwLCB5MDApO1xuICAgIH07XG4gIH1cbiAgdmFyIGQzX2dlb19wYXRoQm91bmRzWDAsIGQzX2dlb19wYXRoQm91bmRzWTAsIGQzX2dlb19wYXRoQm91bmRzWDEsIGQzX2dlb19wYXRoQm91bmRzWTE7XG4gIHZhciBkM19nZW9fcGF0aEJvdW5kcyA9IHtcbiAgICBwb2ludDogZDNfZ2VvX3BhdGhCb3VuZHNQb2ludCxcbiAgICBsaW5lU3RhcnQ6IGQzX25vb3AsXG4gICAgbGluZUVuZDogZDNfbm9vcCxcbiAgICBwb2x5Z29uU3RhcnQ6IGQzX25vb3AsXG4gICAgcG9seWdvbkVuZDogZDNfbm9vcFxuICB9O1xuICBmdW5jdGlvbiBkM19nZW9fcGF0aEJvdW5kc1BvaW50KHgsIHkpIHtcbiAgICBpZiAoeCA8IGQzX2dlb19wYXRoQm91bmRzWDApIGQzX2dlb19wYXRoQm91bmRzWDAgPSB4O1xuICAgIGlmICh4ID4gZDNfZ2VvX3BhdGhCb3VuZHNYMSkgZDNfZ2VvX3BhdGhCb3VuZHNYMSA9IHg7XG4gICAgaWYgKHkgPCBkM19nZW9fcGF0aEJvdW5kc1kwKSBkM19nZW9fcGF0aEJvdW5kc1kwID0geTtcbiAgICBpZiAoeSA+IGQzX2dlb19wYXRoQm91bmRzWTEpIGQzX2dlb19wYXRoQm91bmRzWTEgPSB5O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19wYXRoQnVmZmVyKCkge1xuICAgIHZhciBwb2ludENpcmNsZSA9IGQzX2dlb19wYXRoQnVmZmVyQ2lyY2xlKDQuNSksIGJ1ZmZlciA9IFtdO1xuICAgIHZhciBzdHJlYW0gPSB7XG4gICAgICBwb2ludDogcG9pbnQsXG4gICAgICBsaW5lU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBzdHJlYW0ucG9pbnQgPSBwb2ludExpbmVTdGFydDtcbiAgICAgIH0sXG4gICAgICBsaW5lRW5kOiBsaW5lRW5kLFxuICAgICAgcG9seWdvblN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgc3RyZWFtLmxpbmVFbmQgPSBsaW5lRW5kUG9seWdvbjtcbiAgICAgIH0sXG4gICAgICBwb2x5Z29uRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgc3RyZWFtLmxpbmVFbmQgPSBsaW5lRW5kO1xuICAgICAgICBzdHJlYW0ucG9pbnQgPSBwb2ludDtcbiAgICAgIH0sXG4gICAgICBwb2ludFJhZGl1czogZnVuY3Rpb24oXykge1xuICAgICAgICBwb2ludENpcmNsZSA9IGQzX2dlb19wYXRoQnVmZmVyQ2lyY2xlKF8pO1xuICAgICAgICByZXR1cm4gc3RyZWFtO1xuICAgICAgfSxcbiAgICAgIHJlc3VsdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IGJ1ZmZlci5qb2luKFwiXCIpO1xuICAgICAgICAgIGJ1ZmZlciA9IFtdO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIGZ1bmN0aW9uIHBvaW50KHgsIHkpIHtcbiAgICAgIGJ1ZmZlci5wdXNoKFwiTVwiLCB4LCBcIixcIiwgeSwgcG9pbnRDaXJjbGUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwb2ludExpbmVTdGFydCh4LCB5KSB7XG4gICAgICBidWZmZXIucHVzaChcIk1cIiwgeCwgXCIsXCIsIHkpO1xuICAgICAgc3RyZWFtLnBvaW50ID0gcG9pbnRMaW5lO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwb2ludExpbmUoeCwgeSkge1xuICAgICAgYnVmZmVyLnB1c2goXCJMXCIsIHgsIFwiLFwiLCB5KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbGluZUVuZCgpIHtcbiAgICAgIHN0cmVhbS5wb2ludCA9IHBvaW50O1xuICAgIH1cbiAgICBmdW5jdGlvbiBsaW5lRW5kUG9seWdvbigpIHtcbiAgICAgIGJ1ZmZlci5wdXNoKFwiWlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cmVhbTtcbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fcGF0aEJ1ZmZlckNpcmNsZShyYWRpdXMpIHtcbiAgICByZXR1cm4gXCJtMCxcIiArIHJhZGl1cyArIFwiYVwiICsgcmFkaXVzICsgXCIsXCIgKyByYWRpdXMgKyBcIiAwIDEsMSAwLFwiICsgLTIgKiByYWRpdXMgKyBcImFcIiArIHJhZGl1cyArIFwiLFwiICsgcmFkaXVzICsgXCIgMCAxLDEgMCxcIiArIDIgKiByYWRpdXMgKyBcInpcIjtcbiAgfVxuICB2YXIgZDNfZ2VvX3BhdGhDZW50cm9pZCA9IHtcbiAgICBwb2ludDogZDNfZ2VvX3BhdGhDZW50cm9pZFBvaW50LFxuICAgIGxpbmVTdGFydDogZDNfZ2VvX3BhdGhDZW50cm9pZExpbmVTdGFydCxcbiAgICBsaW5lRW5kOiBkM19nZW9fcGF0aENlbnRyb2lkTGluZUVuZCxcbiAgICBwb2x5Z29uU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgZDNfZ2VvX3BhdGhDZW50cm9pZC5saW5lU3RhcnQgPSBkM19nZW9fcGF0aENlbnRyb2lkUmluZ1N0YXJ0O1xuICAgIH0sXG4gICAgcG9seWdvbkVuZDogZnVuY3Rpb24oKSB7XG4gICAgICBkM19nZW9fcGF0aENlbnRyb2lkLnBvaW50ID0gZDNfZ2VvX3BhdGhDZW50cm9pZFBvaW50O1xuICAgICAgZDNfZ2VvX3BhdGhDZW50cm9pZC5saW5lU3RhcnQgPSBkM19nZW9fcGF0aENlbnRyb2lkTGluZVN0YXJ0O1xuICAgICAgZDNfZ2VvX3BhdGhDZW50cm9pZC5saW5lRW5kID0gZDNfZ2VvX3BhdGhDZW50cm9pZExpbmVFbmQ7XG4gICAgfVxuICB9O1xuICBmdW5jdGlvbiBkM19nZW9fcGF0aENlbnRyb2lkUG9pbnQoeCwgeSkge1xuICAgIGQzX2dlb19jZW50cm9pZFgwICs9IHg7XG4gICAgZDNfZ2VvX2NlbnRyb2lkWTAgKz0geTtcbiAgICArK2QzX2dlb19jZW50cm9pZFowO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19wYXRoQ2VudHJvaWRMaW5lU3RhcnQoKSB7XG4gICAgdmFyIHgwLCB5MDtcbiAgICBkM19nZW9fcGF0aENlbnRyb2lkLnBvaW50ID0gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgZDNfZ2VvX3BhdGhDZW50cm9pZC5wb2ludCA9IG5leHRQb2ludDtcbiAgICAgIGQzX2dlb19wYXRoQ2VudHJvaWRQb2ludCh4MCA9IHgsIHkwID0geSk7XG4gICAgfTtcbiAgICBmdW5jdGlvbiBuZXh0UG9pbnQoeCwgeSkge1xuICAgICAgdmFyIGR4ID0geCAtIHgwLCBkeSA9IHkgLSB5MCwgeiA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICBkM19nZW9fY2VudHJvaWRYMSArPSB6ICogKHgwICsgeCkgLyAyO1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkWTEgKz0geiAqICh5MCArIHkpIC8gMjtcbiAgICAgIGQzX2dlb19jZW50cm9pZFoxICs9IHo7XG4gICAgICBkM19nZW9fcGF0aENlbnRyb2lkUG9pbnQoeDAgPSB4LCB5MCA9IHkpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fcGF0aENlbnRyb2lkTGluZUVuZCgpIHtcbiAgICBkM19nZW9fcGF0aENlbnRyb2lkLnBvaW50ID0gZDNfZ2VvX3BhdGhDZW50cm9pZFBvaW50O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19wYXRoQ2VudHJvaWRSaW5nU3RhcnQoKSB7XG4gICAgdmFyIHgwMCwgeTAwLCB4MCwgeTA7XG4gICAgZDNfZ2VvX3BhdGhDZW50cm9pZC5wb2ludCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgIGQzX2dlb19wYXRoQ2VudHJvaWQucG9pbnQgPSBuZXh0UG9pbnQ7XG4gICAgICBkM19nZW9fcGF0aENlbnRyb2lkUG9pbnQoeDAwID0geDAgPSB4LCB5MDAgPSB5MCA9IHkpO1xuICAgIH07XG4gICAgZnVuY3Rpb24gbmV4dFBvaW50KHgsIHkpIHtcbiAgICAgIHZhciBkeCA9IHggLSB4MCwgZHkgPSB5IC0geTAsIHogPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkWDEgKz0geiAqICh4MCArIHgpIC8gMjtcbiAgICAgIGQzX2dlb19jZW50cm9pZFkxICs9IHogKiAoeTAgKyB5KSAvIDI7XG4gICAgICBkM19nZW9fY2VudHJvaWRaMSArPSB6O1xuICAgICAgeiA9IHkwICogeCAtIHgwICogeTtcbiAgICAgIGQzX2dlb19jZW50cm9pZFgyICs9IHogKiAoeDAgKyB4KTtcbiAgICAgIGQzX2dlb19jZW50cm9pZFkyICs9IHogKiAoeTAgKyB5KTtcbiAgICAgIGQzX2dlb19jZW50cm9pZFoyICs9IHogKiAzO1xuICAgICAgZDNfZ2VvX3BhdGhDZW50cm9pZFBvaW50KHgwID0geCwgeTAgPSB5KTtcbiAgICB9XG4gICAgZDNfZ2VvX3BhdGhDZW50cm9pZC5saW5lRW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICBuZXh0UG9pbnQoeDAwLCB5MDApO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX3BhdGhDb250ZXh0KGNvbnRleHQpIHtcbiAgICB2YXIgcG9pbnRSYWRpdXMgPSA0LjU7XG4gICAgdmFyIHN0cmVhbSA9IHtcbiAgICAgIHBvaW50OiBwb2ludCxcbiAgICAgIGxpbmVTdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHN0cmVhbS5wb2ludCA9IHBvaW50TGluZVN0YXJ0O1xuICAgICAgfSxcbiAgICAgIGxpbmVFbmQ6IGxpbmVFbmQsXG4gICAgICBwb2x5Z29uU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBzdHJlYW0ubGluZUVuZCA9IGxpbmVFbmRQb2x5Z29uO1xuICAgICAgfSxcbiAgICAgIHBvbHlnb25FbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBzdHJlYW0ubGluZUVuZCA9IGxpbmVFbmQ7XG4gICAgICAgIHN0cmVhbS5wb2ludCA9IHBvaW50O1xuICAgICAgfSxcbiAgICAgIHBvaW50UmFkaXVzOiBmdW5jdGlvbihfKSB7XG4gICAgICAgIHBvaW50UmFkaXVzID0gXztcbiAgICAgICAgcmV0dXJuIHN0cmVhbTtcbiAgICAgIH0sXG4gICAgICByZXN1bHQ6IGQzX25vb3BcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHBvaW50KHgsIHkpIHtcbiAgICAgIGNvbnRleHQubW92ZVRvKHgsIHkpO1xuICAgICAgY29udGV4dC5hcmMoeCwgeSwgcG9pbnRSYWRpdXMsIDAsIDIgKiDPgCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBvaW50TGluZVN0YXJ0KHgsIHkpIHtcbiAgICAgIGNvbnRleHQubW92ZVRvKHgsIHkpO1xuICAgICAgc3RyZWFtLnBvaW50ID0gcG9pbnRMaW5lO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwb2ludExpbmUoeCwgeSkge1xuICAgICAgY29udGV4dC5saW5lVG8oeCwgeSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxpbmVFbmQoKSB7XG4gICAgICBzdHJlYW0ucG9pbnQgPSBwb2ludDtcbiAgICB9XG4gICAgZnVuY3Rpb24gbGluZUVuZFBvbHlnb24oKSB7XG4gICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIH1cbiAgICByZXR1cm4gc3RyZWFtO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19yZXNhbXBsZShwcm9qZWN0KSB7XG4gICAgdmFyIM60MiA9IC41LCBjb3NNaW5EaXN0YW5jZSA9IE1hdGguY29zKDMwICogZDNfcmFkaWFucyksIG1heERlcHRoID0gMTY7XG4gICAgZnVuY3Rpb24gcmVzYW1wbGUoc3RyZWFtKSB7XG4gICAgICB2YXIgzrswMCwgz4YwMCwgeDAwLCB5MDAsIGEwMCwgYjAwLCBjMDAsIM67MCwgeDAsIHkwLCBhMCwgYjAsIGMwO1xuICAgICAgdmFyIHJlc2FtcGxlID0ge1xuICAgICAgICBwb2ludDogcG9pbnQsXG4gICAgICAgIGxpbmVTdGFydDogbGluZVN0YXJ0LFxuICAgICAgICBsaW5lRW5kOiBsaW5lRW5kLFxuICAgICAgICBwb2x5Z29uU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHN0cmVhbS5wb2x5Z29uU3RhcnQoKTtcbiAgICAgICAgICByZXNhbXBsZS5saW5lU3RhcnQgPSByaW5nU3RhcnQ7XG4gICAgICAgIH0sXG4gICAgICAgIHBvbHlnb25FbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHN0cmVhbS5wb2x5Z29uRW5kKCk7XG4gICAgICAgICAgcmVzYW1wbGUubGluZVN0YXJ0ID0gbGluZVN0YXJ0O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgZnVuY3Rpb24gcG9pbnQoeCwgeSkge1xuICAgICAgICB4ID0gcHJvamVjdCh4LCB5KTtcbiAgICAgICAgc3RyZWFtLnBvaW50KHhbMF0sIHhbMV0pO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gbGluZVN0YXJ0KCkge1xuICAgICAgICB4MCA9IE5hTjtcbiAgICAgICAgcmVzYW1wbGUucG9pbnQgPSBsaW5lUG9pbnQ7XG4gICAgICAgIHN0cmVhbS5saW5lU3RhcnQoKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGxpbmVQb2ludCjOuywgz4YpIHtcbiAgICAgICAgdmFyIGMgPSBkM19nZW9fY2FydGVzaWFuKFsgzrssIM+GIF0pLCBwID0gcHJvamVjdCjOuywgz4YpO1xuICAgICAgICByZXNhbXBsZUxpbmVUbyh4MCwgeTAsIM67MCwgYTAsIGIwLCBjMCwgeDAgPSBwWzBdLCB5MCA9IHBbMV0sIM67MCA9IM67LCBhMCA9IGNbMF0sIGIwID0gY1sxXSwgYzAgPSBjWzJdLCBtYXhEZXB0aCwgc3RyZWFtKTtcbiAgICAgICAgc3RyZWFtLnBvaW50KHgwLCB5MCk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBsaW5lRW5kKCkge1xuICAgICAgICByZXNhbXBsZS5wb2ludCA9IHBvaW50O1xuICAgICAgICBzdHJlYW0ubGluZUVuZCgpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gcmluZ1N0YXJ0KCkge1xuICAgICAgICBsaW5lU3RhcnQoKTtcbiAgICAgICAgcmVzYW1wbGUucG9pbnQgPSByaW5nUG9pbnQ7XG4gICAgICAgIHJlc2FtcGxlLmxpbmVFbmQgPSByaW5nRW5kO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gcmluZ1BvaW50KM67LCDPhikge1xuICAgICAgICBsaW5lUG9pbnQozrswMCA9IM67LCDPhjAwID0gz4YpLCB4MDAgPSB4MCwgeTAwID0geTAsIGEwMCA9IGEwLCBiMDAgPSBiMCwgYzAwID0gYzA7XG4gICAgICAgIHJlc2FtcGxlLnBvaW50ID0gbGluZVBvaW50O1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gcmluZ0VuZCgpIHtcbiAgICAgICAgcmVzYW1wbGVMaW5lVG8oeDAsIHkwLCDOuzAsIGEwLCBiMCwgYzAsIHgwMCwgeTAwLCDOuzAwLCBhMDAsIGIwMCwgYzAwLCBtYXhEZXB0aCwgc3RyZWFtKTtcbiAgICAgICAgcmVzYW1wbGUubGluZUVuZCA9IGxpbmVFbmQ7XG4gICAgICAgIGxpbmVFbmQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNhbXBsZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVzYW1wbGVMaW5lVG8oeDAsIHkwLCDOuzAsIGEwLCBiMCwgYzAsIHgxLCB5MSwgzrsxLCBhMSwgYjEsIGMxLCBkZXB0aCwgc3RyZWFtKSB7XG4gICAgICB2YXIgZHggPSB4MSAtIHgwLCBkeSA9IHkxIC0geTAsIGQyID0gZHggKiBkeCArIGR5ICogZHk7XG4gICAgICBpZiAoZDIgPiA0ICogzrQyICYmIGRlcHRoLS0pIHtcbiAgICAgICAgdmFyIGEgPSBhMCArIGExLCBiID0gYjAgKyBiMSwgYyA9IGMwICsgYzEsIG0gPSBNYXRoLnNxcnQoYSAqIGEgKyBiICogYiArIGMgKiBjKSwgz4YyID0gTWF0aC5hc2luKGMgLz0gbSksIM67MiA9IE1hdGguYWJzKE1hdGguYWJzKGMpIC0gMSkgPCDOtSA/ICjOuzAgKyDOuzEpIC8gMiA6IE1hdGguYXRhbjIoYiwgYSksIHAgPSBwcm9qZWN0KM67Miwgz4YyKSwgeDIgPSBwWzBdLCB5MiA9IHBbMV0sIGR4MiA9IHgyIC0geDAsIGR5MiA9IHkyIC0geTAsIGR6ID0gZHkgKiBkeDIgLSBkeCAqIGR5MjtcbiAgICAgICAgaWYgKGR6ICogZHogLyBkMiA+IM60MiB8fCBNYXRoLmFicygoZHggKiBkeDIgKyBkeSAqIGR5MikgLyBkMiAtIC41KSA+IC4zIHx8IGEwICogYTEgKyBiMCAqIGIxICsgYzAgKiBjMSA8IGNvc01pbkRpc3RhbmNlKSB7XG4gICAgICAgICAgcmVzYW1wbGVMaW5lVG8oeDAsIHkwLCDOuzAsIGEwLCBiMCwgYzAsIHgyLCB5MiwgzrsyLCBhIC89IG0sIGIgLz0gbSwgYywgZGVwdGgsIHN0cmVhbSk7XG4gICAgICAgICAgc3RyZWFtLnBvaW50KHgyLCB5Mik7XG4gICAgICAgICAgcmVzYW1wbGVMaW5lVG8oeDIsIHkyLCDOuzIsIGEsIGIsIGMsIHgxLCB5MSwgzrsxLCBhMSwgYjEsIGMxLCBkZXB0aCwgc3RyZWFtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXNhbXBsZS5wcmVjaXNpb24gPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBNYXRoLnNxcnQozrQyKTtcbiAgICAgIG1heERlcHRoID0gKM60MiA9IF8gKiBfKSA+IDAgJiYgMTY7XG4gICAgICByZXR1cm4gcmVzYW1wbGU7XG4gICAgfTtcbiAgICByZXR1cm4gcmVzYW1wbGU7XG4gIH1cbiAgZDMuZ2VvLnBhdGggPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcG9pbnRSYWRpdXMgPSA0LjUsIHByb2plY3Rpb24sIGNvbnRleHQsIHByb2plY3RTdHJlYW0sIGNvbnRleHRTdHJlYW0sIGNhY2hlU3RyZWFtO1xuICAgIGZ1bmN0aW9uIHBhdGgob2JqZWN0KSB7XG4gICAgICBpZiAob2JqZWN0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcG9pbnRSYWRpdXMgPT09IFwiZnVuY3Rpb25cIikgY29udGV4dFN0cmVhbS5wb2ludFJhZGl1cygrcG9pbnRSYWRpdXMuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgICAgIGlmICghY2FjaGVTdHJlYW0gfHwgIWNhY2hlU3RyZWFtLnZhbGlkKSBjYWNoZVN0cmVhbSA9IHByb2plY3RTdHJlYW0oY29udGV4dFN0cmVhbSk7XG4gICAgICAgIGQzLmdlby5zdHJlYW0ob2JqZWN0LCBjYWNoZVN0cmVhbSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGV4dFN0cmVhbS5yZXN1bHQoKTtcbiAgICB9XG4gICAgcGF0aC5hcmVhID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICBkM19nZW9fcGF0aEFyZWFTdW0gPSAwO1xuICAgICAgZDMuZ2VvLnN0cmVhbShvYmplY3QsIHByb2plY3RTdHJlYW0oZDNfZ2VvX3BhdGhBcmVhKSk7XG4gICAgICByZXR1cm4gZDNfZ2VvX3BhdGhBcmVhU3VtO1xuICAgIH07XG4gICAgcGF0aC5jZW50cm9pZCA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgZDNfZ2VvX2NlbnRyb2lkWDAgPSBkM19nZW9fY2VudHJvaWRZMCA9IGQzX2dlb19jZW50cm9pZFowID0gZDNfZ2VvX2NlbnRyb2lkWDEgPSBkM19nZW9fY2VudHJvaWRZMSA9IGQzX2dlb19jZW50cm9pZFoxID0gZDNfZ2VvX2NlbnRyb2lkWDIgPSBkM19nZW9fY2VudHJvaWRZMiA9IGQzX2dlb19jZW50cm9pZFoyID0gMDtcbiAgICAgIGQzLmdlby5zdHJlYW0ob2JqZWN0LCBwcm9qZWN0U3RyZWFtKGQzX2dlb19wYXRoQ2VudHJvaWQpKTtcbiAgICAgIHJldHVybiBkM19nZW9fY2VudHJvaWRaMiA/IFsgZDNfZ2VvX2NlbnRyb2lkWDIgLyBkM19nZW9fY2VudHJvaWRaMiwgZDNfZ2VvX2NlbnRyb2lkWTIgLyBkM19nZW9fY2VudHJvaWRaMiBdIDogZDNfZ2VvX2NlbnRyb2lkWjEgPyBbIGQzX2dlb19jZW50cm9pZFgxIC8gZDNfZ2VvX2NlbnRyb2lkWjEsIGQzX2dlb19jZW50cm9pZFkxIC8gZDNfZ2VvX2NlbnRyb2lkWjEgXSA6IGQzX2dlb19jZW50cm9pZFowID8gWyBkM19nZW9fY2VudHJvaWRYMCAvIGQzX2dlb19jZW50cm9pZFowLCBkM19nZW9fY2VudHJvaWRZMCAvIGQzX2dlb19jZW50cm9pZFowIF0gOiBbIE5hTiwgTmFOIF07XG4gICAgfTtcbiAgICBwYXRoLmJvdW5kcyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgZDNfZ2VvX3BhdGhCb3VuZHNYMSA9IGQzX2dlb19wYXRoQm91bmRzWTEgPSAtKGQzX2dlb19wYXRoQm91bmRzWDAgPSBkM19nZW9fcGF0aEJvdW5kc1kwID0gSW5maW5pdHkpO1xuICAgICAgZDMuZ2VvLnN0cmVhbShvYmplY3QsIHByb2plY3RTdHJlYW0oZDNfZ2VvX3BhdGhCb3VuZHMpKTtcbiAgICAgIHJldHVybiBbIFsgZDNfZ2VvX3BhdGhCb3VuZHNYMCwgZDNfZ2VvX3BhdGhCb3VuZHNZMCBdLCBbIGQzX2dlb19wYXRoQm91bmRzWDEsIGQzX2dlb19wYXRoQm91bmRzWTEgXSBdO1xuICAgIH07XG4gICAgcGF0aC5wcm9qZWN0aW9uID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gcHJvamVjdGlvbjtcbiAgICAgIHByb2plY3RTdHJlYW0gPSAocHJvamVjdGlvbiA9IF8pID8gXy5zdHJlYW0gfHwgZDNfZ2VvX3BhdGhQcm9qZWN0U3RyZWFtKF8pIDogZDNfaWRlbnRpdHk7XG4gICAgICByZXR1cm4gcmVzZXQoKTtcbiAgICB9O1xuICAgIHBhdGguY29udGV4dCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRleHQ7XG4gICAgICBjb250ZXh0U3RyZWFtID0gKGNvbnRleHQgPSBfKSA9PSBudWxsID8gbmV3IGQzX2dlb19wYXRoQnVmZmVyKCkgOiBuZXcgZDNfZ2VvX3BhdGhDb250ZXh0KF8pO1xuICAgICAgaWYgKHR5cGVvZiBwb2ludFJhZGl1cyAhPT0gXCJmdW5jdGlvblwiKSBjb250ZXh0U3RyZWFtLnBvaW50UmFkaXVzKHBvaW50UmFkaXVzKTtcbiAgICAgIHJldHVybiByZXNldCgpO1xuICAgIH07XG4gICAgcGF0aC5wb2ludFJhZGl1cyA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHBvaW50UmFkaXVzO1xuICAgICAgcG9pbnRSYWRpdXMgPSB0eXBlb2YgXyA9PT0gXCJmdW5jdGlvblwiID8gXyA6IChjb250ZXh0U3RyZWFtLnBvaW50UmFkaXVzKCtfKSwgK18pO1xuICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgIGNhY2hlU3RyZWFtID0gbnVsbDtcbiAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cbiAgICByZXR1cm4gcGF0aC5wcm9qZWN0aW9uKGQzLmdlby5hbGJlcnNVc2EoKSkuY29udGV4dChudWxsKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfZ2VvX3BhdGhQcm9qZWN0U3RyZWFtKHByb2plY3QpIHtcbiAgICB2YXIgcmVzYW1wbGUgPSBkM19nZW9fcmVzYW1wbGUoZnVuY3Rpb24ozrssIM+GKSB7XG4gICAgICByZXR1cm4gcHJvamVjdChbIM67ICogZDNfZGVncmVlcywgz4YgKiBkM19kZWdyZWVzIF0pO1xuICAgIH0pO1xuICAgIHJldHVybiBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHN0cmVhbSA9IHJlc2FtcGxlKHN0cmVhbSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwb2ludDogZnVuY3Rpb24ozrssIM+GKSB7XG4gICAgICAgICAgc3RyZWFtLnBvaW50KM67ICogZDNfcmFkaWFucywgz4YgKiBkM19yYWRpYW5zKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3BoZXJlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzdHJlYW0uc3BoZXJlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGxpbmVTdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc3RyZWFtLmxpbmVTdGFydCgpO1xuICAgICAgICB9LFxuICAgICAgICBsaW5lRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzdHJlYW0ubGluZUVuZCgpO1xuICAgICAgICB9LFxuICAgICAgICBwb2x5Z29uU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHN0cmVhbS5wb2x5Z29uU3RhcnQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgcG9seWdvbkVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc3RyZWFtLnBvbHlnb25FbmQoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICB9XG4gIGQzLmdlby5wcm9qZWN0aW9uID0gZDNfZ2VvX3Byb2plY3Rpb247XG4gIGQzLmdlby5wcm9qZWN0aW9uTXV0YXRvciA9IGQzX2dlb19wcm9qZWN0aW9uTXV0YXRvcjtcbiAgZnVuY3Rpb24gZDNfZ2VvX3Byb2plY3Rpb24ocHJvamVjdCkge1xuICAgIHJldHVybiBkM19nZW9fcHJvamVjdGlvbk11dGF0b3IoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gcHJvamVjdDtcbiAgICB9KSgpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19wcm9qZWN0aW9uTXV0YXRvcihwcm9qZWN0QXQpIHtcbiAgICB2YXIgcHJvamVjdCwgcm90YXRlLCBwcm9qZWN0Um90YXRlLCBwcm9qZWN0UmVzYW1wbGUgPSBkM19nZW9fcmVzYW1wbGUoZnVuY3Rpb24oeCwgeSkge1xuICAgICAgeCA9IHByb2plY3QoeCwgeSk7XG4gICAgICByZXR1cm4gWyB4WzBdICogayArIM60eCwgzrR5IC0geFsxXSAqIGsgXTtcbiAgICB9KSwgayA9IDE1MCwgeCA9IDQ4MCwgeSA9IDI1MCwgzrsgPSAwLCDPhiA9IDAsIM60zrsgPSAwLCDOtM+GID0gMCwgzrTOsyA9IDAsIM60eCwgzrR5LCBwcmVjbGlwID0gZDNfZ2VvX2NsaXBBbnRpbWVyaWRpYW4sIHBvc3RjbGlwID0gZDNfaWRlbnRpdHksIGNsaXBBbmdsZSA9IG51bGwsIGNsaXBFeHRlbnQgPSBudWxsLCBzdHJlYW07XG4gICAgZnVuY3Rpb24gcHJvamVjdGlvbihwb2ludCkge1xuICAgICAgcG9pbnQgPSBwcm9qZWN0Um90YXRlKHBvaW50WzBdICogZDNfcmFkaWFucywgcG9pbnRbMV0gKiBkM19yYWRpYW5zKTtcbiAgICAgIHJldHVybiBbIHBvaW50WzBdICogayArIM60eCwgzrR5IC0gcG9pbnRbMV0gKiBrIF07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGludmVydChwb2ludCkge1xuICAgICAgcG9pbnQgPSBwcm9qZWN0Um90YXRlLmludmVydCgocG9pbnRbMF0gLSDOtHgpIC8gaywgKM60eSAtIHBvaW50WzFdKSAvIGspO1xuICAgICAgcmV0dXJuIHBvaW50ICYmIFsgcG9pbnRbMF0gKiBkM19kZWdyZWVzLCBwb2ludFsxXSAqIGQzX2RlZ3JlZXMgXTtcbiAgICB9XG4gICAgcHJvamVjdGlvbi5zdHJlYW0gPSBmdW5jdGlvbihvdXRwdXQpIHtcbiAgICAgIGlmIChzdHJlYW0pIHN0cmVhbS52YWxpZCA9IGZhbHNlO1xuICAgICAgc3RyZWFtID0gZDNfZ2VvX3Byb2plY3Rpb25SYWRpYW5zUm90YXRlKHJvdGF0ZSwgcHJlY2xpcChwcm9qZWN0UmVzYW1wbGUocG9zdGNsaXAob3V0cHV0KSkpKTtcbiAgICAgIHN0cmVhbS52YWxpZCA9IHRydWU7XG4gICAgICByZXR1cm4gc3RyZWFtO1xuICAgIH07XG4gICAgcHJvamVjdGlvbi5jbGlwQW5nbGUgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjbGlwQW5nbGU7XG4gICAgICBwcmVjbGlwID0gXyA9PSBudWxsID8gKGNsaXBBbmdsZSA9IF8sIGQzX2dlb19jbGlwQW50aW1lcmlkaWFuKSA6IGQzX2dlb19jbGlwQ2lyY2xlKChjbGlwQW5nbGUgPSArXykgKiBkM19yYWRpYW5zKTtcbiAgICAgIHJldHVybiBpbnZhbGlkYXRlKCk7XG4gICAgfTtcbiAgICBwcm9qZWN0aW9uLmNsaXBFeHRlbnQgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjbGlwRXh0ZW50O1xuICAgICAgY2xpcEV4dGVudCA9IF87XG4gICAgICBwb3N0Y2xpcCA9IF8gPT0gbnVsbCA/IGQzX2lkZW50aXR5IDogZDNfZ2VvX2NsaXBWaWV3KF9bMF1bMF0sIF9bMF1bMV0sIF9bMV1bMF0sIF9bMV1bMV0pO1xuICAgICAgcmV0dXJuIGludmFsaWRhdGUoKTtcbiAgICB9O1xuICAgIHByb2plY3Rpb24uc2NhbGUgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBrO1xuICAgICAgayA9ICtfO1xuICAgICAgcmV0dXJuIHJlc2V0KCk7XG4gICAgfTtcbiAgICBwcm9qZWN0aW9uLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIFsgeCwgeSBdO1xuICAgICAgeCA9ICtfWzBdO1xuICAgICAgeSA9ICtfWzFdO1xuICAgICAgcmV0dXJuIHJlc2V0KCk7XG4gICAgfTtcbiAgICBwcm9qZWN0aW9uLmNlbnRlciA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIFsgzrsgKiBkM19kZWdyZWVzLCDPhiAqIGQzX2RlZ3JlZXMgXTtcbiAgICAgIM67ID0gX1swXSAlIDM2MCAqIGQzX3JhZGlhbnM7XG4gICAgICDPhiA9IF9bMV0gJSAzNjAgKiBkM19yYWRpYW5zO1xuICAgICAgcmV0dXJuIHJlc2V0KCk7XG4gICAgfTtcbiAgICBwcm9qZWN0aW9uLnJvdGF0ZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIFsgzrTOuyAqIGQzX2RlZ3JlZXMsIM60z4YgKiBkM19kZWdyZWVzLCDOtM6zICogZDNfZGVncmVlcyBdO1xuICAgICAgzrTOuyA9IF9bMF0gJSAzNjAgKiBkM19yYWRpYW5zO1xuICAgICAgzrTPhiA9IF9bMV0gJSAzNjAgKiBkM19yYWRpYW5zO1xuICAgICAgzrTOsyA9IF8ubGVuZ3RoID4gMiA/IF9bMl0gJSAzNjAgKiBkM19yYWRpYW5zIDogMDtcbiAgICAgIHJldHVybiByZXNldCgpO1xuICAgIH07XG4gICAgZDMucmViaW5kKHByb2plY3Rpb24sIHByb2plY3RSZXNhbXBsZSwgXCJwcmVjaXNpb25cIik7XG4gICAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICBwcm9qZWN0Um90YXRlID0gZDNfZ2VvX2NvbXBvc2Uocm90YXRlID0gZDNfZ2VvX3JvdGF0aW9uKM60zrssIM60z4YsIM60zrMpLCBwcm9qZWN0KTtcbiAgICAgIHZhciBjZW50ZXIgPSBwcm9qZWN0KM67LCDPhik7XG4gICAgICDOtHggPSB4IC0gY2VudGVyWzBdICogaztcbiAgICAgIM60eSA9IHkgKyBjZW50ZXJbMV0gKiBrO1xuICAgICAgcmV0dXJuIGludmFsaWRhdGUoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW52YWxpZGF0ZSgpIHtcbiAgICAgIGlmIChzdHJlYW0pIHtcbiAgICAgICAgc3RyZWFtLnZhbGlkID0gZmFsc2U7XG4gICAgICAgIHN0cmVhbSA9IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvamVjdGlvbjtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcHJvamVjdCA9IHByb2plY3RBdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgcHJvamVjdGlvbi5pbnZlcnQgPSBwcm9qZWN0LmludmVydCAmJiBpbnZlcnQ7XG4gICAgICByZXR1cm4gcmVzZXQoKTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19wcm9qZWN0aW9uUmFkaWFuc1JvdGF0ZShyb3RhdGUsIHN0cmVhbSkge1xuICAgIHJldHVybiB7XG4gICAgICBwb2ludDogZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICB5ID0gcm90YXRlKHggKiBkM19yYWRpYW5zLCB5ICogZDNfcmFkaWFucyksIHggPSB5WzBdO1xuICAgICAgICBzdHJlYW0ucG9pbnQoeCA+IM+AID8geCAtIDIgKiDPgCA6IHggPCAtz4AgPyB4ICsgMiAqIM+AIDogeCwgeVsxXSk7XG4gICAgICB9LFxuICAgICAgc3BoZXJlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgc3RyZWFtLnNwaGVyZSgpO1xuICAgICAgfSxcbiAgICAgIGxpbmVTdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHN0cmVhbS5saW5lU3RhcnQoKTtcbiAgICAgIH0sXG4gICAgICBsaW5lRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgc3RyZWFtLmxpbmVFbmQoKTtcbiAgICAgIH0sXG4gICAgICBwb2x5Z29uU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBzdHJlYW0ucG9seWdvblN0YXJ0KCk7XG4gICAgICB9LFxuICAgICAgcG9seWdvbkVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHN0cmVhbS5wb2x5Z29uRW5kKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fZXF1aXJlY3Rhbmd1bGFyKM67LCDPhikge1xuICAgIHJldHVybiBbIM67LCDPhiBdO1xuICB9XG4gIChkMy5nZW8uZXF1aXJlY3Rhbmd1bGFyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGQzX2dlb19wcm9qZWN0aW9uKGQzX2dlb19lcXVpcmVjdGFuZ3VsYXIpO1xuICB9KS5yYXcgPSBkM19nZW9fZXF1aXJlY3Rhbmd1bGFyLmludmVydCA9IGQzX2dlb19lcXVpcmVjdGFuZ3VsYXI7XG4gIGQzLmdlby5yb3RhdGlvbiA9IGZ1bmN0aW9uKHJvdGF0ZSkge1xuICAgIHJvdGF0ZSA9IGQzX2dlb19yb3RhdGlvbihyb3RhdGVbMF0gJSAzNjAgKiBkM19yYWRpYW5zLCByb3RhdGVbMV0gKiBkM19yYWRpYW5zLCByb3RhdGUubGVuZ3RoID4gMiA/IHJvdGF0ZVsyXSAqIGQzX3JhZGlhbnMgOiAwKTtcbiAgICBmdW5jdGlvbiBmb3J3YXJkKGNvb3JkaW5hdGVzKSB7XG4gICAgICBjb29yZGluYXRlcyA9IHJvdGF0ZShjb29yZGluYXRlc1swXSAqIGQzX3JhZGlhbnMsIGNvb3JkaW5hdGVzWzFdICogZDNfcmFkaWFucyk7XG4gICAgICByZXR1cm4gY29vcmRpbmF0ZXNbMF0gKj0gZDNfZGVncmVlcywgY29vcmRpbmF0ZXNbMV0gKj0gZDNfZGVncmVlcywgY29vcmRpbmF0ZXM7XG4gICAgfVxuICAgIGZvcndhcmQuaW52ZXJ0ID0gZnVuY3Rpb24oY29vcmRpbmF0ZXMpIHtcbiAgICAgIGNvb3JkaW5hdGVzID0gcm90YXRlLmludmVydChjb29yZGluYXRlc1swXSAqIGQzX3JhZGlhbnMsIGNvb3JkaW5hdGVzWzFdICogZDNfcmFkaWFucyk7XG4gICAgICByZXR1cm4gY29vcmRpbmF0ZXNbMF0gKj0gZDNfZGVncmVlcywgY29vcmRpbmF0ZXNbMV0gKj0gZDNfZGVncmVlcywgY29vcmRpbmF0ZXM7XG4gICAgfTtcbiAgICByZXR1cm4gZm9yd2FyZDtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfZ2VvX3JvdGF0aW9uKM60zrssIM60z4YsIM60zrMpIHtcbiAgICByZXR1cm4gzrTOuyA/IM60z4YgfHwgzrTOsyA/IGQzX2dlb19jb21wb3NlKGQzX2dlb19yb3RhdGlvbs67KM60zrspLCBkM19nZW9fcm90YXRpb27Phs6zKM60z4YsIM60zrMpKSA6IGQzX2dlb19yb3RhdGlvbs67KM60zrspIDogzrTPhiB8fCDOtM6zID8gZDNfZ2VvX3JvdGF0aW9uz4bOsyjOtM+GLCDOtM6zKSA6IGQzX2dlb19lcXVpcmVjdGFuZ3VsYXI7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX2ZvcndhcmRSb3RhdGlvbs67KM60zrspIHtcbiAgICByZXR1cm4gZnVuY3Rpb24ozrssIM+GKSB7XG4gICAgICByZXR1cm4gzrsgKz0gzrTOuywgWyDOuyA+IM+AID8gzrsgLSAyICogz4AgOiDOuyA8IC3PgCA/IM67ICsgMiAqIM+AIDogzrssIM+GIF07XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fcm90YXRpb27OuyjOtM67KSB7XG4gICAgdmFyIHJvdGF0aW9uID0gZDNfZ2VvX2ZvcndhcmRSb3RhdGlvbs67KM60zrspO1xuICAgIHJvdGF0aW9uLmludmVydCA9IGQzX2dlb19mb3J3YXJkUm90YXRpb27OuygtzrTOuyk7XG4gICAgcmV0dXJuIHJvdGF0aW9uO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19yb3RhdGlvbs+GzrMozrTPhiwgzrTOsykge1xuICAgIHZhciBjb3POtM+GID0gTWF0aC5jb3MozrTPhiksIHNpbs60z4YgPSBNYXRoLnNpbijOtM+GKSwgY29zzrTOsyA9IE1hdGguY29zKM60zrMpLCBzaW7OtM6zID0gTWF0aC5zaW4ozrTOsyk7XG4gICAgZnVuY3Rpb24gcm90YXRpb24ozrssIM+GKSB7XG4gICAgICB2YXIgY29zz4YgPSBNYXRoLmNvcyjPhiksIHggPSBNYXRoLmNvcyjOuykgKiBjb3PPhiwgeSA9IE1hdGguc2luKM67KSAqIGNvc8+GLCB6ID0gTWF0aC5zaW4oz4YpLCBrID0geiAqIGNvc860z4YgKyB4ICogc2luzrTPhjtcbiAgICAgIHJldHVybiBbIE1hdGguYXRhbjIoeSAqIGNvc860zrMgLSBrICogc2luzrTOsywgeCAqIGNvc860z4YgLSB6ICogc2luzrTPhiksIGQzX2FzaW4oayAqIGNvc860zrMgKyB5ICogc2luzrTOsykgXTtcbiAgICB9XG4gICAgcm90YXRpb24uaW52ZXJ0ID0gZnVuY3Rpb24ozrssIM+GKSB7XG4gICAgICB2YXIgY29zz4YgPSBNYXRoLmNvcyjPhiksIHggPSBNYXRoLmNvcyjOuykgKiBjb3PPhiwgeSA9IE1hdGguc2luKM67KSAqIGNvc8+GLCB6ID0gTWF0aC5zaW4oz4YpLCBrID0geiAqIGNvc860zrMgLSB5ICogc2luzrTOsztcbiAgICAgIHJldHVybiBbIE1hdGguYXRhbjIoeSAqIGNvc860zrMgKyB6ICogc2luzrTOsywgeCAqIGNvc860z4YgKyBrICogc2luzrTPhiksIGQzX2FzaW4oayAqIGNvc860z4YgLSB4ICogc2luzrTPhikgXTtcbiAgICB9O1xuICAgIHJldHVybiByb3RhdGlvbjtcbiAgfVxuICBkMy5nZW8uY2lyY2xlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9yaWdpbiA9IFsgMCwgMCBdLCBhbmdsZSwgcHJlY2lzaW9uID0gNiwgaW50ZXJwb2xhdGU7XG4gICAgZnVuY3Rpb24gY2lyY2xlKCkge1xuICAgICAgdmFyIGNlbnRlciA9IHR5cGVvZiBvcmlnaW4gPT09IFwiZnVuY3Rpb25cIiA/IG9yaWdpbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDogb3JpZ2luLCByb3RhdGUgPSBkM19nZW9fcm90YXRpb24oLWNlbnRlclswXSAqIGQzX3JhZGlhbnMsIC1jZW50ZXJbMV0gKiBkM19yYWRpYW5zLCAwKS5pbnZlcnQsIHJpbmcgPSBbXTtcbiAgICAgIGludGVycG9sYXRlKG51bGwsIG51bGwsIDEsIHtcbiAgICAgICAgcG9pbnQ6IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgICByaW5nLnB1c2goeCA9IHJvdGF0ZSh4LCB5KSk7XG4gICAgICAgICAgeFswXSAqPSBkM19kZWdyZWVzLCB4WzFdICo9IGQzX2RlZ3JlZXM7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJQb2x5Z29uXCIsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBbIHJpbmcgXVxuICAgICAgfTtcbiAgICB9XG4gICAgY2lyY2xlLm9yaWdpbiA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG9yaWdpbjtcbiAgICAgIG9yaWdpbiA9IHg7XG4gICAgICByZXR1cm4gY2lyY2xlO1xuICAgIH07XG4gICAgY2lyY2xlLmFuZ2xlID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gYW5nbGU7XG4gICAgICBpbnRlcnBvbGF0ZSA9IGQzX2dlb19jaXJjbGVJbnRlcnBvbGF0ZSgoYW5nbGUgPSAreCkgKiBkM19yYWRpYW5zLCBwcmVjaXNpb24gKiBkM19yYWRpYW5zKTtcbiAgICAgIHJldHVybiBjaXJjbGU7XG4gICAgfTtcbiAgICBjaXJjbGUucHJlY2lzaW9uID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gcHJlY2lzaW9uO1xuICAgICAgaW50ZXJwb2xhdGUgPSBkM19nZW9fY2lyY2xlSW50ZXJwb2xhdGUoYW5nbGUgKiBkM19yYWRpYW5zLCAocHJlY2lzaW9uID0gK18pICogZDNfcmFkaWFucyk7XG4gICAgICByZXR1cm4gY2lyY2xlO1xuICAgIH07XG4gICAgcmV0dXJuIGNpcmNsZS5hbmdsZSg5MCk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2dlb19jaXJjbGVJbnRlcnBvbGF0ZShyYWRpdXMsIHByZWNpc2lvbikge1xuICAgIHZhciBjciA9IE1hdGguY29zKHJhZGl1cyksIHNyID0gTWF0aC5zaW4ocmFkaXVzKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oZnJvbSwgdG8sIGRpcmVjdGlvbiwgbGlzdGVuZXIpIHtcbiAgICAgIGlmIChmcm9tICE9IG51bGwpIHtcbiAgICAgICAgZnJvbSA9IGQzX2dlb19jaXJjbGVBbmdsZShjciwgZnJvbSk7XG4gICAgICAgIHRvID0gZDNfZ2VvX2NpcmNsZUFuZ2xlKGNyLCB0byk7XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPiAwID8gZnJvbSA8IHRvIDogZnJvbSA+IHRvKSBmcm9tICs9IGRpcmVjdGlvbiAqIDIgKiDPgDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZyb20gPSByYWRpdXMgKyBkaXJlY3Rpb24gKiAyICogz4A7XG4gICAgICAgIHRvID0gcmFkaXVzO1xuICAgICAgfVxuICAgICAgdmFyIHBvaW50O1xuICAgICAgZm9yICh2YXIgc3RlcCA9IGRpcmVjdGlvbiAqIHByZWNpc2lvbiwgdCA9IGZyb207IGRpcmVjdGlvbiA+IDAgPyB0ID4gdG8gOiB0IDwgdG87IHQgLT0gc3RlcCkge1xuICAgICAgICBsaXN0ZW5lci5wb2ludCgocG9pbnQgPSBkM19nZW9fc3BoZXJpY2FsKFsgY3IsIC1zciAqIE1hdGguY29zKHQpLCAtc3IgKiBNYXRoLnNpbih0KSBdKSlbMF0sIHBvaW50WzFdKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19jaXJjbGVBbmdsZShjciwgcG9pbnQpIHtcbiAgICB2YXIgYSA9IGQzX2dlb19jYXJ0ZXNpYW4ocG9pbnQpO1xuICAgIGFbMF0gLT0gY3I7XG4gICAgZDNfZ2VvX2NhcnRlc2lhbk5vcm1hbGl6ZShhKTtcbiAgICB2YXIgYW5nbGUgPSBkM19hY29zKC1hWzFdKTtcbiAgICByZXR1cm4gKCgtYVsyXSA8IDAgPyAtYW5nbGUgOiBhbmdsZSkgKyAyICogTWF0aC5QSSAtIM61KSAlICgyICogTWF0aC5QSSk7XG4gIH1cbiAgZDMuZ2VvLmRpc3RhbmNlID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciDOlM67ID0gKGJbMF0gLSBhWzBdKSAqIGQzX3JhZGlhbnMsIM+GMCA9IGFbMV0gKiBkM19yYWRpYW5zLCDPhjEgPSBiWzFdICogZDNfcmFkaWFucywgc2luzpTOuyA9IE1hdGguc2luKM6UzrspLCBjb3POlM67ID0gTWF0aC5jb3MozpTOuyksIHNpbs+GMCA9IE1hdGguc2luKM+GMCksIGNvc8+GMCA9IE1hdGguY29zKM+GMCksIHNpbs+GMSA9IE1hdGguc2luKM+GMSksIGNvc8+GMSA9IE1hdGguY29zKM+GMSksIHQ7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIoTWF0aC5zcXJ0KCh0ID0gY29zz4YxICogc2luzpTOuykgKiB0ICsgKHQgPSBjb3PPhjAgKiBzaW7PhjEgLSBzaW7PhjAgKiBjb3PPhjEgKiBjb3POlM67KSAqIHQpLCBzaW7PhjAgKiBzaW7PhjEgKyBjb3PPhjAgKiBjb3PPhjEgKiBjb3POlM67KTtcbiAgfTtcbiAgZDMuZ2VvLmdyYXRpY3VsZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB4MSwgeDAsIFgxLCBYMCwgeTEsIHkwLCBZMSwgWTAsIGR4ID0gMTAsIGR5ID0gZHgsIERYID0gOTAsIERZID0gMzYwLCB4LCB5LCBYLCBZLCBwcmVjaXNpb24gPSAyLjU7XG4gICAgZnVuY3Rpb24gZ3JhdGljdWxlKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJNdWx0aUxpbmVTdHJpbmdcIixcbiAgICAgICAgY29vcmRpbmF0ZXM6IGxpbmVzKClcbiAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxpbmVzKCkge1xuICAgICAgcmV0dXJuIGQzLnJhbmdlKE1hdGguY2VpbChYMCAvIERYKSAqIERYLCBYMSwgRFgpLm1hcChYKS5jb25jYXQoZDMucmFuZ2UoTWF0aC5jZWlsKFkwIC8gRFkpICogRFksIFkxLCBEWSkubWFwKFkpKS5jb25jYXQoZDMucmFuZ2UoTWF0aC5jZWlsKHgwIC8gZHgpICogZHgsIHgxLCBkeCkuZmlsdGVyKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKHggJSBEWCkgPiDOtTtcbiAgICAgIH0pLm1hcCh4KSkuY29uY2F0KGQzLnJhbmdlKE1hdGguY2VpbCh5MCAvIGR5KSAqIGR5LCB5MSwgZHkpLmZpbHRlcihmdW5jdGlvbih5KSB7XG4gICAgICAgIHJldHVybiBNYXRoLmFicyh5ICUgRFkpID4gzrU7XG4gICAgICB9KS5tYXAoeSkpO1xuICAgIH1cbiAgICBncmF0aWN1bGUubGluZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBsaW5lcygpLm1hcChmdW5jdGlvbihjb29yZGluYXRlcykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHR5cGU6IFwiTGluZVN0cmluZ1wiLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlc1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfTtcbiAgICBncmF0aWN1bGUub3V0bGluZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJQb2x5Z29uXCIsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBbIFgoWDApLmNvbmNhdChZKFkxKS5zbGljZSgxKSwgWChYMSkucmV2ZXJzZSgpLnNsaWNlKDEpLCBZKFkwKS5yZXZlcnNlKCkuc2xpY2UoMSkpIF1cbiAgICAgIH07XG4gICAgfTtcbiAgICBncmF0aWN1bGUuZXh0ZW50ID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZ3JhdGljdWxlLm1pbm9yRXh0ZW50KCk7XG4gICAgICByZXR1cm4gZ3JhdGljdWxlLm1ham9yRXh0ZW50KF8pLm1pbm9yRXh0ZW50KF8pO1xuICAgIH07XG4gICAgZ3JhdGljdWxlLm1ham9yRXh0ZW50ID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gWyBbIFgwLCBZMCBdLCBbIFgxLCBZMSBdIF07XG4gICAgICBYMCA9ICtfWzBdWzBdLCBYMSA9ICtfWzFdWzBdO1xuICAgICAgWTAgPSArX1swXVsxXSwgWTEgPSArX1sxXVsxXTtcbiAgICAgIGlmIChYMCA+IFgxKSBfID0gWDAsIFgwID0gWDEsIFgxID0gXztcbiAgICAgIGlmIChZMCA+IFkxKSBfID0gWTAsIFkwID0gWTEsIFkxID0gXztcbiAgICAgIHJldHVybiBncmF0aWN1bGUucHJlY2lzaW9uKHByZWNpc2lvbik7XG4gICAgfTtcbiAgICBncmF0aWN1bGUubWlub3JFeHRlbnQgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBbIFsgeDAsIHkwIF0sIFsgeDEsIHkxIF0gXTtcbiAgICAgIHgwID0gK19bMF1bMF0sIHgxID0gK19bMV1bMF07XG4gICAgICB5MCA9ICtfWzBdWzFdLCB5MSA9ICtfWzFdWzFdO1xuICAgICAgaWYgKHgwID4geDEpIF8gPSB4MCwgeDAgPSB4MSwgeDEgPSBfO1xuICAgICAgaWYgKHkwID4geTEpIF8gPSB5MCwgeTAgPSB5MSwgeTEgPSBfO1xuICAgICAgcmV0dXJuIGdyYXRpY3VsZS5wcmVjaXNpb24ocHJlY2lzaW9uKTtcbiAgICB9O1xuICAgIGdyYXRpY3VsZS5zdGVwID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZ3JhdGljdWxlLm1pbm9yU3RlcCgpO1xuICAgICAgcmV0dXJuIGdyYXRpY3VsZS5tYWpvclN0ZXAoXykubWlub3JTdGVwKF8pO1xuICAgIH07XG4gICAgZ3JhdGljdWxlLm1ham9yU3RlcCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIFsgRFgsIERZIF07XG4gICAgICBEWCA9ICtfWzBdLCBEWSA9ICtfWzFdO1xuICAgICAgcmV0dXJuIGdyYXRpY3VsZTtcbiAgICB9O1xuICAgIGdyYXRpY3VsZS5taW5vclN0ZXAgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBbIGR4LCBkeSBdO1xuICAgICAgZHggPSArX1swXSwgZHkgPSArX1sxXTtcbiAgICAgIHJldHVybiBncmF0aWN1bGU7XG4gICAgfTtcbiAgICBncmF0aWN1bGUucHJlY2lzaW9uID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gcHJlY2lzaW9uO1xuICAgICAgcHJlY2lzaW9uID0gK187XG4gICAgICB4ID0gZDNfZ2VvX2dyYXRpY3VsZVgoeTAsIHkxLCA5MCk7XG4gICAgICB5ID0gZDNfZ2VvX2dyYXRpY3VsZVkoeDAsIHgxLCBwcmVjaXNpb24pO1xuICAgICAgWCA9IGQzX2dlb19ncmF0aWN1bGVYKFkwLCBZMSwgOTApO1xuICAgICAgWSA9IGQzX2dlb19ncmF0aWN1bGVZKFgwLCBYMSwgcHJlY2lzaW9uKTtcbiAgICAgIHJldHVybiBncmF0aWN1bGU7XG4gICAgfTtcbiAgICByZXR1cm4gZ3JhdGljdWxlLm1ham9yRXh0ZW50KFsgWyAtMTgwLCAtOTAgKyDOtSBdLCBbIDE4MCwgOTAgLSDOtSBdIF0pLm1pbm9yRXh0ZW50KFsgWyAtMTgwLCAtODAgLSDOtSBdLCBbIDE4MCwgODAgKyDOtSBdIF0pO1xuICB9O1xuICBmdW5jdGlvbiBkM19nZW9fZ3JhdGljdWxlWCh5MCwgeTEsIGR5KSB7XG4gICAgdmFyIHkgPSBkMy5yYW5nZSh5MCwgeTEgLSDOtSwgZHkpLmNvbmNhdCh5MSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB5Lm1hcChmdW5jdGlvbih5KSB7XG4gICAgICAgIHJldHVybiBbIHgsIHkgXTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvX2dyYXRpY3VsZVkoeDAsIHgxLCBkeCkge1xuICAgIHZhciB4ID0gZDMucmFuZ2UoeDAsIHgxIC0gzrUsIGR4KS5jb25jYXQoeDEpO1xuICAgIHJldHVybiBmdW5jdGlvbih5KSB7XG4gICAgICByZXR1cm4geC5tYXAoZnVuY3Rpb24oeCkge1xuICAgICAgICByZXR1cm4gWyB4LCB5IF07XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGQzX3NvdXJjZShkKSB7XG4gICAgcmV0dXJuIGQuc291cmNlO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3RhcmdldChkKSB7XG4gICAgcmV0dXJuIGQudGFyZ2V0O1xuICB9XG4gIGQzLmdlby5ncmVhdEFyYyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzb3VyY2UgPSBkM19zb3VyY2UsIHNvdXJjZV8sIHRhcmdldCA9IGQzX3RhcmdldCwgdGFyZ2V0XztcbiAgICBmdW5jdGlvbiBncmVhdEFyYygpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwiTGluZVN0cmluZ1wiLFxuICAgICAgICBjb29yZGluYXRlczogWyBzb3VyY2VfIHx8IHNvdXJjZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCB0YXJnZXRfIHx8IHRhcmdldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIF1cbiAgICAgIH07XG4gICAgfVxuICAgIGdyZWF0QXJjLmRpc3RhbmNlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZDMuZ2VvLmRpc3RhbmNlKHNvdXJjZV8gfHwgc291cmNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksIHRhcmdldF8gfHwgdGFyZ2V0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIH07XG4gICAgZ3JlYXRBcmMuc291cmNlID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc291cmNlO1xuICAgICAgc291cmNlID0gXywgc291cmNlXyA9IHR5cGVvZiBfID09PSBcImZ1bmN0aW9uXCIgPyBudWxsIDogXztcbiAgICAgIHJldHVybiBncmVhdEFyYztcbiAgICB9O1xuICAgIGdyZWF0QXJjLnRhcmdldCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRhcmdldDtcbiAgICAgIHRhcmdldCA9IF8sIHRhcmdldF8gPSB0eXBlb2YgXyA9PT0gXCJmdW5jdGlvblwiID8gbnVsbCA6IF87XG4gICAgICByZXR1cm4gZ3JlYXRBcmM7XG4gICAgfTtcbiAgICBncmVhdEFyYy5wcmVjaXNpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gZ3JlYXRBcmMgOiAwO1xuICAgIH07XG4gICAgcmV0dXJuIGdyZWF0QXJjO1xuICB9O1xuICBkMy5nZW8uaW50ZXJwb2xhdGUgPSBmdW5jdGlvbihzb3VyY2UsIHRhcmdldCkge1xuICAgIHJldHVybiBkM19nZW9faW50ZXJwb2xhdGUoc291cmNlWzBdICogZDNfcmFkaWFucywgc291cmNlWzFdICogZDNfcmFkaWFucywgdGFyZ2V0WzBdICogZDNfcmFkaWFucywgdGFyZ2V0WzFdICogZDNfcmFkaWFucyk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2dlb19pbnRlcnBvbGF0ZSh4MCwgeTAsIHgxLCB5MSkge1xuICAgIHZhciBjeTAgPSBNYXRoLmNvcyh5MCksIHN5MCA9IE1hdGguc2luKHkwKSwgY3kxID0gTWF0aC5jb3MoeTEpLCBzeTEgPSBNYXRoLnNpbih5MSksIGt4MCA9IGN5MCAqIE1hdGguY29zKHgwKSwga3kwID0gY3kwICogTWF0aC5zaW4oeDApLCBreDEgPSBjeTEgKiBNYXRoLmNvcyh4MSksIGt5MSA9IGN5MSAqIE1hdGguc2luKHgxKSwgZCA9IDIgKiBNYXRoLmFzaW4oTWF0aC5zcXJ0KGQzX2hhdmVyc2luKHkxIC0geTApICsgY3kwICogY3kxICogZDNfaGF2ZXJzaW4oeDEgLSB4MCkpKSwgayA9IDEgLyBNYXRoLnNpbihkKTtcbiAgICB2YXIgaW50ZXJwb2xhdGUgPSBkID8gZnVuY3Rpb24odCkge1xuICAgICAgdmFyIEIgPSBNYXRoLnNpbih0ICo9IGQpICogaywgQSA9IE1hdGguc2luKGQgLSB0KSAqIGssIHggPSBBICoga3gwICsgQiAqIGt4MSwgeSA9IEEgKiBreTAgKyBCICoga3kxLCB6ID0gQSAqIHN5MCArIEIgKiBzeTE7XG4gICAgICByZXR1cm4gWyBNYXRoLmF0YW4yKHksIHgpICogZDNfZGVncmVlcywgTWF0aC5hdGFuMih6LCBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSkpICogZDNfZGVncmVlcyBdO1xuICAgIH0gOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBbIHgwICogZDNfZGVncmVlcywgeTAgKiBkM19kZWdyZWVzIF07XG4gICAgfTtcbiAgICBpbnRlcnBvbGF0ZS5kaXN0YW5jZSA9IGQ7XG4gICAgcmV0dXJuIGludGVycG9sYXRlO1xuICB9XG4gIGQzLmdlby5sZW5ndGggPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICBkM19nZW9fbGVuZ3RoU3VtID0gMDtcbiAgICBkMy5nZW8uc3RyZWFtKG9iamVjdCwgZDNfZ2VvX2xlbmd0aCk7XG4gICAgcmV0dXJuIGQzX2dlb19sZW5ndGhTdW07XG4gIH07XG4gIHZhciBkM19nZW9fbGVuZ3RoU3VtO1xuICB2YXIgZDNfZ2VvX2xlbmd0aCA9IHtcbiAgICBzcGhlcmU6IGQzX25vb3AsXG4gICAgcG9pbnQ6IGQzX25vb3AsXG4gICAgbGluZVN0YXJ0OiBkM19nZW9fbGVuZ3RoTGluZVN0YXJ0LFxuICAgIGxpbmVFbmQ6IGQzX25vb3AsXG4gICAgcG9seWdvblN0YXJ0OiBkM19ub29wLFxuICAgIHBvbHlnb25FbmQ6IGQzX25vb3BcbiAgfTtcbiAgZnVuY3Rpb24gZDNfZ2VvX2xlbmd0aExpbmVTdGFydCgpIHtcbiAgICB2YXIgzrswLCBzaW7PhjAsIGNvc8+GMDtcbiAgICBkM19nZW9fbGVuZ3RoLnBvaW50ID0gZnVuY3Rpb24ozrssIM+GKSB7XG4gICAgICDOuzAgPSDOuyAqIGQzX3JhZGlhbnMsIHNpbs+GMCA9IE1hdGguc2luKM+GICo9IGQzX3JhZGlhbnMpLCBjb3PPhjAgPSBNYXRoLmNvcyjPhik7XG4gICAgICBkM19nZW9fbGVuZ3RoLnBvaW50ID0gbmV4dFBvaW50O1xuICAgIH07XG4gICAgZDNfZ2VvX2xlbmd0aC5saW5lRW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICBkM19nZW9fbGVuZ3RoLnBvaW50ID0gZDNfZ2VvX2xlbmd0aC5saW5lRW5kID0gZDNfbm9vcDtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIG5leHRQb2ludCjOuywgz4YpIHtcbiAgICAgIHZhciBzaW7PhiA9IE1hdGguc2luKM+GICo9IGQzX3JhZGlhbnMpLCBjb3PPhiA9IE1hdGguY29zKM+GKSwgdCA9IE1hdGguYWJzKCjOuyAqPSBkM19yYWRpYW5zKSAtIM67MCksIGNvc86UzrsgPSBNYXRoLmNvcyh0KTtcbiAgICAgIGQzX2dlb19sZW5ndGhTdW0gKz0gTWF0aC5hdGFuMihNYXRoLnNxcnQoKHQgPSBjb3PPhiAqIE1hdGguc2luKHQpKSAqIHQgKyAodCA9IGNvc8+GMCAqIHNpbs+GIC0gc2luz4YwICogY29zz4YgKiBjb3POlM67KSAqIHQpLCBzaW7PhjAgKiBzaW7PhiArIGNvc8+GMCAqIGNvc8+GICogY29zzpTOuyk7XG4gICAgICDOuzAgPSDOuywgc2luz4YwID0gc2luz4YsIGNvc8+GMCA9IGNvc8+GO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBkM19nZW9fYXppbXV0aGFsKHNjYWxlLCBhbmdsZSkge1xuICAgIGZ1bmN0aW9uIGF6aW11dGhhbCjOuywgz4YpIHtcbiAgICAgIHZhciBjb3POuyA9IE1hdGguY29zKM67KSwgY29zz4YgPSBNYXRoLmNvcyjPhiksIGsgPSBzY2FsZShjb3POuyAqIGNvc8+GKTtcbiAgICAgIHJldHVybiBbIGsgKiBjb3PPhiAqIE1hdGguc2luKM67KSwgayAqIE1hdGguc2luKM+GKSBdO1xuICAgIH1cbiAgICBhemltdXRoYWwuaW52ZXJ0ID0gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgdmFyIM+BID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpLCBjID0gYW5nbGUoz4EpLCBzaW5jID0gTWF0aC5zaW4oYyksIGNvc2MgPSBNYXRoLmNvcyhjKTtcbiAgICAgIHJldHVybiBbIE1hdGguYXRhbjIoeCAqIHNpbmMsIM+BICogY29zYyksIE1hdGguYXNpbijPgSAmJiB5ICogc2luYyAvIM+BKSBdO1xuICAgIH07XG4gICAgcmV0dXJuIGF6aW11dGhhbDtcbiAgfVxuICB2YXIgZDNfZ2VvX2F6aW11dGhhbEVxdWFsQXJlYSA9IGQzX2dlb19hemltdXRoYWwoZnVuY3Rpb24oY29zzrtjb3PPhikge1xuICAgIHJldHVybiBNYXRoLnNxcnQoMiAvICgxICsgY29zzrtjb3PPhikpO1xuICB9LCBmdW5jdGlvbijPgSkge1xuICAgIHJldHVybiAyICogTWF0aC5hc2luKM+BIC8gMik7XG4gIH0pO1xuICAoZDMuZ2VvLmF6aW11dGhhbEVxdWFsQXJlYSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkM19nZW9fcHJvamVjdGlvbihkM19nZW9fYXppbXV0aGFsRXF1YWxBcmVhKTtcbiAgfSkucmF3ID0gZDNfZ2VvX2F6aW11dGhhbEVxdWFsQXJlYTtcbiAgdmFyIGQzX2dlb19hemltdXRoYWxFcXVpZGlzdGFudCA9IGQzX2dlb19hemltdXRoYWwoZnVuY3Rpb24oY29zzrtjb3PPhikge1xuICAgIHZhciBjID0gTWF0aC5hY29zKGNvc867Y29zz4YpO1xuICAgIHJldHVybiBjICYmIGMgLyBNYXRoLnNpbihjKTtcbiAgfSwgZDNfaWRlbnRpdHkpO1xuICAoZDMuZ2VvLmF6aW11dGhhbEVxdWlkaXN0YW50ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGQzX2dlb19wcm9qZWN0aW9uKGQzX2dlb19hemltdXRoYWxFcXVpZGlzdGFudCk7XG4gIH0pLnJhdyA9IGQzX2dlb19hemltdXRoYWxFcXVpZGlzdGFudDtcbiAgZnVuY3Rpb24gZDNfZ2VvX2NvbmljQ29uZm9ybWFsKM+GMCwgz4YxKSB7XG4gICAgdmFyIGNvc8+GMCA9IE1hdGguY29zKM+GMCksIHQgPSBmdW5jdGlvbijPhikge1xuICAgICAgcmV0dXJuIE1hdGgudGFuKM+AIC8gNCArIM+GIC8gMik7XG4gICAgfSwgbiA9IM+GMCA9PT0gz4YxID8gTWF0aC5zaW4oz4YwKSA6IE1hdGgubG9nKGNvc8+GMCAvIE1hdGguY29zKM+GMSkpIC8gTWF0aC5sb2codCjPhjEpIC8gdCjPhjApKSwgRiA9IGNvc8+GMCAqIE1hdGgucG93KHQoz4YwKSwgbikgLyBuO1xuICAgIGlmICghbikgcmV0dXJuIGQzX2dlb19tZXJjYXRvcjtcbiAgICBmdW5jdGlvbiBmb3J3YXJkKM67LCDPhikge1xuICAgICAgdmFyIM+BID0gTWF0aC5hYnMoTWF0aC5hYnMoz4YpIC0gz4AgLyAyKSA8IM61ID8gMCA6IEYgLyBNYXRoLnBvdyh0KM+GKSwgbik7XG4gICAgICByZXR1cm4gWyDPgSAqIE1hdGguc2luKG4gKiDOuyksIEYgLSDPgSAqIE1hdGguY29zKG4gKiDOuykgXTtcbiAgICB9XG4gICAgZm9yd2FyZC5pbnZlcnQgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgICB2YXIgz4EwX3kgPSBGIC0geSwgz4EgPSBkM19zZ24obikgKiBNYXRoLnNxcnQoeCAqIHggKyDPgTBfeSAqIM+BMF95KTtcbiAgICAgIHJldHVybiBbIE1hdGguYXRhbjIoeCwgz4EwX3kpIC8gbiwgMiAqIE1hdGguYXRhbihNYXRoLnBvdyhGIC8gz4EsIDEgLyBuKSkgLSDPgCAvIDIgXTtcbiAgICB9O1xuICAgIHJldHVybiBmb3J3YXJkO1xuICB9XG4gIChkMy5nZW8uY29uaWNDb25mb3JtYWwgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfZ2VvX2NvbmljKGQzX2dlb19jb25pY0NvbmZvcm1hbCk7XG4gIH0pLnJhdyA9IGQzX2dlb19jb25pY0NvbmZvcm1hbDtcbiAgZnVuY3Rpb24gZDNfZ2VvX2NvbmljRXF1aWRpc3RhbnQoz4YwLCDPhjEpIHtcbiAgICB2YXIgY29zz4YwID0gTWF0aC5jb3Moz4YwKSwgbiA9IM+GMCA9PT0gz4YxID8gTWF0aC5zaW4oz4YwKSA6IChjb3PPhjAgLSBNYXRoLmNvcyjPhjEpKSAvICjPhjEgLSDPhjApLCBHID0gY29zz4YwIC8gbiArIM+GMDtcbiAgICBpZiAoTWF0aC5hYnMobikgPCDOtSkgcmV0dXJuIGQzX2dlb19lcXVpcmVjdGFuZ3VsYXI7XG4gICAgZnVuY3Rpb24gZm9yd2FyZCjOuywgz4YpIHtcbiAgICAgIHZhciDPgSA9IEcgLSDPhjtcbiAgICAgIHJldHVybiBbIM+BICogTWF0aC5zaW4obiAqIM67KSwgRyAtIM+BICogTWF0aC5jb3MobiAqIM67KSBdO1xuICAgIH1cbiAgICBmb3J3YXJkLmludmVydCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgIHZhciDPgTBfeSA9IEcgLSB5O1xuICAgICAgcmV0dXJuIFsgTWF0aC5hdGFuMih4LCDPgTBfeSkgLyBuLCBHIC0gZDNfc2duKG4pICogTWF0aC5zcXJ0KHggKiB4ICsgz4EwX3kgKiDPgTBfeSkgXTtcbiAgICB9O1xuICAgIHJldHVybiBmb3J3YXJkO1xuICB9XG4gIChkMy5nZW8uY29uaWNFcXVpZGlzdGFudCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkM19nZW9fY29uaWMoZDNfZ2VvX2NvbmljRXF1aWRpc3RhbnQpO1xuICB9KS5yYXcgPSBkM19nZW9fY29uaWNFcXVpZGlzdGFudDtcbiAgdmFyIGQzX2dlb19nbm9tb25pYyA9IGQzX2dlb19hemltdXRoYWwoZnVuY3Rpb24oY29zzrtjb3PPhikge1xuICAgIHJldHVybiAxIC8gY29zzrtjb3PPhjtcbiAgfSwgTWF0aC5hdGFuKTtcbiAgKGQzLmdlby5nbm9tb25pYyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkM19nZW9fcHJvamVjdGlvbihkM19nZW9fZ25vbW9uaWMpO1xuICB9KS5yYXcgPSBkM19nZW9fZ25vbW9uaWM7XG4gIGZ1bmN0aW9uIGQzX2dlb19tZXJjYXRvcijOuywgz4YpIHtcbiAgICByZXR1cm4gWyDOuywgTWF0aC5sb2coTWF0aC50YW4oz4AgLyA0ICsgz4YgLyAyKSkgXTtcbiAgfVxuICBkM19nZW9fbWVyY2F0b3IuaW52ZXJ0ID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIHJldHVybiBbIHgsIDIgKiBNYXRoLmF0YW4oTWF0aC5leHAoeSkpIC0gz4AgLyAyIF07XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2dlb19tZXJjYXRvclByb2plY3Rpb24ocHJvamVjdCkge1xuICAgIHZhciBtID0gZDNfZ2VvX3Byb2plY3Rpb24ocHJvamVjdCksIHNjYWxlID0gbS5zY2FsZSwgdHJhbnNsYXRlID0gbS50cmFuc2xhdGUsIGNsaXBFeHRlbnQgPSBtLmNsaXBFeHRlbnQsIGNsaXBBdXRvO1xuICAgIG0uc2NhbGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB2ID0gc2NhbGUuYXBwbHkobSwgYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiB2ID09PSBtID8gY2xpcEF1dG8gPyBtLmNsaXBFeHRlbnQobnVsbCkgOiBtIDogdjtcbiAgICB9O1xuICAgIG0udHJhbnNsYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdiA9IHRyYW5zbGF0ZS5hcHBseShtLCBhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHYgPT09IG0gPyBjbGlwQXV0byA/IG0uY2xpcEV4dGVudChudWxsKSA6IG0gOiB2O1xuICAgIH07XG4gICAgbS5jbGlwRXh0ZW50ID0gZnVuY3Rpb24oXykge1xuICAgICAgdmFyIHYgPSBjbGlwRXh0ZW50LmFwcGx5KG0sIGFyZ3VtZW50cyk7XG4gICAgICBpZiAodiA9PT0gbSkge1xuICAgICAgICBpZiAoY2xpcEF1dG8gPSBfID09IG51bGwpIHtcbiAgICAgICAgICB2YXIgayA9IM+AICogc2NhbGUoKSwgdCA9IHRyYW5zbGF0ZSgpO1xuICAgICAgICAgIGNsaXBFeHRlbnQoWyBbIHRbMF0gLSBrLCB0WzFdIC0gayBdLCBbIHRbMF0gKyBrLCB0WzFdICsgayBdIF0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGNsaXBBdXRvKSB7XG4gICAgICAgIHYgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHY7XG4gICAgfTtcbiAgICByZXR1cm4gbS5jbGlwRXh0ZW50KG51bGwpO1xuICB9XG4gIChkMy5nZW8ubWVyY2F0b3IgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfZ2VvX21lcmNhdG9yUHJvamVjdGlvbihkM19nZW9fbWVyY2F0b3IpO1xuICB9KS5yYXcgPSBkM19nZW9fbWVyY2F0b3I7XG4gIHZhciBkM19nZW9fb3J0aG9ncmFwaGljID0gZDNfZ2VvX2F6aW11dGhhbChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gMTtcbiAgfSwgTWF0aC5hc2luKTtcbiAgKGQzLmdlby5vcnRob2dyYXBoaWMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfZ2VvX3Byb2plY3Rpb24oZDNfZ2VvX29ydGhvZ3JhcGhpYyk7XG4gIH0pLnJhdyA9IGQzX2dlb19vcnRob2dyYXBoaWM7XG4gIHZhciBkM19nZW9fc3RlcmVvZ3JhcGhpYyA9IGQzX2dlb19hemltdXRoYWwoZnVuY3Rpb24oY29zzrtjb3PPhikge1xuICAgIHJldHVybiAxIC8gKDEgKyBjb3POu2Nvc8+GKTtcbiAgfSwgZnVuY3Rpb24oz4EpIHtcbiAgICByZXR1cm4gMiAqIE1hdGguYXRhbijPgSk7XG4gIH0pO1xuICAoZDMuZ2VvLnN0ZXJlb2dyYXBoaWMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfZ2VvX3Byb2plY3Rpb24oZDNfZ2VvX3N0ZXJlb2dyYXBoaWMpO1xuICB9KS5yYXcgPSBkM19nZW9fc3RlcmVvZ3JhcGhpYztcbiAgZnVuY3Rpb24gZDNfZ2VvX3RyYW5zdmVyc2VNZXJjYXRvcijOuywgz4YpIHtcbiAgICB2YXIgQiA9IE1hdGguY29zKM+GKSAqIE1hdGguc2luKM67KTtcbiAgICByZXR1cm4gWyBNYXRoLmxvZygoMSArIEIpIC8gKDEgLSBCKSkgLyAyLCBNYXRoLmF0YW4yKE1hdGgudGFuKM+GKSwgTWF0aC5jb3MozrspKSBdO1xuICB9XG4gIGQzX2dlb190cmFuc3ZlcnNlTWVyY2F0b3IuaW52ZXJ0ID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIHJldHVybiBbIE1hdGguYXRhbjIoZDNfc2luaCh4KSwgTWF0aC5jb3MoeSkpLCBkM19hc2luKE1hdGguc2luKHkpIC8gZDNfY29zaCh4KSkgXTtcbiAgfTtcbiAgKGQzLmdlby50cmFuc3ZlcnNlTWVyY2F0b3IgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfZ2VvX21lcmNhdG9yUHJvamVjdGlvbihkM19nZW9fdHJhbnN2ZXJzZU1lcmNhdG9yKTtcbiAgfSkucmF3ID0gZDNfZ2VvX3RyYW5zdmVyc2VNZXJjYXRvcjtcbiAgZDMuZ2VvbSA9IHt9O1xuICBkMy5zdmcgPSB7fTtcbiAgZnVuY3Rpb24gZDNfc3ZnX2xpbmUocHJvamVjdGlvbikge1xuICAgIHZhciB4ID0gZDNfc3ZnX2xpbmVYLCB5ID0gZDNfc3ZnX2xpbmVZLCBkZWZpbmVkID0gZDNfdHJ1ZSwgaW50ZXJwb2xhdGUgPSBkM19zdmdfbGluZUxpbmVhciwgaW50ZXJwb2xhdGVLZXkgPSBpbnRlcnBvbGF0ZS5rZXksIHRlbnNpb24gPSAuNztcbiAgICBmdW5jdGlvbiBsaW5lKGRhdGEpIHtcbiAgICAgIHZhciBzZWdtZW50cyA9IFtdLCBwb2ludHMgPSBbXSwgaSA9IC0xLCBuID0gZGF0YS5sZW5ndGgsIGQsIGZ4ID0gZDNfZnVuY3Rvcih4KSwgZnkgPSBkM19mdW5jdG9yKHkpO1xuICAgICAgZnVuY3Rpb24gc2VnbWVudCgpIHtcbiAgICAgICAgc2VnbWVudHMucHVzaChcIk1cIiwgaW50ZXJwb2xhdGUocHJvamVjdGlvbihwb2ludHMpLCB0ZW5zaW9uKSk7XG4gICAgICB9XG4gICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICBpZiAoZGVmaW5lZC5jYWxsKHRoaXMsIGQgPSBkYXRhW2ldLCBpKSkge1xuICAgICAgICAgIHBvaW50cy5wdXNoKFsgK2Z4LmNhbGwodGhpcywgZCwgaSksICtmeS5jYWxsKHRoaXMsIGQsIGkpIF0pO1xuICAgICAgICB9IGVsc2UgaWYgKHBvaW50cy5sZW5ndGgpIHtcbiAgICAgICAgICBzZWdtZW50KCk7XG4gICAgICAgICAgcG9pbnRzID0gW107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwb2ludHMubGVuZ3RoKSBzZWdtZW50KCk7XG4gICAgICByZXR1cm4gc2VnbWVudHMubGVuZ3RoID8gc2VnbWVudHMuam9pbihcIlwiKSA6IG51bGw7XG4gICAgfVxuICAgIGxpbmUueCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHg7XG4gICAgICB4ID0gXztcbiAgICAgIHJldHVybiBsaW5lO1xuICAgIH07XG4gICAgbGluZS55ID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4geTtcbiAgICAgIHkgPSBfO1xuICAgICAgcmV0dXJuIGxpbmU7XG4gICAgfTtcbiAgICBsaW5lLmRlZmluZWQgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkZWZpbmVkO1xuICAgICAgZGVmaW5lZCA9IF87XG4gICAgICByZXR1cm4gbGluZTtcbiAgICB9O1xuICAgIGxpbmUuaW50ZXJwb2xhdGUgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBpbnRlcnBvbGF0ZUtleTtcbiAgICAgIGlmICh0eXBlb2YgXyA9PT0gXCJmdW5jdGlvblwiKSBpbnRlcnBvbGF0ZUtleSA9IGludGVycG9sYXRlID0gXzsgZWxzZSBpbnRlcnBvbGF0ZUtleSA9IChpbnRlcnBvbGF0ZSA9IGQzX3N2Z19saW5lSW50ZXJwb2xhdG9ycy5nZXQoXykgfHwgZDNfc3ZnX2xpbmVMaW5lYXIpLmtleTtcbiAgICAgIHJldHVybiBsaW5lO1xuICAgIH07XG4gICAgbGluZS50ZW5zaW9uID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGVuc2lvbjtcbiAgICAgIHRlbnNpb24gPSBfO1xuICAgICAgcmV0dXJuIGxpbmU7XG4gICAgfTtcbiAgICByZXR1cm4gbGluZTtcbiAgfVxuICBkMy5zdmcubGluZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkM19zdmdfbGluZShkM19pZGVudGl0eSk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3N2Z19saW5lWChkKSB7XG4gICAgcmV0dXJuIGRbMF07XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2xpbmVZKGQpIHtcbiAgICByZXR1cm4gZFsxXTtcbiAgfVxuICB2YXIgZDNfc3ZnX2xpbmVJbnRlcnBvbGF0b3JzID0gZDMubWFwKHtcbiAgICBsaW5lYXI6IGQzX3N2Z19saW5lTGluZWFyLFxuICAgIFwibGluZWFyLWNsb3NlZFwiOiBkM19zdmdfbGluZUxpbmVhckNsb3NlZCxcbiAgICBzdGVwOiBkM19zdmdfbGluZVN0ZXAsXG4gICAgXCJzdGVwLWJlZm9yZVwiOiBkM19zdmdfbGluZVN0ZXBCZWZvcmUsXG4gICAgXCJzdGVwLWFmdGVyXCI6IGQzX3N2Z19saW5lU3RlcEFmdGVyLFxuICAgIGJhc2lzOiBkM19zdmdfbGluZUJhc2lzLFxuICAgIFwiYmFzaXMtb3BlblwiOiBkM19zdmdfbGluZUJhc2lzT3BlbixcbiAgICBcImJhc2lzLWNsb3NlZFwiOiBkM19zdmdfbGluZUJhc2lzQ2xvc2VkLFxuICAgIGJ1bmRsZTogZDNfc3ZnX2xpbmVCdW5kbGUsXG4gICAgY2FyZGluYWw6IGQzX3N2Z19saW5lQ2FyZGluYWwsXG4gICAgXCJjYXJkaW5hbC1vcGVuXCI6IGQzX3N2Z19saW5lQ2FyZGluYWxPcGVuLFxuICAgIFwiY2FyZGluYWwtY2xvc2VkXCI6IGQzX3N2Z19saW5lQ2FyZGluYWxDbG9zZWQsXG4gICAgbW9ub3RvbmU6IGQzX3N2Z19saW5lTW9ub3RvbmVcbiAgfSk7XG4gIGQzX3N2Z19saW5lSW50ZXJwb2xhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICB2YWx1ZS5rZXkgPSBrZXk7XG4gICAgdmFsdWUuY2xvc2VkID0gLy1jbG9zZWQkLy50ZXN0KGtleSk7XG4gIH0pO1xuICBmdW5jdGlvbiBkM19zdmdfbGluZUxpbmVhcihwb2ludHMpIHtcbiAgICByZXR1cm4gcG9pbnRzLmpvaW4oXCJMXCIpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3N2Z19saW5lTGluZWFyQ2xvc2VkKHBvaW50cykge1xuICAgIHJldHVybiBkM19zdmdfbGluZUxpbmVhcihwb2ludHMpICsgXCJaXCI7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2xpbmVTdGVwKHBvaW50cykge1xuICAgIHZhciBpID0gMCwgbiA9IHBvaW50cy5sZW5ndGgsIHAgPSBwb2ludHNbMF0sIHBhdGggPSBbIHBbMF0sIFwiLFwiLCBwWzFdIF07XG4gICAgd2hpbGUgKCsraSA8IG4pIHBhdGgucHVzaChcIkhcIiwgKHBbMF0gKyAocCA9IHBvaW50c1tpXSlbMF0pIC8gMiwgXCJWXCIsIHBbMV0pO1xuICAgIGlmIChuID4gMSkgcGF0aC5wdXNoKFwiSFwiLCBwWzBdKTtcbiAgICByZXR1cm4gcGF0aC5qb2luKFwiXCIpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3N2Z19saW5lU3RlcEJlZm9yZShwb2ludHMpIHtcbiAgICB2YXIgaSA9IDAsIG4gPSBwb2ludHMubGVuZ3RoLCBwID0gcG9pbnRzWzBdLCBwYXRoID0gWyBwWzBdLCBcIixcIiwgcFsxXSBdO1xuICAgIHdoaWxlICgrK2kgPCBuKSBwYXRoLnB1c2goXCJWXCIsIChwID0gcG9pbnRzW2ldKVsxXSwgXCJIXCIsIHBbMF0pO1xuICAgIHJldHVybiBwYXRoLmpvaW4oXCJcIik7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2xpbmVTdGVwQWZ0ZXIocG9pbnRzKSB7XG4gICAgdmFyIGkgPSAwLCBuID0gcG9pbnRzLmxlbmd0aCwgcCA9IHBvaW50c1swXSwgcGF0aCA9IFsgcFswXSwgXCIsXCIsIHBbMV0gXTtcbiAgICB3aGlsZSAoKytpIDwgbikgcGF0aC5wdXNoKFwiSFwiLCAocCA9IHBvaW50c1tpXSlbMF0sIFwiVlwiLCBwWzFdKTtcbiAgICByZXR1cm4gcGF0aC5qb2luKFwiXCIpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3N2Z19saW5lQ2FyZGluYWxPcGVuKHBvaW50cywgdGVuc2lvbikge1xuICAgIHJldHVybiBwb2ludHMubGVuZ3RoIDwgNCA/IGQzX3N2Z19saW5lTGluZWFyKHBvaW50cykgOiBwb2ludHNbMV0gKyBkM19zdmdfbGluZUhlcm1pdGUocG9pbnRzLnNsaWNlKDEsIHBvaW50cy5sZW5ndGggLSAxKSwgZDNfc3ZnX2xpbmVDYXJkaW5hbFRhbmdlbnRzKHBvaW50cywgdGVuc2lvbikpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3N2Z19saW5lQ2FyZGluYWxDbG9zZWQocG9pbnRzLCB0ZW5zaW9uKSB7XG4gICAgcmV0dXJuIHBvaW50cy5sZW5ndGggPCAzID8gZDNfc3ZnX2xpbmVMaW5lYXIocG9pbnRzKSA6IHBvaW50c1swXSArIGQzX3N2Z19saW5lSGVybWl0ZSgocG9pbnRzLnB1c2gocG9pbnRzWzBdKSwgXG4gICAgcG9pbnRzKSwgZDNfc3ZnX2xpbmVDYXJkaW5hbFRhbmdlbnRzKFsgcG9pbnRzW3BvaW50cy5sZW5ndGggLSAyXSBdLmNvbmNhdChwb2ludHMsIFsgcG9pbnRzWzFdIF0pLCB0ZW5zaW9uKSk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2xpbmVDYXJkaW5hbChwb2ludHMsIHRlbnNpb24pIHtcbiAgICByZXR1cm4gcG9pbnRzLmxlbmd0aCA8IDMgPyBkM19zdmdfbGluZUxpbmVhcihwb2ludHMpIDogcG9pbnRzWzBdICsgZDNfc3ZnX2xpbmVIZXJtaXRlKHBvaW50cywgZDNfc3ZnX2xpbmVDYXJkaW5hbFRhbmdlbnRzKHBvaW50cywgdGVuc2lvbikpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3N2Z19saW5lSGVybWl0ZShwb2ludHMsIHRhbmdlbnRzKSB7XG4gICAgaWYgKHRhbmdlbnRzLmxlbmd0aCA8IDEgfHwgcG9pbnRzLmxlbmd0aCAhPSB0YW5nZW50cy5sZW5ndGggJiYgcG9pbnRzLmxlbmd0aCAhPSB0YW5nZW50cy5sZW5ndGggKyAyKSB7XG4gICAgICByZXR1cm4gZDNfc3ZnX2xpbmVMaW5lYXIocG9pbnRzKTtcbiAgICB9XG4gICAgdmFyIHF1YWQgPSBwb2ludHMubGVuZ3RoICE9IHRhbmdlbnRzLmxlbmd0aCwgcGF0aCA9IFwiXCIsIHAwID0gcG9pbnRzWzBdLCBwID0gcG9pbnRzWzFdLCB0MCA9IHRhbmdlbnRzWzBdLCB0ID0gdDAsIHBpID0gMTtcbiAgICBpZiAocXVhZCkge1xuICAgICAgcGF0aCArPSBcIlFcIiArIChwWzBdIC0gdDBbMF0gKiAyIC8gMykgKyBcIixcIiArIChwWzFdIC0gdDBbMV0gKiAyIC8gMykgKyBcIixcIiArIHBbMF0gKyBcIixcIiArIHBbMV07XG4gICAgICBwMCA9IHBvaW50c1sxXTtcbiAgICAgIHBpID0gMjtcbiAgICB9XG4gICAgaWYgKHRhbmdlbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHQgPSB0YW5nZW50c1sxXTtcbiAgICAgIHAgPSBwb2ludHNbcGldO1xuICAgICAgcGkrKztcbiAgICAgIHBhdGggKz0gXCJDXCIgKyAocDBbMF0gKyB0MFswXSkgKyBcIixcIiArIChwMFsxXSArIHQwWzFdKSArIFwiLFwiICsgKHBbMF0gLSB0WzBdKSArIFwiLFwiICsgKHBbMV0gLSB0WzFdKSArIFwiLFwiICsgcFswXSArIFwiLFwiICsgcFsxXTtcbiAgICAgIGZvciAodmFyIGkgPSAyOyBpIDwgdGFuZ2VudHMubGVuZ3RoOyBpKyssIHBpKyspIHtcbiAgICAgICAgcCA9IHBvaW50c1twaV07XG4gICAgICAgIHQgPSB0YW5nZW50c1tpXTtcbiAgICAgICAgcGF0aCArPSBcIlNcIiArIChwWzBdIC0gdFswXSkgKyBcIixcIiArIChwWzFdIC0gdFsxXSkgKyBcIixcIiArIHBbMF0gKyBcIixcIiArIHBbMV07XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChxdWFkKSB7XG4gICAgICB2YXIgbHAgPSBwb2ludHNbcGldO1xuICAgICAgcGF0aCArPSBcIlFcIiArIChwWzBdICsgdFswXSAqIDIgLyAzKSArIFwiLFwiICsgKHBbMV0gKyB0WzFdICogMiAvIDMpICsgXCIsXCIgKyBscFswXSArIFwiLFwiICsgbHBbMV07XG4gICAgfVxuICAgIHJldHVybiBwYXRoO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3N2Z19saW5lQ2FyZGluYWxUYW5nZW50cyhwb2ludHMsIHRlbnNpb24pIHtcbiAgICB2YXIgdGFuZ2VudHMgPSBbXSwgYSA9ICgxIC0gdGVuc2lvbikgLyAyLCBwMCwgcDEgPSBwb2ludHNbMF0sIHAyID0gcG9pbnRzWzFdLCBpID0gMSwgbiA9IHBvaW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgIHAwID0gcDE7XG4gICAgICBwMSA9IHAyO1xuICAgICAgcDIgPSBwb2ludHNbaV07XG4gICAgICB0YW5nZW50cy5wdXNoKFsgYSAqIChwMlswXSAtIHAwWzBdKSwgYSAqIChwMlsxXSAtIHAwWzFdKSBdKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhbmdlbnRzO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3N2Z19saW5lQmFzaXMocG9pbnRzKSB7XG4gICAgaWYgKHBvaW50cy5sZW5ndGggPCAzKSByZXR1cm4gZDNfc3ZnX2xpbmVMaW5lYXIocG9pbnRzKTtcbiAgICB2YXIgaSA9IDEsIG4gPSBwb2ludHMubGVuZ3RoLCBwaSA9IHBvaW50c1swXSwgeDAgPSBwaVswXSwgeTAgPSBwaVsxXSwgcHggPSBbIHgwLCB4MCwgeDAsIChwaSA9IHBvaW50c1sxXSlbMF0gXSwgcHkgPSBbIHkwLCB5MCwgeTAsIHBpWzFdIF0sIHBhdGggPSBbIHgwLCBcIixcIiwgeTAsIFwiTFwiLCBkM19zdmdfbGluZURvdDQoZDNfc3ZnX2xpbmVCYXNpc0JlemllcjMsIHB4KSwgXCIsXCIsIGQzX3N2Z19saW5lRG90NChkM19zdmdfbGluZUJhc2lzQmV6aWVyMywgcHkpIF07XG4gICAgcG9pbnRzLnB1c2gocG9pbnRzW24gLSAxXSk7XG4gICAgd2hpbGUgKCsraSA8PSBuKSB7XG4gICAgICBwaSA9IHBvaW50c1tpXTtcbiAgICAgIHB4LnNoaWZ0KCk7XG4gICAgICBweC5wdXNoKHBpWzBdKTtcbiAgICAgIHB5LnNoaWZ0KCk7XG4gICAgICBweS5wdXNoKHBpWzFdKTtcbiAgICAgIGQzX3N2Z19saW5lQmFzaXNCZXppZXIocGF0aCwgcHgsIHB5KTtcbiAgICB9XG4gICAgcG9pbnRzLnBvcCgpO1xuICAgIHBhdGgucHVzaChcIkxcIiwgcGkpO1xuICAgIHJldHVybiBwYXRoLmpvaW4oXCJcIik7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2xpbmVCYXNpc09wZW4ocG9pbnRzKSB7XG4gICAgaWYgKHBvaW50cy5sZW5ndGggPCA0KSByZXR1cm4gZDNfc3ZnX2xpbmVMaW5lYXIocG9pbnRzKTtcbiAgICB2YXIgcGF0aCA9IFtdLCBpID0gLTEsIG4gPSBwb2ludHMubGVuZ3RoLCBwaSwgcHggPSBbIDAgXSwgcHkgPSBbIDAgXTtcbiAgICB3aGlsZSAoKytpIDwgMykge1xuICAgICAgcGkgPSBwb2ludHNbaV07XG4gICAgICBweC5wdXNoKHBpWzBdKTtcbiAgICAgIHB5LnB1c2gocGlbMV0pO1xuICAgIH1cbiAgICBwYXRoLnB1c2goZDNfc3ZnX2xpbmVEb3Q0KGQzX3N2Z19saW5lQmFzaXNCZXppZXIzLCBweCkgKyBcIixcIiArIGQzX3N2Z19saW5lRG90NChkM19zdmdfbGluZUJhc2lzQmV6aWVyMywgcHkpKTtcbiAgICAtLWk7XG4gICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgIHBpID0gcG9pbnRzW2ldO1xuICAgICAgcHguc2hpZnQoKTtcbiAgICAgIHB4LnB1c2gocGlbMF0pO1xuICAgICAgcHkuc2hpZnQoKTtcbiAgICAgIHB5LnB1c2gocGlbMV0pO1xuICAgICAgZDNfc3ZnX2xpbmVCYXNpc0JlemllcihwYXRoLCBweCwgcHkpO1xuICAgIH1cbiAgICByZXR1cm4gcGF0aC5qb2luKFwiXCIpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3N2Z19saW5lQmFzaXNDbG9zZWQocG9pbnRzKSB7XG4gICAgdmFyIHBhdGgsIGkgPSAtMSwgbiA9IHBvaW50cy5sZW5ndGgsIG0gPSBuICsgNCwgcGksIHB4ID0gW10sIHB5ID0gW107XG4gICAgd2hpbGUgKCsraSA8IDQpIHtcbiAgICAgIHBpID0gcG9pbnRzW2kgJSBuXTtcbiAgICAgIHB4LnB1c2gocGlbMF0pO1xuICAgICAgcHkucHVzaChwaVsxXSk7XG4gICAgfVxuICAgIHBhdGggPSBbIGQzX3N2Z19saW5lRG90NChkM19zdmdfbGluZUJhc2lzQmV6aWVyMywgcHgpLCBcIixcIiwgZDNfc3ZnX2xpbmVEb3Q0KGQzX3N2Z19saW5lQmFzaXNCZXppZXIzLCBweSkgXTtcbiAgICAtLWk7XG4gICAgd2hpbGUgKCsraSA8IG0pIHtcbiAgICAgIHBpID0gcG9pbnRzW2kgJSBuXTtcbiAgICAgIHB4LnNoaWZ0KCk7XG4gICAgICBweC5wdXNoKHBpWzBdKTtcbiAgICAgIHB5LnNoaWZ0KCk7XG4gICAgICBweS5wdXNoKHBpWzFdKTtcbiAgICAgIGQzX3N2Z19saW5lQmFzaXNCZXppZXIocGF0aCwgcHgsIHB5KTtcbiAgICB9XG4gICAgcmV0dXJuIHBhdGguam9pbihcIlwiKTtcbiAgfVxuICBmdW5jdGlvbiBkM19zdmdfbGluZUJ1bmRsZShwb2ludHMsIHRlbnNpb24pIHtcbiAgICB2YXIgbiA9IHBvaW50cy5sZW5ndGggLSAxO1xuICAgIGlmIChuKSB7XG4gICAgICB2YXIgeDAgPSBwb2ludHNbMF1bMF0sIHkwID0gcG9pbnRzWzBdWzFdLCBkeCA9IHBvaW50c1tuXVswXSAtIHgwLCBkeSA9IHBvaW50c1tuXVsxXSAtIHkwLCBpID0gLTEsIHAsIHQ7XG4gICAgICB3aGlsZSAoKytpIDw9IG4pIHtcbiAgICAgICAgcCA9IHBvaW50c1tpXTtcbiAgICAgICAgdCA9IGkgLyBuO1xuICAgICAgICBwWzBdID0gdGVuc2lvbiAqIHBbMF0gKyAoMSAtIHRlbnNpb24pICogKHgwICsgdCAqIGR4KTtcbiAgICAgICAgcFsxXSA9IHRlbnNpb24gKiBwWzFdICsgKDEgLSB0ZW5zaW9uKSAqICh5MCArIHQgKiBkeSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkM19zdmdfbGluZUJhc2lzKHBvaW50cyk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2xpbmVEb3Q0KGEsIGIpIHtcbiAgICByZXR1cm4gYVswXSAqIGJbMF0gKyBhWzFdICogYlsxXSArIGFbMl0gKiBiWzJdICsgYVszXSAqIGJbM107XG4gIH1cbiAgdmFyIGQzX3N2Z19saW5lQmFzaXNCZXppZXIxID0gWyAwLCAyIC8gMywgMSAvIDMsIDAgXSwgZDNfc3ZnX2xpbmVCYXNpc0JlemllcjIgPSBbIDAsIDEgLyAzLCAyIC8gMywgMCBdLCBkM19zdmdfbGluZUJhc2lzQmV6aWVyMyA9IFsgMCwgMSAvIDYsIDIgLyAzLCAxIC8gNiBdO1xuICBmdW5jdGlvbiBkM19zdmdfbGluZUJhc2lzQmV6aWVyKHBhdGgsIHgsIHkpIHtcbiAgICBwYXRoLnB1c2goXCJDXCIsIGQzX3N2Z19saW5lRG90NChkM19zdmdfbGluZUJhc2lzQmV6aWVyMSwgeCksIFwiLFwiLCBkM19zdmdfbGluZURvdDQoZDNfc3ZnX2xpbmVCYXNpc0JlemllcjEsIHkpLCBcIixcIiwgZDNfc3ZnX2xpbmVEb3Q0KGQzX3N2Z19saW5lQmFzaXNCZXppZXIyLCB4KSwgXCIsXCIsIGQzX3N2Z19saW5lRG90NChkM19zdmdfbGluZUJhc2lzQmV6aWVyMiwgeSksIFwiLFwiLCBkM19zdmdfbGluZURvdDQoZDNfc3ZnX2xpbmVCYXNpc0JlemllcjMsIHgpLCBcIixcIiwgZDNfc3ZnX2xpbmVEb3Q0KGQzX3N2Z19saW5lQmFzaXNCZXppZXIzLCB5KSk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2xpbmVTbG9wZShwMCwgcDEpIHtcbiAgICByZXR1cm4gKHAxWzFdIC0gcDBbMV0pIC8gKHAxWzBdIC0gcDBbMF0pO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3N2Z19saW5lRmluaXRlRGlmZmVyZW5jZXMocG9pbnRzKSB7XG4gICAgdmFyIGkgPSAwLCBqID0gcG9pbnRzLmxlbmd0aCAtIDEsIG0gPSBbXSwgcDAgPSBwb2ludHNbMF0sIHAxID0gcG9pbnRzWzFdLCBkID0gbVswXSA9IGQzX3N2Z19saW5lU2xvcGUocDAsIHAxKTtcbiAgICB3aGlsZSAoKytpIDwgaikge1xuICAgICAgbVtpXSA9IChkICsgKGQgPSBkM19zdmdfbGluZVNsb3BlKHAwID0gcDEsIHAxID0gcG9pbnRzW2kgKyAxXSkpKSAvIDI7XG4gICAgfVxuICAgIG1baV0gPSBkO1xuICAgIHJldHVybiBtO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3N2Z19saW5lTW9ub3RvbmVUYW5nZW50cyhwb2ludHMpIHtcbiAgICB2YXIgdGFuZ2VudHMgPSBbXSwgZCwgYSwgYiwgcywgbSA9IGQzX3N2Z19saW5lRmluaXRlRGlmZmVyZW5jZXMocG9pbnRzKSwgaSA9IC0xLCBqID0gcG9pbnRzLmxlbmd0aCAtIDE7XG4gICAgd2hpbGUgKCsraSA8IGopIHtcbiAgICAgIGQgPSBkM19zdmdfbGluZVNsb3BlKHBvaW50c1tpXSwgcG9pbnRzW2kgKyAxXSk7XG4gICAgICBpZiAoTWF0aC5hYnMoZCkgPCAxZS02KSB7XG4gICAgICAgIG1baV0gPSBtW2kgKyAxXSA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhID0gbVtpXSAvIGQ7XG4gICAgICAgIGIgPSBtW2kgKyAxXSAvIGQ7XG4gICAgICAgIHMgPSBhICogYSArIGIgKiBiO1xuICAgICAgICBpZiAocyA+IDkpIHtcbiAgICAgICAgICBzID0gZCAqIDMgLyBNYXRoLnNxcnQocyk7XG4gICAgICAgICAgbVtpXSA9IHMgKiBhO1xuICAgICAgICAgIG1baSArIDFdID0gcyAqIGI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaSA9IC0xO1xuICAgIHdoaWxlICgrK2kgPD0gaikge1xuICAgICAgcyA9IChwb2ludHNbTWF0aC5taW4oaiwgaSArIDEpXVswXSAtIHBvaW50c1tNYXRoLm1heCgwLCBpIC0gMSldWzBdKSAvICg2ICogKDEgKyBtW2ldICogbVtpXSkpO1xuICAgICAgdGFuZ2VudHMucHVzaChbIHMgfHwgMCwgbVtpXSAqIHMgfHwgMCBdKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhbmdlbnRzO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3N2Z19saW5lTW9ub3RvbmUocG9pbnRzKSB7XG4gICAgcmV0dXJuIHBvaW50cy5sZW5ndGggPCAzID8gZDNfc3ZnX2xpbmVMaW5lYXIocG9pbnRzKSA6IHBvaW50c1swXSArIGQzX3N2Z19saW5lSGVybWl0ZShwb2ludHMsIGQzX3N2Z19saW5lTW9ub3RvbmVUYW5nZW50cyhwb2ludHMpKTtcbiAgfVxuICBkMy5nZW9tLmh1bGwgPSBmdW5jdGlvbih2ZXJ0aWNlcykge1xuICAgIHZhciB4ID0gZDNfc3ZnX2xpbmVYLCB5ID0gZDNfc3ZnX2xpbmVZO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gaHVsbCh2ZXJ0aWNlcyk7XG4gICAgZnVuY3Rpb24gaHVsbChkYXRhKSB7XG4gICAgICBpZiAoZGF0YS5sZW5ndGggPCAzKSByZXR1cm4gW107XG4gICAgICB2YXIgZnggPSBkM19mdW5jdG9yKHgpLCBmeSA9IGQzX2Z1bmN0b3IoeSksIG4gPSBkYXRhLmxlbmd0aCwgdmVydGljZXMsIHBsZW4gPSBuIC0gMSwgcG9pbnRzID0gW10sIHN0YWNrID0gW10sIGQsIGksIGosIGggPSAwLCB4MSwgeTEsIHgyLCB5MiwgdSwgdiwgYSwgc3A7XG4gICAgICBpZiAoZnggPT09IGQzX3N2Z19saW5lWCAmJiB5ID09PSBkM19zdmdfbGluZVkpIHZlcnRpY2VzID0gZGF0YTsgZWxzZSBmb3IgKGkgPSAwLCBcbiAgICAgIHZlcnRpY2VzID0gW107IGkgPCBuOyArK2kpIHtcbiAgICAgICAgdmVydGljZXMucHVzaChbICtmeC5jYWxsKHRoaXMsIGQgPSBkYXRhW2ldLCBpKSwgK2Z5LmNhbGwodGhpcywgZCwgaSkgXSk7XG4gICAgICB9XG4gICAgICBmb3IgKGkgPSAxOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIGlmICh2ZXJ0aWNlc1tpXVsxXSA8IHZlcnRpY2VzW2hdWzFdIHx8IHZlcnRpY2VzW2ldWzFdID09IHZlcnRpY2VzW2hdWzFdICYmIHZlcnRpY2VzW2ldWzBdIDwgdmVydGljZXNbaF1bMF0pIGggPSBpO1xuICAgICAgfVxuICAgICAgZm9yIChpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgICBpZiAoaSA9PT0gaCkgY29udGludWU7XG4gICAgICAgIHkxID0gdmVydGljZXNbaV1bMV0gLSB2ZXJ0aWNlc1toXVsxXTtcbiAgICAgICAgeDEgPSB2ZXJ0aWNlc1tpXVswXSAtIHZlcnRpY2VzW2hdWzBdO1xuICAgICAgICBwb2ludHMucHVzaCh7XG4gICAgICAgICAgYW5nbGU6IE1hdGguYXRhbjIoeTEsIHgxKSxcbiAgICAgICAgICBpbmRleDogaVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHBvaW50cy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEuYW5nbGUgLSBiLmFuZ2xlO1xuICAgICAgfSk7XG4gICAgICBhID0gcG9pbnRzWzBdLmFuZ2xlO1xuICAgICAgdiA9IHBvaW50c1swXS5pbmRleDtcbiAgICAgIHUgPSAwO1xuICAgICAgZm9yIChpID0gMTsgaSA8IHBsZW47ICsraSkge1xuICAgICAgICBqID0gcG9pbnRzW2ldLmluZGV4O1xuICAgICAgICBpZiAoYSA9PSBwb2ludHNbaV0uYW5nbGUpIHtcbiAgICAgICAgICB4MSA9IHZlcnRpY2VzW3ZdWzBdIC0gdmVydGljZXNbaF1bMF07XG4gICAgICAgICAgeTEgPSB2ZXJ0aWNlc1t2XVsxXSAtIHZlcnRpY2VzW2hdWzFdO1xuICAgICAgICAgIHgyID0gdmVydGljZXNbal1bMF0gLSB2ZXJ0aWNlc1toXVswXTtcbiAgICAgICAgICB5MiA9IHZlcnRpY2VzW2pdWzFdIC0gdmVydGljZXNbaF1bMV07XG4gICAgICAgICAgaWYgKHgxICogeDEgKyB5MSAqIHkxID49IHgyICogeDIgKyB5MiAqIHkyKSB7XG4gICAgICAgICAgICBwb2ludHNbaV0uaW5kZXggPSAtMTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwb2ludHNbdV0uaW5kZXggPSAtMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYSA9IHBvaW50c1tpXS5hbmdsZTtcbiAgICAgICAgdSA9IGk7XG4gICAgICAgIHYgPSBqO1xuICAgICAgfVxuICAgICAgc3RhY2sucHVzaChoKTtcbiAgICAgIGZvciAoaSA9IDAsIGogPSAwOyBpIDwgMjsgKytqKSB7XG4gICAgICAgIGlmIChwb2ludHNbal0uaW5kZXggPiAtMSkge1xuICAgICAgICAgIHN0YWNrLnB1c2gocG9pbnRzW2pdLmluZGV4KTtcbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNwID0gc3RhY2subGVuZ3RoO1xuICAgICAgZm9yICg7aiA8IHBsZW47ICsraikge1xuICAgICAgICBpZiAocG9pbnRzW2pdLmluZGV4IDwgMCkgY29udGludWU7XG4gICAgICAgIHdoaWxlICghZDNfZ2VvbV9odWxsQ0NXKHN0YWNrW3NwIC0gMl0sIHN0YWNrW3NwIC0gMV0sIHBvaW50c1tqXS5pbmRleCwgdmVydGljZXMpKSB7XG4gICAgICAgICAgLS1zcDtcbiAgICAgICAgfVxuICAgICAgICBzdGFja1tzcCsrXSA9IHBvaW50c1tqXS5pbmRleDtcbiAgICAgIH1cbiAgICAgIHZhciBwb2x5ID0gW107XG4gICAgICBmb3IgKGkgPSBzcCAtIDE7IGkgPj0gMDsgLS1pKSBwb2x5LnB1c2goZGF0YVtzdGFja1tpXV0pO1xuICAgICAgcmV0dXJuIHBvbHk7XG4gICAgfVxuICAgIGh1bGwueCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHggPSBfLCBodWxsKSA6IHg7XG4gICAgfTtcbiAgICBodWxsLnkgPSBmdW5jdGlvbihfKSB7XG4gICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh5ID0gXywgaHVsbCkgOiB5O1xuICAgIH07XG4gICAgcmV0dXJuIGh1bGw7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2dlb21faHVsbENDVyhpMSwgaTIsIGkzLCB2KSB7XG4gICAgdmFyIHQsIGEsIGIsIGMsIGQsIGUsIGY7XG4gICAgdCA9IHZbaTFdO1xuICAgIGEgPSB0WzBdO1xuICAgIGIgPSB0WzFdO1xuICAgIHQgPSB2W2kyXTtcbiAgICBjID0gdFswXTtcbiAgICBkID0gdFsxXTtcbiAgICB0ID0gdltpM107XG4gICAgZSA9IHRbMF07XG4gICAgZiA9IHRbMV07XG4gICAgcmV0dXJuIChmIC0gYikgKiAoYyAtIGEpIC0gKGQgLSBiKSAqIChlIC0gYSkgPiAwO1xuICB9XG4gIGQzLmdlb20ucG9seWdvbiA9IGZ1bmN0aW9uKGNvb3JkaW5hdGVzKSB7XG4gICAgZDNfc3ViY2xhc3MoY29vcmRpbmF0ZXMsIGQzX2dlb21fcG9seWdvblByb3RvdHlwZSk7XG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzO1xuICB9O1xuICB2YXIgZDNfZ2VvbV9wb2x5Z29uUHJvdG90eXBlID0gZDMuZ2VvbS5wb2x5Z29uLnByb3RvdHlwZSA9IFtdO1xuICBkM19nZW9tX3BvbHlnb25Qcm90b3R5cGUuYXJlYSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpID0gLTEsIG4gPSB0aGlzLmxlbmd0aCwgYSwgYiA9IHRoaXNbbiAtIDFdLCBhcmVhID0gMDtcbiAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgYSA9IGI7XG4gICAgICBiID0gdGhpc1tpXTtcbiAgICAgIGFyZWEgKz0gYVsxXSAqIGJbMF0gLSBhWzBdICogYlsxXTtcbiAgICB9XG4gICAgcmV0dXJuIGFyZWEgKiAuNTtcbiAgfTtcbiAgZDNfZ2VvbV9wb2x5Z29uUHJvdG90eXBlLmNlbnRyb2lkID0gZnVuY3Rpb24oaykge1xuICAgIHZhciBpID0gLTEsIG4gPSB0aGlzLmxlbmd0aCwgeCA9IDAsIHkgPSAwLCBhLCBiID0gdGhpc1tuIC0gMV0sIGM7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSBrID0gLTEgLyAoNiAqIHRoaXMuYXJlYSgpKTtcbiAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgYSA9IGI7XG4gICAgICBiID0gdGhpc1tpXTtcbiAgICAgIGMgPSBhWzBdICogYlsxXSAtIGJbMF0gKiBhWzFdO1xuICAgICAgeCArPSAoYVswXSArIGJbMF0pICogYztcbiAgICAgIHkgKz0gKGFbMV0gKyBiWzFdKSAqIGM7XG4gICAgfVxuICAgIHJldHVybiBbIHggKiBrLCB5ICogayBdO1xuICB9O1xuICBkM19nZW9tX3BvbHlnb25Qcm90b3R5cGUuY2xpcCA9IGZ1bmN0aW9uKHN1YmplY3QpIHtcbiAgICB2YXIgaW5wdXQsIGNsb3NlZCA9IGQzX2dlb21fcG9seWdvbkNsb3NlZChzdWJqZWN0KSwgaSA9IC0xLCBuID0gdGhpcy5sZW5ndGggLSBkM19nZW9tX3BvbHlnb25DbG9zZWQodGhpcyksIGosIG0sIGEgPSB0aGlzW24gLSAxXSwgYiwgYywgZDtcbiAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgaW5wdXQgPSBzdWJqZWN0LnNsaWNlKCk7XG4gICAgICBzdWJqZWN0Lmxlbmd0aCA9IDA7XG4gICAgICBiID0gdGhpc1tpXTtcbiAgICAgIGMgPSBpbnB1dFsobSA9IGlucHV0Lmxlbmd0aCAtIGNsb3NlZCkgLSAxXTtcbiAgICAgIGogPSAtMTtcbiAgICAgIHdoaWxlICgrK2ogPCBtKSB7XG4gICAgICAgIGQgPSBpbnB1dFtqXTtcbiAgICAgICAgaWYgKGQzX2dlb21fcG9seWdvbkluc2lkZShkLCBhLCBiKSkge1xuICAgICAgICAgIGlmICghZDNfZ2VvbV9wb2x5Z29uSW5zaWRlKGMsIGEsIGIpKSB7XG4gICAgICAgICAgICBzdWJqZWN0LnB1c2goZDNfZ2VvbV9wb2x5Z29uSW50ZXJzZWN0KGMsIGQsIGEsIGIpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3ViamVjdC5wdXNoKGQpO1xuICAgICAgICB9IGVsc2UgaWYgKGQzX2dlb21fcG9seWdvbkluc2lkZShjLCBhLCBiKSkge1xuICAgICAgICAgIHN1YmplY3QucHVzaChkM19nZW9tX3BvbHlnb25JbnRlcnNlY3QoYywgZCwgYSwgYikpO1xuICAgICAgICB9XG4gICAgICAgIGMgPSBkO1xuICAgICAgfVxuICAgICAgaWYgKGNsb3NlZCkgc3ViamVjdC5wdXNoKHN1YmplY3RbMF0pO1xuICAgICAgYSA9IGI7XG4gICAgfVxuICAgIHJldHVybiBzdWJqZWN0O1xuICB9O1xuICBmdW5jdGlvbiBkM19nZW9tX3BvbHlnb25JbnNpZGUocCwgYSwgYikge1xuICAgIHJldHVybiAoYlswXSAtIGFbMF0pICogKHBbMV0gLSBhWzFdKSA8IChiWzFdIC0gYVsxXSkgKiAocFswXSAtIGFbMF0pO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb21fcG9seWdvbkludGVyc2VjdChjLCBkLCBhLCBiKSB7XG4gICAgdmFyIHgxID0gY1swXSwgeDMgPSBhWzBdLCB4MjEgPSBkWzBdIC0geDEsIHg0MyA9IGJbMF0gLSB4MywgeTEgPSBjWzFdLCB5MyA9IGFbMV0sIHkyMSA9IGRbMV0gLSB5MSwgeTQzID0gYlsxXSAtIHkzLCB1YSA9ICh4NDMgKiAoeTEgLSB5MykgLSB5NDMgKiAoeDEgLSB4MykpIC8gKHk0MyAqIHgyMSAtIHg0MyAqIHkyMSk7XG4gICAgcmV0dXJuIFsgeDEgKyB1YSAqIHgyMSwgeTEgKyB1YSAqIHkyMSBdO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb21fcG9seWdvbkNsb3NlZChjb29yZGluYXRlcykge1xuICAgIHZhciBhID0gY29vcmRpbmF0ZXNbMF0sIGIgPSBjb29yZGluYXRlc1tjb29yZGluYXRlcy5sZW5ndGggLSAxXTtcbiAgICByZXR1cm4gIShhWzBdIC0gYlswXSB8fCBhWzFdIC0gYlsxXSk7XG4gIH1cbiAgZDMuZ2VvbS5kZWxhdW5heSA9IGZ1bmN0aW9uKHZlcnRpY2VzKSB7XG4gICAgdmFyIGVkZ2VzID0gdmVydGljZXMubWFwKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH0pLCB0cmlhbmdsZXMgPSBbXTtcbiAgICBkM19nZW9tX3Zvcm9ub2lUZXNzZWxsYXRlKHZlcnRpY2VzLCBmdW5jdGlvbihlKSB7XG4gICAgICBlZGdlc1tlLnJlZ2lvbi5sLmluZGV4XS5wdXNoKHZlcnRpY2VzW2UucmVnaW9uLnIuaW5kZXhdKTtcbiAgICB9KTtcbiAgICBlZGdlcy5mb3JFYWNoKGZ1bmN0aW9uKGVkZ2UsIGkpIHtcbiAgICAgIHZhciB2ID0gdmVydGljZXNbaV0sIGN4ID0gdlswXSwgY3kgPSB2WzFdO1xuICAgICAgZWRnZS5mb3JFYWNoKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgdi5hbmdsZSA9IE1hdGguYXRhbjIodlswXSAtIGN4LCB2WzFdIC0gY3kpO1xuICAgICAgfSk7XG4gICAgICBlZGdlLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gYS5hbmdsZSAtIGIuYW5nbGU7XG4gICAgICB9KTtcbiAgICAgIGZvciAodmFyIGogPSAwLCBtID0gZWRnZS5sZW5ndGggLSAxOyBqIDwgbTsgaisrKSB7XG4gICAgICAgIHRyaWFuZ2xlcy5wdXNoKFsgdiwgZWRnZVtqXSwgZWRnZVtqICsgMV0gXSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRyaWFuZ2xlcztcbiAgfTtcbiAgZDMuZ2VvbS52b3Jvbm9pID0gZnVuY3Rpb24ocG9pbnRzKSB7XG4gICAgdmFyIHggPSBkM19zdmdfbGluZVgsIHkgPSBkM19zdmdfbGluZVksIGNsaXBQb2x5Z29uID0gbnVsbDtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHZvcm9ub2kocG9pbnRzKTtcbiAgICBmdW5jdGlvbiB2b3Jvbm9pKGRhdGEpIHtcbiAgICAgIHZhciBwb2ludHMsIHBvbHlnb25zID0gZGF0YS5tYXAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0pLCBmeCA9IGQzX2Z1bmN0b3IoeCksIGZ5ID0gZDNfZnVuY3Rvcih5KSwgZCwgaSwgbiA9IGRhdGEubGVuZ3RoLCBaID0gMWU2O1xuICAgICAgaWYgKGZ4ID09PSBkM19zdmdfbGluZVggJiYgZnkgPT09IGQzX3N2Z19saW5lWSkgcG9pbnRzID0gZGF0YTsgZWxzZSBmb3IgKHBvaW50cyA9IG5ldyBBcnJheShuKSwgXG4gICAgICBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgICBwb2ludHNbaV0gPSBbICtmeC5jYWxsKHRoaXMsIGQgPSBkYXRhW2ldLCBpKSwgK2Z5LmNhbGwodGhpcywgZCwgaSkgXTtcbiAgICAgIH1cbiAgICAgIGQzX2dlb21fdm9yb25vaVRlc3NlbGxhdGUocG9pbnRzLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBzMSwgczIsIHgxLCB4MiwgeTEsIHkyO1xuICAgICAgICBpZiAoZS5hID09PSAxICYmIGUuYiA+PSAwKSB7XG4gICAgICAgICAgczEgPSBlLmVwLnI7XG4gICAgICAgICAgczIgPSBlLmVwLmw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgczEgPSBlLmVwLmw7XG4gICAgICAgICAgczIgPSBlLmVwLnI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUuYSA9PT0gMSkge1xuICAgICAgICAgIHkxID0gczEgPyBzMS55IDogLVo7XG4gICAgICAgICAgeDEgPSBlLmMgLSBlLmIgKiB5MTtcbiAgICAgICAgICB5MiA9IHMyID8gczIueSA6IFo7XG4gICAgICAgICAgeDIgPSBlLmMgLSBlLmIgKiB5MjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB4MSA9IHMxID8gczEueCA6IC1aO1xuICAgICAgICAgIHkxID0gZS5jIC0gZS5hICogeDE7XG4gICAgICAgICAgeDIgPSBzMiA/IHMyLnggOiBaO1xuICAgICAgICAgIHkyID0gZS5jIC0gZS5hICogeDI7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHYxID0gWyB4MSwgeTEgXSwgdjIgPSBbIHgyLCB5MiBdO1xuICAgICAgICBwb2x5Z29uc1tlLnJlZ2lvbi5sLmluZGV4XS5wdXNoKHYxLCB2Mik7XG4gICAgICAgIHBvbHlnb25zW2UucmVnaW9uLnIuaW5kZXhdLnB1c2godjEsIHYyKTtcbiAgICAgIH0pO1xuICAgICAgcG9seWdvbnMgPSBwb2x5Z29ucy5tYXAoZnVuY3Rpb24ocG9seWdvbiwgaSkge1xuICAgICAgICB2YXIgY3ggPSBwb2ludHNbaV1bMF0sIGN5ID0gcG9pbnRzW2ldWzFdLCBhbmdsZSA9IHBvbHlnb24ubWFwKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICByZXR1cm4gTWF0aC5hdGFuMih2WzBdIC0gY3gsIHZbMV0gLSBjeSk7XG4gICAgICAgIH0pLCBvcmRlciA9IGQzLnJhbmdlKHBvbHlnb24ubGVuZ3RoKS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICByZXR1cm4gYW5nbGVbYV0gLSBhbmdsZVtiXTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvcmRlci5maWx0ZXIoZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgIHJldHVybiAhaSB8fCBhbmdsZVtkXSAtIGFuZ2xlW29yZGVyW2kgLSAxXV0gPiDOtTtcbiAgICAgICAgfSkubWFwKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4gcG9seWdvbltkXTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHBvbHlnb25zLmZvckVhY2goZnVuY3Rpb24ocG9seWdvbiwgaSkge1xuICAgICAgICB2YXIgbiA9IHBvbHlnb24ubGVuZ3RoO1xuICAgICAgICBpZiAoIW4pIHJldHVybiBwb2x5Z29uLnB1c2goWyAtWiwgLVogXSwgWyAtWiwgWiBdLCBbIFosIFogXSwgWyBaLCAtWiBdKTtcbiAgICAgICAgaWYgKG4gPiAyKSByZXR1cm47XG4gICAgICAgIHZhciBwMCA9IHBvaW50c1tpXSwgcDEgPSBwb2x5Z29uWzBdLCBwMiA9IHBvbHlnb25bMV0sIHgwID0gcDBbMF0sIHkwID0gcDBbMV0sIHgxID0gcDFbMF0sIHkxID0gcDFbMV0sIHgyID0gcDJbMF0sIHkyID0gcDJbMV0sIGR4ID0gTWF0aC5hYnMoeDIgLSB4MSksIGR5ID0geTIgLSB5MTtcbiAgICAgICAgaWYgKE1hdGguYWJzKGR5KSA8IM61KSB7XG4gICAgICAgICAgdmFyIHkgPSB5MCA8IHkxID8gLVogOiBaO1xuICAgICAgICAgIHBvbHlnb24ucHVzaChbIC1aLCB5IF0sIFsgWiwgeSBdKTtcbiAgICAgICAgfSBlbHNlIGlmIChkeCA8IM61KSB7XG4gICAgICAgICAgdmFyIHggPSB4MCA8IHgxID8gLVogOiBaO1xuICAgICAgICAgIHBvbHlnb24ucHVzaChbIHgsIC1aIF0sIFsgeCwgWiBdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgeSA9ICh4MiAtIHgxKSAqICh5MSAtIHkwKSA8ICh4MSAtIHgwKSAqICh5MiAtIHkxKSA/IFogOiAtWiwgeiA9IE1hdGguYWJzKGR5KSAtIGR4O1xuICAgICAgICAgIGlmIChNYXRoLmFicyh6KSA8IM61KSB7XG4gICAgICAgICAgICBwb2x5Z29uLnB1c2goWyBkeSA8IDAgPyB5IDogLXksIHkgXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh6ID4gMCkgeSAqPSAtMTtcbiAgICAgICAgICAgIHBvbHlnb24ucHVzaChbIC1aLCB5IF0sIFsgWiwgeSBdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKGNsaXBQb2x5Z29uKSBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSBjbGlwUG9seWdvbi5jbGlwKHBvbHlnb25zW2ldKTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHBvbHlnb25zW2ldLnBvaW50ID0gZGF0YVtpXTtcbiAgICAgIHJldHVybiBwb2x5Z29ucztcbiAgICB9XG4gICAgdm9yb25vaS54ID0gZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoeCA9IF8sIHZvcm9ub2kpIDogeDtcbiAgICB9O1xuICAgIHZvcm9ub2kueSA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHkgPSBfLCB2b3Jvbm9pKSA6IHk7XG4gICAgfTtcbiAgICB2b3Jvbm9pLmNsaXBFeHRlbnQgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjbGlwUG9seWdvbiAmJiBbIGNsaXBQb2x5Z29uWzBdLCBjbGlwUG9seWdvblsyXSBdO1xuICAgICAgaWYgKF8gPT0gbnVsbCkgY2xpcFBvbHlnb24gPSBudWxsOyBlbHNlIHtcbiAgICAgICAgdmFyIHgxID0gK19bMF1bMF0sIHkxID0gK19bMF1bMV0sIHgyID0gK19bMV1bMF0sIHkyID0gK19bMV1bMV07XG4gICAgICAgIGNsaXBQb2x5Z29uID0gZDMuZ2VvbS5wb2x5Z29uKFsgWyB4MSwgeTEgXSwgWyB4MSwgeTIgXSwgWyB4MiwgeTIgXSwgWyB4MiwgeTEgXSBdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2b3Jvbm9pO1xuICAgIH07XG4gICAgdm9yb25vaS5zaXplID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY2xpcFBvbHlnb24gJiYgY2xpcFBvbHlnb25bMl07XG4gICAgICByZXR1cm4gdm9yb25vaS5jbGlwRXh0ZW50KF8gJiYgWyBbIDAsIDAgXSwgXyBdKTtcbiAgICB9O1xuICAgIHZvcm9ub2kubGlua3MgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICB2YXIgcG9pbnRzLCBncmFwaCA9IGRhdGEubWFwKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9KSwgbGlua3MgPSBbXSwgZnggPSBkM19mdW5jdG9yKHgpLCBmeSA9IGQzX2Z1bmN0b3IoeSksIGQsIGksIG4gPSBkYXRhLmxlbmd0aDtcbiAgICAgIGlmIChmeCA9PT0gZDNfc3ZnX2xpbmVYICYmIGZ5ID09PSBkM19zdmdfbGluZVkpIHBvaW50cyA9IGRhdGE7IGVsc2UgZm9yIChwb2ludHMgPSBuZXcgQXJyYXkobiksIFxuICAgICAgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgcG9pbnRzW2ldID0gWyArZnguY2FsbCh0aGlzLCBkID0gZGF0YVtpXSwgaSksICtmeS5jYWxsKHRoaXMsIGQsIGkpIF07XG4gICAgICB9XG4gICAgICBkM19nZW9tX3Zvcm9ub2lUZXNzZWxsYXRlKHBvaW50cywgZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgbCA9IGUucmVnaW9uLmwuaW5kZXgsIHIgPSBlLnJlZ2lvbi5yLmluZGV4O1xuICAgICAgICBpZiAoZ3JhcGhbbF1bcl0pIHJldHVybjtcbiAgICAgICAgZ3JhcGhbbF1bcl0gPSBncmFwaFtyXVtsXSA9IHRydWU7XG4gICAgICAgIGxpbmtzLnB1c2goe1xuICAgICAgICAgIHNvdXJjZTogZGF0YVtsXSxcbiAgICAgICAgICB0YXJnZXQ6IGRhdGFbcl1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBsaW5rcztcbiAgICB9O1xuICAgIHZvcm9ub2kudHJpYW5nbGVzID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgaWYgKHggPT09IGQzX3N2Z19saW5lWCAmJiB5ID09PSBkM19zdmdfbGluZVkpIHJldHVybiBkMy5nZW9tLmRlbGF1bmF5KGRhdGEpO1xuICAgICAgdmFyIHBvaW50cyA9IG5ldyBBcnJheShuKSwgZnggPSBkM19mdW5jdG9yKHgpLCBmeSA9IGQzX2Z1bmN0b3IoeSksIGQsIGkgPSAtMSwgbiA9IGRhdGEubGVuZ3RoO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgKHBvaW50c1tpXSA9IFsgK2Z4LmNhbGwodGhpcywgZCA9IGRhdGFbaV0sIGkpLCArZnkuY2FsbCh0aGlzLCBkLCBpKSBdKS5kYXRhID0gZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkMy5nZW9tLmRlbGF1bmF5KHBvaW50cykubWFwKGZ1bmN0aW9uKHRyaWFuZ2xlKSB7XG4gICAgICAgIHJldHVybiB0cmlhbmdsZS5tYXAoZnVuY3Rpb24ocG9pbnQpIHtcbiAgICAgICAgICByZXR1cm4gcG9pbnQuZGF0YTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiB2b3Jvbm9pO1xuICB9O1xuICB2YXIgZDNfZ2VvbV92b3Jvbm9pT3Bwb3NpdGUgPSB7XG4gICAgbDogXCJyXCIsXG4gICAgcjogXCJsXCJcbiAgfTtcbiAgZnVuY3Rpb24gZDNfZ2VvbV92b3Jvbm9pVGVzc2VsbGF0ZShwb2ludHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIFNpdGVzID0ge1xuICAgICAgbGlzdDogcG9pbnRzLm1hcChmdW5jdGlvbih2LCBpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaW5kZXg6IGksXG4gICAgICAgICAgeDogdlswXSxcbiAgICAgICAgICB5OiB2WzFdXG4gICAgICAgIH07XG4gICAgICB9KS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEueSA8IGIueSA/IC0xIDogYS55ID4gYi55ID8gMSA6IGEueCA8IGIueCA/IC0xIDogYS54ID4gYi54ID8gMSA6IDA7XG4gICAgICB9KSxcbiAgICAgIGJvdHRvbVNpdGU6IG51bGxcbiAgICB9O1xuICAgIHZhciBFZGdlTGlzdCA9IHtcbiAgICAgIGxpc3Q6IFtdLFxuICAgICAgbGVmdEVuZDogbnVsbCxcbiAgICAgIHJpZ2h0RW5kOiBudWxsLFxuICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIEVkZ2VMaXN0LmxlZnRFbmQgPSBFZGdlTGlzdC5jcmVhdGVIYWxmRWRnZShudWxsLCBcImxcIik7XG4gICAgICAgIEVkZ2VMaXN0LnJpZ2h0RW5kID0gRWRnZUxpc3QuY3JlYXRlSGFsZkVkZ2UobnVsbCwgXCJsXCIpO1xuICAgICAgICBFZGdlTGlzdC5sZWZ0RW5kLnIgPSBFZGdlTGlzdC5yaWdodEVuZDtcbiAgICAgICAgRWRnZUxpc3QucmlnaHRFbmQubCA9IEVkZ2VMaXN0LmxlZnRFbmQ7XG4gICAgICAgIEVkZ2VMaXN0Lmxpc3QudW5zaGlmdChFZGdlTGlzdC5sZWZ0RW5kLCBFZGdlTGlzdC5yaWdodEVuZCk7XG4gICAgICB9LFxuICAgICAgY3JlYXRlSGFsZkVkZ2U6IGZ1bmN0aW9uKGVkZ2UsIHNpZGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBlZGdlOiBlZGdlLFxuICAgICAgICAgIHNpZGU6IHNpZGUsXG4gICAgICAgICAgdmVydGV4OiBudWxsLFxuICAgICAgICAgIGw6IG51bGwsXG4gICAgICAgICAgcjogbnVsbFxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGluc2VydDogZnVuY3Rpb24obGIsIGhlKSB7XG4gICAgICAgIGhlLmwgPSBsYjtcbiAgICAgICAgaGUuciA9IGxiLnI7XG4gICAgICAgIGxiLnIubCA9IGhlO1xuICAgICAgICBsYi5yID0gaGU7XG4gICAgICB9LFxuICAgICAgbGVmdEJvdW5kOiBmdW5jdGlvbihwKSB7XG4gICAgICAgIHZhciBoZSA9IEVkZ2VMaXN0LmxlZnRFbmQ7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICBoZSA9IGhlLnI7XG4gICAgICAgIH0gd2hpbGUgKGhlICE9IEVkZ2VMaXN0LnJpZ2h0RW5kICYmIEdlb20ucmlnaHRPZihoZSwgcCkpO1xuICAgICAgICBoZSA9IGhlLmw7XG4gICAgICAgIHJldHVybiBoZTtcbiAgICAgIH0sXG4gICAgICBkZWw6IGZ1bmN0aW9uKGhlKSB7XG4gICAgICAgIGhlLmwuciA9IGhlLnI7XG4gICAgICAgIGhlLnIubCA9IGhlLmw7XG4gICAgICAgIGhlLmVkZ2UgPSBudWxsO1xuICAgICAgfSxcbiAgICAgIHJpZ2h0OiBmdW5jdGlvbihoZSkge1xuICAgICAgICByZXR1cm4gaGUucjtcbiAgICAgIH0sXG4gICAgICBsZWZ0OiBmdW5jdGlvbihoZSkge1xuICAgICAgICByZXR1cm4gaGUubDtcbiAgICAgIH0sXG4gICAgICBsZWZ0UmVnaW9uOiBmdW5jdGlvbihoZSkge1xuICAgICAgICByZXR1cm4gaGUuZWRnZSA9PSBudWxsID8gU2l0ZXMuYm90dG9tU2l0ZSA6IGhlLmVkZ2UucmVnaW9uW2hlLnNpZGVdO1xuICAgICAgfSxcbiAgICAgIHJpZ2h0UmVnaW9uOiBmdW5jdGlvbihoZSkge1xuICAgICAgICByZXR1cm4gaGUuZWRnZSA9PSBudWxsID8gU2l0ZXMuYm90dG9tU2l0ZSA6IGhlLmVkZ2UucmVnaW9uW2QzX2dlb21fdm9yb25vaU9wcG9zaXRlW2hlLnNpZGVdXTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBHZW9tID0ge1xuICAgICAgYmlzZWN0OiBmdW5jdGlvbihzMSwgczIpIHtcbiAgICAgICAgdmFyIG5ld0VkZ2UgPSB7XG4gICAgICAgICAgcmVnaW9uOiB7XG4gICAgICAgICAgICBsOiBzMSxcbiAgICAgICAgICAgIHI6IHMyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcDoge1xuICAgICAgICAgICAgbDogbnVsbCxcbiAgICAgICAgICAgIHI6IG51bGxcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciBkeCA9IHMyLnggLSBzMS54LCBkeSA9IHMyLnkgLSBzMS55LCBhZHggPSBkeCA+IDAgPyBkeCA6IC1keCwgYWR5ID0gZHkgPiAwID8gZHkgOiAtZHk7XG4gICAgICAgIG5ld0VkZ2UuYyA9IHMxLnggKiBkeCArIHMxLnkgKiBkeSArIChkeCAqIGR4ICsgZHkgKiBkeSkgKiAuNTtcbiAgICAgICAgaWYgKGFkeCA+IGFkeSkge1xuICAgICAgICAgIG5ld0VkZ2UuYSA9IDE7XG4gICAgICAgICAgbmV3RWRnZS5iID0gZHkgLyBkeDtcbiAgICAgICAgICBuZXdFZGdlLmMgLz0gZHg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3RWRnZS5iID0gMTtcbiAgICAgICAgICBuZXdFZGdlLmEgPSBkeCAvIGR5O1xuICAgICAgICAgIG5ld0VkZ2UuYyAvPSBkeTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3RWRnZTtcbiAgICAgIH0sXG4gICAgICBpbnRlcnNlY3Q6IGZ1bmN0aW9uKGVsMSwgZWwyKSB7XG4gICAgICAgIHZhciBlMSA9IGVsMS5lZGdlLCBlMiA9IGVsMi5lZGdlO1xuICAgICAgICBpZiAoIWUxIHx8ICFlMiB8fCBlMS5yZWdpb24uciA9PSBlMi5yZWdpb24ucikge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkID0gZTEuYSAqIGUyLmIgLSBlMS5iICogZTIuYTtcbiAgICAgICAgaWYgKE1hdGguYWJzKGQpIDwgMWUtMTApIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgeGludCA9IChlMS5jICogZTIuYiAtIGUyLmMgKiBlMS5iKSAvIGQsIHlpbnQgPSAoZTIuYyAqIGUxLmEgLSBlMS5jICogZTIuYSkgLyBkLCBlMXIgPSBlMS5yZWdpb24uciwgZTJyID0gZTIucmVnaW9uLnIsIGVsLCBlO1xuICAgICAgICBpZiAoZTFyLnkgPCBlMnIueSB8fCBlMXIueSA9PSBlMnIueSAmJiBlMXIueCA8IGUyci54KSB7XG4gICAgICAgICAgZWwgPSBlbDE7XG4gICAgICAgICAgZSA9IGUxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsID0gZWwyO1xuICAgICAgICAgIGUgPSBlMjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmlnaHRPZlNpdGUgPSB4aW50ID49IGUucmVnaW9uLnIueDtcbiAgICAgICAgaWYgKHJpZ2h0T2ZTaXRlICYmIGVsLnNpZGUgPT09IFwibFwiIHx8ICFyaWdodE9mU2l0ZSAmJiBlbC5zaWRlID09PSBcInJcIikge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogeGludCxcbiAgICAgICAgICB5OiB5aW50XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgcmlnaHRPZjogZnVuY3Rpb24oaGUsIHApIHtcbiAgICAgICAgdmFyIGUgPSBoZS5lZGdlLCB0b3BzaXRlID0gZS5yZWdpb24uciwgcmlnaHRPZlNpdGUgPSBwLnggPiB0b3BzaXRlLng7XG4gICAgICAgIGlmIChyaWdodE9mU2l0ZSAmJiBoZS5zaWRlID09PSBcImxcIikge1xuICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmlnaHRPZlNpdGUgJiYgaGUuc2lkZSA9PT0gXCJyXCIpIHtcbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZS5hID09PSAxKSB7XG4gICAgICAgICAgdmFyIGR5cCA9IHAueSAtIHRvcHNpdGUueSwgZHhwID0gcC54IC0gdG9wc2l0ZS54LCBmYXN0ID0gMCwgYWJvdmUgPSAwO1xuICAgICAgICAgIGlmICghcmlnaHRPZlNpdGUgJiYgZS5iIDwgMCB8fCByaWdodE9mU2l0ZSAmJiBlLmIgPj0gMCkge1xuICAgICAgICAgICAgYWJvdmUgPSBmYXN0ID0gZHlwID49IGUuYiAqIGR4cDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWJvdmUgPSBwLnggKyBwLnkgKiBlLmIgPiBlLmM7XG4gICAgICAgICAgICBpZiAoZS5iIDwgMCkge1xuICAgICAgICAgICAgICBhYm92ZSA9ICFhYm92ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghYWJvdmUpIHtcbiAgICAgICAgICAgICAgZmFzdCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghZmFzdCkge1xuICAgICAgICAgICAgdmFyIGR4cyA9IHRvcHNpdGUueCAtIGUucmVnaW9uLmwueDtcbiAgICAgICAgICAgIGFib3ZlID0gZS5iICogKGR4cCAqIGR4cCAtIGR5cCAqIGR5cCkgPCBkeHMgKiBkeXAgKiAoMSArIDIgKiBkeHAgLyBkeHMgKyBlLmIgKiBlLmIpO1xuICAgICAgICAgICAgaWYgKGUuYiA8IDApIHtcbiAgICAgICAgICAgICAgYWJvdmUgPSAhYWJvdmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciB5bCA9IGUuYyAtIGUuYSAqIHAueCwgdDEgPSBwLnkgLSB5bCwgdDIgPSBwLnggLSB0b3BzaXRlLngsIHQzID0geWwgLSB0b3BzaXRlLnk7XG4gICAgICAgICAgYWJvdmUgPSB0MSAqIHQxID4gdDIgKiB0MiArIHQzICogdDM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhlLnNpZGUgPT09IFwibFwiID8gYWJvdmUgOiAhYWJvdmU7XG4gICAgICB9LFxuICAgICAgZW5kUG9pbnQ6IGZ1bmN0aW9uKGVkZ2UsIHNpZGUsIHNpdGUpIHtcbiAgICAgICAgZWRnZS5lcFtzaWRlXSA9IHNpdGU7XG4gICAgICAgIGlmICghZWRnZS5lcFtkM19nZW9tX3Zvcm9ub2lPcHBvc2l0ZVtzaWRlXV0pIHJldHVybjtcbiAgICAgICAgY2FsbGJhY2soZWRnZSk7XG4gICAgICB9LFxuICAgICAgZGlzdGFuY2U6IGZ1bmN0aW9uKHMsIHQpIHtcbiAgICAgICAgdmFyIGR4ID0gcy54IC0gdC54LCBkeSA9IHMueSAtIHQueTtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgRXZlbnRRdWV1ZSA9IHtcbiAgICAgIGxpc3Q6IFtdLFxuICAgICAgaW5zZXJ0OiBmdW5jdGlvbihoZSwgc2l0ZSwgb2Zmc2V0KSB7XG4gICAgICAgIGhlLnZlcnRleCA9IHNpdGU7XG4gICAgICAgIGhlLnlzdGFyID0gc2l0ZS55ICsgb2Zmc2V0O1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGlzdCA9IEV2ZW50UXVldWUubGlzdCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgdmFyIG5leHQgPSBsaXN0W2ldO1xuICAgICAgICAgIGlmIChoZS55c3RhciA+IG5leHQueXN0YXIgfHwgaGUueXN0YXIgPT0gbmV4dC55c3RhciAmJiBzaXRlLnggPiBuZXh0LnZlcnRleC54KSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxpc3Quc3BsaWNlKGksIDAsIGhlKTtcbiAgICAgIH0sXG4gICAgICBkZWw6IGZ1bmN0aW9uKGhlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBscyA9IEV2ZW50UXVldWUubGlzdCwgbCA9IGxzLmxlbmd0aDsgaSA8IGwgJiYgbHNbaV0gIT0gaGU7ICsraSkge31cbiAgICAgICAgbHMuc3BsaWNlKGksIDEpO1xuICAgICAgfSxcbiAgICAgIGVtcHR5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEV2ZW50UXVldWUubGlzdC5sZW5ndGggPT09IDA7XG4gICAgICB9LFxuICAgICAgbmV4dEV2ZW50OiBmdW5jdGlvbihoZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbHMgPSBFdmVudFF1ZXVlLmxpc3QsIGwgPSBscy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICBpZiAobHNbaV0gPT0gaGUpIHJldHVybiBsc1tpICsgMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9LFxuICAgICAgbWluOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsZW0gPSBFdmVudFF1ZXVlLmxpc3RbMF07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogZWxlbS52ZXJ0ZXgueCxcbiAgICAgICAgICB5OiBlbGVtLnlzdGFyXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgZXh0cmFjdE1pbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBFdmVudFF1ZXVlLmxpc3Quc2hpZnQoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIEVkZ2VMaXN0LmluaXQoKTtcbiAgICBTaXRlcy5ib3R0b21TaXRlID0gU2l0ZXMubGlzdC5zaGlmdCgpO1xuICAgIHZhciBuZXdTaXRlID0gU2l0ZXMubGlzdC5zaGlmdCgpLCBuZXdJbnRTdGFyO1xuICAgIHZhciBsYm5kLCByYm5kLCBsbGJuZCwgcnJibmQsIGJpc2VjdG9yO1xuICAgIHZhciBib3QsIHRvcCwgdGVtcCwgcCwgdjtcbiAgICB2YXIgZSwgcG07XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGlmICghRXZlbnRRdWV1ZS5lbXB0eSgpKSB7XG4gICAgICAgIG5ld0ludFN0YXIgPSBFdmVudFF1ZXVlLm1pbigpO1xuICAgICAgfVxuICAgICAgaWYgKG5ld1NpdGUgJiYgKEV2ZW50UXVldWUuZW1wdHkoKSB8fCBuZXdTaXRlLnkgPCBuZXdJbnRTdGFyLnkgfHwgbmV3U2l0ZS55ID09IG5ld0ludFN0YXIueSAmJiBuZXdTaXRlLnggPCBuZXdJbnRTdGFyLngpKSB7XG4gICAgICAgIGxibmQgPSBFZGdlTGlzdC5sZWZ0Qm91bmQobmV3U2l0ZSk7XG4gICAgICAgIHJibmQgPSBFZGdlTGlzdC5yaWdodChsYm5kKTtcbiAgICAgICAgYm90ID0gRWRnZUxpc3QucmlnaHRSZWdpb24obGJuZCk7XG4gICAgICAgIGUgPSBHZW9tLmJpc2VjdChib3QsIG5ld1NpdGUpO1xuICAgICAgICBiaXNlY3RvciA9IEVkZ2VMaXN0LmNyZWF0ZUhhbGZFZGdlKGUsIFwibFwiKTtcbiAgICAgICAgRWRnZUxpc3QuaW5zZXJ0KGxibmQsIGJpc2VjdG9yKTtcbiAgICAgICAgcCA9IEdlb20uaW50ZXJzZWN0KGxibmQsIGJpc2VjdG9yKTtcbiAgICAgICAgaWYgKHApIHtcbiAgICAgICAgICBFdmVudFF1ZXVlLmRlbChsYm5kKTtcbiAgICAgICAgICBFdmVudFF1ZXVlLmluc2VydChsYm5kLCBwLCBHZW9tLmRpc3RhbmNlKHAsIG5ld1NpdGUpKTtcbiAgICAgICAgfVxuICAgICAgICBsYm5kID0gYmlzZWN0b3I7XG4gICAgICAgIGJpc2VjdG9yID0gRWRnZUxpc3QuY3JlYXRlSGFsZkVkZ2UoZSwgXCJyXCIpO1xuICAgICAgICBFZGdlTGlzdC5pbnNlcnQobGJuZCwgYmlzZWN0b3IpO1xuICAgICAgICBwID0gR2VvbS5pbnRlcnNlY3QoYmlzZWN0b3IsIHJibmQpO1xuICAgICAgICBpZiAocCkge1xuICAgICAgICAgIEV2ZW50UXVldWUuaW5zZXJ0KGJpc2VjdG9yLCBwLCBHZW9tLmRpc3RhbmNlKHAsIG5ld1NpdGUpKTtcbiAgICAgICAgfVxuICAgICAgICBuZXdTaXRlID0gU2l0ZXMubGlzdC5zaGlmdCgpO1xuICAgICAgfSBlbHNlIGlmICghRXZlbnRRdWV1ZS5lbXB0eSgpKSB7XG4gICAgICAgIGxibmQgPSBFdmVudFF1ZXVlLmV4dHJhY3RNaW4oKTtcbiAgICAgICAgbGxibmQgPSBFZGdlTGlzdC5sZWZ0KGxibmQpO1xuICAgICAgICByYm5kID0gRWRnZUxpc3QucmlnaHQobGJuZCk7XG4gICAgICAgIHJyYm5kID0gRWRnZUxpc3QucmlnaHQocmJuZCk7XG4gICAgICAgIGJvdCA9IEVkZ2VMaXN0LmxlZnRSZWdpb24obGJuZCk7XG4gICAgICAgIHRvcCA9IEVkZ2VMaXN0LnJpZ2h0UmVnaW9uKHJibmQpO1xuICAgICAgICB2ID0gbGJuZC52ZXJ0ZXg7XG4gICAgICAgIEdlb20uZW5kUG9pbnQobGJuZC5lZGdlLCBsYm5kLnNpZGUsIHYpO1xuICAgICAgICBHZW9tLmVuZFBvaW50KHJibmQuZWRnZSwgcmJuZC5zaWRlLCB2KTtcbiAgICAgICAgRWRnZUxpc3QuZGVsKGxibmQpO1xuICAgICAgICBFdmVudFF1ZXVlLmRlbChyYm5kKTtcbiAgICAgICAgRWRnZUxpc3QuZGVsKHJibmQpO1xuICAgICAgICBwbSA9IFwibFwiO1xuICAgICAgICBpZiAoYm90LnkgPiB0b3AueSkge1xuICAgICAgICAgIHRlbXAgPSBib3Q7XG4gICAgICAgICAgYm90ID0gdG9wO1xuICAgICAgICAgIHRvcCA9IHRlbXA7XG4gICAgICAgICAgcG0gPSBcInJcIjtcbiAgICAgICAgfVxuICAgICAgICBlID0gR2VvbS5iaXNlY3QoYm90LCB0b3ApO1xuICAgICAgICBiaXNlY3RvciA9IEVkZ2VMaXN0LmNyZWF0ZUhhbGZFZGdlKGUsIHBtKTtcbiAgICAgICAgRWRnZUxpc3QuaW5zZXJ0KGxsYm5kLCBiaXNlY3Rvcik7XG4gICAgICAgIEdlb20uZW5kUG9pbnQoZSwgZDNfZ2VvbV92b3Jvbm9pT3Bwb3NpdGVbcG1dLCB2KTtcbiAgICAgICAgcCA9IEdlb20uaW50ZXJzZWN0KGxsYm5kLCBiaXNlY3Rvcik7XG4gICAgICAgIGlmIChwKSB7XG4gICAgICAgICAgRXZlbnRRdWV1ZS5kZWwobGxibmQpO1xuICAgICAgICAgIEV2ZW50UXVldWUuaW5zZXJ0KGxsYm5kLCBwLCBHZW9tLmRpc3RhbmNlKHAsIGJvdCkpO1xuICAgICAgICB9XG4gICAgICAgIHAgPSBHZW9tLmludGVyc2VjdChiaXNlY3RvciwgcnJibmQpO1xuICAgICAgICBpZiAocCkge1xuICAgICAgICAgIEV2ZW50UXVldWUuaW5zZXJ0KGJpc2VjdG9yLCBwLCBHZW9tLmRpc3RhbmNlKHAsIGJvdCkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsYm5kID0gRWRnZUxpc3QucmlnaHQoRWRnZUxpc3QubGVmdEVuZCk7IGxibmQgIT0gRWRnZUxpc3QucmlnaHRFbmQ7IGxibmQgPSBFZGdlTGlzdC5yaWdodChsYm5kKSkge1xuICAgICAgY2FsbGJhY2sobGJuZC5lZGdlKTtcbiAgICB9XG4gIH1cbiAgZDMuZ2VvbS5xdWFkdHJlZSA9IGZ1bmN0aW9uKHBvaW50cywgeDEsIHkxLCB4MiwgeTIpIHtcbiAgICB2YXIgeCA9IGQzX3N2Z19saW5lWCwgeSA9IGQzX3N2Z19saW5lWSwgY29tcGF0O1xuICAgIGlmIChjb21wYXQgPSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICB4ID0gZDNfZ2VvbV9xdWFkdHJlZUNvbXBhdFg7XG4gICAgICB5ID0gZDNfZ2VvbV9xdWFkdHJlZUNvbXBhdFk7XG4gICAgICBpZiAoY29tcGF0ID09PSAzKSB7XG4gICAgICAgIHkyID0geTE7XG4gICAgICAgIHgyID0geDE7XG4gICAgICAgIHkxID0geDEgPSAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHF1YWR0cmVlKHBvaW50cyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHF1YWR0cmVlKGRhdGEpIHtcbiAgICAgIHZhciBkLCBmeCA9IGQzX2Z1bmN0b3IoeCksIGZ5ID0gZDNfZnVuY3Rvcih5KSwgeHMsIHlzLCBpLCBuLCB4MV8sIHkxXywgeDJfLCB5Ml87XG4gICAgICBpZiAoeDEgIT0gbnVsbCkge1xuICAgICAgICB4MV8gPSB4MSwgeTFfID0geTEsIHgyXyA9IHgyLCB5Ml8gPSB5MjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHgyXyA9IHkyXyA9IC0oeDFfID0geTFfID0gSW5maW5pdHkpO1xuICAgICAgICB4cyA9IFtdLCB5cyA9IFtdO1xuICAgICAgICBuID0gZGF0YS5sZW5ndGg7XG4gICAgICAgIGlmIChjb21wYXQpIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgICBkID0gZGF0YVtpXTtcbiAgICAgICAgICBpZiAoZC54IDwgeDFfKSB4MV8gPSBkLng7XG4gICAgICAgICAgaWYgKGQueSA8IHkxXykgeTFfID0gZC55O1xuICAgICAgICAgIGlmIChkLnggPiB4Ml8pIHgyXyA9IGQueDtcbiAgICAgICAgICBpZiAoZC55ID4geTJfKSB5Ml8gPSBkLnk7XG4gICAgICAgICAgeHMucHVzaChkLngpO1xuICAgICAgICAgIHlzLnB1c2goZC55KTtcbiAgICAgICAgfSBlbHNlIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgICB2YXIgeF8gPSArZngoZCA9IGRhdGFbaV0sIGkpLCB5XyA9ICtmeShkLCBpKTtcbiAgICAgICAgICBpZiAoeF8gPCB4MV8pIHgxXyA9IHhfO1xuICAgICAgICAgIGlmICh5XyA8IHkxXykgeTFfID0geV87XG4gICAgICAgICAgaWYgKHhfID4geDJfKSB4Ml8gPSB4XztcbiAgICAgICAgICBpZiAoeV8gPiB5Ml8pIHkyXyA9IHlfO1xuICAgICAgICAgIHhzLnB1c2goeF8pO1xuICAgICAgICAgIHlzLnB1c2goeV8pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgZHggPSB4Ml8gLSB4MV8sIGR5ID0geTJfIC0geTFfO1xuICAgICAgaWYgKGR4ID4gZHkpIHkyXyA9IHkxXyArIGR4OyBlbHNlIHgyXyA9IHgxXyArIGR5O1xuICAgICAgZnVuY3Rpb24gaW5zZXJ0KG4sIGQsIHgsIHksIHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgICAgIGlmIChpc05hTih4KSB8fCBpc05hTih5KSkgcmV0dXJuO1xuICAgICAgICBpZiAobi5sZWFmKSB7XG4gICAgICAgICAgdmFyIG54ID0gbi54LCBueSA9IG4ueTtcbiAgICAgICAgICBpZiAobnggIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKG54IC0geCkgKyBNYXRoLmFicyhueSAtIHkpIDwgLjAxKSB7XG4gICAgICAgICAgICAgIGluc2VydENoaWxkKG4sIGQsIHgsIHksIHgxLCB5MSwgeDIsIHkyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciBuUG9pbnQgPSBuLnBvaW50O1xuICAgICAgICAgICAgICBuLnggPSBuLnkgPSBuLnBvaW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgaW5zZXJ0Q2hpbGQobiwgblBvaW50LCBueCwgbnksIHgxLCB5MSwgeDIsIHkyKTtcbiAgICAgICAgICAgICAgaW5zZXJ0Q2hpbGQobiwgZCwgeCwgeSwgeDEsIHkxLCB4MiwgeTIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuLnggPSB4LCBuLnkgPSB5LCBuLnBvaW50ID0gZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5zZXJ0Q2hpbGQobiwgZCwgeCwgeSwgeDEsIHkxLCB4MiwgeTIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBpbnNlcnRDaGlsZChuLCBkLCB4LCB5LCB4MSwgeTEsIHgyLCB5Mikge1xuICAgICAgICB2YXIgc3ggPSAoeDEgKyB4MikgKiAuNSwgc3kgPSAoeTEgKyB5MikgKiAuNSwgcmlnaHQgPSB4ID49IHN4LCBib3R0b20gPSB5ID49IHN5LCBpID0gKGJvdHRvbSA8PCAxKSArIHJpZ2h0O1xuICAgICAgICBuLmxlYWYgPSBmYWxzZTtcbiAgICAgICAgbiA9IG4ubm9kZXNbaV0gfHwgKG4ubm9kZXNbaV0gPSBkM19nZW9tX3F1YWR0cmVlTm9kZSgpKTtcbiAgICAgICAgaWYgKHJpZ2h0KSB4MSA9IHN4OyBlbHNlIHgyID0gc3g7XG4gICAgICAgIGlmIChib3R0b20pIHkxID0gc3k7IGVsc2UgeTIgPSBzeTtcbiAgICAgICAgaW5zZXJ0KG4sIGQsIHgsIHksIHgxLCB5MSwgeDIsIHkyKTtcbiAgICAgIH1cbiAgICAgIHZhciByb290ID0gZDNfZ2VvbV9xdWFkdHJlZU5vZGUoKTtcbiAgICAgIHJvb3QuYWRkID0gZnVuY3Rpb24oZCkge1xuICAgICAgICBpbnNlcnQocm9vdCwgZCwgK2Z4KGQsICsraSksICtmeShkLCBpKSwgeDFfLCB5MV8sIHgyXywgeTJfKTtcbiAgICAgIH07XG4gICAgICByb290LnZpc2l0ID0gZnVuY3Rpb24oZikge1xuICAgICAgICBkM19nZW9tX3F1YWR0cmVlVmlzaXQoZiwgcm9vdCwgeDFfLCB5MV8sIHgyXywgeTJfKTtcbiAgICAgIH07XG4gICAgICBpID0gLTE7XG4gICAgICBpZiAoeDEgPT0gbnVsbCkge1xuICAgICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICAgIGluc2VydChyb290LCBkYXRhW2ldLCB4c1tpXSwgeXNbaV0sIHgxXywgeTFfLCB4Ml8sIHkyXyk7XG4gICAgICAgIH1cbiAgICAgICAgLS1pO1xuICAgICAgfSBlbHNlIGRhdGEuZm9yRWFjaChyb290LmFkZCk7XG4gICAgICB4cyA9IHlzID0gZGF0YSA9IGQgPSBudWxsO1xuICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfVxuICAgIHF1YWR0cmVlLnggPSBmdW5jdGlvbihfKSB7XG4gICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh4ID0gXywgcXVhZHRyZWUpIDogeDtcbiAgICB9O1xuICAgIHF1YWR0cmVlLnkgPSBmdW5jdGlvbihfKSB7XG4gICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh5ID0gXywgcXVhZHRyZWUpIDogeTtcbiAgICB9O1xuICAgIHF1YWR0cmVlLmV4dGVudCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHgxID09IG51bGwgPyBudWxsIDogWyBbIHgxLCB5MSBdLCBbIHgyLCB5MiBdIF07XG4gICAgICBpZiAoXyA9PSBudWxsKSB4MSA9IHkxID0geDIgPSB5MiA9IG51bGw7IGVsc2UgeDEgPSArX1swXVswXSwgeTEgPSArX1swXVsxXSwgeDIgPSArX1sxXVswXSwgXG4gICAgICB5MiA9ICtfWzFdWzFdO1xuICAgICAgcmV0dXJuIHF1YWR0cmVlO1xuICAgIH07XG4gICAgcXVhZHRyZWUuc2l6ZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHgxID09IG51bGwgPyBudWxsIDogWyB4MiAtIHgxLCB5MiAtIHkxIF07XG4gICAgICBpZiAoXyA9PSBudWxsKSB4MSA9IHkxID0geDIgPSB5MiA9IG51bGw7IGVsc2UgeDEgPSB5MSA9IDAsIHgyID0gK19bMF0sIHkyID0gK19bMV07XG4gICAgICByZXR1cm4gcXVhZHRyZWU7XG4gICAgfTtcbiAgICByZXR1cm4gcXVhZHRyZWU7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2dlb21fcXVhZHRyZWVDb21wYXRYKGQpIHtcbiAgICByZXR1cm4gZC54O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb21fcXVhZHRyZWVDb21wYXRZKGQpIHtcbiAgICByZXR1cm4gZC55O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb21fcXVhZHRyZWVOb2RlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsZWFmOiB0cnVlLFxuICAgICAgbm9kZXM6IFtdLFxuICAgICAgcG9pbnQ6IG51bGwsXG4gICAgICB4OiBudWxsLFxuICAgICAgeTogbnVsbFxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gZDNfZ2VvbV9xdWFkdHJlZVZpc2l0KGYsIG5vZGUsIHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgaWYgKCFmKG5vZGUsIHgxLCB5MSwgeDIsIHkyKSkge1xuICAgICAgdmFyIHN4ID0gKHgxICsgeDIpICogLjUsIHN5ID0gKHkxICsgeTIpICogLjUsIGNoaWxkcmVuID0gbm9kZS5ub2RlcztcbiAgICAgIGlmIChjaGlsZHJlblswXSkgZDNfZ2VvbV9xdWFkdHJlZVZpc2l0KGYsIGNoaWxkcmVuWzBdLCB4MSwgeTEsIHN4LCBzeSk7XG4gICAgICBpZiAoY2hpbGRyZW5bMV0pIGQzX2dlb21fcXVhZHRyZWVWaXNpdChmLCBjaGlsZHJlblsxXSwgc3gsIHkxLCB4Miwgc3kpO1xuICAgICAgaWYgKGNoaWxkcmVuWzJdKSBkM19nZW9tX3F1YWR0cmVlVmlzaXQoZiwgY2hpbGRyZW5bMl0sIHgxLCBzeSwgc3gsIHkyKTtcbiAgICAgIGlmIChjaGlsZHJlblszXSkgZDNfZ2VvbV9xdWFkdHJlZVZpc2l0KGYsIGNoaWxkcmVuWzNdLCBzeCwgc3ksIHgyLCB5Mik7XG4gICAgfVxuICB9XG4gIGQzLmludGVycG9sYXRlUmdiID0gZDNfaW50ZXJwb2xhdGVSZ2I7XG4gIGZ1bmN0aW9uIGQzX2ludGVycG9sYXRlUmdiKGEsIGIpIHtcbiAgICBhID0gZDMucmdiKGEpO1xuICAgIGIgPSBkMy5yZ2IoYik7XG4gICAgdmFyIGFyID0gYS5yLCBhZyA9IGEuZywgYWIgPSBhLmIsIGJyID0gYi5yIC0gYXIsIGJnID0gYi5nIC0gYWcsIGJiID0gYi5iIC0gYWI7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiBcIiNcIiArIGQzX3JnYl9oZXgoTWF0aC5yb3VuZChhciArIGJyICogdCkpICsgZDNfcmdiX2hleChNYXRoLnJvdW5kKGFnICsgYmcgKiB0KSkgKyBkM19yZ2JfaGV4KE1hdGgucm91bmQoYWIgKyBiYiAqIHQpKTtcbiAgICB9O1xuICB9XG4gIGQzLmludGVycG9sYXRlT2JqZWN0ID0gZDNfaW50ZXJwb2xhdGVPYmplY3Q7XG4gIGZ1bmN0aW9uIGQzX2ludGVycG9sYXRlT2JqZWN0KGEsIGIpIHtcbiAgICB2YXIgaSA9IHt9LCBjID0ge30sIGs7XG4gICAgZm9yIChrIGluIGEpIHtcbiAgICAgIGlmIChrIGluIGIpIHtcbiAgICAgICAgaVtrXSA9IGQzX2ludGVycG9sYXRlKGFba10sIGJba10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY1trXSA9IGFba107XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoayBpbiBiKSB7XG4gICAgICBpZiAoIShrIGluIGEpKSB7XG4gICAgICAgIGNba10gPSBiW2tdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgZm9yIChrIGluIGkpIGNba10gPSBpW2tdKHQpO1xuICAgICAgcmV0dXJuIGM7XG4gICAgfTtcbiAgfVxuICBkMy5pbnRlcnBvbGF0ZU51bWJlciA9IGQzX2ludGVycG9sYXRlTnVtYmVyO1xuICBmdW5jdGlvbiBkM19pbnRlcnBvbGF0ZU51bWJlcihhLCBiKSB7XG4gICAgYiAtPSBhID0gK2E7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiBhICsgYiAqIHQ7XG4gICAgfTtcbiAgfVxuICBkMy5pbnRlcnBvbGF0ZVN0cmluZyA9IGQzX2ludGVycG9sYXRlU3RyaW5nO1xuICBmdW5jdGlvbiBkM19pbnRlcnBvbGF0ZVN0cmluZyhhLCBiKSB7XG4gICAgdmFyIG0sIGksIGosIHMwID0gMCwgczEgPSAwLCBzID0gW10sIHEgPSBbXSwgbiwgbztcbiAgICBhID0gYSArIFwiXCIsIGIgPSBiICsgXCJcIjtcbiAgICBkM19pbnRlcnBvbGF0ZV9udW1iZXIubGFzdEluZGV4ID0gMDtcbiAgICBmb3IgKGkgPSAwOyBtID0gZDNfaW50ZXJwb2xhdGVfbnVtYmVyLmV4ZWMoYik7ICsraSkge1xuICAgICAgaWYgKG0uaW5kZXgpIHMucHVzaChiLnN1YnN0cmluZyhzMCwgczEgPSBtLmluZGV4KSk7XG4gICAgICBxLnB1c2goe1xuICAgICAgICBpOiBzLmxlbmd0aCxcbiAgICAgICAgeDogbVswXVxuICAgICAgfSk7XG4gICAgICBzLnB1c2gobnVsbCk7XG4gICAgICBzMCA9IGQzX2ludGVycG9sYXRlX251bWJlci5sYXN0SW5kZXg7XG4gICAgfVxuICAgIGlmIChzMCA8IGIubGVuZ3RoKSBzLnB1c2goYi5zdWJzdHJpbmcoczApKTtcbiAgICBmb3IgKGkgPSAwLCBuID0gcS5sZW5ndGg7IChtID0gZDNfaW50ZXJwb2xhdGVfbnVtYmVyLmV4ZWMoYSkpICYmIGkgPCBuOyArK2kpIHtcbiAgICAgIG8gPSBxW2ldO1xuICAgICAgaWYgKG8ueCA9PSBtWzBdKSB7XG4gICAgICAgIGlmIChvLmkpIHtcbiAgICAgICAgICBpZiAoc1tvLmkgKyAxXSA9PSBudWxsKSB7XG4gICAgICAgICAgICBzW28uaSAtIDFdICs9IG8ueDtcbiAgICAgICAgICAgIHMuc3BsaWNlKG8uaSwgMSk7XG4gICAgICAgICAgICBmb3IgKGogPSBpICsgMTsgaiA8IG47ICsraikgcVtqXS5pLS07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNbby5pIC0gMV0gKz0gby54ICsgc1tvLmkgKyAxXTtcbiAgICAgICAgICAgIHMuc3BsaWNlKG8uaSwgMik7XG4gICAgICAgICAgICBmb3IgKGogPSBpICsgMTsgaiA8IG47ICsraikgcVtqXS5pIC09IDI7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzW28uaSArIDFdID09IG51bGwpIHtcbiAgICAgICAgICAgIHNbby5pXSA9IG8ueDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc1tvLmldID0gby54ICsgc1tvLmkgKyAxXTtcbiAgICAgICAgICAgIHMuc3BsaWNlKG8uaSArIDEsIDEpO1xuICAgICAgICAgICAgZm9yIChqID0gaSArIDE7IGogPCBuOyArK2opIHFbal0uaS0tO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxLnNwbGljZShpLCAxKTtcbiAgICAgICAgbi0tO1xuICAgICAgICBpLS07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvLnggPSBkM19pbnRlcnBvbGF0ZU51bWJlcihwYXJzZUZsb2F0KG1bMF0pLCBwYXJzZUZsb2F0KG8ueCkpO1xuICAgICAgfVxuICAgIH1cbiAgICB3aGlsZSAoaSA8IG4pIHtcbiAgICAgIG8gPSBxLnBvcCgpO1xuICAgICAgaWYgKHNbby5pICsgMV0gPT0gbnVsbCkge1xuICAgICAgICBzW28uaV0gPSBvLng7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzW28uaV0gPSBvLnggKyBzW28uaSArIDFdO1xuICAgICAgICBzLnNwbGljZShvLmkgKyAxLCAxKTtcbiAgICAgIH1cbiAgICAgIG4tLTtcbiAgICB9XG4gICAgaWYgKHMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gc1swXSA9PSBudWxsID8gKG8gPSBxWzBdLngsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIG8odCkgKyBcIlwiO1xuICAgICAgfSkgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGI7XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgZm9yIChpID0gMDsgaSA8IG47ICsraSkgc1sobyA9IHFbaV0pLmldID0gby54KHQpO1xuICAgICAgcmV0dXJuIHMuam9pbihcIlwiKTtcbiAgICB9O1xuICB9XG4gIHZhciBkM19pbnRlcnBvbGF0ZV9udW1iZXIgPSAvWy0rXT8oPzpcXGQrXFwuP1xcZCp8XFwuP1xcZCspKD86W2VFXVstK10/XFxkKyk/L2c7XG4gIGQzLmludGVycG9sYXRlID0gZDNfaW50ZXJwb2xhdGU7XG4gIGZ1bmN0aW9uIGQzX2ludGVycG9sYXRlKGEsIGIpIHtcbiAgICB2YXIgaSA9IGQzLmludGVycG9sYXRvcnMubGVuZ3RoLCBmO1xuICAgIHdoaWxlICgtLWkgPj0gMCAmJiAhKGYgPSBkMy5pbnRlcnBvbGF0b3JzW2ldKGEsIGIpKSkgO1xuICAgIHJldHVybiBmO1xuICB9XG4gIGQzLmludGVycG9sYXRvcnMgPSBbIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICB2YXIgdCA9IHR5cGVvZiBiO1xuICAgIHJldHVybiAodCA9PT0gXCJzdHJpbmdcIiA/IGQzX3JnYl9uYW1lcy5oYXMoYikgfHwgL14oI3xyZ2JcXCh8aHNsXFwoKS8udGVzdChiKSA/IGQzX2ludGVycG9sYXRlUmdiIDogZDNfaW50ZXJwb2xhdGVTdHJpbmcgOiBiIGluc3RhbmNlb2YgZDNfQ29sb3IgPyBkM19pbnRlcnBvbGF0ZVJnYiA6IHQgPT09IFwib2JqZWN0XCIgPyBBcnJheS5pc0FycmF5KGIpID8gZDNfaW50ZXJwb2xhdGVBcnJheSA6IGQzX2ludGVycG9sYXRlT2JqZWN0IDogZDNfaW50ZXJwb2xhdGVOdW1iZXIpKGEsIGIpO1xuICB9IF07XG4gIGQzLmludGVycG9sYXRlQXJyYXkgPSBkM19pbnRlcnBvbGF0ZUFycmF5O1xuICBmdW5jdGlvbiBkM19pbnRlcnBvbGF0ZUFycmF5KGEsIGIpIHtcbiAgICB2YXIgeCA9IFtdLCBjID0gW10sIG5hID0gYS5sZW5ndGgsIG5iID0gYi5sZW5ndGgsIG4wID0gTWF0aC5taW4oYS5sZW5ndGgsIGIubGVuZ3RoKSwgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbjA7ICsraSkgeC5wdXNoKGQzX2ludGVycG9sYXRlKGFbaV0sIGJbaV0pKTtcbiAgICBmb3IgKDtpIDwgbmE7ICsraSkgY1tpXSA9IGFbaV07XG4gICAgZm9yICg7aSA8IG5iOyArK2kpIGNbaV0gPSBiW2ldO1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbjA7ICsraSkgY1tpXSA9IHhbaV0odCk7XG4gICAgICByZXR1cm4gYztcbiAgICB9O1xuICB9XG4gIHZhciBkM19lYXNlX2RlZmF1bHQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfaWRlbnRpdHk7XG4gIH07XG4gIHZhciBkM19lYXNlID0gZDMubWFwKHtcbiAgICBsaW5lYXI6IGQzX2Vhc2VfZGVmYXVsdCxcbiAgICBwb2x5OiBkM19lYXNlX3BvbHksXG4gICAgcXVhZDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZDNfZWFzZV9xdWFkO1xuICAgIH0sXG4gICAgY3ViaWM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGQzX2Vhc2VfY3ViaWM7XG4gICAgfSxcbiAgICBzaW46IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGQzX2Vhc2Vfc2luO1xuICAgIH0sXG4gICAgZXhwOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkM19lYXNlX2V4cDtcbiAgICB9LFxuICAgIGNpcmNsZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZDNfZWFzZV9jaXJjbGU7XG4gICAgfSxcbiAgICBlbGFzdGljOiBkM19lYXNlX2VsYXN0aWMsXG4gICAgYmFjazogZDNfZWFzZV9iYWNrLFxuICAgIGJvdW5jZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZDNfZWFzZV9ib3VuY2U7XG4gICAgfVxuICB9KTtcbiAgdmFyIGQzX2Vhc2VfbW9kZSA9IGQzLm1hcCh7XG4gICAgXCJpblwiOiBkM19pZGVudGl0eSxcbiAgICBvdXQ6IGQzX2Vhc2VfcmV2ZXJzZSxcbiAgICBcImluLW91dFwiOiBkM19lYXNlX3JlZmxlY3QsXG4gICAgXCJvdXQtaW5cIjogZnVuY3Rpb24oZikge1xuICAgICAgcmV0dXJuIGQzX2Vhc2VfcmVmbGVjdChkM19lYXNlX3JldmVyc2UoZikpO1xuICAgIH1cbiAgfSk7XG4gIGQzLmVhc2UgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGkgPSBuYW1lLmluZGV4T2YoXCItXCIpLCB0ID0gaSA+PSAwID8gbmFtZS5zdWJzdHJpbmcoMCwgaSkgOiBuYW1lLCBtID0gaSA+PSAwID8gbmFtZS5zdWJzdHJpbmcoaSArIDEpIDogXCJpblwiO1xuICAgIHQgPSBkM19lYXNlLmdldCh0KSB8fCBkM19lYXNlX2RlZmF1bHQ7XG4gICAgbSA9IGQzX2Vhc2VfbW9kZS5nZXQobSkgfHwgZDNfaWRlbnRpdHk7XG4gICAgcmV0dXJuIGQzX2Vhc2VfY2xhbXAobSh0LmFwcGx5KG51bGwsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpKSk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2Vhc2VfY2xhbXAoZikge1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gdCA8PSAwID8gMCA6IHQgPj0gMSA/IDEgOiBmKHQpO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gZDNfZWFzZV9yZXZlcnNlKGYpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgcmV0dXJuIDEgLSBmKDEgLSB0KTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2Vhc2VfcmVmbGVjdChmKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiAuNSAqICh0IDwgLjUgPyBmKDIgKiB0KSA6IDIgLSBmKDIgLSAyICogdCkpO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gZDNfZWFzZV9xdWFkKHQpIHtcbiAgICByZXR1cm4gdCAqIHQ7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZWFzZV9jdWJpYyh0KSB7XG4gICAgcmV0dXJuIHQgKiB0ICogdDtcbiAgfVxuICBmdW5jdGlvbiBkM19lYXNlX2N1YmljSW5PdXQodCkge1xuICAgIGlmICh0IDw9IDApIHJldHVybiAwO1xuICAgIGlmICh0ID49IDEpIHJldHVybiAxO1xuICAgIHZhciB0MiA9IHQgKiB0LCB0MyA9IHQyICogdDtcbiAgICByZXR1cm4gNCAqICh0IDwgLjUgPyB0MyA6IDMgKiAodCAtIHQyKSArIHQzIC0gLjc1KTtcbiAgfVxuICBmdW5jdGlvbiBkM19lYXNlX3BvbHkoZSkge1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gTWF0aC5wb3codCwgZSk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkM19lYXNlX3Npbih0KSB7XG4gICAgcmV0dXJuIDEgLSBNYXRoLmNvcyh0ICogz4AgLyAyKTtcbiAgfVxuICBmdW5jdGlvbiBkM19lYXNlX2V4cCh0KSB7XG4gICAgcmV0dXJuIE1hdGgucG93KDIsIDEwICogKHQgLSAxKSk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZWFzZV9jaXJjbGUodCkge1xuICAgIHJldHVybiAxIC0gTWF0aC5zcXJ0KDEgLSB0ICogdCk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfZWFzZV9lbGFzdGljKGEsIHApIHtcbiAgICB2YXIgcztcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHAgPSAuNDU7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHMgPSBwIC8gKDIgKiDPgCkgKiBNYXRoLmFzaW4oMSAvIGEpOyBlbHNlIGEgPSAxLCBzID0gcCAvIDQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiAxICsgYSAqIE1hdGgucG93KDIsIDEwICogLXQpICogTWF0aC5zaW4oKHQgLSBzKSAqIDIgKiDPgCAvIHApO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gZDNfZWFzZV9iYWNrKHMpIHtcbiAgICBpZiAoIXMpIHMgPSAxLjcwMTU4O1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gdCAqIHQgKiAoKHMgKyAxKSAqIHQgLSBzKTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2Vhc2VfYm91bmNlKHQpIHtcbiAgICByZXR1cm4gdCA8IDEgLyAyLjc1ID8gNy41NjI1ICogdCAqIHQgOiB0IDwgMiAvIDIuNzUgPyA3LjU2MjUgKiAodCAtPSAxLjUgLyAyLjc1KSAqIHQgKyAuNzUgOiB0IDwgMi41IC8gMi43NSA/IDcuNTYyNSAqICh0IC09IDIuMjUgLyAyLjc1KSAqIHQgKyAuOTM3NSA6IDcuNTYyNSAqICh0IC09IDIuNjI1IC8gMi43NSkgKiB0ICsgLjk4NDM3NTtcbiAgfVxuICBkMy5pbnRlcnBvbGF0ZUhjbCA9IGQzX2ludGVycG9sYXRlSGNsO1xuICBmdW5jdGlvbiBkM19pbnRlcnBvbGF0ZUhjbChhLCBiKSB7XG4gICAgYSA9IGQzLmhjbChhKTtcbiAgICBiID0gZDMuaGNsKGIpO1xuICAgIHZhciBhaCA9IGEuaCwgYWMgPSBhLmMsIGFsID0gYS5sLCBiaCA9IGIuaCAtIGFoLCBiYyA9IGIuYyAtIGFjLCBibCA9IGIubCAtIGFsO1xuICAgIGlmIChpc05hTihiYykpIGJjID0gMCwgYWMgPSBpc05hTihhYykgPyBiLmMgOiBhYztcbiAgICBpZiAoaXNOYU4oYmgpKSBiaCA9IDAsIGFoID0gaXNOYU4oYWgpID8gYi5oIDogYWg7IGVsc2UgaWYgKGJoID4gMTgwKSBiaCAtPSAzNjA7IGVsc2UgaWYgKGJoIDwgLTE4MCkgYmggKz0gMzYwO1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gZDNfaGNsX2xhYihhaCArIGJoICogdCwgYWMgKyBiYyAqIHQsIGFsICsgYmwgKiB0KSArIFwiXCI7XG4gICAgfTtcbiAgfVxuICBkMy5pbnRlcnBvbGF0ZUhzbCA9IGQzX2ludGVycG9sYXRlSHNsO1xuICBmdW5jdGlvbiBkM19pbnRlcnBvbGF0ZUhzbChhLCBiKSB7XG4gICAgYSA9IGQzLmhzbChhKTtcbiAgICBiID0gZDMuaHNsKGIpO1xuICAgIHZhciBhaCA9IGEuaCwgYXMgPSBhLnMsIGFsID0gYS5sLCBiaCA9IGIuaCAtIGFoLCBicyA9IGIucyAtIGFzLCBibCA9IGIubCAtIGFsO1xuICAgIGlmIChpc05hTihicykpIGJzID0gMCwgYXMgPSBpc05hTihhcykgPyBiLnMgOiBhcztcbiAgICBpZiAoaXNOYU4oYmgpKSBiaCA9IDAsIGFoID0gaXNOYU4oYWgpID8gYi5oIDogYWg7IGVsc2UgaWYgKGJoID4gMTgwKSBiaCAtPSAzNjA7IGVsc2UgaWYgKGJoIDwgLTE4MCkgYmggKz0gMzYwO1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gZDNfaHNsX3JnYihhaCArIGJoICogdCwgYXMgKyBicyAqIHQsIGFsICsgYmwgKiB0KSArIFwiXCI7XG4gICAgfTtcbiAgfVxuICBkMy5pbnRlcnBvbGF0ZUxhYiA9IGQzX2ludGVycG9sYXRlTGFiO1xuICBmdW5jdGlvbiBkM19pbnRlcnBvbGF0ZUxhYihhLCBiKSB7XG4gICAgYSA9IGQzLmxhYihhKTtcbiAgICBiID0gZDMubGFiKGIpO1xuICAgIHZhciBhbCA9IGEubCwgYWEgPSBhLmEsIGFiID0gYS5iLCBibCA9IGIubCAtIGFsLCBiYSA9IGIuYSAtIGFhLCBiYiA9IGIuYiAtIGFiO1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gZDNfbGFiX3JnYihhbCArIGJsICogdCwgYWEgKyBiYSAqIHQsIGFiICsgYmIgKiB0KSArIFwiXCI7XG4gICAgfTtcbiAgfVxuICBkMy5pbnRlcnBvbGF0ZVJvdW5kID0gZDNfaW50ZXJwb2xhdGVSb3VuZDtcbiAgZnVuY3Rpb24gZDNfaW50ZXJwb2xhdGVSb3VuZChhLCBiKSB7XG4gICAgYiAtPSBhO1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gTWF0aC5yb3VuZChhICsgYiAqIHQpO1xuICAgIH07XG4gIH1cbiAgZDMudHJhbnNmb3JtID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgdmFyIGcgPSBkM19kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoZDMubnMucHJlZml4LnN2ZywgXCJnXCIpO1xuICAgIHJldHVybiAoZDMudHJhbnNmb3JtID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICBpZiAoc3RyaW5nICE9IG51bGwpIHtcbiAgICAgICAgZy5zZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIiwgc3RyaW5nKTtcbiAgICAgICAgdmFyIHQgPSBnLnRyYW5zZm9ybS5iYXNlVmFsLmNvbnNvbGlkYXRlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IGQzX3RyYW5zZm9ybSh0ID8gdC5tYXRyaXggOiBkM190cmFuc2Zvcm1JZGVudGl0eSk7XG4gICAgfSkoc3RyaW5nKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfdHJhbnNmb3JtKG0pIHtcbiAgICB2YXIgcjAgPSBbIG0uYSwgbS5iIF0sIHIxID0gWyBtLmMsIG0uZCBdLCBreCA9IGQzX3RyYW5zZm9ybU5vcm1hbGl6ZShyMCksIGt6ID0gZDNfdHJhbnNmb3JtRG90KHIwLCByMSksIGt5ID0gZDNfdHJhbnNmb3JtTm9ybWFsaXplKGQzX3RyYW5zZm9ybUNvbWJpbmUocjEsIHIwLCAta3opKSB8fCAwO1xuICAgIGlmIChyMFswXSAqIHIxWzFdIDwgcjFbMF0gKiByMFsxXSkge1xuICAgICAgcjBbMF0gKj0gLTE7XG4gICAgICByMFsxXSAqPSAtMTtcbiAgICAgIGt4ICo9IC0xO1xuICAgICAga3ogKj0gLTE7XG4gICAgfVxuICAgIHRoaXMucm90YXRlID0gKGt4ID8gTWF0aC5hdGFuMihyMFsxXSwgcjBbMF0pIDogTWF0aC5hdGFuMigtcjFbMF0sIHIxWzFdKSkgKiBkM19kZWdyZWVzO1xuICAgIHRoaXMudHJhbnNsYXRlID0gWyBtLmUsIG0uZiBdO1xuICAgIHRoaXMuc2NhbGUgPSBbIGt4LCBreSBdO1xuICAgIHRoaXMuc2tldyA9IGt5ID8gTWF0aC5hdGFuMihreiwga3kpICogZDNfZGVncmVlcyA6IDA7XG4gIH1cbiAgZDNfdHJhbnNmb3JtLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcInRyYW5zbGF0ZShcIiArIHRoaXMudHJhbnNsYXRlICsgXCIpcm90YXRlKFwiICsgdGhpcy5yb3RhdGUgKyBcIilza2V3WChcIiArIHRoaXMuc2tldyArIFwiKXNjYWxlKFwiICsgdGhpcy5zY2FsZSArIFwiKVwiO1xuICB9O1xuICBmdW5jdGlvbiBkM190cmFuc2Zvcm1Eb3QoYSwgYikge1xuICAgIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3RyYW5zZm9ybU5vcm1hbGl6ZShhKSB7XG4gICAgdmFyIGsgPSBNYXRoLnNxcnQoZDNfdHJhbnNmb3JtRG90KGEsIGEpKTtcbiAgICBpZiAoaykge1xuICAgICAgYVswXSAvPSBrO1xuICAgICAgYVsxXSAvPSBrO1xuICAgIH1cbiAgICByZXR1cm4gaztcbiAgfVxuICBmdW5jdGlvbiBkM190cmFuc2Zvcm1Db21iaW5lKGEsIGIsIGspIHtcbiAgICBhWzBdICs9IGsgKiBiWzBdO1xuICAgIGFbMV0gKz0gayAqIGJbMV07XG4gICAgcmV0dXJuIGE7XG4gIH1cbiAgdmFyIGQzX3RyYW5zZm9ybUlkZW50aXR5ID0ge1xuICAgIGE6IDEsXG4gICAgYjogMCxcbiAgICBjOiAwLFxuICAgIGQ6IDEsXG4gICAgZTogMCxcbiAgICBmOiAwXG4gIH07XG4gIGQzLmludGVycG9sYXRlVHJhbnNmb3JtID0gZDNfaW50ZXJwb2xhdGVUcmFuc2Zvcm07XG4gIGZ1bmN0aW9uIGQzX2ludGVycG9sYXRlVHJhbnNmb3JtKGEsIGIpIHtcbiAgICB2YXIgcyA9IFtdLCBxID0gW10sIG4sIEEgPSBkMy50cmFuc2Zvcm0oYSksIEIgPSBkMy50cmFuc2Zvcm0oYiksIHRhID0gQS50cmFuc2xhdGUsIHRiID0gQi50cmFuc2xhdGUsIHJhID0gQS5yb3RhdGUsIHJiID0gQi5yb3RhdGUsIHdhID0gQS5za2V3LCB3YiA9IEIuc2tldywga2EgPSBBLnNjYWxlLCBrYiA9IEIuc2NhbGU7XG4gICAgaWYgKHRhWzBdICE9IHRiWzBdIHx8IHRhWzFdICE9IHRiWzFdKSB7XG4gICAgICBzLnB1c2goXCJ0cmFuc2xhdGUoXCIsIG51bGwsIFwiLFwiLCBudWxsLCBcIilcIik7XG4gICAgICBxLnB1c2goe1xuICAgICAgICBpOiAxLFxuICAgICAgICB4OiBkM19pbnRlcnBvbGF0ZU51bWJlcih0YVswXSwgdGJbMF0pXG4gICAgICB9LCB7XG4gICAgICAgIGk6IDMsXG4gICAgICAgIHg6IGQzX2ludGVycG9sYXRlTnVtYmVyKHRhWzFdLCB0YlsxXSlcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGJbMF0gfHwgdGJbMV0pIHtcbiAgICAgIHMucHVzaChcInRyYW5zbGF0ZShcIiArIHRiICsgXCIpXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzLnB1c2goXCJcIik7XG4gICAgfVxuICAgIGlmIChyYSAhPSByYikge1xuICAgICAgaWYgKHJhIC0gcmIgPiAxODApIHJiICs9IDM2MDsgZWxzZSBpZiAocmIgLSByYSA+IDE4MCkgcmEgKz0gMzYwO1xuICAgICAgcS5wdXNoKHtcbiAgICAgICAgaTogcy5wdXNoKHMucG9wKCkgKyBcInJvdGF0ZShcIiwgbnVsbCwgXCIpXCIpIC0gMixcbiAgICAgICAgeDogZDNfaW50ZXJwb2xhdGVOdW1iZXIocmEsIHJiKVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChyYikge1xuICAgICAgcy5wdXNoKHMucG9wKCkgKyBcInJvdGF0ZShcIiArIHJiICsgXCIpXCIpO1xuICAgIH1cbiAgICBpZiAod2EgIT0gd2IpIHtcbiAgICAgIHEucHVzaCh7XG4gICAgICAgIGk6IHMucHVzaChzLnBvcCgpICsgXCJza2V3WChcIiwgbnVsbCwgXCIpXCIpIC0gMixcbiAgICAgICAgeDogZDNfaW50ZXJwb2xhdGVOdW1iZXIod2EsIHdiKVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh3Yikge1xuICAgICAgcy5wdXNoKHMucG9wKCkgKyBcInNrZXdYKFwiICsgd2IgKyBcIilcIik7XG4gICAgfVxuICAgIGlmIChrYVswXSAhPSBrYlswXSB8fCBrYVsxXSAhPSBrYlsxXSkge1xuICAgICAgbiA9IHMucHVzaChzLnBvcCgpICsgXCJzY2FsZShcIiwgbnVsbCwgXCIsXCIsIG51bGwsIFwiKVwiKTtcbiAgICAgIHEucHVzaCh7XG4gICAgICAgIGk6IG4gLSA0LFxuICAgICAgICB4OiBkM19pbnRlcnBvbGF0ZU51bWJlcihrYVswXSwga2JbMF0pXG4gICAgICB9LCB7XG4gICAgICAgIGk6IG4gLSAyLFxuICAgICAgICB4OiBkM19pbnRlcnBvbGF0ZU51bWJlcihrYVsxXSwga2JbMV0pXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGtiWzBdICE9IDEgfHwga2JbMV0gIT0gMSkge1xuICAgICAgcy5wdXNoKHMucG9wKCkgKyBcInNjYWxlKFwiICsga2IgKyBcIilcIik7XG4gICAgfVxuICAgIG4gPSBxLmxlbmd0aDtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgdmFyIGkgPSAtMSwgbztcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBzWyhvID0gcVtpXSkuaV0gPSBvLngodCk7XG4gICAgICByZXR1cm4gcy5qb2luKFwiXCIpO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gZDNfdW5pbnRlcnBvbGF0ZU51bWJlcihhLCBiKSB7XG4gICAgYiA9IGIgLSAoYSA9ICthKSA/IDEgLyAoYiAtIGEpIDogMDtcbiAgICByZXR1cm4gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuICh4IC0gYSkgKiBiO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gZDNfdW5pbnRlcnBvbGF0ZUNsYW1wKGEsIGIpIHtcbiAgICBiID0gYiAtIChhID0gK2EpID8gMSAvIChiIC0gYSkgOiAwO1xuICAgIHJldHVybiBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgKHggLSBhKSAqIGIpKTtcbiAgICB9O1xuICB9XG4gIGQzLmxheW91dCA9IHt9O1xuICBkMy5sYXlvdXQuYnVuZGxlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGxpbmtzKSB7XG4gICAgICB2YXIgcGF0aHMgPSBbXSwgaSA9IC0xLCBuID0gbGlua3MubGVuZ3RoO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIHBhdGhzLnB1c2goZDNfbGF5b3V0X2J1bmRsZVBhdGgobGlua3NbaV0pKTtcbiAgICAgIHJldHVybiBwYXRocztcbiAgICB9O1xuICB9O1xuICBmdW5jdGlvbiBkM19sYXlvdXRfYnVuZGxlUGF0aChsaW5rKSB7XG4gICAgdmFyIHN0YXJ0ID0gbGluay5zb3VyY2UsIGVuZCA9IGxpbmsudGFyZ2V0LCBsY2EgPSBkM19sYXlvdXRfYnVuZGxlTGVhc3RDb21tb25BbmNlc3RvcihzdGFydCwgZW5kKSwgcG9pbnRzID0gWyBzdGFydCBdO1xuICAgIHdoaWxlIChzdGFydCAhPT0gbGNhKSB7XG4gICAgICBzdGFydCA9IHN0YXJ0LnBhcmVudDtcbiAgICAgIHBvaW50cy5wdXNoKHN0YXJ0KTtcbiAgICB9XG4gICAgdmFyIGsgPSBwb2ludHMubGVuZ3RoO1xuICAgIHdoaWxlIChlbmQgIT09IGxjYSkge1xuICAgICAgcG9pbnRzLnNwbGljZShrLCAwLCBlbmQpO1xuICAgICAgZW5kID0gZW5kLnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIHBvaW50cztcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfYnVuZGxlQW5jZXN0b3JzKG5vZGUpIHtcbiAgICB2YXIgYW5jZXN0b3JzID0gW10sIHBhcmVudCA9IG5vZGUucGFyZW50O1xuICAgIHdoaWxlIChwYXJlbnQgIT0gbnVsbCkge1xuICAgICAgYW5jZXN0b3JzLnB1c2gobm9kZSk7XG4gICAgICBub2RlID0gcGFyZW50O1xuICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICB9XG4gICAgYW5jZXN0b3JzLnB1c2gobm9kZSk7XG4gICAgcmV0dXJuIGFuY2VzdG9ycztcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfYnVuZGxlTGVhc3RDb21tb25BbmNlc3RvcihhLCBiKSB7XG4gICAgaWYgKGEgPT09IGIpIHJldHVybiBhO1xuICAgIHZhciBhTm9kZXMgPSBkM19sYXlvdXRfYnVuZGxlQW5jZXN0b3JzKGEpLCBiTm9kZXMgPSBkM19sYXlvdXRfYnVuZGxlQW5jZXN0b3JzKGIpLCBhTm9kZSA9IGFOb2Rlcy5wb3AoKSwgYk5vZGUgPSBiTm9kZXMucG9wKCksIHNoYXJlZE5vZGUgPSBudWxsO1xuICAgIHdoaWxlIChhTm9kZSA9PT0gYk5vZGUpIHtcbiAgICAgIHNoYXJlZE5vZGUgPSBhTm9kZTtcbiAgICAgIGFOb2RlID0gYU5vZGVzLnBvcCgpO1xuICAgICAgYk5vZGUgPSBiTm9kZXMucG9wKCk7XG4gICAgfVxuICAgIHJldHVybiBzaGFyZWROb2RlO1xuICB9XG4gIGQzLmxheW91dC5jaG9yZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjaG9yZCA9IHt9LCBjaG9yZHMsIGdyb3VwcywgbWF0cml4LCBuLCBwYWRkaW5nID0gMCwgc29ydEdyb3Vwcywgc29ydFN1Ymdyb3Vwcywgc29ydENob3JkcztcbiAgICBmdW5jdGlvbiByZWxheW91dCgpIHtcbiAgICAgIHZhciBzdWJncm91cHMgPSB7fSwgZ3JvdXBTdW1zID0gW10sIGdyb3VwSW5kZXggPSBkMy5yYW5nZShuKSwgc3ViZ3JvdXBJbmRleCA9IFtdLCBrLCB4LCB4MCwgaSwgajtcbiAgICAgIGNob3JkcyA9IFtdO1xuICAgICAgZ3JvdXBzID0gW107XG4gICAgICBrID0gMCwgaSA9IC0xO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgeCA9IDAsIGogPSAtMTtcbiAgICAgICAgd2hpbGUgKCsraiA8IG4pIHtcbiAgICAgICAgICB4ICs9IG1hdHJpeFtpXVtqXTtcbiAgICAgICAgfVxuICAgICAgICBncm91cFN1bXMucHVzaCh4KTtcbiAgICAgICAgc3ViZ3JvdXBJbmRleC5wdXNoKGQzLnJhbmdlKG4pKTtcbiAgICAgICAgayArPSB4O1xuICAgICAgfVxuICAgICAgaWYgKHNvcnRHcm91cHMpIHtcbiAgICAgICAgZ3JvdXBJbmRleC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICByZXR1cm4gc29ydEdyb3Vwcyhncm91cFN1bXNbYV0sIGdyb3VwU3Vtc1tiXSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHNvcnRTdWJncm91cHMpIHtcbiAgICAgICAgc3ViZ3JvdXBJbmRleC5mb3JFYWNoKGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICBkLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIHNvcnRTdWJncm91cHMobWF0cml4W2ldW2FdLCBtYXRyaXhbaV1bYl0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGsgPSAoMiAqIM+AIC0gcGFkZGluZyAqIG4pIC8gaztcbiAgICAgIHggPSAwLCBpID0gLTE7XG4gICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICB4MCA9IHgsIGogPSAtMTtcbiAgICAgICAgd2hpbGUgKCsraiA8IG4pIHtcbiAgICAgICAgICB2YXIgZGkgPSBncm91cEluZGV4W2ldLCBkaiA9IHN1Ymdyb3VwSW5kZXhbZGldW2pdLCB2ID0gbWF0cml4W2RpXVtkal0sIGEwID0geCwgYTEgPSB4ICs9IHYgKiBrO1xuICAgICAgICAgIHN1Ymdyb3Vwc1tkaSArIFwiLVwiICsgZGpdID0ge1xuICAgICAgICAgICAgaW5kZXg6IGRpLFxuICAgICAgICAgICAgc3ViaW5kZXg6IGRqLFxuICAgICAgICAgICAgc3RhcnRBbmdsZTogYTAsXG4gICAgICAgICAgICBlbmRBbmdsZTogYTEsXG4gICAgICAgICAgICB2YWx1ZTogdlxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZ3JvdXBzW2RpXSA9IHtcbiAgICAgICAgICBpbmRleDogZGksXG4gICAgICAgICAgc3RhcnRBbmdsZTogeDAsXG4gICAgICAgICAgZW5kQW5nbGU6IHgsXG4gICAgICAgICAgdmFsdWU6ICh4IC0geDApIC8ga1xuICAgICAgICB9O1xuICAgICAgICB4ICs9IHBhZGRpbmc7XG4gICAgICB9XG4gICAgICBpID0gLTE7XG4gICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICBqID0gaSAtIDE7XG4gICAgICAgIHdoaWxlICgrK2ogPCBuKSB7XG4gICAgICAgICAgdmFyIHNvdXJjZSA9IHN1Ymdyb3Vwc1tpICsgXCItXCIgKyBqXSwgdGFyZ2V0ID0gc3ViZ3JvdXBzW2ogKyBcIi1cIiArIGldO1xuICAgICAgICAgIGlmIChzb3VyY2UudmFsdWUgfHwgdGFyZ2V0LnZhbHVlKSB7XG4gICAgICAgICAgICBjaG9yZHMucHVzaChzb3VyY2UudmFsdWUgPCB0YXJnZXQudmFsdWUgPyB7XG4gICAgICAgICAgICAgIHNvdXJjZTogdGFyZ2V0LFxuICAgICAgICAgICAgICB0YXJnZXQ6IHNvdXJjZVxuICAgICAgICAgICAgfSA6IHtcbiAgICAgICAgICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzb3J0Q2hvcmRzKSByZXNvcnQoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVzb3J0KCkge1xuICAgICAgY2hvcmRzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gc29ydENob3JkcygoYS5zb3VyY2UudmFsdWUgKyBhLnRhcmdldC52YWx1ZSkgLyAyLCAoYi5zb3VyY2UudmFsdWUgKyBiLnRhcmdldC52YWx1ZSkgLyAyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjaG9yZC5tYXRyaXggPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBtYXRyaXg7XG4gICAgICBuID0gKG1hdHJpeCA9IHgpICYmIG1hdHJpeC5sZW5ndGg7XG4gICAgICBjaG9yZHMgPSBncm91cHMgPSBudWxsO1xuICAgICAgcmV0dXJuIGNob3JkO1xuICAgIH07XG4gICAgY2hvcmQucGFkZGluZyA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHBhZGRpbmc7XG4gICAgICBwYWRkaW5nID0geDtcbiAgICAgIGNob3JkcyA9IGdyb3VwcyA9IG51bGw7XG4gICAgICByZXR1cm4gY2hvcmQ7XG4gICAgfTtcbiAgICBjaG9yZC5zb3J0R3JvdXBzID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc29ydEdyb3VwcztcbiAgICAgIHNvcnRHcm91cHMgPSB4O1xuICAgICAgY2hvcmRzID0gZ3JvdXBzID0gbnVsbDtcbiAgICAgIHJldHVybiBjaG9yZDtcbiAgICB9O1xuICAgIGNob3JkLnNvcnRTdWJncm91cHMgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzb3J0U3ViZ3JvdXBzO1xuICAgICAgc29ydFN1Ymdyb3VwcyA9IHg7XG4gICAgICBjaG9yZHMgPSBudWxsO1xuICAgICAgcmV0dXJuIGNob3JkO1xuICAgIH07XG4gICAgY2hvcmQuc29ydENob3JkcyA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHNvcnRDaG9yZHM7XG4gICAgICBzb3J0Q2hvcmRzID0geDtcbiAgICAgIGlmIChjaG9yZHMpIHJlc29ydCgpO1xuICAgICAgcmV0dXJuIGNob3JkO1xuICAgIH07XG4gICAgY2hvcmQuY2hvcmRzID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIWNob3JkcykgcmVsYXlvdXQoKTtcbiAgICAgIHJldHVybiBjaG9yZHM7XG4gICAgfTtcbiAgICBjaG9yZC5ncm91cHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghZ3JvdXBzKSByZWxheW91dCgpO1xuICAgICAgcmV0dXJuIGdyb3VwcztcbiAgICB9O1xuICAgIHJldHVybiBjaG9yZDtcbiAgfTtcbiAgZDMubGF5b3V0LmZvcmNlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGZvcmNlID0ge30sIGV2ZW50ID0gZDMuZGlzcGF0Y2goXCJzdGFydFwiLCBcInRpY2tcIiwgXCJlbmRcIiksIHNpemUgPSBbIDEsIDEgXSwgZHJhZywgYWxwaGEsIGZyaWN0aW9uID0gLjksIGxpbmtEaXN0YW5jZSA9IGQzX2xheW91dF9mb3JjZUxpbmtEaXN0YW5jZSwgbGlua1N0cmVuZ3RoID0gZDNfbGF5b3V0X2ZvcmNlTGlua1N0cmVuZ3RoLCBjaGFyZ2UgPSAtMzAsIGdyYXZpdHkgPSAuMSwgdGhldGEgPSAuOCwgbm9kZXMgPSBbXSwgbGlua3MgPSBbXSwgZGlzdGFuY2VzLCBzdHJlbmd0aHMsIGNoYXJnZXM7XG4gICAgZnVuY3Rpb24gcmVwdWxzZShub2RlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24ocXVhZCwgeDEsIF8sIHgyKSB7XG4gICAgICAgIGlmIChxdWFkLnBvaW50ICE9PSBub2RlKSB7XG4gICAgICAgICAgdmFyIGR4ID0gcXVhZC5jeCAtIG5vZGUueCwgZHkgPSBxdWFkLmN5IC0gbm9kZS55LCBkbiA9IDEgLyBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICAgIGlmICgoeDIgLSB4MSkgKiBkbiA8IHRoZXRhKSB7XG4gICAgICAgICAgICB2YXIgayA9IHF1YWQuY2hhcmdlICogZG4gKiBkbjtcbiAgICAgICAgICAgIG5vZGUucHggLT0gZHggKiBrO1xuICAgICAgICAgICAgbm9kZS5weSAtPSBkeSAqIGs7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHF1YWQucG9pbnQgJiYgaXNGaW5pdGUoZG4pKSB7XG4gICAgICAgICAgICB2YXIgayA9IHF1YWQucG9pbnRDaGFyZ2UgKiBkbiAqIGRuO1xuICAgICAgICAgICAgbm9kZS5weCAtPSBkeCAqIGs7XG4gICAgICAgICAgICBub2RlLnB5IC09IGR5ICogaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICFxdWFkLmNoYXJnZTtcbiAgICAgIH07XG4gICAgfVxuICAgIGZvcmNlLnRpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICgoYWxwaGEgKj0gLjk5KSA8IC4wMDUpIHtcbiAgICAgICAgZXZlbnQuZW5kKHtcbiAgICAgICAgICB0eXBlOiBcImVuZFwiLFxuICAgICAgICAgIGFscGhhOiBhbHBoYSA9IDBcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgdmFyIG4gPSBub2Rlcy5sZW5ndGgsIG0gPSBsaW5rcy5sZW5ndGgsIHEsIGksIG8sIHMsIHQsIGwsIGssIHgsIHk7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbTsgKytpKSB7XG4gICAgICAgIG8gPSBsaW5rc1tpXTtcbiAgICAgICAgcyA9IG8uc291cmNlO1xuICAgICAgICB0ID0gby50YXJnZXQ7XG4gICAgICAgIHggPSB0LnggLSBzLng7XG4gICAgICAgIHkgPSB0LnkgLSBzLnk7XG4gICAgICAgIGlmIChsID0geCAqIHggKyB5ICogeSkge1xuICAgICAgICAgIGwgPSBhbHBoYSAqIHN0cmVuZ3Roc1tpXSAqICgobCA9IE1hdGguc3FydChsKSkgLSBkaXN0YW5jZXNbaV0pIC8gbDtcbiAgICAgICAgICB4ICo9IGw7XG4gICAgICAgICAgeSAqPSBsO1xuICAgICAgICAgIHQueCAtPSB4ICogKGsgPSBzLndlaWdodCAvICh0LndlaWdodCArIHMud2VpZ2h0KSk7XG4gICAgICAgICAgdC55IC09IHkgKiBrO1xuICAgICAgICAgIHMueCArPSB4ICogKGsgPSAxIC0gayk7XG4gICAgICAgICAgcy55ICs9IHkgKiBrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoayA9IGFscGhhICogZ3Jhdml0eSkge1xuICAgICAgICB4ID0gc2l6ZVswXSAvIDI7XG4gICAgICAgIHkgPSBzaXplWzFdIC8gMjtcbiAgICAgICAgaSA9IC0xO1xuICAgICAgICBpZiAoaykgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgICBvID0gbm9kZXNbaV07XG4gICAgICAgICAgby54ICs9ICh4IC0gby54KSAqIGs7XG4gICAgICAgICAgby55ICs9ICh5IC0gby55KSAqIGs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjaGFyZ2UpIHtcbiAgICAgICAgZDNfbGF5b3V0X2ZvcmNlQWNjdW11bGF0ZShxID0gZDMuZ2VvbS5xdWFkdHJlZShub2RlcyksIGFscGhhLCBjaGFyZ2VzKTtcbiAgICAgICAgaSA9IC0xO1xuICAgICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICAgIGlmICghKG8gPSBub2Rlc1tpXSkuZml4ZWQpIHtcbiAgICAgICAgICAgIHEudmlzaXQocmVwdWxzZShvKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpID0gLTE7XG4gICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICBvID0gbm9kZXNbaV07XG4gICAgICAgIGlmIChvLmZpeGVkKSB7XG4gICAgICAgICAgby54ID0gby5weDtcbiAgICAgICAgICBvLnkgPSBvLnB5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG8ueCAtPSAoby5weCAtIChvLnB4ID0gby54KSkgKiBmcmljdGlvbjtcbiAgICAgICAgICBvLnkgLT0gKG8ucHkgLSAoby5weSA9IG8ueSkpICogZnJpY3Rpb247XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGV2ZW50LnRpY2soe1xuICAgICAgICB0eXBlOiBcInRpY2tcIixcbiAgICAgICAgYWxwaGE6IGFscGhhXG4gICAgICB9KTtcbiAgICB9O1xuICAgIGZvcmNlLm5vZGVzID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbm9kZXM7XG4gICAgICBub2RlcyA9IHg7XG4gICAgICByZXR1cm4gZm9yY2U7XG4gICAgfTtcbiAgICBmb3JjZS5saW5rcyA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGxpbmtzO1xuICAgICAgbGlua3MgPSB4O1xuICAgICAgcmV0dXJuIGZvcmNlO1xuICAgIH07XG4gICAgZm9yY2Uuc2l6ZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHNpemU7XG4gICAgICBzaXplID0geDtcbiAgICAgIHJldHVybiBmb3JjZTtcbiAgICB9O1xuICAgIGZvcmNlLmxpbmtEaXN0YW5jZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGxpbmtEaXN0YW5jZTtcbiAgICAgIGxpbmtEaXN0YW5jZSA9IHR5cGVvZiB4ID09PSBcImZ1bmN0aW9uXCIgPyB4IDogK3g7XG4gICAgICByZXR1cm4gZm9yY2U7XG4gICAgfTtcbiAgICBmb3JjZS5kaXN0YW5jZSA9IGZvcmNlLmxpbmtEaXN0YW5jZTtcbiAgICBmb3JjZS5saW5rU3RyZW5ndGggPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsaW5rU3RyZW5ndGg7XG4gICAgICBsaW5rU3RyZW5ndGggPSB0eXBlb2YgeCA9PT0gXCJmdW5jdGlvblwiID8geCA6ICt4O1xuICAgICAgcmV0dXJuIGZvcmNlO1xuICAgIH07XG4gICAgZm9yY2UuZnJpY3Rpb24gPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBmcmljdGlvbjtcbiAgICAgIGZyaWN0aW9uID0gK3g7XG4gICAgICByZXR1cm4gZm9yY2U7XG4gICAgfTtcbiAgICBmb3JjZS5jaGFyZ2UgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjaGFyZ2U7XG4gICAgICBjaGFyZ2UgPSB0eXBlb2YgeCA9PT0gXCJmdW5jdGlvblwiID8geCA6ICt4O1xuICAgICAgcmV0dXJuIGZvcmNlO1xuICAgIH07XG4gICAgZm9yY2UuZ3Jhdml0eSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGdyYXZpdHk7XG4gICAgICBncmF2aXR5ID0gK3g7XG4gICAgICByZXR1cm4gZm9yY2U7XG4gICAgfTtcbiAgICBmb3JjZS50aGV0YSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoZXRhO1xuICAgICAgdGhldGEgPSAreDtcbiAgICAgIHJldHVybiBmb3JjZTtcbiAgICB9O1xuICAgIGZvcmNlLmFscGhhID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gYWxwaGE7XG4gICAgICB4ID0gK3g7XG4gICAgICBpZiAoYWxwaGEpIHtcbiAgICAgICAgaWYgKHggPiAwKSBhbHBoYSA9IHg7IGVsc2UgYWxwaGEgPSAwO1xuICAgICAgfSBlbHNlIGlmICh4ID4gMCkge1xuICAgICAgICBldmVudC5zdGFydCh7XG4gICAgICAgICAgdHlwZTogXCJzdGFydFwiLFxuICAgICAgICAgIGFscGhhOiBhbHBoYSA9IHhcbiAgICAgICAgfSk7XG4gICAgICAgIGQzLnRpbWVyKGZvcmNlLnRpY2spO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZvcmNlO1xuICAgIH07XG4gICAgZm9yY2Uuc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBqLCBuID0gbm9kZXMubGVuZ3RoLCBtID0gbGlua3MubGVuZ3RoLCB3ID0gc2l6ZVswXSwgaCA9IHNpemVbMV0sIG5laWdoYm9ycywgbztcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgKG8gPSBub2Rlc1tpXSkuaW5kZXggPSBpO1xuICAgICAgICBvLndlaWdodCA9IDA7XG4gICAgICB9XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbTsgKytpKSB7XG4gICAgICAgIG8gPSBsaW5rc1tpXTtcbiAgICAgICAgaWYgKHR5cGVvZiBvLnNvdXJjZSA9PSBcIm51bWJlclwiKSBvLnNvdXJjZSA9IG5vZGVzW28uc291cmNlXTtcbiAgICAgICAgaWYgKHR5cGVvZiBvLnRhcmdldCA9PSBcIm51bWJlclwiKSBvLnRhcmdldCA9IG5vZGVzW28udGFyZ2V0XTtcbiAgICAgICAgKytvLnNvdXJjZS53ZWlnaHQ7XG4gICAgICAgICsrby50YXJnZXQud2VpZ2h0O1xuICAgICAgfVxuICAgICAgZm9yIChpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgICBvID0gbm9kZXNbaV07XG4gICAgICAgIGlmIChpc05hTihvLngpKSBvLnggPSBwb3NpdGlvbihcInhcIiwgdyk7XG4gICAgICAgIGlmIChpc05hTihvLnkpKSBvLnkgPSBwb3NpdGlvbihcInlcIiwgaCk7XG4gICAgICAgIGlmIChpc05hTihvLnB4KSkgby5weCA9IG8ueDtcbiAgICAgICAgaWYgKGlzTmFOKG8ucHkpKSBvLnB5ID0gby55O1xuICAgICAgfVxuICAgICAgZGlzdGFuY2VzID0gW107XG4gICAgICBpZiAodHlwZW9mIGxpbmtEaXN0YW5jZSA9PT0gXCJmdW5jdGlvblwiKSBmb3IgKGkgPSAwOyBpIDwgbTsgKytpKSBkaXN0YW5jZXNbaV0gPSArbGlua0Rpc3RhbmNlLmNhbGwodGhpcywgbGlua3NbaV0sIGkpOyBlbHNlIGZvciAoaSA9IDA7IGkgPCBtOyArK2kpIGRpc3RhbmNlc1tpXSA9IGxpbmtEaXN0YW5jZTtcbiAgICAgIHN0cmVuZ3RocyA9IFtdO1xuICAgICAgaWYgKHR5cGVvZiBsaW5rU3RyZW5ndGggPT09IFwiZnVuY3Rpb25cIikgZm9yIChpID0gMDsgaSA8IG07ICsraSkgc3RyZW5ndGhzW2ldID0gK2xpbmtTdHJlbmd0aC5jYWxsKHRoaXMsIGxpbmtzW2ldLCBpKTsgZWxzZSBmb3IgKGkgPSAwOyBpIDwgbTsgKytpKSBzdHJlbmd0aHNbaV0gPSBsaW5rU3RyZW5ndGg7XG4gICAgICBjaGFyZ2VzID0gW107XG4gICAgICBpZiAodHlwZW9mIGNoYXJnZSA9PT0gXCJmdW5jdGlvblwiKSBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSBjaGFyZ2VzW2ldID0gK2NoYXJnZS5jYWxsKHRoaXMsIG5vZGVzW2ldLCBpKTsgZWxzZSBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSBjaGFyZ2VzW2ldID0gY2hhcmdlO1xuICAgICAgZnVuY3Rpb24gcG9zaXRpb24oZGltZW5zaW9uLCBzaXplKSB7XG4gICAgICAgIHZhciBuZWlnaGJvcnMgPSBuZWlnaGJvcihpKSwgaiA9IC0xLCBtID0gbmVpZ2hib3JzLmxlbmd0aCwgeDtcbiAgICAgICAgd2hpbGUgKCsraiA8IG0pIGlmICghaXNOYU4oeCA9IG5laWdoYm9yc1tqXVtkaW1lbnNpb25dKSkgcmV0dXJuIHg7XG4gICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogc2l6ZTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIG5laWdoYm9yKCkge1xuICAgICAgICBpZiAoIW5laWdoYm9ycykge1xuICAgICAgICAgIG5laWdoYm9ycyA9IFtdO1xuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBuOyArK2opIHtcbiAgICAgICAgICAgIG5laWdoYm9yc1tqXSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgICAgICAgICB2YXIgbyA9IGxpbmtzW2pdO1xuICAgICAgICAgICAgbmVpZ2hib3JzW28uc291cmNlLmluZGV4XS5wdXNoKG8udGFyZ2V0KTtcbiAgICAgICAgICAgIG5laWdoYm9yc1tvLnRhcmdldC5pbmRleF0ucHVzaChvLnNvdXJjZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZWlnaGJvcnNbaV07XG4gICAgICB9XG4gICAgICByZXR1cm4gZm9yY2UucmVzdW1lKCk7XG4gICAgfTtcbiAgICBmb3JjZS5yZXN1bWUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmb3JjZS5hbHBoYSguMSk7XG4gICAgfTtcbiAgICBmb3JjZS5zdG9wID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZm9yY2UuYWxwaGEoMCk7XG4gICAgfTtcbiAgICBmb3JjZS5kcmFnID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIWRyYWcpIGRyYWcgPSBkMy5iZWhhdmlvci5kcmFnKCkub3JpZ2luKGQzX2lkZW50aXR5KS5vbihcImRyYWdzdGFydC5mb3JjZVwiLCBkM19sYXlvdXRfZm9yY2VEcmFnc3RhcnQpLm9uKFwiZHJhZy5mb3JjZVwiLCBkcmFnbW92ZSkub24oXCJkcmFnZW5kLmZvcmNlXCIsIGQzX2xheW91dF9mb3JjZURyYWdlbmQpO1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZHJhZztcbiAgICAgIHRoaXMub24oXCJtb3VzZW92ZXIuZm9yY2VcIiwgZDNfbGF5b3V0X2ZvcmNlTW91c2VvdmVyKS5vbihcIm1vdXNlb3V0LmZvcmNlXCIsIGQzX2xheW91dF9mb3JjZU1vdXNlb3V0KS5jYWxsKGRyYWcpO1xuICAgIH07XG4gICAgZnVuY3Rpb24gZHJhZ21vdmUoZCkge1xuICAgICAgZC5weCA9IGQzLmV2ZW50LngsIGQucHkgPSBkMy5ldmVudC55O1xuICAgICAgZm9yY2UucmVzdW1lKCk7XG4gICAgfVxuICAgIHJldHVybiBkMy5yZWJpbmQoZm9yY2UsIGV2ZW50LCBcIm9uXCIpO1xuICB9O1xuICBmdW5jdGlvbiBkM19sYXlvdXRfZm9yY2VEcmFnc3RhcnQoZCkge1xuICAgIGQuZml4ZWQgfD0gMjtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfZm9yY2VEcmFnZW5kKGQpIHtcbiAgICBkLmZpeGVkICY9IH42O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9mb3JjZU1vdXNlb3ZlcihkKSB7XG4gICAgZC5maXhlZCB8PSA0O1xuICAgIGQucHggPSBkLngsIGQucHkgPSBkLnk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X2ZvcmNlTW91c2VvdXQoZCkge1xuICAgIGQuZml4ZWQgJj0gfjQ7XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X2ZvcmNlQWNjdW11bGF0ZShxdWFkLCBhbHBoYSwgY2hhcmdlcykge1xuICAgIHZhciBjeCA9IDAsIGN5ID0gMDtcbiAgICBxdWFkLmNoYXJnZSA9IDA7XG4gICAgaWYgKCFxdWFkLmxlYWYpIHtcbiAgICAgIHZhciBub2RlcyA9IHF1YWQubm9kZXMsIG4gPSBub2Rlcy5sZW5ndGgsIGkgPSAtMSwgYztcbiAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgIGMgPSBub2Rlc1tpXTtcbiAgICAgICAgaWYgKGMgPT0gbnVsbCkgY29udGludWU7XG4gICAgICAgIGQzX2xheW91dF9mb3JjZUFjY3VtdWxhdGUoYywgYWxwaGEsIGNoYXJnZXMpO1xuICAgICAgICBxdWFkLmNoYXJnZSArPSBjLmNoYXJnZTtcbiAgICAgICAgY3ggKz0gYy5jaGFyZ2UgKiBjLmN4O1xuICAgICAgICBjeSArPSBjLmNoYXJnZSAqIGMuY3k7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChxdWFkLnBvaW50KSB7XG4gICAgICBpZiAoIXF1YWQubGVhZikge1xuICAgICAgICBxdWFkLnBvaW50LnggKz0gTWF0aC5yYW5kb20oKSAtIC41O1xuICAgICAgICBxdWFkLnBvaW50LnkgKz0gTWF0aC5yYW5kb20oKSAtIC41O1xuICAgICAgfVxuICAgICAgdmFyIGsgPSBhbHBoYSAqIGNoYXJnZXNbcXVhZC5wb2ludC5pbmRleF07XG4gICAgICBxdWFkLmNoYXJnZSArPSBxdWFkLnBvaW50Q2hhcmdlID0gaztcbiAgICAgIGN4ICs9IGsgKiBxdWFkLnBvaW50Lng7XG4gICAgICBjeSArPSBrICogcXVhZC5wb2ludC55O1xuICAgIH1cbiAgICBxdWFkLmN4ID0gY3ggLyBxdWFkLmNoYXJnZTtcbiAgICBxdWFkLmN5ID0gY3kgLyBxdWFkLmNoYXJnZTtcbiAgfVxuICB2YXIgZDNfbGF5b3V0X2ZvcmNlTGlua0Rpc3RhbmNlID0gMjAsIGQzX2xheW91dF9mb3JjZUxpbmtTdHJlbmd0aCA9IDE7XG4gIGQzLmxheW91dC5oaWVyYXJjaHkgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc29ydCA9IGQzX2xheW91dF9oaWVyYXJjaHlTb3J0LCBjaGlsZHJlbiA9IGQzX2xheW91dF9oaWVyYXJjaHlDaGlsZHJlbiwgdmFsdWUgPSBkM19sYXlvdXRfaGllcmFyY2h5VmFsdWU7XG4gICAgZnVuY3Rpb24gcmVjdXJzZShub2RlLCBkZXB0aCwgbm9kZXMpIHtcbiAgICAgIHZhciBjaGlsZHMgPSBjaGlsZHJlbi5jYWxsKGhpZXJhcmNoeSwgbm9kZSwgZGVwdGgpO1xuICAgICAgbm9kZS5kZXB0aCA9IGRlcHRoO1xuICAgICAgbm9kZXMucHVzaChub2RlKTtcbiAgICAgIGlmIChjaGlsZHMgJiYgKG4gPSBjaGlsZHMubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuLCBjID0gbm9kZS5jaGlsZHJlbiA9IFtdLCB2ID0gMCwgaiA9IGRlcHRoICsgMSwgZDtcbiAgICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgICBkID0gcmVjdXJzZShjaGlsZHNbaV0sIGosIG5vZGVzKTtcbiAgICAgICAgICBkLnBhcmVudCA9IG5vZGU7XG4gICAgICAgICAgYy5wdXNoKGQpO1xuICAgICAgICAgIHYgKz0gZC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc29ydCkgYy5zb3J0KHNvcnQpO1xuICAgICAgICBpZiAodmFsdWUpIG5vZGUudmFsdWUgPSB2O1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgICBub2RlLnZhbHVlID0gK3ZhbHVlLmNhbGwoaGllcmFyY2h5LCBub2RlLCBkZXB0aCkgfHwgMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXZhbHVlKG5vZGUsIGRlcHRoKSB7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuLCB2ID0gMDtcbiAgICAgIGlmIChjaGlsZHJlbiAmJiAobiA9IGNoaWxkcmVuLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbiwgaiA9IGRlcHRoICsgMTtcbiAgICAgICAgd2hpbGUgKCsraSA8IG4pIHYgKz0gcmV2YWx1ZShjaGlsZHJlbltpXSwgaik7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlKSB7XG4gICAgICAgIHYgPSArdmFsdWUuY2FsbChoaWVyYXJjaHksIG5vZGUsIGRlcHRoKSB8fCAwO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlKSBub2RlLnZhbHVlID0gdjtcbiAgICAgIHJldHVybiB2O1xuICAgIH1cbiAgICBmdW5jdGlvbiBoaWVyYXJjaHkoZCkge1xuICAgICAgdmFyIG5vZGVzID0gW107XG4gICAgICByZWN1cnNlKGQsIDAsIG5vZGVzKTtcbiAgICAgIHJldHVybiBub2RlcztcbiAgICB9XG4gICAgaGllcmFyY2h5LnNvcnQgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzb3J0O1xuICAgICAgc29ydCA9IHg7XG4gICAgICByZXR1cm4gaGllcmFyY2h5O1xuICAgIH07XG4gICAgaGllcmFyY2h5LmNoaWxkcmVuID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY2hpbGRyZW47XG4gICAgICBjaGlsZHJlbiA9IHg7XG4gICAgICByZXR1cm4gaGllcmFyY2h5O1xuICAgIH07XG4gICAgaGllcmFyY2h5LnZhbHVlID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdmFsdWU7XG4gICAgICB2YWx1ZSA9IHg7XG4gICAgICByZXR1cm4gaGllcmFyY2h5O1xuICAgIH07XG4gICAgaGllcmFyY2h5LnJldmFsdWUgPSBmdW5jdGlvbihyb290KSB7XG4gICAgICByZXZhbHVlKHJvb3QsIDApO1xuICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgfTtcbiAgICByZXR1cm4gaGllcmFyY2h5O1xuICB9O1xuICBmdW5jdGlvbiBkM19sYXlvdXRfaGllcmFyY2h5UmViaW5kKG9iamVjdCwgaGllcmFyY2h5KSB7XG4gICAgZDMucmViaW5kKG9iamVjdCwgaGllcmFyY2h5LCBcInNvcnRcIiwgXCJjaGlsZHJlblwiLCBcInZhbHVlXCIpO1xuICAgIG9iamVjdC5ub2RlcyA9IG9iamVjdDtcbiAgICBvYmplY3QubGlua3MgPSBkM19sYXlvdXRfaGllcmFyY2h5TGlua3M7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfaGllcmFyY2h5Q2hpbGRyZW4oZCkge1xuICAgIHJldHVybiBkLmNoaWxkcmVuO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9oaWVyYXJjaHlWYWx1ZShkKSB7XG4gICAgcmV0dXJuIGQudmFsdWU7XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X2hpZXJhcmNoeVNvcnQoYSwgYikge1xuICAgIHJldHVybiBiLnZhbHVlIC0gYS52YWx1ZTtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfaGllcmFyY2h5TGlua3Mobm9kZXMpIHtcbiAgICByZXR1cm4gZDMubWVyZ2Uobm9kZXMubWFwKGZ1bmN0aW9uKHBhcmVudCkge1xuICAgICAgcmV0dXJuIChwYXJlbnQuY2hpbGRyZW4gfHwgW10pLm1hcChmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNvdXJjZTogcGFyZW50LFxuICAgICAgICAgIHRhcmdldDogY2hpbGRcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgfVxuICBkMy5sYXlvdXQucGFydGl0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGhpZXJhcmNoeSA9IGQzLmxheW91dC5oaWVyYXJjaHkoKSwgc2l6ZSA9IFsgMSwgMSBdO1xuICAgIGZ1bmN0aW9uIHBvc2l0aW9uKG5vZGUsIHgsIGR4LCBkeSkge1xuICAgICAgdmFyIGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbjtcbiAgICAgIG5vZGUueCA9IHg7XG4gICAgICBub2RlLnkgPSBub2RlLmRlcHRoICogZHk7XG4gICAgICBub2RlLmR4ID0gZHg7XG4gICAgICBub2RlLmR5ID0gZHk7XG4gICAgICBpZiAoY2hpbGRyZW4gJiYgKG4gPSBjaGlsZHJlbi5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG4sIGMsIGQ7XG4gICAgICAgIGR4ID0gbm9kZS52YWx1ZSA/IGR4IC8gbm9kZS52YWx1ZSA6IDA7XG4gICAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgICAgcG9zaXRpb24oYyA9IGNoaWxkcmVuW2ldLCB4LCBkID0gYy52YWx1ZSAqIGR4LCBkeSk7XG4gICAgICAgICAgeCArPSBkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRlcHRoKG5vZGUpIHtcbiAgICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW4sIGQgPSAwO1xuICAgICAgaWYgKGNoaWxkcmVuICYmIChuID0gY2hpbGRyZW4ubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuO1xuICAgICAgICB3aGlsZSAoKytpIDwgbikgZCA9IE1hdGgubWF4KGQsIGRlcHRoKGNoaWxkcmVuW2ldKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gMSArIGQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnRpdGlvbihkLCBpKSB7XG4gICAgICB2YXIgbm9kZXMgPSBoaWVyYXJjaHkuY2FsbCh0aGlzLCBkLCBpKTtcbiAgICAgIHBvc2l0aW9uKG5vZGVzWzBdLCAwLCBzaXplWzBdLCBzaXplWzFdIC8gZGVwdGgobm9kZXNbMF0pKTtcbiAgICAgIHJldHVybiBub2RlcztcbiAgICB9XG4gICAgcGFydGl0aW9uLnNpemUgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzaXplO1xuICAgICAgc2l6ZSA9IHg7XG4gICAgICByZXR1cm4gcGFydGl0aW9uO1xuICAgIH07XG4gICAgcmV0dXJuIGQzX2xheW91dF9oaWVyYXJjaHlSZWJpbmQocGFydGl0aW9uLCBoaWVyYXJjaHkpO1xuICB9O1xuICBkMy5sYXlvdXQucGllID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZhbHVlID0gTnVtYmVyLCBzb3J0ID0gZDNfbGF5b3V0X3BpZVNvcnRCeVZhbHVlLCBzdGFydEFuZ2xlID0gMCwgZW5kQW5nbGUgPSAyICogz4A7XG4gICAgZnVuY3Rpb24gcGllKGRhdGEpIHtcbiAgICAgIHZhciB2YWx1ZXMgPSBkYXRhLm1hcChmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiArdmFsdWUuY2FsbChwaWUsIGQsIGkpO1xuICAgICAgfSk7XG4gICAgICB2YXIgYSA9ICsodHlwZW9mIHN0YXJ0QW5nbGUgPT09IFwiZnVuY3Rpb25cIiA/IHN0YXJ0QW5nbGUuYXBwbHkodGhpcywgYXJndW1lbnRzKSA6IHN0YXJ0QW5nbGUpO1xuICAgICAgdmFyIGsgPSAoKHR5cGVvZiBlbmRBbmdsZSA9PT0gXCJmdW5jdGlvblwiID8gZW5kQW5nbGUuYXBwbHkodGhpcywgYXJndW1lbnRzKSA6IGVuZEFuZ2xlKSAtIGEpIC8gZDMuc3VtKHZhbHVlcyk7XG4gICAgICB2YXIgaW5kZXggPSBkMy5yYW5nZShkYXRhLmxlbmd0aCk7XG4gICAgICBpZiAoc29ydCAhPSBudWxsKSBpbmRleC5zb3J0KHNvcnQgPT09IGQzX2xheW91dF9waWVTb3J0QnlWYWx1ZSA/IGZ1bmN0aW9uKGksIGopIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlc1tqXSAtIHZhbHVlc1tpXTtcbiAgICAgIH0gOiBmdW5jdGlvbihpLCBqKSB7XG4gICAgICAgIHJldHVybiBzb3J0KGRhdGFbaV0sIGRhdGFbal0pO1xuICAgICAgfSk7XG4gICAgICB2YXIgYXJjcyA9IFtdO1xuICAgICAgaW5kZXguZm9yRWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgIHZhciBkO1xuICAgICAgICBhcmNzW2ldID0ge1xuICAgICAgICAgIGRhdGE6IGRhdGFbaV0sXG4gICAgICAgICAgdmFsdWU6IGQgPSB2YWx1ZXNbaV0sXG4gICAgICAgICAgc3RhcnRBbmdsZTogYSxcbiAgICAgICAgICBlbmRBbmdsZTogYSArPSBkICoga1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gYXJjcztcbiAgICB9XG4gICAgcGllLnZhbHVlID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdmFsdWU7XG4gICAgICB2YWx1ZSA9IHg7XG4gICAgICByZXR1cm4gcGllO1xuICAgIH07XG4gICAgcGllLnNvcnQgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzb3J0O1xuICAgICAgc29ydCA9IHg7XG4gICAgICByZXR1cm4gcGllO1xuICAgIH07XG4gICAgcGllLnN0YXJ0QW5nbGUgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzdGFydEFuZ2xlO1xuICAgICAgc3RhcnRBbmdsZSA9IHg7XG4gICAgICByZXR1cm4gcGllO1xuICAgIH07XG4gICAgcGllLmVuZEFuZ2xlID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZW5kQW5nbGU7XG4gICAgICBlbmRBbmdsZSA9IHg7XG4gICAgICByZXR1cm4gcGllO1xuICAgIH07XG4gICAgcmV0dXJuIHBpZTtcbiAgfTtcbiAgdmFyIGQzX2xheW91dF9waWVTb3J0QnlWYWx1ZSA9IHt9O1xuICBkMy5sYXlvdXQuc3RhY2sgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdmFsdWVzID0gZDNfaWRlbnRpdHksIG9yZGVyID0gZDNfbGF5b3V0X3N0YWNrT3JkZXJEZWZhdWx0LCBvZmZzZXQgPSBkM19sYXlvdXRfc3RhY2tPZmZzZXRaZXJvLCBvdXQgPSBkM19sYXlvdXRfc3RhY2tPdXQsIHggPSBkM19sYXlvdXRfc3RhY2tYLCB5ID0gZDNfbGF5b3V0X3N0YWNrWTtcbiAgICBmdW5jdGlvbiBzdGFjayhkYXRhLCBpbmRleCkge1xuICAgICAgdmFyIHNlcmllcyA9IGRhdGEubWFwKGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlcy5jYWxsKHN0YWNrLCBkLCBpKTtcbiAgICAgIH0pO1xuICAgICAgdmFyIHBvaW50cyA9IHNlcmllcy5tYXAoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC5tYXAoZnVuY3Rpb24odiwgaSkge1xuICAgICAgICAgIHJldHVybiBbIHguY2FsbChzdGFjaywgdiwgaSksIHkuY2FsbChzdGFjaywgdiwgaSkgXTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHZhciBvcmRlcnMgPSBvcmRlci5jYWxsKHN0YWNrLCBwb2ludHMsIGluZGV4KTtcbiAgICAgIHNlcmllcyA9IGQzLnBlcm11dGUoc2VyaWVzLCBvcmRlcnMpO1xuICAgICAgcG9pbnRzID0gZDMucGVybXV0ZShwb2ludHMsIG9yZGVycyk7XG4gICAgICB2YXIgb2Zmc2V0cyA9IG9mZnNldC5jYWxsKHN0YWNrLCBwb2ludHMsIGluZGV4KTtcbiAgICAgIHZhciBuID0gc2VyaWVzLmxlbmd0aCwgbSA9IHNlcmllc1swXS5sZW5ndGgsIGksIGosIG87XG4gICAgICBmb3IgKGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgICAgIG91dC5jYWxsKHN0YWNrLCBzZXJpZXNbMF1bal0sIG8gPSBvZmZzZXRzW2pdLCBwb2ludHNbMF1bal1bMV0pO1xuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgbjsgKytpKSB7XG4gICAgICAgICAgb3V0LmNhbGwoc3RhY2ssIHNlcmllc1tpXVtqXSwgbyArPSBwb2ludHNbaSAtIDFdW2pdWzFdLCBwb2ludHNbaV1bal1bMV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgc3RhY2sudmFsdWVzID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdmFsdWVzO1xuICAgICAgdmFsdWVzID0geDtcbiAgICAgIHJldHVybiBzdGFjaztcbiAgICB9O1xuICAgIHN0YWNrLm9yZGVyID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3JkZXI7XG4gICAgICBvcmRlciA9IHR5cGVvZiB4ID09PSBcImZ1bmN0aW9uXCIgPyB4IDogZDNfbGF5b3V0X3N0YWNrT3JkZXJzLmdldCh4KSB8fCBkM19sYXlvdXRfc3RhY2tPcmRlckRlZmF1bHQ7XG4gICAgICByZXR1cm4gc3RhY2s7XG4gICAgfTtcbiAgICBzdGFjay5vZmZzZXQgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvZmZzZXQ7XG4gICAgICBvZmZzZXQgPSB0eXBlb2YgeCA9PT0gXCJmdW5jdGlvblwiID8geCA6IGQzX2xheW91dF9zdGFja09mZnNldHMuZ2V0KHgpIHx8IGQzX2xheW91dF9zdGFja09mZnNldFplcm87XG4gICAgICByZXR1cm4gc3RhY2s7XG4gICAgfTtcbiAgICBzdGFjay54ID0gZnVuY3Rpb24oeikge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4geDtcbiAgICAgIHggPSB6O1xuICAgICAgcmV0dXJuIHN0YWNrO1xuICAgIH07XG4gICAgc3RhY2sueSA9IGZ1bmN0aW9uKHopIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHk7XG4gICAgICB5ID0gejtcbiAgICAgIHJldHVybiBzdGFjaztcbiAgICB9O1xuICAgIHN0YWNrLm91dCA9IGZ1bmN0aW9uKHopIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG91dDtcbiAgICAgIG91dCA9IHo7XG4gICAgICByZXR1cm4gc3RhY2s7XG4gICAgfTtcbiAgICByZXR1cm4gc3RhY2s7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9zdGFja1goZCkge1xuICAgIHJldHVybiBkLng7XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X3N0YWNrWShkKSB7XG4gICAgcmV0dXJuIGQueTtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfc3RhY2tPdXQoZCwgeTAsIHkpIHtcbiAgICBkLnkwID0geTA7XG4gICAgZC55ID0geTtcbiAgfVxuICB2YXIgZDNfbGF5b3V0X3N0YWNrT3JkZXJzID0gZDMubWFwKHtcbiAgICBcImluc2lkZS1vdXRcIjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgdmFyIG4gPSBkYXRhLmxlbmd0aCwgaSwgaiwgbWF4ID0gZGF0YS5tYXAoZDNfbGF5b3V0X3N0YWNrTWF4SW5kZXgpLCBzdW1zID0gZGF0YS5tYXAoZDNfbGF5b3V0X3N0YWNrUmVkdWNlU3VtKSwgaW5kZXggPSBkMy5yYW5nZShuKS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIG1heFthXSAtIG1heFtiXTtcbiAgICAgIH0pLCB0b3AgPSAwLCBib3R0b20gPSAwLCB0b3BzID0gW10sIGJvdHRvbXMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgaiA9IGluZGV4W2ldO1xuICAgICAgICBpZiAodG9wIDwgYm90dG9tKSB7XG4gICAgICAgICAgdG9wICs9IHN1bXNbal07XG4gICAgICAgICAgdG9wcy5wdXNoKGopO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJvdHRvbSArPSBzdW1zW2pdO1xuICAgICAgICAgIGJvdHRvbXMucHVzaChqKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGJvdHRvbXMucmV2ZXJzZSgpLmNvbmNhdCh0b3BzKTtcbiAgICB9LFxuICAgIHJldmVyc2U6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJldHVybiBkMy5yYW5nZShkYXRhLmxlbmd0aCkucmV2ZXJzZSgpO1xuICAgIH0sXG4gICAgXCJkZWZhdWx0XCI6IGQzX2xheW91dF9zdGFja09yZGVyRGVmYXVsdFxuICB9KTtcbiAgdmFyIGQzX2xheW91dF9zdGFja09mZnNldHMgPSBkMy5tYXAoe1xuICAgIHNpbGhvdWV0dGU6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHZhciBuID0gZGF0YS5sZW5ndGgsIG0gPSBkYXRhWzBdLmxlbmd0aCwgc3VtcyA9IFtdLCBtYXggPSAwLCBpLCBqLCBvLCB5MCA9IFtdO1xuICAgICAgZm9yIChqID0gMDsgaiA8IG07ICsraikge1xuICAgICAgICBmb3IgKGkgPSAwLCBvID0gMDsgaSA8IG47IGkrKykgbyArPSBkYXRhW2ldW2pdWzFdO1xuICAgICAgICBpZiAobyA+IG1heCkgbWF4ID0gbztcbiAgICAgICAgc3Vtcy5wdXNoKG8pO1xuICAgICAgfVxuICAgICAgZm9yIChqID0gMDsgaiA8IG07ICsraikge1xuICAgICAgICB5MFtqXSA9IChtYXggLSBzdW1zW2pdKSAvIDI7XG4gICAgICB9XG4gICAgICByZXR1cm4geTA7XG4gICAgfSxcbiAgICB3aWdnbGU6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHZhciBuID0gZGF0YS5sZW5ndGgsIHggPSBkYXRhWzBdLCBtID0geC5sZW5ndGgsIGksIGosIGssIHMxLCBzMiwgczMsIGR4LCBvLCBvMCwgeTAgPSBbXTtcbiAgICAgIHkwWzBdID0gbyA9IG8wID0gMDtcbiAgICAgIGZvciAoaiA9IDE7IGogPCBtOyArK2opIHtcbiAgICAgICAgZm9yIChpID0gMCwgczEgPSAwOyBpIDwgbjsgKytpKSBzMSArPSBkYXRhW2ldW2pdWzFdO1xuICAgICAgICBmb3IgKGkgPSAwLCBzMiA9IDAsIGR4ID0geFtqXVswXSAtIHhbaiAtIDFdWzBdOyBpIDwgbjsgKytpKSB7XG4gICAgICAgICAgZm9yIChrID0gMCwgczMgPSAoZGF0YVtpXVtqXVsxXSAtIGRhdGFbaV1baiAtIDFdWzFdKSAvICgyICogZHgpOyBrIDwgaTsgKytrKSB7XG4gICAgICAgICAgICBzMyArPSAoZGF0YVtrXVtqXVsxXSAtIGRhdGFba11baiAtIDFdWzFdKSAvIGR4O1xuICAgICAgICAgIH1cbiAgICAgICAgICBzMiArPSBzMyAqIGRhdGFbaV1bal1bMV07XG4gICAgICAgIH1cbiAgICAgICAgeTBbal0gPSBvIC09IHMxID8gczIgLyBzMSAqIGR4IDogMDtcbiAgICAgICAgaWYgKG8gPCBvMCkgbzAgPSBvO1xuICAgICAgfVxuICAgICAgZm9yIChqID0gMDsgaiA8IG07ICsraikgeTBbal0gLT0gbzA7XG4gICAgICByZXR1cm4geTA7XG4gICAgfSxcbiAgICBleHBhbmQ6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHZhciBuID0gZGF0YS5sZW5ndGgsIG0gPSBkYXRhWzBdLmxlbmd0aCwgayA9IDEgLyBuLCBpLCBqLCBvLCB5MCA9IFtdO1xuICAgICAgZm9yIChqID0gMDsgaiA8IG07ICsraikge1xuICAgICAgICBmb3IgKGkgPSAwLCBvID0gMDsgaSA8IG47IGkrKykgbyArPSBkYXRhW2ldW2pdWzFdO1xuICAgICAgICBpZiAobykgZm9yIChpID0gMDsgaSA8IG47IGkrKykgZGF0YVtpXVtqXVsxXSAvPSBvOyBlbHNlIGZvciAoaSA9IDA7IGkgPCBuOyBpKyspIGRhdGFbaV1bal1bMV0gPSBrO1xuICAgICAgfVxuICAgICAgZm9yIChqID0gMDsgaiA8IG07ICsraikgeTBbal0gPSAwO1xuICAgICAgcmV0dXJuIHkwO1xuICAgIH0sXG4gICAgemVybzogZDNfbGF5b3V0X3N0YWNrT2Zmc2V0WmVyb1xuICB9KTtcbiAgZnVuY3Rpb24gZDNfbGF5b3V0X3N0YWNrT3JkZXJEZWZhdWx0KGRhdGEpIHtcbiAgICByZXR1cm4gZDMucmFuZ2UoZGF0YS5sZW5ndGgpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9zdGFja09mZnNldFplcm8oZGF0YSkge1xuICAgIHZhciBqID0gLTEsIG0gPSBkYXRhWzBdLmxlbmd0aCwgeTAgPSBbXTtcbiAgICB3aGlsZSAoKytqIDwgbSkgeTBbal0gPSAwO1xuICAgIHJldHVybiB5MDtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfc3RhY2tNYXhJbmRleChhcnJheSkge1xuICAgIHZhciBpID0gMSwgaiA9IDAsIHYgPSBhcnJheVswXVsxXSwgaywgbiA9IGFycmF5Lmxlbmd0aDtcbiAgICBmb3IgKDtpIDwgbjsgKytpKSB7XG4gICAgICBpZiAoKGsgPSBhcnJheVtpXVsxXSkgPiB2KSB7XG4gICAgICAgIGogPSBpO1xuICAgICAgICB2ID0gaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGo7XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X3N0YWNrUmVkdWNlU3VtKGQpIHtcbiAgICByZXR1cm4gZC5yZWR1Y2UoZDNfbGF5b3V0X3N0YWNrU3VtLCAwKTtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfc3RhY2tTdW0ocCwgZCkge1xuICAgIHJldHVybiBwICsgZFsxXTtcbiAgfVxuICBkMy5sYXlvdXQuaGlzdG9ncmFtID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGZyZXF1ZW5jeSA9IHRydWUsIHZhbHVlciA9IE51bWJlciwgcmFuZ2VyID0gZDNfbGF5b3V0X2hpc3RvZ3JhbVJhbmdlLCBiaW5uZXIgPSBkM19sYXlvdXRfaGlzdG9ncmFtQmluU3R1cmdlcztcbiAgICBmdW5jdGlvbiBoaXN0b2dyYW0oZGF0YSwgaSkge1xuICAgICAgdmFyIGJpbnMgPSBbXSwgdmFsdWVzID0gZGF0YS5tYXAodmFsdWVyLCB0aGlzKSwgcmFuZ2UgPSByYW5nZXIuY2FsbCh0aGlzLCB2YWx1ZXMsIGkpLCB0aHJlc2hvbGRzID0gYmlubmVyLmNhbGwodGhpcywgcmFuZ2UsIHZhbHVlcywgaSksIGJpbiwgaSA9IC0xLCBuID0gdmFsdWVzLmxlbmd0aCwgbSA9IHRocmVzaG9sZHMubGVuZ3RoIC0gMSwgayA9IGZyZXF1ZW5jeSA/IDEgOiAxIC8gbiwgeDtcbiAgICAgIHdoaWxlICgrK2kgPCBtKSB7XG4gICAgICAgIGJpbiA9IGJpbnNbaV0gPSBbXTtcbiAgICAgICAgYmluLmR4ID0gdGhyZXNob2xkc1tpICsgMV0gLSAoYmluLnggPSB0aHJlc2hvbGRzW2ldKTtcbiAgICAgICAgYmluLnkgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKG0gPiAwKSB7XG4gICAgICAgIGkgPSAtMTtcbiAgICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgICB4ID0gdmFsdWVzW2ldO1xuICAgICAgICAgIGlmICh4ID49IHJhbmdlWzBdICYmIHggPD0gcmFuZ2VbMV0pIHtcbiAgICAgICAgICAgIGJpbiA9IGJpbnNbZDMuYmlzZWN0KHRocmVzaG9sZHMsIHgsIDEsIG0pIC0gMV07XG4gICAgICAgICAgICBiaW4ueSArPSBrO1xuICAgICAgICAgICAgYmluLnB1c2goZGF0YVtpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gYmlucztcbiAgICB9XG4gICAgaGlzdG9ncmFtLnZhbHVlID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdmFsdWVyO1xuICAgICAgdmFsdWVyID0geDtcbiAgICAgIHJldHVybiBoaXN0b2dyYW07XG4gICAgfTtcbiAgICBoaXN0b2dyYW0ucmFuZ2UgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiByYW5nZXI7XG4gICAgICByYW5nZXIgPSBkM19mdW5jdG9yKHgpO1xuICAgICAgcmV0dXJuIGhpc3RvZ3JhbTtcbiAgICB9O1xuICAgIGhpc3RvZ3JhbS5iaW5zID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gYmlubmVyO1xuICAgICAgYmlubmVyID0gdHlwZW9mIHggPT09IFwibnVtYmVyXCIgPyBmdW5jdGlvbihyYW5nZSkge1xuICAgICAgICByZXR1cm4gZDNfbGF5b3V0X2hpc3RvZ3JhbUJpbkZpeGVkKHJhbmdlLCB4KTtcbiAgICAgIH0gOiBkM19mdW5jdG9yKHgpO1xuICAgICAgcmV0dXJuIGhpc3RvZ3JhbTtcbiAgICB9O1xuICAgIGhpc3RvZ3JhbS5mcmVxdWVuY3kgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBmcmVxdWVuY3k7XG4gICAgICBmcmVxdWVuY3kgPSAhIXg7XG4gICAgICByZXR1cm4gaGlzdG9ncmFtO1xuICAgIH07XG4gICAgcmV0dXJuIGhpc3RvZ3JhbTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfbGF5b3V0X2hpc3RvZ3JhbUJpblN0dXJnZXMocmFuZ2UsIHZhbHVlcykge1xuICAgIHJldHVybiBkM19sYXlvdXRfaGlzdG9ncmFtQmluRml4ZWQocmFuZ2UsIE1hdGguY2VpbChNYXRoLmxvZyh2YWx1ZXMubGVuZ3RoKSAvIE1hdGguTE4yICsgMSkpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9oaXN0b2dyYW1CaW5GaXhlZChyYW5nZSwgbikge1xuICAgIHZhciB4ID0gLTEsIGIgPSArcmFuZ2VbMF0sIG0gPSAocmFuZ2VbMV0gLSBiKSAvIG4sIGYgPSBbXTtcbiAgICB3aGlsZSAoKyt4IDw9IG4pIGZbeF0gPSBtICogeCArIGI7XG4gICAgcmV0dXJuIGY7XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X2hpc3RvZ3JhbVJhbmdlKHZhbHVlcykge1xuICAgIHJldHVybiBbIGQzLm1pbih2YWx1ZXMpLCBkMy5tYXgodmFsdWVzKSBdO1xuICB9XG4gIGQzLmxheW91dC50cmVlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGhpZXJhcmNoeSA9IGQzLmxheW91dC5oaWVyYXJjaHkoKS5zb3J0KG51bGwpLnZhbHVlKG51bGwpLCBzZXBhcmF0aW9uID0gZDNfbGF5b3V0X3RyZWVTZXBhcmF0aW9uLCBzaXplID0gWyAxLCAxIF0sIG5vZGVTaXplID0gZmFsc2U7XG4gICAgZnVuY3Rpb24gdHJlZShkLCBpKSB7XG4gICAgICB2YXIgbm9kZXMgPSBoaWVyYXJjaHkuY2FsbCh0aGlzLCBkLCBpKSwgcm9vdCA9IG5vZGVzWzBdO1xuICAgICAgZnVuY3Rpb24gZmlyc3RXYWxrKG5vZGUsIHByZXZpb3VzU2libGluZykge1xuICAgICAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuLCBsYXlvdXQgPSBub2RlLl90cmVlO1xuICAgICAgICBpZiAoY2hpbGRyZW4gJiYgKG4gPSBjaGlsZHJlbi5sZW5ndGgpKSB7XG4gICAgICAgICAgdmFyIG4sIGZpcnN0Q2hpbGQgPSBjaGlsZHJlblswXSwgcHJldmlvdXNDaGlsZCwgYW5jZXN0b3IgPSBmaXJzdENoaWxkLCBjaGlsZCwgaSA9IC0xO1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgICAgICBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgZmlyc3RXYWxrKGNoaWxkLCBwcmV2aW91c0NoaWxkKTtcbiAgICAgICAgICAgIGFuY2VzdG9yID0gYXBwb3J0aW9uKGNoaWxkLCBwcmV2aW91c0NoaWxkLCBhbmNlc3Rvcik7XG4gICAgICAgICAgICBwcmV2aW91c0NoaWxkID0gY2hpbGQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGQzX2xheW91dF90cmVlU2hpZnQobm9kZSk7XG4gICAgICAgICAgdmFyIG1pZHBvaW50ID0gLjUgKiAoZmlyc3RDaGlsZC5fdHJlZS5wcmVsaW0gKyBjaGlsZC5fdHJlZS5wcmVsaW0pO1xuICAgICAgICAgIGlmIChwcmV2aW91c1NpYmxpbmcpIHtcbiAgICAgICAgICAgIGxheW91dC5wcmVsaW0gPSBwcmV2aW91c1NpYmxpbmcuX3RyZWUucHJlbGltICsgc2VwYXJhdGlvbihub2RlLCBwcmV2aW91c1NpYmxpbmcpO1xuICAgICAgICAgICAgbGF5b3V0Lm1vZCA9IGxheW91dC5wcmVsaW0gLSBtaWRwb2ludDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGF5b3V0LnByZWxpbSA9IG1pZHBvaW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAocHJldmlvdXNTaWJsaW5nKSB7XG4gICAgICAgICAgICBsYXlvdXQucHJlbGltID0gcHJldmlvdXNTaWJsaW5nLl90cmVlLnByZWxpbSArIHNlcGFyYXRpb24obm9kZSwgcHJldmlvdXNTaWJsaW5nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHNlY29uZFdhbGsobm9kZSwgeCkge1xuICAgICAgICBub2RlLnggPSBub2RlLl90cmVlLnByZWxpbSArIHg7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XG4gICAgICAgIGlmIChjaGlsZHJlbiAmJiAobiA9IGNoaWxkcmVuLmxlbmd0aCkpIHtcbiAgICAgICAgICB2YXIgaSA9IC0xLCBuO1xuICAgICAgICAgIHggKz0gbm9kZS5fdHJlZS5tb2Q7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgICAgIHNlY29uZFdhbGsoY2hpbGRyZW5baV0sIHgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZnVuY3Rpb24gYXBwb3J0aW9uKG5vZGUsIHByZXZpb3VzU2libGluZywgYW5jZXN0b3IpIHtcbiAgICAgICAgaWYgKHByZXZpb3VzU2libGluZykge1xuICAgICAgICAgIHZhciB2aXAgPSBub2RlLCB2b3AgPSBub2RlLCB2aW0gPSBwcmV2aW91c1NpYmxpbmcsIHZvbSA9IG5vZGUucGFyZW50LmNoaWxkcmVuWzBdLCBzaXAgPSB2aXAuX3RyZWUubW9kLCBzb3AgPSB2b3AuX3RyZWUubW9kLCBzaW0gPSB2aW0uX3RyZWUubW9kLCBzb20gPSB2b20uX3RyZWUubW9kLCBzaGlmdDtcbiAgICAgICAgICB3aGlsZSAodmltID0gZDNfbGF5b3V0X3RyZWVSaWdodCh2aW0pLCB2aXAgPSBkM19sYXlvdXRfdHJlZUxlZnQodmlwKSwgdmltICYmIHZpcCkge1xuICAgICAgICAgICAgdm9tID0gZDNfbGF5b3V0X3RyZWVMZWZ0KHZvbSk7XG4gICAgICAgICAgICB2b3AgPSBkM19sYXlvdXRfdHJlZVJpZ2h0KHZvcCk7XG4gICAgICAgICAgICB2b3AuX3RyZWUuYW5jZXN0b3IgPSBub2RlO1xuICAgICAgICAgICAgc2hpZnQgPSB2aW0uX3RyZWUucHJlbGltICsgc2ltIC0gdmlwLl90cmVlLnByZWxpbSAtIHNpcCArIHNlcGFyYXRpb24odmltLCB2aXApO1xuICAgICAgICAgICAgaWYgKHNoaWZ0ID4gMCkge1xuICAgICAgICAgICAgICBkM19sYXlvdXRfdHJlZU1vdmUoZDNfbGF5b3V0X3RyZWVBbmNlc3Rvcih2aW0sIG5vZGUsIGFuY2VzdG9yKSwgbm9kZSwgc2hpZnQpO1xuICAgICAgICAgICAgICBzaXAgKz0gc2hpZnQ7XG4gICAgICAgICAgICAgIHNvcCArPSBzaGlmdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNpbSArPSB2aW0uX3RyZWUubW9kO1xuICAgICAgICAgICAgc2lwICs9IHZpcC5fdHJlZS5tb2Q7XG4gICAgICAgICAgICBzb20gKz0gdm9tLl90cmVlLm1vZDtcbiAgICAgICAgICAgIHNvcCArPSB2b3AuX3RyZWUubW9kO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodmltICYmICFkM19sYXlvdXRfdHJlZVJpZ2h0KHZvcCkpIHtcbiAgICAgICAgICAgIHZvcC5fdHJlZS50aHJlYWQgPSB2aW07XG4gICAgICAgICAgICB2b3AuX3RyZWUubW9kICs9IHNpbSAtIHNvcDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHZpcCAmJiAhZDNfbGF5b3V0X3RyZWVMZWZ0KHZvbSkpIHtcbiAgICAgICAgICAgIHZvbS5fdHJlZS50aHJlYWQgPSB2aXA7XG4gICAgICAgICAgICB2b20uX3RyZWUubW9kICs9IHNpcCAtIHNvbTtcbiAgICAgICAgICAgIGFuY2VzdG9yID0gbm9kZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFuY2VzdG9yO1xuICAgICAgfVxuICAgICAgZDNfbGF5b3V0X3RyZWVWaXNpdEFmdGVyKHJvb3QsIGZ1bmN0aW9uKG5vZGUsIHByZXZpb3VzU2libGluZykge1xuICAgICAgICBub2RlLl90cmVlID0ge1xuICAgICAgICAgIGFuY2VzdG9yOiBub2RlLFxuICAgICAgICAgIHByZWxpbTogMCxcbiAgICAgICAgICBtb2Q6IDAsXG4gICAgICAgICAgY2hhbmdlOiAwLFxuICAgICAgICAgIHNoaWZ0OiAwLFxuICAgICAgICAgIG51bWJlcjogcHJldmlvdXNTaWJsaW5nID8gcHJldmlvdXNTaWJsaW5nLl90cmVlLm51bWJlciArIDEgOiAwXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICAgIGZpcnN0V2Fsayhyb290KTtcbiAgICAgIHNlY29uZFdhbGsocm9vdCwgLXJvb3QuX3RyZWUucHJlbGltKTtcbiAgICAgIHZhciBsZWZ0ID0gZDNfbGF5b3V0X3RyZWVTZWFyY2gocm9vdCwgZDNfbGF5b3V0X3RyZWVMZWZ0bW9zdCksIHJpZ2h0ID0gZDNfbGF5b3V0X3RyZWVTZWFyY2gocm9vdCwgZDNfbGF5b3V0X3RyZWVSaWdodG1vc3QpLCBkZWVwID0gZDNfbGF5b3V0X3RyZWVTZWFyY2gocm9vdCwgZDNfbGF5b3V0X3RyZWVEZWVwZXN0KSwgeDAgPSBsZWZ0LnggLSBzZXBhcmF0aW9uKGxlZnQsIHJpZ2h0KSAvIDIsIHgxID0gcmlnaHQueCArIHNlcGFyYXRpb24ocmlnaHQsIGxlZnQpIC8gMiwgeTEgPSBkZWVwLmRlcHRoIHx8IDE7XG4gICAgICBkM19sYXlvdXRfdHJlZVZpc2l0QWZ0ZXIocm9vdCwgbm9kZVNpemUgPyBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIG5vZGUueCAqPSBzaXplWzBdO1xuICAgICAgICBub2RlLnkgPSBub2RlLmRlcHRoICogc2l6ZVsxXTtcbiAgICAgICAgZGVsZXRlIG5vZGUuX3RyZWU7XG4gICAgICB9IDogZnVuY3Rpb24obm9kZSkge1xuICAgICAgICBub2RlLnggPSAobm9kZS54IC0geDApIC8gKHgxIC0geDApICogc2l6ZVswXTtcbiAgICAgICAgbm9kZS55ID0gbm9kZS5kZXB0aCAvIHkxICogc2l6ZVsxXTtcbiAgICAgICAgZGVsZXRlIG5vZGUuX3RyZWU7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBub2RlcztcbiAgICB9XG4gICAgdHJlZS5zZXBhcmF0aW9uID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2VwYXJhdGlvbjtcbiAgICAgIHNlcGFyYXRpb24gPSB4O1xuICAgICAgcmV0dXJuIHRyZWU7XG4gICAgfTtcbiAgICB0cmVlLnNpemUgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBub2RlU2l6ZSA/IG51bGwgOiBzaXplO1xuICAgICAgbm9kZVNpemUgPSAoc2l6ZSA9IHgpID09IG51bGw7XG4gICAgICByZXR1cm4gdHJlZTtcbiAgICB9O1xuICAgIHRyZWUubm9kZVNpemUgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBub2RlU2l6ZSA/IHNpemUgOiBudWxsO1xuICAgICAgbm9kZVNpemUgPSAoc2l6ZSA9IHgpICE9IG51bGw7XG4gICAgICByZXR1cm4gdHJlZTtcbiAgICB9O1xuICAgIHJldHVybiBkM19sYXlvdXRfaGllcmFyY2h5UmViaW5kKHRyZWUsIGhpZXJhcmNoeSk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2xheW91dF90cmVlU2VwYXJhdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGEucGFyZW50ID09IGIucGFyZW50ID8gMSA6IDI7XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X3RyZWVMZWZ0KG5vZGUpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xuICAgIHJldHVybiBjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPyBjaGlsZHJlblswXSA6IG5vZGUuX3RyZWUudGhyZWFkO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF90cmVlUmlnaHQobm9kZSkge1xuICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW4sIG47XG4gICAgcmV0dXJuIGNoaWxkcmVuICYmIChuID0gY2hpbGRyZW4ubGVuZ3RoKSA/IGNoaWxkcmVuW24gLSAxXSA6IG5vZGUuX3RyZWUudGhyZWFkO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF90cmVlU2VhcmNoKG5vZGUsIGNvbXBhcmUpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xuICAgIGlmIChjaGlsZHJlbiAmJiAobiA9IGNoaWxkcmVuLmxlbmd0aCkpIHtcbiAgICAgIHZhciBjaGlsZCwgbiwgaSA9IC0xO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgaWYgKGNvbXBhcmUoY2hpbGQgPSBkM19sYXlvdXRfdHJlZVNlYXJjaChjaGlsZHJlbltpXSwgY29tcGFyZSksIG5vZGUpID4gMCkge1xuICAgICAgICAgIG5vZGUgPSBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfdHJlZVJpZ2h0bW9zdChhLCBiKSB7XG4gICAgcmV0dXJuIGEueCAtIGIueDtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfdHJlZUxlZnRtb3N0KGEsIGIpIHtcbiAgICByZXR1cm4gYi54IC0gYS54O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF90cmVlRGVlcGVzdChhLCBiKSB7XG4gICAgcmV0dXJuIGEuZGVwdGggLSBiLmRlcHRoO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF90cmVlVmlzaXRBZnRlcihub2RlLCBjYWxsYmFjaykge1xuICAgIGZ1bmN0aW9uIHZpc2l0KG5vZGUsIHByZXZpb3VzU2libGluZykge1xuICAgICAgdmFyIGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbjtcbiAgICAgIGlmIChjaGlsZHJlbiAmJiAobiA9IGNoaWxkcmVuLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGNoaWxkLCBwcmV2aW91c0NoaWxkID0gbnVsbCwgaSA9IC0xLCBuO1xuICAgICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICAgIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICAgICAgdmlzaXQoY2hpbGQsIHByZXZpb3VzQ2hpbGQpO1xuICAgICAgICAgIHByZXZpb3VzQ2hpbGQgPSBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2FsbGJhY2sobm9kZSwgcHJldmlvdXNTaWJsaW5nKTtcbiAgICB9XG4gICAgdmlzaXQobm9kZSwgbnVsbCk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X3RyZWVTaGlmdChub2RlKSB7XG4gICAgdmFyIHNoaWZ0ID0gMCwgY2hhbmdlID0gMCwgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuLCBpID0gY2hpbGRyZW4ubGVuZ3RoLCBjaGlsZDtcbiAgICB3aGlsZSAoLS1pID49IDApIHtcbiAgICAgIGNoaWxkID0gY2hpbGRyZW5baV0uX3RyZWU7XG4gICAgICBjaGlsZC5wcmVsaW0gKz0gc2hpZnQ7XG4gICAgICBjaGlsZC5tb2QgKz0gc2hpZnQ7XG4gICAgICBzaGlmdCArPSBjaGlsZC5zaGlmdCArIChjaGFuZ2UgKz0gY2hpbGQuY2hhbmdlKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X3RyZWVNb3ZlKGFuY2VzdG9yLCBub2RlLCBzaGlmdCkge1xuICAgIGFuY2VzdG9yID0gYW5jZXN0b3IuX3RyZWU7XG4gICAgbm9kZSA9IG5vZGUuX3RyZWU7XG4gICAgdmFyIGNoYW5nZSA9IHNoaWZ0IC8gKG5vZGUubnVtYmVyIC0gYW5jZXN0b3IubnVtYmVyKTtcbiAgICBhbmNlc3Rvci5jaGFuZ2UgKz0gY2hhbmdlO1xuICAgIG5vZGUuY2hhbmdlIC09IGNoYW5nZTtcbiAgICBub2RlLnNoaWZ0ICs9IHNoaWZ0O1xuICAgIG5vZGUucHJlbGltICs9IHNoaWZ0O1xuICAgIG5vZGUubW9kICs9IHNoaWZ0O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF90cmVlQW5jZXN0b3IodmltLCBub2RlLCBhbmNlc3Rvcikge1xuICAgIHJldHVybiB2aW0uX3RyZWUuYW5jZXN0b3IucGFyZW50ID09IG5vZGUucGFyZW50ID8gdmltLl90cmVlLmFuY2VzdG9yIDogYW5jZXN0b3I7XG4gIH1cbiAgZDMubGF5b3V0LnBhY2sgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaGllcmFyY2h5ID0gZDMubGF5b3V0LmhpZXJhcmNoeSgpLnNvcnQoZDNfbGF5b3V0X3BhY2tTb3J0KSwgcGFkZGluZyA9IDAsIHNpemUgPSBbIDEsIDEgXSwgcmFkaXVzO1xuICAgIGZ1bmN0aW9uIHBhY2soZCwgaSkge1xuICAgICAgdmFyIG5vZGVzID0gaGllcmFyY2h5LmNhbGwodGhpcywgZCwgaSksIHJvb3QgPSBub2Rlc1swXSwgdyA9IHNpemVbMF0sIGggPSBzaXplWzFdLCByID0gcmFkaXVzID09IG51bGwgPyBNYXRoLnNxcnQgOiB0eXBlb2YgcmFkaXVzID09PSBcImZ1bmN0aW9uXCIgPyByYWRpdXMgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHJhZGl1cztcbiAgICAgIH07XG4gICAgICByb290LnggPSByb290LnkgPSAwO1xuICAgICAgZDNfbGF5b3V0X3RyZWVWaXNpdEFmdGVyKHJvb3QsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgZC5yID0gK3IoZC52YWx1ZSk7XG4gICAgICB9KTtcbiAgICAgIGQzX2xheW91dF90cmVlVmlzaXRBZnRlcihyb290LCBkM19sYXlvdXRfcGFja1NpYmxpbmdzKTtcbiAgICAgIGlmIChwYWRkaW5nKSB7XG4gICAgICAgIHZhciBkciA9IHBhZGRpbmcgKiAocmFkaXVzID8gMSA6IE1hdGgubWF4KDIgKiByb290LnIgLyB3LCAyICogcm9vdC5yIC8gaCkpIC8gMjtcbiAgICAgICAgZDNfbGF5b3V0X3RyZWVWaXNpdEFmdGVyKHJvb3QsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICBkLnIgKz0gZHI7XG4gICAgICAgIH0pO1xuICAgICAgICBkM19sYXlvdXRfdHJlZVZpc2l0QWZ0ZXIocm9vdCwgZDNfbGF5b3V0X3BhY2tTaWJsaW5ncyk7XG4gICAgICAgIGQzX2xheW91dF90cmVlVmlzaXRBZnRlcihyb290LCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgZC5yIC09IGRyO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGQzX2xheW91dF9wYWNrVHJhbnNmb3JtKHJvb3QsIHcgLyAyLCBoIC8gMiwgcmFkaXVzID8gMSA6IDEgLyBNYXRoLm1heCgyICogcm9vdC5yIC8gdywgMiAqIHJvb3QuciAvIGgpKTtcbiAgICAgIHJldHVybiBub2RlcztcbiAgICB9XG4gICAgcGFjay5zaXplID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2l6ZTtcbiAgICAgIHNpemUgPSBfO1xuICAgICAgcmV0dXJuIHBhY2s7XG4gICAgfTtcbiAgICBwYWNrLnJhZGl1cyA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHJhZGl1cztcbiAgICAgIHJhZGl1cyA9IF8gPT0gbnVsbCB8fCB0eXBlb2YgXyA9PT0gXCJmdW5jdGlvblwiID8gXyA6ICtfO1xuICAgICAgcmV0dXJuIHBhY2s7XG4gICAgfTtcbiAgICBwYWNrLnBhZGRpbmcgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBwYWRkaW5nO1xuICAgICAgcGFkZGluZyA9ICtfO1xuICAgICAgcmV0dXJuIHBhY2s7XG4gICAgfTtcbiAgICByZXR1cm4gZDNfbGF5b3V0X2hpZXJhcmNoeVJlYmluZChwYWNrLCBoaWVyYXJjaHkpO1xuICB9O1xuICBmdW5jdGlvbiBkM19sYXlvdXRfcGFja1NvcnQoYSwgYikge1xuICAgIHJldHVybiBhLnZhbHVlIC0gYi52YWx1ZTtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfcGFja0luc2VydChhLCBiKSB7XG4gICAgdmFyIGMgPSBhLl9wYWNrX25leHQ7XG4gICAgYS5fcGFja19uZXh0ID0gYjtcbiAgICBiLl9wYWNrX3ByZXYgPSBhO1xuICAgIGIuX3BhY2tfbmV4dCA9IGM7XG4gICAgYy5fcGFja19wcmV2ID0gYjtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfcGFja1NwbGljZShhLCBiKSB7XG4gICAgYS5fcGFja19uZXh0ID0gYjtcbiAgICBiLl9wYWNrX3ByZXYgPSBhO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9wYWNrSW50ZXJzZWN0cyhhLCBiKSB7XG4gICAgdmFyIGR4ID0gYi54IC0gYS54LCBkeSA9IGIueSAtIGEueSwgZHIgPSBhLnIgKyBiLnI7XG4gICAgcmV0dXJuIC45OTkgKiBkciAqIGRyID4gZHggKiBkeCArIGR5ICogZHk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X3BhY2tTaWJsaW5ncyhub2RlKSB7XG4gICAgaWYgKCEobm9kZXMgPSBub2RlLmNoaWxkcmVuKSB8fCAhKG4gPSBub2Rlcy5sZW5ndGgpKSByZXR1cm47XG4gICAgdmFyIG5vZGVzLCB4TWluID0gSW5maW5pdHksIHhNYXggPSAtSW5maW5pdHksIHlNaW4gPSBJbmZpbml0eSwgeU1heCA9IC1JbmZpbml0eSwgYSwgYiwgYywgaSwgaiwgaywgbjtcbiAgICBmdW5jdGlvbiBib3VuZChub2RlKSB7XG4gICAgICB4TWluID0gTWF0aC5taW4obm9kZS54IC0gbm9kZS5yLCB4TWluKTtcbiAgICAgIHhNYXggPSBNYXRoLm1heChub2RlLnggKyBub2RlLnIsIHhNYXgpO1xuICAgICAgeU1pbiA9IE1hdGgubWluKG5vZGUueSAtIG5vZGUuciwgeU1pbik7XG4gICAgICB5TWF4ID0gTWF0aC5tYXgobm9kZS55ICsgbm9kZS5yLCB5TWF4KTtcbiAgICB9XG4gICAgbm9kZXMuZm9yRWFjaChkM19sYXlvdXRfcGFja0xpbmspO1xuICAgIGEgPSBub2Rlc1swXTtcbiAgICBhLnggPSAtYS5yO1xuICAgIGEueSA9IDA7XG4gICAgYm91bmQoYSk7XG4gICAgaWYgKG4gPiAxKSB7XG4gICAgICBiID0gbm9kZXNbMV07XG4gICAgICBiLnggPSBiLnI7XG4gICAgICBiLnkgPSAwO1xuICAgICAgYm91bmQoYik7XG4gICAgICBpZiAobiA+IDIpIHtcbiAgICAgICAgYyA9IG5vZGVzWzJdO1xuICAgICAgICBkM19sYXlvdXRfcGFja1BsYWNlKGEsIGIsIGMpO1xuICAgICAgICBib3VuZChjKTtcbiAgICAgICAgZDNfbGF5b3V0X3BhY2tJbnNlcnQoYSwgYyk7XG4gICAgICAgIGEuX3BhY2tfcHJldiA9IGM7XG4gICAgICAgIGQzX2xheW91dF9wYWNrSW5zZXJ0KGMsIGIpO1xuICAgICAgICBiID0gYS5fcGFja19uZXh0O1xuICAgICAgICBmb3IgKGkgPSAzOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgZDNfbGF5b3V0X3BhY2tQbGFjZShhLCBiLCBjID0gbm9kZXNbaV0pO1xuICAgICAgICAgIHZhciBpc2VjdCA9IDAsIHMxID0gMSwgczIgPSAxO1xuICAgICAgICAgIGZvciAoaiA9IGIuX3BhY2tfbmV4dDsgaiAhPT0gYjsgaiA9IGouX3BhY2tfbmV4dCwgczErKykge1xuICAgICAgICAgICAgaWYgKGQzX2xheW91dF9wYWNrSW50ZXJzZWN0cyhqLCBjKSkge1xuICAgICAgICAgICAgICBpc2VjdCA9IDE7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaXNlY3QgPT0gMSkge1xuICAgICAgICAgICAgZm9yIChrID0gYS5fcGFja19wcmV2OyBrICE9PSBqLl9wYWNrX3ByZXY7IGsgPSBrLl9wYWNrX3ByZXYsIHMyKyspIHtcbiAgICAgICAgICAgICAgaWYgKGQzX2xheW91dF9wYWNrSW50ZXJzZWN0cyhrLCBjKSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpc2VjdCkge1xuICAgICAgICAgICAgaWYgKHMxIDwgczIgfHwgczEgPT0gczIgJiYgYi5yIDwgYS5yKSBkM19sYXlvdXRfcGFja1NwbGljZShhLCBiID0gaik7IGVsc2UgZDNfbGF5b3V0X3BhY2tTcGxpY2UoYSA9IGssIGIpO1xuICAgICAgICAgICAgaS0tO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkM19sYXlvdXRfcGFja0luc2VydChhLCBjKTtcbiAgICAgICAgICAgIGIgPSBjO1xuICAgICAgICAgICAgYm91bmQoYyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBjeCA9ICh4TWluICsgeE1heCkgLyAyLCBjeSA9ICh5TWluICsgeU1heCkgLyAyLCBjciA9IDA7XG4gICAgZm9yIChpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgYyA9IG5vZGVzW2ldO1xuICAgICAgYy54IC09IGN4O1xuICAgICAgYy55IC09IGN5O1xuICAgICAgY3IgPSBNYXRoLm1heChjciwgYy5yICsgTWF0aC5zcXJ0KGMueCAqIGMueCArIGMueSAqIGMueSkpO1xuICAgIH1cbiAgICBub2RlLnIgPSBjcjtcbiAgICBub2Rlcy5mb3JFYWNoKGQzX2xheW91dF9wYWNrVW5saW5rKTtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfcGFja0xpbmsobm9kZSkge1xuICAgIG5vZGUuX3BhY2tfbmV4dCA9IG5vZGUuX3BhY2tfcHJldiA9IG5vZGU7XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X3BhY2tVbmxpbmsobm9kZSkge1xuICAgIGRlbGV0ZSBub2RlLl9wYWNrX25leHQ7XG4gICAgZGVsZXRlIG5vZGUuX3BhY2tfcHJldjtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfcGFja1RyYW5zZm9ybShub2RlLCB4LCB5LCBrKSB7XG4gICAgdmFyIGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbjtcbiAgICBub2RlLnggPSB4ICs9IGsgKiBub2RlLng7XG4gICAgbm9kZS55ID0geSArPSBrICogbm9kZS55O1xuICAgIG5vZGUuciAqPSBrO1xuICAgIGlmIChjaGlsZHJlbikge1xuICAgICAgdmFyIGkgPSAtMSwgbiA9IGNoaWxkcmVuLmxlbmd0aDtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSBkM19sYXlvdXRfcGFja1RyYW5zZm9ybShjaGlsZHJlbltpXSwgeCwgeSwgayk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF9wYWNrUGxhY2UoYSwgYiwgYykge1xuICAgIHZhciBkYiA9IGEuciArIGMuciwgZHggPSBiLnggLSBhLngsIGR5ID0gYi55IC0gYS55O1xuICAgIGlmIChkYiAmJiAoZHggfHwgZHkpKSB7XG4gICAgICB2YXIgZGEgPSBiLnIgKyBjLnIsIGRjID0gZHggKiBkeCArIGR5ICogZHk7XG4gICAgICBkYSAqPSBkYTtcbiAgICAgIGRiICo9IGRiO1xuICAgICAgdmFyIHggPSAuNSArIChkYiAtIGRhKSAvICgyICogZGMpLCB5ID0gTWF0aC5zcXJ0KE1hdGgubWF4KDAsIDIgKiBkYSAqIChkYiArIGRjKSAtIChkYiAtPSBkYykgKiBkYiAtIGRhICogZGEpKSAvICgyICogZGMpO1xuICAgICAgYy54ID0gYS54ICsgeCAqIGR4ICsgeSAqIGR5O1xuICAgICAgYy55ID0gYS55ICsgeCAqIGR5IC0geSAqIGR4O1xuICAgIH0gZWxzZSB7XG4gICAgICBjLnggPSBhLnggKyBkYjtcbiAgICAgIGMueSA9IGEueTtcbiAgICB9XG4gIH1cbiAgZDMubGF5b3V0LmNsdXN0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaGllcmFyY2h5ID0gZDMubGF5b3V0LmhpZXJhcmNoeSgpLnNvcnQobnVsbCkudmFsdWUobnVsbCksIHNlcGFyYXRpb24gPSBkM19sYXlvdXRfdHJlZVNlcGFyYXRpb24sIHNpemUgPSBbIDEsIDEgXSwgbm9kZVNpemUgPSBmYWxzZTtcbiAgICBmdW5jdGlvbiBjbHVzdGVyKGQsIGkpIHtcbiAgICAgIHZhciBub2RlcyA9IGhpZXJhcmNoeS5jYWxsKHRoaXMsIGQsIGkpLCByb290ID0gbm9kZXNbMF0sIHByZXZpb3VzTm9kZSwgeCA9IDA7XG4gICAgICBkM19sYXlvdXRfdHJlZVZpc2l0QWZ0ZXIocm9vdCwgZnVuY3Rpb24obm9kZSkge1xuICAgICAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xuICAgICAgICBpZiAoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgbm9kZS54ID0gZDNfbGF5b3V0X2NsdXN0ZXJYKGNoaWxkcmVuKTtcbiAgICAgICAgICBub2RlLnkgPSBkM19sYXlvdXRfY2x1c3RlclkoY2hpbGRyZW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vZGUueCA9IHByZXZpb3VzTm9kZSA/IHggKz0gc2VwYXJhdGlvbihub2RlLCBwcmV2aW91c05vZGUpIDogMDtcbiAgICAgICAgICBub2RlLnkgPSAwO1xuICAgICAgICAgIHByZXZpb3VzTm9kZSA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdmFyIGxlZnQgPSBkM19sYXlvdXRfY2x1c3RlckxlZnQocm9vdCksIHJpZ2h0ID0gZDNfbGF5b3V0X2NsdXN0ZXJSaWdodChyb290KSwgeDAgPSBsZWZ0LnggLSBzZXBhcmF0aW9uKGxlZnQsIHJpZ2h0KSAvIDIsIHgxID0gcmlnaHQueCArIHNlcGFyYXRpb24ocmlnaHQsIGxlZnQpIC8gMjtcbiAgICAgIGQzX2xheW91dF90cmVlVmlzaXRBZnRlcihyb290LCBub2RlU2l6ZSA/IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgbm9kZS54ID0gKG5vZGUueCAtIHJvb3QueCkgKiBzaXplWzBdO1xuICAgICAgICBub2RlLnkgPSAocm9vdC55IC0gbm9kZS55KSAqIHNpemVbMV07XG4gICAgICB9IDogZnVuY3Rpb24obm9kZSkge1xuICAgICAgICBub2RlLnggPSAobm9kZS54IC0geDApIC8gKHgxIC0geDApICogc2l6ZVswXTtcbiAgICAgICAgbm9kZS55ID0gKDEgLSAocm9vdC55ID8gbm9kZS55IC8gcm9vdC55IDogMSkpICogc2l6ZVsxXTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH1cbiAgICBjbHVzdGVyLnNlcGFyYXRpb24gPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzZXBhcmF0aW9uO1xuICAgICAgc2VwYXJhdGlvbiA9IHg7XG4gICAgICByZXR1cm4gY2x1c3RlcjtcbiAgICB9O1xuICAgIGNsdXN0ZXIuc2l6ZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG5vZGVTaXplID8gbnVsbCA6IHNpemU7XG4gICAgICBub2RlU2l6ZSA9IChzaXplID0geCkgPT0gbnVsbDtcbiAgICAgIHJldHVybiBjbHVzdGVyO1xuICAgIH07XG4gICAgY2x1c3Rlci5ub2RlU2l6ZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG5vZGVTaXplID8gc2l6ZSA6IG51bGw7XG4gICAgICBub2RlU2l6ZSA9IChzaXplID0geCkgIT0gbnVsbDtcbiAgICAgIHJldHVybiBjbHVzdGVyO1xuICAgIH07XG4gICAgcmV0dXJuIGQzX2xheW91dF9oaWVyYXJjaHlSZWJpbmQoY2x1c3RlciwgaGllcmFyY2h5KTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfbGF5b3V0X2NsdXN0ZXJZKGNoaWxkcmVuKSB7XG4gICAgcmV0dXJuIDEgKyBkMy5tYXgoY2hpbGRyZW4sIGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICByZXR1cm4gY2hpbGQueTtcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfY2x1c3RlclgoY2hpbGRyZW4pIHtcbiAgICByZXR1cm4gY2hpbGRyZW4ucmVkdWNlKGZ1bmN0aW9uKHgsIGNoaWxkKSB7XG4gICAgICByZXR1cm4geCArIGNoaWxkLng7XG4gICAgfSwgMCkgLyBjaGlsZHJlbi5sZW5ndGg7XG4gIH1cbiAgZnVuY3Rpb24gZDNfbGF5b3V0X2NsdXN0ZXJMZWZ0KG5vZGUpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xuICAgIHJldHVybiBjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPyBkM19sYXlvdXRfY2x1c3RlckxlZnQoY2hpbGRyZW5bMF0pIDogbm9kZTtcbiAgfVxuICBmdW5jdGlvbiBkM19sYXlvdXRfY2x1c3RlclJpZ2h0KG5vZGUpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuLCBuO1xuICAgIHJldHVybiBjaGlsZHJlbiAmJiAobiA9IGNoaWxkcmVuLmxlbmd0aCkgPyBkM19sYXlvdXRfY2x1c3RlclJpZ2h0KGNoaWxkcmVuW24gLSAxXSkgOiBub2RlO1xuICB9XG4gIGQzLmxheW91dC50cmVlbWFwID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGhpZXJhcmNoeSA9IGQzLmxheW91dC5oaWVyYXJjaHkoKSwgcm91bmQgPSBNYXRoLnJvdW5kLCBzaXplID0gWyAxLCAxIF0sIHBhZGRpbmcgPSBudWxsLCBwYWQgPSBkM19sYXlvdXRfdHJlZW1hcFBhZE51bGwsIHN0aWNreSA9IGZhbHNlLCBzdGlja2llcywgbW9kZSA9IFwic3F1YXJpZnlcIiwgcmF0aW8gPSAuNSAqICgxICsgTWF0aC5zcXJ0KDUpKTtcbiAgICBmdW5jdGlvbiBzY2FsZShjaGlsZHJlbiwgaykge1xuICAgICAgdmFyIGkgPSAtMSwgbiA9IGNoaWxkcmVuLmxlbmd0aCwgY2hpbGQsIGFyZWE7XG4gICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICBhcmVhID0gKGNoaWxkID0gY2hpbGRyZW5baV0pLnZhbHVlICogKGsgPCAwID8gMCA6IGspO1xuICAgICAgICBjaGlsZC5hcmVhID0gaXNOYU4oYXJlYSkgfHwgYXJlYSA8PSAwID8gMCA6IGFyZWE7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNxdWFyaWZ5KG5vZGUpIHtcbiAgICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XG4gICAgICBpZiAoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgIHZhciByZWN0ID0gcGFkKG5vZGUpLCByb3cgPSBbXSwgcmVtYWluaW5nID0gY2hpbGRyZW4uc2xpY2UoKSwgY2hpbGQsIGJlc3QgPSBJbmZpbml0eSwgc2NvcmUsIHUgPSBtb2RlID09PSBcInNsaWNlXCIgPyByZWN0LmR4IDogbW9kZSA9PT0gXCJkaWNlXCIgPyByZWN0LmR5IDogbW9kZSA9PT0gXCJzbGljZS1kaWNlXCIgPyBub2RlLmRlcHRoICYgMSA/IHJlY3QuZHkgOiByZWN0LmR4IDogTWF0aC5taW4ocmVjdC5keCwgcmVjdC5keSksIG47XG4gICAgICAgIHNjYWxlKHJlbWFpbmluZywgcmVjdC5keCAqIHJlY3QuZHkgLyBub2RlLnZhbHVlKTtcbiAgICAgICAgcm93LmFyZWEgPSAwO1xuICAgICAgICB3aGlsZSAoKG4gPSByZW1haW5pbmcubGVuZ3RoKSA+IDApIHtcbiAgICAgICAgICByb3cucHVzaChjaGlsZCA9IHJlbWFpbmluZ1tuIC0gMV0pO1xuICAgICAgICAgIHJvdy5hcmVhICs9IGNoaWxkLmFyZWE7XG4gICAgICAgICAgaWYgKG1vZGUgIT09IFwic3F1YXJpZnlcIiB8fCAoc2NvcmUgPSB3b3JzdChyb3csIHUpKSA8PSBiZXN0KSB7XG4gICAgICAgICAgICByZW1haW5pbmcucG9wKCk7XG4gICAgICAgICAgICBiZXN0ID0gc2NvcmU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJvdy5hcmVhIC09IHJvdy5wb3AoKS5hcmVhO1xuICAgICAgICAgICAgcG9zaXRpb24ocm93LCB1LCByZWN0LCBmYWxzZSk7XG4gICAgICAgICAgICB1ID0gTWF0aC5taW4ocmVjdC5keCwgcmVjdC5keSk7XG4gICAgICAgICAgICByb3cubGVuZ3RoID0gcm93LmFyZWEgPSAwO1xuICAgICAgICAgICAgYmVzdCA9IEluZmluaXR5O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocm93Lmxlbmd0aCkge1xuICAgICAgICAgIHBvc2l0aW9uKHJvdywgdSwgcmVjdCwgdHJ1ZSk7XG4gICAgICAgICAgcm93Lmxlbmd0aCA9IHJvdy5hcmVhID0gMDtcbiAgICAgICAgfVxuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKHNxdWFyaWZ5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc3RpY2tpZnkobm9kZSkge1xuICAgICAgdmFyIGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbjtcbiAgICAgIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgdmFyIHJlY3QgPSBwYWQobm9kZSksIHJlbWFpbmluZyA9IGNoaWxkcmVuLnNsaWNlKCksIGNoaWxkLCByb3cgPSBbXTtcbiAgICAgICAgc2NhbGUocmVtYWluaW5nLCByZWN0LmR4ICogcmVjdC5keSAvIG5vZGUudmFsdWUpO1xuICAgICAgICByb3cuYXJlYSA9IDA7XG4gICAgICAgIHdoaWxlIChjaGlsZCA9IHJlbWFpbmluZy5wb3AoKSkge1xuICAgICAgICAgIHJvdy5wdXNoKGNoaWxkKTtcbiAgICAgICAgICByb3cuYXJlYSArPSBjaGlsZC5hcmVhO1xuICAgICAgICAgIGlmIChjaGlsZC56ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uKHJvdywgY2hpbGQueiA/IHJlY3QuZHggOiByZWN0LmR5LCByZWN0LCAhcmVtYWluaW5nLmxlbmd0aCk7XG4gICAgICAgICAgICByb3cubGVuZ3RoID0gcm93LmFyZWEgPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKHN0aWNraWZ5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gd29yc3Qocm93LCB1KSB7XG4gICAgICB2YXIgcyA9IHJvdy5hcmVhLCByLCBybWF4ID0gMCwgcm1pbiA9IEluZmluaXR5LCBpID0gLTEsIG4gPSByb3cubGVuZ3RoO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgaWYgKCEociA9IHJvd1tpXS5hcmVhKSkgY29udGludWU7XG4gICAgICAgIGlmIChyIDwgcm1pbikgcm1pbiA9IHI7XG4gICAgICAgIGlmIChyID4gcm1heCkgcm1heCA9IHI7XG4gICAgICB9XG4gICAgICBzICo9IHM7XG4gICAgICB1ICo9IHU7XG4gICAgICByZXR1cm4gcyA/IE1hdGgubWF4KHUgKiBybWF4ICogcmF0aW8gLyBzLCBzIC8gKHUgKiBybWluICogcmF0aW8pKSA6IEluZmluaXR5O1xuICAgIH1cbiAgICBmdW5jdGlvbiBwb3NpdGlvbihyb3csIHUsIHJlY3QsIGZsdXNoKSB7XG4gICAgICB2YXIgaSA9IC0xLCBuID0gcm93Lmxlbmd0aCwgeCA9IHJlY3QueCwgeSA9IHJlY3QueSwgdiA9IHUgPyByb3VuZChyb3cuYXJlYSAvIHUpIDogMCwgbztcbiAgICAgIGlmICh1ID09IHJlY3QuZHgpIHtcbiAgICAgICAgaWYgKGZsdXNoIHx8IHYgPiByZWN0LmR5KSB2ID0gcmVjdC5keTtcbiAgICAgICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgICAgICBvID0gcm93W2ldO1xuICAgICAgICAgIG8ueCA9IHg7XG4gICAgICAgICAgby55ID0geTtcbiAgICAgICAgICBvLmR5ID0gdjtcbiAgICAgICAgICB4ICs9IG8uZHggPSBNYXRoLm1pbihyZWN0LnggKyByZWN0LmR4IC0geCwgdiA/IHJvdW5kKG8uYXJlYSAvIHYpIDogMCk7XG4gICAgICAgIH1cbiAgICAgICAgby56ID0gdHJ1ZTtcbiAgICAgICAgby5keCArPSByZWN0LnggKyByZWN0LmR4IC0geDtcbiAgICAgICAgcmVjdC55ICs9IHY7XG4gICAgICAgIHJlY3QuZHkgLT0gdjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmbHVzaCB8fCB2ID4gcmVjdC5keCkgdiA9IHJlY3QuZHg7XG4gICAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgICAgbyA9IHJvd1tpXTtcbiAgICAgICAgICBvLnggPSB4O1xuICAgICAgICAgIG8ueSA9IHk7XG4gICAgICAgICAgby5keCA9IHY7XG4gICAgICAgICAgeSArPSBvLmR5ID0gTWF0aC5taW4ocmVjdC55ICsgcmVjdC5keSAtIHksIHYgPyByb3VuZChvLmFyZWEgLyB2KSA6IDApO1xuICAgICAgICB9XG4gICAgICAgIG8ueiA9IGZhbHNlO1xuICAgICAgICBvLmR5ICs9IHJlY3QueSArIHJlY3QuZHkgLSB5O1xuICAgICAgICByZWN0LnggKz0gdjtcbiAgICAgICAgcmVjdC5keCAtPSB2O1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB0cmVlbWFwKGQpIHtcbiAgICAgIHZhciBub2RlcyA9IHN0aWNraWVzIHx8IGhpZXJhcmNoeShkKSwgcm9vdCA9IG5vZGVzWzBdO1xuICAgICAgcm9vdC54ID0gMDtcbiAgICAgIHJvb3QueSA9IDA7XG4gICAgICByb290LmR4ID0gc2l6ZVswXTtcbiAgICAgIHJvb3QuZHkgPSBzaXplWzFdO1xuICAgICAgaWYgKHN0aWNraWVzKSBoaWVyYXJjaHkucmV2YWx1ZShyb290KTtcbiAgICAgIHNjYWxlKFsgcm9vdCBdLCByb290LmR4ICogcm9vdC5keSAvIHJvb3QudmFsdWUpO1xuICAgICAgKHN0aWNraWVzID8gc3RpY2tpZnkgOiBzcXVhcmlmeSkocm9vdCk7XG4gICAgICBpZiAoc3RpY2t5KSBzdGlja2llcyA9IG5vZGVzO1xuICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH1cbiAgICB0cmVlbWFwLnNpemUgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzaXplO1xuICAgICAgc2l6ZSA9IHg7XG4gICAgICByZXR1cm4gdHJlZW1hcDtcbiAgICB9O1xuICAgIHRyZWVtYXAucGFkZGluZyA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHBhZGRpbmc7XG4gICAgICBmdW5jdGlvbiBwYWRGdW5jdGlvbihub2RlKSB7XG4gICAgICAgIHZhciBwID0geC5jYWxsKHRyZWVtYXAsIG5vZGUsIG5vZGUuZGVwdGgpO1xuICAgICAgICByZXR1cm4gcCA9PSBudWxsID8gZDNfbGF5b3V0X3RyZWVtYXBQYWROdWxsKG5vZGUpIDogZDNfbGF5b3V0X3RyZWVtYXBQYWQobm9kZSwgdHlwZW9mIHAgPT09IFwibnVtYmVyXCIgPyBbIHAsIHAsIHAsIHAgXSA6IHApO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gcGFkQ29uc3RhbnQobm9kZSkge1xuICAgICAgICByZXR1cm4gZDNfbGF5b3V0X3RyZWVtYXBQYWQobm9kZSwgeCk7XG4gICAgICB9XG4gICAgICB2YXIgdHlwZTtcbiAgICAgIHBhZCA9IChwYWRkaW5nID0geCkgPT0gbnVsbCA/IGQzX2xheW91dF90cmVlbWFwUGFkTnVsbCA6ICh0eXBlID0gdHlwZW9mIHgpID09PSBcImZ1bmN0aW9uXCIgPyBwYWRGdW5jdGlvbiA6IHR5cGUgPT09IFwibnVtYmVyXCIgPyAoeCA9IFsgeCwgeCwgeCwgeCBdLCBcbiAgICAgIHBhZENvbnN0YW50KSA6IHBhZENvbnN0YW50O1xuICAgICAgcmV0dXJuIHRyZWVtYXA7XG4gICAgfTtcbiAgICB0cmVlbWFwLnJvdW5kID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gcm91bmQgIT0gTnVtYmVyO1xuICAgICAgcm91bmQgPSB4ID8gTWF0aC5yb3VuZCA6IE51bWJlcjtcbiAgICAgIHJldHVybiB0cmVlbWFwO1xuICAgIH07XG4gICAgdHJlZW1hcC5zdGlja3kgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzdGlja3k7XG4gICAgICBzdGlja3kgPSB4O1xuICAgICAgc3RpY2tpZXMgPSBudWxsO1xuICAgICAgcmV0dXJuIHRyZWVtYXA7XG4gICAgfTtcbiAgICB0cmVlbWFwLnJhdGlvID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gcmF0aW87XG4gICAgICByYXRpbyA9IHg7XG4gICAgICByZXR1cm4gdHJlZW1hcDtcbiAgICB9O1xuICAgIHRyZWVtYXAubW9kZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG1vZGU7XG4gICAgICBtb2RlID0geCArIFwiXCI7XG4gICAgICByZXR1cm4gdHJlZW1hcDtcbiAgICB9O1xuICAgIHJldHVybiBkM19sYXlvdXRfaGllcmFyY2h5UmViaW5kKHRyZWVtYXAsIGhpZXJhcmNoeSk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2xheW91dF90cmVlbWFwUGFkTnVsbChub2RlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IG5vZGUueCxcbiAgICAgIHk6IG5vZGUueSxcbiAgICAgIGR4OiBub2RlLmR4LFxuICAgICAgZHk6IG5vZGUuZHlcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2xheW91dF90cmVlbWFwUGFkKG5vZGUsIHBhZGRpbmcpIHtcbiAgICB2YXIgeCA9IG5vZGUueCArIHBhZGRpbmdbM10sIHkgPSBub2RlLnkgKyBwYWRkaW5nWzBdLCBkeCA9IG5vZGUuZHggLSBwYWRkaW5nWzFdIC0gcGFkZGluZ1szXSwgZHkgPSBub2RlLmR5IC0gcGFkZGluZ1swXSAtIHBhZGRpbmdbMl07XG4gICAgaWYgKGR4IDwgMCkge1xuICAgICAgeCArPSBkeCAvIDI7XG4gICAgICBkeCA9IDA7XG4gICAgfVxuICAgIGlmIChkeSA8IDApIHtcbiAgICAgIHkgKz0gZHkgLyAyO1xuICAgICAgZHkgPSAwO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgeDogeCxcbiAgICAgIHk6IHksXG4gICAgICBkeDogZHgsXG4gICAgICBkeTogZHlcbiAgICB9O1xuICB9XG4gIGQzLnJhbmRvbSA9IHtcbiAgICBub3JtYWw6IGZ1bmN0aW9uKMK1LCDPgykge1xuICAgICAgdmFyIG4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgaWYgKG4gPCAyKSDPgyA9IDE7XG4gICAgICBpZiAobiA8IDEpIMK1ID0gMDtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHgsIHksIHI7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICB4ID0gTWF0aC5yYW5kb20oKSAqIDIgLSAxO1xuICAgICAgICAgIHkgPSBNYXRoLnJhbmRvbSgpICogMiAtIDE7XG4gICAgICAgICAgciA9IHggKiB4ICsgeSAqIHk7XG4gICAgICAgIH0gd2hpbGUgKCFyIHx8IHIgPiAxKTtcbiAgICAgICAgcmV0dXJuIMK1ICsgz4MgKiB4ICogTWF0aC5zcXJ0KC0yICogTWF0aC5sb2cocikgLyByKTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBsb2dOb3JtYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJhbmRvbSA9IGQzLnJhbmRvbS5ub3JtYWwuYXBwbHkoZDMsIGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmV4cChyYW5kb20oKSk7XG4gICAgICB9O1xuICAgIH0sXG4gICAgaXJ3aW5IYWxsOiBmdW5jdGlvbihtKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIHMgPSAwLCBqID0gMDsgaiA8IG07IGorKykgcyArPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICByZXR1cm4gcyAvIG07XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgZDMuc2NhbGUgPSB7fTtcbiAgZnVuY3Rpb24gZDNfc2NhbGVFeHRlbnQoZG9tYWluKSB7XG4gICAgdmFyIHN0YXJ0ID0gZG9tYWluWzBdLCBzdG9wID0gZG9tYWluW2RvbWFpbi5sZW5ndGggLSAxXTtcbiAgICByZXR1cm4gc3RhcnQgPCBzdG9wID8gWyBzdGFydCwgc3RvcCBdIDogWyBzdG9wLCBzdGFydCBdO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3NjYWxlUmFuZ2Uoc2NhbGUpIHtcbiAgICByZXR1cm4gc2NhbGUucmFuZ2VFeHRlbnQgPyBzY2FsZS5yYW5nZUV4dGVudCgpIDogZDNfc2NhbGVFeHRlbnQoc2NhbGUucmFuZ2UoKSk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc2NhbGVfYmlsaW5lYXIoZG9tYWluLCByYW5nZSwgdW5pbnRlcnBvbGF0ZSwgaW50ZXJwb2xhdGUpIHtcbiAgICB2YXIgdSA9IHVuaW50ZXJwb2xhdGUoZG9tYWluWzBdLCBkb21haW5bMV0pLCBpID0gaW50ZXJwb2xhdGUocmFuZ2VbMF0sIHJhbmdlWzFdKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIGkodSh4KSk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBkM19zY2FsZV9uaWNlKGRvbWFpbiwgbmljZSkge1xuICAgIHZhciBpMCA9IDAsIGkxID0gZG9tYWluLmxlbmd0aCAtIDEsIHgwID0gZG9tYWluW2kwXSwgeDEgPSBkb21haW5baTFdLCBkeDtcbiAgICBpZiAoeDEgPCB4MCkge1xuICAgICAgZHggPSBpMCwgaTAgPSBpMSwgaTEgPSBkeDtcbiAgICAgIGR4ID0geDAsIHgwID0geDEsIHgxID0gZHg7XG4gICAgfVxuICAgIGRvbWFpbltpMF0gPSBuaWNlLmZsb29yKHgwKTtcbiAgICBkb21haW5baTFdID0gbmljZS5jZWlsKHgxKTtcbiAgICByZXR1cm4gZG9tYWluO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3NjYWxlX25pY2VTdGVwKHN0ZXApIHtcbiAgICByZXR1cm4gc3RlcCA/IHtcbiAgICAgIGZsb29yOiBmdW5jdGlvbih4KSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHggLyBzdGVwKSAqIHN0ZXA7XG4gICAgICB9LFxuICAgICAgY2VpbDogZnVuY3Rpb24oeCkge1xuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKHggLyBzdGVwKSAqIHN0ZXA7XG4gICAgICB9XG4gICAgfSA6IGQzX3NjYWxlX25pY2VJZGVudGl0eTtcbiAgfVxuICB2YXIgZDNfc2NhbGVfbmljZUlkZW50aXR5ID0ge1xuICAgIGZsb29yOiBkM19pZGVudGl0eSxcbiAgICBjZWlsOiBkM19pZGVudGl0eVxuICB9O1xuICBmdW5jdGlvbiBkM19zY2FsZV9wb2x5bGluZWFyKGRvbWFpbiwgcmFuZ2UsIHVuaW50ZXJwb2xhdGUsIGludGVycG9sYXRlKSB7XG4gICAgdmFyIHUgPSBbXSwgaSA9IFtdLCBqID0gMCwgayA9IE1hdGgubWluKGRvbWFpbi5sZW5ndGgsIHJhbmdlLmxlbmd0aCkgLSAxO1xuICAgIGlmIChkb21haW5ba10gPCBkb21haW5bMF0pIHtcbiAgICAgIGRvbWFpbiA9IGRvbWFpbi5zbGljZSgpLnJldmVyc2UoKTtcbiAgICAgIHJhbmdlID0gcmFuZ2Uuc2xpY2UoKS5yZXZlcnNlKCk7XG4gICAgfVxuICAgIHdoaWxlICgrK2ogPD0gaykge1xuICAgICAgdS5wdXNoKHVuaW50ZXJwb2xhdGUoZG9tYWluW2ogLSAxXSwgZG9tYWluW2pdKSk7XG4gICAgICBpLnB1c2goaW50ZXJwb2xhdGUocmFuZ2VbaiAtIDFdLCByYW5nZVtqXSkpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24oeCkge1xuICAgICAgdmFyIGogPSBkMy5iaXNlY3QoZG9tYWluLCB4LCAxLCBrKSAtIDE7XG4gICAgICByZXR1cm4gaVtqXSh1W2pdKHgpKTtcbiAgICB9O1xuICB9XG4gIGQzLnNjYWxlLmxpbmVhciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkM19zY2FsZV9saW5lYXIoWyAwLCAxIF0sIFsgMCwgMSBdLCBkM19pbnRlcnBvbGF0ZSwgZmFsc2UpO1xuICB9O1xuICBmdW5jdGlvbiBkM19zY2FsZV9saW5lYXIoZG9tYWluLCByYW5nZSwgaW50ZXJwb2xhdGUsIGNsYW1wKSB7XG4gICAgdmFyIG91dHB1dCwgaW5wdXQ7XG4gICAgZnVuY3Rpb24gcmVzY2FsZSgpIHtcbiAgICAgIHZhciBsaW5lYXIgPSBNYXRoLm1pbihkb21haW4ubGVuZ3RoLCByYW5nZS5sZW5ndGgpID4gMiA/IGQzX3NjYWxlX3BvbHlsaW5lYXIgOiBkM19zY2FsZV9iaWxpbmVhciwgdW5pbnRlcnBvbGF0ZSA9IGNsYW1wID8gZDNfdW5pbnRlcnBvbGF0ZUNsYW1wIDogZDNfdW5pbnRlcnBvbGF0ZU51bWJlcjtcbiAgICAgIG91dHB1dCA9IGxpbmVhcihkb21haW4sIHJhbmdlLCB1bmludGVycG9sYXRlLCBpbnRlcnBvbGF0ZSk7XG4gICAgICBpbnB1dCA9IGxpbmVhcihyYW5nZSwgZG9tYWluLCB1bmludGVycG9sYXRlLCBkM19pbnRlcnBvbGF0ZSk7XG4gICAgICByZXR1cm4gc2NhbGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNjYWxlKHgpIHtcbiAgICAgIHJldHVybiBvdXRwdXQoeCk7XG4gICAgfVxuICAgIHNjYWxlLmludmVydCA9IGZ1bmN0aW9uKHkpIHtcbiAgICAgIHJldHVybiBpbnB1dCh5KTtcbiAgICB9O1xuICAgIHNjYWxlLmRvbWFpbiA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRvbWFpbjtcbiAgICAgIGRvbWFpbiA9IHgubWFwKE51bWJlcik7XG4gICAgICByZXR1cm4gcmVzY2FsZSgpO1xuICAgIH07XG4gICAgc2NhbGUucmFuZ2UgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiByYW5nZTtcbiAgICAgIHJhbmdlID0geDtcbiAgICAgIHJldHVybiByZXNjYWxlKCk7XG4gICAgfTtcbiAgICBzY2FsZS5yYW5nZVJvdW5kID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHNjYWxlLnJhbmdlKHgpLmludGVycG9sYXRlKGQzX2ludGVycG9sYXRlUm91bmQpO1xuICAgIH07XG4gICAgc2NhbGUuY2xhbXAgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjbGFtcDtcbiAgICAgIGNsYW1wID0geDtcbiAgICAgIHJldHVybiByZXNjYWxlKCk7XG4gICAgfTtcbiAgICBzY2FsZS5pbnRlcnBvbGF0ZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGludGVycG9sYXRlO1xuICAgICAgaW50ZXJwb2xhdGUgPSB4O1xuICAgICAgcmV0dXJuIHJlc2NhbGUoKTtcbiAgICB9O1xuICAgIHNjYWxlLnRpY2tzID0gZnVuY3Rpb24obSkge1xuICAgICAgcmV0dXJuIGQzX3NjYWxlX2xpbmVhclRpY2tzKGRvbWFpbiwgbSk7XG4gICAgfTtcbiAgICBzY2FsZS50aWNrRm9ybWF0ID0gZnVuY3Rpb24obSwgZm9ybWF0KSB7XG4gICAgICByZXR1cm4gZDNfc2NhbGVfbGluZWFyVGlja0Zvcm1hdChkb21haW4sIG0sIGZvcm1hdCk7XG4gICAgfTtcbiAgICBzY2FsZS5uaWNlID0gZnVuY3Rpb24obSkge1xuICAgICAgZDNfc2NhbGVfbGluZWFyTmljZShkb21haW4sIG0pO1xuICAgICAgcmV0dXJuIHJlc2NhbGUoKTtcbiAgICB9O1xuICAgIHNjYWxlLmNvcHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkM19zY2FsZV9saW5lYXIoZG9tYWluLCByYW5nZSwgaW50ZXJwb2xhdGUsIGNsYW1wKTtcbiAgICB9O1xuICAgIHJldHVybiByZXNjYWxlKCk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc2NhbGVfbGluZWFyUmViaW5kKHNjYWxlLCBsaW5lYXIpIHtcbiAgICByZXR1cm4gZDMucmViaW5kKHNjYWxlLCBsaW5lYXIsIFwicmFuZ2VcIiwgXCJyYW5nZVJvdW5kXCIsIFwiaW50ZXJwb2xhdGVcIiwgXCJjbGFtcFwiKTtcbiAgfVxuICBmdW5jdGlvbiBkM19zY2FsZV9saW5lYXJOaWNlKGRvbWFpbiwgbSkge1xuICAgIHJldHVybiBkM19zY2FsZV9uaWNlKGRvbWFpbiwgZDNfc2NhbGVfbmljZVN0ZXAobSA/IGQzX3NjYWxlX2xpbmVhclRpY2tSYW5nZShkb21haW4sIG0pWzJdIDogZDNfc2NhbGVfbGluZWFyTmljZVN0ZXAoZG9tYWluKSkpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3NjYWxlX2xpbmVhck5pY2VTdGVwKGRvbWFpbikge1xuICAgIHZhciBleHRlbnQgPSBkM19zY2FsZUV4dGVudChkb21haW4pLCBzcGFuID0gZXh0ZW50WzFdIC0gZXh0ZW50WzBdO1xuICAgIHJldHVybiBNYXRoLnBvdygxMCwgTWF0aC5yb3VuZChNYXRoLmxvZyhzcGFuKSAvIE1hdGguTE4xMCkgLSAxKTtcbiAgfVxuICBmdW5jdGlvbiBkM19zY2FsZV9saW5lYXJUaWNrUmFuZ2UoZG9tYWluLCBtKSB7XG4gICAgdmFyIGV4dGVudCA9IGQzX3NjYWxlRXh0ZW50KGRvbWFpbiksIHNwYW4gPSBleHRlbnRbMV0gLSBleHRlbnRbMF0sIHN0ZXAgPSBNYXRoLnBvdygxMCwgTWF0aC5mbG9vcihNYXRoLmxvZyhzcGFuIC8gbSkgLyBNYXRoLkxOMTApKSwgZXJyID0gbSAvIHNwYW4gKiBzdGVwO1xuICAgIGlmIChlcnIgPD0gLjE1KSBzdGVwICo9IDEwOyBlbHNlIGlmIChlcnIgPD0gLjM1KSBzdGVwICo9IDU7IGVsc2UgaWYgKGVyciA8PSAuNzUpIHN0ZXAgKj0gMjtcbiAgICBleHRlbnRbMF0gPSBNYXRoLmNlaWwoZXh0ZW50WzBdIC8gc3RlcCkgKiBzdGVwO1xuICAgIGV4dGVudFsxXSA9IE1hdGguZmxvb3IoZXh0ZW50WzFdIC8gc3RlcCkgKiBzdGVwICsgc3RlcCAqIC41O1xuICAgIGV4dGVudFsyXSA9IHN0ZXA7XG4gICAgcmV0dXJuIGV4dGVudDtcbiAgfVxuICBmdW5jdGlvbiBkM19zY2FsZV9saW5lYXJUaWNrcyhkb21haW4sIG0pIHtcbiAgICByZXR1cm4gZDMucmFuZ2UuYXBwbHkoZDMsIGQzX3NjYWxlX2xpbmVhclRpY2tSYW5nZShkb21haW4sIG0pKTtcbiAgfVxuICBmdW5jdGlvbiBkM19zY2FsZV9saW5lYXJUaWNrRm9ybWF0KGRvbWFpbiwgbSwgZm9ybWF0KSB7XG4gICAgdmFyIHByZWNpc2lvbiA9IC1NYXRoLmZsb29yKE1hdGgubG9nKGQzX3NjYWxlX2xpbmVhclRpY2tSYW5nZShkb21haW4sIG0pWzJdKSAvIE1hdGguTE4xMCArIC4wMSk7XG4gICAgcmV0dXJuIGQzLmZvcm1hdChmb3JtYXQgPyBmb3JtYXQucmVwbGFjZShkM19mb3JtYXRfcmUsIGZ1bmN0aW9uKGEsIGIsIGMsIGQsIGUsIGYsIGcsIGgsIGksIGopIHtcbiAgICAgIHJldHVybiBbIGIsIGMsIGQsIGUsIGYsIGcsIGgsIGkgfHwgXCIuXCIgKyAocHJlY2lzaW9uIC0gKGogPT09IFwiJVwiKSAqIDIpLCBqIF0uam9pbihcIlwiKTtcbiAgICB9KSA6IFwiLC5cIiArIHByZWNpc2lvbiArIFwiZlwiKTtcbiAgfVxuICBkMy5zY2FsZS5sb2cgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfc2NhbGVfbG9nKGQzLnNjYWxlLmxpbmVhcigpLmRvbWFpbihbIDAsIDEgXSksIDEwLCB0cnVlLCBbIDEsIDEwIF0pO1xuICB9O1xuICBmdW5jdGlvbiBkM19zY2FsZV9sb2cobGluZWFyLCBiYXNlLCBwb3NpdGl2ZSwgZG9tYWluKSB7XG4gICAgZnVuY3Rpb24gbG9nKHgpIHtcbiAgICAgIHJldHVybiAocG9zaXRpdmUgPyBNYXRoLmxvZyh4IDwgMCA/IDAgOiB4KSA6IC1NYXRoLmxvZyh4ID4gMCA/IDAgOiAteCkpIC8gTWF0aC5sb2coYmFzZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBvdyh4KSB7XG4gICAgICByZXR1cm4gcG9zaXRpdmUgPyBNYXRoLnBvdyhiYXNlLCB4KSA6IC1NYXRoLnBvdyhiYXNlLCAteCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNjYWxlKHgpIHtcbiAgICAgIHJldHVybiBsaW5lYXIobG9nKHgpKTtcbiAgICB9XG4gICAgc2NhbGUuaW52ZXJ0ID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHBvdyhsaW5lYXIuaW52ZXJ0KHgpKTtcbiAgICB9O1xuICAgIHNjYWxlLmRvbWFpbiA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRvbWFpbjtcbiAgICAgIHBvc2l0aXZlID0geFswXSA+PSAwO1xuICAgICAgbGluZWFyLmRvbWFpbigoZG9tYWluID0geC5tYXAoTnVtYmVyKSkubWFwKGxvZykpO1xuICAgICAgcmV0dXJuIHNjYWxlO1xuICAgIH07XG4gICAgc2NhbGUuYmFzZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGJhc2U7XG4gICAgICBiYXNlID0gK187XG4gICAgICBsaW5lYXIuZG9tYWluKGRvbWFpbi5tYXAobG9nKSk7XG4gICAgICByZXR1cm4gc2NhbGU7XG4gICAgfTtcbiAgICBzY2FsZS5uaWNlID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbmljZWQgPSBkM19zY2FsZV9uaWNlKGRvbWFpbi5tYXAobG9nKSwgcG9zaXRpdmUgPyBNYXRoIDogZDNfc2NhbGVfbG9nTmljZU5lZ2F0aXZlKTtcbiAgICAgIGxpbmVhci5kb21haW4obmljZWQpO1xuICAgICAgZG9tYWluID0gbmljZWQubWFwKHBvdyk7XG4gICAgICByZXR1cm4gc2NhbGU7XG4gICAgfTtcbiAgICBzY2FsZS50aWNrcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGV4dGVudCA9IGQzX3NjYWxlRXh0ZW50KGRvbWFpbiksIHRpY2tzID0gW107XG4gICAgICBpZiAoZXh0ZW50LmV2ZXJ5KGlzRmluaXRlKSkge1xuICAgICAgICB2YXIgdSA9IGV4dGVudFswXSwgdiA9IGV4dGVudFsxXSwgaSA9IE1hdGguZmxvb3IobG9nKHUpKSwgaiA9IE1hdGguY2VpbChsb2codikpLCBuID0gYmFzZSAlIDEgPyAyIDogYmFzZTtcbiAgICAgICAgaWYgKHBvc2l0aXZlKSB7XG4gICAgICAgICAgZm9yICg7aSA8IGo7IGkrKykgZm9yICh2YXIgayA9IDE7IGsgPCBuOyBrKyspIHRpY2tzLnB1c2gocG93KGkpICogayk7XG4gICAgICAgICAgdGlja3MucHVzaChwb3coaSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRpY2tzLnB1c2gocG93KGkpKTtcbiAgICAgICAgICBmb3IgKDtpKysgPCBqOyApIGZvciAodmFyIGsgPSBuIC0gMTsgayA+IDA7IGstLSkgdGlja3MucHVzaChwb3coaSkgKiBrKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyB0aWNrc1tpXSA8IHU7IGkrKykge31cbiAgICAgICAgZm9yIChqID0gdGlja3MubGVuZ3RoOyB0aWNrc1tqIC0gMV0gPiB2OyBqLS0pIHt9XG4gICAgICAgIHRpY2tzID0gdGlja3Muc2xpY2UoaSwgaik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGlja3M7XG4gICAgfTtcbiAgICBzY2FsZS50aWNrRm9ybWF0ID0gZnVuY3Rpb24obiwgZm9ybWF0KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkM19zY2FsZV9sb2dGb3JtYXQ7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIGZvcm1hdCA9IGQzX3NjYWxlX2xvZ0Zvcm1hdDsgZWxzZSBpZiAodHlwZW9mIGZvcm1hdCAhPT0gXCJmdW5jdGlvblwiKSBmb3JtYXQgPSBkMy5mb3JtYXQoZm9ybWF0KTtcbiAgICAgIHZhciBrID0gTWF0aC5tYXgoLjEsIG4gLyBzY2FsZS50aWNrcygpLmxlbmd0aCksIGYgPSBwb3NpdGl2ZSA/IChlID0gMWUtMTIsIE1hdGguY2VpbCkgOiAoZSA9IC0xZS0xMiwgXG4gICAgICBNYXRoLmZsb29yKSwgZTtcbiAgICAgIHJldHVybiBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkIC8gcG93KGYobG9nKGQpICsgZSkpIDw9IGsgPyBmb3JtYXQoZCkgOiBcIlwiO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHNjYWxlLmNvcHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkM19zY2FsZV9sb2cobGluZWFyLmNvcHkoKSwgYmFzZSwgcG9zaXRpdmUsIGRvbWFpbik7XG4gICAgfTtcbiAgICByZXR1cm4gZDNfc2NhbGVfbGluZWFyUmViaW5kKHNjYWxlLCBsaW5lYXIpO1xuICB9XG4gIHZhciBkM19zY2FsZV9sb2dGb3JtYXQgPSBkMy5mb3JtYXQoXCIuMGVcIiksIGQzX3NjYWxlX2xvZ05pY2VOZWdhdGl2ZSA9IHtcbiAgICBmbG9vcjogZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIC1NYXRoLmNlaWwoLXgpO1xuICAgIH0sXG4gICAgY2VpbDogZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIC1NYXRoLmZsb29yKC14KTtcbiAgICB9XG4gIH07XG4gIGQzLnNjYWxlLnBvdyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkM19zY2FsZV9wb3coZDMuc2NhbGUubGluZWFyKCksIDEsIFsgMCwgMSBdKTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfc2NhbGVfcG93KGxpbmVhciwgZXhwb25lbnQsIGRvbWFpbikge1xuICAgIHZhciBwb3dwID0gZDNfc2NhbGVfcG93UG93KGV4cG9uZW50KSwgcG93YiA9IGQzX3NjYWxlX3Bvd1BvdygxIC8gZXhwb25lbnQpO1xuICAgIGZ1bmN0aW9uIHNjYWxlKHgpIHtcbiAgICAgIHJldHVybiBsaW5lYXIocG93cCh4KSk7XG4gICAgfVxuICAgIHNjYWxlLmludmVydCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiBwb3diKGxpbmVhci5pbnZlcnQoeCkpO1xuICAgIH07XG4gICAgc2NhbGUuZG9tYWluID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZG9tYWluO1xuICAgICAgbGluZWFyLmRvbWFpbigoZG9tYWluID0geC5tYXAoTnVtYmVyKSkubWFwKHBvd3ApKTtcbiAgICAgIHJldHVybiBzY2FsZTtcbiAgICB9O1xuICAgIHNjYWxlLnRpY2tzID0gZnVuY3Rpb24obSkge1xuICAgICAgcmV0dXJuIGQzX3NjYWxlX2xpbmVhclRpY2tzKGRvbWFpbiwgbSk7XG4gICAgfTtcbiAgICBzY2FsZS50aWNrRm9ybWF0ID0gZnVuY3Rpb24obSwgZm9ybWF0KSB7XG4gICAgICByZXR1cm4gZDNfc2NhbGVfbGluZWFyVGlja0Zvcm1hdChkb21haW4sIG0sIGZvcm1hdCk7XG4gICAgfTtcbiAgICBzY2FsZS5uaWNlID0gZnVuY3Rpb24obSkge1xuICAgICAgcmV0dXJuIHNjYWxlLmRvbWFpbihkM19zY2FsZV9saW5lYXJOaWNlKGRvbWFpbiwgbSkpO1xuICAgIH07XG4gICAgc2NhbGUuZXhwb25lbnQgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBleHBvbmVudDtcbiAgICAgIHBvd3AgPSBkM19zY2FsZV9wb3dQb3coZXhwb25lbnQgPSB4KTtcbiAgICAgIHBvd2IgPSBkM19zY2FsZV9wb3dQb3coMSAvIGV4cG9uZW50KTtcbiAgICAgIGxpbmVhci5kb21haW4oZG9tYWluLm1hcChwb3dwKSk7XG4gICAgICByZXR1cm4gc2NhbGU7XG4gICAgfTtcbiAgICBzY2FsZS5jb3B5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZDNfc2NhbGVfcG93KGxpbmVhci5jb3B5KCksIGV4cG9uZW50LCBkb21haW4pO1xuICAgIH07XG4gICAgcmV0dXJuIGQzX3NjYWxlX2xpbmVhclJlYmluZChzY2FsZSwgbGluZWFyKTtcbiAgfVxuICBmdW5jdGlvbiBkM19zY2FsZV9wb3dQb3coZSkge1xuICAgIHJldHVybiBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4geCA8IDAgPyAtTWF0aC5wb3coLXgsIGUpIDogTWF0aC5wb3coeCwgZSk7XG4gICAgfTtcbiAgfVxuICBkMy5zY2FsZS5zcXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGQzLnNjYWxlLnBvdygpLmV4cG9uZW50KC41KTtcbiAgfTtcbiAgZDMuc2NhbGUub3JkaW5hbCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkM19zY2FsZV9vcmRpbmFsKFtdLCB7XG4gICAgICB0OiBcInJhbmdlXCIsXG4gICAgICBhOiBbIFtdIF1cbiAgICB9KTtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfc2NhbGVfb3JkaW5hbChkb21haW4sIHJhbmdlcikge1xuICAgIHZhciBpbmRleCwgcmFuZ2UsIHJhbmdlQmFuZDtcbiAgICBmdW5jdGlvbiBzY2FsZSh4KSB7XG4gICAgICByZXR1cm4gcmFuZ2VbKChpbmRleC5nZXQoeCkgfHwgaW5kZXguc2V0KHgsIGRvbWFpbi5wdXNoKHgpKSkgLSAxKSAlIHJhbmdlLmxlbmd0aF07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHN0ZXBzKHN0YXJ0LCBzdGVwKSB7XG4gICAgICByZXR1cm4gZDMucmFuZ2UoZG9tYWluLmxlbmd0aCkubWFwKGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgcmV0dXJuIHN0YXJ0ICsgc3RlcCAqIGk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgc2NhbGUuZG9tYWluID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZG9tYWluO1xuICAgICAgZG9tYWluID0gW107XG4gICAgICBpbmRleCA9IG5ldyBkM19NYXAoKTtcbiAgICAgIHZhciBpID0gLTEsIG4gPSB4Lmxlbmd0aCwgeGk7XG4gICAgICB3aGlsZSAoKytpIDwgbikgaWYgKCFpbmRleC5oYXMoeGkgPSB4W2ldKSkgaW5kZXguc2V0KHhpLCBkb21haW4ucHVzaCh4aSkpO1xuICAgICAgcmV0dXJuIHNjYWxlW3Jhbmdlci50XS5hcHBseShzY2FsZSwgcmFuZ2VyLmEpO1xuICAgIH07XG4gICAgc2NhbGUucmFuZ2UgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiByYW5nZTtcbiAgICAgIHJhbmdlID0geDtcbiAgICAgIHJhbmdlQmFuZCA9IDA7XG4gICAgICByYW5nZXIgPSB7XG4gICAgICAgIHQ6IFwicmFuZ2VcIixcbiAgICAgICAgYTogYXJndW1lbnRzXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHNjYWxlO1xuICAgIH07XG4gICAgc2NhbGUucmFuZ2VQb2ludHMgPSBmdW5jdGlvbih4LCBwYWRkaW5nKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHBhZGRpbmcgPSAwO1xuICAgICAgdmFyIHN0YXJ0ID0geFswXSwgc3RvcCA9IHhbMV0sIHN0ZXAgPSAoc3RvcCAtIHN0YXJ0KSAvIChNYXRoLm1heCgxLCBkb21haW4ubGVuZ3RoIC0gMSkgKyBwYWRkaW5nKTtcbiAgICAgIHJhbmdlID0gc3RlcHMoZG9tYWluLmxlbmd0aCA8IDIgPyAoc3RhcnQgKyBzdG9wKSAvIDIgOiBzdGFydCArIHN0ZXAgKiBwYWRkaW5nIC8gMiwgc3RlcCk7XG4gICAgICByYW5nZUJhbmQgPSAwO1xuICAgICAgcmFuZ2VyID0ge1xuICAgICAgICB0OiBcInJhbmdlUG9pbnRzXCIsXG4gICAgICAgIGE6IGFyZ3VtZW50c1xuICAgICAgfTtcbiAgICAgIHJldHVybiBzY2FsZTtcbiAgICB9O1xuICAgIHNjYWxlLnJhbmdlQmFuZHMgPSBmdW5jdGlvbih4LCBwYWRkaW5nLCBvdXRlclBhZGRpbmcpIHtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgcGFkZGluZyA9IDA7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIG91dGVyUGFkZGluZyA9IHBhZGRpbmc7XG4gICAgICB2YXIgcmV2ZXJzZSA9IHhbMV0gPCB4WzBdLCBzdGFydCA9IHhbcmV2ZXJzZSAtIDBdLCBzdG9wID0geFsxIC0gcmV2ZXJzZV0sIHN0ZXAgPSAoc3RvcCAtIHN0YXJ0KSAvIChkb21haW4ubGVuZ3RoIC0gcGFkZGluZyArIDIgKiBvdXRlclBhZGRpbmcpO1xuICAgICAgcmFuZ2UgPSBzdGVwcyhzdGFydCArIHN0ZXAgKiBvdXRlclBhZGRpbmcsIHN0ZXApO1xuICAgICAgaWYgKHJldmVyc2UpIHJhbmdlLnJldmVyc2UoKTtcbiAgICAgIHJhbmdlQmFuZCA9IHN0ZXAgKiAoMSAtIHBhZGRpbmcpO1xuICAgICAgcmFuZ2VyID0ge1xuICAgICAgICB0OiBcInJhbmdlQmFuZHNcIixcbiAgICAgICAgYTogYXJndW1lbnRzXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHNjYWxlO1xuICAgIH07XG4gICAgc2NhbGUucmFuZ2VSb3VuZEJhbmRzID0gZnVuY3Rpb24oeCwgcGFkZGluZywgb3V0ZXJQYWRkaW5nKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHBhZGRpbmcgPSAwO1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSBvdXRlclBhZGRpbmcgPSBwYWRkaW5nO1xuICAgICAgdmFyIHJldmVyc2UgPSB4WzFdIDwgeFswXSwgc3RhcnQgPSB4W3JldmVyc2UgLSAwXSwgc3RvcCA9IHhbMSAtIHJldmVyc2VdLCBzdGVwID0gTWF0aC5mbG9vcigoc3RvcCAtIHN0YXJ0KSAvIChkb21haW4ubGVuZ3RoIC0gcGFkZGluZyArIDIgKiBvdXRlclBhZGRpbmcpKSwgZXJyb3IgPSBzdG9wIC0gc3RhcnQgLSAoZG9tYWluLmxlbmd0aCAtIHBhZGRpbmcpICogc3RlcDtcbiAgICAgIHJhbmdlID0gc3RlcHMoc3RhcnQgKyBNYXRoLnJvdW5kKGVycm9yIC8gMiksIHN0ZXApO1xuICAgICAgaWYgKHJldmVyc2UpIHJhbmdlLnJldmVyc2UoKTtcbiAgICAgIHJhbmdlQmFuZCA9IE1hdGgucm91bmQoc3RlcCAqICgxIC0gcGFkZGluZykpO1xuICAgICAgcmFuZ2VyID0ge1xuICAgICAgICB0OiBcInJhbmdlUm91bmRCYW5kc1wiLFxuICAgICAgICBhOiBhcmd1bWVudHNcbiAgICAgIH07XG4gICAgICByZXR1cm4gc2NhbGU7XG4gICAgfTtcbiAgICBzY2FsZS5yYW5nZUJhbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiByYW5nZUJhbmQ7XG4gICAgfTtcbiAgICBzY2FsZS5yYW5nZUV4dGVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGQzX3NjYWxlRXh0ZW50KHJhbmdlci5hWzBdKTtcbiAgICB9O1xuICAgIHNjYWxlLmNvcHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkM19zY2FsZV9vcmRpbmFsKGRvbWFpbiwgcmFuZ2VyKTtcbiAgICB9O1xuICAgIHJldHVybiBzY2FsZS5kb21haW4oZG9tYWluKTtcbiAgfVxuICBkMy5zY2FsZS5jYXRlZ29yeTEwID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGQzLnNjYWxlLm9yZGluYWwoKS5yYW5nZShkM19jYXRlZ29yeTEwKTtcbiAgfTtcbiAgZDMuc2NhbGUuY2F0ZWdvcnkyMCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkMy5zY2FsZS5vcmRpbmFsKCkucmFuZ2UoZDNfY2F0ZWdvcnkyMCk7XG4gIH07XG4gIGQzLnNjYWxlLmNhdGVnb3J5MjBiID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGQzLnNjYWxlLm9yZGluYWwoKS5yYW5nZShkM19jYXRlZ29yeTIwYik7XG4gIH07XG4gIGQzLnNjYWxlLmNhdGVnb3J5MjBjID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGQzLnNjYWxlLm9yZGluYWwoKS5yYW5nZShkM19jYXRlZ29yeTIwYyk7XG4gIH07XG4gIHZhciBkM19jYXRlZ29yeTEwID0gWyAyMDYyMjYwLCAxNjc0NDIwNiwgMjkyNDU4OCwgMTQwMzQ3MjgsIDk3MjU4ODUsIDkxOTcxMzEsIDE0OTA3MzMwLCA4MzU1NzExLCAxMjM2OTE4NiwgMTU1NjE3NSBdLm1hcChkM19yZ2JTdHJpbmcpO1xuICB2YXIgZDNfY2F0ZWdvcnkyMCA9IFsgMjA2MjI2MCwgMTE0NTQ0NDAsIDE2NzQ0MjA2LCAxNjc1OTY3MiwgMjkyNDU4OCwgMTAwMTg2OTgsIDE0MDM0NzI4LCAxNjc1MDc0MiwgOTcyNTg4NSwgMTI5NTU4NjEsIDkxOTcxMzEsIDEyODg1MTQwLCAxNDkwNzMzMCwgMTYyMzQxOTQsIDgzNTU3MTEsIDEzMDkyODA3LCAxMjM2OTE4NiwgMTQ0MDg1ODksIDE1NTYxNzUsIDEwNDEwNzI1IF0ubWFwKGQzX3JnYlN0cmluZyk7XG4gIHZhciBkM19jYXRlZ29yeTIwYiA9IFsgMzc1MDc3NywgNTM5NTYxOSwgNzA0MDcxOSwgMTAyNjQyODYsIDY1MTkwOTcsIDkyMTY1OTQsIDExOTE1MTE1LCAxMzU1NjYzNiwgOTIwMjk5MywgMTI0MjY4MDksIDE1MTg2NTE0LCAxNTE5MDkzMiwgODY2NjE2OSwgMTEzNTY0OTAsIDE0MDQ5NjQzLCAxNTE3NzM3MiwgODA3NzY4MywgMTA4MzQzMjQsIDEzNTI4NTA5LCAxNDU4OTY1NCBdLm1hcChkM19yZ2JTdHJpbmcpO1xuICB2YXIgZDNfY2F0ZWdvcnkyMGMgPSBbIDMyNDQ3MzMsIDcwNTcxMTAsIDEwNDA2NjI1LCAxMzAzMjQzMSwgMTUwOTUwNTMsIDE2NjE2NzY0LCAxNjYyNTI1OSwgMTY2MzQwMTgsIDMyNTMwNzYsIDc2NTI0NzAsIDEwNjA3MDAzLCAxMzEwMTUwNCwgNzY5NTI4MSwgMTAzOTQzMTIsIDEyMzY5MzcyLCAxNDM0Mjg5MSwgNjUxMzUwNywgOTg2ODk1MCwgMTI0MzQ4NzcsIDE0Mjc3MDgxIF0ubWFwKGQzX3JnYlN0cmluZyk7XG4gIGQzLnNjYWxlLnF1YW50aWxlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGQzX3NjYWxlX3F1YW50aWxlKFtdLCBbXSk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3NjYWxlX3F1YW50aWxlKGRvbWFpbiwgcmFuZ2UpIHtcbiAgICB2YXIgdGhyZXNob2xkcztcbiAgICBmdW5jdGlvbiByZXNjYWxlKCkge1xuICAgICAgdmFyIGsgPSAwLCBxID0gcmFuZ2UubGVuZ3RoO1xuICAgICAgdGhyZXNob2xkcyA9IFtdO1xuICAgICAgd2hpbGUgKCsrayA8IHEpIHRocmVzaG9sZHNbayAtIDFdID0gZDMucXVhbnRpbGUoZG9tYWluLCBrIC8gcSk7XG4gICAgICByZXR1cm4gc2NhbGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNjYWxlKHgpIHtcbiAgICAgIGlmICghaXNOYU4oeCA9ICt4KSkgcmV0dXJuIHJhbmdlW2QzLmJpc2VjdCh0aHJlc2hvbGRzLCB4KV07XG4gICAgfVxuICAgIHNjYWxlLmRvbWFpbiA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRvbWFpbjtcbiAgICAgIGRvbWFpbiA9IHguZmlsdGVyKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuICFpc05hTihkKTtcbiAgICAgIH0pLnNvcnQoZDMuYXNjZW5kaW5nKTtcbiAgICAgIHJldHVybiByZXNjYWxlKCk7XG4gICAgfTtcbiAgICBzY2FsZS5yYW5nZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHJhbmdlO1xuICAgICAgcmFuZ2UgPSB4O1xuICAgICAgcmV0dXJuIHJlc2NhbGUoKTtcbiAgICB9O1xuICAgIHNjYWxlLnF1YW50aWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRocmVzaG9sZHM7XG4gICAgfTtcbiAgICBzY2FsZS5pbnZlcnRFeHRlbnQgPSBmdW5jdGlvbih5KSB7XG4gICAgICB5ID0gcmFuZ2UuaW5kZXhPZih5KTtcbiAgICAgIHJldHVybiB5IDwgMCA/IFsgTmFOLCBOYU4gXSA6IFsgeSA+IDAgPyB0aHJlc2hvbGRzW3kgLSAxXSA6IGRvbWFpblswXSwgeSA8IHRocmVzaG9sZHMubGVuZ3RoID8gdGhyZXNob2xkc1t5XSA6IGRvbWFpbltkb21haW4ubGVuZ3RoIC0gMV0gXTtcbiAgICB9O1xuICAgIHNjYWxlLmNvcHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkM19zY2FsZV9xdWFudGlsZShkb21haW4sIHJhbmdlKTtcbiAgICB9O1xuICAgIHJldHVybiByZXNjYWxlKCk7XG4gIH1cbiAgZDMuc2NhbGUucXVhbnRpemUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfc2NhbGVfcXVhbnRpemUoMCwgMSwgWyAwLCAxIF0pO1xuICB9O1xuICBmdW5jdGlvbiBkM19zY2FsZV9xdWFudGl6ZSh4MCwgeDEsIHJhbmdlKSB7XG4gICAgdmFyIGt4LCBpO1xuICAgIGZ1bmN0aW9uIHNjYWxlKHgpIHtcbiAgICAgIHJldHVybiByYW5nZVtNYXRoLm1heCgwLCBNYXRoLm1pbihpLCBNYXRoLmZsb29yKGt4ICogKHggLSB4MCkpKSldO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXNjYWxlKCkge1xuICAgICAga3ggPSByYW5nZS5sZW5ndGggLyAoeDEgLSB4MCk7XG4gICAgICBpID0gcmFuZ2UubGVuZ3RoIC0gMTtcbiAgICAgIHJldHVybiBzY2FsZTtcbiAgICB9XG4gICAgc2NhbGUuZG9tYWluID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gWyB4MCwgeDEgXTtcbiAgICAgIHgwID0gK3hbMF07XG4gICAgICB4MSA9ICt4W3gubGVuZ3RoIC0gMV07XG4gICAgICByZXR1cm4gcmVzY2FsZSgpO1xuICAgIH07XG4gICAgc2NhbGUucmFuZ2UgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiByYW5nZTtcbiAgICAgIHJhbmdlID0geDtcbiAgICAgIHJldHVybiByZXNjYWxlKCk7XG4gICAgfTtcbiAgICBzY2FsZS5pbnZlcnRFeHRlbnQgPSBmdW5jdGlvbih5KSB7XG4gICAgICB5ID0gcmFuZ2UuaW5kZXhPZih5KTtcbiAgICAgIHkgPSB5IDwgMCA/IE5hTiA6IHkgLyBreCArIHgwO1xuICAgICAgcmV0dXJuIFsgeSwgeSArIDEgLyBreCBdO1xuICAgIH07XG4gICAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGQzX3NjYWxlX3F1YW50aXplKHgwLCB4MSwgcmFuZ2UpO1xuICAgIH07XG4gICAgcmV0dXJuIHJlc2NhbGUoKTtcbiAgfVxuICBkMy5zY2FsZS50aHJlc2hvbGQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfc2NhbGVfdGhyZXNob2xkKFsgLjUgXSwgWyAwLCAxIF0pO1xuICB9O1xuICBmdW5jdGlvbiBkM19zY2FsZV90aHJlc2hvbGQoZG9tYWluLCByYW5nZSkge1xuICAgIGZ1bmN0aW9uIHNjYWxlKHgpIHtcbiAgICAgIGlmICh4IDw9IHgpIHJldHVybiByYW5nZVtkMy5iaXNlY3QoZG9tYWluLCB4KV07XG4gICAgfVxuICAgIHNjYWxlLmRvbWFpbiA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRvbWFpbjtcbiAgICAgIGRvbWFpbiA9IF87XG4gICAgICByZXR1cm4gc2NhbGU7XG4gICAgfTtcbiAgICBzY2FsZS5yYW5nZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHJhbmdlO1xuICAgICAgcmFuZ2UgPSBfO1xuICAgICAgcmV0dXJuIHNjYWxlO1xuICAgIH07XG4gICAgc2NhbGUuaW52ZXJ0RXh0ZW50ID0gZnVuY3Rpb24oeSkge1xuICAgICAgeSA9IHJhbmdlLmluZGV4T2YoeSk7XG4gICAgICByZXR1cm4gWyBkb21haW5beSAtIDFdLCBkb21haW5beV0gXTtcbiAgICB9O1xuICAgIHNjYWxlLmNvcHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkM19zY2FsZV90aHJlc2hvbGQoZG9tYWluLCByYW5nZSk7XG4gICAgfTtcbiAgICByZXR1cm4gc2NhbGU7XG4gIH1cbiAgZDMuc2NhbGUuaWRlbnRpdHkgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfc2NhbGVfaWRlbnRpdHkoWyAwLCAxIF0pO1xuICB9O1xuICBmdW5jdGlvbiBkM19zY2FsZV9pZGVudGl0eShkb21haW4pIHtcbiAgICBmdW5jdGlvbiBpZGVudGl0eSh4KSB7XG4gICAgICByZXR1cm4gK3g7XG4gICAgfVxuICAgIGlkZW50aXR5LmludmVydCA9IGlkZW50aXR5O1xuICAgIGlkZW50aXR5LmRvbWFpbiA9IGlkZW50aXR5LnJhbmdlID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZG9tYWluO1xuICAgICAgZG9tYWluID0geC5tYXAoaWRlbnRpdHkpO1xuICAgICAgcmV0dXJuIGlkZW50aXR5O1xuICAgIH07XG4gICAgaWRlbnRpdHkudGlja3MgPSBmdW5jdGlvbihtKSB7XG4gICAgICByZXR1cm4gZDNfc2NhbGVfbGluZWFyVGlja3MoZG9tYWluLCBtKTtcbiAgICB9O1xuICAgIGlkZW50aXR5LnRpY2tGb3JtYXQgPSBmdW5jdGlvbihtLCBmb3JtYXQpIHtcbiAgICAgIHJldHVybiBkM19zY2FsZV9saW5lYXJUaWNrRm9ybWF0KGRvbWFpbiwgbSwgZm9ybWF0KTtcbiAgICB9O1xuICAgIGlkZW50aXR5LmNvcHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkM19zY2FsZV9pZGVudGl0eShkb21haW4pO1xuICAgIH07XG4gICAgcmV0dXJuIGlkZW50aXR5O1xuICB9XG4gIGQzLnN2Zy5hcmMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaW5uZXJSYWRpdXMgPSBkM19zdmdfYXJjSW5uZXJSYWRpdXMsIG91dGVyUmFkaXVzID0gZDNfc3ZnX2FyY091dGVyUmFkaXVzLCBzdGFydEFuZ2xlID0gZDNfc3ZnX2FyY1N0YXJ0QW5nbGUsIGVuZEFuZ2xlID0gZDNfc3ZnX2FyY0VuZEFuZ2xlO1xuICAgIGZ1bmN0aW9uIGFyYygpIHtcbiAgICAgIHZhciByMCA9IGlubmVyUmFkaXVzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksIHIxID0gb3V0ZXJSYWRpdXMuYXBwbHkodGhpcywgYXJndW1lbnRzKSwgYTAgPSBzdGFydEFuZ2xlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgKyBkM19zdmdfYXJjT2Zmc2V0LCBhMSA9IGVuZEFuZ2xlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgKyBkM19zdmdfYXJjT2Zmc2V0LCBkYSA9IChhMSA8IGEwICYmIChkYSA9IGEwLCBcbiAgICAgIGEwID0gYTEsIGExID0gZGEpLCBhMSAtIGEwKSwgZGYgPSBkYSA8IM+AID8gXCIwXCIgOiBcIjFcIiwgYzAgPSBNYXRoLmNvcyhhMCksIHMwID0gTWF0aC5zaW4oYTApLCBjMSA9IE1hdGguY29zKGExKSwgczEgPSBNYXRoLnNpbihhMSk7XG4gICAgICByZXR1cm4gZGEgPj0gZDNfc3ZnX2FyY01heCA/IHIwID8gXCJNMCxcIiArIHIxICsgXCJBXCIgKyByMSArIFwiLFwiICsgcjEgKyBcIiAwIDEsMSAwLFwiICsgLXIxICsgXCJBXCIgKyByMSArIFwiLFwiICsgcjEgKyBcIiAwIDEsMSAwLFwiICsgcjEgKyBcIk0wLFwiICsgcjAgKyBcIkFcIiArIHIwICsgXCIsXCIgKyByMCArIFwiIDAgMSwwIDAsXCIgKyAtcjAgKyBcIkFcIiArIHIwICsgXCIsXCIgKyByMCArIFwiIDAgMSwwIDAsXCIgKyByMCArIFwiWlwiIDogXCJNMCxcIiArIHIxICsgXCJBXCIgKyByMSArIFwiLFwiICsgcjEgKyBcIiAwIDEsMSAwLFwiICsgLXIxICsgXCJBXCIgKyByMSArIFwiLFwiICsgcjEgKyBcIiAwIDEsMSAwLFwiICsgcjEgKyBcIlpcIiA6IHIwID8gXCJNXCIgKyByMSAqIGMwICsgXCIsXCIgKyByMSAqIHMwICsgXCJBXCIgKyByMSArIFwiLFwiICsgcjEgKyBcIiAwIFwiICsgZGYgKyBcIiwxIFwiICsgcjEgKiBjMSArIFwiLFwiICsgcjEgKiBzMSArIFwiTFwiICsgcjAgKiBjMSArIFwiLFwiICsgcjAgKiBzMSArIFwiQVwiICsgcjAgKyBcIixcIiArIHIwICsgXCIgMCBcIiArIGRmICsgXCIsMCBcIiArIHIwICogYzAgKyBcIixcIiArIHIwICogczAgKyBcIlpcIiA6IFwiTVwiICsgcjEgKiBjMCArIFwiLFwiICsgcjEgKiBzMCArIFwiQVwiICsgcjEgKyBcIixcIiArIHIxICsgXCIgMCBcIiArIGRmICsgXCIsMSBcIiArIHIxICogYzEgKyBcIixcIiArIHIxICogczEgKyBcIkwwLDBcIiArIFwiWlwiO1xuICAgIH1cbiAgICBhcmMuaW5uZXJSYWRpdXMgPSBmdW5jdGlvbih2KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBpbm5lclJhZGl1cztcbiAgICAgIGlubmVyUmFkaXVzID0gZDNfZnVuY3Rvcih2KTtcbiAgICAgIHJldHVybiBhcmM7XG4gICAgfTtcbiAgICBhcmMub3V0ZXJSYWRpdXMgPSBmdW5jdGlvbih2KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvdXRlclJhZGl1cztcbiAgICAgIG91dGVyUmFkaXVzID0gZDNfZnVuY3Rvcih2KTtcbiAgICAgIHJldHVybiBhcmM7XG4gICAgfTtcbiAgICBhcmMuc3RhcnRBbmdsZSA9IGZ1bmN0aW9uKHYpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHN0YXJ0QW5nbGU7XG4gICAgICBzdGFydEFuZ2xlID0gZDNfZnVuY3Rvcih2KTtcbiAgICAgIHJldHVybiBhcmM7XG4gICAgfTtcbiAgICBhcmMuZW5kQW5nbGUgPSBmdW5jdGlvbih2KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBlbmRBbmdsZTtcbiAgICAgIGVuZEFuZ2xlID0gZDNfZnVuY3Rvcih2KTtcbiAgICAgIHJldHVybiBhcmM7XG4gICAgfTtcbiAgICBhcmMuY2VudHJvaWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByID0gKGlubmVyUmFkaXVzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgKyBvdXRlclJhZGl1cy5hcHBseSh0aGlzLCBhcmd1bWVudHMpKSAvIDIsIGEgPSAoc3RhcnRBbmdsZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpICsgZW5kQW5nbGUuYXBwbHkodGhpcywgYXJndW1lbnRzKSkgLyAyICsgZDNfc3ZnX2FyY09mZnNldDtcbiAgICAgIHJldHVybiBbIE1hdGguY29zKGEpICogciwgTWF0aC5zaW4oYSkgKiByIF07XG4gICAgfTtcbiAgICByZXR1cm4gYXJjO1xuICB9O1xuICB2YXIgZDNfc3ZnX2FyY09mZnNldCA9IC3PgCAvIDIsIGQzX3N2Z19hcmNNYXggPSAyICogz4AgLSAxZS02O1xuICBmdW5jdGlvbiBkM19zdmdfYXJjSW5uZXJSYWRpdXMoZCkge1xuICAgIHJldHVybiBkLmlubmVyUmFkaXVzO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3N2Z19hcmNPdXRlclJhZGl1cyhkKSB7XG4gICAgcmV0dXJuIGQub3V0ZXJSYWRpdXM7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2FyY1N0YXJ0QW5nbGUoZCkge1xuICAgIHJldHVybiBkLnN0YXJ0QW5nbGU7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2FyY0VuZEFuZ2xlKGQpIHtcbiAgICByZXR1cm4gZC5lbmRBbmdsZTtcbiAgfVxuICBkMy5zdmcubGluZS5yYWRpYWwgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbGluZSA9IGQzX3N2Z19saW5lKGQzX3N2Z19saW5lUmFkaWFsKTtcbiAgICBsaW5lLnJhZGl1cyA9IGxpbmUueCwgZGVsZXRlIGxpbmUueDtcbiAgICBsaW5lLmFuZ2xlID0gbGluZS55LCBkZWxldGUgbGluZS55O1xuICAgIHJldHVybiBsaW5lO1xuICB9O1xuICBmdW5jdGlvbiBkM19zdmdfbGluZVJhZGlhbChwb2ludHMpIHtcbiAgICB2YXIgcG9pbnQsIGkgPSAtMSwgbiA9IHBvaW50cy5sZW5ndGgsIHIsIGE7XG4gICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgIHBvaW50ID0gcG9pbnRzW2ldO1xuICAgICAgciA9IHBvaW50WzBdO1xuICAgICAgYSA9IHBvaW50WzFdICsgZDNfc3ZnX2FyY09mZnNldDtcbiAgICAgIHBvaW50WzBdID0gciAqIE1hdGguY29zKGEpO1xuICAgICAgcG9pbnRbMV0gPSByICogTWF0aC5zaW4oYSk7XG4gICAgfVxuICAgIHJldHVybiBwb2ludHM7XG4gIH1cbiAgZnVuY3Rpb24gZDNfc3ZnX2FyZWEocHJvamVjdGlvbikge1xuICAgIHZhciB4MCA9IGQzX3N2Z19saW5lWCwgeDEgPSBkM19zdmdfbGluZVgsIHkwID0gMCwgeTEgPSBkM19zdmdfbGluZVksIGRlZmluZWQgPSBkM190cnVlLCBpbnRlcnBvbGF0ZSA9IGQzX3N2Z19saW5lTGluZWFyLCBpbnRlcnBvbGF0ZUtleSA9IGludGVycG9sYXRlLmtleSwgaW50ZXJwb2xhdGVSZXZlcnNlID0gaW50ZXJwb2xhdGUsIEwgPSBcIkxcIiwgdGVuc2lvbiA9IC43O1xuICAgIGZ1bmN0aW9uIGFyZWEoZGF0YSkge1xuICAgICAgdmFyIHNlZ21lbnRzID0gW10sIHBvaW50czAgPSBbXSwgcG9pbnRzMSA9IFtdLCBpID0gLTEsIG4gPSBkYXRhLmxlbmd0aCwgZCwgZngwID0gZDNfZnVuY3Rvcih4MCksIGZ5MCA9IGQzX2Z1bmN0b3IoeTApLCBmeDEgPSB4MCA9PT0geDEgPyBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgICB9IDogZDNfZnVuY3Rvcih4MSksIGZ5MSA9IHkwID09PSB5MSA/IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4geTtcbiAgICAgIH0gOiBkM19mdW5jdG9yKHkxKSwgeCwgeTtcbiAgICAgIGZ1bmN0aW9uIHNlZ21lbnQoKSB7XG4gICAgICAgIHNlZ21lbnRzLnB1c2goXCJNXCIsIGludGVycG9sYXRlKHByb2plY3Rpb24ocG9pbnRzMSksIHRlbnNpb24pLCBMLCBpbnRlcnBvbGF0ZVJldmVyc2UocHJvamVjdGlvbihwb2ludHMwLnJldmVyc2UoKSksIHRlbnNpb24pLCBcIlpcIik7XG4gICAgICB9XG4gICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICBpZiAoZGVmaW5lZC5jYWxsKHRoaXMsIGQgPSBkYXRhW2ldLCBpKSkge1xuICAgICAgICAgIHBvaW50czAucHVzaChbIHggPSArZngwLmNhbGwodGhpcywgZCwgaSksIHkgPSArZnkwLmNhbGwodGhpcywgZCwgaSkgXSk7XG4gICAgICAgICAgcG9pbnRzMS5wdXNoKFsgK2Z4MS5jYWxsKHRoaXMsIGQsIGkpLCArZnkxLmNhbGwodGhpcywgZCwgaSkgXSk7XG4gICAgICAgIH0gZWxzZSBpZiAocG9pbnRzMC5sZW5ndGgpIHtcbiAgICAgICAgICBzZWdtZW50KCk7XG4gICAgICAgICAgcG9pbnRzMCA9IFtdO1xuICAgICAgICAgIHBvaW50czEgPSBbXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHBvaW50czAubGVuZ3RoKSBzZWdtZW50KCk7XG4gICAgICByZXR1cm4gc2VnbWVudHMubGVuZ3RoID8gc2VnbWVudHMuam9pbihcIlwiKSA6IG51bGw7XG4gICAgfVxuICAgIGFyZWEueCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHgxO1xuICAgICAgeDAgPSB4MSA9IF87XG4gICAgICByZXR1cm4gYXJlYTtcbiAgICB9O1xuICAgIGFyZWEueDAgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB4MDtcbiAgICAgIHgwID0gXztcbiAgICAgIHJldHVybiBhcmVhO1xuICAgIH07XG4gICAgYXJlYS54MSA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHgxO1xuICAgICAgeDEgPSBfO1xuICAgICAgcmV0dXJuIGFyZWE7XG4gICAgfTtcbiAgICBhcmVhLnkgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB5MTtcbiAgICAgIHkwID0geTEgPSBfO1xuICAgICAgcmV0dXJuIGFyZWE7XG4gICAgfTtcbiAgICBhcmVhLnkwID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4geTA7XG4gICAgICB5MCA9IF87XG4gICAgICByZXR1cm4gYXJlYTtcbiAgICB9O1xuICAgIGFyZWEueTEgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB5MTtcbiAgICAgIHkxID0gXztcbiAgICAgIHJldHVybiBhcmVhO1xuICAgIH07XG4gICAgYXJlYS5kZWZpbmVkID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZGVmaW5lZDtcbiAgICAgIGRlZmluZWQgPSBfO1xuICAgICAgcmV0dXJuIGFyZWE7XG4gICAgfTtcbiAgICBhcmVhLmludGVycG9sYXRlID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gaW50ZXJwb2xhdGVLZXk7XG4gICAgICBpZiAodHlwZW9mIF8gPT09IFwiZnVuY3Rpb25cIikgaW50ZXJwb2xhdGVLZXkgPSBpbnRlcnBvbGF0ZSA9IF87IGVsc2UgaW50ZXJwb2xhdGVLZXkgPSAoaW50ZXJwb2xhdGUgPSBkM19zdmdfbGluZUludGVycG9sYXRvcnMuZ2V0KF8pIHx8IGQzX3N2Z19saW5lTGluZWFyKS5rZXk7XG4gICAgICBpbnRlcnBvbGF0ZVJldmVyc2UgPSBpbnRlcnBvbGF0ZS5yZXZlcnNlIHx8IGludGVycG9sYXRlO1xuICAgICAgTCA9IGludGVycG9sYXRlLmNsb3NlZCA/IFwiTVwiIDogXCJMXCI7XG4gICAgICByZXR1cm4gYXJlYTtcbiAgICB9O1xuICAgIGFyZWEudGVuc2lvbiA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRlbnNpb247XG4gICAgICB0ZW5zaW9uID0gXztcbiAgICAgIHJldHVybiBhcmVhO1xuICAgIH07XG4gICAgcmV0dXJuIGFyZWE7XG4gIH1cbiAgZDNfc3ZnX2xpbmVTdGVwQmVmb3JlLnJldmVyc2UgPSBkM19zdmdfbGluZVN0ZXBBZnRlcjtcbiAgZDNfc3ZnX2xpbmVTdGVwQWZ0ZXIucmV2ZXJzZSA9IGQzX3N2Z19saW5lU3RlcEJlZm9yZTtcbiAgZDMuc3ZnLmFyZWEgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZDNfc3ZnX2FyZWEoZDNfaWRlbnRpdHkpO1xuICB9O1xuICBkMy5zdmcuYXJlYS5yYWRpYWwgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJlYSA9IGQzX3N2Z19hcmVhKGQzX3N2Z19saW5lUmFkaWFsKTtcbiAgICBhcmVhLnJhZGl1cyA9IGFyZWEueCwgZGVsZXRlIGFyZWEueDtcbiAgICBhcmVhLmlubmVyUmFkaXVzID0gYXJlYS54MCwgZGVsZXRlIGFyZWEueDA7XG4gICAgYXJlYS5vdXRlclJhZGl1cyA9IGFyZWEueDEsIGRlbGV0ZSBhcmVhLngxO1xuICAgIGFyZWEuYW5nbGUgPSBhcmVhLnksIGRlbGV0ZSBhcmVhLnk7XG4gICAgYXJlYS5zdGFydEFuZ2xlID0gYXJlYS55MCwgZGVsZXRlIGFyZWEueTA7XG4gICAgYXJlYS5lbmRBbmdsZSA9IGFyZWEueTEsIGRlbGV0ZSBhcmVhLnkxO1xuICAgIHJldHVybiBhcmVhO1xuICB9O1xuICBkMy5zdmcuY2hvcmQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc291cmNlID0gZDNfc291cmNlLCB0YXJnZXQgPSBkM190YXJnZXQsIHJhZGl1cyA9IGQzX3N2Z19jaG9yZFJhZGl1cywgc3RhcnRBbmdsZSA9IGQzX3N2Z19hcmNTdGFydEFuZ2xlLCBlbmRBbmdsZSA9IGQzX3N2Z19hcmNFbmRBbmdsZTtcbiAgICBmdW5jdGlvbiBjaG9yZChkLCBpKSB7XG4gICAgICB2YXIgcyA9IHN1Ymdyb3VwKHRoaXMsIHNvdXJjZSwgZCwgaSksIHQgPSBzdWJncm91cCh0aGlzLCB0YXJnZXQsIGQsIGkpO1xuICAgICAgcmV0dXJuIFwiTVwiICsgcy5wMCArIGFyYyhzLnIsIHMucDEsIHMuYTEgLSBzLmEwKSArIChlcXVhbHMocywgdCkgPyBjdXJ2ZShzLnIsIHMucDEsIHMuciwgcy5wMCkgOiBjdXJ2ZShzLnIsIHMucDEsIHQuciwgdC5wMCkgKyBhcmModC5yLCB0LnAxLCB0LmExIC0gdC5hMCkgKyBjdXJ2ZSh0LnIsIHQucDEsIHMuciwgcy5wMCkpICsgXCJaXCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHN1Ymdyb3VwKHNlbGYsIGYsIGQsIGkpIHtcbiAgICAgIHZhciBzdWJncm91cCA9IGYuY2FsbChzZWxmLCBkLCBpKSwgciA9IHJhZGl1cy5jYWxsKHNlbGYsIHN1Ymdyb3VwLCBpKSwgYTAgPSBzdGFydEFuZ2xlLmNhbGwoc2VsZiwgc3ViZ3JvdXAsIGkpICsgZDNfc3ZnX2FyY09mZnNldCwgYTEgPSBlbmRBbmdsZS5jYWxsKHNlbGYsIHN1Ymdyb3VwLCBpKSArIGQzX3N2Z19hcmNPZmZzZXQ7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByOiByLFxuICAgICAgICBhMDogYTAsXG4gICAgICAgIGExOiBhMSxcbiAgICAgICAgcDA6IFsgciAqIE1hdGguY29zKGEwKSwgciAqIE1hdGguc2luKGEwKSBdLFxuICAgICAgICBwMTogWyByICogTWF0aC5jb3MoYTEpLCByICogTWF0aC5zaW4oYTEpIF1cbiAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVxdWFscyhhLCBiKSB7XG4gICAgICByZXR1cm4gYS5hMCA9PSBiLmEwICYmIGEuYTEgPT0gYi5hMTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYXJjKHIsIHAsIGEpIHtcbiAgICAgIHJldHVybiBcIkFcIiArIHIgKyBcIixcIiArIHIgKyBcIiAwIFwiICsgKyhhID4gz4ApICsgXCIsMSBcIiArIHA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGN1cnZlKHIwLCBwMCwgcjEsIHAxKSB7XG4gICAgICByZXR1cm4gXCJRIDAsMCBcIiArIHAxO1xuICAgIH1cbiAgICBjaG9yZC5yYWRpdXMgPSBmdW5jdGlvbih2KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiByYWRpdXM7XG4gICAgICByYWRpdXMgPSBkM19mdW5jdG9yKHYpO1xuICAgICAgcmV0dXJuIGNob3JkO1xuICAgIH07XG4gICAgY2hvcmQuc291cmNlID0gZnVuY3Rpb24odikge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc291cmNlO1xuICAgICAgc291cmNlID0gZDNfZnVuY3Rvcih2KTtcbiAgICAgIHJldHVybiBjaG9yZDtcbiAgICB9O1xuICAgIGNob3JkLnRhcmdldCA9IGZ1bmN0aW9uKHYpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRhcmdldDtcbiAgICAgIHRhcmdldCA9IGQzX2Z1bmN0b3Iodik7XG4gICAgICByZXR1cm4gY2hvcmQ7XG4gICAgfTtcbiAgICBjaG9yZC5zdGFydEFuZ2xlID0gZnVuY3Rpb24odikge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc3RhcnRBbmdsZTtcbiAgICAgIHN0YXJ0QW5nbGUgPSBkM19mdW5jdG9yKHYpO1xuICAgICAgcmV0dXJuIGNob3JkO1xuICAgIH07XG4gICAgY2hvcmQuZW5kQW5nbGUgPSBmdW5jdGlvbih2KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBlbmRBbmdsZTtcbiAgICAgIGVuZEFuZ2xlID0gZDNfZnVuY3Rvcih2KTtcbiAgICAgIHJldHVybiBjaG9yZDtcbiAgICB9O1xuICAgIHJldHVybiBjaG9yZDtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfc3ZnX2Nob3JkUmFkaXVzKGQpIHtcbiAgICByZXR1cm4gZC5yYWRpdXM7XG4gIH1cbiAgZDMuc3ZnLmRpYWdvbmFsID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNvdXJjZSA9IGQzX3NvdXJjZSwgdGFyZ2V0ID0gZDNfdGFyZ2V0LCBwcm9qZWN0aW9uID0gZDNfc3ZnX2RpYWdvbmFsUHJvamVjdGlvbjtcbiAgICBmdW5jdGlvbiBkaWFnb25hbChkLCBpKSB7XG4gICAgICB2YXIgcDAgPSBzb3VyY2UuY2FsbCh0aGlzLCBkLCBpKSwgcDMgPSB0YXJnZXQuY2FsbCh0aGlzLCBkLCBpKSwgbSA9IChwMC55ICsgcDMueSkgLyAyLCBwID0gWyBwMCwge1xuICAgICAgICB4OiBwMC54LFxuICAgICAgICB5OiBtXG4gICAgICB9LCB7XG4gICAgICAgIHg6IHAzLngsXG4gICAgICAgIHk6IG1cbiAgICAgIH0sIHAzIF07XG4gICAgICBwID0gcC5tYXAocHJvamVjdGlvbik7XG4gICAgICByZXR1cm4gXCJNXCIgKyBwWzBdICsgXCJDXCIgKyBwWzFdICsgXCIgXCIgKyBwWzJdICsgXCIgXCIgKyBwWzNdO1xuICAgIH1cbiAgICBkaWFnb25hbC5zb3VyY2UgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzb3VyY2U7XG4gICAgICBzb3VyY2UgPSBkM19mdW5jdG9yKHgpO1xuICAgICAgcmV0dXJuIGRpYWdvbmFsO1xuICAgIH07XG4gICAgZGlhZ29uYWwudGFyZ2V0ID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGFyZ2V0O1xuICAgICAgdGFyZ2V0ID0gZDNfZnVuY3Rvcih4KTtcbiAgICAgIHJldHVybiBkaWFnb25hbDtcbiAgICB9O1xuICAgIGRpYWdvbmFsLnByb2plY3Rpb24gPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBwcm9qZWN0aW9uO1xuICAgICAgcHJvamVjdGlvbiA9IHg7XG4gICAgICByZXR1cm4gZGlhZ29uYWw7XG4gICAgfTtcbiAgICByZXR1cm4gZGlhZ29uYWw7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3N2Z19kaWFnb25hbFByb2plY3Rpb24oZCkge1xuICAgIHJldHVybiBbIGQueCwgZC55IF07XG4gIH1cbiAgZDMuc3ZnLmRpYWdvbmFsLnJhZGlhbCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkaWFnb25hbCA9IGQzLnN2Zy5kaWFnb25hbCgpLCBwcm9qZWN0aW9uID0gZDNfc3ZnX2RpYWdvbmFsUHJvamVjdGlvbiwgcHJvamVjdGlvbl8gPSBkaWFnb25hbC5wcm9qZWN0aW9uO1xuICAgIGRpYWdvbmFsLnByb2plY3Rpb24gPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IHByb2plY3Rpb25fKGQzX3N2Z19kaWFnb25hbFJhZGlhbFByb2plY3Rpb24ocHJvamVjdGlvbiA9IHgpKSA6IHByb2plY3Rpb247XG4gICAgfTtcbiAgICByZXR1cm4gZGlhZ29uYWw7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3N2Z19kaWFnb25hbFJhZGlhbFByb2plY3Rpb24ocHJvamVjdGlvbikge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBkID0gcHJvamVjdGlvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCByID0gZFswXSwgYSA9IGRbMV0gKyBkM19zdmdfYXJjT2Zmc2V0O1xuICAgICAgcmV0dXJuIFsgciAqIE1hdGguY29zKGEpLCByICogTWF0aC5zaW4oYSkgXTtcbiAgICB9O1xuICB9XG4gIGQzLnN2Zy5zeW1ib2wgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdHlwZSA9IGQzX3N2Z19zeW1ib2xUeXBlLCBzaXplID0gZDNfc3ZnX3N5bWJvbFNpemU7XG4gICAgZnVuY3Rpb24gc3ltYm9sKGQsIGkpIHtcbiAgICAgIHJldHVybiAoZDNfc3ZnX3N5bWJvbHMuZ2V0KHR5cGUuY2FsbCh0aGlzLCBkLCBpKSkgfHwgZDNfc3ZnX3N5bWJvbENpcmNsZSkoc2l6ZS5jYWxsKHRoaXMsIGQsIGkpKTtcbiAgICB9XG4gICAgc3ltYm9sLnR5cGUgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0eXBlO1xuICAgICAgdHlwZSA9IGQzX2Z1bmN0b3IoeCk7XG4gICAgICByZXR1cm4gc3ltYm9sO1xuICAgIH07XG4gICAgc3ltYm9sLnNpemUgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzaXplO1xuICAgICAgc2l6ZSA9IGQzX2Z1bmN0b3IoeCk7XG4gICAgICByZXR1cm4gc3ltYm9sO1xuICAgIH07XG4gICAgcmV0dXJuIHN5bWJvbDtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfc3ZnX3N5bWJvbFNpemUoKSB7XG4gICAgcmV0dXJuIDY0O1xuICB9XG4gIGZ1bmN0aW9uIGQzX3N2Z19zeW1ib2xUeXBlKCkge1xuICAgIHJldHVybiBcImNpcmNsZVwiO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3N2Z19zeW1ib2xDaXJjbGUoc2l6ZSkge1xuICAgIHZhciByID0gTWF0aC5zcXJ0KHNpemUgLyDPgCk7XG4gICAgcmV0dXJuIFwiTTAsXCIgKyByICsgXCJBXCIgKyByICsgXCIsXCIgKyByICsgXCIgMCAxLDEgMCxcIiArIC1yICsgXCJBXCIgKyByICsgXCIsXCIgKyByICsgXCIgMCAxLDEgMCxcIiArIHIgKyBcIlpcIjtcbiAgfVxuICB2YXIgZDNfc3ZnX3N5bWJvbHMgPSBkMy5tYXAoe1xuICAgIGNpcmNsZTogZDNfc3ZnX3N5bWJvbENpcmNsZSxcbiAgICBjcm9zczogZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgdmFyIHIgPSBNYXRoLnNxcnQoc2l6ZSAvIDUpIC8gMjtcbiAgICAgIHJldHVybiBcIk1cIiArIC0zICogciArIFwiLFwiICsgLXIgKyBcIkhcIiArIC1yICsgXCJWXCIgKyAtMyAqIHIgKyBcIkhcIiArIHIgKyBcIlZcIiArIC1yICsgXCJIXCIgKyAzICogciArIFwiVlwiICsgciArIFwiSFwiICsgciArIFwiVlwiICsgMyAqIHIgKyBcIkhcIiArIC1yICsgXCJWXCIgKyByICsgXCJIXCIgKyAtMyAqIHIgKyBcIlpcIjtcbiAgICB9LFxuICAgIGRpYW1vbmQ6IGZ1bmN0aW9uKHNpemUpIHtcbiAgICAgIHZhciByeSA9IE1hdGguc3FydChzaXplIC8gKDIgKiBkM19zdmdfc3ltYm9sVGFuMzApKSwgcnggPSByeSAqIGQzX3N2Z19zeW1ib2xUYW4zMDtcbiAgICAgIHJldHVybiBcIk0wLFwiICsgLXJ5ICsgXCJMXCIgKyByeCArIFwiLDBcIiArIFwiIDAsXCIgKyByeSArIFwiIFwiICsgLXJ4ICsgXCIsMFwiICsgXCJaXCI7XG4gICAgfSxcbiAgICBzcXVhcmU6IGZ1bmN0aW9uKHNpemUpIHtcbiAgICAgIHZhciByID0gTWF0aC5zcXJ0KHNpemUpIC8gMjtcbiAgICAgIHJldHVybiBcIk1cIiArIC1yICsgXCIsXCIgKyAtciArIFwiTFwiICsgciArIFwiLFwiICsgLXIgKyBcIiBcIiArIHIgKyBcIixcIiArIHIgKyBcIiBcIiArIC1yICsgXCIsXCIgKyByICsgXCJaXCI7XG4gICAgfSxcbiAgICBcInRyaWFuZ2xlLWRvd25cIjogZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgdmFyIHJ4ID0gTWF0aC5zcXJ0KHNpemUgLyBkM19zdmdfc3ltYm9sU3FydDMpLCByeSA9IHJ4ICogZDNfc3ZnX3N5bWJvbFNxcnQzIC8gMjtcbiAgICAgIHJldHVybiBcIk0wLFwiICsgcnkgKyBcIkxcIiArIHJ4ICsgXCIsXCIgKyAtcnkgKyBcIiBcIiArIC1yeCArIFwiLFwiICsgLXJ5ICsgXCJaXCI7XG4gICAgfSxcbiAgICBcInRyaWFuZ2xlLXVwXCI6IGZ1bmN0aW9uKHNpemUpIHtcbiAgICAgIHZhciByeCA9IE1hdGguc3FydChzaXplIC8gZDNfc3ZnX3N5bWJvbFNxcnQzKSwgcnkgPSByeCAqIGQzX3N2Z19zeW1ib2xTcXJ0MyAvIDI7XG4gICAgICByZXR1cm4gXCJNMCxcIiArIC1yeSArIFwiTFwiICsgcnggKyBcIixcIiArIHJ5ICsgXCIgXCIgKyAtcnggKyBcIixcIiArIHJ5ICsgXCJaXCI7XG4gICAgfVxuICB9KTtcbiAgZDMuc3ZnLnN5bWJvbFR5cGVzID0gZDNfc3ZnX3N5bWJvbHMua2V5cygpO1xuICB2YXIgZDNfc3ZnX3N5bWJvbFNxcnQzID0gTWF0aC5zcXJ0KDMpLCBkM19zdmdfc3ltYm9sVGFuMzAgPSBNYXRoLnRhbigzMCAqIGQzX3JhZGlhbnMpO1xuICBmdW5jdGlvbiBkM190cmFuc2l0aW9uKGdyb3VwcywgaWQpIHtcbiAgICBkM19zdWJjbGFzcyhncm91cHMsIGQzX3RyYW5zaXRpb25Qcm90b3R5cGUpO1xuICAgIGdyb3Vwcy5pZCA9IGlkO1xuICAgIHJldHVybiBncm91cHM7XG4gIH1cbiAgdmFyIGQzX3RyYW5zaXRpb25Qcm90b3R5cGUgPSBbXSwgZDNfdHJhbnNpdGlvbklkID0gMCwgZDNfdHJhbnNpdGlvbkluaGVyaXRJZCwgZDNfdHJhbnNpdGlvbkluaGVyaXQ7XG4gIGQzX3RyYW5zaXRpb25Qcm90b3R5cGUuY2FsbCA9IGQzX3NlbGVjdGlvblByb3RvdHlwZS5jYWxsO1xuICBkM190cmFuc2l0aW9uUHJvdG90eXBlLmVtcHR5ID0gZDNfc2VsZWN0aW9uUHJvdG90eXBlLmVtcHR5O1xuICBkM190cmFuc2l0aW9uUHJvdG90eXBlLm5vZGUgPSBkM19zZWxlY3Rpb25Qcm90b3R5cGUubm9kZTtcbiAgZDNfdHJhbnNpdGlvblByb3RvdHlwZS5zaXplID0gZDNfc2VsZWN0aW9uUHJvdG90eXBlLnNpemU7XG4gIGQzLnRyYW5zaXRpb24gPSBmdW5jdGlvbihzZWxlY3Rpb24pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IGQzX3RyYW5zaXRpb25Jbmhlcml0SWQgPyBzZWxlY3Rpb24udHJhbnNpdGlvbigpIDogc2VsZWN0aW9uIDogZDNfc2VsZWN0aW9uUm9vdC50cmFuc2l0aW9uKCk7XG4gIH07XG4gIGQzLnRyYW5zaXRpb24ucHJvdG90eXBlID0gZDNfdHJhbnNpdGlvblByb3RvdHlwZTtcbiAgZDNfdHJhbnNpdGlvblByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbihzZWxlY3Rvcikge1xuICAgIHZhciBpZCA9IHRoaXMuaWQsIHN1Ymdyb3VwcyA9IFtdLCBzdWJncm91cCwgc3Vibm9kZSwgbm9kZTtcbiAgICBzZWxlY3RvciA9IGQzX3NlbGVjdGlvbl9zZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgZm9yICh2YXIgaiA9IC0xLCBtID0gdGhpcy5sZW5ndGg7ICsraiA8IG07ICkge1xuICAgICAgc3ViZ3JvdXBzLnB1c2goc3ViZ3JvdXAgPSBbXSk7XG4gICAgICBmb3IgKHZhciBncm91cCA9IHRoaXNbal0sIGkgPSAtMSwgbiA9IGdyb3VwLmxlbmd0aDsgKytpIDwgbjsgKSB7XG4gICAgICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiAoc3Vibm9kZSA9IHNlbGVjdG9yLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgaikpKSB7XG4gICAgICAgICAgaWYgKFwiX19kYXRhX19cIiBpbiBub2RlKSBzdWJub2RlLl9fZGF0YV9fID0gbm9kZS5fX2RhdGFfXztcbiAgICAgICAgICBkM190cmFuc2l0aW9uTm9kZShzdWJub2RlLCBpLCBpZCwgbm9kZS5fX3RyYW5zaXRpb25fX1tpZF0pO1xuICAgICAgICAgIHN1Ymdyb3VwLnB1c2goc3Vibm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3ViZ3JvdXAucHVzaChudWxsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZDNfdHJhbnNpdGlvbihzdWJncm91cHMsIGlkKTtcbiAgfTtcbiAgZDNfdHJhbnNpdGlvblByb3RvdHlwZS5zZWxlY3RBbGwgPSBmdW5jdGlvbihzZWxlY3Rvcikge1xuICAgIHZhciBpZCA9IHRoaXMuaWQsIHN1Ymdyb3VwcyA9IFtdLCBzdWJncm91cCwgc3Vibm9kZXMsIG5vZGUsIHN1Ym5vZGUsIHRyYW5zaXRpb247XG4gICAgc2VsZWN0b3IgPSBkM19zZWxlY3Rpb25fc2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgIGZvciAodmFyIGogPSAtMSwgbSA9IHRoaXMubGVuZ3RoOyArK2ogPCBtOyApIHtcbiAgICAgIGZvciAodmFyIGdyb3VwID0gdGhpc1tqXSwgaSA9IC0xLCBuID0gZ3JvdXAubGVuZ3RoOyArK2kgPCBuOyApIHtcbiAgICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICAgIHRyYW5zaXRpb24gPSBub2RlLl9fdHJhbnNpdGlvbl9fW2lkXTtcbiAgICAgICAgICBzdWJub2RlcyA9IHNlbGVjdG9yLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgaik7XG4gICAgICAgICAgc3ViZ3JvdXBzLnB1c2goc3ViZ3JvdXAgPSBbXSk7XG4gICAgICAgICAgZm9yICh2YXIgayA9IC0xLCBvID0gc3Vibm9kZXMubGVuZ3RoOyArK2sgPCBvOyApIHtcbiAgICAgICAgICAgIGlmIChzdWJub2RlID0gc3Vibm9kZXNba10pIGQzX3RyYW5zaXRpb25Ob2RlKHN1Ym5vZGUsIGssIGlkLCB0cmFuc2l0aW9uKTtcbiAgICAgICAgICAgIHN1Ymdyb3VwLnB1c2goc3Vibm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkM190cmFuc2l0aW9uKHN1Ymdyb3VwcywgaWQpO1xuICB9O1xuICBkM190cmFuc2l0aW9uUHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uKGZpbHRlcikge1xuICAgIHZhciBzdWJncm91cHMgPSBbXSwgc3ViZ3JvdXAsIGdyb3VwLCBub2RlO1xuICAgIGlmICh0eXBlb2YgZmlsdGVyICE9PSBcImZ1bmN0aW9uXCIpIGZpbHRlciA9IGQzX3NlbGVjdGlvbl9maWx0ZXIoZmlsdGVyKTtcbiAgICBmb3IgKHZhciBqID0gMCwgbSA9IHRoaXMubGVuZ3RoOyBqIDwgbTsgaisrKSB7XG4gICAgICBzdWJncm91cHMucHVzaChzdWJncm91cCA9IFtdKTtcbiAgICAgIGZvciAodmFyIGdyb3VwID0gdGhpc1tqXSwgaSA9IDAsIG4gPSBncm91cC5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgaWYgKChub2RlID0gZ3JvdXBbaV0pICYmIGZpbHRlci5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGkpKSB7XG4gICAgICAgICAgc3ViZ3JvdXAucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZDNfdHJhbnNpdGlvbihzdWJncm91cHMsIHRoaXMuaWQpO1xuICB9O1xuICBkM190cmFuc2l0aW9uUHJvdG90eXBlLnR3ZWVuID0gZnVuY3Rpb24obmFtZSwgdHdlZW4pIHtcbiAgICB2YXIgaWQgPSB0aGlzLmlkO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikgcmV0dXJuIHRoaXMubm9kZSgpLl9fdHJhbnNpdGlvbl9fW2lkXS50d2Vlbi5nZXQobmFtZSk7XG4gICAgcmV0dXJuIGQzX3NlbGVjdGlvbl9lYWNoKHRoaXMsIHR3ZWVuID09IG51bGwgPyBmdW5jdGlvbihub2RlKSB7XG4gICAgICBub2RlLl9fdHJhbnNpdGlvbl9fW2lkXS50d2Vlbi5yZW1vdmUobmFtZSk7XG4gICAgfSA6IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIG5vZGUuX190cmFuc2l0aW9uX19baWRdLnR3ZWVuLnNldChuYW1lLCB0d2Vlbik7XG4gICAgfSk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3RyYW5zaXRpb25fdHdlZW4oZ3JvdXBzLCBuYW1lLCB2YWx1ZSwgdHdlZW4pIHtcbiAgICB2YXIgaWQgPSBncm91cHMuaWQ7XG4gICAgcmV0dXJuIGQzX3NlbGVjdGlvbl9lYWNoKGdyb3VwcywgdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgPyBmdW5jdGlvbihub2RlLCBpLCBqKSB7XG4gICAgICBub2RlLl9fdHJhbnNpdGlvbl9fW2lkXS50d2Vlbi5zZXQobmFtZSwgdHdlZW4odmFsdWUuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBqKSkpO1xuICAgIH0gOiAodmFsdWUgPSB0d2Vlbih2YWx1ZSksIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIG5vZGUuX190cmFuc2l0aW9uX19baWRdLnR3ZWVuLnNldChuYW1lLCB2YWx1ZSk7XG4gICAgfSkpO1xuICB9XG4gIGQzX3RyYW5zaXRpb25Qcm90b3R5cGUuYXR0ciA9IGZ1bmN0aW9uKG5hbWVOUywgdmFsdWUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgIGZvciAodmFsdWUgaW4gbmFtZU5TKSB0aGlzLmF0dHIodmFsdWUsIG5hbWVOU1t2YWx1ZV0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHZhciBpbnRlcnBvbGF0ZSA9IG5hbWVOUyA9PSBcInRyYW5zZm9ybVwiID8gZDNfaW50ZXJwb2xhdGVUcmFuc2Zvcm0gOiBkM19pbnRlcnBvbGF0ZSwgbmFtZSA9IGQzLm5zLnF1YWxpZnkobmFtZU5TKTtcbiAgICBmdW5jdGlvbiBhdHRyTnVsbCgpIHtcbiAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhdHRyTnVsbE5TKCkge1xuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGVOUyhuYW1lLnNwYWNlLCBuYW1lLmxvY2FsKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYXR0clR3ZWVuKGIpIHtcbiAgICAgIHJldHVybiBiID09IG51bGwgPyBhdHRyTnVsbCA6IChiICs9IFwiXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYSA9IHRoaXMuZ2V0QXR0cmlidXRlKG5hbWUpLCBpO1xuICAgICAgICByZXR1cm4gYSAhPT0gYiAmJiAoaSA9IGludGVycG9sYXRlKGEsIGIpLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgaSh0KSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGF0dHJUd2Vlbk5TKGIpIHtcbiAgICAgIHJldHVybiBiID09IG51bGwgPyBhdHRyTnVsbE5TIDogKGIgKz0gXCJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhID0gdGhpcy5nZXRBdHRyaWJ1dGVOUyhuYW1lLnNwYWNlLCBuYW1lLmxvY2FsKSwgaTtcbiAgICAgICAgcmV0dXJuIGEgIT09IGIgJiYgKGkgPSBpbnRlcnBvbGF0ZShhLCBiKSwgZnVuY3Rpb24odCkge1xuICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlTlMobmFtZS5zcGFjZSwgbmFtZS5sb2NhbCwgaSh0KSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBkM190cmFuc2l0aW9uX3R3ZWVuKHRoaXMsIFwiYXR0ci5cIiArIG5hbWVOUywgdmFsdWUsIG5hbWUubG9jYWwgPyBhdHRyVHdlZW5OUyA6IGF0dHJUd2Vlbik7XG4gIH07XG4gIGQzX3RyYW5zaXRpb25Qcm90b3R5cGUuYXR0clR3ZWVuID0gZnVuY3Rpb24obmFtZU5TLCB0d2Vlbikge1xuICAgIHZhciBuYW1lID0gZDMubnMucXVhbGlmeShuYW1lTlMpO1xuICAgIGZ1bmN0aW9uIGF0dHJUd2VlbihkLCBpKSB7XG4gICAgICB2YXIgZiA9IHR3ZWVuLmNhbGwodGhpcywgZCwgaSwgdGhpcy5nZXRBdHRyaWJ1dGUobmFtZSkpO1xuICAgICAgcmV0dXJuIGYgJiYgZnVuY3Rpb24odCkge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCBmKHQpKTtcbiAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGF0dHJUd2Vlbk5TKGQsIGkpIHtcbiAgICAgIHZhciBmID0gdHdlZW4uY2FsbCh0aGlzLCBkLCBpLCB0aGlzLmdldEF0dHJpYnV0ZU5TKG5hbWUuc3BhY2UsIG5hbWUubG9jYWwpKTtcbiAgICAgIHJldHVybiBmICYmIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGVOUyhuYW1lLnNwYWNlLCBuYW1lLmxvY2FsLCBmKHQpKTtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnR3ZWVuKFwiYXR0ci5cIiArIG5hbWVOUywgbmFtZS5sb2NhbCA/IGF0dHJUd2Vlbk5TIDogYXR0clR3ZWVuKTtcbiAgfTtcbiAgZDNfdHJhbnNpdGlvblByb3RvdHlwZS5zdHlsZSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICAgIHZhciBuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBpZiAobiA8IDMpIHtcbiAgICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAobiA8IDIpIHZhbHVlID0gXCJcIjtcbiAgICAgICAgZm9yIChwcmlvcml0eSBpbiBuYW1lKSB0aGlzLnN0eWxlKHByaW9yaXR5LCBuYW1lW3ByaW9yaXR5XSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIHByaW9yaXR5ID0gXCJcIjtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3R5bGVOdWxsKCkge1xuICAgICAgdGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShuYW1lKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3R5bGVTdHJpbmcoYikge1xuICAgICAgcmV0dXJuIGIgPT0gbnVsbCA/IHN0eWxlTnVsbCA6IChiICs9IFwiXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYSA9IGQzX3dpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMsIG51bGwpLmdldFByb3BlcnR5VmFsdWUobmFtZSksIGk7XG4gICAgICAgIHJldHVybiBhICE9PSBiICYmIChpID0gZDNfaW50ZXJwb2xhdGUoYSwgYiksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIGkodCksIHByaW9yaXR5KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGQzX3RyYW5zaXRpb25fdHdlZW4odGhpcywgXCJzdHlsZS5cIiArIG5hbWUsIHZhbHVlLCBzdHlsZVN0cmluZyk7XG4gIH07XG4gIGQzX3RyYW5zaXRpb25Qcm90b3R5cGUuc3R5bGVUd2VlbiA9IGZ1bmN0aW9uKG5hbWUsIHR3ZWVuLCBwcmlvcml0eSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykgcHJpb3JpdHkgPSBcIlwiO1xuICAgIGZ1bmN0aW9uIHN0eWxlVHdlZW4oZCwgaSkge1xuICAgICAgdmFyIGYgPSB0d2Vlbi5jYWxsKHRoaXMsIGQsIGksIGQzX3dpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMsIG51bGwpLmdldFByb3BlcnR5VmFsdWUobmFtZSkpO1xuICAgICAgcmV0dXJuIGYgJiYgZnVuY3Rpb24odCkge1xuICAgICAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIGYodCksIHByaW9yaXR5KTtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnR3ZWVuKFwic3R5bGUuXCIgKyBuYW1lLCBzdHlsZVR3ZWVuKTtcbiAgfTtcbiAgZDNfdHJhbnNpdGlvblByb3RvdHlwZS50ZXh0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZDNfdHJhbnNpdGlvbl90d2Vlbih0aGlzLCBcInRleHRcIiwgdmFsdWUsIGQzX3RyYW5zaXRpb25fdGV4dCk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3RyYW5zaXRpb25fdGV4dChiKSB7XG4gICAgaWYgKGIgPT0gbnVsbCkgYiA9IFwiXCI7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy50ZXh0Q29udGVudCA9IGI7XG4gICAgfTtcbiAgfVxuICBkM190cmFuc2l0aW9uUHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmVhY2goXCJlbmQudHJhbnNpdGlvblwiLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwO1xuICAgICAgaWYgKCF0aGlzLl9fdHJhbnNpdGlvbl9fICYmIChwID0gdGhpcy5wYXJlbnROb2RlKSkgcC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICB9KTtcbiAgfTtcbiAgZDNfdHJhbnNpdGlvblByb3RvdHlwZS5lYXNlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgaWQgPSB0aGlzLmlkO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMSkgcmV0dXJuIHRoaXMubm9kZSgpLl9fdHJhbnNpdGlvbl9fW2lkXS5lYXNlO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdmFsdWUgPSBkMy5lYXNlLmFwcGx5KGQzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiBkM19zZWxlY3Rpb25fZWFjaCh0aGlzLCBmdW5jdGlvbihub2RlKSB7XG4gICAgICBub2RlLl9fdHJhbnNpdGlvbl9fW2lkXS5lYXNlID0gdmFsdWU7XG4gICAgfSk7XG4gIH07XG4gIGQzX3RyYW5zaXRpb25Qcm90b3R5cGUuZGVsYXkgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciBpZCA9IHRoaXMuaWQ7XG4gICAgcmV0dXJuIGQzX3NlbGVjdGlvbl9lYWNoKHRoaXMsIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gZnVuY3Rpb24obm9kZSwgaSwgaikge1xuICAgICAgbm9kZS5fX3RyYW5zaXRpb25fX1tpZF0uZGVsYXkgPSB2YWx1ZS5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGopIHwgMDtcbiAgICB9IDogKHZhbHVlIHw9IDAsIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIG5vZGUuX190cmFuc2l0aW9uX19baWRdLmRlbGF5ID0gdmFsdWU7XG4gICAgfSkpO1xuICB9O1xuICBkM190cmFuc2l0aW9uUHJvdG90eXBlLmR1cmF0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgaWQgPSB0aGlzLmlkO1xuICAgIHJldHVybiBkM19zZWxlY3Rpb25fZWFjaCh0aGlzLCB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiA/IGZ1bmN0aW9uKG5vZGUsIGksIGopIHtcbiAgICAgIG5vZGUuX190cmFuc2l0aW9uX19baWRdLmR1cmF0aW9uID0gTWF0aC5tYXgoMSwgdmFsdWUuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBqKSB8IDApO1xuICAgIH0gOiAodmFsdWUgPSBNYXRoLm1heCgxLCB2YWx1ZSB8IDApLCBmdW5jdGlvbihub2RlKSB7XG4gICAgICBub2RlLl9fdHJhbnNpdGlvbl9fW2lkXS5kdXJhdGlvbiA9IHZhbHVlO1xuICAgIH0pKTtcbiAgfTtcbiAgZDNfdHJhbnNpdGlvblByb3RvdHlwZS5lYWNoID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgICB2YXIgaWQgPSB0aGlzLmlkO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgdmFyIGluaGVyaXQgPSBkM190cmFuc2l0aW9uSW5oZXJpdCwgaW5oZXJpdElkID0gZDNfdHJhbnNpdGlvbkluaGVyaXRJZDtcbiAgICAgIGQzX3RyYW5zaXRpb25Jbmhlcml0SWQgPSBpZDtcbiAgICAgIGQzX3NlbGVjdGlvbl9lYWNoKHRoaXMsIGZ1bmN0aW9uKG5vZGUsIGksIGopIHtcbiAgICAgICAgZDNfdHJhbnNpdGlvbkluaGVyaXQgPSBub2RlLl9fdHJhbnNpdGlvbl9fW2lkXTtcbiAgICAgICAgdHlwZS5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGopO1xuICAgICAgfSk7XG4gICAgICBkM190cmFuc2l0aW9uSW5oZXJpdCA9IGluaGVyaXQ7XG4gICAgICBkM190cmFuc2l0aW9uSW5oZXJpdElkID0gaW5oZXJpdElkO1xuICAgIH0gZWxzZSB7XG4gICAgICBkM19zZWxlY3Rpb25fZWFjaCh0aGlzLCBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIHZhciB0cmFuc2l0aW9uID0gbm9kZS5fX3RyYW5zaXRpb25fX1tpZF07XG4gICAgICAgICh0cmFuc2l0aW9uLmV2ZW50IHx8ICh0cmFuc2l0aW9uLmV2ZW50ID0gZDMuZGlzcGF0Y2goXCJzdGFydFwiLCBcImVuZFwiKSkpLm9uKHR5cGUsIGxpc3RlbmVyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgZDNfdHJhbnNpdGlvblByb3RvdHlwZS50cmFuc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGlkMCA9IHRoaXMuaWQsIGlkMSA9ICsrZDNfdHJhbnNpdGlvbklkLCBzdWJncm91cHMgPSBbXSwgc3ViZ3JvdXAsIGdyb3VwLCBub2RlLCB0cmFuc2l0aW9uO1xuICAgIGZvciAodmFyIGogPSAwLCBtID0gdGhpcy5sZW5ndGg7IGogPCBtOyBqKyspIHtcbiAgICAgIHN1Ymdyb3Vwcy5wdXNoKHN1Ymdyb3VwID0gW10pO1xuICAgICAgZm9yICh2YXIgZ3JvdXAgPSB0aGlzW2pdLCBpID0gMCwgbiA9IGdyb3VwLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgICAgdHJhbnNpdGlvbiA9IE9iamVjdC5jcmVhdGUobm9kZS5fX3RyYW5zaXRpb25fX1tpZDBdKTtcbiAgICAgICAgICB0cmFuc2l0aW9uLmRlbGF5ICs9IHRyYW5zaXRpb24uZHVyYXRpb247XG4gICAgICAgICAgZDNfdHJhbnNpdGlvbk5vZGUobm9kZSwgaSwgaWQxLCB0cmFuc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBzdWJncm91cC5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZDNfdHJhbnNpdGlvbihzdWJncm91cHMsIGlkMSk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX3RyYW5zaXRpb25Ob2RlKG5vZGUsIGksIGlkLCBpbmhlcml0KSB7XG4gICAgdmFyIGxvY2sgPSBub2RlLl9fdHJhbnNpdGlvbl9fIHx8IChub2RlLl9fdHJhbnNpdGlvbl9fID0ge1xuICAgICAgYWN0aXZlOiAwLFxuICAgICAgY291bnQ6IDBcbiAgICB9KSwgdHJhbnNpdGlvbiA9IGxvY2tbaWRdO1xuICAgIGlmICghdHJhbnNpdGlvbikge1xuICAgICAgdmFyIHRpbWUgPSBpbmhlcml0LnRpbWU7XG4gICAgICB0cmFuc2l0aW9uID0gbG9ja1tpZF0gPSB7XG4gICAgICAgIHR3ZWVuOiBuZXcgZDNfTWFwKCksXG4gICAgICAgIHRpbWU6IHRpbWUsXG4gICAgICAgIGVhc2U6IGluaGVyaXQuZWFzZSxcbiAgICAgICAgZGVsYXk6IGluaGVyaXQuZGVsYXksXG4gICAgICAgIGR1cmF0aW9uOiBpbmhlcml0LmR1cmF0aW9uXG4gICAgICB9O1xuICAgICAgKytsb2NrLmNvdW50O1xuICAgICAgZDMudGltZXIoZnVuY3Rpb24oZWxhcHNlZCkge1xuICAgICAgICB2YXIgZCA9IG5vZGUuX19kYXRhX18sIGVhc2UgPSB0cmFuc2l0aW9uLmVhc2UsIGRlbGF5ID0gdHJhbnNpdGlvbi5kZWxheSwgZHVyYXRpb24gPSB0cmFuc2l0aW9uLmR1cmF0aW9uLCB0d2VlbmVkID0gW107XG4gICAgICAgIGlmIChkZWxheSA8PSBlbGFwc2VkKSByZXR1cm4gc3RhcnQoZWxhcHNlZCk7XG4gICAgICAgIGQzX3RpbWVyX3JlcGxhY2Uoc3RhcnQsIGRlbGF5LCB0aW1lKTtcbiAgICAgICAgZnVuY3Rpb24gc3RhcnQoZWxhcHNlZCkge1xuICAgICAgICAgIGlmIChsb2NrLmFjdGl2ZSA+IGlkKSByZXR1cm4gc3RvcCgpO1xuICAgICAgICAgIGxvY2suYWN0aXZlID0gaWQ7XG4gICAgICAgICAgdHJhbnNpdGlvbi5ldmVudCAmJiB0cmFuc2l0aW9uLmV2ZW50LnN0YXJ0LmNhbGwobm9kZSwgZCwgaSk7XG4gICAgICAgICAgdHJhbnNpdGlvbi50d2Vlbi5mb3JFYWNoKGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9IHZhbHVlLmNhbGwobm9kZSwgZCwgaSkpIHtcbiAgICAgICAgICAgICAgdHdlZW5lZC5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAodGljayhlbGFwc2VkKSkgcmV0dXJuIDE7XG4gICAgICAgICAgZDNfdGltZXJfcmVwbGFjZSh0aWNrLCAwLCB0aW1lKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB0aWNrKGVsYXBzZWQpIHtcbiAgICAgICAgICBpZiAobG9jay5hY3RpdmUgIT09IGlkKSByZXR1cm4gc3RvcCgpO1xuICAgICAgICAgIHZhciB0ID0gKGVsYXBzZWQgLSBkZWxheSkgLyBkdXJhdGlvbiwgZSA9IGVhc2UodCksIG4gPSB0d2VlbmVkLmxlbmd0aDtcbiAgICAgICAgICB3aGlsZSAobiA+IDApIHtcbiAgICAgICAgICAgIHR3ZWVuZWRbLS1uXS5jYWxsKG5vZGUsIGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodCA+PSAxKSB7XG4gICAgICAgICAgICBzdG9wKCk7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmV2ZW50ICYmIHRyYW5zaXRpb24uZXZlbnQuZW5kLmNhbGwobm9kZSwgZCwgaSk7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgICBpZiAoLS1sb2NrLmNvdW50KSBkZWxldGUgbG9ja1tpZF07IGVsc2UgZGVsZXRlIG5vZGUuX190cmFuc2l0aW9uX187XG4gICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgIH0sIDAsIHRpbWUpO1xuICAgIH1cbiAgfVxuICBkMy5zdmcuYXhpcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2FsZSA9IGQzLnNjYWxlLmxpbmVhcigpLCBvcmllbnQgPSBkM19zdmdfYXhpc0RlZmF1bHRPcmllbnQsIHRpY2tNYWpvclNpemUgPSA2LCB0aWNrTWlub3JTaXplID0gNiwgdGlja0VuZFNpemUgPSA2LCB0aWNrUGFkZGluZyA9IDMsIHRpY2tBcmd1bWVudHNfID0gWyAxMCBdLCB0aWNrVmFsdWVzID0gbnVsbCwgdGlja0Zvcm1hdF8sIHRpY2tTdWJkaXZpZGUgPSAwO1xuICAgIGZ1bmN0aW9uIGF4aXMoZykge1xuICAgICAgZy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZyA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgdmFyIHRpY2tzID0gdGlja1ZhbHVlcyA9PSBudWxsID8gc2NhbGUudGlja3MgPyBzY2FsZS50aWNrcy5hcHBseShzY2FsZSwgdGlja0FyZ3VtZW50c18pIDogc2NhbGUuZG9tYWluKCkgOiB0aWNrVmFsdWVzLCB0aWNrRm9ybWF0ID0gdGlja0Zvcm1hdF8gPT0gbnVsbCA/IHNjYWxlLnRpY2tGb3JtYXQgPyBzY2FsZS50aWNrRm9ybWF0LmFwcGx5KHNjYWxlLCB0aWNrQXJndW1lbnRzXykgOiBTdHJpbmcgOiB0aWNrRm9ybWF0XztcbiAgICAgICAgdmFyIHN1YnRpY2tzID0gZDNfc3ZnX2F4aXNTdWJkaXZpZGUoc2NhbGUsIHRpY2tzLCB0aWNrU3ViZGl2aWRlKSwgc3VidGljayA9IGcuc2VsZWN0QWxsKFwiLnRpY2subWlub3JcIikuZGF0YShzdWJ0aWNrcywgU3RyaW5nKSwgc3VidGlja0VudGVyID0gc3VidGljay5lbnRlcigpLmluc2VydChcImxpbmVcIiwgXCIudGlja1wiKS5hdHRyKFwiY2xhc3NcIiwgXCJ0aWNrIG1pbm9yXCIpLnN0eWxlKFwib3BhY2l0eVwiLCAxZS02KSwgc3VidGlja0V4aXQgPSBkMy50cmFuc2l0aW9uKHN1YnRpY2suZXhpdCgpKS5zdHlsZShcIm9wYWNpdHlcIiwgMWUtNikucmVtb3ZlKCksIHN1YnRpY2tVcGRhdGUgPSBkMy50cmFuc2l0aW9uKHN1YnRpY2spLnN0eWxlKFwib3BhY2l0eVwiLCAxKTtcbiAgICAgICAgdmFyIHRpY2sgPSBnLnNlbGVjdEFsbChcIi50aWNrLm1ham9yXCIpLmRhdGEodGlja3MsIFN0cmluZyksIHRpY2tFbnRlciA9IHRpY2suZW50ZXIoKS5pbnNlcnQoXCJnXCIsIFwiLmRvbWFpblwiKS5hdHRyKFwiY2xhc3NcIiwgXCJ0aWNrIG1ham9yXCIpLnN0eWxlKFwib3BhY2l0eVwiLCAxZS02KSwgdGlja0V4aXQgPSBkMy50cmFuc2l0aW9uKHRpY2suZXhpdCgpKS5zdHlsZShcIm9wYWNpdHlcIiwgMWUtNikucmVtb3ZlKCksIHRpY2tVcGRhdGUgPSBkMy50cmFuc2l0aW9uKHRpY2spLnN0eWxlKFwib3BhY2l0eVwiLCAxKSwgdGlja1RyYW5zZm9ybTtcbiAgICAgICAgdmFyIHJhbmdlID0gZDNfc2NhbGVSYW5nZShzY2FsZSksIHBhdGggPSBnLnNlbGVjdEFsbChcIi5kb21haW5cIikuZGF0YShbIDAgXSksIHBhdGhVcGRhdGUgPSAocGF0aC5lbnRlcigpLmFwcGVuZChcInBhdGhcIikuYXR0cihcImNsYXNzXCIsIFwiZG9tYWluXCIpLCBcbiAgICAgICAgZDMudHJhbnNpdGlvbihwYXRoKSk7XG4gICAgICAgIHZhciBzY2FsZTEgPSBzY2FsZS5jb3B5KCksIHNjYWxlMCA9IHRoaXMuX19jaGFydF9fIHx8IHNjYWxlMTtcbiAgICAgICAgdGhpcy5fX2NoYXJ0X18gPSBzY2FsZTE7XG4gICAgICAgIHRpY2tFbnRlci5hcHBlbmQoXCJsaW5lXCIpO1xuICAgICAgICB0aWNrRW50ZXIuYXBwZW5kKFwidGV4dFwiKTtcbiAgICAgICAgdmFyIGxpbmVFbnRlciA9IHRpY2tFbnRlci5zZWxlY3QoXCJsaW5lXCIpLCBsaW5lVXBkYXRlID0gdGlja1VwZGF0ZS5zZWxlY3QoXCJsaW5lXCIpLCB0ZXh0ID0gdGljay5zZWxlY3QoXCJ0ZXh0XCIpLnRleHQodGlja0Zvcm1hdCksIHRleHRFbnRlciA9IHRpY2tFbnRlci5zZWxlY3QoXCJ0ZXh0XCIpLCB0ZXh0VXBkYXRlID0gdGlja1VwZGF0ZS5zZWxlY3QoXCJ0ZXh0XCIpO1xuICAgICAgICBzd2l0Y2ggKG9yaWVudCkge1xuICAgICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRpY2tUcmFuc2Zvcm0gPSBkM19zdmdfYXhpc1g7XG4gICAgICAgICAgICBzdWJ0aWNrRW50ZXIuYXR0cihcInkyXCIsIHRpY2tNaW5vclNpemUpO1xuICAgICAgICAgICAgc3VidGlja1VwZGF0ZS5hdHRyKFwieDJcIiwgMCkuYXR0cihcInkyXCIsIHRpY2tNaW5vclNpemUpO1xuICAgICAgICAgICAgbGluZUVudGVyLmF0dHIoXCJ5MlwiLCB0aWNrTWFqb3JTaXplKTtcbiAgICAgICAgICAgIHRleHRFbnRlci5hdHRyKFwieVwiLCBNYXRoLm1heCh0aWNrTWFqb3JTaXplLCAwKSArIHRpY2tQYWRkaW5nKTtcbiAgICAgICAgICAgIGxpbmVVcGRhdGUuYXR0cihcIngyXCIsIDApLmF0dHIoXCJ5MlwiLCB0aWNrTWFqb3JTaXplKTtcbiAgICAgICAgICAgIHRleHRVcGRhdGUuYXR0cihcInhcIiwgMCkuYXR0cihcInlcIiwgTWF0aC5tYXgodGlja01ham9yU2l6ZSwgMCkgKyB0aWNrUGFkZGluZyk7XG4gICAgICAgICAgICB0ZXh0LmF0dHIoXCJkeVwiLCBcIi43MWVtXCIpLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIik7XG4gICAgICAgICAgICBwYXRoVXBkYXRlLmF0dHIoXCJkXCIsIFwiTVwiICsgcmFuZ2VbMF0gKyBcIixcIiArIHRpY2tFbmRTaXplICsgXCJWMEhcIiArIHJhbmdlWzFdICsgXCJWXCIgKyB0aWNrRW5kU2l6ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aWNrVHJhbnNmb3JtID0gZDNfc3ZnX2F4aXNYO1xuICAgICAgICAgICAgc3VidGlja0VudGVyLmF0dHIoXCJ5MlwiLCAtdGlja01pbm9yU2l6ZSk7XG4gICAgICAgICAgICBzdWJ0aWNrVXBkYXRlLmF0dHIoXCJ4MlwiLCAwKS5hdHRyKFwieTJcIiwgLXRpY2tNaW5vclNpemUpO1xuICAgICAgICAgICAgbGluZUVudGVyLmF0dHIoXCJ5MlwiLCAtdGlja01ham9yU2l6ZSk7XG4gICAgICAgICAgICB0ZXh0RW50ZXIuYXR0cihcInlcIiwgLShNYXRoLm1heCh0aWNrTWFqb3JTaXplLCAwKSArIHRpY2tQYWRkaW5nKSk7XG4gICAgICAgICAgICBsaW5lVXBkYXRlLmF0dHIoXCJ4MlwiLCAwKS5hdHRyKFwieTJcIiwgLXRpY2tNYWpvclNpemUpO1xuICAgICAgICAgICAgdGV4dFVwZGF0ZS5hdHRyKFwieFwiLCAwKS5hdHRyKFwieVwiLCAtKE1hdGgubWF4KHRpY2tNYWpvclNpemUsIDApICsgdGlja1BhZGRpbmcpKTtcbiAgICAgICAgICAgIHRleHQuYXR0cihcImR5XCIsIFwiMGVtXCIpLnN0eWxlKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIik7XG4gICAgICAgICAgICBwYXRoVXBkYXRlLmF0dHIoXCJkXCIsIFwiTVwiICsgcmFuZ2VbMF0gKyBcIixcIiArIC10aWNrRW5kU2l6ZSArIFwiVjBIXCIgKyByYW5nZVsxXSArIFwiVlwiICsgLXRpY2tFbmRTaXplKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aWNrVHJhbnNmb3JtID0gZDNfc3ZnX2F4aXNZO1xuICAgICAgICAgICAgc3VidGlja0VudGVyLmF0dHIoXCJ4MlwiLCAtdGlja01pbm9yU2l6ZSk7XG4gICAgICAgICAgICBzdWJ0aWNrVXBkYXRlLmF0dHIoXCJ4MlwiLCAtdGlja01pbm9yU2l6ZSkuYXR0cihcInkyXCIsIDApO1xuICAgICAgICAgICAgbGluZUVudGVyLmF0dHIoXCJ4MlwiLCAtdGlja01ham9yU2l6ZSk7XG4gICAgICAgICAgICB0ZXh0RW50ZXIuYXR0cihcInhcIiwgLShNYXRoLm1heCh0aWNrTWFqb3JTaXplLCAwKSArIHRpY2tQYWRkaW5nKSk7XG4gICAgICAgICAgICBsaW5lVXBkYXRlLmF0dHIoXCJ4MlwiLCAtdGlja01ham9yU2l6ZSkuYXR0cihcInkyXCIsIDApO1xuICAgICAgICAgICAgdGV4dFVwZGF0ZS5hdHRyKFwieFwiLCAtKE1hdGgubWF4KHRpY2tNYWpvclNpemUsIDApICsgdGlja1BhZGRpbmcpKS5hdHRyKFwieVwiLCAwKTtcbiAgICAgICAgICAgIHRleHQuYXR0cihcImR5XCIsIFwiLjMyZW1cIikuc3R5bGUoXCJ0ZXh0LWFuY2hvclwiLCBcImVuZFwiKTtcbiAgICAgICAgICAgIHBhdGhVcGRhdGUuYXR0cihcImRcIiwgXCJNXCIgKyAtdGlja0VuZFNpemUgKyBcIixcIiArIHJhbmdlWzBdICsgXCJIMFZcIiArIHJhbmdlWzFdICsgXCJIXCIgKyAtdGlja0VuZFNpemUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aWNrVHJhbnNmb3JtID0gZDNfc3ZnX2F4aXNZO1xuICAgICAgICAgICAgc3VidGlja0VudGVyLmF0dHIoXCJ4MlwiLCB0aWNrTWlub3JTaXplKTtcbiAgICAgICAgICAgIHN1YnRpY2tVcGRhdGUuYXR0cihcIngyXCIsIHRpY2tNaW5vclNpemUpLmF0dHIoXCJ5MlwiLCAwKTtcbiAgICAgICAgICAgIGxpbmVFbnRlci5hdHRyKFwieDJcIiwgdGlja01ham9yU2l6ZSk7XG4gICAgICAgICAgICB0ZXh0RW50ZXIuYXR0cihcInhcIiwgTWF0aC5tYXgodGlja01ham9yU2l6ZSwgMCkgKyB0aWNrUGFkZGluZyk7XG4gICAgICAgICAgICBsaW5lVXBkYXRlLmF0dHIoXCJ4MlwiLCB0aWNrTWFqb3JTaXplKS5hdHRyKFwieTJcIiwgMCk7XG4gICAgICAgICAgICB0ZXh0VXBkYXRlLmF0dHIoXCJ4XCIsIE1hdGgubWF4KHRpY2tNYWpvclNpemUsIDApICsgdGlja1BhZGRpbmcpLmF0dHIoXCJ5XCIsIDApO1xuICAgICAgICAgICAgdGV4dC5hdHRyKFwiZHlcIiwgXCIuMzJlbVwiKS5zdHlsZShcInRleHQtYW5jaG9yXCIsIFwic3RhcnRcIik7XG4gICAgICAgICAgICBwYXRoVXBkYXRlLmF0dHIoXCJkXCIsIFwiTVwiICsgdGlja0VuZFNpemUgKyBcIixcIiArIHJhbmdlWzBdICsgXCJIMFZcIiArIHJhbmdlWzFdICsgXCJIXCIgKyB0aWNrRW5kU2l6ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjYWxlLnJhbmdlQmFuZCkge1xuICAgICAgICAgIHZhciBkeCA9IHNjYWxlMS5yYW5nZUJhbmQoKSAvIDIsIHggPSBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NhbGUxKGQpICsgZHg7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aWNrRW50ZXIuY2FsbCh0aWNrVHJhbnNmb3JtLCB4KTtcbiAgICAgICAgICB0aWNrVXBkYXRlLmNhbGwodGlja1RyYW5zZm9ybSwgeCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGlja0VudGVyLmNhbGwodGlja1RyYW5zZm9ybSwgc2NhbGUwKTtcbiAgICAgICAgICB0aWNrVXBkYXRlLmNhbGwodGlja1RyYW5zZm9ybSwgc2NhbGUxKTtcbiAgICAgICAgICB0aWNrRXhpdC5jYWxsKHRpY2tUcmFuc2Zvcm0sIHNjYWxlMSk7XG4gICAgICAgICAgc3VidGlja0VudGVyLmNhbGwodGlja1RyYW5zZm9ybSwgc2NhbGUwKTtcbiAgICAgICAgICBzdWJ0aWNrVXBkYXRlLmNhbGwodGlja1RyYW5zZm9ybSwgc2NhbGUxKTtcbiAgICAgICAgICBzdWJ0aWNrRXhpdC5jYWxsKHRpY2tUcmFuc2Zvcm0sIHNjYWxlMSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBheGlzLnNjYWxlID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2NhbGU7XG4gICAgICBzY2FsZSA9IHg7XG4gICAgICByZXR1cm4gYXhpcztcbiAgICB9O1xuICAgIGF4aXMub3JpZW50ID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3JpZW50O1xuICAgICAgb3JpZW50ID0geCBpbiBkM19zdmdfYXhpc09yaWVudHMgPyB4ICsgXCJcIiA6IGQzX3N2Z19heGlzRGVmYXVsdE9yaWVudDtcbiAgICAgIHJldHVybiBheGlzO1xuICAgIH07XG4gICAgYXhpcy50aWNrcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGlja0FyZ3VtZW50c187XG4gICAgICB0aWNrQXJndW1lbnRzXyA9IGFyZ3VtZW50cztcbiAgICAgIHJldHVybiBheGlzO1xuICAgIH07XG4gICAgYXhpcy50aWNrVmFsdWVzID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGlja1ZhbHVlcztcbiAgICAgIHRpY2tWYWx1ZXMgPSB4O1xuICAgICAgcmV0dXJuIGF4aXM7XG4gICAgfTtcbiAgICBheGlzLnRpY2tGb3JtYXQgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aWNrRm9ybWF0XztcbiAgICAgIHRpY2tGb3JtYXRfID0geDtcbiAgICAgIHJldHVybiBheGlzO1xuICAgIH07XG4gICAgYXhpcy50aWNrU2l6ZSA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRpY2tNYWpvclNpemU7XG4gICAgICB2YXIgbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuICAgICAgdGlja01ham9yU2l6ZSA9ICt4O1xuICAgICAgdGlja01pbm9yU2l6ZSA9IG4gPiAxID8gK3kgOiB0aWNrTWFqb3JTaXplO1xuICAgICAgdGlja0VuZFNpemUgPSBuID4gMCA/ICthcmd1bWVudHNbbl0gOiB0aWNrTWFqb3JTaXplO1xuICAgICAgcmV0dXJuIGF4aXM7XG4gICAgfTtcbiAgICBheGlzLnRpY2tQYWRkaW5nID0gZnVuY3Rpb24oeCkge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGlja1BhZGRpbmc7XG4gICAgICB0aWNrUGFkZGluZyA9ICt4O1xuICAgICAgcmV0dXJuIGF4aXM7XG4gICAgfTtcbiAgICBheGlzLnRpY2tTdWJkaXZpZGUgPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aWNrU3ViZGl2aWRlO1xuICAgICAgdGlja1N1YmRpdmlkZSA9ICt4O1xuICAgICAgcmV0dXJuIGF4aXM7XG4gICAgfTtcbiAgICByZXR1cm4gYXhpcztcbiAgfTtcbiAgdmFyIGQzX3N2Z19heGlzRGVmYXVsdE9yaWVudCA9IFwiYm90dG9tXCIsIGQzX3N2Z19heGlzT3JpZW50cyA9IHtcbiAgICB0b3A6IDEsXG4gICAgcmlnaHQ6IDEsXG4gICAgYm90dG9tOiAxLFxuICAgIGxlZnQ6IDFcbiAgfTtcbiAgZnVuY3Rpb24gZDNfc3ZnX2F4aXNYKHNlbGVjdGlvbiwgeCkge1xuICAgIHNlbGVjdGlvbi5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBcInRyYW5zbGF0ZShcIiArIHgoZCkgKyBcIiwwKVwiO1xuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3N2Z19heGlzWShzZWxlY3Rpb24sIHkpIHtcbiAgICBzZWxlY3Rpb24uYXR0cihcInRyYW5zZm9ybVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gXCJ0cmFuc2xhdGUoMCxcIiArIHkoZCkgKyBcIilcIjtcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBkM19zdmdfYXhpc1N1YmRpdmlkZShzY2FsZSwgdGlja3MsIG0pIHtcbiAgICBzdWJ0aWNrcyA9IFtdO1xuICAgIGlmIChtICYmIHRpY2tzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHZhciBleHRlbnQgPSBkM19zY2FsZUV4dGVudChzY2FsZS5kb21haW4oKSksIHN1YnRpY2tzLCBpID0gLTEsIG4gPSB0aWNrcy5sZW5ndGgsIGQgPSAodGlja3NbMV0gLSB0aWNrc1swXSkgLyArK20sIGosIHY7XG4gICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICBmb3IgKGogPSBtOyAtLWogPiAwOyApIHtcbiAgICAgICAgICBpZiAoKHYgPSArdGlja3NbaV0gLSBqICogZCkgPj0gZXh0ZW50WzBdKSB7XG4gICAgICAgICAgICBzdWJ0aWNrcy5wdXNoKHYpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yICgtLWksIGogPSAwOyArK2ogPCBtICYmICh2ID0gK3RpY2tzW2ldICsgaiAqIGQpIDwgZXh0ZW50WzFdOyApIHtcbiAgICAgICAgc3VidGlja3MucHVzaCh2KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN1YnRpY2tzO1xuICB9XG4gIGQzLnN2Zy5icnVzaCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBldmVudCA9IGQzX2V2ZW50RGlzcGF0Y2goYnJ1c2gsIFwiYnJ1c2hzdGFydFwiLCBcImJydXNoXCIsIFwiYnJ1c2hlbmRcIiksIHggPSBudWxsLCB5ID0gbnVsbCwgcmVzaXplcyA9IGQzX3N2Z19icnVzaFJlc2l6ZXNbMF0sIGV4dGVudCA9IFsgWyAwLCAwIF0sIFsgMCwgMCBdIF0sIGNsYW1wID0gWyB0cnVlLCB0cnVlIF0sIGV4dGVudERvbWFpbjtcbiAgICBmdW5jdGlvbiBicnVzaChnKSB7XG4gICAgICBnLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBnID0gZDMuc2VsZWN0KHRoaXMpLCBiZyA9IGcuc2VsZWN0QWxsKFwiLmJhY2tncm91bmRcIikuZGF0YShbIDAgXSksIGZnID0gZy5zZWxlY3RBbGwoXCIuZXh0ZW50XCIpLmRhdGEoWyAwIF0pLCB0eiA9IGcuc2VsZWN0QWxsKFwiLnJlc2l6ZVwiKS5kYXRhKHJlc2l6ZXMsIFN0cmluZyksIGU7XG4gICAgICAgIGcuc3R5bGUoXCJwb2ludGVyLWV2ZW50c1wiLCBcImFsbFwiKS5vbihcIm1vdXNlZG93bi5icnVzaFwiLCBicnVzaHN0YXJ0KS5vbihcInRvdWNoc3RhcnQuYnJ1c2hcIiwgYnJ1c2hzdGFydCk7XG4gICAgICAgIGJnLmVudGVyKCkuYXBwZW5kKFwicmVjdFwiKS5hdHRyKFwiY2xhc3NcIiwgXCJiYWNrZ3JvdW5kXCIpLnN0eWxlKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKS5zdHlsZShcImN1cnNvclwiLCBcImNyb3NzaGFpclwiKTtcbiAgICAgICAgZmcuZW50ZXIoKS5hcHBlbmQoXCJyZWN0XCIpLmF0dHIoXCJjbGFzc1wiLCBcImV4dGVudFwiKS5zdHlsZShcImN1cnNvclwiLCBcIm1vdmVcIik7XG4gICAgICAgIHR6LmVudGVyKCkuYXBwZW5kKFwiZ1wiKS5hdHRyKFwiY2xhc3NcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBcInJlc2l6ZSBcIiArIGQ7XG4gICAgICAgIH0pLnN0eWxlKFwiY3Vyc29yXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4gZDNfc3ZnX2JydXNoQ3Vyc29yW2RdO1xuICAgICAgICB9KS5hcHBlbmQoXCJyZWN0XCIpLmF0dHIoXCJ4XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4gL1tld10kLy50ZXN0KGQpID8gLTMgOiBudWxsO1xuICAgICAgICB9KS5hdHRyKFwieVwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIC9eW25zXS8udGVzdChkKSA/IC0zIDogbnVsbDtcbiAgICAgICAgfSkuYXR0cihcIndpZHRoXCIsIDYpLmF0dHIoXCJoZWlnaHRcIiwgNikuc3R5bGUoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpO1xuICAgICAgICB0ei5zdHlsZShcImRpc3BsYXlcIiwgYnJ1c2guZW1wdHkoKSA/IFwibm9uZVwiIDogbnVsbCk7XG4gICAgICAgIHR6LmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgaWYgKHgpIHtcbiAgICAgICAgICBlID0gZDNfc2NhbGVSYW5nZSh4KTtcbiAgICAgICAgICBiZy5hdHRyKFwieFwiLCBlWzBdKS5hdHRyKFwid2lkdGhcIiwgZVsxXSAtIGVbMF0pO1xuICAgICAgICAgIHJlZHJhd1goZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHkpIHtcbiAgICAgICAgICBlID0gZDNfc2NhbGVSYW5nZSh5KTtcbiAgICAgICAgICBiZy5hdHRyKFwieVwiLCBlWzBdKS5hdHRyKFwiaGVpZ2h0XCIsIGVbMV0gLSBlWzBdKTtcbiAgICAgICAgICByZWRyYXdZKGcpO1xuICAgICAgICB9XG4gICAgICAgIHJlZHJhdyhnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZWRyYXcoZykge1xuICAgICAgZy5zZWxlY3RBbGwoXCIucmVzaXplXCIpLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gXCJ0cmFuc2xhdGUoXCIgKyBleHRlbnRbKy9lJC8udGVzdChkKV1bMF0gKyBcIixcIiArIGV4dGVudFsrL15zLy50ZXN0KGQpXVsxXSArIFwiKVwiO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlZHJhd1goZykge1xuICAgICAgZy5zZWxlY3QoXCIuZXh0ZW50XCIpLmF0dHIoXCJ4XCIsIGV4dGVudFswXVswXSk7XG4gICAgICBnLnNlbGVjdEFsbChcIi5leHRlbnQsLm4+cmVjdCwucz5yZWN0XCIpLmF0dHIoXCJ3aWR0aFwiLCBleHRlbnRbMV1bMF0gLSBleHRlbnRbMF1bMF0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZWRyYXdZKGcpIHtcbiAgICAgIGcuc2VsZWN0KFwiLmV4dGVudFwiKS5hdHRyKFwieVwiLCBleHRlbnRbMF1bMV0pO1xuICAgICAgZy5zZWxlY3RBbGwoXCIuZXh0ZW50LC5lPnJlY3QsLnc+cmVjdFwiKS5hdHRyKFwiaGVpZ2h0XCIsIGV4dGVudFsxXVsxXSAtIGV4dGVudFswXVsxXSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJydXNoc3RhcnQoKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gdGhpcywgZXZlbnRUYXJnZXQgPSBkMy5zZWxlY3QoZDMuZXZlbnQudGFyZ2V0KSwgZXZlbnRfID0gZXZlbnQub2YodGFyZ2V0LCBhcmd1bWVudHMpLCBnID0gZDMuc2VsZWN0KHRhcmdldCksIHJlc2l6aW5nID0gZXZlbnRUYXJnZXQuZGF0dW0oKSwgcmVzaXppbmdYID0gIS9eKG58cykkLy50ZXN0KHJlc2l6aW5nKSAmJiB4LCByZXNpemluZ1kgPSAhL14oZXx3KSQvLnRlc3QocmVzaXppbmcpICYmIHksIGRyYWdnaW5nID0gZXZlbnRUYXJnZXQuY2xhc3NlZChcImV4dGVudFwiKSwgZHJhZ1Jlc3RvcmUgPSBkM19ldmVudF9kcmFnU3VwcHJlc3MoKSwgY2VudGVyLCBvcmlnaW4gPSBtb3VzZSgpLCBvZmZzZXQ7XG4gICAgICB2YXIgdyA9IGQzLnNlbGVjdChkM193aW5kb3cpLm9uKFwia2V5ZG93bi5icnVzaFwiLCBrZXlkb3duKS5vbihcImtleXVwLmJydXNoXCIsIGtleXVwKTtcbiAgICAgIGlmIChkMy5ldmVudC5jaGFuZ2VkVG91Y2hlcykge1xuICAgICAgICB3Lm9uKFwidG91Y2htb3ZlLmJydXNoXCIsIGJydXNobW92ZSkub24oXCJ0b3VjaGVuZC5icnVzaFwiLCBicnVzaGVuZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3Lm9uKFwibW91c2Vtb3ZlLmJydXNoXCIsIGJydXNobW92ZSkub24oXCJtb3VzZXVwLmJydXNoXCIsIGJydXNoZW5kKTtcbiAgICAgIH1cbiAgICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgICBvcmlnaW5bMF0gPSBleHRlbnRbMF1bMF0gLSBvcmlnaW5bMF07XG4gICAgICAgIG9yaWdpblsxXSA9IGV4dGVudFswXVsxXSAtIG9yaWdpblsxXTtcbiAgICAgIH0gZWxzZSBpZiAocmVzaXppbmcpIHtcbiAgICAgICAgdmFyIGV4ID0gKy93JC8udGVzdChyZXNpemluZyksIGV5ID0gKy9ebi8udGVzdChyZXNpemluZyk7XG4gICAgICAgIG9mZnNldCA9IFsgZXh0ZW50WzEgLSBleF1bMF0gLSBvcmlnaW5bMF0sIGV4dGVudFsxIC0gZXldWzFdIC0gb3JpZ2luWzFdIF07XG4gICAgICAgIG9yaWdpblswXSA9IGV4dGVudFtleF1bMF07XG4gICAgICAgIG9yaWdpblsxXSA9IGV4dGVudFtleV1bMV07XG4gICAgICB9IGVsc2UgaWYgKGQzLmV2ZW50LmFsdEtleSkgY2VudGVyID0gb3JpZ2luLnNsaWNlKCk7XG4gICAgICBnLnN0eWxlKFwicG9pbnRlci1ldmVudHNcIiwgXCJub25lXCIpLnNlbGVjdEFsbChcIi5yZXNpemVcIikuc3R5bGUoXCJkaXNwbGF5XCIsIG51bGwpO1xuICAgICAgZDMuc2VsZWN0KFwiYm9keVwiKS5zdHlsZShcImN1cnNvclwiLCBldmVudFRhcmdldC5zdHlsZShcImN1cnNvclwiKSk7XG4gICAgICBldmVudF8oe1xuICAgICAgICB0eXBlOiBcImJydXNoc3RhcnRcIlxuICAgICAgfSk7XG4gICAgICBicnVzaG1vdmUoKTtcbiAgICAgIGZ1bmN0aW9uIG1vdXNlKCkge1xuICAgICAgICB2YXIgdG91Y2hlcyA9IGQzLmV2ZW50LmNoYW5nZWRUb3VjaGVzO1xuICAgICAgICByZXR1cm4gdG91Y2hlcyA/IGQzLnRvdWNoZXModGFyZ2V0LCB0b3VjaGVzKVswXSA6IGQzLm1vdXNlKHRhcmdldCk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBrZXlkb3duKCkge1xuICAgICAgICBpZiAoZDMuZXZlbnQua2V5Q29kZSA9PSAzMikge1xuICAgICAgICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIGNlbnRlciA9IG51bGw7XG4gICAgICAgICAgICBvcmlnaW5bMF0gLT0gZXh0ZW50WzFdWzBdO1xuICAgICAgICAgICAgb3JpZ2luWzFdIC09IGV4dGVudFsxXVsxXTtcbiAgICAgICAgICAgIGRyYWdnaW5nID0gMjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZDNfZXZlbnRQcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBrZXl1cCgpIHtcbiAgICAgICAgaWYgKGQzLmV2ZW50LmtleUNvZGUgPT0gMzIgJiYgZHJhZ2dpbmcgPT0gMikge1xuICAgICAgICAgIG9yaWdpblswXSArPSBleHRlbnRbMV1bMF07XG4gICAgICAgICAgb3JpZ2luWzFdICs9IGV4dGVudFsxXVsxXTtcbiAgICAgICAgICBkcmFnZ2luZyA9IDA7XG4gICAgICAgICAgZDNfZXZlbnRQcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBicnVzaG1vdmUoKSB7XG4gICAgICAgIHZhciBwb2ludCA9IG1vdXNlKCksIG1vdmVkID0gZmFsc2U7XG4gICAgICAgIGlmIChvZmZzZXQpIHtcbiAgICAgICAgICBwb2ludFswXSArPSBvZmZzZXRbMF07XG4gICAgICAgICAgcG9pbnRbMV0gKz0gb2Zmc2V0WzFdO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgICAgICBpZiAoZDMuZXZlbnQuYWx0S2V5KSB7XG4gICAgICAgICAgICBpZiAoIWNlbnRlcikgY2VudGVyID0gWyAoZXh0ZW50WzBdWzBdICsgZXh0ZW50WzFdWzBdKSAvIDIsIChleHRlbnRbMF1bMV0gKyBleHRlbnRbMV1bMV0pIC8gMiBdO1xuICAgICAgICAgICAgb3JpZ2luWzBdID0gZXh0ZW50WysocG9pbnRbMF0gPCBjZW50ZXJbMF0pXVswXTtcbiAgICAgICAgICAgIG9yaWdpblsxXSA9IGV4dGVudFsrKHBvaW50WzFdIDwgY2VudGVyWzFdKV1bMV07XG4gICAgICAgICAgfSBlbHNlIGNlbnRlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc2l6aW5nWCAmJiBtb3ZlMShwb2ludCwgeCwgMCkpIHtcbiAgICAgICAgICByZWRyYXdYKGcpO1xuICAgICAgICAgIG1vdmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzaXppbmdZICYmIG1vdmUxKHBvaW50LCB5LCAxKSkge1xuICAgICAgICAgIHJlZHJhd1koZyk7XG4gICAgICAgICAgbW92ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtb3ZlZCkge1xuICAgICAgICAgIHJlZHJhdyhnKTtcbiAgICAgICAgICBldmVudF8oe1xuICAgICAgICAgICAgdHlwZTogXCJicnVzaFwiLFxuICAgICAgICAgICAgbW9kZTogZHJhZ2dpbmcgPyBcIm1vdmVcIiA6IFwicmVzaXplXCJcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZnVuY3Rpb24gbW92ZTEocG9pbnQsIHNjYWxlLCBpKSB7XG4gICAgICAgIHZhciByYW5nZSA9IGQzX3NjYWxlUmFuZ2Uoc2NhbGUpLCByMCA9IHJhbmdlWzBdLCByMSA9IHJhbmdlWzFdLCBwb3NpdGlvbiA9IG9yaWdpbltpXSwgc2l6ZSA9IGV4dGVudFsxXVtpXSAtIGV4dGVudFswXVtpXSwgbWluLCBtYXg7XG4gICAgICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgICAgIHIwIC09IHBvc2l0aW9uO1xuICAgICAgICAgIHIxIC09IHNpemUgKyBwb3NpdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBtaW4gPSBjbGFtcFtpXSA/IE1hdGgubWF4KHIwLCBNYXRoLm1pbihyMSwgcG9pbnRbaV0pKSA6IHBvaW50W2ldO1xuICAgICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgICBtYXggPSAobWluICs9IHBvc2l0aW9uKSArIHNpemU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGNlbnRlcikgcG9zaXRpb24gPSBNYXRoLm1heChyMCwgTWF0aC5taW4ocjEsIDIgKiBjZW50ZXJbaV0gLSBtaW4pKTtcbiAgICAgICAgICBpZiAocG9zaXRpb24gPCBtaW4pIHtcbiAgICAgICAgICAgIG1heCA9IG1pbjtcbiAgICAgICAgICAgIG1pbiA9IHBvc2l0aW9uO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXggPSBwb3NpdGlvbjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV4dGVudFswXVtpXSAhPT0gbWluIHx8IGV4dGVudFsxXVtpXSAhPT0gbWF4KSB7XG4gICAgICAgICAgZXh0ZW50RG9tYWluID0gbnVsbDtcbiAgICAgICAgICBleHRlbnRbMF1baV0gPSBtaW47XG4gICAgICAgICAgZXh0ZW50WzFdW2ldID0gbWF4O1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBicnVzaGVuZCgpIHtcbiAgICAgICAgYnJ1c2htb3ZlKCk7XG4gICAgICAgIGcuc3R5bGUoXCJwb2ludGVyLWV2ZW50c1wiLCBcImFsbFwiKS5zZWxlY3RBbGwoXCIucmVzaXplXCIpLnN0eWxlKFwiZGlzcGxheVwiLCBicnVzaC5lbXB0eSgpID8gXCJub25lXCIgOiBudWxsKTtcbiAgICAgICAgZDMuc2VsZWN0KFwiYm9keVwiKS5zdHlsZShcImN1cnNvclwiLCBudWxsKTtcbiAgICAgICAgdy5vbihcIm1vdXNlbW92ZS5icnVzaFwiLCBudWxsKS5vbihcIm1vdXNldXAuYnJ1c2hcIiwgbnVsbCkub24oXCJ0b3VjaG1vdmUuYnJ1c2hcIiwgbnVsbCkub24oXCJ0b3VjaGVuZC5icnVzaFwiLCBudWxsKS5vbihcImtleWRvd24uYnJ1c2hcIiwgbnVsbCkub24oXCJrZXl1cC5icnVzaFwiLCBudWxsKTtcbiAgICAgICAgZHJhZ1Jlc3RvcmUoKTtcbiAgICAgICAgZXZlbnRfKHtcbiAgICAgICAgICB0eXBlOiBcImJydXNoZW5kXCJcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGJydXNoLnggPSBmdW5jdGlvbih6KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB4O1xuICAgICAgeCA9IHo7XG4gICAgICByZXNpemVzID0gZDNfc3ZnX2JydXNoUmVzaXplc1sheCA8PCAxIHwgIXldO1xuICAgICAgcmV0dXJuIGJydXNoO1xuICAgIH07XG4gICAgYnJ1c2gueSA9IGZ1bmN0aW9uKHopIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHk7XG4gICAgICB5ID0gejtcbiAgICAgIHJlc2l6ZXMgPSBkM19zdmdfYnJ1c2hSZXNpemVzWyF4IDw8IDEgfCAheV07XG4gICAgICByZXR1cm4gYnJ1c2g7XG4gICAgfTtcbiAgICBicnVzaC5jbGFtcCA9IGZ1bmN0aW9uKHopIHtcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHggJiYgeSA/IGNsYW1wIDogeCB8fCB5ID8gY2xhbXBbKyF4XSA6IG51bGw7XG4gICAgICBpZiAoeCAmJiB5KSBjbGFtcCA9IFsgISF6WzBdLCAhIXpbMV0gXTsgZWxzZSBpZiAoeCB8fCB5KSBjbGFtcFsrIXhdID0gISF6O1xuICAgICAgcmV0dXJuIGJydXNoO1xuICAgIH07XG4gICAgYnJ1c2guZXh0ZW50ID0gZnVuY3Rpb24oeikge1xuICAgICAgdmFyIHgwLCB4MSwgeTAsIHkxLCB0O1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgIHogPSBleHRlbnREb21haW4gfHwgZXh0ZW50O1xuICAgICAgICBpZiAoeCkge1xuICAgICAgICAgIHgwID0gelswXVswXSwgeDEgPSB6WzFdWzBdO1xuICAgICAgICAgIGlmICghZXh0ZW50RG9tYWluKSB7XG4gICAgICAgICAgICB4MCA9IGV4dGVudFswXVswXSwgeDEgPSBleHRlbnRbMV1bMF07XG4gICAgICAgICAgICBpZiAoeC5pbnZlcnQpIHgwID0geC5pbnZlcnQoeDApLCB4MSA9IHguaW52ZXJ0KHgxKTtcbiAgICAgICAgICAgIGlmICh4MSA8IHgwKSB0ID0geDAsIHgwID0geDEsIHgxID0gdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHkpIHtcbiAgICAgICAgICB5MCA9IHpbMF1bMV0sIHkxID0gelsxXVsxXTtcbiAgICAgICAgICBpZiAoIWV4dGVudERvbWFpbikge1xuICAgICAgICAgICAgeTAgPSBleHRlbnRbMF1bMV0sIHkxID0gZXh0ZW50WzFdWzFdO1xuICAgICAgICAgICAgaWYgKHkuaW52ZXJ0KSB5MCA9IHkuaW52ZXJ0KHkwKSwgeTEgPSB5LmludmVydCh5MSk7XG4gICAgICAgICAgICBpZiAoeTEgPCB5MCkgdCA9IHkwLCB5MCA9IHkxLCB5MSA9IHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4ICYmIHkgPyBbIFsgeDAsIHkwIF0sIFsgeDEsIHkxIF0gXSA6IHggPyBbIHgwLCB4MSBdIDogeSAmJiBbIHkwLCB5MSBdO1xuICAgICAgfVxuICAgICAgZXh0ZW50RG9tYWluID0gWyBbIDAsIDAgXSwgWyAwLCAwIF0gXTtcbiAgICAgIGlmICh4KSB7XG4gICAgICAgIHgwID0gelswXSwgeDEgPSB6WzFdO1xuICAgICAgICBpZiAoeSkgeDAgPSB4MFswXSwgeDEgPSB4MVswXTtcbiAgICAgICAgZXh0ZW50RG9tYWluWzBdWzBdID0geDAsIGV4dGVudERvbWFpblsxXVswXSA9IHgxO1xuICAgICAgICBpZiAoeC5pbnZlcnQpIHgwID0geCh4MCksIHgxID0geCh4MSk7XG4gICAgICAgIGlmICh4MSA8IHgwKSB0ID0geDAsIHgwID0geDEsIHgxID0gdDtcbiAgICAgICAgZXh0ZW50WzBdWzBdID0geDAgfCAwLCBleHRlbnRbMV1bMF0gPSB4MSB8IDA7XG4gICAgICB9XG4gICAgICBpZiAoeSkge1xuICAgICAgICB5MCA9IHpbMF0sIHkxID0gelsxXTtcbiAgICAgICAgaWYgKHgpIHkwID0geTBbMV0sIHkxID0geTFbMV07XG4gICAgICAgIGV4dGVudERvbWFpblswXVsxXSA9IHkwLCBleHRlbnREb21haW5bMV1bMV0gPSB5MTtcbiAgICAgICAgaWYgKHkuaW52ZXJ0KSB5MCA9IHkoeTApLCB5MSA9IHkoeTEpO1xuICAgICAgICBpZiAoeTEgPCB5MCkgdCA9IHkwLCB5MCA9IHkxLCB5MSA9IHQ7XG4gICAgICAgIGV4dGVudFswXVsxXSA9IHkwIHwgMCwgZXh0ZW50WzFdWzFdID0geTEgfCAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGJydXNoO1xuICAgIH07XG4gICAgYnJ1c2guY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIGV4dGVudERvbWFpbiA9IG51bGw7XG4gICAgICBleHRlbnRbMF1bMF0gPSBleHRlbnRbMF1bMV0gPSBleHRlbnRbMV1bMF0gPSBleHRlbnRbMV1bMV0gPSAwO1xuICAgICAgcmV0dXJuIGJydXNoO1xuICAgIH07XG4gICAgYnJ1c2guZW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB4ICYmIGV4dGVudFswXVswXSA9PT0gZXh0ZW50WzFdWzBdIHx8IHkgJiYgZXh0ZW50WzBdWzFdID09PSBleHRlbnRbMV1bMV07XG4gICAgfTtcbiAgICByZXR1cm4gZDMucmViaW5kKGJydXNoLCBldmVudCwgXCJvblwiKTtcbiAgfTtcbiAgdmFyIGQzX3N2Z19icnVzaEN1cnNvciA9IHtcbiAgICBuOiBcIm5zLXJlc2l6ZVwiLFxuICAgIGU6IFwiZXctcmVzaXplXCIsXG4gICAgczogXCJucy1yZXNpemVcIixcbiAgICB3OiBcImV3LXJlc2l6ZVwiLFxuICAgIG53OiBcIm53c2UtcmVzaXplXCIsXG4gICAgbmU6IFwibmVzdy1yZXNpemVcIixcbiAgICBzZTogXCJud3NlLXJlc2l6ZVwiLFxuICAgIHN3OiBcIm5lc3ctcmVzaXplXCJcbiAgfTtcbiAgdmFyIGQzX3N2Z19icnVzaFJlc2l6ZXMgPSBbIFsgXCJuXCIsIFwiZVwiLCBcInNcIiwgXCJ3XCIsIFwibndcIiwgXCJuZVwiLCBcInNlXCIsIFwic3dcIiBdLCBbIFwiZVwiLCBcIndcIiBdLCBbIFwiblwiLCBcInNcIiBdLCBbXSBdO1xuICBkMy50aW1lID0ge307XG4gIHZhciBkM190aW1lID0gRGF0ZSwgZDNfdGltZV9kYXlTeW1ib2xzID0gWyBcIlN1bmRheVwiLCBcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCIgXTtcbiAgZnVuY3Rpb24gZDNfdGltZV91dGMoKSB7XG4gICAgdGhpcy5fID0gbmV3IERhdGUoYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBEYXRlLlVUQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDogYXJndW1lbnRzWzBdKTtcbiAgfVxuICBkM190aW1lX3V0Yy5wcm90b3R5cGUgPSB7XG4gICAgZ2V0RGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fLmdldFVUQ0RhdGUoKTtcbiAgICB9LFxuICAgIGdldERheTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fLmdldFVUQ0RheSgpO1xuICAgIH0sXG4gICAgZ2V0RnVsbFllYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuXy5nZXRVVENGdWxsWWVhcigpO1xuICAgIH0sXG4gICAgZ2V0SG91cnM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuXy5nZXRVVENIb3VycygpO1xuICAgIH0sXG4gICAgZ2V0TWlsbGlzZWNvbmRzOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl8uZ2V0VVRDTWlsbGlzZWNvbmRzKCk7XG4gICAgfSxcbiAgICBnZXRNaW51dGVzOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl8uZ2V0VVRDTWludXRlcygpO1xuICAgIH0sXG4gICAgZ2V0TW9udGg6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuXy5nZXRVVENNb250aCgpO1xuICAgIH0sXG4gICAgZ2V0U2Vjb25kczogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fLmdldFVUQ1NlY29uZHMoKTtcbiAgICB9LFxuICAgIGdldFRpbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuXy5nZXRUaW1lKCk7XG4gICAgfSxcbiAgICBnZXRUaW1lem9uZU9mZnNldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9LFxuICAgIHZhbHVlT2Y6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuXy52YWx1ZU9mKCk7XG4gICAgfSxcbiAgICBzZXREYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgIGQzX3RpbWVfcHJvdG90eXBlLnNldFVUQ0RhdGUuYXBwbHkodGhpcy5fLCBhcmd1bWVudHMpO1xuICAgIH0sXG4gICAgc2V0RGF5OiBmdW5jdGlvbigpIHtcbiAgICAgIGQzX3RpbWVfcHJvdG90eXBlLnNldFVUQ0RheS5hcHBseSh0aGlzLl8sIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICBzZXRGdWxsWWVhcjogZnVuY3Rpb24oKSB7XG4gICAgICBkM190aW1lX3Byb3RvdHlwZS5zZXRVVENGdWxsWWVhci5hcHBseSh0aGlzLl8sIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICBzZXRIb3VyczogZnVuY3Rpb24oKSB7XG4gICAgICBkM190aW1lX3Byb3RvdHlwZS5zZXRVVENIb3Vycy5hcHBseSh0aGlzLl8sIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICBzZXRNaWxsaXNlY29uZHM6IGZ1bmN0aW9uKCkge1xuICAgICAgZDNfdGltZV9wcm90b3R5cGUuc2V0VVRDTWlsbGlzZWNvbmRzLmFwcGx5KHRoaXMuXywgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIHNldE1pbnV0ZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgZDNfdGltZV9wcm90b3R5cGUuc2V0VVRDTWludXRlcy5hcHBseSh0aGlzLl8sIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICBzZXRNb250aDogZnVuY3Rpb24oKSB7XG4gICAgICBkM190aW1lX3Byb3RvdHlwZS5zZXRVVENNb250aC5hcHBseSh0aGlzLl8sIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICBzZXRTZWNvbmRzOiBmdW5jdGlvbigpIHtcbiAgICAgIGQzX3RpbWVfcHJvdG90eXBlLnNldFVUQ1NlY29uZHMuYXBwbHkodGhpcy5fLCBhcmd1bWVudHMpO1xuICAgIH0sXG4gICAgc2V0VGltZTogZnVuY3Rpb24oKSB7XG4gICAgICBkM190aW1lX3Byb3RvdHlwZS5zZXRUaW1lLmFwcGx5KHRoaXMuXywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH07XG4gIHZhciBkM190aW1lX3Byb3RvdHlwZSA9IERhdGUucHJvdG90eXBlO1xuICB2YXIgZDNfdGltZV9mb3JtYXREYXRlVGltZSA9IFwiJWEgJWIgJWUgJVggJVlcIiwgZDNfdGltZV9mb3JtYXREYXRlID0gXCIlbS8lZC8lWVwiLCBkM190aW1lX2Zvcm1hdFRpbWUgPSBcIiVIOiVNOiVTXCI7XG4gIHZhciBkM190aW1lX2RheXMgPSBbIFwiU3VuZGF5XCIsIFwiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsIFwiRnJpZGF5XCIsIFwiU2F0dXJkYXlcIiBdLCBkM190aW1lX2RheUFiYnJldmlhdGlvbnMgPSBbIFwiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCIgXSwgZDNfdGltZV9tb250aHMgPSBbIFwiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIiBdLCBkM190aW1lX21vbnRoQWJicmV2aWF0aW9ucyA9IFsgXCJKYW5cIiwgXCJGZWJcIiwgXCJNYXJcIiwgXCJBcHJcIiwgXCJNYXlcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIiBdO1xuICBmdW5jdGlvbiBkM190aW1lX2ludGVydmFsKGxvY2FsLCBzdGVwLCBudW1iZXIpIHtcbiAgICBmdW5jdGlvbiByb3VuZChkYXRlKSB7XG4gICAgICB2YXIgZDAgPSBsb2NhbChkYXRlKSwgZDEgPSBvZmZzZXQoZDAsIDEpO1xuICAgICAgcmV0dXJuIGRhdGUgLSBkMCA8IGQxIC0gZGF0ZSA/IGQwIDogZDE7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNlaWwoZGF0ZSkge1xuICAgICAgc3RlcChkYXRlID0gbG9jYWwobmV3IGQzX3RpbWUoZGF0ZSAtIDEpKSwgMSk7XG4gICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb2Zmc2V0KGRhdGUsIGspIHtcbiAgICAgIHN0ZXAoZGF0ZSA9IG5ldyBkM190aW1lKCtkYXRlKSwgayk7XG4gICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmFuZ2UodDAsIHQxLCBkdCkge1xuICAgICAgdmFyIHRpbWUgPSBjZWlsKHQwKSwgdGltZXMgPSBbXTtcbiAgICAgIGlmIChkdCA+IDEpIHtcbiAgICAgICAgd2hpbGUgKHRpbWUgPCB0MSkge1xuICAgICAgICAgIGlmICghKG51bWJlcih0aW1lKSAlIGR0KSkgdGltZXMucHVzaChuZXcgRGF0ZSgrdGltZSkpO1xuICAgICAgICAgIHN0ZXAodGltZSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdoaWxlICh0aW1lIDwgdDEpIHRpbWVzLnB1c2gobmV3IERhdGUoK3RpbWUpKSwgc3RlcCh0aW1lLCAxKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aW1lcztcbiAgICB9XG4gICAgZnVuY3Rpb24gcmFuZ2VfdXRjKHQwLCB0MSwgZHQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGQzX3RpbWUgPSBkM190aW1lX3V0YztcbiAgICAgICAgdmFyIHV0YyA9IG5ldyBkM190aW1lX3V0YygpO1xuICAgICAgICB1dGMuXyA9IHQwO1xuICAgICAgICByZXR1cm4gcmFuZ2UodXRjLCB0MSwgZHQpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgZDNfdGltZSA9IERhdGU7XG4gICAgICB9XG4gICAgfVxuICAgIGxvY2FsLmZsb29yID0gbG9jYWw7XG4gICAgbG9jYWwucm91bmQgPSByb3VuZDtcbiAgICBsb2NhbC5jZWlsID0gY2VpbDtcbiAgICBsb2NhbC5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgbG9jYWwucmFuZ2UgPSByYW5nZTtcbiAgICB2YXIgdXRjID0gbG9jYWwudXRjID0gZDNfdGltZV9pbnRlcnZhbF91dGMobG9jYWwpO1xuICAgIHV0Yy5mbG9vciA9IHV0YztcbiAgICB1dGMucm91bmQgPSBkM190aW1lX2ludGVydmFsX3V0Yyhyb3VuZCk7XG4gICAgdXRjLmNlaWwgPSBkM190aW1lX2ludGVydmFsX3V0YyhjZWlsKTtcbiAgICB1dGMub2Zmc2V0ID0gZDNfdGltZV9pbnRlcnZhbF91dGMob2Zmc2V0KTtcbiAgICB1dGMucmFuZ2UgPSByYW5nZV91dGM7XG4gICAgcmV0dXJuIGxvY2FsO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3RpbWVfaW50ZXJ2YWxfdXRjKG1ldGhvZCkge1xuICAgIHJldHVybiBmdW5jdGlvbihkYXRlLCBrKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkM190aW1lID0gZDNfdGltZV91dGM7XG4gICAgICAgIHZhciB1dGMgPSBuZXcgZDNfdGltZV91dGMoKTtcbiAgICAgICAgdXRjLl8gPSBkYXRlO1xuICAgICAgICByZXR1cm4gbWV0aG9kKHV0YywgaykuXztcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGQzX3RpbWUgPSBEYXRlO1xuICAgICAgfVxuICAgIH07XG4gIH1cbiAgZDMudGltZS55ZWFyID0gZDNfdGltZV9pbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZSA9IGQzLnRpbWUuZGF5KGRhdGUpO1xuICAgIGRhdGUuc2V0TW9udGgoMCwgMSk7XG4gICAgcmV0dXJuIGRhdGU7XG4gIH0sIGZ1bmN0aW9uKGRhdGUsIG9mZnNldCkge1xuICAgIGRhdGUuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpICsgb2Zmc2V0KTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gIH0pO1xuICBkMy50aW1lLnllYXJzID0gZDMudGltZS55ZWFyLnJhbmdlO1xuICBkMy50aW1lLnllYXJzLnV0YyA9IGQzLnRpbWUueWVhci51dGMucmFuZ2U7XG4gIGQzLnRpbWUuZGF5ID0gZDNfdGltZV9pbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgdmFyIGRheSA9IG5ldyBkM190aW1lKDJlMywgMCk7XG4gICAgZGF5LnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSk7XG4gICAgcmV0dXJuIGRheTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgb2Zmc2V0KSB7XG4gICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgb2Zmc2V0KTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldERhdGUoKSAtIDE7XG4gIH0pO1xuICBkMy50aW1lLmRheXMgPSBkMy50aW1lLmRheS5yYW5nZTtcbiAgZDMudGltZS5kYXlzLnV0YyA9IGQzLnRpbWUuZGF5LnV0Yy5yYW5nZTtcbiAgZDMudGltZS5kYXlPZlllYXIgPSBmdW5jdGlvbihkYXRlKSB7XG4gICAgdmFyIHllYXIgPSBkMy50aW1lLnllYXIoZGF0ZSk7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKGRhdGUgLSB5ZWFyIC0gKGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSAtIHllYXIuZ2V0VGltZXpvbmVPZmZzZXQoKSkgKiA2ZTQpIC8gODY0ZTUpO1xuICB9O1xuICBkM190aW1lX2RheVN5bWJvbHMuZm9yRWFjaChmdW5jdGlvbihkYXksIGkpIHtcbiAgICBkYXkgPSBkYXkudG9Mb3dlckNhc2UoKTtcbiAgICBpID0gNyAtIGk7XG4gICAgdmFyIGludGVydmFsID0gZDMudGltZVtkYXldID0gZDNfdGltZV9pbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgICAoZGF0ZSA9IGQzLnRpbWUuZGF5KGRhdGUpKS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpIC0gKGRhdGUuZ2V0RGF5KCkgKyBpKSAlIDcpO1xuICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfSwgZnVuY3Rpb24oZGF0ZSwgb2Zmc2V0KSB7XG4gICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyBNYXRoLmZsb29yKG9mZnNldCkgKiA3KTtcbiAgICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgICB2YXIgZGF5ID0gZDMudGltZS55ZWFyKGRhdGUpLmdldERheSgpO1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKGQzLnRpbWUuZGF5T2ZZZWFyKGRhdGUpICsgKGRheSArIGkpICUgNykgLyA3KSAtIChkYXkgIT09IGkpO1xuICAgIH0pO1xuICAgIGQzLnRpbWVbZGF5ICsgXCJzXCJdID0gaW50ZXJ2YWwucmFuZ2U7XG4gICAgZDMudGltZVtkYXkgKyBcInNcIl0udXRjID0gaW50ZXJ2YWwudXRjLnJhbmdlO1xuICAgIGQzLnRpbWVbZGF5ICsgXCJPZlllYXJcIl0gPSBmdW5jdGlvbihkYXRlKSB7XG4gICAgICB2YXIgZGF5ID0gZDMudGltZS55ZWFyKGRhdGUpLmdldERheSgpO1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKGQzLnRpbWUuZGF5T2ZZZWFyKGRhdGUpICsgKGRheSArIGkpICUgNykgLyA3KTtcbiAgICB9O1xuICB9KTtcbiAgZDMudGltZS53ZWVrID0gZDMudGltZS5zdW5kYXk7XG4gIGQzLnRpbWUud2Vla3MgPSBkMy50aW1lLnN1bmRheS5yYW5nZTtcbiAgZDMudGltZS53ZWVrcy51dGMgPSBkMy50aW1lLnN1bmRheS51dGMucmFuZ2U7XG4gIGQzLnRpbWUud2Vla09mWWVhciA9IGQzLnRpbWUuc3VuZGF5T2ZZZWFyO1xuICBkMy50aW1lLmZvcm1hdCA9IGZ1bmN0aW9uKHRlbXBsYXRlKSB7XG4gICAgdmFyIG4gPSB0ZW1wbGF0ZS5sZW5ndGg7XG4gICAgZnVuY3Rpb24gZm9ybWF0KGRhdGUpIHtcbiAgICAgIHZhciBzdHJpbmcgPSBbXSwgaSA9IC0xLCBqID0gMCwgYywgcCwgZjtcbiAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgIGlmICh0ZW1wbGF0ZS5jaGFyQ29kZUF0KGkpID09PSAzNykge1xuICAgICAgICAgIHN0cmluZy5wdXNoKHRlbXBsYXRlLnN1YnN0cmluZyhqLCBpKSk7XG4gICAgICAgICAgaWYgKChwID0gZDNfdGltZV9mb3JtYXRQYWRzW2MgPSB0ZW1wbGF0ZS5jaGFyQXQoKytpKV0pICE9IG51bGwpIGMgPSB0ZW1wbGF0ZS5jaGFyQXQoKytpKTtcbiAgICAgICAgICBpZiAoZiA9IGQzX3RpbWVfZm9ybWF0c1tjXSkgYyA9IGYoZGF0ZSwgcCA9PSBudWxsID8gYyA9PT0gXCJlXCIgPyBcIiBcIiA6IFwiMFwiIDogcCk7XG4gICAgICAgICAgc3RyaW5nLnB1c2goYyk7XG4gICAgICAgICAgaiA9IGkgKyAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzdHJpbmcucHVzaCh0ZW1wbGF0ZS5zdWJzdHJpbmcoaiwgaSkpO1xuICAgICAgcmV0dXJuIHN0cmluZy5qb2luKFwiXCIpO1xuICAgIH1cbiAgICBmb3JtYXQucGFyc2UgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICAgIHZhciBkID0ge1xuICAgICAgICB5OiAxOTAwLFxuICAgICAgICBtOiAwLFxuICAgICAgICBkOiAxLFxuICAgICAgICBIOiAwLFxuICAgICAgICBNOiAwLFxuICAgICAgICBTOiAwLFxuICAgICAgICBMOiAwXG4gICAgICB9LCBpID0gZDNfdGltZV9wYXJzZShkLCB0ZW1wbGF0ZSwgc3RyaW5nLCAwKTtcbiAgICAgIGlmIChpICE9IHN0cmluZy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgaWYgKFwicFwiIGluIGQpIGQuSCA9IGQuSCAlIDEyICsgZC5wICogMTI7XG4gICAgICB2YXIgZGF0ZSA9IG5ldyBkM190aW1lKCk7XG4gICAgICBpZiAoXCJqXCIgaW4gZCkgZGF0ZS5zZXRGdWxsWWVhcihkLnksIDAsIGQuaik7IGVsc2UgaWYgKFwid1wiIGluIGQgJiYgKFwiV1wiIGluIGQgfHwgXCJVXCIgaW4gZCkpIHtcbiAgICAgICAgZGF0ZS5zZXRGdWxsWWVhcihkLnksIDAsIDEpO1xuICAgICAgICBkYXRlLnNldEZ1bGxZZWFyKGQueSwgMCwgXCJXXCIgaW4gZCA/IChkLncgKyA2KSAlIDcgKyBkLlcgKiA3IC0gKGRhdGUuZ2V0RGF5KCkgKyA1KSAlIDcgOiBkLncgKyBkLlUgKiA3IC0gKGRhdGUuZ2V0RGF5KCkgKyA2KSAlIDcpO1xuICAgICAgfSBlbHNlIGRhdGUuc2V0RnVsbFllYXIoZC55LCBkLm0sIGQuZCk7XG4gICAgICBkYXRlLnNldEhvdXJzKGQuSCwgZC5NLCBkLlMsIGQuTCk7XG4gICAgICByZXR1cm4gZGF0ZTtcbiAgICB9O1xuICAgIGZvcm1hdC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH07XG4gICAgcmV0dXJuIGZvcm1hdDtcbiAgfTtcbiAgZnVuY3Rpb24gZDNfdGltZV9wYXJzZShkYXRlLCB0ZW1wbGF0ZSwgc3RyaW5nLCBqKSB7XG4gICAgdmFyIGMsIHAsIGkgPSAwLCBuID0gdGVtcGxhdGUubGVuZ3RoLCBtID0gc3RyaW5nLmxlbmd0aDtcbiAgICB3aGlsZSAoaSA8IG4pIHtcbiAgICAgIGlmIChqID49IG0pIHJldHVybiAtMTtcbiAgICAgIGMgPSB0ZW1wbGF0ZS5jaGFyQ29kZUF0KGkrKyk7XG4gICAgICBpZiAoYyA9PT0gMzcpIHtcbiAgICAgICAgcCA9IGQzX3RpbWVfcGFyc2Vyc1t0ZW1wbGF0ZS5jaGFyQXQoaSsrKV07XG4gICAgICAgIGlmICghcCB8fCAoaiA9IHAoZGF0ZSwgc3RyaW5nLCBqKSkgPCAwKSByZXR1cm4gLTE7XG4gICAgICB9IGVsc2UgaWYgKGMgIT0gc3RyaW5nLmNoYXJDb2RlQXQoaisrKSkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBqO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3RpbWVfZm9ybWF0UmUobmFtZXMpIHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChcIl4oPzpcIiArIG5hbWVzLm1hcChkMy5yZXF1b3RlKS5qb2luKFwifFwiKSArIFwiKVwiLCBcImlcIik7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZV9mb3JtYXRMb29rdXAobmFtZXMpIHtcbiAgICB2YXIgbWFwID0gbmV3IGQzX01hcCgpLCBpID0gLTEsIG4gPSBuYW1lcy5sZW5ndGg7XG4gICAgd2hpbGUgKCsraSA8IG4pIG1hcC5zZXQobmFtZXNbaV0udG9Mb3dlckNhc2UoKSwgaSk7XG4gICAgcmV0dXJuIG1hcDtcbiAgfVxuICBmdW5jdGlvbiBkM190aW1lX2Zvcm1hdFBhZCh2YWx1ZSwgZmlsbCwgd2lkdGgpIHtcbiAgICB2YXIgc2lnbiA9IHZhbHVlIDwgMCA/IFwiLVwiIDogXCJcIiwgc3RyaW5nID0gKHNpZ24gPyAtdmFsdWUgOiB2YWx1ZSkgKyBcIlwiLCBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICAgIHJldHVybiBzaWduICsgKGxlbmd0aCA8IHdpZHRoID8gbmV3IEFycmF5KHdpZHRoIC0gbGVuZ3RoICsgMSkuam9pbihmaWxsKSArIHN0cmluZyA6IHN0cmluZyk7XG4gIH1cbiAgdmFyIGQzX3RpbWVfZGF5UmUgPSBkM190aW1lX2Zvcm1hdFJlKGQzX3RpbWVfZGF5cyksIGQzX3RpbWVfZGF5TG9va3VwID0gZDNfdGltZV9mb3JtYXRMb29rdXAoZDNfdGltZV9kYXlzKSwgZDNfdGltZV9kYXlBYmJyZXZSZSA9IGQzX3RpbWVfZm9ybWF0UmUoZDNfdGltZV9kYXlBYmJyZXZpYXRpb25zKSwgZDNfdGltZV9kYXlBYmJyZXZMb29rdXAgPSBkM190aW1lX2Zvcm1hdExvb2t1cChkM190aW1lX2RheUFiYnJldmlhdGlvbnMpLCBkM190aW1lX21vbnRoUmUgPSBkM190aW1lX2Zvcm1hdFJlKGQzX3RpbWVfbW9udGhzKSwgZDNfdGltZV9tb250aExvb2t1cCA9IGQzX3RpbWVfZm9ybWF0TG9va3VwKGQzX3RpbWVfbW9udGhzKSwgZDNfdGltZV9tb250aEFiYnJldlJlID0gZDNfdGltZV9mb3JtYXRSZShkM190aW1lX21vbnRoQWJicmV2aWF0aW9ucyksIGQzX3RpbWVfbW9udGhBYmJyZXZMb29rdXAgPSBkM190aW1lX2Zvcm1hdExvb2t1cChkM190aW1lX21vbnRoQWJicmV2aWF0aW9ucyksIGQzX3RpbWVfcGVyY2VudFJlID0gL14lLztcbiAgdmFyIGQzX3RpbWVfZm9ybWF0UGFkcyA9IHtcbiAgICBcIi1cIjogXCJcIixcbiAgICBfOiBcIiBcIixcbiAgICBcIjBcIjogXCIwXCJcbiAgfTtcbiAgdmFyIGQzX3RpbWVfZm9ybWF0cyA9IHtcbiAgICBhOiBmdW5jdGlvbihkKSB7XG4gICAgICByZXR1cm4gZDNfdGltZV9kYXlBYmJyZXZpYXRpb25zW2QuZ2V0RGF5KCldO1xuICAgIH0sXG4gICAgQTogZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIGQzX3RpbWVfZGF5c1tkLmdldERheSgpXTtcbiAgICB9LFxuICAgIGI6IGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBkM190aW1lX21vbnRoQWJicmV2aWF0aW9uc1tkLmdldE1vbnRoKCldO1xuICAgIH0sXG4gICAgQjogZnVuY3Rpb24oZCkge1xuICAgICAgcmV0dXJuIGQzX3RpbWVfbW9udGhzW2QuZ2V0TW9udGgoKV07XG4gICAgfSxcbiAgICBjOiBkMy50aW1lLmZvcm1hdChkM190aW1lX2Zvcm1hdERhdGVUaW1lKSxcbiAgICBkOiBmdW5jdGlvbihkLCBwKSB7XG4gICAgICByZXR1cm4gZDNfdGltZV9mb3JtYXRQYWQoZC5nZXREYXRlKCksIHAsIDIpO1xuICAgIH0sXG4gICAgZTogZnVuY3Rpb24oZCwgcCkge1xuICAgICAgcmV0dXJuIGQzX3RpbWVfZm9ybWF0UGFkKGQuZ2V0RGF0ZSgpLCBwLCAyKTtcbiAgICB9LFxuICAgIEg6IGZ1bmN0aW9uKGQsIHApIHtcbiAgICAgIHJldHVybiBkM190aW1lX2Zvcm1hdFBhZChkLmdldEhvdXJzKCksIHAsIDIpO1xuICAgIH0sXG4gICAgSTogZnVuY3Rpb24oZCwgcCkge1xuICAgICAgcmV0dXJuIGQzX3RpbWVfZm9ybWF0UGFkKGQuZ2V0SG91cnMoKSAlIDEyIHx8IDEyLCBwLCAyKTtcbiAgICB9LFxuICAgIGo6IGZ1bmN0aW9uKGQsIHApIHtcbiAgICAgIHJldHVybiBkM190aW1lX2Zvcm1hdFBhZCgxICsgZDMudGltZS5kYXlPZlllYXIoZCksIHAsIDMpO1xuICAgIH0sXG4gICAgTDogZnVuY3Rpb24oZCwgcCkge1xuICAgICAgcmV0dXJuIGQzX3RpbWVfZm9ybWF0UGFkKGQuZ2V0TWlsbGlzZWNvbmRzKCksIHAsIDMpO1xuICAgIH0sXG4gICAgbTogZnVuY3Rpb24oZCwgcCkge1xuICAgICAgcmV0dXJuIGQzX3RpbWVfZm9ybWF0UGFkKGQuZ2V0TW9udGgoKSArIDEsIHAsIDIpO1xuICAgIH0sXG4gICAgTTogZnVuY3Rpb24oZCwgcCkge1xuICAgICAgcmV0dXJuIGQzX3RpbWVfZm9ybWF0UGFkKGQuZ2V0TWludXRlcygpLCBwLCAyKTtcbiAgICB9LFxuICAgIHA6IGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBkLmdldEhvdXJzKCkgPj0gMTIgPyBcIlBNXCIgOiBcIkFNXCI7XG4gICAgfSxcbiAgICBTOiBmdW5jdGlvbihkLCBwKSB7XG4gICAgICByZXR1cm4gZDNfdGltZV9mb3JtYXRQYWQoZC5nZXRTZWNvbmRzKCksIHAsIDIpO1xuICAgIH0sXG4gICAgVTogZnVuY3Rpb24oZCwgcCkge1xuICAgICAgcmV0dXJuIGQzX3RpbWVfZm9ybWF0UGFkKGQzLnRpbWUuc3VuZGF5T2ZZZWFyKGQpLCBwLCAyKTtcbiAgICB9LFxuICAgIHc6IGZ1bmN0aW9uKGQpIHtcbiAgICAgIHJldHVybiBkLmdldERheSgpO1xuICAgIH0sXG4gICAgVzogZnVuY3Rpb24oZCwgcCkge1xuICAgICAgcmV0dXJuIGQzX3RpbWVfZm9ybWF0UGFkKGQzLnRpbWUubW9uZGF5T2ZZZWFyKGQpLCBwLCAyKTtcbiAgICB9LFxuICAgIHg6IGQzLnRpbWUuZm9ybWF0KGQzX3RpbWVfZm9ybWF0RGF0ZSksXG4gICAgWDogZDMudGltZS5mb3JtYXQoZDNfdGltZV9mb3JtYXRUaW1lKSxcbiAgICB5OiBmdW5jdGlvbihkLCBwKSB7XG4gICAgICByZXR1cm4gZDNfdGltZV9mb3JtYXRQYWQoZC5nZXRGdWxsWWVhcigpICUgMTAwLCBwLCAyKTtcbiAgICB9LFxuICAgIFk6IGZ1bmN0aW9uKGQsIHApIHtcbiAgICAgIHJldHVybiBkM190aW1lX2Zvcm1hdFBhZChkLmdldEZ1bGxZZWFyKCkgJSAxZTQsIHAsIDQpO1xuICAgIH0sXG4gICAgWjogZDNfdGltZV96b25lLFxuICAgIFwiJVwiOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBcIiVcIjtcbiAgICB9XG4gIH07XG4gIHZhciBkM190aW1lX3BhcnNlcnMgPSB7XG4gICAgYTogZDNfdGltZV9wYXJzZVdlZWtkYXlBYmJyZXYsXG4gICAgQTogZDNfdGltZV9wYXJzZVdlZWtkYXksXG4gICAgYjogZDNfdGltZV9wYXJzZU1vbnRoQWJicmV2LFxuICAgIEI6IGQzX3RpbWVfcGFyc2VNb250aCxcbiAgICBjOiBkM190aW1lX3BhcnNlTG9jYWxlRnVsbCxcbiAgICBkOiBkM190aW1lX3BhcnNlRGF5LFxuICAgIGU6IGQzX3RpbWVfcGFyc2VEYXksXG4gICAgSDogZDNfdGltZV9wYXJzZUhvdXIyNCxcbiAgICBJOiBkM190aW1lX3BhcnNlSG91cjI0LFxuICAgIGo6IGQzX3RpbWVfcGFyc2VEYXlPZlllYXIsXG4gICAgTDogZDNfdGltZV9wYXJzZU1pbGxpc2Vjb25kcyxcbiAgICBtOiBkM190aW1lX3BhcnNlTW9udGhOdW1iZXIsXG4gICAgTTogZDNfdGltZV9wYXJzZU1pbnV0ZXMsXG4gICAgcDogZDNfdGltZV9wYXJzZUFtUG0sXG4gICAgUzogZDNfdGltZV9wYXJzZVNlY29uZHMsXG4gICAgVTogZDNfdGltZV9wYXJzZVdlZWtOdW1iZXJTdW5kYXksXG4gICAgdzogZDNfdGltZV9wYXJzZVdlZWtkYXlOdW1iZXIsXG4gICAgVzogZDNfdGltZV9wYXJzZVdlZWtOdW1iZXJNb25kYXksXG4gICAgeDogZDNfdGltZV9wYXJzZUxvY2FsZURhdGUsXG4gICAgWDogZDNfdGltZV9wYXJzZUxvY2FsZVRpbWUsXG4gICAgeTogZDNfdGltZV9wYXJzZVllYXIsXG4gICAgWTogZDNfdGltZV9wYXJzZUZ1bGxZZWFyLFxuICAgIFwiJVwiOiBkM190aW1lX3BhcnNlTGl0ZXJhbFBlcmNlbnRcbiAgfTtcbiAgZnVuY3Rpb24gZDNfdGltZV9wYXJzZVdlZWtkYXlBYmJyZXYoZGF0ZSwgc3RyaW5nLCBpKSB7XG4gICAgZDNfdGltZV9kYXlBYmJyZXZSZS5sYXN0SW5kZXggPSAwO1xuICAgIHZhciBuID0gZDNfdGltZV9kYXlBYmJyZXZSZS5leGVjKHN0cmluZy5zdWJzdHJpbmcoaSkpO1xuICAgIHJldHVybiBuID8gKGRhdGUudyA9IGQzX3RpbWVfZGF5QWJicmV2TG9va3VwLmdldChuWzBdLnRvTG93ZXJDYXNlKCkpLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZV9wYXJzZVdlZWtkYXkoZGF0ZSwgc3RyaW5nLCBpKSB7XG4gICAgZDNfdGltZV9kYXlSZS5sYXN0SW5kZXggPSAwO1xuICAgIHZhciBuID0gZDNfdGltZV9kYXlSZS5leGVjKHN0cmluZy5zdWJzdHJpbmcoaSkpO1xuICAgIHJldHVybiBuID8gKGRhdGUudyA9IGQzX3RpbWVfZGF5TG9va3VwLmdldChuWzBdLnRvTG93ZXJDYXNlKCkpLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZV9wYXJzZVdlZWtkYXlOdW1iZXIoZGF0ZSwgc3RyaW5nLCBpKSB7XG4gICAgZDNfdGltZV9udW1iZXJSZS5sYXN0SW5kZXggPSAwO1xuICAgIHZhciBuID0gZDNfdGltZV9udW1iZXJSZS5leGVjKHN0cmluZy5zdWJzdHJpbmcoaSwgaSArIDEpKTtcbiAgICByZXR1cm4gbiA/IChkYXRlLncgPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3RpbWVfcGFyc2VXZWVrTnVtYmVyU3VuZGF5KGRhdGUsIHN0cmluZywgaSkge1xuICAgIGQzX3RpbWVfbnVtYmVyUmUubGFzdEluZGV4ID0gMDtcbiAgICB2YXIgbiA9IGQzX3RpbWVfbnVtYmVyUmUuZXhlYyhzdHJpbmcuc3Vic3RyaW5nKGkpKTtcbiAgICByZXR1cm4gbiA/IChkYXRlLlUgPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3RpbWVfcGFyc2VXZWVrTnVtYmVyTW9uZGF5KGRhdGUsIHN0cmluZywgaSkge1xuICAgIGQzX3RpbWVfbnVtYmVyUmUubGFzdEluZGV4ID0gMDtcbiAgICB2YXIgbiA9IGQzX3RpbWVfbnVtYmVyUmUuZXhlYyhzdHJpbmcuc3Vic3RyaW5nKGkpKTtcbiAgICByZXR1cm4gbiA/IChkYXRlLlcgPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3RpbWVfcGFyc2VNb250aEFiYnJldihkYXRlLCBzdHJpbmcsIGkpIHtcbiAgICBkM190aW1lX21vbnRoQWJicmV2UmUubGFzdEluZGV4ID0gMDtcbiAgICB2YXIgbiA9IGQzX3RpbWVfbW9udGhBYmJyZXZSZS5leGVjKHN0cmluZy5zdWJzdHJpbmcoaSkpO1xuICAgIHJldHVybiBuID8gKGRhdGUubSA9IGQzX3RpbWVfbW9udGhBYmJyZXZMb29rdXAuZ2V0KG5bMF0udG9Mb3dlckNhc2UoKSksIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuICBmdW5jdGlvbiBkM190aW1lX3BhcnNlTW9udGgoZGF0ZSwgc3RyaW5nLCBpKSB7XG4gICAgZDNfdGltZV9tb250aFJlLmxhc3RJbmRleCA9IDA7XG4gICAgdmFyIG4gPSBkM190aW1lX21vbnRoUmUuZXhlYyhzdHJpbmcuc3Vic3RyaW5nKGkpKTtcbiAgICByZXR1cm4gbiA/IChkYXRlLm0gPSBkM190aW1lX21vbnRoTG9va3VwLmdldChuWzBdLnRvTG93ZXJDYXNlKCkpLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZV9wYXJzZUxvY2FsZUZ1bGwoZGF0ZSwgc3RyaW5nLCBpKSB7XG4gICAgcmV0dXJuIGQzX3RpbWVfcGFyc2UoZGF0ZSwgZDNfdGltZV9mb3JtYXRzLmMudG9TdHJpbmcoKSwgc3RyaW5nLCBpKTtcbiAgfVxuICBmdW5jdGlvbiBkM190aW1lX3BhcnNlTG9jYWxlRGF0ZShkYXRlLCBzdHJpbmcsIGkpIHtcbiAgICByZXR1cm4gZDNfdGltZV9wYXJzZShkYXRlLCBkM190aW1lX2Zvcm1hdHMueC50b1N0cmluZygpLCBzdHJpbmcsIGkpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3RpbWVfcGFyc2VMb2NhbGVUaW1lKGRhdGUsIHN0cmluZywgaSkge1xuICAgIHJldHVybiBkM190aW1lX3BhcnNlKGRhdGUsIGQzX3RpbWVfZm9ybWF0cy5YLnRvU3RyaW5nKCksIHN0cmluZywgaSk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZV9wYXJzZUZ1bGxZZWFyKGRhdGUsIHN0cmluZywgaSkge1xuICAgIGQzX3RpbWVfbnVtYmVyUmUubGFzdEluZGV4ID0gMDtcbiAgICB2YXIgbiA9IGQzX3RpbWVfbnVtYmVyUmUuZXhlYyhzdHJpbmcuc3Vic3RyaW5nKGksIGkgKyA0KSk7XG4gICAgcmV0dXJuIG4gPyAoZGF0ZS55ID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuICBmdW5jdGlvbiBkM190aW1lX3BhcnNlWWVhcihkYXRlLCBzdHJpbmcsIGkpIHtcbiAgICBkM190aW1lX251bWJlclJlLmxhc3RJbmRleCA9IDA7XG4gICAgdmFyIG4gPSBkM190aW1lX251bWJlclJlLmV4ZWMoc3RyaW5nLnN1YnN0cmluZyhpLCBpICsgMikpO1xuICAgIHJldHVybiBuID8gKGRhdGUueSA9IGQzX3RpbWVfZXhwYW5kWWVhcigrblswXSksIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuICBmdW5jdGlvbiBkM190aW1lX2V4cGFuZFllYXIoZCkge1xuICAgIHJldHVybiBkICsgKGQgPiA2OCA/IDE5MDAgOiAyZTMpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3RpbWVfcGFyc2VNb250aE51bWJlcihkYXRlLCBzdHJpbmcsIGkpIHtcbiAgICBkM190aW1lX251bWJlclJlLmxhc3RJbmRleCA9IDA7XG4gICAgdmFyIG4gPSBkM190aW1lX251bWJlclJlLmV4ZWMoc3RyaW5nLnN1YnN0cmluZyhpLCBpICsgMikpO1xuICAgIHJldHVybiBuID8gKGRhdGUubSA9IG5bMF0gLSAxLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZV9wYXJzZURheShkYXRlLCBzdHJpbmcsIGkpIHtcbiAgICBkM190aW1lX251bWJlclJlLmxhc3RJbmRleCA9IDA7XG4gICAgdmFyIG4gPSBkM190aW1lX251bWJlclJlLmV4ZWMoc3RyaW5nLnN1YnN0cmluZyhpLCBpICsgMikpO1xuICAgIHJldHVybiBuID8gKGRhdGUuZCA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZV9wYXJzZURheU9mWWVhcihkYXRlLCBzdHJpbmcsIGkpIHtcbiAgICBkM190aW1lX251bWJlclJlLmxhc3RJbmRleCA9IDA7XG4gICAgdmFyIG4gPSBkM190aW1lX251bWJlclJlLmV4ZWMoc3RyaW5nLnN1YnN0cmluZyhpLCBpICsgMykpO1xuICAgIHJldHVybiBuID8gKGRhdGUuaiA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZV9wYXJzZUhvdXIyNChkYXRlLCBzdHJpbmcsIGkpIHtcbiAgICBkM190aW1lX251bWJlclJlLmxhc3RJbmRleCA9IDA7XG4gICAgdmFyIG4gPSBkM190aW1lX251bWJlclJlLmV4ZWMoc3RyaW5nLnN1YnN0cmluZyhpLCBpICsgMikpO1xuICAgIHJldHVybiBuID8gKGRhdGUuSCA9ICtuWzBdLCBpICsgblswXS5sZW5ndGgpIDogLTE7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZV9wYXJzZU1pbnV0ZXMoZGF0ZSwgc3RyaW5nLCBpKSB7XG4gICAgZDNfdGltZV9udW1iZXJSZS5sYXN0SW5kZXggPSAwO1xuICAgIHZhciBuID0gZDNfdGltZV9udW1iZXJSZS5leGVjKHN0cmluZy5zdWJzdHJpbmcoaSwgaSArIDIpKTtcbiAgICByZXR1cm4gbiA/IChkYXRlLk0gPSArblswXSwgaSArIG5bMF0ubGVuZ3RoKSA6IC0xO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3RpbWVfcGFyc2VTZWNvbmRzKGRhdGUsIHN0cmluZywgaSkge1xuICAgIGQzX3RpbWVfbnVtYmVyUmUubGFzdEluZGV4ID0gMDtcbiAgICB2YXIgbiA9IGQzX3RpbWVfbnVtYmVyUmUuZXhlYyhzdHJpbmcuc3Vic3RyaW5nKGksIGkgKyAyKSk7XG4gICAgcmV0dXJuIG4gPyAoZGF0ZS5TID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuICBmdW5jdGlvbiBkM190aW1lX3BhcnNlTWlsbGlzZWNvbmRzKGRhdGUsIHN0cmluZywgaSkge1xuICAgIGQzX3RpbWVfbnVtYmVyUmUubGFzdEluZGV4ID0gMDtcbiAgICB2YXIgbiA9IGQzX3RpbWVfbnVtYmVyUmUuZXhlYyhzdHJpbmcuc3Vic3RyaW5nKGksIGkgKyAzKSk7XG4gICAgcmV0dXJuIG4gPyAoZGF0ZS5MID0gK25bMF0sIGkgKyBuWzBdLmxlbmd0aCkgOiAtMTtcbiAgfVxuICB2YXIgZDNfdGltZV9udW1iZXJSZSA9IC9eXFxzKlxcZCsvO1xuICBmdW5jdGlvbiBkM190aW1lX3BhcnNlQW1QbShkYXRlLCBzdHJpbmcsIGkpIHtcbiAgICB2YXIgbiA9IGQzX3RpbWVfYW1QbUxvb2t1cC5nZXQoc3RyaW5nLnN1YnN0cmluZyhpLCBpICs9IDIpLnRvTG93ZXJDYXNlKCkpO1xuICAgIHJldHVybiBuID09IG51bGwgPyAtMSA6IChkYXRlLnAgPSBuLCBpKTtcbiAgfVxuICB2YXIgZDNfdGltZV9hbVBtTG9va3VwID0gZDMubWFwKHtcbiAgICBhbTogMCxcbiAgICBwbTogMVxuICB9KTtcbiAgZnVuY3Rpb24gZDNfdGltZV96b25lKGQpIHtcbiAgICB2YXIgeiA9IGQuZ2V0VGltZXpvbmVPZmZzZXQoKSwgenMgPSB6ID4gMCA/IFwiLVwiIDogXCIrXCIsIHpoID0gfn4oTWF0aC5hYnMoeikgLyA2MCksIHptID0gTWF0aC5hYnMoeikgJSA2MDtcbiAgICByZXR1cm4genMgKyBkM190aW1lX2Zvcm1hdFBhZCh6aCwgXCIwXCIsIDIpICsgZDNfdGltZV9mb3JtYXRQYWQoem0sIFwiMFwiLCAyKTtcbiAgfVxuICBmdW5jdGlvbiBkM190aW1lX3BhcnNlTGl0ZXJhbFBlcmNlbnQoZGF0ZSwgc3RyaW5nLCBpKSB7XG4gICAgZDNfdGltZV9wZXJjZW50UmUubGFzdEluZGV4ID0gMDtcbiAgICB2YXIgbiA9IGQzX3RpbWVfcGVyY2VudFJlLmV4ZWMoc3RyaW5nLnN1YnN0cmluZyhpLCBpICsgMSkpO1xuICAgIHJldHVybiBuID8gaSArIG5bMF0ubGVuZ3RoIDogLTE7XG4gIH1cbiAgZDMudGltZS5mb3JtYXQudXRjID0gZnVuY3Rpb24odGVtcGxhdGUpIHtcbiAgICB2YXIgbG9jYWwgPSBkMy50aW1lLmZvcm1hdCh0ZW1wbGF0ZSk7XG4gICAgZnVuY3Rpb24gZm9ybWF0KGRhdGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGQzX3RpbWUgPSBkM190aW1lX3V0YztcbiAgICAgICAgdmFyIHV0YyA9IG5ldyBkM190aW1lKCk7XG4gICAgICAgIHV0Yy5fID0gZGF0ZTtcbiAgICAgICAgcmV0dXJuIGxvY2FsKHV0Yyk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBkM190aW1lID0gRGF0ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9ybWF0LnBhcnNlID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkM190aW1lID0gZDNfdGltZV91dGM7XG4gICAgICAgIHZhciBkYXRlID0gbG9jYWwucGFyc2Uoc3RyaW5nKTtcbiAgICAgICAgcmV0dXJuIGRhdGUgJiYgZGF0ZS5fO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgZDNfdGltZSA9IERhdGU7XG4gICAgICB9XG4gICAgfTtcbiAgICBmb3JtYXQudG9TdHJpbmcgPSBsb2NhbC50b1N0cmluZztcbiAgICByZXR1cm4gZm9ybWF0O1xuICB9O1xuICB2YXIgZDNfdGltZV9mb3JtYXRJc28gPSBkMy50aW1lLmZvcm1hdC51dGMoXCIlWS0lbS0lZFQlSDolTTolUy4lTFpcIik7XG4gIGQzLnRpbWUuZm9ybWF0LmlzbyA9IERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nICYmICtuZXcgRGF0ZShcIjIwMDAtMDEtMDFUMDA6MDA6MDAuMDAwWlwiKSA/IGQzX3RpbWVfZm9ybWF0SXNvTmF0aXZlIDogZDNfdGltZV9mb3JtYXRJc287XG4gIGZ1bmN0aW9uIGQzX3RpbWVfZm9ybWF0SXNvTmF0aXZlKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS50b0lTT1N0cmluZygpO1xuICB9XG4gIGQzX3RpbWVfZm9ybWF0SXNvTmF0aXZlLnBhcnNlID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShzdHJpbmcpO1xuICAgIHJldHVybiBpc05hTihkYXRlKSA/IG51bGwgOiBkYXRlO1xuICB9O1xuICBkM190aW1lX2Zvcm1hdElzb05hdGl2ZS50b1N0cmluZyA9IGQzX3RpbWVfZm9ybWF0SXNvLnRvU3RyaW5nO1xuICBkMy50aW1lLnNlY29uZCA9IGQzX3RpbWVfaW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBuZXcgZDNfdGltZShNYXRoLmZsb29yKGRhdGUgLyAxZTMpICogMWUzKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgb2Zmc2V0KSB7XG4gICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgTWF0aC5mbG9vcihvZmZzZXQpICogMWUzKTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFNlY29uZHMoKTtcbiAgfSk7XG4gIGQzLnRpbWUuc2Vjb25kcyA9IGQzLnRpbWUuc2Vjb25kLnJhbmdlO1xuICBkMy50aW1lLnNlY29uZHMudXRjID0gZDMudGltZS5zZWNvbmQudXRjLnJhbmdlO1xuICBkMy50aW1lLm1pbnV0ZSA9IGQzX3RpbWVfaW50ZXJ2YWwoZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBuZXcgZDNfdGltZShNYXRoLmZsb29yKGRhdGUgLyA2ZTQpICogNmU0KTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgb2Zmc2V0KSB7XG4gICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgTWF0aC5mbG9vcihvZmZzZXQpICogNmU0KTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgfSk7XG4gIGQzLnRpbWUubWludXRlcyA9IGQzLnRpbWUubWludXRlLnJhbmdlO1xuICBkMy50aW1lLm1pbnV0ZXMudXRjID0gZDMudGltZS5taW51dGUudXRjLnJhbmdlO1xuICBkMy50aW1lLmhvdXIgPSBkM190aW1lX2ludGVydmFsKGZ1bmN0aW9uKGRhdGUpIHtcbiAgICB2YXIgdGltZXpvbmUgPSBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCkgLyA2MDtcbiAgICByZXR1cm4gbmV3IGQzX3RpbWUoKE1hdGguZmxvb3IoZGF0ZSAvIDM2ZTUgLSB0aW1lem9uZSkgKyB0aW1lem9uZSkgKiAzNmU1KTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgb2Zmc2V0KSB7XG4gICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgTWF0aC5mbG9vcihvZmZzZXQpICogMzZlNSk7XG4gIH0sIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpO1xuICB9KTtcbiAgZDMudGltZS5ob3VycyA9IGQzLnRpbWUuaG91ci5yYW5nZTtcbiAgZDMudGltZS5ob3Vycy51dGMgPSBkMy50aW1lLmhvdXIudXRjLnJhbmdlO1xuICBkMy50aW1lLm1vbnRoID0gZDNfdGltZV9pbnRlcnZhbChmdW5jdGlvbihkYXRlKSB7XG4gICAgZGF0ZSA9IGQzLnRpbWUuZGF5KGRhdGUpO1xuICAgIGRhdGUuc2V0RGF0ZSgxKTtcbiAgICByZXR1cm4gZGF0ZTtcbiAgfSwgZnVuY3Rpb24oZGF0ZSwgb2Zmc2V0KSB7XG4gICAgZGF0ZS5zZXRNb250aChkYXRlLmdldE1vbnRoKCkgKyBvZmZzZXQpO1xuICB9LCBmdW5jdGlvbihkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0TW9udGgoKTtcbiAgfSk7XG4gIGQzLnRpbWUubW9udGhzID0gZDMudGltZS5tb250aC5yYW5nZTtcbiAgZDMudGltZS5tb250aHMudXRjID0gZDMudGltZS5tb250aC51dGMucmFuZ2U7XG4gIGZ1bmN0aW9uIGQzX3RpbWVfc2NhbGUobGluZWFyLCBtZXRob2RzLCBmb3JtYXQpIHtcbiAgICBmdW5jdGlvbiBzY2FsZSh4KSB7XG4gICAgICByZXR1cm4gbGluZWFyKHgpO1xuICAgIH1cbiAgICBzY2FsZS5pbnZlcnQgPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gZDNfdGltZV9zY2FsZURhdGUobGluZWFyLmludmVydCh4KSk7XG4gICAgfTtcbiAgICBzY2FsZS5kb21haW4gPSBmdW5jdGlvbih4KSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsaW5lYXIuZG9tYWluKCkubWFwKGQzX3RpbWVfc2NhbGVEYXRlKTtcbiAgICAgIGxpbmVhci5kb21haW4oeCk7XG4gICAgICByZXR1cm4gc2NhbGU7XG4gICAgfTtcbiAgICBzY2FsZS5uaWNlID0gZnVuY3Rpb24obSkge1xuICAgICAgcmV0dXJuIHNjYWxlLmRvbWFpbihkM19zY2FsZV9uaWNlKHNjYWxlLmRvbWFpbigpLCBtKSk7XG4gICAgfTtcbiAgICBzY2FsZS50aWNrcyA9IGZ1bmN0aW9uKG0sIGspIHtcbiAgICAgIHZhciBleHRlbnQgPSBkM19zY2FsZUV4dGVudChzY2FsZS5kb21haW4oKSk7XG4gICAgICBpZiAodHlwZW9mIG0gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB2YXIgc3BhbiA9IGV4dGVudFsxXSAtIGV4dGVudFswXSwgdGFyZ2V0ID0gc3BhbiAvIG0sIGkgPSBkMy5iaXNlY3QoZDNfdGltZV9zY2FsZVN0ZXBzLCB0YXJnZXQpO1xuICAgICAgICBpZiAoaSA9PSBkM190aW1lX3NjYWxlU3RlcHMubGVuZ3RoKSByZXR1cm4gbWV0aG9kcy55ZWFyKGV4dGVudCwgbSk7XG4gICAgICAgIGlmICghaSkgcmV0dXJuIGxpbmVhci50aWNrcyhtKS5tYXAoZDNfdGltZV9zY2FsZURhdGUpO1xuICAgICAgICBpZiAodGFyZ2V0IC8gZDNfdGltZV9zY2FsZVN0ZXBzW2kgLSAxXSA8IGQzX3RpbWVfc2NhbGVTdGVwc1tpXSAvIHRhcmdldCkgLS1pO1xuICAgICAgICBtID0gbWV0aG9kc1tpXTtcbiAgICAgICAgayA9IG1bMV07XG4gICAgICAgIG0gPSBtWzBdLnJhbmdlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG0oZXh0ZW50WzBdLCBuZXcgRGF0ZSgrZXh0ZW50WzFdICsgMSksIGspO1xuICAgIH07XG4gICAgc2NhbGUudGlja0Zvcm1hdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZvcm1hdDtcbiAgICB9O1xuICAgIHNjYWxlLmNvcHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkM190aW1lX3NjYWxlKGxpbmVhci5jb3B5KCksIG1ldGhvZHMsIGZvcm1hdCk7XG4gICAgfTtcbiAgICByZXR1cm4gZDNfc2NhbGVfbGluZWFyUmViaW5kKHNjYWxlLCBsaW5lYXIpO1xuICB9XG4gIGZ1bmN0aW9uIGQzX3RpbWVfc2NhbGVEYXRlKHQpIHtcbiAgICByZXR1cm4gbmV3IERhdGUodCk7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZV9zY2FsZUZvcm1hdChmb3JtYXRzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIHZhciBpID0gZm9ybWF0cy5sZW5ndGggLSAxLCBmID0gZm9ybWF0c1tpXTtcbiAgICAgIHdoaWxlICghZlsxXShkYXRlKSkgZiA9IGZvcm1hdHNbLS1pXTtcbiAgICAgIHJldHVybiBmWzBdKGRhdGUpO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZV9zY2FsZVNldFllYXIoeSkge1xuICAgIHZhciBkID0gbmV3IERhdGUoeSwgMCwgMSk7XG4gICAgZC5zZXRGdWxsWWVhcih5KTtcbiAgICByZXR1cm4gZDtcbiAgfVxuICBmdW5jdGlvbiBkM190aW1lX3NjYWxlR2V0WWVhcihkKSB7XG4gICAgdmFyIHkgPSBkLmdldEZ1bGxZZWFyKCksIGQwID0gZDNfdGltZV9zY2FsZVNldFllYXIoeSksIGQxID0gZDNfdGltZV9zY2FsZVNldFllYXIoeSArIDEpO1xuICAgIHJldHVybiB5ICsgKGQgLSBkMCkgLyAoZDEgLSBkMCk7XG4gIH1cbiAgdmFyIGQzX3RpbWVfc2NhbGVTdGVwcyA9IFsgMWUzLCA1ZTMsIDE1ZTMsIDNlNCwgNmU0LCAzZTUsIDllNSwgMThlNSwgMzZlNSwgMTA4ZTUsIDIxNmU1LCA0MzJlNSwgODY0ZTUsIDE3MjhlNSwgNjA0OGU1LCAyNTkyZTYsIDc3NzZlNiwgMzE1MzZlNiBdO1xuICB2YXIgZDNfdGltZV9zY2FsZUxvY2FsTWV0aG9kcyA9IFsgWyBkMy50aW1lLnNlY29uZCwgMSBdLCBbIGQzLnRpbWUuc2Vjb25kLCA1IF0sIFsgZDMudGltZS5zZWNvbmQsIDE1IF0sIFsgZDMudGltZS5zZWNvbmQsIDMwIF0sIFsgZDMudGltZS5taW51dGUsIDEgXSwgWyBkMy50aW1lLm1pbnV0ZSwgNSBdLCBbIGQzLnRpbWUubWludXRlLCAxNSBdLCBbIGQzLnRpbWUubWludXRlLCAzMCBdLCBbIGQzLnRpbWUuaG91ciwgMSBdLCBbIGQzLnRpbWUuaG91ciwgMyBdLCBbIGQzLnRpbWUuaG91ciwgNiBdLCBbIGQzLnRpbWUuaG91ciwgMTIgXSwgWyBkMy50aW1lLmRheSwgMSBdLCBbIGQzLnRpbWUuZGF5LCAyIF0sIFsgZDMudGltZS53ZWVrLCAxIF0sIFsgZDMudGltZS5tb250aCwgMSBdLCBbIGQzLnRpbWUubW9udGgsIDMgXSwgWyBkMy50aW1lLnllYXIsIDEgXSBdO1xuICB2YXIgZDNfdGltZV9zY2FsZUxvY2FsRm9ybWF0cyA9IFsgWyBkMy50aW1lLmZvcm1hdChcIiVZXCIpLCBkM190cnVlIF0sIFsgZDMudGltZS5mb3JtYXQoXCIlQlwiKSwgZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBkLmdldE1vbnRoKCk7XG4gIH0gXSwgWyBkMy50aW1lLmZvcm1hdChcIiViICVkXCIpLCBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIGQuZ2V0RGF0ZSgpICE9IDE7XG4gIH0gXSwgWyBkMy50aW1lLmZvcm1hdChcIiVhICVkXCIpLCBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIGQuZ2V0RGF5KCkgJiYgZC5nZXREYXRlKCkgIT0gMTtcbiAgfSBdLCBbIGQzLnRpbWUuZm9ybWF0KFwiJUkgJXBcIiksIGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gZC5nZXRIb3VycygpO1xuICB9IF0sIFsgZDMudGltZS5mb3JtYXQoXCIlSTolTVwiKSwgZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBkLmdldE1pbnV0ZXMoKTtcbiAgfSBdLCBbIGQzLnRpbWUuZm9ybWF0KFwiOiVTXCIpLCBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIGQuZ2V0U2Vjb25kcygpO1xuICB9IF0sIFsgZDMudGltZS5mb3JtYXQoXCIuJUxcIiksIGZ1bmN0aW9uKGQpIHtcbiAgICByZXR1cm4gZC5nZXRNaWxsaXNlY29uZHMoKTtcbiAgfSBdIF07XG4gIHZhciBkM190aW1lX3NjYWxlTGluZWFyID0gZDMuc2NhbGUubGluZWFyKCksIGQzX3RpbWVfc2NhbGVMb2NhbEZvcm1hdCA9IGQzX3RpbWVfc2NhbGVGb3JtYXQoZDNfdGltZV9zY2FsZUxvY2FsRm9ybWF0cyk7XG4gIGQzX3RpbWVfc2NhbGVMb2NhbE1ldGhvZHMueWVhciA9IGZ1bmN0aW9uKGV4dGVudCwgbSkge1xuICAgIHJldHVybiBkM190aW1lX3NjYWxlTGluZWFyLmRvbWFpbihleHRlbnQubWFwKGQzX3RpbWVfc2NhbGVHZXRZZWFyKSkudGlja3MobSkubWFwKGQzX3RpbWVfc2NhbGVTZXRZZWFyKTtcbiAgfTtcbiAgZDMudGltZS5zY2FsZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkM190aW1lX3NjYWxlKGQzLnNjYWxlLmxpbmVhcigpLCBkM190aW1lX3NjYWxlTG9jYWxNZXRob2RzLCBkM190aW1lX3NjYWxlTG9jYWxGb3JtYXQpO1xuICB9O1xuICB2YXIgZDNfdGltZV9zY2FsZVVUQ01ldGhvZHMgPSBkM190aW1lX3NjYWxlTG9jYWxNZXRob2RzLm1hcChmdW5jdGlvbihtKSB7XG4gICAgcmV0dXJuIFsgbVswXS51dGMsIG1bMV0gXTtcbiAgfSk7XG4gIHZhciBkM190aW1lX3NjYWxlVVRDRm9ybWF0cyA9IFsgWyBkMy50aW1lLmZvcm1hdC51dGMoXCIlWVwiKSwgZDNfdHJ1ZSBdLCBbIGQzLnRpbWUuZm9ybWF0LnV0YyhcIiVCXCIpLCBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIGQuZ2V0VVRDTW9udGgoKTtcbiAgfSBdLCBbIGQzLnRpbWUuZm9ybWF0LnV0YyhcIiViICVkXCIpLCBmdW5jdGlvbihkKSB7XG4gICAgcmV0dXJuIGQuZ2V0VVRDRGF0ZSgpICE9IDE7XG4gIH0gXSwgWyBkMy50aW1lLmZvcm1hdC51dGMoXCIlYSAlZFwiKSwgZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBkLmdldFVUQ0RheSgpICYmIGQuZ2V0VVRDRGF0ZSgpICE9IDE7XG4gIH0gXSwgWyBkMy50aW1lLmZvcm1hdC51dGMoXCIlSSAlcFwiKSwgZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBkLmdldFVUQ0hvdXJzKCk7XG4gIH0gXSwgWyBkMy50aW1lLmZvcm1hdC51dGMoXCIlSTolTVwiKSwgZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBkLmdldFVUQ01pbnV0ZXMoKTtcbiAgfSBdLCBbIGQzLnRpbWUuZm9ybWF0LnV0YyhcIjolU1wiKSwgZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBkLmdldFVUQ1NlY29uZHMoKTtcbiAgfSBdLCBbIGQzLnRpbWUuZm9ybWF0LnV0YyhcIi4lTFwiKSwgZnVuY3Rpb24oZCkge1xuICAgIHJldHVybiBkLmdldFVUQ01pbGxpc2Vjb25kcygpO1xuICB9IF0gXTtcbiAgdmFyIGQzX3RpbWVfc2NhbGVVVENGb3JtYXQgPSBkM190aW1lX3NjYWxlRm9ybWF0KGQzX3RpbWVfc2NhbGVVVENGb3JtYXRzKTtcbiAgZnVuY3Rpb24gZDNfdGltZV9zY2FsZVVUQ1NldFllYXIoeSkge1xuICAgIHZhciBkID0gbmV3IERhdGUoRGF0ZS5VVEMoeSwgMCwgMSkpO1xuICAgIGQuc2V0VVRDRnVsbFllYXIoeSk7XG4gICAgcmV0dXJuIGQ7XG4gIH1cbiAgZnVuY3Rpb24gZDNfdGltZV9zY2FsZVVUQ0dldFllYXIoZCkge1xuICAgIHZhciB5ID0gZC5nZXRVVENGdWxsWWVhcigpLCBkMCA9IGQzX3RpbWVfc2NhbGVVVENTZXRZZWFyKHkpLCBkMSA9IGQzX3RpbWVfc2NhbGVVVENTZXRZZWFyKHkgKyAxKTtcbiAgICByZXR1cm4geSArIChkIC0gZDApIC8gKGQxIC0gZDApO1xuICB9XG4gIGQzX3RpbWVfc2NhbGVVVENNZXRob2RzLnllYXIgPSBmdW5jdGlvbihleHRlbnQsIG0pIHtcbiAgICByZXR1cm4gZDNfdGltZV9zY2FsZUxpbmVhci5kb21haW4oZXh0ZW50Lm1hcChkM190aW1lX3NjYWxlVVRDR2V0WWVhcikpLnRpY2tzKG0pLm1hcChkM190aW1lX3NjYWxlVVRDU2V0WWVhcik7XG4gIH07XG4gIGQzLnRpbWUuc2NhbGUudXRjID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGQzX3RpbWVfc2NhbGUoZDMuc2NhbGUubGluZWFyKCksIGQzX3RpbWVfc2NhbGVVVENNZXRob2RzLCBkM190aW1lX3NjYWxlVVRDRm9ybWF0KTtcbiAgfTtcbiAgZDMudGV4dCA9IGQzX3hoclR5cGUoZnVuY3Rpb24ocmVxdWVzdCkge1xuICAgIHJldHVybiByZXF1ZXN0LnJlc3BvbnNlVGV4dDtcbiAgfSk7XG4gIGQzLmpzb24gPSBmdW5jdGlvbih1cmwsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGQzX3hocih1cmwsIFwiYXBwbGljYXRpb24vanNvblwiLCBkM19qc29uLCBjYWxsYmFjayk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2pzb24ocmVxdWVzdCkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgfVxuICBkMy5odG1sID0gZnVuY3Rpb24odXJsLCBjYWxsYmFjaykge1xuICAgIHJldHVybiBkM194aHIodXJsLCBcInRleHQvaHRtbFwiLCBkM19odG1sLCBjYWxsYmFjayk7XG4gIH07XG4gIGZ1bmN0aW9uIGQzX2h0bWwocmVxdWVzdCkge1xuICAgIHZhciByYW5nZSA9IGQzX2RvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgcmFuZ2Uuc2VsZWN0Tm9kZShkM19kb2N1bWVudC5ib2R5KTtcbiAgICByZXR1cm4gcmFuZ2UuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgfVxuICBkMy54bWwgPSBkM194aHJUeXBlKGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiAgICByZXR1cm4gcmVxdWVzdC5yZXNwb25zZVhNTDtcbiAgfSk7XG4gIHJldHVybiBkMztcbn0oKTsiLCIoZnVuY3Rpb24oKXtyZXF1aXJlKFwiLi9kM1wiKTtcbm1vZHVsZS5leHBvcnRzID0gZDM7XG4oZnVuY3Rpb24gKCkgeyBkZWxldGUgdGhpcy5kMzsgfSkoKTsgLy8gdW5zZXQgZ2xvYmFsXG5cbn0pKCkiLCJHZW5lcmljQXR0cmlidXRlc1RhYiA9IHJlcXVpcmUgJy4uLy4uL2xpYi9zY3JpcHRzL2dlbmVyaWNBdHRyaWJ1dGVzVGFiLmNvZmZlZSdcbkRlbW9UYWIgPSByZXF1aXJlICcuLi8uLi9saWIvc2NyaXB0cy9kZW1vVGFiLmNvZmZlZSdcblxud2luZG93LmFwcC5hZGRSZXBvcnRzIFtHZW5lcmljQXR0cmlidXRlc1RhYiwgRGVtb1RhYl1cbiMgcGF0aCBtdXN0IGJlIHJlbGF0aXZlIHRvIGRpc3QvXG53aW5kb3cuYXBwLmFkZFJlcG9ydFN0eWxlc2hlZXQgJy4vZGVtby5jc3MnIl19
;