import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../css/f-a-qs.css'
import Faq from 'react-faq-component';

const styles = {
  //bgColor: 'darkgrey',
  titleTextColor: "peru",
  rowTitleColor: 'black',
  rowContentColor: 'grey',
  rowContentTextSize: '16px',
  rowContentPaddingBottom: '10px',
  rowContentPaddingLeft: '50px'
};

const general = {
  title: "GENERAL",
  rows: [
    {
      title: "What products do you sell?",
      content: "We sell clothing for women (Filipiniana, Topper, Long Topper, Chaleco, Poncho, Vest, Skirt, and Puff blouse), clothing for men (Polo and Chaleco), and unisex clothing (Haori and Shawl). For our bags and pouches, we sell Backpack textile x leather, Backpack textile plain, Shoulder bag, Bucket bag, Holster bag, Bodybag, Sling bag, Lunchbox bag, Neck pouch (Small, Medium, Large), Handheld pouch, Ladies Wallet, Tumbler Holder, Alcohol Holder, Coin purse, Cleo bag, and Athena bag. We also sell accessories such as Face mask, Headband, Bandana, and Cellphone case."
    },
    {
      title: "What are your products made out of?",
      content: "We use authentic Cordilleran handwoven fabrics in manufacturing our products."
    },
    {
      title: "How much are your products?",
      content: "It depends on the product but it ranges from P50 to P3500."
    },
    {
      title: "Where is your store located?",
      content: "As of now, we do not have our own physical stores. However, you can find our stall during the weekly Sunday Market Showcase. You can also find us in OTOP Hub at the Porta Vaga Mall, Lower Session Rd."
    },
    {
      title: "Do you offer customization of products?",
      content: "Yes, we do."
    }
  ]
}

const customize = {
  title: "CUSTOMIZE",
  rows: [
    {
      title: "How can we customize products?",
      content: "For the customization of our products, just follow this 4 simple steps:" +
      "Step 1: Choose a specific product to customize and select whether it is for men or women." +
      "Step 2: Depending on the chosen product, you will either input the needed measurements or choose based on the provided standard sizes. Don’t worry, a measurement guide is provided for you to follow." +
      "Step 3: Pick the textile pattern that you want for your chosen product." +
      "Step 4: Additionally, you can also include comments regarding your customized order."
    },
    {
      title: "What products can I customize?",
      content: "As of now, we focused on the customization of clothings. However, you can further inquire regarding the customization of other products through FB messenger or call us."
    },
    {
      title: "How long does it take for a customized product to be created?",
      content: "It depends on the level of difficulty but on average, it can be done in a week."
    }  
  ]
}

const payment = {
  title: "PAYMENT & DELIVERY",
  rows: [
    {
      title: "What are the available payment methods?",
      content: "Readymade products require a payment-first policy with the option to pay through GCash, BDO, or LandBank . As for customized orders,  a 50% downpayment must be paid once the order has been finalized and the remaining half will be paid before delivering the customized product."
    },
    {
      title: "How will my orders be delivered?",
      content: "You can choose between JRS Express or J&T Express to ship your parcel. Expect a 3-4 days of delivery time for premade products within Baguio City however the delivery time is still dependent on your location."
    }  
  ]
}

const deliver = {
  title: "RETURN POLICY",
  rows: [
    {
      title: "What if the product delivered to me is damaged?",
      content: "If you received a damaged item, Inabel ni Ina will replace your order. As long as you have a proof that the product delivered was already damaged so make sure to take a video from the time you received the product to show that it was already damaged when you got the product."
    }  
  ]
}

const FAQs = (props) => {
  return (
    <div className="f-a-qs-container">
      <Helmet>
        <title>FAQs</title>
        <meta property="og:title" content="FAQs - exported project" />
      </Helmet>
      <Header rootClassName="header-root-class-name6"></Header>
      <div className="f-a-qs-container1">
        <div className="f-a-qs-container2">
          <h1 className="f-a-qs-text">Frequently Asked Questions</h1>
          <span className="f-a-qs-text1">
            <span>
              If you have any further questions, please
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <Link to="/contact-us" className="f-a-qs-navlink">
              contact us
            </Link>
            <span>.</span>
          </span>
        </div>
        <div className="f-a-qs-container3"><Faq data={general} styles={styles}/></div>
        <div className="f-a-qs-container4"> <Faq data={customize} styles={styles}/></div>
        <div className="f-a-qs-container5"><Faq data={payment} styles={styles}/></div>
        <div className="f-a-qs-container6"><Faq data={deliver} styles={styles}/></div>
      </div>
      <Footer rootClassName="footer-root-class-name5"></Footer>
    </div>
  )
}

export default FAQs