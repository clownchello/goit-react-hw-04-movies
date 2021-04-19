import React, { Component } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import fetchByQuery from '../../services/fetchByQuery';
import MovieCard from '../../components/MovieCard/MovieCard';

export default class SearchMoviesPage extends Component {
  state = {
    searchQuery: '',
    moviesByQuery: [],
  };

  handleSearchSubmit = query => {
    this.setState(prev => ({ searchQuery: query }));
  };

  async componentDidMount() {
    const query = this.props.location.search.split('=')[1];

    if (!query) {
      return;
    }

    const response = await fetchByQuery(query);
    this.setState(prev => ({ moviesByQuery: [...response.results] }));
  }

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.searchQuery;
    const { searchQuery } = this.state;
    if (prevName !== searchQuery) {
      const response = await fetchByQuery(searchQuery);
      this.setState(prev => ({ moviesByQuery: [...response.results] }));
      this.props.history.push(`${this.props.match.url}?query=${searchQuery}`);
    }
  }

  render() {
    const { moviesByQuery } = this.state;
    return (
      <div>
        <SearchForm onSubmit={this.handleSearchSubmit} />

        {moviesByQuery && (
          <ul>
            {moviesByQuery.map(({ id, original_title, title }) => {
              return (
                <MovieCard
                  key={id}
                  id={id}
                  original_title={original_title}
                  name={title}
                />
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
