export default {
    state: {
        current: '/',
        panes: []
    },

    actions: {
        pushPane(context, value) {
            /**
             * @param context {Vuex Store Object}: current store;
             * @param value {Object}: current arguments;
             */

            let panes = context.state.panes,
                len = panes.length,
                flag = true;

            let temp = {
                label: value.menu_name || value.label,
                name: value.url || value.name
            }

            while (len--) {
                panes[len].name === temp.name && (flag = false);
            }

            flag ? context.commit('pushPane', temp) : context.commit('pushPane', temp.name);
        }
    },

    mutations: {
        pushPane(state, value) {
            /**
             * @param state {Vuex Store State}: current store state;
             * @param value {String, Object}: tabs current value
             */

            switch (typeof value) {
                case 'string':
                    state.current = value;
                    break;
                case 'object':
                    if (value.name) {
                        state.current = value.name;
                        state.panes.push(value);
                    }
                    break;
                default:
                    throw ('Error by current!')
            }
        }
    }
}