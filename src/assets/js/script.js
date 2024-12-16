// Récupère les éléments nécessaires
const changementsection = document.getElementById('changments');
const popup = document.getElementById('popup');

// Fonction pour afficher ou masquer la popup
function toggle() {
  popup.classList.toggle('hidden');
}

// Écouteur d'événement pour soumettre le formulaire du joueur
document.getElementById('player-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Récupération des valeurs des champs du formulaire
  const name = document.getElementById('name').value;
  const position = document.getElementById('position').value;
  const rating = document.getElementById('rating').value;
  const pace = document.getElementById('pace').value;
  const shooting = document.getElementById('shooting').value;
  const passing = document.getElementById('passing').value;
  const dribbling = document.getElementById('dribbling').value;
  const defending = document.getElementById('defending').value;
  const physical = document.getElementById('physical').value;

  // Récupération des fichiers téléchargés (logo du club, drapeau de la nationalité, image du joueur)
  const clubFile = document.getElementById('club').files[0];
  const nationalityFile = document.getElementById('nationality').files[0];
  const imageSrcFile = document.getElementById('image-src').files[0];

  // Crée les URL pour les images si elles existent
  const clubImage = clubFile ? URL.createObjectURL(clubFile) : '';
  const nationalityImage = nationalityFile ? URL.createObjectURL(nationalityFile) : '';
  const playerImage = imageSrcFile ? URL.createObjectURL(imageSrcFile) : '';

  // Récupère les stats spécifiques aux gardiens de but (si position GK)
  const diving = position === 'GK' ? document.getElementById('diving').value : null;
  const handling = position === 'GK' ? document.getElementById('handling').value : null;
  const kicking = position === 'GK' ? document.getElementById('kicking').value : null;
  const reflexes = position === 'GK' ? document.getElementById('reflexes').value : null;
  const positioning = position === 'GK' ? document.getElementById('positioning').value : null;

  // Validation du formulaire
  if (position !== 'GK' && (!pace || !shooting || !passing || !dribbling || !defending || !physical)) {
    alert('Veuillez remplir toutes les statistiques pour les joueurs non-GK.');
    return;
  }

  if (position === 'GK' && (!diving || !handling || !kicking || !reflexes || !positioning)) {
    alert('Veuillez remplir toutes les statistiques pour les gardiens de but.');
    return;
  }

  if (!clubFile) {
    alert('Veuillez télécharger le logo du club.');
    return;
  }

  if (!nationalityFile) {
    alert('Veuillez télécharger le drapeau de la nationalité.');
    return;
  }

  if (!imageSrcFile) {
    alert('Veuillez télécharger une image du joueur.');
    return;
  }

  // Création de la carte du joueur avec les informations saisies
  const playerCard = document.createElement('div');
  playerCard.classList.add('player-card', 'w-40', 'h-[300px]', 'rounded', 'p-4', 'text-white', 'm-2');
  playerCard.dataset.position = position;

  // Si le joueur est un gardien de but, on génère une carte avec ses stats spécifiques
  if (position === 'GK') {
    playerCard.innerHTML = `
      <img onclick="this.parentElement.remove()" src="/src/assets/img/signs-close-icon.png" alt="" class="w-[1rem]">
      <div class="wrapper">
        <div class="relative w-[100px] h-[180px] bg-cover bg-center bg-[url('https://selimdoyranli.com/cdn/fut-player-card/img/card_bg.png')] transition-all ease-in">
          <div class="relative flex text-[#e9cc74] px-[0.3rem]">
            <div class="absolute py-[0.8rem_0] text-xs uppercase font-light">
              <div class="text-[1rem] mt-5">${rating}</div>
              <div>${position}</div>
              <div class="block">
                <img src="${nationalityImage}" alt="${name} nationality" class="w-[1rem] h-[14px] object-contain" />
              </div>
              <div class="block">
                <img src="${clubImage}" alt="Club logo" class="w-[1rem] h-[14px] object-contain" />
              </div>
            </div>
            <div class="w-[70px] h-[80px] mx-auto overflow-hidden">
              <img src="${playerImage}" alt="${name}" class="w-full h-full object-contain relative right-[-1rem] bottom-0" />
            </div>
          </div>

          <div class="w-full flex justify-around text-[#88e635] text-[0.7rem] font-bold uppercase">
            <span class="ml-[0.4rem] text-shadow-lg">${position}</span>
          </div>

          <div class="relative">
            <div class="text-[#e9cc74] w-[90%] mx-auto">
              <div class="text-center w-[100%] text-[0.6rem] uppercase border-b-2 border-[#e9cc74]/[0.1]">
                <span class="block text-shadow-lg">${name}</span>
              </div>
              <div class="flex justify-center">
                <div class="pr-[1.5rem] border-r-2 border-[#e9cc74]/[0.1]">
                  <div class="flex items-center text-[0.5rem] uppercase">
                    <span class="font-bold mr-[0.3rem]">${handling}</span>
                    <span class="font-light">HAN</span>
                  </div>
                  <div class="flex items-center text-[0.5rem] uppercase">
                    <span class="font-bold mr-[0.3rem]">${kicking}</span>
                    <span class="font-light">KICK</span>
                  </div>
                  <div class="flex items-center text-[0.5rem] uppercase">
                    <span class="font-bold mr-[0.3rem]">${reflexes}</span>
                    <span class="font-light">REF</span>
                  </div>
                </div>
                <div>
                  <div class="flex items-center text-[0.5rem] uppercase">
                    <span class="font-bold mr-[0.3rem]">${positioning}</span>
                    <span class="font-light">POS</span>
                  </div>
                  <div class="flex items-center text-[0.5rem] uppercase">
                    <span class="font-bold mr-[0.3rem]">${diving}</span>
                    <span class="font-light">DIV</span>
                  </div>
                  <div class="flex items-center text-[0.5rem] uppercase">
                    <span class="font-bold mr-[0.3rem]">${physical}</span>
                    <span class="font-light">PHY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    // Si ce n'est pas un gardien de but, on crée la carte classique
    playerCard.innerHTML = `
      <img onclick="this.parentElement.remove()" src="/src/assets/img/signs-close-icon.png" alt="" class="w-[1rem]">
      <div class="wrapper">
        <div class="relative w-[100px] h-[180px] bg-cover bg-center bg-[url('https://selimdoyranli.com/cdn/fut-player-card/img/card_bg.png')] transition-all ease-in">
          <div class="relative flex text-[#e9cc74] px-[0.3rem]">
            <div class="absolute py-[0.8rem_0] text-xs uppercase font-light">
              <div class="text-[1rem] mt-5">${rating}</div>
              <div>${position}</div>
              <div class="block">
                <img src="${nationalityImage}" alt="${name} nationality" class="w-[1rem] h-[14px] object-contain" />
              </div>
              <div class="block">
                <img src="${clubImage}" alt="Club logo" class="w-[1rem] h-[14px] object-contain" />
              </div>
            </div>
            <div class="w-[70px] h-[80px] mx-auto overflow-hidden">
              <img src="${playerImage}" alt="${name}" class="w-full h-full object-contain relative right-[-1rem] bottom-0" />
            </div>
          </div>

          <div class="w-full flex justify-around text-[#88e635] text-[0.7rem] font-bold uppercase">
            <span class="ml-[0.4rem] text-shadow-lg">${position}</span>
          </div>

          <div class="relative">
            <div class="text-[#e9cc74] w-[90%] mx-auto">
              <div class="text-center w-[100%] text-[0.6rem] uppercase border-b-2 border-[#e9cc74]/[0.1]">
                <span class="block text-shadow-lg">${name}</span>
              </div>
              <div class="flex justify-center">
                <div class="pr-[1.5rem] border-r-2 border-[#e9cc74]/[0.1]">
                  <div class="flex items-center text-[0.5rem] uppercase">
                    <span class="font-bold mr-[0.3rem]">${pace}</span>
                    <span class="font-light">PAC</span>
                  </div>
                  <div class="flex items-center text-[0.5rem] uppercase">
                    <span class="font-bold mr-[0.3rem]">${shooting}</span>
                    <span class="font-light">SHO</span>
                  </div>
                  <div class="flex items-center text-[0.5rem] uppercase">
                    <span class="font-bold mr-[ 0.3rem]">${passing}</span>
                    <span class="font-light">PAS</span>
                  </div>
                </div>
                <div>
                  <div class="flex items-center text-[0.5rem] uppercase">
                    <span class="font-bold mr-[0.3rem]">${dribbling}</span>
                    <span class="font-light">DRI</span>
                  </div>
                  <div class="flex items-center text-[0.5rem] uppercase">
                    <span class="font-bold mr-[0.3rem]">${defending}</span>
                    <span class="font-light">DEF</span>
                  </div>
                  <div class="flex items-center text-[0.5rem] uppercase">
                    <span class="font-bold mr-[0.3rem]">${physical}</span>
                    <span class="font-light">PHY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Vérifie si un joueur existe déjà à cette position avant de l'ajouter
  const positionContainer = document.getElementById(position);
  if (positionContainer.innerHTML.includes('<div class="wrapper">')) {
    alert("Le joueur existe déjà à cette position");
  } else {
    positionContainer.innerHTML = '';
    positionContainer.appendChild(playerCard);
  }

  toggle();
  addClickListener(playerCard);  // Ajoute un écouteur d'événements pour déplacer le joueur
});

