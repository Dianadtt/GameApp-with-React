import React, {Component} from 'react'
import { waitForElementToBeRemoved } from '@testing-library/react';

 class Game extends React.Component{
    constructor(props){
        super(props)
        this.state={
         
            data:[]
        }
        
    }
    async componentDidMount(){
        const url ="https://games-app-siit.herokuapp.com/games"
        const response = await fetch(url);
        const data=await response.json()
        this.setState({data})
        console.log(data)
        
    }
    deleteGame=(event)=>{
      event.preventDefault()
      event.target.parentElement.remove();
       console.log(event)
        
    }
    
    render (){
        return(
            <div>
                 {this.state.data.map(element=>
                 <>
                 <div>
                 <h3>{element.title}</h3>
                     <p>{element.description}</p>
                    <img src={element.imageUrl} />
                    <button onClick={this.deleteGame}>Delete</button>
                    <button>Update</button>
                 </div>
                   
                 </>
                )}
            </div>
        )
    }
   
}

export default Game