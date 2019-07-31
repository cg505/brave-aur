const config = require("./src/brave/lib/config")
const util = require("./src/brave/lib/util")

config.buildConfig = "Release"
//config.update({debug_build: true, official_build: false})
util.updateBranding()
config.buildTarget = "create_dist_zips"
util.buildTarget()
