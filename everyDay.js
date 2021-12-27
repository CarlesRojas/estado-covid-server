// Get the provinces and autonomic communities
const provinces = require("./data/provinces");
const autonomicCommunities = require("./data/autonomicCommunities");

// Get the User & Historic schemas
const User = require("./models/User");
const HistoricProvince = require("./models/HistoricProvince");
const HistoricAutonomicCommunitie = require("./models/HistoricAutonomicCommunity");

const everyDay = async () => {
    await Promise.all(
        provinces.map(async (provinceId) => {
            try {
                // Create province if it does not exist
                const province = await HistoricProvince.findOne({ provinceId });

                if (!province) {
                    const newProvince = new HistoricProvince({ provinceId, historic: [] });
                    await newProvince.save();
                }

                const totalUsers = await User.find({ provinceId });
                const usersWithCovid = await User.find({ provinceId, hasCovid: true });
                const usersWithOneVaccine = await User.find({ provinceId, numberOfVaccines: 1 });
                const usersWithTwoVaccines = await User.find({ provinceId, numberOfVaccines: 2 });
                const usersWithThreeVaccines = await User.find({ provinceId, numberOfVaccines: 3 });

                // Save to DB
                await HistoricProvince.findOneAndUpdate(
                    { provinceId },
                    {
                        $push: {
                            historic: {
                                totalUsers: totalUsers.length,
                                usersWithCovid: usersWithCovid.length,
                                usersWithOneVaccine: usersWithOneVaccine.length,
                                usersWithTwoVaccines: usersWithTwoVaccines.length,
                                usersWithThreeVaccines: usersWithThreeVaccines.length,
                            },
                        },
                    }
                );
            } catch (error) {}
        })
    );

    await Promise.all(
        autonomicCommunities.map(async (autonomicCommunityId) => {
            try {
                // Create autonomic community if it does not exist
                const autonomicCommunity = await HistoricAutonomicCommunitie.findOne({ autonomicCommunityId });

                if (!autonomicCommunity) {
                    const newAutonomicCommunity = new HistoricAutonomicCommunitie({
                        autonomicCommunityId,
                        historic: [],
                    });
                    await newAutonomicCommunity.save();
                }

                const totalUsers = await User.find({ autonomicCommunityId });
                const usersWithCovid = await User.find({ autonomicCommunityId, hasCovid: true });
                const usersWithOneVaccine = await User.find({ autonomicCommunityId, numberOfVaccines: 1 });
                const usersWithTwoVaccines = await User.find({ autonomicCommunityId, numberOfVaccines: 2 });
                const usersWithThreeVaccines = await User.find({ autonomicCommunityId, numberOfVaccines: 3 });

                // Save to DB
                await HistoricAutonomicCommunitie.findOneAndUpdate(
                    { autonomicCommunityId },
                    {
                        $push: {
                            historic: {
                                totalUsers: totalUsers.length,
                                usersWithCovid: usersWithCovid.length,
                                usersWithOneVaccine: usersWithOneVaccine.length,
                                usersWithTwoVaccines: usersWithTwoVaccines.length,
                                usersWithThreeVaccines: usersWithThreeVaccines.length,
                            },
                        },
                    }
                );
            } catch (error) {}
        })
    );

    console.log("Saved daily data");
};

module.exports = everyDay;
