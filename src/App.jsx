import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useRef, useState } from "react";
// import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const App = () => {
  const [showCanvas, setShowCanvas] = useState(false);

  const headingref = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <span
        ref={growingSpan}
        className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5"
      ></span>

      <div className="w-full relative min-h-screen font-['Helvetica_Now_Display']overflow-x-hidden">
        {showCanvas &&
          data[0].map((canvasdets, index) => (
            <Canvas details={canvasdets} key={index} />
          ))}
        <div className="w-full h-screen  relative z-[1]">
          <nav className="w-full p-8 flex justify-between z-50">
            <div className="brand text-2xl front-regular">thirtysixstudios</div>
            <div className="links flex gap-10">
              {["Home", "About", "Contact", "Projects"].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-md hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className="textcontainer px-[20%] w-full">
            <div className="text w-[50%]">
              <h3 className="text-3xl leading-[1.2]">
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-lg w-[80%] mt-10 font-normal">
                We’re a boutique production studio focused on design, motion,
                and creative technology, constantly reimagining what digital
                craft can do for present-time ads and campaigns.
              </p>
              <p className="text-md mt-10">Scroll</p>
            </div>
          </div>
          <div className="overflow-x-hidden w-full">
            <div className="w-full absolute bottom-0 left-0">
              <h1
                ref={headingref}
                className="text-[14rem] font-normal tracking-tight leading-none pl-5"
              >
                Thirtysixstudios
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-screen  relative mt-32 px-10">
        {showCanvas &&
          data[1].map((canvasdets, index) => (
            <Canvas details={canvasdets} key={index} />
          ))}

        <h1 className="text-8xl tracking-tighter">About the brand</h1>
        <p className="text-3xl w-[80%] mt-10 font-light leading-[1.8]">
          we are a team of designers, developers, and strategists who are
          passionate about creating digital experiences that are both beautiful
          and functional, we are a team of designers, developers, and
          strategists who are passionate about creating digital experiences that
          are both beautiful and functional.
        </p>
        <img
          className="w-[80%] mt-10"
          src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
          alt=""
        />
      </div>
    </>
  );
};

export default App;
