export const uploadResume = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded"
    });
  }

  
  res.status(200).json({
    success: true,
    message: "Resume uploaded successfully",
    file: {
      originalName: req.file.originalname,
      storedName: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      size: `${(req.file.size / 1024).toFixed(2)} KB`,
      mimeType: req.file.mimetype
    }
  });
};

export const analyzeResume = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Resume analysis endpoint working",
    data: {
      score: 0,
      atsCompatibility: "Pending",
      missingSkills: [],
      suggestions: []
    }
  });
};

export const getResumeResult = (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    success: true,
    message: `Fetching resume result for ID: ${id}`
  });
};

