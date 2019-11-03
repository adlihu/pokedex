import React, { Component } from 'react'

export class SearchPoke extends Component {
    constructor(props){
        super(props);
        this.state={
            pokemonName: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState( {pokemonName: e.target.value})
    };

    onSubmit = (e) => {
        e.preventDefault();
        const name = this.state.pokemonName.toLowerCase();
        this.props.searchPoke(name);
        this.setState({
            pokemonName: ''
        })

    }
    random = (e) => {
        const randNum = Math.floor(Math.random() * 806);
        this.props.searchPoke(randNum);
    }
    render() {
        return (
            <div className="search">
                <form onSubmit={this.onSubmit} style={{display:'inline-block', padding: "10px 0"}}>
                    <input 
                        type="text"
                        placeholder="Pokemon name or #.."
                        value={this.state.pokemonName}
                        onChange={this.onChange}
                    />
                    <button  className="headerButton"><img style={imgStyle} src="search.png" alt=""/>Search</button>
                </form>
                <button className="headerButton" onClick={this.random}>
                    <img style={imgStyle} src="perspective.png" alt=""></img> Random</button>            
            </div>
        )
    }
}
const imgStyle = {
    width:"30px",
    height:"30px",
}

export default SearchPoke

