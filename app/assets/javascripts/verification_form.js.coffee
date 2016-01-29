App.VerificationForm =
  initialize: ->
    this.$form = $("form#new_residence")
    this.$dateOfBirthSelects = this.$form.find('.date-of-birth')
    this.$daySelect = this.$form.find('residence_date_of_birth_3i')
    this.$monthSelect = this.$form.find('#residence_date_of_birth_2i')
    this.$yearSelect = this.$form.find('#residence_date_of_birth_1i')
    this.$adultVerification = this.$form.find('.adult-verification')
    this.$dateOfBirthSelects.on("change", (event) => this.checkAdultVerification())
    this.checkAdultVerification(this.$yearSelect.val())

  checkAdultVerification: () ->
    sixteenYearsAgo = moment().subtract(16, 'years')
    eighteenYearsAgo = moment().subtract(18, 'years')
    selectedDate = moment("#{this.$yearSelect.val()}-#{this.$monthSelect.val()}-#{this.$daySelect.val()}", "YYYY-MM-DD")

    if (sixteenYearsAgo.isSameOrAfter(selectedDate) && eighteenYearsAgo.isBefore(selectedDate))
      this.$adultVerification.show()
    else
      this.$adultVerification.hide()
