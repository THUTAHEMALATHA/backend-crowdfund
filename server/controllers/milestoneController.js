import { supabase } from "../config/supabaseClient.js";

export const createMilestone = async (req, res) => {
  try {
    const { project_id, title, unlock_amount } = req.body;

    if (!project_id || !title || !unlock_amount) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const { data, error } = await supabase
      .from("milestones")
      .insert([
        {
          project_id,
          title,
          unlock_amount,
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
      milestone: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
// get
export const getProjectMilestones = async (req, res) => {
  try {
    const { projectId } = req.params;

    const { data, error } = await supabase
      .from("milestones")
      .select("*")
      .eq("project_id", projectId)
      .order("unlock_amount", { ascending: true });

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      milestones: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};