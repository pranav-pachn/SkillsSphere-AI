import test from "node:test";
import assert from "node:assert/strict";
import { skillEvaluator } from "../skillEvaluator.js";

test("perfect match returns 100 score and no missing skills", () => {
  const result = skillEvaluator({
    resumeSkills: ["React", "Node.js"],
    jobSkills: ["react", "node.js"],
  });

  assert.equal(result.score, 100);
  assert.deepEqual(result.missingSkills, []);
  assert.deepEqual(result.matchedSkills, ["react", "node.js"]);
});

test("partial match includes missing and extra skills", () => {
  const result = skillEvaluator({
    resumeSkills: ["React", "MongoDB", "Node.js"],
    jobSkills: ["React", "MongoDB", "Docker", "AWS"],
  });

  assert.equal(result.score, 52);
  assert.deepEqual(result.matchedSkills, ["React", "MongoDB"]);
  assert.deepEqual(result.missingSkills, ["Docker", "AWS"]);
  assert.deepEqual(result.extraSkills, ["Node.js"]);
});

test("no match with duplicates dedupes and avoids false positives", () => {
  const result = skillEvaluator({
    resumeSkills: ["Python", "python", "  PYTHON  "],
    jobSkills: ["React", "Node.js", "react"],
  });

  assert.equal(result.score, 2);
  assert.deepEqual(result.matchedSkills, []);
  assert.deepEqual(result.missingSkills, ["React", "Node.js"]);
  assert.deepEqual(result.extraSkills, ["Python"]);
});

test("empty job skills avoids division by zero", () => {
  const result = skillEvaluator({
    resumeSkills: ["React"],
    jobSkills: [],
  });

  assert.equal(result.score, 0);
  assert.ok(result.feedback.includes("No job skills provided for comparison"));
});
