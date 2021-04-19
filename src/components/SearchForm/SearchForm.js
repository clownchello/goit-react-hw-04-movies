import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './SearchForm.module.css';

export default class SearchForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    inputValue: '',
  };

  handleChangeInput = e => {
    this.setState({ inputValue: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.setState(prev => ({ inputValue: '' }));
  };

  render() {
    const { inputValue } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={s.form}>
        <input
          value={inputValue}
          onChange={this.handleChangeInput}
          className={s.input}
          placeholder="Movie title"
          autoFocus
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>
    );
  }
}