// Fonction pour déplacer le joueur vers les changements (substitutions)
function movePlayerToChangement(playerCard) {
  changementsection.appendChild(playerCard);

  addDoubleClickListener(playerCard);
}

// Fonction pour déplacer le joueur vers la formation
function movePlayerToFormation(playerCard) {
  const position = playerCard.dataset.position;
  const positionContainer = document.getElementById(position);

  if (positionContainer.children.length === 0) {
    positionContainer.appendChild(playerCard);
  }

  addDoubleClickListener(playerCard);
}

// Ajoute un écouteur d'événements pour double-cliquer sur une carte de joueur
function addDoubleClickListener(playerCard) {
  playerCard.addEventListener('dblclick', function () {
    const positionContainer = document.getElementById(playerCard.dataset.position);

    if (changementsection.contains(playerCard)) {
      movePlayerToFormation(playerCard);
    } 
    else if (positionContainer.contains(playerCard)) {
      movePlayerToChangement(playerCard);
    }
  });
}

// Ajoute un écouteur d'événements pour cliquer sur une carte de joueur
function addClickListener(playerCard) {
  playerCard.addEventListener('click', function () {
    const positionContainer = document.getElementById(playerCard.dataset.position);

    if (changementsection.contains(playerCard)) {
      movePlayerToFormation(playerCard);
    } 
    else if (positionContainer.contains(playerCard)) {
      movePlayerToChangement(playerCard);
    }
  });
}

