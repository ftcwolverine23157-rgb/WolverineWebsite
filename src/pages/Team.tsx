import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Github, Linkedin } from 'lucide-react';
import dhruvPhoto from '@/assets/DhruvPhoto.png';
import prayagPhoto from '@/assets/PrayagPhoto.png';
import sanshrayPhoto from '@/assets/SanshrayPhoto.png';
import aditiPhoto from '@/assets/AditiPhoto.png';
import advikaPhoto from '@/assets/advikaPhoto.png';
import rishiPhoto from '@/assets/rishiPhoto.png';
import anandPhoto from '@/assets/anandPhoto.png';
import aaravPhoto from '@/assets/aaravPhoto.png';
import meeraPhoto from '@/assets/meeraPhoto.png';
import gautamPhoto from '@/assets/gautamPhoto.png';
const teamMembers = [

  {
    "name": "Prayag Poudel",
    "role": "Team Captain",
    "description": "Prayag leads the team and specializes in mechanical design and strategic decision-making. He ensures smooth coordination between all sub-teams.",
    "skills": ["Leadership", "Mechanical Design", "Strategy", "Team Management"],
    "email": "prayagpoudel@gmail.com",
    "photo": prayagPhoto
  },
  {
    "name": "Dhruv Jindal",
    "role": "Outreach Captain",
    "description": "Dhruv heads our outreach initiatives, focusing on connecting with the community, fundraising, and event planning to expand our impact.",
    "skills": ["Leadership", "Strategy", "Fundraising", "Event Planning", "Social Media"],
    "email": "dhrjin211@gmail.com",
    "photo": dhruvPhoto
  },
  {
    "name": "Meera",
    "role": "Outreach Member",
    "description": "Meera supports the outreach team by helping plan and execute events, ensuring successful team representation in the community.",
    "skills": ["Planning", "Execution", "Organization"],
    "email": "meera@ftcwolverines.com",
    "photo": meeraPhoto
  },
  {
    "name": "Aditi",
    "role": "Outreach Member",
    "description": "Aditi contributes to outreach by assisting with event preparation and developing creative ways to engage with the community.",
    "skills": ["Event Support", "Planning", "Communication"],
    "email": "aditi@ftcwolverines.com",
    "photo": aditiPhoto
  },
  {
    "name": "Anand",
    "role": "Outreach Member",
    "description": "Anand helps organize outreach activities, supporting both logistics and hands-on execution to ensure smooth operations.",
    "skills": ["Teamwork", "Logistics", "Event Execution"],
    "email": "anand@ftcwolverines.com",
    "photo": anandPhoto
  },
  {
    "name": "Varun",
    "role": "Hardware Lead",
    "description": "Varun leads the hardware team, specializing in robot assembly, mechanical problem-solving, and ensuring robust design.",
    "skills": ["Mechanical Design", "Assembly", "Problem-Solving", "Prototyping"],
    "email": "varun@ftcwolverines.com"
  },
  {
    "name": "Aarav",
    "role": "Hardware Member",
    "description": "Aarav contributes to the hardware team by assisting with robot construction and helping refine mechanisms for competition.",
    "skills": ["Assembly", "Mechanical Support", "Teamwork"],
    "email": "aarav@ftcwolverines.com",
    "photo": aaravPhoto
  },
  {
    "name": "Rishi",
    "role": "Hardware Member",
    "description": "Rishi supports the hardware team with building, testing, and maintaining robot systems to ensure consistent performance.",
    "skills": ["Robot Building", "Testing", "Troubleshooting"],
    "email": "rishi@ftcwolverines.com",
    "photo": rishiPhoto
  },
  {
    "name": "Sanshray Vakalagadda",
    "role": "Software Lead",
    "description": "Sanshray leads the coding team, specializing in autonomous programming and system integration to optimize robot performance.",
    "skills": ["Java", "Autonomous Programming", "Control Systems", "Debugging"],
    "email": "sanshray@ftcwolverines.com",
    "photo": sanshrayPhoto
  },
  {
    "name": "Advika",
    "role": "Coding Member",
    "description": "Advika assists the coding team with writing, testing, and refining software for both autonomous and teleop modes.",
    "skills": ["Programming", "Testing", "Problem-Solving"],
    "email": "advika@ftcwolverines.com",
    "photo": advikaPhoto
  },
  {
    "name": "Gautam",
    "role": "Coding Member",
    "description": "Gautum contributes to coding efforts by supporting debugging and testing, ensuring reliability during matches.",
    "skills": ["Debugging", "Programming Support", "Collaboration"],
    "email": "gautum@ftcwolverines.com",
    "photo": gautamPhoto
  },


];

const Team = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">Meet Our Team</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our diverse team brings together students passionate about robotics, engineering, 
            and making a positive impact in our community through STEM education.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-background to-muted/30">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Profile Photo */}
                  <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto md:mx-0 flex-shrink-0 overflow-hidden">
                    {member.photo ? (
                      <img 
                        src={member.photo} 
                        alt={`${member.name} photo`}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  
                  {/* Member Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{member.name}</h3>
                    <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                      {member.role}
                    </Badge>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {member.description}
                    </p>
                    
                    {/* Skills */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {member.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Contact */}
                    <div className="flex gap-3 justify-center md:justify-start">
                      <a 
                        href={`mailto:${member.email}`}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/10"
                      >
                        <Mail size={18} />
                      </a>
                      <a 
                        href="#"
                        className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/10"
                      >
                        <Github size={18} />
                      </a>
                      <a 
                        href="#"
                        className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/10"
                      >
                        <Linkedin size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Stats */}
        <section className="mt-20 py-16 bg-muted/30 rounded-2xl">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Team Achievements</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">4</div>
                <div className="text-muted-foreground">Organizations Partnered</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">1300+</div>
                <div className="text-muted-foreground">People Reached</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">250</div>
                <div className="text-muted-foreground">Volunteer Hours</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">4</div>
                <div className="text-muted-foreground">Awards Won</div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">Award Highlights</h3>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div className="bg-primary/10 rounded-lg p-3">
                  <div className="font-semibold text-primary">Design Award</div>
                  <div className="text-muted-foreground">Won Twice</div>
                </div>
                <div className="bg-accent/10 rounded-lg p-3">
                  <div className="font-semibold text-accent">Judges Choice</div>
                  <div className="text-muted-foreground">Award Winner</div>
                </div>
                <div className="bg-primary/10 rounded-lg p-3">
                  <div className="font-semibold text-primary">1st Alliance Captain</div>
                  <div className="text-muted-foreground">Competition Leader</div>
                </div>
                <div className="bg-accent/10 rounded-lg p-3">
                  <div className="font-semibold text-accent">Design Award</div>
                  <div className="text-muted-foreground">Second Win</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Team;
