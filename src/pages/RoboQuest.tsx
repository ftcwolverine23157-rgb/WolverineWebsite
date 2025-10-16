import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Lock, 
  CheckCircle, 
  Star, 
  Trophy, 
  Download, 
  Share2, 
  Settings,
  Award,
  Bot,
  Zap,
  Eye,
  Repeat,
  Code,
  Target,
  Sparkles
} from 'lucide-react';

// Game state management
interface Level {
  id: number;
  title: string;
  concept: string;
  description: string;
  challenge: string;
  completed: boolean;
  stars: number;
  xp: number;
  unlocked: boolean;
}

interface GameState {
  currentLevel: number;
  completedLevels: number;
  totalXP: number;
  achievements: string[];
  robotCustomization: {
    color: string;
    wheels: string;
    sensors: string[];
    accessories: string[];
  };
}

const initialLevels: Level[] = [
  {
    id: 1,
    title: "What is a Robot?",
    concept: "Robot Basics",
    description: "Learn what makes a robot (sensors, actuators, control system).",
    challenge: "Identify which machines are robots in a quiz.",
    completed: false,
    stars: 0,
    xp: 0,
    unlocked: true
  },
  {
    id: 2,
    title: "Inputs & Outputs",
    concept: "Sensors & Actuators",
    description: "Understand how robots sense and act.",
    challenge: "Match sensors to motors or lights correctly.",
    completed: false,
    stars: 0,
    xp: 0,
    unlocked: false
  },
  {
    id: 3,
    title: "Movement Basics",
    concept: "Robot Motion",
    description: "Learn how robots move.",
    challenge: "Program your robot to move in a square path.",
    completed: false,
    stars: 0,
    xp: 0,
    unlocked: false
  },
  {
    id: 4,
    title: "Sensors",
    concept: "Environmental Sensing",
    description: "Explore distance and light sensors.",
    challenge: "Navigate a maze using a distance sensor.",
    completed: false,
    stars: 0,
    xp: 0,
    unlocked: false
  },
  {
    id: 5,
    title: "Loops",
    concept: "Repetition in Code",
    description: "Introduce repetition in code.",
    challenge: "Make your robot patrol a looped route.",
    completed: false,
    stars: 0,
    xp: 0,
    unlocked: false
  },
  {
    id: 6,
    title: "Conditionals",
    concept: "Logic & Decision Making",
    description: "Introduce logic ('if/else').",
    challenge: "Make robot stop when it detects an obstacle.",
    completed: false,
    stars: 0,
    xp: 0,
    unlocked: false
  },
  {
    id: 7,
    title: "Combining Sensors",
    concept: "Multi-Sensor Integration",
    description: "Integrate multiple inputs.",
    challenge: "Use both light and sound sensors to complete a task.",
    completed: false,
    stars: 0,
    xp: 0,
    unlocked: false
  },
  {
    id: 8,
    title: "Task Automation",
    concept: "Sequence Building",
    description: "Learn sequence building.",
    challenge: "Automate a simple factory task.",
    completed: false,
    stars: 0,
    xp: 0,
    unlocked: false
  },
  {
    id: 9,
    title: "Optimization",
    concept: "Code Efficiency",
    description: "Learn to make code efficient.",
    challenge: "Reduce the number of commands to finish faster.",
    completed: false,
    stars: 0,
    xp: 0,
    unlocked: false
  },
  {
    id: 10,
    title: "Final Mission",
    concept: "Complete Integration",
    description: "Combine all learned skills.",
    challenge: "Complete a robotics rescue mission using full logic.",
    completed: false,
    stars: 0,
    xp: 0,
    unlocked: false
  }
];

