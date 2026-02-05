"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: number;
  image: string;
}

const items: GalleryItem[] = [
  { id: 1, image: "/images/showcase/01.png" },
  { id: 2, image: "/images/showcase/02.jpg" },
  { id: 3, image: "/images/showcase/03.png" },
  { id: 4, image: "/images/showcase/04.jpeg" },
  { id: 5, image: "/images/showcase/05.jpeg" },
];

export default function FloatingGallerySection() {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!galleryRef.current) return;

    const images = Array.from(galleryRef.current.querySelectorAll("img"));

    const tl = gsap.timeline();

    images.forEach((img, i) => {
      gsap.set(img, {
        y: i * galleryRef.current!.offsetHeight,
      });

      tl.to(
        img,
        {
          y: `-${galleryRef.current!.offsetHeight + img.clientHeight * 1.0}`,
          duration: (i + 1) * 5,
          ease: "none",
        },
        0,
      );
    });

    ScrollTrigger.create({
      animation: tl,
      trigger: galleryRef.current,
      start: "top top",
      end: `+=${images.length * galleryRef.current.offsetHeight}`,
      pin: true,
      scrub: 1,
      // markers: true, // enable for debugging
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <section className="relative w-full md:min-h-[100vh] min-h-[60vh] bg-brand-black text-brand-white">
      <div
        className="hero h-fit py-4 w-full grid place-items-center bg-cover bg-center"
        // style={{
        //   backgroundImage:
        //     "url('https://w.wallhaven.cc/full/2y/wallhaven-2yxp16.jpg')",
        // }}
      >
        <span className="text-[24px] text-[#f0ead6] font-ProtestStrike font-bold mb-6">
          Curated Images
        </span>
      </div>

      <div
        className="image-gallery relative h-screen w-full flex flex-col items-center justify-start"
        ref={galleryRef}
        // style={{
        //   backgroundSize: "5% 5%",
        //   backgroundImage:
        //     "linear-gradient(rgba(240, 234, 214, 0.05) 1.5px, transparent 1.5px, transparent calc(100% - 1.5px), rgba(240, 234, 214, 0.05) calc(100% - 1.5px)), linear-gradient(90deg, rgba(240, 234, 214, 0.05) 1.5px, transparent 1.5px, transparent calc(100% - 1.5px), rgba(240, 234, 214, 0.05) calc(100% - 1.5px))",
        // }}
      >
        <span className="head text-[32px] font-bold absolute top-1/2">
          Scroll for more.
        </span>

        <div className="des absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col gap-4 mb-12">
          <span className="des-head text-[32px] font-bold">IMFC</span>
          <span className="des-des text-sm md:text-base">
            High quality pictures ready for landing pages, design and your next
            project with our amazing gallery
          </span>
        </div>

        {items.map((item, index) => (
          <Image
            key={item.id}
            src={item.image}
            alt={`image-${index + 1}`}
            width={800} // base intrinsic size
            height={1000}
            sizes="
    (max-width: 640px) 80vw,
    (max-width: 1024px) 45vw,
    30vw
  "
            className={`
    absolute
    object-cover
    shadow-[0_0_0_6px_white]
    w-[80vw] sm:w-[50vw] lg:w-[28vw]
    h-auto rounded-2xl
    ${
      index % 2 === 0
        ? " sm:left-[8%] sm:translate-x-0 rotate-[-4deg]"
        : " sm:right-[8%] sm:left-auto sm:translate-x-0 rotate-[4deg]"
    }
  `}
          />
        ))}
      </div>

      {/* <div
        className="the-end h-screen w-full grid place-items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://w.wallhaven.cc/full/rr/wallhaven-rrl8rw.png')",
        }}
      >
        <span className="text-[128px] text-[#f0ead6] font-ProtestStrike font-bold">
          The End
        </span>
      </div> */}
    </section>
  );
}
