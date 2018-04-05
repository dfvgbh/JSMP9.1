import * as R from 'ramda';

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

const hasType = (type: TaskType) => (task: Task) => task.type === type;

const toInt = (number: number) => ~~number;

const toTimeString = (hours: number, minutes: number) => `${hours} hours ${minutes} minutes`;

const minutesToTimeString = (minutes: number) =>
  toTimeString(toInt(minutes / 60), toInt(minutes % 60));

const buildTaskString = (name: string, duration: string) =>
  `Total duration of '${name}' is ${duration}`;

const taskToString = (task: Task) => buildTaskString(task.name, minutesToTimeString(task.duration));

const log = (string: string) => console.log(string);


const hasTypesWorkPrivate = R.either(hasType(TaskType.Work), hasType(TaskType.Private));
const workPrivateTasks = R.filter(hasTypesWorkPrivate, tasks);
R.map(R.compose(log, taskToString), workPrivateTasks);