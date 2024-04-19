

var risposteEsatte = sessionStorage.getItem('contatore');
function generaRisultati(risposte) {
   let risposteSbagliate = 10 - risposte;
   let percentGiuste = (risposte / 10) * 100;
   let percentSbagliate = (risposteSbagliate / 10) * 100;
   percentGiuste;
   document.getElementById("perc1").innerText = percentGiuste;
   document.getElementById("perc2").innerText = percentSbagliate;
   document.getElementById("numGiuste").innerText = risposteEsatte;
   document.getElementById("numSbagliate").innerText = risposteSbagliate;
   let rootElement = document.documentElement;
   let nuovaPercentuale = (440 -(440 * percentGiuste) / 100);
   rootElement.style.setProperty('--percentuale', nuovaPercentuale);
}

const myButton = document.getElementById('btn');
myButton.addEventListener('mouseenter', function() {
  myButton.classList.add('custom-cursor');
});
myButton.addEventListener('mouseleave', function() {
  myButton.classList.remove('custom-cursor');
});
generaRisultati(risposteEsatte);
const messaggio = function (){
  const messaggio1 = `
  <h4>Congratulazioni!</h4>
  <h5>Hai passato l'esame</h5>
  <p>Ti invieremo il certificato</p>
  <p>in pochi minuti</p>
  <p>Controlla la tua mail</p>
  <p>incluse spam e promozioni</p>  
  `;
  const messaggio2 = `<h6>Test Fallito!</h6>`;
  if (risposteEsatte <= 5) {return messaggio2;}
  else {return messaggio1;}
}

document.getElementById('messaggio').innerHTML = messaggio();
btn.addEventListener('click',() => {
      window.location.href = './pagina4.html';
  });
