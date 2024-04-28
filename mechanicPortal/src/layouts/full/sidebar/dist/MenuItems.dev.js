"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _icons = require("@tabler/icons");

var _List = _interopRequireDefault(require("@mui/icons-material/List"));

var _Preview = _interopRequireDefault(require("@mui/icons-material/Preview"));

var _ChatBubbleOutline = _interopRequireDefault(require("@mui/icons-material/ChatBubbleOutline"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Menuitems = [{
  navlabel: true,
  subheader: 'Home'
}, {
  id: (0, _lodash.uniqueId)(),
  title: 'Dashboard',
  icon: _icons.IconLayoutDashboard,
  href: '/dashboard'
}, {
  navlabel: true,
  subheader: 'User Management'
}, {
  id: (0, _lodash.uniqueId)(),
  title: 'List of Users',
  icon: _List["default"],
  href: '/ui/typography'
}, {
  id: (0, _lodash.uniqueId)(),
  title: 'View/Delete Users',
  icon: _Preview["default"],
  href: '/ui/shadow'
}, {
  navlabel: true,
  subheader: 'Mechanic Managment'
}, {
  id: (0, _lodash.uniqueId)(),
  title: 'List of Mechanincs',
  icon: _List["default"],
  href: '/auth/login'
}, {
  id: (0, _lodash.uniqueId)(),
  title: 'Add/View/Delete Mechanic',
  icon: _icons.IconUserPlus,
  href: '/auth/register'
}, {
  navlabel: true,
  subheader: 'Customer Support'
}, {
  id: (0, _lodash.uniqueId)(),
  title: 'Chat',
  icon: _ChatBubbleOutline["default"],
  href: '/icons'
} // {
//   id: uniqueId(),
//   title: 'Sample Page',
//   icon: IconAperture,
//   href: '/sample-page',
// },
];
var _default = Menuitems;
exports["default"] = _default;