import React from 'react'
//import { waitForElementToBeRemoved } from '@testing-library/react';


class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            id: null,
            title: null,
            description: null,
            imageUrl: null,
            showForm: false
        }
    }

    deleteGame = () => {
        const { onDelete, id } = this.props;
        if (onDelete) {
            onDelete(id);
        }
    }

    displayForm = () => {
        this.setState((prevState, props) => {
            return {
                showForm: true,
                id: props.id,
                title: props.title,
                description: props.description,
                imageUrl: props.imageUrl
            }
        });
    }

    saveChanges = () => {
        const {onUpdate} = this.props;
        const {id, title, description, imageUrl} = this.state;
        const updatedGame = {
            id,
            title,
            description,
            imageUrl
        }

        if (onUpdate){
            onUpdate(updatedGame);
            this.setState({
                showForm: false
            });
        }
    }

    cancelChanges = () => {
        this.setState({
            showForm: false
        });
    }

    render() {
        const {title, description, imageUrl } = this.props;
        const { showForm } = this.state;

        return (
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
                <img src={imageUrl} alt="" />
                <button onClick={this.deleteGame}>Delete</button>
                <button onClick={this.displayForm}>Update</button>
                {
                    showForm && 
                    <div>
                        <label>Title*</label>
                        <input type="text" value={this.state.title} onChange={(data) => { this.setState({title: data.target.value }) }}/>

                        <label>Description</label>
                        <textarea value={this.state.description} onChange={(data) => { this.setState({description: data.target.value }) }}></textarea>

                        <label>Image URL</label>
                        <input type="text" value={this.state.imageUrl} onChange={(data) => { this.setState({imageUrl: data.target.value }) }}/>

                        <button className="updateBtn" onClick={this.saveChanges}>Save Changes</button>
                        <button className="cancelBtn" onClick={this.cancelChanges}>Cancel</button>
                    </div>
                }
            </div>
        )
    }

}

export default Game