import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cpu, Cog, Zap, Camera } from 'lucide-react';

const Robot = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">Our Robot</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet our competition robot - a masterpiece of engineering, programming, and teamwork 
            designed to excel in the FTC challenge.
          </p>
        </div>

        {/* Robot Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="aspect-square bg-gradient-to-br from-muted/50 to-muted rounded-2xl flex items-center justify-center mb-6">
              <span className="text-muted-foreground text-xl">Robot Photo</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">View {i}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Wolverine MK-V</h2>
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                2024 Season Robot
              </Badge>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our latest robot represents months of design, prototyping, and refinement. 
                Built for the 2024 FTC challenge, it combines precision engineering with 
                advanced programming to perform complex autonomous and driver-controlled tasks.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <CardContent className="p-0 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">18"</div>
                  <div className="text-muted-foreground text-sm">Max Size</div>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardContent className="p-0 text-center">
                  <div className="text-2xl font-bold text-accent mb-1">42 lbs</div>
                  <div className="text-muted-foreground text-sm">Weight</div>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardContent className="p-0 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">6</div>
                  <div className="text-muted-foreground text-sm">Motors</div>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardContent className="p-0 text-center">
                  <div className="text-2xl font-bold text-accent mb-1">12</div>
                  <div className="text-muted-foreground text-sm">Sensors</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <Tabs defaultValue="mechanical" className="mb-20">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mechanical">Mechanical</TabsTrigger>
            <TabsTrigger value="electrical">Electrical</TabsTrigger>
            <TabsTrigger value="software">Software</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="mechanical" className="space-y-6">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Cog className="h-6 w-6 text-primary mr-3" />
                  <h3 className="text-2xl font-semibold text-foreground">Mechanical Systems</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Drivetrain</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Mecanum wheel drive system</li>
                      <li>• 4-motor configuration for omnidirectional movement</li>
                      <li>• Aluminum chassis with carbon fiber reinforcement</li>
                      <li>• Precision-machined components for reliability</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Manipulator</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Multi-stage linear slide system</li>
                      <li>• Custom-designed intake mechanism</li>
                      <li>• Precision scoring system</li>
                      <li>• Lightweight yet robust construction</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="electrical" className="space-y-6">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Zap className="h-6 w-6 text-primary mr-3" />
                  <h3 className="text-2xl font-semibold text-foreground">Electrical Systems</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Control Hub</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• REV Control Hub with integrated IMU</li>
                      <li>• Expansion Hub for additional I/O</li>
                      <li>• Clean cable management system</li>
                      <li>• Redundant power distribution</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Sensors</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Distance sensors for autonomous navigation</li>
                      <li>• Color sensors for game piece detection</li>
                      <li>• Encoders for precise movement</li>
                      <li>• Vision processing camera</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="software" className="space-y-6">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Cpu className="h-6 w-6 text-primary mr-3" />
                  <h3 className="text-2xl font-semibold text-foreground">Software Systems</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Autonomous Programming</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Advanced path planning algorithms</li>
                      <li>• Computer vision for object recognition</li>
                      <li>• PID control for precise movements</li>
                      <li>• State machine architecture</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">TeleOp Control</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Intuitive driver interface</li>
                      <li>• Field-centric drive control</li>
                      <li>• Automated scoring assistance</li>
                      <li>• Real-time telemetry display</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Camera className="h-6 w-6 text-primary mr-3" />
                  <h3 className="text-2xl font-semibold text-foreground">Performance Metrics</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">2.5s</div>
                    <div className="text-muted-foreground">Autonomous Runtime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-2">95%</div>
                    <div className="text-muted-foreground">Scoring Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">6 ft/s</div>
                    <div className="text-muted-foreground">Max Speed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Competition Results */}
        <section className="py-16 bg-muted/30 rounded-2xl">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Competition Results</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-primary mb-2">Regional Champion</div>
                  <div className="text-muted-foreground">Northern Valley Regional</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-accent mb-2">Design Award</div>
                  <div className="text-muted-foreground">State Championship</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-primary mb-2">Inspire Award</div>
                  <div className="text-muted-foreground">League Tournament</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Robot;