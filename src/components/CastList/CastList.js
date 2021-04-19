import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchCast from '../../services/fetchCast';
import s from './CastList.module.css';

class CastList extends Component {
  static propTypes = {
    movieId: PropTypes.string,
  };

  state = {
    cast: [],
  };

  async componentDidMount() {
    const response = await fetchCast(this.props.movieId);

    this.setState(prev => ({ cast: [...response.cast.slice(0, 5)] }));
  }

  render() {
    const { cast } = this.state;
    return (
      <ul className={s.castList}>
        {cast &&
          cast.map(actor => {
            return (
              <li key={actor.id} className={s.item}>
                <div className={s.imgContainer}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                    alt={actor.name}
                  ></img>
                </div>
                <p>{actor.name}</p>
                <p>{actor.character}</p>
              </li>
            );
          })}
      </ul>
    );
  }
}

export default CastList;
