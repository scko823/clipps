type SnippetPropType = {
	clip: {
		name: string,
		content: string,
	},
	classes: {
		root: cssInJS,
		subheader: cssInJS,
		icon: cssInJS,
	},
	copyContent: (e: SyntheticMouseEvent<*>) => void,
	clipboardName: string,
};
