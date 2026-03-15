export function FoodData() {
  const foodData = [

    {
      id: 1,
      name: "Giniling with Rice",
      img: "../imgs/food/meals/giniling-with-rice.jpg",
      price: 70,
      category: "Meal",

      description: {
        en: "Ground pork cooked in tomato sauce served with rice",
        tl: "Giniling na baboy na may sarsa at kanin"
      },

      tags: [
        "pork",
        "rice",
        "filipino",
        "ulam",
        "kanin",
        "baboy",
        "tanghalian",
        "budget meal"
      ],

      mealTime: ["breakfast", "lunch", "dinner"],

      nutrition: {
        calories: 520,
        protein_g: 22,
        carbs_g: 65,
        fat_g: 18,
        sodium_mg: 750,
        potassium_mg: 420,
        sugar_g: 6,
        fiber_g: 3,

        vitamins: {
          vitaminA_mcg: 120,
          vitaminC_mg: 8,
          iron_mg: 2.5,
          calcium_mg: 60
        }
      },

      dietType: [
        "budget",
        "high-energy",
        "protein-meal"
      ],

      healthTags: [
        "high-protein",
        "energy-food"
      ],

      isPopular: true
    },

    {
      id: 2,
      name: "Hotdog with Rice",
      img: "../imgs/food/meals/hotdog-with-rice.jpg",
      price: 50,
      category: "Meal",

      description: {
        en: "Filipino hotdog served with steamed rice",
        tl: "Hotdog na may kasamang kanin"
      },

      tags: [
        "hotdog",
        "rice",
        "filipino",
        "ulam",
        "kanin",
        "breakfast",
        "budget meal"
      ],

      mealTime: ["breakfast", "lunch"],

      nutrition: {
        calories: 480,
        protein_g: 14,
        carbs_g: 63,
        fat_g: 19,
        sodium_mg: 900,
        potassium_mg: 210,
        sugar_g: 7,
        fiber_g: 2,

        vitamins: {
          vitaminA_mcg: 60,
          vitaminC_mg: 2,
          iron_mg: 1.8,
          calcium_mg: 40
        }
      },

      dietType: [
        "budget",
        "quick-meal"
      ],

      healthTags: [
        "energy-food"
      ],

      isPopular: true
    },

    {
      id: 3,
      name: "Sisig with Rice",
      img: "../imgs/food/meals/sisig-with-rice.jpg",
      price: 90,
      category: "Meal",

      description: {
        en: "Chopped pork sisig with spices served with rice",
        tl: "Sisig na baboy na may kanin"
      },

      tags: [
        "sisig",
        "pork",
        "rice",
        "filipino",
        "ulam",
        "kanin",
        "baboy",
        "tanghalian"
      ],

      mealTime: ["lunch", "dinner"],

      nutrition: {
        calories: 650,
        protein_g: 25,
        carbs_g: 60,
        fat_g: 35,
        sodium_mg: 980,
        potassium_mg: 450,
        sugar_g: 4,
        fiber_g: 2,

        vitamins: {
          vitaminA_mcg: 90,
          vitaminC_mg: 5,
          iron_mg: 3.1,
          calcium_mg: 55
        }
      },

      dietType: [
        "high-energy",
        "protein-meal"
      ],

      healthTags: [
        "high-protein"
      ],

      isPopular: true
    },

    {
      id: 4,
      name: "Longganisa with Rice",
      img: "../imgs/food/meals/longganisa-with-rice.jpg",
      price: 70,
      category: "Meal",

      description: {
        en: "Sweet Filipino sausage served with garlic rice",
        tl: "Longganisa na may kasamang kanin"
      },

      tags: [
        "longganisa",
        "rice",
        "filipino",
        "ulam",
        "kanin",
        "breakfast"
      ],

      mealTime: ["breakfast", "lunch"],

      nutrition: {
        calories: 540,
        protein_g: 18,
        carbs_g: 66,
        fat_g: 22,
        sodium_mg: 860,
        potassium_mg: 300,
        sugar_g: 8,
        fiber_g: 2,

        vitamins: {
          vitaminA_mcg: 80,
          vitaminC_mg: 3,
          iron_mg: 2.2,
          calcium_mg: 45
        }
      },

      dietType: [
        "budget",
        "high-energy"
      ],

      healthTags: [
        "energy-food"
      ],

      isPopular: true
    },



    {
      id: 5,
      name: "Mr. Chips",
      img: "../imgs/food/chips/mr-chips-mini.jpg",
      price: 8,
      category: "Snack",

      description: {
        en: "Crunchy corn snack chips",
        tl: "Malutong na corn chips"
      },

      tags: [
        "chips",
        "corn",
        "snack",
        "junk food",
        "school snack"
      ],

      mealTime: ["snack"],

      nutrition: {
        calories: 160,
        protein_g: 2,
        carbs_g: 18,
        fat_g: 9,
        sodium_mg: 180,
        potassium_mg: 70,
        sugar_g: 1,
        fiber_g: 1,

        vitamins: {
          vitaminA_mcg: 0,
          vitaminC_mg: 0,
          iron_mg: 0.5,
          calcium_mg: 10
        }
      },

      dietType: [
        "snack",
        "quick-energy"
      ],

      healthTags: [
        "high-carb"
      ],

      isPopular: false
    },



    {
      id: 6,
      name: "Chippy",
      img: "../imgs/food/chips/chippy-mini.png",
      price: 8,
      category: "Snack",

      description: {
        en: "Barbecue flavored corn chips",
        tl: "Barbecue flavored na corn chips"
      },

      tags: [
        "chips",
        "corn",
        "snack",
        "barbecue",
        "junk food"
      ],

      mealTime: ["snack"],

      nutrition: {
        calories: 165,
        protein_g: 2,
        carbs_g: 19,
        fat_g: 9,
        sodium_mg: 210,
        potassium_mg: 60,
        sugar_g: 2,
        fiber_g: 1,

        vitamins: {
          vitaminA_mcg: 0,
          vitaminC_mg: 0,
          iron_mg: 0.6,
          calcium_mg: 10
        }
      },

      dietType: [
        "snack",
        "quick-energy"
      ],

      healthTags: [
        "high-carb"
      ],

      isPopular: false
    },



    {
      id: 7,
      name: "Roller Coaster",
      img: "../imgs/food/chips/roller-coaster-mini.jpg",
      price: 8,
      category: "Snack",

      description: {
        en: "Ring shaped corn snack",
        tl: "Ring shaped na corn snack"
      },

      tags: [
        "chips",
        "corn",
        "snack",
        "school snack"
      ],

      mealTime: ["snack"],

      nutrition: {
        calories: 170,
        protein_g: 2,
        carbs_g: 20,
        fat_g: 9,
        sodium_mg: 200,
        potassium_mg: 65,
        sugar_g: 1,
        fiber_g: 1,

        vitamins: {
          vitaminA_mcg: 0,
          vitaminC_mg: 0,
          iron_mg: 0.5,
          calcium_mg: 12
        }
      },

      dietType: [
        "snack"
      ],

      healthTags: [
        "high-carb"
      ],

      isPopular: false
    },



    {
      id: 8,
      name: "Real Leaf",
      img: "../imgs/food/drinks/real-leaf.jpg",
      price: 35,
      category: "Drink",

      description: {
        en: "Ready to drink bottled iced tea",
        tl: "Ready to drink na iced tea"
      },

      tags: [
        "drink",
        "tea",
        "iced tea",
        "refreshment"
      ],

      mealTime: ["drink"],

      nutrition: {
        calories: 110,
        protein_g: 0,
        carbs_g: 27,
        fat_g: 0,
        sodium_mg: 25,
        potassium_mg: 20,
        sugar_g: 26,
        fiber_g: 0,

        vitamins: {
          vitaminA_mcg: 0,
          vitaminC_mg: 0,
          iron_mg: 0,
          calcium_mg: 10
        }
      },

      dietType: [
        "drink"
      ],

      healthTags: [
        "sweet-drink"
      ],

      isPopular: true
    },



    {
      id: 9,
      name: "Royal",
      img: "../imgs/food/drinks/royal.png",
      price: 18,
      category: "Drink",

      description: {
        en: "Orange flavored soda drink",
        tl: "Orange flavored na softdrink"
      },

      tags: [
        "drink",
        "soda",
        "orange",
        "softdrink"
      ],

      mealTime: ["drink"],

      nutrition: {
        calories: 120,
        protein_g: 0,
        carbs_g: 31,
        fat_g: 0,
        sodium_mg: 35,
        potassium_mg: 5,
        sugar_g: 30,
        fiber_g: 0,

        vitamins: {
          vitaminA_mcg: 0,
          vitaminC_mg: 0,
          iron_mg: 0,
          calcium_mg: 5
        }
      },

      dietType: [
        "drink"
      ],

      healthTags: [
        "high-sugar"
      ],

      isPopular: true
    },



    {
      id: 10,
      name: "Coke Mismo",
      img: "../imgs/food/drinks/coke-mismo.png",
      price: 18,
      category: "Drink",

      description: {
        en: "Small bottle Coca-Cola softdrink",
        tl: "Maliit na bote ng Coca-Cola"
      },

      tags: [
        "drink",
        "soda",
        "cola",
        "softdrink"
      ],

      mealTime: ["drink"],

      nutrition: {
        calories: 130,
        protein_g: 0,
        carbs_g: 35,
        fat_g: 0,
        sodium_mg: 40,
        potassium_mg: 0,
        sugar_g: 35,
        fiber_g: 0,

        vitamins: {
          vitaminA_mcg: 0,
          vitaminC_mg: 0,
          iron_mg: 0,
          calcium_mg: 0
        }
      },

      dietType: [
        "drink"
      ],

      healthTags: [
        "high-sugar"
      ],

      isPopular: true
    }


  ];

  return foodData;
}
