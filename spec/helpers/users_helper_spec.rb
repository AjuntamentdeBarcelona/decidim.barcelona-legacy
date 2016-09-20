require 'rails_helper'

describe UsersHelper do

  describe '#humanize_document_type' do
    it "should return a humanized document type" do
      expect(humanize_document_type("dni")).to include("National ID")
      expect(humanize_document_type("passport")).to include("Passport")
      expect(humanize_document_type("nie")).to include("NIE")
    end
  end

  describe '#deleted_commentable_text' do
    it "should return the appropriate message for deleted debates" do
      debate = create(:debate)
      comment = create(:comment, commentable: debate)

      debate.hide

      expect(comment_commentable_title(comment)).to eq "<abbr title='This debate has been deleted'>#{comment.commentable.title}</abbr>"
    end

    it "should return the appropriate message for deleted proposals" do
      proposal = create(:proposal)
      comment = create(:comment, commentable: proposal)

      proposal.hide

      expect(comment_commentable_title(comment)).to eq "<abbr title='This proposal has been deleted'>#{comment.commentable.title}</abbr>"
    end
  end

  describe '#comment_commentable_title' do
    it "should return a link to the commentable" do
      comment = create(:comment)
      commentable = comment.commentable

      expect(comment_commentable_title(comment)).to eq link_to(commentable.title, url_for({
        controller: commentable.class.name.downcase.pluralize,
        action: 'show',
        id: commentable.id,
        participatory_process_id: commentable.participatory_process
      }))
    end

    it "should return a hint if the commentable has been deleted" do
      comment = create(:comment)
      comment.commentable.hide
      expect(comment_commentable_title(comment)).to eq "<abbr title='This debate has been deleted'>#{comment.commentable.title}</abbr>"
    end
  end

end
