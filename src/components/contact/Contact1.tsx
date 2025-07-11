import { useEffect, useRef, useState } from "react";
import animationCharCome from "@/lib/utils/animationCharCome";
import animationWordCome from "@/lib/utils/animationWordCome";

const Contact1 = () => {
  const charAnim = useRef<HTMLHeadingElement | null>(null);
  const wordAnim = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (charAnim.current) animationCharCome(charAnim.current);
    if (wordAnim.current) animationWordCome(wordAnim.current);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://send-email.mmavii1290.workers.dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        const err = await response.json();
        alert("Error: " + (err.message || "Something went wrong."));
      }
    } catch (error) {
      alert("Failed to send. Please try again later.");
      console.error(error);
    }
  };

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
              <p>
                Great! We&rsquo;re excited to hear from you and let&rsquo;s start something special
                together. Call us for any inquiry.
              </p>
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
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-xxl-6 col-xl-6 col-12">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name *"
                      required
                    />
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-12">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email *"
                      required
                    />
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-12">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                    />
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-12">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Messages *"
                      required
                    ></textarea>
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
