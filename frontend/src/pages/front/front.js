import React, {Component} from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  Form,
  Button,
  FormGroup,
  Label,
} from 'reactstrap';
import serialize from 'form-serialize';

import {StaticLayout} from '../../components/Layouts';
import Loader from '../../components/Loader';
import notify from '../../utils/notify';
import getErrorMessage from '../../utils/getErrorMessage';
import {getActivitiesFromApi} from '../../requests/activities';
import date from '../../utils/date';
import {Table} from '../../components/Table';

class Front extends Component {
  state = {
    isLoading: false,
    isSubmitting: false,
    activities: [],
    noResults: false,
  };

  componentDidMount() {
    this.setState({isLoading: true});
  }

  onSubmit = async event => {
    try {
      event.preventDefault();

      this.setState({isSubmitting: true});

      const form = event.target;

      const data = serialize(form, {hash: true});

      const activitiesData = await getActivitiesFromApi(data);
      this.setState({activities: activitiesData});

      this.setState({isSubmitting: false});
      this.state.activities.length > 1
        ? this.setState({noResults: false})
        : this.setState({noResults: true});

      notify({
        type: 'success',
        text: 'Successfully Submitted',
      });
    } catch (err) {
      notify({
        type: 'error',
        text: getErrorMessage(err),
      });

      this.setState({isSubmitting: false});
    }
  };
  get headers() {
    return ['Topic', 'Count'];
  }

  renderItem = item => {
    return (
      <tr key={item.topic}>
        <td>{item.topic}</td>
        <td>{item.count}</td>
      </tr>
    );
  };
  render() {
    return (
      <StaticLayout>
        <Loader show={this.state.isLoading} />
        <Row className="mb-1">
          <Col md={12}>
            <Card>
              <CardHeader>Activities</CardHeader>
              <CardBody>
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="start">Start Date</Label>
                          <input
                            className="form-control"
                            type="date"
                            name="start"
                            id="start"
                            required
                            min={1}
                            defaultValue={date('07/03/2019', 'YYYY-MM-DD')}
                            disabled={this.props.isCreate}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="end">End Date</Label>
                          <input
                            className="form-control"
                            type="date"
                            name="end"
                            id="end"
                            required
                            min={1}
                            defaultValue={date('07/03/2019', 'YYYY-MM-DD')}
                            disabled={this.props.isCreate}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={2}>
                        <hr className="hrNoLine" />
                        <Button
                          color="primary"
                          disabled={this.state.isSubmitting}
                        >
                          {this.state.isSubmitting ? '......' : 'Submit'}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                  <br />
                  <Row>
                    <Col md={3}>
                      {this.state.activities.length > 1 ? (
                        <Table headers={this.headers}>
                          {this.state.activities.map(activity => {
                            return this.renderItem(activity);
                          })}
                        </Table>
                      ) : (
                        ''
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      {this.state.noResults ? <div>No results</div> : ''}
                    </Col>
                  </Row>
                </CardBody>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </StaticLayout>
    );
  }
}

export default Front;
