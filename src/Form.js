import React, { Component } from 'react'
import './App.css';

class Form extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            message: ''
        }
    }


    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleMessageChange = (event) => {
        this.setState({
            message: event.target.value
        })
    }

    handleSubmit = event => {
        alert(`${this.state.email} ${this.state.message}`)

        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form">
                <div className="grid-container">
                    <div className="heading">
                        <h1>Contact Us!</h1>
                    </div>
                    <div className="label-email">
                        <label >Email</label>
                    </div>
                    <div className="textInputs-email">
                        <input className="textInput" type='text' value={this.state.email} onChange={this.handleEmailChange} />
                    </div>
                    <div className="label-message">
                        <label >Message</label>
                    </div>
                    <div className="textInput-message">
                        <textarea className="textInputs" value={this.state.message} onChange={this.handleMessageChange}></textarea>
                    </div>
                    <div className="button-grid">
                        <button type="submit" className="buttons">Submit</button>
                    </div>

                </div>

            </form>

        )
    }
}

export default Form