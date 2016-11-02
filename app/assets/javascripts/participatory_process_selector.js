window.App = window.App || {}

App.ParticipatoryProcessSelector = {
  initialize: function () {
    var participatoryProcessSelector = $('.participatory_process_selector');

    participatoryProcessSelector.on('change', function () {
      var selectedValue = $(this).val();

      window.location = window.location.origin + window.location.pathname + "?participatory_process_id=" + selectedValue;
    });

  }
};
