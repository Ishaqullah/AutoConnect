import {
   IconLayoutDashboard, IconUserPlus
} from '@tabler/icons';
import ListIcon from '@mui/icons-material/List';
import PreviewIcon from '@mui/icons-material/Preview';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { uniqueId } from 'lodash';


const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'User Management',
  },
  {
    id: uniqueId(),
    title: 'List of Users',
    icon: ListIcon,
    href: '/ui/typography',
  },
  {
    id: uniqueId(),
    title: 'View/Delete Users',
    icon: PreviewIcon,
    href: '/ui/shadow',
  },
  {
    navlabel: true,
    subheader: 'Mechanic Managment',
  },
  {
    id: uniqueId(),
    title: 'List of Mechanincs',
    icon: ListIcon,
    href: '/auth/login',
  },
  {
    id: uniqueId(),
    title: 'Add/View/Delete Mechanic',
    icon: IconUserPlus,
    href: '/auth/register',
  },
  {
    navlabel: true,
    subheader: 'Customer Support',
  },
  {
    id: uniqueId(),
    title: 'Chat',
    icon: ChatBubbleOutlineIcon,
    href: '/icons',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Sample Page',
  //   icon: IconAperture,
  //   href: '/sample-page',
  // },
];

export default Menuitems;
