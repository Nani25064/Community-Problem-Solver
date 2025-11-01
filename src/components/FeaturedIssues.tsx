import IssueCard from "./IssueCard";

const mockIssues = [
  {
    id: "1",
    title: "Pothole on Main Street causing traffic issues",
    description: "Large pothole near the intersection of Main St and 5th Ave is causing traffic delays and potential safety hazards.",
    category: "infrastructure" as const,
    status: "open" as const,
    location: "Main St & 5th Ave",
    upvotes: 47,
    comments: 12,
    createdAt: new Date("2024-01-15"),
    imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format",
  },
  {
    id: "2",
    title: "Broken streetlight in Central Park",
    description: "Streetlight has been out for over a week, creating a safety concern for evening walkers.",
    category: "safety" as const,
    status: "in-progress" as const,
    location: "Central Park, North Entrance",
    upvotes: 32,
    comments: 8,
    createdAt: new Date("2024-01-18"),
    imageUrl: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&auto=format",
  },
  {
    id: "3",
    title: "Community garden needs maintenance",
    description: "The community garden has overgrown weeds and needs general cleanup and maintenance.",
    category: "environment" as const,
    status: "resolved" as const,
    location: "Community Garden, Oak Street",
    upvotes: 28,
    comments: 15,
    createdAt: new Date("2024-01-10"),
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format",
  },
];

const FeaturedIssues = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Recent Community Issues
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what your neighbors are reporting and help make a difference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockIssues.map((issue) => (
            <IssueCard key={issue.id} {...issue} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedIssues;
