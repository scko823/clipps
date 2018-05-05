import React from 'react';

const theme = localStorage.getItem('theme') || 'solarized-dark';

localStorage.setItem('theme', theme);

const HighlightThemeContext = React.createContext({
	theme,
	onChangeTheme: () => {}
});

export default HighlightThemeContext;
