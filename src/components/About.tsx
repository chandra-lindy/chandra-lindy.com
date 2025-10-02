import Card from './Card';

export default function About() {
  return (
    <div className="bg-gray-100 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Hey, I'm Chandra, the Nurse-Turned-Code-Wrangler
        </h2>
        <p className="text-center text-lg mb-12 text-gray-700 max-w-3xl mx-auto">
          With 15+ years healing wounds in the ER, I traded scalpels for syntax and just wrapped my BS in Computer Science. Now, I'm hacking my way into tech, one deploy at a time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            title="Why This Blog?"
            content="To chronicle the chaos and breakthroughs of my learning curve—because sharing the stumbles makes the wins sweeter."
          />
          <Card
            title="The Big Picture"
            content="Land a Cloud DevOps gig (think Kubernetes orchestration on AWS) while bootstrapping side SaaS ideas that solve real pains. Already? I've got a Vercel-hosted prototype humming."
          />
          <Card
            title="How I Roll"
            content="Hands-on all the way—build, break, iterate. AI's my secret weapon: Grok debugs my Next.js hooks, and automation scripts handle the grunt work so I can focus on the fun."
          />
        </div>
      </div>
    </div>
  );
}
