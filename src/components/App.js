import React from 'react'
import { findDOMNode } from 'react-dom'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  
  
  fetchPets = () => {
    let petInfo = '/api/pets'
    let type = this.state.filters.type //grabs state filter.type
  
    if(type === 'all'){
      petInfo = petInfo 
    } else {
      petInfo += `?type=${type}`
    }
    
    fetch(petInfo)
    .then(res => res.json())
    .then(data => this.setState({pets: data}))
  }

  onAdoptPet = () => {
    
    this.setState(prevState => {
      const petStatus = prevState.pets.map(pet => {
        const petId = pet.id
        if (petId === petId) {
          return {...pet, isAdopted: true}  
        } 
        return pet
      })
      // return pet.id === petId ? { ...pet, isAdopted: true } : pet;
      // this.setState({pets: petStatus})
      return {
        pets: petStatus
      }
    })
  }

  onChangeType = ({ filters: { value } }) => {
    this.setState({ filters: {...this.state.filters, type: value} })
  }

  // onChangeType = ({ target: { value } }) => {
  //   this.setState({ filters: { ...this.state.filters, type: value } });
  // };


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
                onFindPetsClick={this.fetchPets} 
                onChangeType={this.onChangeType}
                />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
                pets={this.state.pets} 
                onAdoptPet={this.onAdoptPet}
                />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
