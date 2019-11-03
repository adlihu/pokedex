import React, { Component } from 'react'

export class PokemonDesc extends Component {

    //Get pokemon gene
    getGene = (pokemonSpecies) => {
        for (var i=0;pokemonSpecies.genera.length;i++){
            if (pokemonSpecies.genera[i].language.name === "en"){
                return pokemonSpecies.genera[i].genus;
            }
        }
    }
    //Get pokemon flavor text
    getFlavor = (pokemonSpecies) => {
        for (var i=0;i<pokemonSpecies.flavor_text_entries.length;i++){
            if(pokemonSpecies.flavor_text_entries[i].language.name === "en"){
                return pokemonSpecies.flavor_text_entries[i].flavor_text;
            }
        }
    }
    //Get pokemon types
    getTypes = () => {
        let types = [];
        let pokemonType = this.props.data.pokemon.types;
        for (var i=(pokemonType.length-1);i>=0;i--){
            types.push(<div className="type"id={pokemonType[i].type.name} key={i}>{this.toUpperCase(pokemonType[i].type.name)}</div>)
        }
        return types;
    }
    //Get abilities
    getAbility = () => {
        let abilities = [];
        let pokemonAbility = this.props.data.pokemon.abilities;
        for (var i =0 ;i<pokemonAbility.length;i++){
            abilities.push(<li className="profileContent" key={i}>{this.toUpperCase(pokemonAbility[i].ability.name)}</li>)
        }
        return abilities;
    }
    //Get Egg Group
    getEggGroup = (pokemonSpecies) => {
        let eggGroups = [];
        for (var i=0;i<pokemonSpecies.egg_groups.length;i++){
            eggGroups.push(<li className="profileContent" key ={i}>{this.toUpperCase(pokemonSpecies.egg_groups[i].name)}</li>)
        }
        return eggGroups;
    }
    getStats = (stats, type) => {
        var level = [];
        for(var i=stats.length-1;i>=0;i--){
            level.push(stats[i].base_stat/2)
        }
        let pokemonType = this.getOneType();
        return <div className="stat">
            <div style={{fontSize:"24px"}}>Stats</div>
            {/* HP */}
            <div className="progress">
                <div role="progressbar" className="progress-bar" id={pokemonType} style={{width:level[0] + '%', backgroundColor:'#FE0000'}} aria-valuenow={level[0]*2} aria-valuemin="0" aria-valuemax="200">
                    <div className="progress-bar-title">HP</div>
                </div>
            </div>
            {/* ATTACK */}
            <div className="progress">
                <div role="progressbar" className="progress-bar" id={pokemonType} style={{width:level[1] + '%',backgroundColor:'#F07F2F'}} aria-valuenow={level[1]*2} aria-valuemin="0" aria-valuemax="200">
                    <div className="progress-bar-title">ATTACK</div>
                </div>
            </div>
            {/* DEFENSE */}
            <div className="progress">
                <div role="progressbar" className="progress-bar" id={pokemonType} style={{width:level[2] + '%',backgroundColor:'#F8D030'}} aria-valuenow={level[2]*2} aria-valuemin="0" aria-valuemax="200">
                    <div className="progress-bar-title">DEFENSE</div>
                </div>
            </div>
            {/* SPECIAL ATTACK */}
            <div className="progress">
                <div role="progressbar" className="progress-bar" id={pokemonType} style={{width:level[3] + '%',backgroundColor:'#6890F0'}} aria-valuenow={level[3]*2} aria-valuemin="0" aria-valuemax="200">
                    <div className="progress-bar-title">SPECIAL ATTACK</div>
                </div>
            </div>
            {/* SPECIAL DEFENSE */}
            <div className="progress">
                <div role="progressbar" className="progress-bar" id={pokemonType} style={{width:level[4] + '%',backgroundColor:'#78C750'}} aria-valuenow={level[4]*2} aria-valuemin="0" aria-valuemax="200">
                    <div className="progress-bar-title">SPECIAL DEFENSE</div>
                </div>
            </div>
            {/* SPEED */}
            <div className="progress">
                <div role="progressbar" className="progress-bar" id={pokemonType} style={{width:level[5] + '%',backgroundColor:'#F85888'}} aria-valuenow={level[5]*2} aria-valuemin="0" aria-valuemax="200">
                    <div className="progress-bar-title">SPEED</div>
                </div>
            </div>
        </div>
        
    }

    //Uppercase first letter of string
    toUpperCase (string){
        return (string.charAt(0).toUpperCase() + string.slice(1));
    }

    //Get only one type for the pokemon
    getOneType(){
        let pokemonType = this.props.data.pokemon.types;
        pokemonType = pokemonType[pokemonType.length-1].type.name;
        return pokemonType;
    }

    //RENDER
    render() {
        const { pokemon, pokemonGif, pokemonSpecies } = this.props.data
        //If error
        if (this.props.data.isError){
            return <div style={center}>
                Pokemon Not Found: Error 404
            </div>
        }
        //if null
        if (this.props.data.isLoading) {
            //change this to pokeball loading
            return <div style={center}>
                    <img src="https://i.gifer.com/4xjS.gif" alt=""/>
                    <p>Catching Pokemon....</p>
                </div>
        }
        return (
            <div style={{margin:"auto", width:"100%"}}>
                <h1>{this.toUpperCase(pokemonSpecies.name)}
                <span className="pokedexNum"> #{('000' + pokemon.id).slice(-3)} </span> </h1>
                {/* Section for Profile Image */}
                <div className="row header">
                    <div className="col-12 col-lg-6">
                        <div id="wrapper">{this.getTypes()}</div>
                        <div className="wrap2">
                            <img className="profileImg" src={pokemonGif} alt="Fail to load"/>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        {this.getStats(pokemon.stats)}
                    </div>
                </div>

                {/* Section for Profile  */}
                <div className="detail-below-header">
                    <div className="gene">
                        <p className="left"><b> {this.getGene(pokemonSpecies)} </b></p>
                        <p className="left"> {this.getFlavor(pokemonSpecies)}</p>
                    </div>

                    <h1 className="sectionTitle" id={this.getOneType()} style={{color:"white"}}>Profile</h1>
                    <div className="row profile" >
                        <div className="col-md-6">
                            <div className="profileTitle" id={this.getOneType()} style={title}>Abilities </div> 
                            <div className="ulParent"><ul>{this.getAbility()}</ul></div>
                        </div>
                        <div className="col-md-6">
                            <div className="profileTitle" id={this.getOneType()} style={title}>Egg Groups </div>
                            <div className="ulParent"><ul>{this.getEggGroup(pokemonSpecies)}</ul></div>
                        </div>
                        <div className="col-md-6">
                            <div className="profileTitle" id={this.getOneType()} style={title}>Weight </div>
                            <span className="profileContent">{pokemon.weight/10} kg</span>
                        </div>
                        <div className="col-md-6">
                            <div className="profileTitle" id={this.getOneType()} style={title}>Height</div>
                            <span className="profileContent">{pokemon.height/10} m</span>
                        </div>
                    </div>
                    
                </div>
            </div>
            
        )
    }
}
const center={
    padding:"auto",
    margin:"auto",
    textAlign:"center",
    height:"100%",
}
const title = {
    color:"white",
    borderRadius: "100px",
    width:"40%",
    margin:"auto",
    marginTop:"10px",
}
export default PokemonDesc
