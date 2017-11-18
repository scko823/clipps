import MD5 from 'md5.js'
import charArr from './starwars.json'

const randomClipName = () =>
	`${charArr[Math.floor(Math.random() * charArr.length)]
		.split(/\s+/)
		.join('-')}__${new MD5()
		.update(`${Math.random()}-${new Date().toISOString()}`)
		.digest('hex')
		.substring(0, 6)}`

export default randomClipName
