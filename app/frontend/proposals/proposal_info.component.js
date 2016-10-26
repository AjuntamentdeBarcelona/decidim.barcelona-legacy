import { PropTypes }  from 'react';

import UserAvatar     from '../application/user_avatar.component';

const ProposalInfoComponent = ({
  created_at,
  author,
  children
}) => {
  const authorUrl = author ? `/users/${author.id}` : '#';

  return (
    <div className="card__author author-data author-data--small">
      {
        (() => {
          if (author) {
            return (
              <div className="author-data__main">
                <div className="author author--inline">
                  <a href={authorUrl} className="author__avatar author__avatar--small">
                    <UserAvatar user={author} />
                  </a>
                  <a href={authorUrl} className="author__name">
                    {author.name}
                  </a>
                  { ' ' + created_at }
                </div>
              </div>
            );
          }
          return null;
        })()
      }
      {children}
    </div>
  );
};

ProposalInfoComponent.propTypes = {
  created_at: PropTypes.string.isRequired,
  author: PropTypes.object,
  children: PropTypes.any
};

export default ProposalInfoComponent;
