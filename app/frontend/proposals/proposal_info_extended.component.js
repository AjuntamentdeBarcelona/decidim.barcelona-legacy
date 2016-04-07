import ProposalAuthor from './proposal_author.component';
import AuthorAvatar   from '../application/author_avatar.component';

export default function ({
  created_at,
  official,
  fromMeeting,
  author,
  totalComments
}) {
  return (
    <p className="proposal-info extended">
      <AuthorAvatar author={ author } />
      <span className="bullet">&nbsp;&bull;&nbsp;</span>
      <ProposalAuthor 
        official={ official }
        fromMeeting={ fromMeeting }
        author={ author } />
      <span className="bullet">&nbsp;&bull;&nbsp;</span>
      <span>{ created_at }</span>
      <span className="bullet">&nbsp;&bull;&nbsp;</span>
      <i className="icon-comments"></i>&nbsp;
      <a href="#comments">{ I18n.t('proposals.show.comments', { count: totalComments }) }</a>
      <span className="bullet">&nbsp;&bull;&nbsp;</span>
      <span className="js-flag-actions"></span>
    </p>
  );
}
