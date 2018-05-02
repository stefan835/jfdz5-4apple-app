import React from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'
import { Navbar, FormGroup, FormControl, Button, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import magnifier from "../img/magnifier.png"
import '../components/SearchBar.css'
import Link from "react-router-dom/es/Link"
import { connect } from 'react-redux'
import { filterResults } from '../state/searching'
import { allProductsPass } from "../state/allProducts";
import LogoText from "./LogoText";

class SearchBar extends React.Component {

  componentDidMount() {
    this.props.allProductsPass(this.state.allProducts)
  }

  state = {
    searchedName: '',
    searchedProducts: this.props.searchedProducts,
    allProducts: this.props.searchedProducts
  }

  signOutUser = () => {
    firebase.auth().signOut().then(() => {

    }).catch(error => {
      error(error.message)
    })
  }

  handleChange = (event) => this.setState({
    searchedName: event.target.value
  })

  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push('/results')
    this.props.addSearchedResults(this.state.searchedProducts, this.state.searchedName)
    this.setState({
      searchedName: '',
    })
  }
  render() {
    return (
      <div>
        <Navbar className="top__nav-bar">
          <Navbar.Header>
            <Navbar.Brand className="logo">
              <Link to={`/`}><LogoText size={'small'}/></Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <form className="search-form" onSubmit={this.handleSubmit}>
              <FormGroup>
                <FormControl className="search--input"
                             type="text"
                             value={this.state.searchedName}
                             onChange={this.handleChange}
                             required
                             placeholder="Znajdź produkt"/>
              </FormGroup>
              {' '}
              <Button className="search-button" type="submit">
                <i className={'glyphicon glyphicon-search'} />
              </Button>
            </form>
            <LinkContainer to="/favs">
              <a>Ulubione</a>
            </LinkContainer>
            <a onClick={this.signOutUser}>Wyloguj się</a>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default withRouter(
  connect(
    state => ({
      filteredResults: state.searching.searchedProducts,
      allProducts: state.allProducts.data
    }),
    dispatch => ({
      addSearchedResults: (searchedProducts, searchedItem) => dispatch(filterResults(searchedProducts, searchedItem)),
      allProductsPass: (data) => dispatch(allProductsPass(data))
    })
  )(SearchBar)
)