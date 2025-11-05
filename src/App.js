import background from './assets/background.jpg';
import backgroundMusic from './assets/bgm.mp3';
import photobooth from './assets/photobooth.png';
import pbStrip from './assets/photoboothStrip.png';
import rolife from './assets/rolifeCarriage.png';
import './App.css';
import React, { useState, useRef, useEffect} from 'react';

function App() {
    const [clicked, setClicked] = useState(false);
    const [position, setPosition] = useState({top: 200, left: 200});
    const [dodgeActive, setDodgeActive] = useState(false);
    const bgm = useRef(new Audio(backgroundMusic));

    const start = () => {
        bgm.current.loop = true;
        bgm.current.play();
    }

    useEffect(() => {
        const timer = setTimeout(() => setDodgeActive(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleMouseMove= (e) => {
        if (!dodgeActive) return;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const buttonWidth = 128;
        const buttonHeight = 48;

        const buttonX = position.left + buttonWidth / 2;
        const buttonY = position.top + buttonHeight / 2;

        const distance = Math.sqrt(
            (mouseX - buttonX) ** 2 + (mouseY - buttonY) ** 2
        )

        if (distance < 150) {
            const newTop = Math.random() * (window.innerHeight - 50);
            const newLeft = Math.random() * (window.innerWidth - 100);
            setPosition({top: newTop, left: newLeft}); 
        }
    };

    return (
        <div 
            className='h-screen w-screen flex items-center justify-center bg-cover bg-center'
            style={{ backgroundImage: `url(${background})`}}
        >
            <div 
                className='w-[600px] h-[400px] bg-jordy-blue rounded-lg shadow-lg relative flex flex-col items-center justify-between p-3'
                style={{
                    borderWidth: '8px',
                    borderStyle: 'solid',
                    borderImage: 'repeating-linear-gradient(45deg, white 0 10px, #ea84c9ff 0 20px) 1'
                }}
            >

                {!clicked ?  (
                    <>
                    <p className='text-white font-bold text-4xl text-center leading-loose mt-6'>
                        hi pookie ૮ ˶ᵔ ᵕ ᵔ˶ ა
                        <br />
                        ˚*•̩̩͙✩•̩̩͙*˚＊˚*•̩̩͙✩•̩̩͙*˚＊˚*•̩̩͙✩•̩̩͙*˚
                        <br />
                        are you ready for our date?
                    </p>
                    <p className='text-white font-bold text-md'>
                        p.s. you have to look at this on a computer + SOUND UP!!! ↻(𓄼 .̀  ̮.́)Ψ
                    </p>
                    <br />
                    <button 
                        onClick={() => {setClicked(true); start();}}
                        className='bg-plum-web text-white font-bold py-2 px-4 rounded-lg border-2 border-white'
                    >
                        i'm ready {'<'}3
                    </button>
                    </>
                ) : (
                    <>
                        <img
                            src={photobooth}
                            alt="top left"
                            className="absolute top-6 left-4 w-30 h-30 -rotate-12 object-contain"    
                        >
                        </img>
                        <img
                            src={pbStrip}
                            alt="top left1"
                            className="absolute top-8 left-20 w-16 h-16 -rotate-6 object-contain"    
                        >
                        </img>

                        <img
                            src={rolife}
                            alt="top right"
                            className="absolute top-2 right-4 w-32 h-32 rotate-12 object-contain"    
                        >
                        </img>

                        <p className='text-blue-900 font-bold text-sm text-center'>
                            ‿︵‿︵︵‿︵‿୨♡୧‿︵‿︵‿︵‿︵
                            <br />
                            NOW PLAYING : Kiss Kiss Shy Shy
                            <br />
                            1:06 ───ㅇ───── 2:57
                            <br />
                            ↻  ◁  II  ▷  ↺
                            <br />
                            ‿︵‿︵︵‿︵‿୨♡୧‿︵‿︵‿︵‿︵
                        </p>
                        <div className='grid grid-cols-3 gap-8 mt-auto mb-auto mr-auto ml-auto'>
                            <div>
                                <p className='text-white font-bold text-xl text-left underline'>
                                    itinerary:
                                </p>
                                <ul className='custom-bullet list-inside text-white ml-2'>
                                    <li> life4cuts</li>
                                    <li> rolife kit</li>
                                    <li> food</li>
                                    <li> then we build (˵ •̀ᴗ•́˵)و</li>
                                </ul>
                            </div>
                            <div>
                                <p className='text-white font-bold text-xl text-left underline'>
                                    location & time:
                                </p>
                                <p className='text-white text-auto text-left'>
                                    westfield valley fair mall
                                    <br />
                                    leave @ 5:30 p.m - 6:00 p.m
                                </p>
                            </div>
                            <div>
                                <p className='text-white font-bold text-xl text-left underline'>
                                    attire:
                                </p>
                                <p className='text-white text-md text-left'>
                                    something nice, same vibes as emporium cuz photobooth so i want us to look cutesy ˶ᵔ ᵕ ᵔ˶
                                </p>
                            </div>
                            
                        </div>
                        
                        <p className='text-white font-medium text-xl text-center'> do you accept? ( •̯́ ^ •̯̀)♡</p>

                        
                        <div className='flex justify-center gap-4 mt-4'>
                            <button 
                                onClick={() => console.log("yes button clicked")}
                                className='bg-plum-web text-white font-bold py-2 px-4 rounded-lg border-2 border-white object-center w-32'
                            >
                               yes {'( ˶ˆᗜˆ˵ )'}
                            </button>
                            
                            <button 
                                onClick={() => console.log("no button clicked")}
                                onMouseMove={handleMouseMove}
                                className='bg-plum-web text-white font-bold py-2 px-4 rounded-lg border-2 border-white object-center w-32'
                            >
                                no {'(˙◠˙)'}
                            </button>
                        </div>
                        
                    </>
                )}
                

            </div>
        </div>
    );
}

export default App;
