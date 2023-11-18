import React from 'react';
import '../assets/css/footer.css'
const Footer = () => {
  return (
    <footer  style={styles.footer}>
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
    position: 'relative',
    display:'block',
    bottom: '0',
    left:'0',
    width: '100%',
    alignSelf: 'flex-end'
  },
};

export default Footer;
