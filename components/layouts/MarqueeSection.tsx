"use client";

import FeatureCard from "../FeatureCard";

const features = [
  { icon: "🎨", title: "Curated Visuals" },
  { icon: "⚡", title: "Fast Asset Generation" },
  { icon: "📈", title: "Insights & Metrics" },
  { icon: "🧠", title: "AI-powered Suggestions" },
  { icon: "🛠️", title: "Custom Workflows" },
  { icon: "🌐", title: "Cross-platform Sharing" },
  { icon: "💾", title: "Version Control" },
];

export default function FeatureMarquee() {
  return (
    <section id="features" className="feature-section w-full overflow-hidden">
      <p className="feature-intro">
        Designed to remove friction between your ideas and the final result.
      </p>

      <div className="marquee">
        <div className="marquee-track">
          {[...features, ...features].map((feature, i) => (
            <FeatureCard key={i} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
