import { Link } from 'react-router-dom';
const TopNav: React.FC = () => {
  return (
    <div data-testid="top-nav-component">
      <ul className="flex gap-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/erp">Erp</Link>
        </li>

        <li>
          <Link to="/ecommerce">Ecommerce</Link>
        </li>
      </ul>
    </div>
  );
};

export default TopNav;
