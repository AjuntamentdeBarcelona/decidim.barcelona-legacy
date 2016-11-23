# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161122084725) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "pg_stat_statements"
  enable_extension "pg_trgm"
  enable_extension "unaccent"

  create_table "action_plan_reports", force: :cascade do |t|
    t.string   "file"
    t.boolean  "pending",    default: true, null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "action_plan_revisions", force: :cascade do |t|
    t.integer  "action_plan_id"
    t.integer  "author_id"
    t.text     "title"
    t.text     "description"
    t.tsvector "tsv"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "action_plan_revisions", ["tsv"], name: "index_action_plan_revisions_on_tsv", using: :gin

  create_table "action_plan_statistics", force: :cascade do |t|
    t.integer  "action_plan_id"
    t.integer  "related_proposals_count",     default: 0
    t.integer  "supports_count",              default: 0
    t.integer  "comments_count",              default: 0
    t.integer  "participants_count",          default: 0
    t.integer  "meeting_interventions_count", default: 0
    t.integer  "interventions_count",         default: 0
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
  end

  create_table "action_plans", force: :cascade do |t|
    t.integer  "category_id",                               null: false
    t.integer  "subcategory_id",                            null: false
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
    t.string   "scope",                    default: "city"
    t.integer  "district",                 default: 1
    t.boolean  "official",                 default: false,  null: false
    t.boolean  "approved",                 default: false,  null: false
    t.integer  "weight",                   default: 1,      null: false
    t.integer  "comments_count",           default: 0
    t.integer  "participatory_process_id"
  end

  add_index "action_plans", ["participatory_process_id"], name: "index_action_plans_on_participatory_process_id", using: :btree

  create_table "action_plans_proposals", id: false, force: :cascade do |t|
    t.integer "action_plan_id"
    t.integer "proposal_id"
    t.integer "level"
  end

  add_index "action_plans_proposals", ["action_plan_id"], name: "index_action_plans_proposals_on_action_plan_id", using: :btree
  add_index "action_plans_proposals", ["proposal_id"], name: "index_action_plans_proposals_on_proposal_id", using: :btree

  create_table "activities", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "action"
    t.integer  "actionable_id"
    t.string   "actionable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "activities", ["actionable_id", "actionable_type"], name: "index_activities_on_actionable_id_and_actionable_type", using: :btree
  add_index "activities", ["user_id"], name: "index_activities_on_user_id", using: :btree

  create_table "ahoy_events", id: :uuid, default: nil, force: :cascade do |t|
    t.uuid     "visit_id"
    t.integer  "user_id"
    t.string   "name"
    t.jsonb    "properties"
    t.datetime "time"
    t.string   "ip"
  end

  add_index "ahoy_events", ["name", "time"], name: "index_ahoy_events_on_name_and_time", using: :btree
  add_index "ahoy_events", ["time"], name: "index_ahoy_events_on_time", using: :btree
  add_index "ahoy_events", ["user_id"], name: "index_ahoy_events_on_user_id", using: :btree
  add_index "ahoy_events", ["visit_id"], name: "index_ahoy_events_on_visit_id", using: :btree

  create_table "annotations", force: :cascade do |t|
    t.string   "quote"
    t.text     "ranges"
    t.text     "text"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "user_id"
    t.integer  "legislation_id"
  end

  add_index "annotations", ["legislation_id"], name: "index_annotations_on_legislation_id", using: :btree
  add_index "annotations", ["user_id"], name: "index_annotations_on_user_id", using: :btree

  create_table "campaigns", force: :cascade do |t|
    t.string   "name"
    t.string   "track_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "categories", force: :cascade do |t|
    t.text     "name"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.text     "description"
    t.integer  "position"
    t.integer  "participatory_process_id"
  end

  add_index "categories", ["participatory_process_id"], name: "index_categories_on_participatory_process_id", using: :btree
  add_index "categories", ["position"], name: "index_categories_on_position", using: :btree

  create_table "comments", force: :cascade do |t|
    t.integer  "commentable_id"
    t.string   "commentable_type"
    t.text     "body"
    t.string   "subject"
    t.integer  "user_id",                                  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "hidden_at"
    t.integer  "flags_count",                  default: 0
    t.datetime "ignored_flag_at"
    t.integer  "moderator_id"
    t.integer  "administrator_id"
    t.integer  "cached_votes_total",           default: 0
    t.integer  "cached_votes_up",              default: 0
    t.integer  "cached_votes_down",            default: 0
    t.datetime "confirmed_hide_at"
    t.string   "ancestry"
    t.integer  "confidence_score",             default: 0, null: false
    t.integer  "alignment",          limit: 2
  end

  add_index "comments", ["ancestry"], name: "index_comments_on_ancestry", using: :btree
  add_index "comments", ["cached_votes_down"], name: "index_comments_on_cached_votes_down", using: :btree
  add_index "comments", ["cached_votes_total"], name: "index_comments_on_cached_votes_total", using: :btree
  add_index "comments", ["cached_votes_up"], name: "index_comments_on_cached_votes_up", using: :btree
  add_index "comments", ["commentable_id", "commentable_type"], name: "index_comments_on_commentable_id_and_commentable_type", using: :btree
  add_index "comments", ["commentable_id"], name: "index_comments_on_commentable_id", using: :btree
  add_index "comments", ["commentable_type"], name: "index_comments_on_commentable_type", using: :btree
  add_index "comments", ["hidden_at"], name: "index_comments_on_hidden_at", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "debates", force: :cascade do |t|
    t.string   "title",                        limit: 80
    t.text     "description"
    t.integer  "author_id"
    t.datetime "created_at",                                          null: false
    t.datetime "updated_at",                                          null: false
    t.string   "visit_id"
    t.datetime "hidden_at"
    t.integer  "flags_count",                             default: 0
    t.datetime "ignored_flag_at"
    t.integer  "cached_votes_total",                      default: 0
    t.integer  "cached_votes_up",                         default: 0
    t.integer  "cached_votes_down",                       default: 0
    t.integer  "comments_count",                          default: 0
    t.datetime "confirmed_hide_at"
    t.integer  "cached_anonymous_votes_total",            default: 0
    t.integer  "cached_votes_score",                      default: 0
    t.integer  "hot_score",                    limit: 8,  default: 0
    t.integer  "confidence_score",                        default: 0
    t.string   "picture"
    t.string   "slug"
    t.datetime "starts_at",                                           null: false
    t.datetime "ends_at",                                             null: false
    t.text     "instructions"
    t.integer  "participatory_process_id"
  end

  add_index "debates", ["author_id", "hidden_at"], name: "index_debates_on_author_id_and_hidden_at", using: :btree
  add_index "debates", ["author_id"], name: "index_debates_on_author_id", using: :btree
  add_index "debates", ["cached_votes_down"], name: "index_debates_on_cached_votes_down", using: :btree
  add_index "debates", ["cached_votes_score"], name: "index_debates_on_cached_votes_score", using: :btree
  add_index "debates", ["cached_votes_total"], name: "index_debates_on_cached_votes_total", using: :btree
  add_index "debates", ["cached_votes_up"], name: "index_debates_on_cached_votes_up", using: :btree
  add_index "debates", ["confidence_score"], name: "index_debates_on_confidence_score", using: :btree
  add_index "debates", ["hidden_at"], name: "index_debates_on_hidden_at", using: :btree
  add_index "debates", ["hot_score"], name: "index_debates_on_hot_score", using: :btree
  add_index "debates", ["participatory_process_id"], name: "index_debates_on_participatory_process_id", using: :btree
  add_index "debates", ["slug"], name: "index_debates_on_slug", unique: true, using: :btree
  add_index "debates", ["title"], name: "index_debates_on_title", using: :btree

  create_table "failed_census_calls", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "document_number"
    t.string   "document_type"
    t.date     "date_of_birth"
    t.string   "postal_code"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "failed_census_calls", ["user_id"], name: "index_failed_census_calls_on_user_id", using: :btree

  create_table "flags", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "flaggable_type"
    t.integer  "flaggable_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "flags", ["flaggable_type", "flaggable_id"], name: "index_flags_on_flaggable_type_and_flaggable_id", using: :btree
  add_index "flags", ["user_id", "flaggable_type", "flaggable_id"], name: "access_inappropiate_flags", using: :btree
  add_index "flags", ["user_id"], name: "index_flags_on_user_id", using: :btree

  create_table "follows", force: :cascade do |t|
    t.integer  "follower_id"
    t.integer  "following_id"
    t.string   "following_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string   "slug",                      null: false
    t.integer  "sluggable_id",              null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope"
    t.datetime "created_at"
  end

  add_index "friendly_id_slugs", ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true, using: :btree
  add_index "friendly_id_slugs", ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type", using: :btree
  add_index "friendly_id_slugs", ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id", using: :btree
  add_index "friendly_id_slugs", ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type", using: :btree

  create_table "geozones", force: :cascade do |t|
    t.string   "name"
    t.string   "html_map_coordinates"
    t.string   "external_code"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "identities", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "provider"
    t.string   "uid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "identities", ["user_id"], name: "index_identities_on_user_id", using: :btree

  create_table "legislations", force: :cascade do |t|
    t.string   "title"
    t.text     "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "locks", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "tries",        default: 0
    t.datetime "locked_until", default: '2000-01-01 00:01:01', null: false
    t.datetime "created_at",                                   null: false
    t.datetime "updated_at",                                   null: false
  end

  add_index "locks", ["user_id"], name: "index_locks_on_user_id", using: :btree

  create_table "meeting_pictures", force: :cascade do |t|
    t.string  "file"
    t.integer "meeting_id"
  end

  add_index "meeting_pictures", ["meeting_id"], name: "index_meeting_pictures_on_meeting_id", using: :btree

  create_table "meetings", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.string   "address"
    t.date     "held_at"
    t.time     "start_at"
    t.time     "end_at"
    t.integer  "author_id"
    t.datetime "created_at",                                    null: false
    t.datetime "updated_at",                                    null: false
    t.float    "address_latitude"
    t.float    "address_longitude"
    t.string   "address_details"
    t.tsvector "tsv"
    t.text     "close_report"
    t.datetime "closed_at"
    t.integer  "category_id"
    t.integer  "subcategory_id"
    t.string   "scope",                    default: "district"
    t.integer  "district"
    t.string   "slug"
    t.integer  "attendee_count"
    t.text     "organizations"
    t.integer  "interventions"
    t.integer  "proposals_count",          default: 0,          null: false
    t.integer  "participatory_process_id"
  end

  add_index "meetings", ["participatory_process_id"], name: "index_meetings_on_participatory_process_id", using: :btree
  add_index "meetings", ["slug"], name: "index_meetings_on_slug", unique: true, using: :btree
  add_index "meetings", ["tsv"], name: "index_meetings_on_tsv", using: :gin

  create_table "meetings_proposals", force: :cascade do |t|
    t.integer "meeting_id"
    t.integer "proposal_id"
    t.boolean "consensus"
  end

  add_index "meetings_proposals", ["meeting_id"], name: "index_meetings_proposals_on_meeting_id", using: :btree
  add_index "meetings_proposals", ["proposal_id"], name: "index_meetings_proposals_on_proposal_id", using: :btree

  create_table "newsletters", force: :cascade do |t|
    t.text     "title",      null: false
    t.text     "body",       null: false
    t.datetime "sent_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notifications", force: :cascade do |t|
    t.integer "user_id"
    t.integer "notifiable_id"
    t.string  "notifiable_type"
    t.integer "counter",         default: 1
  end

  add_index "notifications", ["user_id"], name: "index_notifications_on_user_id", using: :btree

  create_table "organizations", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name",             limit: 60
    t.datetime "verified_at"
    t.datetime "rejected_at"
    t.string   "responsible_name", limit: 60
    t.string   "document_number"
  end

  add_index "organizations", ["user_id"], name: "index_organizations_on_user_id", using: :btree

  create_table "participatory_process_attachments", force: :cascade do |t|
    t.string   "name"
    t.string   "file"
    t.string   "content_type"
    t.text     "description"
    t.integer  "file_size"
    t.integer  "participatory_process_id", null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "participatory_processes", force: :cascade do |t|
    t.string   "name"
    t.string   "slug"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.string   "admin_name"
    t.string   "admin_email"
    t.text     "title"
    t.text     "subtitle"
    t.string   "scope",                   default: "city"
    t.integer  "district",                default: 1
    t.string   "manager_group"
    t.string   "areas"
    t.text     "summary"
    t.text     "description"
    t.text     "audience"
    t.text     "citizenship_scope"
    t.datetime "hidden_at"
    t.datetime "confirmed_hide_at"
    t.string   "full_image"
    t.string   "banner_image"
    t.boolean  "published",               default: false
    t.boolean  "featured",                default: false
    t.string   "hashtag"
    t.text     "participatory_structure"
  end

  create_table "proposal_answers", force: :cascade do |t|
    t.integer  "proposal_id",                 null: false
    t.text     "message"
    t.string   "status",                      null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.boolean  "official",    default: false, null: false
  end

  add_index "proposal_answers", ["proposal_id"], name: "index_proposal_answers_on_proposal_id", unique: true, using: :btree
  add_index "proposal_answers", ["status"], name: "index_proposal_answers_on_status", using: :btree

  create_table "proposals", force: :cascade do |t|
    t.string   "title",                    limit: 250
    t.text     "description"
    t.string   "question"
    t.string   "external_url"
    t.integer  "author_id"
    t.datetime "hidden_at"
    t.integer  "flags_count",                          default: 0
    t.datetime "ignored_flag_at"
    t.integer  "cached_votes_up",                      default: 0
    t.integer  "comments_count",                       default: 0
    t.datetime "confirmed_hide_at"
    t.integer  "hot_score",                limit: 8,   default: 0
    t.integer  "confidence_score",                     default: 0
    t.datetime "created_at",                                                null: false
    t.datetime "updated_at",                                                null: false
    t.string   "responsible_name",         limit: 60
    t.text     "summary"
    t.string   "video_url"
    t.integer  "physical_votes",                       default: 0
    t.tsvector "tsv"
    t.integer  "category_id"
    t.integer  "subcategory_id"
    t.string   "scope",                                default: "district"
    t.integer  "district"
    t.boolean  "official",                             default: false
    t.string   "slug"
    t.boolean  "from_meeting"
    t.integer  "participatory_process_id"
  end

  add_index "proposals", ["author_id", "hidden_at"], name: "index_proposals_on_author_id_and_hidden_at", using: :btree
  add_index "proposals", ["author_id"], name: "index_proposals_on_author_id", using: :btree
  add_index "proposals", ["cached_votes_up"], name: "index_proposals_on_cached_votes_up", using: :btree
  add_index "proposals", ["category_id"], name: "index_proposals_on_category_id", using: :btree
  add_index "proposals", ["confidence_score"], name: "index_proposals_on_confidence_score", using: :btree
  add_index "proposals", ["created_at"], name: "index_proposals_on_created_at", using: :btree
  add_index "proposals", ["hidden_at"], name: "index_proposals_on_hidden_at", using: :btree
  add_index "proposals", ["hot_score"], name: "index_proposals_on_hot_score", using: :btree
  add_index "proposals", ["official"], name: "index_proposals_on_official", using: :btree
  add_index "proposals", ["participatory_process_id"], name: "index_proposals_on_participatory_process_id", using: :btree
  add_index "proposals", ["question"], name: "index_proposals_on_question", using: :btree
  add_index "proposals", ["slug"], name: "index_proposals_on_slug", unique: true, using: :btree
  add_index "proposals", ["subcategory_id"], name: "index_proposals_on_subcategory_id", using: :btree
  add_index "proposals", ["summary"], name: "index_proposals_on_summary", using: :btree
  add_index "proposals", ["title"], name: "index_proposals_on_title", using: :btree
  add_index "proposals", ["tsv"], name: "index_proposals_on_tsv", using: :gin

  create_table "recommendations", force: :cascade do |t|
    t.integer "user_id"
    t.integer "proposal_id"
    t.float   "score"
  end

  add_index "recommendations", ["user_id", "proposal_id"], name: "index_recommendations_on_user_id_and_proposal_id", unique: true, using: :btree

  create_table "references", force: :cascade do |t|
    t.integer  "source_id"
    t.string   "source_type"
    t.integer  "referrer_id"
    t.string   "referrer_type"
    t.integer  "referenced_id"
    t.string   "referenced_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "spending_proposals", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.integer  "author_id"
    t.string   "external_url"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "geozone_id"
    t.string   "resolution"
  end

  add_index "spending_proposals", ["author_id"], name: "index_spending_proposals_on_author_id", using: :btree
  add_index "spending_proposals", ["geozone_id"], name: "index_spending_proposals_on_geozone_id", using: :btree
  add_index "spending_proposals", ["resolution"], name: "index_spending_proposals_on_resolution", using: :btree

  create_table "steps", force: :cascade do |t|
    t.text     "title"
    t.text     "description"
    t.date     "start_at"
    t.date     "end_at"
    t.integer  "position",                 default: 0
    t.integer  "participatory_process_id"
    t.datetime "hidden_at"
    t.datetime "confirmed_hide_at"
    t.boolean  "active",                   default: false
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.string   "flags",                    default: [],                 array: true
    t.text     "summary"
    t.integer  "proposal_vote_limit",      default: 0
  end

  create_table "subcategories", force: :cascade do |t|
    t.text     "name"
    t.text     "description"
    t.integer  "category_id"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.integer  "position"
    t.integer  "participatory_process_id"
  end

  add_index "subcategories", ["category_id"], name: "index_subcategories_on_category_id", using: :btree
  add_index "subcategories", ["participatory_process_id"], name: "index_subcategories_on_participatory_process_id", using: :btree

  create_table "taggings", force: :cascade do |t|
    t.integer  "tag_id"
    t.integer  "taggable_id"
    t.string   "taggable_type"
    t.integer  "tagger_id"
    t.string   "tagger_type"
    t.string   "context",       limit: 128
    t.datetime "created_at"
  end

  add_index "taggings", ["tag_id"], name: "index_taggings_on_tag_id", using: :btree
  add_index "taggings", ["taggable_id", "taggable_type", "context"], name: "index_taggings_on_taggable_id_and_taggable_type_and_context", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string  "name",                     limit: 40
    t.integer "taggings_count",                      default: 0
    t.boolean "featured",                            default: false
    t.integer "debates_count",                       default: 0
    t.integer "proposals_count",                     default: 0
    t.integer "spending_proposals_count",            default: 0
    t.integer "meetings_count",                      default: 0
  end

  add_index "tags", ["debates_count"], name: "index_tags_on_debates_count", using: :btree
  add_index "tags", ["meetings_count"], name: "index_tags_on_meetings_count", using: :btree
  add_index "tags", ["name"], name: "index_tags_on_name", unique: true, using: :btree
  add_index "tags", ["proposals_count"], name: "index_tags_on_proposals_count", using: :btree
  add_index "tags", ["spending_proposals_count"], name: "index_tags_on_spending_proposals_count", using: :btree

  create_table "tolk_locales", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tolk_locales", ["name"], name: "index_tolk_locales_on_name", unique: true, using: :btree

  create_table "tolk_phrases", force: :cascade do |t|
    t.text     "key"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tolk_translations", force: :cascade do |t|
    t.integer  "phrase_id"
    t.integer  "locale_id"
    t.text     "text"
    t.text     "previous_text"
    t.boolean  "primary_updated", default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tolk_translations", ["phrase_id", "locale_id"], name: "index_tolk_translations_on_phrase_id_and_locale_id", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                                default: ""
    t.string   "encrypted_password",                   default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                        default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                                           null: false
    t.datetime "updated_at",                                           null: false
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.boolean  "email_on_comment",                     default: false
    t.boolean  "email_on_comment_reply",               default: false
    t.string   "phone_number",              limit: 30
    t.integer  "official_level",                       default: 0
    t.datetime "hidden_at"
    t.string   "sms_confirmation_code"
    t.string   "username",                  limit: 60
    t.string   "document_number"
    t.string   "document_type"
    t.datetime "residence_verified_at"
    t.string   "email_verification_token"
    t.datetime "verified_at"
    t.string   "unconfirmed_phone"
    t.string   "confirmed_phone"
    t.datetime "letter_requested_at"
    t.datetime "confirmed_hide_at"
    t.string   "letter_verification_code"
    t.integer  "failed_census_calls_count",            default: 0
    t.datetime "level_two_verified_at"
    t.string   "erase_reason"
    t.datetime "erased_at"
    t.boolean  "public_activity",                      default: true
    t.boolean  "newsletter",                           default: false
    t.integer  "notifications_count",                  default: 0
    t.string   "locale"
    t.boolean  "registering_with_oauth",               default: false
    t.string   "oauth_email"
    t.boolean  "notifications_by_default",             default: false
    t.boolean  "weekly_summary",                       default: false
    t.string   "roles",                                default: [],                 array: true
    t.boolean  "hide_new_terms",                       default: false
  end

  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["hidden_at"], name: "index_users_on_hidden_at", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "verified_users", force: :cascade do |t|
    t.string   "document_number"
    t.string   "document_type"
    t.string   "phone"
    t.string   "email"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "verified_users", ["document_number"], name: "index_verified_users_on_document_number", using: :btree
  add_index "verified_users", ["email"], name: "index_verified_users_on_email", using: :btree
  add_index "verified_users", ["phone"], name: "index_verified_users_on_phone", using: :btree

  create_table "visits", id: :uuid, default: nil, force: :cascade do |t|
    t.uuid     "visitor_id"
    t.string   "ip"
    t.text     "user_agent"
    t.text     "referrer"
    t.text     "landing_page"
    t.integer  "user_id"
    t.string   "referring_domain"
    t.string   "search_keyword"
    t.string   "browser"
    t.string   "os"
    t.string   "device_type"
    t.integer  "screen_height"
    t.integer  "screen_width"
    t.string   "country"
    t.string   "region"
    t.string   "city"
    t.string   "postal_code"
    t.decimal  "latitude"
    t.decimal  "longitude"
    t.string   "utm_source"
    t.string   "utm_medium"
    t.string   "utm_term"
    t.string   "utm_content"
    t.string   "utm_campaign"
    t.datetime "started_at"
  end

  add_index "visits", ["started_at"], name: "index_visits_on_started_at", using: :btree
  add_index "visits", ["user_id"], name: "index_visits_on_user_id", using: :btree

  create_table "votes", force: :cascade do |t|
    t.integer  "votable_id"
    t.string   "votable_type"
    t.integer  "voter_id"
    t.string   "voter_type"
    t.boolean  "vote_flag"
    t.string   "vote_scope"
    t.integer  "vote_weight"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "votes", ["votable_id", "votable_type", "vote_scope"], name: "index_votes_on_votable_id_and_votable_type_and_vote_scope", using: :btree
  add_index "votes", ["voter_id", "voter_type", "vote_scope"], name: "index_votes_on_voter_id_and_voter_type_and_vote_scope", using: :btree

  add_foreign_key "action_plans", "participatory_processes"
  add_foreign_key "annotations", "legislations"
  add_foreign_key "annotations", "users"
  add_foreign_key "categories", "participatory_processes"
  add_foreign_key "debates", "participatory_processes"
  add_foreign_key "failed_census_calls", "users"
  add_foreign_key "flags", "users"
  add_foreign_key "identities", "users"
  add_foreign_key "locks", "users"
  add_foreign_key "meetings", "participatory_processes"
  add_foreign_key "notifications", "users"
  add_foreign_key "organizations", "users"
  add_foreign_key "proposals", "participatory_processes"
  add_foreign_key "subcategories", "participatory_processes"
end
