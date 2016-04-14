import ProposalAuthor from './proposal_author.component';

export default function ({
  code,
  created_at,
  official,
  from_meeting,
  author
}) {
  return (
    <p className="proposal-info">
      <span>{ code }</span>
      <span className="bullet">&nbsp;&bull;&nbsp;</span>
      <span>{ created_at }</span>
      <span className="bullet">&nbsp;&bull;&nbsp;</span>
      <ProposalAuthor 
        official={ official }
        fromMeeting={ from_meeting }
        author={ author } />
    </p>
  );
}
