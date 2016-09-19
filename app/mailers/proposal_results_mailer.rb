class ProposalResultsMailer < ApplicationMailer
  def user_summary(user)
    @user = user
    @results = ProposalResults.new(user)

    # TODO: Load based on the user
    @participatory_process = ParticipatoryProcess.first

    @authored_proposals = decorate_proposals(@results.authored_proposals)
    @followed_proposals = decorate_proposals(@results.followed_proposals)

    with_user(@user) do
      mail(to: user.email, subject: I18n.t('proposal_results_mailer.subject'))
    end
  end

  private

  def decorate_proposals(proposals)
    ProposalResults::ProposalDecorator.decorate_collection(proposals)
  end
end
