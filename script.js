document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando aplicação...');
    
    // Lista de más atitudes/pecados
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

    // Lista de boas atitudes
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

    // Função para detectar dispositivos móveis
    function isMobileDevice() {
        return (window.innerWidth <= 768);
    }
    
    // Função para criar as opções na página
    function createOptions() {
        console.log('Criando opções...');
        const badActionsContainer = document.getElementById('bad-actions');
        const goodActionsContainer = document.getElementById('good-actions');
    
        if (!badActionsContainer || !goodActionsContainer) {
            console.error('Containers de ações não encontrados');
            return;
        }
    
        // Limpar os containers antes de adicionar as opções
        badActionsContainer.innerHTML = '';
        goodActionsContainer.innerHTML = '';
        
        // Usar DocumentFragment para melhor performance
        const badFragment = document.createDocumentFragment();
        const goodFragment = document.createDocumentFragment();
    
        // Ajustar tamanho das opções para dispositivos móveis
        const isMobile = isMobileDevice();
        const optionClass = isMobile ? 'option mobile-option' : 'option';
    
        badActions.forEach(action => {
            const option = document.createElement('div');
            option.className = optionClass;
            option.dataset.id = action.id;
            option.dataset.weight = action.weight;
            option.textContent = action.text;
            option.addEventListener('click', toggleOption);
            badFragment.appendChild(option);
        });
    
        goodActions.forEach(action => {
            const option = document.createElement('div');
            option.className = optionClass;
            option.dataset.id = action.id;
            option.dataset.weight = action.weight;
            option.textContent = action.text;
            option.addEventListener('click', toggleOption);
            goodFragment.appendChild(option);
        });
    
        // Adicionar todos os elementos de uma vez para melhor performance
        badActionsContainer.appendChild(badFragment);
        goodActionsContainer.appendChild(goodFragment);
        
        // Garantir que os containers estejam visíveis
        badActionsContainer.style.display = 'grid';
        goodActionsContainer.style.display = 'grid';
        
        // Ajustar layout para dispositivos móveis
        adjustLayoutForScreenSize();
        
        console.log('Opções criadas com sucesso');
    }

    // Função para ajustar o layout com base no tamanho da tela
    function adjustLayoutForScreenSize() {
        console.log('Ajustando layout para o tamanho da tela...');
        const badActionsContainer = document.getElementById('bad-actions');
        const goodActionsContainer = document.getElementById('good-actions');
        const optionsContainers = document.querySelectorAll('.options-container');
        const isMobile = isMobileDevice();
        
        if (!badActionsContainer || !goodActionsContainer) {
            console.error('Containers não encontrados para ajuste de layout');
            return;
        }
        
        // Remover configurações inline que possam interferir com o CSS
        badActionsContainer.style.gridTemplateColumns = '';
        goodActionsContainer.style.gridTemplateColumns = '';
        
        optionsContainers.forEach(container => {
            container.style.gridTemplateColumns = '';
        });
        
        // Ajustar tamanho das opções
        document.querySelectorAll('.option').forEach(option => {
            if (isMobile) {
                option.classList.add('mobile-option');
            } else {
                option.classList.remove('mobile-option');
            }
        });
        
        console.log('Layout ajustado com sucesso');
    }

    // Função para alternar a seleção de uma opção
    function toggleOption() {
        this.classList.toggle('selected');
        
        // Adicionar feedback tátil em dispositivos móveis
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }

    // Função para calcular o destino
    function calculateDestiny() {
        console.log('Calculando destino...');
        const selectedBadOptions = document.querySelectorAll('#bad-actions .option.selected');
        const selectedGoodOptions = document.querySelectorAll('#good-actions .option.selected');
        
        // Verificar se pelo menos uma opção foi selecionada
        if (selectedBadOptions.length === 0 && selectedGoodOptions.length === 0) {
            alert('Por favor, selecione pelo menos uma opção antes de calcular seu destino.');
            return;
        }
        
        let badScore = 0;
        let goodScore = 0;
        
        selectedBadOptions.forEach(option => {
            badScore += parseInt(option.dataset.weight);
        });
        
        selectedGoodOptions.forEach(option => {
            goodScore += parseInt(option.dataset.weight);
        });
        
        const resultDiv = document.getElementById('result');
        const destinyResult = document.getElementById('destiny-result');
        const destinyExplanation = document.getElementById('destiny-explanation');
        
        if (!resultDiv || !destinyResult || !destinyExplanation) {
            console.error('Elementos de resultado não encontrados');
            return;
        }
        
        // Esconder a tela de seleção de atitudes
        const badActions = document.getElementById('bad-actions');
        const goodActions = document.getElementById('good-actions');
        const actionTitles = document.querySelectorAll('.quiz-container h2:not(:last-child)');
        const calcButton = document.getElementById('calculate-btn');
        const surpriseMessage = document.querySelector('.surprise-message');
        
        // Esconder os elementos da tela de seleção
        if (badActions) badActions.style.display = 'none';
        if (goodActions) goodActions.style.display = 'none';
        actionTitles.forEach(title => title.style.display = 'none');
        if (calcButton) calcButton.style.display = 'none';
        
        // Esconder a mensagem surpresa
        if (surpriseMessage) surpriseMessage.style.display = 'none';
        
        // Limpar qualquer imagem anterior
        const oldImage = document.getElementById('result-image');
        if (oldImage) {
            oldImage.remove();
        }
        
        // Remover qualquer imagem de purgatório em tela cheia anterior
        const fullscreenImage = document.querySelector('.purgatory-image.fullscreen');
        if (fullscreenImage) {
            fullscreenImage.remove();
        }
        
        // Remover qualquer imagem inline anterior
        const oldInlineImage = document.querySelector('.destiny-image');
        if (oldInlineImage) {
            oldInlineImage.remove();
        }
        
        // Determinar o destino com base nas pontuações
        if (goodScore > badScore) {
            // Código para o céu
            destinyResult.textContent = 'CÉU';
            destinyResult.className = 'heaven';
            
            // Criar elemento de imagem para o anjo
            const angelImage = document.createElement('img');
            angelImage.src = 'images/angel.png';
            angelImage.alt = 'Anjinho comemorando';
            angelImage.className = 'destiny-image';
            angelImage.id = 'result-image';
            
            // Inserir a imagem após o título do resultado
            destinyResult.after(angelImage);
            
            // Adicionar áudio para o céu
            try {
                const heavenAudio = new Audio('sounds/vou-nada.mp3');
                heavenAudio.volume = 0.5;
                heavenAudio.play().catch(e => console.log('Erro ao reproduzir áudio:', e));
            } catch (error) {
                console.log('Erro ao criar áudio:', error);
            }
            
            // Explicação baseada na diferença
            const difference = goodScore - badScore;
            if (difference > 10) {
                destinyExplanation.textContent = 'Suas boas ações superaram significativamente suas más ações. As portas do paraíso estão abertas para você!';
            } else if (difference > 5) {
                destinyExplanation.textContent = 'Suas boas ações superaram suas más ações. Você merece um lugar no céu.';
            } else {
                destinyExplanation.textContent = 'Por pouco! Suas boas ações foram suficientes para garantir sua entrada no céu, mas foi por um triz.';
            }
            
            // Remover classe de purgatório se existir
            resultDiv.classList.remove('purgatory-result');
        } else if (badScore > goodScore) {
            // Código para o inferno
            destinyResult.textContent = 'INFERNO';
            destinyResult.className = 'hell';
            
            // Criar elemento de imagem para o diabo
            const devilImage = document.createElement('img');
            devilImage.src = 'images/devil.png';
            devilImage.alt = 'Diabinho comemorando';
            devilImage.className = 'destiny-image';
            devilImage.id = 'result-image';
            
            // Inserir a imagem após o título do resultado
            destinyResult.after(devilImage);
            
            // Adicionar áudio do demônio
            try {
                const demonAudio = new Audio('sounds/demon.mp3');
                demonAudio.volume = 0.5;
                demonAudio.play().catch(e => console.log('Erro ao reproduzir áudio:', e));
            } catch (error) {
                console.log('Erro ao criar áudio:', error);
            }
            
            // Explicação baseada na diferença
            const difference = badScore - goodScore;
            if (difference > 10) {
                destinyExplanation.textContent = 'Suas más ações superaram significativamente suas boas ações. O inferno o aguarda!';
            } else if (difference > 5) {
                destinyExplanation.textContent = 'Suas más ações superaram suas boas ações. Você está condenado ao inferno.';
            } else {
                destinyExplanation.textContent = 'Por pouco! Suas más ações foram suficientes para condená-lo ao inferno, mas foi por um triz.';
            }
            
            // Remover classe de purgatório se existir
            resultDiv.classList.remove('purgatory-result');
        } else {
            // Código para o purgatório (quando as pontuações são iguais)
            destinyResult.textContent = 'PURGATÓRIO';
            destinyResult.className = 'purgatory';
            
            // Adicionar classe especial para o resultado do purgatório
            resultDiv.classList.add('purgatory-result');
            
            // Criar e adicionar imagem de fundo do purgatório
            const purgatoryBackground = document.createElement('img');
            purgatoryBackground.src = 'images/purgatory.png';
            purgatoryBackground.alt = 'Purgatório';
            purgatoryBackground.className = 'purgatory-image fullscreen';
            document.body.appendChild(purgatoryBackground);
            
            // Adicionar áudio do purgatório
            try {
                // Corrigindo o nome do arquivo de áudio para evil-laugh.mp3
                const purgatoryAudio = new Audio('sounds/evil-laugh.mp3');
                purgatoryAudio.volume = 0.5;
                // Adicionando tratamento de erro mais detalhado
                purgatoryAudio.play().catch(e => {
                    console.error('Erro ao reproduzir áudio do purgatório:', e);
                    // Tentar novamente com um pequeno atraso
                    setTimeout(() => {
                        purgatoryAudio.play().catch(err => 
                            console.error('Segunda tentativa falhou:', err));
                    }, 1000);
                });
            } catch (error) {
                console.error('Erro ao criar áudio do purgatório:', error);
            }
            
            // Adicionar imagem inline do purgatório
            const purgatoryInlineImage = document.createElement('img');
            purgatoryInlineImage.src = 'images/purgatory-inline.png';
            purgatoryInlineImage.alt = 'Purgatório';
            purgatoryInlineImage.className = 'purgatory-inline-image destiny-image';
            purgatoryInlineImage.id = 'result-image';
            
            // Inserir a imagem após o título do resultado
            destinyResult.after(purgatoryInlineImage);
            
            // Explicação para o purgatório
            destinyExplanation.innerHTML = 'Suas boas e más ações se equilibraram perfeitamente. Você está no purgatório, onde terá a chance de refletir sobre suas escolhas.<br><br>A surpresa do purgatório é que você pode escolher seu destino final!';
        }
        
        // Mostrar o resultado
        resultDiv.classList.remove('hidden');
        setTimeout(() => {
            resultDiv.classList.add('visible');
        }, 100);
        
        // Adicionar botão de recomeçar
        const restartBtn = document.getElementById('restart-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', resetQuiz);
        }
    }

    // Função para reiniciar o quiz
    function resetQuiz() {
        const selectedOptions = document.querySelectorAll('.option.selected');
        selectedOptions.forEach(option => {
            option.classList.remove('selected');
        });
        
        document.getElementById('result').classList.add('hidden');
        document.getElementById('result').classList.remove('visible');
        document.getElementById('result').classList.remove('purgatory-result');
        
        // Remover imagem do resultado
        const resultImage = document.getElementById('result-image');
        if (resultImage) {
            resultImage.remove();
        }
        
        // Remover qualquer imagem de destino
        const destinyImage = document.querySelector('.destiny-image');
        if (destinyImage) {
            destinyImage.remove();
        }
        
        // Remover imagem de purgatório em tela cheia
        const purgatoryImage = document.querySelector('.purgatory-image.fullscreen');
        if (purgatoryImage) {
            purgatoryImage.remove();
        }
        
        // Mostrar novamente a tela de seleção
        const badActions = document.getElementById('bad-actions');
        const goodActions = document.getElementById('good-actions');
        const actionTitles = document.querySelectorAll('.quiz-container h2');
        const calcButton = document.getElementById('calculate-btn');
        const surpriseMessage = document.querySelector('.surprise-message');
        
        // Mostrar os elementos da tela de seleção
        if (badActions) badActions.style.display = 'grid';
        if (goodActions) goodActions.style.display = 'grid';
        actionTitles.forEach(title => title.style.display = 'block');
        if (calcButton) calcButton.style.display = 'block';
        if (surpriseMessage) surpriseMessage.style.display = 'block';
        
        // Parar qualquer áudio que esteja tocando
        const audios = document.querySelectorAll('audio');
        audios.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        
        // Rolar para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Inicializar o quiz com carregamento otimizado
    function initQuiz() {
        // Primeiro, verificar se os containers existem
        const badActionsContainer = document.getElementById('bad-actions');
        const goodActionsContainer = document.getElementById('good-actions');
        
        if (!badActionsContainer || !goodActionsContainer) {
            console.error('Containers não encontrados, tentando novamente em 100ms');
            setTimeout(initQuiz, 100);
            return;
        }
        
        // Criar as opções
        createOptions();
        
        // Verificar se as opções foram criadas
        const badOptions = document.querySelectorAll('#bad-actions .option');
        const goodOptions = document.querySelectorAll('#good-actions .option');
        
        if (badOptions.length === 0 || goodOptions.length === 0) {
            console.error('Falha ao criar opções, tentando novamente');
            setTimeout(createOptions, 50);
        } else {
            console.log(`Quiz inicializado com sucesso: ${badOptions.length} más ações, ${goodOptions.length} boas ações`);
        }
    }
    
    // Iniciar o quiz quando o DOM estiver pronto
    initQuiz();
    
    // Adicionar event listeners para os botões
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateDestiny);
    }
    
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', restartQuiz);
    }
    
    // Verificar se o script Adsterra está carregado
    window.addEventListener('load', function() {
        // Verificar se o script Adsterra está presente
        const adsterraScript = document.querySelector('script[src*="nauseousrocketjosephine.com"]');
        if (!adsterraScript) {
            // Se não estiver presente, adicionar o script
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = '//nauseousrocketjosephine.com/1a/9d/fb/1a9dfb38715f4b96333dccc1040e680f.js';
            document.body.appendChild(script);
        }
    });
    
    // Adicionar suporte para teclado
    document.addEventListener('keydown', function(event) {
        // Tecla Enter para calcular destino quando o botão estiver visível
        if (event.key === 'Enter' && calculateBtn && calculateBtn.style.display !== 'none') {
            calculateDestiny();
        }
        
        // Tecla Esc para reiniciar
        if (event.key === 'Escape' && document.getElementById('result') && !document.getElementById('result').classList.contains('hidden')) {
            restartQuiz();
        }
    });
    
    // Único evento de redimensionamento para ajustar o layout
    window.addEventListener('resize', adjustLayoutForScreenSize);
    
    // Disparar o evento de redimensionamento para configurar o layout inicial
    adjustLayoutForScreenSize();
});

// Adicione este código ao seu script.js existente

// Melhorar feedback visual para dispositivos de toque
document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.option');
    
    options.forEach(option => {
        option.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        option.addEventListener('touchend', function() {
            this.style.transform = '';
            // Alternar seleção ao tocar
            this.classList.toggle('selected');
        });
    });
    
    // Impedir zoom em dispositivos móveis ao tocar rapidamente
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Adicionar feedback visual ao botão
    const button = document.getElementById('calculate-btn');
    if (button) {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    }
});