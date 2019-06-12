import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
     home: true,
    data: {
      permission: 'view',
      resource: 'dashboard'
    },
  },
  {
    title: 'Profile',
    icon: 'fas fa-user-circle',
    link: '/pages/dashboard/attestation_page',
    //link: '/pages/profile',
    data: {
      permission: 'view',
      resource: 'profile'
    },
  },
  {
    title: 'Admin Dashboard',
    icon: 'ion-filing',
    children: [
      {
        title: 'Total Application',
        icon: 'ion-filing',
        link: '/pages/admin-dashboard',
        queryParams: {tab: 'total'},
        data: {
          permission: 'view',
          resource: 'adminDashboard'
        },
      },
      {
        title: 'Pending Applications',
        icon: 'ion-filing',
        link: '/pages/admin-dashboard',
        queryParams: {tab: 'pending'},
        data: {
          permission: 'view',
          resource: 'adminDashboard'
        },
      },   
      {
        title: 'Signed Applications',
        icon: 'ion-filing',
        link: '/pages/admin-dashboard',
        queryParams: {tab: 'signed'},
        data: {
          permission: 'view',
          resource: 'adminDashboard'
        },
      },
    ],
    data: {
      permission: 'view',
      resource: 'adminDashboard'
    },
  },
  {
    title: 'Sub-Admin Application',
    icon: 'ion-filing',
    link: '/pages/sub-admin-dashboard',
    data: {
      permission: 'view',
      resource: 'SubAdminDashboard'
    },
  },
  {
    title:'My Applications',
    icon:'fas fa-folder-open',
    link: '/pages/myapplications',
    data: {
      permission: 'view',
      resource: 'myapplications'
    },
  },{
    title:'Download',
    icon:'fas fa-download',
    link: '/pages/download',
    data: {
      permission: 'view',
      resource: 'download'
    },
  },
];
