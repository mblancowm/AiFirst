export interface CurrentSession {
  email: string | null;
  isAdmin: boolean;
  isLocalMode: boolean;
}

export interface Participant {
  id: number;
  name: string;
  email: string | null;
  team: { id: number; name: string } | null;
}

export interface TeamParticipant {
  id: number;
  name: string;
  email: string | null;
}

export interface Team {
  id: number;
  name: string;
  mentorId: number | null;
  mentor: TeamParticipant | null;
  participants: TeamParticipant[];
}

export interface ParticipantInput {
  name: string;
  email: string;
}

export interface TeamInput {
  name: string;
  participantIds: number[];
  mentorId: number | null;
}
