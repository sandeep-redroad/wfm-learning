const SidebarMenu = {
    navMain: [
        {
            title: 'Dashboard',
            url: '/dashboard',
            items: [],
        },
        {
            title: 'Projects',
            url: '/projects',
            items: [],
        },
        {
            title: 'Daily Work Log',
            url: '/daily-work-log',
            items: [],
        },
        {
            title: 'Invoices',
            url: '/invoices',
            items: [],
        },
      
        {
            title: 'Bulk Upload',
            url: '/bulk-upload',
            items: [],
        },
        {
            title: 'Clients',
            url: 'clients',
            items: [],
        },
        {
            title: 'Master Settings',
            url: '/master-settings',
            items: [
                {
                    title: 'Processes',
                    url: '/master-settings/processes',
                    items: [],
                },
                {
                    title: 'Departments',
                    url: '/master-settings/departments',
                    items: [],
                },
                {
                    title: 'Billing Types',
                    url: '/master-settings/billing',
                    items: [],
                },
                {
                    title: 'Employee Mapped',
                    url: '/master-settings/employee-mapped',
                    items: [],
                },
            ],
        },
    ],
}

export default SidebarMenu;