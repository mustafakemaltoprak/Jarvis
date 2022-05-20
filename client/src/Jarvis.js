import React, { useEffect, useState } from 'react';
import './Jarvis.css';
import { useSpeechSynthesis } from 'react-speech-kit';

export default function Jarvis() {
  const [toggled, setToggled] = useState(false);
  const [degreesCelsius, setDegreesCelsius] = useState(0);
  const [joke, setJoke] = useState('Roses are blue');
  const { speak } = useSpeechSynthesis();

  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();

  useEffect(() => {
    initalWeather();
    randomJoke();
  });

  function toggle() {
    toggled ? setToggled(false) : setToggled(true);
  }

  function initalWeather() {
    fetch(
      'http://api.weatherapi.com/v1/current.json?key=140ce0a35d6c4beab4f213625221404&q=Berlin&aqi=yes'
    )
      .then((res) => res.json())
      .then((result) => result.current.temp_c)
      .then((realResult) => setDegreesCelsius(realResult));
  }

  function randomJoke() {
    fetch('http://localhost:3002/joke')
      .then((res) => res.json())
      .then((result) => result.joke)
      .then((realResult) => setJoke(realResult));
  }

  async function turnLightOn(hue, sat, bri) {
    fetch(
      // ADD YOUR PERSONAL PHILIPS HUE LIGHTS LINK HERE, CHECK READ ME FOR HELP
      process.env.PHILIPS_API_LINK,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          on: true,
          ...(sat && { sat }),
          ...(bri && { bri }),
          ...(hue && { hue }),
        }),
      }
    ).then((res) => res.json());
  }

  async function turnLightOff() {
    fetch(
      // ADD YOUR PERSONAL PHILIPS HUE LIGHTS LINK HERE, CHECK READ ME FOR HELP
      process.env.PHILIPS_API_LINK,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ on: false }),
      }
    ).then((res) => res.json());
  }

  recognition.onresult = function (event) {
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript.toLowerCase();

    // So User can see what Jarvis thought he said
    console.log(transcript);

    if (
      transcript.includes('jarvis') ||
      transcript.includes('Jarvis') ||
      transcript.includes('travis') ||
      transcript.includes('Travis') ||
      transcript.includes('java') ||
      transcript.includes('Java') ||
      transcript.includes('Chavez') ||
      transcript.includes('chavez') ||
      transcript.includes('jobs') ||
      transcript.includes('Jobs') ||
      transcript.includes('Travellers') ||
      transcript.includes('travellers')
    ) {
      if (
        (transcript.includes('lights') || transcript.includes('light')) &&
        transcript.includes('off')
      ) {
        turnLightOff();
        speak({ text: 'I turned the lights off sir' });
        return;
      } else if (
        (transcript.includes('lights') || transcript.includes('light')) &&
        transcript.includes('on')
      ) {
        turnLightOn(133, 1, 250);
        speak({ text: 'I turned the lights on sir' });
        return;
      } else if (
        (transcript.includes('lights') || transcript.includes('light')) &&
        transcript.includes('red')
      ) {
        turnLightOn(1, 250, 250);
        speak({ text: 'Your lights are now red sir' });
        return;
      } else if (
        (transcript.includes('lights') || transcript.includes('light')) &&
        transcript.includes('green')
      ) {
        turnLightOn(27306, 250, 250);
        speak({ text: 'Your lights are now green sir' });
        return;
      } else if (
        (transcript.includes('lights') || transcript.includes('light')) &&
        transcript.includes('white')
      ) {
        turnLightOn(133, 1, 250);
        speak({ text: 'Your lights are now white sir' });
        return;
      } else if (
        (transcript.includes('lights') || transcript.includes('light')) &&
        transcript.includes('blue')
      ) {
        turnLightOn(43690, 250, 250);
        speak({ text: 'Your lights are now blue sir' });
        return;
      } else if (
        (transcript.includes('lights') || transcript.includes('light')) &&
        transcript.includes('purple')
      ) {
        turnLightOn(50000, 250, 250);
        speak({ text: 'Your lights are now purple sir' });
        return;
      } else if (
        (transcript.includes('lights') || transcript.includes('light')) &&
        transcript.includes('pink')
      ) {
        turnLightOn(55000, 250, 250);
        speak({ text: 'Your lights are now pink sir' });
        return;
      } else if (transcript.includes('weather')) {
        speak({ text: `It's ${degreesCelsius} degrees in Berlin sir` });
        return;
      } else if (transcript.includes('joke')) {
        speak({ text: `${joke}` });
        return;
      } else if (
        transcript.includes('search') ||
        transcript.includes('google')
      ) {
        let toArray = transcript.split(' ');
        let searchTerm = toArray.slice(2);
        let realSearchTerm = searchTerm.join(' ');
        window.open('//' + 'google.com/search?q=' + realSearchTerm, '_blank');
        speak({ text: `these are the results for ${realSearchTerm} sir.` });
        return;
      } else if (
        transcript.includes('stop') &&
        transcript.includes('listening')
      ) {
        window.location.reload();
        return;
      }
      speak({ text: `I don't understand sir` });
    }
  };

  function startListening() {
    recognition.start();
  }

  recognition.onend = function () {
    recognition.start();
  };

  return (
    <>
      <div className="fullpage-wrapper">
        <div className="reactor-container">
          <div className="reactor-container-inner circle abs-center"></div>
          <div className="tunnel circle abs-center"></div>
          <div className="core-wrapper circle abs-center"></div>
          <div className="core-outer circle abs-center"></div>
          <div className="core-inner circle abs-center"></div>
          <div
            className={toggled === true ? 'coil-container' : 'coil-container2'}
            onClick={() => {
              toggle();
              startListening();
              speak({ text: 'Welcome back sir' });
            }}
          >
            <div className="coil coil-1"></div>
            <div className="coil coil-2"></div>
            <div className="coil coil-3"></div>
            <div className="coil coil-4"></div>
            <div className="coil coil-5"></div>
            <div className="coil coil-6"></div>
            <div className="coil coil-7"></div>
            <div className="coil coil-8"></div>
          </div>
        </div>
      </div>
    </>
  );
}
