import { Component, PropTypes } from 'react';

import Autocomplete             from 'react-autocomplete';

export default class ProposalsAutocompleteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      proposals: [],
      loading: false
    };
  }

  render() {
    let styles = {
      item: {
        padding: '2px 6px',
        cursor: 'default'
      },

      highlightedItem: {
        color: 'white',
        background: 'hsl(200, 50%, 50%)',
        padding: '2px 6px',
        cursor: 'default'
      },

      menu: {
        border: 'solid 1px #ccc',
        maxHeight: '200px',
        overflowY: 'scroll'
      }
    };
    
    return (
      <Autocomplete
        inputProps={{
          id: 'autocomplete-1',
          autoComplete: 'off',
          placeholder: I18n.t("components.proposals_autocomplete_input.search")
        }}
        wrapperStyle={{
          display: 'block'
        }}
        ref="autocomplete"
        value={this.state.value}
        items={this.state.proposals}
        getItemValue={(item) => `${item.code} - ${item.title}`}
        onSelect={(value, item) => {
          this.props.onAddProposal(item);
          this.setState({ value: '', proposals: [] })
        }}
        onChange={(event, value) => {
          this.setState({ value, loading: true })

          this.search(value, (proposals) => {
            this.setState({ proposals, loading: false })
          })
        }}
        renderItem={(item, isHighlighted) => (
          <div
            style={isHighlighted ? styles.highlightedItem : styles.item}
            key={item.id}
            id={`autocomplete_result_${item.id}`}
          >{item.code} - {item.title}</div>
        )}
        renderMenu={(items, value, style) => {
          if (value === '') {
            return <div></div>;
          } else {
            return (
              <div style={{...styles.menu, ...style}}>
              { this.state.loading ? (
              <div style={{padding: 6}}>{ I18n.t("components.proposals_autocomplete_input.loading") }</div>
              ) : items.length === 0 ? (
              <div style={{padding: 6}}>{ I18n.t("components.proposals_autocomplete_input.no_results") }</div>
              ) : this.renderItems(items)}
              </div>
            );
          }
        }}
      />
    );
  }

  renderItems (items) {
    return items.map(item => item);
  }

  search(text, cb) {
    if (this.searchTimeoutId) {
      clearTimeout(this.searchTimeoutId);
    }

    this.searchTimeoutId = setTimeout(() => {
      if (text.length > 0) {
        $.ajax({
          url: this.props.proposalsApiUrl,
          method: 'GET',
          data: {
            search: text,
            exclude_ids: this.props.excludeIds
          }
        }).then(({ proposals } ) => {
          cb(proposals);
        });
      }
    }, 300);
  }
}

ProposalsAutocompleteInput.propTypes = {
  onAddProposal: PropTypes.func.isRequired,
  proposalsApiUrl: PropTypes.string.isRequired,
  excludeIds: PropTypes.array
};
