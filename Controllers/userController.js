import User from "../Models/User.js";

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { bio, goal, weight, height, age, gender } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ message: "User not found" });

        if (bio) user.bio = bio;
        if (goal) user.goal = goal;
        if (weight) user.weight = weight;
        if (height) user.height = height;
        if (age) user.age = age;
        if (gender) user.gender = gender;

        await user.save();
        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addPoint = async (req, res) => {
    try {
        const { points, activityName, activityType } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ message: "User not found" });

        user.points += points || 10;
        user.recentActivity.unshift({
            type: activityType || 'workout',
            name: activityName || 'Activity completed',
            date: new Date()
        });

        if (user.recentActivity.length > 10) user.recentActivity.pop();

        await user.save();
        res.json({ message: "Activity recorded", points: user.points, activity: user.recentActivity[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
