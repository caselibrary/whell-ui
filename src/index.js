import VirtulScroll from '../packages/virtual-scroll';
import WhellSelect from '../packages/whell-select';
import WhellInput from '../packages/whell-input';
import WhellPopur from '../packages/whell-popur';
import WhellOption from '../packages/whell-option';
import WhellTree from '../packages/whell-tree';
import WhellCascader from '../packages/whell-cascader';
import WhellTable from '../packages/whell-table';
import WhellTableColumn from '../packages/whell-table-colum';

import "./utils/iconfont/iconfont.css"
const components = {
    VirtulScroll,
    WhellSelect,
    WhellInput,
    WhellPopur,
    WhellOption,
    WhellTree,
    WhellCascader,
    WhellTable,
    WhellTableColumn
}

const WhellUI = {
    install(Vue) {
        Object.values(components).forEach(component => {
            Vue.component(component.name, component);
        });
    },
    ...components
}


export default WhellUI
