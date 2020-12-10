export default {
    data() {
        return {

        }
    },
    computed: {
        selectData() {
            let arr = []
            for (var i = 0; i < 2000; i++) {
                arr.push({
                    value: '选项' + i,
                    label: '黄金港' + i
                })
            }
            return arr
        },
        cascaderData() {
            let arr = []
            for (var i = 0; i < 2; i++) {
                arr.push({
                    label: '一级' + i,
                    value: i + '',
                    children: []
                })
                for (var k = 0; k < 2; k++) {
                    arr[i].children.push({
                        label: '二级' + k,
                        value: i + '-' + k,
                        children: []
                    })
                    for (var s = 0; s < 2; s++) {
                        arr[i].children[k].children.push({
                            label: '三级' + s,
                            value: i + '-' + k + '-' + s,
                            children: []
                        })

                    }

                }

            }
            return arr
        },
        tableData() {
            let arr = []
            for (var i = 0; i < 10; i++) {
                arr.push(
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }
                )
                // for (var k = 0; k < 30; k++) {
                //     arr[i].children.push({
                //         label: '二级' + k,
                //         id: i + '-' + k,
                //         children: []
                //     })
                //     for (var s = 0; s < 2; s++) {
                //         arr[i].children[k].children.push({
                //             label: '三级' + s,
                //             id: i + '-' + k + '-' + s,
                //             children: []
                //         })

                //     }

                // }

            }
            return arr

        },
        treeData() {
            let arr = []
            for (var i = 0; i < 500; i++) {
                arr.push({
                    label: '一级' + i,
                    id: i + '',
                    children: []
                })
                for (var k = 0; k < 10; k++) {
                    arr[i].children.push({
                        label: '二级' + k,
                        id: i + '-' + k,
                        children: []
                    })
                    // for (var s = 0; s < 10; s++) {
                    //     arr[i].children[k].children.push({
                    //         label: '三级' + s,
                    //         id: i + '-' + k + '-' + s,
                    //         children: []
                    //     })

                    // }

                }

            }
            return arr
        }
    }
}