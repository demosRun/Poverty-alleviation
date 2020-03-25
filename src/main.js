function getScrollTop() {
  var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
  if(document.body){
    bodyScrollTop = document.body.scrollTop;
  }
  if(document.documentElement){
    documentScrollTop = document.documentElement.scrollTop;
  }
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
  return scrollTop;
}
setTimeout(() => {
  if (screenInfo.isPc) {
    var drop = true
    
    document.querySelector('.nav.clearfix').style.top = '50px'
    window.onscroll = function(){
      var scrollTopValue = getScrollTop()
      if (scrollTopValue > 50 && drop) {
        document.querySelector('.nav.clearfix').style.top = '0px'
        document.querySelector('.nav.clearfix').classList.add('drop')
        drop = false
      }
      if (scrollTopValue <= 50 && !drop) {
        document.querySelector('.nav.clearfix').classList.remove('drop')
        drop = true
      }
    }
  }
}, 0);


