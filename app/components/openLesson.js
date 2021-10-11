/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/self-closing-comp */
/* eslint-disable promise/always-return */
/* eslint-disable spaced-comment */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-duplicates */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import { Tabs, Tab } from 'react-tab-view';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from "react-router-dom";
import { RoutedTabs, NavTab } from "react-router-tabs";
import { Component } from 'react';
import { lesson } from '../../db/db';




const ipc = require('electron').ipcRenderer;
const db = require('../../db/db');

class openLessonComponent extends Component {



  constructor() {
    super();
    this.state = {
      lesson : [] ,
      retrieveLesson : false,
      retrieveWord : false,
      word:[],
      type:[]
   };

   this.retrieveInfo = this.retrieveInfo.bind(this);
   this.setLesson = this.setLesson.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  retrieveInfo(){

     new Promise((resolve, reject) => {
      ipc.send( 'FIND_ALL_LESSON' );

      ipc.on('ALL_LESSON_FETCHED', (event, result) => {
        if (result.text !== 'success') {
          // eslint-disable-next-line no-shadow
          const error = result.message;
           reject(error);
        }
         resolve(result);
      });
    })
    .then(info =>{
      this.setState({lesson : info.lessons});
      this.setState({retrieveLesson : true});
    }).catch(message=>{
       console.log(message);
    });

  }

  // eslint-disable-next-line class-methods-use-this
   async setLesson(){
    await this. retrieveInfo();
    // await this.setWord();

   /* return lName.then(message => {
		return  message;

    }) ; */
  }

 /* to={{
  pathname: '/showLesson',
  state: {
    name: lessonList.name
  }
}} */
/* {this.setWord(lessonList.lesson_name)}
             {this.state.word.map((wdInfo,index)=>(
              <li>{wdInfo}</li>
             ))}*/

  // console.log(lName);
  // console.log(typeof(lName));
  // console.log(Array.isArray(lName));

 //  return lName;
 // }

  render() {
    const headers = ['Open Lesson', 'Add New Lesson', 'Add Lesson Element'];
    const { size} = this.props;
    // eslint-disable-next-line no-undef
	//let allLesson=[];
   // allLesson = this.setLesson();
   if(this.state.retrieveLesson===false){
    this.setLesson();
   }
 //  this.setWord('bird');
 //  console.log('yesss we can');
   console.log(this.state.retrieveLesson);
    return (



        <div className="left">


        <RoutedTabs
         // startPathWith={match.path}
          tabClassName="tab-link"
          activeTabClassName="active"
        >

            <NavTab className='navBarLink' to="/openLesson"><button>Open all Lesson </button> </NavTab>
            <NavTab className='navBarLink' to="/AddLesson"><button>Add New Lesson</button> </NavTab>
            <NavTab className='navBarLink' to="/editLesson"><button>Add Lesson Element</button>  </NavTab>

        </RoutedTabs>

        {
          <div >
            {this.state.lesson.map((lessonList)=>(
              <div className="related_links">
                <div style={{
                  padding: '50px 0px 0px 20px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  float:'left',
                  margin: `${size/8}px`
                  }}>
                  <Link  className="btn btn-link"
                  to={{
                    pathname: '/showLesson',
                    state: {
                      name: lessonList.word
                    }}}>
                    <div
                      style={{
                        width: `${(size/5)*2+6}px`,
                        height: `${(size/5)*2+6}px`,
                        position: 'relative',
                        border: '3px',
                        borderStyle: 'solid',
                        borderRadius: '5px',
                        float: 'left',
                        borderColor: 'rgba(21, 183, 254, 1)'
                    }}>

                        <img src={`assets/images/${lessonList.lesson_name}/${lessonList.lesson_name}_0.jpeg`}
                          alt="Thumnail"
                          style={{
                            width: `${(size/5)*2}px`,
                            height: `${(size/5)*2}px`}}/>

                    </div>

                    <div style={{
                          alignContent: 'center',
                    }}>
                          {lessonList.lesson_name}
                    </div>


              </Link></div>
              </div>
            ))}
          </div>
        }
        </div>

    );
  }
}

openLessonComponent.defaultProps = {
  size: 300
};

export default openLessonComponent;



