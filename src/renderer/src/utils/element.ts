import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-input.css'
import 'element-plus/theme-chalk/el-option.css'
import 'element-plus/theme-chalk/el-select.css'

// 按需引入element组件
import {
    ElInput,
    ElOption,
    ElSelect,
} from 'element-plus'

export default function (app) {
  app.use(ElInput)
  app.use(ElSelect)
  app.use(ElOption)
}
