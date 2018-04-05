enum TaskType {
  Private = 'private',
  Work = 'work',
  Common = 'common'
}

interface Task extends Object {
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

const toTimeString = (hours: number, minutes: number) => `${hours} hours ${minutes} minutes`;

const minutesToTimeString = (minutes: number) =>
  toTimeString(toInt(minutes / 60), toInt(minutes % 60));

const buildTaskString = (name: string, duration: string) =>
    `Total duration of '${name}' is ${duration}`;

const taskToString = (task: Task) => buildTaskString(task.name, minutesToTimeString(task.duration));

const hasType = (type: TaskType) => (task: Task) => task.type === type;

const hasTypesWorkPrivate = (task: Task) =>
  hasType(TaskType.Work)(task) || hasType(TaskType.Private)(task);

const logTask = (task: Task) => console.log(taskToString(task));

tasks.filter(hasTypesWorkPrivate)
  .map(logTask);
