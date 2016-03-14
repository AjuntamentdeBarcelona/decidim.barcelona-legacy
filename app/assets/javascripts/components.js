import React from 'react';
import ReactDOM from 'react-dom';

import FilterService from './services/filter_service';

import MeetingsDirectory from './components/meetings_directory';
import StaticMap from './components/static_map';
import ProposalsCarousel from './components/proposals_carousel';
import MeetingsCarousel from './components/meetings_carousel';
import MeetingsMap from './components/meetings_map';
import ProposalFilterTabs from './components/proposal_filter_tabs';
import ProposalFilters from './components/proposal_filters';
import Loading from './components/loading';
import AutocompleteInputAddress from './components/autocomplete_input_address';
import MeetingProposalsSelector from './components/meeting_proposals_selector';
import CategoryPicker from './components/category_picker';
import CookiesWarning from './components/cookies_warning';
import EmailNotificationsReminder from './components/email_notifications_reminder';
import Votes from './components/votes';

window.React = React;
window.ReactDOM = ReactDOM;

window.FilterServiceInstance = new FilterService(); 

window.MeetingsDirectory = MeetingsDirectory;
window.StaticMap = StaticMap;
window.ProposalsCarousel = ProposalsCarousel;
window.MeetingsCarousel = MeetingsCarousel;
window.MeetingsMap = MeetingsMap;
window.ProposalFilterTabs = ProposalFilterTabs;
window.ProposalFilters = ProposalFilters;
window.Loading = Loading;
window.AutocompleteInputAddress = AutocompleteInputAddress;
window.MeetingProposalsSelector = MeetingProposalsSelector;
window.CategoryPicker = CategoryPicker;
window.CookiesWarning = CookiesWarning;
window.EmailNotificationsReminder = EmailNotificationsReminder;
window.Votes = Votes;
