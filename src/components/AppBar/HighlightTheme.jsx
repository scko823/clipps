import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import HighlightThemeContext from '../contexts/HighlightThemeContext';

const ThemeHelmet = ({ theme }) => (
  <Helmet>
    <link rel="stylesheet" href={`/styles/${theme}.css`} />
  </Helmet>
);

ThemeHelmet.propTypes = {
	theme: PropTypes.string.isRequired
};

export default () => (
  <HighlightThemeContext.Consumer>
    {theme => <ThemeHelmet theme={theme} />}
  </HighlightThemeContext.Consumer>
);
