import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Users, Target, Heart, ChevronRight } from 'lucide-react';
import heroImage from '@/assets/robotics-hero.jpg';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
            FTC Team #23157 | Est. 2022
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6">
            Building Tomorrow's
            <span className="block text-accent-foreground">Innovators</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            We're FTC Team Wolverine from the SF Bay Area - a group of passionate high schoolers 
            dedicated to making a positive impact through robotics and STEM innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/team">
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Meet Our Team
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/robot">
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                See Our Robot
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What is FTC Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">What is FTC?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">First Tech Challenge</h3>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                The FIRST Tech Challenge (FTC) is more than just a robotics competition—it's a life-changing 
                experience that empowers students to think creatively, work as a team, and solve real-world 
                problems using cutting-edge technology. In FTC, students design, build, and program robots 
                to compete in exciting, fast-paced challenges, all while developing crucial skills in 
                engineering, coding, and critical thinking.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-primary mb-2">198+</div>
                  <div className="text-muted-foreground">Countries</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-accent mb-2">7,000+</div>
                  <div className="text-muted-foreground">Teams</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-primary mb-2">28M</div>
                  <div className="text-muted-foreground">Volunteer Hours</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-accent mb-2">3.9M+</div>
                  <div className="text-muted-foreground">Students Reached</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Who We Are */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="p-8 bg-gradient-to-br from-background to-muted/50 border-l-4 border-l-primary">
              <CardContent className="p-0">
                <Target className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our mission as FTC Team Wolverine is to ignite a passion for STEM within our team and our 
                  community by embracing the values of innovation, collaboration, and service.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-background to-muted/50 border-l-4 border-l-accent">
              <CardContent className="p-0">
                <Heart className="h-12 w-12 text-accent mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become a leading robotics team that not only excels in competition but 
                  also makes a positive impact in our community through outreach, mentorship, 
                  and STEM advocacy.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-background to-muted/50 border-l-4 border-l-primary">
              <CardContent className="p-0">
                <Users className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-foreground">Who We Are</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We are team FTC Wolverine, a group of passionate high schoolers dedicated to making a 
                  positive impact in our community through robotics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Photo Gallery Placeholder */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Team in Action</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Take a look at our team working hard, competing, and making memories
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Photo {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Ready to Support Our Journey?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Help us continue pushing the boundaries of innovation and STEM education
          </p>
          <Link to="/sponsor">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Become a Sponsor
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
