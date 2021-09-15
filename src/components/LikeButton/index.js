import React from 'react';
import Button from 'react-bootstrap/Button';
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import './style.css';


class LikeButton extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isToggleOn: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.setState(state =>({
            isToggleOn: !state.isToggleOn
        }));
    }

   
    render() {
        return (  
            <div>
                <Button className="likeBtn" variant="light" onClick={this.handleClick}>
                    {this.state.isToggleOn ?  <FcLike size="2em"/>: <FcLikePlaceholder size="2em"/>}
                </Button>  
            </div>
        )
    }
}

export default LikeButton;



