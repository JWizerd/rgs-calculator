var system = {
  kwhPerMonth: 0,
  kwhPerYear: 0,
  systemSize: 0,
  cost: 0,
  solarCostPerWatt: 3.18,
  annualSavings: 0,
  systemYearPayOff: 0

  kwhPerMonth: function() {

    rate = parseFloat(Cookies.get('monthlyUtilityRate')) - parseFloat(Cookies.get('serviceCharge'))

    this.kwhPerMonth = rate / parseFloat(Cookies.get('serviceRate'));

    return this.kwhPerMonth

  },

  annualKwh: function() {

    this.kwhPerYear = Math.floor(this.kwhPerMonth() * 12)

    Cookies.set('annualKwh', this.kwhPerYear.toLocaleString())

  },

  dcSystemSize: function() {

    this.systemSize = (this.kwhPerMonth / 100).toFixed(1)

    Cookies.set('dcSystemSize', this.systemSize)

  },

  cost: function() {

    this.cost = this.systemSize * 1000 * this.solarCostPerWatt

    // since the standard federal tax credit each for solar is 30% off the total cost of the system we can add this to total?
    var federalTaxCredit = this.cost * .3

    Cookies.set('cost', Math.floor(this.cost - federalTaxCredit).toLocaleString())

  },

  annualSavingsCalc: function() {

    // Utility Bill * 12 = Savings Year 1
    
    this.annualSavings = parseFloat(Cookies.get('monthlyUtilityRate')) * 12

    Cookies.set('annualSavings', Math.floor(this.cost - federalTaxCredit).toLocaleString())

  },

  systemYearPayOffCalc: function() {

    // (Utility Bill * 12) * Utility Escalator(x) = Savings Year x 
    
    this.systemYearPayOff = this.cost / this.annualSavings
    
    Cookies.set('systemYearPayOff', this.cost / this

  },

  render: function() {

    this.annualKwh();
    this.dcSystemSize();
    this.cost();

    console.log(this.kwhPerMonth)

    setTimeout(function(){

      $('#annual-usage').text(Cookies.get('annualKwh') + 'KWh')
      $('#dc-system-size').text(Cookies.get('dcSystemSize') + 'KWh')
      $('#cost').text('$' + Cookies.get('cost'))

    }, 1000)

  }

}
