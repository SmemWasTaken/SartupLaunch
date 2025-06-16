import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useTeam } from '../hooks/useTeam';
import { usePlanFeatures } from '../hooks/usePlanFeatures';
import { ArrowLeft, Activity, Users, Star, Trash2, Plus, Mail, AlertTriangle } from 'lucide-react';
import { TeamActivity } from '../types/team';

const TeamActivityPage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { teamId } = useParams<{ teamId: string }>();
  const { team, isLoading, error, loadActivities } = useTeam(teamId);
  const { planFeatures } = usePlanFeatures();
  const [activities, setActivities] = useState<TeamActivity[]>([]);
  const [isLoadingActivities, setIsLoadingActivities] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      if (team) {
        try {
          setIsLoadingActivities(true);
          const teamActivities = await loadActivities();
          setActivities(teamActivities);
        } catch (err) {
          // Error is handled by the hook
        } finally {
          setIsLoadingActivities(false);
        }
      }
    };

    fetchActivities();
  }, [team, loadActivities]);

  if (!user) {
    navigate('/login');
    return null;
  }

  if (!planFeatures.hasTeamManagement) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Team Activity</h2>
          <p className="text-lg text-gray-600 mb-8">
            Team management is available on Pro and Enterprise plans.
          </p>
          <button
            onClick={() => navigate('/billing')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Upgrade Plan
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-lg text-red-600 mb-8">{error || 'Team not found'}</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const getActivityIcon = (type: TeamActivity['type']) => {
    switch (type) {
      case 'idea_generated':
        return <Plus className="h-5 w-5 text-blue-500" />;
      case 'idea_favorited':
        return <Star className="h-5 w-5 text-yellow-500" />;
      case 'member_joined':
        return <Users className="h-5 w-5 text-green-500" />;
      case 'member_left':
        return <Users className="h-5 w-5 text-red-500" />;
      case 'invite_sent':
      case 'invite_accepted':
      case 'invite_rejected':
        return <Mail className="h-5 w-5 text-purple-500" />;
      case 'idea_deleted':
        return <Trash2 className="h-5 w-5 text-red-500" />;
      case 'team_deleted':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const getActivityDescription = (activity: TeamActivity) => {
    switch (activity.type) {
      case 'idea_generated':
        return `generated ${activity.metadata.count} new ideas`;
      case 'idea_favorited':
        return `favorited "${activity.metadata.ideaName}"`;
      case 'member_joined':
        return 'joined the team';
      case 'member_left':
        return activity.metadata.removedMemberName
          ? `removed ${activity.metadata.removedMemberName} from the team`
          : 'left the team';
      case 'invite_sent':
        return `sent an invite for ${activity.metadata.role} role`;
      case 'invite_accepted':
        return `accepted the invite as ${activity.metadata.role}`;
      case 'invite_rejected':
        return 'rejected the invite';
      case 'idea_deleted':
        return `deleted "${activity.metadata.ideaName}"`;
      case 'team_deleted':
        return `deleted the team "${activity.metadata.teamName}"`;
      default:
        return 'performed an action';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button
              onClick={() => navigate(`/team/${team.id}`)}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="h-6 w-6 text-gray-500" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Team Activity</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {isLoadingActivities ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : activities.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No activity yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Team activity will appear here as members interact with the platform.
                </p>
              </div>
            ) : (
              <div className="flow-root">
                <ul className="-mb-8">
                  {activities.map((activity, activityIdx) => (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {activityIdx !== activities.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                              {getActivityIcon(activity.type)}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {activity.userName}
                                </span>{' '}
                                {getActivityDescription(activity)}
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime={activity.timestamp}>
                                {new Date(activity.timestamp).toLocaleString()}
                              </time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamActivityPage; 