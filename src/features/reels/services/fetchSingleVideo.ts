import { supabase } from "../../../shared/services/supabaseClient";


export const fetchSingleVideo = async (userId: any, videoId: any) => {
        const { data: target, error } = await supabase
          .from("videos")
          .select(
            `id,
                video_url,
                thumbnail_url,
                caption,
                user_video_actions(liked, user_id, watched)`,
          )
          .eq("id", videoId)
          .single();

        if (error) {
          console.log(error);
          return;
        }

        const action = target.user_video_actions?.find(
          (a: any) => a.user_id === userId,
        );

        const formatted = {
          id: target.id,
          thumbnail_url: target.thumbnail_url,
          video_url: target.video_url,
          caption: target.caption,
          watched: action?.watched ?? false,
          liked: action?.liked ?? false,
        };
        return formatted
      };