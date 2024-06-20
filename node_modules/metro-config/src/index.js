"use strict";

const getDefaultConfig = require("./defaults");
const { loadConfig, mergeConfig, resolveConfig } = require("./loadConfig");
module.exports = {
  loadConfig,
  resolveConfig,
  mergeConfig,
  getDefaultConfig,
};
