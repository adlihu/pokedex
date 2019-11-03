import React, { Component } from 'react'

export class Evolution extends Component {
    getEvol = (data) => {
        let evolName = [];
        evolName.push(data.chain.species.name);

        //Second Evolution
        if (data.chain.evolves_to.length > 0){
            for (var i=0;i<data.chain.evolves_to.length;i++){
                evolName.push(data.chain.evolves_to[i].species.name);
            }
            //Third evolution
            if (data.chain.evolves_to[0].evolves_to.length > 0){
                evolName.push(data.chain.evolves_to[0].evolves_to[0].species.name);
            }
        }
        let gifUrl = [];
        for (i=0;i<evolName.length;i++){
            let test = "https://projectpokemon.org/images/normal-sprite/" + evolName[i] + ".gif";
            gifUrl.push(test);
        }
        const imageUrl = gifUrl.map((gifUrl, index) => 
            <button className="evolItems" key={index} onClick={this.handle.bind(this,evolName[index])}>
                <img src={gifUrl} alt=""></img>
                <p style={white}>{evolName[index].charAt(0).toUpperCase() + evolName[index].slice(1)}</p>
            </button>
        );
        
        if (evolName.length === 1){
            return <p style={white}>{evolName[0].charAt(0).toUpperCase() + evolName[0].slice(1)} has no evolutions.</p>
        }
        return imageUrl;
    }

    handle = (ar) =>{
        this.props.evolPokemon(ar);
    }

    getOneType(){
        let pokemonType = this.props.data.pokemon.types;
        pokemonType = pokemonType[pokemonType.length-1].type.name;
        return pokemonType;
    }

    render() {
        if (this.props.data.isLoading) {
            return <div></div>
        }
        return (
            <div className="evolDesc">
                <h1 className="sectionTitle" id={this.getOneType()} style={{color:"white"}}>Evolution</h1>
                <div className="evolList">{this.getEvol(this.props.data.evolutionChain)}</div>
            </div>
        )
    }
}

const white = {
    color:"black",
}

export default Evolution
