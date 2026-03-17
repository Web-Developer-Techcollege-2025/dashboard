import {create} from "/src/utils/create.js"
import {set} from "/src/utils/set.js"
import {get} from "/src/utils/get.js"
import { rejseplanenModule } from "/src/modules/busTimes.js"

  const app = get("#app")

  const page = create("div")

  set(rejseplanenModule(), page)
  set(page, app)