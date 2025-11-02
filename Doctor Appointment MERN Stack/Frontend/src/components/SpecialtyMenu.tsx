import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets";
const SpecialtyMenu = () => {
  return (
    <div id="specialty">
      <h1>Find By Specialty</h1>
      <p>
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-4 hover:translate-y-[-10px] transition-all duration-500"
            to={`/doctors/${item.speciality}`}
          >
            <img src={item.image} alt="" />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialtyMenu;
