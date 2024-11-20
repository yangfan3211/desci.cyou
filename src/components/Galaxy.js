import styled from 'styled-components';

// Styled components for the global styles
const GlobalStyles = styled.div`
  html, body {
    background: #112;
    color: #fff;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

// Styled component for the scene
const SceneContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
`;

// React component
const Galaxy = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <SceneContainer id="scene">
        {children}
      </SceneContainer>
    </>
  );
};

export default Galaxy;
