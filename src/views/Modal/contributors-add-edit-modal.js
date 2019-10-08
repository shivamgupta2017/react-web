import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import React, { Component } from 'react';
import AutoCompleteSearchUser from '../../views/AutoComplete/AutoCompleteSearchUser';
import { Card, CardBody, Table } from 'reactstrap'
import ContributorService from '../../services/Contributor.service';


class ContributionAddEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = { activatedUsers: [] }
    this.contributorService = new ContributorService();
    // console.log('> ', this.props.activatedContribution.id);
  }


  render() {

    return (
      <Modal isOpen={this.props.isModalOpen} backdrop={true} toggle={() => this.props.toggle()}>
        <ModalBody>

          <AutoCompleteSearchUser selectUserDropdown={(userId, userEmail) => (this.selectUserDropdown(userId, userEmail))}></AutoCompleteSearchUser>

          <Card>
            <CardBody>
              <Table size="sm">

                <tbody>
                  {
                    this.state.activatedUsers.map((user, indx) => (
                      <tr key={user.userId}>
                        <td>{user.userEmail}</td>
                        <td className="delete-row-td" onClick={() => (this.removeMe(indx))}>x</td>
                      </tr>

                    ))
                  }

                </tbody>

              </Table>
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.addThemForSpecificContry()}>Add these contributors</Button>
        </ModalFooter>
      </Modal>
    );
  }

  async addThemForSpecificContry() {

    // 
    const addContributorsResponse = await this.contributorService.addNewContributors({

      sourceContributionId: this.props.activatedContribution.id,
      sourceUserId: this.state.activatedUsers
    });

    if (addContributorsResponse.status === 401) {
      // reroute to login page.
      return;
    } else {
      this.props.toggle()
    }

  }
  removeMe(userIndx) {
    this.setState((state) => {
      state.activatedUsers.splice(userIndx, 1);
      return state;
    });
  }

  selectUserDropdown(userId, userEmail) {
    if (this.state.activatedUsers.find((eachValue) => (eachValue.userId === userId))) {
      return;
    }

    this.setState((state) => {
      state.activatedUsers.push({ userId, userEmail });

      return state;
    });
  }



}

export default ContributionAddEditModal;