import React from "react";
import "../componentscss/Contact.css";
import people from "../images/people.svg";
import Footer from "./Footer";

function Contact() {
  if (typeof window !== "undefined") {
    document.title = "Contact Us";
  }
  return (
    <>
      <div className="contactBody">
        <section className="contactinfo">
          <div className="detailBox">
            <img alt="Phone" src={people} />
            <div>
              <h4>Phone</h4>
              <span>+919867465645</span>
            </div>
          </div>
          <div className="detailBox">
            <img alt="Email" src={people} />
            <div>
              <h4>Email</h4>
              <span>admin@examsforcareers.com</span>
            </div>
          </div>
          <div className="detailBox">
            <img alt="Address" src={people} />
            <div>
              <h4>Address</h4>
              <span>Banaras, India</span>
            </div>
          </div>
        </section>
        <section className="messageBox">
          <h1>Get In Touch</h1>
          <form>
            <div className="fromInfo">
              <input type="text" placeholder="Your Name" required={true} />
              <input type="email" placeholder="Your Email" required={true} />
              <input
                type="number"
                placeholder="Your Phone Number"
                required={true}
              />
            </div>
            <div>
              <textarea
                className="messageArea"
                placeholder="Message"
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="sendButtonBox">
              <input
                className="sendButton"
                type="submit"
                value="Send Message"
              />
            </div>
          </form>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
