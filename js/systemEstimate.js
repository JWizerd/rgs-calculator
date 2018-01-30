var system = {

  kwhPerMonth: function() {
    var usage = parseFloat(Cookies.get('monthlyUtilityRate')) - parseFloat(Cookies.get('serviceCharge'))
    return usage / parseFloat(Cookies.get('serviceRate'))
  },

  annualKwh: function() {

    Cookies.set('annualKwh', Math.floor(this.kwhPerMonth() * 12))

  },

  render: function() {

    this.annualKwh();

    setTimeout(function(){
      $('#annual-usage').text(Cookies.get('annualKwh'))
    }, 1000)

  }

}
