require "exporter"

namespace :exporter do
  task :users => :environment do
    data = User.unscoped.includes(:identities).find_each.map do |user|
      mirrored_attributes = [:id, :email, :encrypted_password, :reset_password_token, :reset_password_sent_at,
                          :remember_created_at, :sign_in_count, :current_sign_in_at, :last_sign_in_at,
                          :created_at, :updated_at, :confirmation_token, :confirmed_at, :confirmation_sent_at,
                          :unconfirmed_email, :locale]

      authorizations = []

      if user.verified_at?
        authorizations << {
          document_number: user.document_number,
          document_type: user.document_type,
          created_at: user.verified_at,
        }
      end

      mirrored_attributes.inject({}) do |attributes, column|
        attributes.update(column => user.send(column.to_s))
      end.merge(
        name: user.username,
        authorizations: authorizations,
        identities: user.identities.map do |identity|
          {
            provider: identity.provider,
            uid: identity.uid,
            created_at: identity.created_at,
            updated_at: identity.updated_at
          }
        end,
        extra: {
          roles: user.roles,
          phone_number: user.phone_number,
          official_level: user.official_level,
          hidden_at: user.hidden_at,
          erased_at: user.erased_at,
          erase_reason: user.erase_reason,
          flags: {
            email_on_comment: user.email_on_comment,
            email_on_comment_reply: user.email_on_comment_reply,
            public_activity: user.public_activity,
            newsletter: user.newsletter,
            weekly_summary: user.weekly_summary,
            notifications_by_default: user.notifications_by_default
          }
        }
      )
    end

    puts "Exported #{data.length} users"

    Exporter.write_json("users", data)
  end
end
