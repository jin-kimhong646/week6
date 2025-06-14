import * as journalistRepository from "../repositories/journalistRepository.js";
import * as articleRepository from "../repositories/sqlArticleRepository.js";

// Get all journalists
export async function getJournalists(req, res) {
  try {
    const journalists = await journalistRepository.getJournalists();
    res.json(journalists);
  } catch (error) {
    console.error("Error in getJournalists:", error);
    res.status(500).json({ message: error.message });
  }
}

// Get journalist by ID
export async function getJournalistById(req, res) {
  try {
    const journalist = await journalistRepository.getJournalistById(
      req.params.id
    );
    if (journalist) {
      res.json(journalist);
    } else {
      res.status(404).json({ message: "Journalist not found" });
    }
  } catch (error) {
    console.error("Error in getJournalistById:", error);
    res.status(500).json({ message: error.message });
  }
}

// Get articles by journalist ID
export async function getArticlesByJournalist(req, res) {
  try {
    const journalistId = req.params.id;

    // First check if journalist exists
    const journalist = await journalistRepository.getJournalistById(
      journalistId
    );
    if (!journalist) {
      return res.status(404).json({ message: "Journalist not found" });
    }

    const articles = await articleRepository.getArticlesByJournalistId(
      journalistId
    );
    res.json(articles);
  } catch (error) {
    console.error("Error in getArticlesByJournalist:", error);
    res.status(500).json({ message: error.message });
  }
}

// Create new journalist
export async function createJournalist(req, res) {
  try {
    const journalist = await journalistRepository.createJournalist(req.body);
    res.status(201).json(journalist);
  } catch (error) {
    console.error("Error in createJournalist:", error);
    res.status(500).json({ message: error.message });
  }
}

// Update journalist
export async function updateJournalist(req, res) {
  try {
    const journalist = await journalistRepository.updateJournalist(
      req.params.id,
      req.body
    );
    if (journalist) {
      res.json(journalist);
    } else {
      res.status(404).json({ message: "Journalist not found" });
    }
  } catch (error) {
    console.error("Error in updateJournalist:", error);
    res.status(500).json({ message: error.message });
  }
}

// Delete journalist
export async function deleteJournalist(req, res) {
  try {
    const result = await journalistRepository.deleteJournalist(req.params.id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Journalist not found" });
    }
  } catch (error) {
    console.error("Error in deleteJournalist:", error);
    res.status(500).json({ message: error.message });
  }
}
