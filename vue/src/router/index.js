import Vue from 'vue';
import Router from 'vue-router';
import HomePageContainer from '../components/HomePageContainer';
import ArchivePageContainer from '../components/ArchivePageContainer';
import EditPageContainer from '../components/EditPageContainer';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomePageContainer
    },
    {
      path: '/note/:id',
      component: EditPageContainer
    },
    {
      path: '/archive',
      component: ArchivePageContainer
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
