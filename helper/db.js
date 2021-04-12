// import { openDatabase } from "react-native-sqlite-storage";
import * as SQLite from "expo-sqlite";
import {
  DELETE_SECHUDLE_COMMAND,
  FETCHED_SCHEDULE_COMMAND,
  INIT_SECHUDLE_COMMAND,
  INSERT_SECHUDLE_COMMAND,
  UPDATE_ISNODE_SECHUDLE_COMMAND,
  UPDATE_SECHUDLE_COMMAND,
  VIEW_SECHUDLE_COMMAND,
} from "./dbCommands";

var db = SQLite.openDatabase("LocalDb.db");

export const init = () => {
  const promise = new Promise((resolve, reject) =>
    db.transaction((tx) =>
      tx.executeSql(
        INIT_SECHUDLE_COMMAND,
        [],
        () => resolve(),
        (_, err) => reject(err)
      )
    )
  );
  return promise;
};

export const fetchedSechudles = () => {
  const promise = new Promise((resolve, reject) =>
    db.transaction((tx) =>
      tx.executeSql(
        FETCHED_SCHEDULE_COMMAND,
        [],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      )
    )
  );

  return promise;
};

export const insertSechule = (title, describtion, createDate, outDate) => {
  const promis = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        INSERT_SECHUDLE_COMMAND,
        [title, describtion, createDate, outDate],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });

  return promis;
};

export const updateIsDoneSechule = (id, isDone) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        UPDATE_ISNODE_SECHUDLE_COMMAND,
        [isDone ? 1 : 0, id],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });

  return promise;
};
export const updateSechule = (id, title, describtion, outDate, isDone) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        UPDATE_SECHUDLE_COMMAND,
        [title, describtion, outDate, isDone ? 1 : 0, id],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};
export const deleteSechule = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        DELETE_SECHUDLE_COMMAND,
        [id],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const viewSchedule = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        VIEW_SECHUDLE_COMMAND,
        [id],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });

  return promise;
};
