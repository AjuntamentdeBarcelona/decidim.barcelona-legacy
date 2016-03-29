require('expose?React!react');
require('expose?ReactDOM!react-dom');

import CookiesWarning             from './application/cookies_warning.component';
import EmailNotificationsReminder from './application/email_notifications_reminder.component';
import RichEditor                 from './application/rich_editor.component';
import AutocompleteInputAddress   from './location/autocomplete_input_address.component';
import CategoryPicker             from './categories/category_picker.component';
import MeetingProposalsSelector   from './meetings/meeting_proposals_selector.component';
import DebateInfoBox              from './javascripts/debates/debate_info_box.component';

import StaticMap                  from './location/static_map.component';
import MeetingsApp                from './meetings/meetings_app.component';
import MeetingsCarousel           from './meetings/meetings_carousel.component';
import MeetingsMap                from './meetings/meetings_map.component';

import ProposalsApp               from './proposals/proposals_app.component';
import ProposalsCarousel          from './proposals/proposals_carousel.component';

import Votes                      from './proposals/votes.component'; // Deprecated

window.CookiesWarning             = CookiesWarning;
window.EmailNotificationsReminder = EmailNotificationsReminder;
window.RichEditor                 = RichEditor;
window.AutocompleteInputAddress   = AutocompleteInputAddress;
window.CategoryPicker             = CategoryPicker;
window.MeetingProposalsSelector   = MeetingProposalsSelector;
window.DebateInfoBox              = DebateInfoBox;

window.StaticMap                  = StaticMap;
window.MeetingsApp                = MeetingsApp;
window.MeetingsCarousel           = MeetingsCarousel;
window.MeetingsMap                = MeetingsMap;

window.ProposalsApp               = ProposalsApp;
window.ProposalsCarousel          = ProposalsCarousel;

window.Votes                      = Votes; // Depcrecated

require('quill/dist/quill.snow');

