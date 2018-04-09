enum TaskType {
  Private = 'private',
  Work = 'work',
  Common = 'common'
}

interface Task {
  name: string;
  duration: number;
  type: TaskType;
}

const tasks: Task[] =  [
  { name: 'Prepare presentation', duration: 120, type: TaskType.Work },
  { name: 'Work out', duration: 60, type: TaskType.Private },
  { name: 'Plan year 2018', duration: 180, type: TaskType.Common },
  { name: 'Work out', duration: 60, type: TaskType.Private },
  { name: 'Watch a movie', duration: 120, type: TaskType.Private },
  { name: 'Work out', duration: 60, type: TaskType.Private },
  { name: 'Fill time journal', duration: 10, type: TaskType.Work }
];

const toInt = (number: number) => ~~number;

const taskToString = (task: Task) => {
    const { name, duration } = task;
    const hours = toInt(duration / 60);
    const minutes = toInt(duration % 60);
    return `Total duration of '${name}' is ${hours} hours ${minutes} minutes`;
};

const hasType = (type: TaskType) => (task: Task) => task.type === type;

const hasTypesWorkPrivate = (task: Task) =>
  hasType(TaskType.Work)(task) || hasType(TaskType.Private)(task);

const logTask = (task: Task) => console.log(taskToString(task));

const groupTasksReducer = (tasks: Task[], task: Task) => {
    const groupedTasks = [...tasks];
    const targetIndex = groupedTasks.findIndex(
        ({ name, type }: Task) => task.name === name && task.type === type);

    targetIndex === -1
        ? groupedTasks.push(task)
        : groupedTasks[targetIndex] = {
            ...groupedTasks[targetIndex],
            duration: groupedTasks[targetIndex].duration + task.duration
        };

    return groupedTasks;
};

tasks
  .filter(hasTypesWorkPrivate)
  .reduce(groupTasksReducer, [])
  .map(logTask);
