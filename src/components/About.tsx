import Card from "./Card";
import { SPACING } from "../lib/constants";

export default function About() {
  return (
    <div className={`bg-gray-100 min-h-screen flex items-center ${SPACING.section.combined}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
          From Bedside to Bytecode
        </h2>
        <p className="px-4 sm:px-8 md:px-12 text-center text-base sm:text-lg mb-12 text-gray-700 max-w-3xl mx-auto">
          After 15+ years in nursing, I earned my BS in Computer Science. Now,
          I&apos;m healing wounds on the weekends, and hacking my way into tech
          during the week; one deploy at a time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            title="The Big Picture"
            content="Create SaaS to solve everyday problems for people and businesses. Start small, then grow to handle bigger challenges. Work on my own, but open to teaming up with like-minded developers or joining companies with goals I believe in."
          />
          <Card
            title="The Approach"
            content="I learn by doing: read a bit of theory, build a simple version, then improve it step by step. This blog shares my progress to help others starting out and to learn from those further along. Let's connect to share ideas, give advice or collaborate."
          />
          <Card
            title="The Path"
            content="Cover all parts of SaaS: web development for front and back ends; DevOps for cloud setup, scaling, and security; ML and AI from basics to advanced tools like LLMs and agents. Begin with the small basics, build them up, test, fix, and keep going."
          />
        </div>
      </div>
    </div>
  );
}
