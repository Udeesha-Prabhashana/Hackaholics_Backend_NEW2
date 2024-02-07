import Team from '../Models/TeamRegistration.js';

// const expectTeamCount = 15;

const teamCount = async () => {
  try {
    const count = await Team.countDocuments({});
    console.log("Number of teams:", count);
    return count;
  } catch (err) {
    console.error("Error counting teams:", err);
    throw err;
  }
};



export const count = (req, res) => {
  Team.countDocuments({})
    .then((count) => {
      console.log("Number of teams:", count);
      res.status(200).json({ teamCount: expectTeamCount - count });
    })
    .catch((err) => {
      console.error("Error counting teams:", err);
      res.status(500).send("Error counting teams");
    });
};