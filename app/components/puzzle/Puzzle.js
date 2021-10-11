/* eslint-disable no-else-return */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable prefer-template */
/* eslint-disable spaced-comment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Typical from 'react-typical';
import PropTypes from 'prop-types';
import Grid from './Grid';
import Card from './Card';
import Board from './Board';


function createArray(level){
  const array = new Array(level*level);

  for(let i=0; i<level*level; i++){
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

function checkDone(tempGrid, level){

  for(let i=0; i<level*level; i++){

    if(tempGrid[i]===0){
      return false;
    }
  }

  return true;
}


class Puzzle extends Component {

  constructor(props) {
    super(props);
    const {level} = this.props;

    this.state = {
      lesson_name : this.props.location.state.name,
      gridArray : createArray(level),
      boardArray : shuffle(createArray(level)),
      grid : [0,0,0,0,0,0,0,0,0],
      isDone : false,
      finished : false,
      message1: '',
      message2: '',
      message3: '',
      count: 0,
      time: 0
    }
  }

  componentDidMount(){
    console.log('Did Mount')
    this.countInterval = setInterval(()=>{
      this.setState(prevState => ({
        count: prevState.count+1
      }))
      },1000)
  }

  componentWillUnmount(){
    clearInterval(this.countInterval);
  }



  onMove(cardId,gridId){
    //console.log('grid number : '+gridId);
    //console.log('card number : '+cardId);
    const {level, time} = this.props;
    const gridNumber = gridId[5];
    const cardNumber = cardId[5];

    console.log('gridNumber : ' + gridNumber);
    console.log('cardNumber : ' + cardNumber);

    const tempGrid = this.state.grid.slice();

    if(gridNumber===cardNumber){
      tempGrid[gridNumber] = 1;
    }else{
      tempGrid[gridNumber] = 0;
    }

    if(checkDone(tempGrid,level)===true){
      this.setState({isDone: true});
      this.setState({
        message1: 'Successfully',
        message2: 'Completed',
        message3: 'Time: ' + time +' sec',
      });

      console.log('Done!!!!!!!');
    }else{
      console.log('Not Done!!!');
    }

    this.setState({grid : tempGrid});

  }


  renderGridSquares() {
    const { size, level } = this.props;
    const { gridArray } = this.state;

    const gridSquares = gridArray.map((i) => {
      return (
        <Grid key={i} id={'grid-'+i} valid={1} size={size} level={level} position={i} onMove={this.onMove.bind(this)}> </Grid>

      );
    })

    return gridSquares;
  }

  renderBoardSquares() {
    const {size, level } = this.props;
    const { gridArray, boardArray, lesson_name, isDone} = this.state;
    const path = `assets/images/${lesson_name}/${lesson_name}_0.jpeg`;

    const boardSquares = gridArray.map((i) => {
      return (
        <Board key={i} id={'board-'+i} size={size} level={level} position={i}>
            <Card id={'card-'+boardArray[i]} size={size} image={path} level={level} isDraggable={!isDone}
             position={boardArray[i]}>
            </Card>
        </Board>
      );
    })

    return boardSquares;
  }


  render(){

    const {lesson_name, message1, message2, message3, finished, count} = this.state;
    const {size} = this.props;
    const path = `assets/images/${lesson_name}/${lesson_name}_0.jpeg`;


    console.log("time : " + count);
    //const images = importAll(require.context(`../../assets/images/${lesson_name}`, false, /\.(png|jpe?g|svg)$/));
    //console.log(images.length);

    if(!finished){
      const {isDone} = this.state;
      /**/

      if(isDone){
        console.log('Dhuke!!');
        this.switchInterval = setInterval(()=>{
        this.setState({
          finished: true
        });
        },6000)
      }
      return(
        <div className="container">
            <div className="row">
              <div style={{
                 display: 'flex',
                 flexWrap: 'wrap',
                 float:'left',
              }}>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  backgroundImage: `url(${path})`,
                  backgroundSize: `${size}px ${size}px`,
                  width: `${size}px`,
                  height: `${size}px`,
                  margin: '75px'
                }}>

                      {this.renderGridSquares()}

                </div>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignContent: 'space-around',
                  width: `${size+6}px`,
                  height: `${size+6}px`,
                  margin: '75px'
                }}>

                    {this.renderBoardSquares()}

                </div>

              </div>
            </div>
            { isDone?
            (<div className = "vas">
              <span className = "text1">
                {message1}
              </span>
              <span className = "text2">
                {message2}
              </span>
              <br/>


            </div>):""}



            <div className="row">
                  <Link to='/' className="btn btn-primary">
                      Back
                  </Link>

            </div>

          </div>

      );

    }else{
      return (
        <div>
          <Redirect push to={{pathname: '/mcq', state: {name: lesson_name}}} />
        </div>
        );
    }


  }

}

Puzzle.propTypes = {
   // image: PropTypes.string.isRequired,
  //  image:'assets/images/'+this.state.path+'/_0.jpg',
    size: PropTypes.number,
    level: PropTypes.number,
  };

Puzzle.defaultProps = {
    size: 300,
    level: 3,
};

export default Puzzle;
