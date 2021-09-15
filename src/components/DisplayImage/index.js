import React from 'react';
import axios from 'axios';
import LikeButton from '../LikeButton';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { ButtonToolbar } from 'react-bootstrap';
import { FacebookIcon, FacebookMessengerIcon } from "react-share";
import { FacebookShareButton, FacebookMessengerShareButton } from "react-share";
import './style.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const apiKey = "jqEIP8jnSKUVM3CsAjTELRlaMRw5u8RfKTCXYtz8";

class DisplayImage extends React.Component {
    state = {
        data: [],
        startDate: new Date(),
        endDate: new Date(),
    }

    componentDidMount() {
        this.getImageData = this.getImageData.bind(this);
        this.getImageData(this.state.startDate);
    }

    handleDateChange(startDate) {
        this.getImageData(startDate)
    }

    // Calling NASA API to retrieve data
    getImageData(date){
        const startDate = this.toYYYYMMDD(date)
        const endDate = this.toYYYYMMDD(this.state.endDate)
        axios.get(`https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`)
        .then(response => {
            this.setState({ data: response.data, startDate: date });
        })
        .catch(error => {
            throw new Error(error);
        });
    }

    // Convert date to YYYY-MM-DD format
    toYYYYMMDD(date){
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    }

    // TODO: REMOVE
    // copyright: "Tony Hallas"
    // date: "2013-08-30"
    // explanation: "These three bright nebulae are often featured in telescopic tours of the constellation Sagittarius and the crowded starfields of the central Milky Way. In fact, 18th century cosmic tourist Charles Messier cataloged two of them; M8, the large nebula left of center, and colorful M20 on the right. The third, NGC 6559, is above M8, separated from the larger nebula by a dark dust lane. All three are stellar nurseries about five thousand light-years or so distant. The expansive M8, over a hundred light-years across, is also known as the Lagoon Nebula. M20's popular moniker is the Trifid. Glowing hydrogen gas creates the dominant red color of the emission nebulae, with contrasting blue hues, most striking in the Trifid, due to dust reflected starlight. The colorful skyscape recorded with telescope and digital camera also includes one of Messier's open star clusters, M21, just above the Trifid."
    // hdurl: "https://apod.nasa.gov/apod/image/1308/SagTriplet6D_hallasNew.jpg"
    // media_type: "image"
    // service_version: "v1"
    // title: "A Sagittarius Triplet"
    // url: "https://apod.nasa.gov/apod/image/1308/SagTriplet6D_hallasNew950.jpg"
    render() {
        return (  
            <div>
                <form onSubmit={ this.onFormSubmit }>
                    <div className="form-group">
                    <DatePicker
                        selected={ this.state.startDate }
                        onChange={ this.getImageData }
                        name="startDate"
                        dateFormat="MM/dd/yyyy"
                        maxDate={new Date()}
                    />
                    </div>
                </form>
                {this.state.data.map(image => (
                    <div key={image.title}>
                        <Row className="row justify-content-center mt-3" >
                            <Card className="text-center" style={{ width: '35rem' }}>
                                <Card.Img className="mt-3" variant="top" src={image.url} alt={image.title} />
                                <Card.Body>
                                <Card.Subtitle>{image.date}</Card.Subtitle>
                                <Card.Title>{image.title}</Card.Title>
                                <Card.Text>{image.explanation}</Card.Text>
                                <ButtonToolbar className="justify-content-between">
                                <ButtonGroup aria-label="First group">
                                    <LikeButton />
                                </ButtonGroup>
                                <ButtonGroup aria-label="First group">
                                    <FacebookShareButton 
                                        url ={image.url}>
                                        <FacebookIcon size={60} round={true}/>
                                    </FacebookShareButton>
                                    <FacebookMessengerShareButton url ={image.url}>
                                        <FacebookMessengerIcon size={60} round={true}/>
                                    </FacebookMessengerShareButton>
                                </ButtonGroup>
                                </ButtonToolbar>
                                </Card.Body>
                            </Card>
                        </Row>
                    </div>
                ))}
            </div>
        )
    }
}

export default DisplayImage;