import React from 'react';

const theme = localStorage.getItem('theme') || 'solarized-dark';

const HighlightThemeContext = React.createContext(theme);

export default HighlightThemeContext;
