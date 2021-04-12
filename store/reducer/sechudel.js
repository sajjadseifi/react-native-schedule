import Scheudle from "../../models/sechudle";
import { updateObject } from "../../utils/utils";
import {
  ADD_SECHUDLE,
  DELETE_SECHUDLE,
  EMPTY_SINGLE_SCHEDULE,
  EMPTY_VIEW_SCHEDULE,
  START_LOAD_SCHEDULE,
  FINISHED_LOAD_SCHEDULE,
  GET_ALL_SECHUDLE,
  SINGLE_SECHUDLE,
  UPDATE_ISDONE_SECHUDLE,
  UPDATE_SECHUDLE,
  VIEW_SECHUDLE,
  START_LOAD_EDIT_SCHEDULE,
  FINISHED_LOAD_EDIT_SCHEDULE,
  EDIT_SCHEDULE,
  SET_MESSAGE_SCHEDULE,
  EMPTY_MESSAGE,
} from "../actions/actionsType";

const initialState = {
  schedules: [],
  single: null,
  viewSchedule: null,
  loading: null,
  loadingEdit: null,
  message: null,
  succssEdit: null,
  notifLoad: null,
  notifMessage: null,
};
const editSuccess = (state, actions) => {
  const { succssEdit, message } = actions;
  return updateObject(state, {
    succssEdit,
    message,
  });
};
const isLoadSchedulesReducer = (state, actions) =>
  updateObject(state, { loading: true, message: null });

const isLoadEditSchedulesReducer = (state, actions) => {
  return updateObject(state, {
    loadingEdit: true,
    message: null,
    succssEdit: null,
  });
};
const setMessage = (state, actions) =>
  updateObject(state, { message: actions.message });

const endLoadSchedulesReducer = (state, actions) =>
  updateObject(state, { loading: false });

const endLoadEditSchedulesReducer = (state, actions) =>
  updateObject(state, { loadingEdit: null });

const addSechuleReducer = (state, actions) => {
  const { sechudle_id, title, describtion, createDate, outDate } = {
    ...actions.sechudleData,
  };
  const newSchedule = new Scheudle(
    sechudle_id,
    title,
    describtion,
    createDate,
    outDate
  );
  const updatedSchedules = [newSchedule, ...state.schedules];

  return {
    ...state,
    schedules: updatedSchedules,
  };
};
const getAllSechudleReducer = (state, actions) => {
  const startListInDb = [...actions.listSchedule].reverse().map((sch, i) => {
    const { _id, title, description, outDate, status } = sch;
    return new Scheudle(_id, title, description, null, outDate, status);
  });
  return {
    ...state,
    schedules: startListInDb,
  };
};
const deleteScheduleReducer = (state, actions) => {
  const { scheudle_id } = actions;
  const { schedules } = state;

  const updatedSchedules = [...schedules].filter(
    (sch) => sch.id !== scheudle_id
  );

  return {
    ...state,
    schedules: updatedSchedules,
  };
};

const updateScheduleReducer = (state, actions) => {
  const {
    _id,
    title,
    description,
    createDate,
    outDate,
    status,
  } = actions.schedule;

  const updatedSchedules = [...state.schedules].map((item) => {
    if (item.id === _id)
      return new Scheudle(_id, title, description, createDate, outDate, status);

    return item;
  });

  return {
    ...state,
    schedules: updatedSchedules,
  };
};
const updateIsDoneScheduleReducer = (state, actions) => {
  const { _id, title, description, outDate, status } = actions.schedule;
  let newSchedule = new Scheudle(
    _id,
    title,
    description,
    null,
    outDate,
    status
  );

  const updatedSchedules = [...state.schedules].map((item) => {
    if (item.id === _id) return newSchedule;

    return item;
  });

  let vSch = null;
  if (state.viewSchedule) {
    vSch = newSchedule;
    vSch.createDate = state.viewSchedule.createDate;
  }

  return {
    ...state,
    schedules: updatedSchedules,
    viewSchedule: vSch,
  };
};
const singleSechudleReducer = (state, actions) => {
  const { _id, title, description, outDate, status } = actions.schedule;
  const singSch = new Scheudle(_id, title, description, null, outDate, status);
  return {
    ...state,
    single: singSch,
  };
};
const emptySechudleReducer = (state, actions) => {
  return {
    ...state,
    single: null,
  };
};
const viewScheduleReducer = (state, actions) => {
  const schedule = new Scheudle(
    actions.schedule._id,
    actions.schedule.title,
    actions.schedule.description,
    actions.schedule.createdAt,
    actions.schedule.outDate,
    actions.schedule.status
  );

  return {
    ...state,
    viewSchedule: schedule,
  };
};
const emptyViewScheduleReducer = (state, actions) => {
  return {
    ...state,
    viewSchedule: null,
  };
};
const emptyMessage = (state, actions) => {
  return updateObject(state, { message: null });
};
export default (state = initialState, actions) => {
  switch (actions.type) {
    case ADD_SECHUDLE:
      return addSechuleReducer(state, actions);
    case UPDATE_SECHUDLE:
      return updateScheduleReducer(state, actions);
    case UPDATE_ISDONE_SECHUDLE:
      return updateIsDoneScheduleReducer(state, actions);
    case DELETE_SECHUDLE:
      return deleteScheduleReducer(state, actions);
    case GET_ALL_SECHUDLE:
      return getAllSechudleReducer(state, actions);
    case SINGLE_SECHUDLE:
      return singleSechudleReducer(state, actions);
    case EMPTY_SINGLE_SCHEDULE:
      return emptySechudleReducer(state, actions);
    case VIEW_SECHUDLE:
      return viewScheduleReducer(state, actions);
    case EMPTY_VIEW_SCHEDULE:
      return emptyViewScheduleReducer(state, actions);
    case START_LOAD_SCHEDULE:
      return isLoadSchedulesReducer(state, actions);
    case START_LOAD_EDIT_SCHEDULE:
      return isLoadEditSchedulesReducer(state, actions);
    case FINISHED_LOAD_SCHEDULE:
      return endLoadSchedulesReducer(state, actions);
    case FINISHED_LOAD_EDIT_SCHEDULE:
      return endLoadEditSchedulesReducer(state, actions);
    case EDIT_SCHEDULE:
      return editSuccess(state, actions);
    case SET_MESSAGE_SCHEDULE:
      return setMessage(state, actions);
    case EMPTY_MESSAGE:
      return emptyMessage(state, actions);
  }
  return state;
};
