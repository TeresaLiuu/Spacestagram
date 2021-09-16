import React from 'react';
import axios from 'axios';
import LikeButton from '../LikeButton';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { ButtonToolbar } from 'react-bootstrap';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import { LinkedinShareButton, LinkedinIcon } from 'react-share';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';


const apiKey = 'jqEIP8jnSKUVM3CsAjTELRlaMRw5u8RfKTCXYtz8';
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

    render() {
        return (  
            <div>
                <div className='input-container'>
                <form onSubmit={ this.onFormSubmit }>
                    <div>
                    <label className='dateLabel'>Pick a date :</label>
                    <DatePicker 
                        selected={ this.state.startDate }
                        onChange={ this.getImageData }
                        name='startDate'
                        dateFormat='MM/dd/yyyy'
                        maxDate={new Date()}
                    />
                    </div>
                </form>
                </div>
                
                {this.state.data.map(image => (
                    <div key={image.title}>
                        <Row className='row justify-content-center mt-3' >
                            <Card className='text-center' style={{ width: '35rem' }}>
                                <Card.Img className='mt-3' variant='top' src={image.url} alt={image.title} />
                                <Card.Body>
                                <Card.Subtitle>{image.date}</Card.Subtitle>
                                <Card.Title>{image.title}</Card.Title>
                                <Card.Text>{image.explanation}</Card.Text>
                                    <ButtonToolbar className='justify-content-between'>
                                    <ButtonGroup aria-label='First group'>
                                        <LikeButton />
                                    </ButtonGroup>
                                    <ButtonGroup aria-label='First group'>
                                        <FacebookShareButton
                                            quote = {image.explanation} 
                                            url ={image.url}>
                                            <FacebookIcon size={60} round={true}/>
                                        </FacebookShareButton>
                                        <LinkedinShareButton 
                                            url ={image.url}>
                                            <LinkedinIcon size={60} round={true}/>
                                        </LinkedinShareButton>
                                        <TwitterShareButton
                                            title = {image.title} 
                                            url ={image.url}>
                                            <TwitterIcon size={60} round={true}/>
                                        </TwitterShareButton>
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