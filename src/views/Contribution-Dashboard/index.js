import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { ContributionService } from '../../services/Contribution.service';
import ContributionCalculationModal from '../Modal/contribution_detail'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contributionList: [],
      isShowingContribution: false
    };
    this.contributionService = new ContributionService();
  }

  async componentDidMount() {
    const contributionResponse = await this.contributionService.getUserContribution();
    if (contributionResponse.status === 401) {
      // re route to login page.

      this.props.history.push('/login/');

      return;
    }
    const contributionList = await contributionResponse.json();
    if (!contributionList.data.success) {
      return;
    }
    this.setState({
      contributionList: contributionList.data.contribution
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>


  openModalForCalculation() {

    this.setState((state) => (
      state.isShowingContribution = !state.isShowingContribution
    ));



  }

  render() {

    return (
      <div className="animated fadeIn">

        <Row>
          <Col>
            <Card>
              <CardBody>

                <Button color="primary" className="pull-right" onClick={() => (this.openModalForCalculation())}>
                  Contribution Calculation
                </Button>


              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>



            <Card>
              <CardBody>

                <br />

                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center"><i className="icon-people"></i></th>
                      <th>Description</th>
                      <th>Total amount</th>
                      <th>Number Of Contributor</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                      this.state.contributionList.map((element, index) => (
                        <tr key={index}>
                          <td className="text-center">
                            <div className="avatar">
                              <img src={'assets/img/avatars/1.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                              <span className="avatar-status badge-success"></span>
                            </div>
                          </td>
                          <td>
                            <div>{element.description}</div>
                            <div className="small text-muted">
                              {/* <span>New</span> */}
                              Registered: {element.createdAt}
                            </div>
                          </td>

                          <td>
                            <div className="small text-muted">&#8377;</div>
                            <strong>{element.amount}</strong>
                          </td>

                          <td>
                            <div className="small text-muted"></div>
                            <strong>{(element.contributor || []).length + 1}</strong>
                          </td>


                          <td>
                            <a className="primary" className="mr-1" onClick={() => (this.editContribution(element.id))}>
                              <i className="fa fa-edit"></i>
                            </a>

                            <a className="danger" onClick={() => (this.deleteContributionRow(element.id))}>
                              <i className="fa fa-trash"></i>
                            </a>

                          </td>
                        </tr>

                      ))
                    }
                  </tbody>
                </Table>


                <ContributionCalculationModal isModalOpen={this.state.isShowingContribution} toggle={() => this.openModalForCalculation()} history={this.props.history}>

                </ContributionCalculationModal>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  editContribution(contributionId) {
    this.props.history.push('/contribution/' + contributionId);
    return;
  }

  async deleteContributionRow(contributionId) {

    const deleteContributionRowResponse = await this.contributionService.deleteContributionRow(contributionId);

    if (deleteContributionRowResponse.status === 401) {
      // re route to login page.
      this.props.history.push('/login/');
      return;
    }
    // const contributionDeleteStatus = await deleteContributionRowResponse.json();
    this.setState((oldState) => ({
      contributionList: oldState.contributionList
        .filter((eachRecord) => (eachRecord.id !== contributionId))
    }));

  }
}

export default Dashboard;
