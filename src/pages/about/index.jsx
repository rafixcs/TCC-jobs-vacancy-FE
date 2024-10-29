import Header from "../../components/header";

const AboutPage = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow">
        <h1 className="text-4xl font-bold mb-6">About JobFinder</h1>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Welcome to JobFinder!</h2>
          <p className="text-gray-700 leading-relaxed">
            At JobFinder, our mission is to connect job seekers with their dream careers and help companies find the perfect candidates. We strive to make the job search process seamless, efficient, and personalized for everyone involved.
          </p>
        </section>

        {/* Features Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why Choose JobFinder?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Personalized Job Recommendations:</strong> Receive job suggestions tailored to your skills and interests.</li>
            <li><strong>Easy Application Process:</strong> Apply to multiple jobs with a single click.</li>
            <li><strong>Company Insights:</strong> Get in-depth information about potential employers.</li>
            <li><strong>Career Resources:</strong> Access resume templates, interview tips, and career advice.</li>
            <li><strong>Secure Messaging:</strong> Communicate directly with recruiters through our platform.</li>
          </ul>
        </section>

        {/* How It Works */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li><strong>Create an Account:</strong> Sign up and complete your profile with your resume and preferences.</li>
            <li><strong>Explore Jobs:</strong> Browse through thousands of job listings across various industries.</li>
            <li><strong>Get Matched:</strong> Our algorithm suggests jobs that fit your profile.</li>
            <li><strong>Apply & Connect:</strong> Submit applications and communicate with employers directly.</li>
          </ol>
        </section>

        {/* Meet the Team */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
          <p className="text-gray-700 leading-relaxed">
            Our dedicated team of professionals is passionate about helping you succeed. With backgrounds in HR, technology, and customer service, we're here to support you every step of the way.
          </p>
          {/* You can add team member profiles here */}
        </section>

        {/* Testimonials */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
          <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-700">
            "JobFinder made my job search so much easier! I found my current position within a week of signing up."  
            <span className="block mt-2 font-semibold">— Sarah L., Marketing Specialist</span>
          </blockquote>
        </section>

        {/* Contact Us */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            Have questions or need assistance?  
            Email us at <a href="mailto:support@jobfinder.com" className="text-blue-600 hover:underline">support@jobfinder.com</a> or call us at (123) 456-7890.
          </p>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-10">
          <h2 className="text-2xl font-semibold mb-4">Ready to find your dream job?</h2>
          <a
            href="/signup"
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
          >
            Sign Up Now
          </a>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
