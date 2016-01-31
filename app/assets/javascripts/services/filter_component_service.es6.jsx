class FilterComponentService {
  constructor(component, options) {
    this.component = component;
    this.requestUrl = options.requestUrl;
    this.requestDataType = options.requestDataType;
    this.onResultsCallback = options.onResultsCallback;
  }

  changeFilterGroup(filterGroupName, filterGroupValue) {
    let filters = this.component.state.filters.set(filterGroupName, filterGroupValue);
    if (filterGroupName === 'category_id') {
      filters = filters.delete('subcategory_id')
    }
    if (filterGroupName === 'scope' && filterGroupValue !== 'district') {
      filters = filters.delete('district');
    }
    this.applyFilters(
      filters.toObject(), 
      this.component.state.tags.toArray(),
      this.component.state.searchText
    );
    this.component.setState({ filters });
  }

  setFilterText(searchText) {
    this.applyFilters(
      this.component.state.filters.toObject(), 
      this.component.state.tags.toArray(),
      searchText
    );
    this.component.setState({ searchText });
  }

  setFilterTags(tags) {
    this.applyFilters(
      this.component.state.filters.toObject(), 
      tags.toArray(), 
      this.component.state.searchText
    );
    this.component.setState({ tags });
  }

  applyFilters(filters, tags, searchText) {
    let filterString = [], 
        data;

    for (let filterGroupName in filters) {
      if(filters[filterGroupName].length > 0) {
        filterString.push(`${filterGroupName}=${filters[filterGroupName].join(',')}`);
      }
    }

    filterString = filterString.join(':');

    data = {
      search: searchText,
      tag: tags,
      filter: filterString 
    }

    this.replaceUrl(data);

    if (this.searchTimeoutId) {
      clearTimeout(this.searchTimeoutId);
    }

    this.searchTimeoutId = setTimeout(() => {
      $.ajax(this.requestUrl, { data, dataType: this.requestDataType }).then((result) => {
        if (this.onResultsCallback) {
          this.onResultsCallback(result);
        }
      });
    }, 300);
  }

  replaceUrl(data) {
    if (window.history) {
      let queryParams = [],
          url;

      if (data.search) {
        queryParams.push(`search=${data.search}`);
      }

      if (data.tag && data.tag.length > 0) {
        queryParams.push(`tag=${data.tag}`);
      }

      if (data.filter) {
        queryParams.push(`filter=${data.filter}`);
      }

      url = `${location.href.replace(/\?.*/, "")}?${queryParams.join('&')}`;

      data.turbolinks = true;

      history.pushState(data, '', url);
    }
  }
}
