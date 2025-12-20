export type TImage = {
  id: string;
  userId: string;
  title: string;
  imageKey: string;
  thumbnailUrl: string | null;
  fileType: string;
  fileSize: number;
  width: number;
  height: number;
  category: string;
  orientation: string;
  isNew: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface ImageCardProps {
  image: TImage;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDownload?: (id: string) => void;
}

export type TProfile = {
  id: string;
  username: string;
  avatar_url: string | null;
  plan_type: string;
  image_limit: number;
  image_count: number;
  created_at: string;
  updated_at: string;
};
