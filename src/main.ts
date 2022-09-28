import { Session } from "./session";
import { ErrorMapper } from "./utils/ErrorMapper";

export const loop = ErrorMapper.wrapLoop(() => {

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    if (Session.Instance.roomList.length == 0) {
        Session.Instance.init();
    }
    Session.Instance.update();
});