require('expose?React!react');
require('expose?ReactDOM!react-dom');

import Loading                    from './javascripts/application/loading.component';
import CookiesWarning             from './javascripts/application/cookies_warning.component';
import EmailNotificationsReminder from './javascripts/application/email_notifications_reminder.component';
import RichEditor                 from './javascripts/application/rich_editor.component';
import StaticMap                  from './javascripts/location/static_map.component';
import AutocompleteInputAddress   from './javascripts/location/autocomplete_input_address.component';
import FilterService              from './javascripts/filters/filter.service';
import CategoryPicker             from './javascripts/categories/category_picker.component';
import ProposalsCarousel          from './javascripts/proposals/proposals_carousel.component';
import ProposalFilterTabs         from './javascripts/proposals/proposal_filter_tabs.component';
import ProposalFilters            from './javascripts/proposals/proposal_filters.component';
import Votes                      from './javascripts/proposals/votes.component';
import MeetingsDirectory          from './javascripts/meetings/meetings_directory.component';
import MeetingsCarousel           from './javascripts/meetings/meetings_carousel.component';
import MeetingsMap                from './javascripts/meetings/meetings_map.component';
import MeetingProposalsSelector   from './javascripts/meetings/meeting_proposals_selector.component';

window.Loading                    = Loading;
window.CookiesWarning             = CookiesWarning;
window.EmailNotificationsReminder = EmailNotificationsReminder;
window.RichEditor                 = RichEditor;
window.StaticMap                  = StaticMap;
window.AutocompleteInputAddress   = AutocompleteInputAddress;
window.FilterServiceInstance      = new FilterService();
window.CategoryPicker             = CategoryPicker;
window.ProposalsCarousel          = ProposalsCarousel;
window.ProposalFilterTabs         = ProposalFilterTabs;
window.ProposalFilters            = ProposalFilters;
window.Votes                      = Votes;
window.MeetingsDirectory          = MeetingsDirectory;
window.MeetingsCarousel           = MeetingsCarousel;
window.MeetingsMap                = MeetingsMap;
window.MeetingProposalsSelector   = MeetingProposalsSelector;

require('quill/dist/quill.snow');

