import { useState, useEffect } from 'react';
import { TeamService } from '../services/teamService';
import { Team, TeamMember, TeamRole, TeamInvite, TeamActivity } from '../types/team';
import { useUser } from '../contexts/UserContext';

const teamService = new TeamService();

export const useTeam = (teamId?: string) => {
  const { user } = useUser();
  const [team, setTeam] = useState<Team | null>(null);
  const [userTeams, setUserTeams] = useState<Team[]>([]);
  const [invites, setInvites] = useState<TeamInvite[]>([]);
  const [activities, setActivities] = useState<TeamActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeams = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        setError(null);

        // Load user's teams
        const teams = await teamService.getUserTeams(user.id);
        setUserTeams(teams);

        // Load specific team if teamId is provided
        if (teamId) {
          const team = await teamService.getTeam(teamId);
          setTeam(team);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load teams');
      } finally {
        setIsLoading(false);
      }
    };

    loadTeams();
  }, [user, teamId]);

  const createTeam = async (name: string): Promise<Team> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);
      const newTeam = await teamService.createTeam(name, user.id, user.name);
      setUserTeams(prev => [...prev, newTeam]);
      return newTeam;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create team');
      throw err;
    }
  };

  const updateTeamSettings = async (teamId: string, settings: Partial<Team['settings']>): Promise<Team> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);
      const updatedTeam = await teamService.updateTeamSettings(teamId, settings);
      setTeam(updatedTeam);
      setUserTeams(prev => prev.map(t => t.id === teamId ? updatedTeam : t));
      return updatedTeam;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update team settings');
      throw err;
    }
  };

  const inviteMember = async (email: string, role: TeamRole): Promise<TeamInvite> => {
    if (!user || !team) throw new Error('User not authenticated or team not found');

    try {
      setError(null);
      const invite = await teamService.inviteMember(team.id, email, role, user.id, user.name);
      setInvites(prev => [...prev, invite]);
      return invite;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to invite member');
      throw err;
    }
  };

  const acceptInvite = async (inviteId: string): Promise<Team> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);
      const team = await teamService.acceptInvite(inviteId, user.id, user.name, user.email);
      setInvites(prev => prev.filter(invite => invite.id !== inviteId));
      setUserTeams(prev => [...prev, team]);
      return team;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to accept invite');
      throw err;
    }
  };

  const removeMember = async (memberId: string): Promise<Team> => {
    if (!user || !team) throw new Error('User not authenticated or team not found');

    try {
      setError(null);
      const updatedTeam = await teamService.removeMember(team.id, memberId, user.id, user.name);
      setTeam(updatedTeam);
      setUserTeams(prev => prev.map(t => t.id === team.id ? updatedTeam : t));
      return updatedTeam;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove member');
      throw err;
    }
  };

  const deleteTeam = async (teamId: string): Promise<void> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);
      await teamService.deleteTeam(teamId, user.id, user.name);
      setUserTeams(prev => prev.filter(t => t.id !== teamId));
      if (team?.id === teamId) {
        setTeam(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete team');
      throw err;
    }
  };

  const loadActivities = async (limit = 50): Promise<TeamActivity[]> => {
    if (!team) throw new Error('Team not found');

    try {
      setError(null);
      const teamActivities = await teamService.getTeamActivities();
      const activities = teamActivities[team.id] || [];
      setActivities(activities.slice(0, limit));
      return activities.slice(0, limit);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load activities');
      throw err;
    }
  };

  return {
    team,
    userTeams,
    invites,
    activities,
    isLoading,
    error,
    createTeam,
    updateTeamSettings,
    inviteMember,
    acceptInvite,
    removeMember,
    deleteTeam,
    loadActivities,
  };
}; 