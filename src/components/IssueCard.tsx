import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, ArrowUp, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export type IssueStatus = "open" | "in-progress" | "resolved" | "closed";
export type IssueCategory = "infrastructure" | "safety" | "environment" | "public-space" | "other";

interface IssueCardProps {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  location: string;
  upvotes: number;
  comments: number;
  createdAt: Date;
  imageUrl?: string;
}

const statusConfig: Record<IssueStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  "open": { label: "Open", variant: "destructive" },
  "in-progress": { label: "In Progress", variant: "default" },
  "resolved": { label: "Resolved", variant: "secondary" },
  "closed": { label: "Closed", variant: "outline" },
};

const categoryColors: Record<IssueCategory, string> = {
  infrastructure: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  safety: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  environment: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "public-space": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  other: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
};

const IssueCard = ({
  id,
  title,
  description,
  category,
  status,
  location,
  upvotes,
  comments,
  createdAt,
  imageUrl,
}: IssueCardProps) => {
  const statusInfo = statusConfig[status];

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-gradient-card border-border">
      {imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant={statusInfo.variant} className="capitalize">
            {statusInfo.label}
          </Badge>
          <Badge variant="outline" className={categoryColors[category]}>
            {category.replace("-", " ")}
          </Badge>
        </div>
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-muted-foreground line-clamp-2 mb-4">{description}</p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{createdAt.toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <ArrowUp className="h-4 w-4" />
            <span className="text-sm font-medium">{upvotes}</span>
          </button>
          <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm font-medium">{comments}</span>
          </button>
        </div>
        
        <Button variant="ghost" size="sm" asChild className="hover:bg-accent">
          <Link to={`/issues/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IssueCard;
