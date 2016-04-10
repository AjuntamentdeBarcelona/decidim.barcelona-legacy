class WelcomeController < ApplicationController
  skip_authorization_check

  helper_method :featured_proposals, :citizenship_proposals, :upcoming_meetings,
                :closed_meetings, :videos

  layout "devise", only: :welcome

  def index
    @categories = Category.order(:position).decorate
    @meetings = Meeting.closed
  end

  def welcome
  end

  def highlights
    debates = Debate.sort_by_hot_score.page(params[:page]).per(10).for_render
    set_debate_votes(debates)

    proposals = Proposal.sort_by_hot_score.page(params[:page]).per(10).for_render
    set_proposal_votes(proposals)

    @list = (debates.to_a + proposals.to_a).sort{|a, b| b.hot_score <=> a.hot_score}
    @paginator = debates.total_pages > proposals.total_pages ? debates : proposals

    render 'highlights'
  end

  private

  def featured_proposals
    @featured_proposals ||= ActiveModel::ArraySerializer.new(
      proposals.where(official: true),
      each_serializer: ProposalSerializer
    ).as_json
  end

  def citizenship_proposals
    @citizenship_proposals ||= ActiveModel::ArraySerializer.new(
      proposals.where(official: false),
      each_serializer: ProposalSerializer
    ).as_json
  end

  def upcoming_meetings
    @upcoming_meetings||= ActiveModel::ArraySerializer.new(
      Meeting.upcoming.limit(12), each_serializer: MeetingSerializer
    ).as_json
  end

  def closed_meetings
    @upcoming_meetings||= ActiveModel::ArraySerializer.new(
      Meeting.closed.limit(12), each_serializer: MeetingSerializer
    ).as_json
  end

  def proposals
    @proposals ||= Proposal.
                 limit(12).
                 order("random()").
                 includes(:author)
  end

  def videos
    %w{_RCslt3M6is Gus0e_KJE4Y P8a_MX2p3mI nlpPkrLQBoE K9FKTZgIQsM 6r_Bifc84zE N3OQAbgoMGY pmFI_EqA5A4 Tlyi_zHjmBM pKXB1W44LUc ssH0Md5ejZ0}
  end
end
