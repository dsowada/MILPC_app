import { useEffect, useMemo, useState } from 'react'
import piccoloQuestions from './data/piccolo.json'
import deepQuestions from './data/deep.json'
import gameQuestions from './data/games.json'
import ruleQuestions from './data/rules.json'
import GamePage from './pages/GamePage'
import StartPage from './pages/StartPage'

const STORAGE_KEY = 'party-game-players'
const emptyPlayers = ['', '', '', '']

const modeLabels = {
  piccolo: 'Piccolo',
  deep: 'Deep Talk',
  mixed: 'Mixed',
}

const MIXED_MIN_PARTY_PER_DEEP = 4
const MIXED_MAX_PARTY_PER_DEEP = 8
const GAME_CARD_INTERVAL = 5
const MIN_RULE_CARD_INTERVAL = 10
const MAX_RULE_CARD_INTERVAL = 15

function shuffle(items) {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }

  return shuffled
}

function getStoredPlayers() {
  try {
    const storedPlayers = JSON.parse(localStorage.getItem(STORAGE_KEY))

    if (Array.isArray(storedPlayers)) {
      return [...storedPlayers, ...emptyPlayers].slice(0, 4)
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY)
  }

  return emptyPlayers
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getMixedQuestionPool() {
  const partyPerDeep = getRandomInteger(
    MIXED_MIN_PARTY_PER_DEEP,
    MIXED_MAX_PARTY_PER_DEEP,
  )
  const deepQuestionCount = Math.max(1, Math.ceil(piccoloQuestions.length / partyPerDeep))

  return [
    ...piccoloQuestions,
    ...shuffle(deepQuestions).slice(0, deepQuestionCount),
  ]
}

function includesSpecialCards(mode) {
  return mode === 'piccolo' || mode === 'mixed'
}

function getQuestionPool(mode) {
  if (mode === 'piccolo') {
    return piccoloQuestions
  }

  if (mode === 'deep') {
    return deepQuestions
  }

  return getMixedQuestionPool()
}

function pickPlayer(names, exceptName) {
  const availableNames = names.filter((name) => name !== exceptName)
  const pool = availableNames.length > 0 ? availableNames : names

  return pool[Math.floor(Math.random() * pool.length)]
}

function fillPlaceholders(text, playerNames) {
  const player1 = pickPlayer(playerNames)
  const player2 = pickPlayer(playerNames, player1)

  return text.replaceAll('{player1}', player1).replaceAll('{player2}', player2)
}

function addQuestionIds(questions) {
  return questions.map((question, index) => ({
    ...question,
    id: `${question.type}-${index}-${question.text}`,
  }))
}

function insertSpecialCards(questions) {
  const deck = []
  const games = shuffle(addQuestionIds(gameQuestions))
  const rules = shuffle(addQuestionIds(ruleQuestions))
  let gameIndex = 0
  let ruleIndex = 0
  let nextRuleAt = getRandomInteger(MIN_RULE_CARD_INTERVAL, MAX_RULE_CARD_INTERVAL)

  questions.forEach((question, index) => {
    const questionNumber = index + 1

    deck.push(question)

    if (questionNumber % GAME_CARD_INTERVAL === 0 && gameIndex < games.length) {
      deck.push(games[gameIndex])
      gameIndex += 1
    }

    if (questionNumber === nextRuleAt && ruleIndex < rules.length) {
      deck.push(rules[ruleIndex])
      ruleIndex += 1
      nextRuleAt += getRandomInteger(MIN_RULE_CARD_INTERVAL, MAX_RULE_CARD_INTERVAL)
    }
  })

  return deck
}

function buildDeck(questions, previousQuestionId, includeSpecialCards = false) {
  const questionsDeck = shuffle(addQuestionIds(questions))
  const deck = includeSpecialCards ? insertSpecialCards(questionsDeck) : questionsDeck

  if (deck.length > 1 && deck[0].id === previousQuestionId) {
    deck.push(deck.shift())
  }

  return deck
}

function App() {
  const [players, setPlayers] = useState(getStoredPlayers)
  const [mode, setMode] = useState('piccolo')
  const [screen, setScreen] = useState('start')
  const [deck, setDeck] = useState([])
  const [cardIndex, setCardIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(null)

  const activePlayers = useMemo(
    () => players.map((player) => player.trim()).filter(Boolean),
    [players],
  )

  const canStart = activePlayers.length > 0

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(players))
  }, [players])

  function handlePlayerChange(index, value) {
    setPlayers((currentPlayers) =>
      currentPlayers.map((player, playerIndex) =>
        playerIndex === index ? value : player,
      ),
    )
  }

  function setRenderedQuestion(question) {
    setCurrentQuestion({
      ...question,
      text: fillPlaceholders(question.text, activePlayers),
    })
  }

  function startGame() {
    if (!canStart) {
      return
    }

    const nextDeck = buildDeck(getQuestionPool(mode), undefined, includesSpecialCards(mode))
    setDeck(nextDeck)
    setCardIndex(0)
    setRenderedQuestion(nextDeck[0])
    setScreen('game')
  }

  function advanceCard() {
    const nextIndex = cardIndex + 1

    if (nextIndex < deck.length) {
      setCardIndex(nextIndex)
      setRenderedQuestion(deck[nextIndex])
      return
    }

    const previousQuestionId = deck[cardIndex]?.id
    const nextDeck = buildDeck(getQuestionPool(mode), previousQuestionId, includesSpecialCards(mode))
    setDeck(nextDeck)
    setCardIndex(0)
    setRenderedQuestion(nextDeck[0])
  }

  function resetGame() {
    setScreen('start')
    setDeck([])
    setCardIndex(0)
    setCurrentQuestion(null)
  }

  if (screen === 'game' && currentQuestion) {
    return (
      <GamePage
        modeLabel={modeLabels[mode]}
        onNext={advanceCard}
        onReset={resetGame}
        onSkip={advanceCard}
        progress={`${cardIndex + 1}/${deck.length}`}
        question={currentQuestion}
      />
    )
  }

  return (
    <StartPage
      canStart={canStart}
      mode={mode}
      onModeChange={setMode}
      onPlayerChange={handlePlayerChange}
      onStart={startGame}
      players={players}
    />
  )
}

export default App
