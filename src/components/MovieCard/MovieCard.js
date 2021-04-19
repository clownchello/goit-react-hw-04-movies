import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './MovieCard.module.css';

function MovieCard({ id, original_title, name, location }) {
  return (
    <li>
      <Link
        to={{
          pathname: `/movies/${id}`,
          state: {
            from: location,
          },
        }}
        className={s.link}
      >
        {original_title ? original_title : name}
      </Link>
    </li>
  );
}

MovieCard.propTypes = {
  id: PropTypes.number,
  original_title: PropTypes.string,
  name: PropTypes.string,
};

export default withRouter(MovieCard);
