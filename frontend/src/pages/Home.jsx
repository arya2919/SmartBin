import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const testimonials = [
  { name: 'Arya', title: 'Developer', avatar: 'https://img.freepik.com/premium-photo/fun-unique-cartoon-profile-picture-that-represents-your-style-personality_1283595-14000.jpg?w=380', text: 'The real-time tracking and instant notifications are impressive. This app truly bridges the gap between citizens and local authorities.' },
];

export default function Home() {
  const preloaderRef = useRef(null);

  useEffect(() => {
    // Preloader fade out
    const timer = setTimeout(() => {
      if (preloaderRef.current) {
        preloaderRef.current.style.opacity = '0';
        preloaderRef.current.style.transition = 'opacity 0.8s ease';
        setTimeout(() => {
          if (preloaderRef.current) preloaderRef.current.style.display = 'none';
        }, 800);
      }
    }, 2000);

    // Letter animation
    const letters = document.querySelectorAll('.hero-title span');
    letters.forEach((letter, i) => {
      setTimeout(() => {
        letter.style.opacity = '1';
        letter.style.transform = 'translateY(0)';
      }, 2800 + i * 100);
    });

    // Counter animation
    const counters = document.querySelectorAll('.counter-number');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target);
      let count = 0;
      const inc = target / 60;
      const update = () => {
        if (count < target) {
          count = Math.ceil(count + inc);
          counter.textContent = count.toLocaleString() + '+';
          requestAnimationFrame(update);
        } else {
          counter.textContent = target.toLocaleString() + '+';
        }
      };
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) { update(); observer.disconnect(); }
      });
      observer.observe(counter);
    });

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-page">
      {/* Pre-loader */}
      <div className="pre-loader" ref={preloaderRef}>
        <h3>Together</h3>
        <h3>We</h3>
        <h3>Reduce,</h3>
        <h3>Reuse,</h3>
        <h3>Recycle.</h3>
      </div>

      <div className="main">
        {/* Page 1 — Hero */}
        <section className="page1" id="page1">
          <video autoPlay loop muted playsInline className="hero-video">
            <source src="/video/page1.mp4" type="video/mp4" />
          </video>
          <div className="page1-content">
            <Navbar />
            <h1 className="hero-title">
              {'smartbin'.split('').map((char, i) => (
                <span key={i}>{char}</span>
              ))}
            </h1>
            <p className="hero-tagline">Empowering communities to reduce, reuse & recycle.</p>
            <Link to="/login" className="hero-cta">Get Started</Link>
          </div>
        </section>

        {/* Page 2 — Services */}
        <section className="page2" id="page2">
          <div className="services-header">
            <p className="section-label">SmartBin · do good</p>
          </div>
          <div className="services-container">
            <h1>Services we provide.</h1>
            <h3>Empowering You to Make a Difference</h3>
            <div className="card-container">
              <article className="service-card">
                <video autoPlay loop muted playsInline className="card-video">
                  <source src="/video/Disposal2.mp4" type="video/mp4" />
                </video>
                <div className="card-data">
                  <h2>Instant Garbage Reporting</h2>
                  <Link to="/garbage-upload" className="card-btn">Report it in seconds..</Link>
                </div>
              </article>
              <article className="service-card">
                <video autoPlay loop muted playsInline className="card-video">
                  <source src="/video/Recycle2.mp4" type="video/mp4" />
                </video>
                <div className="card-data">
                  <h2>Recycling Service</h2>
                  <Link to="/recycle-upload" className="card-btn">Recycling made easy..</Link>
                </div>
              </article>
              <article className="service-card">
                <video autoPlay loop muted playsInline className="card-video">
                  <source src="/video/knowAbout2.mp4" type="video/mp4" />
                </video>
                <div className="card-data">
                  <h2>Waste Wisdom</h2>
                  <a href="#" className="card-btn">Read More</a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Page 3 — About */}
        <section className="page3" id="page3">
          <div className="about-main-content">
            <h1 className="about-heading">WITH EVERY TAP, YOU'RE</h1>
            <h1 className="about-heading">NOT JUST REPORTING</h1>
            <h1 className="about-heading">WASTE - <span>YOU'RE TAKING A STAND</span></h1>
            <h1 className="about-heading"><span>FOR OUR PLANET'S</span></h1>
            <h1 className="about-heading"><span>FUTURE.</span></h1>
          </div>
          <div className="about-side-content">
            <p className="about-text">
              At <span>SmartBin</span>, we believe in the power of community action to transform our
              environment. Our innovative platform bridges the gap between citizens and local authorities,
              creating a collaborative ecosystem for effective waste management.
            </p>
            <p className="about-text">
              Every report you submit, every recycling pickup you schedule, contributes to a larger
              movement. We're not just cleaning up streets; we're building a culture of responsibility and
              environmental stewardship.
            </p>
            <br />
            <Link to="/payment" className="support-btn">SUPPORT</Link>
          </div>
        </section>

        {/* Page 4 — Impact */}
        <section className="page4" id="page4">
          <div className="impact">
            <div className="impact-text">
              <h1>OUR IMPACT</h1>
              <p>
                <span>SmartBin</span> aims to have a significant positive impact on waste management and
                recycling efforts in our community and beyond. By leveraging technology to engage citizens
                and streamline recycling processes, the app contributes to a cleaner environment, cost
                savings for municipalities, and job creation in the waste management sector.
              </p>
              <p>
                It integrates real-time data on litter and recyclable materials, allowing waste management
                organizations to optimize their collection routes. This efficiency not only reduces
                operational costs but also minimizes carbon emissions.
              </p>
              <div className="impact-counters">
                <div className="counter-item">
                  <span className="counter-number" data-target="12000">0</span>
                  <p>Reports Submitted</p>
                </div>
                <div className="counter-item">
                  <span className="counter-number" data-target="4500">0</span>
                  <p>Recycling Pickups</p>
                </div>
                <div className="counter-item">
                  <span className="counter-number" data-target="200">0</span>
                  <p>Cities Covered</p>
                </div>
              </div>
            </div>
            <div className="impact-grid">
              <div className="grid-item item1"><img src="/images/Garbage.png" alt="impact 1" /></div>
              <div className="grid-item item2"><img src="/images/recycling.png" alt="impact 2" /></div>
              <div className="grid-item item3"><img src="/images/map.png" alt="impact 3" /></div>
            </div>
          </div>
        </section>

        {/* Page 5 — Testimonials */}
        <section className="page5" id="page5">
          <h2>Happy Client Works</h2>
          <div className="testimonials-underline"></div>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            className="testimonials-swiper"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="testimonial-slide">
                  <div className="testimonial-card">
                    <i className="fas fa-quote-left quote-icon-top"></i>
                    <p className="testimonial-text">{t.text}</p>
                    <i className="fas fa-quote-right quote-icon-bottom"></i>
                  </div>
                  <div className="testimonial-profile">
                    <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                    <div>
                      <p className="testimonial-name">{t.name}</p>
                      <p className="testimonial-title">{t.title}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <Footer />
      </div>
    </div>
  );
}
