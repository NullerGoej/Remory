export interface Task {
    task_id: number;
    title: string;
    description: string;
<<<<<<< HEAD
    time: string;
    start_date: string;
=======
    time: Date;
    start_date: Date;
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95
    repeat: string;
    reminder: number;
    gps: string;
    user_id: number;
    category_id: number;
<<<<<<< HEAD
=======
    checked: boolean;
    task_dones: [
        {
            task_done_id: number,
            timestamp: Date,
            task_id: number
        }
    ]
>>>>>>> a5a0c275f02acccf8bba53b31c1d4fcbc9a31a95
}
