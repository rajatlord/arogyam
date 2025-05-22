import { Link } from "react-router-dom";

function FeatureCard({ title, subtitle, to , bgColor}) {
  return (
    <Link
      to={to}
className={`block rounded-xl shadow-md p-4 w-[90%] md:w-[45%] h-30  ${bgColor}`}

    >
      <h3 className="text-lg font-semibold">{title}</h3>
      {subtitle && <p className="text-sm ">{subtitle}</p>}
    </Link>
  );
}

export default FeatureCard;
