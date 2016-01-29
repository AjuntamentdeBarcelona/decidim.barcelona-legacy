App.VerificationForm =
  initialize: ->
    this.$form = $("form#new_residence")
    this.$yearSelect = this.$form.find('#residence_date_of_birth_1i')
    this.$adultVerification = this.$form.find('.adult-verification')
    this.$yearSelect.on("change", (event) => this.checkAdultVerification(event.currentTarget.value))
    this.checkAdultVerification(this.$yearSelect.val())

  checkAdultVerification: (selectedYear) ->
    currentYear = new Date().getFullYear()
    age = currentYear - selectedYear

    if (age >= 16 && age < 18)
      this.$adultVerification.show()
    else
      this.$adultVerification.hide()
