

 const items = [
  {
    name: 'Reports',
    label: 'Reports',
    path: '/admin/'
  },
  {
    name: 'Students',
    label: 'Students',
    items: [
      { name: 'New Student', label: 'New Student', path: '/admin/NewStudent' },
      { name: 'Manage Students', label: 'Manage Students', path: '/admin/ManageStudents' },
    ],
  },
  {
    name: 'Classes & Sections',
    label: 'Classes & Sections',
    items: [
      { name: 'New Class', label: 'New Class', path: '/admin/NewClass' },
      { name: 'Manage Classes', label: 'Manage Classes', path: '/admin/ManageClasses' },
    ],
  },
  {
    name: 'Admins',
    label: 'Administrators',
    items: [
      { name: 'New Admin', label: 'New Admin', path: '/admin/NewAdmin' },
      { name: 'Manage Admins', label: 'Manage Admins',path: '/admin/ManageAdmin' },
    ],
  },
]

export default items;