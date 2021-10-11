import React, { Fragment } from 'react';
import { Slide } from 'react-slideshow-image';
import { connect } from 'react-redux';
import { store } from '../../helpers/store';
import { Link } from 'react-router-dom';
import { editLessonActions } from '../../actions/getAlLessonNameAction';
import FormInput from '../common_components/FormInput';
import Select from '../common_components/SelectInput';
import PreviewInput from '../common_components/PreviewInput';
import Popup from 'reactjs-popup';
import { Route, Switch, Redirect } from "react-router-dom";
import { RoutedTabs, NavTab } from "react-router-tabs";



class EditLesson extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
    lesson_name: '',
    lesson_category:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  componentDidMount() {
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    this.props.dispatch(editLessonActions.fetchLesson(this.state.lesson_name));
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleSelectChange(e) {
    this.setState({ lesson_name: e.target.value });
  }




  render() {
    // eslint-disable-next-line react/prop-types
    const { isLoadedAlLesson,isLoadingAlLesson, AlLessons } = this.props;

    if (isLoadingAlLesson) {
      console.log('yess com');
      console.log('comp');
      console.log(this.props.isLoadedAlLesson);
      console.log(this.props.AlLessons);
      return <div><h4>Loading...</h4></div>;
    }

     let Category= [];
    //Category=AlLessons;

    Array.isArray(AlLessons) && AlLessons.map((ele,i)=>{
        Category.push(ele.name);
      })
          console.log(Array.isArray(AlLessons));

    return (
      <>

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
      </div>

      <h4>
            you have to select a lesson name ,<br />
             in which lesson you want to add a new lesson element.
      </h4>
      <div className="add-element">
        <form name="element_form" onSubmit={this.handleSubmit}>


              <div className="container">
            <div className="row">
              <div className="col-md-6">
                <Select
                title="Lesson "
                name="Lesson "
                options={Category}
                value={this.state.lesson_name}
                placeholder="Select  Lesson"
                handleChange={this.handleSelectChange}
                />
              </div>
            </div>
          </div>


          <div className="grouped-button-bottom-bar">
              <div className="container">
                <div className="row">
                  <div className="col-sm">
                    <Popup
                      trigger={
                        <button className="btn btn-default" type="button">
                          Cancel
                        </button>
                      }
                      modal
                    >
                      {close => (
                        <div className="warning-modal">
                          <div>
                            <h4>Are you Sure?</h4>
                            <p>
                              No changes will be saved. please click confirm to
                              discard all information
                            </p>
                            <Link to="/" className="btn btn-default">
                              Confirm
                            </Link>
                            <button
                              className="btn btn-light"
                              type="button"
                              onClick={() => {
                                console.log('modal closed ');
                                close();
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </Popup>

                    <Link
                      to={{
                        pathname: '/addLessonElement',
                        state: {
                          name: this.state.lesson_name
                        }
                      }}
                      className="btn btn-link"
                    >
                      Next
                    </Link>
                  </div>
                </div>
              </div>
            </div>
        </form>
        </div>
      </>
    );
  }
}

function mapStateToProps (state){
   // console.log('sjois');
    // console.log(state);
  return {
    isLoadedAlLesson: state.alLessonName.isLoadedAlLesson,
    isLoadedAlLesson: state.alLessonName.isLoadedAlLesson,
    AlLessons: state.alLessonName.list
  }
}

export default connect(mapStateToProps)(EditLesson);
