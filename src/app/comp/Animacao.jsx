import React from 'react';

const SPANS = [
  { color: '#574cd5', top: '18%', left: '14%', duration: '61s', delay: '-217s', origin: '23vw -15vh', shadow: '5.091vmin', dir: '-' },
  { color: '#ffa500', top: '33%', left: '8%', duration: '39s', delay: '-7s', origin: '5vw -12vh', shadow: '5.934vmin', dir: '' },
  { color: '#f3f4f6', top: '89%', left: '57%', duration: '240s', delay: '-46s', origin: '12vw 22vh', shadow: '5.877vmin', dir: '' },
  { color: '#574cd5', top: '89%', left: '49%', duration: '199s', delay: '-91s', origin: '0vw -22vh', shadow: '5.488vmin', dir: '-' },
  { color: '#574cd5', top: '73%', left: '48%', duration: '73s', delay: '-83s', origin: '16vw -24vh', shadow: '5.530vmin', dir: '-' },
  { color: '#f3f4f6', top: '29%', left: '60%', duration: '16s', delay: '-122s', origin: '14vw 22vh', shadow: '5.694vmin', dir: '-' },
  { color: '#574cd5', top: '49%', left: '77%', duration: '133s', delay: '-149s', origin: '-20vw -5vh', shadow: '5.739vmin', dir: '-' },
  { color: '#f3f4f6', top: '37%', left: '58%', duration: '214s', delay: '-65s', origin: '-13vw 5vh', shadow: '5.580vmin', dir: '-' },
  { color: '#ffa500', top: '9%', left: '54%', duration: '221s', delay: '-105s', origin: '1vw -19vh', shadow: '5.130vmin', dir: '-' },
  { color: '#ffa500', top: '12%', left: '16%', duration: '150s', delay: '-27s', origin: '-7vw 0vh', shadow: '5.693vmin', dir: '' },
  { color: '#574cd5', top: '24%', left: '57%', duration: '232s', delay: '-86s', origin: '25vw 6vh', shadow: '5.984vmin', dir: '' },
  { color: '#f3f4f6', top: '13%', left: '40%', duration: '157s', delay: '-185s', origin: '7vw -10vh', shadow: '5.170vmin', dir: '' },
  { color: '#574cd5', top: '95%', left: '51%', duration: '215s', delay: '-89s', origin: '-13vw -23vh', shadow: '5.845vmin', dir: '-' },
  { color: '#574cd5', top: '2%', left: '48%', duration: '29s', delay: '-103s', origin: '-7vw 10vh', shadow: '5.272vmin', dir: '' },
  { color: '#574cd5', top: '44%', left: '4%', duration: '219s', delay: '-142s', origin: '-21vw 3vh', shadow: '5.885vmin', dir: '' },
  { color: '#574cd5', top: '78%', left: '98%', duration: '100s', delay: '-211s', origin: '24vw 6vh', shadow: '5.368vmin', dir: '' },
  { color: '#574cd5', top: '44%', left: '33%', duration: '174s', delay: '-77s', origin: '4vw -7vh', shadow: '5.834vmin', dir: '' },
  { color: '#f3f4f6', top: '7%', left: '17%', duration: '10s', delay: '-108s', origin: '-9vw 24vh', shadow: '5.541vmin', dir: '' },
  { color: '#ffa500', top: '54%', left: '9%', duration: '91s', delay: '-221s', origin: '20vw -17vh', shadow: '5.621vmin', dir: '-' },
  { color: '#ffa500', top: '80%', left: '1%', duration: '139s', delay: '-167s', origin: '-16vw -19vh', shadow: '5.960vmin', dir: '-' },
  { color: '#f3f4f6', top: '86%', left: '69%', duration: '144s', delay: '-225s', origin: '8vw -6vh', shadow: '5.041vmin', dir: '-' },
  { color: '#ffa500', top: '76%', left: '37%', duration: '189s', delay: '-114s', origin: '4vw -21vh', shadow: '5.922vmin', dir: '-' },
  { color: '#f3f4f6', top: '53%', left: '1%', duration: '199s', delay: '-198s', origin: '-3vw 11vh', shadow: '5.421vmin', dir: '' },
  { color: '#574cd5', top: '23%', left: '4%', duration: '86s', delay: '-61s', origin: '-18vw -23vh', shadow: '5.274vmin', dir: '-' },
  { color: '#f3f4f6', top: '51%', left: '54%', duration: '42s', delay: '-145s', origin: '-16vw -20vh', shadow: '5.396vmin', dir: '-' },
  { color: '#ffa500', top: '82%', bottom: '86%', duration: '159s', delay: '-125s', origin: '10vw -17vh', shadow: '5.452vmin', dir: '' },
  { color: '#574cd5', top: '52%', bottom: '40%', duration: '73s', delay: '-115s', origin: '-15vw 13vh', shadow: '5.207vmin', dir: '' },
  { color: '#ffa500', top: '97%', bottom: '28%', duration: '229s', delay: '-190s', origin: '-8vw -20vh', shadow: '5.818vmin', dir: '-' },
  { color: '#574cd5', top: '64%', bottom: '85%', duration: '92s', delay: '-123s', origin: '21vw -4vh', shadow: '5.503vmin', dir: '-' },
];

const Animacao = () => {
  return (
    <div className="fixed inset-0 bg-[#101828] overflow-hidden z-[-1]">
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-100vh);
              opacity: 0.2;
            }
            100% {
              transform: translateY(100vh);
              opacity: 1;
            }
          }
        `}
      </style>

      {SPANS.map((s, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            width: '0.3vmin',        
            height: '30vmin',         
            backgroundColor: s.color,
            top: '0%',                 
            left: s.left,
            animation: `fall ${s.duration} linear infinite`,
            animationDelay: s.delay,
            opacity: 0.5,
            boxShadow: `0 0 ${s.shadow} ${s.color}`,
            borderRadius: '1px',
          }}
        />
      ))}
    </div>
  );
};

export default Animacao;