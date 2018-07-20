/**
 * Author: Alex(https://github.com/zlalex);
 * ConContact: zhouliang1006@126.com
 * (c) 2017 - 2018 by Nanjing 
 */
import alInput from './al-input';
import alTitle from './al-title';
import alButton from './al-button';
import alSearchGroup from './al-search-group';
import alTabsGroup from './al-tabs-group';
import alTabsPane from './al-tabs-pane';
import alTableGroup from './al-table-group';
import alCrumbsTitle from './al-crumbs-title';
import alFormItem from './al-form-item';
import alFormWrap from './al-form-wrap';

const themes = [
    alInput,
    alTitle,
    alButton,
    alSearchGroup,
    alTabsGroup,
    alTabsPane,
    alTableGroup,
    alCrumbsTitle,
    alFormItem,
    alFormWrap
]

function install(Vue) {
    if (install.installed) {
        return
    }

    themes.map(theme => Vue.component(theme.name, theme));
}

(typeof window !== 'undefined' && window.Vue) && install(window.Vue);

export default {
    install,
    themes
}