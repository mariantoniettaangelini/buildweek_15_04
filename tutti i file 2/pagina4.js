let stelle = document.getElementsByClassName('stella');

function cambiaStella(event) {
  let stellaCliccata = event.target;
  let indiceStellaCliccata = Array.from(stelle).indexOf(stellaCliccata);


  // Se la stella cliccata è già attiva (stato 'star'), la disattiviamo
  if (stellaCliccata.src.includes('star.svg')) {

    stellaCliccata.src = '../assets/star-off.svg';
    stellaCliccata.classList.remove('star');
    stellaCliccata.classList.add('stella');

    // Resetta tutte le stelle successive
    for (let i = indiceStellaCliccata+1 ; i < stelle.length; i++) {
      stelle[i].src = '../assets/star-off.svg';
      stelle[i].classList.remove('star');
      stelle[i].classList.add('stella');
    }

    return; // Usciamo dalla funzione senza procedere oltre
  }


  for (let i = indiceStellaCliccata; i >= 0; i--) {
    console.log('Attivazione stella:', stelle[i]);

    stelle[i].src = '../assets/star.svg';
    stelle[i].classList.remove('stella');
    stelle[i].classList.add('star');
  }
}

for (let i = 0; i < stelle.length; i++) {
  stelle[i].addEventListener('click', cambiaStella);
}