import React from "react";
import AsyncSelect from "react-select/async";
import _ from "lodash";
import Axios from "axios";

/*{
    fetchUrl:'/api/users',
    *queryName:'username',
    *handleSelect:()=>{},
    *autoFocus:true||false
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
    this.CancelToken = Axios.CancelToken;
    this.source = this.CancelToken.source();
  }

  handleChange = selectedOption => {
    this.props.handleSelect && this.props.handleSelect(selectedOption);
    this.setState({
      selectedOption: ""
    });

    if (this.props.autoFocus) this.refs.input.focus();

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

    this.source.cancel("search value updated");
    this.source = this.CancelToken.source();

    const queryName = this.props.queryName;
    const fetchUrl = `${this.props.fetchUrl}${
      queryName ? `?${queryName}=${inputValue}` : ""
    }`;

    Axios.get(fetchUrl, { cancelToken: this.source.token })
      .then(res => {
        const { data } = res.data;
        if (this.props.mapOptionsToValues)
          callback(this.props.mapOptionsToValues(data));
        else callback(this.mapOptionsToValues(data));
      })
      .catch(err => {});
  };

  // componentDidMount() {
  //   this.inputElem = this.refs.input;
  // }

  render() {
    const { defaultOptions, placeholder, inputId } = this.props;
    return (
      <AsyncSelect
        ref="input"
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
