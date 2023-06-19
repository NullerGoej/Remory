export class Task {
    task_id: number = 0;
    title: string = "";
    description: string = "";
<<<<<<< HEAD
    time: string = "";
    start_date: string = "";
    repeat: string = "";
    reminder: number = 0;
    gps: string = "";
    user_id: number = 0;
    category_id: number = 0;
    type: string = "";
=======
    time?: Date = new Date();
    start_date?: Date = new Date();
    repeat: string = "";
    reminder: number = 0;
    gps?: string = undefined;
    user_id: number = 0;
    category_id?: number = 0;
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95
}