import { editLessonConstants } from '../constants';

const initialState = {
  editLesson: {
    isLoadedAlLesson: false,
    isLoadingAlLesson: true,
    list: {}
  }
}

const alLessonName = (state = initialState.editLesson, action) => {
  switch (action.type) {
    case editLessonConstants.FETCH:
      return {
        ...state,
        isLoadingAlLesson: true
      }
    case editLessonConstants.SUCCESS:

     // console.log(ghg);
     // console.log(action.LessonList);
      return {
        isLoadingAlLesson: false,
        isLoadedAlLesson: true,
        //data: action
        list: action.lessonList
      };
    default:
      return state;
  }
};

export default alLessonName;
