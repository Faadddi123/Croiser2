// MainContent.js
import React from 'react';

function MainContent({event ,user}) {
    const {id} = event;
    const { id: userId } = user;
    const handleReserve = async () => {
        try {
          // Make a POST request to your API endpoint to save the reservation
          const response = await axios.post('/api/reservations', { eventId: id, userId });
          console.log('Reservation saved:', response.data);
        } catch (error) {
          console.error('Error saving reservation:', error);
        }
      };

  return (
    <main>
        {/* slider Area Start*/}
        <div className="slider-area position-relative">
            <div className="slider-active">
                {/* Single Slider */}
                <div className="single-slider slider-height d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-lg-8 col-md-9 col-sm-10">
                                <div className="hero__caption">
                                    <span data-animation="fadeInLeft" data-delay=".1s">Committed to success</span>
                                    <h1 data-animation="fadeInLeft" data-delay=".5s">{event.name}</h1>
                                    {/* Hero-btn */}
                                    <div className="slider-btns">
                                        <a data-animation="fadeInLeft" data-delay="1.0s" href="industries.html" className="btn hero-btn">Download</a>
                                        <a data-animation="fadeInRight" data-delay="1.0s" className="popup-video video-btn"  href="https://www.youtube.com/watch?v=up68UAfH0d0">
                                            <i className="fas fa-play"></i></a>
                                        <p className="video-cap d-none d-sm-block" data-animation="fadeInRight" data-delay="1.0s">Story Video<br /> Watch</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* Counter Section Begin */}
            <div className="counter-section d-none d-sm-block">
                <div className="cd-timer" id="countdown">
                    <div className="cd-item">
                        <span>96</span>
                        <p>Days</p>
                    </div>
                    <div className="cd-item">
                        <span>15</span>
                        <p>Hrs</p>
                    </div>
                    <div className="cd-item">
                        <span>07</span>
                        <p>Min</p>
                    </div>
                    <div className="cd-item">
                        <span>02</span>
                        <p>Sec</p>
                    </div>
                </div>
            </div>
            {/* Counter Section End */}
        </div>
        {/* slider Area End*/}
        {/* About Law Start*/}
        <section className="about-low-area section-padding2">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className="about-caption mb-50">
                            {/* Section Tittle */}
                            <div className="section-tittle mb-35">
                                <h2>{event.name}</h2>
                            </div>
                            <p>{event.description}</p>
                            <p>At location : {event.localisation}</p>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-10">
                                <div className="single-caption mb-20">
                                    <div className="caption-icon">
                                        <span className="flaticon-communications-1"></span>
                                    </div>
                                    <div className="caption">
                                        <h5>Where</h5>
                                        <p>{event.localisation}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-10">
                                <div className="single-caption mb-20">
                                    <div className="caption-icon">
                                        <span className="flaticon-education"></span>
                                    </div>
                                    <div className="caption">
                                        <h5>When</h5>
                                        <p>{event.date_depart}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleReserve}><a  className="btn mt-50">Reserve</a></button>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        {/* about-img */}
                        <div className="about-img ">
                            <div className="about-font-img d-none d-lg-block">
                                <img src="assets/img/gallery/about2.png" alt="" />
                            </div>
                            <div className="about-back-img ">
                                <img src="assets/img/gallery/about1.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* About Law End*/}
    </main>
  );
}

export default MainContent;
