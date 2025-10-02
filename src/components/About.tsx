import Card from "./Card";

export default function About() {
  return (
    <div className="bg-gray-100 h-screen flex items-center px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">
          From Bedside to Bytecode
        </h2>
        <p className="px-12 text-center text-lg mb-12 text-gray-700 max-w-3xl mx-auto">
          With 15+ years in nursing, I traded scalpels for syntax and just
          wrapped up my BS in Computer Science. Now, I&apos;m healing wounds on the
          weekends, and hacking my way into tech during the week; one deploy at
          a time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            title="Why This Blog?"
            content="To chronicle the chaos and breakthroughs of my learning curve, because sharing stumbles turns wins sweeter, and who knows? It might spark your own breakthrough or interest to collaborate."
          />
          <Card
            title="The Big Picture"
            content="Land a Cloud DevOps role (Kubernetes on AWS, anyone?) while bootstrapping SaaS side hustles that tackle real-world headaches. Ideas? Endless. Execution? That's my current grind, starting with this blog."
          />
          <Card
            title="How I Roll"
            content="Hands-on all the way: build, break, iterate. I embrace AI like a turbo-boost: Grok debugs my Next.js hooks, ChatGPT brainstorms wild ideas, and tools like it automate the boring bits so I can focus on the big picture."
          />
        </div>
      </div>
    </div>
  );
}
