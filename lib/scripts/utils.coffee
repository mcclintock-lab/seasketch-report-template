module.exports =
  
  round: (number, decimalPlaces) ->
    unless _.isNumber number
      number = parseFloat(number)
    multiplier = Math.pow 10, decimalPlaces
    Math.round(number * multiplier) / multiplier