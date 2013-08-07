module.exports = (el) ->
  $el = $ el
  app = window.app
  toc = app.getToc()
  unless toc
    console.log 'No table of contents found'
    return
  togglers = $el.find('a[data-toggle-node]')
  # Set initial state
  for toggler in togglers.toArray()
    $toggler = $(toggler)
    nodeid = $toggler.data('toggle-node')
    try
      view = toc.getChildViewById nodeid
      node = view.model
      $toggler.attr 'data-visible', !!node.get('visible')
      $toggler.data 'tocItem', view
    catch e
      $toggler.attr 'data-not-found', 'true'

  togglers.on 'click', (e) ->
    e.preventDefault()
    $el = $(@)
    view = $el.data('tocItem')
    if view
      view.toggleVisibility(e)
      $toggler.attr 'data-visible', !!view.model.get('visible')
    else
      alert "Layer not found in the current Table of Contents. \nExpected nodeid #{$el.data('toggle-node')}"
