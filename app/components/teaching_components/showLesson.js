import React, { Fragment } from 'react';
import { Slide } from 'react-slideshow-image';
import { connect } from 'react-redux';
import { store } from '../../helpers/store';
import { Link } from 'react-router-dom';
import { showLessonActions } from '../../actions/showLesson.actions';
import ReactPlayer from 'react-player';
import './showLesson.css';
import Icon from './complete.png';


class ShowLesson extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
    lesson_name: this.props.location.state.name
    }
  }
  componentDidMount() {
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    this.props.dispatch(showLessonActions.fetchLesson(this.state.lesson_name));
  }

  properties = {
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
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { isLoading, isLoaded, lessonData } = this.props;
    console.log(isLoading);
    console.log(isLoaded);
    if (isLoading) {
      console.log('yess com');
      return <div><h4>Loading...</h4></div>;
    }

    let word=[];
    let images=[];
    let video=[];
    let audio=[];
   // const path = require('path');

    word = lessonData.data.wordName;
    images=lessonData.data.slideImages;
    lessonData.data.video&&lessonData.data.video.map((videoPath)=>
    video.push(videoPath)
     // video.push( URL.createObjectURL(new FileReader().readAsDataURL(videoPath)))
    // video.push(path.relative(process.cwd(),videoPath))
    );

	lessonData.data.audio&&lessonData.data.audio.map((audioPath)=>
    audio.push(audioPath)
     // video.push( URL.createObjectURL(new FileReader().readAsDataURL(videoPath)))
    // video.push(path.relative(process.cwd(),videoPath))
    );
    // audio=lessonData.data.audio;
    let i;
    return (
      <>
        {console.log('comp')}
        {console.log(this.props.isLoaded)}
        {console.log(this.props.isLoading)}

        <div className="showLesson">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="slideshow">
                  <div className="slide-container">
                   <Slide {...this.properties}>
                     {
                        images ? images.map((slides,index) => (

                        <div className="each-slide">
							            <div className="title-block-slideText">
								            <div className="title-block">
									            <div className="container">
										            <div className="row">
											            <div className="col-sm-12">
												            <h3>{word[index]}</h3>
											            </div>
										            </div>
									            </div>
								            </div>
							            </div>

                             <div className="bcg"
                              style={{
                                // eslint-disable-next-line react/prop-types
                                backgroundImage: `url(assets/images/${word[index]}/${slides})`
                              }}
                             />

							  {
                         audio && audio.map( (videoPath,index) =>(
                          <div className ='player-wrapper' >
                              <ReactPlayer
                               className='react-player fixed-bottom'
                               url= {`assets/audioes/${word[index]}/_${index}.mp3`}
                               playing={true}
                               width='20%'
                               height='20%'
                               controls = {true} />
                          </div>
                          ))
                         }

                        </div>
                         )) : "loading ....."

                      }
                        {
                         video && video.map( (videoPath,index) =>(
                          <div className ='player-wrapper' >
                              <ReactPlayer
                               className='react-player fixed-bottom'
                               url= {`assets/videos/${word[index]}/_${index}.mp4`}
                               playing={true}
                               width='100%'
                               height='100%'
                               controls = {true} />
                          </div>
                          ))
                         }


                       <div>
                            <div className="row">
                               <div className="col-sm-2">
                                  <img src={Icon} alt="complete" />
                                </div>
                            </div>
                            <Link to={{
                            pathname: '/puzzle',
                            state: {
                            name: this.state.lesson_name
                        }}}
                        className="btn btn-primary"
                      >
                      <h4>
                      you complete your lesson .
                      Click Next .....
                    </h4>
                      </Link>



                          </div>


                    </Slide>
                    {/*
					<div>
                    <Link className="btn btn-primary" to="/puzzle">
                      Next
                    </Link>
                    </div>
					*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps)(ShowLesson);
