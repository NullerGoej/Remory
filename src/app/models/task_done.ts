export class TaskDone {
    timeStamp: string = "2023-05-16T11:01:12.000Z";
    task_id: number = 0;

    constructor(time: string, id: number) {
       this.timeStamp = time;
       this.task_id = id;      
    }
}