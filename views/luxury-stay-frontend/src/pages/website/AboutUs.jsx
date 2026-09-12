import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faConciergeBell, faCalendarCheck, faSmile, faCheckCircle, faHotel, faUsers, faClock, faStar } from '@fortawesome/free-solid-svg-icons';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 mb-16">
      {/* 1. HERO / PAGE HEADER */}
      <div 
        className="relative bg-gray-900 text-white min-h-[50vh] flex items-center justify-center px-4"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto text-center relative z-10 flex flex-col items-center mt-10">
          <p className="text-blue-500 font-sans tracking-[0.3em] uppercase text-sm mb-4 font-semibold">Our Story</p>
          <h1 className="text-4xl md:text-6xl font-serif font-normal mb-4 tracking-tight drop-shadow-lg text-white">
            About LuxuryStay
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-light drop-shadow-md text-gray-200">
            Providing comfort, classic elegance, and memorable experiences for every guest.
          </p>
        </div>
      </div>

      {/* 2. OUR STORY */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1541971875076-8f970d573be6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Our Story" 
                className="rounded-none shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
              <div className="w-20 h-1 bg-blue-600 rounded-none mb-6"></div>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                LuxuryStay is a modern hotel management project focused on providing comfortable rooms, quality hospitality, and a pleasant experience for all our guests. 
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Whether you are visiting for business or leisure, we aim to make your stay feel like a home away from home. Our dedicated team works round the clock to ensure every detail of your visit is perfectly managed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. OUR MISSION */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-none"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-none shadow-sm border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
              <FontAwesomeIcon icon={faBed} className="text-4xl text-blue-600 mb-4" />
              <p className="font-semibold text-gray-800 text-lg">Provide comfortable accommodation</p>
            </div>
            <div className="bg-white p-8 rounded-none shadow-sm border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
              <FontAwesomeIcon icon={faConciergeBell} className="text-4xl text-blue-600 mb-4" />
              <p className="font-semibold text-gray-800 text-lg">Deliver quality customer service</p>
            </div>
            <div className="bg-white p-8 rounded-none shadow-sm border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
              <FontAwesomeIcon icon={faCalendarCheck} className="text-4xl text-blue-600 mb-4" />
              <p className="font-semibold text-gray-800 text-lg">Make hotel reservations simple</p>
            </div>
            <div className="bg-white p-8 rounded-none shadow-sm border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
              <FontAwesomeIcon icon={faSmile} className="text-4xl text-blue-600 mb-4" />
              <p className="font-semibold text-gray-800 text-lg">Ensure a pleasant experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. WHY CHOOSE LUXURYSTAY */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-none"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4 p-6 border border-gray-100 rounded-none bg-gray-50 hover:shadow-md transition">
              <div className="text-blue-600 text-3xl mt-1"><FontAwesomeIcon icon={faCheckCircle} /></div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Comfortable Rooms</h3>
                <p className="text-gray-600">Enjoy modern amenities and cozy beds tailored for a relaxing stay.</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 border border-gray-100 rounded-none bg-gray-50 hover:shadow-md transition">
              <div className="text-blue-600 text-3xl mt-1"><FontAwesomeIcon icon={faCheckCircle} /></div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Quality Service</h3>
                <p className="text-gray-600">Our staff is dedicated to ensuring you get the best hospitality experience.</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 border border-gray-100 rounded-none bg-gray-50 hover:shadow-md transition">
              <div className="text-blue-600 text-3xl mt-1"><FontAwesomeIcon icon={faCheckCircle} /></div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Booking</h3>
                <p className="text-gray-600">A seamless online reservation system to book your stay in just a few clicks.</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 border border-gray-100 rounded-none bg-gray-50 hover:shadow-md transition">
              <div className="text-blue-600 text-3xl mt-1"><FontAwesomeIcon icon={faCheckCircle} /></div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Guest Satisfaction</h3>
                <p className="text-gray-600">We prioritize your happiness, offering a stay you will always remember.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. SIMPLE STATISTICS SECTION */}
      <div className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-blue-500">
            <div>
              <div className="text-4xl mb-2"><FontAwesomeIcon icon={faHotel} /></div>
              <div className="text-3xl font-bold mb-1">50+</div>
              <div className="text-blue-100 font-medium">Rooms</div>
            </div>
            <div>
              <div className="text-4xl mb-2"><FontAwesomeIcon icon={faUsers} /></div>
              <div className="text-3xl font-bold mb-1">1000+</div>
              <div className="text-blue-100 font-medium">Happy Guests</div>
            </div>
            <div>
              <div className="text-4xl mb-2"><FontAwesomeIcon icon={faClock} /></div>
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-blue-100 font-medium">Service</div>
            </div>
            <div>
              <div className="text-4xl mb-2"><FontAwesomeIcon icon={faStar} /></div>
              <div className="text-3xl font-bold mb-1">5+</div>
              <div className="text-blue-100 font-medium">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. MEET OUR TEAM */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-none"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              The dedicated professionals working behind the scenes to make your stay unforgettable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-none overflow-hidden shadow-sm hover:shadow-md transition">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Hotel Manager" className="w-full h-64 object-cover object-top" />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-1">David Wilson</h3>
                <p className="text-blue-600 font-medium text-sm uppercase tracking-wide mb-3">General Manager</p>
                <p className="text-gray-600 text-sm">Ensuring seamless operations and delivering the highest standard of hospitality.</p>
              </div>
            </div>
            <div className="bg-white rounded-none overflow-hidden shadow-sm hover:shadow-md transition">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Guest Relations" className="w-full h-64 object-cover object-top" />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-1">Sarah Jenkins</h3>
                <p className="text-blue-600 font-medium text-sm uppercase tracking-wide mb-3">Guest Relations</p>
                <p className="text-gray-600 text-sm">Dedicated to making every guest feel welcomed and valued from check-in to check-out.</p>
              </div>
            </div>
            <div className="bg-white rounded-none overflow-hidden shadow-sm hover:shadow-md transition">
              <img src="https://images.unsplash.com/photo-1583468982228-19f19164aee2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Executive Chef" className="w-full h-64 object-cover object-top" />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-1">Michael Chen</h3>
                <p className="text-blue-600 font-medium text-sm uppercase tracking-wide mb-3">Executive Chef</p>
                <p className="text-gray-600 text-sm">Crafting exquisite culinary experiences with fresh, locally sourced ingredients.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. CALL TO ACTION */}
      <div className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready for an unforgettable experience?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Book your stay with LuxuryStay today and enjoy world-class amenities, exceptional service, and ultimate comfort.
          </p>
          <a href="/rooms" className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-none hover:bg-blue-700 transition duration-300 shadow-md">
            Book a Room Now
          </a>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;
