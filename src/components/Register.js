import React, { Component } from 'react';
import axios from 'axios';
import request from 'request-promise';

class Register extends Component {

	constructor(props) {
		super(props);

		this.randomInt = this.randomInt.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

	}

	randomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	async onSubmit() {
		const serverUrl = "http://localhost:4000";
		let playerUsername = document.getElementById("username").value + this.randomInt(25);
		let player = { username: playerUsername, email: playerUsername + "@gmail.com", "birthdate": document.getElementById("dob").value };
		try {
			let registration = await request({ uri: serverUrl + "/register", method: "POST", json: true, body: player });
			this.props.handleStateChange(registration)
		}
		catch (error) {
			console.log(error.message);
			alert("Error on registration. Please try again! " + error.message)

		}
	}

	render() {
		return (
			<div id="registration">
				<h1>Welcome to The Game</h1>
				<div>Please register below to start playing.</div>

				<div classname="form-inline">
					<label>Username:</label> <input type="text" name="username" id="username" />
			
					<label>Date of Birth:</label> <input type="text" name="dob" id="dob" />
			
					<button onClick={this.onSubmit}>Register</button>
				</div>


			</div>
		)
	}
}

export default Register;