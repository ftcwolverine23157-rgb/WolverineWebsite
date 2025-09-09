import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Users, Trophy, Wrench } from 'lucide-react';

const sponsorshipTiers = [
  {
    name: "Title Sponsor",
    amount: "$2,500+",
    color: "text-accent",
    benefits: [
      "Team name recognition",
      "Logo on robot and team shirts", 
      "Social media recognition",
      "Competition updates",
      "Annual report inclusion"
    ]
  },
  {
    name: "Robot Sponsor", 
    amount: "$1,000+",
    color: "text-primary",
    benefits: [
      "Logo on robot",
      "Team website recognition",
      "Competition photos",
      "Progress updates"
    ]
  },
  {
    name: "Event Sponsor",
    amount: "$500+", 
    color: "text-foreground",
    benefits: [
      "Logo on team banner",
      "Website recognition",
      "Thank you in presentations"
    ]
  },
  {
    name: "Parts Sponsor",
    amount: "$250+",
    color: "text-muted-foreground", 
    benefits: [
      "Website recognition",
      "Team newsletter inclusion"
    ]
  }
];

const expenses = [
  { item: "Competition Registration", amount: "$200" },
  { item: "Robot Parts & Materials", amount: "$1,500" },
  { item: "Tools & Equipment", amount: "$800" },
  { item: "Team Shirts & Uniforms", amount: "$300" },
  { item: "Travel & Accommodation", amount: "$600" },
  { item: "Workshop Materials", amount: "$200" },
  { item: "Outreach Expenses", amount: "$1,500" }
];

const Sponsor = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">Sponsor Our Team</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Help us inspire the next generation of STEM leaders. Your support makes it possible 
            for our team to compete, learn, and share our passion for robotics with the community.
          </p>
        </div>

        {/* Why Sponsor Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Why Sponsor FTC Wolverines?</h2>
          <div className="grid lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Community Impact</h3>
                <p className="text-muted-foreground text-sm">
                  We've reached 1300+ students through outreach programs, inspiring the next generation of engineers.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <Trophy className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Proven Excellence</h3>
                <p className="text-muted-foreground text-sm">
                  Regional champions with multiple awards in design, programming, and community outreach.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <Wrench className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Real Skills</h3>
                <p className="text-muted-foreground text-sm">
                  Students learn programming, engineering, project management, and teamwork skills.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <Heart className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Giving Back</h3>
                <p className="text-muted-foreground text-sm">
                  We mentor other teams, volunteer at competitions, and teach STEM in our community.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Donation Form */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">Make a Donation</h2>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Support FTC Team Wolverines
                  </h3>
                  <p className="text-muted-foreground">
                    Your donation helps us compete, learn, and inspire others in STEM
                  </p>
                </div>
                <div className="p-1">
                  <iframe 
                    src="https://hcb.hackclub.com/donations/start/ftc-wolverine" 
                    style={{border: 'none'}} 
                    name="donateFrame" 
                    scrolling="yes" 
                    frameBorder="0" 
                    marginHeight={0} 
                    marginWidth={0} 
                    height="600px" 
                    width="100%" 
                    allowFullScreen
                    title="Donation Form"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Sponsorship Tiers */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Sponsorship Opportunities</h2>
          <div className="grid lg:grid-cols-4 gap-6">
            {sponsorshipTiers.map((tier, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <h3 className={`text-2xl font-bold mb-2 ${tier.color}`}>{tier.name}</h3>
                    <div className="text-3xl font-bold text-foreground">{tier.amount}</div>
                  </div>
                  <ul className="space-y-3">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Budget Breakdown */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">How Your Money Helps</h2>
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="space-y-4">
                  {expenses.map((expense, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                      <span className="text-foreground font-medium">{expense.item}</span>
                      <Badge variant="secondary" className="font-semibold">{expense.amount}</Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t-2 border-primary/20">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-foreground">Annual Team Budget</span>
                    <span className="text-primary">$5,100</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-muted/30 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Questions About Sponsorship?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We'd love to discuss how we can work together to support STEM education 
            and showcase your company's commitment to the community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => window.open('mailto:ftcwolverines23157@gmail.com?subject=Sponsorship Inquiry', '_blank')}>
              Contact Our Team
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.open('/src/assets/FTC Sponsorship Package (1).pdf', '_blank')}>
              Download Sponsorship Packet
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sponsor;
