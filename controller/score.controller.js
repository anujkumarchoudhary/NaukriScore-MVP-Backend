import User from "../modules/user.js";

function computeScore(b, bg, ex, pb) {
  return b * 100 + bg * 150 + ex * 200 + pb * 300;
}

export const createScore = async (req, res) => {
  try {
    const {
      user_id,
      "Basic verification": basic,
      "Background check": background,
      Experience,
      "Positive behavior": positive,
    } = req.body;

    if (!user_id) return res.status(400).json({ error: "user_id is required" });

    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const score = computeScore(
      Number(basic),
      Number(background),
      Number(Experience),
      Number(positive)
    );

    user.scores.push({
      basicVerification: Number(basic),
      backgroundCheck: Number(background),
      experience: Number(Experience),
      positiveBehavior: Number(positive),
      computedScore: score,
    });

    await user.save();

    return res
      .status(201)
      .json({ message: "Score added successfully", finalScore: score });
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getAllScores = async (req, res) => {
  try {
    const users = await User.find().select("name email scores");

    return res.status(200).json({
      message: "All users score data",
      users,
    });
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getSingleScore = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) return res.status(404).json({ error: "User not found" });

    const latestScore = user.scores[user.scores.length - 1];

    return res.status(200).json({
      user_id: user._id,
      name: user.name,
      email: user.email,
      score: latestScore ? latestScore.computedScore : 0,
      breakdown: latestScore
        ? {
            basicVerification: latestScore.basicVerification,
            backgroundCheck: latestScore.backgroundCheck,
            experience: latestScore.experience,
            positiveBehavior: latestScore.positiveBehavior,
          }
        : {},
    });
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({ error: "Server error" });
  }
};
