export default {
    name: "login",
    data() {
        return {
            tabsActive: "login",
            panes: [{
                    text: '登录',
                    value: 'login'
                },
                {
                    text: 'APP',
                    value: 'app'
                }
            ],
            loginForm: {
                account: "",
                password: ""
            }
        }
    },
    created() {
        this.clearSession();
    },
    activated() {
        this.clearSession();
    },
    methods: {
        clearSession() {
            sessionStorage.removeItem('user_info');
            sessionStorage.removeItem('menu_list');
        },
        login() {
            let that = this,
                sendData = that.loginForm;

            if (!that.$notEmpty(sendData)) {
                return false
            }

            that.fetch({
                url: globalApi.login,
                data: sendData
            }, true).then(res => {
                let data = res.data;
                let user_info = {
                        user_name: data.data.empName,
                        user_id: data.data.empNo
                    },
                    menu_list = that.recursionMenu(data.menuList);

                sessionStorage.setItem("user_info", JSON.stringify(user_info));
                sessionStorage.setItem("menu_list", JSON.stringify(menu_list));
                that.$goRoute('/');
            })
        },

        recursionMenu(menu_list, menu, index) {
            let res = menu || [],
                len = menu_list.length,
                i;

            for (i = 0; i < len; i++) {
                let el = menu_list[i],
                    ret = {};

                ret.menu_name = el.menuName;
                ret.index = (index ? index + "-" : "") + String(i);
                ret.icon = el.icon;
                el.url ? ret.url = el.url : "";
                if (el.menuList.length) {
                    ret.child = [];
                    this.recursionMenu(el.menuList, ret.child, ret.index)
                }
                res.push(ret);
            }
            return res
        }
    }
}