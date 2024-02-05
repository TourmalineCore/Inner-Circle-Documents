import { ReactComponent as IconProfile } from '../../assets/icons/icon-profile.svg';
import { ReactComponent as IconProfileActive } from '../../assets/icons/icon-profile-active.svg';
import DocumentsPage from './DocumentsPage';

export const documentsRoutes = [
  {
    path: '/',
    breadcrumb: 'Documents',
    Component: DocumentsPage,
  },
];

export const documentsSidebarRoutes = [
  {
    path: '/documents',
    label: 'Documents',
    icon: <IconProfile />,
    iconActive: <IconProfileActive />,
  },
];
