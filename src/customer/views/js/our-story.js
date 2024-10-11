import React from 'react'

import { Helmet } from 'react-helmet'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../css/our-story.css'

const OurStory = (props) => {
  return (
    <div className="our-story-container">
      <Helmet>
        <title>Our Story</title>
        <meta property="og:title" content="Our-Story - exported project" />
      </Helmet>
      <Header rootClassName="header-root-class-name1"></Header>
      <div className="our-story-container01">
        <img
          alt="image"
          src="/playground_assets/ourstorylogo1189-wqc-300h.png"
          className="our-story-image"
        />
        <div className="our-story-container02">
          <div className="our-story-hero">
            <div className="our-story-container03">
              <div className="our-story-container04">
                <span className="our-story-text">Mrs. Catherine Domigyay</span>
              </div>
            </div>
          </div>
          <div className="our-story-container05">
            <div className="our-story-container06">
              <div className="our-story-container07">
                <div className="our-story-container08">
                  <span className="our-story-text01">Our Story</span>
                  <span className="our-story-text02">Inabel ni Ina.</span>
                </div>
                <span className="our-story-text03">
                  <span>
                              Inabel ni Ina is a manufacturing company that
                    creates products such as clothing, bags, pouches, and more
                    from handwoven textiles, mainly from Cordillera. Derived
                    from the meaning “mother’s weave” or “habi ni nanay”, Inabel
                    ni Ina started back in 2020 and was named after Mrs. Cathy
                    Ekid Domigyay, a weaver from Can-eo, Bontoc who promotes
                    authentic woven textiles from a group of weavers from her
                    hometown. In the first few months of the business, the
                    company mainly focused on selling textiles that the owner,
                    Mrs. Domigyay, single-handedly weaves. At present, the
                    company now has partners who are weavers from different
                    groups of Cordillera and are now the ones creating the
                    products to be sold, such as bags, clothes, pouches, and
                    more. Because of this, the owner now focuses on managing the
                    business.
                  </span>
                  <br></br>
                  <br></br>
                  <br></br>
                  <span>          </span>
                  <span>
                    Inabel ni Ina started from trade fairs, specifically Mandeko
                    Kito, an artisan market in Baguio City established in 2020
                    due to the COVID-19 pandemic to help local craftspeople and
                    artisans of Baguio City and the Cordillera Administrative
                    Region. Eventually, they opened a Facebook page where they
                    offer ready-made and customized orders. Even so, they still
                    participate in trade fairs mainly organized by DTI,
                    including the Sunday Market Showcase held at Session Road,
                    Baguio City.
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="our-story-container09">
        <h1 className="our-story-text10">Our Process</h1>
        <span className="our-story-text11">by Customized Crafts</span>
        <iframe
          src="https://www.youtube.com/embed/2jPkdZVCxsk"
          className="our-story-iframe"
        ></iframe>
      </div>
      <div className="our-story-container10">
        <div className="our-story-gallery">
          <h1 className="our-story-text12">Follow Our Journey</h1>
          <span className="our-story-text13">
            Photos were taken during the different events in Baguio City.
          </span>
          <div className="our-story-gallery1">
            <div className="our-story-container11">
              <div className="our-story-container12">
                <h1 className="our-story-text14">Mandeko Kito 6</h1>
                <span className="our-story-text15">
                  SLU Center - November 12, 2020
                </span>
              </div>
            </div>
            <div className="our-story-container13">
              <div className="our-story-container14">
                <h1 className="our-story-text16">Mandeko Kito 5</h1>
                <span className="our-story-text17">
                  University of Baguio - June 16, 2022
                </span>
              </div>
            </div>
            <div className="our-story-container15">
              <div className="our-story-container16">
                <h1 className="our-story-text18">Montañosa Film Festival</h1>
                <span className="our-story-text19">
                  Malcolm Square - March 19, 2022
                </span>
              </div>
            </div>
            <div className="our-story-container17">
              <div className="our-story-container18">
                <h1 className="our-story-text20">Sunday Market Showcase</h1>
                <span className="our-story-text21">
                  Lower Session Rd. - December 19, 2021
                </span>
              </div>
            </div>
            <div className="our-story-container19">
              <div className="our-story-container20">
                <h1 className="our-story-text22">Mandeko Kito 4</h1>
                <span className="our-story-text23">
                  Berkeley School - December 12, 2021
                </span>
              </div>
            </div>
            <div className="our-story-container21">
              <div className="our-story-container22">
                <h1 className="our-story-text24">Art In Bloom</h1>
                <span className="our-story-text25">
                  SM Baguio - October 15, 2021
                </span>
              </div>
            </div>
          </div>
          <div className="our-story-gallery2">
            <div className="our-story-container23">
              <div className="our-story-container24">
                <h1 className="our-story-text26">Sunday Market Showcase</h1>
                <span className="our-story-text27">
                  Lower Session Rd. - May 02, 2021
                </span>
              </div>
            </div>
            <div className="our-story-container25">
              <div className="our-story-container26">
                <h1 className="our-story-text28">Mandeko Kito 3</h1>
                <span className="our-story-text29">
                  Berkeley School - June 15, 2021
                </span>
              </div>
            </div>
            <div className="our-story-container27">
              <div className="our-story-container28">
                <h1 className="our-story-text30">Ibagiw Festival</h1>
                <span className="our-story-text31">
                  Sunshine Park - November 21, 2020
                </span>
              </div>
            </div>
            <div className="our-story-container29">
              <div className="our-story-container30">
                <h1 className="our-story-text32">Mandeko Kito 2</h1>
                <span className="our-story-text33">
                  UP Baguio - November 09, 2020
                </span>
              </div>
            </div>
            <div className="our-story-container31">
              <div className="our-story-container32">
                <h1 className="our-story-text34">Adivay Artisans Fair</h1>
                <span className="our-story-text35">
                  SM Baguio - October 11, 2022
                </span>
              </div>
            </div>
            <div className="our-story-container33">
              <div className="our-story-container34">
                <h1 className="our-story-text36">Mandeko Kito</h1>
                <span className="our-story-text37">
                  UP Baguio - June 23, 2020
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer rootClassName="footer-root-class-name1"></Footer>
    </div>
  )
}

export default OurStory
