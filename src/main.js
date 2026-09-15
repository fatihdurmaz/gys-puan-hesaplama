import './style.css'
import logo from './assets/logo.webp'
import { calculateScore } from './score.js'
const icon = (name) => ({book:'<path d="M4 4h6a3 3 0 0 1 3 3v14a4 4 0 0 0-4-3H4zM13 7a3 3 0 0 1 3-3h5v14h-4a4 4 0 0 0-4 3"/>',calc:'<rect x="5" y="2" width="14" height="20" rx="3"/><path d="M8 6h8M8 11h1m6 0h1m-8 4h1m6 0h1m-8 4h1m6 0h1"/>',check:'<path d="m5 12 4 4L19 6"/>',arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>'}[name])
const svg = name => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon(name)}</svg>`
document.querySelector('#app').innerHTML = `
<header class="header"><a class="brand" href="/" aria-label="GYS İçişleri ana sayfa"><img class="brand-icon" src="${logo}" alt="" width="48" height="48"><span>GYS <strong>İçişleri</strong><small>SINAVA HAZIRLIK</small></span></a><span class="header-note">Ücretsiz puan hesaplama</span></header>
<main><section class="intro"><div class="eyebrow"><span></span> İÇİŞLERİ BAKANLIĞI PERSONELİ İÇİN</div><h1>Doğrularınızı girin,<br><span>puanınızı öğrenin.</span></h1><p>Görevde Yükselme ve Unvan Değişikliği sınavları için<br class="desktop"> puanınızı ve 60 puan barajına ne kadar kaldığını hesaplayın.</p></section>
<section class="calculator" aria-label="Sınav puanı hesaplayıcı"><div class="controls"><div class="section-heading"><span class="small-icon">${svg('calc')}</span><h2>Puan hesaplama</h2><button id="reset" class="reset" type="button">Sıfırla</button></div><fieldset><legend>1. Sınav türünüzü seçin</legend><div class="exam-options"><label class="exam"><input type="radio" name="exam" value="80" checked><span><strong>Görevde Yükselme</strong><small>80 soru <span>·</span> 1,25 puan / doğru</small></span></label><label class="exam"><input type="radio" name="exam" value="70"><span><strong>Unvan Değişikliği</strong><small>70 soru <span>·</span> ≈1,4286 puan / doğru</small></span></label></div></fieldset><div class="correct-heading"><label for="correct">2. Doğru sayınızı girin</label><span id="limit">En fazla 80 doğru</span></div><div class="number-control"><button id="minus" type="button" aria-label="Doğru sayısını bir azalt">−</button><input id="correct" type="number" inputmode="numeric" min="0" max="80" step="1" value="0" aria-describedby="error limit"><button id="plus" type="button" aria-label="Doğru sayısını bir artır">+</button></div><p id="error" class="error" role="alert" hidden></p><input id="range" type="range" min="0" max="80" value="0" aria-label="Doğru sayısı"><div class="range-labels"><span>0 doğru</span><span id="range-max">80 doğru</span></div><div class="hint">${svg('check')}<span>Yanlış cevaplar doğru cevapları götürmez.<br><strong>Yalnızca doğru sayınızı girmeniz yeterli.</strong></span></div></div>
<div class="result" aria-live="polite" aria-atomic="true"><div class="result-top"><span>HESAPLANAN PUANINIZ</span><span id="exam-badge">80 SORU</span></div><div class="score"><span id="score">0,00</span><span>/ 100</span></div><div id="status" class="status">60 puan barajının altında</div><div class="progress-wrap"><div class="progress-track"><div id="progress"></div><span class="threshold-marker"></span></div><div class="progress-labels"><span>0</span><span>Baraj: 60</span><span>100</span></div></div><div class="target"><span class="target-icon">${svg('arrow')}</span><div><strong id="target">Baraja ulaşmak için 48 doğru daha</strong><p id="target-detail">80 soruda en az 48 doğru, 60 puan getirir.</p></div></div><div class="result-bottom"><span>Doğru sayısı <strong id="correct-total">0 / 80</strong></span><span>Baraj puanı <strong>60 / 100</strong></span></div></div></section>
<section class="reference"><div class="reference-title">${svg('info')}<h2>60 puan için kaç doğru gerekiyor?</h2></div><div class="reference-items"><p>Görevde Yükselme <strong>48 <small>/ 80 doğru</small></strong></p><p>Unvan Değişikliği <strong>42 <small>/ 70 doğru</small></strong></p></div></section>
<aside class="promo"><img class="promo-icon" src="${logo}" alt="GYS İçişleri uygulama logosu" width="65" height="65"><div><span class="eyebrow">GYS İÇİŞLERİ UYGULAMASI</span><h2>Hazırlığınız her zaman yanınızda.</h2><p>Bu puan hesaplayıcı, GYS İçişleri uygulamasını kullanamayan<br class="desktop"> adayların da yararlanabilmesi için hazırlandı.</p></div><div class="store-links"><a href="https://play.google.com/store/apps/details?id=studio.yuuma.gys.icisleri" target="_blank" rel="noopener noreferrer"><small>GOOGLE PLAY</small><strong>Android için indir ↗</strong></a><a href="https://apps.apple.com/tr/app/gys-i-%C3%A7i%C5%9Fleri/id6761848859" target="_blank" rel="noopener noreferrer"><small>APP STORE</small><strong>iPhone için indir ↗</strong></a></div></aside>
<p class="disclaimer">Hesaplama: doğru sayısı ÷ toplam soru sayısı × 100. Puan iki ondalık basamakla gösterilir.<br>Bu araç bilgilendirme amaçlıdır; resmî sınav sonucu yerine geçmez. İptal edilen sorular hesaba katılmaz.</p></main><footer><span>© ${new Date().getFullYear()} GYS İçişleri</span><span>Emek veren tüm adaylara başarılar.</span></footer>`
const $ = s => document.querySelector(s)
let total=80
function update(){
 const raw=$('#correct').value
 const correct=Number(raw)
 const result=raw.trim()===''?null:calculateScore(total,correct)
 $('#error').hidden=!!result
 $('#correct').setAttribute('aria-invalid',String(!result))
 $('#error').textContent=result?'':`0 ile ${total} arasında bir tam sayı girin.`
 $('#score').textContent=result?result.score.toLocaleString('tr-TR',{minimumFractionDigits:2,maximumFractionDigits:2}):'—'
 $('#status').textContent=result?(result.passed?'60 puan barajına ulaştınız':'60 puan barajının altında'):'Doğru sayınızı kontrol edin'
 $('.result').classList.toggle('passed',!!result?.passed)
 $('#progress').style.width=`${result?.score??0}%`
 $('#target').textContent=result?(result.passed?'Tebrikler, puanınız barajı karşılıyor!':`Baraja ulaşmak için ${result.remaining} doğru daha`):'Geçerli bir doğru sayısı girin'
 $('#target-detail').textContent=`${total} soruda en az ${total*.6} doğru, 60 puan getirir.`
 $('#correct-total').textContent=`${result?correct:'—'} / ${total}`
 if(result)$('#range').value=correct
 $('#minus').disabled=!!result&&correct===0
 $('#plus').disabled=!!result&&correct===total
}
$('#correct').addEventListener('input',update)
$('#range').addEventListener('input',e=>{$('#correct').value=e.target.value;update()})
for(const [id,delta] of [['minus',-1],['plus',1]])$('#'+id).addEventListener('click',()=>{$('#correct').value=Math.max(0,Math.min(total,Math.trunc(Number($('#correct').value)||0)+delta));update()})
for(const radio of document.querySelectorAll('[name=exam]'))radio.addEventListener('change',()=>{total=Number(radio.value);$('#correct').max=total;$('#range').max=total;$('#limit').textContent=`En fazla ${total} doğru`;$('#range-max').textContent=`${total} doğru`;$('#exam-badge').textContent=`${total} SORU`;if(Number($('#correct').value)>total)$('#correct').value=total;update()})
$('#reset').addEventListener('click',()=>{$('#correct').value=0;update()})
update()
