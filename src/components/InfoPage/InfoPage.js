import React, { Component } from 'react';
import { connect } from 'react-redux';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {
  state = {
    item: {
      description: '',
      image: ''
    }
  };

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_SHELF' });
  }

  onChange = (propertyName, event) => {
    this.setState({
      ...this.state.item,
      [propertyName]: event.target.value
    });
  };

  addItem = event => {
    event.preventDefault();
    console.log('Adding item:', this.state.item);
    this.props.dispatch({
      type: 'ADD_ITEM',
      payload: this.state.item
    });
  };

  render() {
    return (
      <div>
        <p>{JSON.stringify(this.props.state)}</p>
        <div>
          <h2>Shelf</h2>
          <form onSubmit={this.addItem}>
            <input
              placeholder="item description"
              onChange={event => this.handleChange('description', event)}
            />
            <input
              placeholder="image url"
              onChange={event => this.handleChange('image', event)}
            />
            <button type="submit">Add Item</button>
          </form>
        </div>
        <main>
          <p>{JSON.stringify(this.props.state)}</p>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {this.props.state.shelf &&
                this.props.state.shelf.map(item => (
                  <tr key={item.description}>
                    <td>{item.description}</td>
                    <td>
                      <img src={item.image_url} alt={item.description} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(InfoPage);
