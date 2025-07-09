import { useEffect, useRef } from "react";
import animationCharCome from "@/lib/utils/animationCharCome";
import animationWordCome from "@/lib/utils/animationWordCome";

const Contact1 = () => {
  const charAnim = useRef<HTMLHeadingElement | null>(null);
  const wordAnim = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (charAnim.current) animationCharCome(charAnim.current);
    if (wordAnim.current) animationWordCome(wordAnim.current);
  }, []);

  return (
    <section className="contact__area-6">
      <div className="container g-0 line pt-120 pb-110">
        <span className="line-3"></span>
        <div className="row">
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
            <div className="sec-title-wrapper">
              <h2 className="sec-title-2 animation__char_come" ref={charAnim}>
                Let’s get in touch
              </h2>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
            <div className="contact__text">
              <p>Great! We&rsquo;re excited to hear from you and let&rsquo;s start something special together. Call us for any inquiry.</p>
            </div>
          </div>
        </div>

        <div className="row contact__btm">
          <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5">
            <div className="contact__info">
              <h3 className="sub-title-anim-top animation__word_come" ref={wordAnim}>
                {"Don't be afraid man! "}
                <br />
                Get in touch
              </h3>
              <ul>
                <li><a href="tel:+1-516-727-0114">516-727-0114</a></li>
                <li><a href="mailto:didodistributions@gmail.com">didodistributions@gmail.com</a></li>
                <li><span>Valley Stream, NY</span></li>
              </ul>
            </div>
          </div>

          <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-7">
            <div className="contact__form">
              <form action="assets/mail.php" method="POST">
                <div className="row g-3">
                  <div className="col-xxl-6 col-xl-6 col-12">
                    <input type="text" name="name" placeholder="Name *" required />
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-12">
                    <input type="email" name="email" placeholder="Email *" required />
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-xxl-6 col-xl-6 col-12">
                    <input type="tel" name="phone" placeholder="Phone" />
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-12">
                    <input type="text" name="subject" placeholder="Subject *" required />
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-12">
                    <textarea name="message" placeholder="Messages *" required></textarea>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-12">
                    <div className="btn_wrapper">
                      <button type="submit" className="wc-btn-primary btn-hover btn-item">
                        <span></span>
                        Send <br />
                        Messages <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact1;
