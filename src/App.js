import React, { Component } from 'react';
import { Table, Button, Glyphicon } from 'react-bootstrap';
import classes from './App.module.css';
import { connect } from 'react-redux';
import MyModal from './Modal/Modal';

class App extends Component {
  render() {
    let Tbody = this.props.dataList.map((item) => {
      return (
        <tr key={item.id}>
          <td><span className={classes.fake_link} onClick={() => this.props.showItem(item)}>{item.manufacturer}</span></td>
          <td>{item.make}</td>
          <td>{item.model}</td>
          <td>{item.year}</td>
          <td className={classes.actions}>
            <Button onClick={() => this.props.editItem(item)}>
              <Glyphicon glyph="pencil" />
            </Button>
            <Button onClick={() => this.props.deleteItem(item)}>
              <Glyphicon glyph="trash" />
            </Button>
          </td>
        </tr>
      );
    })

    return (
      <div className="App">
        <Button className={classes.add_new_button} bsStyle="default" onClick={this.props.addItem}>Add New</Button>
        <MyModal />
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Manufacturer</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Tbody}
          </tbody>
        </Table>;
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.dataList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showItem: (item) => dispatch({type: 'SHOW', item: item}),
    addItem: () => dispatch({type: 'ADD'}),
    editItem: (item) => dispatch({type: 'EDIT', item: item}),
    deleteItem: (item) => dispatch({type: 'DELETE', item: item})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
