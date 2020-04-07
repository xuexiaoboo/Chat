export default {
    path: '/home',
    component: () =>
        import ('@/views/home'),
    redirect: '/welcome',
    children: [{
            path: '/welcome',
            component: () =>
                import ('@/components/Welcome')
        },
        {
            path: '/game1',
            component: () =>
                import ('@/components/Game1')
        },
        {
            path: '/chat',
            component: () =>
                import ('@/components/Chat')
        }
    ]
}