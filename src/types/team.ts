export type TeamRole = 'owner' | 'admin' | 'member';

export type TeamPlan = 'free' | 'pro' | 'enterprise';

export type TeamActivityType =
  | 'idea_generated'
  | 'idea_favorited'
  | 'member_joined'
  | 'member_left'
  | 'invite_sent'
  | 'invite_accepted'
  | 'invite_rejected'
  | 'idea_deleted'
  | 'team_deleted';

export interface TeamMember {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: TeamRole;
  joinedAt: string;
  lastActive: string;
}

export interface Team {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
  members: TeamMember[];
  plan: TeamPlan;
  settings: {
    allowMemberInvites: boolean;
    requireApprovalForJoining: boolean;
    ideaVisibility: 'team' | 'all' | 'private';
  };
}

export interface TeamInvite {
  id: string;
  teamId: string;
  email: string;
  role: TeamRole;
  invitedBy: string;
  invitedAt: string;
  status: 'pending' | 'accepted' | 'rejected';
  expiresAt: string;
}

export interface TeamActivity {
  id: string;
  teamId: string;
  userId: string;
  userName: string;
  type: TeamActivityType;
  metadata: {
    count?: number;
    ideaName?: string;
    ideaId?: string;
    role?: TeamRole;
    removedMemberId?: string;
    removedMemberName?: string;
    teamName?: string;
  };
  timestamp: string;
} 