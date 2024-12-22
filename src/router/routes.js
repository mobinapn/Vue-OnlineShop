import MainLayout from 'layouts/MainLayout.vue'; 
import HomePage from 'pages/HomePage.vue'; 
import ProductManagment from 'pages/ProductManagment.vue'; 
import ProductDetail from 'pages/ProductDetail.vue'; 

const routes = [
  {
    path: '/', 
    component: MainLayout, 
    children: [
      { 
        path: '',
        component: HomePage ,
        name : 'HomePage'
      },
      { 
        path: 'products', 
        component: ProductManagment, 
        name: 'ProductManagment' 
      },
      {
        path: 'product/:id', 
        component: ProductDetail,
        name: 'ProductDetail',
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
