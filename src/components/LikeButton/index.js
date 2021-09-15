import React from 'react';
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import './style.css';
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
// import 'animate.css/animate.min.css';



class LikeButton extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isToggleOn: false
        }
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick(){
        this.setState(state =>({
            isToggleOn: !state.isToggleOn,
        }));

        this.handleNotification()
    };

    handleNotification(){
        if (this.state.isToggleOn) {
            store.addNotification({
                title: "Unliked!",
                message: "Oh no :(",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated animate__fadeIn"], 
                animationOut: ["animate__animated animate__fadeOut"],
    
                dismiss: {
                    duration: 2000,
                    onScreen: true
                  }
              });
          }else{
            store.addNotification({
                title: "Liked!",
                message: "Good pick",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated animate__fadeIn"], 
                animationOut: ["animate__animated animate__fadeOut"],
    
                dismiss: {
                    duration: 2000,
                    onScreen: true
                  }
              });
        };      
    };

   
    render() {
        return (  
            <div>
                <button className="likeBtn btn"  onClick={this.handleClick}>
                    {this.state.isToggleOn ?  <FcLike size="2em"/>: <FcLikePlaceholder size="2em"/>}
                </button>  
            </div>
        )
    }
}

export default LikeButton;



