import React from 'react';
import A from '../assets/a.jpg';
import B from '../assets/B.jpeg';
import C from '../assets/C.jpg';
import D from '../assets/D.jpg';
import E from '../assets/E.webp';
import F from '../assets/F.jpg';
import G from '../assets/G.jpg';
import H from '../assets/H.jpg';
import I from '../assets/I.jpg';
import J from '../assets/j.jpg';
import K from '../assets/K.jpg';
import L from '../assets/L.jpg';
import M from '../assets/M.jpg';
import N from '../assets/N.jpg';
import O from '../assets/O.jpg';
import P from '../assets/P.jpg';
import Q from '../assets/Q.jpg';
import R from '../assets/R.jpg';
import S from '../assets/S.jpg';
import T from '../assets/T.jpg';
import U from '../assets/U.jpg';
import V from '../assets/V.jpg';
import W from '../assets/W.jpeg';
import X from '../assets/X.jpg';
import Y from '../assets/Y.jpg';
import Z from '../assets/Z.jpg';
const AlphabetGrid = () => {
  const alphabets = [
    { letter: 'A', image: A },
    { letter: 'B', image: B },
    { letter: 'C', image: C },
    { letter: 'D', image: D },
    { letter: 'E', image: E },
    { letter: 'F', image: F },
    { letter: 'G', image: G },
    { letter: 'H', image: H },
    { letter: 'I', image: I },
    { letter: 'J', image: J },
    { letter: 'K', image: K },
    { letter: 'L', image: L },
    { letter: 'M', image: M },
    { letter: 'N', image: N },
    { letter: 'O', image: O },
    { letter: 'P', image: P },
    { letter: 'Q', image: Q },
    { letter: 'R', image: R },
    { letter: 'S', image: S },
    { letter: 'T', image: T },
    { letter: 'U', image: U },
    { letter: 'V', image: V },
    { letter: 'W', image: W },
    { letter: 'X', image: X },
    { letter: 'Y', image: Y },
    { letter: 'Z', image: Z },
  ];

  return (
    <section className="container-2 max-w-6xl mx-auto text-center py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">Alphabets</h2>
      <div className="row grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-5">
        {alphabets.map(({ letter, image }) => (
          <div key={letter} className="aplha relative overflow-hidden rounded-lg">
            <img
              src={image}
              alt={`ASL letter ${letter}`}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <div className="layer absolute inset-0 border border-orange-600 rounded-lg hover:bg-orange-400 hover:bg-opacity-70 transition duration-500">
              <h2 className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-6xl font-semibold text-white opacity-0 hover:opacity-100 hover:bottom-1/2 hover:transform hover:-translate-y-1/2 transition duration-500">
                {letter}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AlphabetGrid;