import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';

// Mock blog data - in a real app, this would come from an API
const blogPosts = {
  'regional-championship-recap': {
    title: "Regional Championship Recap: Our Journey to Victory",
    content: `
      <p>Our journey to the Northern Valley Regional Championship was nothing short of extraordinary. After months of preparation, countless hours of testing, and unwavering dedication from every team member, we finally achieved what we had been working towards all season.</p>
      
      <h2>The Build Season</h2>
      <p>Our build season began with careful analysis of the game rules and strategic planning. We knew that success would require not just a well-designed robot, but also effective teamwork and communication. Our mechanical team worked tirelessly to create a robust chassis and scoring mechanisms, while our software team developed sophisticated autonomous routines.</p>
      
      <h2>Competition Day</h2>
      <p>The day of the competition was filled with excitement and nervous energy. Our robot performed consistently throughout the qualification matches, earning us a spot in the elimination rounds. The alliance selection process was intense, but we were honored to be chosen as the first pick by the top-seeded alliance.</p>
      
      <h2>Key Learnings</h2>
      <p>This competition taught us valuable lessons about perseverance, adaptability, and the importance of gracious professionalism. We learned that success in FTC isn't just about winning matches—it's about building relationships, learning from failures, and continuously improving.</p>
      
      <h2>Looking Forward</h2>
      <p>As we prepare for the next season, we're excited to apply everything we've learned and continue pushing the boundaries of what's possible in robotics. Thank you to all our supporters, mentors, and fellow teams who made this journey possible.</p>
    `,
    category: "Competition",
    author: "Alex Johnson",
    date: "2024-02-15",
    readTime: "5 min read",
    featured: true
  },
  'autonomous-system-deep-dive': {
    title: "Building Our Autonomous System: A Technical Deep Dive",
    content: `
      <p>One of the most challenging aspects of this season's robot was developing a reliable autonomous system that could consistently score points in the first 30 seconds of each match.</p>
      
      <h2>Computer Vision Integration</h2>
      <p>We implemented a sophisticated computer vision system using OpenCV to detect and track game elements. This required extensive calibration and testing to ensure accuracy under various lighting conditions.</p>
      
      <h2>PID Control Systems</h2>
      <p>Our drive system utilized PID controllers for precise movement and positioning. We spent weeks tuning the PID constants to achieve optimal performance while maintaining stability.</p>
      
      <h2>Path Planning</h2>
      <p>We developed custom path planning algorithms that allowed our robot to navigate efficiently while avoiding obstacles and optimizing scoring opportunities.</p>
      
      <h2>Testing and Iteration</h2>
      <p>The key to our success was rigorous testing and continuous iteration. We logged hundreds of autonomous runs and analyzed the data to identify areas for improvement.</p>
    `,
    category: "Technical",
    author: "Sarah Chen",
    date: "2024-02-08",
    readTime: "8 min read",
    featured: false
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug as keyof typeof blogPosts] : null;

  if (!post) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blogs">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/blogs">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <div className="mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            {post.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User size={16} />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(post.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {post.readTime}
            </div>
            <Button variant="outline" size="sm">
              <Share2 size={16} className="mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-12">
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground text-lg">Featured Image</span>
          </div>
        </div>

        {/* Article Content */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </CardContent>
        </Card>

        {/* Author Info */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-primary">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{post.author}</h3>
                <p className="text-muted-foreground">Team Member</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Posts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Related Posts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(blogPosts)
              .filter(([key]) => key !== slug)
              .slice(0, 2)
              .map(([key, relatedPost]) => (
                <Link key={key} to={`/blogs/${key}`}>
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <Badge className="mb-3 bg-secondary text-secondary-foreground">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="text-xl font-bold text-foreground mb-3 hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User size={14} />
                          {relatedPost.author}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          {new Date(relatedPost.date).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
