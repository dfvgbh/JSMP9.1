import Vue from 'vue';
import Router from 'vue-router';
import HomePageContainer from '../components/HomePageContainer';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePageContainer
    }
  ]
});
