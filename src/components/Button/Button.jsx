import PropTypes from 'prop-types';
import { ButtonLoad } from './Button.styled';

const Button = ({ nextPage }) => {
  return (
    <ButtonLoad type="button" onClick={nextPage}>
      Load more
    </ButtonLoad>
  );
};

export default Button;
