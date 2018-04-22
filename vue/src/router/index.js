import Vue from 'vue';
import Router from 'vue-router';
import NotesContainer from '../components/NotesContainer';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NotesContainer',
      component: NotesContainer
    }
  ]
});
