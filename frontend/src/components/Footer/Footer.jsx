import React from 'react'
import './Footer.css';
function Footer() {
  return (
    <footer>
        <div className='footer-container' id="contact-section">
            <hr className='divider' id="contact-divider"/>
            <h1>Contact Us</h1>
            <div className='footer-content'>
                <div className='footer-section about'>
                    <h2>About Us</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur iste debitis ad, cumque ea enim atque nemo labore repellat nisi explicabo, numquam omnis velit iusto expedita aliquam eaque recusandae laudantium.</p>
                </div>
                <div className='footer-section contact'>
                    <div className='link'>
                        <p>Social Media: </p>
                        <a href="https://wa.me/9826636250"
                            target='_blank'
                            rel='noopener noreferrer'><img src="assets/whatsapp.png" alt="Whatsapp" className='link logo'/></a>
                        <a href="https://www.instagram.com/aryanmusicacademy/"
                            target='_blank'
                            rel='noopener noreferrer'><img src="assets/instagram.png" alt="Instagram" className='link logo'/></a>
                        <a href="https://www.youtube.com/@aryanmusicacademy4986"
                            target='_blank'
                            rel='noopener noreferrer'><img src="assets/youtube.png" alt="Youtube" className='link logo'/></a>
                    </div>
                    {/* <p>Whatsapp:
                        <a
                        href="https://wa.me/9826636250"
                        target='_blank'
                        rel='noopener noreferrer'>
                            Click to chat
                        </a>
                    </p> */}
                    <p>Phone: +91 9826636250</p>
                    <p>Address: 98, Ravindra Nagar, Near Sethi Nagar, Ujjain</p>
                </div>
            </div>
            <div className='footer-bottom'>
                    &copy; 2024 Aryan Music Academy . All rights reserved.
            </div>
        </div>
    </footer>
  )
}

export default Footer;
