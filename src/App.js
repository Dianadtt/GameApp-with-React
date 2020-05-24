import Game from './Game.js'

import {FetchApi} from './fetch.js';
import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      gamesList: [],
      newGameTitle: '',
      newGameDescription: '',
      newGameImageUrl: ''
    }
    this.fetchApi = new FetchApi("https://games-app-siit.herokuapp.com/games");
  }


  componentDidMount() {
    this.fetchApi.getGamesList().then((response) => {
      this.setState({ gamesList: response });
      console.log(response);
    });
  }

  deleteGame = (id) => {
    this.fetchApi.deleteGameById(id).then((result) => {
      this.setState((prevState) => {
        const gamesList = [...(prevState.gamesList)];
        const index = gamesList.findIndex((game) => game._id === id);
        if (index >= 0){
          gamesList.splice(index, 1);
        }
        return {
          gamesList
        }
      });
    });
  }

  updateGame = (updatedGame) => {
    const {id, title, description, imageUrl} = updatedGame;
    this.fetchApi.updateGameRequest(id, title, description, imageUrl).then ((response) => {
      this.setState((prevState) => {
        const gamesList = [...(prevState.gamesList)];
        const index = gamesList.findIndex((game) => game._id === id);
        if (index >= 0){
          gamesList.splice(index, 1, {
            _id: id,
            title: response.title,
            description: response.description, 
            imageUrl: response.imageUrl
          });
        }
        return {
          gamesList
        }
      });
    });
  }

  submitNewGame = () => {
    const {newGameTitle, newGameDescription, newGameImageUrl} = this.state;
    this.fetchApi.createNewGame(newGameTitle, newGameDescription, newGameImageUrl).then ((response) =>{
      this.setState((prevState) => {
        const gamesList = [...(prevState.gamesList)];
        gamesList.push(response);
        return {
          gamesList,
          newGameTitle: '',
          newGameDescription: '',
          newGameImageUrl: ''
        }
      })
    });
  }


  render() {

    return (
      <React.Fragment>
        <div className="create">
          <h3>Create new Game:</h3>
          <span>Enter new title:</span>
          <input
            type="text" value={this.state.newGameTitle} name="title" onChange={(data) => { this.setState({ newGameTitle: data.target.value }) }} /><br></br>
          <p>Enter description:</p>
          <textarea type="text" value={this.state.newGameDescription} name="description" onChange={(data) => { this.setState({ newGameDescription: data.target.value }) }}></textarea><br></br>
          <span>Enter image URL:</span>
          <input
            type="text" value={this.state.newGameImageUrl} name="imageUrl" onChange={(data) => { this.setState({ newGameImageUrl: data.target.value }) }} /><br></br>
          <button onClick={() => { this.submitNewGame() }}>Create</button>
        </div>
        <div>
          {this.state.gamesList.map(element => 
            <Game key={element._id} id={element._id} title={element.title} description={element.description} imageUrl={element.imageUrl} onDelete={this.deleteGame}
                onUpdate={this.updateGame} />
          )}
        </div>
      </React.Fragment>


    );
  }
}

export default App;
