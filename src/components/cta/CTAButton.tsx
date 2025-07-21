import Link from "next/link";

const CTAButton = () => {
  return (
    <section className="cta__area">
      <div className="cta_button_pb">
        <div className="row">
          <div className="col-xxl-12">
            <div className="cta__content_button">
                 <Link href="/contact" className=" btn-hover btn-item" legacyBehavior>
              <h2 className="cta__sub-title">Work with us</h2>
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default CTAButton;
