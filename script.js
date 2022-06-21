var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  // Loop over current card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select card corresponding to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of card
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex += 1;
  }
  // Return shuffled deck
  return cardDeck;
};

var makeDeck = function () {
  // Initialize empty deck array
  var cardDeck = [];

  // Initialize array of suits to loop over
  var suits = ["hearts", "diamonds", "spades", "clubs"];

  // Loop over suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store current suit in variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for given suit
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      // if rank is 1, 11, 12, or 13, set cardName to ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName == "queen";
      } else if (cardName == 13) {
        cardName == "king";
      }

      // Create new card with name suit and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add new card to deck
      cardDeck.push(card);

      // Increment rankCounter
      rankCounter += 1;
    }

    //Increment suit index
    suitIndex += 1;
  }

  cardDeck = shuffleCards(cardDeck);

  // Return the completed card deck
  return cardDeck;
};

var dealCard = function () {
  return currentDeck.pop();
};

var initialDeal = function () {
  // Create empty arrays to represent hands of every player and dealer and append to allHands
  for (var x = 0; x <= numOfPlayers; x++) {
    allHands.push([]);
  }

  for (var x = 0; x < 2; x++) {
    playerIndex = 0;
    // Deal cards by looping through player list and dealer twice
    while (playerIndex <= numOfPlayers) {
      var currentCard = dealCard();
      allHands[playerIndex].push(currentCard);
      // Increment playerIndex by 1
      playerIndex += 1;
    }
  }
};

var checkWinCondition = function (userHand) {
  if (userHand > 21) {
    return WIN_CONDITION_LOSE;
  } else if (userHand == 21) {
    return WIN_CONDITION_WIN;
  } else if (userHand < 21) {
    return WIN_CONDITION_STAND;
  }
};

var dealerActions = function () {};

var hit = function () {};

var stand = function () {};

var winCondtion = "";
var WIN_CONDITION_WIN = "Win";
var WIN_CONDITION_LOSE = "Lose";
var WIN_CONDITION_STAND = "Stand";
var userCards = [];
var dealerCards = [];
var currentDeck = makeDeck();
var allHands = [];
var numOfPlayers = 1;

var main = function (input) {
  // Deal two cards to each player and dealer

  // Compare cards to see if dealer / player wins immediately
  // If nobody wins, players choose to hit or stand one by one
  // Check win condition for every player every time they hit
  // After al players' turn, dealer hits under hit condition is satisfied
  // Finally compare remaining players and dealer cards to determine win / loss

  // Check win condition after every hit
  var myOutputValue = "hello world";
  return myOutputValue;
};
