export interface PublicTeam {
  id: number;
  name: string;
  participants: { id: number; name: string }[];
  mentor: { id: number; name: string } | null;
}
