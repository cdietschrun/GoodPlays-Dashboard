import React from "react";
import { Link } from "react-router-dom";

const ChartNavigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/charts/pie">Pie Chart</Link>
        </li>
        <li>
          <Link to="/charts/treemap">Tree Map Chart</Link>
        </li>
        {/* Add more chart types as needed */}
      </ul>
    </nav>
  );
};

export default ChartNavigation;
