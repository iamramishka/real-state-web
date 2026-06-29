import Image from "next/image";

const heroImage = {
  src: "/images/hero-home.jpg",
  width: 1600,
  height: 900,
  alt: "A contemporary luxury home with floor-to-ceiling windows, surrounded by mature trees at dusk.",
};

export function Hero() {
  return (
    <section className="bg-bg pb-section-y text-ink pt-10 md:pt-16">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-start">
          <h1 className="font-display text-display-1 font-semibold tracking-normal text-balance">
            <span className="block">Find the home</span>
            <span className="block">you&apos;ve been imagining.</span>
          </h1>
          <p className="text-body-lg text-muted max-w-xl text-pretty lg:pt-8">
            More than a property search — Nordhaven connects you with the homes,
            neighbourhoods, and people that make the move worth making.
          </p>
        </div>

        <div className="border-line bg-surface shadow-soft mt-8 overflow-hidden rounded-xl border md:mt-10 lg:mt-12">
          <Image
            alt={heroImage.alt}
            className="aspect-[16/10] h-auto w-full object-cover md:aspect-[16/9]"
            height={heroImage.height}
            priority
            sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1280px) calc(100vw - 8rem), 1280px"
            src={heroImage.src}
            width={heroImage.width}
          />
        </div>
      </div>
    </section>
  );
}
