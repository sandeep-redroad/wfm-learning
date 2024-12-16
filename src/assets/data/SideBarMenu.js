const SidebarMenu = {
    navMain: [
        {
            title: 'Dashboard',
            url: '/',
            items: [],
        },
        {
            title: 'Projects',
            url: '/projects',
            items: [],
        },
        {
            title: 'Daily Work',
            url: '/daily-work',
            items: [],
        },
        {
            title: 'Invoices',
            url: '/invoices',
            items: [],
        },
        {
            title: 'Master Settings',
            url: '/master-settings',
            items: [
                {
                    title: 'Project Master',
                    url: '/master-settings/project-master',
                    items: [],
                },
                {
                    title: 'Processes',
                    url: '/master-settings/processes',
                    items: [],
                },
                {
                    title: 'Clients',
                    url: '/master-settings/clients',
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
            ],
        },
    ],
}

export default SidebarMenu;