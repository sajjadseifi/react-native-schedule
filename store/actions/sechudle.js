import * as scheudleDb from "../../helper/db";
import * as actionsType from "./actionsType";

export const loadAllSechudleData = () => {
  return async (dispatch) => {
    //await real server
    try {
      const dbResult = await scheudleDb.fetchedSechudles();
      // console.log("Load All =>", { dbResult });
      dispatch({
        type: actionsType.GET_ALL_SECHUDLE,
        listSchedule: dbResult.rows._array,
      });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
};
export const loadSingleSchedule = (id) => {
  return async (dispatch) => {
    //await real server
    const response = {
      schedule_id: id,
      title: "title",
      describtion: "describtion",
      createDate: "createDate",
      outDate: "outDate",
      isDone: "isDone",
    };

    if (response.err == "NOT_FOUND") {
      deleteSechudle(id);
      throw new Error("همچین داده ای موجود نمباشد لطفا");
    }

    dispatch({
      type: actionsType.SINGLE_SECHUDLE,
      schedule_id: id,
      title: response.title,
      describtion: response.describtion,
      createDate: response.createDate,
      outDate: response.outDate,
      isDone: response.isDone,
    });
  };
};
export const addSechule = (title, describtion, outDate) => {
  return async (dispatch) => {
    //awat real server
    try {
      const createDate = new Date().toString();
      const dbResult = await scheudleDb.insertSechule(
        title,
        describtion,
        createDate,
        outDate.toString()
      );
      // console.log("Add", { dbResult });
      dispatch({
        type: actionsType.ADD_SECHUDLE,
        sechudleData: {
          sechudle_id: dbResult.insertId,
          title,
          describtion,
          createDate,
          outDate: outDate.toString(),
        },
      });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
};

export const isDoneUpdateSechudle = (id, isDone) => {
  return async (dispatch) => {
    //await real server

    const dbResult = await scheudleDb.updateIsDoneSechule(id, isDone);

    console.log("UPDATE_ISDONE", { dbResult });

    dispatch({
      type: actionsType.UPDATE_ISDONE_SECHUDLE,
      scheudle_id: id,
      isDone: isDone,
    });
  };
};

export const updateSechudle = (id, title, describtion, outDate, isDone) => {
  return async (dispatch) => {
    //awat

    const dbResult = await scheudleDb.updateSechule(
      id,
      title,
      describtion,
      outDate,
      isDone
    );

    // console.log("UPDATE_SCHEDULE", { dbResult });

    dispatch({
      type: actionsType.UPDATE_SECHUDLE,
      id,
      title,
      describtion,
      outDate,
      isDone,
    });
  };
};
export const deleteSechudle = (id) => {
  return async (dispatch) => {
    //awat real server

    const dbResult = await scheudleDb.deleteSechule(id);

    // if(dbResult.rowsAffected ==0){
    //     throw new Error("داده مورد نظر موجود نبوده است");
    // }
    // console.log("DELETE_SECHUDLE_ACTION", { dbResult });

    dispatch({
      type: actionsType.DELETE_SECHUDLE,
      scheudle_id: id,
    });
  };
};

export const emptySingleSchedule = () => {
  return async (dispatch) => {
    console.log("empty");
    dispatch({
      type: actionsType.EMPTY_SINGLE_SCHEDULE,
    });
  };
};
export const emptyViewSchedule = () => {
  return async (dispatch) => {
    console.log("empty ViewSchedule");
    dispatch({
      type: actionsType.EMPTY_VIEW_SCHEDULE,
    });
  };
};
export const viewSchedule = (id) => {
  return async (dispatch) => {
    //await real server
    // console.log("action of VIEW_SECHUDLE");
    const dbResult = await scheudleDb.viewSchedule(id);

    if (dbResult.rows.length == 0) {
      deleteSechudle(id);
      throw new Error("داده ای به این شناسه در سرور موجود نمیباشد");
    }

    dispatch({
      type: actionsType.VIEW_SECHUDLE,
      scheudleData: dbResult.rows._array[0],
    });
  };
};