import React from 'react';
import { Link } from 'react-router-dom';

import { 
    Avatar,
    AvatarAddOn,
    Container,
    Row,
    Col,
    Card,
    Button,
    CardBody,
    CardGroup
} from './../../../components';
import Fetcher from '../../../utilities/fetcher.js';
import port from '../../../port';
import Cookies from 'js-cookie';

export class ParticipantDetails extends React.Component {

    constructor(props){
        super(props);
        //this.history = useHistory();
        this.state = {
            rows: {},
            currentDataObject: {},
            lastFetch: Date.now(),
            loading: true,
        };

        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        let self = this;
        let pid = Cookies.get("pid");
        let url = `${port}/api/v1/participant/profile/${pid}`;
        Fetcher(url).then(function (response) {
            if (!response.error) {
                self.setState({rows: response});
            }
            self.setState({loading: false});
        });
    }

    render() {
        if(this.state.loading){
            return(
                <div><p>loading</p></div>
            )
        } else {
            return(
                <React.Fragment>
                    <Container>
                        <Row>
                            <Col lg={4}>
                                <Card>
                                    <CardBody>
                                        <div className="d-flex justify-content-center my-3">
                                            <Avatar.Image
                                                size="lg"
                                                src="http://bs4.webkom.co/img/avatars/2.jpg"
                                                addOns={[
                                                    <AvatarAddOn.Icon
                                                        className="fa fa-circle"
                                                        color="white"
                                                        key="avatar-icon-white-bg"
                                                    />
                                                ]}
                                            />
                                        </div>
                                        <div className="mb-4 text-center">
                                            <a className="h6 text-decoration-none" href="#">
                                                {this.state.rows.name}
                                            </a>
                                        </div>
                                        <Row className="mt-3">
                                            <Col sm={12} md={12}>
                                                <Button color="secondary" outline block tag={Link} to="/apps/profile-edit">
                                                    Edit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg={8}>
                                <CardGroup className="mb-5">
                                    <Card body>
                                        <ProfileOverviewCard
                                            title="SIGNUPS"
                                            badgeColor="primary"
                                            //badgeTitle="Monthly"
                                            value={this.state.rows.totalsignups}
                                            valueTitle="Total Signups"
                                            //footerTitle="Last Month"
                                            //footerTitleClassName="text-success"
                                            //footerIcon="caret-up"
                                            //footerValue="23%"
                                        />
                                    </Card>
                                    <Card body>
                                        <ProfileOverviewCard
                                            title="Customers"
                                            badgeColor="info"
                                            //badgeTitle="Annual"
                                            value={this.state.rows.totalcustomers}
                                            valueTitle="Total Customers"
                                            //footerTitle="Last Annual"
                                            //footerTitleClassName="text-danger"
                                            //footerIcon="caret-down"
                                            //footerValue="96%"
                                        />
                                    </Card>
                                    <Card body>
                                        <ProfileOverviewCard
                                            title="Clicks"
                                            //badgeColor="secondary"
                                            //badgeTitle="Today"
                                            value={this.state.rows.totalcustomers}
                                            valueTitle="Total Clicks"
                                        />
                                    </Card>
                                    <Card body>
                                        <ProfileOverviewCard
                                            title="Awaiting Payouts"
                                            //badgeColor="secondary"
                                            //badgeTitle="Today"
                                            value={`$${this.state.rows.awaitingpayout}`}
                                            valueTitle="Total Awaiting Payouts"
                                        />
                                    </Card>
                                </CardGroup>
                            </Col>
                        </Row>
                    </Container>
                </React.Fragment>
            )
        }
    }

}