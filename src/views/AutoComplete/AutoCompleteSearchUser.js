import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap';
import UserSearch from '../../services/UserSearch.service';


export default class AutoCompleteSearchUser extends Component {
  constructor(props) {
    super(props);
    // activatedUsers: []
    this.state = { searchContext: '', searchResult: [] };
    this.userSearch = new UserSearch();
  }

  render() {
    return (

      <Form>
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <strong>Search Users</strong>
              </CardHeader>
              <CardBody>

                <FormGroup>
                  <Label htmlFor="userSearch">Search for contributors</Label>
                  <Input type="text" id="userSearch" placeholder="Search for Users" autoComplete="off" value={this.state.searchContext} onChange={(e) => this.fetchUserEmails(e)} />

                  <Card className="modal-search-card">
                    {
                      this.state.searchResult.map(eachEmail => (
                        <Button outline color="link" className="d-block" type="button" key={eachEmail.id} onClick={() => this.setFieldsAndArrayEmpty(eachEmail.id, eachEmail.emailAddress)}>
                          {eachEmail.emailAddress}
                        </Button>
                      ))
                    }
                  </Card>
                </FormGroup>
              </CardBody>
            </Card>

          </Col>
        </Row>
      </Form>

    );

  }


  setFieldsAndArrayEmpty(userId, userEmail) {
    this.setState({
      searchContext: '',
      searchResult: []
    });
    this.props.selectUserDropdown(userId, userEmail);

  }
  async fetchUserEmails(e) {
    this.setState({ searchContext: e.target.value });
    if (this.state.searchContext.length > 2) {
      const response = await this.userSearch.doSearchUsers(e.target.value);

      if (response.status === 401) {
        this.props.history.push('/login/');
        // console.log(',', this.props);
        return;
      } else {

        const jsonResponse = await response.json();

        if (jsonResponse.data.success) {

          this.setState((state) => ({ searchResult: jsonResponse.data.records }));
        }
      }

      return;
    } else {
      this.setState({ searchResult: [] });
    }
  }



}