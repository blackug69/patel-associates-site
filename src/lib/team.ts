import { createPublicClient } from "@/lib/supabase/public";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photo_url: string | null;
  is_leadership: boolean;
};

export async function getTeam(): Promise<TeamMember[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("team_members")
    .select("id,name,role,bio,photo_url,is_leadership")
    .eq("published", true)
    .order("sort_order");
  if (error) throw new Error(`Failed to load team: ${error.message}`);
  return data ?? [];
}
