import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  points: { type: Number, default: 0 },
  earnedAt: { type: Date, required: true },
});

const invitationLinkSchema = new mongoose.Schema({
  link: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  userUid: { type: String, required: true, unique: true },
  telegramId: { type: Number, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  username: { type: String },
  headline: { type: String },
  techs: { type: [String] }, // Array of technologies
  github: { type: String },
  leetcode: { type: String },
  instagram: { type: String },
  linkedIn: { type: String },
  website: { type: String },
  behance: { type: String },
  figma: { type: String },
  languageCode: { type: String },
  joinedAt: { type: Date, default: Date.now },
  lastActiveAt: { type: Date, default: Date.now },
  isBot: { type: Boolean, default: false },
  profilePhoto: { type: String },
  userPhotos: { type: Object },
  /**
   * Owner
   * Admin
   * Helper Admin
   * Developer (can control the bot, role is developing the bot/community/academy for
   * Pro Programmer (an exprienced programmer who knows the academy just)
   * Programmer (verified that he is a programmer)
   * Special Member (just someone who isn't spam)
   * Member (default)
  */
  status: {
    type: String,
    enum: ["owner", "co-owner", "admin", "co-admin", "developer", "pro-programmer", "programmer", "special-member", "member"],
    default: "member",
  },
  bio: { type: String },
  solutions: { type: Number, default: 0 },
  messageCount: { type: Number, default: 0 },
  solutionsGiven: { type: Number, default: 0 },
  tags: { type: [String] }, // Array of strings for tags
  achievements: [achievementSchema], // Embedded schema for achievements
  invitationLinks: [invitationLinkSchema], // Embedded schema for invitation links
  referredBy: { type: Number }, // Referrer ID
  referredMembers: { type: [Number] }, // Array of referred member IDs
  permissions: {
    canResetPoints: { type: Boolean, default: false },
    canViewLeaderboard: { type: Boolean, default: true },
  },
  levels: {
    currentLevel: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    nextLevelXp: { type: Number, default: 1000 },
  },
});

export const User = mongoose.model("User", userSchema);
