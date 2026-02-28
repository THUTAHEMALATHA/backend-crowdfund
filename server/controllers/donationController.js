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

    // ✅ 1. fetch project first
    const { data: project, error: fetchError } = await supabase
      .from("projects1")
      .select("amount_raised, funding_goal")
      .eq("id", project_id)
      .single();

    if (fetchError || !project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // ✅ 2. check goal already reached
    if (project.amount_raised >= project.funding_goal) {
      return res.status(400).json({
        success: false,
        message: "Funding goal already reached",
      });
    }

    // ✅ 3. check this donation will exceed goal
    const remaining = project.funding_goal - project.amount_raised;

    if (Number(amount) > remaining) {
      return res.status(400).json({
        success: false,
        message: `Only ₹${remaining} needed to reach goal`,
      });
    }

    // ✅ 4. insert donation
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

    // ✅ 5. update project amount
    const newAmount =
      Number(project.amount_raised) + Number(amount);

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