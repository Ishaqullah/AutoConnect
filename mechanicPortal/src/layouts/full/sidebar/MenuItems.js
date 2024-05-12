import {
   IconLayoutDashboard, IconUserPlus
} from '@tabler/icons';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ReviewsIcon from '@mui/icons-material/Reviews';
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
    subheader: 'Users',
  },
  {
    id: uniqueId(),
    title: 'User Profiles',
    icon: PeopleOutlineIcon,
    href: '/listOfUsers',
  },
  {
    id: uniqueId(),
    title: 'User reviews',
    icon: ReviewsIcon,
    href: '/reviews',
  },
  {
    navlabel: true,
    subheader: 'Profile Managment',
  },
  {
    id: uniqueId(),
    title: 'Update Profile',
    icon: PersonAddAltIcon,
    href: '/profile',
  },
  {
    navlabel: true,
    subheader: 'Appointments',
  },
  {
    id: uniqueId(),
    title: 'Seek for appointments',
    icon: VideoCallIcon ,
    href: '/appointments',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Sample Page',
  //   icon: IconAperture,
  //   href: '/sample-page',
  // },
];

export default Menuitems;
