'use strict'

import * as routeHandler from './modules/routeHandler.js'
import './modules/routie.js'

routie({
  // Homepage
  '': routeHandler.home,
  // Detail page
  ':name': routeHandler.detail
})