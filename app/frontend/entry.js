import CookiesWarning             from './application/cookies_warning.component';
import EmailNotificationsReminder from './application/email_notifications_reminder.component';
import RichEditor                 from './application/rich_editor.component';
import SocialShareButtons         from './application/social_share_buttons.component';
import AutocompleteInputAddress   from './location/autocomplete_input_address.component';
import CategoryPicker             from './categories/category_picker.component';
import DebateInfoBox              from './debates/debate_info_box.component';

import StaticMap                  from './location/static_map.component';
import MeetingsApp                from './meetings/meetings_app.component';
import MeetingsCarousel           from './meetings/meetings_carousel.component';
import MeetingsMap                from './meetings/meetings_map.component';

import ProposalsApp               from './proposals/proposals_app.component';
import ProposalApp                from './proposals/proposal_app.component';
import ProposalsCarousel          from './proposals/proposals_carousel.component';
import ProposalsSelector          from './proposals/proposals_selector.component';

window.CookiesWarning             = CookiesWarning;
window.EmailNotificationsReminder = EmailNotificationsReminder;
window.RichEditor                 = RichEditor;
window.SocialShareButtons         = SocialShareButtons;
window.AutocompleteInputAddress   = AutocompleteInputAddress;
window.CategoryPicker             = CategoryPicker;
window.DebateInfoBox              = DebateInfoBox;

window.StaticMap                  = StaticMap;
window.MeetingsApp                = MeetingsApp;
window.MeetingsCarousel           = MeetingsCarousel;
window.MeetingsMap                = MeetingsMap;

window.ProposalsApp               = ProposalsApp;
window.ProposalApp                = ProposalApp;
window.ProposalsCarousel          = ProposalsCarousel;
window.ProposalsSelector          = ProposalsSelector;

require('quill/dist/quill.snow');
require('expose?autoLink!autolink-js');
