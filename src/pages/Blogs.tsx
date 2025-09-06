import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogCategories = [
  'All',
  'Competition',
  'Technical',
  'Outreach',
  'Team Updates',
];

const placeholderBlogs = [
  {
    slug: 'regional-championship-recap',
    title: 'Regional Championship Recap: Our Journey to Victory',
    excerpt:
      'A detailed breakdown of our performance at the Northern Valley Regional Championship and the lessons we learned along the way.',
    category: 'Competition',
    author: 'Alex Johnson',
    date: '2024-02-15',
    readTime: '5 min read',
    featured: true,
  },
  {
    slug: 'autonomous-system-deep-dive',
    title: 'Building Our Autonomous System: A Technical Deep Dive',
    excerpt:
      'How we developed our advanced autonomous routines using computer vision and PID control systems.',
    category: 'Technical',
    author: 'Sarah Chen',
    date: '2024-02-08',
    readTime: '8 min read',
    featured: false,
  },
  {
    title: 'STEM Outreach at Lincoln Elementary',
    excerpt:
      'Our team visited Lincoln Elementary to inspire the next generation of engineers and programmers.',
    category: 'Outreach',
    author: 'Emma Thompson',
    date: '2024-01-28',
    readTime: '4 min read',
    featured: false,
  },
  {
    title: 'Season Kick-off: New Challenges Ahead',
    excerpt:
      'Our preparation strategy for the new FTC season and the exciting challenges that await us.',
    category: 'Team Updates',
    author: 'David Kim',
    date: '2024-01-15',
    readTime: '3 min read',
    featured: false,
  },
  {
    title: 'Mechanical Design Process: From Concept to Reality',
    excerpt:
      'A behind-the-scenes look at our mechanical design process and the tools we use to bring ideas to life.',
    category: 'Technical',
    author: 'Marcus Rodriguez',
    date: '2024-01-10',
    readTime: '6 min read',
    featured: false,
  },
  {
    title: 'Community Robotics Workshop Success',
    excerpt:
      'Over 50 students participated in our weekend robotics workshop, learning programming and engineering basics.',
    category: 'Outreach',
    author: 'Zoe Williams',
    date: '2023-12-20',
    readTime: '4 min read',
    featured: false,
  },
];

const Blogs = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">Team Blog</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow our journey through competitions, technical challenges,
            outreach activities, and everything that makes our FTC experience
            extraordinary.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {blogCategories.map(category => (
            <Button
              key={category}
              variant={category === 'All' ? 'default' : 'outline'}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Featured Post
          </h2>
          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="grid lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-muted-foreground text-lg">
                  Featured Image
                </span>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <Badge className="mb-4 w-fit bg-primary/10 text-primary border-primary/20">
                  {placeholderBlogs[0].category}
                </Badge>
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  {placeholderBlogs[0].title}
                </h3>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {placeholderBlogs[0].excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    {placeholderBlogs[0].author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(placeholderBlogs[0].date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {placeholderBlogs[0].readTime}
                  </div>
                </div>
                <Link to={`/blogs/${placeholderBlogs[0].slug}`}>
                  <Button className="w-fit group">
                    Read Full Post
                    <ChevronRight
                      size={16}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </Link>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Blog Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Recent Posts
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {placeholderBlogs.slice(1).map((post, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                  <span className="text-muted-foreground">Blog Image</span>
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3 w-fit bg-secondary text-secondary-foreground">
                    {post.category}
                  </Badge>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      {post.readTime}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar size={14} />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <Link to={`/blogs/${post.slug || '#'}`}>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    >
                      Read More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8">
            Load More Posts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
