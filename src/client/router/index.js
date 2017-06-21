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
    },
    {
      path: '/label/:labelName',
      name: 'Label',
      component: Notes,
    },
    {
      path: '/',
      redirect: '/notes',
    },
  ],
});
