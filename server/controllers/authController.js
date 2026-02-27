import { supabase } from "../config/supabaseClient.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    // create auth user
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    const userId = data.user.id;

    // create profile
    await supabase.from("profiles").insert([
      {
        id: userId,
        name: name || "",
      },
    ]);

    res.status(201).json({
      success: true,
      user: data.user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
// login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.json({
      success: true,
      session: data.session,
      user: data.user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};