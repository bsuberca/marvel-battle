import React, { Component } from 'react';

class FrontCard extends Component {


	render() {
		return (
			<div>{this.props.children}</div>
		);
	}
}

export default FrontCard;