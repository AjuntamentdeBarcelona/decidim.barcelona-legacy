window.App = window.App || {}

App.ModeratorMeetings = {
  initialize: function () {
    var participatoryProcessSelector = $('#meeting_participatory_process_id'),
        loadScopedFieldsUrl = participatoryProcessSelector.data('load-scoped-fields-url'),
        meetingId = participatoryProcessSelector.data('meting-id');

    participatoryProcessSelector.on('change', function () {
      var selectedValue = $(this).val();
      var url = loadScopedFieldsUrl + "?participatory_process_id=" + selectedValue;

      if (meetingId !== undefined) {
        url += '&meeting_id=' + meetingId;
      }

      $.ajax({
        url: url,
        dataType: "html",
        success: function (data) {
          $('.process-scoped-fields').html(data);
          window.ReactRailsUJS.mountComponents();
        }
      });
    });
  }
};
