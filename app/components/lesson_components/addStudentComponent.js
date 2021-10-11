/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import FormInput from '../common_components/FormInput';
import Select from '../common_components/SelectInput';
import PreviewInput from '../common_components/PreviewInput';
import { RoutedTabs, NavTab } from "react-router-tabs";
import { addStudentAction } from '../../actions/addStudent.action';

class AddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      // eslint-disable-next-line react/no-unused-state
      id: '',
      element_category: '',
      images: [],
      Category: ['Noun', 'Verb', 'Association', 'Activity'],
      errors: {},
      pending: false,
      submitted: false,
      video: [],
      audio: []
    };
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
    this.uploadAudio = this.uploadAudio.bind(this);
    this.uploadVedio = this.uploadVedio.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSelectChangeForWordType = this.handleSelectChangeForWordType.bind(
      this
    );
    this.handleWordChange = this.handleWordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSelectChange(e) {
    this.setState({ element_category: e.target.value });
  }

  // eslint-disable-next-line no-dupe-class-members
  handleSelectChangeForWordType(e) {
    this.setState({ id: e.target.value });
  }

  handleWordChange(e) {
    this.setState({ name: e.target.value });
  }

  // eslint-disable-next-line class-methods-use-this
  handleSubmit(e) {
    e.preventDefault();

    const arr = [];
    const arrAudio=[];

    this.state.video.map( vi => {
      arr.push(vi.path);
    })



    const student = {
      // eslint-disable-next-line react/destructuring-assignment
      name: '' || this.state.name,
      id: '' || this.state.id,
      images: this.state.images,
      video: arr
    };
    this.setState({ pending: true });
    if (student) {
      this.props.pending(student);
    }
  }

  fileObj = [];

  fileArray = [];

  fileObjAudio = [];

  fileArrayAudio = [];

  fileObjVedio = [];

  fileArrayVedio = [];

  // TODO: seperate video, audio and image validation
  validExtensions = ['.png', '.jpg', '.mp4', '.mp3'];

  hasExtension(fileName, extesions) {
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    const pattern = `(${extesions.join('|').replace(/\./g, '\\.')})$`;
    return new RegExp(pattern, 'i').test(fileName);
  }

  uploadMultipleFiles(e) {
   // console.log(this.fileArray);
    /* Get files in array form */
    const files = Array.from(e.target.files);
    /* Map each file to a promise that resolves to an array of image URI's */
    // eslint-disable-next-line promise/catch-or-return
   // const files = this.state.images;
    Promise.all(
      files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener('load', ev => {
            // eslint-disable-next-line react/prop-types
            if (!this.hasExtension(file.name, this.validExtensions)) {
              this.setState({
                errors: { fileError: 'extension not supported' }
              });
              reject(new Error('Extension not supported'));
            }
            resolve(ev.target.result);
          });
          reader.addEventListener('error', reject);
          reader.readAsDataURL(file);
        });
      })
    ).then(
      // eslint-disable-next-line promise/always-return
      images => {
        // eslint-disable-next-line promise/always-return
        const string = images.toString().split(';base64,')[0];
      //  console.log(string);
        this.fileArray.push(images);
        /* Once all promises are resolved, update state with image URI array */
        this.setState({ images: this.fileArray }, function() {
          console.log(this.state.images);
        });
      },
      // eslint-disable-next-line no-shadow
      error => {
        console.error(error);
      }
    );
  }

  uploadAudio(e) {
    console.log(this.fileArrayAudio);
    const files = Array.from(e.target.files);
    files.map( audio => {
      this.fileArrayAudio.push(audio);
      const str =audio.toString('base64');
      console.log(str);
    })
    console.log(this.fileArrayAudioVedio);
    this.setState({ audio : this.fileArrayAudio });
  }



  uploadVedio(e) {
  //  console.log(this.fileArrayVedio);
    const files = Array.from(e.target.files);
    files.map( video => {
      this.fileArrayVedio.push(video);
      const str =video.toString('base64');
      console.log(str);
    })
 //   console.log(this.fileArrayVedio);
    this.setState({ video : this.fileArrayVedio });
  }

  render() {
    const { pending, errors } = this.state;
    return (
      <>

      <RoutedTabs
         // startPathWith={match.path}
          tabClassName="tab-link"
          activeTabClassName="active"
        >

            <NavTab className='navBarLink' to="/addStudent"><button>Add Student </button> </NavTab>
            <NavTab className='navBarLink' to="/studentList"><button>All Student</button> </NavTab>

        </RoutedTabs>
        <div className="title-block">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h3>Add new Student</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="add-element">
          <form name="element_form" onSubmit={this.handleSubmit}>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <FormInput
                    label="Student id"
                    labelClassName="col-sm-2 col-form-label"
                    name="type"
                    type="text"
                    value={this.state.id}
                    onChange={this.handleSelectChangeForWordType}
                    placeholder="Enter  Student id"
                    error={errors.word}
                    required
                    className="form-control"
                    inputContainerClassName="col-sm-10"
                  />
                  <FormInput
                    label="Student Name"
                    labelClassName="col-sm-2 col-form-label"
                    name="word"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleWordChange}
                    placeholder="Enter Student name"
                    error={errors.word}
                    required
                    className="form-control"
                    inputContainerClassName="col-sm-10"
                  />

                  <PreviewInput
                    name="files"
                    label="Picture"
                    onChange={this.uploadMultipleFiles}
                    files={this.fileArray}
                    error={errors.fileError}
                  />

                  <PreviewInput
                    name="vedio"
                    label="Reward"
                    onChange={this.uploadVedio}
                    file={this.fileArrayVedio}
                    erroe={errors.fileError}
                  />
                </div>
              </div>
            </div>

            <div className="grouped-button-bottom-bar">
              <div className="container">
                <div className="row">
                  <div className="col-sm">
                    <div className="btn btn-primary">
                      <Link to="/">Back </Link>
                    </div>
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
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
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

function mapState(state) {
  const { pending } = state.editForm;
  return { pending };
}

const actionCreators = {
  pending: addStudentAction.pending
};

const connectedElementForm = connect(mapState, actionCreators)(AddStudent);

// eslint-disable-next-line import/prefer-default-export
export { connectedElementForm as AddStudentPage };
