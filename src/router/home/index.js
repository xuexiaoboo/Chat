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
        },
        {
            path: '/watch',
            component: () =>
                import ('@/components/Watch')
        },
        {
            path: '/try',
            component: () =>
                import ('@/components/Try')
        }
    ]
}