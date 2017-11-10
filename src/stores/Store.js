import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from '../reducers'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			name: 'Material UI',
		})
	: compose

const enhancer = composeEnhancers(applyMiddleware(...middleware))

const store = createStore(reducers, {}, enhancer)

window.store = store
export default store
