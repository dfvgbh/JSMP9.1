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

const toInt = (number: number) => ~~number;

const taskToString = (task: Task) => {
  const { name, duration } = task;
  const hours = toInt(duration / 60);
  const minutes = toInt(duration % 60);
  return `Total duration of '${name}' is ${hours} hours ${minutes} minutes`;
};

const hasType = R.curry(
    (type: TaskType, task: Task) => task.type === type
);

const hasTypesWorkPrivate = R.either(
    hasType(TaskType.Work),
    hasType(TaskType.Private)
);

const workPrivateTasks = R.filter(hasTypesWorkPrivate, tasks);

const taskDurationReducer = (accum: Task, task: Task): Task => R.evolve(
  { duration: R.add(accum.duration || 0) },
  task
);

R.pipe(
  R.groupBy(({ name, type }: Task) => `${name}_${type}`),
  R.values,
  R.map(
    R.pipe(
      R.reduce(taskDurationReducer, {}),
      taskToString,
      console.log
    )
  )
)(workPrivateTasks);
