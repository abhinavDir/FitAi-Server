import axios from "axios";

let cachedExercises = null;

const getBodyPart = (muscle, category) => {
  if (category === "cardio") return "cardio";
  const str = (muscle || "").toLowerCase();
  if (["chest"].includes(str)) return "chest";
  if (["lats", "middle back", "lower back", "traps"].includes(str)) return "back";
  if (["hamstrings", "quadriceps", "adductors", "abductors", "calves", "glutes"].includes(str)) return "legs";
  if (["shoulders"].includes(str)) return "shoulders";
  if (["biceps", "triceps", "forearms"].includes(str)) return "arms";
  if (["abdominals"].includes(str)) return "waist";
  if (["neck"].includes(str)) return "neck";
  return "other";
};

export const getExercises = async (req, res) => {
  try {
    if (cachedExercises) {
      return res.json(cachedExercises);
    }

    const response = await axios.get(
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"
    );

    cachedExercises = response.data.map(ex => {
      const pm = ex.primaryMuscles?.[0] || "";
      const bPart = getBodyPart(pm, ex.category);

      // We use the two frames provided in the dataset to simulate a "GIF" animation
      const img1 = ex.images && ex.images[0]
        ? `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${encodeURI(ex.images[0])}`
        : "https://via.placeholder.com/360.png?text=Frame+1";
      const img2 = ex.images && ex.images[1]
        ? `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${encodeURI(ex.images[1])}`
        : img1;

      return {
        id: ex.id,
        name: ex.name,
        bodyPart: bPart,
        target: pm || "Full Body",
        equipment: ex.equipment || "Body Weight",
        difficulty: ex.level || "beginner",
        // The frontend expects both gifUrl and gifUrl2 for its animation toggle
        gifUrl: img1,
        gifUrl2: img2,
        // The user also requested the v2.exercisedb.io URL pattern
        externalGif: `https://v2.exercisedb.io/image/${encodeURIComponent(ex.name.toLowerCase().replace(/ /g, "-"))}`,
        instructions: ex.instructions || []
      };
    });

    res.json(cachedExercises);
  } catch (error) {
    console.error("Exercise dataset error:", error);
    res.status(500).json({ message: "Failed to load exercises" });
  }
};

export const getImageStream = async (req, res) => {
  // Required as it is imported by Routes/exerciseRoutes.js
  res.status(404).json({ message: "Image stream not implemented" });
};