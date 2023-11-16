import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>Criado por min mesmo !!!</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '5px',
    textAlign: 'center',
    position: 'fixed',
    bottom: '0',
    width: '100%',
  },
};

export default Footer;
