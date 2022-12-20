import React, { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { Configuration, OpenAIApi } from 'openai';

export default function Jarvis() {
  const [toggled, setToggled] = useState(false);
  const [transcript, setTranscript] = useState(
    "After clicking on Jarvis' Icon and speaking, you will see what Jarvis has understood here"
  );
  const [showButton, setShowButton] = useState(false);
  const [showText, setShowText] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [jarvisIncluded, setJarvisIncluded] = useState(true);
  const [buttonToggle, setButtonToggle] = useState(false);
  const [imageThere, setImageThere] = useState(false);
  const [imageURL, setImageURL] = useState('');

  const configuration = new Configuration({
    apiKey: `${process.env.REACT_APP_OPENAI}`,
  });
  const openai = new OpenAIApi(configuration);

  const { speak, voices } = useSpeechSynthesis();

  console.log(voices);

  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();

  function toggle() {
    toggled ? setToggled(false) : setToggled(true);
  }

  async function turnLightOn(hue, sat, bri) {
    await fetch(
      // ADD YOUR PERSONAL PHILIPS HUE LIGHTS LINK HERE, CHECK READ ME FOR HELP
      `${process.env.REACT_APP_HUE}`,
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
    await fetch(
      // ADD YOUR PERSONAL PHILIPS HUE LIGHTS LINK HERE, CHECK READ ME FOR HELP
      `${process.env.REACT_APP_HUE}`,
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

  recognition.onresult = async function (event) {
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript.toLowerCase();

    let newTranscript = transcript.replace(
      /travis|java|chavez|jobs|travellers|elvis|charles|jarvis/i,
      'Jarvis'
    );

    setTranscript(newTranscript);
    setImageThere(false);

    if (newTranscript.includes('Jarvis')) {
      setJarvisIncluded(true);
      if (
        (transcript.includes('lights') || transcript.includes('light')) &&
        transcript.includes('off')
      ) {
        turnLightOff();
        speak({ text: 'I turned the lights off sir', voice: voices[15] });
        return;
      } else if (
        (transcript.includes('lights') || transcript.includes('light')) &&
        transcript.includes('on')
      ) {
        turnLightOn(133, 1, 250);
        speak({ text: 'I turned the lights on sir', voice: voices[15] });
        return;
      } else if (
        (transcript.includes('lights') || transcript.includes('light')) &&
        transcript.includes('red')
      ) {
        turnLightOn(1, 250, 250);
        speak({ text: 'Your lights are now red sir', voice: voices[15] });
        return;
      } else if (
        (transcript.includes('lights') || transcript.includes('light')) &&
        transcript.includes('green')
      ) {
        turnLightOn(27306, 250, 250);
        speak({ text: 'Your lights are now green sir', voice: voices[15] });
        return;
      } else if (
        (transcript.includes('lights') || transcript.includes('light')) &&
        transcript.includes('white')
      ) {
        turnLightOn(133, 1, 250);
        speak({ text: 'Your lights are now white sir', voice: voices[15] });
        return;
      } else if (
        (transcript.includes('lights') || transcript.includes('light')) &&
        transcript.includes('blue')
      ) {
        turnLightOn(43690, 250, 250);
        speak({ text: 'Your lights are now blue sir', voice: voices[15] });
        return;
      } else if (
        (transcript.includes('lights') || transcript.includes('light')) &&
        transcript.includes('purple')
      ) {
        turnLightOn(50000, 250, 250);
        speak({ text: 'Your lights are now purple sir', voice: voices[15] });
        return;
      } else if (
        (transcript.includes('lights') || transcript.includes('light')) &&
        transcript.includes('pink')
      ) {
        turnLightOn(55000, 250, 250);
        speak({ text: 'Your lights are now pink sir', voice: voices[15] });
        return;
      } else if (
        transcript.includes('search') ||
        transcript.includes('google')
      ) {
        let toArray = transcript.split(' ');
        let searchTerm = toArray.slice(2);
        let realSearchTerm = searchTerm.join(' ');
        window.open('//google.com/search?q=' + realSearchTerm, '_blank');
        speak({
          text: `these are the results for ${realSearchTerm} sir.`,
          voice: voices[15],
        });
        return;
      } else if (transcript.includes('image')) {
        let imageString = newTranscript.replace('Jarvis', '');
        const openai = new OpenAIApi(configuration);
        speak({
          text: 'Coming right away sir, please give me a moment to create your image.',
          voice: voices[15],
        });
        const response = await openai.createImage({
          prompt: `${imageString}`,
          n: 1,
          size: '1024x1024',
        });
        setShowText(false);
        setShowButton(false);
        setImageURL(response.data.data[0].url);
        setImageThere(true);
        speak({
          text: 'The image is finished, I hope you are happy with the result.',
          voice: voices[15],
        });
        return;
      } else if (
        transcript.includes('stop') &&
        transcript.includes('listening')
      ) {
        window.location.reload();
        return;
      }
      let aiTranscript = newTranscript.replace('Jarvis', '');
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${aiTranscript}`,
        max_tokens: 2048,
        temperature: 0,
      });
      setAiResponse(response.data.choices[0].text);
      setShowButton(true);
      speak({ text: `${response.data.choices[0].text}`, voice: voices[15] });
    } else {
      setJarvisIncluded(false);
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
              speak({ text: 'Welcome back sir', voice: voices[15] });
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
        <p className="jarvis-understanding">{transcript}</p>
        {!jarvisIncluded && (
          <p className="jarvis-error">
            Please include the word 'Jarvis' in your command
          </p>
        )}
        <div className="responseParent">
          {showButton && !buttonToggle ? (
            <button
              onClick={() => {
                setShowText(true);
                setButtonToggle(!buttonToggle);
              }}
              className="aiButton"
            >
              Click here to show Jarvis' reply in text
            </button>
          ) : !showButton ? (
            <></>
          ) : !jarvisIncluded ? (
            <></>
          ) : (
            <button
              onClick={() => {
                setShowText(false);
                setButtonToggle(!buttonToggle);
              }}
              className="aiButton"
            >
              Click here to hide Jarvis' text reply
            </button>
          )}
        </div>
        {imageThere && (
          <div className="responseParent">
            <button
              onClick={() => {
                window.open(`${imageURL}`);
              }}
              className="aiButton"
            >
              Click here to see your AI created image
            </button>
          </div>
        )}
        {showText && jarvisIncluded ? (
          <div className="responseParent">
            <p className="aiResponse">{aiResponse}</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
