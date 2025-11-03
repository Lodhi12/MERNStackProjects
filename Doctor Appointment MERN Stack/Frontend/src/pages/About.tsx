import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div>
        <p>
          ABOUT <span>US</span>
        </p>
      </div>
      <div>
        <img src={assets.about_image} alt="" />
        <div>
          <p>
            Welcome to DocPres, your trusted partner in managing your healthcare
            needs
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
