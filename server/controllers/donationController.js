import { supabase } from "../config/supabaseClient.js";

export const createDonation = async (req, res) => {
  try {
    const { project_id, reward_id, amount } = req.body;
   
    const user_id = req.user.id;

    if (!project_id || !amount) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // 1️⃣ insert donation
    const { data: donation, error: donationError } = await supabase
      .from("donations")
      .insert([
        {
          project_id,
          user_id,
          reward_id,
          amount,
        },
      ])
      .select()
      .single();

    if (donationError) {
      return res.status(500).json({
        success: false,
        error: donationError.message,
      });
    }

    // 2️⃣ update project amount
    const { data: project, error: fetchError } = await supabase
      .from("projects1")
      .select("amount_raised")
      .eq("id", project_id)
      .single();

    if (fetchError) {
      return res.status(500).json({
        success: false,
        error: fetchError.message,
      });
    }

    const newAmount = Number(project.amount_raised) + Number(amount);

    const { error: updateError } = await supabase
      .from("projects1")
      .update({ amount_raised: newAmount })
      .eq("id", project_id);

    if (updateError) {
      return res.status(500).json({
        success: false,
        error: updateError.message,
      });
    }

    res.status(201).json({
      success: true,
      donation,
      newAmountRaised: newAmount,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};