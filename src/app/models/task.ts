export class Task {
    task_id: number = 0;
    title: string = "";
    description: string = "";
    time?: Date = new Date();
    start_date?: Date = new Date();
    repeat: string = "";
    reminder: number = 0;
    gps?: string = undefined;
    user_id: number = 0;
    category_id: number = 0;
}