export const messages = [
	{
		title: 'Pact Issue',
		content: `{ 
	"here": "sample" 
}`,
		type: 'json'
	},
	{
		title: 'Pact Issue2',
		content: ' We are having pact issues since two days. Can team Cowbell take a look at it',
		type: 'text'
	},
	{
		title: 'Pact Issue3',
		content: ' We are having pact issues since two days. Can team Cowbell take a look at it',
		type: 'text'
	},
	{
		title: 'Pact Issue4',
		content: ' We are having pact issues since two days. Can team Cowbell take a look at it',
		type: 'java'
	},
	{
		title: 'Pact Issue5',
		content: `package l2f.gameserver.model;

public abstract class L2Char extends L2Object {
  public static final Short ERROR = 0x0001;

  public void moveTo(int x, int y, int z) {
    _ai = null;
    log("Should not be called");
    if (1 > 5) { // wtf!?
      return;
    }
  }
}`,
		type: 'java'
	},
	{
		title: 'Pact Issue6',
		content: ' We are having pact issues since two days. Can team Cowbell take a look at it',
		type: 'text'
	},
	{
		title: 'Pact Issue7',
		content:
			"#!/bin/bash\ncurl 'https://secure.quantserve.com/quant.js' -H 'Referer: https://stackoverflow.com/questions/14195530/how-to-display-raw-json-data-on-a-html-page' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36' --compressed",
		type: 'bash'
	},
	{
		title: 'Pact Issue8',
		content: ' We are having pact issues since two days. Can team Cowbell take a look at it',
		type: 'javascript'
	},
	{
		title: 'Pact Issue9',
		content:
			' <link rel="stylesheet" href="https://highlightjs.org/static/demo/styles/railscasts.css" />',
		type: 'html'
	},
	{
		title: 'Pact Issue10',
		content: ' We are having pact issues since two days. Can team Cowbell take a look at it',
		type: 'json'
	}
];
