export interface Task {
    task_id: number;
    title: string;
    description: string;
    time: Date;
    start_date: Date;
    repeat: string;
    reminder: number;
    gps: string;
    user_id: number;
    category_id: number;
    checked: boolean;
    task_dones: [
        {
            task_done_id: number,
            timestamp: Date,
            task_id: number
        }
    ]
}
