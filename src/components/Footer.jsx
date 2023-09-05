import "./Footer.css";

import { Link } from "react-router-dom";

import { BsGithub, BsLinkedin } from "react-icons/bs";

export function Footer() {
  return (
    <div className="FooterContainer">
      <div className="FooterHorizontalLine"></div>
      <div className="FooterWrapperContainer">
        <div className="FooterAboutUsContainer">
          <div className="FooterAboutUsHeader">About Us</div>
          <div className="FooterAboutUsText">
            One place solution to secure your files and documents, free
            unlimited encrypted sharing with downloades and uploads
          </div>
          <ul className="FooterAboutUsLinks">
            <li>
              <Link
                className="FooterAboutUsLink"
                to="https://github.com/Sanjeevkumar-woks"
                target="_blank"
              >
                <BsGithub />
              </Link>
            </li>
            <li>
              <Link
                className="FooterAboutUsLink"
                to="https://www.linkedin.com/in/sanjeevkumar-managutti-34187a207/"
                target="_blank"
              >
                <BsLinkedin />
              </Link>
            </li>
          </ul>
        </div>
        <div className="FooterUsefulLinksContainer">
          <div className="FooterUserfulLinksWrapper">
            <div className="FooterUsefulLinksHeader">Useful Links</div>
            <ul className="FooterUsefulLinks">
              <li className="FooterLink">About</li>
              <li className="FooterLink">Blog</li>
              <li className="FooterLink">Privacy</li>
              <li className="FooterLink">Terms</li>
              <li className="FooterLink">FAQs</li>
            </ul>
          </div>
        </div>
        <div className="FooterNewsLetterContainer">
          <div className="FooterNewsLetterHeader">Newsletter</div>
          <input
            className="FooterNewsLetterinput"
            placeholder="Enter Your Email"
          />
          <div className="FooterNewsLetterbutton">Subscribe</div>
        </div>
      </div>
      <div className="FooterCopyRight">
        © Fileshare Private Limited , 2020-2023
      </div>
    </div>
  );
}
