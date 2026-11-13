(()=>{
  'use strict';
  const items=[
    {name:'다이제 비상식량',category:'식량·식수',description:'간편하게 보관하고 먹을 수 있는 비상 간식',link:'https://coupa.ng/cqVNvi',image:'https://t5a.coupangcdn.com/thumbnails/remote/212x212ex/image/retail/images/123448810258168-223f3421-3e2b-405d-8d55-852717a52053.png'},
    {name:'롯데웰푸드 미니 크런키',category:'식량·식수',description:'개별 포장된 미니 초콜릿',link:'https://link.coupang.com/a/iDCEbTxBeK',image:'https://thumbnail.coupangcdn.com/thumbnails/remote/q89/image/retail/images/3626850980112574-264d9cf8-36c5-4fe8-a43f-ee21dde6b66a.png'},
    {name:'트윅스 미니스',category:'식량·식수',description:'개별 포장된 초코바 간식',link:'https://link.coupang.com/a/iDCEXJpSa4',image:'https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/1025_amir_coupang_oct_80k/d9af/1183be49b0e47047013a24af5072d0c1fea6896d798999d229baca22e474.jpg'},
    {name:'엠앤엠즈 밀크 펀사이즈',category:'식량·식수',description:'한 번에 먹기 편한 미니 초콜릿',link:'https://link.coupang.com/a/iDCIXpdkk0',image:'https://sitem.ssgcdn.com/09/70/13/item/1000010137009_i1_750.jpg'},
    {name:'발열도시락 전투식량 세트',category:'식량·식수',description:'비빔밥 3개와 라면밥 2개 구성',link:'https://link.coupang.com/a/iDCM5iSGC4',image:'https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/9e2d/c4bfac2a30a65af5d2b8173cfde4dc29a0f5c7a74a43e7adda01229e8b6a.png'},
    {name:'희망건빵 프로틴 간식',category:'식량·식수',description:'실온 보관 가능한 개별 포장 건빵',link:'https://link.coupang.com/a/iDCOFMUl88',image:'https://d3d3ajccnahae5.cloudfront.net/fit-in/1000x1000/image/catalog/Seller_6179/01_Keil/thumb%201-20240129042048-1706502052.jpg'},
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
      image.alt=`${item.name} 상품 사진`;
      image.loading='lazy';
      image.referrerPolicy='no-referrer';
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
