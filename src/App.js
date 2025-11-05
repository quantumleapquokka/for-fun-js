import background from './assets/background.jpg';
import backgroundMusic from './assets/bgm.mp3';
import photobooth from './assets/photobooth.png';
import pbStrip from './assets/photoboothStrip.png';
import rolife from './assets/rolifeCarriage.png';
import './App.css';
import React, { useState, useRef, useEffect} from 'react';

function App() {
    const [clicked, setClicked] = useState(false);
    const [clickedYes, setClickedYes] = useState(false);
    const [position, setPosition] = useState({top: 200, left: 200});
    const [dodgeActive, setDodgeActive] = useState(false);
    const bgm = useRef(new Audio(backgroundMusic));
    const buttonRef = useRef(null);

    const start = () => {
        bgm.current.loop = true;
        bgm.current.play();
    }

    useEffect(() => {
        const timer = setTimeout(() => setDodgeActive(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!dodgeActive || !buttonRef.current) return;

            const button = buttonRef.current.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const buttonX = button.left + button.width / 2;
            const buttonY = button.top + button.height / 2;

            const distance = Math.hypot(mouseX - buttonX, mouseY - buttonY);

            if (distance < 150) {
                const angle = Math.atan2(buttonY - mouseY, buttonX - mouseX);
                const moveX = Math.cos(angle) * 150;
                const moveY = Math.sin(angle) * 150;

                let newLeft = button.left + moveX;
                let newTop = button.top + moveY;

                const padding = 20; // prevent clipping offscreen
                const maxLeft = window.innerWidth - button.width - padding;
                const maxTop = window.innerHeight - button.height - padding;
                const minLeft = padding;
                const minTop = padding;

                newLeft = Math.min(maxLeft, Math.max(minLeft, newLeft));
                newTop = Math.min(maxTop, Math.max(minTop, newTop));

                buttonRef.current.style.position = "fixed"; // fixed to viewport
                buttonRef.current.style.left = `${newLeft}px`;
                buttonRef.current.style.top = `${newTop}px`;
                buttonRef.current.style.transition = "left 0.2s, top 0.2s";
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [dodgeActive]);

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
                ) : !clickedYes ? (
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

                            
                            <div className='relative flex justify-center gap-4 mt-4 w-full'>
                                <button 
                                    onClick={() => {console.log("yes button clicked"); setClickedYes(true);}}
                                    className='bg-plum-web text-white font-bold py-2 px-4 rounded-lg border-2 border-white object-center w-32'
                                >
                                yes {'( ˶ˆᗜˆ˵ )'}
                                </button>
                                
                                <button 
                                    ref={buttonRef}
                                    onClick={() => console.log("no button clicked")}
                                    className='bg-plum-web text-white font-bold py-2 px-4 rounded-lg border-2 border-white object-center w-32'
                                >
                                    no {'(˙◠˙)'}
                                </button>
                            </div>
                            
                        </>
                ) : (
                    <>
                        <p className='text-white font-medium text-6xl text-center pt-32'> 
                            Yay ♡⸜(˶˃ ᵕ ˂˶)⸝♡
                        </p>
                        <p className='text-white font-medium text-xl text-center pb-6'>
                            now pls text 'rainbow cats are farting poop' to notify me that you 
                            have clicked yes bc idk how to implement some auto texting thing
                            nor do i care enough to learn
                        </p>
                    </>
                )}
                

            </div>
        </div>
    );
}

export default App;
