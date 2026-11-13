(()=>{
  'use strict';
  const partnerLink='https://coupa.ng/cqVNvi';
  const items=[
    {name:'다이제 비상식량',category:'식량·식수',description:'간편하게 보관하고 먹을 수 있는 비상 간식',query:'다이제 비상식량 다이제 비스킷',link:partnerLink,image:'https://t5a.coupangcdn.com/thumbnails/remote/212x212ex/image/retail/images/123448810258168-223f3421-3e2b-405d-8d55-852717a52053.png'},
    {name:'자가발전 손전등·라디오',category:'조명·통신',description:'정전 때 손으로 충전하고 재난방송을 들을 수 있는 제품 검색',query:'자가발전 손전등 라디오 비상 재난'},
    {name:'가정용 구급함',category:'응급·위생',description:'필요한 응급용품과 위생용품',query:'가정용 구급함 응급용품'},
    {name:'비상용 배낭',category:'비상 키트',description:'필수 물품을 담을 배낭',query:'비상용 배낭 재난 가방'}
  ];
  document.querySelectorAll('#products .product').forEach((card,i)=>{
    const item=items[i];
    if(!item)return;
    const art=card.querySelector('.product-art');
    if(item.image){
      const imageLink=document.createElement('a');
      imageLink.className='partner-image-link';
      imageLink.href=item.link;
      imageLink.target='_blank';
      imageLink.rel='sponsored noopener noreferrer';
      imageLink.setAttribute('aria-label',`${item.name} 쿠팡에서 보기`);
      const image=document.createElement('img');
      image.src=item.image;
      image.alt=item.name;
      image.loading='lazy';
      imageLink.append(image);
      art.replaceChildren(imageLink);
      art.classList.add('partner-product-art');
    } else {
      art.querySelector('span').textContent='COUPANG';
    }
    card.querySelector('.product-category').textContent=item.category;
    card.querySelector('h3').textContent=item.name;
    const desc=card.querySelector('p');
    if(desc)desc.textContent=item.description;
    const price=card.querySelector('.price-row');
    if(price){
      if(item.image){price.remove();return;}
      const link=document.createElement('a');
      link.className='button affiliate-link';
      link.href='https://www.coupang.com/np/search?q='+encodeURIComponent(item.query);
      link.target='_blank';
      link.rel='sponsored noopener noreferrer';
      link.textContent='쿠팡에서 찾아보기 ↗';
      price.replaceWith(link);
    }
  });
  document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{
    document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));
    document.querySelectorAll('#products .product').forEach((card,i)=>{
      card.hidden=b.dataset.filter!=='전체'&&b.dataset.filter!==items[i]?.category;
    });
  });
  document.querySelector('.cart-toggle')?.remove();
  document.querySelector('#cart')?.remove();
})();
