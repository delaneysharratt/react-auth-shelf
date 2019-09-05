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

  handleChange = (propertyName, event) => {
    this.setState({
      item: {
        ...this.state.item,
        [propertyName]: event.target.value
      }
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

  handleDelete = (id) => {
    this.props.dispatch({
      type: 'DELETE_ITEM',
      payload: id
    })
  }

  render() {
    console.log(this.state.item);

    return (
        <div className="shelf">

          <h2>Shelf</h2>

          <form onSubmit={this.addItem}>
            <input
              type="text"
              placeholder="item description"
              onChange={event => {
                this.handleChange('description', event);
              }}
            />
            <input
              type="text"
              placeholder="image url"
              onChange={event => {
                this.handleChange('image', event);
              }}
            />
            <button type="submit">Add Item</button>
          </form>

          <div>
            <table className="shelfTable">
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
                      <td>{item.user_id === this.props.state.user.id && <button onClick={() => this.handleDelete(item.id)}>Delete</button>}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(InfoPage);
