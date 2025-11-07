import Button from "@/components/button/Button";
import { DummyContent } from "@/components/dummy-content/DummyContent";

export default function About() {
  return (
    <main className="main-container bg-[#0f1014] px-6 ">
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-6 text-center">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-[#ececec]"
              style={{ fontFamily: "var(--font-red-hat-display), sans-serif" }}
            >
              About EntropyFlow
            </h1>

            <p
              className="text-lg sm:text-xl text-[#ececec]/70 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "var(--font-red-hat-display), sans-serif" }}
            >
              A visual timeline system for mapping your personal chronology and
              understanding events in context.
            </p>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-8">
            <section className="flex flex-col gap-4">
              <h2
                className="text-2xl font-semibold text-[#ececec]"
                style={{
                  fontFamily: "var(--font-red-hat-display), sans-serif",
                }}
              >
                Concept
              </h2>
              <p
                className="text-[#ececec]/70 leading-relaxed"
                style={{
                  fontFamily: "var(--font-red-hat-display), sans-serif",
                }}
              >
                EntropyFlow is built around interactive nodes placed along a
                time stream. Record moments, events, or memories as nodes and
                visualize how they connect across your personal timeline.
              </p>
            </section>

            <section className="flex flex-col gap-4">
              <h2
                className="text-2xl font-semibold text-[#ececec]"
                style={{
                  fontFamily: "var(--font-red-hat-display), sans-serif",
                }}
              >
                Philosophy
              </h2>
              <p
                className="text-[#ececec]/70 leading-relaxed"
                style={{
                  fontFamily: "var(--font-red-hat-display), sans-serif",
                }}
              >
                The interface is designed to feel scientific, introspective, and
                temporal—enabling you to move through personal history with
                clarity rather than nostalgia. We focus on understanding
                connections and context, not just storing information.
              </p>
            </section>
          </div>

          {/* CTA */}
          <div className="flex justify-center pt-8">
            <Button as="link" href="/" variant="secondary" size="md">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
      <DummyContent />
    </main>
  );
}
