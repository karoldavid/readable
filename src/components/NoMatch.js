import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class NoMatch extends Component {
	render() {
		return (
			<div>
				<Link to="/">Back</Link>
				<h1>404</h1>
			</div>
		)
	}
}

export default NoMatch