export interface VideoReel {
  id: string;                 
  video_url: string;
  thumbnail_url: string;
  caption: string;
  duration: number | null;    
  category: string | null;    
  order_index: number;        
  is_active: boolean;
  created_at: string;
}