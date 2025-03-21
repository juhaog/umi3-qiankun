import { addMethod } from "./routeChange"

export const trackPageInfo = () => {
  let addHistoryMethod = addMethod();
  // @ts-ignore
  window.addHistoryListener = addHistoryMethod('historychange')
  // @ts-ignore
  history.pushState = addHistoryMethod('pushState')
  // @ts-ignore
  history.replaceState = addHistoryMethod('replaceState')
  // @ts-ignore
  window.addHistoryListener('history', function () {
    console.log('historychange')
    trackMenuSwitch()
  })

  window.onpopstate = function () {
    console.log('onpopstate')
    trackMenuSwitch()
  }
  
  function trackMenuSwitch() {
    let pathname = location.pathname
    let url = window.location.href
    console.log('trackMenuSwitch', pathname, url)
  }
}