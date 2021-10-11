import React, { Fragment } from 'react';
import { Slide } from 'react-slideshow-image';
import { connect } from 'react-redux';
import { store } from '../../helpers/store';
import { Link } from 'react-router-dom';
import { showLessonActions } from '../../actions/showLesson.actions';
import ReactPlayer from 'react-player';
import './showLesson.css';
import Icon from './complete.png';


class studentInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
    student_name: this.props.location.state.name
    }
  }
  componentDidMount() {
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    this.props.dispatch(showLessonActions.fetchLesson(this.state.student_name));
  }

  /*properties = {
    duration: 5000000,
    transitionDuration: 1200,
    infinite:false,
    indicators: true,
    // arrows: true,
     prevArrow: <div style={{width: "30px", marginRight: "-30px"}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill=" #8B0000"><path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z"/></svg></div>,
    nextArrow: <div style={{width: "30px", marginLeft: "-30px"}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill=" #8B0000"><path d="M512 256L270 42.6v138.2H0v150.6h270v138z"/></svg></div>,
    onChange: (oldIndex, newIndex) => {
      console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    }
  };*/

  render() {
    // eslint-disable-next-line react/prop-types
    const {  isStudentInfoLoading,  isStudentInfoLoaded,  studentInfoData } = this.props;
    console.log(isStudentInfoLoading);
    console.log(isStudentInfoLoaded);
    if (isStudentInfoLoading) {
      console.log('yess com');
      return <div><h4>Loading...</h4></div>;
    }

    let name;
    let images;
    let class_id;
    let comments;
   // const path = require('path');

    name = studentInfoData.data.wordName;
   // images=studentInfoData.data.slideImages;

    // audio=lessonD             ata.data.audio;
    let i;
    return (
      <>
      <img src={`assets/student/${name}/${name}_0.png`}
      alt="Thumnail"
      style={{
        width: `${(size/5)*2}px`,
        height: `${(size/5)*2}px`}}/>


        <div>
            <div className="row">
                <div className="col-sm-2">
                  <img src={Icon} alt="complete" />
                      </div>
                    </div>
                    <Link to={{
                            pathname: '/puzzle',
                            state: {
                            name: this.state.student_name
                            }}}
                        className="btn btn-primary"
                      >Back
                    </Link>
                    </div>


      </>
    );
  }
}

function mapStateToProps (state){

  return {
    isLoading: state.lessonData.isLoading,
    isLoaded: state.lessonData.isLoaded,
    lessonData: state.lessonData
  }
}

export default connect(mapStateToProps)(studentInfo);
