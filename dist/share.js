(()=>{
  'use strict';
  const button=document.querySelector('#shareSite');
  if(!button)return;
  const status=document.createElement('span');
  status.className='share-status';
  status.setAttribute('role','status');
  button.insertAdjacentElement('afterend',status);
  button.addEventListener('click',async()=>{
    const share={
      title:'SAFEKIT — 재난별 행동요령과 비상준비',
      text:'상황을 고르면 지금 할 일과 피할 행동을 확인할 수 있는 재난 대비 가이드예요.',
      url:new URL(location.pathname+'#disasters',location.origin).href
    };
    if(navigator.share){
      try{await navigator.share(share);status.textContent='공유 메뉴를 열었습니다.';return}
      catch(error){if(error.name==='AbortError')return}
    }
    try{await navigator.clipboard.writeText(share.url);status.textContent='행동요령 링크를 복사했습니다.'}
    catch{status.textContent=share.url}
  });
})();