// Gère le changement de position dans le formulaire (affiche/masque les stats GK ou non-GK)
document.getElementById('position').addEventListener('change', function () {
  const selectedPosition = this.value;

  const nonGkStats = document.getElementById('nongkstats');
  const gkStats = document.getElementById('gkstats');

  if (selectedPosition === 'GK') {
    nonGkStats.classList.add('hidden');
    gkStats.classList.remove('hidden');
  } else {
    nonGkStats.classList.remove('hidden');
    gkStats.classList.add('hidden');
  }
});
let max = 0;
       let i = 0;
       let idOfmax = 0
// Chargement des joueurs depuis l'API et création des cartes de joueurs
document.addEventListener('DOMContentLoaded', async () => {
  const url = 'http://127.0.0.1:5500/FUT-Champions-Web-App-Ultimate-Team/src/assets/js/players.json';
  const response = await fetch(url);
  const data = await response.json();
  const players = data.players;

  players.forEach(player => {
    
    const playerCard = createPlayerCard(player);
    changementsection.appendChild(playerCard);
    playerCard.addEventListener('click', function () {
      const positionContainer = document.getElementById(player.position);
      let positionClicked = player.position
      if (positionContainer.children.length === 0) {
       // 
       
       players.forEach(player=>{
        console.log(player.rating)
        if(player.rating > 1 && player.position==positionClicked){
          max = player.rating;
          idOfmax = i
        }
        i++
        console.log(i)
       })
       console.log(idOfmax);
       let playerCard = createPlayerCard(players[idOfmax]);
       positionContainer.appendChild(playerCard);
      } else {
        changementsection.appendChild(playerCard);
      }
    });
   
  });

   // Ajoute un écouteur d'événements pour déplacer les joueurs dans les changements
  
});

