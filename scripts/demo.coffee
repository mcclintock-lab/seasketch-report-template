ReportTab = require 'reportTab'
templates = require '../templates/templates.js'
d3 = window.d3

class DemoTab extends ReportTab
  name: 'Examples'
  className: 'demo'
  template: templates.demo

  render: () ->
    # create random data for visualization
    data = []
    _.times 100, () -> data.push Math.round(Math.random() * 100)

    # setup context object with data and render the template from it
    context =
      sketch: @model.forTemplate()
      sketchClass: @sketchClass.forTemplate()
      attributes: @model.getAttributes()
      admin: @project.isAdmin window.user
      chartData: _.map data, (d, i) -> {index: i, value: d}
    
    @$el.html @template.render(context, templates)

    # Setup bootstrap tabs
    @$('#tabs2 a').click (e) ->
      console.log 'tab click'
      e.preventDefault()
      $(this).tab('show')

    # draw d3 visualization
    @drawChart(data)

  drawChart: (data) ->
    console.log 'draw chart'
    p = @$('#chart p')
    console.log 'p', p.length, @el
    margin = 
      top: 20
      right: 20
      bottom: 30
      left: 40

    width = 430 - margin.left - margin.right
    height = 300 - margin.top - margin.bottom

    x = d3.scale.linear()
      .range [0, width]

    y = d3.scale.linear()
      .range [height, 0]

    color = d3.scale.category10()

    xAxis = d3.svg.axis()
      .scale(x)
      .orient "bottom"

    yAxis = d3.svg.axis()
      .scale(y)
      .orient "left"

    svg = d3.select(@$("#chart")[0]).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", 
          "translate(#{margin.left},#{margin.top})")

    x.domain([0, data.length]).nice()
    y.domain(d3.extent(data, (d) -> d)).nice()

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0,#{height})")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")

    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", (d, i) -> x(i))
        .attr("cy", (d, i) -> y(d))
        .style("fill", (d) -> color(d))

    p.detach()
    @$('#chart').append p

module.exports = DemoTab