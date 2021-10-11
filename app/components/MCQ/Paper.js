/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/self-closing-comp */
/* eslint-disable spaced-comment */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Image2 from '../../assets/images/Brash/Brash_0.jpeg';
import Image3 from '../../assets/images/Shoe/Shoe_0.jpeg';
import Image4 from '../../assets/images/Duck/Duck_0.jpg';
import Image5 from '../../assets/images/Cow/Cow_0.jpg';
import Tile from './Tile';

function createArray(numberOfImage){
    const array = new Array(numberOfImage);

    for(let i=0; i<numberOfImage; i++){
        array[i] = i;
    }
    return array;
}

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function checkAnswer(arr, answerIndex){
    for(let i=0; i<arr.length; i++){
        if(i !== answerIndex){
            if(arr[i] === 1){
                return false;
            }
        }
        else if(i === answerIndex) {
            if(arr[i] === 0){
                return false;
            }
        }
    }

    return true;
}

function checkNotSelected(arr){
    for(let i=0; i<arr.length; i++){
      if(arr[i] === 1){
        return false;
      }
    }
    return true;
}



class Paper extends Component{

    constructor(props){
        super(props);
        const {numberOfImage} = this.props;

        this.state = {
            lessonName : this.props.location.state.name,
            imageArray: shuffle(createArray(numberOfImage)),
            OMR: [0,0,0,0,0],
            answerIndex: 0,
            message: ''
        }

    }



    clickedImage(clickId){

        const tempOMR = this.state.OMR.slice();
        const {answerIndex} = this.state;

        if(tempOMR[clickId] === 1) {
            tempOMR[clickId] = 0;
        }
        else {
            tempOMR[clickId] = 1;
        }


        if(checkNotSelected(tempOMR)){
          console.log('Not select any!!!');
            this.setState({
              message: ''
            });
        }
        else if(checkAnswer(tempOMR,answerIndex)){
            console.log('Right!!!');
            this.setState({
              message: 'Right!'
            });
        }

        else{
            console.log('Wrong!!!');
            this.setState({
              message: 'Wrong!'
            });
        }

        this.setState({OMR: tempOMR});

    }

    renderImages() {
        const {size} = this.props;
        const {imageArray, lessonName} = this.state;
        //const {imageArray} = this.state;
        const Image1 = `assets/images/${lessonName}/${lessonName}_0.jpeg`;
        const arrayOfPath = [Image1,Image2,Image3,Image4,Image5];

        const images = imageArray.map((i) => {
            return(
                <Tile key={i} id={i} size={size} src={arrayOfPath[i]}
                    clickedImage={this.clickedImage.bind(this)}>
                </Tile>
            );
        } )

        return images;

    }

    render(){

        const {message, lessonName} = this.state;
        return(

          <div className = "container">
            <div className = "row justify-content-center">
            <h3><p align='left'>Which is a {lessonName} ?</p></h3>
            <div style={{
                  padding: '50px 0px 0px 20px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  float:'left'
              }}>
                  {this.renderImages()}
              </div>
            </div>
            <div>
                <h2>{message}</h2>
                <br/><br/><br/>
            </div>
            <div className="row">
                  <Link to='/' className="btn btn-primary">
                      Back
                  </Link>
            </div>
          </div>
        );
    }

}

Paper.propTypes = {
    size: PropTypes.number,
    numberOfImage: PropTypes.number,
    src: PropTypes.string,
};

Paper.defaultProps = {
    size: 120,
    numberOfImage: 5,
};


export default Paper;
