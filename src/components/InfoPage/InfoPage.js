import React, { Component } from 'react';
import { connect } from 'react-redux';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_SHELF' })
  }
  render() {
    return (
    <main><p>{JSON.stringify(this.props.state)}</p>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {this.props.state.shelf && this.props.state.shelf.map(item => <tr key={item.description}>
          <td>{item.description}</td>
          <td><img src={item.image_url} alt={item.description}/></td>
          </tr>)}
        </tbody>
      </table>
    </main>
    )
  }
}

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(InfoPage);

