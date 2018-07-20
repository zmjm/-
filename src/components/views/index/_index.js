export default {
    name: 'index',
    activated() {
        let currentPath = this.$router.history.current.path;

        currentPath === '/' && this.$store.dispatch('pushPane', {
            text: '主页',
            value: '/'
        });
    }
}