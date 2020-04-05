import React from "react";
import AsyncSelect from "react-select/async";
import _ from "lodash";

/*{
    fetchUrl:'/api/users',
    *queryName:'username',
    *handleSelect:()=>{},
    *mapOptionsToValues:()=>{},
    *classes:'',
    *isMulti:'',
    *placeholder:''
}*/
class SearchableSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: this.props.defaultValue
    };
    this.getOptions = _.debounce(this.getOptions.bind(this), 500);
  }

  handleChange = selectedOption => {
    this.props.handleSelect && this.props.handleSelect(selectedOption);
    this.setState({
      selectedOption: ""
    });
    if (this.props.actionOnSelectedOption) {
      this.props.actionOnSelectedOption(selectedOption.value);
    }
  };

  mapOptionsToValues = options => {
    return options.map(option => ({
      value: option.Id,
      label: option.Name
    }));
  };

  getOptions = (inputValue, callback) => {
    if (!inputValue) {
      return callback([]);
    }

    // const { searchApiUrl } = this.props;
    // const limit =
    //   this.props.limit || process.env['REACT_APP_DROPDOWN_ITEMS_LIMIT'] || 5;
    // const queryAdder = searchApiUrl.indexOf('?') === -1 ? '?' : '&';
    // const fetchURL = `${searchApiUrl}${queryAdder}search=${inputValue}&limit=${limit}`;
    const queryName = this.props.queryName;

    const fetchUrl = `${this.props.fetchUrl}${
      queryName ? `?${queryName}=${inputValue}` : ""
    }`;
    fetch(fetchUrl).then(response => {
      response.json().then(({ data }) => {
        if (this.props.mapOptionsToValues)
          callback(this.props.mapOptionsToValues(data));
        else callback(this.mapOptionsToValues(data));
      });
    });
  };

  render() {
    const { defaultOptions, placeholder, inputId } = this.props;
    return (
      <AsyncSelect
        className={this.props.classes}
        isMulti={this.props.isMulti}
        inputId={inputId}
        cacheOptions
        value={this.state.selectedOption}
        defaultOptions={defaultOptions}
        loadOptions={this.getOptions}
        placeholder={placeholder}
        onChange={this.handleChange}
      />
    );
  }
}

export default SearchableSelect;
