import { supabase } from "../config/supabaseClient.js";

export const createComment = async (req, res) => {
  try {
    const { project_id, user_id, content } = req.body;

    if (!project_id || !user_id || !content) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          project_id,
          user_id,
          content,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.status(201).json({
      success: true,
      comment: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
// get
export const getProjectComments = async (req, res) => {
  try {
    const { projectId } = req.params;

    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      comments: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
// 
