// pcm 20172018a Blackjack object

//constante com o número máximo de pontos para blackJack
const MAX_POINTS = 21;


// Classe BlackJack - construtor
class BlackJack {
    constructor() {
        // array com as cartas do dealer
        this.dealer_cards = [];
        // array com as cartas do player
        this.player_cards = [];
        // variável booleana que indica a vez do dealer jogar até ao fim
        this.dealerTurn = false;

        // objeto na forma literal com o estado do jogo
        this.state = {
            'gameEnded': false,
            'dealerWon': false,
            'playerBusted': false
        };

        // ----- métodos utilizados no construtor ------
        // retorna um array com 52 cartas de 1 a 13 para cada naipe (números 11, 12 e 13 representam as figuras (Rei, Valete e Dama, e 1 representa o Ás)
        this.new_deck = function () {

            let suitsIhDeck = 4
            let cardsInSuits = 13
            let suit = Array.from(new Array(cardsInSuits), (x, index) => index + 1)
            let deck = []
            
            for(let i = 0; i < suitsIhDeck; i++ ) {
                deck.push(...suit)
            }
            return deck
        };

        this.shuffle = function (deck) {

            let numberOfCards = 52
            // array de indices de 1 a 52
            let indexArray = Array.from(new Array(numberOfCards), (x, index) => index + 1)
            let shuffleDeck = []

            for (let i = 0; i < numberOfCards; i++) {

                // 1. obter um valor idx random de 0 até à length atual do indexArray e arredondar esse valor
                let randomIdx = Math.floor(indexArray.length * Math.random())

                // 2. obter o valor de 1 a 52 da posição gerada anteriormente -> indexArray[randomIdx]
                // 3. obter carta correspondente ao indexArray sorteado-> deck[indexArray[randomIdx] - 1]
                // 4. inserir carta que corresponde ao indice criado anteriormente no novo deck 
                shuffleDeck.push(deck[indexArray[randomIdx] - 1])

                // 5. remover posição onde está um indice sorteado para não voltar a sair
                indexArray.splice(randomIdx, 1)
            }

            return shuffleDeck
        };

        // baralho de cartas baralhado
        this.deck = this.shuffle(this.new_deck());
        //this.deck = this.new_deck();

        console.log("deck before => ", this.deck)
        this.player_move()
        console.log("desk after => ", this.deck)
        console.log("player_cards => ", this.player_cards)
    }

    // métodos
    // devolve as cartas do dealer num novo array (splice)
    get_dealer_cards() {
        return this.dealer_cards.slice();
    }

    // devolve as cartas do player num novo array (splice)
    get_player_cards() {
        return this.player_cards.slice();
    }

    // Ativa a variável booleana "dealerTurn"
    setDealerTurn (val) {
        this.dealerTurn = val;
    }

    // conta o valor das cartas do dealer ou do jogador (as que forem passadas por parametro)
    get_cards_value(cards) {
        
        // ordenar as cartas por ordem decrescente para a ultima carta a ser contabilizada seja o Ás (1)
        cards.sort().reverse()
        let cardsValue = 0;

        for(let i = 0; i < cards.length; i++) {
            // se carta estiver entre 2 a 10, adiciona o número da carta
            if(cards[i] >= 2 && cards[i] <=10 ) {
                cardsValue += cards[i]
            }
            // se for J, Q, R, adiciona 10
            else if (cards[i] >= 11 && cards[i] <= 13) {
                cardsValue += 10
            }
            //se for 1, adiciona 11 se for igual ou menor do que 21 (porque não rebenta), caso contrário adiciona 1
            else {
                soma += (soma + 10 <= 21)? 11 : 1
            }
        }

        return cardsValue;
    }

    dealer_move() {
        // adiciona primeira carta do deck às cartas do jogador
        this.dealer_cards.push(this.deck[0])

        // remove carta da primeira posição do deck
        this.deck.splice(0, 1)

        return get_game_state()
    }

    player_move() {

        // adiciona primeira carta do deck às cartas do jogador
        this.player_cards.push(this.deck[0])

        // remove carta da primeira posição do deck
        this.deck.splice(0, 1)

        return get_game_state()
    }

    get_game_state() {

        let playerCardsValue = get_cards_value(player_cards)
        let dealerCardsValue = get_cards_value(dealer_cards)

        // jogador ganha
        if( playerCardsValue == 21 || (dealerCardsValue > 21 && playerCardsValue < 21) || (dealerCardsValue == 21 && playerCardsValue == 21)) {
            this.status.gameEnded = true;
        }

        else if( dealerCardsValue == 21 || (playerCardsValue > 21 && dealerCardsValue < 21) ) {
            this.status.gameEnded = true;
            this.status.dealerWon = true;

            if(playerCardsValue > 21) {
                this.status.playerBusted = true;
            }
        }

        return this.status
    }
}

