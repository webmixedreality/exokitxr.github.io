(() => {

window.addEventListener('load', () => {
  const featuresWrap = document.getElementById('featureMain-wrap');
  const featuresArray = document.getElementsByClassName('slideItem');
  for (let i = 0; i < featuresArray.length; i++) {
    const el = featuresArray[i];
    const animationString = el.dataset.animation;
    if (animationString) {
      el.animations = eval(animationString);
      el.style.visibility = 'visible';
    }
  }
  const _tick = () => {
    const parentFactor = Math.min(Math.max((window.pageYOffset - (featuresWrap.offsetHeight - window.innerHeight * 2.2)) / (featuresWrap.offsetHeight + window.innerHeight), 0), 1);

    for (let i = 0; i < featuresArray.length; i++) {
      const el = featuresArray[i];
      const {animations} = el;
      let transform = '';
      for (let j = 0; j < animations.length; j++) {
        const animation = animations[j];
        const {k, sp = 0, ep = 1, sv = 0, ev = 1, u = ''} = animation;
        const factor = Math.min(Math.max((parentFactor - sp) / (ep - sp), 0), 1);
        const v = sv + factor * (ev - sv);
        transform += `${k}(${v}${u})`;
      }
      el.style.transform = transform;
    }
  };
  _tick();
  window.addEventListener('scroll', _tick);
});

})();
