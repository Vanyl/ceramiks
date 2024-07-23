import { Link } from 'react-router-dom'
import '../sass/footer.scss'
import { TiSocialFacebook } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";
import { FaCcMastercard, FaCcVisa, FaCcApplePay, FaCcPaypal } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <footer>
                <div className='container-footer'>
                    <div className='footer-inner'>
                        <div className='contact-info'>
                            <h2>Contact us!</h2>
                            <p>For any questions, give us your opinion, or just say hello, do not hesitate to send us an email at: <a href="mailto:yavannaperez@hotmail.com">ceramiks@ceramiks.com</a></p>
                        </div>
                        <div className='social-info'>
                            <h2 className='footer-title'>Ceramiks.</h2>
                            <p className='social-definition'>[ /səˈræm.ɪks/] noun <br/> the art of making objects by shaping pieces of clay and then baking them until they are hard.</p>
                            <div className='social-links'>
                                <span><TiSocialFacebook /></span>
                                <span><FaInstagram /></span>
                            </div>
                        </div>
                    </div>
                    <div className='footer-bottom'>
                        <div className='footer-copyright'><span>&#xa9;</span>CERAMIKS</div>
                        <ul className='payments-list'>
                            <li className='payment-item'><FaCcMastercard /></li>
                            <li className='payment-item'><FaCcVisa /></li>
                            <li className='payment-item'><FaCcPaypal /></li>
                            <li className='payment-item'><FaCcApplePay /></li>
                        </ul>
                    </div>

                </div>

            </footer>
        </>
    )
}

export default Footer;