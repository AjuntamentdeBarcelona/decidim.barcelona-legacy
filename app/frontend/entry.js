require('expose?React!react');
require('expose?ReactDOM!react-dom');

import Loading                    from './application/loading.component';
import CookiesWarning             from './application/cookies_warning.component';
import EmailNotificationsReminder from './application/email_notifications_reminder.component';
import RichEditor                 from './application/rich_editor.component';
import StaticMap                  from './location/static_map.component';
import AutocompleteInputAddress   from './location/autocomplete_input_address.component';
import FilterService              from './filters/filter.service';
import CategoryPicker             from './categories/category_picker.component';
import ProposalsCarousel          from './proposals/proposals_carousel.component';
import MeetingsDirectory          from './meetings/meetings_directory.component';
import MeetingsCarousel           from './meetings/meetings_carousel.component';
import MeetingsMap                from './meetings/meetings_map.component';
import MeetingProposalsSelector   from './meetings/meeting_proposals_selector.component';
import DebateInfoBox              from './javascripts/debates/debate_info_box.component';
import ProposalsApp               from './proposals/proposals_app.component';
import Votes                      from './proposals/votes.component'; // Deprecated

window.Loading                    = Loading;
window.CookiesWarning             = CookiesWarning;
window.EmailNotificationsReminder = EmailNotificationsReminder;
window.RichEditor                 = RichEditor;
window.StaticMap                  = StaticMap;
window.AutocompleteInputAddress   = AutocompleteInputAddress;
window.FilterServiceInstance      = new FilterService();
window.CategoryPicker             = CategoryPicker;
window.ProposalsCarousel          = ProposalsCarousel;
window.MeetingsDirectory          = MeetingsDirectory;
window.MeetingsCarousel           = MeetingsCarousel;
window.MeetingsMap                = MeetingsMap;
window.MeetingProposalsSelector   = MeetingProposalsSelector;
window.DebateInfoBox              = DebateInfoBox;
window.ProposalsApp               = ProposalsApp;
window.Votes                      = Votes; // Depcrecated

require('quill/dist/quill.snow');

