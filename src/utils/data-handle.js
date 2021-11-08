/**
 * Created by yangliuan
 */

/**
 * 返回树状菜单的pid
 * @param {array} tree
 * @returns {array}
 */
export function getChildrenPids(tree) {
  var pids = []
  tree.forEach(function(item, index) {
    if (item.hasOwnProperty('children')) {
      pids.push(item.id)
      item.children.forEach(function(sub_item, sub_index) {
        if (sub_item.hasOwnProperty('children')) {
          pids.push(sub_item.id)
          sub_item.children.forEach(function(ssub_item, ssub_index) {
            if (ssub_item.hasOwnProperty('children')) {
              pids.push(ssub_item.id)
            }
          })
        }
      })
    }
  })
  return pids
}

/**
 * 求两个数组交集
 * @param {array} arr1
 * @param {array} arr2
 * @returns array
 */
export function arrayDiff(arr1, arr2) {
  var diff = []
  var tmp = arr2
  arr1.forEach(function(val1, i) {
    if (arr2.indexOf(val1) < 0) {
      diff.push(val1)
    } else {
      tmp.splice(tmp.indexOf(val1), 1)
    }
  })
  return diff.concat(tmp)
}
