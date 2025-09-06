import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const outreachEvents = [
  {
    id: 1,
    title: "First Treasure Hunt",
    date: "2024-07-15",
    summary: "Interactive family event exploring the treasures of FIRST robotics",
    details: "Organized an innovative First Treasure Hunt event where 23 families embarked on an exciting journey to discover the 'treasures of FIRST' - including teamwork, innovation, gracious professionalism, and STEM excellence. Families participated in hands-on activities, robot demonstrations, and interactive challenges that showcased the core values and opportunities within FIRST robotics programs. This unique event successfully introduced families to the world of competitive robotics while making learning fun and engaging.",
    participants: "Full team coordination",
    location: "Community Center", 
    impact: "23 families (69+ individuals) reached"
  },
  {
    id: 2,
    title: "Double Day Java Camp",
    date: "2024-08-01",
    summary: "2-day workshop introducing children to Java coding fundamentals",
    details: "Collaborated with Intra Spirit to organize a workshop introducing children to Java programming. Promoted FTC and encouraged kids to explore robotics as a path to innovation and teamwork. A meaningful step in inspiring the next generation of STEM leaders.",
    participants: "Team collaboration",
    location: "Community Workshop",
    impact: "25+ students reached"
  },
  {
    id: 3,
    title: "FTC Introduction Webinar", 
    date: "2024-08-30",
    summary: "Comprehensive FIRST program overview for families",
    details: "Initiated an Introduction to FIRST webinar reaching 50 different families. Provided comprehensive program overview, held Q&A sessions, and showed examples of our previous year robots. Successfully spread FIRST awareness and inspired newcomers to STEM competition.",
    participants: "Full team presentation",
    location: "Virtual Event", 
    impact: "50 families (150+ individuals) reached"
  },
  {
    id: 4,
    title: "5-Week Coding Camp",
    date: "2024-09-25", 
    summary: "Online Java programming course for younger students",
    details: "Held a 5-week online coding camp teaching Java basics to younger audiences. Concluded with final projects demonstrating student understanding. Students learned Java programming fundamentals and were inspired to explore computer programming depths.",
    participants: "Teaching team",
    location: "Online Platform",
    impact: "15+ students trained"
  },
  {
    id: 5,
    title: "STEM Robotics Fair",
    date: "2024-12-15",
    summary: "Day-long robotics fair in collaboration with SciRavens",  
    details: "Partnered with FTC team SciRavens for a comprehensive robotics fair at the library. Put robots on display, demonstrated FTC capabilities, and explained FIRST robotics to families. The collaboration inspired over 70 families about robotics opportunities.",
    participants: "Joint team effort",
    location: "Local Library", 
    impact: "70+ families (210+ individuals) engaged"
  }
];

const Outreach = () => {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  const toggleEvent = (eventId: number) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">Community Outreach</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe in sharing our passion for STEM and robotics with our community. 
            Here's how we're inspiring the next generation of innovators.
          </p>
        </div>

        {/* Impact Numbers */}
        <section className="mb-16 py-12 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl">
          <h2 className="text-2xl font-bold text-center mb-8 text-foreground">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1300+</div>
              <div className="text-muted-foreground">People Reached</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">5</div>
              <div className="text-muted-foreground">Major Events</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">143+</div>
              <div className="text-muted-foreground">Families Engaged</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">250+</div>
              <div className="text-muted-foreground">Volunteer Hours</div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Outreach Timeline</h2>
          <div className="space-y-4">
            {outreachEvents.map((event, index) => (
              <Card 
                key={event.id} 
                className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => toggleEvent(event.id)}
              >
                <CardContent className="p-0">
                  {/* Event Header */}
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
                        <h3 className="text-xl font-bold text-foreground">{event.title}</h3>
                        <Badge className="w-fit bg-primary/10 text-primary border-primary/20">
                          {new Date(event.date).toLocaleDateString()}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{event.summary}</p>
                      
                      <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Users size={16} />
                          {event.participants}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          {event.impact}
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4 flex-shrink-0">
                      {expandedEvent === event.id ? (
                        <ChevronUp className="h-6 w-6 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedEvent === event.id && (
                    <div className="px-6 pb-6 pt-0 border-t border-border bg-muted/20">
                      <div className="grid lg:grid-cols-3 gap-6 pt-6">
                        <div className="lg:col-span-2">
                          <h4 className="font-semibold text-foreground mb-3">Event Details</h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {event.details}
                          </p>
                        </div>
                        <div>
                          <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted rounded-lg flex items-center justify-center mb-4">
                            <span className="text-muted-foreground text-sm">Event Photo</span>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary mb-1">
                              {event.impact.split(' ')[0]}
                            </div>
                            <div className="text-muted-foreground text-sm">
                              {event.impact.split(' ').slice(1).join(' ')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Digital Outreach */}
        <section className="mt-20 py-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Digital Outreach</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We also reach our community through digital platforms, sharing our robotics journey and inspiring others online.
          </p>
          <div className="max-w-md mx-auto">
            <Card className="p-6">
              <CardContent className="p-0 text-center">
                <div className="text-4xl font-bold text-primary mb-2">841</div>
                <div className="text-lg font-semibold text-foreground mb-2">YouTube Views</div>
                <div className="text-muted-foreground text-sm">Robotics Demo Video</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Future Plans */}
        <section className="mt-20 py-16 bg-muted/30 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Future Outreach Plans</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always planning new ways to share our passion for STEM and robotics. 
            Here's what we have coming up next season.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6">
              <CardContent className="p-0 text-center">
                <div className="text-lg font-semibold text-foreground mb-2">Advanced Java Workshops</div>
                <div className="text-muted-foreground text-sm">Multi-week intensive programming</div>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="p-0 text-center">
                <div className="text-lg font-semibold text-foreground mb-2">Elementary School Visits</div>
                <div className="text-muted-foreground text-sm">Hands-on robotics demos</div>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="p-0 text-center">
                <div className="text-lg font-semibold text-foreground mb-2">Community Tech Fairs</div>
                <div className="text-muted-foreground text-sm">Family-friendly STEM events</div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Outreach;