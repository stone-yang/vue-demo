import Vue from 'vue';
import Router from 'vue-router';
import Notes from '@/views/Notes';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/notes',
      name: 'Notes',
      component: Notes,
      meta: {
        themeColor: 'yellow',
      },
    },
    {
      path: '/label/:labelName',
      name: 'Label',
      component: Notes,
      meta: {
        themeColor: 'cerulean',
      },
    },
    {
      path: '/search',
      name: 'Search',
      component: Notes,
      meta: {
        themeColor: 'dark-blue',
      },
    },
    {
      path: '/',
      redirect: '/notes',
    },
  ],
});
