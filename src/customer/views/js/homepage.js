import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import Header from '../../components/Header'
import Features from '../../components/Features'
import Footer from '../../components/Footer'
import '../css/homepage.css'

const Homepage = (props) => {
  return (
    <div className="homepage-container">
      <Helmet>
        <title>Home</title>
        <meta property="og:title" content="exported project" />
      </Helmet>
      <Header rootClassName="header-root-class-name5"></Header>
      <div className="homepage-hero">
        <div className="homepage-container01">
          <h1 className="homepage-text">
            <span className="homepage-text01">Authentic Handwoven</span>
            <br></br>
            <span>Textiles</span>
            <br></br>
          </h1>
          <span className="homepage-text05">
            <span>
              A variety of products such as masks, bags, earrings and other
              crafts
            </span>
            <span>
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <span>
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
          </span>
          <Link to="/shop" className="homepage-navlink button">
            <span className="homepage-text09">
              <span className="homepage-text10">EXPLOR</span>
              <span>E</span>
            </span>
          </Link>
        </div>
      </div>
      <div className="homepage-container02">
        <div className="homepage-container03">
          <img
            alt="image"
            src="/playground_assets/inabeltextile-500h.png"
            className="homepage-image"
          />
          <div className="homepage-container04">
            <h1 className="homepage-text12">Inabel</h1>
            <span className="homepage-text13">
              <span>a fabric customarily</span>
              <br></br>
              <span>made of cotton fiber turned into spools of</span>
              <br></br>
              <span> beeswax</span>
              <span>
                -brushed
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <br></br>
              <span>yarn </span>
              <span>&amp; woven in</span>
              <br></br>
              <span>a handloom</span>
            </span>
          </div>
        </div>
      </div>
      <div className="homepage-hero1">
        <div className="homepage-container05">
          <h1 className="homepage-text25">Athena</h1>
          <span className="homepage-text26">
            <span>
              Inabel ni Ina&apos;s newest bag is now out. Grab yours now before
              stock runs out!
            </span>
            <span>
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <span>
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
          </span>
          <Link to="/product-details" className="homepage-navlink1 button">
            <span className="homepage-text30">
              <span className="homepage-text31">BUY NO</span>
              <span>W</span>
            </span>
          </Link>
        </div>
      </div>
      <div className="homepage-container06">
        <div className="homepage-container07">
          <div className="homepage-container08">
            <h1 className="homepage-text33">New arrival</h1>
            <h1 className="homepage-text34">Women</h1>
            <span className="homepage-text35">
              <span>Inabel ni Ina&apos;s</span>
              <br></br>
              <span>newest Filipiniana</span>
              <br></br>
              <span>is now out.</span>
              <br></br>
              <br></br>
              <span>Grab yours now</span>
              <br></br>
              <span>before stock runs out!</span>
            </span>
            <span className="homepage-text46">P3,500</span>
            <Link to="/shop" className="homepage-navlink2 button">
              <span className="homepage-text47">VIEW COLLECTION</span>
            </Link>
          </div>
        </div>
        <div className="homepage-container09">
          <div className="homepage-container10">
            <h1 className="homepage-text48">New arrival</h1>
            <h1 className="homepage-text49">MEN</h1>
            <span className="homepage-text50">
              <span className="homepage-text51">Inabel ni Ina&apos;s</span>
              <br className="homepage-text52"></br>
              <span className="homepage-text53">newest Jacket</span>
              <br className="homepage-text54"></br>
              <span className="homepage-text55">is now out.</span>
              <br className="homepage-text56"></br>
              <br className="homepage-text57"></br>
              <span className="homepage-text58">Grab yours now</span>
              <br className="homepage-text59"></br>
              <span className="homepage-text60">before stock runs out!</span>
              <br className="homepage-text61"></br>
            </span>
            <span className="homepage-text62">P1,500</span>
            <Link to="/shop" className="homepage-navlink3 button">
              <span className="homepage-text63">VIEW COLLECTION</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="homepage-hero2">
        <div className="homepage-container11">
          <h1 className="homepage-text64">Accessories</h1>
          <span className="homepage-text65">
            <span>A collection of face masks, headbands, bandanas,</span>
            <br></br>
            <span>cellphone case, and more!</span>
          </span>
          <Link to="/shop" className="homepage-navlink4 button">
            <span className="homepage-text69">
              <span className="homepage-text70">EXPLOR</span>
              <span>E</span>
            </span>
          </Link>
        </div>
      </div>
      <div className="homepage-testimonial">
        <h1 className="homepage-text72">WHY CHOOSE INABEL NI INA?</h1>
        <div className="homepage-container12">
          <Features
            quote="Cordilleran Fabric"
            heading="AUTHENTICITY"
            image_src="/playground_assets/authentic.svg"
            picture_src="https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDE2fHxtYW58ZW58MHx8fHwxNjI2NDUyMDM1&amp;ixlib=rb-1.2.1&amp;h=1200"
            rootClassName="rootClassName"
          ></Features>
          <Features
            quote="Choose Your Own Design"
            heading="CUSTOMIZATION"
            image_src="/playground_assets/customize.svg"
            picture_src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDIzfHxtYW58ZW58MHx8fHwxNjI2NDUyMDM1&amp;ixlib=rb-1.2.1&amp;h=1200"
            rootClassName="rootClassName"
          ></Features>
          <Features
            quote="Our Priority"
            heading="CUSTOMER SERVICE"
            image_src="/playground_assets/customerservice1.svg"
            picture_src="https://images.unsplash.com/photo-1546456073-ea246a7bd25f?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDh8fGJsYWNrJTIwbWFufGVufDB8fHx8MTYyNjQ1MjAwOA&amp;ixlib=rb-1.2.1&amp;h=1200"
            rootClassName="rootClassName"
          ></Features>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name4"></Footer>
    </div>
  )
}

export default Homepage
