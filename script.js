var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var hasBlackjack = function (player) {
  console.log("player is", player);
  console.log("player hand is is", player.hand);
  var card1Value = player.hand[0].value;
  var card2Value = player.hand[1].value;
  if (
    [card1Value, card2Value].includes(1) & [card1Value, card2Value].includes(10)
  ) {
    return true;
  } else {
    return false;
  }
};

var calculateHand = function (player) {
  cardTotal = 0;
  hasAce = false;
  for (var x = 0; x < player.hand.length; x++) {
    var currentCard = player.hand[x];
    if (currentCard.value == 1) {
      hasAce = true;
    }
    cardTotal += currentCard.value;
    console.log("cardtotal is", cardTotal);
  }
  if (hasAce) {
    if (cardTotal + 10 > 21) {
      console.log("cardtotal is", cardTotal);
      return cardTotal;
    } else {
      console.log("cardtotal is", cardTotal);
      cardTotal += 10;
      return cardTotal;
    }
  }
  return cardTotal;
};

var checkInitialDeal = function () {
  // Check if dealer has Blackjack
  var dealer = playerList[playerList.length - 1];
  console.log("dealer is", dealer);
  console.log("dealer's hand is", dealer.hand);
  var dealerHasBlackjack = hasBlackjack(dealer);

  if (dealerHasBlackjack) {
    // Set gameState to GAME_STATE_END
    gameState = GAME_STATE_END;
    // Dealer set to PLAYER_STATUS_WIN
    dealer.status = PLAYER_STATUS_WIN;
    // If any other player has Blackjack, set PLAYER_STATUS_TIE else set PLAYER_STATUS_LOSE
    for (var x = 0; x < playerList.length - 1; x++) {
      var player = playerList[x];
      var playerHasBlackjack = hasBlackjack(player);
      if (playerHasBlackjack) {
        player.status = PLAYER_STATUS_TIE;
        player.handTotal = 21;
      } else {
        player.status = PLAYER_STATUS_LOSE;
        player.handTotal = calculateHand(player);
      }
    }
    return "The cards have been dealt and the dealer has Blackjack. Click submit to see results";
  } else {
    // Loop through the entire playerList and set anyone with Blackjack to PLAYER_STATUS_WIN
    for (var x = 0; x < playerList.length - 1; x++) {
      var player = playerList[x];
      var playerHasBlackjack = hasBlackjack(player);
      if (playerHasBlackjack) {
        player.status = PLAYER_STATUS_WIN;
        player.handTotal = 21;
      } else {
        player.handTotal = calculateHand(player);
      }
    }
    // Check if any players with PLAYER_STATUS_WAITING
    for (var x = 0; x < playerList.length - 1; x++) {
      // loop all except dealer
      if (playerList[x].status == PLAYER_STATUS_WAITING) {
        currentPlayerIndex = x;
        player.status = PLAYER_STATUS_TURN;
        gameState = GAME_STATE_PLAYERTURN;
        return `The cards have been dealt. ${player.name} will begin first; ${player.name}'s total is currently ${player.handTotal}. Would you like to hit or stand?`;
      } else {
        gameState = GAME_STATE_END;
        return "The cards have been dealt. Everyone has a Blackjack. Click submit to calculate score";
      }
    }
  }
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
      var cardValue = rankCounter;
      // if rank is 1, 11, 12, or 13, set cardName to ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
        cardValue = 1;
      } else if (cardName == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName == "queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName == "king";
        cardValue = 10;
      }

      // Create new card with name suit and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
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
  var dealtCard = currentDeck.pop();
  console.log("dealt card is", dealtCard);
  return dealtCard;
};

var createPlayerList = function (numOfPlayers) {
  // Initialize empty player array
  var playerList = [];
  for (let x = 0; x <= numOfPlayers; x++) {
    if (x < numOfPlayers) {
      var player = {
        name: `Player ${x + 1}`,
      };
    } else {
      var player = {
        name: PLAYER_NAME_DEALER,
      };
    }
    player.hand = [];
    player.handTotal = 0;
    player.status = PLAYER_STATUS_WAITING;
    playerList.push(player);
  }
  return playerList;
};

var initialDeal = function () {
  // Create a brand new deck
  currentDeck = makeDeck();

  for (var x = 0; x < 2; x++) {
    // Deal cards by looping through player list and dealer twice
    for (var y = 0; y < playerList.length; y++) {
      var currentCard = dealCard();
      console.log(playerList[y].name, "is receiving", currentCard);
      console.log(
        playerList[y].name,
        "'s hand is currently",
        playerList[y].hand
      );
      playerList[y].hand.push(currentCard);
    }
  }
  console.log(
    playerList[0].name,
    "has this hand after initial deal",
    playerList[0].hand
  );

  message = checkInitialDeal();
  return message;
};

var dealerActions = function () {};

var hit = function () {
  var newCard = dealCard();
  var currentPlayer = playerList[currentPlayerIndex];
  currentPlayer.hand.push(newCard);
  var handTotal = calculateHand(currentPlayer);
  if (handTotal > 21) {
    // change to PLAYER_STATUS_LOSE and change players
  } else if (handTotal == 21) {
    // change to PLAYER_STATUS_WIN and change players
  } else {
    // remain same status and same player
  }
};

var stand = function () {};

var PLAYER_STATUS_WAITING = "Player is currently waiting";
var PLAYER_STATUS_WIN = "Player has won";
var PLAYER_STATUS_LOSE = "Player has lost";
var PLAYER_STATUS_TIE = "Player has tied";
var PLAYER_STATUS_STAND = "Player's turn has ended";
var PLAYER_STATUS_TURN = "Player is taking their turn";

var GAME_STATE_SETPLAYERS = "Choose number of players";
var GAME_STATE_START = "Game Start";
var GAME_STATE_PLAYERTURN = "Player's Turn";
var GAME_STATE_DEALERTURN = "Dealer Turn";
var GAME_STATE_END = "End of Game";
var gameState = GAME_STATE_SETPLAYERS;

var PLAYER_NAME_DEALER = "Dealer";

var currentPlayerIndex = "None";
var currentDeck = makeDeck();
var playerList = [];

var main = function (input) {
  // Check game state
  if (gameState == GAME_STATE_SETPLAYERS) {
    console.log(gameState);
    playerList = createPlayerList(input); // TODO validation for player number input
    gameState = GAME_STATE_START;
    return `You have entered ${input}.<br>
    The game will begin with ${input} players<br>
    Press submit again to deal cards`;
  } else if (gameState == GAME_STATE_START) {
    // Perform initial deal of two cards to each player and dealer
    var outputMessage = initialDeal();
    return outputMessage;
  } else if (gameState == GAME_STATE_PLAYERTURN) {
    // If hit,
    if (input == "hit") {
      outputMessage = hit();
      return outputMessage;
    }
    // deal card and calculate score after hit
    // Check whose turn it is
  }
};

// Compare cards to see if dealer / player wins immediately
// If nobody wins, players choose to hit or stand one by one
// Check win condition for every player every time they hit
// After al players' turn, dealer hits under hit condition is satisfied
// Finally compare remaining players and dealer cards to determine win / loss

// Check win condition after every hit
// var myOutputValue = "hello world";
// return myOutputValue;