// Fonction pour créer une carte de joueur à partir des données de l'API
function createPlayerCard(player) {
  const playerCard = document.createElement('div');
  playerCard.classList.add('player-card', 'w-40', 'h-[300px]', 'rounded', 'p-4', 'text-white', 'm-2');
  playerCard.innerHTML = `
    <img onclick="this.parentElement.remove()" src="/src/assets/img/signs-close-icon.png" alt="" class="w-[1rem]">
    <div class="wrapper">
        <div class="relative w-[100px] h-[180px] bg-cover bg-center bg-[url('https://selimdoyranli.com/cdn/fut-player-card/img/card_bg.png')] transition-all ease-in">
            <div class="relative flex text-[#e9cc74] px-[0.3rem]">
                <div class="absolute py-[0.8rem_0] text-xs uppercase font-light">
                    <div class="text-[1rem] mt-5">${player.rating}</div>
                    <div>${player.position}</div>
                    <div class="block">
                        <img src="${player.flag}" alt="${player.name} nationality" class="w-[1rem] h-[14px] object-contain" />
                    </div>
                    <div class="block">
                        <img src="${player.logo}" alt="Club logo" class="w-[1rem] h-[14px] object-contain" />
                    </div>
                </div>
                <div class="w-[70px] h-[80px] mx-auto overflow-hidden">
                    <img src="${player.photo}" alt="${player.name}" class="w-full h-full object-contain relative right-[-1rem] bottom-0" />
                </div>
            </div>
            <div class="w-full flex justify-around text-[#88e635] text-[0.7rem] font-bold uppercase">
                <span class="ml-[0.4rem] text-shadow-lg">${player.position}</span>
            </div>
            <div class="relative">
                <div class="text-[#e9cc74] w-[90%] mx-auto">
                    <div class="text-center w-[100%] text-[0.6rem] uppercase border-b-2 border-[#e9cc74]/[0.1]">
                        <span class="block text-shadow-lg">${player.name}</span>
                    </div>
                    <div class="flex justify-center">
                        <div class="pr-[1.5rem] border-r-2 border-[#e9cc74]/[0.1]">
                            <div class="flex items-center text-[0.5rem] uppercase">
                                <span class="font-bold mr-[0.3rem]">${player.pace}</span>
                                <span class="font-light">PAC</span>
                            </div>
                            <div class="flex items-center text-[0.5rem] uppercase">
                                <span class="font-bold mr-[0.3rem]">${player.shooting}</span>
                                <span class="font-light">SHO</span>
                            </div>
                            <div class="flex items-center text-[0.5rem] uppercase">
                                <span class="font-bold mr-[ 0.3rem]">${player.passing}</span>
                                <span class="font-light">PAS</span>
                            </div>
                        </div>
                        <div>
                            <div class="flex items-center text-[0.5rem] uppercase">
                                <span class="font-bold mr-[0.3rem]">${player.dribbling}</span>
                                <span class="font-light">DRI</span>
                            </div>
                            <div class="flex items-center text-[0.5rem] uppercase">
                                <span class="font-bold mr-[0.3rem]">${player.defending}</span>
                                <span class="font-light">DEF</span>
                            </div>
                            <div class="flex items-center text-[0.5rem] uppercase">
                                <span class="font-bold mr-[0.3rem]">${player.physical}</span>
                                <span class="font-light">PHY</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `;
  const closeButton = playerCard.querySelector('img');
  closeButton.addEventListener('click', function (event) {
    event.stopPropagation();
    playerCard.remove(); 
  });
  return playerCard;
}