import axios from "axios";
import { store } from "../store";
import * as actionsType from "./actionsType";
import { API_URL_SCHEDULES, API_URL_SCHEDULES_IS_DONE } from "./api";
let headers = {};

const setHeaders = () => {
  const states = store.getState();
  headers = {
    token: states.auth.token,
  };
};

const load = () => {
  setHeaders();
  return { type: actionsType.START_LOAD_SCHEDULE };
};
const loadEdit = () => {
  setHeaders();
  return { type: actionsType.START_LOAD_EDIT_SCHEDULE };
};

const finished = () => {
  return { type: actionsType.FINISHED_LOAD_SCHEDULE };
};

const finishedEdit = () => {
  return { type: actionsType.FINISHED_LOAD_EDIT_SCHEDULE };
};

const editSuccess = (isUpdate) => {
  let message = isUpdate ?
  "برنامه شما با موفقیت ثبت شد"
   :
   "برنامه بروز رسانی شد";
  return {
    type: actionsType.EDIT_SCHEDULE,
    succssEdit: true,
    message
  };
};
const editFaild = () => {
  return {
    type: actionsType.EDIT_SCHEDULE,
    succssEdit: false,
    message: "خطا هنگام اجرای عملیات دوباره تلاش کنید",
  };
};
const setAllSchedule = (schedules = []) => {
  if (schedules.length == 0) {
    store.dispatch(
      setMessageSchedule("داده ای موجود نمیباشد لطفا یک داده اضافه کنید")
    );
  }

  return {
    type: actionsType.GET_ALL_SECHUDLE,
    listSchedule: schedules,
  };
};

const setMessageSchedule = (message) => {
  return {
    type: actionsType.SET_MESSAGE_SCHEDULE,
    message,
  };
};
const updateScheduleAct = (schedule) => {
  return {
    type: actionsType.UPDATE_SECHUDLE,
    schedule: schedule,
  };
};
const updateScheduleActIsDone = (schedule) => {
  return {
    type: actionsType.UPDATE_ISDONE_SECHUDLE,
    schedule: schedule,
  };
};

export const loadAllSchedules = () => {
  return async (dispatch) => {
    try {
      dispatch(load());
      const response = await axios.get(API_URL_SCHEDULES, { headers });

      dispatch(setAllSchedule(response.data.schedules));
    } catch (error) {
      dispatch(
        setMessageSchedule("خطا هنگام فراخوانی برنامه داده ها دوباره تلاش کنید")
      );
    } finally {
      dispatch(finished());
    }
  };
};
export const loadSingleSchedule = (id) => {
  return async (dispatch) => {
    try {
      const url = `${API_URL_SCHEDULES}/${id}`;

      const response = await axios.get(url, { headers });

      dispatch({
        type: actionsType.SINGLE_SECHUDLE,
        schedule: response.data.schedule,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const loadViewSchedule = (id) => {
  return async (dispatch) => {
    try {
      const url = `${API_URL_SCHEDULES}/${id}`;

      const response = await axios.get(url, { headers });
      dispatch({
        type: actionsType.VIEW_SECHUDLE,
        schedule: response.data.schedule,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const addSechule = (title, description, outDate) => {
  return async (dispatch) => {
    try {
      dispatch(loadEdit());
      const scheduleData = { title, description, outDate };

      const response = await axios.post(API_URL_SCHEDULES, scheduleData, {
        headers,
      });

      dispatch(editSuccess());
      dispatch({
        type: actionsType.GET_ALL_SECHUDLE,
        listSchedule: response.data.schedules,
      });
    } catch (error) {
      dispatch(editFaild());
    } finally {
      dispatch(finishedEdit());
    }
  };
};
export const isDoneUpdateSechudle = (id, isDone) => {
  return async (dispatch) => {
    try {
      const url = `${API_URL_SCHEDULES_IS_DONE}${id}`;
      const body = { status: isDone };
      const response = await axios.patch(url, body, { headers });
      await dispatch(updateScheduleActIsDone(response.data.schedule));
    } catch (error) {
    }
  };
};

export const updateSechudle = (id, title, describtion, outDate, isDone) => {
  return async (dispatch) => {
    try {
      dispatch(loadEdit());
      const url = `${API_URL_SCHEDULES}/${id}`;
      const body = {
        title: title,
        description: describtion,
        outDate: outDate,
        status: isDone,
      };
      const response = await axios.patch(url, body, { headers });

      dispatch(editSuccess());
      dispatch(updateScheduleAct(response.data.schedule));
    } catch (error) {
      dispatch(editFaild());
    } finally {
      dispatch(finishedEdit());
    }
  };
};
export const deleteSechudle = (id) => {
  return async (dispatch) => {
    try {
      const url = `${API_URL_SCHEDULES}/${id}`;

      const respone = await axios.delete(url, { headers });

      dispatch(setAllSchedule(respone.data.schedules));
      dispatch(emptyViewSchedule());
    } catch (error) {
      dispatch(setMessageSchedule("هنگام حذف ایتم مشکلی رخ داده است دوباره اقدام کنید"));
    }
  };
};

export const emptySingleSchedule = () => {
  return async (dispatch) => {
    dispatch({
      type: actionsType.EMPTY_SINGLE_SCHEDULE,
    });
  };
};
export const emptyViewSchedule = () => {
  return async (dispatch) => {
    dispatch({
      type: actionsType.EMPTY_VIEW_SCHEDULE,
    });
  };
};
export const viewSchedule = (id) => {
  return async (dispatch) => {
    dispatch({
      type: actionsType.VIEW_SECHUDLE,
      scheudleData: dbResult.rows._array[0],
    });
  };
};
export const clearMessages = () => async (dispatch) => {
    dispatch({
      type:actionsType.EMPTY_MESSAGE
    });
};
