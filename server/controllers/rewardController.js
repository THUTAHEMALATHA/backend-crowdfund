import { supabase } from "../config/supabaseClient.js";

export const createReward = async (req, res) => {
  try {
    const { project_id, title, description, amount } = req.body;

    if (!project_id || !title || !amount) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const { data, error } = await supabase
      .from("rewards")
      .insert([
        {
          project_id,
          title,
          description,
          amount,
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
      reward: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
//  get
export const getProjectRewards = async (req, res) => {
  try {
    const { projectId } = req.params;

    const { data, error } = await supabase
      .from("rewards")
      .select("*")
      .eq("project_id", projectId)
      .order("amount", { ascending: true });

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      rewards: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};