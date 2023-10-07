import { useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { initGame } from './initGame';

const GlobalStyle = createGlobalStyle<{ dark: boolean }>`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', 'Roboto', sans-serif;
  }
  body {
    background-color: ${props => (props.dark ? 'black' : 'white')};
  }
  img {
    object-fit: contain;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-image: linear-gradient( 90.2deg,  rgba(79,255,255,1) 0.3%, rgba(0,213,255,1) 99.8% );
  border: 5px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const renderer = initGame()

    const resizeScene = () => renderer.setSize(window.innerWidth-100, window.innerHeight-100)
    window.addEventListener("resize", resizeScene)
    wrapperRef.current.appendChild(renderer.domElement);

    return () => removeEventListener("resize", resizeScene)
  }, []);


  return (
    <>
      <GlobalStyle dark />
      <h1 style={{ fontSize: "2rem", position: "absolute", left: 80, top: 80 }}>Змейка нах</h1>
      <Wrapper>
        <div ref={wrapperRef}></div>
      </Wrapper>
    </>
  );
};

export default App;
