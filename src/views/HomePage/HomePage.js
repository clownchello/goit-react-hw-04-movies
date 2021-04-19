import React, { Component } from 'react';
import fetchPopularMovies from '../../services/fetchPopularMovies';
import s from './HomePage.module.css';
import MovieCard from '../../components/MovieCard/MovieCard';

export default class HomePage extends Component {
  state = {
    popularMovies: [],
  };

  async componentDidMount() {
    const response = await fetchPopularMovies();
    this.setState(prev => ({ popularMovies: [...response.results] }));
  }

  render() {
    const { popularMovies } = this.state;

    return (
      <section className={s.container}>
        <h1>Most popular movies</h1>

        <ul>
          {popularMovies.map(({ id, original_title, name }) => {
            return (
              <MovieCard
                key={id}
                id={id}
                original_title={original_title}
                name={name}
              />
            );
          })}
        </ul>
      </section>
    );
  }
}
