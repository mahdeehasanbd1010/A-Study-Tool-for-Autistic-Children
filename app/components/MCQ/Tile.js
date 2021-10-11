/* eslint-disable no-else-return */
/* eslint-disable spaced-comment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable one-var */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
import  React, {Component} from 'react';
import PropTypes from 'prop-types';
import clickImage from './signOfClick.png';


class Tile extends Component{

    constructor(props){
        super(props);

        this.state = {
            isChecked : false,
        }
    }

    onclick(){
        const{isChecked} = this.state;
        const {id, clickedImage} = this.props;
        clickedImage(id);
        if(isChecked){
            this.setState({
                isChecked: false,
            });
        }
        else{
            this.setState({
                isChecked: true,
            });
        }
    }

    render(){
        const{id,size,src} = this.props;
        const {isChecked} = this.state;

        if(!isChecked){

          return(
              <div id={id}
                  style={{
                    width: `${size+6}px`,
                    height: `${size+6}px`,
                    margin: `${size/3}px`,
                    position: 'relative',
                    border: '3px',
                    borderStyle: 'solid',
                    borderRadius: '5px',
                    float: 'left',
                    borderColor: 'lightgray'
              }} onClick={() => this.onclick()}>

                  <div
                      style={{
                        width: `${size/8}px`,
                        height: `${size/8}px`,
                        position: 'absolute',
                        zIndex: 1,
                        top: '2px',
                        right: '2px',
                        borderRadius: '2px',
                        background: 'lightgray'
                  }}/>

                  <div>
                      <img className='image' src={src} alt='loading' width={size} height={size}/>
                  </div>
                  {this.props.children}
              </div>
          );
        }

        else{

          return(
              <div id={id}
                  style={{
                    width: `${size+6}px`,
                    height: `${size+6}px`,
                    margin: `${size/3}px`,
                    position: 'relative',
                    border: '3px',
                    borderStyle: 'solid',
                    borderRadius: '5px',
                    float: 'left',
                    borderColor: 'rgba(21, 183, 254, 1)'
              }} onClick={() => this.onclick()}>
                  <div
                    style={{
                      width: `${size/8}px`,
                      height: `${size/8}px`,
                      position: 'absolute',
                      zIndex: 1,
                      top: '2px',
                      right: '2px',
                      borderRadius: '2px',
                      backgroundImage: `url(${clickImage})`,
                      backgroundSize: 'cover',
                  }}/>
                  <div>
                      <img className='image' src={src} alt='loading' width={size} height={size}/>
                  </div>
                  {this.props.children}
              </div>
          );
        }



    }

}

Tile.propTypes = {
    id: PropTypes.number,
    style: PropTypes.object,
    children: PropTypes.node,
}

export default Tile;

//x.style.borderColor='rgba(137, 196, 244, 1)';

