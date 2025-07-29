import Loading from '@/utils/loading/Loading'
import ReactDom from 'react-dom/client'

let count = 0
export const showLoading = () => {
  count++
  if (count === 1) {
    //第一种方式加载loading，动态创建一个div元素，设置id为loading
    //然后在页面加载时显示loading，等页面加载完成后再移除这个
    const loading = document.createElement('div')
    loading.setAttribute('id', 'loading')
    document.body.appendChild(loading)
    ReactDom.createRoot(loading!).render(<Loading />)
    console.log('loading', loading)
  }
}

export const hideLoading = () => {
  if (count < 0) {
    return
  }
  count--
  if (count === 0) {
    // 安全删除元素 ，y
    const element = document.getElementById('loading')
    if (element && element.parentNode === document.body) {
      document.body.removeChild(element)
      console.log('Loading removed successfully')
    }
  }
}
