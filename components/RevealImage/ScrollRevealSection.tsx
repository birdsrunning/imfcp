import { RevealImage } from "./reveal-image";

export default function ScrollRevealSection() {
  return (
    <section className="w-full">
      {/* Section header */}
      <div className="mb-24 text-center">
        <p className="mb-4 text-xs uppercase tracking-widest text-white/50">
          Image delivery
        </p>

        <h2 className="mx-auto max-w-2xl text-2xl md:text-3xl font-medium text-white">
          Images that arrive ready to use.
        </h2>
      </div>

      {/* Images */}
      <div className="flex flex-col gap-[16vh]">
        <RevealImage src="/images/showcase/01.png" />
        <RevealImage src="/images/showcase/02.jpg" />
        <RevealImage src="/images/showcase/03.png" />
      </div>
    </section>
  );
}
