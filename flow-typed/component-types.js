type SnippetPropType = {
	clip: {
		name: string,
		createdAt: string,
		content: string,
		owner: {
			lastName: string,
			firstName: string
		}
	},
	classes: {
		root: cssInJS,
		subheader: cssInJS,
		icon: cssInJS
	},
	copyContent: (e: SyntheticMouseEvent<*>) => void,
	clipboardName: string
};

type FABPropType = {
	classes: {
		fab: cssInJS
	},
	onClick: (e: SyntheticMouseEvent<*>) => void
};
