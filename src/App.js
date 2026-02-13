import background from './assets/background.jpg';
import backgroundMusic from './assets/bgm.mp3';
import './App.css';
import React, { useState, useRef, useEffect} from 'react';

function App() {
    const [clicked, setClicked] = useState(false);
    const [clickedYes, setClickedYes] = useState(false);
    const [dodgeActive, setDodgeActive] = useState(false);
    const [size, setSize] = useState(1);
    const bgm = useRef(new Audio(backgroundMusic));
    const buttonRef = useRef(null);

    const start = () => {
        bgm.current.loop = true;
        bgm.current.play();

        setTimeout(() => {
            setDodgeActive(true);
        }, 5000);
    }

    const handleNoClick = () => {
        setSize(prev => Math.min(4, prev + 0.2));
    };
    const handleYesClick = () => {
        setClickedYes(true);
    };

    // change button position
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!dodgeActive || !buttonRef.current) return;

            const button = buttonRef.current.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const buttonX = button.left + button.width / 2;
            const buttonY = button.top + button.height / 2;

            const distance = Math.hypot(mouseX - buttonX, mouseY - buttonY);

            if (distance < 250) {
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
                        you know the drill ↻(𓄼 .̀  ̮.́)Ψ
                    </p>
                    <p className='text-white font-bold text-md'>
                        p.s. you have to look at this on a computer + SOUND UP!!!
                    </p>
                    <br />
                    <button 
                        onClick={() => {setClicked(true); start();}}
                        className='bg-plum-web text-white font-bold py-2 px-4 rounded-lg border-2 border-white mb-16'
                    >
                        i'm ready {'<'}3
                    </button>
                    </>
                ) : !clickedYes ? (
                        <>
                            <p className='text-blue-900 font-bold text-sm text-center'>
                                ‿︵‿︵︵‿︵‿୨♡୧‿︵‿︵‿︵‿︵
                                <br />
                                NOW PLAYING : Love Me Back
                                <br />
                                1:06 ───ㅇ───── 3:06
                                <br />
                                ↻  ◁  II  ▷  ↺
                                <br />
                                ‿︵‿︵︵‿︵‿୨♡୧‿︵‿︵‿︵‿︵
                            </p>
                            
                            <p className='text-white font-bold text-5xl text-center'> will you be my valentine? ( •̯́ ^ •̯̀)♡</p>

                            
                            <div className='relative flex justify-center gap-4 mt-4 w-full'>
                                <button 
                                    onClick={() => {handleYesClick()}}
                                    className='bg-plum-web text-white font-bold py-2 px-4 rounded-lg border-2 border-white object-center w-32'
                                    style={{
                                        transform: `scale(${size})`,
                                        transition: 'transform 0.2s',
                                    }}
                                >
                                yes {'( ˶ˆᗜˆ˵ )'}
                                </button>
                                
                                <button 
                                    ref={buttonRef}
                                    onClick={() => {handleNoClick()}}
                                    className='bg-plum-web text-white font-bold py-2 px-4 rounded-lg border-2 border-white object-center w-32'
                                    style={{
                                        transform: `scale(${1 / size})`,
                                        transition: 'transform 0.2s',
                                    }}
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
                            now pls text 'you are the bestest girlfriend in the whole wide world' to notify me that you 
                            have clicked yes
                        </p>
                    </>
                )}
                

            </div>
        </div>
    );
}

export default App;
