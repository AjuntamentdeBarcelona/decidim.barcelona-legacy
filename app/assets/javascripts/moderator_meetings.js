window.App = window.App || {}

App.ModeratorMeetings = {
  initialize: function () {
    var newMeetingButtons = $('.new_meeting_button'),
        participatoryProcessSelector = $('.participatory_process_selector');

    participatoryProcessSelector.on('change', function () {
      var selectedValue = $(this).val();

      participatoryProcessSelector.each(function () {
        $(this).val(selectedValue);
      });

      newMeetingButtons.each(function () {
        var url = $(this).attr('href');
        url = url.replace(/participatory_process_id=\d+/, "participatory_process_id=" + selectedValue);
        $(this).attr('href', url);
      });
    });

  }
};
