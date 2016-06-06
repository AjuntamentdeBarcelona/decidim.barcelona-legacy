export default ({
  statistics
}) => (
  <ul>
    <li>
      <span className="number">{statistics.related_proposals_count}</span>
      Propostes relacionades
    </li>
    <li>
      <span className="number">{statistics.supports_count}</span>
      Suma de suports
    </li>
    <li>
      <span className="number">{statistics.comments_count}</span>
      Suma de comentaris
    </li>
    <li>
      <span className="number">{statistics.participants_count}</span>
      Suma de participants presencials</li>
    <li>
      <span className="number">{statistics.meeting_interventions_count}</span>
      Intervencions en cites
    </li>
    <li>
      <span className="number">{statistics.interventions_count}</span>
      Intervencions totals
    </li>
  </ul>
);
