import { Component } from 'react';

export default class EmailNotificationsReminder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false
    };
  }

  close(){
    $.ajax({
      url: '/email_notifications_reminder',
      type: 'DELETE'
    });

    this.setState({
      hidden: true
    });
  }

  enableNotifications(){
    $.ajax({
      url: '/email_notifications_reminder',
      type: 'POST'
    });

    this.setState({
      hidden: true
    });
  }

  render() {
    if(this.state.hidden){
      return null;
    } else {
      return(
        <div className="alert-messages email-notifications-reminder">
          <div className="row">
            <div className="small-12 column">
              <div data-alert className="alert-box info radius enable-notifications">
                <p>
                  { I18n.t('components.email_notifications_reminder.text') }
                </p>
                <ul>
                  <li>
                    <a onClick={ () => this.enableNotifications() }>
                      { I18n.t('components.email_notifications_reminder.enable') }
                    </a>
                  </li>
                  <li>
                    <a onClick={ () => this.close() }>
                      { I18n.t('components.email_notifications_reminder.close') }
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
