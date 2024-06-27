import dynamic from 'next/dynamic'
import ExtLink from './ext-link'

export default {
	ol: 'ol',
	ul: 'ul',
	li: 'li',
	p: 'p',
	blockquote: 'blockquote',
	a: ExtLink,

	Counter: dynamic(() => import('./counter')),
	Equation: dynamic(() => import('./equation')),
}
