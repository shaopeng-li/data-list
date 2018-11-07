import React, { Component } from 'react';
import {Modal, Button, Form, FormGroup, Col, FormControl} from 'react-bootstrap';
import {uniqueId} from 'lodash';
import {connect} from 'react-redux';

class MyModal extends Component {
    saveHandler = () => {
        let list = JSON.parse(JSON.stringify(this.props.dataList));
        if (this.props.action === 'add') {
            list.push({id: uniqueId('id_'), manufacturer: this.manu.value, make: this.make.value, model: this.model.value, year: this.year.value});
        } else if (this.props.action === 'edit') {
            let index = this.props.dataList.findIndex((item) => item.id === this.props.carInfo.id);
            list.splice(index, 1, {id: this.props.carInfo.id, manufacturer: this.manu.value, make: this.make.value, model: this.model.value, year: this.year.value});
        } else if (this.props.action === 'delete') {
            let index = this.props.dataList.findIndex((item) => item.id === this.props.carInfo.id);
            list.splice(index, 1);
        } else {
            this.props.handleClose();
        }
        this.props.changeItem(list);
    }

    render() {
      return (
        <div>
          <Modal show={this.props.showModal}>
            <Modal.Header>
              <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.props.action === 'delete' ? <React.Fragment>
                    <p>{this.props.verbage}</p>
                    <p>{this.props.carInfo.year} {this.props.carInfo.manufacturer} {this.props.carInfo.make} {this.props.carInfo.model}</p>
                </React.Fragment> : <Form horizontal>
                    <FormGroup>
                        <Col sm={2}>
                            Manufactour
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" inputRef={ref => { this.manu = ref }} defaultValue={this.props.carInfo.manufacturer} disabled={this.props.action === 'show'}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2}>
                            Make
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" inputRef={ref => { this.make = ref }} defaultValue={this.props.carInfo.make} disabled={this.props.action === 'show'}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2}>
                            Model
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" inputRef={ref => { this.model = ref }} defaultValue={this.props.carInfo.model} disabled={this.props.action === 'show'}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={2}>
                            Year
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" inputRef={ref => { this.year = ref }} defaultValue={this.props.carInfo.year} disabled={this.props.action === 'show'}/>
                        </Col>
                    </FormGroup>
                </Form>}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.saveHandler}>Save</Button>
                <Button onClick={this.props.handleClose}>Cancel</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
  
const mapStateToProps = (state) => {
    return {
        showModal: state.showModal,
        title: state.title,
        action: state.act,
        carInfo: state.carInfo,
        verbage: state.verbage,
        dataList: state.dataList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleClose: () => dispatch({type: 'closeModal'}),
        changeItem: (payload) => dispatch({type: 'changeItem', payload: payload}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyModal);