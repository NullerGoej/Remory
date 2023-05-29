export class TaskDone {
    timeStamp?: Date = new Date(); // 2023-05-16T11:01:12.000Z
    task_id: number = 0;

    constructor(id: number, time?: Date) { 
       this.timeStamp = time;
       this.task_id = id;      
    }
}