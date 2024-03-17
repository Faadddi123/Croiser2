
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import $ from 'jquery';



import './assets/css/bootstrap.min.css';
import './assets/css/owl.carousel.min.css';
import './assets/css/slicknav.css';
import './assets/css/flaticon.css';
import './assets/css/gijgo.css';
import './assets/css/animate.min.css';
import './assets/css/magnific-popup.css';
import './assets/css/fontawesome-all.min.css';
import './assets/css/themify-icons.css';
import './assets/css/slick.css';
import './assets/css/nice-select.css';
import './assets/css/style.css';
import 'https://code.jquery.com/jquery-3.6.0.min.js';



// import 'bootstrap/dist/js/bootstrap.bundle';
// import './assets/js/vendor/modernizr-3.5.0.min.js';
// import './assets/js/jquery.slicknav.min.js';
// import './assets/js/owl.carousel.min.js';
// import './assets/js/slick.min.js';
// // import './assets/js/wow.min.js';
// import './assets/js/animated.headline.js';
// import './assets/js/jquery.magnific-popup.js';
// import './assets/js/gijgo.min.js';
// import './assets/js/jquery.nice-select.min.js';
// import './assets/js/jquery.sticky.js';
// import './assets/js/jquery.counterup.min.js';
// import './assets/js/waypoints.min.js';
// import './assets/js/jquery.countdown.min.js';
// import './assets/js/contact.js';
// import './assets/js/jquery.form.js';
// import './assets/js/jquery.validate.min.js';
// import './assets/js/mail-script.js';
// import './assets/js/jquery.ajaxchimp.min.js';
// import './assets/js/plugins.js';
// import './assets/js/main.js';
function App( {event , auth}) {
  useEffect(() => {
    // Initialize any plugins or scripts that require jQuery or other libraries
    // $('.owl-carousel').owlCarousel();
    // Other initialization code for plugins
  }, []);

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Show Event</h2>}
        >
            <div>
                {/* <Header /> */}
                <MainContent user={auth.user} event={event} />
                <Footer />
            </div>
      </AuthenticatedLayout>
    );
  }

  export default App;
