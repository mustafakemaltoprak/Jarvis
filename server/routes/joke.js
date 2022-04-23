const router = require('express').Router();
let jokeArray = [
  'How many programmers does it take to change a light bulb? None. Its a hardware problem.',
  'There are only 10 kinds of people in this world: those who know binary and those who don’t.',
  'Programming is 10% science, 20% ingenuity, and 70% getting the ingenuity to work with the science.',
  'There are three kinds of lies: Lies, damned lies, and benchmarks.',
  'The generation of random numbers is too important to be left to chance.',
  'Knock, knock. Who is there? very long pause. Java.',
];

// GET

router.route('/').get((req, res) => {
  res.send({
    joke: `${jokeArray[Math.floor(Math.random() * jokeArray.length)]}`,
  });
});

module.exports = router;
