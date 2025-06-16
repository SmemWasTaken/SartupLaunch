import { Team, TeamMember, TeamRole, TeamInvite, TeamActivity, TeamActivityType } from '../types/team';
import { User } from '../types/plan';

const TEAMS_STORAGE_KEY = 'teams';
const TEAM_INVITES_STORAGE_KEY = 'team_invites';
const TEAM_ACTIVITIES_STORAGE_KEY = 'team_activities';

export class TeamService {
  private getTeams(): Record<string, Team> {
    const teamsJson = localStorage.getItem(TEAMS_STORAGE_KEY);
    return teamsJson ? JSON.parse(teamsJson) : {};
  }

  private saveTeams(teams: Record<string, Team>): void {
    localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(teams));
  }

  private getTeamInvites(): Record<string, TeamInvite> {
    const invitesJson = localStorage.getItem(TEAM_INVITES_STORAGE_KEY);
    return invitesJson ? JSON.parse(invitesJson) : {};
  }

  private saveTeamInvites(invites: Record<string, TeamInvite>): void {
    localStorage.setItem(TEAM_INVITES_STORAGE_KEY, JSON.stringify(invites));
  }

  public getTeamActivities(): Record<string, TeamActivity[]> {
    const activitiesJson = localStorage.getItem(TEAM_ACTIVITIES_STORAGE_KEY);
    return activitiesJson ? JSON.parse(activitiesJson) : {};
  }

  private saveTeamActivities(activities: Record<string, TeamActivity[]>): void {
    localStorage.setItem(TEAM_ACTIVITIES_STORAGE_KEY, JSON.stringify(activities));
  }

  private logActivity(teamId: string, userId: string, userName: string, type: TeamActivityType, metadata: TeamActivity['metadata']): void {
    const activities = this.getTeamActivities();
    const teamActivities = activities[teamId] || [];

    const activity: TeamActivity = {
      id: crypto.randomUUID(),
      teamId,
      userId,
      userName,
      type,
      metadata,
      timestamp: new Date().toISOString(),
    };

    teamActivities.unshift(activity);
    activities[teamId] = teamActivities;
    this.saveTeamActivities(activities);
  }

  public async createTeam(name: string, ownerId: string, ownerName: string): Promise<Team> {
    const teams = this.getTeams();
    const teamId = crypto.randomUUID();

    const team: Team = {
      id: teamId,
      name,
      ownerId,
      createdAt: new Date().toISOString(),
      members: [
        {
          id: crypto.randomUUID(),
          userId: ownerId,
          name: ownerName,
          email: '', // Will be updated when user accepts invite
          role: 'owner',
          joinedAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
        },
      ],
      plan: 'pro', // Default to pro plan
      settings: {
        allowMemberInvites: true,
        requireApprovalForJoining: false,
        ideaVisibility: 'team',
      },
    };

    teams[teamId] = team;
    this.saveTeams(teams);

    this.logActivity(teamId, ownerId, ownerName, 'member_joined', {});

    return team;
  }

  public async getTeam(teamId: string): Promise<Team | null> {
    const teams = this.getTeams();
    return teams[teamId] || null;
  }

  public async getUserTeams(userId: string): Promise<Team[]> {
    const teams = this.getTeams();
    return Object.values(teams).filter(team =>
      team.members.some(member => member.userId === userId)
    );
  }

  public async updateTeamSettings(teamId: string, settings: Partial<Team['settings']>): Promise<Team> {
    const teams = this.getTeams();
    const team = teams[teamId];

    if (!team) {
      throw new Error('Team not found');
    }

    team.settings = {
      ...team.settings,
      ...settings,
    };

    teams[teamId] = team;
    this.saveTeams(teams);

    return team;
  }

  public async inviteMember(teamId: string, email: string, role: TeamRole, invitedBy: string, invitedByName: string): Promise<TeamInvite> {
    const teams = this.getTeams();
    const team = teams[teamId];

    if (!team) {
      throw new Error('Team not found');
    }

    const invites = this.getTeamInvites();
    const inviteId = crypto.randomUUID();

    const invite: TeamInvite = {
      id: inviteId,
      teamId,
      email,
      role,
      invitedBy,
      invitedAt: new Date().toISOString(),
      status: 'pending',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    };

    invites[inviteId] = invite;
    this.saveTeamInvites(invites);

    this.logActivity(teamId, invitedBy, invitedByName, 'invite_sent', { role });

    return invite;
  }

  public async acceptInvite(inviteId: string, userId: string, userName: string, userEmail: string): Promise<Team> {
    const invites = this.getTeamInvites();
    const invite = invites[inviteId];

    if (!invite) {
      throw new Error('Invite not found');
    }

    if (invite.status !== 'pending') {
      throw new Error('Invite is no longer valid');
    }

    if (new Date(invite.expiresAt) < new Date()) {
      throw new Error('Invite has expired');
    }

    const teams = this.getTeams();
    const team = teams[invite.teamId];

    if (!team) {
      throw new Error('Team not found');
    }

    // Add member to team
    const member: TeamMember = {
      id: crypto.randomUUID(),
      userId,
      name: userName,
      email: userEmail,
      role: invite.role,
      joinedAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
    };

    team.members.push(member);
    teams[invite.teamId] = team;
    this.saveTeams(teams);

    // Update invite status
    invite.status = 'accepted';
    invites[inviteId] = invite;
    this.saveTeamInvites(invites);

    this.logActivity(team.id, userId, userName, 'invite_accepted', { role: invite.role });

    return team;
  }

  public async removeMember(teamId: string, memberId: string, removedBy: string, removedByName: string): Promise<Team> {
    const teams = this.getTeams();
    const team = teams[teamId];

    if (!team) {
      throw new Error('Team not found');
    }

    const memberIndex = team.members.findIndex(m => m.id === memberId);
    if (memberIndex === -1) {
      throw new Error('Member not found');
    }

    const removedMember = team.members[memberIndex];
    team.members.splice(memberIndex, 1);
    teams[teamId] = team;
    this.saveTeams(teams);

    this.logActivity(teamId, removedBy, removedByName, 'member_left', {
      removedMemberName: removedMember.name,
    });

    return team;
  }

  public async deleteTeam(teamId: string, deletedBy: string, deletedByName: string): Promise<void> {
    const teams = this.getTeams();
    const team = teams[teamId];

    if (!team) {
      throw new Error('Team not found');
    }

    // Delete team activities
    const activities = this.getTeamActivities();
    delete activities[teamId];

    // Delete team invites
    const invites = this.getTeamInvites();
    const teamInvites = Object.entries(invites)
      .filter(([_, invite]) => invite.teamId === teamId)
      .map(([id]) => id);

    teamInvites.forEach(id => {
      delete invites[id];
    });

    // Delete team
    delete teams[teamId];

    // Save changes
    this.saveTeams(teams);
    this.saveTeamActivities(activities);
    this.saveTeamInvites(invites);

    // Log activity
    this.logActivity(teamId, deletedBy, deletedByName, 'team_deleted', {
      teamName: team.name,
    });
  }
}

export const teamService = new TeamService(); 