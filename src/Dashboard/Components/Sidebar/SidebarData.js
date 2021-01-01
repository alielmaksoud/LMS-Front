

 const items = [
  {
    name: 'Admins',
    label: 'Admins',

    items: [
      { name: 'Manage Admins', label: 'Manage Admins',path: '/admin/ManageAdmin' },
      { name: 'New Admin', label: 'New Admin', path: '/admin/NewAdmin' },
    ],
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
    name: 'Attendance',
    label: 'Attendance',
    items: [
      { name: 'Student Attendance', label: 'Student Attendance', path: '/admin/StudentAttence' },
      { name: 'Class Attendance', label: 'Class Attendance', path: '/admin/ClassAttendance' },
    ],
  },
  {
    name: 'Classes & Sections',
    label: 'Classes & Sections',
    items: [
      { name: 'Manage Classes', label: 'Manage Classes', path: '/admin/ManageClasses' },
      { name: 'Manage Sections', label: 'Manage Sections', path: '/admin/ManageSections' },
    ],
  },
]

export default items;