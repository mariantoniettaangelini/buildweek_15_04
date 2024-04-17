document.addEventListener('DOMContentLoaded', function() {
  const checkboxes = document.querySelectorAll('.check'); 
  const buttons = document.querySelectorAll('.procedere');

  function aggiornaStatoBottone() {

      buttons.forEach((button, index) => {
          button.disabled = !checkboxes[index].checked; 
      });
  }

  checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', aggiornaStatoBottone);
  });

  aggiornaStatoBottone();
});

/////// bottone per switchare la lingua
document.addEventListener('DOMContentLoaded', function() {
  const languageButton = document.querySelector('.language-btn');
  const languageFlag = document.querySelector('.language-flag');
  const italianText = document.querySelector('.italian-text');
  const englishText = document.querySelector('.english-text');

  languageButton.addEventListener('click', function() {
      if (italianText.style.display === 'none') {
          italianText.style.display = 'block';
          englishText.style.display = 'none';
          languageFlag.src = "../assets/inglese.png"
          languageFlag.alt = 'Switch to English';
      } else {
          italianText.style.display = 'none';
          englishText.style.display = 'block';
          languageFlag.src = '../assets/bandiera_italiana.jpeg';
          languageFlag.alt = 'Switch to Italian';
      }
  });
});