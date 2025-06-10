document.addEventListener('DOMContentLoaded', function () {
  const badActions = [
    { id: 'bad1', text: 'Mentir', weight: 2 },
    { id: 'bad2', text: 'Roubar', weight: 5 },
    { id: 'bad3', text: 'Trair', weight: 4 },
    { id: 'bad4', text: 'Invejar', weight: 3 },
    { id: 'bad5', text: 'Ser ganancioso', weight: 3 },
    { id: 'bad6', text: 'Ser violento', weight: 5 },
    { id: 'bad7', text: 'Ser preguiçoso', weight: 1 },
    { id: 'bad8', text: 'Ser orgulhoso', weight: 2 },
    { id: 'bad9', text: 'Blasfemar', weight: 3 },
    { id: 'bad10', text: 'Ser glutão', weight: 1 }
  ];

  const goodActions = [
    { id: 'good1', text: 'Ajudar necessitados', weight: 4 },
    { id: 'good2', text: 'Ser honesto', weight: 3 },
    { id: 'good3', text: 'Perdoar', weight: 4 },
    { id: 'good4', text: 'Ser generoso', weight: 3 },
    { id: 'good5', text: 'Respeitar outros', weight: 2 },
    { id: 'good6', text: 'Ser humilde', weight: 3 },
    { id: 'good7', text: 'Proteger ambiente', weight: 2 },
    { id: 'good8', text: 'Ser paciente', weight: 2 },
    { id: 'good9', text: 'Ser compassivo', weight: 4 },
    { id: 'good10', text: 'Defender fracos', weight: 3 }
  ];

  function toggleOption(event) {
    event.preventDefault();
    this.classList.toggle('selected');
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
  }

  function createOptions() {
    const badContainer = document.getElementById('bad-actions');
    const goodContainer = document.getElementById('good-actions');
    badContainer.innerHTML = '';
    goodContainer.innerHTML = '';

    badActions.forEach(action => {
      const option = document.createElement('div');
      option.className = 'option';
      option.dataset.id = action.id;
      option.dataset.weight = action.weight;
      option.textContent = action.text;
      option.addEventListener('click', toggleOption);
      option.addEventListener('touchstart', toggleOption, { passive: true });
      badContainer.appendChild(option);
    });

    goodActions.forEach(action => {
      const option = document.createElement('div');
      option.className = 'option';
      option.dataset.id = action.id;
      option.dataset.weight = action.weight;
      option.textContent = action.text;
      option.addEventListener('click', toggleOption);
      option.addEventListener('touchstart', toggleOption, { passive: true });
      goodContainer.appendChild(option);
    });
  }

  createOptions();
});
