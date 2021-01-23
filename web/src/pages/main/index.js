import React, { Component } from 'react';

import "./styles.css";
import Logo from "../../assets/logo.svg";

import api from '../../service/api';

class Main extends Component {
    state = {
        newBox: ''
    };
    
    handleSubmit = async (e) => {
        e.preventDefault();
        const response = await api.post('/boxes', {
            title: this.state.newBox
        });

        this.props.history.push(`/box/${response.data._id}`);
    }

    render() {
        return (
            <div id="main-container">
                <form onSubmit={this.handleSubmit}>
                    <img src={Logo} alt="Logo da Rocketseat"/>
                    <input type="text" 
                        placeholder="Criar um box"
                        value={this.state.newBox}
                        onChange={e => this.setState({newBox: e.target.value})}
                    />
                    <button type="submit">Criar</button>
                </form>
            </div>
        );
    }
}

export default Main;