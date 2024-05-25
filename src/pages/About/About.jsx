const About = () => {
  return (
    <>
      <section className=" mt-5">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="max-w-lg">
              <h2 className="text-3xl font-extrabold text-green-700 sm:text-4xl">
                About Us
              </h2>
              <p className="mt-4 text-gray-700 text-[14px] leading-[1.75rem] text-justify">
                we aim to provide you with a comprehensive overview of who we
                are and what we offer. Our platform is dedicated to helping
                students and professionals achieve their academic and career
                goals through effective exam preparation resources. At our exam
                portal, you will find a wide range of study materials, practice
                tests, and interactive tools designed to enhance your learning
                experience. Our team of experts curates high-quality content to
                ensure that you have access to the most up-to-date and relevant
                information for your exams. We understand the challenges and
                pressures that come with exam preparation, which is why we
                strive to create a supportive and user-friendly environment for
                our users. Whether you are studying for a standardized test,
                professional certification, or academic exam, our portal is here
                to support you every step of the way. Join our community of
                motivated learners and take advantage of the resources available
                on our exam portal website to boost your confidence and
                performance on exam day. Let us help you reach your full
                potential and achieve success in your academic and professional
                endeavors.
              </p>
              <div className="mt-8">
                <a
                  href="#"
                  className="text-green-600 bg hover:text-green-700 border rounded-lg border-green-900 px-3 py-3 no-underline font-bold text-[16px]"
                >
                  Learn more about us
                  <span className="ml-2">&#8594;</span>
                </a>
              </div>
            </div>
            <div className="mt-12 md:mt-0">
              <img
                src="images/exam.jpg"
                alt="About Us Image"
                className="object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
