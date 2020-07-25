/* 
    React 中的高阶组件就是 装饰器模式的实践

    HOC : 高阶组件就是一个函数，接受一个组件为参数，返回一个新的组件
*/

import React, {Component} from 'react'


// 把传入的组件放进一个由红色边框的容器中
const BorderHoc = WrappedComponent => class extends Component {
    reder() {
        return <div style={{ border:"solid 1px red"}}>
            <WrappedComponent/>
        </div>
    }
}

export default BorderHoc;


// ========================= 用BorderHoc装饰组件 ======================================== //

/* 
    ES7 装饰器语法
*/

import React, {Component} from 'react'
import BorderHoc from './BorderHoc'

@BorderHoc
class TargetComponent extends React.Component {
    render() {
        // 目标组件的业务逻辑
    }
}

export default TargetComponent