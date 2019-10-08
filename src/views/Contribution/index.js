import React, { Component } from 'react';
import {
  // Badge,
  Button,
  Card,
  CardBody,
  // CardFooter,
  CardHeader,
  Col,
  // Collapse,
  // DropdownItem,
  // DropdownMenu,
  // DropdownToggle,
  // Fade,
  Form,
  FormGroup,
  // FormText,
  // FormFeedback,
  Input,
  // InputGroup,
  // InputGroupAddon,
  // InputGroupButtonDropdown,
  // InputGroupText,
  Label,
  Row,
  Modal, ModalBody, ModalFooter
} from 'reactstrap';
import { ContributionService } from '../../services/Contribution.service'
import CommonService from '../../services/common.service'
import ContributionAddEditModal from '../../views/Modal/contributors-add-edit-modal'



class Forms extends Component {
  constructor(props) {
    super(props);
    this.contriubtionService = new ContributionService();
    this.commonService = new CommonService();

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      contribution: {
        description: '',
        amount: 0,
        id: null
      },
      isModalOpen: false
    };
    // console.log('state ', this.state);
  }

  render() {
    return (
      <div className="animated fadeIn">

        <Form onSubmit={this.handleSubmit}>

          <Row>
            <Col xs="12" sm="12">
              <Card>
                <CardHeader>
                  <strong>Contribution</strong>
                  <small>Form</small>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <Label htmlFor="Description">Description</Label>
                    <Input type="text" id="Description" placeholder="Enter your Description name" value={this.state.contribution.description} onChange={(ev) => this.changeField(ev.target.value, 'description')} />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="Amount">Amount</Label>

                    <Input type="number" id="Amount" placeholder="Enter Amount here .... 100/-" value={this.state.contribution.amount}
                      onChange={(ev) => this.changeField(ev.target.value, 'amount')} />
                  </FormGroup>

                  <FormGroup>
                    <Button color="primary" size="lg" block type="submit">Add Contribution now</Button>
                  </FormGroup>

                </CardBody>
              </Card>
            </Col>
          </Row>

        </Form>
        {/* this.state.isModalOpen */}
        <ContributionAddEditModal isModalOpen={this.state.isModalOpen} toggle={() => this.toggle()}
          activatedContribution={this.state.contribution}
        >

        </ContributionAddEditModal>

      </div>
    );
  }

  changeField(newValue, optionObject) {
    this.setState((state) => {
      state.contribution[optionObject] = newValue;
      return state;
    });
  }



  async handleSubmit(event) {
    event.preventDefault();

    const response = await this.contriubtionService.postContribution(this.state.contribution);
    if (!this.commonService.filterResponseByCode(response.status)) {
      this.props.history.push('/login');
    }
    const jsonResponse = await response.json();
    if (jsonResponse.success) {
      // open popup for sharing persons name ammendments
      this.setState((state) => (
        {
          ...state, contribution: jsonResponse.insertResponse
        }
      ))
      this.toggle();
    }


  }

  toggle() {
    this.setState((state) => ({
      ...state,
      isModalOpen: !state.isModalOpen
    }));
  }

}

export default Forms;
