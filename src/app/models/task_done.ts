export class TaskDone {
<<<<<<< HEAD
    timeStamp: string = "2023-05-16T11:01:12.000Z";
    task_id: number = 0;

    constructor(time: string, id: number) {
=======
    timeStamp?: Date = new Date(); // 2023-05-16T11:01:12.000Z
    task_id: number = 0;

    constructor(id: number, time?: Date) { 
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95
       this.timeStamp = time;
       this.task_id = id;      
    }
}