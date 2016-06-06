export default ({
  statistics
}) => (
  <ul>
    <li>
      <span>{statistics.related_proposals_count}</span>
      Propostes relacionades
    </li>
    <li>
      <span>{statistics.supports_count}</span>
      Suma de suports
    </li>
    <li>
      <span>{statistics.comments_count}</span>
      Suma de comentaris
    </li>
    <li>
      <span>{statistics.participants_count}</span>
      Suma de participants presencials</li>
    <li>
      <span>{statistics.meeting_interventions_count}</span>
      Intervencions en cites
    </li>
    <li>
      <span>{statistics.interventions_count}</span>
      Intervencions totals
    </li>
  </ul>
);
