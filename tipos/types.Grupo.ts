
export interface Group {
  id: string;
  creatorId: string;
  name: string;
  description: string;
  coverUrl?: string;
  memberIds?: string[];
  channels?: any[]; // Replace 'any' with a more specific channel type if available
  isVip?: boolean;
  isSalesPlatformEnabled?: boolean;
  isHubModeEnabled?: boolean;
  // Add any other group properties you find being used
}
