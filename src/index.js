import {get} from "./utils/get"
import {set} from "./utils/set"
import { rejseplanenModule } from "./modules/RejseplanenModule";

const app = get("#app")

const d = rejseplanenModule()

set(d, app)