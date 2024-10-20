import { Link } from 'react-router-dom';
import Header from '../../components/header';

const companies = [
  { id: 1, name: 'Tech Solutions', industry: 'Software Development' },
  { id: 2, name: 'Green Energy Corp', industry: 'Renewable Energy' },
  { id: 3, name: 'Marketing World', industry: 'Digital Marketing' },
  { id: 4, name: 'Marketing World', industry: 'Digital Marketing' },
  { id: 5, name: 'Marketing World', industry: 'Digital Marketing' },
  { id: 6, name: 'Marketing World', industry: 'Digital Marketing' },
  { id: 7, name: 'Marketing World', industry: 'Digital Marketing' },
];

const CompaniesList = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto mt-10 max-w-5xl">
      <h1 className="text-3xl font-bold mb-5">Companies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-5">
          {companies.map(company => (
          <Link 
              key={company.id} 
              to={`/companies/${company.id}`} 
              className="block p-5 bg-white shadow-lg hover:shadow-xl transition duration-300 rounded-lg"
          >
              <h2 className="text-xl font-semibold">{company.name}</h2>
              <p className="text-gray-500">{company.industry}</p>
          </Link>
          ))}
      </div>
      </div>
    </>
  );
};

export default CompaniesList;
