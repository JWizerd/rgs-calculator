var system = {
  kwhPerMonth: 0,
  kwhPerYear: 0,
  systemSize: 0,
  cost: 0,
  solarCostPerWatt: 3.18,
  monthlySavings: 0,
  annualSavings: 0,
  systemYearPayOff: 0,
  payoffPeriod: 0,

  kwhPerMonth: function() {

    rate = parseFloat(Cookies.get('monthlyUtilityRate')) - parseFloat(Cookies.get('serviceCharge'))

    this.kwhPerMonth = rate / parseFloat(Cookies.get('serviceRate'));

    return this.kwhPerMonth

  },

  annualKwh: function() {

    this.kwhPerYear = Math.floor(this.kwhPerMonth() * 12)

    Cookies.set('annualKwh', this.kwhPerYear.toLocaleString(), { expires: view.expiration })

  },

  dcSystemSize: function() {

    this.systemSize = (this.kwhPerMonth / 100).toFixed(1)

    Cookies.set('dcSystemSize', this.systemSize, { expires: view.expiration })

  },

  cost: function() {

    this.cost = this.systemSize * 1000 * this.solarCostPerWatt

    // since the standard federal tax credit each for solar is 30% off the total cost of the system we can add this to total?
    var federalTaxCredit = this.cost * .3

    Cookies.set('cost', Math.floor(this.cost - federalTaxCredit).toLocaleString(), { expires: view.expiration })

  },

  setMonthlySavings: function () {

    // for now monthly savings is set to what a users monthly utility bill is

    this.monthlySavings = parseInt(Cookies.get('monthlyUtilityRate'))

    Cookies.set('monthlySavings', this.monthlySavings, { expires: view.expiration })

  },

  annualSavingsCalc: function() {

    // Utility Bill * 12 = Savings Year 1
    
    this.annualSavings = this.monthlySavings * 12

    Cookies.set('annualSavings', this.annualSavings, { expires: view.expiration })

  },

  systemYearPayOffCalc: function() {

    // (Utility Bill * 12) * Utility Escalator(x) = Savings Year x 
    this.payoffPeriod = Math.floor(this.cost / this.annualSavings)
    
    this.systemYearPayOff = new Date().getFullYear() + Math.floor(this.cost / this.annualSavings) 
    
    Cookies.set('systemYearPayOff', this.systemYearPayOff, { expires: view.expiration })
    Cookies.set('payoffPeriod', this.payoffPeriod, { expires: view.expiration })

  },

  render: function() {

    this.annualKwh()
    this.dcSystemSize()
    this.cost()
    this.setMonthlySavings()
    this.annualSavingsCalc()
    this.systemYearPayOffCalc()

    setTimeout(function(){

      $('#roof-image').css({
        'background': 'url(' + Cookies.get('roofImage') +  ') top center / cover no-repeat'
      })

      $('#annual-usage').text(Cookies.get('annualKwh') + 'KWh')
      $('#dc-system-size').text(Cookies.get('dcSystemSize') + 'KWh')
      $('#cost').text('$' + Cookies.get('cost'))
      $('#monthly-savings').text('$' + Cookies.get('monthlySavings'))
      $('#annual-savings').text('$' + Cookies.get('annualSavings'))
      $('#payback-period').text(Cookies.get('payoffPeriod') + ' Years')
      $('#payback-year').text(Cookies.get('systemYearPayOff'))

    }, 1000)

  }

}