const RoboQuest = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    completedLevels: 0,
    totalXP: 0,
    achievements: [],
    robotCustomization: {
      color: 'blue',
      wheels: 'standard',
      sensors: [],
      accessories: []
    }
  });

  const [currentView, setCurrentView] = useState<'menu' | 'hub' | 'level' | 'certificate'>('menu');
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [levels, setLevels] = useState<Level[]>(initialLevels);

  // Load game state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('roboquest-save');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      setGameState(parsed.gameState);
      setLevels(parsed.levels);
    }
  }, []);

  // Save game state to localStorage
  const saveGame = () => {
    const saveData = {
      gameState,
      levels,
      timestamp: Date.now()
    };
    localStorage.setItem('roboquest-save', JSON.stringify(saveData));
  };

  // Complete a level
  const completeLevel = (levelId: number, stars: number, xp: number) => {
    const updatedLevels = levels.map(level => {
      if (level.id === levelId) {
        return {
          ...level,
          completed: true,
          stars,
          xp,
          unlocked: true
        };
      } else if (level.id === levelId + 1) {
        return {
          ...level,
          unlocked: true
        };
      }
      return level;
    });

    setLevels(updatedLevels);
    setGameState(prev => ({
      ...prev,
      completedLevels: prev.completedLevels + 1,
      totalXP: prev.totalXP + xp,
      currentLevel: Math.min(levelId + 1, 10)
    }));

    // Check for certification
    if (levelId === 10) {
      setCurrentView('certificate');
    } else {
      setCurrentView('hub');
    }

    saveGame();
  };

  // Start a level
  const startLevel = (level: Level) => {
    setSelectedLevel(level);
    setCurrentView('level');
  };

  // Main Menu Component
  const MainMenu = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-4xl mx-auto px-4">
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Bot className="h-16 w-16 text-yellow-400" />
            <h1 className="text-6xl font-bold text-white">RoboQuest</h1>
          </div>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Learn Robotics Through Play! Complete 10 exciting levels and earn your 
            Junior Robotics Explorer certificate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Button 
            size="lg" 
            className="h-20 text-lg bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
            onClick={() => setCurrentView('hub')}
          >
            <Play className="mr-2 h-6 w-6" />
            Play Game
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="h-20 text-lg border-white text-white hover:bg-white hover:text-blue-900"
            onClick={() => {/* Progress tracker */}}
          >
            <Trophy className="mr-2 h-6 w-6" />
            Progress Tracker
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="h-20 text-lg border-white text-white hover:bg-white hover:text-blue-900"
            onClick={() => {/* Achievements */}}
          >
            <Award className="mr-2 h-6 w-6" />
            Achievements
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="h-20 text-lg border-white text-white hover:bg-white hover:text-blue-900"
            onClick={() => {/* Settings */}}
          >
            <Settings className="mr-2 h-6 w-6" />
            Settings
          </Button>
        </div>

        <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">Your Progress</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-white">
              <span>Levels Completed</span>
              <span className="font-bold">{gameState.completedLevels}/10</span>
            </div>
            <Progress value={(gameState.completedLevels / 10) * 100} className="h-3" />
            <div className="flex justify-between text-white">
              <span>Total XP</span>
              <span className="font-bold">{gameState.totalXP}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Level Hub Component
  const LevelHub = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Level Hub</h1>
          <p className="text-xl text-blue-200">Choose your next robotics adventure!</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4 mb-12">
          {levels.map((level) => (
            <Card 
              key={level.id}
              className={`p-4 text-center cursor-pointer transition-all duration-300 ${
                level.unlocked 
                  ? 'bg-white hover:bg-yellow-50 hover:scale-105' 
                  : 'bg-gray-600 opacity-50 cursor-not-allowed'
              }`}
              onClick={() => level.unlocked && startLevel(level)}
            >
              <CardContent className="p-0">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-900">
                    {level.id}
                  </div>
                  {level.completed ? (
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                  ) : level.unlocked ? (
                    <Play className="h-8 w-8 text-blue-500 mx-auto" />
                  ) : (
                    <Lock className="h-8 w-8 text-gray-400 mx-auto" />
                  )}
                  <div className="text-xs font-medium text-gray-700">
                    {level.title}
                  </div>
                  {level.stars > 0 && (
                    <div className="flex justify-center space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${
                            i < level.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            className="text-white border-white hover:bg-white hover:text-blue-900"
            onClick={() => setCurrentView('menu')}
          >
            Back to Menu
          </Button>
        </div>
      </div>
    </div>
  );

  // Level Component
  const LevelView = () => {
    if (!selectedLevel) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-white hover:text-blue-900 mb-4"
              onClick={() => setCurrentView('hub')}
            >
              ← Back to Hub
            </Button>
            <h1 className="text-4xl font-bold text-white mb-2">{selectedLevel.title}</h1>
            <p className="text-xl text-blue-200">{selectedLevel.description}</p>
          </div>

          <Tabs defaultValue="tutorial" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/10">
              <TabsTrigger value="tutorial" className="text-white">Tutorial</TabsTrigger>
              <TabsTrigger value="practice" className="text-white">Practice</TabsTrigger>
              <TabsTrigger value="mission" className="text-white">Mission</TabsTrigger>
              <TabsTrigger value="summary" className="text-white">Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="tutorial" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Learning: {selectedLevel.concept}</h3>
                  <div className="text-blue-200 space-y-4">
                    <p>{selectedLevel.description}</p>
                    <div className="bg-blue-800/50 rounded-lg p-4">
                      <h4 className="font-bold text-white mb-2">Challenge:</h4>
                      <p>{selectedLevel.challenge}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="practice" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Practice Mode</h3>
                  <div className="bg-gray-900 rounded-lg p-6 min-h-64">
                    <div className="text-center text-gray-400">
                      <Code className="h-12 w-12 mx-auto mb-4" />
                      <p>Drag and drop programming interface coming soon!</p>
                      <p className="text-sm mt-2">Practice your coding skills in this sandbox environment.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mission" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Mission Challenge</h3>
                  <div className="bg-gray-900 rounded-lg p-6 min-h-64">
                    <div className="text-center text-gray-400">
                      <Target className="h-12 w-12 mx-auto mb-4" />
                      <p>Mission interface coming soon!</p>
                      <p className="text-sm mt-2">Complete the challenge to earn stars and XP.</p>
                    </div>
                    <div className="mt-6 text-center">
                      <Button 
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                        onClick={() => completeLevel(selectedLevel.id, 3, 100)}
                      >
                        Complete Mission (Demo)
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="summary" className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Level Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-white">
                      <span>Concept Learned:</span>
                      <span className="font-bold">{selectedLevel.concept}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Challenge Completed:</span>
                      <span className="font-bold">{selectedLevel.challenge}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Stars Earned:</span>
                      <div className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${
                              i < (selectedLevel.stars || 0) ? 'text-yellow-400 fill-current' : 'text-gray-400'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  };

  // Certificate Component
  const CertificateView = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-4xl mx-auto px-4">
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <Sparkles className="h-16 w-16 text-yellow-400 animate-pulse" />
            <h1 className="text-6xl font-bold text-white">Congratulations!</h1>
            <Sparkles className="h-16 w-16 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-2xl text-blue-200">
            You've completed all 10 levels and earned your
          </p>
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-2xl inline-block">
            <h2 className="text-3xl font-bold">Junior Robotics Explorer Certificate</h2>
          </div>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8">
          <CardContent className="space-y-6">
            <div className="text-center text-white">
              <Trophy className="h-20 w-20 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Certificate Details</h3>
              <div className="space-y-2 text-lg">
                <p><strong>Name:</strong> RoboQuest Explorer</p>
                <p><strong>Completion Date:</strong> {new Date().toLocaleDateString()}</p>
                <p><strong>Verification ID:</strong> RQ-{Date.now().toString().slice(-8)}</p>
                <p><strong>Total XP Earned:</strong> {gameState.totalXP}</p>
                <p><strong>Levels Completed:</strong> {gameState.completedLevels}/10</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
            onClick={() => {/* Download certificate */}}
          >
            <Download className="mr-2 h-5 w-5" />
            Download Certificate
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-white border-white hover:bg-white hover:text-blue-900"
            onClick={() => {/* Share on social media */}}
          >
            <Share2 className="mr-2 h-5 w-5" />
            Share Achievement
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-white border-white hover:bg-white hover:text-blue-900"
            onClick={() => setCurrentView('menu')}
          >
            Return to Menu
          </Button>
        </div>
      </div>
    </div>
  );

  // Render current view
  switch (currentView) {
    case 'menu':
      return <MainMenu />;
    case 'hub':
      return <LevelHub />;
    case 'level':
      return <LevelView />;
    case 'certificate':
      return <CertificateView />;
    default:
      return <MainMenu />;
  }
};

export default RoboQuest;
