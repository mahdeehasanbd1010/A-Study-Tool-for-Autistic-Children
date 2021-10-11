import { showLessonConstants } from '../constants';

const initialState = {
  showLesson: {
    isStudentInfoLoaded: false,
    isStudentInfoLoading: true,
    data: {}
  }
}

const lessonData = (state = initialState.showLesson, action) => {
  switch (action.type) {
    case showLessonConstants.FETCH:
      return {
        ...state,
        isStudentInfoLoading: true
      }
    case showLessonConstants.SUCCESS:
      return {
        isStudentInfoLoading: false,
        isStudentInfoLoaded: true,
        data: action.lessonData
      };
    default:
      return state;
  }
};

export default lessonData;
