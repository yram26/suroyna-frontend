import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homes',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Contact.vue'),
    },
    {
      path: '/latestposts',
      name: 'latestposts',
      component: () => import('../views/LatestPosts.vue'),
    },
    {
      path: '/mostviewed',
      name: 'mostviewed',
      component: () => import('../views/MostViewed.vue'),
    },
    {
      path: '/destinations',
      name: 'destinations',
      component: () => import('../views/Destinations.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue'),
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('../views/Posts.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/posts/:id',
      name: 'post-detail',
      component: () => import('../components/PostDetail.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/create-post',
      name: 'create-post',
      component: () => import('../components/Create.vue'),
      meta: { requiresAuth: true }, // Protect this route
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
      meta: { requiresAuth: true }, // Protect this route
    },
    {
      path: '/destination/:destination',
      name: 'destination-posts',
      component: () => import('../components/Destinationposts.vue')
    },
    {
      path: '/dashboard/',
      name: 'dashboard',
      component: () => import('../views/admin/Dashboard.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }, // Protect this route for Admins
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../views/admin/Home.vue'), // Child component
        },
        {
          path: 'users',
          name: 'dashboard-users',
          component: () => import('../views/admin/Users.vue'), // Child component
        },
        {
          path: 'posts',
          name: 'dashboard-posts',
          component: () => import('../views/admin/Posts.vue'), // Child component
        },
        {
          path: 'comments',
          name: 'dashboard-comments',
          component: () => import('../views/admin/Comments.vue'), // Child component
        },
        {
          path: 'categories',
          name: 'dashboard-categories',
          component: () => import('../views/admin/Categories.vue'), // Child component
        },
        {
          path: 'destinations',
          name: 'dashboard-destinations',
          component: () => import('../views/admin/Destinations.vue'), // Child component
        },
        {
          path: 'settings',
          name: 'dashboard-settings',
          component: () => import('../views/admin/Settings.vue'), // Child component
        },
      ],
    },
  ],
});


// Navigation guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in
  const userType = localStorage.getItem('userType'); // Get the user type from local storage

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'homes' }); // Redirect to login if not authenticated
  } else if (to.meta.requiresAdmin && userType !== 'Admin') {
    next({ name: 'homes' }); // Redirect to home if user is not an Admin
  } else {
    next(); // Proceed to the route
  }
});


export default router;