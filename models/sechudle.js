class Scheudle {
  isDone = false;
  constructor(id, title, description, createDate, outDate, isDone) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createDate = createDate;
    this.outDate = outDate;
    this.isDone=isDone;
  }
  setIsdone = (isDone) => (this.isDone = isDone);
}

export default Scheudle;
