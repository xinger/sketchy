import Vue from 'vue';
import VueRouter from 'vue-router';

const MainWindow = () => import('../views/MainWindow');
const Sketch = () => import('../views/Sketch');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/main',
  },
  /* Main window routes */
  {
    path: '/main',
    component: MainWindow,
    children: [
      {
        path: '',
        component: Sketch,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
