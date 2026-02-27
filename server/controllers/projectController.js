import { supabase } from "../config/supabaseClient.js";

export const createProject = async (req, res) => {
  try {
    const {
      creator_id,
      title,
      description,
      image_url,
      category,
      funding_goal,
      deadline,
    } = req.body;

    if (!creator_id || !title || !funding_goal || !deadline) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const { data, error } = await supabase.from("projects1").insert([
      {
        creator_id,
        title,
        description,
        image_url,
        category,
        funding_goal,
        deadline,
        is_published: true,
      },
    ]).select().single();

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.status(201).json({
      success: true,
      project: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
// getAllProjects 
export const getAllProjects = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("projects1")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      projects: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//getProjectById
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("projects1")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      project: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};