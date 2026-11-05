/* Контакты музыкального проекта. Почта отправляется через отдельную форму Formspree. */
const CONTACTS = { LINE: 'https://lin.ee/xIn5Een', Telegram: 'https://t.me/MilenaNur', Facebook: 'https://www.facebook.com/share/19y13DBiFF/?mibextid=wwXIfr', Instagram: 'https://www.instagram.com/milena_in_japan/' };
const isJapanese=document.documentElement.lang==='ja';
const menuLabels=isJapanese?['メニューを開く','メニューを閉じる']:['Открыть меню','Закрыть меню'];
const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('.mobile-menu');
const dialog=document.querySelector('.contact-dialog');
let previousFocus;
function closeMenu(){menu.classList.remove('is-open');menu.inert=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label',menuLabels[0]);document.body.style.overflow='';}
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';if(!open){closeMenu();return;}menu.inert=false;menu.classList.add('is-open');menuButton.setAttribute('aria-expanded','true');menuButton.setAttribute('aria-label',menuLabels[1]);document.body.style.overflow='hidden';});
document.querySelectorAll('[data-contact]').forEach(button=>button.addEventListener('click',()=>{previousFocus=button;closeMenu();dialog.showModal();document.body.style.overflow='hidden';}));
document.querySelector('.modal-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
dialog.addEventListener('close',()=>{document.body.style.overflow='';if(previousFocus&&!previousFocus.closest('[inert]'))previousFocus.focus();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('is-open')){closeMenu();menuButton.focus();}if(e.key==='Tab'&&menu.classList.contains('is-open')){const links=[menuButton,...Array.from(menu.querySelectorAll('a,button')).filter(el=>el.getClientRects().length)];const first=links[0],last=links[links.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
matchMedia('(max-width:600px)').addEventListener('change',e=>{if(!e.matches)closeMenu();});
let noticeTimer;function notice(text){const el=document.querySelector('.notice');el.textContent=text;el.hidden=false;clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>el.hidden=true,5000);}
/* Почтовая форма показывается внутри того же контактного окна. */
const emailForm=document.querySelector('.music-email-form');
const contactOptions=document.querySelector('.contact-options');
const contactHint=document.querySelector('.contact-hint');
const emailStatus=emailForm?.querySelector('.music-email-status');
const emailSubmit=emailForm?.querySelector('.music-email-submit');
const defaultSubmitText=emailSubmit?.textContent;
function showEmailForm(){
  if(!emailForm)return;
  contactOptions.hidden=true;
  contactHint.hidden=true;
  emailForm.hidden=false;
  emailStatus.textContent='';
  emailForm.querySelector('input[name="name"]')?.focus();
}
function showContactOptions(){
  if(!emailForm)return;
  emailForm.hidden=true;
  contactOptions.hidden=false;
  contactHint.hidden=false;
  contactHint.textContent=isJapanese?'ご都合のよい方法でご連絡ください。':'Выберите удобный способ связи';
}
emailForm?.querySelector('.music-email-back')?.addEventListener('click',showContactOptions);
dialog.addEventListener('close',showContactOptions);
document.querySelectorAll('[data-channel]').forEach(button=>button.addEventListener('click',()=>{
  const name=button.dataset.channel;
  if(name==='Email'){showEmailForm();return;}
  const link=CONTACTS[name];
  if(!link){
    const message=isJapanese?name+'の連絡先は現在準備中です。':'Ссылка '+name+' пока не добавлена. Контакты скоро появятся.';
    if(dialog.open)contactHint.textContent=message;else notice(message);
    return;
  }
  window.open(link,'_blank','noopener,noreferrer');
}));
emailForm?.addEventListener('submit',async event=>{
  event.preventDefault();
  if(!emailForm.reportValidity()||emailSubmit.disabled)return;
  emailSubmit.disabled=true;
  emailSubmit.textContent=emailStatus.dataset.sending;
  emailStatus.textContent='';
  try{
    const response=await fetch(emailForm.action,{
      method:'POST',body:new FormData(emailForm),headers:{'Accept':'application/json'}
    });
    if(!response.ok)throw new Error('Formspree HTTP '+response.status);
    emailForm.reset();
    emailStatus.textContent=emailStatus.dataset.success;
  }catch(error){
    console.error('Ошибка отправки музыкальной формы:',error);
    emailStatus.textContent=emailStatus.dataset.failed;
  }finally{
    emailSubmit.disabled=false;
    emailSubmit.textContent=defaultSubmitText;
  }
});
