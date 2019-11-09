import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import React, { Component } from 'react';
import AutoCompleteSearchUser from '../AutoComplete/AutoCompleteSearchUser';
import { Card, CardBody, Table, FormGroup, Label, Input, Col, Row } from 'reactstrap'
import { ContributionService } from '../../services/Contribution.service';

import UserSearch from '../../services/UserSearch.service';

class ContributionCalculationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      aSpentMoneyAgainstB: 0,
      bSpentMoneyAgainstA: 0,
      selectBoxValue: {
        id: '',
        fullName: ''
      }
    };
    this.userSearch = new UserSearch();
    this.contributionService = new ContributionService();

  }

  async componentWillReceiveProps() {

    if (!this.props.isModalOpen) {

      const userSearchResponse = await this.userSearch.doSearchUsers('', true);
      if (userSearchResponse === 401) {
        // reroute to login page.

        this.props.history.push('/login/');
        return;

      }
      const userListResponseJson = await userSearchResponse.json();

      if (!userListResponseJson.data.success) {
        return;
      }

      this.setState({
        usersList: userListResponseJson.data.records || []
      });





    }

  }


  render() {

    return (
      <Modal isOpen={this.props.isModalOpen} backdrop={true} toggle={() => this.props.toggle()}>

        <ModalBody>
          <Card>
            <CardBody>
              <FormGroup>

                <Label for="exampleSelect">Select</Label>
                <Input type="select" name="select" id="exampleSelect" onChange={(e) => (this.onChangeSelectbox(e.target.value))} value={this.state.selectBoxValue.id}>
                  <option key={0} value={''}></option>
                  {this.state.usersList.map((each) => (
                    <option key={each.id} value={each.id}>{each.fullName + ' => ' + each.emailAddress}</option>
                  ))}
                </Input>
              </FormGroup>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Row>
                <Col sm="10">What You have spent against {this.state.selectBoxValue.fullName}</Col>
                <Col sm="2">{this.state.aSpentMoneyAgainstB}</Col>
              </Row>

              <Row>
                <Col sm="10">What {this.state.selectBoxValue.fullName} has spent against You</Col>
                <Col sm="2">{this.state.bSpentMoneyAgainstA}</Col>
              </Row>

            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          {(this.state.selectBoxValue.id)
            ? <Button outline color="primary" onClick={this.doMakeSettlement.bind(this)}>Make Settlement</Button>
            : ''}

        </ModalFooter>
      </Modal>
    );
  }



  async onChangeSelectbox(e) {

    const object = this.state.usersList.find((record) => {
      return record.id === +e
    });

    this.setState({
      selectBoxValue: {
        id: e,
        fullName: object.fullName
      }
    });

    const contributionFnfResponse = await this.contributionService.getAccountDetail(e);
    if (contributionFnfResponse.status === 401) {
      this.props.history.push('/login/');
      return;
    }

    const contributionJson = await contributionFnfResponse.json();
    if (!contributionJson.data.success) {
      return;
    }
    this.setState({
      aSpentMoneyAgainstB: contributionJson.data.aSpentMoneyAgainstB,
      bSpentMoneyAgainstA: contributionJson.data.bSpentMoneyAgainstA
    });


  }


  async doMakeSettlement() {
    const settlementResponse = await this.contributionService
      .doMakeSettlementWithContributor(this.state.selectBoxValue.id);

    if (settlementResponse.status === 401) {
      this.props.history.push('/login/');
      return;
    }

    // const settlementJson = await settlementResponse.json();
    // if (!settlementJson.data.success) {
    //   return;
    // }
    // console.log('settlementJson >> ', settlementJson);
    
  }
}

export default ContributionCalculationModal;