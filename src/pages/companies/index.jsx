import { Link } from 'react-router-dom';
import Header from '../../components/header';
import { useState, useEffect } from 'react';
import { apiHandler } from '../../utils/apihandler';

const companies_sample = [
  { id: 1, name: 'Tech Solutions', industry: 'Software Development' },
  { id: 2, name: 'Green Energy Corp', industry: 'Renewable Energy' },
  { id: 3, name: 'Marketing World', industry: 'Digital Marketing' },
  { id: 4, name: 'Marketing World', industry: 'Digital Marketing' },
  { id: 5, name: 'Marketing World', industry: 'Digital Marketing' },
  { id: 6, name: 'Marketing World', industry: 'Digital Marketing' },
  { id: 7, name: 'Marketing World', industry: 'Digital Marketing' },
];

const CompaniesList = () => {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

    apiHandler("companies", "GET").then(async (response) => {
      if (response.ok) {
        const data = await response.json()
        console.log(data[0].description)
        setCompanies(data)
        setLoading(false)
      } else {
        setCompanies([])
        setLoading(false)
        setError("failed to get companies")
      }
    }).catch((reason) => {
      setLoading(false)
      setCompanies([])
      setError(reason)
    })
  }, [])

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center h-[90vh]">
          <p className="text-gray-600 text-xl">Loading applications...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center h-[90vh]">
          <p className="text-gray-600 text-xl">Unable to get companies list</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto mt-10 max-w-5xl">
        <h1 className="text-3xl font-bold mb-5">Companies</h1>
        {companies ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-5">
            {companies.map(company => (
              <Link
                key={company.id}
                to={`/companies/${company.id}?name=${company.name}`}
                className="block p-5 bg-white shadow-lg hover:shadow-xl transition duration-300 rounded-lg"
              >
                <h2 className="text-xl font-semibold">{company.name}</h2>
                <p className="text-gray-500">{company.description}</p>
              </Link>
            ))}
          </div>
        ): (
          <div className="flex items-center justify-center h-[90vh]">
          <p className="text-gray-600 text-xl">No companies found</p>
        </div>
        )}
      </div>
    </>
  );
};

export default CompaniesList;
