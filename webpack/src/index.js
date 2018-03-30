import styles from './styles.css';
import A from './common';
import rambda from 'ramda';
import moduleA from './moduleA';

const f = () => '-=mIracLe=-';

document.addEventListener('DOMContentLoaded', () => {
    moduleA();
    document.querySelector('body').insertAdjacentHTML('beforeend', `<h1>${f()}</h1>`)
});
