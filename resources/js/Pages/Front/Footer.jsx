// Footer.js
import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="footer-area footer-padding">
        <div className="container">
          <div className="row footer-wejed justify-content-between">
            {/* Content goes here */}
          </div>
        </div>
      </div>
      <div className="footer-bottom-area footer-bg">
        <div className="container">
          <div className="footer-border">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-xl-10 col-lg-8 ">
                <div className="footer-copy-right">
                  <p>
                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                    Copyright &copy;
                    <script>document.write(new Date().getFullYear());</script>
                    All rights reserved | This template is made with <i className="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  </p>
                </div>
              </div>
              <div className="col-xl-2 col-lg-4">
                <div className="footer-social f-right">
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="https://www.facebook.com/sai4ull"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fas fa-globe"></i></a>
                  <a href="#"><i className="fab fa-behance"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="back-top">
        <a title="Go to Top" href="#"> <i className="fas fa-level-up-alt"></i></a>
      </div>
    </footer>
  );
}

export default Footer;
