import {
    DatePicker,
    Dialog,
    Menu,
    Form,
    FormItem,
    MenuItem,
    Message,
    MessageBox,
    Option,
    Pagination,
    Select,
    Submenu,
    Table,
    TableColumn,
    Tabs,
    TabPane,
    Upload,
    Tooltip,
    Progress
} from 'element-ui';

const elementUI = [
    DatePicker,
    Dialog,
    Menu,
    Form,
    FormItem,
    MenuItem,
    Message,
    MessageBox,
    Option,
    Pagination,
    Select,
    Submenu,
    Table,
    TableColumn,
    Tabs,
    TabPane,
    Upload,
    Tooltip,
    Progress
];

const install = Vue => {
    if (install.installed) {
        return;
    }

    elementUI.map(element => Vue.component(element.name, element));
}

(typeof window !== 'undefined' && window.Vue) && install(window.Vue);

export default {
    DatePicker,
    Dialog,
    Menu,
    MenuItem,
    Message,
    MessageBox,
    Option,
    Pagination,
    Select,
    Submenu,
    Table,
    TableColumn,
    Tabs,
    Form,
    FormItem,
    TabPane,
    Progress,
    install,
    Upload,
    Tooltip,
    install
}