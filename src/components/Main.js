import React, { Component } from 'react';
import request from 'request-promise';
import './App.css';
import ReactCardFlip from 'react-card-flip';
import FrontCard from './FrontCard.js'
import BackCard from './BackCard.js'

var serverUrl = "http://localhost:4000";

class Main extends Component {


	async listPlayerCards(e) {
		try {
			let cards = await request({ uri: serverUrl + "/cards", method: "GET", json: true, headers: { playerID: e } });
			this.setState({ playerCards: cards })
		}
		catch (error) {
			alert("Error listing cards")
		}
	}

	async nextCard() {
		try {
			let nextCard = await request({ uri: serverUrl + "/next-card", method: "GET", json: true, headers: { playerID: this.props.registration.playerID } });
			this.playerCard = nextCard;

		}
		catch (error) {
			alert("Error getting next card")
		}
	}
	
	async buyCard() {
		try {
			let nextCard = await request({ uri: serverUrl + "/buy-card", method: "GET", json: true, headers: { playerID: this.props.registration.playerID } });
			let cards = this.listPlayerCards(this.props.registration.playerID)
			this.setState({ playerCards: cards })

		}
		catch (error) {
			alert("Error getting next card")
		}
	}
	
	

	async battle(battleField) {
		try {
			let battle = await request({ uri: serverUrl + "/battle", method: "POST", json: true, body: { field: battleField }, headers: { playerID: this.props.registration.playerID } });
			this.opponentCard = battle.opponentCard;
			this.setState({ battleField: battleField })
			this.setState({ outcome: battle.outcome })
			let cards = this.listPlayerCards(this.props.registration.playerID)
			this.setState({ playerCards: cards })

		}
		catch (error) {
			alert("Error during battle")
		}
	}


	constructor(props) {
		super(props)
		this.state = {
			playerCards: this.props.registration.cards,
			battleField: null,
			outcome: null,
			isFlipped: false
		}

		this.playerCard = [];
		this.opponentCard = [];

		this.randomInt = this.randomInt.bind(this);
		this.listPlayerCards = this.listPlayerCards.bind(this);
		this.nextCard = this.nextCard.bind(this);
		this.buyCard = this.buyCard.bind(this);
		this.battle = this.battle.bind(this);
		this.playCard = this.playCard.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.startGame = this.startGame.bind(this);
		this.sleep = this.sleep.bind(this);
	}

	randomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	
	startGame()	{
		document.getElementById("battleground").style.display = "inline";
		document.getElementById("startGame").style.display = "none";
		this.playCard();
	}
	
	sleep(ms) {
  		return new Promise(resolve => setTimeout(resolve, ms));
	}
	
	async playCard() {
		this.nextCard();


		const fields = ["strength", "skill", "size", "popularity"]
		let battleField = fields[this.randomInt(4)];
		this.setState({ battlefield: battleField })

		this.battle(battleField)
		
		this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
		

		//console.log("Battle outcome: " + battle.outcome + " (" + nextCard[battleField] + " vs. " + battle.opponentCard[battleField] + ")");


	}
	
	async handleClick(e) {
    	e.preventDefault();
    	
    	this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    	await this.sleep(1500);
    	this.playCard();
  	}


	render() {
		return (
			<div>
				<div id="container">

					<div>Welcome to the game!</div>
					<div><span id="playerID">Username: {this.props.registration.playerID}</span></div>
					
					
					<div><button id="startGame" onClick={this.startGame}>Play Game</button></div>

					<div id="battleground">
						
						<div id="col-1">
							<div className="playerheader">You</div>
							<div className="card">
							<ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical" flipSpeedBackToFront="1" flipSpeedFrontToBack="1">
					        <FrontCard>
					        <div className="frontcard"><p>Marvel</p> <p>Battle</p></div>

					        </FrontCard>
					
					        <BackCard>
					          
					         <div className="backcard"> 
					          <div>Name: {this.playerCard.name}</div>
							<div>{this.state.battleField}: {this.playerCard[this.state.battleField]}</div>
							</div>
					    
					        </BackCard>
					        
					     </ReactCardFlip>
					     </div>
							
						</div>

						<div id="col-2">
							 <div># of your cards: {this.state.playerCards.length}</div>
							 <div align="center"><b>Current Battle: {this.state.battleField}</b></div>
							 <div><button onClick={this.handleClick}>Battle Now</button></div>
							 { this.state.outcome == "win" ?
							 <div className="resultWin">You Won!!</div>
							 :
							 <div className="resultLoss">You Lost!!</div>
							 }
							 { this.state.playerCards.length == 0
		                      ? <div><button className="btn btn-primary" onClick={this.buyCard}>Buy Card</button></div>
		                      : null
		                    }
							 
					     </div>
					     
					     <div id="col-3">
					     
					     	<div className="playerheader">Computer</div>
					     	<div className="card">
						 <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical" flipSpeedBackToFront="1" flipSpeedFrontToBack="1">
					        <FrontCard>
					         <div className="frontcard"><p>Marvel</p> <p>Battle</p></div>

					        </FrontCard>
					
					        <BackCard>
					         <div className="backcard">
					          <div>Name: {this.opponentCard.name}</div>
							<div>{this.state.battleField}: {this.opponentCard[this.state.battleField]}</div>
							</div>
					        </BackCard>
					     </ReactCardFlip>
					     </div>
					     
					     
					     </div>
							
							
						
					</div>
					
				</div>

			</div>

		);
	}
}

export default Main;