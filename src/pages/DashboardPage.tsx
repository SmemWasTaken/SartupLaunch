import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { useIdeas } from '@/hooks/useIdeas';
import { usePlanFeatures } from '@/hooks/usePlanFeatures';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lightbulb, Rocket, Users, Globe, Infinity, Play } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  const { ideas, isLoading: ideasLoading } = useIdeas();
  const { hasFeature } = usePlanFeatures();

  if (isLoading || ideasLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
        <Button onClick={() => navigate('/ideas/new')}>
          <Lightbulb className="w-4 h-4 mr-2" />
          Generate New Idea
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate('/ideas/new')}
            >
              <Rocket className="w-4 h-4 mr-2" />
              Generate New Idea
            </Button>
            {hasFeature('team') && (
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate('/team')}
              >
                <Users className="w-4 h-4 mr-2" />
                Manage Team
              </Button>
            )}
            {hasFeature('advanced_analytics') && (
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate('/analytics')}
              >
                <Globe className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            )}
          </div>
        </Card>

        {/* Recent Ideas */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Ideas</h2>
          {ideas && ideas.length > 0 ? (
            <div className="space-y-4">
              {ideas.slice(0, 3).map((idea) => (
                <div
                  key={idea.id}
                  className="p-4 border rounded-lg hover:bg-accent cursor-pointer"
                  onClick={() => navigate(`/ideas/${idea.id}`)}
                >
                  <h3 className="font-medium">{idea.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {idea.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Lightbulb className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No ideas yet</p>
              <Button
                variant="link"
                className="mt-2"
                onClick={() => navigate('/ideas/new')}
              >
                Generate your first idea
              </Button>
            </div>
          )}
        </Card>

        {/* Plan Status */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Plan Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Current Plan</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {user.plan}
                </p>
              </div>
              {user.plan !== 'enterprise' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/pricing')}
                >
                  Upgrade
                </Button>
              )}
            </div>
            {user.plan === 'free' && (
              <div className="p-4 bg-accent rounded-lg">
                <div className="flex items-start">
                  <Infinity className="w-5 h-5 mr-2 text-primary" />
                  <div>
                    <p className="font-medium">Upgrade to Pro</p>
                    <p className="text-sm text-muted-foreground">
                      Get access to advanced features and unlimited ideas
                    </p>
                    <Button
                      variant="link"
                      className="mt-2 p-0 h-auto"
                      onClick={() => navigate('/pricing')}
                    >
                      Learn more
                      <Play className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;