import React, { Component } from 'react';
import fetchMovieById from '../../services/fetchMovieById';
import { Link, Route, Switch } from 'react-router-dom';
import CastList from '../../components/CastList/CastList';
import routes from '../../routes';
import s from './MovieDetails.module.css';
import ReviewsList from '../../components/ReviewsList/ReviewsList';

export default class MovieDetailsPage extends Component {
  state = {
    vote_average: null,
    vote_count: null,
    title: null,
    overview: null,
    original_title: null,
    genres: null,
    poster: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await fetchMovieById(movieId);

    this.setState(prev => ({
      vote_average: response.vote_average,
      vote_count: response.vote_count,
      title: response.title,
      overview: response.overview,
      original_title: response.original_title,
      genres: response.genres,
      poster: response.poster_path,
    }));
  }

  handleGoBack = () => {
    const { location, history } = this.props;
    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }
    history.push(routes.home);
    // history.push(location?.state?.from || routes.books);
  };

  render() {
    const {
      vote_average,
      vote_count,
      title,
      overview,
      original_title,
      genres,
      poster,
    } = this.state;
    const { match, location } = this.props;

    return (
      <>
        <button type="button" onClick={this.handleGoBack} className={s.button}>
          Go back
        </button>
        <div className={s.posterContainer}>
          <div className={s.imageContainer}>
            <img
              className={s.image}
              src={
                poster
                  ? `https://image.tmdb.org/t/p/w500/${poster}`
                  : 'https://kritka.info/uploads/posts/no_poster.jpg'
              }
              alt={title}
            ></img>
          </div>
          <div>
            <h1 className={s.title}>{title ? title : original_title}</h1>
            <p>Rating: {vote_average}</p>
            <p>Voices: {vote_count}</p>
            <span className={s.bold}>Overview:</span>
            <p>
              {overview
                ? overview
                : "Sorry we don't have overview for this movie"}
            </p>
            {genres && (
              <div>
                <span className={s.bold}>Genres:</span>
                <p>
                  {genres.map(genre => {
                    return `${genre.name}, `;
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className={s.container}>
          <div>
            <div>Aditional information</div>
            <ul>
              <li>
                <Link
                  to={{
                    pathname: `${match.url}/cast`,
                    state: {
                      from: location?.state?.from || routes.home,
                    },
                  }}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: `${match.url}/reviews`,
                    state: {
                      from: location?.state?.from || routes.home,
                    },
                  }}
                >
                  Top reviews
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Switch>
          <Route
            path={`${match.url}/cast`}
            render={() => {
              return <CastList movieId={match.params.movieId} />;
            }}
          />

          <Route
            path={`${match.url}/reviews`}
            render={() => {
              return <ReviewsList movieId={match.params.movieId} />;
            }}
          />
        </Switch>
      </>
    );
  }
}
