const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const overTabletWidth = () => window.innerWidth > 1023

export {
  isMobile as default,
  isMobile,
  overTabletWidth
}