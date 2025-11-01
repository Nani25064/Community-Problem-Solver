import { AlertCircle, Users, TrendingUp, Bell } from "lucide-react";

const features = [
  {
    icon: AlertCircle,
    title: "Easy Reporting",
    description: "Report community issues in seconds with our simple form. Add photos, location, and details.",
    color: "bg-blue-100 dark:bg-blue-900/30 text-primary",
  },
  {
    icon: Users,
    title: "Community Engagement",
    description: "Upvote issues that matter to you and engage in discussions with your neighbors.",
    color: "bg-green-100 dark:bg-green-900/30 text-success",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Follow issues from report to resolution. Get updates on the problems you care about.",
    color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600",
  },
  {
    icon: Bell,
    title: "Get Notified",
    description: "Receive notifications when issues in your area are reported or resolved.",
    color: "bg-orange-100 dark:bg-orange-900/30 text-warning",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How CommunityFix Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple tools to make your community better, one issue at a time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`${feature.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
