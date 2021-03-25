import React, { Component } from 'react';
import './App.css';
import request from 'request-promise';
import Main from './Main.js'
import Register from './Register.js'



class App extends Component {


	async componentWillMount() {
		await this.checkServer()
		await this.checkProfile()
	}

	async checkServer() {
		const serverUrl = "http://localhost:4000";
		try {
			let serverStatus = await request({ uri: serverUrl + "/ping", json: true });
			if (serverStatus === undefined || serverStatus.status != "OK") {
				alert("Game server is not up and running!")
				console.log("Game server returned an invalid status: " + serverStatus)
			}
		}
		catch (error) {
			console.log(error.message);
			alert("Game server is not up and running!")

		}
	}
	

	async checkProfile() {
		const serverUrl = "http://localhost:4000";
		try {
			let playerInfo = await request({uri: serverUrl + "/profile", method: "GET", json: true, headers: { playerID: this.state.registration.playerID }});

		}
		catch (error) {
			//this.setState({ playerID: null })
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			registration: []
		}
		//alert(this.state.playerID);
		this.handleStateChange = this.handleStateChange.bind(this);
	}

	handleStateChange(value) {
		this.setState({ registration: value })
		//alert(this.state.registration.playerID)
	}




	render() {
		return (
			<div>

				{this.state.registration.playerID != null ? <Main registration={this.state.registration} /> : <Register handleStateChange = {this.handleStateChange} />}
				
			</div>




		);
	}
}

export default App;