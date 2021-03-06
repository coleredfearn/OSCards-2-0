import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import "./Deck.css";
import axios from 'axios';


// create a page to view deck one cards, and create a get request to our DB
// upon component did mount GET all cards in deck 1
class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
  }
     
  componentDidMount() {
    const {deckNumber} = this.props.location.state;
    console.log(deckNumber);

    axios.get(`/deck/${deckNumber}`)
      .then((res) => {
        console.log("res: ", res);
        this.setState({deck: res});
      })
      .catch((err) => {
        console.log("err: ", err);
      })
  }


  handleDelete(id) {
    // fetch(`/deck/delete/${id}`, {method: 'DELETE'})
    axios.delete(`/deck/delete/${id}`, { data: { source: id } })
      .then(deletedNum => {
        console.log(`Successfully deleted ${deletedNum.data} card[s]`);
        const {deckNumber} = this.props.location.state;

        axios.get(`/deck/${deckNumber}`)
          .then((res) => {
            this.setState({deck: res});
          })
      })
      .catch((err) => {
        console.log("err: ", err);
      })
  }
  
  render(){
    // iterate through the response array of objects (this.state.deck)
    // render a component for each card object
    // ### provide flashcard styling
    // ### provide flashcard functionality
    const componentsToRender = [];
    
    const inputArray = this.state.deck.data || [];
    console.log('input array', inputArray);
    
    inputArray.map((current, i) => {
      let cid = this.state.deck.data[i]._id;
      componentsToRender.push(
        <div key={cid} id={cid} className="flashcard">
          <h5 className="card-title">{current.term}</h5>
          <p className="card-text">{current.definition}</p>
          <div className="d-flex flex-row justify-content-around">
            <button type="button" className="btn btn-primary btn-sm" onClick={() => this.handleDelete(cid)}>
              delete card
            </button>
            <button type="button" className="btn btn-primary btn-sm">update card</button>
          </div>
        </div>
      )
    })
    return (
      <div className="cards">
        {componentsToRender}
      </div>
    )
  }
}


export default Deck;

