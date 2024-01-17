import { createRouter, createWebHistory } from 'vue-router';
import { getItemFromStorage } from '../services/storage.js';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
      };
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/platform',
      name: 'platform',
      component: () => import('../views/PlatformView.vue'),
      redirect: '/platform/products',
      children: [
        {
          path: 'products',
          name: 'platform-products',
          component: () => import('../components/platform-page/modules/ModulesPage.vue'),
        },
        // {
        //   path: 'profile',
        //   name: 'platform-user-profile',
        //   component: () => import('../components/platform-page/user-profile/UserProfile.vue'),
        // },
        // {
        //   path: 'account',
        //   name: 'platform-user-account',
        //   component: () => import('../components/platform-page/user-account/UserAccount.vue'),
        // },
      ],
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      redirect: '/admin/content',
      children: [
        {
          path: 'configuration',
          name: 'admin-configuration',
          component: () => import('../components/admin-page/configuration/TheConfiguration.vue'),
          redirect: '/admin/configuration/appearance',
          children: [
            {
              path: 'appearance',
              name: 'admin-configuration-appearance',
              component: () =>
                import('../components/admin-page/configuration/appearance/AppearanceTab.vue'),
            },
            {
              path: 'templates',
              name: 'admin-configuration-templates',
              component: () =>
                import('../components/admin-page/configuration/templates/TemplatesTab.vue'),
            },
          ],
        },
        {
          path: 'content',
          name: 'admin-content',
          component: () => import('../components/admin-page/content/TheContent.vue'),
          redirect: '/admin/content/products',
          children: [
            {
              path: 'products',
              name: 'admin-content-products',
              component: () => import('../components/admin-page/content/products/ProductTab.vue'),
            },
            {
              path: 'modules',
              name: 'admin-content-modules',
              component: () => import('../components/admin-page/content/modules/ModuleTab.vue'),
            },
            {
              path: 'resources',
              name: 'admin-content-resources',
              component: () => import('../components/admin-page/content/resources/ResourceTab.vue'),
            },
          ],
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('../components/admin-page/users/UsersTab.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
});

const isAdminRoute = (routeName) => {
  const routes = [
    'admin',
    'admin-configuration',
    'admin-configuration-appearance',
    'admin-configuration-templates',
    'admin-content',
    'admin-content-products',
    'admin-content-modules',
    'admin-content-resources',
  ];
  return routes.find((route) => route === routeName);
};

router.beforeEach((to, from, next) => {
  const storedUser = getItemFromStorage('dotpoint_user') || {};
  const isAuthenticated = storedUser && storedUser.token;
  const isAdmin = storedUser && storedUser.type === 'ADMIN';

  if (to.name !== 'home' && !isAuthenticated) next({ name: 'home' });
  else if (to.name === 'home' && isAuthenticated) next({ name: 'platform' });
  else if (isAdminRoute(to.name) && isAuthenticated && !isAdmin) next({ name: 'platform' });
  else if (isAdminRoute(to.name) && !isAuthenticated && !isAdmin) next({ name: 'home' });
  else next();
});

export default router;
