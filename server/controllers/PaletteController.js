const { Palette } = require("../models");
const { User } = require("../models");
//palette data is a string that contains numbers, comma, and semicolon
//format: RRR,GGG,BBB;RRR,GGG,BBB;RRR,GGG,BBB;
//maximum 5 colors
//example: 255,15,15;15,25,46;
class PaletteController {
  // Helper method to validate palette format
  static validatePaletteFormat(paletteString) {
    if (!paletteString || typeof paletteString !== "string") {
      return {
        isValid: false,
        message: "Palette data is required and must be a string",
      };
    }

    // Remove trailing semicolon if present
    const cleanPalette = paletteString.replace(/;$/, "");
    const colors = cleanPalette.split(";");

    if (colors.length === 0 || colors.length > 5) {
      return { isValid: false, message: "Palette must contain 1-5 colors" };
    }

    for (let i = 0; i < colors.length; i++) {
      const color = colors[i];
      const rgb = color.split(",");

      if (rgb.length !== 3) {
        return {
          isValid: false,
          message: `Color ${
            i + 1
          }: Must have exactly 3 RGB values separated by commas`,
        };
      }

      for (let j = 0; j < rgb.length; j++) {
        const value = parseInt(rgb[j]);
        if (isNaN(value) || value < 0 || value > 255) {
          return {
            isValid: false,
            message: `Color ${
              i + 1
            }: RGB values must be numbers between 0 and 255`,
          };
        }
      }
    }

    return { isValid: true };
  }

  static async create(req, res) {
    try {
      const { palette } = req.body;
      const userId = req.user?.id; // Assuming user ID comes from authentication middleware

      if (!userId) {
        return res.status(401).json({
          message: "Authentication required",
        });
      }
      // Validate palette format
      const validation = PaletteController.validatePaletteFormat(palette);
      if (!validation.isValid) {
        return res.status(400).json({
          message: validation.message,
        });
      }
      // Create the palette
      const newPalette = await Palette.create({
        palette,
        userId,
      });
      res.status(201).json({
        message: "Palette created successfully",
        palette: newPalette,
      });
    } catch (error) {
      console.error("Create palette error:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async getAll(req, res) {
    try {
      //   const userId = req.user?.id;

      //   if (!userId) {
      //     return res.status(401).json({
      //       message: "Authentication required",
      //     });
      //   }

      const palettes = await Palette.findAll({
        order: [["updatedAt", "DESC"]],
        include: {
          model: User,
          attributes: ["id", "username"],
        },
      });

      res.status(200).json({
        message: "Palettes retrieved successfully",
        palettes,
      });
    } catch (error) {
      console.error("Get palettes error:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          message: "Authentication required",
        });
      }

      const palette = await Palette.findOne({
        where: { id, userId },
      });

      if (!palette) {
        return res.status(404).json({
          message: "Palette not found",
        });
      }

      res.status(200).json({
        message: "Palette retrieved successfully",
        palette,
      });
    } catch (error) {
      console.error("Get palette error:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { palette } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          message: "Authentication required",
        });
      }

      // Validate palette format
      const validation = PaletteController.validatePaletteFormat(palette);
      if (!validation.isValid) {
        return res.status(400).json({
          message: validation.message,
        });
      }

      const existingPalette = await Palette.findOne({
        where: { id, userId },
      });

      if (!existingPalette) {
        return res.status(404).json({
          message: "Palette not found",
        });
      }

      await existingPalette.update({ palette });

      res.status(200).json({
        message: "Palette updated successfully",
        palette: existingPalette,
      });
    } catch (error) {
      console.error("Update palette error:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          message: "Authentication required",
        });
      }

      const palette = await Palette.findOne({
        where: { id, userId },
      });

      if (!palette) {
        return res.status(404).json({
          message: "Palette not found",
        });
      }

      await palette.destroy();

      res.status(200).json({
        message: "Palette deleted successfully",
      });
    } catch (error) {
      console.error("Delete palette error:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = PaletteController;
