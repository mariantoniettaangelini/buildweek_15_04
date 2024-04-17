let stelle = document.getElementsByClassName('stella');

function cambiaStella(event) {
  let stellaCliccata = event.target;
  let indiceStellaCliccata = Array.from(stelle).indexOf(stellaCliccata);

  for (let i = indiceStellaCliccata; i >= 0; i--) {
    if (stelle[i].src.includes('star-off.svg')) {
      stelle[i].src = './star.svg';
      stelle[i].classList.remove('stella');
      stelle[i].classList.add('star');
    } else {
      stelle[i].src = 'star-off.svg';
      stelle[i].classList.remove('star');
      stelle[i].classList.add('stella');
    }
  }
}


for (let i = 0; i <= stelle.length ; i++) {
  stelle[i].addEventListener('click', cambiaStella);
}

